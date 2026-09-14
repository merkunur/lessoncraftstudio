# G2-318 `animal-fact-file` (G2) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/G2-318-pedagogy.md` + `_work/G2-318-design.md`. Every file, class, primitive and option below was read in the repo on 2026-09-14; resolutions, removed claims and open items: `_work/G2-318-critic.md`. (m) = re-measured by node / puppeteer in the shell's own fonts (scratch `g2318-measure.js`, `g2318-critic.js`). *est.* = the engineer measures.

**Boundary (load-bearing).** ONE animal per page in labelled fields: picture, name, six facts, a sentence lane, a draw box. G2-278/299/300 narrate a composed scene (starters `One day, / Then`, m); the science sorts (G1-201/202/205/206, K-204/206/209) draw lines from MANY pictures to WORD bins; K-323 is about the CHILD; G2-254 is passage + questions; the `atlas-fact-files` ACTIVITY (RI.K.1, m) finds a key detail. None prints a per-animal fact file; no face here bins pictures or narrates.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `G2-318` / `animal-fact-file` / **G2 in all 11** (faces `G2-320+ TBD by the emitter`). No locale lifts to G3 (Steckbrief Kl. 2 Sachunterricht · fiche documentaire cycle 2 · werkstuk groep 4 · faktatext åk 1-3 · tietoteksti 2. lk · BNCC 2º ano · SEP 2º). `default_subject: science`, `default_age_range: 7-9`, `assetClass: icon-placement`, `exerciseType: animal-fact-file`. Key ABSENT from `topics-taxonomy.json` (m). `science` is a legal subject (README ruling: `apps.science-sort/-sequence/-match`, all `5-7`, m); this is the science disc's first G2 row. `letters` rejected (would sit beside `picture-writing`, m). |
| theme axis | ON: `{applicable:true, minNouns:4, excludeBw:true}` over the 11 animal themes (`enumerate.js:72,79`). Pictured distinct vocabKeys across them: **183** (m). The wave ships one theme per type; recommend `forest creatures` x11 (40 pictured nouns, the de A-head `hedgehog`, opened). |
| fan lever | **`unitAxis`** (README ruling) = the animal's vocabKey; `deckIdFor` appends `-u<animal>`; `{U}` = `FACT_FILE[loc].animals[key].title`. No unit configured = `exemplars[<theme>]` from the bank (per THEME, since a unit must be pictured in the wave's theme); byte-identical per coordinate (`b3-baseline --check`). F5/F6 fan by THEME only, `unit:''` (section 3). |
| truth | `data/b3/animal-facts.json`: a curated, locale-neutral 7-field table (class · covering · diet · habitat · legs · fly · swim), ~36-40 animals, panel-reviewed. The five science banks are a CROSS-CHECK: 49 bank keys, 45 pictured in an animal theme; >= 1 / 2 / 3 / 4 / 5 core facts = **45 / 23 / 11 / 5 / 1** (rabbit); no bank stores legs or swim; 0 bank-vs-bank conflicts (m). **Without the table only the base ships** (section 7). |
| CCSS (en only; framework NAME elsewhere) | base W.2.7 + W.2.2 · F2 none (teaches-only science) · F3 W.2.2 + L.2.2.d · F4 W.2.2 · F5 W.2.2 · F6 RI.2.1. Strand rows: `Writing` (`strand-names.ts:146`) has **en de es pt** only; `Reading: Informational Text` (`:130`) has **en de** only (m). 7 + 9 panels add. |

| loc | genre head (base title root) | ASCII slug | level key | strand (name only) |
|---|---|---|---|---|
| en | Animal Fact File ("animal report template" in meta) | `animal-fact-file` | `grade-2` | Writing |
| de | Tiersteckbrief ("Steckbrief Tier Vorlage" in meta; `{U}` = "Igel-Steckbrief") | `tiersteckbrief` | `2-klasse` | Texte verfassen |
| es (MX) | Ficha del animal ("fichas de animales para imprimir") | `ficha-del-animal` | `segundo-grado` | Producción de textos |
| pt (BR) | Ficha técnica do animal | `ficha-tecnica-do-animal` | `2o-ano` | Produção de textos |
| fr | Fiche documentaire : animaux ("fiche d'identité" in meta) | `fiche-documentaire-animaux` | `ce1` | panel adds |
| it | Carta d'identità dell'animale | `carta-d-identita-dell-animale` | `classe-seconda` | panel adds |
| nl | Dierenpaspoort ("dierenkaart", "werkstuk groep 4" in meta) | `dierenpaspoort` | `groep-4` | panel adds |
| sv | Faktablad om djur ("faktatext" in meta) | `faktablad-om-djur` | `ak-2` | panel adds, `[NSR-FLAG]` |
| da | Faktaark om dyr | `faktaark-om-dyr` | `2-klasse` | panel adds, `[NSR-FLAG]` |
| no | Faktaark om dyr | `faktaark-om-dyr` | `3-trinn` | panel adds, `[NSR-FLAG]` |
| fi | Tietoteksti eläimestä ("eläinfakta" in meta) | `tietoteksti-elaimesta` | `2-luokka` | panel adds, `[NSR-FLAG][fi]` |

