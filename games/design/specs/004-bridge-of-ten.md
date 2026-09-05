# 004 — Bridge of Ten

## Identity
- Slug: `bridge-of-ten`
- Subject / topic: Mathematics / pairs that make 10 (number bonds to 10)
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (select a source, then a destination)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2.

## Learning
- Objective: Chooses two numbers from a tray whose sum is exactly 10 and places them as the two halves of a bridge.
- Prerequisites: Counts to 10; reads numerals to 10; has met "how many more to make 10" on a ten-frame (game 003).
- Curriculum links: F-1 (number bonds to 10 in 8 of 15 sources; Topmarks/ICT Games flagship content), F-4, F-21 ("number composition to 10 / number bonds" in all twelve systems), F-31 row "Number bonds to 10 / part-whole" — conservative age 7, earliest 4 → 6-8 (US K.OA.A.4 / 1.OA.C.6; England Y1 "number bonds within 10"; Germany Klasse 1 "Zahlzerlegungen bis 10"; France CP "décompositions additives de 10"; Netherlands groep 3 "splitsen tot 10"; Spain 1º ciclo; Brazil EF01MA08; Sweden åk 1 "talkamrater"; Finland grade 1 "lukujen hajottaminen").
- Common misconceptions (F-104, F-105), each with this game's response:
  1. **Adding the two most available numbers whatever the target ("5 and 7 — that's 12, done").** Response: the bridge only closes at exactly 10. Two placed bags that total more than 10 push the bridge halves apart with an overhang (`ART.overhang` extends past the far bank; `ANIM.overhang`), and the total shows on the bridge; too little leaves a visible gap in the middle (`ART.gap`). The child sees the size of the error, not a verdict.
  2. **Knowing 3 + 7 but not 7 + 3 (not seeing the pair as one bond).** Response: the two bags can be placed on either side; both orders close the bridge. On Check the bridge shows the equation both ways in turn (`ART.eqText` "3 + 7 = 10", then "7 + 3 = 10"), 800 ms each.
  3. **Counting on from the wrong number (count-all).** Response: the placed bags show their numbers on ten-frame-style dot rows (`ART.bagDots`) so the child can see 7 dots + 3 dots filling ten cells; on a gap, the missing dots appear as hollow cells in the gap (`ART.gapDots`) — the count to 10 is visible.
  4. **Treating the whole as a part (placing the 10 bag if offered).** Response: L3 offers a 10 bag as a distractor; placing it alone leaves the other side empty (the bridge needs two halves) and the empty side pulses (`ART.needHalf`); placing it with anything overhangs.

## How it plays
1. **Start screen**: title "Bridge of Ten", the beaver (`ART.beaver`) at (360, 200), Start, picker.
2. **Item 1 (L1: target 10, tray 3, 7, 5)**: rail of 10 dots (§6; 6-8 band may show `t("question_x_of_y")` — this game does NOT, to keep the screen numeral-free except the content). Zone A: two river banks (`ART.bank` at x = 80 and x = 640, y = 180), water between (`ART.water` from x = 120 to 600 at y = 200), a big "10" on a signpost on the far bank (`ART.target` at (640, 100)), and the beaver on the near bank at (80, 120). Two bridge half-slots (`ART.slot`, 160 × 72) at (250, 180) and (470, 180), empty, dashed. Zone B: a tray of stone bags (`ART.bag` tiles, 96 × 96) at y = 380: for 3 bags x = 240 / 360 / 480; for 4 bags x = 180 / 300 / 420 / 540; for 5 bags x = 144 / 252 / 360 / 468 / 576. Each bag shows its numeral (44 px) and, beneath it inside the tile, a small row of dots for its value (`ART.bagDots`, r 4, 10 px apart). Zone C: Check tile (`makeButton ok`) at (360, 510), disabled until both slots are filled. Caption `S("makeTen")` ("Make 10") at (360, 300), 26 px `THEME.colour.inkSoft`.
3. **Placing**: tap a bag (it lifts: `api.setSelected(true)`, `ANIM.lift`), then tap a slot; the bag glides (`ANIM.glide`) into the slot and becomes a bridge half showing its numeral and dots. Tap a placed bag to send it back to the tray (`ANIM.glide` back). Tapping a second bag before a slot switches the selection. A slot that is already full refuses (the arriving bag springs back, `ANIM.nudge`, no message). Check enables when both slots are full.
4. **Check**:
   - **Correct (sum = 10)**: the two halves slide together (`ANIM.join`) and lock; `ART.eqText` shows "a + b = 10" then "b + a = 10"; `tone("correct")`; praise pop; the beaver walks across (`ANIM.walk`: x from 80 to 640 over 900 ms); rail dot fills; after 700 ms the bridge clears and the next tray appears.
   - **Too little (sum < 10)**: `tone("nudge")`; the halves stay apart with `ART.gap` between them and `ART.gapDots` (10 − sum hollow cells) drawn in the gap; the total (`ART.eqText` "a + b = s") shows in `THEME.colour.inkSoft`; the beaver stops at the gap and looks down (`ANIM.peer`). Check disables until the child changes a bag. Attempt 2.
   - **Too much (sum > 10)**: `tone("nudge")`; the far half overhangs the bank (`ART.overhang` drawn past x = 600 by (sum − 10) × 14 px, capped at 120), the total shows, the beaver `ANIM.peer`. Attempt 2.
   - **Attempt 3** (a second wrong Check): the show-me — the bags that make 10 gain the show-me ring (`ART.showRing`, `ANIM.showMe`) in the tray/slots; when the child has placed exactly those two and taps OK, the item completes as solved-with-help (no praise pop; beaver still crosses).
