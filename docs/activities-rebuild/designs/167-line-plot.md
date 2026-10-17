# Row 167 — Shelly's Tide-Line → THE TIDE YOU PUSH (2.MD.D.9)

## 0. Identity
- id `line-plot.read.2-md-d-9` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl, sv — da, no, fi slug, title and intro are new at build, grade 2) · CCSS 2.MD.D.9 (generate measurement data by measuring lengths of several objects to the nearest whole unit; show the measurements on a line plot) · strand Measurement & Data · own files `tide-plot-core.js`, `tide-plot-activity.js`, `tide-plot-activity.html`, `tide-plot-activities.json` (this row leaves `line-plot-activities.json`; 0 lines to `line-plot-core.js` and `lcs-shell.*`).
- page title (frozen): "Shelly's Tide-Line — Measurement Line Plots (Grade 2)"; intro (frozen) promises: **help Shelly measure shells and plot their lengths on a tide-line; read the X's stacked over each number to find how many shells are a given length, how many are longer, the most common length, and how much longer the longest is than the shortest.** All kept, all four question kinds kept (plus "how many more" from the old rounds). Shelly the hermit crab is named in the words only — the library crab (`beach/crab`) is not a hermit crab, and nothing is drawn by hand.
- worksheets also covered: **G2-240** Read the Line Plot (count the X's above each number) → level "Read the tide-line" · **G3-335** Halfway Marks (measure to the half unit, read a plot marked in halves) → level "Halves" (row 304's Half-Mark Ruler goes deeper into halves and quarters; this row gives the grade-2 bridge).
- what the old activity did: a pre-drawn plot of X's on a 1–8 cm scale, a question, tap the answer; three "plot" rounds where a coral bar stood for a shell and the child tapped its length. **Kept**: the 1–8 cm scale, centimetres in every locale, the three old data sets ([2,3,5,5,5,6,8], [3,4,4,4,6,7], [2,2,4,6,6,6,7]) and their questions (how many at 5 → 3; the mode 6; longest − shortest 6 and 5; 5 vs 6 → 2 more; how many at 4 and "longer than" kept as kinds on new sets), the plot rounds (now real library shells measured on a ruler). **Changed**: the questions are answered by pushing water over the plot so only the shells that matter stay dry (§1) — the old rounds could be answered by counting any column; the reading skill was invisible.

## 1. The pitch
"The tide-line is a real beach: push the sea in from the sides or raise the sea level until only the shells the question asks about are still dry — then count the dry X's."

## 2. Why a child will want it again
- **Water you can push.** Under the plot is a sandy beach with the numbers on it. Two blue wave handles sit at its left and right ends, and a red-and-white buoy floats on a post at the right edge. Drag a wave handle and the sea **slides in over the sand** with a gentle lapping ripple; drag the buoy up and the **sea level rises** across the whole plot, row by row, X's going under with a soft *bloop* and shimmering blue. Children push the tide back and forth just to watch shells drown and resurface.
- **Measuring with a real shell.** In the measure rounds a library seashell rides in on the measuring board — sometimes not at the start of the ruler. Slide it to the stop at 0 (it clicks), read where its edge ends, then drag it down to the tide-line: it **shrinks into an X** and drops onto its number's stack with a little splash of sand.
- **The earned show**: when the round is right, the tide rolls out, every X turns back into a little shell for a moment (they sparkle in their stacks), and the dry ones that answered the question do a hop — then the bubble says the answer in a full sentence. On measure rounds the new X's are the last two shells of the collection, and the whole plot "fills in".
- No score, timer, streak or lives.

## 3. The skill and the misconception
- Skill (2.MD.D.9; G2-240; G3-335): measure lengths from the 0 of a ruler; record each measurement as an X above its number; read a line plot: how many at a length, how many longer/shorter than a length, the most common length, how much longer the longest is than the shortest, how many more at one length than another.
- Misconceptions and the push-back:
  1. **"Longer than 5" includes 5** → the shore can only stop **between** two numbers (it snaps to the gaps); to answer "longer than 5" the water must stop in the gap after the 5, and the 5-column goes under. A child who leaves 5 dry has visibly kept a column the question excludes.
  2. **Most common = the biggest count** (answering "3" instead of "6") → the sea rises until only one column pokes out; the answer is the **number on the sand under it**, tapped on the beach — the count is never an option in a mode round.
  3. **Longest − shortest = counting the numbers** (2…8 → 7) → the two shores close in until they touch the first and last shells; the dry beach between them carries footprints, one pair per step between numbers — six steps, not seven numbers.
  4. **How many more: counting the whole taller column** → the sea level is raised to the shorter column's height; only the part of the taller column above the water is the difference.
  5. **Measuring from the end of the ruler or from 1** → the shell arrives with its left edge at 0, 1 or 2; read without sliding it to 0 and the X lands one or two columns too far (and a 7 cm shell offset by 2 reads 9 — off the tide-line).
  6. **An X placed between numbers / a new stack started beside a stack** → X's only land on numbers and always stack on top of the column.

