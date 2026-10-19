# #31 — Dewey's Ten-Tank → THE GHOST RAFTS (K.NBT.A.1)

ORDER row 31 · id `ten-tank.ten-frame-tank.k-nbt-a-1` (kept).

**Own files:** `ghost-rafts-core.js`, `ghost-rafts-words.js`, `ghost-rafts-activity.js`, `ghost-rafts-activity.html` and `ghost-rafts-activities.json`.
- The row left `ten-tank-activities.json`, which is now `[]`.
- `local-test-ten-tank.js`, `_tentank-probe.js` and `verify-ten-frame-tank.js` exit "retired".

**Locales:**
- **Frozen:** slug, title and intro for en/de/fr/es/pt/it/nl.
- **New in sv/da/no/fi:** slug, title and intro, plus `GRADE_OVERRIDE` no `'1'` (1. trinn). sv, da and fi stay on the native K.
- **Prose:** rewritten in all 11 locales.

Design: `designs/031-ten-tank.md`.

## The apparatus and its invention: A WRONG CARD BUILDS ITS OWN GHOST
- **Drifting bubbles.** Glowing bubbles drift in the tank at no more than 12 px/s (wander 8 + bob 3.6), so they cannot be counted in place.
- **Catching.** A tap hops a bubble onto the next of the raft's ten seats; a drag drops it on the raft. A tap on the raft lets the last bubble go.
- **The seal.** On the tenth seat the ten melt into one golden ten-raft (a C–E–G chord), and Dewey (the library duckling) hops onto the deck at the raft's left end. Every bubble still loose hooks onto the tow-line in one row, so the ten is one thing and the "some more" can be counted.
- **The ghost bay.** Number cards are the answers. A wrong card builds its ghost beside the tank: 31 → three rafts and a bubble; 6 → six bubbles and no raft.
- **Misses.** At miss 2 the raft wears a 10 and the row is numbered 11, 12, 13…
- **The round kinds:**
  - CATCH: a card before the seal is no miss.
  - DOCK: a ready raft and a pile of nine bubbles in the reeds.
  - FIX: starts at 10 + 2; a second raft is refused.
  - POP: a 600 ms hold bursts the raft into ten loose bubbles; the row stays, and the number stays.
  - TWO TANKS: miss 1 pairs the rows one-to-one; miss 2 makes the extras glow.
- **The record** fills 10 + k = n, and Dewey paddles a lap.
- **Settings:** Numbers (up to 15 / up to 19) and Number cards (digits / words). Word cards carry soft hyphens only at the number word's own joints (fi kymmentä/toista, de und, nl -tig, sv tio, da og).
- **"Ghost bay"** is open play: any card from 11 to 99.

## Gates
- **`verify-ghost-rafts-core.js`: 123,330 checks.**
  - The design's tables.
  - The decoy kinds (reversal 3 of 5 per level; rank 1/2/2).
  - Over 10,000 seeds: a pass opens on a CATCH, no repeat and no repeated seam, the right card sits in each slot 1–2 times per pass, and the two-tanks coin is fair.
  - The seal exactly at the 10th seat (nothing on the tow-line before it, everything after).
  - The pop conserves the number; dock, fix and two tanks; a stale deal is refused.
  - Ghosts 1–99 by repeated subtraction; the drift stays ≤ 12 px/s.
  - Layout 280–1100.
  - Words byte-equal; strings ×11 (placeholders, no price word, fr U+202F).
- **`mutate-ghost-rafts.js`: 26/26 killed.**
- **`local-test-ghost-rafts.js --locales=all`: real taps in 11 locales.** It covers the drag, the hold (250 ms does not pop, 750 ms does) and the drift (moving, ≤ 13 px in 1 s). The sweep runs 320–1366 across nine states, including dock and fix at rest. ⚠ The default run is en only.
- **visual-qa:** 54 renders · **hierarchy:** 159/0 · **settings:** 2 live · **content ×11 and the content gates:** PASS.

## Traps
- **`String.replace` reads `$'` in a REPLACEMENT string** as "the rest of the input". A patch whose new text contained the regex `'$'` duplicated half the file. Always pass a function as the replacement.
- **visual-qa found a cut-off at 320 that my own sweep missed.** The sweep measured dock only after docking, when the ready raft has left the reeds; at rest the raft and nine 44 px bubbles wrapped to two rows. Now the pile is one button, and the sweep measures dock and fix at rest. **Sweep the at-rest state of every round kind.**
- **A gate that reads a constant from the core marks its own homework:** "the tank holds 20" survived until the gate asserted the literal 19. And a 9-bubble cap was dead code behind the 19-bubble limit; its survivor showed it.
- **The design's "72 px aboard" broke the 96 px picture law** at 704. Dewey is 96 aboard on wide screens, and the raft sits lower to make room.
- **The French strings were first written with plain spaces;** the gate's own check was too loose to see it. It is now "every `? ! : ;` preceded by U+202F".
- **A hidden "10" badge** counted as a number on the stage. Its text is set only at miss 2.

## Review (one agent, native ×11 + pedagogy) — applied
- **All locales:** the row was "behind" the raft in one string and "beside" it in another. Now "behind" everywhere (`hintNeed` / `hintNeed1` / `hintRoom`).
- **da:** the duckling is **Rappe**, not Rap, because "Raps" is rapeseed. Also "tømmerflåde" → "flåde", and `promptPop` "springe".
- **Record word:** de `record` "Die Rechnung", it "L’addizione", nl "De som" (the "inscription" words are gone, prose too).
- **sv:** "Talkort", not "sifferkort" (the cards can show words).
- **no:** "Få flåten til å sprekke", "la flåter sprekke", and "hold fingeren på" (prose too).
- **fi:** the instruction ("ylimääräisiä ykkösiä"), `hintSameTen` and `playBack` "Takaisin tehtäviin".
- **`hintSameTen`:** en "Which has", plus fr, es and it rephrased.
- **FROZEN-NOTE (not changed):**
  - **pt:** the TITLE ends "1º ano de graça", a price claim. This needs the operator's ruling.
  - **it:** the INTRO says the bubbles fall when tapped.
  - **nl:** the INTRO says "zonder sommen", but every round writes 10 + 3 = 13.
  - **fr:** the INTRO uses plain spaces before : ! and inside « ».
