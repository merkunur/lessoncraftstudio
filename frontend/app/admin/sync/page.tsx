'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { SyncStatusIndicator } from '@/components/SyncStatusIndicator';

export default function SyncPage() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSync = async () => {
    setSyncing(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/sync-directus', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Sync failed');
      }
    } catch (err) {
      setError('Failed to trigger sync');
    } finally {
      setSyncing(false);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/sync-directus');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to check status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <SyncStatusIndicator />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Directus Sync Control</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Manual Sync</h2>
          <p className="text-gray-600 mb-4">
            Click the button below to sync all themes and images from Directus to the filesystem.
            This will make any new themes you added in Directus appear in the worksheet apps.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                syncing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {syncing ? 'Syncing...' : '🔄 Sync Now'}
            </button>

            <button
              onClick={checkStatus}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              📊 Check Status
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-medium">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium">Result:</p>
            <pre className="text-sm text-green-600 mt-2">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Add themes and images in Directus admin panel</li>
            <li>Click "Sync Now" button above</li>
            <li>New themes will be downloaded to the filesystem</li>
            <li>Themes will immediately appear in all worksheet apps</li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">💡 Pro Tip:</p>
            <p className="text-blue-700 text-sm mt-1">
              You can also trigger sync by calling: <code className="bg-white px-2 py-1 rounded">POST /api/sync-directus</code>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="http://localhost:8055/admin/content/image_themes" 
              target="_blank"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-blue-600">Manage Themes</h3>
              <p className="text-sm text-gray-600">Add or edit themes in Directus</p>
            </a>
            <a 
              href="http://localhost:8055/admin/content/worksheet_images" 
              target="_blank"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-blue-600">Manage Images</h3>
              <p className="text-sm text-gray-600">Upload images to themes</p>
            </a>
            <a 
              href="/en/apps/word-search" 
              target="_blank"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-green-600">Test Word Search</h3>
              <p className="text-sm text-gray-600">See your themes in action</p>
            </a>
            <a 
              href="/en/apps" 
              target="_blank"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-green-600">All Apps</h3>
              <p className="text-sm text-gray-600">Browse all worksheet apps</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}