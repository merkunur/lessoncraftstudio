# Row 140 — Squirrel's Fair Winter Piles → THE SNOW-LID STACK (2.OA.C.4)

## 0. Identity
- **id** `winter-piles.draw-partition.2-oa-c-4` (KEPT; slugs/titles/intros frozen en de fr es pt it nl; sv/da/no/fi get new slug, title and intro at build, grade 2) · CCSS 2.OA.C.4 · strand Operations & Algebraic Thinking · own files `snow-stack-core.js`, `snow-stack-activity.js`, `winter-piles-activity.html` (rewritten), `winter-piles-activities.json` (rounds kept, re-specified). 0 lines to `draw-partition-core.js`, `lcs-shell.*` or any shared core.
- **Frozen promise kept true:** "help the squirrel sort its acorns into FAIR winter piles. Draw a line to cut the rows into piles that are all the SAME size, read how many acorns are in each pile, and tap the number in — the equal-addends equation (like 5 + 5 + 5 = 15) appears and the piles sparkle. Unfair piles can't shine together." The cut line, the read-and-type, the equation and the "unfair can't shine together" all stay; the shine becomes a snow lid that only settles on a fair stack.
- **Worksheets covered:** G2-216 "Share It Fairly" (share a pile equally into bins; write how many each gets) → Level 3 · G2-217 "How Many Groups?" (rings make equal groups; write how many groups) → Level 2. Teaching point: share a pile equally; count how many equal groups (division readiness).
- **Old activity:** 9 rounds over a given acorn array: make-fair (cut rows into equal piles, any way), make-n (exactly 2 piles), fix (a preset unfair cut), match (cut to make a given equation); draw a line or tap a row gap; read each pile on a stepper; SVG-stub squirrel (hand-drawn) + emoji acorns. **Kept:** all nine round ids and arrays (2×3, 3×4, 4×4, 4×3, 4×2, fix-4×3, fix-4×2, match-3×4, match-4×3 → re-specified below so each has ONE right cut), drawing or tapping the cut, typing the pile size, the equation. **Changed:** the squirrel is the library `forest-creatures/squirrel`, the acorns are the library `miscellaneous/acorn`; the "sparkle" is replaced by a physical test — the piles are stacked and only a fair stack takes a flat lid of snow; two new levels cover the worksheets.

## 1. The pitch
"Cut the acorn rows into piles, then stack the piles on the squirrel's tree stump one on top of another — fair piles stack into a neat block and the snow settles on it in one flat lid; an unfair pile pokes out or leaves a hole, and the snow slides right off."

