import { NextRequest, NextResponse } from 'next/server';
import { SystemDiagnostics } from '@/types/admin-tools';
import os from 'os';

export const dynamic = 'force-dynamic';

// GET /api/admin/tools/diagnostics - Get system diagnostics
export async function GET(request: NextRequest) {
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryPercentage = Math.round((usedMemory / totalMemory) * 100);

    const cpus = os.cpus();
    const cpuUsage = Math.round(
      cpus.reduce((acc, cpu) => {
        const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
        const idle = cpu.times.idle;
        return acc + ((total - idle) / total) * 100;
      }, 0) / cpus.length
    );

    const diagnostics: SystemDiagnostics = {
      id: 'diag_' + Date.now(),
      timestamp: new Date().toISOString(),
      system: {
        version: process.env.npm_package_version || '2.5.0',
        environment: (process.env.NODE_ENV || 'development') as any,
        uptime: process.uptime(),
        hostname: os.hostname(),
        platform: os.platform(),
        nodeVersion: process.version,
        memory: {
          total: totalMemory,
          used: usedMemory,
          free: freeMemory,
          percentage: memoryPercentage
        },
        cpu: {
          cores: cpus.length,
          model: cpus[0]?.model || 'Unknown',
          usage: cpuUsage,
          loadAverage: os.loadavg()
        },
        disk: {
          total: 107374182400, // 100GB mock
          used: 64424509440,   // 60GB mock
          free: 42949672960,   // 40GB mock
          percentage: 60
        }
      },
      performance: {
        responseTime: {
          average: 45,
          median: 38,
          p95: 120,
          p99: 250
        },
        throughput: {
          requestsPerSecond: 1250,
          bytesPerSecond: 5242880 // 5MB/s
        },
        errorRate: 0.8,
        activeConnections: 342,
        queuedRequests: 12
      },
      database: {
        connected: true,
        poolSize: 20,
        activeConnections: 8,
        idleConnections: 12,
        waitingRequests: 0,
        queryStats: {
          total: 45678,
          slow: 23,
          failed: 5,
          averageTime: 12
        },
        size: 524288000, // 500MB
        tables: 42,
        indexes: 128
      },
      cache: {
        type: 'Redis',
        size: 134217728, // 128MB
        maxSize: 536870912, // 512MB
        hits: 234567,
        misses: 12345,
        hitRate: 95.0,
        evictions: 456,
        keys: 8934
      },
      services: [
        {
          name: 'API Server',
          status: 'running',
          uptime: process.uptime(),
          lastCheck: new Date().toISOString(),
          healthCheck: {
            endpoint: '/api/health',
            responseTime: 12,
            statusCode: 200,
            healthy: true
          }
        },
        {
          name: 'Database',
          status: 'running',
          uptime: 864000, // 10 days
          lastCheck: new Date().toISOString(),
          healthCheck: {
            endpoint: '/api/db/health',
            responseTime: 8,
            statusCode: 200,
            healthy: true
          }
        },
        {
          name: 'Cache',
          status: 'running',
          uptime: 432000, // 5 days
          lastCheck: new Date().toISOString()
        },
        {
          name: 'Queue Worker',
          status: 'running',
          uptime: 86400, // 1 day
          lastCheck: new Date().toISOString()
        },
        {
          name: 'Email Service',
          status: 'degraded',
          lastCheck: new Date().toISOString(),
          healthCheck: {
            endpoint: '/api/email/health',
            responseTime: 450,
            statusCode: 200,
            healthy: true
          }
        },
        {
          name: 'Storage Service',
          status: 'running',
          uptime: 1728000, // 20 days
          lastCheck: new Date().toISOString()
        }
      ],
      errors: [
        {
          id: 'err_1',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          level: 'error',
          message: 'Database connection timeout',
          count: 3,
          firstOccurrence: new Date(Date.now() - 7200000).toISOString(),
          lastOccurrence: new Date(Date.now() - 3600000).toISOString()
        }
      ],
      warnings: [
        {
          id: 'warn_1',
          type: 'performance',
          message: 'High memory usage detected',
          severity: memoryPercentage > 80 ? 'high' : 'medium',
          recommendation: 'Consider scaling up server resources',
          detectedAt: new Date().toISOString()
        },
        {
          id: 'warn_2',
          type: 'configuration',
          message: 'Debug mode enabled in production',
          severity: 'medium',
          recommendation: 'Disable debug mode for better performance',
          detectedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    };

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error('Failed to get diagnostics:', error);
    return NextResponse.json(
      { error: 'Failed to get diagnostics' },
      { status: 500 }
    );
  }
}