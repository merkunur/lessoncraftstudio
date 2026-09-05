# 140 — Two-Step Shop

## Identity
- Slug: `two-step-shop`
- Subject / topic: Mathematics / two-step problems within 100 (a stock changes twice: sold then delivered, delivered then sold), told by pictures
- Age band: `8-9`
- Interaction pattern: `P11` — keypad entry (up to two-digit answers; physical keyboard digits also work)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P11. Content is language-neutral (fruit, coins without denomination, numerals and the signs + − =); no `LOCALE_DATA`: **no currency symbol appears anywhere — the L3 coin jar counts plain coins as bare numerals (F-29), so nothing is locale-bound.** Nothing is spoken.

## Learning
- Objective: Works out the stock at a market stall after two changes shown in pictures (for example 24 apples, 12 sold, 8 more delivered), keeping the intermediate result, and types the final number.
- Prerequisites: Adds and subtracts within 100 mentally or with base-ten thinking (games 016-019, 131-132); reads two-digit numerals; solves one-step picture stories (game 138).
- Curriculum links: F-6 (word problems niche as games — 4 of 15 — yet required in every system; pictures replace the language), F-21 ("+/− within 100 by mental strategies" in all twelve systems), F-31 row "+/− within 100, mental" — conservative 7-9 → 8-9 (US 2.OA.A.1 "one- and two-step word problems within 100 … adding to, taking from"; England Y3 "solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction"; Germany Klasse 3 "Sachaufgaben mit zwei Rechenschritten"; France CE2 "problèmes à deux étapes"; Netherlands groep 5 "samengestelde contextopgaven"; Spain 2º ciclo "problemas de dos operaciones"; Brazil EF03MA06; Sweden åk 3 "problemlösning i flera steg"; Finland grade 3 "monivaiheiset sanalliset tehtävät").
- Common misconceptions (F-105, F-106, F-108), each with this game's response:
  1. **Stopping after one step (types 12 — the stock after the sale — or 32, the stock after only the delivery).** Response: the display clears (`ANIM.nudge`) and the two steps ENACT again with their intermediate totals: the 12 sold apples glide out to the customer's basket and the crate tag (`ART.crateTag`) shows "12"; then the 8 delivered apples glide in from the cart and the tag shows "20"; the chain `ART.chain` under the crate builds "24 − 12 = 12 → 12 + 8 = 20". The second step is shown to exist; the child re-types.
  2. **Adding everything (44) or applying the signs the wrong way round (24 + 12 − 8 = 28).** Response: the same enactment — apples LEAVE for the customer and ARRIVE from the cart; the direction of each glide is the sign, and the chain writes the sign the moment the apples move.
  3. **Smaller-from-larger in the subtraction step (43 − 17 → 34; F-106).** Response: at L2-L3 the crate holds its apples in rows of ten (`ART.rowOfTen` guides), so taking 17 from 43 visibly opens a whole row: the 3 loose apples go first, then 14 more from a full row (`ANIM.rowBreak`: the row's ten apples spread by 4 px before 14 leave) — the ten is broken into, the chain's step reads "43 − 17 = 26"; the bug's result (34) never appears as a tag.
  4. **Losing the intermediate result (right operations, wrong carry between steps: 24 − 12 = 12, then 24 + 8 = 32).** Response: the crate tag is the only running total on screen and it changes after each step; on a wrong answer the enactment pauses 600 ms on the intermediate tag with `ART.tagRing` around it (`ANIM.pulse`) before the second step plays — "start the second step from HERE".
  5. **Reading the crate count from the picture instead of the tag (miscounting 24 apples).** Response: the crate's apples are laid in rows of ten with `ART.rowOfTen` guides, and the tag numeral is always shown; the picture is the story, the tag is the number (integrated, F-42).

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Two-Step Shop"): the fox (`ART.fox`, the stallholder) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 24 − 12 + 8)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the stall — the crate (`ART.crate`, 240 × 190) centred at (240, 150) holding 24 `ART.apple`s (size 18, pitch 22) in rows of ten (`ART.rowOfTen` guide behind each full row; rows from the top: 10, 10, 4); the crate tag `ART.crateTag` "24" (40 px) on the crate's top-left corner at (140, 70); the fox at (60, 240) beside the crate; the customer (`ART.bear`) with a basket (`ART.basket`) at (620, 100), and the cart (`ART.cart`) at (620, 210) — both empty at first. Under the crate the chain `ART.chain` (24 px) at (240, 258), initially "24". To the right of centre the display card (`ART.card`, 180 × 84) at (560, 300) with `ART.display` (52 px) empty. **The story plays once, automatically, 600 ms after the item builds** (the situation, not the answer): step one — 12 apples glide from the crate to the basket (`ANIM.carryOut`, 60 ms apart, taking the loose ones first, then from the lowest full row), the basket's count `ART.basketTag` "12" appears, the chain becomes "24 − 12"; step two — 8 apples glide from the cart into the crate (`ANIM.carryIn`), the cart's `ART.cartTag` "8" shows, the chain becomes "24 − 12 + 8 = ?" with `ART.qBox` for the "?". The crate tag is HIDDEN from the moment the story starts (the child must track the total). A replay tile (`ART.replayTile`, 64 × 64, `ART.replayGlyph`) at (560, 380) replays the story (unlimited, free). Zone B: the keypad — keys 1-9 (`ART.key`, 60 × 60) in a 3 × 3 grid at x = 152 / 220 / 288, y = 316 / 384 / 452 (1 2 3 on the top row); backspace (`ART.key` with `ART.backGlyph`) at (152, 520) and 0 at (220, 520). Zone C: OK (`makeButton ok`) at (560, 480), disabled until the display holds a digit.
3. **Typing**: each digit tap appears on `ART.display` (`ANIM.digitIn`), `tone("tap")`; up to two digits (a third tap is ignored); backspace removes the last digit; physical keys 0-9, Backspace and Enter do the same; OK enables at the first digit. Nothing on the stall changes while typing (F-40).
4. **Check**: tap OK (or Enter).
   - **Correct (20)**: the display `ANIM.pop`s, `tone("correct")`; the crate tag reappears "20" with `ANIM.appear` and `ART.qBox` fills with "20"; the chain completes "24 − 12 + 8 = 20"; praise pop (rotation); the fox `ANIM.wave`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`) with an empty display.
   - **Wrong (12, 32, 44, 28, 20-off-by-some …)**: `tone("nudge")`; the display clears with `ANIM.nudge`; the enactment: the apples return to the crate (`ANIM.resetStock`, all at once), the crate tag shows "24"; step one replays with the sold apples counted out in tens-then-ones (`ART.countBadge` on the basket: "10", "12"), the crate tag changes to "12" and `ART.tagRing` pulses around it for 600 ms; step two replays, the crate tag changes to "20"; the chain builds "24 − 12 = 12 → 12 + 8 = 20"; then the crate tag HIDES again and the chain's last total is replaced by `ART.qBox` — the child re-types. OK disables until a digit is typed. Attempt 2 with the chain's intermediate step left visible ("24 − 12 = 12 → 12 + 8 = ▢").
   - **Wrong again (attempt 2)**: the enactment replays and the show-me: the answer builds itself on the display digit by digit (`ANIM.digitIn`, tens digit first) while the crate tag shows "20" and pulses; stays 1200 ms and clears; the child re-types it and taps OK, which now carries the show-me ring (`ART.showRing`, `ANIM.showMe`); the item completes as solved-with-help (no praise pop). A still-wrong re-type rebuilds the answer and waits.
5. **Re-queue** (F-41): an item wrong on the first OK re-enters the play list after 2 intervening items with its two steps in the OTHER order (24 + 8 − 12 = 20 — same answer, different path), then, if wrong again, near the end ("last look"). The item count stays 12; re-queued items replace the last unplayed items of the same level.
6. **Items 2-12**: per Content/Rules. L1 no regrouping in either step (sold-then-delivered and delivered-then-sold both appear); L2 one step crosses a ten (a row breaks open — `ANIM.rowBreak`); L3 the coin jar: the stall's jar (`ART.jar`) holds coins (`ART.coin`, plain discs, no symbol) in rows of ten, coins go OUT to the cart (the stall buys fruit) and come IN from the customer (a sale), both steps may cross a ten, numbers to 99.
7. **Finish**: `t("all_done")` (360, 110); the fox (360, 210) `ANIM.celebrate`; the summary = the twelve chains as chips (`ART.chainChip`, 200 × 36, label "24 − 12 + 8 = 20" 16 px) in three rows of four (y = 330 / 380 / 430; x = 360 − 1.5 × 210 + i × 210), first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record of what was worked out unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`. `GameCore.reportHeight()`.

Session ≈ 7 minutes (12 items × 30-40 s; each story ≈ 3 s).

## Art registry
```js
const ART = {
  fox:        { kind: "emoji", value: "🦊", size: 64 },
  bear:       { kind: "emoji", value: "🐻", size: 56 },
  apple:      { kind: "emoji", value: "🍎", size: 18 },
  cart:       { kind: "emoji", value: "🛒", size: 56 },
  coin:       { kind: "shape", shape: "circle", r: 8, fill: "accent", stroke: "structure", strokeWidth: 2 },      // a plain disc: no symbol, no value
  jar:        { kind: "shape", shape: "roundRect", w: 240, h: 190, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 24 },
  crate:      { kind: "shape", shape: "roundRect", w: 240, h: 190, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },
  rowOfTen:   { kind: "shape", shape: "roundRect", w: 224, h: 22, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 6 },     // a guide behind each full row of ten
  basket:     { kind: "shape", shape: "roundRect", w: 110, h: 80, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 14 },   // holds sold items in rows of 5, pitch 20
  crateTag:   { kind: "shape", shape: "roundRect", w: 72, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // numeral 40 px display ink
  basketTag:  { kind: "shape", shape: "roundRect", w: 56, h: 36, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 8 },              // "− 12" 22 px display inkOnAccent
  cartTag:    { kind: "shape", shape: "roundRect", w: 56, h: 36, fill: "bg", stroke: "structure", strokeWidth: 3, radius: 8 },           // "+ 8" 22 px display structure
  tagRing:    { kind: "shape", shape: "roundRect", w: 84, h: 60, stroke: "accent", strokeWidth: 4, radius: 12 },
  countBadge: { kind: "shape", shape: "roundRect", w: 40, h: 22, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 5 },   // numeral 13 px display structure
  chain:      { kind: "text",  value: "", size: 24, font: "display", color: "structure" },
  qBox:       { kind: "shape", shape: "roundRect", w: 34, h: 34, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 6 },   // dashed while empty; holds the answer 20 px inkOnAccent
  card:       { kind: "shape", shape: "roundRect", w: 180, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  display:    { kind: "text",  value: "", size: 52, font: "display", color: "ink" },
  key:        { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // digit 28 px display ink
  backGlyph:  { kind: "text",  value: "⌫", size: 28, font: "display", color: "structure" },
  replayTile: { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  replayGlyph:{ kind: "text",  value: "↻", size: 36, font: "display", color: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  chainChip:  { kind: "shape", shape: "roundRect", w: 200, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Stock layout inside the crate / jar: rows of ten from the top (y = 75 + r × 22), items at x = 135 + c × 22 (c = 0 … 9); a partial row is the last row. The basket and the cart show their items in rows of 5 (pitch 20). At L3 `ART.jar` replaces `ART.crate` and `ART.coin` replaces `ART.apple`; the roles swap (coins go OUT to the cart, IN from the customer) — the signs are still written by the direction of the glide. No currency symbol or denomination is ever drawn (F-29).

## Animation registry
```js
const ANIM = {
  carryOut:   { duration: 500, ease: "Sine.In", trigger: "each sold item glides from its crate slot to its basket slot (x, y set at call), 60 ms apart — the loose row first, then from the lowest full row" },
  carryIn:    { duration: 500, ease: "Sine.Out", trigger: "each delivered item glides from the cart to the crate's next free slot (x, y set at call), 60 ms apart" },
  rowBreak:   { x: "+=4", duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "a full row spreads by 4 px before items leave it (a ten is broken into)" },
  resetStock: { duration: 300, ease: "Sine.InOut", trigger: "all items glide back to the crate's starting layout before a replay (x, y set at call)" },
  digitIn:    { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a digit appears on the display (from alpha 0, scale 0.6); also the show-me digits" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a wrong answer (then its text is cleared)" },
  badgeIn:    { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "tags and count badges (from alpha 0, scale 0.5)" },
  pulse:      { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "tagRing around the intermediate crate tag; crate tag while the show-me answer builds" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "display on a correct answer" },
  wave:       { angle: 12, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "fox on a correct answer" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "crate tag on a correct answer; chain parts; new item (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish fox" }
};
```
No flashing: `showMe` cycles at 1 Hz; the story is one-shot (replay on the replay tile or a wrong answer).

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  [24] tag   ┌──────────────────────┐        bear + basket     │
      │  (140,70)   │ a a a a a a a a a a  │ row 10   (620,100) [−12] │
      │             │ a a a a a a a a a a  │ row 10                   │  zone A
      │  fox        │ a a a a              │ row 4    cart (620,210)  │
      │  (60,240)   └── crate (240,150) ───┘          [+8]            │
      │             "24 − 12 + 8 = ▢" (240,258)                      │
260   ├──────────────────────────────────────────────────────────────┤
      │      [1] [2] [3]  y=316          ┌───────────┐                │
      │      [4] [5] [6]  y=384          │    20     │ (560,300)      │  zone B
      │      [7] [8] [9]  y=452   keys   └───────────┘   [↻] (560,380)│
      │      x=152/220/288                                            │
480   ├──────────────────────────────────────────────────────────────┤
      │      [BK][0]      y=520                    [   OK   ] (560,480)│  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `a` = an apple (a coin at L3), BK = backspace. The keypad's fourth row sits at y = 520 (bottom edge 550 — inside the 16-px safe margin). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.crate` (or `ART.jar` at L3) centred (240, 150) with `ART.rowOfTen` guides behind full rows and the items per the layout note; `ART.crateTag` at (140, 70) with its numeral (hidden during the story and while typing; shown on a correct answer and during a replay).
- `ART.bear` at (620, 100) with `ART.basket` at (620, 140) and `ART.basketTag` at (660, 100); `ART.cart` at (620, 210) with `ART.cartTag` at (660, 210). `ART.tagRing` around the crate tag during the intermediate pause. `ART.countBadge` beside the basket / cart during a replay's tens-then-ones count.
- `ART.chain` at (240, 258), `wordWrap` 300, one line, with `ART.qBox` drawn in place of the "?".
- `ART.fox` at (60, 240). `ART.card` at (560, 300) with `ART.display` (52 px `THEME.font.display` `THEME.colour.ink`, digits fill from the left); `ART.replayTile` (`makeTile` 64 × 64 with `ART.replayGlyph`) at (560, 380).
- Keypad: 11 × `makeTile` 60 × 60 with `ART.key` tokens; digit labels 28 px `THEME.font.display` `THEME.colour.ink`; the backspace tile's label is `ART.backGlyph`. Gaps 8 (pitch 68); every key ≥ 56.
- OK: `makeButton ok` at (560, 480), alpha 0.5 while disabled; `ART.showRing` around it during show-me.
- Tab order: keys 1-9 in reading order, backspace, 0, the replay tile, then OK. Physical keyboard: `keydown` for 0-9, Backspace, Enter. During a story or a replay (≈ 3-5 s) the keys, the replay tile and OK are `setEnabled(false)`. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (start; step 1; step 2; answer). "−" = items leave to the basket (apples sold) or to the cart (coins paid out at L3); "+" = items arrive from the cart (apples delivered) or from the customer (coins received at L3). Both orders (sold-then-delivered, delivered-then-sold) appear at every level.
- **L1** (apples; no regrouping): (24; − 12; + 8; 20) · (35; − 15; + 6; 26) · (42; − 20; + 7; 29) · (18; + 6; − 4; 20) · (27; + 12; − 9; 30) · (56; − 23; + 11; 44) · (31; + 25; − 14; 42) · (48; − 16; + 5; 37)
- **L2** (apples; one step crosses a ten): (43; − 17; + 20; 46) · (36; + 27; − 15; 48) · (52; − 28; + 14; 38) · (29; + 33; − 20; 42) · (61; − 35; + 12; 38) · (47; + 18; − 30; 35) · (74; − 46; + 21; 49) · (38; + 45; − 22; 61)
- **L3** (coin jar; numbers to 99; both steps may cross a ten): (64; − 37; + 25; 52) · (58; + 36; − 49; 45) · (81; − 46; + 29; 64) · (47; + 45; − 38; 54) · (93; − 58; + 27; 62) · (29; + 53; − 47; 35) · (76; − 39; + 44; 81) · (35; + 48; − 59; 24)

Play list of 12 per Rules with re-queue (How it plays §5: the two steps in the other order, same answer); start at L1; shuffle within a level without repeats; two consecutive items never share an answer or a starting number.

Worked example: item 1 (24; − 12; + 8) types 20 → the crate tag reappears "20", chain completes · item 2 (18; + 6; − 4) types 20 → L2 · item 3 (43; − 17; + 20) types 34 (smaller-from-larger) → display clears, stock resets to 43, the 3 loose apples leave, a full row spreads and 14 more leave, the tag "26" pulses in its ring, then 20 arrive, tag "46"; types 46 (helped) → L1 · item 4 (35; − 15; + 6) first try · item 5 (42; − 20; + 7) first try → L2 · item 6 = re-queued (43; + 20; − 17) first try · items 7-12 at L2-L3 with one miss → Finish shows twelve chips, 10 with filled dots.

## Rules
- Item count: 12 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3). "First-try" = the first OK was correct.
- Adaptation: a wrong first OK on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item with its steps reordered (after 2 items, then a last look) without changing level.
- Stuck rule (an inactivity cue, never a clock): if 10 s pass with no key tapped, the replay tile `ANIM.pulse`s once; repeats every 10 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the display, `tone("correct")`, the crate tag reappears with the answer, the chain completes, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), fox `ANIM.wave`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - One step only (12 or 32 for 24 − 12 + 8): `tone("nudge")`, display clears; stock resets; both steps replay with the intermediate tag ringed and paused, then the second step; the chain shows "24 − 12 = 12 → 12 + 8 = ▢"; attempt 2.
  - Everything added (44) or signs swapped (28): the same replay — the glide directions are the signs.
  - Smaller-from-larger in a crossing step (34 for 43 − 17): the replay breaks a full row open (`ANIM.rowBreak`) before 14 leave it; the intermediate tag reads 26.
  - Intermediate result lost (32 = 24 + 8 after a correct first step): the replay pauses on the ringed intermediate tag "12" for 600 ms before step two starts.
  - A third digit typed: ignored (no error, no sound).
