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

---

## Fix round 1 — the native panels' audit of the EN source (2026-09-23)
The drafts (`i18n/.draft-b6-<loc>.json`) were NOT edited. **The bank shape is unchanged: no new key for any panel.** The new ban reads each locale's words from image-vocabulary.

1. **BASE sleep plaque drew the bed** (3 panels). The lying child under a duvet, with a turned-down band, read as a child IN BED — the very tool it is matched to.
   - **Redrawn:** a child in striped pajamas, both arms up in a bedtime stretch, under a big moon and three stars. No bed, no pillow, no blanket.
   - `CUE_OF.sleep` is now `moon · stars · pajamas`.
   - **Gate:** base verify() and primitive rule 4 lost the own-tool exemption. NO plaque may draw any part of ANY shelf tool, including its own.
   - **Poison PP8** (the bed put back in the sleep plaque) is killed.
2. **BASE blow-nose read as sneezing into the hand** (fi, and the de addendum). That contradicts F3's elbow rule.
   - **Redrawn:** the child stands, both hands at the nose, the near hand pinching it (a finger closes on the nose tip), and one small white puff comes out of the nose. The head bows 10° over the hands. No spray, no open hand, no burst lines, no tissue.
   - Upright, it measured 0.787 1-bit Jaccard against brush-teeth. With the 10° bow: 0.706 at the 100-unit size and 0.652 as shipped.
   - `CUE_OF['blow-nose']` is now `burst · pinch`. The pinch survives d3's marks-off, so the page is readable without the hand-height fallback.
   - **Unhealthy-variant check (new):** `COMMON.UNHEALTHY_PARTS = spray · tissue · cup-shared` may never appear on a base plaque, checked in base verify() and in primitive rule 4b. **Poison PP9** (a sneeze spray on the blow-nose child) is killed.
3. **G2-379 reasons.** The reasons are rewritten and pinned in the hand-read claim table `REASON_READ` (an edited reason fails until re-read; poison RR1). The EN source is now:

   | habit | reason |
   |---|---|
   | wash-hands | "It clears away the germs from all the things we touched." (no longer fits brushing) |
   | brush-teeth | "It keeps our smile clean and bright." (no "holes" or cavities) |
   | sleep | "Our body and brain rest and get ready for a new day." |
   | move-body | "It makes us fit, fast and strong." (no body parts) |
   | sun-protect | "We do not get burnt on a hot, sunny day." (no "skin") |
   | drink-water (reserve) | "Our body needs it to work well." |
   | blow-nose (reserve) | "We can breathe easily again." (no "nose") |

   **New validator rule 3b:** a reason never names its own habit's body part or tool.
   - `COMMON.REASON_BAN_KEYS` lists image-vocabulary keys per habit (hand, finger, sink, faucet, towel · tooth, mouth, lip, tongue, toothbrush, toothpaste · bed, pillow, blanket, eye · leg · hat, sunscreen · glass, cup, mouth · nose, tissue · comb, hair).
   - The validator reads each key's singular and plural in the locale. A form of 4 or more letters also bans its inflections (nenä → nenän).
   - "skin", which the vocabulary lacks, is added to the EN `labelStems.sun-protect`.
   - Poisons: **RB1** en "…through our nose…", **RB2** en "…our teeth…", **RB3** de "…Händen…" — all killed.
4. **G2-379 / G1-405 titles** are "Healthy Habits: Why Do We Do Them?" and "Healthy Habits Chart for the Week". "Healthy habits" covers sleep, move and drink, so both titles are correct as they are; no change.
5. **G1-403 spit read as crying or face-washing** (da). The teardrops falling past the face are gone.
   - **Redrawn:** the child bends LOW over the bowl, still holding the brush up in one hand, so the card is about brushing. White toothpaste FOAM bubbles leave the mouth and fall into the bowl.
6. **G1-405 row labels, balanced wrapping** (fr addendum).
   - `text-wrap:balance` is set on every row label.
   - verify() now fails any wrapped label whose line ends with a short word (3 letters or fewer: les, die, og).
   - Tested with fr "se laver les mains", de "die Hände waschen", fi "pestä kädet hyvin", da "børste tænderne" and it "lavarsi i denti". The balanced render is clean.
   - **Poison LW1** switches balance off with the same labels and is killed.
   - Render: `out/dev/K-380-gate/G1-405-long-labels.png`

