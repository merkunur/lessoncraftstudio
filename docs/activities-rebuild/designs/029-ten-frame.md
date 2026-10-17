# Row 29 — Quick Facts to 5 → THE MUSIC-BOX STRIP (K.OA.A.5)

## 0. Identity
- id `ten-frame.quick-facts-to-5.k-oa-a-5` (KEPT; slugs/metadata frozen in all 11 locales) · grade K · CCSS K.OA.A.5 · Operations & Algebraic Thinking · own files `music-box-core.js`, `music-box-activity.js`, `music-box-activity.html`, `music-box-activities.json` (this row leaves `ten-frame-activities.json`; the other ten-frame rows stay on their engine untouched; the id is unchanged).
- Frozen title "Quick Facts to 5 — Add & Subtract Fluently"; frozen intro promises: see a quick fact like 3 + 2 or 5 − 2, then tap the answer fast — a ten-frame is there if you want to check; fluently add and subtract within 5. **All kept true** (the fact, the fast tap, the five-frame check on demand).
- Worksheets also covered: **G1-101** Add the Pictures and **G1-102** Picture Addition (fact shown as library pictures) · **G1-110** Domino Math (fact shown as a domino) · **G1-111** Roll and Add (fact shown as two dice) · **G1-105** Ten-Frame Addition (the check frame; the "to 10" level) · **K-268** Add and Subtract Coloring and **K-267** Subtraction Color by Code (mixed + and − facts; every answer is a "colour" — a bar — exactly like a colour code) · **K-269** Color by Code: Sums to 20 is covered only up to 10 (the "to 10" level); sums 11–20 belong to the teen rows.
- Old activity: eight facts within 5 (2+1, 2+2, 2+3, 1+3, 5−2, 4−1, 3−1, 5−1), three answer choices each, a one-frame ten-frame for checking. **Kept:** every one of the eight facts (now in the fact pool), + and − within 5, the quick tap, the five-frame check. **Changed:** the three choices become a fixed row of **number bars** 1–5 (a metallophone whose bars are as long as their numbers); every right answer **punches a hole in a music-box strip**, and a round's facts are chosen so that their answers, in order, are the notes of a song — the strip plays the song only if every hole is right.

## 1. The pitch
"Every answer is a note: tap the right bar and it punches a hole in the music-box strip — get a whole row of facts right and the strip plays a song you know."

