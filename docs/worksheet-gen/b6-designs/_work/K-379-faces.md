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

## Fix round 1 (2026-09-23) — the 11 native panels' audit of the EN source
Drafts (`i18n/.draft-b6-<loc>.json`) were NOT edited. There is **one bank-shape change** (item 2).

1. **Sandwich.** The last panel is now truly finished: ONE L-shaped crust with three bites taken out of it, plus crumbs. It matches the EN sentence "Last, only a crust and crumbs are left." and all ten drafts (e.g. de "nur noch die Kruste", es "la orilla y unas migajas", nl "een korstje en kruimels").
   - The counted change was re-cut so the story stays a strict chain even though the bread disappears: `spread` = the JAMMY KNIFE TIP (stays 1 from P2 on), `crumb` 0,0,1,2,5 (cutting leaves the first crumb), `bite` 0,0,0,1,3. The variable `cut` was dropped from the sandwich.
   - **Sentences vs drawings, re-read for every sentence-pool story:**
     - Cake "one slice is cut out": the notch with its two cut faces.
     - Beach "finds a shell": the walker stands at the shell.
     - The rest name only drawn states.
   - Not mechanical: a sentence is free text. The claim table below covers the word banks.
2. **Word banks name only drawn parts (now GATED).**
   - The panels read the cake candles as not drawn: they were plain bars at the card edge. They are redrawn as striped birthday candles with wicks, lying at the front left of the stand inside the zoomed window.
   - New claim table `COMMON.PARTS[story]` (hand-read from the renders).
   - New **validator rule 11**: `stories.<id>.helpIds` must be parallel to `helpWords`, and every id must be in `PARTS[id]`.
   - EN `helpIds` are authored.
   - Poisons: P17 (cake help word naming "balloon") and P17b (a story without helpIds). Both killed.
   - **SHAPE CHANGE — every panel must add `banks['story-sequencing'].stories.<id>.helpIds`**: an array parallel to its `helpWords`, with ids from `COMMON.PARTS`. Needed for all 8 sentence-pool stories: apple, banana, sandwich, cake, fence, letter, paper-chain, beach-walk. No other key changes.
   - Verbs the drafts already use map to drawn parts: beach "walk / gå / lopen / caminar…" → `walk` (the walking pose), de "der Strand" → `beach`.
