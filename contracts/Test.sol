// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract Test {
    address public from;
    address public sender;
    uint public num;

    constructor() payable {
        from = tx.origin;
        sender = msg.sender;
        num = block.number;
    }
}
