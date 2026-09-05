# 188 — Where Is the Cat

## Identity
- Slug: `where-is-the-cat`
- Subject / topic: Mathematics / position words — in front of, behind, next to (then on, under, between) — shown as an icon, never as a word
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three scene tiles; tap the scene that matches the position icon)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1 (the hint plays on the prompt and on the tapped scene). Content is language-neutral: the prompt is an ICON (a marker placed relative to a small box with the same depth drawing as the scenes) and nothing on the play screen is written; the position WORDS are out of scope for this game. **Deliberate second position-words surface (catalogue note):** game 123 is P2 — the child PLACES the mouse in / on / under / beside / between one crate; this game is P1 — the child RECOGNISES the position among three ready-made scenes, and its core content is the depth pair **in front of / behind**, which 123 does not carry. Left/right stay in game 124. Nothing is spoken.

## Learning
- Objective: Looks at a marker-and-box icon and taps, from three scenes, the one where the cat is in that position relative to the box — in front of, behind, next to, and later on, under and between.
- Prerequisites: None beyond tapping. The first item is discoverable: the three scenes are the only tiles, and the icon bubble pulses once at the start.
- Curriculum links: F-21 ("position and direction words" in the common core of all twelve systems), F-31 row "Position words (in/on/under/left/right)" — conservative 7, earliest 5, 11 of 12 systems → 5-6 (US K.G.A.1 "describe the relative positions of objects using terms such as above, below, beside, in front of, behind, next to"; England Reception ELG / Y1 "describe position"; Germany Klasse 1 "Lagebeziehungen: vor, hinter, neben"; France GS "devant, derrière, à côté"; Netherlands groep 1-2 "voor, achter, naast"; Spain Infantil "delante, detrás, al lado"; Brazil EI03ET04; Sweden förskoleklass "framför, bakom, bredvid"; Finland esiopetus "edessä, takana, vieressä"). F-40 (cued recognition), F-43 (enacted feedback — the arrow overlay shows where the tapped cat IS), F-42 (zero text at 5-6), F-49 (tap only, tiles ≥ 80 px).
- Common misconceptions (position-word acquisition order — in/on/under before beside, before in-front/behind, before between; responses rest on F-43 and F-61), each with this game's response:
  1. **In front of / behind confused (depth read as "near the box" either way).** Response: the scenes draw depth the same way every time — a cat IN FRONT overlaps the box's front face and stands lower on the ground; a cat BEHIND shows only its head and ears above the box's top edge, the rest hidden. A wrong tap overlays that scene's own position arrow (`ART.hintArrow` at the position the tapped cat actually holds) with `ANIM.bob`, then the prompt icon pulses (`ANIM.pulse`) and, for a behind/in-front mix-up, the box's front face `ANIM.pulse`s — the face is what hides or is hidden.
  2. **"Next to" read as "anywhere near" (a cat in front of the box, slightly to the side, tapped for next to).** Response: next-to scenes put the cat on the ground touching the box's side with daylight between cat and front face; the arrow overlay on the tapped scene points at the front face (the cat is IN FRONT), and the correct scene's side wall lights (`ART.sideGlow`) for 900 ms.
  3. **"Under" read as "at the bottom of the front" (L2).** Response: the box stands on two feet with a real gap; the arrow overlay for an under-scene points up into the gap and the feet pulse.
  4. **"Between" read as "beside" — only one neighbour considered (L3).** Response: between-scenes use TWO boxes; the arrow overlay for a beside-scene points at the single box's side while the correct scene's two boxes pulse together.
  5. **Choosing by the cat's pose or by which scene "looks nicest".** Response: all three scenes in an item use the same cat glyph at the same size and the same box; only the position differs — there is nothing else to choose by.

