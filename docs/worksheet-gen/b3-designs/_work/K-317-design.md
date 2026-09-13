# K-317 `letter-of-the-week` (K) — page design (Designer A composition + Designer B child-fit)

Band K · themed (`themeAxis.applicable:true, minNouns:12, excludeBw:true`) · NATIVE-PER-LOCALE content like K-221: the target letter and the hit set are derived from the LOCALE's words, so the same seed gives the same theme + zone geometry in all 11 locales but a different letter/picture set. Verified via `data-lcs-*` stamps; the word is never printed on the hunt zone.

## 1 Page concept (base)

One letter owns the page. Top-left a cream card shows the letter pair big (`Aa`); to its right the child traces the capital and the small letter on school lines (solid model, dashed copies, one empty slot). Below, a hunt: 8 theme pictures on cream cards, no words; the child circles the ones whose name has the letter. Then two of those words come back as full-width trace lanes (the word tracing feel of K-284). Last, three small picture cards with one dashed box per letter: the child writes the letter of the week in the box where it belongs (start, middle or end). Four numbered coral zone tags (1-4) match the four verbs of the instruction, so a non-reader can follow the page by number. Delight = the child's own letter appears in pictures, in a word, in a slot: "my letter is everywhere".

## 2 Layout (d2, inside 703×760; content column 660 centred like K-284 `laneW` math)

```
+------------+ +----------------------------------------------+
| (1)  Aa    | | A  A  A  A  [ ]   capital lane 496x74        |  zone A  h150
| card 150   | | a  a  a  a  [ ]   small   lane 496x74        |
+------------+ +----------------------------------------------+
        gap 14
+------(2)-----+ +--------------+ +--------------+ +--------------+
|  [pic 92]    | |  [pic 92]    | |  [pic 92]    | |  [pic 92]    |  hunt 4x2
|  156x124     | |              | |              | |              |  h 2x124+12 = 260
+--------------+ +--------------+ +--------------+ +--------------+
+--------------+ +--------------+ +--------------+ +--------------+
|  [pic 92]    | |  [pic 92]    | |  [pic 92]    | |  [pic 92]    |
+--------------+ +--------------+ +--------------+ +--------------+
        gap 14
+-----+ +-----------------------------------------------------+
|(3)72| | solid model word     (trio 574x46)                   |  write row h94
| pic | | dashed trace word    (trio 574x46)                   |
+-----+ +-----------------------------------------------------+   gap 8, second row
        gap 14
+---(4) 212x100---+ +------ 212x100 ----+ +----- 212x100 -----+
| [pic 48]        | | [pic 48]          | | [pic 48]          |  position cards
| [_][_][_][_]    | | [_][_][_][_][_]   | | [_][_][_]         |  boxes 28, gap 4
+-----------------+ +-------------------+ +-------------------+
```
Total 150+14+260+14+196+14+100 = 748 ≤ 760. Zone tags are `position:absolute` at each zone's top-left (-8,-8), no extra height.

- Zone A: `letterCard` 150×150 (NEW, §5) + two `strokeLetterLane` 496×74, `glyphH:52` (effective ≈ 50 after `textLaneGeometry` clamps span 95 units into h-6; engineer must measure), `reps:5, emptyLast:true`, second lane `lowercase:true`. Segment 99 px, glyph ≤ 76 px: fits. Stroke badges are off (glyphH < 80), start dot + arrow on rep 1: correct for K.
- Zone B: `huntCard` 156×124, icon 92 (K floor 56 ok), rotation ±4°, gap 12. 8 items = K ceiling. Circle margin ≥ 16 px around the icon.
- Zone C: 2 rows; thumb card 72×72 (icon 60) + `strokeWordLane({w:574, h:46, glyphH:34, reps:2, stack:true, emptyLast:false, padLeft:10})`. Long words shrink inside the lane (built-in `maxW`). K whole-word floor is 40 per brief; 34 is a tracing-of-a-known-word lane, same as K-284 d3 (40) minus 6. Prefer `glyphH:38, h:50` if the engineer can drop hunt cards to 116 tall (measure).
- Zone D: 3 `positionCard` 212×100: icon 48 top, `letterBoxes({n, box:28, gap:4})` below (6 letters = 188 ≤ 196 inner). Words > 6 letters are not eligible for zone D at d2.

