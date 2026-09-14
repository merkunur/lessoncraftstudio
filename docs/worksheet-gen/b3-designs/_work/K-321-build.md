# K-321 `days-and-months` : BASE build report (2026-09-14)

Built from `K-321-days-and-months.md` §2 + §5 under `_BUILD-BRIEF.md`, `_SUBSTRATE.md` and the README cross-type rulings. Phase 1 = the base page only ("Days of the Week in Order"); the five faces, their components (`nameBank nameLadder railFlag neighbourRow`) and their poisons (P1 P4 P6 P7 P10 P11) are Phase 2. Nothing shared was edited; nothing was committed.

## Files (all type-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/types/k/K-321-days-and-months.js` | the spec: `{id:'K-321', slug:'days-and-months', gradeBand:'K', assetClass:'geometry', exerciseType:'days-and-months', themeAxis:{applicable:false}}`, no `unitAxis` (design §1: months are FACES, `unit` is a config key). `build()` reads ONLY `bank('days-and-months', loc)` + `CALENDAR[loc]` from `data/b2/calendar.js`; `_buildWith(bank, args, ctx, calOverride)` is the gate's poison seam. Exports the helpers the design placed in `lib/b3-common.js` (`cycleOf rankOf dayAt neighbourDay neighbourMonth calendarOf shuffleRules`) — see deviation 1. |
| `scripts/worksheet-gen/templates/components-b3/days-and-months.js` | NEW components, exactly the names the design declares for the base: `nameTile({text,w,h,px,id})`, `rankBox({n,d})`, `orderRows({items,cols,tileW,boxPx,namePx,given,unit,weekStart,strip,rowMax})`. Inline scoped CSS on token colours; `answerBox` (components.js) and `numberStrip` (components-b2.js) required, not redefined. Namespace merge verified (no duplicate export against K-317/318/319/320/322 and the G1 siblings). |
| `scripts/worksheet-gen/data/b3/days-and-months.js` | EN bank per §5 shape: `names:'calendar'` (sentinel), `labels` x5, `alt`, `dayShort:null`, `laneGlyphH`, `abbrev:'calendar'`, `strings['K-321']`. NO day/month/abbr/weekStart copy (the gate + the spec both refuse one). `data/` is gitignored — force-add. |
| `scripts/worksheet-gen/qa/verify-b3-days-and-months.js` | the gate (below). |
| `docs/worksheet-gen/b3-designs/_work/K-321-build.md` | this report. |

## What the base page is (as built, measured in the real render)
- 7 rows `[rank cell 60][12][name tile 440 x 60]` = 512 px centred in the 675 body column; grid rows `minmax(60px, 100px)` (design: `minmax(60px,1fr)` — deviation 2), gap 14, `align-content:center`; d3 = 2 columns of `[60][12][250]` = 322, 2 x 322 + 24 = 668 <= 675, reading order down column 1 (`grid-auto-flow:column`, 4 + 3).
- Name tile: cream `#FBF3E4`, border 2 creamDeep `#F5E9D2`, r 12, Baloo 2 700 26 ink, nowrap, padding 0 10 → inner 416 (440) / 226 (250) exactly the design floors. Text VERBATIM from `CALENDAR[loc].dayNames` (en/de capital, the nine others lower; `Samstag`, never `Sonnabend`).
- Rank cell: `answerBox({w:60,h:60,answer:rank})` = the house `.ws-answerbox` (white, 2 px dashed `#C8BFAE`, r 10), prints nothing, carries `data-lcs-answer`. Given cell `rankBox({n})`: tealSoft `#DDEBE8`, teal 2 border, r 10, numeral Baloo 2 700 30 ink, `data-lcs-given`, NO answer stamp.
- Ladder (resolved config keys, guards key on them): d1 `given:[1,4,7] strip:true namePx:28` (4 writes); d2 `given:[1]` (6 writes, ships); d3 `cols:2 tileW:250 rowMax:120` (6 writes). All within K items [4,8]; boxPx 60 >= K minElement 56.
- Composer: `rng.shuffle(0..6)` re-drawn until (a) no tile at its own rank position, (b) no forward week-neighbour pair in reading order (across the column break at d3), (c) >= 3 displaced. 20/20 d2 seeds distinct.
- Stamps: root `data-ws-content data-lcs-order data-lcs-unit data-lcs-weekstart data-lcs-n data-lcs-cols data-lcs-given` (the last is additive: the given-rank list, so verify() can check the given cells against the config); rows `data-lcs-row data-lcs-day`; tile `data-lcs-day`.
- `verify(page)`: passes the 11 CALENDAR name tables from Node into `page.evaluate` (the browser side cannot `require`) and picks by `<html lang>`: n rows, a permutation, tile text verbatim, cell per row, the anchor "1" on `dayNames[weekStart]` (message "anchor ≠ weekStart"), given cells print their rank, answers = {1..7} minus given, no duplicate answer, rules (a)-(c), no `<img>`, no `{`, no numeral outside a given cell / the d1 strip, every tile text narrower than its tile.

