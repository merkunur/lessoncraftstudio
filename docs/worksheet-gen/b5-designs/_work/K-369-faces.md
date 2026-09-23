# K-369 `road-safety` — the five faces (Phase E, 2026-09-23)

Contract: `K-369-road-safety.md` §3 (faces) + §5 (gates), under `_FACE-BRIEF.md` and `_BUILD-BRIEF.md`. Nothing shared was edited, and nothing was added to git.

## Files
- `scripts/worksheet-gen/tools/b5var-rows/road-safety.js` holds 5 rows, all CODE faces. Running `node tools/gen-b5var-specs.js` emits:
  - `types/k/K-373-road-safety-color-the-traffic-lights.js`
  - `types/k/K-374-crossing-the-road-safely-steps.js`
  - `types/g1/G1-384-road-safety-signs-and-meanings.js`
  - `types/g2/G2-360-road-safety-kinds-of-signs.js`
  - `types/g2/G2-361-road-safety-sign-quiz.js`
- `types/k/K-369-road-safety.js` gains ONE additive knob, `mode`.
  - `_buildWith` dispatches to `FACE_BUILD[mode]` before any base guard. The base path is unchanged, and the baseline gives PASS with 0 drifted.
  - `verify()` reads `data-lcs-mode` and hands faces to `faceVerify()`. That function re-derives every answer from the drawn geometry:
    - **F1:** the ray group gives the lamp's y rank.
    - **F2:** the sight chevron's polygon gives the tip direction.
    - **F3 to F5:** each sign's role comes from its parsed outline. That means the vertex count, the apex side, and the rim-ring thickness ratio (0.24 for a prohibition, 0.06 for mandatory). The glyph kind and the printed text are also used, against the locale table stamped on the root.
  - `faceVerify()` also checks the per-page tells, SPARSE ≤ 40 px, and the floors.
- `templates/components-b5/road-safety.js` adds `rsFace`, `rsLightStreet`, `rsCrossingCard` (+ an internal `backChild` figure), `rsSignOnPost`, `rsMeaningPair`, `rsLetterCard`, `rsClassBin` and `rsQuizRow`.
  - They use an `rs` prefix because b3 owns `letterCard`, and the b5 namespace refuses duplicate names.
  - In every face, a drawn element absorbs the body slack: poles, posts, the road, or bordered boxes.
- `qa/b5-road-safety-faces.js` is the new face gate. `qa/verify-b5-road-safety.js` calls it and grows in three ways:
  - Validator rule 9 adds apparatus checks per face (en).
  - PR11 now feeds the base a face config that has lost its mode, because a config that keeps its mode now legitimately builds the face.
  - PR11b is a misspelt mode.
- The bank (`data/b5/road-safety.js`) is unchanged. Its `strings.<mode>` were already authored, and the rows reproduce them verbatim (the gate asserts this).

## The faces
| id | kind · knob | the child | gate owns | PNG |
|---|---|---|---|---|
| K-373 | CODE `colour-lights` (6 lights 2×3, lampD 80, fill none, rays only) | colours the lamp that has rays the colour its POSITION shines; there is no key, no swatch and no colour word | 0 filled lamp parts; 0 code colours on the page; one ray group per light; every car position 0/1/2 used; no neighbour or column lit at the same position; row 2 ≠ row 1 · PR2, RY1, AT1, SP1 | `out/dev/K-373-null-d2-en.png` |
| K-374 | CODE `crossing-steps` (5 cards 3+2, figure 130, frame ≥ 196) | writes 1 to 5 in the empty boxes to order the kerb routine, drawn FROM BEHIND the child | printed order ≥ 3 away from the routine; no look-left cards side by side; not reversed; the parsed chevron points left or right as required; boxes empty and 64×60 · PR3, BX1, AT2, AT3, SP2 | `out/dev/K-374-null-d2-en.png` |
| G1-384 | CODE `sign-meaning` (6 pairs `.ws-match`, sign s 74) | draws lines from 6 MUTCD signs to their meanings | roles re-derived from geometry; ≤ 1 pair straight across; no single line direction on more than 2 pairs; not mirrored; glyph cross-check; no meaning prints its sign's word; ≤ 2 lines ≥ 16 px; G1 sign ≥ 72 · AT4, AT5, MR1, FLR1, SP3 | `out/dev/G1-384-null-d2-en.png` |
| G2-360 | CODE `sign-kinds` (8 lettered signs A to H, extent 112; en 2 bins × 6 boxes, 3-bin locales × 4) | writes each sign's letter into its meaning-class bin ("Rule signs" / "Warning signs") | class from the gate's OWN per-convention table read off the parsed outline equals the card; ≥ 2 per bin and ≤ boxes; equal box counts; no 3 same-class neighbours or period; no filled red disc; no STOP/yield on a Vienna sort · PR8, AT6, FR1, FR2, SP4, FL2 | `out/dev/G2-360-null-d2-en.png` |
| G2-361 | CODE `sign-quiz` (6 rows × 3 tiles, sign extent 72) | reads a situation and circles the one sign that fits | exactly one tile is the row's role (from geometry); no confusable pair on a row; no target-sign word in the situation; slots 2/2/2 per page, no neighbouring repeat, no staircase; ≤ 3 lines · PR4, AT7, SP5, FL1 | `out/dev/G2-361-null-d2-en.png` |

