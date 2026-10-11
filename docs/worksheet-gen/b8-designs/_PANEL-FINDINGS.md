# b8 THE LOCK (2026-10-11): the "Handmade Mazes" flagship family, its heads ×11, its twenty faces, the click model

Operator /goal 2026-10-11: one new flagship type, base + 19 variations × 11 locales = 220 worksheets, PDF + interactive + answer key, original scenes from the colour image library (drawn elements only where the library has none, in its style), SEO target ≥ 500 clicks/day. **Operator ruling (same day): a NEW family, separate from the grid `mazes` family, its visible name taken from the harvest; "Handmade Mazes" is the internal project name.** Harvest: `_records/candidate-seeds.json` → `harvest-candidates.<loc>.json` ×11 (1,236 requests, 0 errors).

## Raw harvest (unique suggestions per intent; comparable within a column only)
| intent | en | de | fr | es | pt | it | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| picture / generic maze | 177 | 95 | 132 | 124 | 70 | 70 | 54 | 35 | 45 | 29 | 29 |
| alphabet / letter maze | 50 | 16 | 27 | 15 | 11 | 5 | 5 | 0 | 1 | 1 | 0 |
| number / math maze | 94 | 18 | 21 | 31 | 12 | 12 | 10 | 0 | 1 | 3 | 0 |
| easy / preschool maze | 89 | 23 | 42 | 34 | 36 | 15 | 11 | 5 | 2 | 2 | 1 |
(b7 find-the-differences for scale: en 125 · de 98 · fr 86 · es 61 · pt 71 · it 44 · nl 62 · sv 19 · da 26 · no 21 · fi 13.)

## THE LOCK: key, id, rail names
| field | value |
|---|---|
| family key | **`maze-puzzles`** (EN slug = key, the taxonomy invariant) |
| base id | **K-405**; faces take K-406+ · G1-420+ · G2-392+ (allocated by content band, README order) |
| subject | spatial-reasoning (the letter / number / sound faces carry their own strand chip) |
| interactive | `trace-path` screen + answer key on EVERY deck |