- Retry behaviour: attempt 1 unaided → attempt 2 with the chain's intermediate step left visible → attempt 3 the answer builds itself and the child re-types it with the ringed OK; solved-with-help. No attempt 4 (a still-wrong re-type rebuilds the answer and waits). Replaying the story is free and unlimited.
- Finish condition: 12 items → Finish. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Two-Step Shop". The play screen carries numerals and the signs + − = → only; the story is told by the pictures (F-204: ≤ 2 short sentences for 8-9 — this game uses none).

## Sound
`tone("tap", 1)` per item leaving and `tone("tap", 3)` per item arriving during a story (60 ms apart — a rapid run whose direction is audible as pitch, F-213); `tone("tap")` on each key; `tone("tap", 6)` when an intermediate tag is ringed; `tone("correct")` on a correct answer; `tone("nudge")` on a wrong answer (mellow); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; no sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change; the play screen shows no words in any language).
- [ ] Works at narrow width (400-px iframe: the crate, the customer and cart, the chain, the display, all eleven keys, the replay tile and OK visible and separate).
- [ ] Keyboard operable (Tab walks the keys, the replay tile and OK; Enter taps; physical digit keys type, Backspace deletes, Enter checks).
- [ ] Never auto-starts (the start screen waits for Start; the story plays only after an item builds inside Play).
- [ ] No losing state (wrong answers never end the session; after two wrong answers the correct number builds itself on the display and re-typing it completes the item).
- [ ] After an item builds, 12 apples glide to the customer's basket and "− 12" appears, then 8 glide in from the cart and "+ 8" appears; the crate tag is hidden from the first glide and the chain reads "24 − 12 + 8 = ▢".
- [ ] The replay tile plays the story again without changing anything; it can be used any number of times.
- [ ] Typing 20 and OK shows the crate tag "20" and completes the chain; typing 12 clears the display, resets the crate to 24 and replays both steps with the tag pausing, ringed, at "12".
- [ ] For 43 − 17 + 20, typing 34 makes three loose apples leave, a full row spread open and 14 more leave, with the ringed tag reading 26 before the delivery.
- [ ] At the third level the crate is a jar of plain coins with no currency sign or value on them; coins go out to the cart and in from the customer.
- [ ] A third digit is ignored; backspace removes the last digit; OK is dimmed while the display is empty.
- [ ] A missed item comes back two items later with its two steps in the other order and the same answer.
- [ ] Two first-try corrects in a row bring the harder level; two misses in a row bring the easier one.
- [ ] The finish screen lists twelve chains with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
