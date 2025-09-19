import { NextRequest, NextResponse } from 'next/server';
import { WebVital } from '@/types/performance';

// GET /api/performance/web-vitals - Get Web Vitals data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '24h';
    const metric = searchParams.get('metric');

    // In production, this would query from a metrics database
    const webVitals: WebVital[] = [
      // Good performance examples
      {
        id: 'wv_001',
        name: 'LCP',
        value: 2100,
        rating: 'good',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: '4g'
      },
      {
        id: 'wv_002',
        name: 'FID',
        value: 45,
        rating: 'good',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: '4g'
      },
      {
        id: 'wv_003',
        name: 'CLS',
        value: 0.05,
        rating: 'good',
        timestamp: new Date(Date.now() - 3400000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: '4g'
      },
      {
        id: 'wv_004',
        name: 'TTFB',
        value: 600,
        rating: 'good',
        timestamp: new Date(Date.now() - 3300000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: '4g'
      },
      {
        id: 'wv_005',
        name: 'INP',
        value: 150,
        rating: 'good',
        timestamp: new Date(Date.now() - 3200000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: '4g'
      },
      
      // Needs improvement examples
      {
        id: 'wv_006',
        name: 'LCP',
        value: 3200,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 3100000).toISOString(),
        url: 'https://example.com/worksheets',
        deviceType: 'mobile',
        connectionType: '3g'
      },
      {
        id: 'wv_007',
        name: 'FID',
        value: 200,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        url: 'https://example.com/worksheets',
        deviceType: 'mobile',
        connectionType: '3g'
      },
      {
        id: 'wv_008',
        name: 'CLS',
        value: 0.15,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 2900000).toISOString(),
        url: 'https://example.com/worksheets',
        deviceType: 'mobile',
        connectionType: '3g'
      },
      
      // Poor performance examples
      {
        id: 'wv_009',
        name: 'LCP',
        value: 4500,
        rating: 'poor',
        timestamp: new Date(Date.now() - 2800000).toISOString(),
        url: 'https://example.com/templates',
        deviceType: 'mobile',
        connectionType: '2g'
      },
      {
        id: 'wv_010',
        name: 'FID',
        value: 350,
        rating: 'poor',
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        url: 'https://example.com/templates',
        deviceType: 'mobile',
        connectionType: '2g'
      },
      {
        id: 'wv_011',
        name: 'CLS',
        value: 0.3,
        rating: 'poor',
        timestamp: new Date(Date.now() - 2600000).toISOString(),
        url: 'https://example.com/templates',
        deviceType: 'mobile',
        connectionType: '2g'
      },
      {
        id: 'wv_012',
        name: 'TTFB',
        value: 2000,
        rating: 'poor',
        timestamp: new Date(Date.now() - 2500000).toISOString(),
        url: 'https://example.com/templates',
        deviceType: 'mobile',
        connectionType: '2g'
      },
      
      // More recent good performance
      {
        id: 'wv_013',
        name: 'LCP',
        value: 1800,
        rating: 'good',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: 'wifi'
      },
      {
        id: 'wv_014',
        name: 'FCP',
        value: 1200,
        rating: 'good',
        timestamp: new Date(Date.now() - 1700000).toISOString(),
        url: 'https://example.com/',
        deviceType: 'desktop',
        connectionType: 'wifi'
      },
      {
        id: 'wv_015',
        name: 'LCP',
        value: 2800,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 1600000).toISOString(),
        url: 'https://example.com/editor',
        deviceType: 'tablet',
        connectionType: '4g'
      },
      {
        id: 'wv_016',
        name: 'FID',
        value: 80,
        rating: 'good',
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        url: 'https://example.com/editor',
        deviceType: 'tablet',
        connectionType: '4g'
      },
      {
        id: 'wv_017',
        name: 'CLS',
        value: 0.08,
        rating: 'good',
        timestamp: new Date(Date.now() - 1400000).toISOString(),
        url: 'https://example.com/editor',
        deviceType: 'tablet',
        connectionType: '4g'
      },
      {
        id: 'wv_018',
        name: 'FCP',
        value: 2200,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 1300000).toISOString(),
        url: 'https://example.com/dashboard',
        deviceType: 'desktop',
        connectionType: 'wifi'
      },
      {
        id: 'wv_019',
        name: 'LCP',
        value: 3100,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        url: 'https://example.com/dashboard',
        deviceType: 'desktop',
        connectionType: 'wifi'
      },
      {
        id: 'wv_020',
        name: 'INP',
        value: 250,
        rating: 'needs-improvement',
        timestamp: new Date(Date.now() - 1100000).toISOString(),
        url: 'https://example.com/dashboard',
        deviceType: 'desktop',
        connectionType: 'wifi'
      }
    ];

    // Filter by metric if specified
    const filteredVitals = metric
      ? webVitals.filter(v => v.name === metric)
      : webVitals;

    return NextResponse.json(filteredVitals);
  } catch (error) {
    console.error('Failed to get Web Vitals:', error);
    return NextResponse.json(
      { error: 'Failed to get Web Vitals' },
      { status: 500 }
    );
  }
}

// POST /api/performance/web-vitals - Record Web Vital metric
export async function POST(request: NextRequest) {
  try {
    const vital: WebVital = await request.json();
    
    // In production, this would store in a metrics database
    console.log('Recording Web Vital:', vital);
    
    return NextResponse.json({ success: true, id: `wv_${Date.now()}` });
  } catch (error) {
    console.error('Failed to record Web Vital:', error);
    return NextResponse.json(
      { error: 'Failed to record Web Vital' },
      { status: 500 }
    );
  }
}