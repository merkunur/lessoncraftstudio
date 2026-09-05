# 118 — Change Back

## Identity
- Slug: `change-back`
- Subject / topic: Mathematics / money — giving change within 20 units by counting ON from the price to the amount paid along a money number line (ones to the next ten, then a ten), in the child's own currency
- Age band: `8-9`
- Interaction pattern: `P7` — trace a path (with the tap-each-waypoint fallback), then tap the change amount
- Estimated build size: ~540 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P7 (the shape of 008, with the money line and a tens hop). Money rule (F-117, F-29, A-8, A-19, BUILD-CONVENTIONS §14): `LOCALE_DATA` declares the coin set for all eleven codes with REAL denominations only — en £ (1p 2p 5p 10p 20p), de/fr/it/es/nl/fi € (1c 2c 5c 10c 20c), pt R$ (5c 10c 25c 50c R$1), sv kr (1 2 5 10), da kr (1 2 5 10 20), no kr (1 5 10 20). Amounts are whole small units, never a decimal (F-29): families A-D count in 1s within 20; pt counts in 5-centavo steps within 100 c (the same line, scaled by five). "Paid" is always one coin (10 or 20 units; sv pays 20 with two 10-kr coins; pt pays 50 c or R$1). Coins are ART shapes at real relative diameter with the label from `LOCALE_DATA`; the hops unroll into unit cubes on error. Nothing is spoken.

## Learning
- Objective: Starting AT the price on a money number line, hops one unit at a time to the next ten and then one ten-hop to the amount paid, then taps the numeral that names the change (the total of the hops).
- Prerequisites: Counts on within 20 on a number line (game 008); reads numerals to 20 (pt: to 100 in fives); knows a 10-coin is ten ones (game 116).
- Curriculum links: F-1 (money in 9 of 15 sources), F-29 (currency 5-9 in EN, DE/FR/NL, ES, BR, IT; **SE, DK and NO do not require money before age 10; FI has no national money strand at 7-8** — those locales play with their real coins, but the row is not counted toward Nordic coverage, A-19), F-31 row "Money" → the change-giving form is placed at 8-9 (US 2.MD.C.8; England Y2 "find … change"; Germany Klasse 2 "Rückgeld"; France CE1-CE2 "rendre la monnaie"; Netherlands groep 4-5 "wisselgeld"; Spain 1º ciclo "devolver cambio"; Brazil EF03MA24 "troco"; Italy classe 2-3 "il resto"). F-105 (counting on starts AT the first number — the off-by-one), F-106 (the difference/comparison model of subtraction, not take-away), F-117 (coins as items vs values), F-108 (a ten-hop is ten ones).
- Common misconceptions (F-105, F-106, F-117, F-108), each with this game's response:
  1. **Counting the price as the first hop ("7, 8, 9, 10 — that's 4 change" for 10 − 7).** Response: the start pad (the price) carries no hop badge and no `ART.hopStrip` circle; hop 1 is the FIRST pad to the right. A wrong answer of change + 1 replays the hops with the hop-1 badge on the pad after the price pulsing (`ANIM.pulse`) — "the price is where you stand, not a hop".
  2. **Answering the amount paid or the price ("change = what I gave you" — the difference model missing, F-106).** Response: every answer set includes the paid amount as a distractor at L1-L2; tapping it replays the hops and then the hops' cubes gather under the line (`ART.unitCube`s, `ANIM.gather`) beside `ART.changeText` — the change is the PART between price and paid, shown as a length.
  3. **The ten-hop counted as one hop ("8, 9, 10, 20 — that's 4 change" for 20 − 7, F-108 / F-117).** Response: the ten-hop is drawn as a long arc (`ART.tenArc`) and its badge reads "10" (`ART.tenBadge`), not the next ordinal; on a wrong answer the ten-hop unrolls into a ten-rod with ten notches under the line (`ART.unitRod`, `ANIM.unroll`) and the count continues 11, 12, 13 on the cubes.
  4. **Coins as items — the change coins counted instead of valued ("three coins back" for 1 + 2 + 10).** Response: after the hops the change is shown BOTH as the coin row (`ART.changeCoin`s: one 1-unit coin per ones hop, one 10-coin per ten-hop) AND as the hop total; the coin row is never the answer, the numeral is; on a wrong tap the coin row unrolls into the same cubes as the hops.
  5. **Landing short or over (stopping before the paid pad; hopping past it).** Response: the path only accepts the exact number of hops: the pad beyond "paid" is not a waypoint (`ART.padDim`), and the answer tiles stay disabled until the last waypoint is reached (`ART.hopStrip` shows how many hops remain).

