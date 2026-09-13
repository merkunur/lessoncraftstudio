# K-318 `sound-boxes`: design (base + 5 faces), studio A (composition/print) + B (child)

Grounding: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §2, renders `out/b2-sweep/G1-244-fruits-d2-en.png`, `K-287-fruits-d2-en.png`, `K-284-animals-d2-en.png` (no K-224/K-231 render exists under `out/`; the K-224 tile look comes from `types/_shared/lit-word-build.js` SCOPED_CSS), `page/page.css`, `templates/components-b2.js`, `templates/layouts/card-grid.js`, `types/g1/G1-244-write-the-word.js`, `lib/b2-common.js`, `primitives/_svg.js`, `primitives/_tokens.js`, the eleven `approved-words-<loc>.json` files (measured with node).

## 0. Substrate correction (measured 2026-09-13; overrides `_SUBSTRATE.md` line 34)
`entries[].chunks` is nested `[[graphemes per syllable]]` ONLY in **de 1028/1028, nl 1062/1062, sv 993/993, no 829/829**. In **en, es, fr, pt, it, da, fi** `chunks` is a FLAT copy of `split` (0 nested entries): there is NO verified grapheme layer in those seven locales. Every face therefore needs a grapheme source of record (§6); code never infers digraphs. Merges in the file: de `sch ch au ei ck ie st ng pf sp`; nl `oe aa ee oo ie ij ui sch ch ng`; sv/no `ng sj kj skj tj stj` (sv `ck` stays TWO graphemes: `kyckling` = k,y,c,k / l,i,ng). Whole-pool words with 2 to 5 graphemes: de 349, nl 410, sv 371, no 343; with at least one multigraph: de 163, nl 199, sv 19, no 29.

## 1. Page concept (base; d2 ships)
"Say it, stretch it, write each sound in its box." Six cream cards (2×3): one theme picture (104 px) above a row of 3 to 4 dashed coral boxes, one per grapheme of the verified segmentation. A multigraph box is 1.5× wide with a small teal tie arc beneath (one sound, more letters). The word is never printed. nl renders hak-stippen (one filled teal dot per box) between picture and boxes; other locales ship without dots. Sub-skill owned: phoneme/grapheme segmentation with the count scaffold. Distinct from K-224 (one letter missing, tiles shown), K-231 (letter bank), K-233 (syllable digit), G1-244 d2 (one box per LETTER plus a ruling; no multigraph, no dots).

## 2. Layout d2 (exact)
Page 703×945; `.ws-page` padding 0 14 → inner 675. Body ≈ 760. `cardGrid({cols:2, rows:3})`, `.ws-cardgrid` gap 14 → card 330×244; `.ws-card` padding 12 + border 2 → inner **302×216**.

```
+---------------- card 330x244 ----------------+   +----------------------------------------------+
|[1]                                           |   |[2]                                           |
|                 [picture 104]                |   |                 [picture 104]                |
|                                              |   |                                              |
|            nl only:  o    o    o             |   |            nl only:   o     o    o           |
|          +----+ +----+ +----+                |   |          +--------+ +----+ +----+            |
|          :    : :    : :    :   48px boxes   |   |          :  wide  : :    : :    :  72+48+48  |
|          +----+ +----+ +----+   gap 8        |   |          +--------+ +----+ +----+            |
|                                              |   |             \____/  tie arc (teal)           |
+----------------------------------------------+   +----------------------------------------------+
   rows 2 and 3 identical: 6 cards, 2 cols x 3 rows, gap 14
```
Stack inside `.ws-card-stage` (column, gap 10): top air 8, picture 104, gap 10, dots row 14 (nl only), boxes svg 52 (48 + stroke + pad), tie-arc allowance 10 when any wide box exists, bottom air ≥ 20. Sum 8+104+10+14+62 = 198 ≤ 216.

Box geometry (`soundBoxes`, §5): box 48, gap 8, wide = round(48×1.5) = 72, dash `6 5`, stroke 2.5 coral, r 8, white fill. Row width = sum of widths + 8·(n−1) + 2. Fit rule `box = min(48, floor((302 − 8·(n−1)) / (n + 0.5·wideCount)))`, hard floor 44. n=3 → 48 (row 168/192); n=4, 1 wide → 48 (248); n=5, 0 wide → 48 (272); n=5, 1 wide → 48 (296); n=5, 2 wide → 45 (296). n=6, or 3 wide at n=5, is REFUSED at d2 (never shrunk below 44). A 5-grapheme word fits d2 iff wideCount ≤ 2. Picture 104 clears the K min element 56; a 48 px box = 12.7 mm, a comfortable K pencil letter.

