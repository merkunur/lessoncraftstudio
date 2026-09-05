# 183 — Halving

## Identity
- Slug: `halving-mirror`
- Subject / topic: Mathematics / halving even numbers to 20 by dealing a set into two EQUAL groups (half = one of two matching parts)
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap a carrot in the bowl, then a plate; when the bowl is empty a Check compares the plates), followed by a P1 tap on the numeral for the half
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (judged on Check because the whole arrangement matters). Content is language-neutral (carrots, plates, numerals); no `LOCALE_DATA`. No fraction notation appears anywhere (F-27: halves as equal parts, no symbols, at 6-8). Nothing is spoken.

## Learning
- Objective: Deals an even set of 4-20 carrots onto two plates so that both plates hold the same number, checks the plates against each other as mirror images, and then taps the numeral that names the half.
- Prerequisites: Counts to 20; reads numerals to 20; has shared objects one-to-one (game 051). Doubles (game 025) help but are not required.
- Curriculum links: F-112 ("half" = cut, not two EQUAL parts — the equal-parts check by overlay is the researched response; here the overlay is a mirror fold), F-111 (unequal sharing tolerated; the divisor given as the answer), F-27 (halves at 6-8 as sharing, no notation: EN Y1 "find a half of a quantity", US 1.G.A.3 / 2.OA, SE åk 1 "hälften", DE Klasse 2 "Hälfte", NL groep 4 "de helft van", FR CE1 "moitié"), F-21 and F-31 row "Halves/quarters as equal parts (no notation)" — conservative 7-8, earliest 5 → 6-8 (also Italy "metà", Spain "mitad", Brazil EF02MA — "metade", Denmark "halvdelen", Norway "halvparten", Finland "puolet"). F-104 (the whole drawn as the container holding the parts), F-43 (enacted feedback), F-49 (tap-to-place).
- Common misconceptions (F-112, F-111, F-101), each with this game's response:
  1. **A "half" is any split into two ("I put some on each plate, so those are halves").** Response: Check with unequal plates does not close: the mirror line (`ART.mirror`) between the plates draws, the left plate's carrots fold over onto the right plate as ghost outlines (`ANIM.fold` — a half turn about the mirror line), and every ghost that lands on an empty spot, or every carrot with no ghost on it, is ringed (`ART.leftoverRing`, `ANIM.pulse`); both plate badges (`ART.plateBadge`) show their counts side by side in `THEME.colour.inkSoft`. The child moves carrots (tap a carrot on a plate, then the other plate) and checks again. Nothing is written.
  2. **Unequal deal tolerated by a one-off slip (7 and 5 for 12 — one carrot dealt to the same plate twice).** Response: the same fold cue; because the difference is 2, exactly ONE ring appears on the fuller plate for each carrot past the half — the child sees which carrot to move, not just "wrong".
  3. **Naming the whole, or the number of plates, as the half (taps 14 or 2 for half of 14).** Response: the numeral tiles are shown only AFTER the plates match, and they are the half, the whole and a near number; tapping the whole makes both plate badges glide together to the centre and add up (`ART.sumTag` "7 + 7 = 14") for 900 ms — the whole is both plates, the half is one; tapping 2 makes the two plates `ANIM.pulse` once (there are 2 plates, but the question is on ONE plate) and one plate's badge pulses.
  4. **Off-by-one when reading a plate (taps 6 or 8 for 7).** Response: the carrots on one plate are counted for the child — each gains a `ART.countBadge` in turn with `tone("tap", k)` and the last badge grows (`ANIM.lastBadge`); the plate badge then pulses with the true count.
  5. **Dealing without keeping track (dumping all carrots onto one plate first, then "fixing" it).** Response: allowed — the manipulative refuses nothing (F-61); the fold cue on Check makes the fix visible and the plates' live badges count as carrots land, so the child can see the two numbers converge while dealing. Round-robin dealing is never required, only equal plates.

