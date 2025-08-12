// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import { IInbox } from '@arbitrum/nitro-contracts/src/bridge/IInbox.sol';
import { IBridge, IOutbox } from '@arbitrum/nitro-contracts/src/bridge/Outbox.sol';
import { ArbSys } from '@arbitrum/nitro-contracts/src/precompiles/ArbSys.sol';
import { AddressAliasHelper } from '@arbitrum/nitro-contracts/src/libraries/AddressAliasHelper.sol';
import { SafeERC20 } from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import { BytesSlice } from '../libraries/BytesSlice.sol';
import { Ownable } from '../libraries/Ownable.sol';
import { IERC20Exp, IERC20Mintable } from '../interfaces/IERC20.sol';
import { IGateway } from '../interfaces/IGateway.sol';
import { SigLib } from '../libraries/SigLib.sol';

/// @dev Arbitrum ERC20 gateway for L1 and L2
contract ArbGateway is Ownable {
    using SigLib for bytes;
    using SafeERC20 for IERC20Exp;
    using SafeERC20 for IERC20Mintable;

    event InitializedGateway(address arbSys, address inbox, address otherGateway);
    event SetOtherToken(address indexed home, address other);
    event SetToBurn(address indexed token, bool shouldBurn);

    event BridgedTo(
        uint256 indexed nonce,
        uint256 bridgeID,
        address indexed token,
        address indexed from,
        address to,
        uint256 value,
        bytes data
    );

    event BridgedFrom(
        uint256 indexed nonce,
        address indexed token,
        address indexed from,
        address to,
        uint256 value,
        bytes data
    );

    event BridgedMessage(uint256 indexed nonce, string msg);
    event BridgedCall(uint256 indexed nonce, bool success, bytes returnData);

    ArbSys public constant arbsys = ArbSys(address(100));

    IInbox public inbox;

    address public otherGateway;

    mapping(address => address) public otherTokens;

    mapping(address => bool) public shouldBurnToken;

    uint256 public nonce;

    modifier onlyArb() {
        require(checkArb(msg.sender) || msg.sender == owner(), 'NOT_ARBITRUM');
        _;
    }

    struct OtherTokens {
        address home;
        address other;
    }

    function initializeGateway(
        address _owner,
        IInbox _inbox,
        address _otherGateway,
        OtherTokens[] memory _otherTokens
    ) public virtual initializer {
        inbox = _inbox;
        otherGateway = _otherGateway;

        for (uint i; i < _otherTokens.length; ++i) {
            OtherTokens memory otherToken = _otherTokens[i];

            setOtherToken(otherToken.home, otherToken.other);
        }

        __Ownable_init(_owner);

        emit InitializedGateway(address(arbsys), address(_inbox), _otherGateway);
    }

    function setBurnToken(address homeToken) external virtual onlyOwner {
        shouldBurnToken[homeToken] = shouldBurnToken[homeToken] ? false : true;

        if (shouldBurnToken[homeToken]) {
            IERC20Mintable token = IERC20Mintable(homeToken);
            uint256 balance = token.balanceOf(address(this));

            if (balance != 0) {
                token.burn(balance);
            }
        }

        emit SetToBurn(homeToken, shouldBurnToken[homeToken]);
    }

    function setOtherToken(address home, address other) public virtual onlyOwner {
        otherTokens[home] = other;
        emit SetOtherToken(home, other);
    }

    function convertAmount(
        uint256 fromValue,
        uint8 fromDecimals,
        uint8 toDecimals
    ) public pure virtual returns (uint256) {
        return fromValue / (10 ** (fromDecimals - toDecimals));
    }

    function bridgeTo(
        IERC20Mintable token,
        address to,
        uint256 value,
        bytes memory data,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid
    ) public payable virtual returns (uint256) {
        token.safeTransferFrom(msg.sender, address(this), value);

        if (shouldBurnToken[address(token)]) {
            token.burn(value);
        }

        uint256 _nonce = nonce;
        bytes memory msgData = abi.encodeWithSelector(
            IGateway.bridgeFrom.selector,
            token.decimals(),
            otherTokens[address(token)],
            msg.sender,
            to,
            value,
            data,
            _nonce
        );

        uint256 bridgeID;

        bool isArbitrum = address(inbox) == address(0);

        if (!isArbitrum) {
            bridgeID = inbox.createRetryableTicket{ value: msg.value }(
                otherGateway,
                0,
                maxSubmissionCost,
                msg.sender,
                msg.sender,
                maxGas,
                gasPriceBid,
                msgData
            );
        } else {
            bridgeID = arbsys.sendTxToL1(otherGateway, msgData);
        }

        nonce++;

        emit BridgedTo(_nonce, bridgeID, address(token), msg.sender, to, value, data);

        return _nonce;
    }

    function bridgeToPermit(
        IERC20Mintable token,
        address to,
        uint256 value,
        bytes memory data,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid,
        uint256 deadline,
        bytes memory signature
    ) external payable virtual returns (uint256) {
        (uint8 v, bytes32 r, bytes32 s) = signature.toVRS();
        token.permit(msg.sender, address(this), value, deadline, v, r, s);

        return bridgeTo(token, to, value, data, maxSubmissionCost, maxGas, gasPriceBid);
    }

    function bridgeFrom(
        uint8 tokenDecimals,
        address token,
        address from,
        address to,
        uint256 value,
        bytes memory data,
        uint256 _nonce
    ) public payable virtual onlyArb {
        value = convertAmount(value, tokenDecimals, IERC20Exp(token).decimals());

        _bridgeFrom(token, from, to, value, data, _nonce);
    }

    function _bridgeFrom(
        address token,
        address from,
        address to,
        uint256 value,
        bytes memory data,
        uint256 _nonce
    ) internal virtual {
        IERC20Mintable _token = IERC20Mintable(token);

        // If the bridge has sufficient balance send it instead
        if (_token.balanceOf(address(this)) >= value) {
            _token.safeTransfer(to, value);

            // If we are short on supply mint (would revert if bridge has zero balance)
        } else {
            _token.mint(to, value);
        }

        if (data.length != 0) {
            bool isMsg = bytes4(BytesSlice.slice(data, 0, 4)) == IGateway.bridgeMsg.selector;

            if (isMsg) {
                (bool success, ) = address(this).call(data);
                require(success, 'MSG_FAILED');
            } else if (to.code.length != 0) {
                (bool success, bytes memory returnData) = to.call{ gas: 800000 }(data);

                emit BridgedCall(_nonce, success, returnData);
            }
        }

        emit BridgedFrom(_nonce, token, from, to, value, data);
    }

    function bridgeMsg(uint256 _nonce, string memory _msg) external {
        require(msg.sender == address(this), 'ONLY_SELF');
        emit BridgedMessage(_nonce, _msg);
    }

    function checkArb(address msgSender) public view returns (bool) {
        bool isArbitrum = address(inbox) == address(0);

        if (isArbitrum) {
            // To check that message came from the parent chain,
            // we check that the sender is the parent chain contract's alias.
            return msgSender == AddressAliasHelper.applyL1ToL2Alias(otherGateway);
        } else {
            // this prevents reentrancies on Child-to-Parent transactions
            IBridge bridge = inbox.bridge();
            return
                msgSender == address(bridge) && IOutbox(bridge.activeOutbox()).l2ToL1Sender() == otherGateway;
        }
    }
}
