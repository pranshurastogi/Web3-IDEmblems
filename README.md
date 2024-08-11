# Web3-IDEmblems

## "Decoding Wallet Identities, One Emblem at a Time"
![EMBLEM](https://github.com/user-attachments/assets/915d2ec7-45a4-427b-b143-2637c52df099)

<img width="884" alt="Screenshot 2024-08-11 at 8 19 24 PM" src="https://github.com/user-attachments/assets/845e5154-16a6-45f7-bd4b-909d79443c3b">


Web3-IDEmblems is a groundbreaking protocol and SDK that brings identity and reputation to the forefront of the Web3 ecosystem. By analyzing on-chain activities and leveraging the Ethereum Attestation Service, Web3-IDEmblems assigns unique emblems to wallet addresses, creating a rich tapestry of user identities across the decentralized landscape.



### COntracts and Deployment address
```
1. Optimism Sepolia

Hardhat Ignition 🚀

Deploying [ Web3IdEmblemModule ]

Batch #1
  Executed Web3IdEmblemModule#Web3IDEmblems

[ Web3IdEmblemModule ] successfully deployed 🚀

Deployed Addresses

Web3IdEmblemModule#Web3IDEmblems - 0x979a1611Bd2cDcE203aD19Cf8B661e66d6Fbe8E0

2. Base sepolia

✔ Confirm deploy to network base (84532)? … yes
Hardhat Ignition 🚀

Deploying [ Web3IdEmblemModule ]

Batch #1
  Executed Web3IdEmblemModule#Web3IDEmblems

[ Web3IdEmblemModule ] successfully deployed 🚀

Deployed Addresses

Web3IdEmblemModule#Web3IDEmblems - 0x84025868551CfedF59E33Fa57720CD9d00fB315b

3. Metal L2

✔ Confirm deploy to network metal (1740)? … yes
Hardhat Ignition 🚀

Deploying [ Web3IdEmblemModule ]

Batch #1
  Executed Web3IdEmblemModule#Web3IDEmblems

[ Web3IdEmblemModule ] successfully deployed 🚀

Deployed Addresses

Web3IdEmblemModule#Web3IDEmblems - 0x84025868551CfedF59E33Fa57720CD9d00fB315b

```

## Features

- **Wallet Registration**: Users can register their Ethereum wallets by paying a small fee, which grants them an initial verification level.
- **Verification Levels**: Wallets can be upgraded through various verification processes, such as Worldcoin sign-in and Gitcoin Passport, to increase their credibility.
- **EAS Integration**: The platform uses the Ethereum Attestation Service (EAS) to create and store verifiable proofs of actions and identities.
- **Analytics and Emblems**: Wallet activities are analyzed to assign badges or emblems, which reflect the wallet's reputation in areas like DeFi participation, NFT holdings, or potential spam activity.
- **Multi-Network Deployment**: The platform is deployed on Optimism, Base, and Metal L2, ensuring scalability and cost-effectiveness.

## Components

- **Smart Contract**: Manages wallet registration, verification levels, and the storage of EAS attestations.
- **Node.js Backend**: Facilitates interactions between the blockchain, external services, and the smart contract.
- **Verification Services**: External services like Worldcoin and Gitcoin Passport that validate the identity of wallet owners.
- **Ethereum Attestation Service (EAS)**: Provides verifiable proofs of wallet actions and identities.
- **Alchemy API**: Fetches blockchain data to facilitate on-chain analytics.
- **Goldsky**: Analyzes wallet activities to assign dynamic badges based on behavior.
- **Postgres Database**: Stores and retrieves relevant data for the platform.
- **L2 Networks**: Deployed on Optimism, Base, and Metal L2 for scalability and cost efficiency.

### Prerequisites

- Node.js and npm/yarn installed
- PostgreSQL installed and configured
- Hardhat installed globally

## Contributing
We welcome contributions to enhance the project. Please fork the repository and submit a pull request.


## Database setup
Make sure PostgreSQL is running and create the database:

psql -U your_db_user -c "CREATE DATABASE idemblems_db;"

