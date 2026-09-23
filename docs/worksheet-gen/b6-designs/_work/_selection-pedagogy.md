# nt5-F (b6) - PEDAGOGY PANEL (K-3, 11 curricula) - 2026-09-23

Types LOCKED by the operator (not re-selected here): `cursive-writing` · `story-sequencing` · `healthy-habits` · `habitats` · `sink-or-float`. This file designs their pedagogy: teaching point per locale, boundary, six faces, refusals, traps.

Read: `b5-designs/_STUDIO-BRIEF.md` · `b5-designs/_SUBSTRATE.md` · `b5-designs/_work/_selection-pedagogy.md` (format reproduced) · `b6-designs/_records/candidate-seeds.json`.

## Measured 2026-09-23 (read-only; node over `cache/manifest.json`, sharp contact sheets of `cache/themes-512/`)

**Neighbours opened (what they actually do):**
- `types/g1/G1-204-sink-float.js` = `makeScienceCategorySort`, exerciseType `science-sort`, **slug `sink-or-float`**, bank `data/science/sink-vs-float.json`: strip of 12 pictures over two word bins Float/Sink ("draw a line to the group you think"). Items: boat duck ball apple leaf feather | rock key spoon scissors hammer fork. ⚠ The bank's sink spoon is `kitchen tools/spoon` = a **purple PLASTIC spoon** (opened) - its outcome depends on the plastic (PP floats, PS sinks): an ambiguous item in a LIVE deck. ⚠ `animals/duck` is a living animal (floats by behaviour/air in feathers, not by material). Recorded for the build session; not fixed here (read-only brief).
- `types/g1/G1-202-land-water-air.js` = science-sort, **slug `where-animals-live`**, bins land/water/air (18 items; bank note "classify by habitat not biology"; puts eagle, parrot, bee, butterfly, flamingo in **"air"**). `data/b3/animal-facts.json` (55 animals, G2-318 animal-fact-file) uses the same land/water/air `habitat` field (penguin = water, owl = air). Neither is an ecological habitat.
- `types/k/K-203-healthy-food.js` (science-sort, healthy/not-healthy FOODS) · `types/g1/G1-207-food-groups.js` (4 food-group bins).
- `types/_shared/science-sequence.js` + `G1-203-chicken-life-cycle.js`: N library pictures scrambled, write 1..N in dashed boxes (egg, chick, hen). b5 adds life cycles G1-377/388/389/390, G2-365/366, G3-393 and **K-374 "Crossing the Road Safely: the Steps"** (road-safety family, 4 cards write 1-4).
- Tracing: K-238 letter-tracing (CAPITALS only, `data/tracing/letter-sets.js`; its header says "fr note: cursive is the French school hand"), K-278 lowercase-letter-tracing (+5), K-284 word-tracing (+6), pre-writing. `_SUBSTRATE.md`: "`data/tracing/letter-strokes.js` ... **NO cursive**". Fonts vendored: Baloo 2 + Nunito only (`assets/fonts/pull-fonts.js`); no script font in the repo.
- `G2-343 who-am-i-mystery-animal` (animal-fact-file F6) already owns animal RIDDLES; `G2-342` compare two animals.
- b5 families now live and bordering: road-safety K-369 (+K-373/374, G1-384, G2-360/361), family K-370, plants K-376/G1-376/388/G2-363/364/G3-392, animal-life-cycles, earth-and-space, human-body K-354 (+4), five-senses K-355 (+5), feelings K-319 (+5), all-about-me K-323 (+5), read-and-do G1-308 (+5 incl. G1-340 first-second-between), reading-comprehension G2-254 (+5 text stories), `data/science/` has NO hygiene bank.
- Reusable primitives (headers read): `road-pictogram.js` (faceless walker silhouettes, 7 poses) · `family-figure.js` (busts, age/sex rules) · `body-figure.js` · `life-stage.js` · `plant-figure.js` · `island-map.js`.

**Playwrite (OFL-1.1, TypeTogether; list from github.com/TypeTogether/Playwrite, fetched 2026-09-23):** AR · AT · AU NSW/QLD/SA/TAS/VIC · BE VLG/WAL · **BR** · CA · CL · CO · CU · CZ · **DK Loopet / DK Uloopet** · **GB J / GB S** · **FR Moderne / FR Trad** · **DE Grund / DE LA / DE SAS / DE VA** · HR · HU · IS · IN · ID · IE · **IT Trad / IT Moderna** · **MX** · **NL** · NZ · NG · **NO** · PE · PL · PT · RO · SK · ZA · **ES / ES Deco** · TZ · **US Modern / US Trad** · VN. **No SE, no FI.** Glyph coverage of each face (ä ö ü ß ñ ç é è ã õ æ ø å) = UNKNOWN - engineer must measure in a real render. Adding a font asset is an operator-approval item (§5 "no additions without explicit operator approval").

**Pictures (manifest join; `*` = file without vocab key; OPENED = seen on a contact sheet this session):**

