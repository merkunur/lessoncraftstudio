import {
  AdminUser,
  UserRole,
  UserStatus,
  AdminPermission,
  SystemMetrics,
  ContentItem,
  ContentStatus,
  ContentFlags,
  ModerationAction,
  AuditLog,
  SystemConfig,
  AnalyticsReport,
  ReportPeriod,
  AdminNotification,
  BackupConfig,
  MaintenanceWindow
} from '@/types/admin';

// Permission checking
export function hasAdminPermission(
  user: AdminUser,
  resource: string,
  action: string
): boolean {
  // Super admin has all permissions
  if (user.role === 'super_admin') return true;

  // Check specific permissions
  return user.permissions.some(p => {
    if (p.resource !== resource && p.resource !== '*') return false;
    if (!p.actions.includes(action) && !p.actions.includes('*')) return false;
    
    // Check expiration
    if (p.expiresAt && new Date(p.expiresAt) < new Date()) return false;
    
    // Check conditions
    if (p.conditions) {
      // Evaluate conditions (simplified)
      return true; // Would implement condition logic
    }
    
    return true;
  });
}

// Get role hierarchy level
export function getRoleLevel(role: UserRole): number {
  const levels: Record<UserRole, number> = {
    super_admin: 5,
    admin: 4,
    moderator: 3,
    support: 2,
    user: 1
  };
  return levels[role] || 0;
}

// Check if user can modify another user
export function canModifyUser(
  actor: AdminUser,
  target: AdminUser
): boolean {
  // Can't modify yourself for certain actions
  if (actor.id === target.id) return false;
  
  // Check role hierarchy
  return getRoleLevel(actor.role) > getRoleLevel(target.role);
}

// Format user status
export function formatUserStatus(status: UserStatus): {
  label: string;
  color: string;
  icon: string;
} {
  const formats = {
    active: { label: 'Active', color: 'green', icon: '✓' },
    inactive: { label: 'Inactive', color: 'gray', icon: '○' },
    suspended: { label: 'Suspended', color: 'orange', icon: '⚠' },
    banned: { label: 'Banned', color: 'red', icon: '⛔' },
    deleted: { label: 'Deleted', color: 'black', icon: '✕' },
    pending: { label: 'Pending', color: 'yellow', icon: '⏳' }
  };
  return formats[status];
}

// Calculate system health score
export function calculateSystemHealth(metrics: SystemMetrics): {
  score: number;
  status: 'healthy' | 'degraded' | 'critical';
  issues: string[];
} {
  let score = 100;
  const issues: string[] = [];

  // CPU check
  if (metrics.cpu.usage > 90) {
    score -= 30;
    issues.push('Critical CPU usage');
  } else if (metrics.cpu.usage > 70) {
    score -= 15;
    issues.push('High CPU usage');
  }

  // Memory check
  if (metrics.memory.percentage > 90) {
    score -= 25;
    issues.push('Critical memory usage');
  } else if (metrics.memory.percentage > 75) {
    score -= 10;
    issues.push('High memory usage');
  }

  // Disk check
  if (metrics.disk.percentage > 95) {
    score -= 30;
    issues.push('Critical disk usage');
  } else if (metrics.disk.percentage > 85) {
    score -= 10;
    issues.push('High disk usage');
  }

  // Database check
  if (metrics.database.slowQueries > 100) {
    score -= 20;
    issues.push('Too many slow queries');
  }
  if (metrics.database.deadlocks > 0) {
    score -= 15;
    issues.push('Database deadlocks detected');
  }

  // Error rate check
  if (metrics.errors.rate > 10) {
    score -= 25;
    issues.push('High error rate');
  } else if (metrics.errors.rate > 5) {
    score -= 10;
    issues.push('Elevated error rate');
  }

  // Determine status
  let status: 'healthy' | 'degraded' | 'critical';
  if (score >= 80) {
    status = 'healthy';
  } else if (score >= 50) {
    status = 'degraded';
  } else {
    status = 'critical';
  }

  return { score: Math.max(0, score), status, issues };
}

