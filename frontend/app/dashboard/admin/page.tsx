'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/client-auth';
import { Shield, Users, TrendingUp, Ban, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminPage() {
  const { user, isLoading, isAdmin } = useAuth();
  const [userId, setUserId] = useState('');
  const [tier, setTier] = useState<'free' | 'core' | 'full'>('core');
  const [cancelReason, setCancelReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleUpgradeUser = async () => {
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/user-control/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, tier }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
        setUserId('');
      } else {
        setResult({ success: false, message: data.error || 'Failed to upgrade user' });
      }
    } catch (error) {
      setResult({ success: false, message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }

    if (!confirm('Are you sure you want to cancel this user\'s subscription?')) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/user-control/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason: cancelReason || 'Admin cancellation' }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
        setUserId('');
        setCancelReason('');
      } else {
        setResult({ success: false, message: data.error || 'Failed to cancel subscription' });
      }
    } catch (error) {
      setResult({ success: false, message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You must be an admin to access this page</p>
          <a href="/dashboard/account" className="text-blue-600 hover:text-blue-500">
            Go to Account
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Shield className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Manage users and subscriptions</p>
        </div>

        {/* Result Message */}
        {result && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start ${
              result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {result.success ? (
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">{result.success ? 'Success!' : 'Error'}</p>
              <p className="text-sm mt-1">{result.message}</p>
            </div>
          </div>
        )}

        {/* Upgrade User */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Upgrade User</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Manually upgrade a user's subscription tier</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="upgrade-user-id" className="block text-sm font-medium text-gray-700 mb-1">
                User ID (CUID)
              </label>
              <input
                id="upgrade-user-id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="clxxx..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-1">
                New Tier
              </label>
              <select
                id="tier"
                value={tier}
                onChange={(e) => setTier(e.target.value as 'free' | 'core' | 'full')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="free">Free</option>
                <option value="core">Core</option>
                <option value="full">Full</option>
              </select>
            </div>

            <button
              onClick={handleUpgradeUser}
              disabled={loading || !userId}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Upgrading...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Upgrade User
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cancel Subscription */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center mb-4">
            <Ban className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Cancel Subscription</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Cancel a user's subscription (will end at period end)</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="cancel-user-id" className="block text-sm font-medium text-gray-700 mb-1">
                User ID (CUID)
              </label>
              <input
                id="cancel-user-id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="clxxx..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason (optional)
              </label>
              <textarea
                id="reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              onClick={handleCancelSubscription}
              disabled={loading || !userId}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <Ban className="h-4 w-4 mr-2" />
                  Cancel Subscription
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <a
              href="http://localhost:5556"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-500"
            >
              → Open Prisma Studio (Browse Database)
            </a>
            <a
              href="/dashboard/account"
              className="block text-blue-600 hover:text-blue-500"
            >
              → Back to Account Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
