# K-318 `sound-boxes` — FACES build record (Phase 2, 2026-09-14)

Built from `K-318-sound-boxes.md` §3 + §5 under `_FACE-BRIEF.md`, on the base of `_work/K-318-build.md`. EN only (the ten non-EN blocks are the panels'). Nothing shared was edited; nothing was committed. All five are **CODE faces** (one additive knob each on the base's `_buildWith` + a `verify()` branch); the base's own d1-d3 render byte-identically (baseline PASS below).

## Files

| file | change |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/sound-boxes.js` | NEW — the five rows (the only file the emitter reads); the three G1 rows carry `extra {gradeBand:'G1'}` (manifest `grade_band`) |
| `scripts/worksheet-gen/types/k/K-329-sound-boxes-count-the-sounds.js` · `K-330-sound-boxes-first-sound-given.js` · `types/g1/G1-312-sound-boxes-sound-strip.js` · `G1-313-sound-boxes-syllables-and-sounds.js` · `G1-314-sound-boxes-blend-the-sounds.js` | EMITTED (see the emitter note below) |
| `scripts/worksheet-gen/types/k/K-318-sound-boxes.js` | `faceOf(d)` · `pickCards` (the base sampling, extracted verbatim — same rng call order) · `_buildFace(face, …)` (count / starter / strip / tiers / blend) · `verify()` branches per face; the base branch is the shipped code |
| `scripts/worksheet-gen/templates/components-b3/sound-boxes.js` | `soundBoxes` gains `sylRows` + `interGap` (22): the gap AFTER the last box of each syllable widens, `data-lcs-sylboxes="3|2"` stamped, `spans:[{x,w}]` returned for the shared `syllableArcs`; default path unchanged |
| `scripts/worksheet-gen/lib/sound-boxes.js` (this family's own helper — no other spec requires it) | `eligible()` reads the face knobs on `d`: `d.strip` (fit with 0 wide boxes), `d.tiers` (syllables in `minSyl..maxSyl`, key ∈ `cfg.texBoundary`, the inter-syllable gap budgeted in the fit rule) |
| `scripts/worksheet-gen/data/b3/sound-boxes.js` | EN block gains `texBoundary` (24 keys: the rows the Tiers face may draw as a syllable boundary — multi-syllable ∧ `'TeX'` in `sources_agreed` ∧ not remerged); header documents it |
| `scripts/worksheet-gen/qa/verify-b3-sound-boxes.js` | A: `texBoundary` diffed against the gate's own derivation in both directions · B: every face's d2 pool per wave theme (< 8 = recorded REFUSED; a face with no theme = FAIL) · C: every face × every live theme + worst legal chrome + seed sweep + a refusal render · D: 21 face poisons (F1-F21) beside the base's 16; `--verbose` prints WHICH fault killed each poison |

## The five faces

### K-329 — Count the Sounds (K) · CODE `countMode:true`
- Row: `{...d2, countMode:true, minG:2, maxG:5, wantWide:0, dots:'never'}`.
- The child says the picture word, draws one dot per sound in the dashed lane (`soundLane` 230+2 × 56, no ticks), writes the numeral in the 56 × 56 answer box (`answerBox`, `data-lcs-answer` = sounds). No boxes, no dots, no digit visible. Stack 104 + 8 + 58 = 170 ≤ 191 (d2 stage under the worst chrome).
- Owns: verify `answer == chunks.length`, lane without tick/text, no `svg[data-lcs-soundboxes]`, no `hakdots`, no digit; poisons F1 answer ≠ sounds · F2 digit printed · F3 a tick in the lane · F21 knob undeclared (stamp "base").
- PNG: `scripts/worksheet-gen/out/dev/K-329-animals-d2-en.png` — read: six cards, picture over lane + small box, nothing clipped, the lane row 300 ≤ 302, footer clear.
- EN pools (2-5 sounds): animals 22 · house 42 · forest 24 · toys 19 · zoo 16 · farm 22 · vehicles 14 · clothing 20 → **8/8**.

### K-330 — First Sound Given (K) · CODE `starter:true`
- Row: `{...d2, starter:true, minG:4, maxG:5}`.
- Box 1 pre-printed with `displayWord(word).slice(0, chunks[0].length)` (Baloo 700 26 teal; de will show "Sch" — the capital is the stored literal, never inflected); the child writes the rest, wide box + tie arc as the base.
- Owns: verify exactly ONE printed box (index 0), its text == the stamp == the word's own first letters == `chunks[0]` case-folded, no other visible text; poisons F4 wrong first sound · F5 two printed boxes.
- PNG: `scripts/worksheet-gen/out/dev/K-330-animals-d2-en.png` — read: w/k/z/p/d/t printed in box 1, 4-5 boxes per card, two tie arcs (donkey `ey`, tiger `er`), nothing clipped.
- EN pools (4-5 sounds, ≤ 2 wide): animals 11 · house 27 · forest 13 · toys 13 · zoo 10 · **farm 6 REFUSED** · **vehicles 7 REFUSED** · clothing 15 → **6/8** (the design's ceiling said farm 10/11 and did not list vehicles; the EN bank measures 6 and 7).

### G1-312 — Sound Strip: How Many Sounds? (G1) · CODE `strip:6`
- Row: `{cards:6, cols:1, rows:6, pic:72, box:60, gap:10, strip:6, minG:3, maxG:6, maxWide:9, minWideCards:0, wantWide:0, dots:'never', band:'G1', poolFloor:8}` + `gradeBand:'G1'`.
- Six rows (picture 72 left, badge gap 20, gap 16), the SAME six uniform boxes (`uniform:6`; no wide box, no tie — a multigraph is written into ONE box); fill from the left, leave the rest empty. Count hidden.
- Owns: verify 6 rects, all `data-lcs-wide=0`, uniform widths, no tie/text, `chunks.length ≤ 6`; poisons F6 a wide box on the strip · F7 a strip of 5 · F8 a 7-sound word on the strip.
- PNG: `scripts/worksheet-gen/out/dev/G1-312-animals-d2-en.png` — read: six identical 6-box strips, pictures clear of the badge, ~20 % of each row empty on the right (was 31 % at box 48 — deviation 2).
- EN pools (3-6 sounds): animals 23 · house 48 · forest 23 · toys 19 · zoo 20 · farm 19 · vehicles 15 · clothing 23 → **8/8**.

### G1-313 — Syllables and Sounds (G1) · CODE `tiers:true`
- Row: `{cards:6, cols:1, rows:6, pic:72, box:44, gap:8, interGap:22, tiers:true, minSyl:2, maxSyl:3, minG:4, maxG:7, maxWide:3, minWideCards:0, wantWide:0, dots:'never', band:'G1', poolFloor:8}` + `gradeBand:'G1'`.
- Six rows; `syllableArcs` (G1-305's shared primitive, `mode:'printed'`, h 22) over box clusters grouped by the bank's syllable rows (intra gap 8, inter gap 22); stamps `data-lcs-syl="3|2"`, `data-lcs-sylboxes` on the svg. Stack 22 + 46 (+ 8 tie) = 76 ≤ 78.
- **Pool = `cfg.texBoundary` only** (README texPool rule — the arcs PRINT a boundary; the design's §3 did not apply the filter): TeX-agreed ∧ not remerged ∧ 2-3 syllables ∧ 4-7 sounds ∧ ≤ 3 wide.
- Owns: verify arcs == syllables == stamp, cluster sizes sum to the sounds, every box centre under exactly its own arc (measured in px), arcs above (not overlapping) the boxes; poisons F9 an arc removed · F10 arcs shifted off their boxes · F11 a rule-only key listed in `texBoundary` · F12 a TeX-agreed key omitted · F13 a remerged key listed · F14 a below-floor theme renders instead of refusing.
- PNG: `scripts/worksheet-gen/out/dev/G1-313-around the house-d2-en.png` — read: window / shampoo / closet / curtains / mailbox / toolbox, one scoop per syllable over its cluster, tie arcs under `ow`/`sh`/`oo`/`ur`/`ai`/`oo`, nothing clipped; the long-chrome render (`out/dev/k318-gate/G1-313-around the house-d2-en-longchrome.png`) still fits with a 3-line title + 3-line instruction.
- EN pools: **animals 4 · forest 1 · toys 2 · zoo 3 · farm 1 · vehicles 4 · clothing 3 — all REFUSED · around the house 10 → 1/8**. 24 of the 182 EN rows are arc-printable; 397/607 EN multi-syllable approvals are rule-only (README ruling 6) and 31 more re-seat a seam (`rabbit` r,a | bb,i,t is not rab-bit). The design's "house, animals 11/11" was a letter-count upper bound.

### G1-314 — Blend the Sounds (G1) · CODE `mode:'blend'`
- Row: `{cards:6, cols:1, rows:6, mode:'blend', choices:3, box:44, gap:8, pic:72, minG:3, maxG:5, maxWide:1, minWideCards:0, wantWide:1, dots:'never', band:'G1', poolFloor:8}` + `gradeBand:'G1'`.
- Six rows; the graphemes PRINTED in the boxes (`printed:true`, de will keep the capital in box 1 via `capitalBox1`), then three theme pictures (72, gap 12) — the child blends and circles the one. Distractors = any theme noun with a picture, distinct from every target and from each other: **all 18 pictures on the page are different nouns** (refuses a theme with < 18 nouns). The target's column is each of the three positions twice, shuffled (never a constant column). Stamps `data-lcs-target` on the row, `data-lcs-choice` on each picture.
- Owns: verify printed join == word (display case), exactly one matching picture, three distinct pictures per row, no picture repeated on the page, each grapheme inside its box, pictures ≥ 8 px from the boxes, aligned columns, not a constant answer column; poisons F15 no match · F16 two matches · F17 a printed non-target word · F18 the same picture twice on the page · F19 the answer always in column 1 · F20 ragged columns.
- PNG: `scripts/worksheet-gen/out/dev/G1-314-animals-d2-en.png` — read: donkey / bat / pig / panda / zebra / camel printed sound by sound (`ey` wide + tie), three pictures per row in aligned columns, answer positions 1,3,3,2,2,1, nothing clipped.
- EN pools (3-5 sounds, ≤ 1 wide): animals 16 · house 32 · forest 16 · toys 15 · zoo 14 · farm 11 · vehicles 12 · clothing 13 → **8/8** (every wave theme has ≥ 25 nouns for the distractors).

## Deviations from §3 (each measured in the real render)

1. **G1 rows: picture 80 → 72.** Under the worst legal chrome the body is 710 (base record), so a 1×6 grid gives cards of (710 − 5×14)/6 = 106.7 px and a row inner of 106.7 − 24 − 4 = **78.7 px** (the design's 115/87 assumed a 760 body). An 80 px picture does not fit; 72 leaves 6 px and clears the G1 floor 44 by a wide margin. Tiers stack re-budgeted to 76 (arcs 22 + box 44 + 2 + tie 8).
2. **Sound Strip box 48 / gap 8 → 60 / 10.** At 48 the strip ended at x = 438 of 647 — 209 px (31 %) of every row empty on the right (first render, looked at). At 60/10 the strip is 412 wide (62 tall ≤ 78), 15.9 mm — and this face is the one where a child writes TWO letters into ONE box, so the wider box is also the pedagogically right size. Still ~20 % empty on the right; the picture-left/apparatus-right reading order is kept.
3. **Syllables and Sounds draws only `texBoundary` keys** (README ruling 6 / texPool rule): the arcs print a boundary, so a rule-only or re-seated split may not be drawn. §3 did not apply the filter; in EN it leaves ONE wave theme (around the house, 10). The design's per-syllable verify (`rows[s].join == split[s]`) is satisfied by construction for these keys.
4. **Blend: the boxes sit in a fixed slot as wide as the widest legal row (276 = 4×44 + 66 + 4×8 + 2)** so the three pictures form aligned columns; the first render (boxes then pictures immediately) gave every row a different picture x. Pictures start at 20 + 276 + 24 = 320, end at 560 ≤ 647.
5. **Blend: every picture on the page distinct + balanced answer column** — §3 asked for "three distinct keys per row" and "six distinct targets"; a page where one picture is a target in row 1 and a distractor in row 4, or where the answer is always the middle picture, would pass that and still be a weaker sheet. Both are now build rules AND verify rules (F18, F19).
6. **Count lane `w:230` (svg 232)** so lane + 12 + 56 = 300 (the design's own sum; its `w:232` would make the svg 234 → 302 = the whole inner, 0 px of air).
7. **`wantWide:0` on Count and Strip; `dots:'never'` on every face; `poolFloor:8` + `band:'G1'` on the G1 faces** — explicit, because a spread of the base's d2 would otherwise carry `wantWide:1` (a preference for a box the face never draws) and `dots:'locale'` into rows that have no dot row.
8. **`interGap:22` is an explicit key** on the Tiers config (the design named 22 in the layout delta; the fit rule budgets it per syllable seam).
9. **The emitter (resolved).** Mid-session `node tools/gen-b3var-specs.js` refused to run because a sibling family's rows module (`tools/b3var-rows/feelings.js`) listed a HANDWRITTEN spec not yet on disk; the five specs were emitted meanwhile through the emitter's OWN `emit()` (extracted verbatim by a scratch runner, ids checked against the allocation). Once the sibling landed, the real emitter ran (`emitted 18 variation specs + 2 handwritten (20 faces from 4/20 families)`) and re-wrote the five files itself; the distinctness gate was re-run on that output.

## Per-locale refusals already visible from the bank shape (Phase 4 `hub-expectations.json`)

- **en**: Tiers ships for `around the house` only (7 wave themes refused: 4/1/2/3/1/4/3 arc-printable words); First Sound Given refuses `farm animals` (6) and `vehicles` (7). Count / Strip / Blend: 8/8. → en expectation for this family = 1 base + 5 faces per theme, minus (7 Tiers cells + 2 Starter cells).
- **da** (strict pool `policy_managed` ABSENT, 402 words): the design's own K-face ceilings say only `animals` + `around the house` reach 8 — expect the same two themes for Count and First Sound Given, and fewer for Tiers (2-syllable words 2-4 per theme in sv/da/no per §1: `farm animals` refused for Tiers in all three).
- **de / nl / sv / no** (chunk-table locales): Tiers depends on the panel's `mergeDoubles` / `remergeAcrossSyllable` rulings — sv/no doubles as TWO graphemes (`katt` k,a,t,t) make many 1-syllable words 4-box, which does not touch Tiers (2-3 syllables) but does raise Strip/Starter counts; every locale's `texBoundary` must be generated by `apply-b3-locale.js` from `sources_agreed` (open item 2).
- **fr / en whitelist locales**: mute finals (`chat` = ch,a) keep words short — Count's `minG:2` admits them; Tiers needs 4+ sounds over 2-3 TeX-agreed syllables, so expect fr Tiers pools well below the design's ceiling too.
- **fi**: under the KÄTS default (`kissa` = 5 boxes, doubles as TWO boxes) the approved seam `kis-sa` falls BETWEEN the two `s` boxes, so Tiers works without a remerge; under the äänne alternative (`ss` one wide box) the box straddles the seam and the word needs `remergeAcrossSyllable` — which then drops it from `texBoundary` (a re-seated seam is not the approved boundary). The panel's per-word ruling decides the fi Tiers pool; it does not exist before that.

## Open items for the panels / tooling

1. Panels audit the EN SOURCE strings (not translate): `Count the Sounds` / "Say the picture word slowly. Draw one dot in the long box for every sound you hear. Then write how many sounds in the small box." · `First Sound Given` / "The first sound is written for you. Say the picture word slowly and write one sound in each empty box. A wide box holds two letters for one sound." · `Sound Strip: How Many Sounds?` / "Say the word slowly. Write one sound in each box, starting from the left. Leave the boxes you do not need empty." · `Syllables and Sounds` / "Clap the syllables of the picture word. Then say each syllable slowly and write one sound in each box under its arc." · `Blend the Sounds` / "Read the sounds in the boxes and blend them into a word. Circle the picture that matches the word." (128 / 146 / 112 / 116 / 98 chars; `build-en` title lint clean, 518 types.) The Strip title already wraps to 2 lines at 29 chars — a panel's longer head will take 3; the row budget was measured at 3+3 lines.
2. `tools/apply-b3-locale.js` must emit `texBoundary` per locale (multi-syllable ∧ `'TeX'` ∈ `sources_agreed` ∧ not in `remergeAcrossSyllable`) beside the pre-resolved `bank`; the gate re-derives it and fails either direction, so a hand-authored list cannot drift.
3. The shared `syllableArcs` bowl (∪) sits ABOVE the box clusters here (design §3) — it reads as a shallow scoop; if the reviewer prefers a rainbow (∩) over the boxes, that is a change to G1-305's `primitives/syllable-arcs.js` (one primitive for both families), not to this family.
4. `hub-expectations.json` (Phase 4): en `sound-boxes` = 6 rows (base + 5 faces) per locale in the rail, but per-theme cells drop as above.

## Renders (looked at, every one)

- `scripts/worksheet-gen/out/dev/K-329-animals-d2-en.png` · `K-330-animals-d2-en.png` · `G1-312-animals-d2-en.png` · `G1-313-around the house-d2-en.png` · `G1-314-animals-d2-en.png` (the five d2 en faces)
- gate sweep: `scripts/worksheet-gen/out/dev/k318-gate/` — incl. `G1-313-around the house-d2-en-longchrome.png` (the tightest stack: 3-line title + 3-line instruction, rows 106 px) and `G1-314-animals-d2-en-longchrome.png`; every face × every live wave theme + seeds 2-3 + one refusal render each.
- Fixed from looking: Strip sparseness (deviation 2); Blend ragged picture columns (deviation 4).

## Gate / distinctness / baseline

- `node qa/verify-b3-sound-boxes.js` (full): **`K-318 gate: 4976 assertions, 0 failures, poisons 37/37 killed → PASS`** (quick: 2817 assertions, 37/37). `--verbose` confirmed every poison is killed by ITS OWN fault (e.g. F8 → "8 sounds do not fit 6 boxes", F10 → "box 1 is not under arc 1", F20 → "pictures start at 348.0, row 1 at 308.0 (ragged columns)"), never by an unrelated one.
- `node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=sound-boxes` → `[b3:sound-boxes] compared 15 pairs over 5 faces against their bases + pairwise within family` / **`every variation differs from the deck its base publishes and from its siblings`**.
- `node tools/b3-baseline.js --check --quick` → **`checked build 2968 + enum 211 in 16s: 0 drifted (0 expected), 0 missing` / `PASS`** (the base's d1-d3 and every other spec byte-identical after the `_buildWith` / `eligible` / `soundBoxes` edits).
- `node i18n/build-en.js` → `518 types, title lint clean`; `i18n/strings.en.json` restored with `git checkout --`.
