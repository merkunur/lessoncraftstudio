# Row 201 — The Mosaic Menders → THE TILE SPILL: tip the mosaic into an empty frame and the same tiles fill it, leave holes, or spill over (3.MD.C.6)

## 0. Identity
- **id** `mosaic-menders.area-match.3-md-c-6` (KEPT; slug/title/intro frozen en..sv; da/no/fi get new metadata at build, grade 3) · grade 3 · CCSS 3.MD.C.6 (also 3.MD.C.5) · Measurement & Data · own files `mosaic-menders-core.js` (rewritten), `mosaic-menders-activity.js`, `-activity.html`, manifest row.
- **Worksheets covered:** G3-338 "Same Space, New Shape" (circle the rectangle that covers the same number of squares) · G3-313 "Count the Squares" (count the squares in a rectangle; finish the multiplication — carried by the row tallies and the success equation, and by the "edge marks only" setting where rows × columns is the only way to know a frame's size).
- **What the old activity did:** three candidate mosaic cards; tap the one with the same tile count as Tessa's. **Kept:** Tessa, the "find the mosaic with the same number of tiles" task, the bigger-looking-but-fewer decoy, the frozen intro's promise. **Replaced:** the card tap (now the mosaic is physically tipped into a frame), the drawn Tessa placeholder (now `occupations/artist`, a library picture), and three live rounds whose "new shape" was the target turned 90° — `r2x4`↔`L8` (the old `L8` mask is a 4×2 rectangle), `L8`↔`r2x4`, `bar6`↔`col6`. A turned rectangle is the same shape; a child could find those matches by spotting the rotation without counting a single tile. No match here is ever the target turned.

## 1. The pitch
"Pick up Tessa's mosaic and tip it into an empty frame on the wall: the very same tiles slide in row by row — if the frame takes them all with no hole and none left over, it covers the same space, whatever its shape."

## 2. Why a child will want it again
- **The tip.** The mosaic lifts off Tessa's table as one piece (a 4 px shadow, a slight tilt that follows the finger). Over a frame it tilts like a tray being poured; on release the tiles **cascade** in — one every 70 ms, each with a ceramic click that rises in pitch — filling the frame's squares in reading order.
- **The verdict is physical.** A perfect fit: the last tile drops into the last square, grout lines draw themselves across, and a shine sweeps the mosaic (500 ms). Too few spaces: the extra tiles tumble off the bottom edge and bounce on the floor. Too many spaces: dark holes stay, each with a little shimmer.
- **The row tallies.** As each row of a rectangular frame fills, its running total pops at the row's right end (3… 6… 9… 12) — the multiplication happens in front of the child.
- **The gallery (end-of-pass show):** every mended frame hangs on Tessa's wall beside the mosaic it came from, a string between them and "12 = 12" on the string — eight pairs of different shapes with the same number of tiles.
- **Free play:** between rounds, tip the mosaic into any frame just to watch it pour; nothing is graded until the round starts.

## 3. The skill and the misconception
- **Skill:** area is the number of unit squares that cover a shape with no gaps and no overlaps, and the number does not change when the same squares are arranged into a new shape; for a rectangle, rows × squares in a row gives the count (3.MD.C.6, 3.MD.C.7.a link).
- **Misconception 1 — the bigger-looking shape has more space.** **Pushback:** the frame with the biggest outline (e.g. the 3 × 3 square against a 1 × 6 bar) is tipped into and keeps three dark holes; the long thin frame swallows all six tiles exactly.
- **Misconception 2 — same outline, same area.** The ring frame (3 × 3 with the middle missing) and the full 3 × 3 have the same outline; tip nine tiles into the ring and one tile tumbles off. The same for the 4 × 4 ring (12) against the 4 × 4 square (16), and the notched frames N5, N7, N9, N11, N15 that look like a rectangle with one corner bitten out.
- **Misconception 3 — counting the outline, not the inside.** The edge-marks setting shows only tick marks along the frame's edges; the row tallies during the pour show rows × columns, not the number of edge marks.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout: wall left 470 px, Tessa's table + bubble right 210 px):**
- **Task line** (20 px): **"Tip Tessa's mosaic into the frame that it fills exactly."**
- **The wall:** three empty frames stacked or side by side (whichever fits the round's shapes at the shared tile size), each a 4 px wooden-moulding outline on a plaster panel, with faint cell lines (setting "every square") or tick marks along each straight edge (setting "edge marks only"). **One tile size per round** shared by the mosaic and all three frames, so size differences are honest: tile 36 px at 704 for shapes up to 8 columns, 30 px for 10 columns. Each frame panel is a ≥ 120 × 120 px drop target.
- **Tessa's table (right):** `occupations/artist` (Tessa) at **96 px** above a wooden table on which the mosaic lies — tiles coloured in a 4-colour palette (teal, coral, gold, cream) in a fixed pattern per round, drawn as rounded squares with 2 px grout. The table is the mosaic's home.
- **Bubble** under the table (18 px, ≤ 3 lines). No answer box: the answer is the frame the mosaic is tipped into.
- **The floor strip** under the wall (680 × 40) is where spilled tiles land.
- No words on the apparatus: row tallies are numerals.

**At 360 px (stacked):** task 2 lines; Tessa 64 px + the mosaic on a 328-wide table band at the top; frames stacked vertically in a column below, tile size 24 px (10 columns = 240 px wide; the 3-row frames are 72 px tall + 16 px padding — each frame panel ≥ 96 px tall as a drop target); floor strip 24 px under each frame. Budget 360 × 740: header 56 + task 48 + table band 140 (mosaic ≤ 4 rows × 24) + three frames ≤ 3 × 120 = 360 + bubble 60 + Check 52 = 716 ✓; the largest rounds (4 × 4, 2 × 8, L14) use 24 px tiles = 96 px frames. At 320 × 640: tile 20 px, frames 2-up where shapes allow; Check stays visible (the bubble overlays the floor strip).
- A tap-to-tip path for motor access: tap the mosaic (it lifts), then tap a frame (it pours).

## 5. The hand
- **Lift:** pointerdown on the mosaic → lifts within 16 ms (scale 1.04, shadow), follows the pointer; over a frame the frame's moulding glows teal and the mosaic tilts 12°.
- **Tip:** release over a frame → tiles pour in reading order (frame cells sorted top→bottom, left→right), 70 ms per tile, click pitch rising; rectangular frames pop the row total at each row's end as the row completes. Release anywhere else → the mosaic glides home (250 ms).
- **After a non-fit:** the frame keeps the result for 1.6 s (holes shimmer / spilled tiles rest on the floor), then the tiles fly back up and re-form Tessa's mosaic (600 ms). Nothing else moves.
- **Count chalk (free tool, not graded):** tap any tile of the mosaic or any cell of a frame → a chalk dot with its running number appears (1, 2, 3…), tap again to clear that object's dots. Children who want to count before tipping can.
- **Keyboard:** Tab to the mosaic, Enter lifts; ← → choose a frame; Enter tips. T clears chalk.
- **Undo:** nothing to undo — a wrong tip simply returns the tiles.

## 6. The rounds
One round = one mosaic and three frames; exactly one frame has the same number of squares. Shapes as rows ('1' = square): r{rows}x{cols} rectangles; `bar6`/`bar4`/`bar10` = one row; `S6` = 1/2/3 staircase; `S10` = 1/2/3/4 staircase; `L8` = `11..,11..,1111`; `L9` = `11.,11.,11.,111`; `L14` = `11...,11...,11111,11111`; `C8` = 3 × 3 ring; `R12` = 4 × 4 ring; notched rectangles `N3` = `11,1.`, `N5` = `111,11.`, `N7` = `1111,111.`, `N9b` = `11111,1111.`, `N11` = `1111,1111,111.`, `N15` = `1111,1111,1111,111.`.

**Up to 10 tiles (default), 8 rounds** — mosaic → **match** · decoys:
1. r2x3 (6) → **bar6** · N5 (5), r3x3 (9)
2. r2x4 (8) → **L8** · r3x3 (9), N7 (7)
3. S6 (6) → **r2x3** · r2x4 (8), bar4 (4)
4. r2x2 (4) → **bar4** · N3 (3), r2x3 (6)
5. r3x3 (9) → **L9** · C8 (8), r2x5 (10)
6. C8 (8) → **r2x4** · r3x3 (9), bar6 (6)
7. r2x5 (10) → **bar10** · N9b (9), L8 (8)
8. bar6 (6) → **S6** · r2x4 (8), N5 (5)

**Up to 16 tiles, 8 rounds:**
1. r3x4 (12) → **r2x6** · N11 (11), r3x5 (15)
2. r4x4 (16) → **r2x8** · R12 (12), r3x6 (18)
3. r2x6 (12) → **r3x4** · r4x4 (16), N11 (11)
4. r2x7 (14) → **L14** · r3x5 (15), r3x4 (12)
5. R12 (12) → **r2x6** · r4x4 (16), r2x5 (10)
6. S10 (10) → **r2x5** · r3x3 (9), r2x4 (8)
7. r2x8 (16) → **r4x4** · r3x6 (18), N15 (15)
8. L14 (14) → **r2x7** · r4x4 (16), r3x5 (15)

**Rules the tables keep (measured, `work-38/m201e.js`):** the match never has the mosaic's shape or its 90° turn; every decoy differs in count; 13 of 16 rounds carry a ±1 decoy (a notched, ringed or one-row-more frame) so only counting separates them; in 15 of 16 rounds at least one decoy's outline is as big as or bigger than the match's (the exception, S10 → r2x5, makes the match the biggest outline among the three frames).
**Shortcut bots** (over each table, ties split; re-solved by the critic, `work-c38/c201.js`): pick the biggest outline 38 % / 25 %; the smallest outline 19 % / 38 %; the middle outline 44 % / 38 %; the frame sharing the mosaic's row or column count 29 % / 13 %; the frame whose outline area equals the mosaic's outline area 23 % / 38 % — against 33 % chance, no bot gets beyond 44 %, and every bot is wrong in at least 9 of 16 rounds. The critic's solver also confirms: every match has the mosaic's count and every decoy a different one; no match is congruent to its mosaic under any turn or flip; 13 of 16 rounds carry a ±1 decoy.
**Answer position:** the match's frame slot (left/middle/right, or top/middle/bottom on phones) is assigned so that over each table each slot carries it 2 or 3 times, re-shuffled per pass with the round order; the gate measures each slot 28–39 % over 1,000 passes.
**Order:** order-only reshuffle per pass, never the same order twice; the first round of a pass is never the previous pass's last.

## 7. Check, the misses, the success
There is no Check button: tipping the mosaic into a frame IS the answer.
- **Miss 1** — the non-fit result stays 1.6 s (holes / spilled tiles), then the tiles return. Bubble, too many squares: **"Holes are left — that frame has more squares than the mosaic has tiles."** Too few: **"Tiles spill out — that frame has fewer squares than the mosaic has tiles."** The tried frame gets a pale chalk cross in its corner (stays for the round).
- **Miss 2** — the mosaic's tiles number themselves 1…n (chalk, 60 ms each), and each remaining frame shows its row tallies along its right edge (rectangles) or its own chalk count (other shapes), so the child can compare n with each frame. Bubble: **"Tessa's mosaic has {n} tiles. Which frame has {n} squares?"**
- A new tip takes the help away (the numbers fade) — the chalk crosses stay.
- **Success** — the last tile lands in the last square; grout draws, shine sweeps, the frame swings 2° and settles; Tessa's picture hops. Bubble, rectangle frame: **"{rows} rows of {cols} make {n} — the same {n} tiles in a new shape!"** Other frames: **"The same {n} tiles cover this shape too!"** On a rectangle frame the brass plate under it then engraves the multiplication the row tallies just built — **"{rows} × {cols} = {n}"** with each locale's own school sign (× in en/fr/es/it/pt/nl, · in de/sv/da/no/fi) — G3-313's "finish the multiplication", written by the apparatus only after the tiles proved it. After round 8: the gallery (§2) with **"Same number of squares, different shapes."**

## 8. Settings
1. **Frame lines:** every square (default) / edge marks only — the frames show either their cell grid or only tick marks along each straight edge (rows × columns from the ticks).
2. **Mosaics:** up to 10 tiles (default) / up to 16 tiles — switches the round table (the mosaic on the table is visibly bigger at rest).

## 9. Words (EN source)
- title **"The Mosaic Menders"** (frozen page title keeps "— Area as Counting Unit Squares (Grade 3)")
- task **"Tip Tessa's mosaic into the frame that it fills exactly."**
- hints **"Holes are left — that frame has more squares than the mosaic has tiles."** · **"Tiles spill out — that frame has fewer squares than the mosaic has tiles."** · **"Tessa's mosaic has {n} tiles. Which frame has {n} squares?"**
- celebrations **"{rows} rows of {cols} make {n} — the same {n} tiles in a new shape!"** · **"The same {n} tiles cover this shape too!"** · **"Same number of squares, different shapes."**
- settings **"Frame lines"**: "every square" / "edge marks only" · **"Mosaics"**: "up to 10 tiles" / "up to 16 tiles"
- **Locale traps:** (a) **Plural after numerals:** fi partitive (*12 laattaa*, *ruutua*), et al. — every count sentence is authored whole per locale with {n} in a fixed slot; no runtime pluralising. (b) **"rows of"**: de *3 Reihen mit je 4*, fr *3 rangées de 4*, nl *3 rijen van 4*, sv *3 rader med 4*, fi *3 riviä, joissa on 4* — authored per locale. (c) **Tile vs square words** must stay distinct in each locale (the tile is the thing you move, the square is the space): de *Fliese/Plättchen* vs *Kästchen*, fr *carreau* vs *case*, es *azulejo* vs *cuadrito*, it *tessera* vs *quadretto*, pt *azulejo* vs *quadradinho*, nl *tegel* vs *hokje*, sv *platta* vs *ruta*, da *flise* vs *felt*, no *flis* vs *rute*, fi *laatta* vs *ruutu*. (d) **The multiplication sign** appears only on the success plate, in each locale's school form: "·" in de/sv/da/no/fi, "×" elsewhere; every sentence keeps "3 rows of 4" in words. (e) Tessa keeps her name in every locale (the frozen titles use it; nl's live title uses Tessa too).