d1: 4 cards (`cols:2, rows:2` → inner 302×345), picture 128, box 52, 2 to 3 boxes, no multigraph, dots in EVERY locale. d3 (G1 rung): 8 cards (`rows:4` → inner 302×151), picture 80, box 44, 4 to 5 boxes, ≥2 multigraph cards, no dots; stack 6+80+8+48 = 142 ≤ 151.

## 3. Ladder (resolved `difficulty` config)
| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards/cols/rows | 4/2/2 | 6/2/3 | 8/2/4 |
| pic | 128 | 104 | 80 |
| box/gap | 52/10 | 48/8 | 44/8 |
| minG/maxG | 2/3 | 3/4 | 4/5 |
| maxWide / minWideCards | 0 / 0 | 2 / 0 | 2 / 2 |
| dots | all locales | `strings.<loc>.json` flag (nl true) | never |
| band | K | K | G1 |

Pool guard: `sampleEntries(rng, pool, d.cards, 'K-318')` throws when a theme cannot fill; the wave records the refusal. Measured 2-to-5-grapheme pools (nested locales; the 3-to-4 filter is UNKNOWN, engineer must measure with `minG/maxG`): de animals 16, farm animals 17, around the house 32, forest creatures 18; nl 17 / 21 / 39 / 20; sv 19 / 15 / 39 / 16. `fruits` is thin (de 6, sv 4); `vehicles`/`pets` marginal (de 7). `themeAxis.minNouns` = 6 with the grapheme filter applied BEFORE the check.

