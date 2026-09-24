---
name: project_seo_infrastructure_audit_2026_07_31
description: "Full SEO re-audit 2026-07-31 — x-default named a non-English page on ~42% of landings, nginx logging blackout invalidated the crawl analysis, /worksheets 410'd"
metadata: 
  node_type: memory
  type: project
  originSessionId: 95f3e213-9159-483b-93fb-26a968935df7
  modified: 2026-07-31T13:43:41.880Z
---

Triggered by "did you do everything that can be done?" after the seo-fix-spec work.
Answer was no. Three agents (open-workstream inventory, live technical audit,
server/crawl-log audit) + my own live measurement. CLAUDE.md **§21.8** holds the
forward rules; this is the working record.

## What was genuinely healthy (do not re-litigate)
130 sampled sitemap URLs: **zero** non-200s, zero noindex-in-sitemap, zero canonical
mismatches, zero redirect chains, 40/40 unique titles. DB: 0 null titles/descriptions
across 45,309 published decks. Disk: 0 broken symlinks, 0 missing deck.html. Sitemap ↔
disk ↔ exempt-map agree exactly. Trailing-slash correct on every page type. Landing
prose passes the repo's own similarity gate (max pairwise 3-gram Jaccard 0.609 vs a
0.80 FAIL line). **All four 2026-07-10 forensic blockers verified FIXED** (PDF redirect
loop, it→`/worksheets/undefined`, mixed deck hreflang, slash-less deck 404s).

## The four real defects, all fixed
1. ⭐ **x-default named a non-English page on ~42% of landings** — `Object.values(out)[0]`
   fallback. A Swedish landing declared SPANISH as the worldwide default, a Norwegian one
   DANISH. Now en-or-omitted. Post-fix sample: 0/24 bad, 7 correctly omitted.
2. ⭐ **nginx logging blackout** — `access_log off` on the landings + deck blocks meant
   `/<loc>/worksheets/<slug>` showed **zero 200s in 15 days**.
3. ⭐ **`/worksheets` and `/tools/<slug>` 410'd in locale-less form** — a 2026-03-04
   seller-era teardown rule that the June pivot turned into a self-inflicted 410 on the
   flagship surface.
4. **6,164 indexable URLs served `no-store`** — a `searchParams` read silently overrode
   `export const revalidate = 3600`.

Plus: 17 admin/debug surfaces live+indexable (now nginx-noindexed; gate baseline 28→10),
and the exempt-map had no cron (now hourly; it fails TOWARD noindex).

## ⚠ Lessons that cost real time here
- ⭐ **A hand-copied port defeats a SoT fix.** `render-landing-html.js` carries its own
  `buildHreflangAlternates` under a `lib/seo/hreflang.ts` banner. Fixing the TS original,
  deploying, and re-checking showed the offenders **unchanged** — the static renderer is
  what actually writes the 30,078 landings. Always grep for duplicate definitions.
- ⭐ **An agent's server-side parse is not ground truth.** The "5 self-canonical decks
  still noindexed" claim did not survive a live check — those decks canonical to a
  landing, so noindex is correct. 12/12 sampled sitemap decks were correctly exempt.
- ⭐ **`grep -c` counts LINES, and a naive extraction keeps only the LAST match** — that
  is how the earlier spec concluded "only one og:locale:alternate". Use `grep -o | wc -l`.
- **`grep` calls a file "binary" over one legitimate `\0`** (`out.split('\0')` for
  `git ls-files -z`). Use `grep -a`; do not go hunting for corruption.
- **A plain `str.replace` hits the FIRST occurrence** — my removal loop emptied the new
  Set instead of the baseline because both held identical lines.

## ❌ RETRACTED — "deck hreflang is missing" was FALSE (corrected 2026-07-31, same day)
This file first said *"~9,752 self-canonical decks carry none — a corpus retrofit the
§21.5a freeze exists to prevent."* **Both halves were wrong**, and the operator was
right to call it out.

**Measured over both deck sitemap shards:**
```
9,752 deck URLs — 4,014 (41%) carry a real multi-locale cluster; 5,738 honest singletons
/nl/decks/getalbegrip-g2227/ → all 11 locales, native slugs, x-default → /en/decks/base-ten-g2227/
the EN sibling carries an 11-member cluster pointing back — reciprocity holds both ways
```
⭐ **Deck hreflang is COMPLETE — declared via the SITEMAP** (`<xhtml:link rel="alternate"
hreflang>` in shards 0/1, built by `lib/seo/deck-sitemap-hreflang.ts`). Sitemap hreflang
is one of Google's three equivalent declaration methods. On-page tags would be a
9,752-file rewrite for **zero** signal gain. The singletons are correct too — a cryptogram
whose content is an English sentence genuinely has no sibling.

**Two errors stacked, both worth remembering:**
1. ⭐ **I repeated an agent's finding without checking the other channel.** "Deck pages
   emit zero hreflang" was true of the HTML and irrelevant on its own. **Before declaring
   hreflang missing, check ALL THREE channels: HTML, HTTP header, sitemap.**
