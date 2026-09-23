# G2-377 `cursive-writing` — Phase E faces record (2026-09-23)

Contract: `G2-377-cursive-writing.md` §3, `_FACE-BRIEF.md`. All five are **CODE faces** on the ONE additive knob `mode`. `_buildWith` sends a face mode to `buildFace` BEFORE the base path, so mode `'base'` is untouched. Rows: `scripts/worksheet-gen/tools/b6var-rows/cursive-writing.js`, emitted by `node tools/gen-b6var-specs.js`. I only created my own rows module; the emitter itself was not edited. EN strings are `data/b6/cursive-writing.js CURSIVE_WRITING.en.strings[<id>]`, and the gate asserts they equal each spec's i18n.en. Nothing is committed.

**Base byte-identity proof.** Before any face code, I snapshotted the base `bodyHtml` with SHA-1: en d1/d2/d3, plus de-va / fr-trad / no / mx probe pages at d1-d3, 15 bodies in total (scratch `G2-377-base-snap.json`). After all face work: `base snapshot: 15 bodies byte-identical`. The snapshot was taken after the SPARSE fix (lead review), which intentionally changed the base.

Shared machinery every face uses (components in `templates/components-b6/cursive-writing.js`):
- A **script tag** (32 px) replaces the ribbon.
- The same copybook rows are used, cap-row geometry wherever a capital prints.
- The item count is `min(target, capacity at 677)`, and a count under the face's floor THROWS.
- Closing practice rows of the same ruling fill up to the 677 budget.
- The growable face block: its inner strip→row and row→row gaps stretch, each one capped.
- SPARSE and FILL are enforced in `verify()`.
- The raster checks cover every cursive node on every face: ink on its baseline, ink inside its row, and pieces equal to the canvas oracle. The join rule is general: a node's pieces must be ≤ Σ(pieces of its letters) − (joins between consecutive lowercase letters, with no LIFT after the first letter).
- The instruction may name only apparatus that is on the page; the gate checks this against a table of phrases and the elements each one needs, and PR19 poisons it.

| face | id · kind | knob (row override) | what the child does | owned gate assertions / poisons | PNG (d2 en) |
|---|---|---|---|---|---|
| F1 Cursive Capitals with Names | G2-384 · CODE | `{mode:'capitals', capitals:5, source:'names'}` | For each capital: the ink capital in a 92 px cell, then grey `M M` and the grey name `Mia` to trace, then an empty line to write on. The capitals are the distinct initials of `SENTENCES.<loc>.names` in bank order (en M B E L A, 5 fit at X 15). | capitals distinct and in initials order; the name starts with its capital and is a bank name; model == capital; grey pair == `C C`. PR14 (a name that does not start with its capital), PR18 (practice removed → SPARSE). Also rendered in **every unit** through the probe blocks. | `out/dev/G2-384-null-d2-en.png` |
| F2 Letter Connections | G2-385 · CODE | `{mode:'joins', pairs:5}` | For each pair: the ink pair in a 96 px cell, then grey `ol ol` and the grey word `doll`, then an empty line. The pairs are a seeded sample of the unit's joins (bank order kept on the page), and a pair that starts with a LIFT letter is filtered out. | the pair ∈ the bank with its word; word ⊃ pair; pairs distinct; no base chain; no lift start; model/grey texts. PR15 (a pair not in its word). The raster join rule enforces "ONE ink piece per join" on the real page. | `out/dev/G2-385-null-d2-en.png` |
| F3 Cursive Words with Pictures | G2-386 · CODE | `{mode:'words', words:4, maxLetters:8}` | Each row pairs a picture tile (72, icon 64, left of the rule at 84) with an ink model word and a grey word to trace, then an empty line. The seeded selection requires ≥ 2 words with a dot / cross letter and ≥ 1 word with a join pair. | tile key == word key; word == the bank literal; picture ∈ the opened pins, not excluded; tile ≥ 72 with no text on it; ≥ 2 dotted words; ≥ 1 join word. PR16 (tile ≠ word), P18 (a 9+ letter word), refusal (no admissible set). | `out/dev/G2-386-null-d2-en.png` |
| F4 Reading Cursive | G2-387 · CODE | `{mode:'read', pairs:6}` | Read six ink cursive words on white cards and draw a line to each cream picture tile (coral dots). The cards and tiles grow together, from 76 up to 120 px. | bijection; no word faces its own picture; no constant shift, cyclic or plain; ≥ 2 same-initial pairs with ≥ 1 of them within one letter of length; literals; cards ≥ 76; pictures ≥ 72 with no text. **Pooled:** 12,000 seeds, every (word row, picture row) cell within ±10 % of uniform (worst 3.8 %), 0 fixed points, 0 constant shifts. PR6 (pictures = words rotated by one), PR7 (six different initials), PR19 (an instruction naming grey traces the page does not have). | `out/dev/G2-387-null-d2-en.png` |
| F5 Copy a Sentence in Cursive | G3-401 · CODE (`gradeBand:'G3'`) | `{mode:'copy', sentences:3, modelUnder:'first'}` | For each sentence: a printed Nunito strip (tealSoft, 36 px) and two ruled rows (cap-row). Only sentence 1 carries its grey cursive model; the child copies each sentence twice. | printed == model == a bank literal; 4-6 words, a capital, one full stop; the model exists only where `modelUnder` says; the model stays inside its row. PR9 (the grey model under all three), PR17 (model ≠ printed). | `out/dev/G3-401-null-d2-en.png` |

