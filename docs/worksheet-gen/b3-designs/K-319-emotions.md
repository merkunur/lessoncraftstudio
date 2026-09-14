> **BUILD RULING 2026-09-14: the family key is `feelings`, not `emotions`.** The THEME axis already owns the axis-key `emotions` (`/en/topic/emotions/`, `topicMeta.emotions`, `topicProse.emotions`), topic copy is keyed per axis-key across axes, and the taxonomy invariant is `slug.en === key`; this file already chose the slug `feelings`. Read every `emotions` family key / `exerciseType: emotions` / `coordinate.type: emotions` below as `feelings`. Image theme, data bank names and ids are unchanged.

# K-319 `emotions` (K) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/K-319-pedagogy.md` + `_work/K-319-design.md`. Every file, primitive, class and option below was read in the repo; every picture named was OPENED at `cache/themes-512/<theme>/<noun>@3x.webp` (record + what each shows: `_work/K-319-critic.md`). (m) = re-measured 2026-09-14 (node over `cache/manifest.json` + `topics-taxonomy.json`; puppeteer with the shell's woff2, scratch `k319-critic-measure.js`). *est.* = the engineer measures. No em-dashes.

**Boundary (load-bearing).** The child READS A FEELING off a face or a situation and connects it to a feeling WORD or another face. K-225 (`lit-vocab-match.js`) matches a NOUN to its picture; K-235 (`science-category-sort.js` shape, `category-vocab.json`: 0 feeling entries, m) and the 20 science banks (0 emotions, m) sort OBJECTS by category; G1-307 F1 joins opposite pictures (happy/sad is one of its 7 pairs); K-323 owns identity facts; K-062 owns "find the same two". No face here names an object, sorts by category, asks for an opposite or asks who the child is.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `K-319` / `emotions` / **K in all six faces** (variations `K-325+ TBD by the emitter`; the art has one face per feeling and no intensity ladder, so nothing bands G1). `default_subject: letters`, `default_age_range: 5-7`, `assetClass: icon-placement`, `exerciseType: emotions`. `apps.emotions` and `axes['exercise-type'].emotions` ABSENT (m); register `apps.emotions = {default_subject:'letters', default_age_range:'5-7', exercise_type_axis_key:'emotions'}` (shape of `apps['word-classes']`, m) + slug/name x11 (`tools/register-b2-taxonomy.js NEW_FAMILIES` shape). |
| subject ruling | **`letters`.** The taxonomy allows math / letters / logic / spatial-reasoning (§16.4); every verifiable face prints or elicits a feeling WORD (L.K.5), and a K teacher looks for "feelings matching" under language. An `sel` 5th subject is a doctrine review, not a per-type call: **OPEN, decide together with K-323 all-about-me** (§7 of the critic). |
| theme axis | `themeAxis:{applicable:false}` (faces = the fixed cache theme `emotions`: 15 files, 14 with a vocabKey, `sceptical` `vocabKey:null`, m; scene cues are `(theme, noun)` refs from other colour themes, the science-bank pattern). Enumerate emits ONE instance per (type, difficulty, locale), manifest `theme:null` (`emit/manifest.js:79`, m); landings carry `coordinate.theme:''` (README ruling). Fan lever = the FEELING SET + scene sample per seed. The decks do NOT join `/topic/<theme>/emotions` (OPEN 5). |
| taxonomy collision | `axes.theme.emotions` EXISTS: `emotions / emotionen / emociones / emoties / emozioni / emotions / emocoes / kanslor / folelser / folelser / tunteet` (m). `/<loc>/topic/<slug>/` is one namespace across axes (§16.5), so every type slug below was grepped against EVERY axis slug in every locale: **0 collisions** (m). |
| CCSS (en only, honest) | base + F4 `L.K.5` · F1 `L.K.5.c` · F3 readiness (no code) · F2 / F5 open-ended (no code). No CCSS SEL code exists; `SL.K` not claimed. JSON-LD en only, no `targetUrl`. Non-EN names the national framework. |
| accepted faces | **6**: happy sad angry scared surprised tired (opened; §4). |

