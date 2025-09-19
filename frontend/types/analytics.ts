// Analytics type definitions

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number; // Percentage change
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  unit?: string;
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }>;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface RevenueData {
  date: string;
  revenue: number;
  transactions: number;
  averageOrderValue: number;
  currency: string;
  breakdown?: {
    subscriptions: number;
    oneTime: number;
    upgrades: number;
    renewals: number;
  };
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  churnRate: number;
  retentionRate: number;
  averageSessionDuration: number;
  sessionsPerUser: number;
  demographics?: {
    countries: Record<string, number>;
    languages: Record<string, number>;
    devices: Record<string, number>;
  };
}

export interface WorksheetAnalytics {
  totalGenerated: number;
  byType: Record<string, number>;
  byLanguage: Record<string, number>;
  averagePerUser: number;
  completionRate: number;
  downloadRate: number;
  shareRate: number;
  topTemplates: Array<{
    id: string;
    name: string;
    uses: number;
    rating?: number;
  }>;
}

export interface EngagementMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageTimeOnPage: number;
  topPages: Array<{
    path: string;
    views: number;
    avgDuration: number;
    bounceRate: number;
  }>;
  userFlow: Array<{
    from: string;
    to: string;
    count: number;
  }>;
}

export interface ConversionFunnel {
  id: string;
  name: string;
  steps: Array<{
    name: string;
    visitors: number;
    conversionRate: number;
    dropoffRate: number;
    averageTime?: number;
  }>;
  overallConversion: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'dashboard' | 'detailed' | 'summary' | 'custom';
  schedule?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  metrics: string[];
  filters: ReportFilter[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  recipients?: string[];
  createdAt: string;
  lastRun?: string;
  nextRun?: string;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between' | 'in';
  value: any;
}

export interface DateRange {
  start: Date;
  end: Date;
  label?: string;
}

export interface AnalyticsDashboard {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  layout: 'grid' | 'list' | 'masonry';
  refreshInterval?: number; // in seconds
  isPublic: boolean;
  createdBy: string;
  sharedWith?: string[];
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'map' | 'list' | 'custom';
  title: string;
  dataSource: string;
  config: {
    chartType?: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter';
    metrics?: string[];
    dimensions?: string[];
    filters?: ReportFilter[];
    timeRange?: DateRange;
    refreshRate?: number;
    displayOptions?: Record<string, any>;
  };
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface PerformanceMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  status: 'on-track' | 'at-risk' | 'behind' | 'exceeded';
  trend: 'up' | 'down' | 'stable';
  history: TimeSeriesData[];
}

export interface TeamAnalytics {
  teamId: string;
  teamName: string;
  memberCount: number;
  worksheetsCreated: number;
  storageUsed: number;
  collaborationScore: number;
  topContributors: Array<{
    userId: string;
    name: string;
    contributions: number;
    avatar?: string;
  }>;
  activityHeatmap: Array<{
    day: string;
    hour: number;
    activity: number;
  }>;
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'json';
  dateRange: DateRange;
  metrics?: string[];
  includeCharts?: boolean;
  includeRawData?: boolean;
  compression?: boolean;
}