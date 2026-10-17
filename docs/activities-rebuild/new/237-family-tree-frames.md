# New 237 — The Family Tree → THE STAR WALK (family words, words-only tree)

## 0. Identity
- id `family-tree-frames.play.family` · **ships at grade 1 (settings reach grade 2); the grade-K faces are BLOCKED on art (§12)** · framework SOCIAL-STUDIES (family; `alignment.framework` from `frontend/lib/frameworks.ts`) · strand Social Studies · files `family-tree-frames-core.js`, `family-tree-frames-activity.js`, `family-tree-frames-activity.html`, `family-tree-frames-activities.json` (scaffold `--num=237`).
- Worksheets covered NOW (words-only tree): **G1-385** Family Generations: Oldest to Youngest (Generations mode) · **G1-386** Family Tree: Read the Clues (Clues mode — frames carry their family word, the child places the NAMES by walking the clues) · **G2-362** Family Relationships: Riddles (Riddle-walk mode, forward) · **G1-387** Family Tree Template (Explore mode — open, unchecked; the child moves the star and the tree renames itself; drawing one's own family stays the worksheet's job).
- Worksheets covered ONLY when art exists (BLOCKED): **K-370** Family Members: Who Is Who? and **K-375** Family Words: Trace and Write — both ask a pre-reader to read a family word off a PERSON's look (age, sex). Without people the K face would teach name logic, not family words (the dossier's warning), so it is not shipped as a words-only imitation.
- Merged: grade 1 "The Family Tree" (family-tree-rows) = Generations + Clues; grade 2 "The Family Tree Path" (family-tree-path) = Riddle walk (forward: riddle → walk → word; reverse: word → the child builds the walk).
- **Orchestrator ruling 2026-10-17:** the worksheet cast `scripts/worksheet-gen/primitives/family-figure.js` is a set of hand-drawn PEOPLE = characters, which the activity law (rule 5) forbids. It is NOT used. Animal mother/baby pictures were checked (farm-animals sheep/lamb, horse/foal, hen/chick; duck/duckling and cow/calf are ruled out in PICTURE-RULINGS) and refused: they give one generation and no visible sex, cannot make a three-generation tree, would put "grandma" on a sheep, and are #233 Mother and Baby's material.
- Words come only from the K-370 bank `scripts/worksheet-gen/data/b5/family.js` (`lib/b5-common.js bank('family', loc)` — kin map keyed by PATH, names list, `clueFrames`, `riddleFrames`, the sv/da/no mo-/fa- lineage literals). Its rule 11 holds here too: **no first-person words** — the star is a NAMED child ("Mia"), and every riddle and clue is about Mia ("Mia's mom's sister is Mia's ___"), exactly as the worksheets print them.

## 1. The pitch
"Every family word is a walk from the star: tap 'mom', then 'sister', and a light walks up to Mia's mom and across to her sister — the frame it lands on is Mia's aunt, because it is one row up and one step across."

## 2. Why a child will want it again
- **The walking light.** Each step chip sends a warm light along the tree's real lines — up a descent line, along a couple bar, across a sibling rail — with a soft tick at every corner, and the path it walked stays drawn as a glowing trail. Children build silly walks on purpose ("mom, mom, sister?") just to see where the light goes — and when a step has nowhere to go (Mia's grandma has no sister on this tree), the light runs to the end of the branch, finds no frame, flickers and comes back. The tree itself says "nobody there".
- **The star hops (Explore and the last rounds of Clues).** Drag the star badge to another person and every frame flips its word at once, rippling outward from the new star like a flip board: Mia's "aunt" becomes Tom's "mom", Mia's "mom" becomes Tom's "aunt". The same frames, new words — children gasp at this, and it is exactly the idea.
- **The earned show:** when a round is solved every line of the tree lights in one sweep from the star outward, the drawn crown behind the top row rustles (three leaf-clusters sway), and the star badge spins once.
- No people are drawn, so nothing is "wrong" with anyone's family: the tree is a map of WORDS, which is what the grade 1–2 worksheets teach.

