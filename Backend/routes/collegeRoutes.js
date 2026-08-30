const express = require('express');
const router = express.Router();
const {
    getDashboard,
    getStudentsList,
    updateApproval,
    getAnalytics
} = require('../controllers/collegeController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.use(checkRole('college_tpo', 'institution', 'admin'));

router.get('/dashboard', getDashboard);
router.get('/students', getStudentsList);
router.put('/students/:id/approval', updateApproval);
router.get('/analytics', getAnalytics);

module.exports = router;
