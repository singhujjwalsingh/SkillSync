const { query, isDbConnected, mockStore } = require('../config/db');

async function getRecruiterProfileByUserId(userId) {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM recruiter_profiles WHERE user_id = $1', [userId]);
        if (result.rows[0]) return result.rows[0];
    }
    return mockStore.getRecruiterProfile(userId);
}

async function updateRecruiterProfile(userId, data) {
    if (isDbConnected()) {
        const existing = await query('SELECT id FROM recruiter_profiles WHERE user_id = $1', [userId]);
        if (existing.rows.length === 0) {
            const result = await query(
                `INSERT INTO recruiter_profiles (user_id, company_name, industry, website, logo_url, description, location, company_size)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`,
                [
                    userId,
                    data.company_name || 'My Company',
                    data.industry || 'Technology',
                    data.website || '',
                    data.logo_url || '',
                    data.description || '',
                    data.location || 'Remote',
                    data.company_size || '50-100'
                ]
            );
            return result.rows[0];
        } else {
            const result = await query(
                `UPDATE recruiter_profiles
                 SET company_name = COALESCE($2, company_name),
                     industry = COALESCE($3, industry),
                     website = COALESCE($4, website),
                     logo_url = COALESCE($5, logo_url),
                     description = COALESCE($6, description),
                     location = COALESCE($7, location),
                     company_size = COALESCE($8, company_size),
                     updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = $1
                 RETURNING *`,
                [
                    userId,
                    data.company_name,
                    data.industry,
                    data.website,
                    data.logo_url,
                    data.description,
                    data.location,
                    data.company_size
                ]
            );
            return result.rows[0];
        }
    }
    return mockStore.updateRecruiterProfile(userId, data);
}

module.exports = {
    getRecruiterProfileByUserId,
    updateRecruiterProfile
};
