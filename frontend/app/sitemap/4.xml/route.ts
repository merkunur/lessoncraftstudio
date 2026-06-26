/**
 * Sitemap shard 4 — landing pages, partition 0 of 4 (image + hreflang enriched).
 *
 * SITEMAP FIX 2026-06-26: the landings were one 66.7 MB file (over Google's 50 MB
 * cap). They now split across shards 4-7 via the shared partitioned builder; this
 * route owns partition 0. See frontend/lib/seo/landing-sitemap.ts.
 */
import { landingShardXml } from '@/lib/seo/landing-sitemap';

export const revalidate = 1800;

export async function GET() {
  return landingShardXml(0, 4);
}
