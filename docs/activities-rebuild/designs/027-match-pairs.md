# Row 27 — Make the Number → THE TWO-ENDED LANTERN STRING (K.OA.A.3)

## 0. Identity
- id `match-pairs.make-the-number.k-oa-a-3` (KEPT; slugs/metadata frozen in all 11 locales) · grade K · CCSS K.OA.A.3 · Operations & Algebraic Thinking · own files `lantern-string-core.js`, `lantern-string-activity.js`, `lantern-string-activity.html`, `lantern-string-activities.json` (this row leaves `match-pairs-activities.json`; the other match-pairs rows — three-form, find-the-missing, compare — stay on their engine untouched; the id is unchanged).
- Frozen title "Make the Number"; frozen intro promises: find pairs of numbers that add up to the target; tap a number, then tap its partner, and watch the pairs link; decompose numbers ≤ 10 into pairs in more than one way. **All kept true** (tap one, tap its partner, the pair links — now into a lantern on a garland).
- Worksheets also covered: **K-273** Number Bonds to 5 · **K-274** Number Bonds Within 10 · **K-414/415/416/417** Number Bonds of 6/7/8/9 (a PAIR UP board for each whole) · **K-243** Number Bonds to 10 · **K-277** Make Ten with Counting Dots (the string is ten bulbs in two fives; the "Dots" setting puts dot patterns on the cards) · **K-276** Find the Whole (WHOLE rounds: two cards light the string from both ends and the child names how long it is).
- Old activity: tap-to-pair numeral cards for a target; 18 tasks, targets 3–10, boards of 4–8 cards including 0-pairs (0 + 3 … 0 + 10); a Check at the end; linked pairs drawn as lines. **Kept:** tap a number then its partner; the targets 3–10; the board idea (every pair of a whole on one board); the multi-board progression; Check. **Changed:** every 0 card is gone (counting never includes 0); a pair is now tested by **lighting a string of exactly N bulbs from both ends at once**, so a wrong pair shows its own error; three new round kinds cover the missing part, the whole and make-ten.

## 1. The pitch
"The target is a string of lanterns: your first number lights it from the left, your second from the right — if they meet exactly in the middle, the whole string glows; if they cross, the doubled bulbs flicker; if they fall short, the dark ones show the gap."

## 2. Why a child will want it again (the fun)
- **Two lights racing toward each other.** Tap a card and coral light runs along the string from the left, bulb by bulb, with rising plinks; tap the partner and teal light runs in from the right. Children hold their breath to see whether the fronts will kiss.
- **The kiss.** When they meet exactly, there is a tiny spark where they touch, the whole string flashes warm gold and hums a chord, and the two cards float up and hang on the garland line above as a pair of paper lanterns (`3 + 7`) that sway.
- **Honest mistakes are pretty, not red.** If the two lights cross, the bulbs lit twice glow white-hot and flicker like over-filled fairy lights before fading — a child sees "two too many" as two flickering bulbs. If they fall short, the dark bulbs in the middle are plain to count.
- **The garland fills.** By the end of a board the garland across the top holds every pair of the number as swinging lanterns — a decoration made of number bonds.
- **Free play ("Lantern maker"):** pick any string 2–10 and light it with any two cards; or tap only one card and watch the light stop.

## 3. The skill and the misconception
- **Skill (K.OA.A.3):** decompose a number ≤ 10 into pairs in more than one way and record each pair (`7 = 3 + 4`); the worksheets add the missing part (`10 = 7 + ?`), the whole (`? = 4 + 3`) and make-ten.
- **Misconception 1 — "any two numbers that are near the target go together" / guessing pairs by look.** **Push back:** the string has exactly N bulbs; the two lights measure each other. 4 + 5 on a string of 8 leaves one bulb lit twice — it flickers; 2 + 5 leaves one dark. The material shows the size of the error, not just that it is wrong.
- **Misconception 2 — "there is only one pair for 8."** **Push back:** the board holds every pair; the garland has a dashed hook for each pair still missing, so the child can see three of four are found.
- **Misconception 3 — "the bigger number is always first."** The first card tapped lights from the left, so 3 then 7 and 7 then 3 both light the string fully — from opposite ends. The garland records the pair the way the child made it; tapping a found pair's lantern plays it the other way round (light from the other ends), the commutativity shown, never told.
- **Misconception 4 — counting 10 from 1 every time (K-277).** The string of ten has a visible gap after bulb five, and the lights cross that gap, so 7 = "five and two more" can be seen.

## 4. The stage
Layout `split` at ≥ 700 px (string + cards left, garland + bubble right); stacked below.

