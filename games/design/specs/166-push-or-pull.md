# 166 — Push or Pull

## Identity
- Slug: `push-or-pull`
- Subject / topic: Science / forces as observed actions — a push moves a thing AWAY from you, a pull moves it TOWARD you; the same object can be pushed or pulled
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the action picture, then tap a bin)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science scope per F-30 / F-218 / A-11: pushes and pulls as PICTURED ACTIONS only — which way the thing moves relative to the hand or foot; no force arrows as physics, no "force" word, no magnets, no gravity. Explicit physics before 8 exists only in EN, US and NL (F-30); the sort here is everyday world-knowledge (opening a drawer, kicking a ball) that every system covers.

## Learning
- Objective: Sorts pictured actions into a push bin and a pull bin by whether the object moves away from the hand or foot (push) or toward it (pull), including the same object pushed in one picture and pulled in another.
- Prerequisites: None beyond tapping. The bins carry a hand-and-arrow icon each, and every action shows its movement, so nothing is read. Nothing is spoken.
- Curriculum links: F-23 (everyday world knowledge — materials, objects and how they are used — in all 12 systems at 5-8), F-30 (science inside world-knowledge subjects at 5-8; named physics only EN/US/NL), F-218 (observational core), F-5 (near-zero game supply). US K-PS2-1 "pushes and pulls can have different strengths and directions"; England Y1-Y2 "everyday materials and how things move" (forces formally Y3); Netherlands groep 3-4 "duwen en trekken"; Germany Sachunterricht Klasse 1-2 "Bewegung — schieben und ziehen"; France GS-CP "explorer le monde des objets"; Sweden åk 1-3 "kraft och rörelse i vardagen"; Finland ympäristöoppi 1-2.
- Common misconceptions (each with this game's response; the error classes are the enacted-feedback cases of F-43 / F-61 applied to this topic):
  1. **"A push is hard and a pull is gentle" — sorting by how strong the action looks (a kicked ball is "strong", so it goes wherever the child thinks strong goes).** Response: from L1 the stream pairs strong and gentle actions on both sides (kicking a ball AND nudging a toy car are both pushes; hauling a sledge AND lifting a kite string are both pulls). A wrong bin glides the picture back and REPLAYS the movement with the arrow drawn (`ANIM.showMotion`): the object slides away from the hand (push) or toward it (pull); the correct bin's icon `ANIM.pulse`s.
  2. **"You push with your hands and pull with your hands only" (a kick, a shoulder against a door, a bicycle wheeled along are not seen as pushes).** Response: L2 uses a foot as the actor for the ball; the actor glyph in the picture changes, the arrow logic does not, and the cue draws the arrow from whichever actor is shown.
  3. **Sorting by the OBJECT, not the movement ("a door is always a push", "a trolley is always a pull").** Response: L3 shows the same object twice in a session — a door being pushed open and a door being pulled open; a drawer pushed shut and a drawer pulled open; a trolley pushed and a trolley pulled — and the cue replays the movement so the direction, not the object, is what decides.
  4. **Reading the arrow backwards (away vs toward) — confusing the arrow's direction with where the hand is.** Response: the bin icons and the picture use the SAME layout: the actor is always on the LEFT, the object on the right; a push arrow points right (away from the actor), a pull arrow points left (toward the actor). Position never flips, so the arrow reads the same way everywhere.

## How it plays
1. **Start screen**: title "Push or Pull", the bear (`ART.bear`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 10 dots (§6) at y = 28. Zone A: a floor line (`ART.floor`, a rounded bar across zone A at y = 200) with the bear at its left end (80, 168); the first action picture slides in from the right (`ANIM.slideIn`) to the centre as a `makeTile` 260 × 140 (`ART.actionCard`) at (400, 160): inside it the actor `ART.hand` at (−80, 0), the object `ART.ball` at (+40, 0), and — at L1 — `ART.moveArrow` above the object at (+40, −50) pointing right (push). When the card arrives the object plays its movement once (`ANIM.demoPush`: it slides 40 px right and back). Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 230 and x = 490. The push bin's front carries `ART.handSmall` at (−50, −14) and `ART.iconPush` (an arrow pointing right, away from the hand) at (+20, −14); the pull bin's front carries `ART.handSmall` at (−50, −14) and `ART.iconPull` (an arrow pointing left, toward the hand) at (+20, −14). Each bin has a count sub-label `ART.binCount` "0" at (0, +40). Which bin is left and which is right is decided once per session at random (§13) and never changes. No caption.
3. **Sorting**: tap the action card (it lifts, `ANIM.lift`, `tone("tap")`; tapping it also replays the movement once), then tap a bin. The card glides (`ANIM.glide`) into the bin at 50 % scale.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the tenth) gets a praise pop; the rail dot fills; the next card slides in after 400 ms.
   - **Wrong bin**: the card glides back to the centre, `tone("nudge")`; then the cue: the movement replays WITH `ART.moveArrow` drawn above the object (`ANIM.showMotion`, arrow `ANIM.appear`s first, then the object slides in the arrow's direction and back), and the correct bin's icon `ANIM.pulse`s; ≈ 1.6 s with the card disabled; then attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the card there completes the item as solved-with-help.
   - Tapping a bin with no card selected: the bin's icon does `ANIM.pop` (a harmless preview); nothing else.
4. **Items 2-10**: per Content/Rules. L1 = arrow shown on the card + movement demo on arrival; L2 = movement demo on arrival, NO arrow, foot and head actors appear; L3 = movement demo only, and the same object appears pushed and pulled.
5. **A full worked session**: item 1 hand + ball, arrow right, the ball rolls away → push ✓ · item 2 hand + sledge, arrow left, the sledge slides toward the hand → pull ✓ · item 3 hand + box, arrow right → pull ✗: the box glides back, the arrow shows and the box slides away from the hand, the push bin's icon pulses; push ✓ (retried) · item 4 hand + kite → pull ✓ · item 5 hand + trolley (push) ✓ · item 6 hand + fishing rod (pull) ✓ → step up · item 7 (L2, no arrow) foot + ball: the ball rolls away → push ✓ · item 8 (L2) hand + suitcase: it slides toward the hand → push ✗ → arrow appears pointing left, the suitcase slides toward the hand; pull ✓ · item 9 (L2) hand + door: it swings away → push ✓ → step up · item 10 (L3) hand + door: it swings toward the hand → pull ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate`; the two bins at y = 400 (x = 230 / 490) showing their final counts with the objects they received drawn as a row of 32 px copies above each bin (y = 320, 40 px apart, centred on the bin), each with a tiny `ART.moveArrow` (size 0.4) above it pointing its way — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  bear:       { kind: "emoji", value: "🐻", size: 80 },
  floor:      { kind: "shape", shape: "roundRect", w: 600, h: 16, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },
  actionCard: { kind: "shape", shape: "roundRect", w: 260, h: 140, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  // actors (always drawn on the LEFT of the object)
  hand:       { kind: "emoji", value: "🖐️", size: 64 },
  foot:       { kind: "emoji", value: "🦶", size: 64, fallback: "🖐️" },       // Unicode 11 → hand
  head:       { kind: "emoji", value: "🐻", size: 64 },                        // the bear pushes with its shoulder/head
  // objects
  ball:       { kind: "emoji", value: "⚽", size: 64 },
  toyCar:     { kind: "emoji", value: "🚗", size: 64 },
  box:        { kind: "emoji", value: "📦", size: 64 },
  trolley:    { kind: "emoji", value: "🛒", size: 64 },
  door:       { kind: "emoji", value: "🚪", size: 64 },
  bike:       { kind: "emoji", value: "🚲", size: 64 },
  swing:      { kind: "shape", shape: "roundRect", w: 44, h: 12, fill: "structure", radius: 4 },   // a swing seat; two ART.rope lines rise from its ends
  rope:       { kind: "shape", shape: "line", w: 60, stroke: "inkSoft", strokeWidth: 3 },          // vertical, from the seat up to the card's top edge
  sledge:     { kind: "emoji", value: "🛷", size: 64, fallback: "🛒" },        // Unicode 11 → trolley
  kite:       { kind: "emoji", value: "🪁", size: 64, fallback: "🎈" },        // Unicode 12 → balloon (on a string)
  fishingRod: { kind: "emoji", value: "🎣", size: 64 },
  suitcase:   { kind: "emoji", value: "🧳", size: 64, fallback: "📦" },        // Unicode 11 → box
  drawer:     { kind: "emoji", value: "🗄️", size: 64 },                        // Unicode 7
  dogLead:    { kind: "emoji", value: "🐕", size: 64 },                        // a dog on a lead, pulled along; ART.leash joins hand and dog
  leash:      { kind: "shape", shape: "line", w: 80, stroke: "inkSoft", strokeWidth: 3 },
  // movement arrow (on the card at L1 and during every cue)
  moveArrow:  { kind: "shape", shape: "polygon", points: [[-30,-8],[10,-8],[10,-20],[34,0],[10,20],[10,8],[-30,8]], fill: "accent" },   // points right; scaleX −1 to point left
  // bins and rule icons
  bin:        { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  handSmall:  { kind: "emoji", value: "🖐️", size: 32 },
  iconPush:   { kind: "shape", shape: "polygon", points: [[-24,-6],[8,-6],[8,-16],[28,0],[8,16],[8,6],[-24,6]], fill: "structure" },   // arrow away from the hand (right)
  iconPull:   { kind: "shape", shape: "polygon", points: [[24,-6],[-8,-6],[-8,-16],[-28,0],[-8,16],[-8,6],[24,6]], fill: "structure" },   // arrow toward the hand (left)
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one object unambiguously in English (the key is the intended word). Four glyphs are newer than Unicode 12 or 11-era and carry fallbacks (foot → hand; sledge → trolley; kite → balloon; suitcase → box). Colour-blind safety: the two bins share tokens and differ by the arrow's DIRECTION beside the same hand glyph and by position; the movement arrow is a shape that also animates.

## Animation registry
```js
const ANIM = {
  slideIn:    { x: 400, duration: 320, ease: "Sine.Out", trigger: "new action card from x = 800 to the centre" },
  lift:       { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "card to bin (scale 0.5) / back to centre (x,y,scale set at call)" },
  demoPush:   { x: "+=40", duration: 320, ease: "Sine.InOut", yoyo: true, trigger: "the object slides AWAY from the actor and back (on arrival, on select, and during the cue)" },
  demoPull:   { x: "-=40", duration: 320, ease: "Sine.InOut", yoyo: true, trigger: "the object slides TOWARD the actor and back" },
  swingPush:  { angle: -22, duration: 320, ease: "Sine.InOut", yoyo: true, trigger: "the swing seat and ropes rotate about the card's top edge away from the actor" },
  showMotion: { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "moveArrow appears above the object (from alpha 0, scale 0.5), then demoPush / demoPull / swingPush plays, then the arrow fades after 900 ms (L2/L3 only; at L1 the arrow stays)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct card; bin icon preview tap" },
  pulse:      { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's hand + arrow icon after the replay" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "the arrow during a cue; the new card's contents (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                   ┌──────────────────────────┐                │
      │  bear (80,168)    │ [hand]      →   [ball]   │ card (400,160) │  zone A
      │                   │ (−80,0)   arrow  (+40,0) │ 260×140        │
      │ ═════════════ floor y=200 ═══════════════════════════════════ │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌─────────────┐              ┌─────────────┐  bins y=390 │
      │      │ hand  →     │              │ hand  ←     │  x=230/490  │  zone B
      │      │      0      │              │      0      │  (200×120)  │
      │      └─────────────┘              └─────────────┘             │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(The arrows in the diagram stand for `ART.iconPush` / `ART.iconPull` on the bins and `ART.moveArrow` on the card.) Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`.
- `ART.bear` (80, 168); `ART.floor` centred (400, 200).
- The action card: a `makeTile` 260 × 140 (`ART.actionCard` tokens) at (400, 160); children: the actor glyph at (−80, 0); the object at (+40, 0) (the swing: `ART.swing` at (+40, +30) with two `ART.rope`s from its ends up to (+18, −70) and (+62, −70); the dog: `ART.dogLead` at (+50, 0) with `ART.leash` from the hand's (−50, −6) to the dog's (+20, −10)); `ART.moveArrow` at (+40, −50), scaleX +1 for push, −1 for pull, visible at L1 and during cues. Selected look: `ANIM.lift` plus the library selected outline.
- Bins: `makeTile` 200 × 120 (`ART.bin` tokens) at (230, 390) and (490, 390). Push bin: `ART.handSmall` (−50, −14) + `ART.iconPush` (+20, −14). Pull bin: `ART.handSmall` (−50, −14) + `ART.iconPull` (+20, −14). `ART.binCount` at (0, +40) on both.
- `ART.showRing` around the correct bin. Tap floors: card 260 × 140, bins 200 × 120 (≥ 80). Gap between bins 60.
- Tab order: the card, then the left bin, then the right bin.
- While a cue plays (≈ 1.6 s) the card and both bins are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each item = (actor; object; movement). Movements: `push` = the object moves away from the actor (`ANIM.demoPush`, or `ANIM.swingPush` for the swing); `pull` = toward the actor (`ANIM.demoPull`). Actor keys `ART.hand` / `ART.foot` / `ART.head`; object keys as named.

- **L1** (arrow shown on the card; strong and gentle on both sides): (hand; `ART.ball`; push) · (hand; `ART.sledge`; pull) · (hand; `ART.box`; push) · (hand; `ART.kite`; pull) · (hand; `ART.trolley`; push) · (hand; `ART.fishingRod`; pull) · (hand; `ART.toyCar`; push) · (hand; `ART.dogLead`; pull)
- **L2** (no arrow; new actors; motion demo on arrival): (foot; `ART.ball`; push) · (hand; `ART.suitcase`; pull) · (hand; `ART.door`; push) · (hand; `ART.swing`; push) · (head; `ART.box`; push) · (hand; `ART.drawer`; pull) · (hand; `ART.bike`; push) · (hand; `ART.sledge`; pull)
- **L3** (no arrow; the SAME object pushed and pulled — both members of a pair appear in the session, never back to back): (hand; `ART.door`; push) · (hand; `ART.door`; pull) · (hand; `ART.trolley`; push) · (hand; `ART.trolley`; pull) · (hand; `ART.drawer`; push) · (hand; `ART.drawer`; pull) · (hand; `ART.box`; push) · (hand; `ART.box`; pull)

Play list of 10 per Rules (shuffle within level; levels in order; the first two items of a session are always one L1 push and one L1 pull so success starts high — F-40); no (actor, object, movement) triple repeats within a session; no more than two consecutive items for the same bin; the bin sides are fixed for the whole session.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three: items are quick, ~15 s each.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: card glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next card slides in after 400 ms.
- What happens on a wrong answer (each begins with the card gliding back and `tone("nudge")`):
  - Sorted by strength (a kicked ball or a shoved box put in the pull bin; a hauled sledge put in the push bin): `ANIM.showMotion` — the arrow appears and the object replays its movement in the arrow's direction; the correct bin's icon `ANIM.pulse`s.
  - Sorted by actor (a foot or the bear's head treated as "not a push"): the same replay, the arrow drawn from the actor shown.
  - Sorted by object (an L3 door/trolley/drawer/box put where its twin went): the same replay — the direction, not the object, is shown.
  - Any other wrong bin: the same replay and pulse.
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with `ART.showRing` on the correct bin; placing the card there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Push or Pull". No text on the play screen (bin counts are numerals).

## Sound
`tone("tap")` on selecting the card; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 3)` when the object slides away (push) and `tone("tap", -3)` when it slides toward the actor (pull) during any demo or replay — the pitch goes up for away and down for toward; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: floor, card, both bins visible; the object's slide stays inside the card).
- [ ] Keyboard operable (Tab: the card, then the two bins; Enter selects the card / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The first two cards of a session are one clear push and one clear pull, each with its arrow shown.
- [ ] On every card the actor is on the left and the object on the right; a push arrow points right and a pull arrow points left, on the card and on the bins alike.
- [ ] Putting the box (hand pushing) in the pull bin makes it glide back, an arrow appears pointing away from the hand, the box slides that way and back, and the push bin's icon pulses.
- [ ] At the second level no arrow is shown on arrival, but the object still slides once when the card arrives and once when it is tapped.
- [ ] At the third level the door appears once swinging away from the hand and once swinging toward it, and they go to different bins.
- [ ] Bin sides do not swap during a session; the bins have identical colours and differ only by arrow direction.
- [ ] Bin counts go up only on correct sorts; the finish screen shows the objects each bin received with tiny arrows.
- [ ] If the foot, sledge, kite or suitcase glyph is missing on the device, the listed fallback appears instead.
- [ ] With `?sound=off` nothing is audible; with sound on, a push slide sounds higher than a pull slide.
