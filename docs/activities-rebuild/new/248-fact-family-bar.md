# New 248 — The Fact Family Bar → THE TRAY THAT ONLY HOLDS THE WHOLE (1.OA.B.4)

## 0. Identity
- id `fact-family-bar.play.1-oa-b-4` · grade 1 · CCSS 1.OA.B.4 (understand subtraction as an unknown-addend problem; here: the four related facts of one whole and two parts) · Operations & Algebraic Thinking · files (key `fact-family-bar`, kept from NEW-ORDER.md): `fact-family-bar-core.js`, `fact-family-bar-activity.js`, `fact-family-bar-activity.html`, `fact-family-bar-activities.json`. Start with `node scripts/new-activity.js --num=248`. New metadata in all 11 locales at build.
- worksheets covered: **G1-113** Fact Families (two groups of pictures → four sentences) · **G1-209** Fact Family Houses · **G1-219** Fact Families to 10 · **G1-220** Fact Family Houses to 20 · **G1-221** Fact House Practice to 10 · **G1-222** Fact Families: Missing Partners (the "one number printed" setting).
- the "bar" in the name is a snack bar: a counter with a serving tray, two fruit baskets and four order slips. The coverage review's "bar that only cuts one way" (laying strips of squares) is replaced: blocks of cubes are the material of #135 Leapfrog Parts in this batch, and a set model makes the impossible subtraction refuse more plainly — you cannot take away what is not on the tray.

## 1. The pitch
"The serving tray has exactly as many places as the whole — so you can only add the two parts, and you can only take away what is already on it."

## 2. Why a child will want it again (the fun)
- **Serving orders.** Four order slips hang on the snack bar's rail. Each slip is filled by DOING it: tap the lemons and four lemon counters hop onto the tray, tap the oranges and five more hop in after them. The tray is a real little place to fill.
- **Physics that says no.** Try to add the whole basket-load to a full tray and the extra counters can't find a place: they tumble over the tray's rim, bounce on the counter and roll back home. Try to take the oranges off a tray that only has lemons and the little grabber dips in and comes up empty — five empty grabs, "clink, clink, clink…". Children try it on purpose to see it happen.
- **The roof with three numbers.** The three numbers of the family live on a roof (the whole at the top, the two parts below it), exactly like the worksheets' fact houses — and when all four slips are served they fly up under the roof and become the house's four lit windows, one lighting after another as its fact is read. A finished house is the earned show.
- **Twin trouble.** In the round where both baskets hold the same number, the child discovers only two windows can light — the other two slips flutter down because the facts would be the same. A real "huh!" moment.
- **Free play ("Open the bar"):** choose any two baskets (1–10 each), serve facts freely; every new true fact lights a window.

