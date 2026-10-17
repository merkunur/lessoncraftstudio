# Row 28 — Make 10 → THE TEN-SEAT WHEEL (K.OA.A.4)

## 0. Identity
- id `numberbond.make-ten.k-oa-a-4` (KEPT; slugs/metadata frozen in all 11 locales) · grade K · CCSS K.OA.A.4 (with K.OA.A.3 bonds within 10) · Operations & Algebraic Thinking · own files `ten-seat-wheel-core.js`, `ten-seat-wheel-activity.js`, `ten-seat-wheel-activity.html`, `ten-seat-wheel-activities.json` (this row leaves `number-bond-activities.json`; the sibling row `numberbond.make-ten-to-add.1-oa-c-6` stays on its engine untouched; the id is unchanged).
- Frozen title "Make 10 — Number Bonds to Ten (Kindergarten)"; frozen intro promises: the whole is 10 and one part is filled; tap the empty part to add counters until both parts make 10; find the number that makes 10. **Kept true:** the whole is the wheel (10 seats), one part is already filled (riders aboard), the empty part is where the child adds riders until both parts make 10 — the child taps the empty part (the gate's dial sits beside the empty seats) and finds the number that makes 10.
- Worksheets also covered: **K-243** Number Bonds to 10 · **G1-106** Make 10! · **G1-427** (make-10 partner) · **K-277** Make Ten with Counting Dots (empty seats are the dots still to fill) · **K-273** Number Bonds to 5 (5-seat wheel) · **K-274** Within 10 and **K-414/415/416/417** Bonds of 6/7/8/9 (6–9-seat wheels) · **K-276** Find the Whole (blank-hub rounds).
- Old activity: a part-part-whole bond with whole 10 and one part given (7, 4, 9, 2, 6, 5, 8, 3); the child tapped the empty part to add counter-dots and "−" to remove until both parts made 10. **Kept:** whole 10 with one given part; all eight given values; the bond diagram (whole on top, two parts below) as the record; add-and-remove; "find the number that makes 10". **Changed:** the bond becomes a Ferris wheel whose hub is the whole and whose seats are the parts; the child commits to a NUMBER on the boarding gate and the wheel's balance shows whether it was right; new levels cover bonds to 5, within 10 and find-the-whole.

## 1. The pitch
"The wheel has exactly ten seats and will only turn smoothly when every seat is full — call the right number of riders and it spins; call too few and it lurches with the empty seats swinging at the top; call too many and the extra riders are left standing on the platform."

## 2. Why a child will want it again (the fun)
- **It is a fairground ride.** A big wheel with ten round gondolas, a hub painted with the whole, a boarding platform with a queue of animals, a little gate with a number dial and a lever. The ride is the reward.
- **The boarding.** Set the dial and pull the gate lever: riders hop in one at a time — the wheel clicks round one seat per rider, each hop a cheerful "boing" a step higher. Kids count along without being asked.
- **The lurch.** Release the brake with seats still empty and the wheel does what a real unbalanced wheel does: the heavy side swings down, the wheel rocks back and forth three times and settles with the empty gondolas dangling at the very top. It looks wonderfully wrong — and it shows exactly where the gap is.
- **The full spin.** A full wheel turns a whole slow circle with a little music-box tune and its rim bulbs lighting in a chase; the riders' gondolas swing gently. Then a ticket prints with the bond on it.
- **Free play ("Fairground"):** choose any wheel 2–10 seats, board any riders, watch it balance or lurch; tap a gondola to let a rider off.

## 3. The skill and the misconception
- **Skill (K.OA.A.4):** for any number 1–9, find the number that makes 10 when added to it, using objects or drawings, and record it (`10 = 7 + 3`). The covered worksheets extend it to bonds of 5–9 and finding the whole.
- **Misconception 1 — guessing a number close to the given one, or "the other part is always 5".** **Push back:** the dial's number of riders board and the wheel's balance answers: a short call leaves empty seats that physically swing to the top; an over-call leaves riders who cannot get on.
- **Misconception 2 — "the parts don't have to fill the whole" (adding without regard to 10).** **Push back:** the wheel is the whole; the hub shows 10 and only ten seats exist. Riders that do not fit stay outside the whole, visibly.
- **Misconception 3 — counting all ten from 1 every time.** **Push back:** the seats are grouped in two colours of five (five coral-rimmed, five teal-rimmed gondolas), so 7 aboard reads as "five and two more" and 3 empty is seen; the "Seat numbers" setting numbers the seats 1–10 round the wheel so a child can count on from 7.
- **Misconception 4 — that order changes the bond.** In find-the-whole rounds the two groups board in either order and the hub's number is the same.

## 4. The stage
Layout `split` at ≥ 700 px: the wheel left (484 px), the bond board + bubble right (172 px); stacked below.

**At 704 px:**
- **Task line** 22 px: the prompt (§9).
- **The wheel** (484 × 470 px, the hero): a drawn A-frame stand (teal #146B5E, 4 px ink), a rim circle (radius 190 px, cream with 2 px ink, small rim bulbs every 18°), ten spokes, and a **hub** (a 96 px circle, the whole N in 48 px digits). Ten **gondolas** hang from the rim (104 × 96 px cups, 3 px ink; seats 1–5 coral-rimmed #F2784B, seats 6–10 teal-rimmed #2E9C88 — so the wheel reads as two fives). A seated **rider** is a library animal at 96 px inside its gondola. Smaller wheels (5–9 seats) use the same radius with fewer, evenly spaced gondolas (still two colour groups: the first five coral, the rest teal).
- **The platform** (under the wheel's lowest point, 330 × 110 px): drawn boards with a **turnstile**; behind it the front of a **queue** of riders of the second kind — the first three at full size (96 px, overlapping by a third) and the queue running off the stage's edge behind a drawn rope barrier, so it never runs out and its length gives nothing away (no rider is ever shrunk below 96 px).
- **The gate** (left end of the platform): a **dial** — a window showing one numeral (56 px digits) with an up and a down arrow (48 px each) — and a **gate lever** (64 px coral knob). In find-the-whole rounds the dial moves to the hub.
- **The brake** (a 56 px teal lever on the stand's foot): releases the wheel.
- **The bond board** (right column, 172 × 230 px): the classic number-bond picture drawn as apparatus — a whole circle (64 px) on top joined by two lines to two part circles (52 px). It fills as the round goes: whole = hub; left part = the riders aboard at the start; right part = the dial value (or "?" until boarded). After success it prints as a ticket strip below (tickets stack: one per round, `10 = 7 + 3`).
- **Bubble** (≤ 3 lines) under the bond board; speaker 36 px.

**At 360 px:** stacked: task line → wheel 336 × 330 (radius 120 px, gondolas 70 × 68 px, riders 64 px, hub 64 px with 34 px digits) → platform row (the front two queue riders at 64 px behind the turnstile; dial window 56 px, digits 40 px, arrows 48 px, gate lever 56 px, brake 56 px) → bond board as a compact horizontal strip (whole 44 px, parts 40 px) → bubble → Check (= release the brake). Check bottom ≈ 690 px at 360 × 740. At 320 × 640: radius 106, gondolas 62 px, riders 56 px (≥ 44 px tap; the recorded under-360 picture exception), bond strip folds into the bubble line ("10 = 7 + ?"); Check ≈ 610 px.

**Riders (library, one kind aboard + one kind in the queue, contrasting; all seen on the farm-animals contact sheet):** farm animals/chick + farm animals/pig · farm animals/lamb + farm animals/duck · farm animals/rabbit + farm animals/goat · farm animals/cow + farm animals/hen · farm animals/dog + farm animals/sheep · farm animals/horse + farm animals/turkey. Never chick with duck/duckling (both small and yellow) or sheep with lamb (near-twins) in one round; hen only (farm-animals/chicken is the same drawing).

**Words on the apparatus:** numerals only (hub, dial, bond board, tickets; optional seat numbers).

## 5. The hand
- **Dial arrows:** tap ▲/▼ (48 px): the numeral rolls (120 ms, odometer tick). Range 1–9. Holding repeats every 260 ms. The bond board's right part stays "?" until riders board (the dial is the child's commitment; the board records only what happened).
- **Gate lever:** pull (drag down 40 px or tap): the gate swings open and riders board one at a time — each hops from the queue's front into the next empty gondola at the wheel's bottom, the wheel then clicks one seat round (each boarding 380 ms; "boing" rising a step). Boarding stops after the dial's number of riders or when no empty seat is left at the bottom; any riders the dial called beyond the free seats step forward onto the platform's edge and stand there (outlined coral), bumping the full gondola with a soft "thump".
- **Let a rider off (undo):** tap any rider of the queue's kind in a gondola → it hops back to the queue (300 ms); the wheel clicks back. Riders who were aboard at the start cannot leave (their gondola gives a tiny swing). The dial resets to the number of riders now boarded from the queue.
- **Brake (= Check):** judged (§7). Release with all seats full: the wheel spins one slow full turn (2.4 s), rim bulbs chase, a music-box phrase plays, then stops with seat 1 at the bottom.
- **Find-the-whole rounds:** both groups are already boarded (seated in two arcs, two kinds); the hub is blank and carries the dial. Set the hub dial; the brake checks it against the seats (§7).
- **Free play ("Fairground"):** seat count chooser 2–10, two queues; any boarding; brake always allowed; the bond board writes itself.

## 6. The rounds
**Round kinds:**
- **FILL THE WHEEL:** whole N, k riders aboard (contiguous seats starting at seat 1), find the riders that fill it. One right answer: N − k.
- **WHOLE:** a riders + b riders aboard, every seat full, the hub blank; set the hub. One right answer: a + b.

**Level "Make 10" (default; K-243, G1-106, G1-427, K-277) — 9 rounds, wheel of 10:**
| # | aboard | answer |
|---|---|---|
| 1 | 7 | 3 |
| 2 | 4 | 6 |
| 3 | 9 | 1 |
| 4 | 2 | 8 |
| 5 | 6 | 4 |
| 6 | 5 | 5 |
| 7 | 8 | 2 |
| 8 | 3 | 7 |
| 9 | 1 | 9 |
(The old eight given values, plus 1 so that every bond of ten appears once per pass.)

**Level "Up to 5" (K-273) — 8 rounds:**
| # | kind | wheel | aboard | answer |
|---|---|---|---|---|
| 1 | FILL | 5 | 3 | 2 |
| 2 | FILL | 4 | 1 | 3 |
| 3 | WHOLE | — | 2 + 2 | 4 |
| 4 | FILL | 5 | 1 | 4 |
| 5 | FILL | 3 | 2 | 1 |
| 6 | WHOLE | — | 3 + 2 | 5 |
| 7 | FILL | 5 | 2 | 3 |
| 8 | FILL | 4 | 2 | 2 |

**Level "6 to 9" (K-274, K-414–417, K-276) — 9 rounds:**
| # | kind | wheel | aboard | answer |
|---|---|---|---|---|
| 1 | FILL | 6 | 4 | 2 |
| 2 | FILL | 7 | 3 | 4 |
| 3 | WHOLE | — | 5 + 3 | 8 |
| 4 | FILL | 8 | 5 | 3 |
| 5 | FILL | 9 | 2 | 7 |
| 6 | WHOLE | — | 4 + 2 | 6 |
| 7 | FILL | 9 | 4 | 5 |
| 8 | FILL | 7 | 6 | 1 |
| 9 | WHOLE | — | 6 + 3 | 9 |

No 0 anywhere: every round has ≥ 1 rider aboard and ≥ 1 seat empty; the dial runs 1–9.

**Answer position:** the dial starts every round at **5** (its middle), so the answer is reached by moving up or down and "leave the dial alone" is right only in the one round whose answer is 5 (Make 10 row 6, Up to 5 none, 6 to 9 row 7) — the gate asserts the dial-start value is the answer in ≤ 1 round per level. Make 10 uses each answer 1–9 exactly once per pass; in the smaller levels no answer appears more than twice (Up to 5: 2, 3, 4, 1, 3, 2; 6 to 9: 2, 4, 3, 7, 5, 1). The aboard arc always starts at seat 1 but the wheel's resting rotation is random per round, so the empty arc is never always on the same side of the screen (gate: empty-arc centre angle uniform ± 5 % over 10 000 seeds).

**Order:** order-only reshuffle per pass; never the same order twice; a pass opens with a FILL round; WHOLE rounds never adjacent.

## 7. Check, the misses, the success
- **Brake released with no riders boarded (FILL):** no miss; the gate lever bobs and the dial's arrows pulse; **"Set the dial, then pull the gate lever."**
- **Brake with the hub dial untouched (WHOLE):** no miss; the hub pulses; **"Set the number on the hub."**
- **Miss 1 — too few:** the brake releases and the wheel lurches: heavy side down, three rocking swings (1.6 s), settling with the empty gondolas at the top; the empty gondolas glow with dashed outlines. **"There are still empty seats."**
- **Miss 1 — too many:** the extra riders stand on the platform edge with a coral halo and the dial's number flashes; the brake will NOT release (the operator never starts a ride with riders on the edge — it clunks and stays on). **"Too many riders! Some can't get on."** After 1.5 s EVERY rider who boarded from the queue this try hops back off (the wheel returns to the round's start: only the starting riders aboard) and the dial keeps the child's number, so the child must turn it down and board again. An over-call can never end in a full, spinning wheel — otherwise over-dialling would be a free way to win.
- **Miss 1 — WHOLE wrong:** the hub flashes coral and the gondolas light one by one in seat order (160 ms each). **"Count all the riders."**
- **Miss 2:** the empty (or over-called) seats number themselves counting on from the aboard group — after 7 aboard the empty gondolas read 8, 9, 10 — and the dial's arrows glow in the direction to move (▲ if too few, ▼ if too many), never the numeral itself. **"Count on: 8, 9, 10."** (built from the round's numbers) In WHOLE the lit gondolas keep their numerals and the hub's arrow glows.
- **A new move** (dial turned, a rider let off) **takes the help away** until the next Check.
- **Success:** the full spin (§5); the bond board's "?" fills, the ticket prints. FILL: **"7 and 3 make 10 — every seat is full!"** WHOLE: **"5 and 3 make 8!"** Pass end (Make 10): the tickets line up as the full list of bonds of ten and the wheel does two spins: **"Every way to make 10 has had a ride!"**

## 8. Settings
1. **Wheel:** Up to 5 / 6 to 9 / Make 10 (default Make 10) — the number of gondolas on the wheel at rest changes.
2. **Seat numbers:** Off / On (default Off) — On prints 1–N on the gondolas round the wheel (16 px, on the rim beside each seat), so a child can count on from the last full seat; Off keeps the five-and-five colours only.

## 9. Words (EN source)
- on-screen title: **Make 10**
- instruction: **Set the dial to the number of riders that will fill the wheel. Pull the gate lever, then release the brake.**
- prompts: FILL (whole 10) **{k} riders are on. How many more make 10?** · FILL (other wholes) **{k} riders are on. How many more fill {n} seats?** · WHOLE **Every seat is full. How many riders in all?**
- hints: **Set the dial, then pull the gate lever.** · **Set the number on the hub.** · **There are still empty seats.** · **Too many riders! Some can't get on.** · **Count all the riders.** · **Count on: {seq}.** (seq = the round's count-on numbers, e.g. "8, 9, 10")
- success: **{k} and {m} make {n} — every seat is full!** · **{a} and {b} make {n}!** · **Every way to make 10 has had a ride!**
- free play: **Fairground** · settings: **Wheel** — **Up to 5** / **6 to 9** / **Make 10** · **Seat numbers** — **Off** / **On**

**Locale traps:**
- **"Riders"** are animals: use a neutral passenger word — de "Fahrgäste", fr "passagers", es-MX "pasajeros", pt "passageiros", it "passeggeri", nl "passagiers", sv "passagerare", da "passagerer", no "passasjerer", fi "matkustajaa" (partitive after numerals: "7 matkustajaa"). Agreement with {k}: author singular/plural templates (k = 1 occurs).
- **Ferris wheel:** de "Riesenrad", fr "grande roue", es-MX "rueda de la fortuna", pt "roda-gigante", it "ruota panoramica", nl "reuzenrad", sv "pariserhjul", da "pariserhjul", no "pariserhjul", fi "maailmanpyörä" — only in the intro prose, never on the stage.
- **"Make 10" classroom terms:** sv "tiokompisar", fi "kymppikaverit", de "Zehnerfreunde", nl "maatjes van 10" / "verliefde harten" (Dutch classroom term for bonds of ten; the reviewer chooses), da "tiervenner", no "tiervenner" — the pass-end line may use them.
- **Count-on sequence** "{seq}" is digits joined by the locale's list separator ("8, 9, 10"; fr/de same) — never number words, so no gender issues.
- Equation in tickets: `10 = 7 + 3` (bond worksheets print whole first) in every locale.

## 10. Sound off, access, phones
- Legible silent: boarding, the lurch with empty seats at the top, the standing extras and the spin say everything; the bond board and tickets show the numbers.
- Keyboard: Up/Down = dial; G = gate lever; B or Enter = brake (Check); Tab to a boarded rider + Enter = let off; in WHOLE, Up/Down on the hub dial.
- aria: dial "riders to board: {d}"; wheel "{n} seats, {k} riders on" (FILL) — after a Check the live region reads "{f} seats full, {e} empty" or "{x} riders could not get on"; bond board "whole {n}, parts {k} and {m}".
- Taps: dial arrows 48 px; levers 64/56 px; gondolas ≥ 62 px.
- Reduced motion: no rocking — the wheel tilts once to the settled angle; the spin is replaced by the rim lighting in sequence.

## 11. Distinct from
- **Row 26 Snake-Groove Lunchbox:** chosen strands packed into a groove (any number of parts, constraints). **Row 27 Lantern String:** two numerals lit from both ends. **Row 25 Spring Switch** sealed-car make-ten: crates routed by a switch, the stopping point is the decision. Here the child **commits to one number before anything moves**, and the wheel's **balance** (a physical law: an unevenly loaded wheel swings its heavy side down) shows the error.
- **Row 31 Ghost Rafts / Row 30 Overflow Trays:** composing ten-and-some (teens); here the whole is 10 and the missing part is the task.
- **Built #9 Counting Necklace:** a ring for counting; here the ring is a part-part-whole and nothing is counted to answer.

## 12. Build plan
- **Core state:** `{ level, seatNums, order[], idx, kind, n, aboard:k, boarded:int, dial:int(1..9, start 5), extras:int, hubDial:null|int, rot:deg, misses, help }`.
- **Functions:** `setDial(v)`, `board()` → boarded = min(dial, n − k), extras = max(0, dial − (n − k)); `letOff()`; `release()` → `{state:'full'|'short'|'over'|'wholeWrong'|'wholeRight', empties, extras}`; `settleAngle(seats)` (the lurch: rest angle = the angle that puts the centre of mass of the filled gondolas directly below the hub); `setHub(v)`; `nextTask(index)`.
- **Gate `verify-ten-seat-wheel-core.js` (own oracle):** (1) exhaustive over n 3–10, k 1..n−1, dial 1–9: full iff k + dial = n; extras = k + dial − n when positive; empties = n − k − dial when positive; (2) the settle angle puts the empty arc's centre at the top (within 1°) for every short state — computed by the gate from its own centre-of-mass formula; (3) riders aboard at the start cannot be let off; an over-call never spins, and after it the wheel holds exactly the starting riders again; (4) WHOLE right iff hub = a + b; (5) Make 10 answers are 1–9 each exactly once; no 0 in any table; (6) dial start = 5 equals the answer in ≤ 1 round per level; (7) empty-arc screen angle uniform ± 5 % over 10 000 seeds; (8) the visible queue is always the same three (two on phones) and never runs out.
- **Mutations:** over-call leaves the wheel full / lets it spin; full accepted at k + dial = n ± 1; extras computed as 0; settle angle fixed (no lurch); a starting rider can be let off; WHOLE accepts a + b ± 1; a Make 10 table with a repeated answer; dial starts at the answer; visible queue length = answer; help persists after a move; seat colours not split into fives.
- **Pictures to verify on a contact sheet:** farm animals/chick, pig, lamb, duck, rabbit, goat, cow, hen, dog, sheep, horse, turkey (farm-animals sheet seen; all clean single animals). **Risks:** ten 96 px riders on a 190 px radius wheel at 704 (spacing 119 px — fits); the lurch must read as balance, not as "broken" — tested with the reviewer. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — it is a fairground ride: animals hop aboard, a lopsided wheel lurches comically, a full wheel spins with lights and music.
2. **Would a teacher put it on the board?** Yes — "7 are on. How many more fill the wheel?" The class calls a number, the wheel answers; the empty seats at the top and the riders left standing are the whole lesson in one picture, and the tickets become the list of bonds of ten.
3. **Would a parent trust it?** Calm, library animals, no score; the child commits to a number and the ride itself shows whether it worked.
4. **The invention:** a Ferris wheel with exactly ten seats that only balances when every seat is full, so the right partner of a number is the one that makes the wheel turn smoothly.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- A winning loophole closed: an over-called dial filled the wheel, let it spin, and left it full — so the next brake succeeded without the right number. Now an over-call never spins (the brake clunks and holds), every rider boarded this try hops back off, and the child must re-dial; gate assertion + mutation added.
- Queue riders were 72 px (704) / 44 px (360), under the picture floor: the platform now shows the front three riders at 96 px (two at 64 on phones) at a turnstile, the queue running off-stage so its length still tells nothing.
- farm-animals/chicken ≡ hen (one drawing) noted. All tables re-checked: Make 10 uses each answer 1–9 once, dial-start 5 equals the answer once per level at most, no 0.
