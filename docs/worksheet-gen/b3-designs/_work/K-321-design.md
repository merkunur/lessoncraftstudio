# K-321 `days-and-months` : design (Designer A + B, 2026-09-14)

(m) = measured 2026-09-14, puppeteer + the shell's woff2 (`assets/fonts/fonts.css` from a `file://` origin, `document.fonts` all `loaded`; scratch `k321-px.js` / `k321-px.json`). ⚠ Without the file origin the fonts silently fall back (Baloo 2 and Nunito then measure identically, ~6 % narrow): every width below is post-fix. Names from `data/b2/calendar.js NAMES` + `calendar-frames.js` overrides. *est.* = engineer measures. No em-dashes.

## 1 Page concept (base, K)

**"Days of the Week: write the missing days."** A vertical **week ladder**: seven rungs top to bottom in the locale's own order (`weekStart` 0 en/pt-BR, 1 the other nine; the es panel may rule 0 through the existing `calendar-frames.js` override, data only). Four rungs print a day name on a cream tile; three rungs are white dashed gap lanes with school lines where the child writes the name. A coral rail with a start flag at the top and an arrowhead at the bottom gives the direction. Above the ladder a **name bank** of all seven names in a shuffled order. No pictures (themeless: `themeAxis:{applicable:false}`, `coordinate.theme:''`), no numerals on the days page, nothing printed inside a gap.

Why a ladder and not the K-019 strip: a 7-tile row does not hold whole names at K size in ANY locale (m, Baloo 2 700 24 + 24 padding + 4 border): pt `segunda-feira` 152.3 -> tile 180 x 7 = 1,262; even sv `måndag` 86.8 -> 115 x 7 + 36 gaps = 841 > 639 (`.ws-lane` inner, m). A two-row snake (4 + 3) fails too: pt 4 x 180 + 24 = 745, de `Donnerstag` 127.3 -> 4 x 155 + 24 = 644 > 639. Whole names for a 5-year-old's pencil need ~300 px of lane (13 glyphs x ~0.55 x glyphH 40, est.), which only a full-width rung gives. So: one column, every rung 520 wide, identical in all 11 locales.

Boundary: G2-277..312 `calendar` owns the month GRID + dates; K-019..023 numeral strips; K-222 capital/small matching; K-320 ordinals.

## 2 Layout, d2, body 722 (page inner 675; `.ws-lane` padding 12 16 + border 2 -> inner 639, K-319 m)

```
y 0    .ws-lane 675x100 (inline padding 8 12 -> inner 647)  NAME BANK, shuffled, 2 rows
       [ Wednesday ][ Sunday ][ Friday ][ Monday ]            pills h 38, Baloo 2 700 20, gap 10
       [ Saturday ][ Tuesday ][ Thursday ]                    2 rows in all 11 (m: totals 733 sv .. 971 pt, all > 647, all < 1,294)
y 114  rail 24 | 12 | rung 520      (556 centred: margins 59/60)
  |>   [ Monday                         ]  cream tile 520x80, name Baloo 2 700 26 centred
  o    [ - - - - - - - - - - - - - - - -]  white, dashed coral 2.5, writingRow 500x70 glyphH 40
  o    [ Wednesday                      ]
  o    [ - - - - - - - - - - - - - - - -]
  o    [ Friday                         ]
  o    [ - - - - - - - - - - - - - - - -]
  v    [ Sunday                         ]  7 x 80 + 6 x 8 = 608; 100 + 14 + 608 = 722
```
- Rows `repeat(7, minmax(80px, 1fr))`: at 814 rungs grow to 93. Root `<div data-ws-content data-lcs-ladder="days" data-lcs-weekstart="1" data-lcs-seq="1,2,3,4,5,6,0">` (Sunday-first indices, locale-neutral).
- **Printed rung** = cream `#FBF3E4`, border 2 creamDeep, r 12; name ink Baloo 2 700 **26** (widest: pt 165.0, de 137.9, en 135.1, fi 131.8, m; inner 496). Verbatim from `dayNames`, never `displayWord`, never title-cased.
- **Gap rung** = white, `.ws-blankbox` dashed coral 2.5 r 12, holding `writingRow({w:500, h:70, glyphH:40, xHeight:true})` (the K-319 F5 h 72 / glyphH 40 precedent). Nothing printed inside.
- **Rail** = SVG 24 x 608: coral flag 10x14 at the top, 3 px coral line, 8 px head at the bottom; an inkSoft dot r 4 at each rung centre; `aria-hidden`, no `data-lcs-*`.
- **Bank** = `.ws-bankword` pills with inline `font-family:'Baloo 2'; font-weight:700; font-size:20px` (one letterform: the child copies from it), `data-lcs-bank-word`; cream lane, NOT `wordBank` (its `.ws-scene-banner` is dashed coral, the write signal). Widest pill pt 159 (m).

