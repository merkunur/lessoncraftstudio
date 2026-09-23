# G2-377 `cursive-writing`: DESIGN A ("the copybook strip": look | pencil)

Designer A, 2026-09-23. Written blind to design B. Every number below was MEASURED today in a real Chromium (puppeteer, `file://` fonts, canvas `TextMetrics` at 1000 px and `getBBox()` on rendered SVG text) unless marked *est.*. Scratch renders: session scratchpad `G2-377-A/` (`en-base.png`, `de-base.png`, `fr-base.png`, `nl-base.png`, `en-f4.png`, `en-f5.png`, `de-f6.png`, `probe.png`, `metrics.json`).

## Boundary

This page is NOT K-238 letter-tracing (print capitals), K-278 lowercase-letter-tracing + faces (print lowercase with stroke arrows and a dashed hollow), K-284 word-tracing + faces (print words, dashed hollow), pre-writing (patterns), sight-words (see-trace-write), or G2-278/299/300 picture-writing (compose). It owns the JOINED school hand: letterforms, the entry/exit strokes the font draws in context, letter-to-letter joins, cursive capitals and reading cursive. Visual signature, identical on every face: **the copybook strip**. It is a band of the locale's own school paper: a tinted tealSoft x-height band (the "Mittelband"), with lines that sit exactly on the MEASURED ink of that locale's school font, cut by a coral margin rule. Left of the rule is the model you LOOK at (teal). Right of the rule is YOUR PENCIL (light traces, then empty band). No arrows, no dashed glyphs, no Nunito letterform anywhere as a model, and never two scripts on one page.

## 1 Page concept (base)

From across the room a teacher sees six calm strips of school paper, each with a green letter at the margin and a pale chain of that letter running into empty band. Above them a cream ribbon names the stroke family ("Undercurve letters") and the script ("Traditional cursive"), and shows the family's letters in small white cells. That makes it one lesson, one family, one script. Quality comes from three decisions:
1. **Lines where the ink is.** The ruling is computed from the font's measured x-height / ascender / descender, not from a nominal ratio. The model touches every line it claims, so the child never gets two conflicting instructions (the lines say one height, the letter shows another).
2. **The Mittelband tint.** A tealSoft band between midline and baseline says "small letters live here" without a word. It is the one colour the page adds, and it survives greyscale (L ≈ 0.91 band vs 0.76 traces vs dark teal model).
3. **Look | pencil.** One coral vertical margin rule per strip, echoing the red margin of a real exercise book (Seyès, US notebook, Heft-Rand). It separates the model from the child's work on every face, so the page grammar never changes.
Whitespace: each strip keeps ≥ 200 px of empty band (≥ 30 % of the 675 strip) after the traces. Pencil first: the child traces two joined chains and then writes on their own on the same line.

## 2 Layout (d2, 722 body)

Body = the full `.ws-page` inner width **675** (no `.ws-lane` card: school paper is white, a cream card behind a ruling reads as a sticker). Strips are SVG, `width:675`, white background.

### 2.1 Strip geometry (shared by base, F2, F3, F4, F6; primitive `scriptRuling`)
```
x: 0 ............ 76 | 92 ...................................... 675
   [model cell]   coral rule 1.5   traces start at 92       empty band to 675
y (non-Seyès):  pad 5 | top line (ascender)      grid 1.5
                      | ascender band = (asc-x)·F
                      | midline (x-height)       grid 1 (us3: dash 3 5)
                      | MITTELBAND tealSoft rect, height X
                      | baseline                 inkSoft 1.5   (the "sit here" line, darker)
                      | descender band = desc·F
                      | descender line           grid 1 (lin4 only)
                      pad 5; ink block vertically centred in ROW
```
`F = X / xHeight(unit)`; `X = clamp((ROW − 10) / (1 + (asc−x)/x + desc/x), xMin 14, xMax)`. d2: **ROW 88, xMax 24** → per unit (measured metrics, px):

