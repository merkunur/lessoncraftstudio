# G2-377 `cursive-writing`: editor-critic record (2026-09-23)

Inputs: `_work/G2-377-pedagogy.md`, `_work/G2-377-design-A.md`, `_work/G2-377-design-B.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md`, `_BUILD-BRIEF.md`, `README.md`, `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md` (cursive sections), `_records/harvest-candidates.<loc>.json` + `_records/v2/harvest-candidates.<loc>.json` (cursive blocks, read in full for en de es pt fr it nl da no; sv v2 0 uniques, fi v2 6), `_records/cursive-font-probe.png` (opened), skeleton `../b5-designs/G1-380-digraphs.md`. Repo files verified: `assets/fonts/cursive/*.woff2` (15), `assets/fonts/cursive-fonts.css`, `primitives/font-metrics.json` (no cursive keys yet), `tools/measure-font-metrics.js`, `tools/alloc-b6var-ids.js`, `tools/validate-b6-draft.js` (`WORKSHEET_WORD`, free-claim), `lib/b6-common.js`, `templates/components-b6.js`, `templates/components-b4/cloze.js` (`derange` lineage), `data/b2/sentences.js` names, `frontend/config/topics-taxonomy.json` (`apps['cursive-writing']`, en-only axis), `frontend/lib/seo/strand-names.ts` (`'Writing'` row), `scripts/seo-landing/gen-b6-landings.js` (LEVEL_KEYS, level from id band). Editor scratch: `scratchpad/G2-377-crit-{metrics,joins,gap,stack,pics,vis}.js` + PNGs.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | fr unit fr-trad, it unit it-trad | A: fr-moderne (panel re-decides), it-moderna; B: fr-trad recommended, it-moderna | **fr-trad, it-trad** (lead ruling) | measured: fr-moderne lifts after f g q j and has unlooped b f h k l; it-moderna renders joined print without loops (opened `G2-377-crit-vis.png`); the school hands loop. Brief > both |
| 2 | x-height from canvas ink: xH .531/.516 | A same; B ".52 in all 15 fonts" | pedagogy/A table (m identical) | re-measured with the same method as `measure-font-metrics.js`; B's rounded value would put the x-line up to 0.5 px off per 20 px |
| 3 | render cursive, SVG text shaping UNKNOWN | A: SVG `<text>` + tspans; B: SVG `<text>`, "joins real in all units" (tested `aaa` only) | **HTML text spans over an SVG ruling** | m: 176 strings × SVG vs HTML at 200 px; SVG gave extra ink islands (190-300 px²) in 27 strings where HTML and canvas gave 1 piece (us-trad br bread robot horse, de sch, mx ll sol lobo flor llave, nl boom boek koud brood, no sk stol); the join is the product; measured buildability wins |
| 4 | base: model + chain of 3 + open, then an empty row; 3-5 letters | A: one strip per letter, 6 letters, empty band on the same line; B: 4 two-row blocks | **two-row block (pedagogy/B) on A's paper grammar** (margin rule, measured-ink lines, Mittelband tint) | a full empty row per letter doubles independent writing; A's margin rule gives every face one grammar |
| 5 | tracing = model in grid/inkSoft tone | A: solid `grid` fill (dotted/hollow/tealSoft/weight rendered and rejected); B: `grid` trace | solid `grid` #C8BFAE, no dotted claim anywhere | A's render test; lead ruling |
| 6 | no stroke arrows; no dots | B: coral start dots, panel-picked endpoints, gated | **not shipped in v1 at any level**; slot reserved for a future d3 feature | B's own measurement: endpoint ≠ start (de-va d), o and 7-13 letters/unit have no candidate; the gate can prove "on an endpoint" only; a wrong start teaches a wrong movement; "never guess a start" |
| 7 | - | B: rhythm ticks on row B at the model's advance | rejected | a child's letter width is not the font's; ticks would ask for an unreachable size |
| 8 | - | B: coral join mark under the join x | rejected | the join is a stroke, not a point; the x came from SVG `getSubStringLength`, which the HTML ruling (row 3) removes |
| 9 | density floors x ≥ 14 (G1) / 11 (G2-3) | A: X ≥ 14; B: X ≥ 16 G2 / 18 G1 | **X ≥ 15 at G1-level pages, ≥ 14 at G2-G3** | B's floors do not fit five vowels in es/it (m: es needs X15 for 676, it X16 for 676); pedagogy's 11 is below a seven-year-old's pencil; 14-15 px = 3.7-4 mm = real notebook x-bands |
| 10 | pt lesson 0 = a e i o u at G1 | (A/B silent) | **re-cut to a e i o; u moves to "u v x z"** | m: five vowels at br need X13 (< G1 floor 15); validator capacity rule; panel may re-cut differently within capacity |
| 11 | F1 capitals 5, F2 joins 6, F3 words 4, F4 6, F5 3 | A: 6 capitals, 6 pairs, 4 words, 8 read; B: 4 capitals, 6 single-row pairs, 4 words, 6 read | capitals 5, joins 5 (two rows), words 4, read 6, copy 3; `min(target, capacity)` per unit | every count recomputed at 677 (§3 table); pt/fr/nl drop to 4/4/3 where the measured stack says so |
| 12 | fr Seyès x = 1 interline, 4 mm CP / 3 mm CE1 | A: il 14 px ("agrandi"); B: 3 mm, pitch 12 i with a skipped line | 4 mm (15.12 px) at CP, 3 mm (11.34 px) at CE1, pitch 12 i with the skipped line | real paper sizes (703 px / 186 mm); the skipped line keeps printed descenders away from printed ascenders |
| 13 | F5 model under sentence 1 at d2 | A: first word only; B: no model | pedagogy (first sentence fully in grey) | shows the capital, every join and the full stop once, then two unsupported transfers |
| 14 | ruling tint per locale | A: tint on us3 too; B: tint on band4/double only | tint only on `lin4` and `doble` | US and Seyès paper are not tinted; authenticity |
| 15 | model ink colour | A: teal; B/pedagogy: ink | ink #3A3530 | a handwriting model reads as pen/pencil; ink prints darkest in greyscale |
| 16 | picture pool 27 keys (wolf, bear excluded) | A: 19 incl. dog, ball, key; B: 11, cherry excluded, "duckling still duck" | pedagogy's 27 + exclusions wolf, bear, cherry; duck kept | editor opened all 43 candidate keys (`G2-377-crit-pics.png`) |
| 17 | levels per locale (fr/pt/it/nl base G1) | A/B: band data | kept; **flagged a tool gap** | `gen-b6-landings.js:247` takes the level from the id band and has no per-unit deck (m); build adds an additive override |
| 18 | de VA/LA split base,joins,copy = VA; capitals,words,read = LA | A/B: split per lock | pedagogy split (matches the Germanic panel's proposal) | both unit decks published per face (12 decks), landings 3/3 |
| 19 | es/it F1 conditional | same | default BUILD, contingency recorded in §7 | v2 harvest: es "letra cursiva mayúscula" ×5+, it "corsivo maiuscolo" ×22 |
| 20 | script name on the page: - | A: ribbon label + scriptName + scriptTag; B: ribbon letters only | ribbon = cursive letters + scriptName; faces carry a 24 px scriptTag | a de teacher must see VA vs LA on paper; 1 literal per unit; stacks still ≤ 677 (m) |

## 2 Claims removed or downgraded as unverified

- B: "real joins in all 13 units (SVG `<text>`)": true only for `aaa`; SVG breaks 27 of 176 strings (row 3). Removed.
- A: "shaping is active, so SVG tspans are fine" (measured on canvas, not SVG). Removed.
- B: per-unit "stroke" widths and skeleton endpoint counts: not re-measured; irrelevant once dots are out (kept as provenance for a future d3 feature).
- Pedagogy: "fr-moderne is FR Moderne of the ministry model" (selection file): the MEN 2013 model loops b f h k l; the font does not; downgraded to rejected.
- A's `pictureWordBlock` 116×150 tile and 8-pair reading layout: not adopted; counts recomputed.
- B: nl F1 "3 capitals" and br "3 capitals": re-measured as 4 each with the final layout.
- Title "Letra ligada: cómo unir las letras en cursiva" (pedagogy): both synonyms in one title is stuffing (Germanic panel rule); replaced.
- Any "pontilhado / tratteggiato / dotted" title head from the harvest: the page has solid traces, so those heads would be false claims; banned (validator rule 7).
- Pedagogy F2 d2 6 pairs × 2 rows: does not fit (m: needs X ≤ 13 in us-trad); 5.

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | editor (m) | won |
|---|---|---|---|---|---|
| us-trad xH / asc / desc | .531 / 1.031 / .531 | .5313 / 1.0313 / .5313 | .520 / 1.020 / .520 | .5313 / 1.0313 / .5313 | pedagogy + A |
| fr-trad asc / desc | 1.438 / .938 | 1.927 / .925 (line box) | 1.430 / .930 | 1.4375 / .9375 | pedagogy |
| nl asc / desc | 1.297 / .797 | same | 1.295 / .795 | 1.2969 / .7969 | pedagogy + A |
| no lifts | after f g j y z | - | - | fa ga ja ya za = 2 pieces each | pedagogy |
| dk-uloopet lifts | after f g j q y | - | - | fa ga ja qa ya = 2 each; dk-loopet fa/ga/ya = 1 | pedagogy |
| join pairs (all shipped units, HTML) | 1 piece | - | `aaa` 1 | every pedagogy pair 1 piece + expected diacritic pieces (fr oi 2, nl ij 3, ui 2, pt ão 2) | pedagogy |
| SVG vs HTML pieces | UNKNOWN | assumed equal | assumed equal | SVG extra islands in 27/176 | editor (HTML) |
| `aaa` vs 3×`a` width | - | 1.892 vs 1.866 em | - | 1.892-1.893 vs 1.866 | A |
| base d2 stacks | 692 fr etc. (722) | 722 (6 strips) | 108+8·rowH | en 614 · de 614 · es 676 · pt 630 · fr 555 · it 676 · nl 670 · da 610 · no 655 (all ≤ 677) | editor |
| F1-F5 stacks | - | 678 / 696 / 688 | ≤ 722 | max 672 (F1/F2 de-va, F1 it), F3 pt 668, F4 fr 638, F5 nl 652 | editor |
| Seyès interline | 4 / 3 mm | 14 px | 11.34 px | 15.12 px (4 mm) / 11.34 (3 mm) | pedagogy mm, editor px |
| names initials | en 6, de 7, es 7, pt 7, fr 7, it 6, nl 7, da 8, no 7 | same | - | same | all |
| slug collisions (9 proposed) | - | - | - | 0 | editor |

Harvest heads used in §6 (verbatim, both rounds): en "cursive letters", "cursive writing 2nd grade", "cursive connecting letters worksheets", "cursive words for kids", "cursive sentences to copy", "cursive sentences grade 3", "cursive letters capital" · de "schreibschrift üben klasse 2", "vereinfachte ausgangsschrift arbeitsblatt", "lateinische ausgangsschrift übungen klasse 2", "buchstabenverbindungen schreibschrift üben", "schreibschrift wörter üben", "schulausgangsschrift" ×21 (SAS demand exists: v2 raises the case for a native SAS check) · nl "aan elkaar schrijven groep 3", "schrijfletters groep 3 werkbladen", "hoofdletters lopend schrift", "verbonden schrift hoofdletters", "verbonden schrift groep 3" · es "abecedario en letra cursiva para segundo grado", "letra cursiva mayúscula", "planas de vocales en letra cursiva", "oraciones en letra cursiva para segundo grado", "lectura en letra cursiva" · pt "letra cursiva atividades 2 ano", "alfabeto cursivo maiúsculo", "palavras em letra cursiva para copiar", "alfabeto cursivo atividades de transição da letra bastão para cursiva" · fr "écriture cursive cp", "écriture cursive majuscule ce1", "lettre majuscule cursive ce1" (v2 "liaisons" returned 0 strings: F2's fr head is thin, "attacher les lettres" is the teacher phrase) · it "corsivo classe prima", "corsivo maiuscolo", "parole in corsivo da scrivere", "letture in corsivo classe seconda" · da "sammenhængende skrift opgaver", "håndskrift 2. klasse", "skråskrift store bogstaver", v2 "formskrift" ×9, "løkkeskrift" ×10 · no "sammenhengende skrift oppgaver", "stavskrift vs løkkeskrift" (v2 only 4 uniques).

## 4 OPEN items

1. Native panels sign the script per locale against the school model (fr-trad, it-trad, br, mx, nl vs Pennenstreken, da uloopet vs loopet, no), the isolated margin model letter (Playwrite's isolated form has no lead-in stroke), lesson order and diacritic placement.
2. Ruling geometry per locale is a proportion choice the panels confirm: de-la ascenders reach 88 % of a 1:1:1 Oberband; fr-trad 2.71 i up / 1.77 i down vs Seyès ≈ 3 i / 2 i; pt caderno de caligrafia, it rigatura, nl/da/no helper-line styles UNKNOWN exact.
3. es + it F1 capitals: native confirmation (default build).
4. de SAS: v2 harvest shows 21 SAS strings; a native check of the SAS glyphs could add it as a third unit later (data, not a face).
5. Build: `gen-b6-landings.js` needs an additive per-family level override and a unit-aware `canonicalDeckSlug` (§6).
6. Build: confirm `render/render-instance.js` awaits `document.fonts.ready` after the inlined `@font-face` enters the body; the gate's fallback-width check fails otherwise.
7. es-MX word for `toys/boat` ("barco" vs vocab "bote") and any `override:true` literals.
8. The cause of the SVG extra islands is not isolated (sub-pixel glyph placement is the likely one); irrelevant while cursive is HTML, recorded so nobody "optimises" back to SVG.

## 5 Quality verdict

As a teacher who has taught joined handwriting in three countries: yes, I would print this, and I would print it because it looks like MY exercise book, not like a website's idea of cursive. The lines sit where the letters actually are, the model is the hand my school uses (the French page loops its l and its b; the German page says on the sheet which Ausgangsschrift it is), and every letter gets a full empty line after the two grey chains, so a child actually writes rather than colours in grey. What would have embarrassed me, and is now designed out: a font that silently broke its own joins (the SVG renderer did exactly that on "bread" and "sch"), an orange dot telling a seven-year-old to start a d in the wrong place, a "dotted" promise over solid grey letters, a Norwegian page calling an unlooped hand "løkkeskrift", and a Portuguese vowel page squeezed to 3 mm to fit five letters. What still worries me: the isolated model letter in the margin has no entry stroke, and some teachers will say "that is not how we start an a"; the native panels must look at that one thing hard.
