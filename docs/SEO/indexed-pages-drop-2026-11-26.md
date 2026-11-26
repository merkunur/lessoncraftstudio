# Why the number of indexed pages fell (analysis of 2026-11-26)

Search Console's Page indexing report (filtered to the submitted `sitemap.xml`) showed indexed pages falling from
**41,509 (20–23 Oct)** to **35,227 (17–23 Nov)**. Everything below was measured, read-only, on 2026-11-26: the
Search Console export, the 14 days of nginx logs, the live sitemaps, every deck and landing file in the sitemap,
the deck table and Umami. Re-measure with `scripts/seo/googlebot-crawl-report.py` (on Hetzner).

## Findings

1. **Existing pages left the index; new pages did not fail to enter it.** From 10 to 17 Nov the sitemap grew by
   210 URLs (55,750 → 55,960) while ~5,100 indexed URLs moved to "not indexed" (drops reported 14 and 17 Nov,
   −2,892 and −2,246; an earlier −1,397 on 24 Oct).
2. **Google chose to drop them.** Not indexed 20,733 = Crawled – currently not indexed 16,227 (78 %) ·
   Discovered – currently not indexed 3,784 · noindex 711 · duplicate/canonical 9 · 5xx 1 · 404 1.
   Checked clean: all 9,817 sitemap decks and 36,490 sitemap landings are 200, indexable and self-canonical;
   Googlebot got 0 page 5xx and 0 × 429 in 14 days; response times median ~0 s (static) and 0.48 s (topics).
3. **Traffic did not fall.** Search Console impressions ~13,500/day (9–12 Nov) → 24,515 (23 Nov). Google visits
   (Umami) 957/week (7 Sep) → 3,176/week (16 Nov) → ~580/day (23–26 Nov). Google-referred landing views (nginx)
   436/day (12 Nov) → 828/day (25 Nov). Only 5,730 of 56,090 sitemap URLs got one Google visit in 14 days.
   The dropped pages are the long tail that earned nothing.
4. **The drops sit on a crawl burst.** Verified Googlebot fetches ~1,000–2,600 URLs a day; on 14–17 Nov it fetched
   15K, 46K, 16K and 7K, after all 36,490 landings were re-dated in the sitemap (12/13 Nov) and ~6,000 noindex year
   pages were published (13–14 Nov). 74 % of the burst went to URLs that are not in the sitemap.
5. **43 % of Google's crawl goes to pages that can never be indexed.** Of 103,198 Googlebot requests in 14 days:
   43,970 to 43,278 different noindex Level Set / year-page decks, 5,853 to landing-backed decks, 4,291 to the
   retired `/worksheets/sets/<code>` redirects (their target is blocked in robots.txt), 32 % to sitemap URLs.
   Only 20,790 of 56,090 sitemap URLs were fetched even once. Published noindex decks: ~1,300 (21 Sep) →
   150,406 (26 Nov), against 51,640 indexable; each is `noindex, follow` and links its sibling copies and other
   sets, and topic grids list Level Set decks (`frontend/lib/topic-decks.ts`).
6. **Sitemap lastmod was not truthful.** ~9,000 Next.js URLs (activities, tools, makers, units, sub plans,
   curriculum, assessments, readers, most topics) carried the deploy time as lastmod: 35+ deploys in 14 days.
   Deck lastmod is the deck.html mtime and landing lastmod the landing file mtime; site-wide chrome injections
   re-date them too (16,600 decks rewritten overnight on 26 Nov, 4,400 of them in the sitemap). The database's
   `updated_at` is no cleaner (bulk spikes, e.g. 11,665 decks on 6 Jul).

## Changes made 2026-11-26

- `frontend/app/sitemap.ts`, `app/sitemap/10.xml/route.ts`: no lastmod where no real content date is known
  (was the deploy time). Routes with a real date (intersections, topic hubs) keep it.
- `scripts/publish-cli/patch-nginx-deck-nofollow.py`: noindex decks are served `noindex, nofollow,
  indexifembedded` (indexable decks are exempt and get no header, unchanged).
- `frontend/public/robots.txt`: `Disallow: /*/worksheets/sets/`; the Bingbot and Yandex groups get the hub
  filter-combination rules the `*` group has had since 28 Oct (Bingbot spent 26 % of its crawl on them).
- `scripts/seo/check-sitemap-urls.js`: every sitemap URL must be 200, indexable and self-canonical
  (self-test pre-flip, sample post-flip WARN in deploy.sh, `--full` on demand).
- `scripts/seo/googlebot-crawl-report.py`: the measurement behind this page.

## Open

- **Which page families were dropped** needs the operator's Search Console exports: per child sitemap
  (Sitemaps → each `/sitemap/N.xml` → See page indexing), the "Crawled – currently not indexed" and "Excluded by
  'noindex' tag" example lists, Crawl stats, and Performance → Pages for 3 months.
- **Deck and landing lastmod** still follow file mtimes that chrome-only injections move. A content date that
  injections cannot change (a hash of the content region, kept by one stamping script) is the fix, worth doing
  only after the exports show whether those families are kept at all.
- **Re-measure ~10 Dec 2026**: Googlebot share on sitemap URLs (32 % now; target > 60 %), sitemap URLs fetched per
  14 days (20,790 now), then Search Console indexed count and impressions.
