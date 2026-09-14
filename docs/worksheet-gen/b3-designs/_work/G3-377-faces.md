# G3-377 `division-with-remainder` : the FIVE variation faces (Phase 2, 2026-09-14)

Built from `G3-377-division-with-remainder.md` §3 + §5 under `_FACE-BRIEF.md`, on the base of `_work/G3-377-build.md` (its seams: `_buildWith`, `divisionLine({lines:1, shown, ghost})`, `casitaFrame({shown, ghost})`, `dealBoxes`). Ids from `_records/b3var-id-allocation.json`. Nothing shared was edited (`git status --short -- scripts/worksheet-gen | grep -i division` = this family's 3 modified files + the 6 new ones; every other modified file in the tree belongs to a sibling builder); nothing was committed. (m) = measured in the real pipeline this session. Every division sign on every face is `divGlyph(locale)` from `types/_shared/notation.js` (read-only; never a literal).

## Files

| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/division-with-remainder.js` | NEW: the five rows (`HANDWRITTEN: []`); the four themeless rows carry `extra {themeAxis:{applicable:false}}` |
| `types/g3/G3-380-division-with-remainder-share-it-out.js` · `G3-381-…-practice-rows.js` · `G3-382-…-exact-or-not.js` · `G3-383-…-find-the-error.js` · `G3-384-…-hop-back-on-the-number-line.js` | emitted by `node tools/gen-b3var-specs.js` (93 rows + 7 handwritten across 20/20 families) |
| `types/g3/G3-377-division-with-remainder.js` | the additive `mode` knob: `_buildWith` dispatches to `buildFace()` BEFORE the base path (a config without `mode` is byte-identical — baseline PASS); `verify(page)` reads `data-lcs-mode` (stamped only by a face) and runs `verifyFaceInPage` (all five branches, own q/r derivation), else the untouched base evaluate. `_buildWith(bank, cfg, {theme, locale, unit, items}, ctx)`: `items` is the gate's injection seam (a face DRAWS injected items; verify enforces the rules). `pickExact`, `pageRulesOk` (adds `maxPerD`), `composeItems` (exact shuffle / error kinds / line lineEnd + hop rule) |
| `templates/components-b3/division-with-remainder.js` | `divisionLine`: a ghost token is now an UNSTAMPED invisible width-holder (no `data-lcs-num / -op / -word`) so a face's verify counts the SHOWN line's numerals only; `data-lcs-ghost="1"` on the zone; `casitaH` param. `casitaFrame`: `h` defaults 80 when `shown`, 88 open; `ghost` draws ONLY the two open boxes at y 4 (frame h 44) at the shown frame's x; a shown pair is a `<g data-lcs-shown-q|r>` wrapping rect + numeral (textContent === the numeral; found by the gate on the es casita). Base output byte-identical (inline + casita sha1 vs HEAD, and the baseline) |
| `qa/verify-b3-division-with-remainder.js` | section E (faces) + 85 face poisons; the 5 base-deferred poisons (P5 P6a P6b P7a P7b P10 P13-F2) are COUNTED; `OP_SPAN` hoisted to module scope |
| `data/b3/division-with-remainder.js` | untouched — the base already shipped `strings.F1..F5`; every row's EN title + instruction equals them verbatim (the gate asserts one source) |

## The five faces

| face | id | kind | knob / override (on `{...base.difficulty[2]}`, so `divisors:'unit'` rides along) | what the child does |
|---|---|---|---|---|
| F1 | **G3-380** | CODE | `mode:'share'` + `{cards:4, nMin:7, nMax:20, minR:1, iconPx:36, perRow:10, gapX:4, gapY:4, inset:20, colGap:8, slotH:44, leftoverW:64, minDistinctD:3, minQ2Cards:3, rVaries, distinctN}` — THEMED | 1 × 4 cards. Left column (396 wide): a 2-row strip of n pictures (36 px, gap 4, left-aligned like a pile) over `dealBoxes` — d white homes (slotW = floor((396 − 64 − 10 − (d−1)·10)/d): 156 / 102 / 73 / 56 for d 2..5) + one dashed coral leftover home (64 × 44) carrying the bank's `leftoverLabel` ("left over" wraps to two 14-px lines, m: scroll 60/60 × 40/40). Right: `divisionLine({lines:2})` in a 217-px zone (647 − 20 − 396 − 14). The child tallies one picture per home in turn, the loose ones into the leftover home, writes q (each home) and r. Column 128 ≤ 130.75 (DEEP). |
| F2 | **G3-381** | CODE | `mode:'practice'` + `{cards:10, nMin:7, nMax:null, qMax:10, minR:1, maxPerD:3, minDistinctD:3, minQ2Cards:0, rVaries, distinctN}`; themeless | 2 × 5 cards (inner 302 × 105; 96 under DEEP), one `divisionLine({lines:1})` each (inline 40 / casita 88). `nMax:null` resolves to qMax·d + d − 1 over the unit's largest d (54 on 2-5, 98 on 6-9 / 2-9) — "inside the tables". Every row leaves a remainder; each d at most 3 times; (n, d) and n distinct. |
| F3 | **G3-382** | CODE | `mode:'exact'` + `{cards:8, exact:4, nMin:6, nMax:null, qMax:10, minR:0, maxPerD:3, minDistinctD:3, distinctN, pillPx:20, pillPxMin:18, pillLh:1.1, rowGap:6, casitaH:84}`; themeless | 2 × 4 cards: a line (r = 0 allowed) over `pillChoice` [exactWord, restWord] (fixed order, glyph-free, 38 px tall at 20 px, m). Four exact items shuffled so they are never all first / all last; `data-lcs-exact` per item. The child circles a pill and writes q and r (0 when exact). Casita 84 + 6 + 38 = 128 ≤ 130.75 (DEEP, m: renders `G3-382-d2-{es,pt}-synth-deep`). |
| F4 | **G3-383** | CODE | `mode:'error'` + `{cards:8, kinds:{rBig:6, sum:2}, clean:0, nMin:7, nMax:null, qMax:10, minR:1, maxPerD:3, minDistinctD:3, distinctN, rowGap:4}`; themeless | 2 × 4 cards: row 1 `divisionLine({shown:{q:sQ, r:sR}})` — the wrong pair in coral in solid 44 × 30 grid boxes (`data-lcs-shown-q/-r`); row 2 `divisionLine({ghost:true})` — two open boxes exactly under them (Δx ≤ 1 px asserted). rBig = (q − 1, r + d) ("the remainder is too big", q ≥ 2 required); sum = (q, r ± 1..2 within 1..d−1) (needs d ≥ 3, the composer assigns it to such items). Kind order shuffled per seed (6 layouts over 6 seeds). The child crosses out and writes the right pair. Casita 80 + 4 + 44 = 128 ≤ 130.75. |
| F5 | **G3-384** | CODE | `mode:'line'` + `{cards:3, nMin:10, nMax:30, minR:1, lineMax:35, lineW:560, hopMin:36, hopAir:20, rowGap:8, minDistinctD:2, minQ2Cards:2, rVaries, distinctN}`; themeless | 1 × 3 cards: `numberLine({min:0, max:lineEnd, tickStep:1, labelEvery:5, width:560, marks:[n]})` (612 × 70, m) under a 20-px air lane (the hops are DRAWN; `[data-lcs-hop]` = 0), over `divisionLine({lines:1})`. lineEnd = the smallest multiple of 5 ≥ n + d ≤ 35; composer rule d · 560 / lineEnd ≥ 36 (at d = 2 this bounds n ≤ 28; the shipped page: 4 on 0..20 = 112 px, 3 on 0..25 = 67 px). q ≥ 2 on ≥ 2 of 3 cards (a one-hop card teaches little); landings take ≥ 2 values. 20 + 70 + 8 + 88 = 186 ≤ 188.3 (DEEP casita, m: `G3-384-d2-pt-synth-deep`). |

## Renders (looked at, every one; lints + verify clean)

`scripts/worksheet-gen/out/dev/`:
- **`G3-380-animals-d2-en.png`** — 11 swans / 4 homes + "left over", 14 tigers / 3, 15 leopards / 2, 19 whales / 3; strips left-aligned, homes clear of the badge (inset 20), zone `11 ÷ 4 =` over `[ ] R[ ]`; nothing under the footer. Pictures opened: swan, tiger, leopard, whale (animals) + pomegranate, lemon, blueberry, **cranberry** (fruits, `G3-380-d2-en-fruits`) — every one what its name says except that the `cranberry` picture reads as a CHERRY to me (red, round, green leaf); flagged for the wave's per-theme picture audit, not this build's. sv synth (`G3-380-d2-sv-synth`): `14/3 =` `[ ] rest [ ]`, leftover home "rest" — the slash, no ÷.
- **`G3-381-null-d2-en.png`** — 28÷5 · 9÷2 · 25÷3 · 39÷4 · 22÷3 · 19÷2 · 11÷2 · 37÷5 · 29÷3 · 53÷5 (q = 10 = qMax, inside the tables); d counts 5:3 2:3 3:3 4:1.
- **`G3-382-null-d2-en.png`** — 12÷2 E · 50÷5 E · 31÷4 · 21÷2 · 20÷4 E · 18÷3 E · 32÷3 · 23÷4; pills "exact" / "remainder" on one line, 38 px. es casita under the DEEP chrome (`g3377-gate/G3-382-d2-es-synth-deep.png`): the galera (dividend left, divisor right, boxes under each) + "exacta" / "con residuo" pills, the row at the card's inner bottom, footer clear.
- **`G3-383-null-d2-en.png`** — 19÷3 = 5 R4 (rBig; true 6 R1) · 7÷5 = 1 R3 (sum; 8 ≠ 7) · 30÷4 = 6 R6 · 18÷5 = 2 R8 · 9÷2 = 3 R3 · 15÷2 = 6 R3 · 26÷3 = 8 R1 (sum) · 33÷4 = 7 R5; coral numerals in grey solid boxes, the open boxes exactly beneath. es casita DEEP (`G3-383-d2-es-synth-deep.png`): the shown chave (h 80) with the wrong pair and the two ghost boxes under it, 8 cards, fits.
- **`G3-384-null-d2-en.png`** — 0..20 mark 15 (`15 ÷ 4`), 0..25 mark 22 (`22 ÷ 3`), 0..15 mark 10 (`10 ÷ 3`); labels 0/5/10/…, no hop printed, a visible lane above each line. pt casita DEEP: the chave under the line, fits.
- gate renders under `out/dev/g3377-gate/`: per face `<id>-d2-en`, `-u6-9` / `-u2-9` (not F1), `-longchrome` (733), `-worstchrome` (710), `-deepchrome` (677), `-seedN`, `-d2-{de,sv,fr,fi,nl,it,es,pt,da,no}-synth` (+ `-synth-deep` for es / pt / fr), `<id>-control`, `<id>-poison-*`.

## Deviations from §3 (each measured)

1. **F1 REFUSES the `6-9` and `2-9` units** (§3: "every face takes divisors from the unit"). The deal row is the strip's width (396); at the 36-px home floor with 10-px gaps and the 64-px leftover home it holds at most **7** homes ((396 − 64 − 10 − 60)/7 = 37.4; 8 → 31.5 < 36; measured by the gate's first run: `dealBoxes: slotW 26 < 36` on 6-9, 31 on 2-9). Widening the row into the notation zone does not rescue it (627 − 14 − 176 = 437 → 9 homes need 478). The build refuses any unit carrying a divisor above `maxHomes` with the reason in the message; the gate asserts both refusals. F1 fans over the exemplar only (the design's own d3 for F1 stops at 6). **A hub-expectation note, not a per-locale refusal:** one F1 landing per locale as before; a future unit fan counts F1 once.
2. **`nMin` 7 (practice / error) and 6 (exact), not the design's implicit "any"** — my first rows set 5, and the base's config-sanity guard (`nMin < min(divisors) + 1` → refuse) fired on the `6-9` unit. 7 = the base's own d2 floor; exact takes 6 (the smallest exact item on 6-9 is 6 = 1·6).
3. **F3 pill = 38 px, not the design's est. 42:** `.ws-pill` has no line-height, so Baloo 2 "normal" (~1.6) renders a **48**-px pill at 20 px (m) — a casita line + pills would be 84 + 6 + 48 = 138 > 130.75 under the DEEP chrome. `pillChoice` is reused as designed, its output string-edited to pin `line-height:1.1` (needle asserted, as the base did with `iconRows`); the open casita is drawn at `casitaH:84` (the boxes end at 84; the frame refuses h < 84). Stack 128 ≤ 130.75.
4. **F3 pill size steps down 20 → 18 before refusing** (the design names one `fontPx:20`): the build estimates the pill row (0.55 em/char, measured en 0.49-0.52) and drops 2 px while it exceeds the 302-px card, refusing below `pillPxMin` 18. It "esatta" / "con il resto" (18 chars) estimates 316 at 20 → ships at 18 (296). `data-lcs-pillpx` / `-pillpxmin` stamped; verify asserts the font === the stamp and ≥ the floor; the gate renders every synthetic locale's pills on ONE line inside the card.
5. **F4 row gap 4 (design 8) and the shown casita at h 80, ghost at 44:** 80 + 4 + 44 = 128 in the DEEP inner 130.75 (with the design's 8 → 132, over). Inline 40 + 4 + 40 = 84.
6. **F4's printed WRONG pair is the one text allowed to equal q or r.** The `sum` kind keeps the true quotient printed by construction (shown r < d forces sQ = q), so the base's "no text node equals q or r" rule is scoped: text inside `[data-lcs-shown-q|r]` is exempt, everything else (the ghost line, the numerals, a stray span) still fires — poisons "the true quotient printed in the ghost line" and "the shown pair rewritten to the true pair" prove both edges.
7. **F5 tick labels are exempt from the q / r text rule** (every multiple of 5 is labelled whatever q and r are; seed 2's `q = 5` met the "5" label). `[data-lcs-ticklabel]` text is skipped on the line face only — a "5" printed anywhere else still fails.
8. **F5 `minQ2Cards:2`** (design: none) — the unit 6-9 render produced `11 ÷ 9` (one hop, then stop); q ≥ 2 on at least two of the three cards keeps the page a hop exercise.
9. **F5 has a 20-px air lane** (`hopAir`) above the line: `numberLine` with marks only leaves 14 px above the baseline, no room to draw an arc; the wrapper's padding-top is asserted (≥ 20) and a poison removes it. Under the DEEP chrome the casita stack is 186 ≤ 188.3.
10. **F1's strip sits in a row-flex wrapper inside the column** — `pileHtml`'s `flex:0 0 396px` is a WIDTH basis in the base's row card but became a 396-px HEIGHT in my column (the first render pushed the homes 110 px under the footer; caught by the lints). Recorded because the base's helper is reused verbatim.
11. **The `cards` key names the item count on every face** (the design writes `items:10` for F2 etc.) — `cards` is what the base stamps and `pickPage` reads; one key, one stamp.
12. **Ghost tokens are unstamped** (design: "renders every non-box token visibility:hidden"): the hidden numerals kept `data-lcs-num`, so the F4 numeral count read 4. A ghost token is now a bare invisible width-holder in the same font (widths identical, m: Δx ≤ 1 px between the shown and open boxes on every render).

## Per-locale refusals visible from the bank shape (Phase 4 lowers `hub-expectations.json` explicitly)

- **None certain from the bank shape** — every face is numerals + one operator glyph + one remainder word, and F1 / F3 refuse only where the panel leaves `leftoverLabel` or `exactWord + restWord` unauthored (the validator NOTES it). The design's expectation of 6 × 11 = 66 rows stands **conditionally on three per-locale word lengths**, each of which is a REFUSAL at build (never a squeeze) and a lowered expectation if the panel cannot author around it:
  - **F1 leftover label:** a single word longer than ~7 chars (7.4 px/char at Nunito 800 14 in a 52-px home) refuses F1 in that locale ("Restmenge" 9 → refused, proven). The §4 pins fit: de "Rest", nl/sv/da/no "rest", fi "jää yli" (2 words), it "resto", es "sobran", pt "sobra", fr "reste".
  - **F3 pills:** the two words together must fit 302 px at ≥ 18 px (~17 chars at 20, ~19 at 18). The §4 pins all fit (sv "går jämnt ut" + "rest" = 16 → 20 px, 294 est.; it → 18 px). A panel choosing "die Division geht auf" + "es bleibt ein Rest" would refuse F3 in de.
  - **F1 casita locales (es / pt):** the zone is 217 (> 200) so the full 200-px casita draws; pt `resto` fits it (the base's d1-only refusal does not apply — F1 ships d2 only).
- **F1 on a unit above `2-5`** refuses in EVERY locale (deviation 1) — a unit-fan note, not a locale one.
- Non-EN blocks are absent until the panels author them (`bank()` refuses, never an en fallback) — Phase 4, not a lowered expectation. The synthetic blocks the gate renders (10 locales) are the design's §1/§4 pins, not data.

## Open items for the panels / Phase 4

1. The panels author `strings.F1..F5` ×10 and audit the EN as a SOURCE; the F-key → id map is F1 G3-380 · F2 G3-381 · F3 G3-382 · F4 G3-383 · F5 G3-384 (the apply tool writes `i18n/strings.<loc>.json` per id).
2. **pt `remWord`** (base open item 1) is unchanged: `''` or `r.`; `resto` fits every FACE zone (all ≥ 200) but not the base's d1 casita.
3. **da copy must not reuse "del ligeligt"** (the shipped da stories' phrase) for F1 — §3's boundary; a validator rule for the da block is the panel's to add.
4. `validate-b3-draft.js` (absent) should import `validateBank`; it could also carry the two length rules above (leftover word ≤ 7 chars; pill pair ≤ ~19 chars) so a panel sees the refusal at draft time, not at build.
5. Hub registration (§7): `apps['division-with-remainder']`, `axes['exercise-type'][…]` slug/name ×11, `scripts/verify-hub-type-rows.js` — the batch's registration step. Expectation: 6 rows per locale (66) unless a panel's words trip an F1 / F3 refusal (then lowered explicitly).
6. F1 on the 6-9 / 2-9 units is refused (deviation 1); if the wave ever fans F1 over units, the design needs a two-row deal layout (not built).
7. The `cranberry` fruit picture reads as a cherry — for the wave's per-theme picture audit.
8. F4 d3's yes/no pills (`rightWord` / `wrongWord`, `clean:1`) are config-expressible (`clean`, kinds) but the pill row is not built — d2 only ships; the verify already counts `clean` items.

## Gate output

Quick (`node qa/verify-b3-division-with-remainder.js --quick`, 6 seeds; the base's A / C / D + section E: each face at d2 on the exemplar + the other units (not F1) + fruits (F1) + LONG / WORST / DEEP chrome + sweep + ten synthetic locales (+ es / pt / fr under DEEP), refusals, then 127 poisons):
```
PASS (12569 assertions, 127/127 poisons killed)
```
Per face: G3-380 18 renders / 10 refusals / 20 poisons · G3-381 19 / 5 / 13 · G3-382 19 / 8 / 17 · G3-383 19 / 6 / 18 · G3-384 19 / 7 / 17 (+ the base's 42 poisons = 127). Every sv / da / no synthetic render of every face passed the sign audit (root stamp === notation.js, every printed sign === it, no ÷ in the body text); the "sv `/` rewritten to `÷`" poison is killed on each of the five faces. The base-deferred five are counted: P5 (`data-lcs-exact="1"` on a remainder item) · P6a (shown pair = true pair) · P6b (rBig with shown r < d) · P7a (a printed hop) · P7b (the line at 130 px → a 23.8-px hop; my first poison shrank it to 260 px, where the widest hop on the page is still 47.6 px — a wrong poison, corrected, not a loosened gate) · P10 (a home holding a picture) · P13-F2 (`49 ÷ 2`, q > qMax). The first run also caught: F1 6-9 / 2-9 (deviation 1), nMin 5 (deviation 2), the casita shown text (component fix), the tick-label "5" (deviation 7) and two gate bugs of mine (the control rendered without its mode; the shown font measured on the `<g>`).

Full (20 seeds, `node qa/verify-b3-division-with-remainder.js`):
```
PASS (20801 assertions, 127/127 poisons killed)
```
(sweep: base d1-d3 20/20 distinct; G3-380 20/20 · G3-381 20/20 · G3-382 20/20 pages, 17 exact layouts · G3-383 20/20 pages, 15 kind layouts · G3-384 20/20.)

Distinctness (`node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=division-with-remainder`):
```
[b3:division-with-remainder] compared 15 pairs over 5 faces against their bases + pairwise within family
every variation differs from the deck its base publishes and from its siblings
```
The design's distinctness poison (F2 emitted with `mode` and every override removed) was run by hand: `G3-381 resolves to the SAME config as its base G3-377 at d2` → exit 1; the rows were untouched, G3-381 re-emitted byte-identically.

Baseline (`node tools/b3-baseline.js --check --quick`, after every edit incl. the component file):
```
checked build 3392 + enum 211 in 17s: 0 drifted (0 expected), 0 missing
PASS
```
`node i18n/build-en.js` → `build-en: 598 types … (title lint clean)`; `i18n/strings.en.json` restored with `git checkout --`.
