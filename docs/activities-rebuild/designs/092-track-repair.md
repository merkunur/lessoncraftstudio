# Row 92 — Whistle Valley Track Repair: THE COUNTING LAMP (1.NBT.A.1)

## 0. Identity
- id `track-repair.count-to-120.1-nbt-a-1` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl; sv/da/no/fi slug, title and intro are new at build) · grade 1 · CCSS 1.NBT.A.1 · strand Number & Operations in Base Ten · own files at rebuild: `track-repair-core.js` (rewritten), `track-repair-activity.js`, `track-repair-activity.html`, `track-repair-activities.json`.
- frozen page title "Whistle Valley — Number-Line Track Repair"; the frozen intro promises a storm-torn track that IS a number line, numbered ties dragged to where their number belongs, counting on from anchor stations, and a singing engine that chugs across the repaired track — all kept.
- worksheets it covers: **G1-116** Count On! · **G1-117** Count Back! · **G1-118** Hop Along the Line! · **G1-119** Hop Back and Subtract · **G1-294** Dot-to-Dot: Count Back from 20 · **G1-138** Where Does It Live? · **G1-248** Where on the Number Line? · **G1-274** 0 to 10 · **G1-275** to 20, fewer labels · **G1-276** 0 to 30 · **G1-277** 0 to 50 · **G1-295** 20 to 40 · **G2-305** 40 to 60 · **G2-310** 60 to 100 · **G3-326** Crack the Pattern · **G3-327** Going Down! · **G3-329** Big Skip Counting.
- old activity: 14 rounds — count-on / count-back / decade / to-120 / two-gap / skip 5 & 10 / unmarked "interval" midpoints; numbered ties dragged to a continuous position graded by ε; in-range distractor ties; evaluate only at commit; the engine waits on a wrong commit and sings on a right one. **Kept:** every old round's numbers (re-cast into the three track types below), the in-range distractors, the open-rail interval rounds graded by ε, commit-only evaluation, the singing engine as the reward. **Changed:** the engine itself now does the checking — it counts on from the station with its headlamp, so the strategy the child should use is what the apparatus does.

## 1. The pitch
"The engine checks your track by counting on from the station: its headlamp shines each tie's number onto the rail as it rolls over it — and when the lamp and your plate disagree, the engine stops right there."

## 2. Why a child will want it again
- **A storm-wrecked railway to fix.** The valley track is broken; the child carries number plates off the repair trolley and bolts them onto the ties with a satisfying clank (the plate drops, two little bolt dots appear).
- **The headlamp.** On Check the library steam engine sets off from the station and its warm yellow lamp throws each tie's number onto the rail just ahead of it: 47 … 48 … 49 … — a moving spotlight that counts. Every plate the lamp agrees with flips up a little green flag as the engine passes.
- **The song.** When the whole stretch is right, the engine crosses the valley and toots a rising little tune, one note per tie, puffing a smoke ring at every plate the child bolted.
- **Hop rounds.** "The train is at 47 and goes 3 ties on": the child plants the red STOP flag; the engine hops tie to tie, one smoke puff per hop, and either halts at the flag with a squeal of brakes or rolls past it.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** count to 120 starting at any number; read and write numerals; locate a number on a number line from the nearest printed number; add and subtract by counting on/back in hops; find and continue a constant step (2s, 5s, 10s, then 25s, 50s, 100s, growing and shrinking — G3).
- **Misconceptions and the push-back:**
  - *Counting the start tie as "one"* (47 + 3 → 49): the engine puffs once per HOP, not per tie; three puffs land on 50 and the lamp shows 50 on the tie the flag is NOT on — the engine rolls past the flag.
  - *Placing by order but not by place* (putting 48 and 49 anywhere between 47 and 50, or evenly spreading 10, 15, 30): every plate must sit on the tie the lamp names when it gets there; the lamp counts every tie, so a plate one tie off shows "48" on the rail beside a plate saying 49.
  - *Can't use a sparsely labelled line* (only 40 and 50 printed): the lamp starts at the nearest printed number and counts on — the method the worksheet asks for — and stops at the child's plate.
  - *Decade and hundred crossings* (39 → 30 + 10 written "310"; 99 → 100 → 101 written "1001"): in name-the-tie rounds the child types the number; the lamp writes the true numeral on the rail beside the typed plate.
  - *Patterns: the step guessed from one pair, or "add the last digit"*: the engine jumps post to post; at Check each jump shows its own size ("+25"), so an unequal jump is a jump that looks different.
  - *Unmarked line: magnitude ignored* (20 placed right next to 10 on a 10…30 rail): in open-rail rounds the lamp lays a faint ghost tie at every step as it goes, counting from 10 — the plate's ghost tie number appears beside it (e.g. "16").

