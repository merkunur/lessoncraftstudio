'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface BillingOverview {
  period: {
    days: number;
    startDate: string;
    endDate: string;
  };
  revenue: {
    mrr: number;
    mrrGrowth: number;
    mrrByTier: {
      FREE: number;
      CORE: number;
      FULL: number;
    };
    arr: number;
    arpu: number;
    totalRevenue: number;
  };
  subscriptions: {
    active: number;
    new: number;
    churnRate: number;
    retentionRate: number;
    voluntaryChurn: number;
    involuntaryChurn: number;
  };
  payments: {
    totalRevenue: number;
    successful: number;
    failed: number;
    successRate: number;
    refundedAmount: number;
    refundRate: number;
    averageTransactionValue: number;
  };
  ltv: {
    average: number;
    byTier: {
      FREE: number;
      CORE: number;
      FULL: number;
    };
    averageLifetimeMonths: number;
  };
}

export default function AdminBillingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [overview, setOverview] = useState<BillingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'7' | '30' | '90'>('30');

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.isAdmin) {
      fetchOverview();
    }
  }, [user, period]);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/billing/overview?period=${period}`);
      const data = await response.json();

      if (data.success) {
        setOverview(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch billing overview');
      }
    } catch (err) {
      setError('Failed to fetch billing overview');
      console.error('Error fetching billing overview:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const downloadExport = async (type: string) => {
    try {
      const response = await fetch(`/api/admin/billing/export?format=csv&type=${type}&period=${period}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `billing-${type}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading export:', err);
      alert('Failed to download export');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!overview) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Billing Dashboard</h1>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod('7')}
                className={`px-4 py-2 rounded-lg ${
                  period === '7'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Last 7 days
              </button>
              <button
                onClick={() => setPeriod('30')}
                className={`px-4 py-2 rounded-lg ${
                  period === '30'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Last 30 days
              </button>
              <button
                onClick={() => setPeriod('90')}
                className={`px-4 py-2 rounded-lg ${
                  period === '90'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Last 90 days
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => downloadExport('subscriptions')}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Export Subscriptions
              </button>
              <button
                onClick={() => downloadExport('payments')}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Export Payments
              </button>
              <button
                onClick={() => downloadExport('analytics')}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Export Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.revenue.mrr)}</div>
              <div
                className={`text-sm mt-2 ${
                  overview.revenue.mrrGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {overview.revenue.mrrGrowth >= 0 ? '↑' : '↓'} {formatPercent(Math.abs(overview.revenue.mrrGrowth))} vs last month
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Annual Recurring Revenue</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.revenue.arr)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Average Revenue Per User</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.revenue.arpu)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Total Revenue (Period)</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.revenue.totalRevenue)}</div>
            </div>
          </div>

          {/* MRR by Tier */}
          <div className="mt-4 bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-semibold text-gray-700 mb-3">MRR by Tier</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-600">CORE</div>
                <div className="text-xl font-bold text-blue-600">{formatCurrency(overview.revenue.mrrByTier.CORE)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">FULL</div>
                <div className="text-xl font-bold text-purple-600">{formatCurrency(overview.revenue.mrrByTier.FULL)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Total Paid</div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(overview.revenue.mrrByTier.CORE + overview.revenue.mrrByTier.FULL)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Active Subscriptions</div>
              <div className="text-3xl font-bold text-gray-900">{overview.subscriptions.active}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">New Subscriptions</div>
              <div className="text-3xl font-bold text-green-600">{overview.subscriptions.new}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Churn Rate</div>
              <div className="text-3xl font-bold text-red-600">{formatPercent(overview.subscriptions.churnRate)}</div>
              <div className="text-xs text-gray-500 mt-2">
                Voluntary: {overview.subscriptions.voluntaryChurn} | Involuntary: {overview.subscriptions.involuntaryChurn}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Retention Rate</div>
              <div className="text-3xl font-bold text-green-600">{formatPercent(overview.subscriptions.retentionRate)}</div>
            </div>
          </div>
        </div>

        {/* Payment Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Success Rate</div>
              <div className="text-3xl font-bold text-green-600">{formatPercent(overview.payments.successRate)}</div>
              <div className="text-xs text-gray-500 mt-2">
                {overview.payments.successful} successful / {overview.payments.failed} failed
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Refund Rate</div>
              <div className="text-3xl font-bold text-orange-600">{formatPercent(overview.payments.refundRate)}</div>
              <div className="text-xs text-gray-500 mt-2">
                {formatCurrency(overview.payments.refundedAmount)} refunded
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Avg Transaction Value</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.payments.averageTransactionValue)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Total Payments</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.payments.totalRevenue)}</div>
            </div>
          </div>
        </div>

        {/* LTV Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Lifetime Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Average LTV</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(overview.ltv.average)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">LTV - CORE</div>
              <div className="text-3xl font-bold text-blue-600">{formatCurrency(overview.ltv.byTier.CORE)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">LTV - FULL</div>
              <div className="text-3xl font-bold text-purple-600">{formatCurrency(overview.ltv.byTier.FULL)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">Avg Lifetime</div>
              <div className="text-3xl font-bold text-gray-900">{overview.ltv.averageLifetimeMonths.toFixed(1)}</div>
              <div className="text-xs text-gray-500 mt-2">months</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/admin/users')}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Manage Users</div>
              <div className="text-sm text-gray-600 mt-1">View and manage user accounts</div>
            </button>
            <button
              onClick={() => downloadExport('failures')}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Payment Failures</div>
              <div className="text-sm text-gray-600 mt-1">Review failed payments and dunning</div>
            </button>
            <button
              onClick={() => window.open('https://dashboard.stripe.com', '_blank')}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Stripe Dashboard</div>
              <div className="text-sm text-gray-600 mt-1">Open Stripe for detailed reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
