# Row 193 — Maple's Bakery → THE TRAPDOOR TOWER: boxes are the groups, plates are the shares (3.OA.A.2)

> The designer's "Cake Carousel" (one turn of a stand puts one treat on every plate) is the same mechanic as **New 299 The Leftover Dealer** ("one turn of the crank drops exactly one counter into every box") and close to **New 268 The Dealing Tray**; the critic replaced the invention. Everything the old activity owned is kept.

## 0. Identity
- id **`maple-bakery.share.3-oa-a-2`** (kept; slugs and metadata frozen en/de/fr/es/pt/it/nl; sv/da/no/fi slug, title and intro new at build, grade 3) · grade 3 · CCSS 3.OA.A.2 · strand Operations & Algebraic Thinking · own files `mini tools/maple-bakery-core.js` (rewritten), `maple-bakery-activity.js`, `maple-bakery-activity.html`, `maple-bakery-activities.json`.
- worksheets it also covers: G2-216 Share It Fairly · G2-217 How Many Groups? · G2-233 Share the Set (fraction of a set) · G3-309 Divide It Up · G3-310 Hop Down to Zero · G3-311 Times Families · G3-312 The Missing Factor · G3-369 Fact Families · G3-370–376 the multiplication and division word problems (share, make groups, two ways, multiply-and-group, mixed).
- **the old activity:** a picture of cookies ALREADY split onto plates or into boxes, and three answer buttons. **Kept:** Maple the mouse, the cookies, the two order slips (share / pack) in 7 locales, all ten old rounds. **Dropped:** the hand-drawn cookies, plates and boxes; the pre-split picture (the child only had to count one plate); and the three choices — they were always answer −1, answer, answer +1, so **the right answer was the middle number in every round** (defect list in the report).

## 1. The pitch
"Pack the cookies into a tower of boxes, then pull the trapdoor: every box drops one cookie onto every plate below — count the boxes and you have the groups, count one plate and you have the share: one tower, both meanings of one division."

## 2. Why a child will want it again (the fun)
- **The fill lever.** A long bakery box with n compartments waits under the hopper. Pull the lever and the hopper pours exactly one cookie into every compartment at once (a quick clatter, the box lid snaps shut), and the filled box slides up onto the tower — *thunk* — like stacking crates. The hopper's number drops by n and a little hop arc jumps down the number line under it: 12 … 8 … 4 … 0.
- **The tower.** Box on box, it grows tall and a little wobbly (a 1° sway after each landing). Children like making it tall.
- **The trapdoor.** In share stories the plates are waiting underneath, one under every compartment column. Pull the trapdoor cord: every box's floor swings open from the top box down, 80 ms apart, and the cookies rain straight down their columns onto the plates — each plate catches one from every box, a tidy stack on each. The tower is now a stack of empty boxes; the plates are full. That drop is the show of the round and it IS the mathematics: q boxes of n become n plates of q.
- **The shop shelf.** In pack stories there are no plates — the tower slides sideways onto the shop shelf and the boxes line up with their lids closed, ready to sell.
- **The last cookie.** When the hopper runs out exactly as a box fills, Maple (library mouse) hops, and on success the two readings flash one after the other: the boxes glow ("3 boxes of 4"), then the plate columns glow ("4 on each plate … or 3 on each of 4 plates").
- Free play: before Check the child may push the top box back (its cookies return to the hopper) and fill again; the trapdoor can be closed again (cookies fly back up) until Check.

