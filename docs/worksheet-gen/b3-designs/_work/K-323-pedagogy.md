# K-323 `all-about-me` (K): pedagogy + content design (2026-09-14)

Inputs: brief, substrate, README rulings, `_PANEL-FINDINGS.md` §17 (+§11 §12 §16), K-319 / G2-318 / G1-308 FINALs, `_work/K-321-pedagogy.md`. Read in the repo: `G2-278`, `K-284`, `data/b2/labels.js`, `data/b2/sentences.js`, `data/color-words.js`, `components-b2.js` (`letterBoxes:273 colorLegend:77 wordBank:210 pillChoice:226`), `components.js` (`answerBox:105`), `primitives/ten-frame.js:13`, `trace-path.js` (`writingRow:681`), `cache/manifest.json`, the vocab via `loadVocab`, `topics-taxonomy.json`, 11 landing corpora, `gen-b2var-landings.js LEVEL_KEYS`. (m) = measured by node; pictures OPENED at `cache/themes-512/<theme>/<noun>@3x.webp`; *est.* = the engineer measures. No em-dashes.

**Boundary (load-bearing).** The child records FACTS ABOUT HIMSELF (name, age, favourites, family, face, abilities) in labelled slots. K-319 owns feelings (**no "I feel" item anywhere here**, K-319 F5 rule). G2-318 owns an ANIMAL's file. G2-278 narrates a scene. K-284/K-238 trace a MODEL word; name tracing needs a name-input generator (out of scope, §B). K-321 owns month names (**no birthday month here**). K-225/K-235 match or sort pictures to words; nothing here matches or sorts. **`name tracing` demand is NOT in the committed `_PANEL-FINDINGS.md` (grep 0, m)**; the prompt's "extra e, EN A-tier" claim is recorded as unverified.

## A. Identity