## Gate — `node scripts/worksheet-gen/qa/verify-b3-days-and-months.js`
```
PASS (365 assertions, 12/12 poisons killed)
```
Sections: (1) bank rules 1/2/3/5 incl. the calendar-stem ban `/calend|kalend|kalent/iu` and the per-locale season ban on every title + instruction, plus `calendar.js` `dayAbbr` prefix rule **77/77**; (2) real-pipeline renders en d1/d2/d3 + the floor test + a synthetic de control (never written to disk) anchoring on `Montag`; (3) 20-seed sweep x d1/d2/d3 = 60 builds, rules (a)-(c) every seed, 20 distinct d2 permutations; (4) poisons. The gate asserts ITSELF: every rank cell / tile >= 56 px, the given numeral >= 30 px, tile width === config, rows inside the body column and above the footer, the design stack <= 722, and the widths of every locale's names measured INSIDE the rendered page.

**Measured widths (real Baloo 2 700 woff2 from `file://`; control `Wednesday` @26 = 135.1 = the design's number):** day @26 widest pt `segunda-feira` 165.0 <= 416 (base) and <= 226 (d3); day @28 widest pt 177.7 <= 416 (d1); month @24 widest es `septiembre` 123.8 <= 216 (F3 tile); month @22 widest es 113.5 <= 145 (F4 today tile). Every locale's data clears every base floor with >= 61 px to spare.

**Poisons killed (each for its own reason; EN bank = control):**
| # | poison | killed by |
|---|---|---|
| P2a | de page, `weekStart` poisoned to 0 → "1" on `Sonntag` | verify: `anchor "1" sits on Sonntag ≠ the de first day Montag (anchor ≠ weekStart)`; control `Montag` PASSES |
| P2b | en page, `weekStart` poisoned to 1 → "1" on `Monday` | verify: same rule; control `Sunday` PASSES |
| P3a | rows re-laid in calendar order | verify: `sits at its own rank position` |
| P3b | exactly one forward run, no fixed point | verify: `is a forward run` — and ONLY that finding |
| P5a | en tile `monday` | verify: `tile reads "monday" ≠ en name "Monday" (verbatim)` |
| P5b | de tile `Sonnabend` | verify: `≠ de name "Samstag" (verbatim)` |
| P8 | title `Wochentage im Kalender` | bank: calendar-stem ban; control `Wochentage in der richtigen Reihenfolge` PASSES |
| P9 | instruction with `Jahreszeiten` | bank: season ban |
| P12 | two boxes both `data-lcs-answer="3"` | verify: `two boxes carry the same answer` |
| P13 | rows pinned at a fixed 100 px (784) under 3-line chrome | `qa/lints.js` footer-overlap lint |
| P14 | bank defining `dayNames` | bank rule 2 AND `_buildWith` refuses |
| P15 | rank box forced to 48 px | the gate's OWN K floor (verify 0, lints 0 — neither sees it) |

Deferred to Phase 2 with their faces: P1 (F1 rung-1 gap), P4 (F1 bank order), P6 (F2 wrap), P7 (F4 wrap), P10 (pt F2 today at 24), P11 (F5 derangement). Also refusal checks: an unauthored locale (`xx`) throws `no xx block`; a bank without the `calendar` sentinel throws.

## Renders (LOOKED AT, all clean: verify 0 / lints 0)
- `scripts/worksheet-gen/out/dev/K-321-null-d1-en.png` — strip 1..7 + 7 rows, given 1/4/7, 4 dashed boxes.
- `scripts/worksheet-gen/out/dev/K-321-null-d2-en.png` — the shipping page: 7 rows, `Sunday` anchored 1 in the tealSoft cell, six dashed boxes.
- `scripts/worksheet-gen/out/dev/K-321-null-d3-en.png` — 2 columns 4 + 3, rows capped at 120 and centred.
- Gate renders: `out/dev/K-321-gate-d{1,2,3}-en.png`, `K-321-gate-d{1,2}-en-longchrome.png` (3-line title + 3-line instruction), `K-321-gate-d2-de-control.png` (Monday-first: `Montag` = 1, `Sonntag` = 7).
- `node i18n/build-en.js` → `build-en: 486 types … (title lint clean)` (K-321 title unique in K; 67 chars; no worksheet word; no calendar stem).
- `node tools/b3-baseline.js --check --quick` → `checked build 2780 + enum 200 in 15s: 11 drifted (0 expected), 0 missing` — **build section 0 drift**; the 11 are `wave:wave-001..011` (the legacy `types:"all"` waves that shift with any new spec file — ignored per the task).

## Deviations from the design file (each with the measurement)
1. **Helpers live on the spec, not in `lib/b3-common.js`.** The design adds `dayAt / neighbourDay / neighbourMonth / rankOf` to `lib/b3-common.js`; that file EXISTS now (the design measured it absent) and is shared, so it was not edited. The functions are exported from `types/k/K-321-days-and-months.js` (`cycleOf rankOf dayAt neighbourDay neighbourMonth calendarOf shuffleRules`); the faces `require` the base spec. The reviewer may lift them into `b3-common.js` in a shared commit.
2. **Grid rows `minmax(60px, rowMax)` instead of `minmax(60px, 1fr)`, with `align-content:center`; `rowMax` = boxPx + 40 (100) by default, 120 at d3.** Measured 2026-09-14 with `1fr`: d3's 4-row stack stretched to the whole 799-px body and put **143 px of empty space between rows** (rows at 187 / 390 / 593 / 796). With the cap the 7-row levels still open their slack between rows (7 x 91 at the 722 floor = the design's own number; 7 x 100 at 799) and d3 sits as a centred 522-px block. Boxes and tiles stay 60 in every case.
3. **`rowMax` is an additive config key** (d3 only; absent = default). Recorded so `gate-variation-distinct` and the faces' PARAM overrides see it.
4. **The README 722 floor is 710 here.** A legal 70-char title (3 lines in the ~375 px title column) plus a legal 150-char instruction that wraps to 3 lines gives a body of **710 px** in this pipeline (measured; the 150-char instruction wraps to 2 lines for most strings → 733). The gate runs the floor test at 710 (asserting the 3 + 3 lines it produced, not an invented character count) and both tallest stacks (d1 558, d2 504) pass; P13 proves the footer lint is live at that floor.
5. **Root stamp `data-lcs-given`** (the given-rank list) added beside the four the design lists, so verify() can check the given cells against the config even when several ranks are pre-printed (d1).
6. **No `blankNumeralBox`.** Every open box on this page carries an answer (`answerBox({answer:rank})` stamps `data-lcs-answer`), which the README rule ("never `answerBox` WITHOUT an answer") allows and the design names explicitly (`.ws-answerbox` grey dashed = the house written-numeral convention); K-320's `blankNumeralBox`, if it lands, is not needed here. Flagged in case the reviewer wants the coral dashed signal instead: it is a one-line swap in `orderRows`.
7. **Bank file name** is `data/b3/days-and-months.js` / export `DAYS_AND_MONTHS` (the family key; the design §5 wrote `days-months.js` / `DAYS_MONTHS`) and the gate is `qa/verify-b3-days-and-months.js`, per the build task.
8. **The synthetic de block used by the gate's locale poisons is in-memory only** (labels gestern/heute/morgen/davor/danach + a de title/instruction that pass the validator); the real de block is the de panel's, Phase 3.

