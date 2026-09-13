# G1-306 `syllable-reading` - FINAL design (editor-critic merge, 2026-09-13)

Merged from `_work/G1-306-pedagogy.md` + `_work/G1-306-design.md`; every file, primitive and option named below was read in the repo (record: `_work/G1-306-critic.md`). Pool numbers are MEASURED 2026-09-13 (`approved-words-<loc>.json entries[]` joined to `lib/b2-common.js entriesFor(theme, loc)` over the 50 colour dirs of `scripts/worksheet-gen/cache/manifest.json`, `B2_EXCLUDE` applied, distinct by key then word, `/^\p{L}+$/u`, da `policy_managed !== true`). "texPool" = entries with `'TeX'` in `sources_agreed` (the G1-305 rule: every face that prints or depends on a `split` draws from it).

## 1. Identity

| field | value |
|---|---|
| id / key | `G1-306` / `syllable-reading` (NEW family: `apps.syllable-reading` `{default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'syllable-reading'}` + `axes['exercise-type'].syllable-reading.{slug,name}` x11; registrar clone of `tools/register-b2-taxonomy.js NEW_FAMILIES`; measured: neither exists; none of the 11 slugs below collides with an existing axis slug) |
| band | G1 in all 11, all six faces; no K face. Variation ids `G1-311+ (TBD by the emitter)` |
| skill boundary | BLENDING from print: the unit (syllable / onset+rime / sound-out word) is PRINTED, the child reads it, finds its picture, writes it. Never: produce a split (G1-305), a grapheme per box (K-318), scrambled letters (K-231), a missing letter (K-224), a K sight word matched by a line (K-225), tracing (K-239 / K-284) |
| theme axis | `themeAxis:{applicable:false}` (K-239 precedent; `enumerate.js` emits one instance per (type, difficulty, locale), theme part `nothm`). Measured: the best single theme holds 8 words of one consonant family (es around the house, c), most 0-4. Pictures come from the whole pool via NEW `lib/b3-picture-index.js` (§2) |
| three rebuild SHAPES (locale DATA `shape`, not a face) | **S** syllable rows es pt it fr de fi · **R** onset+rime word families en · **B** sound-out word rows nl sv da no; ONE apparatus for all three (§2) |
| fan lever | the UNIT (S consonant family · R rime pair · B vowel). nt20-C ships ONE exemplar unit per face per locale; the fan is the additive `unitAxis` knob (§2) |
| eligible pool (texPool / all) | en 796/796 · de 703/703 · es 592/760 · pt 561/713 · fr 298/644 · it 653/770 · nl 732/732 · sv 660/668 · da 295/295 · no 584/584 · fi 679/780 |
| CCSS (en only; framework NAME elsewhere) | base + Circle + Complex RF.1.3.b · Join + Carpet + Syllabified RF.1.3.e |
| data | approved-words (unit, split, count, sources) + raw vocab (picture, join key, display case) + `data/b3/syllable-reading.js` (§5) |

| loc | shape | genre head (title of the base) | ASCII slug | G1 label |
|---|---|---|---|---|
| en | R | Word Families: Read and Write | `word-families` | grade 1 |
| de | S | Silbenteppich lesen | `silbenteppich` | 1. Klasse |
| es | S | Silabario: sílabas ma me mi mo mu | `silabario` | primer grado |
| pt | S | Família silábica (NOT "família de palavras", 4º+) | `familia-silabica` | 1º ano |
| fr | S | Lecture de syllabes | `lecture-de-syllabes` | CP |
| it | S | Sillabe da leggere: MA ME MI MO MU | `sillabe-da-leggere` | classe prima |
| nl | B | Zoemend lezen | `zoemend-lezen` | groep 3 |
| sv | B | Ljuda ihop ord (K-318 owns `ljuda-ord`) | `ljuda-ihop-ord` | åk 1 |
| da | B | Lydrette ord: læs og skriv (K-318 owns `lyd-for-lyd`) | `lydrette-ord` | 1. klasse |
| no | B | Lydrette ord: les og skriv (K-318 owns `lydering`) | `lydrette-ord` | 2. trinn |
| fi | S | Tavutaulukko | `tavutaulukko` | 1. luokka |

Heads from `_PANEL-FINDINGS.md` §4; the panel may rename. The Nordic heads (lydrette ord, ljuda, zoemend lezen) are carried by the BASE, not by a ladder face.

## 2. The base page

**Concept.** "Read the carpet, then find each picture's first piece on it and write it." Top: a white reading carpet, two rows of cells read aloud left to right, a dashed read-tick circle at the end of each row. Below: six cream cards, a picture over one school-line lane. S: cells are syllables (`ma me mi mo mu` / `pa pe pi po pu`), the child writes the picture word's FIRST syllable. R: cells are `onset|rime` words of two rime families (`b|at c|at h|at m|at s|at` / `c|an f|an p|an v|an swan`), the rime printed on the lane in coral, the child writes the onset. B: cells are ten sound-out words (`kat vos vis bus bol` / `kip hen lam os tas`), the child writes the whole word. The target word is never printed on its card; the carpet is the same scaffold class as a word bank. Distinct from K-318 Blend (graphemes in boxes, circle a picture), K-231 (letter bank), G1-305 (word printed whole, split drawn), K-221 (first LETTER, nothing printed to read).

