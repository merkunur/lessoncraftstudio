# 017 — Teen Pairs — Lantern Marsh

## Identity
- Slug: `teen-pairs`
- Subject / topic: Mathematics / teen numbers (11-19) as one ten and some ones
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Frame: THE CROSSING
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14, as amended 2026-09-06 (§6 and §7 are the no-world default; a framed game takes the MISSION LAYOUT of `../MISSIONS.md` §1.4 instead). Pattern contract: `catalogue/PATTERNS.md` P12 — the pair is still numeral↔quantity; what changed is that the child holds one half of the pair and walks onto the other. Frame contract: `../MISSIONS.md` FRAME 1 — THE CROSSING. Ruling: `../GAME-DESIGN-LAW.md`. Everything below adds to those; nothing overrides them.

## Learning
- Objective: Pairs each teen numeral (11-19) on a visible board with the picture that shows one ten-rod and the matching number of one-cubes, including pictures where the cubes are not drawn to the right of the rod.
- Prerequisites: Reads numerals to 20; counts to 9; has met a ten as one object (game 016 or a ten-frame). Reads nothing else.
- Curriculum links: F-108 (teens: "eleventeen", 16 as 61; de/nl/da invert tens and ones in the number word — "sechzehn"), F-102 (order reversal 12↔21; "12 always paired with 1 rod + 2 ones"), F-50 (base-ten blocks are an evidence-backed representation), F-21, F-31 row "Place value tens/ones (teens)" — conservative 7-8, earliest 5 → 6-8 (US 1.NBT.B.2b "the numbers from 11 to 19 are composed of a ten and one, two … nine ones"; England Y1 "identify one more/less … tens and ones"; Germany Klasse 1 "Zahlen bis 20 als Zehner und Einer"; France CP "dizaine et unités"; Netherlands groep 3 "tientallen"; Spain 1º; Brazil EF01MA07; Sweden åk 1; Finland grade 1).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Reading the picture by counting every block as one (1 rod + 6 cubes = "7").** Response: a refused stone counts itself the place-value way, on its own face, with the world frozen: the rod glows along its whole length and takes one `ART.countBadge` reading "10" (`ANIM.rodGlow`, `tone("tap", 10)` — the pitch jumps, so the ten is audible as one thing), then each cube takes its badge 11, 12, … up to the stone's true value (`ANIM.badgeIn`, 250 ms apart, `tone("tap", k)`). The numeral the otter is carrying sits about 100 px away in its paw throughout, so "this stone is 16" and "I am holding 15" are read in one frame. The rod is never, in any state, counted as one — and it is now drawn ten cubes long, so the picture no longer contradicts the correction (the pre-pivot art drew a rod five cubes long with half-cube notches, which quietly agreed with the misconception).
  2. **Digits treated as independent (16 read as "6 and 1", pairing 16 with 1 rod + 1 cube + something).** Response: the self-count above always runs ten-first and always ends on the stone's true value; the far tier of stones — the three nearest the lodge, which is where a child who is doing well arrives — carries the cubes ABOVE the rod, in a column at the rod's LEFT end, or SPLIT above and below it, so the face cannot be read top-to-bottom or left-to-right as two digits in any direction. For the de/nl/da number words the tens-then-ones layout of the self-count is the anchor, never the word order. No number word appears anywhere in the game.
  3. **Near-neighbour confusion (pairing 15 with the 16 picture — losing count of the cubes).** Response: the live set of stones is built so that it holds the true stone plus the dark neighbour whose value is CLOSEST to the lantern's — so the near miss is always the available mistake wherever the neighbourhood still offers one, and every layout is authored so that every stone has a geometric neighbour differing by exactly one cube. The self-count then shows exactly one cube too many or too few. After the same lantern has been refused twice, the true stone's lamp-post gains a soft outline (`ART.hintRing`, `ANIM.showMe`) and holds it until the lantern is hung.
  4. **Tapping two numerals (or two pictures) as a "pair".** Response: RE-STAGED BY CLASS, NOT BY IDENTITY, and flagged rather than quietly dropped — in this world there is only ever one lantern and only stones to hang it on, so "two of the same kind" is not a move a child can make. What survives is the error class (a move that is not a pair at all) and its response class (refusal, no self-count, nothing recorded): offering the lantern to an already-lit stone — the hook is full — or to the stone the otter is standing on. The lantern swings back (`ANIM.swing`), `tone("nudge")`, and no correction plays, because there is nothing to correct. This is the exact analogue of the old "same tile twice de-selects, no error". A reviewer should know this is the one response whose shape changed.

## Mission

**Mission, as the child would say it.** *Get home across the marsh — and the way across is lit one stone at a time.*

**The want, as a single still frame with no words and no motion.** An otter on the near bank, holding one lit lantern with a teen numeral on its glass, with a satchel of unlit lanterns beside it. Nine dark stones scattered across the water, each with a bundle of base-ten blocks set into its face and an EMPTY hook on its lamp-post. Across the marsh, a lodge with two young otters at the lit window — and no path reaching it. The lack is the unlit causeway: you can see the whole of it, you can see it is not lit, and you can see who is waiting at the end. A child reads "I have to get over there and none of it is lit yet" without a single glyph of prose.

**The goal.** The otter on the lodge landing at (472, 386), with all nine lamps lit behind it. The lodge never moves and never changes until arrival (Device 1 — a waiting party that reacts per item is an approval meter, which is the banned shape).

