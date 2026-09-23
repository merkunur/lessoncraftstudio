# G1-379 `maps` : PEDAGOGY + CONTENT (nt10-E, 2026-09-23)

Read: `_ROLE-PEDAGOGY.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md` (DELTA + nt10-D sheet), `_PANEL-FINDINGS.md` (lock row 7 + the `maps` ruling), the `maps` sections of `_work/_selection-pedagogy.md` (§11), `_selection-seo-germanic.md` (§3), `_selection-seo-romance.md` (§5), `_selection-seo-nordic.md` (§11); `types/g2/G2-279-grid-coordinates.js` (build + verify) and faces G2-302/303/308; `types/k/K-064..067` (position-words factory); `types/g1/G1-310-hundreds-chart-puzzles.js` (`chartCompass`); `REFERENCE APPS/treasure-hunt.html` (compass mode, l.4240-4252); `frontend/config/topics-taxonomy.json`; `frontend/content/seo-landing/<loc>.json`; `scripts/seo-landing/gen-b3-landings.js LEVEL_KEYS`; `_work/G1-378-pedagogy.md` (format). (m) = measured 2026-09-23 with read-only node or by OPENING the picture (contact sheets `scratchpad/G1-379-pics/{a,b}.png`, read with the Read tool). *est.* = the engineer measures in the real render. No em-dashes.

**Boundary (load-bearing).** `grid-coordinates` G2-279 (+G2-302/303/308) owns LOCATING or WRITING a cell by a letter-number code on a labelled grid (m: `coordGrid`, `codeList`, the "B2" demo). `position-words` K-064..067 owns on/under/beside, LEFT/RIGHT (K-065), top/middle/bottom, inside/outside, all relative to the child's own view (m; fr type name "Se repérer dans l'espace", m). `mazes`, `picture-path` and `treasure-hunt` own ROUTES; ⚠ **`treasure-hunt` has a live `compass` exercise-mode** (m: `directionTypeSelect cardinal → 'compass'`): the child follows step instructions ("2 north, 3 east") across a grid; 8 locales carry 43-48 compass landings each (pt 43 · fr 45 · it 47 · nl 48 · sv 48 · da 48 · no 48 · fi 47; en/de/es 0, m), titled "… med kompass / avec boussole / kompassilla", level preschool, and the taxonomy `axes['exercise-mode'].compass.name` is exactly "Himmelsrichtungen / Puntos cardinales / Points cardinaux / Pontos cardeais / Punti cardinali / Windrichtingen / Väderstreck / Verdenshjørner / Himmelretninger / Ilmansuunnat" (m). `hundreds-chart-puzzles` G1-310 `chartCompass` is a +1/−1/+10/−10 arrow legend, not cardinal directions (m). `weather-symbols` K-356 owns symbols for weather (sv "Vädersymboler" shares the stem with "väderstreck", m). Therefore `maps` owns the **map as a REPRESENTATION of real space**: (1) the map KEY (a symbol stands for a thing; read the key to read the map), (2) the BIRD'S-EYE view (a thing seen from above is drawn differently from the thing seen from the side), (3) the four CARDINAL DIRECTIONS as a fixed clockwise set on a compass rose, with the locale's own letters, (4) cardinal directions as RELATIONS between places on a map (one look, no steps, no counts), (5) the continents and (6) the oceans by NAME on a world map, in each locale's school convention. No face labels rows or columns with letters or numbers, no face asks the child to walk N steps, no face uses left/right/up/down as the answer word, no face title is the bare taxonomy compass-mode name (always compounded), and no title contains "kompass/boussole/bússola/bussola" as its head (treasure-hunt owns "with a compass").

## A. Identity

| loc | genre head (panels) | school year (base G1) | national strand (framework NAME) | CCSS (en only, honest) |
|---|---|---|---|---|
| en | **continents and oceans** (A, HARD) · **map skills** (A; WINNABLE "map skills 1st grade", "map key worksheet", "compass rose worksheet") | grade 1 | Social Studies (readiness) | none. C3 Framework D2.Geo.1.K-2 (construct/use maps of familiar places; base, F1, F5) named in prose only; continents/oceans + cardinal directions = common US grade 2-3 units, no standard |
| de | **Himmelsrichtungen** (A at Kl 3; prize "Arbeitsblatt Klasse 3") · **Kontinente** (A-) · Legende/Kartenzeichen | 1. Klasse | Sachunterricht | n/a; Perspektive Raum: "Vom Bild zum Plan, Vogelperspektive" Kl 1-2 (base, F1 in band); "Karten, Legende, Himmelsrichtungen" Kl 3 (F2, F5 honest at Kl 3; "Klasse 2/3"); Kontinente Kl 3-4 (F3/F4 say so) |
| es | **puntos cardinales** / **los continentes** (A; WINNABLE "para primer/segundo grado") · simbología, croquis | primer grado | Conocimiento del Medio (SEP/NEM) | n/a; 1º-3º "croquis, puntos cardinales, simbología" (in band); continents: panel states SEP grade |
| pt | **pontos cardeais** / **rosa dos ventos** (A-) · legenda | 1º ano | Geografia (BNCC) | n/a; **EF01GE09** (elaborar e utilizar mapas simples, base/F1), EF02GE10 (G2, F5), **EF03GE07** (legendas com símbolos); continents 6º ano (F3/F4 ABOVE band, landing says so); colaterais 4º ano (refused as a face) |
| fr | **se repérer sur un plan** (A, ×33, the biggest fr cluster) · **les continents** (A) | CP | Questionner le monde | n/a; cycle 2 "se repérer dans l'espace et le représenter: plan, carte, légende" (base, F1 in band); continents/oceans on a globe/planisphere cycle 2 (in band CE1-CE2); points cardinaux cycle 3 (F2/F5 ABOVE band, landing says so) |
| it | **punti cardinali** (B+, classe terza) · legenda | classe prima | Geografia (Indicazioni nazionali) | n/a; prima "percorsi, mappe, punti di riferimento" (base, F1); terza "carte, legenda, punti cardinali" (F2/F5 in band at terza); continenti classe quinta (F3/F4 ABOVE band, landing says so) |
| nl | **Werelddelen** / **Windrichtingen** (C in K-3) · plattegrond, legenda | groep 3 | Oriëntatie op jezelf en de wereld (SLO kerndoelen) | n/a; groep 4-5 plattegrond, legenda, windrichtingen (F2/F5 honest at groep 4-5); werelddelen groep 5-6 (F4 says so) |
| sv | **världsdelar** · **väderstreck** · **kartkunskap** (A) | åk 1 | Samhällsorienterande ämnen (Lgr22) | n/a; Lgr22 SO åk 1-3 names maps, symbols, väderstreck (in band; panel verifies wording, never quoted in metadata) |
| da | **verdensdele** · **verdenshjørner** (C+) | 1. klasse | Natur/teknologi (Fælles Mål; geografi from 7. kl) | n/a; 1.-3. kl "kort og kompasretninger" (in band); panel rules the strand literal |
| no | **verdensdeler** · **himmelretninger** (B+) | 2. trinn | Samfunnsfag (LK20) | n/a; after 4. trinn: kart, himmelretninger (G2-G3 faces in band at 3.-4. trinn) |
| fi | **maanosat** · **ilmansuunnat** · **karttamerkit** (A-) | 1. luokka | Ympäristöoppi (OPS 2014) | n/a; 1-2 lk kartta, ilmansuunnat (in band); maanosat 3-4 lk (F3/F4 honest); panel verifies |

