# New 238 — The Season Wheel → THE WHEEL THAT ONLY TURNS FORWARD (NGSS K-ESS2-1)

## 0. Identity
- id `season-wheel.play.k-ess2-1` · grade K · framework NGSS K-ESS2-1 (weather patterns over time) · strand Science · files `season-wheel-core.js`, `season-wheel-activity.js`, `season-wheel-activity.html`, `season-wheel-activities.json` (scaffold `--num=238`).
- Worksheets covered: **K-322** Four Seasons Sort and **K-207** Summer and Winter Clothes (Sort mode, Things = pictures / clothes) · **K-338** Which Season Is It? (Cards-of-three mode) · **K-339** Season Wheel: Seasons in Order (Order mode) · **K-340** What Does Not Belong? (Odd-one-out mode) · **G1-323** Months and Seasons (Months mode) · **K-341** Draw the Tree in Four Seasons — open drawing, stays a worksheet (the end-of-pass show turns the wheel through the four quarters, but nothing here asks the child to draw).
- New instrument. Correctness SoT: the reviewed seasons bank `scripts/worksheet-gen/data/b3/seasons.js` + `data/b3/locales/seasons.<loc>.json` (pools, per-locale vetoes, **pt = temperate-south** with its own pools and month map, cycle order, names) and `data/science/summer-vs-winter-clothes.json` (the 12 K-207 clothes). The activity reads these facts; it decides none.

## 1. The pitch
"The seasons sit on a wheel that only turns one way — so to get from summer back to spring you have to turn all the way round through autumn and winter: the year is a circle, and your hand feels it."

## 2. Why a child will want it again
A big wooden-rimmed wheel in four coloured quarters fills the stage, with a pointer at the top like a prize wheel. Turn it with the finger and it clicks, click-click-click, through little teeth — a pawl (a small hinged tooth at the top) rides over them like a ratchet. Try to turn it backwards and the pawl drops in with a solid *clack* and the wheel just jiggles: it will not go back. Flick it and it spins forward with inertia, clicking slower and slower, settling on a quarter. The child turns the right season under the pointer and drops the snowman in; it slides down into its quarter and sits on the rim. Over a round the wheel fills up: sleds and icicles in the blue quarter, tulips and ducklings in the green, sandcastles and popsicles in the yellow, acorns and pumpkins in the orange. The show at the end: the wheel spins one slow lap by itself, each quarter's things giving a little hop as they pass under the pointer, and the big hub picture in the centre changes with every quarter — a year going round in three seconds. Then it stops exactly where it started, because a year always comes back.

## 3. The skill and the misconception
- **Skill:** name the four seasons and put them in order as a cycle that repeats; tell which season a picture, a set of pictures, a piece of clothing or a month belongs to; spot the one picture that belongs to a different season.
- **Misconceptions and the push-back (mechanism):**
  1. *"The seasons are a list that ends"* (winter is "last"). The wheel has no end: turning forward past autumn brings winter round again, and the success show ends where it began.
  2. *"Summer is next to winter"* / any order. The ratchet only turns forward, in the true order. In Order mode a wrong sign sequence jams the wheel at the wrong boundary on the check lap — the wheel stops dead with the two quarters lit, unable to turn from one to the other.
  3. *"Spring comes before autumn, so I can go back."* To file something in the quarter just BEHIND the pointer, the child must turn three quarters forward — the backwards step is physically refused (clack + jiggle), so the order is learned by the hand, not by a rule.
  4. *Clothes for the wrong weather.* A coat dropped into the summer quarter slides down the rim, round the wheel, and stops against the pawl at the top, outside (§7) — and the winter quarter's sign flashes.

## 4. The stage
Layout **stacked at every width**: the wheel needs the full 680 px to hold its signs and pictures at the 96 px floor; the basket (or, by mode, the card / the open-quarter drawer / the month tabs) sits under the wheel, the bubble beside Check.

