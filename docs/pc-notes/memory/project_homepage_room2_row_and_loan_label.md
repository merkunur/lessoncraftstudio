---
name: project-homepage-room2-row-and-loan-label
description: "Homepage v10 — Room II now hangs a full 5/5/5 wall and Room V's embed strip was rebuilt as \"the loan label\" (live 2026-08-05)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 86c1cd4e-19a9-4739-a47c-5cd6f83d3bb8
  modified: 2026-08-05T16:18:32.940Z
---

LIVE 2026-08-05 (`aa6317a9` + `fcb8995b`). Two operator-reported homepage defects.

**Room II** rendered 11 tiles → desktop read 5/5/1. The 11 was arithmetic, not a literal:
the real ceiling is `SHOWCASE_TYPES.length`, because `selectShowcaseDecks` takes **at most
one deck per exercise type**. Raising the requested count alone does nothing.

- ⭐⭐ **MEASURE THE GRID, DON'T DERIVE IT.** The wall was ragged at *every* width (320→2560),
  not just the operator's, and the column count was **non-monotonic** — 6 columns at
  1024–1180 but 5 above, because the `14vw` term in the `auto-fit` minmax kept growing the
  minimum track. Against a count nobody can predict, no fixed tile count can fill the last
  row. Fix: **declare** the columns per band (2/3/4/5) and show the largest whole-row
  multiple — 12 below the five-column band (12 divides by 2, 3 AND 4), 15 at five columns.
- `SHOWCASE_TYPES` 18→25, every addition verified in ALL ELEVEN locales against the live DB.
- `FALLBACK_SLUGS` 18→24. ⚠ **Not a rare path — local dev has NO database**, so it is what
  every local screenshot exercises. Too short and the layout you verify is not what ships.

**Room V** — a 1116×168 glass strip with one sentence and a pill became **the loan label**:
a worksheet turned around with the REAL `buildEmbedSnippet()` output taped to its back, a
working copy button, and the same sheet drawn already installed on their site.
**Zero new authored strings** — `homepageV3.embedShare.*` + `workspace.hosted.copied` were
already native ×11. `embedShare.body` deliberately unused: it promises a "one-line snippet"
and the real one is eight lines.

## ⭐⭐ The lesson that cost a second deploy
**A CROP IS A CONTENT-DEPENDENT DEFECT AND CANNOT BE VERIFIED ON ONE MACHINE'S DATA.**
`object-fit: cover; object-position: top center` looked perfect locally (a more-less deck,
content-rich at the top) and shipped a **blank rectangle** on production, which drew a
picture-sort whose top third is two deliberately EMPTY sorting bins. Nothing had failed —
image loaded, `naturalWidth` 315, opacity 1, zero request errors. Found only by reading the
LIVE render. Fixed with `object-fit: contain` in a square well, which is also the truthful
shape (a real embed auto-resizes to the deck's own height). **The local fallback set and the
production DB pick different decks by design.**

## Other durable findings
- ⭐ **An agent's defect claim needs verifying too.** A planning agent reported that
  `crossword` (0 themed es decks) leaks an English deck onto the Spanish homepage and
  proposed a `return []` fix. FALSE — `candidatesForType` falls back to *themeless
  in-locale* first (47 available), so the English branch is never reached, and the fix would
  have contradicted a documented deliberate choice. Measured before applying.
- ⭐ **Rotated tiles break row-grouping by `getBoundingClientRect`.** `.hv10-work` carries
  `rotate: var(--tilt)`, which inflates each bounding box differently — my first measurement
  reported "9 columns" on a grid that plainly renders 5. **Group by `offsetTop`.**
- ⭐ New gate `scripts/audit-hang-rows.js` — poison-tested honestly by pointing it at
  PRODUCTION's still-ragged wall: 28/28 FAIL there, 28/28 PASS locally.
- ⭐ `audit-homepage-responsive.js` flagged the code block, which is a *scrollable region*,
  not a breakout. Fixed WHAT it measures (descendant of `overflow-x: auto|scroll` is measured
  against the scroller) — **`auto|scroll` ONLY**, since every `.hv10-room` sets
  `overflow-x: clip` and accepting clip would blind it site-wide. Poison-tested both ways.
- ⚠ **`grep -c` counts LINES, not occurrences** — minified HTML made 15 tiles read as "2".
- ⚠ Both homepage files must change together: `app/[locale]/preview/homepage-v10/page.tsx`
  is a near-duplicate and the declared visual-diff safety net.
- The 11 `embedPrefix`/`embedKeyword` pairs moved to `lib/seo/embed-anchor-text.ts` (one
  table, two consumers — the §21.8-A shape), proved byte-identical before trusting the move.

See [[feedback_verify_the_measurement_before_the_defect]] and
[[feedback_poison_every_assertion_not_just_the_first]].
