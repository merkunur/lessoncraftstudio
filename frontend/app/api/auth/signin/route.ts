import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

// Validation schema
const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  deviceId: z.string().optional(), // Device fingerprint ID
  rememberMe: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = signinSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const { email, password, deviceId, rememberMe } = validationResult.data;

    // Find user with subscription
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        subscription: true,
      }
    });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if account is suspended
    if (user.isSuspended) {
      return NextResponse.json(
        {
          error: 'Account suspended',
          reason: user.suspendedReason || 'Please contact support for more information'
        },
        { status: 403 }
      );
    }

    // Check if user signed up with OAuth (no password)
    if (user.oauthProvider && !user.passwordHash) {
      const providerName = user.oauthProvider.charAt(0).toUpperCase() + user.oauthProvider.slice(1);
      return NextResponse.json(
        {
          error: `This account uses ${providerName} sign-in. Please use the "${providerName}" button to sign in.`,
          oauthProvider: user.oauthProvider
        },
        { status: 400 }
      );
    }

    // Check if user has a password (shouldn't happen, but safety check)
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      // Log failed attempt
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'failed_login',
          details: 'Invalid password',
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        }
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if email is verified (optional based on settings)
    if (!user.emailVerified && process.env.REQUIRE_EMAIL_VERIFICATION === 'true') {
      return NextResponse.json(
        {
          error: 'Email not verified',
          message: 'Please check your email for the verification link',
          userId: user.id, // Allow resending verification
        },
        { status: 403 }
      );
    }

    // Validate deviceId is provided (required for single-device policy)
    if (!deviceId || deviceId.trim() === '') {
      console.error('Signin attempted without deviceId for user:', user.email);
      return NextResponse.json(
        { error: 'Device identification required. Please refresh the page and try again.' },
        { status: 400 }
      );
    }

    console.log(`Signin attempt for user ${user.email} with deviceId: ${deviceId}`);

    // STEP 1: Clean up expired sessions first
    const deletedExpired = await prisma.session.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lte: new Date() },
      }
    });

    if (deletedExpired.count > 0) {
      console.log(`Cleaned up ${deletedExpired.count} expired session(s) for user ${user.id}`);
    }

    // Also clean up stale sessions (inactive for 24+ hours)
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
        lastActivityAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    // STEP 2: Get all active (non-expired) sessions for this user
    const activeSessions = await prisma.session.findMany({
      where: {
        userId: user.id,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActivityAt: 'desc' },
    });

    console.log(`Found ${activeSessions.length} active session(s) for user ${user.id}`);

    // STEP 3: Check if this exact device already has a session
    const existingSession = activeSessions.find(s => s.deviceId === deviceId);

    if (existingSession) {
      // Same device - just refresh the existing session tokens
      console.log(`Refreshing session for same device ${deviceId}`);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);

      await prisma.session.update({
        where: { id: existingSession.id },
        data: {
          token: newAccessToken,
          refreshToken: newRefreshToken,
          lastActivityAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });

      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        sameDevice: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          subscriptionTier: user.subscriptionTier,
          emailVerified: user.emailVerified,
          language: user.language,
          isAdmin: user.isAdmin,
        },
        subscription: user.subscription,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      return response;
    }

    // STEP 4: Different device — silently invalidate old sessions (new device wins)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const wasRecentlyActive = activeSessions.some(s => s.lastActivityAt > fiveMinutesAgo);

    // Delete ALL other sessions for this user (one device at a time)
    const revokedCount = await prisma.session.deleteMany({
      where: {
        userId: user.id,
        deviceId: { not: deviceId },
      },
    });

    if (revokedCount.count > 0) {
      console.log(`Revoked ${revokedCount.count} session(s) for user ${user.id} (new device: ${deviceId})`);
      try {
        await prisma.accountSharingLog.create({
          data: {
            userId: user.id,
            eventType: 'session_replaced',
            deviceId,
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            metadata: {
              revokedSessions: revokedCount.count,
              wasRecentlyActive,
              newDeviceId: deviceId,
            },
          },
        });
      } catch (logErr) {
        console.error('Failed to log session replacement:', logErr);
      }
    }

    // STEP 5: Create new session
    console.log(`No existing sessions found for user ${user.id}. Creating new session.`);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
      }
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Get device info for session tracking
    const { parseDeviceInfo, getClientIP } = await import('@/lib/device-fingerprint-server');
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = getClientIP(request);
    const deviceInfo = parseDeviceInfo(userAgent, ipAddress);

    // Create session
    const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await prisma.session.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt: sessionExpiry,
        ipAddress,
        userAgent,
        deviceId: deviceId || null,
        deviceName: deviceInfo.deviceName,
        deviceType: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        country: deviceInfo.country,
        city: deviceInfo.city,
      }
    });

    // Log successful login
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'login',
        details: 'Successful login',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      }
    });

    // Return response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscriptionTier: user.subscriptionTier,
        emailVerified: user.emailVerified,
        language: user.language,
        isAdmin: user.isAdmin,
      },
      subscription: user.subscription,
      accessToken,
      refreshToken,
    });

    // Set secure httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signin. Please try again.' },
      { status: 500 }
    );
  }
}