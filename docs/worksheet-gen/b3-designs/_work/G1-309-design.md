# G1-309 `rhyming-words`: design (base + 5 faces), studio A (composition/print) + B (child)

Grounding (read 2026-09-13): brief, substrate, `_PANEL-FINDINGS.md` §10; renders `out/b2-sweep/K-287-fruits-d2-en.png`, `G1-244-fruits-d2-en.png`, `G1-245-animals-d2-en.png`, `out/exemplars/en-catalog/k232.png`; `types/k/K-232-rhyming-pairs.js` = `types/_shared/science-pair-match.js` (5 pairs, `.ws-match` two columns, itemH floor((720 - 14(n-1))/n), icon <= 92, deranged right column); `page/page.css` (`.ws-page` inner 675; `.ws-card` padding 12 + border 2; `.ws-cardgrid` gap 14, rows `minmax(0,1fr)` so cards STRETCH; `.ws-match` padding 6 30; `.ws-chip` 52 round; `.ws-bank`); `components.js`, `components-b2.js` (`wordBank:210 pillChoice:226 rulingBlock:58 countBadge:243`), `layouts/card-grid.js`, `primitives/trace-path.js` (`writingRow:681`, `textLaneGeometry:425`: scale = min(glyphH/70, (h-6)/82)), `_tokens.js` density; sibling FINALs G1-307 (`matchColumns`), G1-306 (`numberedBank`), K-317. Body ≈ 760 is the substrate's figure, UNKNOWN exact: every stack is also checked at 718.

## 1. Page concept (base, d2 ships)
"Say the picture. Circle the picture that rhymes. Write its word." Six numbered cream rows; each reads left to right as one small story: a framed ANCHOR picture, a small sound mark, three round CHOICE pictures on dashed rings (the child circles one), then a school-line lane where she writes the name of the picture she circled. No word is printed on the page; the written word is a picture's name, so the answer never appears. Owned skill: rhyme recognition by SOUND plus production of the rhyme word in writing (the write form the panel marks B in en/nl). Distinct from K-232 (EN, draw a line, nothing written), K-221/226/227 (one grapheme), G1-244 (spell a noun, no rhyme), K-318 (grapheme boxes). `themeAxis:{applicable:false}` (rhyme classes cross themes; K-232's data is 8 cross-theme pairs). Band per locale from the bank: `band:'G1'` (en de es pt fr it nl), `band:'K'` (sv da no fi; the fi panel may choose G1 when it wants words over 7 letters).

## 2. Layout d2 (exact)
`cardGrid({cards, cols:1, rows:6, numbered:true})`: 760 - 5 x 14 = 690 -> card 115 -> inner 647 x 87 (stage padding overridden to 0). At body 718 the inner is 80: the stack still fits.

```
+[1]--------------------------------------------- card 675x115 -------------------------------+
|    +------+   )))   ( pic )  ( pic )  ( pic )    ____________________________              |
|    | pic  |         (  60 )  (  60 )  (  60 )    - - - - - - - - - - - - - -  lane 230x64  |
|    |  70  |  mark    ring76   ring76   ring76    ____________________________  glyphH 28   |
|    +------+ tile 80                                                                          |
+---------------------------------------------------------------------------------------------+
   x: 20 | anchor 80 | 10 | mark 20 | 10 | 3 x 76 + 2 x 10 = 248 | 14 | lane 230  = 647
```
- Anchor `anchorTile` 80: white, `T.teal` 2 solid, r 12, picture 70 (G1 floor 44); `margin-left:20` clears the 30 px `.ws-card-badge`.
- `rhymeMark` 20: three arcs `T.teal` 2.5, no letters, `aria-hidden`.
- Three `choiceRing` 76: white disc, `T.grid` 1.5 DASHED ring, picture 60. The ring is the circle target; all three identical, so it pre-judges nothing.
- Lane `writingRow({w:230, h:64, glyphH:28, xHeight:true})` (stamps `data-lcs-prim="writing-row"`); ~10 glyphs at glyphH 28 (G1-307 est. 302 -> 14; engineer measures a G1 hand) -> `maxLetters:10`. Vertical: 80 / 76 / 64 centred in 87. Six items = the G1 floor.

