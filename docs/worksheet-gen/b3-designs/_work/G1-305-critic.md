# G1-305 `syllable-split` - editor-critic record (2026-09-13)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §3, `K-318-sound-boxes.md` (contract shape), `_work/G1-305-pedagogy.md`, `_work/G1-305-design.md`. Verified in the repo: `templates/components-b2.js` (exports at :297), `primitives/trace-path.js` (`writingRow` :681, `strokeWordLane` :597, `textLaneGeometry` :425, `LM` :416), `page/page.css` (`.ws-page` :16, `.ws-cardgrid` :119, `.ws-card` :126, `.ws-card-stage` :156, `.ws-lane` :401, `.ws-nchip` :412, `.ws-scene-banner` :274, `.ws-tile` :395), `types/g1/G1-244-write-the-word.js`, `types/k/K-233-syllable-count.js`, `types/k/K-234-syllable-sort.js`, `lib/b2-common.js`, `templates/layouts/card-grid.js`, `tools/gate-variation-distinct.js`, `data/literacy/letter-knowledge.json`. Measured read-only with node over the eleven `approved-words-<loc>.json` (scratchpad `tex-measure.js`, `faces.js`).

## 1. Contradictions + resolutions

| # | conflict | resolution | by |
|---|---|---|---|
| 1 | Base composition: design = arcs AND a hyphen rewrite lane on one card; pedagogy = mark only (F0), rewrite is its own face (F1) | Base = mark only. A combined base owns both native heads (Silbenbögen AND "in Silben schreiben"), and the design's (a) arcs-only and (b) rewrite-only become subsets of it (rule 2/4). Write the Word in Syllables = Face 2, CODE `mode:'rewrite'` | brief rule 4 |
| 2 | Face set: design (a)(b)(c)(d)(f) vs pedagogy F1-F5 | Final: Write · Missing Syllable · Scramble · Two-or-Three · Vowel King. (a) = base; (b) = F1; (d) = F5; (f) rejected; (c) kept; pedagogy F2 boxes dropped | measured pools + boundary |
| 3 | Judgement face (f): design mitigates with a one-boundary-shift distractor + panel ban list; pedagogy rejects (sv/de/fr alternative splits, §20.7) | REJECTED. No source in the pipeline can prove a distractor wrong, so the gate cannot make a mis-labelled correct split structurally impossible; at G1 a split judgement is also above the produce level | pedagogy upheld |
| 4 | Vowel King: pedagogy rejects ("grapheme layer only in de/nl/sv/no"); design measures eligibility by vowel-letter runs from `letter-knowledge.json` | KEPT. Re-measured: in 9 locales every syllable of 95-100 % of the texPool holds exactly one vowel run (de/nl/fi/pt whole pools; es/it/sv/no/da all but pets). The grapheme layer is not needed for the act; the king IS the vowel run. Refused en/fr by design (silent/mute e, vowel teams) | data refutes |
| 5 | Pedagogy F2 syllable boxes | DROPPED. A length-proportional box prints the boundary (texPool needed, contradicting the "count scaffold" framing); a uniform box is K-318 Sound Strip's shape; against Write it is a scaffold delta (rule 4 "an adjective away"); weakest native head of six candidates | rule 4 + K-318 boundary |
| 6 | Pool filter: design `total_agreed >= 3` on EVERY face; pedagogy full pool for produce faces, texPool for boundary-printing faces | Pedagogy's rule. Measured: in en/es/pt/fr/it/fi "lacks TeX" === `total_agreed === 2` exactly, so the design's filter silently turned every face into a texPool face (and its own d2 pool numbers were computed WITHOUT it: "en animals 17" is the unfiltered pool; texPool animals = 9) | measurement |
| 7 | Cloze blank width (pedagogy OQ 8) | Fixed 4-cell box, blank syllable limited to 2-4 letters, words <= 10 letters (worst case 12 cells x 24 = 288 <= 296). No length leak | doctrine: answer never printed |
| 8 | Word rendering: equal letter cells (design) vs proportional | Cells kept for base, cloze, king (a boundary is an exact x). Proportional Baloo 2 for Write (nothing is drawn on the word). Baloo 2 advance vs cell = engineer measurement, gate rule 9 | task ruling |
| 9 | fi base: bars on the printed word (pedagogy F0 row) vs hyphen rewrite as the base | Base stays "mark" in all 11 (`mark:'bar'` in fi = tavuviiva); the hyphen head goes to Face 2 ("tavuta ja kirjoita"). The pedagogy file does NOT say the fi base is the rewrite; a per-locale base MODE would break the locale-neutral seed | brief |
| 10 | `tavutettu` | Not a face: a render flag for the fi instruction strip on every fi K-1 sheet; recorded as OPEN 4, an `instructionTavutettu` literal slot reserved | task |
| 11 | nl head | lettergrepen in every title; validator forbids "klankgroep" in nl titles; §4 + §6 record it | task |
| 12 | Sort-column headings: design numeral chips + dots; pedagogy `sortLabels` literals | Both: `.ws-nchip` numeral beside the panel literal (the numeral for the pre-reader, the literal for the head term) | merge |
| 13 | d2 maxLetters: design 12 (cell 24 / font 26) | 11 at d2 (cell >= 26, font >= 24); 12 at d3. The design's `fontPx = cell + 2` is dropped: a glyph wider than its cell overlaps; `fontPx = cell - 2` until measured | print legibility |
| 14 | Rows count for Write: design 8 rows h 88; pedagogy 6 rows | 6 rows (inner 639x92): a 64 px picture and a glyphH 28 lane need the height | geometry |
| 15 | K-318's `syllableArcs` primitive vs the design's extension | One primitive `primitives/syllable-arcs.js` with modes printed / blank / dotted; both types call it; `dotted` unused here | shared code |

