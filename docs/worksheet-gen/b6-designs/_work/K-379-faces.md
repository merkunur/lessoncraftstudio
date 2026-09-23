# K-379 `story-sequencing` — the five faces (nt5-F Phase E, 2026-09-23)

All five are **CODE faces** on one additive knob, `mode`, in `types/k/K-379-story-sequencing.js`.
- **Builders:** `FACE_BUILD[mode]`; verify goes through `faceVerify(page, mode)`. `mode:'base'` is the untouched default path.
- **Rows:** `tools/b6var-rows/story-sequencing.js`, emitted by `node tools/gen-b6var-specs.js`. The run re-emitted all 25 rows, including the other families' unchanged ones.
- **Components:** new, in `templates/components-b6/story-sequencing.js`: `ssCardBox` `ssLine` `ssGlueFrame` `ssWordTag` `ssCutStrip` `ssQueryFrame` `ssChoiceTray` `ssStageLabel` `ssDrawCard` `ssSentenceMatch` `ssVerticalCord` `ssRetellRow`.
- **Strings:** EN strings are `STORY_SEQUENCING.en.strings[mode]`, and the gate asserts each spec's i18n equals them. The F5 bank title changed to the allocation title "Retell the Story with Starters".
- **Stamps:** every face root stamps `data-lcs-mode`.
- **Layout:** every face stage is top-anchored and grows. Cards, frames, rows and the draw box absorb the slack.

| face | id / band | knob (d2 overrides) | what the child does | verify() re-derives | PNG |
|---|---|---|---|---|---|
| F1 Cut and Paste: First, Next, Last | **K-381** / K (`types/k/`) | `mode:'first-next-last-cut'`, stories 2, sub3, answer glue, tile 128, frame 136 × 104 (grows), gap 40, grow 60 | cuts two 3-picture strips and glues each picture into the empty frame under First / Next / Last on its story's line | 2 lines × 3 EMPTY frames stamped k 0..2 in reading order; word tags = the root's `words3` verbatim; each strip = seq {1,2,3} in a legal n = 3 scramble (132/213/231/312), strips differ; tile ranks rise with seq; strip i ↔ line i story; every tile ≤ frame − 8 px in both dimensions | `scripts/worksheet-gen/out/dev/K-381-null-d2-en.png` |
| F2 What Happens Next? | **G1-400** / G1 | `mode:'what-happens-next'`, stories 3, shown 3, choices 3, foils regress + other, panelW 108, grow 40 | three stories hang in order (ranks 1-3 + a coral "?" frame); circles which of three tray pictures comes next | given = ranks 1,2,3 of the block's story in order; exactly one choice = the story's rank 4; the same-story foil must be rank 1; the other-story foil must have a different stage, share no object and not be on the page; correct slots over the 3 blocks never 012/210/repeat | `…/G1-400-null-d2-en.png` |
| F3 Beginning, Middle and End of a Story | **G1-401** / G1 | `mode:'beginning-middle-end'`, stories 2, show ends, answer draw, endW 172 (vh 200), midW 240, grow 100 | sees the first and last picture on each line, draws the missing middle in the empty frame under Beginning / Middle / End | line reads first, draw, last; first = rank 1, last = the story's last rank (`data-lcs-panels`); draw card empty, ≥ 200 × 150, no rank; labels k 0,1,2; the two stories' stages differ | `…/G1-401-null-d2-en.png` |
| F4 Sequencing Sentences: Match the Pictures | **G1-402** / G1 | `mode:'sequencing-sentences'`, stories 2, sub4, order scrambled, answer line, panelW 100, textW 420 | reads 4 sentences IN ORDER per story, draws a line from each to its SCRAMBLED picture | sentences rank 1..4 in DOM order, each opening with `openers4[k]`, each ≤ 2 lines; the picture column obeys the scramble law; the two columns differ in permutation and rank-1 slot | `…/G1-402-null-d2-en.png` |
| F5 Retell the Story with Starters | **G2-378** / G2 | `mode:'retell-with-starters'`, stories 1, sub4, answer write, rows 2, glyphH 24, lineH 52, starters4, card 150 (vh 140), rulingW 440, grow 70 | one story's four pictures hang down a vertical line; writes each step on two school-ruled rows whose first row opens with the printed starter; word bank on top | 4 rows seq 1..4, ranks rise; the starter = `starters4[k]` verbatim, no other text on the rows; glyphH ≥ 24; the bank = the story's 4-6 helpWords, distinct | `…/G2-378-null-d2-en.png` |

