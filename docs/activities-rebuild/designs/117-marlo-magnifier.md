# Row 117 — Marlo's Magnifier → THE LENS THAT FINDS, THEN FOCUSES (RL.1.3)

## 0. Identity
- **id** `marlo-magnifier.trait-evidence.rl-1-3` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv da no fi get new slug/title/intro at build, grade 1) · CCSS RL.1.3 ("describe characters, settings, and major events in a story, using key details") · strand Reading: Literature · own files `marlo-magnifier-core.js` (new), `marlo-magnifier-activity.js` (rewritten), html, `marlo-magnifier-activities.json` (rounds kept, extended).
- **Worksheets covered:** G2-254 "Read and Answer", G2-269–G2-273 "Reading Comprehension: Story 2–6" (read a short story and answer who/what/where/when/why with details from the text) → **Level 3 "Questions"** (§6). Teaching point carried: answer who/what/where/when/why with details *from the text*.
- **Old activity:** read a three-sentence story, read a trait claim ("Mira is brave."), tap the one of three detail cards that proves it. **Kept:** all 8 EN stories, claims, trait words and details, and the de/fr/es/pt/it/nl sets (which have their own locale stories — kept verbatim); Marlo the raccoon is now the library `forest-creatures/raccoon`. **Changed:** each round gains one detail that IS in the story but does not prove the trait (Level 2), every supporting detail records which story sentence it comes from, and Level 3 asks a question instead of a claim.

## 1. The pitch
"Put a clue card in Marlo's magnifier and it checks two things, in order: first the lens slides over the story looking for where that clue happened — if it's not in the story, the lens fogs up; then it swings up to the claim — and only a clue that really proves it makes the word *brave* snap into sharp focus."

## 2. Why a child will want it again
- **A real detective lens on a swinging arm.** Marlo's brass magnifier (drawn geometry: a round lens with a thick rim, a jointed arm fixed at the board's edge) hovers over the story. The child drops a clue card into the clip under it.
- **The search sweep.** On Check the lens glides along the story sentence by sentence (a 160 ms hop per sentence, a soft tick), making each word swell slightly under the glass like a real magnifier (a 1.25× scale inside the lens circle). When it finds the sentence the clue comes from, it stops, that sentence glows, and a little dotted thread links the clue card to it.
- **The focus snap.** Then the arm swings up over the claim card, where the trait word sits blurred behind the glass (CSS blur 3 px). A real proof turns the focus ring — click-click-click — and the word snaps sharp, a gold seal thumps onto the claim, and Marlo (library raccoon) peeks over the card and gives a nod.
- **Fog.** A clue that isn't in the story makes the lens slowly fog over with a breath-cloud and the sweep comes back empty — funny and clear.
- **The earned show:** the solved case card slides into Marlo's case board (a cork strip at the bottom), with the story's key sentence pinned to the claim by the thread. At the end of a pass the board holds every case.
- **Free play:** the lens can be dragged over the story at any time — words magnify under it (pure play, no checking).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RL.1.3):** describe a character using key details; back a claim about a character with a detail from the story that shows it; answer who/what/where/when/why questions with details from the text (G2-254, G2-269–273).
- **Misconception 1 — "any true-sounding detail is proof".** Level-1 distractors use the story's own words but say what did NOT happen ("She ran away from the dark cave.") → the lens sweeps every sentence, finds nothing that says it, and fogs. The child learns evidence must come FROM the text — and that sounding like the text is not the same as being in it.
- **Misconception 2 — "anything in the story is proof".** New Level-2 distractors ARE in the story ("A loud growl came from inside.") → the lens finds them (the sentence lights), but the trait word stays blurred. Being in the story is not enough; the detail must SHOW the trait.
- **Misconception 3 — answering from memory, or with a detail that answers a different question** (Level 3). For "Where did Mira go?", the card "A loud growl came from the cave" is in the story but answers *what* happened — the WHERE word on the question card stays blurred.
- **The material pushes back** by the lens itself: two checks, in the order a reader should make them (Is it in the text? Does it show the claim?). No text says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: story + lens left (430 px), claim card + clue tray + bubble right (240 px); stacked below.

