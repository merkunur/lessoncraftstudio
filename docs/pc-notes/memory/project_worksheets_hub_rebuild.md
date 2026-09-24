---
name: project-worksheets-hub-rebuild
description: "/[locale]/worksheets rebuilt 2026-09-03 — 11 stacked blocks to 6, All/Interactive tabs, print-only honesty, spread ordering with 0 same-row type repeats, 11 native panels"
metadata: 
  node_type: memory
  type: project
  originSessionId: 05b234ef-6faa-4eae-a736-25de84b21373
  modified: 2026-09-03T12:39:04.249Z
---

# Worksheets hub rebuild (2026-09-03, commit `56f5a388`)

Operator, angrily: the hub read like a blog post — new worksheets bolted on as two
card strips above the grid, three "Browse by …" chip walls stacked below it, a
three-way sort control, an "Interactive" button in the top nav, print-only sheets
advertising a Play button and an Answer key that 404s, and the ~1,057 sheets per
locale with no landing page exposing no download at all. Then: **"why free
worksheets? Nothing is free"** and **"the 'All worksheet types' section looks
terrible"**.

## The two defects were one defect

The strips existed because `interleaveByAxis` ordered type buckets **size-desc**,
so page 1 was one row from each of the 24 largest of 71 types and the newest
families (2-5 rows) could never reach it. Those newest families are exactly the
**print-only** mechanics — you cannot trace a letter with a mouse. Fix the
ordering and the patch is redundant.

## Ordering — the reduction I got wrong first

A 4-column row is the aligned window `[4k … 4k+3]`, so "no type repeated on a
row" is a **distance-≤3** constraint, NOT adjacency: offsets 0 and 2 are on the
same row and are not adjacent. `|i−j| ≥ 4` covers 2, 3 and 4 columns at once, and
`PAGE_SIZE = 24` is divisible by all three, so **the whole constraint is local to
one page**. Four stages: slug seed → spread by theme → √-weighted stratified deal
(`GAMMA = 0.5`) with an **integer rational rank** (`j₁·n₂ − j₂·n₁`, never floats,
never `localeCompare`) → per-page most-remaining-first under a D=4 cooldown.
Measured: **0 violations, both tabs, 11 locales, 1,471 pages**. Old algorithm: 88
adjacent duplicates, 553 same-row repeats in en, and a tail of **89 consecutive
find-and-count cards**.

## Lessons that cost time here

- ⭐⭐ **WRITE THE BRIEF FROM THE ARTEFACT, NOT FROM MEMORY.** I told panels the
  shipped rail label for nl/sv/da and **invented all three**. The Dutch panel
  caught it by reading the file. Then my correction pass "found" five wrong —
  two of those were my own already-applied renames. *Verify the measurement
  before the defect*, then verify the correction too.
- ⭐⭐ **THE PANELS AUDIT THE SOURCE, AND THEY READ THE CODE.** Italian read
  `page.tsx` and found `empty.showAll` = "Show all worksheets" was FALSE — its
  href clears only `format`. Italian also found `card.playAria` sat on a
  `role="img"`. Spanish then showed the badge key is **grammatically** load-
  bearing, not merely thin: the tab word agrees with an implied *format*, the
  badge sits on a *worksheet*. Danish and Finnish showed their forms are correct
  only **by coincidence** of gender/case and would break on another noun.
- ⭐⭐ **PLURALISING A SUBJECT IS NOT A LOCAL EDIT.** "Every worksheet has an
  answer key" → "Many worksheets…" stranded a pronoun in de (`es`→`sie`), it
  (`abbinarla`→`abbinarle`), fr, es (`combinarla`→`combinarlas`), nl, da (`det`
  →`dem`), pt (an imperative with no object). Spanish's test: **not "is this
  sentence correct" but "what is the antecedent, and did I just change its
  number?"** Swedish added the second half: **did the referent SET change?** —
  "kombinera dem" after "Många arbetsblad" silently meant *the ones with answer
  keys*.
- ⭐ **A FOURTH FALSE CLAIM HID BEHIND A SILENT FIX.** The usage block said each
  worksheet "is available in all 11 languages" (false — the *catalogue* is). My
  English repaired it as a subject-swap that read like a style edit, so a
  faithful minimal translation would have preserved the falsehood. de/es/it/pt
  each caught it independently.
- ⭐ **CRLF, TWICE, PLUS A LYING "ALREADY APPLIED".** `render-landing-html.js`
  and `topic-seo-overrides/en.json` are CRLF; LF needles matched nothing, and my
  patcher's "already applied" heuristic then reported success. Marker-first, and
  a missing needle is a hard abort. The claims file also has **no trailing
  newline** — detect, never assume. And the guard runs BEFORE the write, so the
  write must use the same serialiser.
- ⭐ **THE BASH HEREDOC EATS BACKSLASHES** (recorded, walked into twice). Write
  the script to a file.
- ⭐ **A POISON THAT TESTS A NO-OP PROVES NOTHING.** "Collapse `NULL_KEY` to `''`"
  SURVIVED, correctly — a sentinel is only compared within one axis, so `''`
  gives an identical partition. Replaced with "scatter null into per-row keys",
  which the gate kills.

## What ships

- `config/interactive-exercise-types.ts` — 30 keys (29 apps + `picture-trail`),
  derived from a production groupBy over **44,981 decks: 30 all-answer-key, 65
  none, 0 MIXED**. `scripts/lib/interactive-types.js` is the CJS reader so the
  TS app, the deploy-time landing renderer and the audit share ONE source.
- One format mark per thumbnail, one slot: play button OR "PDF only" chip.
- Card action row → the **slug-keyed** metered proxy `/api/quota/dl` the static
  landings already use (so no deck id is needed and the meter is not bypassed).
- Rail: all levels + all types grouped by subject + ALL themes permanently in
  the HTML (retires `?themes=all`); foot keeps a balanced A–Z index of the
  native-language `/topic/` links. **Crawlable link count goes UP.**
- `scripts/verify-worksheets-hub-order.js` (loads the REAL TS module, asserts
  against the per-page provable bound, 6 poisons) and
  `verify-worksheets-hub-render.js` (rendered DOM, corpus-complete, proven to
  fail without data).
- The axis rail label is a **per-locale ruling**: de/es renamed, fr/it/pt/nl/da/
  no/fi kept, each on their own shipped corpus. Never cross-apply.

## Still open — reported, not touched
- **Price claims far beyond this page**: sv measured **132 catalogue-facing
  `gratis` strings** (308 sitewide) incl. `topicPage.meta.description` and all
  `seo.ogImageAlt.*`; de `topicFaq` 294; fi, no, pt, it, fr the same shape.
- **fr: 34 of 79 `topicProse` entries have stripped diacritics, 26 with `ou` for
  `où`** — meaning-inverting.
- ~16 `topicPage.*` keys × ~10 locales carrying free/answer-key claims (operator
  ruled: report, do not touch — 7 are indexed meta descriptions).
- Cross-surface axis-word splits: da Opgavetype/Øvelsestype, no Oppgavetype/
  Øvelsestype, de Übungstyp/Übungsart. **sv is the only locale where
  `exerciseType` and `exerciseMode` render the IDENTICAL word.**
- Print-only thumbnails are white-heavy in the 4:5 crop (asset issue, pre-existing).
