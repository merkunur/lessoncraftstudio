# 001 — Feed the Fox

## Identity
- Slug: `feed-the-fox`
- Subject / topic: Mathematics / counting to 10 (one-to-one counting and cardinality)
- Age band: `5-6`
- Interaction pattern: `P3` — tap to count (with a P1 numeral choice to state the answer)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` (stage 720×560, §1 skeleton, §3 tap floors, §4 ART, §5 ANIM, §6 progress, §7 zones, §8 rules template, §9 strings, §10 finish, §11 sound, §12 colour). Pattern contract: `catalogue/PATTERNS.md` P3. Everything below adds to those; nothing overrides them.

## Learning
- Objective: Counts a set of 2-10 objects exactly once each, in a stable order, and states how many by tapping the matching numeral.
- Prerequisites: Can say the number words to ten in order; recognises the numerals 1-10 well enough to pick one from three (if not, the numeral choice is still learnable here because the wrong-answer replay shows the numeral over the set).
- Curriculum links: F-1 (counting to 10/20 is present in 13 of 15 game sources), F-4 (UK reception core), F-21 (counting and cardinality is in all twelve systems), F-31 row "Count to 10-20, one-to-one, subitise" — conservative age 6, earliest 4 → band 5-6 (US K.CC.B.4-5; England Reception ELG "count objects to 10"; Germany Klasse 1 Zahlen bis 10; France GS "dénombrer"; Spain Infantil 5 años cuantificadores; Brazil EI03ET07; Sweden/Denmark bridge year numbers 0-10; Finland esiopetus).
- Common misconceptions (F-101), each with this game's response:
  1. **One-to-one failure — double-counting or skipping an object.** Response: a berry that has been counted greys out and shows its numeral; a second tap on it does nothing (the object enforces one-to-one). A skipped berry stays bright; if the child taps the numeral while berries are still bright, the bright berries pulse (`ANIM.pulse` on `ART.berry`) and nothing else happens — the item is not marked wrong, the child is shown what is left to count.
  2. **Stable-order violation — saying 1, 2, 3, 5.** Response: the game writes the running numeral on each berry as it is tapped (`ART.countBadge`), so the sequence the child sees is always 1, 2, 3, 4…; a child who says the wrong word still sees the right numeral.
  3. **Cardinality — not knowing that the last number said is "how many".** Response: when the last berry is tapped, its badge grows (`ANIM.lastBadge`) and a copy of that numeral appears large above the set (`ART.totalNumeral`) for 900 ms before the numeral tiles unlock. On a wrong numeral tap after all berries are counted, the replay re-lights each berry in order with its numeral and ends by pulsing the last badge and the big total — the answer is shown, not told.
  4. **Length/spread bias — judging a spread-out row as "more".** Response: from L2 the berries are laid in two rows and at L3 the second row is offset, so a child cannot read the count from the row length; the count comes only from tapping.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Feed the Fox"): cream background, the fox (`ART.fox`) sits at (360, 200) above the title, the Start button below. Language picker top-left (hidden under `?embed=1`). Nothing moves until Start is tapped.
2. **Item 1 (L1, count 3).** The Play scene builds: the dot rail of 8 hollow dots at the top (§6); the fox at the left of zone A holding an empty bowl (`ART.fox` at (110, 170), `ART.bowl` at (110, 232)); a speech bubble (`ART.bubble`) at (110, 96) containing `ART.question`; and three strawberries (`ART.berry` as `makeTile` labels) in a row centred in zone A at y = 170: x = 300, 392, 484 (80 × 80 tiles, 12 px gap, centred per §7.1 with w = 80, g = 12). Zone B shows three numeral tiles (`ART.numeralTile` 96 × 96 at y = 380, x = 240, 360, 480) labelled 2, 3, 4 in a shuffled order; they are **disabled** (dimmed, `api.setEnabled(false)`) until every berry has been counted. Under the rail, the caption `S("howMany")` ("How many?") in `THEME.font.body` 28 px `THEME.colour.inkSoft` — a reader can use it; a pre-reader has the bubble.
3. **Counting.** The child taps a berry. It plays `GameCore.tone("tap", k)` where k = 1 for the first berry, 2 for the second… (pitch climbs with the count, F-213); the berry does `ANIM.pop`, then its tile fill changes to `THEME.colour.structureSoft` with a `THEME.colour.structure` 3 px stroke and a `ART.countBadge` (a `structure` circle r 18 with the numeral in `bg` colour, 22 px) appears at the tile's top-right. The berry tile is now `setEnabled(false)` for tapping but keeps full alpha (the spec overrides the default 50% dim: counted berries stay bright because their badge is the state cue). Tapping it again does nothing.
4. **Last berry.** When the last berry is tapped its badge plays `ANIM.lastBadge` (scale to 1.4 and back) and `ART.totalNumeral` (52 px, `structure`) appears at (392, 96) — to the right of the bubble, over the berries — with `ANIM.appear`. After 900 ms the three numeral tiles enable (alpha 1). The caption stays.
5. **Answering.** The child taps a numeral tile.
   - **Correct (3):** the tile pops (`ANIM.pop`), `GameCore.tone("correct")`, `GameCore.showPraise(scene, key)` with the next praise key in rotation (§9), the three berries `ANIM.glide` one after another (120 ms apart) into the bowl at (110, 232) and vanish, the fox does `ANIM.munch` (a 2-step scale wobble), the first rail dot fills (`ART.dotFull`), and after 700 ms the next item builds (berries `ANIM.appear`).
   - **Wrong (2 or 4) with all berries counted:** the tapped tile does `ANIM.nudge`, `GameCore.tone("nudge")`, the tile de-selects and stays enabled. Then the **replay**: every berry badge hides; the berries re-light one by one from the first, 350 ms apart, each showing its badge again with `tone("tap", k)`; the last badge plays `ANIM.lastBadge` and `ART.totalNumeral` pulses (`ANIM.pulse`). The child taps again. This is attempt 2.
   - **Wrong again (attempt 2):** same nudge + replay, and now the correct numeral tile gains a slow pulsing `THEME.colour.structure` outline (`ANIM.showMe` on `ART.showRing` placed behind the tile) — the show-me step. Tapping it completes the item as solved-with-help (§8): the berries feed the fox as for a correct answer but no praise pop plays (the fox munch and the rail dot are the acknowledgement).
   - **Tap on a numeral while berries remain uncounted:** cannot happen — the tiles are disabled until the count is complete. (A keyboard user reaching a disabled tile gets no action either.)
6. **Items 2-8.** The play list is built from the level pools in §Content by the §8 rules. Berry layout by count: 2-5 in one row at y = 170; 6-8 in two rows of up to 4 at y = 130 and y = 210, each row centred; 9-10 in two rows of 5 at y = 130 and y = 210 with the second row shifted right by 40 px (offset layout, L3 only). All tiles 80 × 80, gap 12.
7. **Finish** (after 8 solved items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `structure`; the fox at (360, 220) with `ANIM.celebrate`, the bowl heaped (`ART.bowlFull`) at (360, 290). Zone B: the eight numerals the child solved, in order, as small `ART.numeralTile` copies (56 × 56) in a row at y = 400 (x from 360 − 3.5 × 68) — the visual summary tied to the learning; no score. Zone C: `makeButton play_again` at (250, 510) and `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One full session takes about 4-6 minutes: 8 items × (count + answer + feed animation ≈ 25-40 s).

