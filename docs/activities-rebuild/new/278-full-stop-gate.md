# New #278 — The Full-Stop Gate → THE SENTENCE RAILWAY: engines, cabooses and the roof colours (L.1.2.b)

## 0. Identity
- id `full-stop-gate.play.l-1-2-b` · grade 2 · CCSS L.1.2.b (end punctuation; capitals at sentence starts and for names reinforce L.1.2.a) · strand Language · own files `full-stop-gate-core.js`, `full-stop-gate-activity.js`, `full-stop-gate-activity.html`, `full-stop-gate-activities.json` (scaffold: `node scripts/new-activity.js --num=278`).
- worksheets covered: **G2-274** Fix the Sentence (capital + end mark) · **G2-281** Capital and End Mark · **G2-282** Choose the End Mark (+ names) · **G2-307** Where Does It End? (two sentences ran together) · **G2-311** Two Sentences: Full Stop or Question Mark?
- new instrument (no old activity to keep).

## 1. The pitch
"A sentence is a little train: it needs an engine at the front — that's the capital — and a caboose at the back — that's the full stop or the question mark. Drop a caboose between two words and the train comes apart there; the car behind it becomes the next engine."

## 2. Why a child will want it again
- **Uncoupling is a toy.** A caboose dropped into a coupler goes *clunk*, the train *jolts apart* with a small gap opening, and the first car behind the gap visibly turns into an engine: it grows a chimney, a puff of steam, and its first letter stands up tall into a capital. Children drag cabooses around just to watch trains split and re-join (drag the caboose out and the two trains glide back together, *clack*).
- **The signal lever.** Check is a red-and-cream signal lever beside the track. Pull it and each finished train toots and rolls away into the tunnel, one after another, a light running over its cars from engine to caboose as if the train were reading itself.
- **The roof colours (the reveal that teaches).** If a train is wrong, its cars get coloured roofs showing which words belong to which thought — and the child sees the colour change sitting somewhere other than their caboose. Nobody tells them; the roofs do.
- **End-of-round show:** both trains leave; a little drawn departure board flips its two slots to the two end marks (. and ?), and the next jumbled train rolls in from the left with a long toot.
- No timer, no score, no streak. A wrong caboose costs nothing — drag it off again.

## 3. The skill and the misconception
- Skill (L.1.2.b + the five worksheets): find where one thought ends and the next begins in a run of words; end a telling sentence with **.** and an asking sentence with **?**; start each sentence (and every name) with a capital.
- Misconceptions and how the material pushes back:
  1. **"The full stop goes at the end of the line."** The track wraps into two rows through a **tunnel** at the right edge — exactly like a line of writing. At 704 px every split round's tunnel sits after a word that is NOT the sentence end (authored wrap index ≠ split index; gate-asserted). The tunnel coupler is a legal drop spot, so a child who puts the caboose at the line end makes a real, visible mistake — and the roof colours show the thought running straight through the tunnel.
  2. **"? is just another dot."** The two cabooses are different shapes (a round-backed **.** caboose, a hook-backed **?** caboose). An asking train with a **.** caboose: when the lever is pulled the caboose *refuses to couple* (it bounces off with a wobble) and the train's **asking lamp** lights over the car that makes it a question (the question word — *where, who, what* — or the verb that moved to the front — *can, is, do*). A telling train with a **?** caboose bounces it the same way, and the lamp stays dark (there is no asking car to light).
  3. **"The second sentence keeps its small letter."** With *Capitals: I stand the letters up*, the new engine does NOT change by itself: the child taps its first letter to stand it up. An engine left small cannot pull — on Check it stays put while its letter tile shakes once.
  4. **"A name is just a word."** (G2-282) In the same setting, names (Ben, Mia, Mom…) carry a small drawn star rivet on the car (no words) — their first letter must stand up too. Standing up the letter of an ordinary word inside a sentence makes it wobble and lie back down: only engines and names stand.
- One right answer per round: one split index, one mark per sentence (authored and native-checked; every asking sentence has a visible asking car).

