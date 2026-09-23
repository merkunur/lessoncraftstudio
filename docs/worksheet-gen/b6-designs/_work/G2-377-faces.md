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

## Fix round 1 (2026-09-23): the native panels' audit of the EN source

The lead's `exemplarByMode` change is kept. It is read in both `resolvePage` and `faceContext` (`unit || exemplarByMode[mode] || exemplar`) and validated by rule 1. The bank shape did not change, so **panels need no new keys**. After this round the base is still byte-identical (`base snapshot: 15 bodies byte-identical`). This time the snapshot also covers the new word-spacing, which only applies to nodes that contain a space; base chains never do.

1. **G2-387, partner position tell (da panel).** The da panel found three adjacent swaps: every partner stood exactly one row from its word.
   - `derangeOrder` now rejects:
     - any partner at distance 0;
     - more than ONE partner at distance 1 (`partnerDistances`);
     - a constant shift;
     - the reversal.
   - `verify()` re-derives the same rules from the page: "position tell: N partners stand one row away" and "the pictures are the words reversed".
   - Pooled over 12,000 seeds:
     - distance-1 share 12.0 %, at most 1 on every page;
     - 0 partners at distance 0, 0 shifts, 0 reversals;
     - partners below and above within 0.1 % of each other (both directions).
   - The earlier "every cell ±10 % of uniform" check is replaced. It cannot hold under the distance rule, because the cells next to the diagonal are thinned by design.
   - Checked on the **shipped instance** (production seed, unit null) of en plus every draft bank on disk:

     | locale | partner distances |
     |---|---|
     | en | 3,3,1,2,2,5 |
     | de | 5,3,1,3,2,2 |
     | es | 4,4,2,1,3,2 |
     | pt | 2,2,3,1,4,4 |
     | fr | 3,3,3,3,2,4 |
     | it | 3,4,2,2,2,5 |
     | nl | 4,4,1,2,2,5 |
     | da | 2,2,3,1,4,4 |
     | no | 2,2,3,1,4,4 |

     All pass.
   - Poison **PR20**: the adjacent-swap order is killed with "position tell: 6 partners stand one row away".
2. **One-sentence instructions, in doing order.**
   - EN G2-386 is now "Trace each grey word in one flowing line, then write it on the line below and add the dots and crosses last." The de-panel addendum applies: "without lifting your pencil" is false wherever a word starts with a non-joining capital or holds a lift letter.
   - EN G3-401 is now "Trace the grey sentence, then copy each printed sentence in cursive on the two lines below it."
   - New rule 7 checks, run on every locale block:
     - **(a) one sentence:** no end mark followed by more text.
     - **(b) G3-401 doing order:** the trace verb comes before the copy verb, using per-locale verb pairs (`ORDER_VERBS`).
     - **(c) no-lift claim:** a G2-386 instruction that claims no lift (per-locale phrase list `NO_LIFT_CLAIM`) must be true for every picture word in every unit of the locale: no capital start, and no LIFT letter before the last letter.
   - Poisons:
     - **P19**: the old two-sentence G2-386;
     - **P20**: copy before trace;
     - **P21**: de "ohne abzusetzen" over "Katze";
     - **P22**: no "uten å løfte" over "fisk".

     All are killed.
3. **Word spacing (it panel "dorme sul"; de-panel addendum on DE VA).**
   - `tools/measure-cursive-metrics.js` now measures each unit's natural closest approach across a space. It rasters each word end ("ax") and word start ("ya") separately, because Blink lays each word out alone, and takes the gap row by row. Two new keys result:
     - `wordGap`, against a lowercase start: 0.125 em (us-trad) … 0.338 em (it-moderna);
     - `wordGapCap`, against a capital start.
   - `--check` passes over all 15 units.
   - The text component adds `word-spacing = max(0, 0.35 − min(wordGap, wordGapCap)) em`, and only on a node that contains a space (F1 "M M", F2 "ol ol", F5 sentences).
   - `verify()` measures the gap on the page, row by row. Ink is assigned to a word by its connected piece, so a j's lead-in hook that reaches back past the space still counts as the next word's. Every space must leave ≥ 0.3 em.
   - Measured with the DRAFT sentences in every unit: de-va, de-la, mx, br, fr-trad, it-trad, nl, dk-uloopet and no all pass. `it-trad` "Il gatto dorme sul letto." now reads clearly spaced.
   - Poison **PR21** (the gaps squeezed) is killed with "the words in "Tom has" stand 1.0 px apart".
   - A Seyès copy page with the draft's three sentences at i = 15.12 left 82 px blank. The face column now has a 0→20 gap after the script tag and Seyès block gaps of 0→38. The base is untouched because both live in the face column only.

