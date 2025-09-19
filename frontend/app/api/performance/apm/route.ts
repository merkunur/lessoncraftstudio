import { NextRequest, NextResponse } from 'next/server';
import { ApplicationPerformance, ServiceMetric } from '@/types/performance';

// GET /api/performance/apm - Get Application Performance data
export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from APM system
    const apmData: ApplicationPerformance[] = [
      {
        id: 'apm_1',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        service: 'api-gateway',
        environment: 'production',
        traces: [
          {
            traceId: 'trace_001',
            spanId: 'span_001',
            operationName: 'HTTP GET /api/worksheets',
            serviceName: 'api-gateway',
            startTime: new Date(Date.now() - 300000).toISOString(),
            endTime: new Date(Date.now() - 299800).toISOString(),
            duration: 200,
            status: 'ok',
            tags: {
              'http.method': 'GET',
              'http.url': '/api/worksheets',
              'http.status_code': 200,
              'user.id': 'user_123'
            },
            logs: [
              {
                timestamp: new Date(Date.now() - 299900).toISOString(),
                level: 'info',
                message: 'Request received',
                fields: { path: '/api/worksheets' }
              }
            ]
          },
          {
            traceId: 'trace_001',
            spanId: 'span_002',
            parentSpanId: 'span_001',
            operationName: 'Database Query',
            serviceName: 'worksheet-service',
            startTime: new Date(Date.now() - 299950).toISOString(),
            endTime: new Date(Date.now() - 299850).toISOString(),
            duration: 100,
            status: 'ok',
            tags: {
              'db.type': 'postgresql',
              'db.statement': 'SELECT * FROM worksheets WHERE user_id = $1'
            }
          }
        ],
        metrics: [
          {
            service: 'api-gateway',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            requestCount: 1234,
            errorCount: 12,
            errorRate: 0.97,
            avgResponseTime: 234,
            p50ResponseTime: 180,
            p95ResponseTime: 456,
            p99ResponseTime: 789,
            throughput: 20.5,
            apdex: 0.92
          },
          {
            service: 'worksheet-service',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            requestCount: 3456,
            errorCount: 23,
            errorRate: 0.67,
            avgResponseTime: 123,
            p50ResponseTime: 100,
            p95ResponseTime: 234,
            p99ResponseTime: 456,
            throughput: 57.6,
            apdex: 0.95
          },
          {
            service: 'auth-service',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            requestCount: 2345,
            errorCount: 5,
            errorRate: 0.21,
            avgResponseTime: 89,
            p50ResponseTime: 70,
            p95ResponseTime: 150,
            p99ResponseTime: 234,
            throughput: 39.1,
            apdex: 0.98
          }
        ],
        dependencies: [
          {
            source: 'api-gateway',
            target: 'worksheet-service',
            type: 'http',
            requestCount: 1234,
            errorCount: 8,
            avgDuration: 123,
            totalDuration: 151782
          },
          {
            source: 'api-gateway',
            target: 'auth-service',
            type: 'http',
            requestCount: 1234,
            errorCount: 2,
            avgDuration: 89,
            totalDuration: 109826
          },
          {
            source: 'worksheet-service',
            target: 'database',
            type: 'database',
            requestCount: 3456,
            errorCount: 12,
            avgDuration: 45,
            totalDuration: 155520
          }
        ],
        database: [
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            database: 'lessoncraft',
            operation: 'select',
            table: 'worksheets',
            queryCount: 1567,
            avgDuration: 23,
            slowQueries: 3,
            deadlocks: 0,
            connections: {
              active: 12,
              idle: 8,
              waiting: 0
            }
          },
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            database: 'lessoncraft',
            operation: 'insert',
            table: 'user_sessions',
            queryCount: 234,
            avgDuration: 15,
            slowQueries: 0,
            deadlocks: 0,
            connections: {
              active: 12,
              idle: 8,
              waiting: 0
            }
          },
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            database: 'lessoncraft',
            operation: 'update',
            table: 'users',
            queryCount: 456,
            avgDuration: 18,
            slowQueries: 1,
            deadlocks: 0,
            connections: {
              active: 12,
              idle: 8,
              waiting: 0
            }
          }
        ],
        cache: [
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            cacheName: 'redis-main',
            hits: 8765,
            misses: 234,
            hitRate: 97.4,
            evictions: 12,
            size: 134217728, // 128MB
            avgGetTime: 0.8,
            avgSetTime: 1.2
          },
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            cacheName: 'redis-sessions',
            hits: 5432,
            misses: 89,
            hitRate: 98.4,
            evictions: 0,
            size: 67108864, // 64MB
            avgGetTime: 0.6,
            avgSetTime: 0.9
          }
        ]
      }
    ];

    return NextResponse.json(apmData);
  } catch (error) {
    console.error('Failed to get APM data:', error);
    return NextResponse.json(
      { error: 'Failed to get APM data' },
      { status: 500 }
    );
  }
}