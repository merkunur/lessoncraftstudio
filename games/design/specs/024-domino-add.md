# 024 — Domino Add

## Identity
- Slug: `domino-add`
- Subject / topic: Mathematics / addition within 10 from two subitised parts (a domino's two halves), counting on from the larger part rather than counting all
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (dot patterns and numerals); no `LOCALE_DATA`.

## Learning
- Objective: Reads the two dot patterns on a domino (each 0-6) and taps the numeral for their total without counting every dot, using the larger half as a known quantity and counting on the smaller.
- Prerequisites: Subitises die patterns to 6 (a glance names the pattern); counts to 10; reads numerals to 10.
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources; subitising in 13), F-105 (count-all persists; counting-on is the strategy to build), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.C.5-6 "relate counting to addition … counting on"; England Y1 "add one-digit numbers to 10"; Germany Klasse 1 "Additionsaufgaben im Zahlenraum bis 10 — strukturierte Mengen, Würfelbilder"; France CP "calcul mental, décompositions"; Netherlands groep 3 "optellen tot 10, dobbelsteenpatronen"; Spain 1º ciclo; Brazil EF01MA06; Sweden åk 1; Finland grade 1).
- Common misconceptions (F-105, F-101, F-104), each with this game's response:
  1. **Count-all: pointing to every dot from 1 (4 + 3 counted "1, 2, 3, 4, 5, 6, 7").** Response: the domino's larger half is never counted by the hint. On a wrong tap the enacted strategy shows the larger half's pattern lighting AS ONE (`ANIM.groupFlash` on all its pips together, with `ART.halfTag` "4" appearing over it), then the smaller half's pips counting on one at a time 5, 6, 7 (`ART.countBadge`, `tone("tap", k)` pitched from the larger number). Counting from 1 is never modelled.
  2. **Counting on from the larger number itself ("4 … 4, 5, 6" → 6).** Response: sum − 1 is always a distractor tile; when tapped, the enacted count-on makes the "4" tag pulse and the FIRST counted pip's badge read 5 with `ANIM.pulse` — "the 4 is already there; the next dot is 5".
  3. **Starting from the smaller half when it is written on the left (3 | 4 counted "3 … 4, 5, 6, 7").** Response: not wrong, but slower; at L3 the smaller half is on the LEFT and the hint always starts from the larger half wherever it sits, with `ART.halfTag` over the larger half and the count-on badges on the smaller — the domino is symmetric, so "start with the bigger part" is shown as a choice.
  4. **Not reading a pattern (counting the 6-pattern dot by dot).** Response: the domino stays visible throughout (no flash-and-hide — a covered set would add memory load, F-42); the pattern is drawn in the standard die layout at every level (F-105: regular arrays support subitising), and the `ART.halfTag` numeral that appears over the larger half in the hint names the pattern without counting it.
  5. **Sum + 1 or a random larger numeral ("it's a lot of dots").** Response: sum + 1 is the other distractor; the enacted count-on ends on the true sum and `ART.sumText` appears large under the domino.

## How it plays
1. **Start screen**: title "Domino Add", the dog (`ART.dog`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 | 2)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the domino (`ART.domino`, 260 × 130) centred at (360, 160) with its divider (`ART.divider`); the left half shows the 3-pattern, the right half the 2-pattern (`ART.pip`, r 11, positions from the Content pip table); the dog sits at (110, 170) looking at it. Under the domino, `ART.sumText` (empty until the item completes) at (360, 250). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480: 5, 4, 6 shuffled. Zone C: praise pops. Caption `S("howManyAll")` ("How many dots?") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), `ART.sumText` "3 + 2 = 5" appears with `ANIM.appear`, the dog `ANIM.wag` (angle wobble); rail dot fills; after 700 ms the next domino slides in (`ANIM.slideIn`).
   - **Wrong, sum − 1 (counted on from the larger itself)**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; then the **enacted count-on**: `ART.halfTag` "3" appears over the larger half while its pips `ANIM.groupFlash` together (one `tone("tap", 3)`); then the smaller half's pips get `ART.countBadge` 4, 5 one at a time (350 ms apart, `tone("tap", 4)`, `tone("tap", 5)`), the first badge `ANIM.pulse`s and the halfTag pulses with it; `ART.sumText` shows "3 + 2 = 5" for 900 ms then fades (`ANIM.fadeOut`). Attempt 2.
   - **Wrong, sum + 1 or any other**: nudge + tone; the same enacted count-on without the first-badge pulse; the final badge pulses instead. Attempt 2.
   - **Wrong on attempt 2**: the enacted count-on again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-10**: per Content/Rules. L1 halves ≤ 3 and doubles (sums ≤ 6); L2 larger half on the left, halves ≤ 5, sums ≤ 10; L3 smaller half on the LEFT, a 6-pattern present, sums ≤ 10, plus one blank half (0) item.
