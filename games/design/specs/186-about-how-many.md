# 186 — About How Many

## Identity
- Slug: `about-how-many`
- Subject / topic: Mathematics / estimating magnitude — is a scattered set about 10, about 20 or about 50? — checked by gathering the set into tens
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three band tiles; the gather-into-tens reveal follows every tap)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1 (the misconception hint plays on the PROMPT — here the beads gather into tens). Content is language-neutral (beads and numerals); no `LOCALE_DATA`. The child never counts the beads one by one and never types an exact number: the answer is a BAND, and the check is a count in TENS. Nothing is spoken.

## Learning
- Objective: Looks at a jar of 7-58 scattered beads for as long as they like and taps the band — about 10, about 20 or about 50 — that the set belongs to, then watches the beads gather into full tens to see which band was right.
- Prerequisites: Counts in tens (game 039 / 041); recognises a full ten-frame as "ten" (game 003); reads 10, 20, 50. No exact counting of large sets is expected or rewarded.
- Curriculum links: F-101 (cardinality and count-all: children who count every object one by one lose place past 20 — estimation in bands is the alternative route; length/spread bias makes a spread set look larger), F-108 (place value: tens as bundled rods that cannot be split; empty tens as an empty slot — the gather-into-tens reveal IS the bundling), F-103 (bigger beads = more), F-21 ("counting and cardinality to 20 then 100" in all twelve systems; estimation named in US 2.MD / England Y2 "estimate" / Germany "Schätzen" Klasse 1-2 / Netherlands "schatten" groep 3-4 / Sweden åk 1-3 "uppskattning" / Finland "arviointi"), F-31 row "Count to 100; number line to 100" — conservative 7-8, earliest 5 → 6-8. F-40 (the prediction before the reveal makes it a retrieval event), F-43 (the reveal is the feedback).
- Common misconceptions (F-101, F-103, F-108), each with this game's response:
  1. **Spread bias — a set spread across the whole jar "is about 50" though it is 18 (Piaget; F-101 length/spread).** Response: after the tap the beads gather (`ANIM.gather`) into ten-frames (`ART.tenFrame`) filling top row left to right; a full frame flips to a `ART.tenRod` with "10" on it; the rods line up with running labels 10, 20 … and the leftover beads stay in a part-filled frame. Eighteen spread beads become one rod and eight loose beads — visibly "about 20", nothing like five rods.
  2. **Clustered / small beads read as few (a tight heap of 47 "is about 20"; F-103 bigger = more).** Response: at L3 the bead size and spread are varied independently of the count (big beads for a small set, tiny beads packed for a large set); the same gather shows four rods and seven loose — the rods do not care how big the beads were.
  3. **Counting one by one and losing place, then guessing from the last number reached ("I got to 30-something").** Response: the jar has no order to count in, and the answer tiles are bands, not numbers — there is nothing to count TO; the gather counts in tens with one rising `tone("tap", k)` per rod, so the child hears 10-20-30-40 and sees why counting in tens is the safer route.
  4. **Anchoring on the reference jar (at L1 a jar of exactly 10 stands beside the target; the child answers "about 10" for every set that "looks like the small jar").** Response: the reference jar fades from L2 (cue-fading, F-46); at L1 a wrong band tap also gathers the REFERENCE jar's beads into one rod beside the target's rods so the two are compared as rods, not as jars.
  5. **Half-way sets (a set of 30 or 35 — between the bands).** Response: never used. Every set sits inside a band's window (about 10 = 7-13; about 20 = 16-24; about 50 = 42-58); the windows never touch, so there is always one right band and the reveal always shows it clearly (1 rod ± 3; 2 rods ± 4; 5 rods ± 8).

