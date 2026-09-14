# K-321 `days-and-months` (K/G1) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/K-321-pedagogy.md` + `_work/K-321-design.md`. Every file, primitive, class and option below was read in the repo (record: `_work/K-321-critic.md`). (m) = re-measured 2026-09-14 by node (`data/b2/calendar.js` + `calendar-frames.js`, `topics-taxonomy.json`, the 11 `seo-landing/<loc>.json`, `strand-names.ts`, `page.css`) or puppeteer with the shell's woff2 from a `file://` origin (scratch `k321-critic-measure.js`; control: `Wednesday` Baloo 2 700 26 = 135.1 vs 127.2 system fallback, `document.fonts` 14 loaded). Where the two role files disagreed on a number, the design's file-origin figures won every time; the pedagogy's widths were ~8 % low (the README font trap). *est.* = the engineer measures. No em-dashes.

**Boundary (load-bearing).** K-321 owns the calendar NAMES and their ORDER: the 7 days and 12 months as cyclic sequences, their neighbours (yesterday / tomorrow, the month before / after) and the day abbreviations. G2-277/296/297/298/312 (`calendar`, G2, `types/g2/`, m) own the month GRID and every DATE question (`dayOfDate countWeekday stickerDate weekLater daysInMonth firstDay lastDay after`). K-322 owns seasons. K-284 owns tracing. K-019..023 own cardinal strips. K-320 owns ordinal notation. No face prints a numbered month grid, a date, a season, a traced model, an ordinal or a cardinal strip; no calendar word appears in any title or instruction.

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-321` / `days-and-months` / base **K**, F1 **K** (`K-325+ TBD by the emitter`); F2 F3 F4 F5 **G1** (`G1-311+ TBD`). `default_subject: math` (= `apps.calendar.default_subject`, m: `{math, 7-9, calendar}`), `default_age_range: '5-7'`, `assetClass: 'geometry'` (G2-277's value, m; no pictures), `exerciseType: 'days-and-months'`. `apps['days-and-months']` + axis key ABSENT (m); register `{default_subject:'math', default_age_range:'5-7', exercise_type_axis_key:'days-and-months'}` + slug/name x11. The 11 slugs below grepped against every axis slug in every locale: **0 collisions** (m). A second `math` hub section beside `calendar` (7-9): never fold the rail entry into `calendar`. |
| theme axis | **OFF** `{applicable:false}`; landings `coordinate.theme:''` (README themeless convention). No pictures: a picture per day adds a second sign system and no vocab noun means "Tuesday". `unitAxis` NOT applicable: days and months are two GENRE HEADS with separate A-/B+ demand (`_PANEL-FINDINGS` 16), so months are FACES with landings, never a wave unit that ships only its exemplar; the spec carries a config key `unit:'days'|'months'`. |
| CCSS (en, honest) | no K-2 CCSS-M code names day/month sequences. All six faces = readiness: NO `educationalAlignment`; `teaches` = "Days of the week and months of the year (readiness)"; strand row `'Measurement & Data'` (`strand-names.ts:73-85`, all 11 present, m; the row the `calendar` family prints). Non-EN names the national framework only. |
| names source | `require('data/b2/calendar.js').CALENDAR[loc]` at render: `dayNames` (SUNDAY-first, index = `getUTCDay`), `monthNames`, `dayAbbr`, `weekStart` (m: `calendar-frames.js` overrides exist for weekStart/dayAbbr/dayPlural in 9 locales and every one EQUALS `NAMES`, so `CALENDAR` = `NAMES` today). K-321 NEVER copies a name into `data/b3`; a name fix is a `calendar.js` commit. `ordinal()` is never called. |

| loc | genre head (panel) | ASCII slug | level K / G1 (`LEVEL_KEYS`, m) | weekStart | casing | widest day (Baloo 2 700 26, m) | widest month (24, m) | `dayAbbr` |
|---|---|---|---|---|---|---|---|---|
| en | Days of the Week / Months of the Year | `days-and-months` | `kindergarten` / `grade-1` | 0 Sun | Capital | Wednesday 135.1 | September 119.0 | Sun Mon Tue Wed Thu Fri Sat |
| de | Wochentage / Monate | `wochentage-und-monate` | `vorschule` / `1-klasse` | 1 Mon | Capital | Donnerstag 137.9 | September 119.0 | So Mo Di Mi Do Fr Sa |
| es (MX) | días de la semana / meses del año | `dias-y-meses` | `preescolar` / `primer-grado` | 1 | lower | miércoles 114.2 | septiembre 123.8 | dom lun mar mié jue vie sáb |
| pt (BR) | dias da semana / meses do ano | `dias-e-meses` | `educacao-infantil` / `1o-ano` | 0 Sun | lower | segunda-feira **165.0** | novembro 110.3 | dom seg ter qua qui sex sáb |
| fr | jours de la semaine / mois de l'année | `jours-et-mois` | `maternelle` / `cp` | 1 | lower | dimanche 114.5 | septembre 117.1 | dim lun mar mer jeu ven sam |
| it | giorni della settimana / mesi dell'anno | `giorni-e-mesi` | `infanzia` / `classe-prima` | 1 | lower | mercoledì 116.6 | settembre 112.5 | dom lun mar mer gio ven sab |
| nl | dagen van de week / maanden van het jaar | `dagen-en-maanden` | `kleuters` / `groep-3` | 1 | lower | donderdag 127.5 | september 117.5 | zo ma di wo do vr za |
| sv | veckodagar / månader | `veckodagar-och-manader` | `forskola` / `ak-1` | 1 | lower | måndag 94.0 | september 117.5 | sön mån tis ons tor fre lör |
| da | ugedage / måneder | `ugedage-og-maaneder` (å folds to aa, m) | `boernehaveklasse` / `1-klasse` | 1 | lower | mandag 94.0 | september 117.5 | søn man tir ons tor fre lør |
| no | ukedager / måneder | `ukedager-og-maneder` (å folds to a, m) | `1-trinn` / `2-trinn` | 1 | lower | mandag 94.0 | september 117.5 | søn man tir ons tor fre lør |
| fi | viikonpäivät / kuukaudet | `viikonpaivat-ja-kuukaudet` | `esikoulu` / `1-luokka` | 1 | lower | keskiviikko 131.8 | marraskuu 116.5 | su ma ti ke to pe la |

**Geometry rule (measured, locks every layout).** No 7-tile row exists at K size: pt `segunda-feira` 152.3 at 24 -> tile 180 x 7 = 1,262; even sv 86.8 -> 7 x 115 + 36 = 841 > 639 (`.ws-lane` inner, m). A 4 + 3 snake fails pt (745) and de (644 > 639). So every DAY layout is a single column of full-width rows or a 2-column month grid; one geometry in all 11 locales. `dayAbbr[i]` is a case-insensitive prefix of `dayNames[i]` for all 77 (m), which is what makes F5 honest x11. **Head split vs G2-298:** the live G2-298 landings claim "days of the week" WITH a calendar qualifier at grade 2 in **10 of 11** locales (m: en "Days of the Week Calendar Worksheet, 2nd Grade", de "Wochentage im Kalender finden 2. Klasse", sv "Läs kalendern – veckans dagar", no "Les kalenderen: ukedagene" ...; **fr is the exception**, "les jours du mois"). K-321 keeps the head BARE and calendar-free at K/G1; the validator bans the calendar stem in titles and instructions (section 5). No other landing in the 11 corpora claims days / months / yesterday in a title or h1 (m: 0 hits outside `calendar`).

## 2 The base page

**Concept.** "Days of the Week in Order." Seven rows, one scrambled day name per row, each with a dashed rank box on its left. The locale's first day (`dayNames[weekStart]`) is pre-numbered **1** in a solid tealSoft cell; the child finds it, then numbers the other six days 2 to 7. The pedagogy's numbering page WON the base over the design's missing-days ladder: it carries the bare head ("missing days" is an added element, brief rule 4), it is the pre-writer's K move (six numerals, no whole-word writing), and its stack has 164 px slack where the ladder has 0. The ladder becomes F1. Design details kept: the grey dashed `.ws-answerbox` (no new coral circle), a `given` anchor cell (K-320 idiom), the leaked-run ban.

**Chrome budget (README ruling).** Body **722** with 3-line title + 3-line instruction, 814 one-line. `.ws-page` `padding 0 14` -> inner **675** (`page.css:16-26`, m). Rows `minmax(60px, 1fr)`, `align-items:center`; slack opens between rows, tiles and boxes stay 60.

**Layout d2**
```
 <div data-ws-content data-lcs-order data-lcs-unit="days" data-lcs-weekstart="1">   grid 7 x minmax(60px,1fr), gap 14
   [ 1 ]  [ Montag                               ]   given cell 60 (tealSoft, "1" Baloo 2 700 30 ink)
   [   ]  [ Freitag                              ]   answerBox 60x60 grey dashed | 12 | nameTile 440x60
   [   ]  [ Mittwoch                             ]   row 512 centred (margins 81/82)
   ...  7 rows: 7 x 60 + 6 x 14 = 504 <= 722 (slack 164; rows grow to 91)
