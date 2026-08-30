const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    getScoredPostings,
    getPostingDetailWithMatch,
    applyToPosting,
    getMyApplications
} = require('../controllers/studentController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.use(checkRole('student', 'admin'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/profile', updateProfile);

router.get('/postings', getScoredPostings);
router.get('/postings/:id', getPostingDetailWithMatch);

router.post('/apply', applyToPosting);
router.post('/applications', applyToPosting);
router.get('/applications', getMyApplications);

module.exports = router;