## 2. Why a child will want it again (the fun)
- **The cutting stick.** A thin birch twig (drawn line, 4 px, bark-brown) rests above the acorn tray. Drag a finger across a gap between two rows (or tap the gap) and the twig snaps down into that gap with a woody *tok*: the rows above and below now belong to different piles, each pile tinted a different soft colour. Tap the twig again and it pops out.
- **The stack.** Press the stump button and the piles slide, one after another, onto the tree stump on the right and lie down on top of each other like layers of a cake — each new layer settles 10 px higher and 6 px to the right so you can count the layers on the side (a pseudo-3D block). On the stump a pile becomes a **slab** in its pile colour carrying one drawn brown dot per acorn in the pile's own rows × columns (dots 12–16 px): apparatus geometry, never shrunken acorn pictures (picture ruling — a record below the data-mark floor is drawn).
- **The snow lid.** Snowflakes start to fall (drawn six-point flakes, 2 s). On a fair stack they pile up into one smooth white lid that fits the top exactly, glitters once, and the squirrel hops up onto it and sits. On an unfair stack the snow piles on the high corner, the lid tilts and slides off into a little heap on the ground with a soft *flump* — the overhanging acorns (coral) or the empty dents (dashed) stay visible where the layers disagree.
- **The winter hole.** A finished stack is carried into the tree trunk's hollow (a drawn arched hole); a counter of acorn icons over the hole grows round by round. Over a pass the hollow fills up — "enough for winter".
- **Free play ("Snow yard"):** make any array, cut it any way, stack it, watch the snow decide. A favourite trick: cut 6 rows into 2 + 4 and watch the lid slide, then fix it.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** partition a rectangular array into equal groups and write the total as a sum of equal addends (2.OA.C.4: 6 + 6 = 12); find how many equal groups of a given size fit (G2-217, quotitive division readiness); share a heap equally among a given number of holes and say how many each gets (G2-216, partitive).
- **Misconception 1 — "any cut makes piles; fairness is a guess"** (cuts 4 rows into 1 + 3). **Push back:** the 1-row layer and the 3-row layer stack into a block whose top is not flat — the snow lid tilts and slides off; the extra rows of the big pile stick out coral above the small one. Equal size is checked by stacking, the oldest comparison there is.
- **Misconception 2 — confusing the number of piles with the size of a pile** (types 3 for "3 piles of 4"). **Push back:** the number to type is printed only after a fair stack, and the stack shows both quantities in different places: the *layers on the side* (how many piles, ticked) and the *top layer* (how many in each, which the child reads). A wrong number makes the top layer's acorns light and count one by one.
- **Misconception 3 — sharing by giving each hole a handful** (G2-216: 12 among 3 → 5, 4, 3). **Push back:** each hole's acorns become one layer; uneven handfuls make uneven layers and the lid slides. Dealing one acorn to each hole in turn ("one for you, one for you…") makes equal layers by itself — the design does not tell the child to deal; the snow shows why it works.
- **Misconception 4 — groups of k means k groups** (G2-217: "holes of 4" → makes 4 piles). **Push back:** in Level 2 the stump has a drawn mould on top showing the size of one hole (k acorn dents); a pile that does not fill exactly k dents cannot even go on the stump — it overhangs the mould or leaves dents empty before any snow falls.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The acorn tray** (left, up to 300 × 340): a drawn wooden tray, rows of library acorns (`miscellaneous/acorn`) in cells. Acorns are **data marks in a grid** (picture-ruling: grid cells follow the data-mark floor ≥ 40 px at 704 / ≥ 30 px at 360): cell 54 px, acorn 46 px for every tray in this design (no tray has more than 6 rows or 6 columns — critic cap); one full-size acorn (96 px) sits on the tray's label tab as the picture the marks stand for. Row gaps 10 px, each with an invisible 44 px tall cut target.
- **The twig(s):** one per cut, drawn birch line 4 px with two tiny leaf flicks at the ends (geometry), spanning the tray width.
- **The stump** (right, 260 × 90 top face, 140 tall trunk with a hollow): drawn; on Level 2 a drawn **mould** on the stump top (k shallow round dents in the pile's shape).
- **The squirrel:** library `forest-creatures/squirrel` at 96 × 96, sitting beside the stump (hops onto the lid on success).
- **The winter hole counter:** small acorn icons (drawn tokens, 14 px — a record, never a shrunken picture) above the hollow, one per finished round.
- **The equation strip** under the stump: "▢ + ▢ = 12" fills in as piles are read; Level 2 "12 acorns → ▢ holes of 6"; Level 3 "12 shared by 3 → ▢ each".
- **Keypad** (keys 48 px) + Check under the equation.
- **Task line (EN, 22 px):** Level 1 "Cut the rows into {n} fair piles." · Level 2 "Each hole holds {k}. Cut piles that fit." · Level 3 "Share the acorns fairly into {n} holes." (The task line is the round's prompt and is the only text above the apparatus.)

**At 360 px:** tray 328 wide (cells 40, acorns 34 px ≥ 30 floor, row gap 10 → a 6-row tray is 290 px tall; label acorn 64 px), stump 300 × 120 below it (squirrel 64 px), equation 18 px, **number strip of two rows of five keys (1–9 + erase, keys 60 × 44)** — every typed answer in every level is 2–9 (measured), so a 4 × 3 keypad is not needed — Check ≈ 705 px on 360 × 740 (header 56 + task 32 + tray 290 + stump 120 + equation 24 + strip 94 + paddings 40 + Check 48); at 320 × 640 cells 34 (acorns 30 = floor), row gap 8 (6-row tray 244 px), stump 100 px, Check ≈ 628.
- **No words on the apparatus:** only acorns, twigs, numerals and the signs.

## 5. The hand
- **Cut (Levels 1–2):** drag across a row gap (a horizontal swipe ≥ 40 % of the tray width starting within 22 px of the gap) or tap the gap → the twig snaps in (80 ms, *tok*); the piles re-tint (120 ms). Tap a twig → it pops out. Twigs only go in row gaps (no diagonal or column cuts — the frozen intro says "cut the rows"). **Turn button** (a drawn ↻ on the tray corner, 44 px): rotates the tray 90° so columns become rows (3 rows of 4 ↔ 4 rows of 3) — **Free play only** (critic: in no Level-2 round does turning create a solution, so in a round it would be a dead control); turning clears the twigs.
- **Deal (Level 3):** the heap is a loose pile at the left made of **drawn acorn tokens** (brown discs 22 px with a darker cap band — apparatus counters, like the rekenrek's beads; 20 library pictures cannot lie in a loose heap at ≥ 64 px) with ONE full-size library acorn (96/64 px) on the heap's tag as the picture they stand for. The holes are N drawn round pockets in the stump front. Tap a pocket → the next token hops into it (90 ms arc). Tap a token in a pocket → it hops back. Pockets show their tokens in a row so a pocket is a "layer" already. **All of the heap must be shared:** a stack with tokens still in the heap is not finished (§7).
- **Stack:** tap the stump button (or the stump itself) → piles slide over and layer (200 ms each, *thup*); snow falls (1.6 s, can be tapped to skip). Any change to the tray or pockets slides the stack back off (it is a test, not a commitment).
- **Read:** after a fair stack, the number boxes appear; type with the keypad.
- **Keyboard:** ↑/↓ move a focus ring between row gaps, Space toggles a twig, S stacks, digits type, Enter checks.
- **Sound:** *tok* (twig), *thup* (layer), a soft hiss of snow, *flump* (lid slides), a bright two-note chime and a squirrel chitter (library sound not needed — a drawn sound tone) on success. TTS bonus: "6 plus 6 is 12".

## 6. The rounds
≥ 7 rounds per level, order-only reshuffle per pass; one right cut / one right share per round; never 0.

**Level 1 — Fair piles (the nine kept rounds, each now with one right answer)**
| id (kept) | tray | target | right cut (after row) | pile size typed | equation |
|---|---|---|---|---|---|
| fair-2x3 | 2 rows × 3 | fair piles (≥ 2) | 1 | 3 | 3 + 3 = 6 |
| fair-3x4 | 3 rows × 4 | fair piles (≥ 2) | 1, 2 | 4 | 4 + 4 + 4 = 12 |
| fair-4x4 | 4 × 4 | 2 fair piles | 2 | 8 | 8 + 8 = 16 |
| make2-4x3 → make3-6x2 | 6 × 2 | 3 fair piles | 2, 4 | 4 | 4 + 4 + 4 = 12 |
| make2-4x2 → make2-6x3 | 6 × 3 | 2 fair piles | 3 | 9 | 9 + 9 = 18 |
| fix-4x3 | 4 × 3, preset twig after row 1 | 2 fair piles | 2 | 6 | 6 + 6 = 12 |
| fix-4x2 → fix-6x2 | 6 × 2, preset twigs after rows 1 and 3 | 3 fair piles | 2, 4 | 4 | 4 + 4 + 4 = 12 |
| match-3x4 → match-6x3 | 6 × 3 | make 6 + 6 + 6 | 2, 4 | 6 | 6 + 6 + 6 = 18 |
| match-4x3 → match-4x2 | 4 × 2 | make 2 + 2 + 2 + 2 | 1, 2, 3 | 2 | 2 + 2 + 2 + 2 = 8 |
Ids marked "→" keep their slot and band; their array changed so a fixed strategy cannot win (see bots). The two open "fair piles" rounds have prime row counts, so the only fair cut into ≥ 2 piles is one row per pile — one right answer.

**Level 2 — How many holes? (G2-217; quotitive)** Each hole holds k; cut piles of k; type how many piles.
| # | tray | k | rows per pile | right cut | answer (piles) |
|---|---|---|---|---|---|
| 1 | 4 × 3 | 6 | 2 | 2 | 2 |
| 2 | 6 × 2 | 4 | 2 | 2, 4 | 3 |
| 3 | 4 × 4 | 4 | 1 | 1, 2, 3 | 4 |
| 4 | 6 × 3 | 9 | 3 | 3 | 2 |
| 5 | 5 × 2 | 2 | 1 | 1, 2, 3, 4 | 5 |
| 6 | 6 × 4 | 8 | 2 | 2, 4 | 3 |
| 7 | 6 × 5 | 10 | 2 | 2, 4 | 3 |
| 8 | 4 × 5 | 5 | 1 | 1, 2, 3 | 4 |
The mould on the stump shows k dents in the pile's shape (e.g. 2 rows × 3). Equation strip: "12 acorns, holes of 6 → ▢ holes" then "6 + 6 = 12".

**Level 3 — Share the heap (G2-216; partitive)** Deal the heap into n pockets; type how many each.
| # | heap | pockets | each |
|---|---|---|---|
| 1 | 12 | 3 | 4 |
| 2 | 10 | 2 | 5 |
| 3 | 15 | 5 | 3 |
| 4 | 12 | 4 | 3 |
| 5 | 16 | 4 | 4 |
| 6 | 18 | 3 | 6 |
| 7 | 14 | 2 | 7 |
| 8 | 20 | 5 | 4 |
The heap is a scattered pile (positions seeded per round; never a tidy array), so the share cannot be read off a row.

- **Answer position / fixed-strategy bots (re-measured by the critic, `work-c35/snow-c35.js`; all 2^(rows−1) cut sets enumerated — exactly ONE fair cut set meets the target in every one of the 17 tray rounds; fix presets are never already fair):** a bot that always cuts every gap passes Level 1 in 3/9 rounds (fair-2x3, fair-3x4, match-4x2) and Level 2 in 3/8 (#3, #5, #8); a bot that always cuts once in the middle passes Level 1 in 4/9 (fair-2x3, fair-4x4, fix-4x3, make2-6x3) and Level 2 in 2/8 (#1, #4); a "two cuts into thirds" bot passes Level 1 in 4/9 and Level 2 in 3/8 (#2, #6, #7). (Critic: the old #8 tray of 8 rows could not hold the grid floor above the 360 fold; it is now 4 × 5, and #7 became 6 × 5 holes of 10 so the every-gap bot did not rise to 4/8.) Level-2 answers 2, 3, 4, 2, 5, 3, 3, 4; Level-3 shares 4, 5, 3, 3, 4, 6, 7, 4. No fixed strategy passes more than half a level, and every round still needs a typed number. In Level 3 the pocket a dealt acorn goes to is the child's choice — there is no position.
- The fix rounds' preset twigs are never already fair.

## 7. Check, the misses, the success
- **Check with nothing done** (no twig / empty pockets) → no miss; the twig wiggles above the tray (or the heap shivers). Hint: "Cut the rows with the twig first." / "Put the acorns in the holes first."
- **Check stacks automatically if the child has not stacked.** An unfair stack is **miss 1**.
- **Miss 1 — what the apparatus SHOWS:**
  - unfair piles → the lid slides off; the layers stay stacked for 3 s with the overhanging acorns tinted coral and empty dents dashed; the layer sizes appear at the side of each layer ("4", "8"). Hint: "These piles are not the same size. Move the twig so every pile matches."
  - wrong number of piles (fair, but not the target n) → the lid settles but the stump's hole-board shows n holes and only m layers fit (or one hole stays empty). Hint: "Fair! But the squirrel needs {n} piles."
  - Level 3 heap not empty (equal pockets, tokens still in the heap) → the lid settles, then the heap's tokens glow and roll forward one by one with a count ("3 more"). Hint: "Fair so far! Share ALL the acorns."
  - Level 2 pile does not fit the mould → the pile hovers over the mould; extra acorns sit over the edge or dents stay empty. Hint: "Each hole holds {k}. Make every pile fill the mould."
  - wrong typed number → the top layer's acorns light up one by one with a count (Level 1/3) or the layers tick on the side (Level 2). Hint: "Count the acorns in one pile." / "Count the piles in the stack."
- **Miss 2 — the stronger showing:** the right cut positions appear as faint dotted ghost twigs in the gaps (Level 1–2); in Level 3 the heap is dealt **once around** for the child — one acorn to each pocket in turn, slowly, then stops ("one for each hole…"). Hint: "Try the dotted places." / "Give one acorn to each hole, then go round again."
- A new move takes the help away until the next Check.
- **Success:** the lid settles flat and glitters, the squirrel hops on top, the layers glow together (the frozen "sparkle"), the equation completes, the stack slides into the hollow and one acorn token joins the counter. Bubble: Level 1 "Fair piles! 4 + 4 + 4 = 12." · Level 2 "12 acorns make 2 holes of 6: 6 + 6 = 12." · Level 3 "Each hole gets 4: 4 + 4 + 4 = 12."

## 8. Settings (each visibly changes the board at rest)
1. **Level:** Fair piles / How many holes? / Share the heap / Snow yard (free play) — at rest: a tray with a twig resting above it (L1), a tray plus a mould on the stump (L2), a loose heap plus pockets in the stump (L3), a tray with + / − row and column buttons (free play).
2. **Equation strip:** shown / hidden — the "▢ + ▢ = 12" strip under the stump is visible or removed (the child reads the stack alone).

## 9. Words (EN source; native authors write the other 10)
- title (frozen per locale) · instruction: "Cut the rows into fair piles and stack them. Fair piles take a flat lid of snow."
- prompts: L1 "Cut the rows into {n} fair piles." · L1 open "Cut the rows into fair piles." · L1 match "Cut the rows to make {eq}." · L1 fix "These piles are not fair. Move the twig." · L2 "Each hole holds {k}. Cut piles that fit." · L3 "Share the acorns fairly into {n} holes." · boxes: L1 "How many in each pile?" · L2 "How many holes?" · L3 "How many in each hole?"
- hints: emptyCut "Cut the rows with the twig first." · emptyDeal "Put the acorns in the holes first." · unfair "These piles are not the same size. Move the twig so every pile matches." · wrongCount "Fair! But the squirrel needs {n} piles." · mould "Each hole holds {k}. Make every pile fill the mould." · readPile "Count the acorns in one pile." · readStack "Count the piles in the stack." · miss2Cut "Try the dotted places." · miss2Deal "Give one acorn to each hole, then go round again." · heapLeft "Fair so far! Share ALL the acorns."
- success: L1 "Fair piles! {eq}." · L2 "{total} acorns make {piles} holes of {k}: {eq}." · L3 "Each hole gets {each}: {eq}."
- settings: "Level" — "Fair piles" / "How many holes?" / "Share the heap" / "Snow yard" · "Equation" — "Shown" / "Hidden"
- aria: gap "Gap after row {i}, {cut|no cut}" · pile "Pile {i}: {n} acorns" · stack "Stack of {m} piles, {fair|not fair}" · pocket "Hole {i}: {n} acorns".
- **Locale traps.** (1) The squirrel's name: the old activity named it Flo in de/fr/es/pt/it/nl titles ("Flos faire Winterhäufchen") — titles are frozen, so the in-game words never contradict them: the squirrel is never named in the play strings at all. (2) "acorn" is the vocab label (de Eichel, fi tammenterho …) from `image-vocabulary.js`; plural agreement in prompts is avoided by using numerals only ("12" never "twelve acorns" in a running sentence where fi partitive / pt gender would bite: the prompts say "{n} holes", and each locale authors its own plural form of hole/pile: de Häufchen, fr tas, es montoncitos, pt montinhos, it mucchietti, nl hoopjes — kept from the old titles). (3) Fair: de "gleich groß" (not "fair" alone in play strings), fr "égaux", es "iguales", it "uguali", pt "iguais", nl "even groot", sv "lika stora", da "lige store", no "like store", fi "yhtä suuret". (4) Southern-hemisphere locales are not shipped, but "winter" appears only in the frozen title; the play strings say "snow", never a month. (5) No decimals.

## 10. Sound off, access, phones
- Legible with the sound off: the lid sits or slides; layer sizes print at the side on a miss; TTS bonus only.
- Keyboard path §5; aria-live: "Not fair: the top pile has 8, the bottom pile has 4." / "Fair stack of 3 piles."
- Taps: row-gap targets 44 px tall across the tray; twigs 44 px hit; pockets 64 px; keys 44–48 px; Check 48 px.
- Pictures: squirrel 96/64 px; label acorn 96/64 px; acorns in cells are grid data marks 46 px at 704 / 34 px at 360 (floor 40/30 respected); records are drawn tokens.
- Check above the fold at 360 × 740 (≈ 680) and 320 × 640 (≈ 610).

## 11. Distinct from
- **Row 139 Accordion Sentence** (sibling): equality of groups tested by folding a printed sum; here by stacking real piles from an array, and it adds division (how many groups / how many each).
- **New 299 Leftover Dealer** (a sharing wheel: one crank turn deals exactly one counter into EVERY box, so the machine makes equal shares and the remainder is the subject). Here the child deals freely, one acorn at a time to any pocket, and the stack only *tests* the result — the deal-one-each strategy is discovered, not built in — and every heap shares exactly (no remainder).
- **Row 91 Fair Ribbon** (equalising two jars to a height), **Row 107 Fair Mobile** (fraction shares hang level), **New 249 Fair Tug** (doubles) — none stacks layers. **Row 170 Stamp Sheet** partitions a rectangle into unit squares.
- **Premium tool `lids`** hides equal shares under lids with the remainder in view — a sharing tool without arrays, cuts or stacking; `baking-tray` splits an array into two known facts. No interaction copied.

## 12. Build plan
- **Core `SnowStackCore`:** state `{level, rows, cols, cuts:Set<int>, pockets:[n…], heap:n, typed}`; `piles(state)` → array of pile sizes from cuts (rows between cuts × cols); `isFair(piles)`; `fitsTarget(state, round)` (n piles / k per pile / mould); `deal(i)`, `undeal(i)`; `stack(state)` → `{layers:[…], flat:bool, overhang:[…], gaps:[…]}`; `checkTyped(v)`; `round(level,i)`; `shuffledOrder`.
- **Gate's truth (`verify-snow-stack-core.js`):** independent table of the 25 rounds with the unique right cut set / share; asserts for every round: exactly one cut set (enumerated over all 2^(rows−1) subsets) is fair AND meets the target; `stack.flat` true only for fair piles; Level 3 every pocket distribution other than all-equal gives `flat=false`, and an all-equal distribution with tokens left in the heap is not success; no tray exceeds 6 rows or 6 columns; every typed answer is 2–9; typed answers = pile size / pile count / share; the three fixed-strategy bots' pass counts equal the numbers in §6 (so content edits that create a strategy are caught); no round has a 0 or a single pile; reshuffle never repeats; the success numbers in all 11 locales match the round.
- **Mutations (each killed):** stack flat with unequal layers · cut accepted in a column gap · fix round preset already fair · Level 2 accepts a pile larger than k · Level 3 accepts 5, 4, 3 for 12 among 3 · typed piles count accepted for pile size · twig change does not clear the stack · open round accepts a single pile · mould missing in Level 2 · reshuffle repeats · squirrel drawn as SVG instead of the library picture · Level 3 success with tokens left in the heap · stump layers drawn with acorn pictures below the floor · turn button live in a Level-2 round.
- **Pictures to verify (done on the contact sheets):** `forest-creatures/squirrel` ✓ (orange, sitting, faces left), `miscellaneous/acorn` ✓ (brown cap, round — reads as an acorn at 34 px). **Risks:** acorns at the grid floor must be identical instances (same picture, no rotation). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — snapping twigs, layers thumping onto a stump, snow that either sits like icing or slides off with a *flump*, and a squirrel that hops on top.
2. **Would a teacher put it on the board?** Yes — stacking is how you compare piles in real life; it shows sum of equal addends, how many groups and fair sharing in one apparatus, and unfair cuts fail by physics.
3. **Would a parent trust it?** Calm winter scene, library pictures, no score, no timer.
4. **The invention:** piles are stacked into layers on a stump, and the snow can only lay a flat lid on a fair stack.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 3→5
What changed:
- **One-right-cut re-proved with my own enumerator** (`work-c35/snow-c35.js`): every one of the 17 tray rounds has exactly one fair cut set meeting its target; fix presets are never already fair; the three fixed-strategy bots measured again (≤ 4/9, ≤ 3/8).
- **Level 3 had a hole:** 12 acorns dealt 3, 3, 3 with 3 left in the heap stacked flat and would have passed. A fair stack with acorns still in the heap is now not finished (new showing + hint `heapLeft`).
- **Reality:** a loose heap of up to 20 acorn PICTURES breaks the picture floor (only grid cells may go to 40/30 px) — the heap is now drawn acorn tokens with one full-size library acorn as its label; stacked layers are slabs of drawn dots, never shrunken pictures.
- **The 8-row tray (L2 #8) could not fit** the 30 px grid floor with Check above the 360 fold: replaced by 4 × 5 (holes of 5); #7 became 6 × 5 (holes of 10) so no bot gained; max tray 6 rows; every typed answer is 2–9, so the phone keypad is two rows of five (Check ≈ 705 at 360 × 740, ≈ 628 at 320 × 640, summed in §4).
- The turn button was a dead control in every Level-2 round (turning never creates a solution) — Free play only.
- §11 now separates it from New 299 Leftover Dealer (machine-made equal shares + remainder).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
