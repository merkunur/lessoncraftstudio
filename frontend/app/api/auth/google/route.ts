import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

// Google OAuth Scopes for Sign-In (profile info only, not Gmail access)
const GOOGLE_SIGNIN_SCOPES = [
  'openid',
  'email',
  'profile',
];

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

// GET /api/auth/google - Initiate Google OAuth flow for sign-in/sign-up
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'signin'; // 'signin' or 'signup'
    const plan = searchParams.get('plan') || ''; // Optional plan for checkout after signup
    const billing = searchParams.get('billing') || ''; // Optional billing interval
    const redirect = searchParams.get('redirect') || ''; // Optional redirect URL after auth
    const locale = searchParams.get('locale') || 'en';

    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Google OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.' },
        { status: 500 }
      );
    }

    // Generate state token for CSRF protection and to pass data through OAuth flow
    const stateData = {
      mode,
      plan,
      billing,
      redirect,
      locale,
      timestamp: Date.now(),
    };
    const state = Buffer.from(JSON.stringify(stateData)).toString('base64url');

    // Create OAuth2 client and generate auth URL
    const oauth2Client = getGoogleAuthClient();
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GOOGLE_SIGNIN_SCOPES,
      prompt: 'select_account', // Let user select account even if already signed in
      state,
    });

    // Redirect to Google OAuth consent screen
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating Google OAuth:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Google authorization' },
      { status: 500 }
    );
  }
}
