# SEO Index Recovery Runbook (operator console actions)

**Created 2026-06-18.** Companion to plan `~/.claude/plans/the-seo-of-the-partitioned-abelson.md`.

## The situation (why this runbook exists)

The **live site is clean** — correct identity ("Free K-3 worksheets in 11 languages"), no Etsy/KDP copy, dead seller pages return 410, `/apps/*-worksheets` 301 to English maker pages, correct per-locale hreflang/canonical, fresh sitemap.

But **Google's INDEX is stale**. A `site:lessoncraftstudio.com` search still returns, as the site's representative pages:
- *"Printable Profit Hub — Track Your Etsy & KDP Earnings"* (`/en/tools/profit-hub` — actually 410)
- *"Free KDP Activity Book Planner"* (`/en/tools/activity-book-planner` — actually 410)
- Norwegian seller titles on `/en/` URLs (e.g. *"Kryssord-generator — Lag utskrifter å selge på Etsy og KDP"* on `/en/apps/crossword-worksheets` — actually 301s to a clean English page)

These are **un-recrawled cache**, not live defects. Until Google recrawls, the brand's search face is "Etsy/KDP seller" and every on-page fix is invisible. **Code can't force Google to recrawl** — these GSC console actions can. They are the highest-impact part of index recovery.

## Part A — Google Search Console (property: `lessoncraftstudio.com`)

> Do these in order. Most take effect within hours–days; full reindex takes 2–4 weeks.

### A1. Purge the stale seller pages from SERPs (Removals tool)
**Indexing → Removals → New request → "Remove all URLs with this prefix"**, submit each:
- `https://www.lessoncraftstudio.com/en/tools/profit-hub`
- `https://www.lessoncraftstudio.com/en/tools/activity-book-planner`
- `https://www.lessoncraftstudio.com/en/apps/` (prefix — removes all old `/en/apps/*-worksheets` seller snippets at once)
- Repeat the `/apps/` prefix for any locale showing seller snippets in `site:` — at least `de` and `no`; do all 11 (`/de/apps/`, `/no/apps/`, `/sv/apps/`, `/it/apps/`, `/nl/apps/`, `/es/apps/`, `/fr/apps/`, `/pt/apps/`, `/da/apps/`, `/fi/apps/`) if you have time.
- Run a `site:lessoncraftstudio.com` scan in Google and submit a removal for **any** result whose title mentions KDP / Etsy / profit / "activity book planner" / commercial-license.

Removal hides the URL from results within ~a day (temporary, 6 months). The page is **permanently** dropped when Google recrawls it and sees the 410 — A1 just buys time so the seller identity stops showing meanwhile.

### A2. Force a recrawl of the clean pages (URL Inspection → Request Indexing)
These pages are LIVE and correct but show stale/wrong-language snippets — request indexing on each (≈10/day quota; spread over a few days):
- `https://www.lessoncraftstudio.com/en` then `/de`, `/sv`, `/it`, `/nl` (the converting locales — Part 0 Finding D)
- `https://www.lessoncraftstudio.com/en/tools/treasure-hunt-maker` (shows Norwegian in Google today)
- `https://www.lessoncraftstudio.com/en/tools/cryptogram-maker`, `/en/tools/word-search-maker`, `/en/tools/sudoku-maker`, `/en/tools/crossword-maker` (the demand-proven makers)
- 2–3 top topic pages per converting locale (e.g. an `/it/topic/...`, an `/sv/topic/...`).

### A3. Resubmit the sitemap
**Indexing → Sitemaps**, (re)submit `https://www.lessoncraftstudio.com/sitemap.xml`. *(The automated `google.com/ping` was retired by Google in 2023 — manual resubmit is now the only Google trigger. It has been removed from `deploy.sh`.)*

### A4. Weekly monitoring (don't judge before ~3–4 weeks)
**Indexing → Pages** report — watch:
- "Crawled – currently not indexed" + "Discovered – currently not indexed" buckets shrinking
- seller URLs disappearing from a `site:lessoncraftstudio.com` scan
- the wrong-language SERP titles flipping to English
- impressions/clicks rising on the homepages + maker pages (Performance report, filter by page)

## Part B — Bing Webmaster Tools (a second index, never set up)

1. Add the property `https://www.lessoncraftstudio.com` and verify (the easiest path: "Import from Google Search Console").
2. **Sitemaps → Submit** `https://www.lessoncraftstudio.com/sitemap.xml`.
3. Use **URL Inspection → Request Indexing** on the same clean pages as A2 for the stale Bing snippets.
4. Ongoing recrawl is now automatic via **IndexNow** (see below) — no further manual Bing action needed.

