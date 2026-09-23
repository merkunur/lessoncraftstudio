# K-368 `2d-shapes`: pedagogy + content design (2026-09-23)

Read: `_ROLE-PEDAGOGY`, `_STUDIO-BRIEF`, `_SUBSTRATE`, `_PANEL-FINDINGS` (row 1 + cross-panel rulings), the `2d-shapes` sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `types/k/K-070,075,076,077,078,079,080,265`, `types/g2/G2-234,241,243,244,245,246`, `types/g3/G3-340`, `types/_shared/geometry-tasks.js` (modes + the QUAD_CLASS/diamond note), `lib/shape-data.js`, `primitives/{tangram,dot-figure,sym-grid,grid-copy}.js` (exports), `frontend/lib/seo/strand-names.ts:58-70`, `scripts/seo-landing/gen-b2-landings.js LEVEL_KEYS`, `topics-taxonomy.json`, `frontend/content/seo-landing/en.json` (theme=`shapes` coordinates). (m) = measured by read-only node 2026-09-23; (o) = picture OPENED with the Read tool this session; *est.* = engineer measures in a real render. No em-dashes.

**Boundary (load-bearing).** The `geometry` family already owns every attribute and comparison move on shapes: K-070 find shapes LIKE a model (no name), K-075 count sides, K-076 / G2-241 sort by number of sides, K-077 shape patterns, K-078 shape twins, K-079 big/small, K-080 odd shape out, K-265 colour by shape code, G2-234 partition, G2-242/245/246 faces/edges/vertices, G2-243 solids in real life, G2-244 flat vs solid, G3-340 classify quadrilaterals; tangram K-353/K-358/K-359/G1-354/G1-355/G2-347 owns composing with pieces AND counting triangles/squares inside a figure (K-359 prints shape names only as count labels). A third, easily missed neighbour (m): the `matching` app mode `name` × theme `shapes` ("Picture Word Match for Kindergarten – Shapes", 11 locales), plus `crossword`/`wordsearch` × `shapes`: library shape PICTURES (prototypical art incl. star/heart/moon/oval) matched by a LINE to their word. This family therefore owns only: **the shape NAME in both directions on exact, non-prototypical drawings** (shape → name, name → shape), **defining-attribute recognition against near-misses** (rotated, skinny, gap, curved side, rounded corner), **flat shapes in real objects**, **shape riddles** (attributes → name), **writing the name**, **drawing a named shape on dots**. Every shape on every face except F2 is drawn by a NEW primitive with exact geometry, never a library picture (the `shapes/diamond` art is a 45° square that 10 of 11 locales name "rhombus", `geometry-tasks.js` note; library shape art is prototypical and is K-078/matching territory). No face counts sides as its task, sorts by sides, matches shape to shape, colours by shape, or uses 3D.

## A. Identity

