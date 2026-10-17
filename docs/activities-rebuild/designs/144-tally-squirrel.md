# Row 144 — Tally's Acorn Baskets → THE ACORN SIEVE (2.NBT.B.6)

## 0. Identity
- **id** `tally-squirrel.add-four.2-nbt-b-6` (frozen) · grade 2 · CCSS 2.NBT.B.6 · strand Number & Operations in Base Ten · own files `acorn-sieve-core.js`, `acorn-sieve-activity.js`, `acorn-sieve-activity.html`; the manifest row stays in `tally-squirrel-activities.json` (tool → `acorn-sieve-activity`). Metadata frozen en..sv; da/no/fi slug, title and intro new at build (grade 2). sv keeps the squirrel's sv name *Kurre*.
- **Worksheets covered:** G1-112 Add Three Groups (the "three small baskets" setting — three groups with a total up to 10, exactly as the sheet prints them; the "two or three baskets" setting is the two-digit bridge to 2.NBT.B.6), G2-313 Number Walls with Two-Digit Answers (the "number wall" setting), G2-393 Math Maze (its running total lives in row 143's route setting; here the wall is the puzzle format).
- **Old activity:** a hand-drawn squirrel and drawn baskets with a number on each, `23 + 14 = ?` read aloud, the shell keypad. **Kept:** all nine rounds (`23+14`, `31+25`, `12+34+21`, `42+15+23`, `21+14+32+11`, `33+26+18`, `15+22+34+11`, `44+28`, `13+21+32+24`), their bands, the spoken sum line, the hint "tens with tens, ones with ones". **Dropped:** the drawn squirrel (now library `forest-creatures/squirrel`) and the drawn woven baskets (now plain apparatus tubs — both library baskets are full of something else, see PICTURE-RULINGS).

## 1. The pitch
"Tip every basket onto Tally's sieve and shake it: the loose acorns fall through, the cups of ten stay on top — so all the tens of all the baskets land together, and all the ones land together, by themselves."

## 2. Why a child will want it again
- **Tipping is a toy.** Each tub swings over on its hinge (380 ms) with a hollow clatter and hangs upside down, finished — you can see at a glance which baskets you have done.
- **Shaking is the best part.** Grab the sieve's side grip and wiggle it: acorns rattle, hop, and drop through the holes in a little shower (40 ms apart, a pitter-patter), rolling into the tray's grooves; the long cups of ten bounce but never fit through. Children shake it again just to hear it, even when it is already sorted.
- **The cloth is a magic trick.** With the cloth on, the acorns land unseen; the child works out the cups and the loose ones from the numbers, then the Check whips the cloth away and the sieve shakes itself — the reveal either matches or shows exactly which layer you miscounted.
- **Tally gets fed.** On success the cups and the loose rows march off to Tally (library squirrel, 96 px), who gives a happy two-step hop; her store at the side of the stage grows by one notch per solved round.

## 3. The skill and the misconception
- **Skill (2.NBT.B.6):** add up to four two-digit numbers using place value — the classroom partial-sums strategy: add all the tens, add all the ones, then put the two together. G1-112: add three groups. G2-313: build a number wall where each brick is the sum of the two below.
- **Misconception 1 — adding every digit as ones** (23 + 14 → 2+3+1+4 = 10): **pushback:** the sieve physically separates tens from ones — cups (tens) cannot fall through, single acorns cannot stay; a "10" typed in the loose window meets 7 acorns in the grooves.
- **Misconception 2 — a basket counted twice or forgotten** with three or four addends: **pushback:** a tipped tub hangs upside down, empty; it cannot be tipped again, and an untipped tub is plainly still full; Check with any tub upright is not allowed.
- **Misconception 3 — a ones total of ten or more left as a "two-digit ones"** (7 tens and 12 ones written as 712): **pushback:** the tray's grooves each hold exactly ten — 12 loose acorns fill one groove and spill two into the next, so the "ten inside the ones" is a visibly full groove; on success (and at miss 2) the full groove rolls up into a cup and joins the cups on the sieve.
- **Misconception 4 — misreading a cup count as ones** (7 cups → "7"): **pushback:** the cups window is printed `[ ]0` — a cup is a ten, so its window always ends in 0.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout: apparatus 440 px left, readout column 240 px right):**
- **Task line** (≤ 24 px): see §9.
- **The tubs** (top of the apparatus, a row): two to four drawn tubs (trapezoids 96 × 72, 2.5 px ink, plain wood-brown fill, no weave pattern, a hinge pin on each side), each hanging from a short rail. A numeral tag 52 × 40 hangs from every tub's rim on its own string, 30 px Baloo 2 (the addend); the tag stays upright when the tub tips. Spacing even across 440 px.
- **The sieve** (440 × 132): a frame with a mesh of round holes (Ø 22 px, pitch 30 px, 4 rows), a side grip (a 44 × 60 rounded handle at its left end, with three grip ridges). Cups of ten rest on top: each cup is a vertical capsule 26 × 128 with ten acorn dots (Ø 10 px) inside — drawn tokens, never pictures. Up to 9 cups side by side (30 px pitch, 270 px).
- **The cloth** (setting on): a drawn fabric panel covering the whole sieve, cream with a stitched border and two corner tabs; it bulges slightly as acorns land under it.
- **The tray** (440 × 120, under the sieve): four grooves, each a channel of ten round seats (Ø 20 px, pitch 23 px → 230 px) arranged left-aligned; a groove fills before the next begins. Up to 36 loose acorns (four addends × 9) fit (four grooves).
- **Readout column** (right, 240 px): Tally (`forest-creatures/squirrel`, 96 × 96, she faces left toward the apparatus — as drawn) at the top; three windows stacked, each 120 × 56 with a 26 px icon to its left: **cups** (cup icon) `[ ]0` — one digit box + a printed 0 in the same font; **loose** (dot icon) `[  ]` — two digit boxes; **all** (both icons joined by a plus) `[  ]` — two digit boxes. Under them an own keypad (0–9, ⌫; keys 52 × 48) that types into the selected window. Tally's store: a drawn tall jar outline beside her with notches, filling one notch per solved round (drawn tokens).
- **Feedback bubble** under the tray, 18 px.
- **No words on the apparatus:** numerals on tags and windows only.

