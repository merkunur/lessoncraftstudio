# K-405 `maze-puzzles` DESIGNER A: SCENES (2026-10-11)

Twenty original scenes, one per face of `_PANEL-FINDINGS.md`. Every `theme/noun` below was OPENED on its contact sheet (`%TEMP%\hm\sheets\*.png`) this session; B&W names (face 20) come from `scripts/worksheet-gen/data/fdx/catalog.js` rows that are not `X` and carry no `noword` flag. Family key per THE LOCK is `maze-puzzles` (the brief's `scene-mazes` is superseded).

## 0. Ground rules this file obeys

### 0.1 Style families, read on the sheets
| id | family | themes (as read) | look |
|---|---|---|---|
| **CR** | rosy critters | farm animals, forest creatures, animals, zoo animals, pets, insects and bugs, dinosaurs, reptiles and Amphibians, ocean life (except tuna/shark/orca/whale, semi-real), spring (critters), birds, birds 2 | soft flat vector, big eyes, pink cheeks, no outline |
| **FN** | flat painterly nature + food | fruits, vegetables, flowers, tree, bakery, desserts and sweets, breakfast, At the Supermarket (food), spring/summer/beach/camping/winter OBJECTS | flat fills with soft shading, no faces, no outline |
| **FO** | flat semi-real machines + house objects | vehicles, Things That Fly (machines), around the house, space | flat saturated, darker, no faces |
| **BW** | line art | `data/fdx/catalog.js` | black line, colourable |

**Mix rule (measured on the sheets, not assumed):** the library itself mixes CR characters with FN nature objects inside one theme (`camping` = camping/bear + camping/tent; `spring` = spring/bunny + spring/watering_can; `beach` = beach/crab + beach/bucket). So a scene = ONE character family (CR or FO) + FN nature/food props. Forbidden: CR characters next to FO house objects or FO machines in the same scene (the brief's sofa-next-to-bear collage), except where a single FO machine IS the hero and no CR critter appears (faces 6, 11, 14, 15, 19). Each scene below names its family.

**Refused on sight (do not use anywhere):** any picture with English text baked in (`post office/post_office` "post office", `post office/truck` "post", `vehicles/police_car` "Police", `vehicles/taxi` "TAXI", `vehicles/school_bus` sign, `At the Supermarket/salt` "SALT", `vehicles/mail_truck` logo); religious items (`christmas/church`, `christmas/nativity`, `easter/cross`, `christmas/angel`); boxed-background squares (`space/galaxy`, `space/sun`); `tree/fir` (it is a decorated Christmas tree); `beach/lifeguard`, `toys/baby*`, any person (none needed).

### 0.2 Drawn scenery (engine, `lib/fdx-scenery.js` shapes + colour fills)
Flat fills, NO black outline; every shape gets a 2-3 px edge in a darker tone of its own hue (the "edge" hex below). Allowed shapes only: sky bands, hills, ground bands, water, soil strata, chambers, roads, lane markings, rails + sleepers, lily-free stepping stones, discs, hex cells, a dock, a fence rail, a doorway arch, paddock circles, clouds, snow drifts. Nothing else is drawn.

### 0.3 Corridor paint (applies to every face)
Two-stroke engine (outline W+7 under fill W). "corridor fill / edge" below = fill stroke / outline stroke. Every corridor fill has luminance ≥ 88 % (light, pencil-friendly, greyscale-safe); every background ≤ 85 % so the corridor separates in greyscale by ≥ 10 points (engineer measures with `qa/b7-page-use.js`-style raster read; UNKNOWN until measured). Corridor W is Designer B's call; scene art assumes W 40-48 px at d2 (34 on face 3, 64 on face 2).

### 0.4 Scene frame
Scene = one rounded rect 675 × ~640 px (Designer C sets the exact height inside 620-740), radius 18, its background painted edge to edge. Start hero sits OUTSIDE the maze at its entry mouth (overlapping the frame by up to 40 %), goal at the exit mouth. Supporting drawings sit only on islands with clearance ≥ 8 px from any corridor outline; size 44-80 px (K floor 56 for anything the child must recognise).

---

## 1. BASE K-405: the hedgehog and the apple tree (autumn orchard)
- **Setting:** an autumn orchard on a gentle hill at golden hour.
- **Start hero:** `forest creatures/hedgehog`, bottom-left mouth, facing right, h 96 px.
- **Goal:** `tree/apple`, top-right mouth, h 150 px, trunk base on the hill line.
- **Supporting (8, islands):** `forest creatures/mouse`, `forest creatures/ladybug`, `forest creatures/snail`, `forest creatures/butterfly`, `flowers/buttercup`, `flowers/dandelion`, `vegetables/mushroom`, `tree/birch` (small, 90 px, top-left behind the hill line).
- **Drawn structure:** sky band top 18 % `#DDEEF5` (edge none); far hill `#C9D98F` edge `#AFC174`; orchard ground (maze field) `#E6D49A` edge `#C9B474`; 6-10 fallen-leaf dots on islands `#E69A4A` / `#D9773A` (8-12 px ellipses).
- **Corridor:** straw path, fill `#FFF5DC`, edge `#D7B977`.
- **Family:** CR + FN. **Mood:** warm, cosy, "going home with an apple".
- **Why a 6-year-old loves it:** a tiny hedgehog, a big red-dotted tree, little garden creatures to spot; obvious why he walks (apples).

## 2. Face 2 (PreK) my first maze: the puppy and the ball (spring park)
- **Setting:** a spring park with blossom, one very wide road.
- **Start:** `pets/dog`, left-middle mouth, h 100. **Goal:** `toys/ball`, right mouth, h 70, on a drawn grass mound.
- **Supporting (6, large islands only):** `pets/cat`, `pets/rabbit`, `spring/butterfly`, `spring/bird`, `tree/cherry` (130 px), `flowers/tulip` ×2.
- **Drawn:** sky `#E4F3FB`; lawn `#C8E6A0` edge `#A6CB7A`; 2 round flower beds `#F7C9D6` edge `#E39BB1` on islands.
- **Corridor:** wide sand path, fill `#FBEFD0`, edge `#D9BE84`, W 64.
- **Family:** CR (+ toys/ball and FN flowers/tree as props; toys/ball has no face, reads as FN).
- **Mood:** bright, gentle. **Why:** puppies and balls are the first story a 4-year-old tells; huge road, nothing scary.

## 3. Face 3 (G1) big picture maze: the orangutan and the banana tree (jungle)
- **Setting:** rainforest floor under a canopy, many branches.
- **Start:** `zoo animals/orangutan`, bottom-left, h 90. **Goal:** `tree/banana`, top-right, h 140.
- **Supporting (10, small islands, 44-60 px):** `birds/toucan`, `birds/macaw`, `zoo animals/sloth`, `reptiles and Amphibians/chameleon`, `zoo animals/gorilla`, `insects and bugs/butterfly`, `flowers/hibiscus`, `flowers/orchid`, `tree/palm` (top-left), `forest creatures/frog`.
- **Drawn:** canopy band top 14 % `#4F8F55` edge `#3E7745` with rounded leaf scallops; jungle floor `#6FAF66` edge `#5A9654`; 4-6 dark leaf ovals `#5A9654` as island texture.
- **Corridor:** leaf-litter trail, fill `#EEF6DD`, edge `#7FAE5E`, W 34.
- **Family:** CR + FN. **Mood:** adventurous, busy, rich.
- **Why:** a big ape, two parrots, a sloth hanging around: a page worth getting lost in.
- **Ink flag:** darkest scene; background luminance ~45 %; Designer C confirms greyscale contrast or lifts floor to `#86BE77`.

## 4. Face 4 (K) river maze: the toy boat and the teddy bear (garden stream)
- **Setting:** a winding garden stream; the corridors ARE water; the islands are grassy banks.
- **Start:** `toys/boat`, top-left water mouth, h 80. **Goal:** `toys/teddy_bear` sitting on a drawn wooden dock, bottom-right, h 90.
- **Supporting (7, on banks):** `forest creatures/frog`, `forest creatures/dragonfly`, `animals/duck`, `animals/swan`, `forest creatures/turtle`, `flowers/water_lily` (on a bank edge touching water), `tree/elm`.
- **Drawn:** banks `#A9D27E` edge `#8DBA62`; reed tufts (3 thin rounded blades) `#7FAF57`; dock = 3 planks `#D9A86A` edge `#B5854A` + 2 posts `#B5854A`, 120 × 46 px.
- **Corridor:** water channel, fill `#D3EEF8`, edge `#73B7D3`; 3-5 short wave ticks `#A9D8EA` inside straight runs (never at junctions).
- **Family:** CR + toys (boat, teddy: same soft toy family on the toys sheet).
- **Mood:** calm, sunny afternoon. **Why:** a lost toy boat finding its teddy owner; water feels different from roads.

## 5. Face 5 (G1) burrow maze: the little ant finds its family (ant colony underground)
- **Setting:** cross-section: a narrow grassy surface strip, then soil strata with round chambers.
- **Start:** `forest creatures/ant`, on the surface top-left by the nest hole, h 64. **Goal:** `insects and bugs/ant` in the deepest chamber, bottom-right, h 64 (a second, differently coloured ant: two sheets, two looks).
- **Supporting (8):** surface: `flowers/dandelion`, `forest creatures/ladybug`, `vegetables/carrot` and `vegetables/radish` each placed straddling the surface line, root in the soil, leaves above (nothing masked). Chambers (dead-end rooms): `insects and bugs/worm`, `insects and bugs/centipede`, `Things That Fly/beetle`, `forest creatures/spider`, `fruits/raspberry` (the ants' store, in the goal chamber beside the goal ant).
- **Drawn:** sky strip 10 % `#E2F1F6`; grass line `#9CCB6E` edge `#7FAF57`; soil strata top `#C99A6B`, mid `#B88559`, deep `#A47149`, edges one tone darker; 5 round chambers (dead ends) `#E9CBA6` edge `#C79E72`; 10-14 pebble ovals `#D8B48C`.
- **Corridor:** tunnel, fill `#F4E1C6`, edge `#B9895B`.
- **Family:** CR + FN. **Mood:** secret, curious. **Why:** "under the ground" is magic at 6; every dead end is a room with a bug in it.

## 6. Face 6 (G1) town maze: the tow truck and the little green car
- **Setting:** a small town seen at a three-quarter top view, streets on a grid of lawns.
- **Start:** `vehicles/tow_truck`, left street mouth, h 70. **Goal:** `vehicles/car` (the green car) parked at the right street mouth, h 60.
- **Supporting (8, one per lawn block):** `around the house/garage`, `winter/cabin`, `camping/cabin`, `around the house/gate`, `around the house/mailbox`, `around the house/fence`, `tree/poplar`, `tree/oak`; plus `vehicles/bicycle` and `vehicles/scooter` parked on a lawn.
- **Drawn:** lawn blocks `#BFDB98` edge `#9EC277` (rounded rect islands, radius 12); pavement rim 4 px `#EDE6D8` around each block.
- **Corridor:** asphalt street, fill `#E4E2DE`, edge `#A9A49C`; a dashed centre line `#FFFFFF` 3 px, 10 on / 8 off, only on runs ≥ 60 px.
- **Family:** FO (vehicles + house objects), no critters.
- **Mood:** busy, helpful. **Why:** tow trucks rescue cars: a job with a reason; real-looking streets with turns.
- **Note:** this is NOT the street-lattice watercolour sample (fire truck → fire); hero, goal, story differ.

## 7. Face 7 (K) babies to mothers: the farm hayfield
- **Setting:** a summer hayfield; mothers wait in round mown paddocks along the bottom; babies stand along the top.
- **Starts (d2 = 3, d3 = 4, d1 = 2):** `farm animals/chick`, `farm animals/calf`, `farm animals/lamb`, d3 adds `farm animals/foal` (or `farm animals/duckling`).
- **Goals (mothers, same order shuffled):** `farm animals/hen`, `farm animals/cow`, `farm animals/sheep`, d3 adds `farm animals/horse` (or `farm animals/duck`).
- **Pairs verified on the sheet:** chick↔hen, calf↔cow, lamb↔sheep, foal↔horse, duckling↔duck. (Not used: `farm animals/chicken` reads as hen too: never both on one page; `farm animals/goat` has no kid.)
- **Supporting (4, field islands):** `flowers/cornflower`, `flowers/buttercup`, `insects and bugs/butterfly`, `farm animals/bee`.
- **Drawn:** field `#EED58A` edge `#D6BB66` (tall-grass stroke texture: 3-px vertical ticks `#DFC273`, sparse); paddock discs Ø 120 `#D7EBAE` edge `#A9C979` behind each mother; a fence rail band along the top `#D9B07C` edge `#B38A58`.
- **Corridor:** mown lane, fill `#F3F8E4`, edge `#A9C979`.
- **Family:** CR (farm animals sheet only) + FN flowers.
- **Mood:** tender. **Why:** every child wants the baby back with mummy; same-species pairs are instantly recognisable.

## 8. Face 8 (G1) tangled lines: whose kite is whose (windy hilltop)
- **Setting:** a windy hilltop; three friends at the bottom hold strings that tangle up into the sky to three kites.
- **Starts (string ends, bottom):** `forest creatures/rabbit`, `forest creatures/fox`, `forest creatures/raccoon`; d3 adds `forest creatures/squirrel`.
- **Goals (top, one per string):** `spring/kite` (red/yellow), `beach/kite` (navy/red), `Things That Fly/kite` (blue/yellow); d3 adds `Things That Fly/balloon` (red balloon on a string: distinct shape, so no two goals look alike; `toys/kite` and `summer/kite` REFUSED as too close to spring/beach kites).
- **Supporting (sky + hilltop, 5):** `weather/cloud`, `Things That Fly/bird`, `weather/sun`, `flowers/clover` ×2 (hilltop).
- **Drawn:** sky `#CFE6F5` edge none, cloud blobs `#FFFFFF` edge `#D7E7F1`; hill `#9FCF7C` edge `#82B65F` bottom 22 %.
- **Corridor (strings):** narrow ribbon lines, fill `#FFFDF6`, edge `#8E8A84`, W 14-16; crossings drawn over/under (alternate, so a crossing is never a junction). Each string ends in a small knot dot at the kite's tail.
- **Family:** CR (forest creatures) + FN objects (kites).
- **Mood:** breezy, playful. **Why:** "which kite is mine?" is a real worry on a windy day; tracing a string through knots is the game.

## 9. Face 9 (G1) collect on the way: the rabbit's vegetable garden
- **Setting:** a vegetable garden of raised beds; the maze lanes run between the beds.
- **Start:** `farm animals/rabbit`, bottom-left, h 84. **Goal:** `summer/bucket` (yellow), top-right, h 70.
- **Items to collect (on corridor nodes, d2 = 4, d1 = 2, d3 = 6):** `vegetables/carrot`, `vegetables/radish`, `vegetables/lettuce`, `vegetables/green_beans`, d3 adds `vegetables/tomato`, `vegetables/cauliflower`. Items sit IN the corridor (Designer B: on the solution route only, or 1 on a branch the route must enter and leave).
- **Supporting (5, bed islands):** `spring/watering_can`, `spring/garden`, `vegetables/pumpkin`, `forest creatures/snail`, `insects and bugs/caterpillar`.
- **Drawn:** beds = rounded rect islands `#9C6E4A` edge `#7E5636` with 2-3 rows of sprout dots `#8CC063`; between them grass `#CFE5A8`.
- **Corridor:** stone garden path, fill `#F1EEE6`, edge `#B5AD9C`; 4-6 paving-joint ticks `#D9D3C5`.
- **Family:** CR + FN. **Mood:** busy, satisfying. **Why:** a shopping list the child can see; rabbit + carrots is the classic pairing, now with a job.

## 10. Face 10 (G1) avoid the obstacles: the polar bear crossing the sea ice
- **Setting:** Arctic sea ice under a pale sky; the trail is packed snow; sleeping walruses and thin-ice holes block some lanes.
- **Start:** `winter/polar_bear`, left mouth, h 84. **Goal:** `winter/igloo`, right mouth, h 100.
- **Obstacles to avoid (on corridor, d2 = 4):** `winter/walrus` ×2 (sleeping, blocking a lane) + drawn thin-ice holes ×2 (dark water ovals `#5E9FC0` edge `#467F9F`, 48 × 28, ON a corridor). Legend shows one walrus + one hole.
- **Supporting (5):** `winter/seal`, `winter/snowflake` ×2 (sky), `winter/icicle` (on an ice ridge), `winter/ice`. Not used: `winter/penguin` (wrong pole beside a polar bear), `winter/snowman` (person-like).
- **Drawn:** sky `#E9F3F9`; ice field `#CFE3EF` edge `#AFCBDD`; snow drifts (soft humps) `#F4F9FC` edge `#C9DCE8`.
- **Corridor:** packed-snow trail, fill `#FFFFFF`, edge `#8FB3CB`.
- **Family:** winter sheet (flat FN-style animals + objects; one family on its own sheet).
- **Mood:** crisp, gently tense. **Why:** "don't wake the walrus!" is a giggle and a rule; the bear wants to get home.
- **Ink:** lightest scene; corridor-vs-field separation is the edge stroke; Designer C confirms greyscale.

## 11. Face 11 (K) ABC maze, capitals A→Z: the rocket to the moon
- **Setting:** night sky with planets; letters ride a star-dust trail.
- **Start:** `vehicles/rocket`, bottom-left, h 90, tilted 30°. **Goal:** `space/moon`, top-right, h 110.
- **Supporting (6, islands):** `space/saturn`, `space/planet`, `space/earth`, `space/satellite`, `space/comet`, `space/asteroid`. Drawn small stars (5-point, 6-10 px) `#FFE9A8` sparse.
- **Drawn:** sky `#3E4C86` → `#5A68A6` vertical band (two flat bands, no gradient, edge none).
- **Corridor:** star-dust trail, fill `#FFF8E6`, edge `#C8B98A`; letters in teal ink on the fill.
- **Family:** FO (vehicles/rocket + space). No critters.
- **Mood:** wonder. **Why:** going to the moon letter by letter; A on the launch pad, Z at the moon.
- **Ink flag:** dark sky ≈ 40 % page ink. Designer C may print-tone it to `#6E7CB8` / `#8794C6`; letters sit on the light trail either way.

## 12. Face 12 (K) abc maze, lowercase a→z: the clownfish swims home to the coral
- **Setting:** a sunny coral reef; the corridor is a bubble channel through the water.
- **Start:** `ocean life/clownfish`, top-left, h 70. **Goal:** `ocean life/coral`, bottom-right on the sand, h 110.
- **Supporting (8):** `ocean life/octopus`, `ocean life/jellyfish`, `ocean life/starfish` (on sand), `ocean life/crab` (on sand), `ocean life/seaweed`, `ocean life/pufferfish`, `ocean life/ray`, `ocean life/sea_horse`.
- **Drawn:** water `#7FCBD5` edge none, lower band `#69BBC7`; sand strip bottom 10 % `#F2DFAE` edge `#D9C38A`; 6-10 bubble rings Ø 6-12 `#E8F7F9` edge `#B9E2E8`.
- **Corridor:** bubble channel, fill `#EAF8FA`, edge `#5FAFBC`.
- **Family:** CR (ocean life cute subset; tuna/shark/orca/whale excluded as semi-real).
- **Mood:** cheerful, colourful. **Why:** a little striped fish, all the sea friends kids name at once.

## 13. Face 13 (K/G1) letter hop: colour the cells A→Z: the bear's honeycomb
- **Setting:** a giant honeycomb hanging in a summer meadow; the hop grid is the comb's hexagon cells.
- **Start:** `forest creatures/bear`, bottom-left beside cell A, h 96. **Goal:** `breakfast/honey`, top-right beside cell Z, h 70.
- **Supporting (4, in margins):** `insects and bugs/bee` ×2 (flying), `flowers/sunflower`, `flowers/clover`.
- **Drawn:** meadow `#F3DE95` edge none; hex cells (pointy-top, Ø 50-56) fill `#FFF6D6` edge `#E0B44E` 3 px; the comb's outer silhouette `#F7D27A` edge `#DDAE47`.
- **Grid look:** hop grid, NOT a corridor: the child colours cells; adjacency = shared hex edge.
- **Family:** CR + FN (honey jar food prop).
- **Mood:** sweet, sunny. **Why:** a bear eating his way to the honey; colouring cells is a reward in itself. Not the frog-lily-pad or raindrop sample: different hero, cell shape, adjacency.

## 14. Face 14 (K) number maze 1→20: the little train climbs the mountain
- **Setting:** an alpine valley; the maze lanes are railway tracks; numerals sit on sleepers.
- **Start:** `vehicles/train`, bottom-left, h 72. **Goal:** `camping/cabin`, top-right, h 90, by a drawn platform rect.
- **Supporting (7):** `camping/mountain` (backdrop, 140 px), `tree/pine` ×2, `tree/spruce`, `camping/deer`, `camping/rabbit`, `flowers/bluebell`.
- **Drawn:** sky `#DCEEF7`; far peaks `#B7C7D6` with snowcaps `#F4F8FB` (edge `#9FB2C4`); meadow `#B9DB8C` edge `#98C06A`; platform 100 × 22 `#D8C3A3` edge `#AE9673`.
- **Corridor:** rail bed, fill `#F5EDDF`, edge `#A88C6A`; sleepers = short cross ticks `#C9AF8C` 3 px every 22 px (engine skips sleepers inside numeral circles).
- **Family:** FO hero (train) + FN/camping props; camping/deer and camping/rabbit are camping-sheet animals (same sheet as the cabin).
- **Mood:** cheerful journey. **Why:** "choo-choo, one, two, three..." counting stops on the way up the mountain.

## 15. Face 15 (G2) skip-counting maze: the hot-air balloon to the rainbow
- **Setting:** a dawn sky; the path is a chain of clouds; numbers sit on cloud puffs.
- **Start:** `Things That Fly/hot_air_balloon`, bottom-left, h 100. **Goal:** `weather/rainbow`, top-right, h 90.
- **Supporting (6):** `Things That Fly/paper_airplane`, `Things That Fly/helicopter`, `Things That Fly/airplane`, `Things That Fly/swan`, `Things That Fly/seagull`, `weather/sun`.
- **Drawn:** sky bands `#FCE6D8` (low), `#E9E3F6` (mid), `#D8E7FA` (top); 2 distant cloud banks `#FFFFFF` edge `#E3E6F2`.
- **Corridor:** cloud road, fill `#FFFFFF`, edge `#9DB8D8`, scalloped outline (engine: outline stroke drawn with round caps + puff circles of Ø W+10 every 34 px along each chain; fill stroke plain).
- **Family:** FO/FN (Things That Fly machines + birds of the same sheet; no rosy critters).
- **Mood:** airy, grown-up for G2. **Why:** floating up to a rainbow by 2s, 5s or 10s; the steps feel like hops from cloud to cloud.

## 16. Face 16 (K/G1) addition maze, sums that make 10: the giraffe crosses the savanna
- **Setting:** a dusty savanna; stepping stones (sandstone slabs) carry sums; the giraffe steps only on sums that make 10.
- **Start:** `zoo animals/giraffe`, bottom-left, h 110. **Goal:** `tree/baobab`, top-right, h 150.
- **Supporting (6):** `zoo animals/zebra`, `zoo animals/elephant`, `zoo animals/rhinoceros`, `zoo animals/meerkat`, `birds/ostrich`, `zoo animals/gazelle`.
- **Drawn:** sky `#FBEBD0`; savanna ground `#E9C98A` edge `#CFAE6C`; dry-grass tufts `#D7B56C`; stones = rounded slabs 88 × 54, fill `#FFF4E0`, edge `#C99C66`, label in ink 26-30 px.
- **Corridor:** clay track linking stones, fill `#F6D9BE`, edge `#C88E5F`, W 20 (stones are the nodes; Designer B decides hop vs corridor).
- **Family:** CR (zoo animals) + FN tree.
- **Mood:** warm, sunny. **Why:** a tall giraffe picking safe stones to the big tree; the numbers are stepping stones, not a worksheet grid.

## 17. Face 17 (G1) subtraction maze within 20: the gingerbread man's candy land
- **Setting:** a candy land of pastel icing paths; sweets stand on the islands; differences ride on round candy discs.
- **Start:** `bakery/gingerbread_man`, bottom-left, h 90. **Goal:** `desserts and sweets/cake`, top-right, h 90.
- **Supporting (7):** `desserts and sweets/cupcake`, `desserts and sweets/donut`, `desserts and sweets/lollipop`, `desserts and sweets/ice_cream`, `desserts and sweets/candy_cane`, `desserts and sweets/macaron`, `desserts and sweets/popsicle`.
- **Drawn:** ground `#CDEEDF` edge none; 3 icing drips along the top edge `#F9D3E0` edge `#E7A9BF`; candy discs Ø 64 fill `#FFFFFF` edge `#F08FAE` 4 px, label ink 26-30 px.
- **Corridor:** icing ribbon, fill `#FDE6EE`, edge `#E5A2BA`.
- **Family:** FN (bakery + desserts; the gingerbread man is the only face, and it belongs to bakery).
- **Mood:** sugary fun. **Why:** a runaway gingerbread man and a cake at the end; G1 children forgive any subtraction for this.
- **Note:** `christmas/gingerbread` and `desserts and sweets/gingerbread_man` exist too; use `bakery/gingerbread_man` ONLY (one gingerbread per page).

## 18. Face 18 (K/G1) first-sound maze: the market square
- **Setting:** a market square seen from above; produce sits on the corridor nodes; the hero picks only things that start with its sound.
- **Hero (start, bottom-left):** chosen PER LOCALE from this CR rotation so the hero's name gives the target sound and the pool has ≥ 8 matching pictures (pedagogy panel locks): `pets/hamster`, `pets/mouse`, `pets/guinea_pig`, `pets/rabbit`, `forest creatures/squirrel`, `forest creatures/badger`, `forest creatures/raccoon`, `forest creatures/porcupine`. ⚠ es `hámster` / fr `hamster` begin with a silent or /x/ h: refuse hamster there.
- **Goal:** `At the Supermarket/basket`, top-right, h 72.
- **Picture pool (on corridor nodes, d2 = 12-14 placed, 5-6 matching):** all FN food, no text: fruits/* (29), vegetables/* (26), At the Supermarket/{apple, banana, bread, broccoli, butter, cake, carrot, cheese, cherry, cookie, corn, cucumber, donut, egg, garlic, fish, grapes, ham, ice_cream, kiwi, lemon, lettuce, melon, milk, mushroom, muffin, onion, orange, pasta, peach, pear, peas, pepper, pie, pineapple, pizza, plum, popcorn, potato, pretzels, pumpkin, raspberry, sausage, strawberry, tomato}, bakery/{bagel, baguette, bun, croissant, pretzel, toast, waffle}. ≈ 105 pictures, one family, with duplicates across themes the engine dedupes by vocab key.
- **Drawn:** square tiles `#E8C9A7` edge `#CFA983` (large 40 px checker of two tones `#E8C9A7`/`#E2BF9A`); stall islands = awnings: rect + 5 scallops alternating `#F28A72` / `#FFF1E6` edge `#D4705A`.
- **Corridor:** market lane, fill `#FFF9EF`, edge `#C6A27C`; picture nodes on the corridor get a white disc Ø 62 edge `#C6A27C` under the picture.
- **Family:** CR hero + FN food.
- **Mood:** lively, chatty. **Why:** shopping with a pet, "only things that start like my name"; many pictures to name aloud.

## 19. Face 19 (G2) arrow code maze: the bulldozer on the building site
- **Setting:** a building site with dirt roads; arrows painted on the roads tell the way.
- **Start:** `vehicles/bulldozer`, left mouth, h 72. **Goal:** `vehicles/dump_truck`, right mouth, h 72.
- **Supporting (6):** `vehicles/excavator`, `vehicles/crane`, `vehicles/cement_mixer`, `vehicles/forklift`, `camping/log`, `camping/rock`.
- **Drawn:** site ground `#D7C3A0` edge `#BBA47E`; 3 gravel heaps (half-ellipse) `#BDB4A6` edge `#9F9686`; a striped barrier rail `#F2B13A` / `#FFFFFF` (rect bars) on one island.
- **Corridor:** packed-dirt road, fill `#F7EBD3`, edge `#B48F5C`; arrows drawn by the engine in teal `#146B5E` (apparatus), 22-26 px chevrons, one per cell.
- **Family:** FO (vehicles) + 2 camping objects (log, rock: neutral FN).
- **Mood:** busy, mechanical. **Why:** diggers! and "read the code like a robot driver" feels grown-up to a 7-year-old.

## 20. Face 20 (K) maze + colouring page: the crab's day at the beach (B&W)
- **Setting:** a beach: sea band at the top, sand below; corridors outlined only so the child colours the whole page after drawing the way.
- **Start:** `beach bw 2/crab`, bottom-left, h 70. **Goal:** `beach bw 2/sandcastle`, top-right on the sand, h 140.
- **Supporting (8, catalog-checked):** `beach bw/parasol`, `beach bw/beach_ball`, `beach bw/bucket`, `beach bw/palm_tree` (260 → scaled 170), `beach bw/sun` (sky), `beach bw/starfish`, `beach bw 2/boat` (afloat on the sea band), `sea life bw/fish` (in the sea band). Excluded by catalog flags: `beach bw/seashell*` (da noword), `beach bw/anchor` (it noword).
- **Drawn (line only, ink `#3A3530` 2.5 px, NO fills):** horizon line; sea band 18 % with 3 wave lines; sand = blank paper with 12-16 tiny dot triplets; corridor = two parallel ink lines (W 40) with rounded joins, interior blank.
- **Corridor:** outline only (colourable); key = coral route over the line art.
- **Family:** BW only (beach bw, beach bw 2, sea life bw). Colour plan from catalog (crab red, castle yellow, ball red/yellow/blue...) is the KEY's optional colour version only if Designer C wants it.
- **Mood:** holiday. **Why:** two activities in one; a crab building a sandcastle is funny and very colourable.

---

## 21. Dissimilarity proof

| # | setting | start hero | goal | family | dominant palette (bg / corridor) | corridor look |
|---|---|---|---|---|---|---|
| 1 | autumn orchard hill | hedgehog | apple tree | CR+FN | straw gold `#E6D49A` / `#FFF5DC` | straw path |
| 2 | spring blossom park | puppy | ball | CR | fresh lawn `#C8E6A0` / `#FBEFD0` | very wide sand path |
| 3 | rainforest floor | orangutan | banana tree | CR+FN | deep green `#6FAF66` / `#EEF6DD` | narrow leaf-litter trail |
| 4 | garden stream | toy boat | teddy on dock | toys+CR | bank green `#A9D27E` / blue `#D3EEF8` | water channel |
| 5 | ant colony underground | ant | ant family | CR+FN | soil browns `#B88559` / `#F4E1C6` | tunnels + chambers |
| 6 | small town | tow truck | green car | FO | lawn blocks `#BFDB98` / grey `#E4E2DE` | asphalt + centre dashes |
| 7 | summer hayfield | 3 babies | 3 mothers | CR farm | wheat `#EED58A` / `#F3F8E4` | mown lanes, multi-start |
| 8 | windy hilltop sky | rabbit, fox, raccoon | 3 kites | CR+FN | sky `#CFE6F5` / cream string | thin tangled strings |
| 9 | vegetable garden beds | rabbit | bucket | CR+FN | soil beds `#9C6E4A` + grass / stone `#F1EEE6` | paved garden path |
| 10 | Arctic sea ice | polar bear | igloo | winter | ice blue `#CFE3EF` / white | snow trail |
| 11 | night space | rocket | moon | FO | indigo `#3E4C86` / `#FFF8E6` | star-dust trail |
| 12 | coral reef | clownfish | coral | CR ocean | turquoise `#7FCBD5` / `#EAF8FA` | bubble channel |
| 13 | meadow honeycomb | bear | honey jar | CR+FN | honey `#F3DE95` / `#FFF6D6` | hex cell hop grid |
| 14 | alpine valley | train | mountain cabin | FO+camping | alpine `#B9DB8C` + grey peaks / `#F5EDDF` | rails + sleepers |
| 15 | dawn sky | hot-air balloon | rainbow | FO/FN fly | peach-lilac `#FCE6D8` / white | scalloped cloud road |
| 16 | savanna | giraffe | baobab | CR zoo | ochre `#E9C98A` / clay `#F6D9BE` | clay track + sandstone stones |
| 17 | candy land | gingerbread man | cake | FN sweets | mint `#CDEEDF` / pink `#FDE6EE` | icing ribbon + candy discs |
| 18 | market square | per-locale pet | basket | CR+FN | terracotta tiles `#E8C9A7` / `#FFF9EF` | market lane + picture discs |
| 19 | building site | bulldozer | dump truck | FO | dirt `#D7C3A0` / `#F7EBD3` | dirt road + teal arrows |
| 20 | beach (line art) | crab | sandcastle | BW | paper white / blank | double ink line, colourable |

**Checks:** 20 settings, all different. 20 start heroes, all different species/objects (two rabbits? face 8 `forest creatures/rabbit` is one of three string-holders, face 9 `farm animals/rabbit` is the hero: different drawings, different roles; if the critic wants zero overlap, swap face 8's rabbit for `forest creatures/chipmunk`). 20 goals, all different. 19 colour palettes keyed on distinct dominant hues (gold, spring green, deep green, blue-green, brown, grey, wheat, sky, soil, ice, indigo, turquoise, honey, alpine, peach, ochre, mint-pink, terracotta, dirt) + 1 line art. 17 distinct corridor paints; the three earth-tone paths (1 straw, 9 paved stone, 19 dirt) differ in hue, texture ticks and background. Repeated layout is prevented by start/goal corners: BL→TR (1,3,9,11,13,14,15,16,17,18,20 differ in topology per Designer B), L→R (2,6,10,19), TL→BR (4,5,12), top→bottom multi (7), bottom→top multi (8). Designer B should rotate maze seeds and mouths so no two faces share a corner pair AND a topology; I recommend B moves 11 to BL→TC and 15 to BC→TR.

## 22. Flags (library gaps and redesigns already made)
1. **River "boat to the dock" (face 4):** no library character in a boat. Redesigned as `toys/boat` → `toys/teddy_bear` on a DRAWN dock (dock is allowed apparatus).
2. **Burrow (face 5):** the sample is a mouse home; the library has no mole or mother mouse in a dress. Redesigned as an ant colony (two different ant drawings).
3. **Town (face 6):** no plain house drawings without text; `post office/post_office` carries English. Town built from `around the house/garage`, `winter/cabin`, `camping/cabin` + drawn lawn blocks. No drawn houses.
4. **Avoid face (10):** `winter/penguin` would put a penguin beside polar bears (wrong pole). Penguin removed; Arctic only.
5. **Face 7 pairs:** only farm animals carry mother/baby pairs (5 pairs). d3 max = 4 pairs; never put `farm animals/chicken` and `farm animals/hen` together.
6. **Face 18 hero:** the target sound depends on the hero's word per locale; the hero comes from an 8-critter rotation, refused where the initial is silent or not a clean sound (es/fr hamster). Pedagogy + native panels finalise per locale; pool is ~105 FN food pictures.
7. **Face 11 ink:** the only dark background; print-tone fallback given.
8. **Face 20:** B&W rows only; seashells and anchor excluded by existing native-review `noword` flags in `data/fdx/catalog.js`.
9. **Scale words:** `tree/banana`, `tree/apple`, `tree/baobab` drawn smaller than an animal would read as wrong: keep trees ≥ 1.4 × the hero height (stated per face).
10. **UNKNOWN, engineer measures:** greyscale separation corridor vs background per face (target ≥ 10 luminance points); the share of island area left for art at each face's d2 cell size (Designer B); the actual webp aspect of each named drawing in `cache/themes/` (heights above are targets, not measurements).
