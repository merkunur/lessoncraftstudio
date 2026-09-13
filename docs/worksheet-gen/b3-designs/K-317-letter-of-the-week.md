# K-317 `letter-of-the-week` (K) : FINAL design (editor merge, 2026-09-13)

Merged from `_work/K-317-pedagogy.md` + `_work/K-317-design.md`. Every file, primitive and option name below was read in the repo. (m) = re-measured by node 2026-09-13 (`entriesFor` x 50 colour themes, intersected with `approved-words-<loc>.json`; da = the strict `policy_managed:false` pool); (p) = the pedagogy file's grapheme-true counts, not re-run. Resolutions + open items: `_work/K-317-critic.md`.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `K-317` / `letter-of-the-week` / K. `default_subject: letters`, `assetClass: icon-placement`, `exerciseType: letter-of-the-week`. Key ABSENT from `topics-taxonomy.json` (`apps.*` and `axes['exercise-type']`, grep = 0): register before the wave (section 7). |
| theme axis | **`{applicable:false}`**. (m) a single theme reaches 4 initial nouns + 4 foils for few (theme, letter) pairs (en 75 of 1,300; de 64; fr 59; da 14); best single theme anywhere = `At the Supermarket`/p, 12 hits. A themed page would make the LETTER a function of the theme. Pictures come from a cross-theme per-letter pool authored per locale (the K-221 model), BW excluded by the localized marker. |
| pool rule | per (locale, letter): `items` = words STARTING with the letter (sound-level `graphemes[0] === L`; letter-level `word[0] === L`) plus non-initial items for faces 2-4; `foils` = words whose NFD base contains no `L` (`école` is neither an e-hit nor an e-foil). Floor per letter: 8 initial, 2 medial, 2 final (where the language has finals), 6 foils; a letter below the floor drops out of that face, reported, never filled. |
| eligible pool (m) | approved AND pictured AND traceable, distinct by word: en 796 · de 703 · es 759 · pt 713 · fr 641 · it 770 · nl 732 · sv 667 · da 295 · no 584 · fi 780 |
| letters passing the base floor (m) | en 22 · de 21 · es 21 · pt 21 · fr 18 · it 19 · nl 22 · sv 19 · da 17 · no 20 · fi 21 (grapheme-true (p): de 20, nl 21, sv 18, no 20) |
| fan lever | the LETTER. Wave nt20-C ships ONE exemplar letter per face per locale (`exemplar` in the bank); the per-letter fan is the named additive knob `letterAxis` (section 2). |
| CCSS (K, honest) | base RF.K.1.d + RF.K.3.a (+ RF.K.2.d sound-level) + L.K.1.a · F2 RF.K.2.d · F3 RF.K.2.d · F4 RF.K.1.d · F5 en = readiness, NO code (digraphs = RF.1.3.a) · F6 RF.K.3.a. Non-EN prose names the national framework. |

| loc | genre head in the title | ASCII slug | school level (base) | letter vs sound |
|---|---|---|---|---|
| en | Letter of the Week | `letter-of-the-week` | kindergarten | letter |
| de | Buchstabeneinführung (no "Buchstabe der Woche" genre; F3 = Anlaut, Inlaut, Auslaut) | `buchstabeneinfuehrung` | Vorschule; panel may band 1. Klasse | sound (chunks = graphemes) |
| es | La letra M (F6 "sonidos iniciales") | `la-letra` | preescolar | sound (panel graphemes) |
| pt | Atividades com a letra M | `atividades-com-a-letra` | educação infantil | sound (panel graphemes) |
| fr | La lettre M (F5 = Le son [ou]) | `la-lettre` | maternelle GS; F5 CP | letter; F5 son |
| it | La lettera M | `la-lettera` | infanzia; panel likely classe prima | sound (panel graphemes) |
| nl | Letter van de week (hunt = beginklank) | `letter-van-de-week` | kleuters; F5 groep 3 | sound (chunks = graphemes) |
| sv | Veckans bokstav | `veckans-bokstav` | förskoleklass | sound (chunks = graphemes) |
| da | Ugens bogstav | `ugens-bogstav` | børnehaveklasse | letter (strict pool) |
| no | Ukens bokstav | `ukens-bokstav` | 1. trinn | sound (chunks = graphemes) |
| fi | Viikon kirjain (base adds "kirjainjahti" against the capitalisation collision) | `viikon-kirjain` | esikoulu | sound (panel graphemes; double letter = one unit) |

