# G1-306 `syllable-reading`: design (base + 5 faces), studio A (composition/print) + B (child)

Grounding: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §4, `K-318-sound-boxes.md`, `_work/G1-305-design.md`, renders `out/b2-sweep/G1-244-fruits-d2-en.png`, `K-284-animals-d2-en.png`, `G1-245-animals-d2-en.png`, `out/dev/K-239---d2-en.png`, `page/page.css`, `templates/components-b2.js`, `layouts/card-grid.js`, `primitives/trace-path.js`, `types/k/K-239-sight-words.js`, `K-231-build-the-word.js`, `_shared/lit-word-build.js`, `image-cache/resolve.js`, the eleven `approved-words-<loc>.json` joined to `image-cache/cache/manifest.json` with node (2026-09-13).

## 0. Measured substrate (why the theme axis is OFF)
- Per THEME, words whose `split[0]` is a CV syllable (count >= 2) number 0-13 spread over up to 6 consonants (es around-the-house 35, best consonant c 8; de zoo 8, g 4; fi supermarket 17, m 4). A per-consonant page cannot be filled from one theme in ANY locale, so `themeAxis:{applicable:false}` (K-231 / K-239 precedent); pictures come from the WHOLE approved pool through a key-to-picture index (§5).
- Whole pool, approved keys WITH a cached colour picture (880 pictured keys in the manifest): en 796 · de 725 · es 781 · pt 735 · fr 663 · it 795 · nl 752 · sv 697 · da 305 (K-1 strict) · no 608 · fi 806. Per family, distinct CV first syllables with a pictured word / words: es c 6/76, p 6/48, m 6/30 · pt c 8/59, p 7/45, b 5/32 · it c 5/55, p 5/35 · fr c 8/29, p 7/21, l 7/21 · de k 6/20, g 4/16, m 6/12 · fi p 6/32, k 7/27 · nl k 4/13, r 5/12 · sv p 7/13, k 5/12 · da k 4/10, p 5/10 · no p 6/9, k 3/10. Two carpet rows always reach the 6 distinct syllables the base needs.
- en: 0 CV-initial words fit a carpet; rimes (monosyllables 3-5 letters, rime from the first vowel, >= 3 members): -an can fan pan swan van · -ake cake lake rake snake · -ock clock lock rock sock · -ug jug mug rug slug · -at bat cat hat · -ee bee knee tree · -oat boat coat goat · -ain brain rain train · -ar car jar star · -og dog frog log · -and hand sand wand · -ose hose nose rose · -ail nail snail trail (+ -ay -ed -ow -ox -amp -art -ove). 20 families; picture usability of gray/red/ray UNKNOWN, panel curates.
- Nordic sound-out pools, monosyllables by grapheme count 3/4/5 (nested `chunks` nl/sv/no, letters da): nl 137/128/11 · sv 77/113/30 · da 54/45/17 · no 71/105/32.

## 1. Page concept (base, d2 ships)
"Read the carpet, then find each picture's first piece on it." Top: a white reading carpet, 2 rows x V syllables (es `ma me mi mo mu` / `pa pe pi po pu`), alternating white and tealSoft cells, a dashed read-tick circle at the end of each row the child ticks after reading it aloud. Below: 6 cream cards, a picture over one short school-line lane; the child says the word, finds its first syllable on the carpet and WRITES it. The word is never printed. en: rows are rime families (`b|at c|at h|at`, rime in coral), the lane prints the rime at its right and the child writes the onset. nl/sv/da/no: the same carpet with the panel's open syllables (pools §0) or a refused base (§6). Owned sub-skill: BLENDING from print, the mirror of G1-305. Distinct from K-318 Blend (printed graphemes, circle a picture), K-231 (letter bank), G1-305 (word printed whole, hyphens written), K-221 (first LETTER, no printed rime).

## 2. Layout d2 (exact)
Page 703x945; `.ws-page` padding 0 14 -> inner 675; body ~760 (engineer measures).

