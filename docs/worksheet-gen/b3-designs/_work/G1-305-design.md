# G1-305 `syllable-split`: design (base + 5 faces), studio A (composition/print) + B (child)

Grounding: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §3, renders `out/b2-sweep/G1-244-fruits-d2-en.png`, `G1-245-animals-d2-en.png`, `G1-249-animals-d2-en.png`, `K-284-animals-d2-en.png` (no K-233/K-234 render exists under `out/`), `page/page.css`, `templates/components-b2.js`, `templates/layouts/card-grid.js`, `primitives/trace-path.js`, `types/k/K-233-syllable-count.js`, `types/g1/G1-244-write-the-word.js`, `lib/b2-common.js`, `data/literacy/letter-knowledge.json` (`vowels`), the eleven `approved-words-<loc>.json` joined to `entriesFor(theme, loc)` with node (2026-09-13), and `_work/K-318-design.md` §5 (`primitives/syllable-arcs.js` is proposed there; this design extends that ONE primitive).

## 0. Measured substrate
- Multi-syllable approved entries: en 607 · de 876 · es 932 · pt 869 · fr 723 · it 963 · nl 766 · sv 758 · da 275 (K-1 strict `policy_managed:false` pool of 402) · no 608 · fi 1106.
- Per theme `approved / count=2 / count=3 / count≥4 / longest`: animals en 33/14/3/2/12 · de 25/9/4/1/11 · nl 28/15/0/1/9 · da 16/8/0/1/8 · no 24/10/1/1/10 · fi 33/20/8/5/11; zoo animals en 30/14/5/4 · de 25/12/8/1 · da 10/4/2/1; around the house de 72/35/12/7/14 · nl 74/21/16/5/16 · da 40/11/8/3/14 · fi 71/38/16/16/15; fruits en 25/5/12/3 · de 19/7/8/4 · da 5/4/1/0. Count ≥ 4 is 0 to 3 per theme in en/nl/sv/da/no (why face (e) is dropped, §7).
- Vowel-king eligible (each syllable holds exactly ONE vowel-letter run): de 876/876, fi 1106, it 952, es 805, pt 746, sv 758, nl 754, no 608, en 495, fr 602, da 272.
- `LM = {ascender:14, capTop:16, xTop:44, base:84, desc:96}`; `textLaneGeometry` scale = min(glyphH/70, (h−6)/82). The stroke font is NOT used: the word is Baloo 2 text, the child writes free-hand on `writingRow`.

## 1. Page concept (base; d2 ships)
"Read it, swing it, write it in pieces." Six cream cards (2×3): a small picture, the word printed large in equal LETTER CELLS, a blank arc zone where the child draws one bowl per syllable, and one school-line lane where the child rewrites the word with hyphens (`Ei-chel`, `ka-me-ra`). The split is never printed. Owned sub-skill: PRODUCING the split in two channels (motor arc + written hyphen). Distinct from K-233 (digit), K-234 (line to a numeral), K-318 (grapheme boxes), G1-244 (whole word), G2-316 (compounds).

Why cells: build() has no font metrics. Equal cells make every boundary an exact x (cumulative letters × cell), so printed arcs (face c), verify geometry and the child's zone line up without measuring text. de Silbenbögen materials already print in cells.

## 2. Layout d2 (exact)
Page 703×945; `.ws-page` padding 0 14 → inner 675; body ≈ 760. `cardGrid({cols:2, rows:3})`, gap 14 → card 330×244; padding 12 + border 2 → inner **302×216**. `.ws-card-stage` as a column (`padding:6px 4px`), stamped `[data-ws-content]`.

```
+---------------- card 330x244 ----------------+
|[1]              [pic 56]                     |  pic 56 centred
|      +--+--+--+--+--+--+--+--+               |  cells 28, Baloo 2 700 30px, ink
|      |S |c |h |a |f |e |r |  |  8 x 28 = 224 |  (cell 24 / 26px when n = 11..12 -> 288)
|      +--+--+--+--+--+--+--+--+               |
|      ..........................  arc zone 26 |  1px grid shelf, otherwise blank
|      ______________________________________  |  hyphenLane w 302 h 64 glyphH 28
|      - - - - - - - - - - - - - - - - - - -   |
|      ______________________________________  |
+----------------------------------------------+
```
Vertical: 6 + pic 56 + 4 + word line 40 + arc 26 + 6 + lane 64 + 6 = 208 ≤ 216.

