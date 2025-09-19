import { NextRequest, NextResponse } from 'next/server';
import { LoadTestResult } from '@/types/performance';

// GET /api/performance/load-tests - Get load test results
export async function GET(request: NextRequest) {
  try {
    const loadTests: LoadTestResult[] = [
      {
        id: 'test_1',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        scenario: 'Peak Traffic Simulation',
        duration: 1800000, // 30 minutes
        virtualUsers: 1000,
        rampUpTime: 300000, // 5 minutes
        results: {
          totalRequests: 45678,
          successfulRequests: 45234,
          failedRequests: 444,
          avgResponseTime: 234,
          minResponseTime: 45,
          maxResponseTime: 3456,
          p50ResponseTime: 180,
          p95ResponseTime: 456,
          p99ResponseTime: 1234,
          requestsPerSecond: 25.4,
          bytesReceived: 234567890,
          bytesSent: 12345678,
          errors: {
            'Connection timeout': 234,
            'Server error (500)': 123,
            'Bad request (400)': 87
          }
        },
        charts: {
          responseTimeOverTime: [
            { timestamp: new Date(Date.now() - 86100000).toISOString(), value: 120 },
            { timestamp: new Date(Date.now() - 85800000).toISOString(), value: 145 },
            { timestamp: new Date(Date.now() - 85500000).toISOString(), value: 234 },
            { timestamp: new Date(Date.now() - 85200000).toISOString(), value: 289 },
            { timestamp: new Date(Date.now() - 84900000).toISOString(), value: 234 },
            { timestamp: new Date(Date.now() - 84600000).toISOString(), value: 198 }
          ],
          throughputOverTime: [
            { timestamp: new Date(Date.now() - 86100000).toISOString(), value: 15.2 },
            { timestamp: new Date(Date.now() - 85800000).toISOString(), value: 20.5 },
            { timestamp: new Date(Date.now() - 85500000).toISOString(), value: 25.4 },
            { timestamp: new Date(Date.now() - 85200000).toISOString(), value: 28.9 },
            { timestamp: new Date(Date.now() - 84900000).toISOString(), value: 25.4 },
            { timestamp: new Date(Date.now() - 84600000).toISOString(), value: 22.1 }
          ],
          errorsOverTime: [
            { timestamp: new Date(Date.now() - 86100000).toISOString(), value: 0 },
            { timestamp: new Date(Date.now() - 85800000).toISOString(), value: 2 },
            { timestamp: new Date(Date.now() - 85500000).toISOString(), value: 8 },
            { timestamp: new Date(Date.now() - 85200000).toISOString(), value: 15 },
            { timestamp: new Date(Date.now() - 84900000).toISOString(), value: 5 },
            { timestamp: new Date(Date.now() - 84600000).toISOString(), value: 3 }
          ],
          virtualUsersOverTime: [
            { timestamp: new Date(Date.now() - 86100000).toISOString(), value: 200 },
            { timestamp: new Date(Date.now() - 85800000).toISOString(), value: 400 },
            { timestamp: new Date(Date.now() - 85500000).toISOString(), value: 600 },
            { timestamp: new Date(Date.now() - 85200000).toISOString(), value: 800 },
            { timestamp: new Date(Date.now() - 84900000).toISOString(), value: 1000 },
            { timestamp: new Date(Date.now() - 84600000).toISOString(), value: 1000 }
          ]
        }
      },
      {
        id: 'test_2',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        scenario: 'Stress Test - Max Capacity',
        duration: 3600000, // 1 hour
        virtualUsers: 5000,
        rampUpTime: 600000, // 10 minutes
        results: {
          totalRequests: 234567,
          successfulRequests: 220456,
          failedRequests: 14111,
          avgResponseTime: 567,
          minResponseTime: 89,
          maxResponseTime: 8765,
          p50ResponseTime: 345,
          p95ResponseTime: 1234,
          p99ResponseTime: 3456,
          requestsPerSecond: 65.2,
          bytesReceived: 1234567890,
          bytesSent: 123456789,
          errors: {
            'Connection timeout': 8234,
            'Server error (500)': 3456,
            'Service unavailable (503)': 2421
          }
        },
        charts: {
          responseTimeOverTime: [
            { timestamp: new Date(Date.now() - 172500000).toISOString(), value: 234 },
            { timestamp: new Date(Date.now() - 172200000).toISOString(), value: 456 },
            { timestamp: new Date(Date.now() - 171900000).toISOString(), value: 789 },
            { timestamp: new Date(Date.now() - 171600000).toISOString(), value: 1234 }
          ],
          throughputOverTime: [
            { timestamp: new Date(Date.now() - 172500000).toISOString(), value: 45.6 },
            { timestamp: new Date(Date.now() - 172200000).toISOString(), value: 65.2 },
            { timestamp: new Date(Date.now() - 171900000).toISOString(), value: 72.3 },
            { timestamp: new Date(Date.now() - 171600000).toISOString(), value: 68.9 }
          ],
          errorsOverTime: [
            { timestamp: new Date(Date.now() - 172500000).toISOString(), value: 12 },
            { timestamp: new Date(Date.now() - 172200000).toISOString(), value: 45 },
            { timestamp: new Date(Date.now() - 171900000).toISOString(), value: 234 },
            { timestamp: new Date(Date.now() - 171600000).toISOString(), value: 567 }
          ],
          virtualUsersOverTime: [
            { timestamp: new Date(Date.now() - 172500000).toISOString(), value: 1000 },
            { timestamp: new Date(Date.now() - 172200000).toISOString(), value: 2500 },
            { timestamp: new Date(Date.now() - 171900000).toISOString(), value: 4000 },
            { timestamp: new Date(Date.now() - 171600000).toISOString(), value: 5000 }
          ]
        }
      },
      {
        id: 'test_3',
        timestamp: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        scenario: 'Baseline Performance Test',
        duration: 600000, // 10 minutes
        virtualUsers: 100,
        rampUpTime: 60000, // 1 minute
        results: {
          totalRequests: 5678,
          successfulRequests: 5678,
          failedRequests: 0,
          avgResponseTime: 123,
          minResponseTime: 45,
          maxResponseTime: 456,
          p50ResponseTime: 100,
          p95ResponseTime: 234,
          p99ResponseTime: 345,
          requestsPerSecond: 9.5,
          bytesReceived: 23456789,
          bytesSent: 1234567,
          errors: {}
        },
        charts: {
          responseTimeOverTime: [
            { timestamp: new Date(Date.now() - 604500000).toISOString(), value: 110 },
            { timestamp: new Date(Date.now() - 604200000).toISOString(), value: 123 },
            { timestamp: new Date(Date.now() - 603900000).toISOString(), value: 118 },
            { timestamp: new Date(Date.now() - 603600000).toISOString(), value: 125 }
          ],
          throughputOverTime: [
            { timestamp: new Date(Date.now() - 604500000).toISOString(), value: 9.2 },
            { timestamp: new Date(Date.now() - 604200000).toISOString(), value: 9.5 },
            { timestamp: new Date(Date.now() - 603900000).toISOString(), value: 9.4 },
            { timestamp: new Date(Date.now() - 603600000).toISOString(), value: 9.6 }
          ],
          errorsOverTime: [
            { timestamp: new Date(Date.now() - 604500000).toISOString(), value: 0 },
            { timestamp: new Date(Date.now() - 604200000).toISOString(), value: 0 },
            { timestamp: new Date(Date.now() - 603900000).toISOString(), value: 0 },
            { timestamp: new Date(Date.now() - 603600000).toISOString(), value: 0 }
          ],
          virtualUsersOverTime: [
            { timestamp: new Date(Date.now() - 604500000).toISOString(), value: 25 },
            { timestamp: new Date(Date.now() - 604200000).toISOString(), value: 50 },
            { timestamp: new Date(Date.now() - 603900000).toISOString(), value: 75 },
            { timestamp: new Date(Date.now() - 603600000).toISOString(), value: 100 }
          ]
        }
      }
    ];

    return NextResponse.json(loadTests);
  } catch (error) {
    console.error('Failed to get load tests:', error);
    return NextResponse.json(
      { error: 'Failed to get load tests' },
      { status: 500 }
    );
  }
}

// POST /api/performance/load-tests - Start a new load test
export async function POST(request: NextRequest) {
  try {
    const config = await request.json();
    
    // In production, this would trigger a load test in the testing infrastructure
    console.log('Starting load test:', config);
    
    return NextResponse.json({
      success: true,
      testId: `test_${Date.now()}`,
      message: 'Load test started',
      estimatedDuration: config.duration
    });
  } catch (error) {
    console.error('Failed to start load test:', error);
    return NextResponse.json(
      { error: 'Failed to start load test' },
      { status: 500 }
    );
  }
}