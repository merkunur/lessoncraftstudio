# 115 — Length Line-Up

## Identity
- Slug: `longest-shortest-line-up`
- Subject / topic: Mathematics / ordering objects by length (shortest to longest), judging the whole length and not the right-hand end or the thickness
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (per-tap judgement, the 5-6 default)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P4. Content is language-neutral (pencils drawn as shapes; no numerals except the rail's position numbers 1-4, which are P4's standard second cue); no `LOCALE_DATA`. The play screen carries three words.

## Learning
- Objective: Taps three (later four) pencils in order from shortest to longest, comparing their whole lengths — including when the pencils do not start at the same place and when the thickest pencil is not the longest.
- Prerequisites: Understands "short" and "long"; can tap a tile. No reading, no counting required.
- Curriculum links: F-103 (length/area used instead of the compared quantity; bigger object = more — response: size varied independently of the compared attribute from level 2), F-21 ("comparing/ordering quantities" and "length with non-standard then standard units" in all 12 systems), F-31 rows "Compare more/fewer/same" and "Sort by attribute" — conservative 6-7, earliest 4 → 5-6 (US K.MD.A.2 "directly compare two objects … which object has more of/less of the attribute" and 1.MD.A.1 "order three objects by length"; England Reception ELG / Y1 "compare … lengths and heights (long/short, longer/shorter, tall/short)"; Germany Klasse 1 "Längen vergleichen und ordnen"; France GS "ranger des objets selon leur longueur"; Netherlands groep 1-2 "ordenen op lengte"; Spain Infantil "largo/corto, ordenar"; Brazil EI03ET01 "comparar … comprimento"; Sweden förskoleklass "jämförelser av längd"; Finland esiopetus).
- Common misconceptions (F-103, F-101), each with this game's response:
  1. **Judging by the right-hand end (when the left ends are staggered, the pencil that sticks out furthest "is the longest").** Response: L3 staggers the left ends; when the child taps out of order, all remaining pencils slide to a common left edge (`ANIM.alignLeft`) for 1200 ms so the whole lengths line up, then slide back. The comparison is enacted, not explained.
  2. **Thicker is longer (the fat pencil "is the big one").** Response: from L2 the thickest pencil is never the longest; on a wrong tap the tapped pencil and the correct next pencil are compared directly — the part of the tapped pencil that extends beyond the shorter one is banded in `ART.extraBand` (accent) so the child sees "this one is longer than that one, so it comes later".
  3. **Ordering the wrong way (tapping the longest first).** Response: the first tap on the longest pencil nudges and `ART.orderIcon` in the prompt (three bars, short to long, with an arrow) `ANIM.pulse`s; the rail's first slot is the narrowest and its slots widen left to right, so the direction is visible without words.
  4. **Losing the order mid-way (forgetting which are already placed).** Response: placed pencils sit in the rail with their position numbers 1, 2, 3 (P4's standard cue) and are dimmed in the field; only the remaining pencils are enabled, so the "next shortest" is always chosen among what is left (stable order, F-101).
  5. **Near-equal lengths (a 30-px difference at L3).** Response: `ART.extraBand` still shows the difference on a wrong tap, and the align-left cue makes even a small overhang visible at a common edge.

## How it plays
1. **Start screen**: title "Length Line-Up", the giraffe (`ART.giraffe`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: three pencils, common left edge, lengths 120 / 200 / 280)**: rail of 8 dots at y = 28 (§6; no numbers for this band). The prompt at (360, 76): `ART.orderIcon` (three bars growing left to right with an arrow under them) beside `S("shortToLong")` ("Short to long") at 28 px `THEME.font.display` `THEME.colour.structure`. The field (zones A and B merged, as in P12 games): three pencils, each a `makeTile` of width = its length and height 80 (`ART.pencilTile` tokens — invisible body, the library's selected outline), stacked at y = 130, 220, 310, all with their LEFT end at x = 140; each pencil is drawn inside its tile as `ART.pencilBody` (length − 28 wide) plus `ART.pencilTip` at the right end, 36 px thick. The order of the three (which length is on which row) is shuffled per item. The giraffe stands at (640, 220) beside the field. The rail: three slots (`ART.railSlot`, dashed, widths 100 / 160 / 220 — narrow to wide) at y = 430 with a 12-px gap, laid left to right from x = 108 (slot 1 centre 158, slot 2 centre 298, slot 3 centre 488); each slot carries its position numeral (`ART.slotNum`) at its top-left. Zone C is unused (the rail sits at 390-470).
3. **Tapping in order**: the child taps a pencil.
   - **Correct (the shortest remaining)**: `ANIM.pop`, `tone("tap", k)` (k = its position, so the pitch climbs with the order), the pencil glides (`ANIM.glide`) into the next free rail slot, shrinking to scale 0.5 on the way (`ANIM.shrink`) so the three fit and keep their relative lengths; its position numeral appears on the slot (`ANIM.appear`); the pencil's field tile is removed. When the last pencil lands, `tone("correct")`, `GameCore.showPraise` (next key in rotation), the giraffe `ANIM.stretch` (a scale-y stretch), the rail slots' dashed outlines become solid (`ART.railSlotDone`), the rail dot fills; after 900 ms the next item builds (rail clears with `ANIM.rise`, new pencils `ANIM.appear`). First-try = every tap correct.
   - **Wrong (a longer pencil tapped before a shorter one)**: `ANIM.nudge` on the tapped pencil, `tone("nudge")`, it de-selects and stays enabled; then the compare cue: the tapped pencil and the correct next pencil both `ANIM.lift` slightly and `ART.extraBand` (accent, 35 % alpha) overlays the part of the tapped pencil that extends past the shorter one's right end, 1200 ms, then fades; at L3 (staggered left ends) the align-left cue plays FIRST (`ANIM.alignLeft`: every remaining pencil slides so its left end is at x = 140, holds 1200 ms with the band showing, slides back). All pencils are `setEnabled(false)` during a cue. The item counts as retried.
   - **Second wrong tap on the same step**: the cue again, then the correct next pencil gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it places it; the item continues (solved-with-help).
   - **Tapping a placed pencil in the rail**: it glides back to its field position at full size (P4 undo; the slot empties; no penalty).
4. **Items 2-8**: per Content/Rules. L1: 3 pencils, common left edge, all 36 px thick, length differences ≥ 80 px. L2: 3 pencils, common left edge, thickness varies (24 / 36 / 48 px) and the thickest is NOT the longest; differences ≥ 60. L3: 4 pencils (rows y = 120, 195, 270, 345; rail of four slots, widths 80 / 120 / 160 / 200, at y = 440), left ends staggered by up to 100 px so the right ends do not tell the order; differences ≥ 30.
5. **Finish**: `t("all_done")` (360, 110); the giraffe (360, 200) `ANIM.celebrate`; the summary = the eight lined-up sets as mini rails (`ART.miniBar` groups: 3-4 bars of heights 4 px, widths length ÷ 5, laid shortest to longest with a 4-px gap) in two rows of four from y = 340 (x = 120 + (i mod 4) × 160, rows 60 px apart) — a record of eight true orderings, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4-5 minutes (8 items × 20-35 s).

## Art registry
```js
const ART = {
  giraffe:      { kind: "emoji", value: "🦒", size: 88 },
  pencilTile:   { kind: "shape", shape: "roundRect", w: 200, h: 80, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 12 },   // invisible tile body; w = the pencil's length; selected look = library outline
  pencilBody:   { kind: "shape", shape: "rect", w: 172, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // w = length − 28; h = thickness (24 / 36 / 48); two 2-px structure lines along it
  pencilTip:    { kind: "shape", shape: "polygon", points: [[0,-18],[28,0],[0,18]], fill: "surface", stroke: "structure", strokeWidth: 3 },   // scaled in y to the thickness
  orderIcon:    { kind: "shape", shape: "rect", w: 12, h: 6, fill: "structure" },                    // drawn three times at widths 12 / 22 / 32, 6 px apart, with an 18-px structure arrow pointing right beneath
  railSlot:     { kind: "shape", shape: "roundRect", w: 160, h: 60, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed (lineDash [8,6]); w per slot
  railSlotDone: { kind: "shape", shape: "roundRect", w: 160, h: 60, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },
  slotNum:      { kind: "shape", shape: "circle", r: 12, fill: "structure" },                        // position numeral 16 px display, color bg
  extraBand:    { kind: "shape", shape: "rect", w: 80, h: 44, fill: "accent" },                      // 35 % alpha; w = the length difference, over the longer pencil's overhang
  showRing:     { kind: "shape", shape: "roundRect", w: 212, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },   // w = pencil length + 12
  miniBar:      { kind: "shape", shape: "rect", w: 40, h: 4, fill: "structure" },                    // finish summary; w = length ÷ 5
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Pencils are shapes so that lengths are exact; all pencils share one fill token so colour never marks the answer; thickness is the deliberate L2 distractor.

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a correctly tapped pencil, before it glides" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a pencil tapped out of order" },
  lift:       { y: "-=6", duration: 120, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "the tapped pencil and the correct next pencil during the compare cue" },
  glide:      { duration: 300, ease: "Sine.InOut", trigger: "pencil to its rail slot, or back to the field (x, y set at call)" },
  shrink:     { scale: 0.5, duration: 300, ease: "Sine.InOut", trigger: "pencil shrinking as it glides to the rail (parallel to glide); scale 1 on the way back" },
  alignLeft:  { duration: 300, ease: "Sine.InOut", trigger: "L3 compare cue: every remaining pencil's x tweens so its left end is at x = 140; reversed after 1200 ms" },
  bandIn:     { alpha: 0.35, duration: 200, ease: "Sine.Out", trigger: "extraBand over the overhang (from alpha 0)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "extraBand at the end of a cue" },
  pulse:      { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "orderIcon when the longest pencil is tapped first; the shortest pencil after 8 s idle" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new pencils; slot numerals (from alpha 0, scale 0.6)" },
  rise:       { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "rail contents clearing between items" },
  stretch:    { scaleY: 1.15, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "giraffe when a rail completes" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct next pencil (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish giraffe" }
};
```
No flashing: `showMe` at 1 Hz; every cue is one continuous motion.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            [icon] Short to long  (360,76)                    │
      │   ▐════════════▌               pencil A  y=130 (left x=140)  │
      │   ▐══════════════════════▌     pencil B  y=220     giraffe   │  zones A+B
      │   ▐═══════════════════▌        pencil C  y=310     (640,220) │
      │                                                              │
      │   (1)‑ ‑ ‑ ‑    (2)‑ ‑ ‑ ‑ ‑ ‑   (3)‑ ‑ ‑ ‑ ‑ ‑ ‑ ‑  rail y=430│
      │   slot 100      slot 160         slot 220   (dashed, widen)  │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The longest pencil (300 px at L3 with a 100-px stagger) reaches x = 540, clear of the giraffe at 640 − 44. Four-pencil items use rows y = 120 / 195 / 270 / 345 (tile height 80 → 5-px gaps, acceptable because pencils are placed in order and the neighbours are the alternatives) and a four-slot rail at y = 440.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22) → `ART.dotFull`. No numerals except the rail position numbers 1-4.
- Prompt: `ART.orderIcon` at (270, 76) and `S("shortToLong")` centred at (400, 76), 28 px `THEME.font.display` `THEME.colour.structure`, `wordWrap` 300, max two lines.
- Pencils: `makeTile` (length × 80) with `ART.pencilTile` tokens, positioned so the pencil's left end is at x = 140 + stagger; inside, `ART.pencilBody` (w = length − 28, h = thickness) and `ART.pencilTip` (scaled in y to thickness ÷ 36) at the right end. Placed pencils are re-drawn at scale 0.5 centred in their rail slot.
- Rail: `ART.railSlot` per slot (widths as listed) at y = 430 (three) or 440 (four); `ART.slotNum` at each slot's top-left corner (+14, +14 from the corner) with the numeral in `THEME.colour.bg` 16 px `THEME.font.display`; a completed rail swaps to `ART.railSlotDone`.
- Cue shapes: `ART.extraBand` over the longer pencil from the shorter pencil's right-end x to the longer pencil's right-end x (after alignment at L3), height = the longer pencil's thickness + 8, alpha 0.35. `ART.showRing` around the correct next pencil (w = length + 12).
- `ART.giraffe` at (640, 220). Tap floors: pencils ≥ 100 × 80 (5-6 floor 80); rail slots 100 × 60 are tappable only for the undo (a placed pencil) — their tile hit area is extended to 100 × 80. Gaps between pencil rows 10 (three) / 5 (four).
- Tab order: pencils top to bottom (creation order), then the rail slots. Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral. An item = the list of pencils as (length px; thickness px; left-end stagger px), listed shortest to longest; the ROW each pencil occupies is shuffled per item (never the same order as listed, never the same row order as the previous item).
- **L1** (three; thickness 36; stagger 0; differences ≥ 80): [120, 200, 280] · [100, 220, 300] · [140, 220, 300] · [120, 240, 320]
- **L2** (three; the thickest is never the longest; stagger 0; differences ≥ 60): [(120; 48), (200; 24), (280; 36)] · [(140; 36), (200; 48), (300; 24)] · [(100; 24), (180; 48), (260; 36)] · [(160; 48), (220; 36), (300; 24)]
- **L3** (four; thickness varies; left ends staggered so the right ends mislead; differences ≥ 30): [(150; 36; 100), (180; 24; 40), (210; 48; 0), (240; 36; 60)] · [(120; 24; 90), (160; 48; 0), (200; 36; 70), (230; 24; 20)] · [(140; 48; 80), (170; 36; 0), (200; 24; 60), (260; 36; 10)] · [(130; 36; 100), (170; 24; 30), (210; 48; 0), (300; 36; 40)]

In every L3 item at least one shorter pencil's right end is further right than a longer pencil's right end (verified by construction: e.g. 150 + 100 = 250 > 210 + 0). Play list: 8 items; start at L1; shuffled within the level without repeats; level changes per Rules; if a pool is exhausted it is reshuffled.

Worked example: item 1 (L1) taps the shortest, the middle, the longest → each glides into a widening slot with 1, 2, 3; praise · item 2 first-try → L2 · item 3 (L2: the fat 48-px pencil is the shortest) taps the fat one first → correct (it IS the shortest); then taps the longest → nudge; the longest and the middle lift and the longest's overhang is banded coral; taps the middle (helped) → L1 · items 4-5 first-try → L2 · items 6-7 first-try → L3 · item 8 (four pencils, staggered) taps the one sticking out furthest right first → nudge; all four slide to a common left edge, the overhang bands; then taps correctly (helped) → Finish shows eight mini rails of ascending bars.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try items (every tap correct) → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no tap, the shortest remaining pencil `ANIM.pulse`s once (this also demonstrates the mechanic on item 1); repeats every 8 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: per tap `ANIM.pop`, `tone("tap", k)`, glide + shrink into slot k with its numeral; on the last tap `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], giraffe `ANIM.stretch`, the rail becomes solid, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Longest tapped first (wrong direction): `ANIM.nudge`, `tone("nudge")`, `ART.orderIcon` pulses, then the compare cue against the shortest.
  - Thicker tapped as longer (L2): nudge + tone; the tapped pencil and the correct next one lift; `ART.extraBand` shows the tapped one's overhang for 1200 ms.
  - Right-end judgement (L3): nudge + tone; all remaining pencils align left, the band shows, then they slide back.
  - Near-equal pair misjudged (L3): the same cue; the band is narrow but drawn at full height.
- Retry behaviour: attempt 1 unaided → attempt 2 after the compare cue → attempt 3 with the show-me ring on the correct next pencil; tapping it continues the item as solved-with-help. No attempt 4 per step. An item with any wrong tap does not count as first-try. A placed pencil can always be taken back (no penalty).
- Finish condition: 8 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Length Line-Up"; `shortToLong` = "Short to long" (three words, paired with `ART.orderIcon`). No other text on the play screen.

## Sound
`tone("tap", k)` when the k-th pencil lands in the rail (pitch climbs with the order, F-213); `tone("correct")` when the rail completes; `tone("nudge")` on an out-of-order tap; `tone("tap")` when a pencil is taken back; `tone("finish")` once. Silent under `?sound=off`; no audio files. The band and the alignment carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; "Short to long" once translated).
- [ ] Works at narrow width (400-px iframe: the prompt, all pencils, the giraffe and the rail visible; the longest staggered pencil never reaches the giraffe).
- [ ] Keyboard operable (Tab cycles the remaining pencils top to bottom then the rail slots; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still completes every rail via the show-me ring).
- [ ] Tapping the shortest pencil sends it, shrunk, into the narrow first slot with a "1"; the next shortest goes to slot 2.
- [ ] Tapping a longer pencil too early wiggles it and shows a coral band over the part that sticks out past the shorter one.
- [ ] At the second level the fattest pencil is never the longest, and tapping it first is accepted when it is the shortest.
- [ ] At the third level four pencils start at different places; a wrong tap slides them all to one left edge before the band shows.
- [ ] Tapping a pencil in the rail sends it back to the field at full size and empties its slot.
- [ ] Two first-try items in a row bring thicker/thinner pencils, then four staggered pencils; a wrong tap brings three plain pencils again.
- [ ] No numeral appears except the rail's 1-4; no score anywhere.
- [ ] The finish screen shows eight small rows of ascending bars and no score.
- [ ] With `?sound=off` nothing is audible.
