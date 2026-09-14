# G1-309 `rhyming-words` : editor-critic record (2026-09-14)

Inputs: `_work/G1-309-pedagogy.md` + `_work/G1-309-design.md`; brief, substrate, panel findings §10, README (cross-type rulings + open items), G1-307 + G1-308 FINALs. Verified in the repo: `page/page.css` (`.ws-page .ws-cardgrid .ws-card .ws-card-badge .ws-card-stage .ws-choices .ws-chip .ws-bin .ws-match* .ws-lane .ws-bank*`), `templates/layouts/card-grid.js`, `templates/components.js`, `templates/components-b2.js` (`rulingBlock:58 wordBank:210 countBadge:243`), `primitives/trace-path.js` (`writingRow:681`, `textLaneGeometry:425`), `primitives/_tokens.js` (density :67-70), `types/k/K-232-rhyming-pairs.js` + `_shared/science-pair-match.js`, `_shared/lit-sound-match.js`, `data/literacy/rhyming-pairs.json` (8 pairs), `lib/b2-common.js` (`B2_EXCLUDE:35`), `image-cache/resolve.js`, `scripts/seo-landing/gen-b2var-landings.js LEVEL_KEYS:112-124`, `frontend/lib/seo/strand-names.ts:154`, `i18n/strings.<loc>.json` (K-232/K-226/K-233/K-234/G1-244 titles x11), `tools/gate-variation-distinct.js:31-35`, `approved-words-fi.json` + `-da.json`. Scratch (read-only, scratchpad): `g1309-census.js`.

## 1 Contradictions + resolutions

