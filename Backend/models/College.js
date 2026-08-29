const { query, isDbConnected, mockStore } = require('../config/db');

async function getAllColleges() {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM colleges ORDER BY name ASC');
        if (result.rows.length > 0) return result.rows;
    }
    return mockStore.colleges;
}

async function getCollegeById(id) {
    if (isDbConnected()) {
        const result = await query('SELECT * FROM colleges WHERE id = $1', [id]);
        return result.rows[0];
    }
    return mockStore.colleges.find(c => c.id === Number(id));
}

module.exports = {
    getAllColleges,
    getCollegeById
};
