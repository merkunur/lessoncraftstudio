import { NextRequest, NextResponse } from 'next/server';
import { MaintenanceMode } from '@/types/admin-tools';

// GET /api/admin/tools/maintenance - Get maintenance mode status
export async function GET(request: NextRequest) {
  try {
    const maintenance: MaintenanceMode = {
      enabled: false,
      message: 'System is under maintenance. Please check back later.',
      allowedIPs: ['127.0.0.1', '192.168.1.1'],
      allowedUsers: ['admin@lessoncraft.com'],
      type: 'scheduled',
      reason: 'System upgrade',
      affectedServices: ['API', 'Database']
    };

    return NextResponse.json(maintenance);
  } catch (error) {
    console.error('Failed to get maintenance mode:', error);
    return NextResponse.json(
      { error: 'Failed to get maintenance mode' },
      { status: 500 }
    );
  }
}

// POST /api/admin/tools/maintenance/toggle - Toggle maintenance mode
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, update maintenance mode in database
    const maintenance: MaintenanceMode = {
      enabled: body.enabled,
      message: body.message || 'System is under maintenance. Please check back later.',
      allowedIPs: body.allowedIPs || [],
      allowedUsers: body.allowedUsers || ['admin@lessoncraft.com'],
      startedAt: body.enabled ? new Date().toISOString() : undefined,
      estimatedEndTime: body.estimatedEndTime,
      type: body.type || 'emergency',
      reason: body.reason,
      affectedServices: body.affectedServices || []
    };

    return NextResponse.json(maintenance);
  } catch (error) {
    console.error('Failed to toggle maintenance mode:', error);
    return NextResponse.json(
      { error: 'Failed to toggle maintenance mode' },
      { status: 500 }
    );
  }
}