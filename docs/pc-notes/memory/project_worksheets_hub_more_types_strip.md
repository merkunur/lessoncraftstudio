---
name: project-worksheets-hub-more-types-strip
description: "Second /worksheets page-1 card strip (MORE_TYPE_GROUPS) surfacing the 7 legacy families that the SIZE-DESC bucket sort strands on pages 2-3 — 21 links x 11 locales, LIVE 2026-09-01"
metadata:
  type: project
---

# /worksheets hub — "More worksheet types" strip (LIVE 2026-09-01, commit b3edb382)

Operator: Arrays and Multiplication, Fractions, Geometry, Graphs and Data, Number Charts,
Measurement and Telling Time showed **only** in a landing page's "More versions of this
worksheet" row. Ship them on the hub too — Measurement/Telling Time **except the last batch**.

**They were never missing content.** All 21 landings/family-set exist in every one of the 11
locales. `worksheets-catalog.ts interleaveByAxis` orders type buckets **SIZE DESC** and
`WORKSHEETS_PAGE_SIZE = 24`, so hub page 1 is exactly one landing from each of the 24 largest
buckets, of 53. These families hold 2-4 landings and rank ~46-53 — a bucket needs **~47
landings to reach rank 24**, so they could never surface on their own. Same root cause as the
nt20 batch ([[project-nt20-worksheet-types]]), same remedy: a page-1 strip.

**Shipped:** `MORE_TYPE_GROUPS` in the generated `frontend/config/worksheets-new-highlights.ts`
(second export beside `NEW_WORKSHEET_GROUPS`), rendered as a second strip under
`worksheetsPage.moreTypesHeading` (new string x 11). One card per family (lowest grade band) +
its other grade bands as chips = **21 links/locale, 231 total**, all pre-existing landings.
`gen-var-highlights.js` gained the resolver; `page.tsx` render is now ONE shared
`highlightStrip()` helper so the first strip's markup is unchanged (verified: still 125 links).

## The load-bearing decisions
- ⭐⭐ **RESOLVE BY SCANNING THE CORPUS, NOT BY RE-DERIVING THE DECK SLUG.** The `BASES` path
  rebuilds `famSlug + theme + id`. For these legacy families that resolves **nothing in most
  locales**: the canonical deck slugs carry different **ids AND themes per locale** — en
  `graphing-data-toys-g1142` vs de `diagramme-tiere-g1144`; en `measurement-fruits-k038` vs de
  `messen-tiere-k038` vs fi `mittaaminen-elaimet-k038`. Scan `coordinate.type === family`.
- ⭐ **ORDER BY THE GRADE BAND IN THE CANONICAL DECK ID** (`-(k|g1|g2|g3)\d+`), never by
  `coordinate.level`: the SAME deck is `kindergarten` in en, `vorschule` in de and `1-trinn` in
  no (the Norwegian +1 shift). Neither `topics-taxonomy.json axes['educational-level']` (fi
  `varhaiskasvatus`, sv `arskurs-1`) nor anything but `LEVEL_ORDER` in TS matches the landing
  level keys — the id is the only locale-invariant source.
- **"The last batch" = the nt20/VAR ids inside the two REUSED family keys** — measurement
  `g2252,g2260,g2261,g2262,g2263`; telling-time `g1212,g1233..g1237`. They already have cards
  in the first strip; excluding them is what stops the two strips duplicating a worksheet.