```
- `nameTile` 440 x 60: cream `#FBF3E4`, border 2 creamDeep `#F5E9D2`, r 12, name Baloo 2 700 **26** ink centred, `white-space:nowrap` (widest pt 165.0 <= inner 416, m); text VERBATIM from `dayNames` (casing included; never `displayWord`, never title-case). `data-lcs-day="<0-6>"`, no other text.
- Rank cell: `answerBox({w:60, h:60, answer:k})` (`components.js:105`, m: `label` empty prints nothing; `.ws-answerbox` white, 2 px dashed `#C8BFAE`, r 10, Baloo 26, `page.css:220`) = the house convention for a written numeral; 60 >= K minElement 56 (`_tokens.js:68`, m); the child's numeral has the K 30 px floor of room. Given cell = `rankBox({n:1})`: tealSoft `#DDEBE8` fill, teal 2 border, r 10, "1" Baloo 2 700 30 ink, `data-lcs-given="1"`, NO `data-lcs-answer`.
- 6 written numerals = K items [4, 8] (m). No strip at d2: the printed anchor already shows the format.

**Ladder** (resolved config keys; guards key on these, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| unit / n / cols | days / 7 / 1 | days / 7 / 1 | days / 7 / **2** (4 + 3, reading order down col 1) |
| given (ranks pre-printed) | [1, 4, 7] | [1] | [1] |
| strip (`numberStrip({values:1..n, chip:40})` above, `.ws-nchip`, m) | true (40 + 14 + 504 = 558) | false | false |
| tileW / namePx / boxPx | 440 / 28 / 60 | 440 / 26 / 60 | 250 / 26 / 60 (2 x 322 + 24 = 668 <= 675; pt 165 <= 226) |
| writes | 4 | 6 | 6 |

**Composer.** `rng.shuffle(0..6)` re-drawn until: (a) no tile sits at its own rank position (`row i` never holds `dayAt(loc, i)`), (b) no two consecutive rows are FORWARD week neighbours (`(b - a + 7) % 7 !== 1`; a run hands over the order), (c) >= 3 tiles displaced. 2-column d3 applies (b) across the column break. Given ranks per `given`.

**Answer-hiding + uniqueness.** Root stamps `data-lcs-unit data-lcs-weekstart data-lcs-n data-lcs-cols`; each row `data-lcs-row="i" data-lcs-day="d"`; the box `data-lcs-answer="((d - weekStart + 7) % 7) + 1"` (data only) or `data-lcs-given`. `verify(page)`: n rows, `data-lcs-day` a permutation of 0..6, tile text === `dayNames[d]`, the given cell's day === `weekStart` and its printed text === `"1"`, answers = the set {1..7} minus `given`, (a)-(c) hold, no `<img>`, no numeral outside a given cell, no `{`. Node gate: `dayNames`/`weekStart` read from `CALENDAR[loc]` and compared verbatim (poison: a de page anchored on `Sonntag` FAILS; an en page anchored on `Monday` FAILS).

**Reused (exact).** `answerBox` (`components.js:105`) · `numberStrip({values, chip})` (`components-b2.js:96`, d1 only) · `.ws-answerbox .ws-nstrip .ws-nchip` · `CALENDAR[loc]` · tokens `T.teal T.tealSoft T.coral T.ink T.inkSoft T.grid T.white T.creamDeep`, `F.display`. **NOT used:** `calendar()` primitive (= G2-277) · `wordBank` (`.ws-scene-banner` is dashed coral = the write signal, m) · `wordTiles` · `chipRow` · `.ws-tile` (Nunito white, wrong register for a name to copy) · `displayWord` · `countBadge` · `image-vocabulary.js`.

**NEW in `templates/components-b3.js`** (file ABSENT, m; scoped inline CSS): `nameTile({text, w, h=60, px=26, id})` (above; shared by every face) · `rankBox({n, d=60})` (given cell) · `orderRows({items, cols, tileW, boxPx, namePx, given})` (the grid of rows + stamps) · `nameBank({names, px=20, h=36, gap=8, w=647})` (F1: `.ws-lane` inline `padding:7px 12px`, `.ws-bankword` pills with inline `font-family:'Baloo 2';font-weight:700` so the child copies ONE letterform, `data-lcs-bank-word`) · `nameLadder({rungs, rungW=520, rungH=80, namePx=26, glyphH=40, rail=true})` (F1) · `railFlag({h})` (internal: the G1-308 `startArrow` turned vertical) · `neighbourRow({left, today, right, laneW=223, tileW=161, h=68, namePx=22, glyphH})` (F2/F4) · `abbrevPairs` = G1-307's `matchColumns({left, right, itemH, colW})` call, nothing new. `lib/b3-common.js` (absent, m): `dayAt(loc, offset)`, `neighbourDay(loc, d, ±1)` (mod 7), `neighbourMonth(i, ±1)` (mod 12).

**Alternatives.** Alt A the design's ladder as base: strong, but its head is "missing days" (F1) and its stack is 722 exactly. Alt B a 4 + 3 snake: fails pt/de (m). Alt C a week wheel: no writing lane, no first rung.

**Risks -> mitigations.** Mono print: no meaning rides on colour (given = solid cell + printed numeral; to-write = dashed); the anchor reads by its printed "1". Two right answers: impossible (one anchor, one cycle). Palette: cream, creamDeep, tealSoft, white, teal, coral, ink, inkSoft, grid. Smallest text 20 (banks) vs the 9 px lint (`qa/lints.js:86`, m). Every root stamps `[data-ws-content]` (`qa/lints.js:32` selector, m).

## 3 Faces 2-6

Base + F3 are PARAM (`unit cols tileW boxPx namePx given strip` are base config keys read by `build()`); F1 F2 F5 are CODE (`layout` knob + a `verify()` branch; `data-lcs-layout` stamped only when declared; base byte-identical); F4 is PARAM over F2. Resolved d2 configs pairwise distinct (`tools/gate-variation-distinct.js` exists, m; needs a b3 ROWS list, critic OPEN 1). Density: K faces element >= 56, writes in [4, 8]; G1 element >= 44, numeral 26, items in [6, 12].

### F1 : Missing Days: Write the Week in Order (K, CODE `layout:'gaps'`)
**Move:** PRODUCE the sequence: an anchored 7-rung week ladder with three gap lanes, copied from a shuffled name bank (the names-analogue of K-019). The design's measured geometry stands; the pedagogy's rung-badge + 520 lane layout yields to it. **Layout d2 (re-budgeted at 722):** bank lane **98** (`.ws-lane` inline `padding:7px 12px` -> inner 647; 7 pills h **36**, Baloo 2 700 20, `padding 0 14`, gap **8**, `flex-wrap` -> exactly 2 rows in all 11: totals 733 sv .. 971 pt at gap 10 (m), all > 647 and < 1,294; widest pill pt 158.9; the design's 100 was 6 px short: 8 + 38 + 10 + 38 + 8 + 4 border = 106) · gap **16** · ladder 7 x `minmax(80px,1fr)` gap 8 = 608: `[rail 24][12][rung 520]` = 556 centred. **98 + 16 + 608 = 722.** Printed rung = `nameTile` 520 x 80 (name 26; inner 496 >= pt 165). Gap rung = `.ws-blankbox` (white, dashed coral 2.5, **r 10**, `page.css:445`, m; the design's 12 corrected) holding `writingRow({w:500, h:70, glyphH:40, xHeight:true})` (`trace-path.js:681`, m; glyphH 40 = the K whole-word floor); nothing printed inside. Rail = SVG 24 x 608: coral pennant 10 x 14 at top, 3 px coral line, 8 px head at bottom, an inkSoft dot r 4 per rung, `aria-hidden`. **Rules:** rung 1 (`dayAt(loc, 0)`) is NEVER a gap; d2 3 gaps never adjacent (patterns over rungs 2..7: (2,4,6) (2,4,7) (2,5,7) (3,5,7)); bank = all 7 names shuffled, order !== week order, !== reversed, and NO bank neighbour pair is a forward week pair incl. the wrap (`(b - a + 7) % 7 === 1` banned). **Config** `{layout:'gaps', unit:'days', gaps:3, adjacentGaps:false, bank:true, namePx:26, glyphH:40, rungH:80}`; d1 `gaps:2, namePx:28`; d3 `gaps:4, adjacentGaps:true` (bank kept: a bank-less ladder is a spelling test at K). **Verify:** 7 rungs, `day[i] === (weekStart + i) % 7`, rung 0 printed, gap count and adjacency per config, every gap `textContent` empty with exactly one `[data-lcs-prim="writing-row"]`, bank set === printed ∪ gap answers, the three bank order rules, `.ws-blankbox` height >= 70, ≤ 2 bank rows (`offsetTop` distinct values). **Query face:** "missing days" / "fehlende Wochentage" / "los días que faltan" / "ontbrekende dagen" / "puuttuvat viikonpäivät".

### F2 : Yesterday, Today, Tomorrow (G1, CODE `layout:'neighbours'`)
**Move:** the day's two NEIGHBOURS as vocabulary + reasoning incl. the Sunday -> Monday wrap; the gestern/heute/morgen gap query the panels name in de/nl/es/pt/fr/it. Design layout stands (rows, not the pedagogy's 2 x 2 cards): header row of three labels Baloo 2 700 20 over the columns (yesterday / tomorrow inkSoft, today teal; widest fr `aujourd'hui` 102.5, fi `huomenna` 95.9 <= 223, m), h 30; six `neighbourRow`s in `.ws-lane` inline `padding:10px 16px` (inner 639): `[writing lane 223 x 68][16 coral chevron <][nameTile 161 x 68, today at 22][16 chevron >][lane 223 x 68]` = 639; row 68 + 20 + 4 = **92**; `minmax(92px,1fr)` x 6 + 5 x 8 + 30 + 8 = **630 <= 722**. Today at 22: pt 139.6 <= inner 145 (m; 5 px reserve, the validator guards it). 12 written names = the G1 cap. `today` = 6 distinct days; >= 1 wrap row (today = the last or first day of the locale week) at d2. **Config** `{layout:'neighbours', unit:'days', rows:6, wrap:true, inverse:0, glyphH:32}`; d1 `rows:4, wrap:false, glyphH:36`; d3 `inverse:2` (two rows print both neighbours and blank today). pt: `laneGlyphH.neighbours:28` (13 glyphs x ~0.55 x 32 = 229 > 223 *est.*; at 28 -> 200). **Verify:** `y === (t + 6) % 7`, `tm === (t + 1) % 7` from `data-lcs-today`; todays distinct; lanes empty; wrap row present at d2; header texts === `LABELS[loc]` verbatim, no `{`. **Query face:** "yesterday today tomorrow" / "gestern heute morgen" / "ayer hoy mañana" / "gisteren vandaag morgen" / "i går i dag i morgon".