**THE SINGLE STATE VARIABLE.** `S` = **which stone the otter is standing on, and what hangs on it.**

- **Mathematical reading.** The quantity the otter has just named. Its lantern carries a teen numeral; each stone carries one ten-rod and some one-cubes. Hanging the lantern binds the numeral to the composition, and `S` accumulates as the set of teens correctly composed. At the end, all nine of 11-19 stand in the marsh, each numeral over its own ten-and-some-ones.
- **Physical reading.** The otter's position on the causeway, and the length of lit causeway behind it. `S` is literally where the animal is and how far the light has got.

There is exactly one variable, and there is **no `item.answer` field anywhere in this design**. Correctness is `hook(stone).takes(lantern)`, evaluated against the stone's OWN bundle at the instant the otter's paw lands on it. The candidate set is *defined* as "the dark stones within one hop of the hero" — with no hero there is no candidate set, no offer and no arrival.

**THE ISOMORPHISM — moving IS solving.** *The only way to say "thirteen" is to be standing on the stone that is a ten and three ones.* The answer is not reported and then rewarded with a walk. The answer **is the foothold**, and the foothold is the only way forward.

The commit sequence, and its ordering is the whole argument:

1. The child taps a live stone. This commits the otter to that stone: it leans out and **its forepaw lands on the stone** (`ANIM.reach`, 180 ms). That is the position change, and it happens before any verdict exists.
2. The stone answers **on contact** — it is bearing weight or it is not. The handler asks `world.accepts(otter, stone)`, which resolves to "does this stone's bundle make the number in the paw". `answer = f(character.position)`: the commit handler reads **which stone has the otter's paw on it**. It never reads a tile id, an index or a selection buffer.
3. On acceptance the otter brings the rest of itself across (`ANIM.hop`, 380 ms) and hangs the lantern. On refusal the stone tips 6° and the paw withdraws.

Feedback lands ~180 ms after the tap — inside F-40's 300 ms — because the walk is not between the commit and the feedback: **the walk IS the commit, and the feedback is what the walk ran into.** This is also why the game cannot be re-shot as answer-then-arcade (F-63, F-11): there is no moment at which the child holds "an answer" that the otter then goes and enacts.

**THE DECLARED WEAK JOINT, stated rather than hidden.** The hook's refusal is *conventional-but-legible*: a lantern belongs on the stone whose quantity it names the way a parcel belongs at an address. It is not a shape fit. The fully physical version was designed — each stone cut to a top of exactly its own length, the tied bundle laid along it so a 13-bundle on a 15-stone leaves two bare units and a 15-bundle overhangs and rocks — and REJECTED on geometry, not on taste: a legible one-cube is 10-14 px, so a to-scale 11→19 line needs 1,300+ px of stone inside a 720 px stage. So **the physics lives in the correction, not in the choice**: every refusal lays that stone's quantity out and counts it ten-first, against the numeral sitting 100 px away in the otter's paw. Better to declare this than to call a hook a shape sorter.

## World

Stage 720 × 560, `Scale.FIT`, static camera, no scrolling. `stageCam(this)` is the first line of every scene's `create()` per BUILD-CONVENTIONS §1/§2.

**Zone T (0-56) — chrome only.** The language picker at (16, 16), depth 1500 per §3.2. Nothing else. **No progress strip of dots on the play surface**; progress is diegetic (MISSIONS.md §1.4).

**Zone W (56-420) — THE WORLD.** The whole game. The board, the hero, the destination and the history are all in here, always, and the destination's coordinates never change.

Nine stones, 120 × 88 each, **fixed for the entire session, all nine visible from tap one**, laid in three lanes so the causeway winds and the whole route fits without scrolling:

- Lane 1, y = 106 — **S1 (108, 106) · S2 (284, 106) · S3 (460, 106) · S4 (636, 106)** (S4 spans x 576-696; 24 px right margin)
- Lane 2, y = 234 — **S5 (196, 234) · S6 (372, 234) · S7 (548, 234)**
- Lane 3, y = 362 — **S8 (152, 362) · S9 (328, 362)** (spans y 318-406, inside zone W)

Lane gaps 44 px; every hop between adjacent stones is 135-180 px, one hop inside the ACT budget.

- **Near bank / start: (44, 234)** — the reed bank (`ART.bank`), the otter's rest point at (62, 204), the lantern satchel (`ART.satchel`) at (30, 244).
- **The lodge — the destination, fixed, never moves: (580, 350)**, 128 × 116, spanning x 516-644, y 292-408. Lit window, two young otters (`ART.kit`) at it from tap one, at (556, 344) and (600, 344). They change only at the finish.
- **The lodge landing: (472, 386)**, 96 × 40 — adjacent to S7 (170 px) and S9 (146 px), so the lit route genuinely reaches the lodge and the crossing is a crossing.

**Adjacency (authored, not computed at runtime; every listed hop is ≤ 180 px):**

| from | may hop to |
|---|---|
| bank | S1 · S5 · S8 |
| S1 | bank · S2 · S5 |
| S2 | S1 · S3 · S5 · S6 |
| S3 | S2 · S4 · S6 · S7 |
| S4 | S3 · S7 |
| S5 | bank · S1 · S2 · S6 · S8 |
| S6 | S2 · S3 · S5 · S7 · S9 |
| S7 | S3 · S4 · S6 · landing |
| S8 | bank · S5 · S9 |
| S9 | S6 · S8 · landing |

