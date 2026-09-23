# K-380 `healthy-habits` — Phase E: the five faces (2026-09-23)

Built per `_FACE-BRIEF.md` and §3 of `K-380-healthy-habits.md`. Nothing is committed.

- **All five faces are CODE faces** on one additive knob, `mode`, which the base spec `types/k/K-380-healthy-habits.js` reads through `FACE_BUILD` / `faceVerify`.
- **Rows** live in `tools/b6var-rows/healthy-habits.js`. Running `node tools/gen-b6var-specs.js` emits the five thin specs.
- **Face components** are in `templates/components-b6/healthy-habits.js`: `hhStepCard hhStepGrid hhPhaseCell hhPhaseGrid hhPairRow hhPairRows hhReasonMatch hhWeekChart`.
- **The face gate** is `qa/b6-healthy-habits-faces.js`, called by `qa/verify-b6-healthy-habits.js`.
- **The bank** (`data/b6/healthy-habits.js`, gitignored, needs a force-add) gained `COMMON.SHOWN_POSE` / `SHOWN_CUE`. The `coOccur` F4 / F5 sets now point at the tool-shown poses, and there is a new `F3pairs` set.

**Base byte-identity.** Before any edit I snapshotted `build().bodyHtml` for d1-d3 en across variants 1-8, plus the long-chrome page. After all edits: **BYTE-IDENTICAL (25 base snapshots)**. `b3-baseline` also passes (lines below).

## The close-ups were redrawn (`primitives/habit-pictogram.js`)
The build-round drafts were rough, and I had flagged them.

**F1 hands (and the F3 soap pair).** The solid black mittens read as boxing gloves. They are now line-art hands: white, ink outline, four fingers and a thumb, and a tealSoft cuff. The hands carry no skin colour, because colour is never tied to a person.
- The running water is drawn over the hands. Drawn behind the fingers, it read as a tap that was off.
- The rim is 8.5 units tall, so it clears the 8 px floor.
- Rinse bubbles now fall into the bowl, clearly below the hands.
- The hands-soap lather is seven bubbles around both hands.
- The redrawn F1 states measure 0.60-0.64 1-bit Jaccard (limit 0.72). That emptied the primitive gate's `RULE1_PENDING` ratchet, which the gate now asserts is empty.

**F2 cards.** Each card has one big object. The brush is always the same brush and the tube always the same tube.
- **open-tube**: a large tube, the cap off beside it, a hand on the cap, and a turn arrow.
- **paste-on-brush**: the brush along the bottom, the tube tipped over its head, a curl of paste, and a hand on the tube.
- **chewing**: three molars on the gum, with the brush on top and back-and-forth arrows.
- **outside / inside**: a U-shaped arch of ten teeth, with the brush head outside it or in the middle of it.
- **spit**: the child bent over the sink in profile, with white foam drops falling from the mouth into the bowl. There is no cup and no glass.
- **rinse-brush**: the brush under the running tap, with three foam bubbles falling below the bristles.
- **brush-in-cup**: the brush standing in a cup on the rim.
- There is no clock, no sand-glass, no mouth-rinse and no paste amount.

**F4 / F5 tool-shown poses (new):**
- `wash-hands-soap`: lather on the hands.
- `brush-teeth-brush`: the brush in the mouth, with foam.
- `sleep-bed`: the sleep scene in a bed.
- `sun-hat`: a hat on the head, next to the sun.
- `drink-water`: now tips the head and chest back. Upright it measured 0.79 against brush-teeth-brush; tipped, 0.55. `drink-water` is not a base pose, so the base is unchanged.

**F3 tissue-in-bin.** The tissue is now inside the bin mouth, with two falling dashes above it. The verify reads "tissue centre inside the bin box".

The primitive gate: **`qa/verify-b6-habit-pictogram.js` PASS (6449 assertions, 7/7 poisons killed)**, run before the last spit-drop change; the final re-run line is at the end.
- Worst 1-bit Jaccard per set: base 0.677, F1 < 0.72, F2 0.661, F4 0.619, F5 0.548.
- The F3 sets are "rows": each row is a minimal pair, which rule 2 owns (25.7 / 21.0 / 15.8 / 12.1 % differ, 0-1 px outside the declared parts).
- 0 parts under 8 px. New auditable `THIN_OK` entries: `fall` and the chewing `scrub` arrows, both motion marks.

