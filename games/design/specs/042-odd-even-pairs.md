# 042 — Odd or Even Pairs

## Identity
- Slug: `odd-even-pairs`
- Subject / topic: Mathematics / even and odd as "can be paired with none left over" (sets to 13, then the numeral's ones digit)
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (the whole set is the item; pairing is a P2-style two-tap sub-step)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (two bins, item then bin) with the P2 two-tap for the pairing sub-step.

## Learning
- Objective: Decides whether a set of objects is even or odd by pairing the objects two by two, noticing whether one is left over, and sorting the set into the EVEN or ODD bin.
- Prerequisites: Counts to 13 with one-to-one correspondence; reads numerals to 13.
- Curriculum links: F-1 (odd/even in 3 of 15 demand sources — niche, so this is one of the catalogue's two odd/even games), F-21, F-31 row "Even/odd" — conservative 7 (NO names it by text), earliest 5 in practice → 6-8, kept deliberately concrete (US 2.OA.C.3 "determine whether a group of objects (up to 20) has an odd or even number of members, e.g., by pairing objects"; England Y2 "odd and even numbers"; Germany Klasse 1-2 "gerade und ungerade Zahlen"; Norway 2. trinn "partall og oddetall"; Netherlands groep 4 "even en oneven"; Sweden åk 1-3 by practice).
- Common misconceptions (F-109 — sequences taken as chant not structure — and F-108 for the digit rule), each with this game's response:
  1. **Judging by layout: two rows that look "full" read as even; a spread-out row reads as odd.** Response: L2 and L3 arrange the objects in two staggered rows and in loose clusters, so the eye cannot decide; the only route is pairing. A wrong bin triggers the enacted pairing (below), which is layout-independent.
  2. **Off-by-one miscount (counts 8 and says odd, or 7 and says even).** Response: on a wrong bin the set pairs itself — objects glide two at a time onto the pair shelf (`ANIM.glide`, `tone("tap", k)` per pair), and if one is left it gets `ART.aloneRing` and `ANIM.pulse`; the shelf shows the pairs and the leftover, not a number.
  3. **Trying to pair the leftover with a pair already made ("three in a group").** Response: a pair slot holds exactly two; tapping a shelf pair with a third object selected springs the object back (`ANIM.nudge`, no message — F-61). Tapping the same object twice de-selects it (no self-pair).
  4. **Applying the digit rule to the wrong digit at L3 ("13 is even because 1 … no, 3 … ").** Response: L3 shows the numeral card (`ART.numCard`) beside the set; after the enacted pairing the card's ONES digit gains `ART.digitRing` and pulses while the leftover pulses in step — the ones digit and the leftover object are shown to be the same fact (F-108: digits are not independent numbers).
  5. **"The chant decides" (2, 4, 6, 8 recited; 9 called even because it "comes next").** Response: nothing on screen relies on the chant; every item is resolvable by pairing, and every wrong bin enacts the pairing. The rail never shows the count.

## How it plays
1. **Start screen**: title "Odd or Even Pairs", the two mittens (`ART.mitten` at (330, 200) and (390, 200)), Start, picker.
2. **Item 1 (L1: 4 mittens)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the tray — 4 `ART.mitten` tiles (`makeTile` 56 × 56, transparent fill, the emoji as label) in one row at y = 130, pitch 68, centred (x = 360 − 1.5 × 68 + i × 68). Below the tray, the pair shelf (`ART.shelf`, a bar 640 × 4 at y = 250) with six dashed pair slots (`ART.pairSlot`, 96 × 64) at y = 300, x = 100 + j × 104 (j = 0 … 5) — empty and faint. Zone B: two bins (`ART.bin`, 160 × 110) at y = 420, x = 240 and x = 480: the EVEN bin shows `ART.iconPair` (two filled dots side by side) with `S("even")` ("Even") beneath in 22 px; the ODD bin shows `ART.iconPair` plus `ART.iconAlone` (a hollow dot with a coral ring) with `S("odd")` ("Odd"). Bin order left/right is shuffled per item. Caption: none.
3. **Pairing (optional but always available)**: tap a mitten (lift + outline, `tone("tap")`), tap another → both glide onto the next free pair slot (`ANIM.glide`, the first at slot x − 22, the second at x + 22) and `ART.pairLink` (a short bar) draws under them; `tone("tap", k)` with k = the number of pairs so far. Tapping a shelf pair returns both to their tray positions (undo). When exactly one mitten remains with no partner, it gains `ART.aloneRing` and `ANIM.pulse` (three pulses, then still). When none remain, the shelf's last pair `ANIM.pop`s.
4. **Sorting**: tap a bin at any time (a child who sees the answer at once need not pair — F-40 retrieval). The whole set is the item:
   - **Correct bin**: any mittens still in the tray pair themselves onto the shelf first (`ANIM.glide`, 250 ms per pair, a leftover ringed) — the enacted confirmation; then all mittens glide into the bin (`ANIM.glide`, staggered 60 ms), the bin `ANIM.pop`s, its count (`ART.binCount`) rises by one, `tone("correct")`; praise pop on every third correct item and on the twelfth; rail dot; next set after 500 ms. An item is first-try only if no wrong bin was tapped.
   - **Wrong bin**: `tone("nudge")`, the bin `ANIM.nudge`s; then the enacted pairing: every mitten (including any the child already shelved — they stay) pairs onto the shelf, `tone("tap", k)` per pair, a leftover gets `ART.aloneRing` + `ANIM.pulse`; at L3 the numeral card's ones digit gains `ART.digitRing` in step with the leftover. Then the correct bin's icon `ANIM.pulse`s once. Attempt 2 (the shelf stays as enacted so the evidence remains visible).
   - **Second wrong bin**: the enactment again, then the correct bin gains `ART.showRing` (`ANIM.showMe`); tapping it completes the item as solved-with-help.
   - Tapping a bin during an enactment does nothing (bins disabled ≈ 2 s).
5. **Items 2-12**: per Content/Rules. L1 sets of 2-7 in one row; L2 sets of 6-12 in two staggered rows; L3 sets of 9-13 in a loose cluster WITH the numeral card (`ART.numCard`, 96 × 96, the count in 48 px) at (620, 150) — the card is the bridge from objects to the digit rule.
6. **Finish**: `t("all_done")` (360, 110); the two mittens at (330, 210) and (390, 210) `ANIM.celebrate`; the summary = the two bins at y = 400 (x = 240 / 480) with their final counts, and above each bin its sets as a row of small numeral chips (`ART.setChip`, 40 × 28, the set size in 16 px) at y = 320 — the sorted numbers, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  mitten:    { kind: "emoji", value: "🧤", size: 44 },
  shelf:     { kind: "shape", shape: "rect", w: 640, h: 4, fill: "line" },
  pairSlot:  { kind: "shape", shape: "roundRect", w: 96, h: 64, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },  // dashed look: lineDash [8,6]
  pairLink:  { kind: "shape", shape: "roundRect", w: 60, h: 6, fill: "structure", radius: 3 },
  aloneRing: { kind: "shape", shape: "circle", r: 34, stroke: "accent", strokeWidth: 4 },
  bin:       { kind: "shape", shape: "roundRect", w: 160, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconPair:  { kind: "shape", shape: "circle", r: 9, fill: "structure" },                       // drawn twice, 24 px apart
  iconAlone: { kind: "shape", shape: "circle", r: 9, stroke: "accent", strokeWidth: 3 },        // hollow; drawn 24 px right of the pair
  binCount:  { kind: "text",  value: "0", size: 20, font: "display", color: "inkSoft" },
  numCard:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 14 },   // count 48 px display ink
  digitRing: { kind: "shape", shape: "roundRect", w: 36, h: 56, stroke: "accent", strokeWidth: 3, radius: 8 },                     // around the ones digit
  showRing:  { kind: "shape", shape: "roundRect", w: 172, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  setChip:   { kind: "shape", shape: "roundRect", w: 40, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 6 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.08, duration: 120, ease: "Sine.Out", trigger: "a mitten selected" },
  glide:     { duration: 250, ease: "Sine.InOut", trigger: "a mitten to a pair slot / back to the tray / into a bin (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong bin; a refused third object at a full pair slot" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "aloneRing on the leftover; digitRing on the ones digit; correct bin icon after a wrong bin" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receiving the set; last pair when no leftover remains" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tray, numeral card (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mittens" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        (m) (m) (m) (m) (m) (m) (m)   tray row 1 y=120         │
      │          (m) (m) (m) (m) (m) (m)     tray row 2 y=180 (L2/L3) │  zone A
      │  ─────────────── shelf y=250 ───────────────  [13] card (620,150)│
260   ├──────────────────────────────────────────────────────────────┤
      │  [ pair ] [ pair ] [ pair ] [ pair ] [ pair ] [ pair ]  y=300 │
      │   x=100     204     308     412     516     620   (96×64)     │  zone B
      │        ┌──────────┐            ┌──────────┐                   │
      │        │ ●●  Even │            │ ●● o Odd │   bins y=420      │
      │        │    0     │            │    0     │   x=240 / 480     │
      │        └──────────┘            └──────────┘   (160×110)       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Tray rows: one row at y = 150 for L1 (centred, pitch 68); two rows at y = 120 and y = 180 for L2, the second row offset 34 px right (staggered); L3 cluster positions are listed in Content. The numeral card appears only at L3.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Tray mittens: `makeTile` 56 × 56 with a transparent fill (fill and stroke passed as `THEME.colour.bg`) and `ART.mitten` as the label; selected = library selected look + `ANIM.lift`.
- `ART.shelf` centred (360, 250); six `ART.pairSlot`s at y = 300 drawn dashed; a shelved pair = the two mitten tiles at (slot x − 22, 300) and (slot x + 22, 300) with `ART.pairLink` centred at (slot x, 334). Shelved pairs are one `makeTile` group for the undo tap (tapping either mitten of a pair returns both).
- `ART.aloneRing` centred on the leftover mitten. `ART.numCard` at (620, 150) with the count 48 px `THEME.font.display` `THEME.colour.ink`; `ART.digitRing` centred on the ones digit (x = 620 + 14 for a two-digit number, x = 620 for one digit; y = 150).
- Bins: `makeTile` 160 × 110 (`ART.bin` tokens); icon row at (0, −22): EVEN = two `ART.iconPair` at x = −12 and +12; ODD = two `ART.iconPair` at x = −24 and 0 plus `ART.iconAlone` at x = +24; label `S("even")` / `S("odd")` 22 px `THEME.font.body` `THEME.colour.ink` at (0, +8); `ART.binCount` at (0, +36).
- `ART.showRing` around the correct bin. Tap floors: mittens 56, pair slots 96 × 64, bins 160 × 110 (≥ 56); gaps ≥ 12 (tray pitch 68 − 56 = 12; slots pitch 104 − 96 = 8 — accepted, a mis-tap on a neighbouring pair only opens the undo, which is reversible).
- Keyboard: Tab walks tray mittens in reading order, then shelf pairs, then the two bins; Enter selects / pairs / undoes / sorts.

## Content
Language-neutral apart from the two bin labels. Every item = (set size; layout; answer). Bin sides shuffled per item; the correct bin is never on the same side three items running.

- **L1** (one row): (4; row; even) · (3; row; odd) · (6; row; even) · (5; row; odd) · (2; row; even) · (7; row; odd)
- **L2** (two staggered rows, row 1 holds ceil(n / 2)): (8; rows; even) · (9; rows; odd) · (6; rows; even) · (11; rows; odd) · (10; rows; even) · (7; rows; odd) · (12; rows; even)
- **L3** (loose cluster + numeral card): (13; cluster; odd) · (10; cluster; even) · (11; cluster; odd) · (12; cluster; even) · (9; cluster; odd) · (13; cluster; odd) · (12; cluster; even)

L3 cluster positions (tray centre (300, 150); offsets in px): 9 → (−150, −30) (−90, 10) (−30, −34) (30, 6) (90, −30) (150, 8) (−120, 50) (0, 50) (120, 50); 10 → the 9 above + (−60, −4); 11 → 10 + (60, 42); 12 → 11 + (−180, 20); 13 → 12 + (180, −22). All offsets keep every mitten ≥ 12 px from its neighbours.

Play list of 12 per Rules; shuffle within level, levels in order; two consecutive items never have the same set size; the pair shelf always has six slots (13 needs six pairs + one).

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three, not two: items take ~15-25 s.)
- Adaptation: a wrong bin, or a non-first-try item on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: remaining mittens self-pair onto the shelf, the set glides into the bin, `ANIM.pop`, count +1, `tone("correct")`; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct item and on the twelfth; rail dot; next set after 500 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and `ANIM.nudge` on the tapped bin):
  - Layout misjudgement (two rows called even when one is left): the whole set pairs itself onto the shelf; the leftover mitten is ringed and pulses; the correct bin's icon pulses once.
  - Off-by-one miscount: the same enactment — the shelf shows k pairs and 0 or 1 leftover; the child reads the leftover, not a number.
  - Digit-rule error at L3 (13 sorted as even): the enactment, then `ART.digitRing` pulses on the "3" in step with the ringed leftover.
  - A third mitten tapped onto a full pair slot: springs back with `ANIM.nudge`, no message (refusal, F-61).
  - Tapping the same mitten twice: de-select only.
- Retry behaviour: attempt 1 → attempt 2 after the enacted pairing (the shelf stays populated) → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Odd or Even Pairs"; `even` = "Even"; `odd` = "Odd". The bin icons carry the meaning; the words are the second cue (F-42 integrated labels).

## Sound
`tone("tap")` on selecting a mitten; `tone("tap", k)` on the k-th pair formed (child-made or enacted, pitch rises with the pair count); `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin or refused placement; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Even" / "Odd" bin labels, "Question 3 of 12", All done, Play again, Menu and praise change with the picker).
- [ ] Works at narrow width (400-px iframe: a 13-mitten cluster, six pair slots, the numeral card and both bins visible and separate).
- [ ] Keyboard operable (Tab through mittens, shelf pairs and bins; Enter selects, pairs, undoes and sorts).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] Tapping two mittens moves both onto the next free pair slot with a bar beneath them; tapping a shelved pair returns both to the tray.
- [ ] With one mitten left and no partner, a coral ring pulses around it.
- [ ] Tapping a mitten and then a shelved pair springs the mitten back with no message.
- [ ] Tapping a bin without pairing is allowed; on a correct bin the remaining mittens pair themselves before the set glides in.
- [ ] Tapping the wrong bin makes every mitten pair up on the shelf and the leftover (if any) pulse, then the right bin's icon pulses.
- [ ] At level 3 a numeral card shows the count and, after a wrong bin, a ring pulses around its ones digit together with the leftover.
- [ ] Bins swap sides between items; bin counts rise only on correct sorts.
- [ ] Three first-try corrects in a row bring two-row and cluster layouts; a wrong bin brings a one-row set next.
- [ ] The finish screen shows the two bins with their counts and the sorted set sizes as chips; no score, no time.
- [ ] With `?sound=off` nothing is audible.
