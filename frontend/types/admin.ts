// Admin Dashboard type definitions

export interface AdminUser {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  permissions: AdminPermission[];
  status: UserStatus;
  createdAt: string;
  lastLoginAt?: string;
  lastActivityAt?: string;
  profile?: UserProfile;
  settings?: UserSettings;
  metrics?: UserMetrics;
  flags?: UserFlags;
}

export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'moderator'
  | 'support'
  | 'user';

export type UserStatus = 
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'banned'
  | 'deleted'
  | 'pending';

export interface AdminPermission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
  grantedBy?: string;
  grantedAt?: string;
  expiresAt?: string;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  language?: string;
  phone?: string;
  company?: string;
  website?: string;
}

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
  preferences: Record<string, any>;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  digest: 'none' | 'daily' | 'weekly' | 'monthly';
  channels: Record<string, boolean>;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  dataSharing: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'sms' | 'email' | 'app';
  loginAlerts: boolean;
  sessionTimeout: number; // minutes
  trustedDevices: string[];
}

export interface UserMetrics {
  totalLogins: number;
  totalActions: number;
  storageUsed: number;
  apiCalls: number;
  lastActive: string;
  engagement: EngagementMetrics;
  usage: UsageMetrics;
}

export interface EngagementMetrics {
  daysActive: number;
  sessionsPerDay: number;
  averageSessionDuration: number;
  bounceRate: number;
  retentionRate: number;
}

export interface UsageMetrics {
  features: Record<string, number>;
  devices: Record<string, number>;
  browsers: Record<string, number>;
  locations: Record<string, number>;
}

export interface UserFlags {
  isVerified: boolean;
  isPremium: boolean;
  isBetaTester: boolean;
  isPartner: boolean;
  hasViolations: boolean;
  requiresReview: boolean;
}

export interface SystemMetrics {
  timestamp: string;
  cpu: CPUMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
  network: NetworkMetrics;
  database: DatabaseMetrics;
  cache: CacheMetrics;
  queue: QueueMetrics;
  errors: ErrorMetrics;
}

export interface CPUMetrics {
  usage: number; // percentage
  cores: number;
  loadAverage: number[];
  processes: number;
  threads: number;
}

export interface MemoryMetrics {
  total: number;
  used: number;
  free: number;
  percentage: number;
  swap: {
    total: number;
    used: number;
    free: number;
  };
}

export interface DiskMetrics {
  total: number;
  used: number;
  free: number;
  percentage: number;
  iops: number;
  throughput: number;
}

export interface NetworkMetrics {
  bytesIn: number;
  bytesOut: number;
  packetsIn: number;
  packetsOut: number;
  errors: number;
  dropped: number;
  latency: number;
}

export interface DatabaseMetrics {
  connections: number;
  activeQueries: number;
  slowQueries: number;
  queryTime: number;
  deadlocks: number;
  replicationLag?: number;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  evictions: number;
  hitRate: number;
  memory: number;
  keys: number;
}

export interface QueueMetrics {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  averageTime: number;
  throughput: number;
}

