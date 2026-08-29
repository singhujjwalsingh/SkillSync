const {
    createInternship,
    updateInternship,
    deleteInternship,
    getInternshipsByRecruiter,
    getApplicantsForInternship,
} = require('../models/Internship');

async function addPosting(req, res) {
    try {
        const { title, company, location, required_skills, description } = req.body;
        if (!title || !company) {
            return res.status(400).json({ message: 'title and company are required' });
        }
        const posting = await createInternship(req.user.id, { title, company, location, required_skills, description });
        res.status(201).json(posting);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function editPosting(req, res) {
    try {
        const { title, company, location, required_skills, description } = req.body;
        const updated = await updateInternship(req.params.id, req.user.id, { title, company, location, required_skills, description });
        if (!updated) return res.status(404).json({ message: 'Posting not found or not yours' });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function removePosting(req, res) {
    try {
        const deleted = await deleteInternship(req.params.id, req.user.id);
        if (!deleted) return res.status(404).json({ message: 'Posting not found or not yours' });
        res.json({ message: 'Posting deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getMyPostings(req, res) {
    try {
        const postings = await getInternshipsByRecruiter(req.user.id);
        res.json(postings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getApplicants(req, res) {
    try {
        const applicants = await getApplicantsForInternship(req.params.id, req.user.id);
        if (applicants === null) return res.status(404).json({ message: 'Posting not found or not yours' });
        res.json(applicants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { addPosting, editPosting, removePosting, getMyPostings, getApplicants };