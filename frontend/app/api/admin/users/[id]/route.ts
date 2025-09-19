import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// GET /api/admin/users/[id] - Get user details
export const GET = withAdminAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
        worksheetUsage: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        activityLogs: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        usageQuotas: {
          where: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          },
          take: 1,
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
    const stats = await prisma.worksheetUsage.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { downloads: true },
    });

    const totalPayments = await prisma.payment.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { amount: true },
    });

    // Get favorite generators (most used)
    const generatorUsage = await prisma.worksheetUsage.groupBy({
      by: ['generatorId'],
      where: { userId },
      _count: { generatorId: true },
      orderBy: {
        _count: {
          generatorId: 'desc',
        },
      },
      take: 5,
    });

    const lastWorksheet = await prisma.worksheetUsage.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
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
      avatarUrl: user.avatarUrl,
      subscription: user.subscription ? {
        status: user.subscription.status,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
      } : null,
      stats: {
        totalWorksheets: stats._count.id,
        totalDownloads: stats._sum.downloads || 0,
        totalPayments: totalPayments._count.id,
        totalRevenue: totalPayments._sum.amount || 0,
        lastWorksheetDate: lastWorksheet?.createdAt || null,
        favoriteGenerators: generatorUsage.map(g => g.generatorId),
      },
      usage: {
        currentMonth: {
          downloads: user.usageQuotas[0]?.downloadsUsed || 0,
          limit: user.usageQuotas[0]?.downloadsLimit ||
            (user.subscriptionTier === 'full' ? -1 : user.subscriptionTier === 'core' ? 200 : 20),
          generators: user.usageQuotas[0]?.generatorsUsed || [],
          generatorLimit: user.usageQuotas[0]?.generatorsLimit ||
            (user.subscriptionTier === 'full' ? -1 : user.subscriptionTier === 'core' ? 20 : 5),
        },
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
export const PATCH = withAdminAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const userId = params.id;
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
        usageQuotas: {
          where: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          },
          take: 1,
        },
      },
    });

    // Log the update
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'user_updated_by_admin',
        details: {
          updatedFields: Object.keys(data),
          updatedBy: 'admin',
        },
      },
    });

    // Return full user details (same format as GET)
    const stats = await prisma.worksheetUsage.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { downloads: true },
    });

    const totalPayments = await prisma.payment.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { amount: true },
    });

    const generatorUsage = await prisma.worksheetUsage.groupBy({
      by: ['generatorId'],
      where: { userId },
      _count: { generatorId: true },
      orderBy: {
        _count: {
          generatorId: 'desc',
        },
      },
      take: 5,
    });

    const lastWorksheet = await prisma.worksheetUsage.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
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
      avatarUrl: updatedUser.avatarUrl,
      subscription: updatedUser.subscription ? {
        status: updatedUser.subscription.status,
        currentPeriodEnd: updatedUser.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: updatedUser.subscription.cancelAtPeriodEnd,
      } : null,
      stats: {
        totalWorksheets: stats._count.id,
        totalDownloads: stats._sum.downloads || 0,
        totalPayments: totalPayments._count.id,
        totalRevenue: totalPayments._sum.amount || 0,
        lastWorksheetDate: lastWorksheet?.createdAt || null,
        favoriteGenerators: generatorUsage.map(g => g.generatorId),
      },
      usage: {
        currentMonth: {
          downloads: updatedUser.usageQuotas[0]?.downloadsUsed || 0,
          limit: updatedUser.usageQuotas[0]?.downloadsLimit ||
            (updatedUser.subscriptionTier === 'full' ? -1 : updatedUser.subscriptionTier === 'core' ? 200 : 20),
          generators: updatedUser.usageQuotas[0]?.generatorsUsed || [],
          generatorLimit: updatedUser.usageQuotas[0]?.generatorsLimit ||
            (updatedUser.subscriptionTier === 'full' ? -1 : updatedUser.subscriptionTier === 'core' ? 20 : 5),
        },
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
export const DELETE = withAdminAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const userId = params.id;

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

    // Soft delete the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
      },
    });

    // Cancel any active subscriptions
    if (user.stripeCustomerId) {
      // In production, cancel Stripe subscription here
    }

    // Log the deletion
    await prisma.activityLog.create({
      data: {
        userId: null, // System action
        action: 'user_deleted_by_admin',
        details: {
          deletedUserId: userId,
          deletedEmail: user.email,
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