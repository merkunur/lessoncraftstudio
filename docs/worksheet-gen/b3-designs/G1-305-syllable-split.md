# G1-305 `syllable-split` - FINAL design (editor-critic merge, 2026-09-13)

Merged from `_work/G1-305-pedagogy.md` + `_work/G1-305-design.md`; every file, primitive and option named below was verified in the repo (record: `_work/G1-305-critic.md`). Pool numbers are MEASURED (approved-words `entries[]` joined to `entriesFor(theme,loc)` on `vocabKey === key`, `count >= 2`, `/^\p{L}+$/u`, distinct by word, da `policy_managed !== true`, fr final mute-e refused). "texPool" = entries with `'TeX'` in `sources_agreed`; every face that PRINTS a boundary draws from it.

## 1. Identity

| field | value |
|---|---|
| id / key | `G1-305` / `syllable-split` (NEW family: `apps.syllable-split` `{default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'syllable-split'}` + `axes['exercise-type'].syllable-split.{slug,name}` x11; registrar clone of `tools/register-b2-taxonomy.js NEW_FAMILIES`; measured 2026-09-13: neither exists yet) |
| bands | G1 in all 11 (base + 5 faces); no K face. sv/da write the split from åk 1 / 1. klasse; no from 2. trinn; pt panel may set 2º ano |
| default_subject | `letters` |
| theme axis | `themeAxis:{applicable:true, minNouns:8, excludeBw:true}`; minNouns checked on the FACE pool, never the vocab count |
| themes, base d2 (count 2-3, <= 11 letters) pool >= 8 | around the house, supermarket, zoo animals, clothing, forest creatures, toys, animals: 11/11 · fruits, vehicles, ocean life: 10/11 (da 5 / 7 / 5) · pets 9/11 (da 5, no 6) · body parts 9/11 (en 6, da 2) |
| refused themes | `farm animals` for the whole type (da 2, no 2, sv 4, nl 6, en 7); every BW theme; da additionally fruits, vehicles, zoo, body, ocean, pets (strict pool) |
| CCSS (en only; national framework NAME elsewhere) | RF.1.3.e on every face; Vowel King adds RF.1.3.d |
| data | approved-words only (brief line 14); raw vocab supplies picture + join key + display case |

| loc | genre head (title of the base) | ASCII slug | G1 label | convention (`mark`) |
|---|---|---|---|---|
| en | Syllable Division | `syllable-division` | grade 1 | arc ("scoop") |
| de | Silbenbögen | `silbenboegen` | 1. Klasse | arc |
| es | Separar en sílabas | `separar-en-silabas` | primer grado | bar |
| pt | Separação de sílabas | `separacao-de-silabas` | 1º ano | bar |
| fr | Découper les mots en syllabes | `decouper-les-mots-en-syllabes` | CP | arc |
| it | Divisione in sillabe | `divisione-in-sillabe` | classe prima | bar |
| nl | Woorden in lettergrepen verdelen | `woorden-in-lettergrepen-verdelen` | groep 3 | arc |
| sv | Dela upp ord i stavelser | `dela-upp-ord-i-stavelser` | åk 1 | arc |
| da | Del ordet i stavelser | `del-ordet-i-stavelser` | 1. klasse | arc |
| no | Dele ord i stavelser | `dele-ord-i-stavelser` | 2. trinn | arc |
| fi | Tavuta sanat | `tavuta-sanat` | 1. luokka | bar (tavuviiva) |

Heads from `_PANEL-FINDINGS.md` §3; the panel may rename. nl titles say **lettergrepen**, never klankgroepen (the data is `kat-ten`, the Staal klankgroep is `ka-tten`). `mark` is locale DATA (§5), not a face.

## 2. The base page

**Concept.** "Read it, clap it, mark the parts." Six cream cards (2x3): a theme picture, the whole word printed large in equal LETTER CELLS, and a blank arc zone where the child draws one bowl (or bar) per syllable. No ruling, no digit, no dots; the split is never printed. Distinct from K-233 (digit answer), K-234 (line to a numeral), K-318 (grapheme boxes, word never printed), G1-244 (no model), G2-316 (compounds).

**Why cells.** `build()` has no font metrics. Equal cells make every boundary an exact x (cumulative letters x cell), so Vowel King's printed arcs, the Missing Syllable blank and `verify()` never depend on text measurement. Baloo 2 glyph advance vs cell is UNKNOWN: the engineer measures the widest glyph (`m w W` + de capitals) and the gate asserts advance <= cell - 2 (critic OPEN 1).