| need | exists (path) | absent |
|---|---|---|
| hygiene | `around the house/toothbrush` OPENED ✓ · `around the house/toothpaste` · `around the house/comb` OPENED ✓ (orange comb) · `around the house/shampoo` OPENED (a PUMP bottle, reads as liquid soap, vocab says shampoo) · `around the house/bathtub` OPENED ✓ · `around the house/sink` OPENED ✓ (bathroom basin) · `around the house/faucet` OPENED ✓ · `around the house/toilet` · `toilet_paper*` · `hospital/tissue` OPENED ✓ (box with a red cross) · `hospital/bandage` · `beach/sunscreen` OPENED ✓ · `accessories|beach/sunglasses` · `clothing/hat`, `sun_hat*` | soap, towel, shower, hairbrush (`around the house/brush` OPENED = PAINT brush), helmet, nail clipper; `accessories/mask` OPENED = carved carnival mask (not a face mask) |
| sleep | `around the house|furniture/bed` · `around the house/pillow` · `clothing/pajamas` OPENED ✓ · `around the house|classroom/clock` · `alarm_clock*` | |
| exercise / rest (PEOPLE doing actions) | `activities/running` OPENED ✓ (girl running) · `activities/reading` OPENED ✓ (girl reading) · jumping dancing hiking biking skating soccer basketball football tennis skiing gymnastics (b3 G2-317 accepted running reading jumping dancing hiking writing baking as ACTIONS; swimming/singing/painting/playground are OBJECTS) · `activities/puzzle`, `chess` | |
| drink | `kitchen tools|around the house/glass` · `kitchen tools/cup` | `beach/water` OPENED = a plastic water BOTTLE (never "water") |
| animal homes | `spring/nest` OPENED ✓ (nest with two chicks) · `spring/birdhouse` OPENED (man-made nest box) · `winter/igloo` OPENED (a HUMAN home) · `forest creatures/beaver` OPENED ✓ · `beach/seashell` OPENED ✓ | hive/beehive, web, burrow, anthill, den, cave, lodge, dam, kennel, stable, barn, shell-on-snail as a home |
| habitat scenery | `camping/forest` OPENED ✓ (a small wood) · `camping/mountain` `lake` `river` · `beach/island` OPENED ✓ · `ocean life/coral` OPENED ✓ `seaweed` · `pine_tree*` `palm_tree*` | ocean/sea scene, desert, cactus, arctic ice, pond, savanna, rainforest |
| float (plain tap water, opened) | `toys/ball` = football ✓ · `camping/log` ✓ · `fruits/apple` ✓ · `fruits/orange` (whole, peel on) ✓ · `miscellaneous/leaf` ✓ · `easter/feather` ✓ · `camping/pinecone` ✓ · `toys/boat` ✓ · `toys/balloon` ✓ · `christmas/candle` (wax) ✓ · `classroom/pencil` (wood) ✓ · `toys/blocks` (wooden) ✓ · `around the house/spoon` = WOODEN spoon ✓ · `kitchen tools/sponge` ✓ (dry) | cork, rubber duck, plastic bottle, paperclip, coin, marble, ice cube (`winter/ice` = cracked pool, ruled unusable) |
| sink (opened) | `beach/rock` ✓ · `around the house/key` ✓ · `tools/hammer` ✓ · `classroom/scissors` ✓ (steel blades) · `kitchen tools/fork` (metal + plastic handle; sinks, flag) · `vegetables/potato` ✓ · `beach/seashell` ✓ · `tools/nail` (= spike, steel) | coin, marble, paperclip |
| EXCLUDE for sink/float (opened) | `kitchen tools/spoon` (plastic, ambiguous) · `fruits/coconut` (a HALF shell) · `fruits/watermelon` (a slice) · `At the Supermarket/egg` (a CARTON of 3 - the carton floats) · `vegetables/carrot` (varies) · `beach/water` (sealed bottle) · `classroom/crayon` (Crayola wax + filler sinks) · `lego` (trapped air) · any living animal · glass/cup/bowl/plate (floats empty, sinks filled: a SHAPE item, only on the shape face) | |
| story panels | `winter/snowman` OPENED (final state only) · `toys/blocks` · `At the Supermarket|thanksgivinng/bread` · `breakfast/cheese` `butter`(=cheese art) · `bakery/cake` | every intermediate STATE of any object (the library draws one state per noun) |

Scale: Pedagogy 5 = named routine in ≥9 curricula · 4 = real unit in most · 3 = thin/above band in several · 2 = refused in ≥4. Bands per the brief's table (Nordic +1). "Readiness" = no honest code at that grade.

---

## 1 `cursive-writing` - joined handwriting in the locale's OWN school script (base G2; G1/G3 faces) - Pedagogy 5 (9 locales), REFUSED sv + fi

### A. Teaching point + taught script (the per-locale matrix)

