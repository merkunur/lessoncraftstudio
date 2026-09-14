# K-321 `days-and-months` : editor-critic record (2026-09-14)

Inputs: `_work/K-321-pedagogy.md` + `_work/K-321-design.md`; verified against `data/b2/calendar.js` + `calendar-frames.js`, `templates/components.js` + `components-b2.js`, `page/page.css`, `primitives/trace-path.js`, `types/g2/G2-277..312`, `topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `scripts/seo-landing/gen-b2var-landings.js LEVEL_KEYS`, `frontend/lib/seo/landing-content.ts coordKey`, the 11 `frontend/content/seo-landing/<loc>.json`. Widths re-measured by puppeteer with the shell's woff2 loaded from a `file://` origin (scratch `k321-critic-measure.js` / `.json` in the session scratchpad; control `Wednesday` Baloo 2 700 26: 135.1 woff2 vs 127.2 system fallback, 14 faces `loaded`). Output: `K-321-days-and-months.md`. No em-dashes.

## 1 Contradictions and resolutions

| # | pedagogy said | design said | ruling | why |
|---|---|---|---|---|
| 1 | base = number the scrambled days (K) | base = missing-days ladder + bank (K) | **number the days = base; the ladder = F1 (K, `gaps`)** | brief rule 4: the base owns the bare head; "missing days" is an added element and a natural face. Numbering is the pre-writer's K move (6 numerals, no whole-word writing) and its d2 stack has 164 px slack; the ladder is 722 exactly (measured, and 728 before the bank re-budget, item 9). Both files themselves contain both faces; only the base assignment differed. |
| 2 | months = number the 12 months (PARAM over base) | months = missing-months ladder 2 x 6 with badges (PARAM over the ladder) | **numbering (F3, PARAM over base)** | with the base now the numbering page, the same act on the year cycle is a pure PARAM face (`unit cols tileW boxPx namePx given` are base config keys); the ladder puts 24 name instances (12-pill bank + 7 printed + 5 lanes) on one page against the whitespace rule. Recorded as the alternate (OPEN 4). |
| 3 | F5 = month before/after (PARAM over yesterday/today/tomorrow) | F3 = which day comes next (3 pills, G1) | **month before/after (F4)**; pills dropped | the pills re-ask F2's tomorrow column as recognition, and their 40 px height sits under the K element floor and at the G1 floor with no reserve; the month neighbours add the Dec -> Jan wrap the panel credits ("which month comes after"). |
| 4 | F2 = weekday/weekend bin sort (K); abbreviation match held as the swap-in | weekday/weekend refused as thin; F5 = abbreviation match (G1) | **abbreviation match (F5)**; weekend sort out | the design's refusal stands on the numbers (7 lines into 5:2 bins, a two-way label as the whole content) and half its objection ("seven written names at K") was a misread of the pedagogy's line-draw d2, which I record; the abbreviation face is honest x11 by a measured data property (`dayAbbr` is a prefix of `dayNames` in 77/77 slots) and reads the header both `calendar` siblings print. The weekend sort also carries a per-locale label trap (de `Wochentage`, fi `arkipäivät`) with no gate but a word list. OPEN 3. |
| 5 | yesterday/today/tomorrow as 2 x 2 cards (label + box stacks, 8 blanks) | six `[lane][<][tile][>][lane]` rows with column heads (12 blanks) | **design rows** | measured buildability beats layout preference: pt `segunda-feira` at 22 = 139.6 fits the 161 tile (inner 145); the pedagogy's 214-box claim (208 *est.*) came from under-measured widths (item 6). 12 = the G1 cap. |
| 6 | mean 10.6 px/glyph Baloo 22; `segunda-feira` 128.3 at 22, `Wednesday` 107.6 | `segunda-feira` 152.3 at 24 / 165.0 at 26 | **design (re-measured identical)** | pedagogy widths are ~8 % low = the README font-fallback trap (its harness did not load the woff2 despite the claim). Every design width I re-measured matched to 0.1 px. |
| 7 | anchor = pre-numbered 1 in a NEW dashed coral `rankCircle` | dashed grey `answerBox` + a `numberStrip` legend; no anchor; no fixed point | **answerBox + a `given` tealSoft anchor cell; no strip at d2** | `answerBox` exists (`components.js:105`) and grey dashed is the written-numeral convention (G1-310 ruling); the anchor removes the "which day is first" ambiguity a K child cannot resolve from `weekStart`; the strip is redundant beside a printed 1 (kept at d1). The design's no-fixed-point + no-forward-run shuffle rules are kept and applied to the anchor tile too. |
| 8 | `.ws-bin` 260 x 220 | (face not used) | face dropped; **`.ws-bin` is `height:170px; max-width:260px`** (`page.css:234`, m) | recorded so the number does not resurface. |
| 9 | (no bank) | bank lane **100** (pills 38, gap 10, padding 8) | **98**: pills 36, gap 8, padding 7, border 4 | box-sizing is border-box (`page.css:8`): 8 + 38 + 10 + 38 + 8 + 4 = 106, so the design's 722 stack was 728. Re-budget: 98 + 16 + 608 = 722. |
| 10 | (n/a) | `.ws-blankbox` r 12 | **r 10** (`page.css:445`, m) | cosmetic; the file quotes the real rule. |
| 11 | (n/a) | F2 row 92 with the default `.ws-lane` padding | **inline `padding:10px 16px`** -> 68 + 20 + 4 = 92 | default padding 12 gives 96 (654 total, still fits); the file states the padding that yields 92. |
| 12 | (n/a) | `.ws-match-col` gap 10 -> 606 | **gap 12** (`page.css:362`, m) -> 618 + 12 padding = 630 | fits either way. |
| 13 | es weekStart "panel-ruled via `calendar-frames.js`" | es panel "may rule 0" | **es = 1 in NAMES and in the override (equal)**; every `calendar-frames.js` override equals `NAMES` (m) | both files' phrasing implied a live divergence; there is none. |
| 14 | G2-298 carries "days of the week" in 10 of 11; fr/sv/no do not | (not stated) | **10 of 11; only fr lacks it** (sv "veckans dagar", no "ukedagene" carry it, m) | the head split holds; the count was right, the exceptions were wrong. |
| 15 | `mode:'neighbors'` / `'months'` / `'months-neighbors'` | `'neighbours'` / `'next'` / `'order'` / `'abbrev'` | `base gaps neighbours months months-neighbours abbrev` | one spelling; never `null` (README ruling, `coordKey` verified at `landing-content.ts:215`). |
| 16 | F5 d1 "abbreviations that differ in the first letter" (design) | | **d1 = 5 pairs, at most two sharing an initial** | de and pt have only 4 distinct initials (m; brief rule 7: the pool must reach the bound). |

