const { calculateSkillMatch } = require('../services/matchingEngine');
const { getStudentProfileByUserId } = require('../models/Student');
const { getPostingById, getAllPostings } = require('../models/Posting');

async function calculateScore(req, res) {
    try {
        const { candidateSkills, requiredSkills, studentId, postingId } = req.body;

        let finalCandidateSkills = candidateSkills;
        let finalRequiredSkills = requiredSkills;

        // If IDs are passed, load from database / store
        if (studentId && !finalCandidateSkills) {
            const profile = await getStudentProfileByUserId(studentId);
            finalCandidateSkills = profile?.skills || [];
        }

        if (postingId && !finalRequiredSkills) {
            const posting = await getPostingById(postingId);
            finalRequiredSkills = posting?.required_skills || [];
        }

        const matchResult = calculateSkillMatch(finalCandidateSkills || [], finalRequiredSkills || []);
        res.json(matchResult);
    } catch (err) {
        console.error('Matching calculation error:', err);
        res.status(500).json({ message: 'Server error computing skill match', error: err.message });
    }
}

async function batchMatchPostings(req, res) {
    try {
        const { candidateSkills, studentId } = req.body;
        let skills = candidateSkills;

        if (studentId && !skills) {
            const profile = await getStudentProfileByUserId(studentId);
            skills = profile?.skills || [];
        }

        const postings = await getAllPostings();
        const scoredPostings = postings.map(p => {
            const match = calculateSkillMatch(skills || [], p.required_skills || []);
            return {
                ...p,
                matchScore: match.matchScore,
                matchTier: match.matchTier,
                matchedSkills: match.matchedSkills,
                missingSkills: match.missingSkills,
                totalRequired: match.totalRequired,
                totalMatched: match.totalMatched
            };
        });

        scoredPostings.sort((a, b) => b.matchScore - a.matchScore);
        res.json(scoredPostings);
    } catch (err) {
        console.error('Batch match error:', err);
        res.status(500).json({ message: 'Server error in batch matching', error: err.message });
    }
}

module.exports = {
    calculateScore,
    batchMatchPostings
};
