# K-323 `all-about-me` (K) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/K-323-pedagogy.md` + `_work/K-323-design.md`; every file, class, primitive and option below was read in the repo on 2026-09-14; the face and nine `activities` cues were OPENED; resolutions, removed claims, open items: `_work/K-323-critic.md`. (m) = re-measured in the shell's fonts from a `file://` origin with the real `page.css` (scratch `k323-critic-*.js`). *est.* = the engineer measures. No em-dashes.

**Boundary (load-bearing).** The child records FACTS ABOUT HIMSELF (name, age, portrait, family, favourites, face parts, abilities) in labelled slots. K-319 owns feelings (**no "I feel" item here**, its F5 rule). G2-318 owns an ANIMAL's file. G2-278 narrates a scene. K-284 traces a MODEL word (name TRACING is out of scope: it needs a name-input generator). K-321 owns month names (**no birthday month**). K-225 / K-235 match or sort pictures to words; nothing here matches or sorts.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `K-323` / `all-about-me` / **K in all six faces** (variations `K-325+ TBD by the emitter`). Counts stay <= 10 with 0 allowed; the labelling face copies from a printed bank. `default_subject: letters`, `default_age_range: 5-7`, `assetClass: icon-placement`, `exerciseType: all-about-me`. `apps['all-about-me']` and `axes['exercise-type']['all-about-me']` ABSENT (m); register with the `tools/register-b2-taxonomy.js NEW_FAMILIES` shape. |
| subject ruling | **`letters`**, aligned with K-319 (every structured face prints or elicits a WORD; base W.K.2). The `letters` disc holds 28 keys, `science` 3 (m). An `sel` 5th subject is a §16.4 doctrine review with a two-row disc (K-319 + K-323): **OPEN 1, decided jointly with K-319; default `letters`.** |
| theme axis | **OFF** (`themeAxis:{applicable:false}`); landings `coordinate.theme:''`, `coordinate.mode` = the face string, base `'base'` (README ruling). Fixed picture sets: F1 option pools from `animals` / `At the Supermarket` (+ `fruits`) / `colors` (`SWATCH` + `COLOR_WORDS`); F3 `body parts/face`; F4 `activities` + three cross-theme cues. **No family pictures exist** (59 cached themes, m; the vocab has `family mother father brother sister` but no theme pictures them): family = words + drawing. |
| fan lever | none in this batch (one instance per face per locale). Future `unitAxis` = the F1 category (`-u<animal|food|color|toy>`), additive-with-fallback. |
| CCSS (en only, honest) | base **W.K.2 + SL.K.5** · F1 none (readiness: picture-word reading) · F2 **K.CC.A.3** · F3 none (readiness: body vocabulary) · F4 none (repeated-frame emergent reading; RF.K.4 not claimed) · F5 **K.CC.B.5 + K.CC.C.6**. No CCSS SEL code. JSON-LD en only, no `targetUrl`; non-EN names the framework. |
| collisions | the 11 slugs below grepped against EVERY axis slug in every locale of `topics-taxonomy.json`: **0** (m). 11 landing corpora, 32,773 landings (title + h1 + metaTitle): **0** identity heads claimed (m). |

| loc | genre head (title root) | ASCII slug | K level key (`LEVEL_KEYS`, m) | strand on the landing (framework NAME only) |
|---|---|---|---|---|
| en | All About Me | `all-about-me` | `kindergarten` | Social-emotional learning: self-awareness; Writing |
| de | Das bin ich ("Steckbrief über mich" in meta) | `das-bin-ich` | `vorschule` | Sachunterricht: Ich und die anderen |
| es (MX) | Todo sobre mí ("ficha de presentación") | `todo-sobre-mi` | `preescolar` | SEP/NEM Educación socioemocional: autoconocimiento |
| pt (BR) | Quem sou eu ("tudo sobre mim") | `quem-sou-eu` | `educacao-infantil` | BNCC EI "O eu, o outro e o nós" |
| fr | C'est moi ("fiche de présentation", "portrait") | `c-est-moi` | `maternelle` | programme de maternelle: construire son identité |
| it | Mi presento ("carta d'identità") | `mi-presento` | `infanzia` | Indicazioni nazionali "Il sé e l'altro" |
| nl | Dit ben ik | `dit-ben-ik` | `kleuters` | SLO: oriëntatie op jezelf en de wereld |
| sv | Det här är jag [NSR] | `det-har-ar-jag` | `forskola` | Lgr22 förskoleklass: identitet, språk och kommunikation |
| da | Mig selv ("alt om mig" in meta) [NSR] | `mig-selv` | `boernehaveklasse` | Fælles Mål børnehaveklasse: engagement og fællesskab |
| no | Alt om meg [NSR] | `alt-om-meg` | `1-trinn` | LK20: folkehelse og livsmestring |
| fi | Minä itse ("tällainen minä olen") [NSR] | `mina-itse` | `esikoulu` | EOPS 2014 "Minä ja meidän yhteisömme" |

## 2 The base page

