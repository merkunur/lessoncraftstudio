# 097 — Body Parts

## Identity
- Slug: `body-parts-map`
- Subject / topic: Science / external body parts — eyes, ears, mouth, hands, feet, arms, legs — placed where they belong on an outline figure
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (select a part icon, then a slot on the figure)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Science scope per F-23 / F-218: EXTERNAL parts only; nothing internal, nothing named aloud — the part icons and the outline figure are the whole language.

## Learning
- Objective: Places body-part icons (eyes, ear, mouth, hand, foot, arm, leg) on the right place of a neutral outline figure, including the parts that come in pairs.
- Prerequisites: None beyond tapping. The outline figure and the tray are discoverable by tapping (a wrong spot simply glides back). Nothing is read and nothing is spoken.
- Curriculum links: F-23 (human body parts and the senses in all 12 systems at 5-8), F-30 (world-knowledge subjects at 5-8), F-218, F-5. US K-LS1 / health K "identify body parts"; England Reception ELG / Y1 "identify, name, draw and label the basic parts of the human body"; Germany Sachunterricht Klasse 1 "mein Körper"; France GS/CP "le corps humain"; Spain Infantil "el cuerpo"; Brazil EI03CG / EF01CI (partes do corpo); Sweden förskoleklass; Finland esiopetus ympäristöoppi.
- Common misconceptions (F-23 mapping errors; F-42 split attention), each with this game's response:
  1. **Confusing a part with the part next to it (hand ↔ arm, foot ↔ leg, eyes ↔ mouth).** Response: a part placed on a neighbouring slot glides back; the slot it was put on shows a faint ghost of the part that belongs THERE (`ART.ghost`, the correct icon at alpha 0.35, `ANIM.ghostShow`, 900 ms) — the child learns what that spot is for without being handed the answer; on the second wrong placement of the same icon the correct slot `ANIM.pulse`s.
  2. **Not knowing that hands, feet, ears, arms and legs come in twos.** Response: when a paired part is placed on its (right-hand) slot, a mirrored twin `ANIM.twin`s into place on the figure's other side with `tone("tap", 4)` — the pair completes itself; eyes are one icon showing both eyes and sit on one slot.
  3. **Losing the figure's orientation (a foot placed on the head because "it is at the top of the tray").** Response: the figure always has a pre-drawn landmark — the nose (`ART.noseMark`) on face rounds, a full face (`ART.faceMark`) on body rounds — so up/down is never in doubt; a far-off placement (foot on the ear slot) gets the same ghost cue.
  4. **Labels floating away from the body (split attention, F-42).** Response: placed icons sit ON the figure at the anatomical spot, never in a list beside it; the finish screen shows the completed figures, not a word list.

## How it plays
1. **Start screen**: title "Body Parts", the koala (`ART.koala`) at (360, 200), Start, picker.
2. **Round 1 (L1: a face round)**: rail of 8 dots (§6) at y = 28 — one per round. Zone A/B are merged for the figure: a big head (`ART.headBig`, circle r 130) centred at (360, 230) with the nose pre-drawn (`ART.noseMark`) at (360, 240). Three dashed slots (`ART.slot`, 84 × 84) on it: the eyes slot at (360, 190), the mouth slot at (360, 300), the ear slot at (500, 230) — on the head's right edge. The koala sits at (110, 300). The tray: three tiles (`ART.trayTile`, 96 × 96) at y = 480, x = 240 / 360 / 480, holding `ART.eyes`, `ART.ear`, `ART.mouth` in shuffled order. No caption.
3. **Placing**: tap a tray icon (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap a slot; the icon glides (`ANIM.glide`) to the slot. Tapping a second tray icon before a slot switches the selection. Tapping a placed icon sends it back to the tray (undo). A full slot refuses (the arriving icon springs back, `ANIM.nudge`, no message).
   - **Correct slot**: `tone("correct")`; the icon settles with `ANIM.pop`; for a paired part (ear, hand, foot, arm, leg) a mirrored twin appears on the figure's other side (`ANIM.twin`, `tone("tap", 4)`). Round complete when every slot is filled: the whole figure `ANIM.wiggle`s (it is happy to be complete), praise pop, rail dot fills, next round after 900 ms (`ANIM.rise` clears, new figure `ANIM.appear`s).
   - **Wrong slot**: the icon glides back to the tray, `tone("nudge")`; the slot it was put on shows `ART.ghost` of ITS proper part (`ANIM.ghostShow`, 900 ms). Attempt 2 on this icon.
   - **Same icon wrong a second time**: the ghost again, then the icon's correct slot `ANIM.pulse`s three times.
   - **Third wrong placement in a round (any icons)**: every remaining icon's correct slot gains the show-me ring (`ART.showRing`, `ANIM.showMe`) matching the icon currently selected (only the selected icon's slot is ringed at a time); placing completes the round as solved-with-help.
