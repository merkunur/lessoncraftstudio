# 164 — Hot or Cold

## Identity
- Slug: `hot-or-cold-thermometer`
- Subject / topic: Science / temperature and the thermometer — a higher column means warmer; a pictured scene belongs to one band of the °C scale (freezing, cold, room, hot)
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (+/− stepper moves the column) with a Check
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper form). Science scope per F-218 / A-11: reading and setting a drawn thermometer against what a scene looks like; no heat theory, no weather causes. Units per §14: degrees Celsius everywhere; the scale carries band ICONS so the numerals are a support, never the only cue.

## Learning
- Objective: Sets a drawn thermometer's column, by stepping it up and down, into the temperature band that matches a pictured scene (a snowman → below 0 °C; a rainy day with a scarf → 5-10 °C; an indoor room → 15-25 °C; a beach in the sun → 30-40 °C).
- Prerequisites: Reads numerals to 40 (helpful, not required — the bands carry icons); knows hot from cold in everyday life.
- Curriculum links: F-23 (seasons and weather as observable patterns; everyday materials and the world — all 12 systems at 5-8), F-31 row "Seasons/weather" (conservative 7 → 6-8) and row "Length with units" (measurement with a scale at 6-8, metric), F-30, F-218, F-5. US K-ESS2-1 / 2-ESS (weather observations; temperature as a measurement) and 2.MD (measurement tools); England Y1 "observe changes across the four seasons; weather"; Germany Sachunterricht Klasse 1-2 "Wetter messen — Thermometer"; France CP-CE1 "le thermomètre, températures"; Netherlands groep 3-4 "weer meten"; Spain 1º ciclo "el tiempo atmosférico"; Brazil EF02CI (tempo e clima); Sweden åk 1-3 "väder; mätning"; Finland ympäristöoppi 1-2 "sää ja lämpötila".
- Common misconceptions (F-135, F-114, F-103), each with this game's response:
  1. **"Warm means the top" — the column is pushed to 40 for an indoor room, or to the very bottom for any cool day (bigger = more, F-103).** Response: on Check the scene's band icon (`ART.iconHouse` for the room) appears ON the scale at the middle of its band (`ANIM.iconOnScale`) and the band strip (`ART.bandHi`) highlights behind the tube from 15 to 25; the column stays where the child left it, so the gap between the column and the strip IS the feedback. The child steps toward the strip and checks again.
  2. **"Cold means below zero" — a rainy autumn day is set to −10.** Response: L3 separates cold (5-10, `ART.iconCoat`) from freezing (−10 to 0, `ART.iconSnow`); the coat icon appears on the scale at 7.5 and the freezing strip stays plain, so the child sees that cool is above the snowflake.
  3. **Counting ticks instead of intervals / overshooting by one step (F-114).** Response: the scale is stepped in 5 °C with a numeral every 10; on a second wrong Check the two numerals bounding the target band `ANIM.pulse` and the band strip stays lit; a Check one step outside the band is still "not yet" — the icon shows exactly where the band is.
  4. **Reading the scene by season name instead of by what it shows (hemisphere and climate trap, F-135).** Response: no scene is a season; every scene is a THING that shows temperature (a snowman, ice cubes, a scarf and umbrella, a bed indoors, a beach, a desert), and the cue always names the band by its icon, never by a season word. Snow is never the only cold cue (a scarf and rain are cool cues; ice cubes are a freezing cue).

