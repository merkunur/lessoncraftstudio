# Row 98 — The Zero-Swallowing Cards: forty-seven is a 7 laid on the 0 of 40 (1.NBT.B.2)

## 0. Identity
- **id** `place-value.tens-and-ones.1-nbt-b-2` (frozen) · grade 1 · CCSS 1.NBT.B.2 (a, b, c) · strand Number and Operations in Base Ten · own files `zero-cards-core.js`, `zero-cards-activity.js`, `zero-cards-activity.html`; manifest row stays in `place-value-activities.json`, `tool` → `zero-cards-activity` (slugs/titles/intros frozen in all 11 locales).
- **Worksheets covered:** G1-120 Tens and Ones · G1-121 Build It Right (circle the blocks that show the number) · G1-122 How Many Tens? · G1-133 Stretch the Number (expanded form) · G1-243 / 255 / 256 / 257 Number of the Day (build the number from its word, its tens-and-ones, ten more / ten less).
- **Old activity:** "Build {n}" — tap a ten-rod button or a unit-cube button until the mat shows the number. **Kept:** the 18 targets `12, 13, 16, 19, 23, 29, 30, 35, 47, 50, 58, 64, 70, 72, 86, 89, 90, 95`, the prompt `taskBuild` "Build {n}" (11 locales), the hint ideas "you need more / too many / ten ones make one ten", the expanded-form prompt. **Dropped:** button-counting to a target with no reason to think in tens.

## 1. The pitch
"Numbers are built from cards — a long tens card like 40 and a short ones card like 7 — and the 7 only stays when you lay it on the 0 of the 40: then the card says 47 and its blocks, 4 rods and 7 cubes, pour out underneath."

## 2. Why a child will want it again
- **Arrow cards are a classroom toy children love** (Montessori's *hidden place value* cards) — and here they do something the paper ones cannot: every card carries its blocks. Put down the 40 card and four rods roll out of it onto the mat with a wooden *clack-clack-clack-clack*; slide the 7 onto the zero and seven cubes trickle out *tik-tik-tik…*.
- **The zero is swallowed.** When the short card lands on the long card's 0, the 0 disappears under it with a little *gulp* animation (the card edge dips 3 px and settles). Children enjoy feeding the zero.
- **Stretch it!** Pull the ones card off sideways and the number *stretches*: the 40 card slides left, the 7 slides right, and a plus sign pops up in the gap — "40 + 7". Let go near the 40 and it snaps back to 47. Elastic, satisfying, and it is expanded form.
- **Card stand show:** on success the stand flips the card stack toward the child like a magician's reveal, the blocks underneath line up as tens-then-ones, and a soft chime plays per rod.
- **Free play:** the full card rack (10…90, 1…9) is always available between rounds; any stack the child builds pours its blocks; any blocks the child sets out (in the "Which blocks?" face) can be compared with any stack.

## 3. The skill and the misconception
- **Skill:** a two-digit number is tens and ones (1.NBT.B.2): 10 is a bundle of ten ones (a); 11–19 are a ten and some ones (b); 10, 20 … 90 are one … nine tens and no ones (c); and 47 = 40 + 7 (expanded form, G1-133).
- **Misconception 1 — "407" / writing what is heard:** "forty-seven" written as 40 then 7 → 407. **Pushback by physics:** the card stand is exactly two digits wide. A 7 card laid *beside* the 40 card hangs off the stand's right edge; it tips and slides off (260 ms) — 407 cannot be made. The 7 only rests on the 0.
- **Misconception 2 — digits as faces, not amounts:** "the 4 in 47 is 4." **Pushback:** the 4 lives on a card that *is* 40 (when the 7 is lifted, 40 is plainly printed) and pours four rods — each rod ten cubes long. The two digits pour different-sized things.
- **Misconception 3 — reversal (47 ↔ 74) and "how many tens" counted as ones:** in "Which blocks?" the child lays the card stack over a block set: the cards' own blocks drop as a translucent ghost onto the set; a reversed set for 47 (7 rods, 4 cubes) shows three real rods with no ghost over them and three ghost cubes with nothing under them — the mismatch glows exactly where it is.
- **Misconception 4 — teens:** "thirteen is 3 then 1." The 10 card + 3 card make 13; the ten pours ONE rod — "one ten and three".

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: stage 430 px left, rack 230 px right):**
- **The target card** (top-left, 200 × 64; 200 × 96 for the picture coats): the round's number in one coat — numeral (48 px), number word, "4 tens, 7 ones", **ten frames** (drawn frames, filled dots, 18 px cells), **tally marks** (five-gates, drawn) or spoken (a speaker 36 px; the numeral is shown small beside it, so sound off still has a target). These are the Number-of-the-Day coats (G1-243/255/257); the *neighbours* of the number of the day are Row 97's face.
- **The card stand** (centre, 300 × 120): a wooden ledge exactly two card-digits wide (each digit cell 120 × 110), with a slight lip. Tens cards are 240 × 110 (two digits wide, e.g. "4 0" in 80 px Baloo 2, the 0 in the right cell); ones cards 120 × 110 with a small tab pointing left (the classic arrow tip) — the tab is the grip.
- **The mat** (under the stand, 400 × 230): blocks pour here — rods (28 × 140 px, coral, ten segment lines) stand side by side on the left, cubes (28 × 28, teal) in rows of five on the right. Light lines divide it into a tens half and a ones half; no words.
- **The rack** (right column): tens cards 10–90 as a fan of overlapping long cards (each 180 × 52 visible strip, showing its numeral), ones cards 1–9 as a 3 × 3 grid of 64 × 64 tiles. All drawn apparatus.
- **Task line** (≤ 24 px), EN default: **"Build the number with cards."**
- **No words on the apparatus** (numerals only on cards).

