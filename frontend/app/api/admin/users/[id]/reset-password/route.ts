import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

// POST /api/admin/users/[id]/reset-password - Send password reset email
export const POST = withAdminAuth(async (request: NextRequest, adminUser: any, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id: userId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Save reset token
    await prisma.passwordReset.create({
      data: {
        userId,
        token: hashedToken,
        expiresAt,
      },
    });

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>Hi ${user.firstName || 'there'},</p>
        <p>An administrator has requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't expect this email, please contact support.</p>
      `,
    });

    // Log the action
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'password_reset_sent_by_admin',
        details: `Password reset email sent to ${user.email}`,
        metadata: {
          sentTo: user.email,
          sentBy: adminUser.email,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to send password reset email' },
      { status: 500 }
    );
  }
});