Rail names (the hub entry; each is a harvested phrase AND distinct from the grid family's "Mazes / Labyrinthe / Laberintos / …"): en **Maze Puzzles** · de **Labyrinth-Rätsel** · fr **Jeux de labyrinthe** · es **Juegos de laberinto** · pt **Atividades de labirinto** · it **Percorsi e labirinti** · nl **Doolhofpuzzels** · sv **Labyrintpyssel** · da **Labyrintopgaver** · no **Labyrintoppgaver** · fi **Labyrinttitehtävät**. Panels may correct register, never fall back to the bare grid-family word.

## Per-locale heads (harvested; the panel writes each title from these, never from English)
| loc | generic / picture head | alphabet head | number / math head | early-years head | grade stamps | traps |
|---|---|---|---|---|---|---|
| en | maze activity sheets · mazes for kids printable · maze puzzles for kids · kindergarten maze · maze for 1st graders | alphabet maze · ABC maze · letter maze (for kindergarten / preschool) · ABC order maze · "a to z alphabet maze" | number maze · counting maze · math maze 1st / 2nd grade · skip counting maze | mazes for toddlers · mazes for preschoolers · simple maze for kids | kindergarten, 1st grade, 2nd grade, "for 5 year olds" | G2/G3 bare "maze" = the DIBELS reading test: G2 titles always say math / skip counting; never "easy maze", "hard maze", "giant maze", "animal maze", "fruit maze" (grid family) |
| de | Labyrinth Rätsel · Irrgarten zum Ausdrucken · Labyrinth für Kinder · Labyrinth Grundschule | Buchstaben-Labyrinth · ABC-Labyrinth | Zahlenlabyrinth · Rechenlabyrinth (1. / 2. Klasse) · Mathe-Labyrinth | Labyrinth Vorschule · Labyrinth Kindergarten | Vorschule, Kindergarten, Grundschule, 1. / 2. Klasse | never "Arbeitsblatt" in a title; "einfaches Labyrinth" is shared with the grid family's easy page: not a head |
| fr | jeu de labyrinthe à imprimer · labyrinthe enfant · labyrinthe maternelle · labyrinthe CP | labyrinthe des lettres (capitales / cursives) · labyrinthe alphabet (GS, CP) | labyrinthe des nombres (GS, CP, CE1) · labyrinthe maths CP / CE1 | labyrinthe maternelle facile · labyrinthe MS / GS | maternelle (MS, GS), CP, CE1 | "fiche" is the worksheet word: not in titles |
| es (MX) | laberintos para niños · juego de laberinto para imprimir · laberintos para preescolar · laberinto primaria | laberinto del abecedario · laberinto de letras | laberinto de números (del 1 al 20) · laberinto de sumas (y restas) para primer grado | laberintos para preescolar · laberintos para niños de 4 / 5 años | preescolar, primer grado, segundo grado | "ficha" not in titles; "fácil" shared with the grid family |
| pt (BR) | atividades de labirinto para imprimir · jogo do labirinto · labirinto infantil | labirinto do alfabeto · labirinto das letras | labirinto dos números · labirinto matemático | labirinto educação infantil · coordenação motora labirinto | educação infantil, 1º ano, 2º ano | "atividade" may lead (it is the genre word here), not "folha" |
| it | labirinti per bambini da stampare · gioco del labirinto · percorsi e labirinti | labirinto dell'alfabeto · labirinto delle lettere | labirinto dei numeri · labirinto matematico | labirinti scuola dell'infanzia · percorsi e labirinti per la scuola dell'infanzia | scuola dell'infanzia, classe prima, classe seconda, "5 / 6 / 7 anni" | "schede" not in titles |
| nl | doolhof kinderen printen · doolhofpuzzel · doolhof groep 3 / 4 | letterdoolhof · alfabet doolhof | cijferdoolhof (tot 20) · rekendoolhof (tot 10) | doolhof kleuters · doolhof peuters · doolhof kleurplaat | peuters, kleuters, groep 3, groep 4 | "werkblad" not in titles |
| sv | labyrint för barn att skriva ut · labyrintpyssel | (no demand: alphabet face leads with the generic head + "bokstäver i ordning") | (no demand: generic head + "räkna 1-20") | labyrint förskola · enkel labyrint | förskola, förskoleklass, åk 1, åk 2 | Nordic faces = generic head + the face's tail |
| da | labyrint opgaver til print · labyrint for børn | alfabet labyrint | matematik labyrinter | labyrint børnehave | børnehave, 0. klasse, 1. klasse, 2. klasse, indskoling | same |
| no | labyrint for barn · labyrint oppgaver | alfabet labyrint | matte labyrint | enkel labyrint · labyrint barnehage | barnehage, 1. trinn, 2. trinn, 3. trinn | same |
| fi | labyrinttitehtäviä lapsille · labyrintti tulostettava · sokkelo tulostettava | (generic + aakkoset) | (generic + numerot) | helppo labyrintti · esikoulu | varhaiskasvatus, esikoulu, 1. / 2. luokka | "sokkelo värityskuva" (colouring maze) is a real fi head; fi case: the panel writes whole titles |

## The twenty faces (the studio refines; a face may be REPLACED only by another genuine move with demand, never dropped)
| # | face | band | skill (standard where honest) | query face it owns |
|---|---|---|---|---|
| 1 | BASE: help the hero reach the goal (picture maze) | K | visual-spatial planning (readiness) | picture maze / maze activity sheet + its scene |
| 2 | my first maze: one wide road, 2 dead ends | PreK | visual-motor control | mazes for toddlers / preschoolers / coordenação motora |
| 3 | big picture maze: many branches | G1 | planning ahead, backtracking | maze for 1st graders / maze puzzles for kids |
| 4 | river maze: boat to the dock | K | curved-path tracking | the scene (water) |
| 5 | burrow maze: under the ground | G1 | spatial levels | the scene (underground) |
| 6 | town maze: drive through the streets | G1 | route with turns | the scene (town / vehicle) |
| 7 | babies to mothers: several starts | K | 1-to-1 matching along routes | animal babies & mothers maze |
| 8 | tangled lines: which line leads where | G1 | visual tracking through crossings | tangled-line puzzle |
| 9 | collect on the way: pass every item | G1 | multi-goal planning | collect-the-items maze |
| 10 | avoid the obstacles | G1 | constraint routing | the scene + "avoid" |
| 11 | ABC maze: capitals A→Z on the true path | K | alphabet order, RF.K.1.d | alphabet / ABC maze (capitals) |
| 12 | abc maze: lowercase a→z | K | lowercase order, RF.K.1.d | letter maze (lowercase) |
| 13 | letter hop: colour the stones A→Z | K/G1 | alphabet order + adjacency, RF.K.1.d | ABC order maze / letterdoolhof |
| 14 | number maze 1→20 | K | counting sequence, K.CC.A.2 | number maze 1 to 20 / cijferdoolhof tot 20 |
| 15 | skip-counting maze: 2s / 5s / 10s | G2 | 2.NBT.A.2 | skip counting maze |
| 16 | addition maze: step on the sums that make 10 | K/G1 | K.OA.A.4 / 1.OA.C.6 | math maze / Rechenlabyrinth / laberinto de sumas |
| 17 | subtraction maze within 20 | G1 | 1.OA.C.6 | math maze subtraction / laberinto de restas |
| 18 | first-sound maze: step on pictures starting with the hero's sound | K/G1 | RF.K.2.d, native per locale | beginning sounds maze |
| 19 | arrow code maze: follow the arrows | G2 | sequencing directions (readiness, unplugged coding) | coding maze / arrow maze |
| 20 | maze + colouring page | K | visual-motor + colouring | maze coloring page / sokkelo värityskuva / doolhof kleurplaat |

## Honest click model (9-15-month maturity; near-zero for the first 2-3 months)
Same method as b7: per market, harvest depth × the genre's evergreen weight, over 20 landings per locale. Mazes are one of the deepest printable genres in en / fr / es (deeper than find-the-differences in all three), level with it in de / pt / nl, thin in the Nordic markets and fi (generic head only).
| market | landings | low | mid | high |
|---|---|---|---|---|
| Germanic en / de / nl | 60 | 120 | 230 | 340 |
| Romance es / pt / fr / it | 80 | 170 | 310 | 460 |
| Nordic sv / da / no / fi | 80 | 40 | 80 | 140 |
| **batch (220 landings)** | | **330** | **620** | **940** |
The 220 interactive deck pages are an extra indexable surface, not counted. **The ≥ 500/day target sits inside the mid band**, conditional on: the titles hitting the alphabet / number / math / early-years heads above; the landings written from the render; and the pages being INDEXED, which is the site's binding constraint (the 2026-07 crawl-budget collapse). Levers if it falls short: per-season scene expansions (the Level Set unit axis), a grade-stamped variant per math face, internal links from the grid `mazes` landings.
