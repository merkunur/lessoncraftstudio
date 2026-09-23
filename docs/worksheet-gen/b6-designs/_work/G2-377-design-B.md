# G2-377 `cursive-writing`: design B ("Rhythm rows")

Designer B (typographer + lettering teacher). Every number below was measured on 2026-09-23 in headless Chromium (puppeteer from the repo `node_modules`). The fonts were loaded from `assets/fonts/cursive-fonts.css`, with urls rewritten to `file://` the same way `page/shell.js` does it. The measurement scripts were throwaway session scratch; the engineer must re-measure with `tools/measure-font-metrics.js` extended by a `cursive` block (see §5). I rendered a mock of the rows, looked at it, and several decisions below come from what that mock showed.

## Boundary

This page is NOT K-238 letter-tracing (print capitals), NOT K-278 lowercase-letter-tracing (print lowercase with stroke arrows from `letter-strokes.js`), NOT K-284 word-tracing and its six faces (print words, hollow dashed glyphs), NOT pre-writing (patterns / Schwungübungen / graphisme), NOT sight-words (see-trace-write). It is also not G2-278 picture-writing (open composition). Two things make it this type. First, every letterform on the page is the locale's own school SCRIPT: a Playwrite font, joined by the font's contextual alternates. Nunito appears only as the print source line of F6. Second, the page is built on a ruling that a teacher of that country recognises as HER paper: US 3-line, de Lineatur with the shaded Mittelband, fr Seyès with its coral margin, es-MX doble raya. Visual signature, from across the room: a white card of real school ruling; one dark model letter wearing a small coral start dot; a light-grey joined chain after it; and on the line below, tiny rhythm ticks that show the child where each next letter begins. There are no arrows and no hollow outlines, because no cursive stroke data exists (the start dot is the ONLY stroke claim, and it is gated, §4). The paper, the rhythm and the dot are the whole design.

## 1 Page concept (base)

**"Rhythm rows."** A cursive page lives or dies on SPACING and SIZE, not on decoration. A 7-year-old wants to write when the page looks like a real exercise-book page made just for them: big enough letters, a clear place to start, and a beat to write to.
- One focal apparatus: the school ruling, drawn at the locale's real geometry and sized from MEASURED font metrics. The x-height is the Mittelband / dashed midline, so every model letter sits exactly in its band.
- Per letter, a two-row block. **Row A** holds the model letter (ink) with its coral start dot, then a joined grey trace chain of 3 (`aaa`, rendered as ONE shaped string so the joins are real), then open ruling to the row end. **Row B** is open ruling carrying grey **rhythm ticks** under the baseline, spaced at the MEASURED advance of the chain. The ticks teach even letter spacing, the typographer's rhythm, without printing a single letter.
- A **family ribbon** above the blocks shows the stroke family's letters in cursive (e.g. `a c d g o q`) on a coralSoft pill. The page's 4 letters are coloured ink and the rest grey, so the child sees "these letters are cousins". There are no words on the ribbon, so it has nothing to translate.
- Pencil-first: zero printed answers, ≥ 55 % of the body is open ruling, and whitespace comes from a row pitch sized for the child's hand.
- Why top quality: the mock render (Chromium, SVG `<text>`) showed real joins in all 13 units (`aaa` = 1 connected ink component in every font), correct Ü / å / é / ç / œ coverage (0 missing glyphs across the 13 locale character sets), and a ruling on which ascenders and descenders land on the teacher's lines instead of floating near them.

## 2 Layout (d2, 722 body, lane 639)

Measured font metrics (per em, Chromium canvas ink; `xH` = x-height, `asc` = l/b ink ascent, `desc` = g/p ink descent, `maxAsc` = tallest glyph of the locale set incl. accented capitals, `stroke` = stem width at default wght 400):