## 2. Why a child will want it again (the fun)
- **A real instrument.** Five chunky bars, each exactly as long as its number (bar 3 is three blocks long), struck with a little mallet that bounces off. Children tap the bars just to play them — free music between rounds.
- **The punch.** A right answer punches a crisp round hole in a paper strip with a "chk!" and the strip shuffles one step through the music box, ready for the next fact.
- **The song is a secret until the end.** During a round a struck bar answers with a soft wooden "tok" (mallet on felt) — not its musical note — and the lid picture is closed, so the child cannot guess the next answer by humming the tune. When the strip is full the child turns the crank: the strip rolls back through the comb and plays the round's melody — Frère Jacques, Ode to Joy, Lightly Row — while each hole lights as it sounds, and the song's picture (a bell, a boat, a duck) pops up on the music box lid. The song is the prize, and it is built from the child's own answers.
- **No hurry, ever.** Nothing on the stage reads the time. The song plays at the crank in its OWN tempo (stored per song), identical whether the strip took twenty seconds or ten minutes; there is no faster-is-better sound, no streak, no clock. Fluency here means knowing the fact, and the reward for knowing is the song — not the speed. (The frozen intro's word "fast" stays in the metadata only; nothing on screen says fast.)
- **The rod check.** A wrong bar does not buzz: the fact's own rods slide out and lie beside the bar you tapped, and you can see they are not the same length.
- **Free play ("Music box"):** punch your own strip by tapping bars, then crank it and hear your own tune.

## 3. The skill and the misconception
- **Skill (K.OA.A.5):** fluently add and subtract within 5 — know `3 + 2 = 5`, `5 − 2 = 3` quickly. The covered worksheets show the same facts as pictures, dominoes and dice, and stretch to 10.
- **Misconception 1 — guessing a number "near" the fact, or answering with one of its numbers (3 + 2 → 3).** **Push back:** the bars are as long as their numbers. A wrong tap lays the fact's rods (a 3-rod and a 2-rod joined end to end) right beside the tapped bar: next to bar 4 the joined rod sticks out by one block; next to bar 3 it sticks out by two. The material shows the error's size.
- **Misconception 2 — subtraction makes the number bigger / "take away" means add.** **Push back:** a subtraction rod is the first number with the taken-away blocks shown breaking off and dropping out (they fall below the rod); what remains is laid beside the tapped bar.
- **Misconception 3 — 1 + 4 and 4 + 1 are different facts to memorise.** In picture/domino mode a domino turned round is the same domino; the strip records both facts on the same hole row — the same note.
- **Misconception 4 — counting all from 1 for every fact (not yet fluent).** The bars themselves and the optional five-frame make the quantities visible, but the reward (a flowing song) favours knowing; the five-frame appears only when asked for.

## 4. The stage
Layout `stack` (the strip runs across the full width; it needs the length).

**At 704 px:**
- **Task line** 22 px: **"Tap the bar for the answer."** (unchanging).
- **The music box** (656 × 150 px, top): a drawn wooden box (warm brown #B57A45 with 3 px ink, a hinged lid open at the back) with a **comb** (five metal teeth on the right side, drawn) and a **crank** (a 56 px knob on the box's right face). The **strip** (a cream paper band 520 × 96 px) runs through the box from left to right with **five hole rows**, one per bar (row 1 at the top … row 5 at the bottom, faint guide lines); punched holes are 16 px circles. The **reading window** on the strip's left shows the **fact card** for the current fact.
- **The fact card** (196 × 120 px, in the window): the fact in the chosen display — Numbers: `3 + 2` at 56 px; Dots: two dice faces (≤ 6) or two five-frames (6–10) at 48 px; Pictures ("to 5"): two groups of one library fruit at 96 px in 2-column clusters (a group of 5 = 2 + 2 + 1 rows), the card growing to 656 × 300 in this mode, with a "+" or the taken-away pictures crossed with a coral slash; Pictures ("to 10"): the groups sit as drawn counters on two ten-frames with ONE 96 px fruit as the label (orchestrator ruling: never shrink library pictures into frame cells); Domino (addition only): a library-styled drawn domino with pips (apparatus geometry, two halves).
- **The bars** (656 × 200 px, the hero, below the box): five metallophone bars side by side, left to right **1, 2, 3, 4, 5**; bar k is k blocks tall (block = 34 px, so bar 5 = 170 px; width 96 px), each block a rounded square with a centre dot (the bar IS a counted rod), alternating cream / pale gold for blocks 1–5 so five reads as a whole. The numeral sits on a disc at the bar's foot (40 px, 26 px digit). Bars stand on two felt rails. **Pitch follows the physics: the longer the bar, the lower the note** (bar 5 = C5, 4 = D5, 3 = E5, 2 = F5, 1 = G5).
- **The five-frame button** (48 px, a small frame icon, beside the fact card): toggles the check frame.
- **The song lid picture** (inside the open lid, 96 px): hidden until the song plays.
- **Bubble** (≤ 2 lines) under the bars, right; speaker 36 px.

**At 360 px:** task line → music box 336 × 120 (strip 260 × 78, rows 12 px holes, crank 48 px) → fact card 336 × 96 (numbers 44 px; dice 40 px; pictures 64 px in 2-column × 3-row clusters, two groups = 2 × 136 + a 40 px sign = 312 px, card 336 × 200 in this mode — no under-64 exception; the song picture stays 72 px) → bars 336 × 190 (bars 60 px wide, block 30 px, bar 5 = 150 px, digit discs 36 px) → bubble. There is no Check button (a bar tap is the answer); the crank (end of round) sits on the box at 48 px. Everything fits by ≈ 600 px at 360 × 740. At 320 × 640: bars 54 px wide, block 26 px; ≈ 560 px.

**Level "to 10":** ten bars 1–10 (block 16 px at 704, so bar 10 = 160 px; width 56 px; at 360 bars 30 px wide — taps 30 px are below 44, so at < 600 px the ten bars wrap into two rows of five, 1–5 above 6–10, each bar 60 px wide, block 14 px), ten hole rows on the strip. Pitch: 10 = C4 … 1 = E5 (longest lowest).

**Library pictures:** fact pictures — fruits/strawberry, fruits/apple, fruits/lemon, fruits/pear, fruits/orange (one kind per fact, identical instances). Song pictures — christmas/bell (Frère Jacques), vehicles/boat (Lightly Row), farm animals/duck (Alle meine Entchen), christmas/star (Twinkle), bakery/bun (Hot Cross Buns), music/trumpet (Ode to Joy), space/moon (Au clair de la lune), farm animals/lamb (Mary). All seen on the contact sheets (critic: bakery/bun is a round bread roll — fine as the Hot Cross Buns badge; music/trumpet is a clear trumpet; do NOT use music/trombone, which is drawn as a horn).

**Words on the apparatus:** numerals only (bar discs, the fact card).

## 5. The hand
- **Tap a bar:** within 30 ms a drawn mallet head (a 28 px ball) strikes it, the bar dips 3 px and springs back (160 ms). In a round it sounds a short wooden "tok" (the same for every bar, so the melody cannot leak); in free play, during playback and with the teacher setting "Notes: As you go" it rings its own note (WebAudio sine + soft harmonic; works in every locale — not TTS).
  - **Right answer:** the strip punches: a hole appears in that bar's row at the current position with "chk!" (with "Notes: As you go" the bar's note sounds instead), the fact card slides out of the window to the left and the next fact slides in (260 ms). The strip advances one step.
  - **Wrong answer:** nothing is punched. The fact's **rods** slide out of the fact card and lie vertically beside the tapped bar, bottoms aligned: addition = an a-block rod (coral) stacked on a b-block rod (teal); subtraction = an a-block rod whose top b blocks crack off and drop away (300 ms) leaving a − b. The difference with the bar is visible (blocks sticking out above, or the bar sticking out above the rod). The rods stay until the next tap.
- **Five-frame button:** opens a five-frame (or ten-frame in "to 10") under the fact card with the fact as counters (coral a, teal b; for subtraction a counters with b of them turned grey and slid out of the frame). Toggle; it never answers by itself.
- **Crank** (appears when the strip is full): drag round or tap. The strip rewinds and plays: each hole lights as it passes the comb and sounds its bar's note in the song's rhythm (stored per song as durations); the matching bar dips as it plays, so the child sees the song walk along the bars. The song's picture pops up on the lid (bounce, 400 ms). Tap the crank again to replay.
- **Free play ("Music box"):** no facts; every bar tap punches a hole; the crank plays the child's own strip.

## 6. The rounds
One round = one song phrase = 6–8 facts; the facts' answers, in order, are the phrase's notes. Facts are drawn per note from the pool for that answer, never repeating a fact within a round while an unused one remains, so the same song brings different facts each pass.

**Fact pool, within 5 (no 0 operand, no 0 result):**
- answer 1: 2 − 1, 3 − 2, 4 − 3, 5 − 4
- answer 2: 1 + 1, 3 − 1, 4 − 2, 5 − 3
- answer 3: 1 + 2, 2 + 1, 4 − 1, 5 − 2
- answer 4: 1 + 3, 3 + 1, 2 + 2, 5 − 1
- answer 5: 1 + 4, 4 + 1, 2 + 3, 3 + 2
(The old eight facts 2+1, 2+2, 2+3, 1+3, 5−2, 4−1, 3−1, 5−1 are all in it.) With "Facts: add only" the − facts are removed and answer 1 (which has no addition fact without 0) is dropped from the songs by using the add-only tune set below.

**Level "to 5" — 8 rounds (bars 1–5; notes C=5, D=4, E=3, F=2, G=1):**
| # | song phrase (picture) | answers in order |
|---|---|---|
| 1 | Frère Jacques, bars 1–2 (bell) | 5 4 3 5 5 4 3 5 |
| 2 | Ode to Joy, line 1 (trumpet) | 3 3 2 1 1 2 3 4 |
| 3 | Lightly Row, line 1 (boat) | 1 3 3 2 4 4 |
| 4 | Lightly Row, line 2 (boat) | 5 4 3 2 1 1 1 |
| 5 | Frère Jacques, "dormez-vous" bars 3–4 (bell) | 3 2 1 3 2 1 |
| 6 | Ode to Joy, line 2 (trumpet) | 5 5 4 3 3 4 4 |
| 7 | Alle meine Entchen, start (duck) | 5 4 3 2 1 1 |
| 8 | Hot Cross Buns (bun) | 3 4 5 3 4 5 |

**Add-only set (when "Facts: add only"; answers 2–5, so only the notes C D E F are used; a tune may be transposed to fit — Ode to Joy in another key is still Ode to Joy) — 7 rounds:** 1 Hot Cross Buns (bun) 3 4 5 3 4 5 · 2 Ode to Joy line 1, one step lower (trumpet) 4 4 3 2 2 3 4 5 · 3 Au clair de la lune, start (space/moon) 5 5 5 4 3 4 · 4 Mary Had a Little Lamb, start (farm animals/lamb) 3 4 5 4 3 3 · 5 Ode to Joy line 2 (trumpet) 5 5 4 3 3 4 4 · 6 Frère Jacques, first phrase twice (bell) 5 4 3 5 5 4 3 5 · 7 Au clair de la lune, whole first line — the long one, 11 facts (space/moon) 5 5 5 4 3 4 5 3 4 4 5. Answer-2 notes use 1 + 1 only.

**Level "to 10" — 7 rounds (bars 1–10; notes 10=C4, 9=D, 8=E, 7=F, 6=G, 5=A, 4=B, 3=C5):**
| # | song phrase (picture) | answers in order |
|---|---|---|
| 1 | Twinkle Twinkle, line 1 (star) | 10 10 6 6 5 5 6 |
| 2 | Twinkle Twinkle, line 2 (star) | 7 7 8 8 9 9 10 |
| 3 | Alle meine Entchen, start (duck) | 10 9 8 7 6 6 |
| 4 | Frère Jacques, bars 1–2 (bell) | 10 9 8 10 10 9 8 10 |
| 5 | Ode to Joy, line 1 (trumpet) | 8 8 7 6 6 7 8 9 |
| 6 | Ode to Joy, line 2 (trumpet) | 10 10 9 8 8 9 9 |
| 7 | Lightly Row (boat) | 6 8 8 7 9 9 10 |
Fact pool for "to 10": every a + b (a, b 1–9) and a − b (a ≤ 10, b ≥ 1) with results 5–10 (no 0), e.g. answer 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1, 8−1, 9−2, 10−3.

**Answer position:** the bars never move (their place is their value, like a number line), so position is not a tell by construction; what could leak is **the melody** (a musical child predicting the next note). By default it cannot: bars "tok" during a round, the song picture is closed, and the songs are shuffled, so the child does not know which tune the strip is until the crank. Also measured and bounded: in every round the most frequent answer is ≤ 50 % of the facts (highest 4 of 8, 5 of 11 in the long Au clair round) and a "tap the same bar again" strategy hits ≤ 3 per round (the gate prints both per round). Only a teacher who turns on "Notes: As you go" lets the melody sound while answering (a conscious choice for a music-and-maths lesson). The melody table was checked note by note (critic): every phrase is the true tune, all public domain (Frère Jacques, Ode to Joy, Lightly Row/Hänschen klein, Alle meine Entchen, Hot Cross Buns, Twinkle/Ah ! vous dirai-je, maman, Au clair de la lune, Mary Had a Little Lamb). A wrong tap never advances, so no guess can punch a wrong hole.

**Order:** order-only reshuffle of the songs per pass; never the same order twice; within a round the note order is fixed (it is the song), the facts on each note are re-drawn every pass.

## 7. Check, the misses, the success
There is no Check button: a bar tap is the answer (quick facts). The ladder works per fact.
- **No tap for 8 s:** no miss; the five-frame button pulses once — an offer, not a hint.
- **Miss 1 (wrong bar):** the bar sounds; the fact's rods lie beside it (§5) — the stick-out shows by how much. Bubble: **"Look — the rods and the bar are not the same height."**
- **Miss 2 (second wrong bar on the same fact):** the five-frame opens by itself with the fact as counters, and the rods move along the bar row to rest beside the bar of their own height, which lifts its numeral disc 4 px — the child still taps it. Bubble: **"Count the counters, then tap that bar."**
- **A new tap takes the help away** (the rods slide home, the frame closes unless opened by the child).
- **Success (each fact):** the punch, the strip step. No sentence per fact (it would slow fluency); the bubble shows the fact completed in small type for 1 s: `3 + 2 = 5`.
- **Round success:** the crank turns gold. After the song plays: **"You played Frère Jacques!"** (song names per locale, §9) — and a short sentence with the facts' count: **"7 facts, 7 notes!"** Pass end: all the strips hang across the top as a little songbook: **"Your music box knows 8 songs!"**

## 8. Settings
1. **Show facts as:** Numbers / Dots / Pictures (default Numbers) — the fact card at rest changes (`3 + 2` → two dice faces or a domino → two groups of fruit). Dots shows dominoes for addition and dice-with-crosses for subtraction.
2. **Notes:** At the end / As you go (default At the end) — At the end: bars "tok" while answering and the song is heard only at the crank (no melody to lean on); As you go (a teacher's choice): every bar rings its note, so the tune is heard as it is punched. The bars' sound at rest changes the moment the setting is touched (one demonstration ring of bar 3).
(The **Level** — to 5 / to 10 — and **Facts** — add and subtract / add only — are the activity's level chooser, shown in the drawer's first row; default to 5, add and subtract.)

## 9. Words (EN source)
- on-screen title: **Quick Facts to 5**
- instruction: **Tap the bar that answers the fact. Every right answer punches a hole — fill the strip, then turn the crank to hear your song!**
- task line: **Tap the bar for the answer.**
- hints: **Look — the rods and the bar are not the same height.** · **Count the counters, then tap that bar.**
- success: **{a} + {b} = {c}** / **{a} − {b} = {c}** (flash) · **You played {song}!** · **{n} facts, {n} notes!** · **Your music box knows {n} songs!** · crank label (aria only): **Turn the crank**
- song names (per locale, authored): Frère Jacques · Ode to Joy · Lightly Row · Alle meine Entchen · Hot Cross Buns · Twinkle Twinkle Little Star · Au clair de la lune · Mary Had a Little Lamb
- free play: **Music box** · settings: **Show facts as** — **Numbers** / **Dots** / **Pictures** · **Notes** — **As you go** / **At the end** · **Level** — **To 5** / **To 10** · **Facts** — **Add and subtract** / **Add only**

**Locale traps:**
- **Song names are local:** Frère Jacques = de "Bruder Jakob", es "Martinillo", pt "Frei Martinho"/"Irmão Jorge" (reviewer picks the Brazilian one), it "Fra Martino", nl "Vader Jacob", sv "Broder Jakob", da "Mester Jakob", no "Fader Jakob", fi "Jaakko kulta". Twinkle = de "Morgen kommt der Weihnachtsmann" (the same tune; or "Funkel, funkel, kleiner Stern"), fr "Ah ! vous dirai-je, maman", es "Estrellita, ¿dónde estás?", pt "Brilha, brilha, estrelinha", it "Brilla brilla la stellina", nl "Twinkel twinkel kleine ster", sv "Blinka lilla stjärna", da "Blinke lille stjerne", no "Blinke, blinke, lille stjerne" (reviewer confirms the Norwegian title in use), fi "Tuiki tuiki tähtönen". Ode to Joy = "Ode an die Freude", "Hymne à la joie", "Himno de la alegría", "Hino da Alegria", "Inno alla gioia", nl "Ode aan de vreugde", sv "Ode till glädjen", da "Ode til glæden", no "Ode til gleden", fi "Oodi ilolle". **Lightly Row / Hot Cross Buns / Mary Had a Little Lamb are English-only names** — in other locales use the local song on that tune where one exists (Lightly Row = de "Hänschen klein", also known in nl/sv/da; Mary = fr/es/pt/it rarely known) or the neutral "{the boat song}" style name chosen by the reviewer; the picture carries the identity. The song TEXT is never shown or sung — only the tune (all public domain).
- **The minus sign** is the true "−" (U+2212), never a hyphen; fi/sv/da/no write `5 − 2 = 3` the same; no locale-specific operator.
- **Dice and dominoes** are universal; no words.
- **Fact flash** uses digits only — no number words, no gender.
- Music is tones, so the activity is equally rich in the six locales where TTS is unreliable.

## 10. Sound off, access, phones
- Legible silent: the punched holes, the rods beside the bars and the lit holes during playback carry everything; with sound off the "song" is the holes lighting in rhythm and the bars dipping in turn — still a show, and still checkable.
- Keyboard: digits 1–5 (1–9 and 0 for 10 at "to 10") strike the bars; F toggles the five-frame; C or Enter turns the crank; arrow keys move a bar focus ring for switch users.
- aria: fact card "3 plus 2" / "5 minus 2" (per locale); bar "bar {k}"; live region on a wrong tap "the rods are {d} blocks taller/shorter than bar {k}"; strip "{p} of {n} holes punched".
- Taps: bars ≥ 60 px wide at 360 (two rows of five at "to 10"); crank 48 px; five-frame button 48 px.
- Reduced motion: no mallet bounce; the rods appear without the crack-and-drop; playback lights holes without the strip moving.

## 11. Distinct from
- **number-talk-easel (tool):** flashes a quantity for three seconds to discuss how it was seen; nothing here is hidden or timed.
- **Rows 26–28 (this batch):** decomposition with containers, lights and a wheel; this row is fact fluency. **Row 23 Stamp Frame:** builds an operation on a ten-frame. **Built #19 Number Elevator / #20 Block Towers:** heights compare two numbers; here bar length is the answer's magnitude and the comparison happens only on a mistake.
- **No tool or activity uses music as the reward of correct answers**; the music-box strip (answers = notes, the song plays only from right answers) is new.

## 12. Build plan
- **Core state:** `{ level:'to5'|'to10', facts:'both'|'add', display, notes, order[], idx, song:{id, notes[], durations[], picture}, pos, strip:[answer|null], facts:[{a,b,op}], wrongOnFact:int, help }`.
- **Functions:** `drawFacts(song, seed)` (one fact per note, answer = note, no repeats while unused remain), `tap(k)` → `{ok, rods:{a,b,op}|null}`, `toggleFrame()`, `crank()` → the play schedule `[ {row, t, dur} ]`, `nextTask(index)`.
- **Gate `verify-music-box-core.js` (own oracle):** (1) every pool fact computes to its listed answer by the gate's own arithmetic; no 0 operand or result; (2) every round's drawn facts have answers equal to the song's notes in order, for 1 000 seeds per song; (3) `tap` punches iff k = answer; a wrong tap never advances; (4) the rods' height difference = k − answer (signed) for every fact and k; (5) the song only becomes playable when every note is punched; the playback rows equal the song notes; the playback schedule depends only on the song's stored durations — identical for any answer timing (the gate runs one strip answered in 1 s and one in 600 s and compares the schedules); with Notes = At the end every in-round bar sound is the same "tok"; (6) pitch order: a longer bar always has a lower frequency; (7) per round: most frequent answer ≤ 50 %, "same bar again" ≤ 3 hits (printed); (8) add-only mode contains no − fact and no answer-1 note; (9) all eight old facts are in the "to 5" pool.
- **Mutations:** playback tempo scaled by answering speed; bars ring their notes in-round with Notes = At the end; punch on a wrong bar; advance on a wrong tap; a fact whose answer ≠ its note; a 0 result (e.g. 3 − 3) in the pool; rods drawn the wrong height; crank playable before the strip is full; bar pitch order reversed (longer = higher); add-only leaking a − fact; the old fact 5 − 2 missing; help persisting after a tap.
- **Pictures to verify on a contact sheet:** fruits/strawberry, apple, lemon, pear, orange; christmas/bell, christmas/star, vehicles/boat, farm animals/duck, bakery/bun, music/trumpet (all seen; trombone ruled out). **Risks:** song recognisability across locales (the picture carries it; the reviewer names the songs); audio unlock on first tap (iOS) — the first bar tap initialises WebAudio. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — it is a toy xylophone and a music box; every right answer is a note, and a row of right answers becomes a song they know.
2. **Would a teacher put it on the board?** Yes — the class calls each answer and the strip plays their tune at the end; a wrong call shows, as two rods against a bar, exactly how far off it was. Fluency is rewarded by a song that only right answers can make — never by a timer or by speed.
3. **Would a parent trust it?** Calm, no score, no clock; the song cannot be faked — it plays only from right answers.
4. **The invention:** each answer bar is a note as long as its number, so a round of right answers punches a music-box strip that plays a real song — and a wrong answer shows itself as rods that do not match the bar.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Speed is no longer rewarded: the "fast feels musical" design (answer briskly → the tune flows) is gone. Nothing reads elapsed time; the crank plays each song at its stored tempo regardless of how long the strip took (gate compares a 1 s and a 600 s strip; mutation for tempo-by-speed).
- The melody could answer the maths (a child humming Ode to Joy knows the next bar). Default is now Notes: At the end — every bar "toks" identically during a round, the lid picture stays shut, songs shuffled — so the tune is playable ONLY from right answers and heard only at the crank; "As you go" remains a teacher's opt-in.
- Melodies checked note by note: Frère Jacques rows were wrong (C D E C E F G skips a bar; the "morning bells" row was actually "dormez-vous") → true bars 1–2 / 3–4. Ode to Joy, Lightly Row, Entchen, Hot Cross Buns, Au clair, Mary, Twinkle all correct; all public domain. nl song-name typo fixed; no Twinkle title flagged for the reviewer.
- Pictures mode used 56 px / 48 px fruit: now 96 px clusters at 704 and 64 px at 360 (card grows in that mode); "to 10" pictures go on ten-frames as drawn counters with one fruit label. bakery/bun and music/trumpet confirmed on contact sheets; trombone ruled out.
- "to 10" pool wording fixed (10 − 3 has a first operand of 10).
