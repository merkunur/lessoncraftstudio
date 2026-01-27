import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth-utils';
import { parseDeviceInfo, getClientIP } from '@/lib/device-fingerprint-server';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

// Create OAuth2 client for Google Sign-In
function getGoogleAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_AUTH_REDIRECT_URI ||
    (process.env.NODE_ENV === 'production'
      ? 'https://www.lessoncraftstudio.com/api/auth/google/callback'
      : 'http://localhost:3000/api/auth/google/callback');

  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured');
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

// Get user profile from Google using the userinfo endpoint
async function getGoogleUserProfile(accessToken: string) {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get user profile: ${response.status}`);
  }

  return response.json() as Promise<{
    id: string;
    email: string;
    verified_email?: boolean;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  }>;
}

// GET /api/auth/google/callback - Handle Google OAuth callback
export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lessoncraftstudio.com';

  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Parse state data
    let stateData: {
      mode: string;
      plan: string;
      billing: string;
      redirect: string;
      locale: string;
      timestamp: number;
    } = {
      mode: 'signin',
      plan: '',
      billing: '',
      redirect: '',
      locale: 'en',
      timestamp: 0,
    };

    if (state) {
      try {
        stateData = JSON.parse(Buffer.from(state, 'base64url').toString('utf-8'));
      } catch {
        console.warn('Failed to parse OAuth state');
      }
    }

    const { mode, plan, billing, redirect, locale } = stateData;

    // Build error redirect URL
    const buildErrorUrl = (errorCode: string) => {
      const page = mode === 'signup' ? 'signup' : 'signin';
      const errorUrl = new URL(`/${locale}/auth/${page}`, baseUrl);
      errorUrl.searchParams.set('error', errorCode);
      if (plan) errorUrl.searchParams.set('plan', plan);
      if (billing) errorUrl.searchParams.set('billing', billing);
      return errorUrl.toString();
    };

    // Check for OAuth errors
    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect(buildErrorUrl('oauth_denied'));
    }

    if (!code) {
      return NextResponse.redirect(buildErrorUrl('no_code'));
    }

    // Exchange code for tokens
    const oauth2Client = getGoogleAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token) {
      throw new Error('Failed to get access token from Google');
    }

    // Get user profile from Google
    const googleUser = await getGoogleUserProfile(tokens.access_token);

    if (!googleUser.email) {
      return NextResponse.redirect(buildErrorUrl('no_email'));
    }

    const googleId = googleUser.id;
    const email = googleUser.email.toLowerCase();
    const firstName = googleUser.given_name || googleUser.name?.split(' ')[0] || '';
    const lastName = googleUser.family_name || googleUser.name?.split(' ').slice(1).join(' ') || '';
    const emailVerified = googleUser.verified_email ?? true;

    // Check if user exists by OAuth provider ID
    let user = await prisma.user.findFirst({
      where: {
        oauthProvider: 'google',
        oauthProviderId: googleId,
      },
      include: {
        subscription: true,
      },
    });

    // If not found by OAuth ID, check by email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email },
        include: {
          subscription: true,
        },
      });

      if (user) {
        // User exists with this email
        if (user.oauthProvider && user.oauthProvider !== 'google') {
          // User registered with a different OAuth provider
          return NextResponse.redirect(buildErrorUrl('different_provider'));
        }

        if (user.passwordHash && !user.oauthProvider) {
          // User has a password account - link Google to this account
          await prisma.user.update({
            where: { id: user.id },
            data: {
              oauthProvider: 'google',
              oauthProviderId: googleId,
              emailVerified: true,
              emailVerifiedAt: new Date(),
            },
          });
          console.log(`Linked Google account to existing user: ${email}`);
        }
      }
    }

    // Create new user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          oauthProvider: 'google',
          oauthProviderId: googleId,
          emailVerified: emailVerified,
          emailVerifiedAt: emailVerified ? new Date() : null,
          language: locale,
          // passwordHash is null for OAuth users
        },
        include: {
          subscription: true,
        },
      });
      console.log(`Created new Google OAuth user: ${email}`);
    }

    // Check if account is suspended
    if (user.isSuspended) {
      return NextResponse.redirect(buildErrorUrl('account_suspended'));
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        // Update name if missing
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
      },
    });

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Get device info for session tracking
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = getClientIP(request);
    const deviceInfo = parseDeviceInfo(userAgent, ipAddress);

    // Generate a device ID based on user agent (for OAuth, we don't have client-side fingerprint)
    const deviceIdHash = Buffer.from(userAgent + ipAddress).toString('base64').slice(0, 20);

    // Clean up expired sessions
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lte: new Date() },
      },
    });

    // Check for existing sessions with same device
    const existingSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        deviceId: deviceIdHash,
        expiresAt: { gt: new Date() },
      },
    });

    // Session expiry (30 days for OAuth users)
    const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    if (existingSession) {
      // Update existing session
      await prisma.session.update({
        where: { id: existingSession.id },
        data: {
          token: accessToken,
          refreshToken,
          lastActivityAt: new Date(),
          expiresAt: sessionExpiry,
        },
      });
    } else {
      // Delete other active sessions (single device policy)
      await prisma.session.deleteMany({
        where: {
          userId: user.id,
          expiresAt: { gt: new Date() },
        },
      });

      // Create new session
      await prisma.session.create({
        data: {
          userId: user.id,
          token: accessToken,
          refreshToken,
          expiresAt: sessionExpiry,
          ipAddress,
          userAgent,
          deviceId: deviceIdHash,
          deviceName: deviceInfo.deviceName,
          deviceType: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          country: deviceInfo.country,
          city: deviceInfo.city,
        },
      });
    }

    // Log successful login
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'google_oauth_login',
        details: 'Successful Google OAuth login',
        ipAddress,
        userAgent,
      },
    });

    // Build success redirect URL
    let successUrl: URL;

    // If there's a plan parameter, redirect to dashboard with checkout params
    if (plan && (plan === 'core' || plan === 'full')) {
      successUrl = new URL(`/${locale}/dashboard`, baseUrl);
      successUrl.searchParams.set('checkout', 'true');
      successUrl.searchParams.set('plan', plan);
      if (billing) successUrl.searchParams.set('billing', billing);
    } else if (redirect) {
      // Custom redirect URL (validate it's safe)
      if (redirect.startsWith('/')) {
        successUrl = new URL(redirect, baseUrl);
      } else {
        successUrl = new URL(`/${locale}/dashboard`, baseUrl);
      }
    } else {
      // Default redirect to dashboard
      successUrl = new URL(`/${locale}/dashboard`, baseUrl);
    }

    // Add tokens to URL hash (will be picked up by client-side JS)
    successUrl.searchParams.set('oauth', 'success');
    successUrl.searchParams.set('accessToken', accessToken);
    successUrl.searchParams.set('refreshToken', refreshToken);

    // Create response with redirect
    const response = NextResponse.redirect(successUrl.toString());

    // Set refresh token cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Use 'lax' for OAuth redirects
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error in Google OAuth callback:', error);

    // Redirect with error
    const errorUrl = new URL('/en/auth/signin', baseUrl);
    errorUrl.searchParams.set('error', 'oauth_callback_failed');
    return NextResponse.redirect(errorUrl.toString());
  }
}