| field | value |
|---|---|
| id / key / band | `K-323` / `all-about-me` / **K in all six faces** (`K-325+ TBD by the emitter`). The counting faces stay K: counts ≤ 10 with 0 allowed (K.CC.A.3); the labelling face copies from a printed bank. `default_age_range: '5-7'`, `assetClass: 'icon-placement'`, `exerciseType: 'all-about-me'`. `apps['all-about-me']` and `axes['exercise-type']['all-about-me']` ABSENT (m). |
| subject ruling | **`letters`**, aligned with K-319. Every structured face prints or elicits a WORD (name, the favourite's word, five face words, the "I can" frame); base = W.K.2. A `sel` 5th subject costs a §16.4 doctrine review, a new hub disc with two K rows (K-319 + K-323), and a `default_subject` value the rail has never rendered. **OPEN 1: decide `sel` for K-319 + K-323 together; default `letters`.** |
| theme axis | **OFF** (`themeAxis:{applicable:false}`; landings `coordinate.theme:''`; `coordinate.mode` = the face string, base `'base'`). Fixed picture sets: `animals` 37 · `fruits` 28 · `At the Supermarket` 63 · `toys` 30 · `vehicles` 29 (favourite options, m); `colors` = the 8 `codeColors` swatches + `COLOR_WORDS[loc]` (`data/color-words.js`, m); `body parts/face` (F3 anchors); `activities` 34 + cross-theme cues (`classroom/pencil`, `clothing/shoe`, `At the Supermarket/toothbrush`) for F4. NO family pictures exist (59 themes, m): family is words + drawing. |
| fan lever | **none in this batch** (one instance per face per locale, seed samples options). Future: `unitAxis` = favourites category on F1 (`-u<animal|food|color|toy>`), additive-with-fallback. Not needed for 66 hub rows. |
| CCSS (en only) | base **W.K.2 + SL.K.5** · F1 none (readiness: picture-word reading) · F2 **K.CC.A.3** (write 0-10) + K.CC.B.4.a · F3 none (readiness: body vocabulary) · F4 none (readiness: repeated-frame emergent reading; RF.K.4 not claimed) · F5 **K.CC.B.5 + K.CC.C.6**. No CCSS SEL code; JSON-LD en only, no `targetUrl`. |
| collisions | candidate slugs ×11 grepped against EVERY axis slug in every locale: **0** (m). 11 landing corpora (30,773 titles+h1): **0** identity heads claimed (m). |

| loc | genre head (title root) | ASCII slug | level key | strand (framework NAME only) |
|---|---|---|---|---|
| en | All About Me | `all-about-me` | `kindergarten` | Social-emotional learning: self-awareness; Writing |
| de | Das bin ich ("Steckbrief über mich" in meta) | `das-bin-ich` | `vorschule` | Sachunterricht: Ich und die anderen |
| es (MX) | Todo sobre mí ("ficha de presentación") | `todo-sobre-mi` | `preescolar` | SEP/NEM Educación socioemocional: autoconocimiento |
| pt (BR) | Quem sou eu ("tudo sobre mim") | `quem-sou-eu` | `educacao-infantil` | BNCC EI "O eu, o outro e o nós" |
| fr | C'est moi ("fiche de présentation", "portrait") | `c-est-moi` | `maternelle` | programme de maternelle: construire son identité |
| it | Mi presento ("carta d'identità") | `mi-presento` | `infanzia` | Indicazioni nazionali "Il sé e l'altro" |
| nl | Dit ben ik | `dit-ben-ik` | `kleuters` | SLO: oriëntatie op jezelf en de wereld |
| sv | Det här är jag | `det-har-ar-jag` [NSR] | `forskola` | Lgr22 förskoleklass: identitet, språk och kommunikation |
| da | Mig selv ("alt om mig" in meta) | `mig-selv` [NSR] | `boernehaveklasse` | Fælles Mål børnehaveklasse: engagement og fællesskab |
| no | Alt om meg | `alt-om-meg` [NSR] | `1-trinn` | LK20: folkehelse og livsmestring |
| fi | Minä itse ("tällainen minä olen") | `mina-itse` [NSR] | `esikoulu` | EOPS 2014 "Minä ja meidän yhteisömme" |

## B. The six faces

Body **722** (README); `.ws-page` inner 675; `.ws-lane` inner 643; `.ws-card` inner = w − 28 (K-319, m). Slack absorbed by `minmax` rows. F1-F5 are CODE faces (`layout` knob + a `verify()` branch; base byte-identical, `data-lcs-face` only when declared). Open-ended faces: **no `verify()` on the child's output; structural verify + lints only** (the G2-318 wording).

### Base: All About Me (`layout:'base'`, K, W.K.2 + SL.K.5, OPEN-ENDED)
**Move:** COMPOSE a first informative page about me (name, age, portrait, family, three favourites). **Layout:**
```
nameLane .ws-lane 675x84: "My name is" Nunito 800 20 + writingRow({w:430,h:64,glyphH:40})
portrait drawBox 300x300 ("This is me" 14 inkSoft inside) | 15 | ageLane 360x84 (pre literal + answerBox 64x64 + post literal) ; familyBox drawBox 360x204 ("My family")
favourites row: 3 .ws-card 217x220 gap 12: heading literal Nunito 800 18 (2-line reserve 46) + drawBox 189x150
84 + 12 + 300 + 12 + 220 = 628 ≤ 722 (favourites row minmax(220px,1fr))
```
`drawBox` = G1-308's (`components-b3.js`, file absent, m). `answerBox` = `components.js:105`. glyphH 40 = the K whole-word floor. **d1** no favourites row, portrait 675x300 + family 675x204; **d3** favourites 4 cards 160 wide (toy added), age + "I go to" lane (`school` literal). **Verify:** structural: one `[data-lcs-name]` empty lane, one empty `[data-lcs-age]` box, `[data-lcs-drawbox]` ×5, headings === bank literals, no numeral, no `img`. **Refusal:** none (labels only). **Query face:** the bare head ×11.

### F1: My Favourite Things (`layout:'favourites'`, K, STRUCTURED)
**Move:** CHOOSE within a category from PICTURED options, then READ and COPY the chosen word. **Layout:** 3 `.ws-lane` 675x226 gap 12 (702 ≤ 722): heading 24 + 6 + 6 option tiles 100x110 gap 8 (640 ≤ 643; icon 64 ≥ K floor 56, word Nunito 800 16 under) + 6 + copy lane `writingRow({w:643,h:64,glyphH:40})` with the per-category starter. Rows d2 = **animal · food · colour**; colour tiles = 64 px rounded swatch (`colorLegend` idiom, `codeColors`) + `COLOR_WORDS[loc][key]`. Options = `rng.sample(options, 6)` from a GLOBAL list ≥ 8 per category (seed locale-neutral: same six pictures ×11). **d1** 2 rows (animal, colour), 4 tiles 120 px; **d3** 4 rows (+toy), tile 96, copy lane glyphH 32. **Verify:** each row exactly 6 distinct `[data-lcs-opt]` tiles, `img.complete && naturalWidth > 0`, label text === `displayWord(vocab[key][loc][0])` (colour: `COLOR_WORDS`), label `scrollWidth ≤ 96`, no vocabKey twice on the page, no BW marker in any `src`, copy lane empty, no tile pre-ringed. **Refusal (data):** a category with < 6 options passing the width gate in a locale drops that category; < 2 categories = face refused (none expected; fi `vaaleanpunainen` fails the tile width → fi colour pool = 7). **Query face:** "my favorite things" · "Lieblingssachen" · "mis cosas favoritas" (panels: the favourites noun).

### F2: All About My Family (`layout:'family'`, K, K.CC.A.3, STRUCTURED COUNT)
**Move:** REPRESENT a self-known quantity on a ten-frame and WRITE the numeral (0 included). **Layout:** `drawBox` 675x300 ("Draw the people in my family") + 12 + 2x2 `cardGrid` cards 330x150 (gap 14): heading literal 18 + `tenFrame({a:0, cell:40})` 206x86 + 12 + `answerBox` 56x56 (274 ≤ 302). Cards d2 = **people in my family · brothers · sisters · pets**. 300 + 12 + 314 = 626 ≤ 722. **d1** 2 cards (people, pets); **d3** 4 cards + "more brothers or sisters? circle" `pillChoice`. **Verify:** 4 empty `[data-lcs-tenframe]` (0 dots), 4 empty boxes, headings === bank `countHeads` literals in HEADING form (no numeral-plural sentence), no numeral printed. **Refusal:** none. **Query face:** "all about my family" · "Meine Familie" · "mi familia" (panels: the family noun).

### F3: This Is Me: Label the Face (`layout:'face'`, K, STRUCTURED, VERIFIABLE)
**Move:** LABEL the parts of ONE printed face from a word bank (parts of a whole), then draw your own. **Picture:** `body parts/face` (opened: a smiling child's face with hair, eyebrows, eyes, ears, nose, mouth, cheeks; ONE picture, so an anchor table is feasible where G2-318's animal labelling was not). **Layout:**
```
wordBank({words:5, wordPx:17}) 675x50 (no icons, shuffled)
[lanes L 200][7][face icon 260][7][lanes R 200] = 674 : 5 lanes writingRow({w:200,h:64,glyphH:40}) gap 10 = 360 ; pointer lines anchor → lane edge
drawBox 675x260 ("Now draw your face")
50 + 12 + 360 + 12 + 260 = 694 ≤ 722
```
Anchors (fractions of the icon box, *est.* from the 512 render; the engineer measures): hair `{0.50,0.16,L}` · ear `{0.09,0.60,L}` · eye `{0.65,0.58,R}` · nose `{0.50,0.68,R}` · mouth `{0.50,0.83,R}`. Words = vocab singular literals via `displayWord` (`hair` is plural-only in de/fr/it/fi: `Haare/cheveux/capelli/hiukset`, used as-is; `cheeks` NEVER: plural literal, and sv/da `Kinder` = cheeks is a false friend). Widest at glyphH 40, lane 200: it `orecchio` 8 letters ≈ 192 (*est.* 24 px/letter). **d1** 3 parts (eye nose mouth), lanes 300 both sides of a 260 face; **d3** 7 parts (+eyebrow, chin), glyphH 34. **Verify:** bank set ⇔ `[data-lcs-part]` lanes bijection; 5 pointer endpoints inside the face bbox; lanes empty; no part word printed at a pointer; `img` complete. Answer = the lane's `data-lcs-part` (id, never text). **Refusal:** none (5 words exist ×11, m). **Query face:** "label the face / parts of the face" · "Gesicht beschriften" · "partes de la cara" (panels: the face-parts noun).

### F4: I Can (`layout:'ican'`, K, OPEN-ENDED self-report)
**Move:** READ a repeated predictable frame ("I can ___") eight times and TICK it (the K "I can" emergent reader + self-efficacy; LK20 livsmestring, Lgr22 "tilltro till sin egen förmåga"). **Layout:** `cardGrid({cols:2, rows:4})` cards 330x140 gap 14 (602): `[tick .ws-blankbox 44][10][icon 88][10][literal Nunito 800 18, 2 lines ≤ 150 px]`; + 12 + lane 675x100 "I want to learn to:" (drawBox 200 + writingRow). 602 + 12 + 100 = 714 ≤ 722. **Cues (opened):** run `activities/running` (child) · skip `activities/jumping` (child with rope) · ride a bike `activities/biking` (child) · read `activities/reading` (child) · swim `activities/swimming` (goggles, object cue) · play football `activities/soccer` (ball) · do a puzzle `activities/puzzle` · paint `activities/painting` (palette); alternates sing (mic), skate (skate), ski (skis), write my name `classroom/pencil`, tie my shoes `clothing/shoe`, brush my teeth `At the Supermarket/toothbrush`. **REJECTED cues:** `activities/dancing` (adult ballerina), `activities/writing` (adult man), `gymnastics` (adult pose). The `can` literal is PANEL-AUTHORED per action (the vocab stores `Schwimmen/Natation/Nuoto` nouns, m: never a verb). **d1** 6 cards; **d3** two tick columns per card (can / want to learn). **Verify:** 8 distinct `[data-lcs-action]`, `img` complete, literal === bank `can`, ticks empty, literal ≠ the vocab word. **Refusal:** < 8 authored `can` literals in a locale = face refused (never a vocab fallback). **Query face:** "I can" · "Ich kann schon" · "yo puedo / sé" (panels: the "I can" frame).

### F5: My Name (`layout:'name'`, K, K.CC.B.5 + K.CC.C.6, STRUCTURED COUNT)
**Move:** WRITE the name, one letter per box, COUNT the letters, name the FIRST letter, COMPARE with a friend's name. **Layout:** nameLane 100 (label + writingRow 643x64 glyphH 40) · boxes lane 96 (`letterBoxes({n:10, box:56, gap:6})` = 616 ≤ 643; box 56 = K floor) · 2 cards 330x110 ("Letters in my name" answerBox 60 · "My name starts with" answerBox 60) · friendLane 100 · friend boxes 96 · compare lane 60 ("Who has more letters?" `pillChoice` me | my friend, fixed order). 100+12+96+12+110+12+100+12+96+12+60 = 622 ≤ 722. **d1** my name only; **d3** + "How many more?" box. **Verify:** two `[data-lcs-letterboxes="10"]`, three empty boxes, pills fixed order, no model word, no numeral. Names > 10 letters continue on the lane (literal says "first name"); not a refusal. **Boundary:** no `strokeWordLane` (K-284); name TRACING is out of scope: it needs a name-input generator (state, do not build). **Query face:** "name activities / how many letters" · "Mein Name" · "mi nombre" (panels: the name noun).

**Rejected non-moves.** "How do I feel" (K-319 F5) · birthday month (K-321 boundary; K-321 already rejected "mark your birthday month") · **hand outline** (measured: 703 px = 186 mm → 3.78 px/mm; a K hand ≈ 125 mm needs ≥ 470 px tall, i.e. a whole page for a motor trace with no further move; the `hand` picture is a palm, not a template) · "me as an animal" (G2-318) · my day / routine (no bed-to-school art beyond `toothbrush`; sequencing = science-sequence) · a friend and me same/different grid (G2-318 F5's face; doubly open; folded into F5's compare) · me in numbers with height/weight (needs measuring, Gr1+, sensitive) · name tracing (needs input) · label my OWN drawing (unverifiable) · colour a self-portrait (colouring) · theme swap · d1/d3 relabelled.

## C. Native rebuild ×11

| loc | name · age (pre / post) · this is me · family · favourite (animal / food / colour) · I can | traps |
|---|---|---|
| en | My name is · I am / years old · This is me · My family · My favourite animal / food / colour · I can | US "favorite" spelling in titles (en = US market) |
| de | Ich heiße · Ich bin / Jahre alt · Das bin ich · Meine Familie · Mein Lieblingstier / Mein Lieblingsessen / Meine Lieblingsfarbe · Ich kann | "1 Jahr" vs "Jahre" (band 5-7: accept); Lieblings- takes the HEAD noun's gender (die Farbe → Meine); copula + bare noun needs an article ("ist Katze" ✗) → heading form "Mein Lieblingstier:" |
| es | Me llamo · Tengo / años · Así soy yo · Mi familia · Mi animal favorito / Mi comida favorita / Mi color favorito · Yo puedo / Sé | "Este/Esta soy yo" agrees with the CHILD → use "Así soy yo"; favorito/a per category noun; "1 años" accepted at band |
| pt | Meu nome é · Eu tenho / anos · Sou eu! · Minha família · Meu animal favorito / Minha comida favorita / Minha cor favorita (cor is FEMININE) · Eu sei | "Este/Esta sou eu" gendered → "Sou eu!" or "Meu retrato"; school year starts Feb (no "August" in meta) |
| fr | Je m'appelle · J'ai / ans · C'est moi · Ma famille · Mon animal préféré / Mon plat préféré / Ma couleur préférée · Je sais | "je peux" = permission, "je sais" = skill; préféré(e) per category; bare noun after "est" needs "un/le" → heading form |
| it | Mi chiamo · Ho / anni · Sono io · La mia famiglia · Il mio animale preferito / Il mio cibo preferito / Il mio colore preferito · So | "Questo/Questa sono io" gendered → "Sono io"; "1 anni" accepted; heading form for the copy lane |
| nl | Ik heet · Ik ben / jaar · Dit ben ik · Mijn gezin · Mijn lievelingsdier / lievelingseten / lievelingskleur · Ik kan | `jaar` invariant (no trap); gezin (household) vs familie (extended): panel decides per F2 vs base |
| sv | Jag heter · Jag är / år · Det här är jag · Min familj · Mitt favoritdjur (ett) / Min favoritmat / Min favoritfärg · Jag kan | `år` invariant; mitt/min by the head noun; `Kinder` = cheeks (never used); copula + bare noun natural |
| da | Jeg hedder · Jeg er / år · Det er mig · Min familie · Mit yndlingsdyr / Min yndlingsmad / Min yndlingsfarve · Jeg kan | mit/min by head noun; definite forms not needed (nothing declines) |
| no | Jeg heter · Jeg er / år · Dette er meg · Familien min · Favorittdyret mitt / Favorittmaten min / Favorittfargen min · Jeg kan | postposed possessive with the DEFINITE noun; panel may prefer "Mitt favorittdyr" |
| fi | Minun nimeni on · Olen / -vuotias (`glue:true`, no space) · Minä · Minun perheeni · Lempieläimeni / Lempiruokani / Lempivärini · Osaan | "voin" = may, "osaan" = know how; possessive suffix -ni (no "minun" needed); counts as headings in partitive plural ("Sisaruksia:"); copied favourite is nominative ("Lempieläimeni on kissa" ✓) |

**Refusal rule (all faces):** a literal is missing / contains `{` / equals a bare vocab word → the FACE is refused for that locale, never padded. **Count headings (F2):** "Brothers:" style, never "I have __ brothers" (numeral-noun agreement: es hermano/hermanos, fi veli/veljeä, de 1 Bruder). **Age:** every locale except fi ships pre + post literals with a 64 px box between; fi glues `-vuotias` to the box. **Face words (F3):** vocab literals ONLY (validated), lower-cased except de. **"I can" (F4):** first-person present in every locale, ≤ 34 chars (*est.*: text column 150 px, 2 lines at 18 px). **Favourite copy-lane starter:** default heading-with-colon form everywhere; copula form allowed where a bare noun is natural (en, sv, da, no, fi).

## D. Data + gates

`data/b3/about-me.js` (generated from `i18n/.draft-b3-<loc>.json` by `apply-b3-locale.js`, the `data/b2` pattern):
```
ABOUT_ME_PICTURES (GLOBAL, locale-neutral seed):
  categories: [{id:'animal', options:[{theme:'animals',noun}] >= 8}, {id:'food', options:[{theme:'At the Supermarket'|'fruits',noun}] >= 8},
               {id:'color', options:[{color:'red'} x 8]}, {id:'toy', options:[{theme:'toys',noun}] >= 8}]
  face: {theme:'body parts', noun:'face', anchors:{hair,ear,eye,nose,mouth,eyebrow,chin: {x,y,side}}}
  actions: [{id:'swim', cue:{theme:'activities', noun:'swimming'}}, ...] >= 12
ABOUT_ME[loc] = {
  labels: {nameIs, age:{pre, post, glue}, thisIsMe, family, familyDraw, drawFace, school?, favHeading:{animal,food,color,toy},
           favStarter:{animal,food,color,toy}, countHeads:{people,brothers,sisters,pets}, tenFrameHint, canHeading, wantLearn,
           myName, friendName, oneLetterPerBox, lettersCount, firstLetter, whoHasMore:{me,friend}},
  faceWords: {eye, ear, nose, mouth, hair, eyebrow, chin}   // must === displayWord(vocab[key][loc][0], loc)
  can: {swim:'Ich kann schwimmen', run:..., ...}            // one per action id, first person
  refuse?: ['ican']                                        // explicit per-face refusal
}
```
**Validator `tools/validate-b3-draft.js` (about-me block):** (1) every option resolves via `fileUri` (throws on a missing cache entry) and has a vocab singular in the locale; colours ∈ `COLOR_WORDS[loc]`; (2) no option theme carries the localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); (3) no literal contains `{` (bare-slot poison) and `age.post` is non-empty (fi: `glue:true` and `post` starts with `-`); (4) `faceWords[k] === displayWord(vocab, loc)` for every anchor id; (5) `can[id]` present for ≥ 8 ids unless `refuse` names `ican`, `can[id] !== vocab word`, ≤ 34 chars; (6) `favHeading.*` ≤ 46 chars, `countHeads.*` end with `:` or contain no digit-word; (7) per-category option count with word ≤ 12 chars ≥ 6, else the category is dropped and logged; (8) all 11 `faceWords` sets identical in ids.

