# G2-358 `synonyms`: the five faces (Phase E, 2026-09-23)

Contract: `../G2-358-synonyms.md` §3 (faces) and §5 (gates). Rules: `../_FACE-BRIEF.md` and `../_BUILD-BRIEF.md`. Ids come from `../_records/b5var-id-allocation.json`.

**Lead ruling applied:** the sock is retired. F2 uses design A's half-ring tags (`synLinkTag`), and no F2 string mentions socks. The F2 title is "Synonym Pairs: Match the Words That Mean the Same".

All five are **CODE** faces on the base's one knob, `mode`.
- In `types/g2/G2-358-synonyms.js`, a face config is read only by the face spec that owns its mode (`data/b5/synonyms.js FACES`).
- The base spec refuses a face config. A face spec refuses the base config and any other face's config.
- The base path is unchanged (see the baseline line below).
- The rows are in `tools/b5var-rows/synonyms.js`; run `node tools/gen-b5var-specs.js`.
- A bank `refuse: [mode]` makes the face throw.

## Files touched (this family only)
| file | change |
|---|---|
| `types/g2/G2-358-synonyms.js` | Mode dispatch plus guards. Five builders: `buildPictures`, `buildPairs`, `buildShades` (plus `shadeOrders`), `buildSay`, `buildFields` (plus `pileRows`). `faceVerifyInPage` is one in-page verify that re-derives every answer from the stamps and the page's lexicon slice. `verify()` branches on `data-lcs-face`; the base branch is untouched. |
| `templates/components-b5/synonyms.js` | Adds `synPictureCard`, `synLinkTag`, `synPairMatch`, `synStrengthKey`, `synRamp`, `synShadeRow`, `synSayBubble`, `synSayRow`, `synFieldPlot` and `synWordPile`. They reuse `gapBox`, `blankNumeralBox` and `rulingBlock`. |
| `data/b5/synonyms.js` | Real `FACES` ids. The `pairs` title has no sock. `falseOf` is re-authored (see F1). |
| `tools/b5var-rows/synonyms.js` | NEW. The five rows; G1/G3 faces carry `extra {gradeBand}`. |
| `types/{g1,g2,g3}/*` | EMITTED: `G1-395-synonyms-with-pictures`, `G2-373-synonym-pairs`, `G1-396-shades-of-meaning`, `G2-374-synonyms-for-said`, `G3-397-word-fields-go-and-look`. |
| `qa/verify-b5-synonyms.js` | Rule 10 now probes every face the block does not refuse (20 seeds each; F2 must have 16 distinct words). The live-title check excludes the family's own ids. Section 6 calls the face gate. |
| `qa/b5-synonyms-faces.js` | NEW. The face gate. |
| `i18n/strings.en.json` | Regenerated with `node i18n/build-en.js` (718 types, title lint clean). |

## The faces

### F1 · G1-395 · `synonyms-with-pictures` · CODE `mode:'pictures'` · G1
- **Config:** `{cards 6, rows 3, chips 4, answers 2, picPx 72, chipPx 19, chipH 44, maxGlyphs 11, maxConcept 2, rowMin 214, rowGap 10}`.
- **What the child does:** looks at each OPENED picture and circles the TWO words that name it.
- **Closed world:** every word on the page appears exactly twice, once right and once as a foil.
  - A card's two foils come from two different pictures, so no second synonym pair sits on a card.
  - The six answer-slot pairs are each used exactly once, so each slot answers exactly half the cards.
- **Assertions and poisons it owns:**
  - verify checks: exactly 2 tags of the picture's group; foils are in `falseOf` and are answers elsewhere; EXCLUSIVE; the img src is the bank picture; picture ≥ 72; tags ≥ 44; no clip.
  - Poisons: **P6**, AT1, SP1, AP1.
- **PNG:** `scripts/worksheet-gen/out/dev/G1-395-null-d2-en.png`.
  - Read in colour and greyscale.
  - The six pictures read: scared, elephant, race car, tired, angry, happy.
  - The rings mark sits top-right; no clip.
