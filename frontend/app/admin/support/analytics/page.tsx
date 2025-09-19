'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Users,
  MessageSquare,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import Chart from '@/components/admin/chart';
import toast from 'react-hot-toast';

interface TicketAnalytics {
  overview: {
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    satisfaction: number;
    slaCompliance: number;
    firstContactResolution: number;
  };
  trends: {
    daily: Array<{
      date: string;
      created: number;
      resolved: number;
      responseTime: number;
    }>;
    weekly: Array<{
      week: string;
      created: number;
      resolved: number;
      backlog: number;
    }>;
    monthly: Array<{
      month: string;
      tickets: number;
      satisfaction: number;
      slaCompliance: number;
    }>;
  };
  categories: Array<{
    category: string;
    count: number;
    avgResolutionTime: number;
  }>;
  agents: Array<{
    id: string;
    name: string;
    tickets: number;
    resolved: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    satisfaction: number;
  }>;
  sla: {
    priority: Array<{
      level: string;
      target: number;
      actual: number;
      compliance: number;
    }>;
    breaches: Array<{
      ticketId: string;
      subject: string;
      priority: string;
      breachTime: number;
      assignee: string;
    }>;
  };
  tags: Array<{
    tag: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export default function SupportAnalyticsPage() {
  const [analytics, setAnalytics] = useState<TicketAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('tickets');
  const [selectedAgent, setSelectedAgent] = useState('all');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Mock data - replace with API call
      const mockAnalytics: TicketAnalytics = {
        overview: {
          totalTickets: 1234,
          openTickets: 45,
          resolvedTickets: 1189,
          avgResponseTime: 25,
          avgResolutionTime: 180,
          satisfaction: 4.6,
          slaCompliance: 94,
          firstContactResolution: 68
        },
        trends: {
          daily: [
            { date: '11/20', created: 45, resolved: 42, responseTime: 22 },
            { date: '11/21', created: 38, resolved: 40, responseTime: 25 },
            { date: '11/22', created: 52, resolved: 48, responseTime: 20 },
            { date: '11/23', created: 41, resolved: 44, responseTime: 28 },
            { date: '11/24', created: 35, resolved: 35, responseTime: 24 },
            { date: '11/25', created: 48, resolved: 45, responseTime: 23 },
            { date: '11/26', created: 43, resolved: 41, responseTime: 26 }
          ],
          weekly: [
            { week: 'Week 1', created: 245, resolved: 238, backlog: 45 },
            { week: 'Week 2', created: 289, resolved: 275, backlog: 59 },
            { week: 'Week 3', created: 312, resolved: 320, backlog: 51 },
            { week: 'Week 4', created: 298, resolved: 295, backlog: 54 }
          ],
          monthly: [
            { month: 'Sep', tickets: 980, satisfaction: 4.5, slaCompliance: 92 },
            { month: 'Oct', tickets: 1120, satisfaction: 4.6, slaCompliance: 93 },
            { month: 'Nov', tickets: 1234, satisfaction: 4.6, slaCompliance: 94 }
          ]
        },
        categories: [
          { category: 'Technical Issues', count: 456, avgResolutionTime: 120 },
          { category: 'Billing', count: 234, avgResolutionTime: 90 },
          { category: 'Feature Requests', count: 189, avgResolutionTime: 240 },
          { category: 'Account', count: 156, avgResolutionTime: 60 },
          { category: 'Other', count: 199, avgResolutionTime: 150 }
        ],
        agents: [
          {
            id: '1',
            name: 'Sarah Johnson',
            tickets: 456,
            resolved: 423,
            avgResponseTime: 15,
            avgResolutionTime: 120,
            satisfaction: 4.8
          },
          {
            id: '2',
            name: 'Mike Wilson',
            tickets: 389,
            resolved: 356,
            avgResponseTime: 20,
            avgResolutionTime: 150,
            satisfaction: 4.6
          },
          {
            id: '3',
            name: 'Emily Chen',
            tickets: 312,
            resolved: 289,
            avgResponseTime: 25,
            avgResolutionTime: 180,
            satisfaction: 4.5
          },
          {
            id: '4',
            name: 'David Lee',
            tickets: 77,
            resolved: 71,
            avgResponseTime: 30,
            avgResolutionTime: 200,
            satisfaction: 4.4
          }
        ],
        sla: {
          priority: [
            { level: 'Urgent', target: 30, actual: 28, compliance: 95 },
            { level: 'High', target: 60, actual: 55, compliance: 93 },
            { level: 'Medium', target: 240, actual: 220, compliance: 92 },
            { level: 'Low', target: 480, actual: 450, compliance: 96 }
          ],
          breaches: [
            {
              ticketId: 'TKT-1023',
              subject: 'Critical system error',
              priority: 'urgent',
              breachTime: 15,
              assignee: 'Mike Wilson'
            },
            {
              ticketId: 'TKT-1045',
              subject: 'Payment processing issue',
              priority: 'high',
              breachTime: 30,
              assignee: 'Emily Chen'
            }
          ]
        },
        tags: [
          { tag: 'bug', count: 234, trend: 'down' },
          { tag: 'feature-request', count: 189, trend: 'up' },
          { tag: 'billing', count: 156, trend: 'stable' },
          { tag: 'urgent', count: 45, trend: 'down' },
          { tag: 'new-user', count: 123, trend: 'up' }
        ]
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <p className="text-gray-600">Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-7 w-7" />
              Support Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor support performance and SLA compliance
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Tickets</p>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.totalTickets}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Response Time</p>
            <Clock className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.avgResponseTime}m</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              -5m
            </span>
            <span className="text-xs text-gray-500">improvement</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">SLA Compliance</p>
            <Target className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.slaCompliance}%</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2%
            </span>
            <span className="text-xs text-gray-500">vs target 90%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Satisfaction</p>
            <CheckCircle className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.satisfaction}/5</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600 flex items-center">
              Stable
            </span>
            <span className="text-xs text-gray-500">last 30 days</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Ticket Volume Trend */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Volume Trend</h2>
          <Chart
            type="multi-line"
            data={analytics.trends.daily}
            dataKeys={['created', 'resolved']}
            xAxisKey="date"
            colors={['#3b82f6', '#10b981']}
            height={250}
          />
          <div className="flex gap-4 mt-4 text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Created
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Resolved
            </span>
          </div>
        </div>

        {/* Response Time Trend */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Time Trend</h2>
          <Chart
            type="area"
            data={analytics.trends.daily}
            dataKey="responseTime"
            xAxisKey="date"
            color="#f59e0b"
            height={250}
            formatter={(value: number) => `${value}m`}
          />
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average: {analytics.overview.avgResponseTime}m</span>
              <span className="text-gray-600">Target: 30m</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${Math.min((30 / analytics.overview.avgResponseTime) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* SLA Performance */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SLA Performance by Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {analytics.sla.priority.map((priority) => (
            <div key={priority.level} className="text-center">
              <div className="relative mb-2">
                <svg className="w-24 h-24 mx-auto">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={priority.compliance >= 95 ? '#10b981' : priority.compliance >= 90 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(priority.compliance / 100) * 251.3} 251.3`}
                    transform="rotate(-90 48 48)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{priority.compliance}%</span>
                </div>
              </div>
              <p className="font-medium text-gray-900">{priority.level}</p>
              <p className="text-sm text-gray-600">Target: {priority.target}m</p>
              <p className="text-sm text-gray-600">Actual: {priority.actual}m</p>
            </div>
          ))}
        </div>

        {/* SLA Breaches */}
        {analytics.sla.breaches.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recent SLA Breaches</h3>
            <div className="space-y-2">
              {analytics.sla.breaches.map((breach) => (
                <div key={breach.ticketId} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <div>
                      <span className="font-medium text-gray-900">{breach.ticketId}</span>
                      <span className="mx-2 text-gray-500">-</span>
                      <span className="text-gray-600">{breach.subject}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-red-600">+{breach.breachTime}m</span>
                    <span className="text-gray-600">{breach.assignee}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      breach.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      breach.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {breach.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Categories Distribution */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets by Category</h2>
          <Chart
            type="pie"
            data={analytics.categories}
            dataKey="count"
            nameKey="category"
            height={250}
          />
        </div>

        {/* Agent Performance */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance</h2>
          <div className="space-y-3">
            {analytics.agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{agent.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{agent.tickets} tickets</span>
                    <span>{agent.resolved} resolved</span>
                    <span>{agent.avgResponseTime}m avg response</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= Math.floor(agent.satisfaction)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{agent.satisfaction}/5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Contact Resolution */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-900 mb-3">First Contact Resolution</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.overview.firstContactResolution}%
              </p>
              <p className="text-sm text-gray-600 mt-1">Of tickets resolved on first contact</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        {/* Avg Resolution Time */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Avg Resolution Time</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {Math.floor(analytics.overview.avgResolutionTime / 60)}h {analytics.overview.avgResolutionTime % 60}m
              </p>
              <p className="text-sm text-gray-600 mt-1">Average time to resolve</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        {/* Ticket Backlog */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Current Backlog</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.overview.openTickets}
              </p>
              <p className="text-sm text-gray-600 mt-1">Tickets awaiting resolution</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}