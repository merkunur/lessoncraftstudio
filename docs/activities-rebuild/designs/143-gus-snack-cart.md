# Row 143 — Gus's Snack Cart → THE ROUND-TRIP CART (2.NBT.B.5)

## 0. Identity
- **id** `gus-snack-cart.within-100.2-nbt-b-5` (frozen) · grade 2 · CCSS 2.NBT.B.5 · strand Number & Operations in Base Ten · own files `round-trip-core.js`, `round-trip-activity.js`, `round-trip-activity.html`; the manifest row stays in `gus-snack-cart-activities.json` (tool → `round-trip-activity`). Page title and intro frozen en..nl; sv/da/no/fi get new slug, title and intro at build (grade 2).
- **Worksheets covered:** G2-251 / G2-255 / G2-256 / G2-259 (the equation card turns into column form — §5: the same two-digit sums written in columns; the full written method with the carried and borrowed digit is #267 One-Digit Boxes, and the three-digit column sheets G2-257 / G2-258 are carried by #267 and rows 145–147, not by this cart), G2-393 Math Maze within 100 (the **route** setting is its running-total road), G3-389 Round, then Estimate the Sum (the **round first** setting). G2-313 Number Walls is carried by row 144 (wall setting), the full written algorithm by #267 and row 147.
- **Old activity:** a hand-drawn gopher, a story sentence, a number sentence with "?", the shell keypad. **Kept:** the eight stories and their numbers (45−8, 23+15, 60−25, 34+9, 70−40, 27+36, 88−16, 19+47), the verbs (sold / picked / found / gave away / packed / added), typing the answer, the band order. **Dropped:** the drawn gopher (no gopher exists in the library and rule 5 forbids drawing one — Gus lives on in the words: "Gus's cart"); the items no picture can show (nuts, seeds, plums: `fruits/plum` and `at-the-supermarket/plum` are apples — see PICTURE-RULINGS).

## 1. The pitch
"Type where the cart ends up — then it drives your answer back the other way, and only the right answer brings it home to the number it started from."

## 2. Why a child will want it again
- **The cart is a real vehicle on a real road.** Gus's cart (library `at-the-supermarket/cart`, the red trolley) rolls on a stock road ruled 0–100. It squeaks, its pin carries a live number chip, and it clacks every time a wheel crosses a ten post. Between rounds the child can push it anywhere — free play on a number road that always says where you are.
- **The return trip is suspense.** After Check the cart drives out to the child's number, does a little three-point turn (its picture flips, 150 ms), and comes back by the story's own hops. Will it reach the flag? A child watches the last few ticks with held breath.
- **Home is a celebration you earned.** When the trip closes, the out-ribbon (coral, under the road) and the back-ribbon (teal, over the road) join at both ends into one loop, the home flag waves, and the cart bumps the flag post with a soft "honk-honk" (sound optional). Each solved story leaves its loop as a faint stripe on the road, so a finished pass is a road painted with round trips.
- **A wrong answer is a funny mishap, never a scold.** The cart overshoots the flag and coasts into the grass, or stops short and its pin chip reads the gap. The child sees exactly how far off they were.

## 3. The skill and the misconception
- **Skill (2.NBT.B.5):** add and subtract within 100 fluently, using place value and **the relationship between addition and subtraction**. Here the relationship is not a sentence on a poster — it is the check: whatever the story did, its inverse must bring the stock back.
- **Misconception 1 — the lost ten / the extra ten** (45 − 8 → 47; 27 + 36 → 53): the return trip from 47 by +8 lands on 55, ten past the flag; from 53 by −36 lands on 17, ten short. **Pushback:** the gap between cart and flag is exactly one ten-post span — a tens slip is a gap you can see as one post.
- **Misconception 2 — the wrong operation** (sold 8 but added: 53): the return from 53 by +8 runs to 61 — sixteen past home, twice the story. **Pushback:** a doubled gap.
- **Misconception 3 — "the answer just has to be near"**: estimation (round-first setting) gives the child a target zone; the exact answer must both close the loop and sit inside the "about" bracket.
- The material pushes back by driving, never by a message: the bubble only names what the road already shows.

## 4. The stage
**At 704 px (stacked layout (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704): the stage is ≈ 648 px wide; the road panel spans it on top, the story/equation row sits under it; the shell's keypad, bubble and Check sit under the stage):**
- **Task line** (≤ 24 px, 2 lines max): see §9.
- **Story card** (left, 320 × 112): the round's snack picture 96 × 96 (library, see the table in §6) + the story sentence in 20 px Nunito, two lines max. The picture is a label for what Gus sells, one instance — never a pile to count.
- **Equation card** (right, 300 × 112): `45 − 8 = ▢` in 44 px Baloo 2; the box 72 × 60. A small turn tab in its corner (32 px icon, 44 px hit area) turns the card into column form (§5).
- **The stock road** (full width, 660 × 170): a cream road strip 640 px long, 0 at the left end, 100 at the right (6.4 px per one). Ten posts (28 px tall, 2.5 px ink) with numerals 0 … 100 in 18 px under them; a 6 px tick for every one. Road colour bands alternate faintly every ten so tens read as blocks. The home flag (drawn pennant on a post, teal, 40 px) stands at the story's start number. The cart picture is 96 × 96 riding above the road on a drawn coral pin (triangle, 14 px) whose tip marks its exact number; the pin carries a number chip (white pill, 18 px Baloo). Out-ribbon (coral, 6 px, under the road) and back-ribbon (teal, 6 px, over the road) draw during the trip; tens hops draw as arcs 64 px wide, 22 px tall; ones are tick-steps (the pin advances one tick every 90 ms, each tick briefly darkening).
- **Round-first extras** (setting on): an "about" box 56 × 52 left of the answer box, headed by a drawn wavy-equals glyph (SVG path, never the ≈ codepoint — it is outside the shipped font ranges); on the road, each story number appears as a tag on its own position during the rounding step.
- **Route extras** (setting on): the equation card becomes a route card `24 → +30 ▢ → −6 ▢ → +15 ▢` (three boxes 64 × 56) and the road carries three small sign-posts once each leg is placed.
- **Feedback bubble** under the road (18 px), never over it.
- **No words on the apparatus:** the road carries only numerals; the story sentence is the content text.

**At 360 px (stacked):** task line → story card 328 × 84 (picture 64 × 64 + sentence 16 px, two lines) → equation card 328 × 72 (36 px digits) → road 328 × 130 (road 312 px, 3.12 px per one; posts every ten with numerals 14 px, only 0/20/40/60/80/100 printed below 380 px wide, the other five posts drawn but unlabelled; ticks 4 px; cart picture 64 × 64; pin chip 16 px) → bubble → shell keypad. Height: 44 + 84 + 72 + 130 + 30 + keypad ≈ 560 + header/Check → Check above the 740 fold; at 320 × 640 the story card drops to one line + picture 64 and the road to 120 → fits.

## 5. The hand
- **Type:** the shell keypad writes into the open box (≤ 100 ms echo, a soft key tick).
- **Turn the card (free, any time):** tap the turn tab → the card flips over its vertical axis (260 ms) into column form: tens under tens, ones under ones, the answer box split into two digit boxes. The typed answer travels with it. Tap again to flip back. Nothing about the task changes — the same answer, two notations (this is how G2-25x is carried).
- **Check → the round trip:**
  1. Out (≈ 700 ms): the cart leaves the home flag and drives to the typed number; the out-ribbon unrolls behind it. In route mode it drives only the first leg.
  2. Turn (150 ms): the cart picture mirrors.
  3. Back: the inverse of the story, in hops — tens first as arcs (240 ms each, a wooden clack), then ones as tick-steps (90 ms each, a high tick). Sold 8 → back +8 (eight steps right). Packed 36 more → back −36 (three arcs left, six steps left). A small written line under the road builds as it goes: `37 + 8 → 45`.
  4. Arrive: at the flag → the ribbons close into a loop (300 ms), flag waves, success (§7). Not at the flag → the cart stops; a coral bracket spans cart-to-flag with the gap numeral in a chip (e.g. `10`).
- **During a round the cart is parked on the home flag and cannot be dragged** (a press on it gives a soft brake squeak) — otherwise the ruled road would read the answer off for the child; it only moves on Check, and the child drives it only in miss 2's look-back and in free play.
- **Free play (between rounds and after a celebration):** drag the cart anywhere on the road; the pin snaps to whole numbers; the chip shows the number; a clack at every ten post. A long-press on the road drops the cart there.
- **Round first (setting):** before the answer box opens, the first story number's tag stands on the road at its position with its two neighbouring ten posts glowing. Between the tag and each post, the ticks light up as two runs (38: two ticks to 40, eight ticks to 30). The child taps the nearer post → the tag slides to it (220 ms) and turns into a rounded tag (40). A tap on the farther post: the tag sets off, the longer run of lit ticks flashes, and it slides back (no miss — the road showed why). On a 5 both runs are five ticks; the right-hand post carries a small up-chevron (the school rule: five rounds up — the same in all eleven locales). Then the second number. Then the child types the rounded total in the "about" box, then the exact answer.
- **Undo:** ⌫ clears a digit; a rounded tag can be tapped back to its exact place until the about box is filled.
- **Keyboard:** Tab → turn tab → about box → answer box(es) → Check; arrow keys move the cart in free play (Shift+arrow = a ten).

## 6. The rounds
One round = one story (or one route). The story names the snack, shows its picture, and gives the start and the change. Every count is ≥ 1; every result 25–99.

**One stop (default)** — the old eight, items re-pictured:
| # | story (EN) | sentence | answer | regroup | picture |
|---|---|---|---|---|---|
| 1 | Gus had 45 cookies. He sold 8. | 45 − 8 | 37 | borrow | `bakery/cookie` |
| 2 | Gus had 23 raspberries. He picked 15 more. | 23 + 15 | 38 | none | `at-the-supermarket/raspberry` |
| 3 | Gus had 60 bagels. He sold 25. | 60 − 25 | 35 | borrow (0 ones) | `bakery/bagel` |
| 4 | Gus had 34 acorns. He found 9 more. | 34 + 9 | 43 | carry | `miscellaneous/acorn` |
| 5 | Gus had 70 carrots. He gave away 40. | 70 − 40 | 30 | none | `at-the-supermarket/carrot` |
| 6 | Gus had 27 apples. He packed 36 more. | 27 + 36 | 63 | carry | `at-the-supermarket/apple` |
| 7 | Gus had 88 pretzels. He sold 16. | 88 − 16 | 72 | none | `bakery/pretzel` |
| 8 | Gus had 19 cherries. He added 47 more. | 19 + 47 | 66 | carry | `at-the-supermarket/cherry` |

4 add / 4 take away; 5 regroup / 3 not; answers all different. Bands kept (1: #1 #2 #5; 2: #3 #4 #7; 3: #6 #8) — the shuffle runs inside bands.

**A route of three stops** (G2-393; the running total, each sign a story step):
| # | start | signs | stock after each sign |
|---|---|---|---|
| 1 | 24 | +30, −6, +15 | 54 · 48 · 63 |
| 2 | 58 | −20, +7, −19 | 38 · 45 · 26 |
| 3 | 17 | +25, −9, +40 | 42 · 33 · 73 |
| 4 | 66 | −8, +16, −30 | 58 · 74 · 44 |
| 5 | 39 | +12, −24, +35 | 51 · 27 · 62 |
| 6 | 81 | −40, +9, −13 | 41 · 50 · 37 |
| 7 | 45 | +8, −28, +50 | 53 · 25 · 75 |
| 8 | 92 | −35, +6, −18 | 57 · 63 · 45 |
Every leg stays within 1–99; every route mixes + and −; 18 of 24 legs need a carry or a borrow (the six that do not are whole-ten steps such as +30, −40); finals all different. The route card shows the snack picture of the round (cycled from the eight above).

**Round first** (G3-389; addition only, like the worksheet):
| # | sum | rounded | about | exact | rounding (first, second) |
|---|---|---|---|---|---|
| 1 | 38 + 21 | 40 + 20 | 60 | 59 | up, down |
| 2 | 43 + 36 | 40 + 40 | 80 | 79 | down, up |
| 3 | 25 + 42 | 30 + 40 | 70 | 67 | up (a 5), down |
| 4 | 17 + 34 | 20 + 30 | 50 | 51 | up, down |
| 5 | 61 + 28 | 60 + 30 | 90 | 89 | down, up |
| 6 | 46 + 45 | 50 + 50 | 100 | 91 | up, up (a 5) |
| 7 | 33 + 12 | 30 + 10 | 40 | 45 | down, down |
| 8 | 54 + 19 | 50 + 20 | 70 | 73 | down, up |
Stories for these: "Gus had 38 … He got 21 more." (same snack pictures, cycled).

- **Answer position:** answers are typed — nothing to guess by place. The only choice is the rounding tap (lower post = left, upper post = right). Measured over the 16 roundings: 8 up / 8 down; first number 4 up / 4 down; second number 4 / 4. An "always tap right" bot scores 8/16, an "always left" bot 8/16. A "sign-blind" bot (always adds) solves 4 of the 8 one-stop rounds and 0 routes; a bot that types the start solves 0.
- **Second-try note (honest):** after a miss the gap chip lets a child correct by subtracting the gap — itself a within-100 calculation, so it is allowed; the gate records it.
- **Order:** order-only reshuffle per pass inside the bands, never the same order twice.

## 7. Check, the misses, the success
- **Check with nothing typed** → bubble "Type how many Gus has now." (no miss). Round first: with tags not yet rounded → the first tag's two posts pulse: "Send each number to its nearer ten first." (no miss).
- **Miss 1** → the round trip itself is the showing: the cart stops off the flag, the coral gap bracket and chip appear, and the back-ribbon's last hop blinks. EN **"The cart came back to {r}, not home to {a}."**
- **Miss 2** → the road re-drives the story *forward* from the flag in hops (tens arcs, then ones steps), counting nothing aloud, and parks a ghost cart (40 % opacity) where the story really ends, its chip showing "?". EN **"Watch the story hops from {a}: {t} tens and {o} ones."** (For `+9`: "0 tens and 9 ones" is never said — the template drops an empty part: "9 ones".)
- A new keypad entry clears the bracket and ghost until the next Check.
- **Route mode:** each leg is its own round trip, in order; the first leg that does not close shows the gap; later legs wait, grey.
- **Round first:** a wrong about-box value never costs a miss on its own; on Check, the about box shows the two rounded tags sliding together into their sum; if it differs, the about digits wobble and the correct about value ghosts in pencil (the about part is a step, the exact answer is the round).
- **Success** → the loop closes, the flag waves, the cart honks and bumps the post; the round's loop stays as a faint stripe on the road. EN **"{a} take away {b} is {c} — and {c} and {b} bring it back to {a}!"** · add: **"{a} and {b} more is {c} — take {b} away and you are back at {a}!"** · route: **"{a}, {s1}, {s2}, {s3} — and the cart drove all the way home!"** · round first adds **"{c} is close to {about}: a sensible answer."**

## 8. Settings
1. **Trips:** one stop (default) / a route of three stops — at rest the equation card becomes the three-box route card.
2. **Round first:** off (default) / on — at rest the about box and the rounding tags appear (one-stop only; with the route setting it is greyed and says why in its own label).

## 9. Words (EN source)
- in-tool title: **"Gus's Snack Cart"** (page title frozen)
- instruction: **"Type how many Gus has now. Then watch the cart try to drive home."** · route: **"Write Gus's number after every sign. The cart drives each one back."** · round first: **"Round both numbers to the nearest ten and add them. Then find the exact answer."**
- prompts: `{a} + {b} = ?` · `{a} − {b} = ?`
- stories: `Gus had {a} {itemPl}. He {verb} {b}.` / `… He {verb} {b} more.` — authored as **whole sentences per locale and per round** (never assembled from parts in the other ten).
- hints: hintStart **"Type how many Gus has now."** · hintRound **"Send each number to its nearer ten first."** · hintGap **"The cart came back to {r}, not home to {a}."** · hintHops **"Watch the story hops from {a}: {t} tens and {o} ones."**
- celebrations as §7.
- settings: **"Trips"**: "one stop" / "a route of three stops" · **"Round first"**: "off" / "on" · aria for the turn tab: **"Write it in columns"** / **"Write it in a line"**.
- **Locale traps:**
  - (a) **The stories must be rewritten in all seven existing locales:** the live es/it/pt/nl lines name things no picture shows (es *uvas, higos, piñones*; it *pinoli, castagne, fichi, mirtilli*) — every story names the picture of its round, in the picture's own label word.
  - (b) **Plural and agreement with a numeral:** fi uses the partitive after a numeral (*45 keksiä*); it/fr/es/pt participles agree in gender (it *ne ha vendute 8* for *ciambelle* f., *venduti* for *biscotti* m.; fr *il en a vendu 8* — the clitic *en* is required); de *noch 15* for "more"; nl *er … bij*. The numbers are always numerals, never words.
  - (c) **Rounding words:** de *runden auf Zehner*, fr *arrondir à la dizaine*, es-MX *redondear a la decena*, pt *arredondar para a dezena*, it *arrotondare alla decina*, nl *afronden op tientallen*, sv *avrunda till närmaste tiotal*, da *runde af til nærmeste tier*, no *runde av til nærmeste tier*, fi *pyöristää lähimpään kymmeneen*. Five rounds up in every school system of the eleven — the up-chevron is safe.
  - (d) **Column form** follows the locale layout decided in row 96 §9: minus sign U+2212; the column card has no carry box (this activity never asks for written carries — that is #267).
  - (e) **"Gus" stays Gus in every locale** — and must never be called a squirrel (the live es/pt/nl aria labels call the gopher *ardilla / esquilo / eekhoorn*). With no animal on screen, no species word is needed at all.
  - (f) sv/da/no/fi stories are new: *Gus hade 45 kakor. Han sålde 8.* style — whole sentences, past tense, authored by the native reviewer.

## 10. Sound off, access, phones
- Legible with the sound off: the gap bracket, chip, ribbons and the written line under the road say everything; clacks and honks are bonus. TTS reads the story where available.
- Keyboard path in §5. aria: road `aria-label="stock road from 0 to 100, cart at 37, home flag at 45"`; after a trip `"the cart came back to 55, home is 45, 10 apart"`.
- Taps: turn tab 44 px; keypad keys ≥ 44 px; cart drag target = the 96 / 64 px picture plus pin; posts in rounding are 44 px wide hit areas.
- Pictures: snack 96 px at 704 / 64 px at 360; cart 96 / 64 px. Check above the 360 × 740 and 320 × 640 folds (§4).
- Reduced motion: the trip runs as three jumps (out, back-tens, back-ones) with the ribbons drawn at once.

## 11. Distinct from
- **Row 157 Hopper's Spring (2.MD.B.6):** predict a landing pad, then the frog hops there. Here the child's answer is the *outward* claim and the apparatus tests it by the **inverse** trip — the check is subtraction-undoes-addition, not landing.
- **open-number-line (tool):** the child draws jumps freely, nothing is checked. Here the road is ruled and the return trip is fixed by the story.
- **Row 86 Sunken Stones / Row 85 Ten Plug:** bridging through ten within 20. This is within 100 with no forced stop.
- **Row 96 Roll-Up Mats / #267 One-Digit Box:** the written algorithm. Here the column card is only a second notation; the instrument is the road.
- **rounding-hill / landing-strip (tools):** rounding as the subject. Here rounding is one step that produces an estimate the exact answer must agree with.
- **Row 141 Flip Pads:** the number's digits flip. Nothing flips here.

## 12. Build plan
- **Core state:** `{ mode:'one'|'route'|'round', round, typed:{about, answer, legs:[]}, rounded:[null,null], cart:{pos}, trip:null|{legs:[{from, claim, back, closes, gap}]} }`.
- **Functions:** `inverse(step)` → `-step` · `tripFor(start, step, claim)` → `{back: claim + inverse(step), closes, gap: back − start}` · `hops(n)` → `{tens, ones, dir}` · `nearerTen(n)` (half up) · `roundTap(i, post)` → accepted only if `post === nearerTen(n)` · `aboutValue()` · `check()` → first non-closing leg or ok · `nextTask` with banded order-only reshuffle.
- **Gate's own truth (`verify-round-trip-core.js`):** from-scratch arithmetic: every one-stop answer, every route leg, every rounded value (half up), every about value is recomputed; `tripFor(a, s, a+s)` closes for every round and `tripFor(a, s, c)` has `gap = c − (a+s)` for 200 random wrong claims; hops decompose correctly (`tens*10+ones = |step|`); route legs stay in 1–99; answers distinct; rounding up/down tally = 8/8 and per-position 4/4; every story's picture key exists in its theme JSON and is not a refused noun (plum, fruits/cherry, at-the-supermarket/pretzels); every celebration's numbers equal the round's numbers.
- **Mutations (one per rule):** back trip uses the same sign as the story (no inverse) · back trip uses the claim's distance instead of the story's · gap computed as |gap| (direction lost) · route checks only the final leg · rounding half down · a farther-post tap accepted · about box counted as a miss · equation card flip changes the stored answer · hops drawn ones-first · same order twice · celebration uses previous round's numbers · a pictured item with a refused noun.
- **Pictures to verify (seen on the contact sheets):** `at-the-supermarket/cart` (red trolley), `bakery/cookie`, `bakery/bagel`, `bakery/pretzel`, `miscellaneous/acorn`, `at-the-supermarket/raspberry`, `carrot`, `apple`, `cherry` (the supermarket cherry — `fruits/cherry` is an apple). `at-the-supermarket/pretzels` is NOT used (one pretzel labelled with the plural in the singular slot; ruling appended).
- **Risks:** 3.12 px per one on phones — ones are tick-steps of the pin, never arcs; the chip carries the exact number so nothing depends on seeing a 3 px tick. Rewriting seven locales' stories (trap a) is content work for the native reviewer. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a cart to push, a suspenseful drive home, a road that fills with loops.
2. **Would a teacher put it on the board?** Yes — "check your subtraction by adding" is the lesson every Grade 2 teacher repeats, and here it is the machine; the gap shows a tens slip as one post. Routes are the maze sheet, round-first is the estimate sheet.
3. **Would a parent trust it?** Calm, library pictures only, numerals on the road, no timer or score, the school's own rounding rule.
4. **The invention in one sentence:** the cart drives the child's answer back by the story's inverse, so only a right answer brings it home to where it started.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Every table re-solved by an independent script (`work-c33/verify.js`): the 8 one-stop answers (37 38 35 43 30 63 72 66, distinct; 5 regroup / 3 not, as labelled), all 24 route legs (inside 1–99; 18 regroup, the 6 that do not are the whole-ten legs; finals 63 26 73 44 62 37 75 45 distinct), the 8 round-first rows (half-up rounding; first number 4 up / 4 down, second 4 / 4 — the always-left and always-right bots both score 8/16). All claims held.
- **The cart is now locked on its flag during a round.** The old text let free play run at any time — a child could drag the cart 8 ticks from 45 and read 37 off the ruled road, which empties the round trip of its point. It moves only on Check (and in miss 2 / free play).
- **Coverage stated honestly:** the turn-card shows two-digit sums in columns (G2-251/255/256/259); the three-digit column sheets G2-257/258 and the written carry/borrow are carried by #267 and rows 145–147, not claimed here.
- Pictures re-checked on the contact sheets: `at-the-supermarket/cart` is a red trolley facing right (it mirrors on the turn), bakery cookie/bagel/pretzel, supermarket raspberry/carrot/apple/cherry all read true; no gopher is labelled in the library (it is on the forest contact sheet but absent from `forest-creatures.json`), so Gus stays a name only.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