**Render gate `qa/verify-b3-about-me.js`:** 6 faces × 11 locales × d2 under a 3-line title + 150-char instruction (722); `qa/lints.js` clean; F1 tile labels `scrollWidth ≤ 96`, 6 tiles per row, unique vocabKeys; F3 bank ⇔ lanes bijection, pointer ends inside the face bbox, no label text within 20 px of a pointer end; F2 four `[data-lcs-tenframe]` with 0 dots; F5 two `[data-lcs-letterboxes="10"]`; F4 8 tiles with empty ticks; no digit glyph in the body except the card badges; every `.ws-icon` ≥ 56.

**Poison cases (each must FAIL, and its control must PASS):** P1 an F1 option `{theme:'fruits', noun:'durian'}` (not cached) → validator throws (control: `banana` passes). P2 de `favHeading.animal = 'Mein Lieblings{noun}'` → bare slot FAIL (control: `Mein Lieblingstier`). P3 de `faceWords.eye = 'Augen'` → plural ≠ singular FAIL (control `Auge`). P4 fr `can.swim = 'Natation'` → equals the vocab word FAIL (control `Je sais nager`). P5 an F1 option from `animals bw` → BW marker FAIL. P6 render: remove one bank word in F3 → bijection FAIL.

## E. SEO

Title patterns (≤ 70, no worksheet-word): base = the genre head; faces add ONE noun. en: All About Me · My Favorite Things: Circle and Write · All About My Family: Draw and Count · This Is Me: Label the Face · I Can: Tick What You Can Do · My Name: Write, Count and Compare. de: Das bin ich · Meine Lieblingssachen · Meine Familie: malen und zählen · Mein Gesicht beschriften · Ich kann das schon · Mein Name: schreiben und zählen. The other 9 panels follow this shape from the §C heads. **Meta:** `"Free printable {TITLE} … {LEVEL}. {MIDDLE}."` (README open item 1: the lead is the LIVE one); MIDDLE = the child's instruction; the base names the first week of school WITHOUT a month (pt-BR starts in February; the Aug/Sep spike is en/de/nl/es/fr/it/Nordic). **h1** = title; eyebrow = level key name; strand = §A row; JSON-LD `LearningResource`, en `educationalAlignment` only on base/F2/F5. **Non-cannibalisation:** vs K-319 (no feeling word, no face-expression choice; the F3 face is a NEUTRAL smile labelled by PART), vs G2-318 (child, not animal; no fact table), vs G2-278 (no scene, no narrative starters), vs K-284 (no traced model), vs K-225 (no picture↔word matching), vs K-321 (no month), vs `atlas-fact-files` activity (RI, not identity). Within the type: base owns the bare head; F1-F5 each own a distinct noun (favourites / family / face / I can / name) so no two titles differ by an adjective. Seasonal: the type is the one first-week page; hubs cross-link `/topic/<level>` only.

## F. Open questions

1. `letters` vs `sel`: joint decision with K-319 (default `letters`; `sel` = a §16.4 doctrine review + a two-row disc).
2. F3 anchor fractions are estimates from the 512 render; the engineer measures once and commits them in `ABOUT_ME_PICTURES.face.anchors`.
3. Favourite copy-lane form (colon heading vs copula): the panel rules per locale; the code accepts either literal.
4. nl `gezin` vs `familie` (base vs F2); no `Familien min` vs `Mitt favorittdyr` register; fi `-vuotias` glue rendering (a 0-gap flag in `ageLane`).
5. The prompt's "name tracing, EN A-tier" claim is not in `_PANEL-FINDINGS.md`; if real, it is a separate name-input generator commission, not a face.

**Summary.** K-323: K identity type, subject `letters`, theme OFF, six faces: an open profile base (W.K.2/SL.K.5) + five distinct moves, three structured against a data truth (option sets, face labels, ten-frame/letter-box counts). Every literal is panel-authored per category or action, never a slot. Family = words + drawing (no family art, m); the hand outline is refused by measurement; "I feel" and birthday month stay with K-319 / K-321. Gates: draft validator with 6 poison cases + a 66-render structural gate; 0 slug and 0 landing-head collisions measured.