**Layout d2 (px).** Page 703x945, `.ws-page` padding 0 14 -> inner 675 (`page/page.css:16-26`); body ≈ 760 (UNKNOWN exact, engineer measures). `cardGrid({cols:3, rows:2})` (`templates/layouts/card-grid.js`): `.ws-cardgrid` gap 14 -> card 215x285; `.ws-card` padding 12 + border 2 -> inner 187x257; `.ws-card-stage` padding 6 4 (`page.css:156`) -> 179 usable.

```
+---------------- carpet 675x160: white, teal 2 frame r16, padding 12 ----------------+
|   +----+ +----+ +----+ +----+ +----+  ( )    cell 64x64, gap 8, Baloo 2 700 30 ink   |
|   | ma | | me | | mi | | mo | | mu |  tick   white / tealSoft alternating            |
|   | pa | | pe | | pi | | po | | pu |  ( )    read-tick: dashed coral circle r14       |
+------------ row width 5x64 + 4x8 + 12 + 28 = 392, centred in 651 -------------------+
                                       gap 16
+-- card 215x285 --+ +-- card 215x285 --+ +-- card 215x285 --+   cardGrid 3x2, gap 14
|[1] [picture 128] | |[2]               | |[3]               |   inner 187x257
|  ______________  | |   syllableLane   | |                  |   lane 151x60 glyphH 30
|  - - - - - - -   | |   151x60         | |                  |   school lines in a
|  ______________  | |                  | |                  |   dashed coral frame
+------------------+ +------------------+ +------------------+   row 2 = cards 4-6
```

Vertical: carpet 24 + 2x64 + 8 = 160; + 16; cards (760 - 176 - 14) / 2 = 285. Card stack 6 + 128 + 12 + 60 + 6 = 212 <= 257, centred. Floors (`density.G1`, `primitives/_tokens.js:69`: element 44, answer 26, items 6-12): picture 128, cell 64, glyphH 30, six items.

**Cell width.** `cellW = clamp(64, textW + 12, floor((651 - 40 - 8(V-1)) / V))`; font 30 for <= 3 chars, 26 for 4-5. Resolved: S 5 vowels -> 64 (392) · fi V = 8 (`ka ke ki ko ku ky kä kö`) -> 64 (608) · R 5 cells at 96 (`clock`, `swan`) -> 552 · B 4-letter words -> ~80 (472). `textW` is UNKNOWN until rendered (no font metrics in `build()`): the gate measures the widest cell in the browser, advance <= cellW - 8 (OPEN 1). Wider = refuse the unit.

**Ladder (resolved `difficulty`).**

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| carpetRows / cell / cellFont | 1 / 72 / 32 | 2 / 64 / 30 | 3 / 56 / 28 |
| cards / cols / rows / pic | 4 / 2 / 2 / 160 | 6 / 3 / 2 / 128 | 8 / 4 / 2 / 88 |
| lane w / h / glyphH | 200 / 72 / 36 | 151 / 60 / 30 | 126 / 56 / 26 |
| perRowMin / structure | 2 / simple | 2 / simple | 2 / simple |
| minCount / maxCount (S) | 2 / 2 | 2 / 3 | 2 / 4 |

d1 card 330x317 (inner 302x289, stack 256); d3 card 158x261 (inner 130x233, stack 166). Guards key on `d.structure` / `d.choices` / `d.join` / `d.colourMode` / `d.mode`, never the level index.

**Eligibility, in order.** texPool (also removes the es `play-a` class, §5) -> `/^\p{L}+$/u` -> pictured key (`excluded(key, loc)`, no BW dir) -> `count` in bounds (R and B `count === 1`) -> the unit is a cell of the rendered carpet by EXACT equality (S `split[0].toLocaleLowerCase(loc)`; R `word === onset + rime`; B `word`) -> `ban` / `whitelist` -> da strict pool -> `distinctByWord` -> distinct units. Carpet = `units[f .. f+carpetRows-1]` of the locale bank (`f` = the unit index; the wave uses `exemplar`). `sampleEntries(rng, pool, d.cards, 'G1-306')` (`lib/b2-common.js:64`) throws when short; the floor per (face, unit) is 8 or the cell is REFUSED and recorded, never filled.

