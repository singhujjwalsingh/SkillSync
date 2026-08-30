const { query, isDbConnected, mockStore } = require('../config/db');

async function findUserByEmail(email) {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows[0]) return result.rows[0];
    }
    return mockStore.findUserByEmail(email);
}

async function findUserById(id) {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows[0]) return result.rows[0];
    }
    return mockStore.findUserById(id);
}

async function createUser(name, email, passwordHash, role = 'student', avatarUrl = '') {
    if (isDbConnected()) {
        const result = await query(
            `INSERT INTO users (name, email, password, role, avatar_url)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, email, role, avatar_url, created_at`,
            [name, email, passwordHash, role, avatarUrl]
        );
        if (result.rows[0]) return result.rows[0];
    }
    return mockStore.createUser(name, email, passwordHash, role, avatarUrl);
}

async function getAllUsers() {
    if (isDbConnected()) {
        const result = await query('SELECT id, name, email, role, avatar_url, is_verified, created_at FROM users');
        return result.rows;
    }
    return mockStore.users.map(({ password, ...rest }) => rest);
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    getAllUsers
};