import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

/**
 * GET /api/admin/user-control/search
 * Search and filter users with subscription details
 *
 * Auth: Requires admin
 */
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const query = searchParams.get('query') || '';
    const tier = searchParams.get('tier') || 'all';
    const status = searchParams.get('status') || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};

    // Text search across email, firstName, lastName, and ID
    if (query) {
      where.OR = [
        { email: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { id: { contains: query } },
      ];
    }

    // Filter by subscription tier
    if (tier !== 'all') {
      where.subscriptionTier = tier;
    }

    // Filter by subscription status
    if (status !== 'all') {
      where.subscription = {
        status: status,
      };
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Fetch users with subscription details
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
          subscriptionTier: true,
          stripeCustomerId: true,
          createdAt: true,
          subscription: {
            select: {
              planName: true,
              status: true,
              currentPeriodEnd: true,
              cancelAtPeriodEnd: true,
              billingInterval: true,
            },
          },
          _count: {
            select: {
              payments: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      users,
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