d1 (700 px): zone A same; hunt 6 cards 3×2, 212×150, icon 110; write 1 row `glyphH:40, h:52`; position 2 cards 323×100, words ≤ 5 letters, boxes 32.
d3 (758 px): zone A letterCard 110×110 and lanes 2×54 (`glyphH:38`); hunt 8 cards 156×116, icon 84, gap 12; write 2 rows `modelless:true, emptyLast:true` (dashed + empty = "trace once, write once"), 3 trios × 42 = 130 per row; position 3 cards, words ≤ 7 letters, box 26.

## 3 Difficulty ladder

| | d1 | d2 (ships) | d3 |
|---|---|---|---|
| target | one letter from `eligible` (§4), first letter of a word only counts | letter anywhere | letter anywhere, and distractors prefer look-alike letters (b/d, m/n, p/q via a small per-locale `confusable` table) when available |
| hunt | 6 cards, 3 hits + 3 non-hits | 8 cards, 4 hits + 4 non-hits | 8 cards, 4 + 4, two non-hits confusable |
| write | 1 word ≤ 5 letters, model + trace | 2 words ≤ 9 letters, model + trace | 2 words 5-11 letters, modelless trace + empty trio |
| position | 2 cards ≤ 5 letters, start or end only | 3 cards ≤ 6 letters, any position | 3 cards ≤ 7 letters, at least one middle when the pool has it |
| trace reps | 5 (4 + empty) glyphH 52 | 5, glyphH 52 | 5, glyphH 38 |

Config keys: `{hunt:{n, hits}, write:{rows, minLetters, maxLetters, glyphH, laneH, modelless}, pos:{cards, maxLetters, box}, trace:{reps, glyphH, laneH, cardPx}, scope:'initial'|'anywhere', confusable:false|true}`. The guard for `scope` keys on the config, never on the level index.

## 4 Answer hiding + uniqueness

Root `<div data-ws-content data-lcs-target="a" data-lcs-target-upper="A" data-lcs-fold="0|1" data-lcs-scope="anywhere">`. `fold` = per-locale flag (fr/es/pt/it/nl fold accents: école has e; de/sv/da/no/fi never: ä ≠ a). Match rule (build and verify share it): `norm(w) = displayWord(w).toLocaleLowerCase(loc)`, optionally NFD-stripped when fold=1; hit = `norm(w).includes(target)` (`scope:'initial'`: `startsWith`).

- `huntCard`: `data-lcs-hunt-card data-lcs-word="Katze" data-lcs-vocab="cat" data-lcs-hit="1|0"`. No caption, no alt text with the word. verify: 8 cards, 4 with hit=1, re-derives hit from word, all vocab keys distinct, every img `complete && naturalWidth>0`, hit words never carry the target only inside a folded accent when fold=0.
- Write lanes: K-284 stamps (`data-lcs-prim="trace-word"`, `data-lcs-text`, `data-lcs-letters`, `data-lcs-reps`); verify additionally requires `norm(text)` to be a hit and the word to be in the hunt hit set (the child traces a word they just found).
- `positionCard`: `data-lcs-pos-card data-lcs-word data-lcs-vocab data-lcs-index="k"`; boxes come from `letterBoxes` (`data-lcs-letterboxes=n`). verify: `n === [...word].length`, the target occurs EXACTLY ONCE in `norm(word)` (uniqueness; "banana" for `a` is a hunt hit but never a position word), stamped index equals the occurrence, and the card's `.ws-icon` carries no text. Boxes are empty; the letter is not drawn.
- Eligible letters (build): for the theme + locale, letters of `letter-knowledge.json alphabets[loc]` with ≥ `hits` single-occurrence words ≤ `maxLetters` AND ≥ `n-hits` non-hits. `rng.pick(eligible)` unless `cfg.letter` pins one (the per-letter SEO tail wants pinning; UNKNOWN whether the wave can fan a letter axis, the emitter decides). No eligible letter = throw (theme refused, never a filler).

