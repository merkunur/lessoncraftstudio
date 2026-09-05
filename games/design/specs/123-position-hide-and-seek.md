# 123 — Hide and Seek

## Identity
- Slug: `position-hide-and-seek`
- Subject / topic: Mathematics / position words — in, on, under, beside, between — shown as an icon, never as a word
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap the mouse, then tap the spot the icon shows)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (judged per placement). Content is language-neutral: the prompt is an ICON (an arrow relative to a small box) and nothing on the play screen is written; the position WORDS are deliberately out of scope for this game (a reader gets nothing a pre-reader does not). Left/right are NOT in this game (game 124).

## Learning
- Objective: Places the mouse in, on, under, beside or between the crate(s) to match an arrow-and-box icon, choosing the one spot among 3-5 that the icon shows.
- Prerequisites: None beyond tapping. The first item is discoverable: the mouse tile pops when tapped and the spots are visible dashed outlines.
- Curriculum links: F-21 ("position and direction words" in the common core of all twelve systems), F-31 row "Position words (in/on/under/left/right)" — conservative 7, earliest 5, 11 of 12 systems → 5-6 (US K.G.A.1 "describe the relative positions of objects using terms such as above, below, beside, in front of, behind, next to"; England Reception ELG / Y1 "describe position, direction and movement"; Germany Klasse 1 "Lagebeziehungen"; France GS "se situer / situer des objets: sur, sous, dans, à côté, entre"; Netherlands groep 1-2 "ruimtelijke begrippen"; Spain Infantil "nociones espaciales"; Brazil EI03ET04; Sweden förskoleklass "lägesord"; Finland esiopetus). Feedback is enacted, not written (F-43, F-42: zero text on the play screen for 5-6); invalid placements are refused, never punished (F-61); tap-then-tap replaces drag (F-49).
- Common misconceptions (position-word acquisition order and the errors it produces; responses rest on F-43 enacted feedback and F-61), each with this game's response:
  1. **"In" and "on" confused (the mouse is put on top of the crate when the icon shows the arrow going into it, or vice versa).** Response: the mouse lands where it was placed (it is a valid spot), then after 400 ms the big hint arrow (`ART.hintArrow`, the same glyph as the prompt, 44 px) appears at the CORRECT spot and bobs (`ANIM.bob`), the prompt bubble pulses (`ANIM.pulse`) and the crate's front panel `ANIM.pulse`s for the "in" case (the mouse would vanish behind it), then the mouse glides back to its mat. Nothing is said.
  2. **"Under" read as "at the bottom of" (the child puts the mouse inside, low down).** Response: the crate stands on two feet so there is a real gap under it; the hint arrow points up into that gap from the ground and the feet `ANIM.pulse` once — the place under a thing is below its whole body.
  3. **"Beside" read as "anywhere near" (the child taps the between spot or the under spot).** Response: the hint arrow appears at the beside spot pointing at the crate's side; the crate's side wall (`ART.sideGlow`) lights for 900 ms — beside means touching the side, on the ground.
  4. **"Between" read as "beside" (only one neighbour considered).** Response: at L3 a plant pot stands to the right of the crate on between-items only; a placement at the beside spot brings the hint arrow into the gap between crate and plant while BOTH neighbours pulse (`ANIM.pulse` on the crate and the plant together) — between needs two.
  5. **Tapping a spot before choosing the mouse.** Response: the spot does `ANIM.pop` as a harmless preview; nothing else. Tapping the mouse twice de-selects it (no error).