## 2 The base page

**Concept.** One letter owns the page, three zones a non-reader follows top to bottom: (1) trace the capital and the small letter, (2) circle the four pictures whose name BEGINS with the letter, (3) write a row of each form beside a solid model. No word is printed, so the answer is never on the page.

**Layout d2** (body 703x760, column 660, zones `justify-content:space-evenly`):
```
+-----------+  +----------------------------------------------+
| letterCard|  | M  M  M  M  [ ]   capital lane 496x80        |  zone 1  h 166
| 150x150   |  | m  m  m  m  [ ]   small lane   496x80        |
+-----------+  +----------------------------------------------+
+-------+ +-------+ +-------+ +-------+
| pic100| | pic100| | pic100| | pic100|   huntCard 156x140, gap 12       zone 2  h 292
+-------+ +-------+ +-------+ +-------+
+-------+ +-------+ +-------+ +-------+
| pic100| | pic100| | pic100| | pic100|
+-------+ +-------+ +-------+ +-------+
| M  ______________________________________   trio 660x56       zone 3  h 118
| m  ______________________________________   trio 660x56
```
166 + 14 + 292 + 14 + 118 = 604 <= 760, ~156 px of air. Root: `<div data-ws-content data-lcs-target="m" data-lcs-target-upper="M" data-lcs-level="sound|letter" data-lcs-scope="initial">`.

