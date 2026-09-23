# G1-376 `plants` : design A (Designer A, 2026-09-23)

Sources read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (plants ruling: the plant figure is a NEW primitive; the life cycle face lives HERE), the `plants` sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `../b4-designs/K-354-human-body.md` (§1-2), `primitives/body-figure.js` (whole file), `primitives/water-cycle.js` (sun geometry), `primitives/_tokens.js`, `templates/components-b4/human-body.js` (exports), `templates/components-b3/all-about-me.js placeLanes`, `templates/components-b3/ordinal-numbers.js blankNumeralBox`, `templates/components-b3/picture-word-cards.js {scissorsGlyph, cutLines}`. Renders LOOKED at: `out/b4-sweep/en/K-354-null-d2-en.png`, `out/b4-sweep/en/G3-385-null-d2-en.png`, `out/b3-sweep/en/K-347-fruits-d2-en.png`. Pictures OPENED (contact sheets `scratchpad/G1-376-veg.png`, `G1-376-misc.png`): vegetables/{carrot radish beetroot parsnip lettuce spinach cabbage broccoli cauliflower celery asparagus corn green_beans tomato cucumber bell_pepper turnip potato pumpkin eggplant chilli_pepper squash leek onion}, weather/{sun raindrop cloud}, spring/{watering_can bud leaf flower garden grass sun rain}, flowers/{sunflower tulip dandelion}, tree/{oak apple}, fruits/{apple peach}. (m) = measured from a file named here; *est.* = engineer measures in the real render (`render/one.js`, shell woff2 from `file://`). No em-dashes.

## Boundary

This family is NOT K-202 fruits-vs-vegetables (no face asks "fruit or vegetable"; the eat face asks for the PART), NOT K-201 living/non-living, NOT K-214 natural/man-made, NOT K-322 seasons (spring), NOT G1-203 science-sequence (the chicken; our cycle is a PLANT cycle drawn by a primitive, placed on a CYCLE RING, never a linear 1-4 strip of library pictures), NOT G1-377 animal-life-cycles (no animal, no metamorphosis), NOT K-354 human-body (a person figure) and NOT K-225/K-347 picture-word matching (no card of a library picture with its name). It owns: the DRAWN PLANT (a new palette-only primitive in four drawings: the labelled diagram, the growth stages, the half-flower, the part icon), what a plant needs (as a prediction, never a list of needs), the seed-to-seed cycle, which part we eat, and what each part does. **Visual signature: the SOIL WINDOW.** Every plant this family draws stands on one straight teal ground line with a creamDeep cut-away of soil below it, roots visible inside; the base adds a MAGNIFIER inset that looks inside the fruit at its seeds. K-354 is one tall figure on white; G3-385 is a landscape; this is a plant in a slice of earth, recognisable from across the room.

## 1 Page concept (base): "Parts of a Plant: the soil window"

One plant, 498 px tall, in the middle of the page: roots spread in a cream-deep slice of soil, a stem rising through four alternate leaves, a five-petal flower at the top, one fruit hanging from a side branch, and beside the fruit a round magnifying glass showing that fruit cut in half with its seeds. Six coral rings mark six parts; six handwriting lanes, three per side, each tied by a straight teal leader to one ring. A bank of six words across the top. The child copies each word onto the lane that points to its part.

What makes it top quality:
- **Botanically honest, not clip-art.** Roots are underground (below the ground line) with a taproot and laterals (a dicot); leaves are simple, ovate, pointed, attached at NODES on the stem and alternate (never floating, never opposite pairs glued on); leaves get smaller up the stem; the flower sits at the apex with two sepals under it; the fruit hangs from a node with its calyx cap (it visibly came from a flower); seeds are shown INSIDE the fruit, in section, the way a botanical plate shows them. Flowering and fruiting at the same time is true of beans, peppers and tomatoes; the landing may say so.
- **One focal apparatus, generous whitespace:** no scenery, no sun, no pot on the base; the page is the plant, the lanes and air.
- **Pencil first:** six writing lanes on school lines; nothing to colour, nothing to cut.
- **Six parts = NGSS 1-LS1-1 and BNCC EF02CI06 verbatim** (roots, stems, leaves, flowers, fruits) + the seed (pedagogy panel set). The seed only works because the magnifier exists: a seed drawn loose on the soil reads as a pebble.

## 2 Layout (d2, 722 body)

Chrome budget: body **722** (3-line title + 3-line instruction), checked at **677** (4-line fi title). `.ws-page` inner 675 (m, `_SUBSTRATE.md`). Root grid rows `59px minmax(560px,1fr)`; the stage absorbs slack (figure stays 498; lanes re-placed against the taller stage).

