# New 207 — The Bus Queue: the door that counts from itself (ordinal numbers)

## 0. Identity
- id `bus-queue.play.ordinal-numbers` · grade K · READINESS ordinal-numbers (`alignment.framework` per `frontend/lib/frameworks.ts`; CCSS-adjacent to K.CC) · strand Counting & Cardinality · key `bus-queue` → `mini tools/bus-queue-core.js`, `bus-queue-activity.js`, `bus-queue-activity.html`, `bus-queue-activities.json` (scaffold `--num=207`).
- worksheets it covers: **K-030** First, Second, Third… and **K-320** Ordinal Numbers: Find the Place (find mode, bus stop) · **K-031** What Position? and **G1-317** Which Place? Write the Ordinal Number (name mode) · **K-336** Ordinal Numbers from Either End (either-end door) · **G1-315** Write the Missing Ordinal Numbers (name mode "badge gaps" rounds: several badges already shown, the starred one blank) · **G1-316** Ordinal Words: Draw a Line to the Picture (find mode — the ticket carries the ordinal; ordinal WORDS appear in the spoken prompt and, in the four word rounds of every find pass, on the ticket instead of the numeral) · **G1-318** Who Wins the Race? Write the Place (race face).
- merged: grade-1 **The Bakery Queue** (ordinal-queue) — its door-at-either-end queue and its race face are this activity's *Line* setting; its "the animals in front step forward wearing their place tags" is the boarding replay below.
- new instrument; nothing to keep.

## 1. The pitch
"The bus door does the counting: the animal next to the door is 1st, and when the door opens the queue boards one by one from the door end — so the ticket only reaches the right animal if you counted from the door."

## 2. Why a child will want it again
- **A queue of characters with a bus.** Up to ten different library animals (a horse, a zebra, a duck, a kangaroo…) stand in line on a kerb; the library bus waits on the road above with its front at one end. The child drags a paper ticket and drops it on ONE animal; the animal lifts it in its paws (the ticket tilts up and wiggles).
- **Boarding is the show.** Check opens the door with a hiss; the animals step up into the bus one after another from the door end, each getting a glowing place badge on the kerb spot it leaves — 1st, 2nd, 3rd — until the ticket holder steps in with a big gold badge. The doors close, the bus honks and pulls away, the animals left behind hop and wave, and the next bus rolls in for the next round.
- **When it goes wrong it is visible and funny:** boarding starts at the door, not where the child started counting; the badges march past the ticket holder or stop short, and the holder is left on the kerb shaking its ticket.
- **Race days.** In the race face the same animals run in lanes towards a finish ribbon; a sweep of light runs back from the ribbon and stamps 1st, 2nd, 3rd on the runners in order of how close they are.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** use ordinal numbers 1st–10th to find the thing in a given place in a line, and to name the place of a given thing, counting from the FRONT — wherever the front is (a door, an arrow, a flag, a finish line).
- **Misconceptions and the push-back:**
  - *Counting from the wrong end* (from the left, always): in either-end rounds the bus front is at the right half of the time; boarding physically starts at the door, so the badges grow from the door end and reach a different animal than the child's count did. Rounds are chosen so the target is never the same animal from both ends (one deliberate exception, the exact middle of an odd queue).
  - *"3rd" = "three of them"* (taking the first three): the ticket can rest on only one animal, and the boarding stops at ONE gold badge; in name mode the star is on one animal and the answer is one key. The badges show 1st, 2nd, 3rd as three *different* places, only one of them the 3rd.
  - *Closest-runner confusion in the race* (reading the lanes top-to-bottom as the order): lane order never equals finishing order in any round; the light sweep from the ribbon visibly ignores lane order and touches runners by distance.