5. **Finish**: `t("all_done")` (360, 110); the dog (360, 200) `ANIM.celebrate`; the summary = the ten dominoes solved, as mini dominoes (`ART.miniDomino`, 78 × 39 with `ART.miniPip` r 3) in two rows of five from y = 330 (pitch 100), each with its sum in 16 px `THEME.colour.inkSoft` beneath; `t("question_x_of_y", {n: firstTryItems, total: 10})` at (360, 280), 18 px `THEME.colour.inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  dog:         { kind: "emoji", value: "🐶", size: 80 },
  domino:      { kind: "shape", shape: "roundRect", w: 260, h: 130, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 16 },
  divider:     { kind: "shape", shape: "rect", w: 4, h: 110, fill: "structure" },
  pip:         { kind: "shape", shape: "circle", r: 11, fill: "ink" },
  pipLit:      { kind: "shape", shape: "circle", r: 11, fill: "structure", stroke: "structureSoft", strokeWidth: 6 },   // the larger half's pips during groupFlash
  halfTag:     { kind: "text",  value: "", size: 36, font: "display", color: "structure" },        // the larger half's numeral, drawn above that half
  countBadge:  { kind: "shape", shape: "circle", r: 13, fill: "accent" },        // numeral 16 px display, color inkOnAccent; on each counted-on pip
  sumText:     { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniDomino:  { kind: "shape", shape: "roundRect", w: 78, h: 39, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 6 },
  miniPip:     { kind: "shape", shape: "circle", r: 3, fill: "ink" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Pip positions (relative to a half's centre; a half is 130 wide, its centre at domino x ∓ 65) — the standard die layouts, used at every level:
| value | pip offsets (x, y) |
|---|---|
| 0 | none |
| 1 | (0, 0) |
| 2 | (−28, −28) (28, 28) |
| 3 | (−28, −28) (0, 0) (28, 28) |
| 4 | (−28, −28) (28, −28) (−28, 28) (28, 28) |
| 5 | the 4 layout + (0, 0) |
| 6 | (−28, −34) (28, −34) (−28, 0) (28, 0) (−28, 34) (28, 34) |
Mini dominoes use the same offsets scaled by 0.3.

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  groupFlash: { scale: 1.25, duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "all pips of the larger half together, once, while halfTag appears (pips swap to pipLit for the hint's duration)" },
  badgeIn:    { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge on the smaller half (from alpha 0, scale 0.5), 350 ms apart" },
  pulse:      { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "first count-on badge + halfTag (sum − 1 error); last badge (other errors)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "sumText; halfTag (from alpha 0, scale 0.6)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "hint badges, halfTag and sumText clearing after 900 ms" },
  slideIn:    { x: 360, duration: 320, ease: "Back.Out", trigger: "next domino arriving from x = 900" },
  wag:        { angle: 10, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "dog on a correct answer" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish dog" }
};
```
No flashing: `groupFlash` runs once per hint (one up-down in 440 ms); `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                       "3"  halfTag (295,80) during the hint   │
      │  dog (110,170)   ┌───────────┬───────────┐                    │  zone A
      │                  │  •     •  │  •        │  domino (360,160)  │
      │                  │     •     │        •  │  halves centred    │
      │                  └───────────┴───────────┘  at x=295 / 425    │
      │                     "3 + 2 = 5"  sumText (360,250)            │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "How many dots?" (360,296)                  │
      │        [ 4 ]        [ 5 ]        [ 6 ]   y=380                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop centred)                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. `ART.halfTag` sits 80 px above the centre of whichever half is larger (x = 295 or 425, y = 80).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- `ART.domino` centred (360, 160); `ART.divider` at (360, 160); pips `ART.pip` at the table offsets around half centres (295, 160) and (425, 160). The domino is not tappable.
- Hint layer: `ART.pipLit` replaces the larger half's pips during `ANIM.groupFlash`; `ART.halfTag` at (halfX, 80); `ART.countBadge` at each smaller-half pip (+0, −20) with the numeral in `THEME.colour.inkOnAccent`, 16 px `THEME.font.display`; `ART.sumText` at (360, 250).
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile.
- Caption `S("howManyAll")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 296), `wordWrap` 600.
- `ART.dog` at (110, 170) during play. Tap floors 96 ≥ 56; gaps 24.
- While the enacted count-on plays (≈ 1.5-2.5 s) the tiles are `setEnabled(false)`; they re-enable when it ends.
- Tab order: the three tiles left to right. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (left | right; tiles) with tiles = sum, sum − 1, sum + 1 (or sum − 2 where sum + 1 > 10), shuffled; the correct slot never repeats twice running (§13). The hint always starts from the LARGER half; for doubles it starts from the left half.
- **L1** (halves ≤ 3, doubles included, sums ≤ 6): (3 | 2; 5, 4, 6) · (2 | 2; 4, 3, 5) · (3 | 1; 4, 3, 5) · (3 | 3; 6, 5, 7) · (2 | 1; 3, 2, 4) · (1 | 1; 2, 1, 3)
- **L2** (larger half on the left, halves ≤ 5, sums ≤ 10): (4 | 3; 7, 6, 8) · (5 | 2; 7, 6, 8) · (5 | 4; 9, 8, 10) · (4 | 2; 6, 5, 7) · (5 | 3; 8, 7, 9) · (4 | 4; 8, 7, 9) · (5 | 5; 10, 9, 8) · (3 | 3; 6, 5, 7)
- **L3** (smaller half on the LEFT, a 6-pattern present, one blank half, sums ≤ 10): (3 | 6; 9, 8, 10) · (2 | 6; 8, 7, 9) · (4 | 6; 10, 9, 8) · (1 | 6; 7, 6, 8) · (4 | 5; 9, 8, 10) · (0 | 6; 6, 5, 7) · (3 | 5; 8, 7, 9) · (2 | 5; 7, 6, 8)

