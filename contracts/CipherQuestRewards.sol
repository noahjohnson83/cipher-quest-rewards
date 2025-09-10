// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherQuestRewards is SepoliaConfig {
    using FHE for *;
    
    struct TreasureReward {
        euint32 rewardId;
        euint32 value; // Reward value in wei (encrypted)
        euint32 referralsRequired;
        euint32 currentReferrals;
        ebool isUnlocked;
        ebool isClaimed;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    struct Referral {
        euint32 referralId;
        address referrer;
        address referee;
        euint32 rewardEarned;
        ebool isVerified;
        uint256 timestamp;
    }
    
    struct UserProfile {
        euint32 totalReferrals;
        euint32 totalRewardsEarned;
        euint32 reputation;
        ebool isActive;
        address wallet;
        uint256 joinedAt;
    }
    
    mapping(uint256 => TreasureReward) public treasureRewards;
    mapping(uint256 => Referral) public referrals;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => euint32[]) public userRewards;
    mapping(string => bool) public usedReferralCodes;
    
    uint256 public rewardCounter;
    uint256 public referralCounter;
    
    address public owner;
    address public verifier;
    
    // Events
    event TreasureRewardCreated(uint256 indexed rewardId, address indexed owner, string name);
    event ReferralMade(uint256 indexed referralId, address indexed referrer, address indexed referee);
    event RewardClaimed(uint256 indexed rewardId, address indexed claimer, uint32 amount);
    event UserRegistered(address indexed user, string referralCode);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function registerUser(string memory referralCode) public {
        require(userProfiles[msg.sender].wallet == address(0), "User already registered");
        require(!usedReferralCodes[referralCode], "Referral code already used");
        
        userProfiles[msg.sender] = UserProfile({
            totalReferrals: FHE.asEuint32(0),
            totalRewardsEarned: FHE.asEuint32(0),
            reputation: FHE.asEuint32(100), // Starting reputation
            isActive: FHE.asEbool(true),
            wallet: msg.sender,
            joinedAt: block.timestamp
        });
        
        usedReferralCodes[referralCode] = true;
        emit UserRegistered(msg.sender, referralCode);
    }
    
    function createTreasureReward(
        string memory _name,
        string memory _description,
        externalEuint32 _value,
        externalEuint32 _referralsRequired,
        uint256 _expiresAt,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(userProfiles[msg.sender].wallet != address(0), "User must be registered");
        require(_expiresAt > block.timestamp, "Expiration must be in the future");
        
        uint256 rewardId = rewardCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalValue = FHE.fromExternal(_value, inputProof);
        euint32 internalReferralsRequired = FHE.fromExternal(_referralsRequired, inputProof);
        
        treasureRewards[rewardId] = TreasureReward({
            rewardId: FHE.asEuint32(0), // Will be set properly later
            value: internalValue,
            referralsRequired: internalReferralsRequired,
            currentReferrals: FHE.asEuint32(0),
            isUnlocked: FHE.asEbool(false),
            isClaimed: FHE.asEbool(false),
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            expiresAt: _expiresAt
        });
        
        emit TreasureRewardCreated(rewardId, msg.sender, _name);
        return rewardId;
    }
    
    function makeReferral(
        address referee,
        externalEuint32 rewardAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(userProfiles[msg.sender].wallet != address(0), "Referrer must be registered");
        require(userProfiles[referee].wallet != address(0), "Referee must be registered");
        require(msg.sender != referee, "Cannot refer yourself");
        
        uint256 referralId = referralCounter++;
        
        // Convert external encrypted value to internal
        euint32 internalRewardAmount = FHE.fromExternal(rewardAmount, inputProof);
        
        referrals[referralId] = Referral({
            referralId: FHE.asEuint32(0), // Will be set properly later
            referrer: msg.sender,
            referee: referee,
            rewardEarned: internalRewardAmount,
            isVerified: FHE.asEbool(false),
            timestamp: block.timestamp
        });
        
        // Update user profiles
        userProfiles[msg.sender].totalReferrals = FHE.add(
            userProfiles[msg.sender].totalReferrals, 
            FHE.asEuint32(1)
        );
        
        userProfiles[msg.sender].totalRewardsEarned = FHE.add(
            userProfiles[msg.sender].totalRewardsEarned,
            internalRewardAmount
        );
        
        emit ReferralMade(referralId, msg.sender, referee);
        return referralId;
    }
    
    function updateRewardProgress(
        uint256 rewardId,
        externalEuint32 newReferralCount,
        bytes calldata inputProof
    ) public onlyVerifier {
        require(treasureRewards[rewardId].owner != address(0), "Reward does not exist");
        
        euint32 internalNewCount = FHE.fromExternal(newReferralCount, inputProof);
        treasureRewards[rewardId].currentReferrals = internalNewCount;
        
        // Check if reward should be unlocked
        ebool shouldUnlock = FHE.gte(
            treasureRewards[rewardId].currentReferrals,
            treasureRewards[rewardId].referralsRequired
        );
        
        treasureRewards[rewardId].isUnlocked = shouldUnlock;
    }
    
    function claimReward(
        uint256 rewardId,
        externalEuint32 claimAmount,
        bytes calldata inputProof
    ) public {
        require(treasureRewards[rewardId].owner != address(0), "Reward does not exist");
        require(treasureRewards[rewardId].owner == msg.sender, "Only owner can claim");
        require(block.timestamp <= treasureRewards[rewardId].expiresAt, "Reward has expired");
        
        // Note: In a real implementation, you would decrypt and verify the claim amount
        // For now, we'll mark as claimed
        treasureRewards[rewardId].isClaimed = FHE.asEbool(true);
        
        emit RewardClaimed(rewardId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function verifyReferral(uint256 referralId, ebool isVerified) public onlyVerifier {
        require(referrals[referralId].referrer != address(0), "Referral does not exist");
        
        referrals[referralId].isVerified = isVerified;
    }
    
    function updateUserReputation(
        address user,
        externalEuint32 newReputation,
        bytes calldata inputProof
    ) public onlyVerifier {
        require(userProfiles[user].wallet != address(0), "User does not exist");
        
        euint32 internalReputation = FHE.fromExternal(newReputation, inputProof);
        userProfiles[user].reputation = internalReputation;
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(newReputation) - will be decrypted off-chain
    }
    
    function getRewardInfo(uint256 rewardId) public view returns (
        string memory name,
        string memory description,
        uint8 value,
        uint8 referralsRequired,
        uint8 currentReferrals,
        bool isUnlocked,
        bool isClaimed,
        address owner,
        uint256 createdAt,
        uint256 expiresAt
    ) {
        TreasureReward storage reward = treasureRewards[rewardId];
        return (
            reward.name,
            reward.description,
            0, // FHE.decrypt(reward.value) - will be decrypted off-chain
            0, // FHE.decrypt(reward.referralsRequired) - will be decrypted off-chain
            0, // FHE.decrypt(reward.currentReferrals) - will be decrypted off-chain
            false, // FHE.decrypt(reward.isUnlocked) - will be decrypted off-chain
            false, // FHE.decrypt(reward.isClaimed) - will be decrypted off-chain
            reward.owner,
            reward.createdAt,
            reward.expiresAt
        );
    }
    
    function getUserProfile(address user) public view returns (
        uint8 totalReferrals,
        uint8 totalRewardsEarned,
        uint8 reputation,
        bool isActive,
        uint256 joinedAt
    ) {
        UserProfile storage profile = userProfiles[user];
        return (
            0, // FHE.decrypt(profile.totalReferrals) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalRewardsEarned) - will be decrypted off-chain
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            false, // FHE.decrypt(profile.isActive) - will be decrypted off-chain
            profile.joinedAt
        );
    }
    
    function getReferralInfo(uint256 referralId) public view returns (
        address referrer,
        address referee,
        uint8 rewardEarned,
        bool isVerified,
        uint256 timestamp
    ) {
        Referral storage referral = referrals[referralId];
        return (
            referral.referrer,
            referral.referee,
            0, // FHE.decrypt(referral.rewardEarned) - will be decrypted off-chain
            false, // FHE.decrypt(referral.isVerified) - will be decrypted off-chain
            referral.timestamp
        );
    }
    
    function withdrawFunds() public onlyOwner {
        // Transfer contract balance to owner
        payable(owner).transfer(address(this).balance);
    }
    
    // Fallback function to receive ETH
    receive() external payable {}
}
