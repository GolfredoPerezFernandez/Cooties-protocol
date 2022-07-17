// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "../../lib-asset/contracts/LibAsset.sol";

interface ITransferProxy {
    function transfer(LibAsset.Asset calldata asset, address from, address to) external;
}
