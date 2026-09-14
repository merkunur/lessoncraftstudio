# G1-310 `hundreds-chart-puzzles` : editor-critic record (2026-09-14)

Inputs: `_work/G1-310-pedagogy.md` (P) + `_work/G1-310-design.md` (D). Output: `../G1-310-hundreds-chart-puzzles.md`. Doctrine: measured buildability beats preference; the brief's rules beat both. (m) = measured today by node / puppeteer (`g1310-critic-measure.js`, scratch, shell woff2 + `page.css`). No em-dashes.

## 1 Contradictions + resolutions

| # | P says | D says | ruling | why |
|---|---|---|---|---|
| 1 | anchor fill creamDeep | tealSoft + teal 2 px | **D** | tealSoft is the shipped given-chip tint (`neighbors.js:9`, m); creamDeep is the shadow and would read as "not a cell" |
| 2 | blanks = G1-129 coral dashed | grey dashed (`.ws-answerbox` twin) | **D** | 32 write-ins per page; `.ws-answerbox` = `2px dashed #C8BFAE` = token `grid` (m, `page.css:225`); coral reserved for arrows / pointers |
| 3 | piece numerals 22 (G1-129's `cell*0.36`) | 26 | **D** for the anchor (G1 `fontChoice` 26, `_tokens.js:69`); printed-all pieces (F1 / F4) at 20 (`round(56*0.36)`) | the anchor is the only printed numeral on a write-in piece; "88" at 26 = 26 px, "100" = 39 (m) fit a 56 cell |
| 4 | F1 = `hundredsChart({cell:44})` 448 + side tray 213, lettered pieces A-D | `chartOutline` 468 above four printed pieces, no letters, d3 = 4 pieces | **D** | `hundredsChart` has no target stamps and coral missing cells; the pedagogy's 5th d3 piece: 5 x 140 + 48 = 748 > 675; letters read as chart characters |
| 5 | F2 chips 36 (d3 30) | chips 40 (d3 34) | **neither**: 36 at d2 AND d3 | D's "64+8+3x40+16+8+20+8+64 = 284" is 308 > 302; at 36 the row is **296** (m); d3 4 x 36 + gaps 4 = 296 <= 302, so the sub-floor chip is unnecessary |
| 6 | no compass | `chartCompass` at d1 + every G2 face | **D** | up = -10 is not self-evident; a legend is not an answer |
| 7 | F3 = worded clue frames x11 + per-locale refusal | two converging icon clues, no refusal | **D** (brief: no words on the apparatus) | one solution confirmed: each clue is a deterministic single move; the column rule applies to the +-1 clue; verify asserts agreement (P7) |
| 8 | F4 box right of a cell-48 piece | cell-56 piece + box, 276 <= 302 | **D** | bigger cells at the same fit |
| 9 | bank `HCP[loc].chart:{start,end}` + `frames` | range via wave `unitOverrides`, no bank | **merged**: bank `exemplar` (a `UNITS` key) + wave `unitOverrides` when `unitAxis` lands | README: ONE fan mechanism, additive-with-fallback reads the bank's exemplar; `frames` dropped with F3's words |
| 10 | units incl. `10-1000 step 10` | four units, no tens chart | **P** (task brief lists the tens chart) | `step` carried on `UNITS.tens`, G2 only, formula generalised `v = origin + step*(10r + c)` |
| 11 | de / it / nl: recommend G2 key on all faces | "bands per the pedagogy" | **ruled per locale**: de `2-klasse`, it `classe-seconda`, nl `groep-4` on all six; the other eight split G1 / G2 keys; deck `gradeBand` stays per face id | the landing LEVEL key is the locale's band, the CCSS band is locale-neutral; both stated in §1 |
| 12 | d2 base "writes 32-40 numerals" | shapes sq3 x2 + plus + L3 + T3 x2 | **32** (m, arithmetic) | 8 + 8 + 4 + 4 + 4 + 4 |
| 13 | F1 4 pieces vs the G1 item floor [6, 12] | silent | **ruled**: the item on F1 is the write-in cell (20-28) | a piece holds 5-9 answers; recorded so the QA log does not flag it |
| 14 | base coordinate `mode:null` | none | `mode:null` (K-319 precedent; G2-315 used `'base'`) | sibling files disagree; the newest precedent wins, noted here |

## 2 Claims removed as unverified or wrong

- D: "card slack 203 - 188 = 15": the stage's default `padding 6px 4px` (m) leaves 191; true only under an inline `padding:0`, now a stated rule for every stage on this type (G2-315 F3 precedent).
- D: "d1 card inner 179 >= 176": same cause; holds under `padding:0`.
- D: F2 row "= 284": withdrawn (308 at 40 px chips; 296 at 36, m).
- D: "F2 d3 chips 34 px, a printed glyph not a write-in": withdrawn; 36 fits.
- P: "F3 frames must exist … a locale whose panel cannot write a child-natural riddle REFUSES F3 (5 faces ship)" and the hub expectation "5 for that locale": dead with the icon build; expectation is 6 x 11 = 66.
- P: "the shipped nl landing sits at groep 3: panel rules": ruled here (groep 4), not left to the panel; same for de / it.
- P: "Baloo 2 numerals 22 px" as the house numeral: G1-129's size, not a floor; this type prints the anchor at the G1 floor 26.
- P + D: the three-way `assetClass` values in the brief (`geometry|icon-placement`) do not list `numeral-charts`; G1-129 ships `numeral-charts` (m), so the value is legal by precedent.
- P: "shipped title roots OFF-HEAD": VERIFIED for the G1-129 DECK titles (es "El cuadro del cien", pt "O quadro de cem", fr "La grille des nombres", it "La tavola del cento", sv "Hundratavlan", da "Hundredtabellen", no "Hundrekartet"; fi deck "Satataulu" vs slug `lukutaulu`), m. The LANDING titles are on the taxonomy head in all 11 (m). The §1 table carries both columns.

## 3 Numbers re-measured (m)

| item | P | D | measured | wins |
|---|---|---|---|---|
| Baloo 2 700 "88" / "100" / "1000" at 26 | - | *est.* 30 / 42 | 26 / 39 / 52 (tabular 0.5 em; at 24: 24 / 36 / 48; at 22: 22 / 33 / 44) | measured; `tens` unit anchor at 24 |
| card / stage box | inner 203 x 302 | 302 x 203 | card 330 x 231; stage outer 302 x 203, padding 6 4 -> 294 x 191 | `padding:0` rule |
| F2 d2 row | 276 (5 gaps of 8 at 36) | 284 (at 40) | 296 at 36 (given 64, 3 chips, pointer 20, answer 64, gaps 8) | 296 |
| F2 d3 row | 320 > 302 -> 30 px | 288 at 34 | 296 at 36 with gaps 4 and no pointer | 36 |
| `number-charts` landings per locale | "4 hub landings" | - | 4 x 11 = 44 (K / G1 / G2 / G3) | agree |
| `.ws-answerbox` border | - | `#C8BFAE` dashed 2 | `rgb(200,191,174) dashed 2px` | agree |
| `unit` in `enumerate.js` | 0 | - | 0 | agree |
| slug collisions across axes x11 | - | - | 0 | clean |
| `strand-names.ts` NBT row da / no | present | - | present (`:100-112`) | agree |
| EN titles <= 70 | - | - | 49 / 24 / 31 / 38 / 34 / 30 | pass |

## 4 OPEN items (numbered)

1. **`unitAxis` is unbuilt** (`enumerate.js` has no `unit`, m): the wave ships `1-100` per face; `101-200` and `tens` (the only 2.NBT.B.8-honest units) wait for the mechanism; `b3-baseline --check` must treat a locale-pinned `exemplar` (fr `0-99`) as authored, not drift.
2. **fr convention pin**: `0-99` (Cap Maths CP) vs `1-100`; the fr panel pins; with `0-99` the F0 title carries "de 0 à 99" and the exemplar deck differs from the other ten (allowed).
3. **`chart-fragment.js` is a new primitive** and `components-b3.js` does not exist (m): the F1 board at cell 46 + 16 px guides, the compass at 675, and every G2 row are engineer renders before any copy claims a level.
4. **b3 tooling absent** (m): `tools/apply-b3-locale.js`, `validate-b3-draft.js`, `register-b3-en-content.js`, `qa/verify-b3-*.js`, `scripts/verify-hub-type-rows.js`; a b3 wave file + ROWS list before `gate-variation-distinct.js` can run.
5. **F3's teaching weight** (critic's own): with icons, clue 1 alone solves the item and clue 2 is a check; the "mystery" is thinner than the worded genre. Accepted because the brief forbids words on the apparatus and the two-clue agreement is the verify hook; if a panel judges it too thin for its market, the honest fix is a d2 where clue 1 is a TWO-arrow path (the d3 shape), not a worded frame.
6. **Live defect, out of this brief's scope:** the shipped fi landing `lukutaulu-100-1-luokka` carries a U+00AD soft hyphen inside "Sata­taulu" in BOTH `title` and `h1` (`frontend/content/seo-landing/fi.json`, m). A one-landing, two-field fix; §21.5a's freeze window has passed; do it in the build session and grep the 11 corpora for `­`.
7. **`mode:null` vs `'base'`** for the base coordinate: siblings disagree (K-319 null, G2-315 'base'); the hub gate must accept whichever the b3 emitter standardises; decide once for the batch.
8. **da head** (hundredfelt / hundredtavle / taltavle) and **no head** (hundrerutenett vs taxonomy `hundrerute`): panel calls; the taxonomy `name` for the new key follows the panel's head.

## 5 Quality verdict (a critical G1/G2 maths teacher)

The base page is the real thing: six loose pieces with one number each force the row-is-tens, column-is-ones step that a whole chart with holes never does, and the no-wrap rule is exactly the trap I mark wrong on paper every year. F1 (put the piece back) and F5 (count the jumps down and across) are the two I would photocopy first; F4's error hunt is a genuine check-your-neighbour habit.
F2 is honest but familiar, and F3 as pure arrows is the weak one: a child who solves the first arrow has the answer and only a conscientious one confirms with the second.
Keep the compass on every G2 page and the grey (not coral) blanks: 32 coral boxes would look like a test.