## How it plays
1. **Start screen**: title "Hot or Cold", the polar-blue penguin (`ART.penguin`) at (360, 200), Start, picker.
2. **Item 1 (L1: snowman → freezing)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A (left): the scene card (`ART.sceneCard`, 220 × 170) centred at (190, 160) showing `ART.snowman` at size 96 with two `ART.flake`s at its top corners; the penguin at (60, 250). Right side, spanning zones A and B: the thermometer — `ART.tube` (44 × 330, rounded) centred at (540, 235) with `ART.bulb` (r 32) at (540, 420); the column (`ART.column`) rises from the bulb to the current value; `ART.tick`s every 5 °C from −10 (y = 385) to 40 (y = 85), 30 px apart, with `ART.tickLabel` numerals −10, 0, 10, 20, 30, 40 at x = 590; band icons at x = 486 beside the tube: `ART.iconSnow` at the −5 mark (y = 355), `ART.iconCoat` at 7.5 (y = 280), `ART.iconHouse` at 20 (y = 205), `ART.iconSun` at 35 (y = 115). The column starts at a random step outside the target band and at least two steps from its edge (Content). Zone B (left): the stepper — a big minus tile (`ART.stepTile` with `ART.minus`) at (130, 380), the value display (`ART.valueCard`, 110 × 96, showing the value as a numeral + "°C" at 36 px) at (250, 380), a big plus tile (`ART.stepTile` with `ART.plus`) at (370, 380). Zone C: Check (`makeButton ok`) at (300, 510), enabled from the start.
3. **Setting**: tap + or −; the value changes by 5 (range −10 to 40, clamped; `tone("tap", k)` where k = the step index 0-10 so the pitch tracks the height), the display updates and the column `ANIM.columnTo`s its new height. The band strip and icons do not react while stepping (the scale is "quiet" until Check — the predict-then-check discipline of F-40/F-46).
4. **Check**: tap OK.
   - **In the band**: the column `ANIM.lock`s (a short pop of the tube), `tone("correct")`, praise pop; a copy of the scene's band icon glides from the scene card to the scale at the band's middle (`ANIM.iconOnScale`) and the band strip lights (`ART.bandHi`); the penguin `ANIM.nod`s; rail dot; next item after 900 ms (`ANIM.appear` for the new scene; the column re-starts per Content).
   - **Outside the band**: the band icon glides onto the scale at the band's middle and the strip lights; the column stays; `tone("nudge")`. Attempt 2 — the child steps and checks again.
   - **Second wrong Check**: the same, plus the two `ART.tickLabel`s bounding the band `ANIM.pulse` twice; the +/− tile that leads toward the band gains the show-me ring (`ART.showRing`, `ANIM.showMe`) until the column enters the band; the next in-band Check completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 = freezing vs hot only (two far-apart bands); L2 adds the room band; L3 adds the cold band (four bands) and subtler scenes (a scarf and umbrella; a bed; ice cubes in a glass).
