# G1-306 `syllable-reading` — BASE build record (2026-09-14)

Built from `G1-306-syllable-reading.md` §2 + §5 under `_BUILD-BRIEF.md` + `_SUBSTRATE.md` + the README cross-type rulings. EN only (shape R, rime families); the S and B branches are implemented in `build()` / `verify()` / the gate from the same bank shape, but only the EN block exists, so a non-EN locale REFUSES (`bank()` throws — measured with a `de` render: "has no de block … refuse, never fall back to en").

## Files (all type-scoped; nothing shared edited)

| file | what |
|---|---|
| `scripts/worksheet-gen/types/g1/G1-306-syllable-reading.js` | the spec: `themeAxis:{applicable:false}`, `unitAxis:{applicable:true, units, exemplar, tokens}`, the d1-d3 ladder, `build()` (bank + picture index only), `verify(page)` |
| `scripts/worksheet-gen/templates/components-b3/syllable-reading.js` | exactly the six NEW names of §2: `syllableRow · syllableCarpet · syllableLane · syllableJoin · colourRing · numberedBank` (namespace merge verified: no duplicate against letter-of-the-week / sound-boxes / syllable-split) |
| `scripts/worksheet-gen/data/b3/syllable-reading.js` | `SYLLABLE_READING.en` — 7 rime rows, 24 pictured words, 11 read-only cells (gitignored; force-add) |
| `scripts/worksheet-gen/qa/verify-b3-syllable-reading.js` | the gate (`--quick` skips the sweeps) |
| `scripts/worksheet-gen/out/dev/G1-306-*.png` | renders (below) |

## What was built (the page)

A white reading carpet (teal 2 frame r16, padding 12, rows gap 8): `carpetRows` rows of cells (`roundedRect r10`, white / tealSoft **checkerboard** across rows, teal 2 stroke, Baloo 2 700 ink), R cells drawn as onset `tspan` ink + rime `tspan` coral with a 1 px grid seam (shortened to the middle 56 % of the cell height — the full-height seam of the first render ran through the glyphs), a dashed coral read-tick `r14` per row (`data-lcs-readtick`, unfilled). Below, `cardGrid` cards: picture over `syllableLane` (writingRow x-height school lines in a dashed coral 2.5 r10 white frame; the R rime printed at `0.9·glyphH` coral, anchor end, on the baseline). Stamps: root `[data-ws-content][data-lcs-sr]` with the resolved config (`shape · structure · cards · carpet-rows · per-row-min · min/max-count · unit-id`), carpet `[data-lcs-carpet][data-ws-content]`, per row `data-lcs-row="can|fan|pan|van|swan" data-lcs-rime data-lcs-cells data-lcs-cell-w data-lcs-font`, per cell `g[data-lcs-cell][data-lcs-onset][data-lcs-rime][data-lcs-readonly?]`, per card stage `data-lcs-word · vocab · unit · rime · count · face · row-id`, lane `data-lcs-syllable-lane · printed · writable · glyph-h`.

**Ladder as built (resolved `difficulty`):**

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| carpetRows / cell / cellFont | 1 / 72 / 32 | 2 / 64 / 30 | 3 / 56 / 28 |
| cards / cols / rows / pic | 4 / 2 / 2 / 160 | 6 / 3 / 2 / 128 | 8 / 4 / 2 / 88 |
| lane w / h / glyphH | 200 / 72 / 36 | 151 / 60 / 30 | 126 / 56 / 26 |
| perRowMin / structure / S count | 2 / simple / 2-2 | 2 / simple / 2-3 | 2 / simple / 2-4 |
| poolMin (see deviation 3) | 5 | 8 | 8 |

Eligibility in `build()`, in the design order: (texPool / count / strict pool are BANK-time facts the gate enforces) → not banned → whitelist (strict pools) → pictured (`hasPicture`, plus an optional per-word `pictureTheme` pin) → the unit is a cell of ITS row by exact equality, once on the carpet → S count in bounds → `distinctByWord` → every row ≥ `perRowMin` → pool ≥ `poolMin` → read-only cells ≤ ⅓ of the carpet. Sample = `perRowMin` from every row, the rest from the remainder, card order shuffled, **row order never** (bank order; the 20-seed sweep asserts it). Every failure THROWS a refusal; nothing is filled.

## Measured (not assumed)

