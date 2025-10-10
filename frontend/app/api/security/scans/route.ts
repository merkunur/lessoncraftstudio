import { NextRequest, NextResponse } from 'next/server';
import { SecurityScan, SecurityFinding } from '@/types/security';

export const dynamic = 'force-dynamic';

// GET /api/security/scans - Get security scans and findings
export async function GET(request: NextRequest) {
  try {
    const scans: SecurityScan[] = [
      {
        id: 'scan_1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'vulnerability',
        status: 'completed',
        startTime: new Date(Date.now() - 4200000).toISOString(),
        endTime: new Date(Date.now() - 3600000).toISOString(),
        scanner: 'Trivy',
        version: '0.45.0',
        findings: [
          {
            id: 'finding_1',
            severity: 'critical',
            type: 'vulnerability',
            title: 'SQL Injection Vulnerability',
            description: 'User input is not properly sanitized before being used in SQL queries',
            component: 'api/worksheets/[id]/route.ts',
            location: {
              file: 'api/worksheets/[id]/route.ts',
              line: 45,
              column: 12,
              function: 'getWorksheetById'
            },
            cwe: 'CWE-89',
            owasp: ['A03:2021'],
            cvss: {
              score: 9.8,
              vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'
            },
            remediation: {
              description: 'Use parameterized queries or prepared statements',
              effort: 'low',
              references: [
                'https://owasp.org/www-community/attacks/SQL_Injection',
                'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html'
              ]
            },
            falsePositive: false,
            acknowledged: false
          },
          {
            id: 'finding_2',
            severity: 'high',
            type: 'vulnerability',
            title: 'Outdated dependency with known vulnerabilities',
            description: 'lodash@4.17.19 has known security vulnerabilities',
            component: 'package.json',
            cve: 'CVE-2021-23337',
            cvss: {
              score: 7.2,
              vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N'
            },
            remediation: {
              description: 'Update lodash to version 4.17.21 or later',
              effort: 'low',
              references: [
                'https://nvd.nist.gov/vuln/detail/CVE-2021-23337'
              ]
            },
            falsePositive: false,
            acknowledged: false
          },
          {
            id: 'finding_3',
            severity: 'medium',
            type: 'vulnerability',
            title: 'Missing CSRF Protection',
            description: 'API endpoints do not implement CSRF token validation',
            component: 'middleware.ts',
            cwe: 'CWE-352',
            owasp: ['A01:2021'],
            remediation: {
              description: 'Implement CSRF token validation for state-changing operations',
              effort: 'medium',
              references: [
                'https://owasp.org/www-community/attacks/csrf'
              ]
            },
            falsePositive: false,
            acknowledged: true,
            acknowledgedBy: 'security@example.com',
            acknowledgedAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'finding_4',
            severity: 'low',
            type: 'configuration',
            title: 'Verbose Error Messages',
            description: 'Application returns detailed error messages that could aid attackers',
            component: 'error-handler.ts',
            cwe: 'CWE-209',
            remediation: {
              description: 'Implement generic error messages for production',
              effort: 'low',
              references: []
            },
            falsePositive: false,
            acknowledged: false
          }
        ],
        summary: {
          totalFindings: 4,
          critical: 1,
          high: 1,
          medium: 1,
          low: 1,
          info: 0,
          newFindings: 3,
          resolvedFindings: 0,
          falsePositives: 0
        }
      },
      {
        id: 'scan_2',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        type: 'dependency',
        status: 'completed',
        startTime: new Date(Date.now() - 86700000).toISOString(),
        endTime: new Date(Date.now() - 86400000).toISOString(),
        scanner: 'npm audit',
        version: '9.0.0',
        findings: [
          {
            id: 'finding_5',
            severity: 'high',
            type: 'vulnerability',
            title: 'Regular Expression Denial of Service',
            description: 'Package is vulnerable to ReDoS attacks',
            component: 'node_modules/validator',
            cve: 'CVE-2021-3765',
            cvss: {
              score: 7.5,
              vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H'
            },
            remediation: {
              description: 'Update validator package to latest version',
              effort: 'low',
              references: []
            },
            falsePositive: false,
            acknowledged: false
          }
        ],
        summary: {
          totalFindings: 1,
          critical: 0,
          high: 1,
          medium: 0,
          low: 0,
          info: 0,
          newFindings: 1,
          resolvedFindings: 0,
          falsePositives: 0
        }
      }
    ];

    return NextResponse.json(scans);
  } catch (error) {
    console.error('Failed to get security scans:', error);
    return NextResponse.json(
      { error: 'Failed to get security scans' },
      { status: 500 }
    );
  }
}

// POST /api/security/scans - Trigger a new security scan
export async function POST(request: NextRequest) {
  try {
    const { type, targets } = await request.json();
    
    // In production, this would trigger actual security scanning
    console.log('Triggering security scan:', { type, targets });
    
    return NextResponse.json({
      success: true,
      scanId: `scan_${Date.now()}`,
      message: 'Security scan initiated',
      estimatedTime: '5-10 minutes'
    });
  } catch (error) {
    console.error('Failed to trigger scan:', error);
    return NextResponse.json(
      { error: 'Failed to trigger scan' },
      { status: 500 }
    );
  }
}