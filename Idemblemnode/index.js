const figlet = require('figlet');
const config = require('./config');
const fetchTransactions = require('./scripts/fetchTransaction');
const logger = require('./logger');
// const mongoose = require('./database');

console.log(figlet.textSync('IDemblem Node', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));

const walletAddress = '0xd052079Bf00D1843d6f8D352258799a7C74C7B1F'; // Replace with the wallet address you want to track

fetchTransactions(walletAddress).then(() => {
    logger.info('Transaction fetching completed.');
}).catch(error => {
    logger.error(`Error: ${error.message}`);
});

const PORT = config.port;
const server = require('http').createServer();

server.listen(PORT, () => {
    logger.info(`IDemblem Node server running on port ${PORT}`);
});
