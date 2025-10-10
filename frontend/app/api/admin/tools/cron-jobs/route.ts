import { NextRequest, NextResponse } from 'next/server';
import { CronJob } from '@/types/admin-tools';

export const dynamic = 'force-dynamic';

// GET /api/admin/tools/cron-jobs - Get cron jobs
export async function GET(request: NextRequest) {
  try {
    const jobs: CronJob[] = [
      {
        id: 'cron_1',
        name: 'Daily Backup',
        schedule: '0 3 * * *', // 3 AM daily
        command: 'backup:create --type full',
        enabled: true,
        lastRun: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        status: 'idle',
        averageDuration: 180, // 3 minutes
        successCount: 364,
        failureCount: 1,
        logs: ['Backup completed successfully', 'Size: 524MB', 'Duration: 178s']
      },
      {
        id: 'cron_2',
        name: 'Cleanup Old Files',
        schedule: '0 2 * * 0', // 2 AM every Sunday
        command: 'storage:cleanup --days 30',
        enabled: true,
        lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'idle',
        averageDuration: 45,
        successCount: 52,
        failureCount: 0
      },
      {
        id: 'cron_3',
        name: 'Send Newsletter',
        schedule: '0 10 * * 1', // 10 AM every Monday
        command: 'email:newsletter --template weekly',
        enabled: true,
        lastRun: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'idle',
        averageDuration: 120,
        successCount: 48,
        failureCount: 2
      },
      {
        id: 'cron_4',
        name: 'Generate Reports',
        schedule: '0 0 1 * *', // Midnight on 1st of each month
        command: 'reports:generate --type monthly',
        enabled: true,
        lastRun: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'idle',
        averageDuration: 300,
        successCount: 11,
        failureCount: 0
      },
      {
        id: 'cron_5',
        name: 'Health Check',
        schedule: '*/5 * * * *', // Every 5 minutes
        command: 'health:check --all-services',
        enabled: true,
        lastRun: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
        status: 'idle',
        averageDuration: 2,
        successCount: 8640,
        failureCount: 12
      },
      {
        id: 'cron_6',
        name: 'Cache Warmup',
        schedule: '0 */6 * * *', // Every 6 hours
        command: 'cache:warmup --popular-content',
        enabled: false,
        lastRun: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        status: 'idle',
        averageDuration: 30,
        successCount: 120,
        failureCount: 3
      }
    ];

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to get cron jobs:', error);
    return NextResponse.json(
      { error: 'Failed to get cron jobs' },
      { status: 500 }
    );
  }
}