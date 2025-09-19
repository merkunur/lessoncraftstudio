'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  TrendingUp,
  Eye,
  MousePointer,
  UserX,
  AlertTriangle,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import Chart from '@/components/admin/chart';
import toast from 'react-hot-toast';

interface EmailAnalytics {
  overview: {
    totalSent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    complaints: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    unsubscribeRate: number;
  };
  timeline: Array<{
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  }>;
  topPerforming: Array<{
    id: string;
    name: string;
    subject: string;
    sent: number;
    openRate: number;
    clickRate: number;
    score: number;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
    other: number;
  };
  clientStats: Array<{
    client: string;
    count: number;
    percentage: number;
  }>;
  domainStats: Array<{
    domain: string;
    sent: number;
    delivered: number;
    bounced: number;
    engagementRate: number;
  }>;
  campaignStats: Array<{
    id: string;
    name: string;
    type: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    status: 'completed' | 'sending' | 'scheduled';
    sentAt: string;
  }>;
}

export default function EmailAnalyticsPage() {
  const [analytics, setAnalytics] = useState<EmailAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('sent');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Mock data - replace with API call
      const mockAnalytics: EmailAnalytics = {
        overview: {
          totalSent: 45678,
          delivered: 44532,
          opened: 31234,
          clicked: 8956,
          bounced: 1146,
          unsubscribed: 234,
          complaints: 12,
          deliveryRate: 97.5,
          openRate: 70.1,
          clickRate: 20.1,
          bounceRate: 2.5,
          unsubscribeRate: 0.5
        },
        timeline: [
          { date: '11/20', sent: 1523, delivered: 1485, opened: 1045, clicked: 298 },
          { date: '11/21', sent: 1456, delivered: 1420, opened: 998, clicked: 285 },
          { date: '11/22', sent: 1678, delivered: 1635, opened: 1150, clicked: 328 },
          { date: '11/23', sent: 1234, delivered: 1203, opened: 846, clicked: 241 },
          { date: '11/24', sent: 1345, delivered: 1311, opened: 922, clicked: 263 },
          { date: '11/25', sent: 1789, delivered: 1743, opened: 1226, clicked: 349 },
          { date: '11/26', sent: 1567, delivered: 1528, opened: 1075, clicked: 306 },
          { date: '11/27', sent: 1890, delivered: 1842, opened: 1296, clicked: 369 },
          { date: '11/28', sent: 1456, delivered: 1419, opened: 999, clicked: 284 }
        ],
        topPerforming: [
          {
            id: '1',
            name: 'Welcome Series 1',
            subject: 'Welcome to LessonCraftStudio!',
            sent: 5234,
            openRate: 82.3,
            clickRate: 45.6,
            score: 95
          },
          {
            id: '2',
            name: 'Feature Update',
            subject: 'New Worksheet Templates Available',
            sent: 8956,
            openRate: 75.4,
            clickRate: 28.9,
            score: 88
          },
          {
            id: '3',
            name: 'Monthly Newsletter',
            subject: 'November Updates & Tips',
            sent: 12456,
            openRate: 68.2,
            clickRate: 15.3,
            score: 76
          },
          {
            id: '4',
            name: 'Re-engagement Campaign',
            subject: 'We miss you! Here\'s 20% off',
            sent: 3456,
            openRate: 45.6,
            clickRate: 22.1,
            score: 65
          }
        ],
        deviceStats: {
          desktop: 45,
          mobile: 42,
          tablet: 10,
          other: 3
        },
        clientStats: [
          { client: 'Gmail', count: 18234, percentage: 40.9 },
          { client: 'Apple Mail', count: 9876, percentage: 22.2 },
          { client: 'Outlook', count: 7654, percentage: 17.2 },
          { client: 'Yahoo Mail', count: 4567, percentage: 10.3 },
          { client: 'Other', count: 4201, percentage: 9.4 }
        ],
        domainStats: [
          { domain: 'gmail.com', sent: 18234, delivered: 17856, bounced: 378, engagementRate: 72.3 },
          { domain: 'yahoo.com', sent: 4567, delivered: 4423, bounced: 144, engagementRate: 65.8 },
          { domain: 'outlook.com', sent: 7654, delivered: 7523, bounced: 131, engagementRate: 68.9 },
          { domain: 'icloud.com', sent: 3456, delivered: 3401, bounced: 55, engagementRate: 78.2 },
          { domain: 'hotmail.com', sent: 2345, delivered: 2289, bounced: 56, engagementRate: 61.4 }
        ],
        campaignStats: [
          {
            id: '1',
            name: 'Black Friday Sale',
            type: 'promotional',
            sent: 15678,
            delivered: 15234,
            opened: 11234,
            clicked: 3456,
            status: 'completed',
            sentAt: '2024-11-24T09:00:00Z'
          },
          {
            id: '2',
            name: 'Welcome Series',
            type: 'transactional',
            sent: 456,
            delivered: 445,
            opened: 389,
            clicked: 178,
            status: 'sending',
            sentAt: '2024-11-28T14:00:00Z'
          },
          {
            id: '3',
            name: 'December Newsletter',
            type: 'newsletter',
            sent: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
            status: 'scheduled',
            sentAt: '2024-12-01T10:00:00Z'
          }
        ]
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalytics();
  };

  const getMetricData = () => {
    if (!analytics) return [];
    
    switch (selectedMetric) {
      case 'sent':
        return analytics.timeline.map(t => ({ ...t, value: t.sent }));
      case 'delivered':
        return analytics.timeline.map(t => ({ ...t, value: t.delivered }));
      case 'opened':
        return analytics.timeline.map(t => ({ ...t, value: t.opened }));
      case 'clicked':
        return analytics.timeline.map(t => ({ ...t, value: t.clicked }));
      default:
        return [];
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
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No analytics data available</p>
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
              Email Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Track email performance and engagement metrics
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
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Sent</p>
            <Mail className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.totalSent.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{analytics.overview.deliveryRate}% delivered</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Opened</p>
            <Eye className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.opened.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{analytics.overview.openRate}% rate</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Clicked</p>
            <MousePointer className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.clicked.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{analytics.overview.clickRate}% rate</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Bounced</p>
            <XCircle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.bounced.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{analytics.overview.bounceRate}% rate</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Unsubscribed</p>
            <UserX className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.unsubscribed}</p>
          <p className="text-xs text-gray-500 mt-1">{analytics.overview.unsubscribeRate}% rate</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Complaints</p>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.overview.complaints}</p>
          <p className="text-xs text-gray-500 mt-1">Spam reports</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Timeline */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance Timeline</h2>
            <div className="flex gap-2">
              {['sent', 'delivered', 'opened', 'clicked'].map(metric => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 text-sm rounded-lg capitalize ${
                    selectedMetric === metric
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>
          <Chart
            type="area"
            data={getMetricData()}
            dataKey="value"
            xAxisKey="date"
            color="#3b82f6"
            height={250}
          />
        </div>

        {/* Device Distribution */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Distribution</h2>
          <Chart
            type="pie"
            data={[
              { name: 'Desktop', value: analytics.deviceStats.desktop },
              { name: 'Mobile', value: analytics.deviceStats.mobile },
              { name: 'Tablet', value: analytics.deviceStats.tablet },
              { name: 'Other', value: analytics.deviceStats.other }
            ]}
            dataKey="value"
            nameKey="name"
            height={250}
          />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{analytics.deviceStats.desktop}%</p>
              <p className="text-sm text-gray-600">Desktop</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{analytics.deviceStats.mobile}%</p>
              <p className="text-sm text-gray-600">Mobile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Emails */}
      <div className="bg-white rounded-lg border mb-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Emails</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Click Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.topPerforming.map(email => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{email.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{email.subject}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {email.sent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{email.openRate}%</span>
                      <div className="ml-3 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${email.openRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{email.clickRate}%</span>
                      <div className="ml-3 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${email.clickRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      email.score >= 90 ? 'bg-green-100 text-green-800' :
                      email.score >= 70 ? 'bg-blue-100 text-blue-800' :
                      email.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {email.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Client Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Email Clients */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Clients</h2>
          <div className="space-y-3">
            {analytics.clientStats.map(client => (
              <div key={client.client} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-900 w-24">{client.client}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${client.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 ml-3">{client.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Performance */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Domain Performance</h2>
          <div className="space-y-3">
            {analytics.domainStats.slice(0, 5).map(domain => (
              <div key={domain.domain} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{domain.domain}</p>
                  <p className="text-xs text-gray-600">
                    {domain.sent.toLocaleString()} sent • {domain.delivered.toLocaleString()} delivered
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{domain.engagementRate}%</p>
                  <p className="text-xs text-gray-600">Engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
        </div>
        <div className="divide-y">
          {analytics.campaignStats.map(campaign => (
            <div key={campaign.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      campaign.status === 'completed' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'sending' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {campaign.status}
                    </span>
                    <span className="text-xs text-gray-500">{campaign.type}</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-6 text-sm">
                    <div>
                      <p className="text-gray-600">Sent</p>
                      <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Delivered</p>
                      <p className="font-semibold">{campaign.delivered.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Opened</p>
                      <p className="font-semibold">
                        {campaign.opened.toLocaleString()}
                        {campaign.sent > 0 && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Clicked</p>
                      <p className="font-semibold">
                        {campaign.clicked.toLocaleString()}
                        {campaign.sent > 0 && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({((campaign.clicked / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {new Date(campaign.sentAt).toLocaleString()}
                  </p>
                </div>
                
                <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}