const express = require('express');
const router = express.Router();
const { getSkills, createSkill } = require('../controllers/skillController');

router.get('/', getSkills);
router.get('/search', getSkills);
router.post('/', createSkill);

module.exports = router;