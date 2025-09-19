import {
  WebVital,
  PerformanceMetric,
  PerformanceIssue,
  PerformanceRecommendation,
  BudgetMetric,
  MetricSummary,
  ServiceMetric,
  ErrorEvent
} from '@/types/performance';

// Web Vitals thresholds based on Google's recommendations
const WEB_VITALS_THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },      // First Contentful Paint (ms)
  LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint (ms)
  FID: { good: 100, poor: 300 },        // First Input Delay (ms)
  CLS: { good: 0.1, poor: 0.25 },       // Cumulative Layout Shift
  TTFB: { good: 800, poor: 1800 },      // Time to First Byte (ms)
  INP: { good: 200, poor: 500 }         // Interaction to Next Paint (ms)
};

// Rate a Web Vital metric
export const rateWebVital = (
  name: WebVital['name'],
  value: number
): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = WEB_VITALS_THRESHOLDS[name];
  if (!thresholds) return 'poor';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

// Calculate Apdex score
export const calculateApdex = (
  responseTimes: number[],
  threshold: number = 500 // Satisfied threshold in ms
): number => {
  if (responseTimes.length === 0) return 0;

  let satisfied = 0;
  let tolerating = 0;
  const toleratingThreshold = threshold * 4;

  responseTimes.forEach(time => {
    if (time <= threshold) {
      satisfied++;
    } else if (time <= toleratingThreshold) {
      tolerating++;
    }
  });

  return (satisfied + tolerating / 2) / responseTimes.length;
};

// Calculate percentiles
export const calculatePercentiles = (
  values: number[],
  percentiles: number[] = [50, 75, 95, 99]
): Record<string, number> => {
  if (values.length === 0) {
    return percentiles.reduce((acc, p) => ({ ...acc, [`p${p}`]: 0 }), {});
  }

  const sorted = [...values].sort((a, b) => a - b);
  const result: Record<string, number> = {};

  percentiles.forEach(p => {
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    result[`p${p}`] = sorted[Math.max(0, index)];
  });

  return result;
};

// Format bytes to human readable
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Format duration
export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
};

// Detect performance issues
export const detectPerformanceIssues = (
  metrics: PerformanceMetric[],
  webVitals: WebVital[],
  errors: ErrorEvent[]
): PerformanceIssue[] => {
  const issues: PerformanceIssue[] = [];

  // Check for slow LCP
  const lcpMetrics = webVitals.filter(v => v.name === 'LCP');
  const poorLCP = lcpMetrics.filter(v => v.rating === 'poor');
  if (poorLCP.length > lcpMetrics.length * 0.25) {
    issues.push({
      id: 'issue_lcp',
      severity: 'high',
      type: 'slowdown',
      metric: 'LCP',
      description: 'Largest Contentful Paint is poor for >25% of users',
      impact: 'Users experiencing slow page loads',
      affectedUsers: poorLCP.length,
      detectedAt: new Date().toISOString()
    });
  }

  // Check for high CLS
  const clsMetrics = webVitals.filter(v => v.name === 'CLS');
  const poorCLS = clsMetrics.filter(v => v.rating === 'poor');
  if (poorCLS.length > clsMetrics.length * 0.1) {
    issues.push({
      id: 'issue_cls',
      severity: 'medium',
      type: 'degradation',
      metric: 'CLS',
      description: 'High layout shift detected',
      impact: 'Poor visual stability affecting user experience',
      affectedUsers: poorCLS.length,
      detectedAt: new Date().toISOString()
    });
  }

  // Check for error spikes
  const recentErrors = errors.filter(e => 
    Date.now() - new Date(e.timestamp).getTime() < 3600000 // Last hour
  );
  if (recentErrors.length > 100) {
    issues.push({
      id: 'issue_errors',
      severity: 'critical',
      type: 'error-spike',
      metric: 'Error Rate',
      description: `${recentErrors.length} errors in the last hour`,
      impact: 'Users encountering application errors',
      affectedUsers: new Set(recentErrors.map(e => e.userId || e.sessionId)).size,
      detectedAt: new Date().toISOString()
    });
  }

  return issues;
};

