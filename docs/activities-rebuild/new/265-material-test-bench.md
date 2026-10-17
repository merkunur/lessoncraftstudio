# New 265 — The Material Test Bench → THE PUNCH-CARD KEY (NGSS 2-PS1-1)

## 0. Identity
- **id** `material-test-bench.play.2-ps1-1` · grade 1 · NGSS **2-PS1-1** (describe and classify materials by their observable properties) · strand Science · framework via `frontend/lib/frameworks.ts` · own files `material-test-bench-core.js`, `material-test-bench-activity.js`, `material-test-bench-activity.html`, `material-test-bench-activities.json`.
- **Worksheets covered:** G1-364 "Recycling Sort: What Is It Made Of?" → SORT · G2-348 "Recycling Sort: Odd One Out" → ODD ONE OUT. G1-365 "Three Things I Recycle" (draw at home) stays a worksheet (recorded).
- **Merged:** grade 2 "The Material Test Bench — What Is It Made Of?" (material-bench) → the tests themselves and ODD ONE OUT.

## 1. The pitch
"Every test you run on a thing punches — or doesn't punch — one hole in its tag; each material bin has a slot shaped like its own pattern of holes, so the tag only slides into the bin whose material it really is."

## 2. Why a child will want it again
- **A real test bench.** A thing (a library picture) stands on a workbench under a hanging tag. Four test tools wait in a rack: a horseshoe MAGNET, a WATER DROPPER, a PRESS that pushes down, and a LAMP. The child drags a tool onto the thing and the test happens: the steel can jumps across and *clacks* onto the magnet; a drop soaks into the envelope with a spreading dark stain, or beads up on the glass and rolls off; the press squashes the plastic bottle (it bounces back) but goes *tok* on the glass; the lamp's beam passes through the glass and lights the screen behind, or stops dead at the chair.
- **The hole punch.** Each test that comes out YES punches a hole in the tag's window with a satisfying *chk* and a little paper dot falling. The tag becomes the thing's fingerprint.
- **The key and the lock.** Each bin's lid has a slot cut in its pattern of holes. Drop the thing on a bin: its tag slides into the slot — and only goes all the way in when the holes match; then the thing tips in with a material sound (glass *clink*, metal *clang*, paper *fff*, wood *tock*, plastic *thup*).
- **The stack show (ODD ONE OUT).** The three same tags slide together into a stack and the lamp shines straight through their lined-up holes onto the screen — one bright spot — while the odd tag hops out.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** things are made of materials — metal, glass, plastic, paper, wood — that we can tell apart by testing their properties (magnetic, soaks up water, bends, lets light through), and we sort them by material for recycling (G1-364); find the one made of a different material (G2-348).
- **Misconception 1 — "shiny means metal".** The glass tumbler and the clear water bottle shine; the magnet does nothing to them. The printed red-and-white tin can doesn't look like shiny metal; the magnet grabs it.
- **Misconception 2 — "clear means glass".** The clear plastic water bottle lets light through like glass — but the press squashes it. The tag shows LIGHT + BENDS, and the glass slot has a peg where the BENDS hole would be.
- **Misconception 3 — "brown means wood"** (the cardboard package beside wooden furniture in ODD ONE OUT): water soaks into the card and the press bends it.
- **Misconception 4 — judging by the CONTENTS or the use** ("it's water", "it's shampoo"): the bench names every container as a container ("the water bottle", "the shampoo bottle", "the glue bottle") and the tests are run on the container, so the child learns the bottle has a material, not its contents.
- **How the material pushes back:** a key whose holes don't match cannot enter a lock — the tag physically jams at the window that disagrees.

## 4. The stage
`layout:'split'` at ≥ 700 px: bench left, bins right.

