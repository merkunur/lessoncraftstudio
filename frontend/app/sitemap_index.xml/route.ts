/**
 * Sitemap Index - Consolidates all sitemaps for better SEO architecture
 * @see https://www.sitemaps.org/protocol.html#sitemapIndex
 */

import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

  // Query the most recent blog post update to use as lastmod
  let lastMod: string;
  try {
    const latest = await prisma.blogPost.findFirst({
      where: { status: 'published' },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true },
    });
    lastMod = latest?.updatedAt?.toISOString() ?? new Date().toISOString();
  } catch {
    lastMod = new Date().toISOString();
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