## How it plays
1. **Start screen**: title "About How Many", the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 9 beads; reference jar present)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the big jar (`ART.jar`, 300 × 190) centred at (400, 160) holding the beads (`ART.bead`, r 9) at the scatter positions listed in Content (a seeded pseudo-random scatter inside the jar's inner rectangle, no two beads closer than 22 px); the reference jar (`ART.jarSmall`, 120 × 110) at (120, 176) holding exactly 10 beads in a loose scatter with `ART.refLabel` "10" under it at (120, 244); the hedgehog at (120, 96) above it. Zone B: three band tiles (`ART.bandTile`, 150 × 96) at y = 370, x = 180 / 360 / 540 in the FIXED order 10, 20, 50 — each shows `ART.approxMark` (a small wave glyph, the "about" sign) at its top-left and the band numeral (`ART.bandNumeral`, 44 px) centred; the tiles read as a scale from few to many, so their order never shuffles (the correct tile varies by item; §13's "never the same slot twice running" is applied to the CORRECT band). Caption `S("aboutHowMany")` ("About how many?") at (360, 290), 22 px `THEME.colour.inkSoft`.
3. **Answering**: the child taps a band tile → `api.setSelected(true)`, `ANIM.pop`, `tone("tap")`; the tiles disable; the **gather** plays whichever tile was tapped: an empty `ART.tenFrame` (2 × 5, cells 20 px) `ANIM.appear`s at the jar's foot (first frame at (300, 268), next frames 110 px to the right — up to 6 frames for 58 beads, wrapping to a second row at y = 298 after the third); beads glide one at a time (`ANIM.gather`, 60 ms apart, top row left to right then bottom row — the ten-frame convention, F-48) into the current frame; when a frame is full it flips (`ANIM.rodFlip`) into a `ART.tenRod` (100 × 24) carrying its running label (`ART.rodLabel` 10, 20, 30 …) with `tone("tap", k)` for the k-th rod; the last, part-filled frame stays as a frame with its loose beads. When the gather ends, `ART.totalTag` (the exact count, 32 px) `ANIM.appear`s at the end of the rod row and the band that contains it is marked: the correct band tile gains `ART.bandGlow` (a soft outline) for 1200 ms.
   - **Correct band**: `tone("correct")` after the gather; praise pop (`GameCore.showPraise`, next key in rotation); the hedgehog `ANIM.nod`; rail dot fills; after 1200 ms the next item builds (rods and frames `ANIM.rise`, new beads `ANIM.appear`). First-try.
   - **Wrong band**: after the gather, `tone("nudge")`; the tapped tile `ANIM.nudge`s and de-selects; the reveal itself is the hint (the rods are there to see); at L1 the reference jar's ten also gathers into one `ART.tenRod` under the small jar (`ANIM.gather`) so "one rod" and "the target's rods" sit side by side. The rods stay on screen; the tiles re-enable. Attempt 2 (the item counts as retried).
   - **Wrong on attempt 2**: the rods `ANIM.pulse` once more, `ART.totalTag` pulses, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-10**: per Content/Rules. L1 = sets near the band centres (8-11, 18-22, 47-53) with the reference jar; L2 = sets at the band edges (7, 13, 16, 24, 42, 58) with no reference jar; L3 = edges plus bead size and spread varied against the count (big sparse beads for 7-13, tiny packed beads for 42-58, and the reverse).
5. **Re-queue** (F-41): an item wrong on the first tap re-enters after 2 intervening items with the same count and a fresh scatter, then, if wrong again, near the end; the item count stays 10.
6. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = the ten sets as rod rows: for each item a mini row of `ART.miniRod`s (one per full ten, 30 × 10) plus `ART.miniBead`s for the leftovers (r 3), with `ART.dotFull` at the left for first-try items and `ART.dotEmpty` for helped ones, ten rows from y = 300 at 18 px pitch (x from 180) — the child sees every set as its tens; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes (a 58-bead gather takes ≈ 3.5 s).