**At 704 px (stage 672 × ≈ 430):**
- **The bench** (left, 360 × 360): a wooden workbench top (geometry) with a back board. The THING — library picture, 150 px — stands centre. Above it hangs **the tag** (cream card 200 × 64, string to the thing) with 4 windows (36 px squares) in a fixed row, each headed by its test icon (16 px geometry): magnet · drop · press · lamp.
- **The test rack** (bench back board): four tools 72 × 72 each — horseshoe magnet (red/silver), dropper (glass tube with a blue drop), press (a small vice with a flat foot), lamp (a desk lamp shape with a beam) — all apparatus geometry. Behind the thing on the right, a small **screen** (white rectangle 40 × 120) for the lamp test.
- **The bins** (right, 280 wide): 5 bins (3 in the 3-material setting) as a 2-2-1 grid, each 130 × 110: a grey bin body, the material WORD on it (content, 17 px) — no example pictures on bins (they would be a second answer key). **Each lid shows its slot:** the same 4 windows as the tag, where a window the material needs as a hole is drawn as an open hole, a window it needs solid is drawn as a peg, and an "either" window (plastic's lamp) is drawn as a striped half-hole.
  - metal: hole · peg · peg · peg
  - paper: peg · hole · hole · peg
  - plastic: peg · peg · hole · either
  - glass: peg · peg · peg · hole
  - wood: peg · peg · peg · peg
- **The queue**: the round's next things at 96 px in a row under the bench.
- **Task line** above (≤ 24 px).
- No words on the apparatus except the material names on the bins (content).

**At 360 px:** stacked. Bench 336 × 300 (thing 120 px, tag 200 × 54, tools 56 px in a row along the top), bins below as a row of 3 (104 × 96) or 3 + 2 (5 bins), queue as small dots (no shrunken pictures). Check at ≈ 650. **320 × 640:** thing 110 px, tools 52, bins 96 × 88, Check ≈ 605.

## 5. The hand
- **Drag a test tool onto the thing** (snaps when within 60 px):
  - **magnet:** if magnetic, the thing slides 12 px toward the magnet and clings (180 ms, *clack*); else the magnet hovers and nothing moves (400 ms, a soft "hmm" tone).
  - **dropper:** a blue drop falls (300 ms); soaks: a darker stain spreads on the picture (radial mask, 500 ms) and stays; no soak: the drop sits as a round bead, then rolls off the edge.
  - **press:** the foot comes down (200 ms); bends: the picture squashes 10 % (scaleY 0.9 with a soft bulge) and springs back; stiff: the foot stops on it with a *tok* and the bench shakes 2 px.
  - **lamp:** a beam from the left; see-through: the beam continues through the thing and a bright spot appears on the screen; opaque: the beam stops at the thing and the screen shows the thing's shadow.
  Each result punches the window (yes → a 24 px hole with a falling paper dot and *chk*; no → the window gets a small dash, stays solid). Re-running a test repeats the animation (the card does not change). The tool returns to the rack.
- **Drop the thing on a bin** (drag the thing; its tag comes with it): the tag slides into the lid slot (300 ms). Matching holes/pegs: it slides fully in, the thing tips in with its material sound, the lid closes. Mismatch: see §7.
- **Unrun tests:** if a window is still blank when the tag reaches a lid, the lid runs that test itself first (its own small tool icon flashes and the result punches) — the bin never guesses.
- **ODD ONE OUT:** four things stand on a long bench, each with its own tag; tests can be dragged onto any of them; the child taps the odd thing and presses Check.
- **Keyboard:** Tab: tools → thing → bins; Enter runs/places.
- **Free play:** after a round, any tool can be tried on any thing in the finished bins (they come back out on a tap), and the magnet can be waved over the whole bench.

## 6. The rounds
### The truth table (critic-rebuilt 2026-10-17: every thing is ONE material that a test can touch, and the picture shows it)
**Rule:** a test bench must never lie. A milk bottle with a steel crown cap would make the magnet grab "glass"; a jar's screw lid, an oil bottle's cork, a jam jar's cloth cover, a grater's plastic top all give a second material a test can hit — so every closure- or handle-bearing object is OUT here (they stay correct on the printed recycling sheets, which ask only for the product's main material). Checked against `mini tools/pictures/*.json` and the contact sheets: around-the-house/glass (wine glass), classroom/paper and at-the-supermarket/cereal are drawn but have NO lcs-pictures label — not usable.
| thing (library) | shown name (per-activity override — NEVER the vocab label where it names the contents) | material | magnet | soaks | bends | light through |
|---|---|---|---|---|---|---|
| at-the-supermarket/can (printed food tin) | "the tin can" | metal (steel) | yes | no (the drop lands on the silver lid — authored hit-point) | no | no |
| tools/nail | "the nail" — en/de from the label; other locales from image-vocabulary `metal-nail` (fr clou, es clavo, pt prego, it chiodo, nl spijker, sv spik, da søm, no spiker, fi naula), because the lcs-pictures label is the FINGERNAIL word | metal (steel) | yes | no | no | no |
| kitchen-tools/glass (tumbler) | "the glass" | glass | no | no | no | yes |
| at-the-supermarket/water (clear PET bottle, blue cap — also plastic) | "the water bottle" (never "water": water is not made of plastic) | plastic | no | no | yes | yes |
| at-the-supermarket/shampoo (pink pump bottle) | "the shampoo bottle" | plastic | no | no | yes | no |
| beach/sunscreen (tube) | "the sunscreen tube" | plastic | no | no | yes | no |
| classroom/glue (squeeze bottle) | "the glue bottle" | plastic | no | no | yes | no |
| around-the-house/comb (orange) | "the comb" | plastic | no | no | yes | no |
| kitchen-tools/spoon (purple plastic — picture ruling) | "the spoon" | plastic | no | no | yes | no |
| toys/bucket (blue sand bucket) | "the bucket" | plastic | no | no | yes | no |
| post-office/envelope | "the envelope" | paper | no | yes | yes | no |
| post-office/letter | "the letter" | paper | no | yes | yes | no |
| classroom/notebook | "the notebook" | paper | no | yes | yes | no |
| post-office/package (cardboard) | "the box" | paper (card) | no | yes | yes | no |
| furniture/chair | "the chair" | wood | no | no | no | no |
| furniture/stool | "the stool" | wood | no | no | no | no |
| furniture/bench | "the bench" | wood | no | no | no | no |
| furniture/table | "the table" | wood | no | no | no | no |
| around-the-house/fence (wooden pickets) | "the fence" | wood | no | no | no | no |
Refused (and why): kitchen-tools/jar (lid), at-the-supermarket/milk (cap), oil (cork), jam (cloth), sauce (cap), breakfast/honey (wooden lid), kitchen-tools/grater (plastic top), whisk/knife/fork/hammer/screwdriver (two materials), saucepan (copper — not magnetic), tools/bolt (brass — not magnetic), tools/nut (painted red-yellow, reads as plastic), aluminium drinks cans (not magnetic), juice/soda bottles (glass or plastic unclear), around-the-house/glass, classroom/paper, at-the-supermarket/cereal (unlabelled).
Signatures are unique: metal M · paper W+B · plastic B (± L) · glass L · wood none.
**Honest thinness, recorded:** the library holds only TWO single-material magnetic metal things and ONE single-material glass thing. Metal therefore appears 4 times and glass twice per 5-material pass (never padded with a two-material picture). ART-NEEDS: a lidless clear glass jar or bottle; a plain steel spoon or paper clip.

### SORT, 5 materials — 8 rounds of three things
| # | things (material) |
|---|---|
| S1 | can (metal) · water bottle (plastic) · envelope (paper) |
| S2 | glass (glass) · chair (wood) · shampoo bottle (plastic) |
| S3 | nail (metal) · notebook (paper) · stool (wood) |
| S4 | sunscreen tube (plastic) · box (paper) · bench (wood) |
| S5 | letter (paper) · table (wood) · comb (plastic) |
| S6 | can (metal) · glue bottle (plastic) · fence (wood) |
| S7 | glass (glass) · envelope (paper) · bucket (plastic) |
| S8 | nail (metal) · notebook (paper) · chair (wood) |
Measured per pass: metal 4 · glass 2 · plastic 6 · paper 6 · wood 6 (24); no thing more than twice.

### SORT, 3 materials (metal · paper · plastic; the lamp tool is hidden) — 8 rounds
S1 can · water bottle · envelope · S2 nail · shampoo bottle · letter · S3 sunscreen tube · notebook · glue bottle · S4 can · box · comb · S5 bucket · letter · spoon · S6 nail · spoon · envelope · S7 glue bottle · notebook · water bottle · S8 comb · box · shampoo bottle. Per pass: metal 4 · plastic 12 · paper 8; no thing more than twice.

### ODD ONE OUT (G2-348) — 8 rounds, four things, three share a material (the three-sets are paper, plastic or wood, because metal and glass have too few honest pictures)
| # | the three | the odd one (and its trap) | odd place |
|---|---|---|---|
| D1 | water bottle · shampoo bottle · sunscreen tube | glass — glass (as clear as the water bottle: only the press tells them apart) | 1 |
| D2 | chair · stool · bench | box — paper (brown like wood) | 2 |
| D3 | envelope · letter · notebook | glue bottle — plastic | 3 |
| D4 | comb · bucket · spoon | can — metal | 4 |
| D5 | chair · table · fence | nail — metal | 1 |
| D6 | box · envelope · notebook | water bottle — plastic | 2 |
| D7 | glue bottle · shampoo bottle · bucket | glass — glass | 3 |
| D8 | stool · table · fence | letter — paper | 4 |
The odd thing stands in each of the four places exactly twice per pass (column above); odd materials glass 2 · paper 2 · plastic 2 · metal 2.

- **Answer position.** SORT: bins are fixed furniture (metal, paper, plastic top row; glass, wood below), so balance is measured on things: the first thing shown in a round rotates through the round's materials so no bin receives the first thing of two consecutive rounds and each bin takes ≤ 30 % of first things per pass. ODD ONE OUT: odd place fixed by the table, 2/2/2/2 (counted). Shortcut bots measured by the critic: "pick the clear one" is right in D1 only if it is the glass — D1 holds TWO clear things (glass and water bottle), so a look-only child is at 50 %; "pick the brown one" fails D2 (four brown things) — only the tests decide.
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Drop / Check with nothing done** → no miss. Hint: "Try a test on the thing, or put it in a bin."
- **SORT miss 1:** the tag slides into the wrong slot and **jams at the first window that disagrees**; that window glows coral on both tag and lid; the test tool for that window flies from the rack and re-runs on the thing right there (e.g. clear bottle in the glass bin: the press comes down and the bottle squashes — the glass slot has a peg there). The thing slides back to the bench. Hint: "Look at the window where the tag stuck. What did that test show?"
- **SORT miss 2:** every bin lid whose pattern disagrees greys a little; the matching lid stays bright. Hint: "Find the lid with the same holes as the tag."
- **ODD miss 1:** the three tags the child did not pick try to stack: if the child picked a same-material thing, the stack of the three remaining tags shows a window where one disagrees (the lamp shines through two holes and is blocked by the third card); the beam shows where they differ. Hint: "Line up the tags. Which one has different holes?" **ODD miss 2:** any test not yet run on the four things runs on all of them at once, punching all four tags.
- A new move takes the help away.
- **Success:** SORT — the bins close; the last thing's tag shines; bubble: "{thing} is made of {material} — the {test} showed it!" (the decisive test: magnet for metal, soak for paper, press for plastic, lamp for glass, "no test said yes" for wood → "Nothing stuck, soaked, bent or shone through — it's wood."). ODD — the three tags stack and the lamp shines through all their holes as one spot; the odd thing hops out; "Three are {material}, but the {odd} is {oddMaterial}!"

## 8. Settings
1. **Materials:** 3 (metal, paper, plastic) / 5 (+ glass, wood) / odd one out — 3 bins with the lamp hidden, 5 bins, or the long four-thing bench. At 3 the tag and the lids have three windows (magnet · water · press): metal hole·peg·peg, paper peg·hole·hole, plastic peg·peg·hole.
2. **Tests:** on / off (sort only) — "off" hides the rack; the child sorts by knowledge and each bin's lid runs the tests itself as the check (the tag is punched as it enters).

## 9. Words (EN source)
- title "The Material Test Bench" (page "What Is It Made Of? Test and Sort Materials (Grade 1)")
- instructions: SORT "Test the thing. Then put it in the bin for its material." · Tests off "What is it made of? Put it in its bin." · ODD "Three things are made of the same material. Tap the odd one out."
- material words (content, on bins): metal · glass · plastic · paper · wood.
- test names (hints only): magnet · water · press · light.
- hints and celebrations: §7. Celebration test phrases: "the magnet pulled it", "the water soaked in", "it bent under the press", "light shone through".
- aria: "Tag: magnet {yes|no}, water {yes|no}, press {yes|no}, light {yes|no}" · "{material} bin" · "Run the {test} test".
- settings: "Materials" · "3" · "5" · "Odd one out" · "Tests" · "On" · "Off".
- **Locale traps.** "Wood" vs "tree": fi "puu", da "træ" and sv "trä/träd" (trä = wood, träd = tree) — the bin word is the MATERIAL form (reviewer). "Paper" includes cardboard in every school recycling scheme, but de says Papier/Pappe — the bin may read "Papier" and the package is fine. Bin COLOURS and groupings differ by country (de Gelber Sack mixes plastic and metal; fi, nl, it differ) — so bins are neutral grey with the material word, and the activity sorts by MATERIAL, never claims a country's bin colour (the #241 Bin Windows ruling). Thing names are the per-activity CONTAINER names of the truth table (water bottle, shampoo bottle, sunscreen tube, glue bottle, tin can, box; nail from image-vocabulary `metal-nail`), authored ×11 with article/gender, never the bare vocab label that names the contents; the celebration "{thing} is made of {material}" needs gender/article per locale → authored per material with the thing as a separate noun phrase from the vocab plural/singular table, reviewed. "Shiny" is never written on screen.

## 10. Sound off, access, phones
- Legible with sound off: every test result is visible (cling, stain/bead, squash, beam/shadow) and punched; material sounds are extras.
- Keyboard path §5; announcements ("The magnet pulled the can. Hole punched.").
- Taps ≥ 44 px (tools 72/56; bins ≥ 88; things ≥ 110).
- Pictures 150 at 704 on the bench, queue 96; phone 120/110 on the bench, the queue becomes dots.
- Check above the fold at 360 × 740 (≈ 650) and 320 × 640 (≈ 605).

## 11. Distinct from
- **#242 The Life Test** (three lamps that light with evidence of life) — that bench tests living vs non-living with lamps; this one tests MATERIAL with physical tools and turns the results into a key that must fit a lock.
- **#241 Bin Windows** (a lid that will not shut on a stranger: sameness of contents, by kind) — this lid checks a property pattern, not likeness.
- **#234 The Where-From Thread** (natural vs made-by-people) — origin, not material properties.
- **#235 The Water Tub** (sink/float) — one property; here four, combined.

## 12. Build plan
- **Core** `MaterialBenchCore`: `TRUTH` (table above); `LIDS` (hole/peg/either per material); `runTest(state, thing, test)` → yes/no; `tag(state)`; `fits(tag, lid)` → `{ok, firstMismatch}` (unrun windows run by the lid); `sortGrade`, `oddGrade(state, pick)` → the odd index re-derived from materials; `decisiveTest(material)`.
- **Gate's own truth** (`verify-material-test-bench-core.js`): its own material table and its own signature rule; every signature unique and every thing's tag fits exactly ONE lid in both 3- and 5-material sets; every ODD round has exactly one thing of a different material; refused nouns never appear; every picture file exists and no B&W theme is referenced; balance numbers of §6.
- **Mutations (each killed):** a closure-bearing picture (milk, jar, oil, grater) admitted · a container shown under its CONTENTS word ("water", "shampoo") · the fingernail label shown for tools/nail outside en/de · the clear bottle fits the glass lid · the wood lid accepts a magnetic thing · the plastic lid's "either" window becomes "must be hole" (shampoo jams) · the lid guesses instead of running an unrun test · the magnet pulls the glass · paper does not soak · ODD accepts a same-material pick · the odd thing always in place 4 · the press bends the nail.
- **Pictures (all 19 confirmed in the theme JSONs and opened on the contact sheets by the critic):** at-the-supermarket/{can, water, shampoo}, tools/nail, kitchen-tools/{glass, spoon}, beach/sunscreen, classroom/{glue, notebook}, around-the-house/{comb, fence}, toys/bucket, post-office/{envelope, letter, package}, furniture/{chair, stool, bench, table}.
- **Risks:** the can's printed label — the water drop is authored onto its silver lid rim; varnished wood beading water is stated in the teacher notes; the nail's label override (metal-nail) is gated per locale. Metal and glass are thin (2 and 1 honest pictures) — recorded in ART-NEEDS, never padded. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — magnets that grab, drops that soak, a squashy bottle, a lamp beam, a hole punch and a lock that only takes the right key: five toys in one bench.
2. **Teacher on the board?** Yes — it is a real properties investigation ("how do we KNOW it's plastic?"), and the clear-bottle and shiny-glass traps are exactly the classroom arguments.
3. **Parent trust?** A reviewed truth table, honest refusals (no aluminium cans, no two-material things), no country-specific bin claims, nothing sold.
4. **Invention:** each test punches a hole in the thing's tag, and the tag is a key that only fits the bin cut to its material's pattern.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 2→4 (metal and glass thin by honest refusal)
What changed:
- Truth table rebuilt to single material: milk (steel cap — a real magnet would grab "glass"), jar (lid), oil (cork), grater (plastic top) refused; around-the-house/glass, classroom/paper and at-the-supermarket/cereal are drawn but unlabelled (checked against the theme JSONs) — refused. 19 things survive, every one opened on a contact sheet; the thinness (2 metal, 1 glass) recorded for ART-NEEDS instead of padded.
- Containers are named as containers ("the water bottle", never "water is made of plastic"); tools/nail uses image-vocabulary metal-nail outside en/de (its label is the fingernail word).
- All three round tables rewritten and counted: 5-material metal 4 · glass 2 · plastic 6 · paper 6 · wood 6; 3-material 4 · 12 · 8; ODD odd place 2/2/2/2 and odd material 2/2/2/2. Look-only bots measured against the table: "pick the clear one" 50 % in D1 (two clear things), "pick the brown one" useless in D2.