```
y 0    ┌──────────────────────── wordBank 675 x 59 ─────────────────────────┐  bodyLabelBank (6 .ws-bankword, Nunito 800 18)
       └────────────────────────────────────────────────────────────────────┘  + margin-bottom 10
y 69   ┌──────────────────────── plantLabelStage 675 x 580 (data-ws-content) ─────────────────────┐
       │ [lane L 180x60]──┐                                          ┌──[lane R 180x60]  flower   │
       │                  │   ┌─────── plantDiagram h 498 w 299 ─────┐│                            │
       │ [lane L 180x60]──┼──o stem          (x 188..487, y 41..539)  o─[lane R 180x60]  fruit    │
       │ [lane L 180x60]──o leaf       ( fruit )  (magnifier: seeds ) o─[lane R 180x60]  seed     │
       │ [lane L 180x60]──o root  ═════ ground line ═════            │                            │
       │                      ▒▒▒▒▒ soil window with roots ▒▒▒▒▒      │                            │
       └──────────────────────────────────────────────────────────────────────────────────────────┘
```
- Width: lane 180 + gap 8 + figure 299 + gap 8 + lane 180 = **675 ≤ 675** (m arithmetic). Lane = `.ws-blankbox` (white, dashed coral 2.5, r 10) holding `writingRow({w:174, h:54, glyphH:32, xHeight:true})` (G1 handwriting; answer numeral floor 26 does not apply, no numerals).
- Height: 59 + 10 + 580 = **649 ≤ 722** and **≤ 677**. Stage 580: figure top at stage y 41 = (580 − 498)/2.
- Figure: `plantDiagram({h:498})`, viewBox 360×600, scale 0.83, width 298.8 (m arithmetic). Anchor px in stage coords = (188 + ax·0.83, 41 + ay·0.83).
- Worked example (unmirrored, the d2 six; figure units → stage px): flower (180,52) → (337.4, 84.2) · fruit (268,198) → (410.4, 205.3) · seed (309,300) → (444.5, 290.0) · stem (179,258) → (336.6, 255.1) · leaf (129,302) → (295.1, 291.7) · root (178,470) → (335.7, 431.1). `placeLanes(ys, 60, 580, 20)` (m, `all-about-me.js:282`): **R tops 54 / 175 / 260**, **L tops 225 / 305 / 401** (leaf lane pushed 262 → 305 by the stem lane; root lane stays 401; bottom 461 ≤ 580).
- Leaders: teal 2.5 px from the lane's inner-edge midpoint to the ring centre; ring = coral circle r 7 px stroke 3 (the K-354 idiom). Checked by hand on the worked example: stem leader (180,255)→(336.6,255) runs between the upper-left leaf (px y 183..211) and the lower-left leaf (px y 277..315); leaf leader (180,335)→(295,292) ends on its own blade; root leader crosses only roots (own region); fruit leader (495,205)→(410,205) runs above the magnifier (top px y 248.5); seed leader (495,290)→(444.5,290) runs above the magnifier handle (px y 305..320). The engineer re-runs this with the obstacle sweep (§5) on every seed.
- Bank: 6 chips one row. Longest d2 six per locale *est.* (Nunito 800 18 ≈ 7.8 px/char + 36 chip padding): de "Stängel Wurzel Blatt Blüte Frucht Samen" ≈ 6·36 + 39·7.8 ≈ 520; fi "juuri varsi lehti kukka hedelmä siemen" ≈ 500; pt "raiz caule folha flor fruto semente" ≈ 480. All < 639. If a panel adds an article literal (nl "de wortel", "het blad"), the bank wraps to 2 rows = 108: 108 + 10 + 580 = **698 ≤ 722**, and at 677 the stage floor drops to minmax 559 (figure 498 still fits: 41 → 30 top margin). UNKNOWN until measured: nl with articles at 677.
- Order of chips: `rng.shuffle`, re-drawn until it differs from the lanes' top-to-bottom order (position leak, the G1-244 idiom).

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `labels` (part ids) | 4: root stem leaf flower | **6: root stem leaf flower fruit seed** | 6 (same) |
| `perSide` | 2 | **3** | 3 |
| `bank` | on | **on** | off (write from memory; plain lanes) |
| `inset` (magnifier) | off | **on** | on |
| `mirror` | rng | **rng (50 %)** | rng |
| `figureH / laneW / laneH / glyphH` | 498 / 180 / 60 / 32 | **498 / 180 / 60 / 32** | 498 / 180 / 60 / 32 |
| `leafPick` (which leaf carries the ring) | L-low | **rng of {L-low, R-low}** | rng |

d3 is not a face (no-bank recall is a scaffold level, not a teaching move; it is not shipped and no copy describes it).

