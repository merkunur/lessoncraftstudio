# G1-307 `opposites`: design (base + 5 faces), studio A (composition/print) + B (child)

Grounding: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §6; renders `out/b2-sweep/G1-245-animals-d2-en.png`, `G2-275-toys-d2-en.png`, `G1-249-animals-d2-en.png`, `K-287-fruits-d2-en.png`, `out/batchB/K-032-animals-d2-en.png`; `page/page.css`, `templates/components.js`, `templates/components-b2.js`, `templates/layouts/card-grid.js`, `primitives/trace-path.js` (`writingRow`), `types/_shared/size-compare.js`, `types/_shared/lit-vocab-match.js` (`.ws-match` usage, derangement), `types/g2/G2-275-word-classes.js`, `data/b2/word-classes.js` + `sentences.js` (node, 2026-09-13), `lib/b2-common.js`.

## 0. Measured substrate
- Adjectives in `word-classes.js` (citation forms, lowercase x11): en 28 · de 30 · es 30 · fr 30 · pt 32 · it 30 · nl 30 · sv 30 · da 30 · no 31 · fi 28. Complete antonym pairs already inside: big/small, hot/cold, fast/slow in all 11; loud/quiet in en/de/fi; no `kort/lang` `lett/tung`; fr `propre/sale`. The bank is a SEED: the panel authors ~20 pairs (both members) in the same form.
- Picture-able pairs (via `entriesFor`): SCALE big/small (any noun, uniform scale; art is never stretched, so tall/short, long/short have no picture) · WEATHER hot/cold (`sun`/`snowflake`; the `hot`/`cold` pictures are UNKNOWN until opened) · FACES happy/sad (`emotions`; `tired`/`angry`/`scared` exist, their opposites do not). Three kinds. open/closed, full/empty, wet/dry, day/night, left/right: no art. A coral X means "crossed out", mirroring means "facing": both refused as state cues.
- Consequence: a picture-pair BASE repeats big/small on 5 of 8 cards and collapses into comparing-sizes (K-032..037, the big-small app). The base is LEXICAL; pictures are a cue layer where honest (d1, Faces 2 and 3).
- `wordBank` pill: 18 px Nunito 800, padding 6/14, gap 10; 8 words of 5-9 letters = 2 rows ≈ 110-122 px. `writingRow({h:64,glyphH:28})` holds ~14 glyphs at ~21 px (G1-305 estimate; engineer measures a G1 hand).

## 1. Page concept (base; d2 ships)
"Read the word, write its opposite." A shuffled bank of the eight answers across the top; eight cream cards (2x4), each printing ONE adjective in Baloo 2 beside a small teal flip-arrow, with a school-line lane where the child writes the opposite. Direction is random per card (big -> small here, small -> big there), so neither member is "the answer word". No pictures at d2. Owned skill: PRODUCING the antonym in writing (L.1.5.d; de Gegenteil finden; es/pt antónimos). Distinct from K-032..037 (visual size), K-225 (picture <-> word), G2-275 (word class), G1-244 (spell a pictured noun).

