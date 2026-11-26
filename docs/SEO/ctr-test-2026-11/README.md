# Click-rate test: 25 changed titles/descriptions against 25 controls (started 2026-11-26)

**Why.** Search Console (3 months to 24 Nov 2026) showed ~120 landing and topic pages in the top 15 that get fewer
clicks than the site's own click rate for their position. Their titles already contained the searched phrase, so the
fix was not obvious. This test changes the Google title and meta description of 25 of them and leaves 25 similar pages
alone, so the effect can be told apart from the season, holidays and Google updates. Operator approval: 2026-11-26.

**What changed.** Only `<title>` and `<meta name="description">` of the 25 CHANGE pages: URL, h1, page text, canonical,
robots and hreflang are untouched. New titles are ≤ 60 characters before " · LessonCraftStudio", lead with the searched
phrase and the grade; new descriptions are 120-160 characters and say what the teacher gets. Every text was checked by
a native-speaker and pedagogy review (12 fixes applied) against the page's real content.

## Files

| File | What |
|---|---|
| `pages.json` | the 50 pages in 25 pairs, their 3-month clicks / impressions / position and their live title + description before the change |
| `build-treatment.js` | the 25 new texts; writes `treatment.json` (fails on length or a non-test page) |
| `apply-treatment.js` | writes the texts into `frontend/content/seo-landing/<loc>.json` and `topic-seo-overrides/<loc>.json`; proves only 2 fields per page change |
| `compare.js` | the measurement |

Two pages live in code: `/fr/topic/sciences/ce1-cours-elementaire-1` (`PAGE_SEO_OVERRIDES` in `frontend/lib/subject-hub.ts`)
and `/pt/topic/primavera` (`SEASON_COPY.pt.spring.title` in `frontend/lib/seasonal-hub.ts` + `topicMeta.spring` in
`frontend/messages/pt.json`).

## How the pairs were chosen

Landing or topic pages at position ≤ 15 with ≥ 250 impressions and clicks below the site curve; the top 50 by missed
clicks, one page per family of sibling pages (so two pages competing for one search are not split across the groups);
paired by language + page type, then by position and impressions; a fixed coin (sha1 of the pair) decides which page of
each pair changes. Before the change: changed group 661 clicks / 22,930 impressions (2.88 %), control 566 / 23,452
(2.41 %). Known imperfection: the two Finnish maze pages (`labyrintti-tehtavat`, changed; `labyrintti-hedelmat`,
control) compete for the same searches. The `topQuery` of a page in `pages.json` is a word-overlap guess and is
sometimes wrong; nothing measures by it.

## Measuring (from ~26 Dec 2026)

1. Search Console → Performance → Search results → Date: custom, from the deploy day (27 Nov) to the last full day →
   Export → CSV. Unzip.
2. `node docs/SEO/ctr-test-2026-11/compare.js "<the export folder>"`
3. Read the difference in differences of CTR and how many of the 25 pairs agree. Scale the change to the other ~95
   pages only if the difference is clearly positive, most pairs agree, and positions did not move (a CTR change with a
   position change is not a snippet effect).

Expect noise: the holidays fall inside the window, and many pages have only tens of clicks a month.