**On each stone:** the bundle carved into its face — `ART.rod` **100 × 12, laid horizontal, with nine `ART.notch` hairlines 10 px apart** so it is ten true 10 px segments — and `ART.cube`s at 10 × 10, one cube exactly one segment. A lamp-post (`ART.post`) rises 40 px from the stone's top-right at stone centre + (44, −44), carrying an empty hook (`ART.hook`) at its head.

**On the otter:** the lantern held out at otter centre + (30, −6), 56 px glass, the numeral **40 px** `THEME.font.display` `THEME.colour.ink` on it — the single most important glyph on the screen, at the centre of attention, one saccade (~100 px) from every live stone. F3 co-location holds by construction; there is no problem panel anywhere on the stage.

**The live set.** The dark stones within one hop of the otter, capped at the level's size: 2 at L1, 3 at L2, 4 at L3. Interactive elements at any moment: the otter plus at most 4 stones = **5**, well inside F-69 as read by GAME-DESIGN-LAW §5.1. Settled stones, the lodge, the kits, the bank and the reeds are inert scenery and count zero. Tap targets are 120 × 88, over the 56 px floor for 6-8. Tab cycles the live stones in causeway order; Enter commits.

**Difficulty is baked into the geography.** The three stones nearest the bank (S1, S5, S8) carry canonical bundles and the smallest ones-counts; the middle three (S2, S6, S9) are mixed; **the far stones — the three nearest the lodge (S3, S7, S4) — carry the non-canonical layouts and the largest ones-counts.** The far side of the marsh is the hard side, and getting there is the reward for doing well.

**Zone H (420-560) — THE HAND: EMPTY, always.** THE CROSSING's own rule: the world is the hand. Zone H holds still water and reed heads (`ART.reed`), inert, zero interactive elements; the otter never enters it. This is load-bearing, not decorative — the moment a tray of candidates appears down there, the commit handler starts reading tile ids and the Displacement rule is broken. Keeping the hand empty is what makes the position the only thing there is to read.

## How it plays

One complete session, layout A (`S1 13 · S2 14 · S3 17 · S4 19 · S5 12 · S6 16 · S7 18 · S8 11 · S9 15`), with every branch and real coordinates.

1. **Start screen** (`GameCore.makeStartScreen`, title from `S("title")`): `ART.otterIdle` at (360, 200), Start, picker at (16, 16) (hidden under `?embed=1`). The game never auto-starts.
2. **The world appears whole.** The marsh (`ART.marsh`), the bank, the nine dark stones with their bundles and empty hooks, the lodge with the two kits at the window, the reeds. The otter stands on the bank at (62, 204) in `ART.otterIdle`, holding a lit lantern reading **13**. Nothing is animating. No caption, no words.
3. **Item 1 — a refusal, then the crossing starts.** The otter is on the bank; its dark neighbours are S1 (13), S5 (12), S8 (11). L1 gives a live set of two: the true stone S1 and the dark neighbour closest in value, S5 (12). Both lift very slightly proud of the water so "you may step here" is visible without colour.
   - **Attempt 1, wrong.** The child taps **S5 (196, 234)**. `ANIM.reach` (180 ms) puts the otter's forepaw on S5 and swaps it to `ART.otterReach`. On contact the world refuses: S5 rolls 6° and back (`ANIM.tip`), `tone("nudge")`, the paw withdraws (`ANIM.withdraw`), the otter is back at `ART.otterIdle` on the bank, still holding lantern 13. Then, **with the world frozen and every target disabled, S5 counts itself**: `ANIM.rodGlow` brightens the rod along its whole length and one `ART.countBadge` reading "10" appears with `tone("tap", 10)`; then the two cubes take badges 11 and 12, 250 ms apart, one small step of pitch each; badges hold, then `ANIM.fadeOut` after 900 ms. Total ~2.0 s. The 13 in the paw is 100 px away the whole time. Nothing on the otter changed; nothing in the world was removed.
   - **Attempt 2, right.** The child taps **S1 (108, 106)**. `ANIM.reach`; on contact S1 bears weight; `tone("correct")`; `ANIM.hop` (380 ms) brings the otter across to stand at (108, 76) in `ART.otterHang`; the lantern lifts to S1's hook at (152, 62) and settles (`ANIM.hang`); S1 swaps to `ART.stoneLit` (`ANIM.light`). Item 1 complete, **not first-try**.
4. **Item 2 — first-try.** The otter is on S1. Dark neighbours: S2 (14), S5 (12). A fresh lantern reading **14** comes out of the satchel into its paw. Live set {S2, S5}. The child taps **S2 (284, 106)**: reach, accept, hop 176 px, hang, light. First-try.
5. **Item 3 — first-try, and the level goes up.** On S2; dark neighbours S3 (17), S5 (12), S6 (16). Lantern **16**; the nearest available value is S3 (17), one cube away, so the live set is {S6, S3}. The child taps **S6 (372, 234)** — accepted. Two consecutive first-try lightings, so item 4 opens at **L2** and the live set grows to three.
6. **Item 4 — two refusals and the show-me.** On S6; dark neighbours S3 (17), S5 (12), S7 (18), S9 (15). Lantern **15**; live set {S9, S3 (17), S5 (12)}.
   - The child taps **S3 (460, 106)**: refused, and S3 counts itself to 17 against the 15 in the paw (~2.4 s).
   - The child taps **S5**: refused, and S5 counts itself to 12. This is the second refusal on the same lantern, so **S9's lamp-post takes `ART.hintRing`** and pulses at 1 Hz (`ANIM.showMe`) and holds until the lantern is hung.
   - The child taps **S9 (328, 362)**: accepted. Hop 135 px, hang, light. Two refusals on one lantern, so item 5 drops back to **L1**.
