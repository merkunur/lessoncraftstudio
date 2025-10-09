import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { calculateMRR } from '@/lib/analytics/revenue';
import { calculateChurnRate } from '@/lib/analytics/churn';
import { getPaymentAnalytics } from '@/lib/analytics/payments';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/billing/export?format=csv&type=subscriptions
 *
 * Export billing data in CSV format
 * Supported types: subscriptions, payments, failures
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';
    const type = searchParams.get('type') || 'subscriptions';
    const period = searchParams.get('period') || '30';

    if (format !== 'csv') {
      return NextResponse.json(
        { success: false, error: 'Only CSV format is currently supported' },
        { status: 400 }
      );
    }

    const days = parseInt(period);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let csvContent = '';

    switch (type) {
      case 'subscriptions': {
        const subscriptions = await prisma.subscription.findMany({
          where: {
            createdAt: { gte: startDate, lte: endDate },
          },
          include: {
            user: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
                subscriptionTier: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        // CSV Header
        csvContent = 'ID,User Email,User Name,Tier,Status,Billing Interval,Created At,Canceled At,Cancel Reason\n';

        // CSV Rows
        for (const sub of subscriptions) {
          csvContent += [
            sub.id,
            sub.user.email,
            `"${sub.user.firstName} ${sub.user.lastName}"`,
            sub.user.subscriptionTier.toUpperCase(),
            sub.status,
            sub.billingInterval || 'monthly',
            sub.createdAt.toISOString(),
            sub.canceledAt?.toISOString() || '',
            sub.cancelReason || '',
          ].join(',') + '\n';
        }
        break;
      }

      case 'payments': {
        const payments = await prisma.payment.findMany({
          where: {
            createdAt: { gte: startDate, lte: endDate },
          },
          include: {
            user: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        // CSV Header
        csvContent = 'ID,User Email,User Name,Amount,Currency,Status,Stripe Invoice ID,Refunded Amount,Created At\n';

        // CSV Rows
        for (const payment of payments) {
          csvContent += [
            payment.id,
            payment.user.email,
            `"${payment.user.firstName} ${payment.user.lastName}"`,
            payment.amount,
            payment.currency,
            payment.status,
            payment.stripeInvoiceId || '',
            payment.refundedAmount,
            payment.createdAt.toISOString(),
          ].join(',') + '\n';
        }
        break;
      }

      case 'failures': {
        const failures = await prisma.paymentFailure.findMany({
          where: {
            createdAt: { gte: startDate, lte: endDate },
          },
          include: {
            user: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        // CSV Header
        csvContent = 'ID,User Email,User Name,Amount,Currency,Failure Code,Failure Message,Status,Retry Count,Created At,Recovered At\n';

        // CSV Rows
        for (const failure of failures) {
          csvContent += [
            failure.id,
            failure.user.email,
            `"${failure.user.firstName} ${failure.user.lastName}"`,
            failure.amount,
            failure.currency,
            failure.failureCode,
            `"${failure.failureMessage || ''}"`,
            failure.status,
            failure.retryCount,
            failure.createdAt.toISOString(),
            failure.recoveredAt?.toISOString() || '',
          ].join(',') + '\n';
        }
        break;
      }

      case 'analytics': {
        // Export summary analytics
        const [mrrData, churnData, paymentAnalytics] = await Promise.all([
          calculateMRR(),
          calculateChurnRate(startDate, endDate),
          getPaymentAnalytics(startDate, endDate),
        ]);

        csvContent = 'Metric,Value\n';
        csvContent += `MRR,$${mrrData.total.toFixed(2)}\n`;
        csvContent += `MRR Growth,${mrrData.growth.toFixed(2)}%\n`;
        csvContent += `MRR Core,$${mrrData.byTier.CORE.toFixed(2)}\n`;
        csvContent += `MRR Full,$${mrrData.byTier.FULL.toFixed(2)}\n`;
        csvContent += `Churn Rate,${churnData.rate.toFixed(2)}%\n`;
        csvContent += `Voluntary Churn,${churnData.voluntary}\n`;
        csvContent += `Involuntary Churn,${churnData.involuntary}\n`;
        csvContent += `Payment Success Rate,${paymentAnalytics.successRate.toFixed(2)}%\n`;
        csvContent += `Total Revenue,$${paymentAnalytics.totalRevenue.toFixed(2)}\n`;
        csvContent += `Refund Rate,${paymentAnalytics.refundRate.toFixed(2)}%\n`;
        break;
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid export type. Use: subscriptions, payments, failures, or analytics',
          },
          { status: 400 }
        );
    }

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="billing-${type}-${startDate.toISOString().split('T')[0]}-to-${endDate.toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting billing data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to export billing data',
      },
      { status: 500 }
    );
  }
});