**At 704 px:**
- **The wheel** (520 px diameter, centred): a drawn wooden rim (14 px, 3 px ink), 4 quarters tinted with the K-322 legend colours (winter `codeBlue` pale, spring `codeGreen` pale, summer `codeYellow` pale, autumn `codeOrange` pale), 24 small teeth round the outside (apparatus geometry). In each quarter, on its middle line at radius 118 px, its **sign** — one library picture at 96 px (winter `weather/snowflake`, spring `spring/tulip`, summer `weather/sunny`, autumn `miscellaneous/leaf` (maple); **pt winter = `clothing/beanie`**, a touca, because the bank refuses every snow marker for Brazil). Signs are never used as things in the basket. Each quarter has **2 rim slots** at radius 196 px, ±24° off its middle line (pictures land there at 96 px); every round puts at most 2 things in a quarter. Geometry check: sign-to-slot centre distance 100 px, slot-to-slot 159 px, hub radius 60 — no two picture boxes touch (the gate measures the rendered boxes at every width).
- **The pointer and pawl** (top centre): a drawn brass pointer (36 px) and a hinged tooth that visibly lifts over each tooth as the wheel turns and drops in.
- **The hub** (130 px circle in the centre): shows the sign of the quarter under the pointer, large (110 px), and changes as the wheel turns.
- **The basket** (under the wheel, 680 wide): the round's things, pictures 96 px in 104 px cards, up to 6 per row (8 things = 2 rows).
- **Cards mode:** one card at a time under the wheel — three pictures of one season side by side at 96 px in a 320 × 116 card. Docked in a quarter, a card folds to a **card-back token** in that quarter's tint on a rim slot (apparatus — a record is never a shrunken picture); tapping the token unfolds it again.
- **Odd mode:** the quarter under the pointer is "open": its four things lie in **the open-quarter drawer** under the wheel at 96 px (the quarter itself shows its tint and sign plus four small tint dots, one per thing); the child flicks one out of the drawer.
- **Order mode:** three quarters are blank (dashed sign circle); the three missing signs lie in the basket.
- **Months mode:** each quarter shows 3 empty month slots (rounded tabs 84 × 40) round its rim; month tabs (the month name in 18 px) lie in the basket.