## 3. The skill and the misconception
- **Skill (1.OA.B.4 with the fact-family worksheets):** three related numbers make four facts — a + b = w, b + a = w, w − a = b, w − b = a — and subtraction can be read as "what goes with a to make w".
- **Misconception 1 — any four sentences with the three numbers** (4 − 9 = 5, 9 + 4 = 13). **Push back:** a subtraction must START with what is on the tray. Start with the 4 lemons and try to take away 9 — the grabber lifts the 4 lemons and dips again and again into nothing: five empty grabs, the slip shakes. Start with 9 (both baskets are now on the tray) and add 4 — the lemon basket is EMPTY (its lemons are already on the tray): it wobbles and nothing comes, and even if it could, the 9 places are full. The whole cannot be added to anything: it already IS everything.
- **Misconception 2 — the whole is not special.** **Push back:** the whole is the tray's own size (its places are drawn as an empty frame from the start). Every subtraction starts by filling the tray, every addition ends with it full — the whole is always the biggest number because it is the tray.
- **Misconception 3 — 4 + 5 and 5 + 4 are the "same fact" (or unrelated).** **Push back:** the bar accepts both, as two slips: the lemons first or the oranges first fill the tray in a different order (the coral counters first or the teal ones first) and end with the same full tray. But the SAME order twice is refused (the slip shakes: "we have this one").
- **Misconception 4 — equal parts give four facts.** **Push back:** with 4 lemons and 4 oranges, "4 + 4 = 8" made either way writes the same sentence, so the second slip is refused; the round has two facts, and the house shows two windows.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 452 + column 220):
- **Task line** (22 px): **"Fill all four slips with the family {a}, {b}, {w}."** (§9)
- **The roof** (drawn: a teal triangle 240 × 130, 3 px ink outline) centred at the top of the stage, holding three **number plates** (64 × 52, numerals 30 px): the WHOLE plate at the apex (cream with a two-colour underline), the A plate at the lower left (coral), the B plate at the lower right (teal). The plates are what the child taps.
- **The baskets:** beside the roof, left and right, the two fruit pictures (library, 96 px) — A's fruit left, B's fruit right — each standing above a small **basket tray** (drawn 2 × 5 frame, cells 20 px; within 20: 2 × 10, cells 14 px … see 360) holding its counters: coral discs for A, teal discs for B (counters are drawn, per the ruling that library pictures are too big for frame cells; the fruit picture labels the group). 96 + 8 + 240 + 8 + 96 = 448 px.
- **The serving tray** (drawn: a cream frame with exactly **w** places, laid out as a ten-frame 2 × 5 with cells 36 px; within 20 two ten-frames side by side, cells 30 px) in the middle of the stage. Places beyond w are not drawn — the tray IS the whole. A small drawn **grabber** (a teal claw shape, apparatus) hangs above the tray.
- **The active slip** under the tray (drawn order slip 360 × 64, cream paper with a punched top): **▢ + ▢ = ▢** or **▢ − ▢ = ▢**, boxes 52 × 52, numerals 30 px.
- **Right column (220 px):** **the house** — four slips hanging in a 2 × 2 grid under a small copy of the roof (each 100 × 46, the two "+" slips on top, the two "−" slips below; empty = dashed boxes); tapping one makes it the active slip → bubble (≤ 3 lines) → speaker.

**At 360 px** (stacked): task line → roof 200 × 108 with plates 52 × 44 (numerals 26 px) and the fruit pictures 64 px either side (64 + 6 + 200 + 6 + 64 = 340), basket trays 2 × 5 with 12 px cells under each picture → serving tray (cells 30 px within 10; two ten-frames with cells 15 px within 20) → active slip 336 × 56 (boxes 46 px) → the house as a 2 × 2 of slips 160 × 40 → bubble → Check. Check ≈ 700 px at 360 × 740. **At 320 × 640:** pictures 64 px stacked above the roof's ends, roof 180 px, house slips 146 × 38, bubble 15 px; Check ≈ 630 px.

**Words on the apparatus:** none — numerals, + − =.

