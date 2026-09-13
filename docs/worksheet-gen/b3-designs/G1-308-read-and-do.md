# G1-308 `read-and-do` (G1) : FINAL design (editor merge, 2026-09-13)

Merged from `_work/G1-308-pedagogy.md` + `_work/G1-308-design.md`. Every file, primitive, class and option below was read in the repo (record + what was changed: `_work/G1-308-critic.md`). (m) = re-measured by node / puppeteer 2026-09-13 (scratch `g1308-measure.js`, `g1308-body.js`, `g1308-title.js`; the shell's own fonts, `page/shell.js buildPage`). *est.* = the engineer measures.

**Boundary (load-bearing).** The child READS one imperative sentence and EXECUTES it with a pencil on a row of pictures. G1-242/251/252 own "colour N nouns COLOUR" on BW art (taxonomy names `Lese-Mal-Blätter · Läs och måla · Lue ja väritä · Lees en kleur · Leer y colorear · Lis et colorie · Leia e pinte · Leggi e colora · Læs og farvelæg · Les og fargelegg`, m); K-064..067 own position words where the ARRANGEMENT is the answer; K-320 owns ordinal NOTATION over a line-up; G2-254 owns passage + questions; K-225 word-to-picture; counting-pictures (14 types) a page of counts. The verb `colour` is NOT in this type (colour art cannot be coloured). Verb set: **circle · cross out · underline · connect · tick/mark · write the number.**

## 1 Identity

| field | value |
|---|---|
| id / key / band | `G1-308` / `read-and-do` / G1 in all 11 (faces `G1-311+ TBD by the emitter`). `default_subject: letters`, `default_age_range: 6-8`, `assetClass: icon-placement`, `exerciseType: read-and-do`. Key ABSENT from `topics-taxonomy.json` (m); register `apps['read-and-do'] = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'read-and-do'}` (the measured shape of `apps['read-and-color']`) + slug/name x11 (`tools/register-b2-taxonomy.js NEW_FAMILIES` shape). |
| theme axis | ON: `{applicable:true, minNouns:8, excludeBw:true}` (`enumerate.js:72,79`). Fan set **animals · fruits · vehicles · toys · zoo animals · farm animals**; countable nouns, min over 11 locales (m): 33 · 20 · 20 · 17 · 29 · 20 (de is the floor in 4 of 6). Any other theme needs its object-form table first (§4). |
| CCSS (en only; national framework NAME elsewhere) | base F1 F2 F5 **RF.1.4**; F3 RF.1.4 + **L.1.1.i**; F4 RF.1.4. Strand row `'Reading: Foundational Skills'` (`frontend/lib/seo/strand-names.ts:113`, all 11 present, m; the `'Language'` row lacks da/no, README ruling 8, not used). |
| data | `data/b3/instructions.js` (§5); `fileUri(theme, noun)`; `B2_EXCLUDE` (`lib/b2-common.js:35`). Cross-check tables (m): `FI_GENITIVES` 1,164 keys (`lcs-grammar.js:599-1766`), `DE_DATIVE_SG` 41 vocab keys (`:1777-1819`), fi partitive 161 keys (`data/b2/sentences.js` `fi.nounForms.partitive`; `data/word-problems/frames.js` repeats 65 of them, adds none). |

| loc | genre head (base title root) | ASCII slug | level key | strand (name only) |
|---|---|---|---|---|
| en | Read and Do (F5 "Read and Draw"; "following directions" in meta) | `read-and-do` | `grade-1` | Reading: Foundational Skills |
| de | Lesen und Verstehen (F5 "Lesen und Zeichnen"; "Leseaufträge" in meta; NEVER "Lesen und Malen" / "Lesen und Ausführen") | `lesen-und-verstehen` | `1-klasse` | Schriftspracherwerb: Grundlagen |
| es (MX) | Lee y haz (F5 "Lee y dibuja"; "comprensión de instrucciones escritas" in meta) | `lee-y-haz` | `primer-grado` | Comprensión lectora |
| pt (BR) | Leia e faça (F5 "Leia e desenhe") | `leia-e-faca` | `1o-ano` | Leitura/escuta |
| fr | Lecture de consignes (F5 "Lis et dessine") | `lecture-de-consignes` | `cp` | Lecture et compréhension de l'écrit |
| it | Leggi e fai (F5 "Leggi e disegna") | `leggi-e-fai` | `classe-prima` | Lettura |
| nl | Lees en doe (F5 "Lees en teken"; rides "begrijpend lezen groep 3") | `lees-en-doe` | `groep-3` | Lezen: technisch lezen |
| sv | Läs och gör (F5 "Läs och rita"; rides "läsförståelse åk 1") | `las-och-gor` | `ak-1` | Läsa och skriva |
| da | Læs og gør (F5 "Læs og tegn"; "læs og forstå" in meta only) | `laes-og-goer` | `1-klasse` | Læsning (afkodning) |
| no | Les og gjør (F5 "Les og tegn") | `les-og-gjoer` | `2-trinn` | Lesing: grunnleggende ferdigheter |
| fi | Lue ja tee (F5 "Lue ja piirrä"; "luetun ymmärtäminen" in meta) | `lue-ja-tee` | `1-luokka` | Lukemisen perustaidot |

Level keys = `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`, m; no = Nordic +1). One band x11; F1-at-K in en/sv/da/nl is recorded, not designed.

