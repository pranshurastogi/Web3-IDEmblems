const { Alchemy, Network } = require('alchemy-sdk');
// const Transaction = require('../database/models/Transaction');
const config = require('../config');
const logger = require('../logger');

const settings = {
    apiKey: config.alchemyApiKey,
    network: Network.ETH_MAINNET, // Change if using another network
};

const alchemy = new Alchemy(settings);

async function fetchTransactions(walletAddress) {
    try {
        const txs = await alchemy.core.getAssetTransfers({
            fromAddress: walletAddress,
            maxCount: 100,
        });

        const transactions = txs.transfers.map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: tx.value,
            timestamp: new Date(tx.metadata.blockTimestamp),
        }));

        // await Transaction.insertMany(transactions);

        logger.info(`Fetched and saved ${transactions.length} transactions for wallet ${walletAddress}`);
    } catch (error) {
        logger.error(`Error fetching transactions: ${error.message}`);
    }
}

module.exports = fetchTransactions;
