import { NextRequest, NextResponse } from 'next/server';
import { generateSitemapXML } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

// POST /api/admin/seo/sitemap - Generate sitemap
export async function POST(request: NextRequest) {
  try {
    // In production, fetch all public pages from database
    const pages = [
      {
        loc: 'https://lessoncraftstudio.com/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/worksheets',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/worksheets/word-search',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/worksheets/math-puzzles',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/worksheets/coloring-pages',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/pricing',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/about',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/blog',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/contact',
        changefreq: 'yearly',
        priority: 0.5,
        lastmod: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/privacy',
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        loc: 'https://lessoncraftstudio.com/terms',
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ];

    const sitemap = generateSitemapXML(pages);

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': 'attachment; filename="sitemap.xml"'
      }
    });
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}

// GET /api/admin/seo/sitemap - Get sitemap for viewing
export async function GET(request: NextRequest) {
  try {
    // Return sitemap status and info
    return NextResponse.json({
      lastGenerated: new Date().toISOString(),
      pageCount: 11,
      status: 'active',
      url: 'https://lessoncraftstudio.com/sitemap.xml'
    });
  } catch (error) {
    console.error('Failed to get sitemap info:', error);
    return NextResponse.json(
      { error: 'Failed to get sitemap info' },
      { status: 500 }
    );
  }
}