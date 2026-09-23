# K-380 `healthy-habits` — base build report (2026-09-23)

Built from the FINAL `K-380-healthy-habits.md` §2 (base) + §5 (data + gates) under `_BUILD-BRIEF.md`. No face spec emitted. Nothing shared edited; `git add`/commit left to the reviewer (`data/` is gitignored: force-add `data/b6/healthy-habits.js`).

## Files (all type-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/primitives/habit-pictogram.js` | NEW primitive: `habitFigure` (12 poses, `marks:false` option), `twoFigures` (own / shared cup), `habitTool` (8 tools, additive `ground:true`), `handsView` (F1 5 states + the F3 soap pair), `brushCard` (8 F2 kinds); `POSES POSE_PARTS TOOLS TOOL_PARTS TOOL_BOTTOM HAND_STATES BRUSH_KINDS TWO_POSES ANCHORS HAND_ANCHOR MARK_PARTS` |
| `scripts/worksheet-gen/qa/verify-b6-habit-pictogram.js` | the primitive's render-measuring gate (rules 1-8, 7 poisons) |
| `scripts/worksheet-gen/qa/b6-healthy-habits-harness.js` | type-scoped clone of `b5-road-safety-harness.js` (file:// fonts, colour + grey sheets, poison checker) |
| `scripts/worksheet-gen/templates/components-b6/healthy-habits.js` | `hhFace hhRail hhPlaque hhShelf hhHooks` (auto-merged by the `components-b6.js` barrel; `_index.js` needs no entry) |
| `scripts/worksheet-gen/data/b6/healthy-habits.js` | `{ HEALTHY_HABITS (en), COMMON }` — bank first; EN block = all six mode strings, phases, 8 labels, labelStems, 7 reasons, kaiOrder, coughPhrase, weekStartOverride; COMMON = TOOL_OF, CUE_OF, GLYPH_PARTS, TOOL_FORBIDDEN, baseD1/2/3, neverTogether, handSteps, HAND_STATES, PHASE_OF, GERM_PAIRS, reason/chart sets, coOccur, REFUSED_LIBRARY |
| `scripts/worksheet-gen/types/k/K-380-healthy-habits.js` | the base spec (config-keyed guards, `_buildWith` seam, derangement composer, render-deriving `verify()`) |
| `scripts/worksheet-gen/qa/verify-b6-healthy-habits.js` | the family gate; exports `validateBank(block, loc)` (the probe contract) + `validateCommon()` |

## Gate results
- `node qa/verify-b6-habit-pictogram.js` → **PASS (3948 assertions, 7/7 poisons killed)**. Rule 1 worst base Jaccard 0.686 (brush-teeth ~ sun-protect; every base pair < 0.72); rule 2 minimal pairs 25.7 / 18.8 / 15.8 / 6.7 % differ, 0-1 px outside the declared parts; rule 3 F1 vectors all distinct; rule 5 anchors brush 2.9 px · blow-nose 5.2 · comb 5.2 · wash 3.1 · drink 4.3 · cough-elbow elbow 3.2 u; rule 6 0 parts under 8 px. Poisons PP1 cough-elbow = cough-open · PP2 rinse w/o falling bubbles · PP3 toothbrush in brush-teeth · PP4 bubbles on soap · PP5 comb hand at mouth · PP6 codeRed fill · PP7 (design P15) rinse-brush w/o foam — all KILLED for their own rule.
- `node qa/verify-b6-healthy-habits.js` (full) → **PASS (2554 assertions, 20/20 poisons killed)**: en bank 0 findings, COMMON 0; d1/d2/d3 verify + lints clean with floors; d2 sweep v2..v20 0 failing pages; pooled 400 seeds worst tool-in-column 25.8 % (≤ 30), offsets 1:24.1 2:25.6 3:24.6 4:25.7 % (10-40); long chrome (5-line title, 144-char instruction, body 667) clean; greyscale render clean. Data poisons P4, P5, P6 (digit + unit), P7, P7b, P8, P9, P10, P11, P12, P13 (food + head), P18, P21; render poisons P1 tool leak, P2 soap bubbles, P3 constant shift, PS stamp swap (verify names the drawing/stamp disagreement), P20 index-keyed guard.
- `node render/one.js K-380 null {1,2,3} en` → lints clean, verify clean.
- `buildEn()` (not written) → OK, K-380 title unique in K.
- `node tools/b3-baseline.js --check --quick` → `checked build 3896 + enum 299 in 27s: 0 drifted (0 expected), 0 missing` **PASS**.

Measured stacks (en chrome, body 778): d1 704 / d2 654 / d3 620 px, pencil zone 300 each, empty gaps above the rail / below the shelf 37 / 62 / 79 px. Designed minimum d2 208 + 160 + 146 = 514 ≤ 677; the fi long-chrome render (body 667) keeps the 300 zone.

## Deviations from the design (each measured / read)
1. **Line zone capped at 300 px, stage centred** (design: `minmax(160,1fr)` takes all slack). At the real 2-line-title chrome the zone was 430 px — a third of the page empty and 40 cm pencil lines for a 5-year-old. 300 = 1.9x the 160 floor. Still ≥ 160 at 677.
2. **wash-hands**: design's floating T-bar tap + flat 30x6 basin read as "a shelf and a hook". Kept the spout, added a riser to the back of a bowl basin on a pedestal; water drawn OVER the hands (it was hidden by the arm halo) and splayed 3 lines (x 73.5-84.5) so the part clears the 8 px floor. Hands (76,50)/(72,52).
3. **brush-teeth**: the design's two ")" arcs right of the mouth read as SOUND WAVES (a child shouting). Scrub is the comic jiggle "(( fist ))" round the fist (left pair white over the head). Arm raised elbow-out E(74,30) H(63,21) (design E(64,34)) — with the design's arm, rule 1 measured 0.79 vs blow-nose.
4. **comb-hair**: design's crown triangles read as a paper CROWN (and clipped); curled strands then read as claws. Messy hair = a jagged 5-spike crest on the back of the head; arm raised elbow-high E(71,9) H(57,5) (design E(62,20) H(55,6)): rule 1 (0.75 → < 0.72) and rule 5 (7.9 px → 5.2 px).
5. **blow-nose**: upright it measured 0.77 / 0.73 against brush / comb (shared body dominates). The upper body bends FORWARD 16° over the hips (the sneeze children draw), both hands at the nose (near (65,18), far (65,9) in the leaning frame), burst in front.
6. **sleep**: moon enlarged (r 13), stars bigger, blanket drapes over the feet with the turned-down white band (a flat rect read as a box). Still no bed, no pillow, no Z.
7. **sun-protect** sun at (81,17) (the design's (84,12) clipped its top ray).
8. **Tools**: additive `ground:true` (viewBox shifted by the measured `TOOL_BOTTOM`) so every tool stands on the plank (verify asserts ≤ 8 px above the plank). Soap bar carries an inset outline (no bubbles). Toothbrush part ids renamed `brush-handle / brush-head` (collided with the figure's `head`); F3 cough mark renamed `cough-puff` (collided with the tissue box `puff`).
9. **F3 tissue poses**: design arm "(72,46);(80,52)" is a 24-unit upper arm (unreachable); drawn E(62,40) H(74,46). The bin is an inline OPEN lidless teal-outline bin (so the tissue is seen going in), not a nested `bin.js` — flag for Phase E.
10. **F3 soap pair** implemented as `handsView` states `hands-soap` / `hands-water-only` (the design names the keys, not the drawing).
11. **Primitive gate rule 1 scope** (`RULE1_SCOPE`): F3 = 'rows' (each row is a declared minimal pair owned by rule 2; the child never compares across rows); declared minimal pairs (incl. F1 wet / rinse) are owned by rules 2 / 3 — they are SUPPOSED to be alike. Face pairs still ≥ 0.72 sit on a **ratchet** `RULE1_PENDING` (may only shrink; an entry that falls under 0.72 fails; the base may never appear): F1 soap~wet 0.754, rub~wet 0.750, rinse~soap 0.728, rinse~rub 0.723 (the shared sink band dominates); F4 / F5 brush-teeth~drink-water 0.799 and F4 drink-water~sun-protect 0.725 (F4 / F5 draw the TOOL in the hand per §2 — that variant is Phase-E work).
12. **Rule 6 exemptions** (auditable `THIN_OK`): `ground` line, F1 `stream`, F2 `cap`, F3 `cough-puff`.
13. **Validator rule 5**: number word 1 is skipped where it equals the indefinite article (fr un/une, pt um/uma, nl een, sv en/ett, da en/et, no en/ei/et, de ein/eine, es un/una, it un/una/uno) — otherwise no sentence could pass. Rule 9 apparatus lint is EN-only (per-locale apparatus words come with each panel). `strandNames['Health']` is draft-level (checked by `validate-b6-draft.js`), not in the bank block.
14. **Validator word lists** (FOOD / UNITS / COUGH_BAD / COUGH_OK / BANNED_HEADS per locale) are my drafts for the native panels to extend; body-part theme + human-body / five-senses / all-about-me names are READ from `topics-taxonomy.json`.
15. EN F2 instruction avoids "each one" (number word) → "Circle the word that tells when it happens: before, during or after brushing."

## PNGs for the reviewer
- Base page: `scripts/worksheet-gen/out/dev/K-380-null-d1-en.png` · `K-380-null-d2-en.png` · `K-380-null-d3-en.png`
- Long chrome + greyscale: `scripts/worksheet-gen/out/dev/K-380-gate/K-380-d2-longchrome.png` · `K-380-gate/K-380-d2-greyscale.png`
- Primitive contact sheets (figures 64 / 88 / 132, tools 88 / 124, F1 hands 176, F2 cards 104, F3 pairs 124): `scripts/worksheet-gen/out/dev/K-380-habit-pictogram-sheet-colour.png` · `K-380-habit-pictogram-sheet-grey.png`

My read (100 % and grey): sleep, wash-hands, blow-nose (leaning sneeze) and comb-hair (hand on bed-head, elbow up) read instantly at 88-132 px and survive grey at 64. **brush-teeth is the weakest**: a raised fist jiggling at the mouth reads as brushing once the toothbrush is on the shelf, but at 104 px the jiggle arcs can read as fingers — the pedagogue's human read (§2 Risks) must confirm it; the d2 contingency (`blow-nose ↔ sun-protect`) is data in `COMMON.baseD2Contingency`, never needed for brush.

## Open items (Phase E / panels)
1. **F1 hands and F2 cards are DRAFT art** — F1 mittens read as black gloves and the sink band dominates (the four RULE1_PENDING F1 pairs); F2 open-tube / paste-on-brush / spit are unclear at 104 px. Redraw with the faces; the arch inside/outside polygon check (F2 verify) is not built yet.
2. F4 / F5 need a tool-in-hand figure variant (brush at the mouth, glass, bed, hat) — clears the F4 / F5 ratchet entries.
3. F3 reserve pair `toilet` (wash-after-toilet / walk-away) is NOT drawn (d3 only, unpublished).
4. Face components (`hhStepCard hhPhaseCell hhPairRow hhReasonMatch hhWeekChart`) and face `verify()` branches are Phase E; the base build refuses any config carrying `mode`.
5. Mandatory human read of the 104 px render at 100 % and a 50 % greyscale print by the builder AND the pedagogue before the bank freezes (§2 Risks) — builder read done above; pedagogue pending.
6. Native panels: author the 10 non-en blocks (validateBank is the contract; the panels extend the per-locale ban lists they find wanting).

---

## Round 2 — the lead's review of the d2 render (2026-09-23): SUPERSEDES deviation 1 and the layout numbers above
The lead read `out/dev/K-380-null-d2-en.png`: the gates passed but the page was sparse (about 110 px empty above the rail and a 600 px band between the two dot rows), and three drawings were not yet top quality. What changed:

1. **Layout, filled and calm** (`templates/components-b6/healthy-habits.js`, spec config):
   - The grid rows are now `minmax(railMin, railMax)` / `minmax(180px, 260px)` / shelf, with `align-content:center`, `min-height:0` and a 12 px bottom padding. The padding offsets the instruction's own bottom margin, so the stack sits centred to the eye; measured at 814 without it, the blank bands were 64 / 54 px.
   - Plaques are 122 px wide and their height flexes between 190 and 236 px (d2). d1 is 150 × 220-270, d3 is 100 × 165-240.
   - The child now fills its plaque. `habitFigure({fit:true})` uses the pose's own drawn extent (`POSE_BOX`, measured) as its viewBox and draws at 100 % × 100 % with meet.
   - The shelf tools grew to 130 / **120** / 98 px.
   - The config keys changed: `plaqueW, plaqueMinH, plaqueMaxH, toolPx, fillMin` (`pictoPx` is gone).
   - Measured, en d2 (body 778): stack 716, plaque 236, children 177 / 180 / 208 / 211 px tall (75-89 % of the plaque), line zone 260. The blank band is 41 px above the rail and 43 px below the plank.
   - The 814 chrome measures 58 / 60 px. The 677 chromes measure 16 / 18 px, with the zone at 213-218 and the plaques at 223-228.
   - The sleep scene is the one landscape pose. It fills the plaque width, not its height (55 %), and verify accepts that with width ≥ 85 %. At the unpublished six-column d3 the fill floor is 0.55: a plaque tall enough to leave no blank band is wider than its child.
2. **New assertions in verify()** (run on every render):
   - SPARSE: no blank band over 60 px between consecutive content blocks from the instruction to the footer. The only band exempt is the line zone.
   - The line zone must measure 180-284 px (260 plus the two dots).
   - Each child must fill at least `fillMin` of its plaque height, or reach 85 % of its width if it is the sleeping child.
   - No drawing may spill out of its plaque.
   
   The gate's new chrome sweep checks 814, 722 and 677. There are two new poisons: **PSP1** puts back the old 110 px blank above the rail (killed by `sparse`), and **PSP2** puts back the old `minmax(160px,1fr)` line zone (killed by `line zone`).
3. **Poses, read in greyscale at the new size:**
   - **brush-teeth**: the fist now jiggles at the mouth and a toothpaste-foam cluster sits in front of the mouth (the `foam` part). ⚠ The design said "scrub arcs, NOT foam"; the lead overruled it. The shared-mark rule still holds on the shelf: the soap is a bare bar, and soap forbids foam and bubbles.
   - **comb-hair**: the hand rests on top of the hair, with a jagged bed-head crest behind it and three strands curling up from under the hand. Detached wavy strands read as STEAM and thick curls as fingers, so neither is used.
   - **blow-nose**: one hand pinches the nose (hand end 2.3 px from the NOSE anchor) and a small burst sits at the nose. The body still leans forward. The second hand is gone (two cupped hands read as a shout), so the d3 no-marks rule now reads the hand height: at the nose (y ≤ 17) is blow-nose, at the mouth (17-25) is brush-teeth.
   - **sleep**: the night sky is drawn tall (a big moon and three stars) so the scene fills a portrait plaque.
   - **wash-hands**: the basin was narrowed 3 units so the child can grow taller.
4. **tissue-box**: it is now a box every child knows: a teal front, a pale top face drawn in perspective with an oval slot, and one tissue with a peak and a fold rising out of the slot. There is no cross.

### Gate lines (round 2)
- `node qa/verify-b6-habit-pictogram.js` → **PASS (4047 assertions, 7/7 poisons killed)**.
  - Base Jaccard 0.677 at worst (brush ~ sun) in the 100-unit box. The new rule 1b measures the base pictures as shipped (fit): 0.559 at worst (brush ~ blow-nose).
  - Rule 5 now measures on the render through the arm's screen transform. Result: brush 2.3 px · blow-nose 2.3 · comb 2.3 · wash 3.1 · drink 4.3 · cough-elbow 3.2 u.
  - Rule 6 floors are measured at the smallest d2 plaque interior (107 × 175): 0 parts under the floor.
- `node qa/verify-b6-healthy-habits.js` → **PASS (2562 assertions, 22/22 poisons killed)**. This covers d1/d2/d3, the v2..v20 sweep, the 814 / 722 / 677 chromes, the long fi chrome and greyscale, all clean.
- `node render/one.js K-380 null {1,2,3} en` → lints clean, verify clean.
- `node tools/b3-baseline.js --check --quick` → `checked build 3940 + enum 299 in 23s: 0 drifted (0 expected), 0 missing` **PASS**. `buildEn()` OK.

### PNGs (round 2)
- `scripts/worksheet-gen/out/dev/K-380-null-d1-en.png` · `K-380-null-d2-en.png` · `K-380-null-d3-en.png`
- `scripts/worksheet-gen/out/dev/K-380-gate/K-380-d2-greyscale.png` · `K-380-gate/K-380-d2-longchrome.png` · `K-380-gate/K-380-d2-chrome-814.png` · `K-380-gate/K-380-d2-chrome-722.png`
- `scripts/worksheet-gen/out/dev/K-380-habit-pictogram-sheet-colour.png` · `K-380-habit-pictogram-sheet-grey.png`

My reading of the round-2 renders:
- The page reads as one composition: the plaques start about 40 px under the instruction and the shelf sits about 40 px above the footer.
- In greyscale, sleep, wash, blow-nose and comb read at once. Brush-teeth now carries the foam and the jiggle, but it still needs the pedagogue's read.
- The tissue box now reads as a tissue box.
- The sleeping child is small inside its tall night sky. The scene carries the meaning, but the child itself is about 50 px wide.