| field | value |
|---|---|
| key / bands | `2d-shapes` / base **K-368 K**; F2 F5 **K** (`K-371+ TBD by the emitter`); F1 F3 F4 **G1** (`G1-381+ TBD`). `default_subject: math`, `default_age_range: 5-7`, `assetClass: geometry`, `exerciseType: 2d-shapes`. |
| taxonomy (m) | `apps['2d-shapes']` ABSENT, `axes['exercise-type']['2d-shapes']` ABSENT: register both (shape of `apps.geometry`). `axes.theme.shapes` = en Shapes · de Formen · es/pt Formas · fr Formes · it Forme · nl Vormen · sv/da/no Former · fi Muodot: every name ×11 is a COMPOUND head and never the bare theme word. `geometry.name` = Geometry · Geometrie · Geometría · Géométrie · **Forme geometriche** (it) · Geometria (pt, fi) · Meetkunde · Geometri (sv, no) · **Geometri og former** (da): the new name must not equal or contain these strings (it must not lead with "Forme geometriche"; da must not use "former og figurer", the near-duplicate the Nordic panel flagged). |
| theme axis | **OFF** on all six faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. Five faces draw 0 library pictures; F2 uses a FIXED 9-noun object bank (below) read through `lib/b3-picture-index.js` (throws on a missing picture). |
| `unitAxis` | **not applicable** (the shape inventory is a per-locale data list, not a fan). |
| the one rule | **Every closed answer is re-derived from exact vertex geometry, never read off a label.** The primitive stamps `data-lcs-verts` (rounded vertex list) + `data-lcs-variant`; the gate owns an independent `classify(verts, variant)` (side count, equal sides ±1%, right angles ±1°, fillet/gap/curve flags) and every answer is `classify(...) === target`. Plus the **square/rectangle rule**: K/G1 treat them as separate names; a rectangle target never co-occurs with a square figure, a square card never offers a "rectangle" chip, and the answer key is always the most specific name. |
| shape inventory (m, vocab `shapes` theme ×11) | core 4 at K and G1: circle, square, triangle, rectangle (en K.G.A.2, pt EF01MA14 verbatim, fr GS list, de Vorschule/Kl 1). Optional 5th `hexagon` per locale flag (en K.G.A.2 lists it; fr CE1+, de Kl 1-2; panel rules `inventory.hexagon`). Never at K/G1 closed answers: oval (not a school term in de/nl), rhombus/diamond (d3 only, locale data), star, heart, moon. |
| name literals | seeded from `image-vocabulary.js` `shapes` singulars (m): en Circle Square Triangle Rectangle Hexagon · de Kreis Quadrat Dreieck Rechteck Sechseck · es Círculo Cuadrado Triángulo Rectángulo Hexágono · pt Círculo Quadrado Triângulo Retângulo Hexágono · fr Cercle Carré Triangle Rectangle Hexagone · it Cerchio Quadrato Triangolo Rettangolo Esagono · nl Cirkel Vierkant Driehoek Rechthoek Zeshoek · sv Cirkel Kvadrat Triangel Rektangel Sexhörning · da Cirkel Kvadrat Trekant Rektangel Sekskant · no Sirkel Kvadrat Trekant Rektangel Sekskant · fi Ympyrä Neliö Kolmio Suorakulmio Kuusikulmio. Stored in the b5 bank as panel-confirmed literals (the panel may override, e.g. fr K "rond"), displayed via `displayWord` (lower-case, de keeps case). |
| CCSS (en, honest) | base **K.G.A.2** · F1 **1.G.A.1** (defining vs non-defining) + K.G.A.2 · F2 **K.G.A.1** · F3 **K.G.A.2** production (G1 page; no G1 code claims writing) · F4 **1.G.A.1** · F5 **K.G.B.5**. Strand row `'Geometry'` exists ×11 (m, `strand-names.ts:58-70`; es "Forma, espacio y medida", fr "Espace et géométrie", it "Spazio e figure", da "Geometri og måling"). |

| loc | genre head (panels) | school year (K / G1) | national strand (framework NAME) | CCSS |
|---|---|---|---|---|
| en | **2D Shapes** (A; "2d shapes names", "found at home", "with answers") | kindergarten / grade 1 | Geometry | per face above |
| de | **Geometrische Formen** (A; "erkennen", "Eigenschaften", "zeichnen", "Rätsel"; Klasse 1 densest) | Vorschule / 1. Klasse | Lehrplan Mathematik: Raum und Form | none named |
| es (MX) | **Figuras geométricas planas** / **y sus nombres** (A; "adivinanzas", "en objetos") | preescolar / primer grado | SEP/NEM: Forma, espacio y medida | none named |
| pt (BR) | **Figuras geométricas planas** (A; "nomes", "1 ano"; BNCC EF01MA14 term) | educação infantil / 1º ano | BNCC: Geometria | none named |
| fr | **Les figures planes** / **reconnaître les formes géométriques** (A; "et leurs noms", "tracer") | maternelle (GS) / CP | programmes: Espace et géométrie | none named |
| it | **Figure geometriche piane** (A; "classe prima", "nomi", "verifica") | infanzia / classe prima | Indicazioni nazionali: Spazio e figure | none named |
| nl | **Vlakke figuren** (B; "benoemen", "herkennen", "werkblad") | kleuters / groep 3 | SLO kerndoelen: Meetkunde | none named |
| sv | **Geometriska former** / "geometriska figurer" (A; "förskoleklass", "åk 1", "namn") | förskoleklass / åk 1 | Lgr22: Geometri [NSR] | none named |
| da | **Geometriske figurer** (A-; "til print", "1 klasse") | børnehaveklasse / 1. klasse | Fælles Mål: Geometri og måling [NSR] | none named |
| no | **Geometriske figurer** (B+; "1 trinn", "med navn") | 1. trinn / 2. trinn | LK20: Geometri [NSR] | none named |
| fi | **Tasokuviot** / "geometriset muodot" (B; "alkuopetus", "nimet") | esikoulu / 1. luokka | OPS 2014: Geometria [NSR] | none named |

## B. The six faces

Shared: NEW `primitives/flat-shape.js` (D.1) for every drawing except F2's pictures; NEW `templates/components-b5/2d-shapes.js`. Reuse `cardGrid`, `pillChoice`, `rulingBlock`, `wordBank`, `answerBox`/`blankNumeralBox` rules, `.ws-card .ws-card-stage .ws-bin .ws-lane`, `rng.sample/shuffle`. Drawing: cream fill, teal 3 px stroke, `stroke-linejoin:round` (except the `round`-corner near-miss, whose fillet is geometry, not linejoin). No text inside any drawing. Every stage stamps `data-ws-content`. **Misconception rule on every closed face:** among true examples of a target, ≥2 rotated off the axis by 15-75°, ≥1 "skinny" (triangle short/long side ≤ 0.35, rectangle aspect ≥ 2.2), and sizes vary ≥ 1.8× within a page.

