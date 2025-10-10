import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// GET /api/admin/users/[id] - Get user details
export const GET = withAdminAuth(async (request: NextRequest, adminUser: any, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id: userId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        activityLogs: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate statistics
    const totalPayments = await prisma.payment.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { amount: true },
    });

    // Format response
    const formattedUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionTier: user.subscriptionTier || 'free',
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      subscription: user.subscription ? {
        status: user.subscription.status,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
      } : null,
      stats: {
        totalPayments: totalPayments._count.id,
        totalRevenue: totalPayments._sum.amount || 0,
      },
      recentActivity: user.activityLogs.map(log => ({
        id: log.id,
        action: log.action,
        createdAt: log.createdAt,
        details: log.details,
      })),
      payments: user.payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
      })),
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error('Get user detail error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
});

// PATCH /api/admin/users/[id] - Update user
export const PATCH = withAdminAuth(async (request: NextRequest, adminUser: any, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id: userId } = await context.params;
    const body = await request.json();

    const updateSchema = z.object({
      email: z.string().email().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      password: z.string().min(8).optional(),
      subscriptionTier: z.enum(['free', 'core', 'full']).optional(),
      isAdmin: z.boolean().optional(),
      emailVerified: z.boolean().optional(),
    });

    const validationResult = updateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if email is being changed and if it's already in use
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // Hash password if provided
    let updateData: any = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        subscription: true,
      },
    });

    // Log the update
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'user_updated_by_admin',
        details: `User updated by admin: ${Object.keys(data).join(', ')}`,
        metadata: {
          updatedFields: Object.keys(data),
          updatedBy: adminUser.email,
        },
      },
    });

    // Return full user details (same format as GET)
    const totalPayments = await prisma.payment.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { amount: true },
    });

    const recentActivity = await prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const recentPayments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      subscriptionTier: updatedUser.subscriptionTier || 'free',
      emailVerified: updatedUser.emailVerified,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
      lastLoginAt: updatedUser.lastLoginAt,
      subscription: updatedUser.subscription ? {
        status: updatedUser.subscription.status,
        currentPeriodEnd: updatedUser.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: updatedUser.subscription.cancelAtPeriodEnd,
      } : null,
      stats: {
        totalPayments: totalPayments._count.id,
        totalRevenue: totalPayments._sum.amount || 0,
      },
      recentActivity: recentActivity.map(log => ({
        id: log.id,
        action: log.action,
        createdAt: log.createdAt,
        details: log.details,
      })),
      payments: recentPayments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
      })),
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
});

// DELETE /api/admin/users/[id] - Delete user (soft delete)
export const DELETE = withAdminAuth(async (request: NextRequest, adminUser: any, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id: userId } = await context.params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete the user (hard delete since no deletedAt field exists)
    await prisma.user.delete({
      where: { id: userId },
    });

    // Cancel any active subscriptions
    if (user.stripeCustomerId) {
      // In production, cancel Stripe subscription here
    }

    // Log the deletion
    await prisma.activityLog.create({
      data: {
        userId: adminUser.id,
        action: 'user_deleted_by_admin',
        details: `User ${user.email} deleted by admin`,
        metadata: {
          deletedUserId: userId,
          deletedEmail: user.email,
          deletedBy: adminUser.email,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
});