## 4. The stage
At 704 (stacked layout in every round (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704); the stage is ≈ 648 px wide. In measure rounds the board and the tide-line stay side by side inside it — board 350, tide-line 280 at a 40 px pitch; full-width plot in read rounds):
- **The measuring board** (left, 360 px; measure rounds only; drawn apparatus): a wooden board 350 × 320 with a ruler along its bottom edge — 0 to 9 cm at 37 px/cm (333 px — the furthest right edge any shell can reach is 2 + 7 = 9 cm, M8; a 0–8 ruler would have let that shell hang off the board), whole-cm ticks 18 px with numerals 18 px ink, half-cm ticks 10 px (unnumbered), a brass **stop** at 0 (a 12 × 40 bar). The shell: library `beach/seashell` (checked in `mini tools/pictures/beach.json`, seen on the contact sheet 2026-10-17; ink box measured 980 × 979 px — square), drawn so its **ink-box width = length × 37 px** (3 cm → 111 px, 7 cm → 259 px; height = width — the board is 320 tall). Its left ink edge sits at the offset on the ruler.
- **The tide-line** (right, 300 px in measure rounds; centred 560 px in read rounds; drawn apparatus): a sandy beach strip #EBD9B4 with a 3 px ink edge and the numbers on it (Baloo 2 22 px; in read rounds 1–8, in measure rounds 2–8, in halves 2–6 in halves with "½" set small: 2, 2½, 3 … 6). Column pitch 40 px (measure), 64 px (read), 46 px (halves). **X marks**: drawn tokens (two 4 px coral strokes, 26 px), stacked 28 px apart above their number. **Footprints**: tiny paired ovals between every two adjacent numbers on any dry sand. **Water**: left and right shores (translucent blue #7EC8E3 at 65 % with a white wave edge) and a sea-level band rising from the sand; X's under water are tinted blue and slightly wavy (still visible — nothing is hidden, only marked). **Handles**: wave handles (blue tabs 44 × 44 with a wave glyph) at the beach ends; the **buoy** (drawn red-white float, 44 × 44) on a thin post at the right edge, its height = the sea level.
- **The pebbles** (under the tide-line): a row of numbered beach pebbles 1–8 (cream-grey ovals 56 × 48 at 704, Baloo 2 24 px) for count answers. In mode rounds the pebbles fade and the numbers on the sand become tappable instead.
- Task line above (≤ 24 px, ≤ 2 lines): the round's question (§9). Bubble under the pebbles.

At 360 (stacked): measuring board 336 × 236 (ruler 0–9 at 30 px/cm = 270 px; shells 3 cm = 90 px … 7 cm = 210 px) → tide-line 336 × 180 (pitch 40 px; X 24 px; up to 4 rows) → pebbles 8 × 38 px drawn (44 px hit, 2 rows of 4 if needed) → bubble. Heights (measure round): 236 + 8 + 180 + 52 = 476 + header 56 + task line 52 + bubble 44 + Check 56 → 684 < 740. At 320 × 640: ruler 24 px/cm (3 cm shell = 72 px, 7 cm = 168), board 200, tide 160, pebbles 44 → 404 + 208 = 612 < 640. Read rounds (no board): tide-line 336 × 230, pitch 40 px.
- **Halves rounds at 704 use a stacked layout** (no split): the board 600 × 230 on top (ruler 0–6 cm at 48 px/cm = 288 px, half-cm ticks 12 px), the tide-line full width under it (9 columns 2, 2½ … 6 at a 64 px pitch, labels 20 px with a small ½) — nine columns would not fit beside the board. At 360 halves use a 36 px pitch (9 × 36 = 324) with 16 px labels.
- **Picture size**: the shell is ≥ 90 px at 360 and ≥ 111 px at 704 (above the 64/96 floors) because the shortest shell is 3 cm (read and measure) or 2½ cm (halves: 2½ × 48 px = 120 at 704, 2½ × 30 = 75 at 360).

