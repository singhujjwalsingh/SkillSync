const { query, isDbConnected, mockStore, SKILLS_TAXONOMY } = require('../config/db');

async function getAllSkills() {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM skills ORDER BY popularity_count DESC, name ASC');
        if (result.rows.length > 0) return result.rows;
    }
    return mockStore.skills || SKILLS_TAXONOMY;
}

async function searchSkills(keyword) {
    if (!keyword) return getAllSkills();
    const cleanKey = keyword.toLowerCase().trim();
    const all = await getAllSkills();
    return all.filter(s => 
        s.name.toLowerCase().includes(cleanKey) ||
        (s.aliases && s.aliases.some(a => a.toLowerCase().includes(cleanKey))) ||
        (s.category && s.category.toLowerCase().includes(cleanKey))
    );
}

async function addSkill(name, category = 'General', aliases = []) {
    const cleanName = name.trim();
    if (isDbConnected()) {
        const result = await query(
            `INSERT INTO skills (name, category, aliases, popularity_count)
             VALUES ($1, $2, $3, 1)
             ON CONFLICT (name) DO UPDATE SET popularity_count = skills.popularity_count + 1
             RETURNING *`,
            [cleanName, category, aliases]
        );
        return result.rows[0];
    }
    const existing = mockStore.skills.find(s => s.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) {
        existing.popularity_count += 1;
        return existing;
    }
    const newSkill = {
        id: mockStore.skills.length + 1,
        name: cleanName,
        category,
        aliases,
        popularity_count: 1
    };
    mockStore.skills.push(newSkill);
    return newSkill;
}

module.exports = {
    getAllSkills,
    searchSkills,
    addSkill
};