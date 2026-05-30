import { NextRequest, NextResponse } from 'next/server';
import { generateRobotsTxt } from '@/lib/seo-utils';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

// POST /api/admin/seo/robots - Generate robots.txt
export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const config = {
      allowAll: false,
      disallow: [
        '/admin',
        '/api',
        '/private',
        '/*.json$',
        '/tmp',
        '/cache'
      ],
      allow: [
        '/api/public',
        '/images',
        '/worksheets'
      ],
      sitemap: 'https://www.lessoncraftstudio.com/sitemap.xml',
      crawlDelay: 1
    };

    const robotsTxt = generateRobotsTxt(config);

    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="robots.txt"'
      }
    });
  } catch (error) {
    console.error('Failed to generate robots.txt:', error);
    return NextResponse.json(
      { error: 'Failed to generate robots.txt' },
      { status: 500 }
    );
  }
}

// GET /api/admin/seo/robots - Get current robots configuration
export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Return current robots.txt configuration
    return NextResponse.json({
      userAgent: '*',
      disallowed: ['/admin', '/api', '/private'],
      allowed: ['/api/public', '/images', '/worksheets'],
      crawlDelay: 1,
      sitemap: 'https://www.lessoncraftstudio.com/sitemap.xml',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to get robots config:', error);
    return NextResponse.json(
      { error: 'Failed to get robots config' },
      { status: 500 }
    );
  }
}