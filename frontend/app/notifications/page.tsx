'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import type {
  Notification,
  NotificationPreferences,
  NotificationStats,
  NotificationTemplate,
  ChannelType,
  NotificationCategory,
  NotificationPriority
} from '@/types/notifications';
import {
  formatNotification,
  getRelativeTime,
  groupNotifications,
  filterByPreferences,
  sortNotifications,
  calculateNotificationStats,
  requestNotificationPermission,
  subscribeToPushNotifications,
  supportsNotifications,
  supportsPushNotifications,
  playNotificationSound
} from '@/lib/notification-utils';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<
    'inbox' | 'preferences' | 'templates' | 'analytics'
  >('inbox');

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    id: 'pref_1',
    userId: 'current_user',
    channels: [
      { type: 'in-app', enabled: true },
      { type: 'push', enabled: false },
      { type: 'email', enabled: true },
      { type: 'sms', enabled: false }
    ],
    categories: Object.values(['account', 'billing', 'content', 'collaboration', 'security'] as NotificationCategory[]).map(cat => ({
      category: cat,
      enabled: true
    })),
    quiet: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00',
      days: [0, 1, 2, 3, 4, 5, 6]
    },
    frequency: {
      maxPerHour: 10,
      maxPerDay: 50,
      groupSimilar: true,
      batchDelay: 300
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  
  const [filter, setFilter] = useState<'all' | 'unread' | NotificationCategory>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'type' | 'unread'>('date');
  const [groupBy, setGroupBy] = useState<'none' | 'type' | 'category' | 'date'>('none');
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);

  const notificationSound = useRef<boolean>(true);
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    loadNotifications();
    loadPreferences();
    setupWebSocket();
    checkNotificationPermission();

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  async function loadNotifications() {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  async function loadPreferences() {
    try {
      const response = await fetch('/api/notifications/preferences');
      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }

  function setupWebSocket() {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
    
    ws.onmessage = (event) => {
      const notification: Notification = JSON.parse(event.data);
      
      setNotifications(prev => [notification, ...prev]);
      
      if (notificationSound.current) {
        playNotificationSound(notification.type, notification.priority);
      }
    };

    webSocketRef.current = ws;
  }

  async function checkNotificationPermission() {
    if (supportsNotifications() && Notification.permission === 'default') {
      const permission = await requestNotificationPermission();
      if (permission === 'granted' && preferences.channels.find(c => c.type === 'push')?.enabled) {
        await enablePushNotifications();
      }
    }
  }

  async function enablePushNotifications() {
    if (!supportsPushNotifications()) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await subscribeToPushNotifications(
        registration,
        process.env.NEXT_PUBLIC_VAPID_KEY || ''
      );

      // Send subscription to server
      await fetch('/api/notifications/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
    }
  }

  async function markAsRead(notificationIds: string[]) {
    try {
      await fetch('/api/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: notificationIds })
      });

      setNotifications(prev => prev.map(n => 
        notificationIds.includes(n.id) 
          ? { ...n, readAt: new Date().toISOString(), status: 'read' as const }
          : n
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  }

  async function deleteNotifications(notificationIds: string[]) {
    try {
      await fetch('/api/notifications/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: notificationIds })
      });

      setNotifications(prev => prev.filter(n => !notificationIds.includes(n.id)));
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error('Failed to delete notifications:', error);
    }
  }

  async function savePreferences(newPreferences: NotificationPreferences) {
    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPreferences)
      });

      if (response.ok) {
        setPreferences(newPreferences);
        alert('Preferences saved successfully');
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  const filteredNotifications = filterByPreferences(
    notifications.filter(n => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !n.readAt;
      return n.category === filter;
    }),
    preferences
  );

  const sortedNotifications = sortNotifications(filteredNotifications, sortBy);

  const groupedNotifications = groupBy === 'none' 
    ? new Map([['all', sortedNotifications]])
    : groupNotifications(sortedNotifications, groupBy as any);

  const notificationStats = calculateNotificationStats(notifications);

  const renderInbox = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="account">Account</option>
            <option value="billing">Billing</option>
            <option value="content">Content</option>
            <option value="collaboration">Collaboration</option>
            <option value="security">Security</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="date">Date</option>
            <option value="priority">Priority</option>
            <option value="type">Type</option>
            <option value="unread">Unread First</option>
          </select>

          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="none">No Grouping</option>
            <option value="type">Group by Type</option>
            <option value="category">Group by Category</option>
            <option value="date">Group by Date</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {selectedNotifications.size > 0 && (
            <>
              <button
                onClick={() => markAsRead(Array.from(selectedNotifications))}
                className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded"
              >
                Mark as Read
              </button>
              <button
                onClick={() => deleteNotifications(Array.from(selectedNotifications))}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedNotifications(new Set())}
                className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded"
              >
                Clear Selection
              </button>
            </>
          )}

          <button
            onClick={() => markAsRead(notifications.filter(n => !n.readAt).map(n => n.id))}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from(groupedNotifications.entries()).map(([group, groupNotifications]) => (
          <div key={group}>
            {groupBy !== 'none' && (
              <h3 className="font-semibold text-gray-700 mb-2">
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </h3>
            )}

            <div className="space-y-2">
              {groupNotifications.map(notification => {
                const format = formatNotification(notification);
                const isSelected = selectedNotifications.has(notification.id);
                const isUnread = !notification.readAt;

                return (
                  <div
                    key={notification.id}
                    onClick={() => {
                      if (!notification.readAt) {
                        markAsRead([notification.id]);
                      }
                    }}
                    className={`
                      flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer
                      ${isUnread ? 'bg-blue-50 border-blue-200' : 'bg-white'}
                      ${isSelected ? 'ring-2 ring-blue-500' : ''}
                      hover:shadow-md
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSelectedNotifications(prev => {
                          const newSet = new Set(prev);
                          if (isSelected) {
                            newSet.delete(notification.id);
                          } else {
                            newSet.add(notification.id);
                          }
                          return newSet;
                        });
                      }}
                      className="mt-1"
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="text-2xl">{format.icon}</div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          
                          {notification.actions && notification.actions.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {notification.actions.map(action => (
                                <button
                                  key={action.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (action.url) {
                                      window.open(action.url, '_blank');
                                    }
                                  }}
                                  className={`
                                    px-3 py-1 rounded text-sm
                                    ${action.style === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                                      action.style === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
                                      'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                                  `}
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{notification.category}</span>
                            <span>•</span>
                            <span>{getRelativeTime(notification.createdAt)}</span>
                            {notification.metadata?.sender && (
                              <>
                                <span>•</span>
                                <span>from {notification.metadata.sender.name}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${notification.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                              notification.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'}
                          `}>
                            {notification.priority}
                          </span>

                          {isUnread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {sortedNotifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Channels</h3>
          <div className="space-y-3">
            {preferences.channels.map(channel => (
              <label key={channel.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={channel.enabled}
                    onChange={(e) => {
                      const updated = { ...preferences };
                      const channelIndex = updated.channels.findIndex(c => c.type === channel.type);
                      updated.channels[channelIndex].enabled = e.target.checked;
                      setPreferences(updated);
                    }}
                    className="rounded"
                  />
                  <span className="font-medium">
                    {channel.type.charAt(0).toUpperCase() + channel.type.slice(1).replace('-', ' ')}
                  </span>
                </div>
                {channel.type === 'push' && channel.enabled && (
                  <button
                    onClick={enablePushNotifications}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Configure
                  </button>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="space-y-3">
            {preferences.categories.map(category => (
              <label key={category.category} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={category.enabled}
                  onChange={(e) => {
                    const updated = { ...preferences };
                    const catIndex = updated.categories.findIndex(c => c.category === category.category);
                    updated.categories[catIndex].enabled = e.target.checked;
                    setPreferences(updated);
                  }}
                  className="rounded"
                />
                <span className="font-medium">
                  {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quiet Hours</h3>
          <label className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={preferences.quiet.enabled}
              onChange={(e) => {
                setPreferences({
                  ...preferences,
                  quiet: { ...preferences.quiet, enabled: e.target.checked }
                });
              }}
              className="rounded"
            />
            <span>Enable quiet hours</span>
          </label>

          {preferences.quiet.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={preferences.quiet.startTime}
                  onChange={(e) => {
                    setPreferences({
                      ...preferences,
                      quiet: { ...preferences.quiet, startTime: e.target.value }
                    });
                  }}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={preferences.quiet.endTime}
                  onChange={(e) => {
                    setPreferences({
                      ...preferences,
                      quiet: { ...preferences.quiet, endTime: e.target.value }
                    });
                  }}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Frequency</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Max per hour</label>
              <input
                type="number"
                value={preferences.frequency.maxPerHour}
                onChange={(e) => {
                  setPreferences({
                    ...preferences,
                    frequency: { ...preferences.frequency, maxPerHour: parseInt(e.target.value) }
                  });
                }}
                className="border rounded px-3 py-2 w-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max per day</label>
              <input
                type="number"
                value={preferences.frequency.maxPerDay}
                onChange={(e) => {
                  setPreferences({
                    ...preferences,
                    frequency: { ...preferences.frequency, maxPerDay: parseInt(e.target.value) }
                  });
                }}
                className="border rounded px-3 py-2 w-32"
              />
            </div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.frequency.groupSimilar}
                onChange={(e) => {
                  setPreferences({
                    ...preferences,
                    frequency: { ...preferences.frequency, groupSimilar: e.target.checked }
                  });
                }}
                className="rounded"
              />
              <span>Group similar notifications</span>
            </label>
          </div>
        </div>

        <button
          onClick={() => savePreferences(preferences)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {notificationStats.unread} unread
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded hover:bg-gray-100"
            >
              ⚙️
            </button>
          </div>
        </div>

        <div className="border-b mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'inbox', label: 'Inbox' },
              { id: 'preferences', label: 'Preferences' },
              { id: 'templates', label: 'Templates' },
              { id: 'analytics', label: 'Analytics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'inbox' && renderInbox()}
        {activeTab === 'preferences' && renderPreferences()}
      </div>
    </div>
  );
}