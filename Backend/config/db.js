const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString
    ? {
        connectionString,
        ssl: connectionString.includes('neon.tech') || connectionString.includes('sslmode=require') || isProduction
            ? { rejectUnauthorized: false }
            : false,
    }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'skillsync_db',
        ssl: (process.env.DB_HOST && process.env.DB_HOST.includes('neon.tech')) || isProduction
            ? { rejectUnauthorized: false }
            : false,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
});

// Helper query function
const query = (text, params) => pool.query(text, params);

// Helper function to initialize database tables
async function initDB() {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createUsersTableQuery);
        console.log('Database tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database tables FULL:', error);
    }
}

module.exports = {
    pool,
    query,
    initDB,
};