Measured: `apps.maps` and `axes['exercise-type'].maps` ABSENT (m). Register `default_subject:'spatial-reasoning'` (the lock default; open item 1 of `_PANEL-FINDINGS.md`), `default_age_range:'6-8'`. No `strand-names.ts` row fits (m: rows = Science + literacy/maths strands; no geography/social-studies row) → a NEW per-locale strand literal (the column above) is added additively (open item 2).

**Theme axis: OFF** (`themeAxis:{applicable:false}`; landings `coordinate.theme:''`). **No `unitAxis`.** **No library picture on any face.** Opened-picture ruling (m, sheets a/b):

| picture | verdict | reason |
|---|---|---|
| `camping/compass` | **REFUSED** | a baked ENGLISH rose "N E S W": wrong in 10 locales (de O, fr/es/it/pt O for west, pt L, nl Z/O, sv Ö/V, da/no Ø/V, fi P/I/E/L) |
| `classroom/map` | REFUSED | a coloured world map on a hanging frame: prints every continent's shape and colour; not a labelling surface |
| `camping/map` | REFUSED | a folded map in perspective with trees drawn from the SIDE on it: the exact side/top mix the family teaches against |
| `classroom/globe`, `camping/{lake,river,mountain,trail,forest,tent,cabin,pine_tree}`, `miscellaneous/house`, `christmas/church`, `beach/{island,lighthouse}` | correct objects, not used | perspective (3/4) scenes; a plan map uses ONLY top-view symbols (selection quality rule), and F1's side views must be orthographic pairs of ONE model (a 3/4 picture has no single correct top view) |

**The one rule that locks the type: every mark on a map is drawn by a primitive from locale-neutral geometry, and every word on the page (key labels, direction words, direction LETTERS, continent and ocean names, and WHICH continents/oceans exist) is a panel literal from `maps.<loc>.json`; the answer is always a stamped fact of the drawing (a symbol count, a lattice relation, a rose rotation, a region id), never a word the code forms and never a global answer set.**

## B. The six faces

Common apparatus (NEW, palette-only; design agents own the geometry, pedagogy owns these rules):
- `primitives/map-symbol.js`: `mapSymbol({id, px})` for 8 point symbols, all TOP VIEW, distinct in outline AND fill so greyscale keeps them apart: `house` (filled teal square with a diagonal roof-ridge cross), `tree` (tealSoft circle, scalloped rim), `bush` (small plain tealSoft circle, 0.6 × tree: the deliberate near-miss), `pond` (white blob, teal outline, 2 wave lines), `bench` (short thick ink bar), `tent` (coral triangle), `flowerBed` (ring of 5 coral dots), `bridge` (two teal brackets, only ever drawn across the river). Line features, never counted: `road` (double teal line), `river` (tealSoft wavy band), `path` (dashed ink). No letters in any symbol (a "P" for parking reads "E" in es-MX: trap avoided by exclusion).
- `primitives/compass-rose.js`: `compassRose({letters:{n,e,s,w}, rotation:0|90|180|270, blanks:[dir…], px})`; 4-point star, tips up/right/down/left, N tip always distinguished by a coral fill (so "which tip is north" is apparatus, not a letter); stamps `data-lcs-rot`, per tip `data-lcs-dir`.
- `primitives/top-side-view.js`: one 3D model per object rendered twice by orthographic projection (front elevation, plan), so each pair is correct by construction (see F1 pool).
- `primitives/world-map.js`: see F3.
- Every face is CODE on one additive `layout` knob (base `layout` undefined, byte-identical; faces stamp `data-lcs-layout`); guards key on the CONFIG (`d.layout`, `d.rows`, `d.set`), never on the level index. Face ids TBD by the emitter in the stated band.

