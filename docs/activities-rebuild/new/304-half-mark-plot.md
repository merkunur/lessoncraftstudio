# New 304 — The Half-Mark Ruler → THE PLUMB LINE: the line plot hangs straight under the ruler, so every measurement drops its X onto the very mark you pinned (3.MD.B.4)

## 0. Identity
- **id** `half-mark-plot.play.3-md-b-4` · grade 3 · CCSS 3.MD.B.4 · Measurement & Data · key `half-mark-plot` → `half-mark-plot-core.js`, `half-mark-plot-activity.js`, `-activity.html`, `half-mark-plot-activities.json` (start with `node scripts/new-activity.js --num=304`; 0 lines to shared cores).
- **Worksheets covered:** G3-335 "Halfway Marks" (count the X marks above each number of a line plot marked in halves; write how many).
- New instrument; no old activity.

## 1. The pitch
"Slide the sticker to the ruler's 0, pin its end to the nearest half mark — and its X drops straight down a plumb line onto the line plot hanging under the ruler, because the plot's number line IS the ruler."

## 2. Why a child will want it again
- **The sticker sheet (the honest frame).** The things on the bench are **stickers** peeled off a sticker sheet — a sticker shark, a sticker ferry, a sticker baguette — so "the ferry is 5½ cm long" is never claimed: the sticker is. Each sticker has a 3 px white die-cut border and a soft shadow (drawn apparatus around the library picture), and it peels off the sheet with a little curl when its turn comes.
- **The click to zero.** Each sticker arrives lying loose on the bench a little to the right of 0. Drag it left: when its left end reaches the 0 mark it clicks into place with a small "tock" and a teal glint along the edge — the start is settled.
- **The pin and the loupe.** The red reading pin slides along the top of the ruler and snaps from mark to mark (whole and half) with a tick; a round magnifier (×3) follows it, showing exactly where the picture's end sits between two marks.
- **The drop (the show).** On a right pin, a thin plumb line falls from the pin straight down through the ruler to the plot, and an X slides down it (a 300 ms fall with a soft bounce) onto the stack above that mark. Eight pictures make a little mountain range of X's.
- **Who's who.** Tap any X on the plot and its picture pops up above it at full size for a moment — "that one was the shark".
- **The end-of-set show:** after the questions, the eight pictures line up above the plot, each standing over its own column, shortest at the left.

## 3. The skill and the misconception
- **Skill (3.MD.B.4):** measure lengths to the nearest half unit with a ruler marked in halves, and show the data on a line plot whose scale is marked off in halves; answer questions from the plot (how many at a length; how many longer/shorter than a length; how much longer the longest is than the shortest).
- **Misconception 1 — start at the ruler's edge or at 1.** The ruler's body runs ½ unit to the left of 0 (as real rulers do), and the picture arrives off-zero. **Pushback:** the pin stays asleep until the picture's left end clicks onto the 0 mark; a picture parked against the ruler's edge does not click.
- **Misconception 2 — a half mark is a whole step** (reading 3 then 3½ as "3, 4"). **Pushback:** the plot hangs directly under the ruler with the SAME marks; the X falls onto 3½, between 3 and 4, and stacks there — a child who wrote "4" sees their X land a half step to the left of 4.
- **Misconception 3 — X's between marks.** **Pushback:** the pin snaps only to marks, so the X can only fall onto a mark; the data are always "to the nearest half".
- **Misconception 4 — nearest half = the mark just before the end** (truncating). **Pushback:** the loupe shows the end with the two neighbouring marks; on a miss, two little brackets measure the distance to each and the shorter one glows.