- **Baloo 2 700 glyph advances** measured in the real render pipeline at 100 px (`clock` 2.3641 em measured vs 2.3644 summed → no kerning): table `BALOO2_700_ADV` in the component; `textAdvance()` sizes cells and lanes at build time; the gate re-measures every rendered cell with `getComputedTextLength()` (rule 11). Real widths: `clock`/`swan` at 26 px = **61.5 px → cellW 74** (the design estimated 96); at 30 px `swan` = 70.8 px — the poison "30 px swan in a 64 cell" fires on exactly that number.
- **Carpet row widths:** R d2 = 5×74 + 4×8 + 40 + 2 = **444 px** (design 552, both ≤ 651); d1 = 5×79+… = 469; d3 = 444–454.
- **Lane writable width** (w − rime advance − 12): d2 `-ock` 151 − 43 − 12 = **96** (≥ 60); d3 `-and` 126 − 39 − 12 = 75.
- **Body / stack budget at the 722-px worst case:** measured with a 76-char, three-line title + 156-char two-line instruction (body 733): d1 card 301 / stack 244 · d2 268 / 200 · d3 243 / 156 — lints clean, footer clear at all three. With the real one/two-line chrome the body is 781–814 and the grid simply grows (cards ~280 at d2).
- **Floors (G1 44 / 26, MEASURED in the gate on every render):** picture 160/128/88, cell 79×72 / 74×64 / 74×56, lane 72/60/56, glyphH 36/30/26, cell font 28/26/26 (the design's "smallest text 26" holds).
- **Pool (node, `approved-words-en.json` ∩ texPool ∩ count 1 ∩ `/^\p{L}+$/u` ∩ colour picture ∩ consonant onset):** -an 5 (can fan pan van swan) · -at 3 (bat cat hat) · -ock 4 (clock lock rock sock) · -ug 4 (jug mug rug slug) · -og 3 (dog frog log) · -and 3 (hand sand wand) · -ed 2 (bed sled; `red` banned — below). The gate re-derives these sets from the approved file and diffs them against the bank (rule 10): an omitted or invented word fails.

**Feasibility matrix (unit × d; the gate prints it every run):**

| unit | d1 | d2 | d3 |
|---|---|---|---|
| **an** (exemplar) | ok pool 5 | **ok pool 8** (an+at) | ok pool 12 (an+at+ock) |
| at | refused (2 of 5 read-only) | refused (pool 7) | ok pool 11 |
| ock | refused (pool 4) | **ok pool 8** (ock+ug) | ok pool 11 |
| ug | refused (pool 4) | refused (pool 7) | ok pool 10 |
| og / and / ed | refused (read-only share / rows) | refused | refused |

= the design's own "en: two base pages" at d2 (`-an/-at` and `-ock/-ug`).

## Deviations from the design file (each with the reason)

1. **Rime order / exemplar id.** The design's exemplar reads "`-at` + `-an`"; the bank orders `an` first and the exemplar is `'an'`, because the carpet at difficulty d is the `d.carpetRows` consecutive rows from the unit and d1 shows ONE row: `-an` is the only rime with ≥ 4 pictured words (5), so any other first row cannot fill 4 cards. Same two rows at d2, opposite order (`-an` above `-at`).
2. **R "distinct units" = distinct words, not distinct onsets.** `cat` and `can` both answer `c`; the design's own count of 8 for `-at/-an` includes both, and the printed rime on each lane makes the two answers unambiguous. `data-lcs-unit` is the onset as designed; distinctness is asserted on (onset + rime) = the word.
3. **`poolMin` per difficulty (5 / 8 / 8) instead of a flat 8.** A single rime row can never reach 8 pictured words (max 5), so a flat 8 would refuse every R page at d1; 5 = cards + 1 keeps one word of slack. d2/d3 keep the design's 8.
4. **Cell font is per CARPET, not per cell** (30 when every cell ≤ 3 letters, else `max(26, cellFont − 4)`): mixed sizes in one row read as a mistake; all en carpets carry a 4–5-letter cell so they render at 26 (d1 28).
5. **The bank carries the eligible `words[]` per row** (`{key, word, unit}`), not only `cells`: the brief forbids `build()` reading `approved-words-*.json` at render, so the §5 `poolFor()`-at-render idea moved to bank time; the gate re-derives the sets from the approved file and diffs (rule 10). Optional per-word `pictureTheme` pin added (deviation 8).
6. **Read-only share ≤ ⅓ of the carpet is a BUILD refusal** (+ `verify` + a poison), taken from the critic's verdict ("must never be more than a third … or the child stops trusting it"). It is what refuses `-og/-and/-ed` pages (up to 7 of 15 cells unpictured).
7. **Carpet height** is 168 at d2 (design 160): the 2-px frame on both sides is inside the box the design omitted. Budgeted and measured (above).
8. **Opened pictures (every candidate of the 24 words was looked at, 49 files):** `kitchen tools/pan` is a lidded POT → pinned to `around the house/pan` (a frying pan); `around the house/rug` reads as a polka-dot frame → pinned to `furniture/rug` (a kilim); `colors/red` is a red DROP (reads as blood) → `ban:['red']`, so `-ed` holds 2 pictured words (bed, sled) and three read-only cells (`wed fed shed`). Everything else is the word.
9. **Sheet title carries no `{UNIT}` token** — the unit label (`-an`) is only true of the FIRST carpet row (d1 shows one row, d3 three), so a unit-tokened sheet title would be wrong at two of three difficulties; the landing title `{head}: {UNIT}` of §6 is the emitter's, later. `unitAxis.tokens` still resolves `{UNIT}` to the row label for that surface.
10. Title "Word Families: Read and Write" wraps to two lines ("Write" alone) in the ~375-px title column — legal per the README (three-line titles are budgeted), left as the design's genre head.

## Gate

```
node qa/verify-b3-syllable-reading.js
ALL CHECKS PASS (1185 assertions, 7 renders + 20-seed sweep, 16/16 poisons killed)
node qa/verify-b3-syllable-reading.js --quick
ALL CHECKS PASS (508 assertions, 3 renders, --quick, 16/16 poisons killed)
```

Instruments: real pipeline (`render/render-instance.js`), `verify()` empty, `qa/lints.js` clean (incl. the new visible-"free" lint), floors measured, rule 11 (widest cell advance ≤ cellW − 8, lane writable ≥ 60, both `getComputedTextLength` in the real font), row ≤ 651, no BW picture, the answer word in no text node outside the carpet, stamps diffed against the bank + the approved file, the 20-variant sweep (all clean; the union of words = the pool of 8; the row order never moved), every feasible (unit, d) rendered.

**Poisons killed (16/16; the correct bank is the control on every instrument):** unapproved word (`sebra`) · TeX-less word (`acorn`) · dropped `c|at` with `cat` fanned — data · the same cut out of the rendered carpet — `verify` "matches 0 cells" · `car` under `-ar` · B multigraph chunk (`boek` sch/oe) · da policy-managed word (`hund`) · wrong onset stamp on the render · the answer printed on its card · a 30 px `swan` forced into a 64 cell (advance 70.8 > 56) · a `zoo animals bw` picture · a 7-word unit must THROW, never fill · `pictureTheme` pin naming a dir without the word · a pictured read-only cell · a cell duplicated across rows · read-only cells over a third. Three of the §5 poisons could only reach `verify()` through an HTML rewrite because `build()`'s own eligibility filter refuses them first (noted per poison in the gate).

## Renders (looked at, every one)

`scripts/worksheet-gen/out/dev/`: `G1-306-null-d1-en.png` · `G1-306-null-d2-en.png` · `G1-306-null-d3-en.png` · `G1-306-null-d2-en-uock.png` (second unit) · gate renders `G1-306-gate-d{1,2,3}-en-uan.png`, `G1-306-gate-d3-en-uat.png`, `G1-306-gate-d{2,3}-en-uock.png`, `G1-306-gate-d3-en-uug.png`, `G1-306-gate-sweep-d2-en-uan.png`. Fixes made from looking: the seam shortened; the pot/rug/red picture rulings above.

## Other required lines

- `node i18n/build-en.js` → `build-en: 482 types -> … (title lint clean)`. ⚠ It REWRITES `i18n/strings.en.json` (it adds every spec missing from the committed file, incl. older b2-VAR types) and that rewrite alone makes 68 en build hashes drift in the baseline (the `strings.source` flips spec → en). I restored the committed `strings.en.json` after the lint passed; the reviewer regenerates it at commit time.
- `node tools/b3-baseline.js --check --quick` → **build section 0 drift** (2760 coordinates). The run reports 11 ENUM drifts `wave:wave-001..011` that are NOT this build's: the stored `out/b3-baseline.json` (09:43) predates commit `aa9b16b0`, which makes the harness skip the `types:"all"` waves — the pinned `wave-00N-divfix-{a,b}.json` files share `plan.id = wave-00N`, so the key is now written by them and no longer matches the snapshot (verified: neither divfix hash equals the stored one; my spec moved or removed changes the divfix enumeration by zero lines). With that expectation stated: `node tools/b3-baseline.js --check --quick --expect=<11 wave keys>` → `checked build 2760 + enum 200 in 15s: 11 drifted (11 expected), 0 missing` / **PASS**. The reviewer should `--capture` a fresh baseline after that commit.

## Open items for the faces / panels

- **Panels:** the EN source (title / instruction) is a SOURCE TO AUDIT; the `-an`-first row order and the `red` ban are EN data rulings the panels do not inherit; de `Ka` vs `ka` (design OPEN 8); sv/no/da head phrases (OPEN 9); da whitelist over the strict pool (OPEN 10).
- **Emitter:** `unitsPerType` / `unitOverrides` fan is wired (the spec's `units()` lists all 7 rows; the gate's matrix says which (unit, d) build — refused cells lower the hub expectation, never fill); landing title `{head}: {UNIT}` per §6.
- **Faces (Phase 2):** `syllableJoin`, `colourRing`, `numberedBank` exist and are unit-tested only by construction (no face renders them yet); the `structure:'complex'` branch reads `cfg.complexUnits` (throws when absent) — Face 5 needs the panel literals; `tools/gate-syllable-reading-data.js` rules 5–9 are face rules and remain to be written with the faces.
- **Picture library:** consider promoting `around the house/rug` and `kitchen tools/pan` (opened: not the word) to the shared `lib/b3-picture-index.js BLOCKED` set — not done here (shared file).
