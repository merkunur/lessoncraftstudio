# #41 — Match Uppercase and Lowercase Letters → THE PRINTER'S TYPE CASE (RF.K.1.d)

ORDER row 41 · id `choice-board.letter-case.rf-k-1-d` (kept).
- **Files:**
  - Added: `type-case-core.js`, `type-case-activity.js`, `type-case-activity.html`, `type-case-activities.json`.
  - The row left `choice-board-activities.json` as text (11 rows remain, CRLF kept, the other rows byte-identical).
  - 0 shared-core lines.
- **Metadata:** slug, title and intro are frozen in all 11 locales; the prose is rewritten ×11.
- **Design:** `designs/041-choice-board.md`.
- The `type-case` prefix was checked free before the first write (the #39 lesson).

## The apparatus and its invention: EVERY SORT CARRIES ITS OTHER FORM ON ITS BACK
- **The type case:** capitals in the upper drawer, small letters in the lower one. One form is given in its drawer, and the child drags (or taps) the other form from the composing tray into the empty compartment.
- **A wrong sort tips over** in the slot and shows its own other form, so a D lies under the B and the column plainly holds two different letters. It counts as a miss, and the slot stays empty.
- **Help after a miss:**
  - After miss 1, any sort can be turned with a long press (or F).
  - After miss 2, the given letter turns too and shows exactly the shape to look for.
- **The press:** a right pair is pulled on the press (the Check button, or P) and printed onto an alphabet poster in the page's own language. The poster carries each locale's letters in their school places: de ÄÖÜ, es Ñ after N, pt Ç after C, fr É after E, sv/fi ÅÄÖ, da/no ÆØÅ. The poster persists through the session.
- **Look-alikes level:** eight sorts on a composing stick (b d p q, n u m h, M W N H, plus a locale set: de Ü, es ñ, pt ç, fr é, sv/fi ä, da/no ø). The child taps every copy of the target. A wrong mark turns over to show whose letter it really is, and a missing copy shimmers after a miss. The stick is re-dealt each time so the targets are in both halves and never strictly alternate.
- **In words level:** three short words, each under its library picture, set in sorts (all capitals or all small letters). The child taps every copy of the target, then taps how many on count keys 1–6. Counts are case-sensitive: a lowercase target never counts a capital.
- **Settings:**
  - Level: pairs / look-alikes / in words.
  - Direction: both / capital first / small first. This mirrors the rounds (swaps given and answer, and turns the look-alikes into their other case) rather than dropping any.
- **The typeface:** Andika, the literacy typeface: single-storey a and g, and a capital I, small l and 1 that never look alike.

## Deviations from the design (each measured)
- **On phones, the in-word letters are as narrow as 20 px (46 px tall)** so a word never breaks across lines. tartaruga at 320 overflowed at 24 px.
- **On phones, the side panel (press + poster strip) sits below the ask row.** Above it, Check fell below the fold at 360 in every locale.
- **Look-alikes and in words use one drawer**, not two: the second drawer was empty and pushed Check below the fold.
- **The prompt names the given letter, not the answer.** The design's "Find the small b" form named the answer.
- **es-MX uses "jitomate"**: the picture's vocab label in Mexican Spanish.
- **Spanish direction balance is 2 capital-given / 6 small-given, kept verbatim** from the old rounds. The gate asserts ≥ 2 of each.
- **The flip is a long press (or F), with no corner arrow.** A 44 px corner arrow would cover a third of a 62 px phone sort.
- **No "Print shop" free play.** The three levels and the direction setting carry the activity. A free play mode would need its own word-setting surface and is left for later.

## Fixes from the build (each found by a gate or a render)
- **Narrow layout:** the tray overflowed at 320. Narrow sorts are now 62 × 72 with a 44 px glyph.
- **Count keys** were 43 px at 320; the key gap is now 4 px, so they are ≥ 44 px.
- **Keyboard P** stopped working after a fit (focus left the wrap). P now works anywhere in the wrap, and focus moves to Check after a fit.
- **Two mutants survived** (look-alikes passing with a copy unmarked, and a look-alike counted as the target). The gate now checks every round's targets against its own oracle, plus a one-copy-short press.
- **The gate claimed 4/4 direction balance** while es is 2/6 verbatim; it now asserts ≥ 2 each way.
- **The accent-twin rule** condemned fi "lehmä" (target a, distractor ä); each locale's own letters are now exempt (de äöü, es ñ, sv/fi åäö, da/no æøå).

## Gates
- **`verify-type-case-core.js`:** 4,071 checks, 0 failures. Its own oracle covers:
  - the other-form function; the 88 old rounds verbatim against the manifest; the direction transforms; answer slot balanced per pass;
  - look sets typed; deal uniformity ±3 % over 10,000 deals; every round's targets equal the oracle's; one copy short never prints;
  - in-words counts typed per locale; labels against `image-vocabulary.js`; every picture exists; the accent-twin rule; the de non-initial target; no ß in capitals;
  - the posters ×11, order, strings ×11, layout.
- **`mutate-type-case.js`:** 16 of 16 mutations killed.
- **`local-test-type-case.js`:** 729 checks, 0 failures, in all 11 locales. It covers:
  - real pointer: drag and tap fits, a wrong drop and its tip-over, the flip latch, both help levels, the press, the poster print, look-alike marking and unmarking, the in-words count keys, the settings, and the keyboard (F and P);
  - the 320 fold per locale, and a width sweep 320–1366 in fi and pt.
- **Animated path (no FAST):** no console errors in en and fi across all three levels.
- **Other gates:** `visual-qa-activity.js` 48 renders pass; `audit-activity-hierarchy.js` 146 / 0; `audit-settings-efficacy.js` 2 live (level and direction both change the board); content gates ×11, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are all green.
- I read the 360 / 704 / 1024 renders myself: pairs at rest and won (B b printed, Bb lit on the poster), look-alikes at help 2 with the wrong marks turned over (pt ç), in words at help 2 (pt U), and the preview (a wrong p tipped, showing P).

## Review (one agent, native ×11 + pedagogy): applied
- **Confirmed:**
  - all 77 in-words counts are exact (case-sensitive);
  - fr typography is correct, and no "free" word appears;
  - the look-alike sets are fair (é, å, ä are deliberate separate letters).
- **Pedagogy, in all 11 locales:** howToPlay omitted the counting step (in words will not print without a count), and the prose said the child "says" how many when they tap a key. Both are fixed.
- **sv:** `hintNotTarget` read "none of these are" and now reads "Inte alla de här är {target}". The level is "Liknande bokstäver" ("Lika" = identical).
- **da:** the level was "Ens bogstaver" (= identical letters, the opposite) and is now "Ligner hinanden".
- **no:** the level is "Bokstaver som ligner"; the prompts read "Finn lille/store {given}".
- **nl:** the level is "Lijken op elkaar".
- **fi:** the level names were garbled as adjectives in the prose and are now "Samannäköiset-tasolla" and "Sanoissa-tasolla".
- **de:** "an der Presse ziehen" (prompt, button, prose); "Fibelschrift".
- **Typeface wording:** sv/da/no say a printed typeface, not school handwriting.
- **Framework wording:** es "campo formativo Lenguajes", pt "componente Língua Portuguesa".
- **en:** the poster sentence no longer claims extra letters.
- **Not applied, with the reason:** "replace size-only pairs (O/o, Å/å, Ö/ö)". RF.K.1.d asks for all upper- and lowercase letters, including those whose forms differ only in size, and the 88 pair rounds are kept verbatim from the old activity. In those rounds the tray still carries three other letters, so the task is not empty.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **nl page_intro** describes the old activity (a big letter in the middle, four small letters below) and says "groep 3" for kleuter content.
- **English-style title case** in nl, da, no, fi, es, it and pt page_title. The da/nl slugs "match-…" are anglicisms.
- **The intros** (except the generic de and fr ones) describe only the pairs level.
