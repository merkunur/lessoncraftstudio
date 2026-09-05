# 138 — Story Reveal

## Identity
- Slug: `story-reveal`
- Subject / topic: Mathematics / addition and subtraction picture stories within 10 (join and leave), told without words
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 numeral tap commits the prediction; the pond scene counts itself out)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (ducks, a pond, numerals and the signs + − =); no `LOCALE_DATA`. Nothing is spoken and — deliberately for this game — nothing is written on the play screen beyond numerals and signs (F-204, F-6: word problems are language-bound; a picture-told story is not).

## Learning
- Objective: Watches a short animated story (ducks arrive at or leave a pond), predicts how many ducks are on the pond at the end by tapping a numeral, then watches the scene count itself to check.
- Prerequisites: Counts to 10; reads numerals to 10 and the signs + and −; adds and subtracts within 10 with objects (games 004, 023, 136 territory).
- Curriculum links: F-6 (word problems are niche as games — 4 of 15 sources — yet weighty in every curriculum; this game covers them without language), F-1 (addition/subtraction within 20 in 14 / 12 of 15 sources), F-21 ("+/− facts to 20" in all twelve systems), F-31 row "+/− facts to 20" — conservative 7-8 → 6-8 (US 1.OA.A.1 "use addition and subtraction within 20 to solve word problems involving situations of adding to, taking from"; England Y1 "solve one-step problems that involve addition and subtraction, using concrete objects and pictorial representations"; Germany Klasse 1 "Sachsituationen … Rechengeschichten"; France CP "problèmes relevant de l'addition et de la soustraction"; Netherlands groep 3 "contextopgaven erbij / eraf"; Spain 1º ciclo "situaciones problemáticas"; Brazil EF01MA08 "problemas de adição e subtração"; Sweden åk 1-3 "problemlösning"; Finland grades 1-2 "sanalliset tehtävät").
- Common misconceptions (F-105, F-106), each with this game's response:
  1. **Counting on starting AT the first number (3 ducks, 2 arrive: "3, 4" → 4).** Response: the answer − 1 is a tile on every join item; the reveal counts ON: the three ducks already on the pond gather under one badge `ART.groupBadge` "3", then each arriving duck is badged 4, 5 (`ART.countBadge`, `tone("tap", k)`); the first arrival's badge reads 4, not 3 — the "4" lands on the first NEW duck.
  2. **Counting back off by one (7 ducks, 3 leave: "7, 6, 5" → 5).** Response: the answer + 1 is a tile on every leave item; the reveal counts the LEAVERS as they go — each leaving duck is badged as it swims off: 6, 5, 4 on the readout (`ART.readout` counts down from 7 as each one leaves) — the count lands on the number that stays.
  3. **Answering with the number that arrived or left (2 for 3 + 2; 3 for 7 − 3).** Response: that number is the third tile on every item; on that prediction the reveal plays and then the whole pond is badged 1 … n together (`ANIM.badgeIn` on all remaining ducks at once) and the readout pulses — "the pond has this many"; the leavers / arrivals are grouped under `ART.storyBadge` with their number so the two quantities are visibly different.
  4. **Not seeing which way the story went (a leave story answered as a join).** Response: the story is animated, not narrated — arriving ducks swim IN from the right edge to the pond (`ANIM.swimIn`), leaving ducks swim OUT past the right edge (`ANIM.swimOut`); as they move the number sentence builds itself under the pond: `ART.sentence` "3" → "3 + 2" → "3 + 2 = ?" (or "7 − 3 = ?"); the sign is written the moment the ducks move; the leavers are drawn faded in a reeds area (`ART.reeds`) at the pond's edge so they remain countable.
  5. **Count-all after the reveal instead of trusting the structure (F-105).** Response: on a correct prediction only a quick group-and-count plays (the pond's final ducks badged 1 … n at 100 ms apart); on a wrong prediction the slower count-on / count-back replays; support fades as accuracy rises (F-46).

## How it plays
1. **Start screen**: title "Story Reveal", the duck (`ART.duck`) at (360, 200) at size 80, Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 3 + 2)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the pond (`ART.pond`, a 420 × 150 ellipse) centred at (320, 150) with 3 ducks (`ART.duck`, size 44) resting on it in one row (pitch 50, centred at y = 150; two rows when > 5: y = 128 / 172); the reeds (`ART.reeds`, a 110 × 150 well) at (620, 150) at the pond's right; under the pond the sentence `ART.sentence` (40 px) at (320, 245), initially "3". **The story plays once, automatically, 600 ms after the item builds** (it is a reveal of the SITUATION, not of the answer): 2 ducks swim in from x = 740 (off-stage right) to the next free slots on the pond (`ANIM.swimIn`, 900 ms, 250 ms apart, `tone("tap", 2)` each); as the first one enters the sentence becomes "3 + 2"; when both have settled it becomes "3 + 2 = ?" with `ART.qBox` for the "?". A replay tile (`ART.replayTile`, 64 × 64, with `ART.replayGlyph`) at (620, 245) lets the child watch the story again (unlimited; never counts as help). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480: 5, 4, 2 shuffled (the answer, answer − 1, the number that arrived). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. No caption of any kind.
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`); tapping another switches; Check enables. The pond does not change while predicting (F-40).
4. **Check → Reveal**:
   - **Count-out**: the 3 original ducks gather under `ART.groupBadge` "3" (`ANIM.badgeIn`); then each arrived duck gets `ART.countBadge` 4, 5 in turn (250 ms apart, `tone("tap", k)`); the readout `ART.readout` (48 px) appears at (320, 100) above the pond showing the final count "5" with `ANIM.appear`; `ART.qBox` fills with "5".
   - **Prediction correct (5)**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop (rotation); the ducks on the pond `ANIM.bob` together; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`) and its story plays. First-try correct.
   - **Prediction answer − 1 (4 — started counting at 3)**: `tone("nudge")` after the count-out; the count-on replays slowly: the group badge "3" pulses, then the first arrival's badge "4" grows (`ANIM.lastBadge`) before "5" appears; the tiles re-enable; attempt 2 with the counted pond in view.
   - **Prediction = the number that arrived (2)**: after the count-out, the two arrivals gather under `ART.storyBadge` "+2" for 900 ms while the whole pond is badged 1 … 5 at once and the readout pulses; `tone("nudge")`; attempt 2.
   - **Any other prediction**: the count-out, the readout pulses; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, rail dot, no praise pop; solved-with-help. **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **A leave item (L2: 7 − 3)**: 7 ducks rest on the pond, the sentence reads "7"; the story: 3 ducks swim out to the reeds (`ANIM.swimOut`, the last three in slot order, 250 ms apart) and settle there at alpha 0.45; the sentence becomes "7 − 3" then "7 − 3 = ?". Tiles 4, 5, 3 (the answer, answer + 1, the number that left). Reveal: the readout starts at "7" and counts down 6, 5, 4 as each leaver is badged in the reeds (`ART.countBadge`, `tone("tap", k)` descending), then the ducks still on the pond `ANIM.bob` and `ART.qBox` fills with "4". Wrong "5" (count-back slip): the count-down replays with each leaver's badge growing in turn. Wrong "3" (the number that left): the leavers gather under `ART.storyBadge` "−3" while the pond's four are badged 1 … 4 together.