- **Deviations (measured):**
  1. **`falseOf` re-authored.** An exhaustive search showed the base-build `falseOf` admitted **0 of the 33 legal pages** for the closed world.
     - Each concept's list now holds every word of the other pictured concepts that is plainly FALSE of this picture.
     - Removed as plausible:
       - sad face: tired and scared words
       - scared face: angry
       - surprised face: scared
       - tired face: sad
       - race car: size words
       - elephant calf: happy and tired
       - ant: fast, happy and angry
     - After the change, 33 of 33 pages are feasible.
  2. **The race car reads small.** The bitmap is square with the car centred, so at 72 px it is a thin strip. It is legible; a panel may prefer a tighter crop.
  3. **Alternate pictures are not drawn.** The whale and mouse alternates are never used; the primary pictures only.

### F2 · G2-373 · `synonym-pairs` · CODE `mode:'pairs'` · G2
- **Config:** `{pairs 8, tagW 210, tagH 64, wordPx 20, maxGlyphs 14, tiers [1,2], posMix [5,3], sameDomainMax 2}`.
- **Layout:** two columns of 8 identical white half-ring tags (a teal half-ring on the inner edge, a coral dot beyond it).
- **What the child does:** draws a line from each left word to its synonym on the right.
- **Composer rules:**
  - No pair of concepts on the page is opposite, near, or an antonym pair.
  - At most 2 groups per domain.
  - The right order is a derangement and is never the exact reverse.
- **Assertions and poisons it owns:**
  - verify checks:
    - each left word has exactly 1 partner, where near words count as partners.
    - 16 distinct words.
    - no partner sits level with its word.
    - the right column is not the reverse.
    - no antonyms, opposite concepts or prefix antonyms.
    - one tag width.
    - dots and rings 16 each.
  - Poisons: **P15**, FX, AT2, SP2, FL1, FG, AP2.
- **PNG:** `scripts/worksheet-gen/out/dev/G2-373-null-d2-en.png`. Read: the half-rings face each other, 16 dots, no clip.
- **Pooled tells (200 seeds):**
  - The largest single left-row to right-row cell is 23 %.
  - 26 % of partners sit in an adjacent row.
- **Deviation:** the words are 20 px, not the sock's 18. The 14-glyph widest fixture fits at fi667.

### F3 · G1-396 · `shades-of-meaning` · CODE `mode:'shades'` · G1
- **Config:** `{rows 6, perRow 3, box [42,30], chipPx 20, chipH 44, maxGlyphs 12}`.
- **Layout:** the strength key (three growing blocks, numerals 1 2 3) once at the top, then 6 rows, each a ramp plus three tags over open boxes.
- **What the child does:** writes 1, 2 or 3 in each box, from weakest to strongest.
- **Printed orders:**
  - None is the stored order.
  - Each rank appears in each column exactly twice.
  - The exact reverse appears on at most 2 rows, and no order appears more than twice.
- **Assertions and poisons it owns:**
  - verify checks:
    - box answers equal the rank in the scale.
    - column balance.
    - no row in the stored order.
    - reverse ≤ 2.
    - no digit outside the key.
    - boxes empty and ≥ 32 high.
  - Poisons: **P10**, SP3, AP3.
- **PNG:** `scripts/worksheet-gen/out/dev/G1-396-null-d2-en.png`. Read: the key blocks differ in height in greyscale too; no clip.
- **Deviation (measured):** `.ws-blankbox` has a content-box border, so a 40 × 32 box renders 37 high. That overran the fi chrome by 1 px.
  - The fix: box 42 × 30 (renders 35), cell gap 4, key margin 8, row gap 4.
  - Stack: 56 + 8 + 6 × 95 + 5 × 4 = 654 ≤ 667.
- **Carried from the design:** the box is under the G1 44 element floor. The 40 × 32 in §3 was already under it, and a 44-high box does not fit the stack.