## Art registry
```js
const ART = {
  hedgehog:    { kind: "emoji", value: "🦔", size: 64 },
  jar:         { kind: "shape", shape: "roundRect", w: 300, h: 190, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 28 },   // inner scatter rectangle = 260 × 150 centred
  jarSmall:    { kind: "shape", shape: "roundRect", w: 120, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 20 },      // L1 reference jar of exactly 10
  refLabel:    { kind: "text",  value: "10", size: 24, font: "display", color: "inkSoft" },
  bead:        { kind: "shape", shape: "circle", r: 9, fill: "structure" },        // L3 sizes: r 6 (tiny) / r 12 (big) set per item
  tenFrame:    { kind: "shape", shape: "rect", w: 100, h: 40, fill: "surface2", stroke: "structure", strokeWidth: 2 },   // 2 × 5 cells of 20 px drawn as 1-px line strokes inside
  tenRod:      { kind: "shape", shape: "roundRect", w: 100, h: 24, fill: "structure", radius: 6 },
  rodLabel:    { kind: "text",  value: "", size: 16, font: "display", color: "bg" },          // 10, 20, 30 … on each rod
  totalTag:    { kind: "text",  value: "", size: 32, font: "display", color: "structure" },   // the exact count at the end of the rod row
  bandTile:    { kind: "shape", shape: "roundRect", w: 150, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  bandNumeral: { kind: "text",  value: "", size: 44, font: "display", color: "ink" },
  approxMark:  { kind: "text",  value: "≈", size: 26, font: "display", color: "inkSoft" },    // the "about" sign at each tile's top-left
  bandGlow:    { kind: "shape", shape: "roundRect", w: 162, h: 108, stroke: "good", strokeWidth: 4, radius: 18 },   // marks the band the total fell in (paired with the total tag — never colour alone)
  showRing:    { kind: "shape", shape: "roundRect", w: 162, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniRod:     { kind: "shape", shape: "roundRect", w: 30, h: 10, fill: "structure", radius: 3 },
  miniBead:    { kind: "shape", shape: "circle", r: 3, fill: "structure" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Bead scatter: the game seeds `Phaser.Math.RND` per item with the item's index and rejects any position closer than 22 px (16 px for tiny beads, 30 px for big) to an earlier bead, inside the jar's inner rectangle; L3 "packed" scatters use a 200 × 120 inner rectangle and "sparse" scatters the full 260 × 150.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "band tile tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong band tile after the gather" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "ten-frames, the total tag, new beads (from alpha 0, scale 0.6)" },
  gather:    { duration: 220, ease: "Sine.In", trigger: "one bead from its scatter position to the next ten-frame cell (x,y set at call); beads start 60 ms apart" },
  rodFlip:   { scaleY: 0.6, duration: 180, ease: "Sine.InOut", yoyo: true, trigger: "a full ten-frame squashes and comes back as a tenRod with its label (swap at the yoyo midpoint)" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the rod row and total tag on the second wrong tap" },
  glow:      { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "bandGlow on the band the total fell in (from alpha 0), then fades" },
  nod:       { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog on a correct band" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "rods, frames and the tag clearing between items" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct band tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```
No flashing: beads move one at a time; `showMe` cycles at 1 Hz; `glow` is a single fade in and out.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ hedgehog(120,96)   ┌──────────────────────────────┐           │
      │ ┌────────┐         │  ·  ·   ·    ·  ·   ·  · ·   │ jar       │
      │ │ · ·  · │ ref     │ ·   ·  ·  ·    ·   · ·   ·   │ (400,160) │  zone A
      │ │  ·  ·· │(120,176)│   ·  ·   ·  · ·  ·    ·  ·   │ 300×190   │
      │ └────────┘   "10"  └──────────────────────────────┘           │
      │              [10][20]  rods / frames from (300,268) →  "23"   │
      │              "About how many?" (360,290)                     │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────┐      ┌────────┐      ┌────────┐   y=370          │
      │   │≈  10   │      │≈  20   │      │≈  50   │   x=180/360/540  │  zone B
      │   └────────┘      └────────┘      └────────┘   (150×96)       │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The rod row runs from x = 300 at y = 268 (rods at pitch 110: 300, 410, 520), wrapping to y = 298 for the fourth to sixth; the caption moves to y = 320 while rods are shown. From L2 the reference jar is absent and the hedgehog sits at (120, 176).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.jar` centred (400, 160) with beads at their scatter positions (plain draws — the jar and beads are not tappable); `ART.jarSmall` at (120, 176) with 10 beads (r 7) and `ART.refLabel` at (120, 244), L1 only. `ART.hedgehog` at (120, 96) (L1) or (120, 176) (L2-L3).
- Gather row: `ART.tenFrame`s at (300 + 110 j, 268) for j = 0-2, then (300 + 110 (j − 3), 298) for j = 3-5; beads land in cells (frame x − 40 + 20 c, frame y − 10 + 20 r) for column c, row r; `ART.tenRod` replaces a full frame with `ART.rodLabel` centred on it; `ART.totalTag` 24 px to the right of the last frame/rod.
- Band tiles: `makeTile` 150 × 96 with `ART.bandTile` tokens; `ART.approxMark` at (−58, −30) inside the tile; `ART.bandNumeral` centred; selected look per §7.2. `ART.bandGlow` and `ART.showRing` behind a tile.
- Caption `S("aboutHowMany")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), one line.
- Tap floors 150 × 96 ≥ 56; gaps 30. Tab order: the three band tiles left to right. While a gather plays (≤ 3.5 s) the tiles are `setEnabled(false)`.

