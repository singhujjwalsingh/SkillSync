const { query } = require('../config/db');

async function getAllInternships({ skill, location } = {}) {
    let sql = 'SELECT * FROM internships WHERE 1=1';
    const params = [];

    if (skill) {
        params.push(`%${skill}%`);
        sql += ` AND required_skills ILIKE $${params.length}`;
    }
    if (location) {
        params.push(`%${location}%`);
        sql += ` AND location ILIKE $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';
    const result = await query(sql, params);
    return result.rows;
}

async function getInternshipById(id) {
    const result = await query('SELECT * FROM internships WHERE id = $1', [id]);
    return result.rows[0];
}

async function applyToInternship(studentId, internshipId) {
    const result = await query(
        `INSERT INTO applications (student_id, internship_id)
     VALUES ($1, $2)
     RETURNING *`,
        [studentId, internshipId]
    );
    return result.rows[0];
}

module.exports = { getAllInternships, getInternshipById, applyToInternship };