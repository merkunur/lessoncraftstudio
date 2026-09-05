# 015 — Before and After

## Identity
- Slug: `before-and-after`
- Subject / topic: Mathematics / predecessor and successor of a number to 20 (one less, one more)
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap a numeral in the tray, then tap the empty slot on the strip)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (judged per placement). Everything below adds to those; nothing overrides them.

## Learning
- Objective: Places the numeral that comes just before and the numeral that comes just after a shown number (2-19) into the two empty slots of a three-cell strip, choosing from a tray of four.
- Prerequisites: Says the counting sequence to 20; reads numerals to 20 (games 002, 014). No reading.
- Curriculum links: F-1 (compare/order numbers in 9 of 15 sources), F-4 ("1 more / 1 less" and "missing number" on the UK reception map), F-21, F-31 row "Numerals to 20, number words" — conservative 6-7, earliest 5 → 5-6 (US K.CC.A.2 / K.CC.B.4c "each successive number name refers to a quantity that is one larger"; England Reception ELG / Y1 "one more and one less"; Germany Klasse 1 "Vorgänger und Nachfolger"; France GS/CP "nombre qui précède / qui suit"; Netherlands groep 3 "buurgetallen"; Sweden förskoleklass; Finland esiopetus "lukujono").
- Common misconceptions (F-101, F-102), each with this game's response:
  1. **Counting back is harder than counting on — the child fills "after" easily and puts N + 2 or N + 1 in the "before" slot.** Response: a wrong placement in the before-slot makes the number strip (`ART.stripCell` row) light N, then N − 1 leftward (`ANIM.stepLight`), with `tone("tap", k)` falling in pitch, and the ghost numeral (`ART.ghostNumeral`) of N − 1 appears faintly in the slot for 900 ms; the tile glides back to the tray. The direction of the count is enacted, not told.
  2. **Off-by-two (picks N + 2 for "after", N − 2 for "before") — losing place in the sequence.** Response: the strip lights N then the neighbour cell ONLY (one step), so the child sees exactly one hop; the placed N ± 2 tile lands two cells away on the strip (`ANIM.glide` to that cell) before returning, making the gap of one cell visible.
  3. **Swapping the two slots (before/after reversed: N + 1 in the before slot).** Response: the same one-step light in the slot's direction; on the second wrong placement in the same slot the correct tray tile gains the show-me ring. Position is the cue (left = before, right = after) and it is reinforced by `ART.arrowLeft` / `ART.arrowRight` glyphs drawn on the empty slots.
  4. **Two-digit order reversal (12 read as 21; 16 as 61 — F-102).** Response: at L3 the tray contains digit-swapped distractors (41 beside 14). Placing one makes the strip count to the true neighbour and the distractor tile's numeral is shown beside the strip's end with a hollow gap (`ART.stripGap`) — it is not on the strip at all — before gliding back. Never marked as a hard error; the item counts as retried.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Before and After"): the caterpillar (`ART.caterpillar`) at (360, 200) above the title, Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: N = 5; tray 4, 6, 3, 7).** The Play scene builds: the dot rail of 8 hollow dots at y = 28 (§6). Zone A: the caterpillar's head (`ART.caterpillar`) at (150, 160) and its body — three cells in a row at y = 160: the before-slot (`ART.slot`, 100 × 100, dashed) at (260, 160) with `ART.arrowLeft` faint inside, the shown number cell (`ART.cell`, 100 × 100) at (360, 160) with `ART.shownNumeral` "5" (48 px), and the after-slot at (460, 160) with `ART.arrowRight`. The slots are `makeTile`s. Below the strip, at y = 270, the number strip: at L1 ten `ART.stripCell`s (32 × 32, pitch 34) from x = 207 to x = 513 numbered 1-10 (18 px), the cell "5" lit (`ART.stripLit`); at L2/L3 the strip has 20 cells (x = 37 to x = 683) and is HIDDEN until a wrong placement (cue fading, F-46). Zone B: four numeral tiles (`ART.numeralTile`, 96 × 96) at y = 390, x = 180, 300, 420, 540, labelled 4, 6, 3, 7 in a shuffled order. No caption.
3. **Placing.** The child taps a tray tile: it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The child taps a slot: the tile glides (`ANIM.glide`) into the slot.
   - **Correct for that slot (4 in the before-slot, or 6 in the after-slot):** the tile locks in the slot (`ANIM.pop`, fill `structureSoft`, stroke `structure` 3 px), `tone("tap", 4)`; the arrow glyph disappears; the strip cell for that numeral lights (`ART.stripLit`).
   - **Wrong for that slot:** `tone("nudge")`; the enacted hint plays (Rules, per mistake), then the tile glides back to its tray place with `ANIM.nudge`; the slot stays empty and enabled. Attempt 2 for that slot.
   - **A slot that is already filled:** tapping the placed tile returns it to the tray (undo, no penalty); tapping the slot with another tile selected is refused (the tile springs back, no message).
   - **Tapping a second tray tile before a slot:** switches the selection.
