# 085 — Spell by Sound

## Identity
- Slug: `spell-by-sound`
- Subject / topic: Literacy / spelling regular words by segmenting them into sounds — one sound box per sound, a digraph as one tile
- Age band: `8-9`
- Interaction pattern: `P11` — keypad entry (a small on-screen letter bank of 8 tiles ≥ 56 px; the answer is typed into sound boxes ON the picture card; physical keyboard letters also work)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P11 (letter-bank form; 3rd wrong → the answer builds itself and the child re-types it). Locale note: the word list, the segmentation into sound boxes, the digraph tiles and the distractor letters are language-bound (F-124: digraph inventories differ; F-24: transparent orthographies would use syllable tiles) and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15). The mechanic — picture, N sound boxes, an 8-tile bank, backspace, OK — is universal.

## Learning
- Objective: Looks at a picture of a regular word, and taps letter (or digraph) tiles from an 8-tile bank into the word's sound boxes, one sound per box, to spell the word conventionally.
- Prerequisites: Knows letter-sound correspondences (5-6 letter games); blends and segments simple words (6-8); reads the pictured objects' names without help (nothing is spoken — no audio files — so the picture must be unambiguous; each picture's intended word is fixed in the Art registry).
- Curriculum links: F-1 (spelling in 5 of 15 sources; phonics/CVC in 8), F-22 ("spelling by segmenting sounds then patterns" in 11 of 12 systems), F-31 row "Spell regular words by sounds" — conservative 8, earliest 6 → the catalogue bands this at 8-9 for the digraph/cluster stretch (US L.1.2.d-e / L.2.2.d "spell untaught words phonetically … generalize learned spelling patterns"; England Y1-2 "segment spoken words into phonemes and represent these by graphemes"; Germany Klasse 1-2 "lautgetreu schreiben"; France CP-CE1 "écrire des mots réguliers"; Netherlands groep 3-4 "klankzuivere woorden schrijven"; Spain 1º-2º "ortografía natural"; Brazil EF01LP-EF02LP "escrever palavras … segmentando"; Sweden åk 1-3 "ljudenlig stavning"; Denmark 1.-2. klasse "lydret stavning"; Finland grade 1-2 "kirjoittaa äänteitä vastaavat kirjaimet"; NO has no spelling aim by year 2 — F-22).
- Common misconceptions (F-127, F-123, F-124, F-121, F-125), each with this game's response:
  1. **Short-vowel confusion (pen/pin, cat/cot — F-123).** Response: on Check the wrong vowel lifts out of its box back to the bank (`ANIM.liftOut`) while every correct box keeps its letter and gains a small `ART.okDot`; the vowel box gets `ART.vowelMark` (a coral dot under it) and `ANIM.pulse` — "the middle sound is the one to fix". Every bank holds one confusable vowel on purpose.
  2. **Cluster omission ("fog" for frog, "had" for hand — F-124: the nasal/liquid in a cluster is dropped).** Response: the number of boxes is fixed by the word (4 for frog), so a three-letter attempt cannot be checked — OK stays disabled and the empty box `ANIM.pulse`s after 4 s of inactivity (an inactivity cue, never a clock); the box count itself is the segmentation.
  3. **Splitting a digraph ("s-h-i-p" as four sounds; F-124).** Response: a digraph is ONE tile in the bank ("sh") and fills ONE box; the bank also offers "s" and "h" singly as traps, so a child who uses "s" runs out of boxes before the "p" — on Check the "s" box lifts out and, on the second wrong Check, `ART.ghostLetter` shows "sh" faintly in that box: one box, one sound, two letters.
  4. **Phonetically valid but unconventional letter ("kat" — F-127: phonetic spelling is expected at this phase).** Response: not treated as a sound error: the "k" lifts out and `ART.ghostLetter` "c" appears at once (on the FIRST wrong Check) with `S("soundOk")` ("Right sound — other letter.") on the feedback line; the item still counts as retried.
  5. **Letter reversal b/d (F-121) and letter guessing from the picture's first letter (F-125).** Response: b and d are both in the bank for every b/d word; a wrong first letter lifts out like any other; the show-me on the third wrong Check builds the word letter by letter so the sequence is seen, then the child re-types it.

