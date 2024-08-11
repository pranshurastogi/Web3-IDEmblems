// Worldcoin/backend/index.js

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/verify', async (req, res) => {
    const { signal, nullifierHash, proof } = req.body;

    if (!signal || !nullifierHash || !proof) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.post(process.env.WORLDCOIN_API_URL, {
            signal,
            nullifierHash,
            proof
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.WORLDCOIN_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const result = response.data;

        if (result.success) {
            res.json({ proof: result.proof });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        console.error("Error verifying with Worldcoin API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
