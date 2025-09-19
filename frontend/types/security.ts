// Security & Compliance type definitions

export interface SecurityScan {
  id: string;
  timestamp: string;
  type: 'vulnerability' | 'dependency' | 'code' | 'infrastructure' | 'configuration';
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  scanner: string;
  version: string;
  findings: SecurityFinding[];
  summary: ScanSummary;
  metadata?: Record<string, any>;
}

export interface SecurityFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  type: string;
  title: string;
  description: string;
  component?: string;
  location?: {
    file?: string;
    line?: number;
    column?: number;
    function?: string;
  };
  cve?: string;
  cwe?: string;
  owasp?: string[];
  cvss?: {
    score: number;
    vector: string;
  };
  remediation?: {
    description: string;
    effort: 'low' | 'medium' | 'high';
    references: string[];
  };
  falsePositive?: boolean;
  acknowledged?: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export interface ScanSummary {
  totalFindings: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  newFindings: number;
  resolvedFindings: number;
  falsePositives: number;
}

export interface ComplianceReport {
  id: string;
  timestamp: string;
  framework: 'GDPR' | 'COPPA' | 'FERPA' | 'HIPAA' | 'PCI-DSS' | 'SOC2' | 'ISO27001';
  status: 'compliant' | 'non-compliant' | 'partial' | 'pending';
  score: number; // 0-100
  requirements: ComplianceRequirement[];
  findings: ComplianceFinding[];
  attestations: Attestation[];
  nextReviewDate: string;
  certificationExpiry?: string;
}

export interface ComplianceRequirement {
  id: string;
  category: string;
  requirement: string;
  description: string;
  status: 'met' | 'not-met' | 'partial' | 'not-applicable';
  evidence?: Evidence[];
  controls: string[];
  lastVerified: string;
  notes?: string;
}

export interface ComplianceFinding {
  id: string;
  requirementId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  dueDate?: string;
  assignee?: string;
  status: 'open' | 'in-progress' | 'resolved' | 'accepted';
}

