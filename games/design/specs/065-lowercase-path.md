# 065 — Lowercase Path

## Identity
- Slug: `lowercase-path`
- Subject / topic: Literacy / letter formation — tracing lowercase PRINT letters through their stroke waypoints, with a belly-side cue for b, d, p, q before the trace begins
- Age band: `5-6`
- Interaction pattern: `P7` — trace a path (drag through waypoints; tap-each-waypoint fallback always on)
- Estimated build size: ~540 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P7. Sibling: game 064 (uppercase) — same mechanic, a different letter set; the catalogue keeps them separate on purpose (formation needs both cases; the lowercase set carries the b/d/p/q problem that capitals do not). Locale note: PRINT lowercase only (F-25); the 26 basic lowercase letters are shared by all eleven languages, so the set is language-neutral; diacritic forms (ä, ø, ñ, ç …) are out of scope. No word, no sound.

## Learning
- Objective: Traces a lowercase print letter by reaching its stroke waypoints in the conventional order and direction, including the round-then-stick letters (a, d, g, q) and the stick-then-round letters (b, p), with the dot of i and j added last.
- Prerequisites: Has traced capitals (game 064) or any P7 game; recognises lowercase shapes as letters (games 006/007). No letter names required.
- Curriculum links: F-22 (letter formation is taught explicitly at 5-7 in all twelve systems), F-25 (print forms; lowercase print is the working case of early reading in every system), F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6 (US L.K.1.a "print many upper- and lowercase letters"; England Reception/Y1 "form lower-case letters in the correct direction, starting and finishing in the right place"; Germany Klasse 1 Druckschrift Kleinbuchstaben; France CP script minuscule; Spain 1º grafía; Brazil EF01LP04; Netherlands groep 3; Sweden åk 1; Finland vuosiluokka 1 tekstaus). Demand: F-1.
- Common misconceptions (F-121, F-102), each with this game's response:
  1. **b/d and p/q mirror reversals — the belly on the wrong side (developmentally normal to ~7; F-121).** Response: before the trace of b, d, p or q begins, the **belly cue** plays: the bowl part of the guide fills coral (`ART.bellyFill`) for 900 ms with `ART.bellyDot` at its centre, then the stem part glows `structure` (`ART.stemGlow`) for 600 ms — the child sees which side the belly is on before touching anything. During the trace a reversal cannot be drawn: only the next waypoint accepts a touch, and the path is fixed.
  2. **Starting the round letters (a, d, g, q, c, o) at the wrong place or going the wrong way round (clockwise).** Response: waypoint 1 of every round letter sits at the "2 o'clock" start with the `ART.startFlag`; the guide runs anticlockwise; a touch on the far side of the bowl first does nothing and after 2 s waypoint 1 pulses.
  3. **Drawing the stick first on a, d, g, q (stick-then-bowl, which produces a backwards-looking letter).** Response: the stroke order in Content puts the bowl first for a, d, g, q and the stick first for b and p; the numbered dots enforce it; the belly cue on d/q shows the bowl before the stick.
  4. **Forgetting the dot of i and j, or placing it first.** Response: i and j have a final one-point stroke (a tap on `ART.dotTarget` at the top); it is armed only after the stem completes; the letter does not complete without it, and the dot target pulses after 2 s.
  5. **Not lifting between strokes (t's crossbar drawn without lifting; the dot dragged).** Response: as in 064 — the next stroke arms only after `pointerup`; a drag that never lifts cannot reach it.

## How it plays
1. **Start screen**: title "Lowercase Path", the snail (`ART.snail`) at (360, 200), Start, picker.
2. **Item 1 (L1: l)**: rail of 8 dots (§6). Zone A left: the model letter (`ART.modelLetter`, "l", 72 px, `inkSoft`) on `ART.modelCard` at (110, 160). Centre: the letter box, 260 × 320, top-left at stage (230, 90); inside it the writing lines (`ART.lineRule`, three thin `line`-coloured horizontals at box y = 20 (ascender), 140 (x-height) and 260 (baseline) — the way school exercise books show letter height), the faint guide (`ART.guide`) through all strokes, and the waypoints of stroke 1 (`makeTile` 80 × 80, transparent, showing `ART.wayDot` + `ART.wayNumeral`; waypoint 1 with `ART.startFlag`). Right: the snail at (610, 160). The first item of a session plays `ANIM.demo` once.
3. **Belly cue (b, d, p, q only)**: before the waypoints appear, `ART.bellyFill` (the bowl's guide points drawn as a closed coral shape at alpha 0.5) and `ART.bellyDot` appear for 900 ms, then fade; then `ART.stemGlow` (the stem drawn 18 px in `structure` at alpha 0.6) for 600 ms, then fades; then the waypoints `ANIM.appear`. Nothing is tappable until the cue ends (≈ 1.7 s).
4. **Tracing**: exactly as in 064 — the pointer enters the next waypoint's tile → `ANIM.pop`, `ART.wayDone`, `tone("tap", k)`, the trail (`ART.trail`) draws itself along the guide (`ANIM.draw`); guide tails draw automatically; later waypoints are refused; 2 s idle → next waypoint `ANIM.pulse`; 6 s idle → `ART.demoDot` travels to the next waypoint (show-me). Between strokes the next stroke arms after `pointerup`. The dot of i / j is a one-waypoint stroke: reaching `ART.dotTarget` (a `makeTile` 80 × 80 with `ART.wayDot` and the numeral) completes it with `ANIM.dotLand` (scale 1.5 → 1).
5. **Letter complete**: whole trail `ANIM.set`, `tone("correct")`, praise pop (rotation, every second letter and the eighth), snail `ANIM.crawl`, model letter turns `structure` (`ART.modelDone`), rail dot fills, next letter after 700 ms. For b, d, p, q the completed letter also shows `ART.bellyDot` once more on its bowl for 600 ms — the belly side, confirmed on the child's own letter.
6. **Items 2-8**: per Content/Rules. L1 l, i, t, o, c; L2 a, n, m, u, h, e, r; L3 d, b, p, q, g, s, j.
7. **Finish**: `t("all_done")` (360, 110); the snail (360, 200) `ANIM.celebrate`; the summary = the eight traced letters in a row at y = 380 (`ART.doneLetter` 56 px on `ART.doneChip` 72 × 72), with `ART.bellyDot` drawn small on any b, d, p, q chips; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  snail:       { kind: "emoji", value: "🐌", size: 80 },
  modelCard:   { kind: "shape", shape: "roundRect", w: 120, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  modelLetter: { kind: "text",  value: "", size: 72, font: "display", color: "inkSoft" },
  modelDone:   { kind: "text",  value: "", size: 72, font: "display", color: "structure" },
  lineRule:    { kind: "shape", shape: "line", w: 260, stroke: "line", strokeWidth: 2 },
  guide:       { kind: "shape", shape: "line", w: 14, stroke: "inkSoft", strokeWidth: 14 },      // alpha 0.25
  trail:       { kind: "shape", shape: "line", w: 16, stroke: "structure", strokeWidth: 16 },     // round caps and joins
  wayDot:      { kind: "shape", shape: "circle", r: 20, fill: "surface", stroke: "structure", strokeWidth: 3 },
  wayDone:     { kind: "shape", shape: "circle", r: 20, fill: "structure", stroke: "structure", strokeWidth: 3 },
  wayNumeral:  { kind: "text",  value: "", size: 22, font: "display", color: "ink" },
  startFlag:   { kind: "shape", shape: "polygon", points: [[0,-14],[14,0],[0,14]], fill: "accent" },
  dotTarget:   { kind: "shape", shape: "circle", r: 14, fill: "surface", stroke: "accent", strokeWidth: 3 },   // the i / j dot waypoint
  bellyFill:   { kind: "shape", shape: "polygon", points: [], fill: "accent" },     // points = the bowl's guide points, closed; alpha 0.5
  bellyDot:    { kind: "shape", shape: "circle", r: 8, fill: "accent" },
  stemGlow:    { kind: "shape", shape: "line", w: 18, stroke: "structure", strokeWidth: 18 },    // alpha 0.6 along the stem's guide points
  demoDot:     { kind: "shape", shape: "circle", r: 12, fill: "accent" },
  doneChip:    { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  doneLetter:  { kind: "text",  value: "", size: 56, font: "display", color: "structure" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.2, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a waypoint reached" },
  draw:      { duration: 180, ease: "Sine.Out", trigger: "trail drawn fraction 0→1 between two waypoints (tween on {t}, redraw each update)" },
  dotLand:   { scale: 1.0, duration: 220, ease: "Back.Out", trigger: "the i / j dot from scale 1.5" },
  set:       { alpha: 0.85, duration: 150, ease: "Sine.InOut", yoyo: true, trigger: "completed stroke / letter" },
  pulse:     { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "next waypoint after 2 s idle" },
  bellyIn:   { alpha: 0.5, duration: 200, ease: "Sine.Out", yoyo: true, hold: 500, trigger: "bellyFill + bellyDot (from alpha 0), hold, then out" },
  stemIn:    { alpha: 0.6, duration: 150, ease: "Sine.Out", yoyo: true, hold: 300, trigger: "stemGlow (from alpha 0), hold, then out" },
  demo:      { duration: 1400, ease: "Sine.InOut", trigger: "demoDot along the whole guide of the first letter; 6 s idle show-me from the current waypoint to the next (duration 600)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "next stroke's waypoints; new letter (from alpha 0, scale 0.6)" },
  crawl:     { x: "+=24", duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "snail on a completed letter" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish snail" }
};
```
No `nudge`: refused touches are silent (F-61).

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
 90   │  ┌ model ┐        ┌── letter box 260×320 ──┐                  │
      │  │   d   │        │ ······· ascender 20 ···│     snail        │  zone A
      │  │(110,160)       │ ······· x-height 140 ··│    (610,160)     │
      │  └───────┘        │   (2)  bowl   (1)(3)   │                  │
260   │                   │ ······· baseline 260 ··│                  │  zone B
      │                   │         descender  320 │                  │
410   │                   └────────────────────────┘                  │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Box coordinate (x, y) = stage (230 + x, 90 + y). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.modelCard` (110, 160) with `ART.modelLetter` / `ART.modelDone`; `ART.snail` (610, 160).
- `ART.lineRule` at box y = 20, 140, 260 (stage y = 110, 230, 350) spanning the box width; the guide and trail as `Graphics` polylines (as in 064); `ART.bellyFill` as a filled polygon through the bowl's guide points; `ART.stemGlow` along the stem's guide points; `ART.bellyDot` at the bowl centre (Content gives it per letter).
- Waypoints: `makeTile` 80 × 80, fill/stroke `THEME.colour.bg` (invisible), containing `ART.wayDot` + `ART.wayNumeral` (numeral `THEME.colour.bg` once done); waypoint 1 with `ART.startFlag` at (−34, −34); the i / j dot stroke uses `ART.dotTarget` in place of `wayDot`.
- Every two waypoints of one stroke are ≥ 85 px apart (Content) so 80-px tiles do not overlap; the tap floor 80 holds.
- Pointer handling and Tab order exactly as in 064.

## Content
Language-neutral: the 26 print lowercase letters. Box units 0-260 × 0-320; writing lines at y = 20 (ascender), 140 (x-height), 260 (baseline), 320 (descender). Each letter = strokes in order; a stroke = guide points in order; a point with a trailing # is a waypoint (tap order = listed order); unmarked points are guide-only; a tail after a stroke's last waypoint draws automatically. "Bowl" and "stem" name the guide-point runs used by the belly cue.

- **L1 — sticks and simple rounds**
  - l: s1 (130,20)# → (130,140)# → (130,260)#
  - i: s1 (130,140)# → (130,260)# ; s2 dot (130,80)#
  - t: s1 (130,60)# → (130,240) → (150,260) → (190,250)# ; s2 (80,140)# → (180,140)#
  - o: s1 (130,140)# → (80,150) → (70,200)# → (80,250) → (130,260)# → (180,250) → (190,200)# → (180,150) → (130,140)#
  - c: s1 (210,170)# → (160,140) → (100,140) → (60,180) → (60,200)# → (60,225) → (100,260) → (160,260) → (210,235)#
- **L2 — arches and the round-then-stick a**
  - a: s1 (200,150)# → (150,140) → (100,150) → (70,200)# → (100,255) → (150,262) → (200,245) → (200,140) → (200,260)#   (bowl first, then up and down the stick)
  - n: s1 (60,140)# → (60,260)# → (60,170) → (100,140) → (160,140) → (190,180) → (190,260)#
  - m: s1 (40,140)# → (40,260)# → (40,170) → (70,140) → (110,140) → (130,170) → (130,260)# → (130,170) → (160,140) → (200,140) → (220,170) → (220,260)#
  - u: s1 (60,140)# → (60,230) → (80,258) → (130,262)# → (180,250) → (200,220) → (200,140)# → (200,260)   (tail: down the stick)
  - h: s1 (60,20)# → (60,260)# → (60,170) → (100,140) → (160,140) → (190,180) → (190,260)#
  - e: s1 (60,200)# → (200,200)# → (200,160) → (160,140) → (100,140) → (65,180) → (65,230) → (100,262) → (130,262)# → (160,262) → (205,240)
  - r: s1 (60,140)# → (60,260)# → (60,170) → (100,140) → (150,140) → (180,170)#
- **L3 — belly letters, g, s and the dotted j**
  - d: s1 (200,150)# → (150,140) → (100,150) → (70,200)# → (100,255) → (150,262) → (200,245) → (200,20)# → (200,260)#   bowl = points 1-7; stem = (200,20)→(200,260); bellyDot (135,200)
  - b: s1 (60,20)# → (60,260)# → (60,160) → (110,140) → (170,170) → (185,205)# → (170,245) → (110,264) → (60,250)   stem = (60,20)→(60,260); bowl = points 3-9; bellyDot (125,205)
  - p: s1 (60,140)# → (60,320)# → (60,160) → (110,140) → (170,165) → (185,205)# → (170,245) → (110,262) → (60,250)   stem = (60,140)→(60,320); bowl = points 3-9; bellyDot (125,205)
  - q: s1 (200,150)# → (150,140) → (100,150) → (70,200)# → (100,255) → (150,262) → (200,245) → (200,140) → (200,320)#   bowl = points 1-7; stem = (200,140)→(200,320); bellyDot (135,200)
  - g: s1 (200,150)# → (150,140) → (100,150) → (70,200)# → (100,255) → (150,262) → (200,245) → (200,140) → (200,290)# → (170,320) → (110,320) → (80,300)#
  - s: s1 (190,160)# → (150,140) → (100,140) → (70,160)# → (85,195) → (150,210) → (190,235) → (170,262) → (110,266) → (60,255)#
  - j: s1 (130,140)# → (130,290)# → (110,320) → (70,315) ; s2 dot (130,80)#

Waypoint spacing check (same stroke, nearest pair): l 120; i 120 (the dot is its own stroke); t stroke 1 (130,60)→(190,250) 199, stroke 2 100; o 85 (top to left); c 92; a 139; n 120 / 130; m 90; u 141 / 141; h 240; e 140 / 93; r 120 / 124; d 139 / 245; b 240 / 133; p 180 / 170; q 139 / 187; g 139 / 166 / 121; s 122 / 91; j 150. All ≥ 85.

Play list: 8 items; start at L1; levels per Rules; no letter repeats within a session; the first item plays `ANIM.demo` once (F-42).

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive letters completed with no refused touch and no idle pulse → next level (cap L3).
- Adaptation: a letter that needed the 6 s show-me on any waypoint, or refused touches on 2 consecutive letters → next letter one level down (floor L1).
- What happens on a correct answer (waypoint / letter): `ANIM.pop` + `tone("tap", k)`; trail `ANIM.draw`; on the last waypoint `ANIM.set`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every second letter and the eighth, snail `ANIM.crawl`, model letter turns `structure`, belly dot re-shown on b/d/p/q, rail dot fills, next letter after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Touching the far side of a bowl first, or a stick before its bowl (reversal / stick-first): refused silently; after 2 s waypoint 1 pulses. For b, d, p, q the belly cue has already shown the bowl side before the first touch.
  - Dragging a stroke in the wrong direction (bottom-up stick, clockwise bowl): the trail does not draw; the next waypoint pulses after 2 s.
  - Reaching the i / j dot before the stem, or dragging into it: the dot stroke is not armed until the stem completes AND the pointer lifts; nothing happens.
  - Not lifting between t's stem and crossbar: the crossbar's waypoints appear only after `pointerup`.
  - No progress for 6 s: `ART.demoDot` travels to the next waypoint (show-me); the letter then counts as solved-with-help.
- Retry behaviour: unlimited touches; a wrong touch is refused, never counted; every letter completes (success is certain).
- Finish condition: 8 letters. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Lowercase Path". No words on the play screen.

## Sound
`tone("tap", k)` on the k-th waypoint (pitch rises along the letter); `tone("tap", 6)` on the i / j dot landing; `tone("correct")` when the letter completes; `tone("tap")` when a new stroke's waypoints appear and when the belly cue starts; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; the letter set is the same 26 lowercase letters in every language).
- [ ] Works at narrow width (400-px iframe: model card, letter box with its three writing lines, and the snail visible; waypoints separate).
- [ ] Keyboard operable (Tab reaches only the next waypoint of the active stroke; Enter reaches it; the i dot is reachable only after the stem).
- [ ] Never auto-starts (the demo plays only after Start, on the first letter).
- [ ] No losing state (any number of refused touches still ends with every letter drawn).
- [ ] Before tracing d, the bowl fills coral with a dot on the LEFT for about a second, then the stick glows on the right; before b, the bowl is on the RIGHT.
- [ ] On d, the bowl must be traced first (from the 2 o'clock start, going left and round); touching the top of the stick first does nothing and the start dot pulses after 2 s.
- [ ] On b, the stick is traced first from the top; the bowl's waypoint appears on the right after the stick.
- [ ] On i, the dot can be reached only after the stem and only after lifting the finger; the letter does not complete without it.
- [ ] On t, the crossbar's dots appear only after the finger lifts from the stem.
- [ ] Three writing lines are visible inside the letter box; p and q reach below the baseline.
- [ ] Two clean letters in a row bring arch letters, then belly letters; a letter that needed the travelling dot brings an easier one next.
- [ ] The finish screen shows the eight traced letters (belly letters with a small coral dot) and no score.
- [ ] With `?sound=off` nothing is audible.
