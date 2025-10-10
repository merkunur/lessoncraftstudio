import { NextRequest, NextResponse } from 'next/server';
import { RealUserMonitoring, WebVital } from '@/types/performance';

export const dynamic = 'force-dynamic';

// GET /api/performance/rum - Get Real User Monitoring data
export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from a time-series database
    const rumData: RealUserMonitoring[] = [
      {
        sessionId: 'session_1234567890',
        userId: 'user_123',
        startTime: new Date(Date.now() - 3600000).toISOString(),
        endTime: new Date(Date.now() - 1800000).toISOString(),
        url: 'https://example.com/worksheets',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        device: {
          type: 'desktop',
          browser: 'Chrome',
          browserVersion: '120.0.0',
          os: 'Windows',
          osVersion: '10',
          screenResolution: '1920x1080',
          viewport: '1920x969',
          deviceMemory: 8,
          hardwareConcurrency: 8
        },
        location: {
          country: 'United States',
          region: 'California',
          city: 'San Francisco',
          timezone: 'America/Los_Angeles'
        },
        metrics: [
          {
            id: 'metric_1',
            timestamp: new Date(Date.now() - 3500000).toISOString(),
            name: 'page_load',
            value: 2345,
            unit: 'ms',
            category: 'navigation'
          },
          {
            id: 'metric_2',
            timestamp: new Date(Date.now() - 3400000).toISOString(),
            name: 'dom_content_loaded',
            value: 1234,
            unit: 'ms',
            category: 'navigation'
          }
        ],
        webVitals: [
          {
            id: 'vital_1',
            name: 'LCP',
            value: 2456,
            rating: 'good',
            timestamp: new Date(Date.now() - 3300000).toISOString(),
            url: 'https://example.com/worksheets',
            deviceType: 'desktop'
          },
          {
            id: 'vital_2',
            name: 'FID',
            value: 45,
            rating: 'good',
            timestamp: new Date(Date.now() - 3200000).toISOString(),
            url: 'https://example.com/worksheets',
            deviceType: 'desktop'
          },
          {
            id: 'vital_3',
            name: 'CLS',
            value: 0.05,
            rating: 'good',
            timestamp: new Date(Date.now() - 3100000).toISOString(),
            url: 'https://example.com/worksheets',
            deviceType: 'desktop'
          }
        ],
        errors: [],
        interactions: [
          {
            id: 'interaction_1',
            timestamp: new Date(Date.now() - 3000000).toISOString(),
            type: 'click',
            target: 'button#generate',
            duration: 150
          },
          {
            id: 'interaction_2',
            timestamp: new Date(Date.now() - 2500000).toISOString(),
            type: 'form_submit',
            target: 'form#worksheet-config',
            duration: 500
          }
        ],
        resources: [
          {
            name: 'https://example.com/static/css/main.css',
            entryType: 'resource',
            startTime: 100,
            duration: 234,
            transferSize: 45678,
            encodedBodySize: 45678,
            decodedBodySize: 145678,
            initiatorType: 'link'
          },
          {
            name: 'https://example.com/static/js/app.js',
            entryType: 'resource',
            startTime: 150,
            duration: 456,
            transferSize: 234567,
            encodedBodySize: 234567,
            decodedBodySize: 567890,
            initiatorType: 'script'
          }
        ]
      },
      {
        sessionId: 'session_0987654321',
        userId: 'user_456',
        startTime: new Date(Date.now() - 7200000).toISOString(),
        endTime: new Date(Date.now() - 5400000).toISOString(),
        url: 'https://example.com/templates',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        device: {
          type: 'mobile',
          browser: 'Safari',
          browserVersion: '17.0',
          os: 'iOS',
          osVersion: '17.0',
          screenResolution: '390x844',
          viewport: '390x664',
          deviceMemory: 4
        },
        location: {
          country: 'United Kingdom',
          region: 'England',
          city: 'London',
          timezone: 'Europe/London'
        },
        metrics: [
          {
            id: 'metric_3',
            timestamp: new Date(Date.now() - 7100000).toISOString(),
            name: 'page_load',
            value: 3456,
            unit: 'ms',
            category: 'navigation'
          }
        ],
        webVitals: [
          {
            id: 'vital_4',
            name: 'LCP',
            value: 3567,
            rating: 'needs-improvement',
            timestamp: new Date(Date.now() - 7000000).toISOString(),
            url: 'https://example.com/templates',
            deviceType: 'mobile'
          },
          {
            id: 'vital_5',
            name: 'FID',
            value: 234,
            rating: 'needs-improvement',
            timestamp: new Date(Date.now() - 6900000).toISOString(),
            url: 'https://example.com/templates',
            deviceType: 'mobile'
          },
          {
            id: 'vital_6',
            name: 'CLS',
            value: 0.18,
            rating: 'needs-improvement',
            timestamp: new Date(Date.now() - 6800000).toISOString(),
            url: 'https://example.com/templates',
            deviceType: 'mobile'
          }
        ],
        errors: [
          {
            id: 'error_1',
            timestamp: new Date(Date.now() - 6500000).toISOString(),
            level: 'error',
            type: 'javascript',
            message: 'Cannot read property "length" of undefined',
            stack: 'TypeError: Cannot read property "length" of undefined\n    at generateWorksheet',
            filename: '/static/js/app.js',
            lineno: 234,
            colno: 45,
            url: 'https://example.com/templates',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
            sessionId: 'session_0987654321',
            userId: 'user_456'
          }
        ],
        interactions: [
          {
            id: 'interaction_3',
            timestamp: new Date(Date.now() - 6000000).toISOString(),
            type: 'scroll',
            duration: 5000
          }
        ],
        resources: []
      },
      {
        sessionId: 'session_1122334455',
        startTime: new Date(Date.now() - 1800000).toISOString(),
        url: 'https://example.com/dashboard',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)',
        device: {
          type: 'tablet',
          browser: 'Safari',
          browserVersion: '17.0',
          os: 'iPadOS',
          osVersion: '17.0',
          screenResolution: '1024x768',
          viewport: '1024x768'
        },
        metrics: [],
        webVitals: [
          {
            id: 'vital_7',
            name: 'LCP',
            value: 1234,
            rating: 'good',
            timestamp: new Date(Date.now() - 1700000).toISOString(),
            url: 'https://example.com/dashboard',
            deviceType: 'tablet'
          },
          {
            id: 'vital_8',
            name: 'TTFB',
            value: 567,
            rating: 'good',
            timestamp: new Date(Date.now() - 1600000).toISOString(),
            url: 'https://example.com/dashboard',
            deviceType: 'tablet'
          }
        ],
        errors: [],
        interactions: [],
        resources: []
      }
    ];

    return NextResponse.json(rumData);
  } catch (error) {
    console.error('Failed to get RUM data:', error);
    return NextResponse.json(
      { error: 'Failed to get RUM data' },
      { status: 500 }
    );
  }
}

// POST /api/performance/rum - Record RUM data
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In production, this would store in a time-series database
    console.log('Recording RUM data:', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to record RUM data:', error);
    return NextResponse.json(
      { error: 'Failed to record RUM data' },
      { status: 500 }
    );
  }
}