| loc | genre head | ASCII slug | K level key (`LEVEL_KEYS`, m) | strand on the landing (framework NAME, no code) |
|---|---|---|---|---|
| en | Feelings | `feelings` | `kindergarten` | Social-emotional learning: self-awareness |
| de | Gefühle | `gefuehle` | `vorschule` | Bildungsplan Kita: Gefühle wahrnehmen und benennen |
| es (MX) | Emociones y sentimientos | `emociones-y-sentimientos` | `preescolar` | SEP/NEM Educación socioemocional: autoconocimiento |
| pt (BR) | Emoções e sentimentos | `emocoes-e-sentimentos` | `educacao-infantil` | BNCC EI "O eu, o outro e o nós" |
| fr | Les émotions | `les-emotions` | `maternelle` | programme de maternelle: identifier et exprimer ses émotions |
| it | Le emozioni | `le-emozioni` | `infanzia` | Indicazioni nazionali "Il sé e l'altro" |
| nl | Gevoelens | `gevoelens` | `kleuters` | SLO sociaal-emotionele ontwikkeling |
| sv | Känslor | `mina-kanslor` (editor: the theme owns `kanslor`; `kanslokort` is what a K-324 card deck on the emotions theme is literally called) [NSR] | `forskola` | Lgr22 förskoleklass: språk och kommunikation; Lpfö 18 |
| da | Følelser | `mine-foelelser` (editor: `foelelser` is the oe-fold twin of the theme slug `folelser`) [NSR] | `boernehaveklasse` | Fælles Mål børnehaveklasse: engagement og fællesskab |
| no | Følelser | `folelsene-mine` [NSR] | `1-trinn` | LK20 folkehelse og livsmestring |
| fi | Tunteet, tunnetaidot | `tunnetaidot` [NSR] | `esikoulu` | EOPS 2014 "Minä ja meidän yhteisömme", tunnetaidot |

## 2 The base page

**Concept.** "Feelings: Match the Face to the Word." Six yellow faces down the left on WHITE tiles, six feeling words down the right on cream tiles in a deranged order, a coral dot each side; the child draws one pencil line per face. No numerals, no bank, no scene, no printed ring. The picture is read first (K reads pictures before words); the word is the only text decoded (L.K.5). Faces = `emotions/<noun>` webp via `fileUri`; words = the panel's citation literals from `data/b3/emotions.js` (the vocab is a spelling cross-check at validate time, never read at render).

**Chrome budget (README ruling).** Body **722** with a 3-line title + 3-line instruction, 814 with one-line chrome; every stack below fits 722 and absorbs slack (`space-around` in `.ws-match-col`, `minmax` rows on F4, `flex:1` on F5). `.ws-page` 703x945, `padding 0 14` -> inner 675 (`page.css:16-26`, m).

