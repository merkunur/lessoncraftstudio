# 018 — Tens and Ones Shop

## Identity
- Slug: `tens-and-ones-shop`
- Subject / topic: Mathematics / two-digit numbers (10-99) built from ten-rods and one-cubes
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap the rod or cube source, then tap the tray), judged on Check
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (whole-arrangement judgement on a Check tile). Everything below adds to those; nothing overrides them.

## Learning
- Objective: Builds a two-digit number (10-99) shown on a price tag by placing the right number of ten-rods and one-cubes into a tray, then checks it.
- Prerequisites: Reads two-digit numerals; knows a rod is ten ones (games 016/017). Reads nothing else.
- Curriculum links: F-108 (digits as independent numbers; zero placeholder ignored; de/nl/da inverted number words; "tens as bundled rods that cannot be split without an action"), F-50 (base-ten blocks are an evidence-backed manipulative), F-21, F-31 row "Place value tens/ones" — conservative 7-8, earliest 5 → 6-8 (US 1.NBT.B.2 "the two digits of a two-digit number represent amounts of tens and ones"; England Y2 "recognise the place value of each digit in a two-digit number"; Germany Klasse 1-2 "Zehner und Einer"; France CP-CE1 "dizaines et unités"; Netherlands groep 4 "tientallen en eenheden"; Spain 1º ciclo; Brazil EF02MA04; Sweden åk 1-3; Finland grades 1-2).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Digits treated as independent, or the number word's order followed (34 built as 4 rods and 3 cubes; German "vierunddreißig" says four first).** Response: on Check the tray counts itself the place-value way — rods 10, 20, 30, 40 then cubes 41, 42, 43 — and `ART.trayTotal` shows "43" beside the tag's "34"; the tag's tens digit and the rods pulse together (`ART.digitHi` over the digit, `ANIM.pulse` on the rods), then the ones digit and the cubes. The layout tens-then-ones is the anchor, never the word order.
  2. **Zero placeholder ignored (30 built as 3 cubes, or as 3 rods and 3 cubes).** Response: L2 and L3 include prices ending in 0; the self-count ends on "3" (or "33"), the tag's "0" gets `ART.digitHi` and an empty cube area is outlined (`ART.emptyOnes`) to show that the ones place holds nothing.
  3. **Building the ones with ten or more cubes instead of a rod (23 as 23 cubes).** Response: the tray accepts up to 20 cubes; on Check every full group of ten cubes bundles itself into a rod (`ANIM.bundle`: ten cubes glide together and become one rod in the rod area, `tone("tap", 10)`) BEFORE the self-count, so the child sees the regrouping happen; if the total is then correct the item is correct (the regroup was the lesson, and the item counts as solved-with-help, not first-try).
  4. **Splitting a rod to adjust by one (wanting 29 after building 30).** Response: rods cannot be split — tapping a rod in the tray removes the WHOLE rod (it glides back to the source); a cube must be placed to make 29 from 20. The object refuses the impossible action (F-61); no message.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Tens and Ones Shop"): the fox shopkeeper (`ART.fox`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: price 23).** The Play scene builds: the dot rail of 10 hollow dots at y = 28 (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the fox at (60, 120); the toy for sale (`ART.toy`) at (140, 150) with its price tag (`ART.tag`, 96 × 64) hanging at (140, 228) showing `ART.priceNumeral` "23" (40 px); the tray (`ART.tray`, 400 × 170) centred at (470, 160), a `makeTile` destination with a faint divider (`ART.divider`) at x = 520 splitting a rod area (left) from a cube area (right); `ART.trayTotal` at (470, 262) hidden. Zone B: the rod source (`ART.sourceTile` 120 × 120 at (260, 380) showing one `ART.rod` and `ART.rodLabel` "10") and the cube source (`ART.sourceTile` at (460, 380) showing one `ART.cube` and `ART.cubeLabel` "1"). Zone C: Check (`makeButton ok`, label `t("ok")`) at (360, 510), disabled (alpha 0.5) until the tray holds at least one block. Caption `S("build")` ("Build the price") at (360, 300), 24 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **Placing.** The child taps the rod source (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then taps the tray: a rod glides (`ANIM.glide`) from the source to the next rod position in the tray (x = 300 + i × 24, y = 150, up to 9 rods) with `tone("tap", 10 × (i + 1))` capped at the tone's range; the source stays selected so repeated tray taps place more rods (one tap each). Tapping the cube source switches the selection; tray taps then place cubes at x = 540 + (j mod 5) × 22, y = 110 + floor(j / 5) × 24 (up to 20 cubes, four rows), `tone("tap", 1)`. Tapping a rod or cube IN the tray removes it (it glides back to its source and vanishes; later blocks close up the gap). A tenth rod or a twenty-first cube is refused: the block springs back with `ANIM.nudge`, no message. Check enables at the first placed block.
