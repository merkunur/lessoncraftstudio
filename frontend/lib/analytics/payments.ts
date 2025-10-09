import { prisma } from '@/lib/prisma';

interface PaymentAnalytics {
  totalRevenue: number;
  successfulPayments: number;
  failedPayments: number;
  successRate: number;
  refundedAmount: number;
  refundRate: number;
  averageTransactionValue: number;
}

/**
 * Get payment analytics for a given period
 */
export async function getPaymentAnalytics(
  startDate: Date,
  endDate: Date
): Promise<PaymentAnalytics> {
  const payments = await prisma.payment.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  let totalRevenue = 0;
  let successfulPayments = 0;
  let failedPayments = 0;
  let refundedAmount = 0;

  for (const payment of payments) {
    if (payment.status === 'succeeded') {
      totalRevenue += payment.amount;
      successfulPayments++;
    } else if (payment.status === 'failed') {
      failedPayments++;
    }

    refundedAmount += payment.refundedAmount;
  }

  const totalAttempts = successfulPayments + failedPayments;
  const successRate = totalAttempts > 0
    ? (successfulPayments / totalAttempts) * 100
    : 100;

  const refundRate = totalRevenue > 0
    ? (refundedAmount / totalRevenue) * 100
    : 0;

  const averageTransactionValue = successfulPayments > 0
    ? totalRevenue / successfulPayments
    : 0;

  return {
    totalRevenue,
    successfulPayments,
    failedPayments,
    successRate,
    refundedAmount,
    refundRate,
    averageTransactionValue,
  };
}

/**
 * Get payment failure breakdown by reason
 */
export async function getPaymentFailureBreakdown(
  startDate: Date,
  endDate: Date
): Promise<Record<string, number>> {
  const failures = await prisma.paymentFailure.groupBy({
    by: ['failureCode'],
    _count: true,
    where: {
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  return Object.fromEntries(
    failures.map((f) => [f.failureCode, f._count])
  );
}

/**
 * Get dunning recovery statistics
 */
export async function getDunningRecoveryStats(
  startDate: Date,
  endDate: Date
): Promise<{
  totalFailures: number;
  recovered: number;
  recoveryRate: number;
  pending: number;
}> {
  const totalFailures = await prisma.paymentFailure.count({
    where: {
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  const recovered = await prisma.paymentFailure.count({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      status: 'recovered',
    },
  });

  const pending = await prisma.paymentFailure.count({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      status: { in: ['pending', 'retrying'] },
    },
  });

  const recoveryRate = totalFailures > 0
    ? (recovered / totalFailures) * 100
    : 0;

  return {
    totalFailures,
    recovered,
    recoveryRate,
    pending,
  };
}
