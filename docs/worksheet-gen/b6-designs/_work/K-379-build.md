# K-379 `story-sequencing` — base build record (2026-09-23, revised after the lead review)

Built from the FINAL `K-379-story-sequencing.md` §2 (base) + §5 (data + gates) under `_BUILD-BRIEF.md`, then reworked for the lead review (SPARSE page, weak stories). EN only; the other ten locales REFUSE until their panel block exists (`bank()` throws). Nothing shared edited; nothing staged or committed. Faces: `_work/K-379-faces.md`.

## Files (all new, type-scoped)
- `scripts/worksheet-gen/primitives/story-panel.js` — `storyPanel({story, rank, w, frame, vh, uid})`, `viewWindow(story, vh)`, `setOnly`, `MIN_W 100` (throws below). Strokes are declared in page px and stay constant at every size. Bite discs are masked to their food.
  - Review addition, the **zoom**: a card taller than 4:3 (`vh` > 120) crops in on the union of every panel's prop, padded 9 units, so the thing that changes fills the card.
  - The window is the same for every panel of a story, so the stage stays byte-identical.
  - Set rects and lines are cut to the window. The page lints measure unclipped geometry, and an uncut 160-wide table band overflowed the page from an edge card.
- `scripts/worksheet-gen/data/b6/story-sequencing.js` — `STORY_SEQUENCING.en` + `COMMON` (**12 stories**, `DROPPED` list with reasons, `backdrop()`, the irreversible and excluded lists, SCRAMBLE4/SCRAMBLE3, MODES, SENTENCE_POOL). Gitignored → `git add -f`.
- `scripts/worksheet-gen/templates/components-b6/story-sequencing.js` — base: `ssCord`, `ssHungRow` (now a flex row: CSS-framed card that grows with its row, string, tag), `ssTag` (80×76, 3 px dashed), `ssPage`; face components are listed in the faces record.
- `scripts/worksheet-gen/types/k/K-379-story-sequencing.js` — spec (`mode:'base'` + the five face modes).
- `scripts/worksheet-gen/qa/verify-b6-story-panel.js`, `scripts/worksheet-gen/qa/verify-b6-story-sequencing.js` (exports `validateBank`, `validateStories`).

## Lead review 2026-09-23 — what changed
1. **SPARSE, fixed.** The old page had empty bands of 230, 250 and 220 px. The page is now built as follows:
   - **Cards:** they take the whole 639 lane (4 × 153 + 3 × 9 at d2) and are near-square (vh 198, 153 × 189 min).
   - **Card height:** each row may grow by 50 px; the card absorbs the growth.
   - **Tags:** 80 × 76.
   - **Top:** the first line is top-anchored.
   - **Measured bands** (max empty band / fill):

     | chrome | max band | fill |
     |---|---|---|
     | 814 | 33 px | 96 % |
     | 722 | 16 px | 98 % |
     | 677 | 16 px | 98 % |

     The limit is ≤ 40 px, the stricter face-brief value; the lead asked ≤ 60. d1 measured 35 / 16 / 16 px, d3 40 / 16 / 16 px.
   - **New gate + poisons (both directions):** SPARSE + FILL, with PS1 (rows fixed at their minimum → a band > 40 at 814) and PS2 (cards vh 260 at the 677 chrome → content below the body).
2. **Stories.**
   - **Dropped (reasons recorded in `COMMON.DROPPED`):**
     - `present`: panel 3 was a jumble.
     - `flat-tyre`: a child could not see what happened; the repair is also a procedure.
   - **Redrawn:**
     - `hopscotch`: pale creamDeep paving slabs, with chalk squares and a stick in coral. The dark grey slab read as a screen.
     - `sandwich` P4/P5: the bites are now at the outer corner and edges of the cut half (the classic bitten sandwich), plus crumbs.
   - **Recomposed** so the zoom works: side objects moved under or in front of the scene.
     - jar onto a wall shelf; knife on the board
     - crayon and pencil under the sheet
     - fence: tall pickets, with the pot in front
     - snowman: shorter tracks
     - paper chain: tighter links, scissors in front
     - beach: towel, trail and shell closer together, plus one calm cloud
     - collage: pieces and glue stick nearer the fish
     - cake: candles in front of the stand
   - **Also fixed:**
     - the desk pinboard is removed (it showed as a half-cut box once zoomed)
     - the garden grass tufts are redrawn as separate blades (they read as the letter "M")
   - **Result:** **12 stories**. Measured zoom: apple 1.67 · banana 1.66 · letter 1.57 · hopscotch 1.52 · cake 1.51 · sandwich 1.40 · drawing 1.40 · snowman 1.40 · fence 1.26 · paper-chain 1.25 · collage-fish 1.22 · beach-walk 1.14.
   - **Pools:** base 12 (es/pt 11) · F2 10 (es/pt 9) · F1/F3 12 (es/pt 11) · sentence pool 8.