### Base: Read the Map Key (G1, `G1-379`, layout undefined)
**Move:** READ a map through its key: a WORD in the row → find its symbol in the key → count that symbol on the plan. The key is the only bridge (rows never print the symbol).
**Child:** "Look at the map key. Find each thing on the map. Count them and write how many." (79)
**Params:** d1 `{keySize:4, asked:4, maxCount:4, nearMiss:false, rowsShowSymbol:true}` (scaffold: rows print the symbol too, so it is plain counting; unpublished) · **d2 (ships)** `{keySize:6, asked:5, counts:1..5, nearMiss:['tree','bush'], rowsShowSymbol:false, symPx:40, lines:['road','river']}` · d3 `{keySize:8, asked:6, counts:1..6, nearMiss:['tree','bush'], symPx:36}` (unpublished). Layout d2 *est.*: plan card 430 × 400 (left) + key column 200 wide, 6 entries × 56 (right) + 5 answer rows [key word][blankNumeralBox 44] in 2 columns below (3 × 56 + gaps ≈ 190): 400 + 16 + 190 = 606 ≤ 722 (rows `minmax(56px,1fr)`). The key entry that is NOT asked is a live distractor (the child must read, not assume every key line is asked).
**Rules (single answer + honest):** each asked count ∈ 1..5, ≥ 4 distinct values across the 5 rows, row order ≠ key order ≠ ascending count; `tree` and `bush` both in the key AND both asked or one asked (the near-miss is the point); total placed ≤ 20; symbols never touch (min gap 8 px), never sit on a road/river band, bridges only across the river; no symbol partly outside the plan frame.
**verify():** stamps per placed symbol `data-lcs-sym=<id>`, per key entry `data-lcs-key=<id>`, per row `data-lcs-row=<id>` + hidden `data-lcs-answer=<count>` on the open box; re-derives count = number of `[data-lcs-sym=<id>]` inside the plan; asserts the key word text === `symbolWords[loc][id]`, every row id ∈ key ids, rows print no symbol when `rowsShowSymbol:false`, boxes empty, pairwise bbox gap ≥ 8, the distinct-value and order rules.
**Refusals:** none (8 symbol words authorable ×11 as nominative citation literals; no frame).
**Query face:** the bare head: en "map key" / "map skills" · de "Legende / Kartenzeichen" · es "simbología" · pt "legenda" · fr "se repérer sur un plan" · it "legenda" · nl "legenda" · sv "teckenförklaring" · da "signaturforklaring" · no "tegnforklaring" · fi "karttamerkit".

### F1: Bird's-Eye View (K, `K-3xx` TBD, CODE `layout:'top-view'`)
**Move:** PROJECT: the same thing looks different from above; match each side view to its top view (the de "Vogelperspektive" / fr "vue de dessus" idea, the hardest map concept and its entry point).
**Child:** "Each thing is drawn from the side. Draw a line to the same thing seen from above." (81; read aloud at K)
**Params:** d1 `{pairs:4, pool:'easy'}` · **d2 (ships)** `{pairs:5, pool:'all', px:64, shuffleRight:true}` (`.ws-match` two columns, K floor 56) · d3 `{pairs:6, decoyTop:1}` (one extra top view with no partner; unpublished).
**Pool (10 models; top-view SHAPE CLASS in brackets):** cup with handle [circle + nub] · bucket [two concentric circles + handle chord] · rectangular table [rectangle, 4 corner dots] · round table [large plain circle] · bed [rectangle + pillow bar] · chair [square + back bar] · car [rounded rectangle + windscreen band] · house [rectangle + ridge line] · tree [scalloped circle over trunk dot] · traffic cone [square with circle and centre dot].
**Single-answer rule:** at most ONE model per shape class family per page (circle family = cup, bucket, round table, tree: ≤ 2 of them, and never cup+bucket together; rectangle family = rect table, bed, car, house: ≤ 2, never rect table+bed together); no model whose top view equals its side view (ball, cube, box: excluded from the pool); sizes on the page never cue the answer (all views fit the same 64 px box).
**verify():** stamps `data-lcs-model` on both columns, `data-lcs-view=side|top`; re-derives pairs by model id; asserts class-family limits, right-column order ≠ left order and ≠ its reverse, no line drawn, both views of a pair from the same model record.
**Refusals:** none (no words on the page body).
**Query face:** "bird's-eye view" / "Vogelperspektive" / "vista desde arriba" / "vista de cima" / "vue de dessus" / "visto dall'alto" / "bovenaanzicht" / "sett ovanifrån" / "set oppefra" / "sett ovenfra" / "ylhäältä katsottuna".

### F2: Compass Rose (G2, `G2-3xx` TBD, CODE `layout:'compass-rose'`)
**Move:** KNOW the four directions as a fixed clockwise set with the locale's LETTERS: complete roses where one letter is given, some roses turned.
**Child:** "Each compass rose shows one letter. Write the other three letters in the empty boxes." (85)
**Params:** d1 `{roses:4, rotation:[0], given:'n', wordStrip:true}` (N up and given; the four direction WORDS printed as a strip, plus the panel mnemonic; unpublished) · **d2 (ships)** `{roses:6, rotations:{0:3, turned:3}, given:'any', wordStrip:false, px:150, boxPx:40}` (2 × 3 grid; the 3 upright roses give E, S or W at their standard tip; the 3 turned roses use 90/180/270 once each; the coral N-tip marker is drawn ONLY on upright roses, so a turned rose must be solved from the given letter and the clockwise order) · d3 `{roses:6, turned:6}` (unpublished).
**Single answer:** 4 tips, one given, the clockwise order N→E→S→W is fixed → the other three are determined. The given letter differs across roses (each of the 4 appears ≥ 1).
**verify():** stamps `data-lcs-rot`, per tip `data-lcs-dir` + hidden `data-lcs-answer=<letter>` on blank boxes, `data-lcs-given` on the printed one; re-derives letter = `dirLetters[loc][dir]` with dir = (tip index − rot/90) mod 4; asserts exactly one given per rose, blanks empty, rotations d2 = {0,0,0,90,180,270}, given-letter multiset covers all 4, no N marker on a turned rose, NO word strip at d2.
**Refusals:** none. fr: cycle 3 content (landing says so); pt: L for leste is the test, not a defect.
**Query face:** "compass rose" / "Windrose" / "rosa de los vientos" / "rosa dos ventos" / "rose des vents" / "rosa dei venti" / "windroos" / "kompassros" / "kompasrose" / "kompassrose" / "kompassiruusu".