6. **Re-queue** (F-41): an item wrong on the first prediction re-enters the play list after 2 intervening items as a new story of the same kind with the numbers swapped where possible (3 + 2 → 2 + 3; 7 − 3 → 7 − 4), then, if wrong again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
7. **Items 2-10**: per Content/Rules. L1 join stories within 10; L2 leave stories within 10; L3 join and leave mixed with totals to 10 and the readout withheld until the count-out finishes (no running numeral above the pond during the story — the child must hold the count).
8. **Finish**: `t("all_done")` (360, 110); the duck (360, 200) at size 80 with `ANIM.celebrate`; the summary = the ten completed sentences as chips (`ART.eqChip`, 130 × 36, label "3 + 2 = 5" 16 px) in two rows of five from y = 340, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (10 items × 30-40 s; each story ≈ 2 s, each reveal ≈ 2-3 s).

## Art registry
```js
const ART = {
  duck:        { kind: "emoji", value: "🦆", size: 44 },                 // 80 px on the start / finish screens (opts.size at the call)
  pond:        { kind: "shape", shape: "ellipse", w: 420, h: 150, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  reeds:       { kind: "shape", shape: "roundRect", w: 110, h: 150, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // holds leavers at alpha 0.45, 2 per row, pitch 48
  sentence:    { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  qBox:        { kind: "shape", shape: "roundRect", w: 46, h: 46, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 8 },   // dashed while empty; holds the answer 30 px inkOnAccent
  readout:     { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  groupBadge:  { kind: "shape", shape: "roundRect", w: 48, h: 30, fill: "structure", radius: 8 },       // numeral 18 px display bg, under the original group
  storyBadge:  { kind: "shape", shape: "roundRect", w: 56, h: 30, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 8 },   // "+2" / "−3" 18 px display inkOnAccent
  countBadge:  { kind: "shape", shape: "circle", r: 12, fill: "bg" },                                   // numeral 14 px display structure, on a counted duck
  replayTile:  { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  replayGlyph: { kind: "text",  value: "↻", size: 36, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Ducks on the pond (solid, on the ellipse) and ducks in the reeds (faded, in the well) differ by place AND opacity, never by colour alone. Pond slots: up to 5 in one row (pitch 50, centred), 6-10 in two rows (y = 128 / 172, first row 5).

## Animation registry
```js
const ANIM = {
  swimIn:    { duration: 900, ease: "Sine.Out", trigger: "an arriving duck from x = 740 (off-stage right) to its pond slot (x, y set at call); 250 ms apart" },
  swimOut:   { duration: 900, ease: "Sine.In", trigger: "a leaving duck from its pond slot to its reeds slot, alpha → 0.45 (x, y set at call); 250 ms apart" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "group / story / count badges (from alpha 0, scale 0.5), 250 ms apart in a count-out, together in an all-at-once count" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the first arrival's badge (count-on replay) / each leaver's badge (count-back replay)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "readout, sentence parts, new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  bob:       { y: "-=10", duration: 160, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the pond's remaining ducks at the end of a reveal" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "group badge / readout after a wrong prediction" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish duck" }
};
```
No flashing: `showMe` cycles at 1 Hz; the story and the reveal are one-shot (replay only on the replay tile or a wrong prediction).

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                     5  readout (320,100)                      │
      │      ╭──────────────────────────────╮        ┌──────┐         │
      │      │   d   d   d   d   d          │        │reeds │ (620,150)│  zone A
      │      ╰── pond (320,150) 420×150 ────╯        └──────┘         │
      │             "3 + 2 = ▢" (320,245)              [↻] (620,245)  │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 4 ]        [ 5 ]        [ 2 ]   y=380 (96×96)       │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `d` = a duck. Arriving ducks enter from the right edge past the reeds; leaving ducks settle inside the reeds well. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.pond` at (320, 150) with ducks at the pond slots; `ART.reeds` at (620, 150) with leavers at alpha 0.45 in two columns (x = 596 / 644, rows from y = 96, pitch 48).
- `ART.readout` at (320, 100) (withheld at L3 until the count-out ends); `ART.sentence` at (320, 245) built from numerals and the signs, with `ART.qBox` drawn in place of the "?"; `ART.groupBadge` under the original group's first slot (y + 34); `ART.storyBadge` under the arrivals / leavers; `ART.countBadge` at each counted duck's (+14, −18).
- `ART.replayTile` (`makeTile` 64 × 64 with `ART.replayGlyph`) at (620, 245); enabled throughout except during a story or a reveal.
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Tap floors 96 / 64 / 220 × 72 ≥ 56; gaps ≥ 24.
- During a story (≈ 2 s) and a reveal (≈ 2-3 s) the tiles, the replay tile and Check are `setEnabled(false)`; they re-enable when it ends. Tab order: the three tiles left to right, the replay tile, then OK. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (story; answer; tiles). Join tiles = answer, answer − 1, the number that arrived; leave tiles = answer, answer + 1, the number that left (where two tiles would coincide, answer + 2 / answer − 2 replaces the duplicate). The correct tile's slot is shuffled and never repeats twice running (§13).
- **L1** (join, within 10): (3 + 2; 5; 5, 4, 2) · (4 + 3; 7; 7, 6, 3) · (2 + 5; 7; 7, 6, 5) · (5 + 4; 9; 9, 8, 4) · (1 + 6; 7; 7, 6, 8) · (6 + 2; 8; 8, 7, 2) · (3 + 4; 7; 7, 6, 4)
- **L2** (leave, within 10): (7 − 3; 4; 4, 5, 3) · (5 − 2; 3; 3, 4, 2) · (8 − 5; 3; 3, 4, 5) · (6 − 4; 2; 2, 3, 4) · (9 − 3; 6; 6, 7, 3) · (4 − 1; 3; 3, 4, 1) · (10 − 6; 4; 4, 5, 6)
- **L3** (mixed, totals to 10, readout withheld): (7 + 3; 10; 10, 9, 3) · (10 − 4; 6; 6, 7, 4) · (6 + 4; 10; 10, 9, 4) · (9 − 6; 3; 3, 4, 6) · (8 − 7; 1; 1, 2, 7) · (2 + 8; 10; 10, 9, 8) · (5 + 5; 10; 10, 9, 8) · (10 − 9; 1; 1, 2, 9)

Play list of 10 per Rules with re-queue (How it plays §6); no item repeats except by re-queue; two consecutive items never share an answer; join and leave alternate at L3 so the sign must be read each time.

Worked example: item 1 (3 + 2) taps 5 → count-on 3 | 4, 5 · item 2 (4 + 3) taps 7 → L2 · item 3 (7 − 3) taps 5 (count-back slip) → the count-down replays with each leaver's badge growing; taps 4 (helped) → L1 · item 4 (2 + 5) taps 7 · item 5 (5 + 4) taps 9 → L2 · item 6 = re-queued (7 − 4) taps 3 first try · items 7-10 at L2-L3 with one miss on (10 − 9) → Finish shows ten chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues a same-kind story (after 2 items, then a last look) without changing level.
- What happens on a correct answer: the count-out (group, then count on / count down), `ANIM.pop` on the tile, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), the sentence completes, ducks `ANIM.bob`, rail dot, next story after 900 ms.
- What happens on a wrong answer:
  - Answer − 1 on a join (started counting at the first number): count-out, then the count-on replays with the first arrival's badge grown; attempt 2.
  - Answer + 1 on a leave (count-back slip): count-out, then the count-down replays with each leaver's badge grown in turn; attempt 2.
  - The number that arrived / left: count-out, then the arrivals / leavers gather under the story badge while the pond is badged all at once and the readout pulses; attempt 2.
  - Any other prediction: count-out, the readout pulses; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the counted pond in view → attempt 3 show-me; solved-with-help; a same-kind story re-queues later. Replaying the story is free and unlimited. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Story Reveal". There are no other strings: the play screen carries numerals and the signs + − = only, by design.

