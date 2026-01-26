import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { exchangeCodeForTokens, getUserEmail } from '@/lib/gmail';

// GET /api/auth/gmail/callback - Handle Gmail OAuth callback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Parse return URL from state
    let returnUrl = '/admin/support/tickets';
    if (state) {
      try {
        const stateData = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
        returnUrl = stateData.returnUrl || returnUrl;
      } catch {
        // Ignore state parsing errors
      }
    }

    // Check for OAuth errors
    if (error) {
      console.error('Gmail OAuth error:', error);
      const errorUrl = new URL(returnUrl, process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lessoncraftstudio.com');
      errorUrl.searchParams.set('gmail_error', error);
      return NextResponse.redirect(errorUrl.toString());
    }

    if (!code) {
      const errorUrl = new URL(returnUrl, process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lessoncraftstudio.com');
      errorUrl.searchParams.set('gmail_error', 'no_code');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Failed to get tokens from Google');
    }

    // Get user's email address
    const email = await getUserEmail(tokens.access_token, tokens.refresh_token);

    // Calculate token expiry
    const expiresAt = new Date(Date.now() + (tokens.expiry_date || 3600000));

    // Store tokens in database (upsert - update if email exists, create if not)
    await prisma.gmailToken.upsert({
      where: { email },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
        updatedAt: new Date(),
      },
      create: {
        email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
      },
    });

    console.log(`✅ Gmail connected successfully for ${email}`);

    // Redirect back to the content manager with success
    const successUrl = new URL(returnUrl, process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lessoncraftstudio.com');
    successUrl.searchParams.set('gmail_connected', 'true');
    return NextResponse.redirect(successUrl.toString());
  } catch (error) {
    console.error('Error in Gmail OAuth callback:', error);

    // Redirect with error
    const errorUrl = new URL('/admin/support/tickets', process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lessoncraftstudio.com');
    errorUrl.searchParams.set('gmail_error', 'callback_failed');
    return NextResponse.redirect(errorUrl.toString());
  }
}