**d1** (2 gaps, name 28, glyphH 40, no adjacent gaps) and **d3** (4 gaps, adjacent allowed, name 26) keep the same 100 + 14 + 608 stack; only `gaps` / `adjacentGaps` / `namePx` change. The first rung is never a gap (the anchor; `number-strip.js:45` idiom). Word budget per level: d1 2, d2 3, d3 4 written names (K floor 4-8 items = 7 rungs).

## 3 Ladder (config keys; guards key on these, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| set / rungs | days / 7 | days / 7 | days / 7 |
| gaps / adjacentGaps / firstIsGap | 2 / false / false | 3 / false / false | 4 / true / false |
| namePx / glyphH / rungH | 28 / 40 / 80 | 26 / 40 / 80 | 26 / 40 / 80 |
| bank | true, shuffled | true, shuffled | true, shuffled |

d2 gap patterns from rungs 1..6: (1,3,5) (1,3,6) (1,4,6) (2,4,6); d1 10 pairs; d3 15 quadruples; variety = pattern x bank order. A bank-less d3 is a spelling test at K: refused.

## 4 Answer-hiding + uniqueness

The sequence is the truth: `data-lcs-seq` + `data-lcs-weekstart`; rung `data-lcs-idx="0..6" data-lcs-day="<0-6 Sunday-first>"`; printed rungs `data-lcs-name`; gap rungs `data-lcs-gap="1" data-lcs-answer="<name>"` (data, never rendered; the K-019 `answerbox` idiom). `verify(page)`: 7 rungs; `day[i] === (weekstart + i) % 7`; gaps === config; rung 0 printed; d1/d2 no two gaps adjacent; every gap rung has empty `textContent` and exactly one `writing-row`; the bank's 7 texts as a set === printed names ∪ gap answers; **bank order** !== sequence order, !== reversed, and **no bank neighbour pair (i, i+1) is a forward sequence pair** (a run of the week in the bank would hand the child the order); `.ws-blankbox` height >= 70; name >= 26 px; no `{` anywhere. Node gate (`page.evaluate` cannot require): every `data-lcs-name` / `data-lcs-answer` === `CALENDAR[loc].dayNames[day]` verbatim (poison: `Montag` -> `montag` FAILS; `segunda` for `segunda-feira` FAILS unless the pt bank declares `dayShort`). F3's distractors: both non-adjacent to the prompt (|Δ| mod 7 ∈ {2,3,4,5}) at d1/d2; F2's `today` values distinct per page; F5 right column a derangement of the left.

## 5 Reused vs NEW

