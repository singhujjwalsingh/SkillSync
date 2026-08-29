const { query, isDbConnected, mockStore } = require('../config/db');

async function getNotificationsByUser(userId) {
    if (isDbConnected()) {
        const result = await query(
            'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    }
    return mockStore.getNotifications(userId);
}

async function createNotification(userId, title, message, type = 'system', link = '') {
    if (isDbConnected()) {
        const result = await query(
            `INSERT INTO notifications (user_id, title, message, type, link)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [userId, title, message, type, link]
        );
        return result.rows[0];
    }
    return mockStore.createNotification(userId, title, message, type, link);
}

async function markAsRead(id, userId) {
    if (isDbConnected()) {
        const result = await query(
            'UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        return result.rows[0];
    }
    return mockStore.markNotificationRead(id, userId);
}

async function markAllAsRead(userId) {
    if (isDbConnected()) {
        await query(
            'UPDATE notifications SET is_read = TRUE WHERE user_id = $1',
            [userId]
        );
        return true;
    }
    return mockStore.markAllNotificationsRead(userId);
}

module.exports = {
    getNotificationsByUser,
    createNotification,
    markAsRead,
    markAllAsRead
};
