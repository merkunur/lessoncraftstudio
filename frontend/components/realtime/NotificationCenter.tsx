'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Info,
  AlertCircle,
  AlertTriangle,
  MessageSquare,
  Users,
  FileText,
  Download,
  Share2,
  UserPlus,
  Settings,
  TrendingUp,
  Calendar,
  Clock,
  Archive,
  Trash2,
  ExternalLink,
  Filter,
  Volume2,
  VolumeX
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'mention' | 'team' | 'system' | 'chat';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'general' | 'team' | 'collaboration' | 'system' | 'marketing';
  data?: any;
}

interface NotificationPreferences {
  sound: boolean;
  desktop: boolean;
  emailDigest: boolean;
  categories: {
    general: boolean;
    team: boolean;
    collaboration: boolean;
    system: boolean;
    marketing: boolean;
  };
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    sound: true,
    desktop: true,
    emailDigest: false,
    categories: {
      general: true,
      team: true,
      collaboration: true,
      system: true,
      marketing: false
    }
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    loadNotifications();
    connectWebSocket();
    requestNotificationPermission();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);

    // Update document title with unread count
    if (unread > 0) {
      document.title = `(${unread}) LessonCraftStudio`;
    } else {
      document.title = 'LessonCraftStudio';
    }
  }, [notifications]);

  const loadNotifications = async () => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: 'notif_1',
        type: 'team',
        title: 'New Team Member',
        message: 'Sarah Wilson joined the Math Department team',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        read: false,
        actionUrl: '/admin/teams/team_1',
        actionLabel: 'View Team',
        sender: {
          id: 'user_2',
          name: 'Sarah Wilson',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        priority: 'normal',
        category: 'team'
      },
      {
        id: 'notif_2',
        type: 'mention',
        title: 'You were mentioned',
        message: 'John mentioned you in a comment on "Addition Worksheet"',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        read: false,
        actionUrl: '/admin/worksheets/ws_123',
        actionLabel: 'View Comment',
        sender: {
          id: 'user_1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        priority: 'high',
        category: 'collaboration'
      },
      {
        id: 'notif_3',
        type: 'success',
        title: 'Export Complete',
        message: 'Your worksheet export has been completed successfully',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
        read: true,
        actionUrl: '/admin/downloads',
        actionLabel: 'Download',
        priority: 'normal',
        category: 'general'
      },
      {
        id: 'notif_4',
        type: 'warning',
        title: 'Storage Warning',
        message: 'You have used 90% of your storage quota',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
        read: true,
        actionUrl: '/admin/settings/storage',
        actionLabel: 'Manage Storage',
        priority: 'high',
        category: 'system'
      },
      {
        id: 'notif_5',
        type: 'info',
        title: 'New Feature Available',
        message: 'Real-time collaboration is now available for all teams',
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
        read: true,
        priority: 'low',
        category: 'system'
      }
    ];

    setNotifications(mockNotifications);
  };

  const connectWebSocket = () => {
    // In production, connect to actual WebSocket server
    // wsRef.current = new WebSocket('ws://localhost:3001');

    // Mock WebSocket connection
    console.log('WebSocket connection established');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const handleNewNotification = (notification: Notification) => {
    // Add to list
    setNotifications(prev => [notification, ...prev]);

    // Play sound if enabled
    if (preferences.sound && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }

    // Show desktop notification if enabled
    if (preferences.desktop && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        tag: notification.id,
        requireInteraction: notification.priority === 'urgent'
      });
    }

    // Show toast for high priority
    if (notification.priority === 'high' || notification.priority === 'urgent') {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-white shadow-lg rounded-lg p-4 flex items-start gap-3 max-w-md`}>
          {getNotificationIcon(notification.type)}
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{notification.title}</p>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            {notification.actionUrl && (
              <button
                onClick={() => {
                  window.location.href = notification.actionUrl!;
                  toast.dismiss(t.id);
                }}
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                {notification.actionLabel || 'View'}
              </button>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ), {
        duration: notification.priority === 'urgent' ? Infinity : 5000,
        position: 'top-right'
      });
    }
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = async (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success('Notification deleted');
  };

  const clearAll = async () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      toast.success('All notifications cleared');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCheck className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'mention':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'team':
        return <Users className="w-5 h-5 text-purple-500" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-indigo-500" />;
      case 'system':
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'mention':
      case 'chat':
        return 'bg-blue-50 border-blue-200';
      case 'team':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread' && n.read) return false;
    if (filter === 'urgent' && n.priority !== 'urgent' && n.priority !== 'high') return false;
    if (selectedCategory !== 'all' && n.category !== selectedCategory) return false;
    return preferences.categories[n.category];
  });

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 px-2 py-1 text-xs text-white bg-red-500 rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-[600px] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, sound: !prev.sound }))}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title={preferences.sound ? 'Mute' : 'Unmute'}
                    >
                      {preferences.sound ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={markAllAsRead}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={clearAll}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Clear all"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 text-sm rounded ${
                      filter === 'all'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`px-3 py-1 text-sm rounded ${
                      filter === 'unread'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => setFilter('urgent')}
                    className={`px-3 py-1 text-sm rounded ${
                      filter === 'urgent'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Urgent
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          markAsRead(notification.id);
                          if (notification.actionUrl) {
                            window.location.href = notification.actionUrl;
                          }
                        }}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.sender?.avatar ? (
                              <img
                                src={notification.sender.avatar}
                                alt={notification.sender.name}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              getNotificationIcon(notification.type)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {notification.title}
                                  {notification.priority === 'urgent' && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                                      Urgent
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                {notification.actionLabel && (
                                  <button className="text-sm text-blue-600 hover:underline mt-2">
                                    {notification.actionLabel} →
                                  </button>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <X className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t">
                <a
                  href="/admin/notifications"
                  className="block text-center text-sm text-blue-600 hover:underline"
                >
                  View all notifications
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hidden audio element for notification sounds */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification-sound.mp3" type="audio/mpeg" />
        <source src="/notification-sound.ogg" type="audio/ogg" />
      </audio>
    </>
  );
}