## 4. The stage
**At 704 (stacked):**
- **The valley** (background band 640 × 300, soft green hills drawn as flat shapes — apparatus scenery, no objects) with the **track** across it at 60 % height: two steel rails (6 px, #6E7B85), **11 ties** (sleepers) 14 × 64 px, #A0703C, spaced 58 px (a 10-step stretch), each tie with a plate seat (a light rectangle on top, 52 × 34 px) — printed ties carry their numeral plate already (Baloo 2 26 px, cream plate #FBF3E4, ink 2 px), blank ties show an empty seat. The broken part is shown by missing rail sections between the stations (rails visibly torn, bent ends) that reappear when plates are bolted.
- **Stations:** a small station post (drawn: a pole and a sign board 70 × 44 px) at each printed anchor, numeral 28 px on the sign.
- **The engine:** library `vehicles/train` (a steam engine facing right), 96 px tall, waiting at the left station; its lamp is a drawn yellow cone added at its front (apparatus). In count-back rounds the engine is mirrored to face left and its lamp is the rear light.
- **The repair trolley** (below the track, a flat cart 400 × 70 px, drawn): the plates to place, 52 × 40 px each, 2–4 per round (targets + distractors), Baloo 2 26 px.
- **Hop rounds:** the **STOP flag** (drawn red flag on a pole, 30 × 60 px; drag handle 56 px) on the trolley.
- **Name-the-tie rounds:** a teal arrow (drawn) hangs above one blank tie; a blank plate on the trolley opens a keypad (digits 0–9, ⌫, 48 × 48 px keys) under the trolley.
- **Mileposts (pattern rounds):** the ties are replaced by 6 **mileposts** (drawn posts, 80 px apart, signs 68 × 44 px), some with numbers, some blank; the engine jumps between them.
- **Task line** (20 px) above; **bubble** (18 px) under the trolley.
- No words on the apparatus: only numerals.

**At 360:** track 328 wide; 11 ties 30 px apart (ties 10 × 48, plates 40 × 30, numerals 18 px; printed plates 20 px — a 40 px plate is wider than the 30 px tie pitch, so plates are STAGGERED: even ties carry their plate above the rail, odd ties below it, on a short stem, and neighbours can never overlap); stations' signs 52 × 32 (numerals 20 px); engine 64 px; trolley 328 × 60 with plates 44 × 36; mileposts 6 × 54 px apart (signs 50 × 34, numerals 18 px). Drop rule on phones: a plate released anywhere within 15 px of a seat snaps to the nearest seat; while dragging, the seat under the plate swells to 46 px (a loupe effect) so the child sees which tie it will bolt to. At 320: ties 27 px apart (the swelling seat makes the target ≥ 44 px during the drag).

Pictures: `vehicles/train` (contact sheet: steam engine facing right, clear at 64 px). Everything else is drawn apparatus (track, ties, plates, stations, flag, posts, hills).

## 5. The hand
- **Drag a plate** from the trolley: it lifts under the finger in < 30 ms; over the track the nearest free seat swells and glows; release → the plate drops onto it with a clank (160 ms, two bolt dots). Release away from the track → back to the trolley. **Tap-access:** tap a plate (selected), then tap a tie.
- **Move / remove:** drag a bolted plate to another seat, or back to the trolley. Nothing is judged before Check (commit-only, as the old activity) — no tie reacts to a correct or wrong drop.
- **STOP flag:** drag it onto a tie (it plants with a little wobble); drag again to move.
- **Name-the-tie:** tap the blank plate → keypad opens; digits appear on the plate (max 3 digits); ⌫ deletes; the plate bolts itself onto the arrowed tie when the keypad closes (tap ✓ or tap outside).
- **Open-rail rounds:** no ties between the two stations; the plate can be dropped anywhere along the rail (continuous; it stands on a little clamp where released).
- **Mileposts:** plates go onto blank posts (same drag/tap).
- **Free play after success:** the engine can be tapped to run the stretch again (lamp counting), and the child may drag the engine to any tie — the lamp shows that tie's number (a number line you can roll along).
- **Keyboard:** Tab through plates; ← → move a focus ring along ties; Enter bolts the selected plate; digits type on the keypad.

## 6. The rounds
A round = one stretch of track (11 ties = 10 steps) or one open rail or 6 mileposts, the printed anchors, and the plates (targets + in-range distractors that belong nowhere on this stretch's blanks, or out-of-range ones).

**Track "Hops" (count on / back; 8 rounds; G1-116…119, G1-294):** the stretch shows printed plates only at both ends; the engine stands on the start tie (its plate printed).
| # | stretch | start | move | right STOP tie | equation on success |
|---|---|---|---|---|---|
| H1 | 46–56 | 47 | 3 on | 50 | 47 + 3 = 50 |
| H2 | 20–30 | 25 | 3 back | 22 | 25 − 3 = 22 |
| H3 | 35–45 | 38 | 4 on | 42 | 38 + 4 = 42 |
| H4 | 10–20 | 16 | 5 back | 11 | 16 − 5 = 11 |
| H5 | 95–105 | 98 | 4 on | 102 | 98 + 4 = 102 |
| H6 | 60–70 | 63 | 5 on | 68 | 63 + 5 = 68 |
| H7 | 35–45 | 41 | 4 back | 37 | 41 − 4 = 37 |
| H8 | 110–120 | 112 | 6 on | 118 | 112 + 6 = 118 |
("Numbers: to 50" replaces H5 with stretch 25–35, 28 → 3 on → 31 [STOP tie 6, right of centre, as H5] and H8 with stretch 34–44, 36 → 6 on → 42 [STOP tie 8, right, as H8].) STOP-tie index in the 11-tie stretch (0 = left end, 5 = centre): H1 4 · H2 2 · H3 7 · H4 1 · H5 7 · H6 8 · H7 2 · H8 8 → left of centre 4, right 4, never the centre.

**Track "Find the spot" (10 rounds; G1-138, 248, 274–277, 295, G2-305, 310):**
| # | stretch | printed | task | right | distractor on the trolley |
|---|---|---|---|---|---|
| S1 | 0–10 | 0, 10 | bolt 7 and 4 | 7 (8th tie from the left), 4 (5th tie) | 12 |
| S2 | 10–20 | 10, 20 | bolt 13 and 18 | 13, 18 | 21 |
| S3 | 20–30 | 20, 30 | bolt 26; name the arrowed tie (22) | 26; type 22 | 32 |
| S4 | 40–50 | 40, 50 | bolt 47 and 43 | 47, 43 | 54 |
| S5 | 30–40 | 30, 40 | name the arrowed tie (34); bolt 38 | type 34; 38 | 48 |
| S6 | 50–60 | 50, 60 | bolt 51 and 59 | 51, 59 | 61 |
| S7 | 90–100 | 90, 100 | bolt 99 and 95 | 99, 95 | 109 |
| S8 | 100–110 | 100, 110 | name the arrowed tie (107); bolt 103 | type 107; 103 | 113 |
| S9 | open rail 10 … 30 | 10, 30 | bolt 20 and 15 | 20 at the midpoint, 15 at the quarter; ε = 1.4 (number units, as the old round) | 35 |
| S10 | open rail 40 … 80 | 40, 80 | bolt 60 and 50 | 60 at the midpoint, 50 at the quarter; ε = 2.6 (number units) | 90 |
("Numbers: to 50" replaces S7 with 25–35 [printed 25, 35; bolt 30 and 28; distractor 37], S8 with 35–45 [name 39; bolt 42; distractor 47], S10 with open rail 20 … 40 [bolt 30 and 25, ε 1.4; distractor 45].) On an open rail every in-range number HAS a true place, so an in-range plate can never be a "wrong" plate there: open-rail distractors are always outside the rail's range (the old 15/25 in-range distractors became targets).

**Track "Mileposts" (patterns; 8 rounds; old skip rounds + G3-326/327/329):** 6 posts; the engine jumps post to post.
| # | posts (blank = _) | step | right plates | distractors |
|---|---|---|---|---|
| M1 | 5, _, _, _, 25, 30 | +5 | 10, 15, 20 | 13, 18 |
| M2 | 40, _, _, 70, 80, 90 | +10 | 50, 60 | 45, 55 |
| M3 | 12, 14, _, 18, _, 22 | +2 | 16, 20 | 15, 19 |
| M4 | 90, 80, _, 60, _, 40 | −10 | 70, 50 | 75, 65 |
| M5 | 25, 50, _, 100, _, 150 | +25 | 75, 125 | 70, 120 |
| M6 | 100, 150, _, 250, _, 350 | +50 | 200, 300 | 210, 360 |
| M7 | 300, _, 500, _, 700, 800 | +100 | 400, 600 | 450, 550 |
| M8 | 45, 40, _, 30, _, 20 | −5 | 35, 25 | 36, 24 |
("Numbers: to 50" keeps M1–M4 and M8 and replaces M5–M7 with six-post rows: 10, 15, _, 25, _, 35 (+5; 20, 30; distractors 22, 28) · 2, 4, _, 8, _, 12 (+2; 6, 10; distractors 7, 11) · 48, 46, _, 42, _, 38 (−2; 44, 40; distractors 43, 41).)

**Answer position:** across a pass the right tie sits in every position 2–10 of the stretch at least once and never in the same place two rounds running; STOP ties are left of centre in 4 hop rounds and right in 4; distractors are always numbers that do not belong on the visible stretch (Spots/Hops) or that break the step (Mileposts), and their tray position is shuffled. Plates arrive on the trolley in shuffled order (never numeric order). **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with blanks still empty / no flag planted / keypad plate empty** → hint "Bolt a plate onto every empty tie." / "Plant the STOP flag first." / "Type the number for the arrow." (no miss). In S9/S10 an empty rail → "Bolt each plate onto the rail where it belongs."
- **The lamp check (every Check):** the engine leaves the nearest printed station (the left one in count-on rounds; the start tie in hops; the right one in count-back) at 2 ties per second; its lamp projects each tie's true number onto the rail just ahead (Baloo 2 22 px, yellow glow) and it flips a green flag on each right plate. At the first wrong plate it **stops**: the lamp's number stays lit on the rail directly beside the child's plate (e.g. lamp "48", plate "49"), and the plate rattles. Hops: the engine puffs one smoke ring per hop with the hop number (1, 2, 3 … in small white numerals inside the ring); if the flag is not on the landing tie it brakes there anyway and the flag wobbles where it stands. Open rail: ghost ties appear one per step as the engine rolls, each with its lamp number; it stops at the plate and shows the plate's true position number ("16"). Mileposts: the engine jumps post to post; each jump draws an arc labelled with its size ("+25"); at a wrong plate the arc's label differs from the others.
- **Miss 1 — what the apparatus shows:** the lamp's number stays printed on its tie (a soft yellow numeral on the seat) for every tie the engine counted; the wrong plate glows coral. Hint by track: Spots "Count on from the station, one tie at a time." · Hops "One puff for each hop — the start tie doesn't count." · Mileposts "Every jump is the same size. How big is it?" · Name-the-tie "Count on from {nearest printed} to the arrow."
- **Miss 2:** the engine shuttles once more and leaves a lamp number on EVERY tie of the stretch (the full line labelled), and the right tie for each unplaced/wrong plate pulses; Mileposts: the arcs between the printed posts show their step (e.g. "+25") before the child's plates. Hint "Find the tie that says {n}."
- Any plate move / flag move / keypad edit clears the showing (the lamp numbers fade, 200 ms).
- **Success:** the torn rails close, the engine crosses the whole valley with its rising song (one note per tie), puffing a smoke ring at each bolted plate; hops print the equation on a station sign. Bubble: Spots "All aboard! {list} are in their places." (e.g. "All aboard! 47 and 43 are in their places.") · Hops "{a} {+|−} {k} = {b} — all aboard!" · Name-the-tie "Yes, that tie is {n}!" · Mileposts "The track goes {up|down} by {step} every time!"

## 8. Settings (each visibly changes the board at rest)
1. **Track:** hops / find the spot / mileposts — ties with a STOP flag on the trolley, ties with plates, or posts.
2. **Numbers:** to 50 / to 120 (and the big G3 steps in mileposts) — the round list switches (§6); at rest the station signs show the stretch's numbers, so the range is visible.

## 9. Words (EN source)
- title (in-tool): "Whistle Valley"
- instruction: "Fix the number track so the train can cross."
- prompts: spots "Bolt each plate onto its tie." · spotsOpen "Bolt each plate onto the rail where it belongs." · hopsOn "The train is at {a}. It goes {k} ties on. Plant the STOP flag where it stops." · hopsBack "The train is at {a}. It goes {k} ties back. Plant the STOP flag where it stops." · name "Which number goes on the tie with the arrow?" · posts "Find the step. Bolt the missing numbers."
- hints: hintEmpty "Bolt a plate onto every empty tie." · hintFlag "Plant the STOP flag first." · hintType "Type the number for the arrow." · hintCountOn "Count on from the station, one tie at a time." · hintHop "One puff for each hop — the start tie doesn't count." · hintStep "Every jump is the same size. How big is it?" · hintFromNearest "Count on from {m} to the arrow." · hintFind "Find the tie that says {n}."
- success: as §7.
- settings: "Track" · "hops" · "find the spot" · "mileposts" · "Numbers" · "to 50" · "to 120"
- **Locale traps:**
  - **"Tie":** en *tie* (as the old file), de *Schwelle*, fr *traverse*, es-MX *durmiente*, pt-BR *dormente*, it *traversina*, nl *dwarsligger*, sv *sliper*, da *svelle*, no *sville*, fi *ratapölkky* (partitive in "one tie at a time": *yksi ratapölkky kerrallaan*).
  - **Number words in TTS** (bonus only — numerals on screen are the content). SoT for 0–100 = `scripts/worksheet-gen/lib/number-words.js` (`numberWord(n, locale)`; it throws above 100 — refuse-don't-guess); for 101–120 and the G3 hundreds the TTS reads the numeral itself and no hand table is written. Known traits of that table: de *siebenundvierzig* / nl *zevenenveertig* / da *syvogfyrre* say the ones FIRST — a known source of written reversals (74 for 47); the lamp's numeral, not speech, is the check. Danish vigesimal tens (*halvtreds* 50, *tres* 60, *halvfjerds* 70, *firs* 80, *halvfems* 90) and fr *soixante-dix / quatre-vingts / quatre-vingt-dix* (France register — never the Belgian/Swiss *septante*; 1990 rectified hyphens, *vingt-et-un*) — all already in number-words.js, never generated from English.
  - **Plural agreement:** "3 ties on" — fi partitive after numbers (*kolme ratapölkkyä*), pl-like forms none in our 11; de *3 Schwellen vor*, fr *avance de 3 traverses*. Templates are authored per locale with the number slot.
  - **Count back direction:** "back" is leftward on every number line in all 11 locales (all read left to right).
  - **Three-digit numerals** (up to 800 in mileposts) are written without any separator in every locale.

## 10. Sound off, access, phones
- Sound off: the lamp numerals, the smoke-ring hop numbers, the green flags and the jump arcs carry everything; the song is decoration.
- Keyboard path §5; ties are focusable ("tie 4 of 11, empty" / "tie 6, plate 49"); plates are buttons ("plate 49").
- Taps: plates 52 × 40 / 44 × 36 with a 48 px hit pad; seats swell to ≥ 44 px under a dragged plate; keypad keys 48 px; the flag handle 56 px.
- Engine 96 / 64 px.
- Fold at 360 × 740: task 48 + valley/track 210 + trolley 70 + keypad (only when open) 110 + Check 56 ≈ 500; at 320 × 640 ≈ 480.

## 11. Distinct from
- **landing-strip tool** (say which post a number is nearest, then put it on the strip): no rounding, no nearest-post question here; the engine's counting lamp is the check.
- **open-number-line / number-line / cold-line tools:** they draw jumps or measure distance; nothing there checks a placement by rolling and counting from an anchor.
- **#3 Peek Path, #21 Creek Map, New 205 Hopscotch Court** (K counting sequences / comparison / before-after): different grade and no number line placement; the hopscotch hopper turns around — here the engine never turns, it counts on.
- **Row 103/104** clocks share nothing.

## 12. Build plan
- **Core state:** `{track:'hops'|'spots'|'posts', range:'50'|'120', round, stretch:{from,to}|{open:[a,b]}, printed:[…], seats:{tieIndex:plate|null}, plates:[…], flag:null|tie, typed:'', clamp:null|x, miss, help}`.
- **Core functions:** `tieValue(i)` = from + i (or post value = first + i·step) · `lampRun(state)` → ordered list of {tie, value, plateOk|plateWrong|empty}, stopping at the first wrong · `hopRun(a,k,dir)` → landing value = a ± k · `openPos(x)` → value = a + (b−a)·x (continuous) and ok if |value − target| ≤ ε · `stepOf(posts)` from the printed posts · `check(state)` → `{ok, kind:'empty'|'flag'|'typed'|'wrongTie'|'offByOneHop'|'wrongStep'|'typedWrong'|'outsideEps'}`.
- **Gate ground truth (own oracle):** every target equals tieValue of exactly one blank tie; no distractor equals any blank tie's value (Spots/Hops) or fits the step (Posts); open-rail distractors lie outside [a, b]; STOP ties are never the centre tie and split 4 left / 4 right; hop landings = a ± k inside the stretch; ε values copied from the old rounds and the midpoint lies inside; mileposts have one constant step and ≥ 2 printed posts that reveal it; the lamp's first-wrong stop index is computed from seats; answer-position spread as §6; "to 50" lists contain no number > 50 except printed anchors ≤ 50; every prompt with {k} has a per-locale plural form.
- **Mutations:** hop counts the start tie (lands at a + k − 1) · lamp starts its count at 1 instead of the station's number · a distractor accepted on a blank · open-rail ε ignored (any position accepted) · plate one tie off accepted · posts accept an unequal step · count-back engine runs rightward · typed 1007 accepted for 107 · plates arrive in numeric order · help survives a plate move · fi "3 ties" emitted in the nominative.
- **Pictures:** confirm `vehicles/train` mirrored (count-back) still reads well at 64 px.
- **Risks:** 30 px tie spacing on phones — the swelling-seat loupe and the tap-then-tap path; local-test drives real pointer drops onto every tie at 320/360 and asserts the intended tie got the plate.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — fixing a broken railway, bolting plates, an engine whose lamp counts and that puffs, squeals and sings.
2. **Would a teacher put it on the board?** Yes — "count on from the nearest station" is the exact strategy every worksheet on this list asks for, and the class watches the lamp do it; one instrument covers counting on/back, sparse number lines to 120 and skip patterns to 100s.
3. **Would a parent trust it?** Yes — calm valley, library engine, numerals only, no score.
4. **The invention, in one sentence:** the engine checks the repaired track by counting on from the station with its headlamp, shining each tie's true number onto the rail — and it stops wherever the lamp and the child's plate disagree.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Answer position was not as claimed: H1's STOP tie sat on the exact centre (stretch 45–55), giving 3 left / 4 right / 1 centre. H1 moved to 46–56; the STOP-tie indices are now written out (4 left, 4 right, never centre) and gated; the to-50 replacements were given stretches that keep the balance.
- Open-rail rounds had an in-range "distractor" (15 on a 10…30 rail) that has a true place on that rail — a child placing it correctly would be marked wrong. In-range plates became second targets (bolt 20 AND 15; 60 AND 50; 30 AND 25), distractors are now out of range, prompt reworded.
- The to-50 milepost replacements had only five posts and one duplicated M8's −5 pattern; rewritten as three six-post rows (+5, +2, −2) with distractors.
- Phone plates (40 px) were wider than the 30 px tie pitch, so neighbouring plates overlapped (e.g. 50|51): plates are now staggered above/below the rail.
- Number words: SoT is now `number-words.js` (0–100; fr rectified *vingt-et-un*), the TTS reads numerals above 100 — no hand table. ε stated in number units. `vehicles/train` checked on the contact sheet: a steam engine facing RIGHT, no printed text.