## How it plays
1. **Start screen**: title "Hide and Seek", the cat (`ART.cat`) at (300, 200) and the mouse (`ART.mouse`) at (420, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: prompt = IN)**: rail of 8 dots (§6) at y = 28. The scene: a ground line (`ART.ground`) at y = 386 from x = 40 to 680; the crate (`ART.crate`, 170 × 84) centred at (420, 250) standing on two feet (`ART.foot`, 24 × 94) at (350, 339) and (490, 339) so a clear gap sits under it; the crate's front panel (`ART.crateFront`, 170 × 40) at (420, 272), drawn ABOVE the mouse layer so a mouse placed inside is half hidden. The cat sits at (100, 178) with a speech bubble (`ART.bubble`, 130 × 90) at (100, 96) holding the prompt icon: `ART.promptBox` (an open-topped little box) with `ART.arrowDown` drawn so its tip is inside the box — "into". The spots: three dashed tiles (`makeTile` 80 × 80 with `ART.spot` tokens) at ON (420, 158), IN (420, 250) and UNDER (420, 344); each spot's `onTap` is the place logic. The mouse sits on a mat (`ART.mat`) as a `makeTile` 80 × 80 at (100, 290) with `ART.mouse` as its label. No text anywhere.
3. **Placing**: the child taps the mouse — it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The child taps a spot — the mouse glides (`ANIM.glide`) to the spot's centre and sits there (for IN, behind the front panel; for ON, on the crate's top edge; for UNDER, on the ground between the feet).
   - **Correct (IN)**: `ANIM.pop` on the mouse, `tone("correct")`, the cat `ANIM.peek` (a small lean), `GameCore.showPraise` with the next key in rotation; the rail dot fills; after 900 ms the mouse glides back to the mat and the next prompt icon `ANIM.appear`s in the bubble.
   - **Wrong (ON or UNDER)**: the mouse lands; after 400 ms `tone("nudge")`, the mouse `ANIM.nudge`s, the hint arrow `ART.hintArrow` appears at the correct spot (`ANIM.bob`, 3 bobs) while the bubble `ANIM.pulse`s and the position-specific part of the scene pulses (Rules); then the mouse glides back to the mat. All spots are `setEnabled(false)` during the cue (≈ 1.6 s). Attempt 2 — the item counts as retried.
   - **Wrong on attempt 2**: the cue again, and the correct spot gains the show-me ring (`ART.showRing`, `ANIM.showMe`) that stays until the mouse is placed there; placing it there completes the item as solved-with-help (no praise pop; the cat still peeks).
   - Tapping a spot with no mouse selected: the spot `ANIM.pop`s. Tapping the mouse again while selected: de-selects, `tone("tap")`.
