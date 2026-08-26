const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const { initDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to SkillSync");
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.DATABASE_URL || process.env.DB_HOST) {
        await initDB();
    }
});