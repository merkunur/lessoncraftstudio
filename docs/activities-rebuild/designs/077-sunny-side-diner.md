# Row 77 — The Magnet Plates and the Golden "And" (L.K.1.f)

## 0. Identity
- id `sunny-side-diner.compound-order.l-k-1-f` (KEPT) · grade K · Common Core L.K.1.f (produce and expand complete sentences in shared language activities) · strand Language · page title (frozen) "Sunny-Side Diner — Say the Whole Order (Kindergarten)" · own files `mini tools/magnet-plates-core.js`, `magnet-plates-activity.js`, `magnet-plates-activity.html`; manifest row stays in `sunny-side-diner-activities.json` (id, slugs, title, intro frozen), `tool` repointed. The old `compound-order-core.js` is left untouched (read-only reference for its read-back validity: coupler + each food + each count).
- worksheets it covers: none mapped (the coverage map lists none); the activity carries L.K.1.f alone.
- what the old activity did: be the waiter — listen to a compound order, gather the food on the tray, then say the order back as one sentence, joining the parts with a golden "and" coupler; four round types (assemble, insert-and, repair the robot's order, extend with a third item); SVG placeholder customers and food; en + fr. **Kept:** everything the frozen intro promises — LISTEN and gather the whole order on the tray, then SAY THE ORDER BACK as one complete sentence joined by the golden "and" coupler, the customer smiles — plus the four round types, the round data shapes, the customers (bear, cat, mouse, robot) and the fr surface tables as the panel's seed. **New:** library pictures for every food and customer, the magnet plates, the sentence rail with its start and end caps, the hatch that only opens on a complete sentence, the "and" that turns into a comma.

## 1. The pitch
"Order plates are magnets that push each other apart — only the golden 'and' holds two of them together, and the kitchen hatch only opens when the sentence has a beginning, its plates joined, and an end."

## 2. Why a child will want it again (the fun)
- **Magnets you can feel.** Slide one order plate toward another and it *pushes back* — the plates slip apart with a springy wobble, however hard you shove. Then you lift the golden "and" off its hook and drop it into the gap: *clack* — the plates pull in and lock, and the words read as one. Children push the plates together just to feel them refuse.
- **The hatch.** At the end of the rail is the kitchen hatch, a little shutter. It only rolls up when the rail is a whole sentence — the "I would like" cap at the front, the plates joined, the "please." cap at the end. Then the sentence slides through the hatch word by word (each word lights as it is read), the plates come back as real food on the customer's table, and the customer (a library bear, cat, mouse, pig, rabbit — or the robot) gets its order.
- **The comma trick.** When a customer says "…and one more thing!", a third plate arrives. Drop a second "and" between plates two and three and the first "and" *shrinks and turns into a comma* (its letters slide away, the gold bead stays as a comma) — one of the most satisfying little transformations in the diner.
- **The robot gets it wrong.** In the repair rounds the robot waiter's sentence is on the rail with one plate wrong; swapping it is a joke the child is in on.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** gather an order heard or seen (SL.K.2), then produce it as ONE complete sentence — a beginning, the parts joined with "and", an end — and expand it with a third part (L.K.1.f).
- **Misconception 1 — "just say the things" ("two pancakes, milk").** Without the coupler the plates will not touch; the rail stays two pieces; the hatch stays shut.
- **Misconception 2 — a sentence without its beginning or end** ("two pancakes and milk"). The hatch only opens with both caps: the beginning ("I would like", with its capital I) and the end ("please." with the full stop).
- **Misconception 3 — "and, and, and" for a list.** When a third plate is joined, the first coupler becomes a comma by itself — the rail shows how a three-part order is said.
- **Misconception 4 — losing a part of the order** (the robot's mistake; forgetting the count). Every plate shows its count and its picture; a plate that does not match the ticket is a visibly wrong plate.

## 4. The stage
No split layout: the rail is the widest thing on the stage (start cap 112 + 2 plates 240 + coupler 64 + end cap 88 + hatch 64 + gaps = 600 px), so the stage takes the full 704 px and the bubble sits UNDER the rail. With three plates (Level 4: 112 + 360 + 2 × 64 + 88 + 64 + gaps ≈ 790 px) the rail **bends onto a second line after the first coupler** at every width (the same drawn bend as the phone layout), so reading order stays left→right, top→bottom.

**At 704 px** (stage 704 × 500; the booth, counter and tray are centred in a 560-px column above the full-width rail):
- **The customer booth** (top, 500 × 120): the round's customer (library picture, **110 px**) at a drawn table; the **order ticket** beside it (180 × 96 paper slip): the order as pictures + numerals ("2 [pancake] [pancake]", "1 [milk]"), food pictures 40 px each in the ticket. In *Listen* mode the ticket folds shut after the customer has "spoken" (§5).
- **The counter** (middle, 500 × 130): four food bins (drawn bins 96 × 96 with the **library food picture 80 px** in each): the order's foods + two others.
- **The tray** (on the counter's right, 160 × 110): drop food here; items line up in groups.
- **The sentence rail** (bottom, 500 × 110): a brass rail. At its left sits the **start cap** (rounded block "I would like", 112 × 64), at its right the **kitchen hatch** (a drawn shutter 64 × 90). Between them, the **order plates** (each 120 × 72: a plate disc with the food picture 48 px and the phrase "two pancakes" — Nunito 18 px bold). The **end cap** ("please." block 88 × 64) waits on a hook above the hatch; the **golden "and" couplers** (gold bead-block 64 × 44, the word in 20 px) hang on a hook beside the start cap — two of them in extend rounds.
- **Task line** above (≤ 24 px). **Bubble** under the rail (≤ 2 lines); Check under the bubble, its bottom ≤ 640 at 704 × 760.

**At 360 px** (stacked; stage 360 × 640): booth 360 × 96 (customer 72 px, ticket 160 × 80, food in ticket 32 px); counter 4 bins 80 × 80 (food **64 px**); tray under the bins 320 × 80; the rail **wraps onto two lines** (a rail with a bend: start cap + plate 1 + coupler on line 1, plate 2 + end cap + hatch on line 2), plates 128 × 60 (food 40 px, phrase 15 px); Check under the bubble: Check bottom ≤ 728 at 360 × 740; at 320 × 640 the booth shrinks to 64 px high (customer 56 px) and the counter bins to 72 px (food 64 px — the bins' pictures stay ≥ 64), Check bottom ≤ 636.

Words on the stage are content: the phrases on the plates, the caps, "and", the ticket numerals.

## 5. The hand
**Phase 1 — gather (the tray).**
- The customer "speaks": its ticket opens with a paper flick and (TTS where available) the order is read: "I would like two pancakes and milk, please." In *Show* mode the ticket stays open; in *Listen* mode it stays open 5 s (sound-off locales: 7 s) and then folds; a tap on the folded ticket re-opens it once (the second re-open is the miss-2 help).
- Drag a food from a bin onto the tray (or tap a bin: one item flies to the tray, 220 ms, a soft plop). Items of the same food line up together; drag an item back to its bin to remove it.
- Check (phase 1): the tray is compared with the order; right → the tray's groups **turn into order plates** that drop onto the rail (phase 2).

**Phase 2 — say it back (the rail).**
- Plates sit on the rail apart. Dragging a plate toward its neighbour: within 40 px the neighbour slides away (magnet repulsion, 160 ms, a springy wobble, a low "bwoing"); plates can be reordered by dragging past each other (both orders of the parts are accepted — the order of the parts is not the skill).
- **Golden "and":** drag it from the hook into the gap between two plates: the plates pull in and lock (120 ms, *clack*), the coupler glows. Dropped anywhere else (on a single plate's open end, before the first plate) it slides off and returns to its hook — an "and" needs something on both sides.
- **End cap:** drag "please." from its hook to the end of the last plate (it docks next to the hatch).
- **Comma trick (extend rounds):** with three plates, dropping the second coupler between plates 2 and 3 makes the FIRST coupler shrink: its letters slide out, the gold bead stays as a **comma** (300 ms) — per locale (§9).
- Check (phase 2) → if complete, the hatch rolls up and the sentence slides through it (each word lights as it is read, 280 ms per word), then the food appears on the customer's table and the customer bobs.
- **Free play:** at any time the plates can be pushed (to feel the magnets); after the round the child can tap the hatch to hear the sentence again.

## 6. The rounds
One round = one customer's order: phase 1 gather, then phase 2 say it back (the gather phase is skipped in insert-and and repair rounds, which start on the rail). Counts are 1–3 (never 0); one-item phrases use the indefinite form ("a waffle", "an orange"). The drinks are mass nouns and take NO article and no number in en ("two pancakes and milk"): their ticket line is the picture alone (no numeral), the tray takes exactly one bottle, and the plate says "milk" / "juice". (The old "a milk" was diner slang; a complete-sentence activity models the standard form.)

**Level 1 — Gather and say it back (assemble), 8 rounds:**

| # | customer | order | other bins |
|---|---|---|---|
| 1 | camping/bear | 2 pancakes + 1 milk | croissant, juice |
| 2 | pets/cat | 2 croissants + 1 juice | waffle, milk |
| 3 | pets/mouse | 1 waffle + 2 bananas | cookie, apple |
| 4 | farm-animals/pig | 3 cookies + 1 milk | donut, banana |
| 5 | pets/rabbit | 2 muffins + 1 juice | cupcake, orange |
| 6 | camping/bear | 1 bagel + 3 strawberries | muffin, apple |
| 7 | pets/cat | 2 donuts + 1 orange | pancake, juice |
| 8 | pets/mouse | 3 apples + 1 cupcake | banana, cookie |

**Level 2 — The missing "and" (insert-and), 7 rounds.** The rail is pre-built from the ticket with the start cap and the plates apart, no coupler, and (in rounds 4–7) no end cap: 1 bear 3 cookies + 1 milk · 2 cat 2 muffins + 1 juice · 3 rabbit 1 waffle + 1 orange · 4 mouse 2 bananas + 1 milk · 5 pig 2 pancakes + 1 juice · 6 bear 3 strawberries + 1 bagel · 7 cat 1 croissant + 2 apples.

**Level 3 — Fix the robot's order (repair), 7 rounds.** Customer toys/robot; its sentence is on the rail, complete, with ONE mistake against the ticket; the counter offers the right plate + one more; the child swaps the wrong plate (drag it to the bin; drag the right plate in — the coupler re-locks):
1 ticket 2 croissants + 1 milk — robot has "juice" in slot 2 · 2 ticket 1 pancake + 2 bananas — robot "a waffle" in slot 1 · 3 ticket 3 cookies + 1 juice — robot **"two cookies"** (wrong count; the counter offers a "three cookies" plate) · 4 ticket 2 muffins + 1 orange — robot "an apple" in slot 2 · 5 ticket 1 bagel + 2 strawberries — robot "a donut" in slot 1 · 6 ticket 2 donuts + 1 milk — robot "three donuts" (count) · 7 ticket 1 waffle + 3 apples — robot "three bananas" in slot 2.

**Level 4 — "And one more thing!" (extend), 7 rounds.** Phase 1 as Level 1 with a two-part ticket; when the rail is complete the customer adds a third item (ticket unfolds a third line); a third plate drops at the end; the child moves the end cap off, adds a second coupler between plates 2 and 3 (the first turns into a comma), and re-docks the end cap:
1 mouse 2 pancakes + 1 milk → + 1 croissant · 2 bear 1 waffle + 1 juice → + 2 bananas · 3 cat 2 cookies + 1 milk → + 1 apple · 4 rabbit 3 strawberries + 1 juice → + 1 muffin · 5 pig 2 donuts + 1 orange → + 1 milk · 6 bear 1 bagel + 2 apples → + 1 juice · 7 mouse 2 cupcakes + 1 milk → + 3 strawberries.

**Answer position.** Phase 1: the order foods' bins are placed among the four bins so each bin slot holds an order food equally often across a level (gate: per slot 4 ± 1 of 8 in Level 1); repair: the wrong plate is in slot 1 in rounds 2, 3, 5, 6 and slot 2 in rounds 1, 4, 7 (4/3; two of the seven are count mistakes). There is no choice to guess in phase 2: it is a construction whose completeness the hatch checks.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing done** (phase 1 empty tray): hint, no miss — "What did the customer order? Put it on the tray." (phase 2 untouched): "Join the plates to make one sentence."
- **Miss 1 — phase 1:** the ticket reopens beside the tray and each ticket line lights next to its tray group: a missing or extra item blinks · "Look at the ticket: how many of each?" **Phase 2:** the hatch stays shut and rattles once; the missing piece's *place* glows — the empty gap between plates (a pulsing dashed gold outline), the empty end-of-rail dock, or the wrong robot plate (a soft red-free amber outline) · by case: "The plates won't hold together. What joins them?" / "The sentence needs its end." / "Look at the ticket — one plate is not what the customer asked for." / (extend, three plates, one coupler) "Three things! Join the last two as well."
- **Miss 2:** the needed piece itself moves: the golden "and" lifts off its hook and hovers over the gap (or the end cap over the dock, or the right plate over the wrong one), waiting for a tap to drop · "Tap the glowing piece to put it in."
- **A new move takes the help away** until the next Check.
- **Success:** the hatch rolls up, the sentence slides through word by word, the food appears at the customer's table, the customer bobs · "“I would like two pancakes and milk, please.” One whole sentence — the customer is smiling!" (extend: "…two pancakes, milk, and a croissant, please." — "Three things in one sentence!")

## 8. Settings
1. **Order:** Show the ticket (default) · Listen (the ticket folds after 5 s, SL.K.2). Visible at rest: the ticket's fold crease and a small ear icon (geometry) on its corner.
2. **Round types:** Gather and say (L1) · Missing "and" (L2) · Fix the robot (L3) · One more thing (L4) — via the level picker; the rail's starting state shows at rest.

## 9. Words (EN source)
- title (shell): **Sunny-Side Diner** (frozen) · instruction: "Gather the order, then say it back as one whole sentence with the golden “and”."
- task lines: L1 phase 1 "Put the whole order on the tray." · phase 2 "Join the plates into one sentence." · L2 "Join the plates into one sentence." · L3 "The robot made a mistake. Fix the order." · L4 "One more thing! Add it to the sentence."
- caps and couplers: start cap "I would like" · end cap "please." (the rail renders the comma before it: "…and milk, please.") · coupler "and".
- plate phrases (EN, all authored literally, never built by code): "a pancake / two pancakes / three pancakes", "milk", "juice", "a croissant / two croissants", "a waffle", "two bananas", "three cookies", "two muffins", "a cupcake / two cupcakes", "a bagel", "three strawberries", "two donuts", "an orange", "an apple / three apples".
- hints/celebrations: §7 exactly. Settings: "Order", "Show the ticket", "Listen", "Round types", "Gather and say", "Missing and", "Fix the robot", "One more thing". aria: "Sentence rail: {sentence so far}", "Plate: {phrase}", "Golden and", "Kitchen hatch, {open|closed}".

**Locale traps (every phrase, cap and comma rule is per-locale data written by the native panel):**
- **"And":** de und, fr et, es y (becomes **e** before an i-/hi- sound — no food phrase begins with one, the gate checks), pt e, it e (ed optional before a vowel — the panel rules), nl en, sv och, da og, no og, fi ja.
- **Indefinite article, gender and case** are inside each plate phrase: de accusative after "Ich hätte gern" (**einen** Muffin, **eine** Banane, **ein** Croissant); fr un/une; es un/una; it un/uno/una/un'; pt um/uma; nl een; sv en/ett (ett äpple); da en/et; no en/ei/et; fi has no articles and **numerals take the partitive singular** (kaksi pannukakkua) while one item takes the object form after "Saisinko" (maidon) — all literal.
- **Mass nouns** (milk, juice): en uses the bare noun ("…and milk, please"); each panel picks its natural café form for ONE serving — fr "du lait" or "un verre de lait", de "eine Milch" (natural in a café), es "una leche" is odd → "leche", fi partitive "maitoa" — and the plate shows that exact phrase; the ticket never puts a numeral before a mass noun in any locale.
- **The polite frame and end mark:** en "I would like … , please." · de "Ich hätte gern … , bitte." · fr "Je voudrais … , s'il vous plaît." · es (MX) "Me da … , por favor." · pt (BR) "Eu queria … , por favor." · it "Vorrei … , per favore." · nl "Ik wil graag … , alstublieft." · sv "Jag skulle vilja ha … , tack." · da "Jeg vil gerne have … , tak." · no "Jeg vil gjerne ha … , takk." · **fi "Saisinko … , kiitos?" — the polite request is a QUESTION: the fi end cap carries "?"**, and the hatch accepts the fi sentence only with it.
- **The comma trick per locale:** the first "and" becomes a comma in all 11; **en keeps a comma before the last "and"** (serial comma, the common US school form: "two pancakes, milk, and a croissant") — data flag `serialComma: true` for en only, so the en second coupler shows ", and"; every other locale has no comma before its "and". The reviewer confirms the en choice.
- **Numerals vs number words:** plates show number WORDS ("two pancakes") — the read-back is a sentence; the ticket shows numerals + pictures (sound-off legibility).
- **Customers:** library animals have no grammatical role in the sentence (the customer speaks in the first person) — no gender agreement needed.
- Sound off: the ticket, the plates and the hatch carry everything; Listen mode still works silently because the ticket is shown before it folds.

## 10. Sound off, access, phones
- Silent legibility: ticket pictures + numerals; plates with pictures; the magnet gap; the hatch open/shut.
- Keyboard: Tab to bins, Enter adds one item, Shift+Enter removes one; on the rail, Tab to the coupler/end cap, Enter picks it up, ← / → choose a gap, Enter drops; Space = Check.
- aria-live: "The plates push apart — they need something to join them." / "Joined: two pancakes and milk."
- Taps: bins 96/80 px, coupler 64 × 44, caps ≥ 88 × 64 (72 × 52 at 360), plates 120/128 wide.
- Pictures: customer 110 px, bins 80 px (≥ 64 at 360), plate pictures 48/40 px (supporting the phrase, not the task picture — the task picture is the bin food at ≥ 64).
- Phone: the rail wraps with a bend; the hatch sits at the end of line 2.

## 11. Distinct from
- **Row 75 Daisy's Plate Stack (this batch)** — same diner world; a socket that opens with the second plate builds a word; here magnet plates and a coupler build a sentence.
- **#278 Full-Stop Gate** — splits a run-on word train into sentences with a gate; here parts are joined into one sentence and the hatch checks for a beginning and an end.
- **#280 True Caption** — composes captions checked against a scene; no coupler physics.
- **Premium story-line / reading-easel** — no conjunction mechanic.
- No built activity uses repelling pieces that only a connector can join.

## 12. Build plan
- **Core state** `{level, round, phase:'tray'|'rail'|'done', ticket:[{food, qty}], tray:{food → n}, rail:{start:true, pieces:[{type:'plate', food, qty} | {type:'and'} | {type:'comma'}], end:bool}, misses}`; functions `addToTray(food)`, `removeFromTray(food)`, `checkTray()` → `{ok, diff}`, `makePlates()`, `dropCoupler(gapIndex)` → `{held}`, `dockEnd()`, `swapPlate(i, plate)`, `normalize()` (the comma rule: with k plates joined by k−1 couplers, all but the last become commas; en keeps ", and"), `sentence()` (the literal per-locale string assembled ONLY from authored pieces), `checkRail()` → `{ok, reason:'gap'|'end'|'wrong-plate'|'count'|'extend-gap'}`.
- **Gate's own ground truth** (`verify-magnet-plates-core.js`): its own copy of each round's expected sentence per locale (both part orders) — the core's `sentence()` must equal one of them only when `checkRail` is ok; plates never touch without a coupler (asserted for every adjacent pair); a coupler dropped outside a gap returns to the hook; the hatch never opens without both caps; extend rounds produce exactly one comma (en: ", and"); repair rounds have exactly one wrong plate vs the ticket; bin-slot balance; fi sentences end with "?"; es "y" never precedes an i-/hi- word; every customer/food picture exists and is colour.
- **Mutations:** plates join without a coupler · coupler held on a single plate · hatch opens without the end cap · first coupler stays "and" in extend · en loses the serial comma / another locale gains one · repair round with two wrong plates · tray accepts wrong count · plate phrase built by code from parts (detected by a phrase-table equality check) · fi end mark "." · bins always put the order foods first.
- **Pictures to verify:** breakfast pancake, croissant, donut, muffin, banana, apple, orange, strawberry, milk (seen 2026-10-17 — milk is a bottle; the plate says "milk"); bakery waffle, cookie, cupcake, bagel; at-the-supermarket/juice (verify it is in the theme JSON and reads as juice — fallback: breakfast has none, so the round's drink becomes milk); camping/bear, pets/cat, pets/mouse, farm-animals/pig, pets/rabbit, toys/robot (seen pets + farm sheets; verify camping/bear and toys/robot).
- **Risks:** the two-line rail at 360 must keep the reading order obvious — a drawn bend arrow joins line ends; long German/Finnish phrases — plates grow to fit (max 2 lines of 15 px), and the gate renders the longest phrase of every locale at 320 to check fit.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — plates that push back, a golden "and" that clacks them together, a hatch that rolls up, a robot to correct, and an "and" that turns into a comma.
2. **Would a teacher put it on the board?** Yes — a complete sentence has a beginning, joined parts and an end, and the apparatus will not accept less; expanding with a third part shows the comma rule.
3. **Would a parent trust it?** Yes — real food and animal pictures, polite natural phrases in their own language, no scores.
4. **The invention:** order plates are magnets that repel — only the golden "and" holds them together, and the hatch opens only for a whole sentence.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **The model sentence was not standard English:** "two pancakes and a milk, please" in an activity about complete sentences. Drinks are now mass nouns with no article and no numeral ("…two pancakes and milk, please"): the ticket shows the picture alone, the tray takes one bottle; per-locale café forms noted (de "eine Milch" is natural; es "leche"; fi partitive).
- **Layout did not fit:** a two-plate rail is ~600 px and a three-plate rail ~790 px, but the stage was a 500-px split column. Now full-width at 704 with the bubble under the rail, and the three-plate rail bends after the first coupler at every width (same bend as on the phone); Check position at 704 given.
- Every picture (breakfast, bakery, at-the-supermarket/juice, camping/bear, pets, toys/robot) checked present in the theme JSONs.
