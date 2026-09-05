# 187 — Attribute Detective

## Identity
- Slug: `attribute-detective`
- Subject / topic: Mathematics / sorting by ONE named attribute — colour, shape or size — while ignoring the other two
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the object, then a bin; the bins re-label with a new attribute each round)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (one item at a time, 2-3 bins labelled by ART icons, per-item judgement, 3rd wrong → show-me on the correct bin). Content is language-neutral (shapes, three tints, two sizes); no `LOCALE_DATA`. Zero instruction text on the play screen: the bins' icons ARE the instruction, and the owl's magnifier (`ART.lens`) sweeps over them when they change. **Colour is never the only cue (§12):** each of the three tints carries its own pattern glyph — teal always with dots, coral always with stripes, green always with crosses — on every object and on every colour-bin swatch. Nothing is spoken.

## Learning
- Objective: Sorts objects that differ in colour, shape AND size into bins that are labelled by only one of those attributes, changing which attribute to attend to whenever the bins change.
- Prerequisites: Recognises circle, square and triangle by outline (game 005); tells big from small. No reading; no colour names.
- Curriculum links: F-21 (sorting/classifying in the 12-system maths common core), F-31 row "Sort by attribute; repeating patterns" — conservative 6-7, earliest 4 → 5-6 (US K.MD.B.3 "classify objects into given categories"; England Reception "sort objects by a given criterion"; Germany Klasse 1 "sortieren nach Merkmalen"; France GS "trier selon un critère"; Netherlands groep 1-2 "sorteren"; Spain Infantil "clasificar por un atributo"; Brazil EI03ET01; Sweden förskoleklass "sortera"; Finland esiopetus "luokittelu"), F-4 ("sorting by attribute" on the UK reception map), F-103 (bigger object = more / size read as the salient attribute), F-115 (a rotated square is "a diamond"). F-42 (zero text at 5-6), F-43 (enacted feedback), F-61.
- Common misconceptions (F-103, F-115, F-21 classification by a salient attribute), each with this game's response:
  1. **Sorting by the most salient attribute instead of the named one (the bins say SHAPE, the child sorts a coral triangle by its colour).** Response: the object glides back to the belt and its fill drains away (`ANIM.stripFill` — the tint and pattern fade to `surface`, leaving only the outline), the outline glows (`ART.outlineGlow`, `ANIM.pulse`) and the bin whose icon matches that outline pulses; then the fill returns. The child sees the object with the distracting attribute removed.
  2. **Ignoring the new rule when the bins change (the previous round was SHAPE, the new bins say COLOUR, the child keeps sorting by shape).** Response: at every round change the bins re-label with `ANIM.relabel` (old icons rise and fade, new icons drop in) and the owl's `ART.lens` glides across the new icons (`ANIM.sweep`) before the first object arrives; a wrong bin in a colour round makes the object's outline fade and a swatch of its tint-and-pattern (`ART.swatch`) grow on it (`ANIM.toSwatch`) — the shape is taken away so only the colour is left to match.
  3. **Size read relatively or ignored (a small square goes in the BIG bin because it is bigger than the last object; F-103).** Response: in a size round a wrong bin drops a `ART.sizeBar` beside the object and beside each bin's icon (`ANIM.barGrow`): the object's bar matches one bin's bar in height, and that bin pulses. Big and small are fixed sizes (84 px and 48 px), never relative to the previous object.
  4. **A rotated square is "not a square" (F-115).** Response: from L2 squares and triangles arrive rotated; in a shape round a wrong bin plays `ANIM.settleUpright` (the outline turns to its prototype pose and back) before the outline glow.
  5. **Tapping a bin before an object is selected.** Response: the bin's icon `ANIM.pop`s (a harmless preview); nothing else. Tapping the object twice de-selects it.

