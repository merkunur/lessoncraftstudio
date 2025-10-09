import { prisma } from '@/lib/prisma';

interface ChurnData {
  rate: number; // Percentage
  voluntary: number; // Canceled by user
  involuntary: number; // Payment failures
  totalCanceled: number;
  activeSubscriptions: number;
}

/**
 * Calculate churn rate for a given period
 */
export async function calculateChurnRate(
  startDate: Date,
  endDate: Date
): Promise<ChurnData> {
  // Active subscriptions at start of period
  const activeAtStart = await prisma.subscription.count({
    where: {
      createdAt: { lt: startDate },
      OR: [
        { canceledAt: null },
        { canceledAt: { gte: startDate } },
      ],
      status: { in: ['active', 'past_due'] },
    },
  });

  // Canceled during period - voluntary
  const canceledVoluntary = await prisma.subscription.count({
    where: {
      canceledAt: { gte: startDate, lte: endDate },
      cancelReason: { not: 'payment_failed' },
    },
  });

  // Canceled during period - involuntary
  const canceledInvoluntary = await prisma.subscription.count({
    where: {
      canceledAt: { gte: startDate, lte: endDate },
      cancelReason: 'payment_failed',
    },
  });

  const totalCanceled = canceledVoluntary + canceledInvoluntary;
  const churnRate = activeAtStart > 0
    ? (totalCanceled / activeAtStart) * 100
    : 0;

  return {
    rate: churnRate,
    voluntary: canceledVoluntary,
    involuntary: canceledInvoluntary,
    totalCanceled,
    activeSubscriptions: activeAtStart,
  };
}

/**
 * Calculate retention rate
 */
export async function calculateRetentionRate(
  startDate: Date,
  endDate: Date
): Promise<number> {
  const churn = await calculateChurnRate(startDate, endDate);
  return 100 - churn.rate;
}

/**
 * Get churn trend over time
 */
export async function getChurnTrend(months: number = 12): Promise<Array<{ month: string; churnRate: number }>> {
  const trend = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

    const churn = await calculateChurnRate(startOfMonth, endOfMonth);

    trend.push({
      month: startOfMonth.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      churnRate: churn.rate,
    });
  }

  return trend;
}
