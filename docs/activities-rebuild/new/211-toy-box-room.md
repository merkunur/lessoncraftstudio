# New 211 — The Toy Box Room (K.G.A.1)

## 0. Identity
- id `toy-box-room.play.k-g-a-1` · grade K · CCSS K.G.A.1 · strand Geometry · files `toy-box-room-core.js`, `toy-box-room-activity.js`, `toy-box-room-activity.html`, `toy-box-room-activities.json` (scaffold `node scripts/new-activity.js --num=211`).
- Worksheets covered: K-064 On, Under, Beside (word set 1) · K-067 Inside and Outside (word set 1, pen rounds) · K-065 Left and Right (word set 2) · K-066 Top, Middle, Bottom (word set 3, the cupboard).
- New instrument (no old activity).

## 1. The pitch
"Let go of the toy and it falls where gravity takes it — so the child has to put it exactly where the word says."

## 2. Why a child will want it again
It is a real little room with a wooden toy box on short legs, and the toys obey gravity. Pick up the dinosaur, hold it anywhere, let go — it drops, lands with a squash-and-bounce and settles: on the lid, *plunk* into the open half of the box (half hidden by the rim, peeking out), or rolls to a stop on the floor. Toys tumble; the box gives a tiny wooden creak when something lands on it. Between rounds the child can drop all three toys of the round on top of each other and watch them settle, or tap the box's lid flap to open and close it. The room is a toy before it is a task. On success the toy does a happy two-step hop where it sits and a small star pops above it.

## 3. The skill and the misconception
- **Skill (K.G.A.1):** describe the relative position of objects with position words — on, under, beside, inside, outside, in front of, behind, left, right, top, middle, bottom — both by placing (word → place) and by finding (word → which object).
- **Misconceptions and how the room pushes back:**
  1. *On vs in* — the box has a lid in two halves: one half closed (a toy dropped there rests ON it), one half open (a toy dropped there falls INSIDE, half hidden by the rim). Gravity decides; the child must aim. Which half is open flips from round to round, so "on = right side" can never become a habit.
  2. *Under vs behind* — UNDER is the space between the legs (the toy is seen through the gap); BEHIND is the strip of floor at the back of the box, where the toy is drawn smaller and partly hidden by the box (never fully). The two look different on purpose.
  3. *Left vs right (mirror reversal)* — the room is seen from the child's own side, and two library hands rest palm-up on the bottom corners: the left hand at bottom-left, the right hand at bottom-right. "Left" is always the side of the child's own left hand — no "the toy's left".
  4. *Inside vs outside* — a drawn fence pen: a toy inside is behind the front posts (posts overlap it); outside it stands on the open grass.
  5. *Top/middle/bottom* — a three-shelf cupboard; a dropped toy falls onto the shelf board under the drop point, so "middle" must be aimed between the two other boards.

## 4. The stage
Layout stacked (the room needs the full width); bubble under the room. 