**What moved in the base, and what did not.** I snapshotted the base `bodyHtml` before the fix, masking the two redrawn pictograms. After the fix: **IDENTICAL outside the redrawn sleep / blow-nose pictograms (24 base builds)**. K-380 is not in `out/b3-baseline.json` (the ids were added after the capture), so the release baseline cannot see this change. The only intended base change is those two drawings.

**Fix round 1 gate lines**
- `qa/verify-b6-healthy-habits.js` (full) → **PASS (2670 assertions, 56/56 poisons killed)**
- `qa/verify-b6-habit-pictogram.js` → **PASS (6634 assertions, 9/9 poisons killed)**. Worst base Jaccard 0.706 (brush-teeth ~ blow-nose); as shipped (fit) 0.652.
- `gate-variation-distinct --batch=b6 --diffs=2 --family=healthy-habits` → every variation differs from the deck its base publishes and from its siblings
- `b3-baseline --check --quick` → `checked build 4000 + enum 301 in 26s: 0 drifted (0 expected), 0 missing` PASS

**Draft validator** (`node tools/validate-b6-draft.js <loc>`, drafts untouched). Only the healthy-habits errors are listed here; the other errors belong to other families.

| loc | healthy-habits errors |
|---|---|
| da | blow-nose reason names "næse" (rule 3b) |
| fi | blow-nose reason names "nenä" |
| fr | blow-nose reason names "nez" |
| nl | brush-teeth reason names "mond"; blow-nose reason names "neus" |
| sv | wash-hands reason names "fingrar"; blow-nose reason names "näsa" |
| de, es, it, no, pt | none |

**For every panel:** re-author the `reasons` block against the NEW EN source above, with the same keys. The old EN reasons ("It takes away the germs we picked up", "keeps holes away", "heart and muscles", "skin", "nose") are gone, so drafts translated from them are stale even where the validator passes. Then re-read each reason against the other habits on the page: it must fit exactly one.

**PNGs I read (fix round 1):**
- `scripts/worksheet-gen/out/dev/K-380-null-d2-en.png` (new sleep and blow-nose)
- `scripts/worksheet-gen/out/dev/G1-403-null-d2-en.png` (new spit card)
- `scripts/worksheet-gen/out/dev/G2-379-null-d2-en.png` (new reasons)
- `scripts/worksheet-gen/out/dev/G1-405-null-d2-en.png`
- `scripts/worksheet-gen/out/dev/K-380-gate/G1-405-long-labels.png`
- `scripts/worksheet-gen/out/dev/K-380-probe-a-grey.png` (sleep + blow-nose at 240 px, greyscale)

**Open for the panels / lead:**
- The pajama-stretch sleep child is smaller in its plaque than the other children (the night sky takes width). It fills about 85 % of the width.
- The blow-nose puff is a small white cloud at the nose. A pedagogue's read is still advised.

### Fix round 1b — the sleep child drawn at the same height as the others (lead read, 2026-09-23)
The pajama child was about half the height of the other four. The night sky had made its box wide, so the plaque scaled the child down.

**The fix: all six base standing poses now share ONE box size.** Each box is 55 × 113 units (y −16 .. 97), centred on its own drawing (`POSE_BOX`). At every level, the plaque therefore scales every child to the same height.
- The sleep sky moved into the space above the head: the moon sits centred between the raised hands, with stars in the two top corners. Still no bed and no pillow.
- The sun of sun-protect moved to the top corner, so its box also fits the 55-unit width.
- d2 plaque height is now 190..232 (was 236). A width-limited child fills at least 75 %, and the shelf tools went from 120 to 124 px so the 814 chrome keeps its blank bands at or under 60 px (58 / 60).

**verify() now asserts** that every standing child is the same height: head top to feet bottom, measured on the render, within ±10 % of the page median. **Poison PH1** (the sleep child drawn at half height) is killed.