## 5. The hand
- **Measure rounds**
  - **Drag the shell** left/right along the board: it slides on the ruler; at the stop it clicks (snap within 6 px of 0, a tick sound). It can sit anywhere — the child decides whether to zero it.
  - **Drag the shell down** onto the tide-line: as it crosses the board's edge it shrinks (200 ms) into an X that follows the finger; released over a column, it drops onto that column's stack (snap to the nearest number; between two numbers it goes to the nearer; off the beach it flies back to the board). Or **tap a number** on the sand to drop the board's shell there.
  - **Tap a placed X** (only the round's own new X's — the older ones are pinned with a tiny shell icon) → it flies back up to the board as the shell, at the offset it was dropped from.
- **Read rounds**
  - **Drag a wave handle** inward: the shore follows the finger and snaps to the gap between two numbers (or fully out); 100 ms ripple response; the covered sand goes blue.
  - **Drag the buoy** up/down: the sea level snaps to X rows (0, 1, 2 … rows covered).
  - **Tap a pebble** (count answer) or, in mode rounds, **tap a number on the sand** (length answer); the choice lifts and outlines.
- **Free play**: between rounds the tide controls are always live; in measure rounds the board's shell can be slid and dropped as often as the child likes before Check.
- **Keyboard**: Tab: left wave (←/→ moves a gap), right wave, buoy (↑/↓ a row), pebbles (←/→, Enter), numbers on the sand (mode rounds); measure rounds: shell (←/→ by 1 mm-step; Home = to the stop), Enter then ←/→ over the beach and Enter to drop.
- Sound (optional): lapping on shore moves, bloop when an X goes under, click at the stop, sand-splash on a drop.

## 6. The rounds
Data measured by `work-31/lp.js` (counts ≥ 1, unique modes, offsets).

**Level "Read the tide-line"** (default; G2-240) — 10 rounds on a 1–8 cm beach. Data sets: D1 [2,3,5,5,5,6,8] · D3 [2,2,4,6,6,6,7] (kept) · D4 [3,3,4,4,4,6,8] · D5 [2,4,5,5,7,7,7,8] (new). The old third set [3,4,4,4,6,7] is retired: its two questions ("how many at 4", "4 vs 6") live on in R2 and R9/R10 on richer sets.
| # | data | question | the tide that answers it | answer |
|---|---|---|---|---|
| R1 | D1 | How many shells are 5 cm long? | shores in the gaps 4\|5 and 5\|6 | **3** |
| R2 | D4 | How many shells are 4 cm long? | shores 3\|4 and 4\|5 | **3** |
| R3 | D1 | How many shells are longer than 4 cm? | left shore in 4\|5 | **5** |
| R4 | D5 | How many shells are shorter than 5 cm? | right shore in 4\|5 | **2** |
| R5 | D3 | Which length is the most common? | sea level 2 rows (only the 6 pokes out) | **6** (tap the 6) |
| R6 | D4 | Which length is the most common? | sea level 2 rows | **4** |
| R7 | D1 | How much longer is the longest shell than the shortest? | shores touch the 2 and the 8 | **6** |
| R8 | D3 | How much longer is the longest shell than the shortest? | shores touch the 2 and the 7 | **5** |
| R9 | D1 | How many more shells are 5 cm than 6 cm? | shores around the 5, sea level 1 row | **2** |
| R10 | D5 | How many more shells are 7 cm than 5 cm? | shores around the 7, sea level 2 rows | **1** |
Count answers across the level: 3, 3, 5, 2, 6, 5, 2, 1 (no value more than twice); mode answers 6 and 4, and in neither mode round does the mode equal its own count (6 has 3 X's, 4 has 3 X's) — the critic removed one 4 from D4 because the draft's R6 had the mode 4 with exactly 4 X's, so a child answering the count would have been marked right. In mode rounds the pebbles are faded and the answer is tapped on the sand.

