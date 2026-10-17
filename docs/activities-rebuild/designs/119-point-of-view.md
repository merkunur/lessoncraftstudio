# Row 119 — Lumen's Lighthouse Windows → THE WINDOW THAT SHOWS WHAT IT SEES (RL.1.6)

## 0. Identity
- **id** `point-of-view.who-told.rl-1-6` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv da no fi get new slug/title/intro at build, grade 1) · CCSS RL.1.6 ("identify who is telling the story at various points in a text") · strand Reading: Literature · own files `point-of-view-core.js` (new), `point-of-view-activity.js` (rewritten), html, `point-of-view-activities.json` (rounds kept, repaired, extended).
- **Worksheets covered:** none mapped.
- **Old activity:** an event ("A red boat sailed into the harbor."), the storyteller's line ("The boat looked like a tiny dot, far away."), three creatures at a high, middle and low window (hand-drawn glyphs); tap the window it was told from. **Kept:** the lighthouse, Lumen the owl (now the library `birds-2/owl`), the creature names Gull, Mim, Hop, Bru, the frozen intro's idea ("high up, things look tiny and far; down low, big and close"), and 6 of the 9 EN events with their lines (boat, fish, crab, sail, jelly, ship→kept as spare) plus their de/fr/es/pt/it/nl versions. **Repaired:** the middle window was never the answer (a child could always ignore it) — middle rounds are added; "A seagull swooped past" while a character is named Gull is replaced; the town-at-night and wave events have no honest library picture (the beach "water" picture is a bottle; the wave drawing is unlabelled) and are replaced. **Added:** Level 2, where different creatures tell different lines of one story — "at various points", the standard's own words.

## 1. The pitch
"Tap a window and the harbor appears exactly as that creature sees it — from the top, the boat is a tiny dot; from the bottom, it fills the whole window — so you find the storyteller by matching their words to their view; and when several creatures take turns telling, each 'I' has to fit the one who says it."

## 2. Why a child will want it again
- **A lighthouse you look out of.** A tall red-and-white lighthouse (a drawn tower with three window frames; the library `beach/lighthouse` is its badge) stands beside a big **view panel**. Each window has a creature looking out: Gull, Mim, Hop or Bru.
- **The view changes when you choose a window.** Tap a window and the view panel slides to *that* creature's eyes (a 400 ms zoom): high window → wide harbor seen from above, the event's object reduced to a tiny dot far away; middle window → the object straight ahead at eye level, the size of a hand; low window → the object HUGE, so close it is cut off by the frame. Children flick between windows just to watch the harbor zoom.
- **The earned show:** when the storyteller is found, Lumen's lamp at the top of the lighthouse swings its beam onto that window, the creature leans out and waves (a 300 ms hop), and the line is written onto a little message card that drops into Lumen's logbook.
- **Free play:** between rounds, the windows can be tapped freely to look around the harbor; the beam can be spun.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RL.1.6):** identify who is telling a story, and who is telling at different points: the storyteller's words ("I", "me", "right past my nose") show where they are and who they are.
- **Misconception 1 — the storyteller is whoever the story is about** ("the line is about the boat, so the boat is telling"). The windows are the only choices, and the line's *view* words (tiny, far, below / right in front of me / huge, close, over me) decide.
- **Misconception 2 — ignoring the words that show viewpoint** (picking the creature you like). The view panel shows what each creature actually sees; only one window's view matches the line.
- **Misconception 3 (Level 2) — one teller for the whole story.** The story's lines are told by different creatures; each "I" line carries a body or place clue ("I flapped my wings", "I hid under a rock with my pincers tucked in", "I curled my long thin tail") and the named part lights on the right creature — or finds nothing on the wrong one.
- **The material pushes back** by perspective (the view panel) and by bodies (the named part must exist on the teller). No text says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: the lighthouse + view panel left (460 px), the event card + line + bubble right (220 px); stacked below.