## 3. The skill and the misconception
- **Skill:** read family words as relations on a family tree (mom, dad, sister, brother, baby sister/brother, grandma, grandpa; grade 2 aunt, uncle, cousin); order generations oldest to youngest; read relationship riddles and clues ("Mia's dad's mom").
- **Misconceptions and how the tree pushes back:**
  1. *A family word is a label on a person* ("she IS the aunt"). The star hop renames the same frames; and every walk STARTS at the star — a word is visibly a path from one person.
  2. *Mixing generations* ("my mom's mom is my mom"). The walk for mom's mom climbs TWO rows; the row the light stops in is the "grand-" — the tree's height is the generation, not a rule to remember.
  3. *Grandparent and aunt/uncle sides* (sv/da/no mormor/farmor, moster/faster; "whose parents are these?"). The grandparents hang above ONE parent and the side is coloured on the descent line (mom's side coral, dad's side teal); in sv/da/no the word is literally the walk (mor-mor = the steps mom, mom) and the light spells it out step by step.
  4. *Aunt vs mom, cousin vs sister* (grade 2): aunt is up-then-ACROSS, cousin is up-across-DOWN — the extra step is visible on the trail.
  5. *Possessive chains read backwards* ("dad's mom" read as "mom's dad"). The step chips must be tapped in the riddle's order and the light follows them literally, so a reversed chain visibly ends somewhere else (two grandparents sit side by side; the trail shows which one was reached).

## 4. The stage
Layout split at ≥ 700 (tree left 430, step chips / word bank / bubble right 210); stacked below.

