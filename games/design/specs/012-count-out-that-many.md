# 012 — Count Out That Many

## Identity
- Slug: `count-out-that-many`
- Subject / topic: Mathematics / counting out N objects from a larger set and stopping at N
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap an acorn, then tap the basket)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2. Everything below adds to those; nothing overrides them.

## Learning
- Objective: Moves exactly N acorns (N = 2-10) from a pile of more than N into a basket and closes the lid when the basket holds N.
- Prerequisites: Counts a set to 10 by tapping (game 001); reads the numerals 1-10 (game 002). No reading.
- Curriculum links: F-1 (counting to 10/20 in 13 of 15 sources), F-4 (UK reception core), F-21, F-31 row "Count to 10-20, one-to-one, subitise to 5" — conservative age 6, earliest 4 → band 5-6 (US K.CC.B.5 "given a number from 1-20, count out that many objects"; England Reception ELG; Germany Klasse 1 "Anzahlen bestimmen und herstellen"; France GS "réaliser une collection dont le cardinal est donné"; Spain Infantil 5 años; Brazil EI03ET07; Sweden förskoleklass; Finland esiopetus).
- Common misconceptions (F-101), each with this game's response:
  1. **Counting the whole pile instead of stopping at N ("count-all": the child keeps moving acorns until the pile is empty).** Response: the basket holds exactly N. The (N + 1)th acorn is refused — it glides back to the pile with `ANIM.nudge`, the numeral on the basket tag pulses, and the acorns already inside count themselves (badges 1..N with rising tones) so the child sees the basket is already full.
  2. **Stopping too early (closes the lid at N − 1 or N − 2).** Response: the lid will not close: it lifts and drops back (`ANIM.lidBounce`), the acorns inside count themselves, and the missing places appear as hollow outlines (`ART.needSlot`) at the end of the row inside the basket, one per missing acorn.
  3. **One-to-one failure while moving (losing count of what is already in).** Response: every acorn that lands in the basket shows its running numeral (`ART.countBadge`: 1, 2, 3 …) and plays `tone("tap", k)`, so the count is always readable on the basket; the last placed acorn's badge is the count so far.
  4. **Cardinality — not linking the numeral on the tag to "that many".** Response: on a correct close the lid shuts, the tag numeral and the last badge grow together (`ANIM.lastBadge` on both), and the squirrel carries the basket off; the numeral and the quantity are shown as one thing.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Count Out That Many"): the squirrel (`ART.squirrel`) at (360, 200) above the title, Start button below, language picker top-left (hidden under `?embed=1`). Nothing moves until Start.