**At 704 px:**
- **The lighthouse** (left edge, 150 × 420): a DRAWN tower (apparatus geometry: a tapered body in red-and-white bands, a gallery rail and a lamp room) — the library `beach/lighthouse` is too slim to carry three 96 px windows, so it appears only as a 64 px badge in the event card's corner; three drawn window frames on its side at high / middle / low, each 96 × 96, holding the round's creature picture at 96 × 96 (the window frame is drawn ON TOP of the picture's edge, so the creature looks out). Lumen (library `birds-2/owl`, 96 px) sits on the gallery at the top beside the lamp (drawn).
- **The view panel** (beside the tower, 290 × 290): a framed window onto the harbor (drawn geometry: water band, horizon line, a pier). It shows the round's object as seen from the chosen window: **high** → the horizon near the top, wide water, the object as a **drawn dot token** (12 px, in the object's main colour) far out — never a shrunken picture (orchestrator ruling); **middle** → the object's library picture at 120 px at eye level on the horizon; **low** → the object's picture at 300 px, rising out of the bottom edge, cropped by the frame. At rest (no window chosen) the panel shows Lumen's lamp-glow and the words of the line are the only clue.
- **The event card** (right column top, 210 × 150): the event sentence (18 px) with the object's library picture 96 × 96 — so the child always knows what the dot is.
- **The storyteller's line** (a speech-bubble card, 210 × 90, 20 px): "The boat looked like a tiny dot, far away."
- **Task line (EN, 22 px):** "Read what the storyteller saw. Which window was it told from?" (Level 2: "Who is telling each part? Give each part to its teller.")

**At 360 px:** single column: event card (328 × 96; picture 72 px beside the sentence) → line card (328 × 72) → a row with the lighthouse (110 px wide; windows 72 × 72 holding 64 px creatures — the window frame overlaps only their edges so the picture itself stays ≥ 64) and the view panel (210 × 210: middle object 96 px, low object 210 px cropped, high dot 10 px) side by side → Check ≈ 620 px (360 × 740). At 320 × 640: lighthouse 100, windows 68 (pictures 64), panel 190, Check ≈ 590.
- No words on the apparatus except the story text (content).

## 5. The hand
- **Tap a window** → it lights, the view panel zooms to that creature's view (400 ms, ease-out), a soft wind/sea sound. Tapping another window re-zooms. The chosen window stays selected for Check.
- **Check:** the beam swings to the chosen window and the line card flies to it (§7).
- **Level 2:** the story's three line cards sit under the event card; drag a line (or tap a line, then a window) to a window → the line hangs from that window like a little flag. Each window can hold several lines (one creature may tell two parts), every line must hang somewhere before Check.
- **Long-press the line** → TTS where a voice exists.
- **Keyboard:** Tab through windows (and lines in Level 2); Enter chooses / hangs; arrow keys move the chosen line between windows; C = Check.
- **Free play:** tap windows to look around between rounds; tap Lumen's lamp to spin the beam.

## 6. The rounds
**Level 1 — From which window? (12 rounds per pass, 4 high · 4 middle · 4 low; order-only reshuffle).** The creatures' window positions change every round (kept idea), so the answer is never "always Gull".
| # | event (picture) | storyteller's line (EN) | view | creatures high / middle / low |
|---|---|---|---|---|
| 1 | A red boat sailed into the harbor. (beach/boat) — kept | The boat looked like a tiny dot, far away. | high | Gull / Mim / Bru |
| 2 | A fish jumped in the bay. (ocean-life/fish) — kept | The fish was just a tiny speck down below. | high | Mim / Bru / Gull |
| 3 | A sailboat raced past. (beach/sailboat) — kept | The sailboat looked teeny-tiny, far off. | high | Hop / Mim / Bru |
| 4 | A whale spouted out at sea. (ocean-life/whale) — NEW (replaces the town at night) | Its spout was a tiny puff, far, far away. | high | Bru / Gull / Mim |
| 5 | A crab scuttled by. (beach/crab) — kept | The crab was huge, right next to me. | low | Hop / Gull / Mim |
| 6 | A jellyfish drifted by. (ocean-life/jellyfish) — kept | The jellyfish was right under me, big and close. | low | Bru / Gull / Hop |
| 7 | A dolphin jumped near the rocks. (beach/dolphin) — NEW (replaces the wave) | The dolphin was huge, and it splashed water up into my face! | low | Hop / Gull / Mim |
| 8 | A pelican swooped low over the water. (beach/pelican) — NEW (replaces the seagull) | It swooped right over my head, so big and close! | low | Gull / Mim / Bru |
| 9 | A kite flew past the lighthouse. (beach/kite) — NEW | The kite was straight across from me, just as high as my window. | middle | Bru / Hop / Mim |
| 10 | A balloon floated by. (things-that-fly/balloon) — NEW | The balloon bobbed straight across from me, not up, not down. | middle | Hop / Gull / Bru |
| 11 | A helicopter hovered over the harbor. (vehicles/helicopter) — NEW | I looked straight across, and there it was, the size of my hand. | middle | Mim / Bru / Hop |
| 12 | A butterfly flew around the lighthouse. (forest-creatures/butterfly) — NEW | It fluttered straight across from my window, not up, not down. | middle | Hop / Gull / Mim |
The kept "A big ship crossed the sea. / The ship was so small, way out far." is a spare high round for locales whose whale line reads poorly. The **creature at the answer window** varies: Gull 3, Mim 3, Hop 3, Bru 3 over the pass (gate-measured), so "pick the bird for high" does not work either.
- **Creatures:** Gull = beach/seagull · Mim = forest-creatures/mouse · Hop = forest-creatures/rabbit · Bru = beach/crab (the old "friend" glyph becomes the crab, the creature that lives lowest by the water). The gate also forbids an event object equal to a window creature (round 5 is a crab event, so Bru sits that round out). Answer creatures over the pass: Gull rounds 1, 10, 12 · Mim 2, 5, 7 · Hop 3, 6, 9 · Bru 4, 8, 11.

