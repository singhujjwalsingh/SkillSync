const { query } = require('../config/db');

async function findUserByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

async function findUserById(id) {
    const result = await query('SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

async function createUser(name, email, hashedPassword, role) {
    const result = await query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at',
        [name, email, hashedPassword, role]
    );
    return result.rows[0];
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
};