import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/user-control/search
 * Search and filter users with Lemon Squeezy purchase details
 *
 * Auth: Requires admin
 */
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const query = searchParams.get('query') || '';
    const purchaseFilter = searchParams.get('purchaseFilter') || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (query) {
      where.OR = [
        { email: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { id: { contains: query } },
      ];
    }

    // Filter by purchase status
    if (purchaseFilter === 'with-purchases') {
      where.purchases = { some: { status: 'active' } };
    } else if (purchaseFilter === 'no-purchases') {
      where.purchases = { none: { status: 'active' } };
    } else if (purchaseFilter === 'refunded') {
      where.purchases = { some: { status: 'refunded' } };
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Fetch users with purchase details
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          emailVerified: true,
          purchases: {
            select: {
              id: true,
              lsOrderId: true,
              lsProductId: true,
              appsAccess: true,
              amount: true,
              currency: true,
              status: true,
              createdAt: true,
              refundedAt: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Compute stats from the full filtered set
    const allFilteredUsers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        purchases: {
          select: { status: true, amount: true },
        },
      },
    });

    const statsData = {
      total,
      withPurchases: allFilteredUsers.filter(u =>
        u.purchases.some(p => p.status === 'active')
      ).length,
      totalRevenue: allFilteredUsers.reduce((sum, u) =>
        sum + u.purchases
          .filter(p => p.status === 'active')
          .reduce((s, p) => s + p.amount, 0),
        0
      ),
      refunded: allFilteredUsers.filter(u =>
        u.purchases.some(p => p.status === 'refunded')
      ).length,
    };

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      users,
      stats: statsData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
});