### F3 : Months of the Year in Order (G1, PARAM `{...base.difficulty[2], unit:'months', cols:2, tileW:240, boxPx:52, namePx:24, given:[1]}`)
**Move:** the SAME numbering act on the longer cycle: 12 scrambled months, January anchored 1, the child writes 2..12 (11 numerals = G1 cap 12). G1 by reading load (12 names). Two columns of 6: `[answerBox 52 x 52][12][nameTile 240 x 60]` = 304; 2 x 304 + 40 = 648 <= 675; 6 x `minmax(60px,1fr)` + 5 x 14 = 430 <= 722. Month at 24: es `septiembre` 123.8 <= 216 (m); box 52 >= G1 44, numeral 26 ("12" = 26 px). Shuffle rules (a)-(c) over the reading order (down column 1, then 2), forward-neighbour ban across the column break. The design's missing-months ladder (12-pill bank + 5 lanes = 24 name instances) was set aside for whitespace; recorded as the alternate (critic OPEN 4). d1 `given:[1,4,7,10], strip:true` (12 chips x 40 + 66 = 546 <= 675; 8 writes); d3 `cols:3, tileW:150, namePx:20` (3 x 214 + 32 = 674 <= 675; es 103.2 <= 126). **Verify:** base rules with `monthNames`, anchor index 0, answers = {2..12}. **Query face:** "months of the year" / "Monate" / "meses del año" / "månader" / "kuukaudet".