- **Chips carry the grade band, not the h1.** These h1s are full sentences ("Grade 3 Geometry
  Worksheets: Quadrilaterals, Right Angles, Perimeter, and Area"); the full title rides in
  `title`/`aria-label`. `levelChip(level, locale)` already covers all 11 locales' native keys.
- **The sibling rerolls stay put.** The ~310 decks in "More versions" are RNG rerolls
  (`telling-time-g3344-2..-10`, `fractions-easy-g2230-2`) — the house ruling rejects
  reroll-as-variation, so they are correctly a thumbnail row, not landings.

## ⭐⭐ The gate lesson: A HAND-WRITTEN EXPECTED COUNT CERTIFIES A SUBSET
The generator's fail-loudly gate first read `MORE_TYPES_EXPECT_GROUPS = 7`. Its own poison
test — add an 8th family that resolves nothing — **PASSED**: still 7 groups / 21 links. The
count must be **DERIVED from `MORE_TYPES.length`**. Added cross-locale **shape parity**
(`2-2-3-3-4-4-3`) as a third check, which is what catches a defect the 21 total hides. All five
poisons then fired (missing family, exclusion disabled, unreadable band, one locale short,
shape-differs-but-total-matches) with a control passing. Same family as §23.6's non-vacuity rule.

## Traps paid for here
- ⚠ **The Bash-tool heredoc collapses `\` to `\`** (recorded as "inline-bash eats \\"). A
  python needle written `';\n'` arrived as a real newline and matched nothing. Build literal
  backslashes with `chr(92)`.
- ⚠ **A `sed s|...|...|` whose pattern contains `||` errors out and writes an EMPTY file** —
  three "poisons" then tested a 500 page, not the poison. A poison stopped upstream tests nothing.
- ⚠ **`while read` drops the last line when the file has no trailing newline** — a 77-item
  probe reported "76 ok, 0 missing" and 76≠77 was the only tell.
- ⚠ **Node's `/tmp` is `C:\tmp`, Git Bash's is under AppData** — a cross-tool handoff produced
  "200s: 0 non-200: 0", which reads like success. Print the row count too.
- ⚠ **React entity-escapes text** (`d&#x27;exercices`) — decode before comparing rendered copy,
  or fr fails a correct build.
- ⚠ **Blank thumbnails in a local screenshot are the cold Next image optimizer**, not a defect:
  all 77 base thumbnails are live 200 in production. Verify the measurement before the defect.
- ⚠ The deploy log carries **27,926 pre-existing `MISSING_MESSAGE topicMeta.<theme>__<type>`**
  errors that do not fail the build — do not mistake them for your own.

## Verification performed
generator 21x11 with `NEW_WORKSHEET_GROUPS` byte-identical · tsc identical to a stashed baseline
(7 pre-existing test/e2e errors) · rendered-hub verifier over all 11 locales (links, order,
thumbnails, no cross-strip overlap, localized heading), itself poison-tested 4 ways on the render
· negative gates hold for `?type` / `?sort=az` / `?page=2` · layout sweep 320-1366 x en/de/fi/pt/fr
= 30/30 clean (gate poison-tested) · I read the 360/768/1024 renders · deploy EXIT=0 · production
verifier ALL PASS x 11 · **all 231 landing URLs 200**.


## ⭐⭐ ROUND 2 — I SHIPPED THE WRONG THING FIRST (commit 792994b8 fixes it)

Operator, angrily, with screenshots: filtering the hub by Arrays and Multiplication
returned **2** results, Geometry **3**. They had asked for the WORKSHEETS to appear on the
hub; I put the seven **families'** landing pages there and explicitly scoped the individual
sheets OUT in the plan ("the sibling thumbnails stay where they are").

**The misread, and why the approval did not catch it.** I asked two AskUserQuestions —
"placement" and "card shape" — and BOTH presupposed my reading. The one fork that mattered
(families vs the sheets themselves) was never put to the operator; it was buried as a scope
note in a long plan they approved. **When you consciously scope something out, that IS the
question to ask.** A choice you have already resolved in your own head does not become
shared just because you wrote it down.

**The measurement I should have led with.** A landing stands in for many sheets:
en = 33 landings over **322 published worksheets** (arrays 2 of 27, fractions 2 of 68,
telling-time 9 of 87). Hub-wide it is 3,918 landings over 4,976 decks — **1,058 sheets
hidden across 25 of 53 types** (missing-pieces 242, grid-match 105, more-less 104).

**The fix:** `frontend/lib/worksheets-sheets.ts` — each `collapseSiblings` deck becomes a hub
row carrying its PARENT landing's coordinate (type/theme/level, already locale-native, so no
mapping is invented) + its own DB title + its own deck URL. Every downstream function keys
off coordinate/slug/h1/canonicalDeckSlug, so the rows flow through filters, facets, sort and
cards untouched and all counts become truthful. "Except the last batch" fell out free — the
nt20/VAR landings collapse nothing, so they contribute no siblings.

## Round-2 lessons
- ⭐ **The inherited grade chip was an assumption — so I measured it**: all 289 en sheets'
  own `ageRange` maps to the parent landing's band, 0 mismatches. Verify inherited metadata
  before shipping it, don't reason that it "should" match.
