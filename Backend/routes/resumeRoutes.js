const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');
const { uploadResume, getResume } = require('../controllers/resumeController');

router.post('/upload', verifyToken, upload.single('resume'), uploadResume);
router.get('/', verifyToken, getResume);

module.exports = router;