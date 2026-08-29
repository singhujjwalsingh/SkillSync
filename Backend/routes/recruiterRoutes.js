const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    addPosting,
    editPosting,
    removePosting,
    getMyPostings,
    getApplicants,
    updateStatus
} = require('../controllers/recruiterController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.use(checkRole('recruiter', 'industry', 'admin'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/profile', updateProfile);

router.get('/postings', getMyPostings);
router.post('/postings', addPosting);
router.put('/postings/:id', editPosting);
router.delete('/postings/:id', removePosting);

router.get('/postings/:id/applicants', getApplicants);
router.put('/applications/:id/status', updateStatus);

module.exports = router;