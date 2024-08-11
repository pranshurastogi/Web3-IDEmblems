# Web3-IDEmblems: Integration with Ethereum Attestation Service (EAS)

## Overview

Web3-IDEmblems is a decentralized application designed to facilitate the registration and verification of Ethereum wallets using the Ethereum Attestation Service (EAS). Users can register their wallets, verify their identities through various services like Worldcoin, Gitcoin Passport, and store these verifications as on-chain attestations.

## Architecture

sequenceDiagram
    participant User
    participant Web3IDEmblems
    participant Node.js Backend
    participant EAS SDK
    participant Ethereum Blockchain

    User->>Web3IDEmblems: Register Wallet
    Web3IDEmblems-->>User: Confirmation & Verification Level
    User->>Node.js Backend: Request Attestation
    Node.js Backend->>EAS SDK: Create Attestation
    EAS SDK->>Ethereum Blockchain: Store Attestation
    Ethereum Blockchain-->>EAS SDK: Attestation UID
    EAS SDK-->>Node.js Backend: Attestation UID
    Node.js Backend->>Web3IDEmblems: Store Attestation UID
    Web3IDEmblems-->>User: Attestation Linked

## Components
* User: Interacts with the DApp to register and verify their Ethereum wallet.
 Web3IDEmblems Smart Contract: Manages wallet registration, verification levels, and attestation storage.
* EAS SDK: Facilitates interaction with the Ethereum Attestation Service for    creating and managing attestations.
* Node.js Backend: Handles the logic for schema management, attestation creation, and revocation.

# Smart Contract: Web3IDEmblems

The `Web3IDEmblems` smart contract is the core of the DApp. It manages:

- **Wallet Registration**: Users register their wallets by paying a fee, which is valid for one year.
- **Verification Levels**: Different levels represent the degree of verification completed by the user (e.g., Worldcoin, Gitcoin Passport).
- **EAS Attestation Storage**: The contract stores the UID of attestations created using the EAS.

## Key Functions

- **`registerWallet()`**: Registers a user's wallet, initializing the verification level and setting the expiration date.
- **`storeEASAttestation(bytes32 attestationUID)`**: Stores the EAS attestation UID in the contract, linking it to the user's wallet.
- **`updateVerificationLevel(uint8 newLevel)`**: Admin function to update a user's verification level.
- **`renewWallet()`**: Allows users to renew their wallet registration by paying a renewal fee.
- **`withdrawBalance()`**: Admin function to withdraw the contract's balance.


## EAS workflow

flowchart LR
    A[User] -->|Requests Attestation| B[Node.js Backend]
    B --> C[Create Schema (Optional)]
    C --> D[Create Attestation]
    D --> E[Ethereum Blockchain]
    E --> F[Store Attestation UID in Smart Contract]
    F --> G[User Receives Verification]

## Example Use Cases
1. Gitcoin Passport Verification: After registering a wallet, the user  verifies their identity through Gitcoin Passport. The backend creates an  attestation for this verification, stores it on-chain, and updates the user's verification level.

2. Worldcoin Sign-In: Similar to Gitcoin Passport, but using Worldcoin's identity verification.

# Usage Instructions

## Registering a Wallet

1. User sends a transaction to the `registerWallet()` function in the smart contract.
2. The contract records the registration and sets the verification level to 1.

## Storing an EAS Attestation

1. User completes a verification process (e.g., Gitcoin Passport).
2. The backend creates an attestation using the EAS SDK and retrieves the UID.
3. The UID is stored in the smart contract via the `storeEASAttestation(bytes32 attestationUID)` function.

## Updating Verification Levels

- Admins can update the verification level of a wallet using the `updateVerificationLevel(uint8 newLevel)` function. Each level corresponds to a different degree of verification.

## Revoking an Attestation

- If an attestation needs to be revoked, the backend can handle this via the EAS SDK. The revocation is reflected in the smart contract, and the user's verification level may be adjusted accordingly.


## Registering a Wallet

To register a wallet, the user needs to send a transaction to the `registerWallet()` function in the smart contract. The contract will record the registration and set the verification level to 1.

### Example

```solidity
// Example Solidity code to register a wallet
function registerMyWallet() public {
    Web3IDEmblems.registerWallet{value: 10000 wei}();
}

Or, using JavaScript with ethers.js:

const Web3IDEmblems = new ethers.Contract(contractAddress, abi, signer);

async function registerMyWallet() {
    const tx = await Web3IDEmblems.registerWallet({ value: ethers.utils.parseUnits("10000", "wei") });
    await tx.wait();
    console.log("Wallet registered!");
}
```

## Storing an EAS Attestation

After completing a verification process like Gitcoin Passport, the backend creates an attestation using the EAS SDK, retrieves the UID, and stores it in the smart contract via the `storeEASAttestation(bytes32 attestationUID)` function.

### Example

```javascript
const attestationUID = "0x123456789abcdef..."; // Replace with the actual UID

async function storeAttestation() {
    const tx = await Web3IDEmblems.storeEASAttestation(attestationUID);
    await tx.wait();
    console.log("Attestation stored!");
}