| unit | xH | asc | desc | maxAsc (glyph) | maxDesc | stroke | used for |
|---|---|---|---|---|---|---|---|
| us-trad | .520 | 1.020 | .520 | 1.090 S | .520 | .130 | en default |
| us-modern | .520 | .955 | .460 | .960 | .460 | .083 | en option (joins confirmed) |
| de-va | .520 | 1.000 | .500 | 1.199 Ä | .500 | .113 | de default |
| de-la | .520 | .940 | .440 | 1.140 Ä | .440 | .153 | de second |
| de-sas | .520 | .910 | .410 | 1.110 Ä | .410 | .153 | de, native check only |
| mx | .520 | 1.020 | .520 | 1.270 Á | .520 | .160 | es |
| br | .520 | 1.150 | .650 | 1.410 Á | .650 | .137 | pt |
| fr-moderne | .515 | 1.115 | .620 | 1.380 À | .620 | .083 | fr (see §9: unlooped l) |
| fr-trad | .520 | 1.430 | .930 | 1.689 À | .930 | .127 | fr (my recommendation) |
| it-moderna | .520 | .890 | .395 | 1.140 À | .400 | .083 | it |
| it-trad | .520 | .980 | .480 | 1.230 À | .480 | .137 | it option |
| nl | .520 | 1.295 | .795 | 1.499 Ë | .800 | .113 | nl (longest extenders) |
| no | .520 | .985 | .490 | 1.270 Å | .490 | .087 | no |
| dk-loopet | .520 | .895 | .395 | 1.170 Å | .400 | .180* | da option |
| dk-uloopet | .520 | .890 | .395 | 1.170 Å | .400 | .087 | da default |

(*loop crossing inflates the dk-loopet stem reading.) All 15 fonts share xH ≈ .52 em, so font-size = X / .52.

**Row geometry (all rulings):** `rowH = ceil((A + D) · fs) + 12`, where `fs = X / xH`. `A` = `asc` for lowercase-only rows and `maxAsc` for rows that print capitals or accents. `D` = `maxDesc`. The 12 is 6 px above the tallest ink plus 6 px below the deepest. Baseline `yB = 6 + A·fs`, x-line `yB − X`, top line `yB − asc·fs`, descender line `yB + desc·fs`.

**Base body (d2), budgeted at 722 × 639:**
```
┌ family ribbon  44 (coralSoft pill, cursive letters at X·1.0, ink/grey) ┐  44
│ gap 12                                                                 │  12
│ ┌ block 1 ─────────────────────────────────────────────────────────┐   │
│ │ row A  rowH : [pad 12][model 1 letter + dot][gap 0.6em][trace "aaa"][gap 24][open ...] │
│ │ gap 4                                                            │   │
│ │ row B  rowH : open ruling + rhythm ticks (grid 2×6 px under base)│   │
│ └──────────────────────────────────────────────────────────────────┘   │  2·rowH+4
│ gap 12  … blocks 2,3,4 (identical shape)                               │
└────────────────────────────────────────────────────────────────────────┘
total = 44 + 12 + 4·(2·rowH + 4) + 3·12 = 108 + 8·rowH ≤ 722  →  rowH ≤ 76.7
```
X per unit comes from the fit rule `X = min(X_target(band), fitted)`. X_target: G2 22 on `us3` and on `band4` for pt/it, 20 on `band4` de/nl/da/no and on `double` es; fr Seyès, see below. Measured result for the base: us-trad X 21.9 (rowH 77, fs 42.1); us-modern 22 (73); de-va 20 (70); de-la 20 (66); de-sas 20 (63); mx 20 (72); br 18.7 (77); it-moderna 22 (67); it-trad 22 (74); **nl 16.1 (77)**; no 20 (69); dk 20 (62). **Floor: X ≥ 16 at G2 and ≥ 18 where the locale's base band is G1 (fr/pt/it).** If the fit falls below the floor, the build drops a block (4→3) and never shrinks X further. br at 18.7 clears its G1 floor; nl at 16.1 clears G2.

**fr Seyès** is quantized, so it cannot use the fit rule. Interline `i` = the x-height. d2 = **Seyès 3 mm, i = 11.34 px** (the real CP cahier). Row A sits on a thick line, row B on the NEXT thick line 4i below, and the block ends with one skipped line ("on saute une ligne"), so block pitch = 12i = 136 px. Body = 44 + 12 + 4·136 = 600 ≤ 722. A 1.2 px coral vertical margin line sits at x = 46, and writing starts at x = 56. Row B is the child's own writing, so row A's printed descenders (1.79i with fr-trad) can never collide with printed ink.