4. **Item complete** (both slots correct): `tone("correct")`; the three cells `ANIM.wave` in turn (before, N, after — a small y-bob 120 ms apart); the caterpillar `ANIM.wiggle`; `GameCore.showPraise(scene, key)` with the next praise key; the rail dot fills; after 900 ms the slots and tray fade (`ANIM.fadeOut`) and the next item builds (`ANIM.appear`).
5. **Items 2-8.** Built from the level pools in Content by the Rules. Tray order shuffled per item.
6. **Finish** (after 8 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the caterpillar at (360, 220) with `ANIM.celebrate`. Zone B: the eight completed triples as small chips (`ART.tripleChip`, 84 × 36) reading "4 5 6" (16 px `THEME.colour.ink`) in two rows of four (y = 380 and y = 430, x = 360 − 1.5 × 96 + i × 96) — the visual summary; no score. Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 5 minutes: 8 items × (2 placements ≈ 30-40 s).

## Art registry
```js
const ART = {
  caterpillar:  { kind: "emoji", value: "🐛", size: 80 },
  cell:         { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 50 },   // the shown-number body segment
  shownNumeral: { kind: "text",  value: "", size: 48, font: "display", color: "structure" },                                                // N at runtime
  slot:         { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 50 },       // dashed (lineDash [8,6]) while empty
  arrowLeft:    { kind: "text",  value: "<", size: 36, font: "display", color: "inkSoft" },     // drawn at alpha 0.5 inside the empty before-slot
  arrowRight:   { kind: "text",  value: ">", size: 36, font: "display", color: "inkSoft" },     // inside the empty after-slot
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },          // numeral 44 px display ink
  ghostNumeral: { kind: "text",  value: "", size: 44, font: "display", color: "accent" },       // the correct neighbour, alpha 0.5, in the slot during a hint
  stripCell:    { kind: "shape", shape: "rect", w: 32, h: 32, fill: "surface", stroke: "line", strokeWidth: 1 },                            // numeral 18 px body ink
  stripLit:     { kind: "shape", shape: "rect", w: 32, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  stripGap:     { kind: "shape", shape: "rect", w: 32, h: 32, stroke: "accent", strokeWidth: 2 },   // dashed; drawn past the strip's end for an off-strip distractor
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  tripleChip:   { kind: "shape", shape: "roundRect", w: 84, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The art upgrade replaces `ART.caterpillar` (and may draw the cells as body segments) and nothing else changes.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to a slot / to a strip cell / back to the tray (x, y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "tile locks in a slot" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a returned tile; a refused placement" },
  stepLight: { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "strip cells light in turn, 300 ms apart, from N to the neighbour (the lit overlay from alpha 0)" },
  ghostIn:   { alpha: 0.5, duration: 200, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "ghost numeral in the slot (from alpha 0), then fades" },
  wave:      { y: "-=14", duration: 120, ease: "Sine.Out", yoyo: true, trigger: "the three cells in turn, 120 ms apart, on item complete" },
  wiggle:    { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "caterpillar on item complete" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "slots and tray before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item (from alpha 0, scale 0.6); the hidden strip on its first hint (from alpha 0)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the correct tray tile (from alpha 0.2)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "inactivity cue on an empty slot" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish caterpillar" }
};
```
No flashing: `showMe` cycles at 1 Hz; `stepLight` lights each cell once.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   ART.caterpillar   ( < )    (  5  )    ( > )    y=160        │
      │   (150,160)        (260)     (360)     (460)   100×100        │  zone A
      │   [1][2][3][4][5][6][7][8][9][10]  strip y=270 (L1 visible)   │
260   ├──────────────────────────────────────────────────────────────┤
      │      [ 4 ]     [ 6 ]     [ 3 ]     [ 7 ]   tray y=390         │
      │     x=180     x=300     x=420     x=540   (96×96)             │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Strip cells: L1 ten cells, pitch 34, cell i (1-10) at x = 207 + (i − 1) × 34; L2/L3 twenty cells at x = 37 + (i − 1) × 34, y = 270. The strip sits on the boundary of zones A/B by design (it belongs to the prompt).

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); filled dots use `ART.dotFull`.
- `ART.caterpillar` at (150, 160); finish screen (360, 220).
- Body: `ART.cell` at (360, 160) with `ART.shownNumeral` centred; slots = `makeTile` 100 × 100 at (260, 160) and (460, 160) with `ART.slot` tokens, dashed stroke while empty, `ART.arrowLeft` / `ART.arrowRight` centred at alpha 0.5; when filled the tile shows the placed numeral (44 px) with fill `THEME.colour.structureSoft` and stroke `THEME.colour.structure` 3 px.
- Strip: `ART.stripCell`s with numerals 18 px `THEME.font.body` `THEME.colour.ink`; the shown number and each correctly placed neighbour use `ART.stripLit`; `ART.stripGap` drawn one pitch past the last cell for off-strip distractors.
- Tray: `makeTile` 96 × 96 with `ART.numeralTile` tokens, numeral 44 px `THEME.font.display` `THEME.colour.ink`; selected = library selected look + `ANIM.lift`.
- `ART.ghostNumeral` centred in a slot during a hint; `ART.showRing` behind the correct tray tile.
- Tap floors: slots 100, tray tiles 96 (≥ 80, the 5-6 floor); strip cells are NOT tappable (display only); gaps ≥ 24.
- Tab order: tray tiles left to right, then the before-slot, then the after-slot.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: numerals only. `LOCALE_DATA` not needed.

