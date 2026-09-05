# 013 — More or Fewer Lines

## Identity
- Slug: `more-or-fewer-lines`
- Subject / topic: Mathematics / comparing two sets by one-to-one matching (more / fewer)
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap an object in the top row, then its partner in the bottom row, to draw a pairing line), then a P1 tap on the row that answers the prompt
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (the "destination" is the partner object; the "placement" is a line). Everything below adds to those; nothing overrides them.

## Learning
- Objective: Pairs the objects of two rows one-to-one with lines and then taps the row that has more (or, at the top level, fewer), judging by the leftover objects and not by how long the row looks.
- Prerequisites: Counts to 6 by tapping (game 001). No reading; the prompt is an icon.
- Curriculum links: F-4 ("more/less/fewer" is on the UK reception map), F-21 (comparing quantities is in all twelve systems), F-31 row "Compare more/fewer/same" — conservative age 6, earliest 4 → band 5-6 (US K.CC.C.6 "identify whether the number of objects in one group is greater than, less than … using matching strategies"; England Reception ELG "compare quantities"; Germany Klasse 1 "mehr / weniger"; France GS "comparer des collections"; Netherlands groep 2 "meer / minder"; Spain Infantil "más / menos"; Brazil EI03ET07; Sweden förskoleklass "fler / färre"; Finland esiopetus).
- Common misconceptions (F-103, F-101), each with this game's response:
  1. **Length bias — the spread-out row "has more" because it is longer (Piaget).** Response: from L2 the row with FEWER objects is the spread-out one (wider spacing), so the longer row is the wrong answer; the pairing lines make the leftovers visible on the shorter-looking row. A wrong row tap re-draws the pairing lines one by one and pulses the leftovers with count badges.
  2. **Bigger objects = more.** Response: at L3 the objects in the row with fewer are drawn LARGER (`ART.dogBig` 72 px vs `ART.dog` 52 px); the pairing lines still leave the leftovers on the row with the small objects. The size never changes the count.
  3. **"Fewer" acquired last — the child answers "more" whatever the prompt.** Response: "fewer" only appears at L3, always with `ART.fewerIcon` (a short stack) next to the word, while "more" carries `ART.moreIcon` (a tall stack); the enacted hint for a fewer-prompt error is: the leftovers on the bigger row are counted with badges and then greyed (`ANIM.greyOut`), showing that the OTHER row is the one with nothing left over, and `ART.fewerIcon` pulses beside the word.
  4. **One-to-one failure — pairing one object twice.** Response: a paired object is dimmed and locked (its tile `setEnabled(false)`); tapping it does nothing. Only unpaired objects can be tapped, so each line is one-to-one by construction.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "More or Fewer Lines"): the dog (`ART.dog`, 96 px) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 4 dogs on top, 2 bones below, tight spacing both rows).** The Play scene builds: the dot rail of 8 hollow dots at y = 28 (§6). Zones A and B are used together as the two rows. Top row: four `ART.dog` tiles (80 × 80, `ART.objTile`) at y = 150, x = 170, 254, 338, 422 (pitch 84). Bottom row: two `ART.bone` tiles at y = 350, x = 170, 254. At the left of each row a row-label tile (`ART.rowTile`, 80 × 80) at x = 80: the top one shows `ART.dog` (52 px), the bottom one `ART.bone` — these are the ANSWER tiles, disabled (alpha 0.5) until the pairing is complete. Zone C: the prompt, hidden until the pairing is complete. No caption.