export interface ErrorMetrics {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<number, number>;
  critical: number;
  warnings: number;
  rate: number; // errors per minute
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title?: string;
  content: any;
  author: string;
  status: ContentStatus;
  flags: ContentFlags;
  reports?: ContentReport[];
  moderation?: ModerationAction[];
  metadata: ContentMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type ContentType = 
  | 'post'
  | 'comment'
  | 'message'
  | 'profile'
  | 'image'
  | 'video'
  | 'document';

export type ContentStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'flagged'
  | 'quarantined'
  | 'deleted';

export interface ContentFlags {
  spam: boolean;
  inappropriate: boolean;
  copyright: boolean;
  malicious: boolean;
  misinformation: boolean;
  harassment: boolean;
  violence: boolean;
  adult: boolean;
}

export interface ContentReport {
  id: string;
  reporterId: string;
  reason: string;
  category: ReportCategory;
  description?: string;
  evidence?: string[];
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export type ReportCategory = 
  | 'spam'
  | 'inappropriate'
  | 'copyright'
  | 'harassment'
  | 'violence'
  | 'misinformation'
  | 'other';

export interface ModerationAction {
  id: string;
  moderatorId: string;
  action: ModerationType;
  reason: string;
  notes?: string;
  duration?: number; // hours
  timestamp: string;
  metadata?: Record<string, any>;
}

export type ModerationType = 
  | 'approve'
  | 'reject'
  | 'flag'
  | 'unflag'
  | 'quarantine'
  | 'delete'
  | 'restore'
  | 'warn'
  | 'ban'
  | 'unban';

export interface ContentMetadata {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  language?: string;
  tags?: string[];
  categories?: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: AuditChanges;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  status: 'success' | 'failure';
  errorMessage?: string;
}

export interface AuditChanges {
  before?: Record<string, any>;
  after?: Record<string, any>;
  diff?: Array<{
    field: string;
    oldValue: any;
    newValue: any;
  }>;
}

export interface SystemConfig {
  id: string;
  category: ConfigCategory;
  key: string;
  value: any;
  type: ConfigType;
  description?: string;
  defaultValue?: any;
  validation?: ConfigValidation;
  dependencies?: string[];
  modifiedBy?: string;
  modifiedAt?: string;
  locked: boolean;
}

export type ConfigCategory = 
  | 'general'
  | 'security'
  | 'email'
  | 'storage'
  | 'api'
  | 'features'
  | 'limits'
  | 'billing';

export type ConfigType = 
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'json';

export interface ConfigValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  enum?: any[];
  custom?: string; // validation function name
}

export interface AnalyticsReport {
  id: string;
  type: ReportType;
  period: ReportPeriod;
  startDate: string;
  endDate: string;
  metrics: ReportMetrics;
  dimensions?: ReportDimensions;
  filters?: ReportFilters;
  data: any[];
  summary: ReportSummary;
  createdAt: string;
  createdBy?: string;
}

export type ReportType = 
  | 'users'
  | 'engagement'
  | 'revenue'
  | 'performance'
  | 'content'
  | 'security'
  | 'custom';

export interface ReportPeriod {
  type: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  value?: number;
  comparison?: 'previous' | 'year_over_year';
}

export interface ReportMetrics {
  primary: string[];
  secondary?: string[];
  calculated?: Array<{
    name: string;
    formula: string;
  }>;
}

export interface ReportDimensions {
  groupBy?: string[];
  orderBy?: Array<{
    field: string;
    direction: 'asc' | 'desc';
  }>;
  limit?: number;
}

export interface ReportFilters {
  include?: Record<string, any>;
  exclude?: Record<string, any>;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ReportSummary {
  totalRecords: number;
  averages: Record<string, number>;
  totals: Record<string, number>;
  changes: Record<string, number>;
  trends: Record<string, 'up' | 'down' | 'stable'>;
}

export interface AdminNotification {
  id: string;
  type: AdminNotificationType;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  source: string;
  metadata?: Record<string, any>;
  actions?: NotificationAction[];
  read: boolean;
  acknowledged: boolean;
  timestamp: string;
  expiresAt?: string;
}

export type AdminNotificationType = 
  | 'system'
  | 'security'
  | 'performance'
  | 'error'
  | 'user'
  | 'content'
  | 'billing';

export interface NotificationAction {
  label: string;
  action: string;
  url?: string;
  params?: Record<string, any>;
  style?: 'primary' | 'danger' | 'warning';
}

export interface BackupConfig {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  schedule: BackupSchedule;
  destination: BackupDestination;
  retention: BackupRetention;
  encryption: boolean;
  compression: boolean;
  verification: boolean;
  lastRun?: string;
  nextRun?: string;
  status: 'active' | 'paused' | 'failed';
}

export interface BackupSchedule {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  time?: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  timezone?: string;
}

export interface BackupDestination {
  type: 'local' | 's3' | 'azure' | 'gcs' | 'ftp';
  path: string;
  credentials?: Record<string, any>;
}

export interface BackupRetention {
  count?: number;
  days?: number;
  minimumCount?: number;
}

export interface MaintenanceWindow {
  id: string;
  title: string;
  description?: string;
  type: 'scheduled' | 'emergency';
  startTime: string;
  endTime: string;
  affectedServices: string[];
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  notifications: MaintenanceNotification[];
  createdBy: string;
  createdAt: string;
}

export interface MaintenanceNotification {
  type: 'email' | 'sms' | 'webhook' | 'in_app';
  timing: 'before' | 'start' | 'end';
  offset?: number; // minutes
  sent: boolean;
  sentAt?: string;
}