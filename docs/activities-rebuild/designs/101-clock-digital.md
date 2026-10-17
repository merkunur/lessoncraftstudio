# Row 101 — Sprocket's Clock (to the half-hour) → THE HOUR ROAD (1.MD.B.3)

## 0. Identity
- id `clock-digital.read-half-hour.1-md-b-3` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl, sv — da/no/fi slug, title and intro are new at build) · grade 1 · CCSS 1.MD.B.3 (tell and write time in hours and half-hours using analog and digital clocks) · strand Measurement & Data · own files `hour-road-core.js`, `hour-road-activity.js`, `hour-road-activity.html`, `hour-road-activities.json` (this row leaves `clock-digital-activities.json`; the id is unchanged).
- page title (frozen): "Sprocket's Clock — Read the Clock to the Half-Hour (Grade 1)"; intro (frozen) promises: **read an analog clock at o'clock AND half-past times, then tap the matching digital time**; children must read **both hands** — the long hand on 12 for o'clock or on 6 for half past — to tell 3:00 from 3:30; Sprocket the rooster cheers. **All kept true.**
- worksheets also covered: G1-148 On the Hour · G1-149 Half Past What? · G1-150 Clock Partners.
- what the old activity did: analog clock, three digital options (right, same hour other minutes, a far time like 8:30), tap one. **Kept**: the nine targets (3:30, 6:00, 9:30, 1:00, 11:30, 5:00, 8:30, 2:00, 7:30), the same-hour-other-minutes distractor, tap-a-digital-card, Sprocket. **Changed**: the far distractor (8:30 for 3:30 tested nothing) becomes the real half-past error — **the next hour** (4:30 for 3:30), because at half past the short hand is already half way to the next number. A 12:30 round is added.
- sibling row 102 (to the hour) uses a different invention (the digits riding the hands); the two are separate engines.

## 1. The pitch
"Under the clock lies its rim unrolled into a straight road with the twelve numbers as posts — tap a time and Sprocket's marker walks to that spot on the road, then the road rolls back up into the clock: if you were right, the marker lands exactly on the tip of the short hand — and Sprocket, up on the clock, crows."