## 2 Claims removed as unverified or wrong

- Pedagogy: all Baloo/Nunito widths (fallback-font readings); `.ws-bin 260x220`; "fr/sv/no title G2-298 without the phrase"; the 2 x 2 card geometry and its 214/208 *est.*; the `rankCircle`, `nameLane` primitives (replaced by `answerBox`, `writingRow`, `nameTile`); the `weekday`/`weekend` labels and their validator rules (face dropped); `countBadge` badges on the months ladder (face replaced).
- Design: the 100 px bank lane (106 real); `.ws-blankbox` r 12; `.ws-match-col` gap 10; "`.ws-match` inner 710 (K-319 m)" (unverifiable as a width; `.ws-match` is 615 wide inner at `padding 6 30`, the 710 can only be a height budget = 722 - 12); the `nextRow`, `orderRow`, `railFlag`-as-public and `numberStrip`-at-d2 pieces (dropped or internal); "`pt` panel already overrode `dayAbbr`" (the override exists and equals `NAMES`).
- Both: nothing in either file cited `topics-taxonomy.json` `apps.calendar` wrongly; `{math, 7-9, calendar}` verified; `strand-names.ts:73-85` all 11 verified; `LEVEL_KEYS` verified; 0 slug collisions verified by node over every axis x locale.

## 3 Numbers re-measured (file:// fonts; Baloo 2 700 unless stated)

