# New 260 — The Clue Table: the windows with the latch rods (READINESS logic grids)

## 0. Identity
- id `clue-table.play.logic-grids` · grade 1 (levels reach grade 3) · READINESS logic grids (framework from `frontend/lib/frameworks.ts`, readiness strand) · strand Logic & Visual Thinking · key `clue-table` (files `clue-table-core.js`, `clue-table-activity.js`, `clue-table-activity.html`, `clue-table-activities.json`).
- worksheets covered: **G1-349** Picture Clue Logic Puzzles: Cross Out and Find · **G2-319** Logic Grid Puzzles: Three Clues, One Answer · **G2-344** Yes, No and Either-Or Clues · **G2-345** Read the Logic Grid: True or False · **G3-378** 4 by 4 Logic Grid Puzzles: Six Clues · **G3-379** Two-Attribute Logic Puzzles: Two Pictures per Child.
- merged instruments (each is a level here): grade 2 "The Clue Board" (yes/no/either-or + read a solved grid) and grade 3 "The Clue Stamps" (4 × 4, the sweep by hand).
- new instrument. From the sketches it keeps: picture-only clue cards, a "yes" that clears its row and column, the glowing last cell, the read mode with true/false. It adds: **the grid is a wall of little windows with shutters**, a "no" physically shuts one, a "yes" throws a window open and **latch rods** run along its row and column and shut every other window there — the rule "one each" is a visible mechanism, and in the by-hand setting the rods are taken away so the child must do their job. The child also has to **find the right square** for each clue (row meets column) — real grid reading, which the worksheets demand.

## 1. The pitch
"Drop each picture clue on the window where its friend's row meets its thing's column: a 'no' shuts that window, a 'yes' throws it open and the latch rods shut every other window in its row and column — and when a row has only one window left open, that is the answer."

## 2. Why a child will want it again
- A wall of windows is a toy: shutters clap shut with a wooden "tok", a window swings open with a light inside, and the brass latch rods slide along the wall with a satisfying "shhk-clack" shutting a whole row and column at once.
- Each clue card is a little puzzle to post: you carry it along the wall to the square where its friend and its thing meet, and it "stamps" itself and folds away into the clue box.
- The moment a row is down to one open window, the child is the detective who notices — tap it, it swings open, and the thing **slides out of the window onto that friend's plate**. When every friend has a plate, the friends hop one after another holding their things.
- Free play: on a solved board, the child can shut and open windows freely and watch the rods work, or drag a clue card over the grid to see where it would land (its row and column light up as a crosshair).
- No score, no timer, no lives.

## 3. The skill and the misconception
- Skill: read picture clues as statements (has / does not have / has one of two), place each on the grid at the meeting of its row and column, then use **one thing per friend, one friend per thing** to eliminate until every friend's thing is forced. Read mode (G2-345): read a solved grid to decide whether a picture sentence is true. Two-things level (G3-379): carry facts between three linked grids.
- Misconceptions and the push-back:
  1. **Reading a cross as "has it"** → a cross card physically **shuts** the window: shut = cannot be. A ring card opens a window with a warm light: open-and-lit = yes. The two marks never look alike on the board.
  2. **Stopping after one clue / not eliminating** → the board is not finished until every friend's plate holds a thing; the only way a window can be ticked is that it is the **last one open** in its row or column. Tapping an open window that is not yet forced makes it rattle and the other still-open windows in that row blink — "there are still two open here".
  3. **Placing a clue in the wrong square** (reading only the row, or only the column) → the card slides from where it was dropped along the row and then up the column to the right square, both lit, before it stamps.
  4. **Forgetting the column rule** (each thing belongs to only one friend) → the latch rod for a "yes" runs BOTH ways; in the by-hand setting, a row crossed but a column forgotten leaves visible open windows in that column that the board refuses to finish with.