**Reused (exact):** `.ws-lane` (`page.css:401`) · `.ws-blankbox` (`:445`) · `.ws-bankword` (`:417`) · `.ws-pill` (`:422`) · `.ws-match .ws-match-item(--plain) .ws-match-dot` (`:354-391`) · `answerBox` (`components.js:105`) · `numberStrip({values, chip})` (`components-b2.js:96`) · `countBadge(n)` (`:243`, 26 px) · `writingRow({w,h,glyphH,xHeight})` (`trace-path.js:681`) · `matchColumns({left:[{html,key}], right, itemH, colW})` (G1-307 §2, `components-b3.js` absent) · `CALENDAR[loc].{weekStart, dayNames, dayAbbr, monthNames}` · tokens `T.*`, `F.display`. **NOT used:** `calendar()` (= G2-277) · `wordBank` (dashed coral) · `wordTiles` (shadowed movable tile) · `chipRow` · `displayWord` · any picture · `image-vocabulary.js`.

**NEW in `templates/components-b3.js`** (HTML + inline SVG on tokens; scoped inline CSS, no `page.css` edit):
- `nameBank({names, px=20, w=647})` -> `.ws-lane` with `.ws-bankword` pills (Baloo 2 700 `px`, padding 6 14, h 38, gap 10, flex-wrap), `data-lcs-bank`.
- `nameLadder({items:[{idx, day|month, name, gap}], cols=1, rungW=520, rungH=80, namePx=26, glyphH=40, rail=true, badges=false})` -> grid `repeat(N/cols, minmax(rungH,1fr))`; printed rung cream tile; gap rung `.ws-blankbox` + `writingRow(rungW-20, rungH-10, glyphH)`; `rail` draws the flag/line/head SVG; `badges` prefixes `countBadge(n)` (F1). Stamps of §4.
- `railFlag({h})` (internal; the G1-308 `startArrow` turned vertical).
- `neighbourRow({yesterday:{name}|null, today:{name}, tomorrow:{name}|null, tileW=161, laneW=223, h=68, namePx=22, glyphH=32})` -> `.ws-lane` row `[writing lane][coral chevron <][cream tile][chevron >][writing lane]`, `data-lcs-today data-lcs-y data-lcs-t`; a `null` neighbour renders the lane, a `{name}` neighbour renders a tile (F2 d3 inverse).
- `nextRow({prompt, chips:[{name,key}], dir='next'|'before', promptW=176, chipPx=20})` -> line 1 `[cream tile][coral chevron 36, flipped for before][teal ring 44 with "?"]`, line 2 three `.ws-pill` h 40; `data-lcs-prompt data-lcs-dir data-lcs-answer`.
- `orderRow({name, w=360})` -> `[answerBox 60x60][12][cream tile w x 60]`, `data-lcs-day`.
- `abbrevPairs` = `matchColumns` with left `.ws-match-item--plain` 140x78 (abbr Baloo 2 700 26) and right cream 300x78 (name 24); nothing new beyond the call.

## 6 Locale slot structure (data + literals; the code substitutes, never inflects)

`data/b3/days-months.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`:
```
DAYS_MONTHS[loc] = {
  names: 'calendar',                       // read CALENDAR[loc] at render; never a copy
  dayShort: null | ['domingo','segunda', …], // pt panel option: classroom short forms; if set, the page prints
                                            // dayShort everywhere and the node gate checks against IT
  laneGlyphH: { days:40, months:32, neighbours:32 }, // pt may lower neighbours to 28 (13-glyph names in a 223 lane)
  neighbours: { yesterday:'gestern', today:'heute', tomorrow:'morgen' },  // bare labels; fi 'eilen/tänään/huomenna'
                                            // are nominative adverbs, legal as column heads; da/no 'i går/i dag/i morgen' two words
  abbrev: 'calendar',                       // dayAbbr; a panel may override the 7 (pt already did: seg ter qua qui sex sáb)
  strings: { 'K-321':{title,instruction}, F1..F5:{title,instruction} } }
```
- **Casing:** verbatim from `calendar.js`: en/de capitals (de nouns), the other nine lowercase; the bank, tiles and abbreviations all print the stored form; no `toUpperCase`, no title-case at a tile start.
- **weekStart:** from `CALENDAR[loc]` (0 en/pt, 1 others, m); the ladder, F2 wrap, F3 next/before and F4 numbering all rotate from it.
- **pt-BR:** `-feira` names are the widest data on the type (m: 152.3 at 24, 165.0 at 26; abbreviations `seg ter qua qui sex sáb` 43.9 at 22); every geometry above is sized to them, so `dayShort` is a taste decision, not a fit fix.
- **fi:** `keskiviikko` 121.7, `marraskuu` 116.5 at 24 (m): inside every tile; `huomenna` 105.5 at 22 in a 223 column head.
- **fr:** `aujourd'hui` 112.7 at 22 (m), the widest neighbour label; column heads are 223 wide.
- **Yesterday/today/tomorrow literals** exist nowhere in the repo (grep of `data/b2/*.js`, m): the panel authors the three; they are column heads, never sentence slots (no fi case, no de article).
- Titles: genre head + ONE distinguishing element (§7), <= 70, no worksheet-word. RTL: none.

