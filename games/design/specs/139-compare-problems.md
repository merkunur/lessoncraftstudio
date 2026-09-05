# 139 — How Many More Problems

## Identity
- Slug: `compare-problems`
- Subject / topic: Mathematics / compare problems within 20 ("A has 8, B has 5 — how many more?") modelled with two paired bars
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (a counter source, then a bar) with a Check; a P1 numeral tap names the unmatched part
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2. Content is language-neutral (two animals, numerals, counters) apart from the one caption in `## Strings`; no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Models a "how many more / how many fewer" problem by building two bars of counters (one per animal) from the given numbers, then names the unmatched part of the longer bar as the answer.
- Prerequisites: Reads numerals to 20; compares two sets by one-to-one matching (game 013); subtracts within 10 as take-away (games 023, 136).
- Curriculum links: F-106 (difference / comparison model of subtraction — the model most children never meet, take-away being the only one taught), F-103 (comparison by pairing lines), F-6 (word problems niche as games, weighty in curricula), F-21 ("+/− facts to 20"), F-31 row "+/− facts to 20" — conservative 7-8 → 6-8 (US 1.OA.A.1 "comparing, with unknowns in all positions"; England Y1-2 "solve problems … involving … comparison"; Germany Klasse 1-2 "Vergleichsaufgaben: um wie viel mehr?"; France CP-CE1 "problèmes de comparaison"; Netherlands groep 3-4 "verschil bepalen"; Spain 1º ciclo; Brazil EF01MA08 / EF02MA06 "comparar quantidades"; Sweden åk 1-3; Finland grades 1-2 "erotus").
- Common misconceptions (F-106, F-103), each with this game's response:
  1. **Adding the two numbers ("8 and 5 — 13").** Response: the sum is a numeral tile in the naming step; on that tap every counter in BOTH bars is badged 1 … 13 (`ANIM.badgeIn` all at once) and the unmatched part's bracket (`ART.bracket`) pulses — 13 is everything, the question was the part sticking out.
  2. **Answering with the smaller number ("B has 5, so 5 more").** Response: the smaller number is a numeral tile; on that tap the pairing lines (`ART.pairLine`) between the matched counters pulse together — those five are matched, not "more" — and the unmatched counters are badged 1, 2, 3 in turn (`ART.countBadge`).
  3. **Take-away only: looking for something to take from the 8 and not seeing a difference.** Response: nothing is taken away anywhere in this game; the model is two bars side by side, aligned at the left, and the answer is the visible overhang (F-106 "separate take-away and how-many-more games with matching lines"). On Check the pairing lines draw one by one from the left and the overhang brackets itself.
  4. **Building the bars from the wrong numbers (8 counters in B's bar, or 7 in A's).** Response: on Check a bar whose count differs from its animal's tag counts itself (`ART.countBadge`s 1 … n along the bar, `tone("tap", k)`) and the tag (`ART.tag`) pulses; the missing slots pulse `ART.needSlot` or the extra counters `ANIM.rise` away; the naming step does not open until both bars match their tags.
  5. **"Fewer" read as "more" (L3 asks how many FEWER B has).** Response: the caption changes to `S("howManyFewer")` and the question mark tag (`ART.qTag`) sits beside the SHORTER bar's animal instead of the longer's; the answer is the same overhang, now read from the short bar's side — the bracket is drawn under the overhang with its open side toward the short bar (`ART.bracket` flipped).