## Art registry
```js
const ART = {
  fox:          { kind: "emoji", value: "🦊", size: 96 },
  berry:        { kind: "emoji", value: "🍓", size: 56 },          // drawn as the label of an 80×80 makeTile
  bowl:         { kind: "emoji", value: "🥣", size: 56 },
  bowlFull:     { kind: "emoji", value: "🍓", size: 72 },          // finish screen: the heap; drawn 3× overlapping, offsets (-24,0) (0,-10) (24,0)
  bubble:       { kind: "shape", shape: "roundRect", w: 120, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  question:     { kind: "text",  value: "?", size: 40, font: "display", color: "structure" },
  berryTile:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  berryCounted: { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  countBadge:   { kind: "shape", shape: "circle", r: 18, fill: "structure" },   // numeral text on it: 22 px, font display, color bg
  totalNumeral: { kind: "text",  value: "", size: 52, font: "display", color: "structure" },  // value set to the count at runtime
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },  // numeral label 44 px display ink
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. `ART.berry` is the only picture the child counts; the art upgrade replaces it with one SVG strawberry and nothing else changes.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "berry tapped; correct numeral tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral tapped" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "uncounted berries when the child looks stuck (see Rules); total numeral on replay" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last berry's badge" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item's berries; total numeral (start alpha 0, scale 0.6)" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "each berry flies to the bowl; x,y set to the bowl position at call time" },
  munch:     { scale: 1.08, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the fox after the berries arrive" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the show-me ring behind the correct numeral (start alpha 0.2); stopped when the item completes" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish screen fox" }
};
```
No flashing: `showMe` cycles at 1 Hz; nothing else repeats faster.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed (no reflow; the whole stage scales with the iframe width).

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]        ○ ○ ○ ○ ○ ○ ○ ○  (rail, y=28, x=283..437) │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ART.bubble (110,96) "?"            ART.totalNumeral (392,96) │
      │  ART.fox (110,170)     [ B ][ B ][ B ]  berries row y=170        │  zone A
      │  ART.bowl (110,232)    (two rows y=130 / y=210 when >5)       │
