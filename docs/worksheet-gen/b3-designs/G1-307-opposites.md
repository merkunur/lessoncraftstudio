# G1-307 `opposites` (G1) : FINAL design (editor merge, 2026-09-13)

Merged from `_work/G1-307-pedagogy.md` + `_work/G1-307-design.md`. Every file, primitive, class and option below was read in the repo; every picture named was OPENED (record + what each shows: `_work/G1-307-critic.md`). (m) = re-measured by node 2026-09-13. Numbers marked *est.* are the engineer's to measure.

**Boundary (load-bearing).** LEXICAL: the child reads, writes, matches or chooses the WORD that means the opposite. `big-small` app (§14.10, subject logic, 3-5) + K-032..037/K-040 (`types/_shared/size-compare.js`, `SCALE_LADDER = [0.42,0.58,0.76,1.0,1.3]`, no words) own picture SIZE comparison; `data/science/hot-vs-cold.json` + `day-vs-night.json` own picture SORTS into two labelled bins; G2-275 sorts words by CLASS. No face here compares sizes, sorts into bins or classifies; every face prints or elicits an antonym.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `G1-307` / `opposites` / base G1. `default_subject: letters`, `assetClass: icon-placement`, `exerciseType: opposites`. Key ABSENT from `topics-taxonomy.json` (`apps.*` + `axes['exercise-type']`, grep = 0 (m)); register `apps.opposites = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'opposites'}` + slug/name x11 (shape of the registered sibling `word-classes`, `default_age_range:'7-9'`). |
| faces + bands | F1 picture match = **K** (`K-325+ TBD`) · base + F2 sentence + F3 pair-up + F4 opposite-or-same = **G1** (`G1-311+`) · F5 prefix = **G2** (`G2-320+`). Level keys per locale from `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`; no = Nordic +1). |
| theme axis | `themeAxis:{applicable:false}` on all six (m: weather backs 2 usable pairs, emotions 1, every other theme 0-1; a theme never reaches a page). Fan lever = the pair SET (section 2). |
| bank | `data/b2/word-classes.js` adjectives (m): en 28 · de 30 · es 30 · fr 30 · pt 32 · it 30 · nl 30 · sv 30 · da 30 · no 31 · fi 28. Complete antonym pairs inside it (m): en 4 · de 4 · es 3 · pt 3 (+ barulhento/quieto, panel rules) · fr 4 · it 3 · nl 4 · sv 4 · da 3 · no 6 · fi 4. So `data/b3/opposites.js` is its OWN panel-authored bank (~20 pairs), never read from `word-classes.js` at render. |
| pictures (opened) | 7 honest pairs, locale-neutral: big/small (one noun at scales 1.0 / 0.42) · hot/cold (`camping/campfire` + `weather/snowflake`) · happy/sad (`emotions/happy` + `sad`) · fast/slow (`zoo animals/cheetah` + `forest creatures/snail`) · heavy/light (`zoo animals/elephant` + `easter/feather`) · day/night (`weather/sun` + `space/moon`) · soft/hard (`around the house/pillow` + `camping/rock`). Reserve (panel per locale): sweet/sour (`candy` + `lemon`), sunny/cloudy (`sun` + `cloudy`; weak antonym, sun clash). REFUSED: `weather/hot` (a smiling sun), `weather/cold` (a PENGUIN in a hat), `space/sun` (opaque black square), `colors/white` (invisible on cream), full/empty via `jug.js` (prints numerals + `ml`). |
| CCSS (en, honest) | F1 L.K.5.b · base/F2/F3/F4 L.1.5 (umbrella; prose names L.K.5.b as the skill; NOT L.1.5.d, which is shades of meaning) · F5 L.1.4.b. Non-EN names the national framework only. |

