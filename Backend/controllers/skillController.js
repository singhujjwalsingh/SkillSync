const { getAllSkills, searchSkills, addSkill } = require('../models/Skill');

async function getSkills(req, res) {
    try {
        const { category, search } = req.query;
        let skills = [];
        if (search) {
            skills = await searchSkills(search);
        } else {
            skills = await getAllSkills();
        }

        if (category) {
            skills = skills.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }

        // Group by category for convenience if requested
        if (req.query.grouped === 'true') {
            const grouped = {};
            skills.forEach(s => {
                const cat = s.category || 'Other';
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(s);
            });
            return res.json({ categories: grouped, total: skills.length });
        }

        res.json(skills);
    } catch (err) {
        console.error('Get skills error:', err);
        res.status(500).json({ message: 'Server error retrieving skills taxonomy', error: err.message });
    }
}

async function createSkill(req, res) {
    try {
        const { name, category, aliases } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Skill name is required' });
        }

        const skill = await addSkill(name, category || 'General', Array.isArray(aliases) ? aliases : []);
        res.status(201).json(skill);
    } catch (err) {
        console.error('Create skill error:', err);
        res.status(500).json({ message: 'Server error adding skill', error: err.message });
    }
}

module.exports = {
    getSkills,
    createSkill
};