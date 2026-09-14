# G1-309 `rhyming-words` (G1; K in sv/da/no) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/G1-309-pedagogy.md` + `_work/G1-309-design.md`. Every file, primitive, class and option below was read in the repo (record + what was changed: `_work/G1-309-critic.md`). (m) = re-measured by node 2026-09-14 (scratch `g1309-census.js`: `entriesFor` over the 50 cached colour themes, deduped by WORD, `B2_EXCLUDE` applied). *candidate* = a draft orthographic rule, never a verified rhyme. *est.* = the engineer measures.

**Boundary (load-bearing).** RHYME = a shared rime SOUND (stressed vowel + everything after) between two DIFFERENT pictured words. K-232 (`types/k/K-232-rhyming-pairs.js` = `science-pair-match.js`: 5 pairs, draw a line, `phonological-awareness`, EN data only) owns the line-drawing recognition act; K-226 owns the final LETTER; G1-244 writes the picture's OWN name; G1-306 en shape R "Word Families" PRINTS the rime and the child reads it. No face here draws a line between pairs, prints a rime, asks for a final letter or writes the anchor's own name; every face hears a rhyme and (all but F1) WRITES the rhyming word. The K draw-a-line page for the 10 non-EN locales is NOT a face: it duplicates K-232's mechanic; the fix is a data feed to K-232 (critic OPEN 1).

## 1 Identity

| field | value |
|---|---|
| id / key / band | `G1-309` / `rhyming-words` / base **G1** in en de es pt fr it nl fi; **K level key in sv da no** (Lgr22 förskoleklass "rim och ramsor", Fælles Mål børnehaveklasse "sproglig opmærksomhed", LK20 1. trinn: the K band there already writes 3-5-letter words). fi esikoulu does not write words (OPS 2014) so the fi base is 1. luokka. Faces: F1 = K key in all 11 (`K-325+ TBD`); F2/F4 = base band (`G1-311+`; K key sv/da/no); F3/F5 = G1 key in all 11 (a verse is read; open production). `default_subject: letters`, `default_age_range: 6-8`, `assetClass: icon-placement`, `exerciseType: rhyming-words`. |
| taxonomy | `apps.rhyming-words` + `axes['exercise-type'].rhyming-words` ABSENT (grep = 0, m). Register `apps['rhyming-words'] = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'rhyming-words'}` + slug/name x11 (`tools/register-b2-taxonomy.js NEW_FAMILIES` shape). K-232 stays under `phonological-awareness`. |
| theme axis | `themeAxis:{applicable:false}` on all six: a rhyme pair is cross-theme (cat/hat = animals/accessories); pictures from all 50 colour themes via `fileUri(theme, noun)`, one `pic:{theme,noun}` per bank member. Fan lever = the class SET via `unitAxis` (README ruling: `unit` = class id; no unit = the bank's `exemplar` set). |
| CCSS (en only) | **RF.K.2.a** (recognise AND produce rhymes; no G1 rhyme code exists) on all six; write faces (base F2 F3 F4) add **L.1.2.d**. Non-EN names the national framework only (§20.10). Strand row `'Phonological Awareness'` (`frontend/lib/seo/strand-names.ts:154`, all 11 present, m; pt = "Análise linguística/semiótica"). |
| data | `data/b3/rhymes.js` (§5); render reads it + `fileUri`; never `image-vocabulary.js`, `rhyming-pairs.json` or `approved-words-*.json` at render. |

| loc | genre head (base title root) | ASCII slug | base level key | national strand (name only) |
|---|---|---|---|---|
| en | Rhyming Words (K-232 keeps "Rhyming Pairs", m) | `rhyming-words` | `grade-1` | Phonological Awareness |
| de | Reimwörter (K-232 "Reimpaare", m) | `reimwoerter` | `1-klasse` | Lehrplan Deutsch: phonologische Bewusstheit |
| es (MX) | Palabras que riman (K-232 "Parejas que riman") | `palabras-que-riman` | `primer-grado` | SEP/NEM Lenguajes: conciencia fonológica |
| pt (BR) | Palavras que rimam (K-232 "Pares que rimam") | `palavras-que-rimam` | `1o-ano` | BNCC Língua Portuguesa: rimas em cantigas (EF12LP07, panel confirms) |
| fr | Mots qui riment (K-232 "Les rimes") | `mots-qui-riment` | `cp` (F1 `maternelle` = the "rimes maternelle" gap query) | programmes cycle 2: conscience phonologique |
| it | Parole in rima (K-232 "Coppie in rima") | `parole-in-rima` | `classe-prima` | Indicazioni nazionali: consapevolezza fonologica |
| nl | Rijmwoorden (K-232 "Rijmparen") | `rijmwoorden` | `groep-3` (F1 `kleuters` = the demand head) | SLO kerndoelen: fonemisch bewustzijn |
| sv | Rimord (K-232 "Ord som rimmar") | `rimord` | `forskola` | Lgr22 svenska: rim och ramsor |
| da | Rimord, ALWAYS the compound in every title (bare "rim" = Rimowa SERP; K-232 "Rim-par") | `rimord` | `boernehaveklasse` | Fælles Mål dansk: sproglig opmærksomhed |
| no | Rimord (K-232 "Rimpar") | `rimord` | `1-trinn` | LK20 norsk: rim og rytme |
| fi | Riimisanat (K-232 "Riimiparit") | `riimisanat` | `1-luokka` (F1 `esikoulu`) | OPS 2014 äidinkieli: kielellinen tietoisuus |

Level keys = `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`, m; no = Nordic +1).

