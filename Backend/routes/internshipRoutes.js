const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { listInternships, getInternship, apply } = require('../controllers/internshipController');

router.get('/', verifyToken, listInternships);
router.get('/:id', verifyToken, getInternship);
router.post('/:id/apply', verifyToken, apply);

module.exports = router;