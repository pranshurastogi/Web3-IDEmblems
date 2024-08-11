// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Web3IDEmblems {
    struct Wallet {
        uint256 registrationDate;
        uint256 expirationDate;
        uint8 verificationLevel; // 0 - not registered, 1 - registered, 2 - worldcoin verified, etc.
        bytes32 worldcoinProof;  // Store the Worldcoin proof
        bytes32 easAttestation;  // Store the EAS attestation UID
    }

    mapping(address => Wallet) public wallets;
    address public admin;
    uint256 public registrationFee = 10000 wei;
    uint256 public renewalFee = 10000 wei;
    uint256 public registrationDuration = 365 days;
    uint256 public renewalDuration = 730 days;

    event WalletRegistered(address indexed wallet, uint256 expirationDate);
    event WalletRenewed(address indexed wallet, uint256 newExpirationDate);
    event WalletVerified(address indexed wallet, uint8 verificationLevel);
    event EASAttestationStored(address indexed wallet, bytes32 attestationUID);
    event FeesUpdated(uint256 newRegistrationFee, uint256 newRenewalFee);
    event BalanceWithdrawn(address indexed admin, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not the admin");
        _;
    }

    modifier isRegistered(address wallet) {
        require(wallets[wallet].expirationDate > block.timestamp, "Wallet not registered or expired");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerWallet() external payable {
        require(msg.value == registrationFee, "Incorrect registration fee");
        require(wallets[msg.sender].expirationDate < block.timestamp, "Wallet already registered, please renew");

        Wallet storage wallet = wallets[msg.sender];
        wallet.registrationDate = block.timestamp;
        wallet.expirationDate = block.timestamp + registrationDuration;
        wallet.verificationLevel = 1; // Level 1: Registered

        emit WalletRegistered(msg.sender, wallet.expirationDate);
    }

    function storeEASAttestation(bytes32 attestationUID) external isRegistered(msg.sender) {
        wallets[msg.sender].easAttestation = attestationUID;
        emit EASAttestationStored(msg.sender, attestationUID);
    }

    function renewWallet() external payable isRegistered(msg.sender) {
        require(msg.value == renewalFee, "Incorrect renewal fee");

        Wallet storage wallet = wallets[msg.sender];
        wallet.expirationDate += renewalDuration;

        emit WalletRenewed(msg.sender, wallet.expirationDate);
    }

    function updateVerificationLevel(uint8 newLevel) external onlyAdmin {
        require(newLevel >= 0 && newLevel <= 10, "Invalid verification level");
        wallets[msg.sender].verificationLevel = newLevel;

        emit WalletVerified(msg.sender, newLevel);
    }

    function getWalletDetails(address walletAddress) external view returns (Wallet memory) {
        return wallets[walletAddress];
    }

    function updateFees(uint256 newRegistrationFee, uint256 newRenewalFee) external onlyAdmin {
        registrationFee = newRegistrationFee;
        renewalFee = newRenewalFee;

        emit FeesUpdated(newRegistrationFee, newRenewalFee);
    }

    function withdrawBalance() external onlyAdmin {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");

        // Transfer the balance to the admin
        (bool success, ) = payable(admin).call{value: contractBalance}("");
        require(success, "Transfer failed");

        emit BalanceWithdrawn(admin, contractBalance);
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
