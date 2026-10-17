# Row 166 — Make Change with Coins → THE CHANGE BOX (2.MD.C.8)

## 0. Identity
- id `money.make-change.2-md-c-8` (KEPT; slugs/metadata frozen in all 11 locales) · grade 2 · CCSS 2.MD.C.8 (money word problems) · strand Measurement & Data · own files `change-box-core.js`, `change-box-activity.js`, `change-box-activity.html`, `change-box-activities.json` (this row leaves `money-activities.json`; with row 165 also rebuilt, that manifest is emptied to `[]`; 0 lines to `money-core.js` and `lcs-shell.*`).
- page title (frozen): "Make Change with Coins — Money Word Problems (Grade 2)"; intro (frozen) promises: **see what an item costs and what you pay, then tap coins into the tray to give the right change; making change with ¢ and $.** All kept: the child taps coins into the customer's change tray.
- worksheets also covered: **G2-293** How Much Change? → level 1 (the core) · **G2-291** Add Up the Basket and **G2-292** Buying Three Things → level 3 (add the basket, then give change) · **G2-294** Is There Enough Money? and **G2-295** How Much More? → level 2 · **G2-276** Shopping Math, **G2-289** Two Stories, **G2-290** Four Questions → "Mixed shop" runs the three levels' rounds in one pass (one story question per round on a shelf of priced toys). New 270 (Wallet Bar) covers the same shopping sheets with a length model; this row covers them with conservation — two different routes to the same worksheets.
- what the old activity did: a cost and a paid amount, a coin palette labelled "10¢" etc., tap coins into a tray **with a running total** until the total equalled the change. **Kept**: every locale's currency and coins, all eight change problems per locale (en 70/$1, 85/$1, 60/$1, 75/$1, 90/$1, 55/$1, 65/$1, 80/$1; de 80 ct/1 €, 70/1 €, 60/1 €, 1 € 75/2 €, 90 ct/1 € 50, 65/1 €, 3 € 50/4 €, 1 € 30/2 € … every other locale likewise), tap coins into the change tray, any coins that make the change are right. **Changed**: no running total; coins carry a numeral only where the real coin does; es in whole Mexican pesos (orchestrator ruling); the payment is changed into small coins first, so change is something the child takes OUT of the customer's own money (§1); two new levels.
- the critic replaced this row's first invention (a shop scale that "weighs money by its worth") — a balance where a light dime outweighs a heavy nickel is false physics, and level-resting balances are already rows 88 (equal-sign beam), New 209 (bet pan) and New 271 (gram balance).

## 1. The pitch
"The customer's money goes into Pip's change box and comes out as the same money in small coins — Pip keeps exactly the price, so whatever you put in the customer's tray is taken from Pip: give too much and Pip is short, give too little and Pip has too much."

## 2. Why a child will want it again
- **A machine that changes money.** On Pip's counter stands a brass change box with a slot on top and a little chute at the bottom. The customer's payment (a $1 note, a 2 € coin, a 50 kr note …) slides into the slot; the box **rattles and shakes** (600 ms) and pours out the same money in smaller coins onto the counter with a cascade of clinks. The same worth went in and came out — and the pour is fun every time.
- **Sharing out the pile.** The child taps coins from the pile into the **customer's tray** (the change). Everything left on the counter slides to **Pip's dish** at Check. There is nothing else to take from — the customer's money is all there is.
- **The earned show — Pip counts his dish.** At Check Pip's coins hop one by one onto the price tag, counting up toward the price (each hop shows the running amount on Pip's side only). If Pip lands exactly on the price, the tag stamps PAID (a drawn tick stamp, no word), the customer's hand closes over the change, the toy floats into the bag, and Pip (library otter, the same Pip as row 164's stall) claps.
- **Free play**: before a round and after success, the change box takes any coin or note from the side tray and changes it — drop a quarter in and get 10 + 10 + 5 out; drop a 20 kr note in and get 10 + 5 + 2 + 2 + 1 — and the coins can be fed back in. Children change money back and forth just to watch the box.
- No score, timer, streak or lives.

