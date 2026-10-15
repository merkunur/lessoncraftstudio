# 001 — How many? (K.CC.B.5) — the Counting Table

Replaces `ten-frame.how-many.0-10.animals` (ten-frame engine: a frame of animal counters + a keypad). Same manifest id, slugs, page titles and intros (identity frozen); new tool `how-many-activity`, own core `how-many-core.js`.

## The four questions

1. **Would a 5–8-year-old choose it again?** Yes: every animal is a thing to tap; each tap drops a numbered tag with a bounce and a rising note; the whole group hops when the answer lands. Four arrangements and twenty animals mean the table never looks the same twice. Two extra moves ("Count again", "Mix them up") let a child play with the table beyond the question.
2. **Would a teacher put it on the board?** The mechanic IS the standard: K.CC.B.5 asks the child to *count to answer how many* about things in a line, an array, a circle (the standard runs to 20 there) or scattered (to 10) — the table shows exactly those four, for 0–10 (the first half of the standard; 11–20 is a later instrument). The three counting principles are enacted by the material: a thing can be tagged once only (one-to-one), tags are numbered in the order given (stable order), the LAST tag glows and is the answer (cardinality). The hint names which principle slipped: "Some are still uncounted" (untagged ones pulse), "Now tap how many" (rail pulses), "The last number you said tells how many" (last tag glows). "Count again" = order-irrelevance; "Mix them up" = conservation ("still 7"). No timer, no score.
3. **Would a parent trust it?** Library animals only (20, contact-sheet checked: cat dog duck elephant fish fox giraffe horse owl panda penguin pig rabbit sheep tiger turtle zebra koala whale wolf), identical instances per round, ≥ 96 px at the live width. Calm cream mat with a teal frame; numerals are the only words on the apparatus; everything reads with the sound off; works at 320 px.
4. **Is it creative?** The invention: **tag-as-you-count, and the last tag IS the answer.** A teacher can say it in one sentence.

## Apparatus

- **The table** (`.hm-mat`): a rounded cream mat with a teal edge, full card width. On it, n identical library animals in one of four arrangements (line ≤5, rectangular array, circle, scattered ≤10). n = 0 is an empty table.
- **Tags** (`.hm-tag`): tapping an animal drops a coral tag with the next numeral (Baloo 2, white). A second tap wobbles the tag and announces "already counted". When every animal wears a tag, the rail lights up ("now answer"). The last tag does NOT glow before Check — the tag already shows the numeral, and a glowing numeral next to a rail would let a child match without taking the cardinality step; the ring appears only as the remedy for a wrong numeral (reviewer finding, 2026-10-15).
- **The number rail** (`.hm-rail`): 0…max chips under the table, labelled "How many?". The child taps the numeral that tells how many. Selected = filled teal.
- **Two extra moves** (`.hm-tools`): *Count again* (clears tags, same arrangement) and *Mix them up* (next arrangement, same n, tags cleared).
- **Feedback**: the shell bubble under the table (never the task line). Correct → "Yes — 7!", the animals hop in sequence. Wrong → the hint that names the slipped principle.
- Settings drawer: Arrangement (auto / line / rows / circle / scattered), Range (0–5 / 0–10). Both free.

## Rounds

Pool = every n in the range once (11 rounds at 0–10), arrangement round-robin over what the width allows (rows only where a true rectangle exists: 4, 6, 8, 9, 10; a circle for 3–6; a line to 5; scattered always on a wide mat), animal rotated per round; order-only reshuffle per pass (§A.13.60). The Arrangement setting serves only the counts it can show (line → 0–5, circle → 3–6, rows → 4/6/8/9/10), so it never silently does nothing. One right answer per round. Answer position: the rail is a fixed 0…10 — position carries no information beyond the value itself.

## Layout

Stacked (no split): header → task line → table → rail + tools → bubble → Check/Next. Picture size from `HowManyCore.sizeCaps`: 96–128 px at ≥ 700, 64–96 on phones. Mat height from the arrangement. Rings use floor-size pictures (a ring is airy by nature; a ring of six must stay inside a 900px desktop card). On the narrowest phones (mat < 330px, the 320×640 class) the rail label and the two free moves are not rendered so the Check stays above the fold; rows there may be ragged (seven as 4+3) because neither a ring nor a scatter of seven clears that fold. No `vh` anywhere.

## Strings (×11, authored, then one reviewer for native + pedagogy)

title · instruction · prompt ("Tap each one to count. Then tap how many.") · promptZero ("The table is empty. How many? Tap the number.") · railLabel · again · mix · hintUntagged · hintNoAnswer · hintWrong · celebrate ("Yes — {n}!") · still ("Still {n}!") · alreadyCounted · counted ("{k}") · setArrangement + 5 options · setRange + 2 options. No noun insertion anywhere (grammar-safe across the 11 locales); the picture `alt` is the vocabulary singular ("Cat, number 3").

## Refuse-list

No keypad. No mascot. No countdown. No "best time". The rail never pre-lights the answer. The tag numeral is never announced before the child taps.

## Gates

`verify-how-many-core.js` (own oracle: positions, floors, no overlap, arrangements, verdict table, rounds) · `mutate-how-many.js` · `local-test-how-many.js` (real pointer, every round, 11 locales, 7 widths) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `preflight-activity-routes.js` · preview webp · one reviewer agent.

## Build record (2026-10-15)

Gates green: `verify-how-many-core.js` 3,106 assertions · `mutate-how-many.js` 17/17 killed · `local-test-how-many.js` 2,901 assertions over 11 locales × 6 widths (real pointer, every round, both wrong paths, both free moves, the arrangement setting) · `visual-qa-activity.js` 66/66 · `audit-activity-hierarchy.js` 458/0 (and it fails echo-grove and mochi-feast, the poison) · `preflight-activity-routes.js` PASS · `snap-mini-tools.js --compare` 30/30 tools byte-identical before/after the shell block. One reviewer (native ×11 + pedagogy) read the strings, the prose, the model and the pictures; every finding was reproduced and fixed at source (incl. the Dutch vocabulary singular *giraf* in `image-vocabulary.js`, the pre-Check glow that leaked the numeral, ragged "rows", the silent arrangement setting). Renders for the operator: `docs/audit-results/activities-rebuild/001-how-many/`.

Open, operator's call: `page_title` ×11 still says "Ten Frame Activity" / "Zehnerfeld" / "tienraam"… (landing/metadata is frozen by the 2026-09-30 rule, but it now names an apparatus the page no longer has); the French vocabulary label *Manchot* (zoologically right; French five-year-olds say *pingouin*).