3. **K-381 instruction** → "Cut out the pictures on each strip and glue them in the empty frames above First, Next and Last." It names only drawn things: strips, empty frames, the three words.
   - **Pairing marker (fr addendum):** strip k and story line k carry the same teal shape. Line 1 and strip 1 get a dot; line 2 and strip 2 get a triangle. The line's marker sits on the cord before the first peg; the strip's sits on the scissors bar.
   - `verify()` compares the DRAWN shape (circle vs polygon), not a stamp, and requires the two stories' shapes to differ.
   - Poison PM (the second strip's triangle swapped for a dot): killed.
4. **G1-400 instruction** → "Look at each story's three pictures, then circle the picture below them that belongs in the ? frame." The "?" frame and "the picture below them" are now distinct words; "box" is gone.
5. **nl bare-order bug fixed.** `volgorde` is a bare head only when `verhaal` is absent ANYWHERE in the title.
   - Must-pass: "Verhaal op volgorde leggen" → no rule-12 finding.
   - Must-fail: "Volgorde" (P19) and "Plaatjes op volgorde" (P19b). Both killed.
6. **Beach walker:** `road-pictogram.js` `standing` / `walking` are a plain ink silhouette. There is a round head (no hair, no face), a straight torso and two legs: no skirt, no hair, no gendered colour. The sentences are per-locale literals, so each locale names the child (es "una niña" is the panel's own choice). **Nothing changed.**
- `i18n/strings.en.json` was regenerated by `node i18n/build-en.js`. The run also pulled in the other families' current spec strings.

**Base.**
- The base changed only where it draws sandwich or cake. The snapshot drift was exactly the coordinates whose page carries either story (0 mismatches over d1 / d2 × 30 seeds, d3 always has sandwich).
- The snapshot was re-taken after this round.
- `b3-baseline` stays 0 drift, because K-379 is not in the release baseline.

**Draft validation after this round** (`node tools/validate-b6-draft.js <loc>`, 10 drafts present; there is no en draft):
- The story-sequencing findings in every locale are ONLY the 8 `r11 … helpIds must be parallel to helpWords` lines, which is the new key above.
- All other errors belong to other families (habitats, sink-or-float, cursive-writing, and pt G1-398 build probe).

| locale | total errors | story-sequencing |
|---|---|---|
| da | 15 | 8 helpIds |
| de | 13 | 8 helpIds |
| es | 13 | 8 helpIds |
| fi | 13 | 8 helpIds |
| fr | 12 | 8 helpIds |
| it | 13 | 8 helpIds |
| nl | 13 | 8 helpIds |
| no | 16 | 8 helpIds |
| pt | 15 | 8 helpIds |
| sv | 12 | 8 helpIds |

**Renders read:**
- `out/dev/K-381-null-d2-en.png`: the markers and the new instruction.
- `out/dev/G1-400-null-d2-en.png`.
- `out/dev/G1-402-sandwich-v7-d2-en.png`: the finished crust panel against "Last, only a crust and crumbs are left."
- `out/dev/G2-378-cake-v3-d2-en.png`: the striped candles against the bank word "candles".

## Fix round 2 (landing audit, en / de / es / fr / nl panels, 2026-09-23)
Every finding was reproduced on `out/b6-sweep/<loc>/<ID>-null-d2-<loc>.png` (or a fresh render) before anything changed. After the round the six ids were re-rendered in en / de / es / fr / sv (30/30 clean) and read at print size.

| # | id | finding | reproduced? | fix | gate |
|---|---|---|---|---|---|
| 1 | K-379 | hopscotch chalk a plain coral bar; pavement reads as graph paper (en, fr) | yes | `SETS.pavement` is plain grey ASPHALT (`grid`) with pale grit specks, no slab lines; the court is drawn in WHITE chalk lines (3.5 px); the chalk is a WHITE round-ended stick with a worn end and dust, tilted, still shortening (36 → 19 units, never a dot) | primitive gate (greyscale ≥ 1 % per step, carriers ≥ 5 px) PASS |
| 2 | K-379 | "brick pile one bar; the tower's domed top looks like a figure" (de) | yes — the SAME hopscotch story, misread | coral outlined squares under a dome read as bricks with a head: the dome is dropped (the court ends on its last pair), the lines are white chalk | as 1 |
| 3 | K-379 | the crayon a flat orange bar (nl) | yes | a crayon: thicker body, white paper wrapper with two stripes, sharpened cone tip | primitive gate |
| 4 | K-381 | the strips carry a dot / triangle but the instruction never mentions the marks | yes | EN instruction → "…glue them on the line with the same mark, in the empty frames above First, Next and Last." | `RULE14_EN` F1 requires `mark`; poison P20 (the old instruction) KILLED |
| 5 | K-381 | BOTH strips a one-step ROTATION of the answer order (nl + lead) | yes (shipped: apple 312, letter 231) | new `COMMON.STRIP3 = 132 / 213 / 321`: never the identity, never a rotation; the two strips differ. At n = 3, dropping the rotations leaves the three transpositions; drawn uniformly they are a Latin square (every picture in every position p = 1/3; any fixed recipe solves exactly one strip in three, the floor at n = 3). The reverse 321 is the base law's forbidden row, admitted for F1 only: without it (132 / 213) "swap the first two" solves one strip in two and First is never the rightmost card | `verify()` names identity / rotation; poisons PF1 (312) and PF1b (123) KILLED, PF1c (the old table) KILLED; census 400 seeds on the shipped instance seed in ALL 11 locales: 0 bad strips, strip shares and rank-1-by-slot 34.0 / 32.0 / 34.0 % (33 ± 6) |
| 6 | G1-400 | row-3 foil (crumbs + candles) illegible at print size (en, nl) | yes (the cake's last panel) | `COMMON.TRAY_ILLEGIBLE = ['cake']` (hand-read claim table); the other-story foil never draws from it | `verify()` via a root stamp; poison PT (cake as foil) KILLED; census 400 seeds × 11 locales: 0 pages |
| 7 | G1-400 / G1-401 | snowball frames white outlines on white; the snowman's first frame one small circle, nothing says snow | yes | `SETS.snow` gets a pale sky (`tealSoft`) with twelve falling snowflakes over the white ground; every ball carries a pale shadow masked to it; the first snowball is bigger (r 11); the zoomed backdrop and the CSS card continue the snow sky (`COMMON.SKY`) | primitive gate; read at 108 px (G1-400) and 172 px (G1-401) |
| 8 | G1-400 | snowman has 2 balls here, 3 on G1-401 (de) | NOT a defect | G1-400's third GIVEN frame is rank 3 (two balls, the middle of the story); the answer and G1-401's End are rank 4 (three balls). The shared art is consistent | — |
| 9 | G1-400 | each row's same-story foil is the story's own first frame, rejectable by rule (de; fr: intended) | yes | REFUSED, kept: the rank-1 "regress" foil is the misconception F2 tests (a story never goes back); rejecting it BY that rule is the reasoning the page teaches. Every other same-story panel is also already on the line (ranks 1-3 are shown), so no less-rejectable same-story foil exists | existing PR7 |
| 10 | K-379 / K-381 / G1-400 | beach-walk footprints read as pebbles, towel / shell unreadable, walker neutral (es) | yes | every footprint is a FOOT (sole + heel pad + three toes, pointing the way the child walks); a SEA band behind the sand; a bigger striped towel with a fringe; a scallop shell (fan, scalloped rim, ribs, hinge). The walker stays the faceless road-pictogram silhouette (design §2; es names the child in its own sentences) | primitive gate; P9 re-aimed at the footprint group, KILLED |
| 11 | G1-402 | sentences printed IN story order with First / Next / Then / Last, only pictures scrambled: matching, not sequencing (en, fr, de) | yes | REDESIGN: both columns are scrambled. The sentence column obeys the scramble law (and differs between the two blocks in permutation and in the slot of "First"); every sentence card carries an EMPTY dashed order box the child numbers; the pictures keep their own law-legal scramble. RL.1.7 (read, match text to picture) survives as the lines; ordering is now load-bearing — the openers anchor First and Last, but Next vs Then can only be ordered from the story content | `verify()`: sentence-column law, one EMPTY order box ≥ 36 × 36 per row left of its text, the rank-r sentence opens with `openers4[r-1]`, ≤ 2 lines in every locale (the box costs 52 px; measured in all 11); poisons PF4 (story order) and PF4c (a filled box) KILLED; census 400 seeds × 11 locales: sentence rank-1 22.8 / 24.6 / 26.3 / 26.4 %, rank-4 26.3 / 26.9 / 22.3 / 24.6 % |
| 12 | G1-402 | 2 of 8 pictures straight across from their own sentence | yes (rows 1 and 6) | the sentence column is drawn as a row-wise derangement of the picture column | `verify()` MEASURES it (the picture whose vertical centre lies in a sentence's row); poison PF4b KILLED; census 0 of 3,200 rows in every locale |
| 13 | G2-378 | nobody paints; the brush a bristle-less stick never used, yet "brush" is in the bank (en, de, fr) | yes | a real brush (ink handle, white ferrule, bristle head with bristle lines); panels 2 and 3 show a HAND (a sleeve reaching down from the top edge, a mitten with a thumb round the handle) painting the last painted plank with a wet brush; panel 1 the dry brush stands in the bucket, panel 4 the wet one | primitive gate (hand and brush are decor, not counted) |
| 14 | G2-378 | "pot" is drawn as a bucket (en) | yes | the pot gets a wire handle (a paint bucket); EN bank word `pot` → `bucket` (`helpIds` `bucket`; `PARTS.fence` gains `bucket`, `hand`) | validator r11 |

**Also fixed in the gate:** the stale "de / fi must REFUSE until its panel authors the block" assertions (all 11 blocks exist since Phase F; the gate failed on them before this round) now aim at a synthetic `xx`; the F2 control and PR6 plans no longer use the cake. Every face is now rendered and `verify()`-ed in all 11 locales' own strings and banks, so the new F1 / F2 / F4 rules run in every locale.

**Strings.** EN changed in `data/b6/story-sequencing.js` (F1 + F4 instructions, fence helpWord), the two face specs (`K-381`, `G1-402` i18n.en, byte-identical to what `gen-b6var-specs.js` emits from the rows) and `i18n/strings.en.json` (those two keys only; `build-en.js` was not run). No draft, bank or non-EN string was edited.

**Other gates.** `gate-variation-distinct --batch=b6`: every variation differs (75 pairs). `b3-baseline --check`: 22 drifts, ALL `G1-204` (sink-float; `data/science/sink-vs-float.json`, another family's files) — none from this family.

### Locale strings to re-author
- de es pt fr it nl sv da no fi `K-381` `strings.first-next-last-cut.instruction`: must also tell the child to glue each strip's pictures on the line that carries the SAME MARK (the teal dot / triangle), still naming words3 verbatim.
- de es pt fr it nl sv da no fi `G1-402` `strings.sequencing-sentences.instruction`: must now say to NUMBER each story's sentences in order in the (empty) boxes, then draw a line from every sentence to its picture — the sentences are printed scrambled, each with an order box. The title may keep "match"; a panel that wants it to name the ordering too may say so.
- de es pt fr it nl sv da no fi `stories.fence.helpWords` / `helpIds`: the pot is now drawn as a paint BUCKET with a wire handle and a hand paints with a real brush; a word meaning a cooking pot should become the locale's bucket / paint-can word (id `bucket`; `pot` stays legal).
- es `stories.paper-chain.sentences[2]` ("Luego, pegan dos tiras en forma de aro"): reads as two strips making ONE ring while the picture shows TWO rings — e.g. "…con dos tiras hacen dos aros".
- es `G2-378` `strings.retell-with-starters.title` ("para crear cuentos"): the sheet carries ONE story — singular.
