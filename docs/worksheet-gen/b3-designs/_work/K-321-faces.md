# K-321 `days-and-months` — the FIVE variation faces (Phase 2, 2026-09-14)

Built from `K-321-days-and-months.md` §3 (+ §5 face poisons, §1/§4 for refusals) under `_FACE-BRIEF.md`, on the base substrate of `_work/K-321-build.md`. Ids from `_records/b3var-id-allocation.json`. Nothing shared was edited (`git status`: only the family's files + the five emitted specs); nothing committed. No em-dashes.

## Files (all family-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/days-and-months.js` | NEW — the 5 rows (K-337, G1-319, G1-320, G1-321, G1-322); `HANDWRITTEN = []`; the only file the emitter reads |
| `scripts/worksheet-gen/types/k/K-321-days-and-months.js` | the additive `layout` knob: `_buildWith` dispatches to `_buildFace` ONLY when the resolved config carries `layout` (the base's three configs do not → the base path is byte-identical, baseline PASS); `_buildGaps / _buildNeighbours / _buildAbbrev` (+ `_texts`, the pt `dayShort` guard shared with the base); `verify()` branches on the root stamp `data-lcs-layout` (a face root never carries `data-lcs-order`), and passes `dayAbbr` + the bank `labels` into the page beside the name tables. One base-branch fix folded in: the tile-width check now measures the TEXT with a `Range` against the tile's inner width (see gate note 4) |
| `scripts/worksheet-gen/templates/components-b3/days-and-months.js` | the base's 3 exports byte-untouched (output sha1 before/after identical, scratch `k321-comp-hash.js`); `nameTile` gains two ADDITIVE options (`pad`, a string `h`) read only by the faces; NEW `nameBank nameLadder railFlag neighbourHeads neighbourRow abbrevPairs` (+ private `chevron`, `writingLane`); namespace merge verified (no duplicate export) |
| `scripts/worksheet-gen/types/k/K-337-days-and-months-missing-days.js`, `types/g1/G1-319-…-yesterday-today-tomorrow.js`, `G1-320-…-months-in-order.js`, `G1-321-…-month-before-and-after.js`, `G1-322-…-abbreviations.js` | emitted by `node tools/gen-b3var-specs.js` |
| `scripts/worksheet-gen/data/b3/days-and-months.js` | EN bank: `strings['K-337' 'G1-319' 'G1-320' 'G1-321' 'G1-322']` (title/instruction per face, keyed by the FIXED face ids — the apply- slots); header documents which bank keys each face reads |
| `scripts/worksheet-gen/qa/verify-b3-days-and-months.js` | the gate grows: sections 5-8 (parity · face renders ×2 chromes incl. the measured 677 worst chrome + the pt control · face sweep · 12 face poisons); `validateBank` now requires the six string blocks |
| `docs/worksheet-gen/b3-designs/_work/K-321-faces.md` | this record |

## The five faces

### K-337 — Missing Days: Write the Week in Order — CODE `layout:'gaps'` (F1, K)
- **Row:** `{...base.d2, layout:'gaps', unit:'days', gaps:3, adjacentGaps:false, bank:true, namePx:26, glyphH:40, rungMin:72, rungMax:100}`.
- **Child:** PRODUCES the sequence: a 7-rung week ladder anchored on the locale's first day (rung 1 always printed), three gap rungs (never adjacent; the four patterns (2,4,6) (2,4,7) (2,5,7) (3,5,7) all occur over 20 seeds), copied from a shuffled 7-name bank above (order ≠ week order, ≠ reversed, no forward neighbour pair incl. the Saturday→Sunday wrap).
- **Layout (measured):** bank `.ws-lane` inline `padding:7px 12px` → inner 647, pills h 36 Baloo 2 700 20 padding 0 14 gap 8 → **2 rows in all 11 locales** (lane 98; pill totals 721 sv … 959 pt, widest pill pt `segunda-feira` 159), gap 16, ladder `[rail 24][12][rung 520]` = 556 centred, rows `minmax(72px,100px)` — the rungs FILL their rows: **85 px under the en chrome (body 766), 73 at the 677 floor**. Printed rung = `nameTile` 520 × 100 % at 26 (widest pt `quarta-feira` 143 ≤ 496); gap rung = `.ws-blankbox` holding `writingRow(500 × 66, glyphH 40, xHeight)` — nothing printed. Rail = an absolute overlay (coral pennant SVG at the top, a 3 px coral line, a coral head at the bottom) + an inkSoft 8 px dot in each rung's rail cell. Root `padding-bottom:6px` so the last rung clears the attribution rule at the floor (lowest ink 915 vs foot 921).
- **Stamps:** root `data-lcs-layout="gaps" data-lcs-unit data-lcs-weekstart data-lcs-n data-lcs-gaps data-lcs-adjacent`; rungs `data-lcs-rung="i" data-lcs-day` + `data-lcs-gap="1" data-lcs-answer="<day>"` or `data-lcs-printed="1"`; bank `data-lcs-bank`, pills `data-lcs-bank-word="<day>"`.
- **verify():** 7 rungs, `day[i] === (weekStart+i)%7`, rung 1 printed, gap count = stamp, adjacency per stamp, every gap `textContent` empty with exactly one `[data-lcs-prim="writing-row"]` and a blank box ≥ 70, printed text verbatim and inside the rung, bank set === printed ∪ gap answers, the three bank order rules, bank ≤ 2 rows, no `<img>`, no `{`, no numeral.
- **Poisons owned:** P1 (rung 1 blank), P4a/b/c (bank in week order / reversed / `Sunday, Monday` adjacent), P19 (two adjacent gaps).
- **PNG:** `scripts/worksheet-gen/out/dev/K-337-null-d2-en.png` (gate: `K-337-gate-d2-en.png`, `K-337-gate-d2-en-worstchrome.png`). Read: bank Tuesday/Sunday/Friday/Monday/Thursday · Wednesday/Saturday in 2 rows; ladder Sunday · gap · Tuesday · Wednesday · gap · Friday · gap with the pennant, rail and head; no clipping; the last rung clears the footer rule at both chromes.

### G1-319 — Yesterday, Today, Tomorrow — CODE `layout:'neighbours'` (F2, G1)
- **Row:** `{...base.d2, layout:'neighbours', unit:'days', rows:6, wrap:true, inverse:0, glyphH:32}` + `{gradeBand:'G1'}`.
- **Child:** reads the given day in the middle and writes its two NEIGHBOURS mod 7 (the Sunday↔Monday / Saturday↔Sunday wrap is forced onto the page: `wrap:true` → ≥ 1 given at rank 1 or 7; 6 distinct givens; 12 written names = the G1 cap).
- **Layout (measured):** heads row 30 (Baloo 2 700 20; yesterday/tomorrow inkSoft, today teal; the same 639 inner geometry as the rows, `padding:0 18px`), 6 × `.ws-lane` inline `padding:10px 16px` (inner 639): `[writing lane 223 × 68][16 coral chevron][nameTile 161 × 68 at 22, pad 6 → inner 145][chevron][lane]`; grid rows `minmax(92px,110px)` + `align-content:center` → rows 110 under en chrome (lowest 867), **99 at the 677 floor** (lowest 900); root `padding-bottom:6px`. Lane = `.ws-blankbox` holding `writingRow(203 × 60, glyphH)`; glyphH = the bank's `laneGlyphH.neighbours` when set (pt 28), else the config's 32.
- **Widths (measured in the real fonts):** day at 22 widest pt `segunda-feira` **139.6 ≤ 145**; every locale's 7 days at 22 measured in the gate (77/77 ≤ 145); the pt control renders `quarta-feira/segunda-feira/domingo/terça-feira/sexta-feira/quinta-feira` clean.
- **verify():** rows = stamp, todays distinct, tile text verbatim + inside its inner width, lanes `left`/`right` with `data-lcs-answer` = `(t±1) mod 7`, lanes empty with one writing row each, wrap row present when `data-lcs-wrap="1"` (absent when 0), heads === the locale's `labels` verbatim, no numeral, no `{`. `inverse` rows (d3 of the design: both neighbours printed, the middle blank) are built and verified but no row ships them (the emitter ships one config).
- **Poisons owned:** P6 (the wrap row's wrapping neighbour answering the given day itself), P20 (head `Today` ≠ the bank literal `today`), P10 (pt at 24 → the gate's width floor + verify; pt at 22 is the control).
- **PNG:** `out/dev/G1-319-null-d2-en.png` (gate: `G1-319-gate-d2-en{,-worstchrome}.png`, `G1-319-gate-d2-pt-control.png`). Read: heads over the three columns; Wednesday/Monday/Sunday/Tuesday/Friday/Thursday given (Sunday = the rank-1 wrap row); chevrons point away from today; lanes empty.

### G1-320 — Months of the Year in Order — PARAM (F3, G1)
- **Row:** `{...base.d2, unit:'months', n:12, cols:2, tileW:240, boxPx:52, namePx:24, given:[1], rowMax:108}` + `{gradeBand:'G1'}` — the BASE path, no knob (the base build already reads `unit`; `n:12` is required by the base's `n === cycle` guard, which §3's row omitted).
- **Child:** the same numbering act on the 12-month cycle: January anchored 1 in the tealSoft cell, the child writes 2..12 (11 numerals, G1 [6,12]); shuffle rules (a)-(c) over the reading order (down column 1, then 2; 20/20 seeds clean).
- **Layout (measured):** 2 columns of `[52][12][240]` = 304, 2 × 304 + 24 = 632 ≤ 675; rows `minmax(52px,108px)` centred (the base's default cap boxPx + 40 = 92 left ~180 px of white above and below the block → raised to 108; the block is 718 under en chrome, 677 at the floor with rows 101). Month at 24 widest es `septiembre` 123.8 ≤ 216.
- **verify():** the base's (12 rows, a permutation, verbatim, the anchor "1" on January, answers {2..12}, rules (a)-(c), no numeral outside the given cell).
- **Poison owned:** P18 (the "1" cell moved off January → `anchor ≠ weekStart`).
- **PNG:** `out/dev/G1-320-null-d2-en.png` (gate: `G1-320-gate-d2-en{,-worstchrome}.png`). Read: 6 + 6, January = 1 in column 1 row 2, eleven dashed boxes, no month at its own rank.

### G1-321 — The Month Before and After — PARAM over F2 (F4, G1)
- **Row:** `{...F2 row, unit:'months', heads:'beforeAfter'}` + `{gradeBand:'G1'}` — the F2 row with the cycle swapped (`neighbourMonth` mod 12) and the heads `before` / (none) / `after` from the bank labels (the middle head is empty: §4's five labels carry no "this month").
- **Child:** writes the month before and after the given one; `wrap:true` forces January or December onto the page (only 2 of 12 qualify, so the composer redraws: ~77 % of draws pass, 20/20 seeds clean).
- **Layout:** identical to F2; month at 22 widest es `septiembre` 113.5 ≤ 145; lanes at glyphH = `laneGlyphH.months` (32).
- **verify():** the F2 branch with N = 12 and `heads === 'beforeAfter'` (left head = `labels.before`, mid `''`, right = `labels.after`).
- **Poison owned:** P7 (December's after-answer = December / January's before = January).
- **PNG:** `out/dev/G1-321-null-d2-en.png` (gate: `G1-321-gate-d2-en{,-worstchrome}.png`). Read: before / after heads, August/July/December/March/June/February given (December = the wrap row).

### G1-322 — Days of the Week: Abbreviations — CODE `layout:'abbrev'` (F5, G1)
- **Row:** `{...base.d2, layout:'abbrev', unit:'days', pairs:7, namePx:24, abbrPx:26, itemH:78}` + `{gradeBand:'G1'}` (`namePx:24` set explicitly — the base's d2 `namePx:26` rides along in the spread and the gate caught the names at 26).
- **Child:** DECODES the notation: 7 `dayAbbr` (Baloo 2 700 26) down the left in the locale's week order, the 7 full names (Baloo 2 700 24) down the right as a DERANGEMENT (`right[i] ≠ left[i]`, 20/20 seeds), a line per pair. Honest ×11 by data: `dayAbbr[i]` is a case-insensitive prefix of `dayNames[i]` in 77/77 slots (the base gate's rule 5); `abbrev:null` in a locale's bank REFUSES the build (no landing).
- **Layout (measured):** the house `.ws-match` (padding 6 30) + two `.ws-match-col` (gap 12): left `.ws-match-item--plain` 140 × 78, right cream `.ws-match-item` 300 × 78; 7 × 78 + 72 + 12 = 630; lowest 904 (en) / 912 (677 floor) vs foot 921; items ≥ 44 (78); 14 dots.
- **verify():** left texts === `dayAbbr` verbatim in week order, right a permutation of the 7 names verbatim, no `right[i] === left[i]`, pairs = stamp, 2 dots per pair, no numeral.
- **Poisons owned:** P11 (`Sun` beside `Sunday`), P21 (the left column out of week order), P17 (`abbrev:null` → refuse).
- **PNG:** `out/dev/G1-322-null-d2-en.png` (gate: `G1-322-gate-d2-en{,-worstchrome}.png`). Read: Sun..Sat down the left, Wednesday/Friday/Saturday/Thursday/Monday/Sunday/Tuesday down the right, no aligned pair, dots facing each other.

## Gate output
```
node scripts/worksheet-gen/qa/verify-b3-days-and-months.js
… (base sections 1-4 unchanged: d1/d2/d3 + long chrome + de control, 12 poisons)
parity: 5 faces, spec i18n.en === bank strings
render K-337 gaps: verify 0 lints 0 body 766 px lowest 915 vs foot 921 min element 85 rungs 85/85/85/85/85/85/85 gaps 2,5,7 bank rows 2
render K-337 gaps worst chrome: verify 0 lints 0 body 677 px lowest 915 vs foot 921 min element 73 rungs 73/… bank rows 2
render G1-319 neighbours: verify 0 lints 0 body 799 px lowest 867 vs foot 921 min element 68 rows 110/… givens 3,1,0,2,5,4
render G1-319 neighbours worst chrome: verify 0 lints 0 body 677 px lowest 900 vs foot 921 min element 68 rows 99/…
render G1-320 months: verify 0 lints 0 body 799 px lowest 853 vs foot 921 min element 52      (worst chrome: body 677, lowest 896)
render G1-321 monthsNeighbours: verify 0 lints 0 body 799 px lowest 867 … rows 110/… givens 7,6,11,2,5,1   (worst chrome: body 677, rows 99)
render G1-322 abbrev: verify 0 lints 0 body 778 px lowest 904 vs foot 921 min element 78 right 3,5,6,4,1,0,2   (worst chrome: body 677, lowest 912)
width day@22: widest pt "segunda-feira" 139.6 <= 145 (F2 today tile inner)
render G1-319 pt control: verify 0 lints 0 givens quarta-feira/segunda-feira/domingo/terça-feira/sexta-feira/quinta-feira
sweep faces: 100 builds clean, gap patterns {1,4,6 | 1,3,5 | 1,3,6 | 2,4,6}   (0-based = the design's (2,5,7) (2,4,6) (2,4,7) (3,5,7))
poison: P2a P2b P3a P3b P5a P5b P8 P9 P12 P13 P14 P15 · P1 P4a P4b P4c P19 P6 P7 P20 P10 (gate width floor + verify) P11 P21 P16 P17 P18 — all KILLED
PASS (1286 assertions, 24/24 poisons killed)          --quick: PASS (964 assertions, 24/24 poisons killed, --quick: sweep skipped)
```
`node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=days-and-months` → `[b3:days-and-months] compared 15 pairs over 5 faces against their bases + pairwise within family` / **`every variation differs from the deck its base publishes and from its siblings`**.
`node tools/b3-baseline.js --check --quick` → **`checked build 3068 + enum 211 in 19s: 0 drifted (0 expected), 0 missing` / `PASS`**.
`node i18n/build-en.js` → `build-en: 538 types … (title lint clean)`; `git checkout -- i18n/strings.en.json` restored the committed file.

## Gate notes (what the gate taught, each fixed in WHAT is measured)
1. **The worst legal chrome is 677 px, not the README's 722 nor the base record's 710.** Measured 2026-09-14 in this pipeline: a legal 68-char Finnish title (`Viikonpäivienlyhenteet yhdistettäväksi viikonpäivännimiin oikein nyt`) wraps to **4 lines**, and with a 150-char instruction that wraps to 3 the body is **677**. Every face is budgeted to it and the gate renders every face under it (asserting the 4 + 3 lines it produced).
2. **`lowest` must measure INK, not containers.** A flex root that fills the body reports bottom = foot top (921) and read as a footer collision in every full-height face; the measure now walks the apparatus pieces (tiles, boxes, pills, items, rail).
3. **A spread carries the base's values into a face that does not want them:** F5's names rendered at the base's `namePx 26`; the row sets 24 explicitly (the design's number). The same class is why F3's row carries `n:12`.
4. **`scrollWidth > clientWidth` is BLIND to a centred `inline-flex` overflow** (the text spills into negative x, which is not scrollable): **P10 was SILENT on both the gate's tile check and `verify()`** although the pt tile at 24 was 152 px in a 145-px inner. Both now measure the text with a `Range` against `clientWidth − padding`; P10 fires on both. The base branch of `verify()` and the base gate's `assertRender` carried the same blind check and were corrected the same way (no output change; the base gate still passes with 0 findings).
5. **A poison count is a claim too:** the first run reported 23/24 because I had declared 12 face poisons and written 11; the 12th (P21, the F5 left column out of week order) was added rather than the count lowered.

## Deviations from §3 (each with the measurement)
1. **F1 rungs are `minmax(72px,100px)` and FILL their rows, not a fixed 80.** §3 budgets 98 + 16 + 7 × 80 + 48 = 722; at the measured 677 floor that overflows by 22 px (the footer lint fires). With rungMin 72 (≥ K 56; the gap box stays ≥ 70 as §3 verifies) the stack is 666 ≤ 677, and under ordinary chrome the rungs grow to 85-91 — the design's 80 is met everywhere above 722. The gap's writing row is 66 × 500 (glyphH 40 unchanged, the K whole-word floor) inside the stretched box rather than §3's 70 × 500.
2. **F2/F4 rows `minmax(92px,110px)` centred, not `minmax(92px,1fr)`.** With `1fr` the six cream lanes stretched to 122 px under the en chrome with 30 px of empty cream inside each; the cap keeps the row at ≤ 110 and centres the block (the base record's deviation 2, same reason).
3. **F3's `rowMax:108`** (the base default 92 left the 6-row block floating in ~180 px of white); and `n:12` in the row (a base guard §3's row literal omitted).
4. **F5 prints the names at 24 by an explicit `namePx:24`** (deviation-free from §3 — the design says 24 — but the spread would have shipped 26; recorded because the emitted `D` object carries the base's `tileW/boxPx/…` too; the face reads only its own keys).
5. **F4's middle head is empty.** §3 names the heads `before` / `after` and §4's panel authors exactly five labels (`yesterday today tomorrow before after`): no locale has a "this month" literal, so the middle column head prints nothing (the given tile carries the meaning). `neighbourHeads` accepts `mid:''`.
6. **d1/d3 variants named in §3 are not shipped rows** (F1 `gaps:2 namePx:28` / `gaps:4 adjacentGaps:true`; F2 `rows:4 wrap:false` / `inverse:2`; F5 `pairs:5` / both columns shuffled): the emitter ships ONE config for all three levels. The knobs exist where cheap (`gaps`, `adjacentGaps`, `rows`, `wrap`, `inverse` are built and verified); `pairs` is guarded to 7 (a 5-pair page with "at most two pairs sharing an initial" is a different composition — not built), and there is no `shuffleLeft`.
7. **The K items rule [4,8] is not applied to F1's three whole-word copies** (the base applies it to written numerals); F1 guards `gaps ∈ 2..4` instead. Three copied names + a 7-word bank to read is the K load the design set.
8. **`abbrevPairs` returns the two columns** and the spec wraps them in the `.ws-match` root (so the face root carries the stamps) — §3's "G1-307's `matchColumns` call" does not exist as an export (opposites keeps the name free); the drawing is the house `.ws-match` chrome exactly as §3 measures it.
9. **Component names:** `neighbourHeads` (the header row §3 describes but does not name) added beside the four the design lists; `railFlag` returns `{top, line, head}` html parts rather than one SVG of a known height (the ladder's height is the grid's, unknown at build time; the line is a CSS span between two small SVGs).
10. **F1 bank order rule "incl. the wrap":** read as the week wrap (Saturday→Sunday counts as a forward pair via mod 7), applied between consecutive bank positions; the bank's last→first pair is not treated as adjacent (the pills are a wrapped row, not a ring).

## Per-locale refusals visible from the bank shape (Phase 4 `hub-expectations.json`)
- **None lowers a row.** Every face is a data-only rebuild over `calendar.js` names the base already clears; the five labels are panel literals in all 11; no picture is printed; `dayAbbr` is a name prefix in 77/77 slots, so F5 is honest everywhere unless a panel sets `abbrev:null` (est. 0). Expected rows stay **6 × 11 = 66**.
- **Width envelopes, measured in the real fonts (all 11 locales' names):** F1 rung at 26 ≤ 496 (widest day pt `segunda-feira` 165.0 — any day may be a printed rung; the per-locale scratch run's widest printed rung was `quarta-feira` 143 because `segunda-feira` fell in a gap on that seed); F1 bank at 20 → exactly 2 rows in all 11 (pill totals 721 sv … 959 pt; lane 98); F2 today at 22 ≤ 145 (pt 139.6, 5 px reserve, the gate asserts every locale); F4 given month at 22 ≤ 145 (es 113.5); F3 month at 24 ≤ 216 (es 123.8); F5 name at 24 ≤ 276 (pt 152.3). Head labels at 20 in the 223 lane: the §4 expected labels are ≤ 103 (fr `aujourd'hui`) — asserted per render once a panel authors them.
- **pt:** the F2 writing lane at glyphH 32 is tight for 13-glyph `segunda-feira` (§3's estimate 229 > 223); the bank knob `laneGlyphH.neighbours: 28` is wired (the gate's synthetic pt block sets it and renders clean) — the pt panel should set it. `dayShort` stays a taste option (if set, every face's tiles/pills/names print it and verify checks against it).
- **Authoring that REFUSES if missing** (not row losses): every locale block needs `labels` ×5 and `strings['K-321' 'K-337' 'G1-319' 'G1-320' 'G1-321' 'G1-322']`; an unauthored block throws on every face.

## Open items for the panels / Phase 4
- Every panel reads one d2 render per face in its own locale (F1 bank rows, F2 today tile) before sign-off; sv never «grupp»; fr NBSP before `?`/`:`; es/nl `mañana`/`morgen` as a column head reads as tomorrow (design §4).
- Registration (`apps['days-and-months']`, `axes['exercise-type']['days-and-months']` slug/name ×11, one landing per face per locale with `coordinate.mode` = `base | gaps | neighbours | months | months-neighbours | abbrev`, `hub-expectations` 66) is the batch's `register-b3-*` step, not this build.
- The reviewer may lift the calendar helpers off the spec into `lib/b3-common.js` (base record deviation 1) in a shared commit; the faces `require` the base spec as-is.
- `data/b3/days-and-months.js` is gitignored and already force-added (it shows as `M`); the five emitted specs + the rows module are untracked until the reviewer adds them.
