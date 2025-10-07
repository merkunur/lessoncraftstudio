import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseDeviceInfo, getClientIP, detectSuspiciousActivity } from '@/lib/device-fingerprint-server';

const MAX_CONCURRENT_SESSIONS = 2;

/**
 * POST /api/auth/session-check
 * Check if user can create a new session based on device limits
 *
 * Request body:
 * - userId: string
 * - deviceId: string
 *
 * Response:
 * - allowed: boolean
 * - action: string (existing_session | new_session | second_device_warning | device_limit_exceeded)
 * - message?: string
 * - activeSessions?: array (if limit exceeded)
 * - warning?: string
 * - suspiciousActivity?: boolean
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, deviceId } = body;

    if (!userId || !deviceId) {
      return NextResponse.json(
        { error: 'Missing userId or deviceId' },
        { status: 400 }
      );
    }

    // Get user agent and IP
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = getClientIP(request);
    const deviceInfo = parseDeviceInfo(userAgent, ipAddress);

    // Get all active sessions for this user
    const activeSessions = await prisma.session.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActivityAt: 'desc' },
    });

    // Check if this device already has a session
    const existingSession = activeSessions.find(s => s.deviceId === deviceId);
    if (existingSession) {
      // Update last activity
      await prisma.session.update({
        where: { id: existingSession.id },
        data: {
          lastActivityAt: new Date(),
          // Update location if changed (user might be traveling)
          country: deviceInfo.country,
          city: deviceInfo.city,
          ipAddress: deviceInfo.ipAddress,
        },
      });

      return NextResponse.json({
        allowed: true,
        action: 'existing_session',
        sessionId: existingSession.id,
        message: 'Session refreshed',
      });
    }

    // Check device limit
    if (activeSessions.length >= MAX_CONCURRENT_SESSIONS) {
      // Log account sharing attempt
      await prisma.accountSharingLog.create({
        data: {
          userId,
          eventType: 'device_limit_exceeded',
          deviceId,
          ipAddress,
          location: deviceInfo.city && deviceInfo.country
            ? `${deviceInfo.city}, ${deviceInfo.country}`
            : deviceInfo.country || 'Unknown',
          metadata: {
            deviceName: deviceInfo.deviceName,
            totalActiveSessions: activeSessions.length,
            attemptedAt: new Date().toISOString(),
          },
        },
      });

      return NextResponse.json({
        allowed: false,
        action: 'device_limit_exceeded',
        message: `You are signed in on the maximum number of devices (${MAX_CONCURRENT_SESSIONS}). Please sign out from one of your other devices first.`,
        activeSessions: activeSessions.map(s => ({
          id: s.id,
          deviceName: s.deviceName || 'Unknown Device',
          deviceType: s.deviceType || 'desktop',
          location: s.city && s.country
            ? `${s.city}, ${s.country}`
            : s.country || 'Unknown',
          lastActive: s.lastActivityAt,
          browser: s.browser,
          os: s.os,
        })),
      }, { status: 403 });
    }

    // Check for suspicious activity
    const recentSessions = await prisma.session.findMany({
      where: {
        userId,
        createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
      },
      select: {
        ipAddress: true,
        country: true,
        createdAt: true,
      },
    });

    const { impossibleTravel, rapidLogins } = detectSuspiciousActivity([
      ...recentSessions,
      {
        ipAddress,
        country: deviceInfo.country,
        createdAt: new Date()
      },
    ]);

    // Log suspicious activity
    if (impossibleTravel) {
      await prisma.accountSharingLog.create({
        data: {
          userId,
          eventType: 'impossible_travel',
          deviceId,
          ipAddress,
          location: deviceInfo.city && deviceInfo.country
            ? `${deviceInfo.city}, ${deviceInfo.country}`
            : deviceInfo.country || 'Unknown',
          metadata: {
            deviceName: deviceInfo.deviceName,
            previousSessions: recentSessions.map(s => ({
              country: s.country,
              time: s.createdAt,
            })),
          },
        },
      });
    }

    if (rapidLogins) {
      await prisma.accountSharingLog.create({
        data: {
          userId,
          eventType: 'rapid_login',
          deviceId,
          ipAddress,
          location: deviceInfo.city && deviceInfo.country
            ? `${deviceInfo.city}, ${deviceInfo.country}`
            : deviceInfo.country || 'Unknown',
          metadata: {
            deviceName: deviceInfo.deviceName,
            recentLoginCount: recentSessions.length + 1,
          },
        },
      });
    }

    // Determine response based on session count
    const isSecondDevice = activeSessions.length === 1;

    return NextResponse.json({
      allowed: true,
      action: isSecondDevice ? 'second_device_warning' : 'new_session',
      warning: isSecondDevice
        ? `This is your second device. You can only be signed in on ${MAX_CONCURRENT_SESSIONS} devices at once.`
        : undefined,
      suspiciousActivity: impossibleTravel || rapidLogins,
      suspiciousActivityDetails: {
        impossibleTravel,
        rapidLogins,
      },
      deviceInfo: {
        deviceName: deviceInfo.deviceName,
        deviceType: deviceInfo.deviceType,
        location: deviceInfo.city && deviceInfo.country
          ? `${deviceInfo.city}, ${deviceInfo.country}`
          : deviceInfo.country || 'Unknown',
      },
    });

  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
