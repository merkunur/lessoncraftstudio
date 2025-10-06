import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Health check endpoint for monitoring and Docker health checks
 * GET /api/health
 */
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    // Check if critical directories exist (for Docker containers)
    const fs = require('fs');
    const path = require('path');

    const criticalPaths = [
      path.join(process.cwd(), 'public'),
      path.join(process.cwd(), 'public', 'images'),
      path.join(process.cwd(), 'public', 'data'),
    ];

    const pathChecks = criticalPaths.map(p => ({
      path: p,
      exists: fs.existsSync(p),
    }));

    const allPathsExist = pathChecks.every(check => check.exists);

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        database: 'connected',
        filesystem: allPathsExist ? 'ok' : 'warning',
        paths: pathChecks,
      },
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);

    const health = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      error: error instanceof Error ? error.message : 'Unknown error',
      checks: {
        database: 'disconnected',
      },
    };

    return NextResponse.json(health, { status: 503 });
  }
}