## 2 The base page

**Concept.** "Say the picture. Circle the picture that rhymes. Write its word." Six numbered cream rows; each reads left to right: a framed ANCHOR picture, a small teal sound mark, three round CHOICE pictures on dashed rings (one rhymes, two come from two OTHER classes), then a school-line lane where the child writes the name of the picture she circled. No word is printed; the written word is a picture's name, so the answer never appears. Owned skill: rhyme recognition by SOUND plus production of the rhyme word in writing (the write form the panel marks B in en/nl).

**Chrome budget (README ruling).** Body = **814** (1-line chrome), **781** (2-line title), **722** (3-line title + 3-line instruction, both legal). Every stack below is budgeted at **722** with rows `minmax(<min>px,1fr)` (`.ws-cardgrid` rows already `minmax(0,1fr)`, `card-grid.js:12`) so slack is absorbed; the QA lint (overflow + footer intrusion) is the backstop; de/fi/pt renders with the longest title + instruction are the test.

**Layout d2 (G1)**: `cardGrid({cards, cols:1, rows:6, numbered:true})` (`templates/layouts/card-grid.js`, gap 14): (722 - 70)/6 = 108 -> `.ws-card` padding 12 + border 2 (`page.css:126-137`) -> inner **647 x 80**.
```
+[1]---------------------------------------- card 675 x 108 ---------------------------------+
|    +------+   )))   ( pic )  ( pic )  ( pic )    _____________________________              |
|    | pic  |         (  60 )  (  60 )  (  60 )    - - - - - - - - - - - - - -   lane 240x64  |
|    |  64  |  mark    ring76   ring76   ring76    _____________________________  glyphH 28   |
|    +--76--+  20                                                                             |
+--------------------------------------------------------------------------------------------+
   x: 20 | anchor 76 | 10 | mark 20 | 10 | 3 x 76 + 2 x 10 = 248 | 14 | lane 240 = 638 <= 647
```
- `anchorTile` 76: white, `T.teal` 2 solid, r 12, `.ws-icon` 64 (G1 floor 44, `_tokens.js:69`); `margin-left:20` clears the 30 px `.ws-card-badge` (`page.css:139`). Stack 76 / 76 / 64 centred in 80 (slack 4; at 814 the card stretches to 124, content stays centred).
- `rhymeMark` 20: three teal arcs, no letters, `aria-hidden` (the "say it" cue).
- Three `choiceRing` 76: white disc, `T.grid` 1.5 DASHED ring, `.ws-icon` 60. All three identical; the ring is the circle target.
- Lane `writingRow({w:240, h:64, glyphH:28, xHeight:true})` (`primitives/trace-path.js:681`, stamps `data-lcs-prim="writing-row"`); ~9-10 glyphs at 28 *est.* (G1-307's 302 -> 14) -> `maxLetters:10`. Six rows = the G1 floor [6,12].

**K shape** (`BAND_SHAPE.K`, sv da no): `rows:5, numbered:false` (badge dropped to buy lane width): (722 - 56)/5 = 133 -> inner 647 x 105: anchor 100/84, rings 80/64 (K floor 56), `writingRow({w:233, h:80, glyphH:40})` (the K whole-word floor); x: 100 | 10 | 20 | 10 | 260 | 14 | 233 = 647; `maxLetters:7`; 5 rows within K [4,8].

**Ladder** (resolved config; guards key on the config, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| rows / choices / numbered | 5 / 2 / true | 6 / 3 / true | 7 / 4 / true |
| anchorTile / pic | 100 / 84 | 76 / 64 | 64 / 52 |
| choiceTile / pic | 88 / 72 | 76 / 60 | 60 / 48 |
| laneW / laneH / glyphH | 287 / 72 / 32 | 240 / 64 / 28 | 245 / 56 / 26 |
| starter / nearMiss / maxLetters | first glyph of the answer printed (`rulingBlock` `starters`, `components-b2.js:58`) / false / 9 | none / false / 10 | none / true (one `nearMiss` foil per row) / 11 |
| band | `BAND_SHAPE[band]` merged last (K: rows 4/5/6, glyphH 40, maxLetters 7, numbered false) |

d3 at 722: 7 rows -> card 91 -> inner 63: anchor 64 does not fit -> **d3 anchor 60/50, rings 56/46, lane 245 x 56** (rings 56 > G1 floor 44; recorded, d3 does not ship).

**Pool + sampling.** 6 classes per page: anchor + partner from the SAME class; 2 distractors from members of OTHER classes, from two DIFFERENT classes (two distractors that rhyme with each other read as a pair). Every word once per page (24 distinct at d2); no class twice on a page. `sampleEntries(rng, pool, n, 'G1-309')` sample-or-throw. Rhyme position: each of the 3 positions >= 1 and <= 3 per page (re-roll); 20-seed sweep asserts no position constant.

**Answer-hiding + uniqueness.** Row `<div class="ws-card-stage" data-ws-content data-lcs-anchor=<vocabKey> data-lcs-class=<classId>>`; ring `data-lcs-choice=<vocabKey> data-lcs-class data-lcs-rhyme="1|0"`; the lane carries nothing (expected = the `rhyme="1"` choice's `word`, `displayWord`-cased in the answer key). Root `data-lcs-mode` only when a face declares it (base byte-identical). `verify(page)`: per row exactly one ring with `class === anchor class` and it is `rhyme="1"`; the other rings' classes !== anchor's and !== each other; anchor vocab not among rings; rings === `d.choices`; one empty `[data-lcs-prim="writing-row"]` per row, svg width <= laneW; every `img.complete && naturalWidth > 0`; no B&W marker in any `src` (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); no vocabKey twice; no text node equals a stamped word (case-folded, whole word); ring icons >= `density[band].minElement`; d3 foils' `data-lcs-foil` in the anchor's `nearMiss`. Node gate `tools/gate-rhyming-data.js`: every stamped (vocabKey, class) is a bank member VERBATIM; a word in exactly one class.

**Reused (exact).** `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-lane .ws-chip .ws-choices .ws-scene-banner .ws-bank .ws-bankword` (`page.css:126-200, 401-421`); `writingRow`, `rulingBlock({rows,w,h,glyphH,starters,gap})` (`components-b2.js:58`), `wordBank({words,wordPx})` (`:210`), `countBadge` (`:243`); `numberedBank({items, iconPx})` as specified in G1-306 §2 (reused by name); `svgRoot roundedRect circle el label esc`; `fileUri displayWord distinctByWord sampleEntries`; tokens `T.teal T.coral T.grid T.white T.ink`, `F.body F.display`. NOT used: `matchColumns` (the dropped draw-a-line face), `.ws-bin` (fixed `height:170px`, `page.css:234-246`, cannot hold a head + two lanes), `pillChoice`, `chipRow`, `answerBox` (invites a numeral), `strokeWordLane` (a model gives the word), `letterBoxes` (leaks length), `sceneStage`, `.ws-match*`.

**NEW in `templates/components-b3.js`** (absent, m): `rhymeRow({anchor, choices, lane, anchorTile, anchorPx, choiceTile, choicePx, badgeGap=20})` · `anchorTile({src, tile, px})` · `choiceRing({src, tile, px, vocabKey, cls, rhyme})` · `rhymeMark({px=20})` (arcs `M6 5 q6 5 0 10`, `M9 2 q10 8 0 16`, `M12 -1 q14 11 0 22`, `T.teal` 2.5 round caps) · `yesNoChips({px=56})` (two `.ws-chip` with inline `width/height:56px`, inline SVG check `M14 27 l9 9 l17 -18` / cross `M16 16 l20 20 M36 16 l-20 20` in `T.teal` 3.5; no text, no coral: a coral X is the house "crossed out"; `data-lcs-chip="yes|no"`) · `pairCardRhyme({a, b, px, rhyme})` · `rhymeBins({bins, laneW, laneH, glyphH, headTile, headPx})` (three `.ws-lane` columns, inline `padding:10px 10px`) · `coupletCard({pic, line1, line2, lane, fontPx})` · `stringLane({anchor, lanes})` · `ownRhymeCard({pic, word, lanes, laneH, glyphH})`.

**Locale slot structure.** Nothing on the base but pictures and lines. Bank `word` = the citation form the child writes: sv/da/no INDEFINITE singular (`hatt`, `hus`; never `hatten`, never `banan`), nl bare noun (de/het never printed), fi nominative (`kissa`), es/pt/it/fr bare noun (no article, nothing agrees), de `displayWord` keeps the capital (`Maus`; verify case-folds). Rhyme classes are panel literals keyed on SOUND; the code never compares endings.

**Alternatives.** Alt A 2x3 card grid (anchor on top): inner 302x203 at 722 -> lane glyphH 24 < 26 floor; rejected. Alt B K-232's two columns + a lane column, no frames: a 6-year-old loses which lane is whose once half-written; rejected. Alt C (design's face (a)) K draw-a-line via `matchColumns` for 10 locales: K-232's mechanic; dropped (critic).

**Risks -> mitigations.** A rhyming distractor: the class rule + verify (P1). `log`/`dog` under two classes: one class per word (P3). Picture not what its name says (sv #35 `fruits/plum` = a red apple): `picOpened:true` per member, asserted. ✓/✗ read as right/wrong by colour: both teal, identical chips. Thin de bank: F2 one page, F4 refused on the candidates (§4). **Print check:** 703x945 by construction; d2 stack 6 x 108 + 70 = 718 <= 722; rings 76 = 20 mm, pictures 60 = 15.9 mm, glyphH 28 = 7.4 mm (K 40 = 10.6 mm); smallest text 18 >= 9; teal ≈ 60 % grey, dashed grid ring ≈ 20 % on mono laser; no meaning rides on colour.

## 3 Faces 2-6

All five are CODE faces (`mode` knob + a `verify()` branch; `data-lcs-mode` stamped only when declared; base byte-identical); `tools/gate-variation-distinct.js` sees five distinct resolved d2 configs. It reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (`:31-35`, m): a b3 wave file / ROWS list is required first (critic OPEN 6). Floors are on the AUTHORED bank (§4); below floor = REFUSED, recorded, never padded.

### F1 : Rhyme or Not? (K in all 11, `K-3xx TBD`, `mode:'judge'`)
EN "Rhyme or Not?" **Move:** JUDGE a pair (recognition only; no writing, no line). **Layout:** `cardGrid({cols:2, rows:4})`: (722 - 42)/4 = 170 -> inner 302 x 142: `pairCardRhyme` two `.ws-icon` 72 with `rhymeMark(24)` between (188 wide) + `.ws-choices` (padding-top 8, `page.css:183`) `yesNoChips(56)`: 72 + 8 + 56 = 136 <= 142. 4 rhyming pairs (4 distinct classes) + 4 non-pairs (two members of two different classes), shuffled; `yes` cards in both columns, never 4 in a row. 8 cards = K [4,8]; pictures 72 and chips 56 >= K floor 56. **Config** `{mode:'judge', cards:8, yes:4, picPx:72, chipPx:56, nearMiss:false}`; d1 6 cards 2x3 (inner 203: pictures 100, chips 56), non-rhymes differ in vowel AND coda; d3 8 cards, 2 of the 4 non-pairs are `nearMiss` foils. **Verify:** `data-lcs-rhyme === (classA === classB)`; `yes` count === 4; two textless chips keyed yes/no; no vocab twice; d2 never `nearMiss`; correct value not constant over the sweep. **Query face:** "or not" / "Reimt sich das?" / "¿Riman o no?" / "Ça rime ?" / "Rimmar det?" / "Rimer det?" / "Riimiikö?" (nl kleuters, fr maternelle GS = the demand heads). **Boundary:** K-232 matches 5 true pairs by a line; here half the pairs are false and nothing is joined.

### F2 : Sort the Rhymes (base band, `mode:'sort'`)
EN "Sort the Rhymes" (never "word families": G1-306 en owns it). **Move:** CLASSIFY by rime sound, then write: three families on one page. **Layout:** `numberedBank({items:6, iconPx:64})` (h 96, G1-306 §2) + 14 + `rhymeBins`: three `.ws-lane` columns 215 wide, gap 15 (675), inline `padding:10px 10px` -> inner 195: `anchorTile` 120/100 centred (the head, picture only, no printed word) + 10 + 2 x `writingRow({w:190, h:64, glyphH:28})` gap 6 = 264; stack 96 + 14 + 264 = **374** <= 722 (K: lanes 190 x 80 glyphH 40 -> 296; stack 406). Whitespace stays; nothing is enlarged past its floor. Bank order never groups a bin's two members adjacently. `maxLetters` 8 (G1) / 6 (K) on the 190 lane *est.* (engineer measures `Schwamm`, `strand`). **Config** `{mode:'sort', bins:3, perBin:2, bankPx:64, headTile:120, laneW:190, glyphH:28}`; d1 2 bins x 2 (lanes 302 x 72); d3 3 bins x 3 (needs classes >= 4; lanes 190 x 56 glyphH 26; stack 96 + 14 + 120 + 10 + 180 = 420). **Stamps:** column `data-lcs-class data-lcs-anchor`; bank item `data-lcs-bank-index data-lcs-vocab data-lcs-class`. **Verify:** 3 bins from 3 distinct classes; every bank picture's class is exactly one bin's class; 2 per bin; anchors not in the bank; no vocab twice; 6 empty lanes; adjacency 0 over the sweep. **Floor:** >= 3 classes with >= 3 members (m, candidates: 11/11; de 4 = ONE page, §4). **Query face:** "sort" / "Reimfamilien sortieren" / "Familias de rimas" / "Familles de rimes" / "Rimfamiljer" / "Riimiperheet". **Boundary:** G1-306 R prints the rime and the child reads; here the rime is heard and sorted; K-234 sorts by syllable count.

### F3 : Finish the Rhyme (G1 key in all 11, `mode:'couplet'`)
EN "Finish the Rhyme". **Move:** READ a two-line verse, HEAR the missing rhyme, write it (picture cue). **Layout:** six `coupletCard` rows `minmax(113px,1fr)` gap 8 (6 x 113 + 40 = 718 <= 722); row = `.ws-lane` inline `padding:8px 16px` -> inner 93 x 639: `anchorTile` 76/64 left + 12 + text column 551: `<p data-lcs-verse="1">` Nunito 800 18 lh 24 (line 1 ends in the PRINTED rhyme partner, `data-lcs-rhyme-with`), 4, `<p data-lcs-verse="2">` (flex, `align-items:flex-end`, gap 8) text + inline `writingRow({w:170, h:56, glyphH:26})` = 84 <= 93. **Caps (m: Nunito 800 18 px = 7.4-8.1 px/char, README):** line 1 <= 45 chars (365 <= 551); line 2 <= 40 chars before the blank (324 <= 551 - 178); both validator rules; over the cap = the panel rewrites, the code never shrinks below 16 px. **Config** `{mode:'couplet', rows:6, fontPx:18, laneW:170, glyphH:26, cueFree:0}`; d1 4 rows fontPx 20, lane 200 x 64 glyphH 28, answer in a 4-word `wordBank`; d3 7 rows fontPx 17 (rows 97, inner 77: lh 22 + 4 + lane 48 glyphH 24), 2 rows without a picture cue (`couplets[].cueFree:true`). **Verify:** `lines[1]` has the `___` slot once and NOT the answer; `data-lcs-rhyme-with` is a member or `extra` of the answer's class (node gate); answers distinct; the cue resolves; lane empty; d2 `cueFree === 0`. **Floor:** >= 8 verified couplets per locale (panel), else refused. **Query face:** "finish" / "Reimverse ergänzen" / "Completa la rima" / "Complète la comptine" / "Fyll i rimramsan" / "Täydennä loru". **Boundary:** reading-comprehension (6) = passage + questions; here one verse with a picture-cued slot.

### F4 : Rhyme Strings (base band, `mode:'string'`)
EN "Rhyme Strings". **Move:** PRODUCE two rhymes per anchor from a bank that also holds foils (the one face where the child READS the bank and must reject words). **Layout:** `wordBank({words:12, wordPx:18})` (2 rows, *est.* 100-112; build guard as G1-307 §2: estimated pill widths past 2 x 651 -> throw -> refusal, never a 3rd row) + 14 + 4 `stringLane` rows `minmax(141px,1fr)` gap 10 (4 x 141 + 30 = 594; 112 + 14 + 594 = 720 <= 722); row = `.ws-lane` inline `padding:8px 16px` -> inner 125 x 639: `anchorTile` 88/72 + 14 + two stacked `writingRow({w:250, h:56, glyphH:26})` gap 6 = 118 <= 125. Bank = 8 answers + 4 foils (from classes not on the page), shuffled; an anchor's two answers never adjacent in the bank. **Config** `{mode:'string', anchors:4, per:2, foils:4, wordPx:18, glyphH:26}`; d1 3 anchors x 2, bank 8 (2 foils), rows 190; d3 4 anchors x 3, bank 16 (needs classes >= 4; lanes 48 glyphH 24). **Verify:** bank set === 8 answers + 4 foils; each anchor's answers in its class; foils' classes off the page; no adjacency; lanes empty; no anchor word in the bank. **Floor:** >= 4 classes with >= 3 members + >= 4 other pictured words (m, candidates: 10/11; **de refused at 3 usable classes**, §4). **Query face:** "strings" / "Reimketten" / "Cadenas de rimas" / "Chaînes de rimes" / "Rimkedjor" / "Riimiketjut". **Boundary:** the base gives three pictures; here a word bank with foils.

### F5 : Write Your Own Rhymes (G1 key in all 11, `mode:'open'`, open-ended, no `verify()`)
EN "Write Your Own Rhymes". **Move:** OPEN production: invent rhymes. **Layout:** `cardGrid({cols:2, rows:3})`: (722 - 28)/3 = 231 -> inner 302 x 203: header row `[.ws-icon 64][10][word Baloo 2 700 24, data-lcs-word]` 64 + 8 + `rulingBlock({rows:2, w:302, h:56, glyphH:26, gap:4})` 116 = 188 <= 203. The picture's word IS printed (the child needs the sound she rhymes against); NO word bank (the design's 3-word class bank turns "your own" into copying: rejected). 6 cards = the G1 floor; 12 lanes. **Config** `{mode:'open', cards:6, lines:2, glyphH:26}`; d1 4 cards 2x2, 1 lane glyphH 36; d3 6 cards, 3 lanes 48/24. **Layout lints only;** `[data-ws-content]` on every card; the answer key prints "examples" = the class members. **Floor:** >= 6 `productive:true` anchors (a class with >= 2 members the panel expects a child to reach). **Query face:** "your own" / "eigene Reimwörter" / "tus propias rimas" / "Trouve tes rimes" / "egna rimord" / "omat riimit". **Boundary:** G2-278 writes a sentence about a picture; here two rhyme words.

**Rejected non-moves.** K draw-a-line for 10 locales (K-232's mechanic; feed K-232 instead) · theme swap · "longer words" (a range) · first-letter starter as a face (it is d1) · circle the rhyming printed WORD (reading, G1-306 R) · rhyme bingo / memory (two players) · draw the rhyming picture (unverifiable) · nonsense-word rhymes (no picture) · rhyme + syllable count (K-233) · alliteration (K-221/228; here only the d3 `nearMiss` foil) · design's (b) 2 families x 3 (needs 2 classes >= 4: de 1, no 1 on the candidates (m); the 3 x 2 shape clears 11/11) · design's R1 "which does not rhyme" (held in reserve only if F4 refuses in >= 4 locales; the candidates say 1).

## 4 Native rebuild plan x11

The unit is a per-locale DATA decision in `data/b3/rhymes.js`: the panel authors classes by SOUND, the code substitutes literals and never derives a rime from spelling. Every member is a pictured vocab word; verse words that are not pictured live in `extra`. **Candidate census (m; orthographic draft rule: Germanic = one vowel run, rime = vowel run + coda; Romance/fi = penultimate vowel run to the end; deduped by word; `wordsIn` = words inside classes >= 2):**

| loc | classes >= 2 / >= 3 / >= 4 (m) | wordsIn | rhyme definition the panel applies | orthography trusted? | refusals on the candidates | traps |
|---|---|---|---|---|---|---|
| en | 52 / 14 / 3 | 122 | stressed vowel + coda by SOUND | NO (`-ear`: pear/bear rhyme, ear does not, m) | none; write faces use `sameSpelling:true` members only | r-controlled (`car star jar`) + magic-e are classes (`cake` has two vowel runs, so the draft never sees it: panel adds); the K-5 SERP is HARD, the write form is the B lane |
| de | 22 / 4 / 1 | 49 | betonter Vokal + Rest | mostly (ai/ei, äu/eu: `sameSpelling:false`) | **F2 = one page; F4 REFUSED** (candidates `-and -eis -amm` + `-au` = pfau/blau/grau: adjectives; a 4th class by sound, e.g. `Haus Maus Laus`, lifts F4) | capital on display (`Kreis Reis Eis`); `-en/-er/-el` are NOT Reime; `Bett`/`Beet` do not rhyme |
| es (MX) | 103 / 50 / 31 | 386 | rima consonante = vocal tónica + resto | mostly (seseo: `-asa`/`-aza` merge, `sameSpelling:false`) | none | `-ón`/`-ero` classes are endless: `cap:8`; nouns only |
| pt (BR) | 109 / 51 / 29 | 381 | vogal tônica + resto, same timbre | mostly (`ó/ô`, `é/ê` do NOT rhyme: `pêra`/`terra` no) | none | `-ão` one class; `-inho` capped |
| fr | 77 / 23 / 13 | 237 | dernière voyelle prononcée + consonnes prononcées; mute e carries | NO (`-eau/-o/-au` one class; `chat/rat/bras`) | none | `-on` class is rime pauvre: cap; F1 lands "rimes maternelle" at GS |
| it | 125 / 55 / 34 | 479 | vocale tonica + resto | yes | none | `-ino/-ello/-etto` capped; no articles |
| nl | 54 / 16 / 7 | 135 | beklemtoonde klinker + rest | mostly (`ei/ij`, `au/ou`: merge, `sameSpelling:false`) | none | `-en` suffix words are not rhymes; F1 at kleuters is the demand head |
| sv | 32 / 12 / 3 | 80 | betonad vokal + det som följer | yes (`katt/hatt`) | none | NEVER a definite form; NEVER `grupp`; `blå/grå/tå` are adjectives + a noun: panel prunes; `[NSR-FLAG]` |
| da | 40 / 8 / 3 | 93 | by EAR: vowel quality + stød + soft d/g | NO (`ged/vred` no; `bog/tog` yes) | none on the candidates (`-and -us -ort -is -ål` survive after dropping `rød sort blå grå`); F4 at exactly 5 classes | "rimord" in every title; `ø/frø/sø`: `ø` (island) is a doubtful picture; `[NSR-FLAG]` |
| no | 37 / 10 / 1 | 85 | trykksterk vokal + resten (bokmål) | mostly (`tog/skog` differ in vowel: panel rejects) | none (`-opp -is -ort -akk -us -okk` >= 3) | `-er` plurals excluded; K key = 1. trinn; `[NSR-FLAG]` |
| fi | 135 / 63 / 35 orthographic; **108 / 35 / 18 by the approved-split rule** (805 of 879 pictured fi words are in `approved-words-fi.json`, m) | 455 | loppusointu = the last TWO syllables of the approved `split` identical, same vowel length | yes (`tuli/tuuli` no) | none | `-nen` suffix classes capped; a nominative never enters a verse slot: the panel writes the inflected line; `[NSR-FLAG]` |

The candidates are a LIST TO PRUNE, not a bank: colour adjectives, homographs and doubtful pictures fall out; sound-authoring (de `Haus/Maus`, fr `-eau/-o`) adds. Every refusal is decided on the AUTHORED bank by `validate-b3-draft.js`, never on this census. Every panel authors >= 12 classes, `nearMiss` per class, >= 8 couplets, 6 titles (genre head, <= 70, no worksheet-word, unique in band, none of the K-232/K-226/G1-244 titles above), 6 instructions (<= 150, the child's sentence), the skill sentence, slug + name, `topicMeta.rhyming-words`. EN handed over as a SOURCE TO AUDIT. Every panel OPENS every picture it keeps (`picOpened:true` per member, asserted).

## 5 Data + gates

`data/b3/rhymes.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the `apply-b2-locale.js` / `validate-b2-draft.js` pattern, both exist, m; the b3 tools are absent, owned by the batch's first design; `data/` gitignored, `git add -f`):
```
RHYMES[loc] = {
  rule: 'stressedVowelCoda' | 'lastTwoSyllables',           // fi
  orthographyTrusted: false,                                   // en fr da
  exemplar: ['at','og','un','ar','ee','oat'],                  // the class set the wave ships with no unit
  classes: [{ id:'at', rime:'-at', sound:'æt', cap:8,
              members: [{ vocabKey:'cat', word:'cat', pic:{theme:'animals',noun:'cat'}, sameSpelling:true, productive:true, picOpened:true }],
              extra: ['mat','sat'],                            // verse words, never pictured
              nearMiss: ['cap','cot'] }],                      // pictured vocabKeys sharing onset+vowel, d3 foils only
  couplets: [{ id:'cat-hat', lines:['The cat sat on the mat', 'and put on a big ___'], answer:{vocabKey:'hat'}, rhymeWith:'mat', cueFree:false }],
  strings: { 'G1-309':{title,instruction}, F1..F5:{...} } }
```
**`tools/validate-b3-draft.js` (rhymes block; all rules run, exit 1 on any):** (1) every member `vocabKey` exists in `entriesFor(pic.theme, loc)` (so `B2_EXCLUDE` applies), `word === displayWord(singular, loc)` case-folded, `picOpened:true`; (2) `pic.theme` carries no localized B&W marker; (3) a `vocabKey` in exactly ONE class; no two classes share `rime` + `sound`; no member word twice across classes; (4) class size >= 2; `cap >= 3`; F2 needs >= 3 classes with >= 3 members, F4 >= 4 classes with >= 3 members + >= 4 foil words, F5 >= 6 `productive` anchors, base/F1 >= 8 classes >= 2 and >= 24 classified words; (5) `sameSpelling:true` only if `word.endsWith(rime.slice(1))`; where `orthographyTrusted:false` every member carries the flag explicitly and the write faces draw `sameSpelling:true` only; (6) **fi: `rime` === the last two elements of the approved `split` joined, for every member (reads `approved-words-fi.json`; a fi member absent from the file = FAIL)**; other locales: a member present in `approved-words-<loc>.json` with a different `word` = WARN (spelling cross-check; the file is not a gate here because no face shows a split); (7) `nearMiss` keys are pictured and NOT in the class; (8) en: each of the 8 pairs of `data/literacy/rhyming-pairs.json` lands in one class (all 8 survive `entriesFor` and share a draft rime, m); a split pair = FAIL; (9) couplets: `lines[1]` has one `___`, no line contains `answer.word`, `rhymeWith` in `members[].word` or `extra` of the answer's class, line 1 <= 45 / line 2 <= 40 chars, >= 8 couplets else F3 refused; (10) titles: worksheet-word guard, <= 70, unique in band, da titles contain "rimord"; instruction <= 150; (11) `exemplar` ids exist and reach every face's floor.
**`qa/verify-b3-rhymes.js`:** renders face x 11 locales at d2 with a 3-line title + 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean; density asserted (`.ws-icon` >= 44 G1 / 56 K; K rulings glyphH 40; chips 56); 20-seed sweep: base rhyme position not constant, F1 yes/no both >= 3 of 8, F2 adjacency 0, F4 bank never adjacent-pairs an anchor. **Poison** (each must FAIL; the correct draft is the control): P1 a distractor from the anchor's OWN class on a base row (two right answers); P2 `{vocabKey:'lynx'}` (not pictured); P3 `dog` in `-og` AND a second class; P4 a couplet whose line 2 prints the answer; P5 a `zoo animals bw` pic; P6 en `bee`/`tree` split across two classes; P7 fi member whose `rime` != last two syllables of `split`; P8 F1 "non-rhyming" pair drawn from one class; P9 da title "Rim og ramser"; P10 the old 760 base stack under the 722 chrome (footer lint must fire); P11 `spis` under two vocabKeys in one class (the deduplication trap, m).
**Page reads:** `RHYMES[loc]`, `fileUri`; never `image-vocabulary.js`, `rhyming-pairs.json` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "Rhyming Words: Rhyme and Write" · "Reimwörter finden und schreiben" / "Palabras que riman: elige y escribe" · "Mots qui riment : choisis et écris" / "Rimord: hitta och skriv" · "Riimisanat: valitse ja kirjoita" | Circle the picture that rhymes with the first one, then write its word on the line | `{type:'rhyming-words', mode:null, theme:'', level:<G1 key; K key sv/da/no>}` |
| F1 | "Rhyme or Not?" · "Reimt sich das?" / "¿Riman o no?" · "Ça rime ou pas ?" / "Rimmar det?" · da "Rimord: rimer det?" · "Riimiikö?" | Say both words out loud and circle the tick if they rhyme, the cross if they do not | `mode:'judge'`, K key x11 |
| F2 | "Sort the Rhymes" · "Reimfamilien sortieren" / "Familias de rimas" · "Familles de rimes" / "Rimfamiljer" · "Riimiperheet" | Write each picture's word under the picture it rhymes with | `mode:'sort'`, base band |
| F3 | "Finish the Rhyme" · "Reimverse ergänzen" / "Completa la rima" · "Complète la comptine" / "Fyll i rimramsan" · "Täydennä loru" | Read the two lines, look at the picture and write the missing rhyming word | `mode:'couplet'`, G1 key x11 |
| F4 | "Rhyme Strings" · "Reimketten" / "Cadenas de rimas" · "Chaînes de rimes" / "Rimkedjor" · "Riimiketjut" | Find two words in the bank that rhyme with each picture and write them; some bank words fit nowhere | `mode:'string'`, base band |
| F5 | "Write Your Own Rhymes" · "Eigene Reimwörter schreiben" / "Escribe tus propias rimas" · "Trouve tes rimes" / "Skriv egna rimord" · "Keksi omat riimit" | Read the word, think of two words that rhyme with it and write them | `mode:'open'`, G1 key x11 |

h1 = title; eyebrow = level label; strand row `'Phonological Awareness'` per §1. JSON-LD `educationalAlignment` en only: RF.K.2.a on all six, plus L.1.2.d on base/F2/F3/F4; no `targetUrl`. `topicMeta.rhyming-words` (>= 50 chars; says "rhyme and write", never "pairs": `topicMeta.phonological-awareness` already says "rhyming pairs") + `skill-sentences.<loc>.json` via `tools/register-b3-en-content.js` (absent, m). Meta lead inherits `seo.words.free_printable` (README open item 1).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs K-232 | G1, circle + write vs K, draw a line, "pairs" | 0.20 |
| F1 vs K-232 | tick/cross, 8 pairs half of them false vs 5 matched pairs (the closest pair; copy says "some do not rhyme") | 0.30 |
| base vs K-226 / G1-244 | whole rhyming word of ANOTHER picture vs the final letter / the picture's own name | 0.15 / 0.20 |
| F2 vs G1-306 en R "Word Families" / K-234 | rime heard and sorted vs rime printed and read (no "family/families" in en titles) / syllable count | 0.25 / 0.15 |
| F3 vs reading-comprehension · F4 vs base · F5 vs G2-278 | verse + picture slot vs passage + questions · bank with foils vs three pictures · two rhyme words vs a sentence | 0.15 / 0.30 / 0.15 |

Boundary sentence on every landing: "The child hears the rhyme and writes the rhyming word; nothing is joined by a line" (vs K-232).

## 7 Hub visibility contract

A face appears under `rhyming-words` on `/[locale]/worksheets` IFF: (1) `apps['rhyming-words']` exists in `frontend/config/topics-taxonomy.json` (absent, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['rhyming-words']` has `slug` + `name` in all 11 locales (§1 slugs; K-232 keeps `phonological-awareness`); (3) exactly one landing per face per locale with `coordinate.type === 'rhyming-words'` verbatim, the level key of §1 per face (F1 K x11; F3/F5 G1 x11; base/F2/F4 G1, K in sv/da/no), `coordinate.theme:''`, a unique slug, `canonicalDeckSlug` = the published deck; a face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=rhyming-words`. Script absent (m) (nearest siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps['rhyming-words']` lands.

**Expected rows per locale (candidates, m; the authored bank decides):**

| loc | rows | refused / contingent |
|---|---|---|
| en es pt fr it nl sv da no fi | 6 | F3 in any locale whose panel supplies < 8 couplets (es/it are C-tier demand, not a data refusal: they ship if authored); F4 in da if the panel prunes below 4 classes >= 3 (candidates 5) |
| de | **5** | F4 REFUSED at 3 usable classes >= 3 on the candidates; lifts to 6 when the panel authors a 4th class by sound (`Haus Maus Laus`) |

Design total = **65 rows** (10 x 6 + 5); ceiling **66**.