5. **Items 2-10**: per Content/Rules. From L2 the tray has 4 bags including one that pairs with NOTHING; at L3 five bags including a 10 and a 0 (0 pairs with 10 — a legitimate bond the spec includes on purpose).
6. **Finish**: `t("all_done")` (360, 110); the beaver at (360, 200) `ANIM.celebrate`; the summary is the row of ten little bridges (`ART.miniBridge`, 56 × 20) at y = 400 each labelled with its pair "3+7" in 16 px `THEME.colour.inkSoft` (x = 360 − 4.5 × 64 + i × 64); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (10 items).

## Art registry
```js
const ART = {
  beaver:    { kind: "emoji", value: "🦫", size: 80, fallback: "🐿️" },   // Unicode 13 → squirrel fallback
  bank:      { kind: "shape", shape: "roundRect", w: 80, h: 120, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 14 },
  water:     { kind: "shape", shape: "rect", w: 480, h: 60, fill: "surface2" },
  target:    { kind: "text",  value: "10", size: 56, font: "display", color: "structure" },
  signpost:  { kind: "shape", shape: "roundRect", w: 96, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },
  slot:      { kind: "shape", shape: "roundRect", w: 160, h: 72, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed look: strokeWidth 2 with a lineDash of [8,6] via graphics
  half:      { kind: "shape", shape: "roundRect", w: 160, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },
  bag:       { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  bagDots:   { kind: "shape", shape: "circle", r: 4, fill: "structure" },
  gap:       { kind: "shape", shape: "rect", w: 60, h: 72, fill: "accent" },        // drawn at 35% alpha between the halves
  gapDots:   { kind: "shape", shape: "circle", r: 6, stroke: "structure", strokeWidth: 2 },
  overhang:  { kind: "shape", shape: "rect", w: 120, h: 72, fill: "accent" },       // width set at runtime, 35% alpha
  needHalf:  { kind: "shape", shape: "roundRect", w: 168, h: 80, stroke: "accent", strokeWidth: 4, radius: 12 },
  eqText:    { kind: "text",  value: "", size: 32, font: "display", color: "structure" },
  showRing:  { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniBridge:{ kind: "shape", shape: "rect", w: 56, h: 20, fill: "structureSoft", stroke: "structure", strokeWidth: 1 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "bag selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "bag to slot / back to tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement" },
  join:      { x: "+=20", duration: 220, ease: "Back.Out", trigger: "left half moves right, right half moves left (−=20) when the sum is 10" },
  overhang:  { x: "+=24", duration: 220, ease: "Sine.Out", trigger: "right half pushed toward the far bank when sum > 10" },
  walk:      { x: 640, duration: 900, ease: "Sine.InOut", trigger: "beaver crosses on correct" },
  peer:      { angle: 12, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "beaver at the gap/overhang" },
  pulse:     { scale: 1.08, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needHalf outline" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the two bond bags (from alpha 0.2)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tray (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish beaver" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ beaver(80,120)                             signpost "10"(640,100)│
      │ ┌bank┐  [ slot L (250,180) ] [ slot R (470,180) ]   ┌bank┐  │  zone A
      │ │ 80 │ ~~~~~~~~~ water y=200 ~~~~~~~~~~~~~~~~~~~~~~ │640 │  │
260   ├──────────────────────────────────────────────────────────────┤
      │   "Make 10" (360,300)                                        │
      │      [ 3 ]     [ 7 ]     [ 5 ]     bags y=380 (96×96)        │  zone B
      │       •••    •••••••   •••••      dots under each numeral    │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. `ART.eqText` appears at (360, 236) under the bridge.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22), swapped for `ART.dotFull` as items are solved.
- `ART.beaver` at (80, 120) facing right; `ART.bank` at (80, 180) and (640, 180); `ART.water` centred (360, 200); `ART.signpost` at (640, 100) with `ART.target` centred on it.
- Slots: `ART.slot` at (250, 180) and (470, 180), drawn dashed (graphics lineDash [8, 6]); when filled, `ART.half` with the numeral (40 px `THEME.font.display` `THEME.colour.ink`) at its centre and `ART.bagDots` (value dots, 10 px apart) along its lower edge. Each slot is a `makeTile` (160 × 72) so it is keyboard-reachable.
- Bags: `makeTile` 96 × 96 with `ART.bag` tokens; numeral 44 px; `ART.bagDots` row centred at tile (0, +30).
- Feedback shapes: `ART.gap` between the halves at (360, 180); `ART.gapDots` in the gap, spaced 14 px; `ART.overhang` from x = 600 rightward at y = 180; `ART.needHalf` around an empty slot; `ART.eqText` at (360, 236).
- Check: `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Tap floors: bags 96, slots 160 × 72 (≥ 56), OK 220 × 72. Gaps ≥ 12.

