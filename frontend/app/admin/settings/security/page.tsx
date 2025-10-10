'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import {
  Shield,
  Lock,
  Key,
  Activity,
  AlertCircle,
  CheckCircle,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Server,
  Users,
  Clock,
  Globe,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SecuritySettings {
  // Password Policy
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecial: boolean;

  // Session Management
  maxSessionsPerUser: number;
  sessionTimeoutMinutes: number;
  sessionIdleMinutes: number;

  // Login Security
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  require2FA: boolean;
  require2FAForAdmins: boolean;
  enableEmailVerification: boolean;

  // Account Sharing Detection
  enableAccountSharingDetection: boolean;
  maxConcurrentDevices: number;
  suspiciousActivityThreshold: number;

  // IP Security
  enableIpWhitelist: boolean;
  ipWhitelist: string[];
  enableIpBlacklist: boolean;
  ipBlacklist: string[];

  // Security Features
  enableCsrfProtection: boolean;
  enableRateLimiting: boolean;
  rateLimitRequestsPerMin: number;

  // Audit Logging
  logAllAuthEvents: boolean;
  logFailedLogins: boolean;
  logPasswordChanges: boolean;
  logRoleChanges: boolean;
  retainAuditLogDays: number;
}

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

export default function SecuritySettingsPage() {
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [auditStats, setAuditStats] = useState<any[]>([]);
  const [newIp, setNewIp] = useState('');
  const [addingToWhitelist, setAddingToWhitelist] = useState(false);

  useEffect(() => {
    fetchSettings();
    if (activeTab === 'audit') {
      fetchAuditLogs();
    }
  }, [activeTab]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/admin/settings/security', { headers });
      if (!response.ok) throw new Error('Failed to fetch settings');

      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      toast.error('Failed to load security settings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/admin/settings/security/audit-log?days=7&limit=20', { headers });
      if (!response.ok) throw new Error('Failed to fetch audit logs');

      const data = await response.json();
      setAuditLogs(data.logs);
      setAuditStats(data.stats);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/admin/settings/security', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save settings');
      }

      toast.success('Security settings saved successfully');
      fetchSettings();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const addIpToList = (type: 'whitelist' | 'blacklist') => {
    if (!settings || !newIp.trim()) return;

    // Basic IP validation (simple check)
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(newIp.trim())) {
      toast.error('Please enter a valid IP address');
      return;
    }

    const list = type === 'whitelist' ? settings.ipWhitelist : settings.ipBlacklist;
    if (list.includes(newIp.trim())) {
      toast.error('IP address already in list');
      return;
    }

    setSettings({
      ...settings,
      [type === 'whitelist' ? 'ipWhitelist' : 'ipBlacklist']: [...list, newIp.trim()],
    });
    setNewIp('');
  };

  const removeIpFromList = (ip: string, type: 'whitelist' | 'blacklist') => {
    if (!settings) return;

    const list = type === 'whitelist' ? settings.ipWhitelist : settings.ipBlacklist;
    setSettings({
      ...settings,
      [type === 'whitelist' ? 'ipWhitelist' : 'ipBlacklist']: list.filter((item) => item !== ip),
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Settings</h2>
          <button onClick={fetchSettings} className="text-blue-600 hover:text-blue-500">
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  const tabs = [
    { id: 'password', label: 'Password Policy', icon: Lock },
    { id: 'session', label: 'Session Management', icon: Clock },
    { id: 'login', label: 'Login Security', icon: Key },
    { id: 'sharing', label: 'Account Sharing', icon: Users },
    { id: 'ip', label: 'IP Security', icon: Globe },
    { id: 'features', label: 'Security Features', icon: Shield },
    { id: 'audit', label: 'Audit Logging', icon: Activity },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-7 w-7 text-blue-600 mr-2" />
                Security Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Configure security policies and access controls for your platform
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {/* Password Policy Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Password Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) || 8 })}
                      min="4"
                      max="128"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Minimum: 4, Maximum: 128</p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.passwordRequireUppercase}
                        onChange={(e) => setSettings({ ...settings, passwordRequireUppercase: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require uppercase letters (A-Z)</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.passwordRequireLowercase}
                        onChange={(e) => setSettings({ ...settings, passwordRequireLowercase: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require lowercase letters (a-z)</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.passwordRequireNumbers}
                        onChange={(e) => setSettings({ ...settings, passwordRequireNumbers: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require numbers (0-9)</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.passwordRequireSpecial}
                        onChange={(e) => setSettings({ ...settings, passwordRequireSpecial: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require special characters (!@#$%)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Session Management Tab */}
          {activeTab === 'session' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Session Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Maximum Sessions Per User
                    </label>
                    <input
                      type="number"
                      value={settings.maxSessionsPerUser}
                      onChange={(e) => setSettings({ ...settings, maxSessionsPerUser: parseInt(e.target.value) || 5 })}
                      min="1"
                      max="100"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Limit how many active sessions a user can have</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeoutMinutes}
                      onChange={(e) => setSettings({ ...settings, sessionTimeoutMinutes: parseInt(e.target.value) || 60 })}
                      min="5"
                      max="10080"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Absolute session expiration (5 min - 7 days)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Session Idle Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionIdleMinutes}
                      onChange={(e) => setSettings({ ...settings, sessionIdleMinutes: parseInt(e.target.value) || 30 })}
                      min="5"
                      max="1440"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Logout after inactivity (5 min - 24 hours)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Login Security Tab */}
          {activeTab === 'login' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Login Protection</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Maximum Login Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) || 5 })}
                      min="3"
                      max="20"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Before account lockout</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lockout Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.lockoutDurationMinutes}
                      onChange={(e) => setSettings({ ...settings, lockoutDurationMinutes: parseInt(e.target.value) || 15 })}
                      min="1"
                      max="1440"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">How long to lock account after failed attempts</p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.require2FA}
                        onChange={(e) => setSettings({ ...settings, require2FA: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require 2FA for all users</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.require2FAForAdmins}
                        onChange={(e) => setSettings({ ...settings, require2FAForAdmins: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require 2FA for admin users</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableEmailVerification}
                        onChange={(e) => setSettings({ ...settings, enableEmailVerification: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require email verification for new accounts</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Sharing Tab */}
          {activeTab === 'sharing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Sharing Detection</h3>
                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableAccountSharingDetection}
                      onChange={(e) => setSettings({ ...settings, enableAccountSharingDetection: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable account sharing detection</span>
                  </label>

                  {settings.enableAccountSharingDetection && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Maximum Concurrent Devices
                        </label>
                        <input
                          type="number"
                          value={settings.maxConcurrentDevices}
                          onChange={(e) => setSettings({ ...settings, maxConcurrentDevices: parseInt(e.target.value) || 3 })}
                          min="1"
                          max="20"
                          className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-sm text-gray-500">Maximum simultaneous devices allowed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Suspicious Activity Threshold
                        </label>
                        <input
                          type="number"
                          value={settings.suspiciousActivityThreshold}
                          onChange={(e) => setSettings({ ...settings, suspiciousActivityThreshold: parseInt(e.target.value) || 5 })}
                          min="1"
                          max="50"
                          className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-sm text-gray-500">Number of suspicious events before flagging</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* IP Security Tab */}
          {activeTab === 'ip' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">IP Address Control</h3>

                {/* IP Whitelist */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={settings.enableIpWhitelist}
                      onChange={(e) => setSettings({ ...settings, enableIpWhitelist: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-medium">Enable IP Whitelist (only allow listed IPs)</span>
                  </label>

                  {settings.enableIpWhitelist && (
                    <div>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newIp}
                          onChange={(e) => setNewIp(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addIpToList('whitelist')}
                          placeholder="e.g., 192.168.1.1"
                          className="flex-1 max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <button
                          onClick={() => addIpToList('whitelist')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {settings.ipWhitelist.map((ip) => (
                          <span
                            key={ip}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                          >
                            {ip}
                            <button
                              onClick={() => removeIpFromList(ip, 'whitelist')}
                              className="ml-2 text-green-600 hover:text-green-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* IP Blacklist */}
                <div>
                  <label className="flex items-center cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={settings.enableIpBlacklist}
                      onChange={(e) => setSettings({ ...settings, enableIpBlacklist: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-medium">Enable IP Blacklist (block listed IPs)</span>
                  </label>

                  {settings.enableIpBlacklist && (
                    <div>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newIp}
                          onChange={(e) => setNewIp(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addIpToList('blacklist')}
                          placeholder="e.g., 192.168.1.1"
                          className="flex-1 max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <button
                          onClick={() => addIpToList('blacklist')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {settings.ipBlacklist.map((ip) => (
                          <span
                            key={ip}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                          >
                            {ip}
                            <button
                              onClick={() => removeIpFromList(ip, 'blacklist')}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Security Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Security Features</h3>
                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableCsrfProtection}
                      onChange={(e) => setSettings({ ...settings, enableCsrfProtection: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable CSRF Protection</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableRateLimiting}
                      onChange={(e) => setSettings({ ...settings, enableRateLimiting: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable Rate Limiting</span>
                  </label>

                  {settings.enableRateLimiting && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rate Limit (requests per minute)
                      </label>
                      <input
                        type="number"
                        value={settings.rateLimitRequestsPerMin}
                        onChange={(e) => setSettings({ ...settings, rateLimitRequestsPerMin: parseInt(e.target.value) || 100 })}
                        min="10"
                        max="10000"
                        className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">Requests allowed per minute per IP</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Audit Logging Tab */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Audit Log Configuration</h3>
                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.logAllAuthEvents}
                      onChange={(e) => setSettings({ ...settings, logAllAuthEvents: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Log all authentication events</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.logFailedLogins}
                      onChange={(e) => setSettings({ ...settings, logFailedLogins: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Log failed login attempts</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.logPasswordChanges}
                      onChange={(e) => setSettings({ ...settings, logPasswordChanges: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Log password changes</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.logRoleChanges}
                      onChange={(e) => setSettings({ ...settings, logRoleChanges: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Log role and permission changes</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Retain Audit Logs (days)
                    </label>
                    <input
                      type="number"
                      value={settings.retainAuditLogDays}
                      onChange={(e) => setSettings({ ...settings, retainAuditLogDays: parseInt(e.target.value) || 90 })}
                      min="7"
                      max="365"
                      className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">How long to keep audit logs (7-365 days)</p>
                  </div>
                </div>
              </div>

              {/* Recent Audit Logs */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events (Last 7 days)</h3>

                {/* Statistics */}
                {auditStats.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {auditStats.slice(0, 4).map((stat) => (
                      <div key={stat.action} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 truncate">{stat.action}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Log Table */}
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                            No recent security events
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.action}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{log.user.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{log.details || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{formatDate(log.createdAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
