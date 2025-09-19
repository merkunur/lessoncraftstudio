// Performance Monitoring type definitions

export interface PerformanceMetric {
  id: string;
  timestamp: string;
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count' | 'percentage' | 'score';
  category: 'navigation' | 'resource' | 'paint' | 'layout' | 'script' | 'custom';
  tags?: Record<string, string>;
  metadata?: Record<string, any>;
}

export interface WebVital {
  id: string;
  name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: string;
  url: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  connectionType?: string;
}

export interface RealUserMonitoring {
  sessionId: string;
  userId?: string;
  startTime: string;
  endTime?: string;
  url: string;
  userAgent: string;
  device: DeviceInfo;
  location?: GeolocationInfo;
  metrics: PerformanceMetric[];
  webVitals: WebVital[];
  errors: ErrorEvent[];
  interactions: UserInteraction[];
  resources: ResourceTiming[];
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  screenResolution: string;
  viewport: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

export interface GeolocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export interface UserInteraction {
  id: string;
  timestamp: string;
  type: 'click' | 'scroll' | 'input' | 'navigation' | 'form_submit';
  target?: string;
  duration?: number;
  isRageClick?: boolean;
}

export interface ResourceTiming {
  name: string;
  entryType: 'navigation' | 'resource' | 'paint' | 'measure';
  startTime: number;
  duration: number;
  transferSize?: number;
  encodedBodySize?: number;
  decodedBodySize?: number;
  initiatorType?: string;
  nextHopProtocol?: string;
  renderBlockingStatus?: string;
}

export interface ApplicationPerformance {
  id: string;
  timestamp: string;
  service: string;
  environment: 'development' | 'staging' | 'production';
  traces: PerformanceTrace[];
  metrics: ServiceMetric[];
  dependencies: DependencyMetric[];
  database: DatabaseMetric[];
  cache: CacheMetric[];
}

export interface PerformanceTrace {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  operationName: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'ok' | 'error' | 'cancelled';
  tags: Record<string, any>;
  logs?: TraceLog[];
}

export interface TraceLog {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  fields?: Record<string, any>;
}

export interface ServiceMetric {
  service: string;
  timestamp: string;
  requestCount: number;
  errorCount: number;
  errorRate: number;
  avgResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  throughput: number;
  apdex: number;
}

export interface DependencyMetric {
  source: string;
  target: string;
  type: 'http' | 'database' | 'cache' | 'queue' | 'external';
  requestCount: number;
  errorCount: number;
  avgDuration: number;
  totalDuration: number;
}

export interface DatabaseMetric {
  timestamp: string;
  database: string;
  operation: 'select' | 'insert' | 'update' | 'delete' | 'other';
  table?: string;
  queryCount: number;
  avgDuration: number;
  slowQueries: number;
  deadlocks: number;
  connections: {
    active: number;
    idle: number;
    waiting: number;
  };
}

export interface CacheMetric {
  timestamp: string;
  cacheName: string;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
  size: number;
  avgGetTime: number;
  avgSetTime: number;
}

export interface ErrorEvent {
  id: string;
  timestamp: string;
  level: 'warning' | 'error' | 'fatal';
  type: 'javascript' | 'network' | 'resource' | 'unhandled-rejection';
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId: string;
  context?: Record<string, any>;
  groupingKey?: string;
  count?: number;
}

export interface PerformanceBudget {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  metrics: BudgetMetric[];
  urls?: string[];
  deviceTypes?: ('desktop' | 'mobile' | 'tablet')[];
  alerting: {
    enabled: boolean;
    threshold: number; // percentage over budget
    channels: ('email' | 'slack' | 'webhook')[];
  };
}

export interface BudgetMetric {
  metric: string;
  budget: number;
  unit: 'ms' | 'bytes' | 'count' | 'score';
  warning?: number; // warning threshold
}

export interface PerformanceReport {
  id: string;
  timestamp: string;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  summary: PerformanceSummary;
  webVitals: WebVitalsSummary;
  trends: PerformanceTrend[];
  issues: PerformanceIssue[];
  recommendations: PerformanceRecommendation[];
  budgetStatus: BudgetStatus[];
}

export interface PerformanceSummary {
  avgPageLoadTime: number;
  avgServerResponseTime: number;
  avgClientRenderTime: number;
  totalPageViews: number;
  totalUniqueUsers: number;
  bounceRate: number;
  errorRate: number;
  apdexScore: number;
}

export interface WebVitalsSummary {
  fcp: MetricSummary;
  lcp: MetricSummary;
  fid: MetricSummary;
  cls: MetricSummary;
  ttfb: MetricSummary;
  inp: MetricSummary;
}

export interface MetricSummary {
  p50: number;
  p75: number;
  p95: number;
  good: number; // percentage
  needsImprovement: number;
  poor: number;
}

export interface PerformanceTrend {
  metric: string;
  dataPoints: {
    timestamp: string;
    value: number;
  }[];
  change: number; // percentage change
  direction: 'up' | 'down' | 'stable';
}

export interface PerformanceIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'slowdown' | 'error-spike' | 'budget-exceeded' | 'degradation';
  metric: string;
  description: string;
  impact: string;
  affectedUsers: number;
  detectedAt: string;
  resolved?: boolean;
  resolvedAt?: string;
}

