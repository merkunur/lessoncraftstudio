'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  BarChart,
  FileText,
  Globe,
  Database,
  Shield,
  Zap,
  RefreshCw,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TestResult {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'failed' | 'skipped' | 'running';
  duration: number;
  error?: string;
  timestamp: string;
}

interface TestSuite {
  name: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage?: number;
}

interface TestMetrics {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  testCoverage: number;
  avgDuration: number;
  lastRun: string;
}

export default function TestingDashboardPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [metrics, setMetrics] = useState<TestMetrics | null>(null);
  const [activeTab, setActiveTab] = useState<'unit' | 'e2e' | 'performance' | 'security'>('unit');

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    // Simulate fetching test results
    const mockResults: TestResult[] = [
      {
        id: '1',
        name: 'should generate static HTML with all SEO metadata',
        suite: 'Blog API Routes',
        status: 'passed',
        duration: 125,
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        name: 'should validate PDF file type',
        suite: 'Blog Upload',
        status: 'passed',
        duration: 87,
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        name: 'should include all required meta tags',
        suite: 'SEO Validation',
        status: 'passed',
        duration: 45,
        timestamp: new Date().toISOString()
      },
      {
        id: '4',
        name: 'should load quickly (under 3 seconds)',
        suite: 'Performance',
        status: 'failed',
        duration: 3200,
        error: 'Page load time exceeded threshold: 3.2s > 3s',
        timestamp: new Date().toISOString()
      },
      {
        id: '5',
        name: 'should switch languages dynamically',
        suite: 'Multi-language',
        status: 'passed',
        duration: 234,
        timestamp: new Date().toISOString()
      }
    ];

    const mockSuites: TestSuite[] = [
      {
        name: 'Blog API Routes',
        totalTests: 15,
        passed: 14,
        failed: 1,
        skipped: 0,
        duration: 1250,
        coverage: 92
      },
      {
        name: 'SEO Validation',
        totalTests: 8,
        passed: 8,
        failed: 0,
        skipped: 0,
        duration: 450,
        coverage: 100
      },
      {
        name: 'Performance',
        totalTests: 5,
        passed: 3,
        failed: 2,
        skipped: 0,
        duration: 5400,
        coverage: 75
      },
      {
        name: 'Multi-language',
        totalTests: 11,
        passed: 10,
        failed: 0,
        skipped: 1,
        duration: 890,
        coverage: 88
      }
    ];

    const mockMetrics: TestMetrics = {
      totalTests: 39,
      passedTests: 35,
      failedTests: 3,
      skippedTests: 1,
      testCoverage: 89.5,
      avgDuration: 185,
      lastRun: new Date().toISOString()
    };

    setTestResults(mockResults);
    setTestSuites(mockSuites);
    setMetrics(mockMetrics);
  };

  const runTests = async (type: string) => {
    setIsRunning(true);
    toast.success(`Running ${type} tests...`);

    // Simulate test execution
    setTimeout(() => {
      setIsRunning(false);
      toast.success(`${type} tests completed!`);
      fetchTestResults();
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'skipped':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'skipped':
        return 'text-yellow-600 bg-yellow-50';
      case 'running':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredResults = testResults.filter(result => {
    const matchesSuite = selectedSuite === 'all' || result.suite === selectedSuite;
    const matchesSearch = searchQuery === '' ||
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.suite.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSuite && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href="/admin"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Testing & QA Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Run and monitor all test suites for LessonCraftStudio
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => runTests('all')}
                disabled={isRunning}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run All Tests
                  </>
                )}
              </button>
              <button
                onClick={fetchTestResults}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Tests</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalTests}</p>
                </div>
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.passedTests}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{metrics.failedTests}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Skipped</p>
                  <p className="text-2xl font-bold text-yellow-600">{metrics.skippedTests}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Coverage</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.testCoverage}%</p>
                </div>
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Duration</p>
                  <p className="text-2xl font-bold text-purple-600">{metrics.avgDuration}ms</p>
                </div>
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Test Type Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b">
            <nav className="flex -mb-px">
              {[
                { id: 'unit', name: 'Unit Tests', icon: FileText },
                { id: 'e2e', name: 'E2E Tests', icon: Globe },
                { id: 'performance', name: 'Performance Tests', icon: Zap },
                { id: 'security', name: 'Security Tests', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === 'unit' && 'Unit Test Results'}
                {activeTab === 'e2e' && 'End-to-End Test Results'}
                {activeTab === 'performance' && 'Performance Test Results'}
                {activeTab === 'security' && 'Security Test Results'}
              </h2>

              <div className="flex items-center space-x-4">
                {!isRunning && (
                  <button
                    onClick={() => runTests(activeTab)}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Run {activeTab.toUpperCase()} Tests
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => toast.success('Generating coverage report...')}
                className="flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
              >
                <BarChart className="h-4 w-4 mr-2" />
                Coverage Report
              </button>
              <button
                onClick={() => toast.success('Downloading test results...')}
                className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </button>
              <button
                onClick={() => toast.success('Running failed tests...')}
                className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Failed
              </button>
              <button
                onClick={() => toast.success('Clearing test cache...')}
                className="flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Database className="h-4 w-4 mr-2" />
                Clear Cache
              </button>
            </div>
          </div>
        </div>

        {/* Test Suites */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suite List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Test Suites</h3>
              </div>
              <div className="p-4">
                <button
                  onClick={() => setSelectedSuite('all')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors mb-2 ${
                    selectedSuite === 'all'
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Suites</span>
                    <span className="text-sm text-gray-500">{testSuites.length}</span>
                  </div>
                </button>

                {testSuites.map((suite) => (
                  <button
                    key={suite.name}
                    onClick={() => setSelectedSuite(suite.name)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors mb-2 ${
                      selectedSuite === suite.name
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{suite.name}</span>
                      <span className="text-xs text-gray-500">{suite.totalTests} tests</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-green-600">{suite.passed} passed</span>
                      {suite.failed > 0 && (
                        <span className="text-red-600">{suite.failed} failed</span>
                      )}
                      {suite.skipped > 0 && (
                        <span className="text-yellow-600">{suite.skipped} skipped</span>
                      )}
                    </div>
                    {suite.coverage && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Coverage</span>
                          <span>{suite.coverage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              suite.coverage >= 80 ? 'bg-green-500' :
                              suite.coverage >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${suite.coverage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {filteredResults.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No test results found
                  </div>
                ) : (
                  filteredResults.map((result) => (
                    <div key={result.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            {getStatusIcon(result.status)}
                            <span className="ml-2 font-medium text-gray-900">
                              {result.name}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span>{result.suite}</span>
                            <span>{result.duration}ms</span>
                            <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                          </div>
                          {result.error && (
                            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
                              {result.error}
                            </div>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            result.status
                          )}`}
                        >
                          {result.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {filteredResults.length > 0 && (
                <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
                  Showing {filteredResults.length} of {testResults.length} test results
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}