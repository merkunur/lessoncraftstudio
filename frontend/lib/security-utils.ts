import {
  SecurityScan,
  SecurityFinding,
  ComplianceReport,
  ComplianceRequirement,
  AuditLog,
  SecurityIncident,
  SecurityMetric,
  SecurityAlert,
  DataPrivacy,
  SecurityConfiguration
} from '@/types/security';
import crypto from 'crypto';

// Calculate security score based on various metrics
export const calculateSecurityScore = (
  vulnerabilities: SecurityFinding[],
  complianceScore: number,
  incidentCount: number,
  configurationIssues: number
): number => {
  let score = 100;

  // Deduct for vulnerabilities
  const critical = vulnerabilities.filter(v => v.severity === 'critical').length;
  const high = vulnerabilities.filter(v => v.severity === 'high').length;
  const medium = vulnerabilities.filter(v => v.severity === 'medium').length;
  
  score -= critical * 10;
  score -= high * 5;
  score -= medium * 2;

  // Factor in compliance
  score *= (complianceScore / 100);

  // Deduct for recent incidents
  score -= incidentCount * 3;

  // Deduct for configuration issues
  score -= configurationIssues * 1;

  return Math.max(0, Math.min(100, Math.round(score)));
};

// Calculate CVSS score from vector
export const calculateCVSSScore = (vector: string): number => {
  // Simplified CVSS v3.1 calculation
  const metrics = vector.split('/').reduce((acc, metric) => {
    const [key, value] = metric.split(':');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  // Base score calculation (simplified)
  const av = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 };
  const ac = { L: 0.77, H: 0.44 };
  const pr = { N: 0.85, L: 0.62, H: 0.27 };
  const ui = { N: 0.85, R: 0.62 };
  const s = { U: 0, C: 1 };
  const c = { N: 0, L: 0.22, H: 0.56 };
  const i = { N: 0, L: 0.22, H: 0.56 };
  const a = { N: 0, L: 0.22, H: 0.56 };

  const attackVector = av[metrics.AV] || 0.85;
  const attackComplexity = ac[metrics.AC] || 0.77;
  const privilegesRequired = pr[metrics.PR] || 0.85;
  const userInteraction = ui[metrics.UI] || 0.85;
  const scope = s[metrics.S] || 0;
  const confidentiality = c[metrics.C] || 0;
  const integrity = i[metrics.I] || 0;
  const availability = a[metrics.A] || 0;

  const impact = 1 - ((1 - confidentiality) * (1 - integrity) * (1 - availability));
  const exploitability = 8.22 * attackVector * attackComplexity * privilegesRequired * userInteraction;

  let baseScore = 0;
  if (impact <= 0) {
    baseScore = 0;
  } else if (scope === 0) {
    baseScore = Math.min(impact + exploitability, 10);
  } else {
    baseScore = Math.min(1.08 * (impact + exploitability), 10);
  }

  return Math.round(baseScore * 10) / 10;
};

// Check compliance status
export const checkComplianceStatus = (
  requirements: ComplianceRequirement[]
): { status: 'compliant' | 'non-compliant' | 'partial'; score: number } => {
  const total = requirements.length;
  const met = requirements.filter(r => r.status === 'met').length;
  const partial = requirements.filter(r => r.status === 'partial').length;
  const notApplicable = requirements.filter(r => r.status === 'not-applicable').length;
  
  const applicable = total - notApplicable;
  const score = applicable > 0 ? ((met + partial * 0.5) / applicable) * 100 : 100;
  
  let status: 'compliant' | 'non-compliant' | 'partial';
  if (score >= 100) {
    status = 'compliant';
  } else if (score >= 70) {
    status = 'partial';
  } else {
    status = 'non-compliant';
  }

  return { status, score: Math.round(score) };
};

// Analyze audit logs for anomalies
export const detectAnomalies = (logs: AuditLog[]): AuditLog[] => {
  const anomalies: AuditLog[] = [];
  
  // Group logs by user
  const userLogs = logs.reduce((acc, log) => {
    if (!acc[log.userId]) acc[log.userId] = [];
    acc[log.userId].push(log);
    return acc;
  }, {} as Record<string, AuditLog[]>);

  Object.entries(userLogs).forEach(([userId, userLogList]) => {
    // Check for unusual access patterns
    const locations = new Set(userLogList.map(l => l.location?.country).filter(Boolean));
    if (locations.size > 3) {
      // Multiple locations in short time
      userLogList.forEach(log => {
        if (!log.anomaly) {
          log.anomaly = true;
          log.risk = 'high';
          anomalies.push(log);
        }
      });
    }

    // Check for after-hours access
    userLogList.forEach(log => {
      const hour = new Date(log.timestamp).getHours();
      if ((hour < 6 || hour > 22) && !log.anomaly) {
        log.anomaly = true;
        log.risk = 'medium';
        anomalies.push(log);
      }
    });

    // Check for high frequency actions
    const timeGroups = userLogList.reduce((acc, log) => {
      const minute = Math.floor(new Date(log.timestamp).getTime() / 60000);
      if (!acc[minute]) acc[minute] = 0;
      acc[minute]++;
      return acc;
    }, {} as Record<number, number>);

    Object.entries(timeGroups).forEach(([minute, count]) => {
      if (count > 10) {
        // More than 10 actions per minute
        userLogList
          .filter(l => Math.floor(new Date(l.timestamp).getTime() / 60000) === parseInt(minute))
          .forEach(log => {
            if (!log.anomaly) {
              log.anomaly = true;
              log.risk = 'high';
              anomalies.push(log);
            }
          });
      }
    });
  });

  return anomalies;
};

// Calculate Mean Time To Remediate (MTTR)
export const calculateMTTR = (findings: SecurityFinding[]): number => {
  const resolved = findings.filter(f => f.acknowledgedAt);
  if (resolved.length === 0) return 0;

  const totalTime = resolved.reduce((sum, finding) => {
    const detected = new Date(finding.id.split('_')[1] || Date.now()).getTime();
    const resolved = new Date(finding.acknowledgedAt!).getTime();
    return sum + (resolved - detected);
  }, 0);

  return Math.round(totalTime / resolved.length / (1000 * 60 * 60 * 24)); // Days
};

// Prioritize security findings
export const prioritizeFindings = (
  findings: SecurityFinding[]
): SecurityFinding[] => {
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
  
  return findings.sort((a, b) => {
    // First by severity
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;
    
    // Then by CVSS score if available
    const scoreA = a.cvss?.score || 0;
    const scoreB = b.cvss?.score || 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    
    // Then by exploitability
    const effortOrder = { low: 0, medium: 1, high: 2 };
    const effortA = effortOrder[a.remediation?.effort || 'high'];
    const effortB = effortOrder[b.remediation?.effort || 'high'];
    
    return effortA - effortB;
  });
};

// Check password strength
export const checkPasswordStrength = (password: string): {
  score: number;
  strength: 'weak' | 'fair' | 'good' | 'strong';
  suggestions: string[];
} => {
  let score = 0;
  const suggestions: string[] = [];

  // Length
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 20;
  if (password.length >= 16) score += 10;
  if (password.length < 8) suggestions.push('Use at least 8 characters');

  // Complexity
  if (/[a-z]/.test(password)) score += 10;
  else suggestions.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 10;
  else suggestions.push('Add uppercase letters');
  
  if (/[0-9]/.test(password)) score += 10;
  else suggestions.push('Add numbers');
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 20;
  else suggestions.push('Add special characters');

  // Common patterns to avoid
  if (/^[0-9]+$/.test(password)) {
    score -= 20;
    suggestions.push('Don\'t use only numbers');
  }
  if (/^[a-zA-Z]+$/.test(password)) {
    score -= 10;
    suggestions.push('Mix letters with numbers and symbols');
  }
  if (/(.)\1{2,}/.test(password)) {
    score -= 10;
    suggestions.push('Avoid repeating characters');
  }
  if (/12345|password|qwerty/i.test(password)) {
    score -= 30;
    suggestions.push('Avoid common passwords');
  }

  score = Math.max(0, Math.min(100, score));

  let strength: 'weak' | 'fair' | 'good' | 'strong';
  if (score < 40) strength = 'weak';
  else if (score < 60) strength = 'fair';
  else if (score < 80) strength = 'good';
  else strength = 'strong';

  return { score, strength, suggestions };
};

// Generate secure token
export const generateSecureToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Hash sensitive data
export const hashData = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Encrypt sensitive data
export const encryptData = (data: string, key: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'hex'),
    iv
  );
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt sensitive data
export const decryptData = (encryptedData: string, key: string): string => {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'hex'),
    iv
  );
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