## How it plays
1. **Start screen**: title "Halving", the rabbit (`ART.rabbit`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 6 carrots)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the bowl (`ART.bowl`, 240 × 74) centred at (360, 104) holding 6 carrots (`ART.carrot`, 34 px) in a row at y = 100 (pitch 34, centred; 11-20 carrots in two rows at y = 90 and y = 114, pitch 30, row 1 holds ceil(N/2)); the rabbit at (80, 190). Zone B (from y = 260): two plates (`ART.plate`, r 62) at (250, 350) and (470, 350) with the mirror line (`ART.mirror`, a dashed vertical line from y = 270 to y = 430 at x = 360) between them, faint until Check; above each plate its live badge (`ART.plateBadge`) at (plate x, 272) showing the plate's count, starting at 0. Zone C: Check (`makeButton ok`) at (360, 512), disabled until the bowl is empty. Caption `S("halfEach")` ("Same on both plates") at (360, 226), 22 px `THEME.colour.inkSoft`.
3. **Dealing**: every carrot in the bowl is a `makeTile` 56 × 56 (transparent body, `ART.carrot` label); tap a carrot → it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`); tap a plate (`makeTile` 124 × 124) → the carrot glides (`ANIM.glide`) to the plate's next free slot (slots in Visual specification) and the plate badge counts up (`ANIM.badgeIn`, `tone("tap", n)` where n = that plate's new count). **Shortcut**: tapping a plate with NOTHING selected deals the bowl's leftmost carrot to that plate (the first item is discoverable by tapping a plate). A carrot on a plate is still a tile: tap it, then the other plate, to move it across; tap it, then the bowl (`makeTile` 240 × 74), to send it back. Tapping a second carrot before a destination switches the selection. A plate whose slots are full (10) refuses (`ANIM.nudge`, no message).
4. **Check** (enabled when the bowl is empty): the mirror line brightens (`ANIM.mirrorOn`); ghost outlines of the left plate's carrots (`ART.ghostCarrot`) fold over the mirror onto the right plate (`ANIM.fold`, 500 ms).
   - **Equal plates**: every ghost lands exactly on a carrot; `tone("correct")`; the ghosts fade; `ART.equalMark` appears on the mirror line at (360, 350) (`ANIM.appear`); the plates `ANIM.pop` together. Then the **half question**: three numeral tiles (`ART.numeralTile`, 88 × 88) `ANIM.appear` in zone C replacing Check — at y = 512, x = 250 / 360 / 470 — showing the half, the whole and a near number (Content) in a shuffled order; `ART.halfPrompt` (a small plate glyph with a question mark) appears at (80, 512).
     - **Correct half tapped**: `ANIM.pop`, praise pop (rotation), the tapped numeral glides (`ANIM.glide`) onto the left plate badge; rail dot fills; after 900 ms the next item builds (plates clear with `ANIM.rise`, new carrots `ANIM.appear`). First-try if no wrong Check and no wrong numeral on the item.
     - **Wrong numeral**: `ANIM.nudge`, `tone("nudge")`, the class-specific cue (Rules); attempt 2; a second wrong numeral → the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
   - **Unequal plates**: `tone("nudge")`; ghosts that land on empty spots and carrots with no ghost are ringed (`ART.leftoverRing`, `ANIM.pulse`) for 900 ms; the plate badges show in `THEME.colour.inkSoft`; ghosts and rings fade; Check disables until a carrot moves. Attempt 2 (the item is retried).
   - **Second unequal Check**: the cue again, and the show-me: the exact carrots to move gain `ART.showRing`s and the destination plate pulses (`ANIM.pulse`); moving them and checking completes the deal as solved-with-help (the half question still follows).
5. **Items 2-10**: per Content/Rules. L1 N = 4-10; L2 N = 12-16 (bowl in two rows); L3 N = 16-20 with the numeral tiles including half ± 1 and, on alternate items, the number of plates (2) instead of the whole.
6. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate` between two small plates (`ART.plate` at 60 % scale at (290, 210) and (430, 210)); the summary = the ten halves as `ART.halfChip`s (120 × 36, "14 → 7 and 7" written as N + " → " + h + " | " + h — numerals and symbols only) in two rows of five from y = 330, with `ART.dotFull` for first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes (dealing 20 carrots takes ~40 s).

