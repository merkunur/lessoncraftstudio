'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
// import AdminLayout from '@/components/admin/admin-layout';
import {
  Users,
  CreditCard,
  FileText,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Settings,
  Plus,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  users: {
    total: number;
    new: number;
    active: number;
    growth: number;
  };
  revenue: {
    mrr: number;
    arr: number;
    today: number;
    growth: number;
  };
  subscriptions: {
    active: number;
    trial: number;
    cancelled: number;
    growth: number;
  };
  usage: {
    worksheets: number;
    downloads: number;
    generators: number;
    growth: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, these would be actual API calls
      // For now, using mock data
      setStats({
        users: {
          total: 1234,
          new: 45,
          active: 892,
          growth: 12.5,
        },
        revenue: {
          mrr: 12345,
          arr: 148140,
          today: 567,
          growth: 8.3,
        },
        subscriptions: {
          active: 234,
          trial: 45,
          cancelled: 12,
          growth: 15.2,
        },
        usage: {
          worksheets: 5678,
          downloads: 3456,
          generators: 23,
          growth: 23.7,
        },
      });

      setRecentActivity([
        {
          id: 1,
          type: 'subscription',
          message: 'John Doe upgraded to Full Access',
          time: '2 minutes ago',
          icon: 'upgrade',
        },
        {
          id: 2,
          type: 'user',
          message: 'Sarah Smith signed up',
          time: '15 minutes ago',
          icon: 'new_user',
        },
        {
          id: 3,
          type: 'payment',
          message: 'Payment received from Mike Johnson',
          time: '1 hour ago',
          icon: 'payment',
        },
        {
          id: 4,
          type: 'usage',
          message: '100 worksheets generated today',
          time: '2 hours ago',
          icon: 'milestone',
        },
      ]);

      setTopUsers([
        { id: 1, name: 'Alice Brown', email: 'alice@example.com', worksheets: 234, plan: 'Full' },
        { id: 2, name: 'Bob Wilson', email: 'bob@example.com', worksheets: 189, plan: 'Core' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com', worksheets: 156, plan: 'Full' },
        { id: 4, name: 'David Lee', email: 'david@example.com', worksheets: 134, plan: 'Core' },
        { id: 5, name: 'Emma White', email: 'emma@example.com', worksheets: 98, plan: 'Free' },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      name: 'Total Users',
      value: stats?.users.total || 0,
      change: stats?.users.growth || 0,
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/users',
    },
    {
      name: 'Monthly Revenue',
      value: formatCurrency(stats?.revenue.mrr || 0),
      change: stats?.revenue.growth || 0,
      icon: DollarSign,
      color: 'bg-green-500',
      href: '/admin/analytics/revenue',
    },
    {
      name: 'Active Subscriptions',
      value: stats?.subscriptions.active || 0,
      change: stats?.subscriptions.growth || 0,
      icon: CreditCard,
      color: 'bg-purple-500',
      href: '/admin/subscriptions',
    },
    {
      name: 'Worksheets Today',
      value: stats?.usage.worksheets || 0,
      change: stats?.usage.growth || 0,
      icon: FileText,
      color: 'bg-orange-500',
      href: '/admin/worksheets/usage',
    },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;

            return (
              <Link
                key={stat.name}
                href={stat.href}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${stat.color} rounded-md p-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                          <div
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {isPositive ? (
                              <ArrowUp className="h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ArrowDown className="h-4 w-4 flex-shrink-0" />
                            )}
                            <span className="ml-1">{Math.abs(stat.change)}%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Content Management Section */}
        <div className="mb-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Content Management</h2>
              <Link
                href="/admin/content/blog"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Manage All Content →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link
                href="/admin/content/blog"
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Blog Posts</span>
                <p className="text-xs text-gray-500 mt-1">Manage articles</p>
              </Link>
              <Link
                href="/admin/content/blog/new"
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">New Post</span>
                <p className="text-xs text-gray-500 mt-1">Create article</p>
              </Link>
              <Link
                href="/admin/image-library"
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <Package className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Image Library</span>
                <p className="text-xs text-gray-500 mt-1">Manage images</p>
              </Link>
              <Link
                href="/admin/translations"
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <Globe className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Translations</span>
                <p className="text-xs text-gray-500 mt-1">11 languages</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <Link
                  href="/admin/activity"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {activity.icon === 'upgrade' && (
                        <TrendingUp className="h-6 w-6 text-green-500" />
                      )}
                      {activity.icon === 'new_user' && (
                        <Users className="h-6 w-6 text-blue-500" />
                      )}
                      {activity.icon === 'payment' && (
                        <DollarSign className="h-6 w-6 text-green-500" />
                      )}
                      {activity.icon === 'milestone' && (
                        <CheckCircle className="h-6 w-6 text-purple-500" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Top Users</h2>
                <Link
                  href="/admin/users"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Worksheets
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.worksheets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.plan === 'Full'
                              ? 'bg-purple-100 text-purple-800'
                              : user.plan === 'Core'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.plan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <Link
              href="/admin/content/blog/new"
              className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">New Blog Post</span>
            </Link>
            <Link
              href="/admin/users/new"
              className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Add User</span>
            </Link>
            <Link
              href="/admin/email/campaigns/new"
              className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <Package className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Email Campaign</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <Activity className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">View Analytics</span>
            </Link>
            <Link
              href="/admin/settings"
              className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <Settings className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}