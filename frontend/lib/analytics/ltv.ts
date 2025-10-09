import { prisma } from '@/lib/prisma';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

interface LTVData {
  averageLTV: number;
  byTier: {
    FREE: number;
    CORE: number;
    FULL: number;
  };
  averageLifetimeMonths: number;
}

/**
 * Calculate Lifetime Value (LTV) of customers
 */
export async function calculateLTV(): Promise<LTVData> {
  // Get all canceled subscriptions to calculate average lifetime
  const subscriptions = await prisma.subscription.findMany({
    where: {
      canceledAt: { not: null },
    },
    select: {
      createdAt: true,
      canceledAt: true,
      user: {
        select: {
          subscriptionTier: true,
        },
      },
    },
  });

  const lifetimesByTier = {
    FREE: [] as number[],
    CORE: [] as number[],
    FULL: [] as number[],
  };

  for (const sub of subscriptions) {
    if (!sub.canceledAt) continue;

    const tier = sub.user.subscriptionTier.toUpperCase() as 'FREE' | 'CORE' | 'FULL';
    const lifetimeMonths =
      (sub.canceledAt.getTime() - sub.createdAt.getTime()) /
      (1000 * 60 * 60 * 24 * 30);

    lifetimesByTier[tier].push(lifetimeMonths);
  }

  // Calculate average lifetime and LTV per tier
  const ltvByTier = {
    FREE: 0,
    CORE: 0,
    FULL: 0,
  };

  let totalLifetimeMonths = 0;
  let totalSubscriptions = 0;

  for (const tier of ['FREE', 'CORE', 'FULL'] as const) {
    const lifetimes = lifetimesByTier[tier];
    if (lifetimes.length === 0) continue;

    const avgLifetime = lifetimes.reduce((a, b) => a + b, 0) / lifetimes.length;
    const tierPrice = SUBSCRIPTION_TIERS[tier].price;

    ltvByTier[tier] = avgLifetime * tierPrice;

    totalLifetimeMonths += avgLifetime * lifetimes.length;
    totalSubscriptions += lifetimes.length;
  }

  const averageLifetimeMonths = totalSubscriptions > 0
    ? totalLifetimeMonths / totalSubscriptions
    : 0;

  const averageLTV =
    Object.values(ltvByTier).reduce((a, b) => a + b, 0) /
    Object.values(ltvByTier).filter((v) => v > 0).length || 0;

  return {
    averageLTV,
    byTier: ltvByTier,
    averageLifetimeMonths,
  };
}

/**
 * Calculate LTV:CAC ratio (Lifetime Value to Customer Acquisition Cost)
 * Requires CAC to be configured separately
 */
export async function calculateLTVtoCAC(cac: number): Promise<number> {
  const ltv = await calculateLTV();
  return cac > 0 ? ltv.averageLTV / cac : 0;
}
