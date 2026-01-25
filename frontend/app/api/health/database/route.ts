import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface DatabaseHealthCheck {
  status: 'healthy' | 'degraded' | 'error';
  productSampleCount: number;
  sampleWorksheetCount: number;
  lastSampleUpdated: string | null;
  timestamp: string;
  error?: string;
}

export async function GET(): Promise<NextResponse> {
  const health: DatabaseHealthCheck = {
    status: 'error',
    productSampleCount: 0,
    sampleWorksheetCount: 0,
    lastSampleUpdated: null,
    timestamp: new Date().toISOString(),
  };

  try {
    // Count product samples (SEO metadata records)
    const productSampleCount = await prisma.productSample.count();
    health.productSampleCount = productSampleCount;

    // Count sample worksheets
    const sampleWorksheetCount = await prisma.sampleWorksheet.count();
    health.sampleWorksheetCount = sampleWorksheetCount;

    // Get most recent update
    const lastSample = await prisma.productSample.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true },
    });
    health.lastSampleUpdated = lastSample?.updatedAt?.toISOString() || null;

    // Database count is informational only - zero is a valid starting state
    // Content is uploaded via content manager at /admin/product-sample-manager.html
    health.status = 'healthy';

    return NextResponse.json(health, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    health.error = error instanceof Error ? error.message : 'Unknown database error';
    console.error('[HEALTH/DATABASE] Error:', error);

    return NextResponse.json(health, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  }
}