6. **A full worked session**: item 1 snowman, column starts at 25 → − − − − − → −10 ✓ (any of −10, −5, 0) · item 2 beach, starts at 0 → + + + + + + → 30 ✓ · item 3 desert, starts at 10 → + + → 20, Check ✗: the sun icon glides onto the scale at 35 and the 30-40 strip lights; + + + → 35 ✓ (retried) · item 4 ice cubes ✓ → step up · item 5 (L2) bed indoors, starts at 40 → − → 35, Check ✗: the house icon lands at 20, the 15-25 strip lights · − − − → 20 ✓ · item 6 (L2) skier ✓ · item 7 (L2) sofa ✓ → step up · item 8 (L3) scarf and umbrella, starts at 25 → − − − − − − − → −10, Check ✗: the coat icon lands at 7.5, the 5-10 strip lights; + + + → 5 ✓ · item 9 (L3) palm beach ✓ · item 10 (L3) gloves ✓ → Finish.
7. **Finish**: `t("all_done")` (360, 110); the penguin (360, 200) `ANIM.celebrate`; the summary = one tall thermometer (`ART.tube` at 70 %) at (360, 380) with the ten scenes' icons (size 26) parked beside the scale at their band heights, left and right alternately — the day's scenes sorted by warmth; `t("question_x_of_y")` at (360, 470) with n = first-Check items, total 10; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  penguin:    { kind: "emoji", value: "🐧", size: 80 },
  sceneCard:  { kind: "shape", shape: "roundRect", w: 220, h: 170, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  // scenes — freezing
  snowman:    { kind: "emoji", value: "⛄", size: 96 },
  flake:      { kind: "emoji", value: "❄️", size: 30 },                                  // decorates the snowman card corners
  iceCubes:   { kind: "emoji", value: "🧊", size: 96, fallback: "❄️" },                  // Unicode 13 → snowflake
  skier:      { kind: "emoji", value: "⛷️", size: 96 },
  snowMount:  { kind: "emoji", value: "🏔️", size: 96 },                                  // Unicode 7
  // scenes — cold
  scarf:      { kind: "emoji", value: "🧣", size: 96 },                                  // Unicode 9
  umbrella:   { kind: "emoji", value: "☔", size: 96 },
  gloves:     { kind: "emoji", value: "🧤", size: 96 },                                  // Unicode 9
  leaves:     { kind: "emoji", value: "🍂", size: 96 },
  // scenes — room (indoors)
  bed:        { kind: "emoji", value: "🛏️", size: 96 },                                  // Unicode 7
  sofa:       { kind: "emoji", value: "🛋️", size: 96 },                                  // Unicode 9
  books:      { kind: "emoji", value: "📚", size: 96 },
  house:      { kind: "emoji", value: "🏠", size: 96 },
  // scenes — hot
  beach:      { kind: "emoji", value: "🏖️", size: 96 },                                  // Unicode 7
  desert:     { kind: "emoji", value: "🏜️", size: 96, fallback: "🌵" },                   // Unicode 7
  palm:       { kind: "emoji", value: "🌴", size: 96 },
  iceCream:   { kind: "emoji", value: "🍦", size: 96 },                                  // melting on a hot day: paired with ART.sunSmall on the card
  sunSmall:   { kind: "emoji", value: "☀️", size: 30 },
  // thermometer
  tube:       { kind: "shape", shape: "roundRect", w: 44, h: 330, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 22 },
  bulb:       { kind: "shape", shape: "circle", r: 32, fill: "accent", stroke: "structure", strokeWidth: 3 },
  column:     { kind: "shape", shape: "rect", w: 20, h: 10, fill: "accent" },              // height set at runtime: from the bulb centre up to the value's y
  tick:       { kind: "shape", shape: "line", w: 16, stroke: "structure", strokeWidth: 2 }, // horizontal, at each 5 °C
  tickLabel:  { kind: "text",  value: "", size: 20, font: "display", color: "ink" },
  bandHi:     { kind: "shape", shape: "roundRect", w: 64, h: 60, fill: "structureSoft", radius: 10 },   // behind the tube across the target band; h = band span in px
  // band icons (on the scale; the cue glides a copy from the scene card)
  iconSnow:   { kind: "emoji", value: "❄️", size: 32 },
  iconCoat:   { kind: "emoji", value: "🧥", size: 32 },                                  // Unicode 9
  iconHouse:  { kind: "emoji", value: "🏠", size: 32 },
  iconSun:    { kind: "emoji", value: "☀️", size: 32 },
  // stepper
  stepTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  minus:      { kind: "text",  value: "−", size: 56, font: "display", color: "structure" },
  plus:       { kind: "text",  value: "+", size: 56, font: "display", color: "structure" },
  valueCard:  { kind: "shape", shape: "roundRect", w: 110, h: 96, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 14 },   // value "20 °C" 36 px display inkOnAccent
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every scene emoji names one thing unambiguously in English (the key is the intended word). Two glyphs carry fallbacks (ice cubes → snowflake; desert → cactus). Colour-blind safety: the column is read by HEIGHT against ticks and icons, never by colour; the band strip is a shape behind the tube AND the icon lands on it; the four band icons differ by shape.

## Animation registry
```js
const ANIM = {
  columnTo:    { duration: 180, ease: "Sine.Out", trigger: "column height to the new value on each step (scaleY / h set at call)" },
  lock:        { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "tube on an in-band Check" },
  iconOnScale: { duration: 500, ease: "Sine.InOut", trigger: "a copy of the scene's band icon glides from the scene card centre to (486, bandMidY); then bandHi fades in behind the tube (alpha 0 → 1 over 200 ms)" },
  pulse:       { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the two tickLabels bounding the target band after a second wrong Check" },
  nod:         { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "penguin on an in-band Check" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the +/− tile that leads toward the band (from alpha 0.2)" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene on the card (from alpha 0, scale 0.6); the bandHi and icon are cleared first" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish penguin" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   ┌──────────────┐                        (sun)  ║ ║  40  y=85│
      │   │  ART.snowman │ scene card (190,160)          ║ ║  30      │  zone A
      │   │              │ 220×170                (house)║ ║  20  y=205
      │   └──────────────┘                               ║ ║  10      │
260   ├───── penguin (60,250) ───────────────────(coat)──║ ║──────────┤
      │   [ − ]     [ 20 °C ]     [ + ]   y=380   (snow) ║ ║   0      │  zone B
      │  x=130       x=250       x=370               −10 ║ ║  y=385   │
      │                                                  (● bulb 540,420)
480   ├──────────────────────────────────────────────────────────────┤
      │              [   OK   ] (300,510)                            │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Tube x = 540; value y = 385 − (value + 10) / 5 × 30, so −10 → 385, 0 → 325, 20 → 205, 40 → 85. Band icons at x = 486; numerals at x = 590. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sceneCard` centred (190, 160); the scene glyph centred on it at size 96; for `ART.snowman` two `ART.flake`s at (+80, −60) and (−80, −60); for `ART.iceCream` one `ART.sunSmall` at (+80, −60). `ART.penguin` at (60, 250).
- Thermometer: `ART.tube` centred (540, 235); `ART.bulb` at (540, 420); `ART.column` drawn from y = 420 up to the value's y (width 20, centred on x = 540); `ART.tick` at every 5 °C from y = 385 to y = 85 (30 px apart) centred on x = 540, drawn 24 px wide at the 10s; `ART.tickLabel` at x = 590 for −10, 0, 10, 20, 30, 40; band icons at x = 486: `ART.iconSnow` y = 355, `ART.iconCoat` y = 280, `ART.iconHouse` y = 205, `ART.iconSun` y = 115 (always visible, alpha 0.55; the cue's gliding copy lands on top at alpha 1).
- `ART.bandHi` centred on the tube's x across the target band: freezing y = 325-385 (h 60, centre 355), cold y = 265-295 (h 30 centre 280 — drawn 40 tall for legibility), room y = 175-235 (h 60, centre 205), hot y = 85-145 (h 60, centre 115); alpha 0 until a Check.
- Stepper: `makeTile` 96 × 96 (`ART.stepTile`) with `ART.minus` / `ART.plus` at (130, 380) / (370, 380); `ART.valueCard` at (250, 380) with the value text in `THEME.font.display` 36 px `THEME.colour.inkOnAccent` ("20 °C" — the numeral, a space, the degree sign and C); `ART.showRing` around a step tile. Check `makeButton` `ok` at (300, 510).
- Keyboard: arrows Up/Right = +5, Down/Left = −5 (P9 rule), Enter checks; Tab also reaches −, +, OK.
- Tap floors 96 ≥ 56; gaps 24. Text: the value card is designed for "−10 °C" at 36 px (≈ 100 px wide) — the widest value.