Word block `syllableWord({word, cell, fontPx})` centred at x0 = (302 − n·cell)/2; `cell = n ≤ 10 ? 28 : 24`, `fontPx = cell + 2`. A 12-letter German word (`Schlittschuh`) spans 12×24 = 288 ≤ 296; 13+ letters are refused at d2. Letters `ink`; cell 1 keeps the de capital (`displayWord`). Arc zone `syllableArcs({spans, w:n·cell, h:26, mode:'blank'})`: a 1 px `grid` shelf at y 2 the bowls hang from, nothing else. Lane `hyphenLane({w:302, h:64, glyphH:28})` (glyphH ≥ 28 as the brief asks). Lane capacity: n letters + (count − 1) hyphens at ≈ 21 px each ⇒ `n + count − 1 ≤ 14` ⇒ `maxLetters = min(12, 15 − count)`. Engineer measures a real G1 hand at 21 px/glyph; if it fails, cap at 11, never lower glyphH. Picture 56 ≥ G1 min element 44 (`fileUri(theme, noun)`, `.ws-icon`).

d1: 4 cards `2×2` (inner 302×345): pic 96, cell 32 / font 36 (max 8 letters), arc zone 30 with **count dots** (one teal dot per syllable, EVENLY spaced, never at boundaries), lane h 80 glyphH 40, 2-syllable words only. Sum 6+96+8+48+30+8+80+6 = 282.
d3: 8 cards `2×4` (inner 302×151): no picture (read-and-split), cell 22 / font 24 (13 letters = 286), arc 24, lane 64/28, 2 to 4 syllables. Sum 6+36+24+6+64+6 = 142.

## 3. Ladder (resolved config; every knob honoured by the base build)
| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards/cols/rows | 4/2/2 | 6/2/3 | 8/2/4 |
| pic | 96 | 56 | 0 |
| cell/fontPx | 32/36 | 28/30 (24/26 if n>10) | 22/24 |
| arcH / arcMode / dots | 30/blank/true | 26/blank/false | 24/blank/false |
| lane h/glyphH | 80/40 | 64/28 | 64/28 |
| minCount/maxCount | 2/2 | 2/3 | 2/4 |
| minLongCards (count≥3) | 0 | 2 | 3 |
| maxLetters | 8 | min(12, 15−count) | min(13, 15−count) |
| rewrite / band | true / G1 | true / G1 | true / G1 |

Filter, in order: `entriesFor(theme, loc)` → `displayWord` → `/^\p{L}+$/u` → approved entry by `vocabKey`, `total_agreed ≥ 3`, `entry.word` equal to the display word case-insensitively (the approved word must BE the picture word) → count/letter bounds → da `policy_managed !== true` → fr mute-e refusal (§6) → `distinctByWord`. `sampleEntries(rng, pool, d.cards, 'G1-305')` throws on a short pool (refusal recorded). `themeAxis: {applicable:true, minNouns:8, excludeBw:true}` after the filter. Measured d2 pools (count 2..3, ≤ 12 letters): en animals 17 / zoo 19 / house 38; de animals 13 / zoo 20 / house 47; da animals 8 / zoo 6 (refused) / house 19; no animals 11. Avoid `farm animals`.

## 4. Answer-hiding + uniqueness
- Hidden stamps: `data-lcs-word`, `data-lcs-vocab`, `data-lcs-split="ei|chel"` (lowercase, `|` joined), `data-lcs-count`, `data-lcs-cell`, `data-lcs-face="base|arcs|rewrite|kings|sort|judge"`; `data-lcs-arcmode` on the arc svg; `data-lcs-hyphen-lane` on the lane.
- `verify(page)`: `split.join('') === word.toLocaleLowerCase()`; `count === split.length`; cells `n === [...word].length`; `arcmode==='blank'` ⇒ NO `<path>` in the arc svg; d1 dots ⇒ `count` circles at `x = w·(i+0.5)/count ± 1` (not at boundaries); visible card text equals the word and nothing else (G1-244 precedent); no duplicate words; picture `naturalWidth > 0` when `pic > 0`; lane present iff `rewrite`; svg widths ≤ 302.
- `tools/gate-syllable-split.js` (NEW, node side, after render): re-reads `approved-words-<loc>.json` and asserts every stamped split and count equals the approved entry verbatim (the file is unreachable from `page.evaluate`). Poison: mutate one stamp → FAIL.
- Uniqueness: one vocab word per picture, one ≥3-source split per key. Face (f) prints BOTH candidates unmarked in `rng.shuffle` order (verify: the correct pill is not always first); the wrong one is derived, never approved. The split never appears as text, ticks, dots or paths at d2/d3 or in any face except (c), where the ARCS are the given and the king position is the hidden answer.

