'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/client-auth';
import { Monitor, Smartphone, Tablet, Loader2, X, MapPin, Calendar } from 'lucide-react';

interface Session {
  id: string;
  deviceName: string;
  deviceType: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActivity: string;
  lastActivityFormatted: string;
  isCurrent: boolean;
  canRevoke: boolean;
}

interface SessionsResponse {
  sessions: Session[];
  total: number;
  limit: number;
  hasReachedLimit: boolean;
}

export default function AccountPage() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const [sessions, setSessions] = useState<SessionsResponse | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/auth/active-sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to sign out from this device?')) {
      return;
    }

    setRevokingId(sessionId);
    try {
      const response = await fetch('/api/auth/revoke-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        await fetchSessions();
        alert('Session revoked successfully');
      } else {
        const error = await response.json();
        alert(`Failed to revoke session: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to revoke session:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setRevokingId(null);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="h-6 w-6" />;
      case 'tablet':
        return <Tablet className="h-6 w-6" />;
      default:
        return <Monitor className="h-6 w-6" />;
    }
  };

  if (isLoading || loadingSessions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not authenticated</h2>
          <a href="/auth/signin" className="text-blue-600 hover:text-blue-500">
            Sign in
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
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account and active sessions</p>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {user?.name || 'Not set'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Subscription:</span>{' '}
              <span className="capitalize">{user?.subscriptionTier || 'free'}</span>
            </p>
            {user?.isAdmin && (
              <p className="text-gray-700">
                <span className="inline-block px-2 py-1 text-sm font-semibold text-white bg-purple-600 rounded">
                  Admin
                </span>
              </p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => signOut()}
              className="text-red-600 hover:text-red-500 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Active Sessions</h2>
              <p className="text-sm text-gray-600 mt-1">
                You are signed in on {sessions?.total || 0} of {sessions?.limit || 2} allowed devices
              </p>
            </div>
            {sessions?.hasReachedLimit && (
              <span className="inline-block px-3 py-1 text-sm font-semibold text-orange-800 bg-orange-100 rounded-full">
                Limit Reached
              </span>
            )}
          </div>

          <div className="space-y-4">
            {sessions?.sessions.map((session) => (
              <div
                key={session.id}
                className={`border rounded-lg p-4 ${
                  session.isCurrent ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-600">{getDeviceIcon(session.deviceType)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        {session.deviceName}
                        {session.isCurrent && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-200 rounded">
                            Current Device
                          </span>
                        )}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <Monitor className="h-4 w-4 mr-2" />
                          {session.browser} • {session.os}
                        </p>
                        <p className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {session.location} • {session.ipAddress}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Last active: {session.lastActivityFormatted}
                        </p>
                      </div>
                    </div>
                  </div>
                  {session.canRevoke && (
                    <button
                      onClick={() => handleRevokeSession(session.id)}
                      disabled={revokingId === session.id}
                      className="ml-4 text-red-600 hover:text-red-500 disabled:opacity-50"
                    >
                      {revokingId === session.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <button
              onClick={fetchSessions}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              Refresh Sessions
            </button>
          </div>
        </div>

        {/* Admin Panel Link */}
        {user?.isAdmin && (
          <div className="mt-6">
            <a
              href="/dashboard/admin"
              className="block w-full text-center py-3 px-4 border border-purple-600 rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Open Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