- ⭐ **Local had no DB and the titles come from the DB**, so the change was invisible locally.
  Pulled the real 326×11 titles from production as a fixture and temporarily fed the page
  from it → rendered, screenshotted, measured, then reverted. Verifying a DB-dependent change
  on a DB-less box needs real data, not a skipped check.
- ⭐⭐ **`text-lcs-teal/70">27` — my count extractor grabbed the `70` out of the CLASS NAME**
  and reported every page as "70", which made a correct deploy look broken and sent me
  chasing a cache ghost. *Verify the measurement before the defect*, third time this session.
- ⭐ **Cloudflare edge-caches the hub 300s, so a plain URL serves a pre-deploy copy** and a
  correct build reads as broken for minutes. Check the ORIGIN (`curl 127.0.0.1:3000` with a
  Host header) to separate cache from code, and cache-bust when verifying. No CF purge token
  exists on either box (only R2 storage keys) — you cannot purge, you wait.
- ⚠ **The repo file was CRLF** (git renormalized it after the earlier commit), so multi-line
  python needles using `
` silently matched nothing. Normalize newlines for matching and
  restore the original style on write.
- ⚠ Node's `/tmp` is `C:	mp`; Git Bash's is under AppData — a cross-tool handoff produced a
  vacuous "0 and 0" result. And an SSH pipe line-wraps long JSON: transfer with base64.


## ROUND 3 — operator: "FIX IT" → allowlist removed, ALL types expand (`a04bf3c0`)

5,491 sheets in 11 locales (en 1,058 over 25 of 53 types). en: missing-pieces 48→290,
grid-match 47→152, more-less 52→156, math-puzzle 45→136, code-addition 94→141,
shadow-match 48→140, picture-trail 48→97, bingo 18→36; hub rows 3,918→4,976. All 5,491
resolve to a published deck row with a title, so nothing is dropped.

### ⭐⭐ I NEARLY "FIXED" CORRECT BEHAVIOUR — TWICE THE SAME SHAPE
117 en sheets carry an `ageRange` whose band differs from the parent landing's level. It
looked like the inheritance was wrong and I was about to derive the level from `ageRange`
instead. **It is the §22.1 ledger override: a landing's grade comes from the MECHANIC, not
the age_range tag.** The decisive test was asking whether the PARENT's own deck mismatches
identically — it does, in all 117, with **0** sheets genuinely departing from their
coordinate. Re-deriving would have replaced the curated band with the raw tag the whole
landing programme exists to override. *The fence working is not the fence failing* — and the
right test is "does the thing I trust disagree the same way?", not "do these two numbers
differ?". Rationale is now in `worksheets-sheets.ts` so nobody re-fixes it.

⚠ Related trap: I tried to learn `ageRange → native level key` from the corpus to do that
re-derivation. The mapping is **heavily ambiguous** (en 5-7 → kindergarten 67%, but also
language-beginner 468 / grade-1 130 / grade-2 102), which was itself the evidence that level
is editorial, not derived. An ambiguous "learned" map is a signal to stop, not to take the
mode.

### ⭐ A TRUE EXPANSION CAN STILL BE A WORSE PAGE — CHECK WHAT IT RENDERS
The seven families had distinct per-sheet titles (number-charts 30/30, arrays 25/25), so I
assumed the rest would. They do not: **missing-pieces = 242 sheets under ONE title "Missing
Pieces"**, grid-match 105 under one, more-less 104, math-puzzle 91 — 16 types where every
sheet shares a single title. Correct counts, useless grid. Caught by screenshotting the
biggest expanded type, not by any count assertion.
**Fix = normalise, don't invent:** the good titles already follow `Title — Theme` ("Add It
Again — Animals", "Heavy or Light? — Fruits"), so append the theme where the title lacks it
(guarded against double-suffixing). missing-pieces 1 → 48 distinct labels, grid-match → 34,
more-less → 52, code-addition → 46. Rendered check: 24/24 distinct titles AND distinct
thumbnails.

### Method note that paid for itself three times this session
Local has **no DB** and the titles come from the DB, so every check would have been vacuous.
Pulling the real 5,491 titles from production as a fixture (base64 over ssh — a plain pipe
line-wraps long JSON) and temporarily feeding the page from it made the whole thing
verifiable locally before deploying, including the screenshot that caught the duplicate
titles.
