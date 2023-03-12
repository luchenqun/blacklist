// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

import "./interfaces/ISimple.sol";
import "./Test.sol";

contract Simple {
    uint num;
    address public addr;
    mapping(address => uint) public balanceOf;

    event Response(string message, bool success, bytes data);
    event Address(address addr);

    constructor(address _addr) {
        addr = _addr;
    }

    // storage不改变，但是改变智能合约余额即balance
    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
    }

    // storage不改变，但是改变智能合约余额即balance
    function withdraw(uint wad) public {
        require(balanceOf[msg.sender] >= wad);
        balanceOf[msg.sender] -= wad;
        payable(msg.sender).transfer(wad);
    }

    function idle() public {}

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

    // 跨合约读取数据
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

    // static 只能用于读取
    function staticcallSet(uint _num) public {
        (bool success, bytes memory data) = addr.staticcall(
            abi.encodeWithSignature("set(uint256)", _num)
        );
        emit Response("staticcall", success, data);
    }

    // 黑名单依然可以读取
    function staticcallGet() public view returns (uint) {
        (, bytes memory data) = addr.staticcall(
            abi.encodeWithSignature("get()")
        );
        return uint256(bytes32(data));
    }

    // 虽然没有改变storage, 但是改变合约的nonce
    function deploy() external returns (address) {
        Test test = new Test();
        emit Address(address(test));
        return address(test);
    }
}
