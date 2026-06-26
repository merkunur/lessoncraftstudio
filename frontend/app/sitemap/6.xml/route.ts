/**
 * Sitemap shard 6 — landing pages, partition 2 of 4. SITEMAP FIX 2026-06-26
 * (split the 66.7 MB single landing shard). See frontend/lib/seo/landing-sitemap.ts.
 */
import { landingShardXml } from '@/lib/seo/landing-sitemap';

export const revalidate = 1800;

export async function GET() {
  return landingShardXml(2, 4);
}
