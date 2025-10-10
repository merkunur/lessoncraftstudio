import { NextRequest, NextResponse } from 'next/server';
import { SyntheticMonitor, MonitorRun } from '@/types/performance';

export const dynamic = 'force-dynamic';

// GET /api/performance/synthetic - Get synthetic monitors
export async function GET(request: NextRequest) {
  try {
    const monitors: SyntheticMonitor[] = [
      {
        id: 'monitor_1',
        name: 'Homepage Health Check',
        url: 'https://example.com',
        frequency: 5,
        locations: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
        enabled: true,
        script: `
          // Check homepage loads
          await page.goto('https://example.com');
          await page.waitForSelector('h1');
          
          // Check main CTA is visible
          await page.waitForSelector('button[data-testid="get-started"]');
        `,
        assertions: [
          {
            type: 'status-code',
            operator: 'equals',
            target: 'response.status',
            value: 200
          },
          {
            type: 'response-time',
            operator: 'less-than',
            target: 'response.time',
            value: 3000
          },
          {
            type: 'text-content',
            operator: 'contains',
            target: 'body',
            value: 'Welcome to LessonCraft'
          }
        ],
        alerting: {
          enabled: true,
          failureCount: 2,
          channels: [
            {
              type: 'email',
              config: {
                recipients: ['ops@example.com']
              }
            },
            {
              type: 'slack',
              config: {
                webhookUrl: 'https://hooks.slack.com/services/...',
                channel: '#monitoring'
              }
            }
          ]
        },
        lastRun: {
          id: 'run_1',
          timestamp: new Date(Date.now() - 60000).toISOString(),
          location: 'us-east-1',
          status: 'success',
          responseTime: 1234,
          assertionResults: [
            {
              assertion: {
                type: 'status-code',
                operator: 'equals',
                target: 'response.status',
                value: 200
              },
              passed: true,
              actualValue: 200
            },
            {
              assertion: {
                type: 'response-time',
                operator: 'less-than',
                target: 'response.time',
                value: 3000
              },
              passed: true,
              actualValue: 1234
            }
          ]
        },
        history: [
          {
            id: 'run_1',
            timestamp: new Date(Date.now() - 60000).toISOString(),
            location: 'us-east-1',
            status: 'success',
            responseTime: 1234,
            assertionResults: []
          },
          {
            id: 'run_2',
            timestamp: new Date(Date.now() - 360000).toISOString(),
            location: 'eu-west-1',
            status: 'success',
            responseTime: 1456,
            assertionResults: []
          },
          {
            id: 'run_3',
            timestamp: new Date(Date.now() - 660000).toISOString(),
            location: 'ap-southeast-1',
            status: 'failure',
            responseTime: 5234,
            assertionResults: [],
            error: 'Response time exceeded threshold'
          }
        ]
      },
      {
        id: 'monitor_2',
        name: 'API Endpoint Check',
        url: 'https://api.example.com/health',
        frequency: 1,
        locations: ['us-east-1'],
        enabled: true,
        assertions: [
          {
            type: 'status-code',
            operator: 'equals',
            target: 'response.status',
            value: 200
          },
          {
            type: 'response-time',
            operator: 'less-than',
            target: 'response.time',
            value: 500
          }
        ],
        alerting: {
          enabled: true,
          failureCount: 1,
          channels: [
            {
              type: 'pagerduty',
              config: {
                integrationKey: 'xxx-xxx-xxx',
                severity: 'critical'
              }
            }
          ]
        },
        lastRun: {
          id: 'run_4',
          timestamp: new Date(Date.now() - 30000).toISOString(),
          location: 'us-east-1',
          status: 'success',
          responseTime: 234,
          assertionResults: [
            {
              assertion: {
                type: 'status-code',
                operator: 'equals',
                target: 'response.status',
                value: 200
              },
              passed: true,
              actualValue: 200
            },
            {
              assertion: {
                type: 'response-time',
                operator: 'less-than',
                target: 'response.time',
                value: 500
              },
              passed: true,
              actualValue: 234
            }
          ]
        },
        history: []
      },
      {
        id: 'monitor_3',
        name: 'Checkout Flow Test',
        url: 'https://example.com/checkout',
        frequency: 60,
        locations: ['us-east-1', 'eu-west-1'],
        enabled: false,
        script: `
          // Navigate to product page
          await page.goto('https://example.com/products/premium');
          
          // Add to cart
          await page.click('[data-testid="add-to-cart"]');
          
          // Go to checkout
          await page.click('[data-testid="checkout"]');
          
          // Verify checkout page loads
          await page.waitForSelector('form[name="checkout"]');
        `,
        assertions: [
          {
            type: 'element-visible',
            operator: 'equals',
            target: 'form[name="checkout"]',
            value: true
          }
        ],
        alerting: {
          enabled: false,
          failureCount: 3,
          channels: []
        },
        history: []
      }
    ];

    return NextResponse.json(monitors);
  } catch (error) {
    console.error('Failed to get synthetic monitors:', error);
    return NextResponse.json(
      { error: 'Failed to get synthetic monitors' },
      { status: 500 }
    );
  }
}

// POST /api/performance/synthetic - Create synthetic monitor
export async function POST(request: NextRequest) {
  try {
    const monitor = await request.json();
    
    // In production, this would create the monitor in the monitoring system
    console.log('Creating synthetic monitor:', monitor);
    
    return NextResponse.json({
      success: true,
      id: `monitor_${Date.now()}`,
      message: 'Monitor created successfully'
    });
  } catch (error) {
    console.error('Failed to create monitor:', error);
    return NextResponse.json(
      { error: 'Failed to create monitor' },
      { status: 500 }
    );
  }
}