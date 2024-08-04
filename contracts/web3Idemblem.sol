// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Web3IDEmblems {
    // Struct to store wallet information
    struct Wallet {
        uint256 registrationDate;
        uint256 expirationDate;
        uint8 verificationLevel; // 0 - not registered, 1 - registered, 2 - worldcoin verified, etc.
    }

    // Mapping to store wallet addresses and their information
    mapping(address => Wallet) public wallets;
    // Address of the contract admin
    address public admin;
    // Registration fee in wei (10000 wei)
    uint256 public registrationFee = 10000 wei;
    // Renewal fee in wei (10000 wei)
    uint256 public renewalFee = 10000 wei;
    // Registration duration in seconds (1 year)
    uint256 public registrationDuration = 365 days;
    // Renewal duration in seconds (2 years)
    uint256 public renewalDuration = 730 days;

    // Event to log registration
    event WalletRegistered(address indexed wallet, uint256 expirationDate);
    // Event to log renewal
    event WalletRenewed(address indexed wallet, uint256 newExpirationDate);
    // Event to log verification
    event WalletVerified(address indexed wallet, uint8 verificationLevel);
    // Event to log fee update
    event FeesUpdated(uint256 newRegistrationFee, uint256 newRenewalFee);
    // Event to log withdrawal
    event BalanceWithdrawn(address indexed admin, uint256 amount);

    // Modifier to check if the sender is the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not the admin");
        _;
    }

    // Modifier to check if the wallet is registered
    modifier isRegistered(address wallet) {
        require(wallets[wallet].expirationDate > block.timestamp, "Wallet not registered or expired");
        _;
    }

    // Constructor to set the admin
    constructor() {
        admin = msg.sender;
    }

    // Function to register a wallet
    function registerWallet() external payable {
        require(msg.value == registrationFee, "Incorrect registration fee");
        require(wallets[msg.sender].expirationDate < block.timestamp, "Wallet already registered, please renew");

        Wallet storage wallet = wallets[msg.sender];

        // Check-Effects-Interactions Pattern
        wallet.registrationDate = block.timestamp;
        wallet.expirationDate = block.timestamp + registrationDuration;
        wallet.verificationLevel = 1; // Default verification level: 1 - registered

        emit WalletRegistered(msg.sender, wallet.expirationDate);
    }

    // Function to renew a wallet registration
    function renewWallet() external payable isRegistered(msg.sender) {
        require(msg.value == renewalFee, "Incorrect renewal fee");

        Wallet storage wallet = wallets[msg.sender];

        // Check-Effects-Interactions Pattern
        wallet.expirationDate += renewalDuration;

        emit WalletRenewed(msg.sender, wallet.expirationDate);
    }

    // Function to update verification level
    function updateVerificationLevel(address walletAddress, uint8 newLevel) external onlyAdmin {
        require(wallets[walletAddress].expirationDate > block.timestamp, "Wallet not registered or expired");
        wallets[walletAddress].verificationLevel = newLevel;

        emit WalletVerified(walletAddress, newLevel);
    }

    // Function to update fees
    function updateFees(uint256 newRegistrationFee, uint256 newRenewalFee) external onlyAdmin {
        registrationFee = newRegistrationFee;
        renewalFee = newRenewalFee;

        emit FeesUpdated(newRegistrationFee, newRenewalFee);
    }

    // Function to check if a wallet is registered and valid
    function isWalletRegistered(address walletAddress) external view returns (bool) {
        return wallets[walletAddress].expirationDate > block.timestamp;
    }

    // Function to check the verification level of a wallet
    function getVerificationLevel(address walletAddress) external view returns (uint8) {
        if (wallets[walletAddress].expirationDate <= block.timestamp) {
            return 0; // Subscription expired
        }
        return wallets[walletAddress].verificationLevel;
    }

    // Function to withdraw contract balance (only admin)
    function withdrawBalance() external onlyAdmin {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");

        // Check-Effects-Interactions Pattern
        emit BalanceWithdrawn(admin, contractBalance);

        (bool success, ) = payable(admin).call{value: contractBalance}("");
        require(success, "Transfer failed");
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
