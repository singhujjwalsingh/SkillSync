const { query } = require('../config/db');
const path = require('path');

async function uploadResume(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const resumeUrl = `/uploads/${req.file.filename}`;

        const result = await query(
            `INSERT INTO student_profiles (user_id, resume_url)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET resume_url = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
            [req.user.id, resumeUrl]
        );

        res.status(201).json({ message: 'Resume uploaded successfully', profile: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getResume(req, res) {
    try {
        const result = await query(
            'SELECT resume_url FROM student_profiles WHERE user_id = $1',
            [req.user.id]
        );
        const profile = result.rows[0];
        if (!profile || !profile.resume_url) {
            return res.status(404).json({ message: 'No resume found' });
        }
        const filePath = path.join(__dirname, '..', profile.resume_url);
        res.download(filePath);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { uploadResume, getResume };