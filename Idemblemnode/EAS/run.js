const { registerSchema, createAttestation, getAttestation, revokeAttestation, schemas } = require('./EAS/index');

// Example usage
async function main() {
    // Register a new schema (this is usually done once)
    // const schema = 'uint256 eventId, uint8 verificationScore';
    // const resolverAddress = '0xYourResolverAddress';
    // await registerSchema(schema, resolverAddress, true);

    // Create an attestation for a wallet address
    const recipient = '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165';
    const expirationTime = 0;  // No expiration
    const revocable = true;
    const data = [
        { name: 'eventId', value: 1, type: 'uint256' },
        { name: 'verificationScore', value: 5, type: 'uint8' }
    ];

    await createAttestation(schemas.gitcoinPassport, recipient, expirationTime, revocable, data);

    // Fetch an attestation
    const attestationUID = '0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e';
    await getAttestation(attestationUID);

    // Revoke an attestation
    await revokeAttestation(schemas.gitcoinPassport, attestationUID);
}

main().catch(console.error);
