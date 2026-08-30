const { getStudentProfileByUserId, updateStudentProfile } = require('../models/Student');
const { getAllPostings, getPostingById } = require('../models/Posting');
const { getApplicationsByStudent, createApplication } = require('../models/Application');
const { calculateSkillMatch } = require('../services/matchingEngine');
const { findUserById } = require('../models/User');

async function getProfile(req, res) {
    try {
        const userId = req.user.id;
        const user = await findUserById(userId);
        const profile = await getStudentProfileByUserId(userId);

        res.json({
            user: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                avatar_url: user?.avatar_url,
                role: user?.role
            },
            profile: profile || {}
        });
    } catch (err) {
        console.error('Get student profile error:', err);
        res.status(500).json({ message: 'Server error retrieving profile', error: err.message });
    }
}

async function updateProfile(req, res) {
    try {
        const userId = req.user.id;
        const profileData = req.body;
        const updated = await updateStudentProfile(userId, profileData);
        res.json({
            message: 'Profile updated successfully',
            profile: updated
        });
    } catch (err) {
        console.error('Update student profile error:', err);
        res.status(500).json({ message: 'Server error updating profile', error: err.message });
    }
}

async function getScoredPostings(req, res) {
    try {
        const userId = req.user.id;
        const profile = await getStudentProfileByUserId(userId);
        const studentSkills = profile?.skills || [];

        const { search, role, location, minScore } = req.query;
        const postings = await getAllPostings({ search, role, location });

        // Calculate match scores for each posting against this student's skills
        const scored = postings.map(p => {
            const match = calculateSkillMatch(studentSkills, p.required_skills || []);
            return {
                ...p,
                matchScore: match.matchScore,
                matchTier: match.matchTier,
                matchedSkills: match.matchedSkills,
                missingSkills: match.missingSkills,
                totalRequired: match.totalRequired,
                totalMatched: match.totalMatched,
                breakdown: match.breakdown
            };
        });

        // Filter by minScore if provided
        let filtered = scored;
        if (minScore) {
            filtered = filtered.filter(p => p.matchScore >= Number(minScore));
        }

        // Sort by matchScore descending by default
        filtered.sort((a, b) => b.matchScore - a.matchScore);

        res.json(filtered);
    } catch (err) {
        console.error('Get scored postings error:', err);
        res.status(500).json({ message: 'Server error retrieving postings', error: err.message });
    }
}

async function getPostingDetailWithMatch(req, res) {
    try {
        const userId = req.user.id;
        const postingId = req.params.id;

        const posting = await getPostingById(postingId);
        if (!posting) {
            return res.status(404).json({ message: 'Posting not found' });
        }

        const profile = await getStudentProfileByUserId(userId);
        const studentSkills = profile?.skills || [];
        const match = calculateSkillMatch(studentSkills, posting.required_skills || []);

        res.json({
            ...posting,
            matchScore: match.matchScore,
            matchTier: match.matchTier,
            matchedSkills: match.matchedSkills,
            missingSkills: match.missingSkills,
            matchedDetails: match.matchedDetails,
            missingDetails: match.missingDetails,
            breakdown: match.breakdown,
            studentApprovalStatus: profile?.approval_status || 'approved'
        });
    } catch (err) {
        console.error('Get posting detail error:', err);
        res.status(500).json({ message: 'Server error retrieving posting details', error: err.message });
    }
}

async function applyToPosting(req, res) {
    try {
        const userId = req.user.id;
        const { postingId, notes } = req.body;

        if (!postingId) {
            return res.status(400).json({ message: 'postingId is required' });
        }

        const posting = await getPostingById(postingId);
        if (!posting) {
            return res.status(404).json({ message: 'Posting not found' });
        }

        const profile = await getStudentProfileByUserId(userId);
        const studentSkills = profile?.skills || [];
        const matchResult = calculateSkillMatch(studentSkills, posting.required_skills || []);

        const application = await createApplication(userId, postingId, matchResult);

        res.status(201).json({
            message: 'Application submitted successfully!',
            application
        });
    } catch (err) {
        console.error('Apply error:', err);
        res.status(500).json({ message: 'Server error submitting application', error: err.message });
    }
}

async function getMyApplications(req, res) {
    try {
        const userId = req.user.id;
        const applications = await getApplicationsByStudent(userId);
        res.json(applications);
    } catch (err) {
        console.error('Get student applications error:', err);
        res.status(500).json({ message: 'Server error retrieving applications', error: err.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    getScoredPostings,
    getPostingDetailWithMatch,
    applyToPosting,
    getMyApplications
};