## 3. The skill and the misconception
- **Skill (3.OA.A.2):** a quotient means either the size of each share (12 cookies shared onto 3 plates → 4 each) or the number of groups (12 cookies in boxes of 4 → 3 boxes). Also: 1/b of a set is one of b equal shares (G2-233); division as repeated subtraction (G3-310, the hop line); division as an unknown factor and the fact family (G3-311/312/369); deciding from a story whether it asks for the number in each share or the number of groups, and multiplying when it asks for the total (G3-370–376).
- **Misconceptions and how the material pushes back:**
  1. *"Sharing and grouping are different sums."* The same tower answers both: the boxes are the groups, and the trapdoor turns them into the shares. 12 into boxes of 4 is 3 boxes; drop them and you get 4 plates of 3 — the same 12 ÷ 4 = 3 read two ways, made by one move.
  2. *"The answer is the number in the story"* (typing 4 for "boxes of 4"). The typed answer is checked against what the tower actually did; the boxes or one plate's stack number themselves on a miss.
  3. *"Share by guessing a plate amount."* A box always holds ONE for every plate, so plates can only ever get equal amounts; the boxes count the rounds of fair sharing.
  4. *Wrong box size.* For "share onto 3 plates" a 4-compartment box has a column with no plate under it: on the trapdoor those cookies fall past the plates onto the counter, visibly. For "boxes of 4" a 3-compartment box packs boxes of 3, visibly not the slip's 4. A box size that does not divide the pile leaves cookies in the hopper that cannot fill a box (the lever stays locked and the leftovers show) — the numbers in this activity always divide exactly (remainders belong to #299).
  5. *Not reading what the story asks* (G3-374/376). Delivery is the child's decision: plates (trapdoor) when the story asks how many each gets, shelf when it asks how many boxes/groups. A share story sent to the shelf leaves Maple's plates empty; a pack story dropped onto plates leaves no boxes to count — both visible, both misses.

## 4. The stage
**Stacked layout** (no `layout:'split'`; the stage needs ~460 px of width for tower + controls, the split column is ~350). Bubble under the apparatus. Stage 620 px wide at 704, 318 at 360.

| element | 704 px | 360 px | kind |
|---|---|---|---|
| task line = the order slip (≤ 2 lines) | 22 px | 18 px | text |
| **hopper** at the top: a drawn funnel holding the pile (a heap of tokens, never countable), the pile numeral on its front, the round's food picture beside it | funnel 120 × 80 px; numeral 30 px; picture 96 px | 96 × 64; 24 px; 64 px | drawn + library picture |
| **Maple** (library `pets/mouse`) beside the hopper | 96 px | 64 px | library picture |
| **hop line** under the hopper: 0 to the pile, one arc per filled box (−n) | 300 × 36 px | 220 × 32 px | drawn |
| **box-size control**: − / + with the compartment count | buttons 48 px; numeral 28 px | 44 px; 22 px | drawn control |
| **fill lever** beside the box | 56 × 72 px | 48 × 60 px | drawn |
| **box**: a long tray of n compartments with a lid; compartment pitch | pitch 36 px (n ≤ 10 → 360 px), box 34 px tall | pitch 28 px (n ≤ 10 → 280 px), box 26 px | drawn |
| **cookies**: drawn discs in the food's colour, one per compartment | 26 px | 20 px | drawn tokens |
| **tower** of up to 9 boxes above the plate row | ≤ 9 × 34 = 306 px tall | ≤ 9 × 26 = 234 px | drawn |
| **plate row** (share/fraction stories only), one plate under each of the slip's plates; plate stacks of up to 9 tokens offset 8 px | plate 34 px wide, stacks ≤ 90 px | 26 px, ≤ 70 px | drawn |
| **shop shelf** (pack/multiply stories only) to the right | 240 × 40 px | under the tower, full width | drawn |
| **trapdoor cord** and **shelf push** (two delivery handles, always both present) | 48 px each | 44 px | drawn |
| **answer tag** with a keypad (digits + erase) | keys 48 px | keys 44 px | drawn keypad |
| Check | shell button | above the 360×740 fold | shell |

- Cookies are drawn tokens: 50 food pictures at the 96/64 px floor cannot fit. The food picture beside the hopper is the label (96/64 px). Foods (seen on `contact/bakery.png`, labelled in `bakery.json`): cookie, muffin, cupcake, doughnut, pretzel (bakery/pretzel — not the at-the-supermarket pretzels, ruling batch-33). Token colours: cookie tan, muffin brown, cupcake pink, doughnut pink-glaze, pretzel brown-gold.
- The plate row is drawn ONLY in share and fraction stories, and it shows the slip's number of plates (the plates are in the story); pack and multiply stories show the shelf instead. Both delivery handles are always present, so the delivery choice is never given away by which handle exists — a trapdoor pulled with no plates drops the cookies onto the counter.
- No words on the apparatus: the pile numeral, the hop-line numerals, the compartment count and the answer are the only text.

