// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { Proxy } from '@openzeppelin/contracts/proxy/Proxy.sol';
import { ERC1967Utils, IERC1967, StorageSlot } from '@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol';

/**
 * @title InitializableProxy
 * @dev Inspired by AAVE's InitializableImmutableAdminUpgradeabilityProxy,
 * https://github.com/aave-dao/aave-v3-origin/blob/v3.3.0/src/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol
 * this proxy exports necessary functions to show current admin and implementation for maximal transparency
 */
contract InitializableProxy is Proxy {
    // keccak256(abi.encodePacked('eip1967.proxy.description')) - 1n
    bytes32 internal constant DESCRIPTION_SLOT =
        0xfcba12fcf625f4823c7c0c86b97ab29721afc9e784836bc00bf04553a0c8dff4;

    event DescriptionChanged(string description);

    modifier ifAdmin() {
        require(msg.sender == _admin(), 'NOT_ADMIN');
        _;
    }

    receive() external payable {
        _fallback();
    }

    function initializeProxy(
        string memory _description,
        address newAdmin,
        address newImplementation,
        bytes memory data
    ) external payable virtual {
        require(_implementation() == address(0) && _admin() == address(0), 'ALREADY_INITIALIZED');
        ERC1967Utils.changeAdmin(newAdmin);
        _upgradeToAndCall(newImplementation, data);
        _setDescription(_description);
    }

    /// @dev Using internal _upgradeToAndCall to revert with implementation error data to debug error
    function upgradeToAndCall(address newImplementation, bytes memory data) external payable virtual ifAdmin {
        _upgradeToAndCall(newImplementation, data);
    }

    function changeAdmin(address newAdmin) external virtual ifAdmin {
        ERC1967Utils.changeAdmin(newAdmin);
    }

    function changeDescription(string memory _description) external virtual ifAdmin {
        _setDescription(_description);
    }

    function admin() external view returns (address) {
        return _admin();
    }

    function _admin() internal view virtual returns (address) {
        return ERC1967Utils.getAdmin();
    }

    function proxyDescription() external view virtual returns (string memory) {
        return StorageSlot.getStringSlot(DESCRIPTION_SLOT).value;
    }

    function _setDescription(string memory _description) internal virtual {
        if (bytes(_description).length != 0) {
            StorageSlot.getStringSlot(DESCRIPTION_SLOT).value = _description;
            emit DescriptionChanged(_description);
        }
    }

    function implementation() external view returns (address) {
        return _implementation();
    }

    function _implementation() internal view virtual override returns (address) {
        return ERC1967Utils.getImplementation();
    }

    /**
     * @dev Stores a new address in the ERC-1967 implementation slot.
     */
    function _setImplementation(address newImplementation) private {
        if (newImplementation.code.length == 0) {
            revert ERC1967Utils.ERC1967InvalidImplementation(newImplementation);
        }
        StorageSlot.getAddressSlot(ERC1967Utils.IMPLEMENTATION_SLOT).value = newImplementation;
    }

    /**
     * @dev Performs implementation upgrade with additional setup call if data is nonempty.
     * This function is payable only if the setup call is performed, otherwise `msg.value` is rejected
     * to avoid stuck value in the contract.
     *
     * Emits an {IERC1967-Upgraded} event.
     */
    function _upgradeToAndCall(address newImplementation, bytes memory data) internal {
        _setImplementation(newImplementation);
        emit IERC1967.Upgraded(newImplementation);

        if (data.length != 0) {
            (bool success, bytes memory returnData) = newImplementation.delegatecall(data);

            if (!success) {
                assembly {
                    revert(add(32, returnData), mload(returnData))
                }
            }
        } else {
            _checkNonPayable();
        }
    }

    /**
     * @dev Reverts if `msg.value` is not zero. It can be used to avoid `msg.value` stuck in the contract
     * if an upgrade doesn't perform an initialization call.
     */
    function _checkNonPayable() private {
        if (msg.value > 0) {
            revert ERC1967Utils.ERC1967NonPayable();
        }
    }
}
