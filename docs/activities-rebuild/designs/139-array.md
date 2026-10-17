# Row 139 — Equal Groups → THE ACCORDION SENTENCE (2.OA.C.4)

## 0. Identity
- **id** `array.equal-groups.2-oa-c-4` (KEPT; slugs en/de/es/pt/fr/it/nl/sv/da/no/fi, page title and intro frozen) · grade 2 · CCSS 2.OA.C.4 · strand Operations & Algebraic Thinking · own files `accordion-core.js`, `accordion-activity.js`, `accordion-activity.html`, `accordion-activities.json` (the row leaves `array-activities.json`; row 138 `array.build-array` stays there untouched; 0 lines to `array-core.js`, `lcs-shell.*` or any shared core).
- **Frozen promise kept true:** "make equal groups — the same number in each — and find the total by repeated addition (4 + 4 + 4 = 12). Tap to fill the groups, watch them add up, then type how many in all." Level 1 does exactly that; Levels 2–3 add the coverage worksheets.
- **Worksheets covered:** G2-209 "Add It Again" (rings with the same amount → finish the addition) → Level 2 running-total windows · G2-210 "From Adding to Times" (equal groups → multiplication sentence) → the fold, every level · G2-213 "Easy Groups" (groups of 2, 5, 10) → Level 2 · G3-301 "Big Arrays" (count an array of up to 6 × 10) → Level 3 array rounds · G3-302 "Tricky Groups" (groups of 3–9) → Level 3 ring rounds.
- **Old activity:** eight rounds "make G groups of E" (2×3, 3×4, 4×2, 2×5, 3×3, 5×2, 4×4, 3×5): tap to fill ring-groups with dots, an equation strip appears, type the total. **Kept:** all eight rounds verbatim as Level 1, tap-to-fill, the automatic equation, the typed total, the 11-locale prompt "Make {groups} groups of {each}". **Changed:** the equation is now a physical folding strip that refuses to fold when the groups are not equal, and it folds into the multiplication sentence.

## 1. The pitch
"The adding sentence is printed on an accordion — one pleat for each group — and you can only squeeze it shut when every pleat is the same height: 4 + 4 + 4 folds flat into 3 × 4, while 4 + 4 + 3 springs back open because one pleat is short."

## 2. Why a child will want it again (the fun)
- **Bead rings that fill with a clink.** Each group is a round glass tray (drawn ring, 2.5 px teal ink) on a felt board. Tap a tray and a glass bead (drawn disc with a white highlight) drops in from the bead pot with a short clink; tap a bead to lift it back out. Beads arrange themselves in a neat dice-like pattern inside the tray so a group of 5 always *looks* like 5.
- **The accordion grows under the trays.** As each tray is filled, its beads tumble down a little chute into its own pleat of the paper strip below: the pleat stretches up to hold them (8 px per bead) and its number is stamped on the pleat face. Between pleats a "+" sits in the crease. The strip is cream paper with a faint zig-zag shadow — a real concertina.
- **THE SQUEEZE.** Two wooden handles sit at the ends of the strip. Drag the right handle toward the left (or tap the squeeze button) and the pleats fold up one behind another with a papery *fffrrp* (each fold 90 ms). Equal pleats stack into one neat thick panel: the front face shows "4", and the edge of the stack shows three coloured pleat-edges. Then the "+" signs, squeezed together, cross into a "×" and the panel reads **3 × 4**.
- **The spring-back.** If one pleat is taller or shorter, the stack will not lie flat: the odd pleat pokes up above the others (coral) or leaves a dashed gap, the handles quiver and the whole strip springs back open with a *boing*. Children squeeze unfair strips on purpose to watch it.
- **The earned show:** a fair fold is tied with a ribbon and slides into a little "times book" in the corner, where the round's sentence is kept (3 × 4 = 12). The book's spine thickens one page per round. Pull the ribbon to open it again: it unfolds back into 4 + 4 + 4. No timer, score, streak or lives.
- **Free play ("Bead board"):** between rounds, make any trays, fill them anyhow, and squeeze — the strip folds or springs back. Turning an unfair strip into a fair one by moving one bead is its own little puzzle.

