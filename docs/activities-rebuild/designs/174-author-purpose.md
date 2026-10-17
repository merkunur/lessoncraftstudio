# Row 174 — The Harbor Post → THE THREE HARBOR MACHINES (RI.2.6)

## 0. Identity
- **id** `author-purpose.why-wrote.ri-2-6` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv/da/no/fi get new slug, title and intro at build, grade 2) · CCSS RI.2.6 ("identify the main purpose of a text, including what the author wants to answer, explain, or describe") · strand Reading: Informational Text · own files `harbor-machines-core.js` (new), `author-purpose-activity.js` (rewritten), html, `author-purpose-activities.json` (notes kept + 9 new).
- **Frozen promise kept true:** "help Marlow the pelican sort harbor notes by why the author wrote them. Read each short note, then send it to the right bin — to tell facts, to tell a fun story, or to show you how to do something." The three "bins" become three harbor machines that *use* a note; their frozen labels stay (`binLabels`, and the kept de/fr/es/pt/it/nl `binLabelsL10n`). Marlow is the library `beach/pelican` (pt keeps the name «Marujo», it «Marino», as ruled for the old activity).
- **Worksheets covered:** none mapped.
- **Old activity:** 9 notes (3 inform, 3 entertain, 3 instruct, kept in 7 locales), tap one of three shuffled bins; correct → the bin glows. **Kept:** all 9 notes verbatim (6 in Level 1, 3 in Level 2) in every kept locale, the three purpose labels, Marlow. **Changed:** a bin is now a machine that runs on its own kind of sentence, so the child sees *why* a note belongs; both levels now mix kept notes with 15 new notes (6 short + 9 longer) whose main purpose is clear but that break the cheap clues the old notes taught (every story ended in "!", every how-to started "To …, first").

## 1. The pitch
"Each note goes into one of three harbor machines, and each machine runs only on its own kind of sentence — the lighthouse lights a lamp for every fact, the stage raises its curtain for every bit of story, the crane lifts a crate for every step you can follow — so the note powers the machine its author wrote it for, and sputters in the others."

## 2. Why a child will want it again (the fun)
- **A harbor of machines.** Along the quay (a plain board, apparatus) stand three machines, each a toy you want to poke: the library **lighthouse** (`beach/lighthouse`, red-and-white) with a drawn three-lamp gauge on a bracket beside its lantern; the library **stage** (`music/stage`, red velvet curtains) with a drawn curtain panel hung in front of its opening and three drawn footlight dots on its edge; and the library **ship** (`vehicles/ship`) at a drawn crane — the crane is apparatus geometry only (a mast line, a jib line, a hook), with three numbered crates (drawn boxes) on the dock. Under each, its sign: "To tell facts", "To tell a fun story", "To show how to do it".
- **Posting a note.** Marlow (library pelican, 96 px) holds the note on a sheet of paper. The child drags the note (or taps a machine) and Marlow flies it over and drops it into the machine's mail slot.
- **The machine reads it, sentence by sentence.** Each sentence of the note lights up in turn (180 ms) and, if it is the machine's kind, a coloured thread runs from that sentence to the machine and powers one part: a lamp ring glows gold; a footlight comes on and the curtain rises a third; a crate is hooked and swung onto the ship in its number order. A sentence of another kind gives a dry little *fzzt* and its thread falls slack.
- **The machine runs.** When most of the note's sentences powered it, it runs: the lighthouse beam sweeps across the sea; the drawn curtain panel lifts away to show the library stage picture behind it and a spotlight blooms (no characters are drawn — just light and a twirl of confetti); the crane loads the last crate and the ship toots and sails off a little way. In the wrong machine the note sputters (one lamp flickers out, the curtain jams half-way, the crane lifts nothing) and Marlow takes it back.
- **The earned show:** a run machine stamps the note with its icon (beam, mask, hook) and Marlow files it in the post office's pigeonholes — three columns that fill over a pass.
- **Free play:** tap any machine to make it run on its own (beam sweep, curtain twirl, crane swing); drag a filed note back out and post it into another machine to see it sputter.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RI.2.6):** identify the main purpose of a short text — to tell facts (inform/explain), to tell a fun story (entertain), to show how to do something (instruct) — by what its sentences do for the reader.
- **Misconception 1 — purpose by surface clue** ("it has an exclamation mark, so it's a funny story"; "it says *first* and *then*, so it's how-to"). **Push back:** Level 2's giraffe note ("It can be as long as your arm!") powers all three lamps; the caterpillar note ("First … Then … Last …") powers no crate — none of its sentences tells *you* to do anything — and all three lamps; the hen story starting "First, Rosa …" powers the stage, not the crane.
- **Misconception 2 — one sentence decides** (a facts note ending "Look under a wet leaf to find one!" is called how-to). **Push back:** in the crane only that one crate lifts and the crane stalls; in the lighthouse two lamps of three light and the beam still sweeps. *Main* purpose = what most of the note is doing.
- **Misconception 3 — a story about a real animal is a facts text** (the bear wanting honey). **Push back:** in the lighthouse the bear sentences give *fzzt* (they are events that happened to one bear, not facts about bears), on the stage they raise the curtain.
- **The material pushes back** by counting powered parts; the hint never says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: the note + Marlow left (≈ 250 px), the three machines right (≈ 420 px). Stacked below 700 (note on top, machines in one row under it).