**At 360 px (stacked):** task line → tubs row 328 wide (tubs 68 × 52, tags 40 × 32, 22 px numerals) → sieve 328 × 104 (holes Ø 16, pitch 22; cups 20 × 100, dots 8 px; 9 cups = 9 × 24 = 216 px) → tray 328 × 96 (seats Ø 15 px, pitch 19 px → 190 px per groove, four grooves in two columns of two) → windows in one row (three windows 100 × 48, icons 20 px) → keypad (keys 44 × 44, 2 rows of 6). Tally 64 × 64 sits to the right of the tubs row (tubs shrink to 60 px wide with four tubs). Height ≈ 44 + 80 + 104 + 96 + 56 + 100 + bubble 28 ≈ 510 + header/Check → above the 740 fold; at 320 × 640 the tray grooves go 2 × 2 at seat pitch 16 and the keypad keys 44 × 40 → fits.

## 5. The hand
- **Tip:** tap a tub (or drag it down) → it swings over (380 ms, ease-out), its contents tumble onto the sieve (cups slide down first, acorns bounce 120 ms later) — under the cloth if the cloth is on (the cloth bulges, a muffled clatter). The tub hangs upside down, 60 % opacity; it cannot be tapped again (a gentle wobble if tried). Tipping order is free.
- **Shake:** drag the side grip left and right (any drag ≥ 30 px back and forth) or tap the grip (= one automatic shake, 600 ms). Every loose acorn on the sieve drops through a hole and rolls into the next free seat of the tray (40 ms stagger, a soft patter, pitch rising one step per groove). Cups bounce 4 px and stay. Shaking an already-sorted sieve just rattles — free play.
- **Groove to cup (free action, also the success show):** drag a full groove upward → its ten acorns roll together into a cup (300 ms) that lifts onto the sieve and stays: it no longer fits through. A cup dragged down onto the tray breaks back into a full groove (the toy works both ways).
- **Type:** tap a window (selected window gets a teal ring) and type with the keypad; ⌫ clears. The cups window takes one digit.
- **Cloth:** cannot be lifted by hand during the task (it is the Check's reveal); between rounds it can be flicked off and on for play.
- **Number wall setting:** the tubs are replaced by a wall of bricks (§6) — at 704 bricks 120 × 52 in a 3 / 2 / 1 pyramid above the sieve, 30 px numerals, empty bricks dashed. Tap an empty brick → its two supporting bricks each pour their own number of acorns from Tally's store onto the sieve (cups and loose, built from the brick's numeral; the bricks stay — a brick is a number, not a container), shake, type the new brick. In wall mode the cups and loose windows stay visible as working space for the brick being built (optional), and the brick itself is the answer box (it replaces the all-window). Bricks fill bottom-up; the top brick uses the two middle bricks; one Check per brick, the wall's round ends when the top is right.
- **Keyboard:** Tab → tubs (Enter tips) → grip (Enter shakes) → windows → keypad digits → Check.

