# K-369 `road-safety`: pedagogy + content design (2026-09-23)

Read: `_ROLE-PEDAGOGY`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ DELTA), `_PANEL-FINDINGS` (row 2 + the road-safety cross-panel ruling), the `road-safety` sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `../b4-designs/K-357-recycling.md` (codeColors-on-a-primitive precedent), `types/k/K-210-transportation.js`, `data/science/{helper-tool,transportation-land-water-air}.json`, `primitives/_tokens.js` (`codeColors`), `data/color-words.js`, `frontend/lib/seo/strand-names.ts:71-86`, `scripts/seo-landing/gen-b2-landings.js LEVEL_KEYS`, `frontend/config/topics-taxonomy.json`. (m) = measured read-only 2026-09-23; (o) = picture OPENED this session; *est.* = engineer measures in a real render; **(reg ✓)** = regulation reference I am confident of, **(reg ?)** = the native panel must cite the annex before build (a wrong sign is misinformation to a six-year-old; the family ships only after a signed per-locale sign review). No em-dashes.

**Boundary (load-bearing).** Nothing in the catalogue teaches traffic behaviour or signs (m: `grep -ril "traffic|road.?sign|verkehr"` over `types/` = 0 hits; `apps['road-safety']` and `axes['exercise-type']['road-safety']` ABSENT). Neighbours it must not echo: **K-210** "Land, Water, and Air Transportation" (vehicle pictures to a travel medium; never a vehicle-classification task here, never the word "transportation/Verkehrsmittel/transporte" in a title) · **K-213** helper-tool (no crossing guard pair; `occupations/crossing_guard` is not in that bank, m) · the `vehicles` THEME (en Vehicles, de Fahrzeuge, sv Fordon, da Køretøjer, no Kjøretøy, fi Ajoneuvot: never a title head) · **K-241 / K-265..269 colour-by-code** (F1 colours by KNOWLEDGE of lamp position, never by a printed code) · **G1-203 science-sequence** (ordering life cycles; F3 orders a BEHAVIOUR routine, never "sequence" as its head) · **2d-shapes K-368** (F4 sorts signs by their MEANING class; the shape is the evidence, never the bin label; no shape names on any road-safety page) · `maps` G1-379 (no "way to school" map face). This family therefore owns: **the pedestrian's reading of signals and signs in the child's OWN country** (what a lit lamp means for the person it addresses; the locale's regulation sign set, its meanings and its meaning classes) and **the national crossing routine**. Every signal and sign is drawn by a NEW primitive from a per-locale spec; **the family draws 0 library pictures** (opened and rejected below). No face judges a "safe/unsafe scene" (no scene art; panel ruling), no face states a legal priority rule (zebra priority differs by country), and no face ever lights two lamps at once (the red+amber phase exists in de/da/no/sv/fi and not in nl/fr/it/es-MX/pt-BR/en).

## A. Identity

| field | value |
|---|---|
| key / bands | `road-safety` / base **K-369 K**; F1 F3 **K** (`K-371+ TBD by the emitter`); F2 **G1** (`G1-381+ TBD`); F4 F5 **G2** (`G2-360+ TBD`). `default_subject: science` (lock; open item 1), `default_age_range: 5-7`, `assetClass: geometry`, `exerciseType: road-safety`. |
| taxonomy (m) | register `apps['road-safety']` + `axes['exercise-type']['road-safety']` ×11. Theme slugs that must never be the head: `vehicles` (+ `_bw*`). Strand: the existing `'Science'` row renders sv "Naturorienterande ämnen", da "Natur/teknologi", no "Naturfag", it "Scienze", pt "Ciências" (m, `strand-names.ts:74-86`), none of which carries traffic education in those countries. **Add a `'Road Safety'` strand row** (open item 2), literals proposed: en Road Safety · de Verkehrserziehung · es Educación vial · pt Educação para o trânsito · fr Éducation à la sécurité routière · it Educazione stradale · nl Verkeerseducatie · sv Trafikkunskap · da Færdselslære · no Trafikkopplæring · fi Liikennekasvatus (panel confirms). |
| theme axis | **OFF** on all six faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. |
| `unitAxis` | not applicable (the sign set is per-locale DATA, not a fan). |
| the one rule | **Every closed answer is re-derived from the DRAWN geometry, never from a label:** a traffic-light answer from the lit lamp's INDEX and the light's kind (car 3 lamps / pedestrian 2 lamps, it may be 3); a sign's class from its drawn shape + rim/field (point-up triangle with rim = warning; rim-only circle = prohibition; filled blue circle = mandatory; blue square = information; yellow diamond = warning in en/es/pt). Plus the **B&W rule:** every signal is decodable in greyscale by POSITION (lamp index), POSE (standing vs walking figure, hand vs walker) or SHAPE + FILL-vs-RIM; colour (`codeColors`) only reinforces. |
| picture bank | **none.** Opened and rejected: `vehicles/car` (o) green hatchback, 3/4 view: a GREEN car next to a red-light card reads "green = go" to a five-year-old · `vehicles/bus` (o) toy face, 3/4 · `vehicles/bicycle` (o) clean side view but no helmet art exists to pair it with · `occupations/crossing_guard` (o) child with an ORANGE round paddle (not any locale's regulation lollipop/STOP paddle) and red vest; NO vocab key (m) · `camping/vest` (o) = a fishing/outdoor vest, NOT hi-vis · `camping/flashlight` (o) = a torch, not a reflector · `toys/ball` (o) football (the "ball rolls into the road" scene needs road art) · `vehicles/police_car` baked English text (SUBSTRATE) · `vehicles/school_bus` no vocab (m). No picture for helmet, reflector, seat belt, child seat, zebra crossing, kerb, traffic light, road sign (m: manifest grep). Every car/walker on the page is a pictogram drawn by `primitives/road-pictogram.js`. |
| CCSS (en, honest) | **none** (no CCSS/NGSS road-safety standard; readiness, as the selection recorded). The en landing says "no Common Core standard; a K-2 safety unit". |

| loc | genre head (panels) | school year (K / G1 / G2) | national strand (framework NAME) | CCSS |
|---|---|---|---|---|
| en (US) | **Road Safety** / **Traffic Signs** (B+; "traffic signs worksheets for kindergarten", "traffic light worksheet kindergarten" WINNABLE) | kindergarten / grade 1 / grade 2 | pedestrian-safety unit (no framework) | none |
| de | **Verkehrserziehung** / **Verkehrszeichen** (A; "Ampel arbeitsblatt", "mit Bedeutung", "Klasse 1/2") | Vorschule / 1. Klasse / 2. Klasse | Lehrplan Sachunterricht; KMK-Empfehlung Mobilitäts- und Verkehrserziehung | none |
| es (MX) | **Educación vial** / **Señales de tránsito** (A; "y su significado", "preventivas, restrictivas e informativas") | preescolar / primer grado / segundo grado | SEP/NEM: Formación Cívica y Ética (educación vial) | none |
| pt (BR) | **Educação no trânsito** / **Placas de trânsito** (A-; always with "educação infantil"/ano) | educação infantil / 1º ano / 2º ano | BNCC tema contemporâneo transversal (CTB art. 76) | none |
| fr | **Sécurité routière** / **Panneaux de signalisation** (A; "cp", "ce1", "APER piéton") | maternelle (GS) / CP / CE1 | programmes: EMC + Questionner le monde; APER | none |
| it | **Educazione stradale** / **Segnali stradali** (A; "pericolo, divieto, obbligo", "significato", "verifica") | infanzia / classe prima / classe seconda | Indicazioni nazionali: educazione civica (L. 92/2019) | none |
| nl | **Verkeer** (with a groep word) / **Verkeersborden** (A; "soorten verkeersborden", "werkblad groep 4") | kleuters / groep 3 / groep 4 | SLO kerndoelen: Oriëntatie op jezelf en de wereld (verkeer) | none |
| sv | **Trafik** (compound only) / **Trafikmärken** (A; "trafik åk 1", "trafikregler för barn") | förskoleklass / åk 1 / åk 2 | Lgr22: SO (trafikregler) [NSR] | none |
| da | **Færdselslære** / **Færdselstavler** (B; "indskoling", "til print") | børnehaveklasse / 1. klasse / 2. klasse | Fælles Mål: Færdselslære (obligatorisk emne) [NSR] | none |
| no | **Trafikkopplæring** / **Trafikkskilt** (B; "oppgaver", "trinn 3") | 1. trinn / 2. trinn / 3. trinn | LK20 (tverrfaglig; Trygg Trafikk) [NSR] | none |
| fi | **Liikenneturvallisuus** / **Liikennemerkit** (B+; Liikenneturvallisuusviikko September spike) | esikoulu / 1. luokka / 2. luokka | OPS 2014: ympäristöoppi (liikennekasvatus) [NSR] | none |

### A.1 The pedestrian traffic light per locale (`pedLight` bank field; every face that draws one uses THIS)

| loc | stop glyph / colour | go glyph / colour | lamps | notes |
|---|---|---|---|---|
| en (US) | UPRAISED HAND, Portland orange (`codeOrange`) | WALKING PERSON, lunar white (white glyph on a dark lamp) | 2 | MUTCD ch. 4I/4E pedestrian signal head (reg ✓). A countdown display is common: never drawn (numerals would add a counting cue and are not universal). The walker cannot be "coloured" white: en F1 uses car lights only. |
| es (MX) | standing figure, red | walking figure, green (often animated) | 2 | countdown common in cities, not drawn; (reg ?) panel confirms the figure pair and whether a hand is used. |
| pt (BR) | standing figure OR open hand, red | walking figure, green | 2 | (reg ?) Manual Brasileiro de Sinalização de Trânsito vol. V (semafórica): the panel picks `stop:'standing'` or `'hand'`; the build refuses to draw pt pedestrian lights until the field is set. |
| de fr nl sv da no fi | standing figure, red | walking figure, green | 2 | Vienna convention (reg ✓ for the pair). de: never the East German Ampelmännchen (regional); sv: the ticking sound is landing prose only; nl/fr say "oranje/orange" for the CAR amber. |
| it | standing figure, red | walking figure, green | 2 or 3 | (reg ?) many Italian pedestrian signals carry a YELLOW phase (3 lamps): `it.pedLamps` panel sets 2 or 3; the base and F1 never light the yellow pedestrian lamp. |

**Car light:** 3 lamps top red / middle amber / bottom green everywhere (vertical; reg ✓). **Amber crayon + word** (`amber` bank field): en yellow · de gelb · es amarillo · pt amarelo · it giallo · sv/no gult · da gult · fi keltainen → `codeYellow`; **fr orange · nl oranje → `codeOrange`**. **Amber meaning** (`amberMeans`): de/fr/it/nl/sv/da/no/fi/es/pt "stop" (the vehicle must stop unless it cannot stop safely; the page shows only the stop chip, never "hurry"); **en "slow down"** (US K teaching "red stop, yellow slow down, green go"): en never shows an amber card on a stop/go face (single answer by construction).

## B. The six faces

Shared: NEW `primitives/traffic-light.js`, `primitives/road-sign.js`, `primitives/road-pictogram.js` (spec D.1-D.3); NEW `templates/components-b5/road-safety.js`. Reuse `cardGrid`, `.ws-match` two-column layout, `.ws-bin` / `.sci-bin`-style word bins (clone the layout, never call `science-category-sort.build()`: its 52 px items fail the floors), `blankNumeralBox` (K open numerals), `pillChoice`. Signs and lamps fill with `codeColors` red/blue/yellow/green/orange + `white` + `ink` (the K-357 bin-lid precedent; palette lint allow-list scoped to `[data-lcs-signal]`). Every stage stamps `data-ws-content`. **No face prints a word inside a sign except the regulation text (STOP / ALTO / PARE / YIELD / CEDA EL PASO / DO NOT ENTER).**

### Base: Road Safety: Traffic Lights, Stop or Go? (K-369, K, PARAM ladder)
**Move:** READ one signal and decide what the road user it addresses does (lit lamp → stop or go).
**Child:** "Look at the light that is on. Circle what to do: stop or go." (60 chars en)
**Light used:** BOTH, keyed to the actor. Pedestrian-light cards carry two walker pictogram chips (`standing at the kerb` / `walking on the stripes`); car-light cards carry two car pictogram chips (`car behind the stop line` / `car driving`, motion lines). The chip pair tells the child whose light it is; the landing states "your light is the one with the little person".
**Params:** d1 `{cards:4, ped:4, car:0, lit:['red','green']}` · **d2 (ships) `{cards:6, ped:3, car:3, lit:['red','green'], chipWords:true}`** (each light red ×≥2 and green ×≥2 across the page; answer chip left/right spread ≥ 2 each) · d3 `{cards:6, ped:3, car:3, lit:['red','amber','green'], amberOnlyIf:'amberMeans=stop'}` (en d3 = d2). One lamp lit per light: `codeColors` fill + 8 ink rays; unlit lamps `white` with a teal ring and, on pedestrian lights, the OUTLINE figure. Chip words (`chipWords`) are panel literals under the pictograms (de stehen/gehen, fr je m'arrête/je traverse, sv stanna/gå, da stop/gå, no stopp/gå, fi seis/mene…), K 16 px, optional for pre-readers (the pictogram carries it).
**verify():** card stamps `data-lcs-light=car|ped`, `data-lcs-lit-index`, chips `data-lcs-chip=stop|go`; the gate owns `RULE = {ped:{0:'stop',1:'go'}, car:{0:'stop',1:'stop',2:'go'}}` and derives the answer from the INDEX (never from the fill); asserts exactly one lit lamp per light, exactly one matching chip, the ped lit glyph pose matches the index (standing top, walking bottom / hand top, walker bottom), no amber card in en, both actors present at d2.
**Refusals:** none (pt draws pedestrian lights only after `pedLight.stop` is set; until then pt d2 = `{ped:0, car:6}`, still distinct from F1).
**Query face:** the bare genre head + traffic light ("road safety traffic lights", "Verkehrserziehung Ampel arbeitsblatt", "educación vial semáforo", "educação no trânsito semáforo", "sécurité routière feu tricolore", "educazione stradale semaforo", "verkeer stoplicht kleuters", "trafikljus förskoleklass", "færdselslære lyskurv", "trafikklys", "liikennevalot").

### F1: Colour the Traffic Lights (K, `K-371+ TBD`, CODE `mode:'colour-lights'`)
**Move:** PRODUCE the colour from the lamp POSITION (recall the order red on top, green at the bottom), with the pencil and crayons.
**Child:** "One lamp on each light is on. Colour it red, yellow or green." (en 61; fr/nl write "orange/oranje" for the middle colour; the panel lists only the colours the page uses)
**Light used:** car lights (3 lamps) + pedestrian lights (2 lamps, figures in OUTLINE so the child colours the figure's lamp). **en: car lights only** (the US walker is white). it: 2-lamp pedestrian lights only, even if `pedLamps:3`.
**Params:** d1 `{lights:4, car:4, ped:0, onMark:'rays'}` · **d2 (ships) `{lights:6, car:4, ped:2, onMark:'rays', lampD:60}`** (car lamps on: top ×≥1, middle ×≥1, bottom ×≥1; ped: one top, one bottom; en `{car:6}`) · d3 `{lights:4, car:4, ped:0, onMark:'none', colourAll:true}` (colour every lamp in order; a whole-order recall). The "on" lamp is marked by 8 ink rays only; every lamp is `white` (nothing to copy).
**verify():** lamp stamps `data-lcs-kind`, `data-lcs-index`, `data-lcs-on`; answer key colour = `COLOUR[kind][index]` with the middle car lamp = the locale's `amber.token`; asserts exactly one `on` per light (d2), 0 filled lamps on the page (poison: a leaked fill), every car index represented at d2, lamp diameter ≥ 56.
**Refusals:** none.
**Query face:** "colour the traffic light" ("color the traffic light worksheet", "Ampel ausmalen", "semáforo para colorear", "semáforo para colorir", "colorier le feu tricolore", "semaforo da colorare", "stoplicht kleuren", "färga trafikljuset", "farvelæg lyskurven", "fargelegg trafikklyset", "liikennevalot värityskuva").

### F3: Crossing the Road Safely: the Steps (K, `K-372+ TBD`, CODE `mode:'crossing-steps'`)
**Move:** ORDER the national crossing routine (behaviour sequence), writing 1 to 5.
**Child:** "How do you cross the road? Write 1, 2, 3, 4, 5 in the right order." (en 67)
**Light used:** NONE: this is the routine at a kerb or zebra with NO lights (the landing says so; at a light the child also waits for the green figure).
**Steps (universal for right-hand traffic, reg ✓ for all 11: the nearest lane comes from the LEFT):** `stop-kerb` (figure, back view, feet at the kerb line) → `look-left` (back view, head turned, arrow to the viewer's left) → `look-right` → `look-left` (the "left, right, left again" of de links-rechts-links, fr gauche-droite-gauche, it/es/pt/sv/da/no/fi, en left-right-left) → `walk-across` (figure on the stripes, straight arrow). Back view so the figure's left IS the child's left; no mirroring (poison-tested).
**Params:** d1 `{cards:3, steps:['stop-kerb','look-both','walk-across']}` (one "look both ways" card) · **d2 (ships) `{cards:5, steps:'locale.steps', shuffledOffBy:≥3}`** · d3 `{cards:6, steps:'locale.steps'+['listen']}` only where the panel sets `listenStep` and its position (en "stop, look and listen"; others UNKNOWN). Cards 2 rows (3 + 2) at pictogram ≥ 120 px, each with a `blankNumeralBox` ≥ 56.
**verify():** cards stamp `data-lcs-step=<kind>`; the gate compares the KIND sequence (the two `look-left` cards are interchangeable, so a child who swaps them is right); asserts the printed order differs from the answer in ≥ 3 positions, the two `look-left` cards are not adjacent in print, no numeral printed, arrows point to the viewer's left on `look-left` (parsed from the svg).
**Refusals:** none (a locale whose school routine differs changes `steps` data, e.g. a panel that teaches "listen" at K).
**Query face:** "crossing the road steps" ("sicher über die Straße gehen", "cruzar la calle", "atravessar a rua", "traverser la rue", "attraversare la strada", "veilig oversteken", "gå över gatan", "gå over vejen", "gå over veien", "tien ylitys").

### F2: Road Signs and What They Mean (G1, `G1-381+ TBD`, CODE `mode:'sign-meaning'`)
**Move:** READ a sign and match it to its meaning (sign → meaning phrase), the locale's own regulation signs.
**Child:** "Draw a line from each road sign to what it means." (en 49)
**Params:** d1 `{pairs:4, roles:['stop','crossing','children','no-entry']}` · **d2 (ships) `{pairs:6, roles:'locale.setG1'}`** (6 roles, below) · d3 `{pairs:8, roles:'locale.setG1'+2}`. `.ws-match`: signs left (≥ 72 px), meaning pills right (G1 text ≥ 16 px, pill ≥ 44 high), right column deranged (≤ 1 pair straight across).
**Sign sets (roles; the panel supplies each locale's spec):** Vienna locales d2 = `stop`, `crossing` (pedestrian crossing indication), `children` (warning), `no-entry`, `footpath` (mandatory), `bike-path` (mandatory); d3 + `yield`, `signal-ahead`. en d2 = `stop` (R1-1), `yield` (R1-2), `crossing` (W11-2 diamond), `school` (S1-1 PENTAGON), `no-entry` (R5-1 DO NOT ENTER), `signal-ahead` (W3-3); d3 + `bike-warning` (W11-1), `railroad` (R15-1 crossbuck) (all reg ✓). es-MX d2 = `stop` ALTO (SR-6), `yield` CEDA EL PASO (SR-7), `crossing` cruce de peatones (SP-32), `school` cruce escolar (SP-33), `signal-ahead` semáforo (SP-31), `no-bikes` (SR-?) (codes reg ?). pt-BR d2 = `stop` PARE (R-1), `yield` dê a preferência (R-2), `no-entry` sentido proibido (R-3), `crossing` passagem de pedestres (A-32b), `school` área escolar / passagem de escolares (A-33a/b), `signal-ahead` semáforo à frente (A-14) (codes reg ?; BR regulatory signs are WHITE discs with red rim and BLACK symbol, no blue mandatory discs).
**verify():** each sign stamps `data-lcs-role` + its spec; each pill `data-lcs-role`; answer = same role; asserts 6 distinct roles, no meaning pill text contains the sign's printed text word (no "STOP" in the stop meaning), pill order deranged, every spec resolves in the locale's signed sign table.
**Refusals:** none expected; a role whose spec fails the signed review is swapped for the next role in the locale list (data), never drawn "close enough".
**Query face:** "traffic signs and their meanings" ("Verkehrszeichen und ihre Bedeutung", "señales de tránsito y su significado", "placas de trânsito e seus significados", "panneaux de signalisation et leur signification", "segnali stradali e significato", "verkeersborden: wat betekent dit bord?", "trafikmärken och vad de betyder", "færdselstavler og hvad de betyder", "trafikkskilt og hva de betyr", "liikennemerkit ja niiden merkitys").

### F4: Kinds of Road Signs: Sort Them (G2, `G2-360+ TBD`, CODE `mode:'sign-kinds'`)
**Move:** CLASSIFY signs by their regulation meaning class, reading shape + colour as the code (the "soorten verkeersborden", "Gefahr, Verbot, Gebot", "pericolo, divieto, obbligo", "preventivas, restrictivas, informativas" routine).
**Child:** "Draw a line from each road sign to its group." (en 45; the bins name the groups)
**Bins (per-locale DATA `classes`):** Vienna de fr it nl sv da no fi: **warning** (red-rim point-up triangle; sv/fi YELLOW field, da white, no (reg ?) panel sets) · **not allowed** (red-rim circle; sv/fi yellow field; `no-entry` red disc white bar counts here) · **must** (blue filled circle, white symbol). de Gefahrzeichen / Verbotszeichen / Gebotszeichen; it pericolo / divieto / obbligo; fr danger / interdiction / obligation; nl waarschuwing / verbod / gebod (panel wording). STOP and the yield triangle are EXCLUDED (priority signs: a point-down triangle in a "warning" bin is the classic misconception; they are a 4th class). d3 adds **information** (blue square: `crossing` indication + 1 more the panel specifies). **en (US MUTCD): 2 bins** regulatory (STOP, YIELD, DO NOT ENTER, no bicycles R5-6) / warning (yellow diamonds: pedestrian W11-2, signal ahead W3-3, bicycle W11-1) (reg ✓). **es-MX: preventivas / restrictivas / informativas** (NOM-034 classes verbatim, reg ✓ for the classes; informativas need ≥ 2 drawable service signs from the glyph set, else es runs 2 bins). **pt-BR: advertência / regulamentação / indicação** (CTB Anexo II classes, reg ✓; same informativas caveat).
**Params:** d1 `{signs:6, bins:2}` · **d2 (ships) `{signs:8, bins:'locale.classes.length' (3; en 2), perBin:≥2}`** · d3 `{signs:10, bins:+information}`. Signs in two strip rows (≥ 64 px, G2 floor 36 is too small for a glyph inside a triangle), word bins below (`.sci-bin`-style 185 px, label pills 17 px). The bins carry WORDS only, never the shape (a shape on the bin turns it into shape matching).
**verify():** each sign stamps role + spec; the gate CLASSIFIES from the spec geometry (`shape`, `rim`, `field`) with its own table, independent of the panel's `class` tag, and asserts tag === derived class; per bin ≥ 2 signs; no `stop`/`yield` on a Vienna page; bin order ≠ strip order.
**Refusals:** none (bin count adapts per locale; the page is the same move).
**Query face:** "types of road signs" ("Verkehrszeichen nach Form sortieren: Gefahr, Verbot, Gebot", "señales preventivas, restrictivas e informativas", "placas de advertência e regulamentação", "panneaux de danger, d'interdiction et d'obligation", "segnali di pericolo, divieto e obbligo", "soorten verkeersborden", "varningsmärken, förbudsmärken, påbudsmärken", "fareskilt, forbudsskilt, påbudsskilt", "varoitusmerkit, kieltomerkit, määräysmerkit"; da "advarselstavler, forbudstavler, påbudstavler").

### F5: Road Sign Quiz: Which Sign Is It? (G2, `G2-361+ TBD`, CODE `mode:'sign-quiz'`)
**Move:** meaning → sign: READ a short situation and choose the sign that fits (the reverse direction of F2, sentence-level reading; the "verifica / évaluation / Test Klasse 2 / quiz" routine).
**Child:** "Read each sentence. Circle the road sign that fits." (en 51)
**Params:** d1 `{cards:4, chips:2}` · **d2 (ships) `{cards:6, chips:3}`** · d3 `{cards:8, chips:3}`. Card = a 1-2 sentence situation literal (≤ 90 chars; G2 text ≥ 16 px) + 3 sign chips (≥ 64 px) in a row. Situations are panel literals, 2 per role (e.g. en "Children walk to school here. Drivers must be careful." → `school`/`children`).
**Confusable pairs (never on the same card):** `children`↔`crossing`, `crossing`↔`footpath`, `stop`↔`yield`, `signal-ahead`↔`crossing`, `no-entry`↔`no-vehicles`, `school`↔`crossing` (en/es/pt). Distractors are drawn from the locale set minus the card's confusables.
**verify():** card stamps `data-lcs-role`; chips `data-lcs-role`; exactly one chip === role; no confusable pair on a card; the situation text contains no word printed inside the target sign (no "STOP/ALTO/PARE" in the stop situation, case-fold, `(?<!\p{L})…(?!\p{L})`); correct-chip slot histogram over 20 seeds ≤ 60 % per slot AND the shipped seed not a staircase (nt10-D lesson).
**Refusals:** none expected.
**Query face:** "road sign quiz" ("Verkehrszeichen Test Klasse 2", "evaluación señales de tránsito", "quiz placas de trânsito", "évaluation sécurité routière CE1", "verifica segnali stradali", "verkeersborden quiz groep 4", "trafikmärken quiz", "færdselstavler quiz", "trafikkskilt quiz", "liikennemerkit tehtäviä").

**Rejected non-moves.** safe/unsafe scene (no scene art; the lock) · "draw my way to school" (maps family; open drawing with no teaching of a sign) · colour-the-sign (either copy-colouring of a printed model, i.e. K-241's move, or colouring from memory of regulation colours, above K-G1; the demand "para colorear / coloriage / värityskuva" is served by F1 and the landing) · reflectors / helmet / seat belt "what keeps you safe" (strong Nordic demand: sv reflex, fi heijastin, no refleks; **no art**: needs a new primitive; backlog) · countdown pedestrian lights (not universal, numerals cue) · the red+amber phase (not in 6 locales) · signs for drivers only (speed limits, parking: adult/driving-test intent) · sign word-search / spelling the sign name (a spelling task, not road safety) · "finish the rule" word bank (cloze family G1-350 owns the gap; a legal rule would be country-specific) · vehicle sorting (K-210).

## C. Native rebuild ×11

Per locale the panel authors: the **sign table** (8-10 records: role, regulation code, shape, rim, field, glyph, text, class; SIGNED against the national regulation annex) · `pedLight` (A.1) · `amber` (token + word) + `amberMeans` · 2 chip words (stop/go) × 2 actors = 4 · 6-8 meaning phrases (F2) · 2-4 class bin labels (F4) · 16 situation literals (2 per role, F5) · `steps` list (+ `listenStep`) · 6 titles + 6 instructions. **0 noun forms, 0 `objForms`** (m: no frame on any face agrees with a picture noun; there are no pictures). Frames never inflect.

| loc | literals (count) | slots / forms and where | refusal / re-target | traps |
|---|---|---|---|---|
| en | table 8 + 4 + 8 + 2 + 16 + 12 | none | F4 2 bins; F1 car only; no amber on base | US signs only (STOP/YIELD/DO NOT ENTER text, yellow diamonds, SCHOOL PENTAGON); "traffic light" not "traffic signal" in the title; UK look-right never |
| de | 8 + 4 + 8 + 3 + 16 + 12 | none | none | StVO: Z 206 STOP, Z 205, Z 350 Fußgängerüberweg (blue square, white triangle), Z 136 Kinder, Z 267 Verbot der Einfahrt, Z 239 Gehweg, Z 237 Radweg, Z 131 Lichtzeichenanlage (reg ✓); "Fußgängerampel" vs "Ampel"; never "Fahrradprüfung" (Kl 4); nouns capital |
| es | 8 + 4 + 8 + 3 + 16 + 12 | none | F4 2 bins if informativas fail | MX register: "señales de tránsito" (not "de tráfico"), ALTO, "paso peatonal", "semáforo"; NOM-034 codes (reg ?); "ficha" never in title |
| pt | 8 + 4 + 8 + 3 + 16 + 12 | none | ped lights wait for `pedLight.stop` | PARE; BR regulatory = white disc red rim black symbol; "faixa de pedestres"; bare "placas de trânsito" = Detran/CNH intent: always + educação infantil / ano; "atividade" never in title |
| fr | 8 + 4 + 8 + 3 + 16 + 12 | none | none | AB4 STOP, AB3a, C20a passage pour piétons, A13a enfants, B1 sens interdit, B22a/B22b (reg ✓); car amber = "feu orange" (`codeOrange`); "bonhomme rouge / vert"; APER = landing only |
| it | 8 + 4 + 8 + 3 + 16 + 12 | none | none | CdS figure numbers (reg ?); "strisce pedonali", "semaforo pedonale" 2 or 3 lamps (`pedLamps`); "educazione stradale" feminine; "scheda" never in title |
| nl | 8 + 4 + 8 + 3 + 16 + 12 | none | none | RVV 1990: B7 STOP, B6, L2 voetgangersoversteekplaats, C2 inrijverbod, G7 voetpad, G11 fietspad (reg ✓), J-series kinderen (reg ?); car amber = "oranje"; "stoplicht" (not "verkeerslicht" in K copy) |
| sv | 8 + 4 + 8 + 3 + 16 + 12 | none | none | YELLOW-field warning triangles AND yellow-field prohibition circles and yield (reg ✓); övergångsställe sign design (reg ?: plain vs triangle glyph); definite forms never printed; "Trafik" never bare in a title; `\b` ASCII-only in any sv lint |
| da | 8 + 4 + 8 + 3 + 16 + 12 | none | none | WHITE-field warning triangles (reg ✓); vejtavle codes A/B/C/D/E (reg ?); "lyskurv"; cycle lights (cykellys) exist: never drawn |
| no | 8 + 4 + 8 + 3 + 16 + 12 | none | none | Skiltforskriften numbers (reg ?); warning-triangle field colour: panel SETS it (do not copy sv or da); "trafikklys"; bokmål; "trafikkopplæring klasse b" = driving licence intent |
| fi | 8 + 4 + 8 + 3 + 16 + 12 | situations written out inflected (no nominative token in a sentence) | none | YELLOW-field warning and prohibition signs (reg ✓); 2020 sign renumbering (reg ?: cite the current Tieliikennelaki 729/2018 annex); "liikennevalot"; "suojatie" |

## D. Data + gates

### D.1 `primitives/traffic-light.js` (NEW)
`trafficLight({kind:'car'|'ped', lamps:3|2, on:null|index, fill:'lit'|'none', pedLight, lampD})` → `{svg, meta:{kind, lamps, on, glyphs[]}}`. Housing: `roundedRect` teal 3 px stroke, `creamDeep` fill, width `lampD + 24`, lamps stacked with 10 px gaps; lamp = circle (car) or rounded square (ped) `white` fill, teal 2 px ring. `on` lamp: `codeColors[COLOUR[kind][on]]` when `fill:'lit'`, plus 8 ink rays (length 0.25·lampD, 3 px) outside the ring; unlit ped lamps show the figure OUTLINE (ink 2 px), the lit one the filled figure (white on colour for en walker). Glyphs from `road-pictogram.js`. Min `lampD` 56 at K. Ships with `qa/verify-b5-traffic-light.js` that parses the RENDER (counts ray groups, finds the lamp centre each ray group surrounds, reads its index from y order) and never reads `meta`.

### D.2 `primitives/road-sign.js` (NEW; the highest-correctness-risk primitive of the batch)
`roadSign({shape:'octagon'|'triUp'|'triDown'|'circle'|'square'|'diamond'|'pentagon'|'crossbuck', rim:{color,ratio}, field, glyph, text, size})` → `{svg, meta}` stamping `data-lcs-sign-shape/-rim/-field/-glyph`. Closed glyph set (the panel may not add one): `walker`, `walkerOnStripes`, `crossingTriangle` (white triangle holding walkerOnStripes, the Vienna indication), `twoChildren`, `adultChild`, `bicycle`, `trafficLightMini`, `bar` (no-entry), `slash`, `text`. Rim ratio per shape from the regulation (Vienna triangle rim ≈ 1/12 of side, *est.*, panel cites). Text in Baloo 2 800, white on red (STOP/ALTO/PARE) or red on white (YIELD, CEDA EL PASO), measured to fit (`DO NOT ENTER` two lines). Ships with `qa/verify-b5-road-sign.js`: re-parses the svg, classifies the polygon (vertex count, orientation, rim present, field colour), asserts the glyph inside the field box, text ≥ 9 px.

### D.3 `primitives/road-pictogram.js` (NEW)
`walkerPictogram({pose:'stand-kerb'|'walk-stripes'|'look-left'|'look-right'|'look-both'|'listen'|'standing'|'walking'|'hand'})`, `carPictogram({state:'stopped-line'|'moving'})`: flat ink silhouettes (no faces), BACK view for the `look-*` poses, arrows as ink chevrons; kerb = a 6 px teal band; stripes = 4 ink bars. Pictogram box ≥ 80 px (chips) / ≥ 120 px (F3).

### D.4 Bank `data/b5/road-safety.js` + `data/b5/locales/road-safety.<loc>.json` via `lib/b5-common.js bank('road-safety', loc)`
```js
// data/b5/road-safety.js (locale-neutral)
module.exports = {
  roles: ['stop','yield','crossing','children','school','no-entry','no-vehicles','no-bikes','footpath','bike-path','signal-ahead','bike-warning','railroad','information-2'],
  classOfGeometry: { triUp:'warning', diamond:'warning', pentagon:'warning', 'circle+rim':'prohibition', 'circle+fillBlue':'mandatory', square:'information', octagon:'priority', triDown:'priority' },
  confusable: [['children','crossing'],['crossing','footpath'],['stop','yield'],['signal-ahead','crossing'],['no-entry','no-vehicles'],['school','crossing']],
  lightRule: { ped:{0:'stop',1:'go'}, car:{0:'stop',1:'stop',2:'go'} },
  stepKinds: ['stop-kerb','look-left','look-right','look-both','walk-across','listen'],
};
// data/b5/locales/road-safety.<loc>.json (panel-authored, signed)
{ "signs": { "stop": {"code":"Z 206","regRef":"StVO Anlage 2","shape":"octagon","rim":null,"field":"red","glyph":"text","text":"STOP","class":"priority","signedBy":"…"}, … },
  "setG1": ["stop","crossing","children","no-entry","footpath","bike-path"],
  "classes": [ {"key":"warning","label":"…"}, {"key":"prohibition","label":"…"}, {"key":"mandatory","label":"…"} ],
  "pedLight": { "stop":"standing", "go":"walking", "stopColor":"red", "goColor":"green", "lamps":2 },
  "amber": { "token":"codeYellow", "word":"gelb" }, "amberMeans":"stop",
  "chipWords": { "ped":{"stop":"…","go":"…"}, "car":{"stop":"…","go":"…"} },
  "meanings": { "stop":"…", … }, "situations": { "stop":["…","…"], … },
  "steps": ["stop-kerb","look-left","look-right","look-left","walk-across"], "listenStep": null,
  "strings": { "base":{"title":"…","instruction":"…"}, "colour-lights":{…}, "crossing-steps":{…}, "sign-meaning":{…}, "sign-kinds":{…}, "sign-quiz":{…} } }
```
nt10-D trap carried: `apply-b5-locale.js` writes both `strings.<mode>` and `i18n/strings.<loc>.json[<ID>]`; `check-b5-string-parity.js` asserts the printed string === the gated one.

### D.5 Validator rules (`tools/validate-b5-draft.js`, key `road-safety`)
1. Every sign record has `code`, `regRef`, `signedBy` non-empty; `shape/field/glyph` in the closed sets; `text` only on `glyph:'text'`.
2. `classOfGeometry(shape, rim, field)` === record `class` for every sign (a point-down triangle can never be `warning`).
3. `setG1` = 6 distinct roles all present in `signs`; no confusable pair missing a distinct meaning literal.
4. `classes` length 2-4; every class used on F4 has ≥ 2 signs in the table; Vienna locales exclude `priority` from `classes`.
5. `pedLight.stop ∈ {standing, hand}`, `go = walking`, colours ∈ codeColors keys or `white`; `lamps ∈ {2,3}`; en `stop = hand`.
6. `amber.token ∈ {codeYellow, codeOrange}`; `amber.word` equals the locale's `COLOR_WORDS` value for that token (m, `data/color-words.js`) or a panel-recorded override.
7. `steps` starts with `stop-kerb`, ends with `walk-across`, contains `look-left` before `look-right` (right-hand traffic), length 3-6.
8. No meaning / situation contains the target sign's printed `text` (letter-boundary, case-fold, NFC); every situation ≤ 90 chars, ≤ 2 sentences.
9. Instructions ≤ 150 chars, one sentence (fi two only with a recorded reason), name only apparatus on the face (F1 names the colours it uses; F3 names the numerals; no "tick", no "cut").
10. Titles ≤ 70 chars, carry the child anchor (never the bare sign word: "Verkehrszeichen", "placas de trânsito", "trafikkskilt" alone fail), never the `vehicles` theme name or K-210's name, no worksheet-word, no visible "free", unique across the 6 faces.
11. No title/meta/landing promises an answer key (printable-only ruling).
12. Every key in `strings` is one of the 6 mode strings.

**Poison cases (each must FAIL; the correct draft is the control):** P1 yield (`triDown`) tagged `warning` · P2 de `crossing` drawn as a yellow diamond (US spec in a Vienna locale) · P3 pt `stop.text = "STOP"` · P4 es `stop.text = "PARE"` · P5 sv warning triangle `field:'white'` · P6 da warning triangle `field:'yellow'` · P7 nl `amber.token = codeYellow` with word "oranje" (token/word mismatch) · P8 en `pedLight.stop = 'standing'` · P9 `steps` with `look-right` before `look-left` · P10 stop situation "Here is a STOP sign." · P11 a Vienna `classes` containing `priority` · P12 title "Verkehrszeichen" (bare sign word) · P13 sign record without `signedBy` · P14 F5 card set {`children`, `crossing`, `stop`} with target `children` (render-level) · P15 base car card with two lamps lit (render-level) · P16 F3 `look-left` arrow pointing to the viewer's right (render-level mirror) · P17 F1 lamp pre-filled red (render-level answer leak).

### D.6 `qa/verify-b5-road-safety.js` (render assertions, every face × 11 locales × 20 seeds)
Floors: K lamp diameter ≥ 56, K pictogram chips ≥ 80, K numeral box ≥ 56; G1 signs ≥ 72, G1 text ≥ 16; G2 signs ≥ 64, G2 text ≥ 16. **Answers re-derived from the render:** base/F1 from the lit/on lamp INDEX (y order of lamp centres) × `lightRule`; F4 class from the parsed sign polygon + fill (gate's own table); F2/F5 from role stamps cross-checked against the parsed glyph (a `twoChildren` glyph must sit in the `children`/`school` sign). Uniqueness: one lit lamp per light, one matching chip per card, one class per sign, one correct chip per F5 card. No answer printed: F1 0 filled lamps; F3 0 numerals in boxes; F2 no meaning adjacent to its sign on the same row (≤ 1 straight-across); F5 no target text in the sentence. **Greyscale decodability:** render at `filter:grayscale(1)` and assert rim-only vs filled circles differ in mean luminance ≥ 25 %, rays present on every on-lamp. Answer-position spread both directions + the shipped seed (nt10-D staircase lesson). The 722 stack with a 3-line title + 3-line instruction in de/fi/pt; `minmax` rows; no overflow; no text < 9 px; palette tokens + codeColors inside `[data-lcs-signal]` only.

Layout budgets (*est.*, engineer measures): base 3×2 cards 205 × 320 (light 84 × 212 + chips 2 × 80) → 656 · F1 3×2 lights 84 × 220 (d2 `lampD:60`) → 2 × 250 = 500 · F3 3 + 2 cards 190 × 190 → 400 · F2 6 rows × 92 → 552 · F4 strip 2 × 80 + 12 + bins 211 → 383 · F5 3 rows × 2 cards 300 × 190 → 590.

## E. SEO

Title patterns (the panel writes the native literal; ≤ 70 chars; engine appends the worksheet-word; the base owns the bare head, each face adds ONE element):

| face | Germanic (en / de / nl) | Romance (es / pt / fr / it) | Nordic + fi (sv / da / no / fi) |
|---|---|---|---|
| base | Road Safety: Traffic Lights, Stop or Go / Verkehrserziehung: Die Ampel / Verkeer: het stoplicht | Educación vial: el semáforo / Educação no trânsito: o semáforo / Sécurité routière : les feux / Educazione stradale: il semaforo | Trafik: trafikljuset, stanna eller gå / Færdselslære: lyskurven / Trafikkopplæring: trafikklyset / Liikenneturvallisuus: liikennevalot |
| F1 | Color the Traffic Lights / Verkehrserziehung: Ampel ausmalen / Verkeer: stoplicht kleuren | Educación vial: colorea el semáforo / Educação no trânsito: pinte o semáforo / Sécurité routière : colorier les feux / Educazione stradale: colora il semaforo | Trafik: färglägg trafikljuset / Færdselslære: farvelæg lyskurven / Trafikkopplæring: fargelegg trafikklyset / Liikenneturvallisuus: väritä liikennevalot |
| F3 | Crossing the Road Safely: Put the Steps in Order / Sicher über die Straße: die richtige Reihenfolge / Veilig oversteken: de goede volgorde | Educación vial: cómo cruzar la calle / Educação no trânsito: como atravessar a rua / Traverser la rue en sécurité / Educazione stradale: come attraversare la strada | Gå säkert över gatan / Færdselslære: sådan går du over vejen / Trafikkopplæring: slik går du over veien / Tien ylitys turvallisesti |
| F2 | Traffic Signs and Their Meanings / Verkehrszeichen und ihre Bedeutung / Verkeersborden: wat betekent dit bord? | Señales de tránsito y su significado / Placas de trânsito e seus significados / Panneaux de signalisation et leur signification / Segnali stradali e il loro significato | Trafikmärken och vad de betyder / Færdselstavler og hvad de betyder / Trafikkskilt og hva de betyr / Liikennemerkit ja niiden merkitys |
| F4 | Types of Traffic Signs: Sort Them / Verkehrszeichen sortieren: Gefahr, Verbot, Gebot / Soorten verkeersborden sorteren | Señales preventivas, restrictivas e informativas / Tipos de placas de trânsito / Les panneaux de danger, d'interdiction et d'obligation / Segnali di pericolo, divieto e obbligo | Sortera trafikmärken: varning, förbud, påbud / Færdselstavler: advarsel, forbud, påbud / Trafikkskilt: fare, forbud, påbud / Varoitus-, kielto- ja määräysmerkit |
| F5 | Traffic Signs Quiz / Verkehrszeichen-Quiz für die Grundschule / Verkeersborden quiz | Señales de tránsito: evaluación / Placas de trânsito: quiz / Panneaux de signalisation : évaluation / Segnali stradali: verifica | Trafikmärken: quiz / Færdselstavler: quiz / Trafikkskilt: quiz / Liikennemerkit: tehtäviä |

Meta MIDDLEs (en; natives each; whole description 120-170):
- base: "Children look at the light that is on and circle what to do: stop or go, for walkers and for cars"
- F1: "Children find the lamp that is on in each traffic light and colour it red, yellow or green"
- F3: "Children number five pictures to show how to cross the road: stop, look left, right and left again, then walk"
- F2: "Children draw a line from each road sign to what it means, using the signs of their own country"
- F4: "Children sort road signs into warning, not allowed and must signs by reading their shape and colour"
- F5: "Children read a short sentence about the road and circle the sign that fits it"

`coordinate` per face: `{type:'road-safety', mode:'base'|'colour-lights'|'crossing-steps'|'sign-meaning'|'sign-kinds'|'sign-quiz', level: LEVEL_KEYS[loc][K|K|K|G1|G2|G2], theme:''}` (m: `gen-b2-landings.js:51-63`; no = `1-trinn` / `2-trinn` / `3-trinn`).

Non-cannibalisation (est. word 3-gram Jaccard of title+meta):
| pair | est. J | fence |
|---|---|---|
| base vs F1 (both traffic lights) | 0.20 | "stop or go" vs "colour"; circle vs crayon |
| F2 vs F5 (both sign meaning) | 0.18 | "and their meanings" / line vs "quiz / evaluation" / sentence |
| F2 vs F4 | 0.12 | meaning vs kinds/sort |
| F3 vs any | ≤ 0.08 | crossing / steps / order |
| base vs K-210 "Land, Water, and Air Transportation" | 0.03 | never "vehicles/transportation" |
| F1 vs K-241/K-266 colour-by-code/number | 0.05 | never "by code/by number" |
| F4 vs K-368 2d-shapes / geometry sorts | 0.04 | never shape names |
| F3 vs G1-203 science-sequence | 0.04 | never "sequence / life cycle" |

## F. Open questions + summary

**Engineer must measure:** lamp and chip sizes in a 205 px K card with a 3-line de title; the ray marks' legibility in greyscale; the smallest sign at which `twoChildren`/`bicycle` glyphs inside a triangle stay recognisable (proposed ≥ 64 px, *est.*); `DO NOT ENTER` / `CEDA EL PASO` text fit; the F3 back-view look-left pictogram legibility at 120 px; the palette-lint allow-list scoped to `[data-lcs-signal]`; whether `codeYellow #E0A800` reads as a sign yellow on cream.

**Only a native panel can rule (SIGNED, before build):** every regulation code marked (reg ?) and each sign's exact glyph (sv/da/no/fi/nl pedestrian-crossing design: plain walker on stripes vs inside a white triangle; es-MX SP-32/SP-33; pt-BR A-32b/A-33a/b and R-3; it CdS figure numbers; nl J-series "kinderen"); the no warning-triangle field colour; pt `pedLight.stop` (figure or hand) and es-MX confirmation; it `pedLamps`; es/pt informativas/indicação: ≥ 2 drawable service signs or 2 bins; chip words (register "go" vs "walk"); the national crossing routine wording and whether "listen" is a K step; fr K "feu tricolore" vs "feu" in the title; sv/no title compounds (never bare "Trafik"); subject bucket and the new `'Road Safety'` strand literals.

**Summary.** Six faces: base K Traffic Lights, Stop or Go (lit lamp → circle stop/go; pedestrian AND car lights, actor-keyed chips; en = US hand/walker) · F1 K Colour the Traffic Lights (the lamp that is on → colour by position; amber crayon yellow, fr/nl orange; en car lights only) · F3 K Crossing the Road: the Steps (stop, look left, right, left, walk; 1-5; no lights) · F2 G1 Road Signs and Their Meanings (6 national regulation signs → meaning phrases) · F4 G2 Kinds of Road Signs (warning / not allowed / must by shape + colour; en 2 bins, es-MX/pt-BR their own classes) · F5 G2 Road Sign Quiz (sentence → circle the sign). Refusals at design time: none (66/66), conditional on the signed per-locale sign review; pt pedestrian lights wait for one data field. Pictures: 0 (all opened candidates rejected). New: `primitives/{traffic-light,road-sign,road-pictogram}.js` with render-measuring verifies; bank `data/b5/road-safety.js`.
