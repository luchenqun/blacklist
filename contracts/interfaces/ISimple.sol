// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

interface ISimple {
    function set(uint num) external;

    function get() external view returns (uint);
}
