# G2-358 `synonyms`: base build record (2026-09-23)

> **Note for the Phase E face builder: the sock is retired. F2 uses the half-ring tags.**

## Lead ruling, 2026-09-23: the sock is retired
- The lead read `G2-358-sock-sheet-grey.png` and ruled that the sock reads as a luggage tag, not a sock.
- Under the final design's own fallback, **F2 uses design A's half-ring tags** (`synLinkTag`). No hub row is lost.
- Removed:
  - `primitives/sock.js` and `qa/verify-b5-sock.js`, plus their sheets.
  - The `synSock` component and its sock import.
  - Gate step 0 (the sock gate) and PR3/PR4, which were run inside the sock gate. They are now void.
- The F2 instruction rule now requires "line" plus "link"/"ring".
- The en `strings.pairs.instruction` is now "Draw a line to link each word on the left with the word on the right that means the same."
- The base render is unchanged (d2 is verify-clean and lint-clean).
- Rerun after the removal:
  - family gate: **PASS (640 assertions, 20/20 poisons killed)**
  - build-en: title lint clean
  - b3-baseline `--quick`: **PASS**, 0 drifted
- The sock sections below are **history** and are superseded by this ruling.

Contract: `G2-358-synonyms.md` §2 (base page) and §5 (data and gates). The F2 sock primitive is also built now, with its render check (the build brief asks for it). The five faces are Phase 2 and are not built here.

## What was built
| file | what |
|---|---|
| `scripts/worksheet-gen/types/g2/G2-358-synonyms.js` | The base spec: "Linked Words", 8 twin cards. It has themeAxis off and no unitAxis. `_buildWith` is the poison seam. `build()` refuses a face config (`mode` ≠ `base`). The composer is locale-neutral over CONCEPT ids. `verify(page)` re-derives every answer from the stamps on the rendered page (see "Verify" below). |
| `scripts/worksheet-gen/templates/components-b5/synonyms.js` | `synSameLink` (the joined rings), `synTwinGrid`, `synTwinCard`, and `synSock` (a sock with its word as an HTML overlay in the leg). Every export is prefixed `syn`, and the barrel loads clean. The face components (`synPictureCard`, `synStrengthKey`, `synRamp`, `synShadeRow`, `synSayBubble`, `synSayRow`, `synFieldPlot`, `synSockMatch`) wait for Phase 2. |
| `scripts/worksheet-gen/primitives/sock.js` | NEW. Exports `sockSvg({W, H=40, F=14, T=40, mirror})`, which returns `{svg, w, h, leg}`, and `sockWidthFor(words)`. It uses tokens only, with no `<text>` and no `id=`. It throws when W is outside [110, 180], H < 36, F < 10, or T is outside [30, W/2]. |
| `scripts/worksheet-gen/qa/verify-b5-sock.js` | The primitive gate. **Node pass:** 30 socks re-parsed from the emitted markup (size and viewBox, no text or ids, tokens only, closed paths inside the box, mirror done as a transform on the `<g>`). **Render pass** through the real pipeline: bbox W × 54, the word box inside the leg rectangle, the glyph run fits, Nunito 800 18. Colour and greyscale sheets are written for a human. 5 poisons. |
| `scripts/worksheet-gen/data/b5/synonyms.js` | `SYNONYMS.en` is the first export. Also `CONCEPTS` (41, each with a symmetric `opp`), `PICTURES` (all 9 opened), `EXCLUSIVE`, `PICTURE_EXCLUDED`, `FACES`, `MODES`, and a lazy `validateBank` that calls the gate. `data/` is gitignored, so it must be force-added. |
| `scripts/worksheet-gen/qa/verify-b5-synonyms.js` | The family gate. Exports `validateBank(block, loc)`, which covers §5 rules 1-15; rule 10 is the base build probe (20 seeds at d2). `tools/b5-probe-child.js` already requires it from here. |