## 5 Primitives and components

Reused (exact names): `strokeLetterLane({text,w,h,glyphH,reps,emptyLast,lowercase})` and `strokeWordLane({text,w,h,glyphH,reps,stack,modelless,emptyLast,padLeft,align})` from `primitives/trace-path.js`; `letterBoxes({n,box,gap})`, `countBadge`, `sceneStage({theme,nouns,w,h,rng,heroIndex,repeats})` from `templates/components-b2.js`; `answerBox({w,h,answer})` from `templates/components.js`; `entriesFor, displayWord, traceable, distinctByWord, fileUri` from `lib/b2-common.js`; `LETTER_SETS/LOWERCASE_SETS` (`data/tracing/letter-sets.js`), `alphabets` (`data/literacy/letter-knowledge.json`), `approved-words-<loc>.json chunks` for graphemes.

NEW in `templates/components-b3.js`:
- `zoneTag(n)`: SVG 28×28, circle r 13 fill `coral`, numeral Baloo 2 15 px 700 `white`, `data-lcs-zone=n`; wrapper `position:absolute;left:-8px;top:-8px`.
- `letterCard({upper, lower, w, h})`: `.ws-card` w×h (150×150 d2), centred `strokeLetterLane({text: upper+lower, w:w-16, h:110, glyphH:64, reps:1})` (rep 0 = solid teal model, no guides) plus a 2 px `creamDeep` rule under it; stamps `data-lcs-letter-card`. Left-handers: the model also lives as rep 0 of every lane, so covering the card costs nothing.
- `huntCard({src, vocabKey, word, hit, w, h, iconPx, rot})`: `.ws-card` (cream, `#F0E4CB` border, radius 14) with the img centred; NO badge, NO caption. Stamps §4.
- `positionCard({src, word, vocabKey, index, w, h, iconPx, box, gap})`: `.ws-card`, img top, `letterBoxes` centred below. Stamps §4.
- `letterBoxesFilled({n, box, gap, filled:[{index, char}]})` (face e): `letterBoxes` plus a Baloo 2 700 `teal` glyph at `box*0.72` px centred in the filled cell, `data-lcs-filled="index"`.
- `positionKey({labels:[s,m,e]})` (face b): three groups of 3 tiny `roundedRect` 14×14 r 3 `white` stroke `grid` 1.5 with the 1st/2nd/3rd cell filled `tealSoft`; optional 13 px Nunito 800 `inkSoft` label under each; total 660×40; `aria-hidden`.

## 6 Locale slot structure

- Text on the page: title + instruction (`i18n/strings.<loc>.json`, keyed K-317) only. Zone tags are numerals. Zone labels are NOT rendered in the base (K non-readers); faces (b) and (d) render the three position words / grapheme display literal from `data/b3/letter-week.js` (generated from `i18n/.draft-b3-<loc>.json` like `data/b2/*`).
- Per-locale data bank `data/b3/letter-week.js`: `{fold:boolean, confusable:{b:['d'],…}, positionLabels:[..3 strings ≤ 14 chars], graphemes:[{key:'sch', display:'Sch', kind:'digraph'}], excludeLetters:[]}` (it drops j k w x y; pt may pin K W Y out of the K pool; fi panel may exclude å).
- Vocab forms: singular only through `displayWord` (de keeps the capital; hunt compares lowercased). No article, no plural, no agreement anywhere, so es/pt/it/fr agreement traps do not arise.
- Long words: lanes shrink (`maxW`), hunt cards carry no text, position cards are length-capped by config; fi/de/pt survive by data selection not by layout. Instruction ≤ 150 chars: de will run ~130, fine at 17 px on two lines (see K-284 render).
- Overrides expected: fi (no articles, "kirjain" head collides with capitalisation, panel chooses `viikon kirjain`); de (title must be `Buchstabe der Woche` is NOT a genre; panel re-targets to `Buchstabeneinführung: Buchstabe M` per §1 findings); sv/da/no definite forms are never generated (singular citation only).

