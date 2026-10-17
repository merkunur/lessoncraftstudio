# Row 82 — Vet's Diagnosis Window → THE STORY FILM (1.OA.A.1)

## 0. Identity
- id `vet-diagnosis.word-problems.1-oa-a-1` (KEPT; slugs/metadata frozen en..nl; sv/da/no/fi slug, title and intro are new at build, grade 1) · grade 1 · CCSS 1.OA.A.1 · Operations & Algebraic Thinking · own files `story-film-core.js`, `story-film-activity.js`, `story-film-activity.html`, `story-film-activities.json` (the row leaves `vet-diagnosis-activities.json`, which is emptied to `[]`; the id is unchanged).
- page title (frozen): "Vet's Diagnosis Window — Word-Problem Modeling". Page intro (frozen) stays true word for word: a shy animal arrives, the x-ray acts out what happened, the child places each amount in its spot, marks the mystery part, dials the answer, the x-ray clears and the patient heals.
- worksheets covered: **G1-213** Picture Word Problems · **G1-238** Addition Word Problems · **G1-239** Subtraction Word Problems · **G1-240** Word Problems Within 10 (level "Within 10") · **G1-241** Word Problem Practice (levels "Within 10" + "Within 20") · **G3-370 … G3-376** Multiplication and Division Word Problems, Sharing, Making Groups, Two Ways, Multiply and Group, Mixed (level "Groups").
- old activity: 14 stories (add to, take from, put together, compare; unknown in every position) translated in 7 locales; tap a tile, tap an iconic slot, mark the "?", leave a decoy, dial 0–20, "Diagnose". **Kept:** all 14 stories and their situation kinds, the three diagrams (change / bracket / compare), the decoy tile, "place → mark → dial", the DERIVED answer (no `answer` field — the number is computed from the model), every locale's text as the starting point. **Changed**, each for a reason: the eggs story becomes ladybugs (the only egg in the library is a painted Easter egg); the "red/blue birds" story becomes butterflies and bees (critic: the library robin and sparrow are both drawn orange-breasted — near-twins side by side — and there is no blue bird); the socks story no longer names colours (the only sock picture is one green striped sock); four stories get new numbers so that the answer 7 no longer appears five times; the dial no longer offers 0. **Added:** a Within 10 level, the two missing situation kinds (add to · result, put together · total) and a Groups level (equal groups, sharing, making groups).

## 1. The pitch
"Whatever you put on the light box, the x-ray plays it as a film — if your numbers ARE the story, every frame lines up with its sentence and the fog lifts; if they are not, you can see exactly which frame does not fit."

## 2. Why a child will want it again (the fun)
- **A real x-ray light box.** The patient (a library animal: hedgehog, squirrel, rabbit, fox, raccoon, mouse, badger, beaver, hamster — a new one each round) arrives as a glowing blue negative: the same library picture under an x-ray filter. Beside it, the light box: frames of glowing dots. It feels like being the vet.
- **The film plays YOUR model.** No hidden key: the projector really runs the numbers the child put on the frames. Dots stream through the chute, land in the last frame, and either fill it exactly, spill over its rim, or leave dark empty sockets. Pressing play on your own film is the toy.
- **The healing.** When the film fits the story, the fog peels off the light box from the middle out, the patient fades from x-ray blue back to full colour, a plaster (library hospital/bandage, 64 px) floats onto its shoulder and it does a happy hop (12 px, twice, 160 ms each). The story's question completes itself with the number.
- **Free play ("Film lab"):** an empty light box with a dial on every frame; the child dials a start and a change, flips the chute between "come in" and "go away", and presses play: the film runs and the sentence builder underneath writes "8 are there. 5 more come. Now there are 13." — a toy for inventing stories.

