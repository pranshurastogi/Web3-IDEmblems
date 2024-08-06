CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    address VARCHAR(42) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiration_date TIMESTAMP,
    verification_level SMALLINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    wallet_id INT REFERENCES wallets(id),
    tx_hash VARCHAR(66),
    tx_type VARCHAR(50),
    value NUMERIC(20, 8),
    timestamp TIMESTAMP
);
