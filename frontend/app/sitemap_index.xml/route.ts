/**
 * Sitemap Index - Consolidates all sitemaps for Google discovery
 * @see https://www.sitemaps.org/protocol.html#sitemapIndex
 *
 * References 8 sitemaps:
 * - /sitemap/0.xml through /sitemap/6.xml (split main sitemap, ~6,000+ URLs total)
 * - /sitemap-images.xml (product sample images)
 */

import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

  // Query the most recent blog post update to use as lastmod for DB-dependent sitemaps
  let blogLastMod: string;
  try {
    const latest = await prisma.blogPost.findFirst({
      where: { status: 'published' },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true },
    });
    blogLastMod = latest?.updatedAt?.toISOString() ?? new Date().toISOString();
  } catch {
    blogLastMod = new Date().toISOString();
  }

  // Static content date matches STATIC_CONTENT_DATE in sitemap.ts
  const staticLastMod = '2026-02-09T00:00:00.000Z';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap/0.xml</loc>
    <lastmod>${staticLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/1.xml</loc>
    <lastmod>${staticLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/2.xml</loc>
    <lastmod>${staticLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/3.xml</loc>
    <lastmod>${staticLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/4.xml</loc>
    <lastmod>${staticLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/5.xml</loc>
    <lastmod>${blogLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/6.xml</loc>
    <lastmod>${blogLastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${blogLastMod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