## Gate (grown): `qa/verify-b6-story-sequencing.js`
**Per face**, each rendered through `render/render-instance.js` (file:// fonts):
- **Renders:** d2 en at 766 (5 seeds; `--quick` 1) and at the 814 / 722 / 677 chromes.
- **Checks:** verify() empty, lints clean, the spec strings equal the bank, gradeBand = the allocation band, fi REFUSES.
- **Floors:** pictures ≥ 100 px wide and ≥ the band floor; text ≥ 16 px; choices ≥ 44 px.
- **SPARSE/FILL:** every empty band ≤ 40 px; fill ≥ 85 % at 814; content inside the body at 677.
- **Two sparse poisons per face:** PS1 nothing grows at 814; PS2 stage taller than the body at 677.

**The deferred face poisons (all killed):**
- PR6: the F2 other-story foil on the SAME stage.
- PR7: an F2 choice at rank 3.
- PR8: the F2 correct slots 0,1,2 (a staircase).
- PR9: the F4 pictures in story order (the identity).

**Census at 400 seeds:**
- F2 correct slot: 33.3/33.3/33.3 %. By construction each page's slots are a permutation, so this is exact.
- F4 rank-1: 26.1/24.0/25.4/24.5 %; rank-4: 24.5/25.1/25.5/24.9 %.
- F1 rank-1 by slot: 28.6/41.1/30.3 %. This is the recorded n = 3 middle bound: middle ≤ 56 %, every slot ≥ 19 %.

**Measured bands per face** (max empty band at each chrome, then fill):

| face | 766 | 814 | 722 | 677 | fill |
|---|---|---|---|---|---|
| K-381 | 12 | 15 | 12 | 12 | 98 % |
| G1-400 | 10 | 10 | 10 | 10 | 98-99 % |
| G1-401 | 12 | 12 | 12 | 12 | 98 % |
| G1-402 | 14 | 14 | 14 | 14 | 98 % |
| G2-378 | 10 | 10 | 10 | 10 | 98 % |

## Deviations from §3 (measured)
- **F1:** tile 128 (not 132), frame min 136 × 104 (not 140 × 107). With the design's sizes the stack is 660 px, over the 649 px lane inner at the 677 chrome. At 128 it is 642. The frames grow with taller chromes, and the tile-to-frame slop (≥ 8 px) is verified.
- **F2:** panels 108 (not 112), because the three blocks at 112 measure 666 px, over the 649 px lane inner. Choices are 108 × 81, above the G1 44 floor.
- **F3:**
  - The end cards are zoomed near-portrait (172 × 215 minimum, vh 200), not 172 × 129.
  - The draw card is 240 × 215 minimum, not 240 × 180.
  - Both grow up to 100 px at taller chromes. Without the growth the page left 262 px of air at 814.
- **F4:** the right column is 420 px (not 393) and rows gap 4 (not 6). At 6 the stack was 652, over 649.
- **F5:** cards 150 × 131 minimum (vh 140), not 144 × 108; ruling rows 440 px wide, not 465. The design's 16 + 144 + 14 + 465 = 639 did not leave room for the cord column plus the lane padding. The vertical cord is a CSS line with one CSS peg per row: an SVG stretched to the row height distorted the pegs.

## Distinctness · baseline · base identity
- `node tools/gate-variation-distinct.js --batch=b6 --diffs=2 --family=story-sequencing` → `every variation differs from the deck its base publishes and from its siblings` (15 pairs over 5 faces).
- `node tools/b3-baseline.js --check --quick` → `checked build 4000 + enum 299 in 26s: 0 drifted (0 expected), 0 missing` **PASS**.
- Base byte-identity against the snapshot taken before the faces → `base byte-identical: 90/90 hashes`.
- Family gate final line: **`PASS (172 assertions, 36/36 poisons killed)`**.

## What I saw in each PNG (all read)
- **K-381:** two lines of empty dashed frames with First / Next / Last tags on strings, and two cut strips below (apple 413, letter 342). Nothing clipped, nothing under the footer.
- **G1-400:**
  - apple, paper-chain and snowman, each with a "?" frame and a cream tray.
  - Foils: letter / banana / cake as the other-story endings, and rank 1 as the regression.
  - Correct slots 0, 2, 1.
- **G1-401:** banana and snowman ends, big empty coral-dashed middle frames, Beginning / Middle / End pills.
- **G1-402:** paper-chain and banana, pictures scrambled, sentences in order with openers, dots on both sides.
- **G2-378:** the fence story down a vertical cord, First, / Next, / Then, / Finally, starters on the first row, the word bank on top.

## Per-locale refusals visible from the bank shape
- None structural.
- es / pt drop `snowman` by default. Their F2 pool is still 9 (≥ 5 needed for 3 stories + 2 foils), and every other pool is ≥ 7.
- F4 and F5 refuse in a locale whose signed sentence stories are fewer than 3. That depends on the panels, so nothing is known yet.
- F1: the widest measured tag, de "Zum Schluss", is 100.6 + 24 px, which fits the 136 px frame.

## Open items for the panels
- Every locale authors `words3 · openers4 · starters4 · bme`, 8 stories × sentences / stateWords / helpWords, and the 6 strings. These are the §4 literals; the `validateBank` rules 9-15 apply.
- F1 matches strip i to line i by order alone, as §3 specifies. The panels should say whether their classrooms need a visual pairing cue.
- Human print check of the F2 tray at 108 px: the snowman P1 foil is a lone small ball.
