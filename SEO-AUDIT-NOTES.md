# SEO Audit Notes — 2026-04-15

Audit of the external SEO consultant's 6-problem remediation brief against the actual codebase.

## Summary

Most of the consultant's premises don't apply to this codebase. The audit below documents what was verified and what was skipped (and why).

## Problem 1 — Duplicate pages (`/tools/` vs `/apps/`) — SKIPPED

The consultant claimed `/en/tools/addition-worksheet-maker` is a duplicate of `/en/apps/addition-worksheets` and should 301-redirect.

**Reality:** these are intentional parallel page types:
- `/apps/[slug]` renders from `frontend/config/app-content/` (product/worksheet intent)
- `/tools/[slug]` renders from `frontend/config/tool-content/` (maker/generator intent)
- Sitemap comment at `frontend/app/sitemap.ts:40` states explicitly "Tool pages (maker/generator intent — distinct from /apps/ worksheets intent)"
- 33 apps + 33 tools × 10 locales = 660 distinct URLs, by design

No redirects added. Keeping both. User-confirmed.

## Problem 2 — Root / `/en/` structure — VERIFIED

Site is genuinely multilingual (11 locales with real translated content in `config/app-content/de/`, `de/`, `fr/`, etc.). Scenario A applies. `/en/` prefix is correct.

Root `/` handled by `next-intl` middleware in `frontend/middleware.ts`. No fix needed.

## Problem 3 — "| LCS" in titles — VERIFIED CLEAN

Grep across `frontend/` for `| LCS`: **zero occurrences**. Titles use full `| LessonCraftStudio` suffix in localized metadata. No fix needed.

## Problem 4 — Canonical tags — VERIFIED

Spot-checked:
- `frontend/app/[locale]/apps/[slug]/page.tsx:923` — `canonical: \`${baseUrl}/${locale}/apps/${localeSlug || slug}\`` — absolute, `www`, no query string, no trailing slash. ✓
- `frontend/app/[locale]/blog/[slug]/page.tsx:65` — same correct pattern. ✓

Implementation is per-page via Next.js Metadata API `alternates.canonical`. No fix needed.

## Problem 5 — hreflang — VERIFIED

Implemented via `alternates.languages` in each sitemap route (`frontend/app/sitemap.ts:55-62`, per-route usage throughout). Includes `x-default` → `/en`. Every locale's slug references every other locale where a translated slug exists. No fix needed.

## Problem 6 — Sitemap hygiene — VERIFIED

`frontend/app/sitemap.ts` emits 10 sub-sitemaps. Reviewed:
- No URLs that match the 410 Gone patterns (worksheets, buy, apps/category, apps/grades).
- All 33 `/apps/` and 33 `/tools/` slugs iterated from their respective config arrays.
- Consistent `https://www.lessoncraftstudio.com` base URL.
- No duplicates (each sub-sitemap sources from a distinct slug registry).

No fix needed.

## Problem 7 — Four new comparison/review blog posts — IMPLEMENTED

See separate changes:
- 4 new entries in `frontend/config/blog-page-slugs.ts`
- 4 new content files in `frontend/config/blog-content/en/`
- Category map updated in `frontend/app/[locale]/blog/page.tsx`
- Cross-links added from existing posts

New slugs (EN-only, following existing EN-only blog precedent):
- `/en/blog/lessoncraftstudio-vs-book-bolt`
- `/en/blog/lessoncraftstudio-vs-canva`
- `/en/blog/best-worksheet-generators-kdp`
- `/en/blog/lessoncraftstudio-review`
