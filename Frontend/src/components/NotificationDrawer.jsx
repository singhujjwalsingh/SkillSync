import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  X,
  CheckCircle2,
  Briefcase,
  Award,
  Sparkles,
  ExternalLink,
  CheckCheck
} from 'lucide-react';
import NeuButton from './common/NeuButton';

const NotificationDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('skillsync_token');
      if (!token) return;
      const res = await fetch('/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.warn('Fallback notifications:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    try {
      const token = localStorage.getItem('skillsync_token');
      await fetch('/api/notifications/read-all', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-[var(--bg-main)] neu-flat h-full p-6 flex flex-col justify-between shadow-2xl animate-scale-up overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col gap-3 pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600 neu-inset">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Notifications</h2>
                <span className="text-xs text-[var(--text-secondary)]">
                  {unreadCount} unread alerts
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl neu-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {unreadCount > 0 && (
            <NeuButton
              size="sm"
              variant="secondary"
              icon={CheckCheck}
              onClick={handleMarkAllRead}
              className="self-end"
            >
              Mark all as read
            </NeuButton>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 py-4 flex flex-col gap-3 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-xs text-[var(--text-muted)]">
              <Sparkles className="w-8 h-8 opacity-40 mb-2" />
              No notifications at this moment.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl transition-all flex flex-col gap-1.5 ${
                  !n.is_read
                    ? 'neu-flat border-l-4 border-indigo-600 bg-indigo-500/5'
                    : 'neu-inset opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {n.message}
                </p>
                {n.link && (
                  <Link
                    to={n.link}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline mt-1"
                  >
                    View Details <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
          SkillSync Real-time Alerts
        </div>

      </div>
    </div>
  );
};

export default NotificationDrawer;