## 4 Answer-hiding + uniqueness

- Nothing on the page names a part: the drawing carries rings, the bank carries the words, the lanes are empty. The answer lives only in `data-lcs-answer="<partId>"` on each lane and `data-lcs-anchor="<partId>"` on each ring.
- Uniqueness by construction: six DIFFERENT part ids, one ring each, every word used once; bank count = lane count. verify(): (1) set of lane answers = set of bank words' ids, (2) each ring's centre lies INSIDE its own part's drawn shape (point-in-shape against the primitive's `regions`, the body-figure pattern), (3) no leader crosses another leader or passes within 10 px of a foreign ring, (4) bank order ≠ lane order.
- A wrong answer is visible to the teacher at a glance: the lanes are in a fixed place per seed and the answer key is the same diagram (no answer key is SHIPPED, per the nt10-D ruling; the teacher reads the drawing).
- Ambiguity guards: the leaf ring sits in a blade centre (never on a petiole, which a child might call stem); the stem ring sits on bare stem between two nodes (never at a node); the fruit ring on the whole fruit on the plant, the seed ring on one seed INSIDE the magnifier, so "fruit" and "seed" can never swap.

## 5 Primitives / components

**Reused (exact name + file).**
- `placeLanes` (`templates/components-b3/all-about-me.js`), `writingRow` (`primitives/trace-path.js`), `bodyLabelBank` (`templates/components-b4/human-body.js`: a generic word-chip bank), `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`), `scissorsGlyph` + `cutLines` (`templates/components-b3/picture-word-cards.js`), `cardGrid` (`templates/layouts/card-grid.js`), `svgRoot / el / esc` (`primitives/_svg.js`), tokens (`primitives/_tokens.js`).
- Pattern (copied, not imported, because they are private): `limbPath` tapered-capsule geometry and the markers block from `primitives/body-figure.js`; the leader/obstacle sweep of `bodyLeaderSweep` (`components-b4/human-body.js`) if its `ownRegions` can be injected by option, else a clone `plantLeaderSweep` in the b5 component (UNKNOWN: engineer checks the signature at `human-body.js:111`).
- Sun geometry from `primitives/water-cycle.js` (disc r 30 coral, 8 rays 38 → 54, stroke accent) for the needs glyph, redrawn in `needGlyph` at its own scale.

**NOT used.** `bodyLabelStage` (hard-wired to `bodyFigure`); library pictures on the base (no picture has roots, the flowers theme is species portraits, `spring/flower` has no roots and no fruit); `weather/sun` + `weather/raindrop` (opened: a cartoon sun with a face and a glossy drop; they would sit beside a line-art plant in two styles, and there is no picture for "no sun"); `space/sun` (BLOCKED); `vegetables/turnip` (opened: beetroot art), `vegetables/potato` (tuber = stem), `vegetables/onion`, `leek`, `garlic` (bulbs), `mushroom` (not a plant), `vegetables/corn` (opened: a cob; the kernel is botanically a fruit, not a seed), `vegetables/green_beans` (opened: a pod = a fruit, would be read as a stem), `vegetables/asparagus` (opened: the red tip reads as a flower bud).

**NEW `primitives/plant-figure.js`** (pure SVG on tokens; one file, five exports; every drawing shares one leaf shape, one petal shape, one ground line, one soil fill).

Shared style tokens:
- Outline teal `#146B5E`, **3 px rendered at every size** (user units = 3/scale, the body-figure rule); veins, root hairs, pebble outlines 1.5 px (`stroke.grid`).
- Fills: leaf + stem + sepal `tealSoft` · petal `coralSoft` · flower centre `creamDeep` with six teal dots r 2 · fruit `coralSoft` · fruit flesh in section `cream` · seed `cream` · root `cream` · soil `creamDeep` · pebbles `grid` · pot `creamDeep` · magnifier lens `white`. **Coral (`#F2784B`) never appears in the plant**; it is reserved for rings/markers and the needs sun (water-cycle precedent). Greyscale: every region is separated by a 3 px teal outline, so fills may all print near-white without losing a part.
- Leaf shape (local coords, base at 0,0, pointing +x, length L, width W): `M0,0 C .25L,-.62W .70L,-.55W L,0 C .70L,.55W .25L,.62W 0,0 Z`; midrib `0,0 → .92L,0` 1.5 px; two pairs of side veins at .35L and .6L, 1.5 px, length .3W. Placed by (base, angle, L, W); anchor = base + 0.5L along the angle.
- Petal: ellipse rx .48r ry .30r centred at .52r from the flower centre; 5 petals at −90° + k·72°. Centre disc r .27r.

