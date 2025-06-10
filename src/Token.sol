// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GarlicToken is ERC20 {
    uint256 public constant MINT_AMOUNT = 1000 * 10 ** 18;

    constructor() ERC20("GarlicToken", "GLT") {}

    function mint1000() public {
        _mint(msg.sender, MINT_AMOUNT);
    }
}