export interface PerformanceRecommendation {
  id: string;
  priority: 'low' | 'medium' | 'high';
  category: 'images' | 'scripts' | 'styles' | 'fonts' | 'caching' | 'compression' | 'cdn' | 'code';
  title: string;
  description: string;
  impact: string;
  estimatedImprovement: {
    metric: string;
    value: number;
    unit: string;
  };
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
}

export interface BudgetStatus {
  budget: string;
  metric: string;
  current: number;
  budget: number;
  unit: string;
  status: 'under' | 'warning' | 'over';
  percentageUsed: number;
}

export interface SyntheticMonitor {
  id: string;
  name: string;
  url: string;
  frequency: number; // minutes
  locations: string[];
  enabled: boolean;
  script?: string;
  assertions: Assertion[];
  alerting: AlertConfig;
  lastRun?: MonitorRun;
  history: MonitorRun[];
}

export interface Assertion {
  type: 'status-code' | 'response-time' | 'text-content' | 'element-visible' | 'custom';
  operator: 'equals' | 'contains' | 'less-than' | 'greater-than';
  target: any;
  value: any;
}

export interface AlertConfig {
  enabled: boolean;
  failureCount: number; // consecutive failures before alert
  channels: AlertChannel[];
}

export interface AlertChannel {
  type: 'email' | 'slack' | 'pagerduty' | 'webhook';
  config: Record<string, any>;
}

export interface MonitorRun {
  id: string;
  timestamp: string;
  location: string;
  status: 'success' | 'failure';
  responseTime: number;
  assertionResults: {
    assertion: Assertion;
    passed: boolean;
    actualValue: any;
  }[];
  error?: string;
  screenshot?: string;
}

export interface LoadTestResult {
  id: string;
  timestamp: string;
  scenario: string;
  duration: number;
  virtualUsers: number;
  rampUpTime: number;
  results: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    avgResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
    p50ResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    requestsPerSecond: number;
    bytesReceived: number;
    bytesSent: number;
    errors: Record<string, number>;
  };
  charts: {
    responseTimeOverTime: DataPoint[];
    throughputOverTime: DataPoint[];
    errorsOverTime: DataPoint[];
    virtualUsersOverTime: DataPoint[];
  };
}

export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface PerformanceSnapshot {
  id: string;
  timestamp: string;
  url: string;
  lighthouse: LighthouseReport;
  bundleAnalysis: BundleAnalysis;
  networkAnalysis: NetworkAnalysis;
  runtimeAnalysis: RuntimeAnalysis;
}

export interface LighthouseReport {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  audits: LighthouseAudit[];
}

export interface LighthouseAudit {
  id: string;
  title: string;
  description: string;
  score: number;
  displayValue?: string;
  warnings?: string[];
  details?: any;
}

export interface BundleAnalysis {
  totalSize: number;
  gzipSize: number;
  brotliSize: number;
  bundles: {
    name: string;
    size: number;
    gzipSize: number;
    modules: {
      name: string;
      size: number;
      reasons: string[];
    }[];
  }[];
  duplicates: {
    module: string;
    size: number;
    occurrences: number;
  }[];
  unusedCode: {
    file: string;
    unusedBytes: number;
    totalBytes: number;
    coverage: number;
  }[];
}

export interface NetworkAnalysis {
  requests: {
    url: string;
    method: string;
    status: number;
    type: string;
    size: number;
    time: number;
    priority: string;
    cached: boolean;
  }[];
  totalRequests: number;
  totalSize: number;
  totalTime: number;
  domains: Record<string, number>;
  protocols: Record<string, number>;
}

export interface RuntimeAnalysis {
  scriptingTime: number;
  renderingTime: number;
  paintingTime: number;
  systemTime: number;
  idleTime: number;
  longTasks: {
    startTime: number;
    duration: number;
    attribution: string[];
  }[];
  memoryUsage: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}