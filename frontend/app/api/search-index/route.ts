import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

/**
 * Global search index API — returns ALL entries across all 11 locales as
 * a single flat array. Each entry carries its own `locale` field so the
 * client can filter / rank / badge by locale.
 *
 * Cross-locale scope (operator-locked 2026-05-21): teachers should find
 * activities + tools regardless of their current page's locale. The
 * `?locale=` query param is no longer used; accepted for backwards-compat
 * but ignored. Payload is ~88 entries (~18KB JSON gzipped); CDN-cached 1h.
 *
 * Scope: activities + manipulatives ONLY. NOT decks.
 */
export const revalidate = 3600;

export async function GET(_req: Request): Promise<NextResponse> {
  const entries = await buildSearchIndex();

  return NextResponse.json(
    { count: entries.length, entries },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    }
  );
}