## 4. The stage
**At 704:**
- **Task line** (20 px).
- **The road** (apparatus, 656 × 120 px, grey with a dashed white centre line) with **the bus**: `vehicles/bus`, 230 px wide, its front at the door end, front edge aligned with the first kerb spot. Native art faces LEFT, so door-left rounds use it as drawn and door-right rounds mirror it.
- **The stop post** (apparatus): a 4 px pole with a plain teal disc (24 px), planted at the door end of the kerb; a soft light cone falls from the bus front onto the first spot when the door opens.
- **The kerb** (apparatus, 656 × 150 px, warm grey paving): L spots at an even pitch of 64 px (L = 10) up to 96 px (L ≤ 6), centred, the first spot under the door. Each animal: library picture, height 96 px, overlapping its neighbour by up to 1/3 in long queues (queues overlap in life too; every head stays visible); all face the door.
- **The ticket** (apparatus): a cream paper ticket 76 × 46 px with a perforated left edge and the ordinal glyph in Baloo 2 28 px — or, in the **word rounds** (§6), the ordinal WORD alone in Baloo 2 20 px ("seventh"; it is the content, G1-316), waiting on a little stand at the far left of the stage below the kerb.
- **Place badges** (apparatus): rounded tags 42 × 26 px, ordinal glyph 16 px, appearing on kerb spots during boarding; the gold badge 54 × 32 px.
- **Name mode:** one animal wears a gold star above its head (drawn 5-point star 28 px); under the kerb a row of **ordinal keys** 1st–10th (10 keys, 58 × 48 px, 6 px gaps, one row).
- **Race face:** the ticket becomes a **medal** (apparatus: a 44 px gold disc with the glyph or word, hanging from a 30 px coral ribbon) and the road and kerb are replaced by a **track**: 4–6 horizontal lanes (lane height 96 px, white lane lines 2 px), a vertical **finish ribbon** (coral, 8 px, with a little flag at the top) at the left or right end; one runner per lane, facing the ribbon, at its own distance from it.
- Bubble under, Check right.