2. ⭐ **I let a doc I helped write override an analysis I had already done.** In the same
   session I argued hreflang repair is exactly what §21.5a sanctions (that is how the
   x-default fix was justified) — then cited the same freeze to defer this. **A freeze is
   not a fact. Measure first; a doc never outranks a thirty-second measurement.**

## ✅ FIXED after the retraction (all measured before and after)
- **Standards index built** — `/[locale]/standards/` (was 404). 1,562 per-code pages had
  ~1 inbound link sitewide; the hub now groups all 142 EN codes by grade → localized
  strand, emits BreadcrumbList + ItemList JSON-LD + 11-locale hreflang, and is linked
  from the activities index. **Authored NO new prose** — every string is an existing
  localized atom (§21.3 would otherwise require a native ensemble per locale).
- **Crawl space bounded.** `/en/worksheets?page=101|999` returned 200 with an identical
  clone of page 100 (the page number was CLAMPED) → now 404. `/en/learn/<lang>?page=8`
  returned 200 with ZERO cards → now 404. `/en/topic/addition/grade-1` and
  `/zz/worksheets` each cost a hop then 404'd → now 404 in **0 hops**. Valid wrong-order
  combos still 301, and all 142 de-target landings stay reachable over pages 1-6.
- **1,842 apex DB rows normalized** (1,504 published) across all five URL columns —
  `thumbnail/html/pdf/answer_key/manifest`. `fix-deck-url-columns.js` could NOT do it: it
  is host-PRESERVING by design. New `normalize-deck-url-host.js`, idempotent; re-run
  finds 0; the existing drift gate stays clean.

## ❌ NOT a bug — "the hub hides 1,400 EN landings"
`3,793 = 2,393 monolingual + exactly 1,400 cross-language`. `getMonolingualLandings`
excludes `coordinate.target` rows **by design**, and those 1,400 have their own hub at
`/<locale>/learn/<language>`, reachable from the global nav (`/en/learn/german` = 142
landings over 6 pages, all 142 linked). ⭐ Same lesson as the deck-hreflang retraction:
**a number that looks like a gap is a hypothesis, not a defect — find the other surface
before calling it missing.**

## ✅ Duplicate SERP titles — FIXED, all 11 locales (340 groups / 3,766 pages → 0)

⭐ **The fix already existed and had never been shipped.** `compose-title-meta.js`
(2026-07-20) was written for exactly this defect — one code path for 11 locales,
differentiator-first — then withheld (`eaf6ecb1` *"Ship only the 300 individually-written
pages, not a corpus-wide churn"*). **Look for the already-built solution before designing
one.**

It was withheld for a real reason: it CONCATENATED slots. Measured over the full EN set
before fixing: **234 titles ended in a raw generator enum** (`Add+Sub`,
`Up/Down/Left/Right`, `Find Addend`, `Easy`) and words repeated throughout
(`…kindergarten … – Kindergarten`). Now composes instead:
- `pushDistinct` — a part is admitted only if it says something not already said;
  **majority (≥50%) STEM overlap counts as said** (5-char stem, so it `addizioni`/
  `Addizione` and fr `manquantes`/`manquent` bind).
- `isRawEnum` — checkbox values never reach a title, incl. difficulty words in all 11
  languages, plus a **structural rule for self-repeating localized pairs** (de
  `Bild-Bild`, es `Imagen-Imagen`) so the next translation cannot slip a list.
- ⚠ **The repair pass was re-introducing what composeOne refuses** — it forces the raw
  taxonomy mode label early to break a collision. It now skips enums and seeds the
  seen-set.
- ⚠ **The cue was composed from `free`+`print`, silently dropping "PDF" in all ten
  non-EN locales** (sv shipped `| gratis skriva ut` vs the protected trio
  `skriva ut PDF gratis`). SURFACE now carries each locale's LOCKED tail verbatim.

**Scoped with `--only-colliding`** — rewrite only pages that actually present
identically. The demand leads are lowercase harvested queries, so a full-corpus rewrite
would fix 3,766 and regress ~26,000 correctly-cased titles (de: live `Arbeitsblätter
Wortsuche – 4. Juli` vs composed `4. Juli wortsuche 1 klasse`). Semantic diff proves the
blast radius: 3,766 pages, title+meta only, 0 other fields, 0 slug changes.

⚠ **Scope first:** among the 9,752 self-canonical decks — the only decks reaching a SERP
— **zero** collide. The big deck-title collision counts are all landing-backed decks that
canonical away. Landings were the entire surface.

⚠ **`JSON.stringify(data, null, 2)` re-indented every file** — 1.38M-line diff for 3,766
edits. The writer now preserves the file's own 1-space indent → 7,543 lines.

**OPEN:** the rewritten titles don't capitalise German nouns (lowercase harvested leads).
Identical titles were the worse defect so this shipped; casing is the next pass.

## Still genuinely open
- **The PDF noindex canary is stranded** at EN addition|subtraction and has no verdict.
  ⚠ Never widen it — operator ruling, that was the May crash.
- **GSC work is the operator's**: no API creds exist; several decisions are gated on
  data never captured.

Related: [[project_seo_fix_spec_execution]], [[feedback_indexable_route_gate]],
[[project_seo_forensic_audit_2026_07_10]], [[project_crawl_budget_collapse_2026_07]].