**At 704 px** — the room 640 × 420:
- **Back wall** (cream, top 120 px) and **floor** in gentle perspective (warm wood, 300 px deep), a faint seam line down the floor centre (word set 2).
- **The toy box** (word set 1): box body 300 × 150, lid in two flaps of 150 px each (the closed flap flat on top, the open flap swung up against the wall at 70°), on four legs 110 px high. Box top at y = 170, floor under it y = 430. Toys are 96 px tall (the "under" gap is 110 px, so every mover fits).
- **The pen** (word set 1, inside/outside rounds): an oval ring of 14 fence posts (drawn apparatus, 300 × 150 floor ellipse), on a green grass floor.
- **The flat box** (word set 2): a LOW toy chest (300 × 64 at 704, 176 × 40 at 360), lid closed, sitting flat on the floor (no legs) in the middle depth band — low on purpose: a toy BEHIND it stands with its base 30 px (18 px at 360) above the chest's base line, drawn at 0.85 scale, so the chest hides its lower 25–40 % and the toy's head and shoulders always show (a full-height box would swallow a toy behind it, which would make "behind" invisible); a **back strip** behind it (a rug 360 × 70, drawn at 0.85 scale) and a **front strip** in front of it (360 × 90, drawn at 1.1 scale); left and right floor either side.
- **The cupboard** (word set 3): a wooden three-shelf cupboard 280 × 380 standing on the floor, boards at y = 120 / 240 / 360, each compartment 112 px tall.
- **The hands** (word set 2 only): body-parts/hand at 96 px in the bottom-left corner and the same picture CSS-mirrored in the bottom-right corner. **Checked on the contact sheet (critic, 2026-10-17):** the library hand shows the PALM (palm creases drawn), fingers up, thumb on the image's LEFT — exactly what a child sees looking at their own LEFT palm held up. So as drawn = the child's left hand (bottom-left), mirrored = the right hand (bottom-right). The child can hold up their own hands and match them.
- **The mover / toys:** library toys at 96 px tall, waiting in the top-left "toy shelf" niche (a recess in the wall, 120 × 110).
- **The task line** (≤ 24 px) with a 36 px **zone glyph** inline after it: a tiny line drawing of the box/pen/cupboard with a coral dot at the asked zone (e.g. a box outline with a dot under it). The glyph is the word in picture form for pre-readers and in all 11 locales.

**At 360 px** — the room 336 × 300: box 176 × 88, legs 72 px, toys 64 px (the under gap 72 px still fits a 64 px toy), cupboard 170 × 270 (compartments 80 px), hands 64 px, pen ellipse 190 × 96. The toy niche moves to the top-right of the wall when the open flap is left (so the niche never sits over the drop target). At 320: room 300 × 280, toys 64 px, box 160 × 80.

Library pictures (verified in `mini tools/pictures/*.json` and seen on the contact sheet): toys/ball, toys/car, toys/dinosaur, toys/robot, toys/train, toys/truck, toys/boat, pets/cat, pets/dog, body-parts/hand. Refused: toys/doll, toys/girl, toys/baby (people, not toys to drop), toys/kite and toys/balloon (strings make the footprint unreadable), toys/rocket (too tall for the under gap at 64 px). Everything else is drawn apparatus (walls, floor, box, legs, pen posts, cupboard, glyphs). No words on the apparatus.

## 5. The hand
- **Pick up** (pointerdown on a toy): it lifts with a 1.08 scale and a soft shadow under the finger (< 50 ms); it follows the finger, always upright.
- **While carrying:** a faint vertical drop line runs from the toy straight down to where it would land, and the landing spot shows a soft shadow ellipse — the child sees where gravity will put it before letting go (this makes aiming possible, not lucky).
- **Let go:** the toy falls straight down (gravity, 220–380 ms by height, ease-in), lands with a squash (scale 1.1 × 0.9, 80 ms) and a little bounce, and settles in exactly one zone. If the drop line meets the open flap's mouth the toy falls inside and the rim covers its lower 45 %. If it meets the closed flap it rests on top. Between the legs → under. On floor → beside / left / right / in front / behind by where it lands. In the pen → inside (front posts overlap it).
- **Tap-to-place** (access): tap a toy (it lifts and pulses), then tap a spot → it flies there and falls the same way.
- **Find mode:** tap a toy; it lifts 6 px and gets a ring; tap again to put it down.
- **Undo:** any toy can be picked up again before Check.
- **Free play (between rounds and after success):** all toys of the round can be dropped anywhere, stacked (a toy dropped on a toy lands on top of it), and the lid flap toggles open/closed with a tap. During a round the flap is fixed.
- Sound (optional): wooden plunk on landing, a soft creak when the box takes a toy, a rustle in the pen; TTS reads the task line (where available).

