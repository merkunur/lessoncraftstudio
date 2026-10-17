# New 263 — The Field Lens → THE RUBBING (NGSS 1-LS1-1)

## 0. Identity
- **id** `covering-lens.play.1-ls1-1` (planned key kept: `covering-lens`) · grade 1 · NGSS **1-LS1-1** (structures animals use — here the body covering) · strand Science · framework via `frontend/lib/frameworks.ts` · own files `covering-lens-core.js`, `covering-lens-activity.js`, `covering-lens-activity.html`, `covering-lens-activities.json`.
- **Worksheets covered:** G1-205 "Animal Coverings" (draw a line from each animal to its body covering) → COVERINGS drawers · G1-201 "Sort the Animals" (draw a line from each animal to its group) → GROUP drawers.
- **Why not a magnifying lens (the working title):** the contact sheets show the library animals are flat-colour cartoons — magnifying a gecko shows orange, not scales (the risk the dossier named). And lenses are already built twice (#219 Body Map, #230 Search Lens). So the "field lens" becomes a **field rubbing**: a sheet of rubbing paper laid over the animal that turns up the TEXTURE of its covering where the child rubs — truthful whatever the drawing, and a new toy.

## 1. The pitch
"Lay rubbing paper over the animal and rub with your finger: its real covering comes up under your fingertip — fur, feathers, scales or smooth wet skin — and the rubbing only fits in the drawer whose lining has the same texture."

## 2. Why a child will want it again
- **Rubbing is irresistible.** Children rub coins under paper for fun; here the finger scrubs back and forth over a frosted sheet and soft fur strokes, overlapping feathers or shiny scales bloom out of the white, in the animal's own colours. The sound is a soft pencil-scratch that rises in pitch as more appears.
- **Surprises.** The penguin's rubbing is all feathers (it is a bird, even if it cannot fly); the bat's is fur; the seal — it lives in the sea — rubs up thick fur; the salamander, which looks just like a lizard, rubs up smooth and wet with little droplets — not scales.
- **The drawer that only shuts on a match.** Drop the rubbing in a drawer: if its texture matches the drawer's lining, the rubbing sinks flat into the lining, the drawer slides shut with a wooden *clunk* and the animal hops in after it.
- **The cabinet show.** At the end of a round the drawers slide open one by one, each showing its animals in a row (96 px) on its lining — a little museum of fur, feathers, scales and skin.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** animals have different body coverings — mammals fur or hair, birds feathers, fish and reptiles scales, amphibians smooth wet skin (G1-205); animals are grouped by such features (G1-201).
- **Misconception 1 — "it lives in the sea, so it is a fish":** the seal (and the otter) swim, yet the rubbing is fur; the fish drawer's scale lining refuses it, and in GROUP mode it files with the mammals. (Critic ruling: whale and dolphin are OUT. A rubbing must be true, and an adult dolphin has no hair — it is born with a few whisker bristles on its snout that fall out within weeks; some adult whales keep a few sensory hairs on the head, which no K-1 child can check and no rubbing could honestly show as "a covering". Their skin is smooth and hairless, which would match the amphibian lining. The reviewed worksheet bank `data/science/animal-classification.json` omits sea mammals for the same reason. The seal teaches the same misconception truthfully.)
- **Misconception 2 — a penguin (ostrich) is not a bird** because it cannot fly: its rubbing is feathers, and only the bird drawer has a feather lining.
- **Misconception 3 — a salamander is a lizard; a turtle is an amphibian:** the salamander rubs up wet and smooth (amphibian); the turtle rubs up hard plate-scales (reptile).
- **Misconception 4 — "it lives in water, so it's a fish / it flies, so it's a bird":** the bat (flies) rubs fur; the shark (no obvious scales) rubs tiny tooth-scales; the drawer cares only about the covering.
- **How the material pushes back:** a texture cannot lie flat on a different texture — the rubbing rides up on the lining and the drawer will not close over it.

## 4. The stage
`layout:'split'` at ≥ 700 px: rubbing plate left, cabinet right.

**At 704 px (stage 672 × ≈ 430):**
- **The rubbing plate** (left, 320 × 320): a cream board (geometry) with four corner clips. The animal — library picture, 220 px — lies on it. Over the animal: the **rubbing paper**, a frosted white sheet (90 % opaque, a faint grid texture) through which the animal's silhouette shows as a pale shape, so the child knows where to rub.
- **The queue** under the plate: the round's waiting animals at 96 px in a row (up to 3 visible; a small "+1" dot pattern if more).
- **The cabinet** (right, 320 × 340): wooden cabinet geometry with 4 drawers in a 2 × 2 grid (3 drawers: 3 in a column; GROUP mode: 5 drawers, 2-2-1), each drawer 150 × 100 px with a pull handle and a **lining swatch** on its front, 120 × 56 px, showing its texture (COVERINGS mode) — in GROUP mode the front shows the class NAME (content word, 18 px) and the lining is hidden inside until a miss or the finale.
- **The rubbing card** (after peeling): a paper card 140 × 100 px showing the rubbed texture patch in the animal's colours — texture only, never the animal; the animal waits on the plate until the drawer accepts.
- **Task line** above (≤ 24 px).
- No words on the apparatus except class names in GROUP mode (content).

**Textures (pattern geometry, drawn once, tiled, clipped to the animal's silhouette, multiplied over the picture so they take its colours):**
- **fur / hair** — rows of short soft curved strokes (2 px, 70 % ink) in a slight wave;
- **feathers** — overlapping vanes (rounded chevrons with a centre shaft line), staggered rows;
- **scales** — overlapping arcs (fish-scale pattern), each arc with a light top edge; **plate scales** (turtle, tortoise, alligator back) — larger polygons with grooves, shown as a variant of the same scales family;
- **smooth wet skin** — no strokes: a glossy surface with two highlight streaks and 4–6 droplet dots;
(No "sparse hair" texture — whale and dolphin are not in the pool.)
The drawer linings use the same patterns in neutral tones (fur: warm brown; feathers: blue-grey; scales: green; skin: teal glossy).

**At 360 px:** stacked. Plate 260 × 260 with the animal at 170 px; queue row of 64 px pictures (3); cabinet below as a row of drawers 2 × 2 at 160 × 80 (lining swatch 120 × 40); GROUP mode: 5 drawers as 3 + 2 at 104 × 80. Check at ≈ 650 px. **320 × 640:** plate 240, animal 150, drawers 148 × 72, Check at ≈ 605.

## 5. The hand
- **Rub** (pointer move while pressed over the plate): a soft circular brush (radius 26 px at 704, 22 at 360) clears the frost along the path within one frame and paints the texture underneath (in the animal's colours) — only inside the silhouette (outside, the frost clears to plain board). Pencil-scratch sound, pitch rising with the revealed share.
- **Ready:** when ≥ 35 % of the silhouette is revealed, the paper's bottom-right corner curls up (200 ms) with a coral tab (44 × 44).
- **Peel** (drag the tab or the sheet): the rubbing lifts off as the **rubbing card** (the most-revealed 140 × 100 patch, chosen inside the silhouette) and follows the finger. The animal stays on the plate, now uncovered.
- **File:** drop the card on a drawer. Right drawer: the card sinks flat into the lining (the patterns align and the card's edge vanishes, 250 ms), the drawer slides shut (*clunk*, 200 ms), the animal hops (300 ms arc) from the plate into the drawer, and the drawer **springs ajar again** (200 ms) — every drawer is open for every animal, so a shut drawer never narrows the choice. The next animal slides onto the plate and a fresh sheet unrolls over it (300 ms).
- **GUESS-FIRST (the DEFAULT — critic ruling):** a rubbing laid beside identical linings is a picture-matching game that needs no science, so the child first COMMITS: no paper at first; she drags each ANIMAL straight onto the drawer she thinks it wears (prediction from what she knows). At Check, each drawer rubs its animal itself: a sheet drops over the animal inside the drawer window and the texture comes up — it lies flat on the lining, or rides up on it (the miss). The rubbing is the PROOF, never the clue. RUB-FIRST stays as the "explore" setting for a first visit.
- **Undo:** a filed animal can be dragged back out of an open drawer until Check (drawers stay ajar 8 px until Check in GUESS-FIRST mode; in RUB-FIRST mode a right drawer shuts at once — that drawer's verdict is the check for that animal, see §7).
- **Keyboard:** Space rubs one sweep (a horizontal band, 8 bands to finish); Enter peels; Tab cycles drawers; Enter files.
- **Free play:** the finished cabinet opens; any filed animal can be pulled back onto the plate and rubbed again on fresh paper (rubbing is fun for its own sake).

## 6. The rounds
A round = a field trip of 4 animals (COVERINGS) or 5 (GROUP), filed one after another. Never one-per-drawer (so the last animal can never be filed by elimination).

### COVERINGS, 4 drawers (fur · feathers · scales · smooth wet skin) — 8 rounds
| # | animals (truth) |
|---|---|
| C1 | animals/dog (fur) · zoo-animals/zebra (fur) · birds-2/parrot (feathers) · reptiles-and-amphibians/frog (skin) |
| C2 | zoo-animals/lion (fur) · animals/fox (fur) · ocean-life/clownfish (scales) · birds-2/flamingo (feathers) |
| C3 | birds-2/robin (feathers) · animals/owl (feathers) · reptiles-and-amphibians/salamander (skin) · animals/sheep (fur) |
| C4 | reptiles-and-amphibians/cobra (scales) · ocean-life/angelfish (scales) · zoo-animals/kangaroo (fur) · pets/frog (skin) |
| C5 | animals/panda (fur) · birds-2/toucan (feathers) · reptiles-and-amphibians/iguana (scales) · reptiles-and-amphibians/chameleon (scales) |
| C6 | camping/frog (skin) · birds-2/eagle (feathers) · birds-2/canary (feathers) · animals/rabbit (fur) |
| C7 | farm-animals/cow (fur) · animals/swan (feathers) · birds-2/peacock (feathers) · reptiles-and-amphibians/alligator (scales) |
| C8 | animals/tiger (fur) · reptiles-and-amphibians/frog (skin) · ocean-life/fish (scales) · reptiles-and-amphibians/gecko (scales) |
Totals (measured, `work-c25/m263.js`): fur 10 · feathers 9 · scales 8 · skin 5 (31 / 28 / 25 / 16 %; the library holds only a few amphibian drawings — skin is recorded, not padded). **No round is one-per-drawer** (the first draft had C1, C6 and C8 one animal per drawer, so the last animal filed itself by elimination — against its own rule); every round has one covering twice and one missing, and the missing one varies. Best single-drawer bot (always "fur"): 31 %.
**3 drawers** (fur · feathers · scales): the same 8 rounds with every skin animal replaced: C1 frog → reptiles-and-amphibians/gecko (scales); C3 salamander → birds-2/macaw (feathers); C4 pets/frog → ocean-life/clownfish (scales); C6 camping/frog → animals/koala (fur); C8 frog → birds-2/rooster (feathers). (Four animals into three drawers is never one-per-drawer.)
Covering rounds never include seal, otter, penguin, bat, ostrich, turtle, tortoise, shark (those are GROUP surprises); whale, dolphin, manatee, narwhal and orca are in NO round of any mode.

### GROUP, 5 drawers (mammal · bird · fish · reptile · amphibian) — 8 rounds, surprises from G4
| # | animals (class · covering the rubbing shows) |
|---|---|
| G1 | animals/dog (mammal · fur) · animals/horse (mammal · fur) · birds-2/parrot (bird · feathers) · ocean-life/clownfish (fish · scales) · reptiles-and-amphibians/iguana (reptile · scales) |
| G2 | zoo-animals/lion (mammal · fur) · birds-2/robin (bird · feathers) · birds-2/eagle (bird · feathers) · ocean-life/tuna (fish · scales) · reptiles-and-amphibians/frog (amphibian · skin) |
| G3 | animals/rabbit (mammal · fur) · ocean-life/angelfish (fish) · ocean-life/fish (fish) · reptiles-and-amphibians/cobra (reptile) · reptiles-and-amphibians/salamander (amphibian · skin) |
| G4 | animals/penguin (bird · feathers) ★ · animals/bat (mammal · fur) ★ · reptiles-and-amphibians/alligator (reptile · plate scales) · pets/frog (amphibian) · animals/owl (bird) |
| G5 | ocean-life/seal (mammal · fur) ★ · animals/turtle (reptile · plate scales) ★ · ocean-life/shark (fish · tiny scales) ★ · zoo-animals/kangaroo (mammal) · camping/frog (amphibian) |
| G6 | zoo-animals/otter (mammal · fur) ★ · birds-2/ostrich (bird · feathers) ★ · reptiles-and-amphibians/salamander (amphibian) ★ · reptiles-and-amphibians/chameleon (reptile) · reptiles-and-amphibians/gecko (reptile) |
| G7 | animals/bat (mammal) ★ · reptiles-and-amphibians/tortoise (reptile) ★ · birds-2/flamingo (bird) · ocean-life/clownfish (fish) · animals/sheep (mammal) |
| G8 | animals/penguin (bird) ★ · ocean-life/seal (mammal) ★ · ocean-life/shark (fish) ★ · reptiles-and-amphibians/salamander (amphibian) · birds-2/toucan (bird) |
★ = surprise. Measured (`work-c25/m263.js`): every round holds exactly four of the five classes with one twice — never one-per-drawer (the first draft had FOUR rounds, G1/G3/G4/G7, with one animal per drawer, so the fifth filed itself), and the missing class rotates (amphibian, reptile, bird, fish, bird, fish, amphibian, reptile). Class shares mammal 28 % · bird 23 % · fish 18 % · reptile 18 % · amphibian 15 %; the "always mammal" bot scores 28 %. zoo-animals/otter never shares a round with zoo-animals/meerkat (near-twins); the shark's "tiny scales" are its real tooth-scales (dermal denticles) — true.

- **Answer position.** Drawer positions are fixed per mode (the cabinet is furniture — a child learns where fur lives, like a real classroom cabinet), so position balance is measured on the ANIMAL order: the right drawer of the first animal in a round is never the same as the previous round's first; across a pass each drawer receives the first animal ≤ 30 % of rounds. The plate order inside a round is shuffled per visit (order-only). The gate also checks that the rubbing card never shows the animal (texture only) and that no two consecutive animals in a round share a covering more than twice per pass.
- **Order:** order-only reshuffle per pass (rounds and animals within a round).

## 7. Check, the misses, the success
GUESS-FIRST (default): one Check for the whole round — the drawers rub their animals and prove or refuse. RUB-FIRST (explore): each filing is checked as it lands — the drawer is the check.
- **Check / drop with nothing done** → no miss. Hint: "Rub the paper over the animal."
- **Miss 1:** the card does not sink: it rides up on the lining, tilted, the two textures side by side and clearly different (fur strokes against overlapping arcs); the drawer jolts but will not close (wood knock); after 1.2 s the card floats back to the plate's edge. In GROUP mode the drawer's hidden lining slides out under its name for 2 s so the child sees what that class wears. Hint: "Look at the rubbing and the drawer's lining. Are they the same?" / GROUP: "Which group wears {covering}?"
- **Miss 2:** the matching drawer's lining glows softly and its handle wiggles once. Hint: "Find the lining that looks just like your rubbing."
- A new rub or drag takes the help away.
- **GUESS-FIRST misses:** at Check each drawer rubs its own animal; wrong ones show the mismatch exactly as miss 1 and the animal hops back to the plate queue; miss 2 as above.
- **Success (round):** the drawers open one by one (200 ms apart), each showing its animals at 96 px on its lining. Bubble (EN): COVERINGS "Fur, feathers, scales and skin — every animal found its drawer!" · GROUP with a surprise: "{animal} has {covering} — so it is a {class}!" (e.g., "The penguin has feathers — so it is a bird!", "The seal has fur — so it is a mammal!").

## 8. Settings
1. **Drawers:** 3 coverings / 4 coverings / animal groups (the cabinet visibly changes: 3, 4 swatch drawers or 5 named drawers).
2. **Rubbing:** guess first (DEFAULT — a bare animal ready to drag; the rubbing proves it at Check) / rub first (explore — paper over the animal at rest).

## 9. Words (EN source)
- title "The Field Rubbing" (page title "Animal Coverings — Fur, Feathers, Scales and Skin (Grade 1)")
- instructions: RUB-FIRST "Rub the paper to see the animal's covering. Then put the rubbing in its drawer." · GUESS-FIRST "Put each animal in a drawer. Then check: the drawer makes a rubbing." · GROUP "Rub the paper. Which group does the animal belong to?"
- class names (content): mammal · bird · fish · reptile · amphibian.
- covering words (used in hints/celebrations, never on drawers in COVERINGS mode): fur · hair · feathers · scales · smooth wet skin.
- hints and celebrations: §7.
- aria: "Rubbing paper over the {animal}" · "Rubbing: {covering}" · "Drawer: {covering}" / "Drawer: {class}".
- settings: "Drawers" · "3 coverings" · "4 coverings" · "Animal groups" · "Rubbing" · "Rub first" · "Guess first".
- **Locale traps.** Animal names from `image-vocabulary.js` in the page locale (lower-cased mid-sentence where the locale does). Class names are school terms: de Säugetiere/Vögel/Fische/Reptilien (Kriechtiere in some Länder — reviewer picks)/Amphibien (Lurche); fr mammifères/oiseaux/poissons/reptiles/amphibiens; fi nisäkkäät/linnut/kalat/matelijat/sammakkoeläimet; drawer names in the plural form a teacher writes on a chart. "Hair" vs "fur": several locales use one word (de Fell; fr poils; es pelo) — the celebration uses the drawer word; the celebration frame "{animal} has {covering} — so it is a {class}" needs article/gender agreement → authored per locale as whole sentences per surprise animal (8 surprise sentences), never assembled. "Smooth wet skin" — fi "sileä, kostea iho". Penguin "cannot fly" is never stated as a fact on screen.

## 10. Sound off, access, phones
- Legible with sound off: the textures appear visually; the drawer shuts or refuses visibly.
- Keyboard: Space rubs in bands; announcements ("The rubbing shows feathers").
- Taps ≥ 44 px (peel tab 44, drawers ≥ 72 tall, queue pictures 64+).
- Pictures: plate animal 220/170/150 px; queue 96/64; finale rows 96/64.
- Check above the fold at 360 × 740 (≈ 650) and 320 × 640 (≈ 605).

## 11. Distinct from
- **#219 Body Map** (lens under a pin) and **#230 Search Lens** (frosts what you searched) — magnifiers; here the finger RUBS a texture up, and a texture-fit drawer checks it.
- **#241 Bin Windows** (a lid that will not shut on a stranger) — that lid checks sameness of the bin's contents; this drawer checks a texture against its lining.
- **#242 Life Test / #240 Home Finder / #233 Mother and Baby** — living vs non-living, needs, growth; not coverings.
- **#078 Mim's Memory Baskets** — everyday categories, not biological traits.

## 12. Build plan
- **Core** `CoveringCore`: `TRUTH` table `{key: {covering, class}}` (reviewed); `newRound(row)`; `rub(state, path)` → revealed share (computed on a coarse 32 × 32 silhouette mask from the picture's alpha); `canPeel(state)` (≥ 0.35); `file(state, animal, drawer, mode)` → `{ok, truth}`; `cardPatch(mask, revealed)` → the patch rectangle; `grade(state)` for GUESS-FIRST.
- **Gate's own truth** (`verify-covering-lens-core.js`): its own covering/class table written in the gate (penguin bird, bat mammal, seal mammal, otter mammal, salamander amphibian, turtle/tortoise/alligator reptile, shark fish; whale/dolphin/manatee/narwhal/orca refused from every pool); every round never one-per-drawer; COVERINGS rounds contain no surprise animal; GROUP surprises only from G4; distribution of §6; the card shows texture only (no picture layer); B&W themes never referenced; every `<themeDir>/<noun>@2x.webp` exists on disk.
- **Mutations (each killed):** seal accepted by the fish drawer · a whale or dolphin in any pool · a drawer that stays shut after filing (elimination) · penguin refused by the bird drawer · salamander accepted as reptile · turtle accepted as amphibian · texture drawn outside the silhouette · peel allowed at 0 % rubbed · the card carries the animal picture · a round one-per-drawer · a surprise in a COVERINGS round · GROUP drawer shows its lining at rest.
- **Pictures to verify (seen on contact sheets this session):** animals sheet (dog, fox, owl, panda, penguin, bat, rabbit, sheep, swan, tiger, turtle, koala, horse), birds-2 (parrot, robin, flamingo, toucan, eagle, peacock, rooster, ostrich, macaw), ocean-life (clownfish, angelfish, tuna, fish, shark), reptiles-and-amphibians (all ten — the salamander is orange and lizard-shaped, which is exactly the surprise). To check at build: zoo-animals/lion, kangaroo, zebra; farm-animals/cow; pets/frog; camping/frog (seen: a green spotted frog).
- **Risks:** resolved by the critic — whale/dolphin out, seal + otter in (both seen on contact sheets: ocean-life/seal is a brown whiskered seal; zoo-animals/otter upright, orange-brown). The rubbing textures are a DIAGRAM revealed over the picture, never a claim that the flat cartoon itself shows scales (picture ruling: never ask a child to see a covering in the picture). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — rubbing fur and feathers out of blank paper is pure tactile fun, with surprises (a lizard that is wet, a bird in a tuxedo).
2. **Teacher on the board?** Yes — "what does it feel like? which group?" is exactly the lesson, and the seal/penguin/bat/salamander traps are the ones teachers spend time on.
3. **Parent trust?** Library animals, a reviewed truth table, gentle feedback, nothing sold.
4. **Invention:** rubbing paper turns up the animal's real covering under your finger, and the rubbing only lies flat in the drawer with the same lining.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 4→5
What changed:
- Whale/dolphin "a few hairs" checked and refused: dolphins are born with a few snout bristles that fall out within weeks; only some adult whales keep sparse sensory hairs — no honest "covering" for a rubbing, and their hairless smooth skin would match the amphibian lining. Out of every pool (as the reviewed worksheet bank already rules); the "lives in the sea, so a fish" trap is now carried truthfully by ocean-life/seal and zoo-animals/otter (fur). No sparse-hair texture.
- GUESS-FIRST is now the default: rubbing a texture and dropping it on the identical lining is picture-matching that needs no science; the child commits first and the rubbing is the proof.
- Measured (work-c25/m263.js): the draft broke its own "never one-per-drawer" rule in 3 COVERINGS and 4 GROUP rounds (the last animal filed itself). Both tables rebuilt: 0 one-per rounds, the missing class rotates, best single-drawer bot 31 % / 28 %. Drawers spring ajar after each filing so a shut drawer never narrows the choice.
- All 37 animal pictures confirmed in the theme JSONs; otter never beside meerkat.
