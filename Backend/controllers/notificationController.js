const {
    getNotificationsByUser,
    markAsRead,
    markAllAsRead,
    createNotification
} = require('../models/Notification');

async function getMyNotifications(req, res) {
    try {
        const notifications = await getNotificationsByUser(req.user.id);
        const unreadCount = notifications.filter(n => !n.is_read).length;
        res.json({
            unread_count: unreadCount,
            notifications
        });
    } catch (err) {
        console.error('Get notifications error:', err);
        res.status(500).json({ message: 'Server error fetching notifications', error: err.message });
    }
}

async function markRead(req, res) {
    try {
        const notifId = req.params.id;
        const updated = await markAsRead(notifId, req.user.id);
        res.json({ message: 'Notification marked as read', notification: updated });
    } catch (err) {
        console.error('Mark read error:', err);
        res.status(500).json({ message: 'Server error marking notification read', error: err.message });
    }
}

async function markAllRead(req, res) {
    try {
        await markAllAsRead(req.user.id);
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error('Mark all read error:', err);
        res.status(500).json({ message: 'Server error marking all read', error: err.message });
    }
}

module.exports = {
    getMyNotifications,
    markRead,
    markAllRead
};