### Base: 2D Shapes: Name the Shape (K-368, K, PARAM ladder)
**Move:** READ a name and match it to an exact, turned drawing (shape → name).
**Child:** "Look at each shape. Circle its name." (35 chars en)
**Params:** d1 `{cards:4, kinds:[circle,square,triangle,rectangle], chips:2, turned:1}` · **d2 (ships) `{cards:6, kinds:core4, chips:3, turned:2, skinny:1, turnedSquare:1}`** · d3 `{cards:6, kinds:core4+hexagon if inventory.hexagon, chips:3, turned:3, skinny:2}`. Each card: one figure (bbox long side 104-128 px, short ≥ 30 px) over a vertical stack of `chips` name pills (stacked, because fi "suorakulmio"/pt "retângulo" 3-across does not fit a 205 px card, *est.*). d2 guarantees every core name appears ≥1, exactly two names repeat, and ONE card is a square turned 45° (the "that's a diamond" misconception, K.G.A.2 verbatim). Chip sets obey the square/rectangle rule: a square card never offers `rectangle`; a rectangle card may offer `square` (wrong, correctly).
**verify():** per card `data-lcs-verts`, `data-lcs-variant="none"`, chips `data-lcs-chip=<kind>`; answer = the chip whose kind === `classify(verts)`; assert exactly one chip matches, no square card has a rectangle chip, answer chip position spread across ≥2 of 3 slots on the page.
**Refusals:** none expected. fr K register "rond" vs "cercle" = a literal choice, not a refusal.
**Query face:** the bare head + "names" ("2d shapes names", "y sus nombres", "et leurs noms", "benennen", "benoemen", "med navn", "nimet").

### F1: 2D Shapes: Real or Not? (G1, `G1-381+ TBD`, CODE `mode:'real-or-not'`)
**Move:** name → shape against NEAR-MISSES: decide which figures truly ARE the named shape (the defining attribute, Clements-Sarama set).
**Child:** "Read the shape name in each row. Circle every shape that really is that shape." (80 chars en)
**Params:** d1 `{rows:['triangle','rectangle'], perRow:4}` · **d2 (ships) `{rows:['triangle','rectangle','square'], perRow:4}`** (12 figures = G1 max) · d3 `{rows:['triangle','rectangle','square','circle'], perRow:4}`. Per row: `trueCount` rng in 1..3 (≥1 true, ≥1 false). True pool: triangle {equilateral turned, right, obtuse, skinny scalene}; rectangle {turned 20-70°, aspect 1.5-3.0, skinny ≥2.2}; square {axis, turned 45°, turned 20°, small}; circle {small, large}. Near-miss pool: triangle {gap, curvedSide, roundCorner, 4-sided kite}; rectangle {parallelogram 70°, trapezoid, roundCorners, gap} and **never a square**; square {rectangle aspect ≥1.5, rhombus 60°, gap, roundCorners}; circle {ellipse aspect ≥1.4, gap arc, circle with one flat chord}. The row label is a name pill only (no model drawing: a model would make it K-070).
**verify():** each figure stamps `data-lcs-verts` + `data-lcs-variant`; row stamps `data-lcs-target`; answer set = figures where `classify(verts,variant) === target`; assert trueCount∈[1,3], rectangle row contains no `classify=square`, every near-miss variant is measurable (gap ≥ 10 px and ≥ 12% of its side; sagitta ≥ 15% of side; fillet radius ≥ 20% of shortest side; ellipse aspect ≥ 1.4; rectangle aspect ≥ 1.5 wherever a square is the target).
**Refusals:** none expected.
**Query face:** "recognise / erkennen / reconocer / reconhecer / reconnaître / riconoscere / herkennen": the identification sub-skill.

