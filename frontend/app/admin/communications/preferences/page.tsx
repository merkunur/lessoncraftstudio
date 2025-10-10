'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Mail,
  Bell,
  Users,
  UserCheck,
  UserX,
  Shield,
  Globe,
  Clock,
  Save,
  Search,
  Filter,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SubscriptionPreferences {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    key: string;
    defaultEnabled: boolean;
    allowUserControl: boolean;
    required: boolean;
  }>;
  globalSettings: {
    doubleOptIn: boolean;
    confirmationRequired: boolean;
    cooldownPeriod: number;
    maxEmailsPerDay: number;
    maxEmailsPerWeek: number;
    unsubscribeMethod: 'one-click' | 'confirmation' | 'preference-center';
    resubscribeAllowed: boolean;
    resubscribeCooldown: number;
  };
  suppressionList: Array<{
    email: string;
    reason: 'unsubscribed' | 'bounced' | 'complained' | 'manual';
    date: string;
    permanent: boolean;
  }>;
  userPreferences: Array<{
    userId: string;
    email: string;
    preferences: Record<string, boolean>;
    lastUpdated: string;
    source: 'user' | 'admin' | 'system';
  }>;
  stats: {
    totalUsers: number;
    totalUnsubscribed: number;
    totalBounced: number;
    totalComplaints: number;
    optInRate: number;
    unsubscribeRate: number;
  };
}