### F3: Label the Continents (G2, `G2-3xx` TBD, CODE `layout:'continents'`)
**Move:** NAME the continents on a world map, in the locale's own school set.
**Child:** "Write the name of each continent next to its number. Use the names in the box." (79)
**Params:** d1 `{set:'continents', bank:true, answer:'number'}` (write the map number beside each bank name; unpublished) · **d2 (ships)** `{set:'continents', bank:true, answer:'write', lines:N_loc, glyphH:24, mapW:639}` (map card full lane width; N_loc numbered writing lines in 2 columns under the map; bank above the lines) · d3 `{bank:false}` (recall; unpublished).
**`primitives/world-map.js` (engineer-gated):** Natural Earth 1:110m land (public domain), equirectangular, centred on 10°E, simplified (Douglas-Peucker; engineer sets tolerance so no continent is below ~ 60 points and the whole file ≤ 40 KB *est.*); islands below an area threshold dropped EXCEPT Greenland, Madagascar, Great Britain + Ireland, Iceland, Japan, the large Indonesian islands, New Guinea, New Zealand (named because a child looks for them). Region polygons with ids `northAmerica` (incl. Central America + Greenland), `southAmerica` (split at the Panama-Colombia border), `europe` / `asia` (split along the Urals, Ural River, Caspian, Caucasus, Black Sea, Bosporus; the split drawn as a thin dashed ink line so Eurasia still reads as one landmass), `africa` (split at Suez), `oceania` (Australia + New Guinea + New Zealand), `antarctica`. Map crop: 75°N to 56°S when the locale's set EXCLUDES Antarctica (an unlabelled continent begs a question), else to 90°S. At 639 px wide: 1.775 px/degree *est.*; Europe ≈ 62 px wide *est.*, so anchors are numbered circles ≥ 26 px with a 20 px Baloo numeral.
**Locale set (panel data, the lock ruling):** `continentSet: [{id, regions:[…]}]`, one anchor per set member; a member spanning several regions repeats its numeral on each (the merged "America" shows the same numeral on both masses: one continent, one name, two land pieces). Default proposals the panel confirms or overrides:

| loc | count | set (names = panel literals) | Antarctica drawn |
|---|---|---|---|
| en | 7 | Africa, Antarctica, Asia, Australia, Europe, North America, South America ("Australia" is the US-school name; panel may choose "Australia and Oceania") | yes |
| de | 7 | Afrika, Antarktis, Asien, Australien (und Ozeanien), Europa, Nordamerika, Südamerika | yes |
| es | 5 or 6 | América, Europa, África, Asia, Oceanía (+ Antártida): the tail searches 5, 6 and 7 (m); SEP panel rules | per ruling |
| pt | 6 | América, Europa, África, Ásia, Oceania, Antártida | yes |
| fr | 5 (maternelle-CP) or 6 | Europe, Afrique, Amérique, Asie, Océanie (+ Antarctique); tail "les 5 continents" ×4, never 7 (m) | per ruling |
| it | 5 or 6 | Europa, Asia, Africa, America, Oceania (+ Antartide); "i cinque continenti" at primaria (m tail) | per ruling |
| nl | 6 or 7 | Europa, Azië, Afrika, Noord-Amerika, Zuid-Amerika, Oceanië/Australië, Antarctica; "werelddelen en continenten verschil" is in the tail (m) | per ruling |
| sv | 7 | Europa, Asien, Afrika, Nordamerika, Sydamerika, Oceanien, Antarktis | yes |
| da | 7 | Europa, Asien, Afrika, Nordamerika, Sydamerika, Oceanien (Australien), Antarktis | yes |
| no | 7 | Europa, Asia, Afrika, Nord-Amerika, Sør-Amerika, Oseania, Antarktis | yes |
| fi | 6 or 7 `[NSR-FLAG][fi]` | Eurooppa, Aasia, Afrikka, Pohjois-Amerikka, Etelä-Amerikka, Oseania (Australia), Etelämanner | per ruling |

**Single answer:** each numbered anchor belongs to exactly one set member; every drawn region belongs to exactly one set member; bank = the set's names, once each.
**verify():** stamps per anchor `data-lcs-anchor=<memberId>` + numeral, per line hidden `data-lcs-answer=<memberId>`; re-derives by `continentSet[loc]`; asserts anchor count === set size, each member's numeral appears on each of its regions and nowhere else, bank multiset === set names, bank order ≠ numeral order ≠ the locale's alphabetical order, Antarctica drawn iff in the set, lines empty, no region filled differently from its neighbours (a colour-coded map prints the grouping).
**Refusals:** none (a count/name difference is data, not a refusal). ABOVE band in pt (6º ano), it (quinta), nl (groep 5-6), fi (3-4 lk), de (Kl 3-4): each landing says so.
**Query face:** "label the continents" / "Kontinente beschriften" / "los continentes" / "os continentes" / "les continents" / "i continenti" / "werelddelen" / "världsdelar" / "verdensdele" / "verdensdeler" / "maanosat".