## Art registry
```js
const ART = {
  rabbit:       { kind: "emoji", value: "🐰", size: 80 },
  carrot:       { kind: "emoji", value: "🥕", size: 34 },
  bowl:         { kind: "shape", shape: "roundRect", w: 240, h: 74, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 26 },
  plate:        { kind: "shape", shape: "circle", r: 62, fill: "surface", stroke: "structure", strokeWidth: 3 },
  plateBadge:   { kind: "shape", shape: "circle", r: 16, fill: "structure" },      // count on it: 20 px display, color bg
  mirror:       { kind: "shape", shape: "line", w: 3, stroke: "structure", strokeWidth: 3 },   // dashed [10,8]; vertical from (360,270) to (360,430); alpha 0.3 until Check
  ghostCarrot:  { kind: "shape", shape: "circle", r: 15, stroke: "accent", strokeWidth: 3 },   // the folded copy of a left-plate carrot
  leftoverRing: { kind: "shape", shape: "circle", r: 21, stroke: "accent", strokeWidth: 4 },   // around a carrot with no ghost / a ghost with no carrot
  equalMark:    { kind: "text",  value: "=", size: 40, font: "display", color: "structure" },
  sumTag:       { kind: "text",  value: "", size: 28, font: "display", color: "structure" },    // "7 + 7 = 14" for the whole-as-half cue
  countBadge:   { kind: "shape", shape: "circle", r: 13, fill: "accent" },         // numeral 16 px display inkOnAccent, on a carrot during the count cue
  numeralTile:  { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 40 px
  halfPrompt:   { kind: "shape", shape: "circle", r: 22, fill: "surface", stroke: "structure", strokeWidth: 3 },   // a small plate; "?" 24 px display structure drawn on it
  showRing:     { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },
  halfChip:     { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Plate slots (relative to the plate centre, up to 10 per plate, filled in this order): (−30,−30) (0,−30) (30,−30) (−30,0) (0,0) (30,0) (−30,30) (0,30) (30,30) (0,−52). Slot k on the right plate uses the same offsets with x negated, so an equal deal makes the right plate the exact mirror image of the left. The fold maps left slot (x, y) to right slot (−x, y) about the mirror at x = 360.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.08, duration: 120, ease: "Sine.Out", trigger: "carrot selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "carrot to a plate slot / across / back to the bowl; the chosen numeral to the plate badge (x,y set at call)" },
  badgeIn:   { scale: 1.3, duration: 120, ease: "Back.Out", yoyo: true, trigger: "a plate badge when its count changes" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a refused placement (full plate); a wrong numeral tile" },
  mirrorOn:  { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "mirror line brightens on Check (from alpha 0.3); back to 0.3 when the next item builds" },
  fold:      { scaleX: -1, duration: 500, ease: "Sine.InOut", trigger: "the ghost layer (a container of ghostCarrots at the left plate's slots, pivot on the mirror line) flips to scaleX −1 so each ghost lands on its mirrored slot" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "leftover rings; both plates for the 2-as-half cue; a plate badge after a count cue" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "ghosts, rings, sumTag and count badges after a cue" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "equalMark, numeral tiles, halfPrompt, new carrots (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "both plates on an equal Check; the correct numeral tile" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last count badge in the plate count cue" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "carrots and badges clearing between items" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "rings on the carrots to move / on the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```
No flashing: `showMe` at 1 Hz; the fold is one continuous half turn.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              ( c c c c c c )  bowl (360,104)                  │
      │  rabbit (80,190)                                              │  zone A
      │              "Same on both plates" (360,226)                 │
260   ├──────────────────────────────────────────────────────────────┤
      │        (3)              ¦ mirror x=360      (3)  badges y=272 │
      │      ╭─────╮            ¦                 ╭─────╮             │  zone B
      │      │ c c │            ¦   =             │ c c │  plates     │
      │      │  c  │ (250,350)  ¦ (360,350)       │  c  │ (470,350)  │
      │      ╰─────╯            ¦                 ╰─────╯   r=62      │
