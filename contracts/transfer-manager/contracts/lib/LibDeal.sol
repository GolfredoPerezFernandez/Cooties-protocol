// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "../../../lib-part/contracts/LibPart.sol";
import "../../../lib-asset/contracts/LibAsset.sol";
import "./LibFeeSide.sol";

library LibDeal {
    struct DealSide {
        LibAsset.Asset asset;
        LibPart.Part[] payouts;
        LibPart.Part[] originFees;
        address proxy;
        address from;
    }

    struct DealData {
        uint protocolFee;
        uint maxFeesBasePoint;
        LibFeeSide.FeeSide feeSide;
    }
}
