# 100 — Weather Match

## Identity
- Slug: `weather-match`
- Subject / topic: Science / weather as an observable pattern — matching a weather picture to what you would see or need in it (an umbrella in rain, sunglasses in sun, a kite in wind, a snowman in snow)
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (a weather prompt, three object tiles)
- Estimated build size: ~400 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Science scope per F-135 / F-218: weather as what you see and need today; never why weather happens, never a forecast, never a calendar.

## Learning
- Objective: Looks at a weather picture (sun, rain, wind, snow) and taps the object among three that you would see or need in that weather.
- Prerequisites: None beyond tapping. The weather picture is the whole prompt; the tiles are discoverable by tapping. Nothing is read or spoken.
- Curriculum links: F-23 (seasons and weather as observable patterns in all 12 systems at 5-8), F-30, F-218, F-5, F-135 (observable weather, no causation). US K-ESS2-1 "observe local weather conditions"; England Y1 "observe and describe weather"; Germany Sachunterricht Klasse 1 "Wetter beobachten"; France GS "le temps qu'il fait"; Spain Infantil "el tiempo atmosférico"; Brazil EF02CI / EI03ET (tempo e clima — observação); Sweden förskoleklass "väder"; Finland esiopetus "sää".
- Common misconceptions (F-135), each with this game's response:
  1. **Matching by "what I like" rather than by the weather (ice cream chosen for rain).** Response: the enacted feedback puts the chosen object INTO the weather: the tapped tile's object glides up under the weather picture (`ANIM.glide` to `ART.stageSpot`) and the weather acts on it — rain drops fall onto it (`ART.drop`, `ANIM.fall`), sun rays reach it (`ART.ray`, `ANIM.rays`), wind lines rush past it (`ART.windLine`, `ANIM.gust`), snowflakes settle on it (`ART.flake`, `ANIM.fall`). For a wrong object the child watches the ice cream stand in the rain, then it glides back and nudges; for a correct object the same visit ends with a pop. The weather, not a verdict, is the feedback.
  2. **Rain and snow treated as the same weather (a sled chosen for rain, an umbrella for snow).** Response: L3 puts a rain object and a snow object on the same tile row; the enacted visit shows drops that splash (`ANIM.splash`, the drop widens and fades at the object's top) versus flakes that PILE (`ART.pile`, a small white mound growing on the object's top with `ANIM.pileGrow`) — the difference is shown, not told.
  3. **Wind is invisible, so "nothing goes with wind."** Response: wind items are things wind visibly moves — a kite, falling leaves, a sailing boat, a wind chime — and the wind cue makes the object itself sway (`ANIM.sway`) while the wind lines rush past.
  4. **Sun means "sunny things" regardless of need (a snowman chosen for sun because it is white and bright).** Response: the snowman visits the sun and `ANIM.melt`s (it sinks and squashes) before gliding back; the correct tile then gains the show-me pulse on the third try as usual.

## How it plays
1. **Start screen**: title "Weather Match", the sheep (`ART.sheep`) at (360, 200), Start, picker.
2. **Item 1 (L1: rain)**: rail of 10 dots (§6) at y = 28. Zone A: a big weather card (`ART.weatherCard`, 200 × 160) centred at (360, 150) holding the weather picture — `ART.rain` — at size 96; the sheep stands at (120, 170) looking at the sky; a `ART.stageSpot` (a soft oval "puddle" of ground) at (360, 236) under the card, where a chosen object will stand. Zone B: three tiles (`ART.objectTile`, 100 × 100) at y = 380, x = 220 / 360 / 500 showing `ART.umbrella`, `ART.sunglasses`, `ART.kite` in shuffled order. No caption.
3. **Answering**: the child taps a tile (it lifts, `ANIM.lift`, `tone("tap")`; all three tiles disable for the visit). A copy of the object glides (`ANIM.glide`) to `ART.stageSpot` and the weather acts on it for ≈ 1.2 s (the cue for the weather in Rules).
   - **Correct object**: the visit ends with `ANIM.pop` on the object and the sheep `ANIM.nod`; `tone("correct")`, praise pop (rotation); the copy stays on the stage spot; the rail dot fills; after 700 ms the next item builds (the card's picture swaps with `ANIM.appear`, the tiles reshuffle with `ANIM.appear`).
   - **Wrong object**: the visit shows the mismatch (the ice cream in the rain; the umbrella in the sun with nothing to keep off; the snowman melting), then the copy glides back to its tile and the tile `ANIM.nudge`s, `tone("nudge")`; the tile de-selects and stays enabled. Attempt 2 (all three tiles re-enable; for the 5-6 band the tiles do NOT reshuffle after a wrong tap — P8/P1 5-6 rule — but the item counts as retried).
   - **Second wrong tap**: the visit again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop; the sheep still nods).
