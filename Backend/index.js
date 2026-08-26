const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(authRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to SkillSync");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});