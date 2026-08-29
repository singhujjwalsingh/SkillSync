const { query, isDbConnected, mockStore } = require('../config/db');

async function getApplicationsByStudent(studentId) {
    if (isDbConnected()) {
        const result = await query(
            `SELECT a.*, p.title, p.company_name, p.company_logo, p.location, p.stipend, p.type, p.deadline
             FROM applications a
             JOIN postings p ON a.posting_id = p.id
             WHERE a.student_id = $1
             ORDER BY a.applied_at DESC`,
            [studentId]
        );
        return result.rows;
    }
    return mockStore.getApplicationsByStudent(studentId);
}

async function getApplicationsByPosting(postingId) {
    if (isDbConnected()) {
        const result = await query(
            `SELECT a.*, u.name AS student_name, u.email AS student_email, u.avatar_url AS student_avatar,
                    sp.roll_no, sp.department, sp.graduation_year, sp.cgpa, sp.skills AS student_skills, sp.resume_url
             FROM applications a
             JOIN users u ON a.student_id = u.id
             LEFT JOIN student_profiles sp ON u.id = sp.user_id
             WHERE a.posting_id = $1
             ORDER BY a.match_score DESC, a.applied_at DESC`,
            [postingId]
        );
        return result.rows;
    }
    return mockStore.getApplicationsByPosting(postingId);
}

async function createApplication(studentId, postingId, matchResult) {
    if (isDbConnected()) {
        const existing = await query(
            'SELECT * FROM applications WHERE student_id = $1 AND posting_id = $2',
            [studentId, postingId]
        );
        if (existing.rows[0]) return existing.rows[0];

        const history = [{ status: 'applied', date: new Date().toISOString(), note: 'Application submitted' }];
        const result = await query(
            `INSERT INTO applications (student_id, posting_id, status, match_score, matched_skills, missing_skills, status_history)
             VALUES ($1, $2, 'applied', $3, $4, $5, $6)
             RETURNING *`,
            [
                studentId,
                postingId,
                matchResult?.matchScore || 0,
                JSON.stringify(matchResult?.matchedSkills || []),
                JSON.stringify(matchResult?.missingSkills || []),
                JSON.stringify(history)
            ]
        );
        return result.rows[0];
    }
    return mockStore.createApplication(studentId, postingId, matchResult);
}

async function updateApplicationStatus(appId, status, note = '') {
    if (isDbConnected()) {
        const current = await query('SELECT status_history FROM applications WHERE id = $1', [appId]);
        let history = [];
        if (current.rows[0] && current.rows[0].status_history) {
            history = typeof current.rows[0].status_history === 'string'
                ? JSON.parse(current.rows[0].status_history)
                : current.rows[0].status_history;
        }
        history.push({
            status,
            date: new Date().toISOString(),
            note: note || `Status updated to ${status}`
        });

        const result = await query(
            `UPDATE applications
             SET status = $1, status_history = $2, updated_at = CURRENT_TIMESTAMP
             WHERE id = $3
             RETURNING *`,
            [status, JSON.stringify(history), appId]
        );
        return result.rows[0];
    }
    return mockStore.updateApplicationStatus(appId, status, note);
}

async function getAllApplications() {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM applications');
        return result.rows;
    }
    return mockStore.applications;
}

module.exports = {
    getApplicationsByStudent,
    getApplicationsByPosting,
    createApplication,
    updateApplicationStatus,
    getAllApplications
};
