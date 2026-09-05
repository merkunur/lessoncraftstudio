# 177 — Decade Neighbours

## Identity
- Slug: `decade-neighbours`
- Subject / topic: Mathematics / the two tens either side of a two-digit number (47 lies between 40 and 50)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three or four "tens pair" tiles)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (numerals only) — the number words of de/nl/da, which say the ones before the tens, are exactly why the visual tens-then-ones anchor matters (F-108).

## Learning
- Objective: Reads a two-digit number and taps the tile naming the two tens it lies between (47 → "40 – 50"), with a 0-100 number line as the enacted check.
- Prerequisites: Reads two-digit numerals; counts in tens to 100 (games 016-020, 041).
- Curriculum links: F-108 (place value — digits treated as independent numbers; de/nl/da inverted number words), F-103 (comparison — "nearly 50" is not "in the 50s"), F-21 (counting to 100 and the number line to 100; place value tens/ones in all 12 systems), F-31 rows "Count to 100; number line to 100" (conservative 7-8, earliest 5) and "Place value tens/ones" (conservative 7-8) → 6-8 (US 1.NBT.B.2 / 2.NBT.A.1; England Y2 "recognise the place value of each digit … identify, represent and estimate numbers using … the number line"; Germany Klasse 2 "Zahlen bis 100 im Zahlenraum verorten"; France CE1 "encadrer un nombre entre deux dizaines"; Netherlands groep 4 "tientallen"; Spain 1º ciclo; Brazil EF02MA04; Sweden åk 1-3; Denmark 1.-2. klasse; Norway 2. trinn; Finland grades 1-2).
- Common misconceptions (F-108, F-103), each with this game's response:
  1. **Digits as independent numbers, or the spoken order followed — 47 read from its ones digit ("siebenundvierzig": seven first) → taps 70 – 80.** Response: the tile nudges; on the number card `ART.digitHi` outlines the TENS digit "4" and a row of four small rods (`ART.miniRod`) appears under it, then the ones digit "7" with seven small cubes (`ART.miniCube`); then the **zoom**: the 0-100 line zooms into 40 … 50 (`ANIM.zoomIn`) and the marker drops on 47 (`ANIM.drop`) between the two decade tags. The tens digit names the decade; the layout, not the word, is the anchor.
  2. **"Nearly 50 means in the fifties" — 49 → taps 50 – 60 (F-103 rounding confused with placing).** Response: the zoom into 40 … 50 shows the marker on 49, one tick BEFORE the 50 tag, which `ANIM.pulse`s; 49 has not reached 50.
  3. **Adjacent-decade slip — 47 → taps 30 – 40 (counting the tens from 1 or reading the lower neighbour as the one below the tens digit).** Response: the zoom; and before it the full 0-100 line highlights the tens tick 40 and 50 (`ART.tickGlow`) while the ten tags count up 10, 20, 30, 40 with `tone("tap", k)` — the tens digit IS the count of tens.
  4. **Treating a decade as a possible answer in itself (looking for a "47" tile).** Response: tiles are always pairs; the caption reads "Between which tens?"; the zoom shows the number BETWEEN two tags, never on one.