**At 360:** road 110 × full width with the bus 150 px wide; kerb spots at pitch 32 px for L = 10 (animals 64 px tall overlapping by half — every head visible because the z-order RISES away from the door: each animal is drawn over the tail of the one in front of it, never over a head; the gate measures ≥ 28 px of each animal's head box unoccluded; drop targets resolve to the nearest spot and the animal under the finger lifts 8 px *before* release, so a 32 px pitch is precise); pitch 48 px for L ≤ 6. Ordinal keys in two rows of five (60 × 48 px). Race lanes 64 px tall, runners 64 px. At 320: pitch 29 px for L = 10, keys 56 × 46.

Pictures (theme JSON verified; facing checked on the contact sheets — all face LEFT natively, mirrored for door/ribbon right): `farm-animals/` horse, goat, duck, cow · `zoo-animals/` zebra, kangaroo, camel, gazelle, wolf · `forest-creatures/` deer, hedgehog, squirrel, turtle · `vehicles/bus` (front three-quarter, its front at the LEFT). Native facing per noun, from the contact sheets: all LEFT except `zoo-animals/zebra`, which faces RIGHT — the renderer stores each noun's native facing and mirrors so every animal faces the door. Thirteen animals for queues of up to ten. One animal of each kind per queue (no two alike), so every place is nameable. Refused: front-facing animals (`farm-animals/pig`, `donkey`, `sheep`, `owl`, `zoo-animals/panda`, `bear`, `cat_2`) — they cannot face a door. Road, kerb, post, ticket, badges, star, keys, track, ribbon: drawn apparatus.

## 5. The hand
- **Drag the ticket** (find mode): it lifts and follows the finger (shadow 4 px); the animal under it lifts 8 px and its spot outlines teal; release → the ticket flies into that animal's paws (150 ms), the animal does a happy wiggle. Drag it again to move it. Released over nothing → it floats back to its stand.
- **Tap an animal** → it says its name (TTS) and does a little hop — free play, never an answer (find mode needs the ticket; name mode needs a key).
- **Tap a key** (name mode) → it presses down and stays lit; another key swaps.
- **Check** → the door opens (hiss, 250 ms) and the **boarding replay** runs: from the door end, each animal in turn steps up into the bus (step 220 ms, ease-in-out; it shrinks into the door) and its kerb spot gets a badge with its place; boarding stops at the ticket holder (find mode) or the star (name mode).
- **Race:** Check sends a light sweep (a 6 px soft-white vertical band) from the ribbon outward along all lanes at 300 px/s; each runner it touches gets a badge (1st, 2nd…) in the order touched; it stops at the ticket holder / star.
- **Keyboard:** Tab to the ticket, ←/→ moves it from animal to animal, Enter drops; Tab to keys in name mode.
- **Free play after success:** tapping any badge plays its place ("4th") where TTS exists.

## 6. The rounds
A round = one queue (or one race), one ordinal ticket (find) or one star (name). L = queue length. "idx" = position counted from the LEFT of the screen (the would-be wrong count when the door is right).

**Find mode — bus stop, door either end (10 rounds, every ordinal 1st–10th once):**
| # | L | door | target | idx from left | from the far end |
|---|---|---|---|---|---|
| 1 | 6 | right | 2nd | 5 | 5th |
| 2 | 7 | left | 4th | 4 | 4th (the one allowed middle) |
| 3 | 8 | right | 6th | 3 | 3rd |
| 4 | 5 | left | 1st | 1 | 5th |
| 5 | 9 | right | 3rd | 7 | 7th |
| 6 | 10 | left | 10th | 10 | 1st |
| 7 | 8 | left | 7th | 7 | 2nd |
| 8 | 6 | right | 5th | 2 | 2nd |
| 9 | 10 | right | 8th | 3 | 3rd |
| 10 | 10 | left | 9th | 9 | 2nd |
Door left 5 / right 5; target in the left half 4, right half 6 (≤ 60 %); the far-end count gives a different animal in 9 of 10 rounds.
**Word rounds (G1-316):** in every find pass, rounds 3, 6, 8 and 10 (either end) / the 3rd, 6th, 8th and 10th rounds (door left) put the ordinal WORD on the ticket instead of the glyph (en "sixth", "tenth", "fifth", "ninth"); the badges during boarding still show glyphs, so the word is read against the glyph the bus gives back. Race find rounds 2, 5 and 8 do the same on the medal.


**Find mode — door always left (10 rounds):** targets 2nd/L6, 4th/L9, 6th/L8, 1st/L5, 3rd/L4, 10th/L10, 7th/L10, 5th/L10, 8th/L9, 9th/L10 → target in the left half 4 / right half 6.

**Name mode — either end (10 rounds; star on the animal in place k):**
| # | L | door | star place |
|---|---|---|---|
| 1 | 7 | right | 3rd |
| 2 | 8 | left | 7th |
| 3 | 6 | right | 1st |
| 4 | 10 | right | 9th |
| 5 | 9 | left | 5th (the allowed middle) |
| 6 | 10 | left | 10th |
| 7 | 5 | right | 2nd |
| 8 | 9 | left | 8th |
| 9 | 6 | right | 4th |
| 10 | 8 | left | 6th |
Rounds 3, 6 and 9 are **badge-gap rounds** (G1-315): before Check the places of three other animals already show their badges (e.g. round 9: 1st, 2nd, 5th shown), the starred spot shows an empty badge outline. Name mode, door always left: the same places with door forced left.

**Race face (find, 9 rounds)** — lane distances are fractions of the track length from the ribbon (lane 1 = top):
| # | ribbon | lanes | distances (lane 1…n) | target | target lane |
|---|---|---|---|---|---|
| 1 | left | 5 | .55 .15 .80 .35 .95 | 2nd | 4 |
| 2 | right | 4 | .40 .75 .20 .60 | 1st | 3 |
| 3 | left | 6 | .30 .90 .10 .65 .48 .78 | 4th | 4 |
| 4 | right | 5 | .40 .62 .85 .20 .10 | 3rd | 1 |
| 5 | right | 6 | .70 .25 .92 .45 .12 .58 | 6th | 3 |
| 6 | left | 4 | .18 .50 .85 .33 | 3rd | 2 |
| 7 | left | 5 | .88 .42 .20 .65 .10 | 5th | 1 |
| 8 | right | 6 | .52 .15 .38 .95 .70 .28 | 2nd | 6 |
| 9 | right | 5 | .30 .75 .12 .50 .90 | 4th | 2 |
**Race (name, 9 rounds):** the same tracks with the star on, in order: 4th, 3rd, 1st, 5th, 2nd, 4th, 3rd, 5th, 1st. Neighbouring distances differ by ≥ 0.10 of the track (≥ 52 px at 704, ≥ 28 px at 360), and in no round does top-to-bottom lane order equal finishing order.

**Answer position:** the place in the line IS the skill, but its *screen* side is measured: per pass the target's left-half / right-half split is ≤ 60 %; door side 50/50 in either-end mode; race target lanes spread over all lanes (no lane > 2 per pass). Name-mode keys are a fixed 1st–10th row; each key is the answer at most once per pass.
**Order:** order-only reshuffle per pass; the animals in each queue are re-drawn from the pool per round (one of each kind), never by place.

## 7. Check, the misses, the success
- **Check without a ticket placed / key pressed** → hint "Put the ticket on one animal." / "Tap the place of the animal with the star." (no miss).
- **Miss 1 — the boarding replay itself:** boarding from the door up to the ticket holder (or, if the holder is nearer the door than the target, up to the holder) — the holder's badge reads its real place, e.g. "5th", beside its "3rd" ticket; then the boarded animals step back down (400 ms), the badges fade after 1.2 s, the door end pulses and a dotted arrow runs from the door along the queue. Hint: "Count from the bus door. The animal next to the door is 1st."
- **Miss 2:** the replay runs to the target place and the badges STAY lit on every animal from the door up to it, the target spot showing an empty ticket outline. Hint: "Count with the badges, from the door."
- **Race misses:** miss 1 = the sweep runs to the holder and shows its real place; the ribbon pulses. Hint: "The runner nearest the ribbon is 1st." Miss 2 = the sweep badges stay up to the target.
- **A new drag / key** clears the showing.
- **Success:** boarding to the holder, gold badge, doors close, honk, the bus pulls away (translateX past the stage edge, 900 ms) with two exhaust puffs (drawn circles); the rest of the queue hops. Race: the holder gets the gold badge and a confetti of five drawn circles from the ribbon. Bubble: find "Yes — {ord} from the door!" · name "Yes — the star is {ord}!" · race "Yes — {ord} to the ribbon!"

## 8. Settings (each visibly changes the board at rest)
1. **Task:** find the place (ticket) / name the place (star + ordinal keys).
2. **Line:** bus stop, door on the left / bus stop, door at either end / race to the ribbon — the bus side and the whole scene change.

## 9. Words (EN source)
- title: "The Bus Queue"
- instruction: find (bus) "Put the ticket on the animal in this place. Count from the bus door." · name (bus) "Which place is the animal with the star? Count from the bus door." · find (race) "Give the medal to the runner in this place. The nearest to the ribbon is 1st." · name (race) "Which place is the runner with the star? The nearest to the ribbon is 1st."
- spoken prompt (TTS): find "Find the {ordWord} animal from the door." · name "Which place is the star?"
- hints: hintNoTicket "Put the ticket on one animal." · hintNoKey "Tap the place of the animal with the star." · hintDoor "Count from the bus door. The animal next to the door is 1st." · hintBadges "Count with the badges, from the door." · hintRibbon "The runner nearest the ribbon is 1st." · hintRibbon2 "Count with the badges, from the ribbon."
- celebrations: §7.
- settings: "Task" · "find the place" · "name the place" · "Line" · "door on the left" · "door at either end" · "race to the ribbon"
- aria: animal "{animal}, in the queue"; ticket "ticket: {ordWord}"; key "{ordWord}"; badge "{ordWord}".
- **Ordinal glyphs** (on the ticket, badges and keys only), from the worksheet ordinal bank already gated by `verify-b3-ordinal-numbers.js`: en 1st 2nd 3rd 4th … 10th · de / da / no / fi 1. 2. 3. … 10. · fr 1er 2e 3e … 10e · es / pt / it masculine N.º-style per the bank's one-dot rule (the bank fixes whether the locale writes 1.º or 1º — never mixed) · nl 1e 2e … 10e · sv 1:a 2:a 3:e … 10:e. Masculine because the counted noun is "the animal" (es el animal, pt o animal, it l'animale, fr le premier animal); the race uses "runner" (es el corredor) — also masculine.
- **Ordinal words** (word rounds only, on the ticket/medal, standing alone so no case or article): en first … tenth · de erste … zehnte (lower-case, the bare adjective form; the native reviewer confirms it reads naturally alone on a ticket) ·
 fr premier, deuxième … dixième · es primero … décimo · pt primeiro … décimo · it primo … decimo · nl eerste … tiende · sv första, andra … tionde · da første, anden … tiende · no første, andre … tiende · fi ensimmäinen … kymmenes (nominative). Masculine forms where gender exists, matching the glyphs.
