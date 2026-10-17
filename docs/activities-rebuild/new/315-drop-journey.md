# New 315 — The Water Drop's Journey → THE DROP THAT WAITS FOR ITS REASON: a step of the water cycle only happens when you give the drop the cause that makes it happen — and every wrong cause does exactly what it would really do (NGSS 5-ESS2-1, taught at grade 3)

## 0. Identity
- **id** `drop-journey.play.5-ess2-1` · grade 3 · NGSS 5-ESS2-1 (the worksheets' grade-3 strand: the water cycle; honest note — 5-ESS2-1 is a grade-5 modelling expectation in which the water cycle is the standard example of hydrosphere–atmosphere–geosphere interaction; this activity teaches its grade-3 core — the four stages, their causes and their order, no energy budget, no percentages — the level of the catalogue worksheet G3-385) · strand Science · key `drop-journey` → `drop-journey-core.js`, `drop-journey-activity.js`, `drop-journey-activity.html`, `drop-journey-activities.json`; framework via `frontend/lib/frameworks.ts`. Scaffold: `node scripts/new-activity.js --num=315`.
- **Worksheet covered:** G3-385 "The Water Cycle: Label the Diagram" (read the four words in the bank — evaporation, condensation, precipitation, collection — and write each on the numbered line; L3 adds runoff). Label mode does that; journey mode teaches *why* each stage happens and in what order.
- New instrument; no old activity.

## 1. The pitch
"The drop won't move until you give it its reason: warm it and it rises out of the sea as vapour; cool the vapour and it becomes a cloud; let the cloud's droplets join until they're heavy and they fall as rain; let the slope pull the rain downhill and it runs back to the sea — and if you give it the wrong reason, it does what water really would: cold on the sea only freezes its edge, warmth on a cloud melts it back into vapour."

## 2. Why a child will want it again
- **A raindrop with a job.** The hero is the library raindrop (`weather/raindrop`, 96 px), sitting in the sea. It bobs gently on the waves. It is not a character — no face — but it is *the* thing on the stage, and the child is its guide.
- **Four cause tokens, each a little experiment.** A tray holds **warmth** (`weather/sunny`), **cold** (`weather/snowflake`), **joining** (three small drawn droplet circles that slide together when touched) and **downhill** (a drawn slope with an arrow). Drag one onto the drop: the right one sets off a beautiful change; a wrong one does something *true* and small — the sea's edge frosts white, a cloud thins into wisps, vapour wobbles and floats back up. Children try the wrong ones on purpose to see what happens; that curiosity is the science.
- **The words land where things happen.** Each completed stage stamps its word on the scene, exactly where it happened, with a soft press: *evaporation* above the sea surface, *condensation* in the cold air, *precipitation* under the cloud, *collection* where the river meets the sea. By the end of the round the child's own journey has labelled the diagram.
- **The end-of-round show — the full loop.** When the drop is home, the whole cycle plays once at speed: a faint drop of light runs the loop through all four stamped words, the sun pulses, rain sweeps the hill, the river shimmers — and the four words light in order.
- **Free play:** between rounds every token works anywhere: freeze the sea's edge, dissolve clouds, make it rain on purpose.

## 3. The skill and the misconception
- **Skill:** the four stages of the water cycle — evaporation (the sun's warmth turns water into invisible water vapour that rises), condensation (high up the air is cold; the vapour cools and turns into tiny droplets: a cloud), precipitation (the droplets join and grow until they are heavy and fall as rain, or snow), collection (the water runs downhill and gathers in rivers, lakes and the sea) — in order, with their causes; and labelling the diagram.
- **Misconception 1 — clouds are smoke, cotton or "steam from nowhere".** **Pushback:** the cloud forms *from the drop the child carried there*: the vapour wisps visibly gather into the cloud's outline when cooled, and the cloud is full of tiny droplet dots that grow when they join. Warmth on a cloud turns those droplets back into vapour wisps — it is water, coming and going.
- **Misconception 2 — rain comes from nowhere / falls whenever there is a cloud.** **Pushback:** "downhill" (gravity) on a cloud does nothing — the droplets are too light to fall; they bob and stay. Only *joining* makes them heavy enough. The cloud darkens a shade with each join; on the fourth it rains.
- **Misconception 3 — stages out of order** (rain before cloud, vapour into the sea). **Pushback:** every round starts the drop at a different stage (sea, low vapour, cloud, hill), and each state accepts exactly one cause that moves it on; the others give their honest small effect and do not advance it.

## 4. The stage
**Journey mode at 704 px (the scene is the hero, 648 × 420):**
- **Task line:** **"Give the drop what it needs to go all the way round, back to {start}."** ({start} = "the sea" / "the cloud" / "the hill" / "the warm air over the sea".)
- **The scene** (drawn apparatus, tool-grade, on the reviewed geometry of `scripts/worksheet-gen/primitives/water-cycle.js`, palette tokens only, 3 px teal outlines, no words drawn): the **sea** — a tealSoft band across the left 60 % of the bottom (waves as the primitive's curve); the **hill** — a cream wedge rising on the right with a **rock slope** (grey-cream) and a **meadow patch** (pale green) only in the extended setting; the **river** — a 6 px teal line from the hilltop down to the sea; the **cold high air** — the top 26 % of the scene washed ice-blue with a 2 px frost-dot fringe along its lower edge (no text); a faint **warm-air** shimmer over the sea when the sun works.
- **The drop:** `weather/raindrop`, 96 px. States: *water* (the picture, bobbing in the sea or sitting on the hill); *vapour* (the picture fades out and three dashed teal wisps 96 px tall take its place); *cloud droplets* (the drawn cloud — the primitive's cloud path, 180 × 110, white — appears with 6 tiny droplet dots inside; the dots grow with each join); *rain* (the picture again, falling, with 5 dashed rain lines from the cloud); *ice* (a white rim along the sea edge, or the drop on the hill turning white with a frost outline).
- **The cause tray** (under the scene at ≥ 700 px — stacked layout (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704); the scene fills the ≈ 648 px stage): four 104 px cream pads in a row — warmth (`weather/sunny` 96), cold (`weather/snowflake` 96), joining (drawn: three 26 px droplet circles), downhill (drawn: a 70 px slope with a 30 px arrow). Pad order is shuffled per round (§6).
- **Stamped words:** 18 px Nunito 800 on a white tag with a teal outline, placed at fixed anchors (above the sea's surface, inside the cold band beside the cloud, under the cloud, at the river mouth; extended: on the rock slope / under the meadow).

**Label mode at 704 px:**
- **Task line:** **"Drag each word to its place on the water cycle."**
- The same scene with the **drop's whole journey drawn as arrows** (the primitive's coral arrows: up from the sea, across into the cloud, down as rain, down the hill to the sea) and a **numbered place** (coral disc 32 px with a white numeral, the worksheet's style) on each stage; 2–4 places are empty sockets (dashed 150 × 40), the rest already carry their word. The **word bank** (chips 150 × 44, native words) sits under the scene. In half the rounds the scene is **mirrored** (sea on the right, hill on the left; words never mirrored).

**At 360 px:** stacked — task → scene 328 × 260 (drop 64 px; cloud 110 × 68; stamped words 14 px on tags) → cause tray as one row of four pads (78 × 78; pictures 64 px, the floor) → bubble. Label mode: scene → bank in two rows of chips (156 × 44) → Check full width. **Fold budget 360 × 740:** 56 + 52 + 260 + 12 + 78 + bubble 48 = 506; label: 56 + 52 + 260 + 100 + 48 = 516. **320 × 640:** scene 296 × 236, pads 70 (pictures 64) → 470 / 480. Above both folds.

## 5. The hand
- **Drag a cause token onto the drop** (a 120 px drop zone around the drop in whatever state): within 100 ms the token pad dims and the effect starts. The token springs back to its pad afterwards (it is a reusable tool).
- **The cause table (the whole physics, honest in every cell):**

| drop is … | warmth | cold | joining | downhill |
|---|---|---|---|---|
| **water in the sea** | ✅ **evaporation**: shimmer, the drop fades into rising vapour wisps that drift up to just below the cold air (1.4 s) | the sea's edge freezes: a white ice rim forms along the shore (true); the drop stays | nothing to join: the dots slide together and apart again | nothing: the sea is already the lowest place |
| **vapour (warm air over the sea)** | it stays vapour: warm vapour cannot turn into droplets, so it only drifts a little higher in the warm air and stays below the cold band (true: while it is kept warm it does not condense) | ✅ **condensation**: the cold high air reaches down to the wisps; as they rise into it they cool and gather into the cloud outline with droplet dots (1.4 s) — the cold is the *cause*, the rising is shown as warm air going up, never as the cold "pulling" | nothing: vapour is not drops yet (the dots pass through) | vapour is too light: it dips, then floats back up |
| **droplets in a cloud** | the cloud thins into vapour wisps again (true — clouds evaporate); the drop is vapour once more | the cloud grows a little fuller (two more tiny dots appear — cooling makes more droplets) but every dot stays tiny and nothing falls; no new stage (true: more cloud is not yet rain) | ✅ a join: two dots merge into a bigger one and the cloud darkens a shade; on the **4th** join **precipitation**: rain falls onto the hill (1.2 s) | the droplets are too light: they bob and stay up |
| **rain on the hill** | it dries up into vapour (true — puddles evaporate); the drop is vapour over the hill (a detour: the child cools it again) | it freezes into ice on the hill and waits; warmth melts it back | nothing to join | ✅ **collection**: the drop runs down the river into the sea (1.2 s) |
| **ice on the hill** (after cold) | ✅ melts back to water on the hill (no stage word; the round continues from "rain on the hill") | stays ice | nothing | ice does not run: it stays put (true at this scale) |
| **ice rim on the sea** (cold on the sea) | the rim melts; the drop is still water in the sea | the rim stays | nothing | nothing |

- **Vapour is drawn as dashed, 40 %-transparent wisps** and the aria/bubble call it "invisible water vapour": the wisps are a marker for something you cannot see, so the scene never teaches "steam you can see is vapour" (what you see over a kettle is already tiny droplets — a cloud).
- **Extended setting (runoff / ground water):** on the hill the drop lands on the **rock slope** or the **meadow** (fixed per round, §6): downhill on rock → **runoff** stamps on the slope, the drop runs down the river → **collection** at the mouth; downhill on the meadow → the drop **soaks in** (drawn: it sinks into the soil, a dotted path runs underground to the sea) → **ground water** stamps under the meadow → **collection**.
- **Label mode:** drag a chip to a socket; it snaps (80 ms); drag between sockets or back to the bank; Check 140 × 52.
- **Keyboard:** Tab cycles the four tokens; Enter "gives" the focused token to the drop; label mode: Tab to a chip, Enter, ←/→ choose the socket, Enter.
- **Sound (bonus):** a sizzle for evaporation, a soft chime for condensation, patter for rain, a trickle for collection; a crackle for freezing.

## 6. The rounds
**Journey mode** — one round = the drop starts at one stage and must go once all the way round back to it (4 steps; 5 in the extended setting). Cause pads are re-ordered each round so the first right cause sits on every pad position across the pass (measured):

| # | start | first right cause | pad order (top → bottom) | extended: rain lands on |
|---|---|---|---|---|
| 1 | the sea | warmth | cold · warmth · downhill · joining | rock |
| 2 | the cloud | joining | joining · downhill · warmth · cold | meadow |
| 3 | the hill | downhill | warmth · joining · cold · downhill | rock |
| 4 | the warm air over the sea (vapour) | cold | downhill · cold · joining · warmth | meadow |
| 5 | the sea | warmth | joining · cold · warmth · downhill | meadow |
| 6 | the hill | downhill | downhill · warmth · cold · joining | meadow |
| 7 | the warm air over the sea (vapour) | cold | warmth · joining · downhill · cold | rock |
| 8 | the cloud | joining | cold · downhill · joining · warmth | rock |

- **Mirrored journeys (critic):** rounds 5–8 play with the scene mirrored (sea right, hill and river on the left; words never mirrored), so the second visit to each start is a new picture, not a repeat — the child follows the causes, not a memorised path across the screen.
- **Measured:** every start twice; the first right cause sits on pad position 1/2/3/4 = 2/2/2/2; extended landings rock 4 / meadow 4; a "tap the pads top to bottom until something moves" bot needs on average 2.5 tries for the first step — the miss ladder (§7) catches it — and the honest-effect cells mean a wrong try *teaches* rather than just fails.

**Label mode** — one round = the diagram with 2–4 empty places; the bank holds exactly the missing words (4 base stages; extended rounds use runoff in place of one): 

| # | empty places | mirrored | bank order |
|---|---|---|---|
| 1 | all four | no | condensation · collection · evaporation · precipitation |
| 2 | evaporation, condensation, precipitation | yes | precipitation · evaporation · condensation |
| 3 | all four | yes | collection · precipitation · condensation · evaporation |
| 4 | condensation, collection | no | collection · condensation |
| 5 | evaporation, precipitation, collection | no | collection · evaporation · precipitation |
| 6 | all four | yes | precipitation · condensation · collection · evaporation |
| 7 | evaporation, condensation | yes | condensation · evaporation |
| 8 | all four | no | evaporation · collection · precipitation · condensation |

- **Extended label rounds** (5 places: evaporation · condensation · precipitation · **runoff** on the slope arrow · collection at the sea; worksheet G3-385 L3):

| # | empty places | mirrored | bank order |
|---|---|---|---|
| X1 | all five | no | runoff · condensation · collection · evaporation · precipitation |
| X2 | evaporation, runoff, collection | yes | collection · evaporation · runoff |
| X3 | condensation, precipitation, runoff | no | precipitation · runoff · condensation |
| X4 | all five | yes | precipitation · runoff · evaporation · collection · condensation |
| X5 | evaporation, precipitation, collection | no | collection · precipitation · evaporation |
| X6 | condensation, runoff, collection | yes | runoff · collection · condensation |
| X7 | precipitation, runoff | no | runoff · precipitation |

  Measured (critic script): each place empty 4–6 times (runoff 6 — the new word gets the most practice), mirrored 3/7, the bank never in cycle order, cycle-order bot 2/24. Runoff and collection are told apart by WHERE (the slope arrow vs the sea), never by order alone; ground water is a journey-mode stage only (the worksheet does not label it).
- **Measured:** each stage empty in 6–7 of 8 rounds (evaporation 7, condensation 7, precipitation 6, collection 6); mirrored 4/8; the bank is never in cycle order; the bot "bank left-to-right onto the empty places in cycle order" gets 3 of 26 placements right (below chance) and never a whole round; a child who learned *positions* instead of stages fails the mirrored rounds.
- **Order:** order-only reshuffle per pass in both modes.

## 7. Check, the misses, the success
- **Journey mode has no Check button:** each token is an immediate try. A **miss** is a wrong cause on the current state (the honest effect plays first).
  - **miss 1** (per step) → the honest effect, then the drop's state glows and the bubble names it: **"The drop is water in the sea. What could the sun do to it?"** / **"The drop is vapour in warm air. What happens to vapour when it gets cold?"** / **"The drop is a tiny droplet in a cloud. What makes droplets heavy enough to fall?"** / **"The drop is rain on the hill. Which way does water run?"**
  - **miss 2** (same step) → the right token's pad pulses twice and its place in the scene (sun's beam on the sea, the cold band, the cloud, the river) is outlined: **"Try the {cause}."** ({cause} = "warmth" / "cold" / "joining" / "downhill".)
  - Detours (warmth on the cloud or on the hill) are not misses — they are true, and the round simply continues from the new state; the bubble says **"Back to vapour! Water can go up again too."**
- **Label mode:** Check with chips left → **"Every empty place needs a word."** · **miss 1** → wrong chips shake and slide back to the bank; the drop runs the arrows once, stopping at each empty place with its state shown (vapour wisps at the evaporation arrow, droplet dots at the cloud, rain lines, the river): **"Watch the drop. What is happening at each number?"** · **miss 2** → the empty places show their cause token as a small icon (sun / snowflake / joining dots / downhill): **"The sun, the cold, the joining and the slope each make one stage happen."**
- A new drag takes the help away until the next Check.
- **Success (journey):** the full-loop show; bubble EN: **"Round and round: {w1}, {w2}, {w3}, {w4}!"** (the stamped words in the order the child made them happen). **(label)** every word glows along the arrows: **"The water cycle: {w1}, {w2}, {w3}, {w4}!"**

## 8. Settings
1. **Mode:** make the drop travel (default) / label the diagram — changes the board at rest (cause tray vs word bank and numbered places).
2. **Words:** 4 stages (default) / 4 stages + runoff and ground water — adds the rock slope and the meadow (journey) or the runoff place (label) at rest.

## 9. Words (EN source)
- title **"The Water Drop's Journey"**
- instructions **"Give the drop what it needs to go all the way round, back to {start}."** · **"Drag each word to its place on the water cycle."**
- start names **"the sea"** · **"the cloud"** · **"the hill"** · **"the warm air over the sea"**
- stage words (content, native, from `data/b4/locales/weather-symbols.<loc>.json → cycleLabels`): evaporation · condensation · precipitation · collection · runoff; **ground water** to be authored (no entry yet in any locale; de/fr/es/pt also lack *runoff*). **Honest fallback (critic):** the extended "Words" option ships in a locale only when BOTH *runoff* and *ground water* have a school-real word confirmed by the native reviewer (candidates to check, not to trust: de *Oberflächenabfluss* / *Grundwasser*, fr *ruissellement* / *eaux souterraines*, es *escorrentía* / *agua subterránea*, pt *escoamento superficial* / *água subterrânea*, it *acque sotterranee*, nl *grondwater*, sv *grundvatten*, da *grundvand*, no *grunnvann*, fi *pohjavesi*); otherwise the Words setting is hidden in that locale and the base 4-stage game ships whole (8 journey + 8 label rounds) — no padding, no English fallback word.
- cause names (bubble only, never on the pads): **"warmth"** · **"cold"** · **"joining"** · **"downhill"**
- hints and celebrations as §7.
- settings **"Mode"**: "make the drop travel" / "label the diagram" · **"Words"**: "4 stages" / "4 stages + runoff and ground water"
- aria: drop `"the drop is {state}: water in the sea / vapour / a droplet in a cloud / rain on the hill / ice"`; tokens `"warmth"`, `"cold"`, `"joining"`, `"downhill"`.
- **Locale traps:** (a) **Stage words are school terms and differ in form**: de nouns (*Verdunstung, Kondensation, Niederschlag, Sammlung*), fi nominalised verbs (*haihtuminen, tiivistyminen, sadanta, kerääntyminen*), fr *précipitations* plural, es *acumulación* (not *colección*), pt-BR *coleta*; all from the reviewed data; the native panel confirms each against the locale's grade-3 science book (e.g. sv *avdunstning* vs *förångning* — the data says *avdunstning*; da *fortætning* for condensation). (b) **"vapour"** is a hint word: en-GB/international spelling *vapour*; pt-BR *vapor*, de *Wasserdampf* (not *Dampf*, which suggests boiling). (c) The bubble sentences name states with the right article/case (fi partitive). (d) **Snow** is deliberately out (no snow stage) so southern/northern climates do not conflict. (e) Mirrored diagrams are legal in every locale (no reading-direction issue; words never mirrored).

## 10. Sound off, access, phones
- Sound off: every state change, every honest effect (ice rim, thinning cloud, bobbing droplets), stamped words, pulsing pads and outlines are visible.
- Keyboard path §5; focus 3 px teal; aria-live polite on the bubble.
- Taps: pads 78–104 px; chips 150 × 44; sockets 150 × 40 (hit area 44).
- Pictures: `weather/raindrop`, `weather/sunny`, `weather/snowflake` at 96 px (704) / 64 px (360) — floors met. The cloud, vapour, ice and all scenery are drawn apparatus (the reviewed water-cycle geometry), never library art (the library cloud has a face; `weather/rainy`/`cloudy` are symbols, not the drop's cloud).
- Above both folds (§4).

## 11. Distinct from
- **Row 172 The Rain Table** (a cloud rains evenly to show equal parts): rain as a measuring tool for fractions, not the water cycle.
- **New 239 The Weather Window / New 238 The Season Wheel:** weather symbols and seasons; no water cycle.
- **New 231 The Thirsty Plant** (water climbs root → stem → leaf): a flow through parts of a plant; here the drop's *state* changes and each change needs its own cause.
- **New 264 The Cycle Wheel** (each stage grows out of the last and the adult lays the first stage again): a life-cycle ring placed by the child; here nothing advances without its physical cause, and wrong causes have true effects.
- No reuse of a built invention.

## 12. Build plan
- **Core state:** journey `{ start, state:'sea'|'vapour'|'cloud'|'hill'|'ice-sea'|'ice-hill', joins, steps:[stage], stamped:[word], landing:'rock'|'meadow', misses:{step:n} }` · label `{ empties:[stage], placed:{stage:word}, mirrored, bank:[word] }`.
- **Functions:** `apply(cause)` → `{advance:stage}` | `{effect:'iceRim'|'drift'|'thin'|'bob'|'dryUp'|'freeze'|'none', state}` (the §5 table verbatim as data); `done()` = back at start after a full loop; `labelCheck()`.
- **Gate's own truth (`verify-drop-journey-core.js`, the table re-typed independently):** from every state exactly one cause advances it; the advancing causes form the cycle sea→vapour→cloud→hill→sea; joining advances only on the 4th join; warmth on cloud → vapour and warmth on hill → vapour (detours, no miss); a full loop from each of the 4 starts takes exactly 4 advances (5 extended) and stamps the 4 (5) words at their anchors; journey pad positions of the first right cause 2/2/2/2; label: each round's bank = its empties, never cycle order, mirrored 4/8, bot ≤ chance.
- **Mutations (each killed):** warmth on vapour condenses it (two right causes) · cold on a cloud makes rain · ice on the hill runs downhill · the extended setting shown in a locale missing a reviewed runoff/ground-water word · cold on the sea advances to vapour · downhill on a cloud makes rain · precipitation on the 1st join · a detour counted as a miss · words stamped at the child's drop point instead of the fixed anchors · label bank in cycle order · mirrored scene mirrors the words · the runoff stage on the meadow · the same pad order in two rounds running · same pass order twice.
- **Pictures to verify:** `weather/raindrop` (blue drop, labelled), `weather/sunny` (labelled sun; not the unlabelled `weather/sun`), `weather/snowflake` (labelled) — all seen on the contact sheet.
- **Risks:** the scene must read as *apparatus* (flat palette fills, 3 px outlines, the reviewed primitive's geometry), never as hand-drawn scenery — no trees, no houses, no birds; "ground water" and four missing "runoff" words need native authoring. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — a drop you guide round the world, four little experiments in your hand, and things freeze, melt, rain and run when you touch them.
2. **Teacher on the board?** Yes — it teaches the *reason* for each stage (warmth, cold, joining, gravity) and the wrong reasons do what they really do; the label mode covers the worksheet and the mirrored diagrams stop position-learning.
3. **Parent trust?** Calm, scientifically honest in every cell, library pictures only, no timer.
4. **Invention:** a water drop that only moves on to the next stage when you give it that stage's cause — and every wrong cause shows its true small effect.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **Every cause-table cell checked for physical truth.** Two were not: *cold on a cloud → "nothing changes"* (cooling a cloud makes more droplets — now it grows fuller, still no rain) and *cold on vapour* drawn as the cold pulling the wisps up (now the cold air reaches them as warm air rises; cold is the cause of condensing, rising is not). *Warmth on vapour* now states why it cannot condense (kept warm). Added the missing ice states (ice on the hill, ice rim on the sea) so no move is undefined. Vapour is drawn as dashed see-through wisps named "invisible water vapour" so the scene does not teach "visible steam = vapour".
- **Extended label mode had no rounds:** added 7 measured rounds with the runoff place (G3-385 L3), runoff empty 6×, bank never in cycle order, bot 2/24.
- **Honest content fallback:** runoff is missing in de/fr/es/pt and ground water everywhere — the extended option ships per locale only when both words pass the native reviewer; otherwise it is hidden and the base game ships whole. No padding.
- Journey rounds 5–8 mirrored so the second visit to each start is a new picture. Re-measured (`work-c42/c-drop.js`): first right cause on pad 1/2/3/4 = 2/2/2/2; label empties 7/7/6/6, mirrored 4/8, bot 3/26.
- Grade fit stated honestly (a grade-5 PE taught at its grade-3 core). Pictures: weather/raindrop, sunny, snowflake exist and are what they say (contact sheet); the library cloud (has a face) is correctly refused.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
