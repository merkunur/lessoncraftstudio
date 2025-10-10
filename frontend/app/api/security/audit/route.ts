import { NextRequest, NextResponse } from 'next/server';
import { AuditLog } from '@/types/security';

export const dynamic = 'force-dynamic';

// GET /api/security/audit - Get audit logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const userId = searchParams.get('userId');
    
    const auditLogs: AuditLog[] = [
      {
        id: 'audit_1',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        userId: 'user_123',
        userEmail: 'admin@example.com',
        action: 'Delete Worksheet',
        resource: 'worksheets',
        resourceId: 'worksheet_456',
        method: 'DELETE',
        result: 'success',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        location: {
          country: 'United States',
          city: 'San Francisco',
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194
          }
        },
        metadata: {
          worksheetTitle: 'Math Practice Sheet',
          reason: 'User requested deletion'
        },
        risk: 'medium',
        anomaly: false
      },
      {
        id: 'audit_2',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        userId: 'user_456',
        userEmail: 'teacher@example.com',
        action: 'Export User Data',
        resource: 'users',
        resourceId: 'user_789',
        method: 'READ',
        result: 'success',
        ip: '10.0.0.50',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
        risk: 'high',
        anomaly: false
      },
      {
        id: 'audit_3',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        userId: 'user_789',
        userEmail: 'support@example.com',
        action: 'Update User Permissions',
        resource: 'permissions',
        resourceId: 'user_123',
        method: 'UPDATE',
        result: 'success',
        ip: '172.16.0.10',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
        changes: {
          before: { role: 'user', permissions: ['read'] },
          after: { role: 'admin', permissions: ['read', 'write', 'delete'] }
        },
        risk: 'high',
        anomaly: false
      },
      {
        id: 'audit_4',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        userId: 'user_321',
        userEmail: 'user@example.com',
        action: 'Failed Login Attempt',
        resource: 'authentication',
        method: 'EXECUTE',
        result: 'failure',
        ip: '203.0.113.42',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS)',
        location: {
          country: 'China',
          city: 'Beijing'
        },
        metadata: {
          reason: 'Invalid password',
          attempts: 3
        },
        risk: 'high',
        anomaly: true
      },
      {
        id: 'audit_5',
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        userId: 'user_123',
        userEmail: 'admin@example.com',
        action: 'Create API Key',
        resource: 'api_keys',
        resourceId: 'key_xyz',
        method: 'CREATE',
        result: 'success',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        metadata: {
          keyName: 'Production API Key',
          permissions: ['read', 'write'],
          expiresIn: '365 days'
        },
        risk: 'medium',
        anomaly: false
      },
      {
        id: 'audit_6',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        userId: 'user_654',
        userEmail: 'developer@example.com',
        action: 'Access Database Backup',
        resource: 'backups',
        resourceId: 'backup_20240101',
        method: 'READ',
        result: 'success',
        ip: '10.0.0.75',
        userAgent: 'curl/7.68.0',
        risk: 'critical',
        anomaly: false
      },
      {
        id: 'audit_7',
        timestamp: new Date(Date.now() - 2100000).toISOString(),
        userId: 'user_111',
        userEmail: 'student@example.com',
        action: 'View Worksheet',
        resource: 'worksheets',
        resourceId: 'worksheet_123',
        method: 'READ',
        result: 'success',
        ip: '192.168.1.200',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS)',
        risk: 'none',
        anomaly: false
      },
      {
        id: 'audit_8',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        userId: 'user_222',
        userEmail: 'parent@example.com',
        action: 'Update Child Settings',
        resource: 'child_accounts',
        resourceId: 'child_333',
        method: 'UPDATE',
        result: 'success',
        ip: '192.168.1.150',
        userAgent: 'Mozilla/5.0 (Android 11)',
        changes: {
          before: { screenTime: 60, ageRestriction: 8 },
          after: { screenTime: 90, ageRestriction: 10 }
        },
        risk: 'low',
        anomaly: false
      },
      {
        id: 'audit_9',
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        userId: 'user_444',
        userEmail: 'admin@example.com',
        action: 'Bulk Delete Users',
        resource: 'users',
        method: 'DELETE',
        result: 'success',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        metadata: {
          count: 25,
          reason: 'Inactive accounts cleanup'
        },
        risk: 'high',
        anomaly: false
      },
      {
        id: 'audit_10',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        userId: 'user_555',
        userEmail: 'security@example.com',
        action: 'Enable MFA',
        resource: 'security_settings',
        resourceId: 'user_666',
        method: 'UPDATE',
        result: 'success',
        ip: '10.0.0.100',
        userAgent: 'Mozilla/5.0 (X11; Ubuntu)',
        metadata: {
          mfaType: 'TOTP',
          enforced: true
        },
        risk: 'none',
        anomaly: false
      },
      {
        id: 'audit_11',
        timestamp: new Date(Date.now() - 100000).toISOString(),
        userId: 'user_123',
        userEmail: 'admin@example.com',
        action: 'Multiple Login Locations',
        resource: 'authentication',
        method: 'EXECUTE',
        result: 'success',
        ip: '198.51.100.42',
        userAgent: 'Mozilla/5.0',
        location: {
          country: 'Japan',
          city: 'Tokyo'
        },
        risk: 'critical',
        anomaly: true
      },
      {
        id: 'audit_12',
        timestamp: new Date(Date.now() - 50000).toISOString(),
        userId: 'user_123',
        userEmail: 'admin@example.com',
        action: 'Rapid API Calls',
        resource: 'api',
        method: 'EXECUTE',
        result: 'success',
        ip: '192.168.1.100',
        userAgent: 'Python/3.9 requests/2.28.0',
        metadata: {
          requestsPerMinute: 150,
          endpoint: '/api/worksheets'
        },
        risk: 'high',
        anomaly: true
      }
    ];

    // Filter by userId if provided
    const filteredLogs = userId 
      ? auditLogs.filter(log => log.userId === userId)
      : auditLogs;

    // Apply limit
    const limitedLogs = filteredLogs.slice(0, limit);

    return NextResponse.json(limitedLogs);
  } catch (error) {
    console.error('Failed to get audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to get audit logs' },
      { status: 500 }
    );
  }
}

// POST /api/security/audit - Log an audit event
export async function POST(request: NextRequest) {
  try {
    const auditLog: AuditLog = await request.json();
    
    // In production, this would store in audit database
    console.log('Recording audit log:', auditLog);
    
    return NextResponse.json({
      success: true,
      id: `audit_${Date.now()}`,
      message: 'Audit log recorded'
    });
  } catch (error) {
    console.error('Failed to record audit log:', error);
    return NextResponse.json(
      { error: 'Failed to record audit log' },
      { status: 500 }
    );
  }
}