Level keys = `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`, m). da/no share a slug shape; locale prefix + manifest id `.da`/`.no` differentiate.

## 2 The base page

**Concept.** A real Steckbrief card. Top-left a framed hero picture; right of it a name banner and a dashed draw box ("Draw where it lives"). Below, ONE framed six-row fact table (label column + school-line lane) and one fact-sentence lane with a starter. Open-ended: the child RECORDS what the class found out; no verify(), lints only. The base prints the NAME (the topic), never a fact.

**Chrome budget (m).** `.ws-page` padding 0 14 (`page.css:25`) -> inner 675. Body **742** under a 3-line de title + 1-line instruction; **722** under a 3-line title + a 156-char instruction (2 lines, 60 px). A 150-char instruction never reaches 3 lines, so **722 is the floor** (README ruling); rows are `minmax(60px,1fr)` and absorb slack.

```
+---- heroFrame 244x244 ----+  14  +---- nameBanner 417x76 (tealSoft r14) -------------+
| white, 3px teal, r16      |      | (paw)  Igel                              Baloo 34  |
|      [ picture 220 ]      |      +---- drawBox 417x156 (dashed coral 2.5, r12) -------+
|                           |      | Male, wo es lebt.                  (14px inkSoft)  |
+---------------------------+      +----------------------------------------------------+
                               gap 12
+---- factTable 675x385 (2px teal r14; rows minmax(60,1fr); 1.5px grid rules) -----------+
| Tierklasse     (tealSoft 160) | ____ writingRow 495x56 glyphH 28 ______________________ |
| Lebensraum · Nahrung · Beine · Körperbedeckung · Kann es fliegen?      (6 rows)         |
+-----------------------------------------------------------------------------------------+
                               gap 12
+---- factLane 675x60 (.ws-lane): "Der Igel kann" + writingRow, glyphH 28 ---------------+
```
Stack 244 + 12 + 385 + 12 + 60 = **713 <= 722** (slack 9; at 814 rows grow to ~76).

