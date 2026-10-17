# New 264 — The Cycle Wheel → THE RING THAT LAYS ITS OWN BEGINNING (NGSS 1-LS3-1)

> ✅ **BUILDABLE on the diagram path (critic ruling 2026-10-17, §12):** butterfly, frog, ladybug and plant are drawn ENTIRELY with the reviewed worksheet stage diagrams (`primitives/life-stage.js`, `primitives/plant-figure.js plantStage`) — rendered and looked at by the critic, tool-grade. ⚠ **Only the CHICKEN cycle stays BLOCKED** (no plain hen's egg picture; library chick/hen may not be mixed with a drawn egg) — so G1-203 waits for that one picture.

## 0. Identity
- **id** `cycle-wheel.play.1-ls3-1` · grade 1 · NGSS **1-LS3-1** (young are like, but not exactly like, their parents) with the life-cycle core of 3-LS1-1 at the grade-1 depth the worksheets ask · strand Science · framework via `frontend/lib/frameworks.ts` · own files `cycle-wheel-core.js`, `cycle-wheel-activity.js`, `cycle-wheel-activity.html`, `cycle-wheel-activities.json`.
- **Worksheets covered:** G1-203 "The Life Cycle of a Chicken" · G1-377 "Butterfly Life Cycle" · G1-388 "Plant Life Cycle: From Seed to Plant" · G1-389 "Frog Life Cycle: Cut and Paste" → task FILL · G1-390 "What Comes Next? Butterfly, Frog and Ladybug" → task NEXT · G2-365 "Label the Butterfly Life Cycle" → task NAME · G2-366 "Metamorphosis: Which Animal Will It Become?" → task WHOSE YOUNG · G3-393 "Butterfly and Frog Life Cycles Compared" → task TWIN RINGS.
- **Merged:** grade 2 "The Life-Cycle Wheel" (life-cycle-wheel) → FILL + WHOSE YOUNG; grade 3 "The Twin Life Wheels" (twin-wheels) → TWIN RINGS.
- **Reused content (native-reviewed for the printed worksheets):** `scripts/worksheet-gen/data/b5/animal-life-cycles.js` + `data/b5/locales/animal-life-cycles.<loc>.json` — the stage words (`stageWords`, `landingWords`), the cocoon ban (`forbidden`), the eleven comparison statements with their butterfly/frog truths (`statements`, `ALC.STATEMENTS`), the young pool (`ALC.YOUNG`), and the biology rule "the successor of the adult is the FIRST stage, computed (i + 1) mod n, never stored".

## 1. The pitch
"Each stage you place grows out of the one before it — and when the grown-up is in, it lays the first stage all over again, the old ring steps out as a ghost and a new one begins: a life cycle never ends."

## 2. Why a child will want it again
- **Hatching cards.** The ring has round slots joined by curved arrows. The child drags a stage card into the open slot; if it is the right next stage, it *comes out of* the previous one — the previous card gives a little shudder and the new card slides out from behind it along the arrow into its slot (a hatch, 400 ms), with a soft pop.
- **The grown-up lays the beginning.** When the ring is full, the grown-up's arrow lights; a fresh, small first stage pops out of the grown-up and rolls along the arrow towards slot 1 — but slot 1 is taken… so the whole old ring steps OUT to a faint outer ring (a ghost generation) and the new egg/seed/spawn settles in slot 1. A new generation starts, right in front of the child.
- **Growth rings.** Every finished round leaves its generation as a faint outer ring, like the rings of a tree (up to three), so a child sees "grandma's cycle, mum's cycle, this one".
- **Twin rings show.** In TWIN RINGS, a fact card dropped on a ring makes that ring TURN until the stage that proves it faces the card, and that stage lights up.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** living things go through stages in a fixed order — egg/seed, young, adult — and the adult makes new eggs/seeds, so the stages repeat (G1-203/377/388/389); say which stage comes next, including after the adult (G1-390); name the stages (G2-365); match a young stage to the animal it becomes (G2-366); compare two cycles — both change form, with different stages (G3-393).
- **Misconception 1 — the cycle is a line that ends with the adult.** The ring has no end: in FILL, the given stage is often NOT the first, so the egg must be placed after the butterfly; and the finished ring always lays its own first stage. In NEXT, a third of the rounds ask what comes after the adult.
- **Misconception 2 — the caterpillar comes before the egg / the frog before the tadpole.** Only the open slot after the last stage accepts a card, and only the stage that can come out of it: a butterfly dropped after the egg cannot hatch from it — the egg cracks, nothing comes out, and the butterfly slides away along the ring to show where it really belongs.
- **Misconception 3 — the young look like small adults** (a tadpole is a fish, a caterpillar a worm). WHOSE YOUNG: the young card only fits the gap in the ring whose neighbours it can come from and grow into.
- **Misconception 4 — "cocoon"** for a butterfly's chrysalis: the bank's `forbidden` list keeps it off every surface.
- **How the material pushes back:** a stage can only come out of the stage before it; the wrong card has nothing to hatch from.

## 4. The stage
`layout:'split'` at ≥ 700 px: ring left, tray right.

**At 704 px (stage 672 × ≈ 430):**
- **The ring** (left, 400 × 400): a cream disc border (geometry) with N slots (4 butterfly / ladybug, 5 frog / plant — the reviewed banks' biology; 3 chicken when its egg art lands) evenly spaced on a circle r = 140 (adjacent slot centres ≥ 165 px apart); each slot a 116 px round card holding the stage DIAGRAM at 110 px (life-stage lenses are round already; plant stages sit in a cream round card). Curved arrows (coral, 4 px, chevron head) run clockwise from slot to slot, the last arrow back to slot 1.
- **The hub** (centre, 110 px disc, wood geometry): in WHOSE YOUNG it is the drop plate; otherwise it is a plain wooden boss with a growth-ring pattern (the generations) around it.
- **Ghost rings:** previous generations as thin cream circles at r = 190, 205, 220 (2 px, 40 % opacity) — no pictures on them (ruling: no shrunken pictures; a record is geometry).
- **The tray** (right, 240 wide): the stage cards for this round (2–3 to place, plus one decoy from another cycle), 116 px round cards in a 2-column grid; in NAME the tray holds word cards (180 × 48, 18 px).
- **Task line** above (≤ 24 px).
- No words on the apparatus, except stage words in NAME and statements in TWIN RINGS (content).

**At 360 px:** stacked. Ring 336 × 336 (r 108, slots 110 px with the diagram at 104 px — the life-stage primitive refuses anything below 90 px and the critic's render showed the ladybug egg cluster and pupa only read at ≥ 104), tray below as a horizontally scrollable row of 104 px cards (2 visible + a peek; the decoy never at the hidden end) or 2 × 2 word cards (156 × 44). Check at ≈ 690 px. **320 × 640:** ring 300 (r 96, 5 slots 96 px, diagram 92 px; the ladybug ring 4 slots at 100 px), Check at ≈ 625. TWIN RINGS on phones: ONE ring visible at a time with two tabs (butterfly / frog, 44 px), the other tab and a 300 × 56 "both" bar are drop targets; on a drop the view flips to the ring that must prove it.

## 5. The hand
- **Drag a stage card** from the tray: it lifts (60 ms) and follows the finger. Only ONE slot is open — the slot the lit arrow points to (after the last filled slot, clockwise); it pulses gently.
- **Drop on the open slot:**
  - right stage → the previous stage shudders (120 ms), the card slides out from behind it along the arrow into the slot (400 ms), pop (marimba G4); the next arrow lights.
  - wrong stage → the previous stage cracks open a sliver and closes (200 ms): nothing can come out. The card does not enter the slot (it is the miss on Check; see §7 — in "watch each card" mode it is graded at once).
- **Drop elsewhere** → the card floats back to the tray.
- **The lap** (when the ring is full and right): the grown-up's arrow lights, a small first stage pops out of the grown-up (250 ms), rolls along the last arrow (500 ms); the old ring moves out to a ghost ring (600 ms) and the new first stage sits in slot 1. The child may press the ring's hub to **watch it grow round** once more (free play: each stage hatches from the last automatically, 2.4 s per lap).
- **NAME:** drag a word card under a stage picture (a label slot under each slot); it clicks in.
- **WHOSE YOUNG:** three candidate cycles are shown as three SLICES of a ring, stacked (critic fix: three whole rings at 200 px would force 72 px diagrams, below the primitive's floor): each slice is [first stage] → [dashed gap] → [grown-up] on a curved arrow, cards 110 px at 704 (slice 420 wide, 3 slices ≈ 380 tall) and 104 px at 360 (slice 336 wide). The child drags the young card into a gap; the slice that can take it opens.
- **TWIN RINGS:** drag a statement card onto the left ring, the right ring, or the BOTH plate between them.
- **Keyboard:** Tab cycles cards and the open slot/targets; Enter drops; H (hub) watches a lap.
- **Free play:** after any solved round the ring is live — tap the hub to watch generations go round; drag a stage out and back in.

## 6. The rounds
Stage ids (biology order, taken from the reviewed banks — `ALC.STAGES` and G1-388's `stages`): **butterfly** egg → caterpillar → chrysalis → butterfly (4) · **ladybug** egg → larva → pupa → ladybug (4) · **frog** frogspawn → tadpole → tadpole with legs → froglet → frog (5 — the bank's cycle; the draft's 4-stage frog skipped a stage the diagrams draw, so it is gone) · **plant** seed → sprout → seedling → flowering plant → plant with seeds (5 — the G1-388 order; `plantStage` seed/sprout/seedling/flowering/fruiting) · **chicken** egg → chick → hen (BLOCKED).

### FILL — one or two stages given; fill the rest in hatching order (the open slot moves clockwise from the given stage)
Per 4-stage cycle (butterfly, frog, ladybug, plant), 10 rounds: given = each single stage (4) + each pair of two stages (6). Written for butterfly (E egg, C caterpillar, H chrysalis, B butterfly; given in brackets, the child's placing order after):
| # | given | the child places, in order |
|---|---|---|
| F1 | [E] | C, H, B |
| F2 | [C] | H, B, E |
| F3 | [H] | B, E, C |
| F4 | [B] | E, C, H |
| F5 | [E, H] | C → then B |
| F6 | [C, B] | H → then E |
| F7 | [E, B] | C, H (open slot after E) |
| F8 | [C, H] | B, E |
| F9 | [E, C] | H, B |
| F10 | [H, B] | E → then C |
Ladybug uses the same ten shapes. (Critic fix: the draft's F9 [H, E] and F10 [B, C] were the same two puzzles as F5 and F6 with the ring turned — only 8 distinct rounds; now all four singles and all six pairs appear once.)
**Frog and plant (5 stages)** — written for frog (S spawn, T tadpole, L tadpole with legs, F froglet, A frog); plant uses the same shapes (seed, sprout, seedling, flowering, fruiting):
| # | given | the child places, in order |
|---|---|---|
| F1 | [S] | T, L, F, A |
| F2 | [T] | L, F, A, S |
| F3 | [L] | F, A, S, T |
| F4 | [F] | A, S, T, L |
| F5 | [A] | S, T, L, F |
| F6 | [S, L] | T → then F, A |
| F7 | [T, F] | L → then A, S |
| F8 | [L, A] | F → then S, T |
| F9 | [F, S] | A → then T, L |
| F10 | [A, T] | S → then L, F |
- **Anti-line rounds** (the child must place the FIRST stage right after the grown-up), measured by hand from the tables: 4-stage cycles F2, F3, F4, F6, F8, F10 = **6 of 10** (the draft claimed 7 and listed F9, whose egg is given — with 3 of 6 pairs containing the first stage, 6 is the maximum for a 4-cycle); 5-stage cycles F2, F3, F4, F5, F7, F8, F10 = **7 of 10**. The gate asserts these exact sets.
- **Chicken** (BLOCKED until the egg art lands): 3 single-given + 3 pair-given = 6 rounds, so it would only ever join "all cycles" passes.
- The tray always holds one decoy: a stage from ANOTHER cycle with the same role (a tadpole in a butterfly ring), so the tray always has one card that hatches from nothing on this ring.

### NEXT (G1-390) — one stage, three candidates from the same cycle (8 per pass)
| # | cycle | shown | candidates (answer first; tray order shuffled) |
|---|---|---|---|
| N1 | butterfly | egg | caterpillar · chrysalis · butterfly |
| N2 | butterfly | butterfly | egg · caterpillar · chrysalis |
| N3 | frog | tadpole | tadpole with legs · frogspawn · froglet |
| N4 | frog | frog | frogspawn · tadpole · tadpole with legs |
| N5 | ladybug | larva | pupa · egg · ladybug |
| N6 | ladybug | ladybug | egg · larva · pupa |
| N7 | plant | seedling | flowering plant · seed · sprout |
| N8 | plant | plant with seeds | seed · sprout · seedling |
Half of the rounds ask what comes after the grown-up. The bank's LOOKALIKE rule holds (froglet and frog never both on a row where one is the answer; flowering and fruiting never both, they differ only by a pod). Shown card 140 px at 704 / 120 at 360; candidates 116 / 104. **Answer tray slot = row index mod 3** (N1→0 … N8→1) → 3/3/2 per pass, never left to a shuffle.

### NAME (G2-365) — label a filled ring with stage words (7 per pass)
The ring is filled (pictures), the child drags 4 word cards from the `stageWords`/`landingWords` bank under the slots; one extra word from another cycle (the bank's `decoy`, e.g. "tadpole" in the butterfly ring) stays in the tray. Rounds: butterfly ×2 (ring rotated so a different stage sits at the top), frog ×2, ladybug ×2, plant ×1.

### WHOSE YOUNG (G2-366) — 8 per pass
Three small rings (grown-up and egg/seed filled, the young slot(s) dashed); one young card at a time.
| # | young card | rings shown (answer **bold**) |
|---|---|---|
| W1 | caterpillar | **butterfly** · frog · ladybug |
| W2 | tadpole | butterfly · **frog** · plant |
| W3 | ladybug larva | frog · **ladybug** · butterfly |
| W4 | tadpole with legs | ladybug · plant · **frog** |
| W5 | seedling | ladybug · butterfly · **plant** |
| W6 | froglet | **frog** · ladybug · plant |
| W7 | chrysalis | ladybug · **butterfly** · frog |
| W8 | ladybug pupa | butterfly · plant · **ladybug** |
Answer ring position (counted): left 2 (W1, W6) / middle 3 (W2, W3, W7) / right 3 (W4, W5, W8). The chick row is gone with the blocked chicken; W8 is the trap a teacher wants — a ladybug pupa offered beside a butterfly ring that also has a pupa stage.

### TWIN RINGS (G3-393) — butterfly ring (left) and frog ring (right), both full; 3 statements per round from the bank (truths from `ALC.STATEMENTS`)
| # | statements → place |
|---|---|
| T1 | egg → both · wings → butterfly · tail → frog |
| T2 | change → both · pupa → butterfly · water → frog |
| T3 | sixlegs → butterfly · nolegs → frog · egg → both |
| T4 | nectar → butterfly · fourlegs → frog · change → both |
| T5 | insects → frog · wings → butterfly · egg → both |
| T6 | tail → frog · pupa → butterfly · change → both |
| T7 | water → frog · sixlegs → butterfly · egg → both |
Each statement's proving stage (the ring turns it to face the card): egg → each ring's first stage; change → young and grown-up light together; pupa → chrysalis; wings, sixlegs, nectar → butterfly; tail, water, nolegs → tadpole; fourlegs, insects → frog.

- **Answer position.** FILL: the given stage rotates through every slot (the ring is drawn with slot 1 at the top but the GIVEN stage can sit anywhere — the ring is rotated so the given card lands at a random slot each round; gate: the right card's tray position ≤ 40 % in any one place). NEXT: answer tray slot 3/3/2 per pass. WHOSE YOUNG as above. TWIN: the three cards' tray order shuffled; both/left/right destinations balanced 7/7/7.
- **Order:** order-only reshuffle per pass (§A.13.60); "all cycles" passes never show the same cycle twice in a row.

## 7. Check, the misses, the success
- **Check with nothing placed** → no miss. Hint: "Drag a card into the slot the arrow points to."
- **Miss 1 (the ring shows it):** the wrong card slides out of the open slot and travels round the ring to the place where it really belongs in the cycle, shown as a ghost slot just outside the ring (e.g. the butterfly glides past the empty caterpillar and chrysalis places and settles beside the slot after the chrysalis), stays 1.2 s, then returns to the tray. Hint: "That one comes later. What comes out of the {previousStage}?"
- **Miss 2:** the open slot shows a faint outline of the stage that comes out next (silhouette, 25 % opacity) and the previous stage shudders as if trying to hatch. Hint: "Look at the {previousStage}. What does it turn into?" After the grown-up: "What does the grown-up lay?" (plant: "What does the plant make?")
- **NAME miss 1:** the wrong word slides to the stage it names (if on the ring) or back to the tray (decoy), glowing; miss 2: each picture's word-slot shows the word's first letter.
- **WHOSE YOUNG miss 1:** the young card is offered to that ring's gap: the egg before the gap and the grown-up after it both shake their heads (a 2-step wobble) — it cannot come from that egg nor grow into that grown-up; card returns. Miss 2: the right ring's gap glows.
- **TWIN miss 1:** the ring(s) turn trying to find a stage that proves the card; finding none, the ring stops and the card slides off; a true-for-both card dropped on one ring makes the OTHER ring also turn and light its proving stage, then the card moves to the both-plate as a ghost. Miss 2: the proving stage(s) glow before the next drop.
- A new move takes the help away.
- **Success:** FILL — the lap: the grown-up lays the first stage, the old ring steps out as a ghost ring; bubble: "Egg, caterpillar, chrysalis, butterfly — and the butterfly lays a new egg. Round and round!" (stage words from the bank). NEXT — the shown stage hatches the answer; "After the {stage} comes the {next}." WHOSE YOUNG — the young slides into its ring and grows round to the grown-up (one lap); "The {young} grows into a {adult}!" TWIN — both rings turn once; "Both change as they grow — but only the butterfly has a chrysalis, and only the frog's young swims with a tail." (authored per round from its statements).

## 8. Settings
1. **Cycle:** butterfly / frog / ladybug / plant / all cycles (the ring's slot count — 4 or 5 — and its diagrams change at rest; chicken joins "all cycles" only when its egg art lands).
2. **Task:** fill the ring / what comes next / name the stages / whose young / twin rings.

## 9. Words (EN source)
- title "The Cycle Wheel" (page "Life Cycles — Egg, Young, Grown-Up and Round Again (Grade 1)")
- instructions: FILL "Drag the stage that comes next into the open slot." · NEXT "What comes right after this one?" · NAME "Put each word under its stage." · WHOSE "Which ring does this young one belong in?" · TWIN "Is each sentence true for the butterfly, the frog, or both?"
- hints / celebrations: §7; `{stage}` words from the bank (`stageWords`, `landingWords`).
- aria: "Slot {n}: {stage}" · "Open slot after the {stage}" · "Ring: {cycle}".
- settings: "Cycle" · "Butterfly" · "Frog" · "Ladybug" · "Plant" · "All cycles" · "Task" · "Fill the ring" · "What comes next" · "Name the stages" · "Whose young" · "Twin rings".
- **Locale traps.** Stage words are school terms per locale and come from the reviewed bank: chrysalis = de Puppe, fr chrysalide, es crisálida, it crisalide, nl pop, sv/da/no puppe/puppa, fi kotelo — and **never "cocoon"** (the bank's `forbidden`: Kokon, cocon, capullo…). Ladybug = ladybird (en-GB) / Marienkäfer / coccinelle / mariquita / joaninha / leppäkerttu. Frogspawn: pt uses a string form (`spawnForm: 'string'`). Celebration sentences need articles/gender per stage ("the {young} grows into a {adult}") — authored as whole sentences per pair (8), never assembled. Statements in TWIN are whole sentences with animal-free subjects ("It hatches from an egg."; the bank's `drop` list removes any the locale cannot write animal-free).

## 10. Sound off, access, phones
- Legible with sound off: hatching, the lap and ring turns are motion; words only in NAME/TWIN.
- Keyboard path §5; announcements ("The caterpillar comes out of the egg").
- Taps ≥ 44 px (cards 116/88/80; word cards 48/44 tall).
- Stage diagrams 110 px at 704, 104 at 360, ≥ 92 at 320 (never below the primitive's 90 px floor; ladybug ≥ 100). No library pictures on the play surface.
- Check above the fold at 360 × 740 (≈ 640) and 320 × 640 (≈ 595).

## 11. Distinct from
- **#238 The Season Wheel** (a wheel that only turns forward — the year): there the child turns time; here the child places stages that hatch from each other, and the ring regenerates itself with a ghost generation.
- **#233 Mother and Baby → the Growing-Up Dial** (a baby wound forward into what it becomes): one young → one adult; this is the whole closed cycle back to the egg/seed, and WHOSE YOUNG asks where a young fits *between* an egg and a grown-up, not who its mother is.
- **#064 The Flipbook / story-line** (story sequence) — open-ended stories, not a closed biological loop.

## 12. Build plan
- **Core** `CycleWheelCore`: `CYCLES` (stage orders; successor = (i + 1) mod n, computed); `newRound(row)` → ring with given slots; `openSlot(state)` (first empty clockwise after the last filled); `drop(state, card)` → `{ok, belongsAt}`; `lap(state)` (new generation; ghost count ≤ 3); `nextGrade`, `nameGrade`, `youngGrade(card, ring)`, `twinGrade(stmt, target)` from `ALC.STATEMENTS`.
- **Gate's own truth** (`verify-cycle-wheel-core.js`): its own stage orders and its own successor rule; every FILL round's placing order recomputed; the after-the-adult FILL rounds are exactly {F2,F3,F4,F6,F8,F10} for 4-stage and {F2,F3,F4,F5,F7,F8,F10} for 5-stage cycles, and the ten FILL rounds of a cycle are ten distinct puzzles (no two with the same given set); no library picture shares a round with a diagram; every diagram ≥ its size floor; NEXT candidates from the same cycle; decoys from another cycle never accepted; statements' truths re-derived from the gate's own table; "cocoon" (and each locale's `forbidden`) never appears on any surface; balance numbers of §6.
- **Mutations (each killed):** the adult's successor is null (line) · a card accepted in a slot that is not open · the caterpillar accepted before the egg · a decoy from another cycle accepted · the lap fails to place the first stage · TWIN accepts "has a chrysalis" for the frog · WHOSE YOUNG accepts a tadpole in the butterfly ring · "cocoon" in the en words · the answer card always in tray slot 0 · a library butterfly placed in a diagram ring · the frog cycle shortened to 4 stages · a diagram rendered below 90 px.
- **CRITIC RULING — the stage diagrams (rendered and looked at, `scratchpad/des/work-c25/render264.js` → `stages-160.png`, `stages-110.png`, `stages-96.png`, `stages-72sim.png`):** `life-stage.js` (butterfly egg/larva/pupa/adult; frog spawn/tadpole/legged/froglet/adult; ladybird egg/larva/pupa/adult — each in its own teal lens) and `plantStage` (seed/sprout/seedling/flowering/fruiting in a soil box) are clean flat teal line-art SCIENCE DIAGRAMS in the shell palette, the same drawings the printed G1-377/388/389/390 sheets ship — tool-grade, exactly the standard of the accepted plant-figure diagram. **ALLOWED, on three conditions:** (1) a cycle is drawn ENTIRELY in this style, its grown-up included (the drawn butterfly, frog, ladybird, fruiting plant — never insects-and-bugs/butterfly or reptiles-and-amphibians/frog beside a drawn stage, never in one ring, one tray or one round); (2) no stage is shown below 104 px on a phone or 110 px on desktop where the ladybug is in play (at a simulated 72 px the ladybug egg cluster and pupa become orange smudges; the primitive itself throws below 90 px); (3) the bank's LOOKALIKE pairs (froglet/frog) are never both on a row where one is the answer. The stage WORDS come from the reviewed bank (`stageWords`, `landingWords`, plus plant words authored once ×11 from the G1-388 locale strings).
- **Pictures used:** none from the library on the play surface — every card is a diagram. (insects-and-bugs/caterpillar, butterfly, ladybug and reptiles-and-amphibians/frog exist but are NOT used: mixing them with drawn eggs is forbidden.)
- **STILL BLOCKED — chicken only:** a plain hen's egg as a library picture with vocabulary labels ×11 (easter/egg is painted; the supermarket egg tray is unlabelled). With it, the chicken cycle is egg (new) → farm-animals/chick → farm-animals/hen, all library, never beside a diagram cycle in one round. Until then G1-203 is not covered by this activity (recorded for ART-NEEDS).
- **Risks:** the plant stages are wider than tall — they sit in a round cream card of the slot's size, scaled to the card (gate: every stage's ink box ≥ 104 px on its long side on a phone). The 5-slot rings fit at 360 only at r 108 / slot 110 — measured above.

## 13. The four questions
1. **Choose it again?** Yes — stages hatching out of each other, and the grown-up laying a brand-new egg that pushes the old ring out like a growth ring, is a small magic trick every time.
2. **Teacher on the board?** Yes — "what comes after the butterfly?" is exactly where first graders stumble, and the ring answers it by laying an egg.
3. **Parent trust?** Correct biology from a reviewed table, no cocoons, no scores — and it waits for honest pictures rather than faking a cycle.
4. **Invention:** each stage can only come out of the one before it, and the full ring lays its own beginning — the cycle never ends.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 2→4 (chicken still blocked)
What changed:
- Ruled the fallback by RENDERING it (work-c25/render264.js; stages-160/110/96/72sim.png): life-stage.js + plantStage are tool-grade teal science diagrams — ALLOWED as the primary art, each cycle entirely in that style (grown-up drawn too), never mixed with library pictures; size floor 110 px desktop / 104 px phone (the ladybug egg cluster and pupa smudge at 72; the primitive throws below 90). Butterfly, ladybug, frog and plant are buildable now; only the chicken (no plain egg) stays BLOCKED, so G1-203 waits.
- Cycles now follow the reviewed banks: frog has 5 stages (with "tadpole with legs"), plant has the G1-388 five (seed → sprout → seedling → flowering → fruiting); 5-stage FILL table written.
- FILL table fixed: F9/F10 duplicated F5/F6 (8 distinct puzzles, not 10) and the "7 of 10 anti-line rounds" claim was false (6 is the maximum for a 4-cycle); now 10 distinct puzzles, anti-line sets 6/10 and 7/10 stated exactly for the gate.
- Phone sizes rebuilt to the diagram floor (5-slot ring r 108 / slots 110 measured to fit 336); WHOSE YOUNG became three ring SLICES (three whole rings forced 72 px); TWIN on phones uses tabs. NEXT answer slot fixed by table; LOOKALIKE pairs kept apart.
