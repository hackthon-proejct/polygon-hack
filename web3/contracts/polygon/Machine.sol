// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Bounty.sol";

contract Machine {
    address public owner = msg.sender;

    event Create(address indexed configAddress, address indexed sender);

    function create(
        address payable _creatorWallet,
        uint256 _maxValue,
        uint8[] memory _bonusTargets,
        uint8[] memory _bonusPctYeasNeeded,
        uint8[] memory _bonusFailureThresholds,
        uint64 _mustBeClaimedTime,
        uint64 _timeLimit
    ) public returns (address configAddress) {
        address config = address(
            new Bounty(
                _creatorWallet,
                _maxValue,
                _bonusTargets,
                _bonusPctYeasNeeded,
                _bonusFailureThresholds,
                _mustBeClaimedTime,
                _timeLimit,
                owner
            )
        );
        emit Create(config, msg.sender);
        return config;
    }
}