| # | pedagogy | design | resolution (rule) |
|---|---|---|---|
| 1 | five faces: judge / sort 3x2 / couplet / strings with foils / own | (a) K draw-a-line via `matchColumns` (en refused) · (b) families 2x3 · (c) yes-no · (d) couplet · (f) own; (e) strings dropped | **Pedagogy's set.** (a) duplicates K-232's MECHANIC in 10 locales (K-232 has no non-EN data, but the fix is a feed: OPEN 1); it owns no distinct query face ("draw a line" is K-232's). (e) was dropped on a misread floor: strings need >= 4 CLASSES with >= 3 members, not classes with >= 4 members; on the candidates 10/11 clear it (§2). |
| 2 | F2 = 3 bins x 2, head picture + PRINTED head word | (b) = 2 columns x 3, `numberedBank`, no printed word | **3 x 2, head picture only.** Floor 3 classes >= 3 clears 11/11 on the candidates; 2 classes >= 4 fails de (1) and no (1). The printed head word was dropped: nothing on the page except F4's bank and F5's anchor is printed, and a printed head reads as G1-306 R territory. Design's `numberedBank` kept. |
| 3 | F5 = picture + its word + 2 rows | (f) = picture + 3-word CLASS bank + 2 rows | **Pedagogy.** A bank of the class's own rhymes makes "write your own" a copy task (no production). Word printed beside the picture (the sound she rhymes against). |
| 4 | F1 chips 56 | (c) `yesNoChips(52)` (= `.ws-chip` CSS) | **56** (K element floor, brief; `.ws-chip` is 52 in CSS, `page.css:190`: inline override). Design's teal glyph paths kept. |
| 5 | base anchor 80/70, lane 250x56 glyphH 26 (K 40) | anchor 80/70, rings 76/60, lane 230x64 glyphH 28 | **Design geometry re-budgeted at 722:** anchor 76/64, rings 76/60, lane 240x64 glyphH 28 (card inner 80 at 722: an 80 tile had 0 slack). |
| 6 | F3 lines <= 45 chars, lane 200 | line 1 <= 34, line 2 <= 26, lane 170, row 116 (stack 736) | **Line 1 <= 45, line 2 <= 40 before the blank, lane 170, rows minmax(113,1fr).** Design's caps used an assumed ~13 px/char; README measured Nunito 800 18 px at 7.4-8.1. Design's 736 stack overflows 722. |
| 7 | bank member `word` gated only against vocab; approved-words read only by the fi validator | `word` MUST equal the `approved-words-<loc>.json` entry, da strict pool, absent = dropped | **Pedagogy.** Brief §20.5 gates approved-words only for pages that SHOW a split/grapheme; no face here does. fi keeps the hard rule (rime = last two approved syllables); elsewhere a mismatch is a spelling WARN. |
| 8 | K key sv/da/no on base/F2/F4; F3/F5 G1; F1 K x11 | `band:'K'` for sv da no **fi** (panel may choose G1) | **Pedagogy** (fi base 1. luokka: esiopetus does not write words; fi F1 = esikoulu). |
| 9 | refusal per locale on the AUTHORED bank | refusal on the design's estimates ("es/it/da/no < 2 classes") | **Measured (§2)**; the design's estimate was wrong for da/no/es/it. |
| 10 | rhyme position: all 3 values over a 20-seed sweep | `minSlot` >= 2 per page, >= 4 of 18 per seed | Merged: each position >= 1 and <= 3 per page; sweep asserts non-constant. |
| 11 | da strict pool = `policy_managed:false` | (same) | README open item 5 (m: `false` occurs 0 times; ABSENT = 402). Moot after #7 but recorded. |

## 2 Numbers re-measured (`g1309-census.js`, candidates, deduped by WORD; the pedagogy's `g1309-measure.js` is not on disk)

| loc | pedagogy >= 2 / >= 3 | re-measured >= 2 / >= 3 / >= 4 | wordsIn>=2 | won |
|---|---|---|---|---|
| en | 46 / 10 | 52 / 14 / 3 | 122 | re-measure (`-ear` pear/bear/ear confirms orthography is NOT trustworthy) |
| de | 18 / 3 | 22 / 4 / 1 | 49 | re-measure; the 4th class is `pfau/blau/grau` (adjectives) so F4 = REFUSED at 3 usable, as the pedagogy said |
| es | 86 / 51 | 103 / 50 / 31 | 386 | re-measure |
| pt | 103 / 48 | 109 / 51 / 29 | 381 | re-measure |
| fr | 76 / 32 | 77 / 23 / 13 | 237 | re-measure |
| it | 100 / 45 | 125 / 55 / 34 | 479 | re-measure |
| nl | 48 / 14 | 54 / 16 / 7 | 135 | re-measure |
| sv | 25 / 9 | 32 / 12 / 3 | 80 | re-measure |
| da | 29 / 3 | 40 / 8 / 3 | 93 | re-measure; the pedagogy's "F4 refused at 3" is WRONG on the candidates (5 classes survive after `rød sort blå grå`) |
| no | 28 / 5 | 37 / 10 / 1 | 85 | re-measure |
| fi | 70 / 26 | 135 / 63 / 35 orthographic; 108 / 35 / 18 by the approved-split rule | 455 | re-measure (the pedagogy's 70 is closer to the approved rule) |

Both are orthographic candidates; differences come from the theme set (50 colour themes) and word-dedupe. First run WITHOUT dedupe counted `spis spis`, `kock kock`, `tang tang tang` as classes (poison P11). 8/8 en json pairs survive `entriesFor` and share a draft rime (m). Body: 722 (README), not 760: every stack re-done (§3 of the FINAL); the design's F3 736 and base "760 exact" were the only overflows. fi approved coverage: 805 of 879 pictured words (m).

## 3 Claims removed as unverified
- "es/it/da/no estimated < 2 classes with >= 4 pictured members" (design §7): da 3, es 31, it 34 (m); no 1 is right.
- "`.ws-bin` geometry est. three bins ~215 with a printed head word" (pedagogy OQ 5): `.ws-bin` is `height:170px; max-width:260px` (m), unusable; replaced by `.ws-lane` columns.
- "2x4 card inner ~302x151" / "1x6 inner 647x87" / "2x3 inner 302x216" (pedagogy §B): those are 760-body numbers; at 722 they are 142 / 80 / 203.
- "line 1 <= 34 chars ≈ 445 <= 539" (design): 34 x 8.1 = 275; the cap was derived from a wrong px/char.
- "K-232 keeps 'Rimpar' (da)" implied by symmetry: da K-232 is "Rim-par" (m).
- Design's `pairCardRhyme` pictures 80 + chips 52 = 142 "fits inner 151": inner is 142 at 722 (0 slack); now 72 + 8 + 56 = 136.
- Design's "scratch `g1309-measure.js`, `g1309-strict.js`" as sources: not on disk; superseded by `g1309-census.js`.

## 4 OPEN items
1. **K-232 data feed (recommendation).** Export `pairs` per locale from `RHYMES[loc].classes` (one pair per class, both members pictured, `sameSpelling` irrelevant) into a per-locale `rhyming-pairs.<loc>.json` read by `science-pair-match` (today `data: require('rhyming-pairs.json')`, en only; `itemsByLocale` shape of `lit-sound-match.js` is the precedent). Gives the 10 non-EN locales the K draw-a-line page with NO new face. Separate data commission; this type does not depend on it. (engineer + pipeline)
2. **de F4.** Refused at 3 usable classes >= 3 on the candidates; the de panel authors a 4th by sound (`Haus Maus Laus`, `Hut Blut`) and F4 lifts. (panel de)
3. **Adjective pruning.** Colour words (`rød sort blå grå`, `blau grau`, `tå/blå/grå`) and homographs sit in the candidates; every panel prunes to nouns and re-checks the F2/F4 floors on its bank. (panels)
4. **`approved-words-fi` coverage.** 74 pictured fi words are absent from the file and cannot be members (validator rule 6). Record which; no pipeline change. (panel fi)
5. **fi F1 band / esikoulu.** F1 at `esikoulu`, base at `1-luokka` proposed; confirm with the fi panel. (panel fi)
6. **`gate-variation-distinct.js`** reads `wave-b2-en.json` + `gen-b2var-specs.js ROWS` (m): a b3 wave file / ROWS list before it can see this type. (pipeline; shared with G1-307/308)
7. **`scripts/verify-hub-type-rows.js`**, `templates/components-b3.js`, `tools/validate-b3-draft.js`, `apply-b3-locale.js`, `register-b3-en-content.js` all absent (m); shared batch items. Expected rows 65 (de 5). (pipeline)
8. **`unitAxis` for the class set.** `exemplar` in the bank + `unitOverrides` per README ruling; `deckIdFor` appends `-u<asciiFold(unit)>`. Measure 0 drift with `b3-baseline --check`. (engineer)
9. **Lane glyph capacity.** `maxLetters` 10 (base 240 x 28), 7 (K 233 x 40), 8/6 (F2 190 lane) are *est.* from G1-307's 302 -> 14; measure a G1 hand on de `Schwamm` and fi words before locking. (engineer)
10. **`wordBank` height** for F4 (12 words, 2 rows, est. 100-112): measure on de/fi renders; the F4 stack has 2 px slack at 112. (engineer)
11. **Meta lead "Free printable"** (README open item 1): inherited, operator decision. (operator)
12. **da title rule** ("rimord" in every title, never bare "rim") is validator rule 10; the da panel confirms "Rimord: rimer det?" reads naturally. (panel da)

## 5 Verdict (a critical first-grade teacher)
The base is exactly what I do at the carpet, on paper: say it, find the one that rhymes, write it; three pictures per row keep it honest without a printed word to copy. The sort, the couplet and the bank-with-foils are three real steps up, and "rhyme or not" gives my weakest readers a page with no writing at all. What worries me is the bank: de has four thin classes and every locale's list is still a computer's guess at sound, so the pages are only as good as the panel's ear and the pictures they actually open.