### F2: 2D Shapes Around Us (K, `K-371+ TBD`, CODE `mode:'around-us'`)
**Move:** find the flat shape IN a real object (K.G.A.1): picture → circle or rectangle.
**Child:** "Look at each thing. Draw a line to its shape: circle or rectangle." (65 chars en; the panel inlines its two shape names)
**Params:** d1 `{items:6, split:[3,3]}` · **d2 (ships) `{items:8, split:[4,4]}`** · d3 `{items:9, split:[5,4]}`. Two `.ws-bin` targets, each labelled with a drawn shape (primitive) AND its name pill; object pictures ≥ 72 px in a strip or 2×4 grid. Object bank (all (o), all present with vocab ×11 and not in `B2_EXCLUDE` (m)): **circle** `classroom/clock` (flat front clock face) · `around the house/plate` · `At the Supermarket/pizza` (whole, top view) · `bakery/cookie` · `desserts and sweets/lollipop` (round candy on a stick); **rectangle** `around the house/door` · `post office/envelope` · `classroom/whiteboard` · `classroom/notebook` (upright, slight tilt; aspect ≈0.72). Opened and REJECTED: `around the house/window` (arched top) · `furniture/mirror` + `around the house/mirror` (oval / arched) · `summer/watermelon` (half disc) · `camping/tent` · `bakery/pie` (3D wedge) · `At the Supermarket/cheese` (3D wedge) · `christmas/tree` (layered, star on top) · `toys/kite` (kite quadrilateral) · `toys/cards` (overlapping, diamond suit) · `around the house/television` (3D, rounded) · `4th of July/flag` (waving) · `classroom/book` (3D) · `around the house/rug` (near-square aspect ≈0.84: square/rectangle ambiguity) · `around the house/cushion` · `classroom/paper` · `post office/letter` · `post office/stamp` (perforated, scene) · `bakery/waffle` · `bakery/toast` · `breakfast/biscuit` · `accessories/badge` · `toys/chess` · `vehicles/sailboat` (the sail is a triangle but the outline is not). **Measured honest ceiling: NO library object is a clean square or triangle**, so this face is circle/rectangle only; it never shows a square or triangle bin (a bin no picture can enter teaches "never triangle"). `around the house/clock` is a second clock (thick rim, 3/4 view): excluded to keep one clock per page.
**verify():** each picture stamps `data-lcs-noun` + `data-lcs-answer` from the bank's own `shape` field (independent of the picture index); assert split matches config, every noun `picOpened:true`, no noun twice, bins exactly {circle, rectangle}.
**Refusals:** none (pictures locale-neutral; only the two name pills are words).
**Query face:** "found at home / in der Umwelt / en objetos / no dia a dia / autour de nous / intorno a noi / om je heen / i vardagen / omkring os / rundt oss / ympärillämme".

### F3: 2D Shapes: Write the Names (G1, `G1-382+ TBD`, CODE `mode:'write-name'`)
**Move:** PRODUCE the name in writing (shape → written word), with a word box as spelling support.
**Child:** "Look at each shape. Write its name on the line. The words are in the box." (73 chars en)
**Params:** d1 `{cards:4, bank:true, bankKinds:core4}` · **d2 (ships) `{cards:6, bank:true, bankKinds:core4 (+hexagon if inventory.hexagon), turned:2, skinny:1}`** · d3 `{cards:6, bank:false}`. Card = figure (≥ 80 px) + one `rulingBlock` row (G1 glyphH ≥ 32 *est.*, row ≥ 60 % card width); NO letter boxes (their count would give away length). The word bank at top prints each name once, in shuffled order.
**verify():** card stamps verts; the key = `classify(verts)` name; assert bank contains every answer, bank order ≠ answer order, no name printed on or under its own figure.
**Refusals:** none expected; fi "suorakulmio" (11 letters) must fit the row at glyphH ≥ 32 (*est.*, engineer measures).
**Query face:** "write the names / Namen schreiben / escribe el nombre / escreva o nome / écrire le nom / scrivi il nome / namen schrijven / skriv namnet / skriv navnet / kirjoita nimi".

### F4: 2D Shape Riddles (G1, `G1-383+ TBD`, CODE `mode:'riddles'`)
**Move:** REASON from attributes (sides, corners, round, equal sides) to the name; the attribute count is the clue, not the task.
**Child:** "Read each riddle. Circle the name of the shape." (47 chars en)
**Params:** d1 `{cards:4, chips:3}` · **d2 (ships) `{cards:6, chips:3}`** · d3 `{cards:6, chips:4, includeHexagon:true}`. Card = a two-sentence riddle literal ("I have 3 sides and 3 corners. What am I?") + stacked name chips; no drawing (a drawing would turn it into F-base). Riddles are bank literals, 2 per kind; square vs rectangle riddles are single-answer by construction ("All my 4 sides are the same length." vs "I have 2 long sides and 2 short sides.").
**verify():** card stamps `data-lcs-riddle=<kind>:<i>`; answer = kind; assert the answer name string does not occur in the riddle text (case-folded, NFC), exactly one chip = kind, and a square riddle never shares a page-card chip set with `rectangle` unless the riddle states "2 long and 2 short" (and vice versa).
**Refusals:** none expected; fr register for "coins" vs "sommets" at CP = literal choice.
**Query face:** "riddles / Rätsel / adivinanzas / adivinhas / devinettes / indovinelli / raadsels / gåtor / gåder / gåter / arvoitukset".

