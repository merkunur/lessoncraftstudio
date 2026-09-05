# 043 — Pattern Train

## Identity
- Slug: `pattern-train`
- Subject / topic: Mathematics / repeating patterns — AB, ABB, AAB, ABC — extended by the next two items
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (select a tray item, then tap an empty wagon)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (per-placement judgement: a wrong wagon is caught at once — the 5-6 default).

## Learning
- Objective: Extends a repeating pattern of shapes, animals or fruits by placing the next two items into the two empty wagons of a train.
- Prerequisites: Distinguishes the items by shape (circle / square / triangle) or picture; taps. No reading; nothing is spoken.
- Curriculum links: F-1 (patterns in 7 of 15 demand sources), F-4 (repeating patterns, 2- and 4-part, on the UK reception map), F-21 ("repeating (and growing) patterns" in all twelve systems), F-31 row "Sort by attribute; repeating patterns" — conservative 6-7, earliest 4 → 5-6 (US K "patterns" via K.OA / state pre-K standards; England Reception ELG "continue, copy and create repeating patterns"; Germany Klasse 1 "Muster fortsetzen"; France GS "algorithmes" (suites organisées); Netherlands groep 2 "patronen voortzetten"; Spain Infantil "series"; Brazil EI03ET02 / EF01MA09 "sequências repetitivas"; Sweden förskoleklass "mönster"; Finland esiopetus).
- Common misconceptions (F-116), each with this game's response:
  1. **Extending by copying the last element (after A B B, placing B B B).** Response: the wrong tile glides back to the tray and the unit is BRACKETED: `ART.bracket` draws under each complete unit of the shown train (`ANIM.appear`, 200 ms apart, left to right) and `ART.unitCard` appears above the empty wagons showing the unit's items small (A B B). The child sees that the train is made of chunks, and what the chunk is.
  2. **Cannot identify the unit of repeat (the hardest task — the child treats the train as a list).** Response: the same brackets; at L1 the unit is two items and the shown train ends on a complete unit, so the next two items are exactly one unit; the bracket shape is the unit's length. On the second wrong placement the correct tray tile gains the show-me ring.
  3. **Mid-unit endings (the shown train stops inside a unit, L3).** Response: the last, incomplete unit gets `ART.bracketOpen` — a dashed bracket that starts under the partial unit and extends across the empty wagons to where the unit ends — so the child sees the unit "still open".
  4. **Choosing by an unrelated attribute (size, colour).** Response: within one item every element is drawn at the same size and with the same fill token; only shape or picture differs, so no other attribute can be the rule.

