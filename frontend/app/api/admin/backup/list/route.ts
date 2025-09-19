import { NextRequest, NextResponse } from 'next/server';
import { Backup } from '@/types/backup';

// GET /api/admin/backup/list - Get all backups
export async function GET(request: NextRequest) {
  try {
    // Mock backup data for development
    const backups: Backup[] = [
      {
        id: 'backup_1',
        name: 'backup_full_2024-12-01_0300',
        description: 'Scheduled full backup',
        type: 'full',
        status: 'completed',
        size: 524288000, // 500MB
        compressedSize: 157286400, // 150MB
        compressionRatio: 0.3,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        retentionDays: 30,
        location: {
          type: 'cloud',
          provider: 'aws',
          bucket: 'lessoncraft-backups',
          path: '/backups/2024/12/01/',
          region: 'us-west-2'
        },
        metadata: {
          version: '1.0.0',
          includesDatabase: true,
          includesFiles: true,
          includesConfig: true,
          includesLogs: false,
          applicationVersion: '2.5.0',
          databaseVersion: 'PostgreSQL 15.3',
          totalRecords: 45678,
          totalFiles: 1234,
          checksum: 'sha256:abc123def456',
          tags: ['scheduled', 'production']
        },
        encryption: {
          enabled: true,
          algorithm: 'AES-256',
          keyId: 'key_123',
          encryptedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        },
        verification: {
          verified: true,
          verifiedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          integrityCheck: 'passed',
          checksumMatch: true,
          restorable: true
        }
      },
      {
        id: 'backup_2',
        name: 'backup_incremental_2024-12-01_1200',
        description: 'Daily incremental backup',
        type: 'incremental',
        status: 'completed',
        size: 52428800, // 50MB
        compressedSize: 15728640, // 15MB
        compressionRatio: 0.3,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        retentionDays: 7,
        location: {
          type: 'local',
          provider: 'local',
          path: '/var/backups/incremental/'
        },
        metadata: {
          version: '1.0.0',
          includesDatabase: true,
          includesFiles: true,
          includesConfig: false,
          includesLogs: false,
          applicationVersion: '2.5.0',
          totalRecords: 234,
          totalFiles: 45,
          checksum: 'sha256:xyz789'
        },
        verification: {
          verified: true,
          verifiedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          integrityCheck: 'passed',
          checksumMatch: true,
          restorable: true
        }
      },
      {
        id: 'backup_3',
        name: 'backup_snapshot_2024-12-01_1500',
        type: 'snapshot',
        status: 'in_progress',
        size: 0,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        retentionDays: 1,
        location: {
          type: 'cloud',
          provider: 'aws',
          bucket: 'lessoncraft-snapshots',
          path: '/snapshots/2024/12/01/',
          region: 'us-west-2'
        },
        metadata: {
          version: '1.0.0',
          includesDatabase: true,
          includesFiles: true,
          includesConfig: true,
          includesLogs: true,
          applicationVersion: '2.5.0'
        }
      },
      {
        id: 'backup_4',
        name: 'backup_full_2024-11-30_0300',
        type: 'full',
        status: 'completed',
        size: 512000000, // 488MB
        compressedSize: 153600000, // 146MB
        compressionRatio: 0.3,
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 29 * 60 * 60 * 1000).toISOString(),
        retentionDays: 30,
        location: {
          type: 'cloud',
          provider: 'aws',
          bucket: 'lessoncraft-backups',
          path: '/backups/2024/11/30/',
          region: 'us-west-2'
        },
        metadata: {
          version: '1.0.0',
          includesDatabase: true,
          includesFiles: true,
          includesConfig: true,
          includesLogs: false,
          applicationVersion: '2.4.0',
          databaseVersion: 'PostgreSQL 15.3',
          totalRecords: 44567,
          totalFiles: 1198,
          checksum: 'sha256:def789abc',
          tags: ['scheduled', 'production']
        },
        encryption: {
          enabled: true,
          algorithm: 'AES-256',
          keyId: 'key_123'
        },
        verification: {
          verified: true,
          verifiedAt: new Date(Date.now() - 29 * 60 * 60 * 1000).toISOString(),
          integrityCheck: 'passed',
          checksumMatch: true,
          restorable: true
        }
      },
      {
        id: 'backup_5',
        name: 'backup_differential_2024-11-29_1800',
        type: 'differential',
        status: 'failed',
        size: 0,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        retentionDays: 14,
        location: {
          type: 'local',
          provider: 'local',
          path: '/var/backups/differential/'
        },
        metadata: {
          version: '1.0.0',
          includesDatabase: true,
          includesFiles: true,
          includesConfig: false,
          includesLogs: false,
          applicationVersion: '2.4.0'
        }
      }
    ];

    return NextResponse.json(backups);
  } catch (error) {
    console.error('Failed to get backups:', error);
    return NextResponse.json(
      { error: 'Failed to get backups' },
      { status: 500 }
    );
  }
}