## 3. The skill and the misconception
- **Skill (1.OA.A.1):** use addition and subtraction within 20 to solve word problems of adding to, taking from, putting together, taking apart and comparing, with the unknown in all positions, by modelling with drawings and an equation with a symbol for the unknown. (G3 sheets: equal groups — total unknown, sharing = size of a group unknown, making groups = number of groups unknown.)
- **Misconception 1 — number grab / keyword ("more" means add):** "Bo has some shells. Bo gets 4 more. Now Bo has 13." → 4 + 13 = 17. **Push back:** 13 belongs on the last frame (its sentence says "now"). Running the film from a first frame of 17: 17 dots, 4 more stream in through the "+" chute, 21 dots crash into a last frame drawn for 13 — eight dots spill over its rim and hang outside, glowing. The film shows that 17 cannot be the start.
- **Misconception 2 — a number in the wrong role:** "12 ducks are on the pond. Some fly away. Now there are 8." with 12 put on the last frame. **Push back:** as the film plays, each frame lights the sentence it stands for. The first frame lights "12 ducks are on the pond" while it holds 8 dots — the sentence's numeral and the frame pulse amber together, joined by a thin amber thread: the story says 12 here.
- **Misconception 3 — compare = the number you read:** "5 dogs. 7 more cats than dogs. How many cats?" → 7. **Push back:** the compare diagram pairs the two rows dot to dot with thin threads; 7 cats against 5 dogs leaves only 2 cats without a partner — not the 7 the sentence says, and the gap frame shows 2 where the story needs 7.
- **Misconception 4 (Groups) — share vs make groups:** both are division, and the film shows them differently: sharing deals the dots round-robin into the trays (one each, one each…), making groups fills one tray full before starting the next. A wrong number leaves the last tray short or dots left over in the total frame.

## 4. The stage
Split layout at ≥ 700 px (light box left, story column right); stacked below 700.

