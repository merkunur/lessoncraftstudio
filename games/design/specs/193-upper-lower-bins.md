# 193 — Upper or Lower

## Identity
- Slug: `upper-lower-bins`
- Subject / topic: Literacy / letter forms — telling a capital (uppercase) letter from a small (lowercase) letter and sorting a stream of single letters into the capital bin or the small bin
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the letter, then tap a bin; one letter at a time)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (2 bins for 5-6, one item at a time; a wrong bin refuses gently and the bin's rule icon pulses; 3rd wrong → the correct bin pulses). Locale note: the letter SET is language-bound only at the edges (extra letters per locale, F-122) and is stored in `LOCALE_DATA`; the capital / small distinction is universal across all eleven Latin-script languages (F-217). Nothing is spoken and no letter is named; the child sorts by FORM. Sibling of game 007 (pair A with a) and game 006 (find the same letter); here the child decides WHICH CASE a single letter is.

## Learning
- Objective: Sorts single letters one at a time into the bin headed by a capital letter or the bin headed by a small letter, according to whether the letter shown is a capital or a small form.
- Prerequisites: Recognises letters as distinct shapes (game 006). No letter names or sounds; no reading.
- Curriculum links: F-1 (letter recognition in 9 of 15 sources), F-22 (letter names and forms taught explicitly at 5-7 in all twelve systems; "capital to start a sentence" by 8), F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d "recognize and name all upper- and lowercase letters"; England Reception/Y1 "capital letters"; Germany Klasse 1 "Groß- und Kleinbuchstaben"; France GS "capitales et script"; Spain Infantil "mayúscula / minúscula"; Brazil EF01LP04; Netherlands groep 2-3 "hoofdletters"; Sweden förskoleklass "stora och små bokstäver"; Denmark 0. klasse; Norway 1. trinn "store og små bokstaver"; Finland esiopetus "isot ja pienet kirjaimet").
- Common misconceptions (F-121, F-102), each with this game's response:
  1. **Upper and lowercase not linked — the child does not know that the tall "R" and the small "r" are two forms of one letter, and so sorts by "does it look like the bin's picture" (letter identity) instead of by case.** Response: a wrong bin makes the letter MORPH on its tile into its other form and back (`ANIM.morph`: "R" fades out while "r" fades in on the same tile, 500 ms each way), showing that the same letter has a capital form and a small form; the correct bin's head letter `ANIM.pulse`s at the same time. L1 uses letters whose two forms look different (A a, B b, D d, E e, G g, R r), so the size cue and the shape cue agree.
  2. **Sorting look-alike pairs by shape alone (C c, O o, S s, X x, Z z, V v, W w, P p, K k, U u — the small form is the same shape, only shorter).** Response: L2 uses exactly these letters, and the wrong-bin cue adds the height guide: two thin lines (`ART.capLine` at the capital's top, `ART.xLine` at the small letter's top) drawn across the tile for 1200 ms so the child sees that "c" stops at the lower line and "C" reaches the upper one; both bin heads show the same two lines permanently at L2 and L3.
  3. **Tall small letters taken for capitals (b, d, f, h, k, l, t reach the top line) and a small "l" taken for a capital "I".** Response: L3 mixes tall small letters with capitals; the height guide alone cannot decide these, so the morph cue plays (b morphs to B — the shapes differ) and the bins' head letters at L3 are drawn as pairs on each bin (`ART.binPair`: "A a" on the capital bin with the capital ringed, "A a" on the small bin with the small letter ringed) so the child compares the tile to BOTH forms.
  4. **Mirror confusions (b/d, p/q) — F-121.** Response: not this game's objective; b and d are both small letters and both go in the small bin, so a mirror slip never produces a wrong bin. A tile is never a lone "I" / "l" pair at L1-L2 (they enter only at L3 with the morph cue).
  5. **Sorting by bin position (always the left bin).** Response: the bins' sides are shuffled at every level change, the correct bin never sits on the same side more than 3 items running, and both bin counts rise visibly.

