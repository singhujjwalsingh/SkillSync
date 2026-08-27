const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPassword, changePassword, currentUser, updateUser, getUser, refreshToken, verifyEmail, resendVerificationEmail } = require('../controllers/authController');

router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.post('/api/auth/logout', logoutUser);
router.post('/api/auth/forgot-password', forgotPassword);
router.post('/api/auth/change-password', changePassword);
router.get('/api/auth/me', currentUser);
router.put('/api/users/:id', updateUser);
router.get('/api/users/:id', getUser);
router.post('/api/auth/refresh-token', refreshToken);
router.get('/api/users/verify-email', verifyEmail);
router.post('/api/users/resend-verification-email', resendVerificationEmail);

module.exports = router;