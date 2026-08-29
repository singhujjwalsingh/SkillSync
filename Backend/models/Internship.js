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

async function createInternship(recruiterId, { title, company, location, required_skills, description }) {
    const result = await query(
        `INSERT INTO internships (title, company, location, required_skills, description, posted_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [title, company, location, required_skills, description, recruiterId]
    );
    return result.rows[0];
}

async function updateInternship(id, recruiterId, { title, company, location, required_skills, description }) {
    const result = await query(
        `UPDATE internships
     SET title = $1, company = $2, location = $3, required_skills = $4, description = $5
     WHERE id = $6 AND posted_by = $7
     RETURNING *`,
        [title, company, location, required_skills, description, id, recruiterId]
    );
    return result.rows[0];
}

async function deleteInternship(id, recruiterId) {
    const result = await query(
        `DELETE FROM internships WHERE id = $1 AND posted_by = $2 RETURNING *`,
        [id, recruiterId]
    );
    return result.rows[0];
}

async function getInternshipsByRecruiter(recruiterId) {
    const result = await query(
        `SELECT * FROM internships WHERE posted_by = $1 ORDER BY created_at DESC`,
        [recruiterId]
    );
    return result.rows;
}

async function getApplicantsForInternship(internshipId, recruiterId) {
    const owns = await query(
        `SELECT id FROM internships WHERE id = $1 AND posted_by = $2`,
        [internshipId, recruiterId]
    );
    if (!owns.rows[0]) return null;

    const result = await query(
        `SELECT a.id AS application_id, a.status, a.applied_at,
            u.id AS student_id, u.name, u.email
     FROM applications a
     JOIN users u ON u.id = a.student_id
     WHERE a.internship_id = $1
     ORDER BY a.applied_at DESC`,
        [internshipId]
    );
    return result.rows;
}

module.exports = {
    getAllInternships,
    getInternshipById,
    applyToInternship,
    createInternship,
    updateInternship,
    deleteInternship,
    getInternshipsByRecruiter,
    getApplicantsForInternship,
};