| loc | genre head (title root) | ASCII slug | base level | strand (name only) |
|---|---|---|---|---|
| en | Opposites (F5 "Antonyms") | `opposites` | grade 1 (F1 kindergarten = the A head) | Language: vocabulary |
| de | Gegenteile (F3 "Gegensatzpaare") | `gegenteile` | 1. Klasse | Lehrplan: Sprache untersuchen |
| es (MX) | Antónimos (F4 "Sinónimos y antónimos") | `antonimos` | primer grado | SEP/NEM Lenguajes |
| pt (BR) | Antônimos (F4 "Sinônimos e antônimos") | `antonimos` | 1º ano | BNCC Língua Portuguesa (habilidade UNKNOWN, panel cites) |
| fr | Les contraires (F3 "mots de sens contraire") | `les-contraires` | CP | programmes: lexique |
| it | I contrari (F4 "sinonimi e contrari") | `i-contrari` | classe prima | Indicazioni: lessico |
| nl | Tegenstellingen | `tegenstellingen` | groep 3 (F1 kleuters) | SLO kerndoel 12 |
| sv | Motsatsord | `motsatsord` | åk 1 | Lgr22: ord och begrepp |
| da | Modsætninger | `modsaetninger` | 1. klasse | Fælles Mål: ordkendskab |
| no | Motsetninger | `motsetninger` | 2. trinn | LK20: ord og begreper |
| fi | Vastakohdat | `vastakohdat` | 1. luokka | OPS 2014: kielitieto |

## 2 The base page

**Concept.** "Read the word, write its opposite." A shuffled bank of the eight answers across the top; eight cream cards 2x4, each printing ONE word (Baloo 2 700 28) beside a small teal two-way arrow and a school-line lane where the child writes the opposite. Direction random per card (big -> small here, small -> big there), so neither member is "the answer word". No pictures at d2 (uniform cards; only 7 pairs are pictureable, and the sun/elephant clash rules make a half-pictured page). Owned skill: PRODUCING the antonym in writing.

**Layout d2** (page 703x945, `.ws-page` padding 0 14 -> inner 675; body ≈ 760):
```
+------------------------- wordBank 675 x <=112 (2 rows) -------------------------+
| ( small ) ( cold ) ( slow ) ( quiet ) ( light ) ( wet ) ( heavy ) ( sad )       |
+---------------------------------------------------------------------------------+
+--------- card 330x158 ---------+  +--------- card 330x158 ---------+
|[1]  <=>  big                   |  |[2]  <=>  hot                   |  word Baloo 2 700 28
|     ______________________     |  |     ______________________     |  writingRow 302x64 glyphH 28
|     - - - - - - - - - - -      |  |     - - - - - - - - - - -      |
+--------------------------------+  +--------------------------------+
                        4 rows x 2 cols, gap 14
```
- Bank: `wordBank({words, wordPx:18})` (`templates/components-b2.js:210`; `.ws-bank` padding 8 12, `.ws-bankword` padding 6 14 Nunito 800). 8 words of 5-9 letters = 2 rows; height *est.* 100-112 (engineer measures a fi/de render). Build guard: estimated pill widths `28 + 0.62*18*len + 10` summing past 2 x 651 -> throw -> refusal, never a 3rd row.
- Grid: `cardGrid({cols:2, rows:4})` (`templates/layouts/card-grid.js`, gap 14) in 760 - 112 - 14 = 634 -> row 158 -> `.ws-card` padding 12 + border 2 -> inner **302x130**. Stack: word line 34 + 8 + lane 64 = 106 <= 130.
- Card: `<div class="ws-card-stage" style="flex-direction:column;padding:4px 0" data-ws-content data-lcs-pair data-lcs-a data-lcs-b data-lcs-dir>`; line 1 = `oppositeArrow()` 36x20 + `<span data-lcs-given>`; line 2 = `writingRow({w:302, h:64, glyphH:28, xHeight:true}).svg` (`primitives/trace-path.js:681`, returns `{svg,width,height}`, stamps `data-lcs-prim="writing-row"`). Word >= 26 floor (G1 `_tokens.js:69`: 44 / 26 / 6-12); 8 items.
- `maxLetters 12` both members (given 12 x ~15 px + arrow 48 <= 302; written ~14 glyphs at 21 px *est.*); longer pairs drop from d2, recorded.

