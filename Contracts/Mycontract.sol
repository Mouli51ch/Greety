// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Greeting {
    string public greet;

    // Event that is emitted when the greeting is updated
    event GreetUpdated(string oldGreet, string newGreet);

    // Constructor to initialize the greeting message
    constructor(string memory initialGreet) {
        greet = initialGreet;
    }

    // Function to set a new greeting message
    function setGreet(string memory newGreet) public {
        string memory oldGreet = greet;
        greet = newGreet;
        emit GreetUpdated(oldGreet, newGreet);
    }

    // Function to get the current greeting message (optional as greet is public)
    function getGreet() public view returns (string memory) {
        return greet;
    }
}