## Content
Language-neutral. Items as (count; band; bead size; spread). Windows: about 10 = 7-13; about 20 = 16-24; about 50 = 42-58 — no set outside these windows is ever used.
- **L1** (near the band centres; reference jar shown; beads r 9, full spread): (9; 10) · (20; 20) · (48; 50) · (11; 10) · (19; 20) · (52; 50) · (8; 10) · (22; 20) · (47; 50)
- **L2** (band edges; no reference jar; beads r 9, full spread): (13; 10) · (16; 20) · (24; 20) · (42; 50) · (7; 10) · (58; 50) · (12; 10) · (17; 20) · (44; 50)
- **L3** (band edges with size and spread against the count): (7; 10; big r 12; sparse) · (58; 50; tiny r 6; packed) · (24; 20; big r 12; sparse — looks like a lot) · (42; 50; tiny r 6; packed — looks like few) · (13; 10; big; sparse) · (16; 20; tiny; packed) · (55; 50; r 9; sparse) · (8; 10; tiny; packed) · (23; 20; big; sparse)

Play list of 10 per Rules with re-queue; the correct band never repeats more than twice running; no count repeats in a session except by re-queue (fresh scatter each time).

Worked example: item 1 (9, L1) taps 10 → the nine beads gather into one part-filled frame, "9" appears, the 10 tile glows; first-try · item 2 (48) taps 50 → four rods flip 10, 20, 30, 40 with rising notes and eight loose beads sit in a fifth frame, "48"; first-try → L2 · item 3 (24, spread wide) taps 50 → two rods and four loose, "24", the 20 tile glows; the tapped 50 nudges; taps 20 → helped → L1 · item 4 (11) first-try · item 5 = re-queued (24) taps 20 → first-try → L2 · item 6 (42) first-try · item 7 (13) first-try → L3 · item 8 (7 big sparse beads) taps 20 → one part-filled frame, "7"; taps 10 → helped · items 9-10 first-try → Finish shows ten rod rows.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). A single miss also re-queues the item (after 2 items, then a last look).
- What happens on a correct answer: the gather plays (beads into frames, full frames flip to rods with rising tones, the total tag appears, the band glows), `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], hedgehog `ANIM.nod`, rail dot, next item after 1200 ms.
- What happens on a wrong answer (per anticipated mistake):
  - A bigger band tapped for a spread set (spread bias): the gather shows the true rods (one or two) and the loose beads; the total tag and the glow mark the right band; the tapped tile nudges; `tone("nudge")`.
  - A smaller band tapped for a packed / tiny-bead set (size bias, L3): the same gather — four or five rods flip regardless of bead size; the tapped tile nudges.
  - "About 10" tapped for every set at L1 (anchoring on the reference jar): the reference jar's beads also gather into ONE rod under the small jar, beside the target's rods.
  - Second wrong tap: the rods and the total tag `ANIM.pulse`, the correct tile gains the show-me ring.
- Retry behaviour: attempt 1 (estimate) → attempt 2 with the rods on screen → attempt 3 with the show-me ring; solved-with-help; the item re-queues later with a fresh scatter. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45) — the child may look at the jar as long as they like before tapping.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "About How Many"; `aboutHowMany` = "About how many?". The tiles carry the ≈ sign and a numeral, not words.

## Sound
`tone("tap")` on a band tile; `tone("tap", k)` when the k-th rod flips (10, 20, 30 … climb in pitch — F-213); `tone("correct")` after the gather on a correct band; `tone("nudge")` after the gather on a wrong band; `tone("finish")` once. Silent under `?sound=off`; the rods and the total tag show everything the tones mark.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise and the caption change with the picker; the tiles read ≈ 10 / ≈ 20 / ≈ 50 in every language).
- [ ] Works at narrow width (400-px iframe: the jar, the reference jar, up to six frames/rods and the three tiles visible; the rod row wraps to a second line for 42-58 beads).
- [ ] Keyboard operable (Tab cycles the three band tiles; Enter picks; the jar and beads are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bands never end the session; the show-me ring always completes the item).
- [ ] The three tiles are always in the order 10, 20, 50 and never shuffle.
- [ ] After any tap the beads move one at a time into ten-frames, top row first, left to right; each full frame becomes a rod labelled 10, 20, 30 …, and the loose beads stay in a part-filled frame with the exact count shown at the end.
- [ ] Tapping 50 for 24 spread-out beads shows two rods and four loose beads, the 20 tile glows, and the 50 tile wiggles.
- [ ] At the first level a jar of exactly 10 stands beside the big jar; after a wrong tap its beads also gather into one rod. From the second level it is gone.
- [ ] At the third level a set of 7 big beads spread wide and a set of 58 tiny beads packed tight both gather into the right number of rods.
- [ ] No set of 14, 15, 25-41 or 59+ beads ever appears.
- [ ] A missed item comes back two items later with the beads in new positions, and again near the end.
- [ ] The finish screen shows each set as a row of little rods plus loose beads, with a filled dot for first-try items; no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each rod plays a higher note than the last.