## 6. The rounds
One round = one set of baskets (or one wall). Every basket holds 11–44 acorns; totals 34–90; no 0 anywhere.

**Up to four baskets (default)** — the old nine, unchanged:
| # | baskets | tens (cups) | ones (loose) | total | band |
|---|---|---|---|---|---|
| 1 | 23 + 14 | 3 → 30 | 7 | 37 | 1 |
| 2 | 31 + 25 | 5 → 50 | 6 | 56 | 1 |
| 3 | 12 + 34 + 21 | 6 → 60 | 7 | 67 | 1 |
| 4 | 42 + 15 + 23 | 7 → 70 | 10 (one full groove) | 80 | 2 |
| 5 | 21 + 14 + 32 + 11 | 7 → 70 | 8 | 78 | 2 |
| 6 | 33 + 26 + 18 | 6 → 60 | 17 | 77 | 2 |
| 7 | 15 + 22 + 34 + 11 | 7 → 70 | 12 | 82 | 3 |
| 8 | 44 + 28 | 6 → 60 | 12 | 72 | 3 |
| 9 | 13 + 21 + 32 + 24 | 8 → 80 | 10 (one full groove) | 90 | 3 |

**Two or three baskets** (G1-112's "three groups", no full groove):
| # | baskets | cups | loose | total |
|---|---|---|---|---|
| 1 | 21 + 13 | 30 | 4 | 34 |
| 2 | 32 + 15 | 40 | 7 | 47 |
| 3 | 14 + 22 + 31 | 60 | 7 | 67 |
| 4 | 11 + 23 + 42 | 70 | 6 | 76 |
| 5 | 25 + 13 + 21 | 50 | 9 | 59 |
| 6 | 34 + 12 | 40 | 6 | 46 |
| 7 | 16 + 22 + 30 | 60 | 8 | 68 |
| 8 | 41 + 12 + 25 | 70 | 8 | 78 |

**Three small baskets** (G1-112 — "Count all three groups. Write the total."; maxTotal 10; every basket 1–5 loose acorns, no cups; the cups window shows a printed `0` and is skipped — the loose and all windows carry the round; the make-ten round fills exactly one groove):
| # | baskets | loose = total |
|---|---|---|
| 1 | 2 + 1 + 1 | 4 |
| 2 | 1 + 3 + 1 | 5 |
| 3 | 2 + 2 + 2 | 6 |
| 4 | 3 + 1 + 3 | 7 |
| 5 | 4 + 3 + 1 | 8 |
| 6 | 2 + 5 + 2 | 9 |
| 7 | 3 + 4 + 3 | 10 (one full groove) |
Seven totals, all different; the three-tub row is used in every round. In this face Check asks only for the total (the cups window is greyed with its 0 showing — nothing to count there, and saying so is the lesson for later).

**Number wall** (G2-313; three bottom bricks → two middle → top; every answer two digits):
| # | bottom | middle | top | full groove at |
|---|---|---|---|---|
| 1 | 12 · 15 · 21 | 27 · 36 | 63 | top |
| 2 | 14 · 23 · 18 | 37 · 41 | 78 | right middle |
| 3 | 25 · 11 · 32 | 36 · 43 | 79 | none (warm-up) |
| 4 | 16 · 19 · 26 | 35 · 45 | 80 | both middles, top |
| 5 | 31 · 12 · 27 | 43 · 39 | 82 | top |
| 6 | 13 · 28 · 15 | 41 · 43 | 84 | both middles |
| 7 | 22 · 17 · 19 | 39 · 36 | 75 | right middle, top |
| 8 | 18 · 26 · 11 | 44 · 37 | 81 | left middle, top |
Totals in every table are all different within the table.

- **Answer position:** typed — nothing to guess by place. Tip order is free. **Measured shortcut bots** (over the nine default rounds): "add every digit as ones" 0/9; "tens only" 0/9; "add only the first two baskets" 3/9 — exactly the three two-basket rounds, where that *is* the whole sum; "write cups-then-loose side by side" (`7` and `12` → 712) wrong on all five rounds whose ones reach ten, and right only where the ones stay under ten, where it is the honest answer. The gate asserts the full-groove rounds (4, 6, 7, 8, 9) are at least half of every default pass.
- **Order:** order-only reshuffle per pass inside bands, never the same order twice.

## 7. Check, the misses, the success
- **Check with a tub still upright** → that tub wobbles; bubble "Tip every basket onto the sieve." (no miss).
- **Check with an empty window** → the window pulses; "Fill all three windows." (no miss).
- **On Check:** the cloth (if on) whips off to the right (260 ms); if the sieve is unshaken it shakes itself; then each window is compared with what lies there: cups window × 10 = cups on the sieve; loose window = acorns in the tray; all window = their sum.
- **Miss 1** → the window that disagrees wobbles and its own layer counts itself: cups get rising labels `10, 20, 30 …` one by one (180 ms each); a loose layer numbers its grooves `10, 20` and the last groove's acorns `1, 2, 3 …`. If only the all-window is wrong, the cups and grooves both label and the all-window's ring blinks. EN **"Count the cups in tens and the loose acorns in ones."**
- **Miss 2** → the baskets' tags split in the air: each tens digit floats above the sieve, each ones digit above the tray, and two little sums write themselves beside the layers (`20 + 10 + 30 + 10 = 70`, `3 + 4 + 2 + 1 = 10`); any full groove rolls up into a cup and the cups window's correct value ghosts in pencil. EN **"Tens with tens, ones with ones — then put them together."**
- A new keystroke or a new shake removes the labels until the next Check.
- **Success** → full grooves roll up into cups, the cups line up beside the leftover acorns, everything marches off to Tally's store (one notch fills), Tally hops. EN **"{list} = {total}: {t} tens and {o} ones make {total}!"** (e.g. "23 + 14 + 32 + 11 = 80: 7 tens and 10 ones make 80!") · wall: **"The top brick is {top} — every brick is the two under it."**

## 8. Settings
1. **Baskets:** three small / two or three / up to four (default) / number wall — the row of tubs becomes three small tubs of loose acorns, two or three tubs, up to four tubs (from the round) or a wall of six bricks; visible at rest.
2. **Cloth:** on (default — work it out from the numbers, then the reveal) / off (tip, shake and count) — the cloth covers or bares the sieve at rest.

## 9. Words (EN source)
- in-tool title: **"Tally's Acorn Baskets"** (frozen page title starts the same)
- instruction: **"Tip every basket onto the sieve. How many cups of ten, how many loose acorns — and how many in all?"** · wall: **"Each brick is the two bricks under it added together. Fill the wall."**
- spoken line (TTS bonus, kept): **"{a} plus {b} plus {c}. How many in all?"**
- hints: hintTip **"Tip every basket onto the sieve."** · hintFill **"Fill all three windows."** · hintCount **"Count the cups in tens and the loose acorns in ones."** · hintSplit **"Tens with tens, ones with ones — then put them together."**
- celebrations as §7. settings: **"Baskets"**: "three small" / "two or three" / "up to four" / "number wall" · **"Cloth"**: "on" / "off". aria: windows **"cups of ten"**, **"loose acorns"**, **"acorns in all"**.
- **Locale traps:**
  - (a) **"Total"** — nl must say *het totaal / samen*, never *de som* (in Dutch *een som* is the exercise itself — kept from the live nl note); it *il totale*, de *zusammen*, fr *en tout*.
  - (b) **"Cup of ten"** — use each locale's ordinary container noun + ten, not a place-value term: de *Zehnerbecher*, fr *godet de dix*, es-MX *vasito de diez*, pt *copinho de dez*, it *bicchierino da dieci*, nl *bekertje van tien*, sv *tiomugg* (or *mugg med tio*), da *bæger med ti*, no *beger med ti*, fi *kymmenen kuppi*. The reviewer chooses; the icon carries the meaning anyway.
  - (c) **Acorn plural with numerals:** fi partitive (*7 tammenterhoa*), it *ghiande* f. (*sette ghiande sciolte*), fr *glands* m., es *bellotas* f., pt *bolotas* f. — the windows show numerals only, words live in bubbles.
  - (d) **Number wall names:** de *Zahlenmauer*, nl *rekenmuur*, fr *mur de nombres / pyramide*, es-MX *pirámide de números*, it *piramide di numeri*, pt *pirâmide de números*, sv *talmur*, da *talmur*, no *tallmur*, fi *lukumuuri* — used in the instruction only.
  - (e) **The squirrel's name:** *Tally* everywhere except sv *Kurre* (live metadata); it *lo scoiattolo* (never *il*).
  - (f) The printed 0 in the cups window is a numeral, not a word — safe in every locale.

## 10. Sound off, access, phones
- Legible with the sound off: tipped tubs, the cloth, grooves and cups, labels and split tags show every step; patters and clatters are bonus.
- Keyboard path in §5; aria live region announces after each shake: **"7 cups on the sieve, 10 acorns in the tray."**
- Taps: tubs ≥ 60 × 52 (whole tub), grip 44 × 60, windows ≥ 100 × 48, keypad ≥ 44 px, a full groove (whole channel) ≥ 190 × 18 + 13 px padding each side = 44 px hit height.
- Pictures: Tally 96 px at 704, 64 px at 360 (the only picture; acorns and cups are drawn tokens). Check above the 360 × 740 and 320 × 640 folds (§4).

## 11. Distinct from
- **Row 83 Merging Drops (1.OA.A.2):** drops merge pairwise in any order. Here nothing merges pairwise; the sieve sorts *all* numbers by place at once.
- **counting-cups (tool) / place-value-lab (tool) / Row 94 Ten-Pocket Band:** making a ten out of loose things to count a quantity. Here the tens arrive already cupped from each basket; the invention is *separating places across several numbers*.
- **Row 250 Light Wall (1.OA.C.6):** a number wall whose lights rise. Here the wall is only a round set; each brick is solved on the same sieve.
- **Row 96 Roll-Up Mats:** columns and carrying in the written algorithm. No written algorithm here — partial sums.
- **Row 143 Round-Trip Cart (sibling):** two numbers on a road, checked by the inverse. Here three or four numbers, checked by sorting.

## 12. Build plan
- **Core state:** `{ face:'small'|'few'|'four'|'wall', cloth:bool, round, tubs:[{n, tipped}], sieve:{cups:[], loose:n}, tray:{loose:n}, windows:{cups, loose, all}, wall?:{bricks:[…6], filled:[…]} }`.
- **Functions:** `tip(i)` (refused if tipped) → adds `floor(n/10)` cups and `n%10` loose to the sieve · `shake()` → moves all sieve loose to the tray · `grooveToCup()` (refused unless a groove holds 10) · `cupToGroove()` · `pour(brickA, brickB)` (wall) · `check()` → `{ok, wrong:'cups'|'loose'|'all'|null}` · `nextTask` banded reshuffle.
- **Gate's own truth (`verify-acorn-sieve-core.js`):** recompute every round: cups = Σ tens digits, loose = Σ ones digits, total = Σ addends, independently of the core; a scripted player (tip all, shake, type the oracle) passes every round; tipping twice never changes the sieve; `shake` conserves acorns (sieve + tray constant); a groove never holds > 10; walls: every brick = sum of the two below, all two-digit; totals distinct per table; bot table of §6 reproduced; tub numbers 11–44.
- **Mutations:** a tub can be tipped twice · shake leaves cups' acorns falling through · grooves hold 11 · cups window without the printed 0 (value read ×1) · all-window accepts cups + loose without ×10 · Check allowed with an upright tub · cloth lifts before Check · wall brick = difference of supports · miss-2 split puts a ones digit over the sieve · same order twice · celebration with previous round's numbers.
- **Pictures:** `forest-creatures/squirrel` only (contact sheet: faces left, full body). Both library baskets are refused for this use (`easter/basket` is full of painted eggs, `at-the-supermarket/basket` full of groceries — ruling appended); `miscellaneous/acorn` is not used: as a 26 px window icon it would sit far below the 64/96 floor, so the window icons are drawn tokens (a dot, a capsule).
- **Risks:** 36 loose acorns + 9 cups at 360 — measured in §4 (four grooves of ten fit 2 × 2). The wall's six bricks at 360: bricks 96 × 44 in a 3/2/1 pyramid fit 328 px. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — tipping, shaking and the cloth reveal are play in themselves, and Tally's store fills.
2. **Would a teacher put it on the board?** Yes — it is the partial-sums method made into a machine: the sieve does what a teacher draws with two colours, and four-addend rounds finally have a way to keep track.
3. **Would a parent trust it?** Calm, numerals only, one library squirrel, no timer or score.
4. **The invention in one sentence:** a sieve whose holes let single acorns through but hold back cups of ten, so tipping every basket and shaking puts all the tens together and all the ones together by themselves.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Every table re-solved by script (`work-c33/verify.js`): the nine kept rounds (37 56 67 80 78 77 82 72 90), the eight two-or-three rounds (no ones total ≥ 10, as claimed), the eight walls (every brick = the two under it, tops 63 78 79 80 82 84 75 81, the "full groove at" column exactly right). Bots re-measured on the default nine: digits-as-ones 0/9, tens-only 0/9, first-two-baskets 3/9 (the two-basket rounds), cups-beside-loose 4/9 (only where the ones stay under ten — honest).
- **G1-112 was not really covered:** the sheet is three picture groups with a total up to 10 (`maxTotal: 10`), not two-digit baskets. Added the **three small baskets** face — seven rounds, totals 4–10 all different, one make-ten round that fills exactly one groove — so the grade-1 sheet lives on the same sieve.
- Pictures re-checked: `forest-creatures/squirrel` faces left, toward the apparatus in the right column; acorns and cups stay drawn tokens (an acorn picture as a 26 px icon would break the 64/96 floor).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
