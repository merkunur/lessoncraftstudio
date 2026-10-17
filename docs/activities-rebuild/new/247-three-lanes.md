# New 247 — The Three Lanes → THE ENGINES THAT ONLY START IN THEIR OWN WORLD (transportation; things that fly)

## 0. Identity
- id `three-lanes.play.transportation` · grade K · framework SOCIAL-STUDIES (transportation; the fly mode is K science readiness; `alignment.framework` from `frontend/lib/frameworks.ts`) · strand Social Studies · files `three-lanes-core.js`, `three-lanes-activity.js`, `three-lanes-activity.html`, `three-lanes-activities.json` (scaffold `--num=247`).
- Worksheets covered: **K-210 "Land, Water, and Air Transportation"** (draw a line from each vehicle to where it travels) = Lanes mode, built on the K-210 bank `data/science/transportation-land-water-air.json`; **K-206 "Things That Fly"** (draw a line from each picture to its group) = Fly mode, built on `data/science/can-fly-vs-cannot.json`.
- New instrument (no old activity).

## 1. The pitch
"Park every vehicle in the sky, on the sea or on the road, then press Go: all the engines start together — the ones in their own world drive, sail or fly away to the finish, and a car on the sea just splashes and bobs back to the garage."

## 2. Why a child will want it again
- **"Go!" is a show.** One button, and the whole stage comes alive at once: a bus rolls off, a sailboat leans into the wind, a helicopter's rotor blurs and it lifts away, the submarine DIVES under the waterline, the rocket shoots out of the top of the sky with a dotted trail. Wrong ones fail in funny, honest ways: a car on the sea drives forward, splashes, sinks to its windows and bobs back; a boat on the road tips and scrapes in a puff of dust; a train in the sky spins its wheels and floats gently down. Then they trundle home to the garage to be tried again.
- **The finish line fills up.** Every vehicle that arrives parks at the right end of its lane, so across a round the lanes become a little picture graph of land, water and air.
- **The wind (Fly mode)** is a big swoosh across the meadow: everything that can fly lifts off and circles; everything that cannot fly stays put — the penguin flaps hard and stays on the ground.

## 3. The skill and the misconception
- **Skill:** sort vehicles by where they travel — land, water, air; tell which things can fly.
- **Misconceptions and how the lanes push back:**
  1. *"Anything with wings flies"* (penguin, ostrich) and *"only birds fly"* (bat, ladybug, bee). The wind is the test for everything at once: the penguin flaps and stays down; the bat lifts off.
  2. *"Geese and swans swim, so they don't fly."* They swim in the picture books — but in the wind they rise and fly. (Tricky rounds. The duck is NOT used: every duck picture in the library — things-that-fly/duck, birds-2/duck, farm-animals/duck — is a yellow duckling, which honestly cannot fly yet, so "the duck flies" would be a lie about the picture.)
  3. *"A submarine is a boat that sinks / a rocket is a plane."* The submarine goes in the sea lane and travels UNDER the surface line; the rocket goes in the sky lane and leaves through the top. They belong to their lanes for different, visible reasons.
  4. *Sorting by look* (the blue motorcycle with the blue helicopter; the red tractor with the red-hulled boat; the pink canoe with the pink-winged bat). Lanes ignore colour: only where the thing travels makes its engine go.
- No "two lanes" vehicles (seaplane, hovercraft) — the library has none; recorded in §12.

## 4. The stage
Layout stacked (lanes need the width); bubble under the lanes.

**At 704 px** (stage 640 × 560):
- **The garage** (top strip 640 × 130): a drawn garage shelf with 6 bays; the round's things stand in the bays (library pictures 96 px).
- **The lanes** (three bands 640 × 130 each, stacked under the garage):
  - **Sky** (top): pale blue, two drawn cloud puffs drifting slowly.
  - **Sea** (middle): blue with a drawn wavy surface line 40 px below the band's top — above it a strip of sky, below it water (the submarine travels below the line).
  - **Road** (bottom): green verge strip + grey road with a dashed centre line.
  - Each lane has a drawn **start line** at x = 350 with **3 parking spots** (outlined rounded rectangles 104 × 104, left-aligned: 3 × 104 + gaps = 336 px) to its left, and a **finish flag** (drawn chequered post) at the right end with an arrival row where arrived things park overlapping by 40 %.