## How it plays
1. **Start screen**: title "How Many More Problems", the rabbit (`ART.rabbit`) and the bear (`ART.bear`) at (300, 200) and (420, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: rabbit 8, bear 5; how many more has the rabbit?)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: two rows — row A: `ART.rabbit` at (70, 120) with its tag `ART.tag` "8" (36 px) at (130, 120), then bar A (`ART.bar`, a 480 × 44 tray with 20 faint slot marks `ART.slotMark` at pitch 24 from x = 190) centred at (418, 120); row B: `ART.bear` at (70, 190) with tag "5" at (130, 190) and bar B at (418, 190). `ART.qTag` (a small "?" card) sits beside the rabbit's tag at (165, 120) — the question is about the rabbit. Caption `S("howManyMore")` ("How many more?") at (360, 290), 24 px `THEME.colour.inkSoft`. Zone B: the counter source (`ART.sourceTile`, 96 × 96, showing one `ART.counter` and a small stack glyph `ART.stackMark`) at (120, 380); three numeral tiles (`ART.numeralTile`, 96 × 96) at (330, 380), (440, 380), (550, 380) are HIDDEN until the naming step. Zone C: Check (`makeButton ok`) at (360, 510), disabled until both bars hold at least one counter.
3. **Building the bars** (P2): tap the source tile → it selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`) and STAYS selected; tap bar A → one counter glides (`ANIM.glide`) from the source into bar A's next free slot from the left (`tone("tap", k)`, k = the bar's new count); tap bar A again → another; tap bar B → a counter into bar B. The source stays selected until the child taps it again (de-select) or taps a bar while nothing is selected: that tap REMOVES the bar's last counter (`ANIM.rise`, `tone("tap", k)` at the new count) — the undo. A bar refuses a 21st counter (the arriving counter springs back, `ANIM.nudge`, no message). Check enables when both bars hold ≥ 1.
4. **Check — the bars**: tap OK.
   - **Both bars match their tags (8 and 5)**: `tone("correct")` (no praise yet); the pairing lines draw from the left, one per matched pair (`ART.pairLine` from bar A's counter k down to bar B's counter k, 150 ms apart, `tone("tap", k)`); the three unmatched counters at bar A's right end lift slightly (`ANIM.lift`) and `ART.bracket` draws under them; `ART.qTag` glides (`ANIM.glide`) to sit above the bracket; the naming step opens: the three numeral tiles `ANIM.appear` at zone B (3, 13, 5 shuffled — the difference, the sum, the smaller number); the source tile disables.
   - **A bar does not match its tag (7 in A)**: `tone("nudge")`; bar A counts itself (badges 1 … 7 along it), the tag "8" pulses (`ANIM.pulse`), `ART.needSlot` pulses on slot 8; Check disables until a bar changes. Attempt 1 of the bar step; the item counts as retried.
   - **Too many (9 in A)**: bar A counts itself to 8, the ninth counter `ANIM.rise`s away (the bar fixes itself) and the tag pulses; Check must be tapped again. Retried.
   - **Second wrong bar Check**: both bars fill themselves to their tags (counters glide in from the source with rising tones) and the pairing step plays; the item continues as solved-with-help.
5. **Naming the unmatched part** (P1): tap a numeral tile.
   - **Correct (3)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation; only if neither step was retried); the sentence `ART.sentence` "8 − 5 = 3" appears at (360, 250) with `ANIM.appear`; the rabbit `ANIM.hop`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`, bars empty).
   - **The sum (13)**: `ANIM.nudge`, `tone("nudge")`; every counter in both bars is badged 1 … 13 at once and the bracket pulses; the tile de-selects; attempt 2.
   - **The smaller number (5)**: nudge; the five pairing lines pulse together, then the unmatched counters are badged 1, 2, 3 in turn; attempt 2.
   - **Off by one (2 or 4 — not a tile at L1; at L3 the third tile is the difference ± 1)**: nudge; the unmatched counters are badged 1 … d in turn; attempt 2.
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
6. **Re-queue** (F-41): an item retried at either step re-enters the play list after 2 intervening items with the two animals' numbers swapped between the rows (bear 8, rabbit 5 — the overhang moves to the other bar), then, if retried again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
7. **Items 2-10**: per Content/Rules. L1 within 10, the larger number always in row A; L2 within 20, the larger number in either row; L3 "how many fewer" items (the question tag beside the shorter bar) with differences up to 8 and a third tile of difference ± 1.
8. **Finish**: `t("all_done")` (360, 110); the rabbit (300, 200) and the bear (420, 200) with `ANIM.celebrate`; the summary = the ten sentences as chips (`ART.eqChip`, 130 × 36, label "8 − 5 = 3" 16 px) in two rows of five from y = 340, clean items with `ART.dotFull` at their left and retried items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes (10 items × 35-45 s).