## How it plays
1. **Start screen**: title "Change Back", the raccoon shopkeeper (`ART.raccoon`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: price 7, paid 10)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: at the left the price tag (`ART.tag`, 96 × 44) at (110, 100) with `ART.priceText` ("7p" / "7c" / "7 kr" from `LOCALE_DATA[lang].label(v)`); at the right the paid coin (`ART.coinFace` at big scale with `ART.coinLabel`, here the 10-coin) at (610, 100) with `S("paid")` ("Paid") above it at (610, 62), 18 px `THEME.colour.inkSoft`; the raccoon at (360, 96) between them. The money line across zones A/B at y = 210: `ART.lineBar` from x = 40 to x = 680; pads (`ART.pad`, 56 × 56, pitch 60) from the price to the paid amount: the start pad at x = 90 labelled "7" with `ART.pointer` (the child's marker, a small triangle above the pad) on it; waypoint pads (`ART.padWay`) labelled 8, 9, 10 at x = 150 / 210 / 270; one `ART.padDim` labelled 11 at x = 330 beyond the paid pad (never a waypoint); the paid pad (10) is additionally ringed by `ART.paidRing`. Under the line, `ART.hopStrip` (3 hollow circles at y = 262, 20 px apart, centred under the start pad) shows how many hops to make. Zone B: three answer tiles (`ART.numeralTile`, 96 × 96) at y = 400, x = 240 / 360 / 480 — 3, 4, 10 in a shuffled order — DISABLED until the hops are done. Caption `S("change")` ("Change?") at (360, 320), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Hopping**: the child drags a finger from the start pad rightward (or taps each waypoint in order — the fallback, always available). When the pointer reaches waypoint k (within its 56 × 56 area) the marker hops there (`ANIM.hop`), the pad gets `ART.hopBadge` k, `ART.hopStrip` circle k fills, `tone("tap", k)`. A pad out of order does nothing (the next waypoint only is armed). After the last hop the paid pad's label grows (`ANIM.landGrow`), the change coins appear in a row under the line (`ART.changeCoin`, one per hop, at y = 300 from x = 90, pitch 40, `ANIM.appear`), and the answer tiles enable.
4. **Answering**: tap a tile.
   - **Correct (3)**: `ANIM.pop`, `tone("correct")`, praise pop (`GameCore.showPraise`, next key in rotation); `ART.changeText` ("3" with the unit label, e.g. "3p") appears at (610, 300) (`ANIM.appear`); the raccoon `ANIM.bow`; the rail dot fills; next item after 900 ms (line rebuilds with `ANIM.appear`).
   - **Wrong, change + 1 (counted the start as a hop)**: `ANIM.nudge`, `tone("nudge")`; the hops replay: the marker jumps back to the price, then hops with badges while the hop-1 badge pulses first (`ANIM.pulse`); ends on the paid pad. Attempt 2.
   - **Wrong, the paid amount or the price (10 or 7)**: nudge + tone; the replay, then the hop cubes gather under the line (`ART.unitCube` × 3, `ANIM.gather`) beside a faint `ART.changeText` — the change as a length. Attempt 2.
   - **Wrong, ones-hops + 1 at L3 (the ten-hop counted as one)**: nudge + tone; the replay, and when the ten-hop lands its `ART.tenBadge` "10" pulses and the hop unrolls into `ART.unitRod` under the arc (`ANIM.unroll`), then the cubes continue the count. Attempt 2.
   - **Second wrong**: the replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); solved-with-help.