## 10. Sound off, access, phones
- Sound off: the pour, holes, spilled tiles, tallies and grout are all visible. Clicks/chimes are bonus.
- Keyboard path §5; aria: mosaic `"Tessa's mosaic"` + (after chalk) its count; frames `"frame {k}: {rows} rows"` for rectangles — never the total; after a tip: `"{h} holes left"` / `"{s} tiles spilled"` / `"fills exactly"`.
- Taps: mosaic ≥ 96 px, frames ≥ 96 px tall; tiles are not individual tap targets except for chalk (each ≥ 24 px; chalk is optional).
- Tessa 96 / 64 px (floors met). Tiles are drawn apparatus (no pictures in cells).
- Nothing below the fold at 360 × 740 / 320 × 640 (§4).

## 11. Distinct from
- **Batch siblings:** 202 Patchwork Meadow covers an irregular bed from an endless supply, square by square, and a watering round counts it; 305 Tile Roller lays a rectangle row by row and predicts the product. Here a FIXED set of tiles moves from one shape to another — conservation of area is the mechanic.
- **New 292 The Pouring Frame** pours loose counters into ONE frame whose width the child stretches until nothing is left over (a missing factor). Here the poured thing is a fixed, patterned mosaic, the frames are fixed and different in shape, and the question is which shape the same tiles fill — conservation of area, not division. **Row 170 The Stamp Sheet** perforates one rectangle into rows and columns; nothing moves between shapes.
- **Row 107 The Fair Mobile / tool `folding-sheet` / New 274 The Sinking Inlay:** fit pieces into a hollow shape (tangram, symmetry) — none conserves a count across shapes. **New 306 The Fence Loop:** a fixed-length fence with a draggable corner; nothing is poured. **Row 142 Twin Tubes:** cards pour into tubes compared by level — here tiles pour into frames compared by fit.