| loc | anchor + band | school script actually taught | still taught K-3 today? | Playwrite match | verdict |
|---|---|---|---|---|---|
| en | No CCSS code (CCSS 2010 dropped cursive); ~20+ US states re-mandate it by statute, e.g. California AB 446 (2023, grades 1-6), Texas TEKS (cursive from G2, cursive writing G3). Band **G2-G3**. | Zaner-Bloser style (trad) or D'Nealian (modern slant); state/district choice | yes, state-dependent; the landing says so | **US Trad** (Zaner-Bloser-like) default; US Modern = D'Nealian-like (unitAxis option) | BUILD. CCSS-honest: no CCSS code on any face |
| de | Lehrplan Deutsch Kl. 1-2 "eine verbundene Schrift", KMK Bildungsstandards Primarstufe "eine gut lesbare, flüssige Handschrift". Druckschrift Kl. 1, verbundene Schrift **Kl. 2** (Land-dependent). | per Bundesland: **VA** Vereinfachte Ausgangsschrift (most western Länder), **LA** Lateinische Ausgangsschrift (Bayern still lists it), **SAS** Schulausgangsschrift (eastern Länder); **Grundschrift** (Hamburg + others) is an UNJOINED print base with optional joins, i.e. NOT a Schreibschrift | yes | DE VA · DE LA · DE SAS (exact); DE Grund exists but is not cursive | BUILD with the script as the **unitAxis** (units `va`, `la`, `sas`; default `va`). Grundschrift is NOT a unit of this type (it is print); the harvest heads "lateinische / vereinfachte ausgangsschrift" confirm the fan |
| es (MX) | SEP/NEM (campo formativo Lenguajes) does not mandate a script; SEP texts use **letra script** in 1º; many schools (esp. private) teach **letra cursiva / ligada** from 1º-3º. Band **2º-3º** (G2). | letra cursiva mexicana (school-specific models) | partly (school-dependent) | **MX** | BUILD; the landing states it is school-dependent (panel wording). UNKNOWN: an exact NEM clause - panel must confirm or omit |
| pt (BR) | **BNCC EF01LP11** "Conhecer, diferenciar e relacionar letras em formato imprensa e cursiva, maiúsculas e minúsculas" (1º ano; panel verifies code text); letra cursiva taught **1º-2º ano**. | letra cursiva escolar brasileira | yes | **BR** | BUILD; base band G1 in pt (re-target of band, data only) |
| fr | Programme maternelle GS "commencer à écrire en écriture cursive"; cycle 2 (CP-CE1) cursive is THE school hand, capitals cursive consolidated CE1. Band **GS-CP** (K-G1). | modèle d'écriture cursive of the Ministère (the 2013-era "Guide" model), "cursive attachée" | yes, strongly | **FR Moderne** (panel verifies it matches the ministry model; FR Trad = older loop model) | BUILD; base band G1 (CP) in fr |
| it | Indicazioni nazionali italiano (fine classe terza: scrivere in modo leggibile) - practice: stampato maiuscolo → stampato minuscolo → **corsivo** in **classe prima** (2nd quadrimestre) / seconda. | corsivo scolastico | yes | **IT Moderna** (IT Trad older) | BUILD; base band G1 in it |
| nl | SLO kerndoel 10/11 (schrijven) + tussendoelen "leesbaar, vloeiend handschrift"; **verbonden schrift** ("lopend schrift") from **groep 3** (methods: Pennenstreken, Schrijven in de basisschool, Klinkers); a minority of schools now teach blokschrift only | method-dependent (with or without lusletters) | mostly yes | **NL** (panel checks against the dominant method's letterforms) | BUILD; the landing names "verbonden schrift" |
| sv | Lgr22 svenska åk 1-3 centralt innehåll: "handstil" / att skriva för hand (no joined-script requirement); **skrivstil** left the curriculum decades ago and is taught only by individual teachers | none standard | NO (not a curriculum item) | **none (no Playwrite SE)** | **REFUSE the whole type in sv** (6 faces). Faking with Playwrite DK/NO would print another country's school hand |
| da | Fælles Mål dansk (skriftsprogsudvikling / håndskrift): **sammenhængende skrift** ("formskrift") after stavskrift, typically **2.-3. klasse** | sammenhængende skrift, school chooses with or without loops | yes | **DK Uloopet** (no loops) default, DK Loopet as the second unit | BUILD; loops = unitAxis (panel decides the default) |
| no | LK20 norsk, kompetansemål etter 4. trinn: "skrive ... med sammenhengende og funksjonell håndskrift"; stavskrift → **løkkeskrift/sammenhengende skrift** at **3.-4. trinn** (= G2-G3 with the +1 shift) | sammenhengende skrift (løkkeskrift tradition) | yes | **NO** | BUILD; base band G2 (3. trinn) |
| fi | **OPS 2014 (in force from autumn 2016): kaunokirjoitus (joined script) is no longer a required content**; schools teach **tekstaus** (print letters) and keyboard skills, and the child develops an individual, fluent hand ("oma käsiala"). No national joined model is taught | none standard | NO | **none (no Playwrite FI)** | **REFUSE the whole type in fi** (6 faces) |

Result: 9 locales × 6 faces; sv + fi = 0 rows each (hub expectation 0), recorded as type-level refusals with the reason.

### B. Boundary
Must not duplicate K-238 letter-tracing (print CAPITALS), K-278 lowercase-letter-tracing (print lowercase with stroke arrows from `letter-strokes.js`), K-284 word-tracing (+6 print words), pre-writing (patterns), sight-words (see-trace-write). **Cursive-writing owns the JOINED hand**: joined letterforms, the ENTRY and EXIT strokes, the letter-to-letter CONNECTIONS, cursive capitals, and READING cursive. Every face shows the locale's school script (a font), never Nunito, and never presents a print form as the model.

### C. Six faces (script = unitAxis; the child always writes with a pencil on the locale's own ruling)

| # | face (query) | teaching move | what is on the page | band | distinct because | answer model |
|---|---|---|---|---|---|---|
| base | **cursive letters** ("cursive letters worksheet", de "Schreibschrift üben", fr "écriture cursive lettres") | form the lowercase joined letters, grouped by STROKE FAMILY (e.g. en c-a-d-g-o-q "round", i-t-u-w "undercurve", de VA Bogen / Wellen groups; family lists are panel data per script) | 4 letter rows: per row one letter model (school-ruling size) + 3 grey trace copies joined as a chain "a a a" + an empty stretch to write 3 more | G2 (G1 fr pt it) | the only type drawing joined lowercase | open-ended template (no verify beyond layout) |
| F2 | **cursive capital letters** (de "Großbuchstaben Schreibschrift", pt "letra cursiva maiúscula") | form the cursive capitals and join a capital to the following lowercase (e.g. "Aa", "Anna") | 4 rows: capital model + trace 2 + a capital-initial NAME/word from the locale's own names bank (`data/b2/sentences.js names`, 8 per locale) to trace then write | G2-G3 (fr CE1, it seconda) | capitals are a separate letter set and a separate lesson in every script | open |
| F3 | **cursive letter connections** (de "Buchstabenverbindungen", fr "les liaisons", nl "verbindingen") | practise the HARD joins: the top joins out of o, b, v, w, r and the joins into e, s, a (per-script list from the panel; LA joins differ from VA) | 6 two-letter pairs, each model + 2 traces + 2 writes ("ol ol", "br br", "we we") | G2 | a join is a skill neither letter owns; no other face drills it | open |
| F4 | **cursive words** ("cursive words", es "palabras en letra cursiva") | write whole words in one movement (lift the pencil only for dots, crosses, accents at the END) | 4-5 picture words (library picture + cursive model + trace + write); words from the locale's own vocab singulars, capitalised nouns for de | G2 | whole-word fluency and the "dots last" rule | open |
| F5 | **reading cursive** ("reading cursive worksheet", de "Schreibschrift lesen") | READ the joined hand: match each cursive word to its picture | 6 cursive words (left, font) ↔ 6 pictures (right) in `.ws-match`, draw lines | G2 | reading, not writing; the only CLOSED face (one correct pairing; verify re-derives from stamps) | closed |
| F6 | **copy a sentence in cursive** (de "Abschreibtext Schreibschrift", fr "copie en cursive") | copy a short printed sentence (Nunito print on top) into cursive on the lines below: print-to-cursive transfer | 3 sentences of 4-6 words (panel-authored, K-3 vocabulary, capitals + full stop), each followed by 2 writing rows | G3 (G2 fr it pt) | the transfer from print to joined hand, with capitals and punctuation | open |

Rejected as faces: "trace the alphabet a-z on one page" (duplicates base at lower quality, 26 cramped rows) · "cursive numbers" (no school teaches cursive numerals) · "Grundschrift" (print).

### D. Per-locale refusals / re-targets
- **sv: whole type refused** (not in Lgr22; no Playwrite SE). **fi: whole type refused** (OPS 2014 removed kaunokirjoitus; no Playwrite FI).
- de: unitAxis `va|la|sas`, never mixed on one page; the landing names the script in its title (heads "vereinfachte ausgangsschrift", "lateinische ausgangsschrift").
- en: unitAxis `us-trad|us-modern` optional; if only one ships, Trad.
- da: unitAxis `uloopet|loopet` (panel picks default).
- es-MX: landing says "en muchas escuelas"; F2 capitals: panel confirms Mexican cursive capitals are taught, else F2 refused in es.
- fr: F2 capitals at CE1; base at CP. it: F2 panel checks whether corsivo maiuscolo is actually taught (many schools keep stampato maiuscolo for capitals) - if not, **F2 refused in it**.
- Band per locale is DATA (fr/it/pt base G1; en/de/nl/da/no base G2).

### E. Traps + quality rule
- ⚠⚠ **Ruling is part of the script.** de Lineatur (Klasse 1-4 widths; 4 lines: Oberlänge, Mittelband, Unterlänge), fr **Seyès** (1 thick + 3 thin interlines per row), it "rigatura di seconda/terza", nl/da/no 3-4 line systems, US 3-line with dashed midline. The existing `rulingBlock` is 3 lines (base, dotted mid, top) - a per-locale ruling table is data, and the font is sized from MEASURED Playwrite metrics (x-height = the Mittelband) added to `primitives/font-metrics.json`, never a derived factor.
- ⚠ **No stroke-order arrows**: `letter-strokes.js` has no cursive; a font gives outlines, not strokes. Tracing = the model in `grid`/`inkSoft` tone at full size; never promise arrows or dashed hollows (CSS cannot dash a text stroke).
- ⚠ **Joins come from the font's contextual alternates** (`calt`/`liga` ON, `letter-spacing:0`, no `text-transform`, no per-letter spans that break shaping). A single letter and the same letter inside a word have different entry/exit strokes: the model must be rendered as a WORD/chain, never as concatenated single glyphs.
- ⚠ Playwrite's default size is huge ascenders/small x-height; at 9 px floor nothing is legible. Minimum x-height for trace rows: G1 ≥ 12 px, G2 ≥ 10 px (UNKNOWN in px of font size until measured).
- ⚠ de nouns keep capitals in words (F4); fr/es/pt/it accents are written AFTER the word, like i-dots.
- ⚠ Never mix two scripts on one page (a de VA page with an LA "r").
- **Quality rule:** a page is correct only if a teacher of that country would recognise the letterforms as HER school script; each locale panel must sign the script choice against its school model, and a locale with no matching script is refused, never approximated.

---

## 2 `story-sequencing` - order picture-story panels and retell (base K; G1/G2 faces) - Pedagogy 5

### A. Teaching point

| loc | anchor + band |
|---|---|
| en | **RL.K.2** retell familiar stories with key details; **W.K.3** narrate events in the order they occurred; **RL.1.2**; **W.1.3** use temporal words (first, next, then, last); **RL.2.5** beginning, middle, end. Band K-G2 |
| de | Deutsch Kl. 1-2 "Bildergeschichten ordnen und mündlich erzählen", Kl. 2-3 "zu einer Bildergeschichte schreiben" (the canonical early Aufsatz genre; Lehrplan "Texte verfassen", KMK "Sprechen und Zuhören"). Vorschule: "Reihenfolge" |
| es (MX) | Preescolar and 1º-2º: "secuencias temporales", "ordenar imágenes de un cuento y narrarlo" (NEM campo Lenguajes); very strong in preescolar |
| pt (BR) | BNCC Educação Infantil **EI03EF04** "Recontar histórias ouvidas..." (panel verifies text); EF 1º-2º oralidade/produção "relato ... em sequência" (panel cites the EF code; UNKNOWN here) |
| fr | Maternelle "raconter une histoire en s'aidant d'images séquentielles"; cycle 2 "remettre dans l'ordre les images d'une histoire", "les connecteurs temporels" |
| it | Classe prima-seconda "sequenze temporali", "riordinare le sequenze di una storia e raccontarla" (Indicazioni: ascolto e parlato, scrittura) |
| nl | Kleuters/groep 3 "plaatjes op volgorde leggen en vertellen" (SLO kerndoel 1-3 mondelinge taal); groep 4 "verhaalopbouw begin-midden-eind" |
| sv | Lgr22 svenska åk 1-3: berättande texters uppbyggnad (inledning, händelseförlopp, avslutning) and muntligt berätta (panel quotes; never in metadata); förskoleklass "berätta i ordning" |
| da | Fælles Mål dansk 0.-2. kl: "fortælle ... i rækkefølge", "billedserier" |
| no | LK20 norsk etter 2. trinn: "fortelle ... sammenhengende om egne opplevelser"/"lytte til og samtale om fortellinger" (panel quotes) |
| fi | OPS 2014 äidinkieli 1-2: "kertominen kuvasarjan avulla", tapahtumien järjestys |

No refusal expected: sequencing + retelling is universal.

### B. Boundary
Must not duplicate: G1-203 + all life-cycle faces (science sequences: growth/biology), G1-388 plant life cycle, K-374 crossing-the-road steps and a future hand-washing procedure (healthy-habits F2, PROCEDURE), days-and-months ordering, reading-comprehension G2-254 (+5, TEXT stories), read-and-do G1-340 (ordinal positions). **Story-sequencing owns NARRATIVE order from pictures**: a small everyday story with a beginning, a middle and an end (often a twist), the temporal words, predicting the next event, and oral/written RETELLING. No biology (growth, hatching, melting) and no safety procedure.

### C. Art decision (the load-bearing call)
The library draws ONE state per noun, so no object-picture set can show an object CHANGING. **Decision: a NEW palette-only primitive `primitives/story-panel.js`** drawing each panel as a small flat composition (same language as `road-pictogram.js`: teal outline 3 px, token fills, no faces or faceless walker silhouettes via `glyphGroup`), 12-16 stories in `data/b6/stories.js`, each 3-5 panels, **one story = one art source** (never mix a glossy library picture into a drawn story - the life-stage precedent). Library pictures are allowed only on the retell/writing faces as a small title badge.

Candidate stories (order determinable from VISIBLE ACCUMULATION or DEPLETION; no reversible states; no two panels with the same state; a twist ending only when its cause is visible in the previous panel):
1. Snowman: small snowball → two balls → three balls → hat + carrot nose (+ d3: sun, half melted = ⚠ melting is science, EXCLUDE the 5th panel).
2. Block tower: 1 → 3 → 5 blocks → a ball hits it, blocks scattered.
3. Balloon: flat → half-blown → full, tied → popped (fragments).
4. Sandcastle: bucket full of sand → bucket upside down → castle → wave washes half away.
5. Birthday cake: plain cake → candles in → candles lit → blown out (smoke) → one slice missing.
6. Sandwich (operator's example): bread slice → spread → + cheese + top slice → bitten.
7. Drawing: blank paper → circle → face → coloured face on the wall.
8. Pizza: dough → sauce → toppings → cut, one slice gone.
9. Apple snack: whole apple → one bite → half eaten → core in the bin.
10. Paper aeroplane: flat sheet → folded once → plane → flying over a line.
11. Letter to a friend: blank card → drawn/written → in an envelope → in the mailbox (`around the house/mailbox` exists, but it stays drawn to keep one art source).
12. Puddle jump: dry boots → rain from a cloud → puddle → splash (walker `walking` pose). ⚠ No growth, no weather cycle claim; the rain→puddle link is visible cause.
EXCLUDED: juice glass full/empty (pouring and drinking make the order reversible), getting dressed (several legal orders), planting a seed (science, plants own it), ice cream melting (science), any story needing a face/emotion to read.

### Six faces

| # | face (query) | move | page | band | distinct because | answer |
|---|---|---|---|---|---|---|
| base | **story sequencing** (bare head; de "Bildergeschichte ordnen", es "secuencias temporales") | order 4 panels | 2 stories × 4 scrambled panels (never already in order), dashed numeral box under each, write 1-4 | K | the genre | closed (one order per story) |
| F2 | **first, next, last** (en "first next then last", fr "avant après", nl "eerst dan") | 3-step order with the temporal words | 3 stories × 3 panels in a row; under each panel the 3 word chips first/next/last (locale literals), circle one per panel | K | temporal VOCABULARY, 3 steps, word chips, no numerals | closed |
| F3 | **what happens next?** (en "what happens next worksheet", es "qué pasa después") | predict the ending from 3 ordered panels | 3 stories: 3 panels in order + 3 choice panels for the 4th (1 correct, 2 from other stories/drawn states), circle one | G1 | prediction/inference, panels already ordered | closed (distractors never plausible next states of THIS story) |
| F4 | **beginning, middle, end** (en "beginning middle end", de "Anfang Mitte Schluss") | complete the missing middle | 2 stories: first and last panel given, empty middle frame to DRAW; row labels beginning / middle / end | G1 | story structure; the child produces the middle | open (drawing) |
| F5 | **sequencing sentences** (en "sequencing sentences", pt "ordenar frases da história") | read and match: 4 panels in order ↔ 4 short sentences, scrambled | one story; 4 panels left, 4 sentences right (each begins with a temporal word: First/Then/Next/At the end, panel literals), draw lines | G1 | reading; the sentence carries the order word | closed (one sentence per panel; panel checks no sentence fits two panels) |
| F6 | **retell the story / write the story** (de "Bildergeschichte schreiben", en "retell a story worksheet") | write the retelling with sequence words | 4 panels in order, each with 2 writing rows starting with a printed starter ("First, ...", "Next, ...", "Then, ...", "Last, ...", measured starter size) | G2 | written narrative; the Aufsatz genre | open |

### D. Refusals / re-targets
None expected. Sequence-word sets are panel literals: de zuerst / dann / danach / zum Schluss; fr d'abord / ensuite / puis / enfin; es primero / después / luego / al final; pt primeiro / depois / em seguida / por fim; it prima / poi / dopo / infine; nl eerst / dan / daarna / tot slot; sv först / sedan / därefter / till sist; da først / så / derefter / til sidst; no først / så / deretter / til slutt; fi ensin / sitten / seuraavaksi / lopuksi. ⚠ fi, de: a starter followed by the child's clause must be grammatical for ANY clause (de V2: "Zuerst ..." forces verb-second, which is fine because the child writes the rest; the panel confirms no starter forces a case).

### E. Traps + quality rule
- ⚠⚠ Two legal orders = two right answers. Every story is checked for a SECOND valid order (the panel lays out all 24 permutations mentally for 4 panels only where two states could swap). A story with any ambiguous adjacent pair is dropped, not "fixed" by instruction text.
- ⚠ Scramble must never print the story in order, and positional tells (the correct first panel always left) are measured over seeds (the nt10-D staircase lesson).
- ⚠ F3 distractors: never a plausible state of the SAME story (e.g. a half-built snowman as an ending choice after three balls).
- ⚠ Emotion/face reading excluded (no faces; feelings is another type).
- ⚠ Do not call a procedure (hand washing, road crossing) a "story".
- **Quality rule:** a 5-year-old who cannot read must be able to justify the order by pointing at what CHANGED between panels.

---

## 3 `healthy-habits` - hygiene, sleep, exercise, routines, self-care (base K; G1/G2 faces) - Pedagogy 5

### A. Teaching point

| loc | anchor + band |
|---|---|
| en | No CCSS; National Health Education Standards (NHES 1, 7: practise health-enhancing behaviours) and state health standards K-2. Band K-G2 (readiness wording: "health"); NGSS none |
| de | Sachunterricht Kl. 1-2 "Gesundheit: Körperpflege, Zähne putzen, Hände waschen, Schlaf, Bewegung" (Perspektivrahmen, Perspektive Natur / Gesundheit); Kita/Vorschule Zahnprophylaxe |
| es (MX) | NEM eje articulador **Vida saludable** + campo formativo "De lo humano y lo comunitario" (preescolar-2º): hábitos de higiene, descanso, actividad física. Strong |
| pt (BR) | **BNCC EF01CI03** "Discutir as razões pelas quais os hábitos de higiene do corpo (lavar as mãos antes de comer, escovar os dentes, limpar os olhos, o nariz e as orelhas etc.) são necessários para a manutenção da saúde." (1º ano) - the cleanest code |
| fr | Maternelle "adopter les règles d'hygiène"; cycle 2 Questionner le monde "reconnaître des comportements favorables à sa santé" (hygiène, sommeil, activité physique) CP-CE1 |
| it | Scienze / Educazione civica (educazione alla salute) classe prima-seconda: igiene personale, sonno, movimento |
| nl | SLO **kerndoel 34** "zorg dragen voor de lichamelijke en psychische gezondheid van henzelf en anderen" (groep 1-4) |
| sv | Lgr22 NO/biologi åk 1-3 (the Lgr11 wording "betydelsen av mat, sömn, hygien, motion och sociala relationer för att må bra"; panel quotes the current text) |
| da | Obligatorisk emne "Sundheds- og seksualundervisning og familiekundskab" (0.-3. kl) + natur/teknologi "krop og sundhed" |
| no | LK20 tverrfaglig tema "folkehelse og livsmestring" + naturfag (kropp og helse, etter 2. trinn; panel quotes) |
| fi | OPS 2014 ympäristöoppi 1-2 "terveyttä edistävät tavat: uni, lepo, liikunta, hygienia" |

### B. Boundary
Must not duplicate: K-203 healthy/not-healthy FOOD, G1-207 food groups (**no food item as a habit answer anywhere**), human-body K-354 (+4) (body parts), five-senses (sense organs), feelings (emotions), all-about-me, K-212 wants/needs, and the whole **road-safety** family (K-369 + faces: traffic safety is OWNED there; "safety-of-self" here = sun, germs, rest, never streets). **Healthy-habits owns daily self-care ACTIONS**: washing hands, brushing teeth, bathing, combing, blowing the nose, coughing into the elbow, sleeping, drinking water, moving the body, sun protection, and WHY each keeps us healthy.

### C. Art decision
Objects exist (toothbrush, toothpaste, comb, bathtub, sink, faucet, tissue, bed, pillow, pajamas, sunscreen, sunglasses, hat, glass) but a habit is an ACTION; soap, towel and shower are absent. **NEW `primitives/habit-pictogram.js`**, extending the `road-pictogram.js` faceless-walker language: child silhouette poses `wash-hands` (hands under a tap), `brush-teeth`, `sleep` (in bed), `cough-elbow`, `cough-open` (the unhealthy twin), `blow-nose`, `drink`, `comb`, `bath`; plus drawn objects `soap`, `towel`. Action pictures from `activities/` (running, jumping, dancing, hiking, reading, puzzle, chess; b3 G2-317 list) are used ONLY on the moving/resting face, never mixed with pictograms on one page.

### Six faces

| # | face (query) | move | page | band | distinct because | answer |
|---|---|---|---|---|---|---|
| base | **healthy habits** (bare; es "hábitos de higiene", de "Hygiene") | match each habit to what we use for it | `.ws-match`: 5 habit pictograms (wash hands, brush teeth, sleep, comb hair, blow nose) ↔ 5 objects (soap*, toothbrush, bed, comb, tissue), draw lines | K | the genre: habit ↔ tool | closed (one object per habit; toothpaste NOT on the same page as toothbrush) |
| F2 | **hand washing steps** (en "hand washing steps", de "Hände waschen Reihenfolge") | order a hygiene procedure | 5 pictogram cards scrambled: wet hands → soap → rub → rinse → dry with towel; write 1-5 | K/G1 | procedure sequence of ONE routine (not a story) | closed (the WHO/CDC order is unique; no seconds printed) |
| F3 | **moving or resting** (en "exercise worksheet for kids", fr "bouger / se reposer") | classify activities: moving my body / resting, both are healthy | 8 `activities/` action pictures (running, jumping, dancing, hiking, biking | reading, puzzle, chess; + bed) over two word bins | K | the exercise-and-rest strand; no "bad" bin | closed; items with an ambiguous reading dropped (painting, fishing, swimming-as-goggles) |
| F4 | **stop the germs** (en "germs worksheet", pt "como evitar germes") | choose the healthy way | 4 rows, each 2 pictograms: cough into elbow vs cough open · tissue in the bin vs on the floor · wash hands before eating vs not (hands + plate, no food shown) · own cup vs sharing a cup; circle the healthy one | G1 | a CHOICE between two behaviours, germ-spread reasoning | closed |
| F5 | **why do we do it?** (en "healthy habits reasons", pt "por que lavar as mãos" = EF01CI03's razões) | match habit → reason sentence | 5 habit pictograms ↔ 5 short reason sentences (panel literals: "washes germs away", "keeps teeth strong", "body rests and grows", "heart and muscles get strong", "skin is safe from the sun"), draw lines | G2 | the WHY, reading | closed (panel checks no reason fits two habits) |
| F6 | **healthy habits chart** (en "healthy habits chart", es "tabla de hábitos") | self-monitoring over a week | 7 day columns (locale's own week start and day names from `data/b2/calendar.js`) × 5 habit rows (pictogram labels), tick boxes | G1 | an open routine tracker, used all week | open |

### D. Refusals / re-targets
None expected. Re-targets are data: pt-BR habitually teaches brushing after every meal (no numeric frequency on any page anyway); es-MX NEM wording in the landing; nl/da wording "sund" register.

### E. Traps + quality rule
- ⚠ **Cough into the ELBOW (or a tissue)** is the WHO/health-authority advice in every locale; "cover your mouth with your hand" is the outdated answer and must never be the correct option.
- ⚠ No numbers that differ by authority: hand-washing seconds (CDC 20 s scrub vs WHO 40-60 s), sleep hours, toothpaste amount (EU "pea"/"rice grain" by age), brushing frequency (2× vs after each meal in BR). Pages carry actions, not quantities.
- ⚠ No "good kid / bad kid" framing and no shaming visuals (dirt, disease, crying). The unhealthy twin on F4 is a neutral pose.
- ⚠ Pictures: `accessories/mask` is a carnival mask; `around the house/brush` is a PAINT brush; `around the house/shampoo` is a pump bottle that reads as liquid soap but whose word is shampoo; `beach/water` is a plastic bottle - none of these may carry a hygiene answer under a wrong word.
- ⚠ Screens (TV, tablet) are not "unhealthy objects" (contested, culture-dependent) - excluded.
- ⚠ Food never appears as an answer (K-203/G1-207 boundary).
- **Quality rule:** every habit is shown as an ACTION a child performs, and every correct answer matches current public-health advice in all 11 countries.

---

## 4 `habitats` - where animals live, animal homes, adaptation (base G1; K/G2/G3 faces) - Pedagogy 5

### A. Teaching point

| loc | anchor + band |
|---|---|
| en | NGSS **K-ESS3-1** (relationship between the needs of animals and the places they live), **2-LS4-1** (compare the diversity of life in different habitats), **3-LS4-3** (some organisms survive well, less well, or not at all in a habitat). Band K-G3 |
| de | Sachunterricht Kl. 2-3 "Lebensräume: Wald, Wiese, Teich, Hecke; Tiere und ihre Lebensräume" (Perspektive Natur). ⚠ de teaches LOCAL Lebensräume, not savanna |
| es (MX) | 1º-3º "los seres vivos y su entorno", "¿dónde viven los animales?", ecosistemas de México (selva, bosque, desierto, mar) (NEM campo Saberes y pensamiento científico) |
| pt (BR) | **BNCC EF02CI04** (características de plantas e animais ... "e relacioná-las ao ambiente em que eles vivem"); EF03CI04 (modo de vida dos animais). Biomas brasileiros (Amazônia, Pantanal, Mata Atlântica, Cerrado, Caatinga) are the native frame |
| fr | Cycle 2 Questionner le monde "le vivant: les milieux de vie, relations entre les êtres vivants et leur milieu" (CE1-CE2) |
| it | Scienze classe seconda-terza "gli ambienti e gli animali che li abitano" (habitat, ecosistema) |
| nl | Groep 4-5 "leefgebieden / biotopen" (SLO kerndoel 40 planten en dieren in hun omgeving) |
| sv | Lgr22 NO åk 1-3 "djur och växter i närmiljön ... hur de kan sorteras, livsmiljöer" (panel quotes): skog, sjö, hav, äng, fjäll |
| da | Natur/teknologi 1.-2. kl "dyr og deres levesteder" (skov, sø, hav, eng) |
| no | LK20 naturfag etter 4. trinn "naturtyper ... og livsmiljø"; etter 2. trinn sorting animals by where they live (panel quotes); skog, fjell, sjø, hav |
| fi | OPS 2014 ympäristöoppi 1-2 "lähiympäristön eliöt ja elinympäristöt": metsä, järvi, suo, meri |

### B. Boundary
Must not duplicate G1-202 `where-animals-live` (land/water/AIR 3-bin sort), G2-318 animal-fact-file (+ G2-343 **who-am-i riddles**, G2-342 compare two animals), K-205/baby animals, farm-vs-wild, pets-vs-wild, what-animals-eat, the animal-life-cycles family. **Habitats owns ECOLOGICAL places** (ocean, forest, pond, polar, grassland/savanna, rainforest, and each locale's native set), **animal HOMES** (nest, hive, web, burrow, anthill, lodge), and **ADAPTATION** (why a body suits a place). ⚠ It deliberately does NOT reuse the land/water/air `habitat` field of `data/b3/animal-facts.json` (owl = "air" is not a habitat); its own bank `data/b6/habitats.js` stores an ecological habitat per animal, and the landing may say "air is not a place animals live".

### C. Art decision
No habitat scenery exists except `camping/forest`, `camping/mountain|lake|river`, `beach/island`, `ocean life/coral|seaweed`. **NEW `primitives/habitat-tile.js`**: palette-only emblem tiles (ocean waves + seaweed, forest trees, pond reeds + lily pad, polar ice floe + snow, grassland tall grass + acacia, rainforest large leaves + vines, desert dunes + cactus, meadow flowers, mountain peaks), one style, no animals drawn in the tile (the animals are library pictures placed beside). **NEW `primitives/animal-home.js`**: hive, web, burrow mound + hole, anthill, beaver lodge, den/cave mouth (nest stays the library `spring/nest`? NO - one art source per page: draw the nest too).

Animal pools (library pictures; picOpened required before use):
- ocean: whale, dolphin, shark, octopus, crab, jellyfish, starfish, clownfish, orca, squid, tuna, ray, shrimp (`ocean life/`, `beach/`)
- forest: bear, deer, fox, squirrel, owl, woodpecker, hedgehog, badger, raccoon, moose, wolf, chipmunk, porcupine (`forest creatures/`)
- pond/lake: frog, duck, swan, heron, beaver, otter, dragonfly, toad, salamander (`forest creatures/`, `birds 2/`, `zoo animals/otter`, `reptiles and Amphibians/`)
- polar: penguin, walrus, seal, narwhal, reindeer (tundra); `polar_bear` has NO vocab key (UNUSABLE as a labelled item)
- grassland/savanna: lion, zebra, giraffe, elephant, cheetah, gazelle, antelope, hyena, rhinoceros (`zoo animals/`)
- rainforest: monkey, chimpanzee, gorilla, orangutan, sloth, jaguar, toucan, macaw, parrot, hornbill, chameleon
- desert: camel, meerkat only (vulture, lizard, iguana, armadillo are ambiguous) → **desert is BELOW the 3-animal floor; excluded until pictures exist** (no cactus picture either)

### Six faces

| # | face (query) | move | page | band | distinct because | answer |
|---|---|---|---|---|---|---|
| base | **animal habitats** (bare; de "Lebensräume der Tiere", fr "milieux de vie") | match each animal to its habitat | 4 habitat tiles lettered A-D + 8 animal pictures, write the letter under each (2 animals per habitat, never evenly positioned) | G1 | ecological places (4 of 6-7), not land/water/air | closed |
| F2 | **animal homes** (en "animal homes", es "casas de los animales", de "Wo wohnen die Tiere") | pair an animal with the home it builds/uses | `.ws-match`: 6 animals (bird, bee, spider, rabbit/fox, ant, beaver) ↔ 6 drawn homes (nest, hive, web, burrow, anthill, lodge) | K | a home ≠ a habitat; the classic K topic | closed (one home per animal; no birdhouse, no igloo, no kennel/stable) |
| F3 | **who does not live here?** (en "habitat odd one out") | exclusion within a habitat | 4 rows: habitat tile + 4 animals, cross the one that does not live there | G1 | exclusion reasoning; the stranger comes from a clearly different habitat (whale in the forest row), never a borderline animal | closed |
| F4 | **how animals adapt** (en "animal adaptations", pt "adaptação dos animais", fr "adaptation au milieu") | match a body feature to the animal and place it helps | 5 feature sentences (panel literals: "thick fur and fat keep it warm in the ice", "fins and gills let it live in water", "webbed feet help it swim", "a long neck reaches high leaves", "a hump stores FAT for long trips") ↔ 5 animals | G2-G3 | adaptation (3-LS4-3 readiness at G2) | closed |
| F5 | **what animals need from a habitat** (en "habitat needs", de "Was brauchen Tiere zum Leben") | an animal's habitat gives food, water, shelter | 3 animals, each with 6 picture chips (food for THAT animal from `what-animals-eat.json` logic, water, its home, + 3 human distractors: toy, TV, shoe); circle the 3 needs | G1 | needs judgement (K-ESS3-1) for ANIMALS; plants K-376 owns plant needs | closed |
| F6 | **my habitat report** (en "habitat project", fr "fiche milieu de vie") | research/record template | pick a habitat (tile printed), draw it, write 3 animals, 1 plant, and circle hot/cold, wet/dry | G2 | open writing + drawing template | open |

### D. Refusals / re-targets
- The HABITAT SET is per-locale DATA (the native frame): de Wald / Wiese / Teich / Meer (+ Hecke only if a hedge tile is drawn); sv/no/da/fi skog / sjö / hav / (fjäll/fjell, suo in fi: suo = bog, only if a tile + ≥3 animals exist, else dropped); pt-BR Amazônia (rainforest tile) / Pantanal (pond/wetland tile) / oceano; es-MX selva / bosque / mar (+ desierto REFUSED: no desert pool); en/fr/it/nl the generic set ocean / forest / pond / polar / savanna / rainforest.
- F4 savanna/rainforest animals in a Nordic locale are fine (adaptation is general), but base/F3 use the locale's own set.
- No face refused at design time; a locale whose own set cannot reach 4 tiles × 2 animals re-targets to its pool (data) or refuses base/F3 (record).

### E. Traps + quality rule
- ⚠⚠ **Penguins and polar bears never meet** (Antarctic vs Arctic). A single "polar" tile is honest at K-1; no face may state they share a place, and G2+ copy says "the Arctic" or "Antarctica" only per animal.
- ⚠ **Camel humps store FAT, not water** (the classic error).
- ⚠ A **whale/dolphin is not a fish** (never classify in this type; ocean is the place only).
- ⚠ Farm and pets are not habitats (a cow's "habitat" is a human farm; exclude farm/pet animals and human homes: `winter/igloo`, `spring/birdhouse`).
- ⚠ Animals living in several habitats (fox, owl, bat, duck, seal, frog) never sit on the discriminating side of F3; in base they only match a habitat when the other tiles on the page are clearly wrong for them.
- ⚠ Home words: burrow (rabbit) vs den (fox) - a rabbit/fox pair can share a burrow picture; pick ONE per page. Bee "hive" (wild nest vs beekeeper's box) - the drawn home is a wild comb nest; the panel picks the word.
- **Quality rule:** every animal-habitat pair is textbook-true for a K-3 teacher in that country, and each page shows the child's own country's habitats first.

---

## 5 `sink-or-float` - predict → test → record inquiry (base G1; K/G2/G3 faces) - Pedagogy 5

### A. Teaching point

| loc | anchor + band |
|---|---|
| en | NGSS has no K-2 buoyancy PE; closest **2-PS1-1** (describe and classify materials by observable properties) + the NGSS practice "plan and carry out investigations" (K-2). Honest: readiness/inquiry at K-G1, 2-PS1-1 at G2 |
| de | Sachunterricht Kl. 1-2 **"Schwimmen und Sinken"** - a canonical unit (Perspektivrahmen, naturwissenschaftliche Perspektive; the "Knetboot" experiment); Kita/Vorschule too. Strongest |
| es (MX) | Preescolar "Exploración y comprensión del mundo natural": "¿flota o se hunde?"; 1º-2º experimentos |
| pt (BR) | Educação Infantil **EI03ET01** (comparar propriedades de objetos; panel verifies) + EF01CI01 (comparar características de materiais) |
| fr | Maternelle GS "explorer la matière: ça flotte / ça coule"; cycle 2 "la matière" (démarche d'investigation) |
| it | Scienze prima-seconda "galleggia o affonda?" (metodo scientifico: ipotesi, prova, risultato) |
| nl | Groep 1-4 "drijven en zinken" (SLO kerndoel 42 natuurkundige verschijnselen) - canonical |
| sv | Förskoleklass / åk 1-3 "flyta och sjunka" (Lgr22 NO åk 1-3, enkla undersökningar; panel quotes) |
| da | Børnehaveklasse / natur-teknologi 1.-2. kl "flyde og synke" (undersøgelse) |
| no | LK20 naturfag 1.-2. trinn utforskende arbeid "flyte og synke" (panel quotes the kompetansemål) |
| fi | Esikoulu / ympäristöoppi 1-2 "kelluu vai uppoaa?" (tutkiva oppiminen) |

### B. Boundary
⚠ **G1-204 (science-sort) already ships "Sink or Float?" under slug `sink-or-float`**: a 12-picture two-bin line-sort. So (1) this family never ships a plain float/sink SORT as any face; (2) its base slug must NOT be `sink-or-float` (collision with the live G1-204 deck slug in en and the existing native slugs; UNKNOWN which native slugs G1-204 holds - engineer checks all 11) - e.g. base slug `sink-or-float-experiment`; (3) whether G1-204 stays in `science-sort` is an operator/SEO call, not pedagogy. Also not materials (recycling G1-364 "what is it made of", G2-348 odd one out by material). **This family owns the INQUIRY**: prediction vs result, the misconception "heavy sinks, light floats", the role of SHAPE and material, and the written record.

### C. Science rulings (binding on every face)
- Outcome depends on material (density) AND shape (trapped air/displacement). **Never teach "heavy sinks, light floats"** - a big log floats, a small key sinks. Never teach "it floats because it is light" as a reason chip.
- Only items whose result in plain TAP water is unambiguous (list in the measured table above). Excluded: living animals, containers that can fill (glass, cup, bowl, bottle), plastics of unknown kind, fruit halves/slices, egg (sinks fresh, floats stale), carrot, crayon, LEGO, a sponge after soaking (the dry sponge is used, the landing says "dry").
- **Salt water is never mentioned** except on F6 as a named question where the teacher runs it.
- The whole orange (peel on) floats; peeled it sinks - usable ONLY as F6's investigation question, never as a sort item.

### Six faces

| # | face (query) | move | page | band | distinct because | answer |
|---|---|---|---|---|---|---|
| base | **sink or float experiment** (de "Schwimmen und Sinken Versuch", nl "drijven en zinken proefje", fr "flotte ou coule expérience") | predict, test in a tub, record | a 6-row table: picture · "I think" (circle float/sink icon) · "It did" (circle float/sink icon); a small tank primitive with a waterline in the header | G1 (K in de-Kita, es preescolar, fr GS copy) | the prediction ≠ result record | open (prediction is the child's; the result is physical; printable decks ship no key) |
| F2 | **heavy or light? sink or float** (en "does heavy sink", de "schwer oder leicht schwimmt") | break the misconception: in each pair circle the one that FLOATS | 4 pairs where the BIGGER object floats and the smaller one sinks (list below), the floater drawn visibly larger; circle the floater | G1 | the only face whose discriminator is size vs floating | closed (items only from the opened lists) |
| F3 | **change the shape** (de "Knetboot", en "make clay float") | a ball of clay sinks; the same clay as a boat floats | NEW `primitives/clay-form.js` (ball, flat pancake, boat): 3 rows "same clay, different shape", circle sink/float per shape; + a drawing box "design your boat" | G2 | shape, not material | closed for the 3 rows (ball sinks, boat floats; pancake EXCLUDED: flat clay sinks slowly, ambiguous) + open box |
| F4 | **true or false: why things float** (en "why do things float", pt "por que flutua") | read and judge claims | 6 sentences (panel literals): "All heavy things sink." F · "A big log floats." T · "A small key sinks." T · "Air inside a ball helps it float." T · "Light things always float." F · "The same clay can sink or float." T; circle T/F | G2 | reasoning in words about the misconception | closed |
| F5 | **draw what floats and sinks** (K; fr maternelle "ce qui flotte, ce qui coule") | draw one floater at the waterline and one sinker on the bottom of a drawn tank, after the class test | 2 tank frames (NEW tank primitive: waterline + floor), labels float / sink | K | pre-writing record, drawing, no reading | open |
| F6 | **sink or float investigation** (en "science experiment worksheet sink float", de "Forscherheft schwimmen sinken") | a full inquiry write-up for ONE question | question (printed choice of 2: "Does an orange float with and without its peel?" / "How many blocks can a foil boat carry?" - no foil picture, drawn), prediction lines, "what we did" (materials pictograms), result box, "I learned" lines | G2-G3 | the scientific method frame | open |

(F2 pairs final list for the design agent: `camping/log` vs `around the house/key` · `toys/ball` vs `tools/nail` · `fruits/apple` vs `beach/rock` (rock drawn smaller) · `christmas/candle` vs `beach/seashell`. Each pair must show the floater LARGER; which one is placed left is balanced over seeds.)

### D. Refusals / re-targets
None expected. es-MX/fr/de copy may pitch base at K (Kita/preescolar/GS) - the band is data. Words: float/sink in each locale are verbs in citation form on chips (de "schwimmt / sinkt" - ⚠ de "schwimmen" means both swim and float; the panel may prefer "schwimmt (oben) / geht unter"); nl drijft / zinkt; fi kelluu / uppoaa.

### E. Traps + quality rule
- ⚠⚠ "Heavy sinks, light floats" as the taught rule, or "it floats because it is light" as a correct answer (both FALSE).
- ⚠ The existing G1-204 bank carries a plastic spoon as "sink" (opened: purple plastic) - do not copy that bank's items without opening them; the wooden `around the house/spoon` FLOATS.
- ⚠ Hollow containers, halves and cartons change result with orientation or filling.
- ⚠ A "result" column must never be pre-filled (answers never printed).
- ⚠ No density numbers, no "density" term below G3 in any locale's copy.
- **Quality rule:** every closed item is one a teacher can drop into a tub of tap water and get the printed answer every time; anything that depends on orientation, filling, soaking or product kind is excluded.

---

## Cross-type summary (for the README matrix)

| type | base band | faces | type-level refusals | new primitives needed |
|---|---|---|---|---|
| cursive-writing | G2 (G1 fr/pt/it) | base, capitals, connections, words, reading cursive, copy a sentence | **sv, fi (whole type)**; possible F2 in it + es (panel) | none; NEW font assets Playwrite US/DE×3/MX/BR/FR/IT/NL/DK×2/NO (operator approval), per-locale ruling table, measured metrics |
| story-sequencing | K | base, first-next-last, what happens next, beginning-middle-end, sequencing sentences, retell | none | `story-panel.js` + `data/b6/stories.js` (12 candidate stories) |
| healthy-habits | K | base habit↔tool, hand-washing steps, moving/resting, stop the germs, why, weekly chart | none | `habit-pictogram.js` (extends road-pictogram) incl. soap + towel |
| habitats | G1 | base, animal homes, odd one out, adaptations, habitat needs, habitat report | desert excluded everywhere (no pool); per-locale habitat set = data | `habitat-tile.js`, `animal-home.js` |
| sink-or-float | G1 | experiment table, heavy-or-light pairs, change the shape, true/false, draw, investigation | none; **base slug must not be `sink-or-float`** (G1-204 owns it) | `clay-form.js`, tank primitive |

Open items for the build: (1) Playwrite glyph coverage per locale UNKNOWN; (2) G1-204 `kitchen tools/spoon` ambiguity in a live deck; (3) G1-204's native slugs vs the new family's slugs; (4) all BNCC/Lgr22/LK20 texts cited above must be verified verbatim by the native panels (never in metadata).