Widths: a 3-letter chain measures 1.89 em (`aaa`) to 3.27 em (`mmm`), i.e. 80–138 px at fs 42. Model + gap + widest chain ≈ 12 + 36 + 25 + 138 = 211 px, which leaves ≥ 400 px of open row A. *All widths are canvas-measured; the engineer re-measures in the DOM with `getComputedTextLength()`, because canvas and DOM shaping can differ by a few px.* Worst chrome (three-line title + three-line instruction) is budgeted in the 722 above; rows are `minmax(rowH, 1fr)` so slack becomes air between blocks, never taller letters.

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| letters per page | 3 | 4 | 5 |
| rows per block | 2 (A + B) | 2 (A + B) | 2 (A + B; row A trace 2 not 3) |
| X (x-height px, before fit) | 26 (us3) / 24 | 22 (us3) / 20 (band4, double) / Seyès i 11.34 | 18 / 16 / Seyès i 9.45 (2.5 mm) |
| traceCount (row A chain) | 3 | 3 | 2 |
| rhythm ticks on row B | 5, plus a grey ghost of the first letter | 4 | 0 (free writing) |
| start dot | model + first trace letter | model only | model only |
| family ribbon | yes | yes | yes |

d2 is the best page: 4 letters is one stroke family's core, and ticks without a ghost keep the child writing, not tracing.

## 4 Answer-hiding + uniqueness

The base and F2/F3/F4/F6 are open-ended writing templates: no verify beyond the layout lints and the gates below. Nothing to hide; the model IS the task.
- **The start dot is the only claim of stroke order, and it is gated. The measurement showed that geometry alone cannot decide it.** I skeletonized every lowercase glyph (Zhang-Suen on a 180 px raster, largest component) and listed the stroke ENDpoints. The result: (1) the exit is sometimes low-left of the start (us-trad `c`: start .85 xH, exit .17 xH, x .389 < .472) and sometimes HIGH (us-trad `b` exits at .91 xH), so no "leftmost / lowest" rule picks the start; (2) an endpoint can be a RETRACE apex, not a pen start (de-va `d`: the top of the stem is an endpoint, and my mock put a dot there, which is wrong: the d starts on the bowl); (3) some letters have fewer than 2 endpoints because the start is buried in a closed contour: `o` in every script; `a b e g o` in us-modern; `a e o` in de-va; `a b e g o q` in fr-moderne; `a g o` in br; `b e g o q` in it-moderna; `g o q` in it-trad; `e o` in no. Letters with a clean 2-endpoint skeleton per unit: us-trad 13, mx 13, de-la/nl/dk ×2 12, de-sas 11, it-trad/no 10, de-va/br/fr-trad 9, it-moderna 8, us-modern/fr-moderne 7.
- **Rule:** the per-script native panel picks the start endpoint per letter from the MEASURED candidates (data `startDots.<unit>.<letter> = endpointIndex | null`). The gate proves the dot centre lies within 0.6 × stroke of a skeleton endpoint of the glyph AS RENDERED IN THAT CONTEXT (isolated model; for F4, the word-initial letter inside the shaped word). A letter with no candidate endpoint gets NO dot; its row is otherwise identical. A page must carry ≥ 2 dots, or the instruction's "orange dot" sentence would be false; the family draw for d2 enforces that. The gate proves "on a stroke end"; the panel proves "it is the start". Say both, never one.
- **F5 (closed):** one correct pairing, stamped `data-lcs-pair="<i>"` on each word and picture; verify re-derives it. Anti-tell rules: (1) the picture column is a derangement of the word column (no word level with its picture; `derange` from `components-b4.js`), and a gate over 400 seeds reports that no row index carries its partner more than 1/6 + 5 %; (2) ≥ 2 of the 6 words share their first letter (the child must read past the capital or initial); (3) no picture that two children name differently (see §7 F5 exclusions). A wrong line is visible to the teacher because it joins a word to a picture whose noun differs.

## 5 Primitives / components

**Reused:**
- `primitives/trace-path.js` `schoolLines` is NOT reused for the lines themselves: it ties the mid to Nunito geometry and has no 4-line or Seyès form. Its token choices (grid 1.5 solid, grid 1 dashed `3 5`) are copied.
- `templates/components-b4.js` `derange` (F5 order).
- `templates/components-b3/ordinal-numbers.js`: nothing.
- `.ws-match` / `.ws-match-dot--left/--right` (page.css) for F5.
- `lib/b3-picture-index.js` `pictureFor` (F4/F5 pictures; throws on a missing one).
- `lib/unit-axis.js` for the script axis.
- `data/b2/sentences.js SENTENCES.<loc>.names` (F2).
- `data/b3/locales/instructions.<loc>.json objForms` is NOT needed: this type never inflects a noun.

**NOT used:** `rulingBlock` / `writingRow` (Nunito-derived x-line; would put a Playwrite x-height 2–6 px off its own midline); `strokeWordLane` / `glyphLane` (hollow dashed text: CSS cannot dash a text stroke honestly for a script font, and the pedagogy rules out hollows); `letter-strokes.js` (print only); `wordBank` (no bank on any face).