### F4 : The Month Before and After (G1, PARAM `{...F2.difficulty[2], unit:'months', heads:'beforeAfter'}`)
**Move:** the F2 neighbour reasoning on the year cycle incl. December -> January (the "which month comes after" point `_PANEL-FINDINGS` 16 credits). Same rows; heads `before` / `after` from `LABELS[loc]`; given month at 22 (es 113.5 <= 145); lanes 223 at glyphH 32 hold 9-10 glyph months (*est.* 176). d2: 6 distinct months, >= 1 wrap row (January or December given). **Verify:** `monthNames[(i + 11) % 12]` / `[(i + 1) % 12]`. The design's "which day comes next" pills were dropped (F2's tomorrow column as recognition; 40 px pills under every floor). **Query face:** "month before and after" / "Monat davor und danach" / "el mes anterior y el siguiente" / "månaden före och efter" / "edellinen ja seuraava kuukausi".

### F5 : Days of the Week: Abbreviations (G1, CODE `layout:'abbrev'`)
**Move:** DECODE the notation on every timetable and calendar header (Mo Di Mi / ma di wo / ma ti ke): match each abbreviation to its full name by reading letters, not first letters alone (`Di`/`Do`, `Tue`/`Thu`, `ti`/`to` share an initial). Honest x11 by data (prefix rule, 77/77, m). `matchColumns` 7 pairs: left `.ws-match-item--plain` 140 x 78 (`dayAbbr` Baloo 2 700 26, widest `dom` 51.9, m) in the locale's week order; right cream 300 x 78 (`nameTile` text at 24, pt 152.3 <= 276) a DERANGEMENT (`right[i] !== left[i]`); `.ws-match` `padding 6 30`, `.ws-match-col` gap **12** (`page.css:354-391`, m; the design's 10 corrected): 7 x 78 + 6 x 12 = 618 + 12 = **630 <= 722**. Elements 78 >= 44; 7 lines in [6, 12]. **Config** `{layout:'abbrev', pairs:7}`; d1 `pairs:5` with at most two pairs sharing an initial (de and pt have only 4 distinct initials, m, so "all initials differ" is unreachable there: brief rule 7); d3 both columns shuffled. **Verify:** left texts === `dayAbbr` as a set, 7 distinct; right a permutation of `dayNames`; no `right[i] === left[i]` day; `data-lcs-abbr` / `data-lcs-name` ids 1:1. **Refusal is data:** a panel whose school prints no abbreviations sets `abbrev:null` -> no landing for that locale (hub expectation lowered, section 7). Chosen over the pedagogy's weekday/weekend sort (7 lines into 5:2 bins; a two-way label as its whole content; a de/fi label trap; critic OPEN 3). **Query face:** "abbreviations" / "Abkürzungen der Wochentage" / "abreviaturas" / "afkortingen" / "förkortningar".

