# Row 151 — Compare Three-Digit Numbers → THE DECIDING GATE: the numbers race place by place, and the first gate where their blocks differ drops in front of the smaller one (2.NBT.A.4)

## 0. Identity
- **id** `match-pairs.compare-three-digit-numbers.2-nbt-a-4` (kept; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.NBT.A.4 (and 4.NBT.A.2's four-digit comparison for the G3 worksheet) · strand Number and Operations in Base Ten · own files `deciding-gate-core.js`, `deciding-gate-activity.js`, `deciding-gate-activity.html`, `deciding-gate-activities.json` (the row leaves `match-pairs-activities.json`; register the manifest in `frontend/lib/activities.ts MANIFEST_FILES`; 0 lines to `match-pairs-core.js` and `lcs-shell.*`).
- **Page intro (frozen):** "Compare each pair of three-digit numbers and match it to the symbol that makes it true — less than (<) or greater than (>). Look at the hundreds first, then the tens, then the ones to decide. Tap a comparison, then tap < or >, and watch the pair link." Kept: every round is a pair matched to its true symbol; "hundreds first, then tens, then ones" IS the gates; "tap a comparison, then tap < or >" stays (tap the slot, tap a sign); "watch the pair link" becomes the run and the sign clicking into place.
- **Worksheets it must also cover:** G2-219 "Big Number Battle" (compare, circle the symbol) → **Compare two** · G2-220 "Line Them Up" (number four from smallest to greatest) → **Order four** · G3-325 "Thousands Showdown" (compare four-digit numbers) → the **four digits** setting.
- **Merged:** grade 3 "The Place Gates" (4-digit trains weighed gate by gate) = the four-digit setting; the coverage review's "Three-Door Tunnel" is the starting point (predict the deciding door, then run, then sign).
- **What the old activity did:** 18 tasks of four cards — two "a ___ b" comparisons and the cards "<" and ">" — tap-to-pair. **Kept:** many of its number pairs reappear in the tables (247/274, 655/658, 875/857, 561/516, 927/924, 683/689 …). **Defects removed (see end):** every task had exactly one "<" and one ">", so the second match was forced; there was never an "=" round.

## 1. The pitch
"Two numbers race through three gates — hundreds, tens, ones; at each gate their digits rise as real blocks, equal blocks let both through, and the first gate where they differ drops its bar in front of the smaller number — you call the gate before the race, then set the sign."

## 2. Why a child will want it again
- **A race with a prediction.** Before the run the child taps the gate where they think the race will be decided — a bet on the outcome. Then the sledges roll and the child watches whether the bar falls where they said.
- **The blocks are the drama.** At the hundreds gate the digits rise as stacks of real *flats*, at the tens gate as *rods*, at the ones gate as *cubes* — drawn to scale. When 389 meets 412 at the hundreds gate, three flats face four flats, the bar slams down in front of 389 with a *clang*, and the "big" 8 and 9 never even get to rise: a single flat towers over every rod and cube behind it.
- **The sign has a mouth.** The < > sign is a little hinged jaw that clicks into the slot and opens toward the bigger number; when it lands right it snaps once with a *chomp*.
- **The podium.** In order-four rounds the four sledges race and park themselves on a four-step podium in size order — the child sees whether their own numbering matched.
- **The earned show:** after a correct round, a "long view" slides in below the track: both numbers drawn as true-length bars on a 0–1000 ruler (0–10 000 in four digits), confirming the gate's verdict with real size — 389's bar visibly shorter than 412's despite its big 8 and 9.
- **Free play:** the child can type any two numbers onto the sledge plates and race them, as often as they like.

## 3. The skill and the misconception
- **Skill (2.NBT.A.4; G2-219/220; G3-325):** compare two three-digit numbers by the value of the digits from the highest place down, record with <, = or >; order four numbers from smallest to greatest; the same for four digits.
- **Misconception 1 — "big-looking digits win"** (389 > 412 because 8 and 9 are big). **Pushback:** the hundreds gate always decides first; in every hundreds-decided round the smaller number has the bigger tens-and-ones (measured: a child who compares the last two digits is wrong in **all** of them), and the blocks show why: one flat outweighs nine rods and nine cubes.
- **Misconception 2 — comparing by the ones or the last digit.** **Pushback:** the ones gate only gets a turn when the hundreds and tens are equal; the "ones only" bot scores 5/10 (chance).
- **Misconception 3 — swapped digits look the same** (247 vs 274). **Pushback:** three rounds per pass use the same digits in a different order; the tens gate splits them.
- **Misconception 4 — the sign as a picture, not a relation** (writing < because the smaller is on the left anyway). **Pushback:** the bigger number is left in 4 of 9 unequal rounds and right in 5; the jaw opens toward the bigger sledge only.
- **Misconception 5 — "=" never happens.** One round per pass is equal; it runs through all three gates to the finish flag.

## 4. The stage
**At 704 px (stacked):**
- **Task line** (≤ 24 px): compare — **"Which gate decides? Tap it. Then put in the sign."** · order — **"Put the numbers on the steps, smallest to greatest."**
- **The scoreboard** (top, 672 × 90): the statement **"{a} [slot] {b}"** — numerals 48 px on digit plates (each digit on its own small plate in its place colour: hundreds teal, tens coral, ones gold; four-digit adds thousands in ink-blue), the slot a 72 × 72 dashed square. Under it the three sign tiles **<  =  >** (64 × 64 each, symbols 40 px, in that fixed order).
- **The track** (672 × 300): two lanes (top lane for a, bottom lane for b). Each number rides a **sledge** — its three digit plates joined on runners (drawn geometry, 150 × 56). Three **gates** stand across both lanes at x = 230, 390, 550 (four in four digits), each a teal frame 60 × 260 with the place glyph on top (a little flat / rod / cube; a big cube for thousands) and a hinged bar. At the right end the **finish flag** (for "equal": both reach it). Gates are 60 px wide with a 72 px tap zone each.
- **The gate stage:** at each gate, during the run, the two digits rise as block stacks between the lanes — flats 64 × 64 (fanned, offset 6), rods 6 × 64, cubes 6 × 6 at the gate's scale (true 1 : 10 : 100 within a gate).
- **Order four:** four lanes (each 64 tall) through the same gates; to the right a **podium** of four steps (1 lowest … 4 highest, 80 × 40/60/80/100) with numerals 1–4 on the step faces. The four number tags sit on the sledges at the left; the child drags each tag onto a step.
- Vertical budget: task 56 + scoreboard 90 + sign tiles 70 + track 300 + gaps 32 = **548** (order four: track 4 × 64 + podium beside = 300, no sign tiles → 478).

**At 360 px:** scoreboard 328 × 72 (numerals 34 px) · sign tiles 3 × 64 × 56 · track 328 × 240 (sledges 104 × 44, numerals 22 px; gates 40 wide with 64-px tap zones at x = 128, 200, 272; the two lanes 48 tall each; the gate stage uses flats 40, rods 4 × 40, cubes 4 × 4) · Check 48. Budget: header 56 + 52 + 72 + 56 + 240 + 48 + gaps 32 = **556**. Order four on phones: the podium moves below the track (328 × 110, steps 76 wide) → 56 + 52 + 240 + 110 + 48 + 32 = **538**.
**At 320 px:** gates at x = 112, 176, 240 with 56-px tap zones (still ≥ 44); sledges 92 × 40 → **≈ 530**. Four digits on phones: four gates at 52-px spacing with 52-px tap zones.
No library pictures: digits and blocks are the content (drawn apparatus).

## 5. The hand
- **Predict:** tap a gate (or the finish flag for "the same") → it glows coral and a small flag pops on top (120 ms, *tik*). Tap another to change.
- **Sign:** tap the slot then a tile, or drag a tile into the slot → the jaw clicks in (150 ms) and its mouth opens toward the side the child chose. Tap the slot to clear.
- **Check = the run.** The sledges roll right (60 px / 100 ms) to the first gate; the digits rise as block stacks (250 ms); equal → the bar lifts and both roll on (*whoosh*); different → the bar drops in front of the smaller sledge (*clang*), the bigger rolls through to the flag; the smaller's remaining plates dim (they never got to race). The prediction flag turns teal if right, stays coral if wrong (§7). Then the sign is judged.
- **Order four:** drag the four tags onto steps (or tap a tag, then a step); a step holds one tag (dropping onto a taken step swaps). Check runs the four sledges together: at each gate the stacks rise for every sledge still tied; sledges are released in order of their digit and park on their true step.
- **Free play** (the play chip after a round): tap a sledge plate and type any digits on a 0–9 strip, then run.
- **Keyboard:** Tab → gates → sign tiles → slot → Check; arrow keys move between gates; < = > keys type the sign.

## 6. The rounds
**Compare — three digits** (deciding place · bigger side):

| # | a [?] b | Decides | Sign | Note |
|---|---|---|---|---|
| 1 | 389 _ 412 | hundreds | < | the "big 8 and 9" trap |
| 2 | 736 _ 367 | hundreds | > | same digits, different places; tens/ones trap |
| 3 | 461 _ 529 | hundreds | < | tens/ones trap |
| 4 | 247 _ 274 | tens | < | swapped digits (old round) |
| 5 | 875 _ 857 | tens | > | swapped digits (old round) |
| 6 | 561 _ 516 | tens | > | swapped digits (old round) |
| 7 | 655 _ 658 | ones | < | old round |
| 8 | 927 _ 924 | ones | > | old round |
| 9 | 683 _ 689 | ones | < | old round |
| 10 | 504 _ 504 | finish flag | = | the equal round |

**Compare — four digits (G3-325):** 3891 _ 4120 (thousands, <) · 6250 _ 5987 (thousands, >) · 1999 _ 2001 (thousands, <; "all those nines") · 7086 _ 7186 (hundreds, <) · 8361 _ 8016 (hundreds, >) · 2743 _ 2734 (tens, >) · 9205 _ 9250 (tens, <) · 5412 _ 5419 (ones, <) · 4377 _ 4370 (ones, >) · 6038 _ 6038 (=).

Measured (`work-34/m151.js`): deciding place H 3 / T 3 / O 3 / = 1 (four digits: Th 3 / H 2 / T 2 / O 2 / = 1); bigger number on the left in **4 of 9** unequal rounds (44 %); equal 10 %; shortcut bots — compare the ones digit **5/10**, digit sums 5/10, largest digit 4/10, the first digit only 4/10 (fails every tie), "always <" 5/10, "always >" 4/10, **the last two digits 7/10** — the 7 are exactly the rounds where the hundreds are tied, so that bot fails *every* hundreds-decided round (the misconception round), which is the point. Tapping the first gate every time is right 3/10.

**Order four — three digits (G2-220)** (as shown left → right · smallest → greatest):
1. 389, 412, 398, 421 → 389, 398, 412, 421 · 2. 650, 560, 605, 506 · 3. 437, 734, 743, 473 · 4. 812, 218, 128, 281 · 5. 590, 905, 509, 950 · 6. 637, 367, 673, 376 · 7. 194, 941, 914, 149 · 8. 826, 862, 286, 268 · 9. 530, 305, 350, 503.
**Order four — four digits:** 3891, 4102, 3918, 4120 · 6050, 5600, 6005, 5060 · 2473, 2743, 7234, 2734 · 8612, 8126, 6812, 8162 · 1590, 1905, 1509, 1950 · 3706, 3067, 3760, 3076 · 5249, 5429, 5294, 4952 · 7800, 8007, 7080, 7008 · 9311, 9113, 9131, 9310.
Measured (`work-34/perm151.js`): every rank (smallest, 2nd, 3rd, greatest) stands in every shown position 2–3 times across the 9 sets; no set is shown already in order (up or down); every set shares a leading digit between at least two numbers, so the tens (and ones) must be read; ordering by the ones digit or by digit sum gets 0 sets right (four digits: digit sum 1/9).
- **Answer position:** the sign tiles are fixed (< = >) and the right sign is < 5×, > 4×, = 1× per pass (alwaysLess 50 %); the deciding gate is each place equally often; the podium ranks are spread over the shown positions as measured.
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check with nothing** → "Tap the gate you think will decide." · **gate but no sign** → "Now put a sign in the box." · **order with a step empty** → "Every number needs a step." (no misses).
- **Wrong gate — miss 1 (shown by the run itself):** if the child chose a *later* gate, the run stops at the true gate and the child's flag shakes: **"The race was already decided here — the {place} are different."** If the child chose an *earlier* gate where the digits were equal, the two equal stacks at that gate stay lit side by side: **"These are the same — the race goes on to the next gate."** (Places shown as glyphs.)
- **Wrong sign — miss 1:** the jaw swings to open toward the sledge that passed the gate and flashes — **"The open side of the sign faces the bigger number."**
- **Miss 2 (either):** the two digits of the deciding place grow on the scoreboard plates and the bubble names them as blocks — **"{d1} {place} against {d2} {place}: the gate drops in front of {smaller}."** (e.g. "3 hundreds against 4 hundreds").
- **Order — miss 1:** the run parks the sledges on their true steps; tags on the wrong step flash and slide to stand beside their sledge — **"Watch where each number parks."** **Miss 2:** the two numbers the child swapped show their deciding gate's stacks side by side — **"These two are decided at the {place}."**
- A new move takes the help away until the next Check.
- **Success:** the bar stays down, the jaw chomps once, the long-view bars slide in under the track (both numbers as true lengths on 0–1000), and the bubble reads the sentence: **"{a} is less than {b}."** / **"{a} is greater than {b}."** / **"{a} is equal to {b}."** (order: **"{w} < {x} < {y} < {z}"** with the podium lighting step by step).

## 8. Settings
1. **Job:** compare two · order four — the track shows two lanes and the sign tiles, or four lanes and the podium.
2. **Digits:** three · four — three or four gates and plates at rest.

## 9. Words (EN source)
- title (frozen) **Compare Three-Digit Numbers** · instruction **"The numbers race through the gates: hundreds first. Call the gate, then set the sign."**
- prompts, hints, success as in §4 and §7; settings **Job** — compare two / order four · **Digits** — three / four.
- **Locale traps:**
  - Symbols < = > are universal; the sentence "is less than / greater than / equal to" is authored per locale (de "ist kleiner als / größer als / gleich", fr "est plus petit que / plus grand que / égal à", es "es menor que / mayor que / igual a", it "è minore di / maggiore di / uguale a", pt "é menor que / maior que / igual a", nl "is kleiner dan / groter dan / gelijk aan", sv "är mindre än / större än / lika med", da "er mindre end / større end / lig med", no "er mindre enn / større enn / lik", fi "on pienempi kuin / suurempi kuin / yhtä suuri kuin").
  - **Four-digit separators:** en writes 3,891, de 3.891, fr/sv/no/fi 3 891 (thin space), es/pt/it 3.891 — school pages for four digits often write none. The stage writes **no separator** (each digit sits on its own coloured plate, so the places are already visible), which is correct in every locale.
  - Place words in the hints take singular/plural with the digit (fi partitive "3 sataa", it "1 centinaio / 3 centinaia") — author from `scripts/worksheet-gen/lib/number-words.js`; the place glyph always accompanies the word.
  - "smallest to greatest": the podium's step numerals 1–4 do the work; the phrase is authored per locale ("vom kleinsten zum größten", "du plus petit au plus grand", "del menor al mayor", …).

## 10. Sound off, access, phones
- Legible with the sound off: bars drop, stacks rise, the jaw opens; *clang* and *chomp* are bonuses.
- aria: gate "Hundreds gate"; sledge "{n}"; slot "Sign: {sign|empty}"; step "Step {k}: {n|empty}"; the run is announced as "Hundreds: 3 and 4 — the gate drops in front of 389."
- Taps: gate tap zones ≥ 52 px, sign tiles 64 × 56, tags ≥ 44, steps ≥ 76 wide.
- No pictures. Check above the fold: 556 at 360 × 740, ≈ 530 at 320 × 640.

## 11. Distinct from
- **Row 95 The Ten-Rod Drawers** (1.NBT.B.3: drawers open tens first, ones stay locked) — two digits, cabinets, no prediction, no race, no ordering; here three or four places, a predicted deciding gate, the sign's jaw and a four-way podium.
- **Rows 19–22** (elevator, towers, creek, nesting pots — K.CC.C.7 numerals to 10) and **Row 88 Equal-Sign Beam** (balance tips into < or >) — magnitudes of small numbers / equality of sums; no place-by-place decision.
- **Number Balance, Landing Strip, Rounding Hill** (tools) — equality, nearest ten, rounding.
- **Row 149 / 150** (this batch) — reading and composing numbers; no comparison.

## 12. Build plan
- **Core state:** `{ job, digits, pair:[a,b] | four:[…], predicted: gateIndex | 'finish', sign, steps:[…] }`. Functions: `deciding(a,b)` (first differing index or -1), `predict(g)`, `setSign(s)`, `run()` → per-gate frames `{ gate, stacks:[d1,d2], equal }`, `orderRun(four)` (stable release order per gate), `check()` → `{ ok, kind: 'empty' | 'noSign' | 'gateLate' | 'gateEarly' | 'sign' | 'order', ... }`.
- **The gate's own ground truth (`verify-deciding-gate-core.js`, its own comparator):** the tables' deciding-place counts, left-bigger share 40–60 %, equal ≤ 15 %; every hundreds-decided three-digit round has the smaller number's last two digits larger (the trap); ≥ 2 swapped-digit rounds; order sets: each rank in each position ≤ 3 times, never pre-sorted, every set has a shared leading digit; `deciding` matches an independent string compare; `check` accepts only the true gate and sign; `orderRun` parks sledges in numeric order.
- **Mutations:** compare by the ones digit · compare left to right but skip equal gates' check · accept any gate · accept the reversed sign · make every round's bigger number left · drop the equal round · order by digit sum · let a tie at the hundreds release by tens of the first number only · reveal the long view before Check.
- **Local test:** real taps on gates, real drags of tiles and tags at 320·360·412·704·768·1024·1366, every round, 11 locales; assert gate tap zones ≥ 44, the run frames, Check above the fold.
- **Pictures:** none. **Risks:** four-digit stacks at a thousands gate (up to 9 big cubes) — drawn as a short fanned stack of 9 cubes, offset 4 px. Nothing BLOCKED.
- **Current-activity defects (fixed by this rebuild):** every task had one "<" card and one ">" card, so after the first match the second was forced (half of every task answered itself); no "=" round ever appeared although 2.NBT.A.4 includes =; in the manifest the "<" comparison is always the first card of each task — if the engine shows cards in listed order, the "<" comparison is always in the same place.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a bet, a race, gates that slam, a sign with a jaw and a podium.
2. **Would a teacher put it on the board?** Yes — "hundreds first, then tens, then ones" made physical, with the big-digits error defeated by real block sizes and the deciding place named every time.
3. **Would a parent trust it?** Calm, drawn apparatus, numerals only, no timer.
4. **The invention:** the two numbers race through one gate per place, their digits rising as real blocks, and the first gate where they differ drops in front of the smaller number — the child calls that gate before the race.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 5→5
What changed:
- Nothing in the design needed rewriting. Every claim was re-measured with my own script (`work-c34/c151.js`): deciding place H 3 / T 3 / O 3 / = 1 (four digits Th 3 / H 2 / T 2 / O 2 / = 1); bigger on the left 4/9; ones-digit bot 5/10 (four digits 3/10); last-two-digits 7/10 and wrong in every hundreds-decided round (all three hundreds rounds have the smaller number's last two digits larger); order sets — each rank in each shown position 2–3 times, never pre-sorted, ordering by ones / digit sum / last two digits 0/9, a shared leading digit in 9/9.
- Known and accepted: with 9 unequal rounds the right sign is < 5× and > 4×, so "always <" is 50 %; the round succeeds only with the right gate AND sign, and "first gate + always <" is right 2/10.