## Sound
`tone("tap", 2)` per duck swimming in, `tone("tap", 1)` per duck swimming out (the story is audible as motion); `tone("tap")` on selecting a tile; `tone("tap", k)` per counted duck in a count-out (k rising for a count-on, falling for a count-down — F-213); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`. Nothing is spoken; no sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change; the play screen shows no words in any language).
- [ ] Works at narrow width (400-px iframe: the pond, the reeds, the sentence, the replay tile, three tiles and OK visible).
- [ ] Keyboard operable (Tab across the three tiles, the replay tile and OK; Enter selects / replays / checks).
- [ ] Never auto-starts (the start screen waits for Start; the story plays only after an item builds inside Play).
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] After an item builds, the story plays by itself: ducks swim in from the right (or out into the reeds) and the sentence under the pond grows from "3" to "3 + 2" to "3 + 2 = ▢".
- [ ] The replay tile plays the story again without changing anything else; it can be used any number of times.
- [ ] OK is dimmed until a tile is selected; nothing on the pond moves while a tile is chosen.
- [ ] On OK for 3 + 2 the first three ducks get one "3" badge and the arrivals are numbered 4, 5; the readout shows 5 and the box fills.
- [ ] On OK for 7 − 3 the readout counts down 7, 6, 5, 4 as each leaver in the reeds is numbered, and the four ducks on the pond bob.
- [ ] Predicting 4 for 3 + 2 replays the count-on with the "4" badge growing on the first arrival; predicting 2 gathers the two arrivals under "+2" while the whole pond is numbered at once.
- [ ] At the third level no number appears above the pond until the count-out has finished.
- [ ] A missed item comes back two items later as a story of the same kind with different numbers.
- [ ] The finish screen lists ten sentences with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