7. **Item 5 — the re-approach, then first-try.** The otter is on S9, whose only dark neighbour is S8 — fewer than two candidates. The **re-approach** runs as its own short ACT with no decision in it: the otter walks back along its own lit causeway, S9 → S6 (220 ms), to the nearest lit stone that has at least two dark neighbours. Nothing is unlit, nothing is removed, no lantern comes down; the otter is using the road it built. Item 5 then opens at S6 with dark neighbours S3 (17) and S7 (18). Lantern **18**; live {S7, S3}. The child taps **S7 (548, 234)** — accepted, first-try.
8. **Item 6 — first-try, level up again.** On S7; dark neighbours S3 (17), S4 (19). Lantern **19**; live {S4, S3}. The child taps **S4 (636, 106)** — accepted. Two consecutive first-try, so item 7 is L2.
9. **Item 7 — a two-hop re-approach.** S4's only dark neighbour is S3. The otter walks S4 → S7 → S6 (2 × 220 ms) to the nearest lit stone with two dark neighbours. Item 7 opens at S6 with dark neighbours S3 (17) and S5 (12); L2 wants three but only two remain in reach, so the live set is two. Lantern **17**; the child taps **S3** — accepted, first-try.
10. **Items 8 and 9 — the last stretch home.** Only S5 (12) and S8 (11) are still dark and no lit stone touches both, so each of the last two lanterns has a **single candidate** and neither counts toward the first-try record. The otter walks S3 → S6, takes lantern **12** and steps onto **S5**; then takes lantern **11** and steps onto **S8 (152, 362)**. The ninth lamp lights.
11. **A not-a-pair offer, wherever it happens.** If the child taps a stone that is already lit (its hook is full) or the stone the otter is standing on, the lantern swings back (`ANIM.swing`), `tone("nudge")`, no self-count plays, nothing is recorded, and the otter's pose does not change.
12. **Finish.** The last lamp lights; the otter runs the lit causeway from wherever it is, stone to stone, to the lodge landing at (472, 386) (`ANIM.arrive`, chained, total ≤ 1500 ms — the celebration cap of §12), and **the two kits come out of the lodge onto the landing to meet it** (`ANIM.meet`) — the only change the waiting party makes all session. `GameCore.tone("finish")` once. The Finish scene then **re-draws the final marsh at its play coordinates**: nine `ART.stoneLit` stones, nine `ART.lanternHung` lanterns over nine ten-and-some-ones bundles, the lit line from bank to lodge, `ART.otterHappy` and the two kits on the landing. `t("all_done")` in zone T at (360, 32), 52 px, `THEME.colour.structure`. `GameCore.makeButton` `play_again` at (250, 510) and `menu` at (470, 510). Optionally a short first-try line of `ART.dotEmpty` / `ART.dotFull` with `t("question_x_of_y")` at (360, 470), n = stones lit with no refusal — on the Finish screen only, which is the one place the amended §6 still allows it. `GameCore.reportHeight()`.

One session ≈ 4-6 minutes: nine items, each a bundle to read plus a hop, with a ~2.0-2.5 s frozen correction on every refusal.

**The measured travel audit (Test C, GAME-DESIGN-LAW §2.2a).** 9 × (180 ms reach + 380 ms hop) = 5.0 s; the three refusals in the session above add 3 × 480 ms = 1.4 s; the re-approaches add 0.9 s; the finish run adds 1.5 s. **Total travel ≈ 8.8 s across a 4-6 minute session.** Under an instant cut (every traversal tween patched to `duration: 0`) the otter appears on the stone, the hook verdict is unchanged because it fires on contact, the self-counts are unchanged, the causeway still lights and **the item log is byte-identical** — travel time carries no mechanic here and the child never waits on the world before they may act.