Items as (N; tray of four = N − 1, N + 1 and two distractors), strip range in brackets:
- **L1** [strip 1-10 always visible] (N 3-8; distractors N − 2, N + 2): (5; 4, 6, 3, 7) · (3; 2, 4, 1, 5) · (7; 6, 8, 5, 9) · (4; 3, 5, 2, 6) · (8; 7, 9, 6, 10) · (6; 5, 7, 4, 8)
- **L2** [strip 1-20, shown only on a hint] (N 9-14): (10; 9, 11, 8, 12) · (12; 11, 13, 10, 14) · (9; 8, 10, 7, 11) · (13; 12, 14, 11, 15) · (11; 10, 12, 9, 13) · (14; 13, 15, 12, 16)
- **L3** [strip 1-20, shown only on a hint] (N 12-19; distractors = the digit-swapped forms of the neighbours where they differ): (15; 14, 16, 41, 61) · (17; 16, 18, 61, 81) · (18; 17, 19, 71, 91) · (16; 15, 17, 51, 71) · (12; 11, 13, 21, 31) · (19; 18, 20, 81, 91)

Play list: 8 items; start at L1; shuffle within the level without repeats; level changes per Rules; the same N never appears twice in a session; if a pool is exhausted it is reused reshuffled. Tray order shuffled per item; the correct tiles never sit in the same two tray slots twice running.

## Rules
- Item count: 8 (each item = two placements).
- Difficulty progression: after 2 consecutive first-try items, the next item comes from the next level up (cap L3). "First-try" = both placements were correct with no wrong placement on the item.
- Adaptation: any wrong placement on an item, or non-first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap, the leftmost empty slot `ANIM.pulse`s once; repeats every 6 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: per placement — `ANIM.pop`, `tone("tap", 4)`, strip cell lights. Per completed item — `tone("correct")`, `ANIM.wave`, `ANIM.wiggle`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **N + 1 or N + 2 placed in the before-slot** (counting back is hard / slots swapped): `tone("nudge")`; the strip appears if hidden (`ANIM.appear`), lights N then N − 1 (`ANIM.stepLight`, `tone("tap", k)` falling), `ART.ghostNumeral` N − 1 shows in the slot (`ANIM.ghostIn`); the tile returns with `ANIM.nudge`.
  - **N − 1 or N − 2 placed in the after-slot**: the mirror image — the strip lights N then N + 1 rightward with a rising tone; ghost N + 1.
  - **Off-by-two in the correct direction** (N ± 2): the tile glides onto its strip cell (two cells away) for 600 ms, the one-step light plays, the tile returns; the empty cell between is the gap the child sees.
  - **Digit-swapped distractor** (41 for 14, L3): the strip counts to the true neighbour; `ART.stripGap` appears past the strip's end with the distractor's numeral beside it for 900 ms; the tile returns. Never a hard error.
  - **Placing into a filled slot**: refused; the tile springs back, no hint, no attempt counted.
- Retry behaviour: per slot — attempt 1 unaided → attempt 2 after the enacted strip hint → attempt 3 with the show-me ring on the correct tray tile; placing it completes that slot as solved-with-help. No attempt 4. An item with any wrong placement does not count as first-try.
- Finish condition: 8 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Before and After"
  - No text appears on the play screen; the numerals and the two arrow glyphs are the whole prompt.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on selecting a tile; `tone("tap", 4)` on a correct placement; `tone("tap", k)` per strip cell during a hint (k = the cell's value, so counting back falls in pitch and counting on rises — the direction is audible as well as visible); `tone("correct")` on a completed item; `tone("nudge")` on a wrong placement (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu" and the praise pops; the play screen has no words.
- [ ] Works at narrow width: in a 400-px-wide iframe the three cells, the 20-cell strip and the four tray tiles are visible and separate.
- [ ] Keyboard operable: Tab walks the four tray tiles then the two slots; Enter selects / places / returns.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong placements never end the session; the show-me ring always leads to both slots being filled.
- [ ] Tapping 6 then the right slot locks it; tapping 6 then the left slot makes the strip light 5 then 4, shows a faint 4 in the left slot, and returns the 6.
- [ ] The left empty slot shows "<" and the right one ">" until filled.
- [ ] At the first level the strip 1-10 is always visible; at the second and third levels it appears only after a wrong placement.
- [ ] Placing 7 for "after 5" lands the 7 on its strip cell two steps away for a moment before it returns.
- [ ] At the third level the tray holds numbers like 41 and 61; placing one shows a dashed cell past the end of the strip.
- [ ] Two clean items in a row bring bigger numbers; a wrong placement brings smaller ones next.
- [ ] The finish screen shows eight chips like "4 5 6" and no score or stars.
- [ ] With `?sound=off` nothing is audible; with sound on, a before-hint plays a falling note and an after-hint a rising one.
