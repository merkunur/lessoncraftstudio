'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Monitor, Smartphone, Tablet, MapPin, Clock, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeviceInfo {
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  os?: string;
  location: string;
  lastActive: string;
}

export default function ActiveDevice() {
  const t = useTranslations('dashboard.activeDevice');
  const router = useRouter();
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveDevice();
  }, []);

  const fetchActiveDevice = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/active-sessions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch active sessions:', response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.sessions && data.sessions.length > 0) {
        // Get the most recent session (current device)
        const currentSession = data.sessions[0];
        setDevice({
          deviceName: currentSession.deviceName || 'Unknown Device',
          deviceType: currentSession.deviceType || 'desktop',
          browser: currentSession.browser,
          os: currentSession.os,
          location: currentSession.location || 'Unknown',
          lastActive: currentSession.lastActive,
        });
      }
    } catch (error) {
      console.error('Failed to fetch active device:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Call API to delete session from database
        await fetch('/api/auth/signout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Signout API error:', error);
      // Continue with local cleanup even if API fails
    }

    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/auth/signin');
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return t('justNow');
    if (diffMins < 60) return t('minutesAgo', { count: diffMins });

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return t('hoursAgo', { count: diffHours });

    const diffDays = Math.floor(diffHours / 24);
    return t('daysAgo', { count: diffDays });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!device) {
    return null;
  }

  const DeviceIcon = getDeviceIcon(device.deviceType);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">{t('title')}</h2>
        <p className="text-sm text-white text-opacity-90 mt-1">{t('subtitle')}</p>
      </div>

      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-indigo-100 rounded-xl p-3">
            <DeviceIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{device.deviceName}</h3>
            {device.browser && device.os && (
              <p className="text-sm text-gray-600 mb-2">
                {device.browser} • {device.os}
              </p>
            )}

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {device.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                {t('lastActive')}: {formatLastActive(device.lastActive)}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800">
              <strong>✓ {t('securityNote')}:</strong> {t('securityMessage')}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('signOutButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
