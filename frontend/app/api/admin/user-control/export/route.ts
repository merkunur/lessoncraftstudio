import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/user-control/export
 * Export users to CSV
 *
 * Auth: Requires admin
 */
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const tier = searchParams.get('tier') || 'all';
    const status = searchParams.get('status') || 'all';

    // Build where clause
    const where: any = {};

    if (tier !== 'all') {
      where.subscriptionTier = tier;
    }

    if (status !== 'all') {
      where.subscription = {
        status: status,
      };
    }

    // Fetch all users matching filters
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        stripeCustomerId: true,
        createdAt: true,
        subscription: {
          select: {
            planName: true,
            status: true,
            currentPeriodEnd: true,
            currentPeriodStart: true,
            billingInterval: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = [
      'User ID',
      'Email',
      'First Name',
      'Last Name',
      'Subscription Tier',
      'Subscription Status',
      'Plan Name',
      'Billing Interval',
      'Current Period Start',
      'Current Period End',
      'Stripe Customer ID',
      'Joined Date',
    ];

    const rows = users.map(user => [
      user.id,
      user.email,
      user.firstName || '',
      user.lastName || '',
      user.subscriptionTier,
      user.subscription?.status || 'none',
      user.subscription?.planName || 'none',
      user.subscription?.billingInterval || 'none',
      user.subscription?.currentPeriodStart
        ? new Date(user.subscription.currentPeriodStart).toISOString()
        : '',
      user.subscription?.currentPeriodEnd
        ? new Date(user.subscription.currentPeriodEnd).toISOString()
        : '',
      user.stripeCustomerId || '',
      new Date(user.createdAt).toISOString(),
    ]);

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row =>
        row.map(field =>
          // Escape fields containing commas or quotes
          typeof field === 'string' && (field.includes(',') || field.includes('"'))
            ? `"${field.replace(/"/g, '""')}"`
            : field
        ).join(',')
      ),
    ].join('\n');

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    return handleApiError(error);
  }
});
