# 112 — Centimetre Reader

## Identity
- Slug: `centimetre-reader`
- Subject / topic: Mathematics / reading the length of an object on a centimetre ruler when the object does not start at 0
- Age band: `6-8`
- Interaction pattern: `P11` — keypad entry (one-digit answers 2-9; physical keyboard digits also work)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P11. Content is language-neutral (a ruler, numerals, the unit "cm" — the same abbreviation in all 11 languages); no `LOCALE_DATA`. Metric only; no inches anywhere. Game 111 (cubes) is the natural predecessor: this game moves from counted units to a numbered scale, levelled to the top of the 6-8 band per F-31.

## Learning
- Objective: Types the length in whole centimetres of an object lying on a cm ruler when the object's left end sits at a tick other than 0, by counting the intervals it covers rather than reading the number at its right end.
- Prerequisites: Reads numerals to 20; has measured with unit cubes laid end to end (game 111); can type a digit on a keypad.
- Curriculum links: F-114 (starts at 1 / at the ruler's end; counts ticks not intervals — responses: objects at non-zero offsets, intervals highlighted), F-21 ("length with non-standard then standard units (cm/m)" in all 12 systems), F-31 row "Length with units (cm/m)" — conservative 7-8, earliest 6 → 6-8 (US 2.MD.A.1 "measure the length of an object by selecting and using appropriate tools such as rulers"; England Y2 "choose and use appropriate standard units to estimate and measure length (m/cm)"; Germany Klasse 2 "Längen messen: cm, m"; France CE1 "mesurer des longueurs … cm, m"; Netherlands groep 4 "meten met de liniaal"; Spain 1º ciclo "cm, m"; Brazil EF02MA16 "unidades de medida de comprimento … centímetro e metro"; Sweden åk 1-3 "mätning av längd … vanliga måttenheter"; Finland grade 2 "senttimetri, metri").
- Common misconceptions (F-114, F-101), each with this game's response:
  1. **Reading the number under the object's right end ("it ends at 7, so it is 7 cm").** Response: every object starts at a non-zero tick, so the right-end reading is always wrong by the offset. On that answer the ruler enacts the count: the intervals under the object highlight one by one from the object's LEFT end (`ART.interval` bands, `ANIM.bandIn`, 250 ms apart, `tone("tap", k)`) with a badge counting 1, 2, 3 … on each; the numeral under the object's right end is NOT highlighted. The child sees that 3 → 7 covers 4 intervals.
  2. **Counting the tick marks instead of the intervals (3, 4, 5, 6, 7 → "5").** Response: the same interval enactment; the badges sit in the SPACES between ticks, never on the ticks, and the first badge appears in the first space to the right of the object's left end — the count is of spaces.
  3. **Starting the count at the object's left tick number ("it starts at 3, so 3, 4, 5, 6, 7 is … ") or subtracting wrongly (7 − 3 = 3).** Response: the enactment starts with the left-end tick pulsing (`ART.tickMark` on the start tick, `ANIM.pulse`) with NO badge on it, then the first interval badge "1"; on attempt 3 the difference is also shown as `ART.eqText` "7 − 3 = 4" under the ruler, built after the count (never instead of it).
  4. **Ignoring the ruler and guessing from the picture (a "long-looking" object typed as 9).** Response: the object is always drawn exactly on the ruler with both ends on ticks, and at L2-L3 the object changes shape and thickness independently of length (a thin 8-cm needle, a fat 4-cm sponge), so appearance never predicts the number (F-103); the enactment always counts.
  5. **Two-digit reflex (typing "10" for a 1-cm offset object 1 … 10 read as "ten").** Response: the display accepts two digits so the error can be made; the count shows the true number of intervals; no object is longer than 9 cm.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Centimetre Reader"): the ant (`ART.ant`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: a crayon from 2 to 6 → 4 cm).** The Play scene builds: the dot rail of 12 dots at y = 28 (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the ruler (`ART.ruler`, 560 × 60) centred at (360, 200), its 0 tick at x = 100 and each cm = 40 px, so tick k is at x = 100 + 40 k for k = 0 … 13 (the ruler shows 0 to 13); numerals 0 … 13 under the ticks (`ART.tickLabel`, 16 px) and the unit `ART.unitLabel` "cm" at the ruler's right end (660, 226); whole-cm ticks are `ART.tick` (h 20), half-cm ticks `ART.halfTick` (h 10) at L2+ only. The object — the crayon (`ART.crayon`, 160 × 24 for 4 cm; width = length × 40) — lies on top of the ruler at y = 150 with its left end exactly on tick 2 (x = 180) and its right end on tick 6 (x = 340). The ant sits at (60, 150) beside the ruler's left end. To the right of the stage, the display card (`ART.card`, 160 × 84) at (600, 110) with `ART.display` (52 px) empty and `ART.unitLabel` "cm" just after the display digits (the unit is part of the card so the child types only the number); under the card the caption `S("howLong")` ("How long is it?") at (600, 170), 20 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 160. Zone B: the keypad — nine keys (`ART.key`, 60 × 60) in a 3 × 3 grid at x = 292 / 360 / 428, y = 296 / 364 / 432, labelled 1-9 in phone order; a fourth row at y = 500: backspace (`ART.key` with `ART.backGlyph`) at (292, 500) and 0 at (360, 500). Zone C: OK (`makeButton ok`) at (560, 500), disabled until the display holds a digit.
3. **Typing.** Each digit tap appears on `ART.display` (`ANIM.digitIn`), `tone("tap")`; up to two digits (a third tap is ignored); backspace removes the last digit; physical keys 0-9, Backspace, Enter do the same. OK enables at the first digit.
4. **Check.** The child taps OK (or Enter).
   - **Correct (4):** the display `ANIM.pop`s, `tone("correct")`; the intervals under the object highlight once anyway (bands 1 … 4 with badges and rising tones) so the interval count is modelled on every success (F-43); `GameCore.showPraise(scene, key)` with the next praise key; the ant `ANIM.march` (a 20-px walk along the ruler and back); the rail dot fills; after 900 ms the next item builds (`ANIM.appear`) with an empty display.
   - **Wrong (6 — the right-end number):** `tone("nudge")`; the display clears with `ANIM.nudge`; the enactment plays: the start tick pulses (`ART.tickMark` on tick 2), then `ART.interval` bands appear left to right under the object with badges 1, 2, 3, 4 (the bands stay visible); OK disables until a digit is typed. Attempt 2 with the counted intervals in view.
   - **Wrong (5 — counted the ticks):** the same enactment; the badges are in the spaces, and the start tick carries no badge.
   - **Wrong (2, 3 or any other):** the same enactment.
   - **Wrong again (attempt 2):** the enactment again, then `ART.eqText` "6 − 2 = 4" builds under the ruler (`ANIM.appear`) at (360, 250), then the show-me: the correct answer builds itself on the display (`ANIM.digitIn`), stays 1200 ms and clears; the child re-types it and taps OK, which now carries the show-me ring (`ART.showRing`, `ANIM.showMe`); the item completes as solved-with-help (no praise pop). A still-wrong re-type rebuilds the answer again until it is entered.
5. **Re-queue** (F-41): an item answered wrong first-try re-enters the play list after 2 intervening items with a different object shape and a different offset of the same length; the item count stays 12 (the re-queued item replaces the last unplayed item of the same level).
6. **Items 2-12.** Built from the level pools in Content by the Rules. L1: offsets 1-2, lengths 3-5, one object shape (crayon), whole-cm ticks only. L2: offsets 2-5, lengths 2-7, three object shapes whose thickness varies independently of length, half-cm ticks drawn (the objects still end on whole ticks). L3: offsets 3-6, lengths 4-9, the ruler shown with its 0 hidden under the ant (the ruler's left 40 px are covered by `ART.cover` so the child cannot count from 0 at all and must count intervals under the object), objects may be drawn UNDER the ruler (below it, y = 250) instead of on top.
7. **Finish** (after 12 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the ant at (360, 210) with `ANIM.celebrate`. Zone B: the twelve lengths as chips (`ART.lengthChip`, 64 × 36, label "4 cm" 18 px) in two rows of six (y = 370 and y = 420; x = 360 − 2.5 × 72 + i × 72), each with a tiny bar beneath (`ART.miniBar`, width = length × 6) — a record of the measurements; first-try items carry `ART.dotFull` at their left, helped items `ART.dotEmpty` — not a score. Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 6 minutes: 12 items × (read + type + Check + count ≈ 25-30 s).

## Art registry
```js
const ART = {
  ant:        { kind: "emoji", value: "🐜", size: 64 },
  ruler:      { kind: "shape", shape: "roundRect", w: 560, h: 60, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 6 },
  tick:       { kind: "shape", shape: "rect", w: 2, h: 20, fill: "ink" },
  halfTick:   { kind: "shape", shape: "rect", w: 2, h: 10, fill: "inkSoft" },
  tickLabel:  { kind: "text",  value: "", size: 16, font: "body", color: "ink" },
  unitLabel:  { kind: "text",  value: "cm", size: 18, font: "body", color: "inkSoft" },
  cover:      { kind: "shape", shape: "roundRect", w: 44, h: 68, fill: "bg", radius: 6 },                                   // hides the ruler's 0 at L3 (drawn under the ant)
  crayon:     { kind: "shape", shape: "roundRect", w: 160, h: 24, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 6 },   // w = length × 40
  needle:     { kind: "shape", shape: "rect", w: 320, h: 8, fill: "structure" },                                             // thin; w = length × 40; a 6-px circle (surface) at its right end
  sponge:     { kind: "shape", shape: "roundRect", w: 160, h: 44, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 12 },      // fat; w = length × 40
  interval:   { kind: "shape", shape: "rect", w: 40, h: 60, fill: "accent" },                                               // one cm band under the object, drawn at 30 % alpha over the ruler
  intBadge:   { kind: "shape", shape: "circle", r: 11, fill: "structure" },                                                 // numeral 13 px display, color bg, centred in a band
  tickMark:   { kind: "shape", shape: "rect", w: 6, h: 72, fill: "accent" },                                                // the start tick emphasised
  eqText:     { kind: "text",  value: "", size: 28, font: "display", color: "inkSoft" },
  card:       { kind: "shape", shape: "roundRect", w: 160, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  display:    { kind: "text",  value: "", size: 52, font: "display", color: "ink" },
  key:        { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // digit 28 px display ink
  backGlyph:  { kind: "text",  value: "⌫", size: 28, font: "display", color: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  lengthChip: { kind: "shape", shape: "roundRect", w: 64, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniBar:    { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },                                              // w = length × 6
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Objects are shapes so that their ends sit exactly on ticks; they differ by shape and thickness, never by colour alone.

## Animation registry
```js
const ANIM = {
  digitIn:   { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a digit appears on the display (from alpha 0, scale 0.6); also the show-me digits" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a wrong answer (then its text is cleared)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "tickMark on the start tick before the bands; display card after 8 s idle" },
  bandIn:    { alpha: 0.3, duration: 200, ease: "Sine.Out", trigger: "each interval band under the object, 250 ms apart (from alpha 0), with its badge via badgeIn" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "interval badges in turn (from alpha 0, scale 0.5)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "display on a correct answer" },
  march:     { x: "+=20", duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "ant on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new object; eqText (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "bands, badges, tickMark and eqText when the next item builds" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish ant" }
};
```
No flashing: `showMe` cycles at 1 Hz; bands appear once each and stay.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ ant(60,150)   ▐═══ crayon ═══▌ (on ticks 2..6, y=150)  ┌──────┐ │
      │                                                       │ 4 cm │ │  zone A
      │ ┌─────────────────────────────────────────────┐       └──────┘ │
      │ │ 0   1   2   3   4   5   6   7 … 13     cm   │ ruler (360,200)│
      │ └─────────────────────────────────────────────┘  "How long is it?"│
      │              "6 − 2 = 4" (360,250) attempt 3 only       (600,170)│
260   ├──────────────────────────────────────────────────────────────┤
      │              [1] [2] [3]   y=296                              │
      │              [4] [5] [6]   y=364     keys 60×60               │  zone B
      │              [7] [8] [9]   y=432     x=292/360/428            │
480   ├──────────────────────────────────────────────────────────────┤
      │              [BK][0]       y=500            [   OK   ] (560,500)│
560   └──────────────────────────────────────────────────────────────┘
```
Tick k at x = 100 + 40 k. An object of length n starting at offset o spans x = 100 + 40 o … 100 + 40 (o + n); the largest case (o = 6, n = 9 → tick 15) does not fit, so Content caps o + n ≤ 13. At L3 the object may lie under the ruler at y = 250 instead of above it (the eqText then moves to y = 90).

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 12 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 239 + i × 22); filled dots use `ART.dotFull`. `t("question_x_of_y")` at (360, 48).
- `ART.ruler` centred (360, 200): `ART.tick`s at x = 100 + 40 k from y = 172 down; `ART.tickLabel` numerals at (100 + 40 k, 214); `ART.halfTick`s at x = 120 + 40 k (L2+ only); `ART.unitLabel` at (660, 226). `ART.cover` at (100, 200) under the ant at L3.
- The object (`ART.crayon` / `ART.needle` / `ART.sponge` with w = length × 40) centred at (100 + 40 o + 20 n, 150), or y = 250 when the item says "under".
- Cue marks: `ART.tickMark` centred on the start tick's x, y = 200; `ART.interval` bands centred at (100 + 40 (o + i) + 20, 200) for i = 0 … n − 1, alpha 0.3; `ART.intBadge` at each band's centre with its numeral in `THEME.colour.bg` 13 px `THEME.font.display`; `ART.eqText` at (360, 250).
- `ART.card` at (600, 110) with `ART.display` centred (52 px `THEME.font.display` `THEME.colour.ink`) followed by `ART.unitLabel`; caption `S("howLong")` at (600, 170). `ART.ant` at (60, 150).
- Keypad: 11 × `makeTile` 60 × 60 with `ART.key` tokens; digit labels 28 px `THEME.font.display` `THEME.colour.ink`; the backspace tile's label is `ART.backGlyph`. Gaps 8 (pitch 68) — accepted for a keypad whose neighbours are equivalent-risk targets; every key ≥ 56.
- OK: `makeButton ok` at (560, 500), alpha 0.5 while disabled; `ART.showRing` around it during show-me.
- Tab order: keys 1-9 in reading order, backspace, 0, then OK. Physical keyboard: `keydown` for 0-9, Backspace, Enter (PATTERNS P11).
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral except one caption ("How long is it?"), a game-specific string. The unit label "cm" is identical in all 11 languages and is art (`ART.unitLabel`).

Items as (object; offset o; length n = answer; placement). o + n ≤ 13 always.
- **L1** (crayon only; offsets 1-2; lengths 3-5; on top): (crayon; 2; 4; on) · (crayon; 1; 3; on) · (crayon; 2; 5; on) · (crayon; 1; 4; on) · (crayon; 2; 3; on) · (crayon; 1; 5; on)
- **L2** (three shapes, thickness independent of length; offsets 2-5; lengths 2-7; half ticks drawn; on top): (needle; 3; 7; on) · (sponge; 4; 2; on) · (crayon; 5; 6; on) · (needle; 2; 4; on) · (sponge; 3; 5; on) · (crayon; 4; 7; on) · (needle; 5; 3; on) · (sponge; 2; 6; on)
- **L3** (0 hidden under the ant; offsets 3-6; lengths 4-9; some under the ruler): (needle; 4; 9; under) · (sponge; 6; 4; on) · (crayon; 3; 8; under) · (needle; 5; 7; on) · (sponge; 4; 8; under) · (crayon; 6; 6; on) · (needle; 3; 9; under) · (sponge; 5; 5; under)

Play list: 12 items with re-queue (How it plays §5); start at L1; shuffle within the level without repeats; level changes per Rules; if a pool is exhausted it is reused reshuffled. Two consecutive items never share an answer, and never share an offset.

Worked example: item 1 (crayon 2→6) types 6 → the start tick pulses, four coral bands with 1, 2, 3, 4 appear; types 4 (helped) · item 2 (crayon 1→4) types 3 first-try · item 3 first-try → L2 · item 4 (sponge 4→6, fat) types 2 first-try · item 5 (needle 3→10, thin) types 7 first-try → L3 · item 6 (needle 4→13) types 13 → bands count to 9; types 9 (helped) → L2 · the re-queued item 1 returns as (needle; 1; 4) two items later · items 8-12 first-try → Finish shows twelve "n cm" chips with bars.

## Rules
- Item count: 12 (including re-queued repeats, which replace unplayed items).
- Difficulty progression: after 2 consecutive first-try correct answers, the next item comes from the next level up (cap L3). "First-try correct" = the first OK was correct.
- Adaptation: a wrong answer on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned; a missed item re-queues after 2 items.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no key tapped, the display card `ANIM.pulse`s once; repeats every 8 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the display, `tone("correct")`, the intervals highlight once with badges and rising tones, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, ant `ANIM.march`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Right-end number typed (6 for 2→6)**: `tone("nudge")`, display clears with `ANIM.nudge`; the start tick pulses, then the bands 1 … 4 appear left to right under the object and stay.
  - **Ticks counted (5 for 2→6)**: the same enactment; badges sit in the spaces and the start tick has none.
  - **Offset or a subtraction slip typed (2, 3)**: the same enactment; on attempt 3 `ART.eqText` "6 − 2 = 4" builds under the ruler after the count.
  - **Two-digit reflex (13 for 4→13)**: the same enactment (nine bands).
  - **A third digit typed**: ignored (no error, no sound).
- Retry behaviour: attempt 1 unaided → attempt 2 with the counted intervals in view → attempt 3: the equation shows, the answer builds itself on the display and the child re-types it with the ringed OK; solved-with-help. No attempt 4 (a still-wrong re-type just rebuilds the answer again until it is entered).
- Finish condition: 12 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Centimetre Reader"
  - `howLong` = "How long is it?"
  - The unit "cm" is art (`ART.unitLabel`), not a string, because it is identical in every language.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on each key; `tone("tap", k)` per interval band during the count (pitch climbs with the length, F-213); `tone("correct")` on a correct answer; `tone("nudge")` on a wrong answer (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, OK, "Question 3 of 12", "All done!", "Play again", "Menu" and the praise pops; "How long is it?" changes once translations are loaded; "cm" stays "cm".
- [ ] Works at narrow width: in a 400-px-wide iframe the ruler from 0 to 13, the object, the display card, all eleven keys and OK are visible and separate.
- [ ] Keyboard operable: Tab walks the keys then OK; Enter taps; physical digit keys type, Backspace deletes, Enter checks.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong answers never end the session; after two wrong answers the correct number builds itself on the display and re-typing it completes the item.
- [ ] No object ever starts at the 0 tick; every object's ends sit exactly on whole-cm ticks.
- [ ] For a crayon from 2 to 6, typing 6 makes the 2 tick pulse and four coral bands count 1, 2, 3, 4 under the crayon; the 6 is not highlighted.
- [ ] Typing 5 for that crayon shows the same four bands, with no badge on any tick line.
- [ ] A correct answer still highlights the intervals with a count before the next item.
- [ ] At the second level a thin needle can be longer than a fat sponge, and half-centimetre ticks are drawn.
- [ ] At the third level the ruler's 0 is hidden under the ant and some objects lie below the ruler.
- [ ] A missed item comes back two items later as a different object at a different offset with the same length.
- [ ] The finish screen lists twelve "n cm" chips with bars, a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