4. **A full worked session**: item 1 (rain; umbrella | sunglasses, kite) — ice cream is not here; the child taps sunglasses ✗: the sunglasses stand under the rain, drops splash on them, they glide back and nudge; umbrella ✓: drops splash on the open umbrella, pop · item 2 (sun; sunglasses | umbrella, gloves) ✓ → step up · item 3 (L2 wind; kite | umbrella, ice cream) — kite ✓: the kite sways as wind lines rush past · item 4 (L2 rain; boots | sun hat, leaves) ✓ → step up · item 5 (L3 snow; snowman | umbrella, sunglasses) — umbrella ✗: flakes pile on the umbrella's top, no splash, it glides back; snowman ✓: flakes pile on its hat → step down · item 6 (L2 sun; ice cream | snowman, kite) ✓ · item 7 (L2 wind; boat | sunglasses, umbrella) ✓ → step up · item 8 (L3 rain; umbrella | sled, kite) ✓ · item 9 (L3 sun; sun hat | gloves, snowman) — snowman ✗: it melts; sun hat ✓ · item 10 (L2 snow; gloves | ice cream, kite) ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the sheep (360, 200) `ANIM.celebrate`; the summary = the ten weather cards in a row at y = 400 as `ART.miniCard`s (56 × 46, the weather picture at size 22 with its matched object at size 18 below it) — x = 360 − 4.5 × 64 + i × 64; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  sheep:       { kind: "emoji", value: "🐑", size: 80 },
  weatherCard: { kind: "shape", shape: "roundRect", w: 200, h: 160, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  stageSpot:   { kind: "shape", shape: "ellipse", w: 140, h: 28, fill: "surface2", stroke: "line", strokeWidth: 2 },
  // weather prompts
  sun:         { kind: "emoji", value: "☀️", size: 96 },
  rain:        { kind: "emoji", value: "🌧️", size: 96 },                       // Unicode 7
  wind:        { kind: "emoji", value: "💨", size: 96 },
  snow:        { kind: "emoji", value: "❄️", size: 96 },
  // objects — sun
  sunglasses:  { kind: "emoji", value: "🕶️", size: 64 },                       // Unicode 7
  sunHat:      { kind: "emoji", value: "👒", size: 64 },
  iceCream:    { kind: "emoji", value: "🍦", size: 64 },
  parasol:     { kind: "emoji", value: "⛱️", size: 64 },                       // Unicode 7 (beach parasol)
  // objects — rain
  umbrella:    { kind: "emoji", value: "☂️", size: 64 },
  boots:       { kind: "emoji", value: "🥾", size: 64 },                       // Unicode 11
  rainbow:     { kind: "emoji", value: "🌈", size: 64 },
  // objects — wind
  kite:        { kind: "emoji", value: "🪁", size: 64, fallback: "🎈" },       // Unicode 13 → balloon (also blown by wind)
  leaves:      { kind: "emoji", value: "🍂", size: 64 },
  boat:        { kind: "emoji", value: "⛵", size: 64 },
  windChime:   { kind: "emoji", value: "🎐", size: 64 },
  // objects — snow
  snowman:     { kind: "emoji", value: "⛄", size: 64 },
  sled:        { kind: "emoji", value: "🛷", size: 64 },                       // Unicode 11
  gloves:      { kind: "emoji", value: "🧤", size: 64 },                       // Unicode 10
  // tiles and cues
  objectTile:  { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  drop:        { kind: "shape", shape: "ellipse", w: 8, h: 14, fill: "structure" },                     // rain: drawn 5× falling onto the visiting object
  splash:      { kind: "shape", shape: "ellipse", w: 18, h: 6, stroke: "structure", strokeWidth: 2 },   // where a drop lands
  ray:         { kind: "shape", shape: "line", w: 90, stroke: "accent", strokeWidth: 4 },               // sun: 3 lines from the card to the object
  windLine:    { kind: "shape", shape: "line", w: 70, stroke: "inkSoft", strokeWidth: 4 },              // wind: 3 horizontal lines rushing past the object
  flake:       { kind: "emoji", value: "❄️", size: 16 },                                                 // snow: drawn 5× falling
  pile:        { kind: "shape", shape: "ellipse", w: 44, h: 14, fill: "surface", stroke: "line", strokeWidth: 2 },   // snow piling on the object's top; grows from scale 0.2
  showRing:    { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniCard:    { kind: "shape", shape: "roundRect", w: 56, h: 46, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one weather or object unambiguously in English (the key is the intended word). The only glyph newer than Unicode 12 is the kite, with the balloon as fallback (a balloon is also something the wind moves, so the item stays true). Snow appears here as a WEATHER you can see today, never as a season cue (F-135). Colour-blind safety: the four weathers differ by glyph shape; the cues differ by motion (fall-and-splash, rays, rushing lines, fall-and-pile), never by colour alone.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile tapped" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "object copy to the stage spot / back to its tile (x,y set at call)" },
  fall:      { y: "+=70", alpha: 0.2, duration: 500, ease: "Sine.In", trigger: "each drop or flake falls from the card's bottom onto the object (from alpha 1), 120 ms apart" },
  splash:    { scale: 1.6, alpha: 0, duration: 250, ease: "Sine.Out", trigger: "splash ellipse at the object's top where a drop lands (from scale 0.5, alpha 1)" },
  rays:      { alpha: 1, scaleX: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 700, trigger: "three ray lines from the card to the object (from alpha 0, scaleX 0.1 anchored at the card), hold, fade" },
  gust:      { x: "+=160", alpha: 0, duration: 450, ease: "Sine.In", trigger: "each windLine rushes left-to-right past the object (from x −80, alpha 1), 100 ms apart, twice" },
  sway:      { angle: 12, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the visiting object in wind" },
  pileGrow:  { scale: 1, duration: 900, ease: "Sine.Out", trigger: "pile on the object's top grows from scale 0.2 as flakes land" },
  melt:      { y: "+=16", scaleY: 0.7, scaleX: 1.2, duration: 700, ease: "Sine.In", yoyo: true, hold: 300, trigger: "the snowman in the sun sinks and widens, then recovers as it leaves" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct object at the end of its visit" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile after the copy returns" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "sheep on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new weather picture and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish sheep" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ┌── weatherCard (360,150) ──┐              │
      │   sheep            │        rain (96 px)       │              │  zone A
      │  (120,170)         └────────────────────────────┘              │
      │                     ( stageSpot 360,236 )  ← object visits here│
260   ├──────────────────────────────────────────────────────────────┤
      │      [ umbrella ]     [ sunglasses ]     [ kite ]   y=380     │  zone B
      │        x=220             x=360            x=500   (100×100)   │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull` as items are solved.
- `ART.sheep` (120, 170). `ART.weatherCard` centred (360, 150) with the item's weather (`ART.sun` / `ART.rain` / `ART.wind` / `ART.snow`) centred in it at size 96. `ART.stageSpot` centred (360, 236); the visiting object copy stands at (360, 214) at size 64.
- Tiles: `makeTile` 100 × 100 with `ART.objectTile` tokens at (220, 380), (360, 380), (500, 380); the object emoji centred at size 64. Selected look: `ANIM.lift` + the library outline (`THEME.colour.structure`, 3 px).
- Cues at the stage spot: `ART.drop` × 5 starting at y = 150 spread over x = 330-390 and `ART.splash` at (object x ± 20, 186); `ART.ray` × 3 from the card's bottom edge (360, 230) fanned ±20° to the object; `ART.windLine` × 3 at y = 200 / 214 / 228 from x = 280; `ART.flake` × 5 like the drops with `ART.pile` at (360, 186).
- `ART.showRing` behind the correct tile.
- Tap floors: tiles 100 (≥ 80). Gap 40.
- Tab order: the three tiles left to right. Under `?embed=1` the picker is not created.
- While a visit plays (≈ 1.2-1.6 s) all three tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each item = (weather; correct object | two distractors). Weather words map to `ART.sun` / `ART.rain` / `ART.wind` / `ART.snow`; object words to ART keys: sunglasses `ART.sunglasses`, sun hat `ART.sunHat`, ice cream `ART.iceCream`, parasol `ART.parasol`, umbrella `ART.umbrella`, boots `ART.boots`, rainbow `ART.rainbow`, kite `ART.kite`, leaves `ART.leaves`, boat `ART.boat`, wind chime `ART.windChime`, snowman `ART.snowman`, sled `ART.sled`, gloves `ART.gloves`.

- **L1** (sun and rain only; distractors from far-off weathers): (rain; umbrella | sunglasses, kite) · (sun; sunglasses | umbrella, gloves) · (rain; boots | sun hat, snowman) · (sun; ice cream | boots, sled) · (rain; rainbow | parasol, gloves) · (sun; parasol | umbrella, snowman)
- **L2** (wind and snow join; distractors from a clearly different weather): (wind; kite | umbrella, ice cream) · (rain; boots | sun hat, leaves) · (snow; gloves | ice cream, kite) · (wind; boat | sunglasses, umbrella) · (sun; ice cream | snowman, kite) · (snow; sled | parasol, boat) · (wind; leaves | sled, sun hat) · (snow; snowman | sunglasses, rainbow)
- **L3** (near-miss distractors: rain vs snow, sun vs wind on one row): (snow; snowman | umbrella, sunglasses) · (rain; umbrella | sled, kite) · (sun; sun hat | gloves, snowman) · (snow; sled | boots, parasol) · (wind; wind chime | rainbow, sunglasses) · (rain; boots | snowman, leaves)

Play list of 10 per Rules (shuffle within level; the first item of a session is always a rain or sun item from L1); no item repeats within a session; two consecutive items never share the same weather; the correct tile is never in the same slot twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: the object's visit (weather cue) ends with `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], sheep `ANIM.nod`, the copy stays on the stage spot, rail dot fills, next item after 700 ms.
- What happens on a wrong answer (each = the object's visit under the weather, then the copy glides back and the tile `ANIM.nudge`s with `tone("nudge")`):
  - A sun object in the rain ("what I like"): five `ART.drop`s `ANIM.fall` onto it with `ANIM.splash` at each landing.
  - A rain object in the sun, or a snow object in the sun (the snowman): rays reach it (`ANIM.rays`); the snowman additionally `ANIM.melt`s.
  - A rain object in the snow, or a snow object in the rain (rain/snow confusion): in snow, `ART.flake`s fall and `ART.pile` `ANIM.pileGrow`s on its top with no splash; in rain, drops splash and nothing piles.
  - Any object in the wind: `ART.windLine`s `ANIM.gust` past it and the object `ANIM.sway`s — for a wrong object (sunglasses) it sways just the same, then goes back: wind moves the kite, the leaves, the boat and the chime and that is what the correct tiles show.
- Retry behaviour: attempt 1 → attempt 2 after the visit (tiles stay in place, no reshuffle at 5-6) → attempt 3 with `ART.showRing` on the correct tile; tapping it completes the item as solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Weather Match". No words on the play screen.

## Sound
`tone("tap")` on a tile tap; `tone("tap", k)` per falling drop or flake (k = 1 … 5, a soft rising patter); `tone("correct")` at the end of a correct visit; `tone("nudge")` when a wrong copy returns; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the weather card, the stage spot and three tiles fully visible).
- [ ] Keyboard operable (Tab cycles the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still reaches All done via the show-me ring).
- [ ] Tapping any tile sends a copy of its object up under the weather picture, where the weather acts on it before anything else happens.
- [ ] Sunglasses tapped for rain: drops fall and splash on them, they glide back and the tile wiggles; the umbrella tapped for rain: drops splash on it and it pops and stays.
- [ ] The snowman tapped for sun sinks and widens (melts) before going back.
- [ ] Umbrella tapped for snow: flakes pile on top with no splash; sled tapped for rain: drops splash with no pile.
- [ ] Any object tapped for wind sways as grey lines rush past it.
- [ ] The tiles do not move after a wrong tap; the correct tile is never in the same position on two items running.
- [ ] Two first-try corrects in a row bring wind and snow, then rain-vs-snow rows; a wrong tap brings sun/rain next.
- [ ] The finish screen shows ten small weather cards with their matched objects and no score.
- [ ] If the kite emoji is missing on the device, a balloon appears instead.
- [ ] With `?sound=off` nothing is audible.
