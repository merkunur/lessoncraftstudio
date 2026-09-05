# 022 — Bond Bracelets

## Identity
- Slug: `bond-bracelets`
- Subject / topic: Mathematics / decomposing a whole of 6-10 into two parts in several different ways
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (select the clasp, then tap the gap where it goes)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Content is language-neutral (beads and numerals); no `LOCALE_DATA`.

## Learning
- Objective: Splits a bracelet of N beads (6 ≤ N ≤ 10) into two parts by placing a clasp, and records three DIFFERENT splits of the same whole on a tally.
- Prerequisites: Counts to 10; reads numerals to 10; has met "two parts make a whole" with concrete objects (games 003, 004, 021).
- Curriculum links: F-21 (number composition to 10 / part-whole in all twelve systems), F-1 (number bonds in 8 of 15 sources), F-31 row "Number bonds to 10 / part-whole" — conservative 7, earliest 4 → 6-8 (US K.OA.A.3 "decompose numbers … in more than one way"; England Y1 "number bonds within 10"; Germany Klasse 1 "alle Zerlegungen der Zahlen bis 10"; France CP "décompositions additives des nombres jusqu'à 10"; Netherlands groep 3 "splitsen tot 10"; Spain 1º ciclo "descomposición"; Brazil EF01MA07; Sweden åk 1 "talkamrater"; Finland grade 1 "lukujen hajottaminen"; Norway 1. trinn).
- Common misconceptions (F-104, F-101), each with this game's response:
  1. **Thinking a number has only one way to be split ("6 is 3 and 3, that's it").** Response: the item does not complete until three different splits are on the tally; after the first split the tally shows two empty chips (`ART.tallyEmpty`) beside the recorded one, so "more ways" is visible as unfilled slots, not stated.
  2. **Offering the mirror of a recorded split as a new way (4 + 2 after 2 + 4).** Response: the clasp is accepted as a placement (it lands) but the Check is refused: the recorded chip `ANIM.pulse`s, the clasp glides (`ANIM.glide`) to the mirror position so the child sees the same two parts the other way round, then the equation reads "4 + 2" under the pulsing "2 + 4" chip for 900 ms. The tally records UNORDERED pairs (a design decision: "different ways" means different parts). The refused attempt counts as retried, never as a failure.
  3. **Counting the parts wrongly after placing the clasp (reading 4 beads as 3).** Response: the parts are counted FOR the child every time the clasp lands: each bead left of the clasp gets `ART.countBadge` 1…a (200 ms apart, `tone("tap", k)`), then each bead right of it 1…b, and `ART.eqText` shows "a + b = N". The child never types a count; the split is the answer.
  4. **Believing the whole changes when the split changes (6 split as 2 + 4 "is a different 6").** Response: the whole numeral (`ART.wholeTag` "6") stays fixed above the bracelet through all three splits, and every tally chip ends "= 6"; the bracelet never gains or loses a bead.
  5. **Not seeing 6 + 0 as a split (L3).** Response: at L3 the two END gaps become slots too; placing the clasp at an end gives "10 + 0 = 10", which the tally accepts as one of the three ways (a legitimate bond, included on purpose).

