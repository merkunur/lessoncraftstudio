import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getOrCreateMonthlyQuota } from '@/lib/usage-tracking';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe-config';

// GET /api/usage/quota - Get current quota status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      // Return default FREE quotas for unauthenticated users
      const freeQuotas = SUBSCRIPTION_TIERS.FREE.limits;
      return NextResponse.json({
        authenticated: false,
        tier: 'FREE',
        quotas: {
          downloads: {
            used: 0,
            limit: freeQuotas.monthlyDownloads,
            remaining: freeQuotas.monthlyDownloads,
            percentage: 0,
          },
          generators: {
            used: 0,
            limit: freeQuotas.generators,
            remaining: freeQuotas.generators,
            percentage: 0,
          },
          worksheets: {
            generated: 0,
            unlimited: true,
          },
        },
        period: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          daysRemaining: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate(),
        },
      });
    }

    // Get user's current quota
    const quota = await getOrCreateMonthlyQuota(user.id);
    const tier = user.subscriptionTier?.toUpperCase() || 'FREE';

    // Calculate days remaining in month
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = daysInMonth - now.getDate();

    // Calculate percentages
    const downloadPercentage = quota.downloadsLimit === -1 
      ? 0 
      : Math.round((quota.downloadsUsed / quota.downloadsLimit) * 100);
    
    const generatorPercentage = quota.generatorsLimit === -1
      ? 0
      : Math.round((quota.generatorsUsed.length / quota.generatorsLimit) * 100);

    return NextResponse.json({
      authenticated: true,
      tier,
      quotas: {
        downloads: {
          used: quota.downloadsUsed,
          limit: quota.downloadsLimit,
          remaining: quota.downloadsLimit === -1 ? -1 : Math.max(0, quota.downloadsLimit - quota.downloadsUsed),
          percentage: downloadPercentage,
          unlimited: quota.downloadsLimit === -1,
        },
        generators: {
          used: quota.generatorsUsed.length,
          limit: quota.generatorsLimit,
          remaining: quota.generatorsLimit === -1 ? -1 : Math.max(0, quota.generatorsLimit - quota.generatorsUsed.length),
          percentage: generatorPercentage,
          unlimited: quota.generatorsLimit === -1,
          list: quota.generatorsUsed,
        },
        worksheets: {
          generated: quota.worksheetsGenerated,
          unlimited: true, // No limits on worksheet generation
        },
      },
      period: {
        year: quota.year,
        month: quota.month,
        daysRemaining,
        resetDate: new Date(quota.year, quota.month, 1).toISOString(),
      },
      upgradeAvailable: tier !== 'FULL',
    });
  } catch (error) {
    console.error('Get quota error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quota' },
      { status: 500 }
    );
  }
}

// POST /api/usage/quota - Manually refresh quota (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin (you may want to add an isAdmin field to User model)
    if (!user.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, action } = body;

    if (action === 'reset') {
      // Reset a user's monthly quota
      const targetUserId = userId || user.id;
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const { prisma } = await import('@/lib/prisma');
      
      // Delete current month's quota to force recreation
      await prisma.usageQuota.deleteMany({
        where: {
          userId: targetUserId,
          year,
          month,
        },
      });

      // Recreate quota
      const newQuota = await getOrCreateMonthlyQuota(targetUserId);

      return NextResponse.json({
        success: true,
        message: 'Quota reset successfully',
        quota: newQuota,
      });
    } else if (action === 'grant') {
      // Grant additional quota
      const { downloads, generators } = body;
      const targetUserId = userId || user.id;

      const quota = await getOrCreateMonthlyQuota(targetUserId);
      const { prisma } = await import('@/lib/prisma');

      const updates: any = {};
      if (downloads) {
        updates.downloadsLimit = quota.downloadsLimit + downloads;
      }
      if (generators) {
        updates.generatorsLimit = quota.generatorsLimit + generators;
      }

      const updatedQuota = await prisma.usageQuota.update({
        where: { id: quota.id },
        data: updates,
      });

      return NextResponse.json({
        success: true,
        message: 'Additional quota granted',
        quota: updatedQuota,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "reset" or "grant"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Quota management error:', error);
    return NextResponse.json(
      { error: 'Failed to manage quota' },
      { status: 500 }
    );
  }
}

// DELETE /api/usage/quota - Clear usage history (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const targetUserId = searchParams.get('userId');
    const olderThan = searchParams.get('olderThan'); // days

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/prisma');
    
    const cutoffDate = olderThan 
      ? new Date(Date.now() - parseInt(olderThan) * 24 * 60 * 60 * 1000)
      : new Date(0); // All time if not specified

    // Delete old usage records
    const deleted = await prisma.worksheetUsage.deleteMany({
      where: {
        userId: targetUserId,
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Deleted ${deleted.count} usage records`,
      cutoffDate,
    });
  } catch (error) {
    console.error('Clear usage error:', error);
    return NextResponse.json(
      { error: 'Failed to clear usage' },
      { status: 500 }
    );
  }
}