# 141 — Letter Pairs

## Identity
- Slug: `letter-match-pairs`
- Subject / topic: Literacy / letter recognition across fonts and sizes — the same letter drawn in the two theme faces (Baloo 2 display vs Nunito body) is still the same letter
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~430 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: the letter set is language-bound only at the edges (extra letters per `LOCALE_DATA`, F-122); the mechanic is universal (F-217). Distinct from game 007 (Case Pairs): here BOTH tiles of a pair are in the SAME case — what differs is the typeface and, from L2, the size. Nothing is spoken (no audio files).

## Learning
- Objective: Pairs each letter on a visible board with the same letter drawn in the other typeface (and, at the top level, at a different size), including the letters whose two faces look least alike (a, g, y, t, l) and the mirror-prone letters (b, d, p, q).
- Prerequisites: Recognises letters as distinct shapes in one face (game 006). No letter names or sounds are needed; no reading.
- Curriculum links: F-1 (letter recognition in 9 of 15 sources), F-22 (letter names and letter-sound correspondence taught explicitly at 5-7 in all twelve systems), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d "recognize and name all upper- and lowercase letters"; England Reception/Y1 letters "in different fonts"; Germany Klasse 1 Buchstaben in Druckschrift; France GS "reconnaître les lettres dans différentes écritures"; Spain Infantil; Brazil EF01LP04-05; Netherlands groep 2; Sweden förskoleklass; Denmark 0. klasse; Norway 1. trinn; Finland esiopetus). Demand: F-7 (letter recognition is universal).
- Common misconceptions (F-125, F-121), each with this game's response:
  1. **A letter is a picture — in a new font it is "a different letter" (single-storey a vs double-storey a, g with a loop vs g with a hook, y with a straight vs curled tail) — F-125.** Response: when a correct pair is made the two tiles glide together and a `ART.sameCard` appears above them for 900 ms showing the letter in BOTH faces side by side with `ART.link` between — the identity is shown, not just rewarded. L1 boards use capitals (faces differ least), L2 the lowercase letters whose faces differ most, L3 adds size variation so neither face nor size is a cue.
  2. **Mirror pairing — b (display) paired with d (body), p with q — F-121.** Response: b/d and p/q are never on one board before L3; at L3 a mirror attempt gets `ART.bellyDot` on the bowl of both letters for 900 ms before the nudge apart — "which side is the belly".
  3. **Near-form pairing — l with I, O with Q, n with u, m with w (rotated or extended look-alikes).** Response: the tapped pair nudges apart and `ART.strokeHint` draws the distinguishing stroke on the tile the child tapped second (the tail of Q, the crossbar of t, the dot of i) for 900 ms.
  4. **Pairing by size ("the two big ones go together") once sizes vary.** Response: at L3 size is assigned per tile independently of face and letter (Content), so two same-size tiles are as likely to be different letters as the same; a same-size wrong pair gets the standard nudge and, after two wrong pairs on the same tile, the hint ring on its true partner (`ART.hintRing`).
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (no error; `tone("tap")`).

