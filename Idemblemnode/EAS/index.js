const { registerSchema } = require('./schema');
const { createAttestation, getAttestation } = require('./attestation');
const { revokeAttestation } = require('./revoke');

module.exports = {
    registerSchema,
    createAttestation,
    getAttestation,
    revokeAttestation,
    schemas: {
        gitcoinPassport: '0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89',
        superchainFaucet: '0x98ef220cd2f94de79fbc343ef982bfa8f5b315dec6a08f413680ecb7085624d7'
    }
};
