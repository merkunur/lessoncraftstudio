import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// GET /api/admin/subscriptions - Get all subscriptions with filters
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || 'all';
    const plan = searchParams.get('plan') || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (plan && plan !== 'all') {
      where.stripePriceId = plan === 'core'
        ? process.env.STRIPE_PRICE_CORE_MONTHLY
        : process.env.STRIPE_PRICE_FULL_MONTHLY;
    }

    // Get total count
    const totalCount = await prisma.subscription.count({ where });

    // Get paginated subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Format subscriptions with additional data
    const formattedSubscriptions = subscriptions.map(sub => {
      // Determine plan name from price ID
      let planName = 'unknown';
      let amount = 0;

      if (sub.stripePriceId === process.env.STRIPE_PRICE_CORE_MONTHLY) {
        planName = 'core';
        amount = 999; // $9.99
      } else if (sub.stripePriceId === process.env.STRIPE_PRICE_FULL_MONTHLY) {
        planName = 'full';
        amount = 1999; // $19.99
      }

      return {
        id: sub.id,
        userId: sub.userId,
        user: sub.user,
        status: sub.status,
        planName,
        amount,
        interval: 'month',
        currentPeriodEnd: sub.currentPeriodEnd,
        cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
        trialEnd: sub.trialEnd,
        createdAt: sub.createdAt,
      };
    });

    return NextResponse.json({
      subscriptions: formattedSubscriptions,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
});