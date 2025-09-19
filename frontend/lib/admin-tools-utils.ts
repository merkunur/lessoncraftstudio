import { 
  SystemInfo, 
  PerformanceMetrics, 
  FeatureFlag, 
  ABTest, 
  ABVariant,
  ConfigurationItem,
  SystemDiagnostics
} from '@/types/admin-tools';

// Format bytes to human readable size
export const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Format uptime from seconds to readable format
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
};

// Calculate system health score
export const calculateSystemHealth = (diagnostics: SystemDiagnostics): number => {
  let score = 100;

  // Memory usage penalty
  if (diagnostics.system.memory.percentage > 90) score -= 30;
  else if (diagnostics.system.memory.percentage > 80) score -= 15;
  else if (diagnostics.system.memory.percentage > 70) score -= 5;

  // CPU usage penalty
  if (diagnostics.system.cpu.usage > 90) score -= 30;
  else if (diagnostics.system.cpu.usage > 80) score -= 15;
  else if (diagnostics.system.cpu.usage > 70) score -= 5;

  // Disk usage penalty
  if (diagnostics.system.disk.percentage > 90) score -= 20;
  else if (diagnostics.system.disk.percentage > 80) score -= 10;

  // Error rate penalty
  if (diagnostics.performance.errorRate > 5) score -= 25;
  else if (diagnostics.performance.errorRate > 2) score -= 15;
  else if (diagnostics.performance.errorRate > 1) score -= 5;

  // Database connection penalty
  if (!diagnostics.database.connected) score -= 30;

  // Service degradation penalty
  const degradedServices = diagnostics.services.filter(s => s.status === 'degraded').length;
  const stoppedServices = diagnostics.services.filter(s => s.status === 'stopped').length;
  score -= degradedServices * 5;
  score -= stoppedServices * 10;

  // Critical errors penalty
  const criticalErrors = diagnostics.errors.filter(e => e.level === 'critical').length;
  score -= criticalErrors * 10;

  return Math.max(0, Math.min(100, score));
};

// Get health status from score
export const getHealthStatus = (score: number): { status: string; color: string } => {
  if (score >= 90) return { status: 'Excellent', color: 'text-green-600 bg-green-100' };
  if (score >= 75) return { status: 'Good', color: 'text-blue-600 bg-blue-100' };
  if (score >= 60) return { status: 'Fair', color: 'text-yellow-600 bg-yellow-100' };
  if (score >= 40) return { status: 'Poor', color: 'text-orange-600 bg-orange-100' };
  return { status: 'Critical', color: 'text-red-600 bg-red-100' };
};

// Evaluate feature flag for user
export const evaluateFeatureFlag = (
  flag: FeatureFlag, 
  userId?: string, 
  attributes?: Record<string, any>
): boolean | any => {
  if (!flag.enabled) return false;

  switch (flag.type) {
    case 'boolean':
      return true;

    case 'percentage':
      if (!userId) return false;
      const hash = hashUserId(userId);
      return hash < (flag.percentage || 0);

    case 'variant':
      if (!flag.variants || flag.variants.length === 0) return flag.value;
      if (!userId) return flag.variants[0].value;
      
      const variantHash = hashUserId(userId);
      let accumulated = 0;
      for (const variant of flag.variants) {
        accumulated += variant.percentage;
        if (variantHash < accumulated) {
          return variant.value;
        }
      }
      return flag.variants[flag.variants.length - 1].value;

    case 'schedule':
      if (!flag.schedule) return false;
      const now = new Date();
      const start = flag.schedule.startDate ? new Date(flag.schedule.startDate) : null;
      const end = flag.schedule.endDate ? new Date(flag.schedule.endDate) : null;
      
      if (start && now < start) return false;
      if (end && now > end) return false;
      return true;

    default:
      return flag.value !== undefined ? flag.value : false;
  }
};

// Simple hash function for user ID to percentage
const hashUserId = (userId: string): number => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % 100;
};

// Calculate A/B test statistical significance
export const calculateSignificance = (
  control: { participants: number; conversions: number },
  variant: { participants: number; conversions: number }
): { significant: boolean; confidence: number; improvement: number } => {
  const controlRate = control.conversions / control.participants;
  const variantRate = variant.conversions / variant.participants;
  
  // Calculate improvement
  const improvement = ((variantRate - controlRate) / controlRate) * 100;
  
  // Simple z-test for proportions
  const pooledRate = (control.conversions + variant.conversions) / 
                     (control.participants + variant.participants);
  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * 
    (1/control.participants + 1/variant.participants)
  );
  
  const zScore = (variantRate - controlRate) / standardError;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
  const confidence = (1 - pValue) * 100;
  
  return {
    significant: confidence >= 95,
    confidence: Math.round(confidence * 100) / 100,
    improvement: Math.round(improvement * 100) / 100
  };
};