**Layout d2 (px).** Page 703x945, `.ws-page` padding 0 14 -> inner 675 (`page/page.css:16`). Body ≈ 760 (exact header+instruction+footer UNKNOWN, engineer measures). `cardGrid({cols:2, rows:3})` (`templates/layouts/card-grid.js`): gap 14 -> card 330x244; `.ws-card` padding 12 + border 2 -> inner 302x216. `.ws-card-stage` is `padding:6px 4px` in page.css; set inline `padding:6px 0` (G1-244 precedent) -> stage 302x204, column, `[data-ws-content]`.

```
+-------------- card 330x244 --------------+
|[1]            [picture 88]               |
|     +--+--+--+--+--+--+--+--+            |  cells 32 (n<=9), Baloo 2 700 30, ink
|     |S |c |h |a |f |e |r |  |            |  cell 1 keeps the de capital
|     +--+--+--+--+--+--+--+--+            |
|     .........................            |  arc zone 32: 1 px grid shelf, else blank
+------------------------------------------+
six cards, 2 cols x 3 rows, gap 14
```

Stack: 6 + 88 + 8 + word svg (cell + 12 = 44) + 6 + arc 32 = 184 <= 204. `cell = min(32, floor(296 / n))`: n 8-9 -> 32 · 10 -> 29 · 11 -> 26; `fontPx = cell - 2`. REFUSE n > 11 at d2 (cell < 26). Picture 88 >= G1 element floor 44.

**Ladder (resolved `difficulty`).**

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards / cols / rows | 4 / 2 / 2 | 6 / 2 / 3 | 8 / 2 / 4 |
| pic | 120 | 88 | 56 |
| cellMax / fontPx | 36 / cell-2 | 32 / cell-2 | 28 / cell-2 |
| arcH / dots | 36 / true (count dots, evenly spaced) | 32 / false | 28 / false |
| minCount / maxCount / minLongCards | 2 / 2 / 0 | 2 / 3 / 2 | 2 / 4 / 3 |
| maxLetters | 8 | 11 | 12 |
| band | G1 | G1 | G1 |

d3 stack (inner 302x151): 6 + 56 + 6 + 40 + 6 + 28 = 142. Pool guard `sampleEntries(rng, pool, d.cards, 'G1-305')` (sample-or-throw, `lib/b2-common.js:64`); refusals recorded by the wave.

**Filter, in order.** `entriesFor(theme, loc)` -> `displayWord` (`KEEP_CASE = {de}`) -> `/^\p{L}+$/u` -> approved entry by `vocabKey` with `entry.word === display word` case-insensitively -> `count` in range, `[...word].length <= maxLetters` -> da `policy_managed !== true` -> fr `refuse.finalMuteE` (`/[^aeiouyéèêë]e$/u` on the last syllable + panel `exclude`) -> `distinctByWord` -> face pool rule (§3). The base is a count-only face: the FULL approved pool (§5 on what that means in en).

**Answer-hiding + uniqueness.** Hidden stamps only (G1-244 `data-lcs-word` precedent) on each stage: `data-lcs-word` (display form), `data-lcs-vocab`, `data-lcs-split="ei|chel"` (lowercase), `data-lcs-count`, `data-lcs-cell`, `data-lcs-face="base"`; on the arc svg `data-lcs-arcmode`. `verify(page)` (browser): `split.join('') === word.toLocaleLowerCase()`; `count === split.length >= 2`; cells `n === [...word].length`; `arcmode === 'blank'` -> no `<path>` in the arc svg; d1 dots: `count` circles at `x = w·(i+0.5)/count ± 1`, never on a boundary; visible card text === the word and nothing else; no text equals the word with any separator inserted (`[\s\-|·/]`); no duplicate words; `img.naturalWidth > 0`; svg widths <= 302; cards === `d.cards`. Re-derivation from the approved file is node-side (§5): `page.evaluate` cannot require modules.