**At 360 px (stacked):** target card 328 × 52; stand 240 × 88 centred (digit cells 120 × 88); mat 328 × 170 (rods 20 × 100, cubes 20 × 20); rack becomes two rows: tens cards as nine 64 × 44 chips showing "10 … 90" in a scroll strip (all nine visible at 360 in a 5 + 4 wrap), ones cards nine 44 × 44 tiles. Check above the 740 fold. 320: stand 220 × 80, chips 58 × 44.

## 5. The hand
- **Place a tens card:** drag (or tap) a tens card from the rack onto the stand → it settles with a wooden *knock* (≤ 100 ms), then its rods roll out one by one onto the mat (110 ms each, *clack*). A second tens card dropped on an occupied stand swaps: the old card returns to the rack and its rods roll back into it.
- **Place a ones card:** drag the ones card by its tab. Over the 0 of the tens card the card glows and, released, slides onto the 0 — the 0 is swallowed (*gulp*, 180 ms) and the cubes trickle out (70 ms each). Released anywhere else on the stand: on the stand's left cell (over the tens digit) it will not lie flat — the tens digit's ridge holds it up and it slides off to the right; beyond the right edge it tips off (260 ms) and floats back to the rack. On an *empty* stand it may lie in the right cell alone (a one-digit number, e.g. 7) and pours 7 cubes.
- **Stretch:** drag the ones card sideways (right) off the stack: the stand widens (an extension leaf slides out), the cards separate and a "+" appears in the gap: **40 + 7**. Release near the 40 → snaps back to 47 (elastic 220 ms). Release far → stays stretched (the expanded-form answer in that face).
- **Lift:** tap a placed card to send it back to the rack; its blocks roll back into it first (reverse animation).
- **"Which blocks?" face:** three block sets lie in three trays below the stand; the child drags the whole built card stack down onto a tray (the stack shrinks to a 120 px tile while dragged). Its ghost blocks drop onto the tray: a match locks with a click; a mismatch glows at the extra or missing blocks and the stack floats back.
- **Undo:** everything is liftable until Check.