- **The Go button** is the shell's Check (relabelled "Go!" via strings).
- **Fly mode:** two bands — **sky** (640 × 230, clouds) and **meadow** (640 × 170, drawn grass line and two drawn flower dots); each has 6 drop spots spread across it; no finish line (fliers circle in the sky; ground things sit in the grass).

**At 360 px** (stage 336 × 640): garage 3 × 2 bays (things 72 px); lanes 336 × 110 each (spots 76 × 76, 3 per lane = 240 px + start line; things 64 px); finish flag at the right edge, arrivals overlap 60 %. Fly mode: sky 336 × 200, meadow 336 × 140, spots 3 + 3 per band.

**Library pictures** (contact sheets `vehicles.png`, `things-that-fly.png`, `animals.png`, `birds-2.png`, `camping.png`, `b14-misc.png` opened):
- Land: vehicles/car, bus, truck, bicycle, motorcycle, train, jeep, tractor, van, scooter, skateboard, ambulance, excavator, forklift. (vehicles/taxi, school_bus, police_car and mail_truck carry printed English words — PICTURE-RULINGS — and are not used.)
- Water: vehicles/boat, ship, sailboat, canoe, ferry, yacht, submarine; camping/kayak.
- Air: vehicles/airplane, helicopter, jet, rocket.
- Fly yes: Things That Fly/bird, bee, butterfly, eagle, owl, parrot, robin, dragonfly, ladybug, bat, goose, swan, balloon, kite; vehicles/airplane, helicopter.
- Fly no: animals/dog, cat, fish, horse, rabbit, turtle, elephant, pig; vehicles/car, train; animals/penguin; birds/ostrich.
- **Refused:** Things That Fly/dragon, pegasus (fantasy — no right answer about "real" flying), grasshopper (hops; its short flights are arguable), Things That Fly/frisbee, paper airplane (thrown — no labels for paper_airplane anyway), farm chickens (they flutter a little — arguable), flying fish (none), vehicles/monster_truck and race_car (fine land vehicles but unlabelled), vehicles/crane (a crane is also a bird in 5 locales — the vocab trap noted in MEMORY), hot_air_balloon (no 11-locale label; toys/balloon stands in).

**Task lines** (≤ 24 px): Lanes "Park each one where it travels. Then press Go!" · Fly "Put things that can fly in the sky. Then let the wind blow."

No words on the apparatus.

## 5. The hand
- **Drag a thing** from a garage bay (lifts 6 px, shadow). Over a lane, the nearest free spot glows; drop: it settles into the spot with a 100 ms bounce. Any lane accepts any thing on the drop — the engines judge. Drag back to the garage to undo; drop on an occupied spot swaps.
- **Tap a parked thing** = a free "try": it attempts to go on its own (the same animation as Go, ~1.2 s) and then returns to its spot. This is exploration — never counted.
- **Go (Check, Lanes mode):** all engines start together (each 1.6 s):
  - right lane: land things roll to the finish (the picture slides with a 2 px road-bump bob and two drawn speed lines behind it); boats glide with a drawn wake; the submarine dips below the surface line (its picture fades to 70 % under a translucent water layer) and travels; air things rise 10 px and fly with drawn swoosh lines; the rocket shoots up out of the band's top (dotted trail, a drawn star where it left) and reappears parked at the finish.
  - wrong lane: a land thing on the sea drives 60 px, splashes (drawn ripple rings), sinks to 50 % depth, bobs, floats back; a land or water thing in the sky lifts 4 px, wobbles and floats gently down out of the band; a boat on the road tips 8°, scrapes 30 px (drawn dust puffs), stops; an air thing on the road rolls a little and then lifts straight up to the sky band edge and hovers there (it wants to fly!) — then every wrong thing glides home to its garage bay (500 ms).
