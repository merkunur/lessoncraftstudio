import { prisma } from '@/lib/prisma';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

interface MRRData {
  total: number;
  byTier: {
    FREE: number;
    CORE: number;
    FULL: number;
  };
  growth: number; // Percentage change from last month
}

/**
 * Calculate Monthly Recurring Revenue (MRR)
 */
export async function calculateMRR(): Promise<MRRData> {
  // Get all active subscriptions
  const activeSubscriptions = await prisma.subscription.findMany({
    where: {
      status: { in: ['active', 'past_due'] },
    },
    include: {
      user: {
        select: {
          subscriptionTier: true,
        },
      },
    },
  });

  let totalMRR = 0;
  const mrrByTier = { FREE: 0, CORE: 0, FULL: 0 };

  for (const sub of activeSubscriptions) {
    const tier = sub.user.subscriptionTier.toUpperCase() as 'FREE' | 'CORE' | 'FULL';
    if (tier === 'FREE') continue; // Skip free tier for MRR

    const tierInfo = SUBSCRIPTION_TIERS[tier];

    // Convert to monthly MRR
    let monthlyRevenue = 0;
    if (sub.billingInterval === 'yearly') {
      monthlyRevenue = (tierInfo.priceYearly || 0) / 12;
    } else {
      monthlyRevenue = tierInfo.price;
    }

    totalMRR += monthlyRevenue;
    mrrByTier[tier] += monthlyRevenue;
  }

  // Calculate growth (compare with last month)
  const lastMonthMRR = await calculateMRRForMonth(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );

  const growth = lastMonthMRR > 0
    ? ((totalMRR - lastMonthMRR) / lastMonthMRR) * 100
    : 0;

  return {
    total: totalMRR,
    byTier: mrrByTier,
    growth,
  };
}

/**
 * Calculate MRR for a specific month
 */
async function calculateMRRForMonth(date: Date): Promise<number> {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const subscriptions = await prisma.subscription.findMany({
    where: {
      status: { in: ['active', 'past_due'] },
      createdAt: { lte: endOfMonth },
      OR: [
        { canceledAt: null },
        { canceledAt: { gte: startOfMonth } },
      ],
    },
    include: {
      user: {
        select: {
          subscriptionTier: true,
        },
      },
    },
  });

  let mrr = 0;
  for (const sub of subscriptions) {
    const tier = sub.user.subscriptionTier.toUpperCase() as 'FREE' | 'CORE' | 'FULL';
    if (tier === 'FREE') continue;

    const tierInfo = SUBSCRIPTION_TIERS[tier];

    if (sub.billingInterval === 'yearly') {
      mrr += (tierInfo.priceYearly || 0) / 12;
    } else {
      mrr += tierInfo.price;
    }
  }

  return mrr;
}

/**
 * Calculate Annual Recurring Revenue (ARR)
 */
export async function calculateARR(): Promise<number> {
  const mrr = await calculateMRR();
  return mrr.total * 12;
}

/**
 * Calculate Average Revenue Per User (ARPU)
 */
export async function calculateARPU(): Promise<number> {
  const activeUsers = await prisma.user.count({
    where: {
      subscriptionTier: { in: ['core', 'full'] },
    },
  });

  if (activeUsers === 0) return 0;

  const mrr = await calculateMRR();
  return mrr.total / activeUsers;
}

/**
 * Get MRR trend over time
 */
export async function getMRRTrend(months: number = 12): Promise<Array<{ month: string; mrr: number }>> {
  const trend = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mrr = await calculateMRRForMonth(date);

    trend.push({
      month: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      mrr,
    });
  }

  return trend;
}
