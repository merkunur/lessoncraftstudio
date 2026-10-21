# #67 — Otto's Picture Book → OTTO'S PROOF PINS (RL.K.7, all 11 locales)

ORDER row 67 · id `otto-picture-book.which-picture.rl-k-7` (kept).
- **Files:** a new `otto-pins-core.js`; `otto-picture-book-activity.js` and its html are rewritten. The html no longer loads `picture-moment-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `otto-picture-book-activities.json`, edited as text. The old rounds are replaced by a mirror of the core: rounds per task × Sentences setting, per locale.
- **Metadata:** slugs, titles and intros stay frozen in en, de, fr, es, pt, it and nl (gate hash `d20796cd…`, the sha1 of the seven locales' slug/title/intro). sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1'.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-picture-moment-core.js` exits 0 with a pointer. `local-test-otto-picture-book.js` is rewritten.
- **Design:** `designs/067-otto-picture-book.md`. CSS prefix `op-`.

## The apparatus and its invention: a word only sticks where the picture shows it
- **The sentence strip:** Otto (the library owl) holds a sentence. Every important word carries a small pin, a bead under the word.
- **Check:** the pins fly into the picture. Each lands on the thing its word names and STICKS (teal); a word the picture does not show finds nothing, falls back and DANGLES under its word (coral). The child sees exactly which word did not match, not just "wrong".
- **Four tasks (setting "Task"):**
  - **Which picture?** a four-panel library story; put the sentence under the one panel that shows it (tap the strip then the panel, drag it, or press 1–4).
  - **Fill the blank:** a scene and a sentence with a gap; choose the word from a bank of three (tap or drag). With Two parts, a short word is spelled with letter tiles instead (the word's letters + two others, never in order).
  - **Read and color:** a row of library pictures with an arrow at its start (where "first" is); pick a paint pot and paint as the sentence says (a number, all of them, the second / first / last / between).
  - **True or false?** a scene and a sentence; ✓ or ✗, then Check — the pins fire and show why.
- **Setting "Sentences":** One part, or Two parts (two strips to two panels; longer sentences with "and"; two-part color instructions; letter tiles).
- **Misses:**
  - Miss 1: the pins dangle where the picture does not show the word, and the hint says what to look at (color hints name the thing, the color, the number or the place).
  - Miss 2: Which points at the right panel; Fill makes the right word glow (or shows the word in grey letters in empty boxes); Color rings the right tiles; True or false fires the pins.
- **Balance:** each pass is all rounds in a fresh order (never the last pass's order, never starting with the round just played); the right word's place in the bank is 3/3/2 and never three running; True or false never has three answers the same running.

## Content decisions (beyond the design)
- **One right answer, measured:** the design's targets were ambiguous (the sandcastle, the snowman with a built-in scarf, the butterfly, the apple tree with apples). The panels and sentences were redrawn so each strip sticks in exactly one panel, in every locale (the gate reads the pins itself).
- **Letter boxes are display-only:** tapping a used letter tile gives its letter back, so every control stays ≥ 44 px. After a wrong spelling the letters go back to the tray, so the miss-2 grey letters show in empty boxes.
- **Pictures fill the color tiles:** the paint disc sits behind the picture, so the pictures stay at their floor (96 / 64).
- **Letter tiles only where the word is ≤ 5 letters:** it and fi have none; their Two-parts Fill rounds use the word bank.

## Native + pedagogy review (one reviewer over every sentence, string, the new metadata and the prose of 11 locales)
- **MUST, fixed in all 11 locales:** the sandcastle's second sentence named Mae, but its panel (castle + shell) has no Mae in it — an unpinned word the picture contradicts, in an activity that teaches "every word must be in the picture". Now "A shell sits on top of the castle."
- **MUST, the color rings:** the core already graded "Color 3 balloons red" as ANY three of the five, but the miss-2 rings always marked the first three, so a balloon the child had painted right further along would have shown as "not asked". The rings now keep the child's right tiles first (gate test + mutation).
- **MUST, nl:** «blijft hangen» means *gets caught* — the opposite of dangling — in the hint and the prose; now «loshangt / hangt los».
- **SHOULD, applied:**
  - sv: «vindby» (a gust; «vindpust» is a gentle breath and neuter);
  - es-MX: «brote» (not «capullo», read as a cocoon beside the caterpillar story); the goldfish is in «una pecera» [pecera / taza / caja];
  - pt-BR: «broto» (not «botão», read as a button);
  - fr: the goldfish is in a «bocal»; «Avec quel mot la phrase correspond-elle à l’image ?» and the prose without the «fait aller» calque;
  - it: «Quale parola fa corrispondere la frase al disegno?» and the prose to match;
  - da: the exercise «kører» in the browser;
  - fi: no comma before «ja» in the eight two-part true/false sentences; «jää roikkumaan»; rc6 «keltaisiksi».
- **Not applied, with reason:** fr «école maternelle» → «CP». This row carries no fr grade override, so fr ships at GS (maternelle); the prose is right.

## FROZEN-NOTEs
- **Intros:** the en, de, fr, es, pt, it and nl intros still describe the old tap-the-moment game. de and fr also say «ohne Anmeldung» / «sans inscription».

## Gates (local, all green)
- **verify-otto-pins-core:** 44334 pass, 0 fail. It covers:
  - Which: every strip × every panel in 11 locales × both settings, read by the gate's own pin/feature check (each strip sticks in exactly one panel, its target);
  - Fill: only the right word's pin sticks, the rest of the sentence sticks; letter tiles over 200 seeds;
  - True or false: four true / four false per setting, read from the pins;
  - Color: the gate's own table of what each instruction asks, the right painting, 4,000 seeded paintings per round compared with the core;
  - the deals and orders over 1,500–3,000 seeds a task; hints; texts and strings ×11; pictures; floors; the manifest mirror and the frozen hash.
- **mutate-otto-pins:** 22/22 killed (the rings mutation added after the review).
- **local-test-otto-picture-book:** 5367 pass, 0 fail. Real pointer, every round of every task in both settings in all 11 locales (taps, drags, keyboard, empty check), plus a width sweep at 320–1366 with rest, miss 2 and won. The first sweep found the letter boxes as 32 px tap targets and the color pictures inset below their floor (55 / 83); both fixed.
- **Other audits:** visual-qa en and fi 48 renders each passed; audit-activity-hierarchy 524/0; audit-settings-efficacy 2 settings live; both preflights pass; verify-activity-content ×11 pass.
- **My own read:** the 360, 768 and 1024 renders (which, fill with grey letters at miss 2, two-part true/false with the dangling «hat», the two-part color row with rings). It found the fi pinned word sitting above the line beside unpinned words; the pinned words are now baseline-aligned.

## Live (2026-10-21)
- Commit `75681dd1`, deployed (`git pull` → cp the four mini-tools files → `deploy.sh`), preview webp uploaded first.
- `live-verify-otto-picture-book.js`: 75 pass, 0 fail on the second run (the first run raced the page cache on the two new sv/fi pages). It covers all 11 pages returning 200, plus en/de/sv/fi at 1366 and 390: two-part boat story on wrong panels (words dangle, hint, miss) then right (success text); true/false tf8 wrong then right; wrapper 9.806; the iframe grows with the card.
- Variety probe en/sv/fi: 8 distinct rounds, reshuffled per pass.
