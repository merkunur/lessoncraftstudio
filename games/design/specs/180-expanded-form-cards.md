# 180 — The Gate Road

## Identity
- Slug: `expanded-form-cards`
- Subject / topic: Mathematics / expanded form of a three-digit number with ARROW CARDS — 346 = 300 + 40 + 6, built by overlaying a hundreds card, a tens card and a ones card; a zero place uses a blank card
- Age band: `8-9`
- Interaction pattern: `P2` — tap to place (tap a plate in the barrow rack, then tap the barrow bed; the pattern is now only how the finger reaches the world, per GAME-DESIGN-LAW §3)
- Frame: THE OPENING
- Estimated build size: ~700 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14, with §7's zone A/B/C replaced by the MISSION LAYOUT (`MISSIONS.md` §1.4) and §6's progress display replaced by diegetic progress. Pattern contract: `catalogue/PATTERNS.md` P2. Frame contract: `MISSIONS.md` FRAME 3. **Arrow cards, not place-value blocks**: the free activity owns blocks (and game 038 `three-digit-builder` owns flats, rods and cubes at this same objective), so no rod, cube or flat may appear anywhere in this game — the manipulative is the overlay of three number plates whose arrow tips line up on the right, so that 300, 40 and 6 stacked READ as 346. Content is language-neutral (numerals only).

**Frame fit, declared rather than assumed.** THE OPENING is right on its isomorphism — *the amount you supply is the size of the opening* — and its catalogue entry names P2 and the "supply a quantity, walk through the gap it made" shape. It is bent on one detail and the bend is stated at the top so no reviewer has to discover it: **the frame's aperture-equals-MAGNITUDE signature does not survive here, and could not.** A place-value error is not a magnitude error — 346 and 364 differ by 18 in 1000, about 11 px on any drawable scale — so every magnitude realisation of this objective is illegible by construction. What survives is the signature's *purpose*: the gate opens by exactly as many **places** as the number is right, and partial knowledge produces partial, legible, non-punishing progress. That same fact is what keeps this game structurally distinct from `179 thousand-line`, which is a number line and is about magnitude.