**Answer hiding + uniqueness.** Card stamps `data-lcs-word` (display form), `data-lcs-vocab`, `data-lcs-unit` (S `split[0]` lowercased · R the onset · B the word), `data-lcs-count`, `data-lcs-face`; carpet `data-lcs-carpet`, per row `data-lcs-row="ma|me|mi|mo|mu"` (+ R `data-lcs-rime`); lane `data-lcs-syllable-lane` (+ R `data-lcs-printed`). One approved `split[0]` per word and distinct cells -> exactly one match. `verify(page)`: stamped unit is a cell exactly once; cells and card units distinct; visible card text empty (R: only the rime); lanes === `d.cards`; `img.naturalWidth > 0`; carpet width <= 651; read-ticks === carpetRows and unfilled; `data-lcs-structure === d.structure`. Node re-derivation in `tools/gate-syllable-reading-data.js` (§5).

**Primitives / components.** Reused: `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-lane .ws-pill .ws-tile .ws-tilerow`; `writingRow({w,h,glyphH,xHeight:true})` (`primitives/trace-path.js:681`); `rulingBlock` (`templates/components-b2.js:58`), `wordTiles` (`:26`), `pillChoice` (`:226`; `{key,label}` -> `.ws-pill data-lcs-pill`), `countBadge` (`:243`); `svgRoot roundedRect circle label line el esc` (`primitives/_svg.js`); `displayWord excluded distinctByWord sampleEntries fileUri` (`lib/b2-common.js`); `manifest` (`image-cache/resolve.js`); tokens `T.teal T.tealSoft T.coral T.white T.ink T.grid`, `codeColors` (Carpet only). NOT used: `letterBoxes` (leaks length), K-318's `soundBoxes`, G1-305's `syllableArcs` / `syllableWord`, `strokeWordLane` (no model to trace), `alphabetStrip` (28 px cells), `wordBank` (wraps; loses the row order that IS the pedagogy).
NEW in `templates/components-b3.js`: `syllableRow({cells, cell=64, cellW, gap=8, fontPx=30, tick=true, rime=null})` (cells `roundedRect r10`, fill alternating `T.white` / `T.tealSoft`, `T.teal` 2 stroke, centred `label` Baloo 2 700 `T.ink`; R cells = onset `tspan` ink + rime `tspan` `T.coral` with a 1 px `T.grid` seam; tick = `circle r14` white, `T.coral` 2.5 dash `5 4`, `data-lcs-readtick`; stamps `data-lcs-row`, `data-lcs-cells`) · `syllableCarpet({rows, ...rowOpts})` (`<div data-lcs-carpet data-ws-content>`, white, `T.teal` 2 frame r16, padding 12, row gap 8; `carpetRows:0` renders nothing) · `syllableLane({w, h, glyphH, printed=null})` (`writingRow(...).svg` in a dashed `T.coral` 2.5 r10 white frame; `printed` = the R rime, Baloo 2 700 `0.9·glyphH` `T.coral`, anchor end; writable width `w - textW - 12` >= 60 or refuse; stamps `data-lcs-syllable-lane`, `data-lcs-printed`) · `syllableJoin({tokens, fontPx=26, tileH=44})` (`wordTiles` in `split` order, a `T.teal` "+" between tiles, `data-lcs-join=n`) · `colourRing({color})` (`circle r20 fill codeColors[color] stroke T.teal 2`, `data-lcs-colour`) · `numberedBank({items, iconPx=64})` (`.ws-scene-banner` of pictures with `countBadge(i+1)`; `data-lcs-bank-index`, `data-lcs-vocab`).
NEW `lib/b3-picture-index.js`: `pictureIndex()` = `vocabKey -> [{theme, noun, px}]` from `manifest().themes[t].nouns[n].vocabKey`, skipping dirs `/\bbw$/i` (the 9 cached BW dirs are all `<theme> bw`); `pictureFor(rng, key, loc)` applies `excluded`, returns `fileUri(theme, noun)` (precedent: `resolve.js labels()`).

**Locale slot structure.** `i18n/strings.<loc>.json` keyed by id (`G1-306` + five face ids) `{title, instruction}`; `i18n/skill-sentences.<loc>.json` key `syllable-reading` `{full, short}` (new); taxonomy slug + name; `frontend/messages/<loc>.json topicMeta.syllable-reading`; `data/b3/syllable-reading.js[loc]` (§5). Titles may carry `{UNIT}`; the wave panel writes the exemplar literally. Nothing is inflected: `displayWord(singular)` only (de keeps the capital).

**Fan (`unitAxis`, ONE contract shared with K-317).** `render/render-instance.js:22` calls `type.build({theme, difficulty, locale}, {rng})`; `enumerate.js` fans themes and variants only. `unitAxis` = K-317 §2's `letterAxis` mechanism, field for field, with `letter` renamed `unit`: spec `unitAxis:{applicable:true}`; plan `unitsPerType` + `unitOverrides` (pin); `instance.unit` from `bank[loc].units`; deck id suffix `-u<asciiFold(unit)>`; `instanceSeed({unit})`; `build()` receives `unit`; `variant_id + '-' + unit`; `{UNIT}` from `units[].label`. K-317 adopts the name (OPEN 2; neither is built). Until then `build()` reads `bank[loc].exemplar` and only the exemplar deck per face ships.