**NEW `templates/components-b6/cursive-writing.js`** (every export prefixed `cw`):
- `cwFontFace(unit)`: returns ONE `<style>@font-face{font-family:'LCS Cursive <unit>';src:url('file:///…/cursive/playwrite-<unit>.woff2')}</style>`. Only the page's own unit, never the whole `cursive-fonts.css` (15 × ~30–44 KB). It is inlined into the body so `fonts.css` stays byte-identical; the `file:///` rewrite is copied from `page/shell.js`. `font-display:block`; the render waits on `document.fonts.check`.
- `cwRuling({kind, w, X, fs, A, D, i})` → SVG ruling. Kinds:
  - `us3` (en): top line at `yB − asc·fs`, grid 1.5; x-line dashed grid 1, `3 5`; base line teal 1.5.
  - `band4` (de, nl, pt, da, no): top line, x-line, base, descender line. Grid 1.2, base teal 1.5, Mittelband rect `tealSoft` between x-line and base. Proportions from the font; de-va measures .48 : .52 : .50 em, which is the Lineatur 1 : 1 : 1 a de teacher expects.
  - `double` (es-MX doble raya, it rigatura di seconda): x-line grid 1.2 plus base teal 1.5, `tealSoft` band between them, no top or descender line. Ascenders rise freely into the gap, as in the cahier.
  - `seyes` (fr): horizontal line every `i` from `yB − 3i` to `yB + 2i`. Thin lines grid 0.9, the writing line teal 1.6, plus the coral margin line at x = 46.
  - Stamps `data-lcs-ruling="<kind>" data-lcs-x="<X>"`.
- `cwText({unit, text, fs, x, yB, tone:'ink'|'trace'})`: one `<text>` per string (NEVER per-letter `<tspan>`s: they break `calt`). `letter-spacing:0`, no `text-transform`, `font-feature-settings:'calt' 1,'liga' 1`. Tone `ink` = `#3A3530`, `trace` = grid `#C8BFAE`. Stamps `data-lcs-cursive="<unit>"` and `data-ws-content`.
- `cwStartDot({cx, cy})`: circle r = max(4.2, 0.6 × stroke·fs), coral `#F2784B` fill, white 1.5 ring, stamps `data-lcs-startdot="<letter>"`.
- `cwTicks({x0, step, n, yB})`: grid 2 px × 6 px ticks at `yB+2 … yB+8`; `step` = DOM-measured chain advance + one space advance (`space` measured .300 em in all units).
- `cwJoinMark({x, yB})` (F3): coral 10 × 2.5 px rounded bar at `yB + 5`, centred on the join x = `getSubStringLength(0,1)` of the shaped pair.
- `cwRibbon({unit, letters, active})`: coralSoft pill 44 high, letters at font-size fs·0.9, ink for active and grid for the rest, gap 18.
- `cwBlock`, `cwWordBlock`, `cwMatch`, `cwCopyBlock`: the face layouts in §7.

**NEW tool, not a primitive:** extend `tools/measure-font-metrics.js` with a `cursive` block. It measures the 15 units into `primitives/font-metrics.json` as `cursive-<unit>: {xHeight, ascender, descender, maxAsc(locale), maxDesc, stroke}`, and adds a `qa/verify-cursive-startdots.js` that re-skeletonizes and asserts every stamped dot (poison both ways: a dot moved 0.3 em must FAIL; the committed table must PASS).

## 6 Locale slot structure

