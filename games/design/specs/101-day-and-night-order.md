# 101 — Day and Night

## Identity
- Slug: `day-and-night-order`
- Subject / topic: Science / the daily sequence morning → midday → evening → night, read from the sky (sun low on one side, sun high, sun low on the other side, moon)
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (per-tap judgement, the 5-6 default)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Science rule (F-218, F-30): this game is OBSERVATIONAL ONLY — the sky cues are a sequence the child has seen; there is no rotation model, no Earth, no "why". The sun rises on one side, climbs, sinks on the other side, dips behind the horizon; the moon is up at night. Nothing is spoken; the prompt is an ART element.

## Learning
- Objective: Orders three or four moments of a day from morning to night by tapping their sky-cue panels in sequence (sun low left → sun high → sun low right → moon).
- Prerequisites: Has lived through days. No reading, no counting (the rail slots carry position numerals as a second cue, but the child need not read them).
- Curriculum links: F-23 (seasons/weather/day-night as observable patterns in all 12 systems), F-30 (science integrated into world-knowledge subjects at 5-8; sequences only), F-31 row "Seasons/weather; day-night sequence" — conservative 7, earliest 5 → 5-6 (US K-ESS2 / NGSS patterns of the sun in the sky; England Y1 "observe changes across the four seasons … day length"; Germany HSU Klasse 1/2 "Tag und Nacht, Tagesablauf"; France cycle 1 "se repérer dans le temps: la journée"; Netherlands kerndoel 46 "dag en nacht"; Spain Infantil "el día y la noche"; Brazil EI03ET07 / EF01CI…; Finland esiopetus ympäristöoppi; Nordic "døgnet / dygnet"). F-218 (observational core only).
- Common misconceptions (F-134, F-129, F-116), each with this game's response:
  1. **"The sun goes away at night" — night is when the sun has vanished, unrelated to the day's sequence (F-134).** Response: the game never makes the sun disappear. On every night step the sky strip in zone A shows the sun SINK behind the horizon band (`ANIM.sunSet`: it glides down and is masked by `ART.horizonBand`) while `ART.moon` rises (`ANIM.moonRise`). The sun is still "there", behind the line. No causation is offered — only the observed sequence.
  2. **Ordering by salience, not by time — the favourite moment (playing) is tapped first (F-129 "sequencing by salience").** Response: per-tap judgement: a tile tapped out of turn nudges and stays; the sky strip's sun glides to where it SHOULD be next (`ANIM.arcMove` to the correct next position) so the child looks at the sky, not the activity; at L3 the activity pictures are removed entirely and only the sky remains.
  3. **The day is a loop — "night comes first because I was asleep, then morning" (cycle confusion).** Response: the rail is a left-to-right strip that starts with an empty slot under a sunrise glyph (`ART.startSun` printed at the rail's left end) and ends under `ART.endMoon`; the first slot only accepts the morning tile. The start is fixed by the strip, not explained.
  4. **Evening and night confused ("it is dark, so it is night") — the sunset panel tapped after the moon panel.** Response: the sunset panel keeps the sun VISIBLE, low on the right, on a pale sky; the night panel has the moon and stars on a deep sky. When the moon is tapped before the sunset, the sky strip's sun glides to the low-right position and pulses (`ANIM.pulse`) — "the sun is still up".
  5. **Left/right confusion — sunrise and sunset panels swapped (sun low on the wrong side).** Response: the sky strip's arc runs left → right in every item, and the sun on it always travels that way; a swapped tap moves the strip's sun to the correct side, which the child sees as a direction, not a word.

## How it plays
1. **Start screen**: title "Day and Night", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: three panels — wake, play, sleep)**: rail of 8 dots (§6). Zone A: the sky strip (`ART.skyStrip`, 560 × 96) centred at (360, 108) with `ART.horizonBand` along its bottom 18 px, `ART.arcGuide` (a faint dashed arc from (110, 140) up through (360, 72) down to (610, 140)) and `ART.stripSun` sitting at the arc's left end, half behind the horizon; `ART.startSun` (a small rising-sun glyph) at (96, 200) and `ART.endMoon` at (624, 200) bracket the order rail. The order rail: three slots (`ART.slot`, 124 × 64) at y = 214, x = 240 / 360 / 480, each with its position numeral (`ART.slotNumeral` "1", "2", "3") faint inside. Zone B: three event panels (`makeTile` 120 × 120 built from `ART.panelDay` / `ART.panelNight` with the sun/moon glyph and the activity glyph inside) at y = 372, x = 240 / 360 / 480, in a shuffled order. No caption (5-6: the strip and the numbered slots are the whole prompt).
3. **Tapping in order**: the child taps a panel.
   - **Correct next (the morning panel first)**: `tone("tap", k)` (k = its position), `ANIM.pop`, the panel glides (`ANIM.glide`) into slot k and shrinks to 110 × 56 (`ANIM.shrinkToSlot`) with the slot numeral now solid; the strip's `ART.stripSun` glides along the arc to that moment's position (`ANIM.arcMove`); for the night panel the sun sets behind the band (`ANIM.sunSet`) and `ART.moon` rises on the strip (`ANIM.moonRise`) with `ART.star` ×3 appearing (`ANIM.appear`).
   - **Item complete (last slot filled)**: `tone("correct")`, praise pop (rotation), the owl `ANIM.hoot` (a small angle wobble), rail dot fills; after 800 ms the strip resets (sun back to the left, moon down, stars gone) and the next item's panels `ANIM.appear`.
   - **Wrong (a later panel tapped first)**: `ANIM.nudge` on the panel, `tone("nudge")`, the panel stays where it is; the strip's sun glides (`ANIM.arcMove`) to the position of the CORRECT next moment and pulses there (`ANIM.pulse`) for 900 ms, then glides back to the last placed position. The child taps again. Attempt 2 for this slot.
   - **Wrong again on the same slot**: the cue again, and the correct next panel gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it fills the slot as solved-with-help (no praise on completion; the owl still hoots).
   - **Tapping a placed panel in the rail**: it glides back to zone B (undo; the strip sun glides back one position); no sound beyond `tone("tap")`.