## Art registry
```js
const ART = {
  marsh:      { kind: "shape", shape: "rect", w: 720, h: 364, fill: "structureSoft" },                                            // the water plane filling zone W, behind everything
  bank:       { kind: "shape", shape: "ellipse", w: 150, h: 120, fill: "surface2", stroke: "line", strokeWidth: 2 },
  reed:       { kind: "shape", shape: "line", points: [0, 0, 0, -46], stroke: "structure", strokeWidth: 3 },                       // zone H foreground only; never interactive
  satchel:    { kind: "shape", shape: "roundRect", w: 44, h: 34, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 8 },
  stone:      { kind: "shape", shape: "roundRect", w: 120, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },   // dark stone
  stoneLit:   { kind: "shape", shape: "roundRect", w: 120, h: 88, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 16 },
  post:       { kind: "shape", shape: "rect", w: 6, h: 40, fill: "structure" },
  hook:       { kind: "shape", shape: "arc", r: 9, stroke: "structure", strokeWidth: 3 },
  rod:        { kind: "shape", shape: "rect", w: 100, h: 12, fill: "structure", stroke: "bg", strokeWidth: 1 },                    // TEN cubes long, horizontal
  notch:      { kind: "shape", shape: "line", points: [0, -6, 0, 6], stroke: "bg", strokeWidth: 1 },                               // 9 of these across a rod, 10 px apart
  cube:       { kind: "shape", shape: "rect", w: 10, h: 10, fill: "accent", stroke: "bg", strokeWidth: 1 },                        // exactly one rod segment
  lantern:    { kind: "svg", value: LCSArt.get("lantern.lit"), size: 56, fallback: "🏮" },                                          // cream glass; the numeral is drawn on it, 40 px display ink
  lanternHung:{ kind: "svg", value: LCSArt.get("lantern.hung"), size: 34, fallback: "🏮" },
  otterIdle:  { kind: "svg", value: LCSArt.get("otter.idle"),  size: 84, fallback: "🦦" },                                          // if the platform lacks U+1F9A6 the library's bear 🐻 stands in
  otterReach: { kind: "svg", value: LCSArt.get("otter.reach"), size: 84, fallback: "🦦" },
  otterHop:   { kind: "svg", value: LCSArt.get("otter.hop"),   size: 84, fallback: "🦦" },
  otterHang:  { kind: "svg", value: LCSArt.get("otter.hang"),  size: 84, fallback: "🦦" },
  otterHappy: { kind: "svg", value: LCSArt.get("otter.happy"), size: 84, fallback: "🦦" },
  kit:        { kind: "svg", value: LCSArt.get("otter.kit"),   size: 44, fallback: "🦦" },
  lodge:      { kind: "svg", value: LCSArt.get("lodge"),       size: 128, fallback: "🏠" },
  landing:    { kind: "shape", shape: "roundRect", w: 96, h: 40, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 10 },
  countBadge: { kind: "shape", shape: "roundRect", w: 30, h: 18, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 4 },     // numeral 12 px display structure
  hintRing:   { kind: "shape", shape: "roundRect", w: 132, h: 140, stroke: "structure", strokeWidth: 4, radius: 18 },              // around a stone AND its post
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },                                           // Finish screen only
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }                                                          // Finish screen only
};
```
No other emoji and no other shape parameters appear anywhere in the game. The five otter poses are discrete swapped drawings, never a loop and never a bobber. A rod is distinguished from a cube by size AND notching AND colour, never by colour alone; a lit stone is distinguished from a dark one by its hung lantern AND its stroke weight AND its fill, never by colour alone.

## Animation registry
```js
const ANIM = {
  reach:     { duration: 180, ease: "Sine.Out",    trigger: "the otter leans and its forepaw lands on the tapped stone (x, y set at call) — THIS IS THE COMMIT" },
  hop:       { duration: 380, ease: "Sine.InOut",  trigger: "the rest of the otter follows onto an accepted stone (x, y set at call)" },
  tip:       { angle: 6, duration: 140, ease: "Sine.InOut", yoyo: true, trigger: "a refused stone rolls under the paw and back" },
  withdraw:  { duration: 160, ease: "Sine.In",     trigger: "the paw returns to the otter's own stone after a refusal (x, y set at call)" },
  hang:      { y: "+=18", scale: 1, duration: 260, ease: "Back.Out", trigger: "the lantern settles onto a hook (from scale 0.6, y -18)" },
  light:     { alpha: 1, duration: 300, ease: "Sine.Out", trigger: "a stone swaps to ART.stoneLit (from alpha 0)" },
  rodGlow:   { alpha: 1, duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "the rod's whole length brightens as its single '10' badge appears (from alpha 0.35)" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges during a self-count, 250 ms apart (from alpha 0, scale 0.5)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "count badges 900 ms after a self-count ends" },
  swing:     { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the lantern swings back on an offer that is not a pair at all" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true stone (from alpha 0.2)" },
  stepBack:  { duration: 220, ease: "Sine.InOut",  trigger: "one hop of the re-approach along lit stones (x, y set at call); no decision is open during it" },
  arrive:    { duration: 520, ease: "Sine.InOut",  trigger: "each leg of the finish run along the lit causeway to the landing; total <= 1500 ms" },
  meet:      { duration: 420, ease: "Sine.Out",    trigger: "the two kits walk out of the lodge onto the landing (finish only)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```
No idle loop, no bob, no ambient drift: **zero tweens run while any target is enabled** (F-42, the two-beat gate). Nothing toggles visibility faster than 3 times per second; `showMe` cycles at 1 Hz and badges appear once per self-count.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed; `RENDER_SCALE = 3` with `stageCam(scene)` per §1/§2.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                 │  zone T 0-56   chrome only
 56   ├──────────────────────────────────────────────────────────────┤
      │  S1 108,106   S2 284,106   S3 460,106   S4 636,106            │
      │  [13]         [14]         [17]         [19]                  │  zone W 56-420
      │        S5 196,234   S6 372,234   S7 548,234                   │  THE WORLD
      │ (bank) [12]         [16]         [18]        ( lodge 580,350 )│  board + hero +
      │  44,234      S8 152,362   S9 328,362         ( landing 472,386)  destination +
      │  otter 62,204 [11]         [15]                                │  history
