# 137 — Flip It

## Identity
- Slug: `commutative-flip`
- Subject / topic: Mathematics / commutativity of addition (a + b and b + a make the same total)
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 tap on "same" / "different" commits the prediction; the two sets physically swap and count themselves)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (frogs and numerals) apart from the two tile words in `## Strings`; no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Predicts whether two additions shown as two sets (a + b, then the same sets in the other order or a changed set) give the same total or a different total, then watches the sets swap places and count themselves to check.
- Prerequisites: Adds within 10 with objects; reads numerals to 10 and the "+" and "=" signs; counts on from a number (game 008).
- Curriculum links: F-107 (the equals sign as "same amount on both sides" — commutativity is its first use), F-105 (counting on from the larger addend), F-21 ("+/− facts to 20" and "number composition" in all twelve systems), F-31 row "+/− facts to 20" — conservative 7-8 → 6-8 (US 1.OA.B.3 "apply properties of operations … if 8 + 3 = 11 is known, then 3 + 8 = 11 is also known (commutative property)"; England Y1-2 "addition of two numbers can be done in any order (commutative)"; Germany Klasse 1 "Tauschaufgaben"; France CP "commutativité de l'addition"; Netherlands groep 3 "omkeren van optellingen"; Spain 1º ciclo "propiedad conmutativa"; Brazil EF01MA06; Sweden åk 1-3 "kommutativa lagen"; Finland grades 1-2 "vaihdannaisuus").
- Common misconceptions (F-107, F-105), each with this game's response:
  1. **"A different order is a different sum" (3 + 5 and 5 + 3 expected to give different totals).** Response: the reveal swaps the two sets physically — the left lily pad's frogs glide to the right pad and the right pad's frogs to the left (`ANIM.swap`, crossing in the air) — so the child sees the SAME frogs in the new places; then both arrangements count to the same total with `ART.countBadge`s and the two equations `ART.eqLeft` "3 + 5 = 8" and `ART.eqRight` "5 + 3 = 8" appear joined by `ART.bridge` (a bar under the two totals with "=" on it). Nothing is said; the same frogs are the argument.
  2. **"Bigger number first makes it bigger" (5 + 3 > 3 + 5).** Response: the count after the swap is shown as a count-on from the larger set (5, then 6, 7, 8 — three steps) beside the count-on from the smaller set before the swap (3, then 4 … 8 — five steps); the totals meet at the same numeral; the `ART.stepStrip` under each equation shows the number of count-on steps as dots (5 dots vs 3 dots) — the order changes the WORK, not the total.
  3. **Always answering "same" without looking (the flip is assumed, so a changed set is missed).** Response: from L2 one third of items are NOT flips — a frog hops away or arrives during the swap (`ANIM.hopAway` / `ANIM.hopIn`), so 3 + 5 becomes 5 + 2; the reveal counts 8 and 7 and `ART.gapMark` (a dashed frog outline) marks the missing frog; a child who tapped "same" sees exactly what changed.
  4. **Count-all instead of count-on (F-105).** Response: on a wrong prediction the count replays as a count-ON: the first set's frogs gather under one badge (`ART.groupBadge` "3") and only the second set's frogs are badged 4, 5, 6, 7, 8 (`tone("tap", k)`); the first addend is shown as already-known.
  5. **Reading the "=" as "the answer comes next" (F-107).** Response: the bridge joins two TOTALS ("8 = 8"); at L3 the sentence `ART.fullEq` "3 + 5 = 5 + 3" is written under the bridge on flip items, an equation with an operation on both sides, read as "both sides make 8".