### Draft validator (`node tools/validate-b6-draft.js <loc>`; drafts NOT edited)
cursive-writing errors per locale. Every other error in those runs belongs to other families: story-sequencing r11, habitats 6b, sink-or-float, and pt G1-398.

| locale | cursive-writing errors |
|---|---|
| es, it, pt | 0 |
| fi, sv | 0 (type refused, no block) |
| de | 1: G3-401 "Schreibe jeden gedruckten Satz … und spure beim ersten Satz zuerst den grauen Satz nach." copies before it traces |
| fr | 1: G3-401 "Copie … ; repasse d'abord la phrase grise." copies before it traces |
| nl | 1: G3-401 "Schrijf elke gedrukte zin … over … en schrijf de grijze zin eerst na." copies before it traces |
| da | 2: G2-386 claims "uden at løfte blyanten" while dk-uloopet "fisk" lifts after f; G3-401 "Skriv hver trykt sætning af … og skriv først oven i …" copies before it traces |
| no | 2: G2-386 claims "uten å løfte blyanten" while no "fisk" lifts after f; G3-401 "Skriv av … og skriv over den grå setningen først." copies before it traces |

The es and it drafts also say "sin despegar el lápiz" and "senza staccare la matita". The rule passes them because none of their picture words starts with a capital or holds a lift letter in mx / it-trad, both of which have no lifts. The pt draft says "sem tirar o lápis", and br has no lifts either.

### Lines
- Gate: `PASS (2007 assertions, 48/48 poisons killed)`
- Distinctness: `every variation differs from the deck its base publishes and from its siblings`
- Baseline: `checked build 4000 + enum 301 in 24s: 0 drifted (0 expected), 0 missing` / `PASS`
- PNGs read: `out/dev/G2-386-null-d2-en.png` · `out/dev/G3-401-null-d2-en.png` · `out/dev/G2-387-null-d2-en.png` · `out/dev/G3-401-probe-it-trad-d2.png` (plus `out/dev/G3-401-probe-<unit>-d2.png` for every unit)

## Fix round 2 (landing audit)

Findings from `landing-audit/pass1-{en,de,es,fr,nl}.md`. I reproduced each one on a render before changing anything, using the sweep `out/b6-sweep/<loc>/…` plus my own re-renders of all six ids × 9 shipping locales.

Already done by the lead and not touched here:
- the de `{U}` title token (`unitAxis.exemplar(loc, spec)` + `lib/unit-axis.js`);
- the faces-table token resolution;
- `gen-b6-landings.js` reading the bank `levels[mode]`.