## The faces
The common gate applies to every face:
- `verify()` re-derives each answer from the DRAWN parts and compares the stamps only.
- **SPARSE**: no blank band over 40 px from the instruction to the footer.
- **FILL**: content reaches at least 85 % of the body.
- The stage stays inside the body and above the footer.
- Text appears only in the face's word slots.
- No coral or code colour appears inside a drawing.
- No digit appears on F2 to F5.
- Every `data-lcs-answer` stamp is empty.

Each face renders in en at its own chrome, a one-line chrome (814), the 722 fixture and the 677 fixture, plus greyscale.

| face | id | knob | what the child does | poisons it owns | PNG (d2 en) |
|---|---|---|---|---|---|
| F1 Hand Washing Steps | **K-382** (K) | `mode:'hand-washing-steps'`, layout `steps-write`, 5 cards, rows `minmax(200,1fr)` | writes 1-5 in the empty dashed boxes beside five sink close-ups (wet, soap, rub, rinse, dry) | P14 rinse without its falling bubbles · FO1 printed in the routine's own order · SP / FL | `out/dev/K-382-null-d2-en.png` |
| F2 Brushing Teeth: Before, During and After | **G1-403** (G1) | `mode:'brushing-teeth'`, layout `phase-chips`, 8 cards | circles before / during / after beside each of eight brushing cards | P15 rinse-brush without foam · P16 chip order varied in one cell · FS1 a card stamp swapped (the drawing wins) · FG1 sorted by phase · SP / FL | `out/dev/G1-403-null-d2-en.png` |
| F3 Stop the Germs: Choose the Healthy Way | **G1-404** (G1) | `mode:'stop-the-germs'`, layout `choice-pairs`, 4 rows `['cough','tissue','cup','soap']` | circles the one tile of two that stops germs, in each row | P17 healthy side LRLR · FC1 spray added to the elbow cough (0 healthy tiles) · SP / FL | `out/dev/G1-404-null-d2-en.png` |
| F4 Healthy Habits: Why Do We Do Them? | **G2-379** (G2) | `mode:'why-habits'`, layout `reason-match`, 5 pairs (`reasonD2`) | draws a line from each habit (tool shown) to its reason sentence | FR1 two reason stamps swapped (the node-side literal check: a card must print the bank's reason for its stamp) · FR2 every reason straight across · SP / FL | `out/dev/G2-379-null-d2-en.png` |
| F5 Healthy Habits Chart for the Week | **G1-405** (G1, OPEN) | `mode:'habit-chart'`, layout `week-chart`, 5 rows × 7 days | ticks each habit each day | P19 34 tick squares · FD1 a digit in a label · SP / FL | `out/dev/G1-405-null-d2-en.png` |

**Pooled at 400 seeds** (the full-run numbers are in the gate output below):
- F1: no step in its own slot (0 %); the worst step-in-slot share is ≤ 35 %.
- F2: each phase appears in each reading slot 15-55 % of the time.
- F3: the healthy tile sits left 40-60 % overall and in each row.
- F4: a reason sits straight across from its habit on ≤ 25 % of rows.

**Per-page rules on the shipped instance**, asserted by verify() on every render:
- F1: no card in its own slot; at least 3 cards moved; not the reverse; at most one consecutive-routine neighbour.
- F2: at most one same-phase neighbour; not a staircase; no column all one phase.
- F3: exactly 2 left / 2 right; not LRLR or RLRL.
- F4: at most one reason straight across.

**Apparatus lint (AP ×5).** For each face, an instruction naming apparatus the face does not print fails validator rule 9.

**The base gate's P20** now feeds a face config that has LOST its `mode` (layout `steps-write`). The real base guard refuses it; a guard keyed on the level index would build it.

## Deviations from §3, each with its measured reason
1. **F1 layout is 2 columns × 3 rows with the fifth card centred** (the design had 3 + 2 cards of 200 × 268). At the 814 chrome the design's stack of 566 px ends at about 70 % of the body, which fails FILL. The card is now a plaque with the close-up beside the empty 64 × 60 box instead of above it, and the rows are `minmax(200px,1fr)`. The close-up measures 188-216 px, never under the 176 floor. `rowMin` is 200 because 212 overflowed the 677 fixture by 1 px.
2. **F2 chips are 160 × 40, not 184 × 40.** The design's chips spread across a 320 px cell left 60-70 px gaps between one card's chips and the next card's, so a chip read as belonging to the wrong card. Each cell is now ONE white panel with a soft border, holding a 128 px card and a compact chip stack with 8 px gaps. The chip text box is 156 px, still at least the design's 152 measure.
3. **F3 tiles grow with the row** (`minmax(140,1fr)`). A figure pair shares ONE viewBox, the union of both poses, so the two tiles draw at one scale. verify checks this to within 5 %.
4. **F4 plaques grow with the row**, and the figure fits its box with meet. The reason cards are 330 px wide, text 18 / 22, at most 3 lines.
   - **The `.ws-match` classes are not reused.** A own grid (plaque | dot | line zone | dot | card) carries the same geometry.
   - **The d3 `drink-water` reserve is not in the F4 co-occurrence set.** It is not on the d2 page.
5. **F5 tick squares are 52 px, not 44**, and every row is a bordered card. At the 814 chrome, rows fill to about 145 px, and white rows on a white page read as empty bands. The row head is 174 px (72 plaque + 8 + 94 label) so the table fits 639 px with its borders.
6. **F3's toilet reserve row is not drawn.** It is d3-only and unpublished. `faceTile` throws if it is asked for.
7. **F1's d3 "verb to copy" and F2's d3 `kaiOrder` boxes are not built.** The emitter ships ONE config for all three levels (`D` spread to 1/2/3). Both are unpublished d3 notes.

## Per-locale refusals visible from the bank shape
None can be declared yet; only the en block exists. Every face throws for a locale whose block is absent (`lib/b6-common.js bank()`). Recorded risks for the panels:
- **F2 fi**: the chips must each be ≤ 152 px. The inflected "harjaamisen jälkeen" (169.7 px) fails rule 1; the short forms fit, per the design.
- **F4, any locale**: if no reason can be written clear of every stem after using both reserves, F4 is refused there, per the design's contingency (b).
- **F5 es-MX**: `weekStart` is 1 in `data/b2/calendar.js`; the panel decides whether to set `weekStartOverride`.

## Open items for the panels / lead
- The pedagogue's greyscale read of the F2 cards at 128 px: `inside` (brush head in the middle of the arch) and `spit` (the child bent over the sink) are the least obvious.
- The F5 plaques are 72 px, per the design, so the figures inside are about 60 px. They read with their label, but could grow if the lead wants a wider row head.
- `drink-water` now leans back; the design pose was upright. Its F5 read is "drinking from a glass".
- The EN F2 instruction still says "when it happens". Native panels should audit "it" (it means each card's picture).

## Gate lines
(Pasted from the final runs below.)
- `node qa/verify-b6-healthy-habits.js` (full) → **PASS (2670 assertions, 49/49 poisons killed)**.
  - Pooled: F1 own slot 0 %, worst step-in-slot 28.7 %. F2 phase-in-slot 20.5..41.8 %. F3 healthy left 50.0 % (51/51/50/49 by row). F4 straight across 10.2 %.
  - All five faces are clean at their own chrome, 814, 722, 677 and greyscale. The base (d1-d3, the v2..v20 sweep, the chromes and greyscale) is still clean.
- `node qa/verify-b6-habit-pictogram.js` → **PASS (6449 assertions, 7/7 poisons killed)**.
- `node tools/gate-variation-distinct.js --batch=b6 --diffs=2 --family=healthy-habits` → `[b6:healthy-habits] compared 15 pairs over 5 faces against their bases + pairwise within family` / **`every variation differs from the deck its base publishes and from its siblings`**.
- `node tools/b3-baseline.js --check --quick` → `checked build 3980 + enum 299 in 26s: 0 drifted (0 expected), 0 missing` **PASS**.
- Base snapshot (d1-d3 en × variants 1-8 + long chrome) → **BYTE-IDENTICAL (25 base snapshots)**.
- `node i18n/build-en.js` → 743 types, title lint clean. `strings.en.json` was regenerated and carries the five faces.

## PNGs I read
- d2 en: `scripts/worksheet-gen/out/dev/{K-382,G1-403,G1-404,G2-379,G1-405}-null-d2-en.png`
- Greyscale: `scripts/worksheet-gen/out/dev/K-380-gate/<id>-d2-greyscale.png`
- Worst chrome: `scripts/worksheet-gen/out/dev/K-380-gate/<id>-d2-chrome-fi677.png`

What I saw:
- **F1**: five large sink close-ups whose hands read as hands. Wet and rinse differ by the bubbles in the bowl (the teaching point); soap is held between the hands; rub is surrounded by lather; dry is a towel held between the hands. The dashed boxes sit beside each card.
- **F2**: eight panels, each with its card and its own three chips. In greyscale, spit reads as a child bent over the sink and inside as the brush in the middle of the arch.
- **F3**: four rows of calm twins. The elbow cough is set against the spray; the tissue in the bin against the tissue on the floor; own cups against one shared cup; lather against water only.
- **F4**: tool-shown habits with 2-line reasons.
- **F5**: day heads Sun to Sat, five bordered rows, 35 empty 52 px squares.
- Nothing is clipped and nothing reaches under the footer at any chrome.

---

## Round 2 — the lead's review of G1-403 (2026-09-23): SUPERSEDES the "8 cards" above
The lead accepted K-382, G1-404, G2-379 and G1-405. G1-403 had one defect: **brush-in-cup** (a toothbrush standing in a cup by the sink) reads equally as "take the brush" (before) and "put the brush away" (after). That is two defensible answers.

**Decision: DROPPED, as the lead preferred.** A redraw cannot be unarguable without words, because the same cup-and-brush moment happens at both ends of the routine.
- F2 now ships **7 cards: before 2 (open-tube, paste-on-brush) · during 3 (chewing, outside, inside) · after 2 (spit, rinse-brush)**. Every phase has at least 2 cards.
- The seventh card is centred across both columns.
- `COMMON.PHASE_OF` no longer carries `brush-in-cup`. `COMMON.DROPPED_BRUSH` records why.
- The build refuses fewer than 2 cards in any phase.
- verify() fails a page carrying a dropped card (poison **FD2**), and fails fewer than 2 cards in any phase.
- The drawing stays in the primitive but is never offered.

**Audit of the other seven cards for the same class** (could a six-year-old defend another phase?):
- **open-tube** (cap off, hand on the cap, turn arrow): before. Nobody opens the tube after brushing.
- **paste-on-brush** (the paste curl going onto a clean brush): before.
- **chewing / outside / inside** (the brush ON the teeth): during.
- **spit** (a child bent over the sink with white foam drops falling from the mouth): after. Foam in the mouth exists only after brushing.
- **rinse-brush**: **strengthened**. The used foam now clings to the bristles (a new `foam` part inside the rotated brush), and three larger foam bubbles fall into the bowl. Without foam it would read as "wet the brush first" (a contested before step), so verify() now requires BOTH the foam on the bristles and at least 3 falling bubbles.
  - The new poison **P15b** removes the bristle foam and is killed. The old **P15** (the falling bubbles removed) is still killed.

**Round 2 gate lines**
- `node qa/verify-b6-healthy-habits.js` (full) → **PASS (2670 assertions, 51/51 poisons killed)**. F2 pooled over 400 seeds: phase-in-slot 22.3..51.2 % (limit 15..55). G1-403 is clean at its own chrome, 814, 722, 677 and greyscale.
- `node qa/verify-b6-habit-pictogram.js` → **PASS (6478 assertions, 7/7 poisons killed)**.
- `node tools/gate-variation-distinct.js --batch=b6 --diffs=2 --family=healthy-habits` → **every variation differs from the deck its base publishes and from its siblings**.
- `node tools/b3-baseline.js --check --quick` → `checked build 4000 + enum 299 in 22s: 0 drifted (0 expected), 0 missing` **PASS**.
- Base snapshot → **BYTE-IDENTICAL (25 base snapshots)**.

**PNGs read (round 2):**
- `scripts/worksheet-gen/out/dev/G1-403-null-d2-en.png`
- `scripts/worksheet-gen/out/dev/K-380-gate/G1-403-d2-greyscale.png`
- `scripts/worksheet-gen/out/dev/K-380-gate/G1-403-d2-chrome-fi677.png`

Seven panels, the last one centred. The rinse-brush card shows foam on the bristles and bubbles falling into the bowl. Nothing is clipped at 677, and no blank band is over 40 px.
