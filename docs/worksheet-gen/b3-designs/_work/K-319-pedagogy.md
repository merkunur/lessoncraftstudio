# K-319 `emotions`: pedagogy + content design (2026-09-13)

Read: `_STUDIO-BRIEF`, `_SUBSTRATE`, `_PANEL-FINDINGS §11`, `G1-307-opposites.md`, K-225 (`lit-vocab-match.js`), K-235 (`science-category-sort.js`), `data/science/*.json` (20 banks, none emotions), `mini tools/picture-word-wall.js` (the only interactive `emotions` use: a word-wall band card, `na:1` = never an article), `lib/b2-common.js`, `image-cache/resolve.js`, `cache/manifest.json`, `topics-taxonomy.json`, `gen-b2var-landings.js LEVEL_KEYS`. Every picture named below was OPENED (`cache/themes-512/<theme>/<noun>@3x.webp`, 1536 px). *est.* = engineer measures. No em-dashes.

**Boundary.** The child READS A FEELING off a face or a situation and connects it to a feeling WORD or another face. K-225 matches a NOUN to its picture; K-235 and the science banks sort objects by category; G1-307 F1 joins opposite pictures (happy/sad is one of its 7 pairs); K-323 owns identity facts. No face here names an object, sorts by category or asks for an opposite.

## A. Identity

| field | value |
|---|---|
| key / band | `emotions` / all six faces **K** (`K-319` base; variations `K-325+ TBD`). No face bands G1: the art has no intensity ladder and one face per feeling. |
| `default_subject` | **`letters`** (taxonomy allows math/logic/letters/spatial-reasoning; a 5th triggers review §16.4). Every verifiable face prints or elicits a feeling WORD (L.K.5); the SEL objective rides on the word. Hub disc = the language rail. OPEN: an `sel` subject only if K-323 needs the same argument. |
| theme axis | `themeAxis:{applicable:false}`. Faces = the fixed theme `emotions` (15 files, 14 with vocabKey; `sceptical` has `vocabKey:null`, dropped by `labelSafeNouns`, `resolve.js:29`). Scene cues = (theme, noun) refs from other colour themes, the science-bank pattern. **Fan lever = the FEELING SET sampled per page (+ the scene sample on F1).** |
| taxonomy | `apps.emotions` ABSENT, `axes['exercise-type'].emotions` ABSENT (measured). `axes.theme.emotions` EXISTS: `emotions/emotionen/emociones/emoties/emozioni/emotions/emocoes/kanslor/folelser/folelser/tunteet`. ⚠ `/<loc>/topic/<slug>/` is ONE namespace across axes (§16.5): the type slugs below differ from the theme slug in every locale; whether the registrar rejects a cross-axis duplicate is UNKNOWN. |
| CCSS (en, honest) | base + F4 `L.K.5` · F1 `L.K.5.c` · F3 readiness · F2/F5 open. No CCSS SEL code exists; `SL.K` is not claimed (nothing is spoken). JSON-LD en only, no `targetUrl`. |
| accepted faces | **6**: happy sad angry scared surprised tired. 9 refused (section C). |

