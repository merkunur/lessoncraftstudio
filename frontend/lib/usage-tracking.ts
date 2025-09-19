import { prisma } from './prisma';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from './stripe-config';

export interface UsageTracking {
  userId: string;
  appName: string;
  action: 'generate' | 'download' | 'view' | 'share';
  configuration?: any;
  outputFormat?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface QuotaCheck {
  allowed: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number;
  remaining?: number;
}

// Get or create monthly usage quota record
export async function getOrCreateMonthlyQuota(userId: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12

  // Get user's subscription tier
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscriptionTier: true },
  });

  const tier = (user?.subscriptionTier?.toUpperCase() || 'FREE') as SubscriptionTier;
  const tierConfig = SUBSCRIPTION_TIERS[tier];

  // Find or create quota record for current month
  let quota = await prisma.usageQuota.findUnique({
    where: {
      userId_year_month: {
        userId,
        year,
        month,
      },
    },
  });

  if (!quota) {
    quota = await prisma.usageQuota.create({
      data: {
        userId,
        year,
        month,
        downloadsLimit: tierConfig.limits.monthlyDownloads,
        generatorsLimit: tierConfig.limits.generators,
        subscriptionTier: tier.toLowerCase(),
      },
    });
  } else if (quota.subscriptionTier !== tier.toLowerCase()) {
    // Update limits if subscription tier changed
    quota = await prisma.usageQuota.update({
      where: { id: quota.id },
      data: {
        downloadsLimit: tierConfig.limits.monthlyDownloads,
        generatorsLimit: tierConfig.limits.generators,
        subscriptionTier: tier.toLowerCase(),
      },
    });
  }

  return quota;
}

// Check if user can download
export async function checkDownloadQuota(userId: string): Promise<QuotaCheck> {
  const quota = await getOrCreateMonthlyQuota(userId);

  // Unlimited downloads (-1)
  if (quota.downloadsLimit === -1) {
    return {
      allowed: true,
      currentUsage: quota.downloadsUsed,
      limit: -1,
      remaining: -1,
    };
  }

  // Check if within limit
  const remaining = quota.downloadsLimit - quota.downloadsUsed;
  if (remaining > 0) {
    return {
      allowed: true,
      currentUsage: quota.downloadsUsed,
      limit: quota.downloadsLimit,
      remaining,
    };
  }

  return {
    allowed: false,
    reason: 'Monthly download limit reached. Please upgrade your plan for more downloads.',
    currentUsage: quota.downloadsUsed,
    limit: quota.downloadsLimit,
    remaining: 0,
  };
}