260   ├──────────────────────────────────────────────────────────────┤
      │  "How many?" caption (360, 300)                               │
      │        [ 2 ]      [ 3 ]      [ 4 ]   numeral tiles y=380      │  zone B
      │       x=240      x=360      x=480    (96×96)                  │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: B = a berry tile (ART.berry on ART.berryTile).

Berry rows: n ≤ 5 → one row centred at y = 170, first x = 360 − (n−1) × 46; 6 ≤ n ≤ 8 → row 1 holds ceil(n/2) berries at y = 130, row 2 the rest at y = 210, each row centred by the same formula; n = 9-10 → row 1 five berries at y = 130 (x = 176 + i × 92), row 2 the rest at y = 210 (x = 216 + i × 92, i.e. shifted 40 px right).

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); filled dots use `ART.dotFull`.
- Fox: `ART.fox` centred (110, 170). Bowl: `ART.bowl` centred (110, 232); on the finish screen `ART.bowlFull` heap at (360, 290).
- Bubble: `ART.bubble` centred (110, 96) with `ART.question` centred inside.
- Berry tiles: `makeTile(scene, x, y, 80, 80, { label: ART.berry.value via draw helper, fontSize: 56, fill: THEME.colour.surface, stroke: THEME.colour.line, onTap })` — the tile tokens are exactly `ART.berryTile`; counted look = `ART.berryCounted` tokens applied through `api.setSelected(true)` with `selectedFill: THEME.colour.structureSoft`, `selectedStroke: THEME.colour.structure`; badge `ART.countBadge` at tile (+28, −28) with the numeral in `THEME.colour.bg`, 22 px `THEME.font.display`.
- Caption: `S("howMany")`, `THEME.font.body` 28 px, `THEME.colour.inkSoft`, centred (360, 300), `wordWrap` width 600.
- Numeral tiles: `makeTile` 96 × 96, label the numeral, `fontSize: 44`, `THEME.font.display`, `THEME.colour.ink`; disabled state per library (alpha 0.5) until the count completes.
- Total numeral: `ART.totalNumeral` at (392, 96).
- Show-me ring: `ART.showRing` drawn behind the correct tile at its centre, alpha animated by `ANIM.showMe`.
- Praise: `GameCore.showPraise` default look. Tap floors: every tile ≥ 80 × 80 (5-6 floor); gaps ≥ 12 px.

## Content
Language-neutral: the only content is quantities and numerals. `LOCALE_DATA` not needed. Number words are never displayed (a reader sees the caption only).

Level pools (count; the three numeral tiles = the count plus the two distractors listed, shuffled):
- **L1** (2-5): (3; 2, 4) · (2; 1, 3) · (5; 4, 6) · (4; 3, 5)
- **L2** (5-8): (6; 5, 7) · (8; 7, 9) · (7; 6, 8) · (5; 4, 6)
- **L3** (8-10): (9; 8, 10) · (10; 9, 8) · (8; 7, 9) · (10; 9, 11)