## 2. Claims removed as unverified or wrong

- Design "n=12 letters at cell 24 fits d2" and `fontPx = cell + 2`: kept only at d3; advance unmeasured.
- Design "d2 pools en animals 17 / zoo 19 / house 38": those are FULL-pool numbers while the same file's filter said `total_agreed >= 3` (which would give 9 / 4 / 16). Replaced by the two measured pools per face.
- Design "vowel-king eligible en 495 / fr 602": true as arithmetic, irrelevant: refused en/fr on pedagogy (silent e).
- Design face (f) "the wrong one is derived, never approved": it is also never DISPROVED by any source; removed with the face.
- Design "lane capacity 21 px per glyph" and "12 letters ≈ 172 px at 0.55 em": both estimates, marked *est.* / OPEN 2.
- Pedagogy "es/pt/it/fi carry a SMALL class of the same defect": es 210/932, pt 179/869, it 145/963, fi 130/1106 lack TeX (14-23 %); fr 430/723 (59 %, almost all mute-e). Restated with numbers.
- Pedagogy "da vehicles 10 strict multi": true before the d2 filter; at count <= 3 and <= 11 letters it is 7 (refused).
- Pedagogy F4 "en clothing 10, house 16, supermarket 18 ship": for the CLOZE yes (plus animals 9); for the SCRAMBLE no theme reaches `min3:2` in en (t3 = 1 there). en Scramble is refused outright.
- Pedagogy "F5 nl animals, fruits, toys, forest, ocean, body refused": measured nl Sort ships on zoo, clothing, house, supermarket only (vehicles 8:1, pets 7:2, fruits 9:3 also refused).
- Both files "K-233 reads approved-words": K-233 is `makeLitSoundMatch` over `data/literacy/syllable-count.json` (`{theme, noun, answer}` items); its comment claims an approved-words gate but this file did not verify it. Boundary text uses only what K-233 renders (a digit).
- K-318-style "answerBox from components.js" for the cloze: the blank must live INSIDE the cell svg to keep the letters aligned; `answerBox` (an HTML div) is not used here.

## 3. Numbers re-measured (2026-09-13)

**TeX agreement, multi-syllable entries (`count >= 2`) / lacking `'TeX'` in `sources_agreed` / `total_agreed` histogram:**

| loc | multi | no TeX | with TeX | total_agreed | rule_authoritative |
|---|---|---|---|---|---|
| en | 607 | 397 | 210 | {2:397, 3:210} | 607 |
| de | 876 | 0 | 876 | {3:212, 4:664} | 0 |
| es | 932 | 210 | 722 | {2:210, 3:722} | 932 |
| pt | 869 | 179 | 690 | {2:179, 3:690} | 869 |
| fr | 723 | 430 | 293 | {2:430, 3:293} | 723 |
| it | 963 | 145 | 818 | {2:145, 3:818} | 963 |
| nl | 766 | 0 | 766 | {3:213, 4:553} | 0 |
| sv | 758 | 44 | 714 | {3:82, 4:498, 5:178} | 0 |
| da | 586 (strict 275) | 0 | 586 | {3:384, 4:202} | 0; `policy_managed` true 392 / false 0 / absent 402 |
| no | 608 | 0 | 608 | {3:90, 4:468, 5:50} | 0 |
| fi | 1106 | 130 | 976 | {2:130, 3:976} | 1106 |

The pedagogy's 397/607 is exact. Every no-TeX entry in en/es/pt/fr/it/fi is `total_agreed 2` (rule + vocab-phonics-syl) with `rule_authoritative:true`; `notes.tex_disagreed_with_rule` marks all of them. sv's 44 are 3-source entries without TeX (NST + rule + phonics), safe.

**Per-face pools at d2 rules (pool / cloze / scramble·t3 / sort c2:c3 / king), fr mute-e refused.** Full table in the scratchpad run; the ship/refuse lines in the design file §3 are copied from it. Headline: base pools >= 8 everywhere except da fruits 5 / vehicles 7 / zoo 6 / body 2 / ocean 5 / pets 5, en body 6, no pets 6, farm animals in five locales. en cloze >= 8 only on animals 9, clothing 8, house 16, supermarket 18. en scramble: t3 per theme 0-3 and never >= 2 where the pool is >= 8. fr after mute-e refusal: base 10-24 per theme; cloze/scramble refused on fruits 2, vehicles 7, ocean 7. da Sort: clothing 6:4, house 10:7 only.