## Renders (all read by me)
- **F1:** 5 capitals (M B E L A). Grey `M M` / `Mia` sit on the us3 lines. Calm. The capitals do not join each other, so a single space reads correctly.
- **F2:** ol, on, br, wa, ch, each followed by its word. Joins are unbroken.
- **F3:** chair / duck / robot / horse. Every picture reads instantly. The ink model and grey trace are side by side, and one practice line sits at the bottom.
- **F4:** cake, cup, zebra, train, cloud, kite against a deranged picture column. The same-initial words (cake / cup / cloud) and the similar lengths mean first letters cannot solve it.
- **F5:** three strips, a grey model under the first only, and a closing practice line.
- **Other units:** F1 also renders in de-va, de-la, mx, br, fr-trad (Seyès), it-trad, nl, dk-uloopet and no (`out/dev/G2-384-probe-<unit>-d2.png`); I read de-va and fr-trad. Nothing is under the footer and nothing is clipped. Floors hold: text ≥ 13, rows ≥ 36, pictures ≥ 72, X ≥ the level floor.
- **Chromes:** every face passes at 814 / 722 / 677. The FILL at 814 is 95.8-100 %, and the worst tail is 34 px (F5).

## Deviations from §3 (measured)
1. **Titles** are shortened from the §6 candidates for the sheet: "…for 3rd Grade" is dropped because the deck title engine appends the level; G2-384 is "Cursive Capital Letters: Write the Names", G2-385 is "Cursive Connecting Letters: Joining Two Letters". Band-unique: I loaded all 743 specs and found 0 duplicate titles; `build-en` lint is clean (not written).
2. **The grey capital pair** is `M M` with ONE space. The design writes `A  A`; HTML collapses a double space, and an en-space glyph risks a fallback.
3. **F4 is not built on `derange` from components-b4.** Its rotation guard is not the rule here: it excludes the reverse order and allows constant shifts. `derangeOrder` rejects fixed points and constant shifts only, which keeps the partner distribution uniform (5 rotations remove exactly one permutation per cell).
4. **F4 card rows grow** (76 → 120 px, flex, capped) so the page fills at 814. The words stay at X 18, and the icons stay at 72.
5. **Inner block gaps grow** (strip→row 6→16, row→row 2→20) so a 3-sentence F5 page fills. The stack stays computed at the minimums.
6. **Fallback-width tolerance:** each space in a node buys 0.1 em. Measured: nl `J J` is 90.1 px in layout and 93.7 px on canvas, while `JJ`, `M M` and `A A` agree to 0.01 px. The kern around a space differs between canvas and layout. Nothing else is loosened.
7. **F4's instruction names no grey** (it has no traces). Rule 7's "names the GREY colour" is skipped for the reading face id only (`READ_IDS`).

## Per-locale refusals visible from the bank shape (lower `hub-expectations.json` in Phase 4)
- **sv, fi:** whole type refused, 0 rows (unchanged).
- **es, it F1:** CONDITIONAL on the panel confirming that cursive capitals are taught. The spec honours `bankLoc.refusedFaces.capitals` (THROWS, gated), so a panel refusal is data.
- **no / da F2:** only pairs NOT starting with f g j y z / f g j q y are offered. A panel whose joins are mostly lift pairs gets fewer than 3 → THROW. Needs ≥ 3 joinable pairs; the design asks for ≥ 8.
- **F3 (any locale):** needs ≥ 2 words with the locale's dot / cross / accent letters AND ≥ 1 word containing one of its join pairs, ≤ 8 letters. Otherwise it THROWS. de uses cap-row geometry automatically (nouns keep the capital).
- **F4 (any locale):** needs 6 words with ≥ 2 same-initial pairs (one of them within a letter of length). Otherwise it THROWS, so the panel must author a words map with initial clashes.
- **F5:** a sentence wider than the row (estimate 0.62 em per char) is skipped; fewer than 2 fitting → THROW.
- **fr (Seyès):** all ruled faces use Seyès slices. F1 was rendered at the probe's CP interline (3 capitals fit); at CE1's 3 mm the design's 4 will fit.

## Open items for the panels
- F1's capitals come from `SENTENCES.<loc>.names`, not a new list. de VA/LA and nl/no capital pairs (`J J`) show kern-level spacing; the panels sign the isolated capital forms.
- F3/F4 pictures: v1 pins the 27 opened keys. A panel adds more only with `picOpened:true`.
- Grey traces on the tinted Mittelband (lin4/doble) still need the mono-laser print check (base open item 1).

## Lines
- Gate: `PASS (1982 assertions, 42/42 poisons killed)` (`node qa/verify-b6-cursive-writing.js`, full)
- Distinctness: `[b6:cursive-writing] compared 15 pairs over 5 faces against their bases + pairwise within family` / `every variation differs from the deck its base publishes and from its siblings`
- Baseline: `checked build 4000 + enum 299 in 25s: 0 drifted (0 expected), 0 missing` / `PASS`
- Base: `base snapshot: 15 bodies byte-identical`