| loc | genre head | slug | K level key | strand named on the landing (framework NAME, no code) |
|---|---|---|---|---|
| en | Feelings | `feelings` | kindergarten | Social-emotional learning: self-awareness (CASEL) |
| de | Gefühle (DaZ) | `gefuehle` | vorschule | Bildungsplan Kita / Lehrplan Sachunterricht: Gefühle wahrnehmen und benennen |
| es (MX) | Emociones | `emociones-y-sentimientos` | preescolar | SEP/NEM Educación socioemocional: autoconocimiento |
| pt (BR) | Emoções e sentimentos | `emocoes-e-sentimentos` | educacao-infantil | BNCC EI "O eu, o outro e o nós"; competência 8 |
| fr | Les émotions | `les-emotions` | maternelle | programme de maternelle: identifier et exprimer ses émotions |
| it | Le emozioni | `le-emozioni` | infanzia | Indicazioni nazionali "Il sé e l'altro" |
| nl | Gevoelens | `gevoelens` | kleuters | SLO sociaal-emotionele ontwikkeling: gevoelens herkennen |
| sv | Känslor (känslokort) | `kanslokort` | forskola | Lgr22 förskoleklass "Språk och kommunikation"; Lpfö 18 [NSR] |
| da | Følelser | `foelelser` (oe-fold; theme is `folelser`) | boernehaveklasse | Fælles Mål børnehaveklasse "Engagement og fællesskab" [NSR] |
| no | Følelser | `folelsene-mine` | 1-trinn | LK20 Folkehelse og livsmestring [NSR] |
| fi | Tunteet, tunnetaidot | `tunnetaidot` | esikoulu | EOPS 2014 "Minä ja meidän yhteisömme", tunnetaidot [NSR] |

## B. The six faces

Reused: `matchColumns` (G1-307 defines it in `templates/components-b3.js`, absent today), `cardGrid`, `.ws-card .ws-lane .ws-match-* .ws-achip .ws-icon`, `writingRow`, `fileUri`, `makeScienceCategorySort`. NEW in `components-b3.js`: `faceChoiceRow({faces:[{noun,key}], px})` (round `.ws-achip` tiles with a face image, `data-lcs-choice`), `sceneRow({objects, px})` (1-2 objects, no background), `blankFace({d})` (teal circle 3 px, empty). Words are panel literals in `data/b3/emotions.js`; the vocab is only a spelling cross-check.

### Base: Feelings, Match the Face to the Word (K-319, PARAM ladder)
EN "Feelings: Match the Face to the Word". **Move:** recognise the feeling on a face, connect it to its word (the en/nl "feelings matching" head). **Child:** line from each face (left, 80 px, `data-lcs-face`) to a word (right, Baloo 2 700 28, `data-lcs-word`), deranged (`lit-vocab-match.js:44` idiom). 6 pairs, itemH 114 (`matchColumns`, m in G1-307); fi `Surullinen` 10 glyphs *est.* 170 px in a 280 col. d1 4 pairs (happy sad angry tired; pic 100) · **d2 6 pairs, all accepted** · d3 6 pairs, both columns shuffled, pic 72 (not a distinct move; recorded). **verify():** left ids ⊆ `matchable`; right ids = left ids as a set; no fixed point; words distinct on the page; pairs in [4,8]; images resolve. **Refusal:** < 4 matchable words (none expected). **Query face:** "match" + head.

### F1: How Do You Feel? Circle the Face (K-3xx, CODE `layout:'scene'`)
**Move:** INFER a feeling from a SITUATION (L.K.5.c). **Child:** 1-2 objects, circle one of three faces. First-person framing ("how do YOU feel when…") keeps every locale free of a gendered subject; the answer is a face, so es/pt/it/fr print no adjective here. **Layout:** `cardGrid` 2×3, row (760-28)/3 = 244, inner 302×216: `sceneRow` 80 px + 10 + `faceChoiceRow` 3×64 = 154. d1 4 cards, 2 choices, feelings {happy, tired} · **d2 6 cards, 3 choices, 3 feelings each ≤ 2 cards** · d3 8 cards (2×4, 64/56), 4 choices (+ `sad`, a never-correct decoy). **Scene table (GLOBAL: locale-neutral seed; a panel veto removes the scene in all 11):** present → happy [alsoPlausible surprised, excited] · balloon → happy [excited] · medal → happy · teddy_bear → happy · thunderstorm → scared · syringe → scared [sad] (veto-able; a veto leaves one scared scene and d2 drops to 5 cards, still ≥ 4) · bed → tired · pillow + moon → tired · pajamas + moon → tired. `cake` is a SLICE with a strawberry, no candles: a weak happy alternate only. Only three feelings have honest object cues, so "one feeling per page" cannot meet the K floor of 4; the rule is **≥ 3 distinct feelings, each ≤ ceil(cards/3)**. **verify():** `data-lcs-answer === SCENES[id].feeling` (node gate `tools/gate-emotions-data.js`; `page.evaluate` cannot require); exactly one choice equals it; no choice ∈ `alsoPlausible`; choices distinct; correct index takes ≥ 2 positions; no object twice; every object resolves, no localized BW marker. **Query face:** "how do you feel".

