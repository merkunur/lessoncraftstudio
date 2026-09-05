# 151 — Tricky Word Pairs

## Identity
- Slug: `tricky-word-pairs`
- Subject / topic: Literacy / irregular ("tricky") word recognition across fonts and cases — recognising the SAME written word when its letters are shown in a different case, font or slant
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: **the word lists are language-bound** (F-125; A-15) and live in `LOCALE_DATA`. Irregular / tricky words exist as a teaching genre only in English, French and Danish (F-24, F-7 — transparent orthographies have no sight-word lists); the mechanic itself (same word, different surface) is valid in every language. English is authored in full; fr and da need a native tricky-word list; the other eight locales substitute a native high-frequency function-word list — **en pilot** for all ten until then. Nothing is spoken.

## Learning
- Objective: On a visible board of six word tiles, pairs each written word with the same word shown in a different case, font or slant, ignoring surface differences and reading the letters.
- Prerequisites: Reads a handful of the highest-frequency words in the play language (the first 30 tricky words of an English phonics scheme); links capital and small letters (game 007). No decoding of the words is required — they are recognised, which is the point of the genre.
- Curriculum links: F-22 (blending and reading short words by 6-7 in all twelve systems; sight/irregular-word lists in EN/US/FR/DK only), F-24 ("irregular-word games are EN/FR/DK"), F-7 (Dolch/Fry and common exception words are English-specific demand; transparent orthographies barely have the genre), F-1 (sight words in 6 of 15 game sources), F-31 row "Blend/decode CVC; read simple words" — conservative 7, earliest 5 → 6-8 (England Y1 "common exception words"; US RF.1.3.g "recognize and read grade-appropriate irregularly spelled words"; France CP "mots-outils"; Denmark 1. klasse "de 120 hyppigste ord"). Recognising a word across fonts and cases is the check that the word is READ, not remembered as a picture (F-125).
- Common misconceptions (F-125, F-121), each with this game's response:
  1. **Reads the word as a picture — "THE" and "the" are two different words; a new font is a new word.** Response: when a correct pair locks, the two tiles glide together and the top tile's word MORPHS into the other tile's form (`ANIM.morph`: its text fades out and is redrawn in the partner's case/font, 500 ms) before both settle — the identity is shown, not just rewarded. Every board at L2 and L3 puts each word in two different fonts as well as two cases.
  2. **Guessing from the first letter (three-cueing: "th… — the").** Response: the three words on a board share their first letter or first two letters (the / they / there), so the first letter never decides; on a wrong pair the two tapped words are rewritten in one plain form, letter under letter, in the compare strip (`ART.compareStrip`, `ART.letterCell`), and the first column where they differ is ringed (`ART.diffRing`) for 1200 ms — the child sees exactly which letter tells them apart.
  3. **Matching on word shape or letter set instead of letter order (was / saw, on / no, who / how).** Response: L3 boards contain anagram or near-anagram distractors; the compare strip shows both words letter by letter so the ORDER difference is visible; the ring lands on the first differing column.
  4. **Treating a capital as a different letter (does not link T with t).** Response: L1 boards vary case only (same font), so a case-only pair is met before any font change; the morph on a correct pair shows the capital becoming the small letter.
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (no error, `tone("tap")` only).

## How it plays
1. **Start screen**: title "Tricky Word Pairs", the koala (`ART.koala`) at (360, 200), Start, picker.
2. **Board 1 (L1)**: the rail shows 4 dots (§6 — one per board; four boards per session). Zones A and B merge into one board: a 3 × 2 grid of word tiles (`ART.wordTile`, 180 × 80, gap 20) centred on (360, 300): columns x = 160 / 360 / 560, rows y = 250 / 360. The six tiles show the three words of the board in their two forms (e.g. "the" / "The", "they" / "THEY", "There" / "there"), positions shuffled. The koala sits at (66, 470) at the bottom-left. Caption `S("findPairs")` ("Find the same word") at (360, 150), 22 px `THEME.font.body` `THEME.colour.inkSoft`. `t("question_x_of_y")` is NOT shown (the rail carries progress; board count is the only number).
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (same word, other form)**: `tone("correct")`; both tiles glide 24 px toward each other (`ANIM.join`); the top/left tile plays `ANIM.morph` — its word fades and reappears in the partner's form — then both lock: alpha 0.6, `ART.link` (a short teal bar) drawn between their facing edges; the koala `ANIM.nod`. Praise pop only when the board completes.
   - **Not a pair (any two different words)**: both `ANIM.nudge`, `tone("nudge")`, both de-select; then the **compare strip**: `ART.compareStrip` (600 × 90) appears at (360, 470) with the two words rewritten in plain lowercase body font, 36 px, one above the other (rows y = 452 and y = 490), each letter in its own `ART.letterCell` column (40 px pitch, columns centred as a group); the first column whose letters differ (or the first column where one word has ended) gets `ART.diffRing` (`ANIM.markIn`), 1200 ms; the strip fades. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
   - During the compare strip (≤ 1.6 s) tiles are `setEnabled(false)`.
4. **Board complete**: all three pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut` (tiles rise and fade), the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-4**: per Content/Rules. L1 = case-only pairs in one font; L2 = case + font pairs (body vs display face); L3 = all forms including italic, with anagram / letter-set confusables as the three words. Always six tiles — three pairs — per board (the catalogue's "visible board of six word tiles").
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 210) `ANIM.celebrate`; the summary = the twelve pairs made this session as `ART.pairChip` chips (150 × 40, "the · THE" at 18 px, the two forms as they appeared) in three rows of four from y = 320 (x = 135 + i × 150) with `ART.dotFull` at the left for a pair made without a wrong tap on either tile and `ART.dotEmpty` for one that needed the hint ring; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes (4 boards × ~75 s).

## Art registry
```js
const ART = {
  koala:        { kind: "emoji", value: "🐨", size: 80 },                     // mascot
  wordTile:     { kind: "shape", shape: "roundRect", w: 180, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // word 30 px in the tile's own form (see Content)
  link:         { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:     { kind: "shape", shape: "roundRect", w: 192, h: 92, stroke: "structure", strokeWidth: 4, radius: 18 },
  compareStrip: { kind: "shape", shape: "roundRect", w: 600, h: 90, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  letterCell:   { kind: "text",  value: "", size: 36, font: "body", color: "ink" },      // one letter per column, plain lowercase
  diffRing:     { kind: "shape", shape: "roundRect", w: 40, h: 84, stroke: "accent", strokeWidth: 3, radius: 8 },   // spans both rows of one column
  pairChip:     { kind: "shape", shape: "roundRect", w: 150, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The only emoji is the mascot; the content is text. Word tiles render their label through `makeTile` with the font family, case and style the board assigns (Content); those three attributes are data on the tile, not separate ART entries, because the art upgrade will not change typography.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 24 px toward the other (x,y at call)" },
  morph:     { alpha: 0, duration: 250, ease: "Sine.InOut", yoyo: true, trigger: "the first tile's word fades out; at the midpoint its text is re-set to the partner's case/font; fades back in" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "compareStrip, letterCells and diffRing (from alpha 0)" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "koala on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```
No flashing: `showMe` cycles at 1 Hz; nothing else repeats.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                    ○ ○ ○ ○   rail y=28 (one per board) │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              "Find the same word" (360,150)                   │
      │   [   the   ]     [  THEY   ]     [  There  ]    row y=250    │  zones A+B
      │   [  there  ]     [   The   ]     [  they   ]    row y=360    │
      │    x=160           x=360           x=560        (180×80)      │
      │ koala (66,470)                                               │
480   ├──────────────────────────────────────────────────────────────┤
      │        compare strip (360,470) 600×90 — on a wrong pair       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The koala is drawn behind the compare strip's layer so the strip covers it while shown.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with 4 × `ART.dotEmpty` at y = 28 (x = 327 + i × 22) swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` 180 × 80 with `ART.wordTile` tokens; label = the word in the tile's assigned form: font `THEME.font.body` or `THEME.font.display`, style normal or italic (Nunito italic is loaded by the shared webfont URL; Baloo 2 has no italic, so italic forms are body-font only), case as assigned; 30 px `THEME.colour.ink`; fit-to-width shrink applies (longest word "because" in display uppercase ≈ 150 px, within 180). Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two locked tiles' facing edges (drawn at the midpoint between them).
- Compare strip: `ART.compareStrip` centred (360, 470); `ART.letterCell` columns at x = 360 − (n−1) × 20 + i × 40 (n = the longer word's length), rows y = 452 and y = 490; `ART.diffRing` centred on the differing column at (x, 471).
- `ART.hintRing` behind a tile. `ART.koala` at (66, 470).
- Tap floors: 180 × 80 ≥ 56; gaps 20 (columns) and 30 (rows).
- Keyboard: arrows move across the 3 × 2 grid (row-major), Enter selects / attempts the pair.

## Content
Words are language-bound. `LOCALE_DATA[lang]` = `{ boards: { L1: [...], L2: [...], L3: [...] } }`; a board = three entries `{ word, forms: [f1, f2] }`. **Form codes**: `a` = lowercase body · `b` = Capitalised body · `c` = UPPERCASE body · `d` = lowercase display · `e` = Capitalised display · `f` = UPPERCASE display · `g` = lowercase italic body. The pair predicate is `tileA.word === tileB.word && tileA !== tileB` (never label equality — the labels differ by construction).

**en** (complete):
- **L1 — case only, body font** (forms from a / b / c; the three words share a first letter or digraph):
  1. the (a, b) · they (a, c) · there (b, a)
  2. was (a, c) · water (b, a) · what (a, b)
  3. some (a, b) · come (c, a) · said (a, c)
  4. one (a, b) · once (c, a) · our (b, a)
- **L2 — case AND font** (one form from a / b / c, the other from d / e / f):
  5. said (a, e) · says (f, a) · school (d, b)
  6. were (a, f) · where (e, a) · here (c, d)
  7. little (a, e) · love (f, a) · live (b, d)
  8. put (a, f) · pull (e, a) · push (c, d)
- **L3 — every form including italic; anagram / letter-set confusables**:
  9. was (g, f) · saw (b, d) · say (c, e)
  10. no (g, f) · on (b, d) · of (c, e)
  11. who (g, f) · how (b, d) · whole (c, e)
  12. could (g, f) · should (b, d) · would (c, e)
  13. friend (g, f) · from (b, d) · full (c, e)

Plain form for the compare strip is always `a` (lowercase body) so the child compares letters, not styles.

**fr, da: a native tricky-word list is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rule: the same shape — three words per board, sharing a first letter or digraph; case-only at L1; the locale's own irregular words (fr mots-outils: est / et / les / des / dans; da: de / og / at / et / er…), plus the locale's accented capitals where the capital form drops or keeps the accent by that language's convention (fr "É" / "E" both acceptable as the capital of "é" — the pair predicate compares the stored word, not the rendered label).

**de, it, es, pt, nl, sv, no, fi: the tricky-word genre does not exist in these orthographies (F-24, F-7).** A native author substitutes the locale's highest-frequency function words (de: und / der / die / das / ist / nicht; es: el / la / que / de / es; fi: ja / on / ei / se / että …) so the game still teaches "the same word in any face" (F-125). German keeps its capitalised nouns out of the list (the a / b case pair would make "Haus / haus" wrong German). **en pilot** until authored.

Play list: 4 boards per session, chosen by level per Rules; a board never repeats within a session; tile positions shuffled per board; the two tiles of one pair are never horizontally adjacent in the same row on a fresh board.

## Rules
- Item count: one "item" = one board of 3 pairs; 4 boards per session (12 pairs).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `ANIM.morph` on the first-tapped tile, `tone("correct")`, tiles lock with `ART.link`, koala `ANIM.nod`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - Two different words tapped (first-letter guess, shape match, or "a different case is a different word"): both nudge, `tone("nudge")`, both de-select; the compare strip shows both words letter-by-letter in plain form with the first differing column ringed for 1200 ms.
  - Anagram confusion at L3 (was / saw): the same strip — the ring lands on column 1 (w vs s), showing order matters.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made and that pair counts as helped.
  - Same tile tapped twice: de-select only.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). The board never resets; locked pairs stay locked. A board always completes (F-46, success certain).
- Finish condition: 4 boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Tricky Word Pairs"; `findPairs` = "Find the same word". The words on the tiles are content from `LOCALE_DATA`, not UI strings.

## Sound
`tone("tap")` on select / de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken — words are never read aloud (no audio files).

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=fr` and `?lang=de` play the English boards until a native list exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: all six tiles and the compare strip visible and separate).
- [ ] Keyboard operable (arrows move across the 3 × 2 grid; Enter selects; Enter on a second tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; a hint ring appears after two misses on a tile).
- [ ] All six tiles are face up at all times; nothing has to be remembered.
- [ ] On the first board every word appears in one font, and the two tiles of a pair differ only in case (e.g. "the" and "The").
- [ ] Tapping "the" then "THEY" nudges both apart and shows "the" over "they" letter by letter below, with a ring around the fourth column.
- [ ] Tapping "the" then "The" slides them together, the word on the first tile changes to the other tile's look for a moment, and a bar joins them.
- [ ] From the second board a pair can differ in font as well as case (rounded display face vs body face); on the third-level boards one tile of a pair is italic.
- [ ] A third-level board with "was" and "saw" rings the first column when they are paired.
- [ ] A board with 0-1 mistakes is followed by a harder board; a board with 3+ mistakes by an easier one.
- [ ] The finish screen lists the twelve pairs as chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