2. **Item 1 (L1, N = 3, pile of 6).** The Play scene builds: the dot rail of 8 hollow dots at y = 28 (§6). Zone A: the squirrel at (90, 190); the basket (`ART.basket`, 360 × 110) centred at (420, 190) with an open lid (`ART.lid`, 360 × 28) hinged above it at (420, 124), tilted open (`angle −25`); a tag (`ART.tag`, 72 × 72) hanging at the basket's left end (250, 140) showing `ART.targetNumeral` "3". The basket is a `makeTile` (360 × 110) — it is the destination. The lid is a separate `makeTile` (360 × 40 hit area) — tapping the lid is the "I am done" action. Zone B: the pile — six acorn tiles (`ART.acorn` as the label of 80 × 80 `ART.acornTile`s) in one row at y = 370: x = 130, 222, 314, 406, 498, 590 (pitch 92). Caption: none (the numeral on the tag is the prompt; a pre-reader sees 3, a basket, and acorns).
3. **Placing.** The child taps an acorn: it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The child taps the basket: the acorn glides (`ANIM.glide`) into the basket, shrinks to 44 px and lands in the next free place inside (places from left: x = 262 + i × 34, y = 200), a `ART.countBadge` with the running numeral appears on it, `tone("tap", k)` where k = acorns in the basket. Tapping a second acorn before the basket switches the selection. Tapping an acorn that is already in the basket returns it to its original pile position (`ANIM.glide` back; the badges after it renumber; `tone("tap", k)` at the new count) — undo, no penalty.
4. **Closing the lid.** When the child thinks the basket holds 3 they tap the lid.
   - **Correct (3 in the basket):** the lid swings shut (`ANIM.lidClose`), `tone("correct")`, the tag numeral and the last badge play `ANIM.lastBadge` together, `GameCore.showPraise(scene, key)` with the next praise key, the squirrel `ANIM.carry` (the basket and squirrel glide right off the stage together, 700 ms), the first rail dot fills; after 900 ms the next item builds (`ANIM.appear` on the new basket and pile).
   - **Too few (2 in the basket):** the lid lifts and drops back open (`ANIM.lidBounce`), `tone("nudge")`; the two acorns inside count themselves (badges re-appear in turn, 300 ms apart, `tone("tap", k)`); then one `ART.needSlot` (a dashed hollow acorn-sized outline) appears in the next free place inside the basket and pulses (`ANIM.pulse`). Attempt 2. The child places another acorn (the outline fills) and taps the lid again.
   - **Too many (a 4th acorn tapped onto the basket):** the acorn glides to the basket, is refused — it glides straight back to its pile place with `ANIM.nudge`, `tone("nudge")`; the tag numeral `ANIM.pulse`s and the three acorns inside count themselves. The lid is still open; the child taps the lid (correct). This refusal counts as one wrong attempt on the item.
   - **Attempt 3** (a second wrong lid tap or refusal): the show-me — the missing places show as `ART.needSlot`s, the lid gains the show-me ring (`ART.showRing`, `ANIM.showMe`) once the basket holds N, and the next acorn in the pile also carries `ART.showRing` while the basket is short; placing to N and tapping the ringed lid completes the item as solved-with-help (no praise pop; the squirrel still carries the basket off).