**Gate lines**
- `qa/verify-b6-healthy-habits.js` (full) → **PASS (2670 assertions, 57/57 poisons killed)**. d1, d2, d3, the v2..v20 sweep, chromes 814 / 722 / 677 and greyscale are all clean.
- `qa/verify-b6-habit-pictogram.js` → **PASS (6634 assertions, 9/9 poisons killed)**. Base worst 0.707 (brush-teeth ~ blow-nose); 0.678 as shipped.
- `gate-variation-distinct --batch=b6 --diffs=2 --family=healthy-habits` → every variation differs from the deck its base publishes and from its siblings
- `b3-baseline --check --quick` → `checked build 4000 + enum 301 in 37s: 0 drifted (0 expected), 0 missing` PASS

**PNGs read:**
- `scripts/worksheet-gen/out/dev/K-380-null-d1-en.png`
- `scripts/worksheet-gen/out/dev/K-380-null-d2-en.png`
- `scripts/worksheet-gen/out/dev/K-380-null-d3-en.png`
- `scripts/worksheet-gen/out/dev/K-380-gate/K-380-d2-greyscale.png`

### Fix round 1c — short words glued in the G1-405 row labels (pt generation, 2026-09-23)
The pt label "lavar as mãos" left "as" at the end of line 1. The balanced-wrap gate caught it at generation.

**Fixed in the component, not per locale.** `glueShortWords()` in `templates/components-b6/healthy-habits.js` wraps every word of 3 letters or fewer, together with the word after it, in a `white-space:nowrap` span. It does this in the RENDERED markup only. The bank and strings keep plain spaces and no U+00A0, so there is nothing to normalise in any page-vs-bank check: `innerText` reads the same words and spaces. Balanced wrapping then evens the lines.
- verify() now walks every text node of a label, because labels now contain the glue spans.
- The long-label control includes pt "lavar as mãos".
- **Poison LW1** now removes BOTH the glue and the balanced wrap, and is killed.

**Gate lines**
- G1-405 d2 renders in all 11 locales (en, de, es, pt, fr, it, nl, sv, da, no, fi): lints clean, verify clean.
- I read pt ("lavar / as mãos", "escovar / os dentes", "mexer / o corpo"), fr ("se laver / les mains", "boire / de l'eau"), it ("lavarsi / le mani", "lavarsi / i denti") and es ("lavarse / las manos", "cepillarse / los dientes").
- `qa/verify-b6-healthy-habits.js` (full) → **PASS (2670 assertions, 57/57 poisons killed)**
- `gate-variation-distinct --batch=b6 --diffs=2 --family=healthy-habits` → every variation differs from the deck its base publishes and from its siblings
- `b3-baseline --check --quick` → `checked build 4000 + enum 321 in 21s: 0 drifted (0 expected), 0 missing` PASS

---

## Fix round 2 (landing audit, 2026-09-23)
Findings from `landing-audit/pass1-{en,de,es,fr,nl}.md`, each reproduced on `out/b6-sweep/<loc>/<ID>-null-d2-<loc>.png` before any change. Nothing committed. Non-en drafts and banks were NOT edited.