## 5. The hand
- **Box size − / +**: compartments appear/disappear (250 ms), 2–10. Locked once the first box is filled (push all boxes back to unlock).
- **Fill lever** (tap or pull down): if the hopper holds at least n, one token drops into every compartment together (a 120 ms clatter, *chk*), the lid snaps, the box rises onto the tower (220 ms, *thunk*), the pile numeral counts down by n and the hop line draws an arc −n. If fewer than n remain, the lever will not move (a dull *tok*) and the leftovers glow in the hopper. In multiply stories the hopper is the oven: it reads "?" and counts UP by n per box.
- **Push back** (tap the top box): it slides down, its tokens fly back to the hopper, the last arc is erased.
- **Trapdoor cord**: the boxes' floors open top-down (80 ms apart); each column's tokens fall straight down (260 ms) onto the plate under that column (or onto the counter where there is no plate). Pull again = the floors close and the tokens fly back up (undo until Check).
- **Shelf push**: the tower slides right onto the shelf and the boxes line up side by side (300 ms). Push again = back.
- **Keypad:** the answer (1–2 digits).
- Response to every control < 50 ms. Everything is undoable until Check.

## 6. The rounds
One round = one order slip. Order-only reshuffle per pass, never the same order twice, never the same box size twice running. Every pile divides exactly by the right box size.

**Numbers within 20** (12 — the ten old rounds kept + two):
| # | slip | food | right box | boxes (fills) | delivery | answer | hop line |
|---|---|---|---|---|---|---|---|
| 1 | share 12 onto 3 plates | cookie | 3 | 4 | plates | 4 | 12, 9, 6, 3, 0 |
| 2 | share 12 onto 4 plates | cookie | 4 | 3 | plates | 3 | 12, 8, 4, 0 |
| 3 | share 15 onto 3 plates | cookie | 3 | 5 | plates | 5 | 15 … 0 |
| 4 | share 20 onto 5 plates | cookie | 5 | 4 | plates | 4 | 20, 15, 10, 5, 0 |
| 5 | share 8 onto 2 plates | cookie | 2 | 4 | plates | 4 | 8, 6, 4, 2, 0 |
| 6 | pack 12 into boxes of 4 | cookie | 4 | 3 | shelf | 3 | 12, 8, 4, 0 |
| 7 | pack 15 into boxes of 5 | cookie | 5 | 3 | shelf | 3 | 15, 10, 5, 0 |
| 8 | pack 18 into boxes of 6 | cookie | 6 | 3 | shelf | 3 | 18, 12, 6, 0 |
| 9 | pack 10 into boxes of 2 | cookie | 2 | 5 | shelf | 5 | 10 … 0 |
| 10 | pack 20 into boxes of 4 | cookie | 4 | 5 | shelf | 5 | 20 … 0 |
| 11 | one third of 12 | muffin | 3 | 4 | plates (one plate glows "1/3") | 4 | 12, 9, 6, 3, 0 |
| 12 | one half of 14 | cupcake | 2 | 7 | plates (one glows "1/2") | 7 | 14 … 0 |

**Numbers within 50** (13):
| # | slip | food | right box | boxes | delivery | answer |
|---|---|---|---|---|---|---|
| 1 | share 24 onto 6 plates | doughnut | 6 | 4 | plates | 4 |
| 2 | pack 35 into boxes of 5 | cookie | 5 | 7 | shelf | 7 |
| 3 | share 42 onto 7 plates | pretzel | 7 | 6 | plates | 6 |
| 4 | pack 32 into boxes of 4 | muffin | 4 | 8 | shelf | 8 |
| 5 | share 27 onto 3 plates | cupcake | 3 | 9 | plates | 9 |
| 6 | pack 48 into boxes of 8 | cookie | 8 | 6 | shelf | 6 |
| 7 | share 40 onto 5 plates | doughnut | 5 | 8 | plates | 8 |
| 8 | pack 36 into boxes of 9 | pretzel | 9 | 4 | shelf | 4 |
| 9 | one quarter of 28 | muffin | 4 | 7 | plates (one glows "1/4") | 7 |
| 10 | story, share frame: "{name} shares 30 {food} equally among 6 friends. How many {food} does each friend get?" (friends = plates) | cupcake | 6 | 5 | plates | 5 |
| 11 | story, group frame: "There are 45 {food}. {name} makes groups of 5. How many groups are there?" (a group = a box) | cookie | 5 | 9 | shelf | 9 |
| 12 | story, multiply: "{name} fills 6 boxes. Each box holds 4 {food}. How many {food} is that in all?" (oven counts up) | muffin | 4 | 6 | shelf | 24 |
| 13 | story, multiply: "There are 7 boxes with 5 {food} in each box. How many {food} are there?" | doughnut | 5 | 7 | shelf | 35 |