**Level 2 — Who tells each part? (8 three-line stories; each line told by one creature; one creature may tell two lines):**
| # | story (EN; each line in first person) | tellers |
|---|---|---|
| 1 | "I flapped my wings and landed on the very top." · "I curled my long thin tail and squeaked at the smell of cheese." · "I scuttled sideways into a little pool." | Gull · Mim · Bru |
| 2 | "I hopped up the stairs, my long ears bouncing." · "From up here, the boats look like toys!" · "I snapped my pincers at a passing fish." | Hop · Gull (high view) · Bru |
| 3 | "I squeaked and wrapped my long thin tail around a crumb." · "I spread my wings and rode the wind." · "A wave rolled right over my shell!" | Mim · Gull · Bru |
| 4 | "I wiggled my long ears and sniffed the sea air." · "I swished my long thin tail too!" · "I watched them both from high in the sky." | Hop · Mim · Gull |
| 5 | "I hid under a rock with my pincers tucked in." · "I peeked down and saw a tiny crab far below." · "I thumped my big back feet." | Bru · Gull · Hop |
| 6 | "I flapped up to the gallery rail." · "I dug a hole in the sand with my pincers." · "I looked straight across at the passing kite." | Gull · Bru · Hop (middle window) |
| 7 | "I flew in a circle around the lamp." · "I curled my long ears down to sleep." · "I flew back up and called goodnight." | Gull · Hop · Gull |
| 8 | "I pinched some seaweed with my pincers." · "Everything looks huge from down here!" · "I squeaked hello from the middle window." | Bru · Bru (low view) · Mim |
Window places in Level 2 are fixed per story: Gull high, Bru low, and Mim or Hop in the middle (when both appear, the other sits on the low ledge beside Bru, and no view line in that story points to the middle or the low window). Each line names a **body part or a way of moving that only its teller has**, or a **view** only its window gives. **The closed per-creature lists (critic-rewritten 2026-10-17):** Gull — wings, beak, flies · Mim — long thin tail, squeaks · Hop — long ears, big back feet, hops · Bru — pincers, shell, scuttles sideways. **Banned in every line, because two creatures share them:** whiskers, nose, sniffing, nibbling and claws (a real rabbit has whiskers, a nose and claws just like a mouse — and the library rabbit is drawn WITH whiskers; the old lines "I twitched my whiskers", "I wiggled my nose", "I nibbled a crumb", "I dug … with my claws" each had two right tellers). The gate checks every line's clue against the four lists (each per-locale word list owned by the gate) and fails any line whose clue appears in two lists or in the banned list. Lines told by the same creature twice appear in 2 of 8 stories (7, 8), so "one teller each" is a misconception the stories test.

**Answer position.** Level 1: views 4/4/4; the answer window's creature 3/3/3/3; the answer is never the same window three rounds in a row (reshuffle constraint). **View words are kept disjoint (critic):** high lines carry *tiny / far / below*; middle lines carry *straight across* and *not up, not down* and never *right past* or *close*; low lines carry *huge / big and close* and an *over me / under me / up into* word — the old middle line "flew right past my window" and the old low line "right past my nose" each read as either window. The gate owns per-locale view-word lists and fails a line holding words from two views. Level 2: the teller order is shuffled per story so the first line is not always the top window's creature; the gate measures ≤ 3 of 8 for "line 1 → high window".