## 2 The base page

**Concept.** ONE ordered strip, SIX instructions. A cream panel holds eight colour theme pictures on white tiles, a coral start flag + arrow above (the direction cue) and a dotted mark band below. Under it a numbered list of six full imperatives, each with a dashed "done" box. The child reads a line, finds the picture(s) on the strip and DOES it: rings the tile, crosses it, underlines or ticks in the band, joins two band dots, or writes a count in the row's box. Six verbs on three zones (tile / band / list); mark targets are DISJOINT across rows (composer + verify). The pedagogy's per-row mini-strips were measured and rejected (pictures fall to 44-48 px with no two-line reserve; `_work/G1-308-design.md` §8).

**Chrome budget (m; rules every stack below).** `.ws-page` 703x945, `padding 0 14` -> inner 675 (`page.css:16-26`). Body = what the chrome leaves: **814** (1-line title + 1-line instruction), **781** (2-line title: the title column is 375 px, any title over ~24 chars wraps), **722** (3-line title >= 48 chars + 3-line instruction >= ~125 chars). Both are legal (title <= 70, instruction <= 150), so **the design budgets 722** and lets the list absorb the slack (`flex:1 1 auto` grid, rows `minmax(86px,1fr)`, the `.ws-cardgrid` idiom `page.css:119-124`). The brief's "≈760" is not a floor.