## 2. Layout d2 (exact)
Page 703x945; `.ws-page` padding 0 14 -> inner 675; body ≈ 760.
```
+------------------------------- bank 675 x <=122 -------------------------------+
| ( small ) ( cold ) ( slow ) ( quiet ) ( tall ) ( wet ) ( heavy ) ( sad )       |
+--------------------------------------------------------------------------------+
+--------- card 330x145 ---------+  +--------- card 330x145 ---------+
|[1]  <=>  big                   |  |[2]  <=>  hot                   |  word Baloo 2 700 28, ink
|     ______________________     |  |     ______________________     |  writingRow 302x64 glyphH 28
|     - - - - - - - - - - -      |  |     - - - - - - - - - - -      |
|     ______________________     |  |     ______________________     |
+--------------------------------+  +--------------------------------+
                      4 rows x 2 cols, gap 14
```
- Bank: `wordBank({words: shuffled answers, wordPx:18})` (`components-b2.js:210`). Budget 122 (2 rows); build guard: estimated pill widths (`26 + 0.62*18*len + 10`) summing past 2 x 651 -> throw -> refusal, never a 3rd row.
- Grid: `cardGrid({cols:2, rows:4})` in 760 - 122 - 14 = 624 -> row 145 -> inner **302x121**. Stack: word line 34 + 8 + lane 64 = 106 <= 121, centred.
- Card: `<div class="ws-card-stage" style="flex-direction:column;padding:4px 0" data-ws-content data-lcs-pair data-lcs-a data-lcs-b data-lcs-dir>`; line 1 = `oppositeArrow()` 36x20 + `<span data-lcs-given>` Baloo 2 700 28 px; line 2 = `writingRow({w:302,h:64,glyphH:28,xHeight:true}).svg`. Word >= 26 floor; 8 items in G1 6-12.
- `maxLetters 12` on both members (given: 12 x ~15 px + arrow 48 <= 302; written: ~14 glyphs); longer pairs drop out of d2, recorded.

d1: 6 cards 2x3 (row 198, inner 302x174): line 1 = `pairCard` 160x88 (both states) where the pair has `pic` (<= 3 cards: big/small on a bank noun, hot/cold, happy/sad), else the arrow; 88 + 8 + 64 = 160. Tier 1, bank on.
d3: 10 cards 2x5, no bank (row 140, inner 116: 30 + 6 + 64 = 100), tiers 1-2, no cue, word 26 px, from memory.

## 3. Ladder (resolved config; guards on the config, never the level index)
| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards/cols/rows | 6/2/3 | 8/2/4 | 10/2/5 |
| bank / cue | true / true (where `pic`) | true / false | false / false |
| tiers | [1] | [1,2] | [1,2] |
| wordPx / glyphH / laneH | 30 / 28 / 64 | 28 / 28 / 64 | 26 / 28 / 64 |
| maxLetters / minPerDir | 10 / 2 | 12 / 3 | 12 / 4 |
| band | G1 | G1 | G1 |

Pool: `OPPOSITES[loc].pairs` by tier, both members `/^\p{L}+$/u` and `<= maxLetters`, distinct keys; sample-or-throw (`lib/b2-common.js:64` pattern, `who:'G1-307'`); `dir` per card by `rng`, re-rolled until each direction >= `minPerDir`. `themeAxis:{applicable:false}` (K-317 precedent; a theme would only change the d1 scale noun). Fan lever = `variantsPerType` re-sampling 8 of ~20 pairs; the wave ships variant 1.

## 4. Answer-hiding + uniqueness
- The written word appears ONLY in the bank, never on its card. Hidden stamps (G1-244 precedent): `data-lcs-pair` (bank key `big-small`), `data-lcs-a`/`data-lcs-b` (bank order), `data-lcs-dir` (`ab` = a printed), `data-lcs-given`, root `data-lcs-face="base|match|frame|pairup|odd|prefix"`.
- `verify(page)`: card text === `given` only; `given === (dir==='ab' ? a : b)`; bank set === the 8 answers, no bank word equals a given; pair keys unique; no word twice in one role; both directions >= `minPerDir`; one empty `[data-lcs-prim="writing-row"]` per card; d1 cue `data-lcs-cue-key === data-lcs-pair`; svg widths <= 302.
- `tools/gate-opposites-data.js` (NEW, node; `page.evaluate` cannot require): every stamped `(pair,a,b)` is a bank pair VERBATIM; `a !== b`; no word in two pairs; `family` set. Poison: stamp `small -> little` -> FAIL.
- Match: right column `rng.shuffle` until `order.every((v,i) => v !== i)` (`lit-vocab-match.js:44`); a 20-seed gate sweep asserts no pair's right index is constant. Odd one out: exactly one intruder per row (§7).