- The apparatus carries NO authored text in the base, F2 or F3 (letters, names, pairs are script data). F4/F5 words are vocab singulars (de capitalised; the code never inflects). F6 sentences are panel literals. Title and instruction sit in the shell (Baloo title, Nunito instruction).
- The F6 print line is Nunito 800 18 px on a tealSoft strip 34 high, the only Nunito on the body; reserve +40 % (de/pt): the sentence must fit one strip line of 615 px (≈ 76 chars at 8.1 px/char).
- Cursive width gates (DOM-measured): F4 word `2·w + 24 ≤ lane 551`, i.e. word ≤ 263 px at fs; for de-va at fs 38.5 that is ≤ 6.8 em ≈ 11 letters, so "Schmetterling" is refused and the pool is filtered by measure, not by letter count. F6 sentence width ≤ 2 × 615 (it must fit the child's two rows).
- Font floor: no cursive below X 16 (≈ fs 31); ribbon letters fs·0.9 ≥ 28 px; ticks and dots carry no text.
- Band per locale is data: base G1 in fr / pt / it, G2 elsewhere; sv / fi = type refused (0 rows).

## 7 Five variation faces (all CODE faces: each is an additive `face` knob on `build()` + its own layout; the base stays byte-identical)

**F2 cursive capital letters (`face:'capitals'`, CODE).** The ribbon shows the capitals drawn from the locale's names bank, e.g. en `M B E L A T` (the initials of Mia Ben Emma Leo Anna Tom Lily Max). Each block's row A holds the capital model + dot, the trace `A A` (spaced, because not every script joins a capital), then the NAME trace `Anna` (one shaped string, capital into lowercase). Row B is open with 3 ticks. `A = maxAsc` (accented capitals), so rowH grows: us-trad X 20.9, mx 18.8, br 16.3 (below the G1 floor 18, so **br drops to 3 capitals**), **nl 14.6 (below the floor, so 3 capitals)**, the rest 19–20. Verify hook: every capital on the page is the initial of a printed name. Query face: "cursive capital letters". es and it: the panel may refuse this face (pedagogy D).

**F3 cursive letter connections (`face:'joins'`, CODE).** Six single-row items, no ribbon. Each row: the pair model in ink (e.g. `ol`) with a coral **join mark** under the measured join x, then the trace `ol ol`, then open ruling with 2 tick pairs. Pitch: 6·rowH + 5·14 ≤ 722, so rowH ≤ 108 and X reaches its target in every unit (us-trad 22 / rowH 78; nl 20 / 93) with generous air. The pairs are per-script panel data (top joins out of o b v w r; joins into e s a; de-la ≠ de-va). Verify hook: every pair renders as ONE ink component (a pair that renders unjoined in its font is refused, e.g. a capital pair). Query face: "cursive letter connections / Buchstabenverbindungen / liaisons".

**F4 cursive words with pictures (`face:'words'`, CODE).** Four blocks. A 64 px picture card on the left spans both rows (cream card, radius 10). The lane is 639 − 64 − 24 = 551. Row A holds the word model in ink with a start dot on its first letter (dot measured inside the shaped word), then the trace. Row B is open with ticks one word-advance apart. Stack 4·(2·rowH+4) + 3·14 ≤ 722, so rowH ≤ 84: us-trad X 22, nl 17.9, br 20.8. Pictures OPENED by me: `animals/cat`, `animals/dog`, `animals/duck` (a duckling, still "duck"), `animals/fish`, `animals/owl`, `animals/zebra`, `animals/penguin`, `animals/rabbit`, `animals/turtle`, `fruits/apple`, `fruits/banana`. **`fruits/cherry` EXCLUDED** (one large red fruit that reads as an apple). Every further picture must be opened by the panel. Verify hook: word-width gate + the i-dot / accent-last rule is shown, not stated. Query face: "cursive words".

**F5 reading cursive (`face:'read'`, CODE, the only closed face).** No ruling. A `.ws-match` two-column layout: left, 6 cursive words in ink at X 20 on a single faint grid baseline, 290 px column; right, 6 pictures at 72 px (G2 floor 36), dots between the columns. Row pitch (722 − 5·14)/6 = 108, calm. Anti-tell and uniqueness rules as in §4 (derangement, ≥ 2 shared initials, opened unambiguous pictures). Verify re-derives the pairing from `data-lcs-pair`. Query face: "reading cursive worksheet / Schreibschrift lesen".

**F6 copy a sentence in cursive (`face:'copy'`, CODE).** Three items. Each: a print strip (Nunito 800 18, tealSoft, 34 high), then 2 open ruling rows with NO ticks (free transfer), block gap 16. 3·(34 + 6 + 2·rowH + 4) + 2·16 ≤ 722, so rowH ≤ 93: X at target in every unit except nl (18.3). The sentences are panel literals (4–6 words, capital + full stop, K-3 words), gated to fit 2 rows. Query face: "copy sentences in cursive / Abschreibtext".

**Why these five:** each changes what the child DOES: the capital set, the join, the whole word, reading instead of writing, and print-to-script transfer. Each has its own harvested head (panel files) and its own resolved config (`face` knob), so `gate-variation-distinct` passes by construction. **First to cut: F3.** Its pair lists are the thinnest per-script data, and in da/no a join list may not survive the native check; if it falls in ≥ 4 locales, propose "cursive alphabet a–z reference strip + name" instead.

**Hub contract:** `apps.cursive-writing` + `axes['exercise-type'].cursive-writing` slug/name ×11 (sv/fi rows still carry the name, with 0 landings). One landing per face per locale, with `coordinate.type:'cursive-writing'` and `coordinate.mode` = the face string; de splits its six landings between VA and LA per the lock. `scripts/verify-hub-type-rows.js` expects 6 rows per locale, sv 0 and fi 0, minus recorded refusals (es/it F2 if refused).

## 8 Two alternatives + recommendation

- **A. "Alphabet wall":** a–z on one page, 26 mini-rulings. Rejected: 26 rows at ≤ 27 px pitch force X ≈ 8 px, below every floor, and the pedagogy file already rejects it.
- **B. "Picture path":** a winding lane where each letter sits next to an object picture. Rejected: cursive needs STRAIGHT horizontal ruling (a curved baseline teaches the wrong slant), and pictures on the letter rows compete with the model for the eye.
- **Chosen: rhythm rows.** It is the only concept where every visual element is a measured typographic fact (real ruling proportions, real joins, gated start points, measured spacing ticks), so it cannot quietly be wrong in a locale; and it is the page a teacher would photocopy from a good exercise book. The pictures live where they carry meaning (F4, F5), not as decoration on the letter rows.

## 9 Risks, mitigations, print check

- ⚠⚠ **fr script choice (measured, for the panel):** the mock render showed **fr-moderne's `l` is a plain unlooped stick** (and b/h/k likewise, ascender only 2.17 i on Seyès), while the French model keeps looped ascenders reaching ~3 interlines and descenders ~2. **fr-trad measures 2.75 i up / 1.79 i down with loops**, the Seyès proportion a CP teacher expects. My recommendation: fr-trad, pending the fr panel's check against the ministry model. The pedagogy file named fr-moderne; this is a measured objection, not taste.
- **Joins break silently** if the engineer splits a string into tspans, sets `letter-spacing`, or lets a text-transform run. Gate: each chain / word / pair must render as 1 ink component, excluding i/j dots, t-bars and accents (measured: `aaa` = 1 in all 15 units; `minimum` = 3 = body + 2 dots).
- **Start dot correctness** cannot be proven geometrically (§4, de-va `d`). Mitigation: panel table + endpoint gate + poison test.
- **Long locales:** only the print strip (F6) and the instruction carry prose; cursive words and sentences are width-gated by DOM measure, never by char count.
- **Greyscale print:** trace grid `#C8BFAE` prints ~76 % luminance: light enough to write over, dark enough to follow. The base line is teal (dark grey) and the other lines grid, so the child finds the writing line. The coral dot prints mid-grey, and its white ring keeps it visible on the dark ink stroke. The Mittelband `tealSoft` nearly vanishes in B&W; the x-line keeps the band readable.
- **Descender / ascender collisions:** rowH includes `maxAsc` (Ä/Å/À/Ë rise 1.14–1.69 em) plus 6 px air; printed ink never shares a zone with printed ink in the row above.
- **Font payload:** one woff2 per page (27–44 KB), inlined by the component; `fonts.css` untouched.
- **9 px floor:** no cursive under X 16; every text ≥ 18 px.
- **What QA lint catches:** overflow, footer intrusion, palette, 9 px floor. **What only a human eye catches:** whether a letterform is "her" school script, whether a dot sits on the start, whether a picture is named alike by every child. Those are the panels' signatures, recorded per locale.

## 10 Summary

1. "Rhythm rows": real per-locale school ruling (us3 / band4 Lineatur / doble raya / Seyès), a model letter with a gated coral start dot, a shaped grey joined trace chain, and an open row with measured rhythm ticks.
2. Sized entirely from MEASURED Playwrite metrics: xH = .52 em in all 15 fonts, ascenders .89–1.43 em, descenders .40–.93 em. Row pitch comes from a fit rule with floors X ≥ 16 (G2) / 18 (G1); nl and br are the tight units.
3. Start dots are honest only as panel-chosen measured stroke endpoints, gated in render. `o` never gets a dot, and 7–13 letters per script have a clean candidate.
4. Five CODE faces: capitals from the locale's name initials, joins with a measured coral join mark, picture words (11 pictures opened, cherry excluded), a closed deranged reading match, and print-to-cursive copy.
5. Measured flag: fr-moderne draws unlooped l/b/h/k and fits Seyès poorly; fr-trad matches. The fr panel decides.
