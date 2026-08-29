const { query } = require('../config/db');

async function findOrCreateSkill(name) {
    const existing = await query('SELECT * FROM skills WHERE name = $1', [name]);
    if (existing.rows[0]) return existing.rows[0];

    const inserted = await query(
        'INSERT INTO skills (name) VALUES ($1) RETURNING *',
        [name]
    );
    return inserted.rows[0];
}

async function addSkillToStudent(studentId, skillName, proficiency) {
    const skill = await findOrCreateSkill(skillName);
    const result = await query(
        `INSERT INTO student_skills (student_id, skill_id, proficiency)
     VALUES ($1, $2, $3)
     ON CONFLICT (student_id, skill_id)
     DO UPDATE SET proficiency = $3
     RETURNING *`,
        [studentId, skill.id, proficiency]
    );
    return { ...result.rows[0], skill_name: skill.name };
}

async function getStudentSkills(studentId) {
    const result = await query(
        `SELECT ss.id, s.name AS skill_name, ss.proficiency
     FROM student_skills ss
     JOIN skills s ON s.id = ss.skill_id
     WHERE ss.student_id = $1`,
        [studentId]
    );
    return result.rows;
}

async function updateStudentSkill(studentSkillId, studentId, proficiency) {
    const result = await query(
        `UPDATE student_skills SET proficiency = $1
     WHERE id = $2 AND student_id = $3
     RETURNING *`,
        [proficiency, studentSkillId, studentId]
    );
    return result.rows[0];
}

async function deleteStudentSkill(studentSkillId, studentId) {
    const result = await query(
        `DELETE FROM student_skills WHERE id = $1 AND student_id = $2 RETURNING *`,
        [studentSkillId, studentId]
    );
    return result.rows[0];
}

module.exports = {
    findOrCreateSkill,
    addSkillToStudent,
    getStudentSkills,
    updateStudentSkill,
    deleteStudentSkill,
};