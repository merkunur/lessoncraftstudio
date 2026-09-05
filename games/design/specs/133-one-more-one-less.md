# 133 — One More One Less

## Identity
- Slug: `one-more-one-less`
- Subject / topic: Mathematics / one more and one less than a shown set, within 10
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three numeral tiles)
- Estimated build size: ~400 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (acorns and numerals); no `LOCALE_DATA`. Nothing is spoken; the play screen carries no words (band rule, F-204).

## Learning
- Objective: Looks at a set of 1-9 acorns marked with a "+1" or "−1" badge and taps the numeral (from three) that says how many there will be after one more arrives or one leaves.
- Prerequisites: Counts a set to 10 and names it with a numeral (games 001, 002). No reading.
- Curriculum links: F-4 ("1 more / 1 less" is on the UK reception/Y1 map), F-1 (counting to 10/20 in 13 of 15 sources), F-21 ("counting and cardinality to 20"), F-31 row "Count to 10-20, one-to-one" — conservative 6 → 5-6 (US K.CC.B.4c "each successive number name refers to a quantity that is one larger"; England Reception ELG / Y1 "given a number, identify one more and one less"; Germany Klasse 1 "Nachbarzahlen"; France GS "le nombre suivant / précédent"; Netherlands groep 2-3 "één meer, één minder"; Spain Infantil; Brazil EI03ET07; Sweden förskoleklass; Norway 1. trinn; Finland esiopetus "yhtä enemmän").
- Common misconceptions (F-101, F-105), each with this game's response:
  1. **Naming the set itself (taps 4 for a set of 4 with "+1"): the badge is ignored and the child just counts.** Response: the set's own numeral is always one of the three tiles; on that tap the ghost acorn (`ART.ghostAcorn`, the dashed outline standing at the end of the row) fills in as a real acorn with `ANIM.arrive`, and the whole row counts itself with `ART.countBadge`s 1 … 5 (`tone("tap", k)` rising), the last badge growing (`ANIM.lastBadge`) — the "one more" is enacted, not named.
  2. **Counting all from one again instead of counting on (count-all persists, F-105).** Response: on any wrong tap the enacted count badges the existing acorns quickly (150 ms apart, grouped) and then the arriving acorn slowly with its badge grown — the count is shown as "4 … and 5", the arriving one being the step.
  3. **One less answered as one more (or the reverse): the direction of the badge is missed.** Response: the badges differ in symbol AND colour AND motion — `ART.plusBadge` is a teal circle with "+1" and the ghost acorn stands at the end of the row; `ART.minusBadge` is a coral ring with "−1" and the LAST acorn is already half-faded (alpha 0.45) with the badge on it. On a wrong tap for a "−1" item that acorn floats away (`ANIM.leave`) and the remaining acorns count themselves.
  4. **Off-by-one the other way (taps 6 for 4 + 1) — jumps two.** Response: the same enacted count; the badges make the step visibly one acorn.
  5. **Reading a numeral in mirror (6 ↔ 9).** Response: numerals are never the only cue — the enacted count shows the set; and 6 and 9 are never both tiles on the same item.

## How it plays
1. **Start screen**: title "One More One Less", the squirrel (`ART.squirrel`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 3 acorns, "+1")**: rail of 8 dots (§6; no numeric progress for this band). Zone A: a log (`ART.log`, 520 × 40) at (360, 200) with the acorns standing on it in one row (`ART.acorn`, size 56, pitch 64, centred: x = 360 − (n − 1) × 32 + i × 64, y = 168); at the right end of the row the ghost acorn (`ART.ghostAcorn`, a dashed acorn outline) at x = 360 + (n − 1) × 32 + 64, y = 168, with `ART.plusBadge` sitting on its top-right (+22, −22). The squirrel at (90, 150) looks at the row. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480, labelled 3, 4, 5 (the set, the answer, the answer + 1) in a shuffled order. Zone C: empty. No caption; the badge is the prompt.
3. **Answering**: the child taps a numeral tile.
   - **Correct (4)**: `ANIM.pop` on the tile, `tone("correct")`, praise pop (rotation); the ghost acorn fills in as a real acorn (`ANIM.arrive`) and the squirrel `ANIM.hop`; the tapped numeral glides (`ANIM.glide`) to the label spot above the log (`ART.rowLabel` at (360, 100)); the rail dot fills; after 700 ms the next item builds (`ANIM.appear`).
   - **Wrong — the set's own numeral (3)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the enacted count: the existing acorns badge 1, 2, 3 quickly (`ART.countBadge`, 150 ms apart, `tone("tap", k)`), the ghost acorn fills in (`ANIM.arrive`) and its badge "4" appears grown (`ANIM.lastBadge`), and the big numeral `ART.totalNumeral` "4" shows at (360, 100) for 900 ms; then the badges and total fade (`ANIM.fadeOut`) and the ghost returns to dashed. Attempt 2.
   - **Wrong — any other numeral (5)**: the same enacted count. Attempt 2.
   - **Wrong on attempt 2**: the enacted count again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the numeral glides to the label; no praise pop).
