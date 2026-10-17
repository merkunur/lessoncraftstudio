# Row 64 — Wake Up, Pip! → THE FLIPBOOK (RL.K.2)

## 0. Identity
- **id** `wake-up-pip.retell-story.rl-k-2` (KEPT; slugs/metadata frozen en..nl; sv da no fi new at build) · grade K · CCSS RL.K.2 (with prompting, retell familiar stories, including key details) · strand Reading: Literature · own files `wake-up-pip-core.js` (new; the shared `retell-story-core.js` untouched), `wake-up-pip-activity.js` (rewritten), html, `wake-up-pip-activities.json`.
- **Worksheets covered:** K-379 "Number the Pictures" and K-381 "Cut and Paste: First, Next, Last" (3-page order), G1-400 "What Happens Next?" and G1-401 "Beginning, Middle and End" (missing-page rounds), G1-402 "Match the Pictures" (the caption strip under each page at retell), G2-378 "Retell the Story with Starters" (the retell ribbon with First / Next / Then / At the end).
- **Old activity:** watch a 4-panel story with emoji placeholders, then rebuild it on a ladder; Pip reacts to the whole retell. **Kept:** the watch-then-it-disappears structure (the no-copy invariant), the requires-order data, key-detail rounds with trivial and foreign panels, fix-memory rounds, and four stories (sun, kite, crow, cake) plus seed; **replaced:** puppy (mud cannot be shown with library art) by *The Lost Duckling*, paint (no paint art) by *The Sandcastle*, and mitten by *The Moon Rocket* (sibling #063 already tells a lost-mitten story; two lost mittens in neighbouring activities would read as one activity twice). Pip is the library `forest-creatures/hedgehog`.

## 1. The pitch
"A flipbook only moves when its pages are in story order — stack the pictures right and the story plays for sleepy Pip; stack them wrong and you can see the story run backwards."

## 2. Why a child will want it again
- **A flipbook you build.** A small ring-bound pad on the stage. The child drops picture pages into it; the pad's corner shows a thumb tab. Then they press the big **Flip!** lever (the shell's Check) and the pages riffle — and the pictures *move* between pages: library pictures glide from where they are on one page to where they are on the next (300 ms tweens). In order, it is a tiny cartoon: the sun climbs, the kite floats down, the water rises in the jar.
- **Backwards is visible.** Out of order, the cartoon breaks in a way children laugh at: the kite jumps back up into the tree, the flower shrinks into a bud, the water drops. The flip stops right there and the two pages that broke it jiggle.
- **Pip wakes up.** Pip, the library hedgehog, lies tipped over (rotated 80°) under a drawn blanket in the corner, asleep. Each page that plays in order makes Pip stir (a 6° wobble); when the whole story plays, Pip sits up, the blanket slides off, and the retell ribbon tells the story to Pip: *First, … Next, … Then, … At the end, …*
- **Free play:** after a story is solved the child can flip the book again and again — a real flipbook they made.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** retell a story in order (first, next, last), including the key details — who, the problem, how it ends (RL.K.2); number/arrange pictures (K-379, K-381); say what comes next and what is in the middle (G1-400/401); match sentences to pictures (G1-402); retell with time-order starters (G2-378).
- **Misconception 1 — any order is fine as long as all pictures are there.** The flipbook shows the consequence: things un-happen. The physics of continuity IS the sequence.
- **Misconception 2 — every picture is a key detail.** In key-detail rounds the tray holds a *trivial* page (true but unimportant: "A bird sits on the fence") and a *foreign* page (not in the story: "A deer leaps away"). In the flipbook a trivial page is a **dead frame** — the characters freeze, nothing in the story moves — and a foreign page makes something pop in from nowhere and vanish. Both visibly break the flow; only the key page moves the story.
- **Misconception 3 — retelling from memory of the pictures only, losing who and the ending.** The retell ribbon at the end needs the first and last key pages (the who/problem and the ending) in place — those slots are marked with a small key icon (geometry) on their tabs.

## 4. The stage
`layout:'stack'` at every width (see below).

