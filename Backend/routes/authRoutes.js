const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    currentUser,
    forgotPassword,
    resetPassword,
    changePassword
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public Auth Endpoints
router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.post('/api/auth/forgot-password', forgotPassword);
router.post('/api/auth/reset-password', resetPassword);

// Backward compatible aliases
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Auth Endpoints
router.get('/api/auth/me', verifyToken, currentUser);
router.post('/api/auth/change-password', verifyToken, changePassword);

module.exports = router;