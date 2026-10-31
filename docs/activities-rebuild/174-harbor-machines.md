# #174 — The Harbor Post → THE THREE HARBOR MACHINES (RI.2.6; all 11 locales)

ORDER row 174 · id `author-purpose.why-wrote.ri-2-6` (kept). Design: `designs/174-author-purpose.md`.

## The invention
- **Three machines on the quay, each running only on its own kind of sentence:**
  - the lighthouse lights a lamp for every fact;
  - the stage lights a footlight for every bit of story, and its curtain rises a third each time;
  - the crane lifts a crate for every step that tells the reader what to do.
- **Posting is the Check.** Tapping a machine (or pressing 1, 2 or 3) posts Marlow's note there. The machine reads it sentence by sentence and RUNS only when more than half the sentences are its kind: the beam sweeps, the curtain opens, the ship sails.
- **The author's main purpose is therefore what most of the note does for the reader,** not a surface clue. A facts note can have "!", a story can open with "First", and the snails note with a tip at the end is still mostly facts.
- **A miss:** the machine sputters with exactly as many parts lit as sentences powered it, and every sentence gets the shape of the machine it would power (circle = lamp, triangle = footlight, square = crate; one colour per machine, so it also reads without colour).
- **A second miss:** every machine shows its own count at once, and the child counts. The hint never names the answer.
- **Success:** the machine runs, the note is filed in the pigeonholes (wide screens), and the success line names the note's own subject ("Lights on! The author wrote this to tell facts about snails.") plus, on a "mostly" note, "The last sentence is just a little extra." Next follows 0.5 s later.
- **Tap a sentence** (or Enter / Space) to hear it read aloud where the browser has a voice.

## Rounds (built from the shipped data, not the design's table)
- The design's §6 table did not match the shipped notes. The real EN ap-i3 is the dinosaur note (the design re-used it as "new" ap-i8), ap-s2 has no "To …, first" opener, ap-e2 already opens with "First", and the kept notes differ by locale under one id (de ap-i2 is the dinosaurs, de ap-i3 the sun).
- So **each locale keeps its own nine notes by id, byte for byte**: six in Level 1 (i1, i2, e1, e2, s2, s3) and three in Level 2 (i3, e3, s1). The new notes avoid every topic a locale already uses: es replaces the caterpillar with rain (its kept i1 is monarch butterflies), pt replaces the turtle with a crab (its kept i1 is sea turtles), and it names the hen Bianca (its kept frog is Rosa).
- **Level 1 "First look":** 12 two-sentence notes, 4/4/4. **Level 2 "Mostly …":** 12 notes, 4/4/4; four of them carry one sentence of another kind at the start or the end.
- **sv, da, no and fi** have all 24 notes written natively on the same topics.
- **Measured:** the old cue rule ("!" → story, sequence word → how-to, else facts) sorts 1–2 of 12 per level in every locale (chance 4). The best possible lookup on "!", sequence word and length sorts at most 9 of 12, which is a fit to 12 points, not a strategy a child can use.
- **Order:** reshuffled each pass; never the previous order, never three notes of one purpose in a row.

## Deviations from the design
- **Data lives in `harbor-machines-data.js`, built per locale; the manifest row keeps params `{}`.** The old engine's gates (`verify-author-purpose-core.js`, `local-test-author-purpose.js`) are retired; `author-purpose-core.js` stays, unused.
- **Tap, not drag;** no free play after Next (as in rows 164–173).
- **No threads.** The shapes on the sentences link each sentence to its machine; the miss-2 hint asks which machine lit up the most.
- **The read-aloud is a tap on a sentence, not a long-press.** It keeps the frozen Italian page intro ("che può anche ascoltare") true.
- **The parts strip** (lamps, footlights, crates) sits under each machine's picture, so the picture keeps its full size.
- **Phones:** Marlow sits inside the note; the pigeonholes show on wide screens only. Once solved on a phone, the note steps back and only the running machine stays on the quay (beside its sign), so the success line and Next stay above the fold at 320 — French has the longest success lines and needed it (local-test found 671 / 640).
- **The hint's count is in words** ("Only one sentence …" / "No sentence …"), because a miss always has 0 or 1 powering sentences.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **No wrong role tags and no factual errors** (giraffe tongue, octopus hearts, snail shell, caterpillar → pupa → butterfly, ~140 years of cars, the water cycle, monarch butterflies, sea turtles).
- **SEVERE:**
  - the shipped it page intro promises the child can listen; the activity had no read-aloud, so tap-to-hear was built;
  - sv "varje fakta" / "ett fakta" → *faktauppgift*;
  - no learningGoal missing *som*.
- **MINOR:**
  - it/pt strings now say *biglietto*/*bilhete*, like their prose;
  - the s6 pronoun had no singular antecedent in de/fr/es/pt/it ("your paper plane");
  - de s6 success line;
  - nl/sv/da s4 success lines;
  - nl SLO wording;
  - sv/da e5 V2 and *bikupa*;
  - da *man* for the reader;
  - no title *instruksjon* (not *oppskrift*), s6 wording, *ville ha satt*;
  - fi *Marlow’n*, *käsivartesi*, *mehiläispesän*, s1 word order;
  - fr s8 game name;
  - "Mostly …" prose now says one sentence *may* be extra (i3/e3 have none).
- **Not changed (frozen metadata, the landings rule):** the en and fr page intros still say "bin"/"boîte"; the de title keeps "Klasse 3" (an earlier panel ruling).

## Gates
- `verify-harbor-machines-core.js` 5,596/0. Own truth: the purpose from the id, its own majority rule, a frozen copy of the kept notes and signs (`scripts/verify-harbor-machines-kept.json`). Checks:
  - per locale and level: exactly one machine runs, no 50/50, 4/4/4, two-machine mode;
  - each cue-breaker breaks its cue in every locale, and the bots stay under measured ceilings;
  - a synthetic 1:1 and 2:2 note runs nothing;
  - the hand, and the reshuffle (300 passes, plus the same shuffle dealt twice);
  - strings ×11 (placeholders, fr narrow no-break space, every key used), prose, manifest, html, pictures.
- `mutate-harbor-machines.js` 21/21 killed; the control passes. Two mutations first survived because the gate never reached the branch: "runs at exactly half" (no real note sits there) and "the reshuffle repeats" (random orders do not repeat).
- `local-test-harbor-machines.js` in 11 locales: real taps and keys, every hint, the lit counts read off the drawn shapes, the success line with the note's words, Next 0.5 s, read-aloud, settings, the real reading once, the fold at 320/360 at rest and solved, and each state resized through 320…1366.
- `local-test-harbor-machines.js` 1,619/0 in all 11 locales.
- Visual QA ×11 locales: 288 renders each (4 phases × 12 rounds × 6 viewports), all PASS; tablet reach included. One locale run (sv) once printed nothing — a silent crash; it passed on rerun, and the PASSED lines are counted against 11, never the absence of FAIL.
- Other audits: hierarchy 1,191/0; settings efficacy 2 live (notes, machines); prose claims, SERP copy, content tells, route preflight and Next delay all PASS.

## Live (2026-10-31)
- Deployed with `086a7a400`; payment canary OK. The page serves `author-purpose-activity.html?v=9.920`.
- `live-verify-harbor-machines.js --locales=en,de,sv,fi`: 52/0. All 11 pages return 200 (HTTPS with the QA header). At 1366 and 390, a real tap on the stage with the snails note is a miss (it sputters, a shape on every sentence); a real tap on the lighthouse runs it, solved; the iframe grows with the card.