**Geometry re-derived from `page.css`:** inner 675; 2x3 card 330x244 -> inner 302x216 -> stage 204 at inline `padding:6px 0`; 2x4 inner 302x151; six `.ws-lane` rows 120 -> inner 639x92 (border 2, padding 12/16). `textLaneGeometry` scale = `min(glyphH/70, (h-6)/82)` with `LM.ascender 14, base 84, desc 96` (design's numbers confirmed).

## 4. OPEN items

**Engineer**
1. Baloo 2 700 glyph advance at 30/24 px vs cell 32/26 (`m w W`, de capitals, accented `Ä Ö Ü`): measure in the browser; gate rule 9 asserts advance <= cell - 2; if a locale's widest letter fails, lower `cellMax` for that n, never overlap.
2. Lane capacity for a G1 hand: 21 px per glyph is an estimate; measure on a real print; if it fails, cap `maxLetters` (Write 12 -> 11), never lower glyphH 28.
3. Arc zone 32 px vs the Vowel King dot: confirm a 5 px coral dot inside a 3 px teal bowl reads at 8.5 mm; if not, arcH 36 for the king face only.
4. fi `tavutettu`: a render flag on the fi INSTRUCTION STRIP (hyphenated text) for every fi K-1 sheet, outside this type's cards; an `instructionTavutettu` literal slot is reserved in `data/b3/syllable-split.js`; the strip renderer does not support it today (UNKNOWN where the strip would read the flag; engineer locates `.ws-instruction` emission).
5. `.ws-tile` three-tile row at fontPx 22: measure that three 5-letter syllables fit 280 px; else `maxLetters 10` at count 3.
6. Cloze: `syllableWord({blank})` re-lays letters after a 4-cell box; verify the text anchors stay centred per cell when the box is index 0 (de capital moves to the child's pencil).
7. Exact body height (header + instruction + footer) is still UNKNOWN; every stack above leaves >= 20 px slack against 760.

**Panels (per locale, data only)**
8. fi: confirm base = tavuviivat (bar) and Face 2 = the hyphen head; if the panel insists the BASE must be the hyphen form, that is a title swap between base and Face 2 in `strings.fi.json`, not a layout change (the engineer must NOT add a per-locale base mode).
9. nl: confirm "lettergrepen" heads for all 6; `vowelExtra:['ij']`; confirm klinker-per-lettergreep is a groep 3 point or set `kings:false`.
10. sv/da/no: confirm stavelsevokal is a G1 point or refuse Vowel King by data; sv level åk 1 (written) vs the panel's förskoleklass B rating; pt level 1º vs 2º ano (SERP head says 2º).
11. fr: keep `refuse.finalMuteE:true` (default) or ship syllabes écrites with a landing sentence; if flipped, the boundary faces still use the texPool (mute-e words are rule-only there anyway), so only base/Write/Sort widen.
12. de: `sortLabels`, example word, whether the Vowel King example banner also prints dots under `ei/au/eu` as one king (design says yes).
13. Every panel audits the EN source strings as a source, not a target (§23.6 precedent).

**Pipeline / operator**
14. en boundary data: 397/607 multi-syllable entries are rule-only VC/CV with `rule_authoritative:true` (`ac-orn`, `cam-el`, `kiw-i`). The count is 2-source (rule + vocab-phonics-syl) and the file APPROVES it, so the count-only faces use it; if the operator wants >= 3 sources on every printed word, en base/Write/Sort fall to the texPool (animals 9, clothing 10, house 16, supermarket 18, others < 8). Fixing the en rule-syllabifier is a separate commission (snapshot per §A.13.44).
15. da: the strict pool refuses 6 of 12 themes and Sort ships on 2; allowing `policy_managed` words at 2. klasse is a da-only level move for the operator.
16. `tools/apply-b3-locale.js`, `validate-b3-draft.js`, `templates/components-b3.js`, `primitives/syllable-arcs.js`, `scripts/verify-hub-type-rows.js`, and a b3 wave file / ROWS list for `gate-variation-distinct.js` do not exist; ownership = the first design built in the batch (K-317), this file only names the contract.
17. K-233's data gate: `lit-sound-match.js` says its pool is approved-words-gated but reads `data/literacy/syllable-count.json`; verify before any copy claims the two types share a source.
18. Hub gate expectation is 63 rows (en 4, fr 5, others 6): the gate must take per-locale expected counts from the refusal record, never a flat 6.

## 5. Quality verdict (a critical first-grade teacher)

The base is the page I already photocopy: a picture, the whole word big enough to swing under with a pencil, nothing that gives the answer away, and the two follow-ups I actually use (write it with hyphens, fill the missing part) are real pages, not the same page renamed.
I would not hand out the English scramble or the English vowel page, and the file says so instead of padding them; the Danish set is thin and says so too.
What I still cannot see is a printed sample: whether Baloo 2 letters sit inside their cells and whether a six-year-old's hyphenated "supermarket" fits the lane are measurements, not opinions, and the file leaves them open.