## Learning
- Objective: Builds a three-digit number from a hundreds card, a tens card and a ones card chosen from a tray, overlaying them on a base so the stack reads the number, and uses the blank card for a place that holds nothing.
- Prerequisites: Reads three-digit numerals; knows 300 is three hundreds (games 038, 179 territory); has built two-digit numbers (game 018).
- Curriculum links: F-108 (digits as independent numbers; zero placeholder ignored; syntactic transcoding 105 → "one hundred and five" built as 100 + 10 + 5; de/nl/da inverted tens and ones; "place-value tile overlay" is the named response), F-102 (writing as heard), F-21, F-31 row "Numbers to 1000; +/− 3-digit" — conservative 8-9 → 8-9 (US 2.NBT.A.3 "read and write numbers to 1000 using … expanded form"; England Y3 "recognise the place value of each digit in a three-digit number"; Germany Klasse 3 "Stellenwerttafel, Zahlen bis 1000"; France CE2 "décomposer un nombre en centaines, dizaines et unités"; Netherlands groep 5 "honderdtallen, tientallen, eenheden"; Spain 2º ciclo "descomposición"; Brazil EF03MA02; Sweden åk 3 "positionssystemet"; Denmark 3. klasse; Norway 3. trinn; Finland grade 3).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Digits as independent numbers — 346 built from 300 + 4 + 6, or wanting a "3" card for the hundreds.** Response: re-staged as **width**, and mostly *prevented* rather than corrected. There is no bare-digit plate anywhere on the road: the hundreds rack holds 300 / 600 / 400 / 200, never a "3". Each channel in the barrow bed is cut to one width, and **selecting a plate lights the one channel its width fits and outlines the leaf above it** (`ART.channelLit` + `ART.leafGhost`) — so a one-cell plate is visibly, physically too short to bar the two-cell tens channel, every time it is picked up, before any error is possible. If the child nonetheless bars the tens with the swap value and turns the crank, the tens leaf stays down and the enacted correction runs: `ART.digitHi` outlines the cut tens digit on the leaf that did not rise, the plate under it `ANIM.pulse`s, and then **the tens channel's two cells light one at a time** (`ANIM.cellCount`, `tone("tap", 5)` each) — a tens bar is two cells long, so its value is 40, not the digit 4. *Declared honestly: the original spec's own text for this response — a fan-out reading "300 + 4 = 304" — was already unreachable there, because Check was disabled until every position held a card. The diagnosis is re-staged, that particular animation is not inherited, and the width refusal is the stronger enactment.*
  2. **Zero placeholder ignored — 306 built as 300 + 6 with the tens position empty, or 450 built with the ones position empty (F-108 "empty tens shown as an empty slot").** Response: strengthened. **The crank is dead until all three channels are barred** — dimmed to alpha 0.5 and it will not turn; a leaf cannot be lifted by a bar that is not there, so every place must be declared, including a zero. The bar for a zero place is the **grating** (`ART.grating`): a plate that is not a plate but an open frame, which seats, bars its channel, and lets the 0 cut in the hundreds plate read straight through it, so the stack reads 306. If the child stalls with a channel empty for 6 s the plate that fills it `ANIM.pulse`s once — the grating when that place is zero, otherwise nothing, because the child must find the value. Nothing about elapsed seconds is displayed and nothing ends.
  3. **Transcoding as heard — 105 built as 100 + 10 + 5 ("one hundred and five") = 115.** Response: preserved exactly, re-sited in stone. The 10 plate bars the tens channel; the crank turns; the hundreds and ones leaves rise; **the tens leaf stays down with its cut "0" directly above the "1" of the 10 plate.** `ART.digitHi` takes that cut 0 (the screen's one coral) while the 10 plate pulses beneath it, 900 ms; `ART.sumText` on the barrow's near face reads "115" against the gate's cut 105. The child lifts the 10 plate out and seats the grating.
  4. **Inverted tens and ones (de/nl/da "dreihundertsechsundvierzig" → 300 + 60 + 4).** Response: strengthened into one picture instead of two sequential hints. Two leaves stay down **side by side**, cut "4" and "6", over plates reading 60 and 4, in aligned columns — the inversion is a single still frame. The cue then runs tens first, then ones: `ART.digitHi` on the cut digit while the plate under it `ANIM.pulse`s, 900 ms each, exactly the original's order and duration. The stack's left-to-right layout is the anchor, not the word order.
  5. **Reading the stack as a sum of digits or as digits side by side (300, 40, 6 → "346" seen as "300406").** Response: this is the design's best property, because the gate performs the equivalence. **Closed, the gate IS the numeral** — three leaves down, 3 4 6 cut across them, with three plates nested in the bed beneath reading 346. **Open, the gate IS the expansion** — the leaves swing up carrying their digits to the lintel, and the plates rise into the gateway and step apart (`ANIM.fanOut`) into a right-stopped staircase reading 300 / 40 / 6, each plate's leading digit landing exactly under its own cut digit. The transformation from one to the other is caused by the child's own crank, and the staircase **stays in the gateway for the rest of the session**, because the plates are what hold the leaves up. By the Finish the road carries nine of those, foot to summit.

## Mission
**Mission, as the child would say it.** *Open the gates so everyone can come up.*

**The hero.** A badger keeper, pushing a plate-barrow. New roster entry `badger.idle / think / happy / act` (roster line, `ART-BIBLE` §3). Her natural ink-and-white markings are built from `surface2` tints and `ink` and spend **none** of the one-coral-per-screen budget, which the place cue keeps. She is agentive in the literal sense: she is the only thing on the hill that moves, she moves because the child finished a gate, and where she stands **selects which number the game is about**. Her pose set during play is `idle` (walking the road) and `think` (paw on the crank, looking up at a leaf that did not rise). **`oops` is never used in this game** — a barred leaf is the gate's state, not hers, and the reviewer check on the wrong-answer screenshot passes by construction.

**The want (the visible lack), legible in one still frame at item 1 with nothing moving.** A badger at the foot of a zigzag hill road. Across the road in front of her, a gate: three stone leaves down, a three-digit number cut through them, and a hedgehog standing behind the bars looking out. The road switchbacks up past eight more barred gates, their faces still packed with river silt. Top right, a fire-ring with one old badger beside it and nine empty places round the stones. Her barrow is parked at the gate with its bed empty. **The road is shut and everybody is on the wrong side of it** — Device 1, THE WAITING PARTY, drawn from tap one, unchanged until the Finish, and it is why the numeral cut in the gate matters.

**Text budget.** The premise is two short sentences on the Boot screen and there are **zero words during play**. The original's caption `S("buildIt")` and its `question_x_of_y` counter are both deleted; the picture carries it. That is under the 8-9 budget, not at it.

**The single state variable.** `S` = **which of the current gate's three stone leaves are raised.**
- **Mathematical reading.** Which places of the gate's number the child has correctly expanded — hundreds, tens, ones — each independently true or not yet true.
- **Physical reading.** How much of the gateway stands open. Nought, a third, two thirds, or through.

**The goal predicate.** All three leaves up → the road is through → the keeper and that gate's family walk on and up the hill.

**The transition function on `S` is the arrow-card reading rule itself, executed by the gate.** A leaf rises **iff the topmost plate covering that leaf's column shows that leaf's cut digit.** A hundreds plate covers all three columns with 3-0-0; a tens plate laid over it re-covers the last two with 4-0; a ones plate re-covers the last with 6. What the stack reads is what the gate lifts. In one line, and note what is absent from it:

```js
// no `answer` field exists anywhere in this game
const top = topmostPlateOver(col);                       // what is actually barring this column
accepted = (top.digitAt(col) === gate.cutDigitAt(col));  // will the stonework let this leaf up?
```

There is no target card, no Check tile, no correctness comparison against a stored value. The crank asks the stonework whether the bars clear the leaves.

**The isomorphism — the plates you lay ARE the bars you draw, and the gate opens by exactly as many places as your number is right.** Geometry does the whole job, and it is the arrow card's own geometry, unchanged. Each gate's number is cut through its three stone leaves, one digit per leaf, at a 40 px cell pitch, columns at `gate.x −40 / 0 / +40`. The barrow bed sits directly beneath at the **same pitch and the same right-hand stop**, so a seated plate's digits stand in the same columns as the cut digits, one above the other. The channels are cut to width, so a ones plate physically cannot bar the two-cell tens channel. Turn the crank and each leaf tries to rise. **The child never states a fact about a number; the child bars a gateway, and the gate lifts by exactly as much of itself as the barring justifies** — THE OPENING's signature verbatim. Supply 300 + 60 + 4 at gate 346 and you get a gateway a third open, with two leaves still down and the digits 4 and 6 cut in them, over plates reading 60 and 4, in aligned columns.

**Moving is solving, twice over.** (1) **The keeper's position selects the item** — the gate she is standing at IS the number she must open, so `target = f(keeper.position)`; there is no ask-ring, no question card and no target tile, and she never controls the order. (2) **The placing is the answer** — `answer = f(the physical configuration of bars in a real gate)`, which is §2.3 met in the **placing** form that GAME-DESIGN-LAW §4.1 licenses for P2 ("expresses agency by operating, building or placing rather than by walking"), not the walking form. The commit handler reads what is seated in stone; it never reads a tile id and then animates a walk. *This is declared, not hidden: a reviewer who wants `f(character.position)` literally should settle it here rather than at build time. The blessed precedent is MISSIONS §6.1's owl, whose commit reads the cradle's altitude rather than her coordinates.*

**The mark that stays.** Every opened gate keeps its three swung leaves and its three stepped plates for the rest of the session, permanently showing its own expansion in aligned columns. Its family stays out on the road where it came out. Nothing is ever redrawn or reset (L2 / M3): the world visibly remembers, gate by gate, all the way to the Finish.

## World
**Zone W (56-420) — the hill road, the nine gates, the hero, the fire-ring. All of it, all session.** Zone H (420-560) carries the barrow's plate rack: this is a P2 game and the plates are what the child plays.

```
 0                                                                      720
 ┌────────────────────────────────────────────────────────────────────────┐
 │ [lang 16,16]                            zone T 0-56  chrome only       │
 ├────────────────────────────────────────────────────────────────────────┤
 │  gate 7      gate 8      gate 9              ( fire-ring 658,92 )      │
 │  ▓▓▓         ▓▓▓         ▓▓▓                  elder + nine places      │
 │ ══════════════════════════════════   tier 3  sill 132   walk L→R       │
 │ ╱ ramp B                                                               │
 │  gate 6      gate 5      gate 4                              ramp A ╲  │
 │  ▓▓▓         ▓▓▓         ▓▓▓                                           │
 │ ══════════════════════════════════   tier 2  sill 256   walk R→L       │
 │                                                                        │
 │  gate 1      gate 2      gate 3                                        │
 │  ▓▓▓         ▓▓▓         ▓▓▓            zone W - THE WORLD             │
 │ ══════════════════════════════════   tier 1  sill 380   walk L→R       │
 ├────────────────────────────────────────────────────────────────────────┤
 │  [ 300▷ ] [ 600▷ ] [ 400▷ ] [ 200▷ ]        hundreds  y=448   zone H   │
 │  [40▷][60▷][ ▫ ▷][30▷]        [6▷][4▷][▫▷][7▷]   tens + ones  y=516    │
 └────────────────────────────────────────────────────────────────────────┘
```

**The three tiers.** Road surface `sill` = 380 (tier 1, foot), 256 (tier 2), 132 (tier 3, summit). Each tier occupies 116 px — a 76 px gate band (`sill−76 … sill`) over a 40 px barrow band (`sill … sill+40`) — with 8 px of hillside between tiers, so the three tiers fill 56-420 exactly. Gates stand at **x = 186, 346, 506** on every tier (frames 118-254, 278-414, 438-574; 24 px of hillside between frames). Route: **gate 1 → 2 → 3** left to right on tier 1, up **ramp A** (a road band from (574, 380) to (668, 256), right margin), **gate 4 → 5 → 6** right to left on tier 2, up **ramp B** ((118, 256) to (44, 132), left margin), **gate 7 → 8 → 9** left to right on tier 3, then the summit shelf to the fire-ring. A hairpin hill road that ends top right. The keeper starts at **(44, 380)**.

**Every gate, identical, 136 wide, relative to its own `sill`:**

| part | band | detail |
|---|---|---|
| lintel | `sill−76 … sill−56` | the stone head the leaves tuck under |
| leaf, down | `sill−56 … sill−16` | three, 40 × 40, at columns `gate.x −40 / 0 / +40`, each carrying one 30 px cut digit at `(col, sill−36)` |
| leaf, risen | `sill−74 … sill−58` | foreshortened against the lintel; **its digit rides to `(col, sill−66)` at 30 px and is drawn in front of the lintel**, so it stays fully legible |
| gateway | `sill−56 … sill−16` | open behind any risen leaf; the waiting family stands at `(gate.x, sill−34)`, 28 px, visible through the bars |
| threshold | `sill−16 … sill` | the roadway under the arch |
| piers | `gate.x ±60 … ±68` | inert stone |

**The barrow (travels with the keeper; parks centred on the active gate, `sill … sill+40`).** The **bed** is a stepped block with three nested channels sharing a right stop at `gate.x + 74`: hundreds `gate.x−60 … +74` (134 wide), tens `gate.x−20 … +74` (94), ones `gate.x+20 … +74` (54). A seated plate's digit cells therefore land at `gate.x −40 / 0 / +40` — the same columns as the leaves above — with 26 px numerals on the centre-line `y = sill+20`. The **crank** is a windlass wheel, r 22, at `(gate.x + 116, sill − 8)`, with `ART.chain` running from it up to the lintel's right end at `(gate.x + 58, sill − 70)`, so it is visibly the gate's own machinery and not a control panel floating in the world. The **keeper** stands at `(gate.x − 92, sill − 30)`, 56 px, feet at `sill − 2`, hands on the wheel.

**Why the gates ahead are silted, and why that is not a fudge.** Every gate's number is cut in its leaves and always has been, but the storm packed each face with river silt. The keeper clears the face of the gate she is standing at (`ANIM.clearFace`, 200 ms on arrival) and the three digits appear; gates already opened show their numbers permanently in their risen leaves; gates ahead show blank silted stone. **This is mechanically necessary and is declared rather than dressed up.** Carving all nine numerals at boot would fix the play list at boot and delete the 2-up/2-down ladder outright — the same defect `177` names. The silt buys the ladder at zero cost to the world's constancy: the gates never move, and no gate's number ever changes once shown.

**Zone H — the plate rack (the barrow's crate, restocked at each gate).** Two rows, holding **exactly the CONTENT rows below, untouched**: four candidates per place per item, with the digit-swap value, the ±1-place neighbour, the transcoding trap and the grating present in the tens and ones rows of every item so that the grating's presence never gives away a zero place.

- **Hundreds row, y = 448.** Four plates, 134 × 34 drawn inside a 134 × 56 hit, centres **x = 141, 287, 433, 579** (hit spans 74-208, 220-354, 366-500, 512-646; 12 px gaps).
- **Tens + ones row, y = 516.** Four tens plates, 94 × 34 drawn inside a 94 × 56 hit, centres **x = 65, 171, 277, 383**; four ones plates, 54 × 34 drawn inside a 56 × 56 hit, centres **x = 470, 538, 606, 674** (right edge 702). Hit band 488-544; bottom margin 16.

**The plate is the arrow card, unchanged.** Widths 134 / 94 / 54 = 3 / 2 / 1 digit cells of 40 px plus a 14 px arrow tip on the right; fills `surface` / `structureSoft` / `bg`; `structure` 3 px stroke. The **grating** is the one that is not a plate: dashed `inkSoft` 2 px, no fill, no numeral, an open frame at tens or ones width. It bars its channel like any other and the gate's own cut 0 reads straight through it.

**Interactive element count (F-69, read per GAME-DESIGN-LAW §5.1).** Three racks as instruments (3) + the bed (1) + the crank (1) = **5**. Counting every plate individually: 12 + bed + crank = **14**, one fewer than the original's 15 (twelve cards, the base, OK and the toucan). This redesign adds nothing to the count. Gates, families, the fire-ring, the ramps and the hillside are inert scenery and count zero.

**Diegetic progress — the road opening behind her, and no dot progress display during play.** At any moment the child sees, without a glyph: the gates already open (leaves swung, plates stepped, the expansion readable on each), the families standing out on the road where they came out, the keeper's own height up the three tiers, and the silted gates still barred ahead between her and the fire-ring. That is F-44's *"path filled"* verbatim, and Device 2 — **every mark the child makes is the object itself in its new state**, never a token for it. An open gate is not a reward for opening a gate. The distance to the goal shrinks visibly and monotonically, and it shrinks **along the apparatus**: zone W is the whole game, it never scrolls, never re-frames and never takes a camera tween.

## How it plays
1. **Start screen (never auto-starts).** `S("title")` at (360, 150), 44 px `THEME.font.display` `THEME.colour.structure`; `S("premise")` at (360, 214), 22 px `THEME.colour.inkSoft`, `wordWrap` 520, two lines; a short piece of road at y = 320 with `ART.keeperIdle` and `ART.barrow` at (330, 320) and one barred gate behind her; `makeButton` `t("start")` at (360, 430); the language picker at (16, 16), hidden under `?embed=1`. A 2 % breathing idle is allowed here and on the Finish screen only (`ART-BIBLE` §6).

2. **The world builds once and is never rebuilt.** `ART.hillWash`, three `ART.roadTier`s, two `ART.ramp`s, nine `ART.gateFrame`s each with three `ART.leafStone`s and an `ART.gateSilt` face, nine `ART.threshold`s with an `ART.family` behind each, `ART.fireRing` at (658, 92) with `ART.elder` at (658, 84) and nine `ART.seatStone`s round the stones. The keeper stands at (44, 380) with `ART.barrow`.

3. **Item 1 (L1: 346), at gate 1 (x = 186, sill 380).** She walks 142 px to her station at (94, 350) (`ANIM.walk`, 368 ms) and the barrow parks centred on the gate. `ANIM.clearFace` clears the silt and three `ART.leafDigit`s appear on the leaves: **3** at x = 146, **4** at 186, **6** at 226, all at y = 344. The rack fills: hundreds 300 / 600 / 400 / 200 at y = 448, tens 40 / 60 / grating / 30 and ones 6 / 4 / grating / 7 at y = 516, order shuffled. `ART.crank` is drawn at alpha 0.5 and will not turn. **Nothing is animating** — zero tweens run while a target is enabled (the F-42 gate, F1).

4. **Selecting and seating a plate.** Tap a rack plate (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The moment it lifts, **`ART.channelLit` fills the one channel its width fits and `ART.leafGhost` outlines the leaf above that channel** — the width says which column, before any commitment. Tap the bed: the plate glides in (`ANIM.glide`, 260 ms) and seats on the centre-line `y = sill+20`, later plates drawn over earlier ones, so the visible reading is one three-digit numeral. `tone("tap", 9)` for a hundreds plate, `tone("tap", 5)` for tens, `tone("tap", 1)` for ones — the pitch tells the place. **A channel already barred refuses**: the arriving plate springs back (`ANIM.nudge`, `tone("nudge")`, no message) and it is **not an attempt**. Tapping the bed with nothing selected lifts the narrowest unlocked seated plate back to the rack and the stack re-nests (`ANIM.fanIn`); undo is free, unlimited and never an attempt. When all three channels are barred the crank goes to full alpha and accepts a tap.

5. **The turn.** Tap the crank (or Tab to it and press Enter). `ANIM.crankTurn`, 120 ms, `tone("tap")`. Each leaf tries to rise, left to right, 120 ms apart:
   - **A leaf whose column reads its cut digit rises** (`ANIM.leafRise`, 350 ms), its digit riding to `y = sill−66`, `tone("tap", 9/5/1)`. **It never comes down**, and the plate beneath it locks (it is what holds the leaf up).
   - **A leaf whose column does not** simply does not move. No shake, no flash, nothing red. The keeper's pose goes `ART.keeperIdle` → `ART.keeperThink` and she looks up at it.

6. **All three up — the gate is through.** The plates lift out of the bed into the cleared gateway and step apart (`ANIM.fanOut`, 600 ms, `tone("tap", 9)` / `(5)` / `(1)`) into a right-stopped staircase: hundreds at `y = sill−48`, tens at `sill−16`, ones at `sill+16`, all three tips still at `gate.x + 74`, with `ART.plusText` at `(gate.x−34, sill−16)` and `(gate.x+6, sill+16)`. **Each plate's leading digit lands exactly under its own cut digit**: `3 4 6` above `300 / 40 / 6`. Hold 700 ms. `tone("correct")`; a praise key from the rotation on a first-try gate only; `ART.keeperHappy`. The family steps out through the gateway onto the road (`ANIM.familyOut`, 400 ms) and stays there. **The staircase stays in the gateway for the rest of the session.** After 350 ms the keeper walks on to the next gate (`ANIM.walk`, `min(900, 240 + 0.9 × |path|)` — 160 px between adjacent gates is 384 ms, a ramp leg about 420 ms) and the barrow travels with her; the crate restocks the rack. Item *k+1* begins exactly where item *k* ended.

7. **A turn that leaves a leaf down (the world freezes, every target `setEnabled(false)`, unskippable).** `tone("nudge")`. `ART.sumText` appears on the barrow's near face at `(gate.x+27, sill+30)`, 22 px `inkSoft`, reading the number the barred stack makes — e.g. **364** against the gate's cut **346**, two numbers one saccade apart, disagreeing. Then the **place cue**, tens before ones, 900 ms each: `ART.digitHi` (the screen's one coral) outlines the cut digit on the leaf that stayed down while the plate under it `ANIM.pulse`s. For the digit-as-number case the tens channel's two cells then light in turn (`ANIM.cellCount`, `tone("tap", 5)` each). A floor of `hold = max(600, 4100 − elapsed)` guarantees at least **4.1 s** of frozen argument whatever digits the item carries — longer than the original's ≈ 3.1 s cue, per GAME-DESIGN-LAW §3.0. Then `ANIM.fadeOut` clears the outline and the readout, the unlocked plates settle back into the nested stack, and the child swaps.

8. **The ladder (success is certain, F-46).** Turn 1 → the leaves that matched stay up, the place cue plays. Turn 2 → the cue again. Turn 3 → the **show-me**: `ART.showRing` (`ANIM.showMe`) on the correct plates for the columns still down — the grating for a zero place — and a ring on the crank. Seating exactly those and turning opens the gate, solved-with-help, no praise pop. No attempt 4. Taking a plate out of an unlocked channel is free and is never an attempt.

9. **A full worked session.** Gate 1 (L1: 346) 300 / 40 / 6 → turn: three leaves rise, staircase, family out ✓ · gate 2 (L1: 528) ✓ → step up · gate 3 (L2: 306) bars 300 and 6, stalls; the grating pulses in the rack; seats it → ✓ · gate 4 (L2: 450) 400 / 50 / grating ✓ → step up · gate 5 (L3: 105) bars 100 / 10 / 5 → turn: hundreds and ones rise, **the tens leaf stays down, cut 0 over the 1 of the 10 plate**, readout 115, cue 900 ms → lifts the 10, seats the grating, turns ✓ (retried) → step down · gate 6 (L2: 802) ✓ · gate 7 (L2: 590) ✓ → step up · gate 8 (L3: 461) bars 400 / 10 / 6 → turn: hundreds rises, two leaves stay down side by side, cut 6 and 1 over plates 10 and 6, cue tens then ones → 400 / 60 / 1 ✓ · gate 9 (L3: 703) ✓ → the road is open foot to summit → Finish.

10. **Finish — the world re-drawn at its play coordinates** (`MISSIONS.md` §9.1.6), not a summary screen. Nine gates standing open the whole length of the hill road, each permanently showing its own expansion in aligned columns: swung leaves reading **3 | 4 | 6** above stepped plates reading **300 / 40 / 6**. On the ninth gate opening, all nine families walk up the road to the fire-ring (`ANIM.procession`, ~4 s), passing every gate the child opened, and take the nine empty places beside the elder; the keeper follows last and `ANIM.celebrate`s. `t("all_done")` at (360, 110); `makeButton` `t("play_again")` at (250, 520) and `t("menu")` at (470, 520); `tone("finish")` once; `GameCore.reportHeight()`. **The first-try record is diegetic and unscored:** a gate that took help has one of its own family standing in its gateway holding the plate that finished it — they came out and helped; a gate opened first try stands empty and open with its family already at the fire. No dots, no count, no "n of 9", no star, no total. The Finish is asserted on **properties** (nine gates open, nine expansions present, every family at the ring), never on a pixel match — the route is identical every session but which gates carry a helper is not.

Session ≈ 5-6 minutes. Total ACT time ≈ 30 s (nine correct turns at ≈ 3.3 s including the walk on, about three corrections at ≈ 4.3 s, one 4 s procession), inside the 60 s budget of `MISSIONS.md` §8.3 R1. **Traversal is ≈ 7 s of that** — nine walks of ≤ 900 ms, about 2 % of the session (GAME-DESIGN-LAW §2.2a, reported rather than asserted).

## Art registry
```js
const ART = {
  /* --- the hill --- */
  hillWash:   { kind: "svg", value: LCSArt.get("scene.hillside"), size: 720 },                                  // one wash, never animated, never in front of a tappable thing
  roadTier:   { kind: "shape", shape: "rect", w: 700, h: 16, fill: "surface2", stroke: "line", strokeWidth: 2 },
  ramp:       { kind: "shape", shape: "polygon", points: [[0,0],[94,-124],[112,-124],[18,0]], fill: "surface2", stroke: "line", strokeWidth: 2 },   // drawn beneath everything
  /* --- a gate --- */
  gateFrame:  { kind: "shape", shape: "roundRect", w: 136, h: 76, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 6 },
  leafStone:  { kind: "shape", shape: "roundRect", w: 40, h: 40, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 4 },
  leafDigit:  { kind: "text",  value: "", size: 30, font: "display", color: "ink" },
  gateSilt:   { kind: "shape", shape: "rect", w: 120, h: 40, fill: "line" },                                     // packs the leaf faces of every gate ahead
  threshold:  { kind: "shape", shape: "rect", w: 136, h: 16, fill: "surface2", stroke: "line", strokeWidth: 2 },
  chain:      { kind: "shape", shape: "line", points: [[0,0],[-58,-62]], stroke: "structure", strokeWidth: 3 },
  crank:      { kind: "svg", value: LCSArt.get("machine.windlass"), size: 44 },                                  // r 22 wheel with a spoke handle; hit 56 x 56
  /* --- the barrow --- */
  barrow:     { kind: "shape", shape: "roundRect", w: 148, h: 40, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 6 },
  channelH:   { kind: "shape", shape: "rect", w: 134, h: 34, stroke: "line", strokeWidth: 2 },
  channelT:   { kind: "shape", shape: "rect", w: 94,  h: 34, stroke: "line", strokeWidth: 2 },
  channelO:   { kind: "shape", shape: "rect", w: 54,  h: 34, stroke: "line", strokeWidth: 2 },
  channelLit: { kind: "shape", shape: "rect", w: 134, h: 34, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // scaled to the selected plate's width
  leafGhost:  { kind: "shape", shape: "roundRect", w: 44, h: 44, stroke: "structure", strokeWidth: 2, radius: 6 },           // dashed; the leaf above the lit channel
  /* --- the plates (arrow cards): 3 / 2 / 1 cells of 40 px plus a 14 px tip on the right --- */
  plateH:     { kind: "shape", shape: "polygon", points: [[-67,-17],[53,-17],[67,0],[53,17],[-67,17]], fill: "surface",       stroke: "structure", strokeWidth: 3 },   // 134 x 34; numerals at -47 / -7 / +33
  plateT:     { kind: "shape", shape: "polygon", points: [[-47,-17],[33,-17],[47,0],[33,17],[-47,17]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   //  94 x 34; numerals at -27 / +13
  plateO:     { kind: "shape", shape: "polygon", points: [[-27,-17],[13,-17],[27,0],[13,17],[-27,17]], fill: "bg",            stroke: "structure", strokeWidth: 3 },   //  54 x 34; numeral  at  -7
  grating:    { kind: "shape", shape: "polygon", points: [[-47,-17],[33,-17],[47,0],[33,17],[-47,17]], stroke: "inkSoft", strokeWidth: 2 },   // dashed (lineDash [6,4]), no fill, no numeral; drawn at ones width for the ones grating
  plateNum:   { kind: "text",  value: "", size: 26, font: "display", color: "ink" },
  plusText:   { kind: "text",  value: "+", size: 22, font: "display", color: "inkSoft" },
  sumText:    { kind: "text",  value: "", size: 22, font: "display", color: "inkSoft" },
  /* --- cues (the coral budget: digitHi is the one accent on the screen) --- */
  digitHi:    { kind: "shape", shape: "roundRect", w: 40, h: 44, stroke: "accent", strokeWidth: 3, radius: 6 },
  showRing:   { kind: "shape", shape: "roundRect", w: 146, h: 46, stroke: "structure", strokeWidth: 4, radius: 10 },   // scaled to each plate width; 68 x 68 around the crank
  /* --- the cast (animals only; no people are ever drawn) --- */
  keeperIdle: { kind: "svg", value: LCSArt.get("badger.idle"),  size: 56 },
  keeperThink:{ kind: "svg", value: LCSArt.get("badger.think"), size: 56 },
  keeperHappy:{ kind: "svg", value: LCSArt.get("badger.happy"), size: 56 },
  keeperAct:  { kind: "svg", value: LCSArt.get("badger.act"),   size: 56 },
  family:     { kind: "svg", value: LCSArt.get("hedgehog.idle"), size: 28 },
  elder:      { kind: "svg", value: LCSArt.get("badger.idle"),   size: 36 },
  fireRing:   { kind: "svg", value: LCSArt.get("scene.firering"), size: 80 },
  seatStone:  { kind: "shape", shape: "ellipse", w: 14, h: 9, fill: "surface2", stroke: "line", strokeWidth: 2 }
};
```
`badger` is a new roster entry (`ART-BIBLE` §3, four poses at a 96 px master with a 1:1 viewBox, one shared body string and a swapped head group per pose). **Her ink-and-white markings are built from `surface2` tints and `ink` and use no coral at all**, so `ART.digitHi` keeps the whole one-accent-per-screen budget. `ART.grating` differs from a plate by its dashed stroke and its missing numeral, never by colour alone (§12). The three plate kinds differ in **width** (134 / 94 / 54) as well as fill, and a stacked plate hides the right-hand digits of the plate beneath it exactly, because every width is a whole number of 40 px cells plus the one 14 px tip.

## Animation registry
```js
const ANIM = {
  walk:      { duration: 400, ease: "Sine.InOut", trigger: "the keeper and her barrow travel to the next gate; x,y set at call; min(900, 240 + 0.9 * |path|)" },
  step:      { y: "-=3", duration: 160, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "her gait while ANIM.walk runs; stops on arrival" },
  clearFace: { alpha: 0, duration: 200, ease: "Sine.In", trigger: "ART.gateSilt on the gate she has just reached" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "a rack plate is selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a plate to its channel, or back to the rack (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a plate offered to a channel already barred" },
  crankTurn: { angle: "+=120", duration: 120, ease: "Sine.Out", trigger: "the crank is tapped; one notch, one way only" },
  leafRise:  { y: "-=30", scaleY: 0.4, duration: 350, ease: "Back.Out", trigger: "a leaf whose column reads its cut digit; staggered 120 ms; never reversed" },
  fanOut:    { duration: 600, ease: "Sine.InOut", trigger: "the three plates lift into the cleared gateway and step apart to y = sill-48 / -16 / +16, tips still at gate.x+74" },
  fanIn:     { duration: 500, ease: "Sine.InOut", trigger: "the unlocked plates settle back into one nested stack in the bed after a plate is removed or a correction ends" },
  cellCount: { alpha: 1, duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "each cell of the tens channel in turn, misconception 1 (from alpha 0.3)" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "a plate under a leaf that stayed down; the grating in the rack after 6 s with a channel empty" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a cut digit as its leaf settles at the lintel" },
  familyOut: { duration: 400, ease: "Sine.Out", trigger: "the family steps out through the opened gateway onto the road (x,y set at call)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "ART.sumText, ART.plusText, a restocked rack (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "ART.digitHi, ART.sumText, ART.channelLit, ART.leafGhost clearing" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ART.showRing on the correct plates and the crank (from alpha 0.2)" },
  procession:{ duration: 4000, ease: "Sine.InOut", trigger: "Finish only: the nine families walk the road up to the fire-ring" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the keeper on the Finish screen" }
};
```

## Screen layout
```
 0                                                                      720
 ┌────────────────────────────────────────────────────────────────────────┐
 │ [lang 16,16]                                          zone T   0- 56   │
 ├────────────────────────────────────────────────────────────────────────┤
 │ tier 3  sill 132   gate 56-132  barrow 132-172   gates x 186 346 506    │
 │                                       fire-ring (658, 92) 80 wide      │
 │ ramp B (118,256)->(44,132)                    ramp A (574,380)->(668,256)
 │ tier 2  sill 256   gate 180-256  barrow 256-296  gates x 506 346 186   │
 │                                                                        │
 │ tier 1  sill 380   gate 304-380  barrow 380-420  gates x 186 346 506   │
 │ keeper start (44, 380)                    zone W  56-420  THE WORLD    │
 ├────────────────────────────────────────────────────────────────────────┤
 │ hundreds  y=448  x = 141  287  433  579        (134 drawn / 134x56 hit)│
 │ tens      y=516  x =  65  171  277  383        ( 94 drawn /  94x56 hit)│
 │ ones      y=516  x = 470  538  606  674        ( 54 drawn /  56x56 hit)│
 │                                           zone H 420-560  THE HAND     │
 └────────────────────────────────────────────────────────────────────────┘
```
Within one gate, relative to its own `sill`: lintel `sill−76 … sill−56`; leaves down `sill−56 … sill−16` at columns `gate.x −40 / 0 / +40`; leaves risen `sill−74 … sill−58` with their digits at `(col, sill−66)`; gateway `sill−56 … sill−16`; threshold `sill−16 … sill`; bed `sill … sill+40` with its three channels right-stopped at `gate.x + 74`; the seated stack's centre-line at `y = sill+20`; the crank at `(gate.x+116, sill−8)`; the keeper at `(gate.x−92, sill−30)`. Progress is the road itself: there is no dot progress display and no "1 of 9" anywhere on the play surface (BUILD-CONVENTIONS §6, amended 2026-09-06). Fixed 720 × 560 stage, `Scale.FIT`, no scrolling, one static camera, zero camera tweens between item start and commit.

## Visual specification
- Background `THEME.colour.bg`. `ART.hillWash` is one flat wash in `THEME.colour.surface2` with `THEME.colour.line` edges — never detailed, never animated, never drawn in front of a tappable thing (`ART-BIBLE` §4). `ART.ramp` and `ART.roadTier` are drawn beneath the gates, the barrow and the keeper, so a ramp foot that passes behind a keeper station reads as one continuous road.
- **A barred gate**: `ART.gateFrame` at `(gate.x, sill−38)`; three `ART.leafStone`s at `(gate.x−40 / gate.x / gate.x+40, sill−36)`; `ART.threshold` at `(gate.x, sill−8)`; `ART.family` at `(gate.x, sill−34)` drawn behind the leaves so it is visible only through a column that has opened. Gates ahead carry `ART.gateSilt` at `(gate.x, sill−36)` over all three leaf faces and show no digits.
- **The active gate** adds `ART.leafDigit` on each leaf, 30 px `THEME.font.display` `THEME.colour.ink`, at `(col, sill−36)`; `ART.barrow` at `(gate.x+7, sill+20)` with `ART.channelH` / `ART.channelT` / `ART.channelO` drawn as recesses right-stopped at `gate.x+74`; `ART.crank` at `(gate.x+116, sill−8)` with `ART.chain` from the wheel to the lintel; `ART.keeperIdle` at `(gate.x−92, sill−30)`.
- **A seated plate** is drawn at `y = sill+20` with `ART.plateNum` 26 px at the relative offsets in the registry, later plates over earlier, so the exposed digits fall on `gate.x −40 / 0 / +40` and the stack reads one three-digit numeral. A plate under a risen leaf is locked and takes no hit area.
- **Selection feedback**: on `ANIM.lift`, `ART.channelLit` fills the single channel the plate's width fits (scaled to 134 / 94 / 54) and `ART.leafGhost` outlines the leaf above it. Both clear on `ANIM.fadeOut` when the plate is seated or deselected.
- **The staircase** (an opened gate, permanent): plates at `y = sill−48` / `sill−16` / `sill+16`, all tips at `gate.x+74`, `ART.plusText` at `(gate.x−34, sill−16)` and `(gate.x+6, sill+16)`. The risen `ART.leafDigit`s sit at `(col, sill−66)`, drawn in front of the lintel.
- **Cues**: `ART.digitHi` (the screen's single `THEME.colour.accent` element) around one cut digit at `(col, sill−36)`; `ART.sumText` at `(gate.x+27, sill+30)`; `ART.showRing` scaled to each ringed plate and to 68 × 68 around the crank.
- **The summit**: `ART.fireRing` at (658, 92), `ART.elder` at (658, 84), nine `ART.seatStone`s ringed at radius 34 about (658, 100).
- **Tap floors (8-9 band = 56)**: hundreds plate 134 × 56; tens plate 94 × 56; ones plate 56 × 56 (drawn 54); the bed 134 × 56 centred `(gate.x+7, sill+8)`; the crank 56 × 56. Gaps: 12 px between adjacent plates in a row, 12 px between the two rows, 14 px between the bed's hit box and the crank's. Every target is ≥ 16 px from the stage edge (the leftmost rack plate starts at x = 18, the rightmost ends at x = 702).
- Tab order: hundreds rack left to right, tens rack, ones rack, the bed, the crank. Enter selects, seats, removes or turns.
- Depth: the hillside and the ramps at the back; gates, families and thresholds next; the barrow, plates and keeper in front; risen digits and all cue art in front of the lintel. Chrome (the language picker) floats above everything at depth 1500 (§3.2).
- During any correction, and during the whole of a correct turn's sequence, every plate, the bed and the crank are `setEnabled(false)` and zero taps are accepted.

## Content
Language-neutral (numerals only; two Boot strings). Each item = (the number cut in the gate; hundreds rack; tens rack; ones rack) — the four candidates offered in each row, in authored order and shuffled per item. "grating" = `ART.grating`. Distractor logic is unchanged from the original and is baked into the rows: the digit-swap value (tens ↔ ones), the ±1-place neighbour, the transcoding trap (the "10" plate for 1x5-type numbers), and **the grating in the tens and ones rows of every item so that its presence never gives away a zero place**.

- **L1** (no zero place): 346 (300, 600, 400, 200; 40, 60, grating, 30; 6, 4, grating, 7) · 528 (500, 200, 800, 600; 20, 80, grating, 50; 8, 2, grating, 9) · 173 (100, 700, 300, 200; 70, 30, grating, 10; 3, 7, grating, 1) · 794 (700, 900, 400, 600; 90, 40, grating, 70; 4, 9, grating, 5) · 265 (200, 600, 500, 300; 60, 50, grating, 20; 5, 6, grating, 2) · 431 (400, 300, 100, 500; 30, 10, grating, 40; 1, 3, grating, 4) · 687 (600, 800, 700, 500; 80, 70, grating, 60; 7, 8, grating, 6) · 952 (900, 500, 200, 800; 50, 20, grating, 90; 2, 5, grating, 9)
- **L2** (one zero place — the grating is the answer in one row): 306 (300, 600, 100, 400; grating, 30, 60, 10; 6, 3, grating, 5) · 450 (400, 500, 100, 200; 50, 40, grating, 10; grating, 5, 4, 6) · 802 (800, 200, 100, 900; grating, 80, 20, 10; 2, 8, grating, 3) · 590 (500, 900, 400, 600; 90, 50, grating, 10; grating, 9, 5, 4) · 207 (200, 700, 100, 300; grating, 20, 70, 10; 7, 2, grating, 8) · 640 (600, 400, 500, 700; 40, 60, grating, 10; grating, 4, 6, 3) · 103 (100, 300, 200, 400; grating, 10, 30, 20; 3, 1, grating, 2) · 910 (900, 100, 800, 200; 10, 90, grating, 20; grating, 1, 9, 2)
- **L3** (transcoding traps with the 10 plate, inverted-digit traps, 999, two zero-adjacent cases): 105 (100, 500, 200, 400; grating, 10, 50, 20; 5, 1, grating, 6) · 210 (200, 100, 300, 400; 10, 20, grating, 30; grating, 1, 2, 4) · 703 (700, 300, 800, 600; grating, 70, 30, 10; 3, 7, grating, 2) · 461 (400, 600, 100, 500; 60, 10, grating, 40; 1, 6, grating, 4) · 382 (300, 800, 200, 400; 80, 20, grating, 30; 2, 8, grating, 3) · 999 (900, 100, 800, 500; 90, 10, grating, 80; 9, 1, grating, 8) · 560 (500, 600, 100, 400; 60, 50, grating, 10; grating, 6, 5, 1) · 604 (600, 400, 100, 700; grating, 60, 40, 10; 4, 6, grating, 5)

A "0" plate never exists in any row — zero is always the grating. Nine numbers are used per session, drawn from the level the ladder currently sits at when the keeper reaches each gate (shuffle within level, no number repeats), which is exactly what the silted faces make possible. Rack order is shuffled per item and **the correct plate is never in the same slot of its row twice running** (§13).

## Rules
- Item count: 9 — one per gate on the hill road. *Declared: the original shipped 10 and §8's 8-9 row asks 12-15, so the original already sat under that row. Nine is this design's pre-declared fallback and it is forced by geometry, not chosen: an active gate needs `gate.x − 120 … gate.x + 144` of stage for its keeper, bed and crank, which allows three gates per tier, and three tiers of 116 px fill zone W's 364 px exactly. Do NOT recover a fourth gate per tier by shrinking the digits — 30 px on the leaves and 26 px on the plates are already at the floor for a 400 px iframe.*
- Difficulty progression: 2 consecutive first-turn opens → the next gate's number comes from the next level up (cap L3).
- Adaptation: a turn that leaves a leaf down, or a wrong first turn at 2 consecutive gates → the next gate's number comes from one level down (floor L1). The current gate is never abandoned.
- Stuck rule (an inactivity cue, and nothing about elapsed seconds is ever displayed): if 6 s pass with no tap and a channel is still empty, the plate that fills it `ANIM.pulse`s once — the grating when that place is zero, otherwise nothing, because the child must find the value; repeats every 6 s. Nothing ends.
- What happens on a correct answer: `ANIM.crankTurn`; each leaf rises in turn (`ANIM.leafRise`, `tone("tap", 9/5/1)`) and never comes down; the plates lift into the gateway and step apart (`ANIM.fanOut`, 600 ms) into the right-stopped staircase, held 700 ms, with each plate's leading digit under its own cut digit; `tone("correct")`; a praise key from the rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on first-turn gates only; `ART.keeperHappy`; the family steps out (`ANIM.familyOut`) and stays on the road; the staircase stays in the gateway for the session; after 350 ms the keeper and her barrow walk on and the crate restocks the rack.
- What happens on a wrong answer: the leaves that matched rise and stay risen; the others simply do not move — no shake, no flash, nothing red, **and the keeper's pose changes only from `ART.keeperIdle` to `ART.keeperThink`, because the gate is the consequence and she never is.** `tone("nudge")`; `ART.sumText` shows what the barred stack reads against the gate's cut number; then the world freezes for the place cue — `ART.digitHi` on each cut digit that stayed down while the plate under it pulses, tens before ones, 900 ms each, plus `ANIM.cellCount` on the tens channel for the digit-as-number case — with a floor of `hold = max(600, 4100 − elapsed)` so the frozen argument is never shorter than 4.1 s. **Nothing is dropped, taken, removed or reversed.**
- Retry behaviour: turn 1 → the leaves that matched stay up, the cue plays, the unlocked plates settle back (`ANIM.fanIn`) → turn 2 from wherever the gate now stands (a partly open gate is a better place to think from, never a worse one) → turn 3 with `ART.showRing` on the correct plates for the columns still down and a ring on the crank; seating exactly those and turning completes the gate as solved-with-help, recorded at the Finish as a family member standing in that gateway, no praise pop. No attempt 4. Taking a plate out of an unlocked channel is free, unlimited and never an attempt; a plate offered to a channel already barred springs back and is not an attempt either.
- Finish condition: 9 gates open. No clock, no score, no lose state, no lives, and exactly zero ways a session ends other than by finishing.
- **Anti-brute-force guard, by name: THE ONE-WAY CRANK.** P1's tile re-shuffle is impossible here — these are stone gates in a persistent world, and a gate that jumped when you knocked on it would destroy the constancy that makes the road a place — so the sanctioned replacement (F-65, `MISSIONS.md` §6) has three clauses. (1) **Commitment is a one-way door.** The crank has a ratchet and turns one way only; a leaf it lifts never comes down and a turn cannot be un-turned, so a guesser cannot reset a gate and re-run the space. Each turn spends one rung of a three-rung ladder and the third rung is the show-me, which is not a win. (2) **An item opened after any wrong turn is never first-try**, and that is carried to the Finish as a helper in the gateway, never as a number during play. (3) **The candidate SET varies per item; the positions never do.** The nine gates are where the road puts them all session; what changes at every gate is the rack — four fresh candidates per place from that item's own CONTENT row, shuffled, the correct plate never in the same slot twice running. **The arithmetic, stated honestly.** The space is 4 × 4 × 4 = 64 and the ladder is three turns. Per-place feedback does make the search cheaper — a leaf that rose stays risen, so a guesser needs at most four turns per place — but the ladder caps at three turns *in total*, so a random tapper reaches the show-me on essentially every gate and never once reaches a first-turn opening, which is exactly what F-65 demands. That trade is deliberate: per-place feedback **is** the pedagogy, telling the child which place is wrong without telling them what it should be, and the gate's own cut digit tells them the rest.
- Deletion tests (GAME-DESIGN-LAW §2.2). **A — delete the maths:** patch every leaf to rise on any bar, and any three plates open any gate on the first turn; nothing refuses, nothing is chosen, and the keeper walks a road that was never shut. Nothing playable survives. **B — delete the mission:** remove `mission.goal` and `mission.hero` — the keeper, the gates, the road, the families, the barrow — and the plates have no channel to seat in, no crank to turn and no leaf to lift. **There is no Check tile anywhere in this game**; the crank is the gate's own machinery, chained to its beam, so with the world gone there is no commit path at all and item 1 cannot complete. `mutate-mission.js` fails the build. *(This is the test the original fails outright: delete the toucan at (650, 90) and nothing whatever changes.)* **C — delete the walking:** patch every traversal tween to `duration: 0` and the keeper snaps from gate to gate, the barrow snaps with her and the plates snap into their channels; every item still commits, every leaf still rises or does not, every correction still plays at its full measured duration, the road still opens behind her and the Finish is byte-identical. The item log is identical and the removed time is ≈ 7 s of a 5-6 minute session — the walk carries no state and gates no decision.
- F-42 gate. **F1 freeze:** during DECIDE the hillside is frozen — no idle bob on the keeper, no ambient scenery, the families still, zero tweens running while any target is enabled. **F2 displacement:** the commit reads what is seated in stone, never a tile id followed by a walk; the keeper's position selects the item. **F3 co-location:** gate, keeper, barrow and rack are one 720 × 560 frame, zero camera tweens. **F4 single world:** Boot / Play / Finish, no hub. **F5 instant-cut:** above. **F6 text:** two sentences on Boot, zero during play.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific `STRINGS`, all 11 locales (§17): `title` = "The Gate Road"; `premise` = "The storm has passed. Open the gates on the hill road so everyone can come up." Two short sentences, Boot screen only, within the 8-9 budget; design every box for 1.6 × the English width. Plates, plus signs and cut digits are numerals and symbols in every language, so the play screen needs no translation at all.
- Deleted from the original: `buildIt` (the caption — the picture carries it) and the `question_x_of_y` counter (progress is the road).

## Sound
`tone("tap")` on selecting a plate and on the crank; `tone("tap", 9)` / `tone("tap", 5)` / `tone("tap", 1)` when a hundreds / tens / ones plate seats and again as each leaf rises, so the pitch tells the place and a hundreds bar lands on a higher note than a ones bar; `tone("tap", 5)` per cell during `ANIM.cellCount`; `tone("nudge")` on a plate that springs back and on a turn that leaves a leaf down; `tone("correct")` when a gateway goes through; `tone("finish")` once. Silent under `?sound=off`, and nothing is ever spoken — no number words in any language.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu, praise, the two Boot sentences; the play screen is numerals only and needs nothing translated).
- [ ] Works at narrow width (400-px iframe: all nine gates, the three tiers, the fire-ring, the active gate's cut digits at 30 px, the barrow and both rack rows fully visible; the ones plates remain separate targets).
- [ ] Keyboard operable (Tab: hundreds rack, tens rack, ones rack, the bed, the crank; Enter selects, seats, removes and turns).
- [ ] Never auto-starts.
- [ ] No losing state (a turn that leaves a leaf down never ends the session; the ringed plates and the ringed crank always complete the gate; there is no clock and no score).
- [ ] **Mission.** `mission.goal` (the fire-ring at (658, 92) with nine empty places) is drawn from tap one, never reacts to a correct turn, and changes only at the Finish; `mission.hero` changes (x, y) on at least 8 of the 9 items; deleting the goal and the hero makes item 1 impossible to complete (`mutate-mission.js`).
- [ ] **Ratchet rule.** Drive a whole session answering wrong on every gate: no leaf that has risen ever comes down, no family that has stepped out ever goes back in, no plate is removed from an opened gate, the goal never moves, and `mission.progress` never decreases.
- [ ] **Instant cut (Test C).** With every traversal tween patched to `duration: 0` the item log is byte-identical to a normal session, and the removed traversal time is ≤ 10 s.
- [ ] **The character is never the consequence.** On every wrong-turn screenshot the keeper is `ART.keeperIdle` or `ART.keeperThink` at her station; she never falls, is never denied, never turns back, and `ART.keeperOops` does not exist.
- [ ] Three plates seated in the bed line up their arrow tips on the right and read as one three-digit numeral, in the same columns as the digits cut in the leaves above them.
- [ ] A ones plate can never bar the tens channel; selecting it lights the ones channel only and outlines the ones leaf.
- [ ] The crank is dimmed and will not turn until all three channels are barred; for 306 the grating must bar the tens channel, and the 0 of the 300 plate then reads through it.
- [ ] Barring 300 / 60 / 4 at gate 346 leaves two leaves down side by side over plates reading 60 and 4 in aligned columns, shows "364" on the barrow face, and runs the tens cue then the ones cue at 900 ms each.
- [ ] Barring 100 / 10 / 5 at gate 105 leaves the tens leaf down with its cut 0 directly above the 1 of the 10 plate, and shows "115".
- [ ] A correct turn transforms the nested stack reading 346 into the stepped staircase reading 300 / 40 / 6 under the risen cut digits, and the staircase is still there at the Finish.
- [ ] No dot progress display, no "1 of 9" and no counter appears anywhere on the play surface; progress is the gates open behind her and the silted gates ahead.
- [ ] No place-value blocks, rods, cubes or flats appear anywhere in the game (the fence against game 038).
- [ ] The Finish shows nine open gates with nine expansions, every family at the fire-ring, and no score, star or total; helped gates are marked only by a family member standing in the gateway.
- [ ] With `?sound=off` nothing is audible; with sound on, a hundreds plate seats on a higher note than a ones plate.
- [ ] Total ACT time across a full session is ≤ 60 s, and every correction runs at least 4.1 s of frozen world with every target disabled.