- Zone 1: `letterCard` (NEW) 150x150 = `strokeLetterLane({text:'Mm', w:134, h:110, glyphH:64, reps:1})` (two glyphs, no BOX centring; 106 units x 0.94 = 100 px). Lanes `strokeLetterLane({text:'M', w:496, h:80, glyphH:52, reps:5, emptyLast:true})` + the same with `text:'m', lowercase:true`. **Measured** (`textLaneGeometry`, LANE_PAD 6, METRICS capMarkTop 1 / capTop 16 / ascender 14 / base 84 / desc 96): a 74 px lane caps the CAPITAL at 48.7 (span-limited 68/95); 80 px gives the full 52; lowercase reaches 52 at 74. Badges off (glyphH < 80); rep 1 carries dot + arrows.
- Zone 2: 8 `huntCard` (NEW) 156x140, icon 100 (K floor 56), rotation +-4 deg, no caption, no alt. 4 hits + 4 foils shuffled; a 20-seed sweep must put hits in >= 6 of 8 slots.
- Zone 3: `strokeWordLane({text:'M', w:660, h:56, glyphH:40, reps:1, stack:true, padLeft:10})` and the same for `m`: one solid model on a school-line trio, the rest empty (K-284's caption trick, 0 new code).

**d1 / d2 / d3** (config `{hunt:{n,hits,foilPolicy}, trace:{glyphH,laneH,reps}, write:{glyphH,laneH}, scope}`; guards key on the config, never the level index):

| | d1 | d2 (ships) | d3 |
|---|---|---|---|
| hunt | 6 cards 3x2 212x150 icon 110, 3 hits | 8 cards, 4 hits, foils from `avoid` initials | 8 cards, 4 hits, foils = `pair` letter x2 + 1 foil containing L non-initially |
| trace | glyphH 56, laneH 90, reps 4 | glyphH 52, laneH 80, reps 5 | glyphH 48, laneH 74, reps 5 |
| write | glyphH 44, laneH 60 | glyphH 40, laneH 56 | glyphH 40, laneH 56 |
| height | 652 | 604 | 560 |

**Answer hiding + uniqueness.** `huntCard` stamps `data-lcs-word data-lcs-vocab data-lcs-graphemes='["m","a","u","s"]' data-lcs-hit="1|0"`. `verify()` re-derives hit as `graphemes[0] === target` (sound) or `word.toLocaleLowerCase(lang)[0] === target` (letter); hits === `data-lcs-hits` (4); foils >= 4 with `NFD(word)` free of the base letter; no duplicate word or vocab key; every `img.complete && naturalWidth > 0`; two `[data-lcs-prim="trace-letter"]` with `data-lcs-text` = upper/lower target; two `[data-lcs-prim="trace-word"]` with `data-lcs-reps="1"`; FAIL if any text node equals a stamped word; `data-lcs-scope` === resolved `d.scope`.

**Reused (exact):** `strokeLetterLane({text,w,h,glyphH,reps,emptyLast,lowercase})`, `strokeWordLane({text,w,h,glyphH,reps,stack,modelless,emptyLast,padLeft,align})` (`primitives/trace-path.js`); `answerBox({w,h,answer})` (`templates/components.js`, F4); `displayWord, traceable, distinctByWord, fileUri` (`lib/b2-common.js`); `alphabets` (`data/literacy/letter-knowledge.json`). NOT used: `entriesFor` at render (bank is pre-resolved), `sceneStage`, `letterBoxes` (26 px cells), `rulingBlock` (`starters` are Nunito text, not stroke models).
**NEW in `templates/components-b3.js`:** `letterCard({text,w,h,glyphH})` (width grows with `textGlyphs().width * scale`: `Sch` = 145.5 units, 111 px at glyphH 52) · `huntCard({src,vocabKey,word,graphemes,hit,w,h,iconPx,rot})` · `positionCard`, `positionKey` (F3) · `letterChips({a,b,px})` (F6; `pillChoice` read and rejected: a text pill row, no per-card stamp).

**Locale slot structure.** Page text = title + instruction (`i18n/strings.<loc>.json`, keyed by id) and nothing else on the base; words appear only on F3 (letter-level locales) and F4, always as stroke glyphs, never `<text>`. No article, plural, agreement or definite form is generated: `displayWord(singular)` only (de keeps the capital). Titles may carry `{U}` `{L}` tokens for the letter fan; the wave panel writes the exemplar literally.

**Fan.** `enumerate.js` fans `themes`/`themesPerType`/`themeOverrides` and `variantsPerType`/`variants`; a themeless type emits ONE instance per (type, difficulty, locale) x variants, and `render/render-instance.js:22` calls `type.build({theme, difficulty, locale}, {rng})` (no `variant`, no `letter`). So nt20-C ships the exemplar: `build()` reads `bank[loc].exemplar` when no letter is passed. Per-letter fan = additive **`letterAxis`**: spec `letterAxis:{applicable:true}`; plan `lettersPerType: N` (first N of `bank[loc].letters`) + `letterOverrides:{'K-317':'m'}` (pin; refuse substitution like `themePinned`); `enumerate` loops letters into `instance.letter`; `deckIdFor` appends `-l<asciiFold(letter)>`; `instanceSeed` takes `letter`; `render-instance` passes `letter` to `build()`; `emit/manifest.js` sets `variant_id = variantIdForSpec(spec) + '-' + letter`; `emit/deck-html.js` resolves `{U}{L}`. Until then only the exemplar deck per face ships.

**Alternatives.** (A) four zones with position cards under the write rows (design file): 748 px, 12 px slack, and face 3's move on the base. (B) two columns, hunt 400 px left + write 246 px right: hunt icons fall to 76, write glyphH to 26. **Recommendation: the three-zone stack**; every zone a full-width band, one hand position.

**Risks + mitigations.** Wrong picture for the word: the panel opens EVERY hit picture (sv #35 lesson); `B2_EXCLUDE` applies. Letter hidden in a multigraph (de `c` in `Schaf`): hits are grapheme-true. Accented look-alikes: the NFD rule. Long words: none printed on the base. Left-handers: the model is rep 0 of every lane. **Print check:** page box 703x945 by construction; d2 604 / d3 560 <= 760; `qa/lints.js` checks 1 (overflow) + 1b (footer) run on fi + de renders before any copy claims a level.

## 3 Faces 2-6

Every face keeps zone 1 (letterCard 110x110 + one capital lane 536x80, glyphH 52, or the full pair where stated), is `themeAxis:{applicable:false}` and fans by letter like the base. `gate-variation-distinct.js` compares resolved d2: each face changes at least one knob.

### Face 2 : Words with M (K, `K-3xx TBD by emitter`)
EN "Words with M: Hear It Anywhere". **Move:** the sound/letter ANYWHERE in the word, not only the onset (RF.K.2.d; de Inlaut/Auslaut hören). **Layout delta:** none. **PARAM:** `{...base.difficulty[2], scope:'anywhere', hunt:{n:8, hits:4, hitPos:'noninitial', minMedial:2}}`, stamp `data-lcs-scope="anywhere"`. **Verify:** hit iff `graphemes.indexOf(target) > 0`, foils `=== -1`, >= 2 medial. **Ceiling (m):** letters with >= 4 non-initial words + 4 foils: 21-25 per locale; no refusal. d1 `hitPos:'any'`, 6 cards; d3 foils = pair letter non-initially. **Query face:** "words with M", es "palabras con la letra m", it "parole con la M", pt "palavras com a letra M".

### Face 3 : Beginning, Middle or End (K, `K-3xx TBD`)
EN "Beginning, Middle or End: Where Is the M?". **Move:** locate the grapheme's POSITION (Anlaut Inlaut Auslaut). **Layout:** zone 1 slim (110); 6 `positionCard` 323x180 in 2x3, gap 12: icon 96 left; right three 44x44 dashed coral boxes (gap 8) each under a `positionKey` pictogram (three 14x14 cells, one filled `tealSoft`, no words); letter-level locales (en fr da) print the word above via `strokeWordLane({reps:1, stack:true, glyphH:30, h:42})`. 110 + 14 + 540 + 24 = 688. **CODE:** `positions:{cards:6, split:[2,2,2], showWord, mode:'letter'|'syllable'}`; stamps `data-lcs-pos="0|1|2"`, `data-lcs-split` in syllable mode. **Verify:** pos from `graphemes.indexOf(target)` (0 / last / else) or the syllable index; target occurs ONCE; 2/2/2; `showWord` matches `data-lcs-level`; boxes empty (44 >= the 30 px answer floor). **Ceiling (m, 2/2/2 once):** en 20 · de 19 · nl 17 · sv 17 · no 17 · da 15 · es 12 · pt 12 · fr 12 · it 11 · **fi 8** (fi m/k/b final = 0) -> fi `mode:'syllable'` (tavu 1/2/3 from the approved `split`); fi syllable capacity UNKNOWN, engineer must measure over `approved-words-fi.json` (letters with >= 2 words per syllable index, letter once; refuse below 8 letters). d1 start vs end, 2 boxes; d3 8 cards, letter may occur twice (pos = first). **Query face:** the position words.

### Face 4 : Circle the M in the Words (K, `K-3xx TBD`)
EN "Circle the M in the Words and Count". **Move:** recognise the letter in BOTH cases inside real words; count. **Layout:** zone 1 slim; 6 rows, gap 10: picture 72 + `strokeWordLane({text, w:440, h:56, glyphH:40, reps:1, stack:true})` (solid model only, same hand as the traced forms) + `answerBox({w:56, h:56})`; 2 of 6 rows in block capitals (`toLocaleUpperCase(loc)` then re-`traceable`, the K-284 lesson). 124 + 432 + 50 = 606. **CODE:** `wordHunt:{rows:6, capsRows:2, maxLetters:9, occ:[1,2], minTotal:8}`; stamps `data-lcs-hits`, `data-lcs-casemode="upper"`. **Verify:** re-count target glyphs in `data-lcs-text` case-insensitively; total >= 8; caps rows all-capital; no `<text>`. de/nl/sv/no: every occurrence of L must be its OWN grapheme (validator), so glyph count = sound count. **Ceiling (m):** letters with >= 6 words (1-2 occurrences, <= 9 letters): 21-25 per locale. d1 one occurrence each, no count box; d3 up to 3 occurrences. **Query face:** "circle/find the M in words", de "Buchstabe M in Wörtern finden".

### Face 5 : Sound of the Week (id band G1, `G1-3xx TBD`; landing level per locale from `units[].band`)
EN "Sound of the Week: sh, ch, th". **Move:** two letters, ONE sound: hunt the UNIT anywhere, trace it as a unit. **Layout:** base page; `letterCard` 170 wide showing `Sch`; lanes `strokeLetterLane({text:'Sch'})` / `{text:'sch', lowercase:true}`; write rows `Sch`/`sch`; hunt = 4 pictures containing the unit as ONE grapheme + 4 foils carrying the component letters separately. **CODE:** `unit:{text, upper, huntPos:'any'}`; stamp `data-lcs-unit`. **Verify:** hit iff `graphemes.includes(unit)`; foil iff no grapheme equals the unit AND no unit substring. **Ceiling (p, items containing the unit):** de sch 83 · ch 66 · au 43 · ei 34 (eu 7 refuse) · nl oe 53 · ij 28 · ui 28 · au 15 · es ll 45 · ch 26 · rr 20 · pt nh 25 · lh 20 · ch 20 · fr on 57 · an 53 · ou 45 · ch 44 · oi 25 · it ch 35 · sc 32 · gl 22 · gn 11 (gh 8 borderline) · sv ng 39 · ll 24 · tt 18 (sj 8 refuse) · da ng 29 · ll 19 · kk 15 (1. klasse) · no kk 32 · ll 30 · ng 26 (kj/sj 14 = 2. trinn) · fi kk 101 · aa 45 · tt 36 · ll 28 · pp 28 · en ch 40 · sh 30 · th 20 (substring; grapheme-true subset UNKNOWN, panel marks). Floor 8 items + 6 foils per unit, >= 3 units or refuse. d1 6 pictures, unit initial where the locale allows; d3 foils carry the near-unit (ch vs sch). **Query face:** the unit string.

### Face 6 : M or N? (K, `K-3xx TBD`)
EN "M or N? Hear the Difference". **Move:** discriminate the letter from its closest confusable SOUND, forced two-way choice. **Layout:** zone 1 slim; 8 cards 156x184 in 2x4: icon 100, `letterChips({a:'m', b:'n', px:48})` below (48x48 white chips, grid border, Baloo 2 28 px teal, fixed order a | b); the child circles a chip. 124 + 380 = 504. **CODE:** `pair:{a, b, chips:2, split:[4,4]}`; stamp `data-lcs-answer`. **Verify:** answer from `graphemes[0]`; 4/4; chips differ; both in `alphabets[loc]`. **Ceiling:** both letters >= 4 initial items: every listed pair passes. d1 6 cards 3/3; d3 three chips (m | n | w). **Query face:** "M or N", de "M oder N", es "¿M o N?", sv "M eller N", fi "M vai N".

**Rejected non-moves:** theme swap · "Write the missing M" (K-224 `cvc-missing` with the answer known a priori) · "Write the whole word" with M pre-filled (K spelling from a picture; G1-244) · big-letter tracing (K-238/K-278) · initial-sound SCENE hunt (`sceneStage` takes ONE `theme` for `fileUri`; a cross-theme pool cannot feed it, a single-theme scene re-pins the letter to the theme) · "Trace the M words" (K-284) · M/N bins (K-228) · capital and small of the week (K-222) · base d3 relabelled.

## 4 Native rebuild plan x11

| loc | teaching point that differs | exemplar (est.) | units (F5) + band | pairs (F6) | refusals | traps |
|---|---|---|---|---|---|---|
| en | letter names + primary sound; c/g hard | M | sh ch th, K readiness, no code | m/n b/p d/t f/v g/k s/z | q x y z | y as vowel; F3 prints the word |
| de | Buchstabeneinführung; Nomen keep capital | M | sch ch ei au, 1. Klasse | b/p d/t g/k m/n f/w | ä ö ü y q x; bare c | `s` foils never start sch/sp/st |
| es | sonidos iniciales; h silent | M | ch ll rr, primer grado | p/b t/d f/v m/n | h k w x y ñ | b/v NEVER a pair; no articles |
| pt | som das letras; dígrafos 1º ano | A | nh lh ch, 1º ano | p/b t/d f/v m/n | k w y h; x | ã/õ never a target |
| fr | GS = lettre, CP = son | A | ou on oi an ch, CP | b/p d/t f/v s/z m/n | q w x y z u | "fiche" banned; silent finals are letter positions |
| it | 21 letters; suoni difficili classe prima | A | ch gl sc gn, classe prima | p/b t/d f/v m/n c/g | h q z | "scheda" banned; F3 end = vowels only |
| nl | letter van de week; tweetekenklanken groep 3 | k | ij oe ui au, groep 3 | b/p d/t s/z m/n k/g | q x y u | de/het never printed; `ij` one chunk |
| sv | veckans bokstav; dubbelteckning åk 1 | S | ng ll tt, åk 1 | b/p d/t g/k m/n f/v | q w z o å | definite forms never printed |
| da | bogstavlyde 0. kl; strict pool 295 (m) | S | ng ll kk, 1. klasse or refuse | b/p d/t g/k m/n f/v | q w x y å | soft d / stød: end is a LETTER position |
| no | bokstavinnlæring 1. trinn | S | ng ll kk 1. trinn; kj/sj 2. trinn | b/p d/t g/k m/n f/v | æ w x z q | bokmål only |
| fi | äänne = kirjain; pitkä/lyhyt is THE OPS point | A | kk tt ll pp aa ii, 1. luokka | m/n k/t p/t l/r | b c d f g q w x z å ä ö | F3 letter mode refused -> syllable; no articles |

Panels author `letters[]` (items with `graphemes` + `pos`), `foils`, `units`, `pairs`, `avoid`, `refuse`, six titles (genre head, <= 70, no worksheet word) + instructions (<= 150, the child's sentence). Three-agent native panel per locale; the EN source is handed over as a SOURCE TO AUDIT.

## 5 Data + gates

`data/b3/letter-of-the-week.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; en hand-authored; `data/` gitignored, force-add):
```
LETTER_OF_THE_WEEK[loc] = {
  level:'letter'|'sound', positionMode:'letter'|'syllable', showWordInPositions:bool, exemplar:'m',
  letters:[{ L:'m', upper:'M', pair:'n', avoid:['n','w'],
     items:[{theme, noun, word, graphemes:['m','a','u','s'], pos:0, split:['maus']}],   // >=8 initial, >=2 mid, >=2 end
     foils:[{theme, noun, word}] }],                                                   // >=6
  units:[{u:'sch', upper:'Sch', band:'G1', items:[...>=8], foils:[...>=6]}],            // >=3 or refuse F5
  refuse:{F3?, F5?}, strings:{'K-317':{title,instruction}, F2..F6:{...}} }
```
**`tools/validate-b3-draft.js`** (all rules run, exit 1 on any): (1) every `word` maps by `vocabKey` into `approved-words-<loc>.json` (da strict); (2) `graphemes.join('') === word.toLocaleLowerCase(loc)`; (3) de/nl/sv/no: `graphemes` === `chunks.flat()` of the approved entry; elsewhere `chunks` is a flat copy of `split` (measured), so the panel's `graphemes` are the ONLY grapheme source, audited by a second cold panel; (4) hit: `graphemes[0] === L` (sound) / `word[0] === L` (letter); `pos` = first target grapheme index; (5) foil: `NFD(word)` free of base `L` (base/F2/F3/F4/F6), no unit substring (F5); (6) picture exists via `fileUri(theme, noun)`; no localized BW marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); (7) no duplicate word across a letter's items + foils; de capital, others lowercase; every word `traceable()`; (8) `pair` letters both have >= 4 initial items; es rejects b/v; (9) per-face floors else the letter drops from that face (reported); F4: every L occurrence its own grapheme in de/nl/sv/no; (10) titles: worksheet-word guard, <= 70, unique in band; instruction <= 150; (11) unit >= 2 chars, one grapheme in >= 8 items.
**`qa/verify-b3-letter-of-the-week.js`:** renders face x exemplar (and every unit) x 11 locales at d2; asserts `verify()` empty, `qa/lints.js` clean, and the density floors ITSELF (`qa/lints.js` has no element-size lint: `.ws-icon` >= `tokens.density.K.minElement` 56, chips/boxes >= 30), hits === config, 20-seed sweep hits in >= 6 of 8 slots, no text node equals a hidden word. **Poison** (each must FAIL; the correct draft is the control): P1 a foil replaced by an item starting with L; P2 de `Schaf` with `graphemes:['s','c','h',...]`; P3 fr foil `école` on the e page; P4 a `zoo animals bw` noun; P5 `pos:1` on a word-initial letter; P6 hunt icon forced to 48 px.
**Page reads:** `data/b3/letter-of-the-week.js[loc]` only (graphemes, pos, split copied in at apply time), `fileUri`, `displayWord`, `traceable`; never `image-vocabulary.js` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (whole description 120-170) | hub coordinate |
|---|---|---|---|
| base | "Letter of the Week: Mm" · "Buchstabeneinführung: M m" · "Letter van de week: k" / "La letra M" · "Atividades com a letra M" · "La lettre M" · "La lettera M" / "Veckans bokstav: M" · "Ugens bogstav: M" · "Ukens bokstav: M" · "Viikon kirjain M: kirjainjahti" | Trace M and m, circle the four pictures that begin with M, then write the letter | `{type:'letter-of-the-week', mode:null, theme:'', level:'kindergarten'}` |
| F2 | head + "words with M" / "palabras con la M" / "ord med M" | Circle the four pictures that have the M sound anywhere in the word | same |
| F3 | head + "beginning, middle or end" / "Anlaut, Inlaut, Auslaut" / "al principio, en medio o al final" | Colour the box that shows where the M is heard in each word | same |
| F4 | head + "circle the M in the words" / "Buchstabe M in Wörtern finden" | Find and circle every M in six picture words, then count them | same |
| F5 | unit head: "Sound of the Week: sh ch th" · "Sch und ch" · "ij en oe" / "Le son [ou]" · "ch, ll, rr" / "Dubbelteckning: ll tt" · "Kaksoiskirjaimet kk tt" | Trace sch and circle the four pictures that contain it | same key; `level` = the locale's F5 band (grade-1 in 9 locales) |
| F6 | pair head: "M or N?" · "M oder N?" / "¿M o N?" / "M eller N?" · "M vai N?" | Circle m or n under each picture to show its first sound | same |

h1 = title; eyebrow = level label; strand: en Foundational Skills · de Lesen und Schreiben: Buchstaben und Laute · es Lenguaje y comunicación · pt Língua Portuguesa: alfabetização · fr Découvrir le principe alphabétique · it Italiano: strumentalità di base · nl Beginnende geletterdheid · sv Läsa och skriva · da Afkodning · no Lese og skrive · fi Lukemaan ja kirjoittamaan oppiminen. JSON-LD `educationalAlignment` per face; F5 en none. Meta lead: OPEN (critic item 14).

**Non-cannibalisation.** base owns head + letter; F2 "words with"; F3 position words; F4 "circle in words + count"; F5 the unit string; F6 "X or Y". Boundaries: **K-221** writes the initial letter (production) vs base circles pictures (recognition); **K-228** sorts into arbitrary-initial bins vs F6 per-picture MINIMAL-PAIR choice; **K-229** hunts a letter in a letter GRID vs F4 inside picture WORDS with a count; **K-222** capital-small match in isolation vs base/F4 both cases bound to one sound in words; **K-224** write a missing letter (no face here); **K-238/K-278** trace the alphabet vs ONE letter beside its pictures.

## 7 Hub visibility contract

A face appears under `letter-of-the-week` on `/[locale]/worksheets` IFF: (1) `apps['letter-of-the-week'] = {default_subject:'letters', default_age_range:'5-7', exercise_type_axis_key:'letter-of-the-week'}` exists in `topics-taxonomy.json`; (2) `axes['exercise-type']['letter-of-the-week']` has `slug` + `name` in all 11 locales (section 1 slugs); (3) exactly one landing per face per locale with `coordinate.type === 'letter-of-the-week'` verbatim, a band-table level key, a unique slug and `canonicalDeckSlug` = the published deck (precedent `letter-tracing` in `frontend/content/seo-landing/en.json`: 6 landings, `mode:null, theme:''`); (4) the landing JSON committed AND deployed. Gate: `node scripts/verify-hub-type-rows.js --keys=letter-of-the-week` expecting **exactly 6 rows per locale** (the script does not exist yet; build it before the wave; with a future letter fan it must count distinct faces, not landings).