## How it plays
1. **Start screen**: title "Spell by Sound", the otter (`ART.otter`) at (360, 200), Start, picker.
2. **Item 1 (L1: cat)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the picture card (`ART.pictureCard`, 160 × 160) at (150, 158) holding `ART.cat` at 96 px; to its right the sound boxes — three `ART.soundBox` tiles (64 × 64, `makeTile`) at y = 158, x = 300 / 376 / 452 (pitch 76), empty; the otter at (640, 158) at 56 px. Zone B: the letter bank — eight `ART.key` tiles (72 × 72, `makeTile`) in two rows of four at y = 316 and 404, x = 216 / 312 / 408 / 504, each showing one letter (or digraph) at 32 px: for cat the bank is c, a, t, k, o, e, d, g in a shuffled layout. Zone C: the backspace tile (`ART.key` with `ART.backGlyph`) at (250, 512) and Check (`makeButton ok`) at (450, 512), disabled until every box holds a tile.
3. **Typing**: tap a bank tile → a copy glides (`ANIM.glide`) into the next empty box (left to right), `tone("tap", k)` (k = box index), and the bank tile greys to alpha 0.4 and disables (each tile is one physical letter). Backspace (or the physical Backspace key) returns the last placed tile to the bank (`ANIM.glide` back, tile re-enabled). A physical letter key places the matching unused bank tile if there is one; otherwise nothing. When all boxes are full, OK enables (`ANIM.pop` on OK).
4. **Check**: tap OK (or Enter).
   - **Correct**: every box turns to the solved look (`ART.soundBoxSolved` tokens), the letters slide 6 px together (`ANIM.join`) and the whole word appears under the picture (`ART.wordText`, "cat", 28 px); `tone("correct")`; praise pop (rotation); the otter `ANIM.clap`; rail dot fills; next item after 900 ms (`ANIM.rise` clears; new picture and boxes `ANIM.appear`).
   - **Wrong**: `tone("nudge")`; box by box from the left, 200 ms apart: a correct box keeps its letter and gains `ART.okDot` under it; a wrong box lifts its letter out (`ANIM.liftOut`) back to the bank (tile re-enabled) and gains `ART.boxRing` (`ANIM.pulse`); if the wrong box is the vowel box, `ART.vowelMark` appears under it; if the wrong letter is a phonetically valid swap (the item's `phoneticSwap`), `ART.ghostLetter` shows the conventional letter in that box at once and the feedback line shows `S("soundOk")`; otherwise the feedback line shows `t("almost")`. OK disables until the boxes are full again. Attempt 2.
   - **Second wrong Check**: the same box-by-box pass; the first wrong box additionally shows `ART.ghostLetter` (the correct tile at alpha 0.35 inside the box). Attempt 3.
   - **Third wrong Check**: the show-me — all boxes clear; the word builds itself tile by tile in the boxes (`ANIM.digitIn`, 400 ms apart, `tone("tap", k)`), holds 1500 ms, then clears; OK gains `ART.showRing` (`ANIM.showMe`); the child re-types it from the bank and taps OK; solved-with-help (no praise pop). A wrong re-type repeats the show-me (no limit).
5. **Items 2-12**: per Content/Rules. L1 three-sound words (3 boxes); L2 four-sound words with consonant clusters (4 boxes); L3 words with a digraph tile (sh, ch, th, ck, ng) and single-letter traps in the bank.
6. **Finish**: `t("all_done")` (360, 110); the otter (360, 200) `ANIM.celebrate`; the summary = the twelve spelled words as `ART.wordChip`s (100 × 36, the word at 18 px) in three rows of four (y = 320, 372, 424; x = 210 + i × 100), each with a filled `ART.dotFull` at its left for a first-Check word and a hollow `ART.dotEmpty` for a helped one — the finished word list (§10), not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 7 minutes.

## Art registry
```js
const ART = {
  otter:        { kind: "emoji", value: "🦦", size: 72 },   // Unicode 12 — no fallback needed
  pictureCard:  { kind: "shape", shape: "roundRect", w: 160, h: 160, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  soundBox:     { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 10 },      // empty: dashed [8,6]; filled: solid stroke, letter 32 px display ink
  soundBoxSolved:{ kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 10 },
  okDot:        { kind: "shape", shape: "circle", r: 5, fill: "structure" },        // under a box whose letter is right
  boxRing:      { kind: "shape", shape: "roundRect", w: 74, h: 74, stroke: "accent", strokeWidth: 4, radius: 12 },
  vowelMark:    { kind: "shape", shape: "circle", r: 6, fill: "accent" },            // under the vowel box
  ghostLetter:  { kind: "text",  value: "", size: 32, font: "display", color: "inkSoft" },   // drawn at alpha 0.35 inside a box
  wordText:     { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  key:          { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // letter 32 px display ink; digraph 28 px
  backGlyph:    { kind: "text",  value: "⌫", size: 30, font: "display", color: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  wordChip:     { kind: "shape", shape: "roundRect", w: 100, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  // word pictures — the comment is the ONE intended English word
  cat:   { kind: "emoji", value: "🐱", size: 96 },   // cat
  dog:   { kind: "emoji", value: "🐶", size: 96 },   // dog
  sun:   { kind: "emoji", value: "☀", size: 96 },    // sun
  pig:   { kind: "emoji", value: "🐷", size: 96 },   // pig
  bed:   { kind: "emoji", value: "🛏", size: 96 },   // bed
  bus:   { kind: "emoji", value: "🚌", size: 96 },   // bus
  fox:   { kind: "emoji", value: "🦊", size: 96 },   // fox
  hat:   { kind: "emoji", value: "🎩", size: 96 },   // hat
  box:   { kind: "emoji", value: "📦", size: 96 },   // box
  bug:   { kind: "emoji", value: "🐛", size: 96 },   // bug
  frog:  { kind: "emoji", value: "🐸", size: 96 },   // frog
  drum:  { kind: "emoji", value: "🥁", size: 96 },   // drum
  milk:  { kind: "emoji", value: "🥛", size: 96 },   // milk
  tent:  { kind: "emoji", value: "⛺", size: 96 },   // tent
  hand:  { kind: "emoji", value: "✋", size: 96 },   // hand
  flag:  { kind: "emoji", value: "🚩", size: 96 },   // flag
  crab:  { kind: "emoji", value: "🦀", size: 96 },   // crab
  ant:   { kind: "emoji", value: "🐜", size: 96 },   // ant
  fish:  { kind: "emoji", value: "🐟", size: 96 },   // fish
  ship:  { kind: "emoji", value: "🚢", size: 96 },   // ship
  bath:  { kind: "emoji", value: "🛁", size: 96 },   // bath
  duck:  { kind: "emoji", value: "🦆", size: 96 },   // duck
  sock:  { kind: "emoji", value: "🧦", size: 96 },   // sock (Unicode 10)
  lock:  { kind: "emoji", value: "🔒", size: 96 },   // lock
  chick: { kind: "emoji", value: "🐣", size: 96 },   // chick
  ring:  { kind: "emoji", value: "💍", size: 96 },   // ring
  dotEmpty: { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:  { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. Letters on tiles and in boxes are text drawn in `THEME.font.display` (Baloo 2: single-storey a and g, which is what the child is taught to write).

## Animation registry
```js
const ANIM = {
  glide:     { duration: 220, ease: "Sine.InOut", trigger: "a tile copy from the bank to the next box; back to the bank on backspace (x,y set at call)" },
  liftOut:   { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "a wrong letter leaves its box on Check (its bank tile re-enables)" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "boxRing on a wrong box; an empty box after 4 s of inactivity; vowelMark" },
  join:      { x: "-=6", duration: 200, ease: "Sine.Out", trigger: "each box letter shifts 6 px toward its left neighbour on a correct Check (the first box stays); the word reads as one" },
  digitIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a tile built into a box during the show-me (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "OK when it enables; picture card on a correct Check" },
  clap:      { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "otter on a correct Check" },
  rise:      { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "boxes, word and marks clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture, boxes and bank (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around OK while the show-me word is to be re-typed (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────┐                                                 │
      │   │picture │   ┊ c ┊  ┊ a ┊  ┊   ┊  ┊   ┊  ┊   ┊   (otter)  │  zone A
      │   │(150,158)│  x=300   376    452    528    604   (640,158)  │
      │   └────────┘   sound boxes y=158 (64×64, pitch 76)           │
      │      "cat" wordText (150,250) after a correct Check          │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ c ]   [ a ]   [ t ]   [ k ]     y=316               │
      │        [ o ]   [ e ]   [ d ]   [ g ]     y=404  (72×72)      │  zone B
      │        x=216    312     408     504                          │
480   ├──────────────────────────────────────────────────────────────┤
      │          [⌫] (250,512)         [   OK   ] (450,512)           │
      │               feedback line (360,470)                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Boxes are laid out from x = 300 with pitch 76 for N = 3, 4 or 5 boxes (the sixth position is never needed). The feedback line sits at (360, 470) above the zone C controls.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.pictureCard` at (150, 158) with the item's picture centred at 96 px; `ART.wordText` at (150, 250) after a correct Check.
- Sound boxes: `makeTile` 64 × 64 with `ART.soundBox` tokens at y = 158, x = 300 + i × 76; empty = dashed stroke; filled = solid stroke + the tile's letter (32 px, or 28 px for a digraph) `THEME.font.display` `THEME.colour.ink`; solved = `ART.soundBoxSolved` tokens. `ART.okDot` at (x, 200) under a correct box; `ART.vowelMark` at (x, 200) under the vowel box (replaces the okDot position for that box); `ART.boxRing` around a wrong box; `ART.ghostLetter` centred in a box at alpha 0.35.
- `ART.otter` at (640, 158) at 56 px on the play screen.
- Bank: eight `makeTile` 72 × 72 with `ART.key` tokens; a used tile at alpha 0.4 and disabled. Backspace `makeTile` 72 × 72 with `ART.backGlyph` at (250, 512); Check `makeButton` `ok` at (450, 512), alpha 0.5 while disabled; `ART.showRing` around it during the show-me.
- Feedback line at (360, 470), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors 72 ≥ 56; gaps 24 (bank), 12 (boxes). Keyboard: Tab order = bank tiles row-major, backspace, OK; physical letter keys, Backspace and Enter on `keydown`.

## Content
Language-bound: `LOCALE_DATA[lang].items`. `en` authored in full. **Other locales: a native list is required — en pilot.** Until a native list exists, `LOCALE_DATA[lang]` falls back to `en` for the items only; the chrome stays localised. (A native list for a transparent orthography — es/it/fi/pt — may use syllable tiles instead of letters, F-24; the box count then equals the syllable count. The engine treats a tile as one box either way.)

Notation per item: word — picture ART key — boxes (the tiles that fill them, in order; a digraph is one tile) — bank (exactly 8 tiles: the word's tiles plus distractors, shuffled at play) — vowel box index (1-based) — traps (which distractors enact which cue: `vowel` = the confusable vowel; `phonetic` = a phonetically valid swap that triggers the ghost at once; `split` = single letters of the digraph; `mirror` = b/d).

- **L1 — three sounds, three boxes**
  1. cat — `ART.cat` — c · a · t — bank c a t k o e d g — vowel 2 — traps: k phonetic(c); o, e vowel
  2. dog — `ART.dog` — d · o · g — bank d o g b a u t p — vowel 2 — traps: b mirror; a, u vowel
  3. sun — `ART.sun` — s · u · n — bank s u n z a o m t — vowel 2 — traps: z phonetic(s); a, o vowel
  4. pig — `ART.pig` — p · i · g — bank p i g b e a d k — vowel 2 — traps: b, d mirror; e, a vowel
  5. bed — `ART.bed` — b · e · d — bank b e d p i a t n — vowel 2 — traps: p mirror(b); i, a vowel
  6. bus — `ART.bus` — b · u · s — bank b u s d a o z t — vowel 2 — traps: d mirror; a, o vowel; z phonetic(s)
  7. fox — `ART.fox` — f · o · x — bank f o x v a u k s — vowel 2 — traps: v phonetic(f); a, u vowel; k, s split-of-x (two letters for one sound)
  8. hat — `ART.hat` — h · a · t — bank h a t n e o d k — vowel 2 — traps: e, o vowel
  9. box — `ART.box` — b · o · x — bank b o x p a u d s — vowel 2 — traps: p, d mirror; a, u vowel
  10. bug — `ART.bug` — b · u · g — bank b u g d a o k p — vowel 2 — traps: d, p mirror; a, o vowel
- **L2 — four sounds with a consonant cluster, four boxes (ant: three)**
  11. frog — `ART.frog` — f · r · o · g — bank f r o g v a u k — vowel 3 — traps: v phonetic(f); a, u vowel
  12. drum — `ART.drum` — d · r · u · m — bank d r u m b o a n — vowel 3 — traps: b mirror; o, a vowel; n near(m)
  13. milk — `ART.milk` — m · i · l · k — bank m i l k n e a c — vowel 2 — traps: n near(m); e, a vowel; c phonetic(k)
  14. tent — `ART.tent` — t · e · n · t — bank t e n t d i a m — vowel 2 — traps: i, a vowel; d near(t); m near(n) (two t tiles in the bank)
  15. hand — `ART.hand` — h · a · n · d — bank h a n d b o e m — vowel 2 — traps: b mirror(d); o, e vowel; m near(n)
  16. flag — `ART.flag` — f · l · a · g — bank f l a g v o e k — vowel 3 — traps: v phonetic(f); o, e vowel
  17. crab — `ART.crab` — c · r · a · b — bank c r a b k o e d — vowel 3 — traps: k phonetic(c); o, e vowel; d mirror(b)
  18. ant — `ART.ant` — a · n · t — bank a n t e o m d p — vowel 1 — traps: e, o vowel; m near(n); d near(t)
- **L3 — a digraph tile fills one box; its single letters are traps**
  19. fish — `ART.fish` — f · i · sh — bank f i sh s h e a v — vowel 2 — traps: s, h split; e, a vowel; v phonetic(f)
  20. ship — `ART.ship` — sh · i · p — bank sh i p s h e b ch — vowel 2 — traps: s, h split; e vowel; b mirror(p); ch near(sh)
  21. bath — `ART.bath` — b · a · th — bank b a th t h o d e — vowel 2 — traps: t, h split; o, e vowel; d mirror(b)
  22. duck — `ART.duck` — d · u · ck — bank d u ck c k o b a — vowel 2 — traps: c, k split; o, a vowel; b mirror(d)
  23. sock — `ART.sock` — s · o · ck — bank s o ck c k a z u — vowel 2 — traps: c, k split; a, u vowel; z phonetic(s)
  24. lock — `ART.lock` — l · o · ck — bank l o ck c k a i r — vowel 2 — traps: c, k split; a, i vowel; r near(l)
  25. chick — `ART.chick` — ch · i · ck — bank ch i ck c h k e a — vowel 2 — traps: c, h, k split; e, a vowel
  26. ring — `ART.ring` — r · i · ng — bank r i ng n g e a w — vowel 2 — traps: n, g split; e, a vowel; w near(r)

Play list of 12 per Rules (shuffle within level, levels in order); no word repeats; the bank layout is shuffled per item; a word missed on its first Check re-enters after 1 intervening item, then after 3 if missed again, then no more (F-41), replacing the last unplayed items of the same level so the count stays 12.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong first Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the word without changing the level.
- What happens on a correct answer: boxes turn solved, letters `ANIM.join`, the word appears under the picture, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-Check items only), otter `ANIM.clap`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and the box-by-box pass: correct boxes keep their letters with an okDot, wrong boxes lift their letters back to the bank with a coral ring):
  - Vowel confusion (the vowel box is wrong): `ART.vowelMark` under the vowel box, pulsing; `t("almost")` on the feedback line.
  - Phonetically valid swap (k for c, z for s, v for f, c for k): `ART.ghostLetter` with the conventional letter appears in that box at once; `S("soundOk")` on the feedback line.
  - Digraph split (s in the sh box; c or k in the ck box): the box lifts its letter; on the second wrong Check the ghost shows the digraph tile ("sh") in that box.
  - Mirror letter (d for b): the box lifts its letter; ghost on the second wrong Check.
  - Any other wrong letter: lift + ring; `t("almost")`.
  - Fewer tiles than boxes: OK stays disabled; the first empty box pulses after 4 s of inactivity (not an attempt).
- Retry behaviour: attempt 1 → attempt 2 with the correct boxes kept and the wrong ones emptied → attempt 3 with the first wrong box's ghost letter → the show-me (the word builds itself in the boxes, holds, clears; the child re-types it with OK ringed); solved-with-help; the word re-queues after 1 item, then after 3, then no more. No attempt 4.
- Finish condition: 12 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("almost")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`): `title` = "Spell by Sound"; `soundOk` = "Right sound — other letter.". The 26 words, their tiles and banks are `LOCALE_DATA.en.items` (Content), never STRINGS.

## Sound
`tone("tap", k)` when a tile lands in box k (pitch climbs left to right — the word is heard as a rising run of one note per sound, F-213); `tone("tap")` on backspace; `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("tap", k)` per tile during the show-me; `tone("finish")` once. Silent under `?sound=off`. No word or sound is ever spoken (no audio files); the picture is the prompt.

## Testing checklist
- [ ] Works in all 11 languages (OK, Question x of y, Almost, All done, Play again, Menu and praise change with the picker; the English word list is the pilot content under every `?lang=` until native lists are added; no raw key names appear).
- [ ] Works at narrow width (400-px iframe: the picture card, five boxes, the eight-tile bank, backspace and OK are visible and separate).
- [ ] Keyboard operable (physical letters place matching bank tiles, Backspace removes the last, Enter checks; Tab walks the bank, backspace and OK).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the word builds itself on the third miss and re-typing it completes the item).
- [ ] The bank always holds exactly eight tiles, each at least 72 px, and a tile greys out once it is in a box.
- [ ] "cat": placing k, a, t and checking lifts the k out, shows a faint c in the first box straight away and reads "Right sound — other letter."
- [ ] "cat": placing c, o, t and checking keeps c and t with dots under them, lifts the o out and puts a coral dot under the middle box.
- [ ] "frog": OK stays dimmed with three tiles placed; the fourth box pulses after a few seconds of no input.
- [ ] "ship": the bank offers "sh" as one tile as well as s and h; placing s, h, i leaves no box for p, and checking s-h-i lifts s and h out; on a second miss a faint "sh" shows in the first box.
- [ ] A correct Check turns the boxes teal, slides the letters together and prints the word under the picture.
- [ ] A word missed on its first Check comes back after one other word and, if missed again, after three more.
- [ ] The finish screen lists the twelve words with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each box from left to right plays a higher note.
