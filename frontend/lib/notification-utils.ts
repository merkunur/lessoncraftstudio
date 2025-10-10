import type {
  Notification,
} from '@/types/notifications';
import {
  NotificationType,
  NotificationCategory,
  NotificationPriority,
  NotificationChannel,
  NotificationPreferences,
  ChannelType,
  NotificationTemplate,
  NotificationGroup,
  NotificationStats,
  PushSubscription,
  EmailNotification,
  SMSNotification,
  RecurrenceRule
} from '@/types/notifications';

// Check if browser supports notifications
export function supportsNotifications(): boolean {
  return 'Notification' in window;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!supportsNotifications()) {
    throw new Error('Notifications not supported');
  }

  const permission = await Notification.requestPermission();
  return permission;
}

// Check if push notifications are supported
export function supportsPushNotifications(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

// Subscribe to push notifications
export async function subscribeToPushNotifications(
  serviceWorkerRegistration: ServiceWorkerRegistration,
  publicVapidKey: string
): Promise<PushSubscription> {
  const subscription = await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey) as BufferSource
  });

  return subscription.toJSON() as PushSubscription;
}

// Convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Show browser notification
export function showBrowserNotification(
  title: string,
  options?: NotificationOptions
): Notification | null {
  if (!supportsNotifications() || Notification.permission !== 'granted') {
    return null;
  }

  return new Notification(title, {
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    ...options
  });
}

// Format notification for display
export function formatNotification(notification: Notification): {
  icon: string;
  color: string;
  priority: string;
} {
  const typeConfig: Record<NotificationType, { icon: string; color: string }> = {
    info: { icon: 'ℹ️', color: 'blue' },
    success: { icon: '✅', color: 'green' },
    warning: { icon: '⚠️', color: 'yellow' },
    error: { icon: '❌', color: 'red' },
    reminder: { icon: '⏰', color: 'purple' },
    announcement: { icon: '📢', color: 'indigo' },
    update: { icon: '🔄', color: 'cyan' },
    social: { icon: '👥', color: 'pink' },
    system: { icon: '⚙️', color: 'gray' },
    marketing: { icon: '🎯', color: 'orange' }
  };

  const config = typeConfig[notification.type] || typeConfig.info;

  return {
    icon: notification.icon || config.icon,
    color: config.color,
    priority: notification.priority
  };
}

// Get relative time
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return past.toLocaleDateString();
}

// Group notifications
export function groupNotifications(
  notifications: Notification[],
  groupBy: 'type' | 'category' | 'date' | 'sender'
): Map<string, Notification[]> {
  const groups = new Map<string, Notification[]>();

  notifications.forEach(notification => {
    let key: string;

    switch (groupBy) {
      case 'type':
        key = notification.type;
        break;
      case 'category':
        key = notification.category;
        break;
      case 'date':
        key = new Date(notification.createdAt).toDateString();
        break;
      case 'sender':
        key = notification.metadata?.sender?.name || 'System';
        break;
      default:
        key = 'ungrouped';
    }

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(notification);
  });

  return groups;
}

// Filter notifications by preferences
export function filterByPreferences(
  notifications: Notification[],
  preferences: NotificationPreferences
): Notification[] {
  return notifications.filter(notification => {
    // Check category preference
    const categoryPref = preferences.categories.find(
      c => c.category === notification.category
    );
    if (categoryPref && !categoryPref.enabled) {
      return false;
    }

    // Check priority preference
    if (categoryPref?.priority && 
        !categoryPref.priority.includes(notification.priority)) {
      return false;
    }

    // Check quiet hours
    if (preferences.quiet.enabled && isInQuietHours(preferences.quiet)) {
      // Only allow urgent notifications during quiet hours
      if (notification.priority !== 'urgent') {
        return false;
      }
    }

    return true;
  });
}