- **heroFrame** 244x244: `.ws-icon` 220 (`page.css:178`) centred, padding 12; `<img data-lcs-hero data-lcs-noun data-lcs-unit>`; `src:null` (the `unit:'blank'` Vorlage) -> dashed coral frame, `data-lcs-drawbox="hero"`. 220 >= G23 floor 36 (`_tokens.js:70`).
- **nameBanner** 417x76: coral paw 28 (SVG, `aria-hidden`), name Baloo 2 700 **34** teal, `data-lcs-name`. Widest (m, Baloo 34): `Hippopotamus` 215, `Chauve-souris` 210, `Schmetterling` 204 <= 357 available; names > 14 letters drop to 30 px (`Hippopotamus` 190), never smaller. `unit:'blank'` -> "Name:" eyebrow + `writingRow 357x56 glyphH 28`.
- **drawBox** 417x156 (G1-308's `drawBox`, sized): label 14 inkSoft inside top-left, `data-lcs-drawbox`.
- **factTable**: outer 675, border 2 teal r 14, white; label column **160** tealSoft, padding 0 8 -> inner 144, Nunito 800 **17** ink, `white-space:normal`, <= 2 lines (2 x 23 = 46 <= 60). Measured 17 px (m): `Körperbedeckung` 132, `Kan het vliegen?` 122, `Kann es fliegen?` 120, `Recubrimiento` 109, `elinympäristö` 100, `Kann es schwimmen?` 158 (wraps, 2 lines). Rule: <= 144 one line, else two; **validator caps a label at 28 chars, the render gate asserts <= 2 measured lines** (the pedagogy's 18-char cap is replaced: the measure decides). Lane = `writingRow({w:495, h:56, glyphH:28, xHeight:true})` (`primitives/trace-path.js:681`; 495 = 675 - 4 - 160 - 16); glyphH 28 >= the G2 floor 24. Row stamps `data-lcs-field="class|habitat|diet|legs|covering|fly"`.
- **factLane** 675x60: `.ws-lane` (`page.css:401`) with inline `padding:6px 16px` -> inner 643x48; starter (`factStarter` literal with the animal's `def`, e.g. "Der Igel kann") Nunito 700 20 inkSoft; `writingRow` h 48 glyphH 28 for the rest. sv/da/no/fi starters use `def`/`nom` literals (section 4); a missing literal -> the lane prints the caption `sentence` ("Ein Satz über das Tier:") instead, never a bare vocab word.

**Ladder** (resolved config; guards key on `fields` / `cell` / `bank` / `frames` / `mode`, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| fields | class habitat diet covering | + legs fly | + swim (7) |
| rowMin / glyphH / labelPx | 76 / 32 / 18 | 60 / 28 / 17 | 52 / 24 / 16 |
| hero / pic | 260 / 236 | 244 / 220 | 214 / 190 |
| right column | drawBox 417x172, no fact lane | drawBox 417x156 + fact lane | `rulingBlock({rows:3, w:417, h:40, glyphH:24})` (`components-b2.js:58`) under "Besonderheit:", no draw box |

d1 stack 260 + 12 + 4 x 76 + 18 = 594; d3 214 + 12 + 7 x 52 + 24 = 614; rows grow to the floor. Items d2 = 6 rows + lane + box = 8 (G23 window 8-16).

**Answer hiding + stamps.** Root `<div data-ws-content data-lcs-animal="<vocabKey>" data-lcs-unit data-lcs-theme>`; every lane an empty `[data-lcs-prim="writing-row"]`; visible words = name, labels, draw label, starter (the G2-278 stray-text rule). `data-lcs-fact-<field>` stamped on rows the table knows (answer key only, never text). No verify(); `qa/lints.js` (overflow `:37-45`, footer `:50-66`, font >= 9 `:86`).

**Reused (exact).** `writingRow` + `schoolLines` (`trace-path.js:681, 241`); `rulingBlock` (`components-b2.js:58`); `wordBank` (`:210`); `.ws-lane .ws-pill .ws-nchip .ws-icon .ws-scene-banner .ws-bank .ws-bankword .ws-blankbox` (`page.css:401/422/412/178/274/416-421/445`); `drawBox` + `truthChips` (G1-308 FINAL); `svgRoot roundedRect circle el esc`; `fileUri` (`image-cache/resolve.js:33`); `excluded` (`lib/b2-common.js:35`); tokens `T.*`, `F.*`. **NOT used:** `pillChoice` (centres, no field stamp), `answerBox`, `cardGrid`, `sceneStage`, a silhouette hero (leaks the riddle).

**NEW in `templates/components-b3.js`** (absent, m): `heroFrame({src|null, size=244, pic=220, noun, unit})` · `nameBanner({name|null, w=417, h=76, fontPx=34, eyebrow})` · `factTable({rows:[{key,label,lane:'write'|'choice'|'printed', options?, value?, fact?}], w=675, rowMin, glyphH, labelW=160, labelPx})` (grid `160px 1fr`, `grid-auto-rows:minmax(<rowMin>px,1fr)`, `data-lcs-field` per row) · `choiceRow({options, pillPx=16, h=40})` (3 `.ws-pill`, padding 4 20, gap 8, `data-lcs-opt`) · `factLane({starter, w=675, h=60, glyphH=28})` · `miniFactFile({hero, name, rows:[{label,value}], w, rowH})` (printed; F4, F5) · `sameDiffGrid({fields, w=675, cellH=48})` (2 x 2 cells 331: label 14 + `truthChips`, `data-lcs-same="1|0"`) · `riddleCard({clues, laneW, drawW, h=190})` (F6).

## 3 Faces 2-6

Chosen against the tests (genuine move · buildable in >= 7 locales on the measured table · distinct resolved d2 · distinct query face · clean boundary): tick · word bank · three sentences · compare · who am I. **The fact-chip sort is REJECTED**: it prints the animal's six true facts with no selection, four of six assignments are trivial (a numeral, ja/nein), and "Fakten zuordnen" is a weaker head than "mit Wortspeicher". All five are CODE faces (a value-cell kind or a page `mode` + a `verify()` branch; the base is the default path, `data-lcs-face` only when declared, byte-identical). `tools/gate-variation-distinct.js` needs the b3 wave file first (siblings' OPEN item). **Verifiable:** F2, F6, F5's chip grid. **Open (lints + structural verify only):** F3, F4, F5's lanes.

### F2 : Animal Fact File: Tick the Facts (CODE, `cell:'chips'`; verifiable)
**Move:** RECOGNISE the true fact of three per row. **Layout:** the base card; each lane = `choiceRow` of **3** chips (the truth + 2 distractors from that field's option set; legs = 3 numerals; fly = `ja | nein`, 2 chips). Chips Baloo 2 700 16, `.ws-pill` padding 4 20, h 40, gap 8 (m: even FIVE de/fi chips at 16 px and padding 4 12 fit 495 (421-465); three at 4 20 are *est.* <= 320; the default 6 24 padding overflows at five (541) and is not used). Draw box + fact lane stay. **Config** `{cell:'chips', choices:3}`; d1 2 chips; d3 4 chips (diet has 3 options: the row keeps 3, recorded). **Verify:** every row prints exactly `choices` distinct chips from `choices[field]`, exactly one `data-lcs-correct` per row (stamped on the ROW, chips carry `data-lcs-opt` only, no glyph, no tint); over the page the correct index takes all three positions; numerals distinct; a `swim` row only when `swim !== null`. Node gate re-derives from the table. **Refusal:** the animal needs 7/7. **Query face:** "tick the facts" · "zum Ankreuzen" · "para marcar" · "à cocher" · "kryssa i" · "rastita".

### F3 : Animal Fact File with a Word Bank (CODE, `bank:true`; open)
**Move:** SELECT + SPELL: copy each true fact from a bank into its field (the Wortspeicher rung). **Layout:** the base card; the draw-box slot (417x156) holds `wordBank({words, wordPx:17})` (no icons): the 6 truths + `bankExtra:4` distractors drawn from the same fields (>= 2 fields), shuffled; 10 words on 2-3 rows (*est.* <= 136 <= 156; the gate measures `scrollHeight`). Lanes stay writing lanes; the fact lane stays. **Config** `{cell:'write', bank:true, bankExtra:4}`; d1 bank = the 6 truths only; d3 one bank for the page's animal AND a second printed name (two animals, 12 + 4 words). **Verify:** bank === truths + distractors as a set, no duplicates, nothing else printed (`data-lcs-bank-word` only); `data-lcs-fact-*` on rows. **Refusal:** 7/7. **Query face:** "with a word bank" · "mit Wortspeicher" · "con banco de palabras" · "avec banque de mots" · "med ordbank" · "sanapankilla".

### F4 : Animal Fact File: Write Three Sentences (CODE, `frames:3`; open, W.2.2)
**Move:** COMPOSE informative sentences from a printed source. **Layout:** hero 200 (pic 180) left; right column 461 = `nameBanner` 461x60 + `miniFactFile` 461x128 (6 printed rows h 20: label 14 inkSoft + value Nunito 800 16 ink); top block 200. Below, one `.ws-lane` 675: caption 22 ("Schreibe drei Sätze über das Tier:") + `rulingBlock({rows:4, w:643, h:80, glyphH:28, starters:{0,1,2}})` = 338 -> lane 384; stack 200 + 12 + 384 = 596 (whitespace is a feature). Starters = the locale's three `frames` filled with `def` (fi `nom`/`ade`): "Der Igel ist" · "Der Igel hat" · "Der Igel frisst"; row 4 free. **Config** `{cell:'printed', frames:3, free:1, box:0}`; d1 2 frames; d3 0 frames, 4 free rows. **Verify:** printed cells === table literals; 3 `[data-lcs-starter]` <= **22 chars**, no end mark (the G2-278 rule verbatim, `G2-278-write-about-the-picture.js:94`); a frame never contains its own target fact; no draw box; no starter equals a G2-278 starter (`LABELS[loc].pictureWriting`, m). **Refusal:** 7/7 + a `def` (fi `nom` + `ade`) for the fanned animal; a filled starter > 22 chars drops the ANIMAL from F4 in that locale (recorded), never the face. **Query face:** "write three sentences" · "Sätze schreiben" · "escribe tres oraciones" · "écris trois phrases" · "skriv tre meningar" · "kirjoita kolme lausetta".

### F5 : Compare Two Animals: Same and Different (CODE, `mode:'compare'`; lanes open, chips verifiable)
**Move:** COMPARE two printed files. **Layout:** two `miniFactFile` 330 (gap 15): hero 120 (pic 100) + name 44 + **4 printed rows** (class · covering · diet · habitat) h 36 (grid `120px 1fr`; label 14 inkSoft, value 16 ink; m: widest value `glatte Haut` 77, widest label at 16 `Körperbedeckung` 124) + padding 20 = 328. `sameDiffGrid` 2 x 2 (cells 331x48, gap 8 = 104): per field the child circles same | different (m, Baloo 16 padding 4 12: widest pair `gleich/verschieden` 198 <= 331 - label; a 4-cell single row at 168 per cell is TOO NARROW for de and was dropped). Then a `.ws-lane`: caption 22 + `rulingBlock({rows:4, w:643, h:48, glyphH:24, starters:{Gleich:, Gleich:, Verschieden:, Verschieden:}})` = 210 -> 256. Stack 328 + 12 + 104 + 12 + 256 = **712 <= 722**. Pair = `rng` sample of two 7/7 animals of the wave theme that **share >= 2 and differ >= 2 of the 4 printed fields** (200 tries, else the theme REFUSES F5). **Config** `{mode:'compare', fields:4, lanes:[2,2]}`; d1 lanes 1 + 1, no chip grid; d3 6 printed rows, chips on 4, lanes 3 + 3 (stack *est.* 760: the engineer re-budgets or keeps 4 rows). **Verify:** `data-lcs-same` re-derived per field, both values present; chips fixed order, no glyph; two distinct animals, both pictures resolve; a 20-seed sweep: the chip pattern is not constant. Legs and fly are dropped from F5 (trivial comparisons). **Fan:** THEME, `unit:''`. **Query face:** "compare two animals" · "zwei Tiere vergleichen" · "compara dos animales" · "jämför två djur" · "vertaile kahta eläintä" (+ theme: "Waldtiere vergleichen").

### F6 : Who Am I? Mystery Animal (CODE, `mode:'mystery'`; verifiable, RI.2.1)
**Move:** INFER the animal from first-person clues. **Layout:** top `wordBank({withIcons:true, wordPx:15})` of 6 animals (3 targets + 3 extra), icons 44, names printed: **106** high on ONE row for names <= 9 letters (m); three names >= 12 letters wrap it to 202 (m) -> **the composer re-samples until the bank renders on one row (`clientHeight <= 110`), 200 tries, else the theme refuses F6**. Below 3 `riddleCard` `.ws-lane` 675x190 (inner 643x166): `[clues 300][16][name lane 165: "Name:" + writingRow 165x56 glyphH 26][16][drawBox 146x140]` = 643. Clues = 5 lines Nunito 800 16 lh 1.35 (m: 108; a 6-line reserve 132 <= 166; validator caps a clue at 40 chars). Stack 106 + 12 + 3 x 190 + 24 = **712 <= 722**. Clue lines come from the locale's `mystery` frames (`Ich bin {inFrame}.` · `Ich habe {cell}.` · `Ich fresse {cell}.` · `Ich lebe {inFrame}.` · `legsFrames` · fly/swim literals): first person, so NO animal noun and no `def` is ever needed. **Composer:** targets = 3 distinct 7/7 animals of the theme; bank = targets + 3 more; per card choose 5 of the 7 fields so that an exhaustive filter of the 6 bank animals by the printed clues leaves EXACTLY the target (every other animal contradicted by >= 1 clue), else re-pick / re-sample (200 tries, refuse). **Config** `{mode:'mystery', puzzles:3, bank:6, cluesPrinted:5}`; d1 2 puzzles, bank 4, 4 clues; d3 4 clues, bank 8. **Verify:** re-run the filter on the DOM (exactly one 0-contradiction animal = `data-lcs-answer`); targets distinct; no picture on a card; no `data-lcs-unit`; bank shuffled; a position/size bot <= 1/6 over 20 seeds. **Refusal:** theme needs >= 4 animals at 7/7 pairwise distinct in >= 1 field. **Fan:** THEME, `unit:''`; **the deck title and slug never name an animal** (validator). **Query face:** "who am I? mystery animal" · "Wer bin ich? Tierrätsel" · "¿Quién soy? Animal misterioso" · "Qui suis-je ? Animal mystère" · "Vem är jag? Djurgåta" · "Kuka olen? Eläinarvoitus" (+ theme).

**Rejected non-moves.** Theme swap · fact-chip sort (above) · base d1/d3 relabelled · baby-animal field (`baby-animals.json` = 6 pairs, m) · label the body parts (asset-blocked) · questions about the file (G2-254 + the atlas activity) · a habitat scene (G2-278 `sceneStage`) · "all about me as an animal" (K-323) · per-animal F6 fan (prints the answer in the title) · a `special` free-text field on a verifiable table · a silhouette riddle hero.

## 4 Native rebuild plan x11

Every printed string is a panel literal substituted by code, never inflected: labels (7 + `special`), `name` (banner = the vocab singular AS STORED, initial capital everywhere, m: `Katt`, `Kissa`, `Igel`), `title` (`{U}`), `def` (fi `nom` + `ade`), option literals with `cell` + `inFrame` (article INSIDE the literal), `legsFrames{0,2,4,6,8}`, `yesno`, `frames[3]`, `sameDiff`, `mystery{6 kinds}`, `factStarter`, `drawLabel`, `sentence`, six titles + instructions, skill sentence, slug + name. Frames never agree with the ANSWER: the article travels inside `inFrame` (`ein Säugetier`, `un ave`, `uma ave`, `ett däggdjur`, `en fågel`); fi has none. EN is a SOURCE TO AUDIT.

| loc | banner `name` / frame `def` | option literals class · covering · diet (`inFrame` form) | refusal | traps |
|---|---|---|---|---|
| en | Hedgehog / the hedgehog | mammal bird reptile fish insect · fur feathers scales shell spines skin · plants meat both; `inFrame:'a mammal' / 'an insect'` | none | `a/an` stored, never computed |
| de | Igel (`KEEP_CASE`) / der Igel (from vocab gender, then `reviewed:true`) | Säugetier Vogel Reptil Fisch Insekt · Fell Federn Schuppen Panzer Stacheln Haut · Pflanzen Fleisch beides (`Fleischfresser` 155 / `Pflanzenfresser` 168 at 18 px are NOT used: too wide for the 180 px F5 value cell and the bank) | none | `Körperbedeckung` 132 fits one line; `Kann es schwimmen?` wraps to 2 (m) |
| es (MX) | Erizo / el erizo | mamífero ave reptil pez insecto · pelo plumas escamas caparazón púas piel lisa · plantas carne ambos | none | MX register; `el águila`-class literal |
| pt (BR) | Ouriço / o ouriço | mamífero ave réptil peixe inseto · pelos penas escamas casco espinhos pele lisa · plantas carne ambos; `inFrame:'uma ave'` | none | "ficha do animal" in meta only |
| fr | Hérisson / le hérisson (`l'éléphant` stored elided) | mammifère oiseau reptile poisson insecte · poils plumes écailles carapace piquants peau lisse · plantes viande les deux | none | vowel-initial `def` stored elided |
| it | Riccio / il riccio (`l'elefante`, `lo squalo`) | mammifero uccello rettile pesce insetto · pelo piume squame guscio aculei pelle liscia · piante carne entrambi | none | `il/lo/l'` per animal |
| nl | Egel / de egel (`de/het` from vocab d/h) | zoogdier vogel reptiel vis insect · vacht veren schubben schild stekels gladde huid · planten vlees allebei | none | "werkstuk" in meta only |
| sv | Igelkott / igelkotten (definite literal) | däggdjur fågel reptil fisk insekt · päls fjädrar fjäll skal taggar slät hud · växter kött både och; `inFrame:'ett däggdjur'` | F4 needs `def` for the fanned animal | **`grupp` ban**: the validator rejects the bare token `(?<!\p{L})grupp(?!\p{L})` in every sv string; the compound label `Djurgrupp` (the Lgr22 term) ships ONLY as the panel's explicit entry in an auditable `allowCompound` list; `bana/banan` class read of every `def`; `[NSR-FLAG]` |
| da | Pindsvin / pindsvinet | pattedyr fugl krybdyr fisk insekt · pels fjer skæl skjold pigge glat hud · planter kød begge dele | as sv | `[NSR-FLAG]` |
| no | Piggsvin / piggsvinet | pattedyr fugl krypdyr fisk insekt · pels fjær skjell skall pigger glatt hud · planter kjøtt begge deler | as sv | bokmål; `[NSR-FLAG]` |
| fi | Siili / `nom` Siili ("Siili on nisäkäs") + **`ade`** Siilillä ("Siilillä on piikit / neljä jalkaa") | nisäkäs lintu matelija kala hyönteinen · turkki höyhenet suomut kuori piikit sileä iho · kasveja lihaa molempia (partitive inside the literal) | F4 needs `nom` + `ade` | no articles; a fixed nominative token in a sentence is a trap (§A.13.56); `[NSR-FLAG][fi]` |

Refusal rule (all locales): an animal enters F2-F6 only with 7/7 non-null reviewed facts; F4 additionally needs its `def` (`nom`/`ade`); F5/F6 need the wave theme's 7/7 pool >= 2 / >= 4. A missing literal drops the ANIMAL, never the face from the locale. The base needs picture + `name` only. The panels fact-check the table rows of their exemplar theme and OPEN every fanned picture (sv #35 `fruits/plum` precedent).

## 5 Data + gates

`data/b3/animal-facts.json` (committed, locale-neutral, `git add -f`) + `data/b3/fact-file.js` (per-locale literals, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`, absent, m):
```
ANIMAL_FACTS = { fields:['class','covering','diet','habitat','legs','fly','swim'],
  choices:{ class:['mammal','bird','reptile','fish','insect'], covering:['fur','feathers','scales','shell','spines','skin'],
            diet:['plants','meat','both'], habitat:['land','water','air'], legs:[0,2,4,6,8] },
  animals:{ hedgehog:{ pic:{theme:'forest creatures', noun:'hedgehog'}, class:'mammal', covering:'spines', diet:'both', habitat:'land',
                       legs:4, fly:false, swim:true, picOpened:true, reviewed:true },
            turtle:{ …, habitat:null }, frog:{ class:null, … } },          // null = ambiguous at K-2 or outside the chip set
  exemplars:{ 'forest creatures':'hedgehog', 'animals':'fox', 'zoo animals':'lion', 'farm animals':'cow', 'pets':'rabbit', 'birds':'owl', … } }
FACT_FILE[loc] = { labels:{class,habitat,diet,legs,covering,fly,swim,special}, eyebrow, drawLabel, sentence, factStarter:'{def} kann',
  options:{ class:{mammal:{cell:'Säugetier', inFrame:'ein Säugetier'}, …}, covering:{…}, diet:{…}, habitat:{land:{cell:'Land', inFrame:'an Land'}, …} },
  yesno:{yes:'ja', no:'nein'}, legsFrames:{0:'Ich habe keine Beine.', 2:'Ich habe 2 Beine.', …},
  animals:{ hedgehog:{ name:'Igel', title:'Igel', def:'der Igel', nom:null, ade:null, reviewed:true } },
  frames:[{field:'class', text:'{def} ist'}, {field:'covering', text:'{def} hat'}, {field:'diet', text:'{def} frisst'}],
  sameDiff:{same:'gleich', diff:'verschieden', laneSame:'Gleich:', laneDiff:'Verschieden:'},
  mystery:{ class:'Ich bin {inFrame}.', covering:'Ich habe {cell}.', diet:'Ich fresse {cell}.', habitat:'Ich lebe {inFrame}.',
            fly:{true:'Ich kann fliegen.', false:'Ich kann nicht fliegen.'}, swim:{true:'Ich kann schwimmen.', false:'…'}, prompt:'Wer bin ich?' },
  strings:{ 'G2-318':{title,instruction}, F2..F6:{…} } }
```
**Join rule.** Seed the table from the five banks via `manifest.themes[t].nouns[n].vocabKey` (`image-cache/resolve.js`): bins map 1:1 (`mammals->mammal`, `plant->plants`, `canfly->fly:true`, `cannot->false`); the 4 bank keys without an animal-theme picture (`bird airplane helicopter car`, m) are ignored. The banks are a CROSS-CHECK, never the ceiling: the pedagogue authors the 7-field row ONCE for ~36-40 animals (proposed: cat dog horse rabbit cow pig sheep goat donkey duck hen rooster goose · fox hedgehog owl squirrel deer bear wolf bat beaver moose raccoon butterfly bee ladybug ant · lion tiger elephant giraffe zebra monkey kangaroo camel hippopotamus panda koala · penguin eagle parrot flamingo ostrich swan · tortoise lizard snake · fish goldfish shark · hamster mouse); every `pic` resolves via `fileUri` in >= 1 animal theme, opened. **Disagreement:** table != bank on any key = validator FAIL; bank != bank = FAIL (0 today); ambiguity (turtle habitat, dolphin / whale class per the bank `_note`) = `null`, which drops the animal from every non-base face, never invents. `class` outside the 5 chips (frog snail spider octopus crab) = `null` (base only, recorded).

**`tools/validate-b3-draft.js` (fact-file block; exit 1 on any):** (1) labels <= 28 chars, `cell` <= 16, `inFrame` <= 22; (2) every `choices[field]` key has `cell` + `inFrame` in every locale; (3) every reviewed animal resolves via `fileUri`, no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`), `picOpened:true`; (4) fanned animals have `name` + `title`; `exemplars[theme]` exists for every animal theme the wave may pin; (5) the 7/7 rule computed; the refusal list printed per (locale x theme x face); (6) `frames` === 3 with `{def}` (fi `{nom}`/`{ade}`) exactly once, filled <= 22 chars, no end mark, no option literal inside; `mystery` has all 6 kinds + `prompt`; `legsFrames` all 5; (7) bank cross-check; (8) every chip field >= 3 options; (9) titles <= 70, no worksheet-word, unique in band; instruction <= 150; no `{name}`; F5/F6 titles contain no animal `title`; no starter equals a G2-278 starter; (10) sv: bare `grupp` token = FAIL; compounds only from `allowCompound`.

**`qa/verify-b3-fact-file.js`:** renders 6 faces x 11 locales x the wave theme at d2 under a 3-line title + 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean; label cells <= 2 lines and `scrollWidth <= clientWidth`; chip rows and the F3 bank inside their slots (`scrollHeight`/`scrollWidth`); F6 bank `clientHeight <= 110`; `.ws-icon` >= 36; node-side re-derivation of every `data-lcs-fact-*` / `-correct` / `-answer` / `-same` from `animal-facts.json` (diff, not trust; 0 checked = FAIL); 20-seed sweep: F2 correct index takes all 3 positions, F5 chip pattern and F6 answer index not constant, F6 bot <= 1/6. **Poison (each must FAIL; the correct draft is the control):** P1 `animals.rabbit.diet:'meat'` (contradicts `what-animals-eat.json`); P2 an F6 bank with two 0-contradiction animals (hedgehog + porcupine, identical clues); P3 an F2 row with two `data-lcs-correct`; P4 sv `def:'igelkott'` (indefinite) in an F4 frame; P5 a `zoo animals bw` picture; P6 an F3 bank missing the true covering; P7 a de frame with `Säugetier` printed inside the frame text; P8 an F5 pair sharing 4/4; P9 a fanned animal with `habitat:null` on F2; P10 an 878-px single-column stack under the 722 chrome (must fail the footer lint); P11 a 29-char label; P12 an F6 title containing `Igel`; P13 sv label `Grupp` (bare token); P14 an F6 bank of six 13-letter names (two rows).

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "{U} Fact File" · "{U}-Steckbrief" (the searched compound) / "Ficha del animal: {U}" / "Fiche documentaire : {U}" · "Faktablad: {U}" / "Tietoteksti: {U}" | Write six facts about the animal, add one sentence of your own and draw it in its home | `{type:'animal-fact-file', mode:null, theme:<axis key>, level:<G2 key>, unit:<key>}` |
| F2 | head + "Tick the Facts" · "zum Ankreuzen" / "para marcar" / "à cocher" · "kryssa i" / "rastita" | Three facts are printed in each row; circle the one that is true for this animal | `mode:'tick', unit:<key>` |
| F3 | head + "with a Word Bank" · "mit Wortspeicher" / "con banco de palabras" / "avec banque de mots" · "med ordbank" / "sanapankilla" | Find each true fact in the word bank and copy it into the right field | `mode:'word-bank', unit:<key>` |
| F4 | head + "Write Three Sentences" · "Sätze schreiben" / "escribe tres oraciones" / "écris trois phrases" · "skriv tre meningar" / "kirjoita kolme lausetta" | Read the fact file, finish the three sentences and write one more fact of your own | `mode:'sentences', unit:<key>` |
| F5 | "Compare Two Animals: Same and Different" · "Zwei Waldtiere vergleichen" / "Compara dos animales" · "Jämför två djur" / "Vertaile kahta eläintä" | Read both fact files, circle same or different for each fact and write two of each | `mode:'compare', unit:''` |
| F6 | "Who Am I? Mystery Animal" · "Wer bin ich? Tierrätsel" / "¿Quién soy? Animal misterioso" / "Qui suis-je ? Animal mystère" · "Vem är jag? Djurgåta" / "Kuka olen? Eläinarvoitus" | Read the five clues, find the animal in the picture bank and write its name | `mode:'mystery', unit:''` |

`{U}` = `animals[loc][key].title` (sv/da/no panels decide indefinite vs definite in a heading). h1 = title; eyebrow = level label; strand rows per section 1 (`Writing` for base/F3/F4/F5; `Reading: Informational Text` for F6; F2 = a teaches-only label "Life science: animal characteristics", the §22.1 readiness shape, no alignment). JSON-LD `LearningResource`, `educationalAlignment.targetName` per section 1 (en), the framework NAME elsewhere, no `targetUrl`. Meta lead inherits `seo.words.free_printable` (README open item 1). Per-unit landings differ by animal name + quoted facts.

Non-cannibalisation (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F2 / F3 | write from a book vs circle one of three vs copy from a bank | 0.30 / 0.30 |
| base vs F4 · F5 / F6 vs base | blank fields vs printed file + three sentences · two files / clues vs one file | 0.25 · 0.15 |
| any vs G2-278 picture-writing | scene + story starters vs one animal + labelled facts; ours never says story or scene | 0.10 |
| F2 / F3 vs science sorts (K-204..G1-206) | many pictures to word bins vs one animal, six fields | 0.12 |
| base vs K-323 all-about-me | the child vs an animal; no name/age/family lanes | 0.10 |
| F6 vs G2-254 · vs the atlas activity | passage + questions vs five clues + a picture bank; find a detail vs infer the animal | 0.10 |

Boundary sentence on every landing: "One animal, six facts: a fact file, not a story about a picture and not a sorting page."

## 7 Hub visibility contract

A face appears under `animal-fact-file` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps['animal-fact-file'] = {default_subject:'science', default_age_range:'7-9', exercise_type_axis_key:'animal-fact-file'}` exists in `frontend/config/topics-taxonomy.json` (absent, m; registrar = the `tools/register-b2-taxonomy.js NEW_FAMILIES` clone; the science disc then holds 4 keys); (2) `axes['exercise-type']['animal-fact-file']` has `slug` + `name` in all 11 locales (section 1 slugs; the `science-sort` entry is the measured shape, 11/11); (3) exactly one landing per face per locale with `coordinate.type === 'animal-fact-file'` verbatim, the G2 level key of section 1, the wave's theme key, `unit` = the exemplar key (base F2 F3 F4) or `''` (F5 F6), a unique slug, `canonicalDeckSlug` = the published deck; a face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=animal-fact-file`. Script absent (m); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps['animal-fact-file']` lands. With a future unit fan the gate counts distinct FACES, not landings.

**Expected rows per locale:**

| state | loc | rows | note |
|---|---|---|---|
| table authored + reviewed (the design) | all 11 | 6 | sv/da/no/fi need ONE `def` (`nom` + `ade`) literal for the exemplar; F5/F6 need the wave theme's 7/7 pool >= 4 (`forest creatures` clears it on the proposed list) |
| table absent (banks only) | all 11 | 1 (base) | 0 animals at 7/7 today (m): F2-F6 unbuildable; the table is a PREREQUISITE, not a by-product |

Design total = **66 rows** (11 x 6); interim floor 11. Contingent reductions, recorded in the draft before the wave: a locale whose panel withholds the exemplar `def` ships 5 (no F4); a wave theme with < 4 (< 2) verifiable animals ships without F6 (F5).