**At 704 px (left 452, right 196):**
- **Task line** 22 px: the prompt (§9).
- **The lantern string** (452 × 120 px, the hero, centred at the top of the left column): a drawn cord (3 px ink, slight catenary sag) carrying N round bulbs (40 px glass circles, 2 px ink outline, a small brass cap). For N > 5 a 14 px gap separates bulbs 5 and 6 (the five-structure). N bulbs are drawn evenly across 420 px; at N = 10 the bulbs are 36 px. The string's two ends are **sockets** (24 px brass plugs): the left socket coral, the right socket teal. The whole N sits on a tag hanging from the cord's centre (40 px digits) — in WHOLE rounds the tag is blank.
- **The card board** (452 × 220 px, under the string): numeral cards 80 × 92 px (cream, 3 px ink, 48 px Baloo 2 digit), in up to two rows of five, centred; a found card leaves a faint outline where it was.
- **MISSING rounds:** the given card is plugged into the left socket (shown attached by a short cord) and its bulbs are already lit coral; four candidate cards sit in a tray under the string.
- **The garland** (right column, 196 × 210 px): a drawn line with one dashed hook per pair the board holds; a found pair hangs as two small paper lanterns (36 px, coral and teal, numerals 20 px) joined by a "+" bead, with `= N` written under the hook in 16 px.
- **Bubble** (≤ 3 lines) under the garland; speaker 36 px; **Check** (= "Light it") only in MISSING / WHOLE rounds (in PAIR UP each pair is its own test).

**At 360 px:** stacked: task line → string 336 × 92 (bulbs 30 px; at N = 10 bulbs 28 px, gap 10 px) → card board (cards 60 × 72 px, digits 36 px, two rows of up to five → 5 × 60 + 4 × 8 = 332 px) → garland as a strip of lantern pairs 336 × 64 → bubble → Check. Check bottom ≈ 640 px at 360 × 740. At 320 × 640: cards 56 × 64, bulbs 26 px, garland strip 300 × 52; Check ≈ 600 px.