420   ├──────────────────────────────────────────────────────────────┤
      │  reeds and still water — inert, no controls, ever              │  zone H 420-560
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `[n]` = the teen a stone's bundle makes in layout A. Stones are 120 × 88; each carries `ART.rod` + nine `ART.notch` + its `ART.cube`s, plus `ART.post` and `ART.hook` at stone centre + (44, −44). The otter stands at stone centre + (0, −30) and holds its lantern at otter centre + (30, −6).

**Bundle layouts inside a stone face, relative to its centre.** **Canonical** (near tier S1, S5, S8): rod at (0, −20); cubes 1-5 in a row at y = 0, x = −45 + i × 12; cubes 6-9 in a second row at y = +16 from the same x. **Cubes-above** (middle tier, and the mildest far-tier form): rod at (0, +22); cubes 1-5 at y = +2 and 6-9 at y = −14. **Cubes-left** (far tier): rod at (+16, 0); cubes in two columns at x = −52 and x = −40, y = −24, −12, 0, +12, +24 top-down. **Cubes-split** (far tier): rod at (0, 0); ceil(k/2) cubes above at y = −18 and floor(k/2) below at y = +18, each row centred on x = 0 at a 12 px pitch.

Tap floors: stones are 120 × 88, over the 56 px floor for 6-8; the smallest gap between two stone faces is 44 px, over the 12 px minimum. Tab order: the live stones in causeway order, nearest hop first. `?embed=1`: the picker is not created; nothing else changes.

## Visual specification
- Background `THEME.colour.bg`; `ART.marsh` fills zone W behind everything; `ART.reed` heads at x = 60, 168, 300, 420, 560, 668 rising from y = 560 in zone H, inert.
- A dark stone is `ART.stone`; a settled one is `ART.stoneLit` with `ART.lanternHung` on its hook and its bundle still fully visible — the mark is the object in its new state, never a token awarded for it.
- A **live** stone sits 4 px proud of the water with its `ART.stone` stroke at 3 px; a stone that is out of reach is at rest and 0.75 alpha. Reachability is therefore carried by height AND stroke weight AND alpha, never by colour.
- `ART.rod` is drawn horizontal and TEN cubes long, its nine `ART.notch` hairlines 10 px apart, so one notch-to-notch segment is exactly one `ART.cube`. This is a correction to the pre-pivot art and it is not optional: a rod five cubes long teaches the misconception the game exists to remove.
- `ART.countBadge` appears at rod centre + (0, −22) for the "10" and at cube centre + (0, −14) for each cube badge, numeral 12 px `THEME.font.display` `THEME.colour.structure`.
- `ART.hintRing` is drawn centred on the true stone + (0, −20) so it encloses the stone and its post.
- The otter is `ART.otterIdle` at rest, `ART.otterReach` while its paw is out, `ART.otterHop` in flight, `ART.otterHang` while a lantern goes up, `ART.otterHappy` on the finish screen. It never changes pose because it was wrong.
- `ART.lodge` at (580, 350) with two `ART.kit` at the window; `ART.landing` at (472, 386); `ART.bank` at (44, 234) with `ART.satchel` at (30, 244).
- Progress is diegetic and wordless: the lit causeway lengthens and the dark stones run out, two counts moving in opposite directions, readable from a photograph at 400 px. Nothing abstract is drawn above the world during play.
- Contrast: `ink` numerals on the lantern's cream glass, `structure` badges on `bg`, `ink` on `surface` stones. Never `surface` on `accent`.

## Content
Language-neutral: numerals and block pictures only. Number words never appear — they are exactly the locale-bound surface F-108 warns about. `LOCALE_DATA` is not needed; per §17 the built game still ships `STRINGS` in all 11 locales for its title and the shared UI keys.

**Stone-value layouts.** One is chosen at random per session. Each assigns all nine teens 11-19, one per stone, so no two stones accept the same lantern.

| layout | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
|---|---|---|---|---|---|---|---|---|---|
| **A** | 13 | 14 | 17 | 19 | 12 | 16 | 18 | 11 | 15 |
| **B** | 14 | 13 | 18 | 19 | 11 | 15 | 17 | 12 | 16 |
| **C** | 12 | 15 | 17 | 19 | 11 | 16 | 18 | 13 | 14 |
| **D** | 11 | 13 | 16 | 19 | 12 | 17 | 18 | 14 | 15 |

**Authored invariant, verified per layout against the adjacency table:** every stone has at least one geometric neighbour whose value differs by **exactly one cube**, and the near tier (S1, S5, S8) always holds three of {11, 12, 13, 14} while the far tier (S3, S7, S4) always holds three of {16, 17, 18, 19}. That is what makes the near-neighbour distractor (misconception 3) available and what makes the far side of the marsh the hard side.

**Bundle layout per tier.** Near tier (S1, S5, S8): canonical. Middle tier (S2, S6, S9): canonical or cubes-above, alternating by stone index within the session. Far tier (S3, S7, S4): one each of cubes-above, cubes-left and cubes-split, assigned at random among the three.

**Lantern order.** Lanterns are drawn one at a time from the satchel, never in numeric order and never the same order twice: the next lantern carries the value of a stone in the otter's current dark neighbourhood, chosen at random among them at L1, and biased to the FARTHER tier at L2 and L3 so success routes the child deeper into the marsh. The child never controls item order (F-41).