3. `n5` is still exactly sandwich + hopscotch, so d3 still hangs both.

## Gate results (final)
- `node qa/verify-b6-story-panel.js` → **PASS (1158 assertions, 7/7 poisons killed)**.
  - Poisons: PR4, PR10, PE1, PE2, PG, PR5, PR5b.
  - New: every story is zoomed at 200×150 / 153×198 / 120×208. For each: drawn irr counts match, the set is byte-identical, the window is identical, and carriers are ≥ 5 px.
  - Smallest carrier at w 100 = 5.00 px.
- `node qa/verify-b6-story-sequencing.js` (full) → **PASS (172 assertions, 36/36 poisons killed)**, faces included.
  - Base part: P1–P16, PR1, PR2, PR3, PR11 (now "a base config carrying `answer:'glue'`"), PS1, PS2.
  - Census, 400 seeds:
    - d2 rank-1 26.8/25.3/24.4/23.6 %; rank-4 24.0/23.8/26.6/25.6 %
    - d1 rank-1 28.4/43.6/28.0 %
    - d3 rank-1 18.5/19.8/18.3/21.5/22.0 %; rank-5 20.1/18.5/21.0/21.0/19.4 %
- **Baseline:** `node tools/b3-baseline.js --check --quick` → `checked build 4000 + enum 299 in 26s: 0 drifted (0 expected), 0 missing` **PASS**.
- **Base byte-identity across Phase E:** the scratch snapshot (d1/d2/d3 × 30 seeds, sha1 of bodyHtml) was written after the review and garden-tuft fixes, re-checked after every face edit → `base byte-identical: 90/90 hashes`.
- `render/one.js K-379 null {1,2,3} en`: lints clean, verify clean. `i18n/build-en.js buildEn()` passes (called, not written).

## Deviations from the design (each measured)
1. **Card format.** The base cards are no longer the 144 × 108 4:3 cards with an SVG frame. They are 153 wide and near-square (vh 198), zoomed, with a CSS frame that grows with its row. The lead review ordered this, and the SPARSE numbers above are the reason.
2. **Greyscale threshold 2 % → 1 %**, calibrated as §5 instructs. Measured at vh 120 / 144 px: 2 % failed correct single-change pairs. Identical and 3 × 3 dot changes still fail. With the new corner bite, the smallest shipped pair is sandwich 3→4.
3. **n = 5 law gives 56 permutations, not 74.** It matches §2 exactly at n = 3 and n = 4. The draw is IPF-weighted (`LAW5_W`), so rank 1 and rank 5 each land in every slot 20 % of the time.
4. **d3 hangs two stories** (n5 = sandwich + hopscotch). Its cards are portrait (120 × 156+) and carry more sky than d2. Recorded, not published.
5. **d1 middle-slot share:** it measures 43 %. Asserted as ≤ 56 % in the middle slot and ≥ 19 % in every slot.
6. **cake `cutFace` dropped from the counted change**, because the crumbs-only panel has no cake.
7. **Rule-7 conflicts inside §2:** the towel and sand dots are pale, the road is gone (flat-tyre dropped), the snowman tracks are `grid` in the prop (`grid` was added to PROP_FILLS), and the bread crust is coralSoft.
8. **§5 P11 as literally written is silent** under the letter-boundary rule. The poison puts the whole word "bite" in sentence 3, and it fires on rule 10.

## PNGs (all read by me)
- Base: `scripts/worksheet-gen/out/dev/K-379-null-d1-en.png`, `…-d2-en.png`, `…-d3-en.png`.
- Chrome stress: `out/dev/K-379-gate-stress677-d2.png` (+ `stress814-*`, `stress722-*`).
- Sheets:
  - `out/dev/K-379-story-panels-{colour,grey}-w{100,240}.png` (4:3, unzoomed)
  - the zoomed page-card sheet, read in colour and grey at 153 × 198 (scratch)

## Open items
- A human print check is still wanted on the thinnest "before" states: snowman P1 (a lone ball) and hopscotch P1 (empty paving + chalk).
- On the pavement cards at d1, the joint lines stop where the card grows beyond its SVG. The CSS sky is plain creamDeep there. Cosmetic.
- Panels author `data/b6/locales/story-sequencing.<loc>.json`.
