// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract Greeter {
    string greeting;

    event NewGreeting(string greeting);

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public virtual {
        greeting = _greeting;
        emit NewGreeting(_greeting);
    }
}