**Alternatives.** (A) one-row banner + 8 cards 4x2 + `answerBox` 100x52: the consonant is given, a numeral box is no place for a syllable, en rime pages at 8 cards reach the floor once. (B) B locales as six rows [pic][spaced letters][lane]: the target is printed on its own row and copied (K-318 Blend minus the choice). (C) K-318 row shape: lane glyphH 20 < 26. **Recommendation: the carpet over six cards, one apparatus for S, R and B.**

**Risks -> mitigations.** Exact-match membership drops accented / digraph starts silently -> `tools/gen-b3-syllable-reading-draft.js` lists every `split[0]` per family with counts. R rimes never derived from spelling -> panel literals, gated `count === 1`, approved, `word.endsWith(rime)`. de capital -> lowercase carpet, verify case-folds. Nordic thinness -> `simple` pools nl 48 · sv 52 · no 28 · da 35: the base ships; vowel fan only where a vowel reaches 8 (nl a 16 o 13 e 9, sv å 10; no / da seed only). **Print check:** cell 64 = 16.9 mm, syllable 30 px ≈ 7.9 mm, lane 60 = 15.9 mm, tick 28 = 7.4 mm; mono laser tealSoft ≈ 10 % grey, teal ≈ 60 %, dashed coral ≈ 45 %, the R coral rime mid-grey beside ink onsets with the seam; nothing within 14 px of the edge; smallest text 26; `qa/lints.js` runs on fi + de renders before any copy claims a level.

## 3. Faces 2-6

Ids `G1-311+ (TBD by the emitter)`, band G1, `themeAxis:{applicable:false}`, fan by unit like the base. `tools/gate-variation-distinct.js` compares resolved d2: each face changes at least one knob. "Ships" = MEASURED texPool >= 8 per (face, unit).

### Face 2 - Circle the Syllable (CODE `choices:3`)
EN "Which Syllable Do You Hear? Circle It". **Move:** recognition before production; the child circles the unit the picture starts with; no writing. **Layout:** carpet 1 row (88); 6 cards 2x3 (330x209, inner 302x181): picture 96 + 10 + `pillChoice` 3 pills h 44 Baloo 26 (3x72 + 2x14 = 244); stack 162. **Config** `{carpetRows:1, cards:6, cols:2, rows:3, pic:96, choices:3, maxCellChars:3}`; stamps `data-lcs-face="circle"`, `data-lcs-choice` per pill, `data-lcs-answer` on the card. **Distractors:** S two other cells of the SAME row (`me` beside `ma` for *mano* is unambiguous by the approved `split[0]`); R two other onsets of the row; B two other carpet words; never a spelled prefix of the target; correct index spread over a 20-seed sweep (each index >= 4 of 18). **Verify:** exactly one pill === unit; pills distinct; no lane. **Ships:** every locale (pools = base). **Query face:** "circle the syllable" (encierra la sílaba · Silbe ankreuzen).

### Face 3 - Join the Syllables (CODE `join:true`)
EN "Join the Syllables and Write the Word". **Move:** two ORDERED printed syllables of a 2-syllable word; read each, write the word joined (the mirror of G1-305 Write). Never shuffled (that is G1-305 Scramble). Same shape in all 11 (tiles = the approved `split`). **Layout:** no carpet; 6 cards 2x3 (330x244, inner 302x216): picture 72 + 8 + `syllableJoin` tiles 44 + 8 + `rulingBlock({rows:1, w:302, h:64, glyphH:28})` + 6 = 210. **Config** `{carpetRows:0, cards:6, cols:2, rows:3, pic:72, join:true, tileH:44, minCount:2, maxCount:2}` (d3 2-3); stamps `data-lcs-face="join"`, `data-lcs-split="ma|no"`. **Verify:** tokens join === word case-folded; order === split; tile count === count; no whole word as text; one ruling per card. **Ships (count 2, all pool; texPool subset UNKNOWN exact, OPEN 5):** en 341 · de 326 · es 291 · pt 278 · fr 296 (mute-e refused via `refuse.finalMuteE`, reused from G1-305) · it 263 · nl 292 · sv 298 · da 120 · no 268 · fi 297. **Query face:** "join the syllables" (une las sílabas · Silben zusammensetzen).

