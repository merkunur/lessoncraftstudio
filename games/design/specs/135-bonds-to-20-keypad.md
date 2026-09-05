# 135 — Bonds to 20

## Identity
- Slug: `bonds-to-20-keypad`
- Subject / topic: Mathematics / number bonds to 20 (the partner that completes a double ten-frame)
- Age band: `6-8`
- Interaction pattern: `P11` — keypad entry (one- or two-digit answers; physical keyboard digits also work)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P11. Content is language-neutral (counters, frames, numerals); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Types the number that, added to a quantity shown on a double ten-frame, makes exactly 20, using the full ten and the ones as the structure.
- Prerequisites: Bonds to 10 (games 004, 021-023); reads and types numerals to 20; knows a full ten-frame is 10 (game 003).
- Curriculum links: F-1 (number bonds in 8 of 15 sources), F-4 (number bonds to 10/20 on the UK 5-7 map), F-21 ("number composition to 10 (bonds, part-whole); +/− facts to 20"), F-31 row "+/− facts to 20" — conservative 7-8 → 6-8 (US 1.OA.C.6 "add and subtract within 20 … making ten"; England Y1-2 "number bonds to 20"; Germany Klasse 1 "Zahlzerlegungen bis 20, Zehnerübergang"; France CP "compléments à 20"; Netherlands groep 3-4 "aanvullen tot 20"; Spain 1º ciclo; Brazil EF01MA08; Sweden åk 1-3 "talkamrater upp till 20"; Finland grades 1-2 "lukujen hajottaminen 20:een").
- Common misconceptions (F-104, F-108), each with this game's response:
  1. **Typing the ones digit of the shown number (3 for 13): the child reads "how many loose ones?" instead of "how many more to 20?".** Response: on the wrong answer the display clears (`ANIM.nudge`) and the empty cells fill themselves one by one with hollow counters (`ART.ghostCounter`), each badged with the running count 14, 15 … 20 (`ART.countBadge`, `tone("tap", k)` rising); when the frames are full a `ART.partBadge` "7" appears over the hollow group — the seven that were needed are shown as seven objects, not stated.
  2. **Adding the two visible numbers (13 + 20 = 33) or answering 20 itself.** Response: the display accepts two digits so the error can be typed; the same filling enactment answers it — there is no room for 33 or 20 more counters on a frame that has seven empty cells.
  3. **Filling only to the next ten (4 for 6: the first frame fills, the second is forgotten).** Response: at L2 the shown number is under 10, so the whole second frame is empty; the enactment fills the first frame's gap (7, 8, 9, 10) and then the entire second frame (11 … 20) with the `ART.tenBracket` drawn under the second frame and a "10" badge; the part badge reads 14.
  4. **Reading a teen backwards (13 as 31 — F-108; de/nl/da word order).** Response: the shown quantity is always a full first frame plus loose ones in the second (a ten and some), never a numeral alone: the frames carry the structure. When the item's numeral is shown (`ART.shownNumeral`), the enactment badges the full frame "10" first and then the ones, tens-then-ones.
  5. **Off-by-one (6 or 8 for 13): counting the empty cells with a skip or a double.** Response: the enactment badges each empty cell with the running count so the count 14 … 20 has exactly seven steps; on the third attempt the answer builds itself digit by digit on the display (`ANIM.digitIn`) while the hollow counters pulse.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Bonds to 20"): the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 13 shown; answer 7)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the double ten-frame — frame A centred (170, 150) and frame B centred (400, 150), each 2 rows × 5 cells of `ART.cell` (36 × 36, pitch 40; frame size 200 × 80) with a `THEME.colour.structure` 3 px border; the shown quantity fills frame A completely (10 `ART.counter`s) and frame B's top row left to right with 3 more; `ART.shownNumeral` "13" (36 px) sits under the frames at (285, 215) with `ART.plusText` "+ ? = 20" beside it (the "?" is `ART.qBox`, a small dashed box) — the whole prompt reads "13 + ▢ = 20". The hedgehog at (60, 230). To the right the display card (`ART.card`, 180 × 84) at (600, 130) with `ART.display` (52 px) empty; under it the caption `S("makeTwenty")` ("Make 20") at (600, 200), 22 px `THEME.colour.inkSoft`. Zone B: the keypad — keys 1-9 (`ART.key`, 60 × 60) in a 3 × 3 grid at x = 292 / 360 / 428, y = 296 / 364 / 432 (1 2 3 on the top row); the fourth row at y = 500: backspace (`ART.key` with `ART.backGlyph`) at (292, 500) and 0 at (360, 500). Zone C: OK (`makeButton ok`) at (560, 500), disabled until the display holds a digit.
