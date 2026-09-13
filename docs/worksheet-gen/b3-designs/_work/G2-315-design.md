# G2-315 `spelling-rules`: design (base + 5 faces), studio A (composition/print) + B (child)

Grounding: the brief, substrate, `_PANEL-FINDINGS.md` §5, FINAL K-318 / K-317 / G1-305, the four named renders, `page/page.css`, `components-b2.js`, `card-grid.js`, `trace-path.js`, `_svg.js` (`label({x,y,text,size,color,fontFamily,weight,anchor,data})`), G1-244 / G2-274 / K-287 specs, `lib/b2-common.js`.

**Measured 2026-09-13 (node, `entriesFor` over 15 colour themes, distinct display words with an approved entry; rule regexes are DRAFTS, the panel confirms position and count):** de `ie` 14 · short `i` 53 · Doppelkonsonant/ck/tz 90 · Auslaut b/d/g 24 (17 with a stem-extending plural = the Verlängern proof) · `au` 20 · `äu` 1 (REFUSE au/äu) · nl `ij` 16 · `ei` 7 · open 99 · gesloten 29 · `au` 3 / `ou` 3 (REFUSE) · en magic-e 34 · double 50 · sv dubbel 91 · ng 18 · sj 13 · no dobbel 90 · kj/skj/sj 19 · da dobbelt 45 · fi kaksoiskonsonantti 132 · pitkä vokaali 76 · ng/nk 16 · fr m devant b/p 10 (thin; n-devant foils 1) · it doppie 145 · gn/gli 17 · cu/qu 6 (REFUSE) · es b 64 / v 18 · c/qu 82 · g/j 36 · h 36 · pt r/rr 65 · s/ss 15 · ç 11. Longest word: de 16 (25 words >= 12), nl 17, fi 16 (29 >= 12), others 12-15. **Per THEME every rule is 0-4 words**, so a themed page cannot be filled in any locale: `themeAxis:{applicable:false}`, the RULE is the fan lever (K-317's `letterAxis` mechanism as `ruleAxis`; nt20-C ships one exemplar rule per face per locale, `bank[loc].exemplar`).

## 1. Page concept (base; d2 ships)
"Read the rule, look at the picture, write the rule letters in the gap." A rule box at the top (one coral chip with the rule grapheme + two model words with their rule letters in coral) and eight cream cards (2x4): a picture above the word printed in equal letter cells, with ONE dashed coral gap box where the rule grapheme belongs; the child writes the grapheme. Sub-skill owned: applying one named spelling rule at its site in a known word. Distinct from K-224 (one arbitrary CVC letter, tiles), G1-244 d2 (whole word, no rule), G1-305 Missing Syllable (a syllable blank, no rule), K-318 (sound boxes, no letters printed).

## 2. Layout d2 (px)
Page 703x945, `.ws-page` padding 0 14 -> inner 675. Body ≈ 760 (UNKNOWN exact; K-318 critic item 1 asks the engineer to measure it; every height below is checked against 760 AND 736, the two-line-instruction case).

```
+------------------------- ruleBox 675x60 (.ws-scene-banner, dashed coral) -------------------------+
|        (ie)      [pic36] Z ie ge        [pic36] B ie ne                                            |
+---------------------------------------------------------------------------------------------------+
                                             gap 14
+------------- card 330x160 -------------+   +------------- card 330x160 -------------+
|[1]            [picture 64]             |   |[2]            [picture 64]             |
|         W  [    ]  s  e                |   |      S  p  [    ]  g  e  l             |
+----------------------------------------+   +----------------------------------------+
   rows 2-4 identical: 8 cards, 2 cols x 4 rows, gap 14
```

- Card: `cardGrid({cols:2, rows:4})`, rows are `minmax(0,1fr)`, so card height = (body - 60 - 14 - 3x14) / 4 = **160** at body 760, 154 at 736; `.ws-card` padding 12 + border 2 -> inner 302 x (card - 28); `.ws-card-stage` set inline `padding:6px 0` (G1-244 precedent) -> stage 302 x 120 (114 at 154).
- Stack (column, centred): picture `pic = min(64, stage - 6 - 46)` (64 / 62), gap 6, `gapWord` svg height cell + 14 = 46. Total 116 <= 120; 114 <= 114 at the wrapped instruction. Picture 62-64 clears the G2 element floor 36.
- Cells (G1-305 `syllableWord` idea, cited: equal cells make every rule site an exact x, `build()` has no font metrics): `cell = min(32, floor(296 / (n - len + gapCells)))`, `fontPx = cell - 2`, Baloo 2 700 ink, `label` anchored `middle` at `(i+0.5)*cell`. n = letters of the display word, len = rule grapheme length, `gapCells` = box width in cells (base: = len). Resolved: n <= 9 -> 32 · 10 -> 29 · 11 -> 26 · **12 -> 24 (font 22 = the G2 answer floor)** · REFUSE n > 12 at d2. A 12-letter German word (`Kühlschrank` is 11, `Schmetterling` 13 is refused) spans 12 x 24 = 288 <= 296. The gap box is taller than wide (h = cell + 8) so a 24-cell still gives 32 px of pencil height.
- Gap box: `roundedRect({x: from*cell + 1, y: 3, w: gapCells*cell - 2, h: cell + 8, r: 6, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash: '6 5'})`, letters after it re-laid from `(from + gapCells)`. Printed letters sit on `y = cell/2 + 7` (`dominant-baseline: central`).
- ruleBox: `.ws-scene-banner` (existing: white, 2.5 dashed coral, r 12) 675x60, `padding:6px 14px`, row gap 26, centred: rule chip = coral circle 44 with the grapheme in white Baloo 2 700 20 (16 when >= 3 chars); models = two `.ws-bankword` pills (white, border `#F0E4CB` from page.css) each `img 36` + word in Baloo 2 700 22 ink with the rule letters wrapped `<span style="color:#F2784B">`. The models are drawn from the rule pool and EXCLUDED from the cards.

**d1 delta.** 6 cards `cols:2, rows:3` (card 219 -> stage 179): pic 96, `cellMax 36`, maxLetters 8, THREE models in the rule box (banner 60 still). **d3 delta.** 8 cards, rule box = chip only (`models:0`), `minLetters 6`, `gapCells 3` for every rule (the box no longer shows the grapheme length), maxLetters 12. Stacks: d1 96 + 6 + 50 = 152 <= 179; d3 = d2.

## 3. Ladder (resolved `difficulty`; guards key on these keys, never the level index)
| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards / cols / rows | 6 / 2 / 3 | 8 / 2 / 4 | 8 / 2 / 4 |
| pic / cellMax / fontPx | 96 / 36 / cell-2 | 64 / 32 / cell-2 | 64 / 32 / cell-2 |
| minLetters / maxLetters | 3 / 8 | 3 / 12 | 6 / 12 |
| models / gapCells | 3 / len | 2 / len | 0 / 3 |
| mode | gap | gap | gap |
| band | G2 | G2 | G2 |

Pool guard `sampleEntries(rng, pool, d.cards + d.models, 'G2-315')` (`lib/b2-common.js:64`); the wave records refusals. Filter, in order: `bank[loc].rules[exemplar].items` -> `displayWord` (de keeps the capital) -> `/^\p{L}+$/u` -> approved entry present with `entry.word` equal case-insensitively -> letters in range -> the rule grapheme occurs EXACTLY once in the word (a printed second occurrence would hand over the answer) -> `distinctByWord`.

## 4. Answer hiding + uniqueness
Root `<div data-ws-content data-lcs-rule="ie" data-lcs-face="base" data-lcs-gapcells="2">`; ruleBox stamps `data-lcs-rulebox`, each model pill `data-lcs-model="Ziege"`; each stage `data-lcs-word` (display form), `data-lcs-vocab`, `data-lcs-gap="1:2"` (from:len, 0-based letter index), face extras in §7. The gap letters are NEVER stamped as text and never printed: `verify()` re-derives them as `[...word].slice(from, from+len).join('').toLocaleLowerCase(lang)` and asserts `=== data-lcs-rule` (base) or `in candidates` (face b).
`verify(page)` (browser): visible `<text>` on a card, in cell order, === the word with cells from..from+len removed (poison: a gap box one cell too narrow -> FAIL); exactly one `[data-lcs-gapbox]` per card, width === `gapCells * cell - 2`; `data-lcs-cells === n - len + gapCells`; `cell >= 24`, svg width <= 302; rule occurs once in `data-lcs-word`; no card word equals a `data-lcs-model`; no duplicate words; `img.naturalWidth > 0`; card count === `d.cards`; de: `from > 0`. Node-side re-derivation (approved entry, bank gap position, picture file) lives in `tools/gate-spelling-rules-data.js` (§9), never in `page.evaluate`.
**The two-candidate face leaks by nothing:** the gap box is `gapCells = max(candidate lengths)` on EVERY card (`i | ie` -> 2 cells for `Kiwi` and `Ziege` alike; the G1-305 Missing Syllable rule); the chips are printed in ONE fixed order per rule (shorter first, else alphabetical: `i | ie`, `b | p`, `s | ss`), identical on all 8 cards, both white with the same border (only a hidden `data-lcs-answer` differs); verify asserts 3-5 of 8 cards per candidate (poison: all 8 the same -> FAIL) and that no printed cell equals a candidate grapheme. Uniqueness = the picture names one vocab word; the gate flags any card whose other-candidate fill is itself an approved word (`Bine`/`Biene` class) for panel review.

## 5. Primitives / components
Reused (exact): `cardGrid` · `.ws-card .ws-card-badge .ws-card-stage .ws-icon .ws-scene-banner .ws-bankword .ws-bank--icons .ws-bin .ws-bin-label .ws-bin-lines` (`page/page.css`) · `writingRow({w,h,glyphH,xHeight:true})`, `strokeWordLane({text,w,h,glyphH,reps,stack,emptyLast,padLeft})` (`trace-path.js:681/597`) · `rulingBlock({rows,w,h,glyphH})` (`components-b2.js`) · `svgRoot roundedRect circle label el esc` (`_svg.js`) · `entriesFor displayWord traceable distinctByWord sampleEntries fileUri` (`b2-common.js`) · `letterChips({a,b,px})` (K-317 F6, `components-b3.js`; `pillChoice` rejected: no per-card stamp) · tokens `T.coral T.coralSoft T.teal T.ink T.inkSoft T.white T.grid`, `F.display`. NOT used: `letterBoxes` (stays untouched for G1-244; its look is re-drawn in `gapWord` mode `scaffold`), `wordBank` (prints words), `fixChecklist` (no picture models), `countBadge` (a numeral).
NEW in `templates/components-b3.js` (HTML + inline SVG, token palette):
- `ruleBox({chips:['ie'], models:[{src, word, gap:{from,len}}], w:675, h:60})` -> `<div class="ws-scene-banner" data-lcs-rulebox>`; chips as coral circles (`circle r 22` + `label` white); models as `.ws-bankword` pills with the rule letters in a coral `<span>`; `models:[]` renders chips only (d3).
- `gapWord({word, gap:{from,len}, gapCells, cell, fontPx, mode:'gap'|'full'|'scaffold', ruleAt})` -> `<svg width=(n-len+gapCells)*cell+2 height=cell+14 data-lcs-cells data-lcs-cell data-lcs-mode>`. `gap`: letters + one dashed box (`data-lcs-gapbox`). `full`: every letter printed, no box (face e; `ruleAt` is stamped, never drawn). `scaffold`: the rule cells printed in `T.coral`, every other cell its own dashed box (`roundedRect w cell-4 h cell+8 r 5 T.coral 2 dash '5 4'`, the G1-244 letter-box look; face f).
- `proofLane({src, n:2, w, h:40, glyphH:22})` -> `<div data-lcs-proof-lane>`: n clone pictures 26 px + `writingRow({w, h, glyphH, xHeight:true})`; no starter, no tick (a tick discloses the length).
- `pictureBank({items:[{src, vocabKey}], px:56})` -> `.ws-scene-banner ws-bank ws-bank--icons` with picture-only pills, `data-lcs-bank` per pill (face c; `wordBank` prints the word).
- `ruleBins({bins:[{chip:'ie'},{chip:'i'}], w:300, h:300, rows:5, glyphH:26})` -> two `.ws-bin` (inline `height:300px;max-width:300px`) each with a `.ws-bin-label` holding the coral chip and `rulingBlock({rows:5, w:260, h:48, glyphH:26})` in `.ws-bin-lines`; `data-lcs-bin="ie"`.
NEW primitive: none.

## 6. Locale slot structure
`data/b3/spelling-rules.js[loc]` (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `validate-b3-draft.js`, the K-318/K-317 pattern):
```
{ exemplar:'ie', capital:'keep'|'lower',
  rules:[{ key:'ie', chip:'ie', candidates:['i','ie'] | null, proof:'plural'|null, pair:false,
     items:[{theme, noun, vocabKey, word:'Ziege', gap:{from:1,len:2}, proofWord:null, partner:null}],  // >= 10 (8 cards + 2 models), >= 12 for face c
     models:['goat','bee'], refuse:{b?,c?,e?,f?,g?} }],
  strings:{'G2-315':{title,instruction}, F2..F6:{...}} }
```
Page text = title + instruction (`i18n/strings.<loc>.json`, keyed by id), the chip graphemes and the model words; the code substitutes stored literals and never inflects. **de** `capital:'keep'` (cell 0 keeps the capital; verify forbids `from === 0`); Auslaut rules carry `proof:'plural'`, `proofWord` = the vocab plural literal (`Hunde`), refused per item when the plural does not extend the stem. **nl** `ij` is two cells (cells are letters, `len 2`); open/gesloten and ei/ij as candidate pairs, gap 2 cells. **fi** minimal pairs (`tuli`/`tuuli`) need TWO pictures: `pair:true` items carry `partner:{noun, vocabKey, word, gap}`; face b renders both on one card (§7); refuse the rule when < 8 of either. **fr** accents are one cell each (`[...word]` code points; `é` is in the COMPOSED 44 set for face g); m-devant-b/p is base only (pool 10), the panel may re-target to a pictureable son (o/au/eau, c/qu; counts UNKNOWN). **es** = MX vocab by construction; b/v is a legitimate spelling pair here. **sv/da/no** print the bare singular (never a definite form); `['t','tt']`-style candidates. **it** `['l','ll']`, cu/qu refused. **pt** `['s','ss']`, `['r','rr']`, `ç` base only. Titles = the genre head (`i oder ie`, `open en gesloten lettergreep`, `dubbelteckning`, `pitkä vai lyhyt vokaali`, `doppie`, `uso de la b y v`, `s ou ss`), <= 70, no worksheet-word; instruction <= 150, one imperative.

## 7. The five variations (why these five)
(a) is the base. Of (b) (c) (d) (e) (f), (d) "write the proof form" is buildable only where a related form reveals the letter (de Verlängern 17, nl bomen/bommen, en y->ies plurals, fi weak-grade plurals `kukka -> kukat`) and REFUSED in sv/da/no/fr/it/es/pt (7 of 11, above the rule-3 ceiling of 4), so it is not a face; its pedagogy survives as the `proof` flag on face (b). The fifth slot goes to (g) "Look, cover, write" (Lernwörter abschreiben / woordpakket oefenen / veckans ord / look-cover-write-check), a weekly head in all 11 and a different child act (motor copy from a model). Every face is a CODE face (a named knob + a `verify()` branch, stamped only when declared; base byte-identical); all keep the rule box and `themeAxis:{applicable:false}`.

**F2 (b) Two-candidate choice** `G2-3xx TBD`. Knob `choice:{candidates, gapCells:max len, proof}`. 8 cards 2x4; row 1 `[pic 48][gapWord w <= 246; maxLetters 10 (cell 30 at 8, 24 at 10)]` h 48; gap 6; row 2 `letterChips({a,b,px:40})` left + (when `proof`) `proofLane({w:160})` right; 48 + 6 + 44 = 98 <= 114. fi `pair:true`: two `[pic 40][gapWord]` rows + chips = 130 > 114, so pair pages run `cols:2, rows:3` (6 cards, 12 gap words >= the G2 floor 8). Rule box shows both chips. Stamps `data-lcs-face="choice"`, hidden `data-lcs-answer` on the chip, `data-lcs-proof` on the lane. Verify: §4 balance + fixed order + fixed gap width; proof lane empty. Ceiling (m): de i/ie 14+53, Auslaut 24 (proof 17), sv/no/da 91/90/45, fi 132/76, nl ei/ij 23, es b/v 64/18, pt s/ss 15 (tight), it 145, en 50; fr REFUSED. Query face: "X or Y" (i oder ie · enkel eller dobbel · b o v).

**F3 (c) Rule bins** `G2-3xx TBD`. Knob `bins:{n:2, items:8, rows:5}`. Rule box (two chips, no models) 60 + 14 + `pictureBank` (8 x 68 pills in one row <= 647) 84 + 14 + `ruleBins` 2 x 300x300, gap 40 -> 472 <= 736 (G2-275 look; `rows:6`, h 400 when the measured body allows). No word printed: the child spells the picture AND sorts it. Split 3-5 per bin, 5 lines each so the line count never states the split. Stamps `data-lcs-face="bins"`, hidden `data-lcs-bin-of="ie"` per pill. Verify: 8 distinct pictures, two bins, no visible text but the chips, per-bin 3-5, every pill's rule from the bank. Ceiling: any pair with >= 6 items each (all but fr; pt s/ss borderline). Query face: "sort by rule" (Wörter mit i und ie ordnen · spellingcategorieën sorteren).

**F4 (e) Rule detective** `G2-3xx TBD`. Knob `detect:{write:true}`. 8 cards; row 1 `[pic 48][gapWord mode:'full' w <= 246]` 48; gap 6; `writingRow({w:302, h:44, glyphH:24, xHeight:true})` -> 98. The child circles the rule letters in the printed word, then writes the word. Stamps `data-lcs-face="detect"`, `data-lcs-rule-at="1:2"`. Verify: `data-lcs-mode="full"`, no gap box, rule occurs once, one ruling per card, no coral text on cards (poison: a coral tspan -> FAIL). Ceiling: the full rule pool (fr 10 with `models:0`). Query face: "find and mark the rule letters".

**F5 (f) Rule dictation** `G2-3xx TBD`. Knob `scaffold:true`. Base stack with `gapWord mode:'scaffold'`: the rule letters printed in coral, every other cell a dashed box. Cell count = letter count is the declared scaffold (G1-244 d2 precedent). Stamps `data-lcs-face="scaffold"`. Verify: visible text === the rule grapheme only; boxes === n - len. Ceiling: base pool. Query face: "write the whole word, the rule letters are given" (Wörter mit ie schreiben).

**F6 (g) Look, cover, write** `G2-3xx TBD`. Knob `copy:{reps:2, emptyLast:true}`. 8 cards; `[pic 44][strokeWordLane({text, w:246, h:36, glyphH:24, reps:2, stack:true, emptyLast:true, padLeft:8})]` = solid model + dashed trace + empty trio, H = 3 x 36 + 4 = 112 <= 114. Long words shrink inside the lane (K-284 lesson): the gate refuses a card whose scale < 0.8 x (24 / heightUnits) (glyph widths for 12-letter de/fi words UNKNOWN; engineer measures). Eligibility adds `traceable(word)`. Stamps `data-lcs-face="copy"`. Verify: one `[data-lcs-prim="trace-word"]` per card, `data-lcs-reps="2"` + `data-lcs-empty-slot`, `data-lcs-text === data-lcs-word`, no `<text>`. Rule letters stay uncoloured in a stroke lane (monochrome by design); the rule box carries the rule. Query face: "look, cover, write" (Lernwörter · woordpakket · veckans ord).

Rejected non-moves: theme swap (themeless type) · a second rule (that is the `ruleAxis` fan) · d1/d3 relabelled · "right or wrong spelling" circle-the-correct-word (a Fehlerbild; de/nl didactics refuse it; kept as Alt B for the pedagogy agent) · gap at a random non-rule letter (= K-224 / G1-305 cloze).

## 8. Two alternatives + recommendation
**Alt A, landscape 2x4 (picture left, word right, G1-244 shape):** word width 302 - 64 - 8 = 230 -> 12 letters at cell 19, font 17 (below the 22 floor); 8 letters at 28. Rejected for the base (de/fi/nl carry 19-29 words >= 12 letters); it survives as the row-1 shape of faces b/e/g where `maxLetters` is capped at 10 and a ruling needs the width below.
**Alt B, full-width rows (K-287 shape, 6 rows):** cell 44, generous for the pencil, but 6 is below the G2 item floor 8, and 8 rows leave 50 px inner per row. Rejected.
**Alt C, 3x3 grid (9 cards):** inner 187 -> 12 letters at cell 15. Rejected.
**Recommendation: the 2x4 portrait stack** (picture over a full-width cell word): the only shape that holds a 12-letter word at the 22 px floor with 8 items and a 60 px rule box.

## 9. Risks, mitigations, print check
- Baloo 2 advance > cell at 24: shared with G1-305 (critic OPEN 1); one gate asserts the widest glyph (`m w W` + de capitals) fits `cell - 2`; if it fails, `maxLetters 11`, never a smaller font.
- Body height "≈ 760": every stack is proven at 736 too; the engineer measures once and pins `pic` from the measured stage.
- Gap width leak (i vs ie): fixed `gapCells` per page, never per card (poison: per-card width -> FAIL).
- Model words on cards / rule letter printed twice: filters in §3 + verify.
- Chip-order leak: fixed order + 3-5 balance + identical chip styling.
- fr thin pool (10): base ships with 0 slack; faces b/c refused; the panel may re-target.
- Pictures: the panel OPENS every item picture (the sv #35 lesson); `B2_EXCLUDE` applies; no BW theme (localized marker).
- Palette: coral/coralSoft/teal/ink/inkSoft/white/grid/cream only; page.css `#F0E4CB` via class, never inline.
- Hub: `apps.spelling-rules` + `axes['exercise-type'].spelling-rules.{slug,name}` x11 must be registered (measured absent, K-318 registrar clone); gate `scripts/verify-hub-type-rows.js --keys=spelling-rules` expects 6 rows per locale.
- Print: cell 32 = 8.5 mm (font 30), minimum cell 24 = 6.4 mm with a 32 px (8.5 mm) tall gap box; rule chip 44 = 11.6 mm; 2.5 px coral dash prints mid-grey on mono laser (G1-244 precedent); nothing within 14 px of the edge; smallest text 20 px chip / 22 px cell letter, plus the 10 px footer. `qa/lints.js` checks 1 + 1b run on de + fi renders at d2 before any copy claims a level.

## 10. Summary
1. Base = rule box (chip + 2 coral-marked models) over 8 portrait cards: picture 64 above the word in equal cells, one dashed gap box at the rule site; cell 32 down to 24 at 12 letters, refuse longer.
2. Themeless type; the RULE is the fan (`ruleAxis`, K-317 mechanism); measured cross-theme pools carry every locale except fr's thin m-devant-b/p (base only).
3. Answers never printed: gap letters re-derived from `data-lcs-word` + `data-lcs-gap`; fixed gap width and fixed chip order keep the choice face honest.
4. Faces: two-candidate choice (+ per-locale proof lane), rule bins, rule detective, rule dictation scaffold, look-cover-write; the proof face is folded into the choice face because it dies in 7 locales.
5. New code = `ruleBox`, `gapWord` (3 modes), `proofLane`, `pictureBank`, `ruleBins` in `components-b3.js`; everything else reused verbatim.