- **Locale traps:** fi ordinals inflect in a sentence — the glyph "3." stands only on the ticket/badge; sentences never wrap an ordinal in case ("Laita lippu oikealle eläimelle. Laske bussin ovelta." / "Kyllä — {ord} ovelta!" reads "kolmas ovelta"); de "der 3." on badges is fine without article; fr U+202F before "!" and "?"; sv 1:a / 2:a / 3:e — the bank's rule; the word for queue: de *Schlange*, fr *file d'attente*, es (MX) *fila*, pt *fila*, it *fila*, nl *rij*, sv *kö*, da *kø*, no *kø*, fi *jono*; "bus" is fine everywhere (es MX *autobús/camión* — use *autobús*, as the parking-tower rebuild already rules).
- **Sound off:** badges and the gold badge carry the count; the door light and the arrow carry "from the front".

## 10. Sound off, access, phones
- Legible with the sound off (glyphs + motion). Keyboard path §5 (the ticket can be moved without a pointer). aria-live bubble.
- Taps: keys ≥ 46 px; the ticket 76 × 46; drop targets resolve to the nearest spot (no precision tap needed).
- Pictures: animals 96 px tall at 704, 64 px at 360; the bus 230 / 150 px wide.
- Fold: 360 × 740 → task 24 + road 110 + kerb 120 + ticket stand 56 + keys 104 + bubble/Check 56 ≈ 470 px; race with 6 lanes 384 + 136 ≈ 520 px. 320 × 640 similar. Check above the fold.

