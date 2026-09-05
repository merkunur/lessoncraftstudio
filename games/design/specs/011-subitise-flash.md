# 011 — Subitise Flash

## Identity
- Slug: `subitise-flash`
- Subject / topic: Mathematics / subitising 1-5 (seeing how many without counting)
- Age band: `5-6`
- Interaction pattern: `P10` — predict then reveal (the flash is the hidden thing; the numeral tap is the prediction; the lifted cloth is the reveal)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P10 (with P1 numeral tiles as the commit control). Everything below adds to those; nothing overrides them.

## Learning
- Objective: States how many dots (1-5) were shown in a one-second flash by tapping the matching numeral, without counting them one by one.
- Prerequisites: Recognises the numerals 1-6 well enough to pick one from three (games 001/002). No reading.
- Curriculum links: F-1 (counting to 10/20 including subitising in 13 of 15 sources), F-4 (subitising is on the UK reception map), F-21, F-31 row "Count to 10-20, one-to-one, subitise to 5" — conservative age 6, earliest 4 → band 5-6 (US K.CC.B.5 "count to answer how many"; England Reception ELG "subitise up to 5"; Germany Klasse 1 "Anzahlen simultan erfassen"; France GS "quantités jusqu'à 5 sans compter"; Netherlands groep 2 "getalbeelden"; Sweden förskoleklass "antal 0-10"; Finland esiopetus).
- Common misconceptions (F-101), each with this game's response:
  1. **Counting one by one instead of seeing the group (the child cannot finish counting before the cloth drops and guesses).** Response: the flash is the structure — it is long enough to SEE (1000 ms) and too short to count five things aloud. After any wrong tap the cloth lifts and STAYS lifted, so attempt 2 is made with the set in view; the dots are shown as the familiar dice arrangement so the whole group is recognisable as one picture.
  2. **Off-by-one (taps 4 for 5, or 3 for 2).** Response: on the reveal every dot gains its `ART.countBadge` AT ONCE (all badges appear together, not one after another — subitising is not counting) and the big numeral (`ART.totalNumeral`) appears above the card; the child sees 5 dots, 5 badges, "5" in one look.
  3. **Reading the arrangement as the number ("a row is 3", "the dice-five shape is 4").** Response: from L2 the same quantity appears in two arrangements across the session (dice-five and a row of five; dice-four and a 2 + 2 domino), and L3 uses only non-dice arrangements, so the numeral is tied to HOW MANY, not to a shape.
  4. **Length bias — a spread-out row of 3 looks like more than a tight dice-four.** Response: L3 rows use a wider dot spacing (44 px) than the dice patterns (36 px); a wrong tap on such an item reveals the set with badges, and the correct numeral is found with the dots in view.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Subitise Flash"): the rabbit (`ART.rabbit`) at (360, 200) above the title, Start button below, language picker top-left (hidden under `?embed=1`). Nothing moves until Start.
