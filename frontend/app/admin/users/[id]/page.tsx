'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  CreditCard,
  Calendar,
  Activity,
  Edit2,
  Save,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  Clock,
  Trash2,
  RefreshCw,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface UserDetail {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  subscriptionTier: string;
  emailVerified: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  avatarUrl: string | null;
  subscription: {
    status: string;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
  } | null;
  stats: {
    totalWorksheets: number;
    totalDownloads: number;
    totalPayments: number;
    totalRevenue: number;
    lastWorksheetDate: string | null;
    favoriteGenerators: string[];
  };
  usage: {
    currentMonth: {
      downloads: number;
      limit: number;
      generators: string[];
      generatorLimit: number;
    };
  };
  recentActivity: Array<{
    id: string;
    action: string;
    createdAt: string;
    details: any;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subscriptionTier: '',
    isAdmin: false,
    emailVerified: false,
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'payments' | 'usage'>('overview');

  useEffect(() => {
    fetchUserDetail();
  }, [userId]);

  const fetchUserDetail = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('User not found');
          router.push('/admin/users');
          return;
        }
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data);
      setEditForm({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email,
        subscriptionTier: data.subscriptionTier,
        isAdmin: data.isAdmin,
        emailVerified: data.emailVerified,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      toast.success('User deleted successfully');
      router.push('/admin/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to send reset email');

      toast.success('Password reset email sent');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to send reset email');
    }
  };

  const handleImpersonate = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/impersonate`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to impersonate user');

      const { token } = await response.json();
      // In production, handle impersonation token properly
      toast.success('Impersonation started');
      window.open('/dashboard', '_blank');
    } catch (error) {
      console.error('Error impersonating user:', error);
      toast.error('Failed to impersonate user');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">User not found</h3>
          <Link href="/admin/users" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            Back to users
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/users"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to users
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName || user.lastName
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                    : 'No name'}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {!editing ? (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={handleImpersonate}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Impersonate
                  </button>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditForm({
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        email: user.email,
                        subscriptionTier: user.subscriptionTier,
                        isAdmin: user.isAdmin,
                        emailVerified: user.emailVerified,
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex gap-4 mb-6">
          {user.emailVerified ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Email Verified
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <XCircle className="h-3 w-3 mr-1" />
              Email Unverified
            </span>
          )}

          {user.isAdmin && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </span>
          )}

          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            user.subscriptionTier === 'full'
              ? 'bg-purple-100 text-purple-800'
              : user.subscriptionTier === 'core'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            <CreditCard className="h-3 w-3 mr-1" />
            {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan
          </span>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {(['overview', 'activity', 'payments', 'usage'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">First Name</dt>
                  <dd className="mt-1">
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.firstName || 'Not set'}</span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                  <dd className="mt-1">
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.lastName || 'Not set'}</span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1">
                    {editing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.email}</span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Subscription Tier</dt>
                  <dd className="mt-1">
                    {editing ? (
                      <select
                        value={editForm.subscriptionTier}
                        onChange={(e) => setEditForm({ ...editForm, subscriptionTier: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      >
                        <option value="free">Free</option>
                        <option value="core">Core</option>
                        <option value="full">Full</option>
                      </select>
                    ) : (
                      <span className="text-sm text-gray-900">
                        {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
                      </span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Admin Access</dt>
                  <dd className="mt-1">
                    {editing ? (
                      <input
                        type="checkbox"
                        checked={editForm.isAdmin}
                        onChange={(e) => setEditForm({ ...editForm, isAdmin: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.isAdmin ? 'Yes' : 'No'}</span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                  <dd className="mt-1">
                    {editing ? (
                      <input
                        type="checkbox"
                        checked={editForm.emailVerified}
                        onChange={(e) => setEditForm({ ...editForm, emailVerified: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.emailVerified ? 'Yes' : 'No'}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Account Details */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">User ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-mono">{user.id}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(user.updatedAt)}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(user.lastLoginAt)}</dd>
                </div>

                <div className="pt-3 border-t">
                  <button
                    onClick={handleResetPassword}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Send className="h-4 w-4 inline mr-1" />
                    Send Password Reset Email
                  </button>
                </div>
              </dl>
            </div>

            {/* Statistics */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Worksheets</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {user.stats.totalWorksheets}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Downloads</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {user.stats.totalDownloads}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Payments</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {user.stats.totalPayments}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Revenue</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(user.stats.totalRevenue)}
                  </dd>
                </div>
              </dl>

              {user.stats.favoriteGenerators.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Favorite Generators</dt>
                  <dd className="flex flex-wrap gap-2">
                    {user.stats.favoriteGenerators.map((generator) => (
                      <span
                        key={generator}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {generator}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </div>

            {/* Subscription Details */}
            {user.subscription && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.subscription.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : user.subscription.status === 'trialing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.subscription.status}
                      </span>
                    </dd>
                  </div>

                  {user.subscription.currentPeriodEnd && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Current Period Ends</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(user.subscription.currentPeriodEnd)}
                      </dd>
                    </div>
                  )}

                  {user.subscription.cancelAtPeriodEnd && (
                    <div className="pt-3">
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <AlertCircle className="h-5 w-5 text-yellow-400" />
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Subscription will cancel at period end
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

        {activeTab === 'activity' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {user.recentActivity.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  No activity recorded
                </div>
              ) : (
                user.recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action.replace(/_/g, ' ').charAt(0).toUpperCase() +
                             activity.action.replace(/_/g, ' ').slice(1)}
                          </p>
                          {activity.details && (
                            <p className="text-xs text-gray-500">
                              {JSON.stringify(activity.details)}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(activity.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.payments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No payments recorded
                      </td>
                    </tr>
                  ) : (
                    user.payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(payment.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            payment.status === 'succeeded'
                              ? 'bg-green-100 text-green-800'
                              : payment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {payment.id}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Month Usage</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                  <dd className="mt-1">
                    <div className="flex items-center">
                      <span className="text-2xl font-semibold text-gray-900">
                        {user.usage.currentMonth.downloads}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        / {user.usage.currentMonth.limit === -1 ? 'Unlimited' : user.usage.currentMonth.limit}
                      </span>
                    </div>
                    {user.usage.currentMonth.limit !== -1 && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (user.usage.currentMonth.downloads / user.usage.currentMonth.limit) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Generators Used</dt>
                  <dd className="mt-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-semibold text-gray-900">
                        {user.usage.currentMonth.generators.length}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        / {user.usage.currentMonth.generatorLimit === -1 ? 'All' : user.usage.currentMonth.generatorLimit}
                      </span>
                    </div>
                    {user.usage.currentMonth.generators.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {user.usage.currentMonth.generators.map((generator) => (
                          <span
                            key={generator}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {generator}
                          </span>
                        ))}
                      </div>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Trends</h3>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Worksheet Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.stats.lastWorksheetDate
                      ? formatDate(user.stats.lastWorksheetDate)
                      : 'Never'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Average Worksheets/Month</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Math.round(user.stats.totalWorksheets /
                      Math.max(1, Math.ceil(
                        (new Date().getTime() - new Date(user.createdAt).getTime()) /
                        (30 * 24 * 60 * 60 * 1000)
                      ))
                    )}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}