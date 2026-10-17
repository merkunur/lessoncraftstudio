# Row 36 — Bramble's Parking Tower: the car lift that only goes up, down and across (K.G.A.1)

## 0. Identity
- id `parking-tower.place-by-relation.k-g-a-1` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl — sv/da/no/fi slug, title and intro are new at build) · grade K · CCSS K.G.A.1 · strand Geometry · own files at rebuild: `parking-tower-core.js` (new, replaces the shared `place-by-relation-core.js` dependency for this row), `parking-tower-activity.js`, `parking-tower-activity.html`, `parking-tower-activities.json`.
- page title (frozen): "Bramble's Parking Tower — Position Words: Above, Below, Between (Kindergarten)". The frozen intro promises Beaver Bramble, a side-on tower, parking above / below / next to / between, and "the floor between levels makes 'above' mean one level up" — all kept.
- worksheets it covers: **K-064** On, Under, Beside · **K-067** Inside and Outside · **K-066** Top, Middle, Bottom (Tower words) · **K-065** Left and Right (Near words + Tower words) · **G2-279 / G2-302 / G2-308** grid coordinates on a 6 × 6 grid, find and write the code (Roof plan) · **G2-369 / G2-371** the four compass directions, also with a turned compass rose (Roof plan). **G2-303** grid coordinates on a 10 × 10 grid (Roof plan, size 10 × 10: tap-to-park where the card is ≥ 600 px wide; on phones the same rounds are read-the-code rounds on the dials, because 10 columns cannot keep 44 px taps — the skill the phone keeps is reading a 10 × 10 code, never a shrunken tap).
- old activity: a drawn side-on tower, 2 levels × 3 bays, seven rounds (next to bus, above van, below car, between bus and van, a dock round with two right bays, a reverse "tap his truck" round, between two trucks), a drawn SVG beaver placeholder and drawn vehicles. **Kept:** the side-on tower with visible floor slabs, every relation and the reverse "tap his truck" round type, the per-locale noun-form tables already authored for de/fr/es (`VEHICLE_DE/FR/ES`, `PREP_DE/FR`, the es fused *del/al*), Bramble's name per locale (Benno, Beto, Bruno, Bram…). **Dropped:** the dock round (two right answers), all drawn vehicles and the drawn beaver (now library pictures).

## 1. The pitch
"The truck can only ride the lift up and down and drive along a floor — so *above* is always one ride up the lift, never a drive sideways, and the route it leaves shows exactly which position word the child chose."

## 2. Why a child will want it again
- **A working car park.** A side-on tower with a glass lift shaft. The child taps a free bay and the vehicle drives to the lift, rides it up or down (the platform hums, the floor counter of lights climbs), rolls off and reverses neatly into the bay with a little bounce of its springs. Children park things for the pleasure of watching the lift.
- **The route stays.** After parking, a dotted route line remains: up 1 and across 2, say. That line is a tiny diagram of the position — and it is what the misses use.
- **Bramble runs the booth.** The library beaver sits in his booth at the entrance; on each success he raises the barrier, a ticket prints out of the booth slot, and the parked vehicle flashes its lights twice with a cheerful beep-beep.
- **The helicopter view.** In the grid-codes and compass setting the camera tips up to the roof plan: a map with lettered columns and numbered rows and a compass rose; the vehicle drives along the lettered column and the numbered row, two light beams crossing at its bay.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** describe and act on relative position: above, below, next to (beside), between, left of, right of; on top of / under / beside / inside / outside an object (the tower); top / middle / bottom; and at grade 2, find and write a grid code (letter across, number down) and use north / east / south / west on a map, including when the map's north is not up.
- **Misconceptions and the push-back:**
  - *"Above" = anywhere higher or nearby; above vs next to confused:* the floor slab between levels is drawn thick, and the vehicle can only change level by the lift. Parking "above" means a lift ride of one level in the landmark's column; a sideways park leaves an ACROSS route. Only one free bay ever stands directly above the landmark (others are occupied), so the word has one answer.
  - *Left/right from the vehicle's point of view:* left and right are always the viewer's; the asked side and the done side are shown as arrows from the landmark on a miss.
  - *Between = beside one of them:* between rounds put the free bays at both outsides and at the middle; the middle is the only bay with a landmark on each side — on a miss two arrows point inward from both landmarks to it.
  - *Bottom level = the basement:* the basement is shown only in "under" rounds; in top/middle/bottom rounds the ground is solid.
  - *Grid code read as number-then-letter or the row counted from the bottom:* the vehicle drives DOWN the letter's column from the top edge and ALONG the number's row from the left edge; a wrong bay shows its own code on a ticket next to the asked code.
  - *North = up, always:* two compass rounds turn the rose (north to the right, north down); the vehicle obeys the rose, not the screen.