## How it plays
1. **Start screen**: title "Letter Pairs", the panda (`ART.panda`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 2 dots (§6 — one per board; two boards per session, three when the child climbs fast). Zones A/B are merged for this pattern: a 3 × 2 grid of tiles (`ART.tile`, 100 × 100, gap 20) centred at (360, 300): columns x = 240 / 360 / 480, rows y = 240 / 360. The six tiles show S, M, B — each once in `THEME.font.display` and once in `THEME.font.body` — in a shuffled layout. The panda sits at (80, 300). No caption; no words on the play screen.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (same letter, other face)**: both tiles glide 20 px toward each other (`ANIM.join`), `tone("correct")`; `ART.sameCard` appears above the pair (`ANIM.appear`) showing "S S" — the letter in display face then body face with `ART.link` between — for 900 ms, then fades (`ANIM.fadeOut`); both tiles lock: alpha 0.6 with `ART.link` drawn between their facing edges; the panda `ANIM.nod`. The rail is per board, so nothing fills yet.
   - **Not a pair**: both `ANIM.nudge`, `tone("nudge")`, both de-select. If the two letters are a mirror pair (L3 only) `ART.bellyDot` shows on both bowls for 900 ms first; if they are a near-form pair (Content table) `ART.strokeHint` draws on the second-tapped tile for 900 ms first. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut` (tiles rise and fade), and the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L2 4 pairs (8 tiles, 4 × 2 grid: x = 180 / 300 / 420 / 540) from the lowercase "faces differ most" set; L3 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96) with mirror and near-form letters together and letter sizes 56 px or 40 px assigned per tile at random. Session = 2 boards at L1 pace, 3 boards when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the panda (360, 210) `ANIM.celebrate`; the summary = every pair made this session as `ART.pairChip` (72 × 36) showing the letter twice, once per face ("a a"), in rows of six from y = 360 (x = 360 − 2.5 × 84 + i × 84, row pitch 46) — the visual record; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  panda:      { kind: "emoji", value: "🐼", size: 80 },
  tile:       { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // letter 52 px, face per tile data (display | body), colour ink
  link:       { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  sameCard:   { kind: "shape", shape: "roundRect", w: 200, h: 84, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 14 },   // holds the letter twice: left in font display, right in font body, 44 px, ink; ART.link between
  hintRing:   { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  bellyDot:   { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  strokeHint: { kind: "shape", shape: "line", w: 36, stroke: "accent", strokeWidth: 6 },   // endpoints per the near-form table in Content
  pairChip:   { kind: "shape", shape: "roundRect", w: 72, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // "a a" 22 px: left display, right body
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12; no `fallback` needed. Letters are drawn as tile labels through `makeTile` with `fontFamily` set from the tile's `face` field (`THEME.font.display` or `THEME.font.body`), weight 700 in both faces.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 20 px toward the other (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "sameCard; a new board's tiles (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "sameCard after 900 ms; bellyDot / strokeHint after 900 ms" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "panda on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish panda" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                 sameCard (360,150) 200×84 (900 ms after a pair)│
      │  panda          [ S ]      [ m ]      [ B ]     row y=240     │
      │  (80,300)      display     body      body                    │  zones A+B
      │                 [ b ]      [ S ]      [ M ]     row y=360     │
      │                display     body     display    (100×100)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Row labels "display"/"body" are documentation only — nothing is written on the play screen. 4-pair boards use x = 180 / 300 / 420 / 540; 5-pair boards x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens; label = the letter, 52 px (L1-L2) or 56 / 40 px (L3, per tile data), `fontFamily` = `THEME.font.display` for `face: "display"` tiles and `THEME.font.body` for `face: "body"` tiles, weight 700, colour `THEME.colour.ink`; selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two locked tiles' facing edges.
- `ART.sameCard` centred (360, 150): the letter at 44 px in the display face at (−48, 0) and in the body face at (+48, 0), `ART.link` at (0, 0).
- `ART.hintRing` behind a tile; `ART.bellyDot` on a letter's bowl (offsets, tile-centre relative: b (+12, +8) · d (−12, +8) · p (+12, −6) · q (−12, −6) — scaled by 40/52 for 40 px letters); `ART.strokeHint` per the near-form table in Content.
- `ART.panda` (80, 300). Tap floors 96-100 ≥ 80; gaps ≥ 8 at 5 columns (tiles 96, pitch 104), ≥ 20 otherwise.
- Font weights: both faces at 700 so the difference is letterform, not boldness. A tile never shows its face name.

## Content
Letters from `LOCALE_DATA[lang].pools`. The English base is shared by all Latin-script locales; extras are added to the L3 pool only (de ä ö ü, fr é ç, es ñ, pt ã ç, it è, sv å ä ö, da/no æ ø å, fi ä ö; nl none) and always appear with their base letter on the same board (ä with a) so the diacritic, not the face, must be read. All eleven locales are complete by construction; no native list is required.

Each tile = `{ letter, face, size }`; the pair test is `a.letter === b.letter && a.face !== b.face` (never label equality — the same letter appears twice on every board by design). Every letter on a board appears exactly once per face.

- **L1 — capitals, faces differ least** (3 pairs per board, drawn without repeats from): S · M · B · R · E · K · G · A · T · H
- **L2 — lowercase whose faces differ most** (4 pairs per board; at least two of the first five on every board): a (single-storey in display, double-storey in body) · g · y · t · l · e · k · f · j · r
- **L3 — mirror and near-form letters, plus size variation** (5 pairs per board; each board holds at least one mirror set and one near-form set; each tile's letter size is 56 or 40 px chosen at random per tile, independent of face): b · d · p · q · n · u · m · w · i · l · o · a, plus the locale's extras with their base letter.
- Board composition rules: L3 never holds b, d, p AND q on the same board (at most one mirror pair: b+d or p+q); a board never holds i AND l AND j together; the two tiles of one pair are never horizontally adjacent in the same row on a fresh board.

Near-form table for `ART.strokeHint` (drawn on the SECOND-tapped tile, tile-centre relative, on the letter that has the extra stroke): O/Q → the tail: line at (+14, +14) length 16 · l/i → the dot: line at (0, −22) length 6 · n/u → the closed top: line at (0, −18) length 26 on n · m/w → the middle vertex: line at (0, +6) length 12 · t/l → the crossbar: line at (0, −6) length 20 on t · f/t → the hook: line at (+6, −20) length 14 on f · a/o → the stem: line at (+16, 0) length 24 on a · E/F → the bottom bar: line at (−4, +18) length 28 on E · G/C → the bar: line at (+8, +4) length 18 on G. Mirror table for `ART.bellyDot`: b/d, p/q (both bowls).

Play list: boards are built per level from the pools by Rules; letters never repeat across the session's boards; tile layout shuffled per board.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 12 pairs at most ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); a board with exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, `ART.sameCard` for 900 ms showing the letter in both faces, tiles lock with `ART.link`, panda `ANIM.nod`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - Different letters, no special relation (including two tiles of the same SIZE at L3): both nudge, `tone("nudge")`, both de-select; the board never resets.
  - Mirror pair attempt (b with d, p with q — L3): `ART.bellyDot` on both bowls for 900 ms, then the nudge.
  - Near-form attempt (O with Q, l with i, n with u, m with w, t with l, f with t, a with o, E with F, G with C): `ART.strokeHint` on the second-tapped tile for 900 ms, then the nudge.
  - Same letter, same face: cannot occur (each letter appears once per face).
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes (success is certain).
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Letter Pairs". No words on the play screen; the letters are content, not UI text.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the faces carry the lesson.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` boards at the third level can include ä with a, `?lang=da` ø with o).
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board is fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] Every letter on a board appears exactly twice, once in the rounded display face and once in the body face; both are bold.
- [ ] On the second level the two "a" tiles look different (one with a hood, one without) and still pair.
- [ ] Making a pair shows a small card above the two tiles with the letter in both faces joined by a bar, which then fades.
- [ ] At the third level tapping b then d shows a coral dot on both letters' round parts before they nudge apart.
- [ ] Tapping O then Q draws a short coral stroke on Q's tail before the nudge.
- [ ] At the third level letters come in two sizes and two tiles of the same size are not a pair unless they are the same letter.
- [ ] Tapping a tile twice de-selects it with no error; a locked pair is dimmed with a bar between the tiles and cannot be tapped.
- [ ] A board with 0-1 mistakes is followed by a bigger board with harder letters; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair made as "a a" chips (one per face) and no score.
- [ ] With `?sound=off` nothing is audible.