### F4: Continents and Oceans (G3, `G3-3xx` TBD, CODE `layout:'continents-oceans'`)
**Move:** add WATER: sort land from sea while naming, on one map (the en head "continents and oceans").
**Child:** "Write the name of each continent and each ocean next to its number. Use the names in the box." (95)
**Params:** d1 `{oceans:3}` · **d2 (ships)** `{set:'continents+oceans', oceans:oceanSet[loc] (3-5), numbering:'continuous', bank:'mixed', lines:N_loc+M_loc (≤ 12), glyphH:24}` (one bank mixing continent and ocean names: the land/water decision IS the added move; stack *est.*: map 293 + bank 60 + 6 rows × 52 = 665 ≤ 722 at 12 lines) · d3 `{bank:false}` (unpublished).
**Ocean set (panel data):** default proposal: en 5 (Pacific, Atlantic, Indian, Arctic, Southern) · de 3 große Ozeane (Pazifik, Atlantik, Indischer Ozean) + panel may add Nordpolarmeer/Südpolarmeer · es 5 (Pacífico, Atlántico, Índico, Glacial Ártico, Glacial Antártico) · pt 5 (Pacífico, Atlântico, Índico, Glacial Ártico, Glacial Antártico) · fr 5 (Atlantique, Pacifique, Indien, Arctique, Austral) · it 5 (Pacifico, Atlantico, Indiano, Artico, Antartico) · nl 5 (Stille/Grote Oceaan, Atlantische Oceaan, Indische Oceaan, Noordelijke IJszee, Zuidelijke Oceaan) · sv 5 (Stilla havet, Atlanten, Indiska oceanen, Norra ishavet, Södra ishavet) · da 5 (Stillehavet, Atlanterhavet, Det Indiske Ocean, Ishavet/Det Arktiske Ocean, Det Sydlige Ishav) · no 5 (Stillehavet, Atlanterhavet, Indiahavet, Nordishavet, Sørishavet) · fi 3-5 (Tyyni valtameri, Atlantin valtameri, Intian valtameri, Pohjoinen jäämeri, Eteläinen jäämeri). **Rules:** the Southern Ocean is used only where Antarctica is drawn; the Pacific, split by a Europe-centred map, shows its numeral on BOTH edges (one ocean, one name) with the anchor pair stamped as one member; the Arctic anchor sits north of 70°N.
**verify():** as F3 + ocean anchors on water pixels only (anchor centre outside every land polygon, measured), continents on land only, bank = continents ∪ oceans once each, bank not grouped (no run of 3 same kind), numbering order not land-then-sea.
**Refusals:** none (de 3-ocean set is a smaller page, not a refusal). ABOVE band as F3, plus en (no standard; grade 2-3 unit).
**Query face:** "continents and oceans" / "Kontinente und Ozeane" / "los continentes y los océanos" / "continentes e oceanos" / "les continents et les océans" / "continenti e oceani" / "werelddelen en oceanen" / "världsdelar och världshav" / "verdensdele og verdenshave" / "verdensdeler og verdenshav" / "maanosat ja valtameret".