**Primitives / components.** Reused: `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-lane .ws-nchip .ws-bank .ws-bankword .ws-scene-banner .ws-tile .ws-tilerow` (`page/page.css`); `writingRow({w,h,glyphH,xHeight})` -> `{svg,width,height}` with `data-lcs-prim="writing-row"` (`primitives/trace-path.js:681`); `rulingBlock wordBank wordTiles` (`templates/components-b2.js:58/210/26`); `svgRoot roundedRect circle line label el esc` (`primitives/_svg.js`); `entriesFor displayWord distinctByWord sampleEntries fileUri` (`lib/b2-common.js`); `compare` (`data/b2/collation.js`); tokens `T.ink T.grid T.teal T.coral T.white`, `F.display`. NOT used: `countBadge` (prints a numeral), `letterBoxes` (reads as "write here"), `strokeWordLane` (no model to trace), `pillChoice` (the judgement face is rejected).

NEW `primitives/syllable-arcs.js` (K-318's proposal, ONE primitive for both types): `syllableArcs({spans:[{x,w}], w, h=26, mode:'printed'|'blank'|'dotted', dots=0, strokeW=3})` -> `<svg data-lcs-arcs=n data-lcs-arcmode=mode>`. `printed`: per span a bowl `M x+4,3 Q x+w/2,h·0.95 x+w-4,3`, `T.teal`, round caps. `blank`: `line({y:2, strokeColor:T.grid, strokeWidth:1})` across `w`, plus `dots` circles r 4 `T.teal` at `x = w·(i+0.5)/dots`, y 14; spans not emitted. `dotted`: K-318 only. K-318 passes spans from box clusters; G1-305 from cells.

NEW in `templates/components-b3.js`: `syllableWord({word, cell, fontPx, blank=null})` -> `<svg width=n·cell height=cell+12 data-lcs-cells=n data-lcs-cell=cell>`, letter i = `label({x:(i+0.5)·cell, y:cell+2, size:fontPx, fontFamily:F.display, weight:700, anchor:'middle'})`, no borders; `blank={from,len}` replaces those cells by ONE dashed box 4 cells wide (`roundedRect` r 8, `T.white`, `T.coral` 2.5, dash `6 5`, `data-lcs-blank`) and re-lays the letters after it; `syllableArcsForWord({split, cell, h, mode, dots})` computes spans and calls `syllableArcs`; `hyphenLane({w, h=64, glyphH=28})` = `writingRow({w,h,glyphH,xHeight:true}).svg` in `<div data-lcs-hyphen-lane>`, no ticks (a tick leaks the boundary); `vowelDot({x,y})` = `circle r 5 fill T.coral data-lcs-vowel-dot`, ONLY in the Vowel King example banner.

**Locale slot structure.** `i18n/strings.<loc>.json` keyed by id (`G1-305` + five face ids) `{title, instruction}`; `i18n/skill-sentences.<loc>.json` key `syllable-split` `{full, short}`; taxonomy slug+name; `frontend/messages/<loc>.json topicMeta.syllable-split`; `data/b3/syllable-split.js` per-locale block (§5). Reading order left-to-right in all 11.

**Alternatives.** Alt A, six full-width rows: a 12-letter word forces cell 21 (rejected; survives as Write, which needs no cells). Alt B, picture beside the word: 11 letters -> cell 20, a 2-letter bowl 40 px (rejected). Alt C, proportional text with estimated boundaries: 2-6 px drift per letter (rejected). Alt D, the design file's base with arcs AND a rewrite lane: the base would own both heads and the single-channel faces become subsets (rejected; split into base + Write).

**Risks -> mitigations.** Baloo 2 advance > cell -> gate asserts (OPEN 1). fr mute-e -> data flag, panel may flip. da thin pool -> strict pool, refusals recorded. de capital -> verify lowercases. Palette: ink, grid, teal, cream; no new hex.

**Print check.** Cell 32 = 8.5 mm, font 30 (7.9 mm) down to 24 at 11 letters (6.3 mm); arc zone 32 = 8.5 mm for a pencil bowl; 3 px teal arcs ≈ 60 % grey on mono laser, the 1 px shelf ≈ 25 %; nothing within 14 px of the edge; smallest text 22 px (d3 word) plus the 10 px footer.

## 3. Faces 2-6

All five are CODE faces (a named additive knob on `build()` + a `verify()` branch, stamped only when declared; base byte-identical). Guards key on `d.mode` / `d.kings`, never the level index. No PARAM face: arcs-only IS the base. Rows layout = `cardGrid({cols:1, rows:6})` of `.ws-lane`: row 120, border 2 + padding 12/16 -> inner 639x92. "Ships" = MEASURED face pool >= 8 at d2, fr mute-e refused. Ids `G1-311+ (TBD by the emitter)`.

### Face 2 - Write the Word in Syllables (G1-3xx, `mode:'rewrite'`)
Teaching move: reproduce the split in writing: copy the printed model onto a ruling with a hyphen at every boundary (`Ka-me-ra`, the fi 1. lk staple, es/pt/it guiones). Layout: 6 rows `[pic 64][word Baloo 2 700 26, proportional, column 200, `data-lcs-model`][hyphenLane w 351 h 64 glyphH 28]` (64 + 12 + 200 + 12 + 351 = 639). Lane capacity ≈ 16 glyphs at 21 px (est., OPEN 2) -> `maxLetters = min(12, 17 - count)`. Config: `{cards:6, cols:1, rows:6, mode:'rewrite', pic:64, glyphH:28, minCount:2, maxCount:3, minLongCards:2}`; d1 4 rows count 2; d3 count 2-4, model in `T.inkSoft` 18 px. Verify: six `[data-lcs-prim="writing-row"]`; model text === `data-lcs-word` verbatim; no `[data-lcs-arcs]`; no separated form of the word anywhere. Pool: FULL (count-only), same cells as the base. Query face: "write the word in syllables" (in Silben schreiben / escribir separando en sílabas / tavuta ja kirjoita). Boundary: G1-244 prints NO model; here the model is printed and the hyphens are the task.

### Face 3 - Missing Syllable (G1-3xx, `mode:'cloze'`, pool tex)
Teaching move: syllable-level cloze: say the picture, read the printed part, write the missing syllable in the box (RF.1.3.e). Layout: 8 cards 2x4 (inner 302x151): pic 56 + 6 + `syllableWord({blank})` 44 + 6; the blank is ONE dashed coral box exactly 4 cells wide whatever the syllable length (no length leak). `cell = min(28, floor(296 / (n - len + 4)))`; letters <= 10 and blank syllable 2-4 letters -> worst case 12 cells x 24 = 288. Blank index random among eligible syllables; index 0 allowed (de: the child writes the capital). Config: `{cards:8, cols:2, rows:4, mode:'cloze', pool:'tex', pic:56, cellMax:28, maxLetters:10, blankLen:[2,4], minCount:2, maxCount:3}`; stamps `data-lcs-face="cloze"`, `data-lcs-blank=i`. Verify: exactly one `[data-lcs-blank]` per card, width === 4 cells (poison: proportional box -> FAIL); visible letters === split minus the blank, in order. Ships: en animals 9, clothing 8, house 16, supermarket 18 ONLY (fruits/vehicles/forest/pets 6, toys/zoo/body/ocean 4 refused); fr fruits 2, vehicles 7, ocean 7 refused; da animals 8, toys 8, clothing 10, house 17, supermarket 11, forest 9; sv pets 7 and no pets 6 refused; de/es/pt/it/nl/fi every fanned theme. Query face: "missing syllable" (fehlende Silbe / sílaba que falta / la sillaba mancante / puuttuva tavu). Boundary: K-224 blanks one LETTER; copy says "syllable", never "letter".

### Face 4 - Syllable Scramble (G1-3xx, `mode:'scramble'`, pool tex)
Teaching move: synthesis, the reverse of the base: the word's own syllables are printed as shuffled tiles; read, order, write the word ("Silbensalat", "ordena las sílabas"). Layout: 6 rows `[pic 64][wordTiles({tokens:split, order, fontPx:22, tileH:44}) in 280][writingRow w 267 h 64 glyphH 28]` (64 + 12 + 280 + 12 + 267 = 635). `.ws-tile` is Nunito 800 with 12 px side padding; three 5-letter tiles ≈ 271 (est., OPEN 5). `order = rng.shuffle` until !== identity. Config: `{cards:6, cols:1, rows:6, mode:'scramble', pool:'tex', pic:64, tileH:44, minCount:2, maxCount:3, min3:2, maxLetters:11}`; stamps `data-lcs-face="scramble"`, tiles carry `data-lcs-tile=idx` (the component's own stamp). Verify: tile multiset === split; order !== identity; a ruling per row; >= 2 rows with 3 tiles; no separated form of the word. Ships: **en REFUSED on every theme** (three-syllable TeX words per theme 0-3; fruits/forest reach 2-3 but their pools are 6); fr toys, zoo, clothing, house, supermarket, forest (animals t3 0); nl all but animals (t3 0); da toys, clothing, house, supermarket, forest; no fruits, vehicles, toys, zoo, house, supermarket, forest, ocean; sv all but pets; de/es/pt/it/fi every theme. Query face: "syllable scramble" (Silbensalat / ordena las sílabas / sílabas embaralhadas / tavusekoitus). Boundary: K-231 tiles are LETTERS; G1-249 tiles are WORDS; G1-306 reads syllable TABLES; here the unit is the syllable of one pictured word.