Play list of 10 per Rules; no item repeats within a session; a level's pool is reshuffled if exhausted.

Worked example: (3 | 2) first-try · (2 | 2) first-try → L2 · (4 | 3) taps 6 → hint: "4" over the left half, badges 5, 6, 7 with the 5 pulsing → taps 7 (helped) → L1 · (3 | 1) first-try · (3 | 3) first-try → L2 · (5 | 2) · (5 | 4) first-try → L3 · (3 | 6) taps 9 first-try (hint never needed; the child started from the 6) · (2 | 6) · (0 | 6) first-try → Finish: 10 mini dominoes, 9 first-try.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ART.sumText` "a + b = s", dog `ANIM.wag`, rail dot, next domino after 700 ms.
- What happens on a wrong answer:
  - sum − 1 (counted on starting at the larger number): nudge + `tone("nudge")`; the enacted count-on with the larger half flashing as one and the FIRST count-on badge pulsing together with the halfTag.
  - sum + 1 / sum − 2 / any other (count-all slip or a guess): nudge + tone; the enacted count-on with the LAST badge pulsing and the sum shown.
  - A tap during the hint: impossible (tiles disabled).
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted count-on → attempt 3 with the show-me ring; solved-with-help. No attempt 4. An item completed after any wrong tap is not first-try.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Domino Add"; `howManyAll` = "How many dots?".

## Sound
`tone("tap", a)` once when the larger half flashes as a group (its pitch already at the larger number); `tone("tap", k)` for each count-on badge (k = a + 1 … sum) so the pitch continues from the group note; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and the caption change; the domino is dots).
- [ ] Works at narrow width (400-px iframe: the domino, the dog and three tiles fully visible).
- [ ] Keyboard operable (Tab cycles the three tiles; Enter picks; the domino is not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] The pips on each half are laid out like a die face at every level.
- [ ] Tapping 6 for 4 | 3 shows "4" over the left half with all four pips flashing together, then badges 5, 6, 7 on the right half with the 5 pulsing.
- [ ] Tapping 8 for 4 | 3 shows the same count-on with the last badge (7) pulsing.
- [ ] The hint never numbers the pips of the larger half one by one.
- [ ] At the third level the smaller half is on the left and the hint still starts from the larger (right) half; a blank half appears once.
- [ ] Two first-try corrects in a row bring bigger dominoes; a wrong tap brings smaller ones.
- [ ] The finish screen shows ten mini dominoes with their sums and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, the count-on notes rise from the group note.
