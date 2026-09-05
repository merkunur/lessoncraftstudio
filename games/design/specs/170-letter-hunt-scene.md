# 170 — Letter Hunt

## Identity
- Slug: `letter-hunt-scene`
- Subject / topic: Literacy / letter recognition in a scene — finding every copy of a target letter among other letters, then saying how many were found
- Age band: `5-6`
- Interaction pattern: `P3` — tap to count (tap each target letter once; a basket tile ends the hunt; then a P1 numeral tile gives the count)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (with the P1 count tile as the final sub-step). Locale note: the target and distractor letters are the basic 26-letter Latin set shared by all 11 alphabets, so the content is language-neutral (A-15); letters with diacritics are never targets. No letter names or sounds — nothing is spoken; the target is always SHOWN.

## Learning
- Objective: Taps every copy of a shown target letter hidden among twelve letters in a garden scene (each tap marks the letter and shows the running count), ignoring look-alike letters, then taps the numeral that tells how many were found.
- Prerequisites: None. Visual matching of a shown letter; counts to 5 by tapping (the numeral appears on each found letter, so the child does not need to hold the count in their head). Discoverable by tapping: the first target found glows and shows "1".
- Curriculum links: F-22 (letter recognition at 5-7 in all 12 systems), F-31 row "Letter names + sounds; initial sound" (conservative 6-7, earliest 4 → 5-6) and row "Count to 10-20, one-to-one" (5-6), F-1 (letter recognition in 9 of 15 sources), F-101 (cardinality — the count tile). US RF.K.1.d; England Reception/Y1 letter recognition; Germany Klasse 1 Buchstaben erkennen; France GS "reconnaître les lettres"; Spain Infantil-1º; Brazil EF01LP04; Netherlands groep 2-3; Sweden förskoleklass "bokstäver"; Finland esiopetus.
- Common misconceptions (F-121, F-122, F-101), each with this game's response:
  1. **Mirror and near-form confusion — d, p or q tapped for b; E for F; M for W (F-121).** Response: the tapped letter nudges and is NOT counted; a copy of it glides up to sit beside the target card (`ART.compareGhost`, `ANIM.compare`) so the two are side by side for 1.2 s; for the b/d/p/q family `ART.bellyDot`s mark the round part of both letters. The child sees the difference before trying again.
  2. **Counting a letter twice (one-to-one failure, F-101).** Response: a found letter keeps its numeral badge and its glow; a second tap on it does nothing (`tone("tap")` only) — the object enforces one-to-one.
  3. **Stopping early — tapping the basket while targets remain (F-101 stable order / completeness).** Response: the basket `ANIM.nudge`s and the letters not yet found `ANIM.pulse` once each (a look-again hint); the numeral tiles do not appear until every target is marked.
  4. **"Last number = how many" not grasped — after finding three letters the child taps 2 or 4 (F-101 cardinality).** Response: the found letters replay their count in order (`ANIM.recount`: each glows in turn with its numeral and a rising tone, the last one pulses twice), then the child taps again.

## How it plays
1. **Start screen**: title "Letter Hunt", the hedgehog with a basket (`ART.hedgehog` at (330, 200), `ART.basket` at (410, 220) at 60 %), Start, picker.
2. **Item 1 (L1: target S; 3 copies among 12)**: rail of 8 dots (§6) at y = 28. Left column: the target card (`ART.targetCard`, 110 × 110) at (80, 130) showing the target letter (`ART.targetLetter`, 64 px, `THEME.font.display`, `THEME.colour.structure`); below it the basket (`ART.basket`, 120 × 90) at (80, 300) with the hedgehog peeking behind it at (80, 240). Scene: a garden backdrop (`ART.ground`, a soft rounded rectangle 460 × 300 centred at (430, 240)) with `ART.bush` shapes at its corners; on it twelve leaf tiles (`ART.leafTile`, 84 × 84) in a 4 × 3 grid — columns x = 235 / 365 / 495 / 625, rows y = 130 / 240 / 350 — each showing one letter at 44 px (`THEME.font.display`, `THEME.colour.ink`); each tile is offset by a fixed per-slot jitter of at most ±8 px (Content) so the grid reads as a scene while the tiles stay in rows. Three of the twelve are the target S; the rest are other capitals. Zone C is empty until the count step.
3. **Hunting**: the child taps a letter tile.
   - **A target**: `ANIM.pop`, `tone("tap", k)` (k = the running count), the tile gains `ART.foundGlow` behind it and `ART.countBadge` with the numeral k at its top-right (14 px `THEME.colour.inkOnAccent`); it stays enabled but a second tap does nothing.
   - **A non-target**: `ANIM.nudge`, `tone("nudge")`; the compare cue: a copy of the tapped letter glides (`ANIM.compare`) to (150, 130) beside the target card, holds 1200 ms and fades; for b/d/p/q pairs `ART.bellyDot`s appear on both; the hedgehog `ANIM.peek`s. Not counted; the item counts as retried.
   - **The basket, with targets remaining**: the basket `ANIM.nudge`s, `tone("nudge")`, the unfound targets `ANIM.pulse` once each (left to right), the hedgehog peeks. A second early basket tap: the same, and the unfound targets keep a soft `ART.hintRing` until found (show-me).
   - **The basket, with every target found**: `tone("correct")`; three numeral tiles (`ART.numTile`, 90 × 90) `ANIM.appear` in zone C at y = 500, x = 260 / 360 / 460, showing n − 1, n, n + 1 in shuffled order (for n = 2: 1, 2, 3).