### Face 5 - Two or Three Syllables? Split and Sort (G1-3xx, `mode:'sort'`)
Teaching move: split, then classify by the number of parts produced (bisílabas / trisílabas, an A head in it/pt/es): copy each bank word, split with hyphens, into the 2- or 3-syllable column. Layout: `wordBank({words:8, wordPx:18, withIcons:true})` (44 px icons, ≈ 110 high); two `.ws-lane` columns 330 wide, gap 15; heading = `.ws-nchip` 44 numeral "2" / "3" beside the panel's `sortLabels` literal (Nunito 800 20); `rulingBlock({rows:4, w:290, h:64, glyphH:28})`. Column 44 + 8 + 4x64 + 3x6 + 28 = 354; page 110 + 16 + 354 = 480. Bank in `collation.js` order. Config: `{mode:'sort', bank:8, cols:[2,3], perCol:4, maxLetters:10, glyphH:28}`; d1 bank 6 (3+3), d3 bank 10 (5+5). Stamps: `data-lcs-count` hidden on each chip, `data-lcs-col="2|3"` on columns. Verify: 8 bank chips, 4:4 (poison 5:3 -> FAIL); bank order === collation order, never grouped by count; 4 rulings per column, empty; headings === `sortLabels`. Ships (c2 >= 4 AND c3 >= 4, letters <= 10): en fruits, vehicles, zoo, clothing, house, supermarket, forest, ocean; de fruits, vehicles, toys, zoo, house, supermarket, forest, ocean, pets; es/pt/it/fi every theme; fr fruits, zoo, house, forest; nl zoo, clothing, house, supermarket; sv fruits, vehicles, toys, zoo, clothing, house, supermarket, forest; da clothing, house ONLY; no fruits, toys, zoo, house, supermarket, forest. Query face: "two or three syllables" (zwei oder drei Silben / bisílabas y trisílabas / parole bisillabe e trisillabe / kaksi vai kolme tavua). Boundary: K-234 draws a line to a numeral at K; here the child WRITES the split word under a heading.

