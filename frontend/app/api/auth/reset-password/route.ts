import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashToken, validatePasswordStrength } from '@/lib/auth-utils';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const { token, password } = validationResult.data;

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          error: 'Password does not meet requirements',
          details: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    // Hash the token to match storage
    const hashedToken = hashToken(token);

    // Find valid password reset record
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token: hashedToken,
        expiresAt: {
          gt: new Date(),
        },
        usedAt: null,
      },
      include: {
        user: true,
      },
    });

    if (!passwordReset) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if user is suspended
    if (passwordReset.user.isSuspended) {
      return NextResponse.json(
        {
          error: 'Account suspended',
          message: 'Please contact support for assistance.',
        },
        { status: 403 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update user password and mark token as used in transaction
    await prisma.$transaction(async (tx) => {
      // Update user password
      await tx.user.update({
        where: { id: passwordReset.userId },
        data: {
          passwordHash,
          emailVerified: true, // Auto-verify email if resetting password
        },
      });

      // Mark reset token as used
      await tx.passwordReset.update({
        where: { id: passwordReset.id },
        data: {
          usedAt: new Date(),
        },
      });

      // Invalidate all existing sessions for security
      await tx.session.deleteMany({
        where: { userId: passwordReset.userId },
      });

      // Log activity
      await tx.activityLog.create({
        data: {
          userId: passwordReset.userId,
          action: 'password_reset',
          details: 'Password successfully reset',
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. Please sign in with your new password.',
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resetting your password.' },
      { status: 500 }
    );
  }
}