3. **Typing**: each digit tap appears on `ART.display` (`ANIM.digitIn`), `tone("tap")`; up to two digits (a third tap is ignored); backspace removes the last digit; physical keys 0-9, Backspace and Enter do the same; OK enables at the first digit. The frames do not react while typing (predict-then-check, F-40).
4. **Check**: tap OK (or Enter).
   - **Correct (7)**: the display `ANIM.pop`s, `tone("correct")`; the seven empty cells fill with `ART.ghostCounter`s in order (100 ms apart, `tone("tap", k)` for k = 14 … 20) so the completed 20 is seen on every success (F-43); `ART.qBox` fills with "7" (`ART.eqText` "13 + 7 = 20" replaces the prompt); praise pop (rotation); the hedgehog `ANIM.curl`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`) with an empty display.
   - **Wrong (3, 20, 33, 6, 8 …)**: `tone("nudge")`; the display clears with `ANIM.nudge`; the enactment: the empty cells fill with hollow counters one by one (250 ms apart) each with `ART.countBadge` 14, 15 … 20 and a rising tone; then `ART.partBadge` (the count of hollow counters, "7") appears centred over the hollow group with `ANIM.badgeIn`; the hollow counters and badges STAY visible; OK disables until a digit is typed. Attempt 2 with the completed frame in view.
   - **Wrong again (attempt 2)**: the enactment replays; then the show-me: the answer builds itself on the display digit by digit (`ANIM.digitIn`, tens digit first if any) while the hollow counters `ANIM.pulse`, stays 1200 ms and clears; the child re-types it and taps OK, which now carries the show-me ring (`ART.showRing`, `ANIM.showMe`); the item completes as solved-with-help (no praise pop). A still-wrong re-type rebuilds the answer and waits.
5. **Re-queue** (F-41): an item wrong on the first OK re-enters the play list after 2 intervening items as its MIRROR (the partner shown, the original quantity as the answer: 7 shown → type 13), then, if wrong again, near the end ("last look"). The item count stays 12; re-queued items replace the last unplayed items of the same level.
6. **Items 2-12**: per Content/Rules. L1 shown numbers 11-19 (a full frame plus ones; answers 1-9); L2 shown numbers 1-9 (answers 11-19: fill the gap, then a whole frame); L3 mixed, including 10 (answer 10) and reversed prompts "? + 13 = 20" (`ART.qBox` first).
7. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 210) `ANIM.celebrate`; the summary = the twelve bonds as chips (`ART.bondChip`, 110 × 36, label "13 + 7" 18 px) in two rows of six (y = 370 and y = 420; x = 360 − 2.5 × 118 + i × 118), first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record of what was retrieved unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`. `GameCore.reportHeight()`.

Session ≈ 6 minutes (12 items × 25-35 s).