Every face also has these checks. AP1 to AP5 fail if a face's instruction names apparatus the face does not print (validator rule 9, en). Every face renders the Vienna TEST fixture (`de`), which covers:
- F1 pedestrian lights (outline glyphs)
- the F4 3-bin sort without priority signs
- the blue mandatory discs in F3 and F5

A greyscale render replaces every code colour with one grey; verify stays clean and derives the same answers.

## Deviations from §3 (each measured or read in the render)
1. **F1 lampD is 80, not 70.** At 80 the stack is 2×298 + 24 = 620 ≤ 667 (the measured fi stress body), and the larger lamps are easier to colour. The rows stretch, and the slack goes into the poles.
   - Composition adds three rules beyond §3: no neighbour lit at the same position, no column lit at the same position in both rows, and row 2 is never a copy of row 1. The first render showed a column tell.
2. **F2 figure, redrawn.** It no longer uses `road-pictogram` back poses. At card size their white face-circle under a hair cap read as a FACE WITH A HAT, i.e. a child seen from the front, which mirrors left and right.
   - The new figure (`backChild`) has a solid dark head, a white school bag with straps, and a SOLID sight arrow (shaft + 14-unit chevron).
   - **Zebra direction.** Stripes now run ALONG the kerb, so they stack like ladder rungs. The first render's vertical bars read as a gate.
   - **Frame.** It is HTML-layered so it can grow with the row. `crossingFrame` in the primitive is left untouched but is not used.
   - `look-both` (d1 only) draws both arrows.
3. **F3 and F5.** Signs sit on posts in stretching boxes. F5 signs are sized to a max extent of 72, with plates at s 60, so a 1.2 s plate fits its 88 px tile.
4. **F4 layout.** The badge is Ø30 top-left, and the sign starts at 38 px. At 12 px the badge sat on the diamond, triangle and plate corners. Signs are sized to extent 112 (plate s 93), and the posts grow.
5. **Instruction words.** The instruction strings are the bank's authored `strings.<mode>`, unchanged. Each one names only the apparatus on its page, and rule 9 now gates this.
6. **YIELD text.** It reaches 9 px only from s ≈ 70 (at s 66 it measured 8.9). The base record said "from s 64", which is wrong. F3 uses s 74.

## Refusals already visible in the bank shape
- **F1** refuses every locale whose `pedLight.stop` is unset. That covers **pt** until its panel sets it; F1 is the only face that draws pedestrian lights.
- All faces refuse an absent locale block, which is every non-en locale today.
- No per-locale face refusal is visible yet.
  - F4 adapts its bins (2 or 3).
  - F5 needs ≥ 6 roles with situations; en has 9. A panel that cannot author them makes F5 REFUSE for that locale (design §3).

