import { NextRequest, NextResponse } from 'next/server';
import { BackupHealth } from '@/types/backup';

export const dynamic = 'force-dynamic';

// GET /api/admin/backup/health - Get backup system health
export async function GET(request: NextRequest) {
  try {
    // Mock health data for development
    const health: BackupHealth = {
      status: 'healthy',
      lastSuccessfulBackup: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      failedBackups: 1,
      pendingBackups: 1,
      storageUsed: 850000000, // 850MB
      storageLimit: 10737418240, // 10GB
      oldestBackup: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      newestBackup: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      issues: [
        {
          id: 'issue_1',
          severity: 'medium',
          category: 'retention',
          message: '5 backups exceed retention policy',
          recommendation: 'Run cleanup job to remove old backups',
          detectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          resolved: false
        },
        {
          id: 'issue_2',
          severity: 'low',
          category: 'performance',
          message: 'Backup duration increased by 20%',
          recommendation: 'Consider optimizing database indexes',
          detectedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          resolved: false
        }
      ]
    };

    return NextResponse.json(health);
  } catch (error) {
    console.error('Failed to get backup health:', error);
    return NextResponse.json(
      { error: 'Failed to get backup health' },
      { status: 500 }
    );
  }
}