**Rejected non-moves.** Trace the names (K-284) · any month grid or date question (G2-277 family) · months + seasons (K-322) · count the days in a week · "mark your birthday month" (open-ended) · a Sunday-first face for Monday-first locales · a cut-and-paste twin (K-240) · "today is ___" (a date) · d1/d3 relabelled.

## 4 Native rebuild plan x11

The panel authors 5 labels (`yesterday today tomorrow before after`), six titles + instructions, `alt[]` (regional names accepted, never printed), optionally `dayShort` (pt) and `abbrev:null` (refusal), and audits the EN as a SOURCE. It NEVER re-authors a day, month or abbreviation (`calendar.js`). Instructions are slot-free in every face (no `{noun}`, no `fillSlots`): nothing on the apparatus is ever inflected. Label casing is the panel's call, consistent within a set.

| loc | names (source, casing, weekStart) | labels the panel authors (expected; measured width Baloo 20 / Nunito 16) | refusal | traps |
|---|---|---|---|---|
| en | Capital, Sunday-first | yesterday 90 / today / tomorrow 90 · before / after | none | US Sunday-first is correct; never "Weds" |
| de | Capital, Monday-first | gestern / heute / morgen · davor / danach | none | `Samstag` is the bank form, `Sonnabend` only in `alt`; nouns keep the capital on every tile; head stays "Wochentage" |
| es (MX) | lower, Monday-first (`calendar-frames.js` weekStart 1, = NAMES, m) | ayer / hoy / mañana · antes / después | none | `mañana` = tomorrow AND morning; as a column head over a day tile it reads as tomorrow |
| pt (BR) | lower, Sunday-first | ontem / hoje / amanhã · antes / depois | none | `-feira` stays on every tile and in every written answer (13 glyphs, the widest data in the type); `2ª feira` never; `dayShort` (`segunda` ...) is a taste option, default null; F2 lane knob `laneGlyphH.neighbours:28` |
| fr | lower, Monday-first | hier / aujourd'hui 102.5 / demain · avant / après | none | NBSP before `?` / `:` in instructions; `aujourd'hui` is the widest label (fits 223) |
| it | lower, Monday-first | ieri / oggi / domani · prima / dopo | none | `lunedì` accent on the tile |
| nl | lower, Monday-first | gisteren / vandaag / morgen · ervoor / erna | none | `morgen` = tomorrow AND morning (as es); lettergrepen irrelevant here |
| sv | lower, Monday-first | i går / i dag / i morgon (Språkrådet; `igår idag imorgon` in `alt`) · före / efter | none | never «grupp» anywhere (CLAUDE.md §20.9); [NSR] |
| da | lower, Monday-first | i går / i dag / i morgen · før / efter | none | [NSR] |
| no | lower, Monday-first | i går / i dag / i morgen · før / etter | none | bokmål; `søndag` ø on the tile; [NSR] |
| fi | lower, Monday-first | eilen / tänään / huomenna 95.9 · edellinen / seuraava | none | labels are nominative adverbs/adjectives as column heads, no case needed; no frame carries a name so `maaliskuun` is never printed; [NSR] |

Every panel reads one d2 render per face in its own locale (F1 bank rows, F2 today tile) before sign-off.

## 5 Data + gates

`data/b3/days-months.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the `apply-b2-locale.js` / `validate-b2-draft.js` pattern, both exist, m; the b3 tools are absent; `data/` gitignored, `git add -f`):
```
DAYS_MONTHS[loc] = {
  names:   'calendar',                                   // sentinel: CALENDAR[loc] at render; never a copy
  labels:  { yesterday:'gestern', today:'heute', tomorrow:'morgen', before:'davor', after:'danach' },
  alt:     { days:{6:['Sonnabend']}, labels:{ yesterday:['igår'] } },   // accepted, never printed
  dayShort:    null | ['domingo','segunda', ...],         // pt option; if set, tiles print it and the gate checks against IT
  laneGlyphH:  { days:40, months:32, neighbours:32 },    // pt may set neighbours:28
  abbrev:  'calendar' | null,                            // null = F5 refused for this locale (no landing)
  strings: { 'K-321':{title,instruction}, F1..F5:{title,instruction} } }
```
`lib/b3-common.js`: `dayAt(loc, offset)` = `dayNames[(weekStart + offset) % 7]`, `neighbourDay`, `neighbourMonth`, `rankOf(loc, d)` = `((d - weekStart + 7) % 7) + 1`.