4. **A "−1" item (L1: 5 acorns, "−1")**: the five acorns stand on the log; the last one is drawn at alpha 0.45 with `ART.minusBadge` on it; no ghost. Tiles 4, 5, 6 shuffled. Correct (4): the faded acorn floats away (`ANIM.leave`) and the remaining four count themselves briefly on a correct answer too? — NO: on a correct answer only the leave plays (F-43: confirm, don't over-explain). Wrong: the faded acorn floats away, the remaining acorns badge 1 … 4 with the last badge grown and `ART.totalNumeral` "4" shows; then the acorn returns (`ANIM.arrive` at alpha 0.45). Attempt 2.
5. **Items 2-8**: per Content/Rules. L1 sets 2-5, "+1" only; L2 sets 3-7, "+1" and "−1" mixed; L3 sets 5-9 with both directions and the acorns in two rows (a row of 5 on the log and the rest on a second log above it — `ART.log` at (360, 130)), so the answer cannot be read from a row's length.
6. **Finish**: `t("all_done")` (360, 110); the squirrel (360, 200) `ANIM.celebrate`; the summary = the eight answers as small acorn rows: for each item a `ART.miniRow` (a 64 × 20 bar) at y = 400, x = 360 − 3.5 × 76 + i × 76, with its answer numeral (20 px) above it — no score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  squirrel:     { kind: "emoji", value: "🐿", size: 80 },
  acorn:        { kind: "emoji", value: "🌰", size: 56 },
  ghostAcorn:   { kind: "shape", shape: "ellipse", w: 44, h: 52, stroke: "structure", strokeWidth: 3 },   // dashed (lineDash [6,5]); no fill
  log:          { kind: "shape", shape: "roundRect", w: 520, h: 40, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 20 },
  plusBadge:    { kind: "shape", shape: "circle", r: 20, fill: "structure" },                              // label "+1" 20 px display, color bg
  minusBadge:   { kind: "shape", shape: "circle", r: 20, fill: "bg", stroke: "accent", strokeWidth: 4 },  // label "−1" 20 px display, color inkOnAccent
  countBadge:   { kind: "shape", shape: "circle", r: 16, fill: "structure" },                              // numeral 20 px display, color bg
  totalNumeral: { kind: "text",  value: "", size: 52, font: "display", color: "structure" },
  rowLabel:     { kind: "shape", shape: "roundRect", w: 72, h: 56, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 12 },   // holds the solved numeral above the log
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },        // numeral 44 px display ink
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniRow:      { kind: "shape", shape: "roundRect", w: 64, h: 20, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 10 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The two badges differ by symbol (+1 / −1), fill (solid teal / coral ring) and by what they sit on (a dashed ghost / a faded real acorn) — never by colour alone.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  arrive:    { alpha: 1, scale: 1, duration: 300, ease: "Back.Out", trigger: "the ghost acorn becomes a real acorn (from alpha 0.3, scale 0.7) — a real ART.acorn is drawn over the ghost" },
  leave:     { y: "-=60", alpha: 0, duration: 450, ease: "Sine.In", trigger: "the faded acorn floats off the log on a −1 item" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the badge on the arriving acorn / the last remaining acorn" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "count badges and the big total after the enacted count" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "the solved numeral to the row label (x, y set at call)" },
  hop:       { y: "-=18", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "squirrel on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new set (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```
No flashing: `showMe` cycles at 1 Hz; every other motion is one-shot.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                 ○ ○ ○ ○ ○ ○ ○ ○  rail y=28              │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    [ 4 ] rowLabel (360,100) / total numeral   │
      │  squirrel (90,150)                                            │  zone A
      │              (o) (o) (o) ( )+1     acorns y=168, ghost at end │
      │        ═══════════════════════════  log (360,200)             │
260   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │        [ 3 ]        [ 5 ]        [ 4 ]   y=380 (96×96)       │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 two-row layout: the second `ART.log` at (360, 130) carries acorns 6-9 at y = 98 (same pitch, centred); the ghost / faded acorn sits at the end of the upper row when it holds any acorn, else at the end of the lower row. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`. No numeric progress (5-6 band).
- `ART.log` at (360, 200) (and (360, 130) at L3); `ART.acorn`s at y = 168 (and y = 98) centred with pitch 64; the acorns are NOT tappable (they are the prompt).
- "+1" items: `ART.ghostAcorn` at the row end with `ART.plusBadge` at its (+22, −22), label "+1" 20 px `THEME.font.display` `THEME.colour.bg`. "−1" items: the last acorn at alpha 0.45 with `ART.minusBadge` at its (+22, −22), label "−1" 20 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- `ART.countBadge` at each acorn's (+22, −22) during the enacted count with its numeral 20 px `THEME.colour.bg`; `ART.totalNumeral` at (360, 100); `ART.rowLabel` at (360, 100) holding the solved numeral (32 px `THEME.font.display` `THEME.colour.ink`).
- Tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, numeral 44 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile during show-me.
- `ART.squirrel` at (90, 150). Tap floors 96 ≥ 80 (5-6); gaps 24.
- Tab order: the three tiles left to right. During an enacted count (≈ 2-2.5 s) the tiles are `setEnabled(false)`. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (set; direction; answer; tiles). Tiles always hold the set's own numeral and the answer; the third tile is the answer ± 1 on the far side (never 6 and 9 together — where that would happen the third tile is the answer ± 2).
- **L1** ("+1" only, sets 2-5, one row): (3; +1; 4; 3, 4, 5) · (2; +1; 3; 2, 3, 4) · (4; +1; 5; 4, 5, 6) · (5; +1; 6; 5, 6, 7) · (1; +1; 2; 1, 2, 3)
- **L2** (mixed, sets 3-7, one row): (5; −1; 4; 5, 4, 3) · (4; +1; 5; 4, 5, 6) · (6; −1; 5; 6, 5, 4) · (7; +1; 8; 7, 8, 9) · (3; −1; 2; 3, 2, 1) · (6; +1; 7; 6, 7, 8) · (7; −1; 6; 7, 6, 5)
- **L3** (mixed, sets 5-9, two rows): (8; −1; 7; 8, 7, 5) · (6; +1; 7; 6, 7, 8) · (9; −1; 8; 9, 8, 7) · (7; +1; 8; 7, 8, 10) · (8; +1; 9; 8, 9, 7) · (5; −1; 4; 5, 4, 3) · (9; +1; 10; 9, 10, 8)

Play list of 8 per Rules; no item repeats in a session; the correct tile's slot never repeats twice running (§13); two "−1" items never come three in a row.

Worked example: item 1 (3; +1) taps 4 first try · item 2 (2; +1) first try → L2 · item 3 (5; −1) taps 6 (treated as one more) → the faded acorn floats away, the four remaining count, total "4"; then taps 4 (helped) → L1 next · item 4 (4; +1) first try · item 5 (5; +1) first try → L2 · items 6-8 at L2, all first try → Finish shows eight mini rows labelled 4, 3, 4, 5, 6, 4, 5, 8.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the ghost fills in (`ANIM.arrive`) or the faded acorn leaves (`ANIM.leave`), squirrel `ANIM.hop`, numeral glides to the row label, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - The set's own numeral (badge ignored): `ANIM.nudge`, `tone("nudge")`; enacted count — existing acorns badged quickly, the arriving/leaving acorn enacted, the new last badge grown, the big total shown 900 ms.
  - The wrong direction (one more for a −1 item or the reverse): the same enactment; the badge's motion (arrive vs leave) is the information.
  - Two away (6 for 4 + 1): the same enactment.
  - Attempt 2 wrong: the enactment again and the show-me ring on the correct tile; tapping it completes the item as solved-with-help.
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted count → attempt 3 with the show-me ring. No attempt 4.
- Finish condition: 8 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "One More One Less". No words on the play screen; the badges "+1" / "−1" are numerals and symbols.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", k)` on the k-th acorn during the enacted count (the pitch climbs; on a −1 item the count stops one step lower); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the log with up to 9 acorns plus the ghost, and three tiles, fully visible).
- [ ] Keyboard operable (Tab cycles the three tiles; Enter picks; acorns are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] A "+1" item shows a dashed acorn outline at the end of the row with a teal "+1" badge; a "−1" item shows the last acorn faded with a coral-ringed "−1" badge and no dashed outline.
- [ ] Tapping the set's own numeral on a "+1" item fills the dashed acorn in and counts the row with badges, the last badge bigger, then shows the total for under a second.
- [ ] Tapping wrong on a "−1" item makes the faded acorn float away, counts the rest, then brings it back.
- [ ] A correct tap plays only the arrive or leave motion and moves the numeral above the log; no counting badges.
- [ ] 6 and 9 never appear together as tiles.
- [ ] At the third level the acorns stand on two logs.
- [ ] The finish screen shows eight small rows with their answer numerals and no score.
- [ ] With `?sound=off` nothing is audible.