Stories 10–11 use the existing native frames in `scripts/worksheet-gen/data/b2/wp-muldiv-frames.js` (`share[0]`, `group[1]`; 11 locales, names per locale) with the bakery noun. Stories 12–13 use `mul[0]`-style frames with "box" as the group noun; that file is GENERATED (`tools/apply-b2-locale.js` from `i18n/.draft-b2-<loc>.json`) — the two box frames are added to the drafts, never to the generated file (#289 adds the same frames; author once).

**Measured by the critic** (own script `work-c40/c192_193.js`; the gate re-measures):
- *No answer = the slip's number* in any round (0/12, 0/13): typing the story's other number never wins; the two multiply answers (24, 35) are numbers that are not in the slip at all.
- *Answer spread:* within 20 — 3 ×4, 4 ×4, 5 ×3, 7 ×1; within 50 — 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 4, 24, 35: no value more than twice.
- *Delivery balance:* plates 7 / shelf 5 within 20; plates 6 / shelf 7 within 50 — a "always pull the trapdoor" bot wins 58 % / 46 %, and it can be right only if the box size and the answer are also right.
- Largest tower 9 boxes (27 ÷ 3, 45 ÷ 5), largest box 9 compartments — both inside the drawn limits at 320 px.
- The answer is typed, so there is no answer position; the old median tell is gone.

## 7. Check, the misses, the success
- **Check before any box** → hint, no miss: "Set the box size, then pull the lever to fill boxes." · **hopper not empty** → "There are still cookies in the hopper — keep filling boxes." · **not delivered** → "Send the boxes: onto the plates, or onto the shelf?" · **no answer typed** → "Write your answer in the tag."
- **Wrong box size:** miss 1 — share: on the trapdoor, the column(s) with no plate under them fall onto the counter and glow; or a plate stays empty — the slip's plate count and the compartment count glow side by side. pack: the box's compartment count and the slip's "{n}" glow side by side. Hints EN: share — "Every box needs one cookie for each plate. How many plates are there?" · pack — "The slip says boxes of {n}. How many cookies does your box hold?"
- **Wrong delivery:** miss 1 — share story sent to the shelf: Maple's empty plates glow. Pack story dropped onto plates: the shelf glows empty and the slip's "boxes" glow. Hints EN: "The story asks how many each one gets — send the boxes onto the plates." · "The story asks how many boxes — put them on the shelf."
- **Wrong answer:** miss 1 — share: the stack on one plate numbers itself 1, 2, 3 … from the bottom; pack: the boxes on the shelf number themselves 1, 2, 3; multiply: the oven's count re-runs box by box (4, 8, 12 …). Hints EN: share — "Count the cookies on one plate." · pack — "Count the boxes." · multiply — "Count by {n}s, one box at a time." Miss 2 — both readings show together: the boxes are numbered AND one plate column is numbered, and every hop-line arc is labelled "−{n}". Hint EN: "{d} ÷ {n}: every box took {n} from the pile. How many boxes emptied it?"
- Any lever pull, push back, size change, delivery change or new digit clears the miss showing.
- **Success:** Maple hops, then the two readings flash in turn (boxes glow, then the plate columns glow — for a pack round the tower briefly drops a ghost of its cookies onto ghost plates to show the second reading, then rises back). Bubble EN: share — "{a} on each plate! {d} ÷ {n} = {a}. That is {a} boxes of {n}, dropped onto {n} plates." · pack — "{a} boxes! {d} ÷ {n} = {a}. Drop them and there would be {a} on each of {n} plates." · fraction — "{frac} of {d} is {a}: one plate of {n} equal plates." · multiply — "{b} boxes of {n} make {t}: {b} × {n} = {t}." · and the family line under it: "{n} × {a} = {d}, {a} × {n} = {d}, {d} ÷ {n} = {a}, {d} ÷ {a} = {n}." (× order per `FACTOR_ORDER`, see Row 192 §9a.)

## 8. Settings
1. **Numbers:** within 20 / within 50. At rest: the pile numeral and the slip change.
2. **Order:** fill, then answer / answer, then fill. At rest: in answer-first a small padlock sits on the fill lever until a number is typed; the tower then checks the prediction.

## 9. Words (EN source)
- title (frozen) "Maple's Bakery" · instruction "Help Maple divide the treats: fill the boxes, send them to the plates or the shelf, and write what you found."
- slips `qshare` "Share {d} {food} onto {n} plates. How many on each plate?" (kept, 7 locales) · `qpack` "Pack {d} {food} into boxes of {n}. How many boxes?" (kept) · `qfrac` "What is {frac} of {d} {food}?" · stories from the frame bank.
- hints `hintStart` · `hintKeepFilling` · `hintDeliver` · `hintWrite` · `hintSizeShare` · `hintSizePack` · `hintToPlates` · `hintToShelf` · `hintShare` · `hintPack` · `hintMul` · `hintStrong` (section 7).
- celebrations `winShare` · `winPack` · `winFrac` · `winMul` · `family`.
- settings "Numbers" — "within 20" / "within 50"; "Order" — "fill, then answer" / "answer, then fill".
- aria `srTower` "{b} boxes of {n} on the tower. {p} left in the hopper." · `srDrop` "The boxes opened: {n} plates with {q} on each." · `srShelf` "{b} boxes on the shelf."
- **Locale traps:**
  - *Food plurals* from `image-vocabulary.js` (sv "kakor", da "småkager", no "kjeks" — invariant plural, the numeral carries it; it "muffin" invariant; fi partitive after numerals: "12 keksiä"). The `countable()` gate in `lib/b2-common.js` rejects a noun whose plural equals its singular wherever the plural would be the only number signal — here the numeral always stands beside it, so muffin/kjeks pass.
  - *Plates and boxes:* de "Teller / Schachteln", fr "assiettes / boîtes", es "platos / cajas", pt "pratos / caixas", it "piatti / scatole", nl "bordjes / doosjes", sv "tallrikar / askar", da "tallerkener / æsker", no "tallerkener / esker", fi "lautasta / rasiaa" (partitive after numerals).
  - *Division sign* from `notation.js`: ÷ en/fr/es/pt, ":" de/it/nl/da/no/fi, "/" sv (÷ meant minus in older Swedish — forbidden). × or · per the same file; factor order in the family line per Row 192 §9a.
  - *Fractions of a set:* fr "le tiers de 12", de "ein Drittel von 12", fi "kolmasosa 12:sta" (elative); fraction words written per locale and checked by the reviewer.
  - *"Trapdoor", "shelf", "lever"* are hint words only: de "Klappe / Regal / Hebel", fr "trappe / étagère / levier", es "trampilla / repisa / palanca", pt "alçapão / prateleira / alavanca", it "botola / scaffale / leva", nl "luikje / plank / hendel", sv "lucka / hylla / spak", da "lem / hylde / håndtag", no "luke / hylle / spak", fi "luukku / hylly / vipu".

## 10. Sound off, access, phones
- Sound off: the pile numeral, the tower, the falling columns, the plate stacks, the shelf and the hop line carry everything.
- Keyboard: Tab → size −/+ → lever (Space) → top box (Enter = push back) → trapdoor cord (Enter) → shelf push (Enter) → keypad (digits) → Check.
- aria-live: `srTower` after each fill, `srDrop` / `srShelf` after delivery.
- Taps: size buttons 48/44, lever 56/48, delivery handles 48/44, keys 48/44.
- Pictures: Maple and the food label 96/64 px.
- Phones: hopper and Maple share the top row with the hop line under them; the box, the tower and the plate row are centred; the shelf moves under the tower; the keypad opens over the shelf when the tag is tapped. At 320 px the box pitch is 25 px (10 compartments = 250 px), tokens 18 px, tower ≤ 9 × 24 px. Check above both folds (stage 560 px at 360 with the keypad closed).

## 11. Distinct from
- **New 299 The Leftover Dealer** (one crank turn drops one counter into every box; remainders) and **New 268 The Dealing Tray** (walls + a dealing shoe + drawers for a fraction of a set): both DEAL one at a time round a row. The tower never deals: it packs whole groups and the trapdoor transposes groups into shares — the two meanings of one quotient made by one physical move. No remainders here.
- **New 292 The Pouring Frame** (counters pour into a frame of fixed rows, a column at a time, to find a missing width) — the tower is grown box by box from a chosen group size and its point is the drop onto plates, not a width search.
- **lids** (tool: lids hide equal numbers) and **pair-gate** (tool) — no packing, no two readings. **Row 28 The Ten-Seat Wheel** — make ten.
- **This batch:** #192 builds groups by echoes, #288 walks equal steps, #289 classifies a story's numbers into moulds (the tower asks only where the boxes go).

## 12. Build plan
- **Core state:** `{ slip {kind: 'share'|'pack'|'frac'|'storyShare'|'storyGroup'|'mul', d, n, b?, frac?}, size, boxes, pile, delivered: null|'plates'|'shelf', typed, misses }`. Functions `setSize(n)`, `fill()` (refused when pile < size; mul: pile counts up), `pushBack()`, `dropToPlates()`, `toShelf()`, `plateStacks()` (column k → plate k; columns with no plate → counter), `judge()` — share/frac/storyShare: size = n ∧ pile = 0 ∧ delivered = plates ∧ typed = d/n; pack/storyGroup: size = n ∧ pile = 0 ∧ delivered = shelf ∧ typed = d/n; mul: size = n ∧ boxes = b ∧ delivered = shelf ∧ typed = b·n.
- **Verify gate** (own oracle): every d divisible by n; quotient ≤ 9; size ≤ 10; no answer equals the slip's number; no answer value > 2 (within 50) / > 4 (within 20) times; delivery split as declared; after any sequence of fills every box holds exactly `size`; after a drop every plate holds exactly `boxes` and the counter holds `boxes × (size − plates)` when size > plates; push-back restores the pile exactly; the lever refuses when pile < size; reshuffle never repeats an order nor a box size twice running (1,000 shuffles).
- **Mutations:** fill puts size+1 in one compartment → equal-box rule; drop sends a column to the wrong plate → transpose rule; judge accepts typed = n → slip-number rule; judge ignores delivery → delivery rule; pile can go negative / lever fills a short box → pile rule; size changeable mid-pack → lock rule; a d not divisible by n in a table → table rule; plates drawn in a pack story → plate-row rule; three-choice buttons re-introduced → local test asserts no choice buttons exist.
- **Local test:** real lever pulls, push-backs, trapdoor and shelf at the seven widths, every round, both settings, all misses.
- **Pictures:** `pets/mouse`, the five bakery foods (seen). **Risks:** nine-box towers at 320 px (24 px boxes) — tokens are never tapped and the boxes number themselves on a miss. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a lever that packs a box in one clatter, a tower that grows, and a trapdoor that rains cookies onto the plates.
2. **Would a teacher put it on the board?** Yes — it makes both meanings of one quotient with one move, it asks the child to decide what the story wants (plates or boxes), it never shows the answer before the child acts, and the middle-button tell is gone.
3. **Would a parent trust it?** Calm, library mouse and bakery food, no score.
4. **The invention:** a tower of packed boxes whose trapdoor drops one treat from every box onto every plate — groups turned into shares in front of the child's eyes.

## 14. Critic review (2026-10-17)
Scores before → after: invention 3→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 1→5 · reality 4→5
What changed:
- The carousel ("every plate that passes the chute gets one cookie per turn") was New 299's invention (one crank turn drops one counter into every box) — replaced by the Trapdoor Tower: pack whole groups with a lever, then a trapdoor transposes q boxes of n into n plates of q.
- The carousel left the child no interpretive decision (in both share and pack the move was "set the slip's number, turn, count turns"). The tower adds the decision 3.OA.A.2/G3-374/376 is about: deliver to plates (each share) or to the shelf (number of groups) — a wrong delivery is visible and graded.
- Coverage: G3-371/375 multiplication stories had no round — two multiply stories added (the hopper becomes an oven that counts up). G3-310's hop line is now driven by real repeated subtraction (each box takes n).
- Layout: stacked (the split column is too narrow). Tables re-measured with my own script (no answer = slip number, ≤ 2 repeats, delivery 7/5 and 6/7, tower ≤ 9).
- Frame-bank note: `wp-muldiv-frames.js` is generated — new frames go into the drafts.