## 6. The rounds
**Face "Build it"** (default; the old targets, split into two passes of nine — each pass mixes teens, decade numbers and others):
- pass A (coat fixed per target, decided): **12** ten frames (one full frame + 2) · **23** tally (four five-gates + 3) · **35** numeral · **47** number word · **58** spoken · **64** "6 tens, 4 ones" · **72** number word · **86** spoken · **90** "9 tens"
- pass B: **13** number word · **16** tally (three five-gates + 1) · **19** ten frames (one full frame + 9) · **29** "2 tens, 9 ones" · **30** "3 tens" · **50** "5 tens" · **70** numeral · **89** number word · **95** spoken
- every coat appears in every two passes; tally is used only up to 25 marks and ten frames only up to 20 (larger tallies are counted, not read); decade numbers 30, 50 and 90 appear as "n tens" and 70 as a bare numeral so 1.NBT.B.2.c is met both ways — no ones card at all, the stand stays with its 0 showing. The order of the nine is reshuffled per pass; the coats travel with their targets.
**Face "How many tens?"** (G1-122): blocks on the mat (only rods), child picks the tens card: 30 · 60 · 20 · 80 · 50 · 90 · 40 · 70 (8 rounds). A ones card is accepted on the stand only if it matches loose cubes — there are none, so any ones card makes a mismatch on Check.
**Face "Stretch it"** (G1-133): the stack is given built; the child stretches it and the "+" form must stay: 43 · 67 · 25 · 81 · 59 · 34 · 96 · 18 (8 rounds). A second step in each round: the expanded form is shown first ("60 + 7") and the child builds the stack — alternating direction round by round.
**Face "Which blocks?"** (G1-121): the target is a numeral; three trays, one right; distractors are the reversal and a one-off set:
| target | right | distractor A (reversed) | distractor B (one off) | right tray |
|---|---|---|---|---|
| 47 | 4 r 7 c | 7 r 4 c | 4 r 6 c | 1 |
| 63 | 6 r 3 c | 3 r 6 c | 5 r 3 c | 2 |
| 28 | 2 r 8 c | 8 r 2 c | 2 r 7 c | 3 |
| 51 | 5 r 1 c | 1 r 5 c | 4 r 1 c | 2 |
| 39 | 3 r 9 c | 9 r 3 c | 3 r 8 c | 1 |
| 16 | 1 r 6 c | 6 r 1 c | 1 r 5 c | 3 |
| 72 | 7 r 2 c | 2 r 7 c | 8 r 2 c | 1 |
| 85 | 8 r 5 c | 5 r 8 c | 8 r 4 c | 3 |
| 14 | 1 r 4 c | 4 r 1 c | 2 r 4 c | 2 |
- **Answer position:** "Which blocks?" right tray 1/2/3 = 3/3/3 over the 9 rounds and re-shuffled per pass (the tray order is drawn per pass with the constraint that each position holds the right set exactly three times; the gate measures this and that no position wins twice in a row more than once). Build faces have no positions (answers are built).
- **Order:** order-only reshuffle per pass; never the same order twice. No 0 is ever a target.

## 7. Check, the misses, the success
- **Check with an empty stand** → bubble "Put a card on the stand." (no miss).
- **Miss 1:** the target's own blocks appear as a translucent ghost beside the child's blocks on the mat, rod for rod, cube for cube; the rods or cubes that differ glow (extra rods red-orange outline, missing ones dashed). EN **"Look at the rods. How many tens does {n} need?"** (if the ones differ: **"Look at the cubes. How many ones?"**)
- **Miss 2:** the target stretches itself in pencil above the stand ("40 + 7") and the right card glows in the rack. EN **"{n} is {tens} and {ones}."** (e.g. "47 is 40 and 7.")
- New moves take the help away until the next Check.
- **Success:** the stand flips the card stack toward the child (a 3D tilt, 300 ms), rods count themselves "10, 20, 30, 40" (small numerals over each rod, one per 150 ms) then cubes "41 … 47"; chime. EN **"47 — 4 tens and 7 ones."** Stretch face: **"47 is 40 + 7."** Decade numbers: **"30 — 3 tens and no ones."** Teens: **"13 — 1 ten and 3 ones."**