## 11. Distinct from
- Tool **the-queue** slides a hand along a line to COUNT how many (cardinality, either end). Here nobody counts how many: one place is named, the door is the origin, and the *boarding* is the proof. Different question, different hand (a ticket on one animal).
- **Animal Train (#10)** counts carriages; **Roll Book (#13)** counts a roll call; **Number Elevator (#19)** floors as magnitude. No built activity teaches ordinals.
- Siblings: #205 turns a hopper on a number court (before/after numbers); #206 is a tally.

## 12. Build plan
- **Core state:** `{task:'find'|'name', line:'left'|'either'|'race', L, door:'L'|'R', animals:[ids], target:k, ticket:null|spot, key:null|k, gaps:[k…], race:{lanes:[d…], ribbon}, miss, help}`.
- **Core functions:** `placeOf(spot)` = door-left ? spot : L+1−spot (1-indexed spots from the left) · `raceRank(lane)` (by distance) · `dropTicket(spot)` · `pressKey(k)` · `check()` → `{ok, kind:'none'|'wrong', heldPlace}` · `replay(upTo)` (the boarding order list) · `layout(width)` (pitch, overlap).
- **Gate ground truth:** placeOf/raceRank from its own formula; every round has one right spot; find-either table: target ≠ far-end place except the one listed middle; door split 5/5; left/right half ≤ 60 %; each ordinal 1–10 exactly once per find pass and per name pass; race: distances distinct, neighbours ≥ 0.10 apart, lane order ≠ finishing order, target lane ≤ 2 per pass; no two same animals in a queue; glyph set per locale equals the worksheet bank; badge-gap rounds never pre-show the star's badge.
- **Mutations:** placeOf counts from the left regardless of door · race ranks by lane · ticket can rest on two animals · replay starts at the far end · target equals far-end place in a second round · duplicate animal in a queue · door always left in either-end mode · gap round pre-shows the target badge · es glyph mixes 1.º and 2º · help survives a new drag · a word round shows the glyph (or the word on a badge) · zebra rendered without its native-facing flip (faces away from the door).

- **Pictures to confirm at build:** the fourteen animals mirrored, overlapped at 64 px pitch (heads visible), the bus mirrored.
- **Risks:** at 360 with L = 10 the 32 px pitch relies on lift-before-release; measure the drop accuracy in local-test with real pointer events at every spot.
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a bus that boards a queue of animals, a ticket to hand out, a race with a light that stamps places.
2. **Would a teacher put it on the board?** Yes — "count from the front" is shown by the door doing the counting; the wrong end and "3rd = three" fail visibly.
3. **Would a parent trust it?** Yes — library animals and bus, glyphs only on tickets and badges, no score.
4. **The invention, in one sentence:** the queue boards from the bus door, so a ticket reaches the right animal only when the child counted from the door.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Contact sheets: `farm-animals/pig` faces the viewer (removed from the queue pool, with donkey and sheep added to the refused list); `zoo-animals/zebra` faces RIGHT, not left — a per-noun native-facing table now drives the mirror; the bus's front is at the left (three-quarter).
- G1-316 (ordinal WORDS) referenced a "grade-1 setting" that did not exist: it is now four **word rounds** in every find pass (and three race rounds) where the ticket/medal carries the word alone while the boarding badges answer in glyphs; the 11-locale word list is written out (masculine, standalone, fi nominative).
- The race face's "medal" was named in the instruction but never drawn: it is now defined as apparatus.
- Phones: the 32 px pitch at L = 10 kept 64 px pictures but risked hidden heads — the z-order now rises away from the door so each animal covers only the tail in front, and the gate measures ≥ 28 px of every head box visible. Two mutations added.
