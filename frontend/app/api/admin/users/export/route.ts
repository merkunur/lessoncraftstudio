import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/users/export - Export users to CSV
export const GET = withAdminAuth(async (request: NextRequest, adminUser: any) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'csv';
    const tier = searchParams.get('tier') || '';
    const status = searchParams.get('status') || '';

    // Build where clause
    const where: any = {};

    if (tier && tier !== 'all') {
      where.subscriptionTier = tier.toLowerCase();
    }

    if (status) {
      if (status === 'active') {
        where.emailVerified = true;
      } else if (status === 'unverified') {
        where.emailVerified = false;
      }
      // Note: 'deleted' status not supported - User model has no deletedAt field
    }

    // Get all users
    const users = await prisma.user.findMany({
      where,
      include: {
        subscription: {
          select: {
            status: true,
            currentPeriodEnd: true,
          },
        },
        _count: {
          select: {
            payments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'ID',
        'Email',
        'First Name',
        'Last Name',
        'Subscription Tier',
        'Subscription Status',
        'Email Verified',
        'Is Admin',
        'Created At',
        'Last Login',
        'Total Payments',
      ];

      const rows = users.map(user => [
        user.id,
        user.email,
        user.firstName || '',
        user.lastName || '',
        user.subscriptionTier || 'free',
        user.subscription?.status || 'inactive',
        user.emailVerified ? 'Yes' : 'No',
        user.isAdmin ? 'Yes' : 'No',
        user.createdAt.toISOString(),
        user.lastLoginAt?.toISOString() || '',
        user._count.payments.toString(),
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      // Log export action
      await prisma.activityLog.create({
        data: {
          userId: adminUser.id,
          action: 'users_exported',
          details: `Exported ${users.length} users as ${format}`,
          metadata: {
            format,
            count: users.length,
            filters: { tier, status },
          },
        },
      });

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="users-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else if (format === 'json') {
      // Return JSON format
      const jsonData = users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscriptionTier: user.subscriptionTier || 'free',
        subscriptionStatus: user.subscription?.status || 'inactive',
        emailVerified: user.emailVerified,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        paymentCount: user._count.payments,
      }));

      return NextResponse.json({
        exportDate: new Date().toISOString(),
        totalRecords: jsonData.length,
        users: jsonData,
      });
    }

    return NextResponse.json(
      { error: 'Invalid export format' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Export users error:', error);
    return NextResponse.json(
      { error: 'Failed to export users' },
      { status: 500 }
    );
  }
});