**Words on the apparatus:** numerals only (cards, the whole tag, the garland's lanterns). No library pictures are needed — the bulbs are the counted material; this is apparatus geometry (LAW rule 5). The "Dots" setting adds dot patterns (drawn dots, ten-frame layout) under each card's numeral.

## 5. The hand
- **Tap a card (first):** within 40 ms it lifts and plugs into the **left** socket by a short cord drawn to the string (180 ms); then its number of bulbs light coral from the left, one per 70 ms, plink tones rising (pentatonic, so any count sounds sweet). Tap the same card again = unplug (light drains back, 200 ms).
- **Tap a second card:** it plugs into the **right** socket and lights teal from the right, one per 70 ms. The result is decided by the light fronts:
  - **meet exactly:** a 120 ms spark at the meeting point, the whole string flashes gold (300 ms) and hums a major chord; both cards float to the garland and hang as lanterns (600 ms); the string goes dark, ready for the next pair.
  - **cross (sum > N):** the bulbs reached by both colours turn white and flicker 4 × (600 ms); the cards stay plugged for 1.2 s so the child can see, then both unplug and slide home. Counts as a try (see §7).
  - **fall short (sum < N):** the unlit bulbs between the fronts stay dark and get a faint dashed ring (600 ms); after 1.2 s both cards slide home.
- **Tap a found lantern pair** on the garland: it lights the string again from the opposite ends (3 + 7 replayed as 7 from the left, 3 from the right) — the turn-around shown. No judging.
- **MISSING rounds:** the given card is fixed in the left socket; tap a tray card to plug it in the right socket (light runs in); tapping another replaces it. Check confirms.
- **WHOLE rounds (the child builds the string):** two cards sit in the two sockets but nothing is lit, and there is no string between them yet — just the two sockets and a slack bare cord. The child picks the whole from a numeral row 2–10 (48 px keys): the cord takes exactly that many bulbs (180 ms, a soft pop per bulb). "Light it" (Check) then runs both lights in: they meet exactly (right — the spark, the gold flash), or cross with doubled flickering bulbs (the chosen string is too short), or leave dark bulbs in the middle (too long). The child's number IS the string, so the material judges it exactly like a pair.
- **Free play ("Lantern maker"):** a length chooser 2–10 and cards 1–9; any two cards; nothing judged.

## 6. The rounds
**Round kinds:**
- **PAIR UP:** a board holding every pair of N exactly once (for even N the half appears as two cards, e.g. 4 + 4); find them all. The round ends when the garland is full.
- **MISSING:** the given part is plugged in; pick its partner from four tray cards. One right answer.
- **WHOLE:** two parts are plugged in; choose the string's length (the whole), then light it. One right answer.

**Level "Up to 5" (K-273) — 8 rounds:**
| # | kind | N | cards | answer |
|---|---|---|---|---|
| 1 | PAIR UP | 4 | 1, 3, 2, 2 | 1+3, 2+2 |
| 2 | MISSING | 5 | given 2 · tray 2, 3, 4, 5 | 3 (slot 2) |
| 3 | PAIR UP | 5 | 1, 4, 2, 3 | 1+4, 2+3 |
| 4 | WHOLE | ? | 1 + 3 | 4 |
| 5 | MISSING | 4 | given 1 · tray 1, 2, 3, 4 | 3 (slot 3) |
| 6 | WHOLE | ? | 2 + 3 | 5 |
| 7 | MISSING | 3 | given 2 · tray 1, 2, 3, 4 | 1 (slot 1) |
| 8 | MISSING | 5 | given 1 · tray 1, 2, 3, 4 | 4 (slot 4) |

**Level "6 to 9" (K-414–417, K-274) — 9 rounds:**
| # | kind | N | cards | answer |
|---|---|---|---|---|
| 1 | PAIR UP | 6 | 1, 5, 2, 4, 3, 3 | 1+5, 2+4, 3+3 |
| 2 | MISSING | 8 | given 5 · tray 2, 3, 4, 5 | 3 (slot 2) |
| 3 | PAIR UP | 7 | 1, 6, 2, 5, 3, 4 | 1+6, 2+5, 3+4 |
| 4 | WHOLE | ? | 4 + 3 | 7 |
| 5 | PAIR UP | 8 | 1, 7, 2, 6, 3, 5, 4, 4 | 1+7, 2+6, 3+5, 4+4 |
| 6 | MISSING | 9 | given 2 · tray 5, 6, 7, 8 | 7 (slot 3) |
| 7 | PAIR UP | 9 | 1, 8, 2, 7, 3, 6, 4, 5 | 1+8, 2+7, 3+6, 4+5 |
| 8 | WHOLE | ? | 6 + 3 | 9 |
| 9 | MISSING | 6 | given 4 · tray 2, 3, 4, 5 | 2 (slot 1) |

**Level "Make 10" (K-243, K-277) — 9 rounds:**
| # | kind | N | cards | answer |
|---|---|---|---|---|
| 1 | PAIR UP | 10 | 1, 9, 2, 8, 3, 7, 4, 6, 5, 5 | all five bonds |
| 2 | MISSING | 10 | given 7 · tray 3, 4, 5, 6 | 3 (slot 1) |
| 3 | MISSING | 10 | given 4 · tray 5, 6, 7, 8 | 6 (slot 2) |
| 4 | PAIR UP | 10 | 1, 9, 3, 7 | 1+9, 3+7 (old task) |
| 5 | MISSING | 10 | given 8 · tray 1, 2, 3, 4 | 2 (slot 2) |
| 6 | MISSING | 10 | given 1 · tray 6, 7, 8, 9 | 9 (slot 4) |
| 7 | PAIR UP | 10 | 2, 8, 4, 6, 5, 5 | 2+8, 4+6, 5+5 |
| 8 | MISSING | 10 | given 6 · tray 2, 3, 4, 5 | 4 (slot 3) |
| 9 | MISSING | 10 | given 5 · tray 2, 3, 4, 5 | 5 (slot 4) |

Every whole 3–10 of the old table is present; every old board survives minus its 0-pair. No 0 anywhere. Make-10 missing answers 3, 6, 2, 9, 4, 5 are all different.

**Answer position:**
- MISSING trays: four consecutive numerals always shown in counting order (so the tray is a mini number line and position = value, not a tell); the answer's place in its tray is balanced — across each level the answer sits in slots 1/2/3/4 equally often (± 1). The gate asserts per level: slot counts differ by ≤ 1, and "always tap the biggest/smallest" scores ≤ 2 of the level's MISSING rounds.
- PAIR UP boards: the cards are shuffled into the grid each pass with the rule that partners are adjacent (side by side or one above the other) no more often than in a random layout (gate: over 10 000 seeds the adjacent-partner rate is within ± 3 % of the random baseline), and the board is never laid out in counting order.
- WHOLE: answers 4, 5 / 7, 9 vary; no string exists until the child chooses its length, so nothing can be counted beforehand; the key row is in counting order (a number line, position = value).

**Order:** order-only reshuffle per pass; never the same order twice; a pass starts with a PAIR UP board; no two WHOLE rounds adjacent.

## 7. Check, the misses, the success
- **Check with nothing plugged (MISSING/WHOLE):** no miss; the tray cards bob once; **"Tap a number to plug it in."**
- **PAIR UP, one card plugged and nothing else for 6 s:** the dark bulbs breathe softly (no words) — an invitation, not a hint.
- **Miss 1 — a pair that crosses or falls short** (PAIR UP) / a wrong partner or whole (MISSING/WHOLE): the flicker or the dark gap is the showing (§5); then the extra or missing bulbs get small numerals counting the error ("1, 2" on two flickering bulbs) for 1.5 s. Bubble (cross): **"Too many — {k} bulbs are lit twice."** (short): **"Not enough — {k} bulbs are still dark."** WHOLE: the doubled or dark bulbs number themselves (the size of the error) and the string stays lit for 1.5 s: **"Count all the lit bulbs."**
- **Miss 2 (a second wrong try in the same round):** the plugged card's light stays on and the dark part of the string shows a dotted bracket with the right count of bulbs in it (the partner's size drawn, not its numeral); in WHOLE the two lights run again on a string as long as the two parts (a ghost string, outlined, drawn above the child's) and its bulbs number themselves 1 … N in order — the child still presses the key. Bubble: **"The partner fills the dark bulbs."** / **"The bulbs show the number."**
- **A new move** (a card plugged or unplugged) **takes the help away** until the next miss or Check.
- **Success (each pair):** spark, gold flash, chord, lanterns float to the garland; bubble **"3 + 7 = 10!"** Board complete: the garland swings, the string lights in a gold wave left to right twice: **"You found every way to make {n}!"** MISSING: **"7 and 3 make 10!"** WHOLE: **"4 and 3 make 7!"** Pass end: **"Your garland is full of number pairs!"**

## 8. Settings
1. **Numbers:** Up to 5 / 6 to 9 / Make 10 (default Up to 5) — the string's bulb count and the board at rest change.
2. **Card dots:** Off / On (default Off) — On draws the matching dot pattern (ten-frame layout, 10 px dots) under every card's numeral, the K-277 counting-dots stage for children who do not yet read numerals reliably.

## 9. Words (EN source)
- on-screen title: **Make the Number**
- instruction: **Tap a number, then its partner. If the lights meet exactly, the pair is right!**
- prompts: PAIR UP **Make {n}. Find every pair!** · MISSING **Find the partner that makes {n}.** · WHOLE **How long a string do {a} and {b} light? Choose, then light it.**
- hints: **Tap a number to plug it in.** · **Too many — {k} bulbs are lit twice.** · **Not enough — {k} bulbs are still dark.** · **Count all the lit bulbs.** · **The partner fills the dark bulbs.** · **The bulbs show the number.**
- success: **{a} + {b} = {n}!** · **You found every way to make {n}!** · **{a} and {b} make {n}!** · **Your garland is full of number pairs!**
- buttons: **Light it** (Check in MISSING/WHOLE) · free play: **Lantern maker**
- settings: **Numbers** — **Up to 5** / **6 to 9** / **Make 10** · **Card dots** — **Off** / **On**

**Locale traps:**
- **Equation order:** the board success reads `3 + 7 = 10` (the order the child made, result last) — natural in every locale; the garland label under each hook shows `= 10`.
- **"Bulbs" plural with numbers:** "{k} bulbs are lit twice" needs agreement for k = 1 vs > 1 (en "1 bulb is", de "1 Lämpchen leuchtet doppelt" / "2 Lämpchen leuchten", fi partitive "2 lamppua palaa kahdesti", fr "1 ampoule est allumée deux fois"); author per-locale singular/plural templates (k ≤ 4 in practice).
- **Lantern / bulb words:** de "Lämpchen" / "Lichterkette", fr "guirlande lumineuse", es-MX "foquitos", pt "pisca-pisca" / "lâmpadas", it "lucine", nl "lampjes", sv "lampor" / "ljusslinga", da "pærer" / "lyskæde", no "lyspærer", fi "lamput" / "valosarja" — words appear only in prompts and hints, never on the apparatus.
- **Partner:** de "Partnerzahl", fr "son complément" is too technical for K → "le nombre qui va avec", sv "kompisen" (the Swedish "tiokompisar" for bonds of ten is the classroom word — use it in the Make-10 prompt: "Hitta tiokompisen!"), da "makker", fi "pari" / "kymppikaveri" (Finnish classroom word for ten-bonds). The reviewer locks these classroom terms.
- Numerals only on the stage; no 0; no dates or money.

## 10. Sound off, access, phones
- Legible silent: the light fronts, the flickering doubled bulbs, the dark gap and the garland carry everything; the plinks are a bonus.
- Keyboard: arrow keys move across the cards, Enter plugs a card, Backspace unplugs; in WHOLE, digits choose the whole; Enter = Light it; G focuses the garland (Enter on a pair replays it turned round).
- aria: card "number {k}"; string "string of {n} bulbs" (in WHOLE "string not built yet" until a key is chosen); after a test the live region reads "{a} and {b}: {meet exactly | {k} too many | {k} too few}"; garland "pairs found: 2 of 4".
- Taps: cards ≥ 60 × 72 at 360 (56 × 64 at 320); keys 48 px; lantern pairs 44 px.
- Reduced motion: lights appear all at once per card; the doubled bulbs are shown with a static white ring instead of flickering.

## 11. Distinct from
- **Row 26 Snake-Groove Lunchbox (this batch):** chosen strands packed into a fixed container, any number of parts, a lid that cannot close. **Row 28 Ten-Seat Wheel:** riders board a wheel that lurches when unbalanced. **Row 25 Spring Switch:** a stream split by a switch. Here the test is **two lights from opposite ends of one string**, and the error is shown as the exact number of doubled or dark bulbs.
- **Built #9 Counting Necklace / #4 Constellation Thread:** counting along a string; here nothing is counted one by one by the child — two quantities are measured against a whole.
- **number-line tool:** jumps along a line from 0; the lantern string has no zero and measures from both ends.

## 12. Build plan
- **Core state:** `{ level, dots, order[], idx, kind, n, cards:[{id,v,home,found}], left:null|id, right:null|id, given:null|v, wholeKnown:bool, chosenWhole:null|int, found:[[a,b]], misses, help }`.
- **Functions:** `plug(id)` → fills left then right; `light()` → `{result:'meet'|'cross'|'short', k}` with k = |a + b − n|; `unplug(side)`; `replay(pairIdx)`; `chooseWhole(v)`; `check()` (MISSING/WHOLE); `nextTask(index)`.
- **Gate `verify-lantern-string-core.js` (own oracle):** (1) for every a, b in 1–9 and n in 2–10: `light` returns meet iff a + b = n, cross with k = a + b − n, short with k = n − a − b (exhaustive); (2) the bulbs drawn lit-twice = max(0, a + b − n) and dark = max(0, n − a − b); (3) a PAIR UP board contains every pair of n exactly once and completes exactly when all are found; a found pair cannot be found again; (4) MISSING/WHOLE rounds have exactly one right answer; in WHOLE, `light()` on the child's chosen length returns meet iff length = a + b (the same law as a pair); (5) no 0 in any table; (6) tray answer slots balanced per level (≤ 1 apart), biggest/smallest strategies ≤ 2 hits per level; (7) partner-adjacency within ± 3 % of the random baseline over 10 000 seeds; boards never in counting order; (8) the left light comes from the first card plugged.
- **Mutations:** meet accepted at a + b = n ± 1; cross count off by one; dark count drawn as 0; a board missing one pair; a duplicate pair counted twice; MISSING tray without the answer; a 0 card; answers always in slot 1; adjacency forced; help persists after a move; the left light always from the bigger card.
- **Pictures:** none (bulbs, cards and garland are apparatus geometry). **Risks:** ten bulbs plus the five-gap at 320 px (26 px bulbs fit: 10 × 26 + 9 × 3 + 10 = 297). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — two lights racing toward each other, a spark when they meet, flickering fairy lights when they cross, and a garland that swings with every pair.
2. **Would a teacher put it on the board?** Yes — "Will 4 and 5 make 8? Watch where the lights meet." The doubled bulbs show by how much a guess is off, which is exactly the conversation a teacher wants.
3. **Would a parent trust it?** Calm, no pictures to argue about, no score; every mistake shows its own size instead of a red cross.
4. **The invention:** the target number is a string of lanterns lit from both ends at once, so a pair is right exactly when the two lights meet without overlapping or leaving a gap.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- WHOLE rounds were self-contradictory (the lights of a and b would have revealed the "hidden" string by meeting). Now the child BUILDS the string: choosing the whole gives the cord that many bulbs, and "Light it" judges it by the same law as a pair — meet, cross (doubled bulbs = too short) or dark gap (too long). The child's number is the material; strings, hints, aria and gate updated.
- Every table re-checked: MISSING answers and slot balance per level (Up to 5: slots 2,3,1,4; 6–9: 2,3,1; Make 10: 1,2,2,4,3,4), no 0, every old board present minus its 0-pair. Correct.
- Distinct from 026/028 confirmed: no containers, no wheel; the error shown as an exact count of bulbs.