**The EN bank:**
- Groups:
  - 41 groups: 26 adjective, 15 verb; each has 2-3 words, a tier and a domain.
  - The d3 tier-2 pool is 11 adjective and 6 verb groups.
- Near and ban:
  - 16 near pairs, each with a `why`.
  - `ban` is the design's 9 words plus `hard`, `tear`, `odd`, `spot` and `nice` (each has two meanings).
- Face data:
  - 9 pictured concepts, each with `falseOf`.
  - 10 three-step scales.
  - `say` field: 6 past-tense words and 8 sentences, each with a full `fit` row.
  - `go` and `look` fields: 8 words each.
  - 6 mode strings.
- No group word is a field word.

## Gate output
- `node qa/verify-b5-sock.js`: **PASS (116 assertions, 5/5 poisons killed)**.
  - The poisons are PR3 (W 100 throws), PR4 (a word overflowing the leg), an off-token stroke, a `<text>` label, and an `id=`.
  - The control reports 0 findings.
- `node qa/verify-b5-synonyms.js` (full, 20-seed sweep): **PASS (641 assertions, 20/20 poisons killed)**.
  - The en bank reports 0 findings.
  - The sock gate runs inside it and passes.
  - An unauthored `sv` REFUSES.
  - Data poisons KILLED: P1, P3, P4, P5, P7, P8, P9, P11, P12, P13, P14, P17, P19.
  - Render poisons KILLED:
    - P2: a `big` card carrying `small`.
    - P18: a word printed twice.
    - PR1: cardGrid's default rows at the fi chrome; the card clips.
    - PR2: slots `[0,0,0,1,1,2,2,3]`.
    - PR6: an off-token inline border. The gate scans inline-style hexes; the shared lint reads only SVG attributes.
    - PR7: the base build fed the F2 config.
    - PS: SPARSE, from top-packed d1 cards at the 814 chrome.
  - **Deferred to Phase 2** (they need face renders): P6, P10, P15, P16 and PR5.
- **Node sweep, 400 seeds × d2 (3,200 cards), answer tells measured in both directions:**
  - Slots are exactly 2 per slot on every page.
  - How often the answer is the:
    - unique longest tag: 17.9 %
    - unique shortest tag: 15.0 %
    - alphabetically first tag: 26.0 %
    - alphabetically last tag: 25.4 %
  - The answer shares the target's first letter 3.4 % of the time, against 8.6 % for a foil.
  - 40.9 % of cards carry a same-domain foil.
  - The draw is locale-neutral on 400/400 seeds.
- **Renders:** every one is verify-clean and lint-clean.

  | chrome | body (px) | widest blank band in a card | d1 / d2 / d3 |
  |---|---|---|---|
  | en | 766 | – | clean |
  | short one-line | 811 | d1 25.9 px, d2 20.4 px (≤ 40) | clean |
  | de long | 710 | – | clean |
  | fi 4-line | 667 | – | clean |

  - The widest real 13-glyph words (ausgezeichnet, überglücklich, wunderschönen, amedrontado, surpreendido, kochend heiß) fit at the fi chrome with no clip.
  - The 20 sweep pages are all distinct.
- `node i18n/build-en.js` output: `668 types -> …strings.en.json (title lint clean)`.
- `node tools/b3-baseline.js --check --quick`: `checked build 3680 + enum 277 in 19s: 0 drifted (0 expected), 0 missing` / **PASS**.

