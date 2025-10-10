import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractBearerToken, verifyAccessToken } from '@/lib/auth-utils';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Try to verify token normally
    let payload = verifyAccessToken(token);
    let userId: string | null = null;

    if (payload) {
      // Token is valid
      userId = payload.userId;
    } else {
      // Token is expired or invalid - decode without verification to get userId
      // This ensures signout always works, even with expired tokens
      try {
        const decoded = jwt.decode(token) as any;
        if (decoded && decoded.userId) {
          userId = decoded.userId;
          console.log('Signout with expired token for user:', userId);
        }
      } catch (decodeError) {
        console.error('Failed to decode token:', decodeError);
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401 }
      );
    }

    // For single-device policy: Delete ALL sessions for this user
    // This ensures clean slate and prevents zombie sessions
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        userId: userId,
      }
    });

    console.log(`Signout: Deleted ${deletedSessions.count} session(s) for user ${userId}`);

    // Log the signout
    await prisma.activityLog.create({
      data: {
        userId: userId,
        action: 'logout',
        details: `User signed out (deleted ${deletedSessions.count} sessions)`,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      }
    });

    // Clear the refresh token cookie
    const response = NextResponse.json({
      success: true,
      message: 'Signed out successfully',
      sessionsDeleted: deletedSessions.count,
    });

    response.cookies.delete('refreshToken');

    return response;

  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signout' },
      { status: 500 }
    );
  }
}