const { EAS, SchemaEncoder } = require('@ethereum-attestation-service/eas-sdk');
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const eas = new EAS(process.env.EAS_CONTRACT_ADDRESS);
eas.connect(wallet);

async function createAttestation(schemaUID, recipient, expirationTime, revocable, data) {
    try {
        const schemaEncoder = new SchemaEncoder('uint256 eventId, uint8 score');
        const encodedData = schemaEncoder.encodeData(data);

        const tx = await eas.attest({
            schema: schemaUID,
            data: {
                recipient,
                expirationTime,
                revocable,
                data: encodedData
            }
        });

        await tx.wait();
        console.log(`Attestation created successfully with hash: ${tx.hash}`);
        return tx.hash;
    } catch (error) {
        console.error('Error creating attestation:', error);
        throw error;
    }
}

async function getAttestation(uid) {
    try {
        const attestation = await eas.getAttestation(uid);
        console.log('Attestation:', attestation);
        return attestation;
    } catch (error) {
        console.error('Error fetching attestation:', error);
        throw error;
    }
}

module.exports = { createAttestation, getAttestation };
