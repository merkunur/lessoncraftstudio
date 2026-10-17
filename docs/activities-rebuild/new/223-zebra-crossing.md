# New 223 — The Looking Kerb (Health & Safety · road safety, grade K)

## 0. Identity
- id `zebra-crossing.play.road-safety` · grade K · framework: health & safety (`alignment.framework` from `frontend/lib/frameworks.ts`), strand **Health & Safety** · files `mini tools/zebra-crossing-core.js`, `zebra-crossing-activity.js`, `zebra-crossing-activity.html`, `zebra-crossing-activities.json` (scaffold: `node scripts/new-activity.js --num=223`).
- worksheets it covers: **K-369** Read the Traffic Light · **K-373** Color the Traffic Lights · **K-374** Crossing the Road Safely: the Steps · **G1-384** Traffic Signs and Their Meanings (geometric signs; pictogram signs BLOCKED, §12) · **G2-360** Kinds of Traffic Signs (the Sign Sieve) · **G2-361** Which Sign Fits? (geometric signs; pictograms BLOCKED).
- merged in: grade-1 "The Street Corner" (an empty sign post; the placed sign plays out in the scene) and grade-2 "The Sign Sieve" (the hole is the rule) — both are Level 4.

## 1. The pitch
"You can only see the cars on the side you look at — and the kerb will not let go of your animal until it has looked both ways and its own little light is green."

## 2. Why a child will want it again (the fun)
- **The look is a torch.** Both ends of the road are dim, like the wings of a stage. Tap a look arrow and the animal turns its head; a soft wedge of light sweeps out over that half of the road (250 ms) and whatever is coming — a bus, a van, a bicycle — is suddenly *there*. Children turn the head back and forth just to watch the light sweep; that fiddling IS the habit being taught.
- **The kerb is sticky.** Drag the animal off too soon and its feet stay glued to the kerb: a thin elastic band stretches from its feet to the kerb edge, the animal leans out, and it springs back with a wobble. Funny, never scary. Nothing ever touches a car.
- **The crossing is a little show.** When it is safe the walker trots across the stripes — one step per white stripe, each stripe plays the next note of a rising xylophone run — the waiting cars blink their headlights once, and on the far pavement the round's goal is waiting (the hen crosses to her chick, the foal to the horse, the goat to the playground).
- **Every round is a little different**: a new animal, a different number of cars before the green, and sometimes a late bicycle finishing its pass that only a looking child sees.
- No timer, score, streak or lives. Waiting is free and calm; cars pass at one slow constant speed.

## 3. The skill and the misconception
- **Skill (K-369/373/374):** stop at the kerb; look left, look right; read the *walker's* light, not the cars' light; wait for green (or, at a zebra without lights, for the road to be clear); cross on the stripes.
- **Misconception 1 — "green means go, no need to look."** The kerb only releases if both looks happened *after* the walker light turned green. In four of the nine light rounds a bicycle is still finishing its pass at the moment green comes; it is inside the dim zone, visible only to a look. The light said green, but the road was not empty yet — and the child saw it with their own look.
- **Misconception 2 — "the car light is my light."** Both lights stand on the street: the three-lamp car light on the near pavement is drawn turned toward the oncoming traffic; the two-lamp walker light stands square-on across the road and carries the round animal's own silhouette inside its lamps. A child who tries to go when the car light is green sees the cars keep rolling and the kerb hold.
- **Misconception 3 — "I looked once, so it is safe."** A look lasts: the lit wedge fades back to dim 3 s after the head turns away. A look done while waiting on red has gone stale by the time green comes; the dim edges say so.
- **Misconception 4 (signs) — "a sign is just a picture to remember."** In the Sign Sieve only shape and colour pass through a hole, so the kind of sign is a physical property, not a memory item.

## 4. The stage
Side-on street, read bottom (here) to top (there). All street parts are apparatus geometry in the shell palette with 2–3 px ink outlines; vehicles, walkers and goals are library pictures.