## 7 Five variation faces (chosen: b, c, e, d, g; refused f)

Why: (b) months and (c) yesterday/today/tomorrow are the panel's gap queries in de/nl/es/pt/fr/it (`_PANEL-FINDINGS.md` 16); (e) is the reasoning rung; (d) is the pre-writer's sequencing move (numerals, not names); (g) is a NOTATION face feeding G2-277's header reading. **(f) weekday/weekend is refused:** bins at 5:2, seven written names at K (above the d3 budget), and a compound label (`fin de semana` 125.9 at 20, m) as its only distinguishing element; thin, not unbuildable. Coordinates: `mode:'base' | 'months' | 'neighbours' | 'next' | 'order' | 'abbrev'` (never `null`, README ruling).

### F1 : Months of the Year ladder (`set:'months'`, G1, PARAM over the set-aware base build)
`{...base.difficulty[2], set:'months', rungs:12, gaps:5, cols:2, namePx:24, glyphH:32, rungH:72, badges:true}`. Bank = **4 x 3 grid** of pills at 20 (cell (647 - 24)/4 = 155, widest es `septiembre` 103.2 + 24 = 127, m): 3 x 38 + 12 + 16 = **142**; a flex-wrap bank would run to 3 rows in fi at 18 and it at 20 (m), so the grid is fixed. Ladder 2 x 6 over the page inner 675: column 330 = `[countBadge 26][8][tile 296 x 72]`; `minmax(72px,1fr)` x 6 + 5 x 8 = 472; 142 + 12 + 472 = 626 <= 722 (rungs 88 at the floor). Badges 1..12 fix the reading order (down column 1, then 2); the month NUMBER is G1 content and leaks no name. Gap lane `writingRow(276, 62, 32)`; `septiembre` 10 glyphs x ~18 = 176 (est.). Adjacency = sequence index (June/July across columns count as adjacent). d1 3 gaps, d3 6 gaps adjacent. Verify: 12 rungs `month[i] === i`; January printed; badge text === i + 1; §4 bank rules over 12. Query face: "months of the year" / "Monate" / "meses del año" / "månader" / "kuukaudet".

### F2 : Yesterday, Today, Tomorrow (`layout:'neighbours'`, G1, CODE)
Header row: three labels Baloo 2 700 20 over the columns (yesterday / tomorrow inkSoft, today teal), h 30. Six `neighbourRow`s: `[lane 223 x 68][16 <][tile 161 x 68][16 >][lane 223 x 68]` = 639; row 92; `minmax(92px,1fr)` x 6 + 40 + 38 = **630 <= 722**. Today at 22 (pt 139.6 <= 145 inner, m); the child writes both neighbours (12 names, G1 budget). `today` = 6 distinct days; wrap allowed (Sunday -> Monday is the cycle). Config `{layout:'neighbours', rows:6, wrap:true, inverse:0}`; d1 4 rows, `wrap:false` (today from positions 1..5), lanes 80 / glyphH 36; d3 `inverse:2` (two rows print yesterday + tomorrow and blank today). Verify: `y === (t + 6) % 7`, `tm === (t + 1) % 7` from `data-lcs-today`; todays distinct; lanes empty; header texts non-empty, no `{`. Query face: "yesterday today tomorrow" / "gestern heute morgen" / "gisteren vandaag morgen" / "ayer hoy mañana" / "ontem hoje amanhã".