**Level "Measure and plot"** (setting; 2.MD.D.9 generate data) — 8 rounds on a 2–8 cm beach. Each round: a plot of 4 shells already measured (pinned), then two new shells ride in one after the other (lengths 3–7 cm, left edge arriving at offset 0, 1 or 2 cm); measure each, drop each; Check checks both.
| # | plot already | shell 1 (length, arrives at) | shell 2 | final plot | a child who forgets the stop would drop at |
|---|---|---|---|---|---|
| M1 | 3, 4, 4, 6 | 5 cm, at 1 | 6 cm, at 0 | 3,4,4,5,6,6 | 6 / 6 |
| M2 | 2, 5, 5, 7 | 4 cm, at 2 | 4 cm, at 1 | 2,4,4,5,5,7 | 6 / 5 |
| M3 | 3, 3, 6, 8 | 7 cm, at 0 | 5 cm, at 2 | 3,3,5,6,7,8 | 7 / 7 |
| M4 | 4, 5, 6, 6 | 6 cm, at 1 | 3 cm, at 1 | 3,4,5,6,6,6 | 7 / 4 |
| M5 | 2, 3, 7, 7 | 3 cm, at 2 | 7 cm, at 0 | 2,3,3,7,7,7 | 5 / 7 |
| M6 | 4, 4, 5, 8 | 5 cm, at 1 | 6 cm, at 2 | 4,4,5,5,6,8 | 6 / 8 |
| M7 | 3, 5, 6, 7 | 6 cm, at 0 | 4 cm, at 1 | 3,4,5,6,6,7 | 6 / 5 |
| M8 | 2, 4, 6, 6 | 7 cm, at 2 | 5 cm, at 0 | 2,4,5,6,6,7 | 9 (off the beach) / 5 |
Arrival offsets over the 16 shells: 0 × 5, 1 × 6, 2 × 5 — zeroing is needed in 11 of 16, so "always slide" and "never slide" both get caught.

**Level "Halves"** (setting; G3-335) — 8 rounds on a 2–6 cm beach marked in halves; ruler with half-cm ticks.
| # | kind | data / shell | answer |
|---|---|---|---|
| H1 | measure | plot 3, 3½, 4, 4, 5 · shell 4½ cm at 1 | X on 4½ |
| H2 | measure | plot 2½, 3, 3, 4½, 5 · shell 3½ cm at 0 | X on 3½ |
| H3 | measure | plot 3½, 4, 4, 5, 5½ · shell 2½ cm at 1 | X on 2½ |
| H4 | measure | plot 3, 4, 4½, 5, 6 · shell 5 cm at 1 | X on 5 |
| H5 | read | [2½,3,3½,3½,4,4½,4½,4½,5½] — How many shells are 4½ cm long? | **3** |
| H6 | read | [3,3,3½,4,4,4,5,6] — How many shells are 3 cm long? | **2** |
| H7 | read | [2½,3,3½,3½,4,4½,4½,4½,5½] — How many are longer than 4 cm? | **4** |
| H8 | read | [3,3,3½,4,4,4,5,6] — Which length is the most common? | **4** |

- **Answer position**: count answers are pebble values (the pebble's place IS its number); the level's answer values are spread (above), and the gate asserts no answer value occurs in more than 30 % of a level's rounds. Mode answers are tapped on the sand, never the tallest column's count. Measure answers are positions on the axis; the right column is never the column directly under the shell's right edge at arrival in the 11 offset rounds (that is the misconception), measured.
- **Order**: order-only reshuffle per pass (`nextTask`), never the same order twice; the two mode rounds and the two range rounds are never adjacent.

## 7. Check, the misses, the success
- **Check with nothing done** → read rounds: the wave handles and buoy pulse; bubble "Push the sea so only the shells you need stay dry." · measure: the shell wiggles; "Measure the shell, then drop it on the tide-line." (no miss)
- **Read rounds** — two parts are checked: the tide (which shells are dry) and the answer.
  - miss 1, tide wrong → the shells that should be dry and are under water glow through the water (coral outline); the shells that should be under water and are dry wobble. Bubble by kind: "Longer than {n} means after the {n} — push the sea over the {n} too." / "Keep only the {n} dry." / "Raise the sea until just one stack sticks out." / "Bring both shores in until they touch the first and the last shell." / "Raise the sea to the top of the {b} stack."
  - miss 1, tide right but answer wrong → the dry X's number themselves 1, 2, 3 … in small tags (range rounds: the footprint pairs number themselves); bubble "Count the dry {X's | footsteps}."
  - miss 2 → the tide moves itself to the right place (600 ms, the child watches the water slide), the dry X's are numbered, and the right pebble/number gets a faint ring; bubble: the full reasoning ("After the 4 there are 5, 5, 5, 6 and 8 — five shells."). The child still taps the answer.