// Check if data should be encrypted
export const shouldEncrypt = (dataType: string): boolean => {
  const sensitiveTypes = [
    'password',
    'ssn',
    'credit_card',
    'bank_account',
    'medical_record',
    'personal_id',
    'api_key',
    'private_key',
    'secret'
  ];
  
  return sensitiveTypes.some(type => 
    dataType.toLowerCase().includes(type)
  );
};

// Calculate incident impact score
export const calculateIncidentImpact = (
  incident: SecurityIncident
): number => {
  let score = 0;
  
  // Severity
  const severityScores = { critical: 40, high: 30, medium: 20, low: 10 };
  score += severityScores[incident.severity];
  
  // Affected users
  if (incident.affectedUsers > 1000) score += 20;
  else if (incident.affectedUsers > 100) score += 15;
  else if (incident.affectedUsers > 10) score += 10;
  else if (incident.affectedUsers > 0) score += 5;
  
  // Data compromised
  if (incident.dataCompromised?.sensitive) score += 20;
  if (incident.dataCompromised?.type.length) score += 10;
  
  // Financial impact
  if (incident.impact.financial && incident.impact.financial > 100000) score += 20;
  else if (incident.impact.financial && incident.impact.financial > 10000) score += 10;
  
  // Regulatory impact
  if (incident.impact.regulatory) score += 15;
  
  return Math.min(100, score);
};