**Layout d2**
```
.ws-match padding 6 30 (page.css:354) -> inner 615 x 710      x: 30 .......................... 645
+----------------+                              +----------------------------+
|   [ face 80 ]  |o -------------------------- o|        sorprendido         |  item 108
| white 160x108  |                              | cream 260x108, Baloo 2 700 28
+----------------+                              +----------------------------+
        gap 12 (min; grows at 814)         6 x 108 + 5 x 12 = 708 <= 710
left col x 30..190 · right col x 355..615 · dots 20 px outside each tile (page.css:390-391) · line span ~125
```
- Left: `.ws-match-item ws-match-item--plain` 160x108 (WHITE: a yellow ball on cream loses contrast, the reverse of K-225's word-left layout), `.ws-icon` 80 centred, `data-lcs-face="<id>"`, `.ws-match-dot--right`. 80 >= the type floor 72 (faces legible on the mono sheet, §critic) >= K token floor 56 (`_tokens.js:68`, m).
- Right: `.ws-match-item` 260x108 cream, word Baloo 2 700 **28** (line 32), `padding 0 16` -> 228 usable, `data-lcs-word="<id>"`. Widest of all 66 words (m, Baloo 2 700 28): es `sorprendido` **145.8** <= 228; de `überrascht` 130.7, it `arrabbiato`/`spaventato` 129.1, da `ked af det` 118.2 (one line), fi `surullinen` 121.4, fi `yllättynyt` 115.1, no `lei seg` 72.3. The pedagogy's "fi 170" was an estimate; the measurement stands.
- The child's line is the only mark. `.ws-match-item` is in the QA content selector (`qa/lints.js:32`, m).

**Ladder** (config keys; guards key on these, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| pairs / pool | 4 / `[happy, sad, angry, tired]` (no O-mouth faces) | 6 / all `matchable` | 6 / all |
| picPx / tileL / tileR | 100 / 180 / 260 | 80 / 160 / 260 | 72 / 160 / 260 |
| wordPx / itemH at 722 | 30 / 168 | 28 / 108 | 26 / 108 |
| shuffleLeft | false | false | true (not a distinct move; recorded) |

**Pool.** `EMOTIONS[loc].feelings` with `matchable:true` (exactly the six accepted ids, asserted by the validator); sample-or-throw (`lib/b2-common.js sampleEntries` pattern, `who:'K-319'`); right order = `rng.shuffle` until no fixed point (`lit-vocab-match.js:44` idiom, m). **Refusal:** fewer than 4 matchable words in a locale (none expected: the six words exist in every locale's vocab, m).

**Answer-hiding + uniqueness.** Tiles carry the feeling ID, never the text; each word text appears once. Root `data-lcs-face="base|scene|draw|choice|checkin"` stamped only when a face declares it (base byte-identical). `verify(page)`: left ids ⊆ the six accepted; right ids a permutation of left; `right[i] !== left[i]`; word texts distinct; 4 <= pairs <= 8; `img.complete && naturalWidth > 0`; no localized B&W marker in any `src` (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); icons >= 72. Node gate `tools/gate-emotions-data.js` (`page.evaluate` cannot require): every `[data-lcs-word]` text === `EMOTIONS[loc].feelings[id].word` (poison: `wütend` -> `Wütend` FAILS).

**Reused (exact).** `.ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right)` (`page.css:354-391`, m) · `cardGrid({cards, cols, rows})` (`templates/layouts/card-grid.js:7`, gap 14 from `.ws-cardgrid`, m) · `.ws-card .ws-card-badge .ws-card-stage .ws-lane .ws-icon .ws-bin` · `rulingBlock({rows, w, h, glyphH, starters, gap})` (`components-b2.js:58`, m) · `makeScienceCategorySort` (`types/_shared/science-category-sort.js`, m: option names `id slug gradeBand exerciseType data{bins[{key,label}], items[{theme,noun,bin}]} i18n maxBins difficulty{n:{perBin}}`; `itemPx = min(78, floor(648/n) - 12)` at `:82`) · `matchColumns({left, right, itemH, colW})` (defined by G1-307 §2 in `templates/components-b3.js`, file absent, m; `colW` accepts `{left:160, right:260}`) · `fileUri` (`image-cache/resolve.js:35`, m: resolves `toys/teddy_bear` although its `vocabKey` is null, so scene objects are asserted by `fileUri`, never `labelSafeNouns`) · tokens `T.teal T.coral T.ink T.inkSoft T.white T.creamDeep`, `F.display F.body`. **NOT used:** `pillChoice` (text pills, no per-item stamp), `wordBank` (doubles the answer), `answerBox`, `iconRows` (rotation tilts an expression), `displayWord` (adjectives never capitalised), `.ws-achip` (teal 2.5 px border, r 24: a printed frame pre-empts the child's ring), `image-vocabulary.js` at render.

**NEW in `templates/components-b3.js`** (scoped CSS inline, no `page.css` edit): `faceTile({noun, px=72, tile=84, key, label=null, labelPx=18})` -> `<span class="ws-facetile" data-lcs-choice>` white SQUARE r 10, border 2 `T.creamDeep`, `.ws-icon` `px` centred (the G1-308 strip-tile idiom); with `label` 100x108 (face 72, Baloo 2 700 18 under, line 22) · `faceChoiceRow({faces:[{noun,key}], px=72, tile=84, gap=12})` · `sceneRow({objects:[{theme,noun}], px=88, gap=12})` 1-2 `.ws-icon` on nothing, `data-lcs-scene-obj`, no rotation · `sceneCard({sceneId, objects, faces, answer})` -> `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-ws-content data-lcs-scene data-lcs-answer>` + `sceneRow` + `faceChoiceRow` · `sceneGrid({cards})` flex-wrap centred `.ws-card`s 330x231 gap 14 with badges, ONLY for an odd count (§3 F1) · `blankFace({d=220})` SVG circle `T.teal` stroke 3, no fill, no features, `data-lcs-blankface` · `checkInCard({today, faces, draw, because, helps=null, d=220})` (§3 F5).

**Alternatives.** Alt A six cards, face + three word pills to circle: no elimination, but it is F4 turned round and the en/nl head is "feelings MATCHING"; rejected as base. Alt B word left, face right (K-225 order): the face is the stimulus here, so it stands on the reading side; a swapped column, not a face; rejected. Alt C cut-and-paste: the cutting family owns scissors, no verify shape; rejected.

**Risks -> mitigations.** scared vs surprised on one base page: both accepted (opened: gaping mouth with teeth + ringed eyes vs small round O + lashes); a swap costs two lines; d1 excludes both; F4 d2 separates them. Elimination at base: the last line is free by design; F4 removes it. Long words: all 66 measured, columns hold the widest by >= 82 px. **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid; smallest text 17 px vs the 9 px lint (`qa/lints.js:86`, m). **Print check (mono sheet `k319-mono-72.png`, read):** all six faces stay distinct at 72 px greyscale, meaning rides on the line art (brows + mouth), never on yellow or blush; scared/surprised is the only near pair, in mono as in colour. Engineer prints one d2 base + one F1 on mono laser and rings a face in HB over the white tile (6 px tile margin at 84/72 is the ring reserve).

## 3 Faces 2-6

F1 F2 F4 F5 are CODE faces (`layout` knob + a `verify()` branch; base byte-identical); F3 is a factory instance (`makeScienceCategorySort`, its own spec file, `exerciseType:'emotions'`). `tools/gate-variation-distinct.js` reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (m, sibling record): a b3 wave file / ROWS list is required first (critic OPEN 6). Card geometry (m): card w (675 - 14) / 2 = 330.5, padding 12 + border 2, stage `padding 6 4` -> stage inner **294** wide. F2 and F5 are OPEN-ENDED: no `verify()`, layout lints only.

### F1 : How Do You Feel? Circle the Face (`layout:'scene'`, K)
**Move:** INFER a feeling from a SITUATION (L.K.5.c). First-person framing ("how do YOU feel when…") keeps every locale free of a gendered subject; the answer is a face, so es/pt/it/fr print no adjective. **Layout:** `cardGrid({cols:2, rows:3})`: card h (722 - 28) / 3 = 231 -> stage 294x191; `sceneRow` 88 + 10 + `faceChoiceRow` 84 = **182 <= 191** (265 at 814); two objects 188 <= 294; three tiles 276 <= 294; badges 1-6; cards print NO text. **Scene table (GLOBAL; the seed is locale-neutral, so a veto removes the scene in ALL 11, never in one):** `christmas/present` -> happy [alsoPlausible surprised] · `toys/balloon` -> happy · `accessories/medal` -> happy [surprised] · `toys/teddy_bear` -> happy [tired] · `weather/thunderstorm` -> scared [surprised] · `hospital/syringe` -> scared [sad] (`vetoable:true`) · `furniture/bed` -> tired (NEVER `hospital/bed`: a wheeled hospital bed, opened) · `around the house/pillow` + `space/moon` -> tired [scared] · `clothing/pajamas` + `space/moon` -> tired [scared]. `desserts and sweets/cake` is a slice with a strawberry, no candles: a weak happy alternate only. Only three feelings have honest object cues, so "one feeling per page" cannot meet the K floor of 4; the page rule is **>= 3 distinct correct feelings, each <= ceil(cards/3)** -> d2 = 2 happy + 2 scared + 2 tired, so "ring happy everywhere" fails. Decoys = any other accepted face minus `alsoPlausible` (>= 4 candidates per scene, m). **Syringe veto:** scared keeps one scene -> d2 = 5 cards (2 + 1 + 2) in all 11 via `sceneGrid` (a 2x3 `cardGrid` would leave a hole); 5 >= 4, still a legal K page. **Config** `{layout:'scene', cards:6, choices:3, minFeelings:3, maxPerFeeling:2}`; d1 4 cards 2x2, 2 choices, feelings {happy, tired} (objects 110, tiles 100 / face 88); d3 6 cards, 3 tiles, choice pool + `sad` as a never-correct decoy (4 tiles at 68 = 296 > 294, refused). **Verify:** `data-lcs-answer === SCENES[id].feeling` (node gate); exactly one tile equals it; no tile ∈ `alsoPlausible`; tiles distinct; correct index takes >= 2 of 3 positions; no feeling > `maxPerFeeling`; no object twice; every object resolves, colour dir only. **Query face:** "how do you feel" / "wie fühlst du dich" / "cómo te sientes" / "hur känner du dig" / "miltä sinusta tuntuu".

### F2 : Draw the Feeling Face (`layout:'draw'`, K, OPEN-ENDED)
**Move:** EXPRESS a feeling with features (the universal K page). **Layout:** `cardGrid({cols:2, rows:2})`: card h 354 -> stage 294x314; word Baloo 2 700 30 (34) + 12 + `blankFace({d:220})` = **266 <= 314** (220 = 58 mm, a whole crayon face). **Config** `{layout:'draw', cards:4, pool:['happy','sad','angry','scared'], d:220}` (surprised/tired need brow control a K hand lacks); d1 + a 56 px model face beside the word (copy); d3 6 cards 3x2, d 140. Stamps `data-lcs-word`, `data-lcs-blankface` for the key note; **no verify(); lints only** (one empty `[data-lcs-blankface]` per card is a lint, not a grade). **Query face:** "draw" / "zeichnen" / "dibuja" / "rita" / "piirrä".

### F3 : Feels Good or Feels Bad? Sort the Faces (factory, K)
**Move:** judge VALENCE (comfortable / uncomfortable: present in all 11 frameworks). The word is irrelevant here, so faces refused for words enter where their valence is unmistakable (opened, §critic): **good = happy merry content excited · bad = sad angry scared capricious (crying) disgusted (eyes squeezed, wailing)**; excluded tired, surprised (neutral), bored (worried / unsure), confused (a printed "?" carries the meaning), shy (ambiguous), sceptical (no vocabKey). **`makeScienceCategorySort({id, slug, gradeBand:'K', exerciseType:'emotions', data:{bins:[{key:'good',label}, {key:'bad',label}], items: 9 faces}, difficulty:{1:{perBin:2}, 2:{perBin:3}, 3:{perBin:3}}})`.** **perBin 3, not the pedagogy's 4, on the factory's own CSS (m):** `itemPx = min(78, floor(648/n) - 12)`; a `.sci-item` box = itemPx + 2·round(0.12·itemPx) + 4 border; 6 items -> 78 px faces, boxes 98, strip 6x98 + 5x12 = **648 <= 675, one row**; 8 items -> 69 px faces (>= 56, legal) but boxes 89 -> 8x89 + 7x12 = **796 > 675, the flex-wrap strip breaks 6 + 2**. Bins 210x185, labels Baloo 2 700 17 in a pill (`:35-36`): widest `desagradable` 96.3 + 32 padding = 128 <= 210 (m). Fan lever = 3 of 4 good x 3 of 5 bad per seed. d3 = bins labelled by a 40 px face (needs an additive `labelHtml` knob on the factory; `labelFor` is text-only, m; if refused d3 = d2). **Verify:** the factory's own (`:104-115`) + node gate: every `[data-sci-item]` bin === the bank valence of the `src` noun (poison: `tired` in `bad`). **Query face:** "good or bad feelings" / "angenehm und unangenehm" / "agradables y desagradables" / "sköna och jobbiga" / "mukavat ja ikävät".

### F4 : Which Face Shows the Feeling? (`layout:'choice'`, K)
**Move:** RECEPTIVE identification with distractors and NO elimination (every row independent). **Layout:** `display:grid; grid-template-rows:repeat(6, minmax(112px,1fr)); gap:10px; flex:1 1 auto` = **722 at the floor**, 127-px rows at 814. Row = `.ws-lane` (`page.css:401`, m) with inline `padding:8px 16px` -> inner 92 x **639**, stamped `data-ws-content`: `[word 220, Baloo 2 700 26, data-lcs-target][16][tiles centred: 3 x 84 + 24 = 276]` = 512 <= 639; `sorprendido` 135.3 at 26 (m) <= 220; tile 84 in 92. **Config** `{layout:'choice', rows:6, choices:3, confusable:false}`; d1 4 rows (173, tile 100 / face 88, 2 tiles); d3 4 tiles (4x84 + 36 = 372), `confusable:true`. **Verify:** target ∈ `matchable`; exactly one tile === target; distractors distinct; d2 distractors ∉ `confusable[target]` (scared <-> surprised); correct index takes all 3 positions over the page. **Query face:** "which face" / "welches Gesicht" / "qué cara" / "vilket ansikte" / "mitkä kasvot".

### F5 : How Do I Feel Today? (`layout:'checkin'`, K, OPEN-ENDED)
**Move:** SELF-REPORT, one day per page. **Layout (vertical, gap 14):**
```
.ws-lane 675x180 (inline padding 12 16 -> inner 639): today literal Baloo 2 700 26 (34) + 10 + six faceTile 100x108 (face 72, word 18) gap 6: 600 + 30 = 630 <= 639
.ws-card 675x292 : draw literal 26 (34) + 10 + blankFace d 220                                   (flex:1 at 814)
.ws-lane 675x178 : rulingBlock({rows:2, w:639, h:72, glyphH:40, starters:{0:because}, gap:6})   glyphH 40 = K whole-word floor
180 + 14 + 292 + 14 + 178 = 678 <= 722
```
The design's "600 + 40 <= 643" mis-stated the lane's inner width (639, m): gap 8 overflows by 1 px; **gap 6**. Tile labels at 18: `sorprendido` 93.7 (m) in a 100 tile; the validator asserts every rendered label <= 94 (a wider panel word steps that locale to 17, where the widest is 88.5, m). **Config** `{layout:'checkin', faces:6, d:220, rows:2, helps:false}`; d1 4 faces (tile 120 / face 88); d3 `helps:true` (a lane 34 + 8 + one ruling row 72 + 28 = 142), ruling cut to 1 row (106), circle 170 (card 242): 712 <= 722. Stamps `data-lcs-checkin`, `data-lcs-blankface`; **no verify(); lints only.** **Boundary:** K-323 all-about-me must not add an "I feel" item. **Query face:** "today" / "heute" / "hoy" / "idag" / "tänään".

**Rejected non-moves.** Theme swap (the faces ARE the theme) · trace the feeling word (K-284 is theme-fanned; the b2 waves fan `animals vehicles toys fruits` + 4 BW, m, so no emotions tracing deck exists today; recorded) · write the word (G1-244) · calm-down match (no picture for breathe / hug / talk / count; REFUSED, not faked) · same-or-different (one file per feeling = K-062) · odd-one-out face (valence-solvable = F3) · intensity ladder (content < happy < merry is the only ladder in the art) · body signals (no art) · feelings <-> colours (faces already coloured; no black in `codeColors`) · broken toy -> sad (a coral X reads "not allowed") · rain -> sad (culturally variable) · ghost / spider / shark / wolf -> scared (all SMILE, opened) · `weather/stormy` (a second thunderstorm, red cloud) · count the faces · d1/d3 relabelled.

## 4 Native rebuild plan x11

**Face verdicts (all 15 opened, m).** ACCEPT for words: happy (open toothed grin, raised cheeks) · sad (deep frown, brows up-inward) · angry (V brows, gritted teeth, the darkest ball) · scared (wide ringed eyes, worried brows, gaping mouth with teeth) · surprised (raised brows, small round O, lashes) · tired (closed lids, yawn). REFUSE for words: excited (= happy with lashes: two right answers), shy (small smile, sideways glance = content), content (calm smile), merry (eyes shut, laughing), capricious (eyes shut, wailing = crying), disgusted (eyes squeezed shut, red marks radiating, open mouth = pain / yuck), bored (worried brows, eyes glancing up = unsure), confused (a printed "?" beside a worried face), sceptical (no vocabKey). Valence use (F3): content / merry / excited GOOD; capricious / disgusted BAD; bored / confused / shy NOT unmistakable, excluded.

**Gender.** The faces are yellow balls, not children; lashes on surprised / shy / excited / confused / sceptical are art style. The printed word is the locale's card citation form (masc. sg. in es/pt/it/fr, as SEP, BNCC and EMC cards print). **`wordF` is STORED and printed NOWHERE** (an "(a)" print or a girl-pictured page is a future decision). **No gendered noun (carita, rosto, faccia, visage, Gesicht) may stand in one frame with a feeling adjective anywhere on the type.** F1 cards print no text; the F5 `today` literal is a clause whose predicate IS the circled face ("Today I feel …" / "Heute fühle ich mich …" / "Hoy me siento …" / fi writes the idiom), never an adjective slot.

| loc | words (vocab -> panel citation form) | scene / refusal | traps |
|---|---|---|---|
| en | happy sad angry scared surprised tired | all 9 scenes | "mad" is the home word, "angry" the school word: pick one, `alt` the other |
| de | glücklich traurig wütend ängstlich überrascht müde (`Verängstigt` -> Kita `ängstlich`) | syringe kept ("Angst vor der Spritze" is Kita canon) | ALL lowercase: the vocab capitalises; never `displayWord` |
| es (MX) | feliz triste enojado asustado sorprendido cansado | all | `enojado` never `enfadado`; `wordF` -a stored; title carries "emociones" |
| pt (BR) | feliz triste bravo assustado surpreso cansado | all | `bravo` vs `com raiva`: panel picks; circumflex in the head |
| fr | content triste en colère apeuré surpris fatigué (`Heureux` / `Effrayé` -> GS register; panel confirms) | la piqûre is a GS scene: kept | "fiche" banned in titles; `en colère` two words |
| it | felice triste arrabbiato spaventato sorpreso stanco | all | "scheda" banned; `wordF` -a stored |
| nl | blij verdrietig boos bang verbaasd moe (`Verrast` -> `verbaasd`) | all | no de/het anywhere; head "gevoelens", theme slug `emoties` |
| sv | glad ledsen arg rädd förvånad trött | syringe: likely VETO (global, §3 F1) | `glad` backs ONLY happy; never `grupp`; common-gender citation |
| da | glad ked af det vred bange overrasket træt (`Trist` -> child form; 3 words) | all | `Kedet` in the vocab is a bare participle (bored refused anyway) |
| no | glad lei seg sint redd overrasket trøtt (`Trist` / `Trett` -> child forms) | all | bokmål; bare `lei` = fed up: never print it |
| fi | iloinen surullinen vihainen pelokas yllättynyt väsynyt (`Peloissaan` is adverbial: panel picks) | syringe: possible VETO | nominative only; `kasvot` is plural-only ("mitkä kasvot") |

F3 bin labels (17 px pill; widest measured `desagradable` 96.3, `unangenehm` 93.5, `désagréable` 85.9, `ubehagelig` 78.4, m): en Feels good / Feels bad · de angenehm / unangenehm · es agradable / desagradable · pt gostoso / ruim · fr agréable / désagréable · it piacevole / spiacevole · nl fijn / niet fijn · sv skön / jobbig · da rar / ubehagelig · no god / vond · fi mukava / ikävä. Every panel OPENS every face and scene it keeps (`faceOpened` / `sceneOpened:true`, asserted): `emotions/shy`, `miscellaneous/ghost` and `hospital/bed` prove the file name is not the picture. EN handed over as a SOURCE TO AUDIT.

## 5 Data + gates

`data/b3/emotions.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern, exists, m; the b3 tools are absent, owned by the batch's first design; `data/` gitignored, `git add -f`):
```
EMOTIONS[loc] = {
  feelings: [{ id:'happy', word:'feliz', wordF:null | 'enojada', invariant:true|false, capital:false,
               face:{theme:'emotions', noun:'happy'}, matchable:true,
               valence:'good'|'bad'|null, confusable:['excited'], faceOpened:true }],
  scenes:   [{ id:'pillow-moon', objects:[{theme:'around the house', noun:'pillow'}, {theme:'space', noun:'moon'}],
               feeling:'tired', alsoPlausible:['scared'], vetoable:false, sceneOpened:true, alt:{en:'a pillow and the moon'} }],
  veto:     ['syringe'],                     // a locale veto; apply- propagates it to ALL 11 (locale-neutral seed)
  bins:     { good:{label:'agradable'}, bad:{label:'desagradable'} },
  checkin:  { today:'Hoy me siento…', draw:'Dibuja tu cara', because:'porque' | null, helps:null },
  strings:  { 'K-319':{title,instruction}, F1..F5:{title,instruction} } }
```
`scenes`, `face`, `matchable`, `valence`, `confusable` are locale-neutral (copied from en); a locale may only VETO a scene.

**`tools/validate-b3-draft.js` (emotions block; every rule runs, exit 1 on any):** (1) every `face.noun` ∈ `manifest.themes.emotions.nouns` with a vocabKey; `matchable:true` ids === ACCEPTED_MATCH {happy sad angry scared surprised tired}; `valence` ids ⊆ ACCEPTED_GOOD {happy merry content excited} ∪ ACCEPTED_BAD {sad angry scared capricious disgusted}; `faceOpened:true`. (2) `word` `/^[\p{L}' ]+$/u`, <= 14 glyphs, distinct across feelings, lowercase in de unless `capital:true`, cross-checked case-insensitively against `image-vocabulary.js[vocabKey][loc][0]` or a declared override; `wordF` present in es/pt/it/fr unless `invariant:true`. (3) every scene object resolves via `fileUri(theme, noun)`; the theme literal is one of the pinned COLOUR dirs and carries no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); **`teddy_bear` MUST be `{theme:'toys'}`** (it also exists in `toys bw` and `animals bw`, m, and its `vocabKey` is null so `labelSafeNouns` never sees it); **`bed` MUST be `{theme:'furniture'}`** (`hospital/bed` is a wheeled hospital bed); noun ∉ `B2_EXCLUDE` (`lib/b2-common.js:35`); <= 2 objects; `sceneOpened:true`; `feeling` ∈ ACCEPTED_MATCH; `alsoPlausible` ⊂ ids and never contains `feeling`; >= 4 decoy candidates per scene; after vetoes >= 3 feelings with >= 1 scene and >= 4 scenes, else F1 refused, reported. (4) F3 bank >= 3 per bin after exclusions; `perBin` <= 3 (the one-row strip). (5) `checkin.today` contains no `{`, ends in `…` or `:`; `because` is a single word or null. (6) titles <= 70, no worksheet-word, unique in band; instruction <= 150; F5 labels at 18 px <= 94 rendered (else `labelPx:17` for that locale).

**`qa/verify-b3-emotions.js`:** renders face x 11 at d2 with a 3-line title + a 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean (overflow, footer collision, font floor); `.ws-icon` >= 72 on base / F1 / F4 / F5 and >= 78 on F3; tiles >= 84; F3 strip one row (every `.sci-item` shares one `offsetTop`); 20-seed sweep: base never in fixed-point order, F1 correct index >= 2 positions and no feeling > 2 cards, F4 index takes all 3 values, F3 strip order ≠ bin order. **Poison** (each must FAIL; the correct draft is the control): P1 `excited.matchable:true` · P2 scene `miscellaneous/ghost -> scared` (resolves; the human open IS the gate) · P3 F1 `present` with tiles `[happy, surprised, tired]` · P4 F1 page with `happy` on 4 of 6 cards · P5 F3 `tired` in bin `bad` · P6 object `{theme:'zoo animals bw', noun:'lion'}` · P7 de word `Wütend` · P8 sv `glad` on two feelings · P9 F4 d2 row `scared` with distractor `surprised` · P10 base with 3 pairs · P11 `{theme:'hospital', noun:'bed'}` · P12 `{theme:'toys bw', noun:'teddy_bear'}` · P13 F3 `perBin:4` (the strip wraps) · P14 F5 `today:'Hoy me siento {word}'` · P15 the old 760 stack under 3-line chrome (footer lint).

**Page reads:** `data/b3/emotions.js[loc]`, `fileUri`; never `image-vocabulary.js`, `category-vocab.json` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "Feelings: Match the Face to the Word" · "Gefühle: Gesicht und Wort verbinden" / "Emociones: une la cara con la palabra" / "Känslor: para ihop ansikte och ord" · "Tunteet: yhdistä kasvot ja sana" | Draw a line from each face to the feeling word that says how it feels | `{type:'emotions', mode:null, theme:'', level:<K key>}` |
| F1 | "How Do You Feel? Circle the Face" · "Wie fühlst du dich? Kreise das Gesicht ein" / "¿Cómo te sientes? Encierra la carita" / "Hur känner du dig? Ringa in ansiktet" · "Miltä sinusta tuntuu? Ympyröi kasvot" | Look at the picture, think how you would feel, and circle the face that matches | `mode:'scene'` |
| F2 | "Draw the Feeling Face" · "Gefühle zeichnen: Male das Gesicht" / "Dibuja la cara de la emoción" / "Rita känslan i ansiktet" · "Piirrä tunne kasvoihin" | Read the feeling word and draw a face that shows it in the empty circle | `mode:'draw'` |
| F3 | "Feels Good or Feels Bad? Sort the Faces" · "Angenehme und unangenehme Gefühle sortieren" / "Emociones agradables y desagradables" / "Sköna och jobbiga känslor" · "Mukavat ja ikävät tunteet" | Draw a line from each face to the box that says whether the feeling feels good or bad | `mode:'valence'` |
| F4 | "Which Face Shows the Feeling? Circle It" · "Welches Gesicht passt zum Gefühl?" / "¿Qué cara muestra la emoción?" / "Vilket ansikte visar känslan?" · "Mitkä kasvot näyttävät tunteen?" | Read the feeling word and circle the one face in the row that shows it | `mode:'choice'` |
| F5 | "How Do I Feel Today? Feelings Check-In" · "Wie geht es mir heute?" / "¿Cómo me siento hoy?" / "Hur mår jag idag?" · "Miltä minusta tuntuu tänään?" | Circle the face that shows how you feel today, then draw your own face | `mode:'checkin'` |

All six at the K level key (§1). Titles <= 70, no worksheet-word, unique per band ("carita" in the es F1 title is a title noun, not a frame with an adjective). h1 = title; eyebrow = level label; strand row per §1 (framework NAME only; the `Language` row of `strand-names.ts` is not used). JSON-LD `LearningResource`, `educationalAlignment.targetName` en only (base / F4 L.K.5, F1 L.K.5.c; none on F2 / F3 / F5), no `targetUrl`. `topicMeta.emotions` (>= 50 chars) + `skill-sentences.en.json` entry via `tools/register-b3-en-content.js` (absent). Meta lead inherits `seo.words.free_printable` (README open item 1; not this type's).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F4 | a line per face vs one word, three faces, circle; elimination vs none | 0.35 |
| base vs F1 | a word vs a pictured situation; "how do you feel" | 0.25 |
| F1 vs F5 | a pictured situation vs the child's own day | 0.30 |
| F2 vs F5 | a given word vs your own face + a because line | 0.35 |
| F3 vs any | two boxes, no feeling word, good / bad | 0.20 |
| base vs K-225 (`match-word-to-picture`) | feeling words on faces vs a noun and its object | 0.20 |
| F3 vs K-235 (`sort-by-category`) / the science sorts | valence of faces vs category of objects | 0.15 |
| base / F1 vs G1-307 F1 | six feelings, one word per face vs opposite PAIRS | 0.12 |
| F5 vs K-323 all-about-me | today's feeling vs name / age / favourites; boundary sentence on both | 0.15 |
| any vs the `emotions` THEME hub (`/topic/emotions/` x11) | a theme listing titled with the theme name alone vs a move + "feelings" | 0.10 |

Boundary sentence on every landing: "The child reads a FEELING from a face or a situation" (against vocabulary matching, category sorting and opposites).

## 7 Hub visibility contract

A face appears under `emotions` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps.emotions` exists in `frontend/config/topics-taxonomy.json` (ABSENT, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type'].emotions` has `slug` + `name` in all 11 locales (§1 slugs, all distinct from `axes.theme.emotions.slug.<loc>`, grep = 0, m); (3) exactly one landing per face per locale with `coordinate.type === 'emotions'` verbatim, the K level key of §1, `coordinate.theme:''`, a unique slug, `canonicalDeckSlug` = the published deck; a face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=emotions`. Script absent (m) (nearest siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`; the hub's own selection lives in `frontend/lib/worksheets-sheets.ts expandHubRows` + `worksheets-catalog.ts applyLandingFilters`, m); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps.emotions` lands.

**Expected rows per locale:** 6 in every locale x 11 = **66**. No refusal is measured today: the six accepted faces and their words exist in all 11 vocabs, F3's bank is locale-neutral, F2 / F5 need only the panel's literals. A global `syringe` veto changes F1's card count (6 -> 5), never a row. Contingent reductions, each recorded in the draft before the wave: F1 in any locale that vetoes enough scenes to leave < 3 feelings or < 4 scenes (est. 0).
