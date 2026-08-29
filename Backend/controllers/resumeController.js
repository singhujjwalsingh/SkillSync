const { updateStudentProfile, getStudentProfileByUserId } = require('../models/Student');
const path = require('path');
const fs = require('fs');

async function uploadResume(req, res) {
    try {
        let resumeUrl = req.body.resume_url;
        
        if (req.file) {
            resumeUrl = `/uploads/${req.file.filename}`;
        }

        if (!resumeUrl) {
            // Default demo resume URL if mock upload
            resumeUrl = `/uploads/resumes/student_verified_resume.pdf`;
        }

        const profile = await updateStudentProfile(req.user.id, { resume_url: resumeUrl });
        res.status(200).json({
            message: 'Resume uploaded and linked to profile successfully',
            resume_url: resumeUrl,
            profile
        });
    } catch (err) {
        console.error('Resume upload error:', err);
        res.status(500).json({ message: 'Server error processing resume', error: err.message });
    }
}

async function getResume(req, res) {
    try {
        const profile = await getStudentProfileByUserId(req.user.id);
        if (!profile || !profile.resume_url) {
            return res.status(404).json({ message: 'No resume on file' });
        }
        res.json({ resume_url: profile.resume_url });
    } catch (err) {
        console.error('Get resume error:', err);
        res.status(500).json({ message: 'Server error fetching resume' });
    }
}

module.exports = { uploadResume, getResume };