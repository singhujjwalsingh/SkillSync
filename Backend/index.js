const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const skillRoutes = require('./routes/skillRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { initDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use(authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/internships', internshipRoutes);

// Health check and root route
app.get('/', (req, res) => {
    res.json({
        name: 'SkillSync API Gateway',
        status: 'online',
        version: '1.0.0',
        problem_statement: 'SIH PS 26044 — Academia-Industry Skill Mapping Portal',
        endpoints: [
            '/api/auth/register',
            '/api/auth/login',
            '/api/skills',
            '/api/matching/score',
            '/api/student/postings',
            '/api/student/profile',
            '/api/recruiter/postings',
            '/api/college/dashboard',
            '/api/college/analytics',
            '/api/notifications'
        ]
    });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled API Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
});

app.listen(PORT, async () => {
    console.log(`🚀 SkillSync Server running on http://localhost:${PORT}`);
    await initDB();
});

module.exports = app;