- **Measure rounds**
  - miss 1 → each wrongly dropped X flies back up as its shell to where the child measured it; if the shell was not at the stop, it slides to the stop now and a dashed line drops from its right edge to the ruler; bubble "Slide the shell to the 0 first, then read where it ends." If it was at the stop: "Look where the shell's edge ends on the ruler."
  - miss 2 → the shell slides to the stop, a teal line drops from its edge to the ruler number and on down to the tide-line column, which glows; bubble "It ends at {len} cm — drop it on the {len}."
- A new move removes the glows, numbers and lines until the next Check.
- **Success** → the tide rolls out, every X sparkles into a shell for a second, the answering X's hop; bubble: "**5 shells are longer than 4 cm.**" · "**Most shells are 6 cm long.**" · "**The longest shell is 6 cm longer than the shortest.**" · "**2 more shells are 5 cm than 6 cm.**" · measure "**Your shells are 5 cm and 6 cm. The plot has 6 shells now.**" · halves "**This shell is 4½ cm long.**"

## 8. Settings
1. **Level**: Read the tide-line (default) / Measure and plot / Halves — the board at rest changes (no measuring board; the board with its ruler; the half-cm beach).
2. **Footprints**: On (default) / Off — the step footprints between numbers show or hide on the sand at rest (off makes range rounds a pure reading of numbers).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (frozen h1 kept "Shelly's Tide-Line"; old localized titles kept: de "Shellys Gezeitenlinie", fr "Shelly et la ligne de marée", es "Shelly y la línea de marea", pt "Shelly e a linha da maré", it "Shelly e la linea di marea", nl "Shelly's getijdenlijn", sv "Snäckis strandlinje"; da/no/fi new) · instruction: "Help Shelly read her tide-line: push the sea until only the right shells stay dry."
- questions (kept from the old strings, cm in every locale): "How many shells are {n} cm long?" · "How many shells are longer than {n} cm?" · "How many shells are shorter than {n} cm?" · "Which length is the most common?" · "How much longer is the longest shell than the shortest?" · "How many more shells are {a} cm than {b} cm?" · measure "Measure the shell. Then put an X on its length."
- hints and successes as §7; settings "Level" — "Read the tide-line" / "Measure and plot" / "Halves"; "Footprints" — "On" / "Off".
- aria: column "{n} cm: {k} shells{, under water}"; shore "Sea from the left, up to {n} cm"; buoy "Sea level: {k} rows"; shell "A shell on the ruler, starting at {o} cm".
- **Locale traps**:
  - **shell nouns** (kept from the old activity's native review): fr coquillage (m), es concha (f), pt concha (f), it conchiglia (f, never guscio), de Muschel (f), nl schelp (de), sv snäcka (n; the sv old strings used "Snäckis"), da musling — the library label for `beach/seashell` is da "Musling" (= mussel); the da author decides between "musling" and "muslingeskal" for the sentences and the reviewer confirms it fits the picture; no "skjell" (n, invariable plural), fi simpukka (simpukat; the case forms "simpukkaa", "simpukoita" are authored per sentence, no suffix rule).
  - **halves**: "½" and the decimal comma: en/es "4½ cm" (es "4 y medio cm" in speech), de "4½ cm" / "4,5 cm" — textbooks in de/nl/sv/da/no/fi/fr/it/pt write **4,5 cm**; the beach shows "4½" in every locale (a fraction mark, the G3-335 form) and the success sentence writes the locale decimal form after it ("4½ cm = 4,5 cm").
  - plural agreement with numbers: "1 shell is …" vs "5 shells are …" — every count sentence has a 1-form and a many-form per locale (fi partitive after numerals: "5 simpukkaa on").
  - "longer than" / "shorter than" comparatives authored whole (fr "plus longs que", it "più lunghe di", pt "mais compridas que", es "miden más de").

## 10. Sound off, access, phones
- Silent-legible: water, wobbles, number tags, footprints and dashed lines show everything.
- Keyboard path §5; aria-live announces each shore/buoy move ("sea over 1 to 4 cm") and drops.
- Taps: wave handles and buoy 44 × 44; pebbles ≥ 44 px hit; numbers on the sand ≥ 44 px hit; the shell is its own big target.
- Pictures: seashell ≥ 111 px at 704 (≥ 120 in halves), ≥ 90 px at 360, ≥ 72 px at 320.
- Check above the fold at 360 × 740 (684) and 320 × 640 (612).
- Phone: stacked board → tide-line → pebbles → bubble; the buoy post sits inside the beach's right edge.

## 11. Distinct from
- **New 304 Half-Mark Ruler** (3.MD.B.4): measures to the half (and quarter) mark and plots; its X "flies down" onto the plot. Here the hero is the **tide** — reading a plot by covering what the question excludes — and measuring is whole-cm with a halves bridge; the drop is a shell shrinking into an X by the child's own drag.
- **New 254 Catch-Up Cubbies** (ghosts fill the short row for "how many more"): here the sea level hides the common part instead; nothing is added.
- **Row 168 Level Rail** (bar graphs): a straightedge reading heights against a scale; line plots have no scale — the tide works on counts and lengths.
- **Cold Line** (premium tool, a draggable scale above and below zero) — a number line, no data.

## 12. Build plan
- **Core state** `{ level, round, data:[len], pinned:[len], board:{shellLen, offset, pos}, dropped:[{len,col}], tide:{left:gap|null, right:gap|null, sea:rows}, answer, misses }`. Functions: `dry(data, tide)` (set of X's not covered), `required(round)` (accepted tide states per kind, §6), `answerOf(round)`, `checkTide`, `checkAnswer`, `measureRead(shell)` (right edge − left edge in cm, never the edge position), `dropColumn(x)`, `nextTask`.
- **Gate's own ground truth** (`verify-tide-plot-core.js`): recomputes every answer from the data (no 0 answer; unique modes; range = max − min; more ≥ 1); the accepted tide states per kind (e.g. "longer than n" accepts left shore exactly at gap n|n+1 and any right shore beyond the last X; "at n" exactly the two gaps; mode any sea level in [second tallest, tallest − 1]; range exactly the two touching gaps); in measure rounds the offset list and that the unzeroed column differs from the true one in 11/16; shell ink-box width = length × pitch ± 1 px.
- **Mutations**: shore allowed to stop ON a column · "longer than" accepting the n column dry · mode answered by the count · range accepting max − min + 1 · footprints counted as numbers · measure accepting the right-edge position instead of the length · offset never non-zero · X allowed between numbers · water hiding X's completely (must stay visible) · shell drawn by image box instead of ink box.
- **Local test**: real drags of shores, buoy and shells in every round at 320 · 360 · 412 · 704 · 768 · 1024 · 1366; the shell's drawn width matches its length at each width (pixel-measured against the ruler).
- **Pictures to verify**: `beach/seashell` (seen). **Risks**: the da shell noun (picture vs "musling"); half-mark legibility at 320 (½ glyph ≥ 12 px). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — pushing a sea over a beach and watching shells go under and pop back is pure play; shrinking a real shell into an X is a small magic trick.
2. **Would a teacher put it on the board?** Yes — every question kind is answered by marking exactly the part of the plot it is about, which is the reading skill itself; "longer than 5" vs "5 and longer", mode vs count, and range vs counting numbers are each refuted by the water, not by a message.
3. **Would a parent trust it?** Yes — real measuring from 0, a library shell, calm water, no words on the apparatus, works silently on a phone.
4. **The invention in one sentence:** a tide you push over the line plot so only the shells the question asks about stay dry.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **An answer tell removed**: in the draft's R6 the most common length (4) had exactly 4 X's, so a child answering with the count — the very misconception the mode rounds exist for — was marked right. D4 is now [3,3,4,4,4,6,8]: mode 4 with 3 X's; R2's answer becomes 3; the sea level that answers R6 is exactly 2 rows.
- **The ruler fits every shell**: M8's 7 cm shell arrives at 2 cm, so its edge reaches 9 cm; the 704 board's ruler is now 0–9 at 37 px/cm (the draft's 0–8 at 42 px/cm let it hang off); shells 111–259 px (≥ 96 px floor).
- **Halves layout**: nine half-columns cannot fit the 300 px split column; halves rounds stack at 704 (64 px pitch) and use a 36 px pitch at 360.
- Every answer re-computed independently (`work-c31/plots.js`, 0 errors): counts, longer/shorter, ranges, more, halves; offsets 0/1/2 = 5/6/5, zeroing needed in 11 of 16; sea-level windows for both mode rounds.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
