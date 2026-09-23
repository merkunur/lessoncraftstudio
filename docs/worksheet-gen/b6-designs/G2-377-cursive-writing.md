# G2-377 `cursive-writing` (G2; faces G2/G3, levels per locale are data) : FINAL design (editor merge, 2026-09-23)

Merged from `_work/G2-377-pedagogy.md` + `_work/G2-377-design-A.md` ("the copybook strip": locale ruling on MEASURED ink, tinted Mittelband, coral margin rule, solid grey traces) + `_work/G2-377-design-B.md` ("Rhythm rows": per-letter two-row block, wordless cursive ribbon, gated start dots, rhythm ticks); every ruling and why: `_work/G2-377-critic.md`. (m) = re-measured by the editor 2026-09-23 in headless Chromium over the vendored woff2 loaded from `file://` (scratch `scratchpad/G2-377-crit-{metrics,joins,gap,stack,pics,vis}.js`, PNGs opened by the editor: `G2-377-crit-gap.png`, `-pics.png`, `-vis.png`, plus `_records/cursive-font-probe.png`). *est.* = the engineer measures in `render/one.js`. No em-dashes.

**Boundary (load-bearing).** Every live neighbour shows PRINT: K-238 `letter-tracing` (print capitals from `data/tracing/letter-strokes.js`), K-278 `lowercase-letter-tracing` + faces (print lowercase, stroke arrows, dashed hollow), K-284 `word-tracing` + 6 (print words; fr "Écriture des mots", da "Skriv ordene efter", no "Spor ord"), `pre-writing` (patterns; de "Schwungübungen", fr "Graphisme", it "Pregrafismo", no "Løkker, åttetall og spiraler"), `sight-words` K-239/259..263 (see-trace-write), `picture-writing` G2-278/299/300 (compose to a picture), and the mis-titled live en landing `alphabet-train-letter-hint-camping` ("cursive alphabet", retitled when this base ships, LOCK ruling 3). **This family owns the JOINED school hand**: joined lowercase letterforms with the entry/exit strokes the font draws in context, cursive capitals, the letter-to-letter connection as its own movement, whole words in one movement, READING the joined hand, and print-to-cursive transfer. Every model and trace on the page is the locale's school script rendered by ONE vendored Playwrite unit with shaping on; Nunito appears only as the printed source line of F5; no stroke arrows, no start dots, no dotted or dashed glyphs (no cursive stroke data exists anywhere in the repo); no title head "tracing / nachspuren / Schwungübungen / Graphisme / Pregrafismo / pontilhado / tratteggiato / overtrekken / spåra / Bogstavtræning / Bokstavskriving". **Visual signature:** the copybook row: white school paper in the locale's own ruling, lines placed on the MEASURED ink of the unit, a coral margin rule; left of the rule is what the child LOOKS at (an ink model, a capital, a pair, a picture), right of it is her PENCIL (solid light-grey joined traces, then empty ruling).

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `G2-377` / `cursive-writing` / base **G2**; F1 capitals, F2 joins, F3 words, F4 reading **G2** (`G2-378+ TBD by the emitter`); F5 copy **G3** (`G3-400+ TBD`); ids by `tools/alloc-b6var-ids.js` (exists, m; heading band tokens below are written for its parser). `assetClass: geometry`, `exerciseType: cursive-writing`. `apps['cursive-writing']` registered in Phase C (m: `default_subject:'letters'`, `default_age_range:'7-9'`); `axes['exercise-type']['cursive-writing']` slug + name **en only** (m); the other 10 locales (sv + fi included, names only, 0 rows) come from table B via `tools/register-b6-taxonomy.js`. |
| subject | letters (handwriting). Strand = the EXISTING `'Writing'` row of `frontend/lib/seo/strand-names.ts:185` (m: de "Texte verfassen", fr "Écriture", it "Scrittura", nl "Schrijven", da "Fremstilling", no "Skriving"; es/pt "Producción/Produção de textos" read as composition, so es + pt panels author a handwriting literal additively in the landing strand field; no new strand row). |
| theme axis | **OFF / THEMELESS** (`themeAxis:{applicable:false}`, landings `coordinate.theme:''`). Pictures (F3, F4 only) are PINNED `theme/noun` paths in the bank, each opened (list in §5), resolved by `lib/b2-common.js fileUri`; `pictureFor`'s theme rng is not used. |
| unitAxis | **the SCRIPT** (the ONE fan knob, `lib/unit-axis.js`): `units(loc)` / `exemplar(loc)`; `{U}` = the unit's native name, used only in de titles. Shipped units: en `us-trad` · de `va` + `la` (both published; SAS data only until a native check) · es `mx` · pt `br` · fr `fr-trad` · it `it-trad` · nl `nl` · da `dk-uloopet` (panel may switch to `dk-loopet`, data) · no `no` (UNLOOPED). sv + fi: whole type REFUSED. |
| CCSS (en, honest) | **none** on any face (CCSS 2010 omits cursive; no `educationalAlignment`); the en landing names state statutes in prose (e.g. California AB 446, Texas TEKS). Non-en prose names the national framework only. |
| new primitives | `primitives/school-ruling.js` (§2) · `templates/components-b6/cursive-writing.js` (exports prefixed `cw`) · `data/b6/cursive-writing.js` + `data/b6/locales/cursive-writing.<loc>.json` read by `lib/b6-common.js bank()` (exists, m) · `primitives/font-metrics.json` gains 15 `cursive-<unit>` keys from an extended `tools/measure-font-metrics.js` · `qa/verify-school-ruling.js` (render-measuring). |

**Table B** (level keys = `scripts/seo-landing/gen-b6-landings.js:84 LEVEL_KEYS`, m; per-face level per locale in §6)

| loc | genre head = rail name (panel signs) | ASCII slug | K / G1 / G2 / G3 keys | shipped unit(s) + ruling kind | national framework (prose) |
|---|---|---|---|---|---|
| en | Cursive Writing | `cursive-writing` (registered, m) | kindergarten / grade-1 / grade-2 / grade-3 | us-trad · `us3` | state statutes (no CCSS) |
| de | Schreibschrift | `schreibschrift` | vorschule / 1-klasse / 2-klasse / 3-klasse | va + la · `lin4` | Lehrplan Deutsch (KMK "verbundene Schrift") |
| es | Letra cursiva | `letra-cursiva` | preescolar / primer-grado / segundo-grado / tercer-grado | mx · `doble` | SEP/NEM, "en muchas escuelas" |
| pt | Letra cursiva | `letra-cursiva` | educacao-infantil / 1o-ano / 2o-ano / 3o-ano | br · `lin4` | BNCC EF01LP11 (panel verifies text) |
| fr | Écriture cursive | `ecriture-cursive` | maternelle / cp / ce1 / ce2 | fr-trad · `seyes` | programmes officiels, cycle 2 |
| it | Corsivo | `corsivo` | infanzia / classe-prima / classe-seconda / classe-terza | it-trad · `lin4` (prima) / `doble` (seconda) | Indicazioni nazionali |
| nl | Aan elkaar schrijven | `aan-elkaar-schrijven` | kleuters / groep-3 / groep-4 / groep-5 | nl · `lin4` | SLO kerndoelen |
| sv | Skrivstil (taxonomy only; REFUSED, 0 rows) | `skrivstil` | forskola / ak-1 / ak-2 / ak-3 | none | Lgr22 |
| da | Sammenhængende skrift | `sammenhaengende-skrift` | boernehaveklasse / 1-klasse / 2-klasse / 3-klasse | dk-uloopet · `lin4` | Fælles Mål dansk |
| no | Sammenhengende skrift | `sammenhengende-skrift` | 1-trinn / 2-trinn / 3-trinn / 4-trinn | no · `lin4` | LK20 norsk |
| fi | Kaunokirjoitus (taxonomy only; REFUSED, 0 rows) | `kaunokirjoitus` | esikoulu / 1-luokka / 2-luokka / 3-luokka | none | OPS 2014 |

