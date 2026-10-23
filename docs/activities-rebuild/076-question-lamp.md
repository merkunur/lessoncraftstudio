# #76 — Wren's Question Window → THE QUESTION LAMP (L.K.1.d, all 11 locales)

ORDER row 76 · id `wren-question-window.question-words.l-k-1-d` (kept). Design: `designs/076-wren-question-window.md`.

## Files and wiring
- **New files:** `mini tools/question-lamp-core.js`, `question-lamp-activity.js`, `question-lamp-activity.html`. CSS prefix `ql-`.
- **Pictures:** through `lcs-pictures.js` (library pictures only; checked on a contact sheet).
- **Manifest:** the row stays in `wren-question-window-activities.json`.
  - `tool` is repointed;
  - `params` became a mirror of the core;
  - en/de/fr/es/pt/it/nl slug, title and intro are frozen (gate hash `eb65a426…`);
  - sv/da/no/fi slug, title and intro are new.
- **Route:** `GRADE_OVERRIDE` '1' for sv/da/no/fi; `ACTIVITY_WRAPPER_VERSION` 9.817.
- **Legacy gates:** `verify-question-word-core.js` and `local-test-wren-question-window.js` exit 0 with a pointer. `verify-asking-bench.js` still passes.

## The invention: every question word is a lamp
- **The answer** stands as picture cards under a lamp rail, with one card in a gold ring. Verb cards are plain and are never a target.
- **The child** puts a question word in the gap above and presses Check. The brass lamp swings along the rail and LIGHTS the card that word asks about: the gold card when the word is right, another card or nothing when it is not. The light is a glow, never a ring, so only the gold card wears a frame.
- **After a right answer** the lamp tours every picture card with the question word that asks about it.
- **Levels:**
  1. who/what/where (12 rounds);
  2. adds when (8);
  3. all six words (9);
  4. match a question to one of three answer cards (8);
  5. sort answers under three lamps (7 boards).
- **Answer setting:** keys / Write it. The keyboard holds only the letters of the level's words.
- **Misses:**
  - An empty Check or an unknown word is a hint, not a miss.
  - The second miss adds kind marks.

## Rules this build bought
- ⭐ **A key in a special form gives the answer away.** de Wohin, sv Vart, es Adónde, pt Para onde and six Finnish case forms were each the only key not in base form, so a child could pick the odd-looking key without reading. Fixed at the source:
  - the directional sentence ("carries milk to the table") became a static place ("drinks milk at the table") in all 11 locales;
  - the Finnish forms that were not needed went back to Mitä;
  - fi J was rewritten so "who" asks with Kuka.
  - The build now REFUSES a key-form override, and the gate asserts that every key is its base form (mutation killed).
- **A prepositional what-chunk** (nl/sv/no "in de soep") does not answer "what" and also fits "where". The verb now carries the particle.
- **The lamp's light was a yellow frame** that read like the gold ring. It is now a glow with no ring.
- **fr at 320 px:** "Qu’est-ce que" pushed the three keys onto two rows, and the task line ran to three lines. Fixed with a tiny-mode key minimum of 64 px and a shorter fr task line.
- **Library limit:** "in the morning" stays `beach/sun`; the only sunrise picture is B&W.

## Gates
| Gate | Result |
|---|---|
| verify-question-lamp-core | 7284 / 0 |
| mutate-question-lamp | 15 / 15 killed |
| local-test-question-lamp (11 locales × 320–1366, shots) | 1874 / 0 |
| visual-qa (en, fr, fi, de) | green |
| hierarchy | 398 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy, content-sv/da/no/fi/de, answer-rank | green |

One native + pedagogy reviewer covered all 11 locales and re-checked the fixes; the result was clean.