```
+---------------- carpet 675x160: white, teal 2px frame r16, padding 12 ----------------+
|  +----+ +----+ +----+ +----+ +----+  ( )   cell 64x64, gap 8, Baloo 2 700 30px ink      |
|  | ma | | me | | mi | | mo | | mu |  tick  white / tealSoft alternating (alphabetStrip) |
|  | pa | | pe | | pi | | po | | pu |  ( )   read-tick: dashed coral circle 28, gap 12    |
+--------- row width 5x64 + 4x8 + 12 + 28 = 392, centred ---------------------------------+
                                     gap 16
+--- card 215x285 ---+ +--- card 215x285 ---+ +--- card 215x285 ---+  cardGrid 3x2, gap 14
|[1]  [picture 128]  | |[2]                 | |[3]                 |  inner 187x257
|   _________________| |   syllableLane     | |                    |  lane 151x60 glyphH 30
|   - - - - - - - -  | |   151x60           | |                    |  school lines inside a
|   _________________| |                    | |                    |  dashed coral frame
+--------------------+ +--------------------+ +--------------------+  row 2 = cards 4-6
```
Vertical: carpet 24 + 128 + 8 = 160; + 16; cards (760 - 176 - 14) / 2 = 285. Card stack 6 + 128 + 12 + 60 + 6 = 212 <= 257. Floors: picture 128, cell 64 >= 44, glyphH 30 >= 28.

Cell width: `cellW = clamp(64, textW + 12, floor((651 - 40 - 8(V-1)) / V))`; font 30 for <= 3 chars (`cha`, `kö`), 26 for 4-5 (en `snake`). fi V = 8 (`ka ke ki ko ku ky kä kö`): 8x64 + 56 + 40 = 608 <= 651. en at cellW 96: V <= 5 (552; 6 would be 656). Wider = refuse the family.

d1: carpet 1 row, cell 72 (block 96); 4 cards 2x2 (330x317, inner 302x289): picture 160, lane 200x72 glyphH 36; stack 256. d3: 3 rows, cell 56 (block 208); 8 cards 4x2 (158x261, inner 130x233): picture 88, lane 126x56 glyphH 26; stack 166.

## 3. Ladder (resolved config)
| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| carpetRows / cell / cellFont | 1 / 72 / 32 | 2 / 64 / 30 | 3 / 56 / 28 |
| cards / cols / rows / pic | 4 / 2 / 2 / 160 | 6 / 3 / 2 / 128 | 8 / 4 / 2 / 88 |
| lane w / h / glyphH | 200 / 72 / 36 | 151 / 60 / 30 | 126 / 56 / 26 |
| minCount / maxCount / maxCellChars | 2 / 2 / 2 | 2 / 3 / 3 | 2 / 3 / 3 |
| distinctSyllables / family / band | true / null / G1 | true / null / G1 | true / null / G1 |

Filter, in order: approved entry `total_agreed >= 3` -> `/^\p{L}+$/u` -> pictured key (`excluded(key, loc)` applied) -> `count` in bounds -> `split[0].toLocaleLowerCase(loc)` is a cell of the rendered carpet -> da `policy_managed !== true` -> fr mute-e refusal (G1-305 §6) -> `distinctByWord` -> distinct `split[0]`. `sampleEntries(rng, pool, d.cards, 'G1-306')` throws on a short pool (refusal recorded). `family` = index into the locale's ordered `families` (fan lever, the per-letter mills "familia silábica letra b"); carpet = families `[family .. family + carpetRows - 1]`.