## 3. The skill and the misconception
- Skill (2.MD.C.8; the shopping sheets): **change** = the part of the payment that is not the price (paid − price; counted up from the price, the cashier's way); **add up the basket** then make change; **enough?** = is the purse at least the price; **how much more** = what must be added to the purse to reach the price.
- Misconceptions and the push-back (by conservation — the box changes money but never makes or loses any):
  1. **Change = the price** (giving 70¢ back from $1) → whatever goes in the tray is gone from Pip's dish: Pip's count stops at 30 below a 70¢ tag — the empty part of the tag is ringed. Pip is visibly short.
  2. **Change = the payment** (giving the whole pile back) → Pip's dish is empty; his count cannot start.
  3. **Counting coins, not worth** → three small coins in the tray can leave Pip with too much; the count on Pip's side always goes by worth (25, 35, 40 …).
  4. **Change by guessing a "round" amount** → Pip's count overshoots: his last coin lands past the price and wobbles there — that coin belongs in the tray.
  5. **Basket: changing from one price only** (level 3) → Pip's count goes along ALL the tags, one after the other; a tray made from one tag's price leaves Pip short of the basket.
  6. **Enough = a big pile** (level 2) → the purse's coins hop onto the tag; a pile of many small coins stops short of the tag.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked, stage ≈ 648 × 480):
- **Left (420 px): the counter** (drawn: teal-and-cream awning strip 24 px, wooden counter #E7C9A0 with a 3 px ink edge).
  - **The shelf** along the back of the counter: up to three library toys, **104 px** each, with paper price tags on strings (cream tag 84 × 44, price Baloo 2 26 px). Toys (`mini tools/pictures/toys.json`, seen on the contact sheet 2026-10-17): `toys/airplane, ball, boat, car, dinosaur, helicopter, kite, robot, rocket, train, truck` (never the people pictures baby, baby_girl, girl, doll; `race_car` has no label and is not used; ball and balloon share fr "Ballon" — balloon is not used).
  - **The change box** (drawn apparatus, 120 × 140, brass #C9A227, a slot on top, a chute at the bottom, a small window that shows a coin spinning while it works) at the left of the counter.
  - **The pile**: where the changed coins land (up to 11 coins, in up to two rows).
  - **The customer's tray** (drawn: a shallow round dish 150 px, teal rim) at the front right — the "tray" of the frozen intro.
  - **Pip's dish** (drawn: a shallow round dish 130 px, coral rim) behind the price tag.
  - **Pip**: library `zoo animals/otter` (labelled in all 11 locales; never beside `zoo animals/meerkat`), 96 px, behind Pip's dish.
- **Right (220 px)**: the **story card** (the payment drawn as the real note/coin, the toy's tag repeated) · the **Enough / Not enough** tags in level 2 (150 × 64) · the **side tray** of coins (an endless supply; used in "how much more" and in free play) · bubble.
- **The coins and notes** (drawn apparatus — the library has no money): discs at the real coins' relative diameters (k = 3.2 px/mm at 704, 2.5 at 360; same table and rendering as row 164: numerals only where the real coins have them, en plain; reeded edges; holes in da 1/2/5 kr and no 1/5 kr); notes as rectangles 120 × 60 with the numeral and the currency sign only (USD $1 green, MXN $20 blue / $50 pink, BRL R$2 blue-grey, SEK 20 kr purple / 50 kr orange, DKK 50 kr purple, NOK 50 kr green) — no portraits, no country names.
- Task line above (≤ 24 px, ≤ 2 lines): the round's story (§9).

At 360 (stacked): shelf (toys **64 px**, tags 64 × 36, price 20 px) → counter 336 × 230 (change box 80 × 96 left; pile in two rows of up to 6 coins, ≥ 44 px hit; tray 110 px and Pip's dish 96 px side by side; Pip 64 px between them) → side tray / tags row → bubble. Heights: 96 + 230 + 70 + 8 = 404 + header 56 + task line 52 + bubble 44 + Check 56 → 612 < 740; 320 × 640: change box 70 × 84, pile coins 40 px drawn / 44 px hit → ≈ 600 < 640.

## 5. The hand
- **Round start (automatic, skippable by a tap)**: the payment slides from the story card into the box's slot (300 ms), the box rattles (600 ms) and pours the round's changed coins onto the counter (a fixed, measured set per round, §6 — biggest first, 80 ms apart).
- **Tap a pile coin** → it hops into the customer's tray (180 ms, clink). **Tap a tray coin** → it hops back to the pile. **Drag** works both ways. Every move is undoable until Check.
- **Check** → the pile slides into Pip's dish (250 ms); Pip's coins hop onto the price tag one by one, biggest first (220 ms each), each showing Pip's running amount above the tag; then the verdict (§7). Pip's count is the ONLY total ever shown, and only at Check.
- **Level 2 "enough?"**: tap Enough / Not enough, then Check → the purse's coins hop onto the tag the same way. **"How much more?"**: the purse is pinned in Pip's dish; the child taps side-tray coins into the dish; Check → Pip counts the whole dish against the tag.
- **Free play** (§2): drop any side-tray coin or note into the slot; it is changed into the fewest smaller coins of the next denominations down (a fixed table per family); tap the pile to feed coins back in (they change back into the larger coin only when the pile holds exactly its worth — then the box offers a little "swap back" chime).
- **Keyboard**: Tab: pile coins (←/→, Enter → tray) → tray coins (Enter → pile) → tags → side tray → Check.
- Sound (optional): rattle, clinks, the tick of Pip's count, a stamp *thunk*. TTS (optional): tap a tag to hear the price; tap the story line to hear it.

## 6. The rounds
Every table measured by the critic in `work-c31/m165166.js` (0 errors): each poured pile sums exactly to the payment, holds a set worth the price (so Pip can be paid exactly) and a set worth the change, uses only coins that are in use in that country. Families: **USD** en · **EURF** de, fr, it (1 c and 2 c in use) · **EURR** nl, fi (cash rounds to 5 c — no 1 c / 2 c) · **MXN** es (whole pesos, orchestrator ruling) · **BRL** pt (no 1-centavo) · **SEK** sv · **DKK** da · **NOK** no. One toy per round (two or three in level 3), drawn from the 11 toys without repeats inside a pass.

**Level 1 — Change** (default; G2-293). Price, payment → the box's pile → change. Any coins worth the change are right.
| family | R1–R8: price / payment → pile poured by the box → change |
|---|---|
| USD ($1 note) | 70 → [25,25,25,10,10,5] → 30 · 85 → [25,25,25,10,5,5,5] → 15 · 60 → [25,25,10,10,10,10,5,5] → 40 · 75 → [25,25,25,10,10,5] → 25 · 90 → [25,25,25,10,5,5,1,1,1,1,1] → 10 · 55 → [25,25,10,10,10,10,5,5] → 45 · 65 → [25,25,25,10,5,5,5] → 35 · 80 → [25,25,10,10,10,10,5,1,1,1,1,1] → 20 |
| EURF | 80 ct / 1 € → [50,20,10,10,5,5] → 20 ct · 70 / 1 € → [50,20,10,10,5,2,2,1] → 30 · 60 / 1 € → [50,20,20,5,2,2,1] → 40 · 1 € 75 / 2 € → [100,50,20,20,5,2,2,1] → 25 · 90 ct / 1 € 50 (1 € + 50 ct) → [50,50,20,10,10,5,5] → 60 · 65 / 1 € → [50,20,10,10,5,2,2,1] → 35 · 3 € 50 / 4 € (two 2 €) → [200,100,50,20,20,10] → 50 · 1 € 30 / 2 € → [100,50,20,20,5,2,2,1] → 70 |
| EURR | 35 ct / 50 ct → [20,10,10,5,5] → 15 · 80 / 1 € → [50,20,10,10,5,5] → 20 · 75 / 1 € → [50,20,10,10,5,5] → 25 · 1 € 40 / 2 € → [100,50,20,10,10,5,5] → 60 · 40 / 50 ct → [20,10,10,5,5] → 10 · 1 € 30 / 2 € → [100,50,20,10,10,5,5] → 70 · 85 / 1 € → [50,20,10,5,5,5,5] → 15 · 1 € 75 / 2 € → [100,50,20,10,10,5,5] → 25 |
| MXN | $7 / $10 coin → [5,2,2,1] → 3 · 12 / $20 note → [10,5,2,2,1] → 8 · 16 / 20 → [10,5,2,2,1] → 4 · 3 / 10 → [5,2,2,1] → 7 · 14 / 20 → [10,5,2,2,1] → 6 · 25 / $50 note → [20,10,10,5,2,2,1] → 25 · 35 / 50 → [20,10,10,5,2,2,1] → 15 · 18 / 20 → [10,5,2,2,1] → 2 |
| BRL | 75 centavos / R$1 coin → [50,25,10,10,5] → 25 · 80 / R$1 → [50,10,10,10,10,5,5] → 20 · 70 / R$1 → [50,25,10,10,5] → 30 · 40 / R$1 → [25,25,25,10,10,5] → 60 · 55 / R$1 → [50,25,10,10,5] → 45 · R$1,50 / R$2 note → [100,50,25,10,10,5] → 50 · R$1,35 / R$2 → [100,50,25,10,10,5] → 65 · 85 / R$1 → [50,25,10,5,5,5] → 15 |
| SEK | 7 kr / 10 kr coin → [5,2,2,1] → 3 · 6 / 10 → [5,2,2,1] → 4 · 15 / 20 kr note → [10,5,2,2,1] → 5 · 12 / 20 → [10,5,2,2,1] → 8 · 14 / 20 → [10,5,2,2,1] → 6 · 3 / 10 → [5,2,2,1] → 7 · 8 / 20 → [10,5,2,2,1] → 12 · 11 / 20 → [10,5,2,2,1] → 9 |
| DKK | 7 kr / 10 kr coin → [5,2,2,1] → 3 · 16 / 20 kr coin → [10,5,2,2,1] → 4 · 14 / 20 → [10,5,2,2,1] → 6 · 12 / 20 → [10,5,2,2,1] → 8 · 13 / 20 → [10,5,2,2,1] → 7 · 8 / 10 → [5,2,2,1] → 2 · 35 / 50 kr note → [20,10,10,5,2,2,1] → 15 · 9 / 20 → [10,5,2,2,1] → 11 |
| NOK | 7 kr / 10 kr coin → [5,1,1,1,1,1] → 3 · 16 / 20 kr coin → [10,5,1,1,1,1,1] → 4 · 12 / 20 → same → 8 · 13 / 20 → same → 7 · 42 / 50 kr note → [20,10,10,5,1,1,1,1,1] → 8 · 36 / 50 → same → 14 · 34 / 50 → same → 16 · 38 / 50 → same → 12 |
Changes within a family are distinct except where the kept live data repeat them (EURR 15 and 25 twice — kept; the piles differ). In 2 rounds per family the change is a single coin already in the pile (the realistic easy case); in the rest it takes 2–6 coins.

**Level 2 — Enough? and How much more?** (G2-294, G2-295). R1–R4 enough: the purse's coins (shown, pinned) against the tag; tap Enough / Not enough, then Check — the coins hop onto the tag. R5–R8 how much more: the purse is pinned in Pip's dish; add side-tray coins until Pip's count reaches the price.
| family | R1–R4 enough (price : purse) | R5–R8 how much more (price − purse = add) |
|---|---|---|
| USD | 45 : 25+10+10 = 45 **yes** · 60 : 25+25+5+1+1+1+1 = 59 **no** · 35 : 10+10+10+5+1 = 36 **yes** · 80 : 25+25+10+10+5 = 75 **no** | 50 − (25+10) = 15 · 75 − (25+10+10+10) = 20 · 90 − (25+25+10+5+1) = 24 · 40 − (10+5+5+1+1) = 18 |
| EURF | 45 : 20+20+5 **yes** · 60 : 50+5+2+2 = 59 **no** · 35 : 20+10+5+2 = 37 **yes** · 80 : 50+20+5+2 = 77 **no** | 50 − (20+10) = 20 · 75 − (50+10+5) = 10 · 90 − (50+20+5+2) = 13 · 40 − (20+5+2+1) = 12 |
| EURR | 45 : 20+20+5 **yes** · 60 : 50+5 = 55 **no** · 35 : 20+10+10 = 40 **yes** · 80 : 50+20+5 = 75 **no** | 50 − (20+10) = 20 · 75 − (50+5) = 20 · 90 − (50+20+5) = 15 · 40 − (20+5) = 15 |
| MXN, SEK | 15 : 10+5 **yes** · 20 : 10+5+2+1 = 18 **no** · 18 : 10+5+2+2 = 19 **yes** · 30 : 10+10+5+2+2 = 29 **no** | 20 − (10+5) = 5 · 25 − (10+10+1) = 4 · 35 − (10+10+5+2) = 8 · 16 − (10+2) = 4 |
| BRL | 45 : 25+10+10 **yes** · 60 : 50+5 = 55 **no** · 35 : 25+10+5 = 40 **yes** · 80 : 50+25 = 75 **no** | 50 − (25+10) = 15 · 75 − (50+10) = 15 · 90 − (50+25+5) = 10 · 40 − (10+10+5) = 15 |
| DKK | 15 : 10+5 **yes** · 30 : 20+5+2+1 = 28 **no** · 18 : 10+5+2+2 = 19 **yes** · 40 : 20+10+5+2+2 = 39 **no** | 20 − (10+5) = 5 · 25 − (20+1) = 4 · 35 − (20+10+2) = 3 · 16 − (10+2) = 4 |
| NOK | 15 : 10+5 **yes** · 20 : 10+5+1+1+1 = 18 **no** · 18 : 10+5+1+1+1+1 = 19 **yes** · 30 : 20+5+1+1+1 = 28 **no** | 20 − (10+5) = 5 · 25 − (20+1) = 4 · 35 − (20+10+1) = 4 · 16 − (10+1) = 5 |
Enough: in every family 2 yes (one exactly equal, one just over) and 2 no (1–5 short) — close calls; in USD, EURF, MXN, SEK, DKK and NOK a "no" purse holds more coins than a "yes" purse (a big pile is not enough).

**Level 3 — Basket and change** (G2-291, G2-292). Two or three toys; their tags hang side by side; the payment goes into the box; give the change. Pip's count at Check runs along all the tags.
| family | R1–R8: tags = total / payment → change (pile poured) |
|---|---|
| USD | 25+15 = 40 / $1 → 60 · 30+45 = 75 → 25 · 12+20 = 32 → 68 (pile [25,25,25,10,5,5,1,1,1,1,1]) · 35+50 = 85 → 15 · 10+15+20 = 45 → 55 · 25+25+30 = 80 → 20 · 5+12+30 = 47 → 53 (pile [25,25,25,10,10,1,1,1,1,1]) · 20+35+40 = 95 → 5 (pile [25,25,25,10,5,5,5]); other piles [25,25,25,10,10,5] |
| EURF | as USD's tags, paid 1 € → 60 · 25 · 68 · 15 · 55 · 20 · 53 · 5 (piles [50,20,10,10,5,5]; [50,20,10,10,5,2,2,1] for 32 and 47) |
| EURR, BRL | 25+15 = 40 / 50 ct → 10 · 30+45 = 75 / 1 € (R$1) → 25 · 15+20 = 35 / 50 → 15 · 35+50 = 85 / 100 → 15 · 10+15+20 = 45 / 50 → 5 · 25+25+30 = 80 / 100 → 20 · 5+15+30 = 50 / 100 → 50 · 20+35+40 = 95 / 100 → 5 (EURR piles [20,10,10,5,5] and [50,20,10,10,5,5]; BRL [25,10,10,5] and [50,25,10,10,5]) |
| MXN, SEK, DKK, NOK | 7+5 = 12 / 20 → 8 · 9+8 = 17 / 20 → 3 · 12+6 = 18 / 20 → 2 · 15+13 = 28 / 50 → 22 · 4+5+6 = 15 / 20 → 5 · 3+7+9 = 19 / 20 → 1 · 10+8+5 = 23 / 50 → 27 · 12+9+14 = 35 / 50 → 15 (20-piles [10,5,2,2,1], NOK [10,5,1,1,1,1,1]; 50-piles MXN/DKK [20,10,10,5,2,2,1], SEK [10,10,10,10,5,2,2,1] — Sweden has no 20 kr coin, NOK [20,10,10,5,1,1,1,1,1]) |
Totals distinct within each family; every change > 0 and payable from its pile (measured).

- **Answer position**: built answers have no position. Enough tags are in fixed order (Enough left); yes/no 2/2 per level, order reshuffled per pass (gate: over 200 passes no slot of the level holds the same answer more than 60 % of the time).
- **Order**: order-only reshuffle per pass (`nextTask`); "Mixed shop" interleaves the three levels' rounds (G2-276/289/290); two single-coin-change rounds never adjacent.

## 7. Check, the misses, the success
- **Check with an empty tray** (change rounds) / nothing added (how much more) / no tag chosen (enough) → the pile coins bob / the side tray bobs / the two tags pulse; bubble: "Put the change in the customer's tray." / "Add coins to Pip's dish." / "Tap Enough or Not enough." (no miss)
- **Miss 1** → Pip counts his dish onto the tag (always — this is the apparatus answering):
  - change too big (Pip short): Pip's count stops before the price; the unreached part of the tag is ringed coral and Pip shrugs. "Pip has only {pip}. The {toy} costs {price} — you gave back too much."
  - change too small (Pip over): Pip's count passes the price; the coin that crossed it wobbles on the tag, coral. "Pip has {pip} — more than {price}. Some of that is the customer's change."
  - enough, wrong choice: the purse's coins hop onto the tag and stop short of it / reach it; "The purse reaches {sum}: that is {not enough | enough} for {price}." (the right tag then pulses)
  - how much more, wrong: as the change cases, with "Pip still needs more." / "That is more than {price}."
  - basket: Pip's count runs along every tag; a tray built from one tag only leaves the other tags unreached — "Pip counts all the tags: {t1} and {t2}."
- **Miss 2** → **the count-up**: the tray empties back to the pile; the price tag stands at the start of a count-up rail; Pip's own fewest coins for the change (from the pile) hop one by one AFTER the price, each showing the amount reached — change: "70 … 80 … 90 … $1" (or the locale form) — until the payment's worth is reached; those coins are left translucent in the pile with a dashed outline. Bubble: "Count up from {price} to {paid}: {steps}." (enough: the purse coins with their running amounts and an "=, <, >" sign against the tag; how much more: count up from the purse to the price.) The child still taps the real coins.
- A new tap removes the rings and outlines until the next Check.
- **Success** → Pip's count lands exactly on the price, the tag gets the drawn tick stamp, the customer's hand (a drawn tray lid) closes over the change, the toy floats into the bag, Pip claps; bubble: change "**70¢ + 30¢ = $1. Your change is 30¢.**" · basket "**25¢ + 15¢ = 40¢. 40¢ + 60¢ = $1. Your change is 60¢.**" · more "**35¢ + 15¢ = 50¢. You needed 15¢ more.**" · enough yes "**45¢ = 45¢ — enough!**" / "**36¢ is more than 35¢ — enough!**" · no "**59¢ is less than 60¢ — not enough.**" (formats §9; +, =, <, > are content.)

## 8. Settings
1. **Shop**: Change (default) / Enough & how much more / Basket / Mixed shop — the counter changes at rest (one toy + the change box; a pinned purse; two or three tagged toys).
2. **Pip counts**: At Check (default) / As you go — with "As you go", Pip's dish is live: every coin the child takes from the pile visibly leaves Pip's side and his count re-runs (an easier mode for first lessons; the coral count line visibly appears on the tag at rest).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (frozen h1 kept "Make Change with Coins") · instruction: "The change box makes small coins. Put the customer's change in the tray."
- story lines: change "The {toy} costs {price}. The customer pays {paid}. Give the change." · enough "The {toy} costs {price}. Is the purse enough?" · more "The {toy} costs {price}. How much more does the purse need?" · basket two "The customer buys the {toy1} and the {toy2} and pays {paid}. Give the change." · basket three "The customer buys the {toy1}, the {toy2} and the {toy3} and pays {paid}. Give the change."
- tags: "Enough" / "Not enough". Hints and successes as §7. Settings "Shop" — "Change" / "Enough & how much more" / "Basket" / "Mixed shop"; "Pip counts" — "At Check" / "As you go".
- aria: pile "{n} coins from the change box" (never their total); tray "The customer's tray: {n} coins"; after Check "Pip counted {pip}. The price is {price}."
- **Locale traps**:
  - **currencies and coins** (shared with rows 164/165; `data/money/currencies.js` as the coin source except es): en USD · de/fr/it EUR with 1 c/2 c · nl/fi EUR rounded to 5 c (no 1 c/2 c) · pt BRL (5, 10, 25, 50 centavos, R$1 coin, R$2 note) · es **MXN whole pesos** ($1, $2, $5, $10, $20 coins; $20/$50 notes) · sv SEK 1/2/5/10 kr coins, 20/50 kr notes · da DKK 1/2/5/10/20 kr coins, 50 kr note · no NOK 1/5/10/20 kr coins, 50 kr note.
  - **money formatting** (one shared formatter with rows 164/165): en 70¢ / $1 · de 70 ct / "1 € 75 ct" (the Klasse-2 form; the success sentence adds "(1,75 €)") · fr 70 c / "1 € 75 c" · it 70 cent / "1 euro e 75 cent" · nl 70 cent / "1 euro 75 cent" · fi 70 snt / "1 € 75 snt" · pt 70 centavos / "1 real e 35 centavos" · es $7 · sv 7 kr · da 7 kr. · no 7 kr. — no amount ever needs a cent below the family's smallest coin.
  - **Harmonized formatter (critic, rows 164/165/166 share it; supersedes any other money-format example in this file):** below one unit the cent form (en 53¢ · de 53 ct · fr 53 c · it 53 cent · nl 53 cent · fi 53 snt · pt 53 centavos); from one unit up the grade-2 split form first — de "1 € 50 ct", fr "1 € 50 c", it "1 euro e 50 cent", nl "1 euro 50 cent", fi "1 € 50 snt", pt "1 real e 50 centavos" — with the decimal form beside it only in success sentences ("(1,50 €)", "(R$ 1,50)"); en "$1" (no dollars-and-cents above $1 occur); es/sv/da/no whole units ("$13", "13 kr", "13 kr.").
  - **{toy} with its article**: toys come from `image-vocabulary.js`; the article depends on gender (de der Zug, die Rakete, das Auto; fr le train, la fusée; es el tren, la pelota; it il treno, la palla; pt o trem, a bola; nl de trein, het vliegtuig; sv/da/no definite suffix — tåget, toget, toget; fi no article) — a per-toy × per-locale table of the needed form, filled by the native author; no generated articles.
  - "change" words differ: de Wechselgeld/Rückgeld, fr la monnaie, es el cambio, it il resto, pt o troco, nl wisselgeld, sv växel, da byttepenge, no vekslepenger, fi vaihtoraha; "change box" likewise authored (de Wechselkasse, fr la caisse à monnaie, es la caja de cambio, nl het wisselbakje, sv växelkassan, fi vaihtorahakone …) — reviewer confirms a natural child word.
  - payment notes carry numerals and the currency sign only.

## 10. Sound off, access, phones
- Silent-legible: the box shakes and pours, coins hop, Pip's count shows on the tag, rings, wobbles and the stamp are visible.
- Keyboard path §5; aria-live: "dime to the tray", Pip's count, the miss bubble.
- Taps: pile and tray coins ≥ 44 px hit; tags 150 × 64; the box slot (free play) 44 px.
- Pictures: toys 104 px at 704, 64 px at 360 and 320; Pip 96 / 64 px.
- Check above the fold at 360 × 740 (612) and 320 × 640 (≈ 600).
- Phone: stacked shelf → counter (box, pile, tray, Pip, Pip's dish) → tags / side tray → bubble.

## 11. Distinct from
- **Row 164 Worth Till** (worth cups that refuse the wrong coin; change from a full till of unlimited coins): here the change can only come out of the customer's own changed payment, and the check is Pip's share — conservation, not identification.
- **Row 165 Price Glass** (value as band height, a hidden line) and **New 270 Wallet Bar** (value as length, price blocks, overhang): no magnitude display here at all — coins stay coins, and the only total is Pip's count at Check.
- **Rows 88 / New 209 / New 271** (balances): no beam, no pans.
- **Money Mat** (premium tool): pay on a mat and HEAR change counted back aloud coin by coin; here the child splits a changed payment and Pip counts his own share up to the price.
- **Exchange Machine** (premium tool: tap a place-value column and one leaves it, ten arrive next door): regrouping tens and ones on a whole-class board. The change box only appears at the start of a round (and in free play) to change the payment; the child's work is splitting that money between the customer and Pip, which the exchange machine never does. No change machine appears in either registry.

## 12. Build plan
- **Core state** `{ family, level, round, kind, shelf:[toy], payment, pile:[coin], tray:[coin], purse:[coin], dish:[coin], choice, misses, liveCount }`. Functions: `pour(payment, round)` (the round's fixed pile, Σ = payment), `toTray(i)` / `toPile(i)`, `pipShare()` (= pile at Check), `pipCount(dish, tags)` (running amounts, biggest first), `checkChange` (Σ tray = paid − price ⇔ Σ pip = price), `checkBasket`, `checkEnough(choice)`, `checkMore` (Σ purse + added = price), `countUp(price, paid, pile)` (fewest coins from the pile summing to the change + running amounts), `freeChange(coin)` (fixed table per family), `nextTask`.
- **Gate's own ground truth** (`verify-change-box-core.js`): every family's tables exactly as §6 (each pile Σ = payment, holds a price set and a change set, coins only from the family's in-use set; enough 2 yes (one equal) / 2 no; how-much-more > 0 and payable; basket totals distinct, change > 0); conservation: Σ tray + Σ Pip's dish = payment for every move sequence (property test over 1,000 random move sequences per round); no total of the child's coins in the DOM or aria before Check.
- **Mutations**: running total on the tray · pile not summing to the payment · change checked as tray = price · Pip counting coins instead of worth · basket checked against the first tag only · enough answers all yes · es pile with centavo coins · nl/fi pile with 1 c or 2 c · SEK 50-pile with a 20 kr coin · en coins with numerals.
- **Local test**: real taps/drags in every family, every round, at 320 · 360 · 412 · 704 · 768 · 1024 · 1366; the pour animation skippable; Pip's count equals the gate's.
- **Pictures to verify**: the 11 toys and `zoo animals/otter` (contact sheets seen). **Risks**: the definite-form toy table per locale; the per-locale word for the change box (reviewer). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a box that shakes a note into a shower of coins is a toy; sharing the pile out and watching Pip count his share is a small drama every round.
2. **Would a teacher put it on the board?** Yes — change is shown as what it is (the part of the customer's money that is not the price), every wrong amount is caught by conservation (Pip is short or over), and counting up from the price is the method shown at miss 2; enough, how much more and the basket are on the same counter.
3. **Would a parent trust it?** Yes — real coins at true sizes, coins only from each country's real use, library toys, no running total, nothing for sale.
4. **The invention in one sentence:** the payment goes through a change box into small coins of the same worth, so the change is what you take out of the customer's own money — and Pip, who keeps the rest, must land exactly on the price.

## 14. Critic review (2026-10-17)
Scores before → after: invention 3→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 2→5 · reality 5→5
What changed:
- **Invention replaced.** The first draft's "shop scale that weighs money by its worth" taught false physics (a light dime tipping a beam further than a heavy nickel — the opposite of what a real scale does and of K.MD.A.2), and a beam that rests level when the sides are equal is already row 88, New 209 and New 271. The Change Box models change by conservation: the payment is changed into small coins of the same worth, the child gives the customer the change out of that pile, and Pip must count exactly to the price with what is left.
- All tables re-solved per currency in `work-c31/m165166.js` (0 errors): every pile sums to its payment and holds both a price set and a change set; coins are only those in real use (nl/fi no 1 c/2 c; es whole pesos; pt no 1-centavo; Sweden's 50 kr pile has no 20 kr coin — the draft's shared pile would have used one).
- Level 3 now adds the basket AND gives change (G2-291/292 + G2-293 together); level 2 purses spelled out; de/fr/it/nl/fi amounts over one euro written in the grade-2 split form ("1 € 75 ct") with the decimal form beside it.
- Pip shown (library otter), matching row 164.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
