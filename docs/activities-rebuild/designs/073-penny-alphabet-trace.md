# Row 73 — The Writing Carriage (L.K.1.a)

## 0. Identity
- id `penny-alphabet-trace.letter-formation.l-k-1-a` (KEPT) · grade K · Common Core L.K.1.a (print upper- and lowercase letters) · strand Language · page title (frozen) "Penny's Alphabet Trace — Write Every Letter A to Z (Kindergarten)" · own files `mini tools/writing-carriage-core.js`, `writing-carriage-activity.js`, `writing-carriage-activity.html`; manifest row stays in `penny-alphabet-trace-activities.json` (id, slugs, title, intro frozen) with `tool` repointed. Read-only reuse (0 lines changed): `alphabet-trace-core.js` (the 52 glyphs — dense on-curve points, strict stroke order) and `stroke-trace-core.js` (credits only arc length the finger actually swept, keeps work through a mid-stroke lift).
- worksheets it covers: K-238, K-254, K-255, K-256, K-257, K-258 (capitals: all, G–L, M–R, S–Z, vowels, first big letters) · K-278–K-283 (the same for lowercase) · K-239, K-259–K-263, K-388 (sight words sets 1–6 + word of the day) · K-284, K-289, K-290, K-291, K-310, K-311, K-315 (trace/copy words: first, twice, longer, capitals, copy) · K-391 (trace sentences) · G2-377, G2-384, G2-385, G2-386 (cursive — Level 5, BLOCKED on stroke data, §12).
- what the old activity did: a dashed guide letter, a start dot, drag each stroke in order, the letter inks in; 52 rounds A–Z then a–z. **Kept:** all 52 letters and their stroke order (the same glyph data), always-guided tracing as the first step, the frozen intro's promise ("all 26 capital letters AND all 26 lowercase letters … start on the dot and trace each stroke in order"). **New:** the carriage, write-after-trace, words and sentences, the locale ruling, the alphabet wall.

## 1. The pitch
"You always write in the same window, and the paper moves under it like a typewriter carriage — so letters come out left to right, sitting on the line, one space between words."