5. **Items 2-12**: per Content/Rules. L1 paid 10, prices 5-9 (1-5 ones-hops); L2 paid 20, prices 11-19 (1-9 ones-hops, no ten-hop); L3 paid 20, prices 3-9: ones-hops to 10, then ONE ten-hop drawn as `ART.tenArc` to the paid pad (change 11-17). pt runs the same three levels with every number × 5 (paid 50 c / R$1; hops of 5 c; the "ten-hop" is a 50-c hop, badge "50").
6. **Finish**: `t("all_done")` (360, 110); the raccoon (360, 200) `ANIM.celebrate`; the summary = twelve chips (`ART.eqChip`, 150 × 36) in three rows of four from y = 330 (x = 135 + i × 150), each reading "paid − price = change" with the unit label (20 px `THEME.colour.ink`) — the change the child gave, not a score; optionally `t("question_x_of_y", {n: first-try solved, total: 12})` at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  raccoon:     { kind: "emoji", value: "🦝", size: 80 },
  tag:         { kind: "shape", shape: "roundRect", w: 96, h: 44, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },
  priceText:   { kind: "text",  value: "", size: 24, font: "display", color: "ink" },       // "7p" / "7c" / "7 kr" / "35c"
  coinFace:    { kind: "shape", shape: "circle", r: 24, fill: "surface2", stroke: "ink", strokeWidth: 2 },   // r = mm from LOCALE_DATA (big scale); inner ring stroke line at r − 4
  coinLabel:   { kind: "text",  value: "", size: 18, font: "display", color: "ink" },
  lineBar:     { kind: "shape", shape: "rect", w: 640, h: 4, fill: "line" },
  pad:         { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 28 },        // label 20 px display ink
  padWay:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 28 },
  padDim:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 28 },       // label inkSoft; never a waypoint
  paidRing:    { kind: "shape", shape: "circle", r: 34, stroke: "accent", strokeWidth: 4 },
  pointer:     { kind: "shape", shape: "polygon", points: [[-12,-42],[12,-42],[0,-26]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // the marker above the current pad
  hopBadge:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },        // hop number 16 px display inkOnAccent
  tenBadge:    { kind: "shape", shape: "roundRect", w: 36, h: 24, fill: "structure", radius: 8 },   // "10" (pt "50") 16 px display bg
  tenArc:      { kind: "shape", shape: "arc", r: 55, stroke: "structure", strokeWidth: 4 },        // a half-circle arc over the gap from the ten pad to the paid pad (chord 110)
  hopStrip:    { kind: "shape", shape: "circle", r: 8, stroke: "structure", strokeWidth: 2 },      // one per hop; filled = fill structure
  changeCoin:  { kind: "shape", shape: "circle", r: 13, fill: "surface2", stroke: "ink", strokeWidth: 2 },   // small-scale coin (r = mm × 0.6) for each hop: the 1-unit coin per ones hop, the 10-coin per ten-hop; label 11 px
  unitCube:    { kind: "shape", shape: "rect", w: 12, h: 12, fill: "accent", stroke: "bg", strokeWidth: 1 },
  unitRod:     { kind: "shape", shape: "rect", w: 120, h: 12, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches 12 px apart
  changeText:  { kind: "text",  value: "", size: 36, font: "display", color: "structure" },   // "3p" / "3c" / "3 kr" / "15c"
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 150, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Coins are circles at real relative diameter; the label is the only value cue; the paid coin's face is the same shape at big scale.

## Animation registry
```js
const ANIM = {
  hop:       { y: "-=36", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "pointer arc for one hop; x tweens to the pad in a parallel 260 ms Sine.InOut tween (a ten-hop uses 400 ms and y −60)" },
  landGrow:  { scale: 1.3, duration: 200, ease: "Back.Out", trigger: "paid pad label after the last hop" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hop-1 badge in an off-by-one replay; tenBadge in a ten-as-one replay" },
  gather:    { duration: 400, ease: "Sine.InOut", trigger: "hop cubes glide from under each hopped pad to a row beside changeText (x,y set at call)" },
  unroll:    { alpha: 1, scaleX: 1, duration: 500, ease: "Sine.Out", trigger: "unitRod grows under the ten arc from scaleX 0 (origin at its left end)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "change coins, changeText, new line and tiles (from alpha 0, scale 0.6)" },
  bow:       { angle: 12, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "raccoon on correct" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish raccoon" }
};
```
No flashing: `showMe` at 1 Hz; `pulse` three half-cycles; a replay is one continuous sequence of hops.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  [ 7p ] tag (110,100)     raccoon (360,96)     Paid  (10p) (610,100)│
      │      ▼ pointer                                               │  zone A
      │  ─[7]─(8)─(9)─(10)─(11)─────────────  line y=210, pitch 60   │
      │   x=90  waypoints    ringed paid   dim                       │
      │        ○ ○ ○  hopStrip y=262   (1p)(1p)(1p) change coins y=300│
260   ├──────────────────────────────────────────────────────────────┤
      │                  "Change?" (360,320)                         │
      │        [ 3 ]        [ 4 ]        [ 10 ]   tiles y=400        │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Pad positions: the start pad (price) at x = 90; the k-th ones pad at x = 90 + 60 k; at L3 the ten pad is followed by the paid pad 110 px further right under `ART.tenArc`, then one `ART.padDim` 60 px beyond it (omitted when it would pass x = 690). L2's widest line (price 11: pads 12 … 20 then 21 dim) ends at x = 690; L3's widest (price 3: pads 4 … 10, then 20 at 620, dim 21 at 680) fits. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.tag` (110, 100) with `ART.priceText`; `ART.coinFace` big scale at (610, 100) with `ART.coinLabel` (sv paid-20 items draw two 10-kr coins at (590, 100) and (632, 100)); `S("paid")` at (610, 62); `ART.raccoon` (360, 96).
- `ART.lineBar` centred (360, 210); pads centred on it: the start pad `ART.pad`, waypoints `ART.padWay` (each a `makeTile` 56 × 56 so the tap/keyboard fallback works), the paid pad `ART.padWay` with `ART.paidRing`, one `ART.padDim` beyond (not a tile). `ART.pointer` above the current pad (y = 210 − 42). `ART.tenArc` between the ten pad and the paid pad at L3, its `ART.tenBadge` at the arc's top.
- `ART.hopBadge` at each reached pad's top-right (+20, −20); `ART.hopStrip` circles at y = 262 centred under the start pad (a ten-hop's circle is drawn r 11); `ART.changeCoin`s at y = 300 from x = 90, pitch 40, labels from `LOCALE_DATA`; cubes/rods for the replays at y = 240 under their pads, gathering to (500, 300).
- Answer tiles: `makeTile` 96 × 96 (`ART.numeralTile`) at (240 / 360 / 480, 400); `ART.showRing` behind the correct tile; `ART.changeText` at (610, 300). Caption `S("change")` at (360, 320).
- Drag handling: `pointerdown` on the start pad arms the path; on `pointermove` while down the next waypoint's rectangle is tested each frame; `pointerup` leaves the path where it is (the child continues by dragging again or tapping). Tapping a waypoint directly always works (P7 fallback).
- Tap floors 56 (pads) / 96 (tiles); pitch 60 gives 4 px between pads — accepted because pads are reached in order and a mis-tap on the next pad IS the target; the answer distractors are never adjacent numbers on the line except the deliberate change ± 1.
- Tab order: the armed waypoint only, then the answer tiles.

## Content
Money is locale-bound. `LOCALE_DATA[lang]` = `{ coins: [{ v, label, mm }], step, label(v), family }`; `step` = 1 (families A-D) or 5 (pt); `label(v)` as in game 117 (en "7p"; € "7c"; pt "35c" and "R$1" for 100; sv/da/no "7 kr").

| lang | coins used (v · label · mm) | paid coin(s) | family |
|---|---|---|---|
| en | 1 "1p" 20 · 10 "10p" 24 · 20 "20p" 21 | 10p; 20p | A |
| de fr it es nl fi | 1 "1c" 16 · 10 "10c" 20 · 20 "20c" 22 | 10c; 20c | A |
| pt | 5 "5c" 22 · 50 "50c" 23 · 100 "R$1" 27 | 50c; R$1 | E |
| sv | 1 "1 kr" 20 · 10 "10 kr" 21 — [NSR-FLAG] native review | 10 kr; two 10 kr | B |
| da | 1 "1 kr" 20 · 10 "10 kr" 23 · 20 "20 kr" 27 — [NSR-FLAG] native review | 10 kr; 20 kr | A |
| no | 1 "1 kr" 21 · 10 "10 kr" 24 · 20 "20 kr" 28 — [NSR-FLAG] native review | 10 kr; 20 kr | A |

Items are authored in units (families A and B share them; sv only differs in drawing two 10-kr coins for "paid 20"; pt multiplies every number by 5). Item = (price; paid; change; answer tiles — the change plus two distractors).
- **L1** (paid 10; ones-hops only; distractors = change + 1 and the paid amount): (7; 10; 3; 3, 4, 10) · (8; 10; 2; 2, 3, 10) · (5; 10; 5; 5, 6, 10) · (6; 10; 4; 4, 5, 10) · (9; 10; 1; 1, 2, 10) · (7; 10; 3; 3, 4, 7)
- **L2** (paid 20; ones-hops only; distractors = change + 1 and the price or the paid amount): (17; 20; 3; 3, 4, 20) · (15; 20; 5; 5, 6, 15) · (18; 20; 2; 2, 3, 20) · (12; 20; 8; 8, 9, 12) · (14; 20; 6; 6, 7, 20) · (11; 20; 9; 9, 10, 11) · (16; 20; 4; 4, 5, 20) · (13; 20; 7; 7, 8, 13)
- **L3** (paid 20; ones-hops to 10 then one ten-hop; distractors = change + 1 and ones-hops + 1 — the "ten counted as one" answer): (7; 20; 13; 13, 14, 4) · (4; 20; 16; 16, 17, 7) · (8; 20; 12; 12, 13, 3) · (3; 20; 17; 17, 18, 8) · (6; 20; 14; 14, 15, 5) · (9; 20; 11; 11, 12, 2) · (5; 20; 15; 15, 16, 6)

pt renders the same items × 5 (e.g. L1 "35c paid 50c → 15c"; L3 "35c paid R$1 → 65c"; the ten-hop badge reads "50"; hop coins are 5-c coins and the 50-c coin).

Play list of 12 per Rules; a missed item re-enters after 2 intervening items (F-41) replacing the last unplayed item of its level; no item repeats otherwise; tile positions shuffled; the correct slot never repeats twice running.

Worked example (en): item 1 (7 → 10) drags 8, 9, 10; taps 3 → praise, "3p" · item 2 (8 → 10) first-try → L2 · item 3 (17 → 20) taps 4 → nudge; replay with hop 1 pulsing on 18; then 3 (helped) → L1 · items 4-5 first-try → L2 · items 6-7 first-try → L3 · item 8 (7 → 20) hops 8, 9, 10, then the long arc to 20; taps 4 → nudge; replay: the "10" badge pulses and a ten-rod grows under the arc, cubes count 11, 12, 13; then 13 (helped) → L2 · item 3 returns at position 10 and is solved first-try · items 11-12 first-try → Finish shows twelve "paid − price = change" chips.

## Rules
- Item count: 12 (including re-queued repeats, which replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next item from the next level up (cap L3).
- Adaptation: a wrong tile, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned; a missed item re-queues after 2 items.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ART.changeText` appears, raccoon `ANIM.bow`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - change + 1 (the price counted as hop 1): `ANIM.nudge` + `tone("nudge")`; replay with the hop-1 badge pulsing on the pad after the price.
  - The paid amount or the price tapped (no difference model): nudge + tone; replay, then the hop cubes gather into a row beside a faint `ART.changeText`.
  - ones-hops + 1 at L3 (the ten-hop counted as one): nudge + tone; replay; the "10" badge pulses and a ten-rod unrolls under the arc; cubes count on 11, 12 ….
  - Hops beyond the paid pad or out of order: refused silently by construction (not an attempt).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 12 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Change Back"; `paid` = "Paid"; `change` = "Change?". Amount labels come from `LOCALE_DATA`.

## Sound
`tone("tap", k)` on hop k (pitch rises with each hop; a ten-hop steps by ten — F-213); `tone("correct")` on the correct tile; `tone("nudge")` on a wrong tile; `tone("tap")` when a change coin appears; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (with `?lang=en` amounts read 7p / 10p / 3p; `?lang=de` 7c / 10c / 3c; `?lang=pt` 35c / 50c / 15c and R$1 at the third level; `?lang=sv` "paid 20" shows two 10 kr coins; chrome strings change with the picker).
- [ ] Works at narrow width (400-px iframe: the tag, the paid coin, the whole line to its dim pad and the three tiles visible; the third-level line with its long arc fits).
- [ ] Keyboard operable (Tab reaches the next waypoint pad only, then the answer tiles; Enter hops / picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item; a missed item comes back two items later).
- [ ] The marker starts ON the price pad, which has no hop badge; the first hop badge reads 1 on the next pad.
- [ ] Dragging right makes the marker hop pad by pad with badges; tapping the pads in order does the same; the pad beyond the paid pad never accepts a hop.
- [ ] Answer tiles are dimmed until the last hop lands on the ringed paid pad, and a row of change coins appears under the line (one 1-unit coin per hop).
- [ ] Tapping the change-plus-one tile replays the hops with the first hop's badge pulsing.
- [ ] Tapping the paid amount replays the hops and gathers the hop cubes into a row beside the change label.
- [ ] At the third level the ten-hop is a long arc badged "10"; tapping the ones-plus-one tile makes the badge pulse and a ten-rod unroll under the arc before the cubes count on.
- [ ] Two first-try corrects in a row bring paid-20 items then the ten-hop items; a wrong tile brings paid-10 items.
- [ ] No decimal amount appears anywhere in any language.
- [ ] The finish screen shows twelve "paid − price = change" chips and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each hop is a higher note and the ten-hop a big step.
