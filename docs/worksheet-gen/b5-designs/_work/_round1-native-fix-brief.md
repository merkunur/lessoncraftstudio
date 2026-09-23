# nt10-E — native fix round 1 (one fixer per locale)

The landing panels read every render and found defects; three generator rounds (A shapes/road/maps/space,
B plants/cycles/family, C lexical banks) fixed the code and added gates that now run over EVERY locale.
Your locale's remaining failures are DATA and STRINGS that only a native can author. You are the same
three heads as the content panel (linguist · K-3 teacher of your country · SEO) — rebuild natively,
never translate the English.

## You edit ONE file
`scripts/worksheet-gen/i18n/.draft-b5-<loc>.json` (banks, types, skills). Do NOT run `apply-b5-locale.js`
(the coordinator applies locales one at a time — shared files would collide) and do not edit any other repo file.
Check with `node scripts/worksheet-gen/tools/validate-b5-draft.js <loc>` → must reach `0 error(s)`. It builds all
types against your draft and runs the family gates' bank rules. Render your changed pages from the draft the
way the validator does (see its `--help` / source for the temp-dir mechanism) and READ them.

## Your work list — every item below that names your locale
1. **Lexical bank failures** — `docs/worksheet-gen/b5-designs/_work/_round1-locale-failures-lexical.md`, your
   locale's section (synonyms rules 16-19, word-parts rules 16-21, digraph picture swaps). New flag every
   synonyms "said" frame must carry: `plainVerbOK: true` — set it only when the plain verb really stands in that
   frame; rewrite frames where it does not (direct speech works).
2. **G1-383 riddles (2d-shapes)** — square and rectangle riddles must name the right ("book") corners so no riddle
   fits a rhombus or parallelogram. de pt fr sv da no: square[0], square[1], rectangle[0], rectangle[1];
   es it: rectangle[0]. One clue per shape kind; no two riddles state one fact.
3. **G1-378 fact `orbitsEarth` is benched** (it named the Earth column) — de es fr it nl sv da fi: author a Moon
   fact that names NO column head in any inflection (not Sun/Earth/Moon), concept distinct from the other Moon facts.
4. **G1-384 meanings** — es fr it: the crossing meaning; nl: the yield meaning — must be mutually exclusive with every
   other sign meaning on the page (gate rule 14).
5. **Strings the generator changes now require** (all 10 locales unless named):
   - K-376: the instruction says ONE plant per ROW (es pt fr it sv da no; check de nl fi).
   - G2-366: the cards are "stages", not "young animals"; every bin now has 4 boxes and some stay empty — say so.
   - G2-365: one consistent instruction — write the four stage names; one word in the box does not belong.
   - G1-390: say the cycle starts again (after the adult comes the egg).
   - G2-364: the flower-colour phrase was deleted from every bank — confirm your job line still reads well.
   - G3-392 de: sepal = "Kelchblatt".
   - G3-398 / G3-399: name the drawn apparatus (a dashed box / word cards / the root plate) — never a stone or
     brick that is not drawn; G3-398 items obey your declared suffix set; no "at work" beside play pictures.
   - G2-373: never the word "sock" (the sock art is retired).
6. **Your landing panel's findings** — `scripts/worksheet-gen/out/b5-findings-<loc>.txt`. Fix every one that is a
   string or bank defect in YOUR data (a wrong grade in a title, an ungrammatical frame, two right answers on a card,
   a word above band, a picture a child names differently, a sentence that fits two signs). Generator-level items
   (layout, box counts, pea pod, legends, riddle construction) are already fixed — skip them.

## Rules (unchanged)
No NBSP / soft hyphen / zero-width characters · instructions one sentence, ≤150 chars, naming only drawn apparatus ·
titles ≤70 chars, unique in the band, no worksheet word, no free-claim · refuse rather than pad (declare under
`refusals` with a reason) · open every picture you pin · skills.short stays as is unless you change a family's
title (then keep every deck's meta description 120-170).

## Hand back (≤150 words)
The validator line, what you changed per item, any new refusal with its reason, and anything you could not fix.
