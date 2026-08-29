const {
    addSkillToStudent,
    getStudentSkills,
    updateStudentSkill,
    deleteStudentSkill,
} = require('../models/Skill');

async function addSkill(req, res) {
    try {
        const { skillName, proficiency } = req.body;
        if (!skillName) {
            return res.status(400).json({ message: 'skillName is required' });
        }
        const skill = await addSkillToStudent(req.user.id, skillName, proficiency || null);
        res.status(201).json(skill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getMySkills(req, res) {
    try {
        const skills = await getStudentSkills(req.user.id);
        res.json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function editSkill(req, res) {
    try {
        const { proficiency } = req.body;
        const updated = await updateStudentSkill(req.params.id, req.user.id, proficiency);
        if (!updated) return res.status(404).json({ message: 'Skill not found' });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function removeSkill(req, res) {
    try {
        const deleted = await deleteStudentSkill(req.params.id, req.user.id);
        if (!deleted) return res.status(404).json({ message: 'Skill not found' });
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { addSkill, getMySkills, editSkill, removeSkill };