### F4 · G2-374 · `synonyms-for-said` · CODE `mode:'say'` · G2
- **Config:** `{rows 6, bank 6, fontPx 18, bankPx 18, maxGlyphs 12}`.
- **Layout:** a bubble holding the struck head "said" and the 6 say verbs (in derangement order), over 6 sentence lanes, each with one gap.
- **What the child does:** writes the verb that fits each sentence.
- **Composer rules:** one sentence per word, whose single true fit cell among the page's words is that word. Names come from `data/b2/sentences.js`.
- **Assertions and poisons it owns:**
  - verify checks:
    - the fit matrix is a permutation.
    - bank multiset = row answers.
    - bank order is a derangement, not the reverse.
    - no bank word or head word in any sentence.
    - one gap width.
    - lanes ≤ 2 lines (measured by overlapping line boxes).
    - bubble ≤ 2 rows.
  - Poisons: **P16**, **PR5**, L4, AT4, SP4, AP4.
- **PNG:** `scripts/worksheet-gen/out/dev/G2-374-null-d2-en.png`. Read: row "Cross my heart…" wraps to 2 lines, which is allowed.

### F5 · G3-397 · `word-fields-go-and-look` · CODE `mode:'fields'` · G3
- **Config:** `{words 10, fields [go, look], split [4,6], plotRows 6, rowH 62, glyphH 34, pileRowsMax 3, wordPx 18, maxGlyphs 12}`.
- **Layout:** a pile of 10 verbs, then two fenced plots ("go" and "look" on the signs), each with 6 empty writing rows.
- **What the child does:** writes each pile word in its field.
- **Pile rules:**
  - All three splits (4/6, 5/5, 6/4) occur; seen in the 200-seed pool.
  - No 4-run of one field.
- **Assertions and poisons it owns:**
  - verify checks: field membership; split range; no 4-run; 6 empty rows per plot; the sign prints the quoted head; pile ≤ 3 rows.
  - Poisons: PW, PP, AT5, SP5, FL2, AP5.
- **PNG:** `scripts/worksheet-gen/out/dev/G3-397-null-d2-en.png`. Read: the fence reads as a fence; the rows are spread evenly.
- **Deviations (measured):**
  1. **Rows are 62 high with glyphH 34, not 52 / 28.** At 52 the rows left 45 px bands at the 814 chrome (SPARSE).
  2. **Plot bottom padding is 0.**
  3. **NEW pile guard.** Ten 12-glyph pills need 4 rows.
     - The build redraws; if no draw fits, it REFUSES ("never a smaller pill").
     - The widest fixture uses the longest real de/fi field verbs (8-10 glyphs).
     - Stack guard: 173 + 472 ≤ 667.
- **Carried from the design:** the visible gap between rows is about 55 px (the ink region is about 35 of each 62 px row). It is a writing page; the panels should judge it.

## Refusals visible from the bank shape
- None today; only `en` is authored.
- The spec throws for:
  - a missing block
  - `refuse: [mode]`
  - < 8 pictured concepts (F1)
  - < 8 three-step scales (F3)
  - no 6 × 6 permutation fit draw (F4)
  - < 8 usable words per field (F5)
- For the panels:
  - F1 is at risk in es-MX and de (design §4).
  - F5 refuses any locale whose field words cannot pack 10 pills into 3 rows.

## Open items for the panels
- Audit the re-authored `falseOf` per locale, especially size words (big / small) as foils on the emotion faces.
- F4 sentence f5 ("Where is my red hat?") fits `asked` only weakly. `shouted` is plausible, and only the page's permutation disambiguates it.
- F1 race car tile legibility.
- F3 box floor (35 px rendered).
- F5 row spacing.
- The rule-14 apparatus lint is en-only. Each panel supplies `instructionBans`.