(a) **`plantDiagram({h=498, mirror=false, inset=true, markers=[], rings=[], hide=[], id})` → `{svg, width, height, scale, anchors, regions, obstacles}`**. viewBox **0 0 360 600**; width = h·0.6. MIN_H 420 (the fruit falls under 36 px), MAX_H 600. `mirror` maps x → 360 − x for every point (inset moves to the left).
| part | geometry (figure units) |
|---|---|
| soil window | rect x 12..348, y 400..588, bottom corners r 16, top corners square, fill creamDeep, no outline except the **ground line** y 400, x 12..348, teal 3 px; 9 pebbles ellipse rx 5 ry 3.5 fill grid at (40,420) (96,560) (150,582) (214,578) (270,560) (320,428) (330,520) (32,520) (266,424), each ≥ 8 units from any root (asserted) |
| stem | tapered filled path (limbPath) along cubic (180,400) C (172,300) (188,180) (180,68); width 12 at y 400 → 7 at y 68 |
| nodes | y 360 (R-low leaf), 318 (L-low leaf), 205 (L-top leaf), 150 (R fruit branch) |
| leaf L-low | base (174,318), angle 200°, L 96, W 44 → anchor (129,302), tip (84,285) |
| leaf R-low | base (184,360), angle −10°, L 84, W 38 → anchor (225,353) |
| leaf L-top | base (175,205), angle 205°, L 76, W 34 → anchor (141,189) |
| flower | centre (180,52), r 40 (petals y 12..92, x 140..220); 2 sepals tealSoft, pointed, L 18 W 10, from (180,90) at 120° and 60° |
| fruit branch | pedicel (limbPath w 5) (180,150) Q (240,140) (266,170); calyx 5-point star r 10 at (268,172), tealSoft |
| fruit | ellipse (268,198) rx 22 ry 26, coralSoft (spans y 172..224) |
| magnifier | connector: dashed teal 1.5 (dash 4 4) (270,224) → (290,252); lens circle (300,290) r 40, white fill, teal 3; handle limbPath (328,318) → (346,338) w 9 teal fill (the handle ends 62 units above the ground line) |
| fruit in section | inside the lens: ellipse (300,290) rx 22 ry 28 coralSoft; flesh ellipse rx 16 ry 22 cream; placenta line (300,268)→(300,312) 1.5; 6 seeds (teardrop, rx 5 ry 3.5, cream, teal 1.5) at (300,272) (291,284) (309,284) (291,300) (309,300) (300,312) |
| roots | taproot limbPath (180,400) → (176,560), w 10 → 3, fill cream; laterals (w 5 → 2): y 424 → (120,452) & (238,448); y 462 → (106,500) & (250,494); y 500 → (132,540) & (222,536); each lateral carries two root hairs 1.5 px, 10 units long |
| **anchors (ids)** | `flower` (180,52) · `stem` (179,258) · `leaf` L-low (129,302) / R-low (225,353) · `fruit` (268,198) · `seed` (309,300) · `root` (178,470) · (d3-reserved, not shipped) `sepal` (158,96) `petal` (180,24) `branch` (230,146) |
| **regions** (`<g data-lcs-region>`) | soil, root, stem, leaf-Llow, leaf-Rlow, leaf-Ltop, flower, fruit, magnifier, seed |
| obstacles | capsule/ellipse list per region (body-figure shape), so the leader sweep can reject a leader crossing a foreign part (the magnifier handle + lens count as `seed` region) |
| rings | `rings:[partId]` draws coral r 7 px stroke 3 at the anchor, `data-lcs-anchor` |
| markers | `markers:[{id,n}]`: coral disc r 13 px + white Baloo 2 700 16 numeral (body-figure spec), centres ≥ 30 px apart (asserted) |

Minimum drawn sizes at h 498 (scale 0.83; asserted by a render-measuring `qa/verify-plant-figure.js`, the body-figure/tangram pattern): fruit 36.5×43 px, flower 66 px, leaf L-low blade 80×37 px, magnifier lens 66 px, single seed 8.3×5.8 px (the seed is a DETAIL inside the 66 px lens, the ring encloses it), soil window 279×156 px, taproot 8 → 2.5 px.