// Check if user can access generator
export async function checkGeneratorAccess(
  userId: string,
  appName: string
): Promise<QuotaCheck> {
  const quota = await getOrCreateMonthlyQuota(userId);

  // Define which generators are available for each tier
  const freeGenerators = [
    'addition',
    'subtraction',
    'coloring',
    'matching',
    'wordsearch',
  ];

  const coreGenerators = [
    ...freeGenerators,
    'multiplication',
    'division',
    'fractions',
    'alphabet-train',
    'crossword',
    'sudoku',
    'maze',
    'connect-dots',
    'pattern-recognition',
    'shape-matching',
    'number-sequence',
    'word-scramble',
    'memory-game',
    'spot-difference',
    'clock-reading',
  ];

  // All generators for FULL tier
  if (quota.generatorsLimit === -1) {
    return {
      allowed: true,
      currentUsage: quota.generatorsUsed.length,
      limit: -1,
      remaining: -1,
    };
  }

  // Check tier-based access
  const tier = quota.subscriptionTier.toUpperCase();
  let allowedGenerators: string[] = [];

  if (tier === 'FREE') {
    allowedGenerators = freeGenerators;
  } else if (tier === 'CORE') {
    allowedGenerators = coreGenerators;
  } else {
    // FULL tier - all generators
    return {
      allowed: true,
      currentUsage: quota.generatorsUsed.length,
      limit: -1,
      remaining: -1,
    };
  }

  // Check if generator is in allowed list
  const normalizedAppName = appName.toLowerCase().replace(/[\s_]/g, '-');
  if (!allowedGenerators.includes(normalizedAppName)) {
    return {
      allowed: false,
      reason: `This worksheet generator requires a ${tier === 'FREE' ? 'Core or Full' : 'Full'} subscription.`,
      currentUsage: quota.generatorsUsed.length,
      limit: allowedGenerators.length,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    currentUsage: quota.generatorsUsed.length,
    limit: allowedGenerators.length,
    remaining: allowedGenerators.length,
  };
}

// Track worksheet usage
export async function trackUsage(data: UsageTracking) {
  const { userId, appName, action, ...rest } = data;

  // Create usage record
  const usage = await prisma.worksheetUsage.create({
    data: {
      userId,
      appName,
      action,
      outputFormat: rest.outputFormat || 'pdf',
      configuration: rest.configuration || {},
      sessionId: rest.sessionId,
      ipAddress: rest.ipAddress,
      userAgent: rest.userAgent,
      countedInQuota: action === 'download',
    },
  });

  // Update quota if it's a download
  if (action === 'download') {
    const quota = await getOrCreateMonthlyQuota(userId);
    await prisma.usageQuota.update({
      where: { id: quota.id },
      data: {
        downloadsUsed: { increment: 1 },
      },
    });
  }

  // Update quota if it's a new generator
  if (action === 'generate') {
    const quota = await getOrCreateMonthlyQuota(userId);
    const normalizedAppName = appName.toLowerCase().replace(/[\s_]/g, '-');
    
    if (!quota.generatorsUsed.includes(normalizedAppName)) {
      await prisma.usageQuota.update({
        where: { id: quota.id },
        data: {
          generatorsUsed: { push: normalizedAppName },
          worksheetsGenerated: { increment: 1 },
        },
      });
    } else {
      // Just increment worksheet count
      await prisma.usageQuota.update({
        where: { id: quota.id },
        data: {
          worksheetsGenerated: { increment: 1 },
        },
      });
    }
  }

  return usage;
}

// Get usage statistics for a user
export async function getUserUsageStats(userId: string) {
  const quota = await getOrCreateMonthlyQuota(userId);
  
  // Get current month's usage details
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const monthlyUsage = await prisma.worksheetUsage.findMany({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    select: {
      action: true,
      appName: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Group by action
  const actionCounts = monthlyUsage.reduce((acc, usage) => {
    acc[usage.action] = (acc[usage.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get unique generators used
  const uniqueGenerators = new Set(
    monthlyUsage
      .filter(u => u.action === 'generate')
      .map(u => u.appName.toLowerCase().replace(/[\s_]/g, '-'))
  );

  return {
    quota: {
      downloads: {
        used: quota.downloadsUsed,
        limit: quota.downloadsLimit,
        remaining: quota.downloadsLimit === -1 ? -1 : Math.max(0, quota.downloadsLimit - quota.downloadsUsed),
      },
      generators: {
        used: uniqueGenerators.size,
        limit: quota.generatorsLimit,
        list: Array.from(uniqueGenerators),
      },
      worksheets: {
        generated: quota.worksheetsGenerated,
      },
    },
    activity: {
      total: monthlyUsage.length,
      byAction: actionCounts,
      recentUsage: monthlyUsage.slice(0, 10),
    },
    period: {
      year: quota.year,
      month: quota.month,
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
  };
}

// Reset monthly quotas (for cron job)
export async function resetMonthlyQuotas() {
  const now = new Date();
  const lastMonth = now.getMonth(); // 0-11
  const year = lastMonth === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = lastMonth === 0 ? 12 : lastMonth;

  // Archive last month's quotas (optional)
  const lastMonthQuotas = await prisma.usageQuota.findMany({
    where: {
      year,
      month,
    },
  });

  console.log(`Archived ${lastMonthQuotas.length} quota records for ${year}-${month}`);

  // New month quotas will be created automatically when users access the system
  return lastMonthQuotas.length;
}