## Art registry
```js
const ART = {
  rabbit:      { kind: "emoji", value: "🐰", size: 56 },
  bear:        { kind: "emoji", value: "🐻", size: 56 },
  tag:         { kind: "shape", shape: "roundRect", w: 52, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // numeral 30 px display ink
  qTag:        { kind: "shape", shape: "roundRect", w: 36, h: 36, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 8 },              // "?" 22 px display inkOnAccent
  bar:         { kind: "shape", shape: "roundRect", w: 480, h: 44, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  slotMark:    { kind: "shape", shape: "circle", r: 3, fill: "line" },                                     // 20 faint marks along a bar, pitch 24
  counter:     { kind: "shape", shape: "circle", r: 10, fill: "structure" },
  pairLine:    { kind: "shape", shape: "line", w: 2, stroke: "structure", strokeWidth: 3 },                 // vertical, from a bar A counter to the bar B counter below (length 50)
  bracket:     { kind: "shape", shape: "polygon", points: [[-36,0],[-36,10],[36,10],[36,0]], stroke: "accent", strokeWidth: 3 },   // an open bracket under the overhang; width set at runtime to (d × 24)
  needSlot:    { kind: "shape", shape: "circle", r: 13, stroke: "accent", strokeWidth: 3 },               // pulses on a missing slot
  countBadge:  { kind: "shape", shape: "circle", r: 10, fill: "bg" },                                      // numeral 12 px display structure, above a counter
  sentence:    { kind: "text",  value: "", size: 32, font: "display", color: "structure" },
  sourceTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // shows ART.counter centred + ART.stackMark
  stackMark:   { kind: "shape", shape: "roundRect", w: 40, h: 8, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 4 },   // three stacked bars under the counter, 5 px apart — "many"
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Counters are identical in both bars on purpose (the bar model compares LENGTH of equal units — F-103's length bias is turned into the correct cue by fixing the unit); the animals differ by picture and row, never by colour. Bar slots: 20 per bar, x = 190 + k × 24 (k = 0 … 19), on the bar's centre line.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "source tile selected; the unmatched counters after pairing" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a counter from the source to a bar slot; the ? tag to the bracket (x, y set at call)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "a counter removed (undo; too-many correction)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused 21st counter; wrong numeral tile" },
  lineDraw:  { scaleY: 1, duration: 120, ease: "Sine.Out", trigger: "each pair line grows from bar A down to bar B (from scaleY 0), 150 ms apart" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "count badges (from alpha 0, scale 0.5); in turn 200 ms apart, or all at once" },
  bracketIn: { alpha: 1, duration: 250, ease: "Sine.Out", trigger: "the bracket under the overhang (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "a tag; the bracket; the pair lines; a missing slot" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct numeral tile" },
  hop:       { y: "-=14", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "the questioned animal on a correct name" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "numeral tiles opening; sentence; new item (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct numeral tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish animals" }
};
```
No flashing: `showMe` cycles at 1 Hz; pulses are ≤ 3 cycles.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ rabbit [8][?] ┌●●●●●●●●··············┐  bar A (418,120) 480×44 │
      │ (70,120)      └──────────────────────┘   slots x=190+k×24      │  zone A
      │ bear   [5]    ┌●●●●●·················┐  bar B (418,190)        │
      │ (70,190)      └──────────────────────┘                        │
      │                      "8 − 5 = 3" (360,250)                    │