| item | pedagogy | design | measured | won |
|---|---|---|---|---|
| pt `segunda-feira` 22 / 24 / 26 | 128.3 / - / - | - / 152.3 / 165.0 | **139.6 / 152.3 / 165.0** | design |
| de `Donnerstag` 26 · en `Wednesday` 26 · fi `keskiviikko` 24 | 108.8@22 · 107.6@22 · 107.6@22 | 137.9 · 135.1 · 121.7 | **137.9 · 135.1 · 121.7** | design |
| es `septiembre` 20 / 24 | 103.5@22 | 103.2@20 | **103.2 / 123.8** | design |
| fr `aujourd'hui` Baloo 20 / 22 · Nunito 800 16 | 96 fits at Nunito 16 | 112.7@22 | **102.5 / 112.7 · 85.1** | design |
| fi `huomenna` 22 · es `fin de semana` 20 · abbr `dom` 26 | - | 105.5 · 125.9 · 51.9 | **105.5 · 125.9 · 51.9** | design |
| F1 bank totals at 20 (7 pills + 6 gaps of 10) | - | 733 sv .. 971 pt | **733.3 sv/da/no .. 971.2 pt**; widest pill pt 158.9 | design |
| bank lane height | - | 100 | **106 at the design's numbers; 98 after re-budget** | critic |
| `dayAbbr` prefix of `dayNames` | 77/77 | 77/77 | **77/77**; distinct initials en 5 de 4 fr 6 es 6 pt 4 it 6 nl 5 sv/da/no 6 fi 6 | both |
| `.ws-lane` inner (default / inline 8 12) | - | 639 / 647 | **639 / 647** (675 - padding - 4) | design |
| `apps.calendar` · `apps['days-and-months']` · axis key | math 7-9 · absent · absent | (same) | **verified** | both |

## 4 OPEN items

1. **`tools/gate-variation-distinct.js` reads the b2 wave + ROWS** (exists, m); a b3 ROWS list naming K-321 + the five faces is required before the gate can compare F3 (PARAM `unit:'months'`) and F4 (PARAM over F2) against their sources.
2. **`scripts/verify-hub-type-rows.js` is absent** (README open item 2); expected 66 rows for this key; write + poison-test before `apps['days-and-months']` lands.
3. **Weekday/weekend sort** is out. If the operator wants a classify face on this type, it re-enters as a K face with the label set `{weekday, weekend}` and the validator blocks de `Wochentage` / fi `arkipäivät` unless `confirmed:true`; `.ws-bin` is 170 high, so the pedagogy's 260 x 220 bins need an inline override. It would replace F5, not join it.
4. **Months as a missing-months ladder** (the design's F1) is the recorded alternate to F3 if a panel argues that numbering 12 months is too light for G1 in its locale; it is a PARAM over F1 (`unit:'months', rungs:12, gaps:5, cols:2`) and its geometry (bank 4 x 3 grid 142 + 12 + 472 = 626) was measured by the design and not disputed.
5. **pt `dayShort` and `laneGlyphH.neighbours:28`** are panel options; the F2 lane estimate for `segunda-feira` at glyphH 32 (~229 > 223) is *est.* until the engineer prints one pt F2 and writes the word by hand at the ruled height.
6. **F5 refusal knob `abbrev:null`** lowers the hub expectation for that locale; no locale is expected to use it, but the draft field must exist so refusal is data, not code.
7. **`components-b3.js` and `lib/b3-common.js` are absent**; `matchColumns` is owned by G1-307, `startArrow` by G1-308 (the vertical `railFlag` here is internal). Build order across the batch decides who lands the file first.
8. **Strand row** `Measurement & Data` follows the `calendar` family; sv/fi panels may note that Lgr22/OPS place "tid" elsewhere; a per-locale strand override is not in the type (prose note only).
9. The `3-gram Jaccard` non-cannibalisation figures are estimates; `scripts/seo-landing/gate.js` decides at landing time.

## 5 Quality verdict (a critical K/G1 teacher)

The base is exactly the page I hand out in the first week: one column, big names, a printed 1 to start from, and nothing to read but the days; the ladder with its word bank is the honest next step for children who can copy. Yesterday/today/tomorrow with the wrap, the months in order, and the month before/after are the four things I actually teach about time before any calendar grid; the abbreviations page is the one I would use only after the timetable goes up on the wall, and I would want the d1 with fewer pairs.
Nothing on any page prints its own answer, every locale gets the same geometry, and the only words the panel writes are five labels; that is what will keep eleven versions equally good.