## 4. Answer-hiding + uniqueness
- Stamps: card `data-lcs-word` (display form), `data-lcs-vocab`, `data-lcs-syllable` (= `split[0]` lowercased; en = the onset), `data-lcs-count`, `data-lcs-face="base|colour|circle|join|dictation|ladder"`; carpet `data-lcs-carpet` + `data-lcs-cells="ma|me|...|pu"` (+ en `data-lcs-rime` per row); lane `data-lcs-syllable-lane`.
- The word is never printed. The carpet prints syllables (en `onset|rime` cells): the child must READ to locate the right one, the same scaffold class as a word bank. The lane's printed rime (en) is task, not answer.
- `verify(page)`: the stamped syllable is in `data-lcs-cells` exactly once; cells distinct; card syllables distinct; visible card text empty (en: only the rime, `=== word.slice(syllable.length)`); lanes == `d.cards`; `img.naturalWidth > 0`; carpet width <= 651; read-ticks == carpetRows and unfilled.
- `tools/gate-syllable-reading.js` (node, post-render): re-reads `approved-words-<loc>.json`, asserts `data-lcs-syllable === split[0].toLocaleLowerCase(loc)` and `count`, key approved (da strict), carpet cells equal the panel literals. Poison: mutate one stamp -> FAIL.
- Face (b) two-valid-syllables guard: pills are 2-letter cells of the SAME row (same consonant); a word has one approved `split[0]`, so `me` beside `ma` for *mano* is unambiguous. Excluded: words whose `split[0]` is not a 2-letter cell; any pill that is a spelled prefix of the word (`word.startsWith(pill)` with pill != syllable). Correct index varies page-wide.

## 5. Primitives and components
Reused: `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-lane .ws-pill .ws-tile .ws-tilerow`; `alphabetStrip` cell styling as the visual model; `writingRow` + `schoolLines` (`trace-path.js`); `rulingBlock({rows:1,w,h,glyphH})` (face c); `wordTiles({tokens,fontPx,tileH})` (face c); `pillChoice({items,fontPx})` (face b); `svgRoot roundedRect circle label line el esc`; `displayWord excluded distinctByWord sampleEntries` (`lib/b2-common.js`); `fileUri manifest` (`resolve.js`); tokens `T.teal T.tealSoft T.coral T.white T.ink T.grid`, `codeColors` (face a only). NOT used: `letterBoxes` (leaks length), `soundBoxes` (K-318's grapheme apparatus), `syllableArcs` (G1-305's), `strokeWordLane`, `countBadge`.

NEW in `templates/components-b3.js`:
- `syllableRow({cells, cell=64, cellW, gap=8, fontPx=30, tick=true, rime=null})` -> svg h `cell`, w `V*cellW + (V-1)*gap + (tick?40:0)`; per cell `roundedRect{r:10, fill: i%2 ? T.tealSoft : T.white, strokeColor:T.teal, strokeWidth:2}` + centred `label` Baloo 2 700 `T.ink`; en: onset tspan `T.ink` + rime tspan `T.coral` with a 1 px `T.grid` seam; tick = `circle r14 fill T.white stroke T.coral 2.5 dash '5 4'` `data-lcs-readtick`. Stamps `data-lcs-row`, `data-lcs-cells`.
- `syllableCarpet({rows, ...rowOpts})` -> `<div data-lcs-carpet>` white panel (`roundedRect` frame `T.teal` 2, r 16, padding 12, row gap 8), rows centred; `carpetRows:0` renders nothing.
- `syllableLane({w, h, glyphH, printed=null})` -> `writingRow({w,h,glyphH,xHeight:true}).svg` inside a dashed `T.coral` 2.5 r 10 white frame; `printed:{text}` draws the en rime as `label` Baloo 2 700 `0.9*glyphH` `T.coral`, anchor end, at the right; writable width `w - textW - 12` (>= 60 or refuse). Stamps `data-lcs-syllable-lane`, `data-lcs-printed`.
- `syllableJoin({tokens, fontPx=26, tileH=44})` -> `wordTiles` with a `T.teal` "+" 26 px `<span>` between tiles in `.ws-tilerow`; stamp `data-lcs-join=n`.
- `familyLadder({rungs:[{kind, items:[{src,text,rime?}]}], w, h})` -> N `.ws-lane` rows; item = picture 56 + word Baloo 2 700 26 (22 when > 9 letters; en `onset|rime` tspans; Nordic letter-spacing 1 px); carpet rung = a `syllableRow` at cell 56; read-tick 36 at the right; stamps `data-lcs-rung`, `data-lcs-ladder-word`.
- `colourRing({color})` -> `circle r20 fill codeColors[color] stroke T.teal 2`, `data-lcs-colour`.
NEW `lib/b3-picture-index.js`: `pictureIndex()` = `vocabKey -> [{theme, noun, px}]` from `manifest().themes`, skipping dirs `/\bbw$/i` (9 cached); `pictureFor(rng, key, loc)` applies `excluded`; rendered with `fileUri(theme, noun)`.