## How it plays
1. **Start screen**: title "Attribute Detective", the owl (`ART.owl`) with `ART.lens` at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Round 1 (L1: a SHAPE round, bins circle / triangle)**: rail of 9 dots (§6). Zone A: the belt (`ART.belt`, a rounded bar at y = 170); the owl at (80, 150) holding `ART.lens` at (120, 178). Zone B: two bins (`ART.bin`, 160 × 120) at y = 380, x = 250 / 470, each with its icon on its front: `ART.iconCircle` and `ART.iconTriangle` (outlines in ink, no tint) and a count sub-label (`ART.binCount`, "0"). Before the first object, `ART.lens` glides from the first bin's icon to the second (`ANIM.sweep`, 900 ms) and returns to the owl — the magnifier shows what to look at. Then the first object slides in (`ANIM.slideIn`) to (360, 170): a big coral striped circle — `ART.objCircle` filled with the coral token, `ART.patStripes` drawn on it, at 84 px — as a `makeTile` 110 × 110 with a transparent body.
3. **Sorting**: tap the object (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The object glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; a praise pop every third correct sort and on the last; the rail dot fills; the next object slides in after 400 ms.
   - **Wrong bin**: the object glides back to the belt, `tone("nudge")`; then the round's enacted cue (Rules: strip-fill for shape rounds, to-swatch for colour rounds, size bars for size rounds), then the correct bin's icon `ANIM.pulse`s; all bins disabled during the cue (≈ 1.8 s). Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the object there completes the item as solved-with-help.
   - Tapping a bin with no object selected: its icon `ANIM.pop`s.
4. **Rounds**: a session is 3 rounds of 3 objects (9 items). Each round has ONE attribute; the attribute changes at every round boundary (never the same attribute twice running). L1 rounds = shape (2 bins); L2 rounds = colour or size (2 bins: two swatches, or a big and a small neutral blob `ART.iconBig` / `ART.iconSmall`); L3 rounds = any attribute; shape and colour rounds use 3 bins (three shapes, or three swatches), size rounds keep 2 bins (big / small — there is no "medium"). Objects within a round vary on the two OTHER attributes so they must be ignored: in a shape round the three objects have three different tints and mixed sizes.
5. **Round change**: the bins re-label (`ANIM.relabel`), the lens sweeps the new icons, the belt clears. No text.
6. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate` with the lens; the summary = the three rounds' bins drawn small in three rows (`ART.miniBin`, 90 × 44, with its icon and the objects it received drawn at 40 % inside) from y = 330 at 60 px pitch — the sorted collections are the summary, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  owl:           { kind: "emoji", value: "🦉", size: 80 },
  lens:          { kind: "emoji", value: "🔍", size: 44 },
  belt:          { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  objCircle:     { kind: "shape", shape: "circle", r: 42, fill: "structure", stroke: "ink", strokeWidth: 3 },                       // fill token replaced per object: structure (teal) / accent (coral) / good (green); r 42 big, r 24 small
  objSquare:     { kind: "shape", shape: "rect", w: 80, h: 80, fill: "structure", stroke: "ink", strokeWidth: 3 },                 // big 80, small 46
  objTriangle:   { kind: "shape", shape: "polygon", points: [[0,-46],[44,32],[-44,32]], fill: "structure", stroke: "ink", strokeWidth: 3 },   // small = the same points at 0.57 scale
  patDots:       { kind: "shape", shape: "circle", r: 3, fill: "bg" },              // drawn 3 × 3 at pitch 10 on a TEAL object (and on the teal swatch)
  patStripes:    { kind: "shape", shape: "rect", w: 30, h: 3, fill: "bg" },          // three bars at pitch 8 on a CORAL object (and swatch)
  patCross:      { kind: "shape", shape: "rect", w: 26, h: 3, fill: "bg" },          // two bars crossed at 90° on a GREEN object (and swatch)
  bin:           { kind: "shape", shape: "roundRect", w: 160, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  binCount:      { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  iconCircle:    { kind: "shape", shape: "circle", r: 20, stroke: "ink", strokeWidth: 3 },
  iconSquare:    { kind: "shape", shape: "rect", w: 40, h: 40, stroke: "ink", strokeWidth: 3 },
  iconTriangle:  { kind: "shape", shape: "polygon", points: [[0,-22],[22,16],[-22,16]], stroke: "ink", strokeWidth: 3 },
  iconSwatch:    { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "structure", stroke: "ink", strokeWidth: 2, radius: 8 },  // fill token per bin; its pattern glyph drawn on it
  iconBig:       { kind: "shape", shape: "circle", r: 22, fill: "inkSoft" },         // neutral grey blob — a size bin never shows a tint or a shape cue
  iconSmall:     { kind: "shape", shape: "circle", r: 11, fill: "inkSoft" },
  outlineGlow:   { kind: "shape", shape: "polygon", points: [], stroke: "accent", strokeWidth: 6 },   // traced over the object's outline in a shape cue (circle drawn via arc)
  swatch:        { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "structure", stroke: "ink", strokeWidth: 2, radius: 10 }, // grows on the object in a colour cue; fill = the object's tint, its pattern on it
  sizeBar:       { kind: "shape", shape: "rect", w: 10, h: 84, fill: "structure" },  // height = the object's / icon's height (84 big, 48 small); drawn beside it
  showRing:      { kind: "shape", shape: "roundRect", w: 172, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniBin:       { kind: "shape", shape: "roundRect", w: 90, h: 44, fill: "surface", stroke: "line", strokeWidth: 1, radius: 8 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Tint ↔ pattern is a fixed pairing everywhere in the game: `structure` + `ART.patDots`, `accent` + `ART.patStripes`, `good` + `ART.patCross`. A colour bin's `ART.iconSwatch` carries the same pairing, so a child who cannot tell teal from green matches dots to dots. Big = `objCircle` r 42 / `objSquare` 80 / `objTriangle` at scale 1; small = r 24 / 46 / scale 0.57. Nothing else in the game is tinted with `accent` or `good` except the two cue shapes named above.

## Animation registry
```js
const ANIM = {
  slideIn:       { x: 360, duration: 320, ease: "Sine.Out", trigger: "new object from x = 760 to the belt centre" },
  lift:          { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "object selected" },
  glide:         { duration: 260, ease: "Sine.InOut", trigger: "object to a bin / back to the belt (x,y set at call)" },
  pop:           { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct object; bin icon preview tap" },
  sweep:         { duration: 900, ease: "Sine.InOut", trigger: "the lens glides from the first bin icon across to the last (x set at call), then glides back to the owl" },
  relabel:       { y: "-=24", alpha: 0, duration: 260, ease: "Sine.In", trigger: "old bin icons rise and fade at a round change; new icons then appear (from y +24, alpha 0) with the reverse tween" },
  stripFill:     { alpha: 0, duration: 300, ease: "Sine.In", yoyo: true, hold: 1000, trigger: "the object's fill-and-pattern layer fades out (shape round cue), holds, returns" },
  toSwatch:      { scale: 1, alpha: 1, duration: 300, ease: "Back.Out", yoyo: true, hold: 1000, trigger: "the swatch grows on the object (from scale 0.3, alpha 0) while the outline layer fades to alpha 0.2 (colour round cue), holds, returns" },
  barGrow:       { scaleY: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "sizeBars grow from the baseline (from scaleY 0) beside the object and beside each bin icon (size round cue), hold, shrink" },
  settleUpright: { angle: 0, duration: 400, ease: "Sine.InOut", yoyo: true, hold: 500, trigger: "a rotated square / triangle turns to its prototype pose before the shape cue, then returns" },
  pulse:         { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "outlineGlow; the correct bin's icon after a cue" },
  showMe:        { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate:     { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
No flashing: each cue is one fade or one growth with a hold; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ owl(80,150)  ═══════════ belt y=170 ═══════════  object enters→│  zone A
      │  lens(120,178)          [ object (360,170) 110×110 ]           │
260   ├──────────────────────────────────────────────────────────────┤
      │        ┌────────┐            ┌────────┐      bins y=380        │
      │        │   ○    │            │   △    │      x=250/470         │  zone B
      │        │   0    │            │   0    │      (160×120)         │
      │        └────────┘            └────────┘                        │
      │   L3: three bins at x=180/360/540 (150×120)                    │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Size bars stand on a baseline at y = 212 beside the object (x = 430) and at y = 420 beside each bin icon (icon x + 40).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 9 × `ART.dotEmpty` at y = 28 (x = 272 + i × 22) → `ART.dotFull`.
- `ART.owl` (80, 150); `ART.lens` at (120, 178) at rest; `ART.belt` centred (390, 170).
- The object: a `makeTile` 110 × 110 at (360, 170) with transparent body; children in order: the fill-and-pattern layer (the shape — `ART.objCircle` / `ART.objSquare` / `ART.objTriangle` — drawn with its tint and its pattern glyphs `ART.patDots` / `ART.patStripes` / `ART.patCross` centred on it), the outline layer (the same shape stroked in ink, no fill), the rotation applied to the whole graphic (L2-L3). Selected look: `ANIM.lift` + the tile's `selectedStroke` outline (`THEME.colour.structure`, 3 px) as a rounded square.
- Bins: `makeTile` 160 × 120 (`ART.bin`; 150 × 120 at three bins) with the icon centred at (0, −16) and `ART.binCount` at (0, +36). Icons by round: shape round → `ART.iconCircle` / `ART.iconSquare` / `ART.iconTriangle`; colour round → `ART.iconSwatch` in the bin's tint with its pattern; size round → `ART.iconBig` / `ART.iconSmall`.
- Cue shapes: `ART.outlineGlow` traced over the object's outline; `ART.swatch` centred on the object; `ART.sizeBar`s at the baselines above; `ART.showRing` around the correct bin.
- Tap floors: object tile 110, bins ≥ 150 × 120 (≥ 80); gaps ≥ 30. Tab order: the object, then the bins left to right; Enter selects the object / drops it in a bin.

## Content
Language-neutral. An object = (shape, tint, size, rotation). Tints: T = teal (`structure` + dots), C = coral (`accent` + stripes), G = green (`good` + crosses). Sizes: B = big, S = small. Rounds list their attribute, their bins (left to right) and their three objects in stream order; within a round the objects always differ on BOTH non-sorted attributes at least once.
- **L1 — shape rounds, 2 bins, rotation 0°**: (shape; ○ △; circle C B · triangle T S · circle G S) · (shape; □ ○; square G B · circle C S · square T S) · (shape; △ □; triangle T B · square C B · triangle G S) · (shape; ○ □; circle T S · square G S · circle C B)
- **L2 — colour or size rounds, 2 bins; shapes rotated 0-359° (a square at 45° is still a square)**: (colour; T C; square C B 45° · circle T S · triangle C S 200°) · (size; big small; triangle G B 120° · circle T S · square C S 30°) · (colour; G T; circle G B · square T B 20° · triangle G S 300°) · (size; small big; square C S 45° · circle G B · triangle T B 90°) · (colour; C G; triangle C S 60° · circle G B · square C B 10°)
- **L3 — 3 bins (shape or colour); size rounds keep 2 bins**: (shape; ○ □ △; triangle C B 150° · circle G S · square T S 45°) · (colour; T C G; circle G B · triangle T S 240° · square C B 70°) · (shape; △ ○ □; square G B 45° · triangle C S 300° · circle T B) · (size; big small; circle C B · square T S 45° · triangle G S 30°) · (colour; G T C; square T S 20° · circle C B · triangle G B 180°)

Round order: 3 rounds per session; start at L1; the attribute never repeats in consecutive rounds (if the next level's drawn round has the same attribute as the last, draw again); bin order left to right is as listed (a fresh round set may mirror it); the correct bin never repeats more than twice running across a round.

Worked example: round 1 (shape; ○ △): coral circle → ○ first-try; teal small triangle → ○ (sorted by "it's teal like the last one"?) — the fill drains away, the outline glows, the △ bin pulses; → △ (helped); green small circle → ○ first-try. Round done with 1 wrong bin → up one level → round 2 (L2 colour; T C): the bins relabel to a teal-dots swatch and a coral-stripes swatch, the lens sweeps them; coral square 45° → C first-try; teal small circle → T first-try; coral small triangle → T (sorted by size?) — the outline fades and a coral-stripes swatch grows on it, the C bin pulses; → C (helped) → up to L3 (1 wrong). Round 3 (L3 shape; ○ □ △): all three first-try → Finish shows three rows of little bins with their objects.

## Rules
- Item count: 9 (3 rounds of 3).
- Difficulty progression: a round completed with at most one wrong bin → next round one level up (cap L3).
- Adaptation: a round with two or more wrong bins → next round one level down (floor L1); the attribute still changes at every round.
- What happens on a correct answer: object glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the ninth; rail dot fills; next object in 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Shape round, sorted by colour or size: object returns, `tone("nudge")`; (rotated object: `ANIM.settleUpright` first); the fill and pattern drain away (`ANIM.stripFill`), `ART.outlineGlow` pulses on the bare outline, the matching shape bin's icon pulses, the fill returns.
  - Colour round, sorted by shape or size: object returns, tone; the outline fades and `ART.swatch` in the object's tint-and-pattern grows on it (`ANIM.toSwatch`), the matching swatch bin pulses, the object returns to normal.
  - Size round, sorted by shape or colour, or size judged relative to the previous object: object returns, tone; `ART.sizeBar`s grow beside the object and beside both bin icons (`ANIM.barGrow`); the bin whose bar matches pulses.
  - Any round, first object after a round change sorted by the OLD attribute: the round's cue as above, and the lens sweeps the bins once more before the retry.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 9 items (3 rounds). No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Attribute Detective". No text on the play screen (bin counts are numerals; the attribute is shown by the icons and the lens).

## Sound
`tone("tap")` on selecting an object; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 3)` when the lens finishes its sweep at a round change (a "look here" note); `tone("finish")` once. Silent under `?sound=off`; the icons, glow, swatch and bars carry every meaning.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: belt, object, both/three bins and the owl visible; three bins stay separate).
- [ ] Keyboard operable (Tab: the object, then the bins left to right; Enter selects the object / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] Every teal object shows dots, every coral object stripes, every green object crosses — and the colour-bin swatches show the same pattern as their tint.
- [ ] When the bins change, the old icons rise away, the new icons drop in, and the magnifier glides across them before the next object arrives.
- [ ] In a shape round, putting a coral triangle in the circle bin drains its colour to a bare outline, the outline glows, and the triangle bin pulses.
- [ ] In a colour round, putting a coral square in the teal bin fades its outline and grows a striped coral swatch on it, and the coral bin pulses.
- [ ] In a size round, a wrong bin grows a bar beside the object and beside each bin icon; the object's bar matches the correct bin's bar.
- [ ] At the second level a square arriving turned 45° is accepted in the square bin; if put elsewhere it turns upright for a moment first.
- [ ] Two rounds in a row never sort by the same attribute; a round with 0-1 mistakes is followed by a harder round, with 2+ by an easier one.
- [ ] Bin counts go up only on correct sorts; the finish screen shows each round's bins with the objects they received and no score.
- [ ] With `?sound=off` nothing is audible.
