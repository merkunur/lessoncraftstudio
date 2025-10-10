import { NextRequest, NextResponse } from 'next/server';
import { SecurityDashboard } from '@/types/security';

export const dynamic = 'force-dynamic';

// GET /api/security/dashboard - Get security dashboard data
export async function GET(request: NextRequest) {
  try {
    const dashboard: SecurityDashboard = {
      overview: {
        securityScore: 78,
        complianceScore: 86,
        openVulnerabilities: 23,
        activeIncidents: 2,
        failedLogins24h: 47,
        suspiciousActivities: 3
      },
      vulnerabilities: {
        total: 23,
        bySeverity: {
          critical: 1,
          high: 3,
          medium: 8,
          low: 11,
          info: 0
        },
        trend: [
          { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), count: 28 },
          { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), count: 26 },
          { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), count: 25 },
          { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), count: 24 },
          { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), count: 24 },
          { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), count: 23 },
          { date: new Date().toISOString(), count: 23 }
        ],
        meanTimeToRemediate: 7.5
      },
      compliance: {
        frameworks: [
          { name: 'GDPR', status: 'partial', score: 85 },
          { name: 'COPPA', status: 'compliant', score: 95 },
          { name: 'FERPA', status: 'partial', score: 78 },
          { name: 'SOC2', status: 'partial', score: 82 }
        ],
        upcomingAudits: [
          { framework: 'GDPR', date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() },
          { framework: 'SOC2', date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      },
      incidents: {
        active: 2,
        mttr: 4.2, // hours
        byType: {
          'unauthorized-access': 1,
          'data-leak': 0,
          'phishing': 1,
          'malware': 0,
          'ddos': 0
        },
        trend: [
          { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), count: 3 },
          { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), count: 2 },
          { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), count: 3 },
          { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), count: 1 },
          { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), count: 2 },
          { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), count: 2 },
          { date: new Date().toISOString(), count: 2 }
        ]
      },
      access: {
        activeUsers: 1234,
        privilegedUsers: 45,
        dormantAccounts: 89,
        mfaAdoption: 67.8,
        recentFailures: [
          {
            user: 'user@example.com',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            reason: 'Invalid password'
          },
          {
            user: 'admin@example.com',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            reason: 'Account locked'
          },
          {
            user: 'test@example.com',
            timestamp: new Date(Date.now() - 900000).toISOString(),
            reason: 'MFA timeout'
          }
        ]
      }
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error('Failed to get security dashboard:', error);
    return NextResponse.json(
      { error: 'Failed to get security dashboard' },
      { status: 500 }
    );
  }
}