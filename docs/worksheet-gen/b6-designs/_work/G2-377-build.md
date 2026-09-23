# G2-377 `cursive-writing` — base build report (2026-09-23)

Contract: `G2-377-cursive-writing.md` §2 (base) + §5 (data + gates). Faces F1-F5 are NOT built (Phase E); their `mode` values reach the base guard and THROW.

## Files (all new, type-scoped; nothing shared edited; nothing staged or committed)
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/measure-cursive-metrics.js` | measures all 15 vendored Playwrite units in Chromium (canvas TextMetrics, 1000 px, from `cursive-fonts.css`); `--check` fails on drift > 0.002. Refuses on fonts.check false, on "xbdg" as wide as serif, and on < 5 distinct ink shapes across the units (the fallback tell; see "found" below) |
| `scripts/worksheet-gen/primitives/cursive-metrics.json` | written by that tool: `cursive-<unit>` = xHeight, xDescender, ascender, descender, cap, capDescender, accCap, lineAscent, lineDescent. Values equal the design's §2 table to 4 places |
| `scripts/worksheet-gen/primitives/school-ruling.js` | `rulingGeometry({unit,kind,X,cap})`, `seyesGeometry({unit,i,rows,last})`, `schoolRuling({kind,w,geom,marginX,tint,dashHelpers})`; kinds `us3 / lin4 / doble / seyes`; coral margin rule; every line stamped `data-lcs-line` + `data-lcs-y` |
| `scripts/worksheet-gen/qa/verify-school-ruling.js` | render-measuring gate for the primitive (exports `run()`) |
| `scripts/worksheet-gen/templates/components-b6/cursive-writing.js` | `cwFontFace` `cwFamily` `cwLineBox` `cwText` `cwChainRun` `cwRow` `cwRibbon` `cwBlock` |
| `scripts/worksheet-gen/data/b6/cursive-writing.js` | `CURSIVE_WRITING` (locale map: EN block) + `CURSIVE_WRITING_NEUTRAL` (15 units + lifts, 27 pinned pictures, 3 exclusions, modes, level keys, X floors, Seyès i) |
| `scripts/worksheet-gen/types/g2/G2-377-cursive-writing.js` | the spec (base only), unitAxis = the script |
| `scripts/worksheet-gen/qa/verify-b6-cursive-writing.js` | the §5 gate; exports `validateBank`, `renderRules`, `PROBES`, `probeBlock` |

Fonts: the page inlines ONE `<style data-lcs-cursive-face>` lifted from `cursive-fonts.css` with the url rewritten to `file:///` exactly as `page/shell.js` does; `fonts.css` untouched. Every PDF the gate renders embeds exactly one Playwrite face (en: `PlaywriteUSTrad-Regular`; de-va `PlaywriteDEVA`, de-la `PlaywriteDELA`, mx, br, fr-trad, it-trad, nl, dk-uloopet, no — each its own).