**Live-set construction.** Given the otter on stone X and the lantern's true stone T among X's dark neighbours: the live set is T, plus the dark neighbour of X whose value is closest to T's, plus (at L2/L3) the next closest by value, up to the level's size. This makes the first distractor an output of the error being diagnosed (§8.1 distractor legality) rather than an absurd one. When fewer dark stones remain in reach than the level's size, the live set is simply what remains.

**The re-approach.** When the otter's dark neighbourhood holds fewer than two stones, the otter walks back along its own lit causeway (`ANIM.stepBack`, ≤ 3 hops, 220 ms each, no decision open) to the nearest lit stone with at least two dark neighbours. Because a lit stone stays walkable in both directions, **no dark stone is ever unreachable** and the crossing always completes. Nothing is unlit, no lantern comes down, no mark is removed.

## Rules
- **Item count**: **9** — one lantern per stone, all nine teens 11-19 exactly once, no repeats and no gaps. A session is one crossing; there is no second marsh. Session ≈ 4-6 minutes.
- **Difficulty progression**: three levels expressed as the size of the live set — L1 = 2 live stones, L2 = 3, L3 = 4 — plus the lantern's source. After **2 consecutive lanterns hung with no refusal**, the next item is one level up (cap L3) and the next lantern is biased toward the far tier when a far stone is live.
- **Adaptation**: **two refusals on one lantern**, or a refusal on two consecutive lanterns, drops the next item one level down (floor L1). After two consecutive items that needed help, `ART.hintRing` appears on the FIRST refusal instead of the second.
- **What happens on a correct answer**: `ANIM.reach` puts the paw on the stone; the stone bears weight; `tone("correct")`; `ANIM.hop` brings the otter across; the lantern rises to the hook (`ANIM.hang`); the stone becomes `ART.stoneLit` (`ANIM.light`); `GameCore.showPraise(scene, key)` with the next key of the rotation `["well_done", "great_job", "excellent", "you_did_it", "keep_going"]`. The lit causeway is one stone longer and the dark stones are one fewer. Total ACT ≤ 1120 ms.
- **What happens on a wrong answer** (per anticipated mistake):
  - **A stone whose bundle is not the lantern's number** (the rod counted as one, the digits read independently, or the near-neighbour miscount): `ANIM.tip` 6°, `tone("nudge")`, `ANIM.withdraw`; then, world frozen and all targets disabled, that stone counts itself — rod glow plus one "10" badge with `tone("tap", 10)`, then a badge per cube 11 … n with `tone("tap", k)`, 250 ms apart, fading 900 ms later. ~2.0-2.5 s, which is at or above the pre-pivot correction duration, and the world is frozen throughout.
  - **An offer that is not a pair at all** (an already-lit stone, whose hook is full; or the stone underfoot): `ANIM.swing`, `tone("nudge")`, **no self-count** — there is nothing to correct — and nothing is recorded as an error.
  - **Never on the creature.** The otter does not fall, get wet, slump, sigh or lose its lantern, and changes pose only between `reach` and `idle`. The water is calm and constant; there is no tide, no dusk, no guttering, no sinking stone. The wrong-answer screenshot and the right-answer screenshot show the same animal in the same condition — only the apparatus differs.
- **Retry behaviour**: unlimited within an item. Support escalates per lantern: second refusal → `ART.hintRing` on the true stone, held until the lantern is hung. Every item completes; success is certain (F-46). The board is never reset and nothing the child made is ever undone (THE RATCHET RULE).
- **Anti-brute-force guard — THE HOOK AND THE SETTLED STONE.** P1's tile re-shuffle is impossible here and is not used: a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the marsh a place. Three diegetic parts replace it.
  1. **The stones never move; the SET moves.** All nine are fixed for the whole session. What varies per item is which are still dark and which are within a hop, so the candidate set differs every single item without one object relocating — the required form of the guard (candidate set varies, positions do not).
  2. **Commitment is a one-way door.** A lit stone is settled: it will not take a second lantern and it is never a candidate again. The child cannot clear a stone to retry it and cannot un-choose by walking back, and an item completed after any refusal never counts as first-try.
  3. **A guess costs a full correction, and the second one ends the guessing.** Every refusal runs that stone's self-count to completion with the world frozen (~2.0-2.5 s ≈ the cost of reading the bundle properly), and the second refusal on one lantern converts into instruction on a fixed schedule. Measured: with four live stones a random tapper is refused at least once on **75%** of items and reaches the show-me on **50%**; the support escalation closes the gap, so from item 3 onward a random tapper reaches the show-me on most items and never completes one without having been taught the correction. Trying them all is the slow way to be taught the same thing.
- **The last stretch.** When only one dark stone remains within reach of any lit stone, that item has a single candidate. Single-candidate items complete the crossing and are **not** counted toward the first-try record, because there is nothing to choose.
- **Finish condition**: all nine lamps lit → the otter runs the lit causeway to the landing, the kits come out, Finish scene. **No losing state exists**; the only exits are Finish and Menu. Nothing in the world may decay: no lamp goes out, no lantern comes down, no stone sinks, no meter empties, and the lodge never moves further away.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")` (Finish screen only), and the praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Lantern Marsh"
- **No words appear on the play screen at any moment.** The mission premise is carried entirely by the opening picture — otter, lit lantern, nine dark stones, lodge with two kits at the window — so the 6-8 text budget of 8 English words including the premise is spent on a two-word title and nothing else. Per §17 the built game ships `title` in all 11 locales, authored natively (never machine-translated); Nordic rows may carry an `[NSR-FLAG]`.

