const { getStudentProfile, upsertStudentProfile } = require('../models/User');

async function getProfile(req, res) {
    try {
        const profile = await getStudentProfile(req.user.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateProfile(req, res) {
    try {
        const { college, bio, phone } = req.body;
        const updated = await upsertStudentProfile(req.user.id, { college, bio, phone });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getProfile, updateProfile };