## Content
Language-neutral (numerals only; the caption is the one string).

Each item = (tray bags; the bond pair(s) present). Exactly one pair sums to 10 in every tray.
- **L1** (3 bags): (3, 7, 5; 3+7) · (2, 8, 4; 2+8) · (6, 4, 1; 6+4) · (5, 5, 3; 5+5) · (9, 1, 6; 9+1)
- **L2** (4 bags, one dead-end bag that pairs with nothing): (3, 7, 5, 4; 3+7) · (2, 8, 6, 1; 2+8) · (6, 4, 9, 3; 6+4) · (5, 5, 7, 2; 5+5) · (1, 9, 4, 3; 1+9) · (8, 2, 5, 9; 8+2)
- **L3** (5 bags including 0 and/or 10 as distractors or as the bond): (7, 3, 10, 5, 8; 7+3) · (0, 10, 4, 5, 2; 0+10) · (6, 4, 10, 1, 9; 6+4 and 1+9 — two bonds; either completes) · (2, 8, 0, 3, 9; 2+8) · (5, 5, 10, 0, 6; 5+5 and 0+10)

Play list of 10 per Rules; bag order in the tray shuffled per item; no item repeats within a session.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct Checks → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.join`, both equations shown, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], beaver `ANIM.walk`, rail dot, next tray after 700 ms.
- What happens on a wrong answer:
  - Sum < 10 (stopped short / count-all error): gap with hollow dots for the missing amount, total shown, beaver peers; Check disabled until a bag changes.
  - Sum > 10 (added available numbers regardless): overhang proportional to the excess, total shown, beaver peers.
  - Only one slot filled and Check tapped: cannot happen (Check disabled); the empty slot pulses `ART.needHalf` after 5 s of inactivity (an inactivity cue, never a clock).
  - A placed bag tapped: returns to the tray (undo, no penalty).
- Retry behaviour: attempt 1 → attempt 2 after the enacted gap/overhang → attempt 3 with the show-me ring on the bond bags; completing with those two bags is solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Bridge of Ten"; `makeTen` = "Make 10".

## Sound
`tone("tap")` on selecting a bag; `tone("tap", 4)` on a placement; `tone("correct")` on a closed bridge; `tone("nudge")` on gap/overhang; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu, praise).
- [ ] Works at narrow width (400-px iframe: both banks, both slots, five bags and OK visible).
- [ ] Keyboard operable (Tab: bags left to right, then the two slots, then OK; Enter selects/places/checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the show-me ring always leads to completion).
- [ ] A bag tapped then a slot tapped moves the bag into the slot; tapping the placed bag returns it.
- [ ] OK is dimmed until both slots hold a bag.
- [ ] 3 + 5 leaves a visible gap with two hollow dots and shows "3 + 5 = 8"; 7 + 5 overhangs the far bank and shows "7 + 5 = 12".
- [ ] 3 + 7 and 7 + 3 both close the bridge, and both equations are displayed in turn.
- [ ] At the third level a tray can contain 0 and 10, and 0 + 10 closes the bridge.
- [ ] Two first-try corrects in a row bring a tray with more bags; a wrong Check brings fewer next time.
- [ ] The finish screen shows ten little bridges labelled with the pairs solved and no score.
- [ ] If the beaver emoji is missing on the device a squirrel appears instead.
- [ ] With `?sound=off` nothing is audible.
