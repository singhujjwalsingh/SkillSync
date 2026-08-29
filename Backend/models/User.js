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
    getStudentProfile,
    upsertStudentProfile
};

async function getStudentProfile(userId) {
    const result = await query(
        `SELECT u.id, u.name, u.email, u.role, sp.college, sp.bio, sp.phone, sp.resume_url
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE u.id = $1`,
        [userId]
    );
    return result.rows[0];
}

async function upsertStudentProfile(userId, { college, bio, phone }) {
    const result = await query(
        `INSERT INTO student_profiles (user_id, college, bio, phone)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id)
     DO UPDATE SET college = $2, bio = $3, phone = $4, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
        [userId, college, bio, phone]
    );
    return result.rows[0];
}