## 4. Answer-hiding + uniqueness
- Hidden stamps only (precedent: G1-244's `data-lcs-word`): `data-lcs-word` (display form, de capital kept), `data-lcs-vocab`, `data-lcs-chunks="sch|a|f"` (lowercase, reading order), `data-lcs-syl="1|2"` (graphemes per syllable, face e), `data-lcs-face="base|count|starter|position|multigraph|tiers"`.
- `verify(page)` re-derives: box count == chunks.length; each `data-lcs-wide` == (chunk length ≥ 2); `chunks.join('') === word.toLocaleLowerCase()` (the boxes must reconstruct the word exactly); no visible text on a card except the face-declared starter/target; no duplicate words; picture `naturalWidth > 0`; nl dots == boxes; face (e) arcs == syllables; svg width ≤ 302.
- Multigraph signalled without letters: the wide box + the teal tie arc says "one sound, more than one letter" and nothing else. Box COUNT is disclosed in every face but (a): that is the Elkonin scaffold, not a leak.
- Eligibility: display word matches `/^\p{L}+$/u`, `distinctByWord`, approved entry present, grapheme source present (§6), `total_agreed ≥ 3` where present, da `policy_managed !== true` (K-1 strict, 402/794).
- Uniqueness: the picture names one vocab word, so the segmentation is unique by the bank. (a) answer = chunks.length on `answerBox` `data-lcs-answer` (precedent `components.js`). (c) the target grapheme equals EXACTLY ONE chunk (verify counts == 1).

## 5. Primitives and components
Reused: `cardGrid` (`templates/layouts/card-grid.js`); `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-achip .ws-scene-banner` (`page/page.css`); `answerBox({w:56,h:56})` (`templates/components.js`); `wordBank` shape for the face-(d) d1 legend; `fileUri entriesFor displayWord distinctByWord sampleEntries` (`lib/b2-common.js`); `svgRoot roundedRect circle el label` (`primitives/_svg.js`); tokens `T.coral T.coralSoft T.teal T.white`, `F.display`. `countBadge` deliberately NOT used (it prints the count). `letterBoxes({n, box:26, gap:4})` is the ancestor and stays untouched for G1-244.

NEW in `templates/components-b3.js`:
- `soundBoxes({chunks, box=48, gap=8, wide=1.5, dash='6 5', starter=null, tint=false, target=null})` → `<svg data-lcs-soundboxes=n>`; per chunk i a `roundedRect {w: len≥2 ? round(box*wide) : box, h: box, r: 8, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash}` with `data-lcs-box=i data-lcs-wide=0|1`; under each wide box a tie arc `M x+6,y+box+3 Q cx,y+box+11 x+w-6,y+box+3`, stroke `T.teal` 2; svg height = box + 2 + (anyWide ? 10 : 0). `starter={i:0,text:'Sch'}` prints `label` Baloo 2 700 26 px `T.teal` centred in box i. `tint:true` fills wide boxes `T.coralSoft`. `target` stamps `data-lcs-target` only (the child colours; nothing drawn).
- `hakDots({centers, filled=true})` → 14 px svg, `circle r=5` at each box centre x; `T.teal` filled, or coral dashed `3 3` when empty.
- `soundLane({w, h=56})` (face a): white rounded lane, dashed coral 2.5, `data-lcs-soundlane`, no ticks (a tick would disclose the count).
- `syllableArcs({spans, gap, h=22})` → NEW `primitives/syllable-arcs.js` (reused by G1-305): one quadratic arc per syllable cluster, `T.teal` stroke 3 (`stroke.primitive`), `data-lcs-arcs=n`. Face (e) clusters boxes by syllable: intra gap 8, inter gap 22.
- Reading order is left to right in all 11 locales; no RTL.

## 6. Locale slot structure
- Grapheme source, in precedence: (1) `data/b3/sound-boxes-<loc>.json` (panel literal, produced from `i18n/.draft-b3-<loc>.json` by the b2 `apply-` pattern): `{ "<vocabKey>": [["k","i"],["ss","a"]] }`; (2) nested `chunks` of `approved-words-<loc>.json`; (3) REFUSE the word. Gate `tools/gate-sound-boxes-bank.js` (NEW): `flat.join('') === approved.word.toLowerCase()`, `entry.length === approved.count`, `entry[s].join('') === approved.split[s]` for every syllable. The panel may only merge letters INSIDE a verified syllable; a bank that disagrees with the ≥3-source split cannot load. Required for en es fr pt it da fi; optional override for de nl sv no (e.g. sv `ck` → one box if the panel rules so).
- de: `displayWord` keeps the capital; chunks are lowercase; box 1 is sized by the chunk, the child writes "S". Face (b) starter = `displayWord(word,'de').slice(0, chunks[0].length)` → "Sch" (a slice of a stored literal, never inflection).
- fi: no grapheme file; the bank decides per OPS 2014 whether a long vowel / double consonant is ONE wide box (recommended: äänne, models duration, keeps a sound count) or two; `[NSR-FLAG][fi]`.
- sv/no: `ng sj kj skj` one box already; sv `ck` two unless overridden.
- nl: `dots:true` in `i18n/strings.nl.json` for K-318; IJ arrives as chunk `ij` (one wide box).
- es/pt/it: one letter per box plus the closed digraph sets (es ch ll rr qu gu; pt nh lh ch ss rr qu gu; it ch gh gl gn sc), panel-authored, gate-verified.
- fr/en/da: deep orthographies; hand-authored bank; expect many REFUSED words (fr mute-e, en silent e); still built.
- Titles = the §2 panel heads (nl hakken en plakken; da lydrette ord; de Wörter in Laute zerlegen; fr conscience phonologique; es/pt conciencia fonológica; en sound boxes) in `i18n/strings.<loc>.json`.

## 7. Five faces (ids `K-3xx (TBD by the emitter)`; band K unless stated)
Each differs from the base d2 in RESOLVED config (`tools/gate-variation-distinct.js`). Hub contract: `apps.sound-boxes` in `topics-taxonomy.json`, `axes['exercise-type'].sound-boxes.slug/name` ×11, one landing per face per locale with `coordinate.type === 'sound-boxes'`, a band-table level, a unique slug, `canonicalDeckSlug`; gate `scripts/verify-hub-type-rows.js` expects 6 rows per key per locale.

(a) **Count the Sounds** (K): CODE knob `countMode:true`. Picture 104, then `soundLane({w:232})` + `answerBox({w:56,h:56})` side by side (232+12+56 = 300 ≤ 302). No boxes, no dots, no count disclosed; the child draws one dot per sound and writes the numeral (56 px box, above the K 30 px numeral floor). Verify: `data-lcs-answer == chunks.length`, no `data-lcs-soundboxes`. Query face: count the sounds (≠ K-233 syllables). d2 = `{...base.difficulty[2], countMode:true, minG:2, maxG:4}`.

(b) **First Sound Given** (K): CODE knob `starter:true`. Base layout, box 1 pre-printed with the first grapheme, `minG:4, maxG:5`; the child segments the REST. Verify: the only visible text == chunks[0] cased. Query face: sound boxes with the first sound.

(c) **Where Do You Hear It?** (K/G1; replaces "boxes drawn by the child", §8): CODE knob `target`. A coral `.ws-achip` (44×44, Baloo 2 26 px) top-right shows ONE target grapheme; boxes empty; the child colours the box where the sound sits (Anlaut/Inlaut/Auslaut, the de A-tier head; es sonido inicial/medio/final). Targets = panel list in the b3 bank; word eligible iff exactly one chunk equals the target. Distinct from K-221/226/227 (writing a letter vs locating a given sound).

(d) **Two Letters, One Sound** (K/G1): PARAM + one render flag: `{...base.difficulty[2], minWideCards:6, maxWide:2, tint:true}`, `themeAxis.applicable:false` (whole approved pool joined to any cached picture, since per-theme multigraph pools are 0 to 3 in sv/no). Wide boxes tinted `coralSoft`. d1 adds an alphabetical legend of the page's multigraphs (`wordBank` shape; order never leaks position). REFUSED where the whole pool holds < 6 pictureable multigraph words (sv 19 / no 29: thin; fi REFUSED unless long sounds are wide boxes). Query face: digraph sound boxes (de sch/ch/ei, nl oe/aa/ee/ij).

(e) **Syllables and Sounds** (G1; bridge to G1-305): CODE `tiers:true`. `syllableArcs` above box clusters grouped by `data-lcs-syl`; 2-syllable words only, 4 to 5 graphemes, 6 cards, picture 96 (stack 8+96+10+22+62 = 198). Clap the syllables, then write each sound. Verify: arcs == syllables, cluster sizes == graphemes per syllable.

Fillable in de/nl from nested data; es/pt/it/fi via the bank; en/fr/da via the bank with refusals recorded. Face (d) carries the ≥4-locale refusal risk (sv/no/fi/da); fallback (d′) **Long Sounds** for the Nordic/fi cluster (double letters = one wide box), same code, different bank rule.

## 8. Alternatives + recommendation
- Alt A, landscape strips (K-287 shape): 4 full-width rows, picture left 96, up to 6 boxes at 52. Fits any word but only 4 items at K and 5 cm of empty card per row; d3 needs 6 rows and drops to 44 anyway. Rejected for the base; acceptable d1 look if bigger boxes are wanted.
- Alt B, 3×2 portrait cards: inner 187 → 3 boxes at 48 fit (160), 4 boxes force 40 < 44. d1-only. Rejected.
- "Boxes drawn by the child" (the brief's c): unverifiable by layout, motor-unrealistic at K, and with no count hint it collapses into G1-244 d3 (write the word), cannibalising that landing. Rejected; replaced by (c).
- Recommendation: the 2×3 base with `soundBoxes` + optional `hakDots`, ladder §3, faces §7.

## 9. Risks, mitigations, print check
- Grapheme gap in 7 locales (§0): bank + structural gate; without a bank the type ships in 4 locales and the wave log says so; never fill from raw vocab (§20.5).
- Row overflow: the fit rule refuses below 44; verify checks svg width ≤ 302; the QA overflow lint backs it.
- Count leak on face (a): no ticks, no dots, no `data-lcs-soundboxes`; verify asserts absence.
- "Why is this box bigger?": the tie arc is the one consistent signal; the instruction names it once.
- de capital: verify compares lowercased; the instruction tells the child box 1 takes the capital.
- Theme thinness: `minNouns:6` after the grapheme filter; refusals recorded per theme.
- Palette: coral/white boxes, teal arcs and dots, coralSoft tint; no new hex.
- Print A4/Letter: 703×945 is the intersection; box 48 px = 12.7 mm, wide 72 px = 19 mm, stroke 2.5 px ≈ 0.66 mm; dashed coral prints mid grey on mono laser (G1-244 precedent); cream cards on white save ink; nothing within 14 px of the edge; smallest text 26 px (starter/target) and the existing 10 px footer.

## 10. Summary
1. Base = 6 cream cards, picture 104 over 3 to 4 dashed coral 48 px boxes (one per verified grapheme), 72 px wide box + teal tie arc for a multigraph; nl adds hak-stippen; the word is never printed.
2. Measured: nested grapheme `chunks` exist only in de/nl/sv/no; the other seven need `data/b3/sound-boxes-<loc>.json`, gated to agree with the ≥3-source syllable split.
3. Ladder d1 4 cards/2-3 boxes/52 px, d2 6/3-4/48, d3 8/4-5/44 (G1); the fit rule refuses below 44.
4. Faces: (a) count the sounds, (b) first sound given, (c) where do you hear it, (d) two letters one sound (theme-free, refusable), (e) syllables and sounds (arcs, bridge to G1-305).
5. New code: `soundBoxes`, `hakDots`, `soundLane` in `components-b3.js`; `primitives/syllable-arcs.js`; `tools/gate-sound-boxes-bank.js`; everything else reused.
