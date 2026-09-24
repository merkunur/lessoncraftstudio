# AUDIT — en (round 2, regenerated dump)

VERDICT: 0 ERRORS, 1 MINOR

## Round-1 fixes verified as landed

- **M1 Oxford comma** ✓ — lines 10–13 now read `Circle/Put a square around/Cross out/Count all the dogs, apples, and cats`. Pair lists correctly remain comma-free ("cats and stars").
- **M2 above↔on-top-of exclusion** ✓ — every `[above]` block (all 12 landmark sets, lines 86, 119, 152, 185, 218, 251, 284, 317, 350, 383, 416, 449, 482) now offers `above / in / under`. Reverse direction re-checked: every `[on top of]` block offers `on top of / in / under` — "above" never appears as its distractor. The confusable pair is fully separated in both directions.
- **M4 title** ✓ — prepositions STRINGS_ALL en title is now `"Preposition Practice"`.
- **M5 warning tense** ✓ — line 630: `…cannot be used as landmarks in this language and have been replaced with basic shapes.` Correct.

## New content since round 1 (checked, clean)

- `[it-s-impura-masc]` block (lines 26–29): "Circle all the ostriches" etc. — grammatical, natural, correct plural.
- `[custom-boiled-egg]` landmark set (lines 455–486): "the boiled egg" / "between the boiled eggs" — all frames grammatical; typed answers and tap options consistent with the other sets.

## Remaining MINOR (accepted by coordinator, restated for the record)

### M3 (carried) — "in" + non-container custom landmarks
`{img} is in the cat.` (line 325), `in the tulip` (391), `in the elephant` (424), and now also `in the boiled egg` (457). Grammatical but semantically implausible — the picture cannot honestly depict containment in an animal/flower/egg. Flagged to the operator as content; no engine change requested. Note the new boiled-egg set adds a fourth instance of the same class.

## OK-NOTES (accepted as-is; no regression)

- Button-label capitalization remains mixed (Title Case "Check Answers"/"Try Again"/"Do Another" vs. sentence case "Print my worksheet"/"Mute sounds"/"Turn sounds on") — coordinator accepted; unchanged from round 1.
- Mute/unmute asymmetry ("Mute sounds" / "Turn sounds on") — unchanged, acceptable.
- All other EN static strings (letter-spotting template, generic fallback, I Spy headers, SR_Q_PREFIX, prepositions headers, SR templates, score strings) re-read: unchanged and clean. No regressions introduced by the round-2 edits.