### F5: Draw 2D Shapes on Dots (K, `K-372+ TBD`, CODE `mode:'dot-draw'`; OPEN, no verify)
**Move:** name → DRAW (K.G.B.5): the child produces the shape from its name on a dot lattice.
**Child:** "Read the shape name. Join the dots to draw that shape." (54 chars en)
**Params:** d1 `{cards:4, kinds:[square,rectangle,triangle,triangle], givenSide:0}` · **d2 (ships) `{cards:4, kinds:[square,rectangle,triangle,triangle], givenSide:2}`** · d3 `{cards:6, kinds:+[square,rectangle], givenSide:3}`. Card = name pill + a 6×6 square dot lattice (pitch ≥ 30 px, dot r 4, `T.teal`). `givenSide:n` = on n cards one side is pre-printed coral between two lattice points on a SLANT (vector (1,2) or (2,1)), so the child must complete a TURNED square/triangle: the non-prototypical move produced by hand. Circle never appears (not drawable on dots).
**verify():** none (open). Layout gate only: every pre-printed side joins two lattice points, and a slanted square/rectangle completion exists wholly inside the lattice (check both perpendicular completions).
**Refusals:** none expected.
**Query face:** "draw on dot paper / zeichnen Punktefeld / dibuja en puntos / malha pontilhada / tracer sur quadrillage de points / disegna sui puntini / tekenen op stippen / rita på prickar / tegn på prikker / piirrä pisteisiin".

**Rejected non-moves.** count sides / count corners (K-075, G2-246), sort by sides (K-076/G2-241), find-like-model (K-070), shape twins (K-078), odd shape out (K-080), big/small (K-079), shape patterns (K-077), colour by shape (K-265), flat vs solid / solids (G2-243/244), partition (G2-234), compose with pieces (tangram), trace-and-name (a tracing-lane repeat of base; tracing families own the stroke), picture-word match on library shape art (`matching` name × `shapes`), "circle the rectangles" including squares (the square/rectangle rule).

## C. Native rebuild ×11

Per locale the panel authors: 5 name literals (+`inventory.hexagon` bool) · 10 riddle literals (2 per kind; 8 if hexagon=false) · 6 instructions + 6 titles · bin labels = the name literals (no new forms) · 0 noun forms (F2 prints no object words). Frames never inflect; no `objForms` needed (m: nothing on any face agrees with a picture noun).

| loc | literals (count) | slots/forms and where | refusal / re-target | traps |
|---|---|---|---|---|
| en | 5 + 10 + 12 | none | none | "diamond" never a K answer; "corners" at K/G1, "vertices" not before G2 |
| de | 5 + 10 + 12 | nouns keep capital in chips (`KEEP_CASE`) | none | "Formen legen" = tangram (never a title); "Körper" = G2-244; Quadrat is a Rechteck in Kl 3-4: key = most specific |
| es | 5 + 10 + 12 | none | none | es-MX; "ficha" never in title; "lados"/"vértices" SEP 1°; "aristas" = 3D, out |
| pt | 5 + 10 + 12 | none | none | "figuras geométricas planas" (fundamental) vs "formas" (EI): K title may use the EI word only if distinct from the pt geometry landing "formas geométricas educação infantil"; "família silábica" irrelevant here; "atividade" never in title |
| fr | 5 + 10 + 12 | none | none | K: panel picks "rond" or "cercle" for the base/F2/F5 name literal (GS), CP faces "cercle"; "sommets" vs "coins" at CP; "fiche" never in title |
| it | 5 + 10 + 12 | none | none | title must lead with "Figure geometriche piane", never "Forme geometriche" (the geometry name) |
| nl | 5 + 10 + 12 | none | none | "vormen" alone = theme slug + dictation noise; "vlakke figuren" leans Flemish, panel may prefer "vormen" + groep word in K titles |
| sv | 5 + 10 + 12 | none | none | "fyrkant" colloquial vs "kvadrat"/"rektangel" school terms; "former" = nails/"formerly" noise; `\b` is ASCII-only in any sv lint (å/ä/ö) |
| da | 5 + 10 + 12 | none | none | never "Former og figurer" (near-dup of "Geometri og former"); "formering" noise |
| no | 5 + 10 + 12 | none | none | bokmål; "former og mønster" is a K-077-like head, avoid |
| fi | 5 + 10 + 12 | riddle frame "Mikä olen?" needs no case slot; instruction objects written out inflected (e.g. "Ympyröi muodon nimi.") | none | "suorakulmio" length; "vinoneliö" (rhombus) never a K/G1 answer; no bare nominative token inside a sentence |