### Face 6 - Vowel King (G1-3xx, `kings:true`, pool tex; REFUSED en, fr)
Teaching move: every syllable has one vowel (de Silbenkönig / FRESCH; es-pt-it "cada sílaba tiene una vocal"; nl klinker per lettergreep; Nordic stavelsevokal; fi tavu = vokaali). The arcs are PRINTED (the split is the given); the child dots the vowel of each syllable inside its bowl. Layout: base 2x3 geometry, pic 72, `syllableArcsForWord({mode:'printed'})`, plus a worked-example banner (`.ws-scene-banner` 675x64: `example.vocabKey` in cells + printed arcs + a `vowelDot` under each king; never on a card). Cards get (760 - 74 - 28) / 3 = 219 -> inner 191; stack 6 + 72 + 8 + 44 + 6 + 32 = 168. Eligibility: texPool, count 2-3, letters <= 11, every syllable holds exactly ONE maximal run of vowel letters (`data/literacy/letter-knowledge.json vowels[loc]` + locale `vowelExtra`, e.g. nl `ij`); the run is the king (de `ei`/`au`/`ie` whole). Config: `{cards:6, cols:2, rows:3, kings:true, pool:'tex', pic:72, example:true, minCount:2, maxCount:3, maxLetters:11}`; stamps `data-lcs-face="kings"`, `data-lcs-kings="0:2|2:1"` (cell:run length per syllable). Verify: arcs === count, each `<path>` spans its syllable's cells; kings re-derived from the vowels list; example absent from cards; no visible dot on a card. Refused en (silent e, vowel teams) and fr (mute e) by design; nl/sv/da/no may refuse by data (`kings:false`). Ships: de/pt/nl/fi every theme; es, it, sv all but pets 7; no all but pets 6; da animals 8, toys 8, clothing 10, house 17, supermarket 11, forest 9. Query face: "vowel in every syllable" (Silbenkönig / la vocal de cada sílaba / stavelsevokal). Boundary: K-230 sorts LETTERS; K-227 hears a middle sound; here the vowel is found per syllable of a printed word.