## How it plays
1. **Start screen**: title "Decade Neighbours", the tortoise (`ART.tortoise`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 47; tiles 40 – 50 / 30 – 40 / 70 – 80)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the number card (`ART.numberCard`, 160 × 110) at (360, 128) with `ART.bigNumeral` "47" (64 px); the tortoise at (110, 130). Below, the 0-100 line: `ART.lineBar` from x = 80 to x = 640 at y = 226 with a tick (`ART.tick`) every 56 px and a tag (`ART.tenTag`, 14 px) under each tick: 0, 10, 20 … 100; NO marker on it yet (the marker would give the answer). Zone B: three pair tiles (`ART.pairTile`, 150 × 90, `makeTile`) at y = 390, x = 180 / 360 / 540 labelled "40 – 50", "30 – 40", "70 – 80" (28 px, shuffled order). Zone C: empty. Caption `S("betweenWhich")` ("Between which tens?") at (360, 300), 24 px `THEME.colour.inkSoft`.
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (next key in rotation); as confirmation the marker (`ART.marker`) drops onto the line at 47 (`ANIM.drop`) between the glowing 40 and 50 ticks (`ART.tickGlow`) for 700 ms; the tortoise `ANIM.nod`s; rail dot fills; next item after 900 ms (`ANIM.appear`; the marker clears).
   - **Wrong — digit-swap pair (70 – 80 for 47)**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; the **digit cue**: `ART.digitHi` outlines the tens digit while `ART.miniRod` × 4 appear under the card (`ANIM.appear`, 100 ms apart, `tone("tap", 10)` each), then outlines the ones digit while `ART.miniCube` × 7 appear beside the rods (`tone("tap", 1)` each); then the **zoom**: the line container scales about the correct decade (`ANIM.zoomIn`, ×5.6 horizontally so 40 … 50 spans x = 80 … 640) revealing the unit ticks 41 … 49 (`ART.unitTick`) and the two decade tags enlarged (`ART.decadeTag` "40" and "50", 32 px); the marker drops on 47 (`ANIM.drop`, `tone("tap", 7)`); hold 1.2 s; the line zooms back (`ANIM.zoomOut`) keeping the small marker in place. Attempt 2 (the line now shows the marker — the cue stays).
   - **Wrong — adjacent or nearest-ten pair**: nudge + tone; the tens count-up (`ART.tenTag`s 10 … 40 grow in turn with `tone("tap", k)`), then the zoom as above. Attempt 2.
   - **Second wrong tap**: the zoom again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
   - Brute-force guard (P1, F-65): after a wrong tap the tiles re-shuffle positions; an item solved after any wrong tap is never first-try.