// Generate performance recommendations
export const generateRecommendations = (
  webVitals: WebVital[],
  metrics: PerformanceMetric[],
  bundleSize?: number
): PerformanceRecommendation[] => {
  const recommendations: PerformanceRecommendation[] = [];

  // Check LCP
  const avgLCP = webVitals
    .filter(v => v.name === 'LCP')
    .reduce((sum, v, _, arr) => sum + v.value / arr.length, 0);

  if (avgLCP > WEB_VITALS_THRESHOLDS.LCP.good) {
    recommendations.push({
      id: 'rec_lcp',
      priority: 'high',
      category: 'images',
      title: 'Optimize Largest Contentful Paint',
      description: 'Your LCP is above the recommended threshold',
      impact: 'Improving LCP will make your pages feel faster to load',
      estimatedImprovement: {
        metric: 'LCP',
        value: avgLCP - WEB_VITALS_THRESHOLDS.LCP.good,
        unit: 'ms'
      },
      implementation: [
        'Optimize and compress images',
        'Use modern image formats (WebP, AVIF)',
        'Implement lazy loading for below-fold images',
        'Preload critical resources',
        'Use a CDN for static assets'
      ],
      effort: 'medium'
    });
  }

  // Check bundle size
  if (bundleSize && bundleSize > 500000) { // 500KB
    recommendations.push({
      id: 'rec_bundle',
      priority: 'high',
      category: 'scripts',
      title: 'Reduce JavaScript Bundle Size',
      description: 'Your JavaScript bundle is larger than recommended',
      impact: 'Smaller bundles load and parse faster',
      estimatedImprovement: {
        metric: 'Bundle Size',
        value: bundleSize - 500000,
        unit: 'bytes'
      },
      implementation: [
        'Enable code splitting',
        'Remove unused dependencies',
        'Use tree shaking',
        'Lazy load non-critical modules',
        'Minify and compress JavaScript'
      ],
      effort: 'high'
    });
  }

  // Check FID
  const avgFID = webVitals
    .filter(v => v.name === 'FID')
    .reduce((sum, v, _, arr) => sum + v.value / arr.length, 0);

  if (avgFID > WEB_VITALS_THRESHOLDS.FID.good) {
    recommendations.push({
      id: 'rec_fid',
      priority: 'medium',
      category: 'code',
      title: 'Improve First Input Delay',
      description: 'Users are experiencing input lag',
      impact: 'Better interactivity and responsiveness',
      estimatedImprovement: {
        metric: 'FID',
        value: avgFID - WEB_VITALS_THRESHOLDS.FID.good,
        unit: 'ms'
      },
      implementation: [
        'Break up long JavaScript tasks',
        'Use web workers for heavy computations',
        'Defer non-critical JavaScript',
        'Optimize event handlers',
        'Reduce main thread work'
      ],
      effort: 'medium'
    });
  }

  // Check for missing caching
  const resourceMetrics = metrics.filter(m => m.category === 'resource');
  const uncachedResources = resourceMetrics.filter(m => 
    m.metadata?.cached === false
  ).length;

  if (uncachedResources > resourceMetrics.length * 0.3) {
    recommendations.push({
      id: 'rec_cache',
      priority: 'medium',
      category: 'caching',
      title: 'Implement Better Caching Strategy',
      description: 'Many resources are not being cached effectively',
      impact: 'Faster repeat visits and reduced server load',
      estimatedImprovement: {
        metric: 'Load Time',
        value: 30,
        unit: 'percentage'
      },
      implementation: [
        'Set appropriate Cache-Control headers',
        'Use versioned file names for cache busting',
        'Implement service worker caching',
        'Cache API responses where appropriate',
        'Use CDN caching'
      ],
      effort: 'low'
    });
  }

  return recommendations;
};

