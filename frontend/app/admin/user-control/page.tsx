'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import {
  Search,
  Filter,
  RefreshCw,
  User,
  Mail,
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Ban,
  Gift,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface UserData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  subscriptionTier: 'free' | 'core' | 'full';
  subscriptionStatus: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
  subscription?: {
    planName: string;
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
  _count?: {
    payments: number;
  };
}

interface SearchFilters {
  query: string;
  tier: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function UserControlPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tier: 'all',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const stats = {
    total: totalUsers,
    free: users.filter(u => u.subscriptionTier === 'free').length,
    core: users.filter(u => u.subscriptionTier === 'core').length,
    full: users.filter(u => u.subscriptionTier === 'full').length,
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        query: filters.query,
        tier: filters.tier,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/admin/user-control/search?${params}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.pagination.totalPages);
      setTotalUsers(data.pagination.total);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handleQuickAction = async (action: string, userId: string, tier?: string) => {
    setActionMenuOpen(null);

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

      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Action completed successfully');
        fetchUsers();
      } else {
        toast.error(data.error || 'Action failed');
      }
    } catch (error) {
      console.error('Quick action error:', error);
      toast.error('Failed to perform action');
    }
  };

  const exportUsers = async () => {
    try {
      const params = new URLSearchParams({
        tier: filters.tier,
        status: filters.status,
      });

      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {};

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/admin/user-control/export?${params}`, { headers });
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Users exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export users');
    }
  };

  const getTierBadge = (tier: string) => {
    const badges = {
      free: 'bg-gray-100 text-gray-800',
      core: 'bg-blue-100 text-blue-800',
      full: 'bg-purple-100 text-purple-800',
    };
    return badges[tier as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return 'bg-gray-100 text-gray-600';

    const badges: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      past_due: 'bg-yellow-100 text-yellow-800',
      incomplete: 'bg-orange-100 text-orange-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Control Center</h1>
              <p className="mt-1 text-sm text-gray-500">
                Search, manage, and monitor all user subscriptions
              </p>
            </div>
            <button
              onClick={exportUsers}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-800">C</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Core Bundle</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.core}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-800">F</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Full Access</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.full}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">0</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Free Tier</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.free}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-4">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Input */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                    placeholder="Search by email, name, or user ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
                <button
                  type="button"
                  onClick={fetchUsers}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={filters.tier}
                  onChange={(e) => setFilters({ ...filters, tier: e.target.value })}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Tiers</option>
                  <option value="free">Free</option>
                  <option value="core">Core Bundle</option>
                  <option value="full">Full Access</option>
                </select>

                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="canceled">Canceled</option>
                  <option value="past_due">Past Due</option>
                </select>

                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setFilters({ ...filters, sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
                  }}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="email-asc">Email A-Z</option>
                  <option value="email-desc">Email Z-A</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName || user.lastName
                              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                              : 'No name'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierBadge(user.subscriptionTier)}`}>
                        {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user.subscription?.status || null)}`}>
                        {user.subscription?.status || 'None'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.subscription ? (
                        <div>
                          <div className="font-medium">{user.subscription.planName}</div>
                          {user.subscription.currentPeriodEnd && (
                            <div className="text-xs text-gray-500">
                              Renews {formatDate(user.subscription.currentPeriodEnd)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">No subscription</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/user-control/${user.id}`}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>

                        <div className="relative">
                          <button
                            onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>

                          {actionMenuOpen === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <div className="py-1">
                                {user.subscriptionTier !== 'full' && (
                                  <button
                                    onClick={() => handleQuickAction('upgrade', user.id, 'full')}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                                    Upgrade to Full
                                  </button>
                                )}
                                {user.subscriptionTier !== 'core' && user.subscriptionTier !== 'full' && (
                                  <button
                                    onClick={() => handleQuickAction('upgrade', user.id, 'core')}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                                    Upgrade to Core
                                  </button>
                                )}
                                <button
                                  onClick={() => handleQuickAction('grant-lifetime', user.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Gift className="h-4 w-4 mr-2 text-purple-600" />
                                  Grant Lifetime
                                </button>
                                {user.subscription?.status === 'active' && (
                                  <button
                                    onClick={() => handleQuickAction('cancel', user.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Ban className="h-4 w-4 mr-2 text-red-600" />
                                    Cancel Subscription
                                  </button>
                                )}
                                <button
                                  onClick={() => handleQuickAction('suspend', user.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Zap className="h-4 w-4 mr-2 text-orange-600" />
                                  Suspend Account
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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
                  Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * 20, totalUsers)}</span> of{' '}
                  <span className="font-medium">{totalUsers}</span> users
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
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    {currentPage} / {totalPages}
                  </span>
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