### F2: Draw the Feeling Face (K-3xx, CODE `layout:'draw'`, OPEN)
**Move:** EXPRESS a feeling with features (the universal K page). `cardGrid` 2×2, inner 302×345: word Baloo 2 700 30 + `blankFace({d:200})`. d1 adds a 56 px model face (copy); **d2 4 cards, word only** (happy sad angry scared); d3 6 cards 3×2, d 150. No verify; lints only. **Query face:** "draw".

### F3: Feels Good or Feels Bad? Sort the Faces (K-3xx, FACTORY `makeScienceCategorySort`, new bank, `exerciseType:'emotions'`)
**Move:** judge VALENCE (comfortable/uncomfortable: present in all 11 frameworks). The label is irrelevant here, so faces refused for words are usable where their valence is unmistakable. **Bank:** good = happy, merry, content, excited · bad = sad, angry, scared, capricious (crying), disgusted (grimace). Excluded: tired, surprised, bored, confused, shy, sceptical. d1 perBin 2 · **d2 perBin 4** (8 items; itemPx = min(78, floor(648/8)-12) = 69 ≥ 56, factory line 82) · d3 bins labelled by a 40 px face (needs an additive `labelHtml` knob; `labelFor` is text-only; if refused d3 = d2). Bin labels = panel words (`data.bins[].label.<loc>`). **verify():** factory's own + every item ∈ the bank's valence list. **Query face:** "good or bad feelings".

### F4: Which Face Shows the Feeling? (K-3xx, CODE `layout:'choice'`)
**Move:** RECEPTIVE identification with distractors and NO elimination (the base lets a child finish by elimination; every row here is independent). 6 `.ws-lane` rows h 116 (inner 88): word Baloo 2 700 26 col 200 `data-lcs-target` + 3 faces 64 px (416 ≤ 639). d1 4 rows, 2 faces · **d2 6 rows, 3 faces, distractors ∉ `confusable[target]`** (scared ↔ surprised) · d3 6 rows, 4 faces, confusables allowed. **verify():** target ∈ `matchable`; exactly one chip === target; distractors distinct; d2 confusable rule; index takes all 3 positions. **Query face:** "which face".

### F5: How Do I Feel Today? (K-3xx, CODE `layout:'checkin'`, OPEN)
**Move:** SELF-REPORT, one day per page. Strip of the 6 faces 72 px (circle one) + `blankFace({d:200})` "draw your face" + `writingRow` 600×72 glyphH 40 (K whole-word floor) "because…" for dictation. d1 4 faces · **d2 6** · d3 + a lane "what helps me". No verify. **Boundary:** K-323 all-about-me must not add an "I feel" item. **Query face:** "today".

**Rejected non-moves.** Theme swap (the faces ARE the theme) · trace the feeling word (K-284 is theme-fanned; `emotions` has 14 traceable nouns, the wave may already emit it) · write the word (G1-244) · calm-down match (no picture for breathe, hug, talk, count; `activities` offers reading/painting/singing/running only: REFUSED, not faked) · same-or-different (one file per feeling; "same" = an identical picture = K-062) · odd-one-out face (factory + app; valence-solvable = F3) · intensity ladder (one ladder in the art: content < happy < merry; a G1 candidate only if the art grows) · body signals (abstract, no art) · feelings ↔ colours (faces already coloured, no BW faces, no black in codeColors) · broken/lost toy → sad (a coral X reads "not allowed") · rain → sad (culturally variable) · count the faces · d1/d3 relabelled.

## C. Native rebuild ×11

