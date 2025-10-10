import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/revoke-session
 * Revoke a specific session (sign out from a device)
 *
 * Request body:
 * - sessionId: string (ID of the session to revoke)
 *
 * Response:
 * - success: boolean
 * - message: string
 *
 * Auth: Requires authenticated user
 * Security: Can only revoke own sessions
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    // Find the session
    const targetSession = await prisma.session.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        userId: true,
        deviceName: true,
        deviceType: true,
        createdAt: true,
      },
    });

    if (!targetSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Security check: Verify the session belongs to the authenticated user
    if (targetSession.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only revoke your own sessions' },
        { status: 403 }
      );
    }

    // Delete the session
    await prisma.session.delete({
      where: { id: sessionId },
    });

    // Log the revocation for audit trail
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'session_revoked',
        details: `Revoked session from ${targetSession.deviceName || 'Unknown Device'}`,
        metadata: {
          sessionId: targetSession.id,
          deviceType: targetSession.deviceType,
          revokedAt: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Session revoked successfully. You have been signed out from ${targetSession.deviceName || 'that device'}.`,
      revokedSession: {
        id: targetSession.id,
        deviceName: targetSession.deviceName,
        deviceType: targetSession.deviceType,
      },
    });

  } catch (error) {
    console.error('Session revocation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to revoke session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/revoke-session
 * Alternative method using DELETE verb
 */
export async function DELETE(request: NextRequest) {
  return POST(request);
}