### F3 : Which Day Comes Next? (`layout:'next'`, G1, CODE)
Six `nextRow`s in `.ws-lane`s: line 1 `[tile 176 x 44, name 22][12][chevron 36][12][? ring 44]`; line 2 three `.ws-pill` h 40 at 20 (pt 126.9 + 48 = 175 x 3 + 24 = 549 <= 639, m); row 10 + 44 + 8 + 40 + 10 = 112; 6 x 112 + 40 = **712 <= 722**. Config `{layout:'next', rows:6, choices:3, dirs:['next'], adjacentDistractor:false}`; d1 4 rows / 2 chips; d3 `dirs:['next','before']` (2 flipped chevrons, `data-lcs-dir`) + `adjacentDistractor:true` (the previous day becomes the diagnostic decoy). Prompts distinct; the correct slot takes all three positions per page. Pills 40 < the K element floor 56: one reason this bands G1. Verify: answer === `(prompt ± 1) % 7` by `dir`; exactly one chip === answer; d2 both decoys non-adjacent; chips distinct; `?` is the only glyph beside names. Query face: "which day comes next" / "welcher Tag kommt danach" / "qué día sigue" / "vilken dag kommer sedan".

### F4 : Order the Days of the Week (`layout:'order'`, K, CODE)
Top `numberStrip({values:[1..7], chip:40})` (the answer FORMAT, not the mapping); gap 14; seven `orderRow`s `[answerBox 60 x 60 grey dashed][12][cream tile 360 x 60, name 26]` = 432 centred; rows `minmax(60px,1fr)` gap 14: 40 + 14 + 7 x 60 + 84 = 558 <= 722 (rows 83 at the floor, tiles stay 60, `align-items:center`). Shuffle until no tile sits at its own rank and no consecutive tiles are sequence neighbours; the child writes 1..7 (numeral floor 30 in a 60 box). Config `{layout:'order', tiles:7, strip:true}`; d1 5 tiles (Monday..Friday of the locale order, strip 1..5); d3 `strip:false`. Verify: `data-lcs-answer` on box i === rank of `data-lcs-day` from `weekstart`; ranks 1..N a permutation; no fixed point; no neighbour run. Query face: "order the days" / "Wochentage ordnen" / "ordena los días" / "ordne ugedagene".

### F5 : Days of the Week: Abbreviations (`layout:'abbrev'`, G1, CODE)
`matchColumns` 7 pairs: left `.ws-match-item--plain` 140 x 78 with `dayAbbr` at 26 (widest `dom` 51.9, m) in week order; right cream 300 x 78 full names at 24 (pt 152.3 <= 268) deranged; 7 x 78 + 6 x 10 = 606 <= 710 (`.ws-match` inner, K-319 m). Config `{layout:'abbrev', pairs:7}`; d1 5 pairs (abbreviations that differ in the first letter); d3 left column shuffled too. Verify: left texts === `dayAbbr` as a set, 7 distinct; right a permutation of `dayNames` with `right[i] !== left[i]`; `data-lcs-abbr` / `data-lcs-name` day ids match 1:1. Refusal is a data decision: a panel whose school uses no abbreviations sets `abbrev:null` -> no landing for that locale. Query face: "abbreviations" / "Abkürzungen" / "abreviaturas" / "afkortingen" / "förkortningar".

## 8 Two alternatives + recommendation