## 7 Five variation faces (hub contract: `apps.letter-of-the-week` + `axes['exercise-type'].letter-of-the-week` slug+name ×11; exactly one landing per face per locale, `verify-hub-type-rows.js` expects 6 rows)

(a) K-3xx **Initial-sound scene hunt** (CODE face, `scope:'initial'`, `zones:['scene']`): zone A shrinks to letterCard 110 + one capital lane; the hunt becomes a `sceneStage` 660×300 (8 nouns, 3 starting with the letter, `repeats:0`, hero = a hit); child circles every thing whose name STARTS with the letter, then writes the count in an `answerBox({w:88,h:64})`. Zones C/D dropped; a single write row of the hero word (model + trace). Stamps `data-lcs-scene` objects' `data-lcs-noun`; verify counts hits = stamped `data-lcs-answer`. Risk: overlap hides a hit → require the 3 hits in the `front`/`mid` bands (add `heroIndex` + a `bandFor` hint, UNKNOWN whether sceneStage exposes it; else refuse placement). Distinct from K-221/K-228 (write/sort) by the scene + count verb. Owns the fi `kirjainjahti` / nl `beginklank` head.

(b) K-3xx **Start, middle or end** (CODE face, `zones:['key','pos']`, de `Anlaut Inlaut Auslaut`): `positionKey` row (40 px) then 6 `positionCard` 323×150 (icon 72, box 34, gap 5, ≤ 8 letters) in 2×3; 2 start, 2 middle, 2 end when the pool allows, else refuse the face for that locale. Hunt/write dropped; zone A stays as the letterCard + one lane pair. Verify = §4 position rule ×6. Requires ≥ 6 single-occurrence words with the letter in ≥ 2 positions: check per locale pool; en/de/fi rich, `farm animals` weak everywhere.

(c) K-3xx **Capital and small: trace the letter** (PARAM + one knob `trace.big:true`): zone A becomes three lane pairs at descending size: `glyphH:96` (badges ON, stroke order numbered) 660×130 capital and lowercase, then `glyphH:60` pair, then `glyphH:44` pair with `emptyLast`; below, one `strokeWordLane` row (model + trace + empty) of a 3-5 letter hit word. Hunt and position dropped. Risk: duplicates `letter-tracing` (K-238) and `lowercase-letter-tracing` (K-278) families, which page the whole alphabet; this face is ONE letter, both cases, plus its picture word. State that in the landing.

(d) K-3xx **Digraph of the week** (CODE face, `target` = a grapheme from `graphemes[loc]`): hit test reads `approved-words-<loc>.json chunks` (flattened) for the grapheme as ONE chunk, never a substring (nl `ij`, de `sch`, es `ll`, pt `nh`, fr `ou`). Zone A: `strokeWordLane({text:'sch', w:496, h:74, glyphH:52, reps:4, emptyLast:true})` capital + lower forms (`Sch`, `sch`); `letterCard` shows `Sch`. Position cards use `letterBoxes` with the grapheme occupying ONE wider box (box width `28 * chars + 4*(chars-1)`): NEW option `letterBoxes` cannot do it, so `positionCard` accepts `groups:[1,1,3,1]`. Refused in en/da (no K digraph teaching); fr uses `ou/on/oi` (fiche son); it `gn/gl/sc`.

