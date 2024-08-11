const figlet = require('figlet');
const config = require('./config');
const fetchTransactions = require('./scripts/fetchTransaction');
const logger = require('./logger');
const { ethers } = require('ethers');
const mongoose = require('./database');
const analyzeWalletData = require('./scripts/analyzeWalletData');

// Load environment variables
require('dotenv').config();

// Smart contract details
const contractAddress = '0x979a1611Bd2cDcE203aD19Cf8B661e66d6Fbe8E0';
const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const abi = [
    "event WalletRegistered(address indexed wallet, uint256 expirationDate)"
];
const contract = new ethers.Contract(contractAddress, abi, provider);

// Display banner
console.log(figlet.textSync('IdEmblem Node', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));

// Function to handle new wallet registrations
async function handleNewRegistration(walletAddress) {
    try {
        logger.info(`New registration detected for wallet: ${walletAddress}`);
        await fetchTransactions(walletAddress);
        logger.info('Transaction fetching completed.');
        
        // Run analytics on the wallet data
        await analyzeWalletData(walletAddress);
        logger.info('Wallet analytics completed.');
    } catch (error) {
        logger.error(`Error processing wallet ${walletAddress}: ${error.message}`);
    }
}

// Listen for WalletRegistered events
contract.on('WalletRegistered', async (walletAddress) => {
    logger.info(`Wallet registration event detected for ${walletAddress}`);
    await handleNewRegistration(walletAddress);
});

// Start server
const PORT = config.port;
const server = require('http').createServer();

server.listen(PORT, () => {
    logger.info(`IDemblem Node server running on port ${PORT}`);
});
