const express = require('express');
const router = express.Router();
const {
    getMyNotifications,
    markRead,
    markAllRead
} = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', getMyNotifications);
router.put('/read-all', markAllRead);
router.put('/:id/read', markRead);

module.exports = router;