**Rejected non-moves.** (1) Theme swap. (2) "Long words" / "two-syllable only": ranges = d3/d1. (3) **Which split is right? (judgement)**: a one-letter shift is a legitimate alternative in sv/de/fr (`kloc-ka`/`klock-a`, `Ka-tze`/`Kat-ze`, `voi-ture`/`voi-tu-re`), the count-changing distractor of a 2-syllable word is the unsplit word, and printing a correct split labelled "wrong" breaches §20.7; no source can make a distractor's wrongness gate-provable. Pedagogy upheld. (4) **Syllable boxes** (the pedagogy's F2): a length-proportional box prints the boundary, a uniform box is K-318's Sound Strip shape, and against Write it is a scaffold delta (rule 4); dropped for Vowel King, whose "grapheme-layer only" rejection is refuted by data (vowel-run eligibility 95-100 % of every texPool in 9 locales). (5) Compounds = G2-316. (6) Split a sentence: frame words are not in approved-words. (7) Digit answers = K-233 / K-234. (8) fi pre-split task words print the answer; `tavutettu` is a strip flag (OPEN 4). (9) Grapheme boxes under arcs = K-318 Face 5. (10) Trace the split word = K-284. (11) d1/d3 re-labelled: ranges.

## 4. Native rebuild plan x11

Unit = a per-locale DATA decision in `data/b3/syllable-split.js`; the code substitutes literals and never inflects or infers a split. `mark` draws the base's blank zone only; the child's pencil mark is not machine-checked.

| loc | convention: drawn / written | panel authors | refusal rule | traps |
|---|---|---|---|---|
| en | arcs ("scoop"); rewrite `rab-bit` | 6 titles/instructions, example | Missing Syllable ships on 4 themes, Scramble on none, Vowel King refused (data) | 397/607 multi-syllable entries are rule-only VC/CV (`ac-orn`, `kiw-i`): never print a boundary from the full pool |
| de | Silbenbögen; rewrite keeps the capital `Ka-me-ra` | example `Ba-na-ne`, `sortLabels` `2 Silben / 3 Silben`, Silbenkönig instruction | none beyond base | only cell 1 keeps the capital in tiles and cloze; `ei au eu äu ie` are one king |
| es | barras; guiones | `bisílabas / trisílabas`, example `ca-me-llo` | texPool on the three boundary faces (`cray-o-nes`) | `qu gu ll ch` arrive whole from the approved split |
| pt | barras; hífen | `dissílabas / trissílabas`, level 1º or 2º ano | texPool (`hie-na`) | hiato vs ditongo is the point; never "simplify" |
| fr | arcs ("entoure les syllabes"), syllabes écrites | `2 syllabes / 3 syllabes`, example `la-pin`, Vowel King refused | `refuse.finalMuteE:true` default (430 of 723 multi-syllable entries lack TeX, almost all mute-e); the panel may flip it | texPool fruits 2 / vehicles 7 / ocean 7 refuse Missing Syllable and Scramble |
| it | barre; trattini | `bisillabe / trisillabe`, example `ta-vo-lo` | texPool (`pi-pis-trel-lo` is wrong: s impura goes right) | doubles split `gat-to`; `gl gn sc` whole |
| nl | arcs or streepjes; LETTERGREPEN | `2 / 3 lettergrepen`, `vowelExtra:['ij']`, head confirmation | none beyond base | a klankgroepen title contradicts the method book; `ij` is one letter and one king |
| sv | bågar; rewrite `klock-a` | `2 / 3 stavelser`, level | none; the carve-out IS the school convention (§A.13.57) | never `grupp`; citation singular only (`bana`/`banan`) |
| da | buer; rewrite | `2 / 3 stavelser` | `strictPool:'policy_managed_absent'` -> fruits, vehicles, zoo, body, ocean, pets refused; Sort on clothing + house only | TeX-accepted, no `da.js` (deliberate) |
| no | buer; rewrite `klok-ke` | `2 / 3 stavelser` | pets refused (6) | do NOT import sv's `ck`/`ng` coda; geminates split |
| fi | tavuviivat on the printed word; hyphens `ka-me-ra` on Write | `2 / 3 tavua`, an `instructionTavutettu` literal (OPEN 4) | none | the instruction is a whole authored literal (case); 12+-letter house/clothing words fall to d3 or are refused |