## How it plays
1. **Start screen**: title "Where Is the Cat", the cat (`ART.cat`) at (320, 200) beside a box (`ART.boxFront` + `ART.boxTop` at (420, 210)), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: prompt = IN FRONT OF)**: rail of 8 dots (§6) at y = 28. Zone A: the prompt bubble (`ART.bubble`, 200 × 150) centred at (360, 158) holding the icon: a small box (`ART.iconBoxFront` 70 × 44 with `ART.iconBoxTop`) and the marker (`ART.marker`, a coral dot r 12 with a short `ART.markerArrow` above it) placed by the position rule in Content — for IN FRONT the marker overlaps the little box's front face, low; for BEHIND only the marker's top half shows above the little box's top edge; for NEXT TO the marker sits on the ground at the box's side. The dog (`ART.dog`) sits at (90, 170) looking at the bubble. Zone B: three scene tiles (`makeTile` 200 × 170 with `ART.sceneTile` tokens) at y = 375, x = 140 / 360 / 580; each scene draws a ground line (`ART.ground`), the box (`ART.boxFront` 110 × 70 with `ART.boxTop`, standing on `ART.foot` × 2 from L2) and the cat (`ART.cat`, 56 px) at the position in Content, with the draw order that makes depth read (Visual specification). Scenes for item 1: cat in front / cat behind / cat next to, shuffled. No caption, no words.
3. **Answering**: the child taps a scene.
   - **Correct**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the marker in the bubble glides (`ANIM.glide`) down onto the chosen scene and lands on the cat (`ANIM.land`), the dog `ANIM.wag`; `GameCore.showPraise` with the next key in rotation; the rail dot fills; after 900 ms the next item builds (scenes `ANIM.appear`, the new icon `ANIM.appear`s in the bubble). First-try.
   - **Wrong**: the tile `ANIM.nudge`s, `tone("nudge")`, de-selects and stays enabled; then the **overlay**: `ART.hintArrow` appears over the tapped scene at the position ITS cat holds (pointing at the cat: from above for in front / on / behind, from the side for next to, from below for under, from above between the two boxes for between) and bobs three times (`ANIM.bob`); the bubble's icon `ANIM.pulse`s; the position-specific part of the CORRECT scene pulses (Rules). All tiles disabled during the cue (≈ 1.6 s). Attempt 2 (the item counts as retried).
   - **Wrong on attempt 2**: the cue again, and the correct scene gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop; the marker still lands on the cat).