(b) **`plantStage({stage, w=124, potted=false, id})`**. viewBox **0 0 200 240**; h = w·1.2. Stages: `seed`, `sprout`, `seedling`, `young`, `flowering`, `fruiting`, `wilted`. Ground line y 150, x 8..192; soil rect y 150..232, bottom r 14, creamDeep; 4 pebbles (grid) at (30,170) (170,176) (44,222) (160,220). Same leaf and petal shapes as (a).
| stage | drawing |
|---|---|
| seed | seed oval rx 26 ry 17 at (100,190), rotated −12°, cream, hilum arc 1.5 px; nothing above ground |
| sprout | same seed at (100,196) with a V split in the coat; radicle limbPath (92,206) → (86,230) w 6 → 2; shoot hook (104,184) → (106,152) then arc to (98,138): the hook just breaks the ground |
| seedling | no seed coat; stem (100,150) → (100,92) w 6; two cotyledons (smooth ovals rx 20 ry 11, tealSoft) at (80,88) −25° and (120,88) +25°; taproot to (100,214) + 2 laterals |
| young | stem to (100,40) w 7 → 5; cotyledons shrunk rx 12 ry 7 at (84,120)/(116,120); true leaves (pointed ovate, veined) at node y 96: L 44 W 20 angles 205°/−25°; at node y 60: L 32 W 15; taproot to (100,226) + 3 pairs of laterals |
| flowering | young + flower at (100,30) r 20 + 2 sepals |
| fruiting | young; apex carries a dry calyx (no petals); fruit branch from node y 70 to fruit ellipse (140,100) rx 13 ry 16 coralSoft with calyx star r 6 |
| wilted | young leaves with the stem bent: (100,150) → (104,96) → arc to (142,86) → tip (150,106); every leaf rotated so its tip points DOWN (angles 110°/70°); no flower |
| potted | replaces the soil window: rim rect (42,140) 116×16 r 4, pot trapezoid (48,156)-(152,156)-(138,232)-(62,232), creamDeep, teal 3; soil top ellipse (100,150) rx 50 ry 6; roots NOT drawn |
At w 124 (scale 0.62): seed 32×21 px, cotyledon 25×14 px, flower 25 px, fruit 16×20 px. Stage anchors `{seed, root, stem, leaf, flower, fruit}` returned in px for the eat/needs faces' verify.

(c) **`flowerDiagram({h=420, rings=[], markers=[]})`**: the classic half-flower (two front petals removed). viewBox **0 0 400 500**; width = h·0.8.
| part | geometry |
|---|---|
| stalk | limbPath (200,500) → (200,330), w 14, tealSoft |
| receptacle | ellipse (200,322) rx 30 ry 14, tealSoft |
| sepals (2) | leaf shape from (178,320) angle 150° L 70 W 24 and from (222,320) angle 30° (tips curl down-out to ~(120,356)/(280,356)), tealSoft |
| back petals (3) | coralSoft: left from (186,312) angle 235° L 170 W 110 (tip ~(88,172)); centre from (200,300) angle 270° L 250 W 120 (tip (200,50)), drawn BEHIND the pistil; right mirrored |
| ovary | ellipse (200,286) rx 24 ry 32, cream |
| style + stigma | style limbPath (200,254) → (200,154) w 8, cream; stigma three-lobed knob r 12 at (200,142), creamDeep |
| stamens (4) | filaments 2 px teal curves (184,300)→(150,190), (192,300)→(172,168), (208,300)→(228,168), (216,300)→(250,190); anthers ellipse rx 9 ry 13 at the tips, creamDeep, 3 pollen dots each (grid) |
| anchors | `petal` (110,190) on the left petal · `sepal` (140,346) · `stamen` (150,190) on an anther · `pistil` (200,205) on the style · `ovary` (200,290) (d3) · `stalk` (200,430) |
Min sizes at h 420 (scale 0.84): anther 15×22 px, stigma 20 px, sepal 59×20 px.

(d) **`partIcon({part, w=48, emphasis=true})`**: one tiny whole plant, viewBox **0 0 60 90**, ground line y 58, soil y 58..86. Stem (30,58)→(30,14); leaf left at node 40 (L 18 W 9, 205°); leaf right at node 30 (L 16, −25°); flower centre (30,11) r 9; fruit (45,34) rx 5 ry 6 on a branch from node 26; root clump: taproot (30,58)→(30,80) + 2 laterals. With `emphasis:part`, THAT part is filled **solid teal** and every other part is drawn as a **grid 1.5 px outline with no fill** (the ghost). At w 48 (scale 0.8) each emphasised part's smaller dimension ≥ 8 px (asserted); the contrast solid-teal vs grid outline survives greyscale.

(e) **`needGlyph({kind:'sun'|'water', absent=false, w=60})`**: viewBox 0 0 144 144. Sun = water-cycle geometry (disc (72,72) r 30 coral, 8 rays 38 → 54, stroke 4). Water = drop path `M72,18 C72,18 30,70 30,94 A42,42 0 0 0 114,94 C114,70 72,18 72,18 Z` tealSoft, teal 3. `absent:true` overlays the "no" sign: circle (72,72) r 64 stroke **ink** 8 + slash (27,27)→(117,117) ink 8 (ink not coral, so the sign stays the darkest mark in greyscale).

