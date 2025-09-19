// Notification System type definitions

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  data?: Record<string, any>;
  icon?: string;
  image?: string;
  actions?: NotificationAction[];
  priority: NotificationPriority;
  channels: NotificationChannel[];
  status: NotificationStatus;
  readAt?: string;
  clickedAt?: string;
  dismissedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: NotificationMetadata;
}

export type NotificationType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'reminder'
  | 'announcement'
  | 'update'
  | 'social'
  | 'system'
  | 'marketing';

export type NotificationCategory =
  | 'account'
  | 'billing'
  | 'content'
  | 'collaboration'
  | 'security'
  | 'workflow'
  | 'achievement'
  | 'promotion'
  | 'maintenance'
  | 'general';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export type NotificationStatus = 
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'clicked'
  | 'dismissed'
  | 'expired'
  | 'failed';

export interface NotificationAction {
  id: string;
  label: string;
  url?: string;
  action?: string;
  style?: 'default' | 'primary' | 'danger';
  icon?: string;
  requiresAuth?: boolean;
}

export interface NotificationMetadata {
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  relatedEntity?: {
    type: string;
    id: string;
    name?: string;
  };
  tags?: string[];
  importance?: number;
  groupId?: string;
  threadId?: string;
}

export interface NotificationChannel {
  type: ChannelType;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  failureReason?: string;
  retryCount?: number;
  provider?: string;
  messageId?: string;
  cost?: number;
}

export type ChannelType = 
  | 'in-app'
  | 'push'
  | 'email'
  | 'sms'
  | 'slack'
  | 'webhook'
  | 'desktop';

export interface NotificationPreferences {
  id: string;
  userId: string;
  channels: ChannelPreference[];
  categories: CategoryPreference[];
  quiet: QuietHours;
  frequency: FrequencySettings;
  language?: string;
  timezone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelPreference {
  type: ChannelType;
  enabled: boolean;
  config?: ChannelConfig;
  fallback?: ChannelType;
}

export interface ChannelConfig {
  // Push notification config
  pushToken?: string;
  pushProvider?: 'fcm' | 'apns' | 'web-push';
  
  // Email config
  emailAddress?: string;
  emailFormat?: 'html' | 'text' | 'both';
  
  // SMS config
  phoneNumber?: string;
  smsProvider?: string;
  
  // Slack config
  slackWebhook?: string;
  slackChannel?: string;
  slackUsername?: string;
  