// Check if current time is in quiet hours
function isInQuietHours(quiet: NotificationPreferences['quiet']): boolean {
  if (!quiet.enabled || !quiet.startTime || !quiet.endTime) {
    return false;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Check if today is in quiet days
  if (quiet.days && !quiet.days.includes(currentDay)) {
    return false;
  }

  const [startHour, startMin] = quiet.startTime.split(':').map(Number);
  const [endHour, endMin] = quiet.endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  // Handle overnight quiet hours
  if (startMinutes > endMinutes) {
    return currentTime >= startMinutes || currentTime <= endMinutes;
  }

  return currentTime >= startMinutes && currentTime <= endMinutes;
}

// Get enabled channels for notification
export function getEnabledChannels(
  notification: Notification,
  preferences: NotificationPreferences
): ChannelType[] {
  const enabledChannels: ChannelType[] = [];

  // Get category-specific channels
  const categoryPref = preferences.categories.find(
    c => c.category === notification.category
  );

  const channelsToCheck = categoryPref?.channels || 
    preferences.channels.filter(c => c.enabled).map(c => c.type);

  channelsToCheck.forEach(channelType => {
    const channelPref = preferences.channels.find(c => c.type === channelType);
    if (channelPref?.enabled) {
      enabledChannels.push(channelType);
    }
  });

  return enabledChannels;
}

// Build notification from template
export function buildFromTemplate(
  template: NotificationTemplate,
  data: Record<string, any>
): Omit<Notification, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  // Replace variables in strings
  const replaceVariables = (str: string): string => {
    return str.replace(/{{(\w+)}}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });
  };

  return {
    type: template.type,
    category: template.category,
    title: replaceVariables(template.title),
    message: replaceVariables(template.message),
    data,
    icon: template.icon,
    actions: template.actions,
    priority: template.priority,
    channels: template.channels.map(type => ({
      type,
      status: 'pending'
    })),
    status: 'pending'
  };
}

// Calculate notification statistics
export function calculateNotificationStats(
  notifications: Notification[]
): {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
  engagement: {
    readRate: number;
    clickRate: number;
    dismissRate: number;
  };
} {
  const stats = {
    total: notifications.length,
    unread: 0,
    byType: {} as Record<NotificationType, number>,
    byPriority: {} as Record<NotificationPriority, number>,
    engagement: {
      readRate: 0,
      clickRate: 0,
      dismissRate: 0
    }
  };

  let read = 0;
  let clicked = 0;
  let dismissed = 0;

  notifications.forEach(notification => {
    // Count unread
    if (!notification.readAt) {
      stats.unread++;
    } else {
      read++;
    }

    // Count by type
    stats.byType[notification.type] = (stats.byType[notification.type] || 0) + 1;

    // Count by priority
    stats.byPriority[notification.priority] = 
      (stats.byPriority[notification.priority] || 0) + 1;

    // Count engagement
    if (notification.clickedAt) clicked++;
    if (notification.dismissedAt) dismissed++;
  });

  // Calculate rates
  if (stats.total > 0) {
    stats.engagement.readRate = (read / stats.total) * 100;
    stats.engagement.clickRate = (clicked / stats.total) * 100;
    stats.engagement.dismissRate = (dismissed / stats.total) * 100;
  }

  return stats;
}

