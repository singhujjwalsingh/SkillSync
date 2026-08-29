const { getAllInternships, getInternshipById, applyToInternship } = require('../models/Internship');

async function listInternships(req, res) {
    try {
        const { skill, location } = req.query;
        const internships = await getAllInternships({ skill, location });
        res.json(internships);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getInternship(req, res) {
    try {
        const internship = await getInternshipById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });
        res.json(internship);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function apply(req, res) {
    try {
        const internship = await getInternshipById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });

        const application = await applyToInternship(req.user.id, req.params.id);
        res.status(201).json({ message: 'Applied successfully', application });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ message: 'You have already applied to this internship' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { listInternships, getInternship, apply };