**At 704 px** (stage 704 × 520; full width; the hint bubble sits under the street):
- **Near pavement** (bottom band 704 × 96), pale stone; the **kerb line** is a 6 px darker edge. The walker stands on it, **128 px tall**, centred at x = 352.
- **Look arrows**: two 56 × 56 round buttons left and right of the walker (centres x = 248 and 456), drawn chevrons ‹ ›. No words.
- **Road** (704 × 232), two lanes of 116 px: **near lane** traffic moves left→right (it comes from the walker's LEFT — right-hand traffic), **far lane** right→left. Vehicles **104 px wide**. Zebra stripes: six white bars 88 × 26 across both lanes at the centre; a 4 px stop line across each lane 40 px before the stripes on the approach side.
- **The dim edges**: each end of the road (x < 200 and x > 504) lies under a 55 % veil (`rgba(42,42,53,.55)`), so an approaching vehicle is a dark shape only. A look lifts the veil on that side with a wedge reveal whose apex is the walker's head (250 ms ease-out).
- **Car light** on the near pavement at x = 96: post 120 px, head 44 × 120, three 32 px lamps (red/amber/green, top to bottom), the head turned to face the oncoming near-lane traffic. **Walker light** on the far pavement at x = 560: head 52 × 96, two 40 px lamps (red top, green bottom). Inside each walker lamp sits the **silhouette of this round's walker** (the same library picture rendered `filter: brightness(0) invert(1)` at 70 % opacity) — "this light is for you" with no words and no drawn figure. Unlit lamps are dark grey glass.
- **Far pavement** (top band 704 × 96) with the round's **goal picture** (96 px) at x = 600.
- **Task line** above the stage (≤ 24 px, ≤ 2 lines) — §9. **Hint bubble** under the street, ≤ 2 lines.

**At 360 px** (stage 360 × 470): pavements 72 px, lanes 2 × 96, walker **88 px**, vehicles **76 px** wide, look arrows 48 px at the walker's sides, lights scaled 0.7 (walker-light lamps 30 px; the silhouette stays legible), dim edges x < 96 and x > 264. Check directly under the street: its bottom ≤ 640 px at 360 × 740 and ≤ 600 px at 320 × 640 (at 320: walker 80, vehicles 68).

No words on the apparatus. In Level 4 the only words are those printed on real signs (STOP / PARE / ALTO / YIELD), which are content.

## 5. The hand
- **Tap a look arrow** (or swipe left/right on the walker): the walker mirror-flips to face that side within 60 ms (`scaleX(-1)` for right — library walkers face left), the wedge sweeps in 250 ms, a soft "whoosh" (optional). The look's sim-time is stored. The veil returns over 600 ms, 3 s after the walker turns away.
- **Drag the walker** toward the stripes; it follows the finger within 16 ms. Release = the attempt. If the core says *safe*: the walker leaves the kerb and the crossing plays (180 ms per stripe), then trots to the goal. If *not safe*: as the finger pulls, a 2 px coral elastic stretches from the walker's feet to the kerb (max 40 px); on release the walker springs back (300 ms, slight overshoot). The walker's feet never pass the kerb line while not safe.
- **Check** (shell) = "try to cross now", identical to a release.
- **Free play** (always, counts for nothing): look arrows; tapping a waiting car makes it toot (two-note tone) and blink; tapping a lamp makes it glow once without changing state.
- **Undo:** nothing to undo — the kerb never lets a mistake happen.
- Level 2: drag a library car into one of three road zones / drag a paint pot onto a lamp. Level 3: drag step cards into boxes. Level 4: drag signs onto the post or into sieve holes. Every drop snaps within 100 ms with a 120 ms settle.

## 6. The rounds
One round = one animal crossing once (Level 1), one light read (Level 2), one ordering (Level 3), one sign situation or sieve board (Level 4).

**How the street runs (Level 1A, lights).** Round start: car light green, walker light red, cars flow in both lanes (one vehicle per 1.6 s per lane, lanes offset by 0.8 s). After **N** vehicles have passed the stripes, the car light goes amber (2 s), then red; arriving cars stop at the stop line; 1 s later the walker light turns green and stays green until the walker crosses (no countdown, no flashing). In a late-bike round a bicycle enters the dim zone of the named lane 0.5 s before green and passes the stripes 2.4 s after green.
**Safe** = walker light green ∧ a left look and a right look both with timestamp ≥ green-start ∧ no vehicle between the stop lines and the stripes, and no moving vehicle inside the visible approach of either lane.

| # | walker (library) | goal (library) | N cars before green | late bike |
|---|---|---|---|---|
| 1 | farm-animals/duck | spring/garden | 3 | — |
| 2 | farm-animals/goat | activities/playground | 1 | near lane (from the left) |
| 3 | farm-animals/goose | camping/lake | 4 | — |
| 4 | farm-animals/hen | farm-animals/chick | 2 | far lane (from the right) |
| 5 | farm-animals/donkey | camping/cabin | 5 | — |
| 6 | farm-animals/llama | summer/pool | 2 | near lane |
| 7 | farm-animals/turkey | miscellaneous/house | 3 | — |
| 8 | farm-animals/foal | farm-animals/horse | 1 | far lane |
| 9 | pets/rabbit | spring/garden | 4 | — |

**Level 1B — zebra without lights (8 rounds).** No lights; a queue of **M** vehicles at 1.6 s gaps, then a clear road. **Safe** = both looks within the last 4 s of sim time ∧ no vehicle in the road or the visible approach. (The rule children are taught in every one of the 11 countries — wait until it is clear — is the one used.)

| # | walker | M | lane of the last vehicle |
|---|---|---|---|
| 1 | pets/rabbit | 2 | far (from the right) |
| 2 | farm-animals/duck | 4 | near (from the left) |
| 3 | farm-animals/goat | 1 | far |
| 4 | farm-animals/hen | 3 | near |
| 5 | farm-animals/llama | 5 | far |
| 6 | farm-animals/goose | 2 | near |
| 7 | farm-animals/donkey | 3 | far |
| 8 | farm-animals/turkey | 4 | near |

Vehicle pool, taken in turn: near lane (mirrored, moving right) car, van, jeep, bus — **never the taxi** (its TAXI roof sign would read mirrored); far lane (unmirrored) taxi, car, van, bus, jeep. Bicycle: vehicles/bicycle (mirrored in the near lane — no text on it).

**Level 2 — read the light (K-369, K-373), 9 rounds each sub-task:**
- *Move the car (K-369):* one car-light lamp is lit (drawn rays). A library car waits at the left. Three road zones: before the stop line (stop), creeping at the line (get ready to stop), through the crossing (go). Drag the car into the zone the lamp means. Lit lamp per round: R, G, A, G, R, A, R, G, A (3 each).
- *Paint the glass (K-373):* one lamp carries rays but its glass is still grey; three paint pots (red, amber, green — drawn discs) in shuffled order. Drag a pot onto the rayed lamp. Rayed lamp per round: top, bottom, middle, middle, top, bottom, bottom, top, middle (3 each).

**Level 3 — the steps in order (K-374), 8 rounds.** Four step cards, each a frozen miniature of the real street drawn by the same code at 0.3 scale (132 × 100 px at 704): (a) the walker stopped at the kerb, (b) facing left with the left half lit, (c) facing right with the right half lit, (d) on the stripes. Four numbered boxes 1–4 (the numerals are content). The tray orders come from two 4 × 4 Latin squares (`ORDER_TRAYS`, 8 orders: `badc, adcb, dcba, cbad` then `cadb, adbc, dbca, bcad`), so each card visits each tray slot exactly twice per pass and the tray is never already in the right order (`abcd` banned; the gate asserts both).

**Level 4 — signs.** Only signs that are pure geometry, text, letters or numerals (no pictograms — §12): every sign is drawn by code from a per-locale sign table (`SIGNS[locale]`: shape, fill, rim, glyph), ≥ 96 px at 704 and ≥ 64 px at 360.

*4a — The Street Corner (G1-384 meanings, G2-361 which sign fits), 9 rounds.* An empty sign post at a corner of the same street, and a situation looping slowly (one library car, the round's walker). The tray holds three signs: the right one + two others from this table, shuffled. The placed sign *plays*: the scene acts out exactly what that sign tells a driver.

| # | situation (looping) | right sign (Vienna locales) | en (US MUTCD) | what the right sign makes the scene do |
|---|---|---|---|---|
| 1 | a car drives toward the crossing where the walker waits | STOP octagon | STOP | the car stops at the line; the walker crosses |
| 2 | a car wants to turn into the end of a one-way street | no entry (red disc, white bar) | DO NOT ENTER | the car turns away |
| 3 | cars hurry past the playground | speed limit ring "30" (pt/es "40", km/h) | SPEED LIMIT 25 | the cars slow to half speed |
| 4 | a car circles, looking for a place to stand | P (blue square) | P (blue square) | the car parks in the bay |
| 5 | a car at a fork must go only right | mandatory arrow (blue disc) | white rectangle, black arrow, ONLY | the car takes the right branch |
| 6 | a car comes out of a side road onto the main road | give way (red-rimmed inverted triangle) | YIELD | the car waits for the main-road car, then goes |
| 7 | a car wants to stop in front of the school gate | no parking (blue disc, red ring, red slash) | NO PARKING | the car drives on |
| 8 | the street only runs one way | one-way (blue square, white arrow) | ONE WAY (arrow board) | every car drives the same way |
| 9 | a car arrives at a roundabout | roundabout (blue disc, three arrows) | roundabout (circle of arrows, white rectangle) | the car goes round, counter-clockwise |

Wrong signs come from rows whose behaviour visibly differs in that situation (never two signs that would both play correctly — STOP and give way never share a tray). Right sign's tray slot: 1/2/3 exactly 3 times each over the 9 rounds.

*4b — The Sign Sieve (G2-360 kinds), 7 boards.* A board with holes cut as the locale's sign kinds — the hole is the rule: its outline AND its rim/fill colour. Six signs per board (two per kind on 3-hole boards; on 4-hole boards two kinds get two signs and two get one, rotating), dropped from the top; only a sign whose shape and colour match the hole passes through with a soft "tock" and lands in the drawer under it. Per-locale holes and members (the native panel confirms each table):
- **de fr it nl da no** (Vienna, white warning field) and **sv fi** (Vienna, yellow warning field): 4 holes — red-rimmed triangle point up (warning: "!" other danger, traffic lights ahead (three lamps), crossroads (+), bend (curved arrow)) · red ring (must not: no entry, speed 30, no parking, no U-turn) · blue disc (must do: straight arrow, turn-right arrow, roundabout, keep right) · blue square (information: P, one-way arrow, dead end (T), hospital H). The inverted give-way triangle is never in the sieve.
- **en (US)**: 3 holes — yellow diamond (warning: turn arrow, curve arrow, crossroad +, signal ahead (lamps)) · white upright rectangle (regulatory: SPEED LIMIT 25, ONE WAY, NO PARKING, keep-right arrow) · blue square (services: H, P, i).
- **pt (Brazil, CTB)** and **es (Mexico)**: 3 holes — yellow diamond (advertência / preventivas) · red ring (regulamentação; es: the red ring sits on a white square, so the es hole is a square with a ring) · blue rectangle (indicação / informativas).
Over a pass every member appears at least once; slots are shuffled per board.

**Answer position.** Level 1 has no answer position; the gate runs bots instead (§12). Level 2 lit lamp / rayed lamp balanced 3/3/3; Level 3 Latin square; Level 4 right-slot uniform.
**Order:** each pass reshuffles the round order (order-only; never the same order twice in a row — `nextTask` pattern, §A.13.60).

## 7. Check, the misses, the success
- **Check with nothing done** (walker never touched, no look yet): hint, no miss — "Your animal is waiting at the kerb. Which way will it look first?" and both look arrows pulse once.
- **Miss 1** (release/Check when not safe). The apparatus shows ONE reason, in this priority:
  1. *walker light red* → its red lamp pulses twice while the near-lane traffic keeps rolling · "The little light with your animal in it is still red."
  2. *reading the car light* (attempt while the car light is green) → the car light's green lamp pulses and a car rolls through the crossing · "That light is for the cars. Your light is across the road."
  3. *a side not looked at since green, or a stale look* → that side's veil lifts on its own for 2 s and shows what is there (the late bike, or an empty road) · "Look left and look right — after your light turns green."
  4. *a vehicle still on the road* → a soft ring circles it · "Wait until the road is clear."
- **Miss 2** (the same reason again): the missing piece glows steadily until it is used — the un-looked arrow, a ring around the walker lamp, or a dashed path from the moving vehicle to the stripes · the same hint plus "Watch the glowing part."
- **A new move takes the help away** (any look or drag clears the glows) until the next attempt.
- **Success:** the crossing show (§2) · "Stopped, looked left, looked right — and crossed on green!" (1B: "Stopped, looked both ways — and crossed when the road was clear!")
- **Level 2.** Empty Check: "Drag the car onto the road." / "Drag a paint pot onto the light." Wrong zone → the car rolls into it, the lit lamp's rays pulse, the car rolls back · "Look at the lamp that is on. What does it tell the car?" Miss 2: the matching zone gets an outline in the lamp's colour. Wrong pot → the paint beads off the glass and drips back into its pot (each glass glows only its own colour) · "Which colour lives in that place on the light?" Miss 2: all three lamp places show faint coloured rims. Success: the street plays the light (cars stop / slow / go) · "Red: stop. Amber: get ready to stop. Green: go."
- **Level 3.** Empty Check: "Drag a card into box 1." Check → the big street performs the cards in the child's order; at the first card out of place the walker tries it and the kerb holds · "Your animal tried that too early." Miss 2: a ring on the first wrong box. Success: the whole crossing plays in order · "Stop, look left, look right, cross!"
- **Level 4a.** Empty Check: "Drag a sign onto the post." Wrong sign on the post → the scene *plays that sign* for 2 s (the speed sign makes the car slow but still roll on toward the crossing; P sends it looking for a bay that is not there) and then pauses with the car and the walker facing each other (car stopped mid-road, walker frozen on the kerb — never a collision), and the sign wobbles off · "Watch what that sign made the car do. What should the car do here?" Miss 2: the situation loop replays slowly with the car's needed path dashed (stopping short of the line, turning away, slowing) · "Watch the dashed path. Which sign tells the car to do that?" Success: the scene plays the sign · "The {sign} told the car what to do!"
- **Level 4b.** A sign that does not fit cannot pass — it rests on the hole's edge, its mismatching part glows (the outline when the shape is wrong, the rim when the colour is wrong) and it slides back to the top; a bounce is not a miss. Check with signs still on the board · "Some signs are still waiting." Success: the drawers slide out, each kind together · "Every sign found its own hole."

## 8. Settings
1. **Mode:** Cross with lights · Cross at a zebra · Read the light · Steps in order · Signs on the street · Sign sieve. Each visibly changes the board at rest (lights present/absent; one big light; four cards; a sign post; a sieve board).
2. **Lights** (cross modes): walker light + car light (default) · car light only (the walker crosses on a red car light — for classes practising K-369 on the street). Visible at rest: the walker light is gone.

## 9. Words (EN source; the build authors the other 10 by hand, then one native + pedagogy reviewer)
- title: **The Looking Kerb**
- instruction: "Look both ways and help your animal cross the road safely."
- task lines: L1A "Look left and right. Cross when your light is green." · L1B "Look left and right. Cross when the road is clear." · L2a "Move the car to show what the light says." · L2b "Paint the lamp that is shining." · L3 "Put the crossing steps in order." · L4a "Put up the sign that helps here." · L4b "Drop each sign through the hole it fits."
- hints and celebrations: exactly as in §7.
- settings labels: "Mode", "Cross with lights", "Cross at a zebra", "Read the light", "Steps in order", "Signs on the street", "Sign sieve", "Lights", "Walker light and car light", "Car light only".
- L4 sign names for {sign} (aria + celebration): "stop sign", "no-entry sign", "speed sign", "parking sign", "arrow sign", "give-way sign", "no-parking sign", "one-way sign", "roundabout sign" (en: "yield sign", "do-not-enter sign").
- aria: "Look left", "Look right", "{animal} waiting at the kerb", "Car light: {colour} is on", "Walker light: {colour} is on", "Step card {n} of 4".

**Locale traps, each with how the design survives:**
- **Traffic side.** All 11 locales' countries drive on the right (US, DE, FR, MX, BR, IT, NL, SE, DK, NO, FI), so the near traffic comes from the LEFT and "look left first" is right everywhere. Lane direction is data (`TRAFFIC: 'right'`), so an en-GB/en-AU later just flips it.
- **Amber.** de, nl, sv, da, no, fi show red+amber together before green; US/BR/FR/MX/IT do not. Level 2 uses only single-lamp states and calls amber "get ready to stop", true in all 11. Red+amber is never shown.
- **Walker signals.** Some countries flash the green figure or show countdowns; the design shows steady red/green only. The silhouette is the round's animal, so no national pedestrian figure is imitated or misdrawn.
- **Signs are per-locale data (Level 4; tables in §6).** Vienna-convention locales (de fr it nl sv da no fi): warning = red-rimmed triangle (white field; **sv and fi yellow field** — the no panel confirms its own), prohibition = red ring, mandatory = blue disc, information = blue square; the octagon reads **STOP** in all eight; speed 30 (km/h). **en is US (MUTCD), not Vienna**: warning = yellow diamond, regulatory = white rectangle ("SPEED LIMIT 25", ONE WAY, NO PARKING), YIELD and DO NOT ENTER carry their words. **pt is Brazil (CTB): the octagon reads PARE**, warnings are yellow diamonds, regulations red rings, speed "40 km/h". **es is Mexico: ALTO** on the octagon, warnings yellow diamonds, restrictions a red ring on a white square, speed in km/h. Roundabouts run counter-clockwise in all 11. Each locale's native panel confirms its sieve holes and members.
- **Step wording** (look left, look right — some countries teach "left, right, left again"): written by each panel; the apparatus needs no words.
- **Sound off:** everything is visible (veils, lamps, silhouettes, elastic). TTS only reads hint lines.

## 10. Sound off, access, phones
- Legible silently: lamps lit/unlit, the walker's silhouette in its own lamp, veils, the elastic band.
- Keyboard: ← / → look left/right; Space or Enter = try to cross; Tab cycles controls; Levels 2–4: Tab to an item, Enter picks it up, arrows choose a target, Enter drops.
- aria-live announces lamp changes ("Your light is green now") and what a look reveals ("A bicycle is coming from the left").
- Taps: look arrows 56 px (48 at 360); walker drag target 128/88 px; pots, cards and signs ≥ 64 px at 360.
- Pictures ≥ 96 px at 704 (walker 128, vehicles 104 wide, goal 96); ≥ 64 px at 360 (walker 88, vehicles 76, goal 64).
- Phone: same street scaled; hint bubble one line under Check; Level 3 tray wraps to 2 × 2 above the boxes.

## 11. Distinct from
- **Built #1–#22**: no look-reveal, no holding kerb anywhere in the registry.
- **#284 Crossing Lights** (grid coordinates) — only the name rhymes; **#239 Weather Window**, **#241 Bin Windows** — different subjects.
- **Premium arrow-strip** plans a route with cards and runs it; here the child moves the walker by hand and safety is enforced physically by the kerb. No tool reveals by looking.
- Within this batch: no other design uses a sim, a reveal or a hold.

## 12. Build plan
- **Core state** `{level, roundSpec, t, lights:{car:'G'|'A'|'R', walker:'R'|'G', greenAt}, lanes:[{dir:+1, vehicles:[{kind,x}]}, {dir:-1, …}], looks:{L, R}, facing, help}`; the street advances only through a deterministic fixed-step `tick(dt)` (no wall clock in the core). Functions: `newRound(spec)`, `tick(dt)`, `look(side)`, `isSafe()`, `attempt()` → `{ok, reason:'red'|'carlight'|'look-L'|'look-R'|'traffic'}`, `placeCar(zone)`, `paint(pot)`, `checkOrder(boxes)`, `placeSign(sign, target)`.
- **The gate's own ground truth** (`verify-zebra-crossing-core.js`): its own timetable simulator computes each round's safe interval from the table; six bots play every round — *never-look*, *look-left-only*, *look-right-only*, *look-on-red-then-wait*, *go-the-moment-green-with-looks*, *look-both-and-go-when-clear*. Only the last succeeds 17/17; *go-the-moment-green-with-looks* fails exactly the late-bike rounds {2, 4, 6, 8}; *look-on-red-then-wait* fails every lights round (stale looks). Reason priority asserted per constructed state. L2 3/3/3, L3 Latin + no identity, L4 slot uniformity. Every picture path exists on disk and is a colour theme; the near lane never holds `taxi`; the walker never passes the kerb line while not safe (asserted every tick).
- **Mutations (one per rule):** release on red · accept car-light green · accept a look older than green · accept one side only · looks never go stale · drop the late bike · taxi allowed in the near lane · lanes swapped · any paint on any lamp · amber zone = go · identity tray allowed · tray not Latin · sieve passes by shape only (red ring and blue disc both pass the ring hole) · sieve passes by colour only · two correct signs in one 4a tray · sign right-slot always 1 · en sieve given Vienna holes · reason priority reversed.
- **Gate for L4:** the gate's own sign table per locale (written in the gate) — every 4a tray has exactly one sign whose behaviour solves the situation; every 4b sign passes exactly one hole of its locale; no pictogram glyph anywhere.
- **Pictures seen on contact sheets (2026-10-17):** farm-animals duck, goat, goose, hen, donkey, llama, turkey, foal, chick, horse and pets/rabbit are side profiles facing left (good for the flip); vehicles are 3/4 views facing left; taxi carries a TAXI sign (near-lane ban); mail_truck and police_car carry text and are excluded. Verify on sheets at build: spring/garden, activities/playground, camping/lake + cabin, summer/pool, miscellaneous/house.
- **Risks:** fixed-step determinism across frame rates; the elastic invariant; the silhouette filter must keep a recognisable outline at 30 px (check llama and turkey on the 360 render).
- **BLOCKED (exact art + fallback):** road-sign **pictograms** — pedestrian crossing, children / school zone (US school pentagon), cyclist, animals crossing, roadworks — and national **pedestrian-signal figures** (red standing / green walking). Shipped fallback: the walker light carries the round animal's library silhouette; Level 4 uses only geometric/text/numeral signs (STOP·PARE·ALTO, give way·YIELD, no entry·DO NOT ENTER, speed 30·25·40 km/h, arrow, P) — G2-360 fully, G1-384 and G2-361 partially. Add the pictogram set to `new/ART-NEEDS.md`; when it exists, Level 4 gains pictogram rounds with no mechanic change.

## 13a. Coverage check
K-369 → L2a (9) · K-373 → L2b (9) · K-374 → L3 (8) · G1-384 → L4a meanings (9 geometric/text signs; pictogram signs BLOCKED) · G2-360 → L4b kinds (7 boards; every locale's kind set is drawable without pictograms) · G2-361 → L4a "which sign fits" (one situation, three signs) · merged Street Corner → L4a · merged Sign Sieve → L4b.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — the head-turn torch and the sticky kerb are toys in themselves, and a new animal crosses each round toward its own goal.
2. **Would a teacher put it on the board?** Yes — the class shouts "look left!" and watches the wedge sweep; the late bike shows "even on green, look" without any danger ever being shown.
3. **Would a parent trust it?** Yes — no collision ever, a calm pace, real library animals and vehicles, and the right traffic side and signs for their own country.
4. **The invention:** the look is a light — you can only see the cars on the side you look at — and the kerb holds your animal until it is truly safe.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Level 4 was 9 vague rounds with a sieve of 4 and "three sign kinds" that could not be drawn: a Vienna warning triangle or a US warning diamond has no member without a pictogram, and es/pt (Mexico/Brazil) use yellow DIAMONDS for warnings, not triangles. Split into **4a The Street Corner** (9 exact situations, each with the right sign per Vienna / US / BR / MX and what the scene does when it is placed) and **4b The Sign Sieve** (7 boards; per-locale hole sets whose every member is pure geometry — "!", lamps-ahead, crossroads, bend arrow, red rings, blue discs, P, H, one-way, dead end; US diamond/rectangle/blue square; BR/MX diamond/ring/rectangle).
- The hole now checks shape AND colour (red ring vs blue disc are both circles) and shows which property failed; a wrong 4a sign now PLAYS its own meaning before the pause, so the miss shows rather than tells; miss-2 EN text written.
- Mode setting split into "Signs on the street" / "Sign sieve"; sign names for {sign}; L4 gate + 3 new mutations (shape-only sieve, two correct signs in one tray, en given Vienna holes); a coverage table (§13a).
- Pictures verified: every walker, goal and vehicle exists in the theme JSONs; vehicles and farm animals seen on the contact sheets (walkers face left, vehicles 3/4 left; taxi/police_car/mail_truck/school_bus carry printed text — near-lane taxi ban kept).
