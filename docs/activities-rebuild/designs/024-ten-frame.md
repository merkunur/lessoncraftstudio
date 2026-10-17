# Row 24 — Solve the Story → THE STORY STAGE (K.OA.A.2)

## 0. Identity
- id `ten-frame.solve-the-story.k-oa-a-2` (KEPT; slugs/metadata frozen) · grade K · CCSS K.OA.A.2 · Operations & Algebraic Thinking · own files `story-stage-core.js`, `story-stage-activity.js`, `story-stage-activity.html`, `story-stage-activities.json` (the row leaves `ten-frame-activities.json`; the id is unchanged).
- page title (frozen): "Solve the Story — Add & Subtract Word Problems on a Ten Frame"; intro (frozen): "Read each short story — like '3 birds sit, 2 more land, how many now?' — place counters on the frame to model it, then type how many there are." — kept true: the stage IS a ten-frame (ten places in 2 rows of 5), the child places the story's things on it (library pictures as the counters; drawn counters in the within-20 level), then types the answer on a keypad.
- worksheets also covered: **K-028** How Many Altogether? (the put-together stories) · **G1-103** Cross Out and Subtract and **G1-104** Picture Subtraction (take-away stories: what is taken leaves a crossed outline on its place) · **G1-213** Picture Word Problems · **G1-238** Addition Word Problems · **G1-239** Subtraction Word Problems · **G1-240** Word Problems Within 10 · **G1-241** Word Problem Practice (the within-20 level).
- old activity: 8 stories per locale in all 11 locales (4 add-to, 4 take-from; birds, apples, ducks, children, balloons, cookies, fish, flowers), counters on a ten-frame, type the answer. **Kept:** 7 of the 8 stories and their 11 hand-written translations (the start of every locale's text). **Changed:** "5 children play in the park" → "5 bunnies play in the garden" (the library has no group of identical children; spring/bunny is one clear picture). **Added:** put-together stories, a within-5 level and a within-20 level (new text per locale, written by hand at build).

## 1. The pitch
"Every sentence of the story is a stage direction: birds really land on the ten-frame when you drag them, balloons really pop when you tap them — then you count what the story left."

## 2. Why a child will want it again (the fun)
- **The story plays itself first.** The first sentence acts itself out: as it lights up, its things arrive one by one on the stage (birds flutter in, apples tumble into the basket places) with a soft note per arrival. The child watches the story begin, like a puppet show.
- **Then it's the child's turn.** The next sentence lights up with a little hand icon: now the child is the storyteller. Add-to stories: drag more things in from the supply corner — each one lands with its own sound (a bird chirp-tone, an apple "tok", a splash for ducks). Take-from stories: TAP to make it happen — a balloon pops into a burst of five tiny lines and leaves a dashed balloon outline in its place; a cookie is "eaten" (a bite-shaped wedge cuts it, then it fades to an outline); fish are dragged out over the frame's edge and swim off; tulips are picked (dragged up and out).
- **The stage keeps the trace.** Taken things leave a dashed outline with a small cross — the cross-out picture model — so the child sees both what was there and what is left.
- **The curtain call.** On success the remaining things do a little bow in turn (each dips 6 px, 80 ms apart) and the story's last line completes with the number.
- **Free play ("Tell your own"):** an empty stage, a supply of the round's picture, and a live sentence builder: "There are 4 birds. 2 fly away. 2 are left." writes itself as the child plays.

## 3. The skill and the misconception
- **Skill (K.OA.A.2):** solve addition and subtraction word problems within 10 (add to, take from, put together) by modelling with objects; the grade-1 sheets extend to 20.
- **Misconception 1: picking the numbers without the story** (adding every story's two numbers, or answering with the last number heard). **Push back:** the child has to PERFORM each sentence; a take-from story cannot be acted by adding things — the supply corner is closed in take-from stories, the only possible move is to make things go.
- **Misconception 2: counting the taken ones.** **Push back:** a taken thing becomes an outline with a cross; at the question, the outlines dim further and only the solid pictures are bright; the keypad answer is compared with the solid ones, and the miss replay counts only those.
- **Misconception 3: acting the wrong amount** (dragging 3 birds for "2 more"). **Push back:** at the question, the miss replay re-tells the story: the stage rewinds and each sentence re-acts itself at its true number; the extra bird the child added is shown greyed and outside the story.

## 4. The stage
Stacked layout at all widths (the pictures need the full width to reach ≥ 96 px at 704): story card → stage → keypad + bubble row.

**At 704 px (content 672):**
- **Task line** 22 px: "Act out the story, then type how many."
- **Story card:** a cream card 640 px wide; the story's sentences in 22 px Nunito, one sentence per line (≤ 3 lines), the current sentence highlighted (teal underline 4 px + a 28 px icon: a play triangle when the stage acts it, a hand when it is the child's turn, a question mark for the question). Numbers in the sentences are numerals in bold teal (content). Speaker 36 px at the card's right.
- **The stage = the ten-frame:** a scene band 640 × 250 px with a soft scene colour (sky blue for birds/balloons, pond blue for ducks/fish, grass green for bunnies/tulips, table cream for apples/cookies/pears) and ten places in 2 rows × 5: rounded squares 112 px with 12 px gaps (5 × 112 + 4 × 12 = 608), each with a faint 2 px outline — the ten-frame. Pictures sit in places at 100 px.
- **Supply corner** (add-to and put-together stories only): a small rounded tab 120 × 120 at the stage's top-right outside the frame holding a stack of the picture (the top one visible at 96 px, a numeral-free stack shadow under it). Dragging from it always yields one more.
- **Keypad + bubble row:** keypad 1–9 and 10 (two rows of five keys 56 × 56 px, plus a backspace) on the left half — in Within 20 the keypad is the digits 1–9 and 0 (0 is dimmed until a first digit is typed, so 0 can never be an answer, and 13 is typed 1 then 3; a "10" key would make 11–19 untypeable), answer box 72 × 64 px; the bubble (≤ 3 lines, 18 px) on the right half. The keypad stays dim until the question sentence is reached.
- Within 20: two ten-frames side by side inside the stage band (each 2 × 5 places of 56 px), the places hold drawn counters (48 px discs in the scene's accent colour) and the story's picture appears once as a 96 px label at the stage's left edge ("these are birds"). Counters are apparatus, so the picture-size rule is met by the label.

**At 360 px:** story card 336 wide (20 px text, ≤ 4 lines), stage 336 × 150 with places 64 px and 4 px gaps (5 × 64 + 4 × 4 = 336), pictures 62–64 px; supply corner overlaps the stage's top-right as a 56 px tab; keypad below (keys 60 × 48 in two rows) → answer box → bubble → Check. Check bottom ≈ 700 px at 360×740. At 320×640: places 56 px, the story card collapses to the current sentence plus a "show whole story" chevron, so Check sits at ≈ 610 px. Within 20 on phones: the two frames stack vertically (places 30 px counters 26 px; the 64 px picture label at the top).

**Pictures (verified in the theme JSONs; seen on contact sheets 2026-10-17):** spring/bird (a robin-like bird), At the Supermarket/apple, At the Supermarket/pear, farm-animals/duck, spring/bunny, toys/balloon (a green balloon on a string), bakery/cookie, pets/goldfish, spring/tulip. All colour themes; identical instances within a story (one picture repeated). Labels from `image-vocabulary.js` are NOT shown on the stage — the nouns are in the story text.

**Words on the apparatus:** none; the story card is text content (the task), separate from the stage.

## 5. The hand
- **The narrator's sentence:** plays automatically (things arrive one per 300 ms with a note); the child can tap the sentence to replay it.
- **Drag from the supply corner** (add-to / put-together): within 50 ms a copy lifts and follows the finger; drop on an empty place → it lands (180 ms) with its sound; drop elsewhere → it returns. Places fill wherever the child drops; a ten-frame hint (faint) shows the next place in reading order, but any empty place is accepted.
- **Tap a thing on the stage** (take-from): it performs its leaving — balloon: pop (burst lines 200 ms, then outline); cookie: bite then fade to outline (300 ms); fish and tulips: tap makes them leave the frame (swim off right / lift up, 400 ms) leaving an outline with a cross. Tapping an outline brings the thing back (undo).
- **Drag a placed thing off the stage** (add-to stories): it goes back to the supply (undo).
- **Put-together stories:** two supply corners (one per kind, e.g. birds and bunnies); the first sentence acts the first group, the second sentence the second group (the child drags it in).
- **Next sentence:** the hand icon wakes only after the child has made at least one move on their line (critic: if the question could be reached without acting, a child could add the two numbers they read and the story would be decoration — misconception 1). Any number of moves is accepted (a wrong amount is caught by the replay, misconception 3); tapping the hand icon moves to the question, and the question sentence wakes the keypad.
- **Keypad:** tap keys → digits enter the answer box (two digits max); backspace removes.
- **Free play:** "Tell your own" — stage, supply and take-away all open; the sentence builder writes "There are {n} {things}." / "{k} more come." / "{k} go away." / "Now there are {m}." live.

## 6. The rounds
One round = one story: narrator sentence → child's sentence → question → keypad answer. (Put-together: narrator group 1, child group 2.)

**Level "Within 10" (default) — 10 rounds:**
| # | type | story (EN) | picture | start | change | answer |
|---|---|---|---|---|---|---|
| 1 | add to | 3 birds sit on a branch. 2 more birds land. How many birds are there now? | bird | 3 | +2 | 5 |
| 2 | add to | 4 apples are in a basket. You put in 3 more. How many apples are there now? | apple | 4 | +3 | 7 |
| 3 | add to | 2 ducks swim in the pond. 4 more ducks join them. How many ducks are there now? | duck | 2 | +4 | 6 |
| 4 | add to | 5 bunnies play in the garden. 4 more bunnies hop in. How many bunnies are there now? | bunny | 5 | +4 | 9 |
| 5 | take from | 7 balloons float in the air. 3 balloons pop. How many balloons are left? | balloon | 7 | −3 | 4 |
| 6 | take from | 8 cookies are on a plate. You eat 2 cookies. How many cookies are left? | cookie | 8 | −2 | 6 |
| 7 | take from | 6 fish swim in a tank. 4 fish swim away. How many fish are left? | goldfish | 6 | −4 | 2 |
| 8 | take from | 9 tulips grow in the garden. 5 tulips are picked. How many tulips are left? | tulip | 9 | −5 | 4 |
| 9 | put together | 4 birds sit in the garden. 3 bunnies sit with them. How many animals are there? | bird + bunny | 4 | +3 | 7 |
| 10 | put together | 5 apples are on the table. 3 pears are next to them. How many fruits are there? | apple + pear | 5 | +3 | 8 |
(Rounds 1–3 and 5–7 are the old stories verbatim; 8 swaps the old "flowers in a pot" for tulips in the garden — the picture is a tulip and a pot of nine stems was the wrong scene; 4 swaps children for bunnies.)

**Level "Within 5" — 9 rounds:** 2 birds + 2 more land → 4 · 1 duck + 3 more → 4 · 3 apples + you put in 2 → 5 · 2 bunnies + 1 hops in → 3 · 5 balloons, 2 pop → 3 · 4 cookies, you eat 1 → 3 · 5 fish, 4 swim away → 1 · 3 tulips, 2 are picked → 1 · 2 birds and 3 bunnies → how many animals → 5.

**Level "Within 20" (drawn counters, two frames) — 9 rounds:** 8 birds + 5 more land → 13 · 9 apples + you put in 6 → 15 · 7 ducks + 7 more → 14 · 12 balloons, 4 pop → 8 · 15 cookies, you eat 6 → 9 · 13 fish, 5 swim away → 8 · 18 tulips, 7 are picked → 11 · 10 bunnies + 6 hop in → 16 · 6 apples and 8 pears → how many fruits → 14.

**One right answer each; never 0** (no story leaves nothing — the gate asserts answer ≥ 1 and every start and change ≥ 1).

**Answer position:** the answer is typed — no options to guess between. The checks that matter: (a) the answer is never equal to either number in the story (so "type a number you heard" always fails) — the gate asserts it for every round; (b) no two adjacent rounds share an answer after the shuffle; (c) types alternate so no more than 2 add-to or 2 take-from in a row.

**Order:** order-only reshuffle per pass; never the same order twice.

## 7. Check, the misses, the success
- **Check before the question is reached:** no miss. The current sentence's icon pulses; bubble: **"Act out this line first."**
- **Check with an empty answer box at the question:** no miss; the keypad glows; bubble: **"Count the {things} on the stage and type the number."**
- **Miss 1 (wrong number):** **the replay** — the stage rewinds (things fly back to where the story began, 400 ms) and the story re-acts itself sentence by sentence at its TRUE numbers, each arriving or leaving thing marked with a small numeral (1, 2, 3 …) as it moves; if the child's own acting was different, the extra or missing things show greyed beside the frame. Then the stage returns to the child's state. Bubble: **"Watch the story again. Count the {things} still on the stage."** (take from) / **"…Count all the {things} on the stage."** (add to / put together)
- **Miss 2:** the solid things on the stage get small numerals in reading order (1 … n) and stay; outlines stay dim and unnumbered. Bubble: **"Count only the bright {things}."** / **"Count every {thing}."**
- **A new move or keypress takes the help away** until the next Check.
- **Success:** the answer settles, the remaining things take their bow, the question line completes in place: **"There are 5 birds now!"** / **"4 balloons are left!"** / **"There are 7 animals!"**. Bubble repeats it with the sum: **"3 and 2 more make 5."** / **"7 take away 3 leaves 4."** / **"4 and 3 make 7."**

## 8. Settings
1. **Numbers:** Within 5 / Within 10 / Within 20 (default Within 10) — at rest the stage shows a ten-frame of pictures or two frames of counters.
2. **Read aloud:** On / Off (default On where TTS exists for the locale; Off elsewhere) — On: each sentence is spoken when it lights up and the narrator waits for the voice; Off: the sentence highlights and its things act after a 1.2 s reading pause. Visibly: the speaker icon on the story card is shown or struck through.

## 9. Words (EN source)
- on-screen title: **The Story Stage**
- instruction: **Act out each line of the story on the stage. Then type how many there are.**
- task line: **Act out the story, then type how many.**
- stories: the table in §6 (EN), written per locale by hand — the old stories' 11 translations are kept for rounds 1–3, 5–7; the others are new.
- hints: **Act out this line first.** · **Count the {things} on the stage and type the number.** · **Watch the story again. Count the {things} still on the stage.** · **Watch the story again. Count all the {things} on the stage.** · **Count only the bright {things}.** · **Count every {thing}.** · put-together: **{things}** = the story's group noun (animals / fruits).
- success: **There are {n} {things} now!** · **{n} {things} are left!** · **There are {n} {things}!** · **{a} and {b} more make {n}.** · **{a} take away {b} leaves {n}.** · **{a} and {b} make {n}.**
- free play: **Tell your own** · builder frames **There are {n} {things}.** / **{k} more come.** / **{k} go away.** / **Now there are {m}.**
- settings: **Numbers** — **Within 5** / **Within 10** / **Within 20** · **Read aloud** — **On** / **Off**

**Locale traps:**
- **Plural nouns after numerals:** stories are stored as WHOLE sentences per locale per round (as in the old activity), never assembled from a noun + number, because fi uses the partitive singular after numbers ("3 lintua"), and plural/gender agreement differs everywhere (es "Cuántas manzanas / Cuántos pájaros"; de "Vögel/Äpfel"). The hint/success frames that need a noun use per-round stored noun forms (plural and, for fi, partitive) authored with the stories.
- **Group nouns for put-together:** "animals" / "fruits" (de "Tiere / Früchte — Obststücke", fr "animaux / fruits", fi "eläintä / hedelmää" partitive) — authored per round.
- **"bunny":** use the child word per locale (de "Hasen", fr "lapins", es "conejos", pt "coelhinhos", it "coniglietti", nl "konijntjes", sv "kaniner", da "kaniner", no "kaniner", fi "pupua").
- **Cookies:** the old activity's words stay (de "Kekse", nl "koekjes", da "småkager", no "kjeks", sv "kakor"); pears: de "Birnen", fi "päärynää".
- **Within 20 numbers in text** stay numerals (no number words to reverse).
- **Read aloud** only where `LCSAudio` has a voice (5 of 11 locales); the reading pause makes the stage legible silent.

## 10. Sound off, access, phones
- Legible silent: the story card, highlighted line, icons and the acting carry everything.
- Keyboard: Tab to the supply corner → Enter adds one to the next empty place; Tab to a stage thing → Enter makes it leave / come back; N moves to the next line; digits type the answer.
- aria: places "place {n}: bird / empty / taken away"; the current sentence is the live-region text; success read aloud.
- Taps: places 112/64 px; supply tab 120/56; keypad keys ≥ 48 px.
- Reduced motion: things appear and disappear without flight; the replay steps sentence by sentence with fades.

## 11. Distinct from
- **#23 Stamp Frame** (this batch) starts from an expression and checks the representation with brackets; the Story Stage starts from a story and makes the child PERFORM each sentence with library pictures — the operation comes from the story's verbs, never from a sign.
- **#14 Treat Box / #15 Twin Pools** count out a given number; no story, no change.
- **story-line (tool)** pegs story pictures in sequence — narrative order, not arithmetic.

## 12. Build plan
- **Core state:** `{ level, readAloud, locale, order[], idx, story:{type, picture(s), start, change, answer, sentences[]}, line:0|1|2, places:[null|{kind, state:'in'|'out'}], typed:'', misses, help }`.
- **Functions:** `actNarrator()`, `addFromSupply(kind, place)`, `take(place)`, `restore(place)`, `solidCount()`, `replayScript()`, `check(n)` → `{ok, acted:{extra, missing}}`, `nextTask(index)`.
- **Gate `verify-story-stage-core.js` (own oracle):** (1) answer recomputed from start and change matches the stored answer for every round in every locale; (2) the numerals in each locale's sentence text equal start and change (parsed from the text — the stories cannot drift from the data); (3) answer ≥ 1, never equal to start or change; (4) take-from rounds have no supply; (4b) the question cannot be reached with zero child moves on the child's line; within 20 the keypad can type every answer 11–19 and cannot start with 0; put-together rounds have two kinds; (5) after `take`, `solidCount` excludes outlines; (6) no adjacent equal answers, ≤ 2 same-type runs over 10 000 seeds; (7) within 20 uses two frames and counters, within 5/10 use pictures; (8) every picture exists in its theme JSON (colour theme).
- **Mutations:** count outlines in the answer; open the supply in a take-from story; let a story's text numeral differ from its data; accept the start number as the answer; skip the replay's true numbers (replay the child's state); allow two kinds in an add-to story; answer 0 in a round; render within 20 with 56 px pictures; reorder runs of 3 same type; drop the reading pause when Read aloud is off.
- **Pictures to verify:** all nine listed (seen). **Risks:** writing the new stories in 11 locales (reviewer); the 64 px places at 360 are the tightest fit — measured by `visual-qa-activity.js`. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — making balloons pop, birds land and fish swim away on command is a puppet show where the child is the puppeteer.
2. **Would a teacher put it on the board?** Yes — read the story together, a child acts each line, the class counts what is left; a wrong answer replays the story at its true numbers.
3. **Would a parent trust it?** Library pictures, kind stories, no score; the child models before computing, exactly as the standard asks.
4. **The invention:** every sentence of the story is a stage direction the child performs on a ten-frame stage, so the operation comes from what happens, not from a sign.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **The acting is now the path, not an option:** the question (and keypad) could be reached "any time", so a child could add the two numbers in the text and skip the stage — the exact misconception the design names. The hand icon now wakes only after at least one move on the child's line; a wrong amount is still allowed and caught by the true-number replay.
- **Within-20 keypad fixed:** a 1–9 + "10" keypad cannot type 11–19. Within 20 uses digits 1–9 and 0 (0 dimmed as a first digit).
- Verified: all nine pictures exist (spring/bird, bunny, tulip; farm-animals/duck; at-the-supermarket/apple, pear; toys/balloon; bakery/cookie; pets/goldfish); every round's answer ≠ start and ≠ change, ≥ 1, recomputed for all three levels.
- Gate rule 4b added.
