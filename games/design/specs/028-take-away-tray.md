# 028 — Take-Away Tray

## Identity
- Slug: `take-away-tray`
- Subject / topic: Mathematics / subtraction within 10 as take-away (remove b from a, count what remains)
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap the biscuits to be eaten, one by one; then a P1 numeral choice states what is left)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3. Content is language-neutral (biscuits, numerals, symbols); no `LOCALE_DATA`.

## Learning
- Objective: Reads a − b, taps exactly b of the a biscuits on the tray so they are eaten one at a time with a running count, and then taps the numeral for how many remain.
- Prerequisites: Counts to 10 with one-to-one correspondence (game 001); reads numerals to 10; has met the minus sign as "take away" with objects.
- Curriculum links: F-1 (subtraction within 20 in 12 of 15 sources), F-4 (take-away in the UK reception/Y1 core), F-106 (take-away is the first subtraction model; difference comes separately — game 029), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US K.OA.A.1-2 "subtraction as taking apart and taking from" / 1.OA.A.1; England Y1 "subtract one-digit numbers to 10"; Germany Klasse 1 "Subtraktion als Wegnehmen im Zahlenraum bis 10"; France CP "soustraction — retirer"; Netherlands groep 3 "aftrekken tot 10, eraf"; Spain 1º ciclo "restar quitando"; Brazil EF01MA08; Sweden åk 1 "ta bort"; Finland grade 1 "vähennyslasku").
- Common misconceptions (F-106, F-101), each with this game's response:
  1. **Taking away the wrong number (eating 4 when the sum says 3, or stopping at 2).** Response: the tray refuses a (b + 1)-th biscuit — once b are eaten the remaining biscuits become non-tappable (`ART.biscuitStay` look) and the answer tiles enable; before b are eaten the tiles are disabled, and the take-strip (`ART.takeStrip`: b hollow circles filling one per eaten biscuit) shows how many are still to go. The count of the take is enforced by the object, not by a verdict.
  2. **Answering with the number taken away (7 − 3 → "3").** Response: b is always a distractor tile; on that tap the crumbs (`ART.crumb`) dim to alpha 0.3 and the REMAINING biscuits count themselves with `ART.countBadge` 1 … a − b (300 ms apart, `tone("tap", k)`) ending with `ART.leftTag` (the remaining count, 48 px) above the tray — what is left, not what went.
  3. **Answering with the starting number (7).** Response: a is a distractor at L1-L2; the same enacted re-count of the remaining biscuits; the equation strip (`ART.eqText`) shows "7 − 3 = 4" for 900 ms so the whole, the take and the rest are on one line.
  4. **Off-by-one counting of what is left (double-counting or skipping a biscuit).** Response: the re-count badges each remaining biscuit exactly once in tray order; the biscuits are laid in the same row/two-row layout every item (F-105: regular layouts), never scattered.
  5. **Counting the crumbs as still there.** Response: an eaten biscuit is replaced by `ART.crumb` (a small `inkSoft` scatter, 24 px) — visibly not a biscuit — and is not a tile any more; the re-count skips crumbs by construction.

## How it plays
1. **Start screen**: title "Take-Away Tray", the hamster (`ART.hamster`) at (360, 200), Start, picker.
2. **Item 1 (L1: 5 − 2)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the equation (`ART.eqText`, 44 px) "5 − 2 = ?" at (360, 90); the tray (`ART.tray`, 480 × 140) centred at (360, 185) holding 5 biscuits (`ART.biscuit` as the label of 64 × 64 `makeTile`s, pitch 76, one row at y = 185: x = 208, 284, 360, 436, 512); the hamster at (80, 185) beside the tray, mouth toward it; under the tray `ART.takeStrip` (2 hollow circles at y = 262, 22 px apart, centred) shows how many to eat. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 400, x = 240 / 360 / 480: 3, 2, 5 shuffled, DISABLED until two biscuits are eaten. Caption `S("takeAway")` ("Take some away") at (360, 300), 24 px `THEME.colour.inkSoft`.
3. **Eating**: the child taps a biscuit. It `ANIM.pop`s, plays `tone("tap", k)` (k = 1 for the first eaten, 2 for the second …), glides (`ANIM.toMouth`) to the hamster, the hamster `ANIM.munch`es, and a `ART.crumb` appears at the biscuit's tray position with `ART.countBadge` k; the k-th circle of the take-strip fills. The tile is removed from the Tab list. When the b-th biscuit is eaten: the remaining biscuits switch to the `ART.biscuitStay` look (a soft `structureSoft` plate under each — "these stay") and `setEnabled(false)` for tapping; after 500 ms the numeral tiles enable; the caption changes to `S("howManyLeft")` ("How many are left?").
4. **Answering**: the child taps a tile.
   - **Correct (3)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); `ART.eqText` completes "5 − 2 = 3"; `ART.leftTag` "3" appears over the tray with `ANIM.appear`; the hamster `ANIM.munch`es once more; rail dot fills; after 800 ms the next tray slides in (`ANIM.trayIn`).
   - **Wrong — tapped b (the number eaten)**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; the crumbs dim (`ANIM.dimCrumbs`); the remaining biscuits get `ART.countBadge` 1 … a − b in turn (300 ms apart, `tone("tap", k)`), the last badge `ANIM.lastBadge`s and `ART.leftTag` appears for 900 ms, then the badges and tag fade (`ANIM.fadeOut`). Attempt 2.
   - **Wrong — tapped a or an off-by-one**: nudge + tone; the same re-count of the remaining biscuits; `ART.eqText` shows "5 − 2 = 3" for 900 ms then reverts to "5 − 2 = ?". Attempt 2.
   - **Second wrong**: the re-count again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
   - **Tap on a numeral before b are eaten**: cannot happen (tiles disabled). **Tap on a remaining biscuit after b are eaten**: ignored (non-tappable; no nudge — it is not an error to notice).