**Concept.** A framed poster the child takes home: a full-width name banner (glyphH 40), a 300 px portrait frame with token photo-corners, an age lane with one numeral box, a family draw box, three favourite windows (heading + draw zone). Every field is a labelled slot; nothing printed answers anything. Drawing before writing. NOT the G2-318 fact table (17 px labels + 28 px lanes are a G2 register).

**Chrome budget (README ruling).** Body **722** under a 3-line title + 3-line instruction; `.ws-page` 703x945, `padding 0 14` -> inner **675** (`page.css:16-26`, m). `.ws-lane` = padding 12 16 + border 2, border-box (`page.css:8, 401`, m) -> inner width **639** whatever the inline vertical padding; the design's "643" is corrected everywhere below. Slack goes to the favourites row (`minmax`).

```
y 0    nameBanner 675x84  tealSoft r14, no border, padding 10 16 -> inner 643x64
       [ My name is  Nunito 800 20 ][12][ writingRow 440x64 glyphH 40 ]         label <= 191 (m: fi 156.6)
y 96   +-- portraitFrame 300x300 --+ 15 +-- ageLane .ws-lane 360x84 (inline padding 8 16 -> inner 324x64) --+
       | white, teal 3, r16        |    | [ Eu tenho ][10][ numeral box 64x64 ][10][ anos ]  Nunito 800 20 |
       | photo-corners 22 (x4)     |    +-- 12 ----------------------------------------------------------+
       | dashed coral zone 268x252 |    +-- familyBox drawBox 360x204 -----------------------------------+
       | (inset 16)                |    | My family   14 inkSoft, top-left                                 |
       |   This is me (14, bottom) |    +-----------------------------------------------------------------+
y 408  favouriteWindow 217x220 x3, gap 12                         (row minmax(220px,1fr): 314 at 722)
       [ My favourite animal ][ My favourite food ][ My favourite colour ]   heading band 46 (2 lines of 18)
       [   draw zone 189x150 ][ ...              ][ ...                 ]   dashed coral, r12
```
Stack 84 + 12 + 300 + 12 + 220 = **628 <= 722**. Root `<div data-ws-content data-lcs-type="all-about-me">`, grid rows `84px 300px minmax(220px,1fr)`, gap 12.

- **nameBanner** = G2-318's (`name:null` eyebrow mode) + ADDITIVE options `laneW:440, glyphH:40, h:84, icon:null` (the G2-318 paw is OFF on a child's page; its `357x56 glyphH 28` default untouched). Eyebrow = `labels.nameIs` (m, 20 px: fi `Minun nimeni on` 156.6, fr 117.6, pt 114.9; cap 191). `data-lcs-name`, lane empty.
- **ageLane**: `labels.age.pre` + numeral box + `labels.age.post`; `glue:true` (fi) drops the second gap so `-vuotias` touches the box. m at 20 px: de `Ich bin` 62.5 + `Jahre alt` 80.7, pt `Eu tenho` 84.0, fi `-vuotias` 77.3; widest row 84 + 64 + 81 + 20 = 249 <= 324. **Numeral box = NEW `blankNumeralBox({w=64,h=64,key})`** (`.ws-blankbox`: white, dashed coral 2.5, r 10, `page.css:445`; stamps `data-lcs-<key>` only). NOT `answerBox` (`components.js:105`): it stamps `data-lcs-answer="undefined"` when no answer is passed (m) and its `.ws-answerbox` dashes are `grid`, not coral (`page.css:220-231`, m).
- **portraitFrame** 300 (79 mm): inner dashed zone 268x252 (`data-lcs-drawbox="portrait"`); `labels.thisIsMe` in the 32 px bottom strip (de `Das bin ich` 71.3 at 14, m). Photo-corners = 4 SVG right triangles, legs 22, `tealSoft` fill, `teal` 2 stroke (the stroke survives mono).
- **familyBox** = G1-308 `drawBox({w:360,h:204,label})` (white, dashed coral 2.5, r 12; `label` is the additive option G2-318 §2 already claims: 14 inkSoft, top-left; whichever type builds first adds it), `data-lcs-drawbox="family"`.
- **favouriteWindow** 217x220: white, 2 px teal r 12; heading band tealSoft 46, Nunito 800 18 centred, <= 2 lines (m: pt `Minha comida favorita` 189.2 wraps at the 189 inner; it 185.1; de 178.6; fi `Lempieläimeni` 124.1); draw zone 189x150 (`data-lcs-drawbox="fav-animal|fav-food|fav-color"`). Draw only: no tile, no bank (that is F1).