  // Webhook config
  webhookUrl?: string;
  webhookHeaders?: Record<string, string>;
  webhookMethod?: 'POST' | 'PUT';
}

export interface CategoryPreference {
  category: NotificationCategory;
  enabled: boolean;
  channels?: ChannelType[];
  priority?: NotificationPriority[];
  frequency?: 'realtime' | 'digest' | 'daily' | 'weekly' | 'never';
}

export interface QuietHours {
  enabled: boolean;
  startTime?: string; // HH:MM format
  endTime?: string;   // HH:MM format
  days?: number[];    // 0-6 (Sunday-Saturday)
  timezone?: string;
  exceptions?: string[]; // Category exceptions
}

export interface FrequencySettings {
  maxPerHour?: number;
  maxPerDay?: number;
  digestTime?: string; // HH:MM format
  batchDelay?: number; // seconds
  groupSimilar?: boolean;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  description?: string;
  type: NotificationType;
  category: NotificationCategory;
  channels: ChannelType[];
  subject?: string;
  title: string;
  message: string;
  variables: TemplateVariable[];
  actions?: NotificationAction[];
  icon?: string;
  priority: NotificationPriority;
  ttl?: number; // Time to live in seconds
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object';
  required: boolean;
  defaultValue?: any;
  description?: string;
  format?: string;
}

export interface NotificationQueue {
  id: string;
  notificationId: string;
  channel: ChannelType;
  status: 'queued' | 'processing' | 'sent' | 'failed' | 'cancelled';
  scheduledFor?: string;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt?: string;
  nextRetryAt?: string;
  error?: string;
  priority: number;
  createdAt: string;
  processedAt?: string;
}

export interface PushSubscription {
  id: string;
  userId: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  device?: {
    type?: string;
    os?: string;
    browser?: string;
    name?: string;
  };
  active: boolean;
  lastUsedAt?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface EmailNotification {
  id: string;
  notificationId: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  subject: string;
  htmlContent?: string;
  textContent?: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  templateId?: string;
  variables?: Record<string, any>;
  trackOpens?: boolean;
  trackClicks?: boolean;
  messageId?: string;
  status: 'pending' | 'sent' | 'delivered' | 'bounced' | 'failed';
  provider?: string;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string; // Base64 encoded
  contentType: string;
  size?: number;
}

export interface SMSNotification {
  id: string;
  notificationId: string;
  to: string;
  from?: string;
  message: string;
  provider?: string;
  messageId?: string;
  segments?: number;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  statusCallback?: string;
  sentAt?: string;
  deliveredAt?: string;
  cost?: number;
}

export interface NotificationGroup {
  id: string;
  userId: string;
  type: string;
  key: string;
  notifications: string[]; // Notification IDs
  count: number;
  collapsed: boolean;
  summary?: string;
  firstAt: string;
  lastAt: string;
  readAt?: string;
}

export interface NotificationStats {
  userId?: string;
  period: 'hour' | 'day' | 'week' | 'month' | 'year';
  startDate: string;
  endDate: string;
  total: number;
  byChannel: Record<ChannelType, ChannelStats>;
  byCategory: Record<NotificationCategory, number>;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
  engagement: {
    delivered: number;
    read: number;
    clicked: number;
    dismissed: number;
    expired: number;
  };
  performance: {
    avgDeliveryTime: number;
    avgReadTime: number;
    deliveryRate: number;
    readRate: number;
    clickRate: number;
  };
}

export interface ChannelStats {
  sent: number;
  delivered: number;
  failed: number;
  cost?: number;
  avgDeliveryTime?: number;
}

export interface NotificationSchedule {
  id: string;
  userId?: string;
  templateId: string;
  recipients: RecipientCriteria;
  data?: Record<string, any>;
  scheduledFor: string;
  recurrence?: RecurrenceRule;
  status: 'scheduled' | 'processing' | 'completed' | 'cancelled' | 'failed';
  lastRun?: string;
  nextRun?: string;
  runCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipientCriteria {
  type: 'all' | 'segment' | 'list' | 'query';
  userIds?: string[];
  segmentId?: string;
  listId?: string;
  query?: Record<string, any>;
  exclude?: string[];
}

export interface RecurrenceRule {
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
  months?: number[];
  endDate?: string;
  maxOccurrences?: number;
}

export interface NotificationProvider {
  id: string;
  name: string;
  type: ChannelType;
  provider: string;
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  limits?: {
    rateLimit?: number;
    dailyLimit?: number;
    monthlyLimit?: number;
  };
  usage?: {
    today: number;
    month: number;
    total: number;
  };
  costs?: {
    perMessage?: number;
    perSegment?: number;
    currency?: string;
  };
  lastCheckedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationLog {
  id: string;
  notificationId: string;
  userId: string;
  channel: ChannelType;
  event: LogEvent;
  details?: Record<string, any>;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

export type LogEvent = 
  | 'created'
  | 'queued'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'clicked'
  | 'dismissed'
  | 'expired'
  | 'failed'
  | 'retried';

export interface NotificationTopic {
  id: string;
  name: string;
  description?: string;
  category: NotificationCategory;
  subscribers: string[]; // User IDs
  subscriberCount: number;
  public: boolean;
  requiresApproval?: boolean;
  owner?: string;
  moderators?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TopicSubscription {
  id: string;
  userId: string;
  topicId: string;
  status: 'active' | 'muted' | 'blocked';
  channels?: ChannelType[];
  subscribedAt: string;
  mutedUntil?: string;
}

export interface NotificationRule {
  id: string;
  name: string;
  description?: string;
  trigger: RuleTrigger;
  conditions?: RuleCondition[];
  actions: RuleAction[];
  enabled: boolean;
  priority: number;
  cooldown?: number; // seconds
  lastTriggeredAt?: string;
  triggerCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RuleTrigger {
  type: 'event' | 'schedule' | 'threshold' | 'webhook';
  event?: string;
  schedule?: string; // Cron expression
  threshold?: {
    metric: string;
    operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
    value: number;
    window?: number; // seconds
  };
  webhook?: {
    url: string;
    secret?: string;
  };
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: any;
  conjunction?: 'and' | 'or';
}

export interface RuleAction {
  type: 'notify' | 'email' | 'sms' | 'webhook' | 'function';
  templateId?: string;
  recipients?: string[];
  data?: Record<string, any>;
  config?: Record<string, any>;
}