**K shape** (`BAND_SHAPE.K`, sv da no fi): `rows:5, numbered:false` (the badge is dropped to buy lane width), card (760 - 56)/5 = 140 -> inner 647 x 112: anchor 100/84, rings 80/64 (K floor 56), `writingRow({w:233, h:80, glyphH:40})` (the K whole-word floor); x: 100 | 10 | 20 | 10 | 260 | 14 | 233; `maxLetters:7`.

**d1** (G1): 5 rows, 2 choices, inner 112: anchor 100/84, rings 88/72, lane 287 x 72 glyphH 32, maxLetters 9. **d3** (G1): 7 rows (inner 68), 4 choices, anchor 64/52, rings 60/48, lane 245 x 60 glyphH 26, one distractor from `near` (same vowel, different ending: cat/cap), maxLetters 11. K d1 4 rows 2 choices; K d3 6 rows 3 choices + `near` (inner 92: anchor 88/72, rings 76/60, lane 257 x 64 glyphH 40).

## 3. Ladder (resolved config; guards key on the config, never the level index)
| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| rows / choices / numbered | 5 / 2 / true | 6 / 3 / true | 7 / 4 / true |
| anchorTile / anchorPx | 100 / 84 | 80 / 70 | 64 / 52 |
| choiceTile / choicePx | 88 / 72 | 76 / 60 | 60 / 48 |
| laneW / laneH / glyphH | 287 / 72 / 32 | 230 / 64 / 28 | 245 / 60 / 26 |
| maxLetters / near / minSlot | 9 / false / 2 | 10 / false / 2 | 11 / true / 2 |
| band | `BAND_SHAPE[bank.band]` merged last (K: rows 4/5/6, glyphH 40, maxLetters 7, numbered false) |

`minSlot`: the rhyming ring takes every position >= 2 times per page (re-roll; 20-seed sweep asserts each position >= 4 of 18). `sampleEntries(rng, pool, n, 'G1-309')` sample-or-throw. Fan lever = `variantsPerType` re-sampling rows; the wave ships variant 1 (a themeless type emits one instance per (type, difficulty, locale)).

