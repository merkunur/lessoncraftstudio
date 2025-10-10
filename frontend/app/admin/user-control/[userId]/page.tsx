'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  CreditCard,
  Activity,
  Monitor,
  TrendingUp,
  Ban,
  Gift,
  RefreshCw,
  ExternalLink,
  DollarSign,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

type Tab = 'overview' | 'payments' | 'activity' | 'sessions' | 'support';

interface UserProfile {
  user: any;
  subscription: any;
  subscriptionMetrics: any;
  payments: any[];
  activityLogs: any[];
  sessions: any[];
  supportTickets: any[];
  usageStats: any;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.userId as string;

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketResponse, setTicketResponse] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/user-control/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (action: string, tier?: string) => {
    if (!confirm(`Are you sure you want to ${action}?`)) {
      return;
    }

    try {
      let endpoint = '';
      let body: any = { userId };

      switch (action) {
        case 'upgrade':
          endpoint = '/api/admin/user-control/upgrade';
          body.tier = tier || 'core';
          break;
        case 'suspend':
          endpoint = '/api/admin/user-control/suspend';
          break;
        case 'grant-lifetime':
          endpoint = '/api/admin/user-control/grant-lifetime';
          break;
        case 'cancel':
          endpoint = '/api/admin/user-control/cancel';
          break;
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Action completed successfully');
        fetchUserProfile();
      } else {
        toast.error(data.error || 'Action failed');
      }
    } catch (error) {
      console.error('Quick action error:', error);
      toast.error('Failed to perform action');
    }
  };

  const handleRefund = async (paymentId: string) => {
    const reason = prompt('Enter refund reason (optional):');

    try {
      const response = await fetch('/api/admin/user-control/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, reason }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchUserProfile();
      } else {
        toast.error(data.error || 'Refund failed');
      }
    } catch (error) {
      console.error('Refund error:', error);
      toast.error('Failed to process refund');
    }
  };

  const handleDeleteTicket = async (ticketId: string, ticketSubject: string) => {
    if (!confirm(`Are you sure you want to delete the ticket "${ticketSubject}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/support-tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Ticket deleted successfully');
        fetchUserProfile();
      } else {
        toast.error(data.error || 'Failed to delete ticket');
      }
    } catch (error) {
      console.error('Delete ticket error:', error);
      toast.error('Failed to delete ticket');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTierBadge = (tier: string) => {
    const badges = {
      free: 'bg-gray-100 text-gray-800',
      core: 'bg-blue-100 text-blue-800',
      full: 'bg-purple-100 text-purple-800',
    };
    return badges[tier as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      past_due: 'bg-yellow-100 text-yellow-800',
      succeeded: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
      partially_refunded: 'bg-yellow-100 text-yellow-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </AdminLayout>
    );
  }

  if (!profile) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <Link href="/admin/user-control" className="text-blue-600 hover:text-blue-500">
            Back to User Control
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const { user, subscription, subscriptionMetrics, payments, activityLogs, sessions, supportTickets, usageStats } = profile;

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/user-control"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to User Control
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName || user.lastName
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                    : 'No name'}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email}
                  </span>
                  {user.isSuspended && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Suspended
                    </span>
                  )}
                  {user.emailVerified && (
                    <span title="Email verified">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getTierBadge(user.subscriptionTier)}`}>
                    {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Tier
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2">
              {user.subscriptionTier !== 'full' && (
                <button
                  onClick={() => handleQuickAction('upgrade', 'full')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Upgrade to Full
                </button>
              )}
              <button
                onClick={() => handleQuickAction('grant-lifetime')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Gift className="h-4 w-4 mr-2" />
                Grant Lifetime
              </button>
              {subscription?.status === 'active' && !user.isSuspended && (
                <button
                  onClick={() => handleQuickAction('suspend')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Account
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {formatCurrency(usageStats.totalRevenue)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Payments</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {usageStats.totalPayments}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Monitor className="h-6 w-6 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Sessions</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {usageStats.activeSessions}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Account Age</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {usageStats.accountAge} days
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'overview', label: 'Overview', icon: Shield },
                { id: 'payments', label: 'Payments', icon: CreditCard },
                { id: 'activity', label: 'Activity', icon: Activity },
                { id: 'sessions', label: 'Sessions', icon: Monitor },
                { id: 'support', label: 'Support', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">User ID</dt>
                      <dd className="mt-1 text-sm text-gray-900 font-mono">{user.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.emailVerified ? 'Yes' : 'No'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Joined Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(user.updatedAt)}</dd>
                    </div>
                    {user.stripeCustomerId && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Stripe Customer</dt>
                        <dd className="mt-1">
                          <a
                            href={`https://dashboard.stripe.com/customers/${user.stripeCustomerId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-500 inline-flex items-center"
                          >
                            {user.stripeCustomerId}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {subscription && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Details</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Plan</dt>
                        <dd className="mt-1 text-sm text-gray-900">{subscription.planName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(subscription.status)}`}>
                            {subscription.status}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Billing Interval</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {subscription.billingInterval || 'N/A'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Current Period</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {subscription.currentPeriodStart && formatDate(subscription.currentPeriodStart)} -{' '}
                          {subscription.currentPeriodEnd && formatDate(subscription.currentPeriodEnd)}
                        </dd>
                      </div>
                      {subscriptionMetrics?.daysUntilRenewal !== null && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Days Until Renewal</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {subscriptionMetrics.daysUntilRenewal} days
                          </dd>
                        </div>
                      )}
                      {subscriptionMetrics?.isLifetime && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Access Type</dt>
                          <dd className="mt-1">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              Lifetime Access
                            </span>
                          </dd>
                        </div>
                      )}
                      {subscription.cancelAtPeriodEnd && (
                        <div className="sm:col-span-2">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <div className="flex">
                              <AlertCircle className="h-5 w-5 text-yellow-400" />
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                  Subscription will cancel at period end
                                </h3>
                                <p className="mt-1 text-sm text-yellow-700">
                                  Access will end on {subscription.currentPeriodEnd && formatDate(subscription.currentPeriodEnd)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment History</h3>
                {payments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No payments found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Description
                          </th>
                          <th className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(payment.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(payment.amount)}
                              {payment.refundedAmount > 0 && (
                                <span className="text-xs text-red-600 ml-2">
                                  (-{formatCurrency(payment.refundedAmount)})
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {payment.description || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {payment.status === 'succeeded' && payment.status !== 'refunded' && (
                                <button
                                  onClick={() => handleRefund(payment.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Refund
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Log</h3>
                {activityLogs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No activity found</p>
                ) : (
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{log.action}</p>
                            <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                          </div>
                          <span className="text-xs text-gray-400">{formatDate(log.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                {sessions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No active sessions</p>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <Monitor className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {session.deviceName || 'Unknown Device'}
                              </p>
                              {session.city && session.country && (
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {session.city}, {session.country}
                                </p>
                              )}
                              <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                Last active: {formatDate(session.lastActivityAt)}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            session.deviceType === 'mobile' ? 'bg-blue-100 text-blue-800' :
                            session.deviceType === 'tablet' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {session.deviceType || 'desktop'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Support Tab */}
            {activeTab === 'support' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Support Tickets</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {supportTickets.length} total tickets
                    </span>
                  </div>
                </div>

                {supportTickets.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No support tickets</p>
                ) : (
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-sm font-semibold text-gray-900">
                                {ticket.subject}
                              </h4>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                                ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                ticket.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                                ticket.status === 'resolved' ? 'bg-gray-100 text-gray-800' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {ticket.status}
                              </span>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {ticket.priority}
                              </span>
                              {ticket.category && (
                                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                  {ticket.category}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{ticket.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(ticket.createdAt)}
                              </span>
                              {ticket.respondedAt && (
                                <span className="flex items-center text-green-600">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Responded {formatDate(ticket.respondedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {ticket.response && (
                          <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3">
                            <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                            <p className="text-sm text-blue-800">{ticket.response}</p>
                          </div>
                        )}

                        {selectedTicket === ticket.id ? (
                          <div className="mt-4 space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Update Status
                              </label>
                              <select
                                value={ticketStatus}
                                onChange={(e) => setTicketStatus(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              >
                                <option value="">Select Status</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="waiting">Waiting</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Response
                              </label>
                              <textarea
                                value={ticketResponse}
                                onChange={(e) => setTicketResponse(e.target.value)}
                                rows={4}
                                placeholder="Type your response..."
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`/api/admin/support-tickets/${ticket.id}`, {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                                      },
                                      body: JSON.stringify({
                                        status: ticketStatus || ticket.status,
                                        response: ticketResponse || undefined,
                                      }),
                                    });

                                    if (response.ok) {
                                      toast.success('Ticket updated successfully');
                                      setSelectedTicket(null);
                                      setTicketResponse('');
                                      setTicketStatus('');
                                      fetchUserProfile();
                                    } else {
                                      const data = await response.json();
                                      toast.error(data.error || 'Failed to update ticket');
                                    }
                                  } catch (error) {
                                    console.error('Update ticket error:', error);
                                    toast.error('Failed to update ticket');
                                  }
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send Response
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedTicket(null);
                                  setTicketResponse('');
                                  setTicketStatus('');
                                }}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteTicket(ticket.id, ticket.subject)}
                                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedTicket(ticket.id);
                                setTicketResponse(ticket.response || '');
                                setTicketStatus(ticket.status);
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Respond to Ticket
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(ticket.id, ticket.subject)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-white hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