4. **Rounds 2-8**: per Content/Rules. L1 face rounds (eyes, ear, mouth on the big head). L2 body rounds (hand, foot, leg on a full figure `ART.headSmall` + `ART.torso` + arm and leg lines, with a pre-drawn face; slots: hand (490, 262), foot (405, 384), leg (390, 290)). L3 body rounds with four slots (hand, foot, arm at (420, 172), leg) and a four-tile tray.
5. **A full worked session**: round 1 (face) eyes ✓ mouth ✓ ear ✓ (a second ear appears on the left) → wiggle · round 2 (face) mouth placed on the eyes slot ✗ → glides back; a faint pair of eyes shows on that slot; then mouth ✓ eyes ✓ ear ✓ · round 3 (face) ✓✓✓ · round 4 (face) ✓✓✓ → step up · round 5 (body: hand, foot, leg) hand ✓ (twin hand) foot placed on the leg slot ✗ → ghost leg shows there; foot ✓ leg ✓ · round 6 (body) ✓✓✓ · round 7 (body) ✓✓✓ → step up · round 8 (body, four slots: hand, foot, arm, leg) arm placed on the hand slot ✗ → ghost hand; arm ✓ hand ✓ leg ✓ foot ✓ → wiggle → Finish.
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = a small complete figure (`ART.miniFigure`, 40 × 70, all parts drawn at size 14) for each round in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  koala:     { kind: "emoji", value: "🐨", size: 72 },
  // the neutral figure — shapes only, never a person emoji
  headBig:   { kind: "shape", shape: "circle", r: 130, fill: "surface", stroke: "structure", strokeWidth: 4 },
  noseMark:  { kind: "shape", shape: "polygon", points: [[0,-16],[10,12],[-10,12]], stroke: "structure", strokeWidth: 3 },          // a small nose outline, the face's landmark
  headSmall: { kind: "shape", shape: "circle", r: 34, fill: "surface", stroke: "structure", strokeWidth: 4 },
  faceMark:  { kind: "shape", shape: "arc", r: 12, stroke: "structure", strokeWidth: 3 },                                            // a smile arc at (0,+10) plus two ART.eyeDot at (−10,−6) and (10,−6)
  eyeDot:    { kind: "shape", shape: "circle", r: 3, fill: "structure" },
  torso:     { kind: "shape", shape: "roundRect", w: 80, h: 110, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 24 },
  limb:      { kind: "shape", shape: "line", w: 118, stroke: "structure", strokeWidth: 10 },                                        // arms and legs; endpoints set per limb (Visual specification)
  slot:      { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 42 },     // round dashed slot: lineDash [8,6]
  trayTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  // part icons (external parts only)
  eyes:      { kind: "emoji", value: "👀", size: 56 },
  ear:       { kind: "emoji", value: "👂", size: 56 },
  mouth:     { kind: "emoji", value: "👄", size: 56 },
  hand:      { kind: "emoji", value: "✋", size: 56 },
  foot:      { kind: "emoji", value: "🦶", size: 56 },                                                                              // Unicode 11
  arm:       { kind: "emoji", value: "💪", size: 56 },
  leg:       { kind: "emoji", value: "🦵", size: 56 },                                                                              // Unicode 11
  // cues
  ghost:     { kind: "shape", shape: "circle", r: 30, fill: "structureSoft" },                                                      // drawn under a faint (alpha 0.35) copy of the slot's proper icon at size 44
  showRing:  { kind: "shape", shape: "circle", r: 50, stroke: "structure", strokeWidth: 4 },
  miniFigure:{ kind: "shape", shape: "roundRect", w: 40, h: 70, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 12 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every part icon names one external body part unambiguously in English (the key is the intended word); the figure itself is drawn from shapes so no skin tone, age or gender is implied. No emoji newer than Unicode 12; no fallback needed. Colour-blind safety: slots are dashed rings on a white figure; the placed state is a solid icon; the ghost is faint AND ringed.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray icon selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "icon to slot / back to tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement (slot full)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "icon settles on its correct slot" },
  twin:      { alpha: 1, scale: 1, duration: 300, ease: "Back.Out", trigger: "mirrored copy of a paired part on the figure's other side (from alpha 0, scale 0.4, scaleX −1)" },
  ghostShow: { alpha: 0.35, duration: 250, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "ghost + faint proper icon on the slot that was tapped (from alpha 0), hold, fade" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct slot after the same icon's second wrong placement" },
  wiggle:    { angle: 4, duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the whole figure container when a round completes" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "clearing the figure before the next round" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new figure and tray (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the selected icon's correct slot (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```

## Screen layout
Face round (L1):
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ╭──── headBig (360,230) r130 ────╮         │
      │                    │      (eyes slot 360,190)       │         │
      │   koala            │        nose (360,240)     (ear slot 500,230)  zones A+B
      │  (110,300)         │      (mouth slot 360,300)      │         │
      │                    ╰────────────────────────────────╯         │
      │        [ eyes ]        [ mouth ]        [ ear ]   tray y=480  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Body round (L2, L3): `ART.headSmall` at (360, 100) with `ART.faceMark`; `ART.torso` at (360, 190); arms as `ART.limb` from (400, 145) to (470, 240) and from (320, 145) to (250, 240); legs from (378, 245) to (405, 350) and from (342, 245) to (315, 350). Slots: hand (490, 262), foot (405, 384), leg (390, 290), arm (420, 172) — pairwise ≥ 92 px apart. Twins appear at hand (230, 262), foot (315, 384), leg (330, 290), arm (300, 172). Tray at y = 480: three tiles x = 240 / 360 / 480; four tiles x = 180 / 300 / 420 / 540. Fixed layout, FIT scaling; the tray sits in zone C because the figure needs the height.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull` per completed round.
- Face rounds: `ART.headBig` centred (360, 230); `ART.noseMark` at (360, 240); slots per the diagram. Body rounds: `ART.headSmall` (360, 100) with `ART.faceMark` (smile arc at (360, 110), `ART.eyeDot`s at (350, 94) and (370, 94)); `ART.torso` (360, 190); four `ART.limb`s with the endpoints above; slots per the diagram — only this round's slots are drawn.
- Slots: `makeTile` 84 × 84 with `ART.slot` tokens, dashed (graphics lineDash [8, 6]); a filled slot shows the icon at size 56 and a solid `THEME.colour.structure` 3 px ring. A twin is a plain drawn copy (not a tile) with scaleX −1.
- Tray: `makeTile` 96 × 96 with `ART.trayTile` tokens; icon centred at size 56.
- `ART.koala` at (110, 300) on face rounds and (110, 230) on body rounds. `ART.ghost` + the faint proper icon at a tapped slot's centre; `ART.showRing` around a slot.
- Tap floors: tray 96, slots 84 (≥ 80). Slot centres ≥ 92 px apart on every round (gap ≥ 8 between 84-px slots; tray gap 24).
- Tab order: tray tiles left to right, then the slots top to bottom, left to right.
- During a cue (≈ 1.2 s) the tray and slots are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each round = (figure; parts asked). Part words map to ART keys of the same name: eyes `ART.eyes`, ear `ART.ear`, mouth `ART.mouth`, hand `ART.hand`, foot `ART.foot`, arm `ART.arm`, leg `ART.leg`. Paired parts (a twin appears): ear, hand, foot, arm, leg.

- **L1** (face; three slots): (face; eyes, ear, mouth) × 4 rounds with different tray orders — the same three parts four times is deliberate (F-41).
- **L2** (body; three slots): (body; hand, foot, leg) · (body; hand, foot, arm) · (body; arm, leg, foot) · (body; hand, arm, leg)
- **L3** (body; four slots, four-tile tray): (body; hand, foot, arm, leg) × 3 rounds with different tray orders.

Play list of 8 rounds per Rules; tray order shuffled per round; the first round of a session is always L1.

## Rules
- Item count: 8 rounds (3-4 placements each, 26 placements at most ≈ 5 minutes).
- Difficulty progression: 2 consecutive rounds completed with no wrong placement → next level (cap L3).
- Adaptation: 2 wrong placements within one round, or a wrong placement in each of 2 consecutive rounds → next round one level down (floor L1).
- What happens on a correct answer: `tone("correct")`, `ANIM.pop` on the placed icon, `ANIM.twin` + `tone("tap", 4)` for a paired part; on the round's last placement the figure `ANIM.wiggle`s, praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rounds with no wrong placement only), rail dot fills, next round after 900 ms.
- What happens on a wrong answer (each begins with the icon gliding back and `tone("nudge")`):
  - Neighbour confusion (hand on the arm slot, foot on the leg slot, eyes on the mouth slot or the reverse): `ART.ghost` + the faint proper icon on the tapped slot (`ANIM.ghostShow`).
  - Far-off placement (foot on the ear slot, ear on the hand slot): the same ghost cue — the tapped slot shows what belongs there.
  - The same icon wrong twice: the ghost again, then its correct slot `ANIM.pulse`s.
  - An icon placed on a full slot: refused, `ANIM.nudge`, not an attempt.
- Retry behaviour: per round — wrong placement 1 → ghost → wrong placement 2 of the same icon → ghost + pulse → third wrong placement in the round → `ART.showRing` on the selected icon's correct slot; the round completes as solved-with-help. Undo is free.
- Finish condition: 8 rounds complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Body Parts". No words on the play screen.

## Sound
`tone("tap")` on selecting an icon or undoing; `tone("correct")` on a correct placement; `tone("tap", 4)` when a twin appears; `tone("nudge")` on a wrong slot; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the big head with its three slots, and the full figure with four slots and a four-tile tray, fully visible).
- [ ] Keyboard operable (Tab: tray tiles left to right, then slots top to bottom; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong placements still completes the figure; the show-me ring appears on the third).
- [ ] The figure is an outline of shapes with no skin colour, hair or clothes; the face round shows a nose, the body round a small face.
- [ ] Placing the ear on the right of the head makes a second ear appear on the left; placing the hand makes a second hand appear on the other arm.
- [ ] Putting the mouth on the eyes slot sends it back and shows a faint pair of eyes on that slot for a moment.
- [ ] Putting the same icon in the wrong place twice makes its correct slot pulse.
- [ ] Only this round's slots are drawn; slot centres are never closer than 92 px.
- [ ] Two clean rounds in a row bring the full-body figure, then four slots; two wrong placements in a round bring the face again.
- [ ] The finish screen shows one small completed figure per round and no score.
- [ ] With `?sound=off` nothing is audible.
