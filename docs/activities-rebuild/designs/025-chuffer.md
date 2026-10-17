# Row 25 — Chuffer's Switchyard → THE SPRING SWITCH (K.OA.A.3)

## 0. Identity
- id `chuffer.rail-decompose.k-oa-a-3` (KEPT; slugs/metadata frozen) · grade K · CCSS K.OA.A.3 · Operations & Algebraic Thinking · own files `spring-switch-core.js`, `spring-switch-activity.js`, `spring-switch-activity.html`, `spring-switch-activities.json` (the row leaves `chuffer-activities.json`; the id is unchanged). Slugs en/de/fr/es/pt/it/nl exist; sv/da/no/fi slug, title and intro are new at build.
- page title (frozen): "Chuffer's Switchyard — Break a Number Apart Many Ways (Kindergarten)"; intro (frozen) promises: you are the switchman; a load of crates rolls in; the track forks into two cars; split the crates, read each car, say the split (5 = 2 + 3!), pull the coupler, find EVERY different way. **All kept true.**
- worksheets also covered: **K-273** Number Bonds to 5 · **K-274** Number Bonds Within 10 · **K-414 / K-415 / K-416 / K-417** Number Bonds of 6 / 7 / 8 / 9 · **K-243** Number Bonds to 10 · **K-277** Make Ten with Counting Dots (the Make-ten level; the cars are ten-frames, so the dots are there) · **K-276** Find the Whole (the "back up" rounds merge two cars into one wagon).
- old activity: nine rounds of seven act-types (decompose-record, predict-covariation, hunt-rung, make-ten with a sealed car, equation-build, predict-mirror, judge-route) with an SVG-stub locomotive; the child moved crates between cars and stated the split; a route book filled as a staircase. **Kept:** crates in ten-frame arrays, the stated split (the equation never auto-prints), the coupler that banks only a true and new split, the staircase route book, the sealed-car make-ten, the mirror. **Changed:** the crates are now routed by a SWITCH as they roll (the new invention); the locomotive is the library toy train; contexts (passengers, mail, coal, animals) are dropped — drawn crates only.

## 1. The pitch
"You don't move crates — you throw the switch: every crate that rolls down the hill goes whichever way the points are set, so changing your mind halfway changes the split."

## 2. Why a child will want it again (the fun)
- **The hump and the release.** The load waits in a wagon on top of a little hill. Hold the release lever: crates roll out one at a time (one every 450 ms), trundle down the slope with a clatter that rises in pitch, and cross the fork. Let go: they stop. It is a marble run you control.
- **The switch.** A chunky lever beside the fork. Flick it and the points slide across with a heavy, satisfying "clack-CHUNK" (the rail blades visibly move). Children flick it back and forth just to hear it — and every flick decides where the next crate goes.
- **Reading the cars.** The two cars fill as ten-frames (2 rows of 5 slots), so 3 crates look like 3 and 7 look like "5 and 2" at a glance.
- **The coupler.** When the split is stated, pulling the coupler is a big pull-down handle: the two cars clank together, Chuffer (the library toy train) backs in and hitches with a puff of three grey circles, and the pair rolls off to the route book — the way is banked.
- **The staircase.** The route book fills one row per way: 1 + 4, 2 + 3, 3 + 2, 4 + 1 as two-colour bars, each row one crate longer on the left. When every way is found the staircase is complete, Chuffer whistles (two notes) and pulls the whole staircase of wagons off screen. A finished staircase is a satisfying picture of "all the ways".
- **The turntable.** After a way is banked, a small turntable lets the child spin the pair of cars round: 2 + 3 becomes 3 + 2 — a new way for free, if they notice.
- **Free play ("Shunting yard"):** any load 2–10, no question, the equation writes itself; just play trains.

## 3. The skill and the misconception
- **Skill (K.OA.A.3):** decompose numbers ≤ 10 into pairs in more than one way, using objects, and record each by a drawing or equation (5 = 2 + 3). Worksheets add: find the missing part, find the whole, make ten.
- **Misconception 1: there is only one way to split a number** (or only the "half" way). **Push back:** the route book shows empty rows for every way not yet found; the staircase is visibly incomplete until all are there.
- **Misconception 2: the parts change the whole.** **Push back:** the hill wagon starts with exactly N crates and nothing else can enter; whatever the switch does, the two cars together always hold the whole load — after each way, the "back up" (§5) rolls every crate home into the same wagon.
- **Misconception 3: counting a car wrong / stating a split that is not in the cars.** **Push back:** the coupler pulls only if the stated numbers match the cars; when they don't, the car whose number is wrong lights its crates one by one (counting them) and the plate box flashes.
- **Misconception 4: 2 + 3 and 3 + 2 are the same way / are unrelated.** **Push back:** the turntable shows they are the same cars turned round — and the route book gives them two different rows (both are true splits, in mirror places of the staircase).