## How it plays
1. **Start screen**: title "Pattern Train", the engine (`ART.engine`, 96 px) at (360, 200), Start, picker.
2. **Item 1 (L1: circle square circle square circle square | _ _ )**: rail of 8 dots (§6). Zone A: the track (`ART.track`, a bar across the stage at y = 236); the engine (`ART.engine`, 56 px) at (44, 200); six shown wagons (`ART.wagon`, 64 × 64) at y = 200, x = 110 + i × 70 (i = 0 … 5: 110, 180, 250, 320, 390, 460), each holding its pattern item drawn at 40 px (`ART.shapeCircle` / `ART.shapeSquare` alternately); then the two empty wagons (`ART.wagonEmpty`, 80 × 80, dashed, `makeTile`) at x = 544 and x = 636 (gap 12 between them; 12 from the last shown wagon). No numerals, no words. Zone B: the tray — three tiles (`ART.trayTile`, 80 × 80, `makeTile`) at y = 390, x = 240 / 360 / 480, holding circle, square and triangle in a shuffled order. Zone C: empty.
3. **Placing**: tap a tray tile (it lifts and outlines, `tone("tap")`), then tap an empty wagon; the tile glides into the wagon (`ANIM.glide`) and is judged at once:
   - **Correct for that wagon**: it stays (`ANIM.pop`, `tone("tap", 1)` for the first wagon, `tone("tap", 2)` for the second — the pitch climbs), the wagon's dashed outline becomes solid (`ART.wagon`) and the tray tile is consumed. When both wagons are filled correctly: `tone("correct")`, praise pop (rotation), the whole train `ANIM.roll`s 40 px to the right and back (the train "goes"), the engine `ANIM.puff` (a small scale bounce), the rail dot fills; after 800 ms the train clears (`ANIM.rise` on all wagons' items) and the next pattern `ANIM.appear`s.
   - **Wrong for that wagon**: `tone("nudge")`; the tile glides back to its tray slot with `ANIM.nudge` on arrival; then the enacted cue: `ART.bracket` under each complete unit of the shown train, `ART.unitCard` above the empties (and `ART.bracketOpen` for a mid-unit ending); the brackets stay for the rest of the item. Attempt 2.
   - **Second wrong placement (either wagon)**: the cue again, and the tray tile that belongs in the wagon the child last tried gains `ART.showRing` (`ANIM.showMe`); placing it completes that wagon as solved-with-help. If the other wagon is still empty its correct tile is ringed as soon as the first is placed.
   - Tapping a filled wagon: the item returns to the tray (undo, `ANIM.glide`, no sound beyond `tone("tap")`) — only wagons filled in this item can be undone; correct-and-locked wagons cannot (once both are correct the item ends).
   - Tapping a second tray tile before a wagon switches the selection; tapping a wagon with nothing selected does `ANIM.pop` on the wagon (a harmless preview).
   - The two empty wagons may be filled in either order; each is judged against its own expected item.
