const { SchemaRegistry } = require('@ethereum-attestation-service/eas-sdk');
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const schemaRegistry = new SchemaRegistry(process.env.EAS_CONTRACT_ADDRESS);
schemaRegistry.connect(wallet);

async function registerSchema(schema, resolverAddress, revocable = true) {
    try {
        const tx = await schemaRegistry.register({
            schema,
            resolverAddress,
            revocable
        });
        await tx.wait();
        console.log(`Schema registered successfully with hash: ${tx.hash}`);
        return tx.hash;
    } catch (error) {
        console.error('Error registering schema:', error);
        throw error;
    }
}

module.exports = { registerSchema };