**Face verdicts (opened).** ACCEPT: happy (open smile, teeth) · sad (deep frown, brows up-inward) · angry (V brows, gritted teeth) · scared (wide eyes, worried brows, gaping scream; confusable with surprised) · surprised (raised brows, round O mouth, lashes) · tired (closed eyes, yawn). REFUSE for words: excited (= happy with lashes: two right answers), shy (= content: small smile, sideways glance), content (calm smile), merry (eyes shut, laughing), capricious (eyes shut, wailing = crying), disgusted (squinted X eyes, red marks = pain/yuck/sneeze), bored (worried, eyes up = unsure), confused (a printed "?" carries the meaning; the face is worried), sceptical (no vocabKey). Valence use: content/merry/excited GOOD; capricious/disgusted BAD.

**Gender.** The faces are yellow emoji balls, not children; lashes on surprised/shy/excited/confused/sceptical are art style. The printed word is the locale's card citation form (masculine sg in es/pt/it/fr, as SEP emocionómetro, BNCC and EMC cards print). `wordF` is stored for an optional "(a)" print and any future girl-pictured page. **No gendered noun (carita, rosto, faccia, visage) may stand in the same frame as a feeling adjective anywhere on the type.** Feminine forms: es enojada asustada sorprendida cansada · pt brava assustada surpresa cansada · it arrabbiata spaventata sorpresa stanca · fr heureuse effrayée surprise fatiguée (feliz, triste, en colère invariant).

| loc | words the panel authors (vocab → panel form) | scene / refusal | traps |
|---|---|---|---|
| en | happy sad angry scared surprised tired | all 9 scenes | "mad" is the home word, "angry" the school word: pick one, `alt` the other |
| de | glücklich traurig wütend ängstlich überrascht müde (`Verängstigt` → Kita `ängstlich`) | syringe kept ("Angst vor der Spritze" is Kita canon) | ALL lowercase: the vocab capitalises adjectives; never `displayWord` |
| es (MX) | feliz triste enojado asustado sorprendido cansado | all | `enojado` never `enfadado`; `wordF` -a; title carries "emociones" |
| pt (BR) | feliz triste bravo assustado surpreso cansado | all | `bravo` vs `com raiva`: panel picks; circumflex in the head |
| fr | content triste en colère apeuré surpris fatigué (`Heureux`/`Effrayé` → maternelle register; panel confirms) | la piqûre is a standard GS scene: kept | "fiche" banned in titles; `en colère` is two words |
| it | felice triste arrabbiato spaventato sorpreso stanco | all | "scheda" banned; `wordF` -a |
| nl | blij verdrietig boos bang verbaasd moe (`Verrast` → `verbaasd`) | all | no de/het anywhere; head "gevoelens", theme slug is `emoties` |
| sv | glad ledsen arg rädd förvånad trött | syringe: likely VETO (medical-fear reinforcement) | `glad` backs ONLY happy; never `grupp`; common-gender citation |
| da | glad ked af det vred bange overrasket træt (`Trist` → child form; 3 words) | all | `Kedet` in vocab is a bare participle (bored refused anyway) |
| no | glad lei seg sint redd overrasket trøtt (`Trist`/`Trett` → child forms) | all | bokmål; bare `lei` = fed up: never print it |
| fi | iloinen surullinen vihainen pelokas yllättynyt väsynyt (`Peloissaan` is adverbial: panel picks) | syringe: possible VETO | nominative only; `kasvot` is plural-only ("mitkä kasvot") |

F3 bin labels (≤ 12 glyphs *est.* for the 17 px pill; measure `unangenehm`/`desagradable`): en Feels good / Feels bad · de angenehm / unangenehm · es agradable / desagradable · pt gostoso / ruim · fr agréable / désagréable · it piacevole / spiacevole · nl fijn / niet fijn · sv skön / jobbig · da rar / ubehagelig · no god / vond · fi mukava / ikävä. Every panel opens every face and scene it keeps (`faceOpened` / `sceneOpened:true`, asserted): `emotions/shy` and `miscellaneous/ghost` prove the file name is not the picture.

