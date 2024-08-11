# Web3IDEmblems Smart Contract

## Overview

Web3IDEmblems is a smart contract designed for registering and verifying Ethereum wallets. Users can register their wallets, verify their identities through different levels of verification such as Worldcoin and Ethereum Attestation Service (EAS), and store the results of these verifications on-chain. The contract also handles wallet registration renewal and allows for the withdrawal of accumulated fees.

## Features

- **Wallet Registration**: Users can register their wallets by paying a small fee, valid for one year.
- **Verification Levels**: The contract supports various levels of verification, from basic registration to advanced verifications using external services like Worldcoin and EAS.
- **EAS Attestation Storage**: Users can store EAS attestation UIDs linked to their wallets.
- **Wallet Renewal**: Registered wallets can be renewed for an additional two years by paying a renewal fee.
- **Admin Functions**: The contract administrator can update fees, verification levels, and withdraw the contract’s balance.

## Contract Structure

### 1. Data Structures

- **`struct Wallet`**: Stores information about each registered wallet, including registration and expiration dates, verification level, Worldcoin proof, and EAS attestation UID.

### 2. State Variables

- **`mapping(address => Wallet) public wallets`**: Stores the `Wallet` struct for each registered address.
- **`address public admin`**: Stores the address of the contract administrator.
- **`uint256 public registrationFee`**: Fee for registering a wallet (default: 10,000 wei).
- **`uint256 public renewalFee`**: Fee for renewing a wallet registration (default: 10,000 wei).
- **`uint256 public registrationDuration`**: Duration of the wallet registration (default: 1 year).
- **`uint256 public renewalDuration`**: Duration of the wallet renewal (default: 2 years).

### 3. Events

- **`event WalletRegistered(address indexed wallet, uint256 expirationDate)`**: Emitted when a wallet is registered.
- **`event WalletRenewed(address indexed wallet, uint256 newExpirationDate)`**: Emitted when a wallet registration is renewed.
- **`event WalletVerified(address indexed wallet, uint8 verificationLevel)`**: Emitted when a wallet’s verification level is updated.
- **`event EASAttestationStored(address indexed wallet, bytes32 attestationUID)`**: Emitted when an EAS attestation UID is stored.
- **`event FeesUpdated(uint256 newRegistrationFee, uint256 newRenewalFee)`**: Emitted when the registration and renewal fees are updated.
- **`event BalanceWithdrawn(address indexed admin, uint256 amount)`**: Emitted when the contract balance is withdrawn by the admin.

### 4. Modifiers

- **`onlyAdmin()`**: Ensures that only the contract administrator can call certain functions.
- **`isRegistered(address wallet)`**: Ensures that the wallet is currently registered.

## Functions

### 1. Constructor

- **`constructor()`**: Sets the contract deployer as the admin.

### 2. Public Functions

- **`registerWallet()`**: Allows a user to register their wallet by paying the registration fee. The wallet’s verification level is set to 1 (registered), and the expiration date is set to one year from the registration date.

    ```solidity
    function registerWallet() external payable {
        require(msg.value == registrationFee, "Incorrect registration fee");
        require(wallets[msg.sender].expirationDate < block.timestamp, "Wallet already registered, please renew");

        Wallet storage wallet = wallets[msg.sender];
        wallet.registrationDate = block.timestamp;
        wallet.expirationDate = block.timestamp + registrationDuration;
        wallet.verificationLevel = 1;

        emit WalletRegistered(msg.sender, wallet.expirationDate);
    }
    ```

- **`storeEASAttestation(bytes32 attestationUID)`**: Allows a registered user to store their EAS attestation UID in the contract.

    ```solidity
    function storeEASAttestation(bytes32 attestationUID) external isRegistered(msg.sender) {
        wallets[msg.sender].easAttestation = attestationUID;
        emit EASAttestationStored(msg.sender, attestationUID);
    }
    ```

- **`renewWallet()`**: Allows a user to renew their wallet registration by paying the renewal fee. The expiration date is extended by two years.

    ```solidity
    function renewWallet() external payable isRegistered(msg.sender) {
        require(msg.value == renewalFee, "Incorrect renewal fee");

        Wallet storage wallet = wallets[msg.sender];
        wallet.expirationDate += renewalDuration;

        emit WalletRenewed(msg.sender, wallet.expirationDate);
    }
    ```

### 3. Admin Functions

- **`updateVerificationLevel(uint8 newLevel)`**: Allows the admin to update a wallet’s verification level.

    ```solidity
    function updateVerificationLevel(uint8 newLevel) external onlyAdmin {
        require(newLevel >= 0 && newLevel <= 10, "Invalid verification level");
        wallets[msg.sender].verificationLevel = newLevel;

        emit WalletVerified(msg.sender, newLevel);
    }
    ```

- **`updateFees(uint256 newRegistrationFee, uint256 newRenewalFee)`**: Allows the admin to update the registration and renewal fees.

    ```solidity
    function updateFees(uint256 newRegistrationFee, uint256 newRenewalFee) external onlyAdmin {
        registrationFee = newRegistrationFee;
        renewalFee = newRenewalFee;

        emit FeesUpdated(newRegistrationFee, newRenewalFee);
    }
    ```

- **`withdrawBalance()`**: Allows the admin to withdraw the contract’s balance.

    ```solidity
    function withdrawBalance() external onlyAdmin {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");

        (bool success, ) = payable(admin).call{value: contractBalance}("");
        require(success, "Transfer failed");

        emit BalanceWithdrawn(admin, contractBalance);
    }
    ```

### 4. View Functions

- **`getWalletDetails(address walletAddress)`**: Returns the details of a registered wallet.

    ```solidity
    function getWalletDetails(address walletAddress) external view returns (Wallet memory) {
        return wallets[walletAddress];
    }
    ```

### 5. Fallback Function

- **`receive()`**: Fallback function to receive ETH.

    ```solidity
    receive() external payable {}
    ```

## Usage Instructions

### Registering a Wallet

1. Send a transaction to the `registerWallet()` function, including the registration fee.
2. The contract records the registration and sets the verification level to 1 (registered).

### Storing an EAS Attestation

1. Complete a verification process such as Gitcoin Passport.
2. The backend creates an attestation using the EAS SDK and retrieves the UID.
3. Store the UID in the contract via the `storeEASAttestation(bytes32 attestationUID)` function.

### Updating Verification Levels

Admins can update a wallet’s verification level using the `updateVerificationLevel(uint8 newLevel)` function. Each level corresponds to a different degree of verification.

### Renewing a Wallet

1. Send a transaction to the `renewWallet()` function, including the renewal fee.
2. The contract extends the expiration date by two years.

### Withdrawing Contract Balance

The admin can withdraw the accumulated balance in the contract using the `withdrawBalance()` function.

## Security Considerations

- **Admin Controls**: Only the admin can update verification levels, fees, and withdraw funds. Ensure the admin key is securely managed.
- **Registration and Renewal Fees**: Fees are adjustable by the admin, allowing flexibility based on network conditions.

## Conclusion

Web3IDEmblems provides a comprehensive solution for managing wallet registrations and verifications on the Ethereum blockchain. By integrating services like Worldcoin and EAS, the contract offers a robust and secure way to store and verify user identities.

For more information or to contribute, please refer to the project’s repository.
