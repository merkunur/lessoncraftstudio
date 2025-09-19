'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';
import {
  Settings as SettingsIcon,
  Bell,
  Globe,
  Shield,
  Palette,
  Download,
  Trash2,
  AlertCircle,
  Save,
  Loader2,
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Notification preferences
    emailNotifications: user?.newsletter || false,
    worksheetReminders: true,
    marketingEmails: false,
    securityAlerts: true,
    
    // Display preferences
    theme: 'light',
    fontSize: 'medium',
    compactMode: false,
    showTips: true,
    
    // Worksheet defaults
    defaultPaperSize: 'letter',
    defaultOrientation: 'portrait',
    autoSave: true,
    saveInterval: 5,
    
    // Privacy
    shareUsageData: false,
    publicProfile: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save notification preferences to user profile
      await updateProfile({
        newsletter: settings.emailNotifications,
      });
      
      // In production, save other settings to backend
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not yet implemented');
    }
  };

  const handleExportData = () => {
    toast.success('Data export requested. You will receive an email when ready.');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Settings
          </h2>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <Bell className="inline h-5 w-5 mr-2" />
                    Notifications
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose what notifications you want to receive
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email notifications
                        </label>
                        <p className="text-gray-500">Get notified about new features and updates</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="worksheetReminders"
                          type="checkbox"
                          checked={settings.worksheetReminders}
                          onChange={(e) => setSettings({ ...settings, worksheetReminders: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="worksheetReminders" className="font-medium text-gray-700">
                          Worksheet reminders
                        </label>
                        <p className="text-gray-500">Remind me about unfinished worksheets</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketingEmails"
                          type="checkbox"
                          checked={settings.marketingEmails}
                          onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketingEmails" className="font-medium text-gray-700">
                          Marketing emails
                        </label>
                        <p className="text-gray-500">Receive tips and promotional content</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="securityAlerts"
                          type="checkbox"
                          checked={settings.securityAlerts}
                          onChange={(e) => setSettings({ ...settings, securityAlerts: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="securityAlerts" className="font-medium text-gray-700">
                          Security alerts
                        </label>
                        <p className="text-gray-500">Get notified about important security updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Preferences */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <Palette className="inline h-5 w-5 mr-2" />
                    Display
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Customize your interface preferences
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                      </label>
                      <select
                        id="theme"
                        value={settings.theme}
                        onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
                        Font Size
                      </label>
                      <select
                        id="fontSize"
                        value={settings.fontSize}
                        onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="compactMode"
                          type="checkbox"
                          checked={settings.compactMode}
                          onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="compactMode" className="font-medium text-gray-700">
                          Compact mode
                        </label>
                        <p className="text-gray-500">Reduce spacing and padding in the interface</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="showTips"
                          type="checkbox"
                          checked={settings.showTips}
                          onChange={(e) => setSettings({ ...settings, showTips: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="showTips" className="font-medium text-gray-700">
                          Show tips
                        </label>
                        <p className="text-gray-500">Display helpful tips and hints</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Worksheet Defaults */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <SettingsIcon className="inline h-5 w-5 mr-2" />
                    Worksheet Defaults
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Default settings for new worksheets
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="paperSize" className="block text-sm font-medium text-gray-700">
                        Default Paper Size
                      </label>
                      <select
                        id="paperSize"
                        value={settings.defaultPaperSize}
                        onChange={(e) => setSettings({ ...settings, defaultPaperSize: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="letter">Letter (8.5" x 11")</option>
                        <option value="a4">A4 (210mm x 297mm)</option>
                        <option value="legal">Legal (8.5" x 14")</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="orientation" className="block text-sm font-medium text-gray-700">
                        Default Orientation
                      </label>
                      <select
                        id="orientation"
                        value={settings.defaultOrientation}
                        onChange={(e) => setSettings({ ...settings, defaultOrientation: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </select>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="autoSave"
                          type="checkbox"
                          checked={settings.autoSave}
                          onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="autoSave" className="font-medium text-gray-700">
                          Auto-save worksheets
                        </label>
                        <p className="text-gray-500">Automatically save your work as you edit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <Shield className="inline h-5 w-5 mr-2" />
                    Privacy & Data
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Control your data and privacy settings
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="shareUsageData"
                          type="checkbox"
                          checked={settings.shareUsageData}
                          onChange={(e) => setSettings({ ...settings, shareUsageData: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="shareUsageData" className="font-medium text-gray-700">
                          Share usage data
                        </label>
                        <p className="text-gray-500">Help us improve by sharing anonymous usage statistics</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="publicProfile"
                          type="checkbox"
                          checked={settings.publicProfile}
                          onChange={(e) => setSettings({ ...settings, publicProfile: e.target.checked })}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="publicProfile" className="font-medium text-gray-700">
                          Public profile
                        </label>
                        <p className="text-gray-500">Allow others to see your profile and worksheets</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <button
                          onClick={handleExportData}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export My Data
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}