### Face 4 - Syllable Carpet: Read and Colour (CODE `colourMode:true`)
EN "Syllable Carpet: Read It, Then Colour". **Move:** fluency read of a full carpet, then colour the cell that starts each pictured word in that picture's colour; no writing. **Layout:** carpet 5 rows at cell 56 (5x56 + 4x8 + 24 = 336); + 16; 6 cards 3x2 (215x197, inner 187x169): picture 100 + 10 + `colourRing` 40; stack 162. fi 8 cells x 56 = 448 + 56 + 40 = 544. **Config** `{carpetRows:5, cell:56, cellFont:28, cards:6, cols:3, rows:2, pic:100, colourMode:true, reps:1}` (d3 8 cards, `reps:2`); 6 distinct `codeColors`; stamps `data-lcs-face="carpet"`, `data-lcs-colour`. **Verify:** no lane; rings distinct; every cell fill white / tealSoft; each target occurs exactly `reps` times; targets from >= 3 rows; non-target cells never equal a target. **Ships:** S every locale (5 of the 7-14 qualifying rows) · R 5 rime rows x 5 cells (3-word rimes filled by read-only cells `mat sat`) · B 25 sound-out words, 6 pictured. **Query face:** the carpet heads (Silbenteppich · tableau de syllabes · tavutaulukko). Mono-print proof of the rings: OPEN 6.

### Face 5 - Complex Syllables (PARAM `structure:'complex'`)
EN "Word Families with Blends". **Move:** the base act on the next decoding step. `{...base.difficulty[2], structure:'complex'}`: the base `build()` branches on `d.structure` from day one (default `'simple'`), so the face adds no code and the resolved d2 differs. **Per shape:** S carpet = two `complexUnits` literals (es `tra tre tri tro tru` / `fra…`; pt tr pr br fl; it tr sc st fr sp br; fr br cr; de tr br kr fl schn bl fr st gl); fi = closed syllables (`kas kis kuk kal`, umpitavu, `C?VC`); R = blend ladders (`bl|ack fl|ag cr|ab dr|um sw|an`), the child writes the BLEND before the printed rime; B = words with a consonant cluster, <= 5 letters (`gris hund katt`). **Ships (texPool, cluster-STARTING first syllables; per-cluster counts in the critic):** es 48 (tr 10, fr 7, br 6) · pt 51 (tr 13, pr 12) · it 92 · fr 25 (br 6 + cr 4: ONE page, or re-target, OPEN 11) · de 101 (tr 12, br 11, kr 10) · fi closed 274 (k 58, p 34) · en 29 short-vowel closed blend words (3 mixed pages) · nl 70 · sv 121 · no 121 · da 60 (B fans by vowel, `a` >= 15 everywhere). **Verify:** every unit matches the locale `complex` rule and none `simple` (control: the same word fails the other face). **Query face:** "clusters" (sílabas trabadas · encontros consonantais · umpitavut · blends).

### Face 6 - Read the Syllabified Words (CODE `mode:'syllabified'`)
EN "Read the Syllables, Find the Picture". **Move:** longer words printed PRE-SPLIT (fi `tavutettu teksti`, de silbierte Wörter); read syllable by syllable, find the picture in a numbered bank, write its number. The split is the given, the number the answer. **Layout:** `numberedBank` of 8 pictures 64 (h 96); + 16; 6 `.ws-lane` rows h 92 (inner 64): word Baloo 2 700 30 in `sepMode` (hyphen `ka-me-ra`, or alternating `T.teal` / `T.coral` syllables) + a 44x44 dashed coral number box at the right; 96 + 16 + 6x92 + 5x8 = 704 <= 760. Two bank pictures are distractors (never numbered), so the last row is not solved by elimination. **Config** `{mode:'syllabified', rows:6, bank:8, pic:64, minCount:2, maxCount:3, maxLetters:10, sepMode}` (d3 8 rows, 3-4 syllables); stamps `data-lcs-face="syllabified"`, `data-lcs-split`, `data-lcs-pic` (hidden index), bank `data-lcs-bank-index`. **Verify:** exactly one bank picture with `data-lcs-vocab === row.vocab`; bank order !== row order; number box empty; no picture twice; words distinct. **Ships (count 2-3, <= 10 letters, texPool):** en 182 · de 454 · es 436 · pt 420 · fr 209 · it 469 · nl 397 · sv 403 · da 175 · no 366 · fi 442. Fan: seed only. **Query face:** "syllabified words" (tavutetut sanat · silbierte Wörter). Boundary: K-225 matches whole K sight words by lines; here G1 words in syllables and a number.

**Rejected non-moves.** Theme swap · syllable DICTATION strip (write the first syllable unaided = segmenting; en = K-221, B = G1-244: refused in 5 locales) · open-ended reading LADDER (no verify; the fluency read lives in Face 4) · "which picture starts with it" (K-318 Blend in another apparatus; reserve only if a panel refuses a face, OPEN 12) · scrambled tiles (G1-305 Scramble) · first syllable given (G1-244) · picture-to-syllable lines · sort by first syllable (K-228) · long words (a range) · middle syllable blank (K-224 / K-227) · trace the syllable (K-284) · capital carpet · d1 / d3 relabelled.

## 4. Native rebuild plan x11

Rows, rimes, vowel order, distractor rules, whitelists and bans are DATA in `data/b3/syllable-reading.js`; the code substitutes literals and never inflects or infers a syllable. Membership is EXACT equality with a cell, so every accented or digraph start the panel wants is its own cell.