## D. Data + gates

`data/b3/emotions.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; `data/` gitignored, force-add):
```
EMOTIONS[loc] = {
  feelings: [{ id:'happy', word:'feliz', wordF:null, face:{theme:'emotions', noun:'happy'},
               matchable:true, valence:'good'|'bad'|null, confusable:['excited'], faceOpened:true }],
  scenes:   [{ id:'present', objects:[{theme:'christmas', noun:'present'}], feeling:'happy',
               alsoPlausible:['surprised','excited'], sceneOpened:true, alt:{en:'a wrapped present'} }],
  veto:     ['syringe'],                       // locale veto; apply- propagates it to all 11
  bins:     { good:{label}, bad:{label} },
  strings:  { 'K-319':{title,instruction}, F1..F5:{title,instruction} } }
```
`scenes`, `face`, `matchable`, `valence`, `confusable` are locale-neutral (copied from en); a locale may only VETO.

**`tools/validate-b3-draft.js` (emotions block; exit 1 on any):** (1) every `face.noun` ∈ `manifest.themes.emotions.nouns` with a vocabKey; `matchable:true` ⊆ ACCEPTED_MATCH {happy sad angry scared surprised tired}; `valence` ids ⊆ ACCEPTED_GOOD ∪ ACCEPTED_BAD; `faceOpened:true`. (2) `word` `/^[\p{L}' ]+$/u`, ≤ 14 glyphs, distinct across feelings, lowercase in de unless `capital:true`, cross-checked case-insensitively against `image-vocabulary.js[vocabKey][loc][0]` or a declared override; `wordF` present in es/pt/it/fr unless `invariant:true`. (3) every scene object resolves via `fileUri`, theme has no localized BW marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`), noun ∉ `B2_EXCLUDE`, ≤ 2 objects, `sceneOpened:true`, `feeling` ∈ ACCEPTED_MATCH, `alsoPlausible` ⊂ ids; after vetoes ≥ 3 feelings with ≥ 1 scene and ≥ 4 scenes, else F1 refused, reported. (4) F3 bank ≥ 4 per bin after exclusions. (5) titles ≤ 70, no worksheet-word, unique in band; instruction ≤ 150.

**`qa/verify-b3-emotions.js`:** face × 11 at d2; `verify()` empty; `qa/lints.js` clean; density (`.ws-icon` ≥ 56, chips ≥ 44 high); 20-seed sweep: base never in fixed-point order, F1 correct index ≥ 2 positions and no feeling > 2 cards, F4 index takes all 3 values, F3 strip ≠ bin order. **Poison (each must FAIL; the correct draft is the control):** P1 `excited.matchable:true` · P2 scene `ghost → scared` (resolves; fails the accepted-scene check: the human open IS the gate) · P3 F1 `present` with choices `[happy, surprised, tired]` · P4 F1 page with `happy` on 4 of 6 cards · P5 F3 `tired` in bin `bad` · P6 object `{theme:'zoo animals bw', noun:'lion'}` · P7 de word `Wütend` · P8 sv `glad` on two feelings · P9 F4 d2 row `scared` with distractor `surprised` · P10 base with 3 pairs.

Page reads at render: `data/b3/emotions.js[loc]`, `fileUri`; never `image-vocabulary.js` or `approved-words-*.json`.

## E. SEO

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (the instruction) |
|---|---|---|
| base | "Feelings: Match the Face to the Word" · "Gefühle: Gesicht und Wort verbinden" / "Emociones: une la cara con la palabra" / "Känslor: para ihop ansikte och ord" · "Tunteet: yhdistä kasvot ja sana" | Draw a line from each face to the feeling word that says how it feels |
| F1 | "How Do You Feel? Circle the Face" · "Wie fühlst du dich? Kreise das Gesicht ein" / "¿Cómo te sientes? Encierra la carita" / "Hur känner du dig? Ringa in ansiktet" · "Miltä sinusta tuntuu? Ympyröi kasvot" | Look at the picture, think how you would feel, and circle the face that matches |
| F2 | "Draw the Feeling Face" · "Gefühle zeichnen: Male das Gesicht" / "Dibuja la cara de la emoción" / "Rita känslan i ansiktet" · "Piirrä tunne kasvoihin" | Read the feeling word and draw a face that shows it in the empty circle |
| F3 | "Feels Good or Feels Bad? Sort the Faces" · "Angenehme und unangenehme Gefühle sortieren" / "Emociones agradables y desagradables" / "Sköna och jobbiga känslor" · "Mukavat ja ikävät tunteet" | Draw a line from each face to the box that says whether the feeling feels good or bad |
| F4 | "Which Face Shows the Feeling? Circle It" · "Welches Gesicht passt zum Gefühl?" / "¿Qué cara muestra la emoción?" / "Vilket ansikte visar känslan?" · "Mitkä kasvot näyttävät tunteen?" | Read the feeling word and circle the one face in the row that shows it |
| F5 | "How Do I Feel Today? Feelings Check-In" · "Wie geht es mir heute?" / "¿Cómo me siento hoy?" / "Hur mår jag idag?" · "Miltä minusta tuntuu tänään?" | Circle the face that shows how you feel today, then draw your own face |

All six at the K level key. h1 = title; eyebrow = level label; strand row = section A (framework name + strand, code only in en JSON-LD). `topicMeta.emotions` + `skill-sentences.<loc>.json` via the b3 registrar (absent). The meta lead inherits `seo.words.free_printable` (MEMORY "tier truth": a standing open item, not this type's).

**Non-cannibalisation** (3-gram Jaccard, `gate.js` FAIL ≥ 0.80; *est.*): base vs F4 0.35 (a line per face vs one word, three faces, circle) · base vs F1 0.25 (a word vs a situation) · F1 vs F5 0.30 (pictured situation vs the child's own day) · F2 vs F5 0.35 (a given word vs your own face) · F3 vs any 0.20 (two boxes, no feeling word) · base vs K-225 0.20 (feeling words on faces vs a noun and its object) · F3 vs K-235 / science sorts 0.15 (valence of faces vs category of objects) · base/F1 vs G1-307 F1 0.12 (six feelings vs opposite pairs) · F5 vs K-323 0.15 (today's feeling vs name/age/favourites; boundary on both landings). Boundary sentence on every landing: "The child reads a FEELING from a face or a situation".

## F. Open questions + summary

1. `default_subject`: `letters`; an `sel` 5th subject is a doctrine review, decide after K-323.
2. Cross-axis slug namespace: the theme axis owns `emotions/emociones/emozioni/kanslor/folelser/tunteet`; the type slugs avoid every collision; the registrar's duplicate check is UNKNOWN.
3. `syringe → scared`: sv/fi likely veto; then scared has one scene and d2 = 5 cards. No third honest scared cue exists (ghost, spider, shark, wolf all SMILE; `stormy` is a red cloud; `cast` shows a neutral-faced child).
4. F3 d3 needs an additive `labelHtml` knob on the `_shared` factory; else d3 = d2.
5. K-323 must not add an "I feel" item (F5 owns the check-in).
6. Does the b2 wave already fan `emotions` into K-284 word-tracing? If yes, its title must not collide with these heads.

**Summary.** Six K faces on the fixed `emotions` theme: face↔word match (base), situation → circle the face (F1, 9 global scenes over happy/scared/tired), draw the face (F2, open), good/bad valence sort (F3, factory reuse, 9-face bank), word → which face (F4), today's check-in (F5, open). Only 6 of 15 faces are K-legible for words; smiling "fear" objects, rain, broken toys and unpictured calm-down strategies are refused with reasons. Words are panel citation literals; no gendered noun ever stands beside an adjective; the scene table is global and veto-only. Four verifiable + two open faces, 66 hub rows expected.
