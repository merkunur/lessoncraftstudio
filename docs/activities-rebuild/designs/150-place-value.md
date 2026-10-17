# Row 150 — Expanded Form → THE VALUE-KEY ADDING MACHINE: every key is worth its place, a zero is a column with no key pressed, and the tape prints the expanded form (2.NBT.A.3)

## 0. Identity
- **id** `place-value.expanded-form.2-nbt-a-3` (kept; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.NBT.A.3 (with 1.NBT.B.2 for the two-digit setting) · strand Number and Operations in Base Ten · own files `value-keys-core.js`, `value-keys-activity.js`, `value-keys-activity.html`, `value-keys-activities.json` (the row moves out of `place-value-activities.json`; register the manifest in `frontend/lib/activities.ts MANIFEST_FILES`; 0 lines to `place-value-core.js` and `lcs-shell.*`).
- **Page intro (frozen):** "Build each three-digit number with hundreds, tens, and ones — then see its expanded form. Tap to add a hundreds-flat, a ten-rod, or a unit-cube; when it is right, the blocks reveal the place values that add up to the number (247 = 200 + 40 + 7). Numbers like 305 show that a zero tens place adds nothing — just 300 + 5." Every promise is kept: each key press adds that place's blocks to the tray (one key = its flats, rods or cubes), the tape prints "247 = 200 + 40 + 7", and 305 is pressed with *no* tens key, printing "300 + 5".
- **Worksheets it must also cover:** G1-120 "Tens and Ones" (count rods and cubes, write the number) · G1-121 "Build It Right" (which set shows the number) · G1-122 "How Many Tens?" (count the rods, finish the sentence) · G1-133 "Stretch the Number" (blocks → expanded form, 40 + 3) · G2-223 "Hundreds, Tens, Ones" (blocks → expanded form, 3-digit) · G2-225 "Digit Detective" (the value of the underlined digit). Mapping in §6.
- **What the old activity did:** "Show the expanded form of {n} — build it with the blocks", the same 18 targets as row 149, generic build hints; the expanded form appeared as a reward. **Kept:** the 18 targets (Make job, 3 digits), "blocks reveal the place values" (the tray fills from the keys). **New:** the machine, the value keys, the tape, the two-digit, digit-value and which-set jobs. The old `taskExpanded` string is retired (the build session writes the new prompts in 11 locales).

## 1. The pitch
"The adding machine has a column of keys for each place, and every key is labelled with what it is worth — 100 to 900, 10 to 90, 1 to 9 — so to make 247 you press 200, 40 and 7, pull the crank, and the paper tape prints the expanded form; a zero is simply a column where you press nothing."

## 2. Why a child will want it again
- **Big mechanical keys.** Each key is a chunky square button that sinks with a *clack* and stays down (like an old cash register); press another key in the same column and the first one pops back up — a column holds one key.
- **The crank.** A long lever on the machine's side: drag it down and it ratchets *click-click-click*, then everything happens at once — the keys spring up, the three number drums in the window roll to the total (each drum turning its own number of clicks), the bell goes *ding!*, and the paper tape curls out of the top with the sum printed on it.
- **The tape is a souvenir.** Every crank prints a new line on the paper roll, which grows upwards like a real till receipt; at the end of the round the tape shows the whole working: **200 / + 40 / + 7 / = 247**, right-aligned like a column sum.
- **Blocks fall out.** On success the pressed keys' blocks drop into the tray under the machine — two flats *bong bong*, four rods *tik tik tik tik*, seven cubes *pip…* — so the expanded form turns into stuff you can see.
- **Free play:** between rounds the machine is just a machine — press any keys and crank; children love making 999 (every column's top key) and 100 (one key) and watching the drums.

## 3. The skill and the misconception
- **Skill (2.NBT.A.3; 1.NBT.B.2 in the two-digit setting; G1-120/121/122/133, G2-223/225):** a three-digit number is the sum of its place values (247 = 200 + 40 + 7); a zero place contributes nothing (305 = 300 + 5); a digit is worth its face times its place (the 7 in 472 is worth 70).
- **Misconception 1 — the parts are the digits** ("247 = 2 + 4 + 7"). **Pushback:** there is no "2" key in the hundreds column — its keys are 100…900; pressing the ones key 2 for the hundreds makes the drums roll to 49, not 247, and the hundreds drum stays on 0.
- **Misconception 2 — zero as a part** ("305 = 300 + 0 + 5", or "300 + 50"). **Pushback:** there is no zero key; a zero place is a column with no key down, and the tape simply prints **300 + 5** (the page intro's promise). Pressing 50 makes the drums read 355.
- **Misconception 3 — writing 300 + 5 as 3005.** **Pushback:** the tape prints the parts right-aligned in a column, so the 5 sits under the last 0 of 300; the drums *add*, they never glue.
- **Misconception 4 — face value** ("the 7 in 472 is worth 7"). **Pushback (digit-value job):** the key the child presses drops its blocks next to the bright digit's own blocks — seven cubes beside seven rods.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout):**
- **Task line** (≤ 24 px): make — **"Make {n} on the machine."** · read — **"Press the keys the blocks are worth."** · worth — **"What is the bright digit worth? Press that one key."** · which set — **"Which set shows {n}? Feed it to the machine."**
- **The order panel** (left, 200 × 420): make — the order ticket (180 × 96, numeral 48 px); read — the blocks to read, tidy H-T-O top to bottom (cube 10, rod 10 × 100, flat 100 × 100; flats fanned with an 8 px offset, 9 flats → 164 × 164; rods side by side 6 px apart; cubes 3 × 3 nest) — in the two-digit setting rods and cubes only; worth — the number (numeral 56 px) with one digit bright (coral, 1.2× size, a ring), its blocks shown faintly under it.
- **The machine** (centre, 270 × 500): a rounded body in cream with a teal faceplate. Three key columns (two in the two-digit setting), each **9 keys, smallest at the bottom** (100 at the bottom up to 900 at the top — bigger is higher). Keys 76 × 44, 6 px gaps (column height 9 × 50 = 450), labels 20 px numerals; columns colour-coded on the key rim (hundreds teal, tens coral, ones gold) with the place glyph (little flat / rod / cube) above each column — no words.
- **The right column** (180 px): the **result window** (three number drums, 44 × 64 each, numerals 40 px), the **crank** (a lever 24 × 160 with a 48-px round grip; dragging it down 120 px = a crank) and the **paper tape** (160 wide, growing upward above the machine; lines in 18 px tabular numerals, right-aligned).
- **The tray** under the machine (470 × 90): where the keys' blocks fall on success and in the read misses.
- Vertical budget: task 56 + machine 500 + tray 90 + gaps 24 = **670**.

**At 360 px (stacked):** task 52 · order strip 328 × 80 (ticket numeral 40; blocks at cube 6, rod 6 × 60, flat 60 × 60 laid in a row: flats fanned 60 + 8 × 8 = 124, then rods, then cubes) · keys **3 columns × 9**, each key **100 × 44** with 3 px gaps (9 × 47 = 423 tall; labels 18 px) · a row with the drums (3 × 36 × 48) and the crank turned sideways (drag right) · Check 48. Budget: header 56 + 52 + 80 + 423 + 56 + 48 + gaps 16 = **731 ≤ 740**. The tape on phones is a single line under the drums (the latest print); the full tape opens in the success bubble. The tray is shown only during the success show (it overlays the order strip).
**At 320 px (and any height under 700):** the bank becomes **three place tabs + one 3 × 3 pad**: the tabs (3 × 92 × 48) show the place glyph and the value pressed in that place ("—" when none); the pad shows the selected place's nine keys (each 92 × 44, smallest bottom-left, largest top-right, so bigger is still higher). Budget: 56 + 48 + 72 + 48 + 3 × 47 + 52 + 44 + gaps 40 = **501 ≤ 640**.
**Two-digit setting:** two key columns, keys 120 × 44 (360: 156 × 44).
**Which set? job:** at 704 the order panel holds the three sets stacked (each 200 × 130; rod 10 × 100, cube 10; nine rods 144 wide); on phones the three sets stack at 328 × 72 (rod 6 × 60) and, because the child never presses keys in this job, the bank shows in the compact place-tab + pad form (the machine presses them by itself): header 56 + 52 + 3 × 72 + tabs 48 + pad 141 + drums/crank 56 + Check 48 + gaps 32 = **649 ≤ 740**.

No library pictures: blocks are drawn apparatus (the base-ten palette: flat teal, rod coral, cube gold, 2 px ink).

## 5. The hand
- **Press a key:** tap → it sinks 4 px and darkens (60 ms, *clack*); the column's previously pressed key pops up (80 ms, *tuk*). Tap a pressed key → it pops up (the column is empty again = zero). Keyboard: arrows move within the bank, Space presses.
- **Crank:** drag the grip down (or tap it, or press the shell's Check — all three are the same action): ratchet clicks follow the finger every 24 px (first click within 50 ms); at the bottom the machine runs: drums roll (60 ms per digit step), bell *ding*, the tape prints, keys spring up after 300 ms. Releasing early springs the crank back with no effect.
- **The tape** prints the pressed values largest first, then **= {sum}**: one key → "200 = 200"; none → nothing printed and the bubble says "Press a key first." (no miss).
- Every press is undoable; the crank never locks.
- **Free play:** between rounds (and at the end) keys and crank work freely; nothing is judged.

## 6. The rounds
**Make — three digits (2.NBT.A.3, the kept targets):** pass A **108, 247, 305, 420, 500, 604, 730, 850, 974** · pass B **160, 200, 408, 463, 583, 670, 702, 836, 906** (alternating passes). 13 of 18 have a zero place: those rounds are pressed with fewer than three keys (500 and 200 with ONE key).
**Make — two digits (1.NBT.B.2):** **43, 70, 58, 16, 91, 35, 62, 27, 89** (70: one key; 16: a teen is still 10 + 6).
**Read the blocks — three digits (G2-223):** **238, 406, 571, 690, 145, 802, 367, 954, 713** (zeros: 406, 690, 802).
**Read the blocks — two digits (G1-120, G1-122, G1-133):** **34, 60, 75, 19, 82, 47, 90, 56, 23** — 60 and 90 are rods only: the bubble's success line reads "6 tens = 60" (G1-122's sentence).
**What is it worth — three digits (G2-225):** 472 (7 → 70) · 721 (7 → 700) · 217 (7 → 7) · 358 (5 → 50) · 583 (5 → 500) · 835 (5 → 5) · 946 (4 → 40) · 469 (4 → 400) · 694 (4 → 4). Each digit appears in every place once; the bright digit is in the hundreds 3×, tens 3×, ones 3×. Measured (`work-34`): pressing the key equal to the digit's face (the ones column) is right **3/9**; pressing a hundreds key always 3/9.
**What is it worth — two digits:** 47 (4 → 40) · 74 (4 → 4) · 36 (3 → 30) · 63 (3 → 3) · 85 (8 → 80) · 58 (8 → 8) · 29 (2 → 20) · 92 (2 → 2) · 61 (6 → 60) — tens 5×, ones 4×; face-value right 4/9.
**Which set? — two digits (G1-121 "Build It Right": circle the blocks that show the number; critic 2026-10-17 — the designer had handed this two-digit worksheet to row 149's three-digit Match job, which does not cover it).** The order panel shows THREE block sets (rods and cubes, tidy) stacked top to bottom; the ticket {n} sits on the machine. The child drags one set into the machine's hopper (or taps it) and pulls the crank: the machine presses, by itself, the keys that set is worth, the drums roll to its value and the tape prints its expanded form — so the machine *reads the chosen set*, and only the child's choice is judged (drums = ticket). Ticket · sets top → bottom (tens-and-ones) · right set:

| Ticket | Sets (top → bottom) | Right |
|---|---|---|
| 34 | **34** · 36 · 44 | 1st |
| 52 | 53 · **52** · 22 | 2nd |
| 71 | 70 · 11 · **71** | 3rd |
| 46 | 45 · **46** · 66 | 2nd |
| 80 | 81 · 90 · **80** | 3rd |
| 29 | **29** · 28 · 19 | 1st |
| 63 | 62 · 33 · **63** | 3rd |
| 15 | **15** · 16 · 55 | 1st |
| 57 | 56 · **57** · 77 | 2nd |

Measured (critic, `work-c34/c150pick2.js`): right set in each position **3 / 3 / 3**; every round has one wrong set with the same rods and one with the same cubes, so counting only the rods or only the cubes never singles out the right set (0 / 9 each); the right set has the most pieces 3×, the fewest 3×, the middle 3× (piece-count bots at chance — with every place shared by a wrong set, the right set can never tie on pieces, so the ranks are balanced instead); near misses by one rod or one cube in every round; the zero set 80 and the 70 beside 71 keep the empty place in play; at most 9 rods per set.
- **Answer position:** the keys to press are fixed by the values (the 200 key is always second from the bottom) — that is the content, not a cue; no round's answer is the same set of key positions as the previous round's (the reshuffle checks it).
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Crank with no key down** → "Press a key in each column the number needs." (no miss).
- **Make — miss 1:** the drums show the machine's sum (e.g. 274 for the ticket 247); the drums that differ from the ticket shake and the ticket's digits in those places glow — **"Your machine made {sum}. Look at the places that glow."** **Miss 2:** the ticket opens into three pockets with each digit's blocks under it (4 rods under the 4) and the label "4 tens = 40" appears under the tens pocket — **"The {d} in the {place} is worth {value}."** ({place} as the glyph and the place word.)
- **Zero-specific miss 1** (a key pressed in a zero place, e.g. 50 for 305): the drums read 355; the tens drum shakes and the ticket's 0 glows — **"The ticket has 0 tens. A zero place needs no key."**
- **Read — miss 1:** the pressed keys' blocks drop into the tray, lined up beside the shown blocks place by place; the place where the counts differ flashes (extra blocks in coral, missing ones as outlines) — **"Your keys gave {sum}. Match the blocks place by place."** **Miss 2:** the shown blocks of that place number themselves 1, 2, 3… — **"Count them, then press the key they are worth."**
- **Worth — miss 1:** the pressed key's blocks drop next to the bright digit's blocks (seven cubes beside seven rods) — **"Your key is worth {v}. Look how many each of the bright digit's blocks is."** **Miss 2:** the bright digit's column glows on the machine (the right column, not the key) — **"The bright digit is in the {place}. Press the key in this column."**
- A new press takes the help away until the next crank.
- **Success:** the drums settle, the bell rings twice, the tape prints the right-aligned sum, the blocks fall into the tray in place order (flats *bong*, rods *tik*, cubes *pip*). Bubble: make/read — **"{n} = {expanded}"** (e.g. "305 = 300 + 5"); worth — **"The {d} in {n} is worth {value}."**

## 8. Settings
1. **Numbers:** tens and ones · hundreds, tens and ones — two or three key columns at rest.
2. **Job:** make the number · read the blocks · what is it worth · which set? — changes the order panel at rest (ticket / blocks / bright digit / three block sets). "Which set?" is two-digit only (G1-121): choosing it sets Numbers to tens and ones and greys the three-digit chip (the three-digit "which tray" is row 149's Match job).

## 9. Words (EN source)
- title (frozen) **Expanded Form** · instruction **"Every key is worth what it says. Press one key in each place, then pull the crank."**
- prompts as in §4; hints and success as in §7.
- settings **Numbers** — tens and ones / hundreds, tens and ones · **Job** — make the number / read the blocks / what is it worth / which set?
- which-set hints: miss 1 — the drums show the chosen set's value beside the ticket and the place that differs flashes on both — **"This set is worth {sum}. Look at the {place}."** (place as its glyph + word); miss 2 — every set is fed in turn and its value prints on the tape beside it — **"Find the set the machine reads as {n}."** · success **"{n} = {expanded}: this set shows {n}."**
- **Locale traps:**
  - "+" and "=" are universal; the tape uses no words. Numerals are plain (no thousands separators — 3 digits at most).
  - Place words in the hints (tens / Zehner / dizaines / decenas / decine / dezenas / tientallen / tiotal / tiere / tiere / kymmenet) take singular/plural with the digit ("1 ten", "4 tens"; fi partitive "4 kymmentä"; it "1 decina / 4 decine"; fr "1 dizaine / 4 dizaines"). Author per locale from `scripts/worksheet-gen/lib/number-words.js` and `place-value-core.js _NUMBER_WORD_HELPERS`, never a new table.
  - "{d} in {n} is worth {value}" — de "Die {d} in {n} ist {value} wert." (Ziffer, feminine); fr "Le {d} de {n} vaut {value}." (le chiffre); fi "Numero {d} luvussa {n} on {value}" (inessive "luvussa"), sv "Siffran {d} i {n} är värd {value}."; nl "De {d} in {n} is {value} waard."
  - Two-digit teens: in de/nl the name says the ones first (sechzehn, zestien) but the keys are pressed tens then ones in any order — the tape always prints 10 + 6, which is exactly the point.
  - "crank" and "machine" never appear on the stage; in the instruction the authors pick the child word (de Kurbel, fr manivelle, es manivela, it manovella, pt manivela, nl hendel, sv vev, da håndsving, no sveiv, fi kampi).

## 10. Sound off, access, phones
- Legible with the sound off: keys sink, drums roll, the tape prints; the bell and ratchet are bonuses.
- aria: key "Key {value}, {pressed|not pressed}"; column "Hundreds keys"; crank "Crank — add it up"; drums "The machine shows {sum}"; tape "Tape: {expanded} equals {sum}".
- Taps: every key ≥ 44 px tall at every width (76 × 40 keys at 704 are enlarged to 76 × 44 — column height 9 × 50 = 450, machine 500, budget 670), crank grip 48 px, place tabs 48.
- No pictures. Check above the fold: 731 at 360 × 740, 501 at 320 × 640.

## 11. Distinct from
- **Row 142 The Twin Tubes** (pour forms into tubes to match them) and **Row 98 Zero-Swallowing Cards** (arrow cards overlap: the 7 lies on the 0 of 40) — both *compare or overlay* written forms; here the child *composes* a number from value keys and a machine adds them.
- **Row 93 Stretching Door Tag** (the tag pulls apart to reveal the hidden 0) — 2 digits, splitting a numeral; here the zero is *absence of a key*.
- **Row 149 The Capped Mat** (this batch) — blocks and numeral caps in a chart; no values, no machine.
- **Place Value Lab / Exchange Machine** (tools) — regrouping blocks; no expanded form, no keys.
- **New 295 Number Machine** (planned: function rules in a funnel machine) — rules, not place value.

## 12. Build plan
- **Core state:** `{ places:2|3, job, n, bright?, pressed:{h,t,o}|null each, drums, tape:[], tray }`. Functions: `press(place, d)` (replaces that column's key), `release(place)`, `crank()` → `{ sum, lines, ok, kind: 'none' | 'wrongPlace' | 'zeroPressed' | 'wrongWorth' }`, `expanded(n)` (largest first, zero places omitted), `blocksOf(value)`.
- **The gate's own ground truth (`verify-value-keys-core.js`):** for every target, the right key set is exactly {h·100, t·10, o} minus zeros; `expanded(305) === '300 + 5'`, `expanded(500) === '500'`; a column never holds two keys; there is no zero key; `crank` sums the pressed values; digit-value rounds: lit place counts 3/3/3 (3-digit), face-value bot ≤ 4/9; the tape's lines are right-aligned (string widths equal); the tray's block counts equal the pressed values / place.
- **Which-set ground truth:** positions 3 / 3 / 3; rods-only and cubes-only never unique; piece-count ranks 3 / 3 / 3; the machine's reading of a fed set equals 10 × rods + cubes; the job forces two digits.
- **Mutations:** put the right set always first · make the right set always the one with the most pieces · let the machine read a fed set by its piece count · add a zero key · let a column hold two keys · print "+ 0" for a zero place · concatenate instead of add · grade the digit-value job by face value · drop the zero targets · label keys with digits instead of values · let the ones column read in hundreds.
- **Local test:** real presses and real crank drags at 320·360·412·704·768·1024·1366, all rounds, 11 locales; assert the 9 × 3 bank fits, the crank works by drag, tap and Check, the tape never overflows its column (wraps to a new line), Check above the fold.
- **Pictures:** none. **Risks:** 27 keys is a busy bank — mitigated by the colour columns, the bigger-is-higher order and generous 6 px gaps; the visual critic must confirm the bank reads as three columns at 360. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — clacking keys, a ratcheting crank, rolling drums, a bell, a paper tape and blocks raining into the tray.
2. **Would a teacher put it on the board?** Yes — expanded form as "one value from each place", the zero place shown as *no key*, and digit value as "which key is this digit" — every 2.NBT.A.3 / G2-225 error has a visible consequence on the drums.
3. **Would a parent trust it?** Calm, drawn apparatus, numerals only, no timer.
4. **The invention:** an adding machine whose keys are labelled with their place values, so making a number IS writing its expanded form, and a zero is a column where nothing is pressed.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **G1-121 "Build It Right" was not covered**: the designer pointed it at row 149's Match job, which is three-digit and another row. New fourth job **Which set?** (two digits only): three block sets, the child feeds one to the machine, the machine presses that set's keys by itself and the drums are judged against the ticket. Nine rounds measured (`work-c34/c150pick2.js`): position 3/3/3, rods-only and cubes-only 0/9, piece-count ranks 3/3/3 (most / fewest / middle each at chance), a one-rod or one-cube near miss in every round, phone budget 649 ≤ 740.
- Checked the digit-value tables: bright digit in hundreds/tens/ones 3/3/3 (three digits) and 5/4 (two digits); the face-value key is right 3/9 and 4/9 — confirmed.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