**At 704 px** (stage 640 × 560):
- **The tree** (430 × 500): a soft drawn tree — teal crown behind the top row, cream trunk behind the children's row (the K-370 worksheet look). **Frames** 112 × 64 (cream name plates, 3 px ink outline, rounded 12 px) in three generation rows; **couple bars** (horizontal 4 px) between partners; **descent lines** (vertical 4 px) from a couple bar's middle down to a children's rail. Descent lines from the grandparents are coloured by side (coral = mom's side, teal = dad's side) — the colour is the side, never the sex.
- **What a frame shows:** Riddle walk and Generations — blank frames (the star frame alone shows the star's NAME, e.g. "Mia", Baloo 2 24 px, with a coral star badge 32 px on its corner). Clues — every frame shows its family word relative to the star (22 px) and an empty name slot under it. Explore — every frame shows its word relative to the current star. Words on frames are the content (rule 8); there are no icons for sex (no pink/blue, no ♀♂).
- Family shapes — ONE structure (the K-370 ruling, `FAMILY_NEUTRAL.structure = 'conventional'`): mom + dad → 2 or 3 children (the star + 1–2 siblings, one may be a baby); + grandparents: one grandparent couple above the side parent (side alternates per round); + aunt/uncle/cousin (grade 2): the side parent's sibling beside them under the grandparents, with one cousin below.
- **Step chips** (Riddle walk; right column): six word chips 96 × 52 in a 2 × 3 grid — mom · dad · sister · brother · daughter · son (bank words; daughter/son authored per locale) — plus an undo-step chip (↶, 52 × 52). They are the possessive steps of a riddle.
- **Word bank** (Riddle walk answer, Generations, reverse prompt): word cards 190 × 52, the word in Baloo 2 24 px, max 4 in a column.
- **Riddle strip** (above the tree, ≤ 2 lines, 22 px): the bank's `riddleFrames` sentence with its blank, e.g. "Mia's mom's sister is Mia's ___."
- **Clue cards** (Clues; right column): 3–4 cards 200 × 48 from the bank's `clueFrames`; **name tokens** (round coral tokens 64 px, a name ≤ 7 letters) on a drawn tray under the tree.
- **Generations:** three long drawn branches (top / middle / bottom bands 420 × 96) instead of frames; a small drawn star glyph marks the bottom branch's "me" card slot in round 8–9 only.
- **The walk light:** an 18 px glowing coral dot with a 6 px trail; a walked step stays drawn as a 6 px lit line.

**At 360 px** (stage 336 × 700): tree 336 × 380 with frames 84 × 52 (text 18 px); chips in a 3 × 2 grid of 100 × 48 under the tree; word bank as a 2-column grid of 156 × 48 cards; riddle strip 20 px. At 320: frames 76 × 48, chips 92 × 44.

**Pictures:** none. Every element is drawn apparatus geometry or text that is the content. (Rule 4 is satisfied by having no pictures at all, not by shrinking any.)

**Task lines** (≤ 24 px, never change within a mode): Riddle "Tap the steps from the star. Where does the light stop?" · Reverse "Tap the steps from the star to the {word}." · Generations "Put the family words on their branch: oldest at the top." · Clues "Read the clues. Put each name in its frame." · Explore "Move the star and see every frame's new word."

## 5. The hand
- **Step chip (Riddle walk):** tap → within 100 ms the light leaves its current frame along the matching line (140 ms per segment, tick at each corner): *mom/dad* = up the descent line to the parent of that sex; *sister/brother* = along the sibling rail to the sibling of that sex (or along the couple bar → descent → rail for a parent's sibling); *daughter/son* = down to the child of that sex. **No such person** → the light runs 40 px down the branch, finds no frame, flickers twice (300 ms) and returns; the step is not added. Undo chip = the last step's trail fades back (200 ms).
- **Answer card (Riddle forward):** once the light has stopped, drag (or tap) a word card onto the frame where it stopped; it docks as the frame's name plate. Nothing is judged until Check.
- **Generations:** drag a word card to a branch. A card on the wrong branch is accepted on the drop (judged at Check).
- **Clues:** tap a clue card → its walk plays from the anchor person (e.g. "Leo is Ana's dad." — the light starts at the frame holding Ana's token, or pulses "place Ana first" if she is not placed); drag a name token onto a frame's name slot; tokens swap on an occupied slot.
- **Explore / star hop:** drag the star badge to any frame (400 ms flight); every frame flips to its word for the new star (200 ms per frame, rippling outward). The name on the old star frame goes with the star.
- **Sound (optional):** a tick per corner, a soft "plink" on a docked card, a chime on the full sweep; TTS reads a chip, card or riddle on tap.
- **Free play:** Explore at any time; after a round's success the step chips stay live and the light can be walked anywhere.

## 6. The rounds
Paths are the bank's (`FAMILY_NEUTRAL.paths`): M mom, F dad, Z/B older sister/brother, Zy/By baby sister/brother, MM MF FM FF grandparents, MZ MB FZ FB aunts/uncles, MZD … FBS cousins. A word is asked only if EXACTLY one person on the round's tree carries its path (the K-370 legality rule).

**Riddle walk — forward, 9 riddles per pass** (star name from the locale's bank `names`, sex alternates; tree shape: +A on the riddle's side):
| # | bank frame (EN) | steps the child taps | the light stops | answer | bank (4 cards) |
|---|---|---|---|---|---|
| 1 | Mia's mom's mom is Mia's ___. | mom, mom | top row, coral side | grandma | grandma · mom · aunt · sister |
| 2 | Ben's dad's dad is Ben's ___. | dad, dad | top row, teal side | grandpa | grandpa · dad · uncle · brother |
| 3 | Emma's mom's sister is Emma's ___. | mom, sister | middle row, beside mom | aunt | aunt · mom · grandma · cousin |
| 4 | Leo's dad's brother is Leo's ___. | dad, brother | middle row, beside dad | uncle | uncle · dad · grandpa · cousin |
| 5 | Anna's dad's mom is Anna's ___. | dad, mom | top row, teal side | grandma | grandma · aunt · mom · grandpa |
| 6 | Tom's mom's brother is Tom's ___. | mom, brother | middle row, beside mom | uncle | uncle · brother · grandpa · dad |
| 7 | Lily's mom's dad is Lily's ___. | mom, dad | top row, coral side | grandpa | grandpa · uncle · dad · brother |
| 8 | Max's dad's sister is Max's ___. | dad, sister | middle row, beside dad | aunt | aunt · sister · mom · grandma |
| 9 | Zoe's aunt's son is Zoe's ___. (grade 2, +A, MZS) | mom, sister, son | bottom row, under the aunt | cousin | cousin · brother · uncle · son |
- Rounds 1–8 are the bank's 8 `riddlePathsD2` (each once); round 9 adds a cousin path (frame authored per locale — the bank's `riddleFrames` has no cousin entry; fr/es/it/pt/de/nl pick the cousin form by the path's sex, e.g. fr "cousin" for MZS).
- **Answer position:** the four bank cards are shuffled per round; the gate measures over 1,000 passes that the answer is the top card 25 ± 4 % and never top in more than 2 consecutive rounds. Grandparent side alternates (coral 4 / teal 4 in rounds 1–8); the mom's-side parent stands LEFT in 4–5 rounds and RIGHT in the rest, so "left = mom" is never a rule.

**Riddle walk — reverse (second setting step), 8 rounds:** the word card is given ("Walk to Mia's aunt."), the child taps steps; Check runs the walk. Rounds: aunt · uncle · grandma · grandpa · aunt · grandpa · uncle · grandma, each on a tree where that word names exactly one person. **Any walk that ends on that person is right** (e.g. for the aunt on mom's side, "mom, sister" or, on a tree where Mia has a sister, "sister, mom, sister" — the gate enumerates walks ≤ 4 steps); the shortest is drawn at success.

**Generations (G1-385) — 9 rounds:** three cards to the three branches, oldest at top (words from the bank, `generationOK` only):
| # | cards | # | cards | # | cards |
|---|---|---|---|---|---|
| 1 | grandma, mom, baby sister | 4 | grandma, dad, brother | 7 | grandpa, aunt, cousin |
| 2 | grandpa, dad, sister | 5 | grandpa, mom, baby brother | 8 | grandma, uncle, ★ Mia |
| 3 | grandma, mom, sister | 6 | grandpa, dad, brother | 9 | grandpa, mom, ★ Mia |
(★ Mia = a name card with the star glyph: the child places "me-the-star" in the youngest row.) The top-branch card is the first bank card ≤ 1/3 of rounds (gate).

**Clues (G1-386) — 8 rounds:** a core tree (4 frames: mom, dad, the star, one sibling) in rounds 1–4, a +G tree (6 frames) in rounds 5–8. Frames show their family words relative to the star; the star frame shows only the star badge and an empty name slot. 4 or 6 name tokens and 3–5 clue cards from the bank's `clueFrames`, plus ONE relative clue per round anchored on another person (the walk the child must read off the tree). Round 1 (EN): tokens Mia, Leo, Anna, Ben; clues "Mia is the star." · "Leo is Mia's dad." · "Ben is Mia's brother." → Anna takes the remaining frame (mom). Round 5: tokens Mia, Leo, Anna, Ben, Ava, Tom; clues "Mia is the star." · "Anna is Mia's mom." · "Tom is Anna's dad." (a walk from Anna's frame, up, coral side → the "grandpa" frame) · "Ava is Mia's grandma." · "Ben is Mia's brother." → Leo = dad by elimination. (Relative clues use only the bank's step words — mom, dad, sister, brother, daughter, son — never wife/husband.) Names per locale from the bank (≤ 7 letters, never translated). **Each clue set has exactly one solution** (gate: brute-force every assignment). Rounds 7–8 end with a star hop: after success the star moves to the sibling and the frames re-word themselves while the names stay put — "Same people, new star."

**Explore (G1-387):** no rounds; any tree shape from the settings; the star can be dropped on any frame.

- **Order:** order-only reshuffle per pass within each mode (`nextTask`), pass 2 ≠ pass 1; the cousin riddle (round 9) stays last in the forward set (the ladder).

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: Riddle "Tap a step to start the walk." · Generations / Clues "Drag a card to the tree first."
- **Riddle forward — miss 1** (the light stops on the right frame but the wrong word is docked): the docked word's OWN walk plays in a second colour (teal) from the star beside the child's coral trail, so two trails end in two places. Hint: "Your walk and this word's walk end in different places." **— miss 1 (the walk itself stopped on the wrong frame):** the riddle's step words light one by one in the riddle strip while the child's trail is replayed beside them. Hint: "Take the riddle one step at a time."
- **Riddle forward — miss 2:** the correct trail draws itself faintly (dotted) from the star, one step per 300 ms, without docking anything. Hint: "Follow the dotted walk."
- **Reverse:** a walk that ends elsewhere docks the word on THAT frame for 1 s in grey (that person is someone else) and the frame's true word flips up beside it; miss 2 shows the first correct step as a dotted segment. Hints "That walk ends at someone else." · "Start with this step."
- **Generations:** miss 1 = the trunk lights from top to bottom with three dots (old → young); miss 2 = the first misplaced card rides the trunk to its band and parks at the band's end. Hints "The oldest are at the top of the tree." · "Follow the trunk."
- **Clues:** miss 1 = the first clue that is broken by the current placement lights, and its walk plays from its anchor, ending on the frame the clue really names. Hint: "Check this clue on the tree." Miss 2 = that frame's name slot glows. Hint: "This name goes here."
- A new move takes the help away until the next Check.
- **Success:** every line lights in one sweep from the star outward, the crown rustles, the star badge spins. Riddle "Mia's mom's sister is Mia's aunt — one row up, one step across." (frame per locale, built from the round's path) · Reverse "That walk ends at Mia's {word}." · Generations "Oldest at the top, youngest at the bottom." · Clues "Every name is in its frame." · after a hop "Same people, new star. The words changed — the people did not."

## 8. Settings
1. **Mode:** riddle walk / oldest to youngest / clues / explore — at rest: blank frames + a riddle strip + step chips · three empty branches + cards · worded frames + clue cards + name tokens · worded frames + a draggable star.
2. **Family words:** core (mom, dad, sister, brother, baby) / + grandparents / + aunt, uncle, cousin — the tree visibly grows a row / a side branch at rest. (Riddle walk needs ≥ + grandparents; at "core" it offers the reverse walks to mom/dad/siblings — rounds M, F, Z, B from `riddlePathsD1`.)

## 9. Words (EN source)
- title "The Family Tree" · instruction "Walk from the star to find everyone's family word."
- prompts as §4 task lines (promptRiddle, promptReverse, promptGen, promptClues, promptExplore).
- step chips: stepMom "mom" · stepDad "dad" · stepSister "sister" · stepBrother "brother" · stepDaughter "daughter" · stepSon "son" (the first four = the bank's words; daughter/son authored per locale).
- hints: hintStartWalk "Tap a step to start the walk." · hintStart "Drag a card to the tree first." · hintTwoWalks "Your walk and this word's walk end in different places." · hintSteps "Take the riddle one step at a time." · hintDotted "Follow the dotted walk." · hintElse "That walk ends at someone else." · hintFirstStep "Start with this step." · hintGen1 "The oldest are at the top of the tree." · hintGen2 "Follow the trunk." · hintClue1 "Check this clue on the tree." · hintClue2 "This name goes here."
- celebrations: celebrateRiddle "{riddleFilled} — {rowLine}." (rowLine: "one row up, one step across" / "two rows up" / "one row up, across, and one row down") · celebrateReverse "That walk ends at {egoGen} {word}." · celebrateGen "Oldest at the top, youngest at the bottom." · celebrateClues "Every name is in its frame." · celebrateHop "Same people, new star. The words changed — the people did not."
- riddles, clues, family words, names, `egoGen`: from the K-370 bank only (`riddleFrames`, `clueFrames`, `words`, `names`), never re-invented; the cousin riddle and daughter/son are the only new authored strings.
- settings: setMode "Mode" · modeRiddle "Riddle walk" · modeGen "Oldest to youngest" · modeClues "Clues" · modeExplore "Explore" · setWords "Family words" · wordsCore "Core" · wordsGrand "+ grandparents" · wordsAunt "+ aunt, uncle, cousin".
- **Locale traps:** **sides** — sv/da/no (lineage) map MM/MF/MZ/MB to mor- literals and FM/FF/FZ/FB to far- literals (mormor, farfar, moster, faster, morbror, farbror) — the bank already does this; the coral/teal side line makes the step visible. **No first-person words** (bank rule 11 — "my" is banned; the star is named). **Possessive order** differs (de "Mias Mamas Schwester", fr "la sœur de la maman de Léa", fi "Ainon äidin sisko") — the riddle-step highlight (miss) is span-mapped per locale from the bank frame, and the step chips are tapped in the logical order (mom then sister), which the strip highlight shows for every word order. **Cousin gender** (fr cousin/cousine, es/pt/it primo/prima / cugino/cugina, de Cousin/Cousine, nl neef/nicht — neef also = nephew: no nephews are ever on the tree) — keyed by the path's sex. **daughter/son** chips per locale (de Tochter/Sohn, fi tytär/poika — poika also = boy; reviewer confirms the chip reads as "son" beside "tytär"). **mom/dad register** follows the bank (K register). **Names** per locale from the bank, never translated; fr/es/it/pt frames say "de Léa", no stored genitive.

## 10. Sound off, access, phones
- Legible with sound off: the walk light, the lit trail, the flickering dead end, the side colours, the frame words.
- Keyboard: Tab through chips (Riddle) / cards / tokens; Enter taps a chip or picks a card; arrow keys move a focus ring over frames in tree order; Enter drops; Backspace = undo step; Explore: arrows move the star, Enter drops it.
- aria: each frame "frame in the {top|middle|bottom} row, {left|middle|right}" (+ its word in Clues/Explore, + "the star, {name}"); aria-live "The light stops in the {row} row." / "Nobody is there." The answer word is never announced before it is docked.
- Taps ≥ 44: chips ≥ 92 × 44, frames ≥ 76 × 48, tokens 64, cards 156 × 48.
- No pictures (none to size).
- Fold at 360 × 740: header 56 + task 52 + riddle strip 48 + tree 380 + chips 2 rows (104) + Check 56 ≈ 696 (the answer bank replaces the chip grid once the light has stopped, same height). At 320 × 640 the tree shrinks to 330 (frames 76 × 48) → ≈ 636.

## 11. Distinct from
- Worksheets K-370/K-375/G1-385/G1-386/G2-362 write numbers/words into boxes; the activity's invention is the walk along the tree's lines and the hop that re-words it.
- Designed: Bus Queue (#207) counts from a door; Constellation Thread (#4, built) threads stars in counting order — a numeric sequence, not a kinship graph; Creek Map (#21, built) forks by comparison. #233 Mother and Baby (animal parents, growing-up dial) — no tree, no kin words. Tools: none.
- Within this batch: Helper Dispatch (jobs), Face Dial (feelings) — unrelated mechanics.

## 12. Build plan
- **Core state** `{mode, words, roundIdx, people:[{id, gen, sex, path}], star:id, trail:[step…], lightAt:id, placed:{personId: wordKey|name}, bank:[…], help}`.
- **Functions:** `stepFrom(personId, step)` → personId | null (graph over the drawn lines: parents via descent, siblings via rail, children via descent down; sex filter); `walk(steps)`; `pathOf(star, person)` and `wordOf(path, loc)` via the bank kin map; `legalWords(tree, star)`; `hop(newStar)`; `cluesSolve()` (brute force, exactly one); `reverseOk(steps, target)`; `check()`; `helpLevel()`; `hintKey()`; `layout(width)`.
- **Gate's own truth (verify):** an independent kinship oracle from the PARENT LINKS (`primitives/family-tree.js genOf / parentsOf` re-implemented, not imported): each riddle's steps land on the person whose bank path equals the riddle path, and the oracle's word = the answer; every walk ≤ 4 steps that ends on the reverse target is accepted and every other is refused; a step with no person returns null (dead end); every offered word names exactly one person; after a hop the frames' words = the oracle's words for the new star and names are unchanged; Generations levels = generation index; each clue set has exactly one solution; answer-top 25 ± 4 %; grandparent side 4/4; mom-left 50 ± 6 %; no first-person token from the bank's `firstPerson` list in any string; no `<image>`/picture element in the DOM.
- **Mutations:** a step to a sibling of the wrong sex · a dead-end step silently accepted · walk starts from the light's position instead of the star after a reset · reverse rejects a valid longer walk · reverse accepts a walk ending elsewhere · hop leaves the old words on the frames · hop moves the names · sv FM rendered as mormor · Generations accepts a wrong band · a clue set with two solutions · a riddle answer card on top 3 rounds running · Check with nothing done counts a miss · help kept after a new move.
- **Pictures:** none.
- ⚠ **BLOCKED — exactly what is missing, and only for the grade-K faces (K-370 Who-is-who, K-375 trace-and-write):** library pictures of PEOPLE who read, without colour, as a **grandma, grandpa, mom, dad, older girl, older boy, baby** (the core + grandparents tree), plus an **aunt** and an **uncle** (adults clearly different from the parents) and a **girl cousin** and a **boy cousin** for the grade-2 shape — each in **2 looks** so trees vary (≈ 22 pictures), front-facing busts or full figures on a plain background, sex readable from hair/clothing and age readable from proportion and grey hair, varied skin tones across the set. The library has only toys/baby, toys/baby_girl, toys/girl, toys/doll (chibi children; no adults) and uniformed occupations (a judge is not a grandpa). Logged in `new/ART-NEEDS.md`. **When the art exists:** add Mode "Who is who" (K): frames show the people instead of blank plates, the child drags a family-word card onto a person and the same star walk plays from the star to that person — the walk ends on the card's frame = it docks; elsewhere = the frame it ends on pulses and the card returns. Everything else in this design is unchanged.
- **Ships now without them:** Riddle walk (forward + reverse), Generations, Clues, Explore — the whole grade 1–2 coverage.

## 13. The four questions
1. **Would a child choose it again?** Yes — a light that walks through a family one tap at a time, dead ends that flicker "nobody there", a star that hops and flips every word on the tree, and a crown that rustles when it is done.
2. **Would a teacher put it on the board?** Yes — "start at Mia, go up to her mom, then across" is exactly how teachers explain kinship; the row the light stops in IS the "grand-"; Nordic mormor/farfar are literally walked.
3. **Would a parent trust it?** No drawn people, no real names, no score; nothing about the child's own family is asked or stored; one conventional invented family per round, as on the reviewed worksheets.
4. **The invention:** every family word is a walk from the star — the steps of the riddle move a light along the tree, and the row and side where it stops is the word.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 3→5 · correctness 3→5 · distinctness 5→5 · reality 1→4 (grade-K faces stay BLOCKED on people art; the shipped grade 1–2 surface is fully real)
What changed:
- Applied the orchestrator ruling: the `family-figure.js` cast (drawn people = characters) is dropped; animal mother/baby pictures checked on the contact sheets and refused (one generation, no sex, #233's material). The primary design is now a WORDS-ONLY tree (option B) with the star walk intact; K-370/K-375 are marked BLOCKED with the exact 22-picture art need and the one mode to add when it exists.
- Replaced the drop-a-word-and-watch walk with STEP CHIPS (mom · dad · sister · brother · daughter · son): the child builds the riddle's possessive chain and the light walks it literally — dead ends flicker "nobody there", reversed chains visibly land on the other grandparent. This makes the walk the child's own reasoning, not an animation after a guess.
- Aligned every string with the K-370 bank (`riddleFrames`, `clueFrames`, path-keyed kin map, names, rule 11 "no first person"): riddles are about a named star ("Mia's mom's sister is Mia's ___"), not "my …".
- Wrote real round tables for all modes (9 forward riddles = the bank's 8 D2 paths + a cousin; 8 reverse walks accepting any valid walk ≤ 4 steps; 9 generation rounds; 8 clue rounds with one relative clue each and a brute-force uniqueness gate) and measured answer positions.
- Side colour on the grandparents' descent lines (never sex colour); sex is carried only by the words and the steps.