## How it plays
1. **Start screen**: title "Upper or Lower", the koala (`ART.koala`) at (360, 200), Start, picker.
2. **Item 1 (L1; first letter "R")**: rail of 10 dots (§6). Zone A: a conveyor strip (`ART.belt`) across y = 170 with the koala at (80, 170); the first letter tile slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 (`ART.letterTile` tokens) showing "R" at 72 px. Zone B: two bins (`ART.bin`, 200 × 130) at (220, 390) and (500, 390); on one bin's front a big capital "A" (`ART.binUpper`, 64 px) with a tall marker beside it (`ART.tallMark`, a 56 px vertical bar), on the other a small "a" (`ART.binLower`, 64 px, drawn on the same baseline so it visibly stops lower) with a short marker (`ART.shortMark`, a 32 px bar); each bin has a count (`ART.binCount`, "0") in its corner. No caption — the two bin heads are the whole prompt.
3. **Sorting**: tap the letter (it lifts: `ANIM.lift`, `tone("tap")`), then tap a bin. The letter glides (`ANIM.glide`) into the bin.
   - **Correct bin (capital)**: the bin `ANIM.pop`, its count goes 0 → 1, `tone("correct")`; every third correct sort plays a praise pop (rotation); the rail dot fills; the next letter slides in after 400 ms.
   - **Wrong bin (small)**: the letter glides back to the centre, `tone("nudge")`; on the tile the letter morphs into its other form and back (`ANIM.morph`: "R" → "r" → "R") while the correct bin's head letter `ANIM.pulse`s; at L2 and L3 the height guide (`ART.capLine`, `ART.xLine`) is drawn across the tile for the same 1200 ms. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains `ART.showRing` with `ANIM.showMe` (show-me); placing the letter there completes the item as solved-with-help.
   - **Tapping a bin with nothing selected**: the bin's head letter `ANIM.pop`s (a harmless preview); nothing else.