### F5: Directions on a Map (G2, `G2-3xx` TBD, CODE `layout:'directions-on-map'`)
**Move:** USE the directions as RELATIONS between places: start at one place, look ONE way, find the one place that lies in that direction (no steps, no counting: treasure-hunt owns walking N squares).
**Child:** "Start at the first picture. Look the way the word says. Circle the place you find there." (82)
**Params:** d1 `{places:5, plus:true}` (centre + 4 arms; unpublished) · **d2 (ships)** `{places:7, lattice:'3x3-hidden', rows:6, chips:3, rose:'labelled', symPx:40}` (plan 639 × 330 with the base's symbols + road/river; a fully labelled rose with the locale letters in one corner, N up; 6 rows [start symbol][direction WORD chip][3 answer chips = symbols]; stack *est.*: 330 + 16 + 6 × 58 = 694 ≤ 722).
**Single-answer construction:** places on hidden 3×3 lattice nodes (no drawn grid, no row/column labels); for each question (start X, direction d) exactly ONE place lies within ±45° of d from X at any distance, and the two distractor chips are places lying in OTHER directions from X (one in the opposite direction: the E/W confusion is the misconception on purpose). Each of the 4 directions asked ≥ 1; no start used twice; correct chip position not constant and not periodic.
**verify():** stamps per place `data-lcs-place=<id>` + lattice `data-lcs-rc`, per row `data-lcs-start`, `data-lcs-dir`, chips `data-lcs-chip=<id>` + hidden `data-lcs-answer`; re-derives the answer from the stamped lattice; asserts uniqueness in the ±45° sector, distractors outside it, direction word === `dirWords[loc][d]`, rose letters === `dirLetters[loc]`, no grid line and no letter/number axis label in the plan (the grid-coordinates fence), no chip pre-circled.
**Refusals:** none. fr cycle 3 (landing says so).
**Query face:** "cardinal directions on a map" / "Himmelsrichtungen auf der Karte" / "puntos cardinales en el mapa" / "pontos cardeais no mapa" / "les points cardinaux sur un plan" / "punti cardinali sulla mappa" / "windrichtingen op de kaart" / "väderstreck på kartan" / "verdenshjørner på kortet" / "himmelretninger på kartet" / "ilmansuunnat kartalla".

**Rejected non-moves.** Make the key / draw a map of my room (open, no verify; the base's d-level scaffold at most) · "go 2 north, 3 east" routes (treasure-hunt `compass` mode, live in 8 locales) · letter-number squares (G2-279) · left/right (K-065) · which continent? animals (measured honest endemic pool: Africa 8 (giraffe zebra hippopotamus gorilla chimpanzee meerkat lemur ostrich), Asia 4 (panda orangutan tiger komodo_dragon), Oceania 2 (kangaroo koala), N. America 3 (raccoon blue_jay cardinal), South America 0, Europe 0, Antarctica 0 once lion/elephant/leopard/cheetah/rhinoceros/camel (Africa+Asia), penguin (5 continents), polar_bear (Arctic), moose/beaver/bison (2 continents), sloth/toucan/macaw/jaguar (Central + South America) are excluded; 3 of 7 continents unfillable = a trivia page, not a face) · picture to map symbol (overlaps the base key and F1 projection) · colour the continents (dies on a B&W printer) · intercardinal NE/SW (pt colaterais 4º ano; above band everywhere) · scale and distance (above band) · the library compass picture (English letters).

## C. Native rebuild ×11

| loc | literals the panel authors (counts) | slots/forms needed and where they exist | refusal/re-target | traps |
|---|---|---|---|---|
| en | 8 symbol words, 4 direction words, 4 letters, 7 continent + 5 ocean names, set definitions, 6 × {title, instruction} ≈ 42 | none (whole literals; no vocab, no objForms, no frame inflects) | none | "Australia" vs "Oceania" (panel); oceans 4 vs 5 (NatGeo 2021 = 5) |
| de | as en; oceans 3 or 5 | none | none | **N O S W** (O = Osten); nouns capital (Windrose, Legende); "Merksatz Nie Ohne Seife Waschen" d1 only (prints the order); never "Kompass" as head; Klasse 3 honesty |
| es | as en; continents 5 or 6 | none | none | **N E S O**; MX "oriente/poniente" vs "este/oeste": the page uses este/oeste (the letters must be the words' initials, validator 4); SEP continent count; "ficha" never in a title |
| pt | as en | none | none | **N L S O** (leste); 6 continentes; "atividade" never in a title; colaterais refused |
| fr | as en; continents 5 or 6 | none | none | **N E S O**; title carries "sur un plan / sur une carte", never "dans l'espace" (position-words owns it) nor "boussole" (treasure-hunt); "les 5 continents" |
| it | as en | none | none | **N E S O** (ovest); "i cinque continenti"; continenti = classe quinta honesty; "scheda" never in a title |
| nl | as en | none | none | **N O Z W**; noord/oost/zuid/west lowercase; werelddelen count contested (panel); "werkblad" never in title |
| sv | as en | none | none | **N Ö S V** (norr, öster, söder, väster); "väderstreck" vs our "Vädersymboler" (keep visibly different); "kompass" is treasure-hunt's |
| da | as en | none | none | **N Ø S V**; verdenshjørner = the mode name: compound every title; Ø glyph in Baloo (engineer measures) |
| no | as en | none | none | **N Ø S V** (sør); "himmelretninger" lowercase (demanded "stor bokstav" question, m); "kart og kompass" = DNT orienteering, avoid |
| fi | as en; continents 6 or 7, oceans 3-5 | none | none | **P I E L**: fi E = SOUTH and L = WEST (pt L = east): the cross-locale letter trap; row chips use nominative "pohjoinen" as a label, never inside a sentence (case); maanosat count `[NSR-FLAG]` |

Frames never inflect: every word on the body is a stand-alone label (key word, direction word chip, bank name). The only sentences are the instruction and the title.

## D. Data + gates

```js
// data/b5/maps.js  (locale-neutral)
module.exports = {
  SYMBOLS: ['house','tree','bush','pond','bench','tent','flowerBed','bridge'],
  LINE_FEATURES: ['road','river','path'],
  NEAR_MISS: [['tree','bush']],
  DIRS: ['n','e','s','w'],                       // clockwise; rose tip index 0..3 = up,right,down,left at rot 0
  TOPSIDE: { cup:{cls:'circle'}, bucket:{cls:'circle'}, roundTable:{cls:'circle'}, tree:{cls:'circle'},
             rectTable:{cls:'rect'}, bed:{cls:'rect'}, car:{cls:'rect'}, house:{cls:'rect'},
             chair:{cls:'square'}, cone:{cls:'square'} },
  TOPSIDE_NEVER_TOGETHER: [['cup','bucket'],['rectTable','bed']],
  REGIONS: ['northAmerica','southAmerica','europe','asia','africa','oceania','antarctica'],
  OCEAN_IDS: ['pacific','atlantic','indian','arctic','southern'],
  REFUSED_PICS: ['camping/compass','classroom/map','camping/map'],
  WORLD_SOURCE: { dataset:'Natural Earth 1:110m land', licence:'public domain', centre:10, crop:{n:75, sNoAntarctica:-56, s:-90} },
};
// data/b5/locales/maps.<loc>.json
{ "symbolWords": {"house":"", /* 8 */ },
  "dirWords":   {"n":"","e":"","s":"","w":""},
  "dirLetters": {"n":"","e":"","s":"","w":""},
  "continentSet": [ {"id":"america","regions":["northAmerica","southAmerica"]}, /* … */ ],
  "continentNames": {"america":"", /* per set member */ },
  "oceanSet": ["pacific","atlantic","indian"],
  "oceanNames": {"pacific":"", /* per member */ },
  "mnemonic": "",                               // F2 d1 only
  "setSource": "",                              // the textbook/curriculum the panel cites for the counts
  "strings": {"base":{"title":"","instruction":""},"top-view":{},"compass-rose":{},"continents":{},"continents-oceans":{},"directions-on-map":{}} }
```
Reuses: `blankNumeralBox` (base), `.ws-match` two-column layout (F1, as `science-pair-match`), `rulingBlock` lines (F3/F4), `cardGrid` (F2). Loaded by `lib/b5-common.js bank('maps', loc)`.

**Validator (`tools/validate-b5-draft.js`, maps rules):** (1) every key present, trimmed, non-empty, NFC; (2) `dirLetters[d]` === the first grapheme of `dirWords[d]` uppercased, for all 4 (catches oriente/E, a wrong fi letter, a pt E); (3) the 4 letters pairwise distinct and the 4 words pairwise distinct; (4) every `REGIONS` id appears in exactly one `continentSet` member, except `antarctica`, which may be absent (then crop = −56); (5) continent names pairwise distinct, count 5..7, === set size; (6) `oceanSet` ⊆ OCEAN_IDS, size 3..5, `southern` ∈ set ⇒ antarctica ∈ continentSet; (7) no continent name equals an ocean name; (8) 8 symbol words pairwise distinct, none contains a digit; `tree` ≠ `bush` literal; (9) instructions ≤ 150 chars, no free-predication, no apparatus word the face lacks (F1: no "write"; base: no "circle"; F5: no "line"); (10) titles never contain the locale's compass-mode name as the WHOLE title, never "kompass/boussole/bússola/bussola/kompas" as head, fr never "dans l'espace", never the locale worksheet-word; (11) `setSource` non-empty (the count must be cited, never assumed).

**Poison cases (each must FAIL; the correct draft is the control):** P1 pt `dirLetters.e:"E"` · P2 de `dirLetters.e:"E"` · P3 fi letters N/E/S/W · P4 es `dirWords.e:"oriente"` with letter E · P5 sv `dirLetters.e:"O"` (missing diacritic) · P6 fr continentSet with `northAmerica` in two members · P7 it set of 5 with `antarctica` absent but render crop at −90 · P8 oceanSet contains `southern` while Antarctica excluded · P9 continent name === ocean name (nl "Oceanië" typo in oceans) · P10 base row printing the symbol at d2 · P11 F1 page containing cup AND bucket · P12 F2 d2 with a turned rose carrying the N marker · P13 F5 question whose ±45° sector holds two places · P14 F3 bank order === numeral order · P15 any `REFUSED_PICS` src in a render · P16 F5 plan with a drawn grid line or an "A/1" axis label · P17 en title "Compass Directions" (bare mode name) · P18 base count row whose answer is 0.

**`qa/verify-b5-maps.js` asserts on the render (6 faces × 11 locales):** body ≤ 722 (677 at a 4-line fi title), no overflow; floors: K F1 views ≥ 56 px (ships 64); G1 base symbols ≥ 40 px drawn / key symbols ≥ 36, key words ≥ 17 px, numeral boxes ≥ 44; G2 rose ≥ 140 px with letter boxes ≥ 36, F5 symbols ≥ 40 and chips ≥ 44; G2-G3 map anchors ≥ 26 px with numerals ≥ 20, lines glyphH ≥ 24, bank words ≥ 17 px; geometry measured from pixels: base placed-symbol count per id === stamp, no symbol on a road/river band; F2 recomputed letter per tip from the rendered rotation; F3/F4 each anchor centre inside its member's polygon (land) or outside all land (ocean), every member numeral present on each of its regions; F5 sector uniqueness recomputed from rendered coordinates; no answer printed (boxes/lines empty, no chip circled, no line drawn in F1); position tells measured on the SHIPPED seed (locale-independent, so a tell ships to all 11): base row answers, F1 right-column order, F2 given-letter/rotation sequence, F3/F4 numbering vs bank, F5 correct-chip positions.

## E. SEO

**Titles (panels finalise; ≤ 70; never the worksheet word):**

| face | en | de | es | pt | fr | it | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| base (G1) | Map Skills: Read the Map Key | Karte lesen: Kartenzeichen und Legende | La simbología del mapa | A legenda do mapa | Se repérer sur un plan : la légende | La legenda della mappa | Kaartlezen: de legenda | Kartans teckenförklaring | Kortets signaturforklaring | Kartets tegnforklaring | Karttamerkit ja kartan selitykset |
| top-view (K) | Bird's-Eye View: From the Side and From Above | Vogelperspektive | Vista desde arriba y de frente | Vista de cima e vista de frente | Vue de dessus et vue de face | Visto dall'alto e di fronte | Bovenaanzicht en vooraanzicht | Sett ovanifrån och från sidan | Set oppefra og fra siden | Sett ovenfra og fra siden | Ylhäältä ja sivulta katsottuna |
| compass-rose (G2) | Compass Rose: North, East, South, West | Himmelsrichtungen: die Windrose | Puntos cardinales: la rosa de los vientos | Rosa dos ventos e pontos cardeais | La rose des vents | La rosa dei venti | De windroos | Kompassrosen och väderstrecken | Kompasrosen og verdenshjørnerne | Kompassrosen og himmelretningene | Kompassiruusu ja ilmansuunnat |
| continents (G2) | Label the Continents | Kontinente beschriften | Los continentes | Os continentes | Les continents | I continenti | Werelddelen benoemen | Världsdelar | Verdensdele | Verdensdeler | Maanosat |
| continents-oceans (G3) | Continents and Oceans | Kontinente und Ozeane | Los continentes y los océanos | Continentes e oceanos | Les continents et les océans | Continenti e oceani | Werelddelen en oceanen | Världsdelar och världshav | Verdensdele og verdenshave | Verdensdeler og verdenshav | Maanosat ja valtameret |
| directions-on-map (G2) | Cardinal Directions on a Map | Himmelsrichtungen auf der Karte | Puntos cardinales en el mapa | Pontos cardeais no mapa | Les points cardinaux sur un plan | Punti cardinali sulla mappa | Windrichtingen op de kaart | Väderstreck på kartan | Verdenshjørner på kortet | Himmelretninger på kartet | Ilmansuunnat kartalla |

⚠ F1 non-en titles above pair "above" with "front" (the orthographic pair a teacher names); en "side" is kept (the child's word); panels choose. Type-name (hub rail) candidates for `axes['exercise-type'].maps.name` (SEO panel rules; must differ from every face title): en "Map Skills" · de "Karten und Himmelsrichtungen" · es "Mapas y puntos cardinales" · pt "Mapas e orientação" · fr "Plans et cartes" · it "Carte e orientamento" · nl "Kaartlezen en windrichtingen" · sv "Kartkunskap" · da "Kort og verdenshjørner" · no "Kart og himmelretninger" · fi "Kartat ja ilmansuunnat" (⚠ en base title contains "Map Skills": panel makes the base "Read the Map Key" if the rail name stays "Map Skills").

**Meta MIDDLEs (en source; whole meta 120-170; panels rebuild):**
- base: "Children read the map key, find each thing on a park map drawn from above and write how many there are, telling a tree from a bush by its symbol" (≈140)
- top-view: "Each everyday thing is drawn from the side; children draw a line to the same thing seen from above, the first step to reading a map" (≈129)
- compass-rose: "Six compass roses, some turned, each showing one letter: children write the other three, because north, east, south and west always go round in order" (≈150)
- continents: "Children write the name of each numbered continent on a simple world map, copying the names from the box" (≈104; the family skill sentence competes, rule 8)
- continents-oceans: "Children write the names of the numbered continents and oceans on a world map, choosing from one box, so they decide land or sea for every name" (≈143)
- directions-on-map: "From a starting place on a park map, children look north, east, south or west and circle the one place they find in that direction" (≈128)

**Coordinates:** `{type:'maps', mode:'base'|'top-view'|'compass-rose'|'continents'|'continents-oceans'|'directions-on-map', level: LEVEL_KEYS[loc][band], theme:''}` (bands G1 · K · G2 · G2 · G3 · G2; LEVEL_KEYS m: no = 2-trinn / 1-trinn / 3-trinn / 3-trinn / 4-trinn / 3-trinn).

**Non-cannibalisation (estimated whole-page word-3-gram Jaccard; engineer measures):** base↔F5 ≈ 0.18 (shared "park map", symbols) · F2↔F5 ≈ 0.20 (shared "north, east, south, west"; heads differ by apparatus "rose" vs "on a map") · F3↔F4 ≈ 0.30 (the highest: F4 = F3's head + "and oceans"; landings must not share paragraphs; F4 owns land-or-sea) · base↔F1 ≈ 0.10 ("from above") · F1↔F3 < 0.05 · **F2/F5↔treasure-hunt compass landings ≈ 0.10** (shared direction words; no "with a compass", no steps, no grid) · **F5↔G2-279 grid-coordinates ≈ 0.05** · **base↔K-065 left-and-right ≈ 0.03** · fr base↔position-words "Se repérer dans l'espace" ≈ 0.12 (shared "se repérer"; "sur un plan" + "légende" separate them) · sv compass-rose↔K-356 "Vädersymboler" < 0.05. Same-grade pairs to watch: F2↔F3↔F5 (G2).

## F. Open questions + summary

**Engineer must measure:** Natural Earth simplification tolerance vs legibility at 639 px (Europe ≥ 60 px wide, the Europe/Asia dashed split visible, New Zealand and Madagascar still drawn); anchor placement inside each polygon (pole of inaccessibility) and the Pacific double-numeral; F4 stack at 12 lines with a 3-line fi title; `Ø`, `Ö` and fi letters in Baloo 2 at the rose box size; base plan packing (≤ 20 symbols at 40 px, gap ≥ 8, none on a band); all Jaccards against the published corpus incl. the 374 treasure-hunt compass landings.
**Only a native panel can rule:** the continent set and count (es 5/6, fr 5/6, it 5/6, nl 6/7, fi 6/7) with a cited source (`setSource`), "Australia" vs "Oceania" naming, the ocean set (de 3 vs 5; en 4 vs 5); es este/oeste vs oriente/poniente; the 8 key words' citation forms (singular nominative, de capital, sv/da/no indefinite); the F1 view pair ("side" vs "front"); the strand literal per locale (no social-studies row exists); each landing's above-band sentence (pt 6º ano, it quinta, fr cycle 3 for points cardinaux, nl groep 5-6, de Kl 3-4, fi 3-4 lk).
**Critic decisions:** F2 d2 with 3 turned roses (G2) vs upright-only; F4 at G3 vs G2; the mixed bank in F4 vs two banks; subject bucket (spatial-reasoning vs a future social-studies subject).

**Summary.** Six faces, all CODE on one `layout` knob over four NEW primitives (`map-symbol`, `compass-rose` with locale letters, `top-side-view`, `world-map` from Natural Earth, engineer-gated), no library picture (camping/compass REFUSED: baked English N E S W): base Read the Map Key (G1, word → key → count on a plan, tree/bush near-miss) · F1 Bird's-Eye View (K, match side view to top view) · F2 Compass Rose (G2, complete six roses, three turned, locale letters) · F3 Label the Continents (G2, locale set and count) · F4 Continents and Oceans (G3, one mixed bank, land or sea) · F5 Directions on a Map (G2, one look from a start place, unique place per sector). Refusals: none (66/66); continent/ocean counts and letters are locale DATA (fi P I E L, pt N L S O, de/nl O, sv/da/no Ö/Ø V). Above band stated per landing (continents pt/it/nl/fi/de; points cardinaux fr).