## 5. The hand
- **Tap a slip in the house** (or the next empty one is active by default): it slides to the active place (250 ms).
- **The one rule every plate obeys** (critic: the first draft let "4 + 9" slip through — A then W brought only B's 5 teal counters, the tray read 9 and "4 + 9 = 9" could be served): a plate always means its WHOLE group — A = a coral counters, B = b teal counters, W = a coral AND b teal. Adding a plate moves its whole group onto the tray; subtracting a plate lifts its whole group off. **If any counter of the group cannot come (its basket is empty) or has no place (the tray is full), or any counter to be lifted is not on the tray, the step is REFUSED as a whole**: the counters that did move go back, the box stays empty. So every partial "it sort of worked" is impossible, and the only sentences the tray can serve are the four true facts.
- **Tap a roof plate** to fill the next empty box of the active slip; the tray acts at once (within 80 ms):
  - **Box 1 (any slip):** that group hops onto the empty tray — counters jump one by one in a 200 ms arc, 90 ms apart, from their basket into the next free places (A's coral, B's teal; the WHOLE plate brings both baskets, A then B). The box shows the plate's numeral.
  - **Box 2 of a "+" slip:** that group hops in after. If it does not fit (not enough places left) the counters that have no place tumble over the rim, bounce once and roll back to their basket (a "plip-plip-roll"). If its basket is already empty (its counters are on the tray) the basket wobbles and nothing comes.
  - **Box 2 of a "−" slip:** the grabber lifts that group's counters off the tray, one per dip (160 ms each), back to their basket. Each dip that finds no counter of that kind comes up empty with a hollow "clink" and a dashed circle where the counter should have been.
  - **Box 3 (the result):** the child taps the plate whose number is what the tray now shows. Judged at Check.
- **Tap a filled box** to clear it and every box after it; the tray rewinds that step (counters hop back). Free undo.
- **Check:** judges the active slip (§7). A correct slip flies up into its window.
- **Free play ("Open the bar"):** two dials under the baskets set each basket 1–10; every true new fact lights a window; the roof shows the family it makes.

## 6. The rounds
A round = one family (two baskets) and four slips. The slips may be filled in any order and each slip type accepts either of its two facts — **there is no answer position**. A round ends when four different true facts are served (two in the equal-parts round).

**Level "Within 10"** (G1-113, G1-219, G1-221, G1-209):
| # | basket A | basket B | whole | fruits (A / B) |
|---|---|---|---|---|
| 1 | 2 | 5 | 7 | lemon / orange |
| 2 | 6 | 3 | 9 | apple / pear |
| 3 | 1 | 7 | 8 | strawberry / banana |
| 4 | 4 | 6 | 10 | kiwi / lemon |
| 5 | 3 | 2 | 5 | orange / apple |
| 6 | 5 | 3 | 8 | pear / strawberry |
| 7 | 1 | 4 | 5 | banana / kiwi |
| 8 | 7 | 2 | 9 | pineapple / orange |
| 9 | 4 | 4 | 8 | lemon / apple — **talking round** (two facts) |

**Level "Within 20"** (G1-220):
| # | basket A | basket B | whole | fruits |
|---|---|---|---|---|
| 1 | 8 | 5 | 13 | apple / lemon |
| 2 | 6 | 9 | 15 | orange / pear |
| 3 | 7 | 4 | 11 | strawberry / kiwi |
| 4 | 6 | 8 | 14 | banana / apple |
| 5 | 9 | 3 | 12 | lemon / strawberry |
| 6 | 7 | 9 | 16 | pear / orange |
| 7 | 10 | 7 | 17 | kiwi / banana |
| 8 | 8 | 10 | 18 | pineapple / apple |
| 9 | 6 | 6 | 12 | orange / lemon — **talking round** |

(Within 20, baskets hold up to 10 so each basket tray is one ten-frame; the serving tray is two ten-frames, the second one drawn only up to w − 10 places.)

**Balance on the board:** the bigger part is basket A in 4 rounds and basket B in 4 (equal in 1) per level, so "the left plate is the big one" never holds; the fruit pair never repeats in a level; the talking round never comes first in a pass. Never 0 (no basket is empty; "w − w" is refused, §7).
**Order:** order-only reshuffle per pass (never the same order twice).

## 7. Check, the misses, the success
- **Check with the active slip incomplete:** no miss. The next empty box pulses; bubble: **"Tap the roof numbers to fill the slip."**
- **Refusals while filling (not misses — the material says no at once):** spill (adding past the tray), empty basket (adding a part twice), empty grabs (taking away what is not on the tray), take-away-everything (whole − whole or a part minus itself: the grabber empties the tray and the result box finds no plate for "nothing" — the slip shakes; no fact in this activity is ever 0). Each comes with a one-line bubble: **"No room on the tray!"** · **"Those are already on the tray."** · **"There are no {fruit} on the tray to take."** · **"Nothing would be left — take away the other part."** The refused box stays empty.
- **Miss 1 (a full slip whose result is wrong, e.g. 9 − 4 = 4):** the result plate's numeral bounces off; the counters left on the tray light one by one from the first place (a visible count). Bubble: **"Look at what is left on the tray."**
- **Miss 1 (a repeated fact):** the slip shakes and the window that already holds that fact flashes. Bubble: **"We have this one already — try the other way."** (in the talking round: **"That's the same as {fact}. Twins make only two facts!"** and the other two slips flutter down, the round is done).
- **Miss 2 (second wrong result on the same slip):** the lit counters keep small numerals 1, 2, 3 … and the matching roof plate glows softly. Bubble: **"Count them — which roof number is that?"**
- **A new tap takes the help away** until the next Check.
- **Success (each slip):** "ding", the slip folds into its window under the roof, the window lights; bubble reads it: **"9 take away 4 leaves 5."** / **"4 and 5 make 9."** **All four:** the roof plates glow, the windows light again one after another while each fact is read, and the tray empties into the baskets: **"One family, four facts: 4 + 5 = 9, 5 + 4 = 9, 9 − 4 = 5, 9 − 5 = 4!"** (talking round: **"Twins make two facts: 4 + 4 = 8 and 8 − 4 = 4."**)

## 8. Settings
1. **Numbers:** Within 10 / Within 20 (default Within 10) — the tray's places (one or two ten-frames) and the roof numbers change at rest.
2. **Slips:** Empty / One number missing (default Empty) — "One number missing" (G1-222) prints two of the three numbers on each slip (e.g. 9 − ▢ = 5, ▢ + 4 = 9); the child taps the missing roof plate, and the tray acts out the whole slip on Check (the same spills and empty grabs refuse a wrong partner). At rest the slips show printed numbers.
(The coverage review's "show squares only as a help" is folded into miss 2: counters are always visible, because the set model IS the reasoning; numbering is the help.)

## 9. Words (EN source)
- on-screen title: **The Fact Family Bar**
- instruction: **Serve all four slips! Tap the roof numbers to fill each slip — the tray shows what happens. Two slips add, two slips take away.**
- prompt (task line): **Fill all four slips with the family {a}, {b}, {w}.** · missing-number setting: **Find the missing number on each slip.**
- refusals: **No room on the tray!** · **Those are already on the tray.** · **There are no {fruitPlural} on the tray to take.** · **Nothing would be left — take away the other part.**
- hints: **Tap the roof numbers to fill the slip.** · **Look at what is left on the tray.** · **We have this one already — try the other way.** · **That's the same as {fact}. Twins make only two facts!** · **Count them — which roof number is that?**
- success: **{a} and {b} make {w}.** · **{w} take away {a} leaves {b}.** · **One family, four facts: {f1}, {f2}, {f3}, {f4}!** · **Twins make two facts: {f1} and {f2}.**
- free play: **Open the bar**
- settings: **Numbers** — **Within 10** / **Within 20** · **Slips** — **Empty** / **One number missing**

**Locale traps:**
- **"Fact family"** is a US term. Each locale uses its school name for the idea: de "Tauschaufgabe / Umkehraufgabe" (the four tasks are "Aufgabenfamilie"), fr "la famille de calculs", es "familia de operaciones", pt "família de fatos", it "famiglia di operazioni", nl "rekenfamilie / sommenfamilie", sv "talfamilj", da "regnefamilie", no "tallfamilie", fi "laskuperhe". The on-screen title is chosen per locale by the reviewer ("bar" as snack bar may become "café"/"kiosk").
- **Fruit plural in the refusal** ("no lemons") comes from `image-vocabulary.js` plurals in the page locale (fi partitive after "ei": "ei sitruunoita" — the string is built as a full sentence per locale, not a template with a bare plural).
- **Fact reading in success lines:** "4 and 5 make 9" / "9 take away 4 leaves 5" use each locale's spoken school form (de "4 plus 5 ist 9", "9 minus 4 ist 5"; fr "4 plus 5 égale 9"; sv "4 plus 5 är 9"; fi "4 plus 5 on 9").
- **Minus sign** U+2212; the four slips always show "+" slips above "−" slips (the worksheets' house order in all locales).
- **The house** is a drawn roof shape only — no locale-specific house picture.

## 10. Sound off, access, phones
- Legible silent: counters hopping, spilling over the rim, empty grabs with dashed circles, windows lighting.
- Keyboard: 1/2/3 = the A / B / WHOLE plate; Tab cycles the house slips; Backspace clears the last box; Enter = Check.
- aria: plates "whole 9", "4 lemons", "5 oranges"; tray "tray, 9 places, 4 lemons and 5 oranges on it"; live region narrates each act ("4 lemons onto the tray", "no oranges to take").
- Taps: plates 64 × 52 / 52 × 44; house slips ≥ 146 × 38 (taps are the whole slip); boxes 52 / 46 px.
- Reduced motion: counters appear in place; spills show as the counters fading at the rim.

## 11. Distinct from
- **#135 Leapfrog Parts** (this batch): commutativity by the two parts leapfrogging over the sign — a length model, matching cards. Here: a set model where facts are performed, with impossible subtractions refused by an empty grab.
- **part-whole-frame (tool):** move one counter across a number bond and watch the whole stay. Here the whole is a tray with exactly w places, and the child writes four sentences by acting them.
- **#025 Spring Switch** (decomposition by switching a stream), **numberbond.subtraction-unknown-addend** (one missing part): neither builds a whole family nor refuses 4 − 9.
- **Row 84 The Turning Domino** (1.OA.B.4, another batch): the fact family as one domino turned and broken; **row 26 Snake-Groove Lunchbox / row 28 Ten-Seat Wheel:** containers that close only when exactly full. Here the container is the whole of a fact family, the actions are written as four sentences, and the refusal that matters is the subtraction that starts from a part (empty grabs) — none of those designs refuses a subtraction.

## 12. Build plan
- **Core state:** `{ level, slipsMode, order[], idx, family: {a, b, w, fruitA, fruitB}, tray: {A:int, B:int}, baskets: {A:int, B:int}, slips: Slip[4], active, misses, help, done }`, `Slip = {op:'+'|'−', boxes:[plate|null ×3], printed:[bool ×3], fact:string|null}`, `plate ∈ {'A','B','W'}`.
- **Functions:** `tapPlate(p)` → `{acted, refusal: null|'spill'|'emptyBasket'|'emptyGrab'|'nothingLeft', spilled, emptyGrabs}`, `clearFrom(boxIdx)`, `check()` → `{ok, reason:'incomplete'|'wrongResult'|'repeat'|'twin'}`, `factOf(slip)` (written sentence with numbers, so A/B with equal values compare equal), `nextTask(index)`.
- **Gate `verify-fact-family-bar-core.js` (own oracle):** enumerates every sequence of plate taps for every slip on every round: (1) exactly the four (two for equal parts) true facts are accepted, each once; (2) every false sentence is refused or misses (4 − 9, 9 + 4, 4 + 9, 5 + 9, 4 − 5, 9 − 9, 4 + 4 when a ≠ b, all impossible) — all 27 plate triples per slip type are tried, and a step that moves only PART of a group is never accepted; (3) the tray never holds more than w and counters are conserved (tray + baskets = w at every step); (4) spills = overflow count, empty grabs = shortfall count; (5) "One number missing" slips have a unique solution; (6) bigger part A/B 4/4 per level, fruit pairs unique per level, no 0, talking round not first; (7) fruit pictures exist on disk (fruits/lemon, orange, apple, pear, strawberry, banana, kiwi, pineapple).
- **Mutations:** W as box 2 brings only the basket that still has counters (the "4 + 9 = 9" hole); tray drawn with 10 places regardless of w; subtraction from a part allowed; repeat fact accepted; equal-parts round demands four facts; spilled counters lost (not returned); grabber takes a counter of the wrong kind; result accepted without matching the tray; printed numbers ignored in "one missing" mode; fruit pair repeated; a basket of 0.
- **Pictures verified on the fruits sheet:** lemon, orange, apple, pear, strawberry, banana, kiwi, pineapple (cherry, plum and peach excluded per the rulings). **Risks:** within-20 counters at 15 px on phones — the counters are discs with a 2 px ink ring and still legible; the 2 × 2 house must keep both "+" slips on top in every locale. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — counters hop, spill and come up empty-handed; four slips fly up to light a house.
2. **Would a teacher put it on the board?** Yes — "Can we do 4 take away 9? Let's try it." The refusal makes "the whole starts every subtraction" visible; the four windows are the worksheet's fact house.
3. **Would a parent trust it?** Calm, library fruit, numbers only on the apparatus, no score or timer.
4. **The invention:** the serving tray has exactly as many places as the whole, so you can only add the two parts and only take away what is already on it — the four facts are the only things the tray lets you serve.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **A false fact could be served.** Box rules were written per box, and "the WHOLE plate brings both baskets" plus "an empty basket brings nothing" let A then W bring only B's counters: the tray read 9 and "4 + 9 = 9" passed. One all-or-nothing group rule now governs every plate; the gate tries all 27 plate triples per slip and a mutation reopens the hole.
- **Misconception 1 described physics the rules did not produce** ("9 + 4 spills"); rewritten to what actually happens (the lemon basket is empty — the whole is already everything).
- Measured: bigger part A/B 4/4 in both levels, fruit pairs unique per level, no 0, talking round equal parts; fruits re-seen on the contact sheet (kiwi is a cut half, pear blushed — both fine as labels, cherry/plum/peach excluded).
- Overlap with row 135 and row 84 on the fact-family sheets is deliberate and divided: this tray builds all four facts of one whole; 135 owns the twin relations (turnaround / take-away); 84 one domino turned and broken.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
