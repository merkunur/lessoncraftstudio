# K-357 `recycling` : EDITOR-CRITIC record (2026-09-21)

Inputs: `_work/K-357-pedagogy.md` (38-item bank, 69 pictures opened, six faces, per-locale bins, validator + render gates) and `_work/K-357-design.md` (measured bin geometry + pill budget with the real fonts, `primitives/bin.js`, a 5-bin mock in colour + greyscale, 80 pictures opened, a `mode` factory). Re-measured by the editor: pill / bank / starter widths with the shell woff2 over `file://` (`K-357-critic-measure.js`: `document.fonts.check` true; `Indifferenziato` 140.3 = the design's number to the decimal), the 37-item bank ×11 (`K-357-measure.js` re-run + the design's 19 extra candidates), the manifest noun lists of eight themes, 42 disputed pictures on a 140 / 64 / 64-grey contact sheet (`K-357-critic-sheet.png`), the design's bin mock (`K-357-mock.png`). Rule applied: measured buildability > preference; the brief > both.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | NEW `primitives/waste-bin.js`, `wasteBin({w,h,color,label,fill:'token'|'white'})`, "the design agent fixes the geometry" | NEW `primitives/bin.js`, px geometry from `w, h` (handle / lid / collar / body), `fill:'lid'|'all'|'none'`, position-keyed white lid MARK 0..4, stroke clamp, node gate | **`primitives/bin.js` with the design's geometry, fill modes and marks**; ONE name, ONE geometry; `fill:'none'` draws no mark (invisible on white) | the design measured it (mock rendered in colour + greyscale; blue and brown lids print as one grey, the mark is what separates them); the pedagogy delegated the geometry |
| 2 | 38 items: glass 7 incl. `kitchen tools/bottle` (OPEN 1), plastic 8, metal 4 (`can`, `saucepan`, `bolt`, `nut`), organic 13; composites / ceramics excluded | ~45 items: paper incl. `book` / `folder` / `bag`; glass incl. drinking `glass` + twins; plastic `water juice shampoo bucket`; metal `can pot pan kettle key fork`; ceramics (`cup mug bowl pitcher jug vase`) feed the residual bin | **37 items = the pedagogy's 38 minus `kitchen tools/bottle`** (editor re-opened: a metal-look cap on a body that reads glass OR PET; ambiguous → excluded, OPEN 1 closed). `saucepan` / `bolt` / `nut` re-opened: all-metal (saucepan has a metal handle) → metal non-packaging KEPT. `pot` (enamel or ceramic) ambiguous, `pan` (glass lid), `kettle` (plastic handle), `fork` (green handle) composite, `key` / `book` not waste, `juice` / `bag` / `folder` ambiguous, drinking `glass` not container glass, ceramics not a material (the lock) → all OUT. `cookie` not needed (organic 13) | the lock: composites / ceramics excluded, the library draws products; "ambiguous material = excluded, never signed" (pedagogy rule, kept); the residual bins are fed by non-packaging plastic via `route`, not by ceramics |
| 3 | bins 120 × 150, N × 120 + (N-1) × 18 = 672 at N = 5; 12-char label cap *est.* | `binW = min(210, floor((675-34-(N-1)*14)/N))` = 117, `binH` 176, margins 17, pill <= 151 + adjacent half-sums <= 125, all measured | **design's 117 × 176 / 17 / 14 and the two measured pill rules**; the 12-char cap becomes a 15-char draft rule + the render measurement (`Glass og metall` is 15 chars at 140.0 and legal; `Pappersförpackningar` 195.8 refused) | measured > estimated; a char cap is not a width |
| 4 | strip `itemPx:78`, 8 in one row | tile 72 / icon 60, 8 × 72 + 7 × 12 = 660 | **72 / 60**: 8 × 78 + 7 × 12 = 708 > 675, the pedagogy's strip does not fit | arithmetic |
| 5 | composer: 1 per bin then round-robin to `perBinMax:2`, shuffled, position-leak + family re-draw; excluded-for-locale slot re-drawn | per-locale `quota:{bin:n}` summing to 8 | **the pedagogy's composer**; `quota` dropped (one fewer authored field; the 5-bin distribution 2/2/2/1/1 emerges from `perBinMax:2` and pools) | fewer literals per locale; the sweep varies bin loads |
| 6 | one spec, additive `layout` knob, `data-lcs-*` stamps | `types/_shared/recycling-tasks.js` factory keyed on `cfg.mode`, `data-rc-*` stamps | **one spec `types/k/K-357-recycling.js` + `layout` knob + `data-lcs-*`** (the K-354 / K-356 sibling shape; the role brief names `data-lcs-*`); components in `templates/components-b4/recycling.js` as both said | sibling consistency; PARAM/CODE doctrine rule 5 names "an additive knob on `build()`" |
| 7 | F1 = a grid, one COLUMN per bin, header pills, cell = a 56 × 50 bin outline | F1 = six rows, N mini bins 44 × 66 in 64 × 80 tiles per row, a 56 × 84 key strip with words at the top; 702 at `minmax(90)` | **design's rows + key**; rows re-derived to `minmax(85px,1fr)`: 112 + 10 + 6 × 85 + 40 = **672 <= 677**, so the fi four-line title no longer breaks it (tile 80 + 4 border = 84 <= 85); the pedagogy's "fi F1 title <= 3 lines" validator check stays recorded | the design's 702 failed the 677 stack by 25 px; 85 fixes it without touching any element size |
| 8 | F2 = 2 × 4 cards, `writingRow` 214 wide, glyphH 30, word cap 12 | F2 = 8 rows, `letterBoxes` 30 px, cap 9 graphemes | **8 rows (design's row grid) with `writingRow({w:400,h:58,glyphH:30})` (pedagogy's apparatus), no letter boxes, cap 12**; stack 8 × 62 + 56 + 69 = 621 <= 677 | the pedagogy's 2-column card does not fit (30 + 12 + 80 + 12 + 214 = 348 > 306 inner); letter boxes give the grapheme count away and are `G1-244`'s own look (`G1-244:69`, Fact 9 "every letter-box face is the write-the-word neighbour"); handwriting belongs on school lines (brief) |
| 9 | F3 = G2, 4 rows × 4, pic 76 | F3 = G1, 4 rows × 4, boxes 120 / icons 84; "d3 at the G2 register" | **G2 with the design's geometry** (icons 84; rows `minmax(156)` + stage padding 6 → 666 <= 677) | 16 pictures exceed the G1 ceiling 12 and sit in G2's 8-16 band (`_tokens.js density`); the band follows the density table, not preference |
| 10 | F4 legend = colour word + bin word (two literals); bins white with 2 example pictures inside | F4 legend = chip + bin word; bins 117 × 320 `fill:'none'`, no examples; legend order != bin order | **legend = swatch + colour WORD + bin word** (the colour word is the mono signal; a grey chip on a mono print says nothing), bins 117 × 260 `fill:'none'`, **two example pictures on a 64 px shelf UNDER each bin** (never inside the crayon area), legend shuffled; stack 431 | brief: "the colour WORD stays the B&W signal"; the examples are the "cartelli / cores das lixeiras" bin-sign demand; a picture inside the fill region collides with the crayon |
| 11 | F5 = 3 columns of `drawBox` 195 × 300 + `writingRow`; 3 × 219 + 28 = 685 > 675 (self-flagged) | F5 = 3 lanes `30 170 1fr` with a printed starter "I recycle …" on row 1 | **design's lanes (624 <= 651, 612 <= 677) WITHOUT a starter at d2**; `starters` optional, gate-measured <= 140 px | the pedagogy's columns overflow; the stems measured at 22 px (`Jeg resirkulerer` 156.7) scale to ~256 px at the metric starter size, above any honest budget in five locales, and fi's stem forces a partitive |
| 12 | F4 contingent: sv expected refused, no / en / it / da need a ruling; `classroom` allowed with a landing sentence | "6 rows per locale, no refusal expected" | **per-locale ruling in §7: en REFUSED (5); de / es / pt / fr / fi confirmed national; it (UNI 11686), nl (glas token), sv / da / no (Nordic pictogram colours) contingent national, else refused; `classroom` NOT accepted** → 65 expected, floor 60 | a face is "a change in what the child LEARNS"; without the locale's real colours F4 is K-241 with bins for shapes (the Boundary); honesty > rows |
| 13 | `data/b4/recycling-locales/<loc>.json` | `data/b4/locales/recycling.<loc>.json` | **`data/b4/locales/recycling.<loc>.json`** + `data/b4/recycling.js` (en block) + `data/b4/recycling.json` (global) | the README recipe and K-356's shape |
| 14 | `rest` items = non-packaging plastic routed per locale | `ceramic` as a 7th material feeding the residual bin; `rest` not a material | **materials = 6; no `ceramic`, no `rest`**; residual bins are fed by `route` (toothbrush, comb, spoon, bucket) | the lock excludes ceramics; a residual bin with no pool is a validator ERROR the locale must resolve in data |
| 15 | F2 organic word optional (single token) | F2 materials = exactly 4 literals (paper glass plastic metal), cardboard "counts as paper only if the panel says" | **pedagogy's**: `materialWords` 2-6, cardboard may share the paper word, organic optional single token | es needs 2 (`reciclable` / `orgánico`, the confirmed re-target), which a fixed 4 cannot express |
| 16 | `perBinMin` 1 → sv metall pool 1 allowed | quota "never asks plastic for > 2"; sv not computed | **sv metall = `can` on every page; validator WARN, not a refusal; recorded in §4 and §7** | the pool is measured (packaging-only metal = 1 item); the alternative (allow non-packaging metal in sv) contradicts the sv panel's fraction |
| 17 | pedagogy F4 config `binH:180`, pic 56 inside | design `h:320`, fill region the whole bin | **260** with a 64 px shelf; crayon body 84 × 182 | keeps the fill region generous while leaving room for the examples under the bin inside 677 |