| unit | xHeight | asc | desc | X d2 | font px | model 'l' top = top line |
|---|---|---|---|---|---|---|
| us-trad | .5313 | 1.0313 | .5313 | 24 *(clamp)* | 45.2 | exact |
| us-modern | .5313 | .9531 | .4688 | 24 | 45.2 | exact |
| de-va | .5156 | 1.000 | .500 | 24 | 46.5 | exact |
| de-la | .5313 | .9375 | .4375 | 24 | 45.2 | exact |
| de-sas | .5313 | .9063 | .4063 | 24 | 45.2 | exact |
| mx | .5313 | 1.0313 | .5313 | 24 | 45.2 | exact |
| br | .5313 | 1.1563 | .6563 | 22.5 | 42.3 | exact |
| it-moderna | .5313 | .8906 | .4063 | 24 | 45.2 | exact |
| nl | .5313 | 1.2969 | .7969 | 19.9 | 37.5 | exact |
| no | .5313 | .9844 | .500 | 24 | 45.2 | exact |
| dk-uloopet / dk-loopet | .5156 | .8906 / .9063 | .4063 | 24 | 46.5 | exact |

(`asc` = max ink ascent of `bdhkl`; `desc` = max ink descent of `gjpqy`; cap ascent ≈ asc in every unit. Line box: us-trad 1.428/.504, fr-trad 1.927/.925, full table in `metrics.json`.) The metrics MUST come from `primitives/font-metrics.json` keys `cursive-<unit>` written by `tools/measure-font-metrics.js`, extended to load `cursive-fonts.css` and measure `bdhkl`/`gjpqy`. Never a derived factor.

**Seyès (fr only; kind `seyes`):** the paper cannot move. The interligne is `il = 14` px at d2 (3.7 mm, "Seyès agrandi" for CP); strip = 6 il = 84: heavy line (inkSoft 1.3) at y 0 and at the baseline y 56, thin tealSoft 1 lines at every il, tealSoft verticals every 4 il from the margin, coral margin rule at x 76 (it IS the Seyès margin). x-height = 1 il ⇒ font = 14/.5156 = 27.2 px (fr-moderne). No band tint on Seyès (cahiers are never tinted). **Measured mismatch for the fr panel:** fr-moderne ascender = 2.18 il, descender 1.21 il; fr-trad = 2.71 il / 1.76 il. The Seyès convention (loop letters at 3 il, descenders at 2 il; panel to confirm) is met only by FR Trad. The design is script-agnostic, and the fr panel picks with this number in hand.

### 2.2 Base body (d2, 6 letters, worst chrome 722)
```
┌ ribbon 675 × 64  cream, creamDeep 2, r14, pad 0 16 ───────────────────────────────┐
│ familyLabel  Nunito 800 16/20 teal (≤2 lines)      [i][t][u][w][r][s] 40×44 cells │
│ scriptName   Nunito 700 12/16 inkSoft (1 line)      white, grid 1.5, r8, gap 8     │
└────────────────────────────────────────────────────────────────────────────────────┘ 64
gap 16                                                                                 16
strip 1  [ i ]│ iii  iii ______________________________________   675 × 88           88
gap g
strip 2  [ t ]│ ttt  ttt ______________________________________                     88
… strips 3-6                                                                        4×88
```
64 + 16 + 6·88 = 608; `g = clamp((body − 608)/5, 12, 32)` ⇒ at 722, g = 22.8 (sum 722); at 814 (one-line chrome) g = 32 and 46 px fall below the last strip (never between strips: the nt10-D SPARSE ruling, no blank band > 40). Strip content: model = the letter, isolated, teal, centred in 0-76 at the strip font; traces = one `<text x=92>` holding two `<tspan>` chains of 3 letters (`dx` 26 between chains), fill grid. Measured right edge of traces at d2: `mmm` worst = 3.34 em × 45.2 = 151 per chain ⇒ 92 + 151 + 26 + 151 = **420** ⇒ empty band ≥ **255** px (38 %) in every unit. Ribbon cells: 6 × 40 + 5 × 8 = 280; label column = 675 − 32 − 280 − 24 = **339** px (≈ 42 Nunito-800 chars/line, 2 lines).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| content | `'letters'` | `'letters'` | `'letters'` |
| letters (from family list) | first 4 | first 6 | first 8 (family 1 + next family) |
| rowH | 100 | 88 | 72 |
| xMax | 28 | 24 | 20 |
| chains (traced, ×3 letters) | 1 | 2 | 1 |
| ribbon | yes | yes | yes |
| band tint | per ruling table | per ruling table | per ruling table |
| minEmptyBand (gate) | 300 | 200 | 300 |

