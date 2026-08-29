const { query, isDbConnected, mockStore } = require('../config/db');

async function getAllPostings({ role, location, search } = {}) {
    let postings = [];
    if (isDbConnected()) {
        let sql = 'SELECT * FROM postings WHERE is_active = TRUE';
        const params = [];
        if (role) {
            params.push(`%${role}%`);
            sql += ` AND role ILIKE $${params.length}`;
        }
        if (location) {
            params.push(`%${location}%`);
            sql += ` AND location ILIKE $${params.length}`;
        }
        sql += ' ORDER BY created_at DESC';
        const result = await query(sql, params);
        postings = result.rows;
    } else {
        postings = mockStore.getPostings().filter(p => p.is_active);
    }

    if (search) {
        const s = search.toLowerCase();
        postings = postings.filter(p => 
            p.title.toLowerCase().includes(s) ||
            p.company_name.toLowerCase().includes(s) ||
            p.location.toLowerCase().includes(s) ||
            (p.required_skills && p.required_skills.some(sk => (sk.name || sk).toLowerCase().includes(s)))
        );
    }

    return postings;
}

async function getPostingById(id) {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM postings WHERE id = $1', [id]);
        return result.rows[0];
    }
    return mockStore.getPostingById(id);
}

async function createPosting(recruiterId, postingData) {
    if (isDbConnected()) {
        const result = await query(
            `INSERT INTO postings (recruiter_id, company_name, company_logo, title, role, location, stipend, type, duration, deadline, description, required_skills, perks, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
             RETURNING *`,
            [
                recruiterId,
                postingData.company_name,
                postingData.company_logo || '',
                postingData.title,
                postingData.role,
                postingData.location || 'Remote',
                postingData.stipend || 'Competitive',
                postingData.type || 'Internship',
                postingData.duration || '3-6 Months',
                postingData.deadline || null,
                postingData.description || '',
                JSON.stringify(postingData.required_skills || []),
                JSON.stringify(postingData.perks || []),
                true
            ]
        );
        return result.rows[0];
    }
    return mockStore.createPosting(recruiterId, postingData);
}

async function updatePosting(id, recruiterId, data) {
    if (isDbConnected()) {
        const result = await query(
            `UPDATE postings
             SET title = COALESCE($1, title),
                 role = COALESCE($2, role),
                 location = COALESCE($3, location),
                 stipend = COALESCE($4, stipend),
                 type = COALESCE($5, type),
                 duration = COALESCE($6, duration),
                 deadline = COALESCE($7, deadline),
                 description = COALESCE($8, description),
                 required_skills = COALESCE($9, required_skills),
                 perks = COALESCE($10, perks),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $11 AND recruiter_id = $12
             RETURNING *`,
            [
                data.title,
                data.role,
                data.location,
                data.stipend,
                data.type,
                data.duration,
                data.deadline,
                data.description,
                data.required_skills ? JSON.stringify(data.required_skills) : null,
                data.perks ? JSON.stringify(data.perks) : null,
                id,
                recruiterId
            ]
        );
        return result.rows[0];
    }
    return mockStore.updatePosting(id, recruiterId, data);
}

async function deletePosting(id, recruiterId) {
    if (isDbConnected()) {
        const result = await query(
            'DELETE FROM postings WHERE id = $1 AND recruiter_id = $2 RETURNING *',
            [id, recruiterId]
        );
        return !!result.rows[0];
    }
    return mockStore.deletePosting(id, recruiterId);
}

async function getPostingsByRecruiter(recruiterId) {
    if (isDbConnected()) {
        const result = await query(
            'SELECT * FROM postings WHERE recruiter_id = $1 ORDER BY created_at DESC',
            [recruiterId]
        );
        return result.rows;
    }
    return mockStore.getPostings().filter(p => p.recruiter_id === Number(recruiterId));
}

module.exports = {
    getAllPostings,
    getPostingById,
    createPosting,
    updatePosting,
    deletePosting,
    getPostingsByRecruiter
};
