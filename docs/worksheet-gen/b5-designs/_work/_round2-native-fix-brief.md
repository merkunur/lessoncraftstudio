# nt10-E — native fix round 2 (one fixer per locale)

Your locale's landing panel re-read every page after fix round 1. Two generator rounds have since fixed every
LAYOUT tell (strip orders, box counts, sign order, tag order, K-374 now FOUR steps: stop · look left · look right ·
walk when clear, K-375 numbered words + bearded grandpa, G1-383 square riddles never offer "rectangle", G3-392 inset
without roots, G1-395 tired face, French typography at render). What is left for YOU is DATA and STRINGS.

## Edit ONE file
`scripts/worksheet-gen/i18n/.draft-b5-<loc>.json` only. Never run apply-b5-locale (the coordinator applies locales
one at a time); edit no other file; no git. Check with `node scripts/worksheet-gen/tools/validate-b5-draft.js <loc>`
→ `0 error(s)`. Render changed pages from the draft (see the validator's temp-dir mechanism) and READ them.

## Your work list
Read your landing panel's CURRENT findings: `scripts/worksheet-gen/out/b5-findings-<loc>-r2.txt` (en/de/es/pt/fr/it/
nl/sv) or `scripts/worksheet-gen/out/b5-findings-<loc>.txt` (da/no/fi). Fix every item that is a string or bank
defect in YOUR data, e.g.:
- a printed title naming the wrong grade or a suffix/letter-team no answer uses;
- a sentence that fits two options (a "said" frame taking two verbs; a sign situation fitting two signs);
- a word above band, archaic, regional or with a second meaning that makes a second right answer;
- a picture children will name with a word that lacks the target (pick another picture you have OPENED, or drop the item);
- an instruction naming apparatus not on the page, or promising something the page does not do;
- word-part families whose members are not transparent, or that repeat across sibling pages where a fresh family exists;
- a sign-table entry that is not your country's real sign (mark `unsure` rather than guess);
- an agent word that breaks the declared suffix rule (drop it or declare the suffix).
Skip generator-level items (already fixed) and anything the finding itself records as acceptable/by design.
K-374: make sure your instruction says 1 to 4 and names no card that is gone (the round-2 agent already updated the
banks + drafts — confirm).

## Rules (unchanged)
No NBSP / soft hyphen / zero-width · instructions one sentence ≤150 chars naming only drawn apparatus · titles
≤70 chars, band-unique, no worksheet word, no free-claim · refuse rather than pad (declare + reason) · if you change a
family's title or skill sentence, keep every deck's meta description 120-170.

## Hand back (≤150 words)
Validator line, what you changed (by id), anything you could not fix and why, any new refusal.