## 5. Primitives and components
Reused: `cardGrid`; `.ws-card .ws-card-badge .ws-card-stage .ws-lane .ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right) .ws-pill .ws-nchip .ws-tile(--word) .ws-tilerow .ws-scene-banner .ws-bank .ws-bankword .ws-icon`; `writingRow({w,h,glyphH,xHeight})`; `wordBank`, `wordTiles({tokens,order,fontPx,tileH,extraClass})`; `svgRoot roundedRect circle line el label esc`; `fileUri`; `SENTENCES[loc].names`; tokens `T.teal T.coral T.ink T.grid T.white`, `F.display F.body`. NOT used: `answerBox` (invites a numeral), `pillChoice` (no per-item stamp), `mirrorGroups`, `displayWord` (adjectives are never capitalised).

NEW in `templates/components-b3.js`:
- `oppositeArrow({w=36,h=20})`: two opposed arrows on one shaft (`M4 7 H32` head left; `M32 13 H4` head right), `T.teal` stroke 3 round caps, `<svg data-lcs-opp-arrow aria-hidden>`; 48x24 as the pair-up separator.
- `pairCard({picA:{theme,noun}, picB, transformB:'scale'|'none', size=80, w=160, h=88, cueKey})`: white tile (`roundedRect` r 12, `#F0E4CB` 2) with two `.ws-icon` baseline-aligned (`align-items:flex-end`, K-032 idiom): `scale` -> A `size`, B `round(size*0.55)` = 44, never below 44; `none` -> both 64. No mirror, X or opacity. Stamps `data-lcs-cue-key/-a/-b`; empty alt.
- `matchColumns({left:[{html,key}], right:[{html,key}], itemH, leftW=250, rightW=250})`: `.ws-match` (padding 6 30) > two `.ws-match-col`; left `.ws-match-item` cream `data-lcs-left=key` + dot `--right`; right `--plain` white `data-lcs-right=key` + dot `--left`; caller passes the deranged order.
- `frameRow({cue, neg, pos, laneW=200, laneH=56, glyphH=28, fontPx=19})`: `.ws-lane` (padding 8 16): cue slot 64 (empty if null); Nunito 800 19: line 1 `neg`, line 2 `pos` with an inline `writingRow` at `{blank}` + the end mark. `data-lcs-frame`.
- `prefixChips({prefixes, px=22})`: `.ws-scene-banner` legend of `.ws-nchip` 44-high pills (`un-`, `dis-`), `data-lcs-prefix`; a legend, never an answer.
- `oddRow({options:[{word,key}], px=24})`: `.ws-lane` with three white `.ws-pill` h 48, 24 px, gap 14, `data-lcs-opt=key data-lcs-word`.