5. **Items 2-10**: per Content/Rules. L1 a ≤ 6, b ≤ 3, one row; L2 a ≤ 10, b ≤ 5, two rows of five for a > 5; L3 a ≤ 10 including "take all" (b = a → 0 left) and "take none" (b = 0 → the take-strip is empty, the tiles enable at once) items.
6. **Finish**: `t("all_done")` (360, 110); the hamster (360, 200) `ANIM.celebrate` with a heap of crumbs (`ART.crumbHeap` at (360, 260)); the summary = the ten completed equations as chips (`ART.eqChip`, 130 × 36, "7 − 3 = 4") in two rows of five from y = 330 (pitch 140), first-try chips with `ART.dotFull` at their left, helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  hamster:     { kind: "emoji", value: "🐹", size: 80 },
  biscuit:     { kind: "emoji", value: "🍪", size: 48 },          // label of a 64×64 makeTile
  eqText:      { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  tray:        { kind: "shape", shape: "roundRect", w: 480, h: 140, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  biscuitTile: { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "line", strokeWidth: 1, radius: 12 },   // transparent-looking: same fill as the tray
  biscuitStay: { kind: "shape", shape: "circle", r: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // plate drawn under a remaining biscuit once the take is complete
  crumb:       { kind: "shape", shape: "circle", r: 5, fill: "inkSoft" },    // drawn 3× at offsets (−10,4) (2,−8) (10,6) where a biscuit was
  countBadge:  { kind: "shape", shape: "circle", r: 13, fill: "structure" },  // numeral 16 px display, color bg
  takeStrip:   { kind: "shape", shape: "circle", r: 8, stroke: "accent", strokeWidth: 2 },   // b of these; filled = fill accent
  leftTag:     { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  crumbHeap:   { kind: "shape", shape: "ellipse", w: 120, h: 40, fill: "inkSoft" },   // finish screen, alpha 0.5
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Biscuit layout on the tray (centre (360, 185)): a ≤ 5 → one row at y = 185, x = 360 − (a − 1) × 38 + i × 76; a = 6-10 → row 1 holds 5 at y = 150 (x = 208 + i × 76), row 2 the rest at y = 222, centred by the same formula.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "biscuit tapped; correct tile" },
  toMouth:   { duration: 300, ease: "Sine.In", trigger: "an eaten biscuit glides to the hamster (x,y = hamster position at call) then is destroyed" },
  munch:     { scale: 1.08, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hamster as each biscuit arrives; again on a correct answer" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  dimCrumbs: { alpha: 0.3, duration: 200, ease: "Sine.Out", trigger: "all crumbs at the start of a re-count" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge (from alpha 0, scale 0.5)" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last remaining biscuit's badge in a re-count" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "leftTag; new item's tray contents (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "re-count badges and leftTag clearing after 900 ms" },
  trayIn:    { x: 360, duration: 320, ease: "Back.Out", trigger: "next tray arriving from x = 900" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hamster" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "7 − 3 = ?"  eqText (360,90)               │
      │ hamster  ┌──────────────────────────────────────┐   "4"       │  zone A
      │ (80,185) │  B    B    B    B    B     row y=150 │  leftTag    │
      │          │     B    B    ·    ·      row y=222 │  (620,120)  │
      │          └──────── tray (360,185) 480×140 ──────┘             │
      │                  ○ ○ ○  takeStrip y=262                      │
260   ├──────────────────────────────────────────────────────────────┤
      │            "Take some away" / "How many are left?" (360,300) │
      │        [ 3 ]        [ 4 ]        [ 7 ]   y=400                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop centred)                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
`B` = a biscuit tile; `·` = crumbs where a biscuit was eaten. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- `ART.eqText` (360, 90); `ART.tray` centred (360, 185); biscuits: `makeTile` 64 × 64 with `ART.biscuitTile` tokens and `ART.biscuit` as label (through the draw helper), positions per the layout note; `ART.biscuitStay` plate drawn under each remaining biscuit once the take is complete; `ART.crumb` × 3 at each eaten position; `ART.countBadge` at a biscuit's (+24, −24) with the numeral in `THEME.colour.bg`, 16 px `THEME.font.display`.
- `ART.takeStrip` circles at y = 262 centred under the tray (b of them, 22 px apart; none for b = 0); `ART.leftTag` at (620, 120).
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`, disabled (alpha 0.5) until the take is complete; `ART.showRing` behind the correct tile.
- Caption `S("takeAway")` then `S("howManyLeft")` at (360, 300), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600, two lines max.
- `ART.hamster` at (80, 185). Tap floors: biscuits 64, tiles 96 (≥ 56); biscuit gaps 12 (pitch 76); tile gaps 24.
- During a re-count (≈ 1.5-3 s) the tiles are `setEnabled(false)`; they re-enable when it ends.
- Tab order: biscuits in tray order (row 1 left → right, then row 2), then the three tiles. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (a − b; tiles) with tiles = a − b, b, a at L1-L2 (or a − b ± 1 where b or a would duplicate the answer) and a − b, a − b − 1, a − b + 1 at L3 (0 as a tile where the answer is 0 or 1). Tile slots shuffled; the correct slot never repeats twice running (§13).
- **L1** (a ≤ 6, b ≤ 3, one row): (5 − 2; 3, 2, 5) · (4 − 1; 3, 1, 4) · (6 − 3; 3, 6, 2) · (5 − 3; 2, 3, 5) · (6 − 2; 4, 2, 6) · (4 − 3; 1, 3, 4)
- **L2** (a ≤ 10, b ≤ 5, two rows for a > 5): (7 − 3; 4, 3, 7) · (8 − 5; 3, 5, 8) · (9 − 4; 5, 4, 9) · (10 − 5; 5, 10, 4) · (8 − 2; 6, 2, 8) · (9 − 5; 4, 5, 9) · (7 − 4; 3, 4, 7) · (10 − 3; 7, 3, 10)
- **L3** (a ≤ 10; take-all and take-none included): (8 − 8; 0, 1, 8) · (6 − 6; 0, 1, 6) · (9 − 0; 9, 8, 10) · (7 − 6; 1, 0, 2) · (10 − 9; 1, 0, 2) · (9 − 7; 2, 1, 3) · (10 − 6; 4, 3, 5) · (8 − 7; 1, 2, 0)

Play list of 10 per Rules; no item repeats within a session; a level's pool is reshuffled if exhausted.

Worked example: (5 − 2) eats 2, taps 3 first-try · (4 − 1) first-try → L2 · (7 − 3) eats 3, taps 3 → crumbs dim, remaining four badged 1-4, "4" appears → taps 4 (helped) → L1 · (6 − 3) first-try · (5 − 3) first-try → L2 · (8 − 5) · (9 − 4) first-try → L3 · (8 − 8) eats all eight, taps 0 first-try · (9 − 0) tiles enable at once, taps 9 first-try · (7 − 6) first-try → Finish: 10 chips, 9 with filled dots.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tile on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- Stuck rule (an inactivity cue only, never a clock): if 6 s pass with fewer than b biscuits eaten and no tap, the take-strip's next empty circle `ANIM.pop`s once; repeats every 6 s of inactivity. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the equation completes, `ART.leftTag` appears, hamster `ANIM.munch`, rail dot, next tray after 800 ms.
- What happens on a wrong answer:
  - b (the number eaten): nudge + `tone("nudge")`; the crumbs dim and the remaining biscuits count themselves with badges, ending on the left tag.
  - a (the starting number) or an off-by-one: nudge + tone; the same re-count, with the completed equation shown for 900 ms.
  - Eating more than b: impossible (the tray refuses); eating fewer: the tiles stay disabled and the stuck rule cues the strip.
- Retry behaviour: attempt 1 unaided → attempt 2 after the re-count → attempt 3 with the show-me ring; solved-with-help. No attempt 4. An item completed after any wrong tile is not first-try.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Take-Away Tray"; `takeAway` = "Take some away"; `howManyLeft` = "How many are left?".

## Sound
`tone("tap", k)` on the k-th eaten biscuit (pitch rises with the take) and on the k-th badge of a re-count; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and both captions change; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: the tray with ten biscuits, the hamster and three tiles fully visible).
- [ ] Keyboard operable (Tab walks the biscuits in tray order, then the tiles; Enter eats / picks; an eaten biscuit leaves the Tab list).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] Each eaten biscuit flies to the hamster and leaves crumbs with its number; the strip under the tray fills one circle per biscuit.
- [ ] After the right number are eaten, the remaining biscuits sit on plates and cannot be tapped; the numeral tiles enable.
- [ ] Numeral tiles are dimmed until the take is complete.
- [ ] Tapping the number eaten (3 for 7 − 3) dims the crumbs and numbers the remaining biscuits 1-4 with a big 4 above the tray.
- [ ] At the third level "8 − 8" ends with an empty tray and 0 is the answer; "9 − 0" enables the tiles immediately.
- [ ] Two first-try corrects in a row bring bigger trays; a wrong tile brings smaller ones.
- [ ] The finish screen lists the ten subtractions with a filled dot for first-try ones and a hollow dot for helped ones; no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each eaten biscuit is a higher note than the last.
