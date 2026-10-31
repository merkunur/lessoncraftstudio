# #176 — Dr. Plume's Sentence Clinic → THE LISTENING LINE (L.2.1 · L.2.2; all 11 locales)

ORDER row 176 · id `sentence-clinic.fix-it.l-2-1` (kept). Design: `designs/176-sentence-clinic.md`.

## The invention
- A sentence card lies on Dr. Plume's clinic bed (sv/da/no Doktor Fjäder / Fjer / Fjær, fi Tohtori Sulka). The child picks a tool from the tray and mends the sentence; Check is the LISTEN.
- **The Listening Line** is drawn under the words, one beat per word. At every end the line does what is there against the sentence's tune:
  - it RESTS on a full stop / period, HOLDS OPEN on a question mark and SPIKES on "!";
  - it KINKS on the wrong mark and RUNS OFF where no mark is;
  - it KNOTS where two thoughts have no stop between them, and SAGS where a stop cuts a thought.
- **At Level 3** a missing word leaves a FLAT gap, a word too many beats twice, a word out of place beats backwards, and a wrong form sounds off-key.
- **Misses:**
  - Miss 1 freezes the troubles in coral (Level 2 knot: "Two thoughts are squashed together here…").
  - Miss 2 spotlights the first trouble and wiggles the tool that mends it. A knot is mended by the scissors; a sag (a stop inside a thought) gets "tap it to take it away".
- **Capitals are never the task** (row 182). A stop wakes the next word: its capital rises by itself. es opens a question or exclamation with ¿ / ¡ by itself; fr puts a narrow no-break space before ? and !.
- **Success:** the bed sits up; "Now it sounds right: “…”" (+ "Two thoughts, two sentences." at Level 2) is read aloud where a voice exists. Next follows 0.5 s later.

## Levels (setting "What to fix"; Level 2 is the default)
- **Level 1, Which mark?** 8 three-sentence cards per locale: the eight tell/ask patterns once each, and every position a question in exactly 4 of 8. Only the three ends take a mark, only `.` / `?`. A blind guess cures 1 card in 8.
  - es/pt/it questions all carry a question word, because verb-first is not a question there.
  - nl/sv/da/no questions are verb-first; fi questions use -ko/-kö or a question word.
- **Level 2, Where does it end?** 10 runs of two sentences.
  - No first-sentence length appears in more than 3 of 10 in any locale.
  - The second sentence never opens with a word that is capitalised anyway: the gate holds a de allow-list and a ban on names / I.
  - The seam word is shown lower-case.
  - Scissors open a pause; the mark still has to be chosen.
- **Level 3, Does it sound right?** 10 repairs per locale: 3 word forms (the wheel), 2 missing words (the caret), 2 extra words (lift), 2 muddled orders (swap + the end mark), 1 exclamation.
  - Exactly one option makes a correct sentence: the option lists are signed and frozen in the gate.
  - The reorder start word is the only one printed with its capital.
  - sv/da/no have no person agreement, so their form rounds are real child errors: ett röd hus → rött, två hund → hundar, kan svømmer → svømme.
- **Setting "The line":** "Shows the tune first" draws each sentence's tune faintly before Check. The default is off.

## Deviations from the design
- **Data:** lives in `sentence-clinic-data.js`, built per locale. The manifest row has params `{}` and task_template `listening-line`. `fix-it-core.js` stays, unused; its gates are retired.
- **Swap instead of drag:** reordering is tap two words to swap them, not a drag.
- **Keyboard:** Tab through the tools and the live gaps/words, Enter applies, Esc puts the tool down, Ctrl+Enter checks.
- **Tools that cannot act are greyed:** in a round with no missing word the caret is disabled, and the wheel only spins on the word that has forms.
- **Phones:** the Check button sits with the tray. Solved, the tray steps back and the cured words shrink to plain text so the success line and Next stay above the fold.
- **The frozen intros** still mention "a missing capital" (en, es, it, nl, pt). That half of the old deck now lives in row 182; the intros are frozen metadata and stay.

## Review (one native + pedagogy reviewer, all 11 locales) — every finding fixed at the source
- **SEVERE, all fixed:**
  - en reorder "fast runs dog The" had two right orders (The fast dog runs.) → "home runs dog The" → "The dog runs home."; the old kept round is a recorded replacement.
  - fi reorder "talo Meillä punainen on" had two orders → "Kissa nukkuu sohvalla."
  - pt L2 #1 "Estou com fome quando…" read as one statement → "O que a gente vai comer?".
  - it L2 #1 "Ho fame quando mangiamo" → "Ho fame. Cosa mangiamo?".
  - it L2 #10 "Perché hai freddo…" (perché = because) → "Dove hai lasciato la tua giacca?".
  - da/no/fi new intros claimed "no account" → "no timer, no score".
- **MINOR, fixed:**
  - en "full stop" → "period" (US register, as the rest of the page);
  - de Becken → Schwimmbad, "Da ist ein Fuchs drauf", qThree;
  - es hintSwap agreement, es L2 #10 pragmatics;
  - pt L2 #6/#8 and hintSwap;
  - nl hintSwap;
  - sv form round (å→och was a spelling slip, not a form) → "Hon springer till skolan" (recorded replacement);
  - fi qThree, sävelmä;
  - fr "les outils pour les mots";
  - it prose framework line.

## Gates
- `verify-sentence-clinic-core.js` 4,680/0, its own truth:
  - the authors' sentences with their real capitals and the reviewer-signed option lists (`scripts/verify-sentence-clinic-authored.json`);
  - the frozen old repairs (`scripts/verify-sentence-clinic-kept.json`; two recorded replacements);
  - its own cured-text rules.
- What it checks, every round × every level × 11 locales:
  - the Level 1 patterns, the Level 2 spread (≤ 3/10 per length, runs ≤ 13 words, no capital tell);
  - every Listening Line event on the untouched, the cured and each single wrong move;
  - exactly one right option, the start-word capital, the rising capital;
  - the hand, the reshuffle, the strings, prose, manifest and html.
- `mutate-sentence-clinic.js` 26/26 killed; the control passes.
- `local-test-listening-line.js` 1,595/0 in all 11 locales: real taps and keys through all three levels, every Level 3 kind mended by taps, the fold at 320/360 at rest and solved, every state resized through 320…1366.
- Visual QA ×11 locales: 360 renders each (6 phases × 10 rounds × 6 viewports), all PASS; tablet reach included.
- Hierarchy 1,387/0; settings efficacy 2 live (level, line); prose claims, SERP copy, content tells, route preflight and Next delay all PASS.

## Live (2026-10-31)
- Deployed with `b1534fed3`; payment canary OK. Wrapper 9.922.
- `live-verify-listening-line.js --locales=en,de,sv,fi`: 52/0.
  - All 11 pages return 200.
  - At 1366 and 390, real taps putting only the end mark → a knot at the seam (a miss).
  - The stop in the seam → cured, the bed sits up.
  - The iframe grows with the card.
