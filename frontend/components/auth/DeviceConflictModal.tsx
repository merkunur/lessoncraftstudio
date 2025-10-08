'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, Monitor, Smartphone, Tablet, X } from 'lucide-react';

interface DeviceSession {
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  os?: string;
  location: string;
  lastActive: string;
}

interface DeviceConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession: DeviceSession;
  onContinue: () => Promise<void>;
  onCancel: () => void;
}

export default function DeviceConflictModal({
  isOpen,
  onClose,
  currentSession,
  onContinue,
  onCancel,
}: DeviceConflictModalProps) {
  const t = useTranslations('auth.deviceConflict');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleContinue = async () => {
    setLoading(true);
    try {
      await onContinue();
    } catch (error) {
      console.error('Force signin error:', error);
    } finally {
      setLoading(false);
    }
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

  const DeviceIcon = getDeviceIcon(currentSession.deviceType);

  // Format last active time
  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('title')}</h2>
                <p className="text-sm text-white text-opacity-90 mt-1">{t('subtitle')}</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">{t('message')}</p>

          {/* Current Session Info */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 rounded-lg p-3">
                <DeviceIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{currentSession.deviceName}</h3>
                <div className="space-y-1">
                  {currentSession.browser && currentSession.os && (
                    <p className="text-sm text-gray-600">
                      {currentSession.browser} • {currentSession.os}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    📍 {currentSession.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('lastActive')}: {formatLastActive(currentSession.lastActive)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>ℹ️ {t('infoTitle')}:</strong> {t('infoMessage')}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('cancelButton')}
            </button>
            <button
              onClick={handleContinue}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('continuingButton')}
                </>
              ) : (
                t('continueButton')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