**At 704 px:**
- **The note** (left, 240 × 260): cream paper with a torn top edge; the note's sentences on separate lines, 19 px Nunito, line height 1.5; each sentence is a block (min 44 px tall) that lights while it is being read.
- **Marlow:** `beach/pelican`, 96 × 96, standing below the note.
- **The quay** (right, 420 × 300) with the three machines, each 128 × 220 including its sign: lighthouse (library `beach/lighthouse` at 64 × 160 — a slim tower, so its three lamps are NOT drawn on it but on a gauge bracket of three 22 px lamp dots beside the lantern; the beam is a drawn light wedge), stage (library `music/stage` 120 × 110, with a drawn curtain panel over its opening that rises a third per powered sentence, and three 16 px footlight dots), crane (drawn mast + jib + hook + 3 numbered crates 28 px on the dock; the library `vehicles/ship` 120 × 72 beside it). Nothing but the three library pictures and the pelican is a picture; lamps, curtain panel, crane lines, crates and threads are apparatus geometry. Signs under each machine: 15 px bold, two lines max ("To tell facts" / "To tell a fun story" / "To show how to do it" — the frozen labels; they are the content).
- **The pigeonholes** (top right, 150 × 34): three short columns of filed-note tokens (drawn, a record).
- **Task line (EN, 22 px):** "Why did the author write this note? Post it in the machine it powers."

**At 360 px:** note 328 × ≤ 230 (17 px text) with Marlow at 64 px tucked at its right edge; machines in one row of three, each 104 × 176 (signs 13 px, three lines max), the row 328 wide; Check ≈ 660 on 360 × 740 (Check = posting; there is no separate Check button); at 320 × 640 note text 16 px, machines 96 × 160, the quay ≈ 590.
- **No other words on the apparatus:** crate numerals 1–3 and the three purpose signs only.

## 5. The hand
- **Post:** drag the note onto a machine (it snaps to the mail slot when within 60 px), or tap a machine — Marlow carries the note there (400 ms flight). Posting = Check.
- **The reading:** each sentence lights for 180 ms in order; a powered part responds within that time (thread 160 ms, lamp/footlight/crate 200 ms); a non-matching sentence *fzzt*s (100 ms). Run / sputter after the last sentence (run 900 ms, sputter 500 ms).
- **Undo:** a sputtered note flies back to Marlow automatically; a run note can be dragged back out of the pigeonhole in free play.
- **Long-press a sentence** → TTS where a voice exists.
- **Keyboard:** 1 / 2 / 3 post to the lighthouse / stage / crane; Tab through sentences (each announced with its text).
- **Sound:** paper flutter, mail-slot *clunk*, a rising tone per powered part (bell for a lamp, drum tap for a footlight, chain clank for a crate), *fzzt*, then the machine's run sound (foghorn hum, applause shimmer, ship's toot).

