# New 268 — The Dealing Tray: walls make the bottom number, the shoe deals fair, the drawers give the top number (3.NF.A.1)

## 0. Identity
- **id** `deal-tray.play.3-nf-a-1` · grade 2 (the platform's band for this row; the content is the set model of 3.NF.A.1) · CCSS 3.NF.A.1 · strand Number & Operations—Fractions · own files `deal-tray-core.js`, `deal-tray-activity.js`, `deal-tray-activity.html`, `deal-tray-activities.json` (one row; register the file in `frontend/lib/activities.ts MANIFEST_FILES`). 0 lines to any shared core or `lcs-shell.*`.
- **Worksheets it covers:** G2-233 "Share the Set" and G3-320 "Fraction of the Group" (both: *Circle the fraction of the pictures. Write how many that is.* — unit fractions with 2–5 per share; level 3 "two thirds / three quarters"). Both are covered exactly: the child separates the fraction of the pictures (pulls the drawers) and writes how many.
- **Merged:** grade 3 "The Fence Pens" (a of b pens) = the **More parts** setting (2/3, 3/4, 2/4). The pens' idea — unequal groups cannot go unnoticed — is kept and made stronger: here they cannot happen at all.
- New activity — nothing to keep from an old one.

## 1. The pitch
"Put in walls until the tray has as many parts as the bottom number, deal the pile like cards so every part gets the same, then pull out as many drawers as the top number — what is in your drawers is the fraction of the set."

## 2. Why a child will want it again
- **Dealing is a real game move.** The pile sits in a wooden dealing shoe. Every tap flicks the next picture out and it skims into the next part of the tray, the turn-pointer hopping down one part each time — exactly like dealing cards round a table. Hold the shoe and it deals by itself, *flick-flick-flick*, until it is empty.
- **Every round of the deal plays a chord.** Each part has its own note (part 1 C, part 2 E, part 3 G, part 4 high C). Dealing into three parts plays C-E-G, C-E-G… — a fair deal *sounds* fair. When the shoe runs out after a complete chord, the tray gives a little shimmer: nothing was left over.
- **The walls are springy.** Tap the wall button and the walls slide apart and settle at equal spacing with a wobble, like a concertina. One wall, two walls, three walls: the tray goes from one big part to halves, thirds, fourths before your eyes — and the parts are always the same size.
- **The drawers are a toy.** Each part is a drawer with a round pull-tab. Drag it and it slides out with a wooden *tock*; its pictures ride along, lifted on a shadow.
- **The earned show:** the pulled drawers float up beside the fraction card, the card turns over to show the sentence, then the drawers glide home and the whole tray glows together while the full chord rings: all the parts make the whole set.
- **Free play:** after each round the tray stays live — change the walls (the deal scoops back into the shoe) and deal again into any number of parts. Twelve into four parts, twelve into three, twelve into two: the child finds out that 12 shares fairly in many ways. In free play the shoe deals into anything; a pile that does not share leaves the turn-pointer hanging beside the short part, whose drawer front shows an empty slot.

## 3. The skill and the misconception
- **Skill (3.NF.A.1, set model; G2-233 / G3-320):** a unit fraction 1/b of a set is the size of ONE of b equal parts of the set; a/b is a of those parts. Sets of 6–20; 2–5 per part for thirds and fourths (G2-233's groups of 2–5), 4–10 per part for halves; b ∈ {2, 3, 4}, a ∈ {1, 2, 3}.
- **Misconception 1 — "one third of 12 is 3"** (the denominator taken as the answer). **Pushback:** the child made 3 with walls — 3 is visibly the number of *parts*, standing on the rail; the answer is what is *inside* one part. No round's answer equals its denominator (§6, measured), so typing the bottom number is never right.
- **Misconception 2 — unequal parts** (circling "some" of the pictures). **Pushback:** the shoe deals one to each part in turn and cannot do anything else; the parts are equal by construction, and so is the wall spacing.
- **Misconception 3 — "2/3 means take 2"** (or count one part only). **Pushback:** the top number counts *drawers*, and a drawer holds a whole part; with two drawers out the child counts both.
- **Misconception 4 — the bottom number read as "how many in each part"** (dealing 12 into parts of 3 makes four parts). **Pushback:** the walls make exactly b parts and the shoe only deals once the tray has the card's number of parts (§5).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout — the tray on the left, a narrow column on the right):**
- **Task line** (≤ 24 px, ≤ 2 lines): **"Make {b} equal parts. Deal the {N}. How many is {frac}?"** (the fraction drawn as small stacked numerals, 20 px).
- **The shoe strip** (full width 672 × 110): a drawn wooden dealing shoe (rounded box, teal rim, a slot at its right end) holding the pile as an overlapping fan of the round's library picture at **96 px** (overlap up to 60 %; the pile is not for counting). A numeral tag on the shoe shows **{N}** (28 px). The whole shoe face (260 × 110) is the deal button.
- **The tray** (536 × 432): cream floor, teal rim 3 px, corners 14 px. Its height never changes — it is the whole. Walls are 4 px teal bars across it; with b parts each part is 432 / b tall (216, 144, 108). Each part is a **drawer**: a front edge at its right end with a round pull-tab (44 × 44, coral ring). Pictures sit in one row per part: **96 px**, 8 px gaps, 5 per row at most (5 × 96 + 4 × 8 = 512 inside 536); a half (216 tall) holds **two rows** of up to 5 (2 × 96 + 8 = 200), so halves go up to 10 per part. The left rail (24 px wide) holds the **turn-pointer** (a coral chevron beside the part that receives the next card) and the **wall button** (two 44 × 44 buttons stacked, drawn as a wall with an up / down arrow — no words).
- **The side column** (120 px, 64 px right of the tray so drawers can slide out into the gap): the **fraction card** (120 × 150, stacked numerals 44 px, bar 4 px), the **answer box** (120 × 72, coral dashed until filled, digits 40 px), then the shell's Check.
- **The digit strip** under the tray: one row 0–9, keys 58 × 56, 6 px gaps (634 px), the shell backspace at its end.
- Vertical budget: task 56 + shoe 110 + tray 432 + strip 56 + gaps 40 = **694 px**.

**At 360 px (stacked):** task 52 · shoe strip 328 × 72 (pictures 64 px, overlapping) · one row holding the fraction card (72 × 84, numerals 30 px) and the answer box (96 × 64) · the tray 328 × 272 (four parts of 68; pictures **64 px**, 5 per row = 5 × 64 + 4 × 2 = 328; a half is 136 tall = two rows of 64 + 8, the pull-tab overlapping the drawer front; drawers "pull out" by rising 10 px and taking a coral edge — no room to slide right) · digit strip 2 rows × 5 keys (62 × 48) = 104 · Check 48. Budget: header 56 + 52 + 72 + 84 + 272 + 104 + 48 + gaps 48 = **736 ≤ 740**.
**At 320 px:** pictures 56 px (5 × 56 + 4 × 2 = 288), parts 60 tall (tray 240; a half 120 = two rows of 56 + 8), the card and answer box share one 64 px row, shoe strip 56, keys 54 × 44. Budget 56 + 48 + 56 + 64 + 240 + 96 + 44 + 32 = **636 ≤ 640**.

**Library pictures** (identical instances; all looked at on the contact sheets; never named in a sentence — the picture is the noun): fruits/strawberry, lemon, apple, kiwi, orange, pear · vegetables/tomato, potato · toys/ball, car, boat, rocket, robot · bakery/cupcake, cookie, doughnut, muffin, pretzel. Not used: fruits/cherry (an apple), plum / peach / apricot / mango / persimmon (read as apples or oranges), toys/dice (plural label), toys/crayons (a set).

No words on the apparatus: only the card's numerals and the shoe's numeral tag.

## 5. The hand
- **Walls:** tap up / down → the walls re-space to equal parts in 220 ms with a two-bounce spring and a soft wooden *clack* per wall; 1 to 4 parts. Changing walls after dealing scoops the pictures back into the shoe (300 ms sweep).
- **Deal:** tap the shoe → the next picture flicks out (60 ms lift) and arcs into the next free slot of the part beside the turn-pointer (220 ms), landing with a tiny squash; the pointer hops on (80 ms); the part's note plays. First movement within 60 ms. **Hold** the shoe ≥ 350 ms → it deals one every 140 ms until released or empty.
- **The shoe only deals when the tray has the card's number of parts.** Otherwise it rocks once (120 ms), the card's bottom numeral pulses coral and the rail numbers the current parts 1…k for 900 ms — no miss is counted. (Free play deals into anything.)
- **Pull a drawer:** drag its tab right (up on phones) or tap it → it slides out 56 px in 180 ms with a *tock*; its pictures ride along. Tap again → home. Any drawer may be pulled: all parts hold the same.
- **Type:** digit keys fill the answer box (2 digits max); backspace deletes.
- **Undo:** everything — walls re-space (the deal scoops back), drawers slide home, digits delete.
- **Keyboard:** Tab → wall button → shoe → drawers → digit strip → Check; Space / Enter act; ↑ / ↓ change the walls; digits type directly.

## 6. The rounds
**One round** = set the walls to b, deal N, pull a drawers, type a/b of N.
**Rules (measured by `work-34/m268.js`, re-measured and widened by the critic in `work-c34/c268.js` + `c268b.js`):** N is a multiple of b; per part 2–5 in thirds and fourths (one row), 4–10 in halves (two rows); **the answer never equals the denominator, the numerator, the total, N − b, N − a ("take the top number away"), a × b, or one part when a > 1** — each of those shortcut bots scores **0/9 in every table**. The bots that still score are mathematically true readings, not shortcuts: "one part" on unit fractions and "N ÷ 2" on halves (that IS the answer), "N − one part" on several-parts rounds (3/4 = the whole minus one fourth), "N ÷ 2" on 2/4 rounds (2/4 = 1/2). One weak bot is left at a third: "add the top and bottom numbers" (1/3 of 12 = 4 = 1 + 3, 1/4 of 20 = 5) scores 3/9 in thirds and fourths and ≤ 2/9 elsewhere — those set sizes are the only ones with 4 and 5 per part, and dropping them would leave each table with two set sizes. A different picture every round; the same N never twice in a row after the reshuffle.

| Fraction (one part) | Rounds (fraction · N → answer · picture) |
|---|---|
| halves | 1/2·8→4 strawberry · 1/2·10→5 ball · 1/2·12→6 cupcake · 1/2·14→7 car · 1/2·16→8 lemon · 1/2·18→9 robot · 1/2·20→10 doughnut · 1/2·8→4 tomato · 1/2·12→6 boat |
| thirds | 1/3·6→2 apple · 1/3·12→4 cookie · 1/3·15→5 kiwi · 1/3·6→2 rocket · 1/3·12→4 pear · 1/3·15→5 muffin · 1/3·6→2 potato · 1/3·12→4 orange · 1/3·15→5 pretzel |
| fourths | 1/4·8→2 strawberry · 1/4·12→3 car · 1/4·20→5 cupcake · 1/4·8→2 lemon · 1/4·12→3 ball · 1/4·20→5 apple · 1/4·8→2 robot · 1/4·12→3 doughnut · 1/4·20→5 tomato |
| mixed | 1/2·8→4 kiwi · 1/3·15→5 boat · 1/4·12→3 cookie · 1/2·10→5 orange · 1/3·6→2 ball · 1/4·20→5 pear · 1/2·14→7 muffin · 1/3·12→4 rocket · 1/4·8→2 potato |

N = 4, 9 and 16 are deliberately absent for unit fractions: there one part equals the denominator (1/2 of 4, 1/3 of 9, 1/4 of 16), so the misconception would be marked right. Halves start at 8 (critic): 1/2 of 6 = 3 = 1 + 2, and halves have room for two rows, so 1/2 of 12…20 (6–10 per part) give the setting seven different set sizes instead of three.

| More parts | Rounds |
|---|---|
| thirds | 2/3·12→8 apple · 2/3·15→10 ball · 2/3·12→8 cupcake · 2/3·15→10 kiwi · 2/3·12→8 car · 2/3·15→10 cookie · 2/3·12→8 pear · 2/3·15→10 robot · 2/3·12→8 doughnut (the two set sizes alternate) |
| fourths | 3/4·8→6 lemon · 3/4·20→15 boat · 2/4·20→10 strawberry · 2/4·12→6 muffin · 3/4·8→6 tomato · 3/4·20→15 rocket · 2/4·20→10 orange · 2/4·12→6 potato · 3/4·8→6 pretzel |
| mixed | 2/3·12→8 strawberry · 3/4·8→6 car · 2/4·20→10 kiwi · 2/3·15→10 cookie · 3/4·20→15 ball · 2/4·12→6 pear · 2/3·12→8 robot · 3/4·8→6 lemon · 2/3·15→10 cupcake |

Excluded on measurement: 2/3·9 (answer 6 = a × b = N − b), 3/4·16 (12 = a × b = N − b), 2/4·8 (4 = the denominator), 2/4·16 (8 = a × b), and (critic) **2/3·6 → 4 and 3/4·12 → 9, where the answer is N − a** — "two thirds of 6: take the 2 away" and "three quarters of 12: take the 3 away" were marked right (designer's tables: 3/9 and 2/9). With 2–5 per part the honest 2/3 sets are only 12 and 15, so the thirds table alternates them; the variety comes from the twelve pictures. "2/4 of 12 = 6 = 2 + 4" stays twice in fourths (a+b 2/9) because without it N = 20 would fill six of nine rounds and could not be kept apart.
- **Answer position:** typed — there is no position. The drawer pulled is free and every part holds the same.
- **Order:** order-only reshuffle per pass, never the same order twice, never the same N twice in a row.

## 7. Check, the misses, the success
- **Check before dealing** → bubble "Deal the pile into the tray first." · **dealt, no drawer out** → "Pull out the parts the top number tells." · **no digits** → "How many are in the parts you pulled out?" (none of these is a miss).
- **Wrong number of drawers out** (a miss): the card's top numeral pulses and the out drawers number themselves 1…m on their fronts — **"The top number says how many parts to pull out."**
- **Miss 1** (drawers right, number wrong) — the apparatus shows the *kind* of mistake:
  - typed **b**: the rail numbers the parts 1…b with a pop each (150 ms apart); the out drawer glows — **"{b} is how many equal parts there are. How many are inside the part you pulled out?"**
  - typed **N**: the parts still in the tray dim to 40 % — **"Count only the parts you pulled out."**
  - typed one part when a > 1: each out drawer gets its own ring in turn — **"You pulled out {a} parts. Count what is in all of them."**
  - anything else: every picture in the out drawers gets a soft ring, left to right, 200 ms apart (no numbers) — **"Count what is in the parts you pulled out."**
- **Miss 2:** the pictures in the out drawers number themselves 1, 2, 3… (250 ms each); the other parts stay dimmed — **"Count along with the numbers."**
- A new move (a key, a drawer) takes the help away until the next Check.
- **Success:** the out drawers lift off and float up beside the card (400 ms), the card turns over (250 ms), the drawers glide home and the whole tray glows while its chord rings once. Bubble: **"{frac} of {N} is {answer}. {b} equal parts, {a} pulled out."**

## 8. Settings
1. **Fraction:** halves · thirds · fourths · mixed — changes the parts the round needs and the card at rest.
2. **Take:** one part · more parts (2/3, 3/4, 2/4 — the Fence Pens). With **more parts** the halves chip greys out (2/2 is the whole set, not a worksheet task) and the card's top numeral at rest shows 2 or 3.

## 9. Words (EN source)
- title **The Dealing Tray** · instruction **"Make equal parts, deal the pile, then pull out the parts the fraction asks for."**
- task **"Make {b} equal parts. Deal the {N}. How many is {frac}?"**
- hints as in §7, plus the shoe's refusal bubble (no miss): **"The tray needs {b} parts first."**
- success **"{frac} of {N} is {answer}. {b} equal parts, {a} pulled out."**
- settings **Fraction** — halves / thirds / fourths / mixed · **Take** — one part / more parts.
- **Locale traps:**
  - The fraction is always drawn as stacked numerals; no fraction words (*half / third / quarter*) are needed on the stage, only in the settings chips.
  - "part" = de *Teil*, fr *part*, es / it / pt *parte*, nl *deel*, sv / da / no *del*, fi *osa* — the school word for equal parts in each locale.
  - **fi:** "{frac} of {N}" needs the elative on the numeral, and the ending follows the vowel harmony of the spoken number (12:sta, 6:sta, 8:sta but 15:stä, 7:stä, 9:stä) — author the success sentence with a per-N suffix table, or use the case-free frame "{N} jaetaan {b} yhtä suureen osaan. {a} osaa on {answer}."
  - **de** "Verteile die {N}." — no noun, so no gender. **fr** "{frac} de {N}, c'est {answer}." — numerals do not elide ("de 8").
  - **Plurals:** no noun ever follows a number in a sentence, so no locale needs plural agreement. Numerals only — no number words.

## 10. Sound off, access, phones
- Legible with the sound off: the parts are walls you see, the deal is motion, the chord is a bonus; TTS reads the task line where available.
- aria: shoe "Deal one — {left} left"; wall button "More parts, now {k}" / "Fewer parts, now {k}"; drawer "Part {i}, pulled out" / "pushed in"; answer box "Your number".
- Taps: wall buttons 44, shoe ≥ 72 tall, pull-tabs 44, keys ≥ 48 × 44.
- Pictures 96 px at 704, 64 px at 360 (56 px only at 320, below the 360 floor's reach).
- Check above the fold: 736 at 360 × 740, 636 at 320 × 640.

## 11. Distinct from
- **Lids** (premium tool: lids hide equal amounts on a table) — nothing is hidden; the parts stay open and the fraction is *pulled out*.
- **#18 Friendship Bridge** (fair share between two plates) — two plates, no fraction, no walls, no drawers.
- **Rows 107 Fair Mobile, 171 Dough Press, 172 Rain Table, new 302 Cutting Board** — area fractions of a shape; this is the set model and its mechanism is the deal.
- **Row 193 The Cake Carousel** (3.OA.A.2: one crank turn puts one cookie on every plate at once — division as sharing) — the carousel's turn is the division and the answer is the plate count; here one tap deals ONE card to the pointer's part, the number of parts is *built* with walls before anything is dealt, and the answer is what a chosen number of drawers holds — the fraction of a set, not a quotient.
- **New 299 Leftover Dealer** (planned: a swipe sends one picture to every box, the rest to a cup) — division with remainder; here the denominator is *built* (walls), sets always share exactly, and the numerator is *taken* (drawers).
- **Row 137 The Chimney Roof** (this batch) — pairs in a gravity tower, no dealing.

## 12. Build plan
- **Core state:** `{ b, a, N, picture, walls, dealt:[…], pointer, pileLeft, out:Set, typed }`. Functions: `setWalls(k)` (scoops the deal back), `dealOne()` (refused unless `walls === b` outside free play; fills `pointer`, then `pointer = (pointer + 1) % walls`), `pull(i)`, `push(i)`, `type(d)`, `check()` → `{ ok, kind: 'notDealt' | 'noDrawer' | 'empty' | 'drawers' | 'denominator' | 'total' | 'onePart' | 'other' }`.
- **The gate's own ground truth (`verify-deal-tray-core.js`, its own oracle):** for every table row N % b === 0, 2 ≤ N/b ≤ 5, answer ∉ {b, a, N, N − b, N − a, a·b} and ≠ N/b when a > 1; per part 2–5 when b ≥ 3 and 4–10 when b = 2; for random tap sequences the part counts differ by ≤ 1 during the deal and are equal when the shoe is empty; dealing is refused when walls ≠ b; `check` is right only for drawers === a and typed === a·N/b; neighbouring rounds never share N after the reshuffle; no halves in More parts; every picture file exists on disk and no B&W theme is referenced.
- **Mutations (one per rule):** deal into a random part · uneven wall spacing · accept typed b · accept typed N · accept one part when a > 1 · grade without the drawers · allow 6 per part in thirds / fourths · restore 1/3 of 9 · restore 2/3 of 6 (answer = N − a) · restore 1/2 of 6 · put the halves' second row outside its part · halves in More parts · deal with the wrong walls · drop the no-repeat-N rule.
- **Local test:** real pointer drags on the pull-tabs at 320·360·412·704·768·1024·1366, every round, 11 locales; assert no picture box under 64 px at 360 / 96 px at 704, the five-picture row fits its part, Check above the fold.
- **Pictures verified on contact sheets:** fruits, toys, bakery, vegetables (every noun in §4 reads as itself at 64 px).
- **Risks:** the 704 page is ~700 px tall (fine for the auto-sizing iframe; the hierarchy audit measures it). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — dealing like a card dealer, springy walls, drawers to pull, and a chord that plays when the deal is fair.
2. **Would a teacher put it on the board?** Yes — it is the classroom routine for a fraction of a set (make b groups by dealing, take a of them), and the denominator-as-answer error cannot survive it.
3. **Would a parent trust it?** Calm, library pictures only, numerals only on the apparatus, no timer, works on a phone.
4. **The invention:** the bottom number is walls you put in, the shoe deals so the parts are always equal, and the top number is how many drawers you pull out.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-solved every table with my own scripts (`work-c34/c268*.js`) and widened the bot set: the designer's tables let **"take the top number away" (N − a)** score — 2/3 of 6 = 4 = 6 − 2 (3/9 of the thirds table) and 3/4 of 12 = 9 = 12 − 3 (2/9 of fourths). Both set sizes are out; the several-parts tables are rebuilt (thirds alternate 12 and 15; fourths 3/4·8, 3/4·20, 2/4·20, 2/4·12). Denominator-as-answer is right **0** times in all seven tables, and so are a, N, N − b, N − a and a × b.
- Halves had only three set sizes (6, 8, 10) and 1/2 of 6 = 3 = 1 + 2. A half has room for two rows of pictures at every width (216 / 136 / 120 px tall), so halves now run 1/2 of 8 … 20 (seven set sizes, answers 4–10); the layout lines and the gate rule (4–10 per half, 2–5 per third/fourth) say so.
- The one weak bot left (add top + bottom, 3/9 in the unit thirds/fourths tables) is named and justified in §6 instead of hidden.
- §11 adds Row 193 The Cake Carousel (the other round-robin dealer) with the difference stated.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