## What the code side already does (no operator action)

- **IndexNow** (Bing/Yandex/Seznam) now fires automatically on every `deploy.sh` (`scripts/indexnow-submit.js`), submitting the 11 homepages + maker hubs. Key file: `https://www.lessoncraftstudio.com/f261bd8eb7ea657cdb8051d5d8e3bc4c.txt`. *(Google ignores IndexNow — that's why Part A is manual.)*
- **Fresh `lastmod`**: `deploy.sh` sets `BUILD_DATE` to the deploy timestamp, so sitemap URLs report the real last-change date (not the old `2026-04-04` fallback) and Google reprioritizes their crawl.
- **Identity is coherent**: maker/tool/landing pages self-canonical per locale and emit correct hreflang — so a recrawl will see one clean identity.

## Out of scope here (the larger levers — separate commissions)
- **Domain authority / backlinks** — the real reason rankings sit at page 2 (avg position ~11). Index recovery makes the clean state *visible* but does not lift page-2 rankings.
- **Thin-content consolidation** — the ~30K near-duplicate pages + the 0-CTR doom loop (e.g. "camping homework": 2,481 impressions, 0 clicks).

---

## 2026-07-21 — Identity-clarification refresh (operator console steps)

Companion to the identity plan `~/.claude/plans/employ-expert-seo-agents-vast-truffle.md`. Goal: make Google's stored identity match the current one (free multilingual K-3), so the seller era stops confusing it. **The on-site work is code-side done** (full Organization/WebSite entity now emitted on the high-crawl topic hubs + activity pages, not just the homepage; About-page + admin residue cleaned). What remains is GSC console + off-site — do these:

### A5. Removals for the TRAPPED seller prefixes (extends A1)
The 5 prefixes below are 410-Gone live BUT are `Disallow`ed in `robots.txt` (deliberate, to preserve the collapsed crawl budget) — so Googlebot can't re-crawl them to see the 410, and they linger in the index with seller titles. **GSC Removals is the only lever that hides them without spending crawl budget.**
**Indexing → Removals → New request → "Remove all URLs with this prefix"** for each (bare + you don't need per-locale — a prefix removal covers all sub-paths):
- `https://www.lessoncraftstudio.com/blog` (and, if listed separately in `site:`, `/de/blog`, `/es/blog`, … — the prefix form should cover them, but add locale forms Google still shows)
- `https://www.lessoncraftstudio.com/guides`
- `https://www.lessoncraftstudio.com/ideas`
- `https://www.lessoncraftstudio.com/bundles`
- `https://www.lessoncraftstudio.com/gallery`
- Plus everything already in **A1** (`/apps/` all locales, `/tools/profit-hub`, `/tools/activity-book-planner`, any KDP/Etsy/profit `site:` hit).

### A6. ⏰ Log the 6-month expiry — DO NOT let it silently lapse
GSC Removals is **temporary (~6 months)**, and because the 5 prefixes stay `robots.txt`-blocked, Google never crawls them to make the drop **permanent**. So set a calendar reminder for **≈ 2026-12-21** to do ONE of:
- **(preferred, post-freeze)** temporarily remove the 5 `Disallow` lines from `frontend/public/robots.txt` so Googlebot re-crawls, sees the live 410+`noindex`, and permanently drops them — then re-add the block once GSC "Pages" shows them gone. Only do this once the crawl budget has recovered (blog alone was ~200 Googlebot req/day; see the `robots.txt` comment). This is outside the §21.5a churn-freeze (robots.txt is not a title/meta/canonical/slug change) but should still wait for crawl-budget headroom.
- **(fallback)** re-file the GSC Removals for another 6 months.

### A7. Off-site identity graph (see `docs/SEO/off-site-identity-audit.md`)
Google reads the brand's external profiles as part of its identity. Several are still seller-branded. Operator steps (external accounts, not code):
- **Rewrite** the YouTube channel **name + description** (drop "Apps" from the display name; KEEP the `@LessonCraftStudioApps` handle — renaming the handle breaks the `sameAs` link) and the Pinterest `worksheetgenerators` bio to the current free-teacher identity. Ready-to-paste copy is in the audit doc.
- **Rewrite or retire** the two Teachers Pay Teachers stores (heaviest seller signal). These are **excluded from `sameAs`** regardless (a marketplace store must not anchor the free identity).
- When a profile is cleaned + verified, tell CC to add it to `ORGANIZATION_SAME_AS` in `frontend/lib/seo/organization-schema.ts` (the code forbids fabricating that list — it's populated only from operator-verified, identity-aligned URLs). Recommended post-cleanup set: the YouTube channel + the Pinterest profile.
