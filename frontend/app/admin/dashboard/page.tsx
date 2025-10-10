'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  Cloud,
  Cpu,
  Database,
  DollarSign,
  FileText,
  HardDrive,
  Info,
  Lock,
  MemoryStick,
  Monitor,
  MoreVertical,
  Package,
  RefreshCw,
  Server,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Wifi,
  X,
  Zap
} from 'lucide-react';
import {
  AdminUser,
  SystemMetrics,
  ContentItem,
  AdminNotification,
  AuditLog,
  AnalyticsReport,
  MaintenanceWindow
} from '@/types/admin';
import {
  calculateSystemHealth,
  formatMetricValue,
  calculateContentScore,
  formatSeverity,
  formatUserStatus,
  generateDashboardStats
} from '@/lib/admin-utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'users' | 'content' | 'security' | 'logs'>('overview');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [maintenanceWindows, setMaintenanceWindows] = useState<MaintenanceWindow[]>([]);
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // 30 seconds
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const fetchData = async () => {
    // Fetch all dashboard data
    fetchSystemMetrics();
    fetchNotifications();
    fetchAuditLogs();
    fetchUsers();
    fetchContent();
    fetchMaintenanceWindows();
  };

  const fetchSystemMetrics = async () => {
    // Mock data - replace with API call
    setSystemMetrics({
      timestamp: new Date().toISOString(),
      cpu: {
        usage: 45.2,
        cores: 8,
        loadAverage: [2.1, 1.8, 1.5],
        processes: 234,
        threads: 512
      },
      memory: {
        total: 16 * 1024 * 1024 * 1024,
        used: 10 * 1024 * 1024 * 1024,
        free: 6 * 1024 * 1024 * 1024,
        percentage: 62.5,
        swap: {
          total: 8 * 1024 * 1024 * 1024,
          used: 2 * 1024 * 1024 * 1024,
          free: 6 * 1024 * 1024 * 1024
        }
      },
      disk: {
        total: 500 * 1024 * 1024 * 1024,
        used: 350 * 1024 * 1024 * 1024,
        free: 150 * 1024 * 1024 * 1024,
        percentage: 70,
        iops: 1200,
        throughput: 450 * 1024 * 1024
      },
      network: {
        bytesIn: 125 * 1024 * 1024,
        bytesOut: 89 * 1024 * 1024,
        packetsIn: 125000,
        packetsOut: 98000,
        errors: 12,
        dropped: 3,
        latency: 15
      },
      database: {
        connections: 45,
        activeQueries: 12,
        slowQueries: 3,
        queryTime: 125,
        deadlocks: 0,
        replicationLag: 250
      },
      cache: {
        hits: 8945,
        misses: 234,
        evictions: 45,
        hitRate: 97.5,
        memory: 512 * 1024 * 1024,
        keys: 12345
      },
      queue: {
        pending: 234,
        processing: 12,
        completed: 5678,
        failed: 23,
        averageTime: 450,
        throughput: 125
      },
      errors: {
        total: 45,
        byType: {
          '404': 12,
          '500': 8,
          '503': 3
        },
        byStatus: {
          404: 12,
          500: 8,
          503: 3
        },
        critical: 2,
        warnings: 15,
        rate: 2.3
      }
    });
  };

  const fetchNotifications = async () => {
    // Mock data
    setNotifications([
      {
        id: '1',
        type: 'security',
        severity: 'warning',
        title: 'Unusual login activity detected',
        message: 'Multiple failed login attempts from IP 192.168.1.100',
        source: 'Authentication Service',
        read: false,
        acknowledged: false,
        timestamp: new Date().toISOString(),
        actions: [
          { label: 'View Details', action: 'view', style: 'primary' },
          { label: 'Block IP', action: 'block', style: 'danger' }
        ]
      },
      {
        id: '2',
        type: 'performance',
        severity: 'info',
        title: 'Database optimization completed',
        message: 'Query performance improved by 23%',
        source: 'Database Manager',
        read: true,
        acknowledged: true,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const fetchAuditLogs = async () => {
    // Mock data
    setAuditLogs([
      {
        id: '1',
        userId: 'admin_1',
        action: 'user.update',
        resource: 'user',
        resourceId: 'user_123',
        status: 'success',
        timestamp: new Date().toISOString(),
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...'
      }
    ]);
  };

  const fetchUsers = async () => {
    // Mock data
    setUsers([
      {
        id: 'user_1',
        email: 'admin@example.com',
        username: 'admin',
        role: 'super_admin',
        permissions: [],
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        lastLoginAt: new Date().toISOString(),
        metrics: {
          totalLogins: 234,
          totalActions: 5678,
          storageUsed: 1024 * 1024 * 512,
          apiCalls: 12345,
          lastActive: new Date().toISOString(),
          engagement: {
            daysActive: 120,
            sessionsPerDay: 3.5,
            averageSessionDuration: 1800000,
            bounceRate: 15,
            retentionRate: 85
          },
          usage: {
            features: {},
            devices: {},
            browsers: {},
            locations: {}
          }
        }
      }
    ]);
  };

  const fetchContent = async () => {
    // Mock data
    setContent([
      {
        id: 'content_1',
        type: 'post',
        title: 'Sample Post',
        content: 'Content here',
        author: 'user_1',
        status: 'approved',
        flags: {
          spam: false,
          inappropriate: false,
          copyright: false,
          malicious: false,
          misinformation: false,
          harassment: false,
          violence: false,
          adult: false
        },
        metadata: {
          views: 1234,
          likes: 89,
          shares: 23,
          comments: 45,
          engagement: 78,
          sentiment: 'positive'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  };

  const fetchMaintenanceWindows = async () => {
    // Mock data
    setMaintenanceWindows([
      {
        id: 'maint_1',
        title: 'Database Maintenance',
        description: 'Regular database optimization and backup',
        type: 'scheduled',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
        affectedServices: ['database', 'api'],
        status: 'planned',
        notifications: [],
        createdBy: 'admin',
        createdAt: new Date().toISOString()
      }
    ]);
  };

  const systemHealth = systemMetrics ? calculateSystemHealth(systemMetrics) : null;
  const dashboardStats = generateDashboardStats(users, content, systemMetrics!);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  System monitoring and administration
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Auto Refresh */}
                <div className="flex items-center">
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`p-2 rounded-lg ${
                      autoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <RefreshCw className={`h-5 w-5 ${autoRefresh ? 'animate-spin' : ''}`} />
                  </button>
                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    className="ml-2 px-3 py-2 border rounded-lg"
                  >
                    <option value={10000}>10s</option>
                    <option value={30000}>30s</option>
                    <option value={60000}>1m</option>
                    <option value={300000}>5m</option>
                  </select>
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 border-b">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: Monitor },
                  { id: 'metrics', label: 'System Metrics', icon: Activity },
                  { id: 'users', label: 'Users', icon: Users },
                  { id: 'content', label: 'Content', icon: FileText },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'logs', label: 'Audit Logs', icon: Clock }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* System Health */}
            {systemHealth && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">System Health</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full mr-3 ${
                      systemHealth.status === 'healthy' ? 'bg-green-500' :
                      systemHealth.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-2xl font-bold">{systemHealth.score}%</span>
                    <span className="ml-2 text-gray-500">Health Score</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    systemHealth.status === 'healthy' ? 'bg-green-100 text-green-800' :
                    systemHealth.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {systemHealth.status.toUpperCase()}
                  </span>
                </div>
                {systemHealth.issues.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Issues Detected:</h3>
                    <ul className="space-y-1">
                      {systemHealth.issues.map((issue, idx) => (
                        <li key={idx} className="flex items-center text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold">{dashboardStats.users.total}</p>
                    <div className="flex items-center mt-2">
                      {dashboardStats.users.growth === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className="text-sm text-gray-600">
                        {dashboardStats.users.active} active
                      </span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Content Items</p>
                    <p className="text-2xl font-bold">{dashboardStats.content.total}</p>
                    <div className="flex items-center mt-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {dashboardStats.content.flagged} flagged
                      </span>
                    </div>
                  </div>
                  <FileText className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">System Load</p>
                    <p className="text-2xl font-bold">{dashboardStats.system.load?.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Cpu className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {dashboardStats.system.uptime}
                      </span>
                    </div>
                  </div>
                  <Server className="h-8 w-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Alerts</p>
                    <p className="text-2xl font-bold">
                      {dashboardStats.alerts.critical + dashboardStats.alerts.warnings}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-red-600 mr-2">
                        {dashboardStats.alerts.critical} critical
                      </span>
                      <span className="text-sm text-yellow-600">
                        {dashboardStats.alerts.warnings} warnings
                      </span>
                    </div>
                  </div>
                  <Bell className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Maintenance Windows */}
            {maintenanceWindows.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Upcoming Maintenance
                    </h3>
                    {maintenanceWindows.map((window) => (
                      <div key={window.id} className="mt-2">
                        <p className="text-sm text-yellow-700">
                          <strong>{window.title}</strong> - {window.type}
                        </p>
                        <p className="text-xs text-yellow-600">
                          {new Date(window.startTime).toLocaleString()} - 
                          {new Date(window.endTime).toLocaleString()}
                        </p>
                        <p className="text-xs text-yellow-600">
                          Affected: {window.affectedServices.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* System Metrics Tab */}
        {activeTab === 'metrics' && systemMetrics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CPU Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">CPU</h3>
                  <Cpu className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Usage</span>
                      <span className="font-medium">{systemMetrics.cpu.usage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${systemMetrics.cpu.usage}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Cores:</span>
                      <span className="ml-2 font-medium">{systemMetrics.cpu.cores}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Processes:</span>
                      <span className="ml-2 font-medium">{systemMetrics.cpu.processes}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Threads:</span>
                      <span className="ml-2 font-medium">{systemMetrics.cpu.threads}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Load Avg:</span>
                      <span className="ml-2 font-medium">
                        {systemMetrics.cpu.loadAverage[0].toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Memory Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Memory</h3>
                  <MemoryStick className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Usage</span>
                      <span className="font-medium">
                        {formatMetricValue(systemMetrics.memory.used, 'bytes')} / 
                        {formatMetricValue(systemMetrics.memory.total, 'bytes')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${systemMetrics.memory.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Free:</span>
                      <span className="ml-2 font-medium">
                        {formatMetricValue(systemMetrics.memory.free, 'bytes')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Swap Used:</span>
                      <span className="ml-2 font-medium">
                        {formatMetricValue(systemMetrics.memory.swap.used, 'bytes')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disk Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Disk</h3>
                  <HardDrive className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Usage</span>
                      <span className="font-medium">
                        {formatMetricValue(systemMetrics.disk.used, 'bytes')} / 
                        {formatMetricValue(systemMetrics.disk.total, 'bytes')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${systemMetrics.disk.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">IOPS:</span>
                      <span className="ml-2 font-medium">{systemMetrics.disk.iops}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Throughput:</span>
                      <span className="ml-2 font-medium">
                        {formatMetricValue(systemMetrics.disk.throughput, 'bytes')}/s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Network</h3>
                  <Wifi className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">In:</span>
                      <span className="ml-2 font-medium">
                        {formatMetricValue(systemMetrics.network.bytesIn, 'bytes')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Out:</span>
                      <span className="ml-2 font-medium">
                        {formatMetricValue(systemMetrics.network.bytesOut, 'bytes')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Latency:</span>
                      <span className="ml-2 font-medium">{systemMetrics.network.latency}ms</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Errors:</span>
                      <span className="ml-2 font-medium">{systemMetrics.network.errors}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Database & Cache */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Database Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Database</h3>
                  <Database className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Connections:</span>
                    <span className="ml-2 font-medium">{systemMetrics.database.connections}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Active Queries:</span>
                    <span className="ml-2 font-medium">{systemMetrics.database.activeQueries}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Slow Queries:</span>
                    <span className="ml-2 font-medium text-yellow-600">
                      {systemMetrics.database.slowQueries}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Query Time:</span>
                    <span className="ml-2 font-medium">{systemMetrics.database.queryTime}ms</span>
                  </div>
                </div>
              </div>

              {/* Cache Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Cache</h3>
                  <Zap className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hit Rate</span>
                      <span className="font-medium">{systemMetrics.cache.hitRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${systemMetrics.cache.hitRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Hits:</span>
                      <span className="ml-2 font-medium">{systemMetrics.cache.hits}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Misses:</span>
                      <span className="ml-2 font-medium">{systemMetrics.cache.misses}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Keys:</span>
                      <span className="ml-2 font-medium">{systemMetrics.cache.keys}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Memory:</span>
                      <span className="ml-2 font-medium">
                        {formatMetricValue(systemMetrics.cache.memory, 'bytes')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold">User Management</h2>
              <p className="text-gray-500 mt-2">Manage system users and permissions</p>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Content Moderation</h2>
              <p className="text-gray-500 mt-2">Review and moderate user-generated content</p>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Security Center</h2>
              <p className="text-gray-500 mt-2">Monitor security events and manage access controls</p>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Audit Logs</h2>
              <p className="text-gray-500 mt-2">Track all system activities and changes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}