Play list: 8 items. Start at L1; take items from the current level's pool in a shuffled order without repeating an item within the session; level changes per Rules. If a level's pool is exhausted, reuse it reshuffled (only possible if the child stays on one level for more than 4 items). Distractor tile positions shuffled per item; the correct tile never sits in the same slot twice running (§13). Berry layout by count as in Screen layout.

## Rules
- Item count: 8.
- Difficulty progression: after 2 consecutive first-try correct items, the next item comes from the next level up (L1 → L2 → L3, cap L3). "First-try correct" = the correct numeral was the first numeral tapped.
- Adaptation: a wrong numeral tap on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue only, never a clock): if 6 s pass with uncounted berries and no tap, the uncounted berries play `ANIM.pulse` once; repeats every 6 s of inactivity. Nothing is displayed about time, nothing ends, nothing is scored.
- What happens on a correct answer: `ANIM.pop` on the tile, `tone("correct")`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, berries glide into the bowl, fox `ANIM.munch`, rail dot fills, next item after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Wrong numeral after a complete count** (cardinality / numeral recognition): `ANIM.nudge`, `tone("nudge")`, then the replay (berries re-light in order with badges and rising tones, last badge `ANIM.lastBadge`, total numeral `ANIM.pulse`). No message text.
  - **Berries left uncounted** (skipping): the numeral tiles are disabled, so there is no wrong answer to give; the stuck rule pulses the bright berries.
  - **Double-count attempt**: a counted berry ignores the tap; nothing happens (no nudge — it is not an error the child needs to notice).
- Retry behaviour: attempt 1 unaided → attempt 2 after the replay → attempt 3 with the show-me ring; tapping the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 8 items solved → Finish scene. No losing state exists; the only exit is Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")` (via makeStartScreen), `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Feed the Fox"
  - `howMany` = "How many?"

## Sound
`GameCore.tone` only (§11): `tone("tap", k)` on the k-th counted berry (pitch rising with the count — one note per object, F-213); `tone("correct")` on a correct numeral; `tone("nudge")` on a wrong numeral (mellow, not a buzzer); `tone("finish")` once on the Finish scene. Silent under `?sound=off` (the library checks `GameCore.soundEnabled`); the game never plays audio files. No sound carries meaning the screen does not also show (the badge and the total numeral carry the count).

## Testing checklist
- [ ] Works in all 11 languages: switch the picker on the start screen; Start, "All done!", "Play again", "Menu" and the praise pops change language; the caption "How many?" changes once translations are loaded (English until then).
- [ ] Works at narrow width: in a 400-px-wide iframe the whole stage is visible, nothing is cut off, and the berries and numeral tiles are still separate targets.
- [ ] Keyboard operable: with the mouse away, Tab moves a blue focus ring across the berries then the numerals; Enter counts a berry / picks a numeral; Enter on an already-counted berry does nothing.
- [ ] Never auto-starts: loading the page shows the start screen; no berries appear until Start is tapped.
- [ ] No losing state: tapping the wrong numeral 10 times in a row still ends with the item completing (via the show-me ring) and the session reaching "All done!".
- [ ] One-to-one is enforced: tapping the same berry twice never advances the badge count.
- [ ] Numeral tiles are dimmed and unresponsive until every berry is counted.
- [ ] After the last berry, a big numeral equal to the count appears above the berries before the tiles enable.
- [ ] A wrong numeral replays the count berry by berry with rising tones and pulses the total.
- [ ] Two first-try corrects in a row move the next item to a larger count; a wrong tap moves the next item to a smaller count (watch the berry counts across a session).
- [ ] Items with 9 or 10 berries show two rows with the second row shifted right.
- [ ] The finish screen shows the fox, a heap of strawberries, the eight solved numerals in order, and no score or stars.
- [ ] With `?sound=off` in the URL nothing is audible; with sound on, each berry tap is a higher note than the previous.
- [ ] No text appears on the play screen other than "How many?" and the numerals.
