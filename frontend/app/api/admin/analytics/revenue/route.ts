import { NextRequest, NextResponse } from 'next/server';
import { RevenueData } from '@/types/analytics';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/revenue - Get revenue analytics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    // Mock revenue data for development
    const revenueData: RevenueData[] = [];

    // Generate daily revenue data for the period
    const startDate = start ? new Date(start) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = end ? new Date(end) : new Date();

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      revenueData.push({
        date: d.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 5000) + 3000, // Random between 3000-8000
        transactions: Math.floor(Math.random() * 50) + 20,
        averageOrderValue: Math.floor(Math.random() * 100) + 50,
        currency: 'usd',
        breakdown: {
          subscriptions: Math.floor(Math.random() * 3000) + 2000,
          oneTime: Math.floor(Math.random() * 1000) + 500,
          upgrades: Math.floor(Math.random() * 500) + 200,
          renewals: Math.floor(Math.random() * 1500) + 1000
        }
      });
    }

    return NextResponse.json(revenueData);
  } catch (error) {
    console.error('Failed to get revenue analytics:', error);
    return NextResponse.json(
      { error: 'Failed to get revenue analytics' },
      { status: 500 }
    );
  }
}