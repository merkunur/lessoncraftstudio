import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

/**
 * Per-locale search index API — returns the array of {label, url, hint, type}
 * entries the client-side PlatformSearch typeahead matches against.
 *
 * Scope: activities + manipulatives ONLY. NOT decks (operator-locked
 * 2026-05-21).
 *
 * Cached aggressively at the server: the index is built once per server
 * lifetime via the cache in lib/search-index.ts. CDN cache-control set to
 * one hour since the source data is static (activity manifests + in-code
 * manipulatives metadata; neither changes at runtime).
 *
 * Locale defaults to `en` if missing or unrecognized.
 */
export const revalidate = 3600;

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const locale = url.searchParams.get("locale") || "en";

  const index = await buildSearchIndex();
  const entries = index[locale] || index.en || [];

  return NextResponse.json(
    { locale, count: entries.length, entries },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    }
  );
}
