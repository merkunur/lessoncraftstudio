'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  SystemDiagnostics,
  UserImpersonation,
  DebugSession,
  FeatureFlag,
  ABTest,
  ConfigurationItem,
  MaintenanceMode,
  QueueJob,
  CronJob,
  LogEntry
} from '@/types/admin-tools';
import {
  formatBytes,
  formatUptime,
  calculateSystemHealth,
  getHealthStatus,
  evaluateFeatureFlag,
  calculateSignificance,
  validateConfigValue,
  getLogLevelColor,
  calculateQueueMetrics,
  formatResponseTime,
  getSeverityColor
} from '@/lib/admin-tools-utils';
import {
  Activity,
  Users,
  Terminal,
  ToggleLeft,
  ToggleRight,
  TestTube,
  Settings,
  Shield,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Play,
  Pause,
  RefreshCw,
  Copy,
  Download,
  Upload,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Zap,
  Lock,
  Unlock,
  UserCheck,
  AlertCircle,
  Info,
  XCircle,
  BarChart,
  TrendingUp,
  Server
} from 'lucide-react';

export default function AdminToolsPage() {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [diagnostics, setDiagnostics] = useState<SystemDiagnostics | null>(null);
  const [impersonations, setImpersonations] = useState<UserImpersonation[]>([]);
  const [debugSession, setDebugSession] = useState<DebugSession | null>(null);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [abTests, setAbTests] = useState<ABTest[]>([]);
  const [configurations, setConfigurations] = useState<ConfigurationItem[]>([]);
  const [maintenanceMode, setMaintenanceMode] = useState<MaintenanceMode | null>(null);
  const [queueJobs, setQueueJobs] = useState<QueueJob[]>([]);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAdminData();
    const interval = setInterval(loadDiagnostics, 5000); // Update diagnostics every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAdminData = async () => {
    loadDiagnostics();
    loadFeatureFlags();
    loadConfigurations();
    loadAbTests();
    loadQueueJobs();
    loadCronJobs();
    loadMaintenanceMode();
  };

  const loadDiagnostics = async () => {
    try {
      const response = await fetch('/api/admin/tools/diagnostics');
      if (response.ok) {
        const data = await response.json();
        setDiagnostics(data);
      }
    } catch (error) {
      console.error('Failed to load diagnostics:', error);
    }
  };

  const loadFeatureFlags = async () => {
    try {
      const response = await fetch('/api/admin/tools/feature-flags');
      if (response.ok) {
        const data = await response.json();
        setFeatureFlags(data);
      }
    } catch (error) {
      console.error('Failed to load feature flags:', error);
    }
  };

  const loadConfigurations = async () => {
    try {
      const response = await fetch('/api/admin/tools/configurations');
      if (response.ok) {
        const data = await response.json();
        setConfigurations(data);
      }
    } catch (error) {
      console.error('Failed to load configurations:', error);
    }
  };

  const loadAbTests = async () => {
    try {
      const response = await fetch('/api/admin/tools/ab-tests');
      if (response.ok) {
        const data = await response.json();
        setAbTests(data);
      }
    } catch (error) {
      console.error('Failed to load A/B tests:', error);
    }
  };

  const loadQueueJobs = async () => {
    try {
      const response = await fetch('/api/admin/tools/queue-jobs');
      if (response.ok) {
        const data = await response.json();
        setQueueJobs(data);
      }
    } catch (error) {
      console.error('Failed to load queue jobs:', error);
    }
  };

  const loadCronJobs = async () => {
    try {
      const response = await fetch('/api/admin/tools/cron-jobs');
      if (response.ok) {
        const data = await response.json();
        setCronJobs(data);
      }
    } catch (error) {
      console.error('Failed to load cron jobs:', error);
    }
  };

  const loadMaintenanceMode = async () => {
    try {
      const response = await fetch('/api/admin/tools/maintenance');
      if (response.ok) {
        const data = await response.json();
        setMaintenanceMode(data);
      }
    } catch (error) {
      console.error('Failed to load maintenance mode:', error);
    }
  };

  const startImpersonation = async () => {
    if (!selectedUser) return;
    try {
      const response = await fetch('/api/admin/tools/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser })
      });
      if (response.ok) {
        alert('Impersonation started. You are now viewing as the selected user.');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Failed to start impersonation:', error);
    }
  };

  const executeCommand = async () => {
    if (!consoleInput.trim()) return;
    
    const command = consoleInput.trim();
    setConsoleHistory([...consoleHistory, `> ${command}`, 'Executing...']);
    setConsoleInput('');
    
    try {
      const response = await fetch('/api/admin/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });
      
      const result = await response.json();
      setConsoleHistory(prev => [...prev.slice(0, -1), result.output || 'Command executed']);
    } catch (error) {
      setConsoleHistory(prev => [...prev.slice(0, -1), `Error: ${error}`]);
    }
    
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  };

  const toggleFeatureFlag = async (flagId: string) => {
    try {
      const response = await fetch(`/api/admin/tools/feature-flags/${flagId}/toggle`, {
        method: 'POST'
      });
      if (response.ok) {
        loadFeatureFlags();
      }
    } catch (error) {
      console.error('Failed to toggle feature flag:', error);
    }
  };

  const toggleMaintenanceMode = async () => {
    try {
      const response = await fetch('/api/admin/tools/maintenance/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: !maintenanceMode?.enabled,
          message: 'System is under maintenance. Please check back later.'
        })
      });
      if (response.ok) {
        loadMaintenanceMode();
      }
    } catch (error) {
      console.error('Failed to toggle maintenance mode:', error);
    }
  };

  const healthScore = diagnostics ? calculateSystemHealth(diagnostics) : 0;
  const healthStatus = getHealthStatus(healthScore);
  const queueMetrics = calculateQueueMetrics(queueJobs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Settings className="w-10 h-10 text-gray-600" />
            Admin Tools
          </h1>
          <p className="text-gray-600 mt-2">
            System diagnostics, debugging, and configuration management
          </p>
        </div>

        {/* Maintenance Mode Alert */}
        {maintenanceMode?.enabled && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800">Maintenance Mode Active</h3>
                <p className="text-sm text-yellow-700 mt-1">{maintenanceMode.message}</p>
              </div>
              <button
                onClick={toggleMaintenanceMode}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Disable
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'diagnostics', label: 'Diagnostics', icon: Activity },
              { id: 'impersonation', label: 'Impersonation', icon: Users },
              { id: 'console', label: 'Debug Console', icon: Terminal },
              { id: 'features', label: 'Feature Flags', icon: ToggleLeft },
              { id: 'abtests', label: 'A/B Tests', icon: TestTube },
              { id: 'config', label: 'Configuration', icon: Settings },
              { id: 'queue', label: 'Queue & Jobs', icon: Clock },
              { id: 'security', label: 'Security', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-gray-600 text-gray-800'
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
          {activeTab === 'diagnostics' && diagnostics && (
            <div className="space-y-6">
              {/* Health Score */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">System Health</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-3xl font-bold">{healthScore}%</div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${healthStatus.color}`}>
                      {healthStatus.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Uptime: {formatUptime(diagnostics.system.uptime)}</div>
                  <div>Environment: {diagnostics.system.environment}</div>
                  <div>Version: {diagnostics.system.version}</div>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">CPU</span>
                    </div>
                    <span className="text-sm font-bold">{diagnostics.system.cpu.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${diagnostics.system.cpu.usage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {diagnostics.system.cpu.cores} cores • {diagnostics.system.cpu.model}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Memory</span>
                    </div>
                    <span className="text-sm font-bold">{diagnostics.system.memory.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${diagnostics.system.memory.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatBytes(diagnostics.system.memory.used)} / {formatBytes(diagnostics.system.memory.total)}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Disk</span>
                    </div>
                    <span className="text-sm font-bold">{diagnostics.system.disk.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${diagnostics.system.disk.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatBytes(diagnostics.system.disk.used)} / {formatBytes(diagnostics.system.disk.total)}
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                    <div className="text-xl font-bold">
                      {formatResponseTime(diagnostics.performance.responseTime.average)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Requests/sec</div>
                    <div className="text-xl font-bold">
                      {diagnostics.performance.throughput.requestsPerSecond}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Error Rate</div>
                    <div className="text-xl font-bold text-red-600">
                      {diagnostics.performance.errorRate}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Active Connections</div>
                    <div className="text-xl font-bold">
                      {diagnostics.performance.activeConnections}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Services</h3>
                <div className="space-y-2">
                  {diagnostics.services.map(service => (
                    <div key={service.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          service.status === 'running' ? 'bg-green-500' :
                          service.status === 'degraded' ? 'bg-yellow-500' :
                          service.status === 'stopped' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`} />
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {service.status === 'running' && service.uptime && 
                          `Uptime: ${formatUptime(service.uptime)}`}
                        {service.healthCheck && 
                          ` • ${formatResponseTime(service.healthCheck.responseTime)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impersonation' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">User Impersonation</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Impersonate users to debug issues or provide support. All actions are logged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select User to Impersonate
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    placeholder="Enter user ID or email"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={startImpersonation}
                    disabled={!selectedUser}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Start Impersonation
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Active Impersonations</h3>
                {impersonations.length > 0 ? (
                  <div className="space-y-2">
                    {impersonations.map(imp => (
                      <div key={imp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">
                            {imp.adminEmail} → {imp.targetUserEmail}
                          </div>
                          <div className="text-sm text-gray-500">
                            Started: {new Date(imp.startedAt).toLocaleString()}
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-700">
                          End Session
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No active impersonations</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'console' && (
            <div className="space-y-4">
              <div className="bg-black text-green-400 rounded-lg p-4 font-mono text-sm">
                <div 
                  ref={consoleRef}
                  className="h-96 overflow-y-auto mb-4 space-y-1"
                >
                  <div>Admin Debug Console v1.0.0</div>
                  <div>Type 'help' for available commands</div>
                  <div>---</div>
                  {consoleHistory.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
                <div className="flex">
                  <span className="mr-2">$</span>
                  <input
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Enter command..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Quick Commands</h4>
                  <div className="space-y-1">
                    <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm font-mono">
                      cache:clear
                    </button>
                    <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm font-mono">
                      logs:tail -n 100
                    </button>
                    <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm font-mono">
                      db:status
                    </button>
                    <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm font-mono">
                      queue:stats
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Debug Options</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Verbose Logging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">API Request Logging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">SQL Query Logging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Performance Tracing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Feature Flags</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Flag
                </button>
              </div>

              <div className="space-y-3">
                {featureFlags.map(flag => (
                  <div key={flag.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{flag.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            flag.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {flag.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {flag.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <code className="bg-gray-100 px-2 py-1 rounded">{flag.key}</code>
                          {flag.type === 'percentage' && (
                            <span>Rollout: {flag.percentage}%</span>
                          )}
                          {flag.tags.length > 0 && (
                            <div className="flex gap-1">
                              {flag.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFeatureFlag(flag.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {flag.enabled ? (
                          <ToggleRight className="w-6 h-6 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'abtests' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">A/B Tests</h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Create Test
                </button>
              </div>

              <div className="space-y-4">
                {abTests.map(test => (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{test.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            test.status === 'running' ? 'bg-green-100 text-green-700' :
                            test.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                            test.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {test.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{test.hypothesis}</p>
                      </div>
                      <div className="flex gap-2">
                        {test.status === 'running' ? (
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <BarChart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {test.results && (
                      <div className="grid grid-cols-2 gap-4">
                        {test.variants.map(variant => (
                          <div key={variant.id} className="bg-gray-50 p-3 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">
                                {variant.name} {variant.control && '(Control)'}
                              </span>
                              {test.results?.winner === variant.id && (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <div className="text-sm space-y-1">
                              <div>Participants: {variant.participants}</div>
                              <div>Conversion: {((variant.conversions / variant.participants) * 100).toFixed(2)}%</div>
                              {test.results?.variantResults[variant.id]?.improvement !== undefined && (
                                <div className={`font-medium ${
                                  (test.results.variantResults[variant.id]?.improvement ?? 0) > 0
                                    ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {(test.results.variantResults[variant.id]?.improvement ?? 0) > 0 ? '+' : ''}
                                  {test.results.variantResults[variant.id]?.improvement}%
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Configuration</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border rounded-lg">
                    <option>All Environments</option>
                    <option>Development</option>
                    <option>Staging</option>
                    <option>Production</option>
                  </select>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Add Config
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {configurations.map(config => (
                  <div key={config.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {config.encrypted && <Lock className="w-4 h-4 text-gray-400" />}
                      <div>
                        <div className="font-medium">{config.key}</div>
                        <div className="text-sm text-gray-500">
                          {config.category} • {config.type} • {config.environment}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {config.type !== 'secret' && (
                        <code className="bg-white px-2 py-1 rounded border text-sm">
                          {String(config.value).substring(0, 50)}
                        </code>
                      )}
                      <button className="p-2 hover:bg-gray-200 rounded">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="space-y-6">
              {/* Queue Metrics */}
              <div className="grid grid-cols-6 gap-4">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold">{queueMetrics.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-600">{queueMetrics.active}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="bg-green-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-green-600">{queueMetrics.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-red-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-red-600">{queueMetrics.failed}</div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div className="bg-purple-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-purple-600">{queueMetrics.throughput}</div>
                  <div className="text-sm text-gray-600">Jobs/min</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-yellow-600">{queueMetrics.averageWaitTime}s</div>
                  <div className="text-sm text-gray-600">Avg Wait</div>
                </div>
              </div>

              {/* Cron Jobs */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Scheduled Jobs</h3>
                <div className="space-y-2">
                  {cronJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          job.status === 'running' ? 'bg-blue-500 animate-pulse' :
                          job.status === 'failed' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`} />
                        <div>
                          <div className="font-medium">{job.name}</div>
                          <div className="text-sm text-gray-500">
                            {job.schedule} • Next: {job.nextRun ? new Date(job.nextRun).toLocaleString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded">
                          {job.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-semibold text-blue-800">Security Monitoring</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Monitor security events, audit logs, and potential threats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Recent Security Events</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-yellow-800">Suspicious Login Attempt</div>
                          <div className="text-sm text-yellow-700">Multiple failed attempts from IP 192.168.1.1</div>
                        </div>
                        <span className="text-xs text-yellow-600">2 min ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">Permission Change</div>
                          <div className="text-sm text-gray-600">Admin role assigned to user@example.com</div>
                        </div>
                        <span className="text-xs text-gray-500">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Audit Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Admin Actions Today</span>
                      <span className="font-medium">142</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Configuration Changes</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Failed Auth Attempts</span>
                      <span className="font-medium text-red-600">23</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Active Sessions</span>
                      <span className="font-medium">1,247</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">Maintenance Mode</h4>
                  <button
                    onClick={toggleMaintenanceMode}
                    className={`px-4 py-2 rounded-lg ${
                      maintenanceMode?.enabled 
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    {maintenanceMode?.enabled ? 'Disable' : 'Enable'} Maintenance Mode
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}