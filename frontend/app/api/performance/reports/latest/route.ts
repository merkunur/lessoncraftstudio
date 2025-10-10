import { NextRequest, NextResponse } from 'next/server';
import { PerformanceReport } from '@/types/performance';

// GET /api/performance/reports/latest - Get latest performance report
export async function GET(request: NextRequest) {
  try {
    const report: PerformanceReport = {
      id: 'report_latest',
      timestamp: new Date().toISOString(),
      period: 'daily',
      startDate: new Date(Date.now() - 86400000).toISOString(),
      endDate: new Date().toISOString(),
      summary: {
        avgPageLoadTime: 2345,
        avgServerResponseTime: 234,
        avgClientRenderTime: 1234,
        totalPageViews: 45678,
        totalUniqueUsers: 12345,
        bounceRate: 32.5,
        errorRate: 1.2,
        apdexScore: 0.92
      },
      webVitals: {
        fcp: {
          p50: 1800,
          p75: 2200,
          p95: 3000,
          good: 65,
          needsImprovement: 25,
          poor: 10
        },
        lcp: {
          p50: 2400,
          p75: 3200,
          p95: 4500,
          good: 58,
          needsImprovement: 27,
          poor: 15
        },
        fid: {
          p50: 45,
          p75: 100,
          p95: 250,
          good: 78,
          needsImprovement: 17,
          poor: 5
        },
        cls: {
          p50: 0.05,
          p75: 0.1,
          p95: 0.25,
          good: 72,
          needsImprovement: 20,
          poor: 8
        },
        ttfb: {
          p50: 600,
          p75: 900,
          p95: 1500,
          good: 68,
          needsImprovement: 22,
          poor: 10
        },
        inp: {
          p50: 150,
          p75: 250,
          p95: 400,
          good: 62,
          needsImprovement: 28,
          poor: 10
        }
      },
      trends: [
        {
          metric: 'Page Load Time',
          dataPoints: [
            { timestamp: new Date(Date.now() - 86400000).toISOString(), value: 2500 },
            { timestamp: new Date(Date.now() - 72000000).toISOString(), value: 2400 },
            { timestamp: new Date(Date.now() - 57600000).toISOString(), value: 2300 },
            { timestamp: new Date(Date.now() - 43200000).toISOString(), value: 2350 },
            { timestamp: new Date(Date.now() - 28800000).toISOString(), value: 2345 },
            { timestamp: new Date(Date.now() - 14400000).toISOString(), value: 2340 },
            { timestamp: new Date().toISOString(), value: 2345 }
          ],
          change: -6.2,
          direction: 'down'
        },
        {
          metric: 'Error Rate',
          dataPoints: [
            { timestamp: new Date(Date.now() - 86400000).toISOString(), value: 1.5 },
            { timestamp: new Date(Date.now() - 72000000).toISOString(), value: 1.4 },
            { timestamp: new Date(Date.now() - 57600000).toISOString(), value: 1.3 },
            { timestamp: new Date(Date.now() - 43200000).toISOString(), value: 1.2 },
            { timestamp: new Date(Date.now() - 28800000).toISOString(), value: 1.2 },
            { timestamp: new Date(Date.now() - 14400000).toISOString(), value: 1.1 },
            { timestamp: new Date().toISOString(), value: 1.2 }
          ],
          change: -20,
          direction: 'down'
        },
        {
          metric: 'Apdex Score',
          dataPoints: [
            { timestamp: new Date(Date.now() - 86400000).toISOString(), value: 0.88 },
            { timestamp: new Date(Date.now() - 72000000).toISOString(), value: 0.89 },
            { timestamp: new Date(Date.now() - 57600000).toISOString(), value: 0.90 },
            { timestamp: new Date(Date.now() - 43200000).toISOString(), value: 0.91 },
            { timestamp: new Date(Date.now() - 28800000).toISOString(), value: 0.92 },
            { timestamp: new Date(Date.now() - 14400000).toISOString(), value: 0.92 },
            { timestamp: new Date().toISOString(), value: 0.92 }
          ],
          change: 4.5,
          direction: 'up'
        }
      ],
      issues: [
        {
          id: 'issue_1',
          severity: 'high',
          type: 'slowdown',
          metric: 'LCP',
          description: 'Largest Contentful Paint degraded by 15% in the last 24 hours',
          impact: 'Users experiencing slower page loads on mobile devices',
          affectedUsers: 3456,
          detectedAt: new Date(Date.now() - 7200000).toISOString(),
          resolved: false
        },
        {
          id: 'issue_2',
          severity: 'medium',
          type: 'error-spike',
          metric: 'JavaScript Errors',
          description: 'JavaScript error rate increased by 25% in the worksheets section',
          impact: 'Some users unable to generate worksheets',
          affectedUsers: 234,
          detectedAt: new Date(Date.now() - 3600000).toISOString(),
          resolved: false
        },
        {
          id: 'issue_3',
          severity: 'low',
          type: 'degradation',
          metric: 'TTFB',
          description: 'Time to First Byte increased during peak hours',
          impact: 'Slightly slower initial page response',
          affectedUsers: 567,
          detectedAt: new Date(Date.now() - 14400000).toISOString(),
          resolved: true,
          resolvedAt: new Date(Date.now() - 1800000).toISOString()
        }
      ],
      recommendations: [
        {
          id: 'rec_1',
          priority: 'high',
          category: 'images',
          title: 'Optimize Image Loading',
          description: 'Large images are causing slow LCP on mobile devices',
          impact: 'Could improve LCP by 30% for mobile users',
          estimatedImprovement: {
            metric: 'LCP',
            value: 900,
            unit: 'ms'
          },
          implementation: [
            'Implement responsive images with srcset',
            'Use WebP format with fallbacks',
            'Add lazy loading for below-fold images',
            'Optimize image compression settings'
          ],
          effort: 'medium'
        },
        {
          id: 'rec_2',
          priority: 'medium',
          category: 'scripts',
          title: 'Code Split JavaScript Bundle',
          description: 'Main JavaScript bundle is too large',
          impact: 'Reduce initial bundle size by 40%',
          estimatedImprovement: {
            metric: 'FID',
            value: 50,
            unit: 'ms'
          },
          implementation: [
            'Implement route-based code splitting',
            'Lazy load heavy components',
            'Remove unused dependencies',
            'Use dynamic imports for optional features'
          ],
          effort: 'high'
        },
        {
          id: 'rec_3',
          priority: 'low',
          category: 'caching',
          title: 'Improve Cache Headers',
          description: 'Static assets are not being cached effectively',
          impact: 'Reduce repeat visit load time by 50%',
          estimatedImprovement: {
            metric: 'Page Load',
            value: 1000,
            unit: 'ms'
          },
          implementation: [
            'Set long cache headers for static assets',
            'Implement versioning for cache busting',
            'Use service worker for offline caching',
            'Configure CDN caching rules'
          ],
          effort: 'low'
        }
      ],
      budgetStatus: [
        {
          name: 'Page Weight Budget',
          metric: 'Total Page Size',
          current: 2345678,
          budget: 2000000,
          unit: 'bytes',
          status: 'over',
          percentageUsed: 117.3
        },
        {
          name: 'JavaScript Budget',
          metric: 'JS Bundle Size',
          current: 456789,
          budget: 500000,
          unit: 'bytes',
          status: 'warning',
          percentageUsed: 91.4
        },
        {
          name: 'LCP Budget',
          metric: 'LCP',
          current: 2400,
          budget: 2500,
          unit: 'ms',
          status: 'under',
          percentageUsed: 96
        },
        {
          name: 'FID Budget',
          metric: 'FID',
          current: 45,
          budget: 100,
          unit: 'ms',
          status: 'under',
          percentageUsed: 45
        }
      ]
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error('Failed to get performance report:', error);
    return NextResponse.json(
      { error: 'Failed to get performance report' },
      { status: 500 }
    );
  }
}