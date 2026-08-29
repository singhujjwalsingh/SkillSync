const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { addSkill, getMySkills, editSkill, removeSkill } = require('../controllers/skillController');

router.post('/', verifyToken, addSkill);
router.get('/', verifyToken, getMySkills);
router.put('/:id', verifyToken, editSkill);
router.delete('/:id', verifyToken, removeSkill);

module.exports = router;