## 2 Claims removed or downgraded as unverified

- Design §5 "paper: `classroom/book`, `folder`, `At the Supermarket/bag` (clear)" → removed (book is not waste; folder and bag are of unreadable material at 64 px; the K child would sort a gift bag as paper and might be wrong).
- Design §5 "metal: `pot`, `pan`, `kettle`, `key`, `fork`" → removed (opened: enamel pot, glass-lid pan, plastic-handled kettle and fork are composite or ambiguous; a key is not waste).
- Design §5 "`kitchen tools/glass` (drinking glass, clear even in mono)" as glass → removed (a drinking glass is Restmüll / restavfall in de / sv / fi; container glass only).
- Design §5 ceramics feeding the residual bin → removed (the lock).
- Design §7 "6 rows per locale, no refusal expected" → downgraded to 65 with the §7 contingencies.
- Design §7 F3 "G1" → corrected to G2 by the density table.
- Design §6 "starter <= 200 px ... de 'Ich sortiere' *est.* ~120" → replaced by measured stems (`Ich recycle` 106.9 at 22 px ≈ 175 at the metric size) and the starters-off ruling.
- Pedagogy F1 "d3 cell 48 < K floor 56: NOT a K page" → moot (F1 d3 re-specified as the design's 56 × 70 chip tiles at the G1 register).
- Pedagogy F5 "3 × 219 + 2 × 14 = 685 > 675: the design agent sets card padding 8 or drawW 185" → replaced by the lane layout (no 3-column card grid).
- Pedagogy "label capped at 12 chars" → replaced by 15 chars + the measured px rules (a 12-char cap would refuse `Glass og metall` at 140.0, which is legal, and pass a 12-char label wider than 151).
- Pedagogy Facts "recycling pools paper 5 · organic 7 · glass 2-3 · plastic 2-4 · metal 1-3" (the panel's pre-bank estimate) → superseded by the counted 37-item bank (paper+cardboard 6 / glass 6 / plastic 8 / metal 4 / organic 13).
- Pedagogy "F1 stack ~500, F2 549, F3 440 *est.*" → replaced by the ruled stacks (672 / 621 / 666).
- Design "the design agent RE-OPENS `kitchen tools/bottle`" → done by the editor; excluded.
- Both files' "colours vary by comune" (it) → kept as a landing sentence; the UNI 11686 standard is named as the panel's anchor `[NSR]` (the editor did not verify the standard's colour table against a primary source; the panel does).
- The Nordic pictogram colour system (sv / da / no) is asserted by the editor from memory of the Dansk Affaldsforening / Avfall Sverige / Avfall Norge adoption; it is marked `[NSR]` and is a CONTINGENCY, not a confirmed row.

## 3 Numbers re-measured (which won)

| number | pedagogy | design | editor (m) | won |
|---|---|---|---|---|
| base strip, 8 items in one row | 78 px items (708 > 675, not stated) | tile 72 / icon 60 = 660 | 660 <= 675 confirmed | design |
| binW at N = 5 / binH | 120 / 150 (672 row at gap 18) | 117 / 176 (641 row, margins 17) | 117 = floor((675-34-56)/5) confirmed | design |
| base stack | ~330 *est.* (at 150 bins) | 91 + 425 + 206 = 722 | 722 at 3-line chrome; 677 → zone 380 | design |
| pill `Indifferenziato` 17 px | "> 12 chars: 2-line or 15 px" | 140.3 | 140.3 (pill incl. padding 20 + border 5) | design |
| pill `Glass og metall` / `Glass/metall` | 12-char cap | 140.0 / not measured | 140.0 / 118.9 | editor adds the short form |
| pill `Pappersförpackningar` (sv longLabel) | not measured | not measured | 195.8 → refused as a pill | editor |
| key pills at 15 px | not measured | it 102.6 (text?) | `Indifferenziato` 122.6 as a pill, `Secco` 59.2 | editor |
| bank rows Nunito 800 18 | "one row" | fr ~406 *est.* | en 502.7 · it 501.5 · fr 497.7 · pt 492 · nl 478.4 · sv 477.9 · de 476.4 · fi 457.3 · es 245.5, all <= 663 | editor |
| F1 stack under 677 | ~500 *est.* | 702 (rows minmax 90) | 672 at minmax 85 | editor |
| F2 stack | 549 (2 × 4 cards) | 701 (8 rows minmax 72 + letter boxes) | 621 (8 rows minmax 62 + bank 69) | editor |
| F3 stack under 677 | 440 *est.* | 4 × 170 + 42 = 722; stage 146 | 4 × 156 + 42 = 666, stage 132 = 120 + 2 × 6 | editor |
| F4 stack | ~330 *est.* | 419 (bins 320) | 431 (bins 260 + shelf 64 + legend 69) | editor |
| F5 width | 685 > 675 (self-flagged) | 624 <= 651 lane inner | 624 confirmed; lanes 612 <= 677 | design |
| starter stems at 22 px | none | "~120 *est.*" | 83.7 (en) … 156.7 (no) | editor → starters off |
| bank ×11 coverage | 38 / 38 | "checked" | 37 / 37 resolve with a singular in all 11; `frying_pan` has no vocab entry | pedagogy list minus one |
| F3 trio floor | every class >= 3 families | plastic 4 (packaging only) | paper+cardboard 6 / 5 fam · glass 6 · plastic 8 · metal 4 · organic 13 | pedagogy (plastic = packaging + non-packaging on F3) |

## 4 OPEN items

1. ~~`kitchen tools/bottle` glass vs PET~~ CLOSED: excluded (editor re-opened).
2. `beach/bucket` (bulky toy) in the non-packaging plastic pool: keep or `excludeItems` per locale (fi panel signalled "not packaging").
3. Whether `organic` gets a single-token F2 word (de "Bioabfall", sv "matavfall", fi "biojäte"; en excluded).
4. fr 3 national bins vs 4 with biodéchets (if 3, organic routes to Ordures; the fr panel rules and the landing says which).
5. nl `glas` colour token distinct from GFT green (F4 contingency).
6. F4 national colour sets for it (UNI 11686), sv / da / no (Nordic pictograms): each panel confirms five distinct `codeColors` tokens + colour words `[NSR]`, else `refuse:['color']`.
7. The merges: da pap into papir (else `cardboard` in `excludeItems`), fi kartonki into "Paperi" (`longLabel` "Paperi ja kartonki").
8. sv F5 title without a "sorterar" verb ("Källsortering: tre saker hemma").
9. `[NSR-FLAG][no]` glass og metall as ONE bin + small metal routing: a Norwegian teacher confirms the five literals before the bank is authored.
10. es `pepper` in landing prose only (Pimiento vs chile; the picture is a bell pepper, opened).
11. en F4: refused at design time; only an operator overrule (accepting a classroom key next to K-241) raises en to 6.
12. F5 `starters`: any panel literal must measure <= 140 px at the metric size; expected empty in all 11.

## 5 Quality verdict

I would print the base, F1 and F3 for my class tomorrow: eight real products a five-year-old recognises, the bins they have seen on their own street with the word on a pill, one pencil line each, nothing else on the page; the which-bin rows give the same drawing back at chip size with the key strip above, and the odd-one-out with four DIFFERENT objects is a genuine grade-2 think ("three of these are glass") that no other sheet in the catalogue asks. What would embarrass me: a bin colour that is not the one my Landkreis or kommune uses (which is why F4 is refused wherever no national standard exists and why every F4 landing names its standard), a pale lined `classroom/paper` next to a pale `post office/letter` on a mono photocopy (both flattened on my sheet; the composer keeps them apart), the sv metal bin showing the same tin can on every page (a pool of one; I said so rather than padding it with a saucepan the sv fraction refuses), and a residual-bin label that is adult register ("Indifferenziato" is legal by width and still the wrong word for a six-year-old; the it panel writes "Secco"). The two things I could not verify and have marked as the panels' job are the UNI 11686 and Nordic pictogram colour tables; if a panel cannot map five bins to five distinct tokens, that locale ships five faces, not a wrong sixth.
