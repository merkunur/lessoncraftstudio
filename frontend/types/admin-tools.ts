// Admin Tools type definitions

export interface SystemDiagnostics {
  id: string;
  timestamp: string;
  system: SystemInfo;
  performance: PerformanceMetrics;
  database: DatabaseStats;
  cache: CacheStats;
  services: ServiceStatus[];
  errors: SystemError[];
  warnings: SystemWarning[];
}

export interface SystemInfo {
  version: string;
  environment: 'development' | 'staging' | 'production';
  uptime: number; // seconds
  hostname: string;
  platform: string;
  nodeVersion: string;
  memory: {
    total: number;
    used: number;
    free: number;
    percentage: number;
  };
  cpu: {
    cores: number;
    model: string;
    usage: number;
    loadAverage: number[];
  };
  disk: {
    total: number;
    used: number;
    free: number;
    percentage: number;
  };
}

export interface PerformanceMetrics {
  responseTime: {
    average: number;
    median: number;
    p95: number;
    p99: number;
  };
  throughput: {
    requestsPerSecond: number;
    bytesPerSecond: number;
  };
  errorRate: number;
  activeConnections: number;
  queuedRequests: number;
}

export interface DatabaseStats {
  connected: boolean;
  poolSize: number;
  activeConnections: number;
  idleConnections: number;
  waitingRequests: number;
  queryStats: {
    total: number;
    slow: number;
    failed: number;
    averageTime: number;
  };
  size: number;
  tables: number;
  indexes: number;
}

export interface CacheStats {
  type: string;
  size: number;
  maxSize: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
  keys: number;
}

export interface ServiceStatus {
  name: string;
  status: 'running' | 'stopped' | 'degraded' | 'unknown';
  uptime?: number;
  lastCheck: string;
  healthCheck?: {
    endpoint: string;
    responseTime: number;
    statusCode: number;
    healthy: boolean;
  };
}

export interface SystemError {
  id: string;
  timestamp: string;
  level: 'error' | 'critical';
  message: string;
  stack?: string;
  context?: Record<string, any>;
  count: number;
  firstOccurrence: string;
  lastOccurrence: string;
}

export interface SystemWarning {
  id: string;
  type: 'performance' | 'security' | 'configuration' | 'deprecation';
  message: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  detectedAt: string;
}

export interface UserImpersonation {
  id: string;
  adminId: string;
  adminEmail: string;
  targetUserId: string;
  targetUserEmail: string;
  startedAt: string;
  expiresAt: string;
  reason: string;
  permissions: string[];
  actionsLogged: boolean;
  active: boolean;
}

export interface DebugSession {
  id: string;
  userId: string;
  startedAt: string;
  mode: 'verbose' | 'normal' | 'minimal';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  features: {
    apiLogging: boolean;
    queryLogging: boolean;
    performanceTracing: boolean;
    errorStackTraces: boolean;
    networkInspection: boolean;
  };
  output: DebugOutput[];
}

export interface DebugOutput {
  id: string;
  timestamp: string;
  type: 'log' | 'error' | 'warn' | 'info' | 'network' | 'query' | 'performance';
  message: string;
  data?: any;
  stack?: string;
  duration?: number;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  type: 'boolean' | 'percentage' | 'variant' | 'schedule';
  value?: any;
  percentage?: number;
  variants?: FeatureVariant[];
  schedule?: {
    startDate?: string;
    endDate?: string;
    timezone?: string;
  };
  targeting?: TargetingRule[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface FeatureVariant {
  id: string;
  name: string;
  value: any;
  percentage: number;
  description?: string;
}

export interface TargetingRule {
  id: string;
  attribute: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'in' | 'regex';
  value: any;
  enabled: boolean;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  hypothesis: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'archived';
  type: 'split' | 'multivariate' | 'redirect';
  startDate?: string;
  endDate?: string;
  variants: ABVariant[];
  metrics: ABMetric[];
  targeting: TargetingRule[];
  trafficAllocation: number; // percentage
  results?: ABTestResults;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ABVariant {
  id: string;
  name: string;
  description: string;
  control: boolean;
  weight: number; // percentage
  changes: VariantChange[];
  participants: number;
  conversions: number;
}

export interface VariantChange {
  type: 'text' | 'style' | 'component' | 'feature';
  target: string;
  value: any;
  originalValue?: any;
}

export interface ABMetric {
  id: string;
  name: string;
  type: 'conversion' | 'engagement' | 'revenue' | 'custom';
  goal: 'maximize' | 'minimize';
  primaryMetric: boolean;
  calculation: string;
}

export interface ABTestResults {
  winner?: string; // variant id
  confidence: number;
  significanceLevel: number;
  sampleSize: number;
  duration: number; // days
  variantResults: {
    [variantId: string]: {
      participants: number;
      conversions: number;
      conversionRate: number;
      improvement?: number;
      confidence?: number;
      revenue?: number;
    };
  };
}

export interface ConfigurationItem {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json' | 'array' | 'secret';
  category: string;
  environment: 'all' | 'development' | 'staging' | 'production';
  description: string;
  encrypted: boolean;
  editable: boolean;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    options?: any[];
  };
  history: ConfigHistory[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ConfigHistory {
  id: string;
  timestamp: string;
  previousValue: any;
  newValue: any;
  changedBy: string;
  reason?: string;
}

export interface AdminAction {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  category: 'user' | 'system' | 'content' | 'configuration' | 'security';
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  duration?: number;
  status: 'success' | 'failure' | 'pending';
  error?: string;
}

export interface SystemCommand {
  id: string;
  command: string;
  description: string;
  category: string;
  dangerous: boolean;
  requiresConfirmation: boolean;
  parameters?: CommandParameter[];
  permissions: string[];
}

export interface CommandParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  required: boolean;
  description: string;
  defaultValue?: any;
  options?: { label: string; value: any }[];
}

export interface MaintenanceMode {
  enabled: boolean;
  message: string;
  allowedIPs: string[];
  allowedUsers: string[];
  startedAt?: string;
  estimatedEndTime?: string;
  type: 'scheduled' | 'emergency';
  reason?: string;
  affectedServices?: string[];
}

export interface QueueJob {
  id: string;
  name: string;
  queue: string;
  status: 'pending' | 'active' | 'completed' | 'failed' | 'delayed' | 'paused';
  priority: number;
  attempts: number;
  maxAttempts: number;
  data: any;
  result?: any;
  error?: string;
  createdAt: string;
  processedAt?: string;
  completedAt?: string;
  nextRetryAt?: string;
}

export interface CronJob {
  id: string;
  name: string;
  schedule: string; // cron expression
  command: string;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  status: 'idle' | 'running' | 'failed';
  averageDuration?: number;
  successCount: number;
  failureCount: number;
  logs?: string[];
}

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  deprecated: boolean;
  rateLimit?: {
    requests: number;
    period: number; // seconds
  };
  authentication: boolean;
  permissions?: string[];
  stats: {
    calls: number;
    errors: number;
    averageResponseTime: number;
    lastCalled?: string;
  };
}

export interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  timestamp: string;
  source: string;
  userId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
  stack?: string;
}

export interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'permission_change' | 'suspicious_activity' | 'breach_attempt';
  severity: 'info' | 'warning' | 'critical';
  userId?: string;
  ipAddress: string;
  userAgent: string;
  description: string;
  timestamp: string;
  handled: boolean;
  handledBy?: string;
  handledAt?: string;
  notes?: string;
}