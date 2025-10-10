import { NextRequest, NextResponse } from 'next/server';
import { QueueJob } from '@/types/admin-tools';

export const dynamic = 'force-dynamic';

// GET /api/admin/tools/queue-jobs - Get queue jobs
export async function GET(request: NextRequest) {
  try {
    const jobs: QueueJob[] = [
      {
        id: 'job_1',
        name: 'Generate PDF',
        queue: 'default',
        status: 'completed',
        priority: 1,
        attempts: 1,
        maxAttempts: 3,
        data: { worksheetId: '12345', format: 'pdf' },
        result: { url: '/downloads/worksheet_12345.pdf' },
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        processedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString()
      },
      {
        id: 'job_2',
        name: 'Send Email',
        queue: 'email',
        status: 'active',
        priority: 2,
        attempts: 1,
        maxAttempts: 5,
        data: { to: 'user@example.com', subject: 'Welcome!' },
        createdAt: new Date(Date.now() - 30 * 1000).toISOString(),
        processedAt: new Date(Date.now() - 5 * 1000).toISOString()
      },
      {
        id: 'job_3',
        name: 'Process Image',
        queue: 'media',
        status: 'pending',
        priority: 3,
        attempts: 0,
        maxAttempts: 3,
        data: { imageId: '67890', operations: ['resize', 'optimize'] },
        createdAt: new Date(Date.now() - 10 * 1000).toISOString()
      },
      {
        id: 'job_4',
        name: 'Backup Database',
        queue: 'backup',
        status: 'failed',
        priority: 1,
        attempts: 3,
        maxAttempts: 3,
        data: { type: 'incremental' },
        error: 'Connection timeout',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        processedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        nextRetryAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      },
      {
        id: 'job_5',
        name: 'Sync Analytics',
        queue: 'analytics',
        status: 'delayed',
        priority: 4,
        attempts: 0,
        maxAttempts: 1,
        data: { dateRange: 'last_24_hours' },
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        nextRetryAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to get queue jobs:', error);
    return NextResponse.json(
      { error: 'Failed to get queue jobs' },
      { status: 500 }
    );
  }
}