- **Alt A: 4 + 3 snake strip with an S-arrow.** Fits 9 locales, fails pt (745) and de (644 > 639, m), and squeezes K lanes to ~150 px. Rejected.
- **Alt B: week wheel (7 sectors, 480 px).** Honest about the cycle, but a sector is not a writing lane (curved school lines are unwritable at K) and a wheel has no first rung, so `weekStart` vanishes. Not a face.
- **Recommendation: the vertical ladder** (§2): one geometry for 11 locales, full-width lanes at glyphH 40, a direction rail, a bank to copy from; F1 reuses it at 2 columns.

## 9 Risks, mitigations, print check

- **Bank in week order leaks the sequence:** the §4 no-forward-neighbour rule (poison: a bank `Monday, Tuesday, …` must FAIL).
- **F2 wrap confuses d1:** d1 `wrap:false`; d2 keeps it.
- **pt `-feira` lanes:** est. 229 px for 13 glyphs at glyphH 32 in a 223 lane; `laneGlyphH.neighbours:28` is the pt data knob; the base's 500 lane needs nothing. Engineer prints one pt F2 + base and writes `segunda-feira` in HB at the ruled height.
- **F1 read row-wise:** badges 1..12; the sweep asserts every gap has a printed neighbour in its own column.
- **Measurement drift:** a harness without `p.goto(file://…)` under-reads Baloo 2 (pt 145.8 vs 155.2 on one word); do not trust it.
- **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid; no new hex; smallest text 20 vs the 9 px lint. Meaning never rides on colour: given = cream + solid, to-write = white + dashed, direction = flag/arrowheads.
- **Print check (mono laser + inkjet, one d2 per face):** dashed coral ~55 % grey, school lines ~25 %, cream ~5 %; a pencil name stays inside the dashed box; the flag reads at 1 m. Footer lint (`qa/lints.js:50-66`) backs the stacks: base 722, F1 626, F2 630, F3 712, F4 558, F5 606 + `.ws-match` padding.
- **Gates:** `tools/validate-b3-draft.js` (names verbatim vs `CALENDAR[loc]`; `dayShort` 7 distinct if set; `neighbours` three literals, no `{`; titles <= 70, unique in band) · `qa/verify-b3-days-and-months.js` (faces x 11 at d2 under 3-line chrome; `verify()` empty; lanes >= 62; 20-seed sweep: gap patterns not constant, F3 correct index takes 3 slots, F4 never a fixed point). Poison: P1 bank in week order · P2 gap on rung 0 · P3 F2 `tm === t` · P4 F3 decoy = previous day at d2 · P5 F5 `right[i] === left[i]` · P6 de `montag` · P7 the 760 stack under 3-line chrome · P8 F1 January blank.

## 10 Summary

1. Base = a 7-rung vertical week ladder (rung 520 x 80, names Baloo 2 700 26, gap lanes glyphH 40) + a shuffled 7-name bank: 100 + 14 + 608 = 722, one geometry in all 11 locales because a 7-tile row (pt 1,262 px) and a 4 + 3 snake (pt 745, de 644) both fail at K size.
2. Five faces: F1 months ladder 2 x 6 with badges (G1, PARAM), F2 yesterday/today/tomorrow rows (G1), F3 which comes next chips (G1), F4 order the days 1..7 (K), F5 abbreviation match (G1); weekday/weekend refused as thin.
3. Truth = `data-lcs-seq` + `weekstart`; gaps carry `data-lcs-answer` in data only; the bank may not contain a forward week pair; F3 decoys non-adjacent; F5 right column deranged.
4. Reused: `.ws-lane .ws-blankbox .ws-bankword .ws-pill`, `writingRow`, `answerBox`, `numberStrip`, `countBadge`, `matchColumns`, `CALENDAR[loc]`; NEW: `nameBank`, `nameLadder`, `neighbourRow`, `nextRow`, `orderRow`.
5. Per-locale data = only the three yesterday/today/tomorrow labels, an optional pt `dayShort`, an optional `laneGlyphH`, titles + instructions; names and abbreviations stay in `calendar.js`; expected hub rows 6 x 11 = 66, refusals data-declared.
