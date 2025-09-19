import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractBearerToken, verifyAccessToken } from '@/lib/auth-utils';

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

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Delete the session
    await prisma.session.deleteMany({
      where: {
        userId: payload.userId,
        token,
      }
    });

    // Log the signout
    await prisma.activityLog.create({
      data: {
        userId: payload.userId,
        action: 'logout',
        details: 'User signed out',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      }
    });

    // Clear the refresh token cookie
    const response = NextResponse.json({
      success: true,
      message: 'Signed out successfully',
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