// Sort notifications
export function sortNotifications(
  notifications: Notification[],
  sortBy: 'date' | 'priority' | 'type' | 'unread'
): Notification[] {
  const sorted = [...notifications];

  switch (sortBy) {
    case 'date':
      sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;

    case 'priority':
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      sorted.sort((a, b) => 
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      break;

    case 'type':
      sorted.sort((a, b) => a.type.localeCompare(b.type));
      break;

    case 'unread':
      sorted.sort((a, b) => {
        if (!a.readAt && b.readAt) return -1;
        if (a.readAt && !b.readAt) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      break;
  }

  return sorted;
}

// Format email notification
export function formatEmailNotification(
  notification: Notification,
  template?: string
): EmailNotification {
  const emailTemplate = template || `
    <h2>{{title}}</h2>
    <p>{{message}}</p>
    {{#if actions}}
      <div>
        {{#each actions}}
          <a href="{{url}}" style="...">{{{label}}}</a>
        {{/each}}
      </div>
    {{/if}}
  `;

  return {
    id: `email_${Date.now()}`,
    notificationId: notification.id,
    to: [notification.userId], // Would be resolved to email
    from: 'notifications@lessoncraftstudio.com',
    subject: notification.title,
    htmlContent: emailTemplate
      .replace('{{title}}', notification.title)
      .replace('{{message}}', notification.message),
    variables: notification.data,
    trackOpens: true,
    trackClicks: true,
    status: 'pending'
  };
}

// Format SMS notification
export function formatSMSNotification(
  notification: Notification,
  maxLength: number = 160
): SMSNotification {
  let message = `${notification.title}: ${notification.message}`;
  
  // Truncate if too long
  if (message.length > maxLength) {
    message = message.substring(0, maxLength - 3) + '...';
  }

  return {
    id: `sms_${Date.now()}`,
    notificationId: notification.id,
    to: notification.userId, // Would be resolved to phone number
    message,
    status: 'pending'
  };
}

// Check if notification should be sent
export function shouldSendNotification(
  notification: Notification,
  preferences: NotificationPreferences,
  recentNotifications: Notification[]
): boolean {
  // Check frequency limits
  if (preferences.frequency.maxPerHour) {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = recentNotifications.filter(
      n => new Date(n.createdAt) > lastHour
    ).length;

    if (recentCount >= preferences.frequency.maxPerHour) {
      return false;
    }
  }

  if (preferences.frequency.maxPerDay) {
    const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = recentNotifications.filter(
      n => new Date(n.createdAt) > lastDay
    ).length;

    if (recentCount >= preferences.frequency.maxPerDay) {
      return false;
    }
  }

  // Check if similar notification was sent recently
  if (preferences.frequency.groupSimilar) {
    const batchDelay = preferences.frequency.batchDelay || 300; // 5 minutes default
    const recentSimilar = recentNotifications.find(
      n => n.type === notification.type &&
           n.category === notification.category &&
           Date.now() - new Date(n.createdAt).getTime() < batchDelay * 1000
    );

    if (recentSimilar) {
      return false;
    }
  }

  return true;
}

// Parse recurrence rule to get next occurrence
export function getNextOccurrence(
  rule: RecurrenceRule,
  lastRun?: Date
): Date | null {
  const now = new Date();
  const startDate = lastRun || now;

  switch (rule.frequency) {
    case 'once':
      return null;

    case 'daily':
      const nextDaily = new Date(startDate);
      nextDaily.setDate(nextDaily.getDate() + (rule.interval || 1));
      return nextDaily;

    case 'weekly':
      const nextWeekly = new Date(startDate);
      nextWeekly.setDate(nextWeekly.getDate() + 7 * (rule.interval || 1));
      
      // Adjust for specific days of week
      if (rule.daysOfWeek && rule.daysOfWeek.length > 0) {
        while (!rule.daysOfWeek.includes(nextWeekly.getDay())) {
          nextWeekly.setDate(nextWeekly.getDate() + 1);
        }
      }
      
      return nextWeekly;

    case 'monthly':
      const nextMonthly = new Date(startDate);
      nextMonthly.setMonth(nextMonthly.getMonth() + (rule.interval || 1));
      
      // Adjust for specific days of month
      if (rule.daysOfMonth && rule.daysOfMonth.length > 0) {
        const targetDay = rule.daysOfMonth[0];
        nextMonthly.setDate(Math.min(targetDay, 
          new Date(nextMonthly.getFullYear(), nextMonthly.getMonth() + 1, 0).getDate()
        ));
      }
      
      return nextMonthly;

    case 'yearly':
      const nextYearly = new Date(startDate);
      nextYearly.setFullYear(nextYearly.getFullYear() + (rule.interval || 1));
      return nextYearly;

    default:
      return null;
  }
}

// Get notification sound based on type and priority
export function getNotificationSound(
  type: NotificationType,
  priority: NotificationPriority
): string {
  if (priority === 'urgent') {
    return '/sounds/urgent.mp3';
  }

  const sounds: Record<NotificationType, string> = {
    info: '/sounds/info.mp3',
    success: '/sounds/success.mp3',
    warning: '/sounds/warning.mp3',
    error: '/sounds/error.mp3',
    reminder: '/sounds/reminder.mp3',
    announcement: '/sounds/announcement.mp3',
    update: '/sounds/update.mp3',
    social: '/sounds/social.mp3',
    system: '/sounds/system.mp3',
    marketing: '/sounds/marketing.mp3'
  };

  return sounds[type] || '/sounds/default.mp3';
}

// Play notification sound
export function playNotificationSound(
  type: NotificationType,
  priority: NotificationPriority,
  volume: number = 0.5
): void {
  if (typeof window === 'undefined' || !window.Audio) return;

  const audio = new Audio(getNotificationSound(type, priority));
  audio.volume = Math.max(0, Math.min(1, volume));
  audio.play().catch(console.error);
}