## 4. The stage
**At 704 px (one column, full width 680):**
- **Task line** (20 px): **"Slide the sticker to 0. Pin its end to the nearest half mark."** (quarters setting: **"…to the nearest quarter mark."**; plot questions: §9).
- **The bench** (top): a light wooden strip 680 × 160 where the picture lies — a library picture drawn so that its **ink width** is its true length at **75 px per unit** (its height follows its own aspect; every picture is ≥ 129 px tall here, §6).
- **The ruler** (drawn): 0–8 units, body from −½ to 8¼, 600 px of scale at 75 px/unit, whole marks 3 px × 28 px numbered (Baloo 2 20 px), half marks 2 px × 18 px (setting "numbered halves" adds a small "½" 13 px under each), the unit at the right end: **in** (en) / **cm** (all others).
- **The reading pin:** a red wedge 28 × 24 riding on the ruler's top edge with a 52 px round grip above it; **the loupe** (110 px circle, ×3) floats above the pin.
- **The plot** (under the ruler, its axis aligned pixel-for-pixel with the ruler's marks): a number line 0–8 marked in halves, labels on whole numbers; X tokens drawn as 2 px crossed strokes in teal, 22 × 22, stacked 24 px apart, up to 4 high.
- **Bubble and answer** (bottom row): bubble left (18 px), answer box 110 × 60 + a keypad 3 × 4 (with a **½** key for the difference question) 52 × 48, Check 140 × 56.
- No words on the apparatus: numerals, ½, the unit symbol.

**At 360 px:** ruler 0–8 at **39 px per unit** (312 px of scale, body 328); bench 328 × 130 (every picture ≥ 67 px tall, §6); pin grip 44 px; loupe 88 px (×3 shows 29 px of ruler = ¾ unit, enough to see both neighbouring marks); plot axis aligned under the ruler, X 16 × 16 stacked 18 px; keypad 4 × 3 keys 76 × 46, Check full width 52. Budget 360 × 740: header 56 + task 48 + bench 130 + ruler 56 + plot 100 + bubble 52 + keys 100 + Check 52 = 594 ✓; At 320 × 640 the scale is 35 px/unit (280 px; every picture shrinks in proportion — the smallest is then 60 px tall, the 64 px floor being defined at 360) and the loupe stays 88 px→ 580 ✓.

## 5. The hand
- **Slide:** drag the picture along the bench (horizontal only); within 6 px of 0 its left ink edge snaps to the 0 mark ("tock", 120 ms glint). Released elsewhere it stays where it is.
- **Pin:** drag the pin's grip along the ruler; it snaps to the nearest whole or half mark as it moves (tick per mark); the loupe follows. The pin is disabled (grey) until the picture sits at 0.
- **Check:** right → the plumb line falls (200 ms) and the X drops (300 ms), the next picture slides in from the right. Wrong → misses §7.
- **Plot questions:** keypad (½ key appends "½"; in quarters ¼ and ¾ keys too); Check.
- **Tap an X:** its picture pops above the column at 96 / 64 px for 1.2 s.
- **Keyboard:** ← → slide the picture (Shift = jump to 0); Tab to pin; ← → move it one half mark; Enter = Check.
- **Undo:** re-slide or re-pin freely before Check.

## 6. The rounds
One **set** = 8 pictures measured one after another (8 rounds) + 2 plot questions (2 rounds) = 10 rounds per pass. Three sets rotate (A, B, C), each pass taking the next set. Lengths are picture lengths in ruler units (true length → nearest half shown after the arrow); "on the marks" setting uses the rounded value as the true length.

**Set A:** `toys/skateboard` 6.4 → **6½** · `bakery/baguette` 7.1 → **7** · `breakfast/sausage` 4.6 → **4½** · `vehicles/ferry` 5.4 → **5½** · `toys/airplane` 4.4 → **4½** · `classroom/stapler` 3.4 → **3½** · `ocean-life/tuna` 4.9 → **5** · `clothing/shoe` 3.1 → **3**. Plot: 3 (1), 3½ (1), 4½ (2), 5 (1), 5½ (1), 6½ (1), 7 (1). Questions: **"How many are 4½ long?" → 2**; count setting **"How many are longer than 5?" → 3**; difference setting **"How much longer is the longest than the shortest?" → 4**.
**Set B:** `vehicles/submarine` 5.6 → **5½** · `insects-and-bugs/centipede` 3.9 → **4** · `ocean-life/shark` 6.1 → **6** · `vehicles/car` 4.1 → **4** · `toys/car` 3.6 → **3½** · `vehicles/truck` 4.4 → **4½** · `toys/train` 3.9 → **4** · `ocean-life/fish` 2.6 → **2½**. Plot: 2½ (1), 3½ (1), 4 (3), 4½ (1), 5½ (1), 6 (1). Questions: **"How many are 4 long?" → 3**; count **"How many are longer than 4?" → 3**; difference **→ 3½**.
**Set C:** `forest-creatures/snail` 2.4 → **2½** · `forest-creatures/caterpillar` 2.6 → **2½** · `forest-creatures/lizard` 3.1 → **3** · `breakfast/bacon` 3.6 → **3½** · `ocean-life/whale` 5.4 → **5½** · `vehicles/van` 5.1 → **5** · `toys/truck` 3.9 → **4** · `reptiles-and-amphibians/alligator` 6.9 → **7**. Plot: 2½ (2), 3 (1), 3½ (1), 4 (1), 5 (1), 5½ (1), 7 (1). Questions: **"How many are 2½ long?" → 2**; count **"How many are 3½ long or shorter?" → 4**; difference **→ 4½**.

**Measured (`work-38/m304.js`):** halves are 5/8, 4/8 and 4/8 of the rounded lengths (≥ 40 % ✓); every true length is 0.15 unit from the nearest quarter (the rounding tie) — 11 px at 704, 6 px at 360, which the ×3 loupe shows as 18 px; the **truncate bot** (round down to the half below) is wrong in 5, 3 and 4 rounds per set, the **round-to-whole bot** in 5, 4 and 4 — so neither shortcut gets a set right. The **tallest column** is 4½ (A, middle), 4 (B, middle), 2½ (C, left) and never tied. **Picture sizes:** the shortest ink height is 67 px at 360 (stapler) / 129 px at 704, above the 64 / 96 floors; widths run from 94 px (snail) to 277 px (baguette) at 360.
**Answer position:** answers are pins on a ruler and typed numbers; the true end falls left-of-mark and right-of-mark equally often (true lengths ending in .1/.6 vs .4/.9: 12 and 12 over the 24 pictures), so "always the mark to the left" is right half the time at best. **Order:** inside a set the 8 pictures are reshuffled per pass (never the same order twice); the two questions always come last.

## 7. Check, the misses, the success
- **Check with the picture not at 0** → the 0 mark and the picture's left end pulse; **"Slide the sticker to 0 first."** (no miss). **Pin untouched** → **"Drag the red pin to where the sticker ends."** (no miss).
- **Miss 1** — a dashed plumb line drops from the picture's actual right end through the ruler (landing between two marks on the plot axis); the pin stays where the child put it. Bubble **"Here is where it ends. Which half mark is nearest?"**
- **Miss 2** — the two marks either side of the end light up and a bracket shows each gap from the end; the shorter bracket glows. Bubble **"It is nearer to {near} than to {far}."**
- **Plot question miss 1** — the column(s) asked about light up and each X in them gets a count number. Bubble count: **"Count the X's above {len}."** / **"Count the X's above every mark longer than {len}."** · difference: the shortest and longest X's light, a span bracket appears on the axis with its half marks ticking: **"Count the half steps from {min} to {max}."**
- **Plot question miss 2** — the answer's X's re-pop one by one / the span counts itself in halves (½, 1, 1½ …) — the child still types.
- A new slide, pin move or key takes the help away.
- **Success (measure)** — the X lands; bubble **"This sticker is about {len} {unit} long."** (no picture noun at all — no article, gender, Nordic definite suffix or Finnish case, and no false claim about the real animal or ship; "on the marks" and quarter rounds drop "about": **"This sticker is {len} {unit} long."**). **Success (question)** — the counted column glows; **"{n} things are {len} {unit} long."** / **"The longest is {d} {unit} longer than the shortest."** End of set: the line-up show (§2).

## 8. Settings
1. **Lengths:** to the nearest half (default) / on the marks / **quarters (en only)** — the stickers end between marks, exactly on whole or half marks, or (en) exactly on quarter marks of an inch ruler 0–6 marked in quarters (3.MD.B.4 says "halves and fourths of an inch"); at rest the ruler visibly changes (quarter ticks 2 px × 12 px appear between the half marks, scale 100 px per inch at 704 / 52 px at 360 so quarters stay 25 / 13 px apart). Outside en the third option is not shown: a centimetre ruler has no quarter marks, and inventing them would teach a false ruler.
2. **Plot questions:** how many (default) / how much longer — the plot's corner shows a small question token at rest (a stack-of-X icon vs a span-bracket icon), and the second question changes.

**Set Q (quarters, en only — "on the marks", ruler 0–6 in quarters; the plot's axis is marked in quarters, labels on whole inches):** `forest-creatures/snail` **1¾** · `ocean-life/fish` **2¼** · `toys/car` **2¾** · `classroom/stapler` **3¼** · `breakfast/sausage` **3¾** · `toys/airplane` **3¼** · `clothing/shoe` **2½** · `toys/skateboard` **4¾**. Plot: 1¾ (1), 2¼ (1), 2½ (1), 2¾ (1), 3¼ (2), 3¾ (1), 4¾ (1) — tallest 3¼, unique; 7 of 8 lengths are odd quarters, so "read the nearest half" is wrong 7 times. Questions: **"How many are 3¼ long?" → 2** · count **"How many are longer than 3?" → 4** · difference **→ 3**. The keypad gains ¼ and ¾ keys. Picture heights (critic's solver `work-c38/c304q.js`, ink aspect from art-extents): smallest 68 px at 360 (snail) / 131 px at 704 — above the floors.

## 9. Words (EN source)
- title **"The Half-Mark Ruler"**
- task **"Slide the sticker to 0. Pin its end to the nearest half mark."** (quarters: **"…nearest quarter mark."**) · questions **"How many are {len} long?"** · **"How many are longer than {len}?"** · **"How many are {len} long or shorter?"** · **"How much longer is the longest than the shortest?"**
- hints and celebrations as §7.
- settings **"Lengths"**: "to the nearest half" / "on the marks" · **"Plot questions"**: "how many" / "how much longer"
- **Locale traps:** (a) **Units:** en inches with half (the US 3.MD.B.4 setting); every other locale centimetres with half-centimetre marks, the same numbers — the build swaps only the unit symbol (in / cm) and the unit word. (b) **Halves are written with the ½ glyph** ("4½") in every locale rather than a decimal ("4,5" would bring a decimal comma Grade 3 has not met in most locales); spoken (TTS) as the locale's "four and a half" (*viereinhalb*, *quatre et demi*, *cuatro y medio*, *quattro e mezzo*, *quatro e meio*, *vierenhalf*, *fyra och en halv*, *fire og en halv*, *fire og en halv*, *neljä ja puoli*). (c) **"about"** (the picture is not exactly that long): de *ungefähr*, fr *environ*, fi *noin*, sv *ungefär*, da/no *cirka*/*omtrent* — reviewer picks the school word; the measurement is "to the nearest half", which is why "about" is honest. (d) **No picture noun in any sentence** — "This sticker is about {len} cm long" names the sticker, never the shark, so no label, article or case is needed; the word "sticker" is authored per locale (de *Sticker/Aufkleber*, fr *autocollant*, es *pegatina* (es-ES) / *calcomanía* — reviewer picks, it *adesivo*, pt *adesivo*, nl *sticker*, sv *klistermärke*, da *klistermærke*, no *klistremerke*, fi *tarra*). (f) **Quarters** (en only) are written ¼ ¾ with the glyphs; never offered in cm locales. (e) **Label checks:** `toys/car` and `vehicles/car` never in the same set (both "car"), `toys/truck` and `vehicles/truck` never in one set (they are in C and B respectively), `toys/airplane` only in A; the reviewer confirms each label names the picture (`insects-and-bugs/centipede` — de *Hundertfüßer*, fi *juoksujalkainen*).

## 10. Sound off, access, phones
- Sound off: the click to zero, the snapping pin, the loupe, the falling X and the brackets are all visible.
- Keyboard path §5; aria: picture `"{picture}, {at zero|not at zero}"`; pin `"pin at {len} {unit}"`; plot `"line plot: {list of len: count}"` after each drop; X buttons `"X for the {picture}"`.
- Taps: pin grip 52 / 44 px; keys ≥ 46 × 44; X tokens are 22 / 16 px but the whole column is a ≥ 44 px wide tap target.
- Pictures: drawn to their measured length; the shortest is ≥ 67 px tall at 360 and ≥ 129 px at 704; the "who's who" pop-up shows each at 96 / 64 px. X marks are drawn tokens (records are never shrunken pictures).
- Check above the fold (§4).

## 11. Distinct from
- **Row 152 The Glow Ruler** (2.MD.A.1, the number counts the spaces from 0) and **Row 153 The CM Cutter** — whole-unit length; **Row 155 The Snip-Out Tape** — differences on a tape; **Row 167 The Tide You Push** (2.MD.D.9, a line plot read by pushing the sea) — whole units, reading only; **New 272 The Double Stamp** (picture-graph scales). Here the plot is built from measurements in halves, and the invention is that the plot hangs under the ruler on the same marks, joined by a plumb line.
- **tool `ruler`**, **tool `unit-handle`**, **tool `class-graph`** — measuring or graphing, never both on one shared axis.

## 12. Build plan
- **Core state:** `{ lengths:'nearest'|'onMarks', questions:'count'|'diff', set:'A'|'B'|'C', order:[…], i, pic:{key, len}, picX, atZero, pin, plot:{len:count}, q:0|1|2, typed, misses }`.
- **Functions:** `pxPerUnit(width)`, `placePicture(key, len)` (ink box → length; the gate measures the drawn ink width = len × px/unit ± 1 px), `slide(x)` (snap within 6 px of 0), `nearestHalf(len)`, `pinSnap(x)`, `check()`, `drop()`, `columnCounts()`, `question(set, mode)`.
- **Gate (own truth):** every true length is ≥ 0.15 from a quarter; nearest-half recomputed; halves ≥ 40 % per set; tallest column unique; truncate and round-to-whole bots each wrong in ≥ 3 rounds per set; drawn ink width matches length at 360 and 704 (art-extents); ink height ≥ 64 / ≥ 96; plot axis marks at the same x as ruler marks (± 0.5 px); the pin cannot be placed before zero; the X falls onto the pinned mark; question answers recomputed from the plot.
- **Mutations (each killed):** zero snap targets the ruler's edge · pin allowed before zero · pin snaps to wholes only · plot axis offset from the ruler by ½ unit · X drops at the true length instead of the pin · truncating instead of rounding · tallest-column tie · a picture below 64 px · toys/car and vehicles/car in one set · same order twice.
- **Pictures (seen on contact sheets; lengths from `art-extents.json` ink boxes):** toys/skateboard, bakery/baguette, breakfast/sausage, vehicles/ferry, toys/airplane, classroom/stapler, ocean-life/tuna, clothing/shoe, vehicles/submarine, insects-and-bugs/centipede, ocean-life/shark, vehicles/car, toys/car, vehicles/truck, toys/train, ocean-life/fish, forest-creatures/snail, forest-creatures/caterpillar, forest-creatures/lizard, breakfast/bacon, ocean-life/whale, vehicles/van, toys/truck, reptiles-and-amphibians/alligator. **Not used:** classroom/pencil, crayon, marker, pen (drawn diagonally; the crayon is a stub), vehicles/canoe (drawn tilted), classroom/book (drawn in perspective), vegetables/carrot/cucumber/celery (diagonal or upright), spring/leaf, insects-and-bugs/worm (curled), accessories/ribbon (a bow).
- **Risks:** the 0.15-unit rounding margin is 6 px at 360 — the loupe is essential; the 320 layout scrolls the bench. Nothing blocked. Critic re-measured every picture from `art-extents.json` (`work-c38/c304.js`): sets A/B/C smallest heights 67 / 74 / 70 px at 360 and 129 / 142 / 135 px at 704; all 24 nouns exist in the theme JSONs.

## 13. The four questions
1. **Choose it again?** Yes — clicking a shark to zero, pinning its tail, and watching its X drop down a plumb line onto a growing plot is satisfying, and tapping X's to see who they were is play.
2. **Teacher on the board?** Yes — measuring to the nearest half, a half-unit line plot, and plot questions, with "start at 0", "a half is a whole step" and "round down" all pushed back by the apparatus.
3. **Parent trust?** Calm, real ruler, library pictures at honest sizes, no timer, no score.
4. **Invention:** the line plot hangs straight under the ruler on the same marks, so every measurement drops its X down a plumb line onto exactly the half mark you pinned.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **An untrue sentence on every success:** "The ferry / whale / shark is about 5½ cm long." The things on the bench are now stickers from a sticker sheet and the success says "This sticker is about {len} {unit} long" — true, and with no picture noun it also removes every article/case trap in 10 locales.
- **3.MD.B.4 says halves AND fourths of an inch** and the dossier asked for "quarter marks too"; the design had dropped quarters. Added a quarters setting (en only — a cm ruler has no quarter marks, so it is honestly hidden elsewhere) with Set Q (8 stickers on quarter marks, unique tallest column, ¼ ¾ keys, its three questions) measured by the critic.
- Every picture height re-measured from `art-extents.json` with my own solver (sets A/B/C ≥ 67 px at 360, ≥ 129 px at 704; Set Q ≥ 68 / 131); all rounding, plot counts, question answers and bot claims re-solved — correct.
