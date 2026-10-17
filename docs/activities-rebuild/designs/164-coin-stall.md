# Row 164 — Pip's Market Stall → THE WORTH TILL (2.MD.C.8)

## 0. Identity
- id `coin-stall.money.2-md-c-8` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl — sv, da, no, fi slug, title and intro are new at build, grade 2) · CCSS 2.MD.C.8 (solve word problems with dollar bills, quarters, dimes, nickels and pennies) — non-US locales use their own coins (§9) · strand Measurement & Data · own files `worth-till-core.js`, `worth-till-activity.js`, `worth-till-activity.html`, `worth-till-activities.json` (this row leaves `coin-stall-activities.json`; 0 lines to `coin-stall-core.js` and `lcs-shell.*`).
- page title (frozen): "Pip's Market Stall — Counting Coins & Making Change". The frozen intro promises: pay at Pip's seaside stall, **pick real coins and pay the exact price, count a pile, make change, or trade coins of equal value**; **the value isn't written on the coin, so you have to KNOW what each one is worth**; the tiny dime is worth more than the bigger nickel. **Every promise is kept — and "you have to know" becomes the mechanism.** (Pip the otter is shown: the library's `zoo animals/otter` — an upright orange-brown otter, labelled in all 11 locales — stands behind the counter, 96 px; never beside `zoo animals/meerkat`, its near-twin.)
- worksheets also covered: **G1-211, G1-228, G1-229, G1-230, G1-231** (count coins: one kind, two kinds, all kinds) → level 1 · **G1-232** Which Purse Has More? → level 3 · **G2-276, G2-289, G2-290** (shopping stories) and **G2-293** How Much Change? / **G2-294** Is There Enough Money? → level 3 · **G2-291/292/295** (add up the basket, three things, how much more) are owned in depth by row 166 (the Change Box); here they appear as the exact-pay rounds of level 2.
- what the old activity did: 14 rounds of seven kinds (count a pile, pay exactly, fewest coins, make change, enough?, two ways, trade), coins drawn with an English letter (P/N/D/Q) or a euro numeral, a fading coin legend, no running total. **Kept**: all seven round kinds, almost every value (30¢ shell, 41¢ starfish, 16¢ pebble, 35¢ and 30¢ fewest, 70¢/$1 and 30¢/50¢ change, the 35¢ and 40¢ enough checks, the quarter and dime trades, 30¢ two ways), the no-running-total rule, the fading key (now a setting). **Changed**: (1) the English letters go (real coins carry none); (2) nl coins lose 1 c and 2 c (they are not used in the Netherlands — cash rounds to 5 c), and fi joins nl's set; (3) **the en "enough?" rounds were both YES** — now two yes, two no; (4) the dime trade's purse held a dime, so a child could "trade" a dime for a dime — the offered coin is never in the purse now; (5) "which purse has more" is added (G1-232).

## 1. The pitch
"Pip's till has a cup for every coin's WORTH — 25, 10, 5, 1 — and a cup only takes the coin it is named for: so you can't pay, count or make change until you know what each coin is worth, and once they're in the till they are already lined up biggest-first for counting on."

## 2. Why a child will want it again
- **The till is a toy.** A wooden till drawer slides out of the stall counter with a *ching*. It has a row of round cups, the biggest worth on the left. Drop a coin into the right cup and it spins down into it with a rattle and lies flat, edge showing, on top of the coins already there — the stacks grow visibly. Drop it into the wrong cup and it **pings straight back out** onto the counter, rolling to a stop — the till simply won't take a nickel in the 10 cup, however big the nickel is.
- **The dime surprise is felt, not told.** The tiny dime fits the 10 cup; the bigger nickel bounces off it. Children try it on purpose.
- **Earned show per round**: when Pip accepts the money, the till drawer slides shut with a *ching-ching* and the sold item (a library beach toy) hops into a paper bag that folds itself closed; on count rounds, the coins jump out of the cups in order, left to right, each one landing on a little counting rail with its running total popping above it (25, 35, 40, 41) — the count the child just did, shown back as a parade.
- No timer, score, streak or lives; nothing is sold to the user (it is Pip's pretend stall).

## 3. The skill and the misconception
- Skill (2.MD.C.8 + the coin-counting sheets): **know each coin's worth** (in en: without a numeral on the coin), **count a mixed collection by counting on from the biggest worth**, pay an exact amount, pay with the fewest coins, trade coins of equal worth, make change, decide whether a purse is enough, decide which purse holds more money.
- Misconceptions and the push-back:
  1. **Bigger coin = worth more** (nickel > dime; in euro 1 € smaller than 50 c, 10 c smaller than 5 c; sv 10 kr smaller than 2 kr; da 10 kr smaller than 2 kr and 20 kr smaller than 5 kr; no 10 kr smaller than 5 kr; pt 10 c smaller than 5 c, 50 c smaller than 25 c) → the cups are named by worth, so the big coin **bounces** off the cup it "looks like". The coin sizes are drawn true to the real coins (§4), so the trap is real in 10 of 11 locales (es-MX coins grow with worth; there the till still teaches worth-first counting).
  2. **Counting coins instead of value** (7 coins = 7¢) → the till never shows "how many coins", only cups of worth; level 3's purse rounds pit many small coins against a few big ones — and once, the other way round, so "fewer coins wins" is not a rule either (§6).
  3. **Counting in the order the coins happen to lie** (1, 2, 3 … then switching awkwardly) → the till already orders the money biggest-first, left to right; miss 1 lifts the coins in that order.
  4. **Paying "a coin like the one shown" in a trade** → the offered coin's own cup is lidded during trade rounds (a wooden lid drops over it), so the same coin cannot be given back.
  5. **Change = the price** → change rounds start from a full till; the child takes coins OUT of the till into the customer's tray; miss 2 counts up from the price.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked, stage ≈ 648 × 480):
- **Left (≈ 400 px): the stall counter** (drawn: a teal-and-cream striped awning strip 24 px tall across the top, a wooden counter #E7C9A0 with 3 px ink edge).
  - **The till** (drawn apparatus) at the bottom of the counter: a drawer 380 × 120 with one round cup per coin kind (4–6 cups), cups 64 px across, 14 px apart for families with ≤ 5 cups and 52 px across, 10 px apart for the 6-cup families (EURF, DKK: 6 × 52 + 5 × 10 = 362 ≤ 380), **worth numerals painted on the drawer front under each cup** (Baloo 2 26 px ink, with the locale's unit in 16 px — 25¢ · 20 ct · 10 kr …). A cup holds a visible stack: inside a cup a coin is drawn as an elliptical slab at **0.6 × its counter size** (6 px thick; up to 9), so even the biggest coin (DKK 5 kr, 91 px on the counter) fits a 52 px cup; on the counter and in the purse every coin stays true-size.
  - **The counter top**: where spilled coins lie (count rounds) or where the purse opens (pay rounds): a purse (drawn leather oval with a clasp, 200 × 70) whose coins sit on its open mouth in one row.
  - **The goods**: one library beach item on a small plinth with a paper price tag (tag: a cream rectangle, price in Baloo 2 30 px): `beach/seashell`, `beach/starfish`, `beach/kite`, `beach/bucket`, `beach/sunglasses`, `beach/net`, `beach/spade`, `beach/hat` (all in `mini tools/pictures/beach.json`, seen on the contact sheet 2026-10-17; spade and shovel share one word in 7 locales, so only `spade` is used), **112 px**.
  - **Pip**: library `zoo animals/otter`, 96 px, behind the right end of the counter (never covering the till or the goods); on success Pip claps (a 2-frame hop, 500 ms).
- **Right (≈ 240 px)**: the **price-tag dial** for count rounds (two tall wheels, tens and ones, 72 × 120 each, digits 52 px, ▲/▼ 48 px tap areas above/below each wheel, the unit after them) — or, for the purse rounds, the two purse buttons A/B (coral and teal purses, 150 × 90) — or, for enough rounds, two big tags "Enough" / "Not enough" (150 × 72). The **swap dish** (trade/change rounds) sits here too: a shallow round dish 110 px holding the coin or note to be traded or the customer's payment.
- Task line above (≤ 24 px, ≤ 2 lines): the round's question (§9).
- Bubble below the right column.

**The coins** (drawn apparatus — the library has no coins): discs drawn **to the real coins' relative diameters**, k = 3.2 px/mm at 704 and 2.5 px/mm at 360 so the smallest coin (dime 17.91 mm, 1 c 16.25 mm) is ≥ 44 px tap at 360 (1 c: 40.6 px drawn → 44 px hit area). Fill by metal (tint from `scripts/worksheet-gen/data/money/currencies.js`, the single source): copper #C97B43, silver #BFC3C7, gold #D4AF37, bimetal (1 €: silver centre, gold ring; 2 €: gold centre, silver ring); a 2 px darker rim; **reeded edge** (fine radial ticks round the rim) on the dime and quarter, smooth on penny and nickel; **centre holes** on da 1/2/5 kr and no 1 kr **and 5 kr** (real coins have them). **Face**: in en no numeral and no letter (the real coins have neither); in every other locale the worth numeral, as on the real coin (Baloo 2, 40 % of the diameter, ink at 70 %). Diameters (mm, to be confirmed against each central bank's page at build): USD 1¢ 19.05, 5¢ 21.21, 10¢ 17.91, 25¢ 24.26 · EUR 1c 16.25, 2c 18.75, 5c 21.25, 10c 19.75, 20c 22.25, 50c 24.25, 1€ 23.25, 2€ 25.75 · MXN $1 21, $2 23, $5 25.5, $10 28 · BRL 5c 22, 10c 20, 25c 25, 50c 23, R$1 27 · SEK 1 19.5, 2 22.5, 5 23.75, 10 20.5 · DKK 1 20.25, 2 24.5, 5 28.5, 10 23.35, 20 27 · NOK 1 21, 5 26, 10 24, 20 27.5. Notes (only as the customer's payment): drawn rectangles 120 × 60 with the numeral and currency sign (USD $1 green, MXN $20 blue, SEK 20 kr purple).

At 360 (stacked): task line → goods + swap dish + Pip in one row (goods 72 px, dish 80 px, Pip 64 px: 72 + 80 + 64 + 2 × 12 = 240 ≤ 336) → counter with spilled coins / purse (336 × 90) → till (336 × 96, cups 52 px, numerals 22 px, up to 6 cups: 6 × 52 + 5 × 4 = 332) → dial (two wheels 64 × 96, digits 40 px) or purse/enough buttons (2 × 150 × 64) → bubble. Heights: 52 + 80 + 90 + 96 + 104 = 422 + header 56 + bubble 44 + Check 56 → 578 < 740; 320 × 640: cups 46 px, wheels 56 × 88 → ≈ 560 < 640.

## 5. The hand
- **Drop a coin into a cup**: drag it (it follows the finger, 1.1× scale while held) or tap it then tap a cup. Right cup → it spins in (220 ms, rattle) and stacks. Wrong cup → it bounces out in an arc back to where it came from (300 ms, a soft *ping*); the cup's worth numeral nods once. Nothing is counted as a miss — the till is the knowledge test and it answers instantly. After **two bounces of the same coin**, that coin shows a faint ghost of its worth on its face for the rest of the round (help, in en too).
- **Take a coin out**: tap the top coin of a cup → it hops back to the counter/purse (180 ms). Every move is undoable.
- **Price-tag dial**: tap ▲/▼ or drag a wheel up/down; it clicks one digit per 40 px (tick sound); the digits are always readable.
- **Purse buttons / Enough tags**: tap to choose (lift + outline), tap again or the other to change.
- **Change rounds**: the till starts full (3 of each coin); the child taps coins in the till to lift them onto the customer's tray (a dish beside the swap dish); tap a tray coin to put it back.
- **Free play**: before the first round and after each success, the counter shows a handful of every coin; the child can drop coins into the till and watch them bounce or stack — the till is always live. The dial can be spun freely.
- **Keyboard**: Tab through coins → cups (Enter picks a coin, Enter on a cup drops it) → dial wheels (↑/↓) → buttons.
- Sound (optional): rattle, ping, ching. TTS (optional): tap the price tag to hear the price; tap a coin to hear its name (en "dime"; de "Zehn-Cent-Münze" …) — never its worth in the KNOW-the-coin rounds (en only: the name, not the value).

## 6. The rounds
Three levels × 8 rounds per currency family (values measured by `work-31/m164.js`, errors 0). Family → locales: **USD** en · **EURF** de, fr, it · **EURR** nl, fi · **MXN** es · **BRL** pt · **SEK** sv · **DKK** da · **NOK** no. Units in the tables: ¢/c/centavos for cent families, whole kroner/pesos for SEK/DKK/NOK/MXN (no decimals at this level).

**Level 1 — Count the coins** (G1-211, 228–231): the coins spill; sort them into the till; set the total on the tag.
| R | kind | USD | EURF | EURR | MXN | BRL | SEK | DKK | NOK |
|---|---|---|---|---|---|---|---|---|---|
| 1 | one kind | 4×10 = 40 | 4×10 = 40 | 4×10 = 40 | 4×2 = 8 | 4×10 = 40 | 4×2 = 8 | 4×2 = 8 | 4×10 = 40 |
| 2 | one kind | 6×5 = 30 | 6×5 = 30 | 6×5 = 30 | 6×5 = 30 | 6×5 = 30 | 6×5 = 30 | 6×5 = 30 | 6×5 = 30 |
| 3 | two kinds | 2×25+3×1 = 53 | 2×20+3×1 = 43 | 2×20+3×5 = 55 | 2×10+3×1 = 23 | 2×25+3×5 = 65 | 2×10+3×1 = 23 | 2×20+3×1 = 43 | 2×20+3×1 = 43 |
| 4 | two kinds | 3×10+4×5 = 50 | 3×10+4×2 = 38 | 3×10+2×20 = 70 | 3×5+2×2 = 19 | 3×10+2×25 = 80 | 3×5+2×2 = 19 | 3×5+4×2 = 23 | 3×10+4×5 = 50 |
| 5 | three kinds | 25+2×10+3×1 = 48 | 50+2×10+3×1 = 73 | 50+2×10+5 = 75 | 10+2×5+3×2 = 26 | 50+2×10+5 = 75 | 10+2×5+2×2 = 24 | 20+2×5+3×1 = 33 | 20+2×5+3×1 = 33 |
| 6 | all kinds | 25+10+5+1 = 41 | 50+20+5+2 = 77 | 50+20+10+5 = 85 | 10+5+2+1 = 18 | 50+25+10+5 = 90 | 10+5+2+1 = 18 | 20+10+5+2 = 37 | 20+10+5+1 = 36 |
| 7 | all kinds | 2×25+10+2×5+2×1 = 72 | 50+20+10+2×5+2+1 = 93 | 2×20+10+3×5 = 65 | 2×10+5+2×2+2×1 = 31 | 2×25+2×10+3×5 = 85 | 2×10+5+2×2+2×1 = 31 | 20+10+2×5+2×2+1 = 45 | 20+10+2×5+2×1 = 42 |
| 8 | many small | 2×10+3×5+4×1 = 39 | 2×20+3×5+4×1 = 59 | 20+2×10+4×5 = 60 | 10+3×5+4×1 = 29 | 25+2×10+5×5 = 70 | 10+3×5+4×1 = 29 | 10+3×5+4×1 = 29 | 10+3×5+4×1 = 29 |
Totals are distinct within every family; coins per round 4, 6, 5, 7, 6, 4, 7, 9 (sorting never exceeds 9).

**Level 2 — Pay Pip** (exact, fewest, trade, two ways). Purse contents in brackets.
| R | kind | USD | EURF | EURR | MXN / SEK | BRL | DKK | NOK |
|---|---|---|---|---|---|---|---|---|
| 1 | exact (shell) | 30 [25,5,10,10,1,1,5,25] | 30 [20,5,10,10,1,1,5,20] | 30 [20,5,10,10,5,5,50,20] | 13 [10,1,2,5,1,2,1,5] | 30 [25,5,10,10,5,5,50,25] | 13 (as SEK) | 16 [10,5,1,1,5,1,10,20] |
| 2 | exact (starfish) | 41 [25,10,10,5,1,25,5,1] | 41 [20,10,10,5,1,20,5,1] | 45 [20,10,10,5,5,20,50,5] | 17 [10,5,2,1,5,2,10,1] | 60 [50,10,25,25,5,10,5,50] | 17 (as SEK) | 27 [20,5,1,1,10,5,1,20] |
| 3 | exact (bucket) | 16 [10,5,1,1,10,5,25,1] | 16 [10,5,1,1,10,5,20,1] | 65 [50,10,5,20,10,5,20,5] | 24 [10,10,2,2,5,1,5,1] | 85 [50,25,10,5,25,10,5,50] | 24 (as SEK) | 35 [20,10,5,5,10,1,20,1] |
| 4 | fewest (kite) | 35 → 25+10 | 35 → 20+10+5 | 35 → 20+10+5 | 15 → 10+5 | 35 → 25+10 | 25 → 20+5 [20,5,5,10,10,2,1,20] | 25 → 20+5 |
| 5 | fewest (net) | 30 → 25+5 | 30 → 20+10 | 70 → 50+20 | 16 → 10+5+1 | 75 → 50+25 | 32 → 20+10+2 | 31 → 20+10+1 |
| 6 | trade | 1 quarter [10,10,5,5,1,10,5,1] | 50 c [20,20,10,5,5,20,10,5] | 50 c (as EURF) | 10 [5,2,2,1,5,1,2,1] | 50 c [25,10,10,5,25,10,5,5] | 20 kr [10,5,5,2,2,1,10,5] | 20 kr [10,5,5,1,1,10,5,1] |
| 7 | trade | 1 dime [5,5,1,1,5,1,5,1] | 10 c [5,5,2,2,5,1,5,2] | 20 c [10,5,5,10,5,5,10,5] | 5 [2,2,1,1,2,1,1,2] | 25 c [10,10,5,5,10,5,5,10] | 10 kr [5,2,2,1,5,1,2,1] | 10 kr [5,5,1,1,1,1,1,5] |
| 8 | two ways | 30, shown 10+10+10 | 30, shown 10+10+10 | 40, shown 20+20 | 12, shown 10+2 | 50, shown 25+25 | 30, shown 20+10 | 30, shown 20+10 |
Fewest-coin purses (R4 / R5), spelled out: USD [25,10,10,5,1,25,5,1] / [25,5,10,10,1,25,5,1] · EURF [20,10,10,5,1,20,5,1] (both rounds) · EURR [20,10,10,5,5,20,50,5] / [50,20,10,10,20,5,5,50] · MXN and SEK [10,5,5,2,2,1,10,1] / [10,5,5,2,1,1,10,2] · BRL [25,10,10,5,5,25,50,5] / [50,25,25,10,10,5,5,50] · DKK [20,5,5,10,10,2,1,20] / [20,10,10,5,2,2,1,20] · NOK [20,5,5,10,10,1,1,20] / [20,10,10,5,1,1,5,20]. Every fewest answer is **the unique** fewest multiset in its purse (re-measured by the critic, `work-c31/money.js`, 0 errors). Trade purses never contain the offered coin (measured). Two-ways: any set from the purse with the same total that is not the shown multiset.

**Level 3 — Change, enough, which purse** (G2-293, G2-294, G1-232).
| R | kind | USD | EURF | EURR | MXN / SEK | BRL | DKK | NOK |
|---|---|---|---|---|---|---|---|---|
| 1 | change | 70 paid $1 → 30 | 70 paid 1 € → 30 | 70 paid 1 € → 30 | 7 paid 10 → 3 | 70 paid R$1 → 30 | 7 paid 10 → 3 | 7 paid 10 → 3 |
| 2 | change | 30 paid 50 (2 quarters) → 20 | 30 paid 50 c → 20 | 35 paid 50 c → 15 | 12 paid 20 → 8 | 25 paid 50 c → 25 | 13 paid 20 → 7 | 12 paid 20 → 8 |
| 3 | enough? | 35 vs 25+10 = 35 **yes** | 35 vs 20+10 = 30 **no** | 35 vs 30 **no** | 15 vs 10+5 **yes** | 35 vs 25+5 **no** | 15 vs 10+5 **yes** | 15 vs 10+5 **yes** |
| 4 | enough? | 40 vs 38 **no** | 40 vs 20+20 **yes** | 40 vs 20+20 **yes** | 18 vs 17 **no** | 40 vs 40 **yes** | 23 vs 22 **no** | 18 vs 17 **no** |
| 5 | enough? | 50 vs 60 **yes** | 50 vs 53 **yes** | 50 vs 60 **yes** | 25 vs 27 **yes** | 50 vs 65 **yes** | 25 vs 27 **yes** | 25 vs 27 **yes** |
| 6 | enough? | 60 vs 58 **no** | 60 vs 58 **no** | 60 vs 55 **no** | 30 vs 29 **no** | 75 vs 70 **no** | 40 vs 39 **no** | 30 vs 28 **no** |
| 7 | which purse | A 8×1+2×5 = 18 (10 coins) vs B 2×10 = 20 → **B** | same coins → **B** | A 6×5 = 30 vs B 2×20 = 40 → **B** | A 6×1+3×2 = 12 vs B 10+5 = 15 → **B** | A 7×5 = 35 vs B 2×25 = 50 → **B** | A 6×1+3×2 = 12 vs B 20 → **B** | A 9×1+2×5 = 19 vs B 20 → **B** |
| 8 | which purse | A 3×10 = 30 vs B 25 → **A** | A 10+10+10+5 = 35 vs B 20+10 = 30 → **A** | A 4×10 = 40 vs B 20+10 = 30 → **A** | A 5+5+2 = 12 vs B 10 → **A** | A 25+25+10 = 60 vs B 50 → **A** | A 5+5+5+2 = 17 vs B 10+5 = 15 → **A** | A 5+5+5+1 = 16 vs B 10+5 = 15 → **A** |
Enough purses (R3 · R4 · R5 · R6), spelled out: USD [25,10] · [25,10,1,1,1] · [25,25,10] · [25,10,10,10,1,1,1] · EURF [20,10] · [20,20] · [50,2,1] · [50,5,2,1] · EURR [20,10] · [20,20] · [50,10] · [50,5] · MXN [10,5] · [10,5,2] · [10,10,5,2] · [10,10,5,2,2] · SEK as MXN · BRL [25,5] · [25,10,5] · [50,10,5] · [50,10,10] · DKK [10,5] · [20,2] · [20,5,2] · [20,10,5,2,2] · NOK [10,5] · [10,5,1,1] · [20,5,1,1] · [20,5,1,1,1]. Which-purse purses: R7 USD/EURF A eight 1s + two 5s, B two 10s · EURR A six 5s, B two 20s · MXN/SEK A six 1s + three 2s, B 10+5 · BRL A seven 5s, B two 25s · DKK A six 1s + three 2s, B one 20 · NOK A nine 1s + two 5s, B one 20; R8 as in the table. Enough rounds: in every family 2 yes (one exactly equal, one over) and 2 no (each 1–5 short — close calls, so a glance never decides). Purse rounds: R7 = many coins lose (the trap), R8 = more coins win (so "fewer coins wins" is not a rule).

- **Answer position**: dial answers have no position. Purse rounds: which purse sits on the left is drawn at random per showing (the gate asserts 45–55 % over 400 showings). Enough tags sit in fixed order (Enough left), with yes/no answers 2/2 per level and the order-only reshuffle per pass making any yes/no sequence unpredictable.
- **Order**: order-only reshuffle per pass (`nextTask`), never the same order twice in a row; inside level 3 the two purse rounds are never adjacent.

## 7. Check, the misses, the success
- **Check with nothing done** → the first thing to do pulses (the spilled coins, the purse, the dial); bubble: "First put the coins in Pip's till." / "Pay Pip from your purse." / "Choose a purse." (no miss)
- **Count rounds**
  - miss 1 → the till's coins lift one at a time from the LEFT cup to the right, each hovering for 300 ms over the counting rail with no numbers; bubble: "Start with the coins worth the most, then count on."
  - miss 2 → the parade again, now with the running total above each coin (25, 50, 51, 52 …), the last number hidden as "?"; bubble: "Count on: {first}, {second}, … What is the last number?"
- **Pay rounds** (exact / two ways): miss 1 → the price tag and the till glow; if too much, the last coin dropped wobbles on top of its cup; bubble "That is too much — take a coin out." / "Not enough yet — Pip needs more." · miss 2 → the parade counts the till against the price with a coral line on the rail at the price; bubble "Count on to {price}."
  - fewest: right total but too many coins → the coins that can be swapped glow together (e.g. two dimes and a nickel) with a dashed outline of the one coin worth the same beside them; bubble "Right amount! Can you pay with fewer coins?"
  - trade: the lidded cup stays lidded; miss text "Give Pip coins worth the same as the {coin}."
- **Change rounds**: miss 1 → the customer's tray and the price glow; bubble "The {item} costs {price}. The customer paid {paid}." · miss 2 → count-up: the price stands on the rail, the tray's coins hop onto the rail after it, adding up toward the paid amount; a coral gap or overhang shows the difference; bubble "Count up from {price} to {paid}."
- **Enough rounds**: miss 1 → the purse's coins parade (no numbers) beside the price tag; bubble "Count the purse from the coin worth the most." · miss 2 → the parade with numbers, ending in a big "=, <, >" sign between the purse total and the price tag (signs are content).
- **Purse rounds**: miss 1 → both drawers parade together (no numbers): "More coins is not always more money." · miss 2 → with numbers, each drawer ending in its total.
- A new move removes the showing until the next Check.
- **Success** → the till drawer shuts (*ching-ching*), the item hops into its bag; the bubble names the numbers: count "**That is 53¢!**" · pay "**41¢ — paid exactly.**" · fewest "**35¢ with just 2 coins.**" · trade "**Fair trade: 25¢ for 25¢.**" · change "**70¢ + 30¢ = $1. Your change is 30¢.**" · enough "**60¢ is more than 50¢ — enough!**" / "**38¢ is less than 40¢ — not enough.**" · purse "**20¢ is more than 18¢ — even with fewer coins!**" (the formats come from the locale money formatter, §9).

## 8. Settings
1. **Coin key**: On (a small sample coin sits on each cup's lip) / Off (worth numerals only) — visibly changes the till at rest. Default **on** for the first pass, then off (the old "legend tiers" in one control).
2. **Level**: Count the coins / Pay Pip / Change and enough — the stall's furniture changes at rest (dial / purse / customer's tray).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (frozen h1 kept "Pip's Market Stall"; localized titles of the old page kept: de "Otto der Otter", fr "L'étal de Filou", es/pt/it "Otto", nl "Otto de otter"; sv/da/no/fi new) · instruction: "Help at Pip's stall: put each coin in the cup for what it is worth."
- prompts (one per kind): count "Pip tips out the till. Put the coins away, then show how much it is." · exact "The {item} costs {price}. Pay Pip exactly." · fewest "The {item} costs {price}. Use the fewest coins you can." · trade "Pip needs change for a {coin}. Give coins worth the same." · two ways "Pip paid {price} like this. Pay {price} a different way." · change "The {item} costs {price}. A customer pays {paid}. Give the change from the till." · enough "You have this purse. The {item} costs {price}. Is it enough?" · purse "Which purse holds more money?"
- buttons: "Enough" / "Not enough"; the purses carry no words — they are told apart by colour (coral, teal) and position; aria "the coral purse" / "the teal purse".
- hints and successes as in §7.
- settings: "Coin key" — "On" / "Off"; "Level" — "Count the coins" / "Pay Pip" / "Change and enough".
- **Locale traps**:
  - **currency per locale** (single source with the worksheets, `data/money/currencies.js`): en USD (¢, $1 note) · de/fr/it EUR with 1 c and 2 c · nl/fi EUR without 1 c/2 c · pt BRL (5, 10, 25, 50 centavos, R$1) · sv SEK 1/2/5/10 kr · da DKK 1/2/5/10/20 kr (holes in 1, 2, 5) · no NOK 1/5/10/20 kr (holes in 1 and 5). ✅ **es ruling (orchestrator, 2026-10-17): es = Mexican pesos** — this row's MXN tables stand. es: **MXN in whole pesos ($1, $2, $5, $10 coins, $20 note)** per the orchestrator's ruling (es = es-MX); `currencies.js` (worksheets) still says EUR for es and must follow the ruling — not this row's job.
  - **money formatting** (copied from the old `fmt()` and corrected): en "53¢" / "$1" · de "53 ct" / "1 €" (unit after, space) · fr "53 c" / "1 €" · it "53 cent" (currencies.js unit; never bare "c") / "1 euro" (invariable) · nl "53 cent" below one euro and "€ 1,50" from one euro up (the old activity wrote "€0,53" for cents — the nl reviewer confirms the groep-4 form) · fi "53 snt" / "1 €" · pt "53 centavos" / "R$ 1,00" · es "$13" (pesos) · sv/no "13 kr" · da "13 kr." (Danish writes the period). Decimal comma everywhere except en/es.
  - **Harmonized formatter (critic, rows 164/165/166 share it; supersedes any other money-format example in this file):** below one unit the cent form (en 53¢ · de 53 ct · fr 53 c · it 53 cent · nl 53 cent · fi 53 snt · pt 53 centavos); from one unit up the grade-2 split form first — de "1 € 50 ct", fr "1 € 50 c", it "1 euro e 50 cent", nl "1 euro 50 cent", fi "1 € 50 snt", pt "1 real e 50 centavos" — with the decimal form beside it only in success sentences ("(1,50 €)", "(R$ 1,50)"); en "$1" (no dollars-and-cents above $1 occur); es/sv/da/no whole units ("$13", "13 kr", "13 kr.").
  - **coin names** for TTS and aria only (en penny, nickel, dime, quarter; elsewhere "a 10-cent coin" forms authored per locale — "Zehn-Cent-Münze", "pièce de 10 centimes", "moneda de diez pesos", "moeda de 10 centavos", "tikronersmynt"…).
  - "Is it enough?" yes/no labels authored per locale ("Reicht" / "Reicht nicht", "Assez" / "Pas assez" …).
  - {item} names come from `image-vocabulary.js` via the picture labels (singular; the article is never generated — prompts are written so the noun stands without one, or with the article authored per item per locale).

## 10. Sound off, access, phones
- Silent-legible: bounces, stacks, parades with numbers, signs and bags are all visible; TTS only names coins and prices.
- Keyboard path in §5; aria-live announces drops ("dime in the 10 cup") and bounces ("that cup is for 5 cents").
- Taps: every coin ≥ 44 px hit area; cups 64 px (52 at 360, 46 at 320); dial arrows 48 px; buttons ≥ 64 px tall.
- Pictures: goods 112 px at 704, 72 px at 360, 64 px at 320 (never smaller); Pip the otter 96 px at 704, 64 px at 360/320.
- Check above the fold at 360 × 740 (578) and 320 × 640 (≈ 560).
- Phone: stacked, the till spans the width; the counter row scrolls never — at most 9 coins, 3 rows of 3 at 360.

## 11. Distinct from
- **Row 165 Price Glass** (count out by filling a glass, the price line appears at Check) and **row 166 Change Box** (the payment is changed into small coins and split between Pip and the customer): different apparatus, different verbs (sort-by-worth here; fill there; split the changed payment there).
- **Money Mat** (premium tool): a mat for paying and hearing change counted back; no worth cups, no refusing cups, no size-true coins.
- Built registry #1–#22: none uses money. Designed registry: no coin-sorting till.

## 12. Build plan
- **Core state** `{ family, level, round, kind, counter:[coin], purse:[coin], till:{worth:[coin]}, tray:[coin], dial:{t,o}, choice, misses, keyOn }`. Functions: `cupAccepts(worth, coin)` (worth equality only), `dropTo(cup)`, `tillTotal()`, `fewest(target, purse)` (unique set), `checkCount`, `checkPay(kind)`, `checkChange`, `checkEnough`, `checkPurse`, `parade(cups)` (left-to-right running totals), `nextTask`.
- **Gate's own ground truth** (`verify-worth-till-core.js`): re-implements every family's coin set and diameters; asserts every round's numbers exactly as in §6 (totals distinct per family; fewest unique; trade purse lacks the offered coin; enough 2Y/2N with one exact yes; purse R7 more-coins-loses and R8 more-coins-wins; no 0 anywhere); cups refuse every wrong worth (exhaustive over coin × cup); the size-vs-worth inversion exists in every family except MXN (asserted from the diameter table); purse side 45–55 % over 400 showings.
- **Mutations**: a cup accepting by size · en coins drawn with a letter · nl 1 c coin present · enough rounds all yes (old en) · trade purse holding the offered coin · fewest accepting 3 coins where 2 suffice · parade ordered by size not worth · change checked as tray = price · running total shown during play · coin hit area < 44 px at 360.
- **Local test**: real drags into cups (right and wrong) at 320 · 360 · 412 · 704 · 768 · 1024 · 1366 in all 8 families; every round solvable by the real pointer; parade numbers equal the gate's.
- **Pictures to verify**: `beach/seashell, starfish, kite, bucket, sunglasses, net, spade, hat` (beach contact sheet, seen by the critic: the net is a long-handled hand net drawn diagonally — lay it at −35° on its plinth; the hat is a brown felt hat; the spade is green, the shovel orange — only the spade is used) and `zoo animals/otter` (Pip). **Risks**: coin diameters per central bank (confirm; the gate holds the table); es currency ruling (flagged). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a till that spits back the wrong coin is funny and fair; coins rattling into stacks and the folding paper bag are the small shows.
2. **Would a teacher put it on the board?** Yes — knowing coin worth (without a numeral, in en) is enforced by the material; counting on from the biggest worth is the till's own layout; every round kind of the money sheets is here with true values.
3. **Would a parent trust it?** Yes — real coins at true sizes, no running total, no selling inside the play, calm and silent-legible.
4. **The invention in one sentence:** a till with a cup for every worth that only takes the coin it is named for — so you must know what each coin is worth before you can count, pay or give change.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **Pip the otter is now shown** — `zoo animals/otter` exists and is labelled in all 11 locales (the draft said the library had no otter); 96 px at 704 / 64 px at 360, clapping on success; the meerkat near-twin is barred.
- **Every purse is spelled out** (the draft left the fewest purses for EURR/MXN/SEK/BRL/NOK and all enough purses implicit) and every table re-solved per currency in `work-c31/money.js` with 0 errors: level-1 totals distinct per family; every exact price payable from its purse; every fewest answer the unique fewest multiset; trade purses never hold the offered coin; change payable from the till; enough 2 yes (one exact) / 2 no (1–5 short) in all 8 families; which-purse R7 many-coins-lose, R8 more-coins-win.
- **Coins**: Norwegian 5 kr has a centre hole too (only 1 kr was listed); coins in a cup are drawn at 0.6 scale so the 91 px Danish 5 kr fits; 6-cup families (EURF, DKK) use 52 px cups so the drawer fits 380 px (6 × 64 + gaps did not).
- es = Mexican pesos recorded as the orchestrator's ruling (no longer an open flag); nl/fi keep the 5-cent-rounded euro set (no 1 c / 2 c), sv/da/no whole kroner, pt reais without the 1-centavo coin.
- Sibling reference updated to row 166's new Change Box.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