## Art registry
```js
const ART = {
  hedgehog:     { kind: "emoji", value: "🦔", size: 72, fallback: "🐿" },   // Unicode 10 hedgehog; fallback chipmunk
  cell:         { kind: "shape", shape: "roundRect", w: 36, h: 36, fill: "surface", stroke: "line", strokeWidth: 2, radius: 6 },
  counter:      { kind: "shape", shape: "circle", r: 14, fill: "structure" },
  ghostCounter: { kind: "shape", shape: "circle", r: 14, fill: "surface", stroke: "accent", strokeWidth: 3 },   // the "still needed" counters — hollow, ringed
  countBadge:   { kind: "shape", shape: "circle", r: 11, fill: "bg" },                                          // numeral 12 px display structure, on a ghost counter
  partBadge:    { kind: "shape", shape: "roundRect", w: 56, h: 40, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 10 },   // numeral 26 px display inkOnAccent
  tenBracket:   { kind: "shape", shape: "rect", w: 200, h: 6, fill: "structure" },                              // under frame B when a whole ten was needed; "10" badge 16 px above its centre
  shownNumeral: { kind: "text",  value: "", size: 36, font: "display", color: "ink" },
  plusText:     { kind: "text",  value: "+ ? = 20", size: 36, font: "display", color: "structure" },           // the "?" is drawn as ART.qBox at runtime
  qBox:         { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 8 },   // dashed while empty; holds the answer 28 px when solved
  eqText:       { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  card:         { kind: "shape", shape: "roundRect", w: 180, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  display:      { kind: "text",  value: "", size: 52, font: "display", color: "ink" },
  key:          { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // digit 28 px display ink
  backGlyph:    { kind: "text",  value: "⌫", size: 28, font: "display", color: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  bondChip:     { kind: "shape", shape: "roundRect", w: 110, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Filled and needed counters differ by fill AND ring AND badge — never by colour alone. The frames fill in the standard order (frame A top row left→right, bottom row, then frame B — F-48/F-50).

## Animation registry
```js
const ANIM = {
  digitIn:  { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a digit appears on the display (from alpha 0, scale 0.6); also the show-me digits" },
  nudge:    { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a wrong answer (then its text is cleared)" },
  fillIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each ghost counter appears in the next empty cell (from alpha 0, scale 0.5); 250 ms apart in the enactment, 100 ms apart on a correct answer" },
  badgeIn:  { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges and the part badge (from alpha 0, scale 0.5)" },
  pop:      { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "display on a correct answer" },
  pulse:    { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the hollow counters while the show-me answer builds" },
  curl:     { scale: 0.85, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog on a correct answer" },
  appear:   { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item's frames and prompt (from alpha 0, scale 0.6)" },
  showMe:   { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate:{ angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```
No flashing: `showMe` cycles at 1 Hz; the show-me digits appear once each.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌●─●─●─●─●┐   ┌●─●─●─○─○┐          ┌───────────┐            │
      │  │●│●│●│●│●│   │○│○│○│○│○│          │    7      │ (600,130) │  zone A
      │  └─────────┘   └─────────┘          └───────────┘            │
      │  frame A (170,150)  frame B (400,150)   "Make 20" (600,200)  │
      │  hedgehog (60,230)   13 + ▢ = 20  (285,215)                  │
260   ├──────────────────────────────────────────────────────────────┤
      │              [1] [2] [3]   y=296                              │
      │              [4] [5] [6]   y=364     keys 60×60               │  zone B
      │              [7] [8] [9]   y=432     x=292/360/428            │
480   ├──────────────────────────────────────────────────────────────┤
      │              [BK][0]       y=500            [   OK   ] (560,500)│  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `●` = a counter, `○` = an empty cell (hollow ringed counters appear there during the enactment), BK = backspace. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Frame A cells at x = 90 + c × 40 (c = 0..4), y = 130 (top) / 170 (bottom); frame B cells at x = 320 + c × 40, same rows; each frame's border a 3 px `THEME.colour.structure` rectangle 204 × 84; `ART.counter` centred in a filled cell; `ART.ghostCounter` in a needed cell during the enactment with `ART.countBadge` at its (+12, −12); `ART.partBadge` centred over the hollow group (its bounding box centre); `ART.tenBracket` under frame B at (400, 200) when the whole of frame B was needed.
- Prompt at y = 215: `ART.shownNumeral` at (200, 215), `ART.plusText` from x = 235 with `ART.qBox` drawn in place of the "?" (dashed stroke, lineDash [6, 5]) — for reversed L3 prompts the box comes first ("▢ + 13 = 20"); `ART.eqText` replaces the prompt when solved.
- `ART.hedgehog` at (60, 230). `ART.card` at (600, 130) with `ART.display` (52 px `THEME.font.display` `THEME.colour.ink`, digits fill from the left); caption `S("makeTwenty")` at (600, 200), `wordWrap` 180.
- Keypad: 11 × `makeTile` 60 × 60 with `ART.key` tokens; digit labels 28 px `THEME.font.display` `THEME.colour.ink`; the backspace tile's label is `ART.backGlyph`. Gaps 8 (pitch 68); every key ≥ 56.
- OK: `makeButton ok` at (560, 500), alpha 0.5 while disabled; `ART.showRing` around it during show-me.
- Tab order: keys 1-9 in reading order, backspace, 0, then OK. Physical keyboard: `keydown` for 0-9, Backspace, Enter. During an enactment (≈ 2-3 s) the keys and OK are `setEnabled(false)`. Under `?embed=1` the picker is not created.

## Content
Language-neutral except the caption ("Make 20"). Items as (shown; answer; prompt form).
- **L1** (a full frame plus ones; answers 1-9): (13; 7; a + ? = 20) · (15; 5; a + ? = 20) · (11; 9; a + ? = 20) · (18; 2; a + ? = 20) · (12; 8; a + ? = 20) · (16; 4; a + ? = 20) · (14; 6; a + ? = 20) · (19; 1; a + ? = 20) · (17; 3; a + ? = 20)
- **L2** (under ten shown; the gap then a whole frame; answers 11-19): (6; 14; a + ? = 20) · (3; 17; a + ? = 20) · (8; 12; a + ? = 20) · (5; 15; a + ? = 20) · (9; 11; a + ? = 20) · (2; 18; a + ? = 20) · (7; 13; a + ? = 20) · (4; 16; a + ? = 20)
- **L3** (mixed, 10 included, reversed prompts): (10; 10; a + ? = 20) · (13; 7; ? + a = 20) · (4; 16; ? + a = 20) · (17; 3; ? + a = 20) · (1; 19; a + ? = 20) · (12; 8; ? + a = 20) · (9; 11; ? + a = 20) · (15; 5; ? + a = 20)

Play list of 12 per Rules with re-queue (mirrors: (13; 7) re-queues as (7; 13)); start at L1; shuffle within a level without repeats; two consecutive items never share an answer.

Worked example: item 1 (13; 7) types 7 → the seven cells fill, "13 + 7 = 20" · item 2 (15; 5) types 5 → L2 · item 3 (6; 14) types 4 (fills only frame A) → display clears, hollow counters 7 … 20 fill both frames with the ten bracket under frame B and the part badge "14"; types 14 (helped) → L1 · item 4 (11; 9) first try · item 5 (18; 2) first try → L2 · item 6 = re-queued mirror (14; 6) first try · items 7-12 at L2-L3 with one miss → Finish shows twelve chips, 10 with filled dots.

## Rules
- Item count: 12 (re-queued mirrors replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3). "First-try" = the first OK was correct.
- Adaptation: a wrong first OK on 2 consecutive items → next item one level down (floor L1). A single miss re-queues its mirror (after 2 items, then a last look) without changing level.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no key tapped, the display card `ANIM.pulse`s once; repeats every 8 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the display, `tone("correct")`, the needed cells fill with hollow counters (fast) so the 20 is seen, `ART.eqText` completes the bond, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), hedgehog `ANIM.curl`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - The ones digit typed (3 for 13): `tone("nudge")`, display clears; the empty cells fill with hollow counters badged 14 … 20; the part badge "7".
  - The shown number, 20, or their sum (13, 20, 33): the same enactment — the seven hollow counters are the information.
  - Only to the next ten (4 for 6): the enactment fills the gap 7 … 10, then all of frame B 11 … 20 with the ten bracket and "10" badge; part badge "14".
  - Off-by-one (6 or 8 for 13): the enactment; each hollow counter's badge makes the count exactly seven.
  - A third digit typed: ignored (no error, no sound).
- Retry behaviour: attempt 1 unaided → attempt 2 with the completed frame in view → attempt 3 the answer builds itself and the child re-types it with the ringed OK; solved-with-help. No attempt 4 (a still-wrong re-type rebuilds the answer and waits).
- Finish condition: 12 items → Finish. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Bonds to 20"; `makeTwenty` = "Make 20".

## Sound
`tone("tap")` on each key; `tone("tap", k)` per hollow counter as the frame fills (k = the running count 14 … 20 mapped to steps 1 … 7 — the pitch climbs to the full frame, F-213); `tone("correct")` on a correct answer; `tone("nudge")` on a wrong answer (mellow); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; no sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change; "Make 20" changes once translated).
- [ ] Works at narrow width (400-px iframe: both frames, the prompt, the display card, all eleven keys and OK visible and separate).
- [ ] Keyboard operable (Tab walks the keys then OK; Enter taps; physical digit keys type, Backspace deletes, Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong answers never end the session; after two wrong answers the correct number builds itself on the display and re-typing it completes the item).
- [ ] 13 is shown as one full frame plus three counters in the second frame's top row, with "13 + ▢ = 20" beneath.
- [ ] Typing 7 and OK fills the seven empty cells with ringed hollow counters and completes the sentence "13 + 7 = 20".
- [ ] Typing 3 and OK clears the display, fills the empty cells one by one with badges 14 to 20, and shows a "7" badge over them; they stay while the child re-types.
- [ ] For 6 shown, typing 4 fills the first frame's gap and then the whole second frame with a bar and "10" badge under it, and the part badge reads 14.
- [ ] A third digit is ignored; backspace removes the last digit; OK is dimmed while the display is empty.
- [ ] A missed item comes back two items later with the parts swapped (7 shown, 13 to type).
- [ ] At the third level prompts such as "▢ + 13 = 20" appear and 10 shown asks for 10.
- [ ] The finish screen lists twelve bonds with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
