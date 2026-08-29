const {
    createPosting,
    updatePosting,
    deletePosting,
    getPostingsByRecruiter,
    getPostingById
} = require('../models/Posting');
const {
    getRecruiterProfileByUserId,
    updateRecruiterProfile
} = require('../models/Recruiter');
const {
    getApplicationsByPosting,
    updateApplicationStatus
} = require('../models/Application');
const { findUserById } = require('../models/User');

async function getProfile(req, res) {
    try {
        const userId = req.user.id;
        const user = await findUserById(userId);
        const profile = await getRecruiterProfileByUserId(userId);
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
        console.error('Get recruiter profile error:', err);
        res.status(500).json({ message: 'Server error retrieving recruiter profile', error: err.message });
    }
}

async function updateProfile(req, res) {
    try {
        const userId = req.user.id;
        const data = req.body;
        const profile = await updateRecruiterProfile(userId, data);
        res.json({
            message: 'Company profile updated successfully',
            profile
        });
    } catch (err) {
        console.error('Update recruiter profile error:', err);
        res.status(500).json({ message: 'Server error updating company profile', error: err.message });
    }
}

async function addPosting(req, res) {
    try {
        const { title, role, location, stipend, type, duration, deadline, description, required_skills, perks } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Posting title is required' });
        }

        const profile = await getRecruiterProfileByUserId(req.user.id);
        const user = await findUserById(req.user.id);

        const posting = await createPosting(req.user.id, {
            title,
            role: role || title,
            company_name: profile?.company_name || user?.name || 'Company',
            company_logo: profile?.logo_url || '',
            location: location || 'Remote',
            stipend: stipend || 'Competitive',
            type: type || 'Internship',
            duration: duration || '3-6 Months',
            deadline: deadline || null,
            description: description || '',
            required_skills: Array.isArray(required_skills) ? required_skills : [],
            perks: Array.isArray(perks) ? perks : ['Certificate', 'Flexible Work']
        });

        res.status(201).json({
            message: 'Posting published successfully',
            posting
        });
    } catch (err) {
        console.error('Add posting error:', err);
        res.status(500).json({ message: 'Server error creating posting', error: err.message });
    }
}

async function editPosting(req, res) {
    try {
        const postingId = req.params.id;
        const updated = await updatePosting(postingId, req.user.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Posting not found or unauthorized' });
        }
        res.json({
            message: 'Posting updated successfully',
            posting: updated
        });
    } catch (err) {
        console.error('Edit posting error:', err);
        res.status(500).json({ message: 'Server error updating posting', error: err.message });
    }
}

async function removePosting(req, res) {
    try {
        const postingId = req.params.id;
        const deleted = await deletePosting(postingId, req.user.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Posting not found or unauthorized' });
        }
        res.json({ message: 'Posting removed successfully' });
    } catch (err) {
        console.error('Delete posting error:', err);
        res.status(500).json({ message: 'Server error deleting posting', error: err.message });
    }
}

async function getMyPostings(req, res) {
    try {
        const recruiterId = req.user.id;
        const postings = await getPostingsByRecruiter(recruiterId);

        // Enrich with applicant counts
        const enriched = await Promise.all(postings.map(async (p) => {
            const apps = await getApplicationsByPosting(p.id);
            return {
                ...p,
                applicant_count: apps.length,
                shortlisted_count: apps.filter(a => a.status === 'shortlisted' || a.status === 'interview' || a.status === 'offered').length
            };
        }));

        res.json(enriched);
    } catch (err) {
        console.error('Get my postings error:', err);
        res.status(500).json({ message: 'Server error retrieving postings', error: err.message });
    }
}

async function getApplicants(req, res) {
    try {
        const postingId = req.params.id;
        const posting = await getPostingById(postingId);

        if (!posting) {
            return res.status(404).json({ message: 'Posting not found' });
        }

        // Fetch applicants
        const applicants = await getApplicationsByPosting(postingId);

        // Sort by match score descending by default
        applicants.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

        res.json({
            posting,
            total_applicants: applicants.length,
            applicants
        });
    } catch (err) {
        console.error('Get applicants error:', err);
        res.status(500).json({ message: 'Server error retrieving applicants', error: err.message });
    }
}

async function updateStatus(req, res) {
    try {
        const appId = req.params.id;
        const { status, note } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const validStatuses = ['applied', 'shortlisted', 'interview', 'offered', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}` });
        }

        const updated = await updateApplicationStatus(appId, status, note);
        if (!updated) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json({
            message: `Application status updated to "${status}"`,
            application: updated
        });
    } catch (err) {
        console.error('Update status error:', err);
        res.status(500).json({ message: 'Server error updating application status', error: err.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    addPosting,
    editPosting,
    removePosting,
    getMyPostings,
    getApplicants,
    updateStatus
};