## Notes for the reviewer / Phase 2
- `scripts/worksheet-gen/i18n/strings.en.json` shows as modified in the working tree: `build-en.js` regenerates it and the committed file is stale (44 entries missing — K-308..K-322 + G1-285..306 + G2-304..314 — **0 entries changed**, verified semantically). I restored it to HEAD after my run; a sibling builder's `build-en` run re-wrote it afterwards (K-320 / K-322 landed in the tree during this build). Whether to commit the regenerated file is the reviewer's call; K-321 resolves from its inline `i18n.en` either way (`resolveStrings` falls through to the spec).
- `apps['days-and-months']` + `axes['exercise-type']['days-and-months']` slug/name x11 (§1 table; 0 collisions measured by the design) are the registration step (`tools/register-b3-taxonomy.js`), not part of this build.
- Faces: F3 (`unit:'months'`) is already reachable through this build (`cycleOf` handles `months`, anchor January, answers 2..12, `n:12` guard, G1 item range via `gradeBand`); F1/F2/F5 need their `layout` branches + components; the width floors for F3/F4 are already measured and green in this gate (deviation-free data: es `septiembre` 123.8 @24, 113.5 @22).
- `dayShort` (pt taste option) is wired end to end: if the pt panel sets it, the tiles print it, the spec checks the prefix rule, and verify() compares the tiles against it.