## 4. The stage
**At 704 (stacked; the track needs the full width):**
- **The track** — two drawn rails (ink 2 px, sleepers every 24 px) across 640 px; up to 2 rows of track 92 px apart; a **tunnel mouth** (drawn arch 44 × 60, teal) at the right end of row 1 and its twin at the left of row 2.
- **Word cars** — cream boxes, 3 px ink outline, radius 8, height 58 px, width = word + 24 px (min 64), word in Nunito 800 **24 px**, two 12-px wheels. Coupler gap 16 px with a drawn link bar; each coupler has an invisible **44 × 58 hit zone** centred on it. The space after the last word is a coupler too (every sentence needs a caboose, including the last).
- **Engine car** — the first car of each train: a 16 × 14 chimney and a rounded nose on the left end; its first letter teal and 1.25×.
- **The caboose shed** (under the track, right half): two caboose tiles **72 × 72** — the **.** caboose (cream car with an 18-px ink dot) and the **?** caboose (cream car with a large **?**, hook-shaped back). Endless: dragging out takes a copy.
- **The signal lever** (Check) — a drawn lever 56 × 96 at the bottom-right; the shell's Check button sits beneath it and either one checks.
- **Meaning-cue picture** — one library picture per round, **104 × 104**, top-left above row 1 (e.g. animals/dog for "the dog ran home…"). A cue only; never needed to answer.
- **Feedback bubble** under the track (Nunito 20 px).
- Task line (EN, 22 px): split rounds — "Where does one sentence end? Drop the right caboose there." · end-mark rounds — "Give the train its caboose: . or ?"

**At 360:** cars 50 px tall, word 20 px, min width 56; the track wraps naturally to 3–4 rows (a tunnel pair at every row end — the gate checks that at most 2 of the 10 split rounds have their split exactly at a natural 360-px wrap, so the line-end lie still appears on phones); meaning picture 72 × 72 beside the task line; the shed becomes a row of two 64 × 64 tiles under the track; lever 48 × 80 at the shed's right. Stage ≈ 72 + 4 × 64 + 80 = 408 px → Check above the 360 × 740 fold; at 320 the words drop to 18 px (longest car in the EN bank ≈ 112 px), 4 rows, still above 640.

No words on the apparatus except the word cars (they ARE the content) and the marks on the cabooses (content).

## 5. The hand
- **Drag a caboose** from the shed (lift 60 ms, soft shadow) toward a coupler: the zone under the finger widens its gap 6 px as a preview (≤ 100 ms). Drop: *clunk* (wood, 220 Hz); the cars behind slide right 28 px (240 ms ease-out) to open a gap; the caboose seats on the end of the front train; the first car behind becomes an engine (chimney rises 160 ms, steam puff 400 ms; with *auto capitals* its first letter morphs to the capital — scale 1 → 1.25, ink → teal, 200 ms).
- **es:** dropping a **?** caboose also lights a small **¿** front lamp on that train's engine — the child chooses the shape; the pair is automatic. **fr:** the **?** caboose seats with a narrow no-break space (U+202F) before the mark.
- **Drag a caboose off** (or onto another coupler): the trains glide back together (*clack*, 240 ms), the engine loses its chimney, the letter shrinks back.
- **Tap-tap / keyboard:** tap a coupler (it glows), then a caboose tile; or ←/→ move a focus ring along couplers and letters, `.` / `?` drops, Backspace removes.
- **Stand a letter** (child-capitals): tap a car's first letter → it stands up (capital, *tick*); tap again → it lies down.
- **Free play:** after a round's success the trains can be re-split for fun while the next train waits at the tunnel; the lever only toots.
- Optional TTS (5 locales): tap the meaning picture → the whole run is read without pauses; tap a finished train → it is read with sentence intonation.

## 6. The rounds
**Task A — End mark** (G2-281/282). EN source; every locale native-writes its own 10 with the same mix.

| # | words on the cars (lowercase except "I") | caboose | asking car | names | cue picture |
|---|---|---|---|---|---|
| 1 | the frog is green | . | — | — | pets/frog |
| 2 | where are my shoes | ? | where | — | clothing/shoe |
| 3 | can we go outside now | ? | can (moved verb) | — | spring/kite |
| 4 | the sun is hot today | . | — | — | beach/sun |
| 5 | who is at the door | ? | who | — | around-the-house/door |
| 6 | I know where the cat is | . *(trap: a question word inside a telling sentence)* | — | — | animals/cat |
| 7 | are you hungry | ? | are (moved verb) | — | bakery/cupcake |
| 8 | mia and tom play ball | . | — | Mia, Tom | toys/ball |
| 9 | what is in the box | ? | what | — | christmas/present |
| 10 | the baby is sitting up | . | — | — | toys/baby |

