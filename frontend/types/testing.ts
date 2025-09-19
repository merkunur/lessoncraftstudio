// Testing & QA type definitions

export interface TestCase {
  id: string;
  name: string;
  description?: string;
  type: TestType;
  category: TestCategory;
  suite: string;
  file?: string;
  line?: number;
  tags?: string[];
  priority: TestPriority;
  status: TestStatus;
  result?: TestResult;
  duration?: number;
  retries?: number;
  maxRetries?: number;
  timeout?: number;
  skip?: boolean;
  only?: boolean;
  todo?: boolean;
  metadata?: TestMetadata;
  assertions?: Assertion[];
  coverage?: Coverage;
  performance?: PerformanceMetrics;
  screenshots?: Screenshot[];
  videos?: Video[];
  logs?: LogEntry[];
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
}

export type TestType = 
  | 'unit'
  | 'integration'
  | 'e2e'
  | 'performance'
  | 'security'
  | 'accessibility'
  | 'visual'
  | 'smoke'
  | 'regression';

export type TestCategory = 
  | 'api'
  | 'ui'
  | 'database'
  | 'auth'
  | 'payment'
  | 'email'
  | 'file'
  | 'search'
  | 'notification'
  | 'collaboration';

export type TestPriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';

export type TestStatus = 
  | 'pending'
  | 'running'
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'timeout'
  | 'error';

export interface TestResult {
  status: TestStatus;
  message?: string;
  error?: TestError;
  startTime: string;
  endTime: string;
  duration: number;
  assertions: AssertionResult[];
  memory?: MemoryUsage;
  cpu?: number;
}

export interface TestError {
  name: string;
  message: string;
  stack?: string;
  code?: string;
  expected?: any;
  actual?: any;
  diff?: string;
  screenshot?: string;
}

export interface TestMetadata {
  author?: string;
  browser?: string;
  os?: string;
  device?: string;
  viewport?: {
    width: number;
    height: number;
  };
  environment?: string;
  version?: string;
  commit?: string;
  branch?: string;
  buildId?: string;
}

export interface Assertion {
  id: string;
  type: AssertionType;
  description?: string;
  expected: any;
  actual?: any;
  operator?: string;
  passed?: boolean;
  message?: string;
  location?: {
    file: string;
    line: number;
    column: number;
  };
}

export type AssertionType = 
  | 'equal'
  | 'notEqual'
  | 'deepEqual'
  | 'notDeepEqual'
  | 'strictEqual'
  | 'notStrictEqual'
  | 'truthy'
  | 'falsy'
  | 'contains'
  | 'notContains'
  | 'throws'
  | 'notThrows'
  | 'matches'
  | 'notMatches';

export interface AssertionResult {
  assertion: Assertion;
  passed: boolean;
  error?: TestError;
  duration?: number;
}

export interface TestSuite {
  id: string;
  name: string;
  description?: string;
  file: string;
  tests: TestCase[];
  beforeAll?: Hook[];
  afterAll?: Hook[];
  beforeEach?: Hook[];
  afterEach?: Hook[];
  suites?: TestSuite[]; // Nested suites
  status: TestStatus;
  results?: TestSuiteResult;
  config?: TestConfig;
  metadata?: TestMetadata;
}

export interface Hook {
  id: string;
  name: string;
  type: 'beforeAll' | 'afterAll' | 'beforeEach' | 'afterEach';
  fn: string; // Function code as string
  timeout?: number;
  async?: boolean;
}

export interface TestSuiteResult {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  duration: number;
  startTime: string;
  endTime: string;
  coverage?: Coverage;
  performance?: PerformanceMetrics;
}

export interface TestConfig {
  bail?: boolean; // Stop on first failure
  timeout?: number;
  retries?: number;
  parallel?: boolean;
  maxWorkers?: number;
  testMatch?: string[];
  testIgnore?: string[];
  setupFiles?: string[];
  teardownFiles?: string[];
  reporters?: Reporter[];
  coverage?: CoverageConfig;
  performance?: PerformanceConfig;
  screenshots?: ScreenshotConfig;
  videos?: VideoConfig;
}

export interface Reporter {
  type: ReporterType;
  output?: string;
  options?: Record<string, any>;
}

export type ReporterType = 
  | 'console'
  | 'json'
  | 'html'
  | 'junit'
  | 'coverage'
  | 'allure'
  | 'custom';

export interface Coverage {
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
  files: FileCoverage[];
}

export interface CoverageMetric {
  total: number;
  covered: number;
  skipped: number;
  percentage: number;
}

export interface FileCoverage {
  path: string;
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
  uncoveredLines?: number[];
}

export interface CoverageConfig {
  enabled: boolean;
  threshold?: {
    statements?: number;
    branches?: number;
    functions?: number;
    lines?: number;
  };
  include?: string[];
  exclude?: string[];
  reporters?: string[];
}

export interface PerformanceMetrics {
  fps?: number;
  memory: MemoryUsage;
  cpu: number;
  network: NetworkMetrics;
  rendering: RenderingMetrics;
  userTiming?: UserTiming[];
  marks?: PerformanceMark[];
  measures?: PerformanceMeasure[];
}

export interface MemoryUsage {
  heapUsed: number;
  heapTotal: number;
  external: number;
  arrayBuffers: number;
}

export interface NetworkMetrics {
  requests: number;
  bytesTransferred: number;
  averageLatency: number;
  failedRequests: number;
}

export interface RenderingMetrics {
  paintTime: number;
  layoutTime: number;
  scriptTime: number;
  renderTime: number;
  compositeTime: number;
}