| loc | shape | inventory the panel authors | exemplar (est.) | refusal rule | traps |
|---|---|---|---|---|---|
| es | S | rows m p t l s d n b (+ `ca co cu` / `ce ci`, `ga go gu` / `gue gui`, `cha…`, `lla…`, `ña…`); clusters tr fr br pl gr fl | m | `split[0]` not in a row -> skipped (`có-` never matches `co`); not TeX -> skipped | `beach` = `play-a` banned by key (§5); `ch ll rr` one onset; no articles |
| pt | S | `ba be bi bo bu` first; `ca co cu / ce ci`, `ga go gu`, `ch`; `nh lh` refused (<= 8, 1); clusters tr pr br fl | b | as es | nasal `ã õ` out of the 5-vowel row unless added as cells; `x` excluded |
| it | S | `ca co cu / ce ci`, `ga go gu / ge gi`, `sc`; `gn gl` refused (<= 5); clusters tr sc st fr sp br gr cr | m | as es | doubles never split a first syllable (`gat-to` closed = Face 5); accents on final vowels only |
| fr | S | rows may hold digraph vowels (`ma me mi mo mu mé mou`); clusters br cr (25 words); mute-e words fine except on Join / Syllabified | m | `split[0]` not in row; texPool halves the pool (298 of 644) | `chat` one syllable, never a `ch` row; `c`/`g` hard-soft as es |
| de | S | rows `ka ke ki ko ku` (+ `au ei eu` optional) for k g r b m t p l s; clusters tr br kr fl schn bl fr st gl; `sch ch pf qu sp st` one onset | k | as es; `ki` prints with 0 pictured words (the carpet is read, not solved) | nouns keep the capital; the child writes `Ka`, verify case-folds (OPEN 8); `Kuchen` twice in vocab |
| fi | S | rows over 8 vowels (`ka ke ki ko ku ky kä kö`); Face 5 = closed syllables; `ng nk` never split | k (or p, 27) | as es | long vowels / diphthongs (`kaa`, `koi`) out of the simple row; title bare nominative; `[NSR-FLAG][fi]` |
| en | R | 7 short-vowel rimes `-an 5 -ock 4 -ug 4 -at 3 -og 3 -and 3 -ed 3` in pairs (`-an/-ock` 9, `-ug/-at/-og` 10; `-and/-ed` 6 refused); read-only cells `mat sat`; blends bl cl fl gl pl sl br cr dr fr gr tr st sw | `-at` + `-an` | a page below 8 pictured words -> refused | r-controlled (`car star jar`) and 8 long-vowel families (`-ake -ee -oat -ain -ose -ail -ove -ouse`) stay OUT (future face, OPEN 13) |
| nl | B | simple 2-4-letter words, one letter per grapheme (48: a 16 o 13 e 9 i 5 u 5); clusters 70 | a | any multigraph chunk (`aa ee oe ij sch`) excluded by construction | `ij` / `ee` words are not kern-1 material; de/het never printed |
| sv | B | simple 52 (å 10, others < 8); clusters 121 (doubles `katt` = Face 5) | å | `sj tj ng` chunks excluded | bare singular only (`bana`, never `banan`); head "ljuda ihop", never K-318's "ljuda ord" |
| no | B | simple 28 (seed only); clusters 121 | seed | `kj sj skj` quarantined upstream | K-318 owns `lydering`; bokmål only |
| da | B | strict pool (295 pictured; simple 35, clusters 60); per-word WHITELIST (`ræv` final /w/) | seed | absent, managed or not whitelisted -> refused | flat `chunks`: the letter rule is the panel's, not the file's |

