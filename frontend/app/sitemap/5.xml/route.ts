/**
 * Sitemap shard 5 — landing pages, partition 1 of 4. SITEMAP FIX 2026-06-26
 * (split the 66.7 MB single landing shard). See frontend/lib/seo/landing-sitemap.ts.
 */
import { landingShardXml } from '@/lib/seo/landing-sitemap';

export const revalidate = 1800;

export async function GET() {
  return landingShardXml(1, 4);
}