4. **Items 2-8**: per Content/Rules. L1 prompts from IN / ON / UNDER with three spots visible; L2 adds BESIDE — a fourth spot at (280, 344) on the ground touching the crate's left side; L3 adds BETWEEN — on between-items only, the plant pot (`ART.plant`) appears at (660, 338) and a fifth spot at (567, 344) sits in the gap between crate and plant; the prompt icon for between shows two things (`ART.promptBox` and `ART.promptPlant`) with `ART.arrowDown` over the gap. On beside-items at L3 the plant is absent (four spots) so the between spot never competes with beside.
5. **Finish**: `t("all_done")` (360, 110); the cat (300, 200) and the mouse (420, 200) with `ANIM.celebrate`; the summary = the eight prompt icons the child matched, drawn as small `ART.summaryChip`s (56 × 48, each holding a 60 %-scale copy of that item's box-and-arrow icon) in a row at y = 400 (x = 360 − 3.5 × 68 + i × 68); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4 minutes.

## Art registry
```js
const ART = {
  cat:          { kind: "emoji", value: "🐱", size: 72 },
  mouse:        { kind: "emoji", value: "🐭", size: 56 },          // label of the 80×80 mouse tile; the object that is placed
  plant:        { kind: "emoji", value: "🪴", size: 64, fallback: "🌵" },   // Unicode 13 → cactus fallback; the second object on between-items
  promptPlant:  { kind: "emoji", value: "🪴", size: 24, fallback: "🌵" },   // the plant inside the between icon
  ground:       { kind: "shape", shape: "line", w: 640, stroke: "line", strokeWidth: 3 },                // y=386, x 40-680
  crate:        { kind: "shape", shape: "roundRect", w: 170, h: 84, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 10 },
  crateFront:   { kind: "shape", shape: "rect", w: 170, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // front panel, drawn over the mouse layer
  foot:         { kind: "shape", shape: "rect", w: 24, h: 94, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  sideGlow:     { kind: "shape", shape: "rect", w: 8, h: 84, fill: "accent" },                          // lights the crate's left side wall during the beside cue
  mat:          { kind: "shape", shape: "ellipse", w: 90, h: 24, fill: "structureSoft" },               // under the mouse tile on the tray
  spot:         { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed via lineDash [8,6]; selected look = structure 3 px outline
  bubble:       { kind: "shape", shape: "roundRect", w: 130, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  promptBox:    { kind: "shape", shape: "polygon", points: [[-20,-15],[-20,15],[20,15],[20,-15]], stroke: "ink", strokeWidth: 3 },   // open-topped box outline (no top edge), drawn inside the bubble
  arrowDown:    { kind: "text",  value: "↓", size: 30, font: "display", color: "accent" },   // the prompt arrow; rotated 180° for "up", 90°/−90° for sideways
  hintArrow:    { kind: "text",  value: "↓", size: 44, font: "display", color: "accent" },   // the big hint at the correct spot; same rotation rule
  showRing:     { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  summaryChip:  { kind: "shape", shape: "roundRect", w: 56, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Prompt icon geometry inside the bubble (relative to the bubble centre): IN = `ART.promptBox` at (0, 6) and `ART.arrowDown` at (0, −4) so the arrowhead sits inside the box; ON = box at (0, 12), arrow at (0, −26) pointing down onto the box's top; UNDER = box at (0, −10), arrow rotated 180° at (0, 30) pointing up at the box's underside; BESIDE = box at (16, 4), arrow rotated −90° (pointing right) at (−28, 4) aimed at the box's left side; BETWEEN = box at (−26, 8), `ART.promptPlant` at (28, 8), arrow at (0, −24) pointing down into the gap. The hint arrow uses the same rotation and sits at the correct spot's centre offset toward the crate by 30 px (IN: on the spot centre; ON: 30 px above the spot; UNDER: 30 px below; BESIDE: 30 px left; BETWEEN: 30 px above).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "mouse selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "mouse to a spot / back to the mat (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct placement; a spot tapped with no mouse selected" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "mouse after a wrong placement" },
  bob:       { y: "-=10", duration: 220, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hint arrow at the correct spot" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "prompt bubble; the scene part named by the misconception (front panel, feet, side wall, crate + plant)" },
  peek:      { angle: -8, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "cat after a correct placement" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new prompt icon; the plant and fifth spot on between-items (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "hint arrow after the cue; plant and fifth spot when leaving a between-item" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the correct spot (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish cat and mouse" }
};
```
No flashing: `showMe` at 1 Hz; `bob` three times then stops.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bubble (100,96) [icon]                                       │
      │                                  ┌ ON spot (420,158) ┐        │  zone A
      │  cat (100,178)                 ┌───── crate (420,250) ─────┐   │
      │                                │   [ IN spot (420,250) ]   │   │
260   ├────────────────────────────────│   front panel y=272       │───┤
      │  mouse tile (100,290) on mat   └──┬────────────────────┬───┘   │
      │        BESIDE (280,344)  foot     UNDER (420,344)  foot  BETWEEN (567,344)  plant (660,338) │  zone B
      │ ─────────────────────── ground y=386 ─────────────────────── │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The between spot and the plant exist only on between-items (L3).

## Visual specification
- Background `THEME.colour.bg`. Rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- Scene: `ART.ground` at y = 386; `ART.foot` × 2 at (350, 339) and (490, 339); `ART.crate` at (420, 250); `ART.crateFront` at (420, 272) on a layer above the mouse; `ART.plant` at (660, 338) on between-items only; `ART.sideGlow` at (337, 250) during the beside cue.
- Spots: `makeTile` 80 × 80 with `ART.spot` tokens (dashed outline via graphics lineDash [8, 6]) at ON (420, 158), IN (420, 250), UNDER (420, 344), BESIDE (280, 344) from L2, BETWEEN (567, 344) on L3 between-items. Selected look never used on spots (they are destinations); `ART.showRing` behind the correct spot on attempt 3.
- Mouse: `makeTile` 80 × 80 at (100, 290) with `ART.mouse` as label and a transparent body over `ART.mat` at (100, 322); when placed, the mouse tile's container glides to the spot centre (ON: (420, 150) so it stands on the crate's top edge; IN: (420, 250); UNDER: (420, 348); BESIDE: (280, 348); BETWEEN: (567, 348)).
- Cat `ART.cat` (100, 178); `ART.bubble` (100, 96) with the prompt icon per the geometry note in the Art registry; `ART.hintArrow` per the same note.
- All tiles 80 × 80 (5-6 floor); the smallest gap between spots is 12 px (ON to IN: 12; IN to UNDER: 14). Tab order: the mouse tile first, then spots ON, IN, UNDER, BESIDE, BETWEEN (the ones present). Under `?embed=1` the picker is not created.
- No text on the play screen.

## Content
Language-neutral. Item = (prompt; spots shown; correct spot). Prompt keys: IN · ON · UNDER · BESIDE · BETWEEN.