## How it plays
1. **Start screen**: title "Flip It", the frog (`ART.frog`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 3 + 5, then 5 + 3)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: two lily pads — `ART.pad` (180 × 90) at (220, 150) holding 3 frogs (`ART.frog`, size 40, pitch 44, one row, centred; two rows when > 5) and at (500, 150) holding 5; between the pads `ART.plusSign` "+" (48 px) at (360, 150); under the pads the sentence `ART.eqLeft` "3 + 5 = ?" (36 px) at (360, 225). To the right, in a small card (`ART.previewCard`, 150 × 70) at (620, 100), the SECOND arrangement is written as numerals only: `ART.previewText` "5 + 3" — the question is whether it will make the same total. Zone B: two tiles (`ART.choiceTile`, 200 × 96) at y = 380, x = 250 and x = 470: the left shows `ART.sameGlyph` "=" above `S("same")` ("same"), the right shows `ART.diffGlyph` "≠" above `S("different")` ("different"); their positions are shuffled per item. Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected.
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`); tapping the other switches; Check enables. Nothing moves before Check (F-40).
4. **Check → Reveal**:
   - **Count one**: the left pad's frogs gather under `ART.groupBadge` "3" (`ANIM.badgeIn`), then the right pad's frogs are badged 4, 5, 6, 7, 8 one by one (`ART.countBadge`, 220 ms apart, `tone("tap", k)`); `ART.eqLeft` completes "3 + 5 = 8" and `ART.stepStrip` (5 dots) appears under it.
   - **The swap**: the badges fade (`ANIM.fadeOut`); the two groups of frogs cross — every frog glides in an arc to the other pad (`ANIM.swap`: x to the other pad's slot, y "−=40" then back, 700 ms); on a "different" item one frog hops off the stage during the crossing (`ANIM.hopAway`) or a new one hops in (`ANIM.hopIn`). The sentence `ART.eqRight` "5 + 3 = ?" appears at (360, 260).
   - **Count two**: the (new) left pad's frogs gather under `ART.groupBadge` "5", the right pad's frogs are badged 6, 7, 8; `ART.eqRight` completes "5 + 3 = 8"; its `ART.stepStrip` (3 dots) appears; `ART.bridge` draws under the two totals with "=" (or "≠" with `ART.gapMark` on the changed pad for a different item).
   - **Prediction correct**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop (rotation); the frog mascot at (60, 200) `ANIM.hop`; at L3 `ART.fullEq` "3 + 5 = 5 + 3" appears at (360, 295) on flip items; the rail dot fills; after 1000 ms the next item builds (`ANIM.appear`). First-try correct.
   - **Prediction wrong ("different" on a flip)**: `tone("nudge")` after the reveal; the swap replays once more in reverse and forward (`ANIM.swap` twice) so the same frogs are seen going back and forth, with the two totals pulsing (`ANIM.pulse`); the tiles re-enable; attempt 2 with the counted arrangements in view.
   - **Prediction wrong ("same" on a changed item)**: after the reveal, `ART.gapMark` pulses on the pad that changed and the changed frog's hop replays (`ANIM.hopAway` / `ANIM.hopIn`); `tone("nudge")`; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, rail dot, no praise pop; solved-with-help. **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item wrong on the first prediction re-enters the play list after 2 intervening items with its two addends replaced by the next pair in the same level (so the same question is asked of new numbers), then, if wrong again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
6. **Items 2-10**: per Content/Rules. L1 flips only (the reveal teaches the mechanism; sums ≤ 8); L2 flips and changed items mixed, sums ≤ 10; L3 sums to 20 (two-row pads), changed items where the change is one frog on the LARGER set, and the full equation shown.
7. **Finish**: `t("all_done")` (360, 110); the frog mascot (360, 200) `ANIM.celebrate`; the summary = the ten pairs of sentences as chips (`ART.pairChip`, 130 × 36, label "3+5 · 5+3" 15 px) in two rows of five from y = 340, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (10 items × 30-40 s).

## Art registry
```js
const ART = {
  frog:        { kind: "emoji", value: "🐸", size: 40 },                 // 72 px for the mascot (opts.size at the call)
  pad:         { kind: "shape", shape: "ellipse", w: 180, h: 90, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  plusSign:    { kind: "text",  value: "+", size: 48, font: "display", color: "structure" },
  previewCard: { kind: "shape", shape: "roundRect", w: 150, h: 70, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  previewText: { kind: "text",  value: "", size: 32, font: "display", color: "ink" },
  eqLeft:      { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  eqRight:     { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  fullEq:      { kind: "text",  value: "", size: 28, font: "display", color: "inkSoft" },
  groupBadge:  { kind: "shape", shape: "roundRect", w: 44, h: 28, fill: "structure", radius: 8 },       // numeral 18 px display bg, under the first set
  countBadge:  { kind: "shape", shape: "circle", r: 12, fill: "bg" },                                   // numeral 14 px display structure, on each counted frog
  stepStrip:   { kind: "shape", shape: "circle", r: 4, fill: "inkSoft" },                               // one dot per count-on step, pitch 12, under an equation
  bridge:      { kind: "shape", shape: "rect", w: 240, h: 6, fill: "structure" },                        // under the two totals; "=" or "≠" 28 px display structure at its centre
  gapMark:     { kind: "shape", shape: "ellipse", w: 34, h: 34, stroke: "accent", strokeWidth: 3 },     // dashed (lineDash [5,4]) where a frog left or arrived
  choiceTile:  { kind: "shape", shape: "roundRect", w: 200, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  sameGlyph:   { kind: "text",  value: "=", size: 36, font: "display", color: "structure" },
  diffGlyph:   { kind: "text",  value: "≠", size: 36, font: "display", color: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:    { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The two choice tiles differ by glyph AND word AND (shuffled) position; the "=" / "≠" glyphs are text, not colour. Frog layout on a pad: up to 5 in one row (pitch 44, centred at pad y); 6-10 in two rows (y − 20 / y + 20, first row 5).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "choice tile selected" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "group badge and count badges (from alpha 0, scale 0.5), 220 ms apart" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "badges before the swap" },
  swap:      { duration: 700, ease: "Sine.InOut", trigger: "each frog to its slot on the other pad (x set at call) while y rises 40 px and returns (a second tween, yoyo, 350 ms)" },
  hopAway:   { x: "+=200", y: "-=60", alpha: 0, duration: 500, ease: "Sine.In", trigger: "one frog leaves the stage during the swap (changed items)" },
  hopIn:     { alpha: 1, duration: 500, ease: "Back.Out", trigger: "one frog arrives on a pad during the swap (from x +200, y −60, alpha 0)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "equations, bridge, full equation, new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the two totals after a wrong prediction; gapMark on a changed pad" },
  hop:       { y: "-=18", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "mascot on a correct prediction" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mascot" }
};
```
No flashing: `showMe` cycles at 1 Hz; pulses are ≤ 3 cycles; the swap is one crossing (two on a wrong "different").

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                              ┌─────────┐      │
      │   ( f f f )        +        ( f f f f f )    │  5 + 3  │(620,100)│  zone A
      │   pad (220,150)  (360,150)  pad (500,150)    └─────────┘      │
      │  mascot (60,200)   "3 + 5 = ?" (360,225)                      │
      │                    "5 + 3 = ?" (360,260)  ═══ = ═══ bridge (360,285)│
260   ├──────────────────────────────────────────────────────────────┤
      │        [  =  same  ]           [ ≠ different ]   y=380        │  zone B
      │          x=250 (200×96)          x=470 (200×96)               │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `f` = a frog. `ART.stepStrip` dots sit 14 px under each equation's total; `ART.fullEq` at (360, 295) replaces the bridge at L3 on flip items after 600 ms. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.pad` at (220, 150) and (500, 150) with frogs per the layout note; `ART.plusSign` at (360, 150); `ART.previewCard` at (620, 100) with `ART.previewText` centred.
- `ART.eqLeft` at (360, 225); `ART.eqRight` at (360, 260); `ART.bridge` at (360, 285) with its glyph centred; `ART.fullEq` at (360, 295) at L3; `ART.groupBadge` under the first set's pad (pad y + 40); `ART.countBadge` at each counted frog's (+14, −18); `ART.stepStrip` dots under each total; `ART.gapMark` at the vacated / new slot.
- Tiles: `makeTile` 200 × 96 (`ART.choiceTile`) at (250, 380) and (470, 380); each tile's label is its glyph (36 px) over its word (24 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 180, fit-to-width per §2); `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- The mascot is `ART.frog` drawn at size 72 at (60, 200). Tap floors 200 × 96 ≥ 56; gap 20.
- During the reveal (≈ 4 s) the tiles are `setEnabled(false)` and Check is disabled. Tab order: the two tiles left to right, then OK. Under `?embed=1` the picker is not created.

## Content
Language-neutral apart from the two tile words. Items as (first arrangement; second arrangement; correct tile). "Changed" items alter the second arrangement by exactly one frog.
- **L1** (flips only, sums ≤ 8): (3 + 5; 5 + 3; same) · (2 + 4; 4 + 2; same) · (1 + 6; 6 + 1; same) · (4 + 4; 4 + 4; same) · (2 + 6; 6 + 2; same) · (3 + 4; 4 + 3; same)
- **L2** (flips and changed items, sums ≤ 10): (4 + 6; 6 + 4; same) · (3 + 5; 5 + 2; different) · (2 + 7; 7 + 2; same) · (6 + 3; 3 + 7; different) · (5 + 5; 5 + 5; same) · (1 + 8; 8 + 1; same) · (4 + 5; 5 + 3; different) · (3 + 6; 6 + 3; same) · (2 + 8; 8 + 3; different)
- **L3** (sums to 20, two-row pads; the change is on the larger set): (7 + 9; 9 + 7; same) · (8 + 6; 6 + 7; different) · (5 + 9; 9 + 5; same) · (6 + 8; 8 + 6; same) · (9 + 8; 7 + 9; different) · (4 + 9; 9 + 4; same) · (7 + 7; 7 + 8; different) · (6 + 9; 9 + 6; same)

Play list of 10 per Rules with re-queue (How it plays §5); flips and changed items are interleaved so "same" is never the correct tile four times running at L2-L3; the correct tile's position is shuffled per item and never repeats twice running (§13).

Worked example: item 1 (3 + 5 / 5 + 3) taps "same" → count 3 … 8, swap, count 5 … 8, bridge "=" · item 2 (2 + 4 / 4 + 2) "same" → L2 · item 3 (3 + 5 / 5 + 2) taps "same" → after the swap one frog hops off, totals 8 and 7, bridge "≠", the gap mark pulses; taps "different" (helped) → L1 · item 4 (1 + 6) "same" · item 5 (4 + 4) "same" → L2 · item 6 = re-queued (6 + 3 / 3 + 7) "different" first try · items 7-10 at L2-L3 all first try → Finish shows ten chips, 9 with filled dots.

## Rules
- Item count: 10 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues a same-type item (after 2 items, then a last look) without changing level.
- What happens on a correct answer: the count-swap-count reveal, `ANIM.pop` on the tile, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), bridge shown, mascot `ANIM.hop`, rail dot, next item after 1000 ms.
- What happens on a wrong answer:
  - "different" on a flip (order changes the sum): reveal, then the frogs cross back and forth once more with both totals pulsing; attempt 2.
  - "same" on a changed item (flip assumed): reveal, the gap mark pulses on the changed pad and the hop replays; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with both counted arrangements in view → attempt 3 show-me; solved-with-help; a same-type item re-queues later. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Flip It"; `same` = "same"; `different` = "different". The two tile words are the only words on the play screen (≤ 8 words, F-204); each is paired with its glyph.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per counted frog (k = the running total, so the count-on from 3 climbs 4 … 8 and the count-on from 5 climbs 6 … 8 — the same top note both times, F-213); `tone("tap", 2)` on each frog crossing during the swap; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change; "same" / "different" change once translated and fit their tiles).
- [ ] Works at narrow width (400-px iframe: both pads, the preview card, both tiles and OK visible).
- [ ] Keyboard operable (Tab across the two tiles and OK; Enter selects / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a tile is selected; no frog moves before OK.
- [ ] After OK the first set gathers under one badge and the second set is numbered on from it; then every frog crosses to the other pad; then the count repeats from the new first set.
- [ ] On a flip both sentences end in the same total and a bar with "=" joins them; the dot strips show 5 steps then 3 steps for 3 + 5 / 5 + 3.
- [ ] On a changed item one frog hops off (or on) during the crossing, the totals differ, the bar shows "≠" and a dashed outline marks the changed place.
- [ ] Predicting "different" on a flip makes the frogs cross back and forth once more with the totals pulsing.
- [ ] At the third level flip items also show "3 + 5 = 5 + 3" under the bar and the pads hold up to ten frogs in two rows.
- [ ] A missed item comes back two items later with new numbers of the same kind.
- [ ] The finish screen lists ten pairs with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