**NEW `templates/components-b5/plants.js`** (behind the `components-b5.js` barrel): `plantLabelStage({targets, mirror, figureH, laneW, laneH, glyphH, w, h, gapX})` (clone of `bodyLabelStage` over `plantDiagram`), `plantLeaderSweep` (if needed, see above), `cycleRing({stages, slotW, slotH, radius, cx, cy})`, `cutStrip({stages, cardW, cardH, gap})`, `eatRow({src, parts, answer, iconW})`, `jobCard({text, w, h})`, `needCard({sun, water, answerFirst})`, `flowerLabelStage(...)`.

## 6 Locale slot structure

- **Bank words** = `partWords[id]` whole literals per locale from `data/b5/locales/plants.<loc>.json` (none of these nouns is reliably in the vocab: `root`, `seed`, `stem` have no picture key, `_selection-seo-germanic.md`; the panel authors all). Singular, citation form, lowercase except de (nouns capitalised). Traps the slots are built for: de **Stängel** (never Stamm, never Stengel) · pt **fruto** (never fruta) and **caule** · it one of fusto/stelo, the panel rules · es-MX raíz tallo hoja flor fruto semilla · fr racine tige feuille fleur fruit graine · nl wortel stengel blad bloem vrucht zaad (optional `de`/`het` article literal → 2-row bank) · sv rot stjälk blad blomma frukt frö · da rod stængel blad blomst frugt frø · no rot stilk blad blomst frukt frø · fi juuri varsi lehti kukka hedelmä siemen. **Never a definite form** (sv "roten", da "roden").
- Surfaces: bank chips Nunito 800 18 · job sentences Nunito 700 17 · lanes handwriting (nothing printed on them) · slot numerals Baloo 2 700 22 · no text inside any primitive (the plant carries rings/markers only). Font floor on the page: 17 px text, 16 px marker numerals.
- **Longest-locale reserve +40 %:** lane 174 px for the longest part word; de "Blütenblatt"/"Staubblatt"/"Fruchtknoten" on the flower face get 150-px lanes at glyphH 28 *est.* (§7 f). Job cards reserve 3 lines at the de/fi length.
- Title/instruction are chrome (not mine); the design only requires the instruction to name apparatus that is on the page: "bank", "line", "part of the plant" (base); "pictures", "circle" (cycle); "plant", "circle" (needs).

## 7 Five variation faces

**b. Plant Life Cycle: cut and glue around the circle (G1, CODE `layout:'cycle'`; ids G1-381+ TBD).** DELTA: no diagram, no lanes. The top of the body is a **cycle ring**: five dashed coral slots (124×150, the exact card size) on a circle of radius 160 centred (337, 250) at angles −90° −18° 54° 126° 198° (slot centres (337,90) (489,201) (431,379) (243,379) (185,201); edges 15..454 high, 123..551 wide, m arithmetic), joined by five curved teal arrows (3 px, SVG arrowheads) running clockwise. **Slot 1 (top) is pre-filled with the `seed` stage and a small teal "1"**: a cycle has no first element, so fixing the seed makes the order unique. Below, a dashed cut line with `scissorsGlyph`, then a strip of the other four stage cards (`sprout seedling flowering fruiting`, `plantStage w 124`) in shuffled order, 4·124 + 3·24 = 568 wide. Heights: ring 460 + 16 + strip (cut line 20 + cards 150 + 12) 182 = **658 ≤ 677** (m arithmetic). Verify: the four strip cards stamp `data-lcs-stage`; the slot order clockwise = seed, sprout, seedling, flowering, fruiting; strip order ≠ that order; every card size = slot size ±0. d1 = 4 slots (no sprout), d3 = 6 (+`young`, hexagon ring). Query face: "plant life cycle" / "ciclo de vida de las plantas" / "ciclo vitale della pianta" / "von der Bohne zur Pflanze" / "från frö till växt" / "fra frø til plante" (titled by the PLANT, never "life cycles" alone: fence against G1-203 and G1-377).

