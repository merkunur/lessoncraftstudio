# Row 47 — The Lacing Board: Snørebrettet (RF.K.2.B, no)

## 0. Identity
- id `syllable-builder.bygg-ordet-av-stavelser.no.rf-k-2-b` (KEPT) · grade K (no: barnehage / 1. trinn) · Common Core RF.K.2.B; the page names LK20 only (§20.10) · strand Reading: Foundational Skills · **locale-scoped row: ships in no (bokmål) only** (slug `bygg-ordet-av-stavelser`, page title "Bygg ordet av stavelser — Fonetikk i barnehagen" and intro frozen; the manifest id's `.no` suffix stays — it separates this row from the sv row with the same slug shape).
- own files: `mini tools/lacing-board-core.js`, `lacing-board-activity.js`, `lacing-board-activity.html`; manifest row stays in `syllable-builder-activities.json`, `tool` → `lacing-board-activity`, `params` → §6. 0 lines to shared engines or `lcs-shell.*`.
- worksheets it covers: none mapped.
- what the old activity did: tap scrambled syllable tiles into slots, 28 bokmål words. **Kept:** all 28 words (each re-checked 2026-10-17 against `approved-words-no.json` — 28/28 approved with the same split, every picture label equal to the word), spread over the three levels; the blend task. **Gone:** tile tapping in a row.

## 1. The pitch
"A lacing card where the syllables are scattered buttons: thread the shoelace through them in the order you say the word — pull it tight, and the buttons slide down the lace into the word."

## 2. Why a child will want it again (the fun)
- **Lacing cards are a beloved barnehage toy.** A thick red shoelace with a shiny metal tip; drag the tip to a button and the lace swoops through the hole with a soft *sssp*, the button dimpling as it is threaded. The lace curves and loops across the board as the child goes.
- **"Stram!" (pull tight).** On Check the lace straightens with a satisfying *zip*: every threaded button slides down along it onto the rail at the bottom, edge to edge, and the syllables become one word. The child literally *pulls the word together*.
- **Mistakes unthread themselves.** If a button is out of order, the lace slips back out of it and of every button after it (they hop back up to their spots on the board), keeping everything that was right — exactly what happens with a real lacing card when you lace a wrong hole.
- **The earned show:** the lace ties itself into a bow at the end (a two-loop flourish, 600 ms), the finished laced word lifts off and hangs as a tiny card on the **peg rail** at the top. Across a pass the peg rail fills with laced words.
- **Free play:** between rounds the child can drag the last lace's bow to untie/retie it, and swing the cards on the peg rail.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B):** blend syllables into a word in the order they are spoken (Levels 1–2), reject a syllable that is not in the word (Level 2), count the syllables of a spoken word (Level 3).
- **Misconception 1 — "read the buttons as they lie on the board"** (left to right, top to bottom). Pushback: the buttons are scattered on a jittered grid; their position never follows the word, so the child must say the word and look for each part.
- **Misconception 2 — "the order does not matter as long as all parts are there."** Pushback: tightening unthreads everything from the first wrong button on.
- **Misconception 3 — "every button on the board belongs"** (Level 2). Pushback: a decoy button threaded into the word slides off the lace when it is pulled tight.
- **Misconception 4 — counting letters or sounds** (Level 3). Pushback: too many threaded blank buttons slide off the lace end; too few leaves two syllables crammed on the last button.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The board** — a wooden lacing board 470 × 330 px, radius 22, light birch `#EBD3A8` with a 3 px ink outline `#5B4636` and a soft inner bevel.
- **The knot** — the lace's fixed start: a fat round knot (28 px) on the board's left edge at mid-height, with 30 px of lace tail hanging out.
- **The buttons** — wooden buttons 80 px round (cream `#FBF3E4`, 3 px ink outline, a darker rim), each with a hole (18 px dark circle) in its upper part and its syllable in the lower part (Nunito ExtraBold 26 px, ink). Positions: a 3 × 3 grid of cells (each 140 × 100) inside the board, one button per occupied cell, jittered ±14 px, rotated ±5°.
- **The lace** — an 8 px cord, red `#C8553D` with a lighter 2 px centre line, drawn as a smooth curve (Catmull-Rom) from the knot through each threaded hole; the free end trails 40 px beyond the last hole to the **aglet** (metal tip 14 × 30, `#C9CFD4`, ink outline) — the drag handle (hit area 48 × 48).
- **The rail** — along the board's bottom inside edge, a groove 440 × 12 where buttons land when the lace is pulled tight.
- **The peg rail** — above the board: a strip 470 × 40 with small pegs; finished laced words hang as 40 × 30 cards.
- **Right column** — library picture **160 px** in a cream frame (tap = word, TTS bonus); bubble; Check.
- **Task line** above the stage.

**At 360 px** (stacked): peg rail (hidden at 320) · picture **96 px** centred · board 336 × 260 with a 3 × 3 grid of 104 × 80 cells, buttons **62 px** (syllable 21 px, hole 14 px), lace 6 px, aglet hit area 48 × 48 · bubble · Check. Check bottom ≤ 690 at 360 × 740; at 320 × 640 buttons 56 px, board 304 × 236 → Check ≤ 612.

**Library pictures** (theme JSON checked; no labels = words): around the house/clock · christmas/angel · clothing/dress, shirt · animals/rabbit, panda, tiger, dolphin, bat, dog, penguin (Level 2 pingvin) · winter/snowman · fruits/blueberry, strawberry, watermelon · easter/butterfly, chocolate (a chocolate bar — seen) · flowers/sunflower · beach/starfish, lighthouse · weather/umbrella · vehicles/helicopter, bicycle, tractor, airplane (Things That Fly) · vegetables/pumpkin · accessories/glove · camping/bear · furniture/bookcase · forest creatures/spider · zoo animals/gorilla · reptiles and Amphibians/alligator · vehicles/motorcycle. Contact sheets seen: animals, farm animals, christmas, easter, beach, weather, toys.

## 5. The hand
- **Thread (Levels 1–3):** drag the aglet onto a button (drop within 30 px of the hole). Within 60 ms the lace snakes from the previous hole (or the knot) through this one (path animates 220 ms), the button dips 2 px and gets a small shadow ring (*sssp*, a soft fabric whisper, 120 ms). The aglet then rests 40 px past the button. A button can be threaded once. Dropping elsewhere: the aglet springs back to the lace end.
- **Tap-to-thread** (for children who cannot drag): tap a button → the lace threads it, same animation.
- **Unthread:** tap the LAST threaded button (or press Backspace) → the lace slides back out of it (180 ms). Only the last one can be unthreaded — like real lacing.
- **Stram! = Check** (the shell button).
- **Tap a button** that is not threaded → it wobbles and (TTS) says its syllable.
- **Keyboard:** Tab cycles the board's buttons (in a fixed reading order that is NOT the word order), Enter threads, Backspace unthreads the last.

## 6. The rounds
Order-only reshuffle per pass; never the same order twice in a row. Button cells are a fresh shuffle every render.

**Level 1 — Tre ordet (thread the word), 10 rounds** — only the word's buttons on the board.

| # | picture | word | buttons |
|---|---|---|---|
| 1 | around the house/clock | klokke | klok · ke |
| 2 | christmas/angel | engel | en · gel |
| 3 | clothing/dress | kjole | kjo · le |
| 4 | animals/rabbit | kanin | ka · nin |
| 5 | animals/panda | panda | pan · da |
| 6 | animals/tiger | tiger | ti · ger |
| 7 | animals/dolphin | delfin | del · fin |
| 8 | winter/snowman | snømann | snø · mann |
| 9 | fruits/blueberry | blåbær | blå · bær |
| 10 | flowers/sunflower | solsikke | sol · sik · ke |

**Level 2 — Pass på lurehullet (one decoy button), 10 rounds.**

| # | picture | word | buttons | decoy |
|---|---|---|---|---|
| 1 | easter/butterfly | sommerfugl | som · mer · fugl | ke |
| 2 | animals/penguin | pingvin | ping · vin | fugl |
| 3 | animals/bat | flaggermus | flag · ger · mus | sol |
| 4 | beach/starfish | sjøstjerne | sjø · stjer · ne | mer |
| 5 | weather/umbrella | paraply | pa · ra · ply | mus |
| 6 | fruits/watermelon | vannmelon | vann · me · lon | ger |
| 7 | vehicles/helicopter | helikopter | he · li · kop · ter | ra |
| 8 | easter/chocolate | sjokolade | sjo · ko · la · de | lon |
| 9 | vegetables/pumpkin | gresskar | gress · kar | ply |
| 10 | fruits/strawberry | jordbær | jord · bær | kop |

Decoys are syllables of other pool words; no decoy + buttons forms another bokmål word with a library picture (gate-checked; e.g. "kar + mus" and "mer + kar" are not words; "pingvin + fugl" is not one word either — the decoy is tested on every position, not just the end).

**Level 3 — Hvor mange hull? (count), 10 rounds.** Six BLANK buttons on the board; thread one per syllable heard; Stram! prints the syllables on the threaded buttons in thread order.

| # | picture | word | syllables | count |
|---|---|---|---|---|
| 1 | camping/bear | bjørn | bjørn | 1 |
| 2 | clothing/shirt | skjorte | skjor · te | 2 |
| 3 | furniture/bookcase | bokhylle | bok · hyl · le | 3 |
| 4 | animals/dog | hund | hund | 1 |
| 5 | vehicles/bicycle | sykkel | syk · kel | 2 |
| 6 | forest creatures/spider | edderkopp | ed · der · kopp | 3 |
| 7 | reptiles and Amphibians/alligator | alligator | al · li · ga · tor | 4 |
| 8 | beach/lighthouse | fyrtårn | fyr · tårn | 2 |
| 9 | zoo animals/gorilla | gorilla | go · ril · la | 3 |
| 10 | vehicles/motorcycle | motorsykkel | mo · tor · syk · kel | 4 |

Counts: 1 ×2, 2 ×3, 3 ×3, 4 ×2.

Pool words kept for a later pass but not in the tables above (still approved, still on file): traktor, fly — they rotate in as replacement rounds when the reviewer drops any word. **Taken out by the critic (2026-10-17):** `tannbørste` (gated `tann·børs·te`) and `hanske` (gated `hans·ke`) — both gated splits put the s in the first syllable, while ordinary Norwegian hyphenation and many teachers divide *bør-ste*, *han-ske*. With the seam genuinely disputed the shown split may not be the one the child is taught, so neither word is shown; the native reviewer may restore them if the gated split is confirmed as the 1. trinn convention.

**Answer position.** Button cells: fresh random choice of cells and jitter per render. The gate measures over 2,000 renders: "thread in reading order (row by row, left to right)" solves ≤ 0.25 of L1/L2 rounds; "always thread the nearest button next" (greedy path from the knot) ≤ 0.25; the first syllable's button sits in the top-left cell in ≤ 1/9 + 0.03. Level 3 has no position (blank buttons).

## 7. Check, the misses, the success
- **Check with nothing threaded:** "Tre snøret gjennom stavelsene i samme rekkefølge som du sier ordet." (EN "Thread the lace through the syllables in the order you say the word.") · L3 "Tre snøret gjennom ett hull for hver stavelse du sier." ("Thread through one hole for every syllable you say.") — no miss.
- **Not all word buttons threaded (L1/L2, not a miss):** "Det er flere stavelser i ordet." ("The word has more syllables.") — the unthreaded word buttons do not glow (that would give the answer).
- **L1/L2 miss 1** — Stram!: the lace pulls tight; the right PREFIX slides down to the rail and stays (those buttons glow softly); from the first wrong button on, the lace slips out (each button hops back to its board spot, 160 ms apart, *plip*). A decoy that was threaded is the first to pop off, with a dull *tock*. Hints: wrong order → "Snøret holder til hit. Hva kommer etter {lastRight}?" ("The lace holds up to here. What comes after {lastRight}?"; if nothing was right: "Hvilken stavelse kommer først?" — "Which syllable comes first?") · decoy → "Den knappen hører ikke til ordet." ("That button is not part of the word.")
- **L1/L2 miss 2** — the next right button glows and pulses gently (only the next one). Hint: "Den lysende knappen er neste." ("The glowing button is next.") TTS says the word in syllables, pausing at the next one.
- **L3 miss 1** — Stram!: syllables print onto the threaded buttons in order.
  - too few: the last threaded button carries two (or more) syllables squeezed, with a line between them; a faint empty hole appears beside it. "Den siste knappen har to stavelser. Tre ett hull til!" ("The last button has two syllables. Thread one more hole!")
  - too many: the extra blank buttons slide off the end of the lace and roll back to their spots. "De knappene fikk ingen stavelse." ("Those buttons got no syllable.")
- **L3 miss 2** — the word is shown whole above the board, and TTS claps it in syllables while one empty hole per syllable glows in turn. "Klapp ordet: ett hull for hvert klapp." ("Clap the word: one hole for each clap.")
- **A new move takes the help away** until the next Check.
- **Success:** the buttons close up edge to edge on the rail, their gaps vanish and the word reads as one (letters slide to word spacing, 400 ms); the lace ties a bow; the laced word hangs on the peg rail. Bubble: L1/L2 "{s1} + {s2} + … = {word}!" · L3 "{word}: {n} stavelser — {s1} · {s2} …" ("{word}: {n} syllables"; n = 1 "{word}: én stavelse!"). End of pass: the peg rail cards swing one after another.

## 8. Settings
1. **Lurehull** (decoy): Av / Ett / To — 0, 1 or 2 decoy buttons (Level 2 default one; Level 1 locks it to Av). Visible at rest: the number of buttons on the board.
2. **Knappene** (Levels 1–2): Spredt (scattered — default) / På rad (in a row, still shuffled — for the youngest, who find the scattered board hard to scan). Visible at rest.

## 9. Words (EN source; build authors no; one native bokmål + pedagogy reviewer)
- Title frozen. Instrument name in aria: "Snørebrettet".
- Instruction: EN "Thread the shoelace through the syllables in the order you say the word, then pull it tight." → no draft "Tre skolissen gjennom stavelsene i den rekkefølgen du sier ordet. Stram den etterpå."
- Task lines: L1 "Tre ordet: én stavelse om gangen." ("Thread the word: one syllable at a time.") · L2 "Tre ordet — én knapp hører ikke med!" ("Thread the word — one button doesn't belong!") · L3 "Ett hull for hver stavelse du sier." ("One hole for every syllable you say.")
- Hints, celebrations: §7. Settings: "Lurehull" / "Av" / "Ett" / "To" · "Knappene" / "Spredt" / "På rad". Levels: "Tre ordet" / "Lurehullet" / "Hvor mange hull?".
- aria: "Snørebrett med {n} knapper" · "Knapp: {stavelse|tom}, {tredd|ikke tredd}" · "Snøret går gjennom {list}" · "Skolisse-spiss".

**Locale traps (no):**
- **kj / sj / skj** are single sounds and never split: `kjo·le`, `skjor·te`, `sjo·ko·la·de`, `sjø·stjer·ne` come straight from the gated list (the gate already quarantines the uncertain ones).
- **ng** (pingvin `ping·vin`) follows the gated no rule; Level 3 never asks the child to place a boundary, only to count, so no seam convention is taught here.
- **Bokmål only** (no nynorsk forms): *sommerfugl*, *snømann*, *edderkopp*, *sykkel*; the reviewer confirms *gresskar* and *bokhylle* are barnehage words.
- **æ ø å** in syllables (blå·bær, snø·mann, fyr·tårn, tann·børs·te) — the button font must carry them at 21–26 px.
- **No articles** on the apparatus; prose uses "knapp" (m.) and "snøret / skolissen"; the reviewer picks *snøre* vs *skolisse*.
- **Lowercase**, no capitalised nouns.

## 10. Sound off, access, phones
- **Sound off:** Level 3 needs no reading; the cram on the last button, blank buttons sliding off and the unthreading are visual. Levels 1–2 need early reading of syllables (the picture gives the word); TTS on button taps helps where it works.
- **Keyboard:** §5; aria-live "Tredd gjennom {stavelse}", "Snøret holder til {stavelse}", "{stavelse} gled av snøret".
- **Taps:** buttons 80 / 62 / 56 px; aglet 48 × 48; tap-to-thread for children who cannot drag.
- **Pictures:** 160 px at 704, 96 px at 360.
- **Phone:** stacked; the peg rail hides at 320; "På rad" is suggested by the hint after two misses on a phone (the setting is not changed automatically).

## 11. Distinct from
- **Rows 44–46, 48–50:** chop, roll, pull, hop, hook, topple — this is the only one where the syllables are SCATTERED in two dimensions and the child traces the word's order as a path.
- **#9 The Counting Necklace (built)** — beads on a cord for counting objects; here the cord threads written syllables and the checked thing is ORDER along a 2-D path; there is no counting of objects, no necklace, and the signature move — tightening keeps the right prefix and unthreads the rest — has no counterpart there.
- **Row 45 The Kite Tail (en)** — also a cord, but bows tied on fixed knot points of a tail and a verdict of flight balance; here scattered buttons, a path the child chooses, and a tighten that unthreads.
- **New #215 The Bead Rail / premium syllable-splitter** — beat taps and arcs; neither threads.
- **Premium story-line** — pegging cards on a clothesline; no threading, no tightening.

## 12. Build plan
- **Data:** `params.levels.{thread:[{noun,themeDir,word,split}], decoy:[{…,decoys:[…]}], count:[{…}]}`; splits copied from `approved-words-no.json` by key with an equality assert.
- **Core state** `{level, round, buttons:[{id, syl|null, cell, decoy}], path:[id…], misses}`; functions `layout(seed)` → cells, `thread(id)`, `unthreadLast()`, `tighten()` → `{prefix:[id…], popped:[id…], decoyPopped:bool, complete, right}`, `countTighten()` → `{verdict:'right'|'short'|'long', printed:[[syl…]], slidOff:[id…]}`.
- **Gate's own ground truth** (`verify-lacing-board-core.js`): typed list of the 30 round words and splits; for every L1/L2 round and every threading sequence up to length N+2: `tighten` keeps exactly the longest correct prefix, right iff the path equals the word and contains no decoy; decoys always pop; L3 right iff threaded count = syllables, short puts all leftovers on the last button, long slides off exactly the extras; cell layouts: reading-order bot ≤ 0.25, greedy-nearest bot ≤ 0.25, first-syllable-top-left ≤ 1/9 + 0.03; unthread only removes the last.
- **Mutations:** a shown split differs from the gated split, or `tannbørste`/`hanske` shown · tighten keeps all right-in-place buttons (not only the prefix) · tighten accepts any order · decoy accepted · buttons laid out in word order · knot moved next to the first syllable (position tell) · unthread removes any button · L3 short case spreads syllables evenly · L3 long case keeps blank buttons on the lace · miss 2 glows all remaining right buttons (gives the whole order) · reshuffle repeats an order.
- **Pictures to verify on a contact sheet at build:** around the house/clock; clothing/dress, shirt; fruits/blueberry, watermelon, strawberry; flowers/sunflower; vehicles/helicopter, bicycle, motorcycle; vegetables/pumpkin; camping/bear; furniture/bookcase; forest creatures/spider; zoo animals/gorilla; reptiles and Amphibians/alligator.
- **Risks:** the lace curve must not hide button syllables — draw the lace UNDER the button face except at the hole (the cord dips through the hole); at 320 px a 4-syllable word plus two decoys = 6 buttons in 9 cells still fits.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — lacing is a hands-on toy children already love, and "Stram!" pulling the word together is a little show every time.
2. **Would a teacher put it on the board?** Yes — scattered syllables force the child to SAY the word and seek each part; the lace keeping the right beginning and dropping the rest is the clearest possible "start again from where it went wrong".
3. **Would a parent trust it?** Yes — library pictures, gated bokmål splits, a familiar toy, no score.
4. **The invention:** a lacing card of syllable buttons — thread them in the order you say the word, pull tight, and the buttons slide down the lace into the word.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-verified by script: every round word is in `approved-words-no.json` with the shown split and equals its picture's bokmål label (klokke is right for around the house/clock in Norwegian).
- Replaced `tannbørste` (gated `tann·børs·te`, a disputed seam — common hyphenation is *bør-ste*) with `pingvin` (`ping·vin`) in Level 2, and struck `hanske` (`hans·ke`) from the reserve list for the same reason; a mutation now fails the build if either is shown.
- Sharpened the distinctness argument against the built Counting Necklace and against row 45's new kite tail (both have a cord): the 2-D scattered path and the prefix-keeping tighten are this row's alone.
- Kept: the lacing card, scattered jittered buttons with measured reading-order and greedy-path bots, "Stram!" and the unthreading, the count level with blank buttons.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.