4. **Items 2-8**: per Content and Rules. L1 = three panels; L2 = four panels (adds the sunset/evening moment; x = 180 / 300 / 420 / 540); L3 = four SKY-ONLY panels (no activity glyph — the sun's height and side are the only cue), including one item with no night at all (sunrise, midday, afternoon, sunset).
5. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the full sky strip at (360, 300) with the sun drawn at every position it visited (`ART.stripSun` copies at the five arc positions) and `ART.moon` at the right, above the four L2 panels in order at y = 420 (x = 180 / 300 / 420 / 540, 110 × 56) — the day laid out; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  owl:          { kind: "emoji", value: "🦉", size: 80 },
  sun:          { kind: "emoji", value: "🌞", size: 30 },                 // in a panel
  stripSun:     { kind: "emoji", value: "🌞", size: 40 },                 // on the sky strip
  moon:         { kind: "emoji", value: "🌙", size: 30 },                 // in a night panel and on the strip (size 40 there)
  star:         { kind: "emoji", value: "⭐", size: 14 },
  startSun:     { kind: "emoji", value: "🌅", size: 28 },                 // rail left end: "the day starts here"
  endMoon:      { kind: "emoji", value: "🌙", size: 28 },                 // rail right end
  actBowl:      { kind: "emoji", value: "🥣", size: 36 },                 // morning
  actBrush:     { kind: "emoji", value: "🪥", size: 36, fallback: "🥣" }, // morning variant; Unicode 13 → bowl fallback
  actBall:      { kind: "emoji", value: "⚽", size: 36 },                 // midday
  actApple:     { kind: "emoji", value: "🍎", size: 36 },                 // midday variant (lunch)
  actPlate:     { kind: "emoji", value: "🍽️", size: 36 },                // evening
  actBath:      { kind: "emoji", value: "🛁", size: 36 },                 // evening variant
  actBed:       { kind: "emoji", value: "🛏️", size: 36 },                // night
  actBook:      { kind: "emoji", value: "📖", size: 36 },                 // night variant (bedtime story)
  skyStrip:     { kind: "shape", shape: "roundRect", w: 560, h: 96, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 16 },
  horizonBand:  { kind: "shape", shape: "rect", w: 560, h: 18, fill: "structureSoft" },      // drawn OVER the strip's bottom edge; masks the setting sun
  arcGuide:     { kind: "shape", shape: "arc", r: 250, stroke: "line", strokeWidth: 2 },     // dashed [6,6]; centre (360, 322), from 200° to 340° so it spans (110,140)→(360,72)→(610,140)
  panelDay:     { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  panelNight:   { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "structure", stroke: "line", strokeWidth: 2, radius: 14 },
  panelHorizon: { kind: "shape", shape: "rect", w: 116, h: 6, fill: "structureSoft" },       // the little horizon line inside every panel at y = +20
  slot:         { kind: "shape", shape: "roundRect", w: 124, h: 64, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed [8,6] while empty
  slotNumeral:  { kind: "text",  value: "", size: 28, font: "display", color: "inkSoft" },  // "1".."4"; turns to color structure when filled
  showRing:     { kind: "shape", shape: "roundRect", w: 132, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Panel composition (all inside the 120 × 120 tile, tile-centre relative): sky region is the top 70 px; `ART.panelHorizon` at (0, +20); the sun/moon glyph at the moment's position from the table in Content; the activity glyph at (0, +44) on L1-L2 panels; nothing there on L3 panels. Night panels use `ART.panelNight` with `ART.moon` and three `ART.star` at (−34, −34), (28, −40), (−6, −14). Day/night is never carried by the fill alone: the sun's position or the moon's presence is always drawn.

## Animation registry
```js
const ANIM = {
  pop:          { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "panel tapped in the right turn" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "panel tapped out of turn" },
  glide:        { duration: 260, ease: "Sine.InOut", trigger: "panel to its rail slot / back to zone B (x,y at call)" },
  shrinkToSlot: { scale: 0.46, duration: 260, ease: "Sine.InOut", trigger: "panel shrinking into a 110×56 slot (runs with glide)" },
  arcMove:      { duration: 500, ease: "Sine.InOut", trigger: "strip sun to the next arc position (x,y at call from the arc table)" },
  pulse:        { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "strip sun at the correct-next position after a wrong tap" },
  sunSet:       { y: "+=44", alpha: 0.0, duration: 600, ease: "Sine.In", trigger: "strip sun dips behind the horizon band on the night step" },
  moonRise:     { y: "-=44", alpha: 1, duration: 600, ease: "Sine.Out", trigger: "strip moon rises at the arc's right end (from alpha 0)" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new panels; stars (from alpha 0, scale 0.6)" },
  hoot:         { angle: 6, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "owl on item complete" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct next panel (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
The strip sun's positions on the arc (x, y): sunrise (110, 140) · morning (235, 92) · midday (360, 72) · afternoon (485, 92) · sunset (610, 140) · night = sunset then `sunSet`; `ART.moon` on the strip rises to (610, 96). `sunSet` is the only alpha change and it is masked by the band; nothing flashes.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │      ┌────────────── ART.skyStrip (360,108) ───────────────┐  │
      │      │  sun  ·  ·  ·  ·  arcGuide  ·  ·  ·  ·   (moon)     │  │  zone A
      │      │ ═════════════ horizonBand y=147 ═══════════════════ │  │
      │      └────────────────────────────────────────────────────┘  │
      │  startSun(96,200) [ 1 ]     [ 2 ]     [ 3 ]  endMoon(624,200) │
      │                 x=240      x=360      x=480   slots y=214    │
260   ├──────────────────────────────────────────────────────────────┤
      │        ┌──────┐     ┌──────┐     ┌──────┐   panels y=372      │
      │        │ sky  │     │ sky  │     │ sky  │   120×120           │  zone B
      │        │ act  │     │ act  │     │ act  │   x=240/360/480     │
      │        └──────┘     └──────┘     └──────┘                     │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-panel items (L2, L3): slots at x = 180 / 300 / 420 / 540 (124 × 64 → 110 × 64 to keep 10 px gaps: slot w becomes 110) and panels at the same x. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.skyStrip` centred (360, 108); `ART.arcGuide` drawn dashed; `ART.horizonBand` centred (360, 147) drawn ABOVE the strip sun in depth so the setting sun passes behind it; `ART.stripSun` starts at (110, 140); the strip `ART.moon` (drawn at size 40) waits at (610, 140) at alpha 0.
- `ART.startSun` (96, 200), `ART.endMoon` (624, 200).
- Slots: `makeTile` 124 × 64 (110 × 64 for four) with `ART.slot` tokens, dashed while empty; `ART.slotNumeral` centred, `THEME.colour.inkSoft` while empty, `THEME.colour.structure` when filled (the placed panel sits on top at scale 0.46, so the numeral is drawn at the slot's bottom-right corner (+44, +20) at 18 px once filled).
- Panels: `makeTile` 120 × 120 with `ART.panelDay` or `ART.panelNight` tokens; `ART.panelHorizon` at (0, +20) in every panel; contents per the Content tables; the tile's selected look is not used (a tapped panel either glides or nudges).
- `ART.showRing` behind the correct next panel when the show-me step fires.
- Tap floors: panels 120 ≥ 80; slots 110-124 × 64 (slots are tap targets only for undo). Gaps ≥ 12 (panels at 120 px pitch: 4 panels → 120 w on a 120 pitch would touch; therefore four-panel items use 108 × 108 panels on the 120 pitch, gap 12; the glyphs inside scale by 0.9).
- Tab order: the panels left to right, then the rail slots left to right.

## Content
Language-neutral (no words on the play screen; the moments are pictures). Moment table — sun/moon glyph position inside a panel (tile-centre relative) and its arc position on the strip:

| moment | panel | glyph | glyph offset | strip arc position |
|---|---|---|---|---|
| sunrise | `ART.panelDay` | `ART.sun` | (−36, +8) low left | (110, 140) |
| morning | `ART.panelDay` | `ART.sun` | (−20, −16) | (235, 92) |
| midday | `ART.panelDay` | `ART.sun` | (0, −34) high | (360, 72) |
| afternoon | `ART.panelDay` | `ART.sun` | (+20, −16) | (485, 92) |
| sunset | `ART.panelDay` | `ART.sun` | (+36, +8) low right | (610, 140) |
| night | `ART.panelNight` | `ART.moon` + 3 × `ART.star` | (0, −22) | sun sets; moon at (610, 96) |

Activity glyph per moment (L1-L2 only), variant A / variant B: sunrise → `ART.actBowl` / `ART.actBrush`; midday → `ART.actBall` / `ART.actApple`; sunset → `ART.actPlate` / `ART.actBath`; night → `ART.actBed` / `ART.actBook`.

Items (the correct order is the listed order; zone B shows them shuffled):
- **L1** (three panels, variant A activities): (sunrise, midday, night) · (sunrise, sunset, night) · (midday, sunset, night) · (sunrise, midday, sunset)
- **L2** (four panels): (sunrise A, midday A, sunset A, night A) · (sunrise B, midday B, sunset B, night B) · (sunrise A, midday B, sunset A, night B) · (sunrise B, midday A, sunset B, night A)
- **L3** (four SKY-ONLY panels, no activity glyph): (sunrise, midday, sunset, night) · (sunrise, morning, midday, night) · (sunrise, midday, afternoon, sunset) · (morning, midday, afternoon, night)

Play list: 8 items per Rules; the shuffled zone-B order never places the panels already in the correct left-to-right order (reshuffle if it does); no item repeats within a session.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive items completed with no out-of-turn tap → next item from the next level up (cap L3).
- Adaptation: an item with any out-of-turn tap, or 2 consecutive items not completed cleanly → next item one level down (floor L1).
- What happens on a correct answer: per tap `tone("tap", k)`, `ANIM.pop`, `ANIM.glide` + `ANIM.shrinkToSlot` into slot k, strip sun `ANIM.arcMove` (or `ANIM.sunSet` + `ANIM.moonRise` for night); on the last slot `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], owl `ANIM.hoot`, rail dot, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Later moment tapped first (salience / cycle confusion): `ANIM.nudge` + `tone("nudge")`; the strip sun glides to the correct next arc position and pulses, then returns. No text.
  - Moon panel tapped before the sunset panel (evening/night confusion): the same cue — the strip sun goes to the low-right position and pulses (the sun is still up).
  - Sunrise/sunset swapped (side confusion): the same cue — the strip sun travels to the correct side, showing the direction of travel.
  - Second out-of-turn tap on the same slot: cue again + `ART.showRing` on the correct next panel; tapping it completes the slot as solved-with-help.
  - A placed panel tapped: undo (glides back), never an error.
- Retry behaviour: per slot: attempt 1 → attempt 2 after the sun cue → attempt 3 with the show-me ring. No attempt 4. An item with any wrong tap is not "clean" for progression.
- Finish condition: 8 items. No losing state; no clock of any kind (an inactivity cue only: after 8 s without a tap the strip sun pulses once at the correct next position).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Day and Night". No words on the play screen (5-6 band); the slot numerals 1-4 are the only characters.

## Sound
`tone("tap", k)` on the k-th correctly placed panel (pitch climbs through the day); `tone("correct")` on item complete; `tone("nudge")` on an out-of-turn tap; `tone("tap")` on undo; `tone("finish")` once. Silent under `?sound=off`. No sound carries meaning the strip does not also show.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the sky strip, four slots and four panels fully visible, panels separate).
- [ ] Keyboard operable (Tab across the panels then the slots; Enter places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (out-of-turn taps never end the session; the show-me ring always completes the slot).
- [ ] Tapping the midday panel first makes the strip sun glide to the low-left position, pulse, and come back; the panel stays in zone B.
- [ ] Placing the night panel makes the strip sun sink behind the band and the moon rise with three stars; the sun never simply vanishes mid-sky.
- [ ] Tapping the moon panel before the sunset panel moves the strip sun to the low-right position and pulses it.
- [ ] Two out-of-turn taps on the same slot make the correct panel pulse a ring; tapping it fills the slot.
- [ ] Tapping a panel already in the rail returns it to zone B and the strip sun steps back.
- [ ] The third level shows panels with no activity pictures — only sun height/side or the moon — including an item with no night panel.
- [ ] Two clean items in a row bring four panels; an item with a wrong tap brings three next.
- [ ] The finish screen shows the arc with the sun at every position and the four moments in order, and no score.
- [ ] If the toothbrush emoji is missing on the device, a bowl appears in its place.
- [ ] With `?sound=off` nothing is audible.