## How it plays
1. **Start screen**: title "Bond Bracelets", the parrot (`ART.parrot`) at (360, 200), Start, picker.
2. **Item 1 (L1: N = 6)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the whole tag (`ART.wholeTag` "6" on `ART.wholeBadge`) at (360, 90); the bracelet — a string (`ART.string`, a `line` bar) at y = 170 with N beads (`ART.bead`, 44 × 44, pitch 56) centred: for N = 6 beads at x = 220 … 500; between adjacent beads a gap slot (`ART.gapSlot`, 56 × 56 `makeTile`, dashed when empty) at x = 248, 304, 360, 416, 472 (N − 1 slots). Zone B: the clasp tray at (360, 300): one clasp tile (`ART.clasp`, 80 × 80) in the tray (`ART.tray`), and the tally — three chips (`ART.tallyEmpty`, 150 × 44) at y = 400, x = 180 / 360 / 540, empty. Zone C: Check (`makeButton ok`) at (360, 510), disabled until the clasp is placed. Caption `S("threeWays")` ("Find 3 ways") at (360, 250), 24 px `THEME.colour.inkSoft`.
3. **Placing**: tap the clasp (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap a gap slot; the clasp glides (`ANIM.glide`) into the slot and snaps to the string. The beads to its left take the `ART.beadA` look (solid `structure` with a small square glyph `ART.markA`), the beads to its right `ART.beadB` (hollow with a thick `accent` ring and a triangle glyph `ART.markB`) — two glyphs so the parts differ by shape, not colour alone. Then the count-out (misconception 3) and `ART.eqText` "2 + 4 = 6" at (360, 215). Check enables. Tapping the placed clasp returns it to the tray (undo, no penalty); tapping a different gap slot while the clasp is placed moves it there directly (the slot's `onTap` re-places); tapping the tray while the clasp is placed does nothing.
4. **Check**:
   - **New split**: `tone("correct")`; a copy of the equation flies (`ANIM.glide`) into the next empty tally chip, which becomes `ART.tallyChip` "2 + 4"; the beads keep their two-part look for 500 ms then return to plain `ART.bead`; the clasp glides back to the tray; the parrot `ANIM.bob`. If this was the third chip → item complete: praise pop (rotation), rail dot fills, `ART.wholeTag` `ANIM.pop`, next item after 800 ms.
   - **Repeated split (identical or mirror)**: `tone("nudge")`; the matching chip `ANIM.pulse`s; for a mirror, the clasp glides to the mirror gap and the equation re-reads there for 900 ms, then the clasp returns to the tray; Check disables. Attempt counter for this item + 1.
   - **Second refusal on the same item**: as above, and then one unused gap slot gains the show-me ring (`ART.showRing`, `ANIM.showMe`) — placing the clasp there and tapping Check records the chip as solved-with-help (no praise pop for that chip).
5. **Items 2-10**: per Content/Rules. L1 N = 6, 7; L2 N = 8, 9; L3 N = 10 with the end gaps enabled (10 + 0 / 0 + 10 allowed, recorded as one way) and the bead numerals hidden (beads carry no numbers at any level; at L3 the string is longer so counting matters more).
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = one row per whole solved (`ART.sumRow`: the whole numeral at the left, then its three chips `ART.tallyChip` 110 × 32) — up to 10 rows would not fit, so rows are grouped by whole: each distinct N (at most 5) gets one row at y = 300 + i × 40 listing up to six chips (pitch 116); `t("question_x_of_y", {n: firstTryItems, total: 10})` at (360, 265) in 18 px `THEME.colour.inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes (10 items × 3 splits).

## Art registry
```js
const ART = {
  parrot:     { kind: "emoji", value: "🦜", size: 80, fallback: "🐦" },   // Unicode 11 → bird fallback for very old devices
  wholeBadge: { kind: "shape", shape: "circle", r: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  wholeTag:   { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  string:     { kind: "shape", shape: "rect", w: 400, h: 4, fill: "line" },       // width set per N: (N − 1) × 56 + 60
  bead:       { kind: "shape", shape: "circle", r: 22, fill: "surface", stroke: "structure", strokeWidth: 2 },
  beadA:      { kind: "shape", shape: "circle", r: 22, fill: "structure", stroke: "structure", strokeWidth: 2 },
  beadB:      { kind: "shape", shape: "circle", r: 22, fill: "surface", stroke: "accent", strokeWidth: 6 },
  markA:      { kind: "shape", shape: "rect", w: 10, h: 10, fill: "bg" },          // square glyph centred on a beadA
  markB:      { kind: "shape", shape: "polygon", points: [[0,-7],[7,6],[-7,6]], fill: "accent" },   // triangle glyph centred on a beadB
  gapSlot:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed (lineDash [6,5]) when empty
  clasp:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },  // holds claspGlyph
  claspGlyph: { kind: "shape", shape: "rect", w: 10, h: 44, fill: "structure" },   // a vertical bar: the clasp
  tray:       { kind: "shape", shape: "roundRect", w: 120, h: 100, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },
  countBadge: { kind: "shape", shape: "circle", r: 11, fill: "structure" },        // numeral 14 px display, color bg; on each bead during the count-out
  eqText:     { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  tallyEmpty: { kind: "shape", shape: "roundRect", w: 150, h: 44, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },  // dashed
  tallyChip:  { kind: "shape", shape: "roundRect", w: 150, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },  // label 22 px display ink
  showRing:   { kind: "shape", shape: "roundRect", w: 68, h: 68, stroke: "structure", strokeWidth: 4, radius: 16 },
  sumRow:     { kind: "text",  value: "", size: 22, font: "display", color: "structure" },   // the whole numeral at the left of a finish row
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "clasp selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "clasp to a gap / back to the tray / to the mirror gap; equation copy to a tally chip (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused Check (clasp and the matching chip)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the tally chip that already holds this split" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge during the count-out (from alpha 0, scale 0.5), 200 ms apart" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "whole tag when the third chip lands; a new chip landing" },
  bob:       { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "parrot on each recorded split" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on an unused gap slot (from alpha 0.2)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new bracelet and empty tally (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                      ( 6 )  wholeTag (360,90)                 │
      │   ──●─[ ]─●─[ ]─●─[ ]─●─[ ]─●─[ ]─●──   string y=170          │  zone A
      │     beads pitch 56; gap slots 56×56 between beads             │
      │                  "2 + 4 = 6"  eqText (360,215)                │
      │                  "Find 3 ways" (360,250)                      │
260   ├──────────────────────────────────────────────────────────────┤
      │                 ┌ tray ┐                                     │
      │                 │ [ | ]│  clasp (360,300)                     │  zone B
      │   [ 2 + 4 ]     [ - - ]     [ - - ]   tally y=400             │
      │    x=180         x=360       x=540    (150×44)                │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Bead x positions: first bead at 360 − (N − 1) × 28, pitch 56; gap slot i (between bead i and i + 1) at the midpoint. For N = 10 the beads span x = 108 … 612 and the L3 end slots sit at x = 80 and x = 640. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.wholeBadge` (360, 90) with `ART.wholeTag` centred (the whole N).
- `ART.string` centred (360, 170), width (N − 1) × 56 + 60. Beads `ART.bead` on it; after a placement, beads left of the clasp become `ART.beadA` + `ART.markA`, right of it `ART.beadB` + `ART.markB`. Beads are not tappable.
- Gap slots: `makeTile` 56 × 56 with `ART.gapSlot` tokens at the bead midpoints (dashed when empty); the placed clasp is drawn on the slot with `ART.claspGlyph`. At L3 two extra slots at the string's ends.
- Clasp: `makeTile` 80 × 80 (`ART.clasp` + `ART.claspGlyph`) inside `ART.tray` at (360, 300).
- Count-out: `ART.countBadge` at each bead (+0, −30), numeral 14 px `THEME.colour.bg`; `ART.eqText` at (360, 215).
- Tally: 3 × `ART.tallyEmpty` at y = 400, x = 180 / 360 / 540; filled → `ART.tallyChip` labelled "a + b" in 22 px `THEME.font.display` `THEME.colour.ink` (the whole is on the tag above, so the chip shows the two parts only).
- `ART.showRing` behind a gap slot; Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Caption `S("threeWays")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 250), `wordWrap` 600.
- `ART.parrot` at (90, 300) during play. Tap floors: slots 56, clasp 80, OK 220 × 72 (≥ 56); gaps between slots = 0 px edge-to-edge is avoided because slots sit at pitch 56 with a 44-px bead between their centres — the slots are 56 wide at pitch 56, so adjacent slots touch; to keep ≥ 12 px between targets the slot hit area is 44 × 56 (drawn 56, hit 44), leaving 12 px.
- Tab order: gap slots left to right, then the clasp, then OK. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Each item = one whole N; the child must record three different unordered splits {a, b} with a + b = N. Available splits per N (parts ≥ 1; L3 adds the 0 split):
- **L1** (N = 6, 7): N = 6 → {1,5} {2,4} {3,3} · N = 7 → {1,6} {2,5} {3,4}. Items: 6 · 7 · 6 · 7 (each whole twice, so four L1 items exist).
- **L2** (N = 8, 9): N = 8 → {1,7} {2,6} {3,5} {4,4} · N = 9 → {1,8} {2,7} {3,6} {4,5}. Items: 8 · 9 · 8 · 9.
- **L3** (N = 10, end slots enabled): {0,10} {1,9} {2,8} {3,7} {4,6} {5,5}. Items: 10 · 10 · 10 · 10.

Play list of 10 per Rules: levels in order, items within a level in the listed order (a level's list is reused from its start if exhausted). The clasp always starts in the tray; no split is pre-placed. Because all splits are valid placements, there is no "correct slot" to shuffle; what varies is which three the child chooses.

Worked example: item 1 (N = 6): 3 + 3 recorded · 2 + 4 recorded · 4 + 2 refused (chip "2 + 4" pulses, clasp shows the mirror) · 1 + 5 recorded → item done with one refusal. Item 2 (N = 7): three clean splits → two items in a row without refusal → L2. Item 3 (N = 8): 4 + 4, 2 + 6, then 6 + 2 refused, then 6 + 2 again refused → show-me ring on the {3,5} gap → 3 + 5 recorded (helped) → next item one level down (N = 7).

## Rules
- Item count: 10 (each item = three recorded splits of one whole; 30 placements).
- Difficulty progression: 2 consecutive items completed with 0 refusals → next level (cap L3).
- Adaptation: an item with 2 or more refusals → next item one level down (floor L1); an item with exactly 1 refusal → same level.
- What happens on a correct answer (a new split checked): `tone("correct")`, the equation glides into a tally chip (`ANIM.pop` on landing), beads revert, clasp returns, parrot `ANIM.bob`; when the third chip lands: praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ART.wholeTag` `ANIM.pop`, rail dot, next item after 800 ms.
- What happens on a wrong answer (a refused Check), per anticipated mistake:
  - Identical split already recorded: `tone("nudge")`, the matching chip `ANIM.pulse`s, the clasp `ANIM.nudge`s and returns to the tray.
  - Mirror split (b + a of a recorded a + b): `tone("nudge")`, the chip pulses, the clasp glides to the mirror gap where the beads re-colour and the equation re-reads "b + a = N" for 900 ms, then returns to the tray.
  - Check tapped with the clasp in the tray: cannot happen (Check disabled); after 6 s of inactivity with the clasp in the tray, the clasp `ANIM.pulse`s once (an inactivity cue, never a clock; repeats every 6 s).
  - Clasp placed then tapped: returns to the tray (undo, not an attempt).
- Retry behaviour: refusal 1 → the enacted mirror/pulse → refusal 2 → the show-me ring on an unused gap; a chip recorded with the ring showing is solved-with-help. Unlimited placements; an item always reaches three chips (success is certain).
- Finish condition: 10 items (30 chips). No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Bond Bracelets"; `threeWays` = "Find 3 ways".

## Sound
`tone("tap")` on selecting the clasp; `tone("tap", k)` on each bead during the count-out (pitch restarts for the second part); `tone("correct")` on a recorded split; `tone("nudge")` on a refused Check; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise; "Find 3 ways" once translated).
- [ ] Works at narrow width (400-px iframe: a 10-bead bracelet with its gap slots, the tray, three chips and OK are all visible).
- [ ] Keyboard operable (Tab: gap slots left to right, then the clasp, then OK; Enter selects / places / checks).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused Checks still ends with three chips per item; the show-me ring always leads to a recordable split).
- [ ] Tapping the clasp then a gap moves the clasp there; the beads on each side take two different looks (solid with a square / ringed with a triangle) and are numbered one by one.
- [ ] The equation under the bracelet always totals the whole shown above it (e.g. "2 + 4 = 6" under a 6).
- [ ] OK is dimmed while the clasp is in the tray.
- [ ] Recording 2 + 4 then trying 4 + 2 makes the "2 + 4" chip pulse and shows the clasp jumping to the mirror gap; nothing is recorded.
- [ ] Trying the same split twice pulses its chip; two refusals on one item make an unused gap glow.
- [ ] At the third level the clasp can sit at either end of the string and "10 + 0 = 10" is recorded as a way.
- [ ] Two clean items in a row bring a longer bracelet; an item with two refusals brings a shorter one.
- [ ] The finish screen lists each whole with its recorded splits and no score.
- [ ] If the parrot emoji is missing on the device a bird appears instead.
- [ ] With `?sound=off` nothing is audible.