Every panel also authors 6 titles (<= 70, no worksheet-word, unique in band), 6 instructions (one imperative <= 150 chars), the skill sentence, slug + name, topicMeta.

## 5. Data + gates

**Approved-words read.** `entries[]` fields: `key` (join = `vocabKey`), `word`, `split`, `count`, `sources_agreed`, `total_agreed`, `policy_managed` (da). Not read: `chunks`, `wiktionary_ipa`, `notes`. MEASURED 2026-09-13, multi-syllable entries / lacking `'TeX'`: en 607/397 · de 876/0 · es 932/210 · pt 869/179 · fr 723/430 · it 963/145 · nl 766/0 · sv 758/44 · da 586/0 (strict 275) · no 608/0 · fi 1106/130. In en/es/pt/fr/it/fi "lacks TeX" === `total_agreed === 2` (rule + vocab-phonics-syl agree on the COUNT only). Pool rule: count-only faces (base, Write, Sort) use the full approved pool; boundary-printing faces (Missing Syllable, Scramble, Vowel King) use the texPool. da: `policy_managed:false` never occurs; strict = the 402 entries where the field is ABSENT.

**`data/b3/syllable-split.js`** (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js`, the b2 pattern; both TBD, owned by the first design in the batch), per locale:
```
{ mark:'arc'|'bar', hyphen:'-', casing:'keep'|'lower', kings:true|false,
  vowelExtra:[], strictPool:null|'policy_managed_absent', refuse:{ finalMuteE:false },
  sortLabels:{ 2:'2 Silben', 3:'3 Silben' }, example:{ vocabKey:'banana' },
  instructionTavutettu:null|'Ta-vu-ta sa-nat.', exclude:['vocabKey'] }
```
`boundaryPool` is per FACE (fixed in the spec), not per locale.

**`tools/validate-b3-draft.js` rules (syllable-split part).** 6 x `{title, instruction}`: no worksheet-word, title <= 70 and unique in band, instruction <= 150 with an end mark; skill `{full 60-180, short 15-90}`; family `{slug ASCII-kebab, name}`; `mark` in the enum; `sortLabels` both present and distinct; `example.vocabKey` approved with count 2-3 AND in the texPool AND king-eligible in that locale; `exclude` keys exist; `instructionTavutettu` only in fi; da `strictPool` set; nl titles contain no "klankgroep".

**`tools/gate-syllable-split-data.js`** (node, every locale x theme x face before a wave; prints words checked per cell, 0 checked = FAIL):
1. every fanned word is in the approved file (poison: `{vocabKey:'zebra', word:'sebra'}` in a fake pool -> FAIL "not approved");
2. stamped `data-lcs-split` === approved `split` (poison: stamp `kam|era` -> FAIL);
3. `count >= 2` and within the face's range; Scramble `min3` met;
4. boundary faces: `'TeX'` in `sources_agreed` (poison: en `acorn`, sources `[rule, vocab-phonics-syl]` -> FAIL);
5. da: `policy_managed` absent (poison: `policy_managed:true` -> FAIL);
6. fr: no final mute-e when `refuse.finalMuteE` (poison: `voiture` -> FAIL);
7. rendered text never contains a separated form of the item's own word (poison: cloze renders the blank as text -> FAIL);
8. Scramble order !== identity; Sort 4:4 and collation order; cloze box === 4 cells; Vowel King kings re-derived from `vowels[loc] + vowelExtra`, example absent from cards;
9. Baloo 2 advance of every printed cell letter <= cell - 2 (measured in the browser, poison: a 30 px `W` in a 24 cell -> FAIL);
10. pool >= `minNouns` per cell or the cell is recorded REFUSED, never filled.

**`tools/gate-variation-distinct.js`** compares resolved `difficulty[2]` against the base's published d2; it reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS`, so a b3 wave file / rows list is required before it sees G1-305 (critic OPEN 11). Expected: 5 distinct configs (poison: Write without `mode` and with base ranges -> FAIL).

**QA lint** (`qa/lints.js`): every stage / lane stamps `[data-ws-content]`; overflow, palette, min-text 9 px as today.

## 6. SEO plan

| face | title pattern (`{head}{sep}{Theme}`; faces `{act noun}{sep}{Theme}`) | meta MIDDLE | h1 / eyebrow / strand | hub coordinate |
|---|---|---|---|---|
| base | `Syllable Division: Animals` · `Silbenbögen: Tiere` · `Découper les mots en syllabes : les animaux` | instruction if it fits 120-170, else `skill-sentences.<loc>.syllable-split.full` | title / G1 label / phonological-awareness row of `strand-names.ts` (de "Laute & Silben") | `{type:'syllable-split', mode:'base', theme, level:G1}` |
| Write | `Write the Word in Syllables: Animals` · `Wörter in Silben schreiben: Tiere` | "the word is printed, copy it with a hyphen at every break" | G1 label | `{…, mode:'rewrite'}` |
| Missing Syllable | `Missing Syllable: Animals` · `Fehlende Silbe: Tiere` | "one syllable is a box, say the picture and write it" | G1 label | `{…, mode:'cloze'}` |
| Scramble | `Syllable Scramble: Zoo Animals` · `Silbensalat: Zootiere` | "the syllables are mixed up, put them in order and write the word" | G1 label | `{…, mode:'scramble'}` |
| Two or Three | `Two or Three Syllables: Fruits` · `Zwei oder drei Silben: Obst` | "split each word and write it under 2 or 3" | G1 label | `{…, mode:'sort'}` |
| Vowel King | (en/fr none) · `Silbenkönig: Tiere` · `La vocal de cada sílaba: animales` | "the arcs are drawn, dot the vowel in every syllable" | G1 label | `{…, mode:'kings'}` |

Titles <= 70, no worksheet-word (the engine appends it), unique per band; `sep` is the locale's colon rule (fr ` : `). JSON-LD `LearningResource` with `educationalAlignment.targetName` = RF.1.3.e (en) or the framework NAME (others); no `targetUrl`. `level` = the emitter's G1 band-table key per locale.

Non-cannibalisation (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs K-233 (Count the Syllables) | K prints a digit box; here the word is printed and MARKED, no digit anywhere | 0.20 |
| base vs K-318 Face 5 (Syllables and Sounds) | K-318 prints arcs and asks for graphemes in boxes, the word never printed; here the word is printed and the arcs are the child's | 0.30 |
| Write vs G1-244 (Write the Word) | G1-244 prints no model; here the model is printed and the hyphens are the task | 0.30 |
| Missing Syllable vs K-224 (Missing Letter) | letter cloze vs syllable cloze; "syllable" never "letter" | 0.20 |
| Scramble vs K-231 (Build the Word) / G1-306 | tiles are syllables of one pictured word, not letters, not a table | 0.20 |
| Two or Three vs K-234 (Sort by Syllables) | K draws a line to a numeral; here each word is WRITTEN split under a heading, G1 | 0.35 |
| Vowel King vs K-230 (Vowels and Consonants) | K sorts letters; here the vowel is found inside each syllable of a word | 0.20 |
| Vowel King vs base | arcs printed vs arcs drawn; the dot is the task | 0.40 |

Boundary sentence on every landing: "The word is printed in full; the child shows where it breaks" (against K-318 "no letters are shown" and K-233 "write how many"). Vowel King copy never uses the base head.

## 7. Hub visibility contract

A face appears under `syllable-split` on `/[locale]/worksheets` IFF all four hold (brief, "Hub visibility contract"):
1. `apps.syllable-split` exists in `frontend/config/topics-taxonomy.json` (missing = the type is rendered NOWHERE in the rail); measured 2026-09-13: absent, registrar required;
2. `axes['exercise-type'].syllable-split` has `slug` + `name` in all 11 locales;
3. exactly one landing per face per locale with `coordinate.type === 'syllable-split'` verbatim, the G1 level key from the band table, a unique slug, and `canonicalDeckSlug` = the published deck; a face REFUSED in a locale (Scramble en, Vowel King en/fr) has NO landing there and the gate's expectation for that locale is lowered explicitly, never padded;
4. the landing JSON is committed and DEPLOYED (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=syllable-split`, expecting 6 rows per locale except en 4 and fr 5 (63 total). Measured 2026-09-13: this script does not exist (`scripts/verify-worksheets-hub-order.js` and `verify-worksheets-hub-render.js` are the nearest siblings); it must be written and poison-tested (a short locale and a wrong `coordinate.type` must FAIL) before the `apps.syllable-split` registration lands.