## 7. Check, the misses, the success
- **Check with no window chosen** (Level 1) or with lines not yet hung (Level 2) → no miss; the windows glow in turn. Hint: "Tap a window to see what that creature sees."
- **Level 1 — Miss 1:** the view panel shows the chosen window's view next to the line card; the line's view words (*tiny dot, far away*) underline; the view shows the opposite (a huge boat, cut off). Hint: "From this window, the {object} looks {big and close|tiny and far|straight ahead}. Does that match the words?"
- **Level 1 — Miss 2:** the panel splits into three small strips (high / middle / low views side by side, each labelled only by its window's outline position) for the child to compare; the line's view words pulse. Hint: "Which window shows the {object} the way the storyteller says?"
- **Level 2 — Miss 1:** each wrongly hung line's named part searches on the wrong creature: a dashed outline drifts over the creature's picture looking for *wings* and fades — the part isn't there; the line swings loose on its flag. Correct lines stay hung. Hint: "Does {name} have {part}? Who could say this?" (view lines: "Could {name} see that from this window?")
- **Level 2 — Miss 2:** on every creature picture, its own body parts get a small marker dot (wings, long thin tail, long ears, pincers) for the lines still loose. Hint: "Find the creature that has what the line says."
- A new choice removes the help until the next Check.
- **Success:** Lumen's beam lands on the window(s); creatures wave; the line card drops into the logbook. Bubble: Level 1 "Yes — {name} told it from the {high|middle|low} window!" · Level 2 "Yes — {nameA}, then {nameB}, then {nameC} told the story!"

## 8. Settings
1. **Task:** From which window? / Who tells each part? — at rest: one line card and three windows (Level 1), or three line cards hanging from the event card (Level 2).
2. **View panel:** shows after you choose / always shows all three views — the second lays the three views side by side from the start (for whole-class talk on a whiteboard; the board visibly changes).

## 9. Words (EN source)
- title "Lumen's Lighthouse Windows" · instruction "Read what the storyteller saw. Which window was it told from?" · instruction (Level 2) "Who is telling each part? Give each part to its teller."
- hints: empty "Tap a window to see what that creature sees." · l1miss1 "From this window, the {object} looks {view}. Does that match the words?" · l1miss2 "Which window shows the {object} the way the storyteller says?" · l2miss1 "Does {name} have {part}? Who could say this?" · l2miss1view "Could {name} see that from this window?" · l2miss2 "Find the creature that has what the line says."
- view phrases {view}: "tiny and far away" · "straight ahead, the size of a hand" · "big and close"
- success: "Yes — {name} told it from the {high|middle|low} window!" · "Yes — {nameA}, then {nameB}, then {nameC} told the story!"
- settings: "Task" — "From which window?" / "Who tells each part?" · "View panel" — "Shows after you choose" / "Always shows all three views"
- aria: window "{position} window, {name}" · view "View from the {position} window: the {object} looks {view}" · line "Storyteller says: {line}".
- **Locale traps.** (1) First-person forms carry gender in some languages in the past tense (pt/es/it/fr participle agreement: fr "je suis montée" vs "monté"; es/pt adjectives "cansado/cansada") — lines are written so no gendered form reveals or contradicts the teller (prefer present tense or gender-neutral verbs; reviewer checks). (2) Creature names stay the kept per-locale names (de Pip/Mimi/Ben/Hoppel); Bru becomes the crab in every locale — the native author renames it where the kept name implies another animal (de "Ben" was the old "friend"). (3) Body-part words: tail de "Schwanz", fr "queue", es "cola", fi "häntä", sv "svans"; a crab's pincers de "Scheren", fr "pinces", es/pt "pinzas/pinças", it "chele", nl "scharen", fi "sakset" — ⚠ sv/da/no *klor/klør* are also a rabbit's claws, so there the native author picks a crab-only word (e.g. sv "klosaxar") or the line uses the shell / sideways instead; whiskers, nose, claws, nibbling are banned in every locale (both mammals have them). (4) "Tiny dot / speck" idioms per locale (de "winziger Punkt", fr "un tout petit point"). (5) Window positions: "high / middle / low window" — use the same three adjectives throughout one locale.

## 10. Sound off, access, phones
- Legible with the sound off: the line, the event card and the view panel carry everything; TTS on long-press is a bonus (reading the line IS the skill).
- Views differ in SIZE and POSITION, not colour; reduced motion: views switch without zoom.
- Keyboard §5; live region: "View from the high window: the boat looks tiny and far away."
- Taps: windows 96/72 px; lines ≥ 52 px; Check 48 px.
- Pictures: creatures 96/64 px; event picture 96/72 px; middle-view object 120/96 px; Lumen 96/64 px. The high view uses a drawn dot token (ruling), never a sub-64 picture.
- Check above the fold at 360 × 740 (≈ 620) and 320 × 640 (≈ 590).

## 11. Distinct from
- **New 244 The Rising Camera** (maps: the camera climbs to show a view from above) — a geography perspective tool; here perspective is a *reading clue* matched against the storyteller's words, and Level 2 is about tellers.
- **Row 66 Inky's Two Inks** (who makes the words vs the pictures) — author/illustrator roles, not narrators.
- **Row 116 lantern / 117 lens / 118 shelves** (siblings) — different inventions.
- No premium tool shows per-character views.

## 12. Build plan
- **Core** `LumenWindowsCore`: round L1 `{id, event, object:{picture, dotColour}, line, view:'high'|'middle'|'low', chars:{high,middle,low}}`; L2 `{id, lines:[{text, teller, clue:{part|view}}], chars}`; `viewFor(window)` → render spec (dot / mid / huge-cropped); `checkL1(round, window)`; `checkL2(round, hangings)` → per line ok; `parts(creature)` closed lists; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-point-of-view-core.js`): an independent EN answer table; for every locale: L1 views 4/4/4, answer creature 3/3/3/3, no event object equals a window creature's picture, no window answers 3 times in a row in any shuffled pass; every L1 line contains a locale view marker from the gate's own per-locale lists (tiny/far · straight across · huge/close/right under); L2 every line's `clue.part` is in exactly one creature's part list (or its `clue.view` matches exactly one window), and 2 of 8 stories reuse a teller; the high view never renders a picture (dot only).
- **Mutations (each killed):** middle never the answer · always Gull for high · L2 accepts a line on a creature without the part · high view renders a shrunken picture · the event object is also a window creature · the view panel shows before a window is chosen (setting "after you choose") · same order every pass.
- **Pictures to verify on contact sheets:** beach/lighthouse ✓, birds-2/owl ✓, beach/seagull ✓, forest-creatures/mouse ✓ (long thin tail visible), forest-creatures/rabbit ✓ (long ears), beach/crab ✓ (claws, shell), beach/boat ✓, beach/sailboat ✓, ocean-life/fish ✓, ocean-life/whale ✓, ocean-life/jellyfish ✓, beach/dolphin ✓, beach/pelican ✓, beach/kite ✓, things-that-fly/balloon, vehicles/helicopter, forest-creatures/butterfly ✓.
- **Risks:** the creature pictures must sit inside drawn window frames without cropping below 64 px (frame overlaps edges only); kept de–nl creature names need a Bru-as-crab rename where the kept name implies another animal. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — looking out of a lighthouse and watching the harbor zoom from a dot to a giant is irresistible.
2. **Teacher on the board?** Yes — "who is telling, and how do you know?" answered from the words, with the three views side by side for class talk; Level 2 is exactly "at various points in a text".
3. **Parent trust?** Library pictures, gentle harbor stories, no scores.
4. **Invention:** each window shows the harbor exactly as its creature sees it, so the storyteller is the one whose view matches their words — and each "I" must fit the body of the one who says it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 4→5
What changed:
- **Level 2 had four two-answer lines:** "I twitched my whiskers", "I wiggled my nose", "I nibbled a crumb", "I dug … with my claws" — a rabbit has whiskers, a nose and claws and nibbles just as a mouse does (and the library rabbit is drawn with whiskers). The creatures now have disjoint closed lists (Gull wings/beak/flies · Mim long thin tail/squeaks · Hop long ears/big back feet/hops · Bru pincers/shell/sideways), shared parts are banned, and every story line is rewritten to them.
- **Level 1 middle vs low made unambiguous:** "right past my window/nose" read as either; view words are now disjoint per view (middle = straight across, not up not down; low = huge/close + over/under/up) and gate-checked.
- **The tower is drawn apparatus**; the slim library lighthouse could not hold three 96 px windows, so it becomes a badge.
- Distinct from 063/064/069/070/071 (bookmark, flipbook, highlighter, umbrella, dominoes): none involves a viewpoint; the window/view-panel and the body-part test are this activity's own.