Measured: **. 5 / ? 5**; asking cars: question word 3, moved verb 2; one trap. Shortcut bots (critic, `work-c29/bots278.js`): "a question word anywhere → ?" wins 7/10 (the trap row and the two moved-verb rows beat it); only the real rule (question word or moved verb FIRST) wins 10/10. Every cue picture shows what its sentence says (the old "the baby is asleep" was dropped: toys/baby sits up awake; "my red shoes" dropped: the shoe's colour is not promised).

**Task B — Split two sentences** (G2-307/311; place the caboose in the middle AND choose both marks):

| # | the run (EN) | split after word | fraction | marks | 704 tunnel after word |
|---|---|---|---|---|---|
| 1 | it is cold put on your warm red hat | 3 of 9 | 0.33 | . . | 6 |
| 2 | the dog ran home was it hungry | 4 of 7 | 0.57 | . ? | 5 |
| 3 | can you see the moon it looks so big | 5 of 9 | 0.56 | ? . | 4 |
| 4 | we made a cake for mom do you want some | 6 of 10 | 0.60 | . ? | 5 |
| 5 | where is my hat I left it here | 4 of 8 | 0.50 | ? . | 3 |
| 6 | are we late let us run to the bus stop | 3 of 10 | 0.30 | ? . | 6 |
| 7 | is it raining can we still go out | 3 of 8 | 0.38 | ? ? | 5 |
| 8 | ben has a shiny new kite can I fly it | 6 of 10 | 0.60 | . ? | 4 |
| 9 | the little brown dog dug a very big hole is it deep | 9 of 12 | 0.75 | . ? | 6 |
| 10 | do you like apples I like pears best | 4 of 8 | 0.50 | ? . | 5 |

Measured (scratch `work-29/split.js`): split fractions 0.30 · 0.33 · 0.38 · 0.50 · 0.50 · 0.56 · 0.57 · 0.60 · 0.60 · 0.75 — three under 0.4, three at/over 0.6, so "the caboose goes in the middle" fails as a strategy; **? fills 10 of 20 mark slots (50 %)**; first marks . 5 / ? 5; combinations .. 1 · .? 4 · ?. 4 · ?? 1; the tunnel never sits at the split. The second sentence opens with put, was, it, do, I, let, can, can, is, I — no single opener word a child could learn as "split before it".
Names inside the runs: Mom (r4), Ben (r8); "I" (r5, r8, r10) is already capital — an English-only trap (§9).
Shortcut bots on Task B (critic-measured): "split in the middle" 4/10 · "split before the first question word or helping verb after word 1" 5/10 · "split before the first pronoun after word 2" 3/10 — none reaches the 10/10 that reading the thoughts gives. The per-locale gate re-runs these three bots and fails any locale where one wins more than 6/10.

**Task C — Fix it all** (G2-274): Task A's sentences with *I stand the letters up* forced on — stand the engine letter and every name letter, then add the caboose.

**Settings change it:** Task A / B / C; capitals auto / child. In Task B *auto*, the engine flips itself the moment the caboose drops, so the child can READ the two new sentences before pulling the lever — reading them is the self-test.
**Names under each capitals setting (one rule, no ambiguity):** with *The engine stands up by itself*, names arrive already standing (Mia, Tom, Ben, Mom — teal first letter, star rivet visible) and are never graded; with *I stand the letters up* (and always in Task C), every name lies down and is graded with the engines (G2-274/282).

**Answer position:** split measured above. In Task A the caboose always goes on the end coupler (the position is not the question — the shape is), balanced 5/5. Order: order-only reshuffle per pass (Fisher–Yates; a new pass never repeats the previous pass's order).

## 7. Check, the misses, the success
- **Check with no caboose anywhere** → hint, no miss: "Every sentence needs a caboose at its end." (the shed's tiles pulse once).
- **Miss 1** — the apparatus shows only the FIRST problem, in this order:
  - *wrong split*: the two cars on either side of the child's caboose get coloured roofs (teal = first thought, coral = second) — both roofs are the SAME colour, so the thought runs through the caboose. Hint: "Read the train up to your caboose. Is that one whole thought?"
  - *only one caboose* (Task B): the last car of the first thought rattles. Hint: "One thought ends somewhere in the middle too."
  - *wrong mark*: that caboose bounces off; the asking lamp lights over the asking car (or stays dark on a telling train). Hint: "Does this train ask something? Asking trains get the ? caboose."
  - *engine still small*: its letter shakes. Hint: "An engine stands its first letter up tall."
  - *name still small*: the star rivet glints. Hint: "Names stand their first letter up too."
- **Miss 2** — the stronger showing: ALL roofs coloured (the full teal/coral boundary visible), every asking car's lamp lit, every name's star glowing. Hint: "The roofs change colour where one thought ends."
- **A new move** (drag, drop, stand) clears roofs and lamps until the next Check.
- **Success:** the trains leave one after another with the reading light running over them; the departure board flips to the marks. Bubble: "{sentence1} {sentence2} Two sentences: each one starts with a capital and ends with its mark." (Task A/C: "{sentence} — a capital at the front, {mark} at the end.")

## 8. Settings (each visibly changes the board at rest)
1. **Task:** End mark · Split two sentences · Fix it all — one short train with one end coupler / a long two-row run through a tunnel / a short train whose letters all lie down.
2. **Capitals:** The engine stands up by itself · I stand the letters up — in the second, every car's first letter shows a small drawn grip notch at rest.

## 9. Words (EN source; the other 10 locales written by hand, then one native + pedagogy reviewer)
- title: "The Full-Stop Gate" · instruction: "Drop a caboose where each sentence ends: . for telling, ? for asking. The car behind it becomes the next engine."
- prompts: "Where does one sentence end? Drop the right caboose there." · "Give the train its caboose: . or ?" · "Stand up the capitals, then give the train its caboose."
- hints: "Every sentence needs a caboose at its end." · "Read the train up to your caboose. Is that one whole thought?" · "One thought ends somewhere in the middle too." · "Does this train ask something? Asking trains get the ? caboose." · "An engine stands its first letter up tall." · "Names stand their first letter up too." · "The roofs change colour where one thought ends."
- celebration: "{sentence1} {sentence2} Two sentences: each one starts with a capital and ends with its mark." · "{sentence} — a capital at the front, {mark} at the end."
- settings: "Task" — "End mark" / "Split two sentences" / "Fix it all"; "Capitals" — "The engine stands up by itself" / "I stand the letters up".
- **Locale traps and how the design survives each:**
  - **es** — questions open with **¿**: the **?** caboose adds the ¿ lamp automatically; the gate asserts every es question renders ¿…? and never a lone ¿. Spanish questions are often not inverted ("¿Tienes hambre?") — native writers pick items with a question word or a clear verb-first form, because the asking lamp needs a car to light.
  - **fr** — U+202F before **?**, none before **.**; inversion ("Peux-tu…") or a question word gives the asking car. Sentence-internal "maman" is not a name in French — writers use real first names for the name task.
  - **de** — nouns are always capital: (a) with auto capitals the engine's start is shown by **teal + chimney**, never by case alone; (b) writers avoid a noun as the first word of sentence 2 in Task B so the change is visible; (c) with child capitals, noun capitals are pre-stood (grey, not tappable) — only engines and names are the child's. Questions are verb-first or W-word.
  - **nl / sv / da / no** — V2 inversion makes questions visible (verb first). The pronoun "I" is lowercase (ik, jag, jeg) — EN's always-capital "I" car exists only in en.
  - **fi** — no articles; yes/no questions carry the clitic **-ko/-kö** ("Onko sinulla nälkä?") — the asking car is the word carrying it (native-marked).
  - **it / pt** — questions may differ from statements only by intonation; writers use question-word items (dove, chi, cosa / onde, quem, o que) so the lamp has a car.
  - **Names** come from each locale's `names` list in `scripts/worksheet-gen/data/b2/sentences.js` (already native-reviewed); EN "Mom" becomes a real first name where the family word is not capitalised mid-sentence (fr, it, es, pt, nl, Nordic), and in de "Mama" is a noun (already capital — not a name task).
  - Runs of 7–12 words in every locale; per-locale gate: ≥ 2 split fractions under 0.4 and ≥ 2 at/over 0.6, 40–60 % **?** in Tasks A and B.

## 10. Sound off, access, phones
- Fully legible with sound off: caboose shapes, chimneys, teal capitals, roof colours, the asking lamp.
- Keyboard: Tab to the track, ←/→ along couplers and letter tiles, `.` / `?` drops, Space stands a letter, Enter pulls the lever.
- aria: car "word {w}, car {i} of {n}"; coupler "between {w1} and {w2}"; cabooses "full stop caboose" / "question mark caboose"; after Check, roofs announce "{w1} and {w2} are in the same sentence".
- Taps: coupler zones 44 × 58, letter tiles ≥ 44 × 44 (the whole first-letter region), cabooses 72 / 64 px. Meaning picture 104 at 704, 72 at 360 (≥ 64). Check above the 360 × 740 and 320 × 640 folds.

## 11. Distinct from
- **Row 128 The Sentence Stage** (L.1.1.j — a script acted out word by word; the full stop closes the curtain): that grades complete sentences by acting them out; here the child places boundaries in an unpunctuated run and chooses the mark.
- **Row 77 The Magnet Plates and the Golden "And"**: joining, not splitting; no end marks.
- **Row 176 Dr. Plume's Sentence Clinic — THE LISTENING LINE** (L.2.1/L.2.2): a voice line drawn over finished sentences rests at a full stop and lifts at a question mark, diagnosing a muddled sentence by intonation. Here the child physically CUTS an unpunctuated run into sentences (the caboose is a coupler you drop, the car behind becomes an engine), chooses each mark by its shape, and stands capitals — boundary-finding, which the Listening Line never asks for. No shared object, no shared feedback (roofs vs a voice line).
- **#10 The Animal Train**: the train is only a costume for counting; no couplers, engines or splitting.
- Wally's Capital Crane (names) and Wiggles' Sentence Builder (word order) never find sentence boundaries; no premium tool punctuates.

## 12. Build plan
- **Core state:** `{ words:[{t, kind:'plain'|'name'|'always'|'nounCap'}], couplers:[{after:i, mark:null|'.'|'?'}], stood:Set<i>, task, capitals, round }`. Functions: `drop(after, mark)`, `lift(after)`, `stand(i)`, `trains(state)` → split runs with engine index, `evaluate(round, state)` → first problem `{kind:'none'|'split'|'missing'|'mark'|'capital'|'name'|'ok', at}` in §7's order, `roofs(round)` → per-word thought index from the authored split, `askingCar(round, s)`.
- **Verify gate (own oracle from the authored data only):** exhaustive over every coupler × mark placement for runs ≤ 12 words — `evaluate` is ok ONLY for the authored split + marks; per locale: ? share 40–60 %, split-fraction spread (≥ 2 < 0.4, ≥ 2 ≥ 0.6), 704 wrap ≠ split, no second-sentence opener used more than twice, every asking sentence has `askingCar ≥ 0`, every trap row contains a question word but `askingCar = −1`; es every question renders ¿…?; fr U+202F before ?; de no noun opens a Task-B second sentence.
- **Mutations (one per rule):** accept . on a question · accept a split one word early · treat the tunnel coupler as a sentence end · auto-stand in child-capitals mode · let an ordinary word stand · drop ¿ in es · drop U+202F in fr · show roofs before Check · keep roofs after a new move · serve rounds sorted instead of shuffled.
- **Pictures to verify on a contact sheet:** pets/frog, clothing/shoe (a low loafer — fine for "shoes"), spring/kite, beach/sun (weather/sun is unlabelled), around-the-house/door, animals/cat, bakery/cupcake, toys/ball (a black-and-white football, never "red ball"), christmas/present, toys/baby, animals/dog, space/moon. Task-B cue pictures are chosen per locale from its own sentences.
- **Risks:** native writers must give every asking sentence a real asking car; runs are capped at 12 words (5 rows at 320 otherwise). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — splitting and re-joining trains, chimneys popping up, the lever and the departures are a toy in themselves.
2. **Would a teacher put it on the board?** Yes — "where does the thought end?" read aloud by the class; the roof colours make the answer discussable; the line-end tunnel is exactly the classroom error.
3. **Would a parent trust it?** Calm, no words on the apparatus beyond the sentence, no score, real sentences native-written per language.
4. **The invention:** a sentence is a train — the capital is its engine, the end mark its caboose — and dropping a caboose between two words makes the car behind it the next engine.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- Two cue pictures contradicted their sentences (toys/baby is awake and sitting, not "asleep"; the shoe's colour is not "red") — sentences rewritten so the picture shows what the words say.
- Measured the shortcut bots I could think of (question-word-anywhere 7/10 on Task A; middle 4/10, wh/aux-opener 5/10, pronoun-opener 3/10 on Task B) and wrote a per-locale bot ceiling (> 6/10 fails) into the gate; the designer's split-fraction, mark and opener claims re-measured and true.
- One rule for names under each capitals setting (auto: pre-stood, ungraded; child/Task C: graded) — the old text left Task A round 8 undefined.
- Distinct-from now names Row 176 The Listening Line (end marks by a voice line), the one sibling that also grades . and ?.
- Locale rules checked: es ¿…? pair is automatic and gated; fr U+202F only before ?; de noun capitals pre-stood and never at a Task-B split; Nordic/nl lowercase "jeg/jag/ik"; fi -ko/-kö marks the asking car — all true.
