import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth-utils';
import { sendWelcomeEmail } from '@/lib/email';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = verifyEmailSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const { token } = validationResult.data;

    // Find user with matching verification token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        emailVerified: false,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - user.createdAt.getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (tokenAge > maxAge) {
      return NextResponse.json(
        {
          error: 'Verification token has expired',
          message: 'Please request a new verification email.',
        },
        { status: 400 }
      );
    }

    // Check if user is suspended
    if (user.isSuspended) {
      return NextResponse.json(
        {
          error: 'Account suspended',
          message: 'Please contact support for assistance.',
        },
        { status: 403 }
      );
    }

    // Update user to mark email as verified
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null, // Clear the token
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'email_verified',
        details: 'Email address verified successfully',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    });

    // Generate tokens for automatic login
    const { accessToken, refreshToken } = generateTokens(updatedUser);

    // Create session
    await prisma.session.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    });

    // Send welcome email (async, don't wait)
    sendWelcomeEmail({
      email: user.email,
      firstName: user.firstName || '',
      language: user.language,
      subscriptionTier: user.subscriptionTier,
    }).catch(console.error);

    // Return response with tokens for automatic login
    const response = NextResponse.json({
      success: true,
      message: 'Email verified successfully! Welcome to LessonCraftStudio.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscriptionTier: user.subscriptionTier,
        emailVerified: true,
      },
      accessToken,
      refreshToken,
    });

    // Set secure httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying your email.' },
      { status: 500 }
    );
  }
}

// GET endpoint to resend verification email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    if (!userId && !email) {
      return NextResponse.json(
        { error: 'User ID or email is required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findFirst({
      where: userId ? { id: userId } : { email: email!.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a verification email will be sent.',
      });
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      );
    }

    // Check for recent resend requests (rate limiting)
    const recentActivity = await prisma.activityLog.findFirst({
      where: {
        userId: user.id,
        action: 'verification_resent',
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
        },
      },
    });

    if (recentActivity) {
      return NextResponse.json({
        success: true,
        message: 'Verification email recently sent. Please check your inbox.',
      });
    }

    // Generate new verification token if needed
    let verificationToken = user.verificationToken;
    if (!verificationToken) {
      const { generateVerificationToken } = await import('@/lib/auth-utils');
      verificationToken = generateVerificationToken();

      await prisma.user.update({
        where: { id: user.id },
        data: { verificationToken },
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'verification_resent',
        details: 'Verification email resent',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    });

    // Send verification email (async, don't wait)
    const { sendVerificationEmail } = await import('@/lib/email');
    sendVerificationEmail({
      email: user.email,
      firstName: user.firstName || '',
      token: verificationToken,
      language: user.language,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.',
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resending verification email.' },
      { status: 500 }
    );
  }
}