480   ├──────────────────────────────────────────────────────────────┤
      │  [?] (80,512)   [ 3 ] [ 6 ] [ 4 ]  y=512  (replaces OK)      │  zone C
      │                    [   OK   ] (360,512) while dealing          │
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The ghost layer's container is positioned at (360, 350) with the ghosts at (leftSlot.x − 110, leftSlot.y) so `scaleX: −1` maps them onto the right plate's slots.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.bowl` centred (360, 104) — a `makeTile` 240 × 74 so a plate carrot can be sent back; bowl carrots: `makeTile` 56 × 56 each with transparent body (`fill`/`stroke` = `THEME.colour.bg` tokens) and `ART.carrot` as label, laid per the row rule.
- `ART.plate`s at (250, 350) and (470, 350) as `makeTile` 124 × 124 (the body is the plate); placed carrots are re-parented tiles at the plate slots (34-px glyphs, 30-px pitch — gap 4 inside a plate is acceptable: a mis-tap selects a neighbouring carrot on the same plate, which is equally valid). `ART.plateBadge` at (plate x, 272) with the count in `THEME.colour.bg` 20 px `THEME.font.display`.
- `ART.mirror` dashed at x = 360, alpha 0.3, brightening on Check; `ART.ghostCarrot`s on the ghost layer; `ART.leftoverRing`s over carrots/ghosts; `ART.equalMark` at (360, 350); `ART.sumTag` at (360, 300); `ART.countBadge` at a carrot's (+16, −16).
- Zone C: Check `makeButton` `ok` at (360, 512), alpha 0.5 while disabled; after an equal Check it is replaced by three `makeTile` 88 × 88 (`ART.numeralTile`, numeral 40 px `THEME.font.display` `THEME.colour.ink`) at x = 250 / 360 / 470 and `ART.halfPrompt` at (80, 512); `ART.showRing` behind the correct tile.
- Caption `S("halfEach")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 226), `wordWrap` 600, one line. `ART.rabbit` at (80, 190).
- Tap floors: carrots 56, plates 124, bowl 240 × 74, numerals 88, OK 220 × 72 — all ≥ 56. Tab order: bowl carrots left to right, the left plate, the right plate, the bowl, then OK (or the three numeral tiles); Enter selects / places / checks.

## Content
Language-neutral. Items as (N; half; numeral tiles). Tiles always include the half; the correct tile's slot is shuffled per item and never repeats twice running (§13).
- **L1** (N 4-10, bowl in one row; tiles = half, whole, half + 1): (6; 3; 3, 6, 4) · (4; 2; 2, 4, 3) · (8; 4; 4, 8, 5) · (10; 5; 5, 10, 6) · (6; 3; 3, 6, 2) · (8; 4; 4, 8, 3)
- **L2** (N 12-16, bowl in two rows; tiles = half, whole, half ± 1): (12; 6; 6, 12, 7) · (14; 7; 7, 14, 6) · (16; 8; 8, 16, 9) · (12; 6; 6, 12, 5) · (14; 7; 7, 14, 8) · (10; 5; 5, 10, 4)
- **L3** (N 16-20; tiles = half, half − 1, half + 1 on odd items; half, 2, half + 1 on even items): (18; 9; 9, 8, 10) · (20; 10; 10, 2, 11) · (16; 8; 8, 7, 9) · (18; 9; 9, 2, 10) · (20; 10; 10, 9, 11) · (14; 7; 7, 2, 8)

Play list of 10 per Rules; shuffle within level; no N repeats consecutively. Carrot order in the bowl is left to right; a plate's slots fill in the fixed order above so the two plates always mirror when equal.

