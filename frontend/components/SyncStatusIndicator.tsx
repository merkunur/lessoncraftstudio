'use client';

import { useEffect, useState } from 'react';

interface SyncStatus {
  lastSync: number;
  isStale: boolean;
  isSyncing: boolean;
  themesAvailable: number;
  autoSyncEnabled: boolean;
  syncInterval: number;
}

export function SyncStatusIndicator() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/sync-directus');
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch sync status:', error);
    }
  };

  const triggerSync = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sync-directus', { method: 'POST' });
      if (response.ok) {
        await fetchStatus();
      }
    } catch (error) {
      console.error('Failed to trigger sync:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  const formatTime = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">Image Library Status</h3>
        {status.isSyncing ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        ) : (
          <div className={`h-2 w-2 rounded-full ${status.isStale ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
        )}
      </div>
      
      <div className="space-y-1 text-xs text-gray-600">
        <div>Themes: {status.themesAvailable}</div>
        <div>Last sync: {formatTime(status.lastSync)}</div>
        <div>Auto-sync: {status.autoSyncEnabled ? `Every ${status.syncInterval / 1000}s` : 'Disabled'}</div>
        {status.isStale && (
          <div className="text-yellow-600">⚠️ Data may be outdated</div>
        )}
      </div>
      
      <button
        onClick={triggerSync}
        disabled={loading || status.isSyncing}
        className="mt-3 w-full px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading || status.isSyncing ? 'Syncing...' : 'Force Sync Now'}
      </button>
    </div>
  );
}