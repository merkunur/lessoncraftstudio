'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
// import AdminLayout from '@/components/admin/admin-layout';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  FileText,
  Download,
  Eye,
  Clock,
  Calendar,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Filter,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import dynamicImport from 'next/dynamic';

// Dynamic import for chart components to avoid SSR issues
// const Chart = dynamicImport(() => import('@/components/admin/chart'), { ssr: false });

interface AnalyticsOverview {
  revenue: {
    total: number;
    mrr: number;
    growth: number;
    chart: Array<{ date: string; amount: number }>;
  };
  users: {
    total: number;
    active: number;
    new: number;
    growth: number;
    chart: Array<{ date: string; count: number }>;
  };
  worksheets: {
    total: number;
    today: number;
    growth: number;
    popular: Array<{ name: string; count: number }>;
  };
  traffic: {
    sessions: number;
    pageViews: number;
    avgDuration: number;
    bounceRate: number;
    chart: Array<{ date: string; views: number; sessions: number }>;
  };
  conversions: {
    rate: number;
    trials: number;
    subscriptions: number;
    churn: number;
  };
}

interface TimeRange {
  value: string;
  label: string;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'users' | 'content' | 'traffic'>('overview');
  const [comparison, setComparison] = useState(true);

  const timeRanges: TimeRange[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'mtd', label: 'Month to date' },
    { value: 'ytd', label: 'Year to date' },
  ];

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}&comparison=${comparison}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="h-4 w-4" />;
    if (growth < 0) return <ArrowDown className="h-4 w-4" />;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white overflow-hidden shadow rounded-lg h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track performance metrics and user behavior
              </p>
            </div>
            <div className="flex gap-3">
              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Comparison Toggle */}
              <button
                onClick={() => setComparison(!comparison)}
                className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                  comparison
                    ? 'border-blue-500 text-blue-700 bg-blue-50'
                    : 'border-gray-300 text-gray-700 bg-white'
                } hover:bg-gray-50`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </button>

              {/* Export */}
              <Link
                href="/admin/analytics/reports"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Reports
              </Link>

              {/* Refresh */}
              <button
                onClick={fetchAnalytics}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {(['overview', 'revenue', 'users', 'content', 'traffic'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {/* Revenue Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Monthly Revenue
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatCurrency(analytics.revenue.mrr)}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(analytics.revenue.growth)}`}>
                            {getGrowthIcon(analytics.revenue.growth)}
                            <span className="ml-1">{Math.abs(analytics.revenue.growth)}%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Users Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Users
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatNumber(analytics.users.active)}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(analytics.users.growth)}`}>
                            {getGrowthIcon(analytics.users.growth)}
                            <span className="ml-1">{Math.abs(analytics.users.growth)}%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Worksheets Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Worksheets Created
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatNumber(analytics.worksheets.total)}
                          </div>
                          <div className="ml-2 text-sm text-gray-500">
                            +{analytics.worksheets.today} today
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Rate Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Conversion Rate
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {analytics.conversions.rate.toFixed(1)}%
                          </div>
                          <div className="ml-2 text-sm text-gray-500">
                            {analytics.conversions.subscriptions} new
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
              {/* Revenue Chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
                  <LineChart className="h-5 w-5 text-gray-400" />
                </div>
                {/* Chart component placeholder */}
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization</p>
                </div>
                {/* <Chart
                  type="line"
                  data={analytics.revenue.chart}
                  dataKey="amount"
                  xAxisKey="date"
                  formatter={formatCurrency}
                  color="#10b981"
                /> */}
              </div>

              {/* User Growth Chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>
                {/* Chart component placeholder */}
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization</p>
                </div>
                {/* <Chart
                  type="bar"
                  data={analytics.users.chart}
                  dataKey="count"
                  xAxisKey="date"
                  color="#3b82f6"
                /> */}
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Popular Worksheets */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Worksheets</h3>
                <div className="space-y-3">
                  {analytics.worksheets.popular.slice(0, 5).map((worksheet, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{worksheet.name}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatNumber(worksheet.count)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Overview */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Overview</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Sessions</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatNumber(analytics.traffic.sessions)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Page Views</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatNumber(analytics.traffic.pageViews)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Avg Duration</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatDuration(analytics.traffic.avgDuration)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Bounce Rate</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {analytics.traffic.bounceRate.toFixed(1)}%
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Conversion Funnel */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Visitors</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Sign Ups</span>
                      <span className="font-medium">
                        {((analytics.users.new / analytics.traffic.sessions) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(analytics.users.new / analytics.traffic.sessions) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Trials</span>
                      <span className="font-medium">
                        {((analytics.conversions.trials / analytics.users.new) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(analytics.conversions.trials / analytics.users.new) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Paid</span>
                      <span className="font-medium">{analytics.conversions.rate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${analytics.conversions.rate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && analytics && (
          <div>
            {/* Revenue Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Total Revenue</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatCurrency(analytics.revenue.total)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">MRR</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatCurrency(analytics.revenue.mrr)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">ARR</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatCurrency(analytics.revenue.mrr * 12)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Growth</dt>
                    <dd className={`mt-1 text-2xl font-semibold ${getGrowthColor(analytics.revenue.growth)}`}>
                      {analytics.revenue.growth > 0 ? '+' : ''}{analytics.revenue.growth}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Over Time</h3>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Revenue chart visualization</p>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Plan</h3>
                {/* Chart component placeholder */}
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization</p>
                </div>
                {/* <Chart
                  type="pie"
                  data={[
                    { name: 'Core ($9.99)', value: 45 },
                    { name: 'Full ($19.99)', value: 55 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                /> */}
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Churn & Growth</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">New MRR</dt>
                    <dd className="mt-1 text-xl font-semibold text-green-600">
                      +{formatCurrency(analytics.revenue.mrr * 0.15)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Churned MRR</dt>
                    <dd className="mt-1 text-xl font-semibold text-red-600">
                      -{formatCurrency(analytics.revenue.mrr * 0.03)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Net Growth</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">
                      +{formatCurrency(analytics.revenue.mrr * 0.12)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Churn Rate</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">
                      {analytics.conversions.churn.toFixed(1)}%
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && analytics && (
          <div>
            {/* User Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Total Users</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.users.total)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Active Users</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.users.active)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">New Users</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.users.new)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Growth Rate</dt>
                    <dd className={`mt-1 text-2xl font-semibold ${getGrowthColor(analytics.users.growth)}`}>
                      {analytics.users.growth > 0 ? '+' : ''}{analytics.users.growth}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
              {/* Chart component placeholder */}
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart visualization</p>
              </div>
              {/* <Chart
                type="line"
                data={analytics.users.chart}
                dataKey="count"
                xAxisKey="date"
                color="#3b82f6"
                height={400}
              /> */}
            </div>

            {/* User Segments */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Segments</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Free Users</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Core Plan</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Full Plan</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Daily Active</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatNumber(Math.floor(analytics.users.active * 0.3))}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Weekly Active</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatNumber(Math.floor(analytics.users.active * 0.6))}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Monthly Active</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatNumber(analytics.users.active)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Retention Rate</dt>
                    <dd className="text-sm font-medium text-gray-900">85%</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Lifecycle</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Avg Time to Convert</dt>
                    <dd className="text-sm font-medium text-gray-900">7 days</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Avg Customer Lifetime</dt>
                    <dd className="text-sm font-medium text-gray-900">18 months</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Lifetime Value</dt>
                    <dd className="text-sm font-medium text-gray-900">$240</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">CAC</dt>
                    <dd className="text-sm font-medium text-gray-900">$35</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && analytics && (
          <div>
            {/* Worksheet Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Total Created</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.worksheets.total)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Today</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analytics.worksheets.today}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(Math.floor(analytics.worksheets.total * 1.5))}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Unique Generators</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">52</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Popular Worksheets Chart */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Most Popular Worksheets</h3>
              {/* Chart component placeholder */}
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart visualization</p>
              </div>
              {/* <Chart
                type="bar"
                data={analytics.worksheets.popular}
                dataKey="count"
                xAxisKey="name"
                color="#8b5cf6"
                height={300}
                horizontal
              /> */}
            </div>

            {/* Content Performance */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">By Category</h3>
                {/* Chart component placeholder */}
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization</p>
                </div>
                {/* <Chart
                  type="pie"
                  data={[
                    { name: 'Math', value: 35 },
                    { name: 'Language', value: 25 },
                    { name: 'Science', value: 20 },
                    { name: 'Art', value: 15 },
                    { name: 'Other', value: 5 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                /> */}
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Patterns</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Avg per User</dt>
                    <dd className="text-sm font-medium text-gray-900">12.5 worksheets</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Peak Hour</dt>
                    <dd className="text-sm font-medium text-gray-900">3:00 PM - 4:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Peak Day</dt>
                    <dd className="text-sm font-medium text-gray-900">Tuesday</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Completion Rate</dt>
                    <dd className="text-sm font-medium text-gray-900">78%</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {activeTab === 'traffic' && analytics && (
          <div>
            {/* Traffic Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Sessions</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.traffic.sessions)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Page Views</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.traffic.pageViews)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Avg Duration</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {formatDuration(analytics.traffic.avgDuration)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Bounce Rate</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analytics.traffic.bounceRate.toFixed(1)}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Traffic Chart */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Over Time</h3>
              {/* Chart component placeholder */}
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart visualization</p>
              </div>
              {/* <Chart
                type="multi-line"
                data={analytics.traffic.chart}
                dataKeys={['views', 'sessions']}
                xAxisKey="date"
                colors={['#3b82f6', '#10b981']}
                height={400}
              /> */}
            </div>

            {/* Traffic Sources */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
                {/* Chart component placeholder */}
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization</p>
                </div>
                {/* <Chart
                  type="pie"
                  data={[
                    { name: 'Direct', value: 40 },
                    { name: 'Organic Search', value: 30 },
                    { name: 'Social', value: 15 },
                    { name: 'Referral', value: 10 },
                    { name: 'Email', value: 5 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                /> */}
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">/</span>
                    <span className="font-medium">8,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">/pricing</span>
                    <span className="font-medium">4,567</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">/worksheets</span>
                    <span className="font-medium">3,456</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">/blog</span>
                    <span className="font-medium">2,345</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">/about</span>
                    <span className="font-medium">1,234</span>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Desktop</span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '55%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Mobile</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Tablet</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}