## 4. Answer hiding + uniqueness
- **Bank** (`data/b3/rhyming-words.js[loc]`): `classes:[{id:'at', label:'-at', members:[{theme, noun, vocabKey, word, picOpened:true}]}]` (>= 2 pictured members; rhyme = SOUND, `label` is the panel's note, never derived from spelling: fr `chat`/`rat` rhyme, `chat`/`chaise` do not) + `loners:[…]` (pictured words the panel attests rhyme with no class, `rhymesWith:[]`) + `near:[['cat','cap']]` (d3) + `couplets` + `own` (§7).
- **Row:** 6 classes -> anchor + partner from the SAME class; 2 distractors from members of OTHER classes or loners, from two DIFFERENT classes (no two distractors rhyme with each other). Every word once per page (24 distinct at d2). Choice order `rng.shuffle` under `minSlot`.
- **Stamps:** row `<div class="ws-card-stage" data-ws-content data-lcs-anchor="cat" data-lcs-vocab data-lcs-class="at">`; ring `data-lcs-choice="hat" data-lcs-vocab data-lcs-class data-lcs-rhyme="1|0"`; the lane carries nothing (expected = the `rhyme="1"` choice's word, `displayWord`-cased in the answer key). Page root `data-lcs-face` only when a face declares it (base byte-identical).
- **`verify(page)`:** per row exactly one ring with `class === anchor class` and it is the `rhyme="1"` one; the other classes !== anchor and !== each other; anchor vocab not among rings; rings === `d.choices`; one empty writing-row per row, svg width <= laneW; every `img.naturalWidth > 0`; no `data-lcs-vocab` twice; FAIL if any text node equals a stamped word (case-folded, whole word); ring pictures >= `density[band].minElement`; rhyme position takes >= 2 values.
- **Node gate `tools/gate-rhyming-data.js`:** every stamped (word, class) is a bank member VERBATIM; labels pairwise distinct; a word in exactly one class or in `loners`; `near` pairs cross-class. Poison: `hat` stamped under `og` -> FAIL; two classes labelled `-at` -> FAIL.
- **Couplet face (§7 d):** line 1 ends in the PRINTED rhyme partner (`data-lcs-anchor`); line 2 ends in an inline lane; the picture at the left names the HIDDEN word (`data-lcs-rhyme`). Hidden = the answer, its `forms` (plural etc.) and every other row's answer are absent from both lines (verify, whole-word, case-folded). Unique = the picture names one bank word and (anchor, answer) share a class (node gate).

## 5. Primitives and components
**Reused (exact):** `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-lane .ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right) .ws-choices .ws-chip .ws-scene-banner .ws-bank .ws-bankword`; `writingRow({w,h,glyphH,xHeight:true})`; `rulingBlock({rows,w,h,glyphH,gap})` (face f); `wordBank({words, wordPx})` (face f, the one face that prints words); `countBadge(n)`; `matchColumns({left,right,itemH,colW})` and `numberedBank({items, iconPx})` as specified in G1-307 §2 / G1-306 §2 (reused by name, no second copy); `svgRoot roundedRect circle el label esc`; `fileUri displayWord distinctByWord sampleEntries`; tokens `T.teal T.coral T.grid T.white T.ink`, `F.body`. NOT used: `pillChoice` (no per-item stamp, G1-307 ruling), `chipRow` (numerals), `answerBox` (invites a numeral), `strokeWordLane` (no model), `letterBoxes` (leaks length), `mirrorGroups`, `sceneStage`.

**NEW in `templates/components-b3.js`:**
- `rhymeRow({anchor, choices, lane, anchorTile, anchorPx, choiceTile, choicePx, badgeGap=20})`: `.ws-card-stage` flex row (`justify-content:flex-start; gap:10px; padding:0 0 0 badgeGap`) = `anchorTile` + `rhymeMark` + N x `choiceRing` + 14 px + `writingRow(lane).svg`; stamps as §4.
- `anchorTile({src, tile, px})`: div `border-radius:12px; background:#FFFFFF; border:2px solid #146B5E`, centred `.ws-icon`.
- `choiceRing({src, tile, px, word, vocabKey, cls, rhyme})`: div `border-radius:50%; background:#FFFFFF; border:1.5px dashed #C8BFAE`, centred `.ws-icon`, stamps `data-lcs-choice/-vocab/-class/-rhyme`.
- `rhymeMark({px=20})`: `svgRoot` with three arcs (`M6 5 q6 5 0 10`, `M9 2 q10 8 0 16`, `M12 -1 q14 11 0 22`; `T.teal` 2.5, round caps, `fill:none`), `aria-hidden`, `data-lcs-rhyme-mark`.
- `yesNoChips({px=52})`: `.ws-choices` with two `<span class="ws-chip" data-lcs-chip="yes|no">` holding an inline SVG glyph in `T.teal` 3.5 (check `M14 27 l9 9 l17 -18`; cross `M16 16 l20 20 M36 16 l-20 20`); no text, no coral (a coral X is the house's "crossed out").
- `pairCardRhyme({a, b, px, rhyme})`: two `.ws-icon` with `rhymeMark(24)` between, `yesNoChips` below; stamps `data-lcs-a/-b/-class-a/-class-b/-rhyme`.
- `coupletCard({pic, anchor, line1, line2, lane, fontPx})`: `.ws-lane` row (inner 639): `anchorTile` 88/72 left; text column 539: `<p data-lcs-verse="1">` Nunito 800 fontPx `T.ink` lh 26; `<p data-lcs-verse="2" style="display:flex;align-items:flex-end;gap:8px">` text + inline `writingRow(lane).svg`; stamps `data-lcs-anchor/-rhyme/-vocab/-class`.
- `rhymeFamilies({anchors, bank, perClass, lane, headTile, headPx})`: `numberedBank` on top; two 330 px columns (gap 15), each `data-lcs-column data-lcs-class data-lcs-anchor` = centred `anchorTile(headTile)` + `perClass` stacked `writingRow`s (gap 6).
- `ownRhymeCard({pic, bankWords, lanes=2, lane})`: picture 88 + `wordBank({words, wordPx:18})` + `rulingBlock({rows:lanes, w:302, h:64, glyphH:28, gap:6})`; `data-lcs-open="1"`.

## 6. Locale slot structure
- **Nothing on the base but pictures and lines.** The child writes every word; the answer key prints `displayWord(word, loc)` (de keeps the capital `Maus`; all others lowercase). Bank `word` = the citation form she is expected to write: sv/da/no INDEFINITE singular (`hatt`, `hus`, never `hatten`/`banan`), nl bare noun (de/het never printed), fi nominative (`kissa`), es/pt/it/fr bare noun without article (no article or adjective is ever printed, so nothing agrees with a picture). `word` must equal the `approved-words-<loc>.json` entry for its `vocabKey` (da: the strict `policy_managed:false` pool); absent = dropped from the bank, recorded.
- **Rhyme classes are panel literals;** the code never compares endings (fr `-eau`/`-o`, en `-ough`, da stød, fi vowel length are exactly what spelling gets wrong). es/it may ship small banks (rhyme is a weak genre there, findings C); below the floor a face refuses, never pads.
- **Couplets are whole panel literals** `{cls, line1, line2, answer:{theme,noun,vocabKey,word}, forms:['Häuser']}`: article, case, gender, fi partitive/illative, sv/da/no definiteness all live INSIDE the literal ("Ich seh' eine kleine Maus, / sie wohnt in einem großen ___" -> `Haus`, written bare with its capital). Validators: `line1 <= 34` chars, `line2 <= 26` before the blank, anchor at the END of line 1, answer + `forms` absent from both lines, no `{name}` slots. Titles/instructions in `i18n/strings.<loc>.json` by id; skill sentence `rhyming-words`.
- **Face f** prints a 3-word bank per card from ONE class (the picture's class minus its own word), same citation forms; no verse printed.
- fi: `band:'K'` caps written words at 7 letters; the fi panel picks K (short words) or G1 (1. luokka). `[NSR-FLAG]` sv/da/no/fi.

## 7. The five variation faces
Chosen **(a) (b) (c) (d) (f)**. Dropped **(e) rhyme string**: it needs classes with >= 4 PICTURED members per row; en's own data is 8 classes of 2, and es/it/da/no are estimated < 2 such classes -> unbuildable in >= 4 locales (rule 3). Reserve R1 if (b) refuses in >= 4 locales: "Which picture does not rhyme?" (3 of one class + 1 intruder; classes >= 3; exclusion move). All faces `themeAxis:{applicable:false}`, ids `K-325+` / `G1-311+ (TBD by the emitter)`, CODE faces (`layout` knob + `verify` branch; base byte-identical); `gate-variation-distinct.js` sees five distinct resolved d2 configs.

**(a) Rhyming pairs, draw a line (K, `layout:'match'`).** The non-EN rebuild of K-232; **en REFUSED** (K-232 owns the identical page; en expects 5 hub rows). `matchColumns` 5 pairs: itemH floor((760 - 12 - 48)/5) = 140; left 200 x 140 cream, picture 96, `data-lcs-left=cls`, dot `--right`; right 200 x 140 white, the partner, deranged (`lit-vocab-match.js:44` idiom), `data-lcs-right=cls`; 215 px for lines. Config `{layout:'match', pairs:5, picPx:96}`; d1 4 pairs (itemH 178, pic 100); d3 6 pairs + 1 extra right item (`data-lcs-distractor`, a loner). Verify: permutation, derangement, each class once, no vocab twice. Pool = the base floor. Query face: "draw a line / kleuters / förskoleklass / maternelle".

**(b) Rhyme families, sort by writing (G1, `layout:'families'`; K shape in K locales).** Two anchor pictures head two columns; a numbered bank of 6 pictures (3 per family, shuffled, never a run of 3) on top; the child writes each picture's word under the anchor it rhymes with. Stack: `numberedBank` 6 x 72 (h 104) + 14 + head 140/112 + 10 + 3 x `writingRow({w:302, h:72, glyphH:32})` + 12 = 496 (K: lanes 80/40 -> 520). Six lanes = the G1 floor. Config `{layout:'families', classes:2, perClass:3, bankPx:72, headTile:140, glyphH:32}`; d1 2+2 (lanes 90/36); d3 4+4 (8 lanes 64/28: 542). Stamps: column `data-lcs-class/-anchor`; bank item `data-lcs-bank-index/-vocab/-class`. Verify: `perClass` items per class, anchors not in the bank, no vocab twice, bank not blocked by class, no text nodes, `2 x perClass` empty lanes. **Pool-critical:** 2 classes with >= 4 pictured members per locale (UNKNOWN; engineer measures the drafts; en cat/hat/bat/rat plausible, de `Maus Haus Laus` = 3). Refuse where short; R1 replaces at >= 4 refusals. Query face: "rhyme families / Reimfamilien / familles de rimes / rimfamiljer".

**(c) Rhyme or not? (K, `layout:'yesno'`).** `cardGrid({cols:2, rows:4})`: card 330 x 179 -> inner 302 x 151: `pairCardRhyme` pictures 80 + `yesNoChips(52)`: 80 + 10 + 52 = 142. 4 rhyming pairs + 4 non-pairs (two members of two different classes, never a `near` pair at d2), shuffled; `yes` cards take both columns, never 4 in a row. K locales: 6 cards 2 x 3 (inner 217, pictures 100, chips 56). Config `{layout:'yesno', cards:8, yes:4, picPx:80, chipPx:52, near:false}`; d1 6 cards 3/3 pictures 96; d3 8 cards with 2 `near` non-pairs. Verify: `rhyme === (classA === classB)`; `yes` count; two textless chips keyed yes/no; no vocab twice; non-pairs never one class; d2 never `near`. Query face: "rhyme or not / Reimt sich das? / ¿Riman o no? / rimmar det?".

**(d) Complete the rhyme (G1 in all 11, `layout:'couplet'`).** Six `coupletCard` rows, gap 8: row 116 (inner 88): line 1 Nunito 800 18 lh 26 + 4 + line 2 text + inline `writingRow({w:170, h:56, glyphH:26})` = 86; 6 x 116 + 40 = 736. German fit: line 2 words get 539 - 170 - 8 = 361 -> <= 26 chars at ~13 px avg (est.); line 1 <= 34 chars (≈ 445 <= 539). Both caps are validator rules; the engineer MEASURES the advance on de + fi renders (over the column = refuse the couplet, never shrink below 16 px). Picture 72 in an 88 tile = the cue for the missing word; the printed line-1 end word = the rhyme partner. Config `{layout:'couplet', rows:6, fontPx:18, laneW:170, glyphH:26}`; d1 5 rows fontPx 20, lane 200 x 64 glyphH 28, the answer's first letter printed in `T.coral` before the lane (`data-lcs-hint`); d3 7 rows fontPx 17 (7 x 100 inner 72: lh 24 + lane 48 glyphH 24), 2 rows without a picture cue (`cueless:2`). Verify: §4; line 1 ends with `data-lcs-anchor`; lane empty; d2 `cueless === 0`. A couplet is read, so the K-banded Nordic base does not pull this face to K. >= 6 couplets per locale or refuse. Query face: "complete the rhyme / Reime ergänzen / complète la rime / completa la rima / lorut / rim att fylla i".

**(f) Write your own rhyme (G1, `layout:'own'`, open-ended, no `verify()`).** `cardGrid({cols:2, rows:2})`: card 330 x 373 -> inner 302 x 345: picture 88 + 8 + `wordBank` 3 words (~44) + 10 + `rulingBlock({rows:2, w:302, h:64, glyphH:28, gap:6})` 134 = 284, centred. Two rhyming lines about the picture; the 3-word class bank is the scaffold; 8 lanes on the page. Config `{layout:'own', cards:4, bankWords:3, lanes:2, glyphH:28}`; d1 3 cards 1 x 3, 1 lane glyphH 36, 4-word bank; d3 4 cards, no bank, 3 lanes 60/26 (288). Layout lints only; `[data-ws-content]` on every card. Query face: "write your own rhyme / eigene Reime schreiben / escribe tu propia rima / skriv ett eget rim / kirjoita oma riimi".

## 8. Two alternatives + recommendation
- **Alt A, 2 x 3 card grid** (anchor on top, rings, lane): inner 302 x 217 vs 80 + 8 + 76 + 8 + 64 = 236 -> anchor 64 and lane glyphH 24 (below the G1 26 floor); the eye zig-zags twice per card. Rejected.
- **Alt B, K-232's two columns plus a lane column**, no card frames: same numbers, but a 6-year-old loses which lane belongs to which anchor once the page is half-written; the badge and cream card fix that.
- **Recommendation: the six numbered row cards.** One hand position, one reading direction (see, hear, choose, write), every element at or above its floor, no slack needed below body 718.

## 9. Risks + mitigations + print check
- Cross-class rhyme (`log`/`dog` in two labels): validator = one class per word, labels distinct, `near` cross-class, `loners` attested `rhymesWith:[]`. Poison: one word in two classes -> FAIL.
- Picture not what its name says (sv #35 `fruits/plum` = an apple): `picOpened:true` per member, asserted; `B2_EXCLUDE` (`crane`); no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`).
- Rhyme derived from spelling: impossible by construction (no code path reads endings).
- K lane too short (fi): `maxLetters 7` + the fi band choice; sv/da/no K words are 3-5 letters.
- de/fi couplet overflow: char caps + browser measurement; refuse, never under 16 px.
- ✓/✗ read as right/wrong colours: both `T.teal`, identical chips; meaning never rides on colour.
- Thin banks (es/it/da/no): base needs 6 classes x 2 + 12 more pictured words; (b) 2 classes x 4; refuse per face per locale, recorded; R1 in reserve.
- The rhyme ring in one slot: `minSlot` + verify + 20-seed sweep.
- **Print check:** 703 x 945 by construction; base 6 x 115 + 70 = 760 (stretching cards, inner >= 80 needed -> body >= 718); (a) 760; (b) 496; (c) 758; (d) 736; (f) 760. Smallest text 18 >= 9; rings 76 = 20 mm, pictures 60 = 15.9 mm, glyphH 28 = 7.4 mm, K 40 = 10.6 mm; mono laser: teal ≈ 60 % grey, dashed `grid` ring ≈ 20 %, coral dots (a) ≈ 45 %; `qa/lints.js` on de + fi renders of every face before any copy claims a level.

## 10. Summary
1. Base = six numbered row cards: framed anchor picture, sound mark, three dashed-ring choice pictures, one school-line lane; no word printed; circle the rhyme, write its name (G1 6 rows glyphH 28; K locales 5 rows glyphH 40).
2. Rhyme = a panel-authored SOUND class bank (`classes/loners/near/couplets`), spelling gated by `approved-words-<loc>.json`; distractors from two other classes so exactly one ring rhymes; verify + node gate re-derive from the bank.
3. Five CODE faces: (a) K draw-a-line via `matchColumns` (en refused, K-232 owns it), (b) rhyme families 3+3 via `numberedBank` + lanes (pool-critical, R1 in reserve), (c) rhyme or not with teal ✓/✗ chips, (d) complete the couplet with the hidden end word + picture cue (caps 34/26, measured on de/fi), (f) open-ended own rhyme.
4. New in `components-b3.js`: `rhymeRow anchorTile choiceRing rhymeMark yesNoChips pairCardRhyme coupletCard rhymeFamilies ownRhymeCard`; everything else is `cardGrid writingRow rulingBlock wordBank countBadge matchColumns numberedBank` + existing `.ws-*` classes.
5. Every face fits 760 at its floors (760 / 760 / 496 / 758 / 736 / 760) and tolerates 718; refusals are data decisions per face per locale, never fillers.