**c. Which Part Do We Eat? (G1, CODE `layout:'eat'`; id G1-38x TBD).** DELTA: library pictures + **language-free part icons**. Six rows (`eatRow`), each: an OPENED vegetable picture 88 px, a gap 24, then five `partIcon` chips (48×72 icon inside a 60×84 white chip, r 10, teal 1.5) for root / stem / leaf / flower / fruit in a FIXED order across all rows; the child circles the icon whose dark part we eat. Row = 88 + 24 + 5·60 + 4·12 = 460 wide, centred in 639; row height 96, 6·96 + 5·16 = **656 ≤ 677**. Item pool (opened; one textbook-unambiguous part each): root **carrot radish beetroot parsnip** · leaf **lettuce spinach cabbage** · flower **broccoli cauliflower** · stem **celery** · fruit **tomato cucumber bell_pepper pumpkin eggplant chilli_pepper squash**. Composer: 6 items covering ≥ 4 different parts, at most 2 per part, stem (1 picture) optional. Excluded (see §5 NOT used): potato onion leek garlic mushroom turnip corn green_beans asparagus. No seed column (no honest seed picture exists). Verify: each row's answer part ∈ the item's pool part; ≥ 4 distinct parts. Query face: "which part of the plant do we eat" / "welche Teile der Pflanze essen wir" / "eetbare delen van een plant". nl note: "wortel" = root AND carrot; the carrot row is fine (the icon, not a word, is the answer) and the landing may use it.

**d. Parts of a Plant and Their Functions (G2, CODE `layout:'jobs'`; id G2-360+ TBD).** DELTA: numbered MARKERS instead of rings, and sentences instead of a bank. Left: `plantDiagram({h:520, inset:false, markers})` (w 312) with five coral markers 1-5 on root / stem / leaf / flower / fruit, numbers shuffled. Right column 339 wide (312 + 24 + 339 = **675**): five `jobCard`s 339×96, each a `blankNumeralBox` 56×48 + a job sentence (Nunito 700 17, ≤ 3 lines). 5·96 + 4·14 = 536 inside the 580 stage; body 580 ≤ 677. Job ids (panel authors each as ONE literal, single-answer by construction, no two jobs fitting one part): `absorb` (root: takes up water from the soil), `carry` (stem: carries water up to the leaves), `food` (leaf: makes food from sunlight), `seeds` (flower: makes the seeds), `protect` (fruit: holds and keeps the seeds safe). ⚠ "holds the plant in the ground" is NEVER a second root job and "holds the plant up" is never a stem job on the same page (two parts would fit). Verify: marker numbers are a permutation; each box's answer = the marker on that job's part. Query face: "parts of a plant and their functions" / "partes de la planta y sus funciones" / "e suas funções" / "kasvin osat ja niiden tehtävät".

**e. What Do Plants Need? (K, CODE `layout:'needs'`; id K-371+ TBD).** DELTA: a prediction grid, pots, no words at all. Four `needCard`s in a 2×2 grid (316×320 each, gap 7 → 639 wide; rows `minmax(320px,1fr)`: 2·320 + 16 = **656 ≤ 677**). Card: top row = sun glyph 60 | potted `seedling` 90 w | water glyph 60, each glyph present or crossed (`absent`); a teal down-chevron 24; two answer chips 130×136 side by side (white, teal 1.5, r 12): potted `flowering` (grows) and potted `wilted` (does not grow), order randomised per card. The child circles the plant it will become. Pool = the four combinations {sun,water}² exactly once each (only sun + water → flowering). **Soil and air are never a variable** (the pedagogy ruling: contested, K-LS1-1 names water and light). Verify: answer = flowering iff both present; the four cards cover the four combinations; chip order not constant across the 4 cards. Query face: "what do plants need to grow" / "was brauchen Pflanzen zum Wachsen" / "wat heeft een plant nodig" / "vad behöver växten".

**f. Parts of a Flower (G2, CODE `layout:'flower'`; id G2-36x TBD).** DELTA: the half-flower primitive replaces the plant; different part set. `flowerDiagram({h:420})` (w 336) with rings on `petal sepal stamen pistil stalk` (5); lanes 3 left (petal, sepal, stalk) + 2 right (stamen, pistil), 160 wide: 160 + 9.5 + 336 + 9.5 + 160 = **675**. Lane `writingRow({w:154, h:52, glyphH:28})` (G2 floor 24). Bank 59 + 10 + stage 560 = **629 ≤ 677**. Words: de Blütenblatt Kelchblatt Staubblatt Stempel Stiel · fi terälehti verholehti hede emi varsi · sv kronblad foderblad ståndare pistill stjälk · fr pétale sépale étamine pistil tige. ⚠ "pistil" in fr/sv/en is the one-word target; de uses "Stempel" (the panel confirms). Verify: as base. Query face: "parts of a flower" / "blommans delar" / "kukan osat" / "Aufbau der Blüte". Band honesty: flower anatomy is Klasse 3-4 in de, classe terza in it, CE2 in fr; those landings say so (brief CCSS rule); sv åk 1-3 and fi 1-2 lk carry it inside the band.