**Layout d2**
```
+---------------------- strip panel 675 x 140 (.ws-lane) ----------------------+
| |>--------------------------------------------------------------->  arrow 14  |
| [ pic ][ pic ][ pic ][ pic ][ pic ][ pic ][ pic ][ pic ]  8 tiles 76, pic 64  |
|    .      .      .      .      .      .      .      .     mark band 22        |
+-------------------------------------------------------------------------------+
                                 gap 12
 (1)  Circle the cat.                                              [ ]  row >= 86
 (2)  Cross out the second dog.                                    [ ]
 (3)  Underline the picture between the cow and the pig.           [ ]
 (4)  Draw a line from the cat to the pig.                         [ ]
 (5)  Put a tick under the last picture.                           [ ]
 (6)  Write how many birds there are.   [ 56x44 ]                  [ ]
                 6 rows minmax(86,1fr), gap 8 = 556 at the floor
```
- **Strip panel** = `.ws-lane` (`page.css:401`) with inline `padding:10px 12px` -> inner **647** (m) x 116 = `startArrow` 14 + 4 + tiles 76 + band 22. 8 tiles 76 + 7 gaps 5 = 643 <= 647. Tile = white 76x76 r 10 border 2 creamDeep, `.ws-icon` 64 (`page.css:178`) centred, NO rotation, caption or numeral. Band: `inkSoft` dot r 4 under each tile centre. Arrow: coral flag 10x14 at x 2, 2 px rule to x 640, 8 px head, `aria-hidden`. Root `<div data-ws-content data-lcs-strip="cat,dog,dog,bird,cow,dog,pig,bird" data-lcs-theme data-lcs-n="8">`; tiles `data-lcs-idx="0..7" data-lcs-noun`.
- **Instruction list**: rows white 675 x >= 86, r 12, border 2 creamDeep; columns `[badge 30][10][text 1fr][10][answer 56 on write rows][10][done 28][pad 8]` -> text column **585** (m), **519** with the write box. Badge 30 px teal circle, Baloo 2 700 16 white. Text Nunito 800 **18 px**, line-height 1.35 (24.3), `data-lcs-text`. Done box 28x28 = `.ws-blankbox` (`page.css:445`, dashed coral), carries nothing. Write rows append `answerBox({w:56,h:44,answer:n})` (`components.js:105`; `.ws-answerbox` is dashed `#C8BFAE` grid, Baloo 26, `page.css:220`; 44 >= G1 answer floor 26).
- **Text fit (m, Nunito 800 from the shell's woff2):** 18 px = **7.4-8.1 px/char** over en/de/fi/pt samples. A 70-char line fits ONE line in 585; the **96-char cap** wraps to two at most (<= 778 < 2 x 585). Row floor 86 holds the two-line reserve (2 x 24.3 + padding 22 = 70.6). Gates: `validate-b3-draft` caps every filled sentence at 96 chars; `qa/verify-b3-read-and-do.js` asserts the text node `clientHeight <= 50` and `scrollWidth <= clientWidth` on every locale x theme x face. Code never shortens: over the cap = the panel rewrites.
- **Pencil on colour art:** `circle` = a ring round the WHITE TILE; `cross` = an X corner to corner across the tile; `underline` / `mark` (tick or X per locale) = in the band; `line` = dot to dot along the band; `write` = the row's box. No printed ring or stamp box per tile.
- **Stack at the 722 floor:** 140 + 12 + 556 = 708 (slack 14); at 814 rows grow to ~104. Pictures 64 >= G1 floor 44 (`_tokens.js:69`); 6 items within [6,12].

**Ladder** (resolved config; guards key on these keys, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| pics / tile / pic / gap | 6 / 92 / 76 / 8 (592 <= 647; panel 156) | 8 / 76 / 64 / 5 | 8 / 76 / 64 / 5 |
| rows / rowMin / gap / fontPx | 6 / 84 / 8 / 19 (156+12+544 = 712) | 6 / 86 / 8 / 18 (708) | 7 / 74 / 6 / 17 (140+12+554 = 706) |
| verbs on the page | circle cross mark (>= 3) | circle cross underline line mark write (>= 4 distinct) | six (>= 5) |
| cues | unique all | unique all ordinal first last | + between rightof leftof |
| ordinal k / nouns on strip | - / 4-5 | 2..4 / 5-6 | 2..5 / 5-7 |

**Composer.** Sample 5-6 nouns with multiplicities summing to 8; enumerate every legal (verb, cue, noun) sentence over that strip; pick 6 with disjoint targets, >= 4 distinct verbs, no two rows sharing (action, cue), a noun the target of <= 2 rows, every `ordinal:k` noun's occurrences inside the first 6 tiles; 200 tries then throw (refusal, never padding). 20-seed sweep per (locale, theme): every verb appears, `write` answers not constant, first and last both occur.

**Answer-hiding + uniqueness.** The strip order is the only truth (`data-lcs-strip`); no tile carries a numeral, word or alt text; no opacity, rotation or size difference. Row stamps `data-lcs-row data-lcs-action="circle|cross|underline|line|mark|write" data-lcs-cue="unique|all|ordinal:k|first|last|between|rightof|leftof" data-lcs-noun data-lcs-noun2 data-lcs-targets="i[,j]" data-lcs-text`; `write` rows `answerBox[data-lcs-answer]`. `verify(page)` re-derives targets from strip + cue + noun and must equal `targets`: `unique` = the noun occurs exactly once; `all` = >= 2 occurrences + >= 1 other noun, all of them; `ordinal:k` = >= k occurrences, k >= 2, the k-th from the flag (k = 1 is `first`); `first`/`last` = idx 0 / n-1, noun unset; `between` = both nouns unique, `|i1 - i2| === 2`, the middle; `rightof`/`leftof` = noun unique, not at the edge; `line` = both unique, both; `write` = every picture of the noun (1-4), box = count, >= 1 other noun, no second write row with the same count. Page: 6 distinct sentences; the union of `targets` is a set (write contributes none; a `line`/`between` ENDPOINT may be another row's target, two rows never MARK one tile); `data-lcs-text` has no `{`, no double space, no ` .`, starts `/^\p{Lu}/u`, ends `.`; `img.complete && naturalWidth > 0`; no B&W marker in any path (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`). Node-side gate (`page.evaluate` cannot require): every `data-lcs-text` re-fills from `data/b3/instructions.js` through `lib/b3-instructions.js fillSlots` (poison: a hand-edited noun -> FAIL).

**Reused (exact).** `.ws-lane .ws-blankbox .ws-answerbox .ws-icon .ws-pill` (`page.css:401/445/220/178/422`); `answerBox`; `cardGrid({cards,cols,rows})` (`templates/layouts/card-grid.js:7`, F5); `svgRoot roundedRect circle line el esc` (`primitives/_svg.js`); `entriesFor countable fileUri excluded`; tokens `T.teal T.coral T.coralSoft T.ink T.inkSoft T.grid T.white T.creamDeep`, `F.display F.body`. **NOT reusable:** `sentence-bank.js fillFrame` (`SLOT_RE = /\{(name|n|noun|color)\}/g`, `lib/sentence-bank.js:16`, m: `{obj}` passes through untouched); `sceneStage`, `iconRows` (rotation), `countBadge`/`numberStrip` (a numeral beside a picture leaks the index), `colorLegend`, `pillChoice`, `sentences.js` frames (m: 19-23 per locale, `color` 3-5 + `simple` 15-19, zero imperatives; only `names` and fi `nounForms.partitive` are reused).

**NEW in `templates/components-b3.js`** (absent, m): `pictureStrip({theme, items:[{noun,vocabKey}], tile=76, pic=64, gap=5, arrow=true, band=true})` (+ internal `startArrow`) · `instructionList({rows:[{n,text,action,cue,noun,noun2,targets,answer?}], rowMin=86, fontPx=18, doneBox=true})` · `truthChips({yes,no,px=20})` -> two `.ws-pill` h 44 (Baloo 2 700 20, padding 6 18) `data-lcs-truth-chip="yes|no"`, fixed order yes | no, no glyph · `drawBox({w=300,h=140})` (white, dashed coral 2.5, r 12, `data-lcs-drawbox`). **NEW `lib/b3-instructions.js fillSlots(text, slots)`**: explicit slot list (`obj obj2 pl part all allDef def def2 dat dat2 gen gen2 n A B`), throws on any unfilled `{…}`; substitution only.

**Alternatives.** Alt A per-row mini-strips: pictures 44-48, no two-line reserve, `between` fixes 3 of 4 tiles; rejected on the numbers. Alt B 4x2 lettered grid: reading order ambiguous, letters print the answer space; rejected.

**Risks -> mitigations.** Two rows on one tile: disjointness (P1). A pencil X invisible on saturated art: the X spans the WHITE tile; engineer prints one d2 page on mono laser + inkjet and marks all six verbs in HB (if the X fails, `crossZone:'tile'|'band'`, no data change). Long lines: cap + measured assertion. Definiteness / elision / dative: data gates (§4). **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid; no new hex. **Font floor:** smallest text 16 vs the 9 px lint (`qa/lints.js:86`). **Print check:** the footer-collision lint (`qa/lints.js:50-66`) is the second reason for the 722 budget; band dots ~50 % grey, coral ~55 %; no meaning rides on colour.

## 3 Faces 2-6

F1 + F3 are PARAM (`{...base.difficulty[2], ...overrides}`, no new build code); F2 F4 F5 are CODE (`steps` / `mode` knob + a `verify()` branch, `data-lcs-face` stamped only when declared; base byte-identical). `tools/gate-variation-distinct.js` reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (`:31-36`, m): a b3 wave file / ROWS list is required first (critic OPEN 7). Floors per locale: base >= 4 verbs, F2/F3 >= 3, F3 >= 3 cue kinds, F4 >= 8 statement frames, F5 >= 4 draw frames; below floor = REFUSED, recorded.

### F1 : Read and Circle (PARAM)
**Move:** the FRAME rung: verb fixed, only the noun phrase carries meaning. **Config** `{...base.difficulty[2], verbs:['circle'], cues:['unique','all'], minVerbs:1}`: 4 unique rows + 2 `all` rows (2 tiles each) = 8 rings over 8 tiles, or 5 + 1; d1 6 x 3 unique; d3 + ordinal. **Verify:** every action `circle`; cues ⊆ {unique, all}; disjoint. **Query face:** "circle" / "einkreisen" / "encierra" / "entoure" / "ringa in" / "ympyröi". **The only face sv/da/no ship before their `def` table** (§4): its two forms (indefinite article + vocab sg; alla/alle + vocab pl) derive from vocab + gender, and the panel decides whether "Ringa in en katt" is classroom Swedish.

### F2 : Read and Do: Two-Step Instructions (CODE `steps:2`)
**Move:** HOLD two actions from one sentence. **Layout:** 5 rows `minmax(106px,1fr)` gap 8 (5 x 106 + 32 = 562; 140 + 12 + 562 = 714 <= 722); two clauses joined by the locale's `and` literal, two DIFFERENT verbs, targets disjoint within and across rows (<= 8 marks; `write` steps mark none); the 96-char cap covers the whole sentence. **Config** `{steps:2, rows:5, rowMin:106}`; d1 6 x 4 pictures, 2nd clause always `circle`; d3 6 rows, one clause ordinal. **Verify:** two `[data-lcs-step]` per row, different actions, per-step targets re-derived, union disjoint (P8). **Query face:** "two steps" / "zwei Aufträge" / "dos pasos" / "deux consignes" / "två steg" / "kaksi tehtävää".

### F3 : Read and Do: First, Second, Between (PARAM)
**Move:** the POSITION cue is the only discriminator; verbs mixed. **Config** `{...base.difficulty[2], cues:['ordinal','first','last','between','rightof'], ordMax:4}`; d1 first/last/ordinal; d3 + `leftof`, ordMax 5. The flag alone marks the start (a printed "1" turns ordinals into counting). **Verify:** every cue positional; k in 2..4; target index not constant over the sweep. **Query face:** "first, second, last" / "der Erste, der Zweite" / "primero, segundo, último" / "första, andra, sista" / "ensimmäinen, toinen, viimeinen". **Boundary:** K-320 reads an ordinal NUMERAL over a line-up; here the ordinal WORD sits inside a full imperative over a mixed row (K-320's design is unwritten, m; critic OPEN 6).

### F4 : Read and Check: True or False (CODE `mode:'truth'`)
**Move:** VERIFY a declarative against the strip; the child circles one chip. **Layout:** strip unchanged; 6 rows `minmax(86,1fr)`: `[badge 30][10][statement 18 px, 2-line reserve][10][truthChips 250][pad 8]` -> statement column **363**; no done box. Chip column 250 because the widest measured pair is pt `verdadeiro` 142 + `falso` 87 + gap 10 = 239 (m, Baloo 2 700 20; es 233, da `rigtigt`/`forkert` 222, nl 203, fi 192, en 179). **Statement cap 80 chars** (648 <= 2 x 363). 3 true / 3 false; a false statement is false by `count` or `position` and names a noun ON the strip (P5). **Config** `{mode:'truth', rows:6, cues:['count','first','last','ordinal'], truePerPage:3}`; d1 count only; d3 + two-noun statements. **Verify:** `data-lcs-truth="1|0"` 3 + 3; `data-lcs-false-by`; chips carry no glyph; order yes | no on every row. **Heads:** B head in es/fr/it/sv; **dead in en/nl/pt**: the face ships there under the TYPE's own head with "true or false" as the distinguishing element only (en rides "following directions", nl "begrijpend lezen groep 3", pt "leia e faça"); the weaker query in 3 locales is recorded, not refused.

### F5 : Read and Draw (CODE `mode:'draw'`, open-ended)
**Move:** PRODUCE from text (the A/B head in 10 locales). **Layout:** NO strip: `cardGrid({cols:2, rows:3})` gap 14: card (722 - 28) / 3 = 231 -> inner 302 x 203; sentence 18 px two-line reserve 49 + 8 + `drawBox` 300x140 = 197 <= 203. "Draw {n} {pl} in the box." No picture printed (a picture removes the reading). **Config** `{mode:'draw', cards:6, nMin:1, nMax:3}`; d1 4 cards n 1-2 (box 300x200); d3 n 2-4 + a second clause. **Verify:** no `img`; one empty `[data-lcs-drawbox]` per card; `data-lcs-n data-lcs-noun` for the answer key only; no child-output verify (open-ended = layout lints only). **Query face:** "read and draw" x10. **Boundary:** G2-278 writes about a picture; here the child draws from text.

**Rejected non-moves.** Theme swap · "colour the second cat red" (G1-242) · count-and-write as a page (counting-pictures) · negation over a mixed strip (science category sort; a strip of Xs) · "follow the path" (unreadable) · position cues on a scene (K-064..067) · a printed ring target per tile (underline becomes tracing) · base d3 relabelled.

## 4 Native rebuild plan x11

Sentences are WHOLE literals assembled by substitution from three panel-authored layers (the code never inflects or capitalises): (1) `verbs[]` = six imperative frames with ONE object slot (`line` two; `write` `{pl}`/`{part}`); (2) `objForms[noun]` = per-noun literals expanded at apply time from the panel's per-gender article/ordinal literals + vocab sg/pl + the grammar tables, then READ by the panel (`reviewed:true`, else validator FAIL): `{unique, all, pl, ord:{2..5}, dat (de), part + gen (fi), def + defPl (sv/da/no), a2 (pt/fr/it contracted ao/au/al)}`; (3) `fixed` = position phrases riding the noun "picture" (`first`, `last`, `ordPic:{2..8}`, `between:'the picture between {A} and {B}'`, `rightof`, `leftof`), which never agree with a theme noun; `A`/`B` take `.dat` in de, `.gen` in fi, `.def` in sv/da/no, `.unique` elsewhere. A noun enters a cue ONLY if `objForms[noun][cue]` exists and is reviewed; a missing form drops the noun from that cue, never the face. The panel also authors `ordinals` (m: no ordinal WORD exists in any bank; `calendar.js` stores only `ordinalStyle`, `number-words.js` is cardinals), `and`, the `mark` glyph, `truth` (chips + >= 8 frames), `draw` (>= 4), six titles + instructions. No instruction verb exists in `word-classes.js` (m: 28-32 verbs per locale, draw/write-class only). EN handed over as a SOURCE TO AUDIT.

| loc | frame shapes (verb + object) | `{obj}` without agreeing with an unknown noun | refusals / restrictions (m) | traps |
|---|---|---|---|---|
| en | Circle {obj}. · Cross out {all}. · Underline {obj}. · Draw a line from {obj} to {obj2}. · Put a tick under {obj}. · Write how many {pl} there are. | `the` fixed; ordinal invariant | none | "tick" vs US "check mark": `mark` is a literal |
| de | Kreise {obj} ein. · Streiche {all} durch. · Unterstreiche {obj}. · Verbinde {obj} mit {dat2}. · Kreuze {obj} an. · Schreibe, wie viele {pl} es gibt. | acc. per gender `den {ord}en / die {ord}e / das {ord}e`; `dat` = a panel literal for EVERY noun (`DE_DATIVE_SG` = 41 vocab keys; on the fan themes animals 3, zoo 7, farm 1 `Ochse`, others 0: a CROSS-CHECK, never the source); `nounCase:'keep'` | none | `ankreuzen` = X, `durchstreichen` = strike (`mark:'cross'`, `cross:'strike'`); "Lesen und Malen" BANNED |
| es (MX) | Encierra en un círculo {obj}. · Tacha {all}. · Subraya {obj}. · Une con una línea {obj} y {obj2}. · Marca con una palomita {obj}. · Escribe cuántos {pl} hay. | `el {ord}o` / `la {ord}a`; `todos los` / `todas las` | none | MX register (carro, palomita); "el agua"-class feminines off sg cues |
| pt (BR) | Circule {obj}. · Risque {all}. · Sublinhe {obj}. · Ligue {obj} {a2}. · Marque {obj} com um ✓. · Escreva quantos {pl} há. | `o {ord}o` / `a {ord}a`; `ao`/`à` stored per gender | none | "pinte" belongs to G1-242 |
| fr | Entoure {obj}. · Barre {all}. · Souligne {obj}. · Relie {obj} {a2}. · Coche {obj}. · Écris combien il y a de {pl}. | `le/la {ord}` (`deuxième` invariant; `premier/première` only in `fixed.first`); vowel/h-initial nouns off definite sg cues unless the elided literal is stored | vowel/h share: animals 8/37, fruits 3/26, vehicles 5/28, toys 2/25, zoo 6/31, farm 5/25 | `endSpace:true` in `sentences.js` (m) is irrelevant: imperatives end in `.`; "colorie" BANNED |
| it | Cerchia {obj}. · Cancella con una riga {all}. · Sottolinea {obj}. · Collega {obj} {a2}. · Metti una crocetta su {obj}. · Scrivi quanti {pl} ci sono. | `il/lo/la {ord}` per gender + onset (`articles.js` it `keyFor`); `al/allo/alla` literal | vowel-initial: animals 8/34, fruits 3/23, vehicles 5/20, toys 5/20, zoo 8/30, farm 6/24 | "crocetta" is an X, so `cross` reads "cancella con una riga" |
| nl | Omcirkel {obj}. · Streep {all} door. · Onderstreep {obj}. · Verbind {obj} met {obj2}. · Zet een vinkje bij {obj}. · Schrijf hoeveel {pl} er zijn. | `de`/`het` from vocab d/h; ordinal invariant | none | separable verb; IJ capital if a noun opens an F4 statement |
| sv | Ringa in {obj}. · Stryk över {all}. · Stryk under {obj}. · Dra ett streck mellan {def} och {def2}. · Sätt ett kryss på {def}. · Skriv hur många {pl} det finns. | `unique` = `{def}` (katten), `den/det {ord} {def}`; the DEFINITE noun exists nowhere (m: `scripts/seo-landing/sv-themes.js plDef` = 50 THEME nouns, not objects) | **F1 only until the panel authors `def` + `defPl`** for the six fan themes (~150 literals) | never `grupp`; "läs och måla" BANNED; `bana`/`banan`: the validator prints every `def` for a human read |
| da | Sæt ring om {obj}. · Streg {allDef} ud. · Sæt streg under {obj}. · Tegn en streg fra {def} til {def2}. · Sæt kryds ved {def}. · Skriv, hvor mange {pl} der er. | ordinals need NO def ("den anden hund", no double definiteness); `unique` (hunden), `all` (æblerne), `line`, `mark` DO | **F1 only until `def` exists** (the pedagogy's "da does not need them" holds for ordinals only) | "Læs og forstå" in meta only |
| no | Sett ring rundt {obj}. · Stryk over {allDef}. · Sett strek under {obj}. · Tegn en strek fra {def} til {def2}. · Sett kryss ved {def}. · Skriv hvor mange {pl} det er. | double definiteness `den andre hunden`; f nouns `-a` literal | as sv | bokmål only; "les og fargelegg" BANNED |
| fi | Ympyröi {obj}. · Yliviivaa kaikki {pl}. · Alleviivaa {obj}. · Yhdistä {obj} ja {obj2} viivalla. · Merkitse {obj} rastilla. · Kirjoita, montako {part} on. | total object = NOMINATIVE sg/pl = vocab ("Ympyröi toinen kissa."); `write` = partitive table (m: animals 37/37, fruits 28/28, vehicles 28/28, toys 25/25, zoo 27/34, farm 17/25; clothing 0/28, house 1/76, classroom 0/31); `between` = `{gen} ja {gen2} välissä` | `write` rows draw only partitive-covered nouns (none refused on the fan set); `write` REFUSED on clothing / house / classroom / vegetables / weather | no articles; "Lue ja väritä" BANNED; chips "totta / tarua"; `[NSR-FLAG][fi]` |

Every generated literal is read by the panel (`reviewed:true`); every picture a panel keeps is OPENED (the sv #35 `fruits/plum` = a red apple precedent).

## 5 Data + gates

`data/b3/instructions.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the `apply-b2-locale.js` / `validate-b2-draft.js` pattern, both exist, m; the b3 tools are absent, owned by the batch's first design; `data/` gitignored, `git add -f`):
```
INSTRUCTIONS[loc] = {
  nounCase:'keep'|'lower', mark:'check'|'cross', cross:'strike', and:'und',
  verbs: [{ id:'circle', frame:'Kreise {obj} ein.' }, { id:'cross', frame:'Streiche {all} durch.' },
          { id:'underline', frame:'Unterstreiche {obj}.' }, { id:'line', frame:'Verbinde {obj} mit {dat2}.' },
          { id:'mark', frame:'Kreuze {obj} an.' }, { id:'write', frame:'Schreibe, wie viele {pl} es gibt.' }],
  objForms: { dog: { unique:'den Hund', all:'alle Hunde', pl:'Hunde', dat:'dem Hund',
                     ord:{2:'den zweiten Hund',3:'den dritten Hund',4:'den vierten Hund',5:'den fünften Hund'},
                     def:null, defPl:null, part:null, gen:null, a2:null, reviewed:true } },
  fixed: { first:'das erste Bild', last:'das letzte Bild', ordPic:{2:'das zweite Bild'},
           between:'das Bild zwischen {A} und {B}', rightof:'das Bild rechts neben {A}', leftof:'das Bild links neben {A}' },
  truth: { yes:'richtig', no:'falsch', frames:[{ text:'Es gibt {n} {pl}.', cue:'count' }, { text:'{unique} ist das erste Bild.', cue:'first' }] },
  draw:  [{ text:'Zeichne {n} {pl} in den Kasten.' }],
  strings: { 'G1-308':{title,instruction}, F1..F5:{...} } }
```
No pre-rendered `rendered[]` (two-noun cues are N² per verb): sentences are filled at render by `fillSlots` and the gate re-fills them from the same bank (the gate imports `lib/`, never the type).

**`tools/validate-b3-draft.js` (instructions block; every rule runs, exit 1 on any):** (1) every noun a page may use has `unique`, `all`, `pl` non-empty + `reviewed:true`; a theme with < 8 fully-formed countable nouns is REFUSED for the locale (reported); (2) each frame has exactly one object slot (`line` two, `write` `{pl}`/`{part}`), starts `/^\p{Lu}/u`, ends `.`; (3) a 500-sentence sample per (locale, theme, face) through `fillSlots`: no `{`, no double space, no ` .`, uppercase first char, **<= 96 chars (F4 statements <= 80)**; (4) ordinals 2..5 + first/last per gender where the language agrees (de 3, es/pt/it/fr 2, else 1); (5) `truth.frames` >= 8 with an evaluable `cue`; `yes`/`no` distinct, neither a verb; (6) `draw` >= 4 with `{n}` + `{pl}`; (7) fr/it vowel-initial nouns have NO sg form unless the elided literal is stored; de nouns whose vocab key is in `DE_DATIVE_SG` have `dat` === that value (a non-table noun is the panel's reviewed literal); fi `part` === the `sentences.js` partitive where the key exists, `gen` === `FI_GENITIVES`; sv/da/no `def` present for every noun used by a def-taking cue and printed in full for the human read; (8) titles: no worksheet-word, <= 70, unique in band; instruction <= 150; no colour verb (`Malen colorie colorea pinte colora kleur måla farvelæg fargelegg väritä`) in any title or frame; (9) no `{name}` slot.

**`qa/verify-b3-read-and-do.js`:** renders face x 11 locales x 6 fan themes at d2 with a 3-line title and a 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean (overflow `:37-45`, footer collision `:50-66`, font floor `:86`); icons >= 44, boxes >= 44 high, chips h 44, text `clientHeight <= 50` and `scrollWidth <= clientWidth`; node-side re-fill of every `data-lcs-text`; 20-seed sweep per (locale, theme): every verb appears, `write` answers not constant, F4 3/3 every seed, F3 target index not constant, F1 8 rings over 8 tiles. **Poison** (each must FAIL; the correct draft is the control): P1 two rows sharing a target index; P2 `ordinal:3` over two cats; P3 de `objForms.elephant.dat = 'dem Elefant'` (a TABLE noun); P4 sv `unique` = `en hund` on a base page; P5 F4 false statement about a noun absent from the strip; P6 a `zoo animals bw` theme; P7 `Kreise den  zweiten Hund ein.` (double space); P8 F2 both clauses `circle`; P9 fi `write` on `clothing`; P10 a `line` row with one noun twice; P11 a 97-char de sentence; P12 the old 760 stack under a 3-line title + 150-char instruction (must fail the footer lint). **Page reads:** `data/b3/instructions.js[loc]`, `fileUri`, `entriesFor`/`countable`, `answerBox`; never `image-vocabulary.js`, `sentences.js` frames, `word-classes.js` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "Read and Do: Follow the Instructions" · "Lesen und Verstehen: Leseaufträge" / "Lee y haz: sigue las instrucciones" / "Läs och gör: följ instruktionerna" · "Lue ja tee: toimi ohjeen mukaan" | Read each sentence and do exactly what it says to the pictures in the row: circle, cross out, underline, connect or write | `{type:'read-and-do', mode:null, theme:<axis key>, level:<G1 key>}` |
| F1 | head + "circle" / "einkreisen" / "encierra" / "entoure" / "ringa in" / "ympyröi" | Read the sentence and circle only the picture or pictures it names | `mode:'circle'` |
| F2 | head + "two steps" / "zwei Aufträge" / "dos pasos" / "deux consignes" / "två steg" / "kaksi tehtävää" | Each sentence tells you two things to do; read to the end before you start | `mode:'two-steps'` |
| F3 | "Read and Do: First, Second, Between" · "…: der Erste, der Zweite" / "…: primero, segundo, último" / "…: första, andra, sista" · "…: ensimmäinen, toinen, viimeinen" | Find the picture by its place in the row: the second dog, the last picture, the one between two others | `mode:'position'` |
| F4 | "Read and Check: True or False" · "Richtig oder falsch? Sätze lesen" / "Lee y decide: verdadero o falso" / "Läs och svara: sant eller falskt" · "Lue ja päätä: totta vai tarua" (en/nl/pt: the type head + the true-or-false element, §3) | Read each sentence, look at the pictures in the row and circle true or false | `mode:'truth'` |
| F5 | "Read and Draw" · "Lesen und Zeichnen" / "Lee y dibuja" / "Läs och rita" · "Lue ja piirrä" | Read the sentence and draw exactly what it says in the box | `mode:'draw'` |

Titles <= 70, no worksheet-word, unique per band. h1 = title; eyebrow = level label; strand row per §1. JSON-LD `LearningResource`, `educationalAlignment.targetName` RF.1.4 (F3 + L.1.1.i) en only, no `targetUrl`. `topicMeta['read-and-do']` + `skill-sentences.en.json` entry (65 keys today, none for this type, m) via the b3 registrar (absent). Meta lead inherits `seo.words.free_printable` (`frontend/messages/en.json:842`; the "free" claim is the standing open item, MEMORY "tier truth").

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F1 / F2 / F3 | many verbs vs one; one action vs two; noun cue vs position cue | 0.35 / 0.30 / 0.30 |
| base vs F4 / F5 | imperative + pencil vs declarative + true/false; pictures + do vs an empty box + draw | 0.20 / 0.20 |
| any vs G1-242/251/252 | their copy says colour, colour word, BW; ours never contains a colour word (rule 8) | 0.10 |
| F3 vs K-064..067 / K-320 | scene relation, one instruction per page vs a sentence per row; ordinal NOTATION vs an ordinal WORD inside a mixed row | 0.15 |
| F4 vs G2-254 · F5 vs G2-278 · base vs G1-249 · write rows vs counting-pictures | passage + questions vs one-line statements; write about a picture vs draw from text; order tiles vs execute; one row vs a page | 0.10-0.15 |

Boundary sentence on every landing: "The child reads the instruction and does it with a pencil; nothing is coloured" (vs G1-242); on F3: "the ordinal is read inside a full sentence" (vs K-320).

## 7 Hub visibility contract

A face appears under `read-and-do` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps['read-and-do']` exists in `frontend/config/topics-taxonomy.json` (absent, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['read-and-do']` has `slug` + `name` in all 11 locales (§1 slugs); (3) exactly one landing per face per locale with `coordinate.type === 'read-and-do'` verbatim, the G1 level key of §1, the wave's theme axis key, a unique slug, `canonicalDeckSlug` = the published deck (the `read-and-color-1st-grade` landing is the measured shape); a face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=read-and-do`. Script absent (m) (nearest siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps['read-and-do']` lands.

**Expected rows per locale after the refusals recorded in §4:**

| loc | rows | refused until data | lifts to |
|---|---|---|---|
| en de es pt fr it nl fi | 6 | none (de dative, fr/it elision, fi partitive drop NOUNS, never a face) | 6 |
| sv no | 1 (F1, indefinite frames, panel-accepted) | base F2 F3 F4 until `def` + `defPl` (~150 literals each) | 6 |
| da | 1 (F1) | base F2 F3 F4 until `def` for `unique`/`all`/`line`/`mark` | 6 |

Design total = **51 rows** (8 x 6 + 3 x 1); ceiling **66** once the three Nordic `def` tables are authored and read. F5 needs no definite form ("Rita två katter i rutan") and may lift sv/da/no to 2 before `def` if the panel confirms; conditional, not counted.
