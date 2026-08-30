const { query, isDbConnected, mockStore } = require('../config/db');

async function getStudentProfileByUserId(userId) {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM student_profiles WHERE user_id = $1', [userId]);
        if (result.rows[0]) return result.rows[0];
    }
    return mockStore.getStudentProfile(userId);
}

async function updateStudentProfile(userId, profileData) {
    if (isDbConnected()) {
        const existing = await query('SELECT id FROM student_profiles WHERE user_id = $1', [userId]);
        if (existing.rows.length === 0) {
            const result = await query(
                `INSERT INTO student_profiles (user_id, college_name, roll_no, department, graduation_year, cgpa, skills, bio, phone, resume_url, github_url, linkedin_url, portfolio_url)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                 RETURNING *`,
                [
                    userId,
                    profileData.college_name || '',
                    profileData.roll_no || '',
                    profileData.department || '',
                    profileData.graduation_year || 2026,
                    profileData.cgpa || 0,
                    JSON.stringify(profileData.skills || []),
                    profileData.bio || '',
                    profileData.phone || '',
                    profileData.resume_url || '',
                    profileData.github_url || '',
                    profileData.linkedin_url || '',
                    profileData.portfolio_url || ''
                ]
            );
            return result.rows[0];
        } else {
            const result = await query(
                `UPDATE student_profiles
                 SET college_name = COALESCE($2, college_name),
                     roll_no = COALESCE($3, roll_no),
                     department = COALESCE($4, department),
                     graduation_year = COALESCE($5, graduation_year),
                     cgpa = COALESCE($6, cgpa),
                     skills = COALESCE($7, skills),
                     bio = COALESCE($8, bio),
                     phone = COALESCE($9, phone),
                     resume_url = COALESCE($10, resume_url),
                     github_url = COALESCE($11, github_url),
                     linkedin_url = COALESCE($12, linkedin_url),
                     portfolio_url = COALESCE($13, portfolio_url),
                     updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = $1
                 RETURNING *`,
                [
                    userId,
                    profileData.college_name,
                    profileData.roll_no,
                    profileData.department,
                    profileData.graduation_year,
                    profileData.cgpa,
                    profileData.skills ? JSON.stringify(profileData.skills) : null,
                    profileData.bio,
                    profileData.phone,
                    profileData.resume_url,
                    profileData.github_url,
                    profileData.linkedin_url,
                    profileData.portfolio_url
                ]
            );
            return result.rows[0];
        }
    }
    return mockStore.updateStudentProfile(userId, profileData);
}

async function getAllStudents() {
    if (isDbConnected()) {
        const result = await query(
            `SELECT u.id, u.name, u.email, u.avatar_url, sp.college_name, sp.roll_no, sp.department, sp.graduation_year, sp.cgpa, sp.skills, sp.approval_status, sp.resume_url
             FROM users u
             LEFT JOIN student_profiles sp ON u.id = sp.user_id
             WHERE u.role = 'student'`
        );
        return result.rows;
    }
    return mockStore.getAllStudents();
}

async function updateStudentApprovalStatus(userId, status) {
    if (isDbConnected()) {
        const result = await query(
            `UPDATE student_profiles SET approval_status = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *`,
            [userId, status]
        );
        return result.rows[0];
    }
    return mockStore.updateStudentApproval(userId, status);
}

module.exports = {
    getStudentProfileByUserId,
    updateStudentProfile,
    getAllStudents,
    updateStudentApprovalStatus
};
