const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, findUserById, createUser } = require('../models/User');
const { getStudentProfileByUserId } = require('../models/Student');
const { getRecruiterProfileByUserId } = require('../models/Recruiter');
const { JWT_SECRET } = require('../middleware/authMiddleware');

function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
}

// In-memory reset tokens for password recovery simulation
const passwordResetTokens = new Map();

async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Validate & normalize role
        let targetRole = (role || 'student').toLowerCase();
        if (targetRole === 'industry') targetRole = 'recruiter';
        if (targetRole === 'institution' || targetRole === 'tpo') targetRole = 'college_tpo';

        const validRoles = ['student', 'recruiter', 'college_tpo', 'admin'];
        if (!validRoles.includes(targetRole)) {
            return res.status(400).json({ message: `Invalid role: ${role}. Valid roles are student, recruiter, college_tpo` });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email address already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword, targetRole);
        const token = generateToken(newUser);

        let profile = null;
        if (targetRole === 'student') profile = await getStudentProfileByUserId(newUser.id);
        else if (targetRole === 'recruiter') profile = await getRecruiterProfileByUserId(newUser.id);

        res.status(201).json({
            message: 'Account registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                avatar_url: newUser.avatar_url,
                profile
            }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error during registration', error: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        let profile = null;
        if (user.role === 'student') profile = await getStudentProfileByUserId(user.id);
        else if (user.role === 'recruiter') profile = await getRecruiterProfileByUserId(user.id);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url,
                profile
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login', error: err.message });
    }
}

async function currentUser(req, res) {
    try {
        const user = await findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let profile = null;
        if (user.role === 'student') profile = await getStudentProfileByUserId(user.id);
        else if (user.role === 'recruiter') profile = await getRecruiterProfileByUserId(user.id);

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url,
                profile
            }
        });
    } catch (err) {
        console.error('Current user error:', err);
        res.status(500).json({ message: 'Server error fetching user', error: err.message });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        const user = await findUserByEmail(email);
        if (!user) {
            // For security, still return generic success
            return res.json({ message: 'If an account exists, a password reset link has been dispatched.' });
        }

        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        passwordResetTokens.set(resetToken, { userId: user.id, expires: Date.now() + 3600000 });

        res.json({
            message: 'Password reset link dispatched.',
            dev_reset_token: resetToken,
            instructions: 'In production this is delivered via SMTP. For local testing, use the provided reset token.'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error during password recovery', error: err.message });
    }
}

async function resetPassword(req, res) {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and newPassword are required' });
        }

        const record = passwordResetTokens.get(token);
        if (!record || record.expires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired password reset token' });
        }

        const user = await findUserById(record.userId);
        if (user) {
            user.password = await bcrypt.hash(newPassword, 10);
            passwordResetTokens.delete(token);
            return res.json({ message: 'Password updated successfully. You can now login.' });
        }

        res.status(404).json({ message: 'User account not found' });
    } catch (err) {
        res.status(500).json({ message: 'Server error resetting password', error: err.message });
    }
}

async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Both old and new passwords are required' });
        }

        const user = await findUserById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password does not match' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error changing password', error: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    forgotPassword,
    resetPassword,
    changePassword
};