- **L1** (three spots ON / IN / UNDER): IN · ON · UNDER · IN · UNDER · ON
- **L2** (four spots, + BESIDE): BESIDE · UNDER · BESIDE · ON · IN · BESIDE
- **L3** (four spots on non-between items; five spots + the plant on between items): BETWEEN · BESIDE · BETWEEN · UNDER · BETWEEN · ON

Play list of 8 built per Rules: start at L1; within a level take prompts in the listed order from a random starting index (wrapping) so that two consecutive items never have the same correct spot (§13: if the next prompt would repeat the previous item's correct spot, skip to the following one). The scene never moves; only the prompt, the plant and the between spot change. Between-items always show the plant with `ANIM.appear` before the prompt icon; leaving a between-item fades both.

Worked example: item 1 IN — taps the mouse then the IN spot, the mouse disappears to its waist behind the front panel, praise · item 2 ON first-try → L2 · item 3 BESIDE — taps UNDER: the mouse sits under the crate, then the hint arrow appears at the left side pointing at the crate and the side wall lights; the mouse returns; taps BESIDE (helped) → L1 · item 4 UNDER first-try · item 5 IN first-try → L2 · item 6 BESIDE first-try · item 7 ON first-try → L3 · item 8 BETWEEN — the plant appears; taps the between spot first-try · Finish shows eight small icons.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong placement on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, cat `ANIM.peek`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, mouse returns after 900 ms, next icon.
- What happens on a wrong answer (per anticipated mistake):
  - ON placed for IN, or IN for ON (in/on confused): mouse `ANIM.nudge`, `tone("nudge")`, `ART.hintArrow` at the correct spot with `ANIM.bob`, bubble `ANIM.pulse`, the crate's front panel `ANIM.pulse` (for IN) or the crate's top edge — the whole crate — `ANIM.pulse` (for ON); mouse returns to the mat.
  - IN placed for UNDER (under = "low inside"): nudge, tone, hint arrow pointing up into the gap, both feet `ANIM.pulse`; mouse returns.
  - UNDER or BETWEEN placed for BESIDE (beside = "near"): nudge, tone, hint arrow at the beside spot, `ART.sideGlow` on the crate's left wall for 900 ms; mouse returns.
  - BESIDE placed for BETWEEN (one neighbour only): nudge, tone, hint arrow into the gap, crate and plant `ANIM.pulse` together; mouse returns.
  - Any other wrong spot: nudge, tone, hint arrow at the correct spot, bubble pulses; mouse returns.
  - A spot tapped with no mouse selected: `ANIM.pop` on the spot; no attempt is counted.
- Retry behaviour: attempt 1 unaided → attempt 2 after the hint arrow → attempt 3 with the show-me ring on the correct spot; placing the mouse there completes the item as solved-with-help. No attempt 4. An item completed after any wrong placement does not count as first-try.
- Finish condition: 8 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Hide and Seek". No words on the play screen; the position words themselves are never displayed (declared out of scope — the icon is the prompt in every locale).

## Sound
`tone("tap")` on selecting or de-selecting the mouse; `tone("tap", 4)` when the mouse lands on a spot; `tone("correct")` on a correct placement; `tone("nudge")` on a wrong placement; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the arrow carries the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: cat, bubble, crate, all spots, the plant and the mouse tile fully visible; spots remain separate targets).
- [ ] Keyboard operable (Tab reaches the mouse tile then each spot; Enter selects the mouse, Enter on a spot places it).
- [ ] Never auto-starts.
- [ ] No losing state (8 wrong placements in a row still reach All done via the show-me ring).
- [ ] Tapping the mouse then the IN spot hides the mouse's lower half behind the crate's front panel.
- [ ] A wrong spot makes the mouse sit there briefly, then a big coral arrow bobs at the right spot and the mouse walks back to its mat.
- [ ] Placing IN when the icon shows UNDER makes the two feet pulse and the arrow point up into the gap.
- [ ] At level 2 a fourth spot appears on the ground to the left of the crate; placing there for the beside icon is correct.
- [ ] At level 3 the plant appears only on between-items, with a fifth spot in the gap; on beside-items there is no plant and no fifth spot.
- [ ] Tapping a spot before the mouse makes the spot pop and nothing else.
- [ ] Two first-try corrects in a row add a spot; a wrong placement removes one on the next item.
- [ ] The finish screen shows eight little box-and-arrow icons and no score.
- [ ] If the plant emoji is missing on the device a cactus appears instead.
- [ ] With `?sound=off` nothing is audible.