// Check if budget is exceeded
export const checkBudget = (
  metric: number,
  budget: BudgetMetric
): { exceeded: boolean; percentage: number } => {
  const percentage = (metric / budget.budget) * 100;
  const exceeded = metric > budget.budget;
  return { exceeded, percentage };
};

// Calculate metric summary
export const calculateMetricSummary = (
  values: number[]
): MetricSummary => {
  if (values.length === 0) {
    return {
      p50: 0,
      p75: 0,
      p95: 0,
      good: 0,
      needsImprovement: 0,
      poor: 0
    };
  }

  const percentiles = calculatePercentiles(values, [50, 75, 95]);
  
  // This is a simplified calculation - in reality, you'd use the specific
  // thresholds for each metric type
  const good = values.filter(v => v <= 1000).length;
  const needsImprovement = values.filter(v => v > 1000 && v <= 3000).length;
  const poor = values.filter(v => v > 3000).length;
  const total = values.length;

  return {
    p50: percentiles.p50,
    p75: percentiles.p75,
    p95: percentiles.p95,
    good: (good / total) * 100,
    needsImprovement: (needsImprovement / total) * 100,
    poor: (poor / total) * 100
  };
};

// Get performance grade
export const getPerformanceGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// Get metric trend
export const getMetricTrend = (
  current: number,
  previous: number,
  threshold: number = 5
): 'improving' | 'degrading' | 'stable' => {
  const change = ((current - previous) / previous) * 100;
  
  if (Math.abs(change) < threshold) return 'stable';
  return change < 0 ? 'improving' : 'degrading';
};

// Group errors by type
export const groupErrors = (
  errors: ErrorEvent[]
): Record<string, ErrorEvent[]> => {
  return errors.reduce((groups, error) => {
    const key = error.groupingKey || error.message;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(error);
    return groups;
  }, {} as Record<string, ErrorEvent[]>);
};

// Calculate service health
export const calculateServiceHealth = (
  metrics: ServiceMetric
): { score: number; status: 'healthy' | 'degraded' | 'critical' } => {
  let score = 100;

  // Error rate impact
  if (metrics.errorRate > 5) score -= 30;
  else if (metrics.errorRate > 2) score -= 15;
  else if (metrics.errorRate > 0.5) score -= 5;

  // Response time impact
  if (metrics.p95ResponseTime > 5000) score -= 25;
  else if (metrics.p95ResponseTime > 2000) score -= 15;
  else if (metrics.p95ResponseTime > 1000) score -= 5;

  // Apdex impact
  score *= metrics.apdex;

  const status = 
    score >= 80 ? 'healthy' :
    score >= 50 ? 'degraded' :
    'critical';

  return { score: Math.max(0, Math.min(100, score)), status };
};

// Format metric value based on unit
export const formatMetricValue = (
  value: number,
  unit: string
): string => {
  switch (unit) {
    case 'ms':
      return formatDuration(value);
    case 'bytes':
      return formatBytes(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'score':
      return value.toFixed(2);
    case 'count':
      return value.toLocaleString();
    default:
      return String(value);
  }
};

// Get issue severity color
export const getIssueSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical': return 'text-red-600 bg-red-100';
    case 'high': return 'text-orange-600 bg-orange-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// Calculate trend direction
export const calculateTrend = (
  dataPoints: { timestamp: string; value: number }[]
): { direction: 'up' | 'down' | 'stable'; change: number } => {
  if (dataPoints.length < 2) {
    return { direction: 'stable', change: 0 };
  }

  const recent = dataPoints.slice(-10); // Last 10 points
  const firstValue = recent[0].value;
  const lastValue = recent[recent.length - 1].value;
  const change = ((lastValue - firstValue) / firstValue) * 100;

  const direction = 
    Math.abs(change) < 5 ? 'stable' :
    change > 0 ? 'up' : 'down';

  return { direction, change };
};