# #111 — Add the Magic e → THE REACH-BACK e (RF.1.3; en only)

ORDER row 111 · id `cvc-builder.build-magic-e.rf-1-3-silent-e` (kept). Design: `designs/111-cvc-builder.md`.

## Files and wiring
- **New files:**
  - `mini tools/reach-back-e-core.js` holds the model:
    - the rounds are typed (18 Finish words in two sets, 9 Read rounds);
    - the arm geometry, the vowel's face, Check, kinds, hints, the badge and the plan.
  - `reach-back-e-activity.js` draws the washing line, the picture with its vowel badge, the wooden rail (letter sockets, the vowel socket, the end socket with its groove), the e's wire arm, the coin-flip vowel tiles, the tray and the Read pictures. It owns taps, drags and the keyboard (CSS prefix `rb-`).
  - `reach-back-e-activity.html`.
- **Manifest:** the row stays in `cvc-builder-activities.json`, edited surgically inside this row only; the other rows are proven unchanged.
  - `tool` is now `reach-back-e-activity`, `task_template` is `reach-back-e`, and the params are `clue` / `vowel` / `rounds` / `sets`.
  - en slug, title and intro are frozen. **No locale is added** (§6 of the design: the final-e rule is English).
  - With rows 110 and 111 both rebuilt, `cvc-builder-activity.*` / `cvc-builder-core.js` serve no row any more. They are left in place; removal is a separate operator step.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.855.
- **Prose:** en replaced.
- **Strings:** en only (42 keys); the shell falls back to en.
- **Sources** (scratchpad): `rb-strings.js` → `rb-apply.js`; `rb-prose.js`; `rb-manifest.js`; `rb-review-fix.js`; `rb-sheet.js` (contact sheet).

## The invention
**The silent e has an arm.**
- Drop it in the end socket and its wire arm swings back over exactly ONE letter and taps the vowel. The vowel tile flips like a coin from its teal short face to its gold name face (with a crown).
- Take the e away and the vowel flips back.
- With the e on and no vowel yet, the arm's hand waits over the empty socket; the flip happens the moment a vowel arrives.
- The arm's reach IS the rule.

**The rounds.**
- **Four rounds in nine are short-vowel pictures** (cap, hat, pig, mop / pot, cup, van, pen): an e there makes the word stop naming the picture.
- *cap*, *cape* and *cup* share the same rail (c _ p), so only the picture decides.
- Finished words hang on a washing line, short (teal) and long (gold) side by side.

**Clues:**
- Finish the word (default).
- Read and find: the word arrives built; tap the e to replay its reach; tap the picture it names.

**Vowel setting:** Pick the vowel (default) · Vowel given (the vowel seated; the tray is the e plus a decoy consonant, so it is never a single "tap me" tile).

## Deviations from the design (each measured or ruled)
- **Pictures checked by eye** on a contact sheet: `around-the-house/pen` is a PENCIL, so the pen is `classroom/pen`.
- **Review rulings:**
  - kite's decoy vowel a → u ("Kate");
  - van's decoy e → u (two e tiles in one tray, and *vane* is a word).
  - pen keeps two e tiles (its vowel is e); the render shows them clearly apart (a teal coin, a silver tile with its folded arm).
- **No "two vowels stay bright" help:** the tray only ever holds two vowels, so dimming "all but two" dimmed nothing. Miss 2 on a wrong vowel now says "Say the name slowly. Listen for the middle sound."
- **The nudge** ("Drop the e on the end and watch its arm!") shows on the first Finish round and is retired by the child's first move or Check.
- **Not built:** Free play (the open seven-socket rail), the consonant wobble when the arm falls short (no round can produce it), TTS of each letter.

## Review
ONE native-English + Grade-1 phonics reviewer over the compact dump.
- **Confirmed:**
  - every VCe word is a true long vowel (cube's u says its name, /juː/), and every short word a true US short vowel;
  - no soft c/g and no r-control;
  - one right answer per rail, ruled by the picture (cop/cope, mope, hate, pine, whole, cuke all excluded);
  - Read rounds each have exactly one matching picture with fair neighbours;
  - no digit, no "free", no feature claimed that does not exist.
- **MUST, applied:**
  - the van tray (two e tiles + *vane*) → decoy u;
  - the vacuous hintVowel2 → a real listening hint, with the dead dimming removed.
- **SHOULD, applied:**
  - kite decoy u;
  - hintRead2 "Is there an e on the end? Its arm reaches back, and the vowel says its name.";
  - okE "Add the e: {word}! …" (the old "{base} + e" printed non-words like *whal* and read as maths).
- **Frozen landing intro (not editable):** it still says "the base word is already started … tap the magic e". The activity now has the child pick the vowel and leave the e off four words in nine.

## Gates
- `verify-reach-back-e-core.js` — 2,390 checks against its own hand-typed table (word → vowel, takes the e). It covers:
  - the words: 5 / 4 per set, the vowel and the e-flag, pictures on disk in colour themes, refused words and the pencil absent;
  - the arm: the hand lands on the vowel socket, over one letter, in every rail; the name face only with the e on and a vowel seated;
  - every vowel × end (none / e / decoy) of every round against the table; kinds and hints; no badge at rest or at miss 1, the right badge face at miss 2; a new move takes the help away;
  - the tray in both modes;
  - Read and find: exactly one matching picture, in the plan's slot;
  - the plan: fresh order, sets alternate, e answer never three running, e slot and Read slot 3/3/3 never three running, right vowel first in 4 or 5 of nine;
  - the strings (en only, no digit in a hint, never "free", every key asked for).
- `mutate-reach-back-e.js` — 17 / 17 killed, control survived.
- `local-test-reach-back-e.js` — 3,004 checks with real taps, drags and keys:
  - the scenarios above;
  - every Finish round of both sets and every Read round at rest, at miss 2 and solved, through 320…1366;
  - the arm's hand measured over the vowel socket and never reaching into the picture.
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 272 / 0 · `audit-settings-efficacy` (clue, vowel live) · preflight-activity-routes · prose-claims · SERP copy · activity-content en — all green. 0 lines to shared cores or lcs-shell.

- `live-verify-reach-back-e.js` on production: 17 / 0 on 9.855. The en page returns 200. At 1366 and 390 with real taps: cap with a + the e → hintExtra and the end socket rings; the e tapped off → okNoE and a tag on the washing line; kite with i + the e → the arm taps the i and it shows its gold name face → okE. The iframe grows with the card.