**Ladder** (guards key on `fields` / `favourites` / `sentenceLane` / per-face keys, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| base fields | name age portrait family | + 3 favourites | + toy window (4 x 160), + `sentenceLane:'school'` (`.ws-lane` 675x84: `labels.school` + writingRow 400x64); portrait 288 -> 712 |
| glyphH / banner h / portrait | 48 / 96 / 330 (family 330x222) | 40 / 84 / 300 | 40 / 84 / 288 |

**Answer hiding + stamps.** No child-output verify (open-ended). Structural: one empty `[data-lcs-name]`, one empty `[data-lcs-age]`, `[data-lcs-drawbox]` x5 empty, headings === bank literals, no digit, no `<img>`, no `{`. `data-lcs-face` NOT stamped (byte-identical base). `qa/lints.js`: overflow `:37-45`, footer `:50-66`, font >= 9 `:86`; root stamps `data-ws-content` (`:32`).

**Reused (exact).** `writingRow({w,h,glyphH,xHeight:true})` (`trace-path.js:681`) · `rulingBlock` (`components-b2.js:58`) · `wordBank({words,wordPx})` (`:210`) · `copyArrow()` (`:219`, 40x40) · `pillChoice({items,fontPx})` (`:226`; pill h **48** at 20 px, m) · `letterBoxes({n,box,gap})` (`:273`; 10x56 gap 6 -> **616x58**, m) · `SWATCH` (`:20`) · `tenFrame({a,cell})` (`ten-frame.js:13`; cell 56 -> **286x118**, m) · `cardGrid` (`card-grid.js:7`; gap 14) · `.ws-lane .ws-card .ws-blankbox .ws-icon .ws-bankword .ws-pill` · G2-318 `nameBanner` (+4 additive options) · G1-308 `drawBox` (+`label`) · `fileUri` (`resolve.js:33`) · `displayWord` (`b2-common.js:17`) · `COLOR_WORDS` (8 keys x11, m) · tokens, `density.K` 56 / 30 (`_tokens.js:68`, m). **NOT used:** `answerBox` (above), `heroFrame`, `factTable`, K-319 `faceTile` / `checkInCard`, `strokeWordLane`, `image-vocabulary.js` at render.

**NEW in `templates/components-b3.js`** (absent, m; HTML + inline SVG on tokens, scoped inline CSS, no `page.css` edit): `profileCard({banner, portrait, age, family, favourites, sentenceLane})` · `portraitFrame({size=300, label, corners=true})` · `favouriteWindow({w=217, h=220, heading, key})` · `blankNumeralBox({w=64, h=64, key})` · `optionTiles({options:[{key,src|color,label}], tile=100, pic=64, gap=7})` (white r 10, border 2 creamDeep; `.ws-icon` 64 or a 64 px `SWATCH` rounded rect r 12 ink 1; label Nunito 800 16; `data-lcs-opt`) · `favouriteRow({category, heading, options, glyphH=40})` · `familyFrames({cards:[{key,heading}], cell=56})` · `faceLabels({src, icon=260, anchors, laneW=200, laneH=64, glyphH=40})` · `canRow({id, src, literal, tick=56, pic=80, textW=146})` · `nameBoxes({n=10, box=56, gap=6, label=null})`.

**Alternatives.** Alt A the G2-318 card verbatim: rejected (labels 17 / lanes 28 under the K floor 40; six writes before one drawing). Alt B portrait-centred mind map: rejected (satellites ~180, the name lane loses ~300 px, pointer lines are F3's device).

**Print check (mono laser).** Portrait 300 px = 79 mm; teal 3 px ~30 % grey, dashed coral ~55 %, photo-corners keep the 2 px teal edge (tealSoft alone would vanish); `grid` 1.5 px school lines survive at 600 dpi (K-287 render). Engineer prints one d2 base, one F3, one F1: draw a face, write `orecchio` on a 200 lane, ring a 100 px tile in HB (6 px tile margin = ring reserve).

## 3 Faces 2-6

F1-F5 are CODE faces (`layout` knob + a `verify()` branch; base byte-identical, `data-lcs-face` only when declared); `tools/gate-variation-distinct.js` needs the b3 wave file + ROWS first (siblings' OPEN item). **Earns its place:** each changes what the child DOES (choose + read + copy · represent a count · label a whole · read a repeated frame · count and compare letters); none is a colouring page. **Structurally gated:** F1 (seeded option SET + copy lane), F2 (four empty frames + boxes + literal headings), F3 (bank <=> lanes bijection, the one verifiable answer), F5 (letter boxes + three empty boxes). **Open-ended (lints + structure only):** base, F4, the child's own numbers on F2 / F5. Resolved d2 configs are pairwise distinct. Card geometry (m): `.ws-card` padding 12 + border 2 -> inner = w - 28; 2-col cards 330.5 -> inner 302.

### F1 : My Favourite Things (`layout:'favourites'`, K, STRUCTURED)
**Move:** CHOOSE within a category from PICTURED options, then READ and COPY the chosen word. **Layout:** 3 x `favouriteRow` = `.ws-lane` (inline padding 8 16, inner 639) : heading Nunito 800 18 `line-height:24px` + 6 + `optionTiles` 6 x 100x110 **gap 7 = 635 <= 639** (gap 8 = 640 overflows by 1, m) + 8 + `[copyArrow 40][8][writingRow 591x64 glyphH 40]` = 639 -> inner 212, lane **232**; 3 x 232 + 2 x 12 = **720 <= 722**, rows `minmax(232px,1fr)`. Pic 64 >= K floor 56; label 16 px under the pic. Rows d2 = **animal · food · colour**; colour tiles = a 64 px `SWATCH` swatch + `COLOR_WORDS[loc][key]`. **The copy lane has NO starter** (`favStarter` dropped): the row heading `favHeading.<category>` is the only category text, a whole literal whose agreement is fixed by the CATEGORY noun (es `Mi comida favorita`, pt `Minha cor favorita`, fr `Ma couleur préférée`), never by the chosen picture; the lane opens with `copyArrow` and the child copies the tile word. **Option pools are GLOBAL and locale-neutral** (the same six pictures x11): a picture enters a category's list only if its label passes `<= 96 px at Nunito 800 16 in ALL 11 locales` (m, shell fonts): animals **33** pass (`bat hippopotamus orangutan woodpecker` fail), supermarket **58** (`can cart cereal potato toothbrush` fail), fruits 22, toys 22, vehicles 15, **colours 7 in every locale** (`pink` fails on fi `vaaleanpunainen` 128.4; the "fi pool 7" of the drafts is therefore a global 7). The pedagogue curates 8-12 K-recognisable options per category inside those ceilings; `rng.sample(options, 6)`. **d1** 2 rows (animal, colour), 4 tiles 120 / pic 88; **d3** 4 rows (+toy), tile 96, glyphH 32. **Verify:** each row exactly 6 distinct `[data-lcs-opt]`, `img.complete && naturalWidth > 0`, label === `displayWord(vocab[key][loc][0], loc)` (colour: `COLOR_WORDS`), label `scrollWidth <= 96`, no vocabKey twice on the page, no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`) in any `src`, copy lane empty, no tile pre-ringed. No "correct" tile: uniqueness = the seeded SET. **Refusal:** a category with < 6 global options drops; < 2 categories = face refused (0 expected). **Query face:** "my favorite things" · "Lieblingssachen" · "mis cosas favoritas" · "mina favoriter" · "lempiasiani".

### F2 : All About My Family (`layout:'family'`, K, K.CC.A.3, STRUCTURED COUNT)
**Move:** REPRESENT a self-known quantity (0 allowed) on a ten-frame and WRITE the numeral. **Layout:** `drawBox` 675x220 (`labels.familyDraw`, `data-lcs-drawbox="family"`) + 12 + `cardGrid 2x2` rows `minmax(214px,1fr)` -> cards 330x238 at 722; inner 302x210: row 1 `[heading 18 px, <= 2 lines, w 236][10][blankNumeralBox 56x56 data-lcs-count]` = 56, + 8 + `tenFrame({a:0, cell:56})` 286x118 centred = **182 <= 210**. Cards d2 = **people in my family · brothers · sisters · pets** (`countHeads`, heading form ending `:`; m at 18 px: de `Personen in meiner Familie:` 234.9 one line, pt 220.4). **Cell 56 = the K floor** (`density.K.minElement 56`, m): the pedagogy's cell 40 (206x86) breaks it and its 150 px cards cannot hold a 118 px frame, hence draw box 300 -> 220. **d1** 2 cards (people, pets), draw box 300; **d3** 4 cards + `pillChoice` "more brothers or sisters?" (fixed order). **Verify:** four `[data-lcs-tenframe]` with `data-lcs-a="0"` and 0 counters, four empty `[data-lcs-count]`, headings === `countHeads`, no numeral in the body except the card badges. **Refusal:** none. **Query face:** "all about my family" · "Meine Familie" · "mi familia" · "min familj" · "minun perheeni".

### F3 : This Is Me: Label the Face (`layout:'face'`, K, STRUCTURED, VERIFIABLE)
**Move:** LABEL the parts of ONE printed face from a word bank, then draw your own. **Picture:** `body parts/face` (opened: a black-haired child, neutral smile, red cheeks; ONE picture, so an anchor table is feasible). **Layout:** `wordBank({words:5, wordPx:17})` **59 high + its own `margin-bottom:10`** (`.ws-scene-banner`, m; the drafts' 50 / 54 were wrong) + 12 + `faceLabels` 674x360 (`[lanes L 200][7][icon 260][7][lanes R 200]`; 5 lanes `writingRow(200,64,40)` in `.ws-blankbox`, `data-lcs-label`) + 12 + `drawBox` 675x260 (`labels.drawFace`) = **713 <= 722**. **Anchors as fractions of the icon box** (the picture is a 512 square = the box; sharp centroids, m; editor read the picture and confirms each sits on its feature): **hair {0.50, 0.20, L}** (hair spans y 0.035-0.50; high so the line clears the brows) · **nose {0.50, 0.68, L}** (0.498/0.681) · **eye {0.655, 0.59, R}** (right pupil) · **ear {0.86, 0.64, R}** (right ear at the edge) · **mouth {0.50, 0.84, R}**; d3 **eyebrow {0.32, 0.47, L}**, **chin {0.50, 0.93, R}**. Icon at (207, 50); left lanes y 20 / 196 (hair, nose), right lanes y 0 / 148 / 296 (eye, ear, mouth); per anchor a coral dot r 5, a 2.5 px teal line to the lane's near-edge midpoint (x 200 / 474), a teal dot r 3.5; `aria-hidden`. The nose line runs left at y 227, 13 px under the left pupil (bottom 214, m). Words = vocab singular literals via `displayWord` (m x11: `hair` is plural-only in de/fr/it/fi `Haare / cheveux / capelli / hiukset`, used as-is; fr `œil` carries the ligature; `cheeks` NEVER: plural literal, and sv/da `kinder` is a false friend). Bank 17 px widths (m): `orecchio` 67, `sopracciglio` 96.5 (d3; a 7-word pt bank wraps to 108 high, d3 re-budgets). The handwriting width of `orecchio` on a 200 lane is UNKNOWN (a hand, not a font); the lane is ungraded and continues. **d1** 3 parts (eye nose mouth), lanes 300; **d3** 7 parts, glyphH 34. **Verify:** bank set <=> `[data-lcs-label]` lane set (bijection); 5 pointer ends inside the icon bbox; no label text within 20 px of an end; a sweep asserts no line crosses another anchor's 16 px disc (poison: swap eye and nose sides -> FAIL); lanes empty; `img` complete. Answer = the lane id, never text. **Refusal:** none (5 words exist x11, m). **Query face:** "label the face / parts of the face" · "Gesicht beschriften" · "partes de la cara" · "ansiktets delar" · "kasvojen osat".

### F4 : I Can (`layout:'ican'`, K, OPEN-ENDED self-report)
**Move:** READ a repeated predictable frame eight times and TICK it (the K "I can" emergent reader; LK20 livsmestring, Lgr22 "tilltro till sin egen förmåga"). **Layout:** `cardGrid 2x4` rows **`minmax(136px,1fr)`** (4 x 136 + 42 = 586): `canRow` inner 302 = `[.ws-blankbox tick 56][10][.ws-icon 80][10][literal 18 px, <= 2 lines, 146]`; + 12 + `.ws-lane` 675x**116** (inline padding 8 16: `labels.wantLearn` 24 + `rulingBlock({rows:1,w:639,h:64,glyphH:40})` 64 + the inline-SVG baseline gap 6, m) = **714 <= 722** (the design's 100 lane + 140 cards summed to 729 once the lane was measured). **Cues (opened):** run `activities/running` (a girl running) · skip `activities/jumping` (girl with rope) · ride a bike `activities/biking` (boy on a bike) · read `activities/reading` (child with a book) · swim `activities/swimming` (goggles, object cue) · play football `activities/soccer` (ball) · do a puzzle `activities/puzzle` (4-piece jigsaw) · paint `activities/painting` (palette); alternates sing / skate / ski, write my name `classroom/pencil`, tie my shoes `clothing/shoe`, brush my teeth `At the Supermarket/toothbrush` (all resolve, m). **REJECTED:** `activities/dancing` (an adult ballerina, opened), `writing` (adult), `gymnastics` (adult pose). The `can` literal is PANEL-AUTHORED per action: the vocab stores NOUNS (`Running / Laufen / Course / Juoksu`, m), never a verb. **d1** 6 cards; **d3** two tick columns (can / want to learn). **Verify:** 8 distinct `[data-lcs-action]`, `img` complete, literal === `can[id]` and !== the vocab word, ticks empty, literal <= 2 measured lines (a 3-line literal is REFUSED, never a smaller font). **Refusal:** < 8 authored `can` literals in a locale = face refused (never a vocab fallback). **Query face:** "I can" · "Ich kann schon" · "yo puedo / sé" · "jag kan" · "osaan".

### F5 : My Name (`layout:'name'`, K, K.CC.B.5 + K.CC.C.6, STRUCTURED COUNT)
**Move:** WRITE the name one letter per box, COUNT the letters, name the FIRST letter, COMPARE with a friend's name. **Layout** (lanes inline padding 8 16, inner 639; m): name lane 112 (`myName` 18 px `line-height:24` + 4 + writingRow 639x64 glyphH 40; `oneLetterPerBox` prints ONCE here) · boxes lane 78 (`letterBoxes({n:10, box:56, gap:6})` 616x58; box 56 = K floor) · two cards 330x110 (`lettersCount` / `firstLetter`: heading 18 px 2-line reserve w 232 beside `blankNumeralBox` 60x56; de `Buchstaben in meinem Namen:` 262.8 wraps to 2, m) · friend lane 112 · friend boxes 78 · compare lane **100** (`whoHasMore` 24 + 8 + `pillChoice` me | friend, pill h 48, fixed order; de `meine Freundin` pill 191.7 wide). 112 + 78 + 110 + 112 + 78 + 100 = 590 + 5 x 12 = **650 <= 722**. **d1** my name only; **d3** + "how many more" box. **Verify:** two `[data-lcs-letterboxes="10"]`, three empty boxes, pills fixed order, no model word, no numeral. Names > 10 letters continue on the lane (the literal says "first name"); not a refusal. **Boundary:** no `strokeWordLane` (K-284). **Query face:** "how many letters in my name" · "Mein Name" · "mi nombre" · "mitt namn" · "nimeni".

**Rejected non-moves.** "How do I feel" (K-319 F5) · birthday month (K-321) · **hand outline** (703 px = 186 mm -> 3.78 px/mm; a K hand ~125 mm needs ~470 px, a whole page for a motor trace; `body parts/hand` is a palm) · "me as an animal" (G2-318) · my day / routine (no art; sequencing = science-sequence) · friend-and-me grid (folded into F5) · height / weight · name tracing (needs a name input) · label my OWN drawing · colour a self-portrait · theme swap · d1/d3 relabelled.

## 4 Native rebuild plan x11

Every printed string is a whole panel literal substituted by code, never inflected. The numeral box sits INSIDE the age literal as `pre` + box + `post` (fi `glue:true`: the suffix touches the box). "This is me" is gender-free in es/pt/it. Favourite headings agree with the CATEGORY noun (favorito/a, préféré(e), de `Lieblings-` with the head's article, fi `-ni`, sv/da mitt/min, no postposed possessive). Count headings end with `:` (never "I have __ brothers": numeral-noun agreement). `can` = first-person present, <= 34 chars, no word > 146 px at 18 (m: fi `polkupyörällä` 118.5; `Osaan ajaa polkupyörällä` 217.4 = 2 lines). EN handed over as a SOURCE TO AUDIT.

| loc | name · age (pre / post) · this is me · family · favourite animal / food / colour · I can | traps |
|---|---|---|
| en | My name is · I am / years old · This is me · My family · My favourite animal / food / colour · I can | US "favorite" in titles (en = US market) |
| de | Ich heiße · Ich bin / Jahre alt · Das bin ich · Meine Familie · Mein Lieblingstier / Mein Lieblingsessen / Meine Lieblingsfarbe · Ich kann | "1 Jahr" vs "Jahre" accepted at 5-7; face words keep the capital (`Auge`, `Haare`) |
| es (MX) | Me llamo · Tengo / años · Así soy yo · Mi familia · Mi animal favorito / Mi comida favorita / Mi color favorito · Yo puedo / Sé | "Este/Esta soy yo" is gendered -> "Así soy yo"; "1 años" accepted |
| pt (BR) | Meu nome é · Eu tenho / anos · Sou eu! · Minha família · Meu animal favorito / Minha comida favorita / Minha cor favorita (cor FEMININE) · Eu sei | "Este/Esta sou eu" gendered; school year starts February (no month in meta) |
| fr | Je m'appelle · J'ai / ans · C'est moi · Ma famille · Mon animal préféré / Mon plat préféré / Ma couleur préférée · Je sais | "je peux" = permission, "je sais" = skill; `œil` in the bank (ligature) |
| it | Mi chiamo · Ho / anni · Sono io · La mia famiglia · Il mio animale preferito / Il mio cibo preferito / Il mio colore preferito · So | "Questo/Questa sono io" gendered; "1 anni" accepted |
| nl | Ik heet · Ik ben / jaar · Dit ben ik · Mijn gezin · Mijn lievelingsdier / lievelingseten / lievelingskleur · Ik kan | `jaar` invariant; gezin (household) vs familie: panel decides base vs F2 |
| sv | Jag heter · Jag är / år · Det här är jag · Min familj · Mitt favoritdjur / Min favoritmat / Min favoritfärg · Jag kan | `år` invariant; mitt/min by head noun; `kinder` never printed; no `grupp` anywhere |
| da | Jeg hedder · Jeg er / år · Det er mig · Min familie · Mit yndlingsdyr / Min yndlingsmad / Min yndlingsfarve · Jeg kan | mit/min by head noun; `lyserød` 55.8 fits a tile (pink stays out globally) |
| no | Jeg heter · Jeg er / år · Dette er meg · Familien min · Favorittdyret mitt / Favorittmaten min / Favorittfargen min · Jeg kan | postposed possessive with the DEFINITE noun; panel may prefer "Mitt favorittdyr" |
| fi | Minun nimeni on · Olen / -vuotias (`glue:true`) · Minä (Tällainen minä olen) · Minun perheeni · Lempieläimeni / Lempiruokani / Lempivärini · Osaan | "voin" = may, "osaan" = know how; -ni suffix; count headings partitive plural (`Sisaruksia:`); a copied favourite stays nominative |

**Face words (F3, m x11):** eye `eye Auge ojo olho œil occhio oog öga øje øye silmä` · ear `ear Ohr oreja orelha oreille orecchio oor öra øre øre korva` · nose `nose Nase nariz nariz nez naso neus näsa næse nese nenä` · mouth `mouth Mund boca boca bouche bocca mond mun mund munn suu` · hair `hair Haare cabello cabelo cheveux capelli haar hår hår hår hiukset`; d3 eyebrow / chin exist x11. **Refusal rule:** a literal missing / containing `{` / equal to a bare vocab word -> the FACE is refused for that locale, never padded. Panels OPEN every picture their pool keeps (`picOpened:true`); `toys/baby`, `toys/girl` are dolls, `activities/dancing` an adult: the file name is not the picture.

## 5 Data + gates

`data/b3/about-me.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (absent, m; `data/` gitignored, `git add -f`):
```
ABOUT_ME_PICTURES (GLOBAL, locale-neutral):
  categories: [{id:'animal', options:[{theme:'animals', noun, vocabKey, picOpened:true}] 8-12},
               {id:'food',   options:[{theme:'At the Supermarket'|'fruits', noun, ...}] 8-12},
               {id:'color',  options:[{color:'red'} x 7]},   // pink excluded globally (fi 128.4 px)
               {id:'toy',    options:[{theme:'toys', noun, ...}] 8-12}],
  face: {theme:'body parts', noun:'face', anchors:{hair:{x:.50,y:.20,side:'L'}, nose:{.50,.68,'L'}, eye:{.655,.59,'R'}, ear:{.86,.64,'R'}, mouth:{.50,.84,'R'}, eyebrow:{.32,.47,'L'}, chin:{.50,.93,'R'}}},
  actions: [{id:'swim', cue:{theme:'activities', noun:'swimming'}, picOpened:true}, ...] >= 12
ABOUT_ME[loc] = {
  labels: {nameIs, age:{pre, post, glue:false|true}, thisIsMe, family, familyDraw, drawFace, school,
           favHeading:{animal, food, color, toy}, countHeads:{people, brothers, sisters, pets},
           wantLearn, myName, friendName, oneLetterPerBox, lettersCount, firstLetter, whoHasMore:{me, friend}},
  faceWords: {eye, ear, nose, mouth, hair, eyebrow, chin},   // must === displayWord(vocab[key][loc][0], loc)
  can: {swim:'Ich kann schwimmen', run:'…', ...},           // one whole first-person literal per action id
  refuse: [],                                               // explicit per-face refusal, e.g. ['ican']
  strings: {'K-323':{title,instruction}, F1..F5:{title,instruction}} }
```
**`tools/validate-b3-draft.js` (about-me block; every rule runs, exit 1 on any):** (1) every option resolves via `fileUri` (throws on a missing cache entry) and has a vocab singular in ALL 11 locales; colours ∈ `COLOR_WORDS`; noun ∉ `B2_EXCLUDE`; `picOpened:true`; (2) no option theme carries the localized B&W marker; (3) no literal contains `{`; `age.post` non-empty; fi `glue:true` and `post` starts with `-`; (4) `faceWords[k] === displayWord(vocab[k][loc][0], loc)` for every anchor id; the 11 id sets identical; (5) `can[id]` present for >= 8 ids unless `refuse` names `ican`; `can[id] !== vocab word`; <= 34 chars; (6) `favHeading.*` <= 46 chars; `countHeads.*` end with `:` and carry no digit; (7) **global pool gate**: a category's option enters only if its label measures <= 96 px at Nunito 800 16 in ALL 11 locales (the shell fonts via the render pipeline, never a bare page); per category >= 6 survivors, else the category drops (logged); (8) titles <= 70, no worksheet-word, unique in band; instruction <= 150.

**`qa/verify-b3-about-me.js`:** renders 6 faces x 11 locales x d2 under a 3-line title + 150-char instruction (the 722 floor); `qa/lints.js` clean; F1 6 tiles per row, labels `scrollWidth <= 96`, unique vocabKeys, tile row `scrollWidth <= 639`; F3 bank <=> lanes bijection, pointer ends inside the icon bbox, no crossing of another anchor's disc, no label within 20 px of an end; F2 four `[data-lcs-tenframe]` with 0 counters + four empty `[data-lcs-count]`; F4 8 empty ticks, literals <= 2 lines; F5 two `[data-lcs-letterboxes="10"]`; no digit glyph in the body except badges; every `.ws-icon` >= 56; favourite headings and count headings <= 2 measured lines; no `data-lcs-answer` attribute anywhere on the type.

**Poison (each must FAIL; the correct draft is the control):** P1 option `{theme:'fruits', noun:'durian'}` (not cached) -> validator throws (control `banana`). P2 de `favHeading.animal = 'Mein Lieblings{noun}'` -> bare slot (control `Mein Lieblingstier`). P3 de `faceWords.eye = 'Augen'` -> plural ≠ singular (control `Auge`). P4 fr `can.swim = 'Natation'` -> equals the vocab word (control `Je sais nager`). P5 an option from `animals bw` -> B&W marker. P6 render: remove one F3 bank word -> bijection FAIL. P7 `colors` with `pink` -> the fi label 128.4 > 96 fails the GLOBAL gate. P8 F1 `optionTiles gap:8` -> row 640 > 639 overflow lint. P9 F2 `cell:40` -> `.ws-icon`/cell floor 56 FAIL. P10 F3 anchors eye and nose sides swapped -> crossing sweep FAIL. P11 a fi `can` literal of 3 measured lines -> FAIL. P12 the design's F4 lane 100 + cards 140 under 3-line chrome -> footer lint (729 > 722). P13 `answerBox({w:64,h:64})` in the age lane -> `data-lcs-answer="undefined"` present -> FAIL.

**Page reads:** `data/b3/about-me.js[loc]`, `ABOUT_ME_PICTURES`, `fileUri`, `COLOR_WORDS`; never `image-vocabulary.js` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "All About Me" · "Das bin ich" / "Todo sobre mí" / "Det här är jag" · "Minä itse" | Write your name and age, draw yourself and your family, and draw your three favourite things | `{type:'all-about-me', mode:'base', theme:'', level:<K key>}` |
| F1 | "My Favorite Things: Circle and Write" · "Meine Lieblingssachen" / "Mis cosas favoritas" / "Mina favoriter" · "Lempiasiani" | In each row circle your favourite picture and copy its word onto the line | `mode:'favourites'` |
| F2 | "All About My Family: Draw and Count" · "Meine Familie: malen und zählen" / "Mi familia: dibuja y cuenta" / "Min familj: rita och räkna" · "Minun perheeni" | Draw your family, then show how many people, brothers, sisters and pets on the ten-frames and write the number | `mode:'family'` |
| F3 | "This Is Me: Label the Face" · "Mein Gesicht beschriften" / "Las partes de la cara" / "Ansiktets delar" · "Kasvojen osat" | Copy each word from the bank onto the line that points to that part of the face, then draw your own face | `mode:'face'` |
| F4 | "I Can: Tick What You Can Do" · "Ich kann das schon" / "Yo puedo" / "Jag kan" · "Osaan jo" | Read each sentence, tick the things you can do, and write one thing you want to learn | `mode:'ican'` |
| F5 | "My Name: Write, Count and Compare" · "Mein Name: schreiben und zählen" / "Mi nombre: escribe y cuenta" / "Mitt namn" · "Nimeni" | Write your name one letter per box, count the letters, then do the same for a friend and circle who has more | `mode:'name'` |

All six at the K level key (§1). Titles <= 70, no worksheet-word, unique per band; the base owns the bare head, each face adds ONE noun, never an adjective. h1 = title; eyebrow = level label; strand per §1 (framework NAME only). JSON-LD `LearningResource`, `educationalAlignment.targetName` en only (base W.K.2, F2 K.CC.A.3, F5 K.CC.B.5; none on F1 / F3 / F4), no `targetUrl`. `topicMeta['all-about-me']` + `skill-sentences.en.json` via `tools/register-b3-en-content.js` (absent). The base names the first week of school WITHOUT a month (pt-BR starts in February). Meta lead inherits `seo.words.free_printable` (README open item 1).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F1 / F2 | draw your favourites vs circle a picture + copy the word / ten-frames + a numeral | 0.30 / 0.25 |
| F3 vs F5 · F4 vs any | a printed face + a word bank vs your own name in letter boxes · sentences to tick | 0.15 · 0.20 |
| F3 vs K-319 (feelings) | face PARTS from a bank vs a feeling read off an expression; the F3 face is a neutral smile | 0.15 |
| base vs G2-318 (animal fact file) | the child vs an animal; no fact table, no six fields | 0.10 |
| base / F4 vs G2-278 (picture writing) | no scene, no story starters; "I can" frames vs "One day," | 0.10 |
| F5 vs K-284 (word tracing) | letter boxes + counting, no traced model | 0.10 |
| F1 vs K-225 (word-picture match) | six pictures of ONE category to choose from and copy vs matching pairs | 0.15 |
| F2 vs counting-frames family | an empty frame the child fills with a self-known count vs printed dots to count | 0.20 |

Boundary sentence on every landing: "The child records facts about HIMSELF: no feelings, no animal, no story, no traced model."

## 7 Hub visibility contract

A face appears under `all-about-me` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps['all-about-me'] = {default_subject:'letters', default_age_range:'5-7', exercise_type_axis_key:'all-about-me'}` exists in `frontend/config/topics-taxonomy.json` (ABSENT, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['all-about-me']` has `slug` + `name` in all 11 locales (§1 slugs, 0 collisions against every axis slug, m); (3) exactly one landing per face per locale with `coordinate.type === 'all-about-me'` verbatim, the K level key of §1, `coordinate.mode` = the face string (base `'base'`), `coordinate.theme:''`, a unique slug, `canonicalDeckSlug` = the published deck; a face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=all-about-me`. Script absent (m); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps['all-about-me']` lands.

**Expected rows per locale:** 6 in every locale x 11 = **66**. No refusal is measured today: every base / F1 / F2 / F3 / F5 literal is a panel string with a measured cap; the F3 words exist x11 (m); F1 pools clear the global gate with 33 / 58 / 7 candidates. Contingent reductions, each recorded in the draft before the wave: F4 in any locale whose panel authors < 8 `can` literals (est. 0); F1 in a locale where a curated category falls under 6 global options (est. 0, the ceilings are 33 / 58 / 7).
