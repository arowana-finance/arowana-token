// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IGateway {
    function bridgeTo(
        address token,
        address to,
        uint256 value,
        bytes memory data,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid
    ) external payable returns (uint256);

    function bridgeToPermit(
        address token,
        address to,
        uint256 value,
        bytes memory data,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid,
        uint256 deadline,
        bytes memory signature
    ) external payable returns (uint256);

    function bridgeFrom(
        uint8 tokenDecimals,
        address token,
        address from,
        address to,
        uint256 value,
        bytes memory data,
        uint256 nonce
    ) external payable returns (uint256);

    function bridgeMsg(uint256 nonce, string memory msg) external;
}