## Deviations (each measured)
1. **Row gap is 10, not 12.** The ruled 677 is not what the longest fi chrome leaves: it measures **667** (the plants build measured the same). The design stack, 4 × 158 + 3 × 12 = 668, crossed the footer by 1 px (lint FAIL). With a 10 px gap it is 4 × 158 + 3 × 10 = 662. The spec's stack guard uses `BODY_MIN = 667`.
2. **d1 tags are stacked (`3x1`), not a `1x3` row.** At the 814 chrome, a 1 × 3 row of 91.5 px tags leaves ~48 px blank bands, which is SPARSE. The design d1 was also capped at 7 glyphs. Stacked, with 38 px tags, gives rows of minmax(210). The stack is 3 × 210 + 2 × 10 = 650 ≤ 667, and the widest blank band is 25.9 px.
3. **The base instruction is ONE sentence.** Rule 14 requires one sentence; the design gave two. The text is now "Read the big word on each card and circle the word under it that means the same." It is 82 characters and matches the §6 meta middle.
4. **`CONCEPTS[].opp` was added.** It is a locale-neutral, symmetric concept-opposite link. The opposites bank knows only its 20 pairs, so a `gloomy` foil on a `happy` card, or `messy` on `tidy`, would pass it. The composer also applies `near` at GROUP level, so no word of a foil group may be near any word of the target's group. `verify` checks both on the render.
5. **`validateBank` lives in the gate**, the plants convention; `tools/b5-probe-child.js` requires `qa/verify-b5-<key>.js`. The data module re-exports it lazily, which avoids a require cycle.
6. **Sock changes.**
   - The toe cap is now the bottom band of the dropped foot, following the outline. The design's corner rectangle read as a patch on the leg.
   - A teal 1.5 cuff seam at x 16 was added so the cuff edge survives greyscale.
   - The sheet is at `out/dev/`, not `qa/out/` (type-scoped output rule).
7. **Face strings are keyed by mode** (`base pictures pairs shades say fields`) until `alloc-b5var-ids` allocates the face ids.
8. **The d2 same-domain foil is a seeded coin flip** (≤ 1, per the design). The gate requires at least 35 % of cards to carry one, so "the only word on the topic" does not become the key; the measured rate is 40.9 %.

## ⚠ Sock render check: my honest read (the hard gate stays OPEN)
- **At F 14 in greyscale, it reads more as a luggage tag with a tab than as a sock.**
  - The ribbed cuff is the strongest cue.
  - The 14 px foot is stubby.
  - The creamDeep toe band is nearly invisible in grey.
- The sheet also carries an F 22 / T 46 pair for comparison (not measured). It reads more like a sock, but its bbox breaks the design's 54 px budget; the F2 layout still fits at 8 × 62 + 7 × 12 = 580 ≤ 667.
- **An operator print check is required:**
  - a laser print of `out/dev/G2-358-sock-sheet-grey.png`, judged at arm's length.
  - If it fails, the fallback is the design's half-ring tags.

## PNGs for the reviewer
- Pages:
  - `scripts/worksheet-gen/out/dev/G2-358-null-d{1,2,3}-en.png`
- Gate renders (`out/dev/G2-358-gate/`):
  - `G2-358-gate-d{1,2,3}-{en,shortchrome,longchrome-de,longchrome-fi}.png`
  - `G2-358-gate-d2-widest-fi-chrome.png`
  - `G2-358-gate-sweep-*.png`
  - `G2-358-gate-poison-*.png`
- Sock sheets:
  - `out/dev/G2-358-sock-sheet-{colour,grey}.png`
  - `out/dev/G2-358-sock-poison-PR4.png`

## Open items for the faces and panels
- **Phase 2 build:**
  - The faces: the 8 components and the `mode` branches in `build()` and `verify()`.
  - Poisons P6, P10, P15, P16 and PR5, plus the F2 rule-10 probe.
- **Decide first:** the sock print check (above).
- **EN words the panels should audit:**
  - `neat` (also US slang for "great")
  - `mad` (also "crazy")
  - `close` (also "near"; paired `near` with `end`)
  - `pick` (paired `near` with `collect`)
  - `cozy` (US spelling)
  - F4 sentence f8, "Cross my heart…", which has to carry `promised` without printing it.
- **Panel data still to author:**
  - `instructionBans` per mode.
  - `liveTitles` (for the non-en title-uniqueness check).
  - `regional` doublets (es-MX).
  - The `no` strand literal.
- **`data/b5/synonyms.js` must be force-added** (`data/` is gitignored).