## D. Data + gates

### D.1 `primitives/flat-shape.js` (NEW; spec)
`flatShape({kind, variant='none', rot=0, aspect=1, size, fill=T.cream})` → `{svg, verts:[[x,y]…] (px, 1 dp), meta:{kind, variant, rot, aspect}}`. Kinds: `circle` · `ellipse` · `triangle:{equilateral,right,obtuse,scalene,skinny}` · `square` · `rectangle` · `rhombus` · `parallelogram` · `trapezoid` · `kite` · `hexagon` (regular) · `pentagon`. Variants: `gap` (a 12-18 % break centred on one side, ≥ 10 px) · `curved` (one side a quadratic bulge, sagitta ≥ 15 % of side) · `round` (one or all corners filleted, radius ≥ 20 % of the shortest side) · `chord` (circle with one flat chord ≥ 25 % of diameter). The figure is scaled so its ROTATED bbox fits `size`; circle/ellipse emit 64 sampled verts for the gate. Ships with `qa/verify-b5-flat-shape.js` that measures the RENDER (re-parses the svg path, recomputes side lengths / angles / fillet / gap from the drawn geometry, not from `meta`).

### D.2 Bank `data/b5/2d-shapes.js` + `data/b5/locales/2d-shapes.<loc>.json` via `lib/b5-common.js bank('2d-shapes', loc)`
```js
// data/b5/2d-shapes.js (locale-neutral)
module.exports = {
  kinds: ['circle','square','triangle','rectangle','hexagon'],
  objects: [ // F2; every entry OPENED 2026-09-23
    { theme:'classroom', noun:'clock', shape:'circle', picOpened:true },
    { theme:'around the house', noun:'plate', shape:'circle', picOpened:true },
    { theme:'At the Supermarket', noun:'pizza', shape:'circle', picOpened:true },
    { theme:'bakery', noun:'cookie', shape:'circle', picOpened:true },
    { theme:'desserts and sweets', noun:'lollipop', shape:'circle', picOpened:true },
    { theme:'around the house', noun:'door', shape:'rectangle', picOpened:true },
    { theme:'post office', noun:'envelope', shape:'rectangle', picOpened:true },
    { theme:'classroom', noun:'whiteboard', shape:'rectangle', picOpened:true },
    { theme:'classroom', noun:'notebook', shape:'rectangle', picOpened:true },
  ],
};
// data/b5/locales/2d-shapes.<loc>.json (panel-authored)
{ "names": { "circle":"…", "square":"…", "triangle":"…", "rectangle":"…", "hexagon":"…" },
  "inventory": { "hexagon": true },
  "riddles": { "circle":["…","…"], "square":["…","…"], "triangle":["…","…"], "rectangle":["…","…"], "hexagon":["…","…"] },
  "strings": { "base":{"title":"…","instruction":"…"}, "real-or-not":{…}, "around-us":{…}, "write-name":{…}, "riddles":{…}, "dot-draw":{…} } }
```
⚠ nt10-D trap: the family gate must read the SAME string the generator prints; `apply-b5-locale.js` writes both `strings.<mode>` and `i18n/strings.<loc>.json[<ID>]`, and `check-b5-string-parity.js` (clone of the b4 one) asserts parity.

### D.3 Validator rules (`tools/validate-b5-draft.js`, key `2d-shapes`)
1. `names` has all 4 core kinds, non-empty, pairwise distinct after case-fold; `hexagon` present iff `inventory.hexagon`.
2. No name equals or contains the locale's `geometry.name` or `axes.theme.shapes.name` (case-fold).
3. Every riddle: 1-2 sentences, ≤ 90 chars, does NOT contain any `names` value (case-fold, NFC, letter-boundary `(?<!\p{L})…(?!\p{L})`).
4. Square riddles contain an equal-sides clue; rectangle riddles contain a long/short clue (panel tags `clue:'equal'|'longShort'` per literal; validator checks the tag).
5. No name is `oval`/`rhombus`/`star`/`heart`/`moon` equivalent (the K/G1 closed set is fixed).
6. Instructions ≤ 150 chars, one sentence (fi two allowed only if the panel records why), name only apparatus on that face (F2 instruction must contain both bin names; F3 must refer to the box/line; no "tick", no "letter boxes").
7. Titles ≤ 70 chars, no worksheet-word (per locale list), no visible "free" predicate, not the bare theme word, unique across the 6 faces.
8. F2 objects: every `picOpened:true`, every picture resolvable via `b3-picture-index` for the locale, vocab present, not in `B2_EXCLUDE`, no `bw` theme.
9. `inventory.hexagon=false` ⇒ no riddle/strings mention hexagon.
10. Every key in `strings` is one of the 6 mode strings; none missing.