## Gate lines
- `node qa/verify-b5-synonyms.js` (full): **PASS (822 assertions, 46/46 poisons killed)**
  - Base poisons plus the deferred P6 P10 P15 P16 PR5.
  - Face poisons: L4 FX PW PP FG SP1-5 FL1 FL2 AT1 AT2 AT4 AT5 AP1-5.
  - The untouched faces at the own / 814 / fi667 chromes are the controls.
  - Face renders at own / 814 / 722 / 667 plus the widest-word fixtures at 667 are all clean.
  - Max band ≤ 38; FILL 95.8-99.8 %.
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=synonyms`: `compared 15 pairs over 5 faces against their bases + pairwise within family` / **every variation differs from the deck its base publishes and from its siblings**.
- `node tools/b3-baseline.js --check --quick`: `checked build 3880 + enum 277: 3 drifted`. They are G1-376 / G1-377 / G1-380, all other families' accepted drifts per the lead's notes. **0 drift on any G2-358 / synonyms id**; the base is byte-identical.
- Greyscale montage of the five: `scripts/worksheet-gen/out/dev/G2-358-faces-grey.png`.

## Review round 1 (lead, 2026-09-23) — two defects fixed

**(1) F1 wide pictures (race car rendered ~40 px wide).** Each bitmap is 512 px square, and the race car's drawn content fills only 0.95 × 0.385 of it. `object-fit:contain` in a 72 px square therefore drew a thin strip.
- **Fix:** each picture now carries a MEASURED content box, `PICTURES[c].box = [x0, y0, x1, y1]`. It was measured on the 512 px bitmaps (alpha > 24 and not near-white).
- `synPictureCard` sizes the img to the content: 74 px high and as wide as the content needs, up to 220. It then fills that box with `object-fit:cover`, positioned on the content centre.
- **Result for the race car:** the image box is 192 × 74 (content ≈ 183 × 74).
- **Result for the faces:** the image box is 74-77 px square.
- **Shortfall against the ~70 % target:** the car's long side is about 61 % of the 298 px frame interior. Reaching 70 % would need the car drawn 85 px high, and the 80 px frame is capped by the fi 667 stack (3 × 214 + 2 × 10 = 662).
- **New verify assertion, per picture:**
  - the drawn content's short side is ≥ 44
  - the content fills its binding dimension (≥ 90 % of 74 px high or of 220 px wide)
  - `object-fit:cover`
- **New poison PF:** a picture shrunk to 40 px fails the gate (KILLED).

**(2) F3 scales must have ONE order no teacher could dispute.** I audited all 10 EN scales against that bar:

| scale | verdict |
|---|---|
| warm / hot / boiling | kept |
| chilly / cold / freezing | kept |
| damp / wet / soaked | kept |
| annoyed / angry / furious | kept |
| good / great / fantastic | kept |
| nibble / eat / gobble | kept |
| like / love / adore | kept |
| sad / miserable / heartbroken | **dropped**: miserable vs heartbroken is arguable |
| nervous / scared / terrified | **dropped**: nervous is another feeling, not a weaker fear |
| big / huge / gigantic | **dropped**: huge vs gigantic is arguable |
| whisper / talk / shout | **added** |
| sip / drink / gulp | **added** |
| tap / knock / bang | **added** |

- There are still 10 scales, so the ≥ 8 rule holds.
- **Bar for the native panels:** a scale ships only if its three words differ in ONE dimension (heat, wetness, loudness, force, amount, liking). No two words may be separable by meaning instead of strength. When in doubt, drop the scale.
- **Why a new `nearOnly` list:** the three `near` pairs big~huge, scared~nervous and sad~miserable are stamped into the base page's lexicon. Removing them would drift the base.
  - They are kept as `near` pairs.
  - `nearOnly: ['huge', 'nervous', 'miserable']` lets rule 4 accept words that now live only in `near`.
  - The base stays byte-identical.

**Reruns:**
- gate: **PASS (822 assertions, 47/47 poisons killed)**
- distinctness: every variation differs
- build-en: title lint clean
- b3-baseline `--quick`: 0 drift on G2-358 and the face ids. It prints FAIL only for G1-376, G1-377, G1-379 and G1-380, which the lead named as expected.
- Renders re-read: `out/dev/G1-395-null-d2-en.png` (the car fills the frame) and `out/dev/G1-396-null-d2-en.png`.
