# Daily Teaching System — the baseline (captured 2026-11-11)

What the site looked like in search and in use before any part of the programme shipped. Part 0.2 of `docs/daily-teaching-system/PLAN.md`. Every later part is measured against this page.

## 1. Search identity of the existing pages

- **Sample:** 287 live URLs, fixed in `sample.json`: 24 from each of the 11 sitemap shards (taken evenly across each shard, so all 11 languages are in it) plus 23 hand-listed pages (hubs, pricing, standards pages, homepages, three Level Set redirects).
- **Recorded per page:** HTTP status and redirect target, title, meta description, canonical, robots meta, `X-Robots-Tag`, number of h1 elements and the first h1's text, the hreflang set, and whether the page is in its sitemap shard. Stored in `baseline.json`.
- **Sitemap shards at the baseline (55,750 URLs):** 0: 4,941 · 1: 4,876 · 2: 952 · 3: 4,806 · 4: 9,281 · 5: 8,900 · 6: 9,191 · 7: 9,118 · 8: 1,994 · 9: 1,044 · 10: 647.
- **The check:** `node scripts/seo/identity-snapshot.js --compare=docs/SEO/daily-system-baseline/baseline.json`. Exit 0 = nothing changed; exit 1 = a field changed, a page left its sitemap or a shard lost a URL; exit 3 = something could not be measured, which is not a pass. A shard that grows is allowed (new pages).
- **Proof that the check works:** the self-test (23 cases) passes, and a live run against a copy of the baseline with three planted changes (one title, one canonical, one shard count) reported exactly those three and nothing else. The same run shows the baseline is stable between two captures.
- **Limits:** it is a sample, not the whole site. nginx caches static worksheet landings for up to an hour, so a compare run straight after a deploy can read a landing's pre-deploy bytes; run it again an hour later.
- **When the baseline may be re-captured:** only when the operator has asked for a change to an existing page's title, description or URL. Then re-capture and say so in the commit. Never re-capture to make a failing compare pass.

## 2. Traffic and conversion, 28 complete days to 2026-11-10

Source: the site's own analytics (Umami) and aggregate counts from the application database, read-only, by `scripts/seo/daily-system-baseline.sh`. Full output: `traffic-28d.txt`.

| Measure | 28 days | Per day |
|---|---|---|
| Sessions | 77,361 | 2,763 |
| Page views | 172,248 | 6,152 |
| Sessions arriving from Google | 8,599 | 307 |
| New accounts | 1,913 | 68 |
| Paywall shown | 1,700 times in 1,019 sessions | |
| Of those sessions, opened the pricing page | 158 | |
| Checkout started | 50 times in 28 sessions | |
| New subscriptions | 6 | |
| Active subscriptions today | 11 (plus 2 past due, 5 cancelled) | |

Google-referred sessions by week, oldest first: 1,883 · 1,952 · 2,311 · 2,604. The trend is up.

**Where Google visits land:** topic pages 5,199 (60 %) · tool pages 1,612 (19 %) · activity pages 690 (8 %) · deck pages 537 (6 %) · homepages 450 (5 %) · maker landings 39 · everything else under 30 each.

**Google-referred sessions by language:** sv 1,457 · en 1,253 · fr 1,245 · de 936 · no 865 · it 807 · nl 793 · fi 489 · es 446 · pt 226 · da 209.

**Where the paywall is shown:** topic pages 1,472 of the 1,700 (the download buttons on deck cards), activity pages 183, tool pages 25.

**Teacher features that exist today, total rows ever created:** 5 deck play links · 1 activity play link · 7 hosted worksheets · 9 saved maker worksheets · 4 maker share links · 4 collections.

### What this baseline says, and what it cannot say

- The number the programme exists to move is the last step: **about 68 new accounts a day become 6 subscriptions in 28 days.** Units, tests, sub packs and class results are measured by whether that number rises, not by page views.
- The teacher-side features that Part 9 builds on (links, saved worksheets, collections) are almost unused today. Part 9 cannot assume teachers already know them.
- **The static worksheet landings (about 36,500 pages) are not measured here.** They carry no analytics beacon; the "worksheet landing" row shows 73 page views, which is the hub pages only. Their traffic exists only in Search Console.
- **Search Console is not in this baseline.** This session cannot reach it. For absolute clicks and impressions the operator exports Performance → Pages for the same 28 days (2026-10-14 to 2026-11-10) once; the file belongs beside this one.
- Analytics counts browsers that run JavaScript. Use it for the trend, not as a click count.