## 2. Why a child will want it again
- The road is a delightful idea made visible: the clock's numbers stand along a straight country road as little posts — 12, 1, 2, … 11, 12 — with a small stone half way between every two posts. It is the clock, flattened.
- Sprocket (the library rooster, full size on top of the clock) sends his **marker** — a coral token with a little drawn comb notch (apparatus, the rooster's colour) — strutting along the road to the time on the card, step by step, past the posts; Sprocket turns his head to follow it.
- Then the magic: the road **lifts and curls into a ring** (900 ms) and wraps itself around the clock face, post onto numeral, carrying the marker round. If the card was right, the marker arrives **exactly at the tip of the short hand**, which glows as it lands — and Sprocket on top of the clock crows (a hop and a flap; a short crow sound).
- The earned show: the clock then **runs half an hour** — the long hand sweeps half a lap (nothing is painted behind it: no arc, no wedge — that is the premium learning clock's and row 104's device), the short hand creeps half the way to the next number, and the marker rides the same half segment, with the road briefly re-appearing as a straight strip under the clock showing the marker move from one stone to the next post. Half an hour is shown as half a lap and half a road segment at once.
- Free play: the marker can be dragged along the road at any time — the clock's hands move with it (the road drives the clock: one post = one hour = one full lap of the long hand; a half stone = half a lap). Children drag it fast to make the long hand whirl.
- No score, no timer, no lives.

## 3. The skill and the misconception
- Skill (1.MD.B.3; G1-148/149/150): read both hands — the long hand on 12 (:00) or on 6 (:30) — and the short hand: **on** a number at o'clock, **half way past** a number at half past; name the hour by the number the short hand has **passed**; match to the digital time.
- Misconceptions and push-back:
  1. **At half past, reading the next number** (3:30 read as 4:30 because the short hand is near the 4) → on the road, 4:30 is half way between posts 4 and 5; rolled up, the marker lands half way between the 4 and the 5 — a whole hour ahead of the short hand's tip, which sits half way between 3 and 4. The gap between the marker and the tip is one road segment: visibly "one hour too far".
  2. **Ignoring the long hand** (3:00 for a 3:30 clock) → the marker lands on the 3 while the short hand's tip is half a segment further on — and the long hand is on the 6, not the 12.
  3. **At o'clock, choosing half past the hour before** (5:30 for 6:00) → the marker lands half a segment short of the tip.
  4. **Not seeing that the short hand moves** (thinking it jumps from number to number) → in the free play and in the half-hour show the short hand creeps continuously with the marker's walk; a half stone is a real place between two posts.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 480):
- **The clock** (drawn apparatus, top centre): face 290 px across, cream (#FFF8E7) with a 6 px teal rim (#146B5E); numerals 1–12 Baloo 2 30 px ink; 60 minute ticks; **short hand** coral (#F2784B) 12 px wide to 55 % radius with a **round tip cap 14 px** (the marker's landing spot); **long hand** teal 6 px to 88 %; brass centre. Small cream collars outside the rim at 12 ("00") and 6 ("30"), as in row 102's minutes logic.
- **The Hour Road** (drawn apparatus, under the clock, 640 × 70): a straight sandy road (#EBD9B4) with a 3 px ink edge; **13 posts** (12, 1, 2, … 11, 12) evenly spaced, each a little wooden post 30 px tall with its numeral on a cream sign (16 px digits) — the same numerals as the dial; between every two posts a small round **half stone** (10 px, grey). Post spacing 640 / 12 ≈ 53 px. **The roll is geometrically honest by construction** (critic fix — the first draft claimed the 640 px road equals the numeral ring's circumference, but a 290 px face's numeral ring is ≈ 740 px round): the road rolls into a ring of radius R = road length ÷ 2π (≈ 102 px at 704, ≈ 53 px at 360), concentric with the dial, post k at angle 30k°, so each post settles on its own numeral's ray. The marker then slides along its ray to the short hand's tip radius (55 % of the dial radius: 80 px at 704, 65 px at 360) — inward at 704, outward at 360; the ray, not the radius, carries the answer.
- **Sprocket**: library farm-animals/rooster, 96 px (64 px at 360), standing on top of the clock all round — never shrunk, never on the road.
- **The marker** (drawn apparatus, per PICTURE-RULINGS: a moving marker is a drawn token, never a shrunken picture): a coral (#F2784B) disc 26 px (20 px at 360) with a 3 px ink ring and a small three-scallop comb notch on top, standing on a short peg on the road; its peg tip is the position. Its drag handle is a 44 px invisible circle.
- **The cards** (right of the clock at 704, in a column): three flip-clock cards 180 × 84 (digits 40 px; hour cream-coral, minutes teal-light, like row 102 for consistency across the two rows).
- Task line above (≤ 24 px, ≤ 2 lines); bubble under the road.

At 360 (stage ≈ 336): clock 236 px; cards in one row of three 104 × 60 (digits 28 px) between the clock and the road; road 336 × 56 with post spacing 28 px, post signs 12 px digits (they are the dial's numerals, repeated; legibility is helped by their order); the marker 20 px (drag handle 44 px); Sprocket 64 px on top of the clock. Stage ≈ 236 + 10 + 60 + 10 + 56 = 372 px; with header, task line, bubble and Check above the 360 × 740 and 320 × 640 folds (at 320: clock 214, road spacing 25 px, marker 18 px).

Library pictures (checked in `mini tools/pictures/farm-animals.json`, seen on the contact sheet 2026-10-17): farm-animals/rooster. Clock, road, posts, stones, cards, the marker token are drawn apparatus; the numerals are content.

Task line (EN): "Read both hands. Tap the matching digital time."

## 5. The hand
- **Tap a card** → it lifts and is outlined (80 ms). Tapping another moves the choice. **Check** (shell) starts the walk.
- **The walk and the roll** (on Check, ≈ 2.6 s):
  1. Sprocket flaps once, his marker pops onto the road's first post (12) and **walks** to the card's time — past each post with a little step bounce (120 ms per half segment, a soft footstep), stopping on a post (o'clock) or a half stone (half past) (≤ 1.2 s).
  2. The road **rolls up** (900 ms): it lifts off the ground, bends into a ring of the same length and settles concentric with the dial, each post on its numeral's ray; the marker rides on it.
  3. The marker **slides along its ray** to the short hand's tip radius (300 ms). If it lands on the tip cap → right (§7). If not → it stands beside the short hand, a dashed coral arc joining it to the tip (§7).
  4. The road unrolls back under the clock (600 ms).
- **Free play — drag the marker along the road** (any time; between rounds the clock is not the question): the hands follow continuously (short: 30° per segment; long: 360° per segment — it whirls), the minutes collar under the long hand lights when it passes 12 or 6, and the card slot on the right shows the digital time of its position when it rests on a post or stone. Releasing between a post and a stone snaps it to the nearest half stone or post. At a new round the clock returns to the round's time (the marker hops back to Sprocket on top of the clock).
- Optional TTS: tap a card's speaker corner → the time in words.

## 6. The rounds
One round = the clock at a time, three cards (one right). Every round's three cards are: **the right time**, **the same hour with the other minutes** (the long-hand error), and **a half hour on the other side** (o'clock targets: half past the hour **before**; half-past targets: half past the hour **after** — the next-number error).

**Level "o'clock and half past" (default) — 10 rounds** (the nine old targets kept + 12:30)
| # | clock | cards | where the marker lands for each wrong card |
|---|---|---|---|
| R1 | 3:30 | 3:30 · 3:00 · 4:30 | on the 3 (half a segment short) · half way 4–5 (one segment too far) |
| R2 | 6:00 | 6:00 · 6:30 · 5:30 | half way 6–7 (half too far) · half way 5–6 (half short) |
| R3 | 9:30 | 9:30 · 9:00 · 10:30 | on the 9 · half way 10–11 |
| R4 | 1:00 | 1:00 · 1:30 · 12:30 | half way 1–2 · half way 12–1 |
| R5 | 11:30 | 11:30 · 11:00 · 12:30 | on the 11 · half way 12–1 |
| R6 | 5:00 | 5:00 · 5:30 · 4:30 | half way 5–6 · half way 4–5 |
| R7 | 8:30 | 8:30 · 8:00 · 9:30 | on the 8 · half way 9–10 |
| R8 | 2:00 | 2:00 · 2:30 · 1:30 | half way 2–3 · half way 1–2 |
| R9 | 7:30 | 7:30 · 7:00 · 8:30 | on the 7 · half way 8–9 |
| R10 | 12:30 | 12:30 · 12:00 · 1:30 | on the 12 · half way 1–2 (the road wraps: 12:30 is at the start of the road, between the first 12 post and the 1) |
Balance (critic count): 6 half-past targets (R1, R3, R5, R7, R9, R10) and 4 o'clock targets — half past is this row's job; row 102 carries o'clock; every hour 1–12 appears at most twice across the round set's cards' hours as right answers.

**Level "Half past only" (setting; G1-149 "Half past what?") — 9 rounds**: every target is half past: 4:30 (cards 4:30 · 4:00 · 5:30), 10:30 (10:30 · 10:00 · 11:30), 2:30 (2:30 · 2:00 · 3:30), 6:30 (6:30 · 6:00 · 7:30), 12:30 (12:30 · 12:00 · 1:30), 1:30 (1:30 · 1:00 · 2:30), 9:30 (9:30 · 9:00 · 10:30), 5:30 (5:30 · 5:00 · 6:30), 11:30 (11:30 · 11:00 · 12:30). In this level the task focuses on the short hand: the long hand is always on 6, so the only question is **which hour** — the next-number error appears in every round.

- **Answer position**: cards reshuffled at every showing; gated over 300 showings per level: right card in each position 30–37 %, ≤ 2 rounds running in the same position; the "next-number" card is to the right of the right card in 40–60 %.
- **Order**: order-only reshuffle per pass (`nextTask`), never the same order twice in a row; o'clock and half past alternate at most two in a row in the default level.

## 7. Check, the misses, the success
- **Check with no card** → the long hand wiggles, then the short hand's tip cap pulses; bubble "Look where the long hand points, and where the short hand points. Then tap a card." (no miss)
- **Miss 1** → the walk and roll happen; the marker stops beside the short hand, and a **dashed coral arc** along the rim joins him to the tip cap: half a segment long (long-hand error) or a whole segment long (next-number error). The long hand glows if its collar does not match the card's minutes (:00 vs :30). Bubble — long-hand error: "The long hand is on the {6|12}, so it is {:30|:00}." · next-number error: "The marker went one hour too far. The short hand has only passed the {h}." · half-short error: "The marker stopped half an hour too soon. Look at the long hand."
- **Miss 2** → the road stays rolled around the dial, and **the marker walks round its ring from the 12 post to the short hand's tip**, one half stone at a time, while the long hand turns one lap per post with it (no painted sweep); each post it passes flashes, and the half stone (or post) it stops on glows; a ghost card with the time builds on the right in faint digits (the right card in the column does not glow). Bubble: "Watch: the short hand has passed the {h}, and the long hand is on the {12|6}."
- A new tap takes the arc and the ghost away until the next Check.
- **Success** → the marker lands on the tip cap, which glows; Sprocket crows (hop + flap + a short crow); then **half an hour runs**: the long hand turns half a lap, the short hand creeps half the way on, and the marker rides the same half segment; then everything returns. Bubble: o'clock "{h}:00 — {h} o'clock!" · half past "{h}:30 — half past {h}!" (EN; per-locale idiom below).

## 8. Settings
1. **Times**: "o'clock and half past" / "Half past only" — at rest: the cards change (all :30 in Half past only) and the road's half stones are drawn larger (14 px) to draw the eye.
2. **Road**: "Always shown" / "Only to check" — "Only to check" hides the road at rest (it appears only on Check, rising from under the clock), so the child must read the clock without the flattened rim to lean on. At rest the board visibly loses the road.

## 9. Words (EN source)
- title (on-screen): "Sprocket's Clock" (frozen per locale as shipped; da/no/fi authored new)
- instruction: "Read both hands: the long hand on 12 means o'clock, on 6 means half past. The short hand shows the hour it has passed. Tap the digital time — Sprocket's marker will walk the road to check."
- task line: "Read both hands. Tap the matching digital time."
- hints: "Look where the long hand points, and where the short hand points. Then tap a card." · "The long hand is on the 6, so it is :30." · "The long hand is on the 12, so it is :00." · "The marker went one hour too far. The short hand has only passed the {h}." · "The marker stopped half an hour too soon. Look at the long hand." · "Watch: the short hand has passed the {h}, and the long hand is on the {12|6}."
- celebrations: "{h}:00 — {h} o'clock!" · "{h}:30 — half past {h}!"
- settings: "Times" — "o'clock and half past" / "Half past only" · "Road" — "Always shown" / "Only to check"
- aria: clock "Clock: long hand at {12|6}; short hand {at h | half way between h and h+1}"; road "The clock's numbers as a road"; marker "Sprocket's marker at {h}:{mm}"; card "{h}:{mm}".

Locale traps:
- **"Half past" names the NEXT hour in de, nl, sv, da, no, fi** ("halb vier", "half vier", "halv fyra", "halv fire", "halv fire", "puoli neljä" = 3:30). This is the exact place the design is strongest: the road shows 3:30 as "half way from post 3 to post 4" — true for "half past three" AND for "half (way to) four". But every **sentence** must respect the locale idiom, so:
  - celebrations and aria use a per-locale per-hour lookup (12 × 2 strings) authored by hand, never "{h+1}" in a template; 12:30 → "halb eins / half een / halv ett / halv et / halv ett / puoli yksi";
  - the hints **never** use the "half past {h}" idiom; they speak only about hands and numbers ("the short hand has passed the 3"), which is true in every language;
  - fr "trois heures et demie", es "las tres y media", pt "três e meia", it "le tre e mezza" (1 → "l'una e mezza", es "la una y media").
- **o'clock**: de "{h} Uhr", fr "{h} heures" (1 → "une heure"), es "las {h} en punto" (1 → "la una en punto"), pt "{h} horas" (1 → "uma hora"), it "le {h}" (1 → "l'una"), nl "{h} uur", sv "klockan {h}", da "klokken {h}", no "klokka {h}", fi "kello {h}".
- **Digital format**: cards are clock displays with a colon in every locale; celebrations write digital time as each locale writes it in text (da/no/fi/sv may use "3.30") — authored.
- **12-hour**: the cards stay 12-hour; nothing says morning/afternoon (see row 102).
- **The road's posts** are digits only — no words.

## 10. Sound off, access, phones
- Legible with the sound off: the marker's walk, the rolling road, landing on or beside the tip, the coral arc measuring the error, the half lap. The crow and footsteps are decoration.
- Keyboard: Tab through cards (Enter chooses), Enter on Check; in free play Tab to the marker, arrow keys move it half a segment at a time (the hands follow). Focus ring 3 px #146B5E.
- aria-live polite announces the landing ("The marker landed on the short hand" / "one hour too far").
- Taps ≥ 44 px (cards 104 × 60 on phones; the marker's drag handle 44 px around a 20 px token).
- prefers-reduced-motion: the road does not roll — a dotted line joins the card's road spot to its rim spot, and the marker appears there; the half lap is a jump.

## 11. Distinct from
- **Row 102 The Digits That Ride the Hands** (same batch): the card's parts travel along the hands; here the card's whole time becomes a place on the rim unrolled into a road, tested against the short hand — built for the half-past "between two numbers" problem.
- **`learning-clock` tool** (drag the geared hands; spoken time with an arc that shows why): no hand dragging here, no painted arc or wedge anywhere (the critic removed the first draft's "teal half-moon" sweep, the learning clock's arc in another colour); the free play drives the clock from a marker on the road, the clock's own rim laid flat.
- **`open-number-line`, `number-line` tools**: a number line of numbers; here the line IS the clock rim (it rolls up), and its marks are hours and half hours.
- **E10 "Set the Clock"** activities: radial drag to set; here only reading.
- Registry: no built or designed activity unrolls a dial into a line and rolls it back to check.

## 12. Build plan
- **Core state**: `{target:{h,m}, cards:[{h,m}×3], chosen:null|i, level:'mixed'|'half', road:'shown'|'check', misses, sprocketAt:null|t}` where t = road position in half-segments, 0 (12:00) … 24 (12:00 again).
- **Functions**: `roadPos({h,m})` → t = 2·(h mod 12) + m/30 · `shortAngle(t)` = 15·t degrees · `longAngle(t)` = 180·(t mod 2) degrees · `landing(card)` → `{t, diff: t − roadPos(target)}` (diff 0 = right; ±1 = half segment; ±2 = whole segment; wrap-aware) · `errorKind(card)` → 'minutes' | 'nextHour' | 'halfShort' · `check()` · `freeDrag(t)` (snaps to integers) · `nextTask` with card shuffle.
- **Gate's own ground truth** (`verify-hour-road-core.js`): round tables typed literally; the gate computes t, angles and landings itself and asserts: (1) exactly one card per round has diff 0; (2) every wrong card's diff equals the table's ("half short", "one segment too far", etc.) and its error kind; (3) the rolled ring's circumference equals the road's length (± 1 px, measured from the rendered geometry) and post k lands on numeral k's ray (± 1°) — the roll is honest; (4) the short hand at :30 is exactly half way (15·t); (5) position balance over 300 showings; (6) every de/nl/sv/da/no/fi half-past string in the locale tables names h+1 with 12 → 1 (literal table in the gate); (7) no hint string contains a half-past idiom (hints are hands-and-numbers only).
- **Mutations** (one per rule): roadPos ignores minutes · short hand jumps (angle 30h at :30) · landing compares with the long hand · a round with two diff-0 cards · next-hour distractor replaced by the same card · rolled ring length ≠ road length, or post k off numeral k's ray · card shuffle off · ghost card built from the chosen card · free drag moves the round's target · de half past uses h.
- **Pictures**: farm-animals/rooster at 96 / 64 px on top of the clock only (seen on the contact sheet: red comb, dark sickle tail, faces left). The road marker is drawn apparatus (PICTURE-RULINGS: a moving marker is a drawn token).
- **Risks**: the roll is the heart and the hardest animation — it is a single SVG path morph from a line to a circle of equal length (arc length preserved), easy to verify by measuring; 28 px post spacing on a phone road is narrow but the road is never tapped (only Sprocket is dragged, with a 44 px handle).
- **BLOCKED**: nothing.

## 13. The four questions (answered, honestly)
1. **Would a 5–8-year-old choose it again?** Yes — a rooster walking a road made of the clock's numbers, a road that curls up into a ring, a crow when he lands on the hand, and free play that whirls the long hand.
2. **Would a teacher put it on the board?** Yes — it makes "half past" visible as half way between two numbers on the rim, shows the next-number error as exactly one hour too far, and survives the "halb vier" languages because the road is true in every idiom.
3. **Would a parent trust it?** Yes — a calm real clock, a library rooster, no timer, nothing sold.
4. **The invention in one sentence:** the clock's rim is unrolled into a road of hour posts and half stones; a tapped time is a spot on the road, and rolling the road back around the clock checks whether that spot lands on the tip of the short hand.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 3→5 · reality 3→5
What changed:
- Per PICTURE-RULINGS, Sprocket no longer shrinks to a 44 px "exception" on the road: the road carries a drawn coral marker token; Sprocket stays full size (96 / 64 px) on top of the clock, follows the marker with his head, and crows on success.
- The roll was not geometrically possible as written (a 640 px road cannot have a 290 px dial's numeral-ring circumference, about 740 px). Now: the road rolls into a ring of its own length (R = L/2π), post k on numeral k's ray, and the marker slides along its ray to the short hand's tip — honest, and gateable by measurement.
- Removed the painted "teal half-moon" sweep (it copied the premium learning-clock's arc and row 104's swept slice); half an hour is shown by the half lap and the marker's half segment only.
- Balance claim corrected (6 half past / 4 o'clock). Clock idioms checked per locale: de/nl/sv/da/no/fi half = toward the next hour (halb vier = 3:30; 12:30 → halb eins / half een / halv ett / halv et / halv ett / puoli yksi), es/pt/fr/it current hour + half — correct as written, and no hint uses the idiom.
