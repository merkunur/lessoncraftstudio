# New 234 — The Where-From Thread → THE SPOOL ON THE WORKBENCH (NGSS 2-PS1-1)

## 0. Identity
- id `where-from-thread.play.2-ps1-1` · grade K · framework NGSS 2-PS1-1 (materials; K-214's natural/made is the K entry to it — kept, see §12) · strand Science · files `where-from-thread-core.js`, `where-from-thread-activity.js`, `where-from-thread-activity.html`, `where-from-thread-activities.json` (scaffold `node scripts/new-activity.js --num=234`).
- Worksheet covered: **K-214 "Natural and Man-made"** (draw a line from each picture to its group) — Sort mode is that page in motion; Thread mode goes further (what the made thing was made from).
- New instrument; nothing kept from an old activity. Starting truth: the worksheet bank `scripts/worksheet-gen/data/science/natural-vs-manmade.json` — its items are re-used where the picture is honest; its `weather/sun` and `weather/cloud` are refused here (both drawn with faces), and `around-the-house/cup` is replaced by things whose material can be read.

## 1. The pitch
"Every thing trails a thread: drop it on the workbench and, if people made it, its thread runs through the bench's spool and back out to the tree, the sheep or the sand it was made from — a thing from nature has no spool to go through, because nobody made it."

## 2. Why a child will want it again
The tray holds eight or nine things, each with a loose, wiggly coloured thread curled behind it like a tail. Pick one up and the tail trails after the finger, swinging with the drag (a real verlet string, 14 segments). Drop a wooden chair on the workbench and the bench's big wooden spool starts to spin with a soft whirr: the thread is pulled through it, runs out the far side, crosses into the meadow and ties itself with a little bow around the tree's trunk — and the tree gives one tiny shiver. Drop a pinecone in the meadow and its thread just curls up and ties a bow around the pinecone itself: it already is where it came from. After a few drops the bench is a web of threads, each one a visible "this came from that" — a scarf tied to the sheep, a jar tied to the sand heap, a pencil and a chair both tied to the same tree. The end-of-round show: every thread is plucked once, left to right, each giving a harp note (pitch by source: tree low, sheep middle, sand high), and the three sources bounce in turn. Between rounds the child can pluck any thread to hear it and watch it wobble (free play; never changes the answer).

## 3. The skill and the misconception
- **Skill (K-214, 2-PS1-1 at K depth):** tell a thing found in nature from a thing made by people; for a made thing, name the natural material it was made from (wood ← tree, wool ← sheep, glass ← sand, paper ← tree).
- **Misconceptions and how the apparatus pushes back (mechanism, not message):**
  1. *"Made things have nothing to do with nature."* A made thing's thread never ends at the bench — it runs on through the spool to a source in the meadow. The bench connects back to nature; it does not cut the line.
  2. *"Anything wooden is natural."* A wooden chair dropped in the meadow: its thread will not tie to the chair. It snakes across the grass, finds the workbench, runs through the spool and on to the tree, and stays drawn there for 1.2 s — the spool sits visibly between the chair and the tree. Then the thread recoils and the chair slides back to its tray spot: the child has seen where it came from and must now put it where it belongs. Nothing ever sorts itself.
  3. *"Natural things were made by someone."* A pinecone dropped on the bench: the spool turns, finds no making to do (the thread is only one short loop), spins empty with a hollow rattle, the thread ties a bow round the pinecone itself for 1.2 s, then the pinecone slides back to the tray.
- **What "made" means here (critic ruling 2026-10-17, settles the log question).** *Made by people* = people turned nature's material into a NEW thing (a chair, a scarf, a jar). Cutting, picking or gathering does not make a new thing: the sawn log (bark on, rings showing) is still wood exactly as the tree grew it; the picked rose is still a rose. So **`camping/log` is NATURAL** — its thread ties round itself — and it is the Tricky setting's headline lure (log natural / chair made: same wood, one changed by people, one not). This is the classification K natural-vs-made units use (natural *materials* include wood and logs), and it matches every round table below, where the log is always on the natural side. After a Tricky round that held the log and a wooden made thing, the success bubble adds the rule in one line (celebrateLog, §9).
  4. *Plastic and metal things.* Their threads run through the spool and stop with a knot on the bench's far post — no source is drawn. Honest: made by people, from stuff we do not show here (§12).

## 4. The stage
Layout **stacked at every width** (the meadow and the workbench need the full 680 px; a side column would push the pictures under the 96 px floor). The feedback bubble sits under the stage, beside Check.

**At 704 px (tray 680 wide above a stage 680 × 340):**
- **The tray** (top): the round's things, pictures 96 px in 104 px cards, up to 6 per row (8–9 things = 2 rows, 680 × 224). Each card trails a curled thread (2.5 px) whose colour comes from a 9-colour palette **by tray slot, never by answer**.
- **The meadow** (left, 316 × 340): a drawn soft-green field (rounded rectangle, 3 rows of grass strokes; apparatus only). Down its left edge the **three sources** at 104 px: `tree/apple` (an apple tree — the tree for wood and paper), `farm-animals/sheep` (wool), `summer/sand` (a sand heap — glass). Each source has a small brass ring (14 px, apparatus) at its base where threads tie.
- **Natural things land in the meadow** in a 2 × 3 patch grid to the right of the sources (cells 100 × 100, pictures 96 px; a round places at most 5).
- **The workbench** (right, 344 × 340): a drawn wooden bench (two planks, four legs, 3 px ink outline, warm brown `#C9925B`); at its LEFT end, nearest the meadow, **the spool** — a big drawn bobbin (72 px tall, two flanges, wound core, a crank dot that turns); at the RIGHT end **the post** (a short peg where plastic/metal threads knot). Made things land on the bench top (3 slots) and on the shelf below it (3 slots), slots 100 × 100, pictures 96 px (a round places at most 5 made things).
- **Thread mode:** the same stage; the made things already sit on the bench, each thread running through the spool and ending in a loose bead (18 px) at the meadow edge; each source has a socket ring (32 px).

**At 360 px:** stacked — task line → tray 2 rows of 5 cards (64 px pictures) → meadow as a band 328 × 150 with the three sources at 72 px left to right (tree, sheep, sand) and natural things landing in a strip beneath (cells 66 px, pictures 64 px) → bench 328 × 160, spool left (48 px), post right, slots 66 px. Threads 2 px. At 320: sources 64 px, meadow band 130, bench 140; the tray is 2 rows of 4 cards (64 px pictures, never smaller) and in a 9-thing Tricky round the 9th card waits stacked behind the 8th (its edge shows) and slides forward as soon as a tray spot frees.

**Library pictures** (each checked in `mini tools/pictures/<theme>.json` and opened on a contact sheet):
- Sources: `tree/apple`, `farm-animals/sheep`, `summer/sand`.
- Natural: `miscellaneous/pinecone`, `miscellaneous/acorn`, `miscellaneous/leaf` (maple leaf), `summer/seashell`, `camping/rock` (grey stone), `easter/feather`, `flowers/rose`, `spring/grass`; Tricky only `camping/log` (a sawn log).
- Made from wood → tree: `furniture/chair` (slatted wooden chair), `furniture/table` (round, wooden), `furniture/stool`, `furniture/bench`, `classroom/pencil`.
- Made from paper → tree (Tricky): `classroom/notebook`, `classroom/book`, `post-office/envelope`.
- Made from wool → sheep: `clothing/sweater` (knitted), `clothing/scarf` (striped knit, fringed), `clothing/beanie` (knit hat with bobble).
- Made from glass → sand: `kitchen-tools/glass` (clear tumbler), `kitchen-tools/jar` (clear jar, blue lid).
- Made, no source shown (post): `toys/ball`, `toys/car`, `toys/robot`, `at-the-supermarket/can`, `kitchen-tools/spoon` (purple plastic).
- **Refused:** `beach/rock` (purple, reads as a gem); `weather/sun`, `weather/cloud` (faces); `beach/water`, `camping/water` (plastic bottles, not water); `around-the-house/spoon` (wood or plastic cannot be read); `clothing/shoe` (leather cannot be read); cotton, honey, milk, cheese, paper money (contested or food).

**Task line** (≤ 24 px): Sort "Did it come from nature, or did people make it? Drop it in the meadow or on the bench." · Thread "People made these. Pull each thread to what it was made from."

No words on the apparatus: the meadow and the bench are places, not labelled boxes.

## 5. The hand
- **Pick up** (pointerdown on a tray card): lifts 6 px with a shadow within 50 ms; its thread uncurls and trails behind the finger (verlet, gravity 0.4, damped). Dragging fast whips the thread — it is the toy.
- **Drop in the meadow or on the bench:** the thing snaps to the nearest free slot (160 ms ease-out). Then the thread acts — this IS the result (Sort mode):
  - natural in the meadow → thread coils (300 ms) and ties a 12 px bow around the thing's own base (pop). **Right.**
  - made on the bench → spool whirrs (2 turns, 500 ms); the thread is drawn through it, out over the meadow edge to its source's brass ring (600 ms, a gentle Bézier), bow; the source wobbles 3° (240 ms). Plastic/metal: through the spool, knot on the post (400 ms). **Right.**
  - made in the meadow → **miss**: the thread runs out across the grass, through the spool and on to its source (700 ms) and stays drawn 1.2 s; then it recoils and the thing slides back to its tray spot (400 ms). It is NOT placed — the child must place it again.
  - natural on the bench → **miss**: the spool spins empty and rattles (2 fast turns, hollow wood), the thread ties a bow round the thing itself and stays 1.2 s; then the thing slides back to its tray spot (400 ms).
- **Thread mode:** drag a bead to a source. Right source → it clicks into the brass ring, bow, source wobble. Wrong source → the bead slides back along its own thread to the meadow edge (450 ms) and that source's ring gives a small sideways "no" wobble. Plastic/metal things never appear in Thread mode.
- **Pluck** a tied thread (tap): it vibrates (600 ms) and plays its source's note — free play.
- **Undo:** any placed thing can be lifted again until the round succeeds; its thread unties as it lifts.
- Sound (optional): whirr, rattle, pop, harp notes; TTS reads the task line and, on long-press of a thing, its name (5 locales).

## 6. The rounds
One round = one tray, sorted (Sort) or traced (Thread), then Check.

**Sort · Everyday (8 things: 4 natural, 4 made; 2–3 made things have a source):**
| # | natural | made (source) |
|---|---|---|
| 1 | pinecone, seashell, leaf, feather | chair (tree), scarf (sheep), ball (post), glass (sand) |
| 2 | acorn, rock, rose, pinecone | table (tree), sweater (sheep), car (post), jar (sand) |
| 3 | seashell, grass, feather, acorn | pencil (tree), beanie (sheep), can (post), glass (sand) |
| 4 | leaf, rock, pinecone, rose | stool (tree), jar (sand), robot (post), scarf (sheep) |
| 5 | feather, acorn, grass, seashell | bench (tree), sweater (sheep), spoon (post), glass (sand) |
| 6 | rose, leaf, rock, grass | chair (tree), jar (sand), ball (post), beanie (sheep) |
| 7 | pinecone, seashell, acorn, leaf | table (tree), scarf (sheep), car (post), jar (sand) |
| 8 | rock, feather, rose, grass | pencil (tree), glass (sand), robot (post), sweater (sheep) |
| 9 | acorn, pinecone, seashell, rock | stool (tree), beanie (sheep), can (post), jar (sand) |

**Sort · Tricky (9 things; every round has ≥ 2 wooden lures — the log, and made wooden or paper things):**
| # | natural | made (source) |
|---|---|---|
| 1 | log, pinecone, leaf, seashell | chair (tree), notebook (tree), pencil (tree), scarf (sheep), jar (sand) |
| 2 | acorn, log, rock, feather, grass | table (tree), book (tree), sweater (sheep), glass (sand) |
| 3 | log, leaf, rose, seashell | stool (tree), envelope (tree), pencil (tree), beanie (sheep), glass (sand) |
| 4 | pinecone, acorn, log, rock, feather | bench (tree), notebook (tree), jar (sand), scarf (sheep) |
| 5 | log, grass, leaf, rose | chair (tree), book (tree), stool (tree), sweater (sheep), glass (sand) |
| 6 | acorn, log, seashell, pinecone, rock | pencil (tree), envelope (tree), beanie (sheep), jar (sand) |
| 7 | log, feather, rose, leaf | table (tree), notebook (tree), bench (tree), scarf (sheep), glass (sand) |
| 8 | log, pinecone, grass, seashell, acorn | stool (tree), book (tree), sweater (sheep), jar (sand) |
natural:made is 4:5 in odd rounds and 5:4 in even rounds, so counting never tells.

**Thread (4 made things per round; every source asked ≥ 1 per round):**
| # | things (answer) |
|---|---|
| 1 | chair (tree), scarf (sheep), jar (sand), notebook (tree) |
| 2 | sweater (sheep), glass (sand), pencil (tree), beanie (sheep) |
| 3 | book (tree), jar (sand), table (tree), scarf (sheep) |
| 4 | glass (sand), stool (tree), sweater (sheep), envelope (tree) |
| 5 | beanie (sheep), bench (tree), jar (sand), glass (sand) |
| 6 | pencil (tree), scarf (sheep), notebook (tree), jar (sand) |
| 7 | sweater (sheep), table (tree), glass (sand), book (tree) |
| 8 | chair (tree), beanie (sheep), envelope (tree), jar (sand) |

- **Answer position:** Sort — tray order is a seeded shuffle constrained so each tray slot holds a natural thing 35–65 % of the time over a pass and never 4 natural in a row (gate-measured over 200 shuffled passes); thread colours follow the slot. Thread — the bench order is shuffled so no source is leftmost in more than 3 of 8 rounds. The three sources stand in fixed places in the meadow (the place is part of the content; it must be found by meaning, not position).
- **Order:** order-only reshuffle per pass (`nextTask`, §A.13.60); never the same order twice.

## 7. Check, the misses, the success
- **Check with things still in the tray** → hint, no miss: "Some things are still in the tray. Drop each one in the meadow or on the bench."
- Sort drops are judged on release (the thread acts at once), but **nothing sorts itself**: a wrong drop shows the truth and returns the thing to the tray, so the round only finishes when the child has put every thing where it belongs. Misses are counted per thing:
  - **miss 1:** the physics of §5 (the thread's true path shown, then back to the tray). Bubble: made → "People made this. Its thread goes through the workbench." · natural → "Nobody made this. It came from nature, just as it is."
  - **miss 2 (same thing again wrong):** before the thread acts, the right place glows for 1.2 s and the thread's whole path is previewed as a dashed line (through the spool to the source, or a bow on the thing itself) · "Look where the thread goes."
- **Thread — miss 1:** the bead slides back; the wrongly chosen source wobbles "no"; the three sources each do one small bounce, showing the choice · "Is it made from that? Think: wood, wool or glass?" **miss 2:** the right source's brass ring pulses gold · "Try the one that is glowing."
- A new move takes the help away until the next Check.
- **Success** (every thing placed / every bead tied): the threads are plucked left to right with their notes, the sources bounce in turn; bubble: Sort "From nature: {n}. Made by people: {m} — and every thread leads back to nature." · Thread "{list}!" built from the stored clauses used this round ("wood from the tree", "wool from the sheep", "glass from the sand"), joined with `Intl.ListFormat`.

## 8. Settings
1. **Mode:** nature or made · pull the thread — at rest: a full tray vs things on the bench with loose beads.
2. **Things:** everyday · tricky (wood and paper) — at rest: 8 vs 9 cards, and the log, book, notebook, envelope appear.

## 9. Words (EN source)
- title "The Where-From Thread" · instruction "Find out where things come from: nature, or people who made them — and follow each made thing's thread back to the tree, the sheep or the sand."
- prompts: promptSort, promptThread (§4).
- hints: hintTray, hintMade1, hintNature1, hintLook2, hintThread1, hintThread2 (§7).
- celebrations: celebrateSort "From nature: {n}. Made by people: {m} — and every thread leads back to nature." · celebrateLog "The log is still wood, just as it grew. The chair was made from wood by people." (appended after a Tricky round that held the log; the made noun is the round's wooden made thing, stored whole per noun per locale) · clauseWood "wood from the tree" · clauseWool "wool from the sheep" · clauseGlass "glass from the sand" · celebrateThread "{list}!".
- aria: ariaMeadow "the meadow — things from nature" · ariaBench "the workbench — things people made" · ariaTied "{thing} is tied to the {source}" · ariaSelf "{thing} came from nature" · ariaPost "{thing}: made by people".
- settings: setMode "Mode" · modeSort "Nature or made" · modeThread "Pull the thread" · setThings "Things" · thingsEveryday "Everyday" · thingsTricky "Tricky (wood and paper)".
- **Locale traps:**
  - "Man-made" is never used (gendered, and fr "fabriqué par l'homme" is the same problem); the stage needs no category noun — the bench and the meadow carry the meaning. Prose uses "made by people" (de "von Menschen gemacht", fr "fabriqué par les humains", fi "ihmisen tekemä").
  - The three clauses are stored whole per locale, never assembled: de "Holz vom Baum, Wolle vom Schaf, Glas aus Sand" (vom/aus differ), fi elatives "puu puusta… villa lampaasta… lasi hiekasta", fr contractions "le bois vient de l'arbre".
  - Picture labels: `rock` reads "cliff" in 8 locales from vocab (the G1-399 trap list) → panel literals (de Stein, fr caillou, es piedra, pt pedra, it sasso, nl steen, sv/da sten, no stein, fi kivi). `sand` vocab must be the material (fi hiekka, de Sand).
  - Paper from trees is in every one of the 11 school programmes; glass from sand is stated at early-years level in de/sv/fi materials units — the reviewer confirms for each locale.
  - Counts in celebrateSort are bare numerals after a colon (no noun agreement needed; fi partitive avoided by design).

## 10. Sound off, access, phones
- Sound off: every result is motion — the bow on the thing itself, the spool spinning full or empty, the tow back, the bow at the source.
- Keyboard: Tab through tray cards; Enter lifts; ← / → choose meadow or bench; Enter drops. Thread: Tab to a bead, ← / → cycle the three sources, Enter ties. Space plucks a focused thread.
- aria-live announces each result.
- Taps: tray cards ≥ 64 px at 320; beads have a 44 px hit circle; Check and controls 48 px.
- Pictures: tray 96 px, sources 104 px at 704; ≥ 64 px at 360.
- Fold at 360 × 740: header 56 + task 52 + tray 2 × 72 + meadow 150 + bench 160 + Check 56 = 618 px. At 320 × 640: 56 + 52 + tray 2 × 72 + meadow 130 + bench 140 + Check 56 = 578 px. Check above both folds.

## 11. Distinct from
- **Sorting Chutes** (row 35: conveyor into graph tubes) and the **sorting-hoops** tool (hidden attribute rule): here the result is a thread that reveals the making, not a container.
- **The Bin Windows** (241, same batch): finished things by material, forwards in time; here the thread runs backwards to the source.
- **Mother and Baby** (233) and **The Life Test** (242): different science and mechanic. No premium tool uses a thread-to-source mechanic.

## 12. Build plan
- **Model (core):** `state = { mode, set, roundIdx, items:[{key, theme, noun, kind:'natural'|'made', source:'tree'|'sheep'|'sand'|null, placed:null|'meadow'|'bench', tied:null|'self'|'tree'|'sheep'|'sand'|'post', misses:0}] }`. `drop(i, place)` → `{result:'right'|'shown', path}` — natural+meadow → placed, tied self; made+bench → placed, tied source ‖ post; made+meadow → `shown` (path to the source), **placed stays null**, miss++; natural+bench → `shown` (bow on itself), placed stays null, miss++. `check()` succeeds only when every item is placed. `pull(i, source)` → right iff equal. `check()` → hint or success. `nextTask({index})` order-only reshuffle.
- **Gate ground truth (`verify-where-from-thread-core.js`, its own table):** a hand-written class+source row per item; §6 counts per round; ≥ 2 wooden lures per Tricky round; every Thread round asks each source; every picture key exists in its theme JSON (throws); no refused picture; no B&W theme (localized marker list); per-slot natural share 35–65 % over 200 passes; celebrate counts ≥ 1.
- **Mutations (one per rule):** a wrong drop stays placed (auto-sorted) · natural accepted on bench · made accepted in meadow · wrong Thread source accepted · plastic given a source · post unused · round with 0 natural · Tricky round with < 2 lures · `rock` label from vocab · fixed shuffle · thread colour by answer · miss 2 shows no glow · Check with tray items succeeds.
- **Contact-sheet checks (96 and 64 px):** chair/table/stool/bench read as wood; sweater/scarf/beanie read as knitted; glass/jar read as clear glass; rock as a plain stone.
- **Ruling (critic, settled — §3):** the sawn `camping/log` is NATURAL (cut, not made into a new thing). The gate asserts the log is `natural` in every round it appears and that every Tricky round pairs it with ≥ 1 wooden made thing.
- **Code note:** NGSS has no K natural/made PE; 2-PS1-1 (describe and classify materials) is the closest — kept.
- **BLOCKED:** nothing. Wanted later (labels for library files that exist): `kitchen-tools/cutting_board`, `kitchen-tools/rolling_pin` (more wooden lures); a cotton plant would add a fourth source.

## 13. The four questions
1. **Choose it again?** A thread that follows the finger, a spool that whirrs or rattles, threads that zip across and tie bows, a harp at the end — yes.
2. **On the board?** "Where did your chair come from?" — the answer is a line from the chair through the workbench to the tree; the wooden-lure rounds make the class argue.
3. **Parent trust?** Calm, library pictures, no scores, results shown not told, contested items refused.
4. **The invention:** "Every made thing's thread passes through the workbench spool on its way back to the tree, the sheep or the sand; a thing from nature ties its thread around itself."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Nothing sorts itself any more.** A wrong drop used to tow the thing to the right side and count it as placed, so a child could dump the whole tray anywhere and still finish. Now the thread shows its true path for 1.2 s and the thing goes back to the tray; Check succeeds only when every thing is placed right (§3, §5, §7, model, a new mutation).
- **Log ruling settled:** made = people turned the material into a new thing; cutting or picking is not making, so the sawn log (bark on) is natural and the chair is made — the Tricky lure pair. Stated in §3, a one-line celebrateLog, gate-asserted. Every round table already puts the log on the natural side (checked).
- **Picture floor:** meadow cells were 84 px and bench slots 88 px at 704 (under the 96 px floor). The stage now uses the full width (stacked layout) with 100 px cells/slots and 96 px pictures; at 320 the tray grows a row instead of shrinking pictures under 64.
- Checked on 64/90 px sheets: every key exists in its theme JSON; chair/table/stool/bench read as wood, sweater/scarf/beanie as knit, glass/jar as clear glass, camping/rock as a grey stone, summer/sand as a sand heap. Natural:made alternates 4:5 / 5:4 in Tricky; Everyday has 2–3 sourced made things per round.