## 4. The stage
**Near words (side view) at 704:** Bramble's booth (drawn apparatus frame 70 × 110, the library `forest-creatures/beaver` inside at 96 px) at ground left · the **lift shaft** (glass, 40 px wide, a platform and a column of 3 level lights) · the **tower**: 3 columns × 3 levels of bays, each bay 150 × 108 px, floor slabs 12 px (#9FB0AE with a darker 3 px edge), walls 6 px, roof parapet 20 px · parked vehicles fit the bay by height (96 px, overhanging the bay's side lines by ≤ 8 px if wide). Occupied bays hold *filler* vehicles at 60 % saturation (background); the round's landmark(s) at full colour with a soft spotlight; the mover waits at the entrance beside the booth. Free bays show a faint white "P-less" outline (no letters — an outlined rectangle with chevron marks). Total ≈ 560 × 430 px.
**Tower words:** the tower narrows to 2 columns × 3 levels (bays 140 × 108) so that a **street spot** (150 px wide) fits on each side at ground level; the **roof deck** (open, parapet with railings) sits on top; the **basement** (108 px, below a thick ground line, reached by the lift) is drawn only in "under" rounds.
**Roof plan (grid codes and compass):** a top-down map of the roof, 6 × 6 squares of 72 px with a 26 px letter strip on top (A–F) and number strip on the left (1–6, counting DOWN, as on the worksheets), parked vehicles as **drawn map tokens** — a 44 px rounded square in the vehicle's colour with a 3 px ink outline and a white inner dot (picture ruling: a vehicle on a map is a record, never a shrunken library picture) — and beside the grid a **map key** card (apparatus frame): the round's mover and landmark as library pictures at 96 px (64 px at 360), each with its token swatch beside it, so the child reads the map exactly as a real map with a key; all other parked tokens are grey (#B9C2C0, "other cars"), and a **compass rose** (apparatus, 120 px: four petals, north petal orange-tipped like the worksheets, letters in the locale's abbreviations) to the right of the grid. In code-writing rounds two **dials** under the rose: a letter wheel (A–F) and a number wheel (1–6), each 64 × 80 px with ▲ ▼ buttons. **Size 10 × 10:** squares 50 px + 24 px strips (A–J across, 1–10 down) = 524 px at 704, tokens 32 px, the key card beside it; dials A–J and 1–10.
**Task line** (20 px) carries the sentence; each vehicle word is underlined in the colour of the ring drawn round that vehicle on the stage (teal ring = the mover, coral ring = the landmark) — the sound-off link from word to picture, with no shrunken picture in the line.

**At 360:** Near words — lift 22 px, bays 96 × 80 (vehicles 64 px tall), 3 × 3 = 310 px wide. Tower words — 2 columns of 80 px bays + 2 street spots of 72 px + lift 18 = 322 px (street vehicles 64 px tall, overhanging the kerb). Roof plan — squares 48 px + strips 20 px = 308 px; tokens 32 px drawn squares (tap target = the 48 px square); above the grid a strip with the map key (two 64 px pictures with their swatches) on the left and the compass rose (72 px) on the right; dials 56 × 64. Roof plan 10 × 10 on a card < 600 px: squares 29 px + 16 px strips (306 px), tokens 20 px drawn dots, the grid is display-only and every round is set on the dials (56 × 64, ≥ 44 px buttons). 320: bays 88 / squares 44 (6 × 6), 27 (10 × 10).

Pictures (theme JSON + contact sheet): `vehicles/` bus, van, car, truck, bulldozer, ambulance, tractor, jeep (`vehicles/taxi` refused: it carries a printed "TAXI" sign — English text that would also mirror; natively left-facing except truck (right) and tractor (faces the viewer) — all parked vehicles are mirrored to face the lift), `forest-creatures/beaver` (Bramble). The roof plan uses the same pictures as map tokens. Tower, lift, slabs, booth, rose, dials, routes, arrows: drawn apparatus.

## 5. The hand
- **Tap a free bay / spot / square** → the mover drives (180 px/s) to the lift, the platform carries it (300 ms per level, level light climbs), it rolls along the floor and reverses into the bay (bounce 120 ms). The route stays as a 3 px dotted teal line. First response < 60 ms (headlights blink). Tapping another free bay re-parks it (old route fades). Tapping an occupied bay: the filler vehicle honks softly and nothing moves.
- **Reverse rounds** ("Bramble parked above the bus. Tap his truck."): several trucks are parked; tapping one makes it flash and lifts it 4 px (selected).
- **Roof plan:** tapping a square sends the vehicle in from the top edge down its column, then along its row (two light beams follow: column beam from the letter, row beam from the number). **Dials:** ▲ ▼ turn the wheels (click, 120 ms); the chosen letter-number shows on a ticket under them.
- **Keyboard:** arrow keys move a focus ring over bays/squares, Enter parks; Tab to the dials.
- **Free play:** after success, the vehicle can be re-parked anywhere; each park shows its route (side view) or its code ticket (roof plan) — a toy for exploring the words.

## 6. The rounds
Bays are (column, level): columns 1–3 from the left, levels 1–3 from the GROUND up. Candidates = the free bays; every other bay is occupied.

**Near words (9 rounds; mover = truck unless noted):**
| # | prompt | landmark(s) | free bays (candidates) | right | what a wrong bay is |
|---|---|---|---|---|---|
| 1 | Park the truck next to the bus. | bus (1,1) | (2,1) · (1,2) · (3,2) | (2,1) | (1,2) above · (3,2) not touching |
| 2 | Park the truck above the van. | van (2,2) | (2,3) · (1,2) · (3,1) | (2,3) | (1,2) next to · (3,1) lower and to the side |
| 3 | Park the truck below the car. | car (3,2) | (3,1) · (2,2) · (1,3) | (3,1) | (2,2) next to · (1,3) far |
| 4 | Park the truck between the bus and the van. | bus (1,2), van (3,2) | (2,2) · (2,3) · (1,1) | (2,2) | (2,3) above the gap · (1,1) below the bus |
| 5 | Park the truck to the left of the bulldozer. | bulldozer (2,3) | (1,3) · (3,3) · (2,2) | (1,3) | (3,3) right · (2,2) below |
| 6 | Park the truck to the right of the ambulance. | ambulance (2,1) | (3,1) · (1,1) · (2,2) | (3,1) | (1,1) left · (2,2) above |
| 7 | Bramble parked above the bus. Tap his truck. | bus (3,1); trucks at (3,2) · (2,1) · (2,2) | — | (3,2) | (2,1) next to · (2,2) diagonal |
| 8 | Bramble parked to the left of the tractor. Tap his truck. | tractor (2,3); trucks at (1,3) · (3,3) · (2,2) | — | (1,3) | (3,3) right · (2,2) below |
| 9 | Park the car between the two trucks. (mover car) | trucks (1,1), (1,3) | (1,2) · (2,2) · (2,1) | (1,2) | (2,2) diagonal to both · (2,1) next to the lower truck only |
Right-bay columns 2,2,3,2,1,3,3,1,1 (3 / 3 / 3 across columns 1/2/3); levels 1,3,1,2,3,1,2,3,2 (3 / 3 / 3 across levels 1/2/3 — "the middle floor" is never a safe guess).

**Tower words (9 rounds; the tower is the reference; 2 columns × 3 levels; SL / SR = street left / right, ROOF, BASE = basement):**
| # | prompt | mover | candidates | right |
|---|---|---|---|---|
| 1 | Park the car on top of the tower. | car | ROOF · (1,2) · SR | ROOF |
| 2 | Park the van inside the tower. | van | (2,1) · SL · ROOF | (2,1) |
| 3 | Park the truck under the tower. | truck | BASE · ROOF · (1,1) | BASE |
| 4 | Park the bulldozer beside the tower. | bulldozer | SR · BASE · (2,3) | SR |
| 5 | Park the jeep outside the tower. | jeep | SL · (2,1) · (1,3) | SL |
| 6 | Park the bus on the top level. | bus | (1,3) · (2,2) · (1,1) | (1,3) |
| 7 | Park the ambulance on the middle level. | ambulance | (2,2) · (1,1) · (2,3) | (2,2) |
| 8 | Park the tractor on the bottom level. | tractor | (1,1) · (2,2) · (1,3) | (1,1) |
| 9 | Park the car on the left side of the tower. | car | SL · SR · ROOF | SL |
The basement is drawn only in round 3; in rounds 6–8 the roof is a closed parapet and the ground solid, so "top / bottom level" can only mean a floor of bays. "Outside" never offers the roof or the basement (both arguable).

**Roof plan (9 rounds; 6 × 6, letters A–F across, numbers 1–6 DOWN):**
| # | task | given | right |
|---|---|---|---|
| 1 | Park the car in B2. | — | B2 |
| 2 | Park the van in E5. | — | E5 |
| 3 | Park the bulldozer in A6. | — | A6 |
| 4 | Where is the bus? Set the code. | bus in D3 | D3 (dials) |
| 5 | Where is the jeep? Set the code. | jeep in F1 | F1 (dials) |
| 6 | Park the car one step north of the bus. (rose upright) | bus C4; free: C3 · D4 · C5 · B4 | C3 |
| 7 | Park the truck one step east of the van. (rose upright) | van D2; free: E2 · C2 · D1 · D3 | E2 |
| 8 | Park the bulldozer one step south of the car. (rose turned: north points RIGHT) | car C3; free: B3 · D3 · C2 · C4 | B3 |
| 9 | Park the jeep one step west of the truck. (rose turned: north points DOWN) | truck B5; free: C5 · A5 · B4 · B6 | C5 |
Codes spread over all six letters and five of six numbers; compass rounds use all four directions once, two with a turned rose.

**Roof plan 10 × 10 (9 rounds; letters A–J across, numbers 1–10 DOWN):** 1 park the car in C7 · 2 park the van in H2 · 3 park the bulldozer in J9 · 4 park the jeep in E10 · 5 where is the bus? (G4) · 6 where is the truck? (B8) · 7 where is the ambulance? (I1) · 8 where is the van? (F6) · 9 where is the car? (A3). Nine different letters and nine different numbers; the far corners (J9, E10, A3) and the 10th row are included because counting past 6 is what the 10 × 10 sheet adds. On a card < 600 px rounds 1–4 show the vehicle already standing on its square and ask "Where is the {mover}? Set the code." (dials), so all nine are read rounds there.


**Answer position:** in the side views the bay IS the position word (that is the skill); across a pass the right bay sits in each column 3 times and on levels 1/2/3 at 3/3/3 (near) and street/inside/roof/base mix (tower). Candidate sets always include the near-miss relation (above vs next to, left vs right…). Roof plan: codes spread; compass free squares are always all four neighbours, so only the direction decides. **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check before parking / tapping / setting the dials** → hint "Tap a free space to park." / "Tap Bramble's truck." / "Turn the wheels to set the code." (no miss).
- **Miss 1 — what the apparatus shows:** two arrows grow out of the landmark (or the tower): a **teal arrow** pointing the ASKED position (↑ one level for above, ↔ for next to, ← / → for left / right, two inward arrows for between, the roof/basement/street area glowing for on top / under / outside, a whole level glowing for top / middle / bottom) and a **coral arrow** to where the vehicle actually is, with the slab between levels pulsing in above/below rounds. Hint by relation, e.g. "Above means one floor up, over the van." · "Next to means on the same floor, touching." · "Left is this side." (the left street/edge glows) · "Between means with one on each side."
  - Roof plan code: a ticket with the parked square's real code (e.g. "D3") appears beside the asked code ("B2"); the letter strip's column and number strip's row of the parked square light. Hint "Letter across the top, number down the side." Read-the-code rounds (dials): a grey ghost token drives to the square the child's code names, the asked vehicle's token pulses, and the two codes stand side by side. Compass: the rose's north petal glows and an arrow from the landmark to the parked square lights the rose letter it really points to. Hint "Find north on the rose first."
- **Miss 2:** the right bay/square pulses (two beats) with a ghost of the vehicle in it; roof plan: the asked column and row light and cross on the right square. Hint "Park where it is glowing."
- **A new park / dial turn** clears the showing.
- **Success:** the route stays, the vehicle flashes its lights twice (beep-beep), Bramble's barrier lifts and a ticket prints from the booth. Bubble: "Yes — the truck is {position-phrase}!" (built from the same noun-form tables as the prompt, e.g. "Yes — the truck is above the van!") · roof plan "Yes — {code}!" / "Yes — {direction}!".

## 8. Settings (each visibly changes the board at rest)
1. **Words:** near words (above, below, next to, between, left, right) / tower words (on top, under, beside, inside, outside, top, middle, bottom) / grid codes and compass (Grade 2) — a 3 × 3 tower, a 2-column tower with street, roof and basement, or the roof plan with letters, numbers and the rose.
2. **Roof plan size** (shown only with grid codes and compass): 6 × 6 / 10 × 10 — the plan redraws with A–F / 1–6 or A–J / 1–10 strips and matching dials.

## 9. Words (EN source)
- title (in-tool): "Bramble's Parking Tower"
- instruction: "Help Bramble park each vehicle. Tap the right space, then Check." (roof plan: "Find the space on the roof plan.")
- prompts: placeRel "Park the {mover} {rel} the {landmark}." · placeBetween "Park the {mover} between the {lm1} and the {lm2}." · placeTwo "Park the {mover} between the two {lmPlural}." · reverse "Bramble parked {rel} the {landmark}. Tap his truck." · tower "Park the {mover} {towerRel}." (towerRel: "on top of the tower", "under the tower", "beside the tower", "inside the tower", "outside the tower", "on the top level", "on the middle level", "on the bottom level", "on the left side of the tower") · code "Park the {mover} in {code}." · readCode "Where is the {mover}? Set the code." · compass "Park the {mover} one step {dir} of the {landmark}."
- rel values: "above", "below", "next to", "to the left of", "to the right of"; dir: "north", "east", "south", "west".
- hints: as §7 plus hintAbove, hintBelow, hintNext, hintLeft, hintRight, hintBetween, hintTop, hintMiddle, hintBottom, hintOn, hintUnder, hintBeside, hintInside, hintOutside, hintCode "Letter across the top, number down the side.", hintNorth "Find north on the rose first.", hintStrong "Park where it is glowing."
- success: "Yes — the {mover} is {phrase}!" · "Yes — {code}!" · "Yes — one step {dir}!"
- settings: "Words" · "near words" · "tower words" · "grid codes and compass" · "Roof plan size" · "6 × 6" · "10 × 10"

- **Locale traps (the noun-form tables are content — authored per locale, then native-checked):**
  - Every prompt governs nouns: de case (*über dem Bus*, *neben den Lastwagen* — the old `VEHICLE_DE` dat/akk forms) · fr fused articles (*au-dessus du bus*, *à côté de la voiture*, *entre le bus et la camionnette*) · es MX (*camión* means bus in Mexico — keep the old ruling bus = *autobús*, truck = *tráiler*; fused *del / al*) · pt (*em cima do ônibus*, *ao lado da van*) · it (*sopra il / sopra al pullman*, *accanto al furgone*) · nl (*boven de bus*, *naast het busje* — de/het) · sv/da/no definite suffixes (*ovanför bussen*, *ved siden af bilen*, *ved siden av bilen*) · fi genitive + postposition (*bussin yläpuolelle*, *pakettiauton alapuolelle*, *puskutraktorin viereen*, *bussin ja pakettiauton väliin*, *puskutraktorin vasemmalle puolelle*; "on top of the tower" *tornin päälle*, "under" *tornin alle*, "inside" *torniin*, "outside" *tornin ulkopuolelle*). The table carries, per vehicle, every form the locale's frames need — no runtime morphology.
  - Above vs on top of: several locales use one word for both (de *auf* vs *über* differ; sv *på* vs *ovanför*; fi *päälle* vs *yläpuolelle*) — rounds use "on top of" only with the tower, "above" only between bays, so no locale has to make a distinction it does not have.
  - Left/right of: fr *à gauche de*, es *a la izquierda de*, fi *vasemmalle puolelle* — always the viewer's.
  - Compass letters on the rose: en N E S W · de N O S W · fr N E S O · es N E S O · it N E S O · pt N L S O · nl N O Z W · sv N Ö S V · da N Ø S V · no N Ø S V · fi P I E L. The dials' letters A–F are the same in every locale (Latin letters; fi grid codes are written the same).
  - Grid codes: letter then number in all 11 locales (as the worksheets).
  - Bramble's localized name stays as the old file: en Bramble, de Benno, fr Bramble, es/pt Beto, it Bruno, nl Bram; sv/da/no/fi names authored at build.
- **Sound off:** the coloured underlines link each vehicle word to its ringed vehicle (and, on the roof plan, to the map key); the arrows show the relation on a miss; TTS reads the prompt where it works.

## 10. Sound off, access, phones
- Keyboard path §5; every bay/square is a focusable button with aria "{column/level description}, free" / "occupied by the {vehicle}"; roof squares "square {code}".
- Taps: bays ≥ 80 × 70 px; roof squares ≥ 44 px; dial buttons ≥ 44 px.
- Pictures: parked vehicles 96 px tall at 704 / 64 px at 360; Bramble 96 / 64 px; map-key pictures 96 / 64 px; roof tokens are drawn apparatus (44 / 32 px squares, 20 px dots on a phone 10 × 10), never library pictures.
- Fold: near words at 360 → task 48 (two lines) +
 tower 3 × 92 + roof 20 + ground 20 ≈ 370 + bubble/Check 56 → Check at ≈ 430 px. Roof plan 308 + rose row 80 + dials 64 + 56 ≈ 560 px. All under 640.

## 11. Distinct from
- Planned **#211 toy-box-room** (positions in a room) and the tools **build-plan** (cube views) / **folding-sheet**: none uses a lift-and-floor route to make *above* a vertical ride. Built activities have no position words.
- Siblings: #205 (direction on a number court), #207 (ordinal places in a line) — this is space, not number.

## 12. Build plan
- **Core state:** `{words:'near'|'tower'|'plan', round, mover, landmarks, occupied, candidates, parked:null|spot, selected:null|spot, dials:{l:null,n:null}, rose:0|90|180, miss, help}`.
- **Core functions:** `relation(spot, landmark)` → above / below / next-left / next-right / diagonal / far (from (c,l)) · `towerRel(spot)` → on / under / beside / outside / inside + level name · `between(spot, a, b)` · `codeOf(square)` / `squareOf(code)` · `compassDir(from, to, rose)` (rose rotation applied) · `park(spot)` (refuses occupied) · `route(spot)` (entrance → lift → level → bay) · `check()` → `{ok, kind, did}` · `layout(words, width)`.
- **Gate ground truth:** for every round exactly one candidate satisfies the asked relation by the oracle's own geometry, and every other candidate's `relation` is recorded (the near-miss set); "above" candidates: exactly one free bay in the landmark's column one level up; between bays have landmarks on both sides on the same line; tower rounds never offer roof/basement for outside, never show the basement in top/middle/bottom rounds; codes letter-across / number-down; compass answers with rose 90°/180° computed by rotation; right-bay column balance 3/3/3.
- **Mutations:** "above" accepts two levels up · next-to accepts diagonal · left/right swapped · between accepts beside-one · basement shown in a bottom-level round · code read number-then-letter · rows counted from the bottom · rose rotation ignored · reverse round accepts the diagonal truck · an occupied bay accepts a park · help survives a new park · a library picture used as a roof token · 10 × 10 park round asks for a square tap on a card < 600 px · the right near-words bay on the middle level in more than 3 rounds.

- **Pictures to confirm at build:** each vehicle at 96 and 64 px in a bay, mirrored; beaver in the booth.
- **Risks:** the noun-form tables for sv/da/no/fi/pt/it/nl are new authoring — the one reviewer checks every prompt × vehicle combination (the gate prints the full matrix).
- **BLOCKED:** nothing. G2-303 (10 × 10) is covered by the plan-size setting: tap-to-park on cards ≥ 600 px; on phones the same nine rounds are read on the dials (the honest phone form — taps never shrink below 44 px).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a real lift, vehicles that park themselves, a beaver who prints tickets, a helicopter view.
2. **Would a teacher put it on the board?** Yes — the route line is a diagram of the word; the class can call "up one!" and watch it happen; grade-2 codes and compass ride the same tower.
3. **Would a parent trust it?** Yes — library vehicles and beaver, calm apparatus, no score.
4. **The invention, in one sentence:** vehicles can only ride the lift up and down and drive along a floor, so every position word becomes a route the child can see.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Picture ruling applied on the roof plan: vehicles are no longer shrunken library pictures (68 / 44 px) but **drawn map tokens** (coloured rounded squares, grey for "other cars"), read through a **map key** card holding the mover and landmark as full-size library pictures (96 / 64 px) — which also teaches what a map key is. The task line's 28 px inline pictures are replaced by coloured underlines matching coloured rings on the stage.
- Near-words answer levels were 2 / 6 / 1 (the middle floor answered six of nine rounds — a guessable tell): rounds 2, 3 and 5 re-seated so levels are 3 / 3 / 3 and columns stay 3 / 3 / 3; each re-seated round keeps its near-miss bay; a mutation guards it.
- G2-303 (10 × 10) moved from "not covered" to covered by a second setting (Roof plan size): tap-to-park on cards ≥ 600 px, read-the-code on the dials on phones; a full 9-round 10 × 10 table written; read-the-code misses now show a ghost token on the square the child's code names.
- Contact sheet: `vehicles/truck` faces right and `vehicles/tractor` faces the viewer (landmark only, never mirrored meaningfully); the rest face left — as the design already stated.
- (added after the picture-rulings pass) `vehicles/taxi` carries a printed "TAXI" sign — English text that mirrors backwards when the vehicle is turned to the lift — so every taxi in the rounds is now `vehicles/bulldozer` (labelled, side view, faces left); the fi examples follow (*puskutraktorin viereen*).