## 4 Answer-hiding + uniqueness

Base, F2, F3, F4 and F6 are open templates: no answer exists, no `verify()` beyond the render gate (§5), and nothing is printed that the child should produce except the traces, which ARE the task. A teacher sees a wrong form instantly because the child's letter sits on the same lines, right of the same margin, as a teal model and two pale correct chains (shape, height against the band, slant, joins). F5 is closed. Six pictures sit right, eight at d2, and each cursive word on the left matches exactly one of them. `verify()` re-derives the pairing from `data-lcs-left="<key>"` / `data-lcs-right="<key>"`: it checks a bijection, that no pair shares a row (derangement), and it runs a seed sweep asserting the row offset of the partner is not constant (the nt10-E position-tell class). The answer is never printed: no numbering, no letters on the pictures.

## 5 Primitives / components

**Reused:** `page/shell.js buildPage` (unchanged); `.ws-match` / `.ws-match-col` / `.ws-match-item` / `.ws-match-item--plain` / `.ws-match-dot--right|--left` from `page/page.css` (F5); `lib/unit-axis.js` (script axis); `data/b2/sentences.js SENTENCES.<loc>.names` (F2; measured: every live locale has ≥ 6 names with distinct initials: en MBELAT, de EBMFLPN, es SMLDVHC, pt SMADLPH, fr LHCENIJ, it SLGFAM, nl EDJSTFL, da IWFOANCE, no NJEOAST); `image-cache/resolve.js fileUri(theme, noun)` with PINNED paths (see bank). `lib/b3-picture-index.js pictureFor` is NOT used for pictures because it rng-picks among themes and would reach pictures nobody opened.
**NOT used:** `writingRow` / `schoolLines` / `rulingBlock` (geometry keyed to `letter-strokes.js` print METRICS; a cursive x-height is not `LM.xTop`), `strokeWordLane` / `strokeGlyphLane` (dashed hollow: a CSS text stroke cannot follow a joined monoline, see tracing ruling below), `answerBox` (no answers), `fonts.css` (the cursive faces are deliberately NOT in it).

**Tracing ruling (rendered and compared, `probe.png` row 1):** (a) fill `grid` #C8BFAE: clear, traceable, visible on the band. (b) fill tealSoft: vanishes on the tealSoft band and in greyscale. (c) dotted outline (`fill:none; stroke-dasharray 2 2`): draws TWO dotted contours around each stroke, so the child cannot tell which edge to follow, and on a join it is noise. (d) hollow outline: bubble letters, and nobody writes inside a tube. (e) `font-weight:200`: renders identical to 400 (the vendored faces are not variable). **Chosen: (a), solid fill `grid`.** Instructions therefore say "grey", never dotted/dashed (lint, §9).

**NEW `primitives/script-ruling.js`** (palette-only, pure SVG):
- `cursiveGeometry({ unit, kind, rowH, xMin=14, xMax })` → `{ X, fontPx, yTop, yMid, yBase, yDesc, H }`. It reads `font-metrics.json['cursive-'+unit]` and throws when the key is missing. For `seyes`: `{ il: rowH/6, fontPx: il/xHeight, yBase: 4·il, H: rowH }`.
- `scriptRuling({ kind, w, g, band, marginX })` → SVG parts. Kinds: `us3` (top 1.5 grid · mid 1 grid dash `3 5` · base 1.5 inkSoft), `lin4` (top, mid, base, descender line; mid solid 1 grid), `doble` (mid + base only, es-MX "doble raya"), `seyes` (above). `band`: tealSoft rect yMid→yBase, full width. `marginX`: coral 1.5 vertical from yTop−4 to yDesc+2 (Seyès: full H). Stamps `data-lcs-prim="script-ruling" data-lcs-ruling="<kind>" data-lcs-unit="<unit>" data-lcs-x="<X>"`.

