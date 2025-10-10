'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Eye,
  FileText,
  Filter,
  Folder,
  GitBranch,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  MoreVertical,
  PauseCircle,
  Play,
  RefreshCw,
  RotateCw,
  Search,
  Settings,
  Shield,
  SkipForward,
  Square,
  Target,
  Terminal,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap
} from 'lucide-react';
import {
  TestCase,
  TestSuite,
  TestRun,
  TestRunResults,
  Coverage,
  PerformanceMetrics,
  BenchmarkResult,
  VisualTest,
  AccessibilityResult,
  SecurityResult,
  TestStatus,
  TestType
} from '@/types/testing';
import {
  TestRunner,
  calculateCoverage,
  benchmark,
  formatTestResults,
  TestDataGenerator
} from '@/lib/testing-utils';

export default function TestingDashboard() {
  const [activeTab, setActiveTab] = useState<'tests' | 'coverage' | 'performance' | 'visual' | 'security' | 'reports'>('tests');
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [selectedRun, setSelectedRun] = useState<TestRun | null>(null);
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentResults, setCurrentResults] = useState<TestRunResults | null>(null);
  const [filters, setFilters] = useState<{
    type?: TestType;
    status?: TestStatus;
    search?: string;
  }>({});
  const [benchmarks, setBenchmarks] = useState<BenchmarkResult[]>([]);
  const [visualTests, setVisualTests] = useState<VisualTest[]>([]);
  const [accessibilityResults, setAccessibilityResults] = useState<AccessibilityResult[]>([]);
  const [securityResults, setSecurityResults] = useState<SecurityResult[]>([]);

  useEffect(() => {
    loadTestData();
  }, []);

  const loadTestData = async () => {
    // Mock data - replace with API calls
    setTestSuites([
      {
        id: '1',
        name: 'API Tests',
        description: 'Backend API endpoint tests',
        file: '/tests/api.test.ts',
        tests: [
          {
            id: 'test_1',
            name: 'GET /api/users',
            type: 'integration',
            category: 'api',
            suite: 'API Tests',
            priority: 'high',
            status: 'passed',
            duration: 125,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'test_2',
            name: 'POST /api/users',
            type: 'integration',
            category: 'api',
            suite: 'API Tests',
            priority: 'high',
            status: 'failed',
            duration: 89,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        status: 'failed'
      },
      {
        id: '2',
        name: 'UI Components',
        description: 'Frontend component tests',
        file: '/tests/components.test.tsx',
        tests: [
          {
            id: 'test_3',
            name: 'Button renders correctly',
            type: 'unit',
            category: 'ui',
            suite: 'UI Components',
            priority: 'medium',
            status: 'passed',
            duration: 23,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        status: 'passed'
      }
    ]);

    setTestRuns([
      {
        id: 'run_1',
        name: 'CI Build #234',
        suites: [],
        status: 'completed',
        config: {
          parallel: true,
          maxWorkers: 4
        },
        results: {
          total: 156,
          passed: 142,
          failed: 8,
          skipped: 6,
          pending: 0,
          error: 0,
          passRate: 91.03,
          duration: 45678,
          suites: []
        },
        startTime: new Date(Date.now() - 3600000).toISOString(),
        endTime: new Date(Date.now() - 3000000).toISOString(),
        duration: 600000
      }
    ]);

    setBenchmarks([
      {
        iterations: 1000,
        elapsed: 1234,
        mean: 1.234,
        median: 1.1,
        standardDeviation: 0.3,
        min: 0.8,
        max: 2.1,
        percentiles: {
          p50: 1.1,
          p75: 1.4,
          p90: 1.7,
          p95: 1.9,
          p99: 2.0
        },
        throughput: 810,
        timestamp: new Date().toISOString()
      }
    ]);

    setVisualTests([
      {
        id: 'visual_1',
        name: 'Homepage Screenshot',
        baseline: '/screenshots/baseline/homepage.png',
        current: '/screenshots/current/homepage.png',
        threshold: 0.1,
        status: 'passed',
        difference: 0.02
      }
    ]);
  };

  const runTests = async () => {
    setIsRunning(true);
    const runner = new TestRunner();
    
    // Mock test execution
    setTimeout(async () => {
      const results = await runner.run();
      setCurrentResults(results);
      setIsRunning(false);
    }, 2000);
  };

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />;
      case 'skipped':
        return <SkipForward className="h-4 w-4 text-gray-400" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTypeIcon = (type: TestType) => {
    switch (type) {
      case 'unit':
        return <Code className="h-4 w-4" />;
      case 'integration':
        return <Layers className="h-4 w-4" />;
      case 'e2e':
        return <Globe className="h-4 w-4" />;
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'visual':
        return <Eye className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Test Runner</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Automated testing and quality assurance
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Run Tests Button */}
                <button
                  onClick={runTests}
                  disabled={isRunning}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run All Tests
                    </>
                  )}
                </button>

                {/* Settings */}
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 border-b">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'tests', label: 'Tests', icon: Terminal },
                  { id: 'coverage', label: 'Coverage', icon: Target },
                  { id: 'performance', label: 'Performance', icon: Zap },
                  { id: 'visual', label: 'Visual', icon: Eye },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'reports', label: 'Reports', icon: FileText }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tests..."
                      className="pl-10 pr-4 py-2 w-full border rounded-lg"
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </div>
                </div>
                <select
                  className="px-3 py-2 border rounded-lg"
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as TestType })}
                >
                  <option value="">All Types</option>
                  <option value="unit">Unit</option>
                  <option value="integration">Integration</option>
                  <option value="e2e">E2E</option>
                  <option value="performance">Performance</option>
                </select>
                <select
                  className="px-3 py-2 border rounded-lg"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as TestStatus })}
                >
                  <option value="">All Status</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                  <option value="skipped">Skipped</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Test Suites */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Suite List */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Test Suites</h3>
                </div>
                <div className="divide-y">
                  {testSuites.map((suite) => (
                    <button
                      key={suite.id}
                      onClick={() => setSelectedSuite(suite)}
                      className={`w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between ${
                        selectedSuite?.id === suite.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <Folder className="h-4 w-4 mr-2 text-gray-400" />
                        <div>
                          <p className="font-medium">{suite.name}</p>
                          <p className="text-xs text-gray-500">
                            {suite.tests.length} tests
                          </p>
                        </div>
                      </div>
                      {getStatusIcon(suite.status)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Cases */}
              {selectedSuite && (
                <div className="lg:col-span-2 bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">{selectedSuite.name}</h3>
                    <p className="text-sm text-gray-500">{selectedSuite.description}</p>
                  </div>
                  <div className="divide-y">
                    {selectedSuite.tests.map((test) => (
                      <div key={test.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            {getStatusIcon(test.status)}
                            <div className="ml-3">
                              <p className="font-medium">{test.name}</p>
                              <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  {getTypeIcon(test.type)}
                                  <span className="ml-1">{test.type}</span>
                                </span>
                                <span>{test.duration}ms</span>
                                <span className={`px-2 py-0.5 rounded-full ${
                                  test.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                  test.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                  test.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {test.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Test Runs */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Recent Test Runs</h3>
              </div>
              <div className="divide-y">
                {testRuns.map((run) => (
                  <div key={run.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{run.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(run.startTime!).toLocaleString()}
                        </p>
                      </div>
                      {run.results && (
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold">
                              {run.results.passRate.toFixed(1)}%
                            </p>
                            <p className="text-xs text-gray-500">
                              {run.results.passed}/{run.results.total} passed
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm">{run.results.passed}</span>
                            </div>
                            <div className="flex items-center">
                              <X className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-sm">{run.results.failed}</span>
                            </div>
                            <div className="flex items-center">
                              <SkipForward className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm">{run.results.skipped}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Coverage Tab */}
        {activeTab === 'coverage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {[
                { label: 'Statements', value: 87.5, color: 'bg-green-500' },
                { label: 'Branches', value: 75.2, color: 'bg-blue-500' },
                { label: 'Functions', value: 92.1, color: 'bg-purple-500' },
                { label: 'Lines', value: 88.9, color: 'bg-orange-500' }
              ].map((metric) => (
                <div key={metric.label} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
                  <p className="text-3xl font-bold mt-2">{metric.value}%</p>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 ${metric.color} rounded-full`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold">File Coverage</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">File</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Statements</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Branches</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Functions</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Lines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">src/components/Button.tsx</td>
                      <td className="px-4 py-2 text-sm">95.2%</td>
                      <td className="px-4 py-2 text-sm">88.9%</td>
                      <td className="px-4 py-2 text-sm">100%</td>
                      <td className="px-4 py-2 text-sm">94.7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Performance Benchmarks</h3>
              <div className="space-y-4">
                {benchmarks.map((benchmark, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Mean</p>
                        <p className="font-semibold">{benchmark.mean.toFixed(3)}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Median</p>
                        <p className="font-semibold">{benchmark.median.toFixed(3)}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">P95</p>
                        <p className="font-semibold">{benchmark.percentiles.p95.toFixed(3)}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Throughput</p>
                        <p className="font-semibold">{benchmark.throughput.toFixed(0)} ops/s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Visual Tab */}
        {activeTab === 'visual' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Visual Regression Tests</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {visualTests.map((test) => (
                  <div key={test.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <div className="flex items-center justify-center">
                        <Eye className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{test.name}</p>
                        {getStatusIcon(test.status as TestStatus)}
                      </div>
                      <p className="text-sm text-gray-500">
                        Difference: {test.difference?.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Security Scan Results</h3>
              </div>
              <div className="divide-y">
                {securityResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No security issues found</p>
                  </div>
                ) : (
                  securityResults.map((result, idx) => (
                    <div key={idx} className="p-4">
                      <div className="flex items-start">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 mr-3 ${
                          result.severity === 'critical' ? 'text-red-500' :
                          result.severity === 'high' ? 'text-orange-500' :
                          result.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium">{result.vulnerability}</p>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              result.severity === 'critical' ? 'bg-red-100 text-red-700' :
                              result.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                              result.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {result.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            <strong>Impact:</strong> {result.impact}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Remediation:</strong> {result.remediation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Test Reports</h2>
              <p className="text-gray-500 mt-2">Generate and view test reports</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}