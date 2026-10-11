# b8 design studio brief: "Handmade Mazes" (family key `scene-mazes`, base K-405). Read this FIRST, then `_SUBSTRATE.md`, then `_PANEL-FINDINGS.md`

You are one expert in a studio designing ONE printable worksheet TYPE for K-3 (ages 4-9) with **twenty faces**: the base page plus NINETEEN pedagogically distinct variations. Every face is rebuilt natively in 11 languages (en de es pt fr it nl sv da no fi), published as a printable PDF + an interactive "draw the way" screen + an answer key, and gets an SEO landing page. This is the operator's FLAGSHIP, verbatim: *"They shouldn't be only good but they should be top quality ... You should create original scenes, the scenes shouldn't be similar ... Unless they are top quality it is only waste of time and resources."* Nothing is built in this phase. Your output is a DESIGN precise enough that an engineer builds it without asking you anything, and a native panel rebuilds it without guessing.

The operator gave 14 sample pages as inspiration (described in `_SUBSTRATE.md` § Samples): curvy corridor mazes through a picture with a character at the start and a goal (bee to flowers, fairy to a magic door, puppy and train in a little town, bear finding cookies in a kitchen); a watercolour city-block maze (fire truck to the fire); a river maze (boat to the dock); a dinosaur swamp; a mouse's underground burrow; several baby animals finding their mothers; tangled lines "which line leads where" (monkey to banana, worm or bone; three animals to three homes); a long wiggly duck maze; alphabet paths (letters A to Z along the right road, wrong letters on dead ends; a knight's castle; a snail; a frog hopping lily pads a to z; raindrops A to Z in a grid). Match their warmth and narrative and beat their craft. Never copy one.

## Rule 1. The art: library first; drawn only where the library has nothing, in its style
Characters, animals, vehicles, food, plants and objects come ONLY from the colour image library (`_SUBSTRATE.md`; contact sheets at `%TEMP%\hm\sheets\*.png`, open the ones you use with the Read tool). Only scenery structure and simple apparatus are drawn by the engine, as flat soft fills with no black outline: sky, hills, grass, water, sand, soil, burrow chambers, roads, lily pads, stones, a dock, a doorway. A design that needs a drawn animal, person or complex object is rejected. **A scene's cast comes from one style family.** **Every face has its OWN original scene**: twenty different settings, twenty different heroes, no repeated layout. The same scene serves all 11 locales.

## Rule 2. A maze is correct by proof, never by eye
Every corridor maze is a tree (exactly one start→goal route) or, on the multi-route faces, a forest with exactly one route per start; the hop grids have exactly one valid label sequence (proved by search). The rendered page is re-proved by a raster oracle. Dead ends must be genuine choices: a dead end visible as a stub from the junction teaches nothing; the correct branch must not sit on the same side at every junction (a position tell); the goal must not be reachable by "always turn the same way" (wall-follower solves the maze in under X % of its steps: the engineer measures X).

## Rule 3. Pedagogy is the point, not decoration
Each face names ONE skill a teacher can write in a plan: visual-spatial planning, fine-motor control, visual tracking, alphabet order, counting, skip counting, addition / subtraction fluency, initial sounds, sequencing directions. A theme or picture swap is never a face. A face must change what the child DOES or LEARNS and differ from the base in its resolved config at the shipped level (`tools/gate-variation-distinct.js --batch=b8`). PARAM faces (a config change) before CODE faces (a named `mode` knob + a `verify()` branch).

## Rule 4. The instruction is the child's sentence
One imperative a 4-8-year-old understands (≤ 150 chars), naming only what is on the page ("Help the bee find the flowers. Draw a line along the path."). The story frame ("help the X reach the Y") is part of the pedagogy: the child knows WHY they draw. The answer is never printed on the page.

