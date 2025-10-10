import { NextRequest, NextResponse } from 'next/server';
import { BackupSchedule } from '@/types/backup';

export const dynamic = 'force-dynamic';

// GET /api/admin/backup/schedules - Get backup schedules
export async function GET(request: NextRequest) {
  try {
    // Mock schedule data for development
    const schedules: BackupSchedule[] = [
      {
        id: 'schedule_1',
        name: 'Daily Full Backup',
        enabled: true,
        type: 'full',
        frequency: 'daily',
        time: '03:00',
        retentionPolicy: {
          keepDaily: 7,
          keepWeekly: 4,
          keepMonthly: 6,
          keepYearly: 2,
          deleteAfterDays: 730
        },
        destination: {
          type: 'cloud',
          provider: 'aws',
          bucket: 'lessoncraft-backups',
          path: '/backups/',
          region: 'us-west-2'
        },
        notifications: {
          onSuccess: false,
          onFailure: true,
          onWarning: true,
          emailRecipients: ['admin@lessoncraft.com'],
          slackWebhook: 'https://hooks.slack.com/services/...'
        },
        lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'schedule_2',
        name: 'Hourly Incremental',
        enabled: true,
        type: 'incremental',
        frequency: 'hourly',
        retentionPolicy: {
          keepDaily: 2,
          keepWeekly: 1,
          keepMonthly: 0,
          keepYearly: 0,
          deleteAfterDays: 14
        },
        destination: {
          type: 'local',
          provider: 'local',
          path: '/var/backups/incremental/'
        },
        notifications: {
          onSuccess: false,
          onFailure: true,
          onWarning: false
        },
        lastRun: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      },
      {
        id: 'schedule_3',
        name: 'Weekly Differential',
        enabled: true,
        type: 'differential',
        frequency: 'weekly',
        dayOfWeek: 0, // Sunday
        time: '02:00',
        retentionPolicy: {
          keepDaily: 0,
          keepWeekly: 4,
          keepMonthly: 3,
          keepYearly: 1,
          deleteAfterDays: 365
        },
        destination: {
          type: 'cloud',
          provider: 'aws',
          bucket: 'lessoncraft-backups',
          path: '/backups/differential/',
          region: 'us-west-2'
        },
        notifications: {
          onSuccess: true,
          onFailure: true,
          onWarning: true,
          emailRecipients: ['admin@lessoncraft.com', 'ops@lessoncraft.com']
        },
        lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        nextRun: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'schedule_4',
        name: 'Monthly Archive',
        enabled: false,
        type: 'full',
        frequency: 'monthly',
        dayOfMonth: 1,
        time: '01:00',
        retentionPolicy: {
          keepDaily: 0,
          keepWeekly: 0,
          keepMonthly: 12,
          keepYearly: 5,
          deleteAfterDays: 1825,
          archiveAfterDays: 90
        },
        destination: {
          type: 'cloud',
          provider: 'azure',
          bucket: 'lessoncraft-archives',
          path: '/archives/',
          region: 'westus2'
        },
        notifications: {
          onSuccess: true,
          onFailure: true,
          onWarning: true,
          emailRecipients: ['admin@lessoncraft.com']
        }
      }
    ];

    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Failed to get schedules:', error);
    return NextResponse.json(
      { error: 'Failed to get schedules' },
      { status: 500 }
    );
  }
}

// POST /api/admin/backup/schedules - Create new schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, create schedule in database
    const newSchedule: BackupSchedule = {
      id: `schedule_${Date.now()}`,
      ...body,
      enabled: false, // Start disabled by default
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json(newSchedule);
  } catch (error) {
    console.error('Failed to create schedule:', error);
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    );
  }
}