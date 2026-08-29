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
const { initDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to SkillSync");
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.DATABASE_URL || process.env.DB_HOST) {
        await initDB();
    }
});