export interface Evidence {
  id: string;
  type: 'document' | 'screenshot' | 'log' | 'configuration' | 'audit-report';
  title: string;
  description?: string;
  url?: string;
  uploadedAt: string;
  uploadedBy: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface Attestation {
  id: string;
  statement: string;
  attestedBy: string;
  role: string;
  date: string;
  signature?: string;
  valid: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  method: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'EXECUTE';
  result: 'success' | 'failure' | 'error';
  ip: string;
  userAgent: string;
  location?: {
    country?: string;
    city?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  metadata?: Record<string, any>;
  changes?: {
    before?: any;
    after?: any;
  };
  risk?: 'none' | 'low' | 'medium' | 'high' | 'critical';
  anomaly?: boolean;
}

export interface AccessControl {
  id: string;
  userId: string;
  resource: string;
  permissions: Permission[];
  grantedBy: string;
  grantedAt: string;
  expiresAt?: string;
  conditions?: AccessCondition[];
  active: boolean;
}

export interface Permission {
  action: string;
  effect: 'allow' | 'deny';
  scope?: string;
  constraints?: Record<string, any>;
}

export interface AccessCondition {
  type: 'time' | 'ip' | 'location' | 'device' | 'mfa' | 'custom';
  operator: 'equals' | 'not-equals' | 'contains' | 'in' | 'between';
  value: any;
}

export interface DataEncryption {
  id: string;
  timestamp: string;
  dataType: string;
  location: 'database' | 'filesystem' | 'memory' | 'transit';
  encrypted: boolean;
  algorithm?: string;
  keyId?: string;
  keyRotation?: {
    enabled: boolean;
    frequency: number; // days
    lastRotated: string;
    nextRotation: string;
  };
  compliance: {
    meetsRequirements: boolean;
    frameworks: string[];
    issues?: string[];
  };
}

export interface SecurityIncident {
  id: string;
  timestamp: string;
  type: 'breach' | 'unauthorized-access' | 'data-leak' | 'malware' | 'phishing' | 'ddos' | 'other';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'detected' | 'investigating' | 'contained' | 'resolved' | 'post-mortem';
  title: string;
  description: string;
  affectedSystems: string[];
  affectedUsers: number;
  dataCompromised?: {
    type: string[];
    volume?: string;
    sensitive: boolean;
  };
  detection: {
    method: string;
    detectedBy: string;
    detectedAt: string;
  };
  response: {
    team: string[];
    actions: IncidentAction[];
    containedAt?: string;
    resolvedAt?: string;
  };
  impact: {
    financial?: number;
    reputation?: 'none' | 'low' | 'medium' | 'high' | 'severe';
    operational?: 'none' | 'minimal' | 'moderate' | 'significant' | 'critical';
    regulatory?: boolean;
  };
  rootCause?: string;
  lessonsLearned?: string[];
}

export interface IncidentAction {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  result: string;
  notes?: string;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  type: 'access' | 'password' | 'data' | 'network' | 'application' | 'incident';
  description: string;
  version: string;
  effectiveDate: string;
  lastReviewed: string;
  nextReview: string;
  owner: string;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  rules: PolicyRule[];
  exceptions: PolicyException[];
  enforcement: 'mandatory' | 'recommended' | 'optional';
}

export interface PolicyRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
}

export interface PolicyException {
  id: string;
  ruleId: string;
  reason: string;
  approvedBy: string;
  expiresAt: string;
  risk: 'accepted' | 'mitigated' | 'transferred';
}

export interface ThreatIntelligence {
  id: string;
  timestamp: string;
  source: string;
  type: 'ip' | 'domain' | 'hash' | 'email' | 'url' | 'vulnerability';
  indicator: string;
  threatType: string[];
  confidence: 'high' | 'medium' | 'low';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  description: string;
  ioc?: IndicatorOfCompromise;
  ttl: number; // Time to live in seconds
  active: boolean;
}

export interface IndicatorOfCompromise {
  type: string;
  value: string;
  context?: string;
  tags?: string[];
  references?: string[];
}

export interface SecurityMetric {
  id: string;
  timestamp: string;
  metric: string;
  value: number;
  unit: string;
  category: 'vulnerability' | 'compliance' | 'incident' | 'access' | 'encryption';
  trend: 'improving' | 'stable' | 'degrading';
  target?: number;
  status: 'good' | 'warning' | 'critical';
}

export interface PenetrationTest {
  id: string;
  timestamp: string;
  type: 'external' | 'internal' | 'web-app' | 'mobile' | 'social-engineering';
  scope: string[];
  methodology: string;
  tester: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  findings: PenTestFinding[];
  summary: {
    totalVulnerabilities: number;
    exploited: number;
    criticalFindings: number;
    riskScore: number;
  };
  report?: {
    url: string;
    generatedAt: string;
  };
  nextTest?: string;
}

export interface PenTestFinding {
  id: string;
  vulnerability: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  exploitability: 'easy' | 'moderate' | 'difficult' | 'theoretical';
  impact: string;
  proofOfConcept?: string;
  remediation: string;
  retestResult?: 'fixed' | 'partial' | 'not-fixed' | 'pending';
}

export interface SecurityDashboard {
  overview: {
    securityScore: number;
    complianceScore: number;
    openVulnerabilities: number;
    activeIncidents: number;
    failedLogins24h: number;
    suspiciousActivities: number;
  };
  vulnerabilities: {
    total: number;
    bySeverity: Record<string, number>;
    trend: Array<{ date: string; count: number }>;
    meanTimeToRemediate: number;
  };
  compliance: {
    frameworks: Array<{
      name: string;
      status: string;
      score: number;
    }>;
    upcomingAudits: Array<{
      framework: string;
      date: string;
    }>;
  };
  incidents: {
    active: number;
    mttr: number; // Mean time to respond
    byType: Record<string, number>;
    trend: Array<{ date: string; count: number }>;
  };
  access: {
    activeUsers: number;
    privilegedUsers: number;
    dormantAccounts: number;
    mfaAdoption: number; // percentage
    recentFailures: Array<{
      user: string;
      timestamp: string;
      reason: string;
    }>;
  };
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  type: 'vulnerability' | 'intrusion' | 'policy-violation' | 'compliance' | 'anomaly';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  source: string;
  affectedResources: string[];
  recommended: string[];
  autoResponse?: {
    enabled: boolean;
    actions: string[];
    executedAt?: string;
  };
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  falsePositive: boolean;
}

export interface DataPrivacy {
  id: string;
  userId: string;
  consentGiven: boolean;
  consentDate?: string;
  purposes: string[];
  dataCategories: string[];
  retentionPeriod: number; // days
  deletionRequested?: boolean;
  deletionRequestDate?: string;
  deletionScheduled?: string;
  exportRequested?: boolean;
  exportRequestDate?: string;
  exportUrl?: string;
  preferences: {
    marketing: boolean;
    analytics: boolean;
    personalization: boolean;
    thirdPartySharing: boolean;
  };
}

export interface SecurityConfiguration {
  id: string;
  category: string;
  setting: string;
  value: any;
  defaultValue: any;
  secure: boolean;
  description: string;
  risk?: 'none' | 'low' | 'medium' | 'high' | 'critical';
  recommendation?: string;
  lastModified: string;
  modifiedBy: string;
}