export interface UserTiming {
  name: string;
  startTime: number;
  duration: number;
  entryType: string;
}

export interface PerformanceMark {
  name: string;
  timestamp: number;
}

export interface PerformanceMeasure {
  name: string;
  startMark: string;
  endMark: string;
  duration: number;
}

export interface PerformanceConfig {
  enabled: boolean;
  metrics?: string[];
  thresholds?: {
    fps?: number;
    memory?: number;
    cpu?: number;
    renderTime?: number;
  };
}

export interface Screenshot {
  id: string;
  testId: string;
  name: string;
  path: string;
  timestamp: string;
  type: 'failure' | 'comparison' | 'debug';
  metadata?: {
    width: number;
    height: number;
    devicePixelRatio?: number;
  };
}

export interface ScreenshotConfig {
  enabled: boolean;
  onFailure: boolean;
  fullPage: boolean;
  path?: string;
  quality?: number;
}

export interface Video {
  id: string;
  testId: string;
  path: string;
  duration: number;
  size: number;
  format: string;
  timestamp: string;
}

export interface VideoConfig {
  enabled: boolean;
  path?: string;
  fps?: number;
  quality?: string;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  source?: string;
  metadata?: Record<string, any>;
}

export type LogLevel = 
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal';

export interface TestRun {
  id: string;
  name?: string;
  suites: TestSuite[];
  status: TestRunStatus;
  config: TestConfig;
  results?: TestRunResults;
  startTime?: string;
  endTime?: string;
  duration?: number;
  environment?: TestEnvironment;
  artifacts?: TestArtifacts;
  metadata?: TestRunMetadata;
}

export type TestRunStatus = 
  | 'queued'
  | 'running'
  | 'completed'
  | 'cancelled'
  | 'failed';

export interface TestRunResults {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  error: number;
  passRate: number;
  duration: number;
  suites: TestSuiteResult[];
  coverage?: Coverage;
  performance?: PerformanceMetrics;
}

export interface TestEnvironment {
  name: string;
  type: 'local' | 'ci' | 'staging' | 'production';
  os: string;
  node: string;
  browser?: string;
  variables: Record<string, string>;
}

export interface TestArtifacts {
  reports: string[];
  screenshots: string[];
  videos: string[];
  logs: string[];
  coverage: string[];
}

export interface TestRunMetadata {
  triggeredBy: string;
  trigger: 'manual' | 'schedule' | 'webhook' | 'commit';
  commit?: string;
  branch?: string;
  pullRequest?: string;
  tags?: string[];
}

export interface TestPlan {
  id: string;
  name: string;
  description?: string;
  suites: string[]; // Suite IDs
  schedule?: TestSchedule;
  notifications?: TestNotification[];
  config?: TestConfig;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestSchedule {
  type: 'once' | 'recurring';
  cron?: string;
  timezone?: string;
  nextRun?: string;
  lastRun?: string;
}

export interface TestNotification {
  type: 'email' | 'slack' | 'webhook';
  recipients?: string[];
  url?: string;
  events: NotificationEvent[];
  template?: string;
}

export type NotificationEvent = 
  | 'start'
  | 'complete'
  | 'pass'
  | 'fail'
  | 'error';

export interface MockData {
  id: string;
  name: string;
  type: MockType;
  endpoint?: string;
  method?: string;
  request?: any;
  response: any;
  status?: number;
  headers?: Record<string, string>;
  delay?: number;
  error?: boolean;
  active: boolean;
}

export type MockType = 
  | 'api'
  | 'database'
  | 'service'
  | 'function';

export interface TestFixture {
  id: string;
  name: string;
  type: string;
  data: any;
  setup?: string; // Setup function
  teardown?: string; // Teardown function
  shared: boolean;
}

export interface BenchmarkTest {
  id: string;
  name: string;
  description?: string;
  fn: string; // Function to benchmark
  setup?: string;
  teardown?: string;
  iterations: number;
  warmup?: number;
  results?: BenchmarkResult[];
}

export interface BenchmarkResult {
  iterations: number;
  elapsed: number;
  mean: number;
  median: number;
  standardDeviation: number;
  min: number;
  max: number;
  percentiles: {
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
  throughput: number;
  timestamp: string;
}

export interface VisualTest {
  id: string;
  name: string;
  baseline: string; // Baseline image path
  current?: string; // Current image path
  diff?: string; // Diff image path
  threshold: number; // Difference threshold
  status: 'pending' | 'passed' | 'failed' | 'new';
  difference?: number; // Percentage difference
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface AccessibilityTest {
  id: string;
  url: string;
  standard: 'WCAG2A' | 'WCAG2AA' | 'WCAG2AAA' | 'Section508';
  results?: AccessibilityResult[];
}

export interface AccessibilityResult {
  rule: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  element: string;
  description: string;
  help: string;
  helpUrl?: string;
  tags: string[];
}

export interface SecurityTest {
  id: string;
  name: string;
  type: SecurityTestType;
  target: string;
  results?: SecurityResult[];
}

export type SecurityTestType = 
  | 'vulnerability'
  | 'penetration'
  | 'authentication'
  | 'authorization'
  | 'injection'
  | 'xss'
  | 'csrf';

export interface SecurityResult {
  vulnerability: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  remediation: string;
  cwe?: string;
  owasp?: string;
}

export interface TestReport {
  id: string;
  runId: string;
  type: ReporterType;
  format: 'html' | 'pdf' | 'json' | 'xml';
  path: string;
  size: number;
  generatedAt: string;
  metadata?: Record<string, any>;
}