(e) K-3xx **Write the whole word** (CODE face, `zones:['write6']`): 6 cards 323×150 in 2×3: icon 64 left, right a `letterBoxesFilled` (target letter pre-filled in teal at its index) over a `rulingBlock({rows:1,w:220,h:44,glyphH:32})`. Child writes the word into the boxes then on the line. Words 3-6 letters, single occurrence. Verify: boxes = letters, filled index = occurrence. The filled letter is a scaffold, not the answer (the answer is the word). Distinct from G1-244 (K band, letter scaffold, one letter family).

Better fifth? Keep (e): it is the strongest K "can I do it alone" step and owns the es/pt/it `palabras con la M` head that no other type carries.

## 8 Two alternative base layouts

- Alt 1 "two-column": zone A across the top; below, hunt 2×4 on the left (400 wide, icon 76) and write + position stacked on the right (246 wide). Denser, saves 40 px, but 76 px hunt icons crowd the pencil circle and right-column lanes cap `glyphH` at 26.
- Alt 2 "three zones": drop position, make write 3 rows at `glyphH 44`. Calmer, but loses the start/middle/end zone every panel named as the format teachers know, and the base would then collide with (c).
- Recommendation: the stacked four-zone page in §2; whitespace is kept by 14 px gaps and card padding, and each zone is a full-width band a child can address top to bottom with one hand position.

## 9 Risks + mitigations · print check

- Overflow at long nouns: hunt cards carry no words; write lanes shrink via `maxW`; position words are length-capped by config; a theme with no letter reaching the floors throws (refusal, never a filler).
- Ambiguous pictures: only `entriesFor` label-safe nouns; `B2_EXCLUDE` applies; exclude vocab keys whose picture shows several objects (`countable` plurals used as singular are fine, the WORD is singular). Verify cannot see the picture: the native panel opens every hit picture (sv #35 lesson).
- Letter identity: `fold` per locale; de `ß`, nl `ij` only via face (d); it 21-letter alphabet from `letter-knowledge.json`.
- B&W print: coral dashed boxes read as mid-grey dashes; teal model vs grid-grey dashed trace already proven in K-284; hunt has no colour dependence.
- Pencil size: circles need ≥ 16 px margin around icons (given); boxes 28 px ≥ K min for a single letter? K floor is 56 for ELEMENTS, 30 for numerals; a 28 px letter box is below the numeral floor: engineer must measure at d2, and if the lint counts boxes as elements, raise box to 32 and cap position words at 5 letters.
- Left-handed child: model repeated as rep 0 in every lane; nothing the child must read sits to the right of what they write.
- Print check: page box is A4∩Letter by construction (`pageBox` 703×945); body 748 ≤ 760 at d2, 700 at d1, 758 at d3 (d3 is the tight one: verify with the QA overflow lint on fi + de before shipping any d3 copy claim).

## 10 Summary for the editor

1. Base = four numbered zones: trace Aa (card + two lanes), 8-card picture hunt (circle, no words), 2 word-trace rows, 3 position cards with empty letter boxes; 748 px at d2.
2. Content is native-per-locale (K-221 model): the letter is picked from the locale's eligible letters for the theme, `fold` decides accents, single-occurrence words only in position tasks.
3. Everything reuses `strokeLetterLane` / `strokeWordLane` / `letterBoxes`; six small new exports in `components-b3.js` (zoneTag, letterCard, huntCard, positionCard, letterBoxesFilled, positionKey).
4. Faces: (a) initial-sound scene count, (b) start/middle/end ×6, (c) big-letter tracing, (d) digraph via approved-words chunks, (e) write the whole word with the letter pre-filled; a, b, d, e are CODE faces, c is PARAM + one knob.
5. Open measurements: effective glyphH in a 74 px lane, whether the K element lint counts 28 px letter boxes, and whether the wave can pin a per-letter axis.
