# G1-378 `earth-and-space` : PEDAGOGY + CONTENT (nt10-E, 2026-09-23)

Read: `_ROLE-PEDAGOGY.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md` (DELTA + nt10-D sheet), `_PANEL-FINDINGS.md` (lock row 6 + the `earth-and-space` ruling), the `space` sections of `_work/_selection-pedagogy.md` (§4), `_selection-seo-germanic.md` (§4 + collision register), `_selection-seo-romance.md` (§7), `_selection-seo-nordic.md` (§4); `types/k/K-208-day-night.js` + `data/science/day-vs-night.json`; `primitives/water-cycle.js` (sun geometry); `templates/components-b3/ordinal-numbers.js blankNumeralBox`; `frontend/config/topics-taxonomy.json` (`axes.theme.space`); `scripts/seo-landing/gen-b3-landings.js LEVEL_KEYS`; `_work/G1-376-pedagogy.md` (format + the shared sun glyph). (m) = measured 2026-09-23 with read-only node (`lib/b2-common.js entriesFor('space', loc)`, taxonomy JSON, `sharp` stats) or by OPENING the picture: all 19 files of `cache/themes/space/*@3x.webp` rendered to contact sheets `scratchpad/G1-378-pics/{sheet,planets,planets-grey}.png` and read with the Read tool, colour AND greyscale. *est.* = the engineer measures in the real render. No em-dashes.

**Boundary (load-bearing).** K-208 `science-sort` "Day and Night" (m) sorts 12 PICTURES into Day/Night bins by when we see them (`weather/sun`, rainbow, kite, cloud, bird, sunny | `space/moon`, `shapes/star`, owl, bat, `space/comet`, `space/planet`): that is day/night as a CLASSIFICATION of things. K-211 hot/cold carries `weather/sun`; K-322 seasons (+K-338..341) owns seasons; K-356 weather-symbols (+G3-385 water cycle) owns weather and the drawn water-cycle sun; G1-203 `science-sequence` owns ordering library pictures in a line. No existing id prints a moon phase, a planet name, an orbit or the Earth's rotation (m: grep over `types/`, `data/science`, `data/b3`, `data/b4` finds planet words only inside letter/sound banks). Therefore `earth-and-space` owns: (1) the three bodies Sun / Earth / Moon identified by TRUE, one-body-only facts (the misconception set: the Sun is a star, the Moon makes no light of its own), (2) the Moon's changing SHAPE as an ordered pattern, drawn by a NEW `primitives/moon-phase.js` with a hemisphere flag, (3) the four principal phase NAMES, (4) day and night CAUSED by a spinning Earth facing or not facing the Sun (a model, never a sort of things), (5) the eight planets by NAME: their order from the Sun and their size class. No face ever sorts pictures into Day/Night bins, no face uses the words "day and night" as its whole title (K-208 en title "Day and Night", m), no face names a season or a weather, and no title is the bare theme word (`axes.theme.space` slugs m: space / weltraum / espacio / espaco / espace / spazio / ruimte / rymden / rummet / verdensrommet / avaruus).

## A. Identity