260   ├──────────────────────────────────────────────────────────────┤
      │        "How many more?" (360,290)                             │
      │   [ source ]          [ 3 ]    [ 13 ]    [ 5 ]   y=380        │  zone B
      │   (120,380)         (330,380) (440,380) (550,380)  96×96      │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `●` = a placed counter, `·` = a faint slot mark. The pair lines run between the bars (y = 142 to y = 168); the bracket sits under bar A's overhang at y = 150 (or under bar B's when B is longer). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.rabbit` at (70, 120) and `ART.bear` at (70, 190) (rows swap animals on re-queued items); `ART.tag`s at (130, 120) / (130, 190); `ART.qTag` at (165, y) beside the questioned animal's tag.
- Bars: two `makeTile`s 480 × 44 with `ART.bar` tokens at (418, 120) and (418, 190), each with 20 `ART.slotMark`s; placed counters `ART.counter` on the slots; `ART.pairLine`s between matched counters; `ART.bracket` under the overhang (width d × 24, centred under the unmatched counters; flipped to open toward the short bar on "fewer" items); `ART.needSlot` on a missing slot; `ART.countBadge` above a counter (+0, −18).
- `ART.sentence` at (360, 250). Caption `S("howManyMore")` / `S("howManyFewer")` at (360, 290), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
- `ART.sourceTile` (`makeTile` 96 × 96) at (120, 380) with `ART.counter` at its centre and `ART.stackMark` × 3 beneath; numeral tiles `makeTile` 96 × 96 (`ART.numeralTile`) at (330, 380), (440, 380), (550, 380), hidden (alpha 0, disabled) until the naming step; `ART.showRing` behind the correct one. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Tap floors: bars 480 × 44 — the bar is 44 px tall, BELOW the 56 floor, so each bar `makeTile` is built 480 × 60 (hit area) with the 44-px `ART.bar` drawn inside it; 96 tiles; OK 220 × 72. Gaps ≥ 10 between the two bar hit areas (y 120 ± 30 and 190 ± 30 → 10 px), ≥ 14 between numeral tiles.
- Keyboard: Tab order = source, bar A, bar B, then the numeral tiles when open, then OK; Enter activates. During a self-count or the pairing (≈ 2-3 s) everything is `setEnabled(false)`. Under `?embed=1` the picker is not created.

## Content
Language-neutral apart from the caption. Items as (row A number; row B number; question row; answer; naming tiles). Naming tiles = the difference, the sum, the smaller number (L1-L2); at L3 = the difference, the sum, the difference ± 1.
- **L1** (within 10; A larger; "more"): (8; 5; A; 3; 3, 13, 5) · (7; 4; A; 3; 3, 11, 4) · (9; 6; A; 3; 3, 15, 6) · (6; 2; A; 4; 4, 8, 2) · (10; 7; A; 3; 3, 17, 7) · (5; 1; A; 4; 4, 6, 1)
- **L2** (within 20; the larger in either row; "more"): (12; 9; A; 3; 3, 21, 9) · (9; 14; B; 5; 5, 23, 9) · (15; 10; A; 5; 5, 25, 10) · (11; 16; B; 5; 5, 27, 11) · (13; 8; A; 5; 5, 21, 8) · (18; 12; A; 6; 6, 30, 12) · (7; 13; B; 6; 6, 20, 7)
- **L3** ("fewer": the question tag beside the SHORTER bar; differences to 8): (17; 9; B; 8; 8, 26, 7) · (8; 16; A; 8; 8, 24, 9) · (20; 13; B; 7; 7, 33, 6) · (14; 6; B; 8; 8, 20, 9) · (19; 11; B; 8; 8, 30, 7) · (7; 15; A; 8; 8, 22, 7) → the ±1 tile is 9 where 7 would duplicate the smaller number's role: listed as (7; 15; A; 8; 8, 22, 9)

Play list of 10 per Rules with re-queue (How it plays §6: rows swapped); no item repeats except by re-queue; two consecutive items never share an answer; the correct numeral tile's slot never repeats twice running (§13).

Worked example: item 1 (8; 5) builds 8 and 5, Check → five lines, bracket under three, names 3 · item 2 (7; 4) clean → L2 · item 3 (12; 9) builds 12 and 9, Check → lines, names 21 (the sum) → every counter badged 1 … 21, bracket pulses; names 3 (retried) → L1 · item 4 (9; 6) clean · item 5 (6; 2) clean → L2 · item 6 = re-queued (9; 12 — rows swapped) clean, the overhang on the bear's bar · items 7-10 at L2-L3 with one "fewer" item retried → Finish shows ten chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive clean items (bars right first Check AND the name right first tap) → next level (cap L3).
- Adaptation: a retried step on 2 consecutive items → next item one level down (floor L1). A single retried item re-queues with the rows swapped (after 2 items, then a last look) without changing level.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no tap while a bar is empty, the source tile `ANIM.pulse`s once; repeats every 8 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: bars step — `tone("correct")`, pair lines draw, the overhang brackets itself, the ? tag moves to it, the numeral tiles open; naming step — `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (clean items only), the sentence appears, the questioned animal hops, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - A bar short of its tag: the bar counts itself, the tag pulses, the missing slot pulses; Check disabled until a bar changes.
  - A bar over its tag: the bar counts itself to the tag and the extra counters rise away; Check again.
  - Second wrong bar Check: the bars fill themselves and the pairing plays; solved-with-help.
  - The sum named (added the numbers): all counters badged at once, the bracket pulses; attempt 2.
  - The smaller number named (the matched part): the pair lines pulse, the unmatched counters are badged in turn; attempt 2.
  - Difference ± 1 named (L3): the unmatched counters are badged in turn; attempt 2.
  - Attempt 2 wrong at naming: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: each step has attempt 1 unaided → attempt 2 after the enacted hint → attempt 3 show-me (bars fill themselves / the ring); solved-with-help; the swapped item re-queues later. No attempt 4. Undo (removing a bar's last counter) is free.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "How Many More Problems"; `howManyMore` = "How many more?"; `howManyFewer` = "How many fewer?". The problem itself is never written out — the two tags and the ? tag ARE the problem (F-204).

## Sound
`tone("tap")` on selecting the source; `tone("tap", k)` per counter placed / removed (k = the bar's count) and per pair line drawn; `tone("correct")` on a matching bar Check and on the correct name; `tone("nudge")` on a wrong Check or name; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change; the caption changes once translated and wraps within two lines).
- [ ] Works at narrow width (400-px iframe: both animals, both bars with 20 slots, the source, three numeral tiles and OK visible).
- [ ] Keyboard operable (Tab: source, bar A, bar B, numeral tiles, OK; Enter places / removes / checks / names).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong Checks or names still ends with the bars filling themselves and the ringed tile completing the item).
- [ ] Tapping the source then a bar adds one counter to that bar's leftmost free slot; tapping the bar again adds another; tapping a bar with nothing selected removes its last counter.
- [ ] A bar refuses a 21st counter (it springs back, no message).
- [ ] OK is dimmed until both bars hold a counter; with 8 and 5 placed, OK draws five vertical lines between matched counters and a coral bracket under the three counters sticking out; the "?" moves above the bracket.
- [ ] With 7 in the rabbit's bar, OK numbers the seven counters, pulses the "8" tag and pulses the empty eighth slot.
- [ ] Naming 13 numbers every counter in both bars at once and pulses the bracket; naming 5 pulses the five lines and then numbers the three unmatched counters.
- [ ] At the second level the bear's bar can be the longer one and the bracket sits under it.
- [ ] At the third level the caption reads "How many fewer?" and the "?" sits beside the animal with the shorter bar.
- [ ] A retried item comes back two items later with the animals' numbers swapped between the rows.
- [ ] The finish screen lists ten sentences with a filled dot for clean ones and a hollow dot for retried ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