## 3. The skill and the misconception
- **Skill (2.OA.C.4 + G2-209/210/213, G3-301/302):** find the total of equal groups (and of an array's rows) by repeated addition; write it as a sum of equal addends (4 + 4 + 4 = 12) and connect it to multiplication (3 × 4 = 12, 3 groups of 4); skip-count the running total for groups of 2, 5 and 10.
- **Misconception 1 — groups that are not equal still "multiply"** (a child fills 4, 4, 3 and calls it 3 × 4). **Push back:** the pleats are as tall as their bead count, so the 3-pleat is shorter; it cannot stack flat; the strip springs back open and the short pleat's empty bead slot shows dashed. Multiplication is only *possible* when the groups are equal — the child feels it in the handle.
- **Misconception 2 — counting every bead one by one instead of adding groups.** **Push back:** in Level 2 the running-total windows sit on the creases (after pleat 1, 2, 3 …), and each window only opens when typed; the child is invited to add a whole group at a time (4 → 8 → 12). In Level 3 the beads are small and many (up to 48) — counting by ones is visibly slow, groups are the way.
- **Misconception 3 — mixing up "how many groups" and "how many in each"** (writes 4 × 4 for 3 groups of 4, or adds 3 + 3 + 3). **Push back:** after the fold, the two numbers live in two different places: the *number on the face* (how many in each) and the *number of pleat edges in the stack* (how many groups), each edge a different tray colour. A miss on the sentence lights the pleat edges and counts them out with a tick on each.
- **Misconception 4 — the array is a different thing** (G3-301). **Push back:** in array rounds the rows of the array ARE the trays — each row drops into its own pleat. The child sees that 4 rows of 9 and 4 groups of 9 make the same strip.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (iframe):**
- **Felt board** (470 × 230): the trays in a row (≤ 5) or two rows (6–9). Tray diameter: 96 px for groups up to 6 beads, 84 px for 7–10; beads 18 px (14 px in Level 3 when a tray holds 7–9). In array rounds the board shows a drawn grid of bead wells (rows × columns, well 30 px, gap 8 px, up to 6 × 10 → 380 × 228) with a faint tray-coloured band behind each row.
- **The bead pot** (left of the board, 56 × 64): a drawn jar of beads; it never runs out.
- **The accordion strip** (470 × up to 120) directly under the board: one pleat per group, pleat width = 440 / groups (min 46 px), pleat height = 24 + 8 × beads (up to 104), numeral on the pleat face 22 px, "+" in each crease 18 px. Running-total windows (34 × 26) sit on each crease, under the "+".
- **Handles:** two wooden pegs (24 × 44) at the strip ends; the right one is the squeeze handle (a 48 px hit area).
- **Times book** (top right of the apparatus, 44 × 56): drawn book; a page per finished round.
- **Right column:** the bubble (feedback), the round's prompt in big type ("Make 3 groups of 4."), the total box and keypad (keys 48 px), Check.
- **Task line (EN, 22 px, one line):** "Fill the groups the same, then squeeze the sentence." (Level 2/3: "Add one group at a time, then squeeze the sentence.")

**At 360 px:** board 328 wide (trays 72 px, beads 14 px; two rows from 5 groups), accordion 328 × ≤ 96 (pleat min 34 px for 9 groups, numerals 16 px), handles 20 × 40 (hit 44), keypad 4 × 3 under the strip (keys 44 px), Check at ≈ 640 px on 360 × 740; at 320 × 640 trays 64 px, beads 12 px, Check ≈ 600.
- **No words on the apparatus:** only numerals, "+", "×", "=" and beads.
- **Pictures:** none on the apparatus — beads are drawn counters (tool-grade, like the rekenrek). The ruling (counters in frames are drawn) applies: up to 48 counters cannot be library pictures at ≥ 64 px.

## 5. The hand
- **Fill (Level 1 and fix rounds):** the strip only tests EQUALITY; the prompt sets HOW MANY. A fair fold of the wrong size (3 groups of 3 when the prompt says 3 groups of 4) folds flat, but its face number does not match the prompt card, which stays lit and wobbles (see §7). Tap a tray → one bead drops in (80 ms arc + clink, pitch rises with the bead count in that tray). Tap a bead in a tray → it hops back to the pot. A tray holds at most 10. The tray's pleat updates live (height grows 8 px per bead, 120 ms ease). Long-press a tray → it empties.
- **Running-total windows (Level 2):** tap a window → it opens a box; type with the keypad; Enter or tap the next window. A typed running total that is wrong does not light up the next window — see §7. Running totals shown automatically in Level 1 ("watch them add up": each window ticks open as the pleat beside it fills).
- **Squeeze:** drag the right handle left (any distance > 60 % folds it; less snaps back) or tap the **squeeze button** (a drawn concertina icon, 48 px) — the keyboard path is Space on the strip. The fold takes 90 ms per pleat; a spring-back takes 400 ms.
- **The sentence:** after a fair fold, the panel shows "▢ × ▢ = ▢" under it; tap a box, type. Level 1 asks only the total (the factors are stamped automatically); Level 2 the total; Level 3 all three.
- **Undo:** any bead, any typed box can be changed until Check; unfolding is a pull on the ribbon (drag right).
- **Free play:** "Bead board" (settings) — trays can be added (+ button, up to 9) and removed; no Check.
- **Sound:** clink per bead, papery fold, boing on spring-back, a soft three-note chime on success. TTS (bonus): the prompt and "4 plus 4 plus 4 is 12; 3 groups of 4".

## 6. The rounds
One round = one prompt. ≥ 7 per level, order-only reshuffle per pass (a new order that never equals the previous pass's order).

**Level 1 — Fill and add (kept old rounds; the child fills; running totals appear by themselves; type the total)**
| # | prompt | groups × each | total | running totals shown |
|---|---|---|---|---|
| 1 | Make 2 groups of 3. | 2 × 3 | 6 | 3, 6 |
| 2 | Make 3 groups of 4. | 3 × 4 | 12 | 4, 8, 12 |
| 3 | Make 4 groups of 2. | 4 × 2 | 8 | 2, 4, 6, 8 |
| 4 | Make 2 groups of 5. | 2 × 5 | 10 | 5, 10 |
| 5 | Make 3 groups of 3. | 3 × 3 | 9 | 3, 6, 9 |
| 6 | Make 5 groups of 2. | 5 × 2 | 10 | 2, 4, 6, 8, 10 |
| 7 | Make 4 groups of 4. | 4 × 4 | 16 | 4, 8, 12, 16 |
| 8 | Make 3 groups of 5. | 3 × 5 | 15 | 5, 10, 15 |
The board starts with the right NUMBER of empty trays (the old activity did too); the child decides how many beads go in each.

**Level 2 — Easy groups (G2-209, G2-213): trays arrive filled; type each running total, then the total**
| # | groups × each | beads as delivered | total | note |
|---|---|---|---|---|
| 1 | 3 × 2 | 2, 2, 2 | 6 | |
| 2 | 4 × 5 | 5, 5, 5, 5 | 20 | |
| 3 | 2 × 10 | 10, 10 | 20 | |
| 4 | 5 × 2 | 2, 2, **3**, 2, 2 | 10 | fix round: one tray has an extra bead — the strip will not fold until it is lifted out |
| 5 | 3 × 10 | 10, 10, 10 | 30 | |
| 6 | 6 × 5 | 5, 5, 5, 5, **4**, 5 | 30 | fix round: one tray is a bead short |
| 7 | 4 × 10 | 10, 10, 10, 10 | 40 | |
| 8 | 7 × 2 | 2, 2, 2, 2, 2, 2, 2 | 14 | |
Level 2 prompts carry NO numbers ("Add up the groups.") — the child reads how many trays and how many in each off the board; only fix rounds name the target ("Each group should have 2."), because a fix needs a rule to fix to. The odd tray's position differs (3rd of 5, 5th of 6) and moves with the pass rotation (§ answer position).

**Level 3 — Tricky groups and big arrays (G3-302, G3-301): type the total and the multiplication**
| # | shape | groups/rows × each/columns | total | note |
|---|---|---|---|---|
| 1 | trays | 6 × 3 | 18 | |
| 2 | trays | 4 × 7 | 28 | |
| 3 | trays | 8 × 4 | 32 | |
| 4 | trays | 3 × 9, delivered 9, **8**, 9 | 27 | fix round: one tray short |
| 5 | array | 5 rows × 6 | 30 | |
| 6 | array | 4 rows × 9 | 36 | |
| 7 | array | 6 rows × 8 | 48 | |
| 8 | trays | 9 × 3 | 27 | same total as #4 — the child sees 9 × 3 and 3 × 9 make 27 |
No 0 anywhere; totals 6–48. Level 3 prompts carry NO numbers either ("How many in all? Write the times sentence." / array: the same) — counting the groups and the size of one group off the board IS G3-301/302; a prompt that said "6 groups of 3" would hand over both factors.

- **Answer position:** answers are typed numbers, so there is no position to guess. Fix rounds: the odd tray's index is listed for pass 1 and shifts **+1 per pass modulo the group count** (critic: the old +2 step only ever visited trays 1, 3, 5 of a 6-tray round — 2 and 6 share a factor; measured `work-c35/accordion-c35.js`). With +1 it never repeats on consecutive passes and each index is used ⌈12/groups⌉ or ⌊12/groups⌋ times over 12 passes; the gate asserts exactly that.
- **Shortcut bots, measured (`work-c35/accordion-c35.js`):** (a) "multiply the numbers in the prompt" — Level 1 cannot be Checked until the trays hold the prompt's beads (empty or wrong-size fills are refused, §7), and Levels 2–3 prompts carry no numbers at all, so there is nothing to multiply but the board; (b) "squeeze an unequal strip" — refused by the model (every ±1 perturbation of every one of the 24 rounds fails `canFold`: 0 exceptions); (c) "type one tray's count as the total" — 0/24 rounds; (d) "type groups + each" — 0/24 rounds (no round has g + e = g × e); (e) the sentence bot "each × each" is right only where it IS the sentence (3 × 3, 4 × 4).

## 7. Check, the misses, the success
- **Check with nothing done** (Level 1 empty trays / no total typed) → no miss; the bead pot wiggles. Hint: "Put beads in the groups first."
- **Equal but not what the prompt asked** (Level 1: 3 trays of 3 for "Make 3 groups of 4") → counts as miss 1: the strip folds flat (it IS fair), the face shows 3, and the prompt card's "4" and the face's "3" both pulse side by side; then it unfolds. Hint: "Fair groups! But each group needs {each}." Miss 2: one ghost bead appears in every tray where a bead is missing (or one lifted bead hovers over every tray with an extra one).
- **Check with an unequal strip** (any level) → no squeeze possible; Check squeezes for the child and the strip springs back. That counts as **miss 1** for the round.
- **Miss 1 — what the apparatus SHOWS:**
  - unequal groups → spring-back; the odd pleat stays standing a second longer and pulses coral (too tall) or shows its dashed empty slot (too short). Hint: "One group is different. Make every group the same, then squeeze."
  - wrong running total (Level 2) → the window shakes; the pleat beside it lights its beads and the previous window's number flies into the pleat to show "8 + 4". Hint: "Add one more group of {each} to {previous}."
  - wrong total → the folded panel unfolds one pleat at a time and each pleat's number drops into the crease windows (4, 8, 12) as it goes. Hint: "Count by {each}s: one jump for each group."
  - wrong sentence (Level 3) → the pleat edges light one by one with a tick and a count under them (1, 2, 3); the face number pulses. Hint: "How many groups? How many in each?"
- **Miss 2 — the stronger showing:** the beads of every tray line up into a single row beneath the strip in tray colours, grouped by a small gap, with the running total printed under each group's last bead (4 | 8 | 12). For unequal strips, a ghost bead appears where one is missing or a lifted bead hovers above the extra one. Hint: "Look at the row: every group needs {each}." / "Look at the row: {groups} groups of {each} make {total}."
- A new move (a bead, a key) takes the help away until the next Check.
- **Success:** the strip folds flat, the "+" signs cross into "×", the ribbon ties it, the panel reads "3 × 4 = 12", and the strip slides into the times book. Bubble: "4 + 4 + 4 = 12. That is 3 groups of 4: 3 × 4 = 12!" (array rounds: "9 + 9 + 9 + 9 = 36. 4 rows of 9: 4 × 9 = 36!")

## 8. Settings (each visibly changes the board at rest)
1. **Level:** Fill and add / Easy groups / Tricky groups and arrays — at rest: empty trays + pot (L1), filled trays with blank crease windows (L2), more trays or an array grid with blank "▢ × ▢" (L3).
2. **Running totals:** shown / hidden — the crease windows on the accordion are visible (with numbers in L1, blanks in L2) or removed entirely (the child adds in their head; L3 default hidden).
(Free play "Bead board" is a third option of Level.)

## 9. Words (EN source; native authors write the other 10)
- title (frozen per locale, page): "Equal Groups" · instruction: "Fill the groups the same, then squeeze the sentence." · instruction L2/3: "Add one group at a time, then squeeze the sentence."
- prompts: L1 "Make {groups} groups of {each}." (KEPT string `promptGroups`, minus "How many in all?" which moves to the total box label) · L2 "Add up the groups." · L2 fix "Each group should have {each}." · L3 "How many in all? Write the times sentence." (trays and arrays alike — no numbers in any L2/L3 prompt) · total box label "How many in all?"
- hints: empty "Put beads in the groups first." · wrongSize "Fair groups! But each group needs {each}." · unequal "One group is different. Make every group the same, then squeeze." · runWrong "Add one more group of {each} to {previous}." · totalWrong "Count by {each}s: one jump for each group." · sentenceWrong "How many groups? How many in each?" · miss2 "Look at the row: every group needs {each}." / "Look at the row: {groups} groups of {each} make {total}."
- success: "{sum} = {total}. That is {groups} groups of {each}: {groups} × {each} = {total}!" (array: "{rows} rows of {cols}: {rows} × {cols} = {total}!")
- settings: "Level" — "Fill and add" / "Easy groups" / "Tricky groups and arrays" / "Bead board" · "Running totals" — "Shown" / "Hidden"
- aria: tray "Group {i}: {n} beads" · pleat "Pleat {i}: {n}" · handle "Squeeze handle" · window "Total after group {i}" · book "Times book, {n} pages".
- **Locale traps.** (1) **Multiplication sign:** de, sv, da, no, fi write the middle dot "·" (Malpunkt) in Grade 2; fr, es, it, pt, nl, en write "×". The crossing "+ → ×" animation becomes "+ → ·" in the dot locales (the two strokes shrink into the dot). Never show both. (2) **Reading order of a product:** "3 × 4" = "3 groups of 4" is the convention in all 11 school systems here (de *3 mal 4*, sv *3 gånger 4*, fi *3 kertaa 4*); because some homes read the factors the other way, the **typed sentence accepts either order** (3 × 4 or 4 × 3) — both are true — while the success line always says it in the locale's school order. (3) "groups of": de "Gruppen mit je 4", fr "groupes de 4", es "grupos de 4", it "gruppi da 4", pt "grupos de 4", nl "groepen van 4", sv "grupper med 4 i varje", da "grupper med 4 i hver", no "grupper med 4 i hver", fi "ryhmää, joissa kussakin on 4" (partitive after the number: "3 ryhmää") — all already authored in the kept `promptGroups`. (4) "rows" (array): de Reihen, fr rangées, es filas, it righe, pt fileiras, nl rijen, sv rader, da rækker, no rader, fi riviä. (5) No decimals, no number words on screen.

## 10. Sound off, access, phones
- Legible with the sound off: every count is a numeral on a pleat; the fold/spring-back is the feedback; TTS is a bonus.
- Keyboard: Tab trays → + / − add/remove a bead; Tab crease windows → digits; Space on the strip squeezes; R pulls the ribbon (unfold).
- aria-live: "Pleat 3 is shorter. The sentence cannot fold." / "Folded: 3 × 4."
- Taps: trays 72–96 px, beads are not separate targets on phones (tap the tray to add, long-press to remove one), handle hit 48 px, keys 44–48 px, Check 48 px.
- Pictures: none at play size (counters are drawn), so the 96/64 px picture floor does not bind; bead ≥ 12 px.
- Check above the fold at 360 × 740 (≈ 640) and 320 × 640 (≈ 600). Phone layout: keypad moves under the strip; the times book becomes the progress chip.

## 11. Distinct from
- **Row 192 Echo Grove (3.OA.A.1)** covers the same five worksheets (G2-209/210/213, G3-301/302) from the other side: there the child sets ONE call pole and every strike plants an exact copy, so equal groups are equal *by construction*. Here the groups are filled freely and the material *tests* equality — the strip refuses an unequal sum. Two inventions, two moves: build by copying vs check by folding. **New 292 Pouring Frame (3.OA.B.6)** pours a fixed total into a frame to find a missing factor (division); it never shows a sum of equal addends.
- **Row 138 Build an Array** (sibling row, same engine today): builds an array by rows/columns; this row is equal *groups* and the adding↔multiplying sentence. Row 170 Stamp Sheet (2.G.A.2) partitions a rectangle; New 252 Washing Line lays bags end to end on a line (skip counting as length); New 272 Double Stamp prints pictures worth two (scaled graphs).
- **Premium tool `baking-tray`** breaks an array into two known facts (distributive); `lids` hides equal shares under lids; `folding-wall` folds away known tables. None prints the repeated addition on a strip that folds into the product.
- **Registry:** no built or designed invention uses a concertina; the nearest "only fits when equal" mechanics (Fair Tug, Ten-Seat Wheel, Lunchbox groove) test a whole against parts, not equality of addends.

## 12. Build plan
- **Core `AccordionCore`:** state `{level, groups:[n…], target:{groups,each}|{rows,cols}, windows:[typed…], total:typed, sentence:[a,b,c], folded:bool}`; `addBead(i)`, `removeBead(i)`, `canFold(state)` → `groups.length ≥ 2 && all equal && each ≥ 1`; `runningTotals(state)`; `checkWindow(i, v)`; `checkTotal(v)`; `checkSentence(a,b,c)` → `{a,b} = {groups,each}` as a multiset and `c = groups × each`; `round(level, i)`; `shuffledOrder(n, prev)`; `oddIndex(round, pass)`.
- **Gate's own truth (`verify-accordion-core.js`):** an independent table of the 24 rounds (groups, each, total, odd tray index/delta); asserts: every total = groups × each and ≥ 6; Level 1 = the 8 kept old rounds verbatim; `canFold` false for every single-bead perturbation of every round (+1 or −1 on any tray) and true only for the exact equal state; the sentence accepts both orders and rejects (groups, groups), (each, each), (groups+each) sums; fix rounds' odd index shifts +1 per pass and every index occurs ⌊12/g⌋ or ⌈12/g⌉ times over 12 passes; a Level-1 fill that is equal but of the wrong size is refused; no Level 2/3 prompt string contains a digit or a {groups}/{each} placeholder; no 0; the reshuffle never repeats the previous pass; the success string's numbers equal the round's (string test over all 11 locales); the multiplication glyph per locale is "·" for de/sv/da/no/fi and "×" otherwise.
- **Mutations (each must be killed):** fold allowed with one unequal pleat · pleat height not proportional to beads · sentence accepts groups × groups · running window accepts the bead count of one tray · Level 1 rounds differ from the kept table · fix round's odd tray always index 0 · odd index stepped +2 (misses half the trays when g is even) · Level 1 accepts 3 trays of 3 for "3 groups of 4" · an L2/L3 prompt shows the factors · glyph "×" in de · Check with empty trays counts as a miss · reshuffle repeats · success line shows the total as groups + each · array rows not mapped one row per pleat.
- **Pictures:** none. **Risks:** the fold animation must stay legible at 9 pleats on 320 px (min pleat 30 px; numerals 14 px; tested by local-test at 320). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a real concertina that folds with a *fffrrp* or springs back with a *boing*, glass beads that clink, and a little times book that thickens.
2. **Would a teacher put it on the board?** Yes — it is the exact bridge the curriculum wants: equal addends ⇄ multiplication, and the strip *refuses* unequal groups by physics, not by a message.
3. **Would a parent trust it?** Calm, numerals only, no score, no timer; the sentence always says what the beads show.
4. **The invention:** the repeated-addition sentence is an accordion — one pleat per group, as tall as its group — and only equal pleats fold flat into the multiplication.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- **The fix-round rotation was wrong:** +2 per pass only ever visited the odd-numbered trays of a 6-tray round (2 and 6 share a factor) — measured; now +1 per pass, uniform, never the same tray twice running.
- **A fair fold of the wrong size had no answer in §7** (3 trays of 3 for "3 groups of 4" would fold and pass). Now it folds (it IS fair — the material stays honest) but the prompt's "4" and the face's "3" pulse together; miss 2 ghosts the missing beads. New hint `wrongSize`.
- **Levels 2–3 prompts handed over both factors** ("6 groups of 3" → the child could multiply the prompt without looking). The prompts now carry no numbers: counting groups and the size of one group off the board is exactly G3-301/302.
- Shortcut bots re-measured with my own script (`work-c35/accordion-c35.js`): every ±1 perturbation of all 24 rounds refuses to fold; one-tray-as-total and groups+each bots 0/24.
- §11 now names Row 192 Echo Grove (same five worksheets, opposite move: copies by construction vs equality tested by folding) and New 292.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