## 6. Locale slot structure
`data/b3/opposites.js` (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`, the b2 pattern), per locale:
```
{ pairs:[{key:'big-small', a:'big', b:'small', family:'size', tier:1,
          pic: {kind:'scale', theme:'animals', noun:'elephant'} | {kind:'pics', a:{theme:'weather',noun:'sun'}, b:{theme:'weather',noun:'snowflake'}} | null,
          synonyms:{a:['large'], b:['little','tiny']}}],
  frame:{neg:'{name} is not {adj}.', pos:'{name} is {blank}.'}, frameNames:[{n:'Mia',g:'f'},{n:'Ben',g:'m'}],
  prefixes:['un','dis'], prefixPairs:[{base:'happy', prefix:'un', form:'unhappy', irregular:false}] }
```
- Citation form = the `word-classes.js` adjective convention: es/pt/it/fr MASCULINE singular; de lowercase (adjectives are not nouns; `displayWord` not called); nl base form (no -e); sv/da/no INDEFINITE common (`stor`, never `stora`/`det stora`); fi nominative (`iso`). No noun is printed on the base, so nothing agrees with a picture; the d1 cue noun is a picture only.
- Frames (Face 3) carry `{name}` and `{adj}` ONLY; copula and negation live in the literal (fr `n'est pas`, fi `ei ole`, sv `är inte`). Predicative adjectives are uninflected in de/nl/fi and common-gender with a person subject in sv/da/no, so the citation form drops in unchanged EXCEPT es/pt/it/fr, where masc. forces `g:'m'` names unless the panel authors `af`/`bf` feminine forms. Two `{name}` in a frame are the SAME child; repeat the name, never a pronoun.
- en trap: the member is `small`; `little`/`tiny` sit in `synonyms.b` so they never intrude. Title base "Opposites" (K/G1 head); Face 4 may say "Antonyms" (2nd-grade head); es/pt titles carry antónimos/antônimos; de Gegenteile / Gegensatzpaare. Titles never contain the worksheet word, <= 70, unique in band.
- Refusal is data: < 8 tier-1/2 pairs <= 12 letters refuses d2 (none expected); Face 6 refuses under 6 `prefixPairs`.

## 7. Five faces (ids `G1-311+ (TBD by the emitter)`, band G1)
Hub contract: `apps.opposites` (`default_subject:'letters'`, `default_age_range:'6-8'`, `exercise_type_axis_key:'opposites'`) + `axes['exercise-type'].opposites.{slug,name}` x11 in `topics-taxonomy.json` (measured 2026-09-13: neither exists); one landing per face per locale with `coordinate.type === 'opposites'`, a band-table level, unique slug, `canonicalDeckSlug`; gate `scripts/verify-hub-type-rows.js` expects 6 rows per key per locale. Each face differs from base d2 in RESOLVED config (`tools/gate-variation-distinct.js`). All five are CODE faces (`layout` knob + `verify` branch; base byte-identical).

Which five: (b) IS the base (bank-supported "write the opposite" is the G1 genre everywhere). (a) picture-pair match is unbuildable (3 honest picture kinds, §0); it survives as Face 2, word <-> word with a picture cue on those pairs. (d) keeps its move but the child WRITES the pairs: 12 scattered chips joined by lines cross inside a 3x4 block and cannot be read back. (e) is re-stated so "exactly one non-opposite" is true: two opposites + one intruder. (f) exists in all 11 (en un-/dis-, de un-, es/pt des-/in-, fr in-/dé-, it s-/in-, nl on-, sv o-, da/no u-, fi epä-), with a data refusal under 6 pairs. Proposed but deferred: "Same or opposite?" for es/pt/it (the head is always sinónimos y antónimos); it needs a synonym bank nobody has authored.

### Face 2: Match the Opposites (`layout:'match'`)
Move: RECOGNISE the antonym (reading, no writing; the entry rung). `matchColumns` with 6 pairs, itemH = floor((748 - 80)/6) = 111; left 250x111 = `[cue 64][word Baloo 26]`, cue = the STATE-A picture only (sun for hot, happy face); scale pairs get NO cue (the same noun both sides is solvable by picture identity without reading); right 250x111 = word only, deranged. Config `{layout:'match', pairs:6, cue:'stateA', wordPx:26, tiers:[1]}`; d1 4 pairs (itemH 175, cue 88); d3 8 pairs (80, no cue, 22 px). Verify: 6/6 keys, derangement, no picture on the right, no word on both sides. Query face: "match the opposites" (Gegenteile verbinden, une los antónimos, yhdistä vastakohdat). Boundary: K-225 matches picture to word.

### Face 3: Opposite Sentences (`layout:'frames'`)
Move: use the antonym in a sentence frame; cue = the state-B picture (happy face for "not sad") where honest, else the frame alone forces the answer. Bank of 6 (one row ≈ 70) + 6 `frameRow` lanes h 105 (inner 85 at padding 8): 22 + 4 + 56 = 82. Text budget 639 - 76 = 563 px ≈ 50 chars per line; `Emma ist nicht fröhlich.` = 24. Names <= 4 letters, each once per page, `g:'m'` in es/pt/it/fr. Config `{layout:'frames', rows:6, bank:true, cue:'stateB', glyphH:28}`; d1 4 rows; d3 7 rows no bank (8 rows = 784 > 760; glyphH never drops below 28). Stamps `data-lcs-frame data-lcs-pair data-lcs-a data-lcs-b`; verify: `neg` contains `a` not `b`, `pos` contains no adjective, same name in both, bank === answers. Query face: "opposites in sentences" (Gegenteile im Satz, le contraire dans la phrase). Boundary: G1-249 orders words; here one adjective slot.

### Face 4: Find the Opposite Pairs (`layout:'pairup'`)
Move: nothing given: sort 12 mixed words into 6 pairs and WRITE each pair. `wordTiles({tokens:12, order, fontPx:20, tileH:44, extraClass:'ws-tile--word'})` centred, flex-wrap (≈ 110); then 6 badge-numbered `.ws-lane` rows h 74 (padding 5 -> inner 64): `[writingRow 260x64][oppositeArrow 48x24][writingRow 260x64]` = 30 + 260 + 12 + 48 + 12 + 260 = 622 <= 639; total 110 + 16 + 444 + 50 = 620. Shuffle: a pair's chips never adjacent (|i - j| >= 2). Config `{layout:'pairup', pairs:6, tiers:[1,2], fontPx:20}`; d1 4 pairs (lanes h 90); d3 8 pairs (16 chips, 8 rows h 64: 130 + 512 + 56 = 698). Stamps: chip wrapper `data-lcs-word data-lcs-pair`; verify: 12 chips = 6 keys x 2, adjacency rule, lanes empty, each word in one pair. Query face: "opposite pairs" (Gegensatzpaare, motsatspar, empareja los antónimos). Boundary: Face 2 gives the left column.

### Face 5: Odd One Out (`layout:'odd'`)
Move: JUDGE: three words, two are opposites, one intrudes; cross it out (the pencil X is the child's). 6 `oddRow` lanes h 118, three pills of <= 10 letters ≈ 598 <= 639 (`maxLetters:10`); no head pill (a head would make it Face 2 with chips). Intruder: a different `family` than the row's pair, not in either member's `synonyms`, not paired with either member; position varies, each of three positions used >= 1. Config `{layout:'odd', rows:6, tiers:[1,2], maxLetters:10, pillPx:24}`; d1 4 rows tier 1; d3 8 rows (pill 40/22). Stamps per pill `data-lcs-opt data-lcs-word`, row `data-lcs-pair data-lcs-intruder`; verify: exactly two pills share the row key, the third differs in family and is not a synonym, 6 distinct row pairs, no word twice. Query face: "odd one out opposites" (welches Wort passt nicht, cuál no es antónimo, mikä ei kuulu joukkoon). Boundary: K-235 sorts pictures by category; here the odd word breaks an antonym pair.

### Face 6: Make the Opposite with a Prefix (`layout:'prefix'`; en L.1.4.b; band per panel, fi likely 2. luokka or REFUSED)
Move: form the antonym MORPHOLOGICALLY (`happy -> unhappy`, `feliz -> infeliz`, `ystävällinen -> epäystävällinen`). `prefixChips` legend (60) + 6 `.ws-lane` rows h 100: `[base Baloo 28, col 240][oppositeArrow][writingRow 300x64]` = 612; 60 + 14 + 600 + 50 = 724. Config `{layout:'prefix', rows:6, glyphH:28, showLegend:true}`; d1 4 rows single-prefix words; d3 8 rows no legend (h 84). Pool `prefixPairs` >= 6 or REFUSED (recorded). Stamps `data-lcs-base data-lcs-prefix data-lcs-form data-lcs-irregular` (form hidden); verify: no form visible; `form === prefix + base` unless `irregular` (es `posible -> imposible`, authored + gate-listed); legend === prefixes used; a base word is not also a printed pair member elsewhere. Query face: "opposites with un-" (Gegenteil mit un-, le contraire avec in-/dé-, tegenstelling met on-). Boundary: G2-315 spelling rules; G2-316 compounds.

Rejected non-moves: theme swap (no axis) · picture-only "big or small?" (K-032 / the app) · a K picture-opposites page (needs staged state art open/closed, full/empty, day/night: a scope gap like K.G.A.1, recorded, never faked) · scattered chips joined by lines · "harder words" (= d3 tiers) · agreement drills (grammar, not antonymy) · d1/d3 relabelled.

## 8. Alternatives + recommendation
- Alt A, picture-pair base (the task's §2 sketch, 6 cards 1.0 vs 0.55, write both words): only big/small scales; with hot/cold and happy/sad that is 3 cards, cards 4-6 repeat big/small on a new noun. Rejected; `pairCard` survives as the d1 cue and the Face 2/3 cues.
- Alt B, six full-width rows `[pairCard 160][word][arrow][lane 260]` (K-287 shape): 3 of 6 cue zones empty at d2, lane 260 < 302. Rejected.
- Alt C, the two-column match as base: the base must own the bare head ("write the opposite"); matching is the scaffold rung. Rejected, kept as Face 2.
- Recommendation: §2 bank + 2x4 lexical cards, ladder §3, faces §7.

## 9. Risks, mitigations, print check
- A word in two pairs (`fast/slow`, `slow/quick`): gate rule "one word, one pair"; the panel picks one partner, the rest go to `synonyms`.
- Bank 3rd row (fi/de long words): build guard throws -> refusal; `wordPx` never below 18.
- Frame gender (es/pt/it/fr): masc. names only unless `af`/`bf` authored; the validator asserts `g:'m'` there.
- Direction bias: `minPerDir` re-roll + verify. Intruder ambiguity (cold/cool): family + synonyms rule; the panel reviews `tools/list-odd-triples.js` output and bans by key.
- Picture honesty: the panel OPENS every cue picture (`weather/hot`, `weather/cold`, `emotions/happy`, `emotions/sad`, the d1 scale noun); a picture that does not show the state loses its `pic`.
- Palette: teal arrows/pills, coral dots, cream cards, grid rulings, ink text; no new hex. `qa/lints.js`: smallest text 18 px (bank) + the 10 px footer; every stage/lane stamps `[data-ws-content]`.
- Print (703x945): scaled cue B = 44 px = 11.6 mm (at the floor); lane glyphH 28 = 7.4 mm in 64 = 17 mm; `.ws-pill` 48 = 12.7 mm for a pencil X; 3 px teal arrows ≈ 60 % grey on mono laser; no meaning rides on colour (the intruder is unmarked, match dots are positions); `pairCard` uses no opacity, X or mirror, so B&W is lossless; nothing within 14 px of the edge.

## 10. Summary
1. Base = a shuffled bank of 8 answers + eight 2x4 cream cards, each printing one adjective (Baloo 28) with a teal flip-arrow and a school-line lane (glyphH 28); direction random per card; no pictures; the written word never appears on its card.
2. Ladder d1 6 cards + `pairCard` cues where honest (only big/small, hot/cold, happy/sad exist) -> d2 8 cards, tiers 1-2, `maxLetters 12` -> d3 10 cards, no bank.
3. Hiding: `data-lcs-pair/a/b/dir` stamps; in-page verify checks self-consistency, bank === answers, derangement, intruder rules; `tools/gate-opposites-data.js` re-derives every pair from `data/b3/opposites.js` verbatim.
4. Faces: 2 match (word <-> word, state-A cue) · 3 sentence frames (`{name}`/`{adj}` only, masc. names in es/pt/it/fr) · 4 write the 6 pairs from 12 chips · 5 odd one out (two opposites + a foreign-family intruder) · 6 prefix opposite (refused under 6 pairs); picture-pair match and scattered-chip lines rejected with reasons; "same or opposite?" deferred.
5. New code: `oppositeArrow pairCard matchColumns frameRow prefixChips oddRow` in `components-b3.js`, `data/b3/opposites.js` + validator rules, `tools/gate-opposites-data.js`; all else reused (`cardGrid`, `wordBank`, `wordTiles`, `writingRow`, `.ws-match` CSS).
