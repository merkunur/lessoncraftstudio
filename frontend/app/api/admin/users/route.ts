import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// GET /api/admin/users - Get all users with filters
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const tier = searchParams.get('tier') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};

    // Search by name or email
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by subscription tier
    if (tier && tier !== 'all') {
      where.subscriptionTier = tier.toLowerCase();
    }

    // Filter by account status
    if (status) {
      if (status === 'active') {
        where.emailVerified = true;
      } else if (status === 'unverified') {
        where.emailVerified = false;
      }
      // Note: 'deleted' status not supported - User model has no deletedAt field
    }

    // Get total count
    const totalCount = await prisma.user.count({ where });

    // Get paginated users
    const users = await prisma.user.findMany({
      where,
      include: {
        subscription: {
          select: {
            status: true,
            currentPeriodEnd: true,
            stripePriceId: true,
          },
        },
        _count: {
          select: {
            payments: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get summary stats
    const stats = await prisma.user.groupBy({
      by: ['subscriptionTier'],
      _count: {
        subscriptionTier: true,
      },
    });

    const tierCounts = stats.reduce((acc, item) => {
      acc[item.subscriptionTier || 'free'] = item._count.subscriptionTier;
      return acc;
    }, {} as Record<string, number>);

    // Format response
    const formattedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
      subscriptionTier: user.subscriptionTier || 'free',
      subscriptionStatus: user.subscription?.status || 'inactive',
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      paymentCount: user._count.payments,
    }));

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
      stats: {
        total: totalCount,
        byTier: tierCounts,
        active: await prisma.user.count({
          where: {
            emailVerified: true,
          },
        }),
        unverified: await prisma.user.count({
          where: { emailVerified: false },
        }),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
});

// POST /api/admin/users - Create new user
export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();

    const createUserSchema = z.object({
      email: z.string().email(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      password: z.string().min(8),
      subscriptionTier: z.enum(['free', 'core', 'full']).optional(),
      isAdmin: z.boolean().optional(),
      emailVerified: z.boolean().optional(),
    });

    const validationResult = createUserSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: hashedPassword,
        subscriptionTier: data.subscriptionTier || 'free',
        isAdmin: data.isAdmin || false,
        emailVerified: data.emailVerified || false,
      },
    });

    // Create activity log
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'user_created_by_admin',
        details: `User created by admin: ${user.email}`,
        metadata: {
          createdBy: 'admin',
          email: user.email,
          tier: user.subscriptionTier,
        },
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionTier: user.subscriptionTier,
      isAdmin: user.isAdmin,
    }, { status: 201 });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
});

// PATCH /api/admin/users - Bulk operations
export const PATCH = withAdminAuth(async (request: NextRequest, adminUser: any) => {
  try {
    const body = await request.json();
    const { userIds, action, data } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'User IDs required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'delete':
        // Hard delete users (User model has no deletedAt field)
        result = await prisma.user.deleteMany({
          where: { id: { in: userIds } },
        });
        break;

      case 'restore':
        // Restore not supported (no soft delete)
        return NextResponse.json(
          { error: 'Restore not supported - User model has no deletedAt field' },
          { status: 400 }
        );

      case 'verify':
        // Verify emails
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { emailVerified: true },
        });
        break;

      case 'updateTier':
        // Update subscription tier
        if (!data?.tier) {
          return NextResponse.json(
            { error: 'Tier required for updateTier action' },
            { status: 400 }
          );
        }
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { subscriptionTier: data.tier },
        });
        break;

      case 'makeAdmin':
        // Grant admin privileges
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { isAdmin: true },
        });
        break;

      case 'removeAdmin':
        // Remove admin privileges
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { isAdmin: false },
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Log bulk action
    await prisma.activityLog.create({
      data: {
        userId: adminUser.id,
        action: `bulk_${action}`,
        details: `Bulk ${action} performed on ${userIds.length} user(s)`,
        metadata: {
          userCount: userIds.length,
          userIds,
          performedBy: adminUser.email,
          data,
        },
      },
    });

    return NextResponse.json({
      success: true,
      affected: result.count,
      message: `${result.count} user(s) updated`,
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
});