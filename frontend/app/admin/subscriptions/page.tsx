'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  AlertCircle,
  Package,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface SubscriptionStats {
  overview: {
    totalActive: number;
    totalTrialing: number;
    totalCancelled: number;
    totalPaused: number;
    mrr: number;
    arr: number;
    averageRevenue: number;
    churnRate: number;
    growthRate: number;
  };
  byPlan: {
    core: { count: number; mrr: number };
    full: { count: number; mrr: number };
  };
  recent: {
    newSubscriptions: number;
    cancellations: number;
    upgrades: number;
    downgrades: number;
  };
}

interface Subscription {
  id: string;
  userId: string;
  user: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  status: string;
  planName: string;
  amount: number;
  interval: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd: string | null;
  createdAt: string;
}

export default function SubscriptionsPage() {
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    fetchSubscriptions();
    fetchStats();
  }, [statusFilter, planFilter, sortBy, sortOrder, currentPage, dateRange]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/admin/subscriptions/stats?range=${dateRange}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load subscription statistics');
    }
  };

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        status: statusFilter,
        plan: planFilter,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/admin/subscriptions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch subscriptions');

      const data = await response.json();
      setSubscriptions(data.subscriptions);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to cancel subscription');

      toast.success('Subscription cancelled successfully');
      fetchSubscriptions();
      fetchStats();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    }
  };

  const handleReactivateSubscription = async (subscriptionId: string) => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/reactivate`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to reactivate subscription');

      toast.success('Subscription reactivated successfully');
      fetchSubscriptions();
      fetchStats();
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast.error('Failed to reactivate subscription');
    }
  };

  const exportSubscriptions = async () => {
    try {
      const response = await fetch('/api/admin/subscriptions/export');
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Subscriptions exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export subscriptions');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string, cancelAtPeriodEnd: boolean) => {
    if (cancelAtPeriodEnd) {
      return 'bg-yellow-100 text-yellow-800';
    }

    const badges = {
      active: 'bg-green-100 text-green-800',
      trialing: 'bg-blue-100 text-blue-800',
      past_due: 'bg-red-100 text-red-800',
      canceled: 'bg-gray-100 text-gray-800',
      paused: 'bg-orange-100 text-orange-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string, cancelAtPeriodEnd: boolean) => {
    if (cancelAtPeriodEnd) return 'Cancelling';
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage customer subscriptions and billing
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="365d">Last year</option>
              </select>
              <button
                onClick={exportSubscriptions}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <Link
                href="/admin/subscriptions/plans"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Package className="h-4 w-4 mr-2" />
                Manage Plans
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* MRR Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Monthly Recurring Revenue
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {formatCurrency(stats.overview.mrr)}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stats.overview.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stats.overview.growthRate >= 0 ? (
                            <ArrowUp className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <ArrowDown className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="ml-1">{Math.abs(stats.overview.growthRate)}%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Subscriptions */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Subscriptions
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.overview.totalActive}
                        </div>
                        <div className="ml-2 text-sm text-gray-500">
                          +{stats.overview.totalTrialing} trial
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Revenue */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Avg Revenue/User
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(stats.overview.averageRevenue)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Churn Rate */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className={`h-6 w-6 ${
                      stats.overview.churnRate > 5 ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Churn Rate
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stats.overview.churnRate.toFixed(1)}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {stats && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-600">New</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.recent.newSubscriptions}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.recent.cancellations}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Upgrades</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.recent.upgrades}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <ArrowDown className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Downgrades</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.recent.downgrades}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trialing">Trial</option>
                <option value="past_due">Past Due</option>
                <option value="canceled">Cancelled</option>
                <option value="paused">Paused</option>
              </select>

              {/* Plan Filter */}
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Plans</option>
                <option value="core">Core ($9.99)</option>
                <option value="full">Full ($19.99)</option>
              </select>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="amount-desc">Highest Value</option>
                <option value="amount-asc">Lowest Value</option>
                <option value="currentPeriodEnd-asc">Ending Soon</option>
              </select>

              {/* Refresh */}
              <button
                onClick={() => {
                  fetchSubscriptions();
                  fetchStats();
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Bill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Started
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  </td>
                </tr>
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No subscriptions found
                  </td>
                </tr>
              ) : (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.user.firstName || subscription.user.lastName
                            ? `${subscription.user.firstName || ''} ${subscription.user.lastName || ''}`.trim()
                            : 'No name'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subscription.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscription.planName === 'full'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {subscription.planName.charAt(0).toUpperCase() + subscription.planName.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatusBadge(subscription.status, subscription.cancelAtPeriodEnd)
                      }`}>
                        {getStatusLabel(subscription.status, subscription.cancelAtPeriodEnd)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(subscription.amount)}/{subscription.interval}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subscription.status === 'canceled' ? (
                        <span className="text-gray-500">-</span>
                      ) : subscription.trialEnd && new Date(subscription.trialEnd) > new Date() ? (
                        <div>
                          <div className="text-sm">Trial ends</div>
                          <div className="text-xs text-gray-500">
                            {formatDate(subscription.trialEnd)}
                          </div>
                        </div>
                      ) : (
                        formatDate(subscription.currentPeriodEnd)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(subscription.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/subscriptions/${subscription.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                          <button
                            onClick={() => handleCancelSubscription(subscription.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                        {subscription.cancelAtPeriodEnd && (
                          <button
                            onClick={() => handleReactivateSubscription(subscription.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}