// Format metric value
export function formatMetricValue(
  value: number,
  type: 'bytes' | 'percentage' | 'count' | 'duration'
): string {
  switch (type) {
    case 'bytes':
      return formatBytes(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'count':
      return formatCount(value);
    case 'duration':
      return formatDuration(value);
    default:
      return value.toString();
  }
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

// Content moderation scoring
export function calculateContentScore(
  item: ContentItem
): {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  // Check flags
  const flags = item.flags;
  if (flags.spam) {
    score += 20;
    reasons.push('Spam detected');
  }
  if (flags.inappropriate) {
    score += 30;
    reasons.push('Inappropriate content');
  }
  if (flags.copyright) {
    score += 25;
    reasons.push('Copyright violation');
  }
  if (flags.malicious) {
    score += 50;
    reasons.push('Malicious content');
  }
  if (flags.misinformation) {
    score += 35;
    reasons.push('Misinformation');
  }
  if (flags.harassment) {
    score += 40;
    reasons.push('Harassment');
  }
  if (flags.violence) {
    score += 45;
    reasons.push('Violence');
  }
  if (flags.adult) {
    score += 25;
    reasons.push('Adult content');
  }

  // Check reports
  if (item.reports) {
    const reportCount = item.reports.length;
    if (reportCount > 10) {
      score += 30;
      reasons.push(`High report count (${reportCount})`);
    } else if (reportCount > 5) {
      score += 15;
      reasons.push(`Multiple reports (${reportCount})`);
    } else if (reportCount > 0) {
      score += 5;
      reasons.push(`Reported (${reportCount})`);
    }
  }

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' | 'critical';
  if (score >= 75) {
    riskLevel = 'critical';
  } else if (score >= 50) {
    riskLevel = 'high';
  } else if (score >= 25) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }

  return { score: Math.min(100, score), riskLevel, reasons };
}

// Generate audit log entry
export function createAuditLog(
  userId: string,
  action: string,
  resource: string,
  changes?: any,
  metadata?: any
): Partial<AuditLog> {
  return {
    userId,
    action,
    resource,
    changes,
    metadata,
    timestamp: new Date().toISOString(),
    status: 'success'
  };
}

// Validate system configuration
export function validateConfig(
  config: SystemConfig
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.validation) {
    return { valid: true, errors };
  }

  const { required, min, max, pattern, enum: enumValues } = config.validation;

  // Check required
  if (required && (config.value === null || config.value === undefined)) {
    errors.push('Value is required');
  }

  // Check numeric constraints
  if (typeof config.value === 'number') {
    if (min !== undefined && config.value < min) {
      errors.push(`Value must be at least ${min}`);
    }
    if (max !== undefined && config.value > max) {
      errors.push(`Value must be at most ${max}`);
    }
  }

  // Check string pattern
  if (typeof config.value === 'string' && pattern) {
    const regex = new RegExp(pattern);
    if (!regex.test(config.value)) {
      errors.push('Value does not match required pattern');
    }
  }

  // Check enum values
  if (enumValues && !enumValues.includes(config.value)) {
    errors.push(`Value must be one of: ${enumValues.join(', ')}`);
  }

  return { valid: errors.length === 0, errors };
}