- **Let the wind blow (Check, Fly mode):** a drawn gust (three long curved lines) sweeps left → right across both bands (900 ms). Things that can fly rise and circle in the sky (a loop of 8 s, gentle); things that cannot fly stay on the ground (in the sky band they drop softly to the meadow edge, flap if they have wings — the penguin and ostrich flap — then go home to the garage). Fliers placed in the meadow lift off with the gust, circle once, then go home to the garage to be placed again.
- **Sound (optional):** engine hum, splash, scrape, whoosh, birdsong; TTS says a thing's name when picked up.
- **Free play:** after success the lanes keep running in a slow loop (the finished vehicles circle back from the left), and any thing can be tapped to try any lane.

## 6. The rounds
**Lanes — everyday, 9 rounds per pass, 6 things each (2 per lane):**
| # | land | water | air |
|---|---|---|---|
| 1 | car, bus | boat, ship | airplane, helicopter |
| 2 | truck, bicycle | sailboat, canoe | jet, helicopter |
| 3 | train, jeep | ferry, yacht | airplane, jet |
| 4 | bus, scooter | ship, canoe | helicopter, jet |
| 5 | tractor, car | sailboat, ferry | airplane, helicopter |
| 6 | truck, van | boat, yacht | jet, airplane |
| 7 | bicycle, train | ship, sailboat | helicopter, jet |
| 8 | motorcycle, bus | canoe, ferry | airplane, helicopter |
| 9 | jeep, tractor | yacht, boat | jet, airplane |
**Lanes — tricky, 9 rounds** (≥ 2 tricky things per round: submarine, rocket, skateboard, forklift, excavator, ambulance, kayak):
| # | land | water | air |
|---|---|---|---|
| 1 | skateboard, ambulance | submarine, canoe | rocket, airplane |
| 2 | excavator, train | kayak, ship | helicopter, rocket |
| 3 | forklift, bus | submarine, ferry | jet, helicopter |
| 4 | skateboard, tractor | yacht, kayak | rocket, jet |
| 5 | ambulance, motorcycle | submarine, sailboat | airplane, jet |
| 6 | excavator, van | kayak, boat | rocket, helicopter |
| 7 | forklift, scooter | submarine, yacht | airplane, rocket |
| 8 | skateboard, truck | canoe, kayak | helicopter, jet |
| 9 | ambulance, excavator | submarine, ship | rocket, airplane |
**Fly — everyday, 9 rounds, 6 things (3 can fly / 3 cannot):** 1 bird, bee, airplane · dog, cat, fish · 2 butterfly, owl, helicopter · horse, rabbit, turtle · 3 eagle, ladybug, airplane · pig, car, dog · 4 robin, dragonfly, helicopter · cat, elephant, fish · 5 parrot, bee, airplane · turtle, train, horse · 6 owl, butterfly, eagle · rabbit, pig, car · 7 bird, dragonfly, helicopter · dog, elephant, turtle · 8 robin, parrot, bee · fish, train, cat · 9 eagle, butterfly, airplane · horse, car, rabbit.
**Fly — tricky, 9 rounds** (each round ≥ 2 of penguin, ostrich, goose, swan, bat, ladybug, kite, balloon): 1 goose, bat, bird · penguin, dog, fish · 2 swan, kite, bee · ostrich, cat, turtle · 3 bat, balloon, eagle · penguin, horse, car · 4 ladybug, goose, airplane · ostrich, rabbit, fish · 5 kite, swan, owl · penguin, ostrich, pig · 6 balloon, bat, butterfly · elephant, penguin, train · 7 goose, ladybug, helicopter · ostrich, dog, turtle · 8 swan, balloon, robin · penguin, cat, car · 9 kite, bat, goose · ostrich, fish, rabbit.
- One right lane per thing (from the banks plus the tricky table; a reviewed per-locale check confirms no thing reads as a two-lane thing).
- **Answer position:** garage bay order is a seeded per-pass shuffle; the gate measures over 1,000 passes that each bay holds a thing of each lane with frequency 1/3 ± 5 % (Fly 1/2 ± 5 %) and that two neighbouring bays hold the same lane ≤ 40 % of the time (no clumping tell). Lanes are always in the same place (sky top, sea middle, road bottom) — the place IS the content.
- **Order:** order-only reshuffle per pass (`nextTask`), pass 2 ≠ pass 1.