| loc | genre head (panels; never the theme word) | school year (base G1) | national strand (framework NAME) | CCSS (en only, honest) |
|---|---|---|---|---|
| en | **solar system** (A, HARD) + **moon phases** (A; WINNABLE "moon phases worksheet 1st grade", "planets in order worksheet") | grade 1 | Science | none (science). NGSS: base + F1 = **1-ESS1-1** (patterns of sun and moon; G1, in band); F2 names = readiness for 1-ESS1-1 (names not required); F3 = 5-ESS1-2 (ABOVE band, landing says so); F4/F5 planets = not in K-5 NGSS DCIs (ABOVE band, landing says so) |
| de | **Planeten** (A-) / **Mondphasen** (Kl 3-4 real, thin Kl 2) / "Sonne, Erde, Mond" | 1. Klasse | Sachunterricht | n/a; Lehrplan Sachunterricht "Sonne, Erde, Mond; Tag und Nacht" Kl 3/4 (F3, F4, F5 at Kl 3 honest; F2 Mondphasen said Kl 3-4) |
| es | **el sistema solar** / **fases de la luna** (A; WINNABLE "para primer grado", "segundo grado") | primer grado | Conocimiento del Medio | n/a; SEP/NEM "el Sol, la Tierra y la Luna; día y noche" 2º-3º; planets: panel verifies grade |
| pt | **sistema solar** / **fases da lua** (A-) | 1º ano | Ciências | n/a; BNCC EF03CI08 (periods of day/night, objects in the sky) G3; moon phases EF05CI12 and planets ABOVE band (landing says so) |
| fr | **le système solaire** / **les phases de la lune** (A; WINNABLE "ce1 pdf", "cp") | CP | Questionner le monde | n/a; programmes cycle 2 "alternance jour/nuit" CE2 (F3 in band); phases + planets cycle 3 (ABOVE, landing says so) |
| it | **il sistema solare** / **le fasi lunari** (B; tail sits in classe quinta) | classe prima | Scienze | n/a; Indicazioni: dì/notte terza; sistema solare quinta (ABOVE, landing says so) |
| nl | **Zonnestelsel** (C) / **Maanfasen** | groep 3 | Oriëntatie op jezelf en de wereld | n/a; SLO kerndoel 46 (aarde, zon, maan) groep 4-5; planets groep 6 (ABOVE) |
| sv | **Solsystemet** / "planeterna", "månens faser" (A-) | åk 1 | Naturorienterande ämnen | n/a; Lgr22 NO åk 1-3 (celestial bodies' movements; day, night): in band, panel verifies wording, never quoted in metadata |
| da | **Solsystemet** / "planeterne" (A-, cleanest Danish tail) | 1. klasse | Natur/teknologi | n/a; Fælles Mål 1.-3. kl "jorden, solen og månen": in band |
| no | **Solsystemet** / "planetene" (B) | 2. trinn | Naturfag | n/a; LK20 after 4. trinn (G2-G3 faces in band at 3.-4. trinn) |
| fi | **Aurinkokunta** / "planeetat", "kuun vaiheet" (B-) | 1. luokka | Ympäristöoppi | n/a; OPS 2014 ympäristöoppi 1-2 / 3-6 (vuorokausi, kuun vaiheet 2-3 lk); panel verifies |

Measured: `apps['earth-and-space']` and `axes['exercise-type']['earth-and-space']` ABSENT (m); no existing slug in any axis collides with sol/planet/mond/lune/luna/lua/maan/kuu/aurinko/stelsel (m, the only regex hits were `maanden`/`maaneder`/`sistema-monetario`, unrelated). Register `default_subject:'science'`, `default_age_range:'6-8'`. The `Science` row of `strand-names.ts` exists (m).

**Theme axis: OFF** (`themeAxis:{applicable:false}`; landings `coordinate.theme:''`). Everything that must be ACCURATE is drawn by a primitive; the one library picture used is a fixed (theme, noun) pair in the bank with `picOpened:true`. **No `unitAxis`.**

**Opened-picture ruling, all 19 `space/*` files (m, colour + greyscale sheets):**

| picture | verdict | use |
|---|---|---|
| earth | ACCURATE (Europe/Africa, oceans, clouds); readable in grey | allowed (base chip / key only) |
| moon | a near-full Moon with a dark bluish limb on the LEFT (reads as a waxing gibbous in the north) | allowed as "the Moon" on the base key ONLY; **never on a phase face** (it is itself a phase, and wrong for pt) |
| mars | ACCURATE (red with dark regions) | not used (see rule below) |
| jupiter | ACCURATE-ish (cream/orange bands, no red spot) | not used |
| saturn | ACCURATE (rings); small in its frame (alpha mean 59 of 255 vs ~170 for the others, m) | not used |
| **mercury** | **WRONG**: a banded tan gas-giant (Mercury is grey and cratered) | REFUSED |
| **venus** | **WRONG**: diagonal red/orange stripes (Venus is pale, featureless cloud) | REFUSED |
| **uranus** | **WRONG**: cream/red banded (Uranus is pale cyan, near featureless) | REFUSED |
| **neptune** | WEAK: grey-blue with brown bands (Neptune is deep blue) | REFUSED |
| planet (generic) | an orange ringed planet: a Saturn look-alike | REFUSED (collides with saturn) |
| asteroid | a round cratered sphere: reads as the Moon or Mercury | REFUSED |
| comet | a red puffy smoke trail: not recognisable | REFUSED |
| galaxy | OPAQUE dark square (no transparency) | REFUSED |
| **sun** | OPAQUE black square | BLOCKED (already, `b3-picture-index BLOCKED`) |
| meteor, rocket, satellite, telescope, astronaut | correct objects, not on-topic for any face | not used |

**Planet-picture rule (overrides the lock's "planets use the 8 library planet pictures"):** 4 of 8 planet pictures are astronomically wrong and 5 of 8 (mercury venus jupiter uranus neptune) are indistinguishable banded spheres in greyscale (m, `planets-grey.png`); a mixed set would teach that Venus is striped and Uranus is brown. **No face shows a library planet picture.** Planets are NAMES (panel literals) placed on a drawn apparatus; any planet disc the design draws is a plain palette circle, identical for all eight, never sized or ringed (a ring would print Saturn's position).

**Vocabulary facts that force the design (m):** all 19 space nouns have vocab ×11, but as CITATION forms that are wrong in a sentence: en "Moon"/"Sun" capitalised, sv/da/no `sun` = "Sol" (indefinite) while `earth` = "Jorden" (definite), fi "Maa"/"Kuu" nominative only, es/pt/fr/it without the article the astronomy register needs ("la Luna", "o Sol"). **The one rule that locks the type: every body name, planet name, phase name and fact on every page is a panel literal from `earth-and-space.<loc>.json`, never a vocab lookup, and every answer is a stamped fact of the drawing or a bank field (fact truth vector, phase index, planet index, size class, marker angle), never a word the code forms.**

**Hemisphere (the lock ruling, measured per locale):** the Moon's lit side is a locale fact. Northern (lit RIGHT when growing): en (US register; the en landing says "as seen from north of the equator"), de, es-MX (19-32 N: the crescent tilts toward a "boat" but its lit side still faces the evening Sun, so the northern drawing is correct), fr, it, nl, sv, da, no, fi. **Southern (lit LEFT when growing): pt-BR only.** Stored as `hemisphere:'N'|'S'` in `earth-and-space.<loc>.json`; the primitive mirrors on it; verify() re-derives the lit side from the stamp and the locale. F3 (day/night) is hemisphere-neutral by construction (Earth seen from above the North Pole, markers on the equator rim).

## B. The six faces

Common apparatus (NEW; design agents own the geometry, pedagogy owns these rules):
- `primitives/moon-phase.js`: `moonPhase({phase: 0..7, hemisphere:'N'|'S', r}) -> {svg, meta:{phase, litFraction, litSide}}`; phase 0 new, 1 waxing crescent, 2 first quarter, 3 waxing gibbous, 4 full, 5 waning gibbous, 6 last quarter, 7 waning crescent; lit fraction = (1 - cos(45°·phase))/2 = 0, .146, .5, .854, 1, .854, .5, .146; lit side RIGHT for 1-3 and LEFT for 5-7 when N, mirrored when S. Rules: the whole disc is ALWAYS outlined (a new moon is a dark disc, not an empty space; the child must see "the Moon is still there"); dark part = one dark-but-not-black palette fill (ink is too heavy on paper; inkSoft or a grid hatch, design decides) and lit part = white/cream, so greyscale keeps the contrast; the terminator is an ellipse arc (semi-axis r·|cos θ|), never a straight chord except at the quarters; no face, no craters on the phase disc (craters change nothing and cost legibility); minimum lit width of a crescent ≥ 10 px (r ≥ 36 at .146) and G1 disc diameter ≥ 80.
- `primitives/sky-bodies.js`: `sunDisc({r})` (disc + 8 rays, the `water-cycle.js` geometry r 30 / rays 38-54 coral, scaled; shared with G1-376's needs glyph; NO face drawn on it), `sunEdge({side:'left'|'right', h})` (a large partial disc cut by the card edge, so the Sun always reads BIGGER than the Earth), `earthTop({r, markerAngle})` (Earth seen from above the North Pole: circle, a small pole dot, a counter-clockwise rotation arrow, one coral pin at `markerAngle` on the rim; no continents, no shading).
- Drawn sizes never contradict nature: Sun > Earth > Moon on every page (not to scale; each landing says "not to scale"); Earth:Moon diameter ≥ 1.6.
- Every face is CODE on one additive `layout` knob (base `layout` undefined, byte-identical; faces stamp `data-lcs-layout`); guards key on the CONFIG (`d.layout`, `d.facts`, `d.rows`, `d.phases`), never on the level index. Face ids TBD by the emitter in the stated band.

### Base: Sun, Earth and Moon (G1, `G1-378`, layout undefined)
**Move:** READ a one-line fact and decide which of the three bodies it is true of (the misconception facts: the Sun is a star and makes its own light; the Moon only seems to change shape).
**Child:** "Read each sentence. Is it about the Sun, the Earth or the Moon? Circle it." (80)
**Params:** d1 `{rows:6, facts:{sun:2,earth:2,moon:2}, sizeFacts:true, chipPx:64}` · **d2 (ships)** `{rows:8, facts:{sun:3,earth:3,moon:2}|rng-balanced ≥2 each, sizeFacts:false, chipPx:56, key:true}` · d3 `{rows:10, sizeFacts:false, chipPx:48}` (unpublished). Layout: a key strip at the top (the three bodies drawn at honest relative size with their names, 120 high) + 8 fact rows, each [numeral badge][fact, Nunito 800 18, one line ≤ 44 chars en][three chips: Sun | Earth | Moon, same order on every row]. Stack d2 *est.*: key 120 + 8 × 64 + 7 × 10 = 702 ≤ 722 (rows `minmax(56px,1fr)`). `sizeFacts` (biggest/smallest of the three) are readable off the drawn key, so they are d1-only (a scaffold, not the shipped test).
**Fact pool (en source; every fact TRUE of exactly ONE of the three bodies, panel signs the full truth vector):** Sun: `ownLight` "It makes its own light." · `star` "It is a star." · `hottest` "It is the hottest of the three." · `biggest` "It is the biggest of the three." (d1) · Earth: `liveOn` "We live on it." · `oceans` "It has oceans of water." · `air` "It has air we can breathe." · `planet` "It is a planet." · `spinDay` "It spins round once every day." · Moon: `orbitsEarth` "It goes round the Earth." · `seemsToChange` "Its shape seems to change each month." · `craters` "It is covered in craters." · `smallest` "It is the smallest of the three." (d1). Pool 13 (11 non-size): d2 draws 8 with ≥ 2 per body (m: sun 3, earth 5, moon 3 non-size).
**Forbidden facts (ambiguous or false; the validator rejects them by id AND by the panel's per-locale stem list):** "gives us light" (children count moonlight), "shines at night", "goes round the Sun" (Earth AND Moon), "is round", "spins" without "once every day" (all three spin), "we see it in the sky", "people have walked on it" (Earth and Moon), "has no air" (Moon and Sun), "reflects light" (Earth and Moon), anything with a number (distance, size in km), and **any sentence in which the Sun moves** ("the Sun goes round the Earth", "the Sun rises/goes down" as a claim about motion).
**verify():** stamps per row `data-lcs-fact=<id>`, `data-lcs-body=<sun|earth|moon>` (hidden truth), chips `data-lcs-chip=<body>`; re-derives body = the single `1` in `FACTS[id].truth`; asserts exactly one true body per row, per-body count ≥ 2, the row answer sequence has no run of 3 and is not periodic, no chip pre-circled, fact text === `facts[loc][id]`, the key never carries a fact word.
**Refusals:** none (13 literals authorable ×11; the frames never inflect: every sentence is a whole literal).
**Query face:** the bare family head as the lock's compound: en "sun, earth and moon" · de "Sonne, Erde, Mond" · fr "le soleil, la terre et la lune" (maternelle/cp demand) · es "el Sol, la Tierra y la Luna".

### F1: Moon Phases in Order (G1, `G1-3xx` TBD, CODE `layout:'phase-order'`)
**Move:** see the PATTERN: the lit part grows night after night to a full Moon and then shrinks; number the shapes in that order (1-ESS1-1, the one in-band en standard).
**Child:** "The Moon seems to grow, then shrink. Write 1 to 5 in each row, from the first moon to the last." (99; panel sharpens "first/last" with the row arrows)
**Params:** d1 `{rows:1, dir:['grow'], phases:[0,2,4]+[1,3], r:48}` (one growing row of 5) · **d2 (ships)** `{rows:2, dir:['grow','shrink'], perRow:5, r:44, givenFirst:false}`: row A = phases {0,1,2,3,4} shuffled, the child writes 1..5 from the new (dark) Moon to the full Moon; row B = {4,5,6,7,0} shuffled, 1..5 from full to new. Each row opens with a printed arrow glyph and two tiny anchor icons (dark disc -> full disc for A, full -> dark for B) so the direction is apparatus, not words. · d3 `{rows:1, phases:[0..7], givenFirst:true}` (the full 8-cycle, new moon printed as "1"; needs the lit-side knowledge; unpublished, it is F2-level).
**Why single-answer:** within a row lit fractions are strictly monotone (0 < .146 < .5 < .854 < 1), so the order is unique regardless of side; the side is still drawn correctly (N/S) because a wrong-sided page teaches a wrong Moon.
**verify():** stamps `data-lcs-phase` + `data-lcs-lit` + `data-lcs-litside` on each disc and `data-lcs-answer` (1..5) on each open `blankNumeralBox`; re-derives rank by litFraction (ascending in A, descending in B); asserts litSide === expected for (phase, hemisphere[loc]); the shuffled order ≠ sorted and ≠ reverse sorted in both rows; the two rows do not share the same answer-position sequence; boxes empty.
**Refusals:** none. pt renders mirrored; en/es landings say "as seen north of the equator".
**Query face:** "moon phases in order" / "Mondphasen ordnen" / "fases de la luna en orden" / "maanfasen op volgorde" / "månens faser i ordning".

### F2: Name the Moon Phases (G2, `G2-3xx` TBD, CODE `layout:'phase-names'`)
**Move:** attach the four school NAMES (new Moon, first quarter, full Moon, last quarter; the per-locale school set) to their shapes; the first/last quarter pair is the hemisphere-dependent test.
**Child:** "Look at each moon. Write its name on the line. Use the words in the word bank." (78)
**Params:** d1 `{cards:4, phases:[0,2,4,6], bank:true}` · **d2 (ships)** `{cards:8, phases:[0,2,4,6]×2, bank:true, bankPx:18, r:44, noAdjacentTwins:true}` (4 × 2 grid, each card a moon + one writing line, glyphH ≥ 24) · d3 `{cards:8, bank:false}` (recall; unpublished).
**Why only four shapes:** the Germanic/Nordic school names ("zunehmender Mond", "tiltagende måne", "voksende måne", "kasvava kuu") cover the WHOLE waxing half, so a crescent AND a quarter on one page would fit one name twice. With exactly {0,2,4,6} every name fits exactly one shape. The panel may choose the explicit half-moon names ("zunehmender Halbmond", "tiltagende halvmåne") and the validator enforces 4 pairwise-distinct literals.
**verify():** stamps `data-lcs-phase` per card, `data-lcs-bank=<phaseId>` per bank word; re-derives name = `phaseNames[loc][phase]`; asserts phases multiset === {0,2,4,6}×2, no two identical phases adjacent in reading order, litSide per hemisphere, lines empty, bank order ≠ first-4-cards order.
**Refusals:** none. pt: "quarto crescente" is lit on the LEFT (S); a northern-drawn pt page is the defect the gate catches. fr: never print the "lune menteuse" D/C mnemonic (northern-only; it would be FALSE on the pt sibling and is a d-level scaffold anyway).
**Query face:** "name the moon phases" / "Mondphasen benennen" / "fases de la luna con nombres" / "nommer les phases de la lune" / "kuun vaiheiden nimet".

### F3: Why Do We Have Day and Night? (G2, `G2-3xx` TBD, CODE `layout:'day-night-model'`)
**Move:** use the MODEL: the half of the spinning Earth that faces the Sun has day, the other half night. Decide for a marked place on a drawn Earth (causal; K-208 sorts things and cannot do this).
**Child:** "Look where the Sun is. Is it day or night at the red pin? Circle the word." (73; "red" is replaced by the panel with the pin's actual depiction, coral reads as red/orange: panel rules the colour word or uses "the pin")
**Params:** d1 `{cards:4, shadeNight:true}` (the night half shaded = scaffold; unpublished) · **d2 (ships)** `{cards:6, shadeNight:false, sunSide:['left','right'] balanced, answers:{day:3,night:3}, angles from {0,±30,±150,180}° relative to the Sun direction}` (2 × 3 cards; each card: `sunEdge` on one side, `earthTop` r ≥ 60 with one pin, two word chips reusing the K-208 bin labels `day-vs-night.json bins[].label` ×11, m) · d3 `{cards:6, shadeNight:false, ask:'next'}` (which pin gets sunrise next, using the rotation arrow; unpublished).
**Why single-answer:** the pin is never within ±40° of the day/night boundary (90°), so "facing the Sun" is unambiguous at a glance; the Earth is NOT shaded on the shipped level (shading would print the answer).
**verify():** stamps `data-lcs-sunside`, `data-lcs-angle` (degrees from the Sun direction) and hidden `data-lcs-answer=day|night` per card; re-derives day iff |angle| < 90; asserts min | |angle| - 90 | ≥ 40, 3/3 split, sun side not constant and not strictly alternating, no night shading element when `shadeNight:false`, rotation arrow counter-clockwise (seen from above the North Pole), chips unmarked.
**Refusals:** none (hemisphere-neutral; high latitude irrelevant because pins sit on the equator rim, which also avoids the Nordic midnight-sun objection).
**Query face:** "why do we have day and night" / "Wie entstehen Tag und Nacht?" / "¿por qué hay día y noche?" / "l'alternance du jour et de la nuit" / "hvorfor bliver det dag og nat".

### F4: Planets in Order from the Sun (G3, `G3-3xx` TBD, CODE `layout:'planet-order'`)
**Move:** recall the fixed sequence Mercury to Neptune and WRITE each name in its place outward from the Sun.
**Child:** "Write the planets in order, starting next to the Sun. Use every name in the word bank once." (93)
**Params:** d1 `{slots:8, bank:true, mode:'number'}` (write 1-8 under 8 shuffled name cards) · **d2 (ships)** `{slots:8, bank:true, mode:'write', bankPx:18, glyphH:24}`: `sunEdge` at the top (or left), eight identical plain orbit slots numbered 1..8 outward, each with one writing line; the bank prints the 8 names shuffled · d3 `{bank:false}` (recall; unpublished). The panel's mnemonic (de "Mein Vater erklärt mir jeden Sonntag unseren Nachthimmel", sv/no "ramsa/regle") may appear ONLY on d1 (it prints the initials = half the answer).
**Why single-answer:** the order is a fixed fact; 8 names, 8 slots, bank used once. **Never Pluto** (validator), never "dwarf planet", no distances or sizes printed.
**verify():** stamps `data-lcs-slot=<1..8>` + hidden `data-lcs-answer=<planetId>`; re-derives from `PLANETS` order; asserts bank set === PLANETS, bank order ≠ answer order, ≠ its reverse, ≠ the locale's alphabetical order of the literals, all orbit discs byte-identical (no ring, no size), lines empty.
**Refusals:** none. ABOVE band in en/pt/fr/it/nl (each landing says where the curriculum places it); in band de Kl 3, sv/da/no/fi per the Nordic panel's demand.
**Query face:** "planets in order" / "Planeten Reihenfolge" / "el sistema solar y sus planetas en orden" / "ordem dos planetas" / "planeternas ordning" / "planeetat järjestyksessä Auringosta".

### F5: Giant and Rocky Planets (G3, `G3-3xx` TBD, CODE `layout:'planet-sizes'`)
**Move:** CLASSIFY by size class, and catch the misconception that the Sun and the Moon are planets.
**Child:** "Sort the names. Write each one in the right box: giant planet, small rocky planet or not a planet." (98)
**Params:** d1 `{items:8, bins:['giant','rocky']}` · **d2 (ships)** `{items:10, bins:['giant','rocky','notPlanet'], notPlanet:['sun','moon'], bankPx:18}` (three boxes with ruled lines; the 10 names in a bank) · d3 `{items:10, bins:3, bank:false}` (unpublished).
**Honest size data (NASA equatorial diameters, km; for the validator, NEVER printed):** Mercury 4,879 · Venus 12,104 · Earth 12,756 · Mars 6,792 · Jupiter 142,984 · Saturn 120,536 · Uranus 51,118 · Neptune 49,528 · Moon 3,475 · Sun 1,392,700. Giant = Jupiter Saturn Uranus Neptune; rocky = Mercury Venus Earth Mars. The smallest giant is 3.9 × the largest rocky planet, so the class is unarguable; a full size ORDER is refused (Uranus/Neptune differ by 3 %, Venus/Earth by 5 %: single-answer but a trivia trap, not a K-3 skill).
**Labels:** "giant" not "gas" (Uranus and Neptune are ice giants; en "gas planets" would be false for two of four). The panel may use its curriculum's term only if it is true (de "Riesenplaneten" / "Gesteinsplaneten"; fr "planètes géantes" / "planètes rocheuses"; fi "jättiläisplaneetat" / "kiviplaneetat"); "not a planet" literal per locale.
**verify():** stamps hidden `data-lcs-class` per bank name; re-derives from `SIZE_CLASS`; asserts bin counts 4/4/2, bank order not grouped by class (no 3 consecutive same class), boxes empty, no size, number or picture printed.
**Refusals:** none.
**Query face:** "planet sizes" / "Planeten nach Größe" / "planetas rocosos y gigantes" / "planeternas storlek" / "planeternes størrelse" / "planeetat koon mukaan".

**Rejected non-moves.** Star, planet or moon picture sort (art does not exist: only one star is drawable, `shapes/star` is a SHAPE, `space/asteroid` reads as the Moon, 4 of 8 planet pictures are wrong) · colour/label the solar system with library planets (teaches striped Venus) · moon diary (open, weather-bound, thin query face outside en; a d-level of F1 at most) · planet-facts riddles "hottest/has rings" (Venus-hottest is a surprise fact above band, rings print Saturn in a drawing; and needs a picture set we refuse) · full size ORDER of 8 (3-5 % gaps) · day/night picture sort (K-208) · seasons from the tilt (K-322 owns seasons; above band).

## C. Native rebuild ×11

| loc | literals the panel authors (counts) | slots/forms needed and where they exist | refusal/re-target | traps |
|---|---|---|---|---|
| en | 3 body names, 13 facts (+ stems of forbidden facts), 4 phase names, 8 planet names, 3 size-class labels, 6 × {title, instruction} = ~49 | none (whole literals; vocab NOT used) | none | "Moon/Sun/Earth" capitalised as proper nouns consistently; "first quarter" is a HALF disc (landing explains); US northern note |
| de | as en | none; `objForms.de dat` not needed (no frame inflects) | none | die Sonne / die Erde / der Mond in facts; nouns capital; "Sonnensystem" not "Solarsystem"; Merksatz d1 only; "Weltraum" never in a title |
| es | as en | none | none | "el Sol, la Tierra, la Luna" capitalised in the astronomy register (SEP); planets without Plutón; MX register; northern; "El espacio" never in a title |
| pt | as en + `hemisphere:'S'` | none | none | **mirror** (quarto crescente lit LEFT); Vênus / Netuno / Mercúrio (BR); "atividade" never in title; "sistema solar off grid" noise |
| fr | as en | none | none | le Soleil / la Terre / la Lune; nouvelle lune, premier quartier, pleine lune, dernier quartier; no "lune menteuse"; "L'espace" never in a title |
| it | as en | none | none | Giove / Venere / Nettuno; luna nuova, primo quarto, luna piena, ultimo quarto; landing: sistema solare = classe quinta |
| nl | as en | none | none | de zon / de aarde / de maan (lowercase in running text; panel rules capital for the body names); "ruimte" never in a title; het zonnestelsel |
| sv | as en | none; vocab "Sol" (indef) vs "Jorden" (def) inconsistent → literals | none | solen / jorden / månen as a set in ONE definiteness; Merkurius / Saturnus; "Rymden" never in a title; no 2026-calendar words |
| da | as en | none | none | solen / Jorden / månen capitalisation (panel); Merkur; "Rummet" never; "månens faser" calendar noise |
| no | as en | none | none | bokmål solen / jorden / månen; nymåne, voksende, fullmåne, minkende; "Verdensrommet" never |
| fi | as en | none; every fact a whole literal (case: "Se kiertää Maata" partitive) | none | Aurinko / Maa / Kuu capitalised as proper nouns vs "kuu" = month; uusikuu / täysikuu; "Avaruus" never in a title; "sukupuutto"-type autocomplete checks on heads |

Frames never inflect: the base chips carry the body NAMES only (nominative literal), the fact is a whole sentence with "It"/"Es"/"Se" as subject, so no agreement with a picture noun ever happens (fr "Elle" vs "Il" would reveal the gender of la Lune/le Soleil: **fr/es/it/pt/de facts must use a gender-neutral subject form** ("C'est une étoile.", "Es un planeta.", "È una stella.", "Es ist ein Stern." with neuter "Es" meaning "it (the thing)", panel checks it does not agree), else the article leaks the answer; the validator bans the gendered pronouns per locale list).

## D. Data + gates

```js
// data/b5/earth-and-space.js  (locale-neutral)
module.exports = {
  BODIES: ['sun','earth','moon'],
  FACTS: {                                   // truth = [sun, earth, moon]; exactly one 1
    ownLight:{truth:[1,0,0]}, star:{truth:[1,0,0]}, hottest:{truth:[1,0,0]}, biggest:{truth:[1,0,0],size:true},
    liveOn:{truth:[0,1,0]}, oceans:{truth:[0,1,0]}, air:{truth:[0,1,0]}, planet:{truth:[0,1,0]}, spinDay:{truth:[0,1,0]},
    orbitsEarth:{truth:[0,0,1]}, seemsToChange:{truth:[0,0,1]}, craters:{truth:[0,0,1]}, smallest:{truth:[0,0,1],size:true},
  },
  FORBIDDEN_FACT_IDS: ['givesLight','shinesAtNight','orbitsSun','isRound','spins','seenInSky','walkedOn','noAir','reflects','sunMoves'],
  PHASES: [0,1,2,3,4,5,6,7],                 // 45° steps
  NAMED_PHASES: [0,2,4,6],
  PLANETS: ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'],
  DIAMETER_KM: {mercury:4879,venus:12104,earth:12756,mars:6792,jupiter:142984,saturn:120536,uranus:51118,neptune:49528,moon:3475,sun:1392700},
  SIZE_CLASS: {mercury:'rocky',venus:'rocky',earth:'rocky',mars:'rocky',jupiter:'giant',saturn:'giant',uranus:'giant',neptune:'giant',sun:'notPlanet',moon:'notPlanet'},
  PICS: { earth:{theme:'space',noun:'earth',picOpened:true}, moon:{theme:'space',noun:'moon',picOpened:true,phaseFaces:false} },
  REFUSED_PICS: ['space/mercury','space/venus','space/uranus','space/neptune','space/planet','space/asteroid','space/comet','space/galaxy','space/sun'],
  DAYNIGHT_ANGLES: [0,30,-30,150,-150,180],
};
// data/b5/locales/earth-and-space.<loc>.json
{ "hemisphere":"N",
  "bodies":{"sun":"","earth":"","moon":""},
  "facts":{"ownLight":"", /* 13 */ },
  "forbiddenStems":["…"],              // panel: gendered pronouns, "goes round the Sun", "rises", numbers
  "phaseNames":{"0":"","2":"","4":"","6":""},
  "planets":{"mercury":"", /* 8 */ },
  "notPlanet":{"sun":"","moon":""},     // may equal bodies.*
  "classLabels":{"giant":"","rocky":"","notPlanet":""},
  "mnemonic":"",                        // d1 of F4 only
  "strings":{"base":{"title":"","instruction":""},"phase-order":{},"phase-names":{},"day-night-model":{},"planet-order":{},"planet-sizes":{}} }
```
Reuses: `data/science/day-vs-night.json bins[].label` (F3 chips, read-only, 11 locales m); `blankNumeralBox` (F1); sun geometry from `primitives/water-cycle.js` (shared with G1-376). Loaded by `lib/b5-common.js bank('earth-and-space', loc)`.

**Validator (`tools/validate-b5-draft.js`, earth-and-space rules):** (1) every key present, trimmed, non-empty; (2) each FACTS truth has exactly one 1; no id from FORBIDDEN_FACT_IDS present; (3) no fact literal contains a digit or matches a `forbiddenStems` entry (Unicode letter boundaries, `(?<!\p{L})…(?!\p{L})`); (4) de/fr/es/it/pt facts contain no gendered subject pronoun from the locale list; (5) the four phaseNames and eight planet names pairwise distinct after NFC-lowercase; (6) no planet literal is "Pluto"/"Plutón"/"Plutão"/"Pluton"/"Plutone"/"Pluuto" etc. (panel list); (7) `hemisphere` ∈ {N,S} and === `S` iff loc = pt; (8) classLabels.giant does not contain the locale's "gas" stem (en gas, de Gas, fr gaz, es/pt/it gas/gás, nl gas, sv/da/no gas, fi kaasu) unless the panel files a curriculum citation; (9) instructions ≤ 150 chars, no free-predication, no apparatus word the face lacks (base: no "line"/"write"; F3: no "shade"/"colour"); (10) no title contains the locale's `axes.theme.space` name.

**Poison cases (each must FAIL; the correct draft is the control):** P1 fact `orbitsSun` in the pool · P2 `ownLight.truth=[1,0,1]` · P3 en fact "It gives us light." · P4 fr fact "Elle tourne autour de la Terre." (gender leak) · P5 pt `hemisphere:'N'` · P6 sv `hemisphere:'S'` · P7 phaseNames 2 === 6 ("halvmåne" twice) · P8 planets include `pluto` · P9 en classLabels.giant "gas planets" · P10 F4 bank order === answer order · P11 F2 page with a crescent (phase 1) among the named four · P12 F3 card at angle 80° · P13 F3 d2 render containing a night-shading element · P14 base title "Space" / de "Weltraum" · P15 `PICS` gains `space/venus` · P16 F1 row A rendered with litSide LEFT in en · P17 fact with a number "It is 150 million km away."

**`qa/verify-b5-earth-and-space.js` asserts on the render (6 faces × 11 locales):** body ≤ 722 (677 at a 4-line fi title) with no overflow; floors: G1 chips ≥ 44 (base 56), fact text ≥ 17 px, moon discs ≥ 80 px with crescent lit width ≥ 10 px, numeral boxes ≥ 44 × 44; G2 moon discs ≥ 72, Earth r ≥ 60, pin ≥ 14 px, word chips ≥ 40 high; G3 lines glyph ≥ 24, bank words ≥ 17 px; measured geometry: every phase disc's lit area / disc area within ±0.03 of `litFraction` and lit centroid on `litSide[hemisphere]` (poison: a pt page drawn N must fail); Sun drawn larger than Earth larger than Moon on every page that shows two of them; F3 pin angle recomputed from pixel coordinates within ±5° of the stamp; no library picture from `REFUSED_PICS` anywhere (src scan); no answer printed (lines/boxes empty, no pre-circled chip, no planet disc differing from its siblings); position tells measured on the SHIPPED seed (locale-independent, so a tell ships to all 11): base answer column, F1 box sequences, F3 sun side / answer, F4 bank vs slots.

## E. SEO

**Titles (panels finalise; ≤ 70; never the worksheet word; never the theme word):**

| face | en | de | es | pt | fr | it | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| base | Sun, Earth and Moon | Sonne, Erde und Mond | El Sol, la Tierra y la Luna | O Sol, a Terra e a Lua | Le Soleil, la Terre et la Lune | Il Sole, la Terra e la Luna | Zon, aarde en maan | Solen, jorden och månen | Solen, Jorden og Månen | Solen, jorden og månen | Aurinko, Maa ja Kuu |
| phase-order (G1) | Moon Phases in Order | Mondphasen ordnen | Fases de la luna en orden | Fases da lua em ordem | Les phases de la lune dans l'ordre | Le fasi lunari in ordine | Maanfasen op volgorde | Månens faser i ordning | Månens faser i rækkefølge | Månefasene i rekkefølge | Kuun vaiheet järjestykseen |
| phase-names (G2) | Name the Moon Phases | Mondphasen benennen | Fases de la luna con nombres | Nomes das fases da lua | Nommer les phases de la lune | I nomi delle fasi lunari | Maanfasen benoemen | Vad heter månens faser? | Månens faser og deres navne | Hva heter månefasene? | Kuun vaiheiden nimet |
| day-night-model (G2) | Why Do We Have Day and Night? | Wie entstehen Tag und Nacht? | ¿Por qué hay día y noche? | Por que existe dia e noite? | L'alternance du jour et de la nuit | Perché c'è il dì e la notte? | Hoe ontstaan dag en nacht? | Varför blir det dag och natt? | Hvorfor bliver det dag og nat? | Hvorfor blir det dag og natt? | Miksi on päivä ja yö? |
| planet-order (G3) | Planets in Order from the Sun | Planeten in der richtigen Reihenfolge | El sistema solar y sus planetas en orden | Ordem dos planetas do sistema solar | L'ordre des planètes du système solaire | I pianeti del sistema solare in ordine | Planeten op volgorde | Planeternas ordning | Planeternes rækkefølge | Planetenes rekkefølge | Planeetat järjestyksessä Auringosta |
| planet-sizes (G3) | Giant and Rocky Planets | Riesenplaneten und Gesteinsplaneten | Planetas rocosos y planetas gigantes | Planetas rochosos e planetas gigantes | Planètes rocheuses et planètes géantes | Pianeti rocciosi e pianeti giganti | Grote en kleine planeten | Planeternas storlek | Planeternes størrelse | Planetenes størrelse | Planeetat koon mukaan |

⚠ The en F3 title must never be "Day and Night" (= K-208's en title, m). Type-name (hub rail) candidates for `axes['exercise-type']['earth-and-space'].name` (SEO panel rules): en "Sun, Moon and Planets" · de "Sonne, Mond und Planeten" · es "El Sol, la Luna y los planetas" · pt "Sol, Lua e planetas" · fr "Le Soleil, la Lune et les planètes" · it "Sole, Luna e pianeti" · nl "Zon, maan en planeten" · sv/da/no "Solsystemet" · fi "Aurinkokunta". Base and type name must not be identical strings in any locale (en differs).

**Meta MIDDLEs (en source; whole meta 120-170; panels rebuild):**
- base: "Children read eight short facts and circle the Sun, the Earth or the Moon, learning that the Sun is a star and the Moon only seems to change shape" (≈146)
- phase-order: "Children write 1 to 5 under the moon shapes, first as the Moon seems to grow from new moon to full moon, then as it shrinks again" (≈128)
- phase-names: "Children write the name of each moon shape, new moon, first quarter, full moon or last quarter, using the four words in the word bank" (≈132)
- day-night-model: "A spinning Earth, the Sun on one side and a pin on each globe: children circle day or night, because the half facing the Sun has day" (≈131)
- planet-order: "Children write the eight planets from Mercury to Neptune in order, starting next to the Sun, using every name in the word bank once" (≈129)
- planet-sizes: "Children sort ten names into giant planets, small rocky planets and not a planet, and find out that the Sun and the Moon are not planets" (≈135)

**Coordinates:** `{type:'earth-and-space', mode:'base'|'moon-phases-in-order'|'moon-phase-names'|'day-and-night-model'|'planets-in-order'|'planet-sizes', level: LEVEL_KEYS[loc][band], theme:''}` (bands G1 · G1 · G2 · G2 · G3 · G3; LEVEL_KEYS m, no = 2-trinn / 3-trinn / 4-trinn).

**Non-cannibalisation (estimated whole-page word-3-gram Jaccard; engineer measures):** base↔F3 ≈ 0.10 (shared "the Sun"; different head "why … day and night") · F1↔F2 ≈ 0.22 (both "moon phases"; heads differ by the MOVE "in order" vs "name", not an adjective; landings must not share paragraphs) · F4↔F5 ≈ 0.18 ("planets" + "word bank") · base↔F5 ≈ 0.10 · F2↔F4 ≈ 0.12 ("word bank", "write … name") · **F3↔K-208 ≈ 0.08** (K-208 is "Draw a line from each picture to the group it belongs to"; our title/instruction never "Day and Night" bare) · base↔K-208 ≈ 0.05 · F3↔K-322 seasons ≈ < 0.05 · F1/F2↔G1-376 cycle ≈ < 0.05. Same-grade pairs to watch: F1↔base (G1), F2↔F3 (G2), F4↔F5 (G3).

## F. Open questions + summary

**Engineer must measure:** crescent legibility at r 44 in greyscale print (lit width ≥ 10 px, terminator visible); base stack with the key strip at a 3-line de/fi title; F3 card at 316 wide holding `sunEdge` + Earth r 60 + two chips; F4 bank width with the longest names (de "Merkur", fi "Merkurius", nl "Neptunus"; *est.* ≤ 110 px at 18 px); lit-area ratio of the primitive vs `litFraction` (±0.03); all Jaccards against the published corpus.
**Only a native panel can rule:** the four school phase names and whether the Germanic/Nordic set uses "Halbmond/halvmåne" (then the literal must still be one-shape-only); the gender-neutral fact subject in de/fr/es/it/pt (and whether "Es ist ein Stern" reads as neuter-thing, not der Stern agreement); capitalisation of Sun/Earth/Moon (nl, da, sv, no); the giant/rocky labels vs the curriculum's "gas planets" term; the colour word for the pin in F3; whether each landing's "above band" sentence names the right year (it quinta, fr cycle 3/CM1, pt 5º ano, nl groep 6, en middle school).
**Critic decisions:** overriding the lock's "8 library planet pictures" (opened: 4 wrong, 5 indistinguishable in grey); Earth as library picture vs primitive on the base key (style match with the drawn Sun/Moon); F5 kept at G3 vs moved to G2.

**Summary.** Six faces, all CODE on one `layout` knob over two NEW primitives (`moon-phase.js` with a hemisphere flag, `sky-bodies.js` sun/sun-edge/top-view Earth): base Sun, Earth and Moon (G1, circle the one body a true fact is about) · F1 Moon Phases in Order (G1, number growing and shrinking rows) · F2 Name the Moon Phases (G2, 4 school names on 8 moons) · F3 Why Do We Have Day and Night? (G2, pin facing the Sun or not; K-208 untouched) · F4 Planets in Order from the Sun (G3, write names from a bank) · F5 Giant and Rocky Planets (G3, sort 10 names incl. Sun and Moon as not-planets). Refusals: none (66/66 expected); pt mirrored (southern). No library planet picture used: mercury/venus/uranus/neptune pictures are wrong, generic planet/asteroid/comet/galaxy refused, sun blocked. Planets and phase names above band in en/pt/fr/it/nl, stated on each landing.
