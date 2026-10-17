# Row 95 — Compare Two-Digit Numbers: THE TEN-ROD DRAWERS (1.NBT.B.3)

## 0. Identity
- id `choice-board.compare-two-digit.1-nbt-b-3` (KEPT; slugs/metadata frozen in all 11 locales) · grade 1 · CCSS 1.NBT.B.3 · strand Number & Operations in Base Ten · own files at rebuild: `rod-drawers-core.js`, `rod-drawers-activity.js`, `rod-drawers-activity.html`, `rod-drawers-activities.json` (the row's id and slugs move to the new manifest; the old row is removed from `choice-board-activities.json` in the same commit — `preflight-activity-routes.js` proves the id still resolves exactly once).
- frozen page title "Compare Two-Digit Numbers — Greater Than, Less Than, Equal"; the frozen intro promises comparing two two-digit numbers with >, = and <, looking at the tens first, then the ones (e.g. 47 and 52), and choosing the true statement — kept: the child still makes the true statement, now by turning the sign itself.
- worksheets it covers: **G1-114** Greater, Less, or Equal? (picture groups with symbols) · **G1-135** Smallest First · **G1-136** Biggest First · **G1-137** Greater or Less? · **G3-325** Thousands Showdown (four-digit, place value from the left).
- old activity: a choice-board (E2 engine) showing two numbers and three statement chips ("47 > 52", "47 = 52", "47 < 52"), tap the true one; 8 pairs (47/52, 63/38, 45/45, 71/76, 54/51, 29/92, 88/88, 60/49). **Kept:** those pairs (one of the two equal pairs dropped — one "=" per pass), the three relations, the "tens first, then ones" teaching. **Changed:** from three text chips to apparatus — the coverage review's Ten-Rod Drawers, taken further (§1: the value columns and the spanning sign).

## 1. The pitch
"Each number is a cabinet with a tens drawer and a ones drawer; the tens drawers must open first and their rods stand up as a column — and when the tens already differ, the ones drawers stay locked, because nine ones can never reach the next ten."

## 2. Why a child will want it again
- **Drawers to pull.** Two little wooden cabinets stand on a podium, each wearing its number. Pull a drawer handle and the drawer slides out with a wooden rumble and its rods stand up, clack-clack-clack, building a column beside the cabinet. Pulling drawers open is one of the oldest joys there is.
- **The lock that clicks shut.** When the tens decide, the ones drawers' little padlocks click SHUT with a satisfying snap — the cabinet is saying "no need". Children try the ones drawers anyway and get a tiny rattle.
- **The sign that grabs.** Between the cabinets lies a hinged sign. Turn it, press Check, and its two arms stretch out and grab the two columns: the open mouth closes round the top and bottom of the tall column, the point lands at the short one. Wrong way round, its point bumps into the tall column and it wobbles back.
- **The skyline.** In order rounds, three cabinets climb a staircase and at Check their columns rise behind them like a skyline: a smooth staircase or a dip that gives the misplaced one away.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (1.NBT.B.3):** compare two two-digit numbers by the meaning of the tens and ones digits and record it with >, = or <; order three numbers smallest-first or biggest-first (G1-135/136); compare picture groups to 20 with symbols (G1-114); extension: compare four-digit numbers from the left (G3-325).
- **Misconceptions and the push-back:**
  - *Ones first* (29 > 41 because 9 > 1): the ones drawers are padlocked until the tens are open; when the tens differ, they stay locked. On a miss they open anyway and the 9 ones stack onto the 20 column — it reaches 29, still below the 40 column. Nine ones can never reach a whole ten, and the child sees it.
  - *Digit swaps* (24 vs 42 "the same digits"): the tens columns are 20 and 40 tall — not the same at all.
  - *> read as "less"*: the sign is not read, it is FITTED: its open side must hold the taller column. A sign turned the wrong way cannot grab — its point hits the tall column.
  - *"=" used for "close"* (54 vs 51): "=" is two level bars; on unequal columns one end of the bars tips up — bars only lie level on equal columns.
  - *Ordering by the first digit only / by the last digit*: the order skyline rises from both drawers; a misplaced card makes a dip.

## 4. The stage
**At 704 (stacked):**
- **The podium** (640 × 420 incl. columns): a wooden floor line across the stage.
- **Two cabinets** (compare): 150 × 200 px each, standing at the left and right thirds of the podium; front face cream with the numeral in Baloo 2 64 px (left numeral teal #146B5E, right coral #F2784B — colour by place on the podium, never by size); under each digit its drawer: a **tens drawer** (left, 66 × 56) and a **ones drawer** (right, 66 × 56), each with a round wooden knob (the pull handle, 44 px; hit 56 px). A small padlock (drawn, 22 px) hangs on each ones drawer at rest.
- **Value columns:** when a drawer opens, its content stands up as part of a column on the cabinet's inner side (facing the middle): tens as vertical rods (each rod 10 cubes, drawn: a bar 24 px wide, 32 px tall at 704 = 3.2 px per one), ones as single cubes on top (3.2 px each, drawn as small squares with a 1 px light edge so each is visible when stacked … at 3.2 px they are seen as a striped strip; on a miss they spread into countable cubes, §7). A column of 99 = 317 px. Column bottoms stand on the podium floor.
- **The sign** (middle): a hinged pair of bars (each 70 × 10 px, ink 3 px) lying flat on the podium at rest (greyed, 40 % alpha) until the deciding drawers are open; then it stands up and can be turned. Below it a small turn button (⟲, 48 px). Its three states: < , > , = (two parallel bars).
- **Order rounds:** three cabinets (120 × 180, numerals 52 px) in a waiting row at the bottom and a **staircase** of three steps (each step 180 wide, rising 40 px left to right) with a direction icon at its top-left: "small → big" (three dots of growing size) or "big → small". Columns rise BEHIND the cabinets on the steps at Check.
- **Groups setting:** the round's fruit stands full size on top of BOTH cabinets (library picture 96 px at 704, 64 px at 360 — the group's name; the same fruit on both, so only the amounts differ). The cabinet fronts show the group instead of a numeral: a "pack" (a drawn 2 × 5 tray of drawn round counters, 22 px at 704 / 16 px at 360, in the fruit's colour — apple #D9363E, banana #E8C547, pear #B5C94A, strawberry #E0444E, orange #F08A24 — with a 2 px ink outline) for each full ten and loose counters beside it, max 20 — and the drawers hold packs (tens) and loose counters (ones). The counters are apparatus tokens, not shrunken pictures: a cabinet front is not a graph, so PICTURE-RULINGS forbids library pictures below the floor there. Pictures: `fruits/apple`, `fruits/banana`, `fruits/pear`, `fruits/strawberry`, `fruits/orange` (contact sheet: clear; cherry excluded).
- **Four-digit setting:** cabinets 200 × 180 with four drawers (thousands, hundreds, tens, ones; 44 × 50 each) under the numeral (Baloo 2 52 px, locale grouping §9); here columns cannot be to scale, so each opened drawer pair raises two **place towers** of that place's blocks (each block 16 px tall: a big cube / a flat / a rod / a cube, drawn) side by side over the drawers — compared only within the same place.
- **Task line** (20 px) above; **bubble** (18 px) under the podium.
- No words on the apparatus: numerals, blocks and the sign only.

**At 360 (stacked):** cabinets 132 × 170 (numeral 48 px; drawers 58 × 48; knobs 44 px); columns 2 px per one (99 = 198 px), rods 18 px wide; sign bars 52 × 8; order: cabinets 96 × 140 (numeral 40 px), staircase 3 × 104 px steps; four-digit cabinets 160 × 150 with drawers 36 × 44 (hit 44 px — the knobs extend the hit area below the drawer). At 320: columns 1.8 px per one.

## 5. The hand
- **Pull a drawer:** drag its knob down/out (or tap it). The drawers of the SAME PLACE open together in both cabinets (they are linked by a rod under the podium — pulling one pulls its partner): slide 220 ms, then the rods stand up one after another into the column (60 ms each, clack). First response < 30 ms (the knob moves with the finger).
- **Locks:** at rest the ones drawers are padlocked. When both tens drawers are open: if the tens are equal, the padlocks drop off (clink) and the ones drawers can be pulled; if they differ, the padlocks click SHUT with a seal (a teal tick on the padlock) and a pull only rattles them. (Four-digit: each place unlocks only when every place to its left is open and equal.)
- **The sign:** once the deciding pair is open, the sign stands up. Tap ⟲ (or the sign itself) to turn it: < → > → = → < (each turn 160 ms, click). Dragging it is not needed; it lives in the middle.
- **Order rounds:** drag a cabinet onto a step (it settles, the step creaks); drag between steps to swap; drag back to the waiting row. Drawers on the staircase cabinets are opened at Check only (and freely in free play).
- **Free play** (after success): every drawer opens and closes freely, columns rise and sink; the sign can be turned and grabs live; in order rounds the cabinets can be re-stacked and the skyline re-forms.
- **Keyboard:** Tab → knob (Enter pulls) → sign (Space turns) → cabinets (Enter picks up, ← → move along steps, Enter drops).

## 6. The rounds
**Compare, two-digit (default, 10 rounds):**
| # | left · right | deciding place | right sign | trap the round targets |
|---|---|---|---|---|
| 1 | 47 · 52 | tens (4 < 5) | < | ones bigger on the left (7 > 2) |
| 2 | 63 · 38 | tens | > | ones bigger on the right |
| 3 | 45 · 45 | — (equal) | = | the one "=" round |
| 4 | 71 · 76 | ones (tens equal) | < | equal tens |
| 5 | 54 · 51 | ones | > | equal tens; "close" ≠ equal |
| 6 | 29 · 92 | tens | < | digit swap |
| 7 | 60 · 49 | tens | > | 0 ones vs 9 ones |
| 8 | 24 · 42 | tens | < | digit swap |
| 9 | 37 · 34 | ones | > | equal tens |
| 10 | 65 · 56 | tens | > | digit swap |
Signs: < 4 / > 5 / = 1; bigger number left in 5 rounds, right in 4; three digit swaps; three equal-tens rounds (4, 5, 9).

**Order three, two-digit (8 rounds; the steps' direction alternates):**
| # | cards (waiting row order) | steps | right order |
|---|---|---|---|
| 1 | 43 · 34 · 38 | small → big | 34, 38, 43 |
| 2 | 72 · 27 · 70 | big → small | 72, 70, 27 |
| 3 | 15 · 51 · 50 | small → big | 15, 50, 51 |
| 4 | 66 · 61 · 69 | big → small | 69, 66, 61 |
| 5 | 98 · 89 · 80 | small → big | 80, 89, 98 |
| 6 | 23 · 32 · 30 | big → small | 32, 30, 23 |
| 7 | 57 · 75 · 55 | small → big | 55, 57, 75 |
| 8 | 41 · 14 · 44 | big → small | 44, 41, 14 |
The greatest card stands in waiting-row place 1/2/3 = 3/3/2 across the pass; every round has a digit-swap pair and/or an equal-tens pair.

**Compare, groups to 20 (8 rounds):** 14 · 17 (<) · 12 · 8 (>) · 20 · 15 (>) · 9 · 11 (<) · 16 · 16 (=) · 13 · 10 (>) · 18 · 19 (<) · 11 · 7 (>). The group with MORE pieces is laid out more tightly in half of the rounds (a spread-out small group never looks bigger by accident — the packs make the tens plain).

**Compare, four-digit (8 rounds):** 4321 · 4312 (> at tens) · 2785 · 3001 (< at thousands) · 6050 · 6005 (> at tens) · 1999 · 2000 (< at thousands) · 7104 · 7140 (< at tens) · 3333 · 3333 (=) · 8090 · 8009 (> at tens) · 5672 · 5762 (< at hundreds).

**Answer position:** bigger-left/bigger-right and the sign's direction are balanced 40–60 % per pass (the gate counts); the sign always starts lying flat (no default direction); the waiting-row order in order rounds is never already correct. **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check before the deciding drawers are open** → hint "Open the tens drawers first." (or "The tens are the same — open the ones drawers." when the ones are unlocked but shut) (no miss). **Check in order rounds with an empty step** → "Put every cabinet on a step." (no miss).
- **The grab (every compare Check):** all drawers open (the ones join the tens on top of each column); the sign's arms stretch (300 ms) — the open side's two tips reach for the top and the foot of the column on that side, the point for the middle of the other column. Right: both tips touch their column and the point touches the other; the sign clicks onto a pin. "=": the two bars stretch to both columns and lie level.
- **Miss 1 — what the apparatus shows:** wrong way round, the sign's point bumps into the tall column, the open side hangs in empty air beside the short one, and it wobbles back to the middle; "=" on unequal columns: the bars tip (one end up) and slide back. The DECIDING drawer pair glows (the tens unless they were equal); the ones cubes on the columns spread into countable cubes for a moment. Hint by case: ones-first trap "Look at the tens first: {tL} tens and {tR} tens." · equal tens "The tens are the same — the ones decide." · "=" misuse "Same only if both columns reach the same height."
- **Miss 2:** each column gets its tens counted in labels beside it (10, 20, 30 …) and the ones counted on (… 47); a dotted line runs from the top of the shorter column across to the taller one, so the gap between them is seen; the sign's right orientation appears as a faint ghost over the real one. Hint "The open side holds the bigger number."
- **Order rounds:** at Check the columns rise behind the three steps. Right = a smooth staircase in the steps' direction. Miss 1: the column that breaks the staircase glows and its cabinet hops back to the waiting row; the deciding drawer pair between it and its neighbour glows. Hint "Compare the tens first, then the ones." Miss 2: all three columns get their tens labels and the places light in the right order (1, 2, 3 tags on the steps' fronts).
- Any new drawer pull, sign turn or cabinet move clears the showing.
- **Success:** the sign clicks onto its pin, both cabinets bow (a 4 px dip), the deciding drawer pair shines. Bubble: "{a} is greater than {b}!" / "{a} is less than {b}!" / "{a} is equal to {b}!" — always with the left number first (so the sentence reads the sign left to right); order: "{x}, {y}, {z} — from the smallest to the biggest!" / "… from the biggest to the smallest!"; groups: "{a} is greater than {b}!" with the counts.

## 8. Settings (each visibly changes the board at rest)
1. **Numbers:** groups to 20 / two-digit / four-digit — picture-group fronts with packs, numeral cabinets with two drawers, or wide cabinets with four drawers.
2. **Task:** compare two / order three — two cabinets and the sign, or three cabinets and the staircase.

## 9. Words (EN source)
- title (in-tool): "The Ten-Rod Drawers"
- instruction: "Open the drawers, tens first. Then turn the sign so it is true."
- prompts: compare "Which sign makes it true?" · order small "Put them in order: smallest first." · order big "Put them in order: biggest first." · groups "Which sign makes it true for the two groups?"
- hints: hintTensFirst "Open the tens drawers first." · hintOnesNow "The tens are the same — open the ones drawers." · hintSteps "Put every cabinet on a step." · hintLookTens "Look at the tens first: {tL} tens and {tR} tens." · hintOnesDecide "The tens are the same — the ones decide." · hintEqual "Same only if both columns reach the same height." · hintOpenSide "The open side holds the bigger number." · hintOrder "Compare the tens first, then the ones."
- success: "{a} is greater than {b}!" · "{a} is less than {b}!" · "{a} is equal to {b}!" · "{x}, {y}, {z} — from the smallest to the biggest!" · "{x}, {y}, {z} — from the biggest to the smallest!"
- aria: cabinet "number {n}"; drawer "{n}: tens drawer, {t} tens" / "ones drawer, locked"; sign "sign: less than / greater than / equal to"; column "column, {n}".
- settings: "Numbers" · "groups to 20" · "two-digit" · "four-digit" · "Task" · "compare two" · "order three"
- **Locale traps:**
  - **Spoken number words put the ones first** in de (*siebenundvierzig*), nl (*zevenenveertig*) and da (*syvogfyrre*, with vigesimal tens) — exactly the "ones first" error this activity attacks. The apparatus is word-free (numerals + drawers), TTS of a number is a bonus only, and the hint names the tens explicitly ("4 Zehner und 5 Zehner") so the spoken order never decides. The reviewer checks that no de/nl/da hint says the ones first.
  - **The relation sentences:** de *ist größer als / ist kleiner als / ist gleich* · fr *est plus grand que / est plus petit que / est égal à* (school register; *supérieur à / inférieur à* is CE2+) · es *es mayor que / es menor que / es igual a* · pt *é maior que / é menor que / é igual a* · it *è maggiore di / è minore di / è uguale a* · nl *is groter dan / is kleiner dan / is gelijk aan* · sv *är större än / är mindre än / är lika med* · da *er større end / er mindre end / er lig med* · no *er større enn / er mindre enn / er lik* · fi *on suurempi kuin / on pienempi kuin / on yhtä suuri kuin*. The sign glyphs are identical in all 11.
  - **Four-digit grouping (decided):** en "4,321" (US school form; the en decimal mark is the point, so the comma cannot read as a decimal); fr/sv/no/fi "4 321" with U+202F narrow no-break space (the school form in those systems); de/nl/it/es/pt/da "4321" ungrouped — in these six the POINT is the thousands mark and the COMMA the decimal mark, four-digit grouping is optional (DIN 5008, RAE, Dansk Sprognævn), and "4.321" beside comma-decimals is exactly the confusion an eight-year-old does not need. The digits are spaced by the drawers underneath in every locale anyway. One table `GROUPING` in the core; the same table must govern the printed G3-325 page (the reviewer compares the two).
  - **Order words:** "smallest / biggest" (not "least / greatest" at grade 1 in en — the worksheets G1-135/136 use smallest/biggest first); de *vom kleinsten zum größten*, fr *du plus petit au plus grand*, fi *pienimmästä suurimpaan*.
  - **Groups setting** uses no nouns on screen (pictures only); the success sentence uses numbers.

## 10. Sound off, access, phones
- Sound off: drawers, locks, columns, the sign's grab and the labels carry everything; clicks and clacks are decoration.
- Keyboard path §5; every drawer knob and the sign are focusable buttons.
- Taps: knobs 44 px with 56 px hit (44 on phones with the below-drawer extension); sign turn button 48 px; order cabinets ≥ 96 × 140.
- Pictures (groups): the round's fruit at 96 / 64 px on top of each cabinet; the packs and loose pieces are drawn counters in the fruit's colour (no exception needed).
- Fold at 360 × 740: task 48 + cabinets 170 + columns up to 198 + sign row 56 + Check 56 ≈ 560 (groups setting: + 64 for the cabinet-top fruit ≈ 624); order rounds: waiting row 150 + staircase 260 + Check 56 ≈ 570; 320 × 640 ≈ 540.

## 11. Distinct from
- **#19 Number Elevator, #20 Block Towers, #21 Creek Map, #22 Nesting Pots** (K.CC.C.7, numerals 1–10): floors, growing towers, forks, pots growing to size — all single-digit magnitude. Here the comparison is by PLACE: drawers in place order, locks that close when a higher place decides, and a sign that must fit the columns. Block Towers grow both numbers as towers on success; here columns are built drawer by drawer, the ones held back by a lock, and the sign is fitted to them.
- **comparison-planks / number-balance tools:** planks and a balance compare lengths and equality; no place value, no drawers, no sign-fitting.
- **Row 93 / 94 (this batch):** they build and read tens and ones; this one compares and orders by them.

## 12. Build plan
- **Core state:** `{nums:'groups'|'two'|'four', task:'compare'|'order', round, cards:[n…], open:{place:bool}, locks:{place:'locked'|'open'|'sealed'}, sign:'flat'|'<'|'>'|'=', steps:[null,null,null], dir:'up'|'down', miss, help}`.
- **Core functions:** `digits(n, places)` · `decidingPlace(a,b)` → first place from the left where digits differ (or null) · `openPlace(p)` (refuses unless every place to the left is open; seals the remaining places when the opened place decides) · `columnHeight(n)` (to scale in two-digit and groups; per-place towers in four-digit) · `relation(a,b)` → '<'|'>'|'=' · `grab(sign, a, b)` → fits | wrongWay | tiltedEqual · `orderOk(steps, dir)` + `firstBreak(steps, dir)` · `check(s)` → `{ok, kind:'closed'|'emptyStep'|'wrongWay'|'falseEqual'|'orderBreak'}`.
- **Gate ground truth (own oracle):** every compare round's relation recomputed from the numerals; exactly one "=" per pass per level; ≥ 3 digit swaps and ≥ 2 equal-tens rounds per two-digit pass; bigger-left share and sign-direction share within 40–60 %; `decidingPlace` matches the table's "deciding place" column; ones are sealed whenever tens differ; columns are proportional (height(47) / height(52) = 47/52 within 1 px); four-digit rounds decide at thousands, hundreds and tens at least once each; order rounds' waiting row is never already in order and the greatest card's start place balance is 3/3/2; four-digit numerals use the locale grouping table.
- **Mutations:** a library picture rendered below 96/64 px in a pack · four-digit numeral grouped with a point in de/nl/it/es/pt/da · ones drawer opens before the tens · ones stay unlocked when tens differ · deciding place computed from the right · grab accepts the reversed sign · "=" accepted for 54/51 · columns drawn with tens and ones at the same unit height (9 ones = 9 rods) · order check compares only the ones digits · two "=" rounds in one pass · waiting row starts in order · help survives a drawer pull · de hint emitted ones-first.
- **Pictures to confirm at build:** the five fruits at 96 / 64 px on the cabinet tops (contact sheet 2026-10-17: apple, banana, pear, strawberry, orange all clear; never cherry, plum or peach — they read as apples), and each counter colour reads as its fruit beside the picture.
- **Risks:** 1.8–3.2 px per one makes ones cubes a strip at rest — the miss shows spread cubes, and the gate asserts the strip has visible 1 px separators at 704.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — drawers to pull, rods that clack upright, padlocks that snap shut, and a sign that reaches out and grabs.
2. **Would a teacher put it on the board?** Yes — "the tens decided, so the ones are locked" is the place-value comparison lesson as a mechanism, and the 29-vs-41 miss shows nine ones failing to reach a ten.
3. **Would a parent trust it?** Yes — clean wooden apparatus, numerals and true sentences, no score.
4. **The invention, in one sentence:** each number is a cabinet whose tens drawer must open first and whose ones drawer locks shut when the tens already decide — and the comparison sign is fitted to the two value columns, open side round the taller one.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Data-mark ruling applied: the 22 px library fruits packed into 2 × 5 windows on the cabinet fronts (not a graph, and below even the graph floor) are now drawn counters in the fruit's colour; the fruit itself stands full size (96/64 px) on top of both cabinets as the groups' name. The "exception" text is gone; fold re-measured.
- Four-digit grouping decided per locale with the reason (en comma; fr/sv/no/fi narrow no-break space; de/nl/it/es/pt/da ungrouped because their point is the thousands mark beside a comma decimal) — da moved from "space" to ungrouped; one core table that the printed G3-325 page must match. Mutations added for both.
- Verified every round: two-digit 10 (signs 4/5/1, bigger-left 5/4, 3 digit swaps, 3 equal-tens), order 8 (greatest card's waiting place 3/3/2, none starts in order), groups 8, four-digit 8 (decides at thousands, hundreds and tens). Distinct from comparison-planks / number-balance (no length or balance; place-ordered drawers and a fitted sign) and from #19–#22 (single-digit magnitude).