## 6. The rounds
One round = one note. **12 per level (4 per purpose)**, order-only reshuffle per pass. The machines never move (left lighthouse, middle stage, right crane), so the answer's place is set by the note's purpose, and each level is 4/4/4. **Critic restructure:** the 9 kept notes taught three perfect surface cues together — every story ends in "!", every how-to opens "To …, first", every facts note has neither — so a level made only of them is solved 9/9 without reading. The kept notes are now split across both levels (6 + 3) and every level mixes them with notes that break those cues.

Each sentence carries a **role** in the data: `fact` (true for anyone, about the world), `story` (something that happens to a character), `step` (tells the reader to do something), or `none` (a hook such as a question). A machine runs when **more than half** of the note's sentences are its role.

**Level 1 — First look (6 kept notes verbatim + 6 new two-sentence notes that break the kept notes' cues)**
| id | note | roles | machine | |
|---|---|---|---|---|
| ap-i1 | Owls sleep in the daytime and hunt at night. Their soft feathers help them fly without making a sound. | fact, fact | lighthouse | kept |
| ap-i2 | The sun is a giant ball of hot, glowing gas. It gives our planet light and warmth every day. | fact, fact | lighthouse | kept |
| ap-i7 | An octopus has three hearts! Two of them pump blood to its gills. | fact, fact | lighthouse | new — "!" in a facts note |
| ap-i8 | Long ago, huge dinosaurs walked on the Earth. Then, millions of years ago, they died out. | fact, fact | lighthouse | new — past tense + "Then" in a facts note |
| ap-e1 | Pip the puppy chased his tail round and round. He spun so fast he flopped into the leaves! | story, story | stage | kept |
| ap-e2 | A silly frog tried to catch the moon in the pond. He splashed all night, but the moon just winked! | story, story | stage | kept |
| ap-e7 | A small turtle wanted to see the sea. He walked for three days and found a puddle instead. | story, story | stage | new — no "!", no name |
| ap-e8 | First, the little mouse found a big piece of cheese. Then she tried to push it home and rolled down the hill with it. | story, story | stage | new — "First … Then" in a story |
| ap-s1 | To make a paper boat, first fold the paper in half. Next, fold the corners down. Then shape the boat. | step, step, step | crane | kept |
| ap-s2 | To plant a seed, first dig a small hole. Then drop the seed in. Last, give it some water. | step, step, step | crane | kept |
| ap-s7 | Hold the kite string tight. Run into the wind and let the kite go up. | step, step | crane | new — no "To …, first" |
| ap-s8 | Clap your hands two times! Now stamp your feet and clap once more. | step, step | crane | new — "!" in a how-to |
Two-sentence notes power two of the machine's three parts and that is "more than half": the third part lights by itself when the machine runs (the lamp room is complete). Facts checked: an octopus has three hearts (two pump blood through the gills); the big dinosaurs died out about 66 million years ago.

**Level 2 — Mostly … (3 kept notes verbatim + 9 new notes: the main purpose is clear, the cheap clues are broken)**
| id | note (new, EN) | roles | machine | the clue it breaks |
|---|---|---|---|---|
| ap-i3 | Honeybees live together in a busy hive. They turn flower nectar into sweet, golden honey. | fact, fact | lighthouse | kept |
| ap-e3 | Mabel the cat thought she was a lion. She roared at a feather and pounced on a sock! | story, story | stage | kept |
| ap-s3 | To wash your hands, first turn on the water. Next, scrub with soap. Then rinse and dry them. | step, step, step | crane | kept |
| ap-i4 | A giraffe's tongue is dark blue and very long. It can be as long as your arm! Giraffes use it to pull leaves off tall trees. | fact, fact, fact | lighthouse | "!" is not a story |
| ap-i5 | Snails carry their shells everywhere they go. A snail's shell grows bigger as the snail grows. Look under a wet leaf to find one! | fact, fact, step | lighthouse | one tip at the end does not make it how-to |
| ap-i6 | First, a caterpillar eats and eats. Then it makes a hard case around itself. Last, a butterfly comes out. | fact, fact, fact | lighthouse | "first, then, last" without telling YOU to do anything |
| ap-e4 | First, Rosa the hen laid an egg. Then the egg began to wobble and roll. Out popped a duckling, and Rosa squawked in surprise. | story, story, story | stage | a story can use "first, then" |
| ap-e5 | A little bear wanted honey for breakfast. He climbed the tallest tree and found an empty hive. So he ate porridge, with a very grumpy face. | story, story, story | stage | no name, no "!" — still a story |
| ap-e6 | Lola the cat always slept in the sunny window. One day a bird landed outside and sang to her. Cats really do love warm, sunny spots. | story, story, fact | stage | one fact at the end does not make it a facts note |
| ap-s4 | Fill a cup with water. Drop in two ice cubes. Watch them shrink as they melt. | step, step, step | crane | no "first/next" — still how-to |
| ap-s5 | Do you want to feed the birds? Spread some seeds on a flat plate. Put the plate up high, away from cats. | none, step, step | crane | starts with a question |
| ap-s6 | Gran's sunflowers grew taller than the door. To grow one, push a seed into soft soil. Water it every day and wait. | story, step, step | crane | a name and a past-tense opener, but most of it is steps |
(The picture rulings forbid a soap picture; no note shows a picture, so ap-s3's "soap" is text only.)

- **Shortcut bots, re-measured by the critic (`work-c35/harbor-c35.js`, EN; chance 4/12):** the kept-note rule ""!" → stage, first/next/then/last → crane, else lighthouse" sorts **6/12 in Level 1 and 3/12 in Level 2** (it sorted the old 9-note Level 1 **9/9** — the defect this restructure removes); ""!" → story" is right 2 of the 4 times it fires (L1) and 1 of 3 (L2); "sequence word → how-to" 2 of 4 (L1), 1 of 3 (L2); "past tense → story" 4 of 6 in both levels. The one cue that stays strong — "a sentence that tells YOU to do something → how-to" (4/4 in L1, 4/5 in L2, broken by ap-i5) — is not a surface cue: it IS the definition of an instruction text, and the role `step` is exactly that.
- **Answer position:** fixed machines, 4/4/4 per level; note order shuffled per pass (never the same order twice), and never three notes of one purpose in a row (gate).

## 7. Check, the misses, the success
- Posting is the Check. **Tapping the quay with no note** → no miss; Marlow flaps. Hint: "Read the note, then post it in a machine."
- **Miss 1 — what the machine SHOWS:** the note is read in the wrong machine: the sentences that are not its kind *fzzt* with slack threads, the few that match power a part, the machine sputters, and — the key showing — each *fzzt* sentence gets a small coloured dot in the colour of the machine it WOULD power (gold lamp / red footlight / blue crate). Hint: "This machine only lit {n} of {m}. Look at the coloured dots on the note."
- **Miss 2 — the stronger showing:** all three machines read the note at once, side by side (each sentence's thread runs to whichever machine it powers), and the note waits in front of Marlow. The machines do not glow — the child counts. Hint (never names the answer): "Count the threads. Which machine has the most?"
- A new post removes the help until the next post.
- **Success:** the machine runs (beam / curtain / ship), the note is stamped and filed. Bubble — inform: "Lights on! The author wrote this to tell facts about {subject}." · entertain: "Curtain up! The author wrote this to tell a fun story about {character}." · instruct: "All loaded! The author wrote this to show you how to {task}." (subject / character / task are authored per note, e.g. "owls", "Pip the puppy", "make a paper boat"). Level 2 adds the "mostly" line when a note had an odd sentence: "Most of it tells facts — the tip at the end is just a little extra."

## 8. Settings (each visibly changes the board at rest)
1. **Notes:** First look / Mostly … — at rest the note on Marlow's paper is a two-sentence note (Level 1) or a three-sentence note (Level 2); the machines show three parts each in both.
2. **Machines:** Three / Two — "Two" hides the crane (facts vs story only, 8 rounds per level: that level's 4 inform + 4 entertain notes), for children meeting the idea for the first time.

## 9. Words (EN source; native authors write the other 10)
- title (frozen) "The Harbor Post" · instruction: "Why did the author write this note? Post it in the machine it powers."
- machine signs (KEPT, frozen): "To tell facts" · "To tell a fun story" · "To show how to do it" (de "Es nennt Fakten" / "Es erzählt eine Geschichte" / "Es zeigt, wie es geht", and the kept fr/es/pt/it/nl labels).
- hints: empty "Read the note, then post it in a machine." · miss1 "This machine only lit {n} of {m}. Look at the coloured dots on the note." · miss2 "Count the threads. Which machine has the most?"
- success: "Lights on! The author wrote this to tell facts about {subject}." · "Curtain up! The author wrote this to tell a fun story about {character}." · "All loaded! The author wrote this to show you how to {task}." · mostly "Most of it {tells facts | tells a story | tells you what to do} — the {last|first} sentence is just a little extra."
- settings: "Notes" — "First look" / "Mostly …" · "Machines" — "Three" / "Two"
- aria: sentence "Sentence {i}: {text}" · machine "{sign}: {k} of {m} parts lit" · Marlow "Marlow holds the note".
- **Locale traps.** (1) The kept notes are native in 7 locales — keep them; sv/da/no/fi notes are written natively at build (rebuild, never translate). (2) **How-to grammar differs:** en/fr/es/it/pt/nl/sv/da/no/fi use imperatives ("Fill a cup"), but **de school how-to texts use "du" statements** ("Zuerst faltest du …" — the kept de notes) — so the *role* `step` is defined as "tells the reader what to do", never "starts with a verb"; the gate's verb-start bot is run per locale with the locale's own pattern. fi also often uses the infinitive in recipes ("Täytä kuppi" imperative is the school form — native author decides, consistently). (3) Names: keep each locale's kept names (Pip, Mabel; pt Marujo, it Marino for the pelican). New Level 2 names (Rosa, Lola, Gran) are chosen by each native author; "Gran" becomes the locale's grandmother word (de Oma, fr Mamie, es la abuela, it la nonna, pt a vovó, nl oma, sv mormor/farmor → "Mormor", da mormor, no bestemor, fi mummi). (4) Every `fact` sentence (the giraffe's tongue "as long as your arm", snail shells growing, the caterpillar's case) is checked true by the native/pedagogy reviewer; ap-e4 is plainly fiction (a hen surprised by a duckling) and is tagged story. (5) The {subject}/{task} fills in the success line are authored per note in each locale (case/gender handled by the author, e.g. fi "kertoa tietoa pöllöistä").

- (6) **The cue-breakers must break the cue IN EACH LOCALE:** ap-i7 keeps its exclamation, ap-i8 its past tense and sequence word, ap-e7 has no name and no exclamation, ap-e8 opens with the locale's "first … then", ap-s7 has no "To …, first" opener (de: no "Zuerst … du"), ap-s8 keeps its exclamation; the cue-rule bot is re-run on each locale's text and must stay ≤ 6/12 per level.
## 10. Sound off, access, phones
- Legible with the sound off: threads, lit parts and coloured dots carry everything; TTS bonus.
- Keyboard §5; aria-live: "Sentence 3: no lamp. 2 of 3 lamps lit. The lighthouse shines." / "The crane lifted 1 of 3 crates and stopped."
- Reduced motion: parts switch on without swings; the ship does not sail, it just glows.
- Taps: machines ≥ 96 × 160 px (the whole machine is the target), note sentences ≥ 44 px.
- Pictures: Marlow 96/64 px.
- Posting area above the fold at 360 × 740 (≈ 660) and 320 × 640 (≈ 590).

## 11. Distinct from
- **Row 118 Bea's Two Bookshelves (RL.1.5):** fact book vs story book by shaking pages into a new order — a structural test of whole books. Here: three purposes, decided per sentence by what each sentence does for the reader, and "main" purpose by majority.
- **Row 66 Inky's Two Inks** (author vs illustrator), **Row 121 Field Guide** (text features).
- **Siblings:** 173 (main topic: what a text is about), 175 (reasons for a point).
- No premium tool sorts texts.

## 12. Build plan
- **Core `HarborMachinesCore`:** note `{id, level, purpose, sentences:[{text, role}], subject|character|task}`; `read(note, machine)` → `{powered:[i…], fizz:[i…], runs: powered.length > sentences.length/2}`; `mainMachine(note)`; `missDots(note)`; `order(level, pass)` with the "no three of a purpose in a row" rule; `nextTask`.
- **Gate's truth (`verify-harbor-machines-core.js`):** an independent EN table of purposes; for every locale and level: exactly one machine runs for each note (no note has a 50/50 split; no note runs two machines); the 9 kept notes byte-equal (6 in Level 1, 3 in Level 2); the kept-note cue rule sorts ≤ 6/12 per level; Level 2 notes each break their listed clue (per-locale pattern tables for "!", sequence words, names, verb-start); the five cue bots' scores ≤ the numbers in §6 (none sorts more than 3 of 4 of its own trigger set except the "tells YOU to do" step test, none sorts a whole level); 4/4/4 per level; two-machine mode uses only inform/entertain notes (≥ 7 rounds); success strings carry the per-note fill.
- **Mutations (each killed):** a story note runs the lighthouse · ap-i5 runs the crane · ap-i6 lifts crates for "first/then/last" · machine runs with exactly half · miss dots in the wrong colour · machines shuffled · a kept note edited · a level made only of kept notes · two-machine mode still shows the crane · reshuffle repeats or allows three of a purpose in a row · sputter keeps the note in the machine.
- **Pictures:** `beach/pelican` ✓ (white pelican, orange beak), `beach/lighthouse` ✓ (slim red-and-white tower — lamps go on a gauge beside it, ruling), `music/stage` ✓ (red velvet curtained stage), `vehicles/ship` ✓ (mid-size ship with cabin) — all seen on the contact sheets. Drawn: lamp gauge, curtain panel, crane lines, crates, threads (apparatus). **Risks:** sentence-role tagging in 10 locales is a native judgement — the one reviewer checks every role. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a lighthouse that sweeps its beam, a curtain that rises, a crane that loads a ship that toots off, and the funny sputter when you post a note in the wrong machine.
2. **Would a teacher put it on the board?** Yes — it makes "why did the author write this?" a matter of what each sentence does for the reader, and it teaches *main* purpose with notes that mix a little of another kind.
3. **Would a parent trust it?** Gentle notes about owls, giraffes and grumpy bears; library pelican; no score.
4. **The invention:** three harbor machines that each run only on their own kind of sentence — facts light the lighthouse, story raises the curtain, steps load the crane — so a note proves its purpose by powering the machine it was written for.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Level 1 was solvable without reading:** the 9 kept notes carry three perfect cues ("!" = story, "To …, first" = how-to, neither = facts) — a cue bot sorted them 9/9. The kept notes are now split 6 + 3 across both levels and each level gets new notes that break exactly those cues (an octopus fact with "!", a dinosaur fact in the past tense with "Then", a story with no name and no "!", a story with "First … Then", a how-to with no "To", a how-to with "!"). Measured: the cue rule now sorts 6/12 and 3/12 (chance 4/12). Levels are 12 notes, 4/4/4.
- **Hand-drawn objects replaced by library pictures:** `beach/lighthouse`, `music/stage`, `vehicles/ship` (all seen); the lamps sit on a gauge beside the slim tower, the curtain is an apparatus panel over the stage picture, the crane is lines and crates only.
- Kept: all 9 notes verbatim, the frozen bin labels, Marlow, the majority-of-sentences rule (the invention).
