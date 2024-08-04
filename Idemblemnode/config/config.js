require('dotenv').config();

const config = {
    development: {
        alchemyApiKey: process.env.ALCHEMY_API_KEY,
        mongoUri: process.env.MONGO_URI,
        port: process.env.PORT || 3000,
    },
    production: {
        alchemyApiKey: process.env.ALCHEMY_API_KEY,
        mongoUri: process.env.MONGO_URI,
        port: process.env.PORT || 3000,
    },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
