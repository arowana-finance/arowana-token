// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @dev From solady for compatible VMs
/// @dev https://github.com/Vectorized/solady/blame/v0.1.24/src/utils/LibBytes.sol#L445
library BytesSlice {
    /// @dev Returns a copy of `subject` sliced from `start` to `end` (exclusive).
    /// `start` and `end` are byte offsets.
    function slice(
        bytes memory subject,
        uint256 start,
        uint256 end
    ) internal pure returns (bytes memory result) {
        /// @solidity memory-safe-assembly
        assembly {
            let l := mload(subject) // Subject length.
            if iszero(gt(l, end)) {
                end := l
            }
            if iszero(gt(l, start)) {
                start := l
            }
            if lt(start, end) {
                result := mload(0x40)
                let n := sub(end, start)
                let i := add(subject, start)
                let w := not(0x1f)
                // Copy the `subject` one word at a time, backwards.
                for {
                    let j := and(add(n, 0x1f), w)
                } 1 {} {
                    mstore(add(result, j), mload(add(i, j)))
                    j := add(j, w) // `sub(j, 0x20)`.
                    if iszero(j) {
                        break
                    }
                }
                let o := add(add(result, 0x20), n)
                mstore(o, 0) // Zeroize the slot after the bytes.
                mstore(0x40, add(o, 0x20)) // Allocate memory.
                mstore(result, n) // Store the length.
            }
        }
    }
}