**Layout:** `layout:'stack'` at every width (the bubble sits under Flip!) — the pages need the full 680 px so no library picture is ever drawn below 96 px at 704 / 64 px at 360 (the first draft's 120 × 90 tray cards and 96 × 72 sockets would have shrunk every picture to ~40 px, which the picture ruling forbids).

**At 704 px (stage ≈ 680 px wide):**
- **The page row** — 4 (or 3) **page sockets** in a row across the stage, each 156 × 140 px, joined by drawn rings along their top edge (the flipbook's binding laid flat), tabs under them as dot patterns 1–4. Each page holds at most two library pictures: the moving one at 96 px and one context picture (≥ 96 px, allowed to overlap the page edge or the first picture, like a real picture-book spread).
- **The page tray** below: the loose pages (4–5) as cards of the SAME size, 156 × 140 px, in one row (Level 2: 3 cards), no caption (captions appear only at retell).
- **The flipbook viewer**: on Flip! (and in the WATCH step) a big ring-bound book (320 × 250 px, pictures at their full 96–130 px) rises over the page row and riffles through the stack; it sinks back when done.
- **Pip's corner** (top right): library `forest-creatures/hedgehog` 96 px, rotated 80° under a drawn blanket rectangle (cream with a coral stripe).
- **The retell ribbon** (under the page row, 640 × 80 px at 704; 328 × 120, two tabs per line, at 360): empty until success; then four starter tabs with captions.
- **Flip!** — the shell Check, labelled "Flip!".
- **Task line (EN):** "Put the pages in story order, then flip the book for Pip."

**The WATCH step** (start of every round): the flipbook plays the story once with captions under it (each page 1.6 s, tweens between), then the pages "fall out" of the binding and scatter into the tray (the story is gone). A "Watch again" chip (44 px) replays it — available always in the 3-page setting, and once per round in 4 pages.

**At 360 px:** sockets as a 2 × 2 grid of 156 × 118 pages (pictures 64 px), tray as a second 2 × 2 grid of the same size (Level 2: 3 cards in a row of 104 × 118 with ONE 64 px picture each — the moving one); the viewer is 328 × 230 over the grid; Pip 64 px top right; Flip at ≈ 700 px; at 320 × 640 pages 144 × 104, Flip ≈ 618.

**Page art** — every page is library pictures on a drawn page (sky band, ground band, 3 px frame); motion = positions/scales/rotations/opacity changing between pages (authored keyframes), never a drawn object. The crow's water is a drawn blue level inside the transparent `kitchen-tools/glass` (apparatus geometry, like a fill bar) — `kitchen-tools/jar` has a screwed-on blue lid, so a crow could never drink from it. Pebbles are drawn grey ovals (geometry), never shrunken library rocks.

## 5. The hand
- **Drag a tray page** into a socket: it snaps (150 ms) and the flipbook's open page shows it. Drag between sockets to reorder (the others slide). Drag out to return it.
- **Tap a socket page:** the book opens to it (no motion, a still).
- **Flip!** plays the stack. **Watch again** replays the original story (when allowed).
- **Keyboard:** Tab to a tray page, number keys 1–4 drop it into that socket; Enter = Flip.
- **Tap Pip:** a snore puff (a small grey circle drifts up — geometry) before success; a wave (picture tilt) after.

## 6. The rounds
### The eight stories (4 beats; the 3-page version drops the beat in brackets ⟨…⟩)
| story | 1 (key) | 2 | 3 | 4 (key) | motion that makes order visible |
|---|---|---|---|---|---|
| sun | Pip is fast asleep in the grass. | The sun climbs up the sky. | ⟨Warm sunlight reaches Pip's nose.⟩ | Pip wakes up and stretches! | beach/sun y: low → mid → high; hedgehog rotation 80° → 0° |
| kite | Mira the mouse's kite is stuck in a tall tree. | Mira shakes the tree trunk hard. | ⟨The kite slips free and floats down.⟩ | Mira catches her kite and grins. | spring/kite y: in tree/apple's leaves → falling → at forest-creatures/mouse's paws; the tree shakes (rotation ±4°) on page 2 |
| crow | A crow cannot reach the water in a tall glass. | The crow drops pebbles into the glass. | ⟨The water rises up high.⟩ | The crow drinks at last. | water level 20 % → 45 % → 80 %; drawn pebbles 0 → 3 → 6 (birds-2/crow, kitchen-tools/glass) |
| seed | Gus the squirrel plants a tiny seed. | ⟨Rain falls on the seed.⟩ | A green bud pushes up. | A bright flower blooms! | forest-creatures/squirrel + spring/shovel → weather/rainy over the soil → spring/bud small → spring/tulip full (there is no watering-can picture, so the rain waters it) |
| rocket (NEW) | Rob the robot builds a rocket. | Rob counts down: 3, 2, 1! | ⟨The rocket zooms up into the sky.⟩ | The rocket lands on the moon! | toys/robot + toys/rocket on the ground → rocket tilts upright, robot steps back → rocket y high → rocket beside camping/moon |
| cake | Theo the bear wants to surprise Mom with a cake. | Theo mixes the batter in a bowl. | ⟨Theo bakes the cake in the oven.⟩ | Mom gasps with a happy smile. | zoo-animals/bear (Theo); kitchen-tools/bowl → kitchen-tools/oven → 4th-of-july/cake (a whole strawberry cake — bakery/cake and desserts/cake are slices) appears; forest-creatures/bear (Mom, a different drawing, so the two bears never read as one) turns |
| duckling (NEW) | A little duckling is lost by the lake. | ⟨It calls and calls: peep, peep!⟩ | Mother Duck hears it and paddles over. | They swim home side by side. | spring/duckling (fluffy, wings out) alone at camping/lake → farm-animals/duck at 1.3× enters from the right → they move together off left. NOT farm-animals/duckling, which is a near-copy of farm-animals/duck (ruling) |
| sandcastle (NEW) | Kai the crab fills a bucket with sand. | ⟨Kai builds a tall sandcastle.⟩ | A wave washes it away! | Kai laughs and builds it again. | beach/crab + beach/bucket → beach/sandcastle rises → a drawn blue wave band rises over it (geometry, like the crow's water), castle shrinks to 0 → castle rises again. NOT beach/water, which is a plastic water BOTTLE |

### Levels (each ≥ 7 rounds; order-only reshuffle per pass)
- **Level 1 — Story order** (K-379, K-381): all 8 stories; the tray holds exactly the story's pages, shuffled (never already in order, never exactly reversed in more than 2 of 8).
- **Level 2 — The missing page** (G1-400/401, key detail): three pages are locked in their sockets; one socket is empty; the tray holds the key page + one trivial page + one foreign page. 8 rounds:
| story | empty socket | trivial page (in story, not key) | foreign page |
|---|---|---|---|
| sun | 1 | A bee buzzes past Pip. (spring/bee) | A boat sails by. (vehicles/boat) |
| kite | 3 | A snail sits on the grass. (spring/snail) | It starts to snow. (winter/snowflake) |
| crow | 2 | A leaf falls down. (spring/leaf) | A tractor drives by. (vehicles/tractor) |
| seed | 4 | A worm wiggles by. (spring/worm) | A train goes past. (toys/train) |
| rocket | 2 | A bird sits on the fence. (spring/bird) | A deer leaps away. (forest-creatures/deer) |
| cake | 4 | A cat naps on the chair. (farm-animals/cat) | A boat sails by. (vehicles/boat) |
| duckling | 1 | A frog sits on a rock. (forest-creatures/frog) | A bus drives past. (vehicles/bus) |
| sandcastle | 3 | A seagull flies over. (beach/seagull) | A snowman melts. (winter/snowman) |
  "First / middle / end" (G1-401) = the empty socket is 1 (sun, duckling), 2–3 (kite, crow, rocket, sandcastle) or 4 (seed, cake): 2 / 4 / 2 per pass of 8 in the 4-page setting (the first draft listed only sockets 2 and 3 while claiming this balance). In the 3-page setting the socket-3 rounds use page 3 of the shortened story.
  **The trivial picture is IN the story:** during the WATCH step the trivial thing (the bee, the snail, the leaf…) is visible in the background of every page, standing still. So the trivial page is true — it just shows nothing in the story changing. The foreign thing never appears in the WATCH step.
- **Level 3 — Fix the flipbook** (fix-memory): the book arrives already filled but wrong — two pages swapped (order fix) or one page replaced by a foreign page (face fix). The child must find and repair it; 8 rounds (sun swap 2↔3, kite foreign at 3, crow swap 3↔4, seed swap 1↔2, rocket foreign at 2, cake swap 2↔3, duckling foreign at 4, sandcastle swap 3↔4).

**Retell ribbon** (all levels, at success): four tabs **First, Next, Then, At the end** (3-page: **First, Next, At the end**) each show its page's caption; the child can tap a tab to hear/see it again. In the G1-402/G2-378 setting "Captions" (§8) the captions arrive as loose strips that the child lays under the pages before Pip will sit up; a caption under the wrong page makes that page play out of sync (the caption highlights while the wrong picture moves) — the strip slides back.

**Answer position.** Level 1: shuffle law above; Level 2: the key page's tray slot balanced (each of 3 slots 2–3 times per 8); Level 3: the faulty socket spread over 1–4. The gate measures all of these.

## 7. Check (Flip!), the misses, the success
- **Flip with empty sockets** → no miss; the empty sockets pulse. Hint: "Put a page in every slot, then flip."
- **Miss 1:** the book flips from page 1; at the first break it STOPS: a backwards tween plays half-way and freezes (the kite half back in the tree), the two pages around the break jiggle in their sockets; a dead frame (trivial) shows a grey "pause" bar across the page (geometry); a foreign page shows its stranger fading in and out. Pip stirs and falls back asleep. Hint: "The story ran backwards here. Which page comes first?" (dead frame: "Nothing in the story changes on this page." foreign: "That did not happen in the story.")
- **Miss 2:** "Watch again" glows and, if used, the original story replays with the matching tray page outlined as each beat plays. Without replay: the first correct socket's neighbour is ghosted with a faint outline of the page that belongs there. Hint: "Watch the story again and follow each page."
- A new drag removes miss-2 outlines until the next Flip.
- **Success:** the book flips through smoothly, every tween forward; Pip wobbles on each page, then sits up (rotation to 0°, 400 ms), the blanket slides off; the retell ribbon fills tab by tab and the bubble tells Pip: "First, Pip is fast asleep in the grass. Next, the sun climbs up the sky. Then, warm sunlight reaches Pip's nose. At the end, Pip wakes up and stretches!" then "Pip is awake! Thank you for telling the story."

## 8. Settings
1. **Pages:** 3 pages (first, next, last) / 4 pages — the sockets and ribbon tabs change (3 vs 4).
2. **Captions:** Pictures only / Match the sentences — the second adds the caption strips to lay under the pages before the retell (G1-402, G2-378); the tray visibly gains the strips.

## 9. Words (EN source)
- stage title "Wake Up, Pip!" · instruction "Put the pages in story order, then flip the book for Pip." · Level 2 "One page is missing. Find the page that moves the story." · Level 3 "Something is wrong in this flipbook. Fix it, then flip." · captions "Put each sentence under its picture."
- buttons: "Flip!" (Check label) · "Watch again".
- hints: empty "Put a page in every slot, then flip." · backwards "The story ran backwards here. Which page comes first?" · dead "Nothing in the story changes on this page." · foreign "That did not happen in the story." · miss2 "Watch the story again and follow each page."
- starters: "First," · "Next," · "Then," · "At the end,".
- celebration "Pip is awake! Thank you for telling the story."
- aria: page "Page: {caption}" · socket "Slot {n}: {caption|empty}" · Pip "Pip the hedgehog — {asleep|awake}".
- **Locale traps.** Time-order starters per locale, as the school retell uses them: de *Zuerst, Dann, Danach, Zum Schluss*; fr *D'abord, Ensuite, Puis, À la fin*; es *Primero, Después, Luego, Al final*; pt *Primeiro, Depois, Em seguida, No final*; it *Prima, Poi, Dopo, Alla fine*; nl *Eerst, Dan, Daarna, Tot slot*; sv *Först, Sedan, Efter det, Till sist*; da *Først, Så, Bagefter, Til sidst*; no *Først, Så, Etterpå, Til slutt*; fi *Ensin, Sitten, Sen jälkeen, Lopuksi*. In de/nl/sv/da/no the starter forces verb-second ("Dann klettert die Sonne…") — every retell sentence is authored per locale WITH its starter (`retell.<loc>[i]`), never "starter + caption". Names (Pip, Mira, Gus, Lina, Theo, Kai) kept unless a locale reads them as words; "Mom" per locale (de *Mama*). Snow stories in pt-BR stay (stories, not weather). Animal sounds ("peep, peep") per locale (de *piep*, fr *piou*, fi *tsiip*). The rocket count-down is numerals (3, 2, 1) in every locale — never number words.

## 10. Sound off, access, phones
- Legible with sound off: the whole mechanism is motion; captions appear in the watch step and the retell ribbon. TTS reads captions (5 locales).
- Keyboard: §5; break position announced ("The story stops between slot 2 and slot 3").
- Taps ≥ 44 px (tray pages ≥ 90 px tall, sockets ≥ 54 px). Pictures inside pages ≥ 64 px on the flipbook at 360 (main character 80 px), ≥ 96 px at 704.
- Check (Flip!) above the fold at 360 × 740 and 320 × 640 (§4). Phone: sockets under the book; tray as a 2-row grid; bubble under Flip.

## 11. Distinct from
- **story-line tool** (peg illustrated beats on a clothesline): pegging has no consequence; the flipbook *plays* the order and shows a broken order running backwards. The pages are library scenes, not illustrated cards.
- **#063 Fable's Bookmark** answers detail questions in a fixed book; **#071 Linc's Domino Track** links facts by cause. Pip retells a whole story in order.
- **#074 Rewind Rail** (rewinding handwriting strokes) — rewind of writing, not story sequence.

## 12. Build plan
- **Core** `WakeUpPipCore`: `story(id, pages)` → beats with `order`, `key`, keyframes `{pictureId: {x, y, s, r, o}}`; `newRound(round, setting)`; `place(state, pageId, socket)`; `flip(state)` → `{ok, breakAt|null, kind:'backwards'|'dead'|'foreign'}` computed from the authored order (a beat placed after a later beat = backwards; trivial = dead; foreign = foreign); `retell(state, loc)`.
- **Gate's truth** (`verify-wake-up-pip-core.js`): its own order table per story; for every permutation of 3 and 4 pages, `flip` is ok only for the true order and `breakAt` is the first index where order decreases; keyframes are strictly continuous forward (every animated property's change between consecutive true beats is monotone for the story's "progress" property — sun y, water level, kite y, bud scale, castle scale); trivial pages leave every main-character keyframe identical to the previous page (dead frame provable); foreign pages introduce a picture absent from all true beats; Level 1 shuffles never start in order; slot balance per pass; `retell.<loc>` exists for every locale and beat.
- **Mutations:** accept a reversed stack · accept the trivial page as key · accept the foreign page · flip reports the wrong break index · trivial page moves a main character (not dead) · watch step not removed before building (copy invariant) · 3-page version keeps the dropped beat · retell built as starter + caption. All killed.
- **Pictures (opened by the critic 2026-10-17):** forest-creatures/hedgehog (Pip — side view, reads clearly), beach/sun, spring/kite, tree/apple, forest-creatures/mouse, birds-2/crow, kitchen-tools/glass (clear, open-topped), forest-creatures/squirrel, spring/shovel, weather/rainy, spring/bud, spring/tulip, toys/robot, toys/rocket, camping/moon, zoo-animals/bear + forest-creatures/bear (two different bear drawings), kitchen-tools/bowl, kitchen-tools/oven, 4th-of-july/cake (whole cake), spring/duckling, farm-animals/duck, camping/lake, beach/crab, beach/bucket, beach/sandcastle, plus the trivial/foreign set. **Rejected:** spring/sun, camping/pine_tree, spring/watering_can (do not exist); kitchen-tools/jar (lidded); beach/rock as pebbles (would render far below 64 px); bakery/cake (a slice); farm-animals/duckling (copy of the duck); beach/water (a water bottle).
- **Risks:** library pictures face fixed directions (the duck must face the duckling — mirror with scaleX −1, allowed). Pages hold at most two pictures each at full size — authored coordinates are read on the rendered page at 360 / 704 before the round ships. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a flipbook they built themselves that turns into a cartoon, a sleepy hedgehog that wakes up, and wrong orders that run comically backwards.
2. **Teacher on the board?** Yes — the class can see WHY order matters (things un-happen) and why a trivial picture is not a key detail (nothing moves).
3. **Parent trust?** Gentle stories, library pictures, real retell language, no scores.
4. **Invention:** a flipbook only animates when its pages are in story order — the continuity of the motion is the sequence, and a non-key page is a frame where nothing moves.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 2→5
What changed:
- **Every picture would have rendered at ~40 px** (120 × 90 tray cards, 96 × 72 sockets) — far under the 96/64 floor. Stage rebuilt: a full-width row of 156 × 140 page sockets and same-size tray cards (≤ 2 pictures per page at full size); the big ring-bound viewer rises only to play the flip and the WATCH step.
- **Pictures that do not exist or are not what they say:** spring/sun, camping/pine_tree, spring/watering_can missing; kitchen-tools/jar is lidded (→ glass); beach/rock pebbles would be tiny (→ drawn); bakery/cake is a slice (→ 4th-of-july/cake); farm-animals/duckling copies the duck (→ spring/duckling); **beach/water is a water bottle** (→ drawn wave band). Theo's mother is a different bear drawing.
- **Level 2 balance** claimed first/middle/end but listed only sockets 2 and 3 → re-authored 2/4/2. Trivial pages are now visibly IN the watched story (background, standing still), so "trivial" vs "foreign" is honest.
- The mitten story duplicated sibling #063's Lost Mitten → replaced by *The Moon Rocket*; foreign pages re-picked so no story's foreign page is another story's hero.
