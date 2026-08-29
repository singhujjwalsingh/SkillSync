const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const {
    addPosting,
    editPosting,
    removePosting,
    getMyPostings,
    getApplicants,
} = require('../controllers/recruiterController');

router.post('/postings', verifyToken, requireRole('recruiter'), addPosting);
router.put('/postings/:id', verifyToken, requireRole('recruiter'), editPosting);
router.delete('/postings/:id', verifyToken, requireRole('recruiter'), removePosting);
router.get('/postings', verifyToken, requireRole('recruiter'), getMyPostings);
router.get('/postings/:id/applicants', verifyToken, requireRole('recruiter'), getApplicants);

module.exports = router;