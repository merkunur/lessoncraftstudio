# Admin Billing Dashboard & Analytics Guide

## Overview

This guide covers building a comprehensive admin billing dashboard for monitoring revenue, subscriptions, payments, and customer metrics. The dashboard provides actionable insights for business decisions and financial tracking.

## Key Metrics to Track

### Revenue Metrics

1. **MRR (Monthly Recurring Revenue)**
   - Total monthly revenue from active subscriptions
   - MRR by tier (FREE, CORE, FULL)
   - MRR growth rate (month-over-month)

2. **ARR (Annual Recurring Revenue)**
   - MRR × 12 for monthly subscriptions
   - Direct ARR from yearly subscriptions
   - Total ARR across all tiers

3. **ARPU (Average Revenue Per User)**
   - Total revenue / Active paying users
   - ARPU by tier
   - ARPU trends over time

4. **LTV (Lifetime Value)**
   - Average revenue per customer over entire relationship
   - Formula: ARPU / Churn Rate
   - LTV by acquisition channel

### Subscription Metrics

1. **Active Subscriptions**
   - Total count by tier
   - Active vs trial vs past_due
   - Subscription status distribution

2. **New Subscriptions**
   - New subscriptions this month
   - Growth rate
   - Conversion rate from free to paid

3. **Churn Rate**
   - Voluntary churn (canceled)
   - Involuntary churn (payment failures)
   - Total churn rate
   - Formula: (Canceled Subs / Total Subs) × 100

4. **Retention Rate**
   - Percentage of subscribers retained
   - Cohort analysis
   - Formula: 100 - Churn Rate

### Payment Metrics

1. **Success Rate**
   - Successful payments / Total payment attempts
   - Success rate by payment method
   - Success rate by country

2. **Failed Payments**
   - Total failures this month
   - Failure reasons breakdown
   - Recovery rate from dunning

3. **Refunds**
   - Total refund amount
   - Refund rate
   - Refund reasons

4. **Outstanding Invoices**
   - Unpaid invoice count
   - Total outstanding amount
   - Age of outstanding invoices

## Database Queries

### Calculate MRR

```typescript
// lib/analytics/revenue.ts

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
    const tierInfo = SUBSCRIPTION_TIERS[tier];

    if (sub.billingInterval === 'yearly') {
      mrr += (tierInfo.priceYearly || 0) / 12;
    } else {
      mrr += tierInfo.price;
    }
  }

  return mrr;
}

export async function calculateARR(): Promise<number> {
  const mrr = await calculateMRR();
  return mrr.total * 12;
}
```

### Calculate Churn Rate

```typescript
// lib/analytics/churn.ts

import { prisma } from '@/lib/prisma';

interface ChurnData {
  rate: number; // Percentage
  voluntary: number; // Canceled by user
  involuntary: number; // Payment failures
  totalCanceled: number;
  activeSubscriptions: number;
}

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

  // Canceled during period
  const canceledVoluntary = await prisma.subscription.count({
    where: {
      canceledAt: { gte: startDate, lte: endDate },
      cancelReason: { not: 'payment_failed' },
    },
  });

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
```

### Calculate LTV

```typescript
// lib/analytics/ltv.ts

import { prisma } from '@/lib/prisma';

interface LTVData {
  averageLTV: number;
  byTier: {
    FREE: number;
    CORE: number;
    FULL: number;
  };
}

export async function calculateLTV(): Promise<LTVData> {
  // Get average subscription lifetime
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

  for (const tier of ['FREE', 'CORE', 'FULL'] as const) {
    const lifetimes = lifetimesByTier[tier];
    if (lifetimes.length === 0) continue;

    const avgLifetime = lifetimes.reduce((a, b) => a + b, 0) / lifetimes.length;
    const tierPrice = SUBSCRIPTION_TIERS[tier].price;

    ltvByTier[tier] = avgLifetime * tierPrice;
  }

  const averageLTV =
    (ltvByTier.FREE + ltvByTier.CORE + ltvByTier.FULL) / 3;

  return {
    averageLTV,
    byTier: ltvByTier,
  };
}
```

### Payment Analytics

```typescript
// lib/analytics/payments.ts

import { prisma } from '@/lib/prisma';

interface PaymentAnalytics {
  totalRevenue: number;
  successfulPayments: number;
  failedPayments: number;
  successRate: number;
  refundedAmount: number;
  refundRate: number;
}

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
    : 0;

  const refundRate = totalRevenue > 0
    ? (refundedAmount / totalRevenue) * 100
    : 0;

  return {
    totalRevenue,
    successfulPayments,
    failedPayments,
    successRate,
    refundedAmount,
    refundRate,
  };
}
```

## API Endpoints

### Dashboard Overview

```typescript
// app/api/admin/billing/overview/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { calculateMRR, calculateARR } from '@/lib/analytics/revenue';
import { calculateChurnRate } from '@/lib/analytics/churn';
import { getPaymentAnalytics } from '@/lib/analytics/payments';
import { calculateLTV } from '@/lib/analytics/ltv';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [mrr, arr, churn, payments, ltv] = await Promise.all([
    calculateMRR(),
    calculateARR(),
    calculateChurnRate(startOfMonth, endOfMonth),
    getPaymentAnalytics(startOfMonth, endOfMonth),
    calculateLTV(),
  ]);

  return NextResponse.json({
    mrr,
    arr,
    churn,
    payments,
    ltv,
    period: {
      start: startOfMonth.toISOString(),
      end: endOfMonth.toISOString(),
    },
  });
}
```

