// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";
import "../src/Token.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        new GarlicToken();
        vm.stopBroadcast();
    }
}