## 2. Why a child will want it again (the fun)
- **A typewriter you write with your finger.** Finish a letter and the paper glides left with three ratchet clicks; the letter you just wrote rolls out of the window and joins the line. The next start dot is already waiting in the window.
- **The finger space.** At the end of a word the paper stops and a dashed fingertip outline appears on the paper just after the word — the classroom "finger space" made real. The child presses a fingertip on it and holds (350 ms): the outline fills in, the paper slides exactly one finger-width under the finger with a ratchet *clack*, and a faint fingerprint stays in the gap for the rest of the line. There is only ever one outline, so there is only ever one space. On the finished strip the child can see their own fingerprints between the words.
- **The pull-out.** When the line is done, the paper tears off the roll with a zip, floats up and pins itself on the wall. Writing every letter of the alphabet fills **the alphabet wall** — 26 (or the locale's 27–29) pinned cards in alphabet order, in the child's own handwriting. Children come back to fill the gaps.
- **A bell** rings at the end of each line (a soft "ding", the carriage-return sound).
- No timer, score, streak or lives; wobbly letters are fine — only start, order and staying near the path matter.

## 3. The skill and the misconception
- **Skill:** form every capital and lowercase letter from the correct start point, in stroke order and direction, sized on the locale's ruled lines (tall letters to the top line, small letters between the middle lines, tail letters below the base line); copy words and short sentences left to right with one space between words (L.K.1.a, K-2xx worksheets).
- **Misconception 1 — starting anywhere / tracing backwards.** The tracer credits only arc swept from the start dot in the stroke's direction; ink drawn from the wrong end stays thin and pale and earns nothing.
- **Misconception 2 — letters float, all the same height.** Every letter is written in the window over the coloured zones (sky / grass / ground bands, per the locale's ruling); when it rolls out it sits on the line beside its neighbours, so a p that did not dip or a b that did not reach the top looks wrong *next to the others*.
- **Misconception 3 — no spaces, or huge gaps.** The paper only moves on finished letters, and between words only by one finger-width: no space is impossible (the next word's start dot appears only after the finger space), and a double space is impossible (one outline, one press).
- **Misconception 4 — writing right to left / starting anywhere on the line.** You cannot: the window is fixed and the paper only travels left.

## 4. The stage
`layout:'split'` off (the carriage spans the stage); bubble under it.

**At 704 px** (stage 704 × 470):
- **The wall** (top band 704 × 70): cork-coloured strip; in letter levels, 26–29 empty slot outlines (22 × 30) in alphabet order, filling with pinned mini-cards of the child's own letters; in word levels, pinned paper strips of finished words.
- **The roll and rail** (y = 84): a brass rail 680 × 10 across the stage with the carriage bell (geometry circle 18 px) at the right end and a paper roll (cylinder) at the right edge.
- **The paper** (y = 100, 704 × 250): cream `#FFFEFB`, ruled with the **locale's own writing ruling** (lines + tinted zones, copied as data from the Letter Studio ruling table — §9). Zones: ascender (sky tint `#E9F3FB`), x-height (grass tint `#EEF7EA`), descender (ground tint `#F6EFE6`); line weights per locale.
- **The window**: a frame 230 × 250 (3 px teal ink, rounded) fixed at x = 360–590. All writing happens inside it. The letter body: x-height **84 px**, cap height 160 px, descender 44 px.
- **Written letters** on the paper to the left of the window (same size); the last ~1.5 letters are visible.
- **The model line** (only word/sentence levels) above the paper at y = 360: the word printed in the school font 34 px, with the round's library picture (96 px) at its left; a small teal caret under the current letter.
- Guide (trace step): the road 7 u `rgba(20,107,94,.30)` + hairline 1.6 u `rgba(20,107,94,.85)`; ink `#C64A22` 5.4 u (the measured Letter Studio palette — contrast 4.56:1 / 4.73:1). Start dot green 22 px with a short arrow showing the first direction.
- **Task line** above the stage (≤ 24 px).

**At 360 px** (stage 360 × 520): wall 2 rows of 13–15 slots (14 × 20); paper 360 × 210; window 170 × 210 at x = 150–320; x-height 64 px, cap height 126; model line under the paper (word 26 px, picture **64 px**); Check under the bubble: Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: window 150 wide, x-height 58).

No words on the apparatus except the letters and words being written (content).

## 5. The hand
- **Trace (step 1 of each letter):** drag from the start dot along the road. Ink appears under the finger within 16 ms, only where the finger has been (no autocomplete — `stroke-trace-core` credits swept arc only). A lift mid-stroke keeps the ink; starting again from the ink's end continues it. When a stroke is complete it turns solid (100 ms) and the next stroke's start dot appears with its arrow. Wrong-end starts draw a thin pale line that earns nothing and fades after 1 s.
- **Write (step 2):** the same window, the same letter again, with only the ruling and the start dot of stroke 1 (the later start dots appear only when the previous stroke is done). The hidden path is the judge (tolerance 1.3 × the trace tolerance).
- **The carriage:** a finished letter (trace or write) makes the paper glide left by the letter's advance width (300 ms, 3 ratchet clicks). At a word end the paper stops and the fingertip outline (44 × 56 drawn, 64 × 72 hit area) appears in the window after the last letter. Press and hold 350 ms: a ring fills around the fingertip (the hold is visible), then the paper slides one finger-width (= 0.55 × x-height, the school spacing) under it (250 ms, `clack`) and leaves a fingerprint mark (geometry: 4 concentric arcs at 25 % ink). Lifting early: the ring empties, nothing moves, no miss. Only after the space does the next word's first start dot appear. Full stops: the last word ends with its own start dot for the full stop on the base line, then the bell.
- **Rub out:** a small eraser button (44 px, drawn geometry) clears the strokes of the current letter only.
- **Free play between rounds:** on the pinned wall, tapping a mini-card replays the child's own letter being written (their recorded strokes, 0.6× speed); tapping the bell rings it.
- Keyboard path in §10.

## 6. The rounds
**Level 1 — Capitals** (K-238, K-254–K-258). One round = one letter: trace once, write once (setting *Practice* can make it trace once, write twice — K-290). A pass = the chosen letter set. **Pass 1 runs in alphabet order** so the wall fills left to right; later passes are order-only reshuffles (never the same order twice). Sets (setting *Letters*): All A–Z (26; locale extras added, §9) · A–F · G–L (K-254) · M–R (K-255) · S–Z (K-256) · Vowels (K-257: A E I O U, + Y in sv/da/no/fi, + Å Ä Ö / Æ Ø Å where they are vowels) · First letters (K-258: L, T, I, E, H, F, O, C — straight lines first, then curves). Every set has ≥ 7 rounds except Vowels (5–9 by locale — padded to 7 in en/de/es/fr/it/pt/nl by writing A, E, I, O, U then the two most-confused, O and U, a second time in write-only).
**Level 2 — Lowercase** (K-278–K-283): the same sets in lowercase (g–l, m–r, s–z, vowels; first letters l, t, i, o, c, a, d).
**Level 3 — Words**, 8 rounds per set. One round = one word: trace the whole word letter by letter, press one finger space, write it once more (K-290 "trace once, write it twice" = setting *Practice: trace, write, write*). EN sets (each locale's native panel authors its own lists; nouns are library pictures with the vocab label in the page locale):
- *First words* (K-289, K-284, K-311): cat (pets/cat), dog (pets/dog), sun (beach/sun — weather/sun has no lcs-pictures label), bus (vehicles/bus), pig (farm-animals/pig), hen (farm-animals/hen), fox (animals/fox), cup (kitchen-tools/cup).
- *Longer words* (K-291): rabbit, turtle, banana, pencil, rocket, window, pumpkin, carrot (pets/rabbit, pets/turtle, fruits/banana, classroom/pencil, toys/rocket, around-the-house/window, vegetables/pumpkin, vegetables/carrot).
- *Capitals* (K-310, K-315): CAT, BUS, SUN, HEN, FOX, PIG, CUP, DOG.
- *Sight words sets 1–6* (K-239, K-259–K-263): set 1 the, and, a, I, to, is, it, in · set 2 see, can, my, we, go, me, he, up · set 3 like, you, look, here, said, for, no, at · set 4 come, play, big, little, down, one, two, red · set 5 was, are, they, she, have, what, this, of · set 6 where, there, help, make, jump, find, blue, yellow. (No picture for function words; the model line shows the word alone.)
- *Word of the day* (K-388): the setting picks one sight word; the round writes it in trace, write, write, then in a 3-word sentence from Level 4 that contains it.
**Level 4 — Sentences** (K-391), 8 rounds: "I see a cat." · "We can go." · "I like my dog." · "Look at the sun." · "The bus is big." · "I can jump." · "Here is a cup." · "My hen can run." The first letter is a capital, the full stop is a one-tap dot on the base line (its own start dot), and the carriage takes one finger space per gap between words. Trace once; setting *Practice* adds a write pass.
**Level 5 — Cursive** (G2-377, G2-384, G2-385, G2-386): letter groups i t u w · joins (two letters, e.g. "in", "it", "up", "we") · capitals in names · words with pictures. In cursive the carriage **keeps rolling while the pen joins** — the paper moves continuously under the join stroke instead of stopping per letter, and the finger space happens only between words. BLOCKED on per-locale school-script stroke data (§12); not shown until the data exists; refused in sv and fi (no joined school script — the same ruling the b6 cursive family recorded).

**Answer position:** none (production task). **Order:** pass 1 alphabetical in letter levels (pedagogical), every later pass and every word/sentence level reshuffled order-only per pass.

## 7. Check, the misses, the success
Each letter completes automatically when its last stroke is credited; **Check** confirms the round (word/sentence: when the last letter and the full stop are done).
- **Check with nothing done:** hint, no miss — "Put your finger on the green dot and follow the road."
- **Miss 1** (Check while a stroke is unfinished, or a write-step letter judged off-path): the apparatus shows — the unfinished stroke's road pulses from its start dot along its direction (a travelling light, 900 ms); in the write step, the **shadow letter** (the hidden path) appears faint over the child's ink so the child sees where they drifted · "Start on the green dot and follow the arrow." / "Look at the shadow letter — where did your line go off?"
- **Miss 2:** a spark walks the whole stroke from start to end in the right direction (the model movement, 1.2 s) and the road thickens; in write mode the write step turns back into a trace step for that letter · "Watch the spark, then do the same."
- **Spacing:** a short press is not a miss — the ring empties and waits. Check while the fingertip outline is showing → the outline pulses · "Press a finger space before the next word."
- **A new stroke takes the help away** until the next Check.
- **Success (letter):** the letter inks deep, rolls out of the window, and its mini-card flies to its wall slot · "{letter} — you wrote it!" **Success (word/sentence):** the bell rings, the strip tears off and pins to the wall, and (TTS where available) the word/sentence is read · "You wrote “{word}” — left to right, all on the line!"

## 8. Settings
1. **Letters** (Levels 1–2): All · A–F · G–L · M–R · S–Z · Vowels · First letters — the wall shows only the chosen slots at rest.
2. **Practice:** Trace, then write (default) · Trace, then write twice (K-290) · Trace only (for the youngest) — the window's step dots (1–3 small pips above it) change at rest.

## 9. Words (EN source)
- title (shell): **Penny's Alphabet Trace** (frozen) · instruction: "Start on the dot and trace the letter. The paper moves on by itself."
- task lines: L1/L2 "Start on the green dot. Trace it, then write it." · L3 "Trace the word, press a finger space, then write it again." · L4 "Write the sentence. Press a finger space between words." · L5 "Keep your finger down as the letters join."
- step pips aria: "Step {n} of {total}: trace" / "write".
- hints/celebrations: §7. Settings: "Letters", "All", "A to F", "G to L", "M to R", "S to Z", "Vowels", "First letters", "Practice", "Trace, then write", "Trace, then write twice", "Trace only".
- aria: "Writing window. Letter {g}. Stroke {k} of {n}, start at the green dot.", "Press here for a finger space", "Alphabet wall: {count} of {total} letters".

**Locale traps:**
- **Alphabets.** de adds Ä Ö Ü (ß lowercase only, after s); es Ñ (after N); sv and fi Å Ä Ö (after Z, in that order); da and no Æ Ø Å (after Z, in that order); it teaches 21 native letters with J K W X Y as "lettere straniere" — they stay in the set (the worksheets are A–Z) but the wall marks them in a second row; fr/pt/nl 26 (nl IJ is not a separate letter for writing). The diacritic letters are the base glyph + an extra stroke written LAST (two dots, ring, tilde, slash for ø, æ as a + e joined per the panel's school form).
- **Rulings differ by country** and come from data (the Letter Studio ruling table, ruled by ten native ensembles): es *doble raya* (two equally strong lines), pt (Brazil) no x-height line but a band, fi four identical lines, fr *interlignes* (all solid), several countries never print a dashed midline. The zone tints follow each locale's zones; a locale with no national convention keeps the neutral 3-zone default.
- **Letterforms and stroke order differ** (de Grundschrift/Druckschrift "1"-style strokes, the shape of a/g/t/y/k, where E starts). The shipped glyphs are the EN school print; each locale's native panel rules a `GLYPH_OVERRIDES[locale]` list (a letter's stroke order or shape) before that locale ships — never a silent EN default where the panel objects.
- **Word lists** (first words, sight words, sentences) are authored per locale, never translated (de "der die das und ist ich ein mit", fr "le la et est un une je il", sv "och att det är en på jag", fi "ja on se ei että hän olla minä" …); nouns carry the vocab label; de nouns keep their capital letter (Hund) — the capital is then traced as a capital.
- **Cursive scripts** are national (US D'Nealian/Zaner-Bloser, fr *écriture cursive* taught first, de Schulausgangsschrift/Grundschrift, it *corsivo*, es *letra ligada*, nl *lopend schrift*, pt *letra cursiva*, da/no school scripts); sv and fi have none in schools → refusal.
- Sound off: the whole task is visual; TTS only reads finished words.

## 10. Sound off, access, phones
- Silent legibility: start dots, arrows, the travelling light and the spark carry every instruction.
- Keyboard / switch path: Space traces the current stroke automatically at child speed *for demonstration only* (the stroke is NOT credited — the shell shows "watched" and the round requires a pointer trace or, in accessibility mode setting via the shell's switch-access flag, the stroke is credited for children who cannot trace; documented, off by default). Enter on the fingertip outline (held 350 ms, or the shell's switch flag) makes the finger space.
- aria-live: "Stroke done. Next stroke starts at the green dot." / "One space. Start the next word."
- Taps: the start dot 22 px with a 48 px hit area; eraser 44 px; the paper drag target is the whole strip.
- Pictures: model-line picture 96 px at 704, 64 px at 360.
- Phone: the window and paper scale; the wall wraps to two rows; the model line moves under the paper.

## 11. Distinct from
- **#74 Snippy (this batch)** — the Rewind Rail compares the child's movement with the model's after writing; Penny is the carriage that lays the line. Same worksheets, different invention and focus (Snippy: start/order/direction of one letter; Penny: letters into lines, words, sentences).
- **#218 Word Ribbon (Space Stone)** — a ribbon that unrolls under the pencil and a dragged space token. Penny never moves under the pen and has no token: the window is FIXED and the paper is a carriage, the space is the child's own fingertip pressed on the paper (the real classroom finger-space routine, leaving a fingerprint), and the heart of Penny is the alphabet A–Z sized on the country's own ruling with the wall in the child's handwriting. The two teach spacing in physically different ways.
- **#283 Cursive Ribbon** — owns cursive; Penny's cursive level reuses its carriage and is blocked until the same stroke data exists.
- **Built #5 Fading Line** (numerals; the guide fades step by step) — Penny's trace→write is two fixed steps in a moving-paper machine, not a fading guide. **Letter Studio (premium)** — a free single-letter tracer with a firefly demo; no carriage, no words, no wall.

## 12. Build plan
- **Core state** `{level, set, roundQueue, round:{units:[letter|space|stop], i, step:'trace'|'write', strokesDone, inkPaths}, paperOffset, wall:{letter → strokes}, misses}`; functions `newRound(spec)`, `beginStroke(pt)`, `extend(pt)` (delegates the judging to `StrokeTraceCore` with the glyph from `AlphabetTraceCore` + locale overrides), `letterDone()`, `fingerSpace(holdMs)` → `{spaced:true|false}` (true only once per word end, holdMs ≥ 350), `canStartNextWord()`, `roundDone()`.
- **Gate's own ground truth** (`verify-writing-carriage-core.js`): an in-order on-path oracle completes every glyph in every locale's alphabet (incl. Ä Ö Ü Ñ Å Æ Ø and the diacritic strokes last); a reversed-direction tracer, a wrong-start tracer, a scribbler and an out-of-order tracer earn nothing; the paper never advances on an unfinished letter; between words exactly one finger space is accepted (hold ≥ 350 ms) and no second one exists; no next-word start dot exists before the space; every word/sentence round's units equal its string (spaces and the full stop included); every picture exists and is colour; alphabet order of the wall per locale asserted against a hand-written list in the gate.
- **Mutations:** advance paper on an unfinished letter · accept reversed stroke · accept a wrong start · allow two finger spaces · accept a 100 ms tap as a space · show the next start dot before the finger space · skip the write step · diacritic stroke allowed first · locale alphabet order wrong (sv Ä before Å) · ruling ignored (fallback zones in es) · pass 2 order = pass 1.
- **Pictures to verify on a contact sheet:** pets cat, dog, rabbit, turtle; weather/sun; vehicles/bus; farm-animals pig, hen; animals/fox; kitchen-tools/cup; fruits/banana; classroom/pencil; toys/rocket; around-the-house/window; vegetables pumpkin, carrot (seen 2026-10-17: pets, vehicles, around-the-house, kitchen-tools, farm-animals sheets — all clean single objects).
- **Risks:** finger occludes the window on phones — the start dot and the next arrow are drawn 10 px larger at 360; the paper glide must never move during a stroke (lock while a pointer is down).
- **New stroke data (a build deliverable, not art):** the 52 shipped glyphs do not include Ä Ö Ü Å Ñ Æ Ø ß (and their lowercase). Ä Ö Ü Å Ñ = base glyph + the mark as a LAST stroke (two dots / ring / tilde); Ø = O + a slash stroke last; **Æ/æ and ß are new glyphs** (stroke order ruled by the da/no and de panels). The gate's alphabet oracle covers them.
- **Picture note:** classroom/pencil is drawn diagonally — render it with the per-noun lie-flat rotation (PICTURE-RULINGS).
- **BLOCKED:** (1) **cursive stroke data** for every locale's school script — glyph point lists for 26 lowercase + 26 capitals + the join strokes (entry/exit) in en, de, fr, es, it, pt, nl, da, no. Fallback: Level 5 hidden; G2-377/384/385/386 rely on #283 until the data exists (sv and fi refused). (2) Per-locale `GLYPH_OVERRIDES` are a panel deliverable, not art.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a finger typewriter with clicks, a bell, a finger space that leaves a fingerprint, and an alphabet wall in their own handwriting to complete.
2. **Would a teacher put it on the board?** Yes — start, order, sizing on the country's own ruling, left-to-right and one space between words are all enforced by the machine, not by red marks.
3. **Would a parent trust it?** Yes — calm, no scores, wobbly letters accepted, the school lines of their own country.
4. **The invention:** you always write in the same window and the paper moves under it like a typewriter carriage — letters come out left to right, on the line, one space apart.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 3→5 · reality 4→5
What changed:
- **Distinctness:** "push the paper one notch before the next word may start" was too close to #218 Word Ribbon (a line that unrolls letter by letter and waits for a space stone). The space is now the classroom **finger space made real**: a dashed fingertip appears after the word; the child presses and holds (a ring fills, 350 ms), the paper slides exactly one finger-width under the finger and leaves a fingerprint in the gap. One outline → one space; no token, no pushing. Strings, keyboard path, gate and mutations follow.
- **Correctness:** the 52 shipped glyphs lack Æ/æ and ß (new glyphs, ruled by the da/no and de panels) and the diacritic letters (base + mark stroke last) — now a named build deliverable; "My hen is red." (the picture is not red) → "My hen can run."
- **Reality:** weather/sun has no lcs-pictures label → beach/sun; classroom/pencil needs the lie-flat rotation (ruling).
- Fun: the fingerprints between words on the pinned strip are the child's own mark — a reason to look back at every finished line.
