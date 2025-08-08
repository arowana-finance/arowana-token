// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import { ERC20Burnable } from '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import { ERC20Permit } from '@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol';

/// @title Arowana Token
/// @dev Uses standard OpenZeppelin ERC20 implementation
contract Arowana is ERC20, ERC20Burnable, ERC20Permit {
    /// @dev Once minted by constructor it is impossible to mint additional supply
    uint256 public immutable maxSupply;

    constructor() ERC20('Arowana', 'ARW') ERC20Permit('Arowana') {
        maxSupply = 500_000_000 * 1e18;
        _mint(msg.sender, maxSupply);
    }
}
