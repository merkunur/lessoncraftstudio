# #29 — Quick Facts to 5 → THE MUSIC-BOX STRIP (K.OA.A.5)

ORDER row 29 · id `ten-frame.quick-facts-to-5.k-oa-a-5` (kept) · own files `music-box-core.js`, `music-box-activity.js`, `music-box-activity.html`, `music-box-activities.json`. The row left `ten-frame-activities.json`, whose last row is `ten-frame.teen-numbers.make-n`. `verify-ten-frame-quickfact.js` and `local-test-ten-frame.js` exit "retired". Metadata is frozen in all 11 locales; the prose was rewritten ×11. Design: `designs/029-ten-frame.md`.

## The apparatus and its invention: THE ANSWERS ARE NOTES
- **The bars:** five number bars, bar k exactly k blocks tall; the longer the bar, the lower its note. The "to 10" level has ten bars, in two rows of five on phones.
- **A round is one phrase of a real song:** Frère Jacques, Ode to Joy, Lightly Row, Alle meine Entchen, Hot Cross Buns, Twinkle, Au clair de la lune or Mary Had a Little Lamb. Its facts are drawn so their answers, in order, are the tune's notes, and the facts on each note are re-drawn every pass.
- **A right bar** punches a hole in its row of the music-box strip; the next fact appears at once, and the answered fact flashes in the note line.
- **During a round every bar knocks the same "tok",** so the melody cannot answer the maths ("Notes: As you go" is the teacher's opt-in).
- **The crank** wakes only when the strip is full. It plays the song at its stored tempo — never faster for a faster child — while the holes light in turn, and the song's picture pops up.
- **A wrong bar punches nothing:** the fact's rods lie against that bar (a coral a-rod on a teal b-rod; in subtraction the top b blocks break off), so the stick-out is the error.
- **Miss 2** opens the five-frame with the fact as counters, and the hint says "count the counters" (for subtraction, "that are left"). **The rods stay at the tapped bar and nothing marks the answer** (reviewer ruling; the design had them move beside the right bar and lift its disc).
- **Settings:** Level (To 5 / To 10), Facts (Add and subtract / Add only), Show facts as (Numbers / Dots / Pictures), Notes (At the end / As you go). All four were measured live.
- **"Music box"** is open play: up to 12 holes, crank your own tune, New strip.

## Gates
- `verify-music-box-core.js` 9 271:
  - every melody against the gate's own note-name transcription and pitch map;
  - the pool equals the design's table, and every legal fact (no 0) is present in all four level × facts combinations;
  - the eight old facts are in the pool;
  - drawn facts answer the notes over 1 000 seeds per song, with no repeat while unused facts remain;
  - tap, rods and the crank schedule are recomputed from beats × tempo, identical for a strip answered with misses and one answered straight;
  - in-round "tok", and a longer bar always sounds lower;
  - every round keeps its most frequent answer ≤ 50 % and its repeats ≤ 3;
  - order, the Music box, layout, pictures on disk, strings ×11;
  - nothing on screen says "fast".
- `mutate-music-box.js` 27/27. Three early survivors each pointed at a weak oracle: a tempo mutant keyed on a counter that is 0 again at the crank, the crank only tried on an empty strip, and the cap checked against the core's own constant.
- `local-test-music-box.js` 561/0: real taps, 11 locales, the timed playback (holes light in order), sweep 320–1366 across six configurations.
- `visual-qa` 48 · `hierarchy` 242/0 · settings 4 live · content ×11, prose-claims, SERP, tells, answer-rank, preflight PASS.
- Pictures opened on a contact sheet: 5 fruits and 8 song badges.

## Traps
- **A completed-fact flash in the card hid the next fact for 1 s while the bars already took the answer** to the unseen fact. It was found while writing the production test, not by a gate. The flash now lives in the note line.
- **The first live region on the stage is what visual-qa measures for scaling.** A fact card marked `aria-live` failed it at 16 px. The card is a labelled image, not live.
- **An SVG with `role=img` counts as a drawn picture** in the hierarchy audit. Label a wrapper and hide the SVG.
- **Heavier teacher settings** ("to 10" with pictures and an open frame) need not fit the whole page on a phone. The local test then requires every bar and the crank on screen; the default page must fit entirely. The duplicate frame under a "to 10" picture card was dropped.

## Review (one agent, native ×11 + pedagogy) — applied
- **MUST-FIX:**
  - The design's miss-2 help moved the rods beside the RIGHT bar and lifted its disc, which reveals the answer. Now the rods stay at the tapped bar, nothing is lifted, and the counters are the only scaffold (core `rodBar`, gate, and a new mutation "miss 2 rods jump to the answer bar"). Prose ×11.
  - "Count the counters" on a subtraction fact leads to the crossed-out ones too. Subtraction gets its own `hintCountLeft` ("…that are left…") ×11, with a mutation.
  - The on-screen title promised speed (Quick / Schnelle / rapides…) → "Facts to 5" ×11. The frozen metadata still says it.
  - sv/no: the rods and the bar shared one word → klossar/klosser; de → Klötzchen.
  - no "Hvert riktig svar"; fi "{d} palikan verran"; es rods phrasing.
- **SHOULD-FIX:**
  - en source: "facts up to ten", "a second wrong bar", rods "stick out / stop".
  - "Look at the fact on the card", not "window" ×11.
  - Five-frame names: fr "cadre à cinq cases", it "griglia del cinque", nl "vijfvak".
  - fr: songStar in guillemets; "Ni minuteur ni score".
  - es: songStar "Estrellita"; the exclamation in the instruction.
  - fi: "Soitit kappaleen {song}!" (the name stays nominative).
  - it hintRods.
- **FROZEN-NOTE:**
  - The metadata of every locale names a ten-frame (it is a five-frame).
  - en/no promise speed ("fast", "raskt"); no mentions answer options.
  - fi says "0–5" (there is no 0 bar).
  - fr says "sans compter sur ses doigts".

- **A full-page fit at 320 × 640 after a miss** was 22 px short (the header and prompt take 155 px). The Music box button becomes a 48 px ♪ icon in the card row below a 300 px stage, keeping its full label for screen readers.
- **⚠ A real-tap test scrolls the page:** measure a fit after `scrollTo(0, 0)`. Here the number did not move when the layout shrank, which exposed it.

## Live (2026-10-19)
Commit 99be8dfa, wrapper 9.763, deploy exit 0. `live-verify-music-box.js` 64/64 on production (en/sv/fi/de × 1366/390): a wrong bar punches nothing ("Look — the rods…"), eight right bars fill Frère Jacques, the crank plays it and the bell pops up; the iframe follows the card (measured after a 1.5 s settle — the parent resizes about half a second after the bubble grows). All eleven locale pages 200.
