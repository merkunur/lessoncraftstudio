'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Database,
  Globe,
  Monitor,
  RefreshCw,
  Server,
  TrendingUp,
  Zap,
  Download,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Users,
  Gauge,
  FileText,
  Target,
  ArrowUp,
  ArrowDown,
  ArrowRight
} from 'lucide-react';
import {
  WebVital,
  PerformanceMetric,
  RealUserMonitoring,
  ApplicationPerformance,
  PerformanceReport,
  PerformanceIssue,
  PerformanceRecommendation,
  LoadTestResult,
  SyntheticMonitor,
  PerformanceSnapshot
} from '@/types/performance';
import {
  rateWebVital,
  calculateApdex,
  calculatePercentiles,
  formatBytes,
  formatDuration,
  detectPerformanceIssues,
  generateRecommendations,
  calculateMetricSummary,
  getPerformanceGrade,
  calculateTrend,
  formatMetricValue
} from '@/lib/performance-utils';

interface TabConfig {
  id: string;
  label: string;
  icon: JSX.Element;
}

const tabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: <Monitor className="w-4 h-4" /> },
  { id: 'rum', label: 'Real User Monitoring', icon: <Users className="w-4 h-4" /> },
  { id: 'apm', label: 'Application Performance', icon: <Server className="w-4 h-4" /> },
  { id: 'webvitals', label: 'Web Vitals', icon: <Gauge className="w-4 h-4" /> },
  { id: 'errors', label: 'Error Tracking', icon: <AlertCircle className="w-4 h-4" /> },
  { id: 'synthetic', label: 'Synthetic Monitoring', icon: <Eye className="w-4 h-4" /> },
  { id: 'load-testing', label: 'Load Testing', icon: <Zap className="w-4 h-4" /> },
  { id: 'budgets', label: 'Performance Budgets', icon: <Target className="w-4 h-4" /> },
  { id: 'recommendations', label: 'Recommendations', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> }
];

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [rumData, setRumData] = useState<RealUserMonitoring[]>([]);
  const [apmData, setApmData] = useState<ApplicationPerformance[]>([]);
  const [webVitals, setWebVitals] = useState<WebVital[]>([]);
  const [issues, setIssues] = useState<PerformanceIssue[]>([]);
  const [recommendations, setRecommendations] = useState<PerformanceRecommendation[]>([]);
  const [monitors, setMonitors] = useState<SyntheticMonitor[]>([]);
  const [loadTests, setLoadTests] = useState<LoadTestResult[]>([]);
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const refreshIntervalRef = useRef<NodeJS.Timeout>();

  // Load performance data
  const loadPerformanceData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [rumRes, apmRes, vitalsRes, monitorsRes, testsRes, reportRes] = await Promise.all([
        fetch('/api/performance/rum'),
        fetch('/api/performance/apm'),
        fetch('/api/performance/web-vitals'),
        fetch('/api/performance/synthetic'),
        fetch('/api/performance/load-tests'),
        fetch('/api/performance/reports/latest')
      ]);

      if (rumRes.ok) setRumData(await rumRes.json());
      if (apmRes.ok) setApmData(await apmRes.json());
      if (vitalsRes.ok) {
        const vitals = await vitalsRes.json();
        setWebVitals(vitals);
        
        // Detect issues based on vitals
        const detectedIssues = detectPerformanceIssues([], vitals, []);
        setIssues(detectedIssues);
        
        // Generate recommendations
        const recs = generateRecommendations(vitals, [], 500000);
        setRecommendations(recs);
      }
      if (monitorsRes.ok) setMonitors(await monitorsRes.json());
      if (testsRes.ok) setLoadTests(await testsRes.json());
      if (reportRes.ok) setReport(await reportRes.json());
    } catch (error) {
      console.error('Failed to load performance data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh
  useEffect(() => {
    loadPerformanceData();

    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(loadPerformanceData, refreshInterval);
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, loadPerformanceData]);

  // Calculate summary metrics
  const calculateSummaryMetrics = () => {
    const lcpValues = webVitals.filter(v => v.name === 'LCP').map(v => v.value);
    const fidValues = webVitals.filter(v => v.name === 'FID').map(v => v.value);
    const clsValues = webVitals.filter(v => v.name === 'CLS').map(v => v.value);
    const ttfbValues = webVitals.filter(v => v.name === 'TTFB').map(v => v.value);

    const apdexScore = calculateApdex(lcpValues, 2500); // 2.5s threshold
    const performanceScore = Math.round(apdexScore * 100);
    const grade = getPerformanceGrade(performanceScore);

    return {
      score: performanceScore,
      grade,
      apdex: apdexScore,
      issues: issues.length,
      criticalIssues: issues.filter(i => i.severity === 'critical').length,
      recommendations: recommendations.length
    };
  };

  const summaryMetrics = calculateSummaryMetrics();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Activity className="h-8 w-8" />
              Performance Monitoring
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor application performance, track Web Vitals, and optimize user experience
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                autoRefresh
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>
            <button
              onClick={loadPerformanceData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Now
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Performance Score</span>
            <Gauge className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{summaryMetrics.score}</div>
          <div className={`text-sm ${
            summaryMetrics.grade === 'A' ? 'text-green-600' :
            summaryMetrics.grade === 'B' ? 'text-blue-600' :
            summaryMetrics.grade === 'C' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            Grade: {summaryMetrics.grade}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Apdex Score</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{summaryMetrics.apdex.toFixed(2)}</div>
          <div className="text-sm text-gray-500">User satisfaction</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Issues</span>
            <AlertTriangle className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{summaryMetrics.issues}</div>
          <div className="text-sm text-red-600">
            {summaryMetrics.criticalIssues} critical
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Recommendations</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{summaryMetrics.recommendations}</div>
          <div className="text-sm text-gray-500">Improvements</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Page Views</span>
            <Eye className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{rumData.length}</div>
          <div className="text-sm text-gray-500">Last 24h</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Load Time</span>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">
            {webVitals.length > 0
              ? formatDuration(
                  webVitals
                    .filter(v => v.name === 'LCP')
                    .reduce((sum, v, _, arr) => sum + v.value / arr.length, 0)
                )
              : '0ms'}
          </div>
          <div className="text-sm text-gray-500">LCP</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              
              {/* Critical Issues */}
              {issues.filter(i => i.severity === 'critical').length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Critical Issues Detected
                  </h3>
                  <div className="space-y-2">
                    {issues
                      .filter(i => i.severity === 'critical')
                      .map((issue) => (
                        <div key={issue.id} className="text-sm">
                          <div className="font-medium text-red-700">{issue.description}</div>
                          <div className="text-red-600">{issue.impact}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Web Vitals Summary */}
              <div>
                <h3 className="font-semibold mb-3">Web Vitals Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['LCP', 'FID', 'CLS'].map((vital) => {
                    const values = webVitals.filter(v => v.name === vital as any);
                    const summary = calculateMetricSummary(values.map(v => v.value));
                    
                    return (
                      <div key={vital} className="bg-gray-50 rounded-lg p-4">
                        <div className="font-medium mb-2">{vital}</div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>P50:</span>
                            <span className="font-mono">{formatDuration(summary.p50)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>P75:</span>
                            <span className="font-mono">{formatDuration(summary.p75)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>P95:</span>
                            <span className="font-mono">{formatDuration(summary.p95)}</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">Good: {summary.good.toFixed(1)}%</span>
                            <span className="text-yellow-600">Needs Work: {summary.needsImprovement.toFixed(1)}%</span>
                            <span className="text-red-600">Poor: {summary.poor.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Top Recommendations</h3>
                  <div className="space-y-3">
                    {recommendations.slice(0, 3).map((rec) => (
                      <div key={rec.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-900">{rec.title}</h4>
                            <p className="text-sm text-blue-700 mt-1">{rec.description}</p>
                            <p className="text-sm text-blue-600 mt-2">
                              Expected improvement: {formatMetricValue(
                                rec.estimatedImprovement.value,
                                rec.estimatedImprovement.unit
                              )}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {rec.priority} priority
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Real User Monitoring Tab */}
          {activeTab === 'rum' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Real User Monitoring</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Distribution */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Device Distribution</h3>
                  <div className="space-y-2">
                    {['desktop', 'mobile', 'tablet'].map((device) => {
                      const count = rumData.filter(r => r.device.type === device).length;
                      const percentage = rumData.length > 0 ? (count / rumData.length) * 100 : 0;
                      
                      return (
                        <div key={device} className="flex items-center gap-3">
                          <span className="capitalize w-20 text-sm">{device}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6">
                            <div
                              className="bg-blue-600 h-6 rounded-full flex items-center justify-end px-2"
                              style={{ width: `${percentage}%` }}
                            >
                              <span className="text-xs text-white">{percentage.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Browser Distribution */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Browser Distribution</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(rumData.map(r => r.device.browser)))
                      .slice(0, 5)
                      .map((browser) => {
                        const count = rumData.filter(r => r.device.browser === browser).length;
                        const percentage = rumData.length > 0 ? (count / rumData.length) * 100 : 0;
                        
                        return (
                          <div key={browser} className="flex items-center gap-3">
                            <span className="w-20 text-sm truncate">{browser}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-6">
                              <div
                                className="bg-green-600 h-6 rounded-full flex items-center justify-end px-2"
                                style={{ width: `${percentage}%` }}
                              >
                                <span className="text-xs text-white">{percentage.toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Recent Sessions */}
              <div>
                <h3 className="font-medium mb-3">Recent Sessions</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Errors
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rumData.slice(0, 5).map((session) => (
                        <tr key={session.sessionId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                            {session.sessionId.slice(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {session.userId || 'Anonymous'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {session.device.type} / {session.device.browser}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {session.endTime
                              ? formatDuration(
                                  new Date(session.endTime).getTime() -
                                    new Date(session.startTime).getTime()
                                )
                              : 'Active'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              session.errors.length === 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {session.errors.length}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Web Vitals Tab */}
          {activeTab === 'webvitals' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Core Web Vitals</h2>
              
              {/* Vitals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['FCP', 'LCP', 'FID', 'CLS', 'TTFB', 'INP'].map((vitalName) => {
                  const vitalData = webVitals.filter(v => v.name === vitalName as any);
                  const goodCount = vitalData.filter(v => v.rating === 'good').length;
                  const needsImprovementCount = vitalData.filter(v => v.rating === 'needs-improvement').length;
                  const poorCount = vitalData.filter(v => v.rating === 'poor').length;
                  const total = vitalData.length;
                  
                  return (
                    <div key={vitalName} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{vitalName}</h3>
                        <Gauge className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      {total > 0 ? (
                        <>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Good: {((goodCount / total) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm">Needs Improvement: {((needsImprovementCount / total) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-sm">Poor: {((poorCount / total) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                          
                          <div className="flex h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-green-500"
                              style={{ width: `${(goodCount / total) * 100}%` }}
                            ></div>
                            <div
                              className="bg-yellow-500"
                              style={{ width: `${(needsImprovementCount / total) * 100}%` }}
                            ></div>
                            <div
                              className="bg-red-500"
                              style={{ width: `${(poorCount / total) * 100}%` }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-500 text-sm">No data available</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Recommendations based on Web Vitals */}
              {recommendations.filter(r => r.category === 'images' || r.category === 'scripts').length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Optimization Opportunities</h3>
                  <div className="space-y-3">
                    {recommendations
                      .filter(r => r.category === 'images' || r.category === 'scripts')
                      .map((rec) => (
                        <div key={rec.id} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">{rec.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{rec.impact}</p>
                          <div className="space-y-1">
                            {rec.implementation.slice(0, 3).map((step, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-gray-400">•</span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Tracking Tab */}
          {activeTab === 'errors' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Error Tracking</h2>
              
              {/* Error Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Errors</span>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    {rumData.reduce((sum, r) => sum + r.errors.length, 0)}
                  </div>
                  <div className="text-xs text-gray-500">Last 24 hours</div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    {rumData.length > 0
                      ? (
                          (rumData.filter(r => r.errors.length > 0).length / rumData.length) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </div>
                  <div className="text-xs text-gray-500">Sessions with errors</div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Affected Users</span>
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    {new Set(rumData.filter(r => r.errors.length > 0).map(r => r.userId || r.sessionId)).size}
                  </div>
                  <div className="text-xs text-gray-500">Unique users</div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Critical</span>
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {rumData.reduce(
                      (sum, r) => sum + r.errors.filter(e => e.level === 'fatal').length,
                      0
                    )}
                  </div>
                  <div className="text-xs text-gray-500">Fatal errors</div>
                </div>
              </div>

              {/* Recent Errors */}
              <div>
                <h3 className="font-semibold mb-3">Recent Errors</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Error
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Seen
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rumData
                        .flatMap(r => r.errors)
                        .slice(0, 10)
                        .map((error, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm">
                              <div className="max-w-xs truncate" title={error.message}>
                                {error.message}
                              </div>
                              {error.filename && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {error.filename}:{error.lineno}:{error.colno}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {error.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {error.count || 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Date(error.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                error.level === 'fatal'
                                  ? 'bg-red-100 text-red-700'
                                  : error.level === 'error'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {error.level}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Performance Recommendations</h2>
              
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-white border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                        <p className="text-gray-600 mt-1">{rec.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          rec.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : rec.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {rec.priority} priority
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          rec.effort === 'high'
                            ? 'bg-purple-100 text-purple-700'
                            : rec.effort === 'medium'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {rec.effort} effort
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="font-medium text-sm mb-1">Expected Impact</div>
                      <p className="text-sm text-gray-600">{rec.impact}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {formatMetricValue(
                            rec.estimatedImprovement.value,
                            rec.estimatedImprovement.unit
                          )}{' '}
                          improvement in {rec.estimatedImprovement.metric}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-sm mb-2">Implementation Steps</div>
                      <ol className="space-y-1 text-sm text-gray-600">
                        {rec.implementation.map((step, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-gray-400">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
              
              {recommendations.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Great Performance!</h3>
                  <p className="text-gray-600 mt-2">
                    No major performance issues detected. Keep up the good work!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}