**NEW `templates/components-b6/cursive-writing.js`:**
- `cursiveFontFace(unit)` → one `<style>@font-face{font-family:'LCS Cursive <unit>';font-display:block;src:url('<file:///…/assets/fonts/cursive/playwrite-<unit>.woff2>') format('woff2')}</style>`. The url is built with `url.pathToFileURL`, as `page/shell.js` rewrites `fonts.css`. Only the ONE unit of the page is emitted; the spec prepends it to `bodyHtml` (frTypoHtml skips `<style>`).
- `copyStrip({ unit, kind, rowH, xMax, band, model, traces:[str], gapPx=26, marginX=76 })` → `<svg width=675 height=rowH>`: ruling + model `<text text-anchor=middle x=marginX/2>` fill teal + ONE `<text x=marginX+16>` with one `<tspan>` per trace, fill grid. Style on every cursive text: `font-family:'LCS Cursive <unit>'; font-size:<fontPx>px; letter-spacing:0; font-variant-ligatures:normal; font-feature-settings:'calt' 1,'liga' 1; text-transform:none`. **A chain is ONE string in ONE tspan, never per-letter spans**: joins come from the font's contextual alternates (measured: `aaa` = 1.892 em vs 3 × `a` = 1.866 em, so shaping is active). Stamps `data-lcs-strip`, `data-lcs-model`, `data-lcs-traces`.
- `familyRibbon({ unit, label, scriptName, letters })` (64 px, §2.2), `scriptTag({ scriptName })` (F4-F6: right-aligned pill, height 28, Nunito 700 12 inkSoft, cream fill, creamDeep 1.5 border, r 14).
- `pictureWordBlock({ unit, kind, pic, word, rowH, xMax })` (F4), `cursiveMatch({ unit, left:[{key,word}], right:[{key,src}], rowH })` (F5), `copySentenceBlock({ sentence, rows:2, unit, kind, rowH, xMax, startWord })` (F6).

**Render gate (NEW `tools/verify-b6-cursive-render.js`, render-measuring, poison-tested both ways):** for every page: (1) every cursive `<text>` resolves to the page's ONE unit family, checked by comparing `getComputedTextLength()` against the same string with a fallback family (they must differ; a silent fallback font is the failure this catches); (2) ink of the model `l`/`b`/`h` (base) touches the top line within ±1.0 px and sits on the baseline within ±1.0 px, and `X` equals `cursiveGeometry` within 0.5 px; (3) every trace `getBBox()` right edge ≤ 667 and the empty band ≥ `minEmptyBand`; (4) no text ink crosses the strip's SVG box (a clipped descender or loop is an overflow the page lint cannot see); (5) exactly one `@font-face` family `LCS Cursive *` on the page; (6) `font-metrics.json` has `cursive-<unit>`. Also extend `verify-ruling-starters.js` so that its surface discovery finds `data-lcs-prim="script-ruling"`.

## 6 Locale slot structure