## 4. The stage
Layout `split` at ≥ 700 px (yard left, route book + plate + bubble right); stacked below.

**At 704 px:**
- **Task line** 22 px.
- **The yard** (drawn geometry, 452 × 430 px): at the top a short hill (a grey slope 300 × 80 px) with the **hill wagon** (a cream wagon 180 × 64 holding the load as crates in a 2 × 5 array) at its peak; the **release lever** 64 px knob beside the wagon. The track runs down the slope to the **fork** (centre, y ≈ 210): two rail blades that slide visibly between the left and right branch; the **switch lever** (a coral knob 64 px on a stand) beside it, tilted left or right to match. Two branches lead to two **cars** at the bottom: car L (left, coral trim #F2784B) and car R (right, teal trim #2E9C88), each a flatbed 190 × 96 with 2 × 5 crate slots of 34 px. Between the two cars, the **coupler**: a pull-down handle 56 × 72 px.
- **Crates:** wooden squares 30 px (warm brown #C98A4B with a darker X brace), drawn geometry.
- **Chuffer:** library picture **toys/train** (seen: a red-and-yellow toy steam engine), 96 px, waiting on a siding at the bottom-left; backs in to couple.
- **Right column (196 px):** the **number plate**, drawn as the **number bond** the worksheets use (K-243, K-273/274, K-276, K-414–417): a whole circle (64 px) on top joined by two lines to two part circles (56 px) below — the left part circle trimmed coral like car L, the right teal like car R; the part circles are the dials (and in BACK UP rounds the whole circle is the dial). Under the bond the equation line "N = a + b" (numerals 30 px) writes itself only AFTER a way is banked — the child sets the bond; the equation is its reading. (N is printed on the hill wagon too.) → the **route book**: one row per way (N − 1 rows, top row 1 + (N−1)), each row a slot 180 × 18 px that fills with a coral bar (length ∝ left count) + teal bar (right count); empty rows are dashed → bubble (≤ 3 lines) → speaker.
- **Turntable** (after a banking): a 56 px round button with a curved double arrow under the coupler.

**At 360 px:** stacked: task line → yard 336 × 380 (hill wagon 150 × 54, crates 26 px, cars 158 × 80 with slots 28 px, levers 56 px) → number plate (numerals 30 px, boxes 56 × 52) → bubble → Check (= the coupler pull is also available as Check) → route book as a compact strip of N − 1 mini rows (each 150 × 12). Check bottom ≈ 690 px at 360×740; at 320×640 the route book collapses to a row of N − 1 dots (filled = found) beside the plate, Check ≈ 610 px.

**Words on the apparatus:** numerals only (load size on the wagon, the plate).

## 5. The hand
- **Hold the release lever:** within 50 ms it tips; one crate leaves the wagon every 450 ms, rolls down (600 ms, clatter rising in pitch), crosses the fork and settles in the next free slot of whichever car the points face (thunk). Release = the crate in motion finishes; no more follow. **Tap** the lever = exactly one crate.
- **Flick the switch lever** (tap or drag sideways): the points slide (160 ms) with "clack-CHUNK"; a crate already past the fork is unaffected. The child can switch between any two crates.
- **Back up:** a curved-arrow chip on the hill wagon ("back up", icon only): every crate in both cars rolls back up into the wagon in one stream (800 ms) — undo for the whole split, and the proof the whole is unchanged.
- **Number plate dials:** tap a box → a row of numerals 1 … N−1 slides out under it (48 px keys); tap one → it sets. (In find-the-whole rounds the N box is the dial, 1 … 10.)
- **Pull the coupler** (drag the handle down 40 px, or press Check): judged (§7). On success: cars clank together (200 ms), Chuffer backs in (500 ms), puff, the pair rolls right and shrinks into its route-book row (700 ms); the cars come back empty and the crates are already back in the hill wagon (a "new load" whoosh).
- **Turntable:** tap → the yard's last banked pair returns, spins 180° (600 ms), and its mirror is offered on the plate; pulling the coupler banks the mirror if new.
- **Free play:** "Shunting yard" — load chooser (2–10), everything open, plate fills itself live.

## 6. The rounds
Round kinds:
- **ALL WAYS** — load N; find every split (N − 1 ways, both cars ≥ 1). The round ends when the route book is full.
- **SEALED CAR** (missing part) — one car arrives already loaded and covered with a tarp painted with its number k (the crates are hidden, the numeral shows); the hill wagon holds a full load of 10 crates — more than needed, so the wagon's size gives nothing away — the plate shows "N = k + ☐", and the child sends exactly the missing part into the open car (the switch is locked to the open side; the task is the stopping point). Excess crates stay on the hill.
- **BACK UP** (find the whole) — two loaded cars stand at the bottom (a crates and b crates); the hill wagon is empty and the plate shows "☐ = a + b"; the child presses back up, the crates roll up together into the wagon (merging), and the child sets the whole on the dial.

**Level "Up to 5" (K-273) — 9 rounds:** ALL WAYS 3 · ALL WAYS 4 · SEALED 5 = 2 + ☐ (sealed left) · BACK UP 2 + 3 · ALL WAYS 5 · SEALED 4 = ☐ + 3 (sealed right) · BACK UP 1 + 3 · SEALED 5 = 1 + ☐ (sealed left) · BACK UP 2 + 1. (Missing parts 3, 1, 4 — all different; sealed sides L, R, L; BACK UP wholes 5, 4, 3.)

**Level "6 to 9" (K-414–K-417, K-274) — 9 rounds:** ALL WAYS 6 · SEALED 7 = 3 + ☐ · BACK UP 4 + 3 · SEALED 8 = ☐ + 5 · ALL WAYS 7 · BACK UP 5 + 4 · SEALED 9 = 7 + ☐ · BACK UP 6 + 2 · ALL WAYS 8 *(find any four ways — the route book shows 7 rows and lights when 4 are filled; the remaining rows stay as an invitation, and the round may continue)*.

**Level "Make ten" (K-243, K-277) — 9 rounds, all SEALED with whole 10:** 10 = 3 + ☐ · 10 = ☐ + 6 · 10 = 5 + ☐ · 10 = ☐ + 8 · 10 = 1 + ☐ · 10 = ☐ + 2 · 10 = 7 + ☐ · 10 = ☐ + 4 · 10 = 9 + ☐. **The level's route book is the bonds of 10:** each solved round banks its pair into ONE staircase of 10 (9 rows) that lasts the whole pass — by round 9 every bond of ten is on the staircase (the sealed numbers 1–9 each occur once). At the pass end Chuffer pulls the full staircase away.

(No 0 anywhere: both cars always hold ≥ 1 — the coupler refuses an empty car, and no table asks for N + 0.)

**Answer position:** missing parts in Make ten are 7, 4, 5, 2, 9, 8, 3, 6, 1 — all different; the sealed car is left in 5 rounds and right in 4 (so "the open car is always on the right" fails); in Up to 5 and 6 to 9 the sealed side alternates L, R, L (missing parts 3, 1, 4 / 4, 3, 2 — all different within each level); BACK UP wholes vary (5, 4, 3 / 7, 9, 8). The gate asserts: missing-part answers all different within every level; sealed sides split as evenly as the count allows (|left − right| ≤ 1 per level — a 40–60 % rule cannot be met by three rounds); no two adjacent rounds of the same kind after the shuffle (≤ 2).

**Order:** order-only reshuffle per pass; never the same order twice; the first round of every pass is an ALL WAYS round (the switch is the hook) except in Make ten.

## 7. Check, the misses, the success
- **Check / coupler with empty cars:** no miss. The release lever bobs; bubble: **"Hold the lever to let the crates roll. Flick the switch to choose a car."**
- **Coupler with one car empty:** no miss; the empty car shakes; **"Both cars need crates."**
- **Coupler with the plate unset:** no miss; the plate boxes pulse; **"Read each car and set the numbers."**
- **Miss 1 (plate ≠ cars):** the car whose box is wrong lights its crates one by one (180 ms each — a visible count), and its box flashes coral. Bubble: **"Count the {left|right} car again."**
- **Miss 2:** the lit crates keep small numerals (1, 2, 3 …) and the matching numeral key in the dial row glows. Bubble: **"The {left} car has this many."**
- **Repeat way (true but already banked):** not a miss; its route-book row flashes; Chuffer gives a short "toot"; bubble **"You found that way already. Try a different split."**; back up happens automatically.
- **SEALED, wrong amount sent:** miss 1: the tarp lifts for 1.5 s showing the hidden crates, the two cars line up in one ten-frame row-under-row so the whole N = 10's empty or extra slots are visible (dotted slot = still missing, coral halo = one too many); bubble **"Together the cars must make {N}."** Miss 2: the missing slots number themselves on from the sealed number (e.g. 4, 5 … 10) so the child counts on; the answer is never spoken. Bubble: **"Count on from {k} to {N}."**
- **BACK UP, wrong whole:** miss 1: the merged wagon's crates light one by one; **"Count all the crates in the wagon."** Miss 2: numerals stay on the crates.
- **A new move takes the help away** until the next Check.
- **Success (each way):** the coupler banks the way; bubble: **"5 = 2 + 3!"** (the plate itself, read). ALL WAYS complete: the staircase glows, Chuffer whistles and pulls it off; **"You found every way to make 5!"** SEALED: **"3 and 7 make 10!"** BACK UP: **"4 and 3 make 7!"** Make-ten pass end: **"Every way to make 10 is on the staircase!"**

## 8. Settings
1. **Numbers:** Up to 5 / 6 to 9 / Make ten (default Up to 5) — the hill wagon's load and the route book's row count at rest change.
2. **Turntable:** Show / Hide (default Show) — Hide removes the mirror shortcut so every way must be routed by hand (teachers who want the mirror discovered rather than given).

## 9. Words (EN source)
- on-screen title: **Chuffer's Switchyard**
- instruction: **Hold the lever to let the crates roll. Flick the switch to send them left or right. Set the numbers, then pull the coupler.**
- prompts: ALL WAYS **Find every way to split {n} crates.** (6–9 level, ALL WAYS 8: **Find four ways to split 8 crates.**) · SEALED **One car holds {k}. Send the crates to make {n}.** · BACK UP **Back up the cars. How many crates in all?**
- hints: **Hold the lever to let the crates roll. Flick the switch to choose a car.** · **Both cars need crates.** · **Read each car and set the numbers.** · **Count the left car again.** / **Count the right car again.** · **The left car has this many.** / **The right car has this many.** · **You found that way already. Try a different split.** · **Together the cars must make {n}.** · **Count on from {k} to {n}.** · **Count all the crates in the wagon.**
- success: **{n} = {a} + {b}!** · **You found every way to make {n}!** · **{a} and {b} make {n}!** · **Every way to make 10 is on the staircase!**
- free play: **Shunting yard**
- settings: **Numbers** — **Up to 5** / **6 to 9** / **Make ten** · **Turntable** — **Show** / **Hide**

**Locale traps:**
- **The equation form "5 = 2 + 3"** (whole first) is standard in all 11 curricula's number-bond work; some (fr, es) more often write "2 + 3 = 5" — the plate keeps the frozen intro's whole-first form, which also matches the worksheets' bond diagrams.
- **Spoken split:** "5 is 2 and 3" (de "5 ist 2 und 3", fr "5, c'est 2 et 3", fi "5 on 2 ja 3", da "5 er 2 og 3"); pt/it use masculine-abstract cardinals ("cinco é dois e três", "cinque è due e tre" — the old activity's note, kept).
- **"Chuffer"** stays the name in en/de/fr/es/pt/it; nl keeps "Tuf" (the frozen nl name in the old strings); sv/da/no/fi choose a name with the reviewer.
- **"Coupler / switch / points"** — railway words differ (de "Weiche", "Kupplung"; fr "aiguillage", "attelage"; sv "växel", "koppel"; fi "vaihde", "kytkin"); the apparatus has no words, the instruction uses the child-friendly verb ("flick the switch" → de "stell die Weiche", fi "käännä vaihde").
- Numbers stay numerals; no plural nouns are needed except "crates" in prompts (stored per locale with agreement: fi "{n} laatikkoa" partitive).

## 10. Sound off, access, phones
- Legible silent: the points visibly move, crates visibly fill ten-frame cars, the plate and the staircase show everything.
- Keyboard: Space = release one crate (hold = stream); Left/Right arrow = set the switch; B = back up; Tab to the plate boxes → digits set them; Enter on the coupler = Check; T = turntable.
- aria: switch "Switch, points to the {left|right} car"; cars announced only after a coupler pull in task mode ("left car, 2 crates"); route book "ways found: 2 of 4"; live region reads each banked equation.
- Taps: levers 64/56 px; coupler 56 × 72; dial keys 48 px.
- Reduced motion: crates appear in slots without rolling; the coupling is a fade.

## 11. Distinct from
- **part-whole-frame (tool):** carry one counter across a number-bond board and watch the whole stay the same — moving objects between parts by hand. The Spring Switch never lets the child move a crate directly: the split is made by **routing a stream with a switch**, and the stopping point and switching moments are the child's decisions.
- **#23 Stamp Frame** (this batch) combines and takes away; **#24 Story Stage** solves stories; **#30/#31** compose teens. None decomposes one number into all its pairs.
- **arrow-strip / creek map (#21):** routes a boat along forks by number comparison — a different skill; here the fork is a switch on a stream of objects.

## 12. Build plan
- **Core state:** `{ level, turntable, order[], idx, kind, n, hill:int, carL:int, carR:int, sealed:null|{side, k}, switch:'L'|'R', plate:{n?, a, b}, found:Set('a+b'), tenBook:Set (Make-ten pass), misses, help }`.
- **Functions:** `release(k)` (each crate to `switch` side), `flick()`, `backUp()`, `setPlate(box, v)`, `couple()` → `{ok, reason:'empty'|'unset'|'wrongL'|'wrongR'|'repeat'|'sealedWrong', banked}`, `mirror()`, `nextTask(index)`.
- **Gate `verify-spring-switch-core.js` (own oracle):** (1) `carL + carR + hill = N` at every step (exhaustive over release/flick/backUp sequences for N ≤ 10); (2) a crate goes to the side the switch faced when it crossed; (3) `couple` banks iff plate = (carL, carR), both ≥ 1, and the pair is new; (4) ALL WAYS completes exactly at N − 1 distinct pairs; (5) SEALED: the switch is locked to the open side and success iff open car = N − k; (6) Make-ten's sealed values are 1–9 each once and its staircase completes at round 9; (7) BACK UP success iff dial = a + b; (8) sealed sides |left − right| ≤ 1 per level; no 3 same kinds adjacent over 10 000 seeds; (9) never 0 (no empty car banked, no 0 in any table).
- **Mutations:** a crate ignores the switch; back up loses a crate; bank a repeated way; bank with a plate that mismatches; allow an empty car; count the hidden sealed crates twice; Make ten repeats a sealed value; mirror banks without the coupler; auto-print the equation (plate filled by the app); unlock the switch in SEALED rounds.
- **Pictures to verify:** toys/train (seen). Everything else is apparatus. **Risks:** the "find any four" rule for 8 (its prompt must say four); nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a hill, rolling crates, a clunky switch and a train that hitches up: it is a train set with a purpose.
2. **Would a teacher put it on the board?** Yes — "How else could we split 5?" The class calls left or right for each crate; the staircase shows which ways are still missing.
3. **Would a parent trust it?** Calm, clean, library train, no score; the child states every equation themselves.
4. **The invention:** the child splits a number by flicking a railway switch while the crates roll, so every way to break the number apart is a different moment of throwing the switch — and the route book's staircase shows when all the ways are found.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **Worksheet coverage made visible:** six of the nine mapped worksheets are number-bond diagrams, but the plate was only an equation. The plate is now drawn as a **number bond** (whole circle over two part circles, trimmed in the cars' colours, the circles are the dials); the equation writes itself under it only after a way is banked.
- **Round tables corrected:** Up to 5 had sealed sides L, R, R and BACK UP wholes 5, 4, 4; now SEALED 5 = 2 + ☐ · 4 = ☐ + 3 · 5 = 1 + ☐ (sides L, R, L; parts 3, 1, 4) and BACK UP 2 + 1 (wholes 5, 4, 3). 6 to 9: SEALED 9 = 7 + ☐ (parts 4, 3, 2, no repeat).
- **Gate rule made satisfiable:** "40–60 % sealed left" cannot hold for three rounds; replaced by |left − right| ≤ 1 and all missing parts distinct per level.
- Kept as excellent: the switch that routes a rolling stream (the split is a moment of throwing the points), the conservation by back-up, the staircase route book, the sealed tarp for make-ten with a 10-crate wagon so the wagon size tells nothing.