## 8. Settings
1. **Task:** build it (default) / how many tens? / stretch it / which blocks? — changes the stand, mat and trays at rest.
2. **Numbers:** to 20 / to 50 / to 99 (default) — swaps the round sets and the rack at rest. Build sets: **to 20** 11 word · 12 ten frames · 13 numeral · 14 "1 ten, 4 ones" · 15 tally · 16 spoken · 17 word · 18 ten frames · 19 numeral (rack: only the 10 card and 1–9); **to 50** 13 word · 19 ten frames · 21 tally · 28 "2 tens, 8 ones" · 30 "3 tens" · 34 numeral · 40 "4 tens" · 45 spoken · 47 word (rack 10–50). How-many-tens, stretch and which-blocks lists are filtered to the range and topped up with the same shapes (to 20: tens = 10 only, so that face shows 10 in every coat; trays use teens 11–19 and their reversals ≤ 91).

## 9. Words (EN source)
- in-tool title: **"Tens and Ones"**
- instruction: **"Build the number with cards."** · how many tens: **"How many tens? Find the card."** · stretch: **"Stretch the number apart."** / **"Put the parts together."** · which: **"Which blocks show the number?"**
- prompts: `taskBuild` **"Build {n}"** (kept) · **"Build {word}"** · **"Build {t} tens and {o} ones"** · **"Build {t} tens"** · **"Stretch {n}"** · **"Build {a} + {b}"** · **"Which blocks show {n}?"**
- hints: **"Put a card on the stand."** · **"Look at the rods. How many tens does {n} need?"** · **"Look at the cubes. How many ones?"** · **"{n} is {tens} and {ones}."**
- celebrations: **"{n} — {t} tens and {o} ones."** · **"{n} — {t} tens and no ones."** · **"{n} — 1 ten and {o} ones."** · **"{n} is {tens} + {ones}."**
- settings: **"Task"**: "build it" / "how many tens?" / "stretch it" / "which blocks?" · **"Numbers"**: "to 20" / "to 50" / "to 99"
- **Locale traps:** (a) **The number-word coat** must come from `lib/number-words.js` per locale — and it is exactly where the cards earn their keep: de *siebenundvierzig*, nl *zevenenveertig*, da *syvogfyrre* say the ones first; the stack is still built tens card first, ones card on the zero, so the child learns the written order is fixed whatever the spoken order. da 50–90 (*halvtreds, tres, halvfjerds, firs, halvfems*) and fr 70–99 (*soixante-dix, quatre-vingts, quatre-vingt-dix*) are said, never decomposed on the cards — the tens card is still simply 50 or 70. (b) **"n tens, m ones" frames:** de *4 Zehner und 7 Einer*, fr *4 dizaines et 7 unités*, es *4 decenas y 7 unidades*, pt *4 dezenas e 7 unidades*, it *4 decine e 7 unità*, nl *4 tientallen en 7 eenheden*, sv *4 tiotal och 7 ental*, da *4 tiere og 7 enere*, no *4 tiere og 7 enere*, fi *4 kymmentä ja 7 ykköstä* (partitive after the numeral; "1 kymmen ja 3 ykköstä" for 13 — the singular "1 ten" frame needs its own string in every locale: en "1 ten and 3 ones"). (c) **Arrow cards** are known as *Stellenwertkarten / Zahlenkarten* (de), *cartes à flèches / cartes de numération* (fr), *tarjetas de valor posicional* (es), *fichas sobrepostas* (pt), *carte del valore posizionale* (it), *getallenkaartjes* (nl), *positionskort* (sv) — names appear nowhere on screen. (d) Expanded-form "+" and the order "40 + 7" are universal; fi children also write *40 + 7*. (e) A blank tens digit is never written "07".

## 10. Sound off, access, phones
- Legible with sound off: cards, pouring blocks, the tipping 7, the ghost comparison and the stretch "+" are all visual. Spoken targets always also show their text coat.
- Keyboard: Tab to the rack; arrows choose a card; Enter places it (ones card goes onto the zero if a tens card is there, else into the right cell); S stretches / unstretches; in "Which blocks?" 1/2/3 lays the stack on a tray.
- aria: stand `aria-label="cards: 40 and 7 — forty-seven"`; mat `aria-label="4 rods, 7 cubes"`; trays labelled by their blocks.
- Taps: cards ≥ 44 px (ones tiles 44–64, tens chips 58–64 × 44); trays ≥ 96 px. Check above the fold at 360×740 and 320×640.

