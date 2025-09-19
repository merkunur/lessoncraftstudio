'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Backup, 
  BackupSchedule, 
  RestoreOperation, 
  DataExport,
  DataImport,
  DisasterRecovery,
  BackupHealth
} from '@/types/backup';
import {
  formatFileSize,
  getNextBackupTime,
  calculateRecoveryMetrics,
  getBackupStatusColor,
  estimateBackupDuration,
  getBackupHealth
} from '@/lib/backup-utils';
import {
  HardDriveDownload,
  Upload,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  RefreshCw,
  Settings,
  Database,
  FileArchive,
  Activity,
  Zap,
  Server,
  Cloud,
  Lock,
  AlertCircle
} from 'lucide-react';

export default function BackupPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [backups, setBackups] = useState<Backup[]>([]);
  const [schedules, setSchedules] = useState<BackupSchedule[]>([]);
  const [restoreOperations, setRestoreOperations] = useState<RestoreOperation[]>([]);
  const [exports, setExports] = useState<DataExport[]>([]);
  const [imports, setImports] = useState<DataImport[]>([]);
  const [disasterRecovery, setDisasterRecovery] = useState<DisasterRecovery | null>(null);
  const [backupHealth, setBackupHealth] = useState<BackupHealth | null>(null);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    loadBackupData();
    const interval = setInterval(loadBackupData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadBackupData = async () => {
    try {
      const [backupsRes, schedulesRes, healthRes] = await Promise.all([
        fetch('/api/admin/backup/list'),
        fetch('/api/admin/backup/schedules'),
        fetch('/api/admin/backup/health')
      ]);

      if (backupsRes.ok) {
        const data = await backupsRes.json();
        setBackups(data);
      }

      if (schedulesRes.ok) {
        const data = await schedulesRes.json();
        setSchedules(data);
      }

      if (healthRes.ok) {
        const data = await healthRes.json();
        setBackupHealth(data);
      }
    } catch (error) {
      console.error('Failed to load backup data:', error);
    }
  };

  const createManualBackup = async (type: Backup['type']) => {
    setIsCreatingBackup(true);
    try {
      const response = await fetch('/api/admin/backup/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });

      if (response.ok) {
        await loadBackupData();
        alert('Backup initiated successfully');
      } else {
        alert('Failed to create backup');
      }
    } catch (error) {
      console.error('Failed to create backup:', error);
      alert('Failed to create backup');
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const startRestore = async (backupId: string) => {
    if (!confirm('Are you sure you want to restore from this backup? This will overwrite current data.')) {
      return;
    }

    setIsRestoring(true);
    try {
      const response = await fetch('/api/admin/backup/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backupId })
      });

      if (response.ok) {
        alert('Restore operation started');
        await loadBackupData();
      } else {
        alert('Failed to start restore');
      }
    } catch (error) {
      console.error('Failed to restore:', error);
      alert('Failed to restore');
    } finally {
      setIsRestoring(false);
    }
  };

  const exportData = async (format: DataExport['format']) => {
    try {
      const response = await fetch('/api/admin/backup/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export_${Date.now()}.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Export failed');
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed');
    }
  };

  const recoveryMetrics = calculateRecoveryMetrics(backups);
  const healthStatus = backupHealth || getBackupHealth(backups);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <HardDriveDownload className="w-10 h-10 text-purple-600" />
            Backup & Recovery
          </h1>
          <p className="text-gray-600 mt-2">
            Manage backups, restore points, and disaster recovery
          </p>
        </div>

        {/* Health Status Bar */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                healthStatus === 'healthy' ? 'bg-green-100 text-green-700' :
                healthStatus === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {healthStatus === 'healthy' ? <CheckCircle className="w-4 h-4" /> :
                 healthStatus === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                 <AlertTriangle className="w-4 h-4" />}
                <span className="font-medium capitalize">{healthStatus || 'Unknown'}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-500">RTO:</span>
                  <span className="ml-1 font-medium">
                    {recoveryMetrics.rto > 0 ? `${recoveryMetrics.rto} min` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">RPO:</span>
                  <span className="ml-1 font-medium">
                    {recoveryMetrics.rpo > 0 ? `${recoveryMetrics.rpo} min` : 'N/A'}
                  </span>
                </div>
                {backupHealth && (
                  <div>
                    <span className="text-gray-500">Storage:</span>
                    <span className="ml-1 font-medium">
                      {formatFileSize(backupHealth.storageUsed)} / {formatFileSize(backupHealth.storageLimit)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => createManualBackup('full')}
                disabled={isCreatingBackup}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
              >
                <HardDriveDownload className="w-4 h-4" />
                {isCreatingBackup ? 'Creating...' : 'Full Backup'}
              </button>
              <button
                onClick={() => createManualBackup('incremental')}
                disabled={isCreatingBackup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Incremental
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'backups', label: 'Backups', icon: HardDriveDownload },
              { id: 'schedules', label: 'Schedules', icon: Calendar },
              { id: 'restore', label: 'Restore', icon: Upload },
              { id: 'export', label: 'Export/Import', icon: FileArchive },
              { id: 'disaster', label: 'Disaster Recovery', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Statistics Grid */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <HardDriveDownload className="w-8 h-8 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-800">
                      {backups.filter(b => b.status === 'completed').length}
                    </span>
                  </div>
                  <p className="text-sm text-purple-600">Total Backups</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-800">
                      {schedules.filter(s => s.enabled).length}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">Active Schedules</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-2xl font-bold text-green-800">
                      {backups.filter(b => b.verification?.verified).length}
                    </span>
                  </div>
                  <p className="text-sm text-green-600">Verified Backups</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Database className="w-8 h-8 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-800">
                      {backupHealth ? formatFileSize(backupHealth.storageUsed) : '0 B'}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-600">Storage Used</p>
                </div>
              </div>

              {/* Recent Backups */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Recent Backups</h3>
                <div className="space-y-2">
                  {backups.slice(0, 5).map(backup => (
                    <div key={backup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getBackupStatusColor(backup.status)}`}>
                          {backup.status}
                        </div>
                        <span className="font-medium">{backup.name}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(backup.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{formatFileSize(backup.size)}</span>
                        <button
                          onClick={() => startRestore(backup.id)}
                          disabled={isRestoring || backup.status !== 'completed'}
                          className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Schedules */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Upcoming Schedules</h3>
                <div className="space-y-2">
                  {schedules.filter(s => s.enabled).slice(0, 3).map(schedule => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{schedule.name}</span>
                        <span className="ml-2 text-sm text-gray-500">({schedule.frequency})</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Next: {new Date(getNextBackupTime(schedule)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backups' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">All Backups</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                    Filter
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                    Sort
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {backups.map(backup => (
                      <tr key={backup.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {backup.encryption?.enabled && <Lock className="w-3 h-3 text-gray-400" />}
                            {backup.verification?.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                            <span className="font-medium">{backup.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="capitalize">{backup.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getBackupStatusColor(backup.status)}`}>
                            {backup.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{formatFileSize(backup.size)}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(backup.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {backup.location.type === 'cloud' ? (
                              <Cloud className="w-4 h-4 text-blue-500" />
                            ) : (
                              <Server className="w-4 h-4 text-gray-500" />
                            )}
                            <span className="text-sm">{backup.location.type}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBackup(backup)}
                              className="text-blue-600 hover:text-blue-700"
                              title="View Details"
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => startRestore(backup.id)}
                              disabled={backup.status !== 'completed'}
                              className="text-green-600 hover:text-green-700 disabled:text-gray-400"
                              title="Restore"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-700"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'schedules' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Backup Schedules</h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Add Schedule
                </button>
              </div>

              <div className="space-y-4">
                {schedules.map(schedule => (
                  <div key={schedule.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{schedule.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            schedule.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {schedule.enabled ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {schedule.type} • {schedule.frequency}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Next Run:</span>
                            <span className="ml-2">
                              {schedule.nextRun ? new Date(schedule.nextRun).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Run:</span>
                            <span className="ml-2">
                              {schedule.lastRun ? new Date(schedule.lastRun).toLocaleString() : 'Never'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Retention:</span>
                            <span className="ml-2">
                              {schedule.retentionPolicy.keepDaily}d, {schedule.retentionPolicy.keepWeekly}w, 
                              {schedule.retentionPolicy.keepMonthly}m, {schedule.retentionPolicy.keepYearly}y
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Destination:</span>
                            <span className="ml-2">{schedule.destination.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-700">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Zap className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Export Data</h3>
                <div className="grid grid-cols-5 gap-3">
                  {['json', 'csv', 'xml', 'sql', 'zip'].map(format => (
                    <button
                      key={format}
                      onClick={() => exportData(format as DataExport['format'])}
                      className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-colors">
                      <FileArchive className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium uppercase">{format}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Import Data</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">Supported formats: JSON, CSV, XML, SQL</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Select Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'disaster' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Disaster Recovery Plan</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Configure and test your disaster recovery procedures to ensure business continuity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Recovery Objectives</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Recovery Time Objective (RTO)</span>
                      <span className="font-medium">{recoveryMetrics.rto > 0 ? `${recoveryMetrics.rto} minutes` : 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Recovery Point Objective (RPO)</span>
                      <span className="font-medium">{recoveryMetrics.rpo > 0 ? `${recoveryMetrics.rpo} minutes` : 'Not set'}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Test Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Test</span>
                      <span className="font-medium">Never</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Next Scheduled Test</span>
                      <span className="font-medium">Not scheduled</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Initiate Failover Test
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Configure DR Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}