## 6. Locale slot structure
`data/b3/syllable-reading.js` per locale (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`, checked by `tools/validate-b3-draft.js`): `{ unit:'syllable'|'onset', carpetCase:'lower', families:[{id:'m', cells:['ma','me','mi','mo','mu']}, ...] (ordered; first = the canonical first family), rimes:[{rime:'at', onsets:['b','c','h']}] (en), ladder:'carpet'|'soundout'|null, refuse:[keys], exclude:[keys] }` + `strings.<loc>.json` `{title, instruction}` per id, `skill-sentences` key `syllable-reading`, taxonomy slug/name, `topicMeta`. Membership is EXACT equality of `split[0]` with a cell: every accented or digraph start the panel wants is its own cell; `tools/gen-b3-syllable-reading-draft.js` lists per family the `split[0]` values in the pool with counts so cells are authored from data.
- **es**: m p t l s d n b first; digraph rows `cha che chi cho chu`, `lla lle lli llo llu`, `ña ñe ñi ño ñu` (3-char cells fit 64 at 30 px); c as `ca co cu` + `ce ci` per the panel. Head: silabario / sílabas ma me mi mo mu.
- **pt**: `ba be bi bo bu` first (família silábica, never "família de palavras"); `nh lh ch` rows optional; `cé câ cô` need cells or stay excluded.
- **it**: `ci ce` vs `chi che` distinct cells. **fr**: lecture de syllabes; accented cells `pé pê té mé` authored explicitly; mute-e refusal as G1-305.
- **de**: carpet lowercase (Silbenteppich), the child writes `Ku` with the noun's capital; verify lowercases; umlaut cells `kä kü kö`; instruction says "groß".
- **fi**: 8-vowel rows, V 8 fits; long vowels (`kaa`) are 3-char cells at d3 only; title bare nominative (`tavutaulukko`), `[NSR-FLAG][fi]`.
- **en**: `unit:'onset'`; rows = rime families, cells `onset|rime`; lane prints the rime; (c) joins `c + at`; ladder = 5 families x 3 pictures.
- **nl/sv/da/no**: open-syllable rows from the pools (nl k 4/13, sv p 7/13, da k 4/10, no p 6/9): a 2-row base is feasible but thin; the panel may REFUSE the base and (a)(b)(c) (recorded) and ship (d) + the sound-out ladder (e) under the locale head (lydrette ord, ljuda ord, lydering, zoemend lezen). da K-1 strict pool only; citation singular, no definite forms.

## 7. Five faces (ids `G1-311+ (TBD by the emitter)`; band G1)
Hub contract: `apps.syllable-reading` in `topics-taxonomy.json`; `axes['exercise-type'].syllable-reading.slug/name` x11; one landing per face per locale with `coordinate.type === 'syllable-reading'`, a band-table level, unique slug, `canonicalDeckSlug`; gate `scripts/verify-hub-type-rows.js` expects 6 rows per key per locale. Each face differs from base d2 in RESOLVED config (`tools/gate-variation-distinct.js`); guards key on `d.colourMode / d.choices / d.join / d.carpetRows / d.ladder`, never the level index.

(a) **Syllable Carpet, colour the syllable** (CODE `colourMode:true`): carpet 5 rows x V at cell 56 (block 336) + 16 + 6 cards 3x2 in 408 (215x197, inner 187x169): picture 100 + 10 + `colourRing` 40. The child reads the whole carpet, then colours each picture's first syllable in that picture's colour. Config `{carpetRows:5, cell:56, cards:6, cols:3, rows:2, pic:100, colourMode:true}`; 6 distinct `codeColors`. Verify: no lane; rings distinct; every cell fill is white/tealSoft; syllables distinct and on the carpet. Query face: Silbenteppich / tableau de syllabes / silabario para colorear / tavutaulukko (the carpet-first A heads).

(b) **Circle the first syllable** (CODE `choices:3`): carpet 1 row (96) + 16 + 6 cards 2x3 (330x206, inner 302x178): picture 96, `pillChoice` 3 pills h 44 Baloo 26 (3x72 + 28 = 244). No lane. Distractors per §4; en: onset pills + the rime printed after the row in coral. Config `{carpetRows:1, cards:6, cols:2, rows:3, pic:96, choices:3, maxCellChars:2}`; `data-lcs-choice` per pill. Verify: exactly one pill == syllable; pills distinct; correct index varies. Query face: encierra la sílaba / entoure la syllabe / Silbe ankreuzen.

(c) **Join the syllables** (CODE `join:true`): no carpet; 6 cards 2x3 (330x244, inner 302x216): picture 80 + 8 + `syllableJoin` tiles in `split` order (`ma + no`) 44 + 8 + `rulingBlock({rows:1, w:302, h:64, glyphH:28})` = 216. Read the pieces, write the word joined. Config `{carpetRows:0, cards:6, cols:2, rows:3, pic:80, join:true, minCount:2, maxCount:2}` (d3 2-3). Verify: tokens join to the word, tile order == split order, no whole word printed, lane present. Boundary: K-231 scrambles LETTERS; K-318 Blend prints grapheme boxes and circles a picture; G1-305 (b) prints the word and writes hyphens; here pieces in, whole word out. Query face: une las sílabas / Silben zusammenziehen / assemble les syllabes.

(d) **Syllable dictation strip** (PARAM `{...base.difficulty[2], carpetRows:0, cards:8, cols:2, rows:4, pic:96, lane:{w:170,h:60,glyphH:28}}`): 8 cards (330x179, inner 302x151): picture 96 left + 12 + lane 170. No carpet: the child (or the teacher dictating) writes the first syllable unaided. Verify: no `[data-lcs-carpet]`, 8 lanes. Query face: dictée de syllabes / dictado de sílabas / Silbendiktat.

(e) **Reading ladder** (CODE `ladder:'carpet'|'soundout'`): 5 full-width `.ws-lane` rungs, h (760 - 48) / 5 = 142, inner 643x118; 3 items (picture 56 + word 26 px) + tick 36: 3x194 + 48 = 630 <= 643 (> 9 letters 22 px; > 12 letters 2 items). Carpet locales: rung 1 = the family row, rungs 2-3 two-syllable words on that row, rungs 4-5 three-syllable (es/pt/it/fi pools >= 20 per family; de k 20, the 3-syllable share UNKNOWN, engineer measures; refuse below 6). en: 5 rime families x 3 words. Nordic `soundout`: rungs by grapheme count 3/3/4/4/5, whole pool. Open-ended reading: no answer verify; data verify only (all words approved, counts/graphemes per rung, distinct, ticks present, no lanes). Config `{carpetRows:0, cards:0, ladder, rungs:5, perRung:3}`. Query face: Leseleiter / escalera de lectura / lydrette ord / ljuda ord / lydering / zoemend lezen (the Nordic heads live HERE).

Proposed sixth, reserve, better than (e) on verifiability: (f) **Which picture starts with it?** (CODE `pictureChoice:3`): 6 cards, a printed syllable pill (Baloo 30) + 3 pictures 72; circle the picture whose word starts with it; distractors from other rows. Verify: exactly one of 3 has `split[0] === syllable`. Use it wherever a locale refuses one of (a)-(e) so every locale still ships 6 rows.

Rejected: theme swap; scrambled syllables (a 2-syllable word is ALWAYS swapped, the child learns the trick); "long words" (a range); trace the syllable (K-284); write the whole word (G1-244); capital carpet; d1/d3 re-labelled.

## 8. Alternatives + recommendation
- Alt A, theme axis on: refused by §0 (best consonant per theme 8 words, most 1-4); a theme fan would mix consonants and lose the family head.
- Alt B, K-318 row shape (6 rows, picture left, carpet on top): rows 76 leave a lane 40, glyphH 20 < 28; rejected, its logic is face (d).
- Alt C, carpet as a `wordBank` of pills: wraps and loses the row-by-vowel reading order that IS the pedagogy; rejected.
- Recommendation: carpet-over-cards base (§2), ladder §3, faces §7, (f) as the reserve.

## 9. Risks, mitigations, print check
- A carpet cell starting no pictured word is allowed (the carpet is read, not solved); a cell never used type-wide is a panel note.
- Exact-match membership excludes accented/digraph starts silently: the draft aid prints them per family so the panel authors cells from data.
- en rimes are NEVER derived from spelling: panel `rimes` literals gated by `count === 1`, approved, `word.endsWith(rime)`, onset = remainder; colour-word pictures via `exclude`.
- de capital vs lowercase carpet: verify lowercases; the instruction names it once.
- Nordic thinness: refusals recorded; the type ships (d) + (e) + (f) there.
- Lane width: `cha`/`kö` 3 glyphs ~72 px <= 139 writable; en 2-glyph onsets beside the rime, writable >= 60 asserted.
- Palette: teal frames, tealSoft alternation, coral ticks/lanes/rime, ink text, cream cards, `codeColors` rings in (a) only.
- Print A4/Letter: cell 64 = 16.9 mm, syllable 30 px ~7.9 mm, lane 60 = 15.9 mm with glyphH 30, tick 28 = 7.4 mm. Mono laser: tealSoft ~10 % grey (visible banding), teal frame ~60 %, dashed coral ~45 %; en coral rime prints mid-grey beside ink onsets, the 1 px seam keeps the split legible. Nothing within 14 px of the edge; smallest text 22 px (ladder long words), body otherwise >= 26.

## 10. Summary
1. Base = a 2-row syllable carpet (cells 64, Baloo 2 30, read-tick per row) over 6 picture cards with one school-line lane (glyphH 30) for the first syllable found on the carpet; en rows are rime families with the rime printed on the lane; the word is never printed.
2. Theme axis OFF (per-theme CV pools 0-8 per consonant); pictures from the whole approved+pictured pool via `lib/b3-picture-index.js`; `family` is the fan lever.
3. Hiding: stamps `data-lcs-syllable/word/cells`; in-page verify = membership exactly once + empty lanes/ticks; `tools/gate-syllable-reading.js` re-reads approved `split[0]`; (b) pills are same-row cells, never a spelled prefix.
4. Faces: (a) 5-row carpet + colour [CODE], (b) circle among 3 [CODE], (c) join two printed syllables and write the word [CODE], (d) dictation strip [PARAM `carpetRows:0`], (e) reading ladder incl. en word families and Nordic sound-out rungs [CODE]; (f) syllable-to-picture choice as reserve.
5. New code: `syllableRow`, `syllableCarpet`, `syllableLane`, `syllableJoin`, `familyLadder`, `colourRing` in `components-b3.js`, `lib/b3-picture-index.js`, `tools/gate-syllable-reading.js`, the draft aid; no new arc/box primitive (`soundBoxes`, `syllableArcs` untouched).
