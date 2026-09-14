# K-322 `seasons` (K, F4 G1) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/K-322-pedagogy.md` + `_work/K-322-design.md`. Every file, primitive, class and option below was read in the repo; every pool picture named was OPENED at `cache/themes-512/<theme>/<noun>@3x.webp` (record: `_work/K-322-critic.md`; sheets `k322-sheet.png` / `k322-mono.png` / `k322-critic-sheet.png` read). (m) = re-measured 2026-09-14 by node or by puppeteer with the shell's woff2 from a `file://` origin (scratch `k322-critic-measure.js`; control `Wednesday` Baloo 2 700 26 = 135.1 vs 127.2 fallback). Where the role files disagreed on a number the measured figure won. *est.* = the engineer measures. No em-dashes.

**Boundary (load-bearing).** K-322 owns SEASON MARKERS: which season a picture, a set of pictures or a month belongs to, and the cyclic order of the four seasons. K-207 (`science-category-sort.js`, `data/science/summer-vs-winter-clothes.json`: 2 bins, 12 CLOTHING items, m) owns summer-vs-winter clothes; K-211 hot/cold; K-208 day/night; K-321 owns day and month NAMES and their order (its validator bans every season word); K-043 odd-one-out is identity-based (`odd-one-out.js:1-5`, m); K-323 owns favourites. No face here prints a clothes-only sort, a hot/cold or day/night bin, a scrambled month or a favourite; the 12 K-207 nouns never enter a neutral pool.

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-322` / `seasons` / base **K**; F1 F2 F3 F5 **K** (`K-325+ TBD by the emitter`); F4 **G1** (`G1-311+ TBD`). `default_subject: science` (README ruling; `apps['science-sort'] = {science, 5-7, science-sort}`, m), `default_age_range: '5-7'`, `assetClass: 'icon-placement'`, `exerciseType: 'seasons'`. `apps.seasons` + `axes['exercise-type'].seasons` ABSENT (m); register the `apps['science-sort']` shape + slug/name x11. The 11 slugs below grepped against EVERY axis slug in every locale: **0 collisions** (m). |
| theme axis | **OFF** `{applicable:false}`; landings `coordinate.theme:''`; `coordinate.mode` = the face string, base `'base'` (README ruling). Pools are cross-theme `(theme, noun)` refs resolved by `fileUri` (`image-cache/resolve.js:35`, m). `unitAxis` NOT applicable (a marker category is a pool filter, not a move). Fan lever = the seed. |
| taxonomy trap | `axes.theme` holds `winter / spring / summer / thanksgivinng / weather / tree` (de spring slug `fruhling`, m; NO `autumn` theme). The season NAMES are theme qualifiers on ~100 landings per locale (single-season word in a title: en 125, de 98, m). **The type head is the COLLECTIVE noun in every title; no title names one season** (validator rule 8). |
| CCSS / NGSS (en, honest) | no CCSS code; NGSS K-ESS2-1 is local weather, not a season sort. All six faces readiness: NO `educationalAlignment`; `teaches` = "The four seasons and their markers (readiness)", F4 "Months of the year and their seasons (readiness)". `strand-names.ts` has NO science row (m): the landing renders `l.strand` raw (the §22.1 readiness path). Non-EN names the framework, never "Common Core". |
| season model | `temperate-north` in 10 locales; **`temperate-south` in pt-BR** (Dec-Feb summer, Mar-May autumn, Jun-Aug winter, Sep-Nov spring; no snow): month tuple inverted + full pool override. MX keeps the temperate classic (SEP preescolar canon). A panel may VETO markers, never change the bin count. |
| name sources | `SEASONS[loc].names` are panel literals. Validate-time cross-checks: `autumn` vs vocab key `autumn` (the ONLY season key the vocab has, all 11, m); `winter` / `summer` vs `summer-vs-winter-clothes.json bins[].label.<loc>` (all 11, Capitalised, m; case-insensitive); `spring` has no repo source (panel only). |

| loc | genre head (panel §18) | ASCII slug | level K / G1 (`LEVEL_KEYS`, m) | strand literal (framework NAME, no code) | model / cycleStart |
|---|---|---|---|---|---|
| en | Four Seasons Sort | `four-seasons` | `kindergarten` / `grade-1` | Science: weather and seasons (readiness) | north / winter; prints Fall or Autumn (panel; OPEN 1) |
| de | Jahreszeiten | `jahreszeiten` | `vorschule` / `1-klasse` | Sachunterricht: Natur und Leben, Jahreszeiten | north / spring (Jahreszeitenuhr) |
| es (MX) | Las estaciones del año | `estaciones-del-ano` | `preescolar` / `primer-grado` | SEP/NEM Exploración y comprensión del mundo natural | north / winter |
| pt (BR) | As quatro estações do ano | `estacoes-do-ano` | `educacao-infantil` / `1o-ano` | BNCC EI "Espaços, tempos, quantidades, relações e transformações" | **south** / panel |
| fr | Les saisons | `les-saisons` | `maternelle` / `cp` | Explorer le monde (GS) / Questionner le monde: le temps (CP) | north / winter |
| it | Le stagioni | `le-stagioni` | `infanzia` / `classe-prima` | La conoscenza del mondo / Scienze: il tempo e le stagioni | north / winter |
| nl | Seizoenen | `seizoenen` | `kleuters` / `groep-3` | SLO Oriëntatie op jezelf en de wereld: natuur | north / winter |
| sv | Årstider | `arstider` | `forskola` / `ak-1` | Lgr22 NO: året runt i naturen [NSR] | north / winter |
| da | Årstider | `aarstider` (å -> aa, K-321 precedent; the theme axis folds `forår` -> `forar`, both collision-free, m) | `boernehaveklasse` / `1-klasse` | Fælles Mål natur/teknologi: årstider [NSR] | north / winter |
| no | Årstider | `arstider` | `1-trinn` / `2-trinn` | LK20 naturfag: årstider [NSR] | north / winter |
| fi | Vuodenajat | `vuodenajat` | `esikoulu` / `1-luokka` | OPS 2014 ympäristöoppi: vuodenajat [NSR] | north / winter |

**The four pools (locale-neutral; every noun opened; vocab in all 11 unless marked; K-207's 12 nouns excluded by validator rule; icons are SVG glyphs, so no icon noun can leak).** `weak:true` = mono-print or reading risk, d3 only.

| season | ACCEPTED markers (what the picture shows) | vetoes (panel confirms per locale) |
|---|---|---|
| winter (8) | `winter/snowman` (top hat, scarf, mittens) · `sled` (wooden sledge) · `sledding` (child on a sledge) · `skiing` (child on skis) · `skating` (girl on ice skates) · `snowboarding` (child on a board) · `icicle` (pale; weak) · `ice` (frozen pond with slabs; weak) | all are snow markers: **pt-BR replaces the whole pool** (§4) |
| spring (7) | `spring/tulip` · `bud` (red bud on a stem) · `chick` · `duckling` · `lamb` · `nest` (two red-combed hen-like birds in a nest: reads "birds nesting", accepted) · `birdhouse` (weak) | kite EXCLUDED (spring en/nl, autumn de, July holidays BR; opened: a diamond kite); robin EXCLUDED (a European robin: the WINTER bird in de/UK, the spring bird in the US) |
| summer (10) | `summer/sandcastle` · `popsicle` · `watermelon` · `swimming` (girl in water) · `beach` (umbrella, chairs, palm) · `flip-flops` · `pool` · `seashell` (scallop) · `surfboard` · `tent` | watermelon year-round in BR (panel); `ice_cream` `vocabKey:null` (m) excluded; `swimsuit` excluded: K-207's, and `summer/swimsuit` is an adult two-piece (opened) |
| autumn (8) | `thanksgivinng/acorn` · `tree/maple` (a whole red-orange tree; `vocabKey:null`, m; `alt` x11) · `thanksgivinng/harvest` (wheat sheaf) · `thanksgivinng/pumpkin` (never `vegetables/pumpkin`) · `thanksgivinng/apple` (basket of apples) · `vegetables/mushroom` (fly agaric) · `thanksgivinng/scarecrow` · `forest creatures/hedgehog` | pumpkin VETO pt; mushroom VETO es (rainy season), pt, en-US; scarecrow VETO pt (espantalho = festa junina, June); hedgehog VETO es, pt, en-US; `haystack` EXCLUDED (opened: a round hay pile; hay = June in Europe); `pie turkey cranberry corn` EXCLUDED (US Thanksgiving) |

Excluded everywhere (opened): `spring/umbrella rain raincoat puddle rainbow butterfly bee caterpillar leaf garden sun`, `winter/evergreen igloo hockey`, `tree/oak`, `campfire`, all `christmas/*`. 32 of 33 pooled refs have a vocab entry in all 11 (m); `tree/maple` does not; none is in `B2_EXCLUDE` (`lib/b2-common.js:35`, m).

## 2 The base page

**Concept.** "Four Seasons Sort", the SANDWICH (design wins: a closed sign takes lines from both sides, and the factory strip cannot hold 8 at K size). Four season SIGNS in a row across the middle: white cards, teal frame, a language-free SVG glyph over the season name. Four picture tiles above and four below, each with one coral dot on the edge facing the signs; the child draws one pencil line per picture from its dot to its sign. Nothing else is printed.

**Why glyph signs, not pictures (adopted).** `seasonIcon` is token SVG: a glyph cannot be a sortable item (the leak is structurally impossible), it passes the palette lint, and in greyscale the picture `winter/snowflake` and `weather/sun` both blur into pale radial marks at 88 px (`k322-mono.png`, read). The glyphs' own mono legibility at 40 / 56 px is **UNKNOWN until rendered**: the engineer renders all four greyscale for the critic before the first wave. Picture icons stay a data knob (`SEASONS[loc].icons`, Alt C): swap `seasonIcon` for a 40 px `.ws-icon`; the validator then reserves the four nouns.

**Chrome budget (README ruling).** Body **722** with a 3-line title + 3-line instruction, 814 one-line. `.ws-page` `padding 0 14` -> inner **675** (`page.css:16-26`, m). Fixed stack 384; the two line zones absorb the slack.

**Layout d2**
```
y 0     [tile 112]      [tile 112]      [tile 112]      [tile 112]     top row, dot on the BOTTOM edge
                o               o               o               o
y 112   ................ line zone 169 (215 at 814) ...............
y 281   +--------+  25  +--------+  25  +--------+  25  +--------+
        |   *    |      |   *    |      |   *    |      |   *    |    seasonBin 150 x 160, solid teal 3, r 16
        | Winter |      |Frühling|      | Sommer |      | Herbst |    glyph 40 + 6 + name Baloo 2 700 22 (line 28), centred
        +--------+      +--------+      +--------+      +--------+
y 441   ................ line zone 169 ..............................
                o               o               o               o
y 610   [tile 112]      [tile 112]      [tile 112]      [tile 112]     bottom row, dot on the TOP edge
y 722
```
- Bins at x 0 / 175 / 350 / 525 (4 x 150 + 3 x 25 = 675). Tiles centred on the bin centres (75 / 250 / 425 / 600): a row = 4 x 112, gaps 63, `margin 0 19px`.
- `markerTile` 112 x 112: cream, border 2 creamDeep, r 14; `.ws-icon` 88 centred, NO rotation; coral dot 12 with a 2 px white ring (the `.sci-dot` idiom, `science-category-sort.js:30`, m) on the bin-facing edge. Stamps `data-lcs-item="<theme>/<noun>"` `data-lcs-season`.
- `seasonBin` 150 x 160: `T.white`, border 3 `T.teal`, r 16, NO dashed open top (a bucket opening upward makes the lower row's lines arrive at its base): `seasonIcon({px:40})` + 6 + name `T.teal` nowrap, 43 px free above and below; coral dot 12 at the top-edge and bottom-edge centres; `data-lcs-bin`. **Widths at Baloo 2 700 22 (m):** `printemps` **102.3**, `primavera` 101.4, `automne` 88.6, `Frühling` 82.4, `sommar` 81.0 <= inner 128 (150 - 6 - 16 padding); at 18 the widest is 83.7.
- **K floors (ruling).** The bin name is a printed LABEL, so `density.K.fontLabel` 18 applies (`_tokens.js:68`, m); `fontChoice` 30 is the floor for an answer numeral the child reads or writes and there is none on this page. 22 >= 18. Icons 88 >= `minElement` 56; tiles 112 >= 56; 8 items = the K ceiling `[4, 8]`.
- Stage `<div class="ws-seasonstage" data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;min-height:0">` = row, bins, row (`[data-ws-content]` is in the QA content selector, `qa/lints.js:32`, m; scoped CSS inline). Longest line: column 1 to bin 4, dx 525 x dy 169; lines cross lines, never a tile or a sign.

**Ladder** (config keys; guards key on these, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| perBin / items | 1 / 4 | 2 / 8 | 3 / 12 |
| rows top + bottom | 2 + 2 | 4 + 4 | 6 + 6 (tiles 84, icon 64 >= 56; 6 x 84 + 5 x 20 = 604; no column alignment) |
| tile / iconPx | 124 / 100 | 112 / 88 | 84 / 64 |
| maxAlignedPerRow | 1 | 1 | off |
| writeNames / binH | false / 160 | false / 160 | true / 190 (name -> `writingRow({w:126, h:52, glyphH:40, xHeight:true})`, `trace-path.js:681`, m; 84 + 190 + 84 = 358, zones 182) |

The pedagogy's d3 "third row of four" is dropped: it would sit in the lower row's line path (design wins).

**Composer.** `pool(loc, season)` = neutral minus `weak` (d1/d2) minus the locale's `veto`, or `override[season]` when present; sample-or-throw (`sampleEntries` pattern, `who:'K-322'`); refuse the face when any pool < `perBin`. Both rows `rng.shuffle` until (a) neither row is a rotation of `cycle`, (b) no row single-season, (c) <= `maxAlignedPerRow` tiles per row over their own sign, (d) no noun twice.

**Answer-hiding + uniqueness.** Truth = the pool table: each noun in exactly one pool. Tiles carry the season only in `data-lcs-season`; bins print glyph + name and are empty; all tiles cream. `verify(page)`: 4 `[data-lcs-bin]` = `cycle` in order; every item season in that set; each season receives exactly `perBin`; (a)-(d) re-derived from DOM order; icons >= 56; `img.complete && naturalWidth > 0`; no localized B&W marker in any `src` (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`). Node gate: every item's season === the bank pool of its `(theme, noun)`; no item noun ∈ K-207's 12.

**Reused (exact).** `cardGrid({cards, cols, rows, numbered})` (`card-grid.js:7`, m; stage inner 294, K-319 m) · `.ws-card .ws-card-badge .ws-card-stage .ws-lane .ws-icon` (`.ws-lane` `padding 12 16` -> inner 639, `page.css:401`, m) · `writingRow` · `answerBox` (`components.js:105`, F4 d3) · `svgRoot roundedRect circle line label el` (`_svg.js:116`, m; no path / ellipse helper: use `el`) · `fileUri` · tokens `T.teal T.tealSoft T.coral T.coralSoft T.creamDeep T.white T.ink T.grid`, `codeColors.codeBlue codeGreen codeYellow codeOrange` (`_tokens.js:32-43`, m), `F.display F.body` · `COLOR_WORDS[loc]` (`data/color-words.js`, 8 words x11, m) · `NAMES[loc].monthNames` (`data/b2/calendar.js`, read never copied) · G1-308 `drawBox({w,h})`. **NOT used:** `makeScienceCategorySort` (`itemPx = min(78, floor(648/n) - 12)` at `:75`: 8 items -> 69 px in 89 boxes = 796 > 675, wraps; 12 -> 42 < 56, m) · `.ws-bin` (dashed top, `max-width 260`, `page.css:234`, m) · `colorLegend` (`entries:[{key, word}]`, no icon slot, `components-b2.js:77`, m) · `codeList` · `pillChoice` · `iconRows` (rotation) · `matchColumns` · `image-vocabulary.js` at render.

**NEW in `templates/components-b3.js`** (scoped inline CSS): `seasonIcon({season, px=40, badge=false})` -> `svgRoot` viewBox 64, `aria-hidden`, `data-lcs-icon`, stroke `T.teal` round caps: **winter** six arms (32,32)->r 27 every 60°, 3.5, two 7-unit ticks per arm at r 17 ±55°, centre dot r 3 `T.coral` (mono: an open line-star) · **spring** five petal ellipses rx 8 ry 12 at r 12 from (32,24) every 72°, fill `T.coralSoft` stroke `T.coral` 2.5, centre r 6 `T.coral`, stem (32,36)-(32,60) 3.5, leaf ellipse rx 9 ry 5 at (23,50) rot -35 fill `T.tealSoft` (mono: a cluster on a stem) · **summer** disc r 13 fill `T.coral`, eight rays r 18->27 every 45°, 3.5 (mono: the only solid disc) · **autumn** five-lobe maple path, tips (32,6) (10,20) (54,20) (16,46) (48,46), notches r 14, base (32,50), fill `T.coralSoft` stroke 2, midrib + two veins, stem (32,50)-(32,62) 3.5 (mono: a pale lobed shape with dark veins) · `markerTile({theme, noun, key, px=88, tile=112, dot:'bottom'|'top'|'none'})` · `seasonBin({key, name, w=150, h=160, iconPx=40, namePx=22, writeLane=false})` · `seasonSortStage({top, bins, bottom})` · `markerRow({items, px=88, gap=12})` · `seasonChoiceRow({keys, px=56, tile=68, gap=6})` (the K-319 `faceTile` idiom, `data-lcs-choice`) · `oddRow({items, px, tile, gap})` · `seasonLegend({entries:[{key, name, color, colorWord}]})` · `monthTile({index, name, season, w=210, h=88, circle=44, mode:'circle'|'write'})` · `modelBank({keys, px=56, tile=100, gap=24})`. **NEW primitives:** `primitives/season-wheel.js seasonWheel({d=440, slots:[{key, given}]})` · `primitives/bare-tree.js bareTree({w=260, h=250})` (trunk 22 wide y 130-250 stroke 3 fill white, six tapering quadratic branches, ground line y 246 `T.grid` 1.5, `data-lcs-open`).

**Alternatives.** Alt A one 8-picture strip over four bottom bins (the factory silhouette): 64 px icons where 88 fit, a 400 px reach, the shape of K-207; rejected. Alt B `.ws-match` two columns: a ladder, no chart image; rejected. Alt C picture icons: fallback knob only.

**Risks -> mitigations.** Sandwich metaphor: solid sign, label centred, dots on both edges; the instruction says "from the dot to the box"; engineer prints one d2 mono and draws the 8 lines in HB. Alignment cue: `maxAlignedPerRow:1` from DOM order, 20-seed sweep. Palette: cream, creamDeep, white, teal, tealSoft, coral, coralSoft, ink, grid (+ 4 `codeColors` on F4 only); smallest text 16 >= the 9 px lint (`qa/lints.js:86`, m). Mono markers at 88 (`k322-mono.png`, read): all keep identity; `winter/ice` and `icicle` are the weakest (pale on white), hence `weak:true`.

## 3 Faces 2-6

All five are CODE faces (`layout` knob + a `verify()` branch; `data-lcs-layout` stamped only when declared; base byte-identical, `b3-baseline --check`). `tools/gate-variation-distinct.js` exists (m) and needs a b3 ROWS list (critic OPEN 6). F5 is OPEN-ENDED. Card stage inner 294 x 314 (2 x 2) / 294 x 191 (2 x 3) (m).

### F1 : Which Season Is It? (`layout:'which'`, K)
**Move:** INFER a season from a SET of markers (the reverse of the sort) and pick it among four. **Layout:** `cardGrid({cols:2, rows:2})`: `markerRow` 3 x 88 + 2 x 12 = 288 <= 294; + 16 + `seasonChoiceRow` 4 x 68 + 3 x 6 = 290 <= 294; stack 172 <= 314; badges 1-4; no text on cards. Choice row = the 4 glyph tiles in `cycle` order on EVERY card (one strip to learn); the correct position moves because **the 4 cards are the 4 seasons in random order** (the last card is elimination, accepted at K). **Config** `{layout:'which', cards:4, markers:3, choices:4, distinctSeasons:true}`; d1 `{markers:2, choices:2}` (winter / summer, markers 100); d3 `{cards:6, rows:3}` (stage 191: 78 + 12 + 68 = 158; two seasons repeat). **Verify:** the 3 markers share exactly one pool, distinct nouns; choice tiles = the 4 keys in `cycle` order; `data-lcs-answer` === that season; d2 answers a permutation of the 4; the pool has >= 3 items in the locale (else refused). **Query face:** "which season" / "welche Jahreszeit ist das" / "vilken årstid".

### F2 : Season Wheel: Seasons in Order (`layout:'wheel'`, K)
**Move:** SEQUENCE the cycle (de Jahreszeitenuhr, fr la roue des saisons, pt a roda das estações). **Layout:** `seasonWheel({d:440})`: ring stroke 4, radius 160, four slot circles d 110 ON the ring at N E S W; the given slot (`cycleStart` at N) = fill `T.tealSoft` stroke 3 + `seasonIcon` 56 + name Baloo 2 700 18; the three empty slots = `T.white`, dashed `T.coral` 2.5 (the `.ws-blankbox` idiom, `page.css:445`, m), nothing inside; four clockwise arc arrows on the ring (+18° to +72° per quadrant, head 10). Below, gap 24, `modelBank` of the three missing signs (100 x 96 tiles, glyph 56 + name 16, gap 24 = 348) scrambled. 440 + 24 + 96 = **560 <= 722**. **Act = COPY the sign glyph into each empty slot in cycle order** (graded by the slot key, never by likeness). The pedagogy's draw-a-line act was rejected on geometry and the argument holds (re-derived: bank tile centres x 96 / 220 / 344 at y 512 under a 440 wheel; the LEFT tile's line to the E slot passes 3 px from the S slot's centre, i.e. through it, the mirror holds for RIGHT to W; only the reversed order W S E is crossing-free, and the middle tile to E clears S by 8 px). **Config** `{layout:'wheel', given:1, tiles:3}`; d1 `{given:2}` (N + S); d3 `{givenIcon:false}` (the anchor shows its name only). **Verify:** `data-lcs-slot` clockwise = `cycle` rotated with `cycleStart` at N; exactly `given` filled; bank = the other keys, order != clockwise and != reversed; unique by construction. Same cycle in all 11 (pt-BR shifts months, not the order): **no refusal anywhere.** **Query face:** "season wheel" / "Jahreszeitenuhr" / "la roue des saisons".

### F3 : What Does Not Belong? (`layout:'odd'`, K)
**Move:** EXCLUDE by season (3 markers of one season + 1 intruder; concept-based, unlike K-043's identity rows). **Layout:** `grid-template-rows:repeat(4, minmax(140px,1fr)); gap:10px; flex:1 1 auto` (590 at the floor, rows 173 at 722); each row an `oddRow` `.ws-lane` (inline `padding:10px 16px`, inner 639): badge 26 + 12 + 4 `markerTile` 116 (icon 96, `dot:'none'`) + 3 x 24 = 574 <= 639; cross out the intruder. **Config** `{layout:'odd', rows:4, items:4}`; d1 `{items:3}` (icon 100); d3 `{rows:5, items:5}` (icon 72, tile 92, rows minmax 112). **Verify:** exactly one item's pool differs; the majority pool has >= 3 items in the locale (else the row is skipped; face refused below 4 rows); nouns distinct; odd index not constant; the 4 majorities are the 4 seasons at d2. **Query face:** "what does not belong" / "was passt nicht dazu" / "vad passar inte in".

### F4 : Months and Seasons: Colour the Season (`layout:'months'`, **G1**)
**Ownership (cross-file ruling):** K-322 owns the month -> season link; K-321 never prints a season and this face never scrambles or numbers a month: the 12 names come from `NAMES[loc].monthNames` in calendar order and the only question is the season. **Move:** MAP each month to its season with a colour code. **Layout:** `seasonLegend` (4 entries: glyph 32 + name Baloo 2 700 18 + swatch 22 r 5 (`codeColors`, stroke `T.ink` 1) + the colour WORD Nunito 800 17 (`COLOR_WORDS[loc]`; widest `arancione` 78.1, `keltainen` 74.5, m); `flex-wrap`, wraps to 2 lines x11, ~80 tall *est.*) + 14 + a 3 x 4 grid of `monthTile` **210 x 88** (name Baloo 2 700 22 left, `padding 0 16`, a **44 px** empty circle right, stroke `T.grid` 2; `data-lcs-month="<0-11>"` `data-lcs-season`), gap 22 x 12: 3 x 210 + 44 = 674 <= 675; 4 x 88 + 36 = 388; total ~482 <= 722. Widest month at 22 = es `septiembre` **113.5** (m; the pedagogy's "marraskuu 105 widest" was wrong: 106.8) + 44 + 32 + 12 = 201.5 <= 210 (the design's 200 was 1.5 px short). Circle 44 = the G1 `minElement` (the design's 36 was under the floor). Winter blue, spring green, summer yellow, autumn orange. A grid row is Jan-Mar, never one season (Dec-Feb straddles the wrap), so no row leaks. **Config** `{layout:'months', months:12, legend:'color'}`; d1 `{months:4}` (Jan Apr Jul Oct, tiles 300 x 120); d3 `{mode:'write'}` (`answerBox({w:120, h:40})`; the child writes the season). **Table:** `SEASONS[loc].monthSeason[12]` = north `[w w sp sp sp su su su au au au w]`, **pt-BR `[su su au au au w w w sp sp sp su]`**; a panel may only override the whole tuple. Nordic + fi keep the three-month school blocks; fi `kesäkuu` / `syyskuu` name their season (2 of 12; the point of the names, not a leak). **Greyscale:** the four `codeColors` are >= 12 % apart in lightness (`_tokens.js:37-39`, m) and the colour WORD sits beside every swatch, so a mono copy still reads "blau". **Verify:** every tile's season === the table; 3 months per season at d2; calendar order; legend = 4 distinct `codeColors` with their locale words. **Query face:** "months and seasons" / "Monate und Jahreszeiten" / "månader och årstider".

### F5 : Draw the Tree in Four Seasons (`layout:'tree'`, K, OPEN-ENDED)
**Move:** REPRESENT a season's markers on one constant object (de "Der Baum in den vier Jahreszeiten", fr "l'arbre au fil des saisons", sv "trädet under året"). **Layout:** `cardGrid({cols:2, rows:2})`, cards in `cycle` order: header `seasonIcon` 36 + name Baloo 2 700 20 (h 40) + 10 + `bareTree({w:260, h:250})` = 300 <= 314. No verify; one empty `[data-lcs-open]` per card is a lint. **Config** `{layout:'tree', figure:'tree'}`; d1 2 cards (summer / winter, tree 300); d3 `{caption:true}` adds `writingRow({w:260, h:52, glyphH:40})`, tree 200 (captions = whole panel literals). **Re-target knob:** `figure:'frame'` renders `drawBox({w:260, h:250})` instead of the tree: **pt-BR re-targets to "Desenhe o tempo em cada estação"** (a deciduous cycle is a temperate model; the pt panel decides re-target vs refusal, OPEN 7). **Query face:** "draw" + tree / "zeichnen" / "rita".

**Rejected non-moves.** Theme swap (the pools ARE the theme) · a marker category per page (pool filter; clothes = K-207) · "dress the season" (K-207) · "circle the winter things" (a one-bin base; ~100 theme-fanned landings per locale carry it, m) · favourite season (K-323) · trace / write the names (K-284 / G1-244) · season -> weather match (no autumn weather art) · a rainy/dry MX page · count the snowmen · d1/d3 relabelled.

## 4 Native rebuild plan x11

Words are the panel's literals (`SEASONS[loc].names`), cross-checked per §1. Pills and legend entries print the BARE noun; casing = the locale's chart convention; every sentence (instructions, F5 captions) is written out whole, so no season word is ever slotted into a frame. Every panel OPENS every marker it keeps or adds (`opened:true`, asserted): `tree/maple` (a tree, not a leaf), `spring/nest` (two combed birds), `fruits/persimmon` (reads orange / tomato at 88 px) prove the file name is not the picture. EN handed over as a SOURCE TO AUDIT.

| loc | names winter · spring · summer · autumn (pill casing) | model / re-target | panel authors | refusal | traps |
|---|---|---|---|---|---|
| en | Winter · Spring · Summer · **Fall** or Autumn (Capital; the other in `alt`) | north | 6 titles, strand, F5 captions, `tree/maple` alt; vetoes hedgehog + mushroom | none | vocab says "Autumn", US K charts say Fall (OPEN 1) |
| de | Winter · Frühling · Sommer · Herbst (Capital nouns) | north; `cycleStart:'spring'` (Jahreszeitenuhr) | as en; `Frühjahr` never | none | the head "Jahreszeiten" is already borrowed by two theme-fanned landings (OPEN 2) |
| es (MX) | invierno · primavera · verano · otoño (lower) | north, mild: temperate icons kept (SEP canon) | vetoes hedgehog, mushroom; scarecrow confirm | none | "estación" also = station: titles always say "estaciones del año" |
| pt (BR) | inverno · primavera · verão · outono (lower) | **south**: `monthSeason` inverted; **pool override**: winter = `winter/coat sweater boots fireplace` + `clothing/scarf beanie` (opened: a hooded puffer jacket, a Nordic sweater, snow boots, a brick fireplace, a scarf, a knit beanie; the coat / sweater / boots / scarf NOUNS are K-207's, a RECORDED exception with `reason`); autumn = `tree/maple` `fruits/persimmon` (caqui; weak) `thanksgivinng/apple harvest`; spring = the 6 neutral + `spring/butterfly bee`; summer = neutral (watermelon confirm) | the override with `reason` per pool; F5 `figure:'frame'` | F5 as a tree REFUSED (re-targeted, not padded) | `estacoes-do-ano`; a snowman never appears on a BR page (an override pool is exhaustive); a snowflake sign on a no-snow winter: the panel confirms or swaps via `SEASONS.pt.icons` |
| fr | hiver · printemps · été · automne (lower; articles only in sentences) | north | strand, captions with elision written out | none | never "fiche" in a title; `printemps` is the widest pill (102.3, m) |
| it | inverno · primavera · estate · autunno (lower) | north | as fr | none | never "scheda" in a title |
| nl | winter · lente · zomer · herfst (lower) | north | `lente` not `voorjaar` | none | no article on the page |
| sv | vinter · vår · sommar · höst (lower) | north; three-month blocks | strand [NSR] | none | `vår` = "our": no sentence starts with the bare season; `hösten` never on a pill; never «grupp» |
| da | vinter · forår · sommer · efterår (lower) | north | strand [NSR] | none | `efteråret` never on a pill; slug `aarstider` |
| no | vinter · vår · sommer · høst (lower, bokmål) | north | strand [NSR] | none | `vår` as sv; `høsten` never on a pill; slug `arstider` |
| fi | talvi · kevät · kesä · syksy (lower, nominative on pills) | north | every sentence in the right case (talvella / keväällä …) [NSR] | none | `kesäkuu` / `syyskuu` name their season on F4; frames are literal, never a nominative token |

## 5 Data + gates

`data/b3/seasons.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the `apply-b2-locale.js` / `validate-b2-draft.js` pattern, both exist, m; the b3 tools are absent; `data/` gitignored, `git add -f`):
```
SEASONS.neutral = {
  keys: ['winter','spring','summer','autumn'],
  icons: 'glyph',                                   // seasonIcon; a per-locale {theme,noun} x4 switches to Alt C
  pools: { winter:[{theme:'winter',noun:'snowman',opened:true}, …, {noun:'ice',weak:true}], spring:[…6, {noun:'birdhouse',weak:true}],
           summer:[…10], autumn:[{theme:'tree',noun:'maple',vocabKey:null,alt:{en:'a tree with red and orange leaves',…x11}}, …7] },
  monthSeasonNorth: ['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter'],
  k207: 'summer-vs-winter-clothes.json' }                                    // its 12 nouns, read at validate time
SEASONS[loc] = {
  names: { winter:'Winter', spring:'Frühling', summer:'Sommer', autumn:'Herbst' }, alt:{ autumn:'Autumn' | null },
  model: 'temperate-north' | 'temperate-south', cycleStart: 'winter'|'spring', cycle: [4 keys],
  monthSeason: [12 keys],                                                    // pt: the inverted tuple; else = north
  veto: [{theme:'forest creatures',noun:'hedgehog'}],                        // removes from the NEUTRAL pool, this locale only
  override: { winter:{items:[…], reason:'no snow in BR'} },                  // replaces a pool; may reuse k207 NOUNS only with a reason
  legend: { winter:'codeBlue', spring:'codeGreen', summer:'codeYellow', autumn:'codeOrange' },
  faces:  { tree:{figure:'tree'|'frame', captions:{winter:'…'} | null} },
  strings:{ 'K-322':{title,instruction}, F1..F5:{title,instruction} }, strand:'Sachunterricht: …' }
```
`pools`, `monthSeasonNorth`, `k207` are locale-neutral; a locale may only `veto` or `override`.

**`tools/validate-b3-draft.js` (seasons block; exit 1 on any):** (1) every pooled / overridden `(theme, noun)` resolves via `fileUri`; the theme dir is a pinned COLOUR dir with no localized B&W marker; `opened:true`; every pooled noun has a vocab entry in ALL 11 or a declared `alt` x11; noun ∉ `B2_EXCLUDE`. (2) each NOUN (not just `(theme, noun)`: `winter/coat` and `clothing/coat` are one noun, m) sits in EXACTLY ONE pool; neutral pools ∩ K-207's 12 nouns = ∅; an override may reuse a K-207 noun only with a `reason`. (3) after `veto` / `override`, `weak` removed, every pool >= 2 (base d2) and >= 3 (F1 / F3), else the face is REFUSED for that locale and recorded; the 4 `names` distinct, `/^[\p{L}' ]+$/u`, <= 12 glyphs, cross-checked per §1 unless `alt` declares the swap; rendered width at 22 <= 128 (`render/one.js`, file:// fonts). (4) `monthSeason` = 12 entries, each season exactly 3, contiguous cyclically; `'temperate-south'` REQUIRES the inverted tuple AND a winter `override`; `'temperate-north'` REQUIRES the north tuple. (5) `cycle` is a rotation of `[winter, spring, summer, autumn]`. (6) `legend` = 4 distinct `codeColors` names. (7) `faces.tree.figure` ∈ {tree, frame}; `captions` x4 when d3 `caption:true`. (8) titles <= 70, no worksheet-word, unique in band; **the base title contains the locale's COLLECTIVE season word and no title names a single season**; instructions <= 150, slot-free; no calendar stem (K-321 owns it).

**`qa/verify-b3-seasons.js`:** renders face x 11 at d2 under a 3-line title + a 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean; icons >= 88 base / F1, >= 96 F3, >= 56 choice tiles, F4 circle >= 44; 20-seed sweep: base rows never a `cycle` rotation and `maxAlignedPerRow` held, F1 answers a permutation, F3 odd index not constant, F2 bank never clockwise or reversed. **Poison** (each must FAIL; the correct draft is the control):
- **P1 (mandated) two right answers:** `winter/snowman` listed in `winter` AND `autumn` FAILS rule 2; control = one pool.
- **P2 (mandated) the K-207 boundary:** `winter/mittens` in the neutral winter pool FAILS; `clothing/coat` in a neutral pool FAILS; `winter/coat` in the pt override WITHOUT `reason` FAILS; with `reason` PASSES.
- **P3 (mandated) the pt-BR model:** `model:'temperate-south'` with the north `monthSeason` FAILS; with no winter `override` FAILS; a `pt` page rendering `winter/snowman` FAILS the node gate.
- P4 an autumn pool of 1 after vetoes (refusal, recorded) · P5 `{theme:'animals bw', noun:'owl'}` · P6 base top row `[winter, spring, summer, autumn]` · P7 F1 card with markers from two pools · P8 F3 row with two intruders · P9 `monthSeason` with 4 winter months · P10 de title "Winter zuordnen" (a single season) · P11 `tree/maple` without `alt` · P12 F2 bank clockwise · P13 a `printemps` pill at 28 (130.2 > 128, scaled from the 22 px measure) FAILS width · P14 F4 tile 200 with `septiembre` at 22 + circle 44 FAILS overflow · P15 the old 760 stack under 3-line chrome (footer lint) · P16 an instruction containing `Kalender`.

**Page reads:** `data/b3/seasons.js`, `data/b2/calendar.js NAMES` (F4), `data/color-words.js` (F4), `fileUri`; never `image-vocabulary.js`, `summer-vs-winter-clothes.json` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic) | meta MIDDLE (the child's instruction; whole 120-170) | coordinate |
|---|---|---|---|
| base | "Four Seasons Sort" · "Jahreszeiten zuordnen" / "Las estaciones del año: clasifica las imágenes" / "Sortera årstider" | Draw a line from the dot on each picture to the season box it belongs to | `{type:'seasons', mode:'base', theme:'', level:<K key>}` |
| F1 | "Which Season Is It?" · "Welche Jahreszeit ist das?" / "¿Qué estación del año es?" / "Vilken årstid är det?" | Look at the three pictures and circle the season sign they belong to | `mode:'which'`, K |
| F2 | "Season Wheel: Seasons in Order" · "Jahreszeitenuhr: Die Reihenfolge" / "La rueda de las estaciones" / "Årstidshjulet" | One season is on the wheel; draw the other three signs in their empty circles in the right order | `mode:'wheel'`, K |
| F3 | "Seasons: What Does Not Belong?" · "Jahreszeiten: Was passt nicht dazu?" / "Estaciones: ¿qué no pertenece?" / "Årstider: vad passar inte in?" | Cross out the one picture in each row that belongs to a different season | `mode:'odd'`, K |
| F4 (G1) | "Months and Seasons" · "Monate und Jahreszeiten" / "Los meses y las estaciones" / "Månader och årstider" | Colour the circle next to each month in the colour of its season | `mode:'months'`, `<G1 key>` |
| F5 | "Draw the Tree in Four Seasons" · "Der Baum in den vier Jahreszeiten" / "Dibuja el árbol en las cuatro estaciones" / "Rita trädet under året" | Draw what the tree looks like in each of the four seasons | `mode:'tree'`, K |

`coordinate.mode` is ALWAYS the face string (README ruling: `coordKey()` = `type|mode|theme`). Titles <= 70, no worksheet-word, no calendar stem, collective head only, unique per band. h1 = title; eyebrow = level label; strand = the §1 literal (raw `l.strand`); JSON-LD `LearningResource` with NO `educationalAlignment`; non-EN prose names the national framework. `topicMeta.seasons` (>= 50) + `skill-sentences.<loc>.json` via `tools/register-b3-en-content.js` (absent, m). Meta lead inherits `seo.words.free_printable` (README open item 1).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F1 | a line per picture to a box vs three pictures, circle one sign | 0.30 |
| base vs F3 · F1 vs F3 | sort into four vs cross out the intruder in a row | 0.30 · 0.25 |
| F2 vs any · F4 vs any · F5 vs any | a wheel and an order · months and a colour code · an open drawing | 0.15 · 0.15 · 0.10 |
| any vs K-207 summer-vs-winter clothes | `science-sort` has **0 landings in all 11 corpora** (m): no landing competitor; the deck boundary is structural (K-207 nouns excluded) | n/a |
| F4 vs K-321 `days-and-months` (F3 / F4) | 12 months in calendar order coloured by season vs scrambled months numbered or neighboured; K-321 prints no season word, F4 no scrambled month | 0.15 |
| any vs `calendar` G2 | no grid, no date | 0.05 |
| any vs the season THEME hubs (`/topic/winter|spring|summer|thanksgiving/` x11) + their ~100 theme-fanned landings per locale (m) | ONE season as a theme qualifier vs the collective noun + a move; no K-322 title names a season (rule 8) | 0.10 |
| any vs a future `weather` type (backlog) | no weather symbol is an ITEM here (the sun is a sign glyph; cloud / rain / thermometer excluded); a weather type owns the symbols and "today's weather" | 0.10 |

⚠ de already carries two landings that borrowed the head ("Jahreszeiten im Kindergarten – Winter-Suchbild" `find-objects`, "Jahreszeiten-Arbeitsblätter Grundschule – Frühling zuordnen" `matching`, m): the gate measures them against the base; above 0.65 the build session re-titles the OLD landing to its own genre (a §21.5a call, critic OPEN 2), never the new one.

Boundary sentence on every landing: "The child sorts, names or orders the four SEASONS by their markers; summer-and-winter CLOTHES, hot and cold, and the month names in order are their own worksheet types."

## 7 Hub visibility contract

A face appears under `seasons` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps.seasons` exists in `frontend/config/topics-taxonomy.json` (ABSENT, m; missing = rendered NOWHERE; `default_subject:'science'` puts it in the science disc beside `science-sort`); (2) `axes['exercise-type'].seasons` has `slug` + `name` in all 11 (§1 slugs, 0 collisions, m); (3) exactly one landing per face per locale with `coordinate.type === 'seasons'` verbatim, `mode` per §6, `theme:''`, the level key of §1 (K for base F1 F2 F3 F5, G1 for F4), a unique slug, `canonicalDeckSlug` = the published deck; a REFUSED face has NO landing and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=seasons`. Script absent (m) (selection = `frontend/lib/worksheets-catalog.ts applyLandingFilters`); write + poison-test it (a dropped landing / a dropped `apps` entry / a wrong `coordinate.type` / a `mode:null` base must FAIL; refuses an empty corpus) before `apps.seasons` lands.

**Expected rows per locale:** 6 x 11 = **66** if the pt panel re-targets F5 (`figure:'frame'`), **65** if it refuses F5 (pt 5). No other refusal is measured today: after every recorded veto the smallest d2 pool is pt autumn 4 (>= 3), es / en-US autumn 6, spring 6 everywhere; F2 needs no data; F4 only `monthSeason`. Contingent reductions, each recorded in the draft before the wave: F1 / F3 where vetoes drop a pool below 3 (est. 0); base where a pool drops below 2 (est. 0).