## Sound
`GameCore.tone` only (§11). `tone("tap")` when the paw lands on a stone; `tone("tap", 10)` when a rod's "10" badge appears and `tone("tap", k)` for each cube badge k = 11 … n, so the ten is a jump in pitch and each one is a small step and the structure is audible (F-213); `tone("correct")` when a stone bears weight; `tone("nudge")` on a refusal and on a not-a-pair offer — mellow, never a buzzer; `tone("finish")` once when the otter reaches the landing. Silent under `?sound=off`; no audio files, no speech, no music. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu" and the praise pops; the play screen has no words in any language.
- [ ] Works at narrow width: in a 400-px-wide iframe all nine stones, their rods and cubes, the numeral on the lantern, the lodge and the two kits are separately legible, and a rod is visibly ten cubes long.
- [ ] Keyboard operable: Tab cycles the live stones in causeway order, Enter commits, and the focus ring is visible on the stone under focus.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: any number of refusals still ends with all nine lamps lit and the otter at the lodge; the show-me appears after two refusals on one lantern.
- [ ] **The mission is load-bearing (Deletion B).** `_tools/mutate-mission.js` strips the hero and the goal; the candidate set is defined as the dark stones within one hop of the hero, so **item 1 must fail to complete**. This is a code property, not a picture property — a build that draws this world and then writes `if (tapped === item.answer)` passes every other gate and must fail this one.
- [ ] **Deletion A**: with the numerals off the lanterns and the bundles off the stones, every hook takes every lantern and nothing playable remains — an otter walking nine stones with no decision at any point.
- [ ] **Instant cut (Test C)**: with every traversal tween at `duration: 0` the item log is byte-identical and the session plays the same; the measured travel total is ≈ 8.8 s in a 4-6 minute session.
- [ ] **The ratchet rule**: across a full session with a refusal on every item, no lamp ever goes out, no lantern ever comes down, no stone ever goes dark again, and the lodge's coordinates never change.
- [ ] **The character is never the consequence**: the wrong-answer screenshot and the right-answer screenshot show the otter in the same condition; only the apparatus differs.
- [ ] **Zero tweens run while any target is enabled** (asserted at every decision point of a `qa-game` session), and zone H holds no interactive element in any state.
- [ ] A refused stone counts itself "10, 11, 12 …" with the rod taking exactly one badge, and the lantern's numeral stays on screen throughout the count.
- [ ] Offering the lantern to an already-lit stone or to the stone underfoot swings it back with no count and records nothing.
- [ ] The re-approach fires when fewer than two dark stones are in reach, walks only over lit stones, and leaves the world unchanged.
- [ ] At the far stones the cubes appear above the rod, in a column at its left end, or split around it, and hanging a lantern still works.
- [ ] Two lanterns hung with no refusal are followed by a larger live set and a lantern from a farther stone; two refusals on one lantern are followed by a smaller one.
- [ ] The Finish screen re-draws the marsh at its play coordinates and asserts **properties** — nine stones lit, hero on the landing, both kits out, zero empty hooks — never a pixel match, because the route wanders and no two sessions end identically.
- [ ] If the otter drawing is missing on the device the declared fallback appears instead.
- [ ] With `?sound=off` nothing is audible; with sound on, the rod's "10" is a jump in pitch and each cube a small step.

## Open risks, declared rather than hidden
1. **The hook is conventional.** The fully physical fit was designed and rejected on measured geometry, not taste; the physics lives in the correction. A shape-sorter joint would need a smaller value range, not a smaller cube.
2. **Item count drops from 8-14 pairs to 9 lanterns**, session ≈ 4-6 min against the previous 5-6. Nine fixed stones forces nine distinct values (two stones with the same bundle would both accept the same lantern), which buys full 11-19 coverage with no repeats and no gaps — something the previous random boards did not guarantee. The trade wants the operator's eye.
3. **The adaptive ladder changes mechanism.** Content difficulty cannot be re-rolled mid-session because the world is persistent and honest: all nine bundles are on screen from tap one. Difficulty is therefore geography (near canonical, far non-canonical) plus support density (live-set size, ring on the second or first refusal). The 2-up/2-down semantics are preserved; the machinery is not the same machinery.
4. **Misconception 4 changed shape**, from identity to class. Flagged in `## Learning`, not dropped; the count holds at 4, the band floor.
5. **Nine bundles on screen at once is more visual information than eight tiles.** Each stone is one long bar plus a few small squares, which should read cleanly, but this is the claim most likely to be wrong and it must be checked at a real 400-px-wide iframe before anything else is trusted.
6. **The rod must be redrawn ten cubes long.** Non-negotiable in this world, and it retires a defect that has been shipping.
7. **The last one or two items are single-candidate** by construction. Honest as a last stretch home, and excluded from the first-try record.
8. **Frame distinctness.** `../MISSIONS.md` maps P12 primarily to THE FOLLOWING; taking THE CROSSING here keeps 017 out of that family, but `_tools/check-redundancy.js` must be re-run against the transformed designs, not the originals, and the other P12 rows must not all be given a causeway.
9. **The motivation claim is unmeasured** (Wouters 2013, d = 0.26, not significant). A six-year-old should want to light the marsh; that has not been measured, the fox passed every gate three times and was rejected on sight, and this should go to a local link and a child before it goes anywhere else.