## Rule 5. SEO and boundary
Each face owns a distinct QUERY FACE (`_PANEL-FINDINGS.md` heads): no two faces whose titles differ only by an adjective. The grid `mazes` family keeps "maze worksheet", "easy maze", "hard maze", "giant maze", "animal maze", "fruit maze": no face of this family may take those as its head. Titles never contain the locale's worksheet word; ≤ 70 chars; "free" never appears on any visible string (metadata only). CCSS honesty: claim a code only where the face genuinely instantiates it (RF.K.1.d alphabet order; K.CC.A.1/A.2 counting sequence; 2.NBT.A.2 skip counting; 1.OA.C.6 add / subtract within 20; K.OA.A.4 make 10; RF.K.2.d initial sounds); the corridor and visual-tracking faces are readiness (visual-motor integration), with no code. Non-EN prose names the national framework (Lehrplan · SEP/NEM · BNCC · programmes officiels · Indicazioni nazionali · SLO kerndoelen · Lgr22 · Fælles Mål · LK20 · OPS 2014), never "Common Core". es = MEXICAN register, pt = BRAZILIAN.

## Rule 6. Native rebuild (design the SLOTS so a panel can)
Letter faces use each locale's alphabet (sv å ä ö after z; da/no æ ø å; fi å ä ö; es ñ: the panel decides, a gate checks). Initial-sound pools come only from `REFERENCE TRANSLATIONS/image-vocabulary.js` per locale; a picture whose word is wrong or ambiguous in a market is refused there, never renamed. Number words in fi/de agree with case: the panel writes whole sentences, nothing is templated. A face a locale cannot carry is REFUSED there and recorded, never faked.

## The generator (facts)
Headless HTML/SVG generator at `scripts/worksheet-gen/` (page, palette, fonts, floors: `_SUBSTRATE.md`). **Body: build to 620 ≤ stack ≤ 740 px (measured 733 at the tallest chrome); ≥ 85 % page use.** Widths: page inner 675. The child works with a PENCIL: draws the route; writes a letter, a numeral or an arrow in a box; colours. The KEY = the same page with the route in coral (route colours on multi-route faces). The SCREEN = the new `trace-path` kind (drag along the corridors, snapping to the graph; Check = goal reached + the face's rule; targets ≥ 44 px at 360 px ⇒ corridor ≥ 90 page px wide OR a snap radius of ≥ 90 page px around each node: the designer states which). Three difficulties d1 / d2 / d3; **d2 ships and must be the best page**.

## Band table (each locale's own school levels)
| band | en | de | es (MX) | pt (BR) | fr | it | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PreK (3-5) | preschool | Kita / Vorschule | preescolar | educação infantil | maternelle (MS) | scuola dell'infanzia | peuters / kleuters | förskola | børnehave | barnehage | varhaiskasvatus |
| K (5-7) | kindergarten | Vorschule | preescolar | educação infantil | maternelle (GS) | infanzia | kleuters (groep 1-2) | förskoleklass | børnehaveklasse (0. kl) | 1. trinn | esikoulu |
| G1 (6-8) | grade 1 | 1. Klasse | primer grado | 1º ano | CP | classe prima | groep 3 | åk 1 | 1. klasse | 2. trinn | 1. luokka |
| G2 (7-9) | grade 2 | 2. Klasse | segundo grado | 2º ano | CE1 | classe seconda | groep 4 | åk 2 | 2. klasse | 3. trinn | 2. luokka |

## Hub visibility contract
A face appears under its type on `/[locale]/worksheets` IFF `apps.scene-mazes` exists, `axes['exercise-type']['scene-mazes']` has slug + name ×11, exactly one landing per face per locale (`coordinate.type === 'scene-mazes'`, unique slug, `canonicalDeckSlug` = the deck) and it is deployed. `verify-hub-type-rows.js --expect=…/b8-designs/hub-expectations.json` is HARD in `deploy.sh`.

## Your deliverable
Write ONLY the file named in your task, in markdown, terse and concrete (px, counts, ranges, slot names, file names). Measure, don't recall; when unknown write "UNKNOWN: engineer measures". Open every picture you name. No marketing prose; no em-dashes.