// Format security alerts
export const formatSecurityAlert = (
  alert: SecurityAlert
): string => {
  const severityEmoji = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🔵',
    info: '⚪'
  };
  
  return `${severityEmoji[alert.severity]} [${alert.severity.toUpperCase()}] ${alert.title}\n` +
         `Type: ${alert.type}\n` +
         `Time: ${new Date(alert.timestamp).toLocaleString()}\n` +
         `Affected: ${alert.affectedResources.join(', ')}\n` +
         `Description: ${alert.description}\n` +
         `Recommendations: ${alert.recommended.join('; ')}`;
};

// Check data retention compliance
export const checkDataRetention = (
  privacy: DataPrivacy,
  currentDate: Date = new Date()
): { compliant: boolean; action?: string } => {
  if (privacy.deletionRequested && privacy.deletionScheduled) {
    const scheduledDate = new Date(privacy.deletionScheduled);
    if (currentDate > scheduledDate) {
      return { compliant: false, action: 'Delete user data immediately' };
    }
  }
  
  if (privacy.consentDate) {
    const consentAge = Math.floor(
      (currentDate.getTime() - new Date(privacy.consentDate).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    if (consentAge > privacy.retentionPeriod) {
      return { compliant: false, action: 'Data retention period exceeded' };
    }
  }
  
  return { compliant: true };
};

// Validate security configuration
export const validateSecurityConfig = (
  configs: SecurityConfiguration[]
): Array<{ config: SecurityConfiguration; issue: string }> => {
  const issues: Array<{ config: SecurityConfiguration; issue: string }> = [];
  
  configs.forEach(config => {
    if (!config.secure) {
      issues.push({
        config,
        issue: `Insecure configuration: ${config.setting}`
      });
    }
    
    if (config.risk && ['high', 'critical'].includes(config.risk)) {
      issues.push({
        config,
        issue: `High risk configuration: ${config.setting} - ${config.recommendation || 'Review immediately'}`
      });
    }
    
    // Check for default values on sensitive settings
    if (config.value === config.defaultValue && 
        ['password', 'secret', 'key', 'token'].some(term => 
          config.setting.toLowerCase().includes(term)
        )) {
      issues.push({
        config,
        issue: `Default value used for sensitive setting: ${config.setting}`
      });
    }
  });
  
  return issues;
};

// Generate compliance evidence
export const generateComplianceEvidence = (
  requirement: ComplianceRequirement,
  data: any
): string => {
  const evidence = {
    requirement: requirement.requirement,
    category: requirement.category,
    status: requirement.status,
    verificationDate: new Date().toISOString(),
    data: data,
    hash: hashData(JSON.stringify(data))
  };
  
  return JSON.stringify(evidence, null, 2);
};

// Risk scoring for vulnerabilities
export const calculateRiskScore = (
  finding: SecurityFinding
): number => {
  let score = 0;
  
  // Base on severity
  const severityScores = { critical: 50, high: 40, medium: 25, low: 10, info: 5 };
  score = severityScores[finding.severity];
  
  // Adjust based on CVSS if available
  if (finding.cvss?.score) {
    score = Math.max(score, finding.cvss.score * 10);
  }
  
  // Increase if actively exploited
  if (finding.cve && finding.type === 'vulnerability') {
    score *= 1.5;
  }
  
  // Decrease if remediation is easy
  if (finding.remediation?.effort === 'low') {
    score *= 0.8;
  }
  
  return Math.min(100, Math.round(score));
};

// Security posture assessment
export const assessSecurityPosture = (
  metrics: SecurityMetric[]
): { score: number; level: string; recommendations: string[] } => {
  const recommendations: string[] = [];
  let totalScore = 0;
  let metricCount = 0;
  
  metrics.forEach(metric => {
    let metricScore = 0;
    
    if (metric.status === 'good') metricScore = 100;
    else if (metric.status === 'warning') metricScore = 60;
    else metricScore = 20;
    
    if (metric.target && metric.value > metric.target) {
      metricScore *= (metric.target / metric.value);
    }
    
    totalScore += metricScore;
    metricCount++;
    
    if (metric.status !== 'good') {
      recommendations.push(
        `Improve ${metric.metric}: Current ${metric.value}${metric.unit}, ` +
        `Target ${metric.target || 'N/A'}${metric.unit}`
      );
    }
  });
  
  const averageScore = metricCount > 0 ? totalScore / metricCount : 0;
  
  let level: string;
  if (averageScore >= 90) level = 'Excellent';
  else if (averageScore >= 75) level = 'Good';
  else if (averageScore >= 60) level = 'Fair';
  else if (averageScore >= 40) level = 'Poor';
  else level = 'Critical';
  
  if (level === 'Poor' || level === 'Critical') {
    recommendations.unshift('Immediate security improvements required');
  }
  
  return {
    score: Math.round(averageScore),
    level,
    recommendations
  };
};