import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken, generateTokens } from '@/lib/auth-utils';
import { sendVerificationEmail } from '@/lib/email';

// Validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  plan: z.enum(['free', 'core', 'full']).optional().default('free'),
  newsletter: z.boolean().optional().default(true),
  language: z.string().optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, plan, newsletter, language } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create user with transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          firstName,
          lastName,
          subscriptionTier: plan,
          newsletter,
          language,
          verificationToken,
          emailVerified: false,
        }
      });

      // Create subscription record
      await tx.subscription.create({
        data: {
          userId: newUser.id,
          planName: plan,
          status: plan === 'free' ? 'active' : 'trialing',
          trialStart: plan !== 'free' ? new Date() : null,
          trialEnd: plan !== 'free' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
        }
      });

      // Log activity
      await tx.activityLog.create({
        data: {
          userId: newUser.id,
          action: 'signup',
          details: `User signed up with ${plan} plan`,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        }
      });

      return newUser;
    });

    // Send verification email (async, don't wait)
    sendVerificationEmail({
      email: user.email,
      firstName: user.firstName,
      token: verificationToken,
      language: user.language,
    }).catch(console.error);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Create session
    await prisma.session.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      }
    });

    // Return response
    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscriptionTier: user.subscriptionTier,
        emailVerified: user.emailVerified,
      },
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
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup. Please try again.' },
      { status: 500 }
    );
  }
}