**`tools/validate-b3-draft.js` (days-months block; exit 1 on any):** (1) 5 labels present, `/^[\p{L}' -]+$/u`, <= 12 glyphs, distinct within `{yesterday,today,tomorrow}` and within `{before,after}`; (2) the draft defines NO `dayNames` / `monthNames` / `dayAbbr` / `weekStart` (a name fix goes to `calendar.js`); `dayShort`, if set, 7 distinct and each a case-insensitive prefix of `dayNames[i]`; (3) titles <= 70, no worksheet-word, unique in band; instructions <= 150, no `{`; **calendar-stem ban** `/calend|kalend|kalent/iu` in every title AND instruction (G2-298 owns that head); **season ban** (`season(s) Jahreszeit(en) estación/estaciones estação/estações saison(s) stagione/i seizoen(en) årstid(er) vuodenaika/-ajat` + the four season names per locale); (4) rendered widths (puppeteer via `render/one.js`, file:// fonts): widest day at 26 <= 416 (base) / 496 (F1), at 22 <= 145 (F2 today tile); widest month at 24 <= 216 (F3), at 22 <= 145 (F4); widest label at Baloo 20 <= 223; the F1 bank renders in exactly 2 rows over 12 seeds; (5) `dayAbbr[i]` prefix of `dayNames[i]` (holds 77/77 today, m) unless `abbrev:null`.

**`qa/verify-b3-days-months.js`:** renders face x 11 at d2 under a 3-line title + 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean (overflow `:37-45`, footer `:50-66`, font `:86`); K faces boxes >= 56 and lanes glyphH >= 40; G1 faces elements >= 44, numerals 26; 20-seed sweep: base/F3 shuffle rules (a)-(c) every seed; F1 gap patterns cover all four; F2/F4 wrap row present every seed at d2; F5 derangement every seed. **Poison (each must FAIL; the correct draft is the control):**
- **P1 (mandated) a gap with two valid fills:** an F1 ladder with rung 1 blank (no printed anchor) FAILS "rung 0 is a gap"; control = rung 1 printed.
- **P2 (mandated) a Sunday-first anchor in a Monday-first locale:** a de base page whose "1" sits on `Sonntag` FAILS "anchor != weekStart"; the mirror en page anchored on `Monday` FAILS; controls `Montag` / `Sunday` PASS.
- P3 a base page in calendar order (or a forward run of two rows) FAILS the shuffle rule; P4 an F1 bank in week order, reversed, or with one forward pair (`Montag, Dienstag` adjacent) FAILS; P5 a tile reading `Sonnabend` or `montag` FAILS the node gate; P6 F2 today Sunday with tomorrow answer `Sunday` FAILS; P7 F4 December with after-answer `December` FAILS; P8 a title containing `Kalender` FAILS beside `Wochentage in der richtigen Reihenfolge` PASSING; P9 an instruction with `Jahreszeiten` FAILS; P10 a pt F2 today tile rendered at 24 (152.3 > 145) FAILS width; P11 F5 `right[i] === left[i]` FAILS; P12 two base boxes both answering `3` FAILS; P13 the design's 106-px bank lane under 3-line chrome (728 > 722) FAILS the footer lint; P14 a draft that defines `dayNames` FAILS.
Page reads at render: `CALENDAR[loc]`, `DAYS_MONTHS[loc]`; never `image-vocabulary.js`, `approved-words-*.json` or `calendar.js ordinal()`.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (the child's instruction; 120-170 whole) | coordinate |
|---|---|---|---|
| base | "Days of the Week in Order" · "Wochentage in die richtige Reihenfolge bringen" / "Los días de la semana en orden" / "Veckodagarna i rätt ordning" · "Viikonpäivät järjestykseen" | The first day of the week is already marked 1; number the other six days 2 to 7 in the order they come | `{type:'days-and-months', mode:'base', theme:'', level:<K key>}` |
| F1 | "Missing Days: Write the Week in Order" · "Fehlende Wochentage eintragen" / "Los días que faltan: escribe la semana" / "Skriv de veckodagar som saknas" · "Kirjoita puuttuvat viikonpäivät" | Some days are already written on the ladder; copy the missing days from the word bank into the right places | `mode:'gaps'`, K |
| F2 | "Yesterday, Today, Tomorrow" · "Gestern, heute, morgen: Wochentage" / "Ayer, hoy y mañana: los días de la semana" / "I går, i dag, i morgon" · "Eilen, tänään, huomenna" | Today's day is given in the middle; write the day that was yesterday and the day that will be tomorrow | `mode:'neighbours'`, G1 |
| F3 | "Months of the Year in Order" · "Die zwölf Monate in die richtige Reihenfolge bringen" / "Los meses del año en orden" / "Årets månader i rätt ordning" · "Vuoden kuukaudet järjestykseen" | January is already marked 1; number the other eleven months 2 to 12 in the order of the year | `mode:'months'`, G1 |
| F4 | "The Month Before and the Month After" · "Welcher Monat kommt davor und danach?" / "El mes anterior y el mes siguiente" / "Månaden före och månaden efter" · "Edellinen ja seuraava kuukausi" | One month is given in the middle; write the month that comes before it and the month that comes after it | `mode:'months-neighbours'`, G1 |
| F5 | "Days of the Week: Abbreviations" · "Wochentage und ihre Abkürzungen" / "Los días de la semana y sus abreviaturas" / "Veckodagarnas förkortningar" · "Viikonpäivien lyhenteet" | Read each short form and draw a line to the day it stands for | `mode:'abbrev'`, G1 |

`coordinate.mode` is ALWAYS the face's mode string (README ruling: `coordKey()` = `type|mode|theme`, `landing-content.ts:215`, m; six themeless faces with `mode:null` would collide). Titles <= 70, no worksheet-word, no calendar stem, unique per band. h1 = title; eyebrow = level label; strand row `Measurement & Data` (national name per section 1); JSON-LD `LearningResource` with NO `educationalAlignment`, `teaches` = the readiness label; non-EN prose names the national framework (Lehrplan / SEP / BNCC / programmes / Indicazioni / SLO / Lgr22 / Fælles Mål / LK20 / OPS), never a code. `topicMeta['days-and-months']` (>= 50) + `skill-sentences.<loc>.json` via `tools/register-b3-en-content.js` (absent, m). Meta lead inherits `seo.words.free_printable` (README open item 1).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F3 | seven days, a week, "2 to 7" vs twelve months, a year, "2 to 12" (same act, different cycle) | 0.35 |
| base vs F1 | number the days vs copy the missing names from a bank onto a ladder | 0.30 |
| F2 vs F4 | yesterday / tomorrow of a DAY vs the month before / after; the wrap named (Sunday-Monday vs December-January) | 0.35 |
| F1 vs F2 · F5 vs any | a ladder of names vs neighbours round a given day · short forms and lines vs order or neighbours | 0.20 · 0.15 |
| any vs G2-277 / G2-298 `calendar` | names and their order at K/G1 vs a month GRID and date questions at grade 2 (the head split: no calendar word here) | 0.10 |
| any vs K-322 seasons | no season word on this type (validator ban) | 0.05 |
| base / F3 vs K-019..023 strips · K-320 ordinals | rank numerals beside NAMES vs missing cardinals in a numeral sequence · vs ordinal notation on a picture line-up | 0.10 · 0.10 |

Boundary sentence on every landing: "The child orders, completes or names the days and months themselves; reading a month grid and answering date questions is the Calendar family (grade 2)."

## 7 Hub visibility contract

A face appears under `days-and-months` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps['days-and-months']` exists in `frontend/config/topics-taxonomy.json` (ABSENT, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['days-and-months']` has `slug` + `name` in all 11 locales (section 1 slugs, 0 collisions, m); (3) exactly one landing per face per locale with `coordinate.type === 'days-and-months'` verbatim, `mode` per section 6, `theme:''`, the level key of section 1 (K for base + F1, G1 for F2 F3 F4 F5), a unique slug, `canonicalDeckSlug` = the published deck; a REFUSED face has NO landing and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=days-and-months`. Script absent (m) (siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`; selection = `frontend/lib/worksheets-catalog.ts applyLandingFilters`); write + poison-test it (a dropped landing / a dropped `apps` entry / a wrong `coordinate.type` must FAIL; refuses an empty corpus) before `apps['days-and-months']` lands.

**Expected rows per locale:** 6 in every locale x 11 = **66**. No refusal is measured today: every face is a data-only rebuild over the same 7 + 12 names, the 5 labels are panel literals in all 11, no picture noun is printed, and `dayAbbr` is a name prefix in all 77 slots (m). Contingent reductions, each recorded in the draft before the wave: F5 where a panel sets `abbrev:null` (est. 0); F2 where a panel's `today` tile overflows at 22 and refuses 20 (est. 0: worst pt 139.6 <= 145).