**Poison cases (each must FAIL; the correct draft is the control):** P1 names.square == names.rectangle · P2 it name "Forme geometriche" in a title · P3 riddle "I am a triangle with 3 sides" (answer in clue) · P4 sv riddle containing "kvadrat" as "Kvadraten" (letter-boundary + inflection check) · P5 square riddle without an equal-sides clue · P6 names.rectangle = "Rechteck" and names.square = "Rechteck" (de dup) · P7 F2 object `around the house/window` with `shape:'rectangle'` and `picOpened:false` · P8 F2 object `around the house/rug` (not in bank) · P9 instruction "Tick the right name" on base (apparatus lie) · P10 title "Formas – Figuras" (bare theme word) · P11 `inventory.hexagon:false` with a hexagon riddle · P12 title containing "gratis"/"kostenlos" · P13 da title "Former og figurer" · P14 base chip set {square card, rectangle chip} (render-level poison for the gate) · P15 F1 rectangle row containing a square (render-level).

### D.4 `qa/verify-b5-2d-shapes.js` (render assertions, every face × 11 locales × 20 seeds)
Floors: K figure long side ≥ 96 px, short ≥ 30; K pictures ≥ 72; K chip text ≥ 16 px; G1 figure ≥ 80, G1 text ≥ 14; tap/write targets ≥ 44 at G1, ≥ 56 at K. Uniqueness: exactly one correct chip per base/F4 card; F1 per-row answer set recomputed by the gate's own `classify(verts)` from the parsed svg (never from `data-lcs-kind`); F2 answers from the bank's `shape`. No answer printed: no name pill adjacent to its own figure on base/F3/F1-figures; no riddle contains its answer. Misconception rule measured: ≥2 turned (15-75°), ≥1 skinny, size ratio ≥ 1.8. Square/rectangle rule: 0 rectangle-target rows with a square; 0 square cards with a rectangle chip. The 722 stack: body ≤ 722 with a 3-line title + 3-line instruction in de/fi/pt, `minmax` rows absorb slack; no overflow, no text < 9 px, palette tokens only. Answer-position spread: base/F4 correct-chip slot histogram over 20 seeds has no slot > 60 % (measured in BOTH directions, on the shipped seed too, per the nt10-D staircase lesson).

## E. SEO

Title patterns (face element in brackets; the panel writes the native literal; ≤ 70 chars, engine appends the worksheet-word):

| face | Germanic (en / de / nl) | Romance (es / pt / fr / it) | Nordic + fi (sv / da / no / fi) |
|---|---|---|---|
| base | 2D Shapes: Name the Shape / Geometrische Formen benennen / Vlakke figuren benoemen | Figuras geométricas planas y sus nombres / Figuras geométricas planas: nomes / Les figures planes et leurs noms / Figure geometriche piane: i nomi | Geometriska former och deras namn / Geometriske figurer med navn / Geometriske figurer med navn / Tasokuvioiden nimet |
| F1 | 2D Shapes: Real or Not? / Geometrische Formen erkennen: echt oder nicht? / Vlakke figuren herkennen | Reconoce las figuras geométricas planas / Reconhecer figuras geométricas planas / Reconnaître les figures planes / Riconoscere le figure geometriche piane | Känna igen geometriska former / Genkend geometriske figurer / Kjenne igjen geometriske figurer / Tunnista tasokuviot |
| F2 | 2D Shapes Around Us / Geometrische Formen in der Umwelt / Vlakke figuren om je heen | Figuras geométricas en objetos / Figuras geométricas planas no dia a dia / Les figures planes autour de nous / Figure geometriche piane intorno a noi | Geometriska former i vardagen / Geometriske figurer omkring os / Geometriske figurer rundt oss / Tasokuviot ympärillämme |
| F3 | 2D Shapes: Write the Names / Geometrische Formen: Namen schreiben / Vlakke figuren: namen schrijven | Escribe el nombre de las figuras geométricas / Escreva o nome das figuras planas / Écrire le nom des figures planes / Scrivi il nome delle figure piane | Skriv namnet på geometriska former / Skriv navnet på geometriske figurer / Skriv navnet på geometriske figurer / Kirjoita tasokuvioiden nimet |
| F4 | 2D Shape Riddles / Geometrische Formen Rätsel / Raadsels over vlakke figuren | Adivinanzas de figuras geométricas / Adivinhas de figuras geométricas planas / Devinettes sur les figures planes / Indovinelli sulle figure geometriche piane | Gåtor om geometriska former / Gåder om geometriske figurer / Gåter om geometriske figurer / Tasokuvioarvoitukset |
| F5 | Draw 2D Shapes on Dot Paper / Geometrische Formen zeichnen im Punktefeld / Vlakke figuren tekenen op stippen | Dibuja figuras geométricas en puntos / Desenhe figuras planas na malha pontilhada / Tracer les figures planes sur les points / Disegna figure geometriche piane sui puntini | Rita geometriska former på prickar / Tegn geometriske figurer på prikker / Tegn geometriske figurer på prikker / Piirrä tasokuvioita pisteisiin |