// Calculate report period dates
export function getReportDates(
  period: ReportPeriod
): { start: Date; end: Date } {
  const now = new Date();
  let start: Date;
  let end = now;

  switch (period.type) {
    case 'hour':
      start = new Date(now.getTime() - (period.value || 1) * 60 * 60 * 1000);
      break;
    case 'day':
      start = new Date(now.getTime() - (period.value || 1) * 24 * 60 * 60 * 1000);
      break;
    case 'week':
      start = new Date(now.getTime() - (period.value || 1) * 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      start = new Date(now.getFullYear(), now.getMonth() - (period.value || 1), now.getDate());
      break;
    case 'quarter':
      start = new Date(now.getFullYear(), now.getMonth() - (period.value || 1) * 3, now.getDate());
      break;
    case 'year':
      start = new Date(now.getFullYear() - (period.value || 1), now.getMonth(), now.getDate());
      break;
    default:
      start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  return { start, end };
}

// Format notification severity
export function formatSeverity(
  severity: AdminNotification['severity']
): { label: string; color: string; icon: string } {
  const formats = {
    info: { label: 'Info', color: 'blue', icon: 'ℹ' },
    warning: { label: 'Warning', color: 'yellow', icon: '⚠' },
    error: { label: 'Error', color: 'red', icon: '✕' },
    critical: { label: 'Critical', color: 'red', icon: '🚨' }
  };
  return formats[severity];
}

// Calculate backup size estimate
export function estimateBackupSize(
  config: BackupConfig,
  dataSize: number
): number {
  let size = dataSize;

  // Adjust for backup type
  switch (config.type) {
    case 'incremental':
      size *= 0.1; // ~10% of full size
      break;
    case 'differential':
      size *= 0.3; // ~30% of full size
      break;
  }

  // Adjust for compression
  if (config.compression) {
    size *= 0.4; // ~60% compression ratio
  }

  return Math.round(size);
}

// Check maintenance window conflict
export function hasMaintenanceConflict(
  window1: MaintenanceWindow,
  window2: MaintenanceWindow
): boolean {
  const start1 = new Date(window1.startTime);
  const end1 = new Date(window1.endTime);
  const start2 = new Date(window2.startTime);
  const end2 = new Date(window2.endTime);

  return !(end1 < start2 || end2 < start1);
}

// Generate user activity summary
export function generateActivitySummary(
  user: AdminUser
): string[] {
  const summary: string[] = [];

  if (user.metrics) {
    summary.push(`${user.metrics.totalLogins} logins`);
    summary.push(`${user.metrics.totalActions} actions`);
    summary.push(`${formatBytes(user.metrics.storageUsed)} storage`);
    
    if (user.metrics.engagement) {
      summary.push(`${user.metrics.engagement.daysActive} days active`);
      summary.push(`${user.metrics.engagement.retentionRate}% retention`);
    }
  }

  if (user.flags) {
    if (user.flags.isVerified) summary.push('Verified');
    if (user.flags.isPremium) summary.push('Premium');
    if (user.flags.isBetaTester) summary.push('Beta Tester');
    if (user.flags.hasViolations) summary.push('Has Violations');
  }

  return summary;
}

// Calculate trend direction
export function calculateTrend(
  current: number,
  previous: number,
  threshold: number = 5
): 'up' | 'down' | 'stable' {
  const change = ((current - previous) / previous) * 100;
  
  if (change > threshold) return 'up';
  if (change < -threshold) return 'down';
  return 'stable';
}

// Format moderation action
export function formatModerationAction(
  action: ModerationAction
): string {
  const actionLabels: Record<string, string> = {
    approve: 'Approved',
    reject: 'Rejected',
    flag: 'Flagged',
    unflag: 'Unflagged',
    quarantine: 'Quarantined',
    delete: 'Deleted',
    restore: 'Restored',
    warn: 'Warned',
    ban: 'Banned',
    unban: 'Unbanned'
  };

  let label = actionLabels[action.action] || action.action;
  
  if (action.duration) {
    label += ` for ${action.duration} hours`;
  }

  return label;
}

// Check if backup is due
export function isBackupDue(config: BackupConfig): boolean {
  if (!config.lastRun) return true;

  const lastRun = new Date(config.lastRun);
  const now = new Date();
  const hoursSince = (now.getTime() - lastRun.getTime()) / (1000 * 60 * 60);

  switch (config.schedule.frequency) {
    case 'hourly':
      return hoursSince >= 1;
    case 'daily':
      return hoursSince >= 24;
    case 'weekly':
      return hoursSince >= 168;
    case 'monthly':
      return hoursSince >= 720;
    default:
      return false;
  }
}

// Sanitize user input for audit logs
export function sanitizeForAudit(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sensitive = ['password', 'token', 'secret', 'key', 'credit_card'];
  const sanitized = { ...data };

  Object.keys(sanitized).forEach(key => {
    if (sensitive.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '***REDACTED***';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeForAudit(sanitized[key]);
    }
  });

  return sanitized;
}

// Generate dashboard summary statistics
export function generateDashboardStats(
  users: AdminUser[],
  content: ContentItem[],
  metrics: SystemMetrics
): Record<string, any> {
  const activeUsers = users.filter(u => u.status === 'active').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const flaggedContent = content.filter(c => c.status === 'flagged').length;
  const pendingReports = content.reduce((acc, c) => 
    acc + (c.reports?.filter(r => r.status === 'pending').length || 0), 0
  );

  return {
    users: {
      total: users.length,
      active: activeUsers,
      suspended: suspendedUsers,
      growth: calculateTrend(activeUsers, activeUsers - 10)
    },
    content: {
      total: content.length,
      flagged: flaggedContent,
      pendingReports,
      moderationQueue: flaggedContent + pendingReports
    },
    system: {
      health: calculateSystemHealth(metrics),
      uptime: formatDuration(Date.now() - new Date('2024-01-01').getTime()),
      load: metrics.cpu.loadAverage[0],
      errorRate: metrics.errors.rate
    },
    alerts: {
      critical: metrics.errors.critical,
      warnings: metrics.errors.warnings,
      maintenance: 0 // Would check maintenance windows
    }
  };
}