4. **Items 2-8**: per Content/Rules. L1 = in front / behind / next to (three scenes = the three positions); L2 adds on and under (the box on feet; each item's three scenes are the target plus its two nearest confusions); L3 adds between (two boxes) and uses mirrored next-to scenes (the cat on the left side of the box as well as the right — both are "next to").
5. **Finish**: `t("all_done")` (360, 110); the cat (320, 200) and the dog (420, 200) with `ANIM.celebrate`; the summary = the eight solved scenes drawn small (`ART.miniScene`, 70 × 56, each holding a 35 %-scale copy of its scene) in a row at y = 400 (x = 360 − 3.5 × 82 + i × 82) — the positions found, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4 minutes.

## Art registry
```js
const ART = {
  cat:          { kind: "emoji", value: "🐱", size: 56 },          // in the scenes (56) and on the start/finish screens (80 via opts.size)
  dog:          { kind: "emoji", value: "🐶", size: 64 },          // the asker beside the bubble
  bubble:       { kind: "shape", shape: "roundRect", w: 200, h: 150, fill: "surface", stroke: "line", strokeWidth: 2, radius: 20 },
  iconBoxFront: { kind: "shape", shape: "rect", w: 70, h: 44, fill: "surface2", stroke: "structure", strokeWidth: 2 },
  iconBoxTop:   { kind: "shape", shape: "polygon", points: [[-35,-22],[-21,-36],[49,-36],[35,-22]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  iconFoot:     { kind: "shape", shape: "rect", w: 10, h: 22, fill: "structure" },                  // L2-L3: two feet under the icon box
  marker:       { kind: "shape", shape: "circle", r: 12, fill: "accent", stroke: "inkOnAccent", strokeWidth: 2 },   // stands for the cat in the icon
  markerArrow:  { kind: "shape", shape: "polygon", points: [[0,10],[-8,-4],[8,-4]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // a small down-pointing head 6 px above the marker
  sceneTile:    { kind: "shape", shape: "roundRect", w: 200, h: 170, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  ground:       { kind: "shape", shape: "line", w: 3, stroke: "line", strokeWidth: 3 },           // across the scene at y = +62 (relative to the tile centre)
  boxFront:     { kind: "shape", shape: "rect", w: 110, h: 70, fill: "surface2", stroke: "structure", strokeWidth: 3 },
  boxTop:       { kind: "shape", shape: "polygon", points: [[-55,-35],[-33,-57],[77,-57],[55,-35]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  foot:         { kind: "shape", shape: "rect", w: 14, h: 30, fill: "structure" },                  // L2-L3: two feet at (−40, +50) and (+40, +50) so a gap sits under the box
  sideGlow:     { kind: "shape", shape: "rect", w: 6, h: 70, fill: "accent" },                      // lights the box's side wall (at x = +55 or −55) in a next-to cue
  hintArrow:    { kind: "shape", shape: "polygon", points: [[0,16],[-14,-6],[-6,-6],[-6,-24],[6,-24],[6,-6],[14,-6]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 2 },   // 44 px arrow; rotated per direction at call
  showRing:     { kind: "shape", shape: "roundRect", w: 212, h: 182, stroke: "structure", strokeWidth: 4, radius: 20 },
  miniScene:    { kind: "shape", shape: "roundRect", w: 70, h: 56, fill: "surface", stroke: "line", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The icon in the bubble is built from `iconBoxFront` / `iconBoxTop` / `iconFoot` and `marker` / `markerArrow` with the SAME depth rules as the scenes (a marker behind the little box is drawn before the box, so the box hides its lower half). The art upgrade replaces the cat and dog glyphs and nothing else changes.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct scene tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong scene tile" },
  glide:     { duration: 320, ease: "Sine.InOut", trigger: "the marker from the bubble to the cat in the chosen scene (x,y set at call)" },
  land:      { scale: 1.3, duration: 160, ease: "Back.Out", yoyo: true, trigger: "the marker when it reaches the cat" },
  bob:       { y: "-=10", duration: 220, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hintArrow over the tapped scene (three bobs)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the bubble icon; the box front face / feet / both boxes in the correct scene; the bubble once at item 1 start" },
  glow:      { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "sideGlow on the correct scene's box side (from alpha 0), then fades" },
  wag:       { angle: 10, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "dog on a correct tap" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scenes and the new icon (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct scene (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish cat and dog" }
};
```
No flashing: `showMe` at 1 Hz; `bob` is three gentle bobs in 1.3 s.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                     │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ┌──────────────┐                           │
      │   dog (90,170)     │   ╱▔▔▔╲      │  bubble (360,158)         │  zone A
      │                    │  │ box │ ●   │  icon: box + marker       │
      │                    └──────────────┘                           │
260   ├──────────────────────────────────────────────────────────────┤
      │  ┌─────────┐      ┌─────────┐      ┌─────────┐   y=375         │
      │  │  ╱▔▔╲   │      │ ^^╱▔▔╲  │      │  ╱▔▔╲   │   x=140/360/580 │  zone B
      │  │ │box│   │      │  │box│  │      │  │box│ c │   (200×170)     │
      │  │  c ─────│      │ ───────│      │ ────────│   c = cat        │
      │  └─────────┘      └─────────┘      └─────────┘                 │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Inside a scene (coordinates relative to the tile centre): ground at y = +62; box front centred at (0, +12) (from L2 the box is raised to (0, −4) on feet at (±40, +50)); box top above it; cat positions per Content. Between-scenes (L3) use two boxes 80 × 60 at (−52, +14) and (+52, +14) with the cat in the gap.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.dog` (90, 170); `ART.bubble` (360, 158) with the icon centred at (360, 165): `ART.iconBoxFront` at (0, +6), `ART.iconBoxTop` above it, `ART.iconFoot` × 2 at (±25, +39) from L2, `ART.marker` + `ART.markerArrow` at the icon offsets in Content.
- Scenes: `makeTile` 200 × 170 with `ART.sceneTile` tokens; children drawn in this order — `ART.ground`; then, for BEHIND, the cat; then `ART.foot` × 2 (L2-L3), `ART.boxFront`, `ART.boxTop`; then, for every other position, the cat. This order is what makes "behind" show only the head above the top edge and "in front" overlap the front face. Selected look = the library outline (`THEME.colour.structure`, 3 px) + `ANIM.pop`.
- `ART.hintArrow` drawn on top of the tapped scene, rotated to point at its cat (0° = pointing down from above; 90° = pointing left from the right side; 180° = pointing up from below); `ART.sideGlow` on the correct scene's box side; `ART.showRing` around the correct scene.
- Tap floors: scenes 200 × 170 (≥ 80); gaps 20. Tab order: the three scenes left to right; Enter picks; the bubble and dog are not focusable. Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral. Positions and their drawing (cat offsets relative to the scene tile centre; marker offsets relative to the icon box centre):

| position | cat in the scene | marker in the icon |
|---|---|---|
| IN FRONT | (0, +30), drawn after the box, overlapping the lower front face | (0, +18), drawn after the box |
| BEHIND | (0, −40), drawn BEFORE the box so only its top half shows above the box top | (0, −26), drawn before the box |
| NEXT TO | (+92, +34) on the ground touching the box's right side (L3 also (−92, +34), left) | (+52, +14) |
| ON (L2) | (0, −62) standing on the top face, drawn after the box | (0, −38) |
| UNDER (L2) | (0, +40) on the ground in the open gap between the feet, drawn after the box (the raised box leaves the gap uncovered) | (0, +30) under the icon box, between its feet |
| BETWEEN (L3) | (0, +34) in the gap between two boxes, drawn after both | (0, +14) between two icon boxes 38 × 26 at (±30, +6) |

Items as (target; the three scenes):
- **L1** (in front / behind / next to; the three scenes are always these three): (in front; in front, behind, next to) · (behind; in front, behind, next to) · (next to; in front, behind, next to) · (in front; in front, behind, next to) · (behind; in front, behind, next to)
- **L2** (adds on and under; box on feet; the two distractors are the target's nearest confusions): (on; on, behind, in front) · (under; under, in front, next to) · (in front; in front, on, under) · (behind; behind, on, next to) · (next to; next to, under, in front) · (on; on, behind, under)
- **L3** (adds between with two boxes; next-to may be mirrored to the left): (between; between, next to (left), behind) · (next to (left); next to (left), between, in front) · (behind; behind, between, on) · (between; between, next to (right), under) · (in front; in front, between, next to (left)) · (next to (right); next to (right), between, on)

Play list of 8; start at L1; shuffle within level without repeats; scene order shuffled per item; the correct scene never sits in the same slot twice running (§13); the same target never appears twice running.

Worked example: item 1 (in front) taps the behind-scene → the arrow drops onto that scene pointing at the cat's head peeking over the box, the bubble icon pulses, the correct scene's front face pulses; taps in front → helped · item 2 (behind) first-try · item 3 (next to) first-try → L2 · item 4 (under) taps the in-front-scene → the arrow points down at the cat on the front face; the correct scene's feet pulse; taps under → helped → L1 · item 5 (behind) first-try · item 6 (in front) first-try → L2 · item 7 (on) first-try · item 8 (next to) first-try → Finish shows eight little scenes.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap, the bubble `ANIM.pulse`s once; repeats every 6 s.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the marker glides from the bubble onto the cat and lands, dog `ANIM.wag`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake; each begins with `ANIM.nudge` + `tone("nudge")` and the `ART.hintArrow` overlay on the tapped scene, pointing at ITS cat, plus the bubble icon pulsing):
  - In front tapped for behind, or behind for in front: the correct scene's `ART.boxFront` pulses (the face that hides / is overlapped).
  - In front (or any) tapped for next to: `ART.sideGlow` lights the correct scene's box side for 900 ms.
  - A front-face position tapped for under (L2): the correct scene's `ART.foot`s pulse.
  - Behind (or in front) tapped for on (L2): the correct scene's `ART.boxTop` pulses.
  - Next to tapped for between (L3): both boxes in the correct scene pulse together.
- Retry behaviour: attempt 1 unaided → attempt 2 after the overlay → attempt 3 with the show-me ring on the correct scene; the ringed scene completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 8 items solved. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Where Is the Cat". No words on the play screen; no position word is ever written.

## Sound
`tone("tap")` on selecting a scene; `tone("correct")` on the right scene; `tone("nudge")` on a wrong scene; `tone("tap", 3)` when the marker lands on the cat; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the icon, the arrow and the pulsing part of the box carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the bubble, the dog and all three scenes fully visible with the cats not clipped).
- [ ] Keyboard operable (Tab cycles the three scenes; Enter picks; the bubble is not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with the item completing via the show-me ring).
- [ ] In a "behind" scene only the cat's head shows above the box; in an "in front" scene the cat overlaps the box's front; in a "next to" scene the cat stands on the ground touching the box's side.
- [ ] The icon in the bubble draws the marker with the same rule: a behind-marker is half hidden by the little box.
- [ ] Tapping the wrong scene drops a coral arrow onto THAT scene pointing at its cat, and the matching part of the correct scene pulses (front face / side / feet / top / both boxes).
- [ ] Tapping the right scene makes the marker fly from the bubble onto the cat and the dog wags.
- [ ] At the second level the box stands on feet and "on" / "under" scenes appear; at the third level two-box "between" scenes and left-side "next to" scenes appear.
- [ ] Within one item all three scenes use the same cat and the same box; only the position differs.
- [ ] Two first-try corrects in a row bring the on/under items; a wrong tap brings the three basic positions next.
- [ ] The finish screen shows the eight solved scenes drawn small and no score.
- [ ] With `?sound=off` nothing is audible.