**At 704 px (content 672):**
- **Task line** 22 px, one line: "Put the numbers on the film, mark the mystery, then dial it."
- **Left column 420 px — the light box:** a dark teal-black panel (#13282A) 420 × 380 px, radius 18, a 2 px inner glow (#8FE3D6). Inside, the round's diagram:
  - **change** (add to / take from): three frames stacked, each 380 × 92 px, joined by two chutes (24 px teal funnels). The upper chute carries the icon that IS the story's verb: an arrow pointing IN with a "+" (things come) or OUT with a "−" (things go). Each frame has up to 20 sockets: two rows of 10 at 30 px pitch, dots 24 px, x-ray white (#EAFBF8) with a soft glow. In Within 10 the frames have one row of 10 sockets.
  - **bracket** (put together / take apart): two part-frames side by side (each 184 × 120, 2 rows × 5 sockets at 32 px; 2 × 10 in Within 20 at 16 px) above one whole-frame (380 × 92), joined by a bracket line.
  - **compare:** two long strips (380 × 56, one row of up to 20 sockets at 18 px pitch, dots 14 px) one above the other, left-aligned, with a dashed-bracket gap frame at the right end of the shorter strip — the difference.
  - **groups:** 2–8 round trays (each 84 px, up to 8 sockets in a ring) in rows of 4, plus a total-frame below (380 × 92, up to 30 sockets in 3 rows of 10 at 30 px).
- **Story column 236 px:** the patient picture 120 × 120; the story card under it (cream, 18 px Nunito, story numerals bold teal, ≤ 4 short lines) with a 36 px speaker; under that the story's thing picture 96 × 96 (two side by side at 96 when the story has two kinds: cats + dogs, butterflies + bees, cupcakes + cookies).
- **Tile tray** (under the light box, 420 × 64): three number tiles 64 × 56 px, film canisters (cream, teal rim), numeral 30 px Baloo 2 — the story's two numbers and one decoy, in shuffled order.
- **The dial** (wakes under the tray when a frame is marked as the mystery): a drum 120 × 56 with − and + buttons (52 × 52) at its sides; numbers 1–20 (1–30 in Groups) roll in its window at 32 px.
- **Check** (the shell's Check, labelled "Diagnose") at the bottom of the story column.

**At 360 px (content 336):** stacked: task line (20 px, 2 lines) → one row of patient 72 px + story card (17 px) with the thing picture 64 px at its right edge → light box 336 × 300 (change frames 312 × 72, two rows of 10 at 15 px pitch, dots 12 px; bracket part-frames 150 × 96; compare strips 312 × 44) → tray (3 tiles 72 × 52, 12 px gaps) → dial (drum 100 × 52, buttons 48 px) → Check. Check bottom ≈ 712 px at 360 × 740. At 320 × 640 the patient drops to 64 px, frames to 288 wide; Check ≈ 630 px.

**Pictures (colour themes, verified in the theme JSONs; contact sheets seen 2026-10-17):** patients — forest-creatures/hedgehog, squirrel, rabbit, fox, raccoon, mouse, badger, beaver; pets/hamster. Things — bakery/bun, bakery/cupcake, bakery/cookie, bakery/muffin, miscellaneous/acorn, insects-and-bugs/ladybug, beach/seashell, beach/bucket, farm-animals/duck, farm-animals/goose, fruits/raspberry, fruits/strawberry, fruits/apple, easter/bunny, accessories/sock, pets/cat, pets/dog, insects-and-bugs/butterfly, insects-and-bugs/bee, forest-creatures/frog, at-the-supermarket/basket, kitchen-tools/bowl, kitchen-tools/plate. Healing — hospital/bandage. A picture is never shrunk into a frame: frames hold drawn x-ray dots; the picture is the label (orchestrator ruling).

**Words on the apparatus:** none. Roles are shown by position and the chute icon (+ / −), never by "start / change / result".

## 5. The hand
- **The intro film (each round, ≈ 2.5 s; any tap skips):** the x-ray plays the TRUE story with the unknown fogged — e.g. 12 dots appear in the first frame as "12 ducks are on the pond" lights; a fogged lump slides out of the "−" chute as "Some fly away" lights; 8 dots stand in the last frame as "Now there are 8" lights. Then the dots fade to empty sockets and the tray tiles slide up: the child's turn.
- **Drag a tile onto a frame** (or tap the tile, then the frame): it lifts within 60 ms; on drop it shrinks into the frame's top-left corner as a 24 px numeral badge and the frame fills with that many dots, one every 30 ms with a soft tick. Dropping on an occupied frame swaps the tiles. Drag a badge back to the tray to undo.
- **Tap an empty frame:** it frosts over with a "?" badge (the mystery). One mystery at a time; tapping another frame moves it. The dial wakes.
- **The dial:** + / − or a vertical swipe on the drum; the mystery frame shows that many faint ghost dots through the frost, so the child can model with the dial. The dial starts at 1 and never offers 0.
- **Diagnose (Check):** the film runs the CHILD's model in story order (≈ 2 s). Each frame lights its sentence clause as it plays. Moving dots travel the chute (in or out). The last frame is a fixed outline sized for its own story number: arriving dots fill sockets; extra dots spill over the rim and hang outside; missing dots leave dark empty sockets. A mystery frame plays its dial value.
- **Groups:** the film deals dots from the total-frame into the trays — round-robin for a sharing story, tray by tray for a making-groups story, and for a total-unknown story each tray fills to "in each" and then all pour down into the total-frame.
- **Free play "Film lab":** every frame has its own small dial, a chute toggle (+ / −) and play; the sentence builder writes the story the child built.

## 6. The rounds
One round = one story: intro film → place the two story numbers (leave the decoy) → mark the mystery → dial → Diagnose. In Within 10/20 the decoy is never the answer and never a story number, and its SIZE carries no information: in Within 20 it is the biggest tile in 6 rounds, the smallest in 6 and in between in 4 (critic: the first draft made it the biggest in all 16, so "never use the biggest tile" discarded it every time). Wherever possible it is the number a keyword-grabber would compute with the wrong operation (4 + 13 = 17 in "Bo gets 4 more, now 13"; 7 − 5 = 2 in "7 more cats than dogs") — the misconception's own number sits in the tray, and putting it on the film visibly fails. In Groups the decoy is the SUM of the two story numbers (the child who adds instead of grouping finds that idea already sitting in the tray).

**Level "Within 20" (default) — 16 rounds** (1–14 are the old stories; † changed number, ‡ changed thing):

| # | kind | story (EN) | tiles (decoy last) | mystery | answer |
|---|---|---|---|---|---|
| 1 | take from · result | 9 buns are on a plate. 3 are eaten. How many are there now? | 9, 3, 4 | last frame | 6 |
| 2 | add to · change | Pip has 5 acorns. Pip finds some more. Now Pip has 12. How many did Pip find? | 5, 12, 14 | chute frame | 7 |
| 3 | add to · start ‡† | Some ladybugs sit on a leaf. 6 more land. Now there are 14. How many were there before? | 6, 14, 9 | first frame | 8 |
| 4 | add to · start † | Bo has some shells. Bo gets 4 more. Now Bo has 13. How many did Bo have before? | 4, 13, 17 | first frame | 9 |
| 5 | take from · change | 12 ducks are on the pond. Some fly away. Now there are 8. How many flew away? | 12, 8, 3 | chute frame | 4 |
| 6 | take from · change | 15 raspberries are on a bush. A bird eats some. Now there are 9. How many were eaten? | 15, 9, 11 | chute frame | 6 |
| 7 | take from · start | Some bunnies are hopping. 4 hop away. Now there are 6. How many were there before? | 4, 6, 2 | first frame | 10 |
| 8 | put together · part † | There are 13 apples. 5 are red and the rest are green. How many are green? | 13, 5, 18 | part | 8 |
| 9 | put together · part ‡ | Bo has 11 socks. 4 are in the drawer and the rest are in the basket. How many are in the basket? | 11, 4, 6 | part | 7 |
| 10 | compare · difference † | There are 14 cats and 5 dogs. How many more cats than dogs are there? | 14, 5, 19 | gap | 9 |
| 11 | compare · bigger | There are 5 dogs. There are 7 more cats than dogs. How many cats are there? | 5, 7, 2 | long row | 12 |
| 12 | compare · bigger | There are 6 ducks. There are 5 more geese than ducks. How many geese are there? | 6, 5, 1 | long row | 11 |
| 13 | compare · smaller | There are 12 cats. There are 7 more cats than dogs. How many dogs are there? | 12, 7, 19 | short row | 5 |
| 14 | compare · smaller ‡ | There are 11 butterflies. There are 6 more butterflies than bees. How many bees are there? | 11, 6, 17 | short row | 5 |
| 15 | add to · result (new) | 8 frogs sit on a log. 5 more jump on. How many frogs are on the log now? | 8, 5, 3 | last frame | 13 |
| 16 | put together · total (new) | There are 9 cupcakes and 8 cookies on a tray. How many treats are there? | 9, 8, 1 | whole | 17 |

**Level "Within 10" — 10 rounds** (G1-240): Bo has 4 shells and gets 3 more → **7** (add to · result; tiles 4, 3, 1) · Pip has 2 acorns, finds some more, now 6 → **4** (add to · change; 2, 6, 8) · some ladybugs, 3 more land, now 8 → **5** (add to · start; 3, 8, 2) · 8 buns, 2 are eaten → **6** (take from · result; 8, 2, 10) · 9 ducks, some fly away, now 6 → **3** (take from · change; 9, 6, 5) · some bunnies, 3 hop away, now 5 → **8** (take from · start; 3, 5, 2) · 4 red apples and 5 green apples → **9** (put together · total; 4, 5, 1) · Bo has 10 socks, 4 in the drawer, the rest in the basket → **6** (put together · part; 10, 4, 7) · 7 cats and 3 dogs, how many more cats → **4** (compare · difference; 7, 3, 10) · 2 dogs, 5 more cats than dogs → **7** (compare · bigger; 2, 5, 3). Decoy biggest 3 / smallest 5 / between 2 (gate-recomputed).

**Level "Groups" — 9 rounds** (G3-370 … 376; diagram groups: trays / in each / total):
| # | kind | story (EN) | tiles (decoy last) | answer |
|---|---|---|---|---|
| 1 | equal groups · total | There are 4 baskets with 5 apples in each basket. How many apples are there? | 4, 5, 9 | 20 |
| 2 | equal groups · total | There are 6 bowls with 3 strawberries in each bowl. How many strawberries are there? | 6, 3, 9 | 18 |
| 3 | equal groups · total | There are 5 plates with 2 buns on each plate. How many buns are there? | 5, 2, 7 | 10 |
| 4 | share · in each | 12 cookies are shared equally on 3 plates. How many cookies are on each plate? | 12, 3, 15 | 4 |
| 5 | share · in each | 4 squirrels share 20 acorns equally. How many acorns does each squirrel get? | 20, 4, 24 | 5 |
| 6 | share · in each | 18 shells are shared equally into 6 buckets. How many shells are in each bucket? | 18, 6, 24 | 3 |
| 7 | make groups · trays | There are 15 strawberries. 5 go in each bowl. How many bowls are needed? | 15, 5, 20 | 3 |
| 8 | make groups · trays | There are 16 socks. 2 socks make a pair. How many pairs are there? | 16, 2, 18 | 8 |
| 9 | make groups · trays | There are 24 muffins. 6 go on each plate. How many plates are needed? | 24, 6, 30 | 4 |

**One right answer each; never 0;** every story number and answer ≥ 1; the answer never equals a story number.
**Answer position:** the answer is dialled — nothing to pick between. Balanced and measured: (a) the three tiles are shuffled per round; the decoy's size rank is spread (Within 20: biggest 6 / smallest 6 / between 4; Within 10: 3 / 5 / 2), so "drop the biggest tile" and "drop the smallest tile" each discard the decoy in ≤ 40 % of rounds (gate-measured); (b) the mystery's place, Within 20: change diagram — first frame 3, chute 3, last frame 2; bracket — part 2, whole 1; compare — gap 1, long row 2, short row 2 (every place a child could guess appears, none more than 3 times); (c) after the shuffle no two adjacent rounds share an answer and no kind runs more than 2 in a row (10 000 seeds).
**Order:** order-only reshuffle per pass; never the same order twice.

## 7. Check, the misses, the success
- **Diagnose with a frame still empty:** no miss; the empty frame pulses; bubble: **"Every frame needs a number or the mystery mark."**
- **Diagnose with no mystery marked:** no miss; bubble: **"Which part of the story don't we know? Tap that frame."**
- **Miss 1:** the film plays the child's model and STOPS at the first frame that does not fit: either (wrong place) the frame and its sentence pulse amber together — the sentence's numeral grows to 120 % and a thin amber thread runs from it to the frame; or (wrong number) the spilled dots hang outside the last frame / the empty sockets glow dark amber. Bubble: **"The film doesn't fit the story here. Look at the glowing frame."**
- **Miss 2:** the TRUE film replays slowly: the known frames carry their story numbers, and the mystery frame's sockets are dashed rings that get numbered 1…n as the moving dots pass them — the child can count the mystery. Bubble by kind: **"Count the dots that came."** / **"Count the dots that went away."** / **"Count the dots that were there before."** / **"Count the dots in the other part."** / **"Count the dots without a partner."** / **"Count the dots in one tray."** / **"Count the trays."**
- **A new move takes the help away** until the next Check.
- **Success:** the fog lifts, the patient turns from x-ray blue to colour, the plaster lands, the patient hops. The story card's question becomes its answer sentence in place (e.g. **"Pip found 7 acorns!"**) and the bubble shows the model as an equation with the mystery filled: **"5 + 7 = 12"** (add to · change) · **"13 − 4 = 9"** (start unknown, written the way it is solved) · **"4 × 5 = 20"** / **"12 ÷ 3 = 4"** (Groups).

## 8. Settings
1. **Stories:** Within 10 / Within 20 / Groups (default Within 20) — at rest the light box shows 10-socket frames, 20-socket frames or the row of trays.
2. **Read aloud:** On / Off (default On where `LCSAudio` has a voice) — On: the story is spoken during the intro film and each clause again as the film lights it; Off: the speaker is struck through and the intro film holds each clause 1.2 s.

## 9. Words (EN source)
- on-screen title: **Vet's Diagnosis Window**
- instruction: **A patient has a number story. Put each number on the film where it happens, mark the frame we don't know, and dial how many. Then press Diagnose and watch your film.**
- task line: **Put the numbers on the film, mark the mystery, then dial it.**
- Check label: **Diagnose**
- stories: §6 tables; each locale writes WHOLE stories by hand (old translations kept where the numbers did not change; changed numbers edited into the old text).
- hints: **Every frame needs a number or the mystery mark.** · **Which part of the story don't we know? Tap that frame.** · **The film doesn't fit the story here. Look at the glowing frame.** · **Count the dots that came.** · **Count the dots that went away.** · **Count the dots that were there before.** · **Count the dots in the other part.** · **Count the dots without a partner.** · **Count the dots in one tray.** · **Count the trays.**
- success: a stored answer sentence per round (e.g. **Pip found 7 acorns!**) + **{a} + {b} = {c}** / **{a} − {b} = {c}** / **{a} × {b} = {c}** / **{a} ÷ {b} = {c}**.
- free play: **Film lab** · builder **{n} are there.** / **{k} more come.** / **{k} go away.** / **Now there are {m}.**
- settings: **Stories** — **Within 10** / **Within 20** / **Groups** · **Read aloud** — **On** / **Off**

**Locale traps:**
- **Whole sentences per locale per round**, never assembled from noun + number (fi partitive after numerals: "5 tammenterhoa"; gender/plural agreement: "wie viele Enten / combien de canards / cuántas frambuesas"). Answer sentences stored per round too.
- **Clause spans:** each stored story carries per-role spans (the words that light up for each frame). Word order moves numbers (de "Jetzt sind es 8.", fi "Nyt niitä on 8."), so spans are authored per locale and gate-checked.
- **Compare phrasing** is the hardest: "7 more cats than dogs" — de "7 Katzen mehr als Hunde", fr "7 chats de plus que de chiens", fi "7 kissaa enemmän kuin koiria", sv "7 fler katter än hundar". The reviewer reads every compare story.
- **Pip and Bo** stay as names in every locale.
- **Division and multiplication signs follow school use:** division ":" in de, nl, da, no, sv, fi, fr; "÷" in en, es, pt, it. Multiplication "·" in de, da, no; "×" elsewhere.
- **Pair** is a group noun everywhere (Paar, paire, par, paio, paar, par, par, par, pari), stored per locale. **Raspberries** (the picture is a raspberry): Himbeeren, framboises, frambuesas, framboesas, lamponi, frambozen, hallon, hindbær, bringebær, vadelmia.

## 10. Sound off, access, phones
- Legible silent: the story card, the clause highlighting during the film, the chute icons and the dots carry everything; the intro film paces itself.
- Keyboard: Tab to a tile → Enter picks it → Tab to a frame → Enter places it; Enter on an empty frame marks the mystery; ↑/↓ on the dial; Enter on Diagnose.
- aria: frames "first frame, 12 dots" / "middle frame, mystery" / "last frame, empty"; chute "things come in" / "things go away"; a mismatch is announced ("The first frame holds 8, but the story says 12.").
- Taps: tiles 64 × 56 / 72 × 52; frames ≥ 72 px tall; dial buttons ≥ 48 px. Pictures 120 / 96 px at 704, 72 / 64 px at 360.
- Reduced motion: dots appear in place; the film steps frame by frame with fades.

## 11. Distinct from
- **Row 24 The Story Stage** (K.OA.A.2): the child performs each sentence with pictures and counts what is left — the story is acted forward and the unknown is always the result. Here the unknown is in ANY position, the child builds a MODEL (numbers in roles + a mystery) and the apparatus runs that model to test it against the story. The Story Stage has no start-unknown or compare story.
- **missing-question (tool)** — the class decides what could be asked; no model is tested. **lids (tool)** — shares counters under lids; here sharing is one of three film behaviours of a story model.
- Built registry: no rebuilt activity runs a learner-built model.

## 12. Build plan
- **Core state:** `{ level, readAloud, locale, order[], idx, round:{kind, diagram, op, roles[], storyNums{role:n}, decoyN, mysteryRole, clauseSpans{locale:{role:[s,e]}}, pictures[]}, placed{role:n|null}, mystery:role|null, dial:n, misses, help }`.
- **Functions:** `place(role, n)`, `unplace(role)`, `markMystery(role)`, `setDial(n)`, `runFilm(model)` → `[{role, holds, story, ok, spill, gap}]`, `firstMismatch(script)`, `solve(round)` (true value from the diagram invariant — never stored), `check()` → `{ok, mismatch}`, `trueFilm(round)`, `nextTask(index)`.
- **Gate `verify-story-film-core.js` (own oracle, re-derives from story numbers + kind):** (1) `solve` = the gate's own arithmetic for every round of every level; (2) no round has an `answer` field; (3) every locale's story text contains exactly the round's story numerals, and each clause span contains exactly its role's numeral; (4) answer ≥ 1 and ≠ any story number; decoy ≠ answer and ≠ every story number; decoy rank spread as listed in §6 (Within 20 biggest 6 / smallest 6 / between 4); decoy = sum in Groups; (5) a "drop the biggest tile" solver and a "drop the smallest tile" solver each find the two story numbers in ≤ 40 % of rounds; an "add the two numbers" solver < 30 %; (6) `runFilm` with the right model returns no mismatch; every wrong binding of the two story numbers returns a mismatch at the first frame whose story number differs; a wrong dial returns spill (too big) or gap (too small) of exactly |dial − answer| dots; (7) Groups: the sharing film deals round-robin, the making-groups film fills tray by tray (the order of dot moves is asserted); (8) every mystery place listed in §6 occurs and none more than 3 times in Within 20; adjacent answers differ and kind runs ≤ 2 over 10 000 seeds; (9) the dial range starts at 1; (10) every picture exists in its theme JSON (colour theme).
- **Mutations:** grade from a stored `answer`; let a story's numeral differ from its data in one locale; accept a swapped first/last binding; let the decoy equal the answer; make the decoy the biggest tile in every round; count spilled dots as fitting; sharing film fills tray by tray; dial allows 0; mismatch never names a frame; answer equal to a story number in one round; allow two adjacent equal answers.
- **Pictures verified on contact sheets** (forest-creatures, pets, bakery, hospital — 2026-10-17); others confirmed in their JSONs. **Risks:** the compare strips at 360 (15 px pitch) are the tightest — `visual-qa-activity.js` measures dots ≥ 12 px; clause spans in 11 locales (the gate parses them). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — you are the vet, the patient glows like a real x-ray, the projector plays your own film, and healing the patient is the reward.
2. **Would a teacher put it on the board?** Yes — "where does the 13 go?" is the exact conversation 1.OA.A.1 needs, and the film answers it physically: make 17 the start and the class watches eight dots spill over the rim.
3. **Would a parent trust it?** Library pictures only, no score, kind hints, never multiple choice, and every story is a whole sentence in the child's language.
4. **The invention:** the x-ray plays the child's own model of the story as a film, so a wrong number visibly does not fit the frame its sentence describes.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **The decoy was a tell.** It was the biggest tile in all 16 Within-20 rounds, so "never use the biggest tile" removed it every time. Re-picked all 26 decoys (Within 20 + Within 10): size rank now spread (biggest 6 / smallest 6 / between 4 in Within 20), and where possible the decoy is the misconception's own number (4 + 13 = 17 for "Bo gets 4 more, now 13"; 7 − 5 = 2 for "7 more cats than dogs"). Recomputed with my own oracle: every decoy ≠ answer, ≠ story number, within the dial range. Gate (4)/(5) and the mutation list updated to measure "drop the biggest/smallest tile" ≤ 40 %.
- **False balance claim fixed:** "the mystery sits in each of the three frame positions ≥ 4 times" was untrue (first 3 / chute 3 / last 2). §6 now states the real counts per diagram; the gate asserts every place occurs and none more than 3 times.
- **Pictures:** the library robin and sparrow are both drawn orange-breasted (near-twins on the birds-2/spring sheets) — story 14 is now butterflies and bees (insects-and-bugs). The only sock picture is one green striped sock, so the "4 blue, the rest white" stories (Within 20 #9 and Within 10) now say "in the drawer / in the basket" (the colour words would have contradicted the picture).
- Every story re-solved by my oracle (16 + 10 + 9 rounds): all answers correct, ≥ 1, never equal to a story number; Groups totals ≤ 30 fit the 30-socket total frame and ≤ 8 trays/≤ 8 per tray.