Every panel also authors 6 titles (genre heads, <= 70, no worksheet-word), 6 instructions (one imperative <= 150, the child's sentence), the skill sentence, slug + name, topicMeta, `units[].label` for `{UNIT}`. Three-agent native panel per locale; the EN source is handed over as a SOURCE TO AUDIT.

## 5. Data + gates

**Approved-words read.** `entries[]` fields: `key` (join = `vocabKey`), `word`, `split`, `count`, `chunks` (nested graphemes ONLY in de/nl/sv/no: B's "one letter per grapheme" reads them there; da is flat -> whitelist), `sources_agreed`, `total_agreed`, `notes.tex_disagreed_with_rule`, `policy_managed` (da: 402 absent / 392 true / false never). texPool share: en 796/796 (count-1 words carry TeX; the 2-3-syllable subset is 182/470) · fr 298/644 · es 592/760 · pt 561/713 · it 653/770 · fi 679/780 · de nl sv da no ≈ 100 %.

**The es `play-a` defect.** `approved-words-es.json` key `beach` = `split ['play','a']` (rule + vocab-phonics-syl, `total_agreed 2`, TeX said `pla-ya`). Same class, 12 es keys: beach beech-tree crayon crayons dragon-fruit guinea-pig hockey kayak macaw papaya projector ray stingray (the rule treats `y` as a coda). Three guards: (1) texPool excludes all 12 structurally; (2) `ban:['beach', …]` per key in the es bank; (3) pipeline OPEN 15 (fix the es rule's `y`, re-run the gate).

**`data/b3/syllable-reading.js`** (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js`; the `apply-b2-locale.js` / `validate-b2-draft.js` pattern; `data/` gitignored, `git add -f`), per locale:
```
{ shape:'syllable'|'rime'|'soundout', exemplar:'m', casing:'lower', strictPool:null|'policy_managed_absent',
  units:[{ id:'m', label:'sílabas ma me mi mo mu', cells:['ma','me','mi','mo','mu'] }],        // S rows (ordered)
  complexUnits:[{ id:'tr', label:'sílabas trabadas tra tre tri tro tru', cells:[...] }] | { closed:true },  // S Face 5; fi closed
  rimes:[{ id:'at', cells:['b|at','c|at','h|at','m|at','s|at'], readOnly:['mat','sat'] }], blends:['bl','cl',...],  // R
  simple:/^[^V]?[V][^V]?$/u, complex:/(^[^V]{2}|[^V]{2}$)/u, vowels:['a','o','e'],            // B (V = the locale vowel set)
  whitelist:{ vocabKey:true }, ban:['beach'], refuse:{ finalMuteE:false }, sepMode:'hyphen'|'color',
  strings:{ 'G1-306':{title,instruction}, F2..F6:{...} } }
```
`lib/syllable-reading.js`: `unitOf(entry, cfg, face)` -> `split[0]` (S) / the onset when `word === onset + rime` (R) / `word` (B) or null (refuse); `rowFor(unit)`; `poolFor(cfg, face, unitId)`. `tools/gen-b3-syllable-reading-draft.js` PROPOSES cells per family from the data; the panel reviews; only the literal ships.

**`tools/validate-b3-draft.js` (syllable-reading part).** 6 x `{title, instruction}` (no worksheet-word, title <= 70 unique in band, instruction <= 150 with an end mark); skill `{full 60-180, short 15-90}`; family `{slug ASCII-kebab, name}`; `shape` in the enum; cells `/^\p{L}+(\|\p{L}+)?$/u` distinct within a unit; R `readOnly` = consonant onset + rime and NOT pictured; `ban` / `whitelist` keys exist; da `strictPool` set; sv titles never "ljuda ord", nl never "hakken"; `exemplar` is a `units[].id`; `label` <= 40.

**`tools/gate-syllable-reading-data.js`** (node, every locale x face x unit before a wave; 0 words checked = FAIL):
1. every fanned word is approved with `'TeX'` in `sources_agreed` (poison: es `beach`; `{vocabKey:'zebra', word:'sebra'}`);
2. S: `split[0]` case-folded is a cell of exactly one unit, printed verbatim (poison: drop `mu` with a `mu-` word fanned);
3. R: `word === onset + rime`, `count === 1`, no r-controlled / long-vowel rime on `simple` pages (poison: `car` under `-ar`);
4. B: `chunks.flat()` all length 1 and join === word (nl/sv/no); da whitelisted (poison: nl `school`; da `hund` with `policy_managed:true`);
5. Circle: no pill equals or is a spelled prefix of the target; index spread over 20 seeds (poison: `['ka','ka','ke']`);
6. Join: order === split, count 2 at d2; fr mute-e refused (poison: `voiture`);
7. Carpet: targets exactly `reps` times, non-targets never a target, 6 distinct `codeColors` (poison: `ma` twice at `reps:1`);
8. Complex: unit matches `complex` and not `simple`; control: the same word fails the other face;
9. Syllabified: one bank match per row, bank order !== row order, 2 distractors never referenced (poison: 6 bank pictures);
10. rendered `data-lcs-unit` / `data-lcs-split` equals the re-derived value (diff, not trust); no text node equals a stamped word except inside tiles / syllabified rows that ARE the task;
11. browser: widest cell advance <= cellW - 8, lane writable width >= 60 (poison: a 30 px `swan` in a 64 cell);
12. no BW-dir picture, `excluded()` respected (poison: a `zoo animals bw` noun);
13. pool >= 8 per (face, unit) or the cell is recorded REFUSED, never filled. Every poison must FAIL; the correct draft is the control.

**`tools/gate-variation-distinct.js`** reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (measured); a b3 wave file / ROWS source is required before it sees G1-306 (OPEN 4). Expected: 5 distinct resolved d2 configs (poison: Complex at `structure:'simple'` -> FAIL). **QA lint** (`qa/lints.js:32`): carpet, every card stage and every lane stamp `[data-ws-content]`; overflow, footer band, palette, 9 px as today.

## 6. SEO plan

| face | title pattern (S / R / B) | meta MIDDLE (whole description 120-170) | hub coordinate |
|---|---|---|---|
| base | `{head}: {UNIT}` = `Silabario: sílabas ma me mi mo mu` / `Word Families: -at and -an` / `Zoemend lezen: woorden met a` | Read the two rows aloud, then find each picture's first syllable on the carpet and write it | `{type:'syllable-reading', mode:'base', theme:'', level:G1}` |
| Circle | `{head}: circle the syllable` (encierra la sílaba · Silbe ankreuzen) | Say the picture, read the three syllables, circle the one it starts with | `{…, mode:'circle'}` |
| Join | `{head}: join the syllables` (une las sílabas · Silben zusammensetzen) | Read the two syllables in order and write the word joined on the line | `{…, mode:'join'}` |
| Carpet | `{head}: read and colour` (Silbenteppich lesen und färben · tableau de syllabes) | Read the whole carpet, then colour the syllable each picture starts with in its colour | `{…, mode:'carpet'}` |
| Complex | `{head}: clusters` (sílabas trabadas · encontros consonantais · umpitavut · blends) | Read the cluster syllables, then write the one each picture starts with | `{…, mode:'complex'}` |
| Syllabified | `{head}: syllabified words` (tavutetut sanat · silbierte Wörter) | Read each word syllable by syllable and write the number of its picture | `{…, mode:'syllabified'}` |

Titles <= 70, no worksheet-word (the engine appends it), unique per band; `sep` is the locale's colon rule (fr ` : `); the meta lead per locale is read from shipped bytes, never assumed (K-317 critic OPEN 14). h1 = title; eyebrow = the G1 label; strand = the **`'Reading: Foundational Skills'` row of `frontend/lib/seo/strand-names.ts:113`** (de "Schriftspracherwerb: Grundlagen", fi "Lukemisen perustaidot"), NOT the Phonological Awareness row (K-318's). JSON-LD `LearningResource`, `educationalAlignment.targetName` = the CCSS code (en) / the framework NAME (others), no `targetUrl`. `level` = the emitter's G1 band-table key.

Non-cannibalisation (raw 3-gram Jaccard *est.*; `scripts/seo-landing/gate.js` FAIL >= 0.80 measures). Boundary sentence on every landing: "The syllables are printed; the child reads them and writes the word" (against G1-305 "the child shows where the word breaks" and K-318 "no letters are shown").

| pair | what the copy says differently | est. |
|---|---|---|
| base / Join vs G1-305 base / Write | 305 prints the whole word, the child produces the split; 306 prints the pieces, the child produces the word | 0.25-0.30 |
| Join vs G1-305 Scramble | ordered tiles read and joined vs shuffled tiles ordered | 0.35 |
| base-B / Circle-B vs K-318 Blend | 318 = graphemes in boxes, circle 1 of 3 pictures, themed; 306 = ten words on a carpet, write the one that names the picture | 0.30-0.35 |
| base vs K-231 / K-224 | scrambled letters / one blank vs printed units on a carpet | 0.15-0.25 |
| base-S vs K-221 | one letter written from a picture vs a printed syllable chosen from a row | 0.20 |
| base-B vs K-225 / K-239 | lines from whole sight words / tracing a model vs ten decodable words, no lines, no model | 0.30 |
| Syllabified vs K-225 | 2-3-syllable words in syllables + numbers vs whole K words + lines | 0.30 |
| Complex vs base | a distinct sub-skill head with a disjoint unit set | 0.45 |
| Circle vs K-317 F6 (M or N) | a syllable among three of one row vs a letter pair | 0.20 |

## 7. Hub visibility contract

A face appears under `syllable-reading` on `/[locale]/worksheets` IFF all four hold (brief, "Hub visibility contract"):
1. `apps['syllable-reading'] = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'syllable-reading'}` exists in `frontend/config/topics-taxonomy.json` (measured 2026-09-13: absent; registrar `tools/register-b3-taxonomy.js` required);
2. `axes['exercise-type']['syllable-reading']` has `slug` + `name` in all 11 locales (§1 slugs; grep 2026-09-13: 0 collisions);
3. exactly one landing per face per locale with `coordinate.type === 'syllable-reading'` verbatim, the G1 band-table level key, a unique slug and `canonicalDeckSlug` = the published deck (precedent `letter-tracing` in `frontend/content/seo-landing/en.json`: `mode:null, theme:''`; this type uses the `mode` strings of §6);
4. the landing JSON is committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=syllable-reading`, expecting **exactly 6 rows per locale (66 total)**: every face ships in every locale (thinnest cells: fr Complex one page; no / da / sv base seed-only). Measured 2026-09-13: the script does not exist (`scripts/verify-worksheets-hub-order.js` and `verify-worksheets-hub-render.js` are the nearest siblings); it must be written and poison-tested (a 5-row locale and a wrong `coordinate.type` must FAIL) before the `apps.syllable-reading` registration lands; with a future unit fan it counts distinct faces, not landings.