All nine proposed non-en slugs checked against every `axes.*.*.slug.*`: 0 collisions (m); `cursive-writing` is this key's own en slug. Never "Schwungübungen", "Graphisme", "Pregrafismo" as a head (pre-writing); never "løkkeskrift" or "stavskrift" on `no` (the NO unit is unlooped and stavskrift is print); da "løkkeskrift" only if the panel switches to `dk-loopet`.

**The rule that locks the type.** Every model and trace string is ONE HTML text node (not SVG `<text>`, §2) in exactly one unit's font with shaping untouched (`calt`/`liga` on), `letter-spacing:0`, no `text-transform`, no per-letter spans; its size is `fs = X / xHeight(unit)` from the MEASURED metric so the unit's x-height equals the ruling's x-band (±1 px); a page never mixes two units; every letter a page prints is covered by the unit (fallback-width test).

## 2 The base page

**Concept. "Copybook rows"** (A's paper and margin grammar on the pedagogy's and B's two-row block). A cream **family ribbon** on top shows the page's letters in the unit's cursive (B: no words to translate) plus the script's name at the right (A's `scriptName`, one literal per unit, so a de teacher sees "Vereinfachte Ausgangsschrift" on the sheet). Below, one block per letter: **row A** = the ink model letter left of the coral margin rule, then two light-grey joined chains of three ("uuu uuu", each chain ONE text node), then open ruling to the edge; **row B** = the same ruling, empty. The child traces the two chains, then writes the letter joined on her own for the rest of row A and all of row B. Whitespace comes from the row pitch, never from blank bands between blocks.

**Chrome budget.** Body **722** (3-line title + 3-line instruction); every stack also ≤ **677** (the 4-line title case; fi is refused, but de titles are long, so the gate checks both). Body width **675** (the `.ws-page` inner width; no `.ws-lane` card: school paper is white, a cream card behind a ruling reads as a sticker).

**Measured unit metrics** (m, per em, canvas ink at 1000 px, identical to the pedagogy's and A's table; B's rounded ".52" x-heights are superseded). `asc` = max ink ascent of b d h k l f · `desc` = max ink descent of g j p q y z f · `cap`/`capD` = max over A-Z · `accCap` = Å/Ä-class accented capital ascent.

| unit | xH | asc | desc | cap | capD | accCap | (asc+desc)/xH | cap-row ratio | lifts (pair = 2 ink pieces, m) |
|---|---|---|---|---|---|---|---|---|---|
| us-trad | .5313 | 1.0313 | .5313 | 1.0938 | .5313 | 1.2969 | 2.941 | 3.059 | none |
| de-va | .5156 | 1.0000 | .5000 | 1.0000 | .5000 | 1.2803 | 2.909 | 2.909 | none (VA `t` full ascender) |
| de-la | .5313 | .9375 | .4375 | .9688 | .4375 | 1.2188 | 2.588 | 2.647 | none |
| mx | .5313 | 1.0313 | .5313 | 1.0938 | .5313 | 1.2969 | 2.941 | 3.059 | none |
| br | .5313 | 1.1563 | .6563 | 1.2344 | .6563 | 1.4375 | 3.412 | 3.559 | none |
| fr-trad | .5313 | 1.4375 | .9375 | 1.4375 | .9375 | 1.7178 | 4.470 | 4.470 | none |
| it-trad | .5313 | .9844 | .4844 | 1.0469 | .4844 | 1.2656 | 2.765 | 2.882 | none |
| nl | .5313 | 1.2969 | .7969 | 1.3125 | .7969 | 1.5771 | 3.941 | 3.970 | none |
| dk-uloopet | .5156 | .9063 | .4063 | .8906 | .1094 | 1.1719 | 2.546 | 2.546 | after f g j q y |
| no | .5313 | 1.0000 | .5000 | 1.0000 | .5000 | 1.2656 | 2.823 | 2.823 | after f g j y z |

(`us-modern`, `de-sas`, `fr-moderne`, `it-moderna`, `dk-loopet` are vendored, measured, NOT shipped. m: `fr-moderne` lifts after f g q j and draws unlooped b f h k l; `it-moderna` draws joined print without loops (`G2-377-crit-vis.png`); `us-modern` "apple" = 3 pieces. These confirm the lead rulings fr-trad and it-trad.) The engineer writes these as `font-metrics.json['cursive-<unit>'] = {xHeight, ascender, descender, cap, capDescender, accCap, lineAscent, lineDescent}` via `tools/measure-font-metrics.js` extended to load `cursive-fonts.css`; `--check` drift > 0.002 fails.

**Row geometry (all non-Seyès rulings).** `fs = X / xH`; `rowH = ceil(ratio · X) + 12` (6 px air above the tallest and below the deepest ink; `ratio` = lowercase ratio, or the cap-row ratio on any row that prints a capital); baseline `yB = 6 + A·fs`, x-line `yB − X`, top line `yB − asc·fs`, descender line `yB + desc·fs`. **The text is HTML, not SVG** (m: of 176 strings rendered both ways at 200 px, SVG `<text>` produced one or two extra small ink islands, 190 to 300 px², in 27 strings where the HTML and canvas render gave one piece, e.g. us-trad `br` `bread` `robot`, de `sch`, mx `ll` `lobo`, nl `boom` `brood`; the cause is not isolated, and a join that renders broken is the one defect this family cannot ship). Each row = `div.cw-row` (position relative, height rowH) holding an absolutely positioned inline `<svg>` ruling (full width) and absolutely positioned `span`s whose top = `yB − lineAscent·fs` (line box from the measured `lineAscent`), `line-height:normal`, `white-space:nowrap`.

**Ruling kinds** (`primitives/school-ruling.js`, pure SVG on tokens; the locale's kind is DATA, the panel confirms or edits it, never code):
- `us3` (en): top line grid 1.5 · x-line grid 1 dashed `3 5` · baseline inkSoft 1.5 · descender space unlined. No tint (US paper is not tinted).
- `lin4` (de, pt, it prima, nl, da, no): top · x-line · baseline · descender line; grid 1.2, baseline inkSoft 1.5, **Mittelband** rect tealSoft between x-line and baseline (A: "small letters live here"; survives greyscale at L ≈ 0.91 vs traces 0.76). nl/da/no helper lines dashed `2 3` (panel).
- `doble` (es-MX doble raya, it seconda): x-line + baseline only, tealSoft band between; ascenders and descenders rise freely.
- `seyes` (fr): interline `i` = X; thin tealSoft 1 lines every `i`, the writing line (every 4 i) inkSoft 1.3, tealSoft verticals every 4 i from the margin; no tint. **i = 15.12 px (4 mm) on CP pages, 11.34 px (3 mm) on CE1 pages** (703 px / 186 mm = 3.78 px/mm). Block pitch 12 i: row A on a writing line, row B on the next writing line 4 i below, then one skipped line ("on saute une ligne"), so printed descenders never meet printed ascenders. Measured fit for the panel: fr-trad ascends 2.71 i and descends 1.77 i (Seyès convention ≈ 3 i / 2 i).
- **Margin rule** on every kind: coral 1.5 vertical, full row height, at `marginX` (base 76, F1 92, F2 96, F3 = picture tile edge 84); on Seyès it IS the cahier margin.
- Stamps: `data-lcs-prim="school-ruling" data-lcs-ruling="<kind>" data-lcs-unit="<unit>" data-lcs-x="<X>" data-lcs-yb="<yB>"`.

**Layout d2 (base)**
```
[data-ws-content] 675 wide
ribbon      44  cream, creamDeep 2, r 14, pad 0 16: lesson letters in the unit at fs·0.9 (ink, gap 18) | scriptName Nunito 700 13 inkSoft, right
gap         12
block i     row A (rowH): [model 0..76 centred, ink] | coral rule 76 | 92: chain "xxx" grey | 26 | chain "xxx" grey | open ruling to 675
            gap 2
            row B (rowH): empty ruling (da, no: TWO empty rows, writeRows 2, see ladder)
block gap   10;  stack = 56 + N·((1+w)·rowH + 2w) + 10·(N−1)
```
Resolved d2 stacks (m, `G2-377-crit-stack.js`; all ≤ 677 ≤ 722):

| loc | unit | X | letters N (lesson 0) | writeRows | rowH | stack |
|---|---|---|---|---|---|---|
| en | us-trad | 18 | 4 (i t u w) | 1 | 65 | 614 |
| de (VA landing) | de-va | 18 | 4 (i u ü t) | 1 | 65 | 614 |
| es | mx | 15 | 5 (a e i o u) | 1 | 57 | 676 |
| pt | br | 16 | 4 (a e i o, re-cut, §4) | 1 | 67 | 630 |
| fr | fr-trad | Seyès i 15.12 | 3 (i u t) | 1 | pitch 12 i | 555 |
| it | it-trad | 16 | 5 (a e i o u) | 1 | 57 | 676 |
| nl | nl | 15 | 4 (i u t w) | 1 | 72 | 670 |
| da | dk-uloopet | 18 | 3 (i u t) | 2 | 58 | 610 |
| no | no | 18 | 3 (i u t) | 2 | 63 | 655 |

Row A width (m): widest chain `mmm` 3.27 em; at the largest fs (X 18 / .5156 = 34.9 px) 92 + 114 + 26 + 114 = 346, leaving ≥ 290 px of open ruling on row A. Floors: X ≥ **15** on pages whose locale level is G1 (pt 1º ano, fr CP, it prima, nl groep 3), X ≥ **14** at G2-G3 (both above the pedagogy's 14/11; B's 16/18 do not fit a five-vowel page in es/it and are recorded as rejected); no text under 13 px (scriptName); pictures ≥ 72 px.

**Ladder** (resolved config; guards key on these keys, never on the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `mode` | `'base'` | **`'base'`** | `'base'` |
| `lesson` | 0 | **0** | 0 |
| `letters` | first ≤ 3 of the lesson | **all of lesson 0** | all of lesson 0 |
| `chains` (grey, 3 letters each) | 2 | **2** | 1 |
| `writeRows` | 1 | **max of {1,2} that fits 677** | 2 where it fits |
| `X` | d2 + 2 | **table above** | d2 |
| `ribbon` | yes | **yes** | yes |
| `startDots` | false | **false** | false |

**d3 ruling:** less support (one chain) and more own writing; not shipped, no copy mentions it.

**Composer.** No randomness on the base: the page is the unit's `lessons[0]` in bank order (the seed is locale-neutral and unused). **Capacity rule (validator):** a lesson may ship at a level only if `56 + N·((1+w)·rowH + 2w) + 10(N−1) ≤ 677` at the level's floor X; the page never truncates a lesson silently (THROW).

**Answer-hiding + uniqueness.** Open template: no answer exists, no `verify()` beyond the render gate. Stamps: root `data-ws-content data-lcs-face="base" data-lcs-unit data-lcs-lesson data-lcs-letters="i|t|u|w"`; each text node `data-lcs-cursive="<unit>" data-lcs-role="model|trace|ribbon"`.

**Reused (exact).** `page/shell.js buildPage` (unchanged) · tokens `primitives/_tokens.js` · `lib/unit-axis.js` · `lib/b6-common.js bank()` · `data/b2/sentences.js SENTENCES.<loc>.names` (F1) · `.ws-match` / `.ws-match-col` / `.ws-match-item` / `.ws-match-dot--left|right` (`page/page.css`, F4) · `derange` from `templates/components-b4.js` (F4, m exists) · `lib/b2-common.js fileUri`.

**NOT used.** `rulingBlock` / `writingRow` / `schoolLines` (x-line tied to Nunito metrics: a Playwrite x-height would sit 2 to 6 px off its own line) · `strokeWordLane` / `strokeGlyphLane` / any dashed or hollow text (A rendered dotted-outline, hollow, tealSoft and weight-200 traces: two contours per stroke, tube letters, invisible on the band, identical to 400; rejected) · `letter-strokes.js` (print) · `answerBox` · `fonts.css` (cursive faces stay out of it; every other page stays byte-identical) · SVG `<text>` for any cursive string (above) · B's start dots and rhythm ticks · B's F2 coral join mark (§3 rejected).

**NEW in `templates/components-b6/cursive-writing.js`:** `cwFontFace(unit)` (ONE `<style>@font-face{font-family:'LCS Cursive <unit>';font-display:block;src:url('<file:/// url>') format('woff2')}` for the page's unit only, url built as `page/shell.js` does, prepended to `bodyHtml`) · `cwRow({kind, unit, X, ratioKey, marginX, w})` → the row div + ruling + geometry · `cwText({unit, text, fs, x, yB, role})` (one span; model ink `#3A3530`, trace grid `#C8BFAE`) · `cwRibbon({unit, letters, scriptName})` · `cwBlock` (base) · `cwCapitalBlock` (F1) · `cwJoinBlock` (F2) · `cwWordBlock` (F3) · `cwReadMatch` (F4) · `cwCopyBlock` (F5) · `cwScriptTag({scriptName})` (faces: right-aligned pill 24 high, Nunito 700 13 inkSoft, cream, creamDeep 1.5, r 12, +8 gap).
**NEW `primitives/school-ruling.js`:** `rulingGeometry({unit, kind, X, cap})` → `{fs, yTop, yX, yB, yD, rowH}` reading `font-metrics.json['cursive-'+unit]` (THROWS when the key is missing) · `schoolRuling({kind, w, geom, marginX, tint})` → SVG. `seyes` takes `{i, lines}`.

**Alternatives (rejected).** A's single-strip base (one row per letter, model + traces + empty band): less writing per letter than a full empty row, and the pedagogy asks for independent practice on its own line. B's "rhythm ticks" (grey ticks at the measured chain advance on row B): a seven-year-old's letters are not the font's width, so ticks at the model's advance tell her to write at a size she cannot; decoration that can be wrong. B's gated **start dots**: see d3 ruling in §3 preamble. An a-z alphabet page (26 rows force X ≈ 8). A "picture path" winding lane (cursive needs straight ruling).

**Risks → mitigations.** Silent fallback font (a system italic looks almost cursive): the gate compares each node's width against the same string in a fallback family and requires `document.fonts.check`. The inlined `@font-face` loads after the shell fonts: `render-instance` must await `document.fonts.ready` after body insertion; the gate fails a page whose cursive node reports the fallback width. Isolated model letters have no lead-in stroke (Playwrite draws the isolated form; opened in `G2-377-crit-vis.png`): the grey chains show the joined form beside it, and each panel signs the isolated model. Ruling vs school proportion (de-la ascenders reach 88 % of a 1:1:1 Oberband; fr-trad 2.71 i vs ≈ 3 i): recorded for the panels; the ink rule wins, a panel may request a ruling-kind change only. **Palette:** white, cream, creamDeep, ink, grid, tealSoft, coral, inkSoft, teal (numerals none). **Font floor:** 13 px (scriptName); cursive never under X 14. **Print check (engineer, mono laser 100 %):** en base, de-la F3, fr base + F5, nl F1, no base: grey traces followable, Mittelband visible, margin rule prints mid-grey, joins unbroken at 100 % zoom.

## 3 Faces 2-6

All five are CODE faces: an additive `mode` knob on `build()` + a `verify()` branch, stamped only when declared, so the base stays byte-identical; each resolves to a distinct `mode` at d2, so `tools/gate-variation-distinct.js` passes by construction. Every face carries `cwScriptTag` (32 px) and the same copybook row grammar. **Item counts are `min(target, capacity(unit, level))`, capacity from the measured stack at 677** (numbers per locale below). **Start dots are NOT shipped in v1 at any level:** B measured that stroke endpoints cannot identify the pen start (de-va `d` retrace apex; `o` and 7 to 13 letters per script have no candidate), so the gate could prove only "on an endpoint", never "the start"; a wrong start dot teaches a wrong movement. The data slot `startDots` stays absent; a future d3-only feature needs a per-unit table signed by every panel plus `qa/verify-cursive-startdots.js` (B's skeleton gate, poison both ways) before any copy mentions a dot.

### F1 : Cursive Capitals with Names (G2, CODE `mode:'capitals'`)
**Move:** form cursive CAPITALS, each as the start of a real name (capital into lowercase, or the script's deliberate lift). **Layout:** script tag; per capital a block: row A = ink capital in a 92 px margin cell | grey "A  A" (spaced: many capitals do not join, m) | 24 | grey name "Anna" (one node) | open; row B = empty. Rows use the cap-row ratio. **Config d2** `{mode:'capitals', capitals:5, source:'names', X:<table>}`; d1 `{capitals:3}`, d3 `{capitals:6, nameTrace:false}` not shipped. Capitals = the distinct initials of `SENTENCES.<loc>.names` in bank order, one name each (m: en M B E L A T · de E B M F L P N · es S M L D V H C · pt S M A D L P H · fr L H C E N I J · it S L G F A M · nl E D J S T F L · da I W F O A N C E · no N J E O A S T; all ≥ 6). **Stacks (m):** en X15 5 → 662 · de-la X17 5 → 652 · es X15 5 → 662 · pt X16 **4** → 622 (5 needs X13 < floor 14) · fr CE1 Seyès 3 mm **4** → 542 (5 = 678) · it X16 5 → 672 · nl X15 **4** → 646 · da X18 5 → 662 · no X16 5 → 662. Widest capital br `M` 1.612 em fits the 92 cell at fs 30. **Verify:** every row's name starts with its capital; capitals distinct; count = `min(5, capacity)`. **Refusals:** es + it CONDITIONAL on the native panel confirming cursive capitals are taught (harvest says yes: es "letra cursiva mayúscula", it "corsivo maiuscolo" ×22 in v2); default BUILD. **Instruction (en source):** "Trace each grey capital letter and name, then write them on the empty line below." (82) **Query face:** capital letters (de "Großbuchstaben", fr "majuscules cursives", pt "maiúsculo", it "maiuscolo", nl "hoofdletters", da/no "store bogstaver/bokstaver").

### F2 : Letter Connections (G2, CODE `mode:'joins'`)
**Move:** practise the JOIN between two letters as its own movement (top exits out of o b v w r, joins into e s a, the national digraphs), then meet it inside a word. **Layout:** script tag; per pair a block: row A = ink pair in a 96 px margin cell | grey "ol ol" (one node) | 24 | grey example word "doll" | open; row B = empty. **Config d2** `{mode:'joins', pairs:5, X:<table>}`; d1 `{pairs:3}`, d3 `{pairs:6, wordTrace:false}` not shipped. **Stacks (m):** en X15 5 → 652 · de-va X16 5 → 672 · es X15 5 → 652 · pt X16 **4** → 606 · fr CP Seyès 4 mm **3** → 531 (4 = 680) · it X16 5 → 652 · nl X15 **4** → 646 · da X18 5 → 662 · no X16 5 → 662. **Join proof (m, HTML render, 200 px, area floor 150 px²):** every pedagogy pair is ONE ink piece in its unit except the expected dot/tilde pieces (fr `oi` 2, nl `ij` 3, `ui` 2, pt `ão` 2) and the measured lifts: no `fa ga ja ya za` 2 pieces, dk-uloopet `fa ga ja qa ya` 2 pieces, so no pair may START with a lift letter. **Verify:** each pair renders as `1 + expectedDiacriticPieces` ink components in the real page (raster, §5); pair ⊂ example word; pairs distinct; no pair equals a base chain (`aa`). **Refusals:** none (≥ 8 joinable pairs per unit, m). **Instruction (en source):** "Trace each grey pair of joined letters and the word, then write them on the empty line below." (91) **Query face:** connecting letters / joins (de "Buchstabenverbindungen", fr "attacher les lettres", es "une las letras", pt "ligando as letras", it "legare le lettere", nl "letters verbinden", da/no "bind bogstaverne/bokstavene sammen").

### F3 : Cursive Words with Pictures (G2, CODE `mode:'words'`)
**Move:** write a whole word in ONE movement, then add dots, crosses and accents last. **Layout:** script tag; per word a block: a cream picture tile 72×72 (icon 64, creamDeep 2, r 10) left, spanning both rows, the coral rule at 84; row A = ink model word | 24 | grey trace word | open; row B = empty. Row ratio: lowercase, cap-row for de (nouns keep the capital). **Config d2** `{mode:'words', words:4, maxLetters:8, X:<table>}`; d1 `{words:3}`, d3 `{words:5, modelWord:false}` not shipped. Selection (seeded, locale-neutral keys): ≥ 2 words hold a dot / cross / accent letter (en i j t x; de i j t ä ö ü; es i j t á é í ó ú ñ; pt i j t ã õ á é ê ç; fr i j t é è ê à ç; it i j t à è ì ò ù; nl i j t ij ë; da/no i j t æ ø å) and ≥ 1 holds a pair from the locale's join bank; ≤ 8 letters. **Stacks (m):** en X18 → 596 · de-la X18 → 556 · es X18 → 596 · pt X18 → 668 · fr CP Seyès 4 mm **3 words** → 531 (4 = 712) · it X18 → 572 · nl X15 → 652 · da X18 → 540 · no X18 → 580. Row A width at fs 33.9: 96 + 176 + 24 + 176 = 472 ≤ 675 (8 letters at ≤ 0.65 em, the gate measures). **Verify:** picture key = word key; word = the bank literal; every picture ∈ the opened list. **Refusals:** none. **Instruction (en source):** "Trace each grey word without lifting your pencil, then write it. Add the dots and crosses last." (97) **Query face:** words (de "Wörter", es/pt "palabras/palavras", fr "copier des mots", it "parole", nl "woorden", da/no "ord").

### F4 : Reading Cursive (G2, CODE `mode:'read'`)
**Move:** READ the joined hand (the only closed face): draw a line from each cursive word to its picture. **Layout:** script tag; `.ws-match`: left 6 white word cards 300 wide (cursive ink at X 18, one node, height `max(76, ceil(ratio·18)+10)`: nl 81, fr 91), right 6 cream picture tiles 88×76 (icon 72), coral match dots. Stacks (m): 548 (nl 578, fr 638). **Config d2** `{mode:'read', pairs:6, X:18}`; d1 `{pairs:4}`, d3 `{pairs:8}` not shipped. **Anti-tell (the nt10-E classes):** the right column is a derangement of the left that is NOT a rotation or constant shift (`derange`); ≥ 2 pairs of words share their initial letter and ≥ 1 pair differs in length by ≤ 1 (so first letter and length cannot solve it); the partner's row offset is uniform within ±10 % pooled over 400 seeds, measured in both directions, and never constant on a page; no picture a child names two ways (§5 exclusions). **Verify:** left `data-lcs-word="<vocabKey>"`, right `data-lcs-pic="<vocabKey>"`; re-derive bijection, derangement, non-rotation, clash counts; no line, number or letter printed on any picture. **Refusals:** none. **Instruction (en source):** "Read each word in cursive and draw a line to its picture." (57) **Query face:** reading cursive (de "Schreibschrift lesen", es "lectura en letra cursiva", pt "leitura em letra cursiva", fr "lire l'écriture cursive", it "leggere il corsivo", nl "lezen", da/no "læs/les").

### F5 : Copy a Sentence in Cursive (G3, CODE `mode:'copy'`)
**Move:** print-to-cursive TRANSFER, with the capital and the full stop. **Layout:** script tag; three items, each: a tealSoft print strip 36 high (Nunito 800 18, ink) holding the sentence, 6, then TWO ruled rows (cap-row ratio); sentence 1 carries its cursive model in grey on its first row (a worked example; the pedagogy's choice over A's first-word-only and B's none: the child sees the capital, every join and the full stop once, then transfers alone twice). **Config d2** `{mode:'copy', sentences:3, modelUnder:'first', X:16}`; d1 `{modelUnder:'all'}`, d3 `{modelUnder:'none'}` not shipped; guards key on `modelUnder`. **Stacks (m):** en 562 · de-va 550 · es 562 · pt 610 · fr CE1 Seyès 3 mm 496 · it 550 · nl 652 · da 514 · no 544. Width: a 28-character sentence at 0.61 em per character and fs 30.1 = 514 ≤ 659 (the gate measures each sentence's model node, and refuses one wider than the row). **Verify:** printed text = modelled text = the bank literal; 4 to 6 words, first char `\p{Lu}`, ends with "."; the model row exists only where `modelUnder` says. **Refusals:** none. **Instruction (en source):** "Copy each printed sentence in cursive on the two lines below it. Trace the grey sentence first." (95) **Query face:** sentences to copy (de "Abschreibtext / Sätze abschreiben", es "oraciones para copiar", pt "da letra de forma para a cursiva", fr "copier une phrase", it "frasi da ricopiare", nl "zinnen overschrijven", da "skriv en sætning af", no "skriv av setninger").

**Rejected non-moves.** a-z alphabet on one page (26 rows, X ≈ 8; the base's lessons cover the alphabet across decks) · cursive numerals (no school teaches them) · Grundschrift / Novoskript (print) · loop/unloop or VA/LA as a face (a unit, never a move) · "tricky letters" or æ ø å as a face (a lesson choice inside the base) · stroke arrows or start dots (no stroke data; B's endpoint gate cannot prove a start) · rhythm ticks · F2 coral join mark (a point marker for a stroke that spans the join; unverifiable in HTML) · a blank ruled page (no move).

## 4 Native rebuild plan x11

Frames never inflect: every body string is a whole literal (letters, pairs, names from the names bank, picture words, sentences). No `objForms`, no `fillSlots` on any cursive string. Per shipping locale the panel authors: `units` + `exemplar` + `scriptName` per unit (≤ 34 chars) · `lessons[unit]` (every letter of the locale alphabet exactly once across the lessons, lesson 0 within capacity) · `joins[unit]` ≥ 8 `{pair, word}` · `words` 25 to 27 literals for the pinned keys (display case: de keep capital, else lower) · 6 sentences (4 to 6 words, K-3 vocabulary, capital + full stop only) · `ruling` kind per level · 12 strings (6 titles + 6 instructions; de 6 titles each carry `{U}` resolved to the landing's unit). **Every panel receives the EN strings as a SOURCE TO AUDIT, not as a target**, and OPENS one render of every face in its unit and every picture its words name. Panels also sign: the isolated model letter, the script choice against the school model, the ruling kind, lesson order and diacritic placement.

| loc | literals | forms / slots | refusal / re-target | traps |
|---|---|---|---|---|
| en | 12 strings; lessons 5 (us-trad: i t u w / e l b h f k / r s j p / a d g o c q / n m x y z v); 8 joins; 27 words; 6 sentences; scriptName "Traditional cursive" | none | none | US has no single model: name "Zaner-Bloser-style" in the landing BODY only; "dots and crosses" (i j t x); never "tracing" as a head |
| de | 12 strings; lessons ×2 (VA: i u ü t / n m r / e l b h k f / a ä d g q / o ö c s ß / p j y v w x z; LA: n m and r differ); 8 joins per unit (VA and LA share the draft: ol on or ob br wa ch sch; panel re-signs per unit); 27 words; 6 sentences; scriptNames "Vereinfachte Ausgangsschrift" / "Lateinische Ausgangsschrift" | nouns keep the capital | SAS data only until a native check | never VA and LA on one page; ß form per script; Lineatur 2 (Kl. 2) vs 3 (Kl. 3) per face level; never "Schwungübungen / Schönschrift / nachspuren" as a head |
| es (MX) | 12 strings; lessons 6 (mx L0 a e i o u fits at X15, m); 8 joins; 27 words; 6 sentences; scriptName "Letra cursiva" | none | F1 conditional | print = "letra script"; "letra ligada" = "letra cursiva" (title "cursiva", meta may say "ligada"); `ll` `rr` `ñ` are joins; doble raya; toys/boat word "barco" or vocab "bote" (panel; picture = a toy boat, opened) |
| pt (BR) | 12 strings; lessons 6, **L0 re-cut to a e i o** (5 vowels need X13 < G1 floor 15, m); u moves to "u v x z"; 8 joins; 27 words; 6 sentences | none | none | print = "letra de forma / bastão"; **never "pontilhado/pontilhada"** (the traces are solid, and pontilhado is letter-tracing's pt word); ç ã õ accents last |
| fr | 12 strings; lessons 6 (fr-trad L0 i u t, ≤ 3 at CP Seyès 4 mm, m); 8 joins; 26 words (cerf-volant excluded: hyphen); 6 sentences | NBSP before `: ? !` (shell; cursive strings carry none) | none | every title carries "cursive(s)" ("Écriture des lettres / des mots" are print tracing's titles); "graphisme" never a lead; œ avoided in words |
| it | 12 strings; lessons 6 (it-trad L0 a e i o u at X16, m); 8 joins; 27 words; 6 sentences | none | F1 conditional | stampato → corsivo: never "infanzia"; "Pregrafismo" is pre-writing's lead ("pregrafismo corsivo" meta only); "tratteggiato" never (traces solid); final-vowel accents last |
| nl | 12 strings; lessons 5 (L0 i u t w at X15, m); 8 joins; 27 words; 6 sentences | none | none | every title carries "aan elkaar" or "verbonden / lopend" ("schrijfletters" alone is ambiguous with blokschrift); IJ is one letter; "overtrekken" never |
| sv | taxonomy name only | - | **REFUSED whole type** (Lgr22 has no joined script; no Playwrite SE; a DK/NO font titled skrivstil would teach a foreign model) | - |
| da | 12 strings; lessons 6 (dk-uloopet L0 i u t, writeRows 2); 8 joins (no pair starting f g j q y); 27 words; 6 sentences | none | none; the unit default is the panel's (uloopet/loopet, data) | "Bogstavtræning" / "Skriv ordene efter" are tracing titles; "skråskrift" / "formskrift" meta only; "løkkeskrift" only if loopet ships |
| no | 12 strings; lessons 6 (no L0 i u t, writeRows 2); 8 joins (no pair starting f g j y z); 27 words; 6 sentences | bokmål | none | the unit is UNLOOPED (m, opened): never "løkkeskrift", never "stavskrift" (print); "Bokstavskriving" / "Spor ord" are tracing titles |
| fi | taxonomy name only | - | **REFUSED whole type** (OPS 2014 removed kaunokirjoitus; no Playwrite FI) | - |

Every panel OPENS one render of every face in its unit and every picture its words name (`picOpened:true` is the gate), and confirms that a teacher of that country would recognise the letterforms as her school script; a locale with no matching script is refused, never approximated.

## 5 Data + gates

`data/b6/cursive-writing.js` (locale-neutral: units, pinned pictures, exclusions, modes) + `data/b6/locales/cursive-writing.<loc>.json` GENERATED from `i18n/.draft-b6-<loc>.json` by `tools/apply-b6-locale.js` after `tools/validate-b6-draft.js` (both exist, m; `data/` gitignored, `git add -f`); read via `bank('cursive-writing', loc)`; strings checked by `tools/check-b6-string-parity.js` (exists, m).
```
CURSIVE_WRITING (data/b6/cursive-writing.js):
{ units: { 'us-trad': { family:'LCS Cursive us-trad', metricKey:'cursive-us-trad', lift:'' }, ... 15 units,
           'no': { lift:'fgjyz' }, 'dk-uloopet': { lift:'fgjqy' } },
  pictures: ['animals/cat','animals/duck','animals/fish','animals/owl','animals/pig','animals/sheep','fruits/lemon',
    'fruits/pear','fruits/apple','toys/boat','toys/doll','toys/robot','toys/train','toys/kite','around the house/bed',
    'around the house/chair','around the house/cup','around the house/lamp','classroom/book','zoo animals/lion',
    'pets/mouse','bakery/cake','weather/sun','weather/cloud','animals/horse','animals/zebra','animals/tiger'],
  excludePictures: ['animals/wolf','zoo animals/bear','fruits/cherry'],
  modes: ['base','capitals','joins','words','read','copy'] }
CURSIVE_WRITING_LOC (data/b6/locales/cursive-writing.<loc>.json):
{ refused: null | { reason },
  units: ['us-trad'], exemplar: 'us-trad', unitLabel: { 'us-trad': 'cursive' }, scriptName: { 'us-trad': 'Traditional cursive' },
  ruling: { G1:'lin4', G2:'us3', G3:'us3' },          // kind per level; fr: 'seyes'
  xPx: { base:18, capitals:15, joins:15, words:18, read:18, copy:16 },   // resolved per unit, validator re-derives
  levels: { base:'grade-2', capitals:'grade-2', joins:'grade-2', words:'grade-2', read:'grade-2', copy:'grade-3' },
  lessons: { 'us-trad': [['i','t','u','w'], ['e','l','b','h','f','k'], ...] },
  joins: { 'us-trad': [{ pair:'ol', word:'doll' }, ...] },
  words: { 'animals/cat':'cat', ... },
  sentences: ['The cat is on the bed.', ...],        // 6
  strings: { 'G2-377': {title, instruction}, '<face ids>': {title, instruction} } }
```
Helper contract: `unitOf(loc, unit)`, `rowGeom(unit, kind, X, cap)`, `capacity(unit, kind, X, mode)`; every getter THROWS on a refused locale, an absent unit block or a missing literal (never an en fallback); sv and fi blocks are ABSENT, so the spec throws "type refused: no national joined script".

**`tools/validate-b6-draft.js` (cursive-writing block; every rule runs, exit 1 on any):**
1. `units` ⊆ the 15 `@font-face` units of `assets/fonts/cursive-fonts.css`; `exemplar ∈ units`; sv / fi blocks absent; `font-metrics.json` holds `cursive-<unit>` for every unit.
2. Each lesson letter ∈ the locale alphabet; across a unit's lessons every letter appears exactly once and the alphabet is covered (a-z + de ä ö ü ß · es ñ · pt ç · da/no æ ø å).
3. **Capacity:** lesson 0 and every face count fit 677 at the face's `xPx` (the §2 / §3 stack formulas, Seyès pitch 12 i) and `xPx ≥` the level floor (15 at a G1-level page, 14 at G2-G3).
4. Every join `pair` renders as `1 + diacritic pieces` ink components in every shipped unit of the locale (HTML raster, 200 px, area ≥ 150 px²); its first letter ∉ `lift`; `word` contains `pair`.
5. Every `words` key ∈ `pictures`, ∉ `excludePictures`; value = the locale's vocab singular (display case: de keep, else lower) or a panel literal flagged `override:true`; letters only; ≤ 8 letters.
6. `sentences` 6: 4 to 6 tokens, first char `\p{Lu}`, last char ".", no digits, no free-claim.
7. Strings: title ≤ 70, no worksheet word (the b6 `WORKSHEET_WORD` regex, m), no free-claim (`scripts/lib/free-claim.js`), unique in the band; instruction ≤ 150 with an end mark; no answer-key promise; no head word from the ban list (tracing, trace as a noun head, nachspuren, Schwungübungen, Schönschrift, Graphisme, Pregrafismo, pontilhado/pontilhada, tratteggiato/tratteggiate, overtrekken, spåra, Bogstavtræning, Bokstavskriving, Spor ord); no instruction naming dotted / dashed / hollow in any locale (gestrichelt, punktiert, pointillés, punteggiato, tratteggiato, stippel, punkteret, stiplet, pontilhado, punteado) and every instruction of a face with traces names their GREY colour.
8. de titles carry exactly one `{U}`; no title names a script that is not the page's unit (no "løkkeskrift" on `no` or on da uloopet; "stavskrift" nowhere).
9. The base title's letter list, where a title names letters, equals lesson 0 of the named unit.
10. `levels.<mode>` ∈ the locale's LEVEL_KEYS; `ruling[level]` ∈ {us3, lin4, doble, seyes}.
11. Every glyph of every literal is covered by the unit (fallback-width test in the real renderer).

**`qa/verify-b6-cursive-writing.js`:** renders base + 5 faces × every shipped unit (en us-trad, de va AND la for all six modes, es mx, pt br, fr fr-trad, it it-trad, nl nl, da dk-uloopet, no no) × d1-d3 through `render/render-instance.js` (file:// fonts) at the 722 stack AND the 677 stack; asserts `verify()` empty and `qa/lints.js` clean; then ITSELF: every `[data-lcs-cursive]` node's computed `font-family` is the page unit, `document.fonts.check` true, width ≠ the same string in a fallback family, `letter-spacing` 0, `text-transform` none, `font-feature-settings` normal, exactly one text node, no child elements; exactly one `LCS Cursive` family per page; no cursive inside an SVG `<text>`; ink rows (raster of each row) put the x-height on `yX` and the baseline on `yB` within ±1 px (a calibration page built by the SAME component with "xxx" at the page's geometry); trace nodes `grid`, model nodes `ink`; X ≥ the level floor; every row box contains all its ink (no clipped loop or descender); pictures ≥ 72 px and ∈ `pictures`; F2 pairs 1 ink piece + expected diacritic pieces; F4 derangement, non-rotation, ≥ 2 initial clashes per page, partner-offset uniformity ±10 % pooled over 400 seeds in both directions; F5 model width ≤ row width; stacks ≤ 677; no stroke-arrow or start-dot element. `qa/verify-school-ruling.js` renders every kind at its smallest and largest geometry, measures line positions from the emitted SVG against `rulingGeometry`, poison both ways (a line moved 2 px FAILS; the committed primitive PASSES).

**Poison (each must FAIL for its own reason; the correct EN draft is the control):** P1 fr lesson containing `ü` (2) · P2 `e` in two us-trad lessons (2) · P3 fr-trad CP lesson of 4 letters (3: 680 > 677) · P4 pt lesson 0 a e i o u at X15 (3: floor/stack) · P5 join `fa` for dk-uloopet (4: lift) · P6 join word `boat` for pair `ol` (4) · P7 word `cerf-volant` (5: hyphen) · P8 `animals/wolf` in words (5) · P9 de word `katze` (5: case) · P10 sentence "the cat is on the bed." (6) · P11 a 7-word sentence (6) · P12 an `sv` block present (1) · P13 unit `fr-moderne2` (1) · P14 no title "Løkkeskrift: …" (8) · P15 en instruction "Trace the dashed letters…" (7) · P16 base title "… i, t, u" when lesson 0 is i t u w (9) · P17 pt title "Letra cursiva pontilhada" (7) · **render:** PR1 a cursive string split into per-letter spans (one text node) · PR2 cursive drawn as SVG `<text>` · PR3 `letter-spacing:0.5px` on a chain (joins break: component count) · PR4 the de-la font on a VA page (one family) · PR5 a missing `@font-face` (fallback width) · PR6 an F4 right column = left rotated by 1 (non-rotation) · PR7 F4 set with no shared initial (clash) · PR8 a row whose baseline is 3 px off the ink (calibration) · PR9 F5 model under all three sentences at d2 (`modelUnder`) · PR10 a trace node in `inkSoft` instead of `grid`.

**Page reads:** `CURSIVE_WRITING`, `CURSIVE_WRITING_LOC[loc]`, `primitives/font-metrics.json` (`cursive-<unit>`), `SENTENCES.<loc>.names`, the pinned picture files; never `image-vocabulary.js` at render (the validator copies each word into the bank), never `approved-words`, never `objForms`.

**Pictures OPENED (who):** the 27 pinned keys by the pedagogy agent (`G2-377-pics.png`) and again by the editor (`G2-377-crit-pics.png`, m): all read as their word; `animals/duck` is a yellow duckling (children say "duck"; kept); `bakery/cake` is a slice of layer cake; `weather/cloud` is a pink smiling cloud; `toys/boat` is a toy boat. **Excluded:** `animals/wolf` (reads as a husky dog; pedagogy + editor), `zoo animals/bear` (reads as a teddy; pedagogy + editor), `fruits/cherry` (one large red fruit that reads as an apple; B + editor). A's extras (`animals/dog`, `toys/ball` = a football, `around the house/key`, `fruits/banana`, `vehicles/bus`, `farm animals/cow`, `animals/fox`, `vehicles/car`) and B's (`animals/penguin`, `animals/rabbit`, `animals/turtle`) were opened by their authors and the editor and are clean; they are NOT in the v1 pool (it vocab `car` = "Automobile", 10 letters); a panel may add any of them with `picOpened:true`.

## 6 SEO plan

Titles are candidates the native panels rewrite (≤ 70, no worksheet word, genre head first (de: "Schreibschrift" plus the unit name, all six ≤ 70, m), one distinguishing element per face, no tracing head, no "dotted"); heads are from `_records/harvest-candidates.<loc>.json` (round 1) and `_records/v2/harvest-candidates.<loc>.json` (round 2), quoted in `_work/G2-377-critic.md` §3. The base owns the bare head + its letters; de titles name VA or LA (the landing's unit).

| face | title pattern (Germanic en / de / nl · Romance es / pt / fr / it · Nordic da / no) | meta MIDDLE (whole 120-170; the child's instruction, en source) | coordinate |
|---|---|---|---|
| base | Cursive Letters for 2nd Grade: i, t, u and w / Schreibschrift üben: i, u, ü und t in Vereinfachter Ausgangsschrift / Aan elkaar schrijven groep 3: de letters i, u, t en w · Letra cursiva para segundo grado: las vocales a, e, i, o, u / Letra cursiva para o 1º ano: as letras a, e, i, o / Écriture cursive CP : les lettres i, u et t / Corsivo classe prima: le vocali a, e, i, o, u · Sammenhængende skrift: små bogstaver i, u og t / Sammenhengende skrift: små bokstaver i, u og t | Trace the grey letters, then write each letter joined on your own on the empty line below | `{type:'cursive-writing', mode:'base', theme:'', level}` |
| F1 | Cursive Capital Letters: Write the Names / Großbuchstaben in Schreibschrift: Lateinische Ausgangsschrift / Hoofdletters in verbonden schrift · Letra cursiva mayúscula: escribe los nombres / Alfabeto cursivo maiúsculo: escreva os nomes / Majuscules cursives CE1 : écrire les prénoms / Corsivo maiuscolo classe seconda: scrivi i nomi · Store bogstaver i sammenhængende skrift / Store bokstaver i sammenhengende skrift | Trace each grey capital letter and name, then write them on the empty line below | `mode:'capitals'` |
| F2 | Cursive Connecting Letters: Joining Two Letters / Buchstabenverbindungen in Schreibschrift: Vereinfachte Ausgangsschrift / Verbonden schrift: twee letters aan elkaar · Letra cursiva: une las letras de dos en dos / Letra cursiva: ligando as letras de duas em duas / Écriture cursive CP : attacher les lettres / Corsivo classe prima: legare le lettere · Sammenhængende skrift: bind bogstaverne sammen / Sammenhengende skrift: bind bokstavene sammen | Trace each grey pair of joined letters and the word, then write them on the empty line below | `mode:'joins'` |
| F3 | Cursive Words to Write with Pictures / Schreibschrift-Wörter üben: Lateinische Ausgangsschrift / Woorden aan elkaar schrijven · Palabras en letra cursiva para segundo grado / Palavras em letra cursiva para o 1º ano / Écriture cursive CP : copier des mots / Parole in corsivo da scrivere · Skriv ord med sammenhængende skrift / Skriv ord med sammenhengende skrift | Trace each grey word without lifting your pencil, then write it and add the dots and crosses last | `mode:'words'` |
| F4 | Reading Cursive: Match Each Word to Its Picture / Schreibschrift lesen: Wörter in Lateinischer Ausgangsschrift / Verbonden schrift lezen: woord bij plaatje · Lectura en letra cursiva: une cada palabra con su dibujo / Leitura em letra cursiva: ligue a palavra à figura / Lire l'écriture cursive : le mot et son image / Leggere il corsivo: parola e figura · Læs sammenhængende skrift: ord og billede / Les sammenhengende skrift: ord og bilde | Read each word in cursive and draw a line from the word to its picture | `mode:'read'` |
| F5 | Cursive Sentences to Copy for 3rd Grade / Sätze in Schreibschrift abschreiben: Vereinfachte Ausgangsschrift / Zinnen overschrijven in verbonden schrift · Oraciones en letra cursiva para copiar / Da letra de forma para a cursiva: copie as frases / Écriture cursive CE1 : copier une phrase / Frasi in corsivo da ricopiare · Skriv en sætning af med sammenhængende skrift / Skriv av setninger med sammenhengende skrift | Copy each printed sentence in cursive on the two lines below it, tracing the grey sentence first | `mode:'copy'` |

**Levels per face per locale (the landing `coordinate.level`; data, not the id band):**

| face | en | de (unit) | es | pt | fr | it | nl | da | no |
|---|---|---|---|---|---|---|---|---|---|
| base | grade-2 | 2-klasse (va) | segundo-grado | 1o-ano | cp | classe-prima | groep-3 | 2-klasse | 3-trinn |
| F1 capitals | grade-2 | 2-klasse (la) | segundo-grado | 2o-ano | ce1 | classe-seconda | groep-4 | 2-klasse | 3-trinn |
| F2 joins | grade-2 | 2-klasse (va) | segundo-grado | 1o-ano | cp | classe-prima | groep-3 | 2-klasse | 3-trinn |
| F3 words | grade-2 | 2-klasse (la) | segundo-grado | 1o-ano | cp | classe-seconda | groep-4 | 2-klasse | 3-trinn |
| F4 read | grade-2 | 2-klasse (la) | segundo-grado | 2o-ano | cp | classe-seconda | groep-4 | 2-klasse | 3-trinn |
| F5 copy | grade-3 | 3-klasse (va) | segundo-grado | 2o-ano | ce1 | classe-seconda | groep-4 | 3-klasse | 4-trinn |

⚠ `scripts/seo-landing/gen-b6-landings.js:247` derives `level = LEVEL_KEYS[locale][id band]` and `deckSlugFor(id)` per id (m): it has no per-locale level and no per-unit deck. The build adds, ADDITIVELY and keyed on this family, (a) a level override read from the bank's `levels`, and (b) a unit-aware `canonicalDeckSlug` for de (the landing's named unit's deck; the sibling-unit deck linked from the landing body). Without both, fr/pt/it/nl pages ship under the wrong level and de landings point at an arbitrary unit.

`coordinate.mode` = the face's mode string (base `'base'`), `theme:''`. h1 = title; eyebrow = level label; strand chip = the `'Writing'` row (es/pt panel literal as §1); JSON-LD `LearningResource`, no `educationalAlignment` on any face; non-en prose names the national framework only; the en landing names state statutes and "Zaner-Bloser-style" in the body. Meta lead inherits `seo.words.free_printable` (metadata only; no visible copy claims "free"); no title, meta or landing promises an answer key (printable-only decks ship none). MIDDLE fitted with `tools/measure-instruction-window.js` (exists, m). `topicMeta['cursive-writing']` ≥ 50 chars × 9 shipping locales + `skill-sentences.<loc>.json['cursive-writing']`.

**Non-cannibalisation** (whole-landing 3-gram Jaccard via `scripts/seo-landing/gate.js`, FAIL ≥ 0.80 / WARN 0.65; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs K-278 lowercase-letter-tracing | joined school script, two rows per letter vs print lowercase with arrows | 0.08 |
| F1 vs K-238 letter-tracing | cursive capitals into names vs print capitals | 0.07 |
| F3 vs K-284 word-tracing | a joined word written in one movement vs print words with dashed hollows | 0.06 |
| any vs pre-writing | letters of a script vs loops and waves (no "Schwungübungen / Graphisme / Pregrafismo" head) | 0.05 |
| base vs sight-words K-239 | letterforms vs weekly words | 0.05 |
| F5 vs picture-writing G2-278 | copy a given sentence vs compose to a picture | 0.06 |
| base vs alphabet-train "cursive alphabet" en landing | after its retitle (LOCK ruling 3) | 0.04 |
| base vs F2 / F2 vs F3 / F3 vs F5 (siblings) | letters / joins / words / sentences | 0.14 / 0.16 / 0.13 |
| F4 vs every sibling | the only reading face | ≤ 0.08 |
| de VA landings vs de LA landings | different script names AND different faces | 0.10 |

Boundary sentence on every landing (panel wording): "This page practises joined handwriting in your school's cursive; print letters, word tracing and pre-writing patterns have their own pages."

## 7 Hub visibility contract

A face appears under `cursive-writing` on `/[locale]/worksheets` IFF: (1) `apps['cursive-writing']` exists (PRESENT since Phase C, m: `default_subject:'letters'`); (2) `axes['exercise-type']['cursive-writing']` has `slug` + `name` in all 11 locales (en present, m; the other ten from table B via `tools/register-b6-taxonomy.js`, including sv and fi, whose names never render); (3) exactly one landing per face per shipping locale with `coordinate.type === 'cursive-writing'` verbatim, the face's `mode`, `theme:''`, the §6 level key, a unique slug and `canonicalDeckSlug` = the published deck (de: the named unit's deck; both unit decks are published, 12 de decks for 6 de landings); a refused face or locale has NO landing and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed.

Gate: `node scripts/verify-hub-type-rows.js --keys=cursive-writing --expect=docs/worksheet-gen/b6-designs/hub-expectations.json` (matrix exported by `tools/export-hub-expectations.js --batch=b6`; poison: drop one landing / drop `apps['cursive-writing']` must FAIL).

**Expected rows per locale:** en 6 · de 6 (3 VA: base, F2, F5; 3 LA: F1, F3, F4) · es 6 (F1 conditional: 5 if the panel refuses capitals, matrix lowered before the wave) · pt 6 · fr 6 · it 6 (F1 conditional, as es) · nl 6 · da 6 · no 6 · sv **0** (type refused) · fi **0** (type refused) = **54** (53 or 52 if es / it F1 fall). Decks: 54 + 6 de sibling-unit decks = 60.