## Content
Language-neutral except the °C suffix, which is identical in all 11 locales (§14 metric). Items as (scene ART key; target band; the band's range; start value rule). Bands: F = freezing (−10, −5, 0), C = cold (5, 10), R = room (15, 20, 25), H = hot (30, 35, 40). Start value: a random scale step OUTSIDE the target band and at least two steps (10 °C) from its nearest edge; never the same start value twice running.
- **L1** (freezing vs hot): (`ART.snowman`; F) · (`ART.beach`; H) · (`ART.desert`; H) · (`ART.iceCubes`; F) · (`ART.skier`; F) · (`ART.palm`; H)
- **L2** (adds the room band): (`ART.bed`; R) · (`ART.sofa`; R) · (`ART.books`; R) · (`ART.house`; R) · (`ART.snowMount`; F) · (`ART.iceCream`; H) · (`ART.snowman`; F) · (`ART.beach`; H)
- **L3** (adds the cold band; four bands): (`ART.scarf`; C) · (`ART.umbrella`; C) · (`ART.gloves`; C) · (`ART.leaves`; C) · (`ART.iceCubes`; F) · (`ART.sofa`; R) · (`ART.palm`; H) · (`ART.bed`; R)

Band icon per band: F → `ART.iconSnow`, C → `ART.iconCoat`, R → `ART.iconHouse`, H → `ART.iconSun`. Play list of 10 per Rules (shuffle within level, levels in order; the first item of a session is always an L1 freezing OR hot scene); no scene repeats within a session; no more than two consecutive items in the same band.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check successes → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.lock` on the tube, `tone("correct")`, the band icon `ANIM.iconOnScale`s and `ART.bandHi` lights, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-Check items only), penguin `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`; the column never moves by itself):
  - Column at the top for a room or cold scene ("warm = top"): `ART.iconHouse` / `ART.iconCoat` glides onto the scale at the band's middle and `ART.bandHi` lights there — the gap between the column and the strip is the information.
  - Column at the bottom for a cold (not freezing) scene ("cold = below zero"): `ART.iconCoat` lands at 7.5 and the 5-10 strip lights; the freezing icon stays dim.
  - Column one step outside the band (overshoot / tick-counting): the icon and strip as above; on the second wrong Check the two bounding `ART.tickLabel`s `ANIM.pulse`.
  - Any other value: the same mechanism — the strip shows where the band is.
- Retry behaviour: attempt 1 → attempt 2 after the icon lands → attempt 3 with `ART.showRing` on the +/− tile that leads toward the band; the next in-band Check completes the item as solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Hot or Cold"; `degrees` = "°C" (the unit suffix on the value card and the scale, identical in every locale). No other words on the play screen.

## Sound
`tone("tap", k)` on each step (k = the step index 0-10 from −10 to 40, so + raises the pitch and − lowers it); `tone("correct")` on an in-band Check; `tone("nudge")` on an out-of-band Check; `tone("tap", 6)` when the band icon lands on the scale; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 1 of 10", All done, Play again, Menu, praise change; the scale shows numerals and °C only).
- [ ] Works at narrow width (400-px iframe: scene card, stepper, the whole thermometer from bulb to 40 and OK visible).
- [ ] Keyboard operable (Up/Right adds 5, Down/Left takes 5, Enter checks; Tab reaches −, +, OK).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong Checks still ends with the column in the band via the ring on the +/− tile).
- [ ] The column moves only when + or − is tapped; the band strip and icons do not react until OK.
- [ ] With the snowman shown, checking at 20 makes the snowflake glide onto the scale beside 0 and −10 and lights a strip there; checking at −5 succeeds.
- [ ] With the bed shown, checking at 40 makes the house icon land beside 20 and lights the 15-25 strip.
- [ ] At the third level, checking −10 for the scarf makes the coat icon land between 0 and 10 and the snowflake stays dim.
- [ ] The value never goes below −10 or above 40; the display reads "−10 °C" without clipping.
- [ ] After two wrong Checks the two numerals around the band pulse and the + or − tile that leads toward it gains a ring.
- [ ] The first scene of a session is always a snow/ice scene or a sun scene, never an indoor one.
- [ ] The finish screen shows one thermometer with the ten scene icons parked at their heights and the first-try count; no score words.
- [ ] With `?sound=off` nothing is audible; with sound on, + raises the pitch and − lowers it.
