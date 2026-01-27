import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth-utils';
import { parseDeviceInfo, getClientIP } from '@/lib/device-fingerprint-server';

export const dynamic = 'force-dynamic';

// Validation schema
const forceSigninSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  deviceId: z.string().min(1, 'Device ID is required'),
  rememberMe: z.boolean().optional().default(false),
});

/**
 * POST /api/auth/force-signin
 * Force signin by revoking all other sessions and creating a new one
 * Used when user confirms they want to sign out other devices
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = forceSigninSchema.safeParse(body);
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

    // Check if user has a password
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
          details: 'Invalid password (force-signin attempt)',
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
          userId: user.id,
        },
        { status: 403 }
      );
    }

    // Get device info
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = getClientIP(request);
    const deviceInfo = parseDeviceInfo(userAgent, ipAddress);

    // REVOKE ALL OTHER SESSIONS (force single device)
    const revokedSessions = await prisma.session.deleteMany({
      where: {
        userId: user.id,
        deviceId: { not: deviceId }, // Delete all sessions except current device
      }
    });

    // Log session revocation
    await prisma.accountSharingLog.create({
      data: {
        userId: user.id,
        eventType: 'force_signin',
        deviceId,
        ipAddress,
        location: deviceInfo.city && deviceInfo.country
          ? `${deviceInfo.city}, ${deviceInfo.country}`
          : deviceInfo.country || 'Unknown',
        metadata: {
          deviceName: deviceInfo.deviceName,
          revokedSessions: revokedSessions.count,
          action: 'User confirmed force signin',
        },
      },
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
      }
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Create new session with device info
    const sessionExpiry = rememberMe
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.session.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt: sessionExpiry,
        ipAddress,
        userAgent,
        deviceId,
        deviceName: deviceInfo.deviceName,
        deviceType: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        country: deviceInfo.country,
        city: deviceInfo.city,
      }
    });

    // Log successful force signin
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'force_signin',
        details: `Successful force signin, revoked ${revokedSessions.count} other session(s)`,
        ipAddress,
        userAgent,
      }
    });

    // Return response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful. Other devices have been signed out.',
      revokedSessions: revokedSessions.count,
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
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Force signin error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signin. Please try again.' },
      { status: 500 }
    );
  }
}