## Open items for the panels
- en F1 is car-only because the US walker is lunar white. Vienna locales get 4 car + 2 pedestrian lights; the panels should confirm that the outline walker glyph reads as colourable.
- **F5 lure pairs:** crossing / no-pedestrians and bike-warning / no-bikes share a glyph and differ only by the slash. They are deliberately NOT treated as confusables (a G2 reading of the prohibition slash). The panels may add them to `COMMON.confusable` if they disagree.
- **Stop line on the F1 road:** it is a small white tick before each car pole. It reads as a road mark, not a stop line; it is harmless but the panels may drop it.

## Gate lines
- `node qa/verify-b5-road-safety.js` → **PASS (564 assertions, 57/57 poisons killed)**
  - Pooled face shares over 20 seeds: F1 0.45, F2 0.55, F3 line-direction 0.19, F4 0.65, F5 slot 0.33.
  - Every face renders clean at own / 814 / 722 / 677 / Vienna / grey, with FILL 99 to 100 %.
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=road-safety` → `every variation differs from the deck its base publishes and from its siblings` (15 pairs)
- `node i18n/build-en.js` → `708 types … (title lint clean)`
- `node tools/b3-baseline.js --check --quick` → `checked build 3840 + enum 277 in 21s: 0 drifted (0 expected), 0 missing` / `PASS`

## Revision 1 (coordinator review, 2026-09-23)

### K-374: the two look-left frames were identical
Steps 2 and 4 were drawn identically, so their order could not be decided from the page.

**Fix:**
- The build maps a look-left that comes AFTER a look-right to its own frame, `look-left-again`.
- That frame is drawn as a solid ↶ arrow that swings from the right ear, over the head, to a chevron pointing left.
- The answer key is now the frame sequence, with every frame distinct. A routine whose repeated frame cannot be drawn differently is refused.

**New gate:**
- `faceVerify` builds a signature from what each frame DRAWS: the number of body paths, the head offset, each arrow's direction, whether the arrow is straight or swung, and the ahead mark.
- It fails if any two frames share a signature. It also fails if the look-left-again frame lacks the swing.

**Poison ID1:** the swing frame is replaced by the plain look-left figure. It is killed ("draw the SAME frame"). The retired AT3 ("look-left cards side by side") no longer applies.

### G1-384: the crossing meaning
The MUTCD W11-2 sign warns DRIVERS. The old meaning, "People may walk across the road here.", read as permission, so the en bank now says "Watch for people crossing the road."

### Re-run
I re-rendered K-374 and G1-384 and read them.

| check | result |
|---|---|
| gate | PASS (564 assertions, 57/57 poisons killed) |
| gate-variation-distinct | every variation differs |
| build-en | title lint clean (708 types) |
| b3-baseline --check --quick | 0 drifted, PASS |

## Revision 2 (coordinator review, 2026-09-23): G2-360 EQUAL GROUP SIZES
Two panels conflicted: 4 boxes over 3/3/2 signs read as "missing signs", and box count = sign count (3/3/2) let the child solve the last group by counting. The fix is **equal group sizes on every page**: the build takes `perGroup = min(floor(d.signs / classes), smallest class)` signs from EVERY class, and each bin shows exactly `perGroup` boxes. Boxes = signs, and the count carries no information. Below 2 the face refuses. The row lost `boxes2` / `boxes3` (no longer read).
- Measured, 20 seeds × 11 locales: en / es / pt **4+4** (8 signs, 4 columns); de fr it nl sv da no fi **2+2+2** (6 signs, 3 columns; each Vienna locale has a class with only 2 drawable signs, so 3+3+3 is impossible). No locale refuses.
- verify(): a new `unequal group sizes` finding (read off the parsed outlines), plus the existing box = sign check.
- Gate: sweep `kindsGroups()` over all 11 locale blocks + the de fixture. Poisons EQ1 (en 2/4, boxes = signs), EQ2 (Vienna 3/3/2, the old fixture page), EQ3–EQ5 (helper: unequal, a box short, empty page) all KILLED; controls EQ0 / FR0 (now 2/2/2) PASS. `PASS (582 assertions, 66/66 poisons killed)`.
- Renders read: en, de, fi, pt at d2 are clean.
