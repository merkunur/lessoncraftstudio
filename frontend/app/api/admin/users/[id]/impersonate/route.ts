import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// POST /api/admin/users/[id]/impersonate - Impersonate a user
export const POST = withAdminAuth(async (request: NextRequest, adminUser: any, { params }: { params: { id: string } }) => {
  try {
    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Don't allow impersonating other admins
    if (user.isAdmin) {
      return NextResponse.json(
        { error: 'Cannot impersonate admin users' },
        { status: 403 }
      );
    }

    // Create impersonation token with admin context
    const impersonationToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        isImpersonation: true,
        impersonatedBy: adminUser.id,
        impersonatedAt: new Date().toISOString(),
      },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' } // Impersonation expires after 2 hours
    );

    // Set impersonation cookie
    cookies().set({
      name: 'impersonation-token',
      value: impersonationToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2, // 2 hours
    });

    // Log the impersonation
    await prisma.activityLog.create({
      data: {
        userId: adminUser.id,
        action: 'user_impersonation_started',
        details: {
          impersonatedUserId: user.id,
          impersonatedEmail: user.email,
          adminId: adminUser.id,
          adminEmail: adminUser.email,
        },
      },
    });

    // Also log on the impersonated user's account
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'account_impersonated',
        details: {
          impersonatedBy: adminUser.email,
          adminId: adminUser.id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Impersonation started',
      token: impersonationToken,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
      },
    });
  } catch (error) {
    console.error('Impersonation error:', error);
    return NextResponse.json(
      { error: 'Failed to start impersonation' },
      { status: 500 }
    );
  }
});