| # | finding (id) | reproduced? | fix (source) | gate (both directions) |
|---|---|---|---|---|
| 1 | G2-386 (en/de/es/fr): an orphan ruled block with no word and no picture at the foot | YES. Closing practice rows per locale: en 1, de 1, es 1, fr 2, it 1, da 2, no 1. | **Faces carry no closing practice rows**: `practiceFor` returns 0, and `faceColumn` throws if one is asked for. The slack goes into growable gaps: 10→40 between items (`GAP_MAX.faceBlock`); 0→32 from the tag to the first item (`faceTag`, which with the tag's own 8 px margin makes the 40 px band); 2→30 from row A to the writing line (`faceRow`). The base page is untouched. | verify(): **"orphan ruled row"**, i.e. any `.cw-row` outside a `.cw-block`. Poison **PR23** (the round-1 practice row re-attached after the last word) is killed. The untouched F1-F5 pages are the controls. |
| 2 | G3-401 (en/de/es/fr): "the two lines below it" is false. Sentence 1 has one free line and sentences 2-3 have two (fr: three), with an orphan band at the foot. | YES | The **model block carries three rows** (its grey model + two free), and every other sentence block carries two. This is `rowsOf(k)` in the copy face; `faceStack` accepts a per-block rows function. To keep nl at three sentences (682 → 676 px), the copy face's minimum gaps shrink: 6 between sentences (the next printed strip is the separator) and 4 from strip to row (`FACE_HEAD_GAP`). Seyès slices use the closed shape, so fr gets exactly 2 lines; the open shape's skipped line was the fr panel's "third line". No string change: the instruction is now TRUE. | verify(): **every item gets exactly the free lines its instruction names**: 1 on capitals / joins / words, 2 under every sentence on copy. A free line is a ruled row with no cursive node. Poison **PR24** (the model block with ONE free line, the round-1 shape) is killed. |
| 3 | G2-384/385/386 fr: configs say 5 / 5 / 4, but the render shows 3 + an empty Seyès block | YES. The capacity rule is right (count = min(target, what fits 677)); the empty block was the practice rows. | Seyès face slices are now **always the closed shape** (3 + 4·(rows−1) + tail interlines), with **tail 3**: the descender band plus one interline of air, never 4, because the 4th interline IS the next writing line. The open shape's skipped line cost fr one item per page. fr now ships **4 / 4 / 4** at CP 4 mm; 5 capitals or 5 pairs would need 712 px > 677. `seyesGeometry` gains an optional `tail` (2 or 3; default 2 leaves it unchanged). Only this family consumes that primitive. | `verify-school-ruling`: a tail-3 slice draws writing lines only at its baselines and is 10 i high (checked at i = 11.34 and 15.12). Poison: **tail 4 THROWS**. SPARSE holds on every real deck and on the probes at the probe chrome. |
| 4 | G2-386 fr: "ajoute … les accents" over chat / canard / train | YES. No word on the fr page carried an accent, although the bank has three (poupée, gâteau, zèbre). | New per-locale **mark-class table** (`MARK_CLASSES`) — the classes each locale's instruction can name are listed below the table. The build reads the locale's OWN G2-386 instruction from the bank and draws a word set carrying every class it names; if none is possible, it refuses. fr now draws chat / tasse / train / zèbre. | verify() re-derives the check from the PRINTED instruction ("the instruction asks for X, but no word on the page carries one"). Poison **PR25** (no word with t / x under an instruction naming crosses) is killed. Bank rule 7 flags an instruction naming a class that no picture word carries: poison **P26** (fr words without gâteau) is killed, and **CONTROL P26** (with gâteau) is clean. |
| 5 | G2-386 (fr/es): the instruction says to add dots / crosses / accents LAST, but the grey trace already prints them; "d'un seul trait" contradicts the dots | YES | The EN source is rewritten so the order applies to both the trace and the copy: **"Trace each grey word, joining the letters first and adding the dots and crosses last, then write it the same way on the line below."** (131 chars, one sentence, trace before write). "In one flowing line" is gone; it was false wherever a word carries a dot. Updated in `data/b6/cursive-writing.js`, in the G2-386 spec `i18n.en`, and as one value in `strings.en.json`. | Existing rule 7 (one sentence), the apparatus table, and the mark-class rule. The non-EN wording is in the locale list below. |
| 6 | G2-386 / G2-387 (4 panels): the duck is a yellow duckling that children name a chick | YES. I opened every duck in the library at `@2x` (`animals/`, `birds 2/`, `farm animals/`, `Things That Fly/`). **All four are the same kind of yellow duckling; no adult duck exists.** | `animals/duck` moves from `pictures` to `excludePictures` with the reason, and the EN word is removed. The `animals/duck` key is removed mechanically from all 8 locale banks and all 8 drafts. Words left: de 25, es 25, pt 26, fr 24, it 26, nl 26, da 26, no 26 (≥ 12 required). | Rule 5 already fails an excluded key. The pinned-list assertion is now 26. |
| 7 | G2-387 fr: position tell (lampe / cochon / cheval / souris all connect three rows down) | YES. The round-1 fr order was 3,5,4,0,1,2: four partners on cyclic offset +3. | `derangeOrder` now also rejects any order where **more than 2 partners share one cyclic offset** (`maxOffsetShare`, `SHIFT_SHARE_MAX = 2`). The round-1 rules still apply. | verify(): "position tell: N partners share one row offset". Poison **PR22** (the fr round-1 page) is killed. The predicate is tested both ways: **PS1** (fr order → 4) and **CONTROL PS1** (the en shipped order → 2). Pooled results and the shipped-instance check are listed below the table. |
| 8 | G2-385 nl: the title and instruction say "two letters", but row 2 is "ij", which Dutch schools teach as ONE letter | YES. The nl d2 page drew ui / ij / br / or. | `ONE_LETTER_DIGRAPHS = { nl: ['ij'] }`: the joins face **never draws** such a pair; it is filtered like a lift pair. The nl page now draws four two-letter joins. | verify(): "pair … is ONE letter in this locale's school teaching". A 300-seed build check draws "ij" on 0/300 pages, while the **CONTROL** "ei" in the same slot appears on 150/300. Bank rule 4: poison **P24** is killed and **CONTROL P24** ("ei") is clean. The nl bank now fails rule 4's ≥ 8 joins until the panel replaces ij (locale list). |
| 9 | G2-377 de: the VA "t" (model + traced ttt) looks looped with its cross near the baseline, like a script A | REPRODUCED AS DRAWN, but it is **not a font defect**. The page renders PlaywriteDEVA, and Playwrite DE VA (and DE SAS) draw the authentic VA **Aufstrich-t**: the looped t crossed within the stroke, which the VA teaches. "VA Plus" later changed it because teachers disliked it. de-la draws the plain crossed t. | **Refused**: it is a script choice, not a glyph error. → locale list: the de panel decides whether the base stays VA. | None (nothing to gate). |
| 10 | G2-377 de: joined "iii" puts three dots over an u-body and reads as "üi" beside the ü row | YES, at print size, in both de-va and de-la. | The look is inherent to joined i in every script. What makes it a defect is **i and ü on the same page**. New bank rule: letters whose chains read as each other never share a lesson (`CONFUSABLE_IN_LESSON = [i, ü]`). The de bank fails it until the panel moves ü to the lesson with ä / ö. | Rule 2. Poison **P23** (ü put back into lesson 0) is killed; **CONTROL P23** (ü beside ä) is clean. |
| 11 | G2-377 fr: the model letters (i, u, t) and the ribbon look like print, not the fr-trad cursive of the traces | REPRODUCED AS DRAWN, **not a font defect**. The model cell renders "LCS Cursive fr-trad"; it is stamped, and the fallback-width test passes. Measured: Playwrite draws every join as the PREVIOUS letter's exit stroke. So an isolated i / u / t has no attaque, and neither does the first letter of each grey chain; in FR Trad those three read as upright print. Letters that start at the baseline (l, b, e, h, f) do carry their entry loop in isolation. No font feature (calt, ss01-04, salt, init, fina …) and no invisible context character produces an entry stroke. | **Refused** in code: an entry stroke would have to be clipped out of a neighbour glyph, which breaks the one-text-node rule and the raster oracle. → locale list, because lesson 0 is the base page. | None. |
| 12 | G2-377 nl: the sheet title prints "groep 3" while the landing said groep 4 | The CONTRADICTION no longer reproduces: the lead's `gen-b6-landings.js` fix gives the landing the bank's base level, `groep-3`. The title still carries a level word; the pt / it / da titles do too, each naming its own face level. | New bank rule 7: a level word in a sheet title must name the face's OWN level (`levels[mode]`). All 9 shipping banks pass. Whether a hand-added level word belongs in a sheet title at all is an SEO / panel call (locale list). | Poison **P25** (an nl title naming groep 4 over a groep-3 face) is killed; **CONTROL P25** (groep 3) is clean. |
| 13 | G3-401 es: only sentence 1 has a cursive model | This is by design (`modelUnder:'first'`), and the instruction names ONE grey sentence ("Trace the grey sentence"). | Not a defect. | Existing PR9 and the verify() modelUnder check. |
| 14 | G2-377 es: the base shows only the five vowels | Noted only: lesson 0 of mx = a e i o u, and the title names them. | None. | Rule 9. |

**The mark classes (finding 4).** Each locale's G2-386 instruction may name only these classes:

| locale | classes |
|---|---|
| en | dots / crosses |
| de | Punkte / Striche |
| es | puntos / rayita / acentos |
| pt | pingos / cortes / acentos |
| fr | points / barres / accents |
| it | puntini / taglietti / accenti |
| nl | puntjes / streepjes |
| da | prikker / streger |
| no | prikker / tverrstreker |

**The partner-order checks (finding 7).**
- Pooled over 12,000 seeds:
  - 0 pages with more than 2 partners on one offset;
  - 0 partners at distance 0, and at most 1 at distance 1 on every page;
  - 0 shifts and 0 reversals;
  - partners below and above are 0.5 % apart.
- **Shipped instance, every locale** (en + 8 drafts): at most 2 partners on one offset. fr is now 5,3,4,1,2,0, which gives offsets 1,4,4,2,2,5.

Also observed but not changed, because no panel raised it and it was the lead's round-1 ruling: the **fr BASE page** still ends in 2 closing practice Seyès rows. That is the same orphan class removed from the faces here.

**Unrelated to this family:** `tools/b3-baseline.js --check` reports 22 drifts, **all G1-204 sink-float**. They come from the sink-or-float family's water-tank primitive work. This family causes 0 drift.

### Locale strings to re-author
- **de G2-386 instruction:** follow the new EN order. Trace each grey word by joining the letters first and adding the Punkte / Striche last, then write it the same way on the line below. It must still name "grau".
- **es / pt / fr / it / nl / da / no G2-386 instruction:** the same restructure. Trace joining the letters first and add the marks last, then write the word the same way on the line below.
  - Keep naming ONLY mark classes the bank's words carry. fr's points / barres / accents are all carried now; nl / da / no name no accents.
  - **fr: drop "d'un seul trait"**, which is false over any word with a dot.
- **de lessons (de-va AND de-la):** move **ü** out of lesson 0, for example into the lesson with ä / ö. The **de G2-377 title** must then name the new lesson 0, e.g. "… i, u und t in {U}" if lesson 0 becomes i u t; rule 9 enforces the match.
- **de G2-377:** the panel must sign off the VA Aufstrich-t on the base. It is a legitimate VA form, though criticised enough that VA Plus changed it. The alternative is `exemplarByMode.base = de-la`, which draws the plain crossed t.
- **fr lessons / G2-377:** in fr-trad, i, u and t render with no attaque in isolation, in the margin model and in the ribbon. The panel decides:
  - keep i u t, the classic CP order; or
  - open lesson 0 with letters whose isolated form carries its entry loop (l, e, b …), and change the title to match.
- **fr levels:** every fr face is levelled `cp`. That forces Seyès 4 mm and caps F1 / F2 / F3 at 4 items; at `ce1` (3 mm, the G2 band) the design's counts fit. This is a panel call.
- **nl joins:** replace **ij** with another two-letter join; rule 4 needs ≥ 8 per unit. The build already skips ij, but the bank gate fails until it is replaced.
- **nl G2-385 title / instruction:** "twee letters" is now true on the page. No change is needed once ij is replaced.
- **nl G2-377 title:** "groep 3" matches the base level `groep-3`, so the gate passes. Drop the level word only if the Germanic SEO record ("never hand-add the level word") is to be applied; the pt / it / da titles carry level words the same way.
- **all locales, words:** `animals/duck` was removed mechanically as an excluded picture. No word needs re-authoring, since every bank keeps ≥ 24 words. A panel may add one opened replacement picture key with `picOpened:true`.

### Lines
- Gate `node qa/verify-b6-cursive-writing.js` (full): `PASS (2034 assertions, 58/58 poisons killed)`.
- `node qa/verify-school-ruling.js --no-png`: `140 cases, 1146 assertions, 0 failure(s)`. Poisons: us3 x-line, Seyès line, unknown unit, Seyès tail 4.
- `node tools/gate-variation-distinct.js --batch=b6`: `compared 75 pairs over 25 faces … every variation differs from the deck its base publishes and from its siblings`.
- `node tools/b3-baseline.js --check`: `checked build 33000 + enum 321: 22 drifted (0 expected)`, all of them G1-204 (not this family).
- `node tools/validate-b6-draft.js <loc>`: the only cursive-writing errors are de (rule 2, i + ü, both units) and nl (rule 4, ij). Both are on the list above.
- Renders read at print size:
  - after the fix: G2-386 en / fr / no, G3-401 en / fr, G2-384 fr;
  - before the fix: G2-385 nl (showing ij) and G2-387 fr (showing the +3 tell).
- All 6 ids × 9 locales re-rendered with the real strings: verify + lints clean on 54 / 54.
