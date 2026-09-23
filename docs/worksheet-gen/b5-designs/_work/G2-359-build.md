# G2-359 `word-parts`: base build record (2026-09-23)

Contract: `G2-359-word-parts.md` §2 (base page) and §5 (data and gates). Faces F1-F5 are Phase E and are not built here.

## What was built
| file | what |
|---|---|
| `scripts/worksheet-gen/primitives/word-brick.js` | NEW. `wordBrick` (roles stem / word / prefix / socket-*), `brickSocket` (dashed socket + school-lined `writingRow`), `brickJoin`, `brickEstimate` (24 + 0.60·px·glyphs), `brickWidthFor`, `geometry`. Tokens only. The dovetail is TAB 8, base 12, tip 18, R 6. All coordinates are inset by stroke/2, so the outer box is w × h. It throws on h < 36 (G2) or < 44 (G1), a body < 48, fontPx < 17, or an estimate wider than the body. `DOVE` and `COEFF` are objects so the gate can poison them. |
| `scripts/worksheet-gen/qa/verify-word-brick.js` | NEW primitive gate. Node pass: it re-parses the emitted path (box, 8 px tabs, 12/18 dovetail, 8 px notch, sockets coral "7 5", palette) and fires the 4 throws. Render pass: box and getBBox, the text of every bank literal plus 6 long de/nl/fi literals staying inside the body minus 4 px, and the joint rasterised both stroked and fills-only. It writes the colour and grey contact sheets. |
| `scripts/worksheet-gen/templates/components-b5/word-parts.js` | `wordPartBank`, `wordPartStone`, `wordPartWall`, `wordPartWallHeight`, `wordPartPackRows`. The face components are Phase E. |
| `scripts/worksheet-gen/types/g2/G2-359-prefixes-suffixes-and-root-words.js` | Base spec. It follows the §2 ladder. The composer is seeded and locale-neutral. `_buildWith` is the poison seam. `verify(page)` does in-page measurement plus a node cross-check against the signed bank. |
| `scripts/worksheet-gen/data/b5/word-parts.js` | `WORD_PARTS.en` (gitignored: force-add). It holds 8 signed families × 7-8 members (57 in all): help, play, care, use, joy, fear, act, sleep. Each family has ≤ 1 compound. There are no un-/dis-/in- members and none from any locale's compound-words bank. Root pictures (all OPENED) are joy = emotions/merry, fear = emotions/scared, act = activities/theater. The block also carries look-alikes, a prefix key (re/pre/mis, 10 rows with full crossCheck), 10 agents, F5 sentences for play and act, strings × 6 modes, and exemplar / refuse / negating. |
| `scripts/worksheet-gen/qa/verify-b5-word-parts.js` | Family gate. It exports `validateBank` (rules 1-15). Also: renders, the SPARSE check, a 400-seed tell/neutrality sweep, a 20-seed render sweep, and the poisons. |

No shared file was edited. `node i18n/build-en.js` produced 668 types, title lint clean.

## Gate output
- `node qa/verify-word-brick.js`: **PASS (1101 assertions, 3/3 poisons killed)**. Poisons PR4 (tip = base), PR1 (0.52 coefficient) and PW (svg box).
- `node qa/verify-b5-word-parts.js` (full): **PASS (1363 assertions, 24/24 poisons killed)**.
  - Data poisons: P1-P19 (P18 = two compounds, P19 = "an {gap}"). Control C1 (it `sotto`) passes. The de `fahr` control is clean with `Fähre` stemSigned.
  - Render poisons: PR5 (one picture), PR6 (answerBox stamp), PR7 (4-row bank, with the composer guard lifted), PR8 (face config refused), PS (sparse).
  - Node sweep over 400 seeds:
    - locale-neutral 400/400;
    - the strip's first brick is on the left wall 45.5 % of the time (the gated band is 35-65 %);
    - every family appears on both sides.
  - The unauthored sv locale REFUSES.
- `node tools/b3-baseline.js --check --quick`: `checked build 3680 + enum 277 in 21s: 0 drifted (0 expected), 0 missing` / **PASS**.