Meta MIDDLEs (en; the panel natives each; whole description 120-170):
- base: "Children read the name under each turned or skinny shape and circle the right one"
- F1: "Children decide which triangles, rectangles and squares are real and which only look close"
- F2: "Children match a clock, a door, a pizza and more to the circle or the rectangle"
- F3: "Children write the name of each shape on the line, using the word box"
- F4: "Children read a clue about sides and corners and circle the shape's name"
- F5: "Children read a shape name and join the dots to draw it, some starting on a slanted side"

`coordinate` per face: `{type:'2d-shapes', mode:'base'|'real-or-not'|'around-us'|'write-name'|'riddles'|'dot-draw', level: LEVEL_KEYS[loc][K|G1], theme:''}` (K: base, around-us, dot-draw; G1: real-or-not, write-name, riddles).

Non-cannibalisation (est. word 3-gram Jaccard of title+meta):
| pair | est. J | fence |
|---|---|---|
| base vs F3 (both shape → name) | 0.20 | circle a chip vs write on a line; "name the shape" vs "write the names" |
| base vs F1 | 0.12 | "names" vs "real or not / recognise" |
| F1 vs F4 | 0.10 | recognition vs riddles |
| F2 vs any | ≤ 0.08 | objects, "around us / found at home" |
| F5 vs any | ≤ 0.08 | dots / draw |
| base vs `matching` name × shapes ("Picture Word Match – Shapes") | 0.10 | never "match"/"picture word" in our titles |
| base vs K-070 "Shape Hunt" / de "Formenjagd" | 0.05 | never "hunt/find/Jagd/caza" |
| F1 vs K-080 "Which Shape Is Different?" | 0.05 | never "different/odd/passt nicht" |
| F4 vs K-075 "Count the Sides" | 0.08 | never "count"; riddles only |
| F5 vs dot-to-dot / grid-copy | 0.06 | never "dot to dot"/"copy"; "dot paper / Punktefeld" |
| all vs `geometry` landing heads (es "Figuras geométricas para preescolar – contar lados…", pt "…formas geométricas educação infantil – lados e cantos", it "Schede forme geometriche infanzia – lati e angoli") | ≤ 0.15 | es/pt/it lead with "planas/piane"; never "lados/lati/cantos" |

## F. Open questions + summary

**Engineer must measure:** chip widths per locale in a 205 px card (fi "suorakulmio", pt "retângulo", sv "sexhörning") and whether stacked chips fit the base 2×3 grid in 722 with a 3-line fi title; F3 writing row at glyphH ≥ 32 for 11-letter names; F2 picture legibility at 72 px (lollipop stick, notebook tilt); flat-shape near-miss visibility at print size (gap ≥ 10 px, fillet ≥ 20 %); dot lattice pitch vs K pencil; the `classify()` tolerances against the primitive's rounding.

**Only a native panel can rule:** fr K name "rond" vs "cercle" and CP "coins" vs "sommets"; `inventory.hexagon` per locale (default: en/de/nl/sv/da/no/fi true, fr/pt/es/it panel); nl "vlakke figuren" vs "vormen" per band; sv "kvadrat/rektangel" register at förskoleklass; pt EI vs fundamental head for the K faces; the riddle literals (register, digits vs number words, "corners" word); whether a locale reads the 45° turned square as square at K without a rhombus fight (if a panel says its teachers accept "Raute/losange/ruit" at K, that card becomes d3-only for that locale, a data flag).

**Summary.** Six faces: base K Name the Shape (shape → circle the name, turned/skinny exact drawings) · F1 G1 Real or Not? (name → circle true shapes among near-misses) · F2 K Shapes Around Us (9 opened library objects → circle/rectangle bins) · F3 G1 Write the Names (word box + writing line) · F4 G1 Shape Riddles (attribute clue → circle the name) · F5 K Draw on Dots (open, slanted given side). Refusals at design time: none (66/66 expected); measured ceiling: no library object is a clean square or triangle, so F2 is circle/rectangle only. New: `primitives/flat-shape.js` + render-measuring verify; bank `data/b5/2d-shapes.js`.