| id | finding (panels) | reproduced? | fix | gate |
|---|---|---|---|---|
| K-380 | the nose-puff child and the brushing child look nearly the same (fr); en misread the puff as "a mouth full of foam"; es; nl: soap a second answer | YES: plaque 3 (blow-nose) was read as brushing by 2 panels | the design's recorded contingency applied: `baseD2` blow-nose → **sun-protect** (`baseD2Contingency`, "if the human read of blow-nose fails"). d3 (unpublished) unchanged | base verify + pictogram rule 1b green; 11-locale sweep verify clean |
| K-380 | children already USING the thing they "need" (en) | YES (the washing child is under the tap, the brushing child foaming) | EN title / instruction → "Healthy Habits: What Does Each Child **Use**?" / "Draw a line from each child to the thing that child **uses**." (the habit IS in progress on every plaque; `register-b6-en-content` already says "what we use") | validator rule 9 (child, line) clean |
| K-380 | child 3 sits straight above its own answer (en) | NOT reproduced: the child above the toothbrush was the blow-nose child (own tool: the tissue box). The finding is the misread above; verify's derangement (no offset 0) holds on every render | none | existing P3 / derangement asserts |
| K-380 | figures adult-proportioned (fr) | REFUSED (measured): head r 10 in a 90-unit standing figure = 22 % of height; a 4-6-year-old is ~20 %, an adult ~13 %. The silhouettes already have child proportions | none | none |
| K-382 | wet and rinse are one drawing but the bubbles (en, de, fr, nl) | YES | rinse now draws the soap **SUDS still on the hands** (6 bubbles on palms / fingers, part `suds`) plus the falling bubbles; wet stays clean hands | face verify: rinse ≥ 3 suds inside a hand box, no other card any suds (**P14b** rinse without suds KILLED, **P14c** suds on wet KILLED); primitive rule 3b (**PP10**, **PP10b** KILLED) |
| G1-403 | cap card = opening or closing (en, de) | YES | `open-tube` **DROPPED** (`DROPPED_BRUSH`) | **FD4** (put back) KILLED |
| G1-403 | brush under the tap = wetting or rinsing (en, de, es) | YES (the foam cue did not hold at 128 px) | `rinse-brush` **DROPPED** | **FD3** (put back) KILLED |
| G1-403 | spitting child = during or after (en, fr) | YES (brush held up) | spit redrawn: the brush lies DOWN on the rim, the hand rests on the rim, foam still leaves the mouth (child drawn at 0.85 so the brush fits full size) | face verify "the spit brush lies below the head" (**P15** held up KILLED); primitive rule 9 (**PP11** KILLED) |
| G1-403 | (the replacements) | n/a | two NEW state cards whose phase is the same in every locale: **dirty-teeth** (one big tooth with plaque spots, before) and **clean-teeth** (the same tooth with sparkles, after). 7 cards: before 2 · during 3 · after 2 | verify derives them from drawn parts (plaque XOR sparkle, no brush; **P15b** both cues → unreadable KILLED); primitive rule 9 + declared minimal pair (37.2 % differ, 0 px outside); rule 1 F2 worst 0.628 |
| G1-403 | cards 4 and 5 near-duplicates (es) | reproduced (outside / inside arch) but REFUSED: no ambiguity of answer (both "during"), and they are the design's "brush every side" (§3 F2; KAI in de, praised by the de panel) | none | none |
| G1-403 | EN instruction ("when it happens" does not fit the new state cards) | n/a | "For each picture, circle before, during or after brushing." (one line; `picture` added to F2's apparatus list) | rule 9 clean |
| G1-404 | row 2: soap foam vs plain water, both hand washing (en, de, es, fr, nl) | YES | the other tile is now **hands-dirty**: the same hands at the same sink, the tap OFF, germs on the palms (part `germs`). `hands-water-only` stays in the primitive, never offered | face verify: healthy hands tile = lather + stream + no germs; other = germs + no stream; a running-water other tile fails "itself hand washing" (**FW1** water-only back KILLED, **FW2** germs on the lather KILLED); primitive minimal pair hands-soap / hands-dirty 26.5 % differ, 0 px outside |
| G2-379 | the sleep picture straight across from its reason (en, de, es, fr) | YES (1 of 5 given by position) | F4 is a full **derangement**: 0 straight across, not the reverse, not a constant shift (`reasonOrderTell`) | shipped instance: verify fails any straight-across row or constant shift (**FR3** one straight across KILLED, **FR4** constant shift KILLED, FR2 KILLED); pooled 400: straight across 0.0 %, offsets 1-4 = 24.6 / 25.5 / 24.9 / 25.1 % (10..40) |
| G1-405 | "sleep" is ticked by every child every day, no decision (en, de) | YES | EN `labels.sleep` = "go to sleep early" (glue-safe: "go to sleep" / "early") | validator **rule 2b**: labels.sleep must be a phrase, not one word (**P22** en "sleep" KILLED; en control passes; it fires on all 10 current non-en drafts, see below) |
| titles | G1-404 de/es/fr/nl name one habit; G1-405 es/nl omit water; G2-379 nl "Hygiëne en verzorging" (2 of 5 are hygiene); G1-403 de "dabei" vs chip "beim Putzen", nl "tijdens" vs chip "bij" | reproduced on the renders | locale strings, listed below, not authored | none |

**Primitive** (`primitives/habit-pictogram.js`, sole consumer = this family): rinse + suds · new hands state `hands-dirty` (+ `germ()`) · new brush cards `dirty-teeth`, `clean-teeth` (`bigTooth()`) · `spit` redrawn. **Bank** (`data/b6/healthy-habits.js`, gitignored, force-add): baseD2, PHASE_OF, DROPPED_BRUSH (+ open-tube, rinse-brush), GERM_PAIRS soap other, coOccur F2 / F3pairs, EN strings base + brushing-teeth, labels.sleep. **Spec** (K-380): F1 suds, F2 derivations + spit rule, F3 hands verdict, F4 derangement build + verify, `reasonOrderTell` exported. `types/g1/G1-403-…js` i18n.en synced by hand (gen-b6var-specs rewrites every family). `i18n/strings.en.json` rebuilt with `i18n/build-en.js`.

### Gate lines (fix round 2)
- `node qa/verify-b6-healthy-habits.js` (full) → **PASS (2674 assertions, 66/66 poisons killed)**. d1/d2/d3, the v2..v20 sweep, chromes 814/722/677, the long chrome, greyscale and all five faces are clean. F1 pooled own slot 0 %, worst 28.7 %; F2 phase-in-slot 22.5..48.5 %; F3 left 50.0 % (51/51/50/49); F4 straight across 0.0 %.
- `node qa/verify-b6-habit-pictogram.js` → **PASS (7414 assertions, 13/13 poisons killed)**.
- `node tools/gate-variation-distinct.js --batch=b6` → `[b6] compared 75 pairs over 25 faces …` / **every variation differs from the deck its base publishes and from its siblings**.
- `node tools/b3-baseline.js --check` → `checked build 33000 + enum 321: 22 drifted`. **All 22 are G1-204 (sink-float; `data/science/sink-vs-float.json` was modified at 18:06 today, not by this family). No healthy-habits file feeds G1-204; 0 drift anywhere else.**
- Re-rendered K-380, K-382, G1-403, G1-404, G2-379, G1-405 × all 11 locales (d2, `out/b6-sweep/<loc>/`): **66/66 verify + lints clean**.

**PNGs read at print size:** en K-380, en G1-403, en G1-405, de K-382, fr G1-404, es G2-379, sv G1-405, no G1-403, and the zoom sheet `out/dev/K-380-hh-zoom-colour.png` (wet / rinse / hands-soap / hands-dirty / spit / dirty / clean at 220-260 px). Open for the lead: the spit card reads at 128 px but is small (child at 0.85, the brush lying on the rim).

### Locale strings to re-author
(`<loc> <ID> <field>: what it must now say, and why`)
- **all 10 (de es fr it nl pt sv da no fi) K-380 title + instruction**: "use", not "need". Each child is shown IN the habit; the line goes to the thing the child uses (hat / bed / toothbrush / soap / comb). The d2 plaques are now sleep · wash · SUN (hat) · comb · brush, with no nose child. A title framing all five as hygiene / Körperpflege now also covers sun protection: check that it still fits.
- **all 10 G1-403 instruction**: "For each picture, circle before, during or after brushing." Two cards are now states (a dirty tooth, a clean tooth), so "when it happens" no longer fits. Keep it to one line.
- **all 10 G1-405 labels.sleep**: a DECISION phrase, never the bare verb (rule 2b fires on every current draft). EN "go to sleep early"; the de panel offered "früh ins Bett gehen". Mind the short-word glue: a chain of words of 3 letters or fewer is one unbreakable span (EN "go to bed early" would overflow 94 px).
- **es G2-379 reasons.sun-protect**: "…un día de mucho **sol**". Sunburn comes from the sun, not from heat.
- **fr G2-379 instruction**: agree with "chaque bonne habitude" (feminine): "pourquoi on la fait" / "pourquoi c'est utile".
- **de G1-403 title**: the title says "dabei", the chip says "beim Putzen". Use the same word in both.
- **nl G1-403 title / chips / instruction**: the title says "tijdens", the chips and the instruction say "bij" (design §4 nl asked for ervoor / tijdens / erna). Use one word everywhere.
- **de / es / fr / nl G1-404 title**: it names only the elbow cough, but the page tests four ways (elbow, soap vs dirty hands, own cup, tissue in the bin). Title the whole page (de panel: "Keime stoppen: Was hält Keime auf?").
- **es / nl G1-405 title**: it omits drinking water (the 5 rows are brush, wash, move, drink water, sleep). Name all of them or none.
- **nl G2-379 title**: "Hygiëne en verzorging" over-claims (only 2 of 5 are hygiene; move, sleep and sun are not). Use a head that covers all five.