4. **Counting**: the child taps a numeral tile.
   - **Correct (n)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the found letters glide one by one into the basket (`ANIM.glide`, 150 ms apart, `tone("tap", k)`), the basket `ANIM.bob`s, the rail dot fills; next item after 800 ms (new scene `ANIM.appear`s).
   - **Wrong (n − 1 or n + 1)**: `ANIM.nudge`, `tone("nudge")`; `ANIM.recount` — the found letters light in order with their numerals and rising tones, the last one pulses twice; the numeral tiles stay. Second wrong: the recount again, then the correct numeral gains `ART.hintRing` (`ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Items 2-8**: per Content/Rules. L1 = capitals, 2-3 targets, distractors unlike the target; L2 = lowercase, 3-4 targets, distractors include the target's mirror/near forms; L3 = lowercase, 4-5 targets, distractors include every confusable of the target.
6. **A full worked session**: item 1 S ×3 among O T M C A L H R K: S ✓ "1", S ✓ "2", basket early ✗ → the third S pulses; S ✓ "3", basket → tiles 2 / 3 / 4 → 3 ✓ (retried) · item 2 T ×2: ✓✓, basket, 2 ✓ · item 3 O ×3 ✓ → step up · item 4 (L2) b ×3 among d p h o a n e: d ✗ → the d glides up beside the big b, coral dots on both bellies; b ✓ ✓ ✓, basket, 4 ✗ → the three found b's light up 1, 2, 3 and the last pulses twice; 3 ✓ · item 5 (L2) n ×4 ✓ · item 6 (L2) a ×3 ✓ → step up · item 7 (L3) p ×4 among q b d g o ✓ · item 8 (L3) e ×5 ✓ → Finish.
7. **Finish**: `t("all_done")` (360, 110); the hedgehog (330, 200) `ANIM.celebrate` beside the basket (410, 220); the summary = the eight target letters found this session at 40 px (`ART.foundLetter`) in a row at y = 390 (x = 360 − 3.5 × 70 + i × 70), each with a small `ART.countBadge` showing how many were found; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  hedgehog:     { kind: "emoji", value: "🦔", size: 64, fallback: "🐿️" },      // Unicode 10 → chipmunk
  basket:       { kind: "shape", shape: "polygon", points: [[-60,-30],[60,-30],[48,45],[-48,45]], fill: "surface2", stroke: "structure", strokeWidth: 3 },   // ART.basketHandle above
  basketHandle: { kind: "shape", shape: "arc", r: 34, stroke: "structure", strokeWidth: 4 },
  targetCard:   { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 18 },
  targetLetter: { kind: "text",  value: "", size: 64, font: "display", color: "structure" },
  ground:       { kind: "shape", shape: "roundRect", w: 460, h: 300, fill: "structureSoft", radius: 30 },
  bush:         { kind: "shape", shape: "ellipse", w: 90, h: 50, fill: "surface2", stroke: "line", strokeWidth: 2 },   // one at each corner of the ground
  leafTile:     { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface", stroke: "line", strokeWidth: 2, radius: 24 },   // letter 44 px display ink
  foundGlow:    { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "accent", radius: 28 },       // behind a found tile at alpha 0.3
  countBadge:   { kind: "shape", shape: "circle", r: 13, fill: "accent" },                             // numeral 14 px display inkOnAccent, at the tile's (+30,−30)
  compareGhost: { kind: "text",  value: "", size: 64, font: "display", color: "inkSoft" },              // the tapped non-target, beside the target card
  bellyDot:     { kind: "shape", shape: "circle", r: 6, fill: "accent" },
  numTile:      { kind: "shape", shape: "roundRect", w: 90, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // numeral 44 px display ink
  hintRing:     { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 26 },
  foundLetter:  { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The only emoji is the hedgehog (with a fallback). Colour-blind safety: a found letter carries a numeral badge AND a glow AND is locked — three cues; the compare cue is position (side by side) plus dots; the basket differs from the tiles by shape.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a target found; the correct numeral" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a non-target tapped; the basket tapped early; a wrong numeral" },
  compare:   { duration: 300, ease: "Sine.InOut", hold: 1200, trigger: "compareGhost glides from the tapped tile to (150,130) beside the target card, holds, then fades (alpha 0 over 200 ms)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "each unfound target after an early basket tap (left to right, 200 ms apart)" },
  recount:   { scale: 1.15, duration: 260, ease: "Sine.InOut", yoyo: true, trigger: "each found tile in count order, 320 ms apart, with tone('tap', k); the last one repeats once more" },
  peek:      { y: "-=16", duration: 160, ease: "Sine.Out", yoyo: true, hold: 500, trigger: "hedgehog rises from behind the basket on a non-target or an early basket tap" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "each found letter (scale to 0.4) into the basket, 150 ms apart (x,y at call)" },
  bob:       { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "basket as the letters land" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "numeral tiles; a new scene's tiles and target (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on unfound targets after a second early basket tap, or on the correct numeral after two wrong numerals (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ ┌──────┐   ╭────────────── ground (430,240) 460×300 ─────────╮ │
      │ │  S   │   │ [O]    [S]    [T]    [M]     row y=130           │ │  zone A
      │ └──────┘   │                                                  │ │
      │ target     │ [S]    [C]    [A]    [L]     row y=240           │ │
      │ (80,130)   │                                                  │ │  zone B
      │ hedgehog   │ [H]    [R]    [S]    [K]     row y=350           │ │
      │ (80,240)   │  x=235  x=365  x=495  x=625  (84×84, ±8 jitter)  │ │
      │ [basket]   ╰──────────────────────────────────────────────────╯ │
      │ (80,300)                                                      │
480   ├──────────────────────────────────────────────────────────────┤
      │              [ 2 ]     [ 3 ]     [ 4 ]   numerals y=500       │  zone C
      │             x=260     x=360     x=460   (90×90, count step)   │
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The scene spans zones A and B on purpose (P3: the set is the stage); the count tiles are the only zone-C content. Stage height stays 560.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.targetCard` centred (80, 130) with `ART.targetLetter`; `ART.compareGhost` appears at (150, 130) during a cue; `ART.bellyDot` at the letter's bowl offset (b +9, +6 · d −9, +6 · p +9, −5 · q −9, −5, scaled to 64 px) on both letters.
- `ART.ground` centred (430, 240); four `ART.bush`es at (230, 105), (630, 105), (230, 375), (630, 375) drawn under the tiles.
- Letter tiles: `makeTile` 84 × 84 with `ART.leafTile` tokens at the grid position plus the slot's jitter; letter label 44 px `THEME.font.display` `THEME.colour.ink`. Found = `ART.foundGlow` behind (alpha 0.3) + `ART.countBadge` at (+30, −30) with the numeral + the library selected outline; a found tile ignores further taps.
- `ART.hedgehog` at (80, 240) behind `ART.basket` (80, 300) with `ART.basketHandle` at (80, 262); the basket is a `makeTile` 120 × 90 (hit area padded to 120 × 96).
- Numeral tiles: `makeTile` 90 × 90 with `ART.numTile` tokens at (260, 500), (360, 500), (460, 500); numeral 44 px `THEME.font.display` `THEME.colour.ink`; absent until the basket accepts the hunt; `ART.hintRing` behind one when shown.
- Tap floors: letter tiles 84, basket 120 × 96, numeral tiles 90 (≥ 80). Gaps: columns 130 apart (46 clear), rows 110 apart (26 clear) — jitter ≤ 8 keeps every gap ≥ 12.
- Tab order: letter tiles row-major, then the basket, then (when present) the numeral tiles left to right.
- During a cue (compare ≈ 1.7 s; recount ≈ 0.4 s × n) all tiles are `setEnabled(false)`.

## Content
Language-neutral: the basic 26 Latin letters, present in every one of the 11 alphabets; the display font is `THEME.font.display` (Baloo 2, single-storey a and g). Each item = (target; number of copies; the 12 − n distractor letters, each used once). Scenes always hold exactly 12 tiles; target positions are shuffled per item; no two targets are horizontally adjacent in the same row on a fresh scene.

Jitter table (per grid slot, row-major, in px): (+6, −4) (−5, +6) (+3, +7) (−7, −3) (−4, +5) (+7, −6) (−6, −5) (+4, +4) (+5, +6) (−3, −7) (+6, +3) (−5, −4).

- **L1** (capitals; 2-3 copies; distractors unlike the target): (S; 3; O T M C A L H R K) · (T; 2; O S M C A L H R K B) · (O; 3; S T M A L H R K B) · (A; 3; S T O M L H R K B) · (M; 2; S T O A L H R K B C)
- **L2** (lowercase; 3-4 copies; distractors include the mirror or near form): (b; 3; d p h o a n e r s) · (n; 4; h u m r o a e s) · (a; 3; o e c d u s r n m) · (d; 3; b p q o a n e s r) · (m; 4; n w u h o a e s)
- **L3** (lowercase; 4-5 copies; distractors include every confusable of the target): (p; 4; q b d g o a n e) · (e; 5; a c o s r n m) · (u; 4; n v w o a e s r) · (q; 4; p b d g o a n e) · (h; 5; n b k r o a e)

Numeral tiles per item: n − 1, n, n + 1 in shuffled order (for n = 2: 1, 2, 3); the correct numeral's slot never repeats twice running (§13). Play list of 8 per Rules; no target repeats within a session; the first item of a session is always L1 with 3 copies.

## Rules
- Item count: 8.
- Difficulty progression: 3 consecutive items completed with no wrong tap (no non-target, no early basket, no wrong numeral) → next level (cap L3).
- Adaptation: 2 wrong taps within one item, or a wrong tap in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: each target found → `ANIM.pop`, `tone("tap", k)`, glow + badge k; the basket with all found → `tone("correct")` and the numeral tiles `ANIM.appear`; the correct numeral → `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong tap only), the found letters `ANIM.glide` into the basket with rising tones, basket `ANIM.bob`, rail dot, next item after 800 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`):
  - A mirror or near form tapped (d for b, E for F, m for n): `ART.compareGhost` `ANIM.compare`s beside the target card (with `ART.bellyDot`s for b/d/p/q), hedgehog `ANIM.peek`.
  - Any other non-target tapped: the same compare cue without dots.
  - A found letter tapped again: nothing (`tone("tap")`), not an attempt.
  - The basket tapped with targets remaining: the unfound targets `ANIM.pulse` in turn; on the second early tap they gain `ART.hintRing`.
  - A wrong numeral (n − 1 or n + 1): `ANIM.recount` over the found letters, the last pulsing twice; on the second wrong numeral the correct tile gains `ART.hintRing`.