## 7. Check, the misses, the success
- **Go with a thing still in the garage** → hint, no miss, nothing starts: "Park every one first." (Fly: "Put every one in the sky or on the grass first.")
- **Miss 1:** Go runs; the wrong things fail visibly (§5) and come home to the garage; the right ones stay at the finish. Hint (by what failed): "That one can't drive on water — where does it travel?" / "That one can't fly — where does it go?" / "That one can't float — where does it go?" / "That one wants to fly!" — the hint names the failure seen on the first wrong thing.
- **Miss 2:** for each thing back in the garage, its own lane's start spot glows faintly when the thing is picked up (not before), and the lane's travel cue plays once (waves ripple / clouds drift / the road's dashes slide). Hint: "Watch the lane light up when you lift it."
- (Fly mode uses the same ladder: miss 1 hints "Some of them could not fly — they came back." / "Some of them flew off the grass!"; miss 2 the same lift-to-glow help.)
- A new move takes the help away until the next Go.
- **Success:** every thing at the finish; the three lanes run together in one last parade (sky, sea and road moving at once) and the finish flags wave. "Two on the road, two on the sea, two in the sky — everyone got there!" (counts follow the round). Fly: all fliers circle in a ring in the sky over the ground things. "Everything that can fly is up in the sky!"

## 8. Settings
1. **Mode:** land, water, air / can it fly? — at rest: three lanes with start lines and finish flags · a sky and a meadow with spots.
2. **Things:** everyday / tricky — at rest the garage visibly holds the round's things (tricky rounds show the submarine, rocket, penguin, ostrich, bat… in the bays).

## 9. Words (EN source)
- title "The Three Lanes" · instruction "Send every vehicle where it travels — on land, on water or in the air — and find out what can fly."
- promptLanes "Park each one where it travels. Then press Go!" · promptFly "Put things that can fly in the sky. Then let the wind blow."
- check labels: checkGo "Go!" · checkWind "Wind!"
- hints: hintParkFirst "Park every one first." · hintFlyFirst "Put every one in the sky or on the grass first." · hintSea "That one can't drive on water — where does it travel?" · hintSky "That one can't fly — where does it go?" · hintRoad "That one can't float on a road — where does it go?" · hintWantsFly "That one wants to fly!" · hintFly1Down "Some of them could not fly — they came back." · hintFly1Up "Some of them flew off the grass!" · hint2 "Watch the lane light up when you lift it."
- celebrations: celebrateLanes "{n1} on the road, {n2} on the sea, {n3} in the sky — everyone got there!" · celebrateFly "Everything that can fly is up in the sky!"
- aria: ariaLane "{thing} is parked {on the road | on the sea | in the sky}." · ariaGo "{thing} {drove | sailed | flew} to the finish." · ariaBack "{thing} came back to the garage." · ariaWind "{thing} {flew up | stayed on the ground}."
- settings: setMode "Mode" · modeLanes "Land, water, air" · modeFly "Can it fly?" · setThings "Things" · thingsEveryday "Everyday" · thingsTricky "Tricky".
- **Locale traps:** the counting sentence uses numerals {n1}… which are 2 in every everyday round — locales write "two" as a word or numeral per their style (reviewer; never 0 — a lane always has ≥ 1). Verb choice per medium (de fahren / segeln/fahren (Schiff) / fliegen; fr rouler / naviguer / voler; fi ajaa / purjehtia / lentää; sv köra / segla / flyga) — the aria verbs are per medium, not per vehicle, and the reviewer checks "sail" for a ferry or submarine is acceptable or picks a neutral "travel by water" verb (de "fährt übers Wasser", fi "kulkee vedessä"). **crane** is never used (bird in es/no/da/sv/fi). **"Kite"** = the toy; in es the bird and the toy differ (cometa vs milano), fr cerf-volant, fine; nl vlieger = kite and also "flyer". "Jet" vs "airplane" — two words exist in all 11 (de Düsenflugzeug/Jet, fi suihkukone) — reviewer confirms they are distinct words, else jet leaves the pool for that locale. Bats are "fliegende Säugetiere" — no claim about birds is ever made on screen.

## 10. Sound off, access, phones
- Legible with sound off: all motions (rolling, wake, diving, splash, dust, float-down, the gust).
- Keyboard: Tab through garage things; Enter picks; ↑/↓ chooses a lane, ←/→ a spot; Enter drops; Check = Go/Wind. A parked thing: Space = try.
- aria-live per drop and per Go result (§9).
- Taps ≥ 44: things ≥ 64, spots ≥ 76 × 76.
- Pictures ≥ 96 at 704, ≥ 64 at 360.
- Fold at 360 × 740: header 56 + task 52 + garage 160 + 3 lanes × 110 + Go 56 ≈ 654. At 320 × 640: garage 2 rows of 3 at 64 (140), lanes 100 each → ≈ 604.

## 11. Distinct from
- **#235 Water Tub** (planned, other batch: float/sink), **#239 Weather Window** (weather), **#223 Looking Kerb / Zebra Crossing** (road safety). **#245 Camping Backpack** (this batch: a trail with stops asks for needs) — here the lane's medium starts or stops an engine. The built registry has no medium physics; Sorting Chutes (#35, designed) sorts down chutes into a graph, but by category with no motion test; here the test is the vehicle actually trying to travel.
- K-210/K-206 draw lines into groups; the lanes make "where it travels" something the vehicle does.

## 12. Build plan
- **Core state** `{mode, things, roundIdx, garage:[key…], spots:{lane:[key|null ×3]} (fly: {sky:[…6], meadow:[…6]}), phase:'park'|'go'|'done', help}`.
- **Functions:** `laneOf(key)` → land|water|air (fixed table, from the K-210 bank + tricky table); `canFly(key)` (from the K-206 bank + tricky table); `park(key, lane, spot)`; `go()` → per thing `{ok, failKind:'sinks'|'falls'|'scrapes'|'wantsFly'}`; `wind()` → per thing `{ok, move:'rise'|'fall'|'stay'}`; `check()`; `helpLevel()`; `hintKey(firstFail)`; `layout(width)`.
- **Gate's own truth (verify):** an independent lane table and can-fly table; each round has exactly 2 per lane (everyday) / ≥ 2 tricky items (tricky) / 3+3 in fly everyday and ≥ 2 trick things in fly tricky; no refused key; `go()` ok iff lane matches; failKind follows (thing lane, parked lane) by a fixed matrix; `wind()` ok iff (canFly ⇔ in sky); bay-lane frequencies ± 5 %; neighbour clumping ≤ 40 %; the submarine's travel path stays below the surface line and the rocket exits the band top (measured in the activity's local test); every picture key exists.
- **Mutations:** car accepted on the sea · boat accepted on the road · penguin rises in the wind · bat stays on the ground · submarine travels above the surface line · rocket accepted in the road lane · Go starts with things in the garage · Go with garage things counts a miss · wrong things stay parked instead of coming home · help kept after a new move · bays not shuffled · crane enters a pool · a duck (duckling picture) enters the can-fly pool · a picture with printed words (taxi, school bus, police car, mail truck) enters a pool.
- **Pictures to verify** (opened): §4 list.
- **Art needs (logged):** a two-lane vehicle (seaplane or hovercraft) for a future "two lanes" tricky set, and 11-locale labels for vehicles/race_car, monster_truck and hot_air_balloon. **Not blocked.**

## 13. The four questions
1. **Would a child choose it again?** Yes — one Go button and the whole world moves: boats sail, a submarine dives, a rocket blasts off, and a car on the sea splashes comically and bobs home.
2. **Would a teacher put it on the board?** Yes — "where does it travel?" becomes "watch whether its engine can go there"; the penguin in the wind settles the wings argument in one second.
3. **Would a parent trust it?** Library pictures, gentle failures, no score or timer, no fantasy animals presented as fliers.
4. **The invention:** engines that only start in their own world — so every Go is a test, and the wind is the test of who can really fly.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Opened `things-that-fly.png`, `birds-2.png`: EVERY duck picture in the library is a yellow duckling — "the duck rises in the wind" would claim a chick flies. Duck replaced by the goose (things-that-fly/goose) in all tricky Fly rounds and the misconception line; picture ruling appended.
- vehicles/taxi carries printed "TAXI" (PICTURE-RULINGS) — replaced by vehicles/jeep in everyday rounds 3 and 9; the sort-by-look misconception now names colour pairs that actually exist in the round pool (no school bus / fire truck that the activity never shows). Two mutations added.
