# 084 — Size Words

## Identity
- Slug: `size-words-line-up`
- Subject / topic: Literacy / comparative and superlative size words — tallest / shortest, longest / shortest, biggest / smallest, widest / narrowest — used to order pictured objects
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (objects tapped first-to-last into an ordered rail; per-tap judgement)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (per-tap judgement: an out-of-turn tap is caught at once). Locale note: the objects are shapes (language-neutral); the ONE language-bound surface is the prompt word ("Tallest first"), which lives in `LOCALE_DATA` for all 11 codes (table in Content).

## Learning
- Objective: Reads a size word (tallest, shortest, longest, biggest, smallest, widest, narrowest) and taps three or four pictured objects in that order — first the one the word names, then the next, then the next — even when another dimension of the objects varies the other way.
- Prerequisites: Compares two objects by size (5-6 core, F-103); reads a two-word prompt (6-8 band, ≤ 8 words); taps.
- Curriculum links: F-22 (vocabulary; comparative forms are in the 6-8 language strand of every system), F-103 (comparing quantities/sizes), F-31 rows "Compare more/fewer/same" (5-6) → "Length with units" (6-8) — the size WORDS sit between them at 6-8 (US L.1.1/L.2.1 comparatives and superlatives "bigger, biggest"; 1.MD.A.1 "order three objects by length"; England Y1 "compare, describe and solve practical problems for lengths and heights (long/short, longer/shorter, tall/short)"; Germany Klasse 1-2 "Längen vergleichen: länger, kürzer, am längsten"; France CP "comparer des longueurs"; Netherlands groep 3 "langste / kortste"; Spain 1º "más largo que, el más corto"; Brazil EF01MA15 "comparar comprimentos"; Sweden åk 1 "jämföra längder"; Finland grade 1-2 "vertailu: pisin, lyhin").
- Common misconceptions (F-103, F-114, F-115), each with this game's response:
  1. **Judging by the wrong dimension — "tallest" read as widest or biggest overall (F-103: length/area instead of the named attribute).** Response: on a wrong tap a measure line (`ART.measureLine` with `ART.tick` ends) draws along the NAMED dimension on the tapped object and on the correct next object (vertical for tall, horizontal for long/wide, a diameter for big), 1200 ms — the child sees which dimension the word means and which is bigger. L2 and L3 vary a second dimension the opposite way (the tallest tower is the thinnest) so the shortcut fails visibly.
  2. **Direction reversal — taps the shortest first when the prompt says "tallest first" (the superlative is read, the "first" is not).** Response: the prompt always carries a staircase icon (`ART.stairDown` for a descending order, `ART.stairUp` for ascending) beside the word — F-42 icon + word, colour never alone; on a reversal error the icon `ANIM.pulse`s and the measure lines draw.
  3. **The middle one — extremes are easy, the second and third positions are guessed.** Response: the rail draws a size bar (`ART.sizeBar`, length = the object's value) under every placed object, so the rail visibly steps down (or up) and a wrong middle choice would break the staircase; L3 uses four objects so two middle positions must be reasoned.
  4. **Tapping out of the pattern (any object at random).** Response: an out-of-turn tap nudges and is refused (the rail only accepts the correct next object); after the second wrong tap on the same step the correct next object gains a soft outline (`ART.hintRing`, `ANIM.showMe`) — P4's show-me.

## How it plays
1. **Start screen**: title "Size Words", the giraffe (`ART.giraffe`) at (360, 200), Start, picker.
2. **Item 1 (L1: "Tallest first"; three towers)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the prompt — `ART.stairDown` at (170, 92) and the prompt text (`ART.promptText`, 28 px, `THEME.colour.structure`) at (400, 92) reading `LOCALE_DATA[lang].tallestFirst` ("Tallest first"); below it three objects on a ground line (`ART.ground` at y = 232): towers (`ART.tower` with per-object width and height) standing on the ground at x = 200 / 360 / 520, each inside an invisible `makeTile` 120 × 120 centred at (x, 172), in a shuffled order — heights 110, 70, 40. The giraffe stands at (70, 180). Zone B: the ordered rail — three dashed slots (`ART.railSlot`, 110 × 110) at y = 380, x = 200 / 360 / 520. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Ordering**: the child taps the tallest tower. It is the correct first → a copy glides (`ANIM.glide`) into slot 1, the original dims to alpha 0.35 and gains `ART.posBadge` "1" at its top-right, the slot shows the copy with `ART.sizeBar` under it (length 110) and the badge "1"; `tone("tap", 1)`. The child taps the next tallest → slot 2 (`ART.sizeBar` 70, `tone("tap", 2)`); then the last → slot 3 (bar 40, `tone("tap", 3)`).
   - **Item complete** (rail full and every step correct on the first try): the rail `ANIM.pop`s, `tone("correct")`, praise pop (rotation), the giraffe `ANIM.bob`; rail dot fills; next item after 900 ms (`ANIM.rise` clears the rail, new objects `ANIM.appear`).
   - **Wrong tap (an object that is not the correct next)**: `ANIM.nudge`, `tone("nudge")`; measure lines draw on the tapped object and the correct next object (`ANIM.measure`) for 1200 ms; for a reversal-class error (the tapped object is the one that belongs LAST) the stair icon also `ANIM.pulse`s; `t("look_carefully")` on the feedback line. The rail keeps what it has. Attempt 2 on this step.
   - **Second wrong tap on the same step**: measure lines again, then the correct next object gains `ART.hintRing` (`ANIM.showMe`); tapping it places it; the item is solved-with-help (no praise pop at the end; the giraffe still bobs).
   - Tapping a filled rail slot removes the LAST placed copy back to the objects (undo, `ANIM.rise`; the original brightens and loses its badge). Tapping an already placed (dimmed) object does nothing.
4. **Items 2-10**: per Content/Rules. L1 three objects, only the named dimension varies; L2 three objects with a second dimension varying the other way; L3 four objects (slots at x = 150 / 290 / 430 / 570, objects at the same x) with the conflict and smaller differences.
5. **Finish**: `t("all_done")` (360, 110); the giraffe (360, 200) `ANIM.celebrate`; the summary = the ten completed rails as `ART.miniRail` chips (130 × 40) in two rows of five (y = 340 and 400; x = 100 + i × 130) each showing its objects' size bars in order (three or four little bars stepping down or up) with a filled `ART.dotFull` at the left for a first-try item and a hollow `ART.dotEmpty` for a helped one; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  giraffe:     { kind: "emoji", value: "🦒", size: 80 },                     // Unicode 10
  promptText:  { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  stairDown:   { kind: "shape", shape: "polygon", points: [[-24,-14],[-8,-14],[-8,-2],[8,-2],[8,8],[24,8],[24,16],[-24,16]], fill: "structure" },   // descending order (biggest first)
  stairUp:     { kind: "shape", shape: "polygon", points: [[24,-14],[8,-14],[8,-2],[-8,-2],[-8,8],[-24,8],[-24,16],[24,16]], fill: "structure" },   // ascending order (smallest first)
  ground:      { kind: "shape", shape: "rect", w: 560, h: 4, fill: "line" },
  tower:       { kind: "shape", shape: "roundRect", w: 44, h: 110, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 6 },   // w, h set per object; drawn standing on the ground
  bar:         { kind: "shape", shape: "roundRect", w: 110, h: 22, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },   // w, h set per object
  gate:        { kind: "shape", shape: "roundRect", w: 110, h: 50, stroke: "structure", strokeWidth: 4, radius: 4 },                          // an open frame; w, h set per object
  blob:        { kind: "shape", shape: "circle", r: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },                        // r set per object
  balloon:     { kind: "emoji", value: "🎈", size: 88 },                                                                                      // size set per object (36-88)
  railSlot:    { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 12 },      // dashed: lineDash [8,6]
  posBadge:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },        // position numeral 14 px display inkOnAccent
  sizeBar:     { kind: "shape", shape: "roundRect", w: 110, h: 8, fill: "structure", radius: 4 },   // width = the object's value (36-110), under the placed copy
  measureLine: { kind: "shape", shape: "line", w: 110, stroke: "accent", strokeWidth: 5 },           // along the named dimension; length = the object's value
  tick:        { kind: "shape", shape: "line", w: 14, stroke: "accent", strokeWidth: 5 },            // perpendicular end ticks of a measure line
  hintRing:    { kind: "shape", shape: "roundRect", w: 128, h: 128, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniRail:    { kind: "shape", shape: "roundRect", w: 130, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Objects are drawn through `draw(scene, key, x, y, { w, h, r, size })` with the item's values; on the rail the same object is drawn at scale 0.8 inside the slot with its `ART.sizeBar` at the slot's bottom (y + 44). No entry needs a fallback.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a copy from an object to the next rail slot (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "an object tapped out of turn" },
  measure:   { alpha: 1, scaleX: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "measureLine + ticks on the tapped object and on the correct next object (from alpha 0, scaleX 0.2 anchored at the line's start), hold, then fade" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the stair icon on a reversal-class wrong tap" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "undo of the last slot; clearing the rail before the next item" },
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the whole rail when the item completes" },
  bob:       { y: "-=12", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "giraffe on item completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new objects and prompt (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next object (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish giraffe" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   (stair icon)(170,92)   Tallest first  (400,92)              │
      │ giraffe        ▐▌            ▐▌            ▐▌                 │  zone A
      │ (70,180)       ▐▌ x=200      ▐▌ x=360      ▐▌ x=520  objects │
      │  ───────────── ground y=232 ─────────────────────────────    │
260   ├──────────────────────────────────────────────────────────────┤
      │        ┊  1  ┊      ┊  2  ┊      ┊     ┊    rail slots y=380 │
      │        ┊ ▬▬▬ ┊      ┊ ▬▬  ┊      ┊     ┊    (110×110)        │  zone B
      │         x=200         x=360         x=520   size bars inside │
480   ├──────────────────────────────────────────────────────────────┤
      │                 feedback line (360,500)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-object items use x = 150 / 290 / 430 / 570 for both objects and slots (tiles 120, pitch 140). Fixed layout, FIT scaling. Towers stand on the ground (their bottom edge at y = 232); bars and gates are centred at y = 172; blobs and balloons are centred at y = 172.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Prompt: the stair icon (`ART.stairDown` or `ART.stairUp` per the item's direction) at (170, 92); `ART.promptText` centred (400, 92), `wordWrap: { width: 400 }`, max two lines (fit-to-width shrink to 22 px minimum for long locales). `ART.giraffe` at (70, 180). `ART.ground` centred (360, 232).
- Objects: each an invisible `makeTile` 120 × 120 (fill/stroke passed as `THEME.colour.bg`) at (x, 172) with the object drawn inside at the item's values; selected look = the tile's `selectedStroke` (`THEME.colour.structure`, 3 px). Placed objects dim to alpha 0.35 and carry `ART.posBadge` at (+44, −44) with the position numeral 14 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- Rail: `makeTile` 110 × 110 with `ART.railSlot` tokens (dashed); a filled slot draws the copy at scale 0.8 centred at (x, y − 8), `ART.sizeBar` at (x, y + 44) with width = value, and `ART.posBadge` at (+44, −44).
- Measure lines: `ART.measureLine` along the named dimension of an object — vertical through the tower's centre (length = h), horizontal through the bar/gate centre (length = w), horizontal through the blob/balloon centre (length = 2r or size) — with `ART.tick`s at both ends; drawn on the tapped object and the correct next object.
- `ART.hintRing` behind the correct next object's tile. Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors: object tiles 120 ≥ 56; slots 110; gaps ≥ 20. Keyboard: Tab walks the objects left to right, then the rail slots; Enter taps (places / undoes).

## Content
Objects are shapes (language-neutral). The prompt word is language-bound: `LOCALE_DATA[lang].prompts` holds the eight prompt strings; the item lists which key and which direction icon it uses. Values are logical pixels.

`LOCALE_DATA` — prompt strings (all 11 codes; rows for sv/da/no/fi are flagged for native review before release, per F-217):

| key | en | de | fr | it | es | pt | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| tallestFirst | Tallest first | Der höchste zuerst | Le plus haut d'abord | Il più alto prima | El más alto primero | O mais alto primeiro | De hoogste eerst | Den högsta först | Den højeste først | Den høyeste først | Korkein ensin |
| shortestTallFirst | Shortest first | Der niedrigste zuerst | Le plus bas d'abord | Il più basso prima | El más bajo primero | O mais baixo primeiro | De laagste eerst | Den lägsta först | Den laveste først | Den laveste først | Matalin ensin |
| longestFirst | Longest first | Der längste zuerst | Le plus long d'abord | Il più lungo prima | El más largo primero | O mais comprido primeiro | De langste eerst | Den längsta först | Den længste først | Den lengste først | Pisin ensin |
| shortestLongFirst | Shortest first | Der kürzeste zuerst | Le plus court d'abord | Il più corto prima | El más corto primero | O mais curto primeiro | De kortste eerst | Den kortaste först | Den korteste først | Den korteste først | Lyhin ensin |
| biggestFirst | Biggest first | Der größte zuerst | Le plus grand d'abord | Il più grande prima | El más grande primero | O maior primeiro | De grootste eerst | Den största först | Den største først | Den største først | Suurin ensin |
| smallestFirst | Smallest first | Der kleinste zuerst | Le plus petit d'abord | Il più piccolo prima | El más pequeño primero | O menor primeiro | De kleinste eerst | Den minsta först | Den mindste først | Den minste først | Pienin ensin |
| widestFirst | Widest first | Der breiteste zuerst | Le plus large d'abord | Il più largo prima | El más ancho primero | O mais largo primeiro | De breedste eerst | Den bredaste först | Den bredeste først | Den bredeste først | Levein ensin |
| narrowestFirst | Narrowest first | Der schmalste zuerst | Le plus étroit d'abord | Il più stretto prima | El más estrecho primero | O mais estreito primeiro | De smalste eerst | Den smalaste först | Den smalleste først | Den smaleste først | Kapein ensin |

Items: (prompt key; icon; object kind; the objects as value lists in CORRECT order — the on-screen order is shuffled per item). For towers and gates the named value is h (tall) or w (wide); the second number is the conflicting dimension.

- **L1 — three objects; only the named dimension varies**
  1. tallestFirst; `ART.stairDown`; `ART.tower` h 110 / 70 / 40 (w 44 each)
  2. shortestTallFirst; `ART.stairUp`; `ART.tower` h 40 / 70 / 110 (w 44)
  3. longestFirst; `ART.stairDown`; `ART.bar` w 110 / 75 / 40 (h 22)
  4. shortestLongFirst; `ART.stairUp`; `ART.bar` w 40 / 75 / 110 (h 22)
  5. biggestFirst; `ART.stairDown`; `ART.balloon` size 88 / 60 / 36
  6. smallestFirst; `ART.stairUp`; `ART.blob` r 16 / 26 / 40
- **L2 — three objects; a second dimension varies the other way**
  7. tallestFirst; `ART.stairDown`; `ART.tower` (h, w) 110/30 · 70/48 · 40/66 — the shortest tower is the widest
  8. shortestTallFirst; `ART.stairUp`; `ART.tower` (h, w) 40/66 · 70/48 · 110/30
  9. longestFirst; `ART.stairDown`; `ART.bar` (w, h) 110/14 · 75/24 · 40/34 — the shortest bar is the thickest
  10. widestFirst; `ART.stairDown`; `ART.gate` (w, h) 110/40 · 75/60 · 40/80 — the narrowest gate is the tallest
  11. narrowestFirst; `ART.stairUp`; `ART.gate` (w, h) 40/80 · 75/60 · 110/40
  12. biggestFirst; `ART.stairDown`; `ART.blob` r 40 / 26 / 16
- **L3 — four objects; the conflict and smaller steps**
  13. tallestFirst; `ART.stairDown`; `ART.tower` (h, w) 110/30 · 84/40 · 60/52 · 36/66
  14. shortestTallFirst; `ART.stairUp`; `ART.tower` (h, w) 36/30 · 60/40 · 84/52 · 110/66 — here the tallest is ALSO the widest (the conflict flips so neither shortcut is stable)
  15. longestFirst; `ART.stairDown`; `ART.bar` (w, h) 110/12 · 84/18 · 60/26 · 36/34
  16. widestFirst; `ART.stairDown`; `ART.gate` (w, h) 110/36 · 84/50 · 60/64 · 36/80
  17. biggestFirst; `ART.stairDown`; `ART.balloon` size 88 / 68 / 50 / 34
  18. smallestFirst; `ART.stairUp`; `ART.blob` r 14 / 22 / 30 / 40

Play list of 10 per Rules (shuffle within level, levels in order); no item repeats; two consecutive items never use the same prompt key; the correct first object is never in the same on-screen slot twice running (§13).

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive items completed with no wrong tap → next level (cap L3).
- Adaptation: 2 wrong taps within one item, or a wrong tap in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: each correct tap glides a copy to the rail with its size bar and `tone("tap", k)`; on the last correct tap the rail `ANIM.pop`s, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong tap only), giraffe `ANIM.bob`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`):
  - Wrong dimension (the tapped object wins on the OTHER dimension — e.g. the widest tower tapped for "tallest"): measure lines along the named dimension on the tapped object and the correct next object; `t("look_carefully")`.
  - Reversal (the tapped object belongs LAST): measure lines AND the stair icon pulses.
  - Middle-position slip (the tapped object belongs one step later): measure lines on both — the two lines differ only slightly, which is the point.
  - Any other out-of-turn tap: measure lines on both.
  - Tap on an already placed object: nothing (not an attempt).
- Retry behaviour: per step — attempt 1 → attempt 2 after the measure lines → attempt 3 with the hint ring on the correct next object; the item is solved-with-help if any ring was used. Undo (tapping the last slot) is free and never counts. No attempt 4 on a step.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Size Words". The eight prompt strings are `LOCALE_DATA[lang].prompts` (table in Content), read through `LOCALE_DATA[GameCore.lang]` with fallback to `en`.

## Sound
`tone("tap", k)` on the k-th correct placement (pitch climbs with the position — F-213); `tone("correct")` on item completion; `tone("nudge")` on an out-of-turn tap; `tone("finish")` once. Silent under `?sound=off`. The prompt word is read by the child, never spoken.

## Testing checklist
- [ ] Works in all 11 languages (the prompt word changes with `?lang=` — `?lang=de` shows "Der höchste zuerst", `?lang=fi` "Korkein ensin"; chrome strings change; long prompts fit on one or two lines beside the stair icon).
- [ ] Works at narrow width (400-px iframe: four objects, four rail slots, the giraffe and the prompt all visible and separate).
- [ ] Keyboard operable (Tab walks the objects left to right then the rail slots; Enter places or undoes).
- [ ] Never auto-starts.
- [ ] No losing state (out-of-turn taps never end the session; the hint ring always leads to completion).
- [ ] With "Tallest first" and three towers, tapping the tallest, then the middle, then the shortest fills the rail with three size bars stepping down.
- [ ] Tapping the widest (but shortest) tower first draws a coral vertical line up the tapped tower and up the tallest tower, with end ticks, for about a second.
- [ ] Tapping the shortest tower first for "Tallest first" also makes the staircase icon pulse.
- [ ] A second wrong tap on the same step outlines the correct next object; tapping it places it.
- [ ] Tapping the last filled rail slot returns that object to the row; its number badge disappears.
- [ ] Two clean items in a row bring objects whose other dimension varies the wrong way; two wrong taps bring plain objects back.
- [ ] Four-object items appear only at the third level, with four slots.
- [ ] The finish screen shows ten small stepped rails with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each placement plays a higher note than the last.