## 12. Build plan
- **Core state:** `{ table:'to10'|'to16', lines:'all'|'edges', round:{mosaic, frames:[a,b,c], matchSlot}, carry:false, result:null|{frame, holes, spilled}, misses, chalk:{} }`.
- **Functions:** `cells(mask)` (reading order), `area(mask)`, `tip(frameIndex)` → `{holes: max(0, area(f) − n), spilled: max(0, n − area(f)), fits}`, `rowTallies(mask)` (only for rectangles), `assignSlots(table, seed)` (2–3 per slot per table), `chalk(target, i)`.
- **Gate (own truth):** match area = mosaic area and decoys ≠; match ≠ mosaic and ≠ its 90° rotation (mask comparison after rotate); 15 of 16 rounds have a decoy with outline ≥ the match's; the five bots (§6) each ≤ 44 % and each wrong in ≥ 9 of 16; slot distribution 28–39 % over 1,000 passes; `tip` returns holes/spilled consistent with the counts; tallies on rectangles equal cols, 2·cols…; tile size identical for the mosaic and all frames in a round.
- **Mutations (each killed):** match = mosaic turned 90° · a decoy with the same count · per-frame tile scaling · tip compares outlines instead of counts · tallies count edge marks · the tried frame forgets its cross · two rounds in a row with the match in the same slot more than twice per table · drawn character instead of the library picture.
- **Pictures:** `occupations/artist` (Tessa; a girl at an easel — seen on the contact sheet). Nothing else is a picture.
- **Risks:** the cascade animation on 16-tile rounds = 1.1 s — keep it skippable by a second tap. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — lifting a whole mosaic and pouring it, tile by clicking tile, into a frame is a toy in itself; the holes and the spill are funny, not shaming.
2. **Teacher on the board?** Yes — conservation of area made visible, the "bigger outline = more space" error refuted by holes, and rows × columns tallied as the tiles fall.
3. **Parent trust?** Calm, honest tile sizes, no timer, no score, one library picture.
4. **Invention:** tip the same tiles into a new frame — they fill it exactly, leave holes or spill — so "same area" means "the same tiles fit".

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-solved both tables with an independent solver (areas, ±1 decoys, congruence under every turn and flip, five shortcut bots): all 16 rounds valid, one right frame each; the row/column-sharing bot figures corrected (29 % / 13 %).
- G3-313 asks the child to "finish the multiplication", but the design banned the sign entirely. A success plate now engraves "{rows} × {cols} = {n}" in each locale's school sign (· in de/sv/da/no/fi), only after the tiles have proved it.
- Distinctness from New 292 The Pouring Frame (also "pours into a frame") and Row 170 written out: fixed mosaic into fixed frames of different shape = conservation, not a missing factor.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