## 6. The rounds
One round = one word. **Place mode:** one toy, put it where the word says. **Find mode:** rounds 1–6 — three toys already sit in three different zones; tap the one the word names. Rounds 7–9 — **"every"** rounds (the worksheets K-065/K-066/K-067 say "circle EVERY picture …"): four or five toys, two or three of them in the asked zone; tap every one, then Check. One right SET.

**Word set 1 — on · under · beside · inside · outside (place):**
| # | toy | word | apparatus |
|---|---|---|---|
| 1 | ball | on | box, open flap LEFT |
| 2 | car | inside | box, open flap RIGHT |
| 3 | dinosaur | under | box, open flap LEFT |
| 4 | robot | beside | box, open flap RIGHT |
| 5 | train | inside | pen |
| 6 | truck | on | box, open flap RIGHT |
| 7 | boat | outside | pen |
| 8 | cat | under | box, open flap LEFT |
| 9 | dog | beside | box, open flap RIGHT |
Words: on 2, inside 2, under 2, beside 2, outside 1; never one word three times running.

**Word set 2 — in front of · behind · left · right (place)** (flat box; "left/right" = left/right OF the box, on the side of that hand):
| # | toy | word |
|---|---|---|
| 1 | ball | in front of |
| 2 | car | left |
| 3 | dinosaur | behind |
| 4 | robot | right |
| 5 | train | in front of |
| 6 | truck | behind |
| 7 | boat | left |
| 8 | dog | right |
| 9 | cat | behind |

**Word set 3 — top · middle · bottom (place, the cupboard):**
| # | toy | word |
|---|---|---|
| 1 | ball | top |
| 2 | car | bottom |
| 3 | dinosaur | middle |
| 4 | robot | top |
| 5 | train | middle |
| 6 | truck | bottom |
| 7 | boat | middle |
| 8 | cat | top |
| 9 | dog | bottom |