- Retry behaviour: hunting continues until every target is found (non-targets never end the hunt); the count step allows attempt 1 → attempt 2 after the recount → attempt 3 with the hint ring; solved-with-help if any ring was used. No attempt 4 on the numeral.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Letter Hunt". No words on the play screen; letters and numerals are content, not text.

## Sound
`tone("tap", k)` on the k-th target found (one note per letter, pitch rising with the count — F-213); `tone("nudge")` on a non-target, an early basket tap or a wrong numeral; `tone("correct")` when the basket accepts the hunt and again on the correct numeral; `tone("tap", k)` per letter during the recount and as each letter lands in the basket; `tone("finish")` once. Silent under `?sound=off`. Letter names and sounds are NOT spoken (no audio files).

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: target card, basket, all twelve tiles and the three numeral tiles fully visible with gaps).
- [ ] Keyboard operable (Tab walks the twelve tiles row by row, then the basket, then the numerals; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the basket always accepts the hunt once every target is found and the hint ring completes the count).
- [ ] Tapping a target letter shows "1" on it and a glow; the next shows "2"; tapping a found letter again changes nothing.
- [ ] Tapping d when the target is b makes the d glide up beside the big b with a coral dot on each letter's round part, and it is not counted.
- [ ] Tapping the basket with a target still unfound makes the basket wiggle and the unfound letters pulse; the numeral tiles do not appear.
- [ ] Tapping the basket after the last target brings three numeral tiles; the correct one is the number on the last found letter.
- [ ] Tapping a wrong numeral makes the found letters light up in order with their numerals and the last one pulse twice.
- [ ] The correct numeral sends the found letters one by one into the basket with rising notes.
- [ ] The first scene uses capitals with three targets; lowercase scenes with mirror-form distractors appear after three clean items.
- [ ] Letters render in the rounded display font; the tiles sit in three rows of four with only a slight offset each.
- [ ] The finish screen shows the eight target letters with their counts and no score.
- [ ] With `?sound=off` nothing is audible.