4. **Items 2-12**: per Content/Rules. L1: ones digit 2-8, three tiles, the line visible from the start. L2: ones digits 1 and 9 appear (edge numbers), three tiles. L3: four tiles including the digit-swap pair AND the nearest-ten pair, and the 0-100 line is HIDDEN until an error (it `ANIM.appear`s for the cue and stays for the item).
5. **A full worked session**: item 1 (47) ✓ · item 2 (23) ✓ → step up · item 3 (L2: 49) taps 50 – 60 ✗ → tens count-up, zoom shows 49 just before 50 → 40 – 50 ✓ (retried) → step down · item 4 (L1: 65) ✓ · item 5 (34) ✓ → step up · item 6 (L2: 81) taps 10 – 20 ✗ → digit cue (8 rods, 1 cube), zoom into 80 … 90 → 80 – 90 ✓ · item 7 (L2: 38) ✓ · item 8 (L2: 63) ✓ → step up · items 9-12 (L3, line hidden) ✓ ✓ (76: taps 60 – 70 ✗ → zoom) ✓ ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the tortoise (360, 200) `ANIM.celebrate`; the summary = one 0-100 line (`ART.lineBar` at y = 380, x = 80 … 640) with all twelve numbers as small markers (`ART.miniMarker`) at their positions, each labelled with its numeral in 14 px beneath, first-try items filled (`ART.dotFull` beside) and helped items hollow (`ART.dotEmpty`) — the line the child placed; optional `t("question_x_of_y")` with n = first-try items at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  tortoise:   { kind: "emoji", value: "🐢", size: 80 },
  numberCard: { kind: "shape", shape: "roundRect", w: 160, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  bigNumeral: { kind: "text",  value: "", size: 64, font: "display", color: "ink" },
  digitHi:    { kind: "shape", shape: "roundRect", w: 44, h: 76, stroke: "accent", strokeWidth: 3, radius: 8 },        // around one digit of the big numeral
  miniRod:    { kind: "shape", shape: "rect", w: 8, h: 40, fill: "structure", stroke: "bg", strokeWidth: 1 },            // one per ten, under the tens digit
  miniCube:   { kind: "shape", shape: "rect", w: 10, h: 10, fill: "accent", stroke: "bg", strokeWidth: 1 },              // one per one, under the ones digit
  lineBar:    { kind: "shape", shape: "rect", w: 560, h: 6, fill: "structure" },
  tick:       { kind: "shape", shape: "rect", w: 4, h: 24, fill: "structure" },
  unitTick:   { kind: "shape", shape: "rect", w: 2, h: 14, fill: "inkSoft" },                                             // 41 … 49 inside the zoomed decade
  tenTag:     { kind: "text",  value: "", size: 14, font: "display", color: "inkSoft" },                                  // 0, 10, … 100 under the ticks
  decadeTag:  { kind: "text",  value: "", size: 32, font: "display", color: "structure" },                                // the two decade ends while zoomed
  tickGlow:   { kind: "shape", shape: "circle", r: 18, stroke: "accent", strokeWidth: 4 },
  marker:     { kind: "shape", shape: "polygon", points: [[0,0],[-12,-22],[12,-22]], fill: "accent", stroke: "structure", strokeWidth: 2 },   // point on the line
  miniMarker: { kind: "shape", shape: "polygon", points: [[0,0],[-7,-13],[7,-13]], fill: "accent" },
  pairTile:   { kind: "shape", shape: "roundRect", w: 150, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },      // label 28 px display ink
  showRing:   { kind: "shape", shape: "roundRect", w: 162, h: 102, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12. Rods and cubes differ in size and shape, never colour alone; the glow is an outline with a position.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "rods/cubes under the card; the hidden line at L3; new item (from alpha 0, scale 0.6)" },
  grow:      { scale: 1.6, duration: 220, ease: "Back.Out", yoyo: true, trigger: "each tenTag in the tens count-up, 250 ms apart" },
  zoomIn:    { scaleX: 5.6, duration: 600, ease: "Sine.InOut", trigger: "line container scales horizontally about the correct decade's midpoint so that decade fills x = 80 … 640; unitTicks and decadeTags appear at the end" },
  zoomOut:   { scaleX: 1, duration: 500, ease: "Sine.InOut", trigger: "line container returns; unitTicks and decadeTags fade first" },
  drop:      { y: "+=0", alpha: 1, duration: 300, ease: "Bounce.Out", trigger: "marker falls onto the line from 40 px above (from alpha 0)" },
  pulse:     { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the decade tag the child overshot (nearest-ten error); tickGlow on confirm" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "rods, cubes, digitHi, zoom labels clearing" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tortoise on a correct tap" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish tortoise" }
};
```
The zoom is one smooth scale tween; nothing blinks. The line container is masked to x = 60 … 660 so zoomed ticks outside the decade are clipped, never drawn over the tiles.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "1 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ tortoise            ┌────────┐                               │
      │ (110,130)           │   47   │  numberCard (360,128)         │  zone A
      │                     └────────┘  rods/cubes under it y=190    │
      │  ┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼  line y=226, x=80..640     │
      │  0  10 20 30 40 50 60 70 80 90 100  tenTags y=246            │
260   ├──────────────────────────────────────────────────────────────┤
      │              "Between which tens?" (360,300)                 │
      │   [ 30 – 40 ]      [ 40 – 50 ]      [ 70 – 80 ]   y=390      │  zone B
      │     x=180            x=360            x=540    (150×90)      │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-tile items (L3) use x = 120 / 280 / 440 / 600 with 140 × 90 tiles (gap 20). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.numberCard` (360, 128) with `ART.bigNumeral` centred; `ART.digitHi` around the tens digit at (338, 128) or the ones digit at (382, 128); `ART.miniRod`s in a row under the card from (300, 192) at 12 px pitch; `ART.miniCube`s from (400, 192) at 13 px pitch (two rows of five when ones ≥ 6).
- Line: a container at (360, 226) holding `ART.lineBar`, 11 `ART.tick`s at x = 80 + 56 × i, `ART.tenTag`s at (x, 246); while zoomed: nine `ART.unitTick`s between the two decade ticks and `ART.decadeTag`s replacing the two tenTags at 32 px; `ART.marker` with its point on the line at x = 80 + 5.6 × n (n = the number) — in zoomed space it lands on the matching unit tick; `ART.tickGlow` around the two decade ticks on confirm.
- Tiles: `makeTile` 150 × 90 (140 × 90 at L3) with `ART.pairTile` tokens; label "40 – 50" 28 px `THEME.font.display` `THEME.colour.ink` (an en dash with spaces; language-neutral).
- Caption `S("betweenWhich")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 300), `wordWrap` 600, max 2 lines.
- `ART.tortoise` at (110, 130). `ART.showRing` behind the correct tile.
- Tap floors 150 × 90 / 140 × 90 (≥ 56); gaps 30 / 20. Tab order: tiles left to right.
- While a cue plays (digit cue ≈ 1.5 s + zoom ≈ 2.6 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (numerals only; one caption string). Each item = (number; correct pair; distractor pairs). Distractor classes: **swap** = the pair the digit-swapped number lies in; **adjacent** = the pair below or above; **nearest** = the pair the number would round into (for ones digit 9 the pair above; for ones digit 1 the pair below). Numbers ending in 0 never appear (a ten is not between two tens).

- **L1** (ones digit 2-8; three tiles: correct, swap, adjacent): 47 (40–50; 70–80, 30–40) · 23 (20–30; 30–40, 10–20) · 65 (60–70; 50–60, 70–80) · 34 (30–40; 40–50, 20–30) · 56 (50–60; 60–70, 40–50) · 28 (20–30; 80–90, 30–40) · 72 (70–80; 20–30, 60–70) · 45 (40–50; 50–60, 30–40)
- **L2** (ones digits 1 and 9 included; three tiles: correct, swap, nearest or adjacent): 41 (40–50; 10–20, 30–40) · 49 (40–50; 90–100, 50–60) · 38 (30–40; 80–90, 40–50) · 81 (80–90; 10–20, 70–80) · 19 (10–20; 90–100, 20–30) · 63 (60–70; 30–40, 50–60) · 92 (90–100; 20–30, 80–90) · 17 (10–20; 70–80, 20–30)
- **L3** (four tiles: correct, swap, nearest, adjacent; the line hidden until an error): 59 (50–60; 90–100, 60–70, 40–50) · 21 (20–30; 10–20, 0–10, 30–40 — here the swap pair and the nearest pair coincide, so 0–10 fills the fourth tile) · 68 (60–70; 80–90, 70–80, 50–60) · 91 (90–100; 10–20, 80–90, 0–10) · 39 (30–40; 90–100, 40–50, 20–30) · 84 (80–90; 40–50, 90–100, 70–80) · 11 (10–20; 0–10, 20–30, 90–100 — 11 is its own swap, so 90–100 fills the fourth tile) · 76 (70–80; 60–70, 80–90, 20–30)

Play list of 12 per Rules (shuffle within level; levels in order; no item repeats); tile order shuffled per item and re-shuffled after a wrong tap; the correct tile is never in the same slot twice running.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), marker drops between the two glowing decade ticks, tortoise `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")` and a tile re-shuffle):
  - Swap pair (digits independent / spoken order — 70–80 for 47): the digit cue (tens digit outlined with its rods, ones digit with its cubes), then the zoom into the correct decade with the marker.
  - Nearest pair (49 → 50–60; 41 → 30–40): the tens count-up 10 … 40 with growing tags, then the zoom; the overshot decade tag `ANIM.pulse`s while the marker sits one tick short of it.
  - Adjacent pair (47 → 30–40 or 50–60): the tens count-up, then the zoom.
- Retry behaviour: attempt 1 → attempt 2 after the cue (the marker stays visible on the small line) → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Decade Neighbours"; `betweenWhich` = "Between which tens?". Tile labels are numerals with an en dash.

## Sound
`tone("tap", k)` per rod (k = 10) and per cube (k = 1) in the digit cue; `tone("tap", k)` per ten in the count-up; `tone("tap", n mod 12)` when the marker drops; `tone("correct")`, `tone("nudge")`, `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken — no number words in any language.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 12", All done, Play again, Menu, praise; the caption once translated; tiles are numerals in every language).
- [ ] Works at narrow width (400-px iframe: the card, the whole 0-100 line with eleven tags, and four tiles at level 3 fully visible and separate).
- [ ] Keyboard operable (Tab/arrows between tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the ring always completes the item).
- [ ] No marker is on the line before the child answers (at level 3 the line itself is hidden until an error).
- [ ] Tapping 70 – 80 for 47 outlines the 4 with four rods, then the 7 with seven cubes, then the line zooms into 40 … 50 and a marker drops on 47.
- [ ] Tapping 50 – 60 for 49 zooms into 40 … 50 with the marker one tick before the pulsing 50.
- [ ] After a wrong tap the tiles change places; the correct tile is never in the same place on two consecutive items.
- [ ] A correct tap drops the marker between two glowing decade ticks before the next item.
- [ ] Two first-try corrects in a row bring numbers ending in 1 or 9, then four tiles with the line hidden; a wrong tap brings simpler items next.
- [ ] The finish screen shows one line with all twelve numbers marked and no score beyond the optional "n of 12".
- [ ] With `?sound=off` nothing is audible; with sound on, a rod sounds a bigger step than a cube.