**Find mode** (three toys → zones; target word):
- Set 1: (1) ball on, car under, robot beside-L → **under** · (2) dinosaur inside, truck beside-R, cat on → **on** · (3) train under, ball beside-L, dog inside → **inside** · (4) car on, boat under, robot beside-R → **beside** · (5) pen: ball inside, dinosaur outside-L, truck outside-R → **inside** · (6) cat beside-L, train on, car inside → **beside** · (7) EVERY — pen: robot outside-R, boat inside, dog inside, ball outside-L → **every toy inside the pen** = boat, dog · (8) EVERY — box: truck under, dinosaur on, ball inside, cat on → **every toy on the box** = dinosaur, cat · (9) EVERY — pen: car outside-L, train inside, dog outside-R, robot inside, truck outside-L → **every toy outside the pen** = car, dog, truck.
- Set 2: (1) ball left, car behind, robot in front → **behind** · (2) dinosaur right, truck in front, cat left → **left** · (3) train behind, ball right, dog in front → **in front of** · (4) car left, boat right, robot behind → **right** · (5) cat in front, dinosaur behind, truck right → **behind** · (6) dog left, train in front, car right → **left** · (7) EVERY — robot left, boat left, ball right, car behind → **every toy on the left of the box** = robot, boat · (8) EVERY — truck right, dinosaur in front, cat right, dog left → **every toy on the right** = truck, cat · (9) EVERY — car left, dog behind, train left, ball in front, cat right → **every toy on the left** = car, train.
- Set 3 (one toy per shelf; x-slot on the shelf L/C/R): (1) top ball L, middle car R, bottom robot C → **middle** · (2) top dinosaur C, middle truck L, bottom cat R → **bottom** · (3) top train R, middle ball C, bottom dog L → **top** · (4) top car L, middle boat C, bottom robot R → **bottom** · (5) top cat R, middle dinosaur L, bottom truck C → **middle** · (6) top dog C, middle train R, bottom car L → **top** · (7) EVERY — top robot L, middle ball R, middle cat L, bottom boat C → **every toy on the middle shelf** = ball, cat · (8) EVERY — top truck C, top dog R, middle cat L, bottom dinosaur R → **every toy on the top shelf** = truck, dog · (9) EVERY — top boat R, middle dog C, bottom train L, bottom car R → **every toy on the bottom shelf** = train, car.
- One right answer: in place mode exactly one zone matches; in find rounds 1–6 exactly one toy sits in the asked zone; in EVERY rounds the asked set is exactly the toys in that zone, with ≥ 1 toy outside it (gate-asserted). "Left/right" in set 2 counts the floor on that side of the chest INCLUDING its front and back corners, while "in front"/"behind" are the strips straight in front of and behind the chest — so no toy is ever in two zones (the gate's collider table proves it).
- **Answer position:** place mode — the drop target's screen third alternates because the open flap flips sides (set 1) and left/right/front/behind rotate (set 2); find mode — the answer toy's 3 × 3 screen cell is tallied by the gate: over each pass no cell holds the answer more than 3 of 9 rounds, the answer is the first-placed toy in ≤ 3 rounds, and in set 3 the answer's x-slot is L 3 / C 3 / R 3.
- **Order:** order-only reshuffle per pass via `nextTask` (pass 2 ≠ pass 1, same set); the open-flap side travels with its round.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: place "Pick up the {toy} and let it go where the word says." · find "Tap the toy that is {word}."
- **miss 1:** the toy stays where it settled; the zone it is in gets a soft outline, and a SECOND glyph appears beside the task glyph showing where the toy is now (the same tiny box with a dot at the toy's zone) — the child compares two pictures: asked vs got · hint "Look at the two little pictures. Move the {toy} so they match."
- **miss 2:** the asked zone glows on the stage (a teal wash pulsing twice); in word set 2 the hand on that side also glows · hint "Put the {toy} in the glowing place."
- (find mode: miss 1 — every toy's zone glyph floats over it; miss 2 — the asked zone glows.)
- A new move takes the help away until the next Check.
- **Success:** the toy does a two-step hop where it sits, the box creaks (or the pen gate swings), a star pops above the toy, and the task glyph fills with colour. Bubble: "Yes! The {toy} is {word} the box." (variants per apparatus: "… the pen.", "… on the top shelf.", "… on the left of the box.") — full sentences stored per word per locale (§9).

## 8. Settings
1. **Words:** on · under · beside · inside · outside / in front · behind · left · right / top · middle · bottom — the board changes at rest: box on legs (or pen) · flat box with the two hands · the cupboard.
2. **Mode:** place it / find it — one toy in the niche vs three toys already in the room.

## 9. Words (EN source)
- title "The Toy Box Room" · instruction "Read the position word, then put the toy there — or find the toy that is there."
- **Place prompts (one full sentence per word, never assembled):** "Put the {toy} ON the box." · "Put the {toy} INSIDE the box." · "Put the {toy} UNDER the box." · "Put the {toy} BESIDE the box." · "Put the {toy} INSIDE the pen." · "Put the {toy} OUTSIDE the pen." · "Put the {toy} IN FRONT OF the box." · "Put the {toy} BEHIND the box." · "Put the {toy} on the LEFT of the box." · "Put the {toy} on the RIGHT of the box." · "Put the {toy} on the TOP shelf." · "… on the MIDDLE shelf." · "… on the BOTTOM shelf."
- **Find prompts:** "Which toy is ON the box?" (and the same 13 positions). **Every prompts:** "Tap every toy INSIDE the pen." · "Tap every toy ON the box." · "Tap every toy OUTSIDE the pen." · "Tap every toy on the LEFT of the box." · "Tap every toy on the RIGHT of the box." · "Tap every toy on the TOP shelf." / MIDDLE / BOTTOM. Hints: hintEvery1 "Some toys are in the wrong place, or some are missing. Look at each toy's little picture." · hintEvery2 "Every toy in the glowing place." · celebrateEvery "Yes! {count} toys are {zonePhrase}." (count stored as a whole sentence per count per locale).
- hints: hintPlaceStart "Pick up the {toy} and let it go where the word says." · hintFindStart "Tap the toy that is {word}." · hintMiss1 "Look at the two little pictures. Move the {toy} so they match." · hintMiss2 "Put the {toy} in the glowing place." · hintFind1 "Each toy shows its little picture. Which one matches?" · hintFind2 "The right place is glowing."
- celebrations: one per prompt ("Yes! The {toy} is on the box." …).
- settings: setWords "Words" · wordsA "on, under, beside, inside, outside" · wordsB "in front, behind, left, right" · wordsC "top, middle, bottom" · setMode "Mode" · modePlace "Put it there" · modeFind "Find it".
- {toy} = the vocab noun with its article inside each stored sentence — never concatenate an article.
- **Locale traps:** de two-way prepositions take the ACCUSATIVE for placing ("Leg den Ball AUF die Kiste") and the DATIVE for finding ("Welches Spielzeug ist AUF der Kiste?") — two separate sentence sets; the noun's gender changes the article (der Ball → den Ball). fr *sur / sous / à côté de / dans / dehors (en dehors de) / devant / derrière / à gauche de / à droite de*; "de + le" contracts ("à côté du coffre"). es *encima de / debajo de / al lado de / dentro de / fuera de / delante de / detrás de / a la izquierda de*, contraction "del". it *sopra / sotto / accanto a / dentro / fuori da / davanti a / dietro / a sinistra di* with contractions ("sulla scatola", "nella scatola"). pt *em cima de / embaixo de / ao lado de / dentro de / fora de / na frente de / atrás de* (BR register) with contractions ("na caixa", "da caixa"). nl *op / onder / naast / in / buiten / voor / achter / links van / rechts van*. sv *på / under / bredvid / i / utanför / framför / bakom / till vänster om*; da *på / under / ved siden af / i / uden for / foran / bag / til venstre for*; no *på / under / ved siden av / i / utenfor / foran / bak / til venstre for*. fi uses postpositions/cases on the reference noun: *laatikon päällä / alla / vieressä / sisällä*, *aitauksen ulkopuolella*, *edessä / takana*, *vasemmalla puolella*, place = illative/allative ("laatikon päälle", "laatikkoon") vs find = adessive/inessive ("laatikon päällä", "laatikossa") — two sets again. "Top/middle/bottom shelf": de *oberstes / mittleres / unterstes Fach*, fr *l'étagère du haut / du milieu / du bas*, fi *ylähylly / keskihylly / alahylly*. Left/right wording follows "the child's left": no locale may phrase it "the box's left". Capitals for emphasis are a typographic choice in EN; other locales may bold the position word instead (fr/de/fi capitals on a preposition read oddly) — the build bolds the word in all 11.

## 10. Sound off, access, phones
- Legible with sound off: the zone glyph shows the asked place as a picture; the drop line and landing shadow show where the toy will fall; the miss-1 glyph pair compares asked vs got.
- Keyboard: Tab to a toy, Enter lifts; arrow keys move a landing cursor over the zones (one zone per step, the shadow ellipse moves); Enter drops. Find mode: Tab cycles toys, Enter chooses.
- aria: each toy "{toy}, now {zone word}" after landing; aria-live bubble.
- Taps: toys 64 px at 360 (≥ 44); every zone ≥ 56 × 56 at 360 (the under gap is 72 × 140; the back strip 200 × 44 — at 360 the back strip hit zone is padded to 56 px tall).
- Pictures ≥ 96 px at 704, 64 px at 360.
- Check above the fold: at 360, header 56 + task line 52 + room 300 + bubble 0 (bubble under Check) → Check at ≈ 430 px; at 320 × 640 ≈ 410 px.

## 11. Distinct from
- The planned Parking Tower (above / below / between on floors) keeps vertical order on a number line of floors; this is a room of objects with gravity and a single reference.
- #19 Number Elevator (floors = numbers) — numbers, not positions.
- Tools: `arrow-strip` (direction cards for a beetle) and `build-plan` (views of buildings) — different skills and hands.
- No registry mechanic reused; the gravity drop + drop line is new.

## 12. Build plan
- **Core state** `{set, mode, roundIdx, flapOpen:'L'|'R', toys:[{key, x, y, zone}], carried, help}`. Functions: `landing(x)` → `{y, zone}` by casting straight down through the apparatus colliders (lid-closed rect, open-mouth rect, box interior floor, under-gap floor, floor bands, pen ellipse, cupboard boards); `zoneOf(point)`; `place(toy, x)`; `check()` → `toy.zone === round.word` (place) or `tapped.zone === round.word` (find); `helpLevel`, `hintKey`, `layout(width)`.
- **Gate's own truth (verify):** an independent collider table per layout width: for a grid of release points every point lands in exactly one zone; each zone is reachable at 320/360/704 (some release point lands there with hit area ≥ 56 px); the inside zone hides 40–50 % of the toy and the behind zone hides 20–45 % (never 100 %); every place round has exactly one matching zone; every find round has exactly one toy in the asked zone; the 3 × 3 answer-cell tally ≤ 3 of 9; flap side alternates so "on" is left 1 / right 1 and "inside" left 1 / right 1 in set 1; mirrored hand is bottom-right in set 2; ≥ 9 rounds per set × mode.
- **Mutations:** EVERY round accepted with one toy missing · EVERY round accepted with an extra toy · behind toy fully hidden by the low chest · the open flap catches "on" · the under gap reports "behind" · behind drawn fully hidden · left/right swapped (hands mirrored the wrong way) · pen inside = outside · cupboard drop lands on the board above · help kept after a new move · Check with nothing counts a miss · find round with two toys in the asked zone · flap side not flipped between rounds · tap-to-place skipping gravity.
- **Pictures to verify on a contact sheet:** toys (ball, car, dinosaur, robot, train, truck, boat) — seen: all single objects, side/three-quarter views, readable at 64 px; pets/cat, pets/dog; body-parts/hand (palm, fingers up, thumb left — the left-hand reading to be confirmed by the reviewer).
- **Risks:** the hand-reading (palm-up left hand) must be confirmed — if the reviewer reads it otherwise, mirror the assignment, never add a word. Fat-finger aiming on the 360 back strip: the drop line + shadow make it aimable; the strip hit zone is padded. Not blocked.

## 13. The four questions
1. **Would a child choose it again?** Yes — toys that fall, bounce, plunk into a box and peek out; a room to play in.
2. **Would a teacher put it on the board?** Yes — every position word is a physically distinct place relative to ONE reference; gravity makes "on" vs "in" a matter of aim; left/right is anchored to the child's own hands; misses compare asked-vs-got pictures instead of scolding.
3. **Would a parent trust it?** Calm, library toys, drawn furniture only, words only in the task line, no score or timer.
4. **The invention:** a room where every toy falls exactly where you let it go — so the position word decides where your hand must aim.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **Correctness:** set 2 put a toy BEHIND a box 150 px tall, which would have hidden a 96 px toy completely. That breaks the dossier's own rule that "behind" must stay visible. The set-2 box is now a low chest (64 px at 704 and 40 px at 360) with exact offsets, so the chest hides 25–40 % of the toy. A mutation guards this.
- Zone overlap fixed: left/right now own the chest's corners, and front/behind are the straight strips. No toy can be in two zones.
- **Coverage:** K-064 to K-067 all say "circle EVERY picture …", but find mode only ever had one answer. Rounds 7–9 of every set are now EVERY rounds, with 4–5 toys and 2–3 answers, one right set. Added prompts, hints, celebrations and mutations.
- **Reality:** the hand reading is now settled on the contact sheet. The library hand shows the palm with the thumb on the image's left, which is the child's own left palm, so the design's assignment is correct and is no longer a build-time risk.