**Ladder** (config keys; guards key on the config, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards / cols / rows | 6 / 2 / 3 | 8 / 2 / 4 | 10 / 2 / 5 |
| bank / cue | true / `pic` where honest (<= 3 cards) | true / false | false / false |
| tiers | [1] | [1,2] | [1,2] |
| wordPx / glyphH / laneH | 30 / 28 / 64 | 28 / 28 / 64 | 26 / 28 / 64 |
| maxLetters / minPerDir | 10 / 2 | 12 / 3 | 12 / 4 |

d1 card inner 302x174: `pairCard` 160x88 cue (both states, scale 80 vs 44) + 8 + lane 64 = 160. d3 card inner 302x116: 30 + 6 + 64 = 100, no bank, from memory.

**Pool.** `OPPOSITES[loc].pairs` by tier, both members `/^[\p{L}\- ]+$/u` and `<= maxLetters`, no two pairs sharing a word, `exclusiveWith` honoured; sample-or-throw (`lib/b2-common.js:64` pattern, `who:'G1-307'`); `dir` per card by `rng`, re-rolled until each direction >= `minPerDir`. Fan lever = `variantsPerType` re-sampling 8 of ~20 pairs; the wave ships variant 1 (enumerate: a themeless type emits ONE instance per (type, difficulty, locale), `enumerate.js:19-21`).

**Answer-hiding + uniqueness.** The written word appears ONLY in the bank, never on its card. Stamps `data-lcs-pair` (`big-small`), `data-lcs-a/-b`, `data-lcs-dir` (`ab` = a printed), `data-lcs-given`; root `data-lcs-face="base|match|frames|pairup|choice|prefix"` stamped only when a face declares it (base stays byte-identical). `verify(page)`: card text === `given`; `given === (dir==='ab' ? a : b)`; bank set === the 8 answers, no bank word equals a given; pair keys unique; no word in two roles; both directions >= `minPerDir`; one empty `[data-lcs-prim="writing-row"]` per card; svg widths <= 302; d1 `data-lcs-cue-key === data-lcs-pair`. Node-side re-derivation (`page.evaluate` cannot require): `tools/gate-opposites-data.js`, every stamped `(pair,a,b)` is a bank pair VERBATIM (poison: stamp `small -> little` -> FAIL).

**Reused (exact).** `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-lane .ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right) .ws-pill .ws-nchip .ws-tile(--word) .ws-tilerow .ws-scene-banner .ws-bank .ws-bankword .ws-icon` (`page/page.css:126-163, 274, 354-422`); `writingRow`; `wordBank`, `wordTiles({tokens,order,fontPx,tileH,extraClass})` (`components-b2.js:26`); `svgRoot roundedRect circle line el label esc` (`primitives/_svg.js`); `fileUri`; `SENTENCES[loc].names` (8 per locale (m)); tokens `T.teal T.coral T.ink T.grid T.white`, `F.display F.body`. NOT used: `answerBox` (a box invites a numeral), `pillChoice` (no per-item stamp), `jug`, `displayWord` (adjectives never capitalised), `entriesFor` or `word-classes.js` at render.

**NEW in `templates/components-b3.js`** (file absent (m); the batch's first design creates it): `oppositeArrow({w=36,h=20})` (two opposed heads on one shaft, `T.teal` 3 round caps, `data-lcs-opp-arrow`, `aria-hidden`; 48x24 as a lane separator) · `pairCard({picA:{theme,noun}, picB, transformB:'scale'|'none', size=80, w=160, h=88, cueKey})` (white tile, two `.ws-icon` baseline-aligned, K-032 idiom; `scale` -> 80 / 44, never below 44; `none` -> both 64; no mirror, X or opacity) · `matchColumns({left:[{html,key}], right:[{html,key}], itemH, colW})` (F1) · `frameRow({pic, text, laneW, laneH=56, glyphH=28, fontPx=19})` (F2) · `pairLane({w=260, h=64, glyphH=28})` (F3: two `writingRow`s round an arrow) · `choiceRow({target, chips:[{word,key}], pillPx=22})` (F4) · `prefixChips({prefixes, px=22})` (F5 legend, `.ws-nchip` 44 high, `data-lcs-prefix`, never an answer).

**Locale slot structure.** Citation form on every chip/card: es/pt/it/fr MASCULINE sg · de lowercase · nl base form (no -e) · sv/da/no INDEFINITE common sg (`stor`, never `stora`) · fi nominative sg (`iso`). No noun is printed beside an adjective anywhere on this type, so nothing agrees with a picture; a cue picture's vocab noun never prints either (`rock` = fi `kallio`; only "hard" prints). Frames: section 3 F2.

**Alternatives.** Alt A picture-pair base: honest (7 pairs) but it is the K move; kept as F1. Alt B full-width rows with a cue column: 3 of 6 cue zones empty at d2. Alt C two-column match as base: the scaffold rung, not the head. Both rejected.

**Risks -> mitigations.** A word in two pairs (fast/slow, slow/quick): validator bijection, extra partners go to `syn`. Bank 3rd row (fi/de): build guard -> refusal. Direction bias: `minPerDir` re-roll + verify. en "short" = antonym of tall AND long: `exclusiveWith`. Palette: teal, coral, cream, grid, ink; no new hex. **Print check:** 703x945 by construction; d2 stack 112 + 14 + 634 = 760 (the bank height is the slack: measure it first); lane glyphH 28 = 7.4 mm; 3 px teal arrows ≈ 60 % grey on mono laser; no meaning rides on colour.

## 3 Faces 2-6

All five are CODE faces (`layout` knob + `verify` branch; base byte-identical); `tools/gate-variation-distinct.js` sees five distinct resolved d2 configs. It reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (m), so a b3 wave file / rows list is required before it sees this type (critic OPEN 8). `.ws-lane` = border 2 + padding 12 16 -> inner width 639.

### F1 : Match the Opposite Pictures (K, `K-3xx TBD`, `layout:'match'`)
EN "Opposites with Pictures: Match the Opposites". **Move:** RECOGNISE the relation on picture + word, no writing (L.K.5.b; the en/nl K head). **Layout:** `matchColumns` 6 pairs; `.ws-match` padding 6 30, col gap 12 -> itemH = floor((760 - 12 - 60)/6) = 114; left item 280x114 cream `[pic 80][word Baloo 26]` `data-lcs-left`, dot `--right`; right item 280x114 white, the OPPOSITE picture + word, deranged (`rng.shuffle` until no fixed point, `lit-vocab-match.js:44` idiom), `data-lcs-right`. `kind:'two'` = both nouns; `kind:'scale'` = one noun at 80 left, 44 right (K floor 56 on the larger; engineer confirms 44 legible at 11.6 mm), at most ONE scale pair per page; every noun once per page (`sun` backs day AND sunny, `elephant` heavy AND scale). **Config** `{layout:'match', pairs:6, wordPx:26, picPx:80, tiers:[1], maxScale:1}`; d1 4 pairs (itemH 175, pic 100); d3 7 pairs, right-column words hidden (`hideRightWord`). **Verify:** 6/6 keys, derangement, `data-lcs-right` === `b`, both pictures resolve, no noun twice, no B&W path, icons >= 56. **Pool (opened):** 7 pairs -> 6 sampled; 20-seed sweep: every pair in >= 12 seeds. **Query face:** "with pictures" / "kleuters" / "con dibujos" / "med bilder" / "kuvilla". **Boundary:** the science banks SORT unlabeled pictures into bins; K-225 matches a word to its OWN picture; here a line joins two DIFFERENT pictures, both worded.

### F2 : Opposites in a Sentence (G1, `layout:'frames'`)
EN "Opposites in a Sentence". **Move:** USE the antonym in context: a negated frame forces it ("The elephant is not small. It is ___."). **Layout:** bank of 6 (one row ≈ 56) + 6 `frameRow` lanes h 106 (padding 8 16 -> inner 90): `[pic 64][text 563 px: line 1 Nunito 800 19 (<= 45 chars, validator), line 2 with an inline writingRow 200x56 glyphH 28 at the blank + the end mark]`; 24 + 4 + 56 = 84 <= 90. **Frames are WHOLE panel-authored literals with a stored `answer`** (the pedagogy's rule: the code never places an adjective beside a noun it chose). `{name}` is permitted ONLY where the predicative adjective does not inflect for gender: **en de nl fi** (uninflected) and **sv da no** (a person = common gender singular = the citation form); **es pt it fr: FORBIDDEN** ("Sofía no es pequeño" is wrong); those panels write an object subject with fixed gender, and the answer literal may be feminine ("A girafa não é baixa. É ___" -> `alta`), in which case the bank prints `alta` (bank = the frames' answer literals). `nameSlot:true|false` per locale; names from `SENTENCES[loc].names`, the same name in both sentences, never a pronoun. **Config** `{layout:'frames', rows:6, bank:true, glyphH:28, fontPx:19}`; d1 4 rows pictured; d3 7 rows no bank (8 rows = 784 > 760). **Verify:** `text` contains `a` and NOT `answer` (leak); answers distinct; bank === answers; `{name}` absent where `nameSlot:false`; `pic` resolves; one empty writing-row per lane. **Query face:** "in a sentence" / "im Satz" / "en oraciones" / "dans une phrase" / "i meningar" / "lauseessa". **Boundary:** G1-249 orders words; here one adjective slot.

### F3 : Pair Up the Opposites (G1, `layout:'pairup'`)
EN "Pair Up the Opposites". **Move:** nothing given: find the 6 hidden pairs among 12 mixed words and WRITE each pair (the design's lanes, not the pedagogy's line-mesh: lines crossing inside a 4x3 block cannot be read back). **Layout:** `wordTiles({tokens:12, order, fontPx:20, tileH:44, extraClass:'ws-tile--word'})` centred flex-wrap (≈ 110) + 6 numbered `.ws-lane` rows h 74 (padding 5 -> inner 64): `pairLane` = `[writingRow 260x64][oppositeArrow 48x24][writingRow 260x64]` = 30 + 260 + 12 + 48 + 12 + 260 = 622 <= 639; total 110 + 16 + 444 + 50 = 620. Shuffle: a pair's chips never adjacent (`|i - j| >= 2` in reading order); 20-seed sweep asserts it. **Config** `{layout:'pairup', pairs:6, tiers:[1,2], fontPx:20, maxLetters:12}`; d1 4 pairs (lanes h 90); d3 8 pairs (16 chips, 8 rows h 64: 130 + 512 + 56 = 698). **Verify:** 12 chips = 6 keys x 2; adjacency; lanes empty; each word in one pair. Chips allow spaces (da `ked af det`); chip width for `kovaääninen` at 20 px *est.* 150 (measure). **Query face:** "pair up" / "Gegensatzpaare" / "parejas de antónimos" / "motsatspar" / "vastakohtaparit". **Boundary:** F1 gives the left column; here nothing is given.

### F4 : Opposite or the Same? (G1, `layout:'choice'`)
EN "Opposite or the Same? Circle the Opposite". **Move:** DISCRIMINATE the antonym from a near-synonym of the target (the es/pt/it "sinónimos y antónimos" head). Ruling over the family-intruder odd-one-out: `[big, small, red]` is solved by CATEGORY without the antonym relation (a bot scores 100 %); `[cold, warm, red]` for target `hot` is not. No synonym bank exists today (both files agree); `pairs[].syn.a` (a G1-legible near-synonym of the TARGET) is authored in the same draft as the pairs. **Layout:** 6 two-line `.ws-lane` rows, h (760 - 60)/6 = 116 (inner 88): line 1 target Baloo 2 700 26 `data-lcs-target`; line 2 three white `.ws-pill` (Baloo 700 22, padding 6 24, h 40; <= 11 letters ≈ 193 wide; 3 + 2 gaps 12 = 603 <= 639); 30 + 8 + 40 = 78 <= 88. Chips = antonym `b`, `syn.a`, one `far` word (a bank word from another family), shuffled; correct index takes all three positions over the page. **Config** `{layout:'choice', rows:6, chips:3, synonym:true, pillPx:22, maxLetters:11}`; d1 6 rows, 2 chips (antonym + far; category-solvable, the entry rung, not shipped); d3 8 rows pills 20 px. **Verify:** exactly one pill per row equals `b`; the syn pill is `syn.a` and equals no pair's `b` for that target (P5: `little` for big/small = a second correct answer -> FAIL); `far` from another family; index not constant; no word twice on the page. **Refusal:** < 8 pairs with `syn` in a locale -> F4 refused there, recorded (est. 0-2 locales; the panel decides). **Query face:** "opposite or same" / "Gegenteil oder gleich" / "sinónimos y antónimos" / "sinonimi e contrari" / "motsats eller samma" / "vastakohta vai sama". **Boundary:** K-235 sorts by category; nothing here is a category.

### F5 : Make the Opposite with a Prefix (G2, `G2-3xx TBD`, `layout:'prefix'`)
EN "Antonyms with un-, dis- and in-" (the en "antonyms 2nd grade" head). **Move:** MORPHOLOGY: build the antonym from the locale's negative prefix (L.1.4.b, honest on a G2 page). **Layout:** `prefixChips` legend (56) + 8 `.ws-lane` rows h 80, gap 6 (padding 8 12 -> inner 64 x 647): `[base Baloo 24, col 220][oppositeArrow 48x24][writingRow 300x60 glyphH 26]` = 592 <= 647; 56 + 12 + 8x80 + 7x6 = 750 <= 760. 8 rows because the G2 floor is 8-16 items (`_tokens.js:70`); glyphH 26 >= 24 (brief, G2-3 handwriting). **Config** `{layout:'prefix', rows:8, glyphH:26, showLegend:true}`; d1 6 rows, prefix printed on every row; d3 10 rows no legend (h 66, glyphH 24) and, in en/es/pt/fr/it only, a 2-3 prefix bank the child chooses from; de/nl/sv/da/no/fi have ONE productive prefix -> d3 = d2 + rows (recorded, not faked). **Verify:** no `expected` visible; `expected === prefix + base` OR a stored literal with `expected.endsWith(base)` and `prefix` in `prefixes` (it `sfortunato`, fr `impoli`); `base` not in `ban`; legend === prefixes used. **Refusal:** < 8 items -> refused, recorded. **Query face:** the prefix string. **Boundary:** G2-315 spelling rules; G2-316 compounds.

**Rejected non-moves.** Theme swap · picture-only "big or small?" (K-032 / the app) · picture sorts (science banks) · line-mesh pair-up (unreadable) · family-intruder odd-one-out (category-solvable) · synonym odd-one-out (two answers) · crossword-lite (box count leaks length) · cut-and-paste pairs (F3 with scissors) · "draw the opposite" (open-ended, becomes size) · d1/d3 relabelled.

## 4 Native rebuild plan x11

Citation forms as section 2. ~20 pairs per locale = the 3-6 bank pairs (m; validator cross-checks spelling) + panel pairs; `syn.a` for >= 8; >= 6 frames; >= 8 prefix items; six titles (genre head, <= 70, no worksheet-word, unique in band) + instructions (<= 150, the child's sentence). EN handed over as a SOURCE TO AUDIT.

| loc | bank pairs (m) | `nameSlot` | prefix inventory (panel authors; *est.*) | refusals | traps |
|---|---|---|---|---|---|
| en | big/small hot/cold fast/slow loud/quiet | true | un- (happy kind safe fair tidy lucky), dis- (honest obey), in- (visible) | none | `small` is THE answer, `little` in `alt` (answer-key note); "short" vs tall AND long: `exclusiveWith` |
| de | groß/klein heiß/kalt schnell/langsam laut/leise | true | un- (glücklich freundlich ordentlich gesund ruhig bekannt ehrlich sichtbar) | none | head "Gegenteile"/"Gegensatzpaare"; adjectives lowercase; capital only sentence-initially in frames; DaZ register welcome |
| es (MX) | grande/pequeño caliente/frío rápido/lento | **false** | in-/im- (feliz posible cómodo paciente), des- (ordenado conocido obediente) | none | chico vs pequeño (panel picks ONE; rule 8 accepts a declared override); `caliente` never with a person subject; titles carry "antónimos" |
| pt (BR) | grande/pequeno quente/frio rápido/lento (+ barulhento/quieto, panel) | **false** | in- (feliz possível), des- (arrumado conhecido obediente), im- (paciente) | none | "antônimos" circumflex; `quieto` = still, not silent; frames use gender-fixed object subjects |
| fr | grand/petit chaud/froid rapide/lent propre/sale | **false** | in-/im- (connu visible possible poli patient), dé- (faire), mal- (heureux honnête) | none | content/triste is the CP pair; "mots de sens contraire"; `im-` before p/b/m is a stored literal; no liaison-sensitive frames |
| it | grande/piccolo caldo/freddo veloce/lento | **false** | s- (fortunato contento), in- (felice possibile), dis- (ordinato onesto attento) | F5 may band classe seconda (still G2) | "i contrari" base, "sinonimi e contrari" F4; `s-` join is a stored literal |
| nl | groot/klein heet/koud snel/langzaam luid/stil | true | on- (gelukkig eerlijk rustig beleefd gezond bekend veilig handig) | F5 d3 prefix-choice refused | warm/koud is the groep-3 pair (heet is bank): panel picks; de/het never printed; F1 at kleuters |
| sv | stor/liten varm/kall snabb/långsam hög/tyst | true | o- (lycklig vänlig snäll trevlig säker känd artig rättvis) | F5 d3 refused | `orolig` = worried: `rolig` BANNED (`prefix.ban`); `liten` suppletive (`lilla/små`): chips print `liten`, frame subjects singular common; never `grupp` |
| da | stor/lille varm/kold hurtig/langsom | true | u- (venlig høflig sikker kendt rolig sund heldig ærlig) | F5 d3 refused | `ked af det` = 3 words (chips allow spaces); `urolig` = restless (panel confirms the child's reading) |
| no | stor/liten varm/kald rask/langsom høy/stille lang/kort tung/lett | true | u- (vennlig høflig sikker kjent rolig sunn heldig lykkelig) | F5 d3 refused | bokmål only; glad/trist or glad/lei seg (panel); band 2. trinn |
| fi | iso/pieni kuuma/kylmä nopea/hidas kovaääninen/hiljainen | true | epä- (rehellinen siisti kohtelias tavallinen selvä varma mukava reilu); `-ton` NOT used | F5 d3 refused; F5 band 2. luokka | frames "X ei ole pieni, vaan iso." (`vaan`); predicative nominative, no case issue; `kovaääninen` chip width (measure) |

Every panel OPENS every `pic` it keeps (`picOpened:true` per pair, asserted): `weather/hot` and `weather/cold` prove the file name is not the picture.

## 5 Data + gates

`data/b3/opposites.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; en hand-authored; `data/` gitignored, force-add; both tools absent (m), owned by the batch's first design):
```
OPPOSITES[loc] = {
  nameSlot: true|false,                       // {name} allowed in frames (false: es pt it fr)
  pairs: [{ id:'big-small', a:'big', b:'small', tier:1, pos:'adj'|'noun', family:'size',
            alt:['little'],                    // answer-key note only, never printed
            exclusiveWith:['long-short'],     // never on one page
            syn:{ a:'large' }, far:'red',      // F4: near-synonym of a; unrelated word
            pic:{ kind:'scale', theme:'animals', noun:'dog', scales:[1.0, 0.42] }
               | { kind:'two', a:{theme:'camping',noun:'campfire'}, b:{theme:'weather',noun:'snowflake'} }
               | null, picOpened:true }],
  frames: [{ pair:'big-small', text:'The elephant is not small. It is ___.', answer:'big',
             pic:{theme:'zoo animals',noun:'elephant'} }],
  prefix: { prefixes:['un','dis','in'], items:[{ base:'happy', prefix:'un', expected:'unhappy' }], ban:[] },
  strings: { 'G1-307':{title,instruction}, F1..F5:{...} } }
```
**`tools/validate-b3-draft.js` (opposites block; absent (m); all rules run, exit 1 on any):** (1) `pairs` is a bijection: every word in exactly ONE pair, `a !== b`, ids unique, `exclusiveWith` ids exist; (2) members `/^[\p{L}\- ]+$/u`, <= 14 chars, lowercase (de too); (3) every `pic` resolves via `fileUri(theme, noun)`, noun not in `B2_EXCLUDE` (`lib/b2-common.js:35`), theme carries no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`), `scale` has 2 scales with ratio >= 1.3, `picOpened:true`; (4) >= 6 pictured pairs after `exclusiveWith` + one-noun-per-page + one-scale-per-page, else F1 refused, reported; (5) `frames`: `text` contains `a` and not `answer`; `answer` is `b` or a declared form in `pairs[].forms`; `{name}` only if `nameSlot`; <= 45 chars per line; >= 6 frames, distinct answers; (6) `syn.a` differs from every pair's `b` for that target and from `far`; >= 8 pairs with `syn` else F4 refused; (7) `prefix.items`: `expected` starts with a listed prefix and ends with `base`; `base` not in `ban`; a `base` that is also a pair member (happy) is allowed only if that pair is excluded from the F5 page; >= 8 items else F5 refused; (8) a word present in `WORD_CLASSES[loc].adjectives` is spelled identically (declared overrides accepted); (9) titles: worksheet-word guard, <= 70, unique in band; instruction <= 150.
**`qa/verify-b3-opposites.js`:** renders face x 11 locales at d2; `verify()` empty; `qa/lints.js` clean; density asserted itself (`.ws-icon` >= 56 K / 44 G1; pills >= 40 high; lanes glyphH >= 26); 20-seed sweep: base bank never in card order, F1 every pair used, F3 adjacency 0, F4 correct index takes all 3 values. **Poison** (each must FAIL; the correct draft is the control): P1 `small` in two pairs; P2 frame "The elephant is not small. It is big."; P3 `pic.b = {theme:'weather', noun:'cold'}` (the penguin: passes the file check, fails `picOpened` = the human open IS the gate); P4 sv item `rolig -> orolig`; P5 F4 `syn.a = 'little'` on the pair `big-small` for target `big` (a second correct chip); P6 `sun` backing day AND sunny on one F1 page; P7 a `zoo animals bw` noun; P8 es frame with `{name}`.
**Page reads:** `data/b3/opposites.js[loc]`, `fileUri`, `SENTENCES[loc].names`; never `image-vocabulary.js`, `word-classes.js` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (120-170 whole; the child's instruction) | coordinate |
|---|---|---|---|
| base | "Opposites: Write the Opposite Word" · "Gegenteile: das Gegenteil schreiben" / "Antónimos: escribe el contrario" / "Motsatsord: skriv motsatsen" | Read each word and write its opposite from the word bank on the line | `{type:'opposites', mode:null, theme:'', level:<G1 key>}` |
| F1 | head + "with pictures" / "mit Bildern" / "kleuters" / "con dibujos" / "med bilder" / "kuvilla" | Draw a line from each picture to the picture and word that show its opposite | `level:<K key>` |
| F2 | head + "in a sentence" / "im Satz" / "en oraciones" / "i meningar" / "lauseessa" | Finish each sentence with the opposite of the word it says "not" | G1 |
| F3 | "Pair Up the Opposites" · "Gegensatzpaare finden" / "Une las parejas de antónimos" / "Para ihop motsatsorden" · "Yhdistä vastakohtaparit" | Find the two words that are opposites and write each pair on a line | G1 |
| F4 | "Opposite or the Same?" · "Gegenteil oder gleich?" / "Sinónimos y antónimos: encierra el antónimo" / "Motsats eller samma?" · "Vastakohta vai sama?" | Circle the word that means the opposite, not the one that means the same | G1 |
| F5 | "Antonyms with un-, dis- and in-" · "Gegenteile mit der Vorsilbe un-" / "Antónimos con des- e in-" / "Motsatsord med o-" · "Vastakohdat epä-alkuliitteellä" | Add the prefix to each word and write the new opposite word on the line | G2 |

h1 = title; eyebrow = level label; strand row per locale (section 1). JSON-LD `educationalAlignment` en only (F1 L.K.5.b · base/F2/F3/F4 L.1.5 · F5 L.1.4.b), no `targetUrl`. `topicMeta.opposites` (>= 50 chars) + `skill-sentences.en.json` entry via `tools/register-b3-en-content.js` (absent (m)). Meta lead inherits `seo.words.free_printable` (`frontend/messages/en.json:842`; the "free" claim is a standing open item, MEMORY "tier truth").

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what differs in the copy | est. |
|---|---|---|
| base vs F1 | write vs draw a line; G1 vs K; no pictures vs pictures | 0.30 |
| base vs F2 | word alone vs a sentence that says "not" | 0.35 |
| base vs F3 | a bank gives the answers vs nothing given, find the pairs | 0.30 |
| F4 vs base | a synonym decoy; circle vs write | 0.25 |
| F5 vs base | prefix, morphology, "antonyms", grade 2 | 0.20 |
| F1 vs K-032..037 / `big-small` app | their titles say big/small/tall/long and compare PICTURES with no word; ours say opposites, print both words, one scale pair at most | 0.10 |
| F1 vs science hot-vs-cold / day-vs-night | sort into two bins vs a line between two worded pictures | 0.15 |
| F2 vs G1-249 · F4 vs G2-275 · F5 vs G2-315/316 · any vs K-319 | order words vs one slot · class sort vs antonym/synonym · spelling/compounds vs a prefix · feeling words vs one happy/sad pair | 0.10-0.15 |

Boundary sentence on every landing: "The child works with the WORD that means the opposite" (against size comparison and picture sorting).

## 7 Hub visibility contract

A face appears under `opposites` on `/[locale]/worksheets` IFF: (1) `apps.opposites` exists in `frontend/config/topics-taxonomy.json` (absent (m); missing = rendered NOWHERE in the rail); (2) `axes['exercise-type'].opposites` has `slug` + `name` in all 11 locales (section 1 slugs; registrar clone of `tools/register-b2-taxonomy.js NEW_FAMILIES`); (3) exactly one landing per face per locale with `coordinate.type === 'opposites'` verbatim, the band-table level key (F1 K key, F5 G2 key, the rest G1), a unique slug, `canonicalDeckSlug` = the published deck; (4) the landing JSON committed AND deployed (per-process cache). A face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded.

Gate: `node scripts/verify-hub-type-rows.js --keys=opposites`. Script absent (m) (nearest siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps.opposites` lands. **Expected rows:** 6 per locale x 11 = 66 on the design (no refusal is measured today); contingent reductions, each recorded in the draft before the wave: F4 in any locale whose panel supplies < 8 `syn` (est. 0-2 locales) and F5 in any locale below 8 prefix items (est. 0). A locale with a recorded refusal expects 5.