**At 704 px:**
- **The story card** (left, 420 × 230): the three sentences on separate lines, 20 px Nunito, line height 1.7, each sentence a block 54–64 px tall. A small library picture of the story's key object sits at the card's top corner (88 × 88, true to the story — §6 picture column).
- **The lens** (130 px rim) on its arm, parked at the top-right of the story card.
- **The claim card** (right top, 230 × 110): "Mira is **brave**." in 22 px with the trait word in 28 px bold, behind a fixed glass circle (blurred at rest).
- **Marlo:** library `forest-creatures/raccoon`, 96 × 96 px, beside the claim card.
- **The clue tray:** 3 clue cards 230 × 60 (18 px text; Level 2: 3 cards drawn from 4 — §6).
- **The case board:** a cork strip 660 × 56 under everything, holding solved case tabs (one per round, 40 × 40 seals).
- **Task line (EN, 22 px):** "Read the story. Which clue proves the claim?" (Level 3: "Read the story. Which clue answers the question?")

**At 360 px:** single column: claim card (328 × 96, Marlo 64 px beside it) → story card (328 wide, 18 px text, sentences 2 lines each) with the lens (96 px rim) parked at its right edge → clue cards 328 × 52 stacked → Check at ≈ 650 px (360 × 740). At 320 × 640: 17 px story text, cards 48 px, Check ≈ 610. The case board becomes the progress chip.
- No words on the apparatus except the story, the claim/question and the clues (content).

## 5. The hand
- **Choose a clue:** tap a clue card → it slides into the clip under the lens (220 ms). Tap another → swaps. One clue at a time.
- **Check:** the sweep runs (§2) — sentence hops 160 ms, find-stop 300 ms glow, swing to the claim 400 ms, focus 3 × 120 ms clicks.
- **Free lens:** drag the lens anywhere over the story (magnifies the words under it). It returns to its park when a clue is dropped.
- **Long-press a sentence** → TTS where a voice exists.
- **Keyboard:** Tab through clues; Enter clips one; C = Check; L toggles a keyboard-driven lens that moves sentence by sentence with arrows.

## 6. The rounds
**8 rounds per level, order-only reshuffle per pass.** One right clue per round.

