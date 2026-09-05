# 007 — Case Pairs

## Identity
- Slug: `case-pairs`
- Subject / topic: Literacy / linking uppercase and lowercase forms of the same letter
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: letter set per `LOCALE_DATA` (F-122); the mechanic is universal.

## Learning
- Objective: Pairs each uppercase letter on a visible board with its lowercase form, including the pairs whose two forms look nothing alike (A/a, G/g, R/r, E/e, D/d).
- Prerequisites: Recognises letters as distinct shapes (game 006). No letter names required (nothing is spoken).
- Curriculum links: F-1, F-22, F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d; England Reception/Y1 "name the letters of the alphabet"; Germany Klasse 1 Groß- und Kleinbuchstaben; France GS "correspondance capitales / script"; Spain Infantil mayúscula/minúscula; Brazil EF01LP04; Sweden förskoleklass; Norway 1. trinn "store og små bokstaver"; Finland esiopetus).
- Common misconceptions (F-121), each with this game's response:
  1. **Pairing by look-alike shape rather than identity (matching C with c is easy; matching A with d because both have a "stick" is the error).** Response: a wrong pair nudges apart; after the same tile has been in two wrong pairs, its true partner gains a soft outline (`ART.hintRing`) — the board never resets, so the child keeps the pairs already made.
  2. **Not knowing the dissimilar pairs at all (G/g, R/r, E/e, Q/q, D/d).** Response: when a dissimilar pair is correctly made, the two tiles glide together and the uppercase MORPHS into the lowercase (`ANIM.morph`: the upper tile's letter fades out while a copy of the lower letter fades in on it, 500 ms) so the identity is shown, not just rewarded; L1 boards contain only look-alike pairs (C/c, O/o, S/s, X/x, Z/z, V/v, W/w, P/p, K/k, U/u), L2 mixes, L3 is all dissimilar.
  3. **Mirror confusion inside the board (b/d as a "pair").** Response: b and d (and p/q) never appear on the same board before L3; at L3 the board can hold B/b and D/d together, and pairing B with d gets the `ART.bellyDot` cue from game 006 on both letters before the nudge apart.
  4. **Tapping the same tile twice expecting a match.** Response: the second tap on the selected tile de-selects it (no error, no sound beyond `tone("tap")`).

## How it plays
1. **Start screen**: title "Case Pairs", the penguin (`ART.penguin`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 2 dots (§6 — one per board; two boards per session at 5-6). Zone A/B are merged for this pattern: a 3 × 2 grid of tiles (`ART.tile`, 100 × 100, gap 20) centred at (360, 300): columns x = 240 / 360 / 480, rows y = 240 / 360. The six tiles show C, c, O, o, S, s in a shuffled layout. The penguin stands at (80, 300). No caption.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (same letter, other case)**: both tiles glide toward each other by 20 px (`ANIM.join`), `tone("correct")`, then lock: both dim to alpha 0.6 with a link glyph (`ART.link`, a short `structure` bar) drawn between them; for dissimilar pairs the `ANIM.morph` plays first. Every completed pair fills nothing on the rail (the rail is per board); the penguin `ANIM.waddle` (angle wobble). Praise pop when the board completes.
   - **Not a pair**: both `ANIM.nudge`, `tone("nudge")`, both de-select; if the FIRST-tapped tile has now been in two wrong pairs, its partner gets `ART.hintRing` (`ANIM.showMe`) until the pair is made. Mirror pairs get the `ART.bellyDot` cue first (misconception 3).
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut` (all tiles rise and fade), then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L1 3 pairs look-alike; L2 4 pairs (8 tiles, 4 × 2 grid: x = 180 / 300 / 420 / 540) mixing two look-alike and two dissimilar; L3 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96) all dissimilar, may include B/b + D/d together. Session = 2 boards at L1 pace, up to 3 boards when the child moves up quickly (Rules).
6. **Finish**: `t("all_done")` (360, 110); the penguin (360, 210) `ANIM.celebrate`; the summary = every pair made this session as small joined tiles "Aa" (`ART.pairChip`, 64 × 36) in rows of six from y = 360 — the visual record of the learning; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  penguin:  { kind: "emoji", value: "🐧", size: 80 },
  tile:     { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // letter 52 px display ink
  link:     { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing: { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  bellyDot: { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  pairChip: { kind: "shape", shape: "roundRect", w: 64, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // label "Aa" 22 px display ink
  dotEmpty: { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:  { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each of a correct pair moves 20 px toward the other (x,y at call)" },
  morph:     { alpha: 0, duration: 250, ease: "Sine.InOut", yoyo: true, trigger: "upper letter fades out while the lower letter copy fades in on the same tile (two tweens started together); dissimilar pairs only" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  waddle:    { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "penguin on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish penguin" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │  penguin        [ C ]      [ o ]      [ S ]     row y=240     │
      │  (80,300)                                                    │  zones A+B
      │                 [ s ]      [ O ]      [ c ]     row y=360     │
      │                x=240      x=360      x=480     (100×100)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
4-pair boards use x = 180 / 300 / 420 / 540; 5-pair boards x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3), centred at y = 28, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens; label 52 px `THEME.font.display` `THEME.colour.ink`; selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` drawn between the two locked tiles' facing edges.
- `ART.hintRing` behind a tile; `ART.bellyDot` on a letter's bowl (offsets as in spec 006 Content).
- `ART.penguin` (80, 300). Tap floors 96-100 ≥ 80; gaps ≥ 8 at 5 columns (tiles 96, pitch 104), ≥ 20 otherwise.

## Content
Letter pairs from `LOCALE_DATA[lang].pairs`. The English base (all Latin locales share it; extras added at L3 — de Ä/ä Ö/ö Ü/ü, fr É/é Ç/ç, es Ñ/ñ, pt Ã/ã Ç/ç, it È/è, sv Å/å Ä/ä Ö/ö, da/no Æ/æ Ø/ø Å/å, fi Ä/ä Ö/ö; nl none):
- **L1 look-alike pairs** (3 per board; boards built by picking 3 without repeats): C/c · O/o · S/s · X/x · Z/z · V/v · W/w · P/p · K/k · U/u
- **L2 mixed** (4 per board: 2 look-alike from L1 + 2 from this list): A/a · E/e · G/g · R/r · D/d · Q/q · H/h · N/n · M/m · T/t
- **L3 dissimilar** (5 per board; may include B/b and D/d together, never b with q on the same board): A/a · B/b · D/d · E/e · G/g · Q/q · R/r · F/f · L/l · J/j · I/i · Y/y

Tile layout shuffled per board; the two tiles of one pair are never horizontally adjacent in the same row on a fresh board (so the first tap is never trivially next to its partner).

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 12 pairs at most ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); a board with exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")` (+ `ANIM.morph` for a dissimilar pair), tiles lock with `ART.link`, penguin `ANIM.waddle`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - Any non-pair: both nudge, `tone("nudge")`, both de-select; the board is never reset.
  - Mirror pair attempt (B with d, P with q): `ART.bellyDot` on both for 900 ms, then the nudge.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes (success is certain).
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Case Pairs". No words on the play screen.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=sv` boards can include Å/å, Ä/ä, Ö/ö at the third level).
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board is fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] All tiles are face up at all times; nothing has to be remembered.
- [ ] Making G/g (or R/r, E/e) shows the capital fading into the small letter on its tile before the pair locks.
- [ ] Tapping B then d shows a coral dot on both letters' round parts before they nudge apart.
- [ ] Tapping a tile twice de-selects it with no error.
- [ ] A locked pair is dimmed with a bar between the two tiles and cannot be tapped again.
- [ ] A board with 0-1 mistakes is followed by a bigger board with harder pairs; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair made as "Aa" chips and no score.
- [ ] With `?sound=off` nothing is audible.