## The page (d2 ships)
Ribbon 44 (the page's letters in the unit + script name) → per letter: row A = ink model in the 76 px margin cell, coral rule, two grey chains of three (each ONE HTML text node), open ruling; `writeRows` empty rows. Resolved d2 stacks equal the design table exactly (gate-asserted): en 614 · de-va 614 · de-la 566 · mx 676 · br 630 · fr-trad Seyès 555 · it-trad 676 · nl 670 · dk-uloopet 610 (w2) · no 655 (w2). All ≤ 677; en measured under a 3-line (body 710) and a 4-line (body 667) title chrome: content ends 900 / 910 ≤ body bottom 921.

## Deviations (each measured)
1. **Metrics in a NEW file** `primitives/cursive-metrics.json` (caller instruction) instead of 15 keys in `font-metrics.json` (§1/§2). Added `xDescender` (the calibration page needs it).
2. **line-height**: design says `line-height:normal`. Measured: Chromium rounds the face's ascent/descent to whole px and floors the half-leading — a span sized to exact `(lineAscent+lineDescent)·fs` sat 0.9 px high (ribbon) / 0.4 px high (rows). The component sets line-height = round(asc·fs)+round(desc·fs) and top = yB − round(asc·fs); the raster gate now puts every node's ink on its baseline within ±1.2 px.
3. **Ribbon letter size**: design `fs·0.9` overflows the 44 px ribbon for loopy units (us-trad: 0.9·33.9·1.56 = 47.6 px of ink). Capped at `(44−8)/(asc+desc)` and centred (fr-trad ribbon letters come out ~15 px — small, see open items).
4. **d1**: design "first ≤ 3 letters of the lesson". Reading the d1 render: the printed title "Cursive Letters: i, t, u and w" named a `w` the page did not teach. d1 now keeps the whole lesson at X+2 where it fits 677 (en X20, stack 662), else X. verify() now fails any page whose title names letters it does not teach (poison PR11).
5. **en title** "Cursive Letters: i, t, u and w" (design §6 candidate "Cursive Letters for 2nd Grade: …"): the deck title engine appends the level, so the grade would print twice; panels / SEO may restore it in metadata.
6. **Slack**: block gaps flex 10→40, ribbon gap 12→22 (stack computed at the minimum, so 677 always holds). Design says whitespace from the row pitch; without this a one-line chrome left ~185 px blank under the last block. Seyès keeps gap 0 (a contiguous cahier; its stack = 56 + (12N−3)·i reproduces the design's 555).
7. **Margin rule through the 2 px row gap** (the coral line read as broken between row A and B).
8. **Bank module shape**: `bank()` reads the FIRST export as the locale map, so the design's locale-neutral `CURSIVE_WRITING` object is exported second as `CURSIVE_WRITING_NEUTRAL`.
9. **Rules 4 (render half) and 11** live in the async `renderRules(block, loc, page)`; `validateBank` (sync, what `tools/b6-probe-child.js` calls) does the node half of rule 4 (lift, word ⊃ pair, ≥ 8, distinct).
10. **Raster checks run inside `verify()`** (not only the gate): every generated deck measures ink-on-baseline, ink-inside-row and join pieces (HTML components == canvas oracle; a chain of three never exceeds 1 + 3·(c1−1), or 3·c1 after a lift letter). ~1 s per render.

## Gate output (`node qa/verify-b6-cursive-writing.js`, full)
`verify-b6-cursive-writing: 1528 assertions, 0 failure(s)` (includes `verify-school-ruling: 140 cases, 1143 assertions, 0 failure(s)`; `--quick` 1368 / 0).
- 0 metrics `--check`: 15 units match.
- 1 validateBank(en) 0 · renderRules(en) 0 · renderRules over every probe block 0 (ü ß ñ ç æ ø å covered by their units) · 27 pinned pictures exist on disk.
- 3 en d1/d2/d3 + 722/677 chromes: verify 0, lints 0, rows ≥ 65 px (floor 36), X ≥ floor, no body text < 13 px, printed chrome == bank strings == spec i18n.en.
- 4 all 10 shipped units rendered d1-d3 + a calibration page each ("xxx": ink top ON the x-line ±1.2 px): all clean.
- 5 refusals: sv / fi build throws; en page in de-va throws; a face mode fed to the base throws; a 7-letter lesson throws (does not fit 677); X under the floor throws. `render/one.js G2-377 null 2 de de-va` refuses (no de block — the panels author it); the other units are rendered by the gate through design-time PROBE blocks (NOT native data).
- **Poisons killed (all for their own reason, diffed against the untouched block/page):** P1-P17 (17 bank), RJ1 (a pair that does not join), RG1 (a glyph the unit lacks: λ), PR1 per-letter spans, PR2 cursive as SVG `<text>`, PR3 letter-spacing 0.5 px, PR4 de-la face on a VA page, PR5 missing @font-face, PR8 baseline 3 px off the ink, PR10 trace in inkSoft, PR11 title naming letters the page lacks; school-ruling: a us3 x-line moved 2 px, a Seyès writing line moved 2 px, an unknown unit. Controls (untouched en and de-va pages) verify clean. PR6/PR7 (F4) and PR9 (F5) are Phase E — recorded, not run.

## Lead review round 1 (2026-09-23): SPARSE bottoms — FIXED
**Defect (lead):** short lessons left the bottom of the body blank (fr-trad, 3 letters: ~430 px under the last block).
**Fix (writing practice, never decoration, never a larger glyph):**
- **Closing practice rows**: after the lesson, as many more empty rows of the SAME ruling as the 677 budget still holds (`resolvePage` → `practice = floor((677 − stack − 8) / (rowH + 2))`; Seyès: one-writing-line slices of 4 i that tile the cahier). Stamped `data-lcs-practice`, counted by verify().
- **Growable gaps**: every gap has a minimum (the §2 stack is computed at the minimums, so 677 always holds) and a cap (ribbon 12→30, block 10→34, row 2→20, Seyès block 0→30), so a short chrome's slack is spread and no band exceeds 40 px. Non-Seyès letter blocks are `display:contents`, so each row is a flow item; the coral margin rule now runs through the grown row gaps.
- **SPARSE gate, in verify() itself** (every deck checks itself): no blank band > 40 px between consecutive content boxes; ≤ 60 px between the last writing line and the body bottom; content never past the body. The gate renders **every unit × 814 / 722 / 677 chromes** (30 renders): worst tail 35 px (us-trad / de-va at 814), max band 34 px; fr-trad now carries 2 practice lines, de-la 1.
- **Poisons**: PR12 (practice rows removed + gaps frozen) → `SPARSE: 185 px blank under the last writing line`; PR13 (a 90 px band between two letter blocks) → `SPARSE: a 90 px blank band`. Both killed; the untouched pages are the controls.
- Chrome test strings corrected: the "four" chrome is a 4-line title + a 1-line instruction (body 679, the README's 677); my first "four" string produced 634 (a 5-line title in es), which is not a legal chrome.
- Re-rendered d2 for all 10 units and read en, de-va, fr-trad, it-trad, mx, no: each page now reads full to the footer with writing lines. `out/dev/G2-377-null-d2-en-uus-trad.png`, `out/dev/G2-377-probe-<unit>-d2.png`.

**Current gate line (with Phase E):** `PASS (1982 assertions, 42/42 poisons killed)`. Baseline `checked build 4000 + enum 299 in 25s: 0 drifted (0 expected), 0 missing` / `PASS` (the G1-399 crash is gone).

## Release proof
`node tools/b3-baseline.js --check --quick` → `checked build 3900 + enum 299 in 22s: 0 drifted (0 expected), 0 missing` / `PASS` (run after the spec, bank and components existed). ⚠ A re-run at the end of the session CRASHES before checking: `types/g1/G1-399-sink-or-float.js:82` requires `./G1-399-sink-or-float.faces.js`, which the concurrent sink-or-float builder has not written yet (the same crash stops `i18n/build-en.js`). Not a G2-377 file; re-run once that sibling lands. Band-title uniqueness checked directly over the 722 loadable specs: 0 duplicates; "Cursive Letters: i, t, u and w" (30 chars, no worksheet word). `strings.en.json` shows as modified in git — not by this build (build-en was never run with a write).

## PNGs for the reviewer (all read by me; zoomed crops of joins checked)
- en: `scripts/worksheet-gen/out/dev/G2-377-null-d2-en-uus-trad.png` (ships) · `…-d1-en-uus-trad.png` · `…-d3-en-uus-trad.png`
- gate: `out/dev/G2-377-gate-d{1,2,3}-en.png` · `out/dev/G2-377-gate-d2-en-chrome-three.png` · `…-chrome-four.png`
- every unit (d2): `out/dev/G2-377-probe-{us-trad,de-va,de-la,mx,br,fr-trad,it-trad,nl,dk-uloopet,no}-d2.png` (d1 / d3 alongside)
- calibration: `out/dev/G2-377-calib-<unit>.png`
- primitive, colour + greyscale: `out/dev/G2-377-school-ruling.png` · `out/dev/G2-377-school-ruling-grey.png`
What I saw: joins unbroken in every unit (i dots / t crosses separate as the fonts draw them); traces solid grey; lines sit on the measured ink; pages calm. de-va `t` is the looped VA t (authentic, but the de panel must sign it); fr-trad is the upright French school cursive (its i u t carry no loops — authentic).

## Open items (faces / panels / later phases)
1. **Grey on the Mittelband** (lin4 / doble): legible but low contrast, fainter again in greyscale (`G2-377-school-ruling-grey.png`). Needs the human mono-laser print check the design lists (en base, de-la F3, fr base + F5, nl F1, no base).
2. fr-trad ribbon letters ~15 px (capped by the 44 px ribbon); fr page leaves ~1/3 of the body blank at 3 letters (Seyès pitch, gap 0 by design).
3. `tools/validate-b6-draft.js` should also call `renderRules` (rules 4 render half + 11) — it only runs the sync `validateBank`.
4. EN bank carries the face data (8 joins, 27 words, 6 sentences) for F2-F5; faces + `cwScriptTag`/`cwCapitalBlock`/`cwJoinBlock`/`cwWordBlock`/`cwReadMatch`/`cwCopyBlock` are Phase E, as are the F2 per-pair piece counts on a real page and F4 anti-tell gates.
5. Landing side (§6): per-locale level override + de unit-aware `canonicalDeckSlug` in `gen-b6-landings.js`; retitle the alphabet-train "cursive alphabet" landing (LOCK ruling 3).
6. Panels sign per unit: script choice, isolated model letters (no lead-in stroke), ruling kind, lesson order, scriptName (the probe names in the gate are placeholders).