## 4. The stage
At 704 (stacked layout for every grid (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704); the stage is ≈ 648 px wide, and wall + plates + a 196 px clue box would need ≈ 700, so the clue box sits below the wall at every size):
- **The window wall** (drawn apparatus): a cream wall (#FBF3E4, 3 px ink #0F4A40, radius 16).
  - **Row headers** (left): friend pictures 96 × 96 in white roundels.
  - **Column headers** (top): thing pictures 96 × 96.
  - **Cells** = windows 104 × 104 (3 × 3: 104 + 3 × 104 = 416 wide; 4 × 4 stacked: 104 + 4 × 104 = 520). Each window: a teal frame (#146B5E, 3 px), sky-pale glass (#EAF4F2), two wooden shutter leaves folded open at its sides.
    - **Shut** (no): both leaves swing closed with a big coral ✗ painted across them (#F2784B) — the mark the clue card carried.
    - **Open-yes**: the leaves fold wide, the glass glows warm yellow (#FFE9A8), a teal ring is drawn round the pane, and a 72 px copy of the thing picture shows inside.
    - **Open-unknown**: glass, leaves half open (rest state).
  - **Latch rods**: a thin brass rod (#C99A3A, 6 px) along the top of each row and the side of each column; drawn only in the "the grid does it" setting.
  - **Plates**: at the right end of each row, a drawn plate 88 px (white with a 2 px ink rim); empty until the friend's thing slides onto it.
- **The clue box** (below the wall at every size): clue cards 196 × 104 stacked in a column (or 2 per row below). A card = white, 3 px ink, radius 12; left the friend picture 72, right the thing picture 72 with:
  - **ring** (yes): a thick teal circle round the thing;
  - **cross** (no): a coral ✗ over the thing;
  - **either-or**: the two things side by side (64 each) inside ONE teal ring split by a thin vertical bar — "one of these".
  Stamped cards fold flat into a small spent-card pile with a faint mark (24 px thumbnail).
- **Read mode only**: two bins under the wall, a teal bin with a big ✓ and a coral bin with a big ✗ (180 × 104 each). The wall is already solved (open-yes and shut windows).
- **Two things level**: three walls in an L — friends × toys (top left), friends × fruits (top right, sharing the friend headers), toys × fruits (below the left wall, its row headers the toys, its column headers the fruits). Cells 72 at 704, header pictures 96 on the outer edges.
- Task line above (≤ 24 px, ≤ 2 lines); feedback bubble under the stage.

At 360 (stage ≈ 336):
- 3 × 3: headers 64 (pictures 64), cells 84 → 64 + 3 × 84 = 316; there is no plate column: the thing slides onto the **friend header roundel** and sits on its corner at 40 px. Clue cards 160 × 80 (pictures 64), two per row under the wall; spent cards as a strip of 28 px thumbs.
- 4 × 4: headers 60, cells 66 → 60 + 4 × 66 = 324; header pictures 60 → within PICTURE-RULINGS' puzzle-grid floor (grid headers ≥ 30 px at 360 / ≥ 40 at 704; at 320 they are 56); taps 66 ≥ 44. The thing copy inside an open-yes window (72 at 704, 52 at 360, 40 in the two-things walls) is likewise a grid mark above the floor; the full-size picture is always its column header.
- Two things: the two friend walls become **tabs** (the toys header row and the fruits header row as two tab buttons above one 3 × 3 wall, pictures 64), the toys × fruits wall under it; switching tabs slides the wall sideways.
- Height: 3 × 3 = 64 + 3 × 84 + 12 + 2 × 88 = 504 px stage; with header, task line and bubble the wall and the first row of clues fit 360 × 740; at 320 × 640 the clue rows scroll inside the card (the wall stays above the fold; there is no Check button — the board checks each move).

Library pictures (checked in `mini tools/pictures/<theme>.json`, seen on contact sheets 2026-10-17):
- **Friends** (farm-animals): cat, dog, rabbit, pig, duck, sheep. Library children are too few and the "baby/girl" pictures are people, so friends are animals — the worksheets' "child" becomes "friend" in every string.
- **Toys** (toys): ball, kite, car, boat, train. **Fruits** (fruits): apple, banana, pear.
- Rulings: farm-animals/cat_2 is a near-duplicate of cat — never shown with cat; toys/doll, baby, girl, baby_girl are people — not used; fruits/cherry is drawn as an apple — not used; pear and banana are both yellow-ish but differ strongly in shape — allowed (gate: never the only difference in a row is colour).

Drawn apparatus: wall, windows, shutters, rods, plates, card frames, ring, cross, bins. No words on the apparatus; ✓ and ✗ are the content marks.

Task lines (EN): solve "Put each clue on its window. Then find what every friend has." · read "Is the clue true? Drop it on ✓ or ✗." · two things "Each friend has one toy and one fruit. Use the clues to find both."

## 5. The hand
- **Drag a clue card** → lifts (80 ms); while it is over the wall, its friend's row and its thing's column light as a soft crosshair (pale teal), so the meeting square is visible before the drop. Drop:
  - **on the right window** → the card stamps: a "no" claps the shutters shut with the ✗ (tok, 220 Hz, 160 ms); a "yes" throws the window open, glowing (chime 880 Hz) and — with rods on — the row rod and column rod slide (320 ms) and shut every other window in that row and column one after another (40 ms stagger, little toks); an either-or shuts every other window in the friend's row (rod slides only to the two left open). The card folds into the spent pile (260 ms).
  - **on a wrong window** → no penalty: the card glides along the dropped-on row to the right column, then along the column to the right row (each leg 260 ms, the path drawn as a dashed line), then stamps. Counted as a *nudge* (two nudges in a round → bubble "Find the friend's row and the thing's column — the clue lives where they meet.").
  - **off the wall** → returns to the box.
- **Tap an open window**:
  - it is the **last open** window in its row **or** its column, and no yes exists there yet → it swings open (yes), rods sweep (auto), the thing slides out of the window onto that friend's plate (arc, 360 ms, plate clink);
  - it is **not yet forced** → it rattles (±4 px, 3 ×, 240 ms) and the other open windows in its row (and, if also not forced in the column, its column) blink twice; counted as a miss (§7).
- **By-hand setting**: rods are gone; a yes opens only its own window. The child taps open windows in that row/column to shut them (sweep): a window in the row or column of a yes shuts (tok); a window **not** in the row or column of any yes, and not shut by a clue, refuses (shake) and the clue/yes that would be needed lights nothing — bubble "Only a yes in its row or column can shut this window." A forced window still cannot be opened while two are open in its row.
- **Undo**: tap a spent card → it unfolds and its stamp is taken back (and anything that only it caused re-opens; the core recomputes). Shut-by-sweep windows re-open if their yes is undone.
- **Read mode**: drag a statement card to ✓ or ✗ bin; it drops in (bounce) — checked on the drop (§7).
- **Free play** on a solved board: tap any window to toggle open/shut and watch the rods move; drag a card around to see its crosshair.
- Optional TTS: long-press a picture → its noun.

## 6. The rounds
Notation: `cat ✓ kite` = card "cat has the kite" (ring) · `cat ✗ ball` = "cat does not have the ball" (cross) · `rabbit ✓ banana|pear` = either-or. Every puzzle was checked by an exhaustive solver (all permutations): **exactly one solution, every clue needed, and solvable by only the board's two moves** (stamp + rods, then "last open window"). The first forced window varies across rows and columns (listed). Header order on the wall is shuffled per showing (rows and columns independently) — so the solution is never the diagonal by position; the gate checks the shuffled boards (§ answer position).

**Level "2 friends" (G1-349) — 7 puzzles** (one clue each; things and friends vary)
| # | friends | things | clue | solution |
|---|---|---|---|---|
| T1 | cat, dog | ball, kite | cat ✗ ball | cat kite · dog ball |
| T2 | rabbit, pig | car, boat | pig ✓ car | pig car · rabbit boat |
| T3 | duck, sheep | apple, banana | duck ✓ apple | duck apple · sheep banana |
| T4 | cat, rabbit | kite, boat | rabbit ✗ boat | rabbit kite · cat boat |
| T5 | dog, pig | banana, pear | dog ✗ pear | dog banana · pig pear |
| T6 | sheep, cat | ball, car | cat ✓ ball | cat ball · sheep car |
| T7 | duck, dog | pear, apple | duck ✗ apple | duck pear · dog apple |

**Level "3 friends" (G1-349, G2-319) — 9 puzzles** (friends cat, dog, rabbit; things per row of the table)
| # | things | clues | solution | first forced |
|---|---|---|---|---|
| H1 | ball, kite, car | cat ✓ kite · dog ✓ car | cat kite · dog car · rabbit ball | rabbit–ball |
| H2 | apple, banana, pear | cat ✓ banana · dog ✗ apple | cat banana · dog pear · rabbit apple | dog–pear |
| H3 | car, boat, train | rabbit ✗ boat · dog ✓ car | cat boat · dog car · rabbit train | rabbit–train |
| H4 | ball, kite, car | cat ✓ ball · rabbit ✗ car | cat ball · dog car · rabbit kite | rabbit–kite |
| H5 | apple, banana, pear | dog ✓ apple · rabbit ✗ pear | cat pear · dog apple · rabbit banana | rabbit–banana |
| H6 | car, boat, train | rabbit ✗ train · cat ✓ boat | cat boat · dog train · rabbit car | rabbit–car |
| H7 | ball, kite, car | cat ✗ ball · dog ✓ kite | cat car · dog kite · rabbit ball | cat–car |
| H8 | apple, banana, pear | rabbit ✗ banana · dog ✓ pear | cat banana · dog pear · rabbit apple | rabbit–apple |
| H9 | car, boat, train | cat ✓ train · dog ✗ boat | cat train · dog car · rabbit boat | dog–car |

**Level "3 friends, either-or" (G2-344) — 9 puzzles** (friends cat, dog, rabbit; things apple, banana, pear)
| # | clues | solution | first forced |
|---|---|---|---|
| E1 | dog ✗ pear · rabbit ✓ banana\|pear · rabbit ✓ apple\|banana | cat pear · dog apple · rabbit banana | rabbit–banana |
| E2 | cat ✗ apple · dog ✓ banana\|pear · dog ✓ apple\|banana | cat pear · dog banana · rabbit apple | dog–banana |
| E3 | cat ✓ banana\|pear · rabbit ✗ apple · rabbit ✗ pear | cat pear · dog apple · rabbit banana | rabbit–banana |
| E4 | dog ✗ apple · dog ✓ apple\|pear · rabbit ✓ banana\|pear | cat apple · dog pear · rabbit banana | dog–pear |
| E5 | cat ✓ banana\|pear · dog ✓ apple\|pear · cat ✗ banana | cat pear · dog apple · rabbit banana | cat–pear |
| E6 | rabbit ✓ apple\|pear · rabbit ✗ apple · cat ✓ banana\|pear | cat banana · dog apple · rabbit pear | rabbit–pear |
| E7 | dog ✓ banana\|pear · rabbit ✓ banana\|pear · dog ✓ apple\|pear | cat apple · dog pear · rabbit banana | dog–pear |
| E8 | dog ✗ banana · rabbit ✓ apple\|pear · dog ✗ pear | cat banana · dog apple · rabbit pear | dog–apple |
| E9 | cat ✓ banana\|pear · rabbit ✓ banana\|pear · cat ✓ apple\|banana | cat banana · dog apple · rabbit pear | cat–banana |

**Levels "4 friends" (K1–K9, four clues) and "4 friends, six clues" (K10–K18, the G3-378 form) — 9 puzzles each** (friends cat, dog, rabbit, pig; things ball, kite, car, boat).
| # | clues | solution | first forced |
|---|---|---|---|
| K1 | pig ✗ boat · dog ✗ boat · cat ✓ kite · pig ✗ car | cat kite · dog car · rabbit boat · pig ball | pig–ball |
| K2 | rabbit ✓ boat · cat ✗ car · dog ✗ car · cat ✗ ball | cat kite · dog ball · rabbit boat · pig car | cat–kite |
| K3 | cat ✗ boat · pig ✓ ball · dog ✗ boat · dog ✗ kite | cat kite · dog car · rabbit boat · pig ball | dog–car |
| K4 | pig ✗ boat · rabbit ✓ ball · pig ✗ kite · dog ✗ kite | cat kite · dog boat · rabbit ball · pig car | pig–car |
| K5 | rabbit ✗ car · pig ✗ car · rabbit ✗ boat · cat ✓ kite | cat kite · dog car · rabbit ball · pig boat | rabbit–ball |
| K6 | rabbit ✗ kite · rabbit ✗ car · pig ✗ car · dog ✓ ball | cat car · dog ball · rabbit boat · pig kite | rabbit–boat |
| K7 | cat ✓ ball · pig ✗ car · rabbit ✗ car · rabbit ✗ boat | cat ball · dog car · rabbit kite · pig boat | rabbit–kite |
| K8 | pig ✗ boat · cat ✗ ball · pig ✗ ball · dog ✓ car | cat boat · dog car · rabbit ball · pig kite | pig–kite |
| K9 | cat ✗ kite · dog ✗ boat · pig ✓ car · cat ✗ boat | cat ball · dog kite · rabbit boat · pig car | cat–ball |
| K10 | pig ✓ ball\|boat · cat ✗ ball · cat ✗ boat · rabbit ✗ kite · rabbit ✗ ball · cat ✗ kite | cat car · dog kite · rabbit boat · pig ball | cat–car |
| K11 | cat ✗ car · dog ✗ car · rabbit ✗ kite · rabbit ✗ boat · cat ✗ boat · rabbit ✗ car | cat kite · dog boat · rabbit ball · pig car | rabbit–ball |
| K12 | pig ✗ car · dog ✗ kite · pig ✗ kite · dog ✗ car · cat ✓ kite\|boat · pig ✗ boat | cat kite · dog boat · rabbit car · pig ball | pig–ball |
| K13 | pig ✗ car · rabbit ✗ car · pig ✗ ball · pig ✗ kite · cat ✗ ball · rabbit ✗ ball | cat car · dog ball · rabbit kite · pig boat | pig–boat |
| K14 | cat ✗ boat · pig ✗ kite · dog ✗ kite · cat ✗ kite · dog ✗ ball · dog ✗ boat | cat ball · dog car · rabbit kite · pig boat | dog–car |
| K15 | dog ✗ ball · pig ✗ ball · pig ✗ kite · dog ✗ kite · cat ✗ ball · pig ✗ boat | cat kite · dog boat · rabbit ball · pig car | pig–car |
| K16 | cat ✗ car · dog ✗ car · rabbit ✗ kite · cat ✗ kite · rabbit ✗ boat · rabbit ✗ car | cat boat · dog kite · rabbit ball · pig car | rabbit–ball |
| K17 | dog ✗ kite · cat ✗ kite · rabbit ✗ kite · rabbit ✗ ball · dog ✗ ball · dog ✗ car | cat ball · dog boat · rabbit car · pig kite | dog–boat |
| K18 | pig ✗ car · pig ✗ ball · dog ✗ car · cat ✗ ball · cat ✗ car · pig ✗ boat | cat boat · dog ball · rabbit car · pig kite | pig–kite |

**Level "Read the grid" (G2-345) — 7 boards**: a solved 3 × 3 wall (from H1–H7's solutions) and **four statement cards**, two true and two false, at least one of each mark (ring/cross) per board; a "false cross" (e.g. `cat ✗ kite` when the cat HAS the kite) is in every board — it is the exact reading the misconception gets wrong.
| # | board (solution) | statement cards (T/F) |
|---|---|---|
| R1 | cat kite · dog car · rabbit ball | cat ✓ kite (T) · dog ✓ ball (F) · rabbit ✗ car (T) · cat ✗ kite (F) |
| R2 | cat banana · dog pear · rabbit apple | dog ✓ pear (T) · rabbit ✓ banana (F) · cat ✗ apple (T) · dog ✗ pear (F) |
| R3 | cat boat · dog car · rabbit train | rabbit ✓ train (T) · cat ✓ car (F) · dog ✗ boat (T) · rabbit ✗ train (F) |
| R4 | cat ball · dog car · rabbit kite | dog ✓ car (T) · cat ✓ kite (F) · rabbit ✗ ball (T) · cat ✗ ball (F) |
| R5 | cat pear · dog apple · rabbit banana | rabbit ✓ banana (T) · dog ✓ pear (F) · cat ✗ apple (T) · dog ✗ apple (F) |
| R6 | cat boat · dog train · rabbit car | cat ✓ boat (T) · rabbit ✓ train (F) · dog ✗ car (T) · rabbit ✗ car (F) |
| R7 | cat car · dog kite · rabbit ball | rabbit ✓ ball (T) · dog ✓ car (F) · cat ✗ kite (T) · dog ✗ kite (F) |

**Level "Two things each" (G3-379) — 7 puzzles** (friends cat, dog, rabbit; toys ball, kite, car; fruits apple, banana, pear). A **link card** shows a toy and a fruit joined by a short rod with a ring or cross: `ball—apple ✓` = "the friend with the ball has the apple".
| # | clues | solution |
|---|---|---|
| W1 | dog ✗ ball · rabbit ✗ apple · car—apple ✗ · dog ✗ banana · cat ✗ kite · dog ✗ kite | cat ball+apple · dog car+pear · rabbit kite+banana |
| W2 | dog ✓ kite · rabbit ✗ banana · kite—pear ✗ · dog ✗ banana · ball—banana ✗ | cat car+banana · dog kite+apple · rabbit ball+pear |
| W3 | car—pear ✗ · kite—pear ✗ · kite—banana ✗ · rabbit ✗ kite · dog ✓ banana | cat kite+apple · dog car+banana · rabbit ball+pear |
| W4 | cat ✗ apple · rabbit ✓ car · cat ✗ pear · cat ✗ ball · car—apple ✗ | cat kite+banana · dog ball+apple · rabbit car+pear |
| W5 | dog ✓ apple · cat ✓ kite · ball—banana ✗ · dog ✗ ball | cat kite+banana · dog car+apple · rabbit ball+pear |
| W6 | rabbit ✓ kite · car—pear ✗ · rabbit ✗ pear · kite—apple ✗ · cat ✗ ball | cat car+apple · dog ball+pear · rabbit kite+banana |
| W7 | car—apple ✗ · cat ✓ kite · dog ✗ car · car—banana ✗ · dog ✗ apple | cat kite+apple · dog ball+banana · rabbit car+pear |
Two things uses a third board move, shown as apparatus: **the carry thread** — whenever ANY window in ANY of the three walls is open-yes, it links two rows/columns of the other two walls, and a thin thread runs between them: a yes at friend × toy links the friend's fruit row with that toy's fruit row; a yes at friend × fruit links the friend's toy row with that fruit's column in toys × fruits; a yes at toy × fruit links the toy's column in friends × toys with the fruit's column in friends × fruits. Every shut (and every yes) on one end of a thread is **copied** (ghost ✗, then real) to the other end, both ways. The child taps to accept each copy (one tap per thread), so the inference is theirs but the path is visible. (Critic, verified by an independent solver: W1, W4, W5, W6, W7 solve with friend × toy threads alone; **W2 and W3 need the threads from friend × fruit / toy × fruit yeses** — so all three thread kinds are required, not only the one the first draft described.)

- **Friend relabelling**: each showing draws the 2 / 3 / 4 friends from {cat, dog, rabbit, pig, duck, sheep} and relabels the puzzle (a renaming of rows — the logic is unchanged; the gate asserts uniqueness and the first forced cell survive every relabelling), so the same three animals are not on every 3 × 3 board.
- **Answer position**: rows and columns are shuffled independently at every showing; gated over 300 passes per level: the solution's cells never form the main diagonal more than 1 board in 9; in 3 × 3 the first forced window sits in each row 25–42 % and each column 25–42 %; in read mode the true/false cards are dealt in a shuffled order with the false cross never first more than 1 in 3.
- **Order**: order-only reshuffle per pass (`nextTask`), never the same sequence twice in a row.

## 7. Check, the misses, the success
There is no Check button: the board answers every move. A **miss** is a tap on an open window that is not yet forced, a by-hand shut that is not allowed, or (read mode) a card in the wrong bin.
- **Nothing done for 20 s** → bubble "Pick up a clue card and put it on its window." (no miss)
- **All clues stamped, nothing forced tapped for 20 s** → the rows whose windows are down to one open window get a faint outline (no miss); bubble "Look for a row with only one window open."
- **Miss 1** → the window rattles, the other open windows in its row and column blink twice, and **a counter of open windows appears in the row's margin as dots** (●● = two still open) for that row and that column. Bubble: "Two windows are still open here — it could be either. Find a row or column with only one left."
- **Miss 2** → the forced window (the round's next forced window from the solver) **glows** with a breathing teal ring and its row rod glints. Bubble (whichever is true of the glowing window — row is checked first): "This window is the only one left open in its row. Tap it!" · "This window is the only one left open in its column. Tap it!"
- Read mode miss: the card flies from the bin to **its window on the solved wall** and lies beside it — a ring card beside a shut window, or a cross card beside a glowing open one — and both pulse; then the card returns to the box. Bubble (ring on shut): "The window is shut — this friend does not have it." · (cross on open): "The window is open — this friend does have it." Miss 2 in read mode: the card's window stays highlighted while the child drops again.
- A new move takes any glow away until the next miss.
- **Success** (every friend's plate filled / every card binned correctly): the rods slide once more along every row (a flourish), each friend header hops (scale 1.12, 80 ms stagger) with its thing on its plate, a three-note chime. Bubble: "Every friend has one thing — and every thing has one friend!" · read: "You read the whole grid!" · two things: "Every friend has one toy and one fruit!"

## 8. Settings
1. **Puzzle**: "2 friends" / "3 friends" / "3 friends, either-or" / "4 friends" / "4 friends, six clues" / "Read the grid" / "Two things each". Visible at rest: grid size, clue cards (marks), bins, or the L of three walls.
2. **Crossing out**: "The grid does it" (latch rods drawn and working) / "I do it" (no rods on the wall; the child shuts the row and column after each yes — G3-378/379 sweep). Visible at rest: the brass rods are on or off the wall.

## 9. Words (EN source)
- title: "The Clue Table"
- instruction: "Each friend has one thing, and each thing belongs to one friend. Put every picture clue on its window, then find who has what."
- task lines: "Put each clue on its window. Then find what every friend has." · "Is the clue true? Drop it on ✓ or ✗." · "Each friend has one toy and one fruit. Use the clues to find both."
- hints: "Pick up a clue card and put it on its window." · "Find the friend's row and the thing's column — the clue lives where they meet." · "Look for a row with only one window open." · "Two windows are still open here — it could be either. Find a row or column with only one left." · "This window is the only one left open in its row. Tap it!" · "This window is the only one left open in its column. Tap it!" · "Only a yes in its row or column can shut this window." · "The window is shut — this friend does not have it." · "The window is open — this friend does have it."
- celebrations: "Every friend has one thing — and every thing has one friend!" · "You read the whole grid!" · "Every friend has one toy and one fruit!"
- settings: "Puzzle" — "2 friends" / "3 friends" / "3 friends, either-or" / "4 friends" / "4 friends, six clues" / "Read the grid" / "Two things each" · "Crossing out" — "The grid does it" / "I do it"
- aria: card "{friend} has {thing}" / "{friend} does not have {thing}" / "{friend} has {thing1} or {thing2}" / link "the one with {toy} has {fruit}" (and negative); window "{friend}, {thing}: open | shut | not known yet"; plate "{friend}'s plate: {thing} | empty".

Locale traps:
- **The aria sentences are the only sentences with nouns**: author per locale with the vocab gender for articles (de "Die Katze hat den Ball" — accusative article; fr "Le chat a le ballon"; nl "De kat heeft de bal"; sv "Katten har bollen" — definite suffix forms; fi "Kissalla on pallo" — adessive "Kissalla" — the friend noun takes a case ending in fi, so fi aria uses a stored adessive form per friend authored by hand: written by hand from each friend's vocab nominative (e.g. Kissalla, Koiralla, Kanilla, Ankalla, Lampaalla; pig follows whatever noun the vocab stores, Sika → Sialla) and native-checked; and for "does not have": "Kissalla ei ole palloa" — partitive of the thing, authored per thing). These are fixed, small tables (6 friends × 5 toys × 3 fruits), authored and native-checked, never generated by a suffix rule.
- **"friend"** — natural child word per locale (de Freund/Freundin → use the neutral "Tierfreunde"? The reviewer picks; the visible strings say "friend" only in plural/generic: de "jedes Tier", fr "chaque ami", es "cada amigo", fi "jokainen ystävä").
- **"either-or"** is never written — it is a ring split by a bar. The hint names it in words only in the instruction-level help: EN "a ring with two pictures means: one of these two".
- ✓ and ✗ are understood as yes/no in all 11 locales (✓ is the "correct" mark in every one of these school systems; fi and sv also use ✓ — not the Swedish teacher's "rätt" tick variants).
- Fruit nouns: pear/banana/apple all exist in every locale; toys "kite" (de Drachen, fr cerf-volant, es cometa/papalote — es here is es-ES by the site's locale; the vocab file decides).

## 10. Sound off, access, phones
- Every state is visible: shut shutters with ✗, open windows glowing with the thing inside, rods moving, plates filling, dots counting open windows. Sound is decoration.
- Keyboard: arrow keys move a focus box over the wall; Tab enters the clue box; Enter on a card lifts it, arrows move it over the wall (crosshair shows), Enter drops; Enter on a window = tap. Space toggles in free play. Focus ring 3 px #146B5E.
- aria-live polite for the bubble and for each stamp ("cat, ball: shut").
- Taps ≥ 44 px (cells 84 at 3 × 3 / 66 at 4 × 4 on phones). Pictures ≥ 96 at 704, ≥ 64 at 360 (the stated exception: 4 × 4 headers 60 px at 360, 56 at 320).
- prefers-reduced-motion: rods jump, shutters swap state without swing, cards jump to their window.

## 11. Distinct from
- **#261 The Sudoku Garden** (same batch): placement under row/column/box constraints with no clues; here clues are statements to be posted and the deduction is elimination between two sets.
- **#225 The Sorting Cabinet**: completes a pattern in a 3 × 3; here the grid is a truth table.
- **#277 The Clue Curtain** (planned): a reveal by clues; here no reveal — the grid is the reasoning.
- **`number-sieve` tool**: clue cards darken numbers in a field; here the clues are about pairs of things and the one-each rule is a mechanism.
- Registry: no built or designed activity uses latch rods, shuttered windows or a carry thread.

## 12. Build plan
- **Core state**: `{n, friends[], things[], clues[{kind:'Y'|'N'|'O'|'L', f, t, t2?, yes?}], stamped:Set, cells[f][t]: 'open'|'shut'|'yes', plates[f], rods:true|false, mode:'solve'|'read'|'two', misses, nudges, glow}`.
- **Functions**: `targetCell(clue)` · `stamp(clue, droppedAt)` → `{ok, path}` · `applyRods(f,t)` · `isForced(f,t)` (last open in row or column, no yes there yet) · `openYes(f,t)` → `{ok}|{refused, openInRow, openInCol}` · `shutByHand(f,t)` (allowed iff a yes is in its row or column) · `nextForced()` (solver step for the glow) · `readDrop(card, bin)` · two-things: `threads()` → pending copies · `acceptThread(id)` · `isSolved()` · `nextTask` with header shuffles.
- **Gate's own ground truth** (`verify-clue-table-core.js`): the puzzle tables above are typed literally into the gate (not imported); for each it (1) enumerates all permutations (n! ≤ 24; two things 36 pairs) and asserts exactly one solution and that removing any clue breaks uniqueness; (2) runs its OWN implementation of the two board moves and asserts the puzzle is solved by them alone, with the first forced cell as listed; (3) drives the core through the same play and compares every cell state; (4) asserts `openYes` refuses every non-forced cell and accepts every forced one; (5) read boards: each card's truth computed from the board; two true + two false + a false cross; (6) header shuffles over 300 passes meet §6; (7) every picture exists and no refused picture appears.
- **Mutations** (one per rule): `openYes` accepts a non-forced window · rods sweep only the row · rods sweep only the column · either-or shuts one of its own two things · a "no" card opens instead of shutting · `targetCell` swaps row and column · by-hand mode lets any window shut · read mode treats a cross as "has" · a puzzle with a redundant clue · a puzzle with two solutions · header shuffle off (diagonal every time) · two-things thread copies an open window as shut · glow survives a new move.
- **Pictures**: re-verify farm-animals/duck vs farm-animals/duckling never on one board (not used), toys/boat vs toys/train at 64 px (both distinct).
- **Risks**: the either-or card's split ring must read as "one of these" — the reviewer tests it on a contact sheet with a teacher's eye; fallback: the two things on the card joined by a short teal bar with a small "/" glyph. Two things level is dense — it is the last level, desktop-first, and the tabs make it work on phones.
- **BLOCKED**: nothing.

## 13. The four questions (answered, honestly)
1. **Would a 5–8-year-old choose it again?** Yes — shutters that clap, windows that glow, brass rods that slam a whole row shut, and the moment a thing slides out of the last window onto a friend's plate.
2. **Would a teacher put it on the board?** Yes — it is every logic-grid worksheet from G1-349 to G3-379 with the rule "one each" turned into a machine that the child later has to replace by hand; every puzzle is solver-verified unique and solvable by elimination.
3. **Would a parent trust it?** Yes — library animals and toys, calm, no reading needed on the board, nothing timed or sold.
4. **The invention in one sentence:** a grid of shuttered windows where a "no" shuts one, a "yes" throws one open and latch rods shut the rest of its row and column — so the last open window in a row is the answer you can see.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Every table re-checked by the critic's own solver (`work-c18/check260.py`, `check260w.py`): T1–T7, H1–H9, E1–E9, K1–K18 each have exactly one solution, no redundant clue, and are solved by the board's own moves with the first forced window as listed; R1–R7 card truths all correct; W1–W7 unique with no redundant clue.
- Found: W2 and W3 cannot be finished with the carry thread as first described (only from friend × toy yeses). The thread is now defined for a yes in any of the three walls — with it all seven solve.
- Friend relabelling per showing (drawn from six farm animals) so 3 × 3 boards are not always cat/dog/rabbit; the miss-2 hint now has a column form (a forced window can be forced by its column).
- Phone header sizes restated against the puzzle-grid ruling; the fi aria table is derived from the vocab nominative, not a colloquial "Possu".
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
