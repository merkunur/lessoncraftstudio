# G1-378 `earth-and-space` : EDITOR-CRITIC record (2026-09-23)

Inputs: `G1-378-pedagogy.md`, `G1-378-design-A.md` ("the Sky Chart"), `G1-378-design-B.md` ("the Sun at the edge"). Output: `../G1-378-earth-and-space.md`. Rule: measured buildability > preference; the brief > both. Pictures opened by the editor this session (contact sheets `scratchpad/G1-378-crit-colour.png` + `G1-378-crit-grey.png` from `scripts/worksheet-gen/cache/themes/space/<noun>@3x.webp`): mercury venus earth mars jupiter saturn uranus neptune moon planet asteroid comet (colour AND greyscale). The pedagogy agent opened all 19 `space/*` files; designer A opened earth + moon; designer B opened none (used none). Renders read by the editor: none new (no primitive exists yet); the moon-phase path recipe was rasterised with `sharp` (`scratchpad/G1-378-crit-moon.js`).

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | lock (`_PANEL-FINDINGS.md`): "planets use the 8 library planet pictures (each OPENED)"; pedagogy overrides: no library planet picture | A and B: no library picture anywhere | **No `space/*` picture on any face** | opened by the editor: mercury is a banded tan gas giant, venus red-orange stripes, uranus cream/red bands, neptune grey with brown bands (4 of 8 astronomically wrong); in greyscale mercury/venus/jupiter/uranus/neptune are five indistinguishable striped spheres; `planet` is a Saturn look-alike, `asteroid` reads as the Moon, `comet` a red smoke trail. A mixed set teaches striped Venus. The lock's "each OPENED" clause is exactly what refutes its own premise |
| 2 | **the planet-drawing disagreement.** Pedagogy: any planet disc is a plain identical circle, never ringed or sized | A: NEW `planets.js`, 8 greyscale-distinct pattern glyphs at HONEST relative size, used only on the F4 bank. B: patterns leak answers (Saturn's ring prints slot 6, giants' bands print half the order, drawn size prints F5's class), and a stylised pattern is not a taught skill; all discs identical on sheets | **Split by surface.** (a) Every ANSWER surface is a plain identical disc (F4 orbit slots `orbitDisc`, byte-identical; F5 draws no planet at all; B + pedagogy win). (b) A's pattern glyphs are ADOPTED, but at ONE UNIFORM size, and only on the F4 name bank beside the printed name. (c) Honest-size glyphs are rejected everywhere | Leakage is a property of WHERE a glyph sits, not of the glyph. On a bank card the name is already printed, so a ring beside "Saturn" reveals no order: B's leak argument holds for slots and for F5, not for the bank. What DOES leak on the bank is size: A's honest radii print the rocky/giant split (half the order task) and draw Mercury at 13 px, where A's own 1.8-unit craters are 1 px and the pattern vanishes, so A's greyscale-distinctness claim fails at A's own sizes. Uniform r 30 in a 64 box (38 px discs) keeps every pattern legible, leaks nothing, and keeps the recognisability and delight (a child who has just written "Saturn" sees its ring) that a plain-disc-only family would lose. B's "not a taught skill" is true and is why no face ASKS the child to identify a glyph |
| 3 | base: key strip + 8 rows x three word chips, circle | A: Sky Chart, drawn bodies head three tick columns. B: three portraits + 4-box pockets, write clue numbers under the body | **A's Sky Chart** | names printed once not 24 times; the drawing is the answer column; tick not write (G1 writing load); the teacher checks one column pattern. B's pockets make a G1 child shuttle between a clue list and three pockets and offer 12 boxes for 8 answers (a numeral written twice is an easy slip, and a wrong answer is hard to spot). B's "Sun biggest" discipline is kept: disc 59.8 > 44 > 26, gated |
| 4 | F1: rows open with an arrow + two tiny anchor icons (dark disc -> full disc) | A: `dirKey` mini new Moon -> arrow -> mini full Moon. B: a widening wedge, NO moon icons | **B's wedge** | a new-Moon icon and a full-Moon icon at the ends of the cue identify the discs numbered 1 and 5 by matching: two of five answers printed (brief: the answer is never printed). The wedge carries "grows / shrinks" without depicting any shape |
| 5 | F1 disc r 44 (d 88) | A d 104 / box 52 x 52; B d 112 / box 56 x 44 | d **104**, box **52 x 48**, 5 slots x 118 in a 599 inner rail | fits the rail with padding (B's 5 x 127.8 = 639 leaves no card padding); crescent 14.0 px (>= 10); rail 254, stack 536 |
| 6 | F2: 4 x 2 cards, disc + one line | A: disc left in a 104 square + 2 ruled lines 185, stack 705. B: disc on top + one 290 line, stack 721 | **A's side-by-side log, lines 170 x 2; B's instruction "Use each word ... twice"** | B's 721 has 1 px of slack at 722 and relies on computing the disc radius from chrome; A's 705 compresses to 633 at 677. de "abnehmender Halbmond" handwritten ≈ 240 px *est.* needs two 170 lines; B's "twice" tells the child the bank is reused (8 cards, 4 words) |
| 7 | F3: 6 cards, each Sun edge + Earth r >= 60 + one pin + two chips | A: 2 x 3 model cards (six Suns). B: ONE model, Earth r 150, six numbered pins, answer table | **B's single model** | one focal drawing and one Sun per page (calm, and visibly different from F2's card grid); the concept IS "half the Earth at once"; r 150 makes pins legible. Cost: pin -> table lookup, acceptable at G2. The pedagogy's equator-rim pins become pins at 0.8 r (≈ 37° N in the pole view): no midnight-sun objection, and 25° spacing gives 51.9 px (>= 50) |
| 8 | F3 angles {0, ±30, ±150, 180} | B: day {0, ±25, ±50}, night {180, ±155, ±130} | B's sets | 6 distinct pins need 5-member pools per side; all >= 40° off ±90° |
| 9 | F4: orbit slots + one line each + bank | A: glyph bank on top + fan left + lines right (fan x_i = 70 + 18(i-1)). B: Sun quarter-disc + arcs omitted above-right of each disc + lines + name bank below | **B's fan geometry + A's bank (glyph cards, uniform size) on top** | B's arcs are proven not to cross a writing line; A's fan would draw full arcs behind the lines. Bank on top = reading order (bank, then task), stack 686 / 644 |
| 10 | F5: three boxes | A: two class boxes with 4 lines + a not-a-planet box with 2 lines | **B: 3 bins x 4 lines each (12 for 10 names)** | A's 4/4/2 line counts print the answer counts |
| 11 | base key may use the library `earth` and `moon` pictures | A + B: drawn | **drawn** (`earthDisc`, `moonDisc` full) | the opened earth is a photoreal render beside flat line art; the opened moon is a waxing gibbous lit RIGHT, itself a phase and wrong for pt |
| 12 | `moon-phase.js` API `{phase, hemisphere, r}` | A `{d}` viewBox 100, throws d < 72; B `{r}` px, throws r < 24 / crescent r < 36 | A's unit viewBox + `d`; throws d < 72 and crescent d < 80 | one unit geometry scales everywhere; the crescent throw keeps the 10 px lit-width floor (0.135 d) |
| 13 | type name "Sun, Moon and Planets" (base title differs) | B + lock working name "Sun, Earth and Moon" | type name = "Sun, Moon and Planets" (sv/da/no "Solsystemet", fi "Aurinkokunta"); base title = "Sun, Earth and Moon" | the rail label must cover all six faces (planets, phases); the base title is the base's own head. No rule requires them to differ; they simply do |
| 14 | base instruction "Circle it." | A: tick | "Tick one box." | the page has boxes, not chips (brief rule 9) |
| 15 | F3 it title "Perché c'è il dì e la notte?" | none | "Perché ci sono il giorno e la notte?" default, panel may rule "dì" | the chip on the same page reads "Giorno" (`day-vs-night.json`, m); a title and chip on one sheet should use one word |

## 2 Claims removed or downgraded as unverified

- The lock's "planets use the 8 library planet pictures": removed (opened, row 1).
- A's "8 glyphs greyscale-distinct at honest size, box 72 (Mercury Ø 13)": downgraded; at 13 px the pattern is not legible, and A's Jupiter bands `coralSoft` (#FBE3D8) vs `creamDeep` (#F5E9D2) are ~equal in greyscale. Re-specified with `grid` bands on white and a uniform r 30; the pairwise greyscale gate is now a render measurement, not a stamped claim.
- A's base fact column "307 px": the arithmetic omits the 4 px border (639 - 4 - 16 - 40 - 276 = 303). Corrected to 303.
- B's base "clue <= 595 px, never wraps" measured by the validator: superseded by the chart (2 lines at 303), but the idea survives as rule 11 (<= 80 chars) + a render check.
- The pedagogy's F1 stack "d2 *est.*" and d3 "F2-level": replaced by the measured rail arithmetic.
- The pedagogy's claim that es-MX needs the northern drawing "because the lit side still faces the evening Sun": the geometry is right, but whether SEP textbooks print the northern convention is a panel fact, recorded OPEN.
- All title/meta lengths and Jaccards remain *est.* (the gates measure).
- B's F2 "phaseR computed from the measured chrome": dropped (a size that depends on chrome makes the d2 page differ by locale; the fixed d 88 page fits both stacks).

## 3 Numbers re-measured (which won)

| number | input(s) | re-measured | winner |
|---|---|---|---|
| moon-phase lit fraction, arc flags | A + B: same recipe, "exact" | rasterised: .1452 .4983 .8511 .9952 .8509 .4982 .1452 (phases 1-7; max error 0.005); centroid right for 1-3, left for 5-7 mirrored | both (recipe correct) |
| crescent lit width | A 14.0 at d 104; B 16.4 at r 56 | 0.135 d: 14.0 at d 104, 11.9 at d 88 | A |
| opened `space/*` pictures | ped: 4 wrong + 5 grey-identical | confirmed on colour + grey sheets (12 opened) | ped |
| `space/moon` picture | ped: near-full, dark limb LEFT | confirmed: lit right = waxing gibbous in the north | ped |
| base width | A 307 fact col | 4 + 16 + 30 + 10 + 303 + 276 = 639 | editor |
| base height | A 660 | 128 + 512 + 20 = 660; floor 596 | A |
| base head discs | A 60 / 44 / 26 | 88 x 0.68 = 59.8 / 44 / 26; Earth:Moon 1.69 | A |
| F1 rail | A 258 / 544; B 256 / 540 | 16 + 40 + 12 + 104 + 14 + 48 + 16 + 4 = 254; 2 x 254 + 28 = 536; width 5 x 118 = 590 <= 599 | editor |
| F2 | A 705; B 721 | 69 + 600 + 36 = 705; at 677: 633; card inner 289.5 >= 286 | A |
| F3 | B 552 | 380 + 20 + 152 = 552; Sun R = max(380, (36100 + 9216)/192 = 236) + 20 = 400; table row 294 <= 313.5; 25° at 120 px = 51.9 px | B |
| F4 | B 696 (bank below 110) | bank on top 104 + 12 + 570 = 686; pitch 50: 644; x_1 102.5, x_8 396.5, row-8 line 212.5 | B geometry, A bank |
| F5 | B 530 | 110 + 20 + 400 = 530; 3 x 205 + 24 = 639 | B |
| type slugs x11 | ped: 0 collisions for sol/planet/... | 0 exact collisions for the 9 distinct table-B slugs; regex hits unrelated | ped |
| `apps` / axis entry | all: absent | absent; 125 exercise-type keys | all |
| `Science` strand row | ped: exists | `strand-names.ts:74` | ped |
| K-208 title / instruction | ped | "Day and Night" / "Draw a line from each picture to the group it belongs to." (`types/k/K-208-day-night.js:7`) | ped |
| F3 chip labels | ped: K-208 bins x11 | `day-vs-night.json` bins day/night x11 (it "Giorno") | ped |
| `LEVEL_KEYS` | all | `gen-b3-landings.js:98-110`; no G1 = `2-trinn` | all |
| `blankNumeralBox` / `wordBank` / `rulingBlock` / `writingRow` | A + B | `ordinal-numbers.js:151` (stamps `data-lcs-answer`, default 68 x 44); `components-b2.js:228`, `:76`; `trace-path.js:681` returns `{svg,width,height}` | all |

## 4 OPEN items

1. The four school phase names per locale, and that each fits exactly one of {new, first quarter, full, last quarter} (de/da/no/fi "halbmond/halvmåne/puolikuu" forms; sv "kvarter" vs "halvmåne").
2. The gender-neutral fact subjects in de/fr/es/it/pt and each locale's `leakForms` list: only a native can rule agreement ("Es ist ein Stern." as neuter-thing; es predicate adjectives).
3. es-MX: whether SEP/NEM textbook moon drawings follow the northern lit-right convention (the design assumes yes).
4. Capitalisation of the body names in nl/sv/da/no running text; the it "giorno/dì" title word.
5. Print check on a mono laser: the eight F4 glyphs pairwise distinct at 38 px, the d 104 crescent, the grey new Moon, the pt mirror; F2 bank one-row width with the longest locale set.
6. Each landing's placement sentence (table C) per locale: the panels confirm the year (it quinta, fr cycle 3, pt 5º ano, nl groep 6, en middle school for names).

## 5 Quality verdict

I would print this for my class, and the Sky Chart is the page I would reach for first: three friendly drawings at the top, big Sun, middle Earth, little Moon, and eight short sentences where my first graders just tick a box, so the thinking is about the Sun being a star and the Moon only seeming to change shape, not about handwriting. The moon rails make the growing and shrinking visible without printing the answer, and the single big globe with pins is the clearest day-and-night model I have seen on a worksheet. What would embarrass me: a Brazilian colleague finding a northern crescent on her page (the gate measures the lit side on every disc for that reason), a French or Spanish child spotting the Sun because the sentence said "il" or "el más", a Mercury that looks like Jupiter (why the library planets are gone and the glyphs sit only beside their printed names), and the planet pages sold as grade 1 in Paris or Rome when the curriculum teaches them years later, which is why every landing says where the topic actually sits.