| surface | font | reserve | slot / source |
|---|---|---|---|
| title, instruction | shell (Baloo 2 / Nunito) | shell rules | `strings.<loc>.json` G2-377 + faces |
| ribbon familyLabel | Nunito 800 16/20, ≤ 2 lines × 339 px | en ≤ 30 chars (+40 % = 42) | `data/b6/cursive-writing.<loc>.json families[unit][i].label` |
| ribbon scriptName / scriptTag | Nunito 700 12/16 | ≤ 34 chars | `scripts[unit].name` (en "Traditional cursive", de "Vereinfachte Ausgangsschrift") |
| family letters | cursive, X 16 | fixed cells | `families[unit][i].letters` (panel: ordered, 4-8 letters per family, the method's first family first) |
| capitals (F2) | cursive | 6 per page | initials of `SENTENCES.<loc>.names` (≤ 7 letters, distinct initials); panel may override `capitalNames` |
| join pairs (F3) | cursive | 6-8 | `joins[unit]` (panel; per SCRIPT, LA joins differ from VA) |
| words (F4, F5) | cursive | 3-12 letters | `words.<key>` literal per locale (default = vocab singular, lower-cased except de nouns); pinned `pic` path; `picOpened:true` |
| sentences (F6) | Nunito 700 20 in a cream card | ≤ 28 chars AND measured cursive width ≤ 603 px at the F6 X | `sentences[]` (panel, K-3 words, capital + full stop only) |
Cursive strings may contain only `\p{L}`, space, apostrophe, hyphen (lint). No `: ; ? ! « »`, because the fr shell inserts NBSP/word-joiner there; Playwrite NBSP coverage passed the fallback test, and WORD JOINER is unverifiable by that test. Font floor: nothing under 12 px; cursive never under X 14. Glyph coverage measured today, all 15 units: `äöüßÄÖÜ ñ áéíóú ãõ ç âêôîû àèìòù ëïÿ æøåÆØÅ œŒ ’` all present (width-vs-fallback test, 0 missing).

**Ruling table (data, `data/b6/cursive-rulings.json`; the panel confirms or edits the kind, never code):** en `us3` band · de `lin4` band (Lineatur 2 family) · es `doble` band (cuaderno doble raya) · pt `lin4` band (caderno de caligrafia) · fr `seyes` no band · it `lin4` band (rigatura di seconda, panel checks) · nl `lin4` band · da `lin4` band · no `lin4` band. **Script unit table:** en us-trad (us-modern vendored, not published) · de va + la (split per face by `unitOverrides`; sas held until a native check) · es mx · pt br · fr fr-moderne *(panel re-decides against fr-trad, §2.1)* · it it-moderna · nl nl · da dk-uloopet or dk-loopet (panel default) · no no · **sv, fi: type refused (hub 0)**.

## 7 Five variation faces

**F2 cursive capitals (G2; fr CE1, it seconda; es + it panel-gated): CODE `content:'capitals'`.** Same six-strip layout as the base, so it sits beside it as a sibling, but the model cell holds a CAPITAL and the traces are `[capital, capital, name]` ("A", "A", "Anna": the capital joined to its lowercase, the lesson every script teaches). Ribbon: label "Capital letters" and six cells with the capitals. Measured: widest capital = 1.63 em (br M), so marginX widens to **92** (model cell 92 at font ≤ 46 fits 75 px of ink). Names ≤ 7 letters ⇒ traces end ≤ 92 + 16 + 2·74 + 2·26 + 7·0.58·45 ≈ 440 ⇒ empty band ≥ 235. Verify hook: capital initial of each traced name === the strip's model capital; 6 distinct capitals. Query face: "cursive capital letters" / "Großbuchstaben Schreibschrift" / "letra cursiva maiúscula".

**F3 letter connections (G2): CODE `content:'joins'`.** Same strip layout. The model cell (**96** wide) holds a PAIR ("ol"); traces = `["ol ol", "ol ol"]`, so the join inside each pair and the pair-to-pair restart are both traced. 6 pairs at d2 from the per-script `joins` list (top joins out of o b v w, joins into e s a). Ribbon: "Joining letters" + the six pairs in 56 px cells. Verify hook: every pair is 2 letters from the script's list, and no pair repeats. It must not overlap the base: a pair never equals a family chain (`aa`), and no single letter is modelled. Query face: "cursive letter connections" / "Buchstabenverbindungen" / "les liaisons".

**F4 cursive words with pictures (G2): CODE `content:'words'`.** No ribbon; scriptTag 28 on top (+8). Four blocks, each a cream picture tile **116 × 150** (picture 96, creamDeep 2, r14) beside TWO strips 547 wide at **ROW 72** (gap 6). Strip A = teal model word left of a coral rule at the strip's midpoint, grey trace word right of it. Strip B = empty (write the whole word, pencil down until the word ends, then dots/crosses/accents). Budget: 36 + 4·150 + 3·14 = **678** ≤ 722. Words 3-8 letters; the render gate asserts that each word fits its half-strip (measured `apple` 123 px at X 20, us-trad). Verify hook: pinned picture exists, `picOpened`, and the word literal is non-empty for the locale. Query face: "cursive words" / "palabras en letra cursiva".

**F5 reading cursive (G2; the only closed face): CODE `mode:'read'`.** No writing strip. scriptTag, then `.ws-match`: 8 cream word cards **260 × 72** (cursive teal, card X = min(18, (72−12)·x/(asc+desc)); nl → 15) with right dots, and 8 white picture tiles **84 × 72** (picture 64 ≥ 36 floor) with left dots. Rows `minmax(64px,1fr)`, gap 12: 36 + 8·72 + 7·12 = **696**. The child draws lines. verify(): bijection + derangement + seed-sweep position tell (§4). Query face: "reading cursive worksheet" / "Schreibschrift lesen".

**F6 copy a sentence (G3; G2 fr it pt): CODE `content:'copy'`.** scriptTag, then three blocks: a cream print card (Nunito 700 20, ink, h 44, pad 8 16) + TWO full-width strips at **ROW 70, xMax 18** (gap 12). At d2 the sentence's first word is printed as a grey cursive trace at the start of strip 1 (capital + first join shown once; `startWord:true`). Budget: 36 + 3·(44 + 8 + 70 + 12 + 70) + 2·20 = **688**. Width law measured: the cursive sentence runs 0.51-0.61 em per character, and `Der Hund spielt im Garten.` (26 chars) = 619 px at X 22; at X 18 a 28-char sentence = 28 × 0.61 × 34 ≈ 580 ≤ 603. The render gate checks the real width with the sentence rendered off-page. Verify hook: sentence starts with `\p{Lu}`, ends with ".", has 4-6 words, and passes the cursive width law. Query face: "copy a sentence in cursive" / "Abschreibtext Schreibschrift" / "copie en cursive".

**Why these five:** they are the five lessons of every school copybook after the letter families: capitals, joins, whole words, reading the hand and transfer from print. Each changes what the child DOES (form capitals / join / write words from a picture / read / copy without a model), and each resolves to a different `content` knob at d2 (`gate-variation-distinct.js` passes by construction). **First to cut:** F3 joins. Its query demand is the thinnest outside de/fr, its per-script pair list is the heaviest panel load, and its page is closest to the base.

**Hub contract.** A face appears under `cursive-writing` on `/[locale]/worksheets` IFF `apps.cursive-writing` exists (subject letters), `axes['exercise-type']['cursive-writing']` has `slug` + `name` ×11 (the sv/fi names are needed even though those locales ship 0 rows), there is exactly one landing per face per locale with `coordinate.type === 'cursive-writing'`, a band-table level key, `coordinate.mode` = the face's mode string (base `'base'`), `coordinate.theme:''` and a unique slug, and the JSON is committed + deployed. Expectation: 6 per locale in en de es pt fr it nl da no, minus recorded refusals (it F2, es F2 if the panels refuse), **0 in sv and fi**. Gate: `scripts/verify-hub-type-rows.js` reading the b6 `hub-expectations.json`.

## 8 Two alternatives + recommendation

**Alt 1 "hero letter cards":** six cream cards, each with one big model letter (≈ 120 px) and a short ruled fragment below. It photographs well, but it cuts the line into 300-px pieces. Cursive is rhythm along a long line, and a fragment teaches single letters, which is what print tracing already owns. Cards also eat ~30 % of the width in padding. Rejected.
**Alt 2 "full Heft page":** twelve continuous rulings, a model only at each line start, no ribbon. It is authentic, but monotone: it gives no family identity, has nothing a teacher can recognise from across the room, and at Lineatur-true proportions twelve lines only fit at X ≈ 12 (below the G2 floor). It survives as the d3 idea for F6 only.
**Chosen: the copybook strip.** It is the only concept in which ONE component (ruling + margin + model + light chains) carries five of the six faces unchanged, so a script, a ruling kind or a locale is DATA, never code. It keeps the long line cursive needs. And its "lines where the ink is" rule makes the page correct by measurement in every script, not by eye.

## 9 Risks, mitigations, print check

- **Wrong font silently.** A missed `@font-face` falls back to a system italic that looks almost cursive. Render gate check (1) compares against a fallback, and check (5) forbids a second family.
- **Ruling vs school proportion.** For de-la / de-sas / it-moderna / dk the ascender band is 0.71-0.85 of the Mittelband, not a Lineatur 1:1:1. This is deliberate: the model must touch its lines. It is recorded here for the de/it/da panels, who may request `bands` overrides in the ruling table only together with a font change. Seyès fr: the fr-moderne vs fr-trad numbers are in §2.1, for the panel.
- **Isolated model letter.** Playwrite draws an isolated letter without its lead-in stroke (seen in `en-base.png`). The chain shows the joined form. Panels confirm that their school accepts the isolated model in the margin cell.
- **Overflow in long locales.** Only the ribbon label, script tag, F6 print card and titles carry prose (reserves in §6). Cursive widths are gated in the render, never estimated.
- **Greyscale print.** Teal model is dark (L ≈ 0.39), traces are `grid` (≈ 0.76), band tealSoft (≈ 0.91), baseline inkSoft (≈ 0.53) and the coral margin prints mid-grey (≈ 0.62). All five stay distinguishable. The band must never carry text colour tealSoft.
- **Pencil space.** Base ≥ 255 px of empty band per strip at d2; F4/F6 each have a full empty strip per item.
- **9 px floor:** the smallest text is 12 px (script name); cursive never under X 14.
- **Lints the build adds:** instruction may not name dotted / dashed / hollow (`gestrichelt`, `punktiert`, `pointillés`, `punteggiato`, `stippel`, `punkteret`, `stiplet`, `tracejado`, `punteado`), because the traces are solid grey; instruction must name "grey" (panel wording); cursive strings match `^[\p{L}' ’-]+( [\p{L}' ’-]+)*$`; no page mixes units; F4/F5 pictures come from the pinned, OPENED list below. **Only a human eye catches:** whether a letterform is "her" school's (panel signature, per locale), and whether the traces read as inviting rather than faint on a real printer (print one A4 per ruling kind before publish).
- **Pictures OPENED today** (contact sheet `sheet.png`, `picOpened:true`): `fruits/apple` (red apple), `animals/cat`, `animals/dog`, `toys/ball` (a FOOTBALL: word = the football word where a locale distinguishes, fr "ballon"), `toys/boat` (small ship), `around the house/key`, `animals/fish`, `fruits/banana`, `around the house/bed`, `vehicles/bus`, `fruits/lemon`, `animals/owl`, `weather/sun` (smiling sun; `space/sun` stays blocked), `fruits/pear`, `animals/duck` (a DUCKLING: panels may prefer the chick word, or drop it), `farm animals/cow`, `animals/fox`, `vehicles/car`, `animals/horse`. Absent: `fruits/grapes` (no file). Traps: it vocab `car` = "Automobile" (13 letters: the panel writes "macchina" or drops it); vocab singulars are capitalised citation forms, so they are lower-cased except de nouns.

## 10 Summary

1. One component, the copybook strip: the locale's own ruling with a tealSoft Mittelband, lines placed on the MEASURED ink of the Playwrite school font, and a coral margin rule separating the teal model (look) from grey traces + empty band (pencil).
2. Tracing = solid `grid` fill (dotted/hollow/tealSoft rendered and rejected). Joins come from whole-string `<text>` runs with `calt` on (measured shaping), and each page inlines exactly one `@font-face`.
3. Base: family ribbon + 6 letter strips, ROW 88, X ≤ 24 (608 px + gaps = 722). F2 capitals + names and F3 join pairs reuse the strip unchanged; F4 picture words, F5 closed 8-pair reading match, F6 print-to-cursive copy.
4. Ruling kind and script are DATA (us3 / lin4 / doble / seyes; the unit table); sv + fi refused. The fr panel gets the measured Seyès fit (moderne 2.18/1.21 il vs trad 2.71/1.76).
5. A new render gate proves the font loaded, the ink touches its lines, no trace overflows, and one script per page; F5 alone has a verify() (bijection, derangement, position-tell sweep).