**Level 1 — Proof** (the SHIPPED stories are the re-ordered ones below; distractors DID NOT HAPPEN in the story but reuse its words — critic rewrite, see the note after the table)
| # | claim | shipped story (3 sentences) | proof (source) | distractors (did not happen) | picture |
|---|---|---|---|---|---|
| 1 | Mira is brave. | Mira took a breath and went into the dark cave. / A loud growl had come from inside. / Her friends cheered when she came out with a sleepy bat. | She went right into the dark cave. (1) | She ran away from the dark cave. · Her friends went in the cave first. | forest-creatures/bat |
| 2 | Sam is kind. | Sam saw a new kid sitting all alone at lunch. / Sam moved his tray and shared his food. / After that, the new kid smiled all day. | Sam gave the new kid some of his food. (2) | Sam moved his tray away from the new kid. · The new kid shared his food with Sam. | classroom/lunchbox |
| 3 | Lena is curious. | Lena found a strange, shiny rock. / She turned it over and over. / She asked the teacher how it was made. | She asked the teacher how the rock was made. (3) | She asked the teacher to throw the rock away. · She threw the shiny rock away. | none (camping/rock is a boulder — *Felsen/Rocher/Klippa* — not a small shiny stone) |
| 4 | Theo is careful. | The kitchen floor was slippery and wet. / Theo took tiny, slow steps with his tall stack of cups. / He got to the table and spilled none. | He walked with tiny, slow steps. (2) | He took big, fast steps on the wet floor. · He spilled all of his cups. | kitchen-tools/cup |
| 5 | Ada is patient. | The little seed took weeks to sprout. / Ada watered it every single morning. / She waited and waited, and at last it grew. | She waited weeks for it to grow. (3) | She watered it one morning and then forgot. · The seed grew the next morning. | spring/bud |
| 6 | Bo is honest. | Bo told his mom the truth right away, even though no one had seen. / He had broken a vase by accident. / Mom gave him a big hug. | He told his mom the truth. (1) | He told his mom the cat broke the vase. · He hid the broken vase. | around-the-house/vase |
| 7 | Nina is generous. | Nina had three shiny stickers. / Her best friend had none at all. / Nina handed two of hers right over. | She gave two stickers to her friend. (3) | She kept all three shiny stickers. · Her best friend handed her two stickers. | none (no sticker art; a star picture would point at nothing in the story) |
| 8 | Max is hardworking. | Max raked all afternoon until the yard was clean. / The yard had been full of leaves. / His friends had run off to play. | He raked leaves all afternoon long. (1) | He ran off to play with his friends. · He raked for a minute. | around-the-house/rake |
Proof sources over rounds 1–8: 1,2,3,2,3,1,3,1 → sentence 1 ×3, 2 ×2, 3 ×3.
- **Why the distractors changed (measured, `scratchpad/des/work-c24/marlo*.js`).** The kept distractors ("She wore her favorite red boots.") shared NO words with the story, so the card with the most story words was the proof in **7 of 8** rounds — a child could match words and never read *brave*. The new distractors reuse the story's own words but say what did NOT happen (or the opposite), so Marlo's lens sweeps them and fogs: a word-overlap bot now wins **3/8** (Level 1) and **1/8** (Level 2). Lengths balanced in the same pass: the proof is the longest card in 0/8 and the shortest in 0/8 (Level 1); longest 2/8 (Level 2). The kept distractors are retired (recorded in the manifest's `retiredDistractors` for the history), because they were a measured tell. The kept de–nl locale stories get the same treatment from their native authors (re-order for source balance; distractors that reuse story words but did not happen).
- **Card position — a fixed balanced table:** the proof's displayed slot over rounds 1–8 is 1,2,3,1,2,3,2,3 (2/3/3) in Level 1, 3,1,2,3,1,2,1,3 in Level 2, 2,3,1,1,3,2,3,1 in Level 3; each pass rotates by +1. The gate asserts ≤ 3 of 8 per slot, the word-overlap bot ≤ 3/8 and proof-longest / proof-shortest ≤ 3/8 in every level and locale.

**Level 2 — Proof or just a detail? (same 8 stories; one distractor replaced by an IN-story non-proof):**
| # | in-story distractor (new; source) |
|---|---|
| 1 | A loud growl came from inside. (2) |
| 2 | The new kid smiled all day. (3) |
| 3 | The rock was strange and shiny. (1) |
| 4 | The floor was slippery and wet. (1) |
| 5 | The seed took weeks to sprout. (1) |
| 6 | Bo broke a vase by accident. (2) |
| 7 | Nina had three shiny stickers. (1) |
| 8 | The yard had been full of leaves. (2) |
Cards per round: proof + the in-story non-proof + the FIRST did-not-happen distractor of Level 1 (3 cards). (The old row 7, "Nina kept one sticker for herself", was true only by inference and shared one word with its sentence — the lens could not honestly "find" it.)

**Level 3 — Questions (G2-254, G2-269–273; same stories as re-authored; every card is in the story):**
| # | question | right clue | in-story wrong clues |
|---|---|---|---|
| 1 | Where did Mira go? | into the dark cave | A loud growl came from inside. · Her friends cheered. |
| 2 | Who sat alone at lunch? | a new kid | Sam moved his tray. · Sam shared his food. |
| 3 | What did Lena find? | a strange, shiny rock | She asked the teacher. · She turned it over and over. |
| 4 | Why did Theo walk slowly? | The floor was slippery and wet. | He got to the table. · He spilled none. |
| 5 | When did Ada water the seed? | every single morning | at last it grew · It took weeks to sprout. |
| 6 | What did Bo break? | a vase | the truth · a big hug |
| 7 | How many stickers did Nina give away? | two | three · none |
| 8 | When did Max rake the leaves? | all afternoon | the yard had been full of leaves · his friends had run off to play |
The gate rejects any round where a wrong clue also answers the question (critic removed "until the yard was clean" from round 8 — it answers *how long*, a near-twin of *when*; e.g. "with his tall stack of cups" is also a reason in round 4, so it is never offered as a card). Question words spread: where 1 · who 1 · what 2 · why 1 · when 2 · how many 1. The focus ring in Level 3 sharpens the **question word** (WHERE) on the question card.

## 7. Check, the misses, the success
- **Check with no clue** → no miss; the lens clip glints. Hint: "Put a clue card under the lens."
- **Miss 1 — what the lens SHOWS:**
  - not in story → the sweep passes every sentence, nothing lights, the lens fogs. Hint: "Marlo can't find that clue in the story. Pick a clue the story tells you."
  - in story, not proof → the source sentence lights, the arm swings up, the trait word stays blurred and the focus ring turns and slips. Hint: "That is in the story. But does it show that {name} is {trait}?"
  - Level 3 wrong answer → sentence lights, question word stays blurred. Hint: "That is in the story. Does it tell {questionWord}?"
- **Miss 2:** the lens parks over the sentence that holds the proof and that sentence's key words underline (*went into the dark cave*), while the trait/question word on the card pulses. Hint: "Look at the sentence under the lens. Which clue says the same thing?"
- A new clue removes the help until the next Check.
- **Success:** find → swing → click-click-click → sharp → gold seal → Marlo nods → case tab pins to the board. Bubble: "Proved! {name} is {trait}: {proof}" (Level 3: "Yes! {question} — {answer}.")

## 8. Settings
1. **Case:** Proof / Proof or just a detail? / Questions — at rest the claim card shows a claim with a blurred trait word, or a question card with a blurred question word (Level 3).
2. **Story picture:** on / off — the corner picture is shown or hidden (off = pure text).

## 9. Words (EN source)
- title "Marlo's Magnifier" · instruction "Read the story. Which clue proves the claim?" · instruction (questions) "Read the story. Which clue answers the question?"
- hints: empty "Put a clue card under the lens." · notInStory "Marlo can't find that clue in the story. Pick a clue the story tells you." · notProof "That is in the story. But does it show that {name} is {trait}?" · notAnswer "That is in the story. Does it tell {questionWord}?" · miss2 "Look at the sentence under the lens. Which clue says the same thing?"
- success "Proved! {name} is {trait}: {proof}" · questions "Yes! {question} — {answer}."
- question words for {questionWord}: "where" · "who" · "what" · "why" · "when" · "how many"
- settings: "Case" — "Proof" / "Proof or just a detail?" / "Questions" · "Story picture" — "On" / "Off"
- aria: clue "Clue: {text}" · lens "Magnifier, holding: {text|empty}" · claim "Claim: {claim}" · sentence "Story sentence {i}: {text}".
- **Locale traps.** (1) Trait adjectives agree with the character in fr/es/it/pt ("Mira est courageuse", "Sam est gentil") — the kept locale stories already pair names and agreement; new Level-2/3 text follows the same characters. (2) de/nl/sv V2 word order in the success line ("Bewiesen! Mira ist mutig: …") — authored literals. (3) fi: trait word in nominative after *on* ("Mira on rohkea"); question words *missä/kuka/mitä/miksi/milloin/montako* and the answer forms are case-bearing ("pimeään luolaan" illative) — the right clue is authored as the answer phrase in the case the question demands. (4) Names come from each locale's kept story set (de stories use their own names and events — e.g. de round 1 is a school trip; keep them). (5) "How many" answers are number WORDS in the story text ("two") — keep as written in each locale's story; no numeral conversion. (6) es-MX register.

## 10. Sound off, access, phones
- Legible with the sound off; TTS (long-press) is a bonus; the story is always visible (the lens magnifies but never hides).
- Blur is paired with a shape cue (the focus ring's notches turn; the seal appears) for low-vision users; reduced motion: no blur animation, the word simply switches from grey to bold ink.
- Keyboard §5; live region: "Found in sentence 2. Not proof." / "Not in the story."
- Taps: clue cards 60/52 px; sentences ≥ 54 px; lens 96–130 px; Check 48 px.
- Pictures: Marlo 96/64 px; story picture 88/64 px.
- Check above the fold at 360 × 740 (≈ 650) and 320 × 640 (≈ 610).

## 11. Distinct from
- **Row 69 Atlas's highlighter** (lift words from an informational text into a frame) and **Row 63 Bookmark** (mark the page/thing that answers) — locating an answer. Marlo's lens tests a *given* clue in two ordered checks (in the text? shows the claim?) — evidence evaluation, a different act.
- **Row 67 Proof Pins** (sentence words fly to a picture) — picture–text match; Marlo is text–claim.
- **Row 116 Juniper's lantern** (sibling): lesson vs detail by light and transfer; **Row 119 Lumen's windows** (sibling): point of view.
- No premium tool uses a lens.

## 12. Build plan
- **Core** `MarloLensCore`: round `{id, band, claim|question, name, trait|qWord, story[3], clues:[{id, text, source: 0|1|2|null, proves: bool}], picture}`; `sweep(round, clueId)` → `{found: index|null}`; `focus(round, clueId)` → bool; `level(rounds, n)` builds Level 1/2/3 card sets; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-marlo-magnifier-core.js`): an independent EN table of right clues; for every locale and level: exactly one clue with `proves`; every clue with a `source` shares ≥ 2 content words with that story sentence (stemmed per locale); every `source:null` clue is a reviewer-signed did-not-happen claim and at least one per round shares ≥ 2 content words with the story (so word-matching cannot solve the round); Level 3 clues all have a source; proof source sentences balanced (no index > 3 of 8); displayed slot ≤ 3/8; Level 2 includes one in-story non-proof per round.
- **Mutations (each killed):** not-in-story clue lights a sentence · in-story non-proof focuses the trait · proof's source always sentence 3 · Level 3 accepts a clue that answers another question · lens shows the result before Check · two clues in the clip · same order every pass · story picture setting has no effect · the word-overlap bot beats > 3/8 · the proof is longest or shortest in > 3/8 · a did-not-happen distractor lights a sentence.
- **Pictures to verify on contact sheets:** forest-creatures/raccoon ✓, forest-creatures/bat ✓, classroom/lunchbox, camping/rock — CHECKED: labelled Felsen/Rocher (a boulder) → round 3 has no picture, kitchen-tools/cup, spring/bud, around-the-house/vase, christmas/star — dropped (round 7 has no picture), around-the-house/rake.
- **Risks:** re-ordering the kept de–nl stories needs the native authors (sentence order + small connectives only). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a swinging detective lens that sweeps, fogs and snaps into focus, and a case board that fills.
2. **Teacher on the board?** Yes — it models the two questions every teacher asks about evidence: "Where does it say that?" and "Does that show it?"
3. **Parent trust?** Warm stories about kindness and courage, library pictures, no scores.
4. **Invention:** a magnifier that checks a clue twice — first it searches the story for it (fog if it isn't there), then it focuses the claim only if the clue really proves it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **A word-matching tell killed (measured):** the old "not in the story" distractors shared no words with the story, so "pick the card with the most story words" found the proof 7/8. New distractors reuse the story's words but describe what did NOT happen (the lens fogs) → overlap bot 3/8 (L1), 1/8 (L2); lengths re-balanced (proof longest 0/8, shortest 0/8 in L1).
- **Level 1 table now shows the SHIPPED re-ordered stories** (the old table showed the kept wording and a separate paragraph of edits — a builder could ship the wrong one).
- **Two-right-answer risks removed:** Level 2 round 7's "kept one sticker" (inference only) → "Nina had three shiny stickers"; Level 3 round 8's "until the yard was clean" (answers how long ≈ when) removed.
- **Pictures:** round 3 (camping/rock is a boulder) and round 7 (no sticker art) carry no picture rather than a wrong one.
- **Card position is a fixed balanced table per level, rotated per pass.**
- Distinct from 063 (bookmark: find where the answer is) and 069 (highlighter: lift the answer from a text): here a GIVEN clue is tested twice — in the text? does it prove the claim?
