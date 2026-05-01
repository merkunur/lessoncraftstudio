'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import {
  Search,
  RefreshCw,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash2,
  CheckSquare,
  Square,
  X,
  MoreVertical,
  Eye,
  UserPlus,
  Ban,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// Pass 8: page sourced from /api/admin/users (the surviving user-management endpoint).
// Seller-era purchase UI (per-user purchases display, grant-access modal, revoke-purchase
// action, purchase-status filters) was scrubbed alongside the deletion of
// /api/admin/user-control/{grant-access,revoke-purchase,search}.
interface UserData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  emailVerified: boolean;
  isAdmin: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  paymentCount: number;
}

interface StatsData {
  total: number;
  active: number;
  unverified: number;
}

interface SearchFilters {
  query: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function UserControlPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<StatsData>({ total: 0, active: 0, unverified: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<{ userId: string; email: string } | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [filters, currentPage]);

  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('accessToken');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        search: filters.query,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      const response = await fetch(`/api/admin/users?${params}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data.users);
      setStats({
        total: data.stats?.total ?? 0,
        active: data.stats?.active ?? 0,
        unverified: data.stats?.unverified ?? 0,
      });
      setTotalPages(data.pagination?.totalPages ?? 1);
      setTotalUsers(data.pagination?.totalCount ?? 0);
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

  const handleSuspendUser = async (userId: string) => {
    if (!confirm('Suspend this user account?')) return;
    try {
      const response = await fetch('/api/admin/user-control/suspend', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'User suspended');
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to suspend');
      }
    } catch {
      toast.error('Failed to suspend user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'User deleted');
        setDeleteConfirm(null);
        setConfirmInput('');
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to delete user');
      }
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const handleBulkDelete = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          action: 'delete',
          userIds: Array.from(selectedUsers),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || `${selectedUsers.size} users deleted`);
        setBulkDeleteConfirm(false);
        setConfirmInput('');
        setSelectedUsers(new Set());
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to delete users');
      }
    } catch {
      toast.error('Failed to delete users');
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u.id)));
    }
  };

  const toggleSelectUser = (userId: string) => {
    const next = new Set(selectedUsers);
    if (next.has(userId)) next.delete(userId);
    else next.add(userId);
    setSelectedUsers(next);
  };

  const exportUsers = async () => {
    try {
      const response = await fetch(`/api/admin/user-control/export`, {
        headers: getAuthHeaders(),
      });
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
      toast.success('Users exported');
    } catch {
      toast.error('Failed to export users');
    }
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
                Manage user accounts and access
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/users/new?returnTo=/admin/user-control"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create User
              </Link>
              <button
                onClick={exportUsers}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unverified</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unverified}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="p-4">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                    placeholder="Search by email, name, or user ID..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
                <button
                  type="button"
                  onClick={fetchUsers}
                  className="inline-flex items-center px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="flex gap-4">
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setFilters({ ...filters, sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
                    setCurrentPage(1);
                  }}
                  className="block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
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

        {/* Bulk Actions Bar */}
        {selectedUsers.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {selectedUsers.size} user{selectedUsers.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBulkDeleteConfirm(true)}
                className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedUsers(new Set())}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-gray-600">
                    {selectedUsers.size === users.length && users.length > 0 ? (
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="group">
                    <td className="px-4 py-4 whitespace-nowrap align-top">
                      <button onClick={() => toggleSelectUser(user.id)} className="text-gray-400 hover:text-gray-600">
                        {selectedUsers.has(user.id) ? (
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Square className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName || 'No name'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          {user.emailVerified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600">
                              <CheckCircle className="h-3 w-3" /> Verified
                            </span>
                          )}
                          {user.isAdmin && (
                            <span className="ml-1 inline-flex items-center gap-0.5 text-[10px] font-medium text-purple-700">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <span className="text-sm text-gray-900 capitalize">{user.subscriptionTier}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <span className="text-sm text-gray-700 capitalize">{user.subscriptionStatus}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/user-control/${user.id}`}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <div className="relative">
                          <button
                            onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>

                          {actionMenuOpen === user.id && (
                            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg z-10 border border-gray-200 py-1">
                              <button
                                onClick={() => {
                                  setActionMenuOpen(null);
                                  handleSuspendUser(user.id);
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Ban className="h-4 w-4 mr-3 text-orange-600" />
                                Suspend Account
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button
                                onClick={() => {
                                  setActionMenuOpen(null);
                                  setDeleteConfirm({ userId: user.id, email: user.email });
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-3" />
                                Delete User
                              </button>
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 rounded-xl mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * 20, totalUsers)}</span> of{' '}
                <span className="font-medium">{totalUsers}</span> users
              </p>
              <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This will permanently delete the user account and activity history.
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="font-mono bg-gray-100 px-1 rounded">{deleteConfirm.email}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="Enter user email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => { setDeleteConfirm(null); setConfirmInput(''); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirm.userId)}
                  disabled={confirmInput !== deleteConfirm.email}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Confirmation Modal */}
        {bulkDeleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Delete {selectedUsers.size} Users</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This will permanently delete {selectedUsers.size} user accounts and all their data.
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="font-mono bg-gray-100 px-1 rounded">DELETE {selectedUsers.size} USERS</span> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="Enter confirmation phrase"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => { setBulkDeleteConfirm(false); setConfirmInput(''); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={confirmInput !== `DELETE ${selectedUsers.size} USERS`}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete {selectedUsers.size} Users
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
