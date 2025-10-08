import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractBearerToken, verifyAccessToken } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user with subscription and usage stats
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscription: true,
        _count: {
          select: {
            sessions: true,
            activityLogs: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if account is suspended
    if (user.isSuspended) {
      return NextResponse.json(
        {
          error: 'Account suspended',
          reason: user.suspendedReason || 'Please contact support for more information',
        },
        { status: 403 }
      );
    }

    // Get recent activity
    const recentActivity = await prisma.activityLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        action: true,
        details: true,
        createdAt: true,
      },
    });

    // Calculate subscription limits
    const subscriptionLimits = {
      free: {
        worksheetGenerators: 5,
        monthlyExports: 50,
        imageLibraryAccess: 'basic',
        supportLevel: 'community',
      },
      core: {
        worksheetGenerators: 15,
        monthlyExports: 500,
        imageLibraryAccess: 'enhanced',
        supportLevel: 'priority',
      },
      full: {
        worksheetGenerators: 33,
        monthlyExports: 'unlimited',
        imageLibraryAccess: 'full',
        supportLevel: 'premium',
      },
    };

    const userLimits = subscriptionLimits[user.subscriptionTier as keyof typeof subscriptionLimits] || subscriptionLimits.free;

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        language: user.language,
        newsletter: user.newsletter,
        subscriptionTier: user.subscriptionTier,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        avatar: user.avatar,
      },
      subscription: user.subscription ? {
        id: user.subscription.id,
        planName: user.subscription.planName,
        status: user.subscription.status,
        currentPeriodStart: user.subscription.currentPeriodStart,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
        trialEnd: user.subscription.trialEnd,
        cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
        limits: userLimits,
      } : null,
      usage: {
        activeSessions: user._count.sessions,
        totalActivities: user._count.activityLogs,
      },
      recentActivity,
    });

  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching user data' },
      { status: 500 }
    );
  }
}

// Update user profile
export async function PATCH(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Only allow updating certain fields
    const allowedFields = ['firstName', 'lastName', 'language', 'newsletter', 'avatar'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: updateData,
      include: {
        subscription: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: payload.userId,
        action: 'profile_updated',
        details: `Updated fields: ${Object.keys(updateData).join(', ')}`,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        emailVerified: updatedUser.emailVerified,
        language: updatedUser.language,
        newsletter: updatedUser.newsletter,
        subscriptionTier: updatedUser.subscriptionTier,
        isAdmin: updatedUser.isAdmin,
        avatar: updatedUser.avatar,
      },
    });

  } catch (error) {
    console.error('Update user profile error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating profile' },
      { status: 500 }
    );
  }
}