3. **Pairing.** The child taps a dog: it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The child taps a bone: a line (`ART.pairLine`, 4 px `structure`) draws from the dog's centre to the bone's centre (`ANIM.lineDraw` — the line's end point tweens from the dog to the bone over 260 ms), both tiles dim to alpha 0.6 and lock, `tone("tap", k)` where k = number of pairs so far. Tapping another dog before a bone switches the selection. Tapping a second dog when a dog is selected (top-to-top) switches; a bone tapped with nothing selected selects the bone (either row may start a pair — the pair is always one top + one bottom). Tapping a locked object does nothing.
4. **Pairing complete** (when every object of the shorter row is paired): the leftover objects on the longer row `ANIM.pulse` once; the prompt appears in zone C with `ANIM.appear`: `ART.moreIcon` at (300, 512) and `S("more")` ("More?") at (400, 512), 32 px `THEME.font.display` `THEME.colour.structure`; the two row-label tiles enable (`ANIM.appear`).
5. **Answering.** The child taps a row-label tile.
   - **Correct (top row, dogs):** the tile `ANIM.pop`s, `tone("correct")`; the leftover dogs get `ART.countBadge`s in turn (1, 2 with `tone("tap", k)`) and the whole top row's background band (`ART.rowBand`) fills `structureSoft`; `GameCore.showPraise(scene, key)` with the next praise key; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`).
   - **Wrong (bottom row):** the tile `ANIM.nudge`s, `tone("nudge")`, de-selects and stays enabled; the enacted hint: every pairing line re-draws one by one from the left (`ANIM.lineDraw`, 300 ms apart), then the leftovers on the top row pulse with their `ART.countBadge`s (1, 2). Attempt 2.
   - **Wrong again (attempt 2):** nudge + tone + the hint again; the correct row-label tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`). Tapping it completes the item as solved-with-help (no praise pop).
6. **Items 2-8.** Built from the level pools in Content by the Rules. Row spacing: tight pitch 84; spread pitch 104 (the spread row is always the one with FEWER objects at L2/L3; at L1 both rows are tight). At L3 the objects of the row with fewer are drawn at 72 px (`ART.dogBig` / `ART.boneBig`) inside the same 80 × 80 tiles. The prompt word alternates at L3 between "More?" (`ART.moreIcon`) and "Fewer?" (`ART.fewerIcon`) as listed in Content.
7. **Finish** (after 8 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the dog at (360, 220) with `ANIM.celebrate`. Zone B: eight mini pair-pictures (`ART.miniPair`, 64 × 40: two tiny rows of dots with the leftovers filled `accent`) in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76) — the visual summary of each comparison; no score. Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 5 minutes.

## Art registry
```js
const ART = {
  dog:        { kind: "emoji", value: "🐶", size: 52 },
  dogBig:     { kind: "emoji", value: "🐶", size: 72 },      // L3: the row with fewer uses the big glyph
  bone:       { kind: "emoji", value: "🦴", size: 52 },
  boneBig:    { kind: "emoji", value: "🦴", size: 72 },
  objTile:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  rowTile:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 12 },   // the answer tile at the left of each row
  rowBand:    { kind: "shape", shape: "roundRect", w: 600, h: 100, fill: "structureSoft", radius: 16 },   // drawn behind the winning row on a correct answer, alpha 0.6
  pairLine:   { kind: "shape", shape: "line", w: 4, stroke: "structure", strokeWidth: 4 },
  countBadge: { kind: "shape", shape: "circle", r: 14, fill: "accent" },                                  // numeral 18 px display inkOnAccent, at a leftover's top-right
  moreIcon:   { kind: "shape", shape: "rect", w: 20, h: 40, fill: "structure" },                          // drawn as three bars of heights 16, 28, 40 side by side (a tall stack)
  fewerIcon:  { kind: "shape", shape: "rect", w: 20, h: 16, fill: "structure" },                          // three bars of heights 40, 28, 16 (a falling stack)
  showRing:   { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniPair:   { kind: "shape", shape: "roundRect", w: 64, h: 40, fill: "surface", stroke: "line", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The art upgrade replaces the dog and bone glyphs and nothing else changes.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "object selected" },
  lineDraw:  { duration: 260, ease: "Sine.Out", trigger: "a pairing line's end point tweens from the first object's centre to the partner's centre (a Graphics line redrawn each frame from a tweened {x,y})" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "leftover objects when pairing completes and on a wrong row tap" },
  greyOut:   { alpha: 0.35, duration: 300, ease: "Sine.In", trigger: "the counted leftovers after a wrong tap under the fewer prompt" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "prompt and row tiles enabling; new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct row tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong row tile" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring behind the correct row tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish dog" }
};
```
No flashing: `showMe` cycles at 1 Hz; `pulse` at ≤ 1.7 Hz.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ [D]   [d]  [d]  [d]  [d]              top row y=150           │
      │ x=80  x=170 254  338  422  (tight pitch 84; 80×80 tiles)     │  zone A
      │        │    │        pairing lines drawn between rows        │
260   ├──────────────────────────────────────────────────────────────┤
      │ [B]   [b]      [b]                    bottom row y=350        │
      │ x=80  x=170    274  (spread pitch 104 at L2/L3; tight at L1)  │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │        ART.moreIcon (300,512)  "More?" (400,512)              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: D / B = the row-label answer tiles (dog / bone); d / b = object tiles. Row positions: object i of a row at x = 170 + i × pitch; tight pitch 84 (max 6 objects: last x = 590), spread pitch 104 (max 5 objects: last x = 586). Rows are left-aligned on purpose so that row length is visible and misleading.

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); filled dots use `ART.dotFull`.
- Object tiles: `makeTile` 80 × 80 with `ART.objTile` tokens and the glyph (`ART.dog` / `ART.bone`, or `ART.dogBig` / `ART.boneBig` at L3 for the row with fewer) as label; selected = library selected look + `ANIM.lift`; paired = alpha 0.6 + `setEnabled(false)`.
- Row-label tiles: `makeTile` 80 × 80 with `ART.rowTile` tokens at (80, 150) and (80, 350), label = the row's glyph at 52 px; disabled (alpha 0.5) until pairing completes.
- Pairing lines: `ART.pairLine` drawn on one `Graphics` object beneath the tiles, from centre to centre.
- `ART.rowBand` centred on the winning row (x = 380, the row's y) beneath the tiles on a correct answer, alpha 0.6.
- `ART.countBadge` at a leftover's (+28, −28) with the numeral in `THEME.colour.inkOnAccent`, 18 px `THEME.font.display`.
- Prompt: `ART.moreIcon` (three bars 16 / 28 / 40 tall, 6 px apart, bottom-aligned) or `ART.fewerIcon` (bars 40 / 28 / 16) centred at (300, 512); the word `S("more")` / `S("fewer")` at (400, 512), 32 px `THEME.font.display` `THEME.colour.structure`, `wordWrap` width 280, left-aligned from x = 340.
- Show-me ring: `ART.showRing` behind the correct row-label tile.
- Tap floors: every tile 80 × 80 (5-6 floor); gaps ≥ 4 at tight pitch (84 − 80) — acceptable per §7.1 because adjacent tiles belong to the same row and a mis-tap on the neighbour is also a valid selection; row-label to first object gap = 10.
- Tab order: top row-label, top objects left to right, bottom row-label, bottom objects left to right (row-labels are skipped while disabled).
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral except the two prompt words ("More?", "Fewer?"), which are game-specific strings translated with the game; the icons carry the meaning for pre-readers. `LOCALE_DATA` not needed.

Items as (top count; bottom count; which row is spread; object sizes; prompt; correct row):
- **L1** (both rows tight; difference 2-3; prompt More): (4; 2; none; normal; more; top) · (2; 5; none; normal; more; bottom) · (5; 3; none; normal; more; top) · (3; 6; none; normal; more; bottom) · (6; 3; none; normal; more; top)
- **L2** (the row with fewer is spread; difference 1-2; prompt More): (5; 3 spread; bottom; normal; more; top) · (3 spread; 5; top; normal; more; bottom) · (6; 5 spread; bottom; normal; more; top) · (4 spread; 5; top; normal; more; bottom) · (6; 4 spread; bottom; normal; more; top)
- **L3** (the row with fewer is spread AND its objects are big; difference 1; prompt alternates): (5; 4 spread big; bottom; big-fewer; more; top) · (4 spread big; 5; top; big-fewer; fewer; top) · (6; 5 spread big; bottom; big-fewer; fewer; bottom) · (3 spread big; 4; top; big-fewer; more; bottom) · (5 spread big; 6; top; big-fewer; fewer; top) · (6; 5 spread big; bottom; big-fewer; more; top)

Which object goes on which row: top row = dogs, bottom row = bones on odd-numbered items; swapped on even-numbered items (so the answer is not always "dogs"). Play list: 8 items; start at L1; shuffled within the level without repeats; level changes per Rules; the correct row never repeats more than twice running (§13 adapted to two "slots").

## Rules
- Item count: 8.
- Difficulty progression: after 2 consecutive first-try correct items, the next item comes from the next level up (cap L3). "First-try correct" = the correct row-label was the first row-label tapped.
- Adaptation: a wrong row tap on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap and pairing is incomplete, the leftmost unpaired object in each row `ANIM.pulse`s in turn (top first, then bottom 400 ms later) — this also demonstrates the mechanic on item 1. Repeats every 6 s of inactivity.
- What happens on a correct answer: `ANIM.pop` on the row tile, `tone("correct")`, leftovers badged in turn, `ART.rowBand` behind the winning row, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Longer row tapped under "More?"** (length bias): `ANIM.nudge`, `tone("nudge")`; all pairing lines re-draw one by one from the left, then the leftovers on the row with more pulse with their badges.
  - **Row with big objects tapped under "More?"** (size bias, L3): the same re-draw; the badges show the leftovers are on the row with the small objects.
  - **Row with more tapped under "Fewer?"** (answers "more" regardless): the leftovers on that row are counted with badges and then `ANIM.greyOut`, so the other row — with nothing left over — is the one with fewer; `ART.fewerIcon` `ANIM.pulse`s.
  - **Tapping a paired object** (double pairing): nothing happens.
  - **Tapping a row-label before pairing is complete**: impossible (disabled).
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted re-draw → attempt 3 with the show-me ring on the correct row tile; tapping it completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 8 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`; each ≤ 3 words and always paired with its icon):
  - `title` = "More or Fewer Lines"
  - `more` = "More?"
  - `fewer` = "Fewer?"

## Sound
`GameCore.tone` only (§11): `tone("tap")` on selecting an object; `tone("tap", k)` when the k-th pairing line completes (pitch rising with the number of pairs); `tone("tap", k)` per leftover badge during the enacted count; `tone("correct")` on a correct row; `tone("nudge")` on a wrong row (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu", the praise pops, and "More?" / "Fewer?" once translations are loaded (the icons stay).
- [ ] Works at narrow width: in a 400-px-wide iframe both rows, both row-label tiles and the prompt are visible; a spread row of 5 is not cut off.
- [ ] Keyboard operable: Tab walks the top row then the bottom row; Enter selects / pairs; the row-label tiles join the Tab order once pairing is complete.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: tapping the wrong row repeatedly still ends with the item completing via the show-me ring and the session reaching "All done!".
- [ ] Tapping a dog then a bone draws a line between them and dims both; tapping either again does nothing.
- [ ] The answer tiles at the left are dimmed until every object of the shorter row has a line.
- [ ] Under "More?", tapping the longer-looking row with fewer objects re-draws the lines one by one and shows numbered badges on the leftovers of the other row.
- [ ] At the third level the row with fewer objects has bigger pictures and wider spacing, and the prompt sometimes reads "Fewer?" with a falling-stack icon.
- [ ] Under "Fewer?", tapping the row with leftovers counts the leftovers and greys them, then the other row is accepted.
- [ ] Two first-try corrects in a row bring the spread-row items; a wrong tap brings tight-row items next.
- [ ] The finish screen shows eight mini pair-pictures and no score or stars.
- [ ] With `?sound=off` nothing is audible; with sound on, each new line plays a higher note.
- [ ] No text appears on the play screen other than "More?" / "Fewer?" and the badge numerals.