Worked example: item 1 (6) deals 3 and 3 by tapping the left plate, right plate, left, right, left, right (the shortcut), Check → the ghosts fold and match, "=", taps 3 → first-try · item 2 (8) first-try → L2 · item 3 (14) deals 8 and 6, Check → two ghosts land on empty spots on the right plate and are ringed (and the two extra carrots on the left have no ghost — ringed); moves one carrot across, Check → equal; taps 14 → the badges glide together, "7 + 7 = 14"; taps 7 → helped → L1 · item 4 (10) first-try · item 5 (6) first-try → L2 · item 6 (16) first-try · item 7 (12) first-try → L3 · item 8 (18) taps 2 → both plates pulse, one badge pulses; taps 9 → helped · items 9-10 first-try → Finish shows ten chips, eight with filled dots.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try items → next level (cap L3). First-try = equal on the first Check AND the half on the first numeral tap.
- Adaptation: a wrong Check or a wrong numeral on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: equal Check → `ANIM.fold` matches, `tone("correct")`, `ART.equalMark`, plates `ANIM.pop`, the numeral tiles appear; correct numeral → `ANIM.pop`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try only), the numeral glides to the badge, rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Unequal plates on Check (any split is a half / a dealing slip): `tone("nudge")`, the fold with rings on the unmatched carrots and ghosts, both badges shown; Check disables until a carrot moves.
  - Second unequal Check: the cue, then `ART.showRing`s on the carrots that must move and the destination plate pulsing (show-me).
  - The whole tapped as the half: nudge + tone; both badges glide to (360, 300) and `ART.sumTag` shows "h + h = N" for 900 ms, then they return.
  - 2 tapped (the number of plates): nudge + tone; both plates pulse once, then ONE plate's badge pulses.
  - Half ± 1 tapped (off-by-one): nudge + tone; the left plate's carrots are counted with badges and rising tones, the last badge grows, the plate badge pulses.
  - A full plate tapped as a destination: the carrot springs back with a nudge; not an attempt.
- Retry behaviour: dealing — attempt 1 → attempt 2 after the fold cue → attempt 3 with the show-me rings on the carrots to move; numeral — attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct tile; solved-with-help. No attempt 4 in either step.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Halving"; `halfEach` = "Same on both plates". No fraction symbol anywhere; the chips are numerals and symbols.

## Sound
`tone("tap")` on selecting a carrot; `tone("tap", n)` when a carrot lands on a plate (n = that plate's new count, so the two plates sound the same pitch when they hold the same number — F-213); `tone("tap", k)` per badge in the count cue; `tone("correct")` on an equal Check; `tone("nudge")` on an unequal Check or a wrong numeral; `tone("finish")` once. Silent under `?sound=off`; no audio files; the badges and rings show everything the tones mark.

## Testing checklist
- [ ] Works in all 11 languages (OK, Question x of y, All done, Play again, Menu, praise and the caption change with the picker).
- [ ] Works at narrow width (400-px iframe: the bowl with 20 carrots in two rows, both plates, the mirror line and OK visible; nothing overlaps the rabbit).
- [ ] Keyboard operable (Tab walks the bowl carrots, the two plates, the bowl and OK / the numeral tiles; Enter selects, places and checks).
- [ ] Never auto-starts.
- [ ] No losing state (unequal Checks and wrong numerals never end the session; the show-me rings always lead to completion).
- [ ] Tapping a plate with nothing selected deals the leftmost bowl carrot to it and the plate's badge goes up by one.
- [ ] OK is dimmed until the bowl is empty; tapping a plate carrot then the other plate moves it across; tapping it then the bowl sends it back.
- [ ] With 8 and 6 on the plates, OK folds ghost outlines from the left plate onto the right; two ghosts on empty spots and two carrots without ghosts are ringed; OK dims until a carrot moves.
- [ ] With 7 and 7, the ghosts land exactly on the carrots, "=" appears on the mirror line and three numeral tiles replace OK.
- [ ] Tapping 14 for half of 14 shows the two badges meeting with "7 + 7 = 14"; tapping 2 pulses both plates then one badge; tapping 6 counts the plate's carrots with badges to 7.
- [ ] At the second level the bowl shows two rows; at the third level the tiles are the half and its neighbours, or the half and 2.
- [ ] Two first-try items in a row bring more carrots; a wrong Check or numeral brings fewer.
- [ ] No fraction symbol (1/2, ½) appears anywhere on any screen.
- [ ] The finish screen lists ten chips like "14 → 7 | 7" with filled dots for unaided ones and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, two equal plates play the same note on their last carrot.