4. **Check.** The child taps OK.
   - **Bundling first:** if the tray holds ≥ 10 cubes, each full ten glides together into a rod (`ANIM.bundle`, 500 ms per bundle) and takes the next rod position.
   - **Self-count:** rods get `ART.countBadge`s 10, 20, … in turn (250 ms apart, `tone("tap", k)`), then cubes 21, 22, 23; `ART.trayTotal` appears with the total.
   - **Correct (2 rods, 3 cubes = 23):** the tag `ANIM.pop`s, `tone("correct")`, `GameCore.showPraise(scene, key)` with the next praise key; the toy glides (`ANIM.glide`) into the shopping bag (`ART.bag` at (620, 400)) and the fox `ANIM.nod`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`) with an empty tray.
   - **Wrong:** `tone("nudge")`; `ART.trayTotal` stays visible beside the price; the enacted hint per mistake (Rules) plays; the Check tile disables until the child changes the tray. Attempt 2.
   - **Attempt 3** (a second wrong Check): the show-me — ghost outlines of the correct arrangement (`ART.ghostRod` × tens, `ART.ghostCube` × ones) appear in the tray at the exact positions; blocks already correctly placed sit on their ghosts; the child fills the remaining ghosts (a block placed on a ghost fills it; surplus blocks are the ones without a ghost beneath and pulse until removed) and taps OK, which now carries the show-me ring (`ART.showRing`, `ANIM.showMe`); the item completes as solved-with-help (no praise pop; the toy still goes into the bag).
5. **Items 2-10.** Built from the level pools in Content by the Rules. Every item starts with an empty tray. The toy changes per item (`ART.toy` … `ART.toy4`, cycling).
6. **Finish** (after 10 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the fox at (360, 210) with `ANIM.celebrate` and the full bag (`ART.bag`) at (450, 230). Zone B: the ten prices as chips (`ART.priceChip`, 64 × 36) in a row at y = 400 (x = 360 − 4.5 × 70 + i × 70), each with tiny blocks beneath (`ART.miniRod` × tens, `ART.miniCube` × ones) — the visual summary; optional `t("question_x_of_y")` with n = first-try items at (360, 460). Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 6-7 minutes: 10 items × (3-18 placements + Check ≈ 35-45 s).

## Art registry
```js
const ART = {
  fox:          { kind: "emoji", value: "🦊", size: 80 },
  toy:          { kind: "emoji", value: "🧸", size: 72 },
  toy2:         { kind: "emoji", value: "🚗", size: 72 },
  toy3:         { kind: "emoji", value: "⚽", size: 72 },
  toy4:         { kind: "emoji", value: "🎈", size: 72 },
  bag:          { kind: "emoji", value: "🛍️", size: 64 },
  tag:          { kind: "shape", shape: "roundRect", w: 96, h: 64, fill: "surface", stroke: "accent", strokeWidth: 3, radius: 10 },
  priceNumeral: { kind: "text",  value: "", size: 40, font: "display", color: "ink" },                     // the price, centred on the tag
  digitHi:      { kind: "shape", shape: "roundRect", w: 30, h: 48, stroke: "accent", strokeWidth: 3, radius: 6 },   // around one digit of the price during a hint
  tray:         { kind: "shape", shape: "roundRect", w: 400, h: 170, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 16 },
  divider:      { kind: "shape", shape: "line", w: 2, stroke: "line", strokeWidth: 2 },                    // vertical, 150 tall, at x = 520
  rod:          { kind: "shape", shape: "rect", w: 16, h: 80, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches (line token) 8 px apart
  cube:         { kind: "shape", shape: "rect", w: 18, h: 18, fill: "accent", stroke: "bg", strokeWidth: 1 },
  ghostRod:     { kind: "shape", shape: "rect", w: 16, h: 80, stroke: "structure", strokeWidth: 2 },      // dashed (lineDash [6,4])
  ghostCube:    { kind: "shape", shape: "rect", w: 18, h: 18, stroke: "accent", strokeWidth: 2 },         // dashed
  emptyOnes:    { kind: "shape", shape: "roundRect", w: 120, h: 110, stroke: "accent", strokeWidth: 2, radius: 8 },   // dashed outline of the empty cube area
  sourceTile:   { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  rodLabel:     { kind: "text",  value: "10", size: 28, font: "display", color: "structure" },
  cubeLabel:    { kind: "text",  value: "1", size: 28, font: "display", color: "structure" },
  countBadge:   { kind: "shape", shape: "roundRect", w: 34, h: 20, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 4 },   // numeral 13 px display structure
  trayTotal:    { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },   // around the Check button
  priceChip:    { kind: "shape", shape: "roundRect", w: 64, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniRod:      { kind: "shape", shape: "rect", w: 4, h: 18, fill: "structure" },
  miniCube:     { kind: "shape", shape: "rect", w: 4, h: 4, fill: "accent" },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Rods and cubes differ by size AND shape AND notches, never by colour alone. The art upgrade replaces the toys, fox and bag glyphs and may replace the blocks with SVG; nothing else changes.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "a source tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a block from its source to its tray position / back; the toy into the bag (x, y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a refused tenth rod / twenty-first cube; surplus blocks during show-me" },
  bundle:    { duration: 500, ease: "Sine.InOut", trigger: "ten cubes glide to one point (x, y = the next rod position) and are replaced by a rod (alpha swap over the last 100 ms)" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 250 ms apart (from alpha 0, scale 0.5)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the tag on a correct Check" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the rod group / cube group / a digit outline during a hint" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "fox on a correct Check" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item; ghost outlines (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the Check button during show-me (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish fox" }
};
```
No flashing: `showMe` cycles at 1 Hz; `pulse` at ≤ 1.7 Hz.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ fox     toy          ┌────────────────────┬─────────────┐     │
      │ (60,120)(140,150)    │ rods  | | |        │ cubes ::::: │     │  zone A
      │         ┌tag┐        │ x=300+i×24, y=150  │ x=540+j×22  │     │
      │         │ 23│(140,228)└────────────────────┴─────────────┘     │
      │         └───┘         ART.tray (470,160) 400×170; total (470,262)│
260   ├──────────────────────────────────────────────────────────────┤
      │            "Build the price" (360,300)                        │
      │        [ rod 10 ]              [ cube 1 ]   sources y=380     │  zone B
      │         (260,380)               (460,380)   120×120           │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)        bag (620,400)  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Rod positions: x = 300 + i × 24 (i = 0 … 8), y = 150. Cube positions: x = 540 + (j mod 5) × 22, y = 110 + floor(j / 5) × 24 (j = 0 … 19). The divider at x = 520.

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 10 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 261 + i × 22); filled dots use `ART.dotFull`. `t("question_x_of_y")` at (360, 48).
- `ART.fox` (60, 120); the item's toy glyph at (140, 150); `ART.tag` at (140, 228) with `ART.priceNumeral` centred; `ART.digitHi` around the tens digit (x − 16) or the ones digit (x + 16) of the price during a hint.
- Tray: `makeTile(scene, 470, 160, 400, 170, { fill: THEME.colour.surface2, stroke: THEME.colour.structure, onTap: placeSelected })` with `ART.divider` at x = 520; rods `ART.rod` and cubes `ART.cube` at the positions above, each block a small `makeTile` hit area (rods 24 × 80, cubes 22 × 22 enlarged to a 44 × 44 hit area that may overlap neighbours — the topmost wins) so it can be removed by tap and reached by keyboard.
- Sources: `makeTile` 120 × 120 with `ART.sourceTile` tokens; the rod source draws `ART.rod` at (−20, 0) and `ART.rodLabel` at (+24, 0); the cube source draws `ART.cube` at (−20, 0) and `ART.cubeLabel` at (+24, 0). Selected = library selected look + `ANIM.lift`; the selection persists across tray taps until the other source is tapped.
- `ART.trayTotal` at (470, 262), hidden until Check; `ART.countBadge` above each rod (rod centre + (0, −50)) and beside each cube (cube centre + (0, −16)) during a self-count.
- `ART.emptyOnes` centred on the cube area (600, 150) during the zero-placeholder hint; `ART.ghostRod` / `ART.ghostCube` at the correct positions during show-me; `ART.showRing` around OK.
- Check: `makeButton ok` at (360, 510), alpha 0.5 while disabled. `ART.bag` at (620, 400).
- Caption `S("build")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 300), `wordWrap` width 400, max 2 lines.
- Tap floors: sources 120, tray 400 × 170, OK 220 × 72, block hit areas 44 (the in-tray blocks are removal targets and are reachable by keyboard; their small size is accepted because a missed removal tap lands on the tray and does nothing when no source is selected — the child re-taps).
- Tab order: rod source, cube source, tray, then the blocks in the tray in placement order, then OK.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: the price is a bare numeral with NO currency symbol (money is market-conditional and absent from Nordic curricula, F-29; the "shop" is a frame, not a money objective). One caption is a game-specific string. `LOCALE_DATA` not needed.

Items as prices (tens; ones):
- **L1** (11-39, ones 1-5): 23 (2; 3) · 15 (1; 5) · 31 (3; 1) · 34 (3; 4) · 12 (1; 2) · 25 (2; 5)
- **L2** (40-79, any ones including 0): 47 (4; 7) · 60 (6; 0) · 58 (5; 8) · 72 (7; 2) · 40 (4; 0) · 66 (6; 6)
- **L3** (80-99, including 0 ones and "reversal traps" whose digits are both plausible): 83 (8; 3) · 90 (9; 0) · 97 (9; 7) · 88 (8; 8) · 91 (9; 1) · 79 (7; 9)

Play list: 10 items; start at L1; shuffle within the level without repeats; level changes per Rules; if a pool is exhausted it is reused reshuffled. Toys cycle `ART.toy`, `ART.toy2`, `ART.toy3`, `ART.toy4` in order.

## Rules
- Item count: 10.
- Difficulty progression: after 2 consecutive first-try correct Checks, the next item comes from the next level up (cap L3). "First-try correct" = the first Check was correct with no bundling needed.
- Adaptation: a wrong Check, or non-first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap and the tray is empty, the rod source `ANIM.pulse`s once; if the tray is non-empty, OK `ANIM.pulse`s once. Repeats every 6 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: bundling (if any), self-count with badges and rising tones, `ART.trayTotal` equals the price, `ANIM.pop` on the tag, `tone("correct")`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, toy glides into the bag, fox `ANIM.nod`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Digits swapped (4 rods 3 cubes for 34)** (digits independent / word order): self-count → total "43"; `ART.digitHi` on the tag's tens digit while the rods `ANIM.pulse`, then on the ones digit while the cubes pulse; `tone("nudge")`; Check disabled until the tray changes.
  - **Zero ones built with cubes or extra rods (30 as 3 cubes, or 3 rods + 3 cubes)**: self-count; `ART.digitHi` on the "0"; `ART.emptyOnes` outlines the cube area (which should be empty) and pulses.
  - **Too many / too few rods or cubes by one or two**: self-count; the group that is off (`rods` or `cubes`) pulses and the matching digit gets `ART.digitHi`; the total shows the difference.
  - **Ten or more cubes**: bundled into rods BEFORE the self-count (`ANIM.bundle`); if the total is then correct the item completes as solved-with-help; otherwise the hints above apply to the bundled tray.
  - **Tenth rod / twenty-first cube**: refused with `ANIM.nudge`, no message, no attempt counted.
  - **Removing a rod**: the whole rod leaves (never one cube); no message.
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted hint → attempt 3 with the ghost arrangement and the ringed OK; completing the ghosts is solved-with-help. No attempt 4.
- Finish condition: 10 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Tens and Ones Shop"
  - `build` = "Build the price"

## Sound
`GameCore.tone` only (§11): `tone("tap")` on selecting a source; `tone("tap", 10)` when a rod lands and `tone("tap", 1)` when a cube lands (a rod sounds a big step, a cube a small one); `tone("tap", k)` per badge during the self-count (k = tens count for rods, then one step per cube); `tone("tap", 10)` on each bundle; `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, OK, "Question 3 of 10", "All done!", "Play again", "Menu" and the praise pops; "Build the price" changes once translations are loaded; no currency symbol appears in any language.
- [ ] Works at narrow width: in a 400-px-wide iframe the tag, tray, both sources and OK are visible; nine rods and twenty cubes fit inside the tray outline.
- [ ] Keyboard operable: Tab reaches the rod source, cube source, tray, placed blocks and OK; Enter selects / places / removes / checks.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong Checks never end the session; the ghost arrangement and the ringed OK always complete the item.
- [ ] Tapping the rod source then the tray three times places three rods in a row at the left; tapping the cube source then the tray places cubes at the right in rows of five.
- [ ] Tapping a rod in the tray removes the whole rod; it is never possible to remove part of a rod.
- [ ] OK is dimmed while the tray is empty; after OK the rods count 10, 20, 30 and the cubes continue 31, 32 with badges, then the total appears under the tray.
- [ ] Building 43 for a price of 34 shows "43" beside "34", outlines the 3 on the tag while the rods pulse, then the 4 while the cubes pulse.
- [ ] Placing 12 cubes and tapping OK bundles ten of them into a rod before counting.
- [ ] A price ending in 0 built with cubes in the ones area outlines the empty cube area and the 0 on the tag.
- [ ] Two first-try corrects in a row bring bigger prices; a wrong Check brings smaller ones next.
- [ ] The finish screen shows ten price chips with tiny blocks beneath and no score beyond the optional "n of 10".
- [ ] With `?sound=off` nothing is audible; with sound on, a rod landing sounds a bigger step than a cube.
