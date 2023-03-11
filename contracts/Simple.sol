// SPD_num-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./interfaces/ISimple.sol";

contract Simple {
    uint num;
    address public addr;

    event Response(string message, bool success, bytes data);

    constructor(address _addr) {
        addr = _addr;
    }

    function set(uint _num) public {
        num = _num;
    }

    function get() public view returns (uint) {
        return num;
    }

    // 跨合约调用
    function setNum(uint _num) public {
        ISimple(addr).set(_num);
    }

    function getNum() public view returns (uint) {
        return ISimple(addr).get();
    }

    // 修改被调用者的storage
    function callSet(uint _num) public payable {
        (bool success, bytes memory data) = addr.call{value: msg.value}(
            abi.encodeWithSignature("set(uint256)", _num)
        );
        emit Response("callSet", success, data);
    }

    // 修改自己合约的storage
    function delegatecallSet(uint _num) public {
        (bool success, bytes memory data) = addr.delegatecall(
            abi.encodeWithSignature("set(uint256)", _num)
        );
        emit Response("delegatecallSet", success, data);
    }

    function staticcallSet(uint _num) public {
        (bool success, bytes memory data) = addr.staticcall(
            abi.encodeWithSignature("set(uint256)", _num)
        );
        emit Response("staticcall", success, data);
    }

    function staticcallGet() public view returns (uint) {
        (, bytes memory data) = addr.staticcall(
            abi.encodeWithSignature("get()")
        );
        return uint256(bytes32(data));
    }
}
