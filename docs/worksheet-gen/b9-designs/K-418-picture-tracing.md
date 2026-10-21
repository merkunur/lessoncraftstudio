# K-418 `picture-tracing` (PreK/K/G1) : FINAL design (editor merge, 2026-10-22)

Merged from `_work/pedagogy.md` (binding: the ladder, the 20 moves, the cross-face and language rules), `_work/design-A.md` ("storybook places": twenty scenes with measured placements) and `_work/design-B.md` ("playful graphic devices": a solid black page architecture per face), against `_STUDIO-BRIEF.md`, `_PANEL-FINDINGS.md` (THE LOCK, the harvested heads ×11) and `_SUBSTRATE-POOL.md`. Rule of the merge: **the pedagogy wins over both designs; the engine facts (below) win over the pedagogy, and every place they do is marked "ENGINE WINS".** Format copied from the shipped sister contract `b8-designs/K-405-maze-puzzles.md`.

(m) = measured. Renders OPENED by the editor: `out/pt/scene-b1-path-to-door.png` (B #1 built verbatim: house, tree, butterfly, two flowers, rabbit, sun, cloud, ground, path; it reads as one place, the rays and the small petal ticks correctly fall SOLID, measured traced length **10,063 px**, m), `out/pt/scene-test-modes.png` (`model` in a rounded card beside its `guide` twin; `half` on a butterfly with a dash-dot axis; `half` on a bus; all three modes work, m), `out/dev/K-418-null-d2-en.png` (the site shell: title band, one instruction line, body, footer; this dev scene leaves a ~200 px empty band at the top of the body and sparse ground, which is exactly what the fill gate below forbids). Every pool key in this file was checked against `_SUBSTRATE-POOL.md` with its grade (scratch `chk.js`, m: 0 missing; the one invalid alternate in design B, `sea life bw 2/snail` as a seashell fallback, is not used). Widths derived from an aspect are *est.*; the clearances are the binding numbers (if a measured ink box breaks a clearance, the picture shrinks, never the gap). No em-dashes.

**ENGINE FACTS that override the pedagogy (binding).**
1. **Stroke count → traced length.** The pedagogy's "≤ 12 / 30 / 50 separate dashed strokes" cannot be met (a grade-1 drawing has a median of 15 traced lines, grade 2 has 42; 30 strokes would be two pictures, contradicting "3-8 pictures" at K). ENGINE WINS: the effort budget is **traced length of guide per page: PreK ≤ 4,500 px · K ≤ 11,000 px · G1 ≤ 15,000 px**. Details shorter than the band's shortest segment, or closer than the band's gap, print SOLID automatically and do not count. Reference: B #1 = 10,063 px (91 % of the K cap).
2. **Render modes:** `guide` (dashed, band style P1/P2/P3) · `dots` (P4) · `model` (the original drawing, solid) · `solid` (the traced lines solid) · `half` (left of a split x solid, right dashed) · `part` (NEW: `part:{x0,y0,x1,y1}` as fractions of the ink box; lines inside dashed, the rest solid; F11) · `halo` (item.halo px: everything behind stops short of it; F20). Occlusion: a thing in front hides what is behind. **Structure** = solid lines (`decor`: a motif or a raw path, optional fill / dash) for design B's devices; structure passes behind objects standing on it.
3. **Start markers:** a solid dot + a small arrow beside the line, at the top (or left) end of an open line, or at 2 o'clock running anticlockwise on a closed one; `markers:'picture'` (one per picture, on its longest line) or `markers:'lines'` (every traced line). The pedagogy's "green start dot" becomes this shape-only marker (ENGINE WINS; it is grey-safe by construction).
4. **Words (F17)** render in the platform's school-hand dashed word lanes (stacked trio lines), words chosen PER LOCALE from the vocabulary file. The pedagogy's "P4 dotted letters with a start dot per letter" becomes the shipped lane component (ENGINE WINS): per-letter start marks appear only if the lane component draws them; none is invented. The count answer box (F10) is a solid rounded box.
5. **Body:** 675 × ~716 px, filled: content stack **620-740 px** tall. Every placement below is on the 675 × 716 canvas, origin top-left, `x` = ink-box centre, `yb` = ink-box bottom, `h` / `w` = ink size.

**Boundary (load-bearing).** `pre-writing` (K-236, K-244-248, K-385-387) owns ABSTRACT strokes (lines, zigzags, waves, loops, spirals) and picture-to-picture paths. `how-to-draw` (K-396, K-402 "trace then draw") owns a step ladder from shapes to a drawing. `dot-to-dot` owns numbered points. `color-by-number` / `read-and-color` own colouring by a code. **This family owns only:** the outline of a WHOLE PICTURE, laid exactly on a library drawing's own lines (or on a vector the engine draws in the library style), traced on paper. No step ladder, no numbers on a guide, no colour code, never an abstract stroke row. The four stroke faces (F4 round, F5 straight, F6 zigzag, F7 curls) NAME the stroke the pictures practise, but every page is pictures. **Visual signature:** grey dashes the child completes into a picture or a place, beside solid black page architecture that is visibly "already there".

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-418` / `picture-tracing` / base **K**. Faces (expected ids; the allocator, cloned from `alloc-b8var-ids.js`, allocates in §3 file order by band): **K-419** F2 · K-420 F3 · K-421 F4 · K-422 F5 · K-423 F6 · K-424 F7 · K-425 F8 · K-426 F9 · K-427 F10 · K-428 F11 · K-429 F12 · K-430 F13 · K-431 F14 · K-432 F15 · **G1-429** F16 · G1-430 F17 · G1-431 F18 · G1-432 F19 · G1-433 F20. PreK faces take K ids (THE LOCK). G2-394+ stays unallocated: no G2 face ships in this batch (the dotted street F16 is the detailed top of the ladder at G1, pedagogy #10). |
| subject | `apps['picture-tracing'] = {default_subject:'letters', default_age_range:'5-7', exercise_type_axis_key:'picture-tracing'}` (letters = fine-motor / pre-writing readiness, as `pre-writing`); `axes['exercise-type']['picture-tracing']` slug + name ×11 (table B). `exerciseType:'picture-tracing'`, `assetClass:'icon-placement'` (inline SVG, library drawings as data, the b7/b8 precedent). |
| format | **PDF only.** No screen, no answer key; `manifest.printable_only:true`; the family does NOT join `INTERACTIVE_PRINTABLE_FAMILIES`. No title, meta, landing or deck page may promise a screen or a key. |
| theme / unit axis | OFF on all twenty faces (`themeAxis:{applicable:false}`, `coordinate.theme:''`): one pinned scene per face, identical in 11 locales except the printed words of F17 and the instruction text. |
| CCSS en (honest) | F10 **K.CC.B.5** · F13 **K.G.A.2** · F17 **L.K.1.a**. Every other face: NONE (readiness: fine motor / visual-motor integration; F19 symmetry is 4.G.A.3 territory and is NOT claimed). JSON-LD `educationalAlignment` only on those 3, no `targetUrl`. Non-EN prose names the framework NAME only. |
| strand chip | readiness faces: the row `pre-writing` already ships (read from its landings, no new row); F10 `'Counting & Cardinality'`; F13 `'Geometry'`; F17 `'Reading: Foundational Skills'` or the Language row the platform carries (the build reads `strand-names.ts`, m at build, no new row unless absent). |

**Table B (rail names = THE LOCK; panels may correct register, never fall back to a pre-writing rail word).**

| loc | rail name | rail slug (ASCII; the build checks it against every `axes.*` slug) | level keys PreK / K / G1 (copied from the b8 landings; PreK takes the K key outside en) |
|---|---|---|---|
| en | Picture Tracing | `picture-tracing` | `preschool` / `kindergarten` / `grade-1` |
| de | Bilder nachspuren | `bilder-nachspuren` | `vorschule` / `vorschule` / `1-klasse` |
| fr | Dessins à repasser | `dessins-a-repasser` | `maternelle` / `maternelle` / `cp` |
| es (MX) | Dibujos para repasar | `dibujos-para-repasar` | `preescolar` / `preescolar` / `primer-grado` |
| pt (BR) | Desenhos pontilhados | `desenhos-pontilhados` | `educacao-infantil` / `educacao-infantil` / `1o-ano` |
| it | Disegni tratteggiati | `disegni-tratteggiati` | `infanzia` / `infanzia` / `classe-prima` |
| nl | Tekeningen overtrekken | `tekeningen-overtrekken` | `kleuters` / `kleuters` / `groep-3` |
| sv | Spåra bilder | `spara-bilder` | `forskola` / `forskola` / `ak-1` |
| da | Tegn efter stregerne | `tegn-efter-stregerne` | `boernehaveklasse` / `boernehaveklasse` / `1-klasse` |
| no | Tegn etter linjene | `tegn-etter-linjene` | `1-trinn` / `1-trinn` / `2-trinn` (Nordic +1) |
| fi | Jäljennä kuvat | `jaljenna-kuvat` | `esikoulu` / `esikoulu` / `1-luokka` |

**The visual system (three inks + structure, B&W-safe; no colour carries meaning).**

| layer | look | used for |
|---|---|---|
| **P1** guide | ≈ 4 px stroke, dash 14 / gap 8, mid-grey | PreK faces F2-F4; the BIG copy in F15 |
| **P2** guide | ≈ 3 px, 10 / 6, mid-grey | every K face; the MIDDLE copy in F15 |
| **P3** guide | ≈ 2 px, 6 / 5, darker grey (survives cheap printers) | G1 faces F17-F20; the SMALL copy in F15 |
| **P4** dots | ≈ 2.5 px Ø every 7 px **in page space** (resampled after scaling, one rhythm per page) | F16 only |
| **Structure** | solid black 2.5 px, round caps / joins, panel radius 18, chip radius 10; never dashed in a way that could read as a guide (the F18 axis is the one exception: a grey dash-dot hairline 8/3/2/3) | frames, panels, shelves, ramps, stairs, cards, porthole, postcard, book, mirrors, rows' ground lines, the F10 answer box |
| **Model** | the library drawing in its own solid black ink | F3 models, F11 solid parts, F19 left halves, the F10 decoys + pond tree, the whole F20 forest, F14's stamp anchor |
| **Solid decor** | short grass tufts, rays, bubbles, rivets: solid mid-grey 2 px | scenery that is not traced (below the band's shortest segment) |

Rule of contrast: a guide and a structure line never run parallel closer than the band gap (PreK 28 / K 18 / G1 10); a guide touches structure only where an object stands on it (a T-junction, structure behind); in F20 every solid line stops at the animal's halo.

**The two layout families and how they alternate.** **SCENE (S):** one place, one moment, a ground or horizon line, depth bands, every library drawing standing on something or flying for a reason (design A's art direction). **DEVICE (D):** a solid black page architecture that states the move before anyone reads (design B's graphic system: porthole, polaroids, ramps, columns, bento, stairs, shelves, rocket, rows, cards, book). The PreK opening F2-F4 is device-only by pedagogy (big separate pictures with ≥ 30 px air cannot form a scene); **from F5 on the families alternate strictly D S D S … and end on a scene** (F5 D · F6 S · F7 D · F8 S · F9 D · F10 S · F11 D · F12 S · F13 D · F14 S · F15 D · F16 S · F17 D · F18 S · F19 D · F20 S). The base is a scene. No device is used twice.

**The rule that locks the type.** A page is a declared list of items (`{key | motif | path, x, yb, h|w, flip, mode, part?, halo?, markers?}`) plus structure, rendered by the tracer, and accepted only when every §5 gate passes on the RENDERED page (traced length, segment and gap floors, clearances, closure, straightness, symmetry, N, fill). **Quality test:** a five-year-old sees at a glance WHAT the finished page will be (a garden, a whale, a storm camp) and a teacher can say in one sentence what this face trains that the base does not.

## 2 The base page

**Concept (design B #1, built verbatim, m).** "The path to the door" (K). A cottage garden: a path runs from the child's own edge of the page (the bottom, wide) up to the house door (narrow), so the eye walks INTO the picture instead of scanning scattered items. The house and a big round tree stand on a gently rolling horizon, a butterfly flies between them, two flowers frame the mouth of the path like a gateway, a rabbit sits beside it, a cloud and the sun fill the sky. The child traces the garden into being, picture by picture. Chosen over design A's garden (cat on the path) because it is built and measured, its path is the strongest single composition move in either design, and it fits the K length cap; A's cat is not lost (it is F17's word picture).

**Cast (P2, `markers:none`)**

| item | key | grade | mode | why |
|---|---|---|---|---|
| house (hero) | `home and nature bw/house` | 1 | guide | the destination of the path; long straight runs, door, windows |
| tree | `home and nature bw/tree` | 2 | guide | the big round crown balances the house |
| flower ×2 (2nd `flip`) | `nature bw/flower` | 2 | guide | the gateway at the path's mouth; petal ticks fall solid (m) |
| butterfly | `nature bw/butterfly` | 2 | guide | the one sky creature, between roof and crown |
| rabbit | `animals bw 5/rabbit` | 2 | guide | the living thing in the foreground |
| sun, cloud, ground, path, grass | vector | n/a | guide (grass + rays solid) | sky and ground trace perfectly |

**Placement (back to front)**

| # | element | x / params | yb | h / w | note |
|---|---|---|---|---|---|
| 1 | `cloud` | cx 165, baseY 128, w 190 | | | ≥ 40 from sun and roof |
| 2 | `sun` | cx 590, cy 82, r 40, rays 10 | | | rays end y 136 (solid); tree top 168, gap 32 |
| 3 | `ground` horizon | x0 14, x1 661, y 470, amp 6, rolls 3 | | | passes behind house + tree |
| 4 | house | 205 | 472 | h 250 | box ≈ 85-325 |
| 5 | tree | 545 | 480 | h 312 | box ≈ 430-660; trunk on the horizon |
| 6 | butterfly | 400 | 300 | w 130 | 75 px air each side |
| 7 | `pathBand` | (338,716) → (300,640) → (250,560) → (215,474), width 120 → 36 | | | two dashed edges; door width at the top |
| 8 | flower | 95 | 702 | h 170 | left of the path mouth |
| 9 | flower `flip` | 175 | 700 | h 150 | a step back, smaller = depth |
| 10 | rabbit | 520 | 702 | h 150 | right of the path |
| 11 | `grass` ×3 solid | (420,700,26,3) (610,702,24,3) (40,560,22,3) | | | ≥ 18 from any picture |

**Budget:** 10,063 px (m) ≤ 11,000. Stack: cloud top ≈ 60 → rabbit / path bottom 716 = **656** (fills). Tightest guide gap 18 (flower to flower). If a later re-measure exceeds 11,000, swap the tree for `home and nature bw/tree_3` (grade 2, fewer crown ticks); never shrink the house.

**EN strings.** `title`: **Picture Tracing Worksheets: Trace the Garden Path to the Door** (61) · `printTitle`: **The Path to the Door** · `instruction`: **Trace all the dashed lines to finish the garden: the house, the tree, the flowers and the rabbit.** (96)
**Query face:** picture tracing worksheets · tracing pictures for kids · trace the picture of a house · the locale's generic head (Bilder nachspuren, dessin à repasser, dibujos para repasar, desenhos pontilhados, disegni tratteggiati, tekening overtrekken, spåra bilder, tegn efter stregerne, følg linjene, jäljennä kuvat).

## 3 The nineteen faces

Every face carries a `mode` string (the landing coordinate) and a pinned item list that differs from the base and from every other face (§3 end table). All faces are CODE faces (each has its own `verify()` branch for its title's promise). Stack 620-740 on every face, measured on the render.

### F2 : My First Tracing: The Porthole Whale (PreK, CODE `mode:'first-tracing'`)
**Move:** ONE big picture with long, steady strokes; start at the dot (grasp, large controlled movement).
**Design: B** ("the porthole whale"). A's giant apple on a table is equally honest, but the porthole is a picture inside a shape, owns the page at thumbnail size, and leaves the apple free for F17. **Cast:** `sea life bw/whale` (grade 1, wide), `guide` P1, `markers:'picture'` (one dot, at 2 o'clock on the outer outline, arrow anticlockwise over the back). Inner details ≤ 3 runs; the eye stays solid.
| # | element | params | note |
|---|---|---|---|
| 1 | porthole ring (structure) | two circles centre (338,360), r 322 and r 308; 8 solid rivets r 6 at 45° steps on r 315 | body x 16-660, y 38-682 |
| 2 | sea (structure) | two solid wave rows as RAW PATHS whose ends sit on the inner ring (chord end-points computed, no clipping): y ≈ 586 and 616, amplitude 8, wavelength 70 | gentle, black, plainly not dashes; ≥ 30 below the whale |
| 3 | bubbles (solid decor) | (520,170) r 16 · (560,130) r 10 · (590,200) r 12 | ≥ 30 from the whale |
| 4 | whale | x 330, yb 500, **w 470** (h ≈ 250 → y 250-500) | longest side 470 ≥ 420; ≥ 30 inside r 308 |
**Budget:** est. 1,600 px ≤ 4,500. Stack 38-682 = 644. **Forbidden:** a second traced item; any inner detail traced as a guide; grass or waves as guides. **Gate:** one `guide` item, longest side ≥ 420, every guide run ≥ 50 px, gap ≥ 28.
**EN:** `title` **Tracing Worksheets for Preschool: My First Big Whale** (52) · `printTitle` **My First Tracing** · `instruction` **Start at the dot. Trace the big whale with one slow, steady line.** (64)
**Query face:** tracing worksheets for preschool · es "dibujos punteados preescolar" · fr "dessin pointillé maternelle" (PS) · it "disegni tratteggiati per bambini di 3 anni" · de "Nachspuren Vorschule" · pt "atividades de cobrir pontilhado educação infantil".

### F3 : Look, Then Trace (PreK, CODE `mode:'look-then-trace'`)
**Move:** look at the solid model, then trace the same picture beside it (imitation → copy, the first rung of the VMI ladder).
**Design: B** ("polaroid and paper"), PreK variant (2 rows, P1). The polaroid frame + eye badge makes "this is a model" a visual fact (the pedagogy's trap: a child tracing the model); A's pin-board cards are the same idea with less signal. **Cast:** row 1 `animals bw 5/penguin` (1), row 2 `animals bw 4/kangaroo` (1, the competitor's kangaroo done properly); alternate `animals bw 4/chick` (1). Model = `model`, twin = `guide` P1 with `markers:'picture'` (on the twin only). Same drawing, same orientation, never mirrored (mirroring is F19).
| row | polaroid frame (structure) | model | eye badge (structure) | arrow (structure) | twin |
|---|---|---|---|---|---|
| 1 | roundRect(20,22,230,296, r 10), bottom bar 26 | x 135, yb 262, h 207 | 44 px disc with an eye glyph at (135,22) | shaft x 270-330 at y 180, head 18 | x 490, yb 327, h 296 (box ≈ 340-640, 31-327) |
| 2 | roundRect(20,380,230,296) | x 135, yb 620, h 207 | (135,380) | y 538 | x 490, yb 685, h 296 (389-685) |
| | row divider (structure) solid 1.5 px, x 20-655, y 358 | | | | |
Clearances: twin to divider 31 / 31, twin to body bottom 31, twin to arrow ≥ 30 (PreK 30). Model = 70 % of the twin.
**Budget:** est. 3,200 px ≤ 4,500 (twins only; models do not count). Stack 22-685 = 663.
**Forbidden:** a mirrored twin; a model that is a different drawing; a model without a frame; a third row at PreK.
**EN:** `title` **Trace the Picture: Look at the Animal, Then Trace It** (52) · `printTitle` **Look, Then Trace** · `instruction` **Look at the photo. Then trace the same animal next to it.** (57)
**Query face:** trace the picture · "look at the image, trace it" · it "ripassa il tratteggio" · nl "natekenen kleuters" · sv "rita av djur".

### F4 : Round and Round: The Marble Run (PreK, CODE `mode:'round-and-round'`)
**Move:** big closed curves, started at 2 o'clock and run anticlockwise like the start of c / o.
**Design: B** ("the marble run"), PreK variant re-laid by the editor: three round things each on its own short ramp, in a zigzag down the page (design B's two-per-ramp K layout cannot hold three 300 px pictures; A's rising bubbles float with no reason, and its bare `shapes.circle` bubbles are abstract strokes, which belong to `pre-writing`). Every picture is a library drawing. **Cast:** `sports bw/beach_ball` (1) hero, `fruits bw/orange` (1), `fruits bw/apple_2` (1); all `guide` P1, `markers:'picture'` (2 o'clock on the outer outline, anticlockwise).
| # | element | params | yb | h | note |
|---|---|---|---|---|---|
| 1 | ramp 1 (structure, 4 px) | (20,338) → (310,352), stopper post at x 20 | | | |
| 2 | beach ball | x 170 (centre y 186) | 336 | 300 | box ≈ 20-320, 36-336 |
| 3 | ramp 2 | (365,518) → (655,532), stopper at x 655 | | | |
| 4 | orange | x 505 | 516 | 300 | box ≈ 380-630, 216-516 |
| 5 | ramp 3 | (20,702) → (330,712) | | | |
| 6 | apple_2 | x 175 | 700 | 300 | box ≈ 49-301, 400-700 |
Ink distances (circles, m on the geometry): ball ↔ orange ≥ 70, orange ↔ apple ≥ 70, ball ↔ apple 64; every ramp ≥ 28 from the next picture. Each `yb` sits on its ramp at its `x` (it rests).
**Budget:** est. 4,050 px ≤ 4,500 (drop order if measured over: the ball's inner seams print solid via `part` inverse, never a fourth picture). Stack 36-712 = 676.
**Forbidden:** a spiral (F7); a bare geometric circle as a "picture"; a marker at 6 o'clock or clockwise.
**EN:** `title` **Tracing Worksheets for Toddlers: Round and Round Pictures** (56) · `printTitle` **Round and Round** · `instruction` **Start at each dot and trace round and round, like the letter o.** (63)
**Query face:** tracing worksheets for toddlers · nl "overtrekken peuters" · es "fichas de trazos para niños de 3 años" · fr "graphisme maternelle PS" (body only; the title keeps the picture head, §6).

### F5 : Straight-Line Pictures: Down, Across, Slanted (K, CODE `mode:'straight-lines'`)
**Move:** pictures built almost only from straight lines, ordered vertical → horizontal → slanted (Beery order).
**Design: B** ("three direction columns"); A's three lanes are the same lesson read as rows, but rows are F15's device. **Cast** (each ≥ 80 % straight guide length, gated): column ↓ `tools bw/ladder` (1, tall) + `furniture bw/wardrobe` (1, tall); column → `furniture bw/table` (1, wide) + `furniture bw/dresser_2` (1); column ↘ `Christmas bw/envelope` (1) + `tools bw/traffic_cone` (1). Alternates: `furniture bw/cabinet` (↓), `classroom bw 2/table` (→), `sports bw 2/flag` (↘, if the envelope's flap star pulls it under 80 %). All `guide` P2, `markers:none`.
| # | element | params / x | yb | h / w |
|---|---|---|---|---|
| 1 | column rules (structure) | solid 1.5 px verticals at x 225 and x 450, y 20-700 | | |
| 2 | badges (structure) | 44 px discs with a white arrow glyph ↓ / → / ↘ at (120,36) (338,36) (556,36) | | |
| 3 | ladder | 120 | 400 | h 300 |
| 4 | wardrobe | 120 | 700 | h 260 |
| 5 | table | 338 | 300 | w 180 |
| 6 | dresser_2 | 338 | 690 | h 230 |
| 7 | envelope | 556 | 260 | w 180 |
| 8 | traffic cone | 556 | 690 | h 280 |
Clearances: badge bottom 58 → first picture tops ≥ 100; pictures ≥ 22 from the column rules.
**Budget:** est. 7,000 px ≤ 11,000. Stack 14-700 = 686.
**Forbidden:** round-dominant pictures; the Easter cross (excluded family-wide); a "house" with a curved roof.
**EN:** `title` **Straight-Line Picture Tracing: Down, Across and Slanted** (55) · `printTitle` **Down, Across, Slanted** · `instruction` **Trace the lines that go down, then the lines that go across, then the slanted ones.** (82)
**Query face:** tracing lines with pictures for kindergarten · de "Nachspuren Kindergarten" · es "trazos en dibujos" · pt "coordenação motora".

### F6 : Zigzags: Storm over the Mountain Camp (K, CODE `mode:'zigzags'`)
**Move:** slanted lines that meet in sharp points: up, down, up, with a clear stop at every point.
**Design: merged.** A's placement (full-width peaks, a star and a moon, the storm cloud and the bolt over the middle valley, three firs and the tent; every gap measured) + B's tiered fir (each fir is ONE closed vector polyline with three zigzag tiers, so its sides are zigzags too, not a plain triangle). The library has no plain fir; `Christmas bw/christmas_tree` is decorated and belongs to nobody here.
| item | key / motif | gr | mode | box (x0-x1, y0-y1) |
|---|---|---|---|---|
| mountains | `mountains(4,671,470,170,4)` | | guide | peaks x 87/254/421/588 at y 300/348/300/348, valleys y 419; points ≥ 160 apart, angles ≥ 60° |
| star | `star(110,110,34)` | | guide | 76-144, 76-144 |
| moon | `moon(590,110,34)` | | guide | 556-624, 76-144 |
| storm cloud | `cloud(337,140,200)` | | guide | 237-437, 56-140 |
| lightning | `travel and holiday bw/lightning` | 1 | guide | x 337, yb 300, h 140 → 273-401, 160-300 (28 above the slopes) |
| fir A (hero) | 3-tier closed polyline, apex (100,450), base 25-175 at y 580, trunk rect (87-113, 580-636) | | guide | 25-175, 450-636 |
| fir B | 3-tier polyline apex (255,480), base 195-315 at 584, trunk 244-266 | | guide | 195-315, 480-636 |
| tent | `travel and holiday bw/tent` | 2 | guide | x 445, yb 636, h 140 → 337-553, 496-636 |
| fir C | 3-tier polyline apex (618,520), base 573-663 at 598, trunk 609-627 | | guide | 573-663, 520-636 |
| ground | `ground(4,671,636,4,3)` | | guide | everything stands on it; the mountains' foot passes behind firs A/B and the tent |
| grass ×4 | at y 704 | | solid decor | foreground weight |
Every tier corner ≥ 40° and ≥ 25 px from the next corner (K shortest segment). Gaps: A-B 20, B-tent 22, tent-C 20, cloud-bolt 20.
**Budget:** est. 6,500 px ≤ 11,000. Stack 56-704 = 648.
**Forbidden:** an abstract zigzag row with no picture (`pre-writing`'s); points tighter than 40°; snow (the scene is an evening storm, any season).
**EN:** `title` **Trace the Picture: Zigzag Mountains and a Stormy Camp** (53) · `printTitle` **Storm over the Camp** · `instruction` **Trace the zigzags of the mountains, the trees, the tent and the lightning. Stop at every point.** (95)
**Query face:** trace the picture (zigzag) · it "disegni da ripassare" · fr "suivre les pointillés" · sv "följa linjer" (paired with a picture word, never "Spåra linjer").

### F7 : Curls and Spirals: The Curl Gallery (K, CODE `mode:'curls'`)
**Move:** curls that turn and turn again (e, l, ℓ loops; cursive readiness).
**Design: merged.** B's bento device (one big hero cell + four cells: each curl is a small detail, so each gets its own room) + A's cast (the sweet things whose curls are the whole picture). B's `beach bw/seashell` (2, inner-detail risk) and `sports bw 2/jump_rope` (not a spiral) are dropped; A's stall shelves and bunting are dropped (bunting is F11's). The editor re-laid the cells so the lollipop gets the size its spiral needs.
| cell (structure, roundRect r 18) | content | mode | params |
|---|---|---|---|
| A hero x 14-420, y 8-404 + solid ground line y 384 | `animals bw/snail` (1) | guide P2 | x 217, yb 380, w 360 (h ≈ 297) |
| B x 434-661, y 8-404 | `Christmas bw/lollipop` (1, tall; A: the widest turns of the three lollipops) | guide P2 | x 548, yb 380, h 350 (w ≈ 195) |
| C x 14-210, y 418-708 | `Christmas bw/bow` (1) | guide P2 | x 112, yb 650, w 170 |
| D x 224-420, y 418-708 | `food bw/pretzel` (1) | guide P2 | x 322, yb 650, w 170 |
| E x 434-661, y 418-708 | `toys bw 2/pinwheel` (1, tall) | guide P2 | x 548, yb 690, h 260 |
| trail (solid decor) | three bubbles r 6/8/10 behind the snail | | |
**Gate:** spiral turns ≥ 18 px apart at the placed scale (lollipop, snail shell, pinwheel); if the lollipop measures < 18 the cell B picture becomes `Easter bw/lollipop` (1, tall) at the same box, then `dessert bw/lollipop` is NOT a fallback (≈ 10 px turns, A, m on the contact sheet). Every picture ≥ 18 from its cell rim.
**Budget:** est. 7,500 px ≤ 11,000. Stack 8-708 = 700.
**Forbidden:** sea waves (F14); spirals tighter than the K gap; a spiral with no picture.
**EN:** `title` **Tracing Pictures for Kids: Curls and Spirals** (44) · `printTitle` **The Curl Gallery** · `instruction` **Trace the curls round and round: the snail, the lollipop, the bow, the pretzel and the pinwheel.** (96)
**Query face:** tracing pictures for kids (curls / loops) · pt "desenho para cobrir" · it "pregrafismo disegni tratteggiati" (the compound only, §6).

### F8 : Trace and Color: The Picnic Under the Tree (K, CODE `mode:'trace-and-color'`)
**Move:** trace every picture, then colour it in, inside the lines (two grips, two controls).
**Design: A** (the picnic scene): a scene with a reason for every object and big calm areas, against B's fruit stall (a counter layout that would make three card/row devices in a row). The editor swapped A's tree for `home and nature bw/tree_3` (the base already uses `home and nature bw/tree`, two hero trees side by side read as one page twice) and A's `apple_2` for B's lemon (`apple_2` is F4's). **Cast** (all `guide` P2, every outline CLOSED, colour cells ≥ 40 px): `home and nature bw/tree_3` (2) hero · `fruits bw/watermelon` (1) · `home and nature bw/teacup` (1) · `fruits bw/pear` (2) · `fruits bw/lemon` (1).
| element | params / x | yb | h / w | box |
|---|---|---|---|---|
| sun | `sun(560,90,38,8,false)` | | | 498-622, 28-152 (rays solid) |
| cloud | `cloud(380,115,160)` | | | 300-460, 48-115 |
| ground | `ground(4,671,425,5,3)` | | | horizon at the tree's foot, behind the tree |
| tree_3 | 140 | 425 | h 330 | ≈ 13-267, 95-425 |
| blanket | roundRect(40,455,595,235, r 28), guide | | | 40-635, 455-690 (closed: a colouring area) |
| watermelon | 125 | 645 | h 150 | ≈ 56-194, 495-645 |
| teacup | 285 | 625 | w 140 | ≈ 215-355, 533-625 |
| pear | 425 | 645 | h 150 | ≈ 377-473, 495-645 |
| lemon | 570 | 645 | w 150 | ≈ 495-645, ≈ 535-645 |
| grass ×3 | at y 708 | | | solid decor |
Gaps: blanket top 455 ↔ horizon 430 = 25; fruit ↔ fruit 21 / 22 / 22; every item ≥ 20 inside the blanket rim.
**Budget:** est. 7,700 px ≤ 11,000. Stack 28-708 = 680.
**Forbidden:** a colour code, numbers or colour words (colour-by-number's); open outlines; grade-3 drawings with tiny cells; colour-word swatches.
**EN:** `title` **Trace and Color the Picture: A Picnic Under the Tree** (51) · `printTitle` **The Picnic** · `instruction` **Trace the picnic pictures. Then color them in any colors you like.** (66)
**Query face:** trace and color the picture · fr "je repasse et je colorie" · es "dibujos para repasar y colorear" · pt "cubra e pinte" · it "ripassa e colora" · de "Nachspuren und ausmalen" · nl "overtrekken en kleuren" · sv "rita och färglägg" · da "tegn og farvelæg" · no "tegn og fargelegg" · fi "piirrä ja väritä".

### F9 : Where Do I Start? The Staircase (K, CODE `mode:'where-to-start'`)
**Move:** find the start dot, follow the arrow, stop at the end, every line in that order (directionality for letter formation).
**Design: B** ("the staircase"): the stair itself acts out the convention (start at the top, go left first); A's postcards on washing lines are charming but say nothing about direction. **Cast** (≤ 4 strokes each, every stroke can start top or left): `sports bw 2/flag` (1) · `valentine bw/heart` (1) · `Christmas bw/stocking` (1, tall) · `Easter bw/bell` (1). All `guide` P2, **`markers:'lines'`** (every traced line); a line where the convention is impossible gets NO marker (gate).
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | step treads (structure) | solid 3 px, each x−82 to x+82 at yb+8: y 183, 358, 533, 708 | | |
| 2 | risers (structure) | verticals x 177 (183-358), 337 (358-533), 497 (533-708) | | |
| 3 | flag | 95 | 175 | 150 |
| 4 | heart | 255 | 350 | 150 |
| 5 | stocking | 415 | 525 | 155 |
| 6 | bell | 575 | 700 | 150 |
| 7 | legend chip (structure) | roundRect(520,20,128,60, r 30) with one solid sample dot + arrow | | |
| 8 | solid decor | bottom-left: `grass` ×3 + one `daisy(70,640,18,6,40)` | | |
Clearances: pictures ≥ 20 from the risers (widths ≤ 120), chip ≥ 40 from the flag's column.
**Budget:** est. 3,000 px ≤ 11,000 (deliberately light: the task is the ORDER, not the length). Stack 20-708 = 688.
**Forbidden:** numbers beside the markers (dot-to-dot's); an arrow against the convention; a marker told apart only by colour.
**EN:** `title` **Picture Tracing for Kindergarten: Where Do I Start?** (51) · `printTitle` **Where Do I Start?** · `instruction` **Start at each dot and follow the arrow. Go down the stairs, one picture at a time.** (82)
**Query face:** tracing activities kindergarten · de "Nachspuren Kindergarten" · da "førskoleopgaver" · no "førskoleoppgaver" · fi "esikoulu tehtävät".

### F10 : Trace and Count: Ducks on the Pond (K, CODE `mode:'trace-and-count'`)
**Move:** trace every picture of ONE kind, count them, write how many (K.CC.B.5: count up to 10 scattered and answer "how many").
**Design: A** (the village pond, every slot checked inside the oval); B's aquarium with a label plate is a framed device and the alternation wants a scene here; its idea (the box has a reason) survives as A's box in the open sky. **Cast:** counted kind `birds bw 2/duck` (1), **N = 5**, `guide` P2, mixed facing (`flip`), scattered, never a row. Decoys, clearly another category, `model`: `animals bw 5/frog` (1), `animals bw/turtle` (2); scenery `nature bw/tree` (3) `model`.
| item | key / motif | mode | box |
|---|---|---|---|
| answer box | roundRect(16,16,120,120, r 16) solid, seated writing line at y 112 | structure | 16-136, 16-136 (in the sky, away from every duck) |
| tree | `nature bw/tree` x 337, yb 285, h 250 | model | 229-446, 35-285 |
| cloud | `cloud(570,110,130)` | solid decor | 505-635, 55-110 |
| frog | x 90, yb 280, h 100 | model | 39-141, 180-280 |
| turtle | x 590, yb 280, w 140 | model | 520-660, 175-280 |
| pond | `ellipse(337,500,325,205)` | structure | 12-662, 295-705 |
| reeds | `grass(40,400,40,4)`, `grass(640,410,36,4)` | solid decor | on the bank |
| ripples | `waves(150,520,560,40,4)` low on the water | solid decor | clear of every duck |
| duck 1 | x 200, yb 485, h 135 | guide | 140-260, 350-485 |
| duck 2 `flip` | x 360, yb 455 | guide | 300-420, 320-455 |
| duck 3 | x 530, yb 520 | guide | 470-590, 385-520 |
| duck 4 `flip` | x 185, yb 640 | guide | 125-245, 505-640 |
| duck 5 | x 380, yb 640 | guide | 320-440, 505-640 |
Every duck box ≥ 18 inside the oval rim (A, checked at each corner); no duck touches another or a decoy.
**Budget:** est. 4,800 px ≤ 11,000. Stack 16-705 = 689.
**Forbidden:** a second box; two drawings of the counted kind (a duck and a duckling are "two kinds" to some children); partly hidden ducks; ducks in a row; 0; any duck-like decoy (no swan, goose, chick).
**Gate:** the dashed drawings of the counted key on the render = 5, all one key; decoys are other keys; no guide outside the counted kind.
**EN:** `title` **Trace and Count: How Many Ducks Are on the Pond?** (49) · `printTitle` **Ducks on the Pond** · `instruction` **Trace the ducks. Count them. Write how many in the box.** (55)
**Query face:** trace and count · animal tracing pictures (ducks) · es "dibujos de animales punteados" · fr "dessins à repasser animaux".

### F11 : Finish the Picture: The Mending Shelf (K, CODE `mode:'finish-the-picture'`)
**Move:** see what is missing (wheels, a spout, a handle, ears), trace only those parts, and the picture is whole (visual closure, part-whole).
**Design: A** (the toy-repair workshop: two shelves, each picture a nameable missing part) with one swap: A's chick (feet + belly, a vague part) → B's bunny with its two long ears (`Easter bw/bunny`, 1). B's pinboard of cards is the same move in a card grid, and the set already has polaroids (F3) and cards (F17). Mode `part` (ENGINE FACT 2). Every handle / spout faces right (`flip` as read from the drawing) so the eye knows where to look.
| item | key | gr | x | yb | h / w | `part` region (fractions of its ink box) |
|---|---|---|---|---|---|---|
| toy car | `vehicles bw/car_2` | 1 | 115 | 340 | w 195 | wheels `{x0:0, y0:0.68, x1:1, y1:1}` |
| teapot | `home bw/teapot` | 1 | 337 | 340 | w 195 | spout `{0.72, 0, 1, 1}` |
| umbrella | `education bw/umbrella_2` | 1 | 560 | 340 | w 195 | handle `{0, 0.55, 1, 1}` |
| cup | `household bw/cup` | 1 | 115 | 695 | w 190 | handle `{0.75, 0, 1, 1}` |
| spinning top | `toys bw/spinning_top` | 1 | 337 | 695 | h 220 | point `{0, 0.72, 1, 1}` |
| bunny | `Easter bw/bunny` | 1 | 560 | 695 | h 230 | ears `{0, 0, 1, 0.45}` |
Structure: shelves roundRect(10,345,655,10, r 5) and roundRect(10,700,655,10, r 5); solid `bunting(4,671,30,30,8)` along the top.
**Gate:** the dashed part ≥ 20 % of each outline's length and no dashed fragment < 25 px; if a part fails (the top's point is the risk) the region widens to the part's natural edge, then the drawing is swapped for `furniture bw/chair` (1, legs `{0,0.6,1,1}`). Left/right halves are forbidden (that is F19).
**Budget:** est. 2,600 px ≤ 11,000 (dashed parts only). Stack 30-710 = 680.
**EN:** `title` **Picture Tracing Sheets: Finish the Picture** (42) · `printTitle` **The Mending Shelf** · `instruction` **Trace the dashed parts to finish each picture: wheels, a spout, a handle, a point and ears.** (91)
**Query face:** picture tracing sheets · tracing pages printable · fr "dessin à repasser" · nl "stippellijn tekening".

### F12 : Christmas: Close Every Bauble (K, CODE `mode:'christmas'`)
**Move:** trace the tree and the room, then many small CLOSED shapes, each ending where it began (readiness for a, d, g, o).
**Design: A** (the living room on Christmas Eve: an isosceles VECTOR tree hung with true round baubles, a night window, gifts, an armchair). B's library `Christmas bw/christmas_tree` brings its own decorations, so placed baubles would crowd its lines; A's vector tree guarantees every bauble ≥ 18 px from the outline. Indoors, no snow (works for Brazil's summer Christmas). B's stocking shelf is not used.
| item | key / motif | gr | mode | box |
|---|---|---|---|---|
| tree (hero) | `M.line([[230,102],[380,470],[80,470],[230,102]], true)` | | guide | 80-380, 102-470 |
| trunk · pot | `rect(230,495,40,50)` · `rect(230,580,120,120)` | | guide | 210-250, 470-520 · 170-290, 520-640 |
| top star | `star(230,60,28)` | | guide | 202-258, 32-83 |
| baubles | circles r 22 at (230,230) · (190,320) (270,320) · (230,410); stars r 24 at (152,410) (308,410) | | guide | ≥ 20 from the tree edge, ≥ 32 apart |
| window | roundRect(430,60,210,230, r 18) + bars x 535 and y 175 | | guide | 430-640, 60-290 |
| night | `moon(482,117,28)` · `star(588,118,22)` · `star(588,232,24)` | | guide | ≥ 24 from frame and bars |
| gift A | `Christmas bw/gift_box` | 2 | guide | x 92, yb 640, h 140 → 35-149, 500-640 |
| gift B | `Christmas bw 2/gift_box` | 2 | guide | x 375, yb 640, h 130 → 308-442, 510-640 |
| armchair | `furniture bw/armchair_2` | 1 | guide | x 585, yb 640, h 170 → 517-653, 470-640 |
| floor | `ground(4,671,642,0,1)` | | guide | everything stands on it |
| rug | roundRect(150,660,380,40, r 20) | | solid decor | foreground weight |
Small closed shapes: top star + 6 baubles + moon + 2 window stars = 10 vector + 2 gifts = 12 (pedagogy 8-12), each 44-60 px across, each ≥ 18 px from any other line.
**Budget:** est. 8,500 px ≤ 11,000. Stack 32-700 = 668.
**Forbidden:** religious figures (angel, nativity, church); snow outdoors; a shape left open; Santa (culture-specific; `Christmas bw 2/santa_claus` is grade 3 anyway).
**EN:** `title` **Christmas Picture Tracing: Close Every Bauble on the Tree** (56) · `printTitle` **Christmas Eve** · `instruction` **Trace the Christmas tree. Then trace every bauble and star all the way round.** (77)
**Query face:** Christmas tracing pictures · it "disegni di Natale da ripassare" · fr "dessins à repasser Noël" · fi "joulutehtävät lapsille" · sv "jul pyssel" · de "Weihnachten nachspuren".

### F13 : Shape Picture: The Shape Rocket (K, CODE `mode:'shape-picture'`)
**Move:** trace a picture made only of true circles, squares, triangles and rectangles in different sizes and turns, then colour every circle (K.G.A.2 "regardless of orientation or size").
**Design: B** (the rocket on its pad under a sky of shapes), corrected by the editor: B's fins and nose SHARED edges with the body (two guides touching, and a shape that cannot be found alone), so every shape now stands ≥ 18 px from every other. A's robot is equally good; the rocket wins because its sky shapes are separate, turned and shrunk without a grid. Vector only, `guide` P2.
| # | shape | geometry |
|---|---|---|
| 1 | rectangle (body) | x 270-405, y 200-520 |
| 2 | triangle (nose) | (337,70) (262,180) (412,180) |
| 3 | circle (big window) | centre (337,280) r 42 |
| 4 | circle (small window) | (337,375) r 26 |
| 5 | square (hatch) | x 308-366, y 440-498 |
| 6 | right triangle (left fin) | (250,430) (250,540) (170,540) |
| 7 | right triangle (right fin) | (425,430) (425,540) (505,540) |
| 8 | upside-down triangle (flame) | (295,560) (380,560) (337,640) |
| 9 | rectangle (pad) | x 150-525, y 660-696 |
| 10 | square TILTED 45° | centre (110,150), side 70 |
| 11 | square upright | x 545-595, y 280-330 |
| 12 | circle (moon) | (560,120) r 55 |
| 13 | circle (planet) | (110,420) r 38 |
| key (structure) | roundRect(26,620,92,64, r 32) holding ONE solid grey filled disc r 20 ("colour this kind") | |
13 shapes: 4 circles (three sizes), 3 squares (one tilted), 2 rectangles (one tall, one wide), 4 triangles (one up, two right-angled, one down). Shapes 3-5 sit INSIDE the body rectangle (nested, ≥ 22 from its edges), never touching.
**Budget:** est. 4,200 px ≤ 11,000. Stack 65-696 = 631.
**Forbidden:** library drawings (never true shapes); ovals, rounded corners; printed shape names; a hatch that only colour tells apart. **Teacher note (landing):** the tilted square is a square, not a "diamond".
**EN:** `title` **Shape Picture Tracing: A Rocket of Circles, Squares and Triangles** (66) · `printTitle` **The Shape Rocket** · `instruction` **Trace every shape of the rocket and the sky. Then color every circle.** (68)
**Query face:** shape tracing pictures for kindergarten · es "figuras para repasar" (panel confirms) · pt "formas geométricas pontilhadas".

### F14 : Summer at the Sea: A Postcard (K, CODE `mode:'summer-sea'`)
**Move:** long lines from the left edge to the right edge across the page (horizon, two waves: crossing the midline, the line of writing), then the beach pictures.
**Design: B** ("the seaside postcard"): the postcard frame + stamp is "Hello summer" done in structure, not in bubble letters; A's open beach is the same scene without the device. Re-laid by the editor (B's bucket collided with the parasol box and the bottom row sat on the inner border). **Cast:** `beach bw/sailboat` (1) on wave 1 · `beach bw/parasol` (1) · `beach bw/sandcastle` (2) · `beach bw/bucket` (1) · `beach bw/crab` (2), all `guide` P2; `beach bw/anchor` (1) `model` inside the stamp.
| # | element | params / x | yb | h / w |
|---|---|---|---|---|
| 1 | postcard frame (structure) | roundRect(14,8,647,700, r 18) + inner border 8 px inset (double line) | | |
| 2 | stamp (structure) | scalloped square (ring of solid dots r 3) x 548-640, y 26-118; anchor model inside, h 56 | | |
| 3 | `sun` | cx 110, cy 100, r 44, rays 10 (rays solid) | | |
| 4 | horizon | straight guide x 30-645, y 222 (passes behind the sail) | | |
| 5 | wave 1 | `waves(30,645,300,60,9)` | | |
| 6 | sailboat | 450 | 298 | h 170 (hull on wave 1: a T-junction, the wave passes behind) |
| 7 | wave 2 | `waves(30,645,380,60,9)` (≥ 40 below the hull) | | |
| 8 | sand line | `ground(30,645,452,8,3)` (passes behind the parasol canopy) | | |
| 9 | parasol | 135 | 640 | h 220 (≈ 22-248, 420-640) |
| 10 | bucket | 315 | 686 | h 120 (≈ 264-366) |
| 11 | sandcastle | 450 | 630 | h 155 (≈ 392-508, 475-630) |
| 12 | crab | 590 | 680 | w 120 (≈ 530-650) |
Line spacing: horizon → wave 1 = 78, wave 1 → wave 2 = 80, wave 2 → sand = 72 (all ≥ 28). Every guide ≥ 16 from the inner border.
**Budget:** est. 8,000 px ≤ 11,000. Stack 8-708 = 700.
**Forbidden:** loops / curls (F7); text or bubble words ("Hello Summer"); a wave crossing the boat; three waves of identical shape stacked (two waves + one straight horizon, as drawn).
**EN:** `title` **Summer Picture Tracing: Trace the Waves Across the Sea** (54) · `printTitle` **A Postcard from the Sea** · `instruction` **Trace the waves from left to right. Then trace the boat and the beach.** (70)
**Query face:** summer tracing pictures · beach / sea tracing · it "disegni da ripassare estate" · es "dibujos para repasar del mar".

### F15 : Big, Middle and Small (K, CODE `mode:'big-middle-small'`)
**Move:** trace the same picture three times, biggest first, the guide getting finer as the picture shrinks (grading movement size, a prerequisite for letter sizing).
**Design: A** (sky, road, sea: three planes, three cars, three boats). A meets the pedagogy's 3 rows at K by using WIDE drawings (the 130 px floor is the width); B's two conveyor belts flagged that 3 rows were impossible with tall drawings, which is true for tall drawings only. PreK is not offered (B, correct: three sizes cannot all meet the 300 px PreK floor).
| row | key | gr | big (P1) | middle (P2) | small (P3) |
|---|---|---|---|---|---|
| sky | `vehicles bw 2/airplane` | 1 | x 155, yb 180, w 290 → 10-300, 66-180 | x 425, yb 170, w 197 → 327-523 | x 605, yb 160, w 130 → 540-670 |
| road | `vehicles bw 2/car` | 1 | x 155, yb 400, w 290 → 274-400 | x 425, yb 400, w 197 | x 605, yb 400, w 130 |
| sea | `vehicles bw/boat_2` | 1 | x 155, yb 655, w 290 → 506-655 | x 425, yb 655, w 197 | x 605, yb 655, w 130 |
Scale 100 / 68 / 45 %. Structure: a small solid cloud (560,60,110) above the small plane; road line `M.line([[4,402],[671,402]])` solid; sea `waves(4,671,660,48,6)` solid: each family on its own ground. Gaps in a row 27 and 17; row bands never touch (180 ↔ 274; 400 ↔ 506). The page is K, so the SMALL copy keeps the K floors (≥ 18 between its own lines, dashed runs ≥ 25) even though it is drawn in P3; details below those floors print solid.
**Budget:** est. 7,800 px ≤ 11,000. Stack 50-708 = 658.
**Forbidden:** different drawings in one row; a small copy under 130 px longest side; the order small → big; a size number.
**EN:** `title` **Tracing Pictures for Kids: Big, Middle and Small** (47) · `printTitle` **Big, Middle, Small** · `instruction` **In every row, trace the big one, then the middle one, then the small one.** (73)
**Query face:** tracing pictures for kids (vehicles) · pt "desenhos pontilhados de carros" · es "dibujos punteados para niños".

### F16 : Trace the Dots: Morning on Main Street (G1, CODE `mode:'dotted-street'`)
**Move:** follow lines of dots exactly, small details included (precision; the detailed top of the ladder).
**Design: A** (the town square in three bands: buildings / pavement / road). B's Main Street is the same idea but takes `home and nature bw/tree_3` (F8's hero) and a fire truck; A's cast is all free. P4 dots, ONE spacing (7 px in page space) for the whole page: the engine resamples every polyline by arc length AFTER scaling, never per drawing.
| item | key | gr | mode | x | yb | h / w | box |
|---|---|---|---|---|---|---|---|
| cloud | `cloud(320,82,120)` | | dots | | | | 260-380, 32-82 |
| museum | `travel and holiday bw/museum` | 2 | dots | 140 | 420 | h 270 | 21-259, 150-420 |
| hotel (hero) | `travel and holiday bw/hotel` | 3 | dots | 523 | 420 | h 290 | 376-670, 130-420 |
| pavement line | `ground(4,671,422,0,1)` | | dots | | | | buildings stand on it |
| kerb line | `ground(4,671,562,0,1)` | | dots | | | | pavement things stand on it |
| pigeon | `birds bw/pigeon` | 2 | dots | 110 | 562 | h 85 | 75-145, 477-562 |
| signpost | `travel and holiday bw/signpost` | 2 | dots | 318 | 562 | h 125 | 270-366, 437-562 |
| dog | `animals bw/dog` | 2 | dots | 430 | 562 | h 110 | 377-484, 452-562 |
| bicycle | `sports bw/bicycle` | 2 | dots | 585 | 562 | h 100 | 503-667, 462-562 |
| bus | `vehicles bw/bus_2` | 2 | dots | 170 | 700 | h 130 | 37-304, 570-700 |
| car | `vehicles bw/car` | 2 | dots | 500 | 692 | w 240 | 380-620, 621-692 |
Gaps (G1 ≥ 10): signpost-dog 11, dog-bike 19, signpost top 437 ↔ pavement 422 = 15. Every inner run < 12 px prints solid (the hotel's window ticks).
**Budget:** est. 13,500 px ≤ 15,000; drop order if measured over: pigeon, then bicycle (never shrink the buildings).
**Stack** 32-700 = 668. **Forbidden:** numbers; dashes mixed with dots; two dot spacings.
**EN:** `title` **Dotted Picture Tracing for 1st Grade: A Town Street** (51) · `printTitle` **Morning on Main Street** · `instruction` **Trace the dotted lines carefully, the small details too.** (55)
**Query face:** tracing pages printable (1st grade) · es "dibujos punteados" · pt "desenhos pontilhados" · it "disegni tratteggiati classe prima" · no "prikktegning" · sv "rita efter prickar".

### F17 : Trace the Picture, Say Its Name, Trace the Word (G1, CODE `mode:'picture-and-word'`)
**Move:** trace the picture, say its name, trace the word under it (picture → word, letter formation, L.K.1.a).
**Design: merged.** B's flash-card geometry (four Montessori cards, picture on top, word on a seated lane below) + A's checked per-locale word set + ENGINE FACT 4 (the platform's school-hand dashed word lanes replace both designs' P4 dotted letters). Pictures `guide` P3 (grade 1, allowed by pedagogy #13). **Cast:** `nature bw/sun` (1) · `nature bw/fish` (1) · `animals bw 4/cat` (1) · `fruits bw/apple` (1).
| # | element | params |
|---|---|---|
| 1 | cards (structure) | roundRect at x 14 / 345 (w 316), y 14 / 370 (h 332), r 18 |
| 2 | picture | centred in its card, yb = card top + 190, h 165 (fish w 220) |
| 3 | word lane | the school-hand stacked trio lines, x card + 24 to card + 292 (268 px), baseline at card top + 296, seated and measured by `lib/key-on-row.js`; 7 letters fit at the lane's x-height |
Words per locale (3-7 letters, no article, no space / hyphen / apostrophe; A, checked; the panel re-checks each against `image-vocabulary.js` for THESE keys): en sun fish cat apple · de Sonne Fisch Katze Apfel · fr SOLEIL POISSON CHAT POMME · es sol pez gato manzana · pt sol peixe gato maçã · it sole pesce gatto mela · nl zon vis kat appel · sv sol fisk katt äpple · da sol fisk kat æble · no sol fisk katt eple · fi aurinko kala kissa omena. Case: lowercase school print except de (capital initial) and fr (capitales d'imprimerie). Diacritics (ç ã ä æ) keep their marks solid.
**Budget:** est. 5,500 px ≤ 15,000 (pictures + letters). Stack 14-702 = 688.
**Forbidden:** articles; > 7 letters in that locale; a picture a child names otherwise (cup / mug, teddy / bear, bird / crow, boat / ship: none is used); "letter tracing" in a title (other families).
**EN:** `title` **Trace the Picture, Say Its Name and Trace the Word** (50) · `printTitle` **Picture Words** · `instruction` **Trace the picture. Say its name. Trace the word under it.** (57)
**Query face:** "trace the picture, say its name" · trace the picture of fish · fr "écriture GS" (body) · de "Schreiben Klasse 1" (body).

### F18 : Trace It, Then Draw: The Empty Trailer (G1, CODE `mode:'trace-and-draw'`)
**Move:** trace the scene, then draw ONE more thing that belongs there in the empty space, and tell the class about it (the only open-ended face).
**Design: merged.** B's idea (a tractor pulls an empty trailer: "what is it carrying today?", an empty space with a reason) built as A would: the trailer is a TRACED vector cart with two side walls and an open top, so the empty load space is part of the picture, not B's floating dashed box (a dashed frame would be one more thing to trace and reads as a guide for the drawing). A's empty paddock is the same move with a weaker prompt. **Cast** (`guide` P3, grade 2): `farm bw/tractor` · `farm animals bw/pig` · `birds bw 2/goose` · `farm bw/cow`.
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | `sun` | cx 90, cy 78, r 38, rays 10 | | |
| 2 | `cloud` | cx 450, baseY 120, w 200 | | |
| 3 | hills horizon | `ground(14,661,272,14,2)` | | |
| 4 | tractor | 168 | 570 | h 175 (≈ 49-287) |
| 5 | hitch | line (287,505) → (305,505) | | |
| 6 | trailer (vector, traced) | bed rect x 305-600, y 490-520; side walls x 305 and x 600 from y 320 to 490; wheels (365,545) r 25 and (540,545) r 25 | | |
| 7 | **load space** | the trailer's open interior x 305-600 × y 320-490 = **295 × 170** (≥ 160), nothing inside, no model | | |
| 8 | road | straight guide x 14-661, y 570 (the tractor and wheels stand on it) | | |
| 9 | pig | 120 | 700 | h 105 |
| 10 | goose | 335 | 704 | h 115 |
| 11 | cow | 555 | 702 | h 115 |
Clearances (G1 ≥ 10): load space top 320 ↔ hills 286 = 34; animals' tops ≥ 589 ↔ road 570 = 19.
**Budget:** est. 9,000 px ≤ 15,000. Stack 40-704 = 664.
**Forbidden:** a model of what to draw; a "right" answer; a space under 160 px; words in the space.
**EN:** `title` **Trace the Picture, Then Draw: What Is in the Trailer?** (53) · `printTitle` **What Is in the Trailer?** · `instruction` **Trace the farm. Then draw what the tractor is carrying in the empty trailer.** (76)
**Query face:** trace and draw · farm tracing pictures · nl "natekenen" · da "tegn efter billeder".

### F19 : The Other Half: The Open Book (G1, CODE `mode:'other-half'`)
**Move:** look at the solid left half and trace the dashed right half so both sides match (symmetry readiness + visual perception).
**Design: B** ("the open book + three hand mirrors"): the book's spine IS the line of symmetry, a metaphor every child knows; A's single page-long fold line is striking but leaves two white side bands on purpose, which the fill rule dislikes. Mode `half` (m on a butterfly in `scene-test-modes.png`), **split x = the drawing's MEASURED symmetry axis**, not its ink-box centre. **Cast** (front-facing, measured symmetric): `Easter bw/butterfly` (1) on the book · `animals bw/owl` (1) · `Christmas bw/bell` (1) · `faces bw/koala` (1) in the mirrors; left half solid, right half `guide` P3. Alternates (front-facing grade 1): `Christmas bw/ornament`, `faces bw/panda_2`, `faces bw/lion`.
| # | element | params |
|---|---|---|
| 1 | open book (structure) | two page outlines with curved tops: left (24,34) → (337,22) → (337,392) → (24,404); right mirrored; small solid ribbon bookmark at (600,22) |
| 2 | spine axis | grey dash-dot hairline x 337.5, y 22-392 (structure, hidden behind the picture) |
| 3 | butterfly | axis on x 337.5, yb 360, h 290 (w ≈ 432) |
| 4 | mirrors (structure) | three arched hand-mirror frames: roundRect at x 18 / 237 / 456, y 420, w 200, h 286, arch radius 100 at the top |
| 5 | axes | grey dash-dot hairlines x 118 / 337 / 556, y 432-694 |
| 6 | owl | axis x 118, yb 676, h 210 |
| 7 | bell | axis x 337, yb 676, h 200 |
| 8 | koala face | axis x 556, yb 676, h 160 |
Every picture ≥ 10 px clear of its frame.
**Gate:** mirror the solid half onto the dashed side; if the two halves differ by more than **10 px** (the G1 gap) anywhere, the drawing is rejected for its alternate. The dashed half carries the drawing's OWN lines, never an invented mirror.
**Budget:** est. 4,500 px ≤ 15,000. Stack 22-706 = 684.
**Forbidden:** side-view animals; a bow, a part-in hair or any visibly asymmetric detail; claiming symmetry for a drawing the gate rejected.
**EN:** `title` **Symmetry Picture Tracing: Trace the Other Half** (46) · `printTitle` **The Other Half** · `instruction` **Trace the dashed half so both sides of each picture look the same.** (66)
**Query face:** symmetry tracing pictures · finish the other half · fr "symétrie maternelle" (panel confirms) · de "Spiegelbilder nachspuren" (panel confirms).

### F20 : Find and Trace the Hidden Animals (G1, CODE `mode:'hidden-animals'`)
**Move:** look through a busy SOLID drawing, find the dashed animals (exactly N = 5, the N stated in the instruction), trace each one (figure-ground).
**Design: merged.** Both designs agree on the autumn forest, the knock-out halo and N = 5; the editor takes B's animal cast (A's hedgehog is the pedagogy's own example of 10-px spine noise) and B's placement (each animal at a natural place), with the halo at 10 px (ENGINE FACT 2). Scene `model` / solid; animals `guide` P3 with `halo:10`, in front of everything.
| item | key | gr | mode | x | yb | h |
|---|---|---|---|---|---|---|
| tree L | `nature bw/tree` | 3 | model | 145 | 560 | 520 |
| tree R (hero) | `nature bw/tree_2` | 3 | model | 540 | 540 | 490 |
| ground | `ground(14,661,560,6,3)` | | solid | | | |
| path | `pathBand` (338,716) → (330,640) → (360,600) → (338,560), width 110 → 40 | | solid | | | |
| leaves ×5 | `nature bw/leaf` (flips) at (300,120) h 40 · (370,210) h 36 · (60,610) h 40 · (470,650) h 38 · (620,600) h 34 | 1 | model | | | |
| mushrooms | `Easter bw/mushroom` x 250 yb 690 h 70 · `vegetables bw 2/mushroom` x 640 yb 702 h 60 | 1 | model | | | |
| **owl** | `animals bw 5/owl` | 1 | guide, halo 10 | 545 | 270 | 100 (in tree R's crown) |
| **squirrel** | `animals bw/squirrel` | 2 | guide, halo 10 | 150 | 330 | 100 (on a branch of tree L) |
| **fox** | `animals bw 5/fox` | 2 | guide, halo 10 | 470 | 612 | 105 (beside the path) |
| **rabbit** | `animals bw 2/rabbit` | 2 | guide, halo 10 | 105 | 700 | 115 |
| **mouse** | `animals bw 3/mouse` | 2 | guide, halo 10 | 560 | 702 | 65 (w ≈ 95 ≥ 80) |
**Gate:** the dashed drawings on the RENDER = 5 = the N printed in the instruction (all locales); every one an animal; each fully visible; no solid line within 10 px of a dashed animal; dashed animals overlap nothing dashed.
**Budget:** est. 3,600 px ≤ 15,000 (the forest is solid and does not count). Stack 20-716 = 696.
**Forbidden:** dashed non-animals; an animal partly covered; the instruction and the page disagreeing on N.
**EN:** `title` **Animal Tracing Pictures: Find the 5 Hidden Animals** (50) · `printTitle` **Who Hides in the Forest?** · `instruction` **Find the 5 hidden animals in the forest. Trace them.** (52)
**Query face:** animal tracing pictures printable · fr "dessins à repasser automne" · nl "natekenen dieren" · da "efterår opgaver" · no "høstoppgaver" · fi "syksy tehtävät" · de "Tiere nachspuren" (pt-BR: "floresta", no autumn, the panel's call).

### Dissimilarity proof (every face: own setting, family, main picture, guide)

| # | mode | setting | family | main picture (key) | guide | band | budget (est.) |
|---|---|---|---|---|---|---|---|
| 1 | base | cottage garden, perspective path | S | house `home and nature bw/house` | P2 | K | 10,063 (m) |
| 2 | first-tracing | ship's porthole on the sea | D porthole | whale `sea life bw/whale` | P1 + 1 marker | PreK | 1,600 |
| 3 | look-then-trace | two polaroids beside open paper | D polaroids | kangaroo `animals bw 4/kangaroo` | P1 + markers | PreK | 3,200 |
| 4 | round-and-round | three ramps, zigzag down | D marble run | beach ball `sports bw/beach_ball` | P1 + markers | PreK | 4,050 |
| 5 | straight-lines | three columns ↓ → ↘ | D columns | ladder `tools bw/ladder` | P2 | K | 7,000 |
| 6 | zigzags | evening storm over a mountain camp | S | mountains + tent `travel and holiday bw/tent` | P2 | K | 6,500 |
| 7 | curls | a five-cell gallery | D bento | snail `animals bw/snail` | P2 | K | 7,500 |
| 8 | trace-and-color | picnic blanket under a tree | S | tree `home and nature bw/tree_3` + blanket | P2 | K | 7,700 |
| 9 | where-to-start | a staircase going down | D stairs | stocking `Christmas bw/stocking` | P2 + all markers | K | 3,000 |
| 10 | trace-and-count | village pond, oval | S | ducks `birds bw 2/duck` ×5 | P2 | K | 4,800 |
| 11 | finish-the-picture | two mending shelves | D shelves | teapot `home bw/teapot` (part) | P2 parts | K | 2,600 |
| 12 | christmas | living room, night window | S | vector tree + baubles | P2 | K | 8,500 |
| 13 | shape-picture | rocket on its pad, sky of shapes | D vector hero | the rocket (vector) | P2 | K | 4,200 |
| 14 | summer-sea | seaside postcard with a stamp | S framed | sailboat `beach bw/sailboat` | P2 | K | 8,000 |
| 15 | big-middle-small | sky / road / sea rows | D rows | airplane `vehicles bw 2/airplane` ×3 | P1 → P2 → P3 | K | 7,800 |
| 16 | dotted-street | town street, three bands | S dense | hotel `travel and holiday bw/hotel` | P4 dots | G1 | 13,500 |
| 17 | picture-and-word | four flash cards | D cards | sun `nature bw/sun` + word lanes | P3 + lanes | G1 | 5,500 |
| 18 | trace-and-draw | farm road, tractor + empty trailer | S | tractor `farm bw/tractor` | P3 | G1 | 9,000 |
| 19 | other-half | open book + three mirrors | D book | butterfly `Easter bw/butterfly` | half, P3 | G1 | 4,500 |
| 20 | hidden-animals | dense solid autumn forest | S solid | forest `nature bw/tree_2` (solid) | P3 + halo | G1 | 3,600 |

Twenty settings, twenty main pictures, no key the main picture twice. **Reuse (≤ 2 faces):** `nature bw/tree` (F10 pond scenery, F20 forest scenery; main in neither); every other key appears in ONE face. Same-noun pairs are different drawings and different roles: butterflies (F1 `nature bw/butterfly` flyer · F19 `Easter bw/butterfly` main), bells (F9 `Easter bw/bell` · F19 `Christmas bw/bell`), owls (F19 `animals bw/owl` · F20 `animals bw 5/owl`), rabbits (F1 `animals bw 5/rabbit` · F11 `Easter bw/bunny` · F20 `animals bw 2/rabbit`), apples (F4 `fruits bw/apple_2` · F17 `fruits bw/apple`), trees (F1 `home and nature bw/tree` · F8 `tree_3`). At thumbnail size the families alternate strictly from F5 on, and no two devices share a silhouette (round porthole · two frames · Z of ramps · three columns · bento · stair · two shelves · central rocket · three stripes · 2×2 cards · book over three arches).

## 4 Native rebuild plan x11

Per locale ONE native panel (lean, #1 rule) authors from the harvested heads, never from English: **20 titles** (≤ 70 chars, the locale's head + the face's tail + a grade stamp where it helps; never the trap words of `_PANEL-FINDINGS.md`) · **20 printTitles** (≤ 34, the story) · **20 instructions** (imperative to the child, ≤ 12 words where the language allows, read aloud by an adult, naming only what is drawn) · rail `slug` + `name` (table B) · `topicMeta['picture-tracing']` ≥ 50 chars · skill `full` + `short`. The panel is handed the ENGLISH as a SOURCE TO AUDIT, not as a target, and reads the rendered page of every face before writing its line.

**Risky words (the panel decides, the gate checks):**
- **fr** never *repasser* alone (ironing): always *repasse les pointillés / le dessin*; *graphisme* (pre-writing's rail) may appear in body copy, never as a title's lead. F19 *symétrie* (panel confirms register for GS / CP).
- **es** *grafomotricidad* (pre-writing's rail) never in a title; never *con números para unir* (dot-to-dot); es-MX register (*papalote*, *preescolar*).
- **pt** never *com números* (dot-to-dot); *cubra / cobrir* not *pinte* alone; Christmas indoors (summer); F20 *floresta* without *outono* if the panel prefers.
- **it** *pregrafismo* only inside *pregrafismo disegni tratteggiati*; never *schede* in a title.
- **de** *nachspuren* (never *Schwungübungen*, pre-writing's rail); compounds in instructions shortened to the base noun (*Kugel*, not *Weihnachtsbaumkugel*); F17 nouns capitalised.
- **nl** never *schrijfpatronen*; *overtrekken* with the picture noun.
- **sv** *spåra* ALWAYS with *bilder* / a picture word (*spåra paket* = parcel tracking); never *Spåra linjer* alone.
- **da** never *tegn over* (crossword) or *tegn efter tal* (dot-to-dot).
- **no** never *tegn etter tall* or *tegn på*.
- **fi** whole sentences per face (case): F10 *Jäljennä ankat. Laske ne. Kirjoita laatikkoon, montako niitä on.*-type frame; F20 numeral agreement *5 piilossa olevaa eläintä* (partitive, the panel's call).
- **F5** "slanted": de *schräg*, fr *en biais / penché*, es *inclinado*, it *obliquo*, nl *schuin*, sv *snett*, da *skrå*, no *skrå*, fi *vino*. **F4** "like the letter o": every locale keeps *o* (all 11 scripts start o at 2 o'clock).
- **F8 / F13** colour verbs: en US *color* (the harvested en head is "trace and color"); the panel uses its locale's normal verb, never a colour WORD as an instruction.

**F17 word pools (per locale, from `image-vocabulary.js` for the four keys):** the A list in F17 is the starting set; the panel confirms each singular is 3-7 letters in its locale, has no apostrophe / hyphen / space, no article, and that a five-year-old names the picture that way. Any word that fails is replaced by a picture whose word passes (pool: `nature bw/moon`, `birds bw/duck`, `sports bw 2/soccer_ball` "ball"), never by a longer word. Diacritics stay as solid marks.
**F10 counted noun (plural, object of "trace"):** en ducks · de Enten · fr canards · es patos · pt patos · it anatre · nl eenden · sv ankor · da ænder · no ender · fi ankat. The number the child writes stands alone in its box: no numeral agreement is printed.
**F20 N = 5** in every locale, written as the numeral 5 in the instruction (the one number the family prints), with the noun in the case the numeral needs.
**Season / culture words:** F12 Christmas (indoor scene, no snow) in all 11; F14 summer (pt-BR / es-MX audiences have a beach summer at different months; the title says "summer" or "sea" at the panel's choice); F20 autumn (pt may drop it).
**Nothing English on any non-EN page.**

## 5 Data + gates

`data/b9/picture-tracing.js` (locale-neutral, hand-authored: the 20 pinned item lists + structure exactly as §2-§3) + `data/b9/locales/picture-tracing.<loc>.json` GENERATED from `i18n/.draft-b9-<loc>.json` by `tools/apply-b9-locale.js` after `tools/validate-b9-draft.js` (cloned from the b8 spine), read through `lib/b9-common.js bank('picture-tracing', loc)` (throws on a missing literal, never an en fallback). The apply step writes BOTH `strings.<mode>` and `i18n/strings.<loc>.json[<ID>]`; `tools/check-b9-string-parity.js` asserts they are identical (the two-places trap). `data/` is gitignored: `git add -f`.

```
// data/b9/picture-tracing.js
module.exports = {
  MODES: ['base','first-tracing','look-then-trace','round-and-round','straight-lines','zigzags','curls','trace-and-color',
          'where-to-start','trace-and-count','finish-the-picture','christmas','shape-picture','summer-sea','big-middle-small',
          'dotted-street','picture-and-word','trace-and-draw','other-half','hidden-animals'],
  BAND: { PreK:{guide:'P1', minSeg:50, minGap:28, air:30, minPic:300, singlePic:420, grade:[1],   cap:4500 },
          K:   {guide:'P2', minSeg:25, minGap:18, air:16, minPic:130,                 grade:[1,2], cap:11000},
          G1:  {guide:'P3', minSeg:12, minGap:10, air:10, minPic:80,                  grade:[1,2,3], cap:15000} },
  DOT_SPACING_PAGE_PX: 7,  BODY: {w:675, h:716}, STACK: [620, 740],
  PAGES: { /* per mode: items[] {key|motif|path, x, yb, h|w, flip, mode, part, halo, markers}, structure[] } */ },
  F10: { countedKey:'birds bw 2/duck', N:5 },  F20: { N:5, halo:10 },
  F17: { keys:['nature bw/sun','nature bw/fish','animals bw 4/cat','fruits bw/apple'] /* words from the locale JSON */ },
};
// data/b9/locales/picture-tracing.<loc>.json
{ "rail":{"slug":"…","name":"…"}, "topicMeta":"…", "skill":{"full":"…","short":"…"},
  "strings": { "<mode>": {"title":"…","printTitle":"…","instruction":"…"} ×20 },
  "f17Words": ["…","…","…","…"], "f10Plural":"…" }
```

**The gates (all on the RENDERED page, every face × every locale; each poison-tested both ways, a must-fire AND a must-pass case):**
1. **Tracer laws per drawing:** (a) every guide lies on the drawing's own centre line (deviation ≤ 1.5 px from the thinned ink, m on the render); (b) the tracer never invents a line and never merges two drawings into one (every guide polyline maps to one ink run of one drawing or one declared motif / path). Filled black parts (pupils) stay solid.
2. **Band rules:** guide style = the face's band (F15: P1 / P2 / P3 by copy size; F16 P4); every dashed run ≥ the band's shortest segment, else it prints SOLID; any two neighbouring guide lines ≥ the band gap unless the drawing itself joins them; grade per the band (PreK (1), K (1)-(2), G1 (1)-(3)); no two guides cross or touch across two pictures; pictures never overlap; ground / structure only BEHIND objects.
3. **Traced-length budget:** PreK ≤ 4,500 · K ≤ 11,000 · G1 ≤ 15,000 px per page, measured after the solid-detail rule; over budget = drop per the face's stated order, never shrink the hero.
4. **Minimum picture size + clear paper:** longest side ≥ 300 (PreK; F2 single picture ≥ 420), ≥ 130 (K), ≥ 80 (G1); ≥ 30 / 16 / 10 px clear paper round every traced picture.
5. **Device clearance:** every guide ≥ the band gap from any structure line it does not stand on; structure never dashed except the F19 axis hairline.
6. **Start markers:** F2-F4 one per picture (`'picture'`), F9 on every line (`'lines'`), nowhere else; every marker obeys the convention (top / left end of an open line, 2 o'clock anticlockwise on a closed one); a line where the convention is impossible carries none.
7. **F5 straightness:** ≥ 80 % of each picture's guide length straight (curvature measured per run).
8. **F8 + F12 closure:** every traced outline in F8 closed; every small shape in F12 closed and 40-70 px across, 8-12 of them.
9. **F11 part rule:** the dashed part ≥ 20 % of each outline, no dashed fragment < 25 px.
10. **F7 spiral spacing:** turns ≥ 18 px apart at the placed scale.
11. **F19 symmetry:** halves differ by ≤ 10 px (the G1 gap) anywhere after mirroring about the MEASURED axis; else the alternate.
12. **F10 count:** exactly ONE counted key, all dashed instances of it = N (3-10, never 0; ships 5), no other dashed drawing, one answer box.
13. **F20 N counted on the render** = the numeral in that locale's instruction; every dashed drawing an animal; halo clean.
14. **F13 true shapes:** circles round, squares equal-sided right-angled (one turned 45°), triangles straight-sided, no rounded corners; ≥ 18 px between shapes; exactly 4 circles; the key shows one filled disc.
15. **F17 words:** 3-7 letters, from the locale JSON, seated on the lane (`key-on-row.js` measure), the only text in the body.
16. **Body fill:** content stack 620-740 px, measured from the lowest and highest ink on the render (the dev render's empty top band is the must-fire poison); 87 %+ page use.
17. **No text in the body** except F17's words (and the structure glyphs: arrows, eye, sample marker, which are vector, not text).
18. **Every library key** exists in `_SUBSTRATE-POOL.md` with a grade the band allows; no excluded imagery (cross, church, angel, bible, blades, weapons, the toys "tank"); no B&W / colour mixing (B&W library only).
19. **Variation distinctness:** `tools/gate-variation-distinct.js --batch=b9` (no two faces share a main key, a device, or the same item list).
20. **Hub:** `node scripts/verify-hub-type-rows.js --expect=docs/worksheet-gen/b9-designs/hub-expectations.json` HARD in `deploy.sh` (exported by `tools/export-hub-expectations.js --batch=b9`; poison = drop one landing / drop `apps['picture-tracing']` must FAIL). Expected rows **20 per locale × 11 = 220**; no face is refused at design time (every face is locale-neutral except F17's words, which the panel replaces rather than refuses; a locale that cannot find four 3-7-letter words refuses F17 explicitly and the matrix records it).

## 6 SEO plan

One landing per face per locale (220), `coordinate = {type:'picture-tracing', mode:<mode>, theme:'', level:<table B key>}`, slug unique per locale, `canonicalDeckSlug` = the deck. h1 = `title`; the printed sheet shows `printTitle`. The PDF's title metadata carries the head. No visible "free" (metadata only, the b3 ruling); no "worksheet" as a clunky last word; never promise a screen or an answer key (PDF only). Non-EN titles are written by the panel from the locale heads, never translated.

**EN title pattern:** `<harvested head> : <the face's story or task>` (≤ 70). **EN meta pattern** (120-170, measured by `tools/measure-instruction-window.js`): `<the face's task in one sentence> <who it is for: preschool / kindergarten / 1st grade>. Printable PDF.` Examples: F2 "One giant whale to trace with long, slow lines from a start dot: a first tracing page for preschool hands. Printable PDF."; F8 "Trace a picnic under a tree, then color the watermelon, the cup, the pear and the lemon inside the lines. For kindergarten. Printable PDF."

**Head ownership (one harvested query per face, no two faces leading with the same head):**

| face | EN lead head | owns (locale examples) |
|---|---|---|
| base | picture tracing worksheets | Bilder nachspuren · dessin à repasser · dibujos para repasar · desenhos pontilhados · disegni tratteggiati · tekening overtrekken · spåra bilder · tegn efter stregerne · følg linjene · jäljennä kuvat |
| F2 | tracing worksheets for preschool | Nachspuren Vorschule · dessin pointillé maternelle · dibujos punteados preescolar · cobrir pontilhado educação infantil |
| F3 | trace the picture | ripassa il tratteggio · natekenen kleuters · rita av djur |
| F4 | tracing worksheets for toddlers | overtrekken peuters · fichas de trazos para niños de 3 años |
| F5 | straight-line picture tracing | Nachspuren Kindergarten · trazos en dibujos · coordenação motora |
| F6 | trace the picture (zigzag) | suivre les pointillés · disegni da ripassare · följa linjer |
| F7 | tracing pictures for kids (curls) | desenho para cobrir · pregrafismo disegni tratteggiati |
| F8 | trace and color the picture | je repasse et je colorie · dibujos para repasar y colorear · cubra e pinte · ripassa e colora · Nachspuren und ausmalen · overtrekken en kleuren · rita och färglägg · tegn og farvelæg · tegn og fargelegg · piirrä ja väritä |
| F9 | picture tracing for kindergarten | førskoleopgaver · førskoleoppgaver · esikoulu tehtävät · finmotorik förskola |
| F10 | trace and count | dessins à repasser animaux · dibujos de animales punteados |
| F11 | picture tracing sheets | stippellijn tekening · tracing pages printable |
| F12 | Christmas picture tracing | disegni di Natale da ripassare · dessins à repasser Noël · joulutehtävät lapsille · jul pyssel |
| F13 | shape picture tracing | (panel: geometric-shape heads per locale) |
| F14 | summer picture tracing | (panel: summer / sea heads) |
| F15 | tracing pictures for kids (big and small) | desenhos pontilhados de carros · dibujos punteados para niños |
| F16 | dotted picture tracing for 1st grade | prikktegning · rita efter prickar · disegni tratteggiati classe prima |
| F17 | trace the picture, say its name | (letter-formation phrasing per locale, never "letter tracing") |
| F18 | trace the picture, then draw | natekenen · tegn efter billeder |
| F19 | symmetry picture tracing | (panel) |
| F20 | animal tracing pictures | Tiere nachspuren · natekenen dieren · efterår opgaver · høstoppgaver · syksy tehtävät · dessins à repasser automne |

Seasonal and themed demand (animals, Christmas, autumn, summer, sea, vehicles, food) is owned by F20 / F10, F12, F20, F14, F14, F15 and F8 respectively; the generic head belongs to the base only.

**Non-cannibalisation** (whole-landing 3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL ≥ 0.80 / WARN 0.65, measured at landing time): the copy of each landing describes the RENDER of its face (its setting, its pictures, its move); the highest-risk pairs are F4 / F7 / F5 / F6 (the four stroke faces: each names its stroke and its device), F3 / F19 (model beside a copy vs one picture split by an axis), F8 / F13 (both end in colouring: free colours vs every circle), F2 / F4 (one picture vs three round pictures).

**Boundary sentence on every landing:** "Picture tracing follows the outline of whole pictures; abstract line practice, step-by-step drawing and numbered dot-to-dot have their own pages." (each locale's panel writes its own, naming its locale's pre-writing, how-to-draw and dot-to-dot rails).