4. **Level changes**: when the level changes (Rules), the bins `ANIM.binOut` (drop and fade) and two new bins `ANIM.appear` with sides shuffled; at L2 the bins gain the permanent height lines; at L3 the bin heads become pairs (`ART.binPair`) with the relevant form ringed (`ART.formRing`); the counts restart at 0; `tone("tap", 4)`.
5. **Items 2-10**: per Content/Rules. L1 dissimilar-form letters; L2 look-alike pairs (the height cue decides); L3 tall small letters, I / l, and locale extras.
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = the two bins at y = 400 (x = 220 / 500) with their final counts and, above each, its letters in a row (`ART.miniLetter`, 26 px, 30 px pitch) — the sorted capitals and smalls; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  koala:      { kind: "emoji", value: "🐨", size: 80 },
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  letterTile: { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },   // letter 72 px display ink
  bin:        { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  binUpper:   { kind: "text",  value: "A", size: 64, font: "display", color: "ink" },
  binLower:   { kind: "text",  value: "a", size: 64, font: "display", color: "ink" },
  binPair:    { kind: "text",  value: "A a", size: 48, font: "display", color: "ink" },      // L3 bin heads; the relevant form ringed by formRing
  tallMark:   { kind: "shape", shape: "rect", w: 8, h: 56, fill: "structure" },              // beside the capital bin head
  shortMark:  { kind: "shape", shape: "rect", w: 8, h: 32, fill: "structure" },              // beside the small bin head, same baseline
  capLine:    { kind: "shape", shape: "line", w: 100, stroke: "accent", strokeWidth: 3 },    // the capital-height line across a tile or bin head
  xLine:      { kind: "shape", shape: "line", w: 100, stroke: "structure", strokeWidth: 3 }, // the small-letter-height line (dashed [6,4])
  formRing:   { kind: "shape", shape: "circle", r: 26, stroke: "accent", strokeWidth: 3 },
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  miniLetter: { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The only emoji is the mascot; the content is letters. The bins differ by their head glyph (A vs a), by the tall / short marker bars AND by position — never by colour alone.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new letter tile from x = 760 to the centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "letter selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "letter to a bin / back to the centre (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct letter; bin head preview tap" },
  morph:     { alpha: 0, duration: 250, ease: "Sine.InOut", yoyo: true, hold: 500, trigger: "the tile's letter fades out while its other-case form fades in on the same tile, holds 500 ms, then fades back (two tweens started together)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's head letter after a wrong bin" },
  guideIn:   { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "capLine + xLine across the tile at L2/L3 (from alpha 0)" },
  binOut:    { y: "+=40", alpha: 0, duration: 300, ease: "Sine.In", trigger: "old bins when the level changes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new bins (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ koala(80,170) ═══════════ belt y=170 ═══════════  letter in→ │  zone A
      │                        [   R   ] (360,170) 120×120            │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌──────────────┐              ┌──────────────┐           │
      │      │  A  ▌      0 │              │  a  ▖      0 │  bins     │  zone B
      │      │  (220,390)   │              │  (500,390)   │  200×130  │
      │      └──────────────┘              └──────────────┘           │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. ▌ / ▖ stand for `ART.tallMark` / `ART.shortMark`.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22, y = 28) → `ART.dotFull`.
- `ART.koala` (80, 170); `ART.belt` centred (390, 170).
- The item tile: `makeTile` 120 × 120 at (360, 170) with `ART.letterTile` tokens; the letter at 72 px `THEME.font.display` `THEME.colour.ink`, drawn on a common baseline (text origin (0.5, 1) at tile y + 30) so capitals and small letters sit on the same line and the height difference is real; selected look = library selected + `ANIM.lift`. During a cue: `ART.capLine` at tile y − 24 and `ART.xLine` at tile y + 2 across the tile (alpha 0 → 1 → 0).
- Bins: `makeTile` 200 × 130 (`ART.bin` tokens); head letter (`ART.binUpper` / `ART.binLower`) at (−30, 0) on a common baseline (y + 20); `ART.tallMark` / `ART.shortMark` at (+20, baseline − h/2) beside the head; `ART.binCount` at (+78, −44). From L2 both bins also carry `ART.capLine` (at head baseline − 46) and `ART.xLine` (at head baseline − 24) across their front. At L3 the heads become `ART.binPair` centred at (−10, 0) with `ART.formRing` around the capital on the capital bin and around the small letter on the small bin.
- `ART.showRing` around the correct bin. Tap floors: tile 120, bins 200 × 130 (≥ 80); gap between bins 80.
- Letters render in `THEME.font.display` (Baloo 2): single-storey a and g, a hooked l — the guide lines are set for that face.
- Tab order: the letter tile, then the left bin, then the right bin.

## Content
Letter pools are shared by all eleven Latin-script locales; each locale ADDS its extra letters to the L3 pool via `LOCALE_DATA[lang].extras` (de Ä/ä Ö/ö Ü/ü; fr É/é Ç/ç; es Ñ/ñ; pt Ã/ã Ç/ç; it È/è; nl none; sv Å/å Ä/ä Ö/ö; da and no Æ/æ Ø/ø Å/å; fi Ä/ä Ö/ö) and removes nothing. Content is otherwise language-neutral (single letters, no words).

Each item = one letter form; the correct bin is the capital bin for an uppercase form and the small bin for a lowercase form.
- **L1 — dissimilar-form letters** (the size cue and the shape cue agree): A · a · B · b · D · d · E · e · G · g · R · r · Q · q · H · h · N · n · M · m · T · t
- **L2 — look-alike pairs** (only height decides; the guide lines are on the bins): C · c · O · o · S · s · X · x · Z · z · V · v · W · w · P · p · K · k · U · u · J · j · Y · y
- **L3 — tall small letters, I / l, and locale extras**: b · d · f · h · k · l · t · I · L · F · H · K · B · D · i · j · plus the locale's `extras` in both cases (e.g. Ä · ä · Ö · ö for de)

Stream rule: at each item the game draws a letter from the current level's pool with the case chosen at random, at most 2 of the same case in a row and each case used at least 4 times per 10 items when one level lasts the whole session; a letter form is never repeated in a session; the two forms of one letter (R and r) may both appear but never back-to-back.

Play list: 10 items; start at L1; the level changes per Rules (the bins swap in with new decoration and shuffled sides); the correct bin's side never repeats more than 3 items running.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3) and a bin refresh (`ANIM.binOut` / `ANIM.appear`). Three, not two: sorts are quick (~10 s).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1) with a bin refresh.
- What happens on a correct answer: letter glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next letter after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong bin by letter identity (sorted "R" as small because it does not look like "A"): letter returns, `tone("nudge")`, the tile's letter `ANIM.morph`s into its other form and back while the correct bin's head `ANIM.pulse`s.
  - Wrong bin on a look-alike pair (c into the capital bin): the same morph cue plus `ART.capLine` / `ART.xLine` across the tile for 1200 ms (`ANIM.guideIn`) — the letter stops at the lower line.
  - Wrong bin on a tall small letter (l or b into the capital bin) or on I / l: the morph cue (b → B, l → L) shows that the forms differ; the bin pairs at L3 stay visible for comparison.
  - Bin tapped with nothing selected: head `ANIM.pop`; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Upper or Lower". No words on the play screen; the letters and counts are content.

## Sound
`tone("tap")` on selecting a letter; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 4)` when the bins refresh; `tone("finish")` once. Silent under `?sound=off`. Letters are NOT named or sounded — there are no audio files and the task is visual.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=sv` can stream Å / å / Ä / ä / Ö / ö at the third level; `?lang=nl` adds nothing).
- [ ] Works at narrow width (400-px iframe: belt, letter tile and both bins visible and separate).
- [ ] Keyboard operable (Tab: letter, left bin, right bin; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the ring always leads to completion).
- [ ] No sentence or word appears on the play screen; the bins are headed by "A" with a tall bar and "a" with a short bar.
- [ ] "R" tapped then the capital bin makes the bin pop and its count go to 1; "R" into the small bin returns it and the tile's letter fades into "r" and back while the capital bin's "A" pulses.
- [ ] At the second level a "c" put into the capital bin shows two lines across the tile, and the "c" stops at the lower line.
- [ ] At the third level each bin shows "A a" with a ring around its own form; "l" into the capital bin fades into "L" and back.
- [ ] A bin tapped with nothing selected only pops its head letter.
- [ ] The same letter form never appears twice in a session; "R" and "r" never follow each other; the correct bin is not on the same side more than three times running.
- [ ] Three first-try sorts in a row refresh the bins with the height lines; a wrong bin brings the easier pool back next.
- [ ] The finish screen shows the two bins with their sorted letters above them and no score.
- [ ] With `?sound=off` nothing is audible.
