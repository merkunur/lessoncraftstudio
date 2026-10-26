# #126 — Hazel's Word Bridge → THE TURNING BRIDGE (L.1.1.g; all 11 locales)

ORDER row 126 · id `hazel-word-bridge.joining-words.l-1-1-g` (kept). Design: `designs/126-hazel-word-bridge.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/turning-bridge-core.js` (`TurningBridgeCore`) holds the model:
    - every locale's four levels of nine rounds: plain rounds (two halves, the relation, the rack), cause rounds (a reason half and a result half, each in its first-position form, its after-the-word form and — de / nl — its after-SO form with the verb first), swap rounds;
    - the five words per locale, the comma table, the sentence assembler (fr *parce que → parce qu'*, es *y → e*, *o → u*);
    - laying, sending back and flipping a plank; swapping the halves (the arrow plank on the bridge turns over by itself); what the bridge claims; the car's way; Check and its reasons (and / but / or / arrow / face / swap); the hints, the glow from miss 2;
    - the plan: a fresh order per pass, never three rounds in a row asking for the same word, the right plank in every rack slot in turn, the arrow plank resting on its right face in half the cause rounds.
    - DATA is written by a build script.
  - `turning-bridge-activity.js` draws the long bridge (one plank per solved round), the two banks with their library pictures and signboards, the river with the swap knob, the bridge gap and the little car (`toys/car`), the sentence strip, the plank rack (each plank drawn in its own shape: straight, a turn, a fork, an arrow), the turner for the arrow plank (CSS prefix `tb-`, `apparatusClasses: ['tb-art']`).
  - `turning-bridge-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `hazel-word-bridge-activity.js` stays on disk, unreferenced by this row.
- **Manifest:** the row stays in `hazel-word-bridge-activities.json`; `tool` → `turning-bridge-activity`; `params` = `{level: [1…4], pics: [show, words], rounds: {1…4: 9}}` (the old inline rounds are gone); en, de, fr, es, pt, it, nl, sv slug, title and intro frozen; **da, no, fi authored new**.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.871.
- **Prose:** en–sv replaced; da, no, fi added. Every quoted sentence is a finished sentence of that locale's rounds (gate-checked); the joining words are named in quotes.
- **Strings:** 42 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/hazel-word-bridge.joining-words.l-1-1-g.js` replaced (it drove the retired chip activity): picked (nothing graded before Check) · missed (the hint, the car drives the plank's way) · resolved (the success line, a plank on the long bridge; Next 0.5 s later).
- **Sources** (scratchpad): `tbr-src.js` → `tbr-build.js`; `tbr-strings.js` → `tbr-apply.js`; `tbr-prose.js`, `tbr-manifest.js`, `tbr-dump.js`, `tbr-probe.js`, `tbr-review-fix.js`, `tbr-prose-fix.js`.

## The invention
**Every joining word is a plank with its own shape, and *because* and *so* are ONE arrow plank** — *because* on one face, *so* on the other, the arrow always running from the reason to what happened. Swap the two halves of the sentence and the arrow plank turns over by itself: one link, read from two ends. A little car drives each plank its way — straight across, round the turn, into the fork, or along the arrow carrying the reason over to the result.

## The levels
1. **And · but · or** (three of each).
2. **Because · so** — the arrow plank on the right face (the rack: the arrow plank and *or*).
3. **All five.**
4. **Turn it round** — the sentence starts complete; swap the halves (the plank turns: *because ↔ so*; an *and* sentence just swaps).

## Deviations from the design (each measured or ruled)
- **Level 1 is "and · but · or", not "and or but".** AND may never be offered where it also fits, so in an and/but level the tray composition alone gave the answer (a card-set bot scored 9 of 9). The fix: **and-rounds are reciprocal** (*The cat and the dog are friends* — OR breaks the verb) and **or-rounds ask about ONE thing** (*Is it day or night?* — AND cannot be both), so AND sits in both kinds of tray; the bot's floor is then 6 of 9, proved in the gate.
- **Level 2's rack is the arrow plank and OR only** (review): BUT reads as a fine concession in many cause sentences (*It was cold, but I put on my scarf*). Level 2 asks only for the face, so a two-plank rack is no tell.
- **Level 3 drops the dark/lamp and coat cause rounds** for the same reason and reuses the snow/snowman pairs.
- **The tired/rest pair is first person in every locale** (review): *Er ist müde, denn er legt sich hin* reads as evidence ("he must be tired, since he lies down").
- **Tap, not drag**, for planks, the turner and the swap knob; the car is a free-play button as well as Check's drive.
- **The banks stay side by side at every width** (narrower signboards on phones) instead of stacking.
- **On phones a solved round's rack, turner and Check give their room to the shell's Next.**

## Review
ONE native + Grade-1 grammar reviewer over all 11 locales (every round with EVERY sentence each plank would make, level 4 start → swap, strings, prose, new metadata).
- **Applied:** the BUT concession foils (level 2 rack; two level-3 rounds replaced); the evidential *denn / want / för / for* reading (first person); de *deshalb* / nl *dus* invert inside plain-round foils too; de missArrow *Sorgt der eine Teil dafür, dass der andere passiert?*; pt fish half elliptical (*mas não andar*), pt srTurned; fr *a gagné la partie*; fi missOr *Pitääkö valita toinen kahdesta?*; sv *vänder sig pilplankan av sig själv*, *förgreningen*; da / no *ligeud ved / rett fram ved* (not *lige over for* = opposite); da learning goal *derefter* (not *så*, the word being taught); the joining words quoted in every locale's practices / how-to-play / goals and in the new da / no / fi intros.
- **Found by my own gates, not the review:** the Level-1 tray tell (above); the picture folder is `At the Supermarket` — Windows matched the lower-case key, the Linux server would have 404'd every fruit and the milk; the local test now serves pictures case-exactly; the car (a library picture) at 56 px was under the 96 px floor → 96 px on wide stages, 64 on phones.
- **Kept, with reason:** es-MX *Comprobar* (standing rule).
- **Open (frozen metadata, not edited):** the de / fr / es / pt / it / nl / sv titles and slugs name grade 2–3 (Klasse 3, CE2, 3.º, 3º ano, classe terza, groep 5, åk 2) for a grade-1 standard, and the en intro describes the retired chip quiz (a heron, tap the word).

## Gates
- **`verify-turning-bridge-core.js`:** 8,679 checks, 0 fail, with its own tables: each locale's five words and comma table, its own sentence assembler (elision, es y/e o/u), the one-answer tray rules (AND never in a but- or cause round; AND in an or-round only for a question; OR in an and-round only against a reciprocal or a whole clause), de/nl verb-first after SO and subject-first after BECAUSE, fi *vai* only in questions. It covers every right sentence against its own assembly, exactly one (plank, face) passing Check, the model (lay / back / flip / swap turns the plank and keeps the meaning, the car carries the reason from its bank, Check reasons, hints, glow), level 4 (unswapped → swap, swapped-then-flipped → face), the plan, slot balance, resting face 40–60 %, the card-set bot (level 1 at its proven floor of 6, level 2 ≤ 5, level 3 ≤ 4), always-and, the longest word (as an expectation over faces and shuffled ties), pictures (exact case, colour), strings ×11, prose quotes, manifest.
- **`mutate-turning-bridge.js`:** 19 of 19 killed, control survived.
- **`local-test-turning-bridge.js`:** real pointer, 11 locales, 320–1366, pictures served case-exactly. The scenarios: the settings; level 1 an or-round (empty bridge, a wrong plank read on the strip, its hint and the car's drive, miss 2 glow, the plank sent back, the right plank solved with a plank on the long bridge); level 2 the wrong face, the turner, the swap turning the plank; level 4 a cause and an and round (the swap hint, the knob glows, swapped → solved); "words only". Then every round of every level at rest / miss 2 / solved, resized through 320–1366. **43,846 pass, 0 fail.** Its first run found Check 2 px below the fold at 320 (tightened).
- **`visual-qa-activity`:** PASSED, 216 renders. **`audit-activity-hierarchy`:** 500 / 0. **`audit-settings-efficacy`:** "level" and "pics" both change the board. **`audit-activity-next-delay`:** pass. Content ×11, prose claims, SERP copy, content tells, route preflight: pass.