2. **Item 1 (L1, dice-three).** The Play scene builds: the dot rail of 8 hollow dots at y = 28 (§6); the rabbit at (110, 170) in zone A; a white card (`ART.card`, 320 × 160) centred at (400, 170) holding the dot set, but COVERED by the cloth (`ART.cloth`, a `structure` rounded rectangle the same size, drawn on top). The cloth is a `makeTile` (320 × 160) — the first thing a child taps is the biggest thing on the screen. Under the rail nothing else; zone B shows three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480 labelled 2, 3, 4 in a shuffled order, **disabled** (alpha 0.5) until the flash has been shown. Caption `S("howMany")` ("How many?") at (360, 300), 28 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **The flash.** The child taps the cloth. `tone("tap")`; the cloth rises off the card (`ANIM.clothUp`, 150 ms); the dots (`ART.dot`) are visible for exactly 1000 ms; the cloth drops back (`ANIM.clothDown`, 150 ms). While the dots are visible the cloth tile is disabled. When the cloth is back, the three numeral tiles enable (`ANIM.appear` on each) and the cloth tile ALSO stays enabled: tapping it again re-flashes the set for 1000 ms (a second look is always allowed and costs nothing — it is not a wrong answer; it simply means the item will not count as first-try if the child looks more than twice, see Rules).
4. **Answering.** The child taps a numeral tile.
   - **Correct (3):** the tile `ANIM.pop`s, `tone("correct")`; the cloth lifts (`ANIM.clothUp`) and stays up; all three dots get their `ART.countBadge` together (`ANIM.badgesIn`), `ART.totalNumeral` "3" appears at (400, 80) with `ANIM.appear`; `GameCore.showPraise(scene, key)` with the next praise key; the rabbit `ANIM.hop`; the first rail dot fills; after 900 ms the card, cloth and tiles rebuild for the next item (`ANIM.appear`).
   - **Wrong (2 or 4):** the tile `ANIM.nudge`s, `tone("nudge")`, the tile de-selects and stays enabled; the reveal happens anyway (P10: the truth is always shown): the cloth lifts and STAYS up, all badges appear together, the total numeral appears; then the total numeral and the badges fade after 900 ms (`ANIM.fadeOut`) but the dots stay in view. The child taps again with the dots visible — attempt 2.
   - **Wrong again (attempt 2):** nudge + tone; the badges and total re-appear and now stay; the correct numeral tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`). Tapping it completes the item as solved-with-help (no praise pop; the rabbit hop and the rail dot are the acknowledgement).
5. **Items 2-8.** Built from the level pools in Content by the Rules. Each item: cloth down → child taps cloth → flash → numeral tiles enable → answer.
6. **Finish** (after 8 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the rabbit at (360, 220) with `ANIM.celebrate`. Zone B: the eight dot sets the child named, as small uncovered cards (`ART.miniCard`, 64 × 40, dots drawn at r 4) in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76), each with its numeral (18 px `THEME.colour.inkSoft`) beneath — the visual summary; no score. Zone C: `makeButton play_again` at (250, 510) and `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 4 minutes (8 items × (flash + answer ≈ 20-30 s)). The one-second flash is the mechanism of the objective (subitising = seeing, not counting); nothing in the game measures the child's speed, nothing ends because of time, and the child may re-flash at will.