// Normal cumulative distribution function
const normalCDF = (z: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) prob = 1 - prob;
  return prob;
};

// Validate configuration value
export const validateConfigValue = (
  config: ConfigurationItem,
  value: any
): { valid: boolean; error?: string } => {
  if (!config.validation) return { valid: true };

  const validation = config.validation;

  // Required check
  if (validation.required && (value === null || value === undefined || value === '')) {
    return { valid: false, error: 'Value is required' };
  }

  // Type-specific validation
  switch (config.type) {
    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { valid: false, error: 'Value must be a number' };
      }
      if (validation.min !== undefined && numValue < validation.min) {
        return { valid: false, error: `Value must be at least ${validation.min}` };
      }
      if (validation.max !== undefined && numValue > validation.max) {
        return { valid: false, error: `Value must be at most ${validation.max}` };
      }
      break;

    case 'string':
      if (validation.pattern) {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          return { valid: false, error: 'Value does not match required pattern' };
        }
      }
      if (validation.min !== undefined && value.length < validation.min) {
        return { valid: false, error: `Value must be at least ${validation.min} characters` };
      }
      if (validation.max !== undefined && value.length > validation.max) {
        return { valid: false, error: `Value must be at most ${validation.max} characters` };
      }
      break;

    case 'json':
      try {
        JSON.parse(value);
      } catch {
        return { valid: false, error: 'Value must be valid JSON' };
      }
      break;

    case 'array':
      if (!Array.isArray(value)) {
        return { valid: false, error: 'Value must be an array' };
      }
      break;
  }

  // Options validation
  if (validation.options && validation.options.length > 0) {
    if (!validation.options.includes(value)) {
      return { valid: false, error: `Value must be one of: ${validation.options.join(', ')}` };
    }
  }

  return { valid: true };
};

// Parse cron expression to next run time
export const getNextCronRun = (cronExpression: string): Date => {
  // Simplified cron parser - in production use a library like node-cron
  const now = new Date();
  const parts = cronExpression.split(' ');
  
  if (parts.length !== 5) {
    throw new Error('Invalid cron expression');
  }

  // For demo, just add 1 hour
  const next = new Date(now);
  next.setHours(next.getHours() + 1);
  return next;
};

// Generate command line for system command
export const buildCommand = (
  command: string,
  parameters: Record<string, any>
): string => {
  let result = command;
  
  Object.entries(parameters).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    result = result.replace(placeholder, String(value));
  });
  
  return result;
};

// Format log level with color
export const getLogLevelColor = (level: string): string => {
  switch (level) {
    case 'debug': return 'text-gray-600 bg-gray-100';
    case 'info': return 'text-blue-600 bg-blue-100';
    case 'warn': return 'text-yellow-600 bg-yellow-100';
    case 'error': return 'text-red-600 bg-red-100';
    case 'fatal': return 'text-red-800 bg-red-200';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// Calculate queue metrics
export const calculateQueueMetrics = (jobs: any[]): {
  pending: number;
  active: number;
  completed: number;
  failed: number;
  throughput: number;
  averageWaitTime: number;
} => {
  const metrics = {
    pending: jobs.filter(j => j.status === 'pending').length,
    active: jobs.filter(j => j.status === 'active').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
    throughput: 0,
    averageWaitTime: 0
  };

  // Calculate throughput (jobs per minute)
  const completedJobs = jobs.filter(j => j.status === 'completed' && j.completedAt);
  if (completedJobs.length > 0) {
    const now = Date.now();
    const recentJobs = completedJobs.filter(j => 
      now - new Date(j.completedAt).getTime() < 60000 // last minute
    );
    metrics.throughput = recentJobs.length;
  }

  // Calculate average wait time
  const processedJobs = jobs.filter(j => j.processedAt && j.createdAt);
  if (processedJobs.length > 0) {
    const totalWait = processedJobs.reduce((sum, job) => {
      const wait = new Date(job.processedAt).getTime() - new Date(job.createdAt).getTime();
      return sum + wait;
    }, 0);
    metrics.averageWaitTime = Math.round(totalWait / processedJobs.length / 1000); // in seconds
  }

  return metrics;
};

// Check if maintenance window is active
export const isMaintenanceActive = (maintenance: any): boolean => {
  if (!maintenance.enabled) return false;
  
  const now = new Date();
  if (maintenance.startedAt) {
    const started = new Date(maintenance.startedAt);
    if (now < started) return false;
  }
  
  if (maintenance.estimatedEndTime) {
    const end = new Date(maintenance.estimatedEndTime);
    if (now > end) return false;
  }
  
  return true;
};

// Format API response time
export const formatResponseTime = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

// Get severity color
export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'low': return 'text-gray-600 bg-gray-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'high': return 'text-orange-600 bg-orange-100';
    case 'critical': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};