5. **Items 2-8.** Built from the level pools in Content by the Rules. Pile sizes: L1 6 acorns (one row), L2 10 acorns (two rows of 5 at y = 330 and y = 422, x = 176 + i × 92), L3 12 acorns (two rows of 6 at y = 330 and y = 422, x = 130 + i × 92). The basket's inside row holds up to 10 places (x = 262 + i × 34, 44-px acorns, the row ends at x = 568 inside the 360-wide basket).
6. **Finish** (after 8 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the squirrel at (360, 220) with `ANIM.celebrate`. Zone B: the eight closed baskets (`ART.miniBasket`, 64 × 32) in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76), each with its numeral on a tiny tag (18 px `THEME.colour.inkSoft`) — the visual summary; no score. Zone C: `makeButton play_again` at (250, 510) and `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 5-6 minutes: 8 items × (2 taps per acorn × N + lid ≈ 30-45 s).

## Art registry
```js
const ART = {
  squirrel:      { kind: "emoji", value: "🐿️", size: 96 },
  acorn:         { kind: "emoji", value: "🌰", size: 56 },        // label of an 80×80 acornTile in the pile; 44 px when inside the basket
  acornTile:     { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  basket:        { kind: "shape", shape: "roundRect", w: 360, h: 110, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 16 },
  lid:           { kind: "shape", shape: "roundRect", w: 360, h: 28, fill: "structure", radius: 8 },           // hinged at its left end; angle −25 open, 0 closed
  tag:           { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "surface", stroke: "accent", strokeWidth: 3, radius: 12 },
  targetNumeral: { kind: "text",  value: "", size: 44, font: "display", color: "structure" },                  // value = N at runtime, centred on the tag
  countBadge:    { kind: "shape", shape: "circle", r: 13, fill: "structure" },                                 // numeral 16 px display bg, at each basket acorn's top-right
  needSlot:      { kind: "shape", shape: "circle", r: 20, stroke: "accent", strokeWidth: 3 },                  // dashed (lineDash [6,5]); a missing place inside the basket
  showRing:      { kind: "shape", shape: "roundRect", w: 372, h: 52, stroke: "structure", strokeWidth: 4, radius: 12 },   // around the lid (also 92×92 variant around a pile acorn, drawn with w:92,h:92)
  miniBasket:    { kind: "shape", shape: "roundRect", w: 64, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. `ART.acorn` is the only picture the child moves; the art upgrade replaces it and `ART.squirrel` and nothing else changes.

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "acorn selected in the pile" },
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "acorn to its basket place / back to its pile place (x, y, scale set at call: scale 0.55 inside the basket)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a refused (N+1)th acorn after it returns; the lid on a too-early close" },
  lidClose:   { angle: 0, duration: 260, ease: "Back.Out", trigger: "lid tapped with exactly N inside (from angle −25)" },
  lidBounce:  { angle: -40, duration: 140, ease: "Sine.InOut", yoyo: true, trigger: "lid tapped with fewer than N inside (from −25, back to −25)" },
  lastBadge:  { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "tag numeral and the last badge on a correct close" },
  pulse:      { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "tag numeral on a refusal; needSlot outlines" },
  carry:      { x: "+=420", duration: 700, ease: "Sine.In", trigger: "squirrel + closed basket container leave to the right" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new basket and pile (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the lid / next pile acorn (from alpha 0.2); stopped when the item completes" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```
No flashing: `showMe` and `pulse` cycle at ≤ 1.7 Hz; nothing else repeats.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed (no reflow).

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ╱ ART.lid (hinge 240,124; open −25°)        │
      │  ART.squirrel   ┌tag┐┌──────────────────────────────────┐    │
      │  (90,190)       │ 3 ││  ART.basket (420,190) 360×110    │    │  zone A
      │                 └───┘│  places x=262+i×34, y=200        │    │
      │                      └──────────────────────────────────┘    │
260   ├──────────────────────────────────────────────────────────────┤
      │   [A] [A] [A] [A] [A] [A]   pile row y=370 (L1)              │
      │   x=130 … 590, pitch 92, 80×80                                │  zone B
      │   (L2/L3: two rows y=330 and y=422)                           │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: A = an acorn tile (ART.acorn on ART.acornTile). The tag hangs at (250, 140), overlapping the basket's top-left corner.

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); filled dots use `ART.dotFull`.
- Squirrel: `ART.squirrel` centred (90, 190); finish screen (360, 220).
- Basket: `makeTile(scene, 420, 190, 360, 110, { fill: THEME.colour.surface2, stroke: THEME.colour.structure, onTap: placeSelected })` — tokens exactly `ART.basket`; acorns inside are `ART.acorn` drawn at 44 px at (262 + i × 34, 200), each with `ART.countBadge` at (+16, −16) carrying its numeral in `THEME.colour.bg` 16 px `THEME.font.display`; acorns inside are also tappable (their own 44 × 44 hit area enlarged to 56 × 56) to return them.
- Lid: `ART.lid` drawn in a container whose origin is the hinge (240, 124); the container is a `makeTile` hit area 360 × 40 at (420, 124) with a transparent fill so the lid is keyboard-reachable; open = angle −25, closed = 0.
- Tag: `ART.tag` centred (250, 140) with `ART.targetNumeral` centred on it.
- Pile: `makeTile` 80 × 80 with `ART.acornTile` tokens and `ART.acorn` as label (56 px), positions per Screen layout. Selected look = library selected look + `ANIM.lift`.
- Feedback shapes: `ART.needSlot` at the next free basket places; `ART.showRing` around the lid (372 × 52 at (420, 124)) or around a pile acorn (92 × 92).
- Tap floors: pile acorns 80 × 80 (5-6 floor), basket 360 × 110, lid hit area 360 × 40 wide but its height is below the floor — therefore the lid's hit area is extended to 360 × 80 (y from 84 to 164), which does not overlap the basket (top edge y = 135) by more than 29 px; taps in the overlap go to the LID (created later, higher depth). Gaps between pile tiles 12.
- Tab order: pile acorns left to right, top row then bottom row; then the basket; then the lid. Acorns inside the basket join the Tab list after the basket in placement order.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: numerals and acorns only. `LOCALE_DATA` not needed.

Items as (N; pile size):
- **L1** (N 2-4, pile 6, one row): (3; 6) · (2; 6) · (4; 6) · (3; 6) · (4; 6)
- **L2** (N 5-7, pile 10, two rows): (5; 10) · (6; 10) · (7; 10) · (5; 10) · (7; 10)
- **L3** (N 8-10, pile 12, two rows — the pile is never much bigger than N, so "empty the pile" is a tempting error the basket refuses): (8; 12) · (9; 12) · (10; 12) · (8; 12) · (10; 12)

Play list: 8 items. Start at L1; take items from the current level's pool in a shuffled order; the same N is never used on two consecutive items; level changes per Rules. If a pool is exhausted it is reused reshuffled. Pile positions are fixed per pile size (no shuffling needed — the acorns are identical).

## Rules
- Item count: 8.
- Difficulty progression: after 2 consecutive first-try correct items, the next item comes from the next level up (cap L3). "First-try correct" = the lid closed on the first lid tap and no acorn was refused on that item (undo taps do not count against first-try).
- Adaptation: a refused acorn or a too-early lid tap on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap while the basket holds fewer than N, the next pile acorn `ANIM.pulse`s once; if the basket holds exactly N and 6 s pass, the lid `ANIM.lidBounce`s once. Repeats every 6 s of inactivity. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `ANIM.lidClose`, `tone("correct")`, `ANIM.lastBadge` on the tag numeral and last badge, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, `ANIM.carry`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Too many — an (N + 1)th acorn placed** (count-all / not stopping): the acorn is refused and returns with `ANIM.nudge`, `tone("nudge")`, the tag numeral `ANIM.pulse`s, the N acorns inside count themselves (badges in turn with `tone("tap", k)`). Counts as one wrong attempt.
  - **Too few — lid tapped early** (stopping early / losing count): `ANIM.lidBounce`, `tone("nudge")`, self-count of the acorns inside, then one `ART.needSlot` per missing acorn pulses in the basket. Counts as one wrong attempt.
  - **Returning an acorn to the pile** (undo): no penalty, no sound beyond `tone("tap", k)`.
  - **Tapping the basket with nothing selected**: nothing happens.
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted hint → attempt 3 with the show-me rings (next acorn while short; the lid once N is inside); completing the item this way is solved-with-help. No attempt 4. An item completed after any wrong attempt does not count as first-try.
- Finish condition: 8 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")` (via makeStartScreen), `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Count Out That Many"
  - No text appears on the play screen; the tag numeral is the whole prompt.

## Sound
`GameCore.tone` only (§11): `tone("tap")` when an acorn is selected; `tone("tap", k)` when the k-th acorn lands in the basket (pitch rising with the count, one note per object, F-213) and at the new count after an undo; `tone("correct")` when the lid closes on N; `tone("nudge")` on a refusal or an early lid tap (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show (the badges carry the count).

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu" and the praise pops; the play screen has no words to translate.
- [ ] Works at narrow width: in a 400-px-wide iframe the basket, lid, tag and a two-row pile of 12 are all visible and separately tappable.
- [ ] Keyboard operable: Tab walks the pile acorns, then the basket, then the lid; Enter selects an acorn / places it in the basket / taps the lid.
- [ ] Never auto-starts: the start screen shows until Start is tapped; no basket appears before that.
- [ ] No losing state: closing the lid early or over-filling repeatedly still ends with the item completing (rings on the next acorn and the lid) and the session reaching "All done!".
- [ ] Tapping an acorn then the basket moves it in with a numbered badge (1, 2, 3 …); tapping an acorn in the basket sends it back and the badges renumber.
- [ ] With N = 3 and three acorns inside, a fourth acorn springs back to the pile and the tag "3" pulses while the three inside count themselves.
- [ ] Tapping the lid with two acorns inside makes the lid bounce and shows one dashed outline in the basket.
- [ ] Tapping the lid with exactly N inside closes the lid and the squirrel carries the basket off to the right.
- [ ] Two first-try corrects in a row bring bigger numbers and a bigger pile; a refusal or an early lid tap brings a smaller number next.
- [ ] At the third level the pile has 12 acorns and N is 8, 9 or 10; the basket row never overflows its outline.
- [ ] The finish screen shows eight closed mini baskets with their numerals and no score or stars.
- [ ] With `?sound=off` nothing is audible; with sound on, each acorn landing plays a higher note than the previous.
- [ ] No text appears on the play screen other than numerals.