## 11. Distinct from
- **place-value-lab (tool):** a free base-ten workmat whose ten ones snap into a ten and whose number word lights up. Here the *written numeral* is the object you build, and the zero-swallowing stand makes the place of each digit physical.
- **Row 96 Roll-Up Mats / Row 97 Nine-Stop Tubes (this batch):** adding and changing a number; here the number is composed and decomposed.
- **Rows 93 / 94 / 95 (slingshot tens, Bundle Bot, ten-rod drawers):** making tens from ones, comparing; none uses arrow cards or expanded form.
- **New #253 Name Rail (this batch):** builds the number's *name* from word tiles; here the word is only a target coat and the written numeral is built.
- **#30 Overflow Trays (designed):** teen numbers as a full tray plus overflow; here teens are the 10 card with a ones card on its zero.

## 12. Build plan
- **Core state:** `{ task, range, target:{n, coat}, stand:{tens:null|10..90, ones:null|1..9, stretched:false}, mat:{rods, cubes}, trays:[{rods,cubes}]×3, placedOn:null|0..2 }`.
- **Functions:** `placeTens(v)`, `placeOnes(v, where:'zero'|'left'|'right'|'off')` → `'stacked'|'tipped'|'alone'`, `stretch(on)`, `lift(which)`, `value()`, `blocksOf(stack)`, `layOn(tray)` → `{match, extra:{rods,cubes}, missing:{rods,cubes}}`, `check()`.
- **Gate's truth (`verify-zero-cards-core.js`):** an independent oracle `tens = floor(n/10)*10, ones = n%10`; every round has exactly one card stack; `placeOnes(_, 'right')` next to a tens card always tips (407 unreachable — exhaustive over 10..90 × 1..9); decade targets never accept a ones card; "Which blocks?" has exactly one matching tray and the right tray is 3/3/3 per pass; celebration numbers equal the target; every number word equals the shared table.
- **Mutations:** ones card may lie beside the tens card (407 buildable) · zero not swallowed (value read as 407) · a tens card pours ones cubes · decade target accepts a "0" ones card · stretch shows "4 + 7" · ghost compare marks the wrong blocks · two right trays in a round · right tray always 1 · same order twice · number word from the wrong locale.
- **Pictures:** none (apparatus only). **Risks:** at 320 px the stretched stand needs 300 px (the leaf overlaps the rack strip; the rack hides while stretched). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — cards that pour their own blocks, a zero that gets eaten, a number that stretches like a rubber band.
2. **Teacher on the board?** Yes — arrow cards are a beloved place-value apparatus; this version adds the blocks inside each card and makes "407" physically impossible, which is the misconception teachers fight.
3. **Parent trust?** Calm, wordless apparatus, numerals and blocks, works on a phone.
4. **Invention:** the ones card only stays when it is laid on the tens card's zero — then the card reads 47 and pours out 4 rods and 7 cubes.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- **Number of the Day split cleanly with Row 97:** both designs built the number from its coats. Here the coats (numeral, word, tens-and-ones, spoken, **ten frames, tally** — the last two were missing although G1-243/255/257 ask for them) are now assigned target by target in both passes; Row 97 owns the neighbours.
- The "each coat ≥ 2 times per pass" rule was impossible (6 coats × 2 > 9 rounds); replaced with an explicit coat per target, tally ≤ 25 marks, ten frames ≤ 20.
- The **to 50** set was unspecified; written out, and the to 20 set gets its coats.
- Misconception 3 described the ghost/real mismatch the wrong way round (for 47 vs 7 rods 4 cubes: three real rods without ghost, three ghost cubes without blocks) — corrected.
- The old 18 targets all kept; which-blocks tray balance (3/3/3) re-checked.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
