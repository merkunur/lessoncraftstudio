import { NextRequest, NextResponse } from 'next/server';
import { getGmailAuthUrl } from '@/lib/gmail';

// GET /api/auth/gmail - Initiate Gmail OAuth flow
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get('returnUrl') || '/admin/support/tickets';

    // Check if Gmail OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Gmail OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.' },
        { status: 500 }
      );
    }

    // Generate OAuth URL with state for return URL
    const state = Buffer.from(JSON.stringify({ returnUrl })).toString('base64');
    const authUrl = getGmailAuthUrl(state);

    // Redirect to Google OAuth
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating Gmail OAuth:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Gmail authorization' },
      { status: 500 }
    );
  }
}