export default function EmailPreferencesPage() {
  const [preferences, setPreferences] = useState<SubscriptionPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'categories' | 'settings' | 'suppression' | 'users'>('categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    key: '',
    defaultEnabled: true,
    allowUserControl: true,
    required: false
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      // Mock data - replace with API call
      const mockPreferences: SubscriptionPreferences = {
        categories: [
          {
            id: '1',
            name: 'Transactional Emails',
            description: 'Order confirmations, password resets, account updates',
            key: 'transactional',
            defaultEnabled: true,
            allowUserControl: false,
            required: true
          },
          {
            id: '2',
            name: 'Product Updates',
            description: 'New features, improvements, and product announcements',
            key: 'product_updates',
            defaultEnabled: true,
            allowUserControl: true,
            required: false
          },
          {
            id: '3',
            name: 'Newsletter',
            description: 'Monthly newsletter with tips and resources',
            key: 'newsletter',
            defaultEnabled: true,
            allowUserControl: true,
            required: false
          },
          {
            id: '4',
            name: 'Marketing & Promotions',
            description: 'Special offers, discounts, and promotional content',
            key: 'marketing',
            defaultEnabled: false,
            allowUserControl: true,
            required: false
          },
          {
            id: '5',
            name: 'Educational Content',
            description: 'Tutorials, webinars, and educational resources',
            key: 'educational',
            defaultEnabled: true,
            allowUserControl: true,
            required: false
          },
          {
            id: '6',
            name: 'Community Updates',
            description: 'Community news, user stories, and events',
            key: 'community',
            defaultEnabled: false,
            allowUserControl: true,
            required: false
          }
        ],
        globalSettings: {
          doubleOptIn: true,
          confirmationRequired: true,
          cooldownPeriod: 24,
          maxEmailsPerDay: 5,
          maxEmailsPerWeek: 20,
          unsubscribeMethod: 'preference-center',
          resubscribeAllowed: true,
          resubscribeCooldown: 30
        },
        suppressionList: [
          {
            email: 'john.doe@example.com',
            reason: 'unsubscribed',
            date: '2024-11-15T10:00:00Z',
            permanent: false
          },
          {
            email: 'bounce@invalid.com',
            reason: 'bounced',
            date: '2024-11-20T14:30:00Z',
            permanent: true
          },
          {
            email: 'spam@complaint.com',
            reason: 'complained',
            date: '2024-11-22T09:15:00Z',
            permanent: true
          }
        ],
        userPreferences: [
          {
            userId: '1',
            email: 'user1@example.com',
            preferences: {
              transactional: true,
              product_updates: true,
              newsletter: true,
              marketing: false,
              educational: true,
              community: false
            },
            lastUpdated: '2024-11-25T10:00:00Z',
            source: 'user'
          },
          {
            userId: '2',
            email: 'user2@example.com',
            preferences: {
              transactional: true,
              product_updates: false,
              newsletter: false,
              marketing: false,
              educational: false,
              community: false
            },
            lastUpdated: '2024-11-20T15:30:00Z',
            source: 'user'
          }
        ],
        stats: {
          totalUsers: 15234,
          totalUnsubscribed: 456,
          totalBounced: 234,
          totalComplaints: 12,
          optInRate: 78.5,
          unsubscribeRate: 3.0
        }
      };

      setPreferences(mockPreferences);
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // In production, save via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.key) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // In production, add via API
      if (preferences) {
        const newCat = {
          id: String(preferences.categories.length + 1),
          ...newCategory
        };
        setPreferences({
          ...preferences,
          categories: [...preferences.categories, newCat]
        });
      }
      setNewCategory({
        name: '',
        description: '',
        key: '',
        defaultEnabled: true,
        allowUserControl: true,
        required: false
      });
      setShowAddCategory(false);
      toast.success('Category added successfully');
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const handleRemoveFromSuppression = async (email: string) => {
    try {
      if (preferences) {
        setPreferences({
          ...preferences,
          suppressionList: preferences.suppressionList.filter(s => s.email !== email)
        });
      }
      toast.success(`${email} removed from suppression list`);
    } catch (error) {
      toast.error('Failed to remove from suppression list');
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <p className="text-gray-600">Failed to load preferences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="h-7 w-7" />
              Email Preferences
            </h1>
            <p className="text-gray-600 mt-1">
              Manage email subscription categories and user preferences
            </p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{preferences.stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Opt-in Rate</p>
              <p className="text-2xl font-bold">{preferences.stats.optInRate}%</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unsubscribed</p>
              <p className="text-2xl font-bold">{preferences.stats.totalUnsubscribed}</p>
            </div>
            <UserX className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bounced</p>
              <p className="text-2xl font-bold">{preferences.stats.totalBounced}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Complaints</p>
              <p className="text-2xl font-bold">{preferences.stats.totalComplaints}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="border-b">
          <div className="flex">
            {[
              { id: 'categories', label: 'Email Categories', icon: Mail },
              { id: 'settings', label: 'Global Settings', icon: Settings },
              { id: 'suppression', label: 'Suppression List', icon: Shield },
              { id: 'users', label: 'User Preferences', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Email Categories */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Email Categories</h2>
                <button
                  onClick={() => setShowAddCategory(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add Category
                </button>
              </div>

              <div className="space-y-4">
                {preferences.categories.map(category => (
                  <div key={category.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          {category.required && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                              Required
                            </span>
                          )}
                          {!category.allowUserControl && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                              Admin Only
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">Key: <code className="bg-gray-100 px-1 py-0.5 rounded">{category.key}</code></span>
                          <span className="text-gray-500">Default: {category.defaultEnabled ? 'Enabled' : 'Disabled'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:bg-white rounded-lg">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Category Modal */}
              {showAddCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Email Category</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={newCategory.description}
                          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Key</label>
                        <input
                          type="text"
                          value={newCategory.key}
                          onChange={(e) => setNewCategory({ ...newCategory, key: e.target.value.toLowerCase().replace(/\s/g, '_') })}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newCategory.defaultEnabled}
                            onChange={(e) => setNewCategory({ ...newCategory, defaultEnabled: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Enabled by default</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newCategory.allowUserControl}
                            onChange={(e) => setNewCategory({ ...newCategory, allowUserControl: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Allow user control</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newCategory.required}
                            onChange={(e) => setNewCategory({ ...newCategory, required: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Required (cannot be disabled)</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleAddCategory}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Category
                      </button>
                      <button
                        onClick={() => setShowAddCategory(false)}
                        className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Global Settings */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Global Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Subscription Settings</h3>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.globalSettings.doubleOptIn}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, doubleOptIn: e.target.checked }
                      })}
                      className="mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Double Opt-in</span>
                      <p className="text-xs text-gray-500">Require email confirmation for new subscriptions</p>
                    </div>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.globalSettings.confirmationRequired}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, confirmationRequired: e.target.checked }
                      })}
                      className="mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Confirmation Required</span>
                      <p className="text-xs text-gray-500">Require confirmation for preference changes</p>
                    </div>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.globalSettings.resubscribeAllowed}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, resubscribeAllowed: e.target.checked }
                      })}
                      className="mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Allow Resubscribe</span>
                      <p className="text-xs text-gray-500">Allow users to resubscribe after unsubscribing</p>
                    </div>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unsubscribe Method
                    </label>
                    <select
                      value={preferences.globalSettings.unsubscribeMethod}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, unsubscribeMethod: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="one-click">One-click unsubscribe</option>
                      <option value="confirmation">Require confirmation</option>
                      <option value="preference-center">Preference center</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Rate Limiting</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cooldown Period (hours)
                    </label>
                    <input
                      type="number"
                      value={preferences.globalSettings.cooldownPeriod}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, cooldownPeriod: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Emails Per Day
                    </label>
                    <input
                      type="number"
                      value={preferences.globalSettings.maxEmailsPerDay}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, maxEmailsPerDay: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Emails Per Week
                    </label>
                    <input
                      type="number"
                      value={preferences.globalSettings.maxEmailsPerWeek}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, maxEmailsPerWeek: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resubscribe Cooldown (days)
                    </label>
                    <input
                      type="number"
                      value={preferences.globalSettings.resubscribeCooldown}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        globalSettings: { ...preferences.globalSettings, resubscribeCooldown: parseInt(e.target.value) }
                      })}
                      disabled={!preferences.globalSettings.resubscribeAllowed}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suppression List */}
          {activeTab === 'suppression' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Suppression List</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                    <Upload className="h-4 w-4" />
                    Import CSV
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preferences.suppressionList.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.reason === 'bounced' ? 'bg-red-100 text-red-700' :
                            item.reason === 'complained' ? 'bg-orange-100 text-orange-700' :
                            item.reason === 'unsubscribed' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {item.reason}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {item.permanent ? (
                            <span className="text-sm text-red-600 font-medium">Permanent</span>
                          ) : (
                            <span className="text-sm text-gray-600">Temporary</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRemoveFromSuppression(item.email)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User Preferences */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">User Preferences</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {preferences.userPreferences
                  .filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(user => (
                  <div key={user.userId} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{user.email}</p>
                        <p className="text-sm text-gray-600">
                          Last updated: {new Date(user.lastUpdated).toLocaleDateString()}
                          <span className="ml-2">Source: {user.source}</span>
                        </p>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(user.preferences).map(([key, enabled]) => {
                        const category = preferences.categories.find(c => c.key === key);
                        return (
                          <div key={key} className="flex items-center gap-2">
                            {enabled ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-700">
                              {category?.name || key}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}