### Subscription Analytics

```typescript
// app/api/admin/billing/subscriptions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || '30'; // days

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(period));

  // Subscription counts by status
  const byStatus = await prisma.subscription.groupBy({
    by: ['status'],
    _count: true,
  });

  // Subscription counts by tier
  const byTier = await prisma.user.groupBy({
    by: ['subscriptionTier'],
    _count: true,
    where: {
      subscriptionTier: { in: ['core', 'full'] },
    },
  });

  // New subscriptions in period
  const newSubscriptions = await prisma.subscription.count({
    where: {
      createdAt: { gte: startDate },
      status: { in: ['active', 'past_due'] },
    },
  });

  // Canceled in period
  const canceled = await prisma.subscription.count({
    where: {
      canceledAt: { gte: startDate },
    },
  });

  return NextResponse.json({
    byStatus: Object.fromEntries(
      byStatus.map((s) => [s.status, s._count])
    ),
    byTier: Object.fromEntries(
      byTier.map((t) => [t.subscriptionTier, t._count])
    ),
    newSubscriptions,
    canceled,
    period: parseInt(period),
  });
}
```

### Payment Failure Dashboard

```typescript
// app/api/admin/billing/failures/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Active payment failures
  const activeFailures = await prisma.paymentFailure.findMany({
    where: {
      status: { in: ['pending', 'retrying'] },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          subscriptionTier: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  // Failure reasons breakdown
  const failuresByReason = await prisma.paymentFailure.groupBy({
    by: ['failureCode'],
    _count: true,
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      },
    },
  });

  // Recovery statistics
  const recovered = await prisma.paymentFailure.count({
    where: {
      status: 'recovered',
      recoveredAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const totalFailures = await prisma.paymentFailure.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const recoveryRate = totalFailures > 0
    ? (recovered / totalFailures) * 100
    : 0;

  return NextResponse.json({
    activeFailures,
    failuresByReason: Object.fromEntries(
      failuresByReason.map((f) => [f.failureCode, f._count])
    ),
    recoveryRate,
    recovered,
    totalFailures,
  });
}
```

## Frontend Dashboard Components

### Dashboard Overview

```typescript
// app/admin/billing/page.tsx

'use client';

import { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface DashboardData {
  mrr: {
    total: number;
    byTier: { FREE: number; CORE: number; FULL: number };
    growth: number;
  };
  arr: number;
  churn: {
    rate: number;
    voluntary: number;
    involuntary: number;
    totalCanceled: number;
    activeSubscriptions: number;
  };
  payments: {
    totalRevenue: number;
    successfulPayments: number;
    failedPayments: number;
    successRate: number;
    refundedAmount: number;
    refundRate: number;
  };
  ltv: {
    averageLTV: number;
    byTier: { FREE: number; CORE: number; FULL: number };
  };
}

export default function AdminBillingDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/billing/overview');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Failed to load dashboard</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'usd',
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Billing & Analytics Dashboard
      </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="MRR"
          value={formatCurrency(data.mrr.total)}
          change={data.mrr.growth}
          icon={<DollarSign />}
          positive={data.mrr.growth >= 0}
        />
        <MetricCard
          title="ARR"
          value={formatCurrency(data.arr)}
          icon={<TrendingUp />}
        />
        <MetricCard
          title="Active Subscribers"
          value={data.churn.activeSubscriptions.toString()}
          icon={<Users />}
        />
        <MetricCard
          title="Churn Rate"
          value={`${data.churn.rate.toFixed(1)}%`}
          change={-data.churn.rate}
          icon={<AlertCircle />}
          positive={data.churn.rate < 5}
        />
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueByTierCard mrr={data.mrr} />
        <PaymentMetricsCard payments={data.payments} />
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 gap-6">
        <ChurnAnalysisCard churn={data.churn} />
        <LTVCard ltv={data.ltv} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon, positive }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {change !== undefined && (
        <div className={`text-sm mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}% from last month
        </div>
      )}
    </div>
  );
}

// Additional component implementations...
```

## Production Checklist

- [ ] Set up analytics database queries
- [ ] Create admin API endpoints with proper authentication
- [ ] Build dashboard UI components
- [ ] Add revenue charts (MRR, ARR trends)
- [ ] Implement payment failure monitoring
- [ ] Add cohort analysis
- [ ] Set up automated reports (weekly/monthly emails)
- [ ] Configure alerts for critical metrics
- [ ] Add export functionality (CSV, PDF)
- [ ] Test with production data
- [ ] Document metric calculations
- [ ] Train team on dashboard usage

## Best Practices

1. **Real-time vs Cached**: Cache expensive calculations, refresh hourly
2. **Date Ranges**: Support custom date ranges for flexible analysis
3. **Drill-down**: Allow clicking metrics to see detailed breakdowns
4. **Alerts**: Set up alerts for metrics outside normal ranges
5. **Export**: Enable CSV/Excel export for further analysis
6. **Mobile**: Ensure dashboard is mobile-responsive
7. **Permissions**: Restrict access to admin users only
8. **Audit Trail**: Log all admin actions on billing data