## 5. Primitives and components
Reused: `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-lane .ws-pill .ws-nchip .ws-bank .ws-bankword .ws-scene-banner`; `writingRow schoolLines textLaneGeometry`; `rulingBlock wordBank pillChoice`; `svgRoot roundedRect circle line el label esc`; tokens `T.ink T.grid T.teal T.coral T.white`, `F.display`, `stroke.primitive`; `entriesFor displayWord distinctByWord sampleEntries fileUri`; `compare` (`data/b2/collation.js`). NOT used: `countBadge` (prints a numeral), `letterBoxes` (reads as "write here"), `strokeWordLane` (no model to trace).

NEW `primitives/syllable-arcs.js` (K-318's proposal, extended; the only arc primitive):
`syllableArcs({spans:[{x,w}], w, h=26, mode:'printed'|'blank'|'dotted', dots=0, strokeW=3})` → `<svg data-lcs-arcs=spans.length data-lcs-arcmode=mode>`. `printed`: per span a bowl `M x+4,3 Q x+w/2,h·0.95 x+w−4,3`, `T.teal`, `stroke.primitive`, round caps, no fill. `dotted`: same path, `T.grid`, dash `4 5` (a tracing scaffold; unused by G1-305 at any level, reserved for K-318 face e). `blank`: `line({y:2, strokeColor:T.grid, strokeWidth:1})` across `w`, plus when `dots>0` circles r 4 `T.teal` at `x = w·(i+0.5)/dots`, y 14. K-318 passes spans from box clusters; G1-305 from cells.

NEW in `templates/components-b3.js`:
- `syllableWord({word, cell, fontPx, color=T.ink})` → `<svg width=n·cell height=cell+12 data-lcs-cells=n data-lcs-cell=cell>`; letter i = `label({x:(i+0.5)·cell, y:cell+2, size:fontPx, fontFamily:F.display, weight:700, anchor:'middle'})`. Cells have no borders.
- `syllableArcsForWord({split, cell, h, mode, dots})` computes spans (`x` = cumulative letters × cell, `w` = len × cell) and calls `syllableArcs`; in `blank` mode spans are not emitted.
- `hyphenLane({w, h=64, glyphH=28})` = `writingRow({w,h,glyphH,xHeight:true}).svg` in `<div data-lcs-hyphen-lane>`; no ticks, no hyphen marks (position leak).
- `vowelDot({x, y})` = `circle r 5 fill T.coral` with `data-lcs-vowel-dot`; drawn ONLY in the face-(c) worked-example banner (an example word absent from the page's cards, printed arcs + a dot under each king). On mono it prints as a solid disc, distinct from the 3 px arc stroke.
- `splitCandidates({a, b, sep, fontPx})` (face f): two `.ws-pill` stacked, `data-lcs-cand=0|1`, syllables joined by the locale `sep`.

## 6. Locale slot structure
`i18n/strings.<loc>.json` per id: `{title, instruction, sep, example:'<vocabKey>'|null, kingsRule:'run', refuse:[keys]}`. Titles = the panel heads (de Silbenbögen / Silbentrennung; fi tavutus; es separar en sílabas; pt separação de sílabas; fr découpage syllabique; it divisione in sillabe; nl woorden in lettergrepen verdelen; sv/da/no … stavelser; en syllable division), never the worksheet word.
- **de**: capital in cell 1; `sep:'-'`; king = every vowel run incl. `ei au eu äu ie`; Ä Ö Ü exceed the lane top line, which is a guide, not a ceiling.
- **fi**: hyphen is THE convention (`ka-me-ra`); 15-letter house/clothing words fall to d3 or are refused; long vowels/diphthongs are one king. The `tavutettu` hyphenated-instruction flag from the panel findings is a strip render flag for fi sheets, outside this page's cards (words are the task, never pre-hyphenated).
- **es/pt/it**: `sep:'-'`; accents are Baloo 2 glyphs in the cells; on the lane the child writes them above x-height inside glyphH 28. `qu gu gli gn` arrive whole from the approved split.
- **fr**: refuse final mute-e words (`/[^aeiouyéèê]e$/u` + panel `refuse`) until the §20.9 written-vs-oral ruling; remaining pool UNKNOWN, engineer must measure per theme. Arcs = "entoure les syllabes".
- **nl**: IJ arrives inside one syllable; klankgroepen wording in the instruction only.
- **sv/da/no**: citation singular only, no definite forms; da K-1 pool makes most themes REFUSE at `minNouns:8` (house 19 and clothing pass); recorded, never filled.
- **en/fr**: face (c) REFUSED (silent e, vowel teams: "one king per syllable" is not the pedagogy).
- Separator `·` is a panel option for de/nl instruction wording only; the child's hyphen is not machine-checked. RTL: none.

## 7. Five faces (ids `G1-311+ (TBD by the emitter)`; band G1)
Hub contract: `apps.syllable-split` in `topics-taxonomy.json`; `axes['exercise-type'].syllable-split.slug/name` ×11; one landing per face per locale with `coordinate.type === 'syllable-split'`, a band-table level, a unique slug, `canonicalDeckSlug`; gate `scripts/verify-hub-type-rows.js` expects 6 rows per key per locale. Each face differs from base d2 in RESOLVED config (`tools/gate-variation-distinct.js`).

Chosen (a) (b) (c) (d) (f). Dropped **(e) long/compound words**: count ≥ 4 per theme is 0 to 3 in en/nl/sv/da/no (unbuildable in ≥ 4 locales, brief rule 3), it is a range shift the base d3 already carries, and it collides with G2-316. (d) stays because it/pt `bisillabe e trisillabe` is an A head and the 2/3 buckets fill from ≥ 1 theme in every locale.

(a) **Syllable Arcs** (PARAM): `{...base.difficulty[2], rewrite:false, pic:96, cell:32, fontPx:36, arcH:30, maxLetters:8}`; stack 6+96+8+48+30+6 = 194. Read, clap, draw one bowl per syllable. Verify: no `[data-lcs-hyphen-lane]`. Query face: draw the syllable arcs (de Silbenbögen einzeichnen).

(b) **Write the Syllables** (CODE `layout:'rows'`): 8 full-width `.ws-lane` rows, h = (760 − 7·8)/8 = 88, padding 8 → inner 651×72: `[pic 56][word 200][hyphenLane w 371 h 64 glyphH 28]`, gap 12. No arcs, so the word is proportional Baloo 2 700 26 px (12 letters ≈ 172 px at 0.55 em, estimate; engineer measures). `maxLetters 12`, count 2..3, ≥ 3 rows of 3. Verify: no `[data-lcs-arcs]`, 8 lanes. Query face: write the word in syllables with hyphens (fi tavuta sanat).

(c) **Vowel King** (CODE `kings:true`): base geometry with arcs PRINTED (`mode:'printed'`), `rewrite:false`, pic 72, plus a worked-example banner (`.ws-scene-banner` 675×64: example word in cells + printed arcs + `vowelDot` under each king). The child dots the vowel of every syllable. Eligibility: one vowel run per syllable (§0). Stamps `data-lcs-kings="0:2|2:1"` (cell:run length); verify re-derives kings from `letter-knowledge.json vowels` per syllable and asserts the example word is not on a card. Refused en/fr. Query face: mark the vowel in each syllable (de Silbenkönig).

(d) **Two or Three Syllables?** (CODE `layout:'sortcols'`): `wordBank({withIcons:true})` of 8 chips (4 two-, 4 three-syllable, collation order, ≈ 110 px); below, two `.ws-lane` columns 330 wide headed by a `.ws-nchip` 48 numeral "2" / "3" with 2 / 3 teal dots, then `rulingBlock({rows:4, w:300, h:64, glyphH:28})` (272). Column 48+8+272+24 = 352; page 110+16+352 = 478 ≤ 760. The child writes each word, split, into the right column. Stamps `data-lcs-count` per chip; verify 4+4, bank order ≠ count order, 4 rows per column. `maxLetters 10`. Pools (count=3 ≥ 4): en zoo 5 / fruits 12 / forest 8; de every listed theme; da house 8 / clothing 4; no zoo 5 / house 9 / forest 5; others refused. Distinct from K-234 (K, line to a numeral; here the child WRITES the split). Query face: two- vs three-syllable words.

(f) **Which Split Is Right?** (CODE `layout:'judge'`): 6 cards 2×3, `[pic 64]` left, two `splitCandidates` pills (h 44, 24 px; 22 px when n ≥ 11) stacked right in 228 px. The child circles the right one. Distractor = the approved split with exactly ONE boundary moved one letter, preferring a move INTO a multigraph in nested-chunk locales (de `Eic-hel`, nl `sc-hool`) or between a vowel pair elsewhere, so it is unambiguously wrong; the panel reviews `tools/list-split-distractors.js` output and bans by key; fr mute-e refused. Stamps `data-lcs-split` only; verify: exactly one pill (separators stripped) equals the split, the other joins to the same word and differs, correct index not constant page-wide. Query face: right or wrong split (de richtig getrennt).

## 8. Alternatives + recommendation
- Alt A, six full-width rows (K-284 shape): word+arcs beside the lane; a 12-letter word forces cell 21 and a 259 px lane (14 glyphs at 18 px, under a G1 hand). Rejected; its logic survives as face (b), which has no arcs.
- Alt B, picture 72 beside the word block (226 px): 12 letters → cell 18, a 2-letter syllable bowl 36 px wide, too cramped for a pencil. Rejected.
- Alt C, proportional text with estimated boundaries: 2 to 6 px drift per letter, so a printed arc (face c) can start inside the wrong letter. Rejected; cells make boundaries exact.
- Recommendation: the 2×3 cells-over-lane base (§2), ladder §3, faces §7.

## 9. Risks, mitigations, print check
- Split disputes (fr mute-e, sv/da): ≥3-source entries only; fr regex + panel `refuse`; da K-1 pool; the node gate compares stamps to the file.
- Lane too short for a long hand: `maxLetters = 15 − count`; measure a G1 hand; drop the cap before glyphH.
- d1 count-dot leak: dots evenly spaced; verify asserts spacing ≠ boundaries.
- Face (f) "both right": one-boundary rule + panel ban list; verify asserts the wrong candidate differs from the approved split and from any `refuse` alternative.
- Cells look spaced: gap ≤ 4 px over natural at cell = fontPx − 2; acceptable in G1 print.
- Theme thinness: `minNouns:8`; da refuses most themes; recorded per theme.
- Palette: ink letters, grid shelf, teal arcs/dots, coral example dots, cream cards; no new hex.
- Print A4/Letter: 703×945 is the intersection; cell 28 = 7.4 mm, arc zone 26 = 6.9 mm (a 2 mm pencil bowl fits), lane 64 = 17 mm, glyphH 28 = 7.4 mm. Mono laser: 3 px teal arcs ≈ 60 % grey, the 1 px grid shelf ≈ 25 % grey (visible, not competing), coral dots solid mid-grey; the dotted x-height line prints as in G1-244. Nothing within 14 px of the edge; smallest text 24 px (d3 word) plus the 10 px footer.

## 10. Summary
1. Base = 6 cream cards: picture 56, the word in equal letter cells (Baloo 2 30 px), a blank arc zone on a grid shelf, one school-line lane (glyphH 28) for the hyphenated rewrite; the split is never printed; cells make every boundary exact.
2. Ladder d1 4 cards / 2 syllables / count dots / glyphH 40 → d2 6 / 2-3 / 28 → d3 8 / 2-4 / no picture; `maxLetters = 15 − count`, a 12-letter German word fits at cell 24.
3. Hiding: stamps `data-lcs-split/count/cell`; in-page verify checks self-consistency and empty arc zones; `tools/gate-syllable-split.js` re-reads approved-words; fr mute-e and da policy words refused.
4. Faces: (a) arcs only [PARAM], (b) rewrite rows, (c) vowel king with printed arcs + worked example (refused en/fr), (d) 2-vs-3 sort by writing, (f) which split is right; (e) dropped.
5. New code: `primitives/syllable-arcs.js` (K-318's proposal with modes printed/blank/dotted), `syllableWord`, `syllableArcsForWord`, `hyphenLane`, `vowelDot`, `splitCandidates` in `components-b3.js`, `tools/gate-syllable-split.js`; all else reused.
