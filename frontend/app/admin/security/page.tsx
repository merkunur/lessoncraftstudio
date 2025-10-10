'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Shield,
  AlertTriangle,
  Lock,
  Key,
  FileText,
  Eye,
  UserCheck,
  Database,
  Activity,
  CheckCircle,
  XCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  RefreshCw,
  Settings,
  AlertOctagon,
  ShieldCheck,
  ShieldOff,
  FileSearch,
  UserX,
  Unlock,
  HardDrive,
  Fingerprint,
  Globe,
  Clock
} from 'lucide-react';
import {
  SecurityScan,
  SecurityFinding,
  ComplianceReport,
  AuditLog,
  SecurityIncident,
  SecurityAlert,
  DataEncryption,
  AccessControl,
  SecurityMetric,
  PenetrationTest,
  SecurityDashboard as DashboardType,
  DataPrivacy
} from '@/types/security';
import {
  calculateSecurityScore,
  checkComplianceStatus,
  detectAnomalies,
  calculateMTTR,
  prioritizeFindings,
  checkPasswordStrength,
  calculateIncidentImpact,
  assessSecurityPosture,
  validateSecurityConfig,
  calculateRiskScore
} from '@/lib/security-utils';

interface TabConfig {
  id: string;
  label: string;
  icon: JSX.Element;
}

const tabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: <Shield className="w-4 h-4" /> },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'compliance', label: 'Compliance', icon: <FileText className="w-4 h-4" /> },
  { id: 'audit', label: 'Audit Logs', icon: <Activity className="w-4 h-4" /> },
  { id: 'incidents', label: 'Incidents', icon: <AlertOctagon className="w-4 h-4" /> },
  { id: 'access', label: 'Access Control', icon: <UserCheck className="w-4 h-4" /> },
  { id: 'encryption', label: 'Encryption', icon: <Lock className="w-4 h-4" /> },
  { id: 'privacy', label: 'Data Privacy', icon: <Eye className="w-4 h-4" /> },
  { id: 'pentests', label: 'Penetration Tests', icon: <Search className="w-4 h-4" /> },
  { id: 'alerts', label: 'Security Alerts', icon: <AlertTriangle className="w-4 h-4" /> }
];

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [compliance, setCompliance] = useState<ComplianceReport[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [encryption, setEncryption] = useState<DataEncryption[]>([]);
  const [accessControls, setAccessControls] = useState<AccessControl[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [penTests, setPenTests] = useState<PenetrationTest[]>([]);
  const [privacy, setPrivacy] = useState<DataPrivacy[]>([]);
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout>();

  // Load security data
  const loadSecurityData = useCallback(async () => {
    setIsLoading(true);
    try {
      const responses = await Promise.allSettled([
        fetch('/api/security/scans'),
        fetch('/api/security/compliance'),
        fetch('/api/security/audit'),
        fetch('/api/security/incidents'),
        fetch('/api/security/alerts'),
        fetch('/api/security/encryption'),
        fetch('/api/security/access'),
        fetch('/api/security/metrics'),
        fetch('/api/security/pentests'),
        fetch('/api/security/privacy'),
        fetch('/api/security/dashboard')
      ]);

      responses.forEach(async (response, index) => {
        if (response.status === 'fulfilled' && response.value.ok) {
          const data = await response.value.json();
          switch (index) {
            case 0:
              setScans(data);
              setFindings(data.flatMap((s: SecurityScan) => s.findings));
              break;
            case 1:
              setCompliance(data);
              break;
            case 2:
              setAuditLogs(data);
              break;
            case 3:
              setIncidents(data);
              break;
            case 4:
              setAlerts(data);
              break;
            case 5:
              setEncryption(data);
              break;
            case 6:
              setAccessControls(data);
              break;
            case 7:
              setMetrics(data);
              break;
            case 8:
              setPenTests(data);
              break;
            case 9:
              setPrivacy(data);
              break;
            case 10:
              setDashboard(data);
              break;
          }
        }
      });
    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh
  useEffect(() => {
    loadSecurityData();

    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(loadSecurityData, 60000); // 1 minute
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [autoRefresh, loadSecurityData]);

  // Calculate overall security score
  const overallScore = calculateSecurityScore(
    findings,
    compliance[0]?.score || 0,
    incidents.filter(i => i.status !== 'resolved').length,
    metrics.filter(m => m.status === 'critical').length
  );

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'info':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Filter findings based on search and severity
  const filteredFindings = findings.filter(finding => {
    const matchesSearch = searchTerm === '' ||
      finding.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      finding.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = selectedSeverity === 'all' ||
      finding.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  // Get prioritized findings
  const prioritizedFindings = prioritizeFindings(filteredFindings);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Security & Compliance
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor security vulnerabilities, ensure compliance, and protect user data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                autoRefresh
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>
            <button
              onClick={loadSecurityData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Scan Now
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Security Score</span>
              <Shield className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{overallScore}</div>
            <div className={`text-sm ${
              overallScore >= 80 ? 'text-green-600' :
              overallScore >= 60 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {overallScore >= 80 ? 'Good' :
               overallScore >= 60 ? 'Fair' :
               'Poor'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Compliance</span>
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{dashboard.overview.complianceScore}%</div>
            <div className="text-sm text-gray-500">
              {dashboard.compliance.frameworks.filter(f => f.status === 'compliant').length}/{dashboard.compliance.frameworks.length} compliant
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Vulnerabilities</span>
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{dashboard.overview.openVulnerabilities}</div>
            <div className="text-sm text-red-600">
              {dashboard.vulnerabilities.bySeverity.critical || 0} critical
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Incidents</span>
              <AlertOctagon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{dashboard.overview.activeIncidents}</div>
            <div className="text-sm text-gray-500">
              MTTR: {dashboard.incidents.mttr}h
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Failed Logins</span>
              <UserX className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{dashboard.overview.failedLogins24h}</div>
            <div className="text-sm text-gray-500">Last 24h</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">MFA Adoption</span>
              <Fingerprint className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{dashboard.access.mfaAdoption}%</div>
            <div className="text-sm text-gray-500">
              {dashboard.access.activeUsers} users
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && dashboard && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Security Overview</h2>

              {/* Critical Alerts */}
              {alerts.filter(a => a.severity === 'critical' && !a.resolved).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5" />
                    Critical Security Alerts
                  </h3>
                  <div className="space-y-2">
                    {alerts
                      .filter(a => a.severity === 'critical' && !a.resolved)
                      .slice(0, 3)
                      .map((alert) => (
                        <div key={alert.id} className="text-sm">
                          <div className="font-medium text-red-700">{alert.title}</div>
                          <div className="text-red-600">{alert.description}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Security Posture */}
              <div>
                <h3 className="font-semibold mb-3">Security Posture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Vulnerability Management</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dashboard.vulnerabilities.meanTimeToRemediate <= 7
                          ? 'bg-green-100 text-green-700'
                          : dashboard.vulnerabilities.meanTimeToRemediate <= 14
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {dashboard.vulnerabilities.meanTimeToRemediate}d MTTR
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Critical:</span>
                        <span className="font-mono">{dashboard.vulnerabilities.bySeverity.critical || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High:</span>
                        <span className="font-mono">{dashboard.vulnerabilities.bySeverity.high || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium:</span>
                        <span className="font-mono">{dashboard.vulnerabilities.bySeverity.medium || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Compliance Status</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dashboard.overview.complianceScore >= 90
                          ? 'bg-green-100 text-green-700'
                          : dashboard.overview.complianceScore >= 70
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {dashboard.overview.complianceScore}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dashboard.compliance.frameworks.map((framework) => (
                        <div key={framework.name} className="flex justify-between text-sm">
                          <span>{framework.name}:</span>
                          <span className={`font-medium ${
                            framework.status === 'compliant' ? 'text-green-600' :
                            framework.status === 'partial' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {framework.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Incident Response</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {dashboard.incidents.mttr}h MTTR
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Active:</span>
                        <span className="font-mono">{dashboard.incidents.active}</span>
                      </div>
                      {Object.entries(dashboard.incidents.byType).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="capitalize">{type.replace('-', ' ')}:</span>
                          <span className="font-mono">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold mb-3">Recent Security Activity</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...alerts, ...incidents.map(i => ({
                        id: i.id,
                        timestamp: i.timestamp,
                        type: 'incident',
                        title: i.title,
                        severity: i.severity
                      }))]
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .slice(0, 5)
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(item.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="capitalize">{item.type}</span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {item.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Vulnerabilities Tab */}
          {activeTab === 'vulnerabilities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Vulnerability Management</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search vulnerabilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  />
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="info">Info</option>
                  </select>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Export
                  </button>
                </div>
              </div>

              {/* Vulnerability Summary */}
              <div className="grid grid-cols-5 gap-4">
                {['critical', 'high', 'medium', 'low', 'info'].map((severity) => {
                  const count = findings.filter(f => f.severity === severity).length;
                  return (
                    <div key={severity} className={`p-4 rounded-lg border ${getSeverityColor(severity)}`}>
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm capitalize">{severity}</div>
                    </div>
                  );
                })}
              </div>

              {/* Vulnerability List */}
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Finding
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Component
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CVE/CWE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CVSS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prioritizedFindings.slice(0, 10).map((finding) => (
                      <tr key={finding.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium">{finding.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{finding.description.slice(0, 100)}...</div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {finding.component || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm font-mono">
                          <div>{finding.cve || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{finding.cwe || ''}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {finding.cvss ? (
                            <div>
                              <div className="font-bold">{finding.cvss.score}</div>
                              <div className="text-xs text-gray-500">
                                {finding.cvss.score >= 9 ? 'Critical' :
                                 finding.cvss.score >= 7 ? 'High' :
                                 finding.cvss.score >= 4 ? 'Medium' : 'Low'}
                              </div>
                            </div>
                          ) : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="text-lg font-bold">
                            {calculateRiskScore(finding)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            finding.acknowledged
                              ? 'bg-green-100 text-green-700'
                              : finding.falsePositive
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {finding.acknowledged ? 'Acknowledged' :
                             finding.falsePositive ? 'False Positive' :
                             'Open'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Compliance Management</h2>

              {/* Compliance Frameworks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compliance.map((report) => {
                  const status = checkComplianceStatus(report.requirements);
                  return (
                    <div key={report.id} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{report.framework}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          status.status === 'compliant'
                            ? 'bg-green-100 text-green-700'
                            : status.status === 'partial'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {status.status}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compliance Score</span>
                          <span className="font-bold">{status.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              status.score >= 90 ? 'bg-green-600' :
                              status.score >= 70 ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${status.score}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Requirements:</span>
                          <span>{report.requirements.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Met:</span>
                          <span className="text-green-600">
                            {report.requirements.filter(r => r.status === 'met').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Partial:</span>
                          <span className="text-yellow-600">
                            {report.requirements.filter(r => r.status === 'partial').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Not Met:</span>
                          <span className="text-red-600">
                            {report.requirements.filter(r => r.status === 'not-met').length}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs text-gray-500">
                          Next Review: {new Date(report.nextReviewDate).toLocaleDateString()}
                        </div>
                        {report.certificationExpiry && (
                          <div className="text-xs text-gray-500">
                            Expires: {new Date(report.certificationExpiry).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compliance Findings */}
              {compliance.length > 0 && compliance[0].findings.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Compliance Findings</h3>
                  <div className="space-y-3">
                    {compliance[0].findings
                      .filter(f => f.status !== 'resolved')
                      .map((finding) => (
                        <div key={finding.id} className="bg-white border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{finding.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                              <p className="text-sm text-gray-700 mt-2">
                                <strong>Impact:</strong> {finding.impact}
                              </p>
                              <p className="text-sm text-blue-600 mt-1">
                                <strong>Recommendation:</strong> {finding.recommendation}
                              </p>
                            </div>
                            <div className="ml-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(finding.severity)}`}>
                                {finding.severity}
                              </span>
                              {finding.dueDate && (
                                <div className="text-xs text-gray-500 mt-2">
                                  Due: {new Date(finding.dueDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Audit Logs Tab */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>

              {/* Anomaly Detection */}
              {(() => {
                const anomalies = detectAnomalies(auditLogs);
                if (anomalies.length > 0) {
                  return (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Suspicious Activity Detected
                      </h3>
                      <div className="text-sm text-yellow-700">
                        {anomalies.length} anomalous activities detected in recent logs
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Audit Log Table */}
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resource
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {auditLogs.slice(0, 20).map((log) => (
                      <tr key={log.id} className={`hover:bg-gray-50 ${log.anomaly ? 'bg-yellow-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{log.userEmail}</div>
                          <div className="text-xs text-gray-500">{log.userId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 text-xs rounded ${
                            log.method === 'DELETE' ? 'bg-red-100 text-red-700' :
                            log.method === 'CREATE' ? 'bg-green-100 text-green-700' :
                            log.method === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {log.method}
                          </span>
                          <span className="ml-2">{log.action}</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {log.resource}
                          {log.resourceId && (
                            <div className="text-xs text-gray-500">{log.resourceId}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {log.ip}
                          {log.location?.country && (
                            <div className="text-xs text-gray-500">{log.location.country}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.risk && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              log.risk === 'critical' || log.risk === 'high'
                                ? 'bg-red-100 text-red-700'
                                : log.risk === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : log.risk === 'low'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {log.risk}
                            </span>
                          )}
                          {log.anomaly && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500 ml-1 inline" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`flex items-center gap-1 text-sm ${
                            log.result === 'success' ? 'text-green-600' :
                            log.result === 'failure' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {log.result === 'success' ? <CheckCircle className="w-4 h-4" /> :
                             log.result === 'failure' ? <XCircle className="w-4 h-4" /> :
                             <AlertTriangle className="w-4 h-4" />}
                            {log.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other tabs would follow similar patterns... */}
        </div>
      </div>
    </div>
  );
}