**Hub contract (all six).** `apps.plants` + `axes['exercise-type'].plants` slug/name ×11 (heads never the bare theme words `flowers`/`tree`: "Parts of a Plant", "Teile der Pflanze", "Växtens delar", "Kasvin osat"), exactly one landing per face per locale with `coordinate.type:'plants'`, `coordinate.theme:''` for base/b/d/e/f and `''` for c as well (the eat face draws from a picture index, not a theme axis: `themeAxis.applicable:false`), level key from the band table, `coordinate.mode` = the face's mode string (`base`, `cycle`, `eat`, `jobs`, `needs`, `flower`), committed + deployed; gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale minus recorded refusals (none designed).

**Why these five.** Each owns a separate harvested query and a separate MOVE: sequence (b), classify-by-part (c), function (d), predict (e), a second structure (f); all five are CODE faces because each has a different apparatus, so none can collapse into the base's resolved config. Demand order (en/es/pt/it/fr strings): life cycle > functions > flower > needs > eat. **First to cut: c (eat)**, the thinnest harvest outside de/nl and the only face that depends on library pictures; its replacement would be a "grow a bean" observation diary (open, no verify).

## 8 Two alternatives + recommendation

1. **The classic potted tulip with leader lines** (a tulip in a flowerpot, labels flower/stem/leaf/roots inside the pot). Rejected: a pot hides the roots or shows them through ceramic (botanically and visually false), a tulip is a bulb (monocot, no taproot, no fruit), and it is the clip-art page every SERP owner already has.
2. **Cut-and-glue labels onto a large plant** (word cards at the bottom to cut and paste on the diagram). Rejected for the base: the base must be pencil-first and printable in one pass; cut-and-glue is spent ONCE, where it earns most, on the cycle face (b), which is also the en "plant life cycle cut and paste" query.

Chosen: the soil window + magnifier. It is the only concept of the three that can show all six 1-LS1-1/EF02CI06 parts honestly on one drawing (roots underground, seeds inside the fruit), and the same ground line + soil band makes the five faces read as one family.

## 9 Risks, mitigations, print check

- **Crowding on the diagram:** the right side carries fruit, magnifier and one low leaf; the geometry above keeps ≥ 20 units between leaf R-low and the lens (asserted by `verify-plant-figure.js`: every pair of foreign regions ≥ 8 units apart) and the leader sweep is re-run per seed and per `mirror`.
- **Handwriting width:** 174 px lane at glyphH 32 holds ~ 9 child letters *est.*; the longest d2 word is 7-8 letters (de "Stängel", pt "semente"); fi "hedelmä" 7. On the flower face de "Blütenblatt" (11) at 154 px / glyphH 28 is the tightest case: if the engineer measures it short, de moves the flower face lanes to one side (5 right lanes 220 wide, figure left-aligned), which is a layout option, not a refusal.
- **Greyscale:** coral rings print mid-grey, teal outlines near-black, all fills near-white; the part a child must find is always bounded by a 3 px outline. The eat icons rely on solid teal vs grid outline (strongest contrast on the palette). The "no" sign is ink, not coral.
- **Cut lines (b):** strip cards on a dashed `grid` cut frame (`cutLines`), 24 px gutters so a K-1 child cuts one card without clipping the next; slots are the same 124×150 so a card glues flat.
- **9 px floor:** no text inside any primitive; smallest text is the 16 px marker numeral.
- **Lint catches:** overflow, footer intrusion, palette, font floor, blank page (`data-ws-content` on each stage). **Only a human eye catches:** whether the wilted plant reads as "sad", whether the sprout's hook reads as a shoot not a worm, whether the magnifier reads as "inside the fruit". The first render must be read at 100 % and printed once in B&W.
- **Locale traps:** pt fruto/fruta; de Stängel; nl wortel = carrot; sv/da/no never definite; it fusto vs stelo; es-MX regional words only in the eat face alt text (the icons carry the answer).

## 10 Summary

1. Base = one botanically honest plant in a SOIL WINDOW (roots underground) with a MAGNIFIER showing seeds inside its fruit; six rings, six lanes, a bank; 649 px of 722.
2. New `primitives/plant-figure.js`: `plantDiagram` (360×600), `plantStage` (200×240, 7 stages + pot), `flowerDiagram` (400×500 half-flower), `partIcon` (60×90 ghost/emphasis), `needGlyph` (sun/water ± "no" sign).
3. Faces: cycle cut-and-glue ring with the seed fixed in slot 1 (G1) · which part we eat via language-free part icons (G1) · functions with numbered markers (G2) · needs as a wordless prediction grid (K) · half-flower labelling (G2).
4. Coral never inside the plant; 3 px teal outlines everywhere so the page survives a B&W printer.
5. First to cut: the eat face; soil and air are never a discriminator; corn, potato, beans, asparagus, turnip are excluded after opening.