**At 360 px:** stacked — task line → wheel 328 px diameter (signs 64 px at radius 74, 2 rim slots per quarter at radius 124 ±30°, pictures 64 px; the hub sign 72 px) → at a 320 px viewport the wheel is 288 px: the quarter signs hide while a quarter holds things and the hub (always showing the top quarter's sign at 64 px) carries the sign; in Order mode no slots are used, so the signs show → basket as a horizontal scroll-free row of up to 5 cards (64 px) wrapping to 2 rows → Check. A small "turn" control pair is NOT added: only forward turning exists, and a ⟳ button (48 px, beside the wheel) turns one quarter forward for children who cannot drag.

**Library pictures** (labelled in the activity index; the seasons bank pools filtered to those labels):
- Winter: `winter/snowman`, `winter/sled`, `winter/sledding`, `winter/skiing`, `winter/skating`, `winter/snowboarding`, `winter/icicle`. Clothes: `winter/coat`, `clothing/mitten`, `clothing/snowsuit`, `winter/earmuffs`, `winter/sweater`, `clothing/scarf`.
- Spring: `spring/bud`, `spring/chick`, `spring/duckling`, `spring/lamb`, `spring/nest` (the bank's neutral spring pool; `spring/tulip` is the sign; the birdhouse is `weak` and refused). **Butterfly and bee are NOT spring markers in the north** — the bank leaves them out because they are as much summer as spring (two right quarters); only pt-BR's override adds them.
- Summer: `summer/sandcastle`, `summer/popsicle`, `summer/watermelon`, `summer/swimming`, `summer/beach`, `summer/pool`, `summer/seashell`, `summer/surfboard`, `summer/tent`. Clothes: `clothing/swimsuit`, `clothing/t-shirt`, `summer/sunglasses`, `clothing/cap` (the K-207 bank's shorts, sandals and boots have no activity label — refused until labelled).
- Autumn — the bank's neutral pool ∩ the activity labels, minus each locale's veto (computed from `data/b3/locales/seasons.<loc>.json`, measured 2026-10-17):
  - **en** `thanksgivinng/acorn`, `thanksgivinng/pumpkin`, `thanksgivinng/scarecrow` (3; en vetoes hedgehog and mushroom)
  - **de, fr, nl, sv, da, no, fi** acorn, pumpkin, scarecrow, `vegetables/mushroom` (a fly agaric — an autumn-forest marker, never food), `forest-creatures/hedgehog` (5)
  - **it** acorn, pumpkin, mushroom, hedgehog (4; it vetoes the scarecrow)
  - **es** acorn, pumpkin (2; es vetoes hedgehog, mushroom, scarecrow)
  - **pt** `fruits/persimmon`, `fruits/pear` (2; the override pool's leaf is the autumn sign, its maple/harvest/apple/grapes have no activity label)
  - **Not used (not in the bank's north pool):** `thanksgivinng/haystack` (hay is cut in summer — two right quarters), `fruits/pear` outside pt.
- **Refused:** umbrella, kite, pinecone, rainbow, raincoat, puddle (all-year or contested); every Christmas picture (summer in Brazil, and religious) — so `christmas/snowman` is never used, only `winter/snowman`; `winter/ice` and `tree/maple` (no label in the activity index — the bank uses them, the activity cannot); vetoes per locale from the bank (en: hedgehog, mushroom; es: hedgehog, mushroom, scarecrow; it: scarecrow; pt: pumpkin, mushroom, scarecrow, hedgehog, every snow picture).

**pt (Brazilian Portuguese):** the bank's `temperate-south` model — cycle starts at spring, pools are the pt `override` pools filtered to labelled pictures (winter things = `winter/coat`, `winter/sweater`, `winter/fireplace`, `clothing/scarf` — `clothing/beanie` is the pt winter SIGN; autumn things = `fruits/persimmon`, `fruits/pear` — `miscellaneous/leaf` is the autumn sign; spring adds butterfly, bee), the month map is inverted (December–February = summer). The wheel is identical; only the data differs. **Thin-pool rules (es and pt autumn = 2 things):** Sort rounds use the same two autumn things every round; the Cards autumn card holds two pictures (a card of two, stated, never padded); Odd rounds never open the autumn quarter as the container (it needs 3) — its rows move to the other three quarters, still balanced. it's Odd autumn rows use acorn, pumpkin, mushroom.

**Task line** (≤ 24 px): Sort "Turn the wheel to the right season, then drop the picture in." · Cards "Which season do these three pictures belong to?" · Order "Put the season signs on the wheel in order." · Odd "One picture is in the wrong season. Flick it out." · Months "Which season is each month in? Drop it in."

## 5. The hand
- **Turn the wheel** (drag along the rim, or anywhere on the wheel, clockwise): the wheel follows the finger angle within one frame; each tooth passing the pawl clicks (a 30 ms wooden tick); releasing with speed gives inertia (friction 0.92/frame) and the wheel snaps to the nearest quarter detent (180 ms). **Dragging anticlockwise:** the pawl drops in — *clack*, the wheel jiggles 4° and stays. The ⟳ button turns exactly one quarter forward (420 ms).
- **Drop a thing** (drag from the basket over the wheel): the quarter under the pointer lights; letting go anywhere over the wheel drops it into **the quarter under the pointer** (not where the finger is — the pointer is the slot, so turning is required). It slides down to a free rim slot (260 ms) — right — or (wrong) see §7.
- **Cards-of-three:** the card (three pictures at 96 px) is dropped the same way; on right it folds into a card-back token on the quarter's rim slot.
- **Order:** drag a sign card onto a blank quarter (any quarter, no turning needed); Check runs the lap.
- **Odd-one-out:** the open quarter's 4 things lie in the drawer; flick one (drag it up and away, or tap then tap ✕ 48 px): it flies off.
- **Months:** month tabs drop into the quarter under the pointer like things.
- **Free play:** between rounds the wheel spins freely forward; the hub shows each sign; things can be lifted out and re-dropped until Next.
- Sound (optional): ticks, clack, soft slide, a four-note motif per season on the show lap; TTS reads the task line and season names (5 locales).

## 6. The rounds
The wheel starts each round at a seeded quarter, so the turning distance to each answer varies; things in the basket are shuffled.

**Sort · pictures (8 things per round, 2 per season — each season the answer equally often):**
| # | winter | spring | summer | autumn |
|---|---|---|---|---|
| 1 | snowman, sled | bud, chick | sandcastle, popsicle | acorn, pumpkin |
| 2 | skiing, icicle | duckling, lamb | watermelon, pool | scarecrow, acorn |
| 3 | skating, snowman | nest, bud | swimming, seashell | pumpkin, scarecrow |
| 4 | sledding, snowboarding | chick, lamb | surfboard, tent | acorn, pumpkin |
| 5 | sled, skiing | duckling, nest | popsicle, beach | scarecrow, acorn |
| 6 | icicle, skating | bud, lamb | pool, sandcastle | pumpkin, scarecrow |
| 7 | snowboarding, snowman | chick, nest | seashell, surfboard | acorn, pumpkin |
| 8 | sledding, sled | duckling, bud | tent, watermelon | scarecrow, acorn |
(en table. Per locale the autumn column is re-dealt from that locale's autumn set above — de/fr/nl/sv/da/no/fi swap hedgehog into rounds 2, 5, 8 and mushroom into rounds 3, 6; it uses acorn, pumpkin, mushroom, hedgehog; es and pt repeat their two. pt's winter column is its override set. The gate generates every locale's table from these rules and asserts each picture's season against that locale's bank pool.) Every round puts exactly 2 things in each quarter = its 2 rim slots.

**Sort · clothes (K-207: 8 clothes per round, 4 winter + 4 summer; the spring and autumn quarters stay empty, and their teeth still have to be turned past):** the four summer clothes (swimsuit, t-shirt, sunglasses, cap) appear every round; the winter four rotate through the six:
| # | winter |
|---|---|
| 1 | coat, mitten, scarf, earmuffs |
| 2 | snowsuit, sweater, coat, mitten |
| 3 | earmuffs, scarf, snowsuit, sweater |
| 4 | mitten, coat, earmuffs, snowsuit |
| 5 | sweater, scarf, mitten, coat |
| 6 | snowsuit, earmuffs, sweater, scarf |
| 7 | coat, snowsuit, mitten, sweater |
(pt clothes rounds use the same 12; the bank records the K-207 exception.)

**Cards of three (K-338; 7 rounds, one card at a time, 4 cards per round = one per season, order shuffled):** each card = 3 pictures of one season from the pool, never repeating a picture within a round. Round r's cards are the pool rotated by r (deterministic table in the gate).

**Order (K-339; 8 rounds):** the given sign starts in a different quarter position and a different season each round:
| # | given season | in quarter (from top, clockwise) |
|---|---|---|
| 1 | winter | 1 |
| 2 | spring | 2 |
| 3 | summer | 3 |
| 4 | autumn | 4 |
| 5 | spring | 4 |
| 6 | summer | 1 |
| 7 | autumn | 2 |
| 8 | winter | 3 |
The basket shows the 3 missing signs in a shuffled order that is never the correct clockwise order and never its exact reverse (the bank's K-339 rule).

**Odd one out (K-340; 8 rounds):** the quarter under the pointer at start holds 3 of its season + 1 intruder; the intruder's season and its rim position (1–4) are balanced: intruder season = each of the other three seasons 2–3 times per pass; intruder position = each slot 2 times per pass.
| # | quarter | its three | intruder (season) · slot |
|---|---|---|---|
| 1 | winter | snowman, sled, icicle | sandcastle (summer) · 2 |
| 2 | spring | bud, chick, lamb | pumpkin (autumn) · 4 |
| 3 | summer | popsicle, pool, tent | skiing (winter) · 1 |
| 4 | autumn | acorn, scarecrow, pumpkin | duckling (spring) · 3 |
| 5 | winter | skating, sledding, snowboarding | watermelon (summer) · 4 |
| 6 | summer | seashell, surfboard, swimming | nest (spring) · 2 |
| 7 | spring | nest, lamb, duckling | acorn (autumn) · 1 |
| 8 | autumn | pumpkin, scarecrow, acorn | snowman (winter) · 3 |
(en. it: the scarecrow → mushroom. es and pt: rows 4 and 8 open the winter and summer quarters instead — 4 · winter: sled, skiing, icicle + duckling (spring) · 3; 8 · summer: tent, beach, pool + snowman (winter) · 3 — and pt replaces every snow thing with its winter set, every pumpkin with persimmon and every acorn with pear (pt's autumn set is persimmon + pear only). Intruder seasons stay 2–3 each per pass; the gate re-measures per locale.)

**Months (G1-323; 7 rounds, 4 months per round, one per season, 12 months over 3 rounds then repeating in a new grouping):** month names from `data/b2/calendar.js NAMES[loc].monthNames`; season from the bank's `monthSeason` (pt inverted). Rounds: {Jan, Apr, Jul, Oct} · {Feb, May, Aug, Nov} · {Mar, Jun, Sep, Dec} · {Dec, Mar, Jun, Sep} · {Jan, May, Aug, Oct} · {Feb, Apr, Jul, Nov} · {Mar, May, Sep, Dec}. Boundary months (Mar, Jun, Sep, Dec) follow the bank's meteorological map — the reviewer has already ruled them per locale.

- **Answer position:** answers are quarters, which the child must turn to; the wheel's start quarter is seeded so that, per pass, the needed forward turn for the first thing is 0, 1, 2 and 3 quarters each 2 times (gate-measured) — so "drop without turning" is right only 25 % of the time. Odd: slots balanced as above. Order: given position rotates.
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
- **Check with things left in the basket** → hint, no miss: "Turn the wheel and drop every picture in."
- **Wrong drop (Sort / Cards / Months) — miss 1:** the thing lands in the wrong quarter, then slides along the rim forward, round the wheel (the wheel itself does not move), and stops against the pawl at the top, outside the wheel; meanwhile the right quarter's sign flashes once (two pulses, 300 ms each). Bubble "That does not belong in {season}. Look which sign flashed." **miss 2 (same thing):** the right quarter tilts 6° toward the child and its rim glows; the ⟳ button shows how many quarters to turn as that many small dots (no numbers needed) · "Turn to the glowing quarter."
- **Order — Check:** the wheel makes one forward lap by itself. At each boundary it checks "is the next quarter the next season?" A wrong pair: the wheel jams at that boundary — the pawl strains (3 small shakes), the two quarters glow and an arrow flips backwards between them on the hub (e.g. winter → autumn arrow pointing back) · miss 1 "The wheel stopped. Does {season2} really come after {season1}?" · miss 2: the correct sign for the first wrong quarter appears as a dashed ghost in it · "This sign goes here."
- **Odd — miss 1 (flicked a picture that belongs):** it flies off, the wheel turns one full lap by itself and the picture lands back in the same quarter — it came home · "That one lives here. Find the one that does not." **miss 2:** the intruder wobbles. **Right flick:** the intruder flies, the wheel turns forward to the intruder's season and it drops in there.
- A new move takes the help away until the next Check.
- **Success:** the wheel turns one slow lap; each quarter's things hop as they pass the pointer; the hub changes sign quarter by quarter; it stops where it started. Bubble: Sort "{season1}, {season2}, {season3}, {season4} — and then {season1} again!" (the locale's cycle starting at the wheel's start quarter; stored names) · Order "Round and round: the seasons always come in this order." · Odd "Yes — the {thing} belongs in {season}!" · Months "Every month has its season."

## 8. Settings
1. **Mode:** sort · cards of three · order · odd one out · months — each changes the board at rest (full basket · cards · blank quarters · a full quarter · month tabs).
2. **Things** (Sort mode): pictures · clothes — visible at rest (season pictures vs clothing in the basket).

## 9. Words (EN source)
- title "The Season Wheel" · instruction "Turn the wheel — it only turns forward, like the year — and put each picture in its season."
- prompts: promptSort, promptCards, promptOrder, promptOdd, promptMonths (§4).
- hints: hintBasket "Turn the wheel and drop every picture in." · hintWrong1 "That does not belong in {season}. Look which sign flashed." · hintWrong2 "Turn to the glowing quarter." · hintOrder1 "The wheel stopped. Does {season2} really come after {season1}?" · hintOrder2 "This sign goes here." · hintOdd1 "That one lives here. Find the one that does not."
- celebrations: celebrateSort "{season1}, {season2}, {season3}, {season4} — and then {season1} again!" · celebrateOrder "Round and round: the seasons always come in this order." · celebrateOdd "Yes — the {thing} belongs in {season}!" · celebrateMonths "Every month has its season."
- season names: from the bank (`names`) — en "Fall" with "Autumn" as alt (the en panel's open item stays open; the activity uses the bank's choice).
- aria: ariaWheel "season wheel, {season} at the top" · ariaPawl "the wheel only turns forward".
- settings: setMode "Mode" · modeSort "Sort" · modeCards "Cards of three" · modeOrder "Seasons in order" · modeOdd "Odd one out" · modeMonths "Months" · setThings "Things" · thingsPictures "Pictures" · thingsClothes "Clothes".
- **Locale traps:**
  - **pt-BR southern seasons** (bank `temperate-south`): inverted months, no snow pictures, cycle starts at spring; Christmas pictures refused everywhere.
  - Season names are lower-case common nouns in fr/es/it/pt/nl/sv/da/no/fi ("printemps", "kevät") and capitalised nouns in de ("Frühling") — the bank stores the form; sentence-initial capitalisation in celebrateSort is done by `toLocaleUpperCase` of the first letter only.
  - "In {season}": prepositions differ (fr "au printemps / en été / en automne / en hiver", de "im Winter", fi essive/adessive "talvella, keväällä, kesällä, syksyllä") — every hint with a season inside is stored whole per season per locale (4 variants), never assembled.
  - "{thing} belongs in…" needs the thing's article/gender (fr "le/la", de "der/die/das") — celebrateOdd is stored as "Yes — this one belongs in {season}!" in gendered locales (the picture is right there), so no article is generated.
  - Month names from `calendar.js` (lower-case in fr/es/pt/it/nl/sv/da/no/fi); boundary months follow the bank.
  - Clockwise = forward for every locale (the wheel's order is the bank's `cycle`).

## 10. Sound off, access, phones
- Sound off: the ratchet's refusal is a visible jiggle and pawl drop; wrong things slide round to the pawl; the jam on the order lap is visible; the hub shows the season.
- Keyboard: → (or Space) turns one quarter forward (← does the clack-jiggle, nothing else); Tab to a basket thing, Enter drops it into the quarter at the top; Order: Tab to a sign, then Tab to a blank quarter, Enter; Odd: Tab across the 4 rim things, Enter flicks.
- aria-live: "Winter at the top" · "Sled: winter" · "The wheel stopped between summer and spring."
- Taps: basket cards ≥ 64 px; the ⟳ button 48 px; rim things 64 px; month tabs 84 × 44.
- Pictures: signs, rim slots and basket 96 px at 704; 64 px at 360. Docked cards are card-back tokens (apparatus).
- Fold at 360 × 740: header 56 + task 52 + wheel 320 + basket 2 × 72 + Check 56 = 628 px. At 320 × 640: wheel 288, basket 2 × 68 → 588 px. Check above both.

## 11. Distinct from
- **The Moon Between Every Day** (new 210: the week as a necklace with a night between days) — a cycle too, but of days, built from beads; here the cycle is enforced by a one-way ratchet you turn.
- **The Spring Switch** (row 25) and the **number-drum** tool (rings that carry) — not a ratchet sort.
- **calendar-wall** tool (weather graph) and **The Weather Window** (239, same batch: today's weather) — this is the year.
- **Sorting Chutes / sorting-hoops** — containers; here the container must be TURNED to, so order is part of every drop.

## 12. Build plan
- **Model (core):** `state = { mode, things, angleQ /* quarter at top, 0..3 */, quarters:[{season, sign, items:[]}], basket:[], misses }`. `turnForward(n)` (n ≥ 0 only; negative → `{refused:true}`); `drop(id)` → into `quarters[angleQ]`, right iff season matches, else `{slideToPawl:true}`; `placeSign(q, season)`; `checkOrderLap()` → first boundary `i` where `next(quarters[i].season) !== quarters[i+1].season` or null; `flick(slot)`; `nextTask` order-only.
- **Gate ground truth (`verify-season-wheel-core.js`, own tables):** each picture's season equals the bank's pool (per locale, after veto/override) — the gate keeps its own copy; every picture key exists in the activity index and is not refused (no christmas/*, no umbrella/kite/pinecone/rainbow); per round each season appears equally; pt rounds use only pt pools and the southern month map; order rounds' basket never in correct or reversed order; odd intruder season/slot balance; start-quarter turn distribution 0/1/2/3 = 2/2/2/2 per pass; backwards turning is refused in every state.
- **Mutations:** backwards turn allowed · drop goes to the finger's quarter not the pointer's · wrong season accepted · pt uses north months · a Christmas picture admitted · a season over-represented · order check lap passes a wrong pair · order basket in correct order · odd intruder always slot 1 · start quarter fixed (no turning needed) · fixed shuffle · season name assembled with a generated preposition.
- **Pictures to re-open at 64 px:** sledding/skating/snowboarding (children doing winter sports — read as winter), nest (bird's nest with chicks — spring), seashell (summer at the beach; the bank kept it), mushroom (a fly agaric — read as autumn forest, never as food), persimmon and beanie (pt).
- **Risks:** autumn is the thin season (en 3, it 4, es and pt 2 after vetoes — §4 thin-pool rules) — rounds reuse them across a pass (allowed: different rounds); more autumn art would help (`tree/maple`, `winter/ice` and the bank's `thanksgivinng/harvest`, `thanksgivinng/apple` exist as files but lack activity labels — request labels).
- **BLOCKED:** nothing; K-341 (drawing) is not covered by design.

## 13. The four questions
1. **Choose it again?** A clicking prize-wheel that refuses to go back, flick-spins, things sliding round to the pawl, a year-lap show — very much a toy.
2. **On the board?** "Can we go back to spring?" — the wheel says no; the class has to go round. The order and odd modes are exactly the K-339/K-340 lessons.
3. **Parent trust?** Library pictures, reviewed per-locale season data (incl. Brazil's southern year), no score, no shaming.
4. **The invention:** "The seasons sit on a ratchet wheel that only turns forward — to file anything you turn the year round to it, so the cycle is felt in the hand."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Season data now follows the bank exactly.** The design had added butterfly and bee to spring and haystack and pear to autumn in every locale — none is in the bank's north pools (butterfly/bee and hay are summer too: two right quarters). Removed; spring = bud, chick, duckling, lamb, nest; autumn = the per-locale set computed from the bank's pool, labels and vetoes (en 3, it 4, es 2, pt 2, the rest 5). Sort and Odd tables rewritten; thin-pool rules for es/pt (cards of two, no autumn container in Odd).
- **pt winter sign is a beanie,** not a snowflake (the bank refuses every snow marker for Brazil); the pt leaf/beanie are signs, never things.
- **Picture floor:** signs were 80 px and rim slots 72 px at 704. The wheel is now 520 px in a stacked layout with 96 px signs and 2 rim slots per quarter (measured geometry: no boxes touch); Cards dock as card-back tokens; Odd opens the quarter into a drawer at 96 px.
- **Still uncovered, honestly:** K-341 (draw the tree in four seasons) — the library has no seasonal tree states (rulings), so it stays a worksheet.