4. **Items 2-8**: per Content/Rules. L1 = AB units, six shown (three complete units); L2 = ABB / AAB units, six shown (two complete units); L3 = ABC units with six shown, and mid-unit endings with five shown (the sixth wagon position is simply absent; the empties follow the fifth shown wagon at x = 474 and x = 566).
5. **Finish**: `t("all_done")` (360, 110); the engine at (360, 200), 96 px, `ANIM.celebrate`; the summary = the eight solved units as `ART.unitCard`s in two rows of four (y = 340 and y = 410; x = 150 / 290 / 430 / 570), each showing its unit's items small — the record of the chunks the child found; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  engine:        { kind: "emoji", value: "🚂", size: 56 },
  cat:           { kind: "emoji", value: "🐱", size: 40 },
  dog:           { kind: "emoji", value: "🐶", size: 40 },
  mouse:         { kind: "emoji", value: "🐭", size: 40 },
  apple:         { kind: "emoji", value: "🍎", size: 40 },
  banana:        { kind: "emoji", value: "🍌", size: 40 },
  grapes:        { kind: "emoji", value: "🍇", size: 40 },
  shapeCircle:   { kind: "shape", shape: "circle", r: 20, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeSquare:   { kind: "shape", shape: "rect", w: 38, h: 38, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeTriangle: { kind: "shape", shape: "polygon", points: [[0,-22],[22,16],[-22,16]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  track:         { kind: "shape", shape: "rect", w: 720, h: 6, fill: "line" },
  wagon:         { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  wagonEmpty:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 12 },   // dashed: lineDash [8,6]
  trayTile:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  bracket:       { kind: "shape", shape: "roundRect", w: 134, h: 6, fill: "accent", radius: 3 },        // w = unit length × 70 − 6, set at runtime; under a complete unit
  bracketOpen:   { kind: "shape", shape: "roundRect", w: 134, h: 6, stroke: "accent", strokeWidth: 3, radius: 3 },   // dashed (lineDash [6,6]); under the open unit + the empties
  unitCard:      { kind: "shape", shape: "roundRect", w: 140, h: 56, fill: "surface", stroke: "accent", strokeWidth: 2, radius: 12 },   // the unit's items at 28 px inside, 36 px apart
  showRing:      { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Items are drawn INSIDE wagons and tray tiles by `draw(scene, key, x, y, { size })` — emoji at 40 px in shown wagons and 44 px in tray tiles and empties; ART shapes at scale 1.0 in wagons and 1.1 in tiles; 28 px / scale 0.7 on the unit card.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to a wagon / back to the tray (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct placement; wagon preview tap" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tile arriving back in the tray after a wrong wagon" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "brackets (200 ms apart), unit card, new train (from alpha 0, scale 0.6)" },
  roll:      { x: "+=40", duration: 350, ease: "Sine.InOut", yoyo: true, trigger: "whole train container when both wagons are correct" },
  puff:      { scale: 1.15, duration: 160, ease: "Back.Out", yoyo: true, repeat: 1, trigger: "engine on a completed item" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "wagon items and brackets clearing before the next item" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tray tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish engine" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                        [ unit card ] (590,130) │
      │ (eng) [o] [□] [o] [□] [o] [□]  ┊ ? ┊  ┊ ? ┊      wagons y=200  │  zone A
      │  44   110 180 250 320 390 460   544    636     (64 / 80×80)   │
      │ ═══════════════ track y=236 ══════════════════════════════   │
      │        ▔▔▔▔▔▔  ▔▔▔▔▔▔  ▔▔▔▔▔▔   brackets y=246 (on error)      │
260   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │          [ o ]        [ □ ]        [ △ ]    tray y=390        │  zone B
      │          x=240        x=360        x=480    (80×80)           │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. With five shown wagons (L3 mid-unit items) the empties sit at x = 474 and x = 566, always 84 px and 176 px right of the last shown wagon's centre. `ART.unitCard` is centred above the two empties (x = the empties' midpoint, y = 130).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.track` centred (360, 236); `ART.engine` at (44, 200); shown wagons `ART.wagon` at y = 200 (positions above), items centred in them.
- Empty wagons: `makeTile` 80 × 80 with `ART.wagonEmpty` tokens (`fill: THEME.colour.surface2`, `stroke: THEME.colour.structure`, dashed); when correctly filled they redraw as a solid `ART.wagon` outline at 80 × 80 with the item at 44 px.
- Tray: `makeTile` 80 × 80 with `ART.trayTile` tokens; item at 44 px / scale 1.1; selected = library selected look + `ANIM.lift`.
- `ART.bracket` centred under each complete unit at y = 246 (x = the unit's middle wagon centre, or the midpoint of two wagons); `ART.bracketOpen` from the open unit's first wagon to the last empty wagon; `ART.unitCard` at (empties' midpoint, 130).
- `ART.showRing` behind the correct tray tile. Tap floors: empties 80, tray 80 (≥ 80); gaps ≥ 12 (empties 12 apart; tray 40 apart).
- Keyboard: Tab order = tray tiles left to right, then the two empty wagons; Enter selects / places / undoes.

## Content
Language-neutral (pictures and shapes; no words at all on the play screen).

Item notation: material set → letters; `shown` = the wagons in order; `next` = the two expected items (wagon 1, wagon 2); `tray` = the three tiles offered (shuffled). Sets: shapes = circle (`ART.shapeCircle`) / square (`ART.shapeSquare`) / triangle (`ART.shapeTriangle`); animals = cat (`ART.cat`) / dog (`ART.dog`) / mouse (`ART.mouse`); fruits = apple (`ART.apple`) / banana (`ART.banana`) / grapes (`ART.grapes`).

- **L1** (AB, six shown = three complete units; tray = the two needed + the set's third item):
  1. shapes: shown circle square circle square circle square; next circle, square; tray circle, square, triangle
  2. animals: shown cat dog cat dog cat dog; next cat, dog; tray cat, dog, mouse
  3. fruits: shown apple banana apple banana apple banana; next apple, banana; tray apple, banana, grapes
  4. shapes: shown triangle circle triangle circle triangle circle; next triangle, circle; tray triangle, circle, square
  5. animals: shown dog mouse dog mouse dog mouse; next dog, mouse; tray dog, mouse, cat
- **L2** (ABB / AAB, six shown = two complete units):
  6. shapes: shown circle square square circle square square; next circle, square; tray circle, square, triangle
  7. animals: shown cat cat dog cat cat dog; next cat, cat; tray cat, cat, dog
  8. fruits: shown apple banana banana apple banana banana; next apple, banana; tray apple, banana, grapes
  9. shapes: shown square square triangle square square triangle; next square, square; tray square, square, circle
  10. animals: shown mouse dog dog mouse dog dog; next mouse, dog; tray mouse, dog, cat
- **L3** (ABC with six shown; mid-unit endings with five shown):
  11. shapes: shown circle square triangle circle square triangle; next circle, square; tray circle, square, triangle
  12. fruits: shown apple banana grapes apple banana grapes; next apple, banana; tray apple, banana, grapes
  13. animals (ABB, mid-unit): shown cat dog dog cat dog; next dog, cat; tray dog, cat, mouse
  14. shapes (AB, mid-unit): shown circle square circle square circle; next square, circle; tray square, circle, triangle
  15. fruits (ABC, mid-unit): shown apple banana grapes apple banana; next grapes, apple; tray grapes, apple, banana
  16. animals (AAB, mid-unit): shown cat cat dog cat cat; next dog, cat; tray dog, cat, mouse

Play list of 8 per Rules; shuffle within level, levels in order; no item repeats; two consecutive items never use the same material set; the tray's correct first tile is never in the same slot twice running.

## Rules
- Item count: 8 (one item = two placements).
- Difficulty progression: 2 consecutive first-try items (both wagons correct with no wrong placement) → next level (cap L3).
- Adaptation: any wrong placement on an item, or non-first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: per wagon `ANIM.pop` + `tone("tap", k)`; on the second wagon `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ANIM.roll` on the train, engine `ANIM.puff`, rail dot, next train after 800 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and the tile gliding back with `ANIM.nudge`):
  - Copied the last element (B placed after ABB): brackets under every complete unit + the unit card above the empties.
  - Any other wrong item at L1/L2 (the unit not identified): the same brackets and unit card.
  - Wrong item at a mid-unit ending (L3): brackets under the complete units, `ART.bracketOpen` from the open unit across the empties, and the unit card.
  - Tray tile placed in the wrong wagon of the two (right item, wrong order): judged wrong for that wagon — the same cue; the child may undo and swap.
- Retry behaviour: attempt 1 → attempt 2 with the brackets and unit card visible → attempt 3 with the show-me ring on the correct tray tile; solved-with-help. No attempt 4. Undo (tapping a filled wagon) is free and never counts as an attempt.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Pattern Train". No other text; the play screen has no words (5-6 band).

## Sound
`tone("tap")` on selecting a tray tile or undoing; `tone("tap", 1)` / `tone("tap", 2)` on the first / second correct wagon; `tone("nudge")` on a wrong placement; `tone("correct")` when the train completes; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: engine, six wagons, two empty wagons and the three tray tiles all visible and separate).
- [ ] Keyboard operable (Tab: tray tiles then the two empty wagons; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong placements still ends with both wagons filled via the show-me ring).
- [ ] Tapping a tray tile then an empty wagon moves the tile into the wagon; tapping the filled wagon sends it back.
- [ ] After "circle square circle square circle square", placing circle then square completes the train, which rolls forward and back.
- [ ] After "cat cat dog cat cat dog", placing dog first sends it back and coral brackets appear under "cat cat dog" twice with a small card showing cat cat dog above the empty wagons.
- [ ] After a five-wagon train "cat dog dog cat dog", a wrong tile shows a dashed bracket running from the fourth wagon across both empty wagons.
- [ ] A second wrong placement puts a pulsing ring on the tray tile that belongs in that wagon.
- [ ] The two empty wagons can be filled in either order; each is judged on its own.
- [ ] All items in one train are the same size and colour; only the shape or picture differs.
- [ ] Two first-try trains in a row bring three-part units; a wrong placement brings a two-part unit next.
- [ ] The finish screen shows the eight units as small cards and no score.
- [ ] With `?sound=off` nothing is audible.
