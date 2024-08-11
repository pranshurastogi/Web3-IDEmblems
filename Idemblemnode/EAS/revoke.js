const { EAS } = require('@ethereum-attestation-service/eas-sdk');
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const eas = new EAS(process.env.EAS_CONTRACT_ADDRESS);
eas.connect(wallet);

async function revokeAttestation(schemaUID, uid) {
    try {
        const tx = await eas.revoke({
            schema: schemaUID,
            data: { uid }
        });

        await tx.wait();
        console.log(`Attestation revoked successfully with hash: ${tx.hash}`);
        return tx.hash;
    } catch (error) {
        console.error('Error revoking attestation:', error);
        throw error;
    }
}

module.exports = { revokeAttestation };