## Chrome and SPARSE measurements (d2)
| chrome | body | courses | largest band between blocks | slack below the walls |
|---|---|---|---|---|
| en | 766 | 76 | 14 | 62 |
| 814-type (1-line) | 811 | 76 | 14 | 107 |
| 722 (3-line de + 150-char instruction) | 700 | 75 | 14 | 0 |
| 677 (fi 4+ lines; it measured 634) | 634 | 62 | 14 | 0 |

With the long de/nl words (Fahrradfahrer, schoonmaakster) at 634, the bank is 3 rows and the page fits (lowest element = footer top, 921).

## Deviations (measured)
1. **Courses grow 60 → 76 (d2).** A fixed 60 left 146 px blank under the walls in en. The socket is a stretchable `socket-word` svg (`preserveAspectRatio="none"`, non-scaling 2.5 stroke; only the jointless word silhouette may stretch, and a stem throws). The writing row stays glyphH 28 and is centred. The walls row is capped at wallHeight(76), so page slack goes into the writing space, never into a band. Bands between blocks are ≤ 14 at every chrome.
   - d1 (3 courses, max 84) leaves 254 px below and d3 leaves 162. Neither level ships. d1 needs a d1-specific fill if it ever ships.
2. **Join overlap is 10.5 px, not 8.** The prefix (stroke 2) and stem (stroke 3) insets differ. At -8 the tip would miss the notch wall by 2.5 px. `JOIN_OVERLAP` = TAB + 1 + 1.5 makes the four dovetail points coincide. The raster gate proves zero gap and zero spill.
3. **PR1 literal.** At 0.52, `Sonnenuntergang` (169.6 px) still keeps 5.2 px a side, so the design's poison is SILENT (measured). PR1 uses `Waldwegwanderung` (198.8 px, 12.4 px/glyph).
4. **PR4 is measured on the fills.** With outlines drawn, the 2 + 3 px strokes paint over all but about 0.5 px of a straight tab's wedge. The joint check therefore also runs with strokes hidden: a gap is a ground run of ≥ 1 px. The control's 1-sample anti-alias seams are not gaps.
5. **Stem at w 60 throws** (body 41 < 48). The gate asserts the throw instead of rendering it.
6. **The bank rows guard is greedy packing** over `brickWidthFor`, not the plain sum. That is stricter. `verify` hard-caps rows at 3.
7. **The spec requires `components-b5/word-parts.js` directly** (the barrel still merges it). The synonyms family was mid-build and its file required a missing `primitives/sock.js`, which broke every barrel consumer at load time. The coordinator should check that the barrel loads once synonyms lands.
8. **F1 data not authored.** The picture-root families (sun, cloud, hand…) cannot meet ≥ 7 members / ≤ 1 compound in en: sun has only sunny, sunless and compounds. Rule 7 is implemented for `exemplar.F1` and was poisoned with P10.
9. **Rule 3** uses en endings (s/es/ed/d/ing/est/ies/ied) plus every inflected form in the locale's verb-forms bank. No singular-plural bank exists. Non-en panels supply `inflections[]`.

## PNGs for the reviewer
- Pages: `scripts/worksheet-gen/out/dev/G2-359-null-d{1,2,3}-en.png`.
- Gate: `out/dev/G2-359-gate/G2-359-gate-d2-chrome-{c722,c677,c814}.png`, `…-d2-longwords-677.png`, `…-sweep-*.png`.
- Primitive: `out/dev/G2-359-word-brick-{colour,grey}.png`. Read, including in grey: role reads by silhouette (tabs / notch / flat / dashed). The stem is darker grey with a heavier stroke.
- Pictures opened: `scratchpad/G2-359-sheet1.png`.

## Open items for faces and panels
- Faces F1-F5: components (`wordPartPicCard` … `wordPartFamilyBlock`), mode branches, and render poisons PR2 / PR3 / PR9.
- F1 needs its own picture-root families with a member-count rule: ≥ 7 is unreachable in en.
- `socket-stem` / `socket-prefix` at h 36: the dashes break up the 8 px tab, so the joint shape reads weakly. Check F2 / F3 sockets at print size, and consider a solid-dash tab segment.
- Panels author non-en blocks: families with `stemSigned` for umlaut / gradation, `inflections[]`, `negating[]`, strings × 6. The EN is a source to audit.
- The en strings avoid "word famil" (rule 13). The taxonomy en name already reads "Prefixes, Suffixes and Root Words".