## Art registry
```js
const ART = {
  rabbit:       { kind: "emoji", value: "🐰", size: 96 },
  card:         { kind: "shape", shape: "roundRect", w: 320, h: 160, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  cloth:        { kind: "shape", shape: "roundRect", w: 320, h: 160, fill: "structure", radius: 18 },          // the cover; a makeTile
  clothTag:     { kind: "text",  value: "?", size: 48, font: "display", color: "bg" },                          // drawn centred on the cloth
  dot:          { kind: "shape", shape: "circle", r: 16, fill: "structure" },
  countBadge:   { kind: "shape", shape: "circle", r: 14, fill: "bg", stroke: "structure", strokeWidth: 2 },    // numeral 18 px display structure, on each dot
  totalNumeral: { kind: "text",  value: "", size: 56, font: "display", color: "structure" },                    // value set at runtime
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },  // numeral 44 px display ink
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniCard:     { kind: "shape", shape: "roundRect", w: 64, h: 40, fill: "surface", stroke: "line", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The dots are the only content picture; the art upgrade replaces `ART.dot` (and `ART.rabbit`) and nothing else changes.

## Animation registry
```js
const ANIM = {
  clothUp:    { y: "-=150", alpha: 0.15, duration: 150, ease: "Sine.In", trigger: "cloth tapped; correct or wrong tap (reveal)" },
  clothDown:  { y: "+=150", alpha: 1, duration: 150, ease: "Sine.Out", trigger: "1000 ms after clothUp during a flash" },
  badgesIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "all count badges together on the reveal (from alpha 0, scale 0.5, zero stagger)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "numeral tiles enabling; total numeral; new item (from alpha 0, scale 0.6)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badges and total after a first wrong tap" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct numeral tile" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral tile" },
  hop:        { y: "-=18", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "rabbit on a correct answer" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring behind the correct tile (from alpha 0.2); stopped when the item completes" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```
No flashing: the cloth changes state at most twice per second (up then down, 1000 ms apart); `showMe` cycles at 1 Hz; nothing else repeats.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed (no reflow; the whole stage scales with the iframe width).

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28 (x=283..437)   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                          ART.totalNumeral (400,80)            │
      │  ART.rabbit          ┌──────────────────────────┐             │
      │  (110,170)           │  ART.cloth over ART.card │ (400,170)   │  zone A
      │                      │        "?"   320×160     │             │
      │                      └──────────────────────────┘             │
260   ├──────────────────────────────────────────────────────────────┤
      │  "How many?" (360,300)                                        │
      │        [ 2 ]      [ 3 ]      [ 4 ]   numeral tiles y=380      │  zone B
      │       x=240      x=360      x=480    (96×96)                  │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```

Dot positions inside the card (relative to the card centre (400, 170)), pitch 36 for dice patterns:
- dice-1: (0, 0)
- dice-2: (−36, −36) (36, 36)
- dice-3: (−40, −40) (0, 0) (40, 40)
- dice-4: (−36, −36) (36, −36) (−36, 36) (36, 36)
- dice-5: (−40, −40) (40, −40) (0, 0) (−40, 40) (40, 40)
- row-3: (−44, 0) (0, 0) (44, 0) · row-4: (−66, 0) (−22, 0) (22, 0) (66, 0) · row-5: (−88, 0) (−44, 0) (0, 0) (44, 0) (88, 0)
- domino-4 (2 + 2): (−60, −22) (−60, 22) (60, −22) (60, 22) · domino-5 (2 + 3): (−60, −22) (−60, 22) (60, −40) (60, 0) (60, 40)
- ten-row-5 (a ten-frame top row): (−96, 0) (−48, 0) (0, 0) (48, 0) (96, 0) with `ART.dot` drawn inside five faint 44 × 44 `THEME.colour.line` outlines (the frame is drawn with the same graphics call as the card; it is part of `ART.card`'s rendering when the arrangement is `tenRow`)

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); filled dots use `ART.dotFull`.
- Rabbit: `ART.rabbit` centred (110, 170); on the finish screen at (360, 220).
- Card: `ART.card` centred (400, 170); dots `ART.dot` at the positions above; `ART.countBadge` centred ON each dot (the badge covers the dot's centre, numeral 18 px `THEME.font.display` `THEME.colour.structure`).
- Cloth: `makeTile(scene, 400, 170, 320, 160, { fill: THEME.colour.structure, stroke: THEME.colour.structure, label: ART.clothTag.value, fontSize: 48, color: THEME.colour.bg.hex, onTap })` — the tile tokens are exactly `ART.cloth` + `ART.clothTag`. During `clothUp` the tile's container moves up 150 px and dims to alpha 0.15 (it never fully disappears, so the child sees WHERE the cover went).
- Total numeral: `ART.totalNumeral` at (400, 80).
- Numeral tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, label 44 px `THEME.font.display` `THEME.colour.ink`; disabled look = library alpha 0.5.
- Show-me ring: `ART.showRing` behind the correct tile.
- Caption: `S("howMany")`, 28 px `THEME.font.body`, `THEME.colour.inkSoft`, (360, 300), `wordWrap` width 600, max 2 lines.
- Tab order: cloth tile, then the three numeral tiles left to right. Tap floors: cloth 320 × 160, tiles 96 × 96 (≥ 80, the 5-6 floor); gaps ≥ 24.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: quantities, dot arrangements and numerals only. `LOCALE_DATA` not needed. Number words never appear.

Items as (quantity; arrangement; the two distractor numerals). Tiles = the quantity + the two distractors, shuffled.
- **L1** (1-3, dice patterns): (3; dice-3; 2, 4) · (2; dice-2; 1, 3) · (1; dice-1; 2, 3) · (3; dice-3; 1, 2) · (2; dice-2; 3, 4)
- **L2** (1-5, dice patterns and dominoes; the same quantity in two looks): (4; dice-4; 3, 5) · (5; dice-5; 4, 6) · (4; domino-4; 3, 5) · (5; domino-5; 3, 4) · (3; dice-3; 2, 5) · (5; dice-5; 3, 4)
- **L3** (3-5, rows and the ten-frame row — non-dice, spread out): (4; row-4; 3, 5) · (5; row-5; 4, 6) · (3; row-3; 2, 4) · (5; ten-row-5; 4, 6) · (4; row-4; 5, 6) · (5; row-5; 3, 4)

Play list: 8 items. Start at L1; take items from the current level's pool in a shuffled order without repeating an item within the session; level changes per Rules. If a level's pool is exhausted, reuse it reshuffled. Distractor tile positions are shuffled per item; the correct tile never sits in the same slot twice running (§13). Two consecutive items never show the same quantity.

## Rules
- Item count: 8.
- Difficulty progression: after 2 consecutive first-try correct items, the next item comes from the next level up (L1 → L2 → L3, cap L3). "First-try correct" = the correct numeral was the first numeral tapped AND the cloth was flashed at most twice on that item.
- Adaptation: a wrong numeral tap on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Flash duration: 1000 ms at every level (never shortened — speed is not the objective; the objective is recognising the group). A re-flash is always allowed by tapping the cloth again; a third or later flash on one item means the item counts as not-first-try, with no other consequence.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with the cloth down and no tap on item 1, the cloth `ANIM.hop`s once (y −18 and back) to invite the tap; repeats every 6 s of inactivity. Nothing is displayed about time; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the tile, `tone("correct")`, the reveal (cloth up, all badges together, total numeral), `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, rabbit `ANIM.hop`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Off-by-one or any wrong numeral after the flash** (counting instead of seeing / cardinality): `ANIM.nudge`, `tone("nudge")`, then the reveal — cloth stays up, all badges appear at once, total numeral shows for 900 ms then fades with the badges; the dots stay visible for attempt 2.
  - **Arrangement read as the number** (e.g. 4 tapped for domino-5): identical reveal; the badges over the two columns (2 and 3) show that the shape holds five.
  - **Tapping a numeral before any flash**: impossible — the tiles are disabled until the first flash completes.
  - **Tapping the cloth during the flash**: nothing happens (the cloth tile is disabled while the dots are visible).
- Retry behaviour: attempt 1 (after the flash) → attempt 2 with the dots in view → attempt 3 with the show-me ring; tapping the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 8 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")` (via makeStartScreen), `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Subitise Flash"
  - `howMany` = "How many?"

## Sound
`GameCore.tone` only (§11): `tone("tap")` when the cloth is tapped; `tone("tap", n)` once when the dots appear during a flash, pitched by the quantity n (one chord-note per set, so 5 sounds higher than 2 — the pitch encodes the quantity, F-213, without one-note-per-object counting, which would contradict subitising); `tone("correct")` on a correct numeral; `tone("nudge")` on a wrong numeral (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show (the badges and the total numeral carry the count).

## Testing checklist
- [ ] Works in all 11 languages: the picker on the start screen changes Start, "All done!", "Play again", "Menu" and the praise pops; "How many?" changes once translations are loaded.
- [ ] Works at narrow width: in a 400-px-wide iframe the whole stage is visible; the cloth, the three tiles and the rabbit are not cut off.
- [ ] Keyboard operable: Tab reaches the cloth then the three numeral tiles; Enter flashes / picks; Enter on a disabled tile does nothing.
- [ ] Never auto-starts: the page shows the start screen; no card or cloth appears until Start is tapped.
- [ ] No losing state: tapping wrong numerals repeatedly still ends with the item completing via the show-me ring and the session reaching "All done!".
- [ ] The numeral tiles are dimmed and unresponsive until the cloth has been tapped and the flash has finished.
- [ ] The dots are visible for about one second and then covered again; tapping the cloth again shows them again for about one second.
- [ ] After a correct tap the cloth lifts for good and every dot shows a numeral badge at the same moment (not one after another), with the big total above the card.
- [ ] After a wrong tap the dots stay visible for the second attempt.
- [ ] Two first-try corrects in a row bring larger sets or new arrangements (dominoes, then rows); a wrong tap brings an easier set next.
- [ ] At the third level dots appear in rows and in a five-cell frame, never as dice patterns.
- [ ] The finish screen shows eight small dot cards with their numerals and no score or stars.
- [ ] With `?sound=off` nothing is audible; with sound on, a set of 5 sounds higher than a set of 2.
- [ ] No text appears on the play screen other than "How many?", "?" on the cloth, and the numerals.
