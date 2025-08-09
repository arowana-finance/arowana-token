// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import { ArbGateway, IInbox, IERC20Exp } from './ArbGateway.sol';

contract ArbGatewaySettle is ArbGateway {
    event SetAutoSettle(bool autoSettle);

    struct BridgeOrder {
        address token;
        address from;
        address to;
        uint256 value;
        bytes data;
        bool settled;
    }

    mapping(uint256 => BridgeOrder) public orders;

    bool public autoSettle;

    function initializeGatewaySettle(
        address _owner,
        IInbox _inbox,
        address _otherGateway,
        OtherTokens[] memory _otherTokens,
        bool _autoSettle
    ) public virtual {
        initializeGateway(_owner, _inbox, _otherGateway, _otherTokens);

        autoSettle = _autoSettle;
        emit SetAutoSettle(_autoSettle);
    }

    function bridgeFrom(
        uint8 tokenDecimals,
        address token,
        address from,
        address to,
        uint256 value,
        bytes memory data,
        uint256 _nonce
    ) public payable virtual override onlyArb {
        value = convertAmount(value, tokenDecimals, IERC20Exp(token).decimals());

        orders[_nonce] = BridgeOrder({
            token: token,
            from: from,
            to: to,
            value: value,
            data: data,
            settled: false
        });

        if (autoSettle) {
            _bridgeFrom(token, from, to, value, data, _nonce);

            orders[_nonce].settled = true;
        }
    }

    function settleOrder(uint256 _nonce) external virtual onlyOwner {
        BridgeOrder memory order = orders[_nonce];

        require(!order.settled, 'ALREADY_SETTLED');

        _bridgeFrom(order.token, order.from, order.to, order.value, order.data, _nonce);

        orders[_nonce].settled = true;
    }

    function setAutoSettle() external virtual onlyOwner {
        autoSettle = autoSettle ? false : true;

        emit SetAutoSettle(autoSettle);
    }
}
