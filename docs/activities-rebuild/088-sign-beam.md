# #88 — Numbers Court → THE EQUAL-SIGN BEAM (1.OA.D.7 + make-it-balance, all 11 locales)

ORDER row 88 · id `numbers-court.judge-balance.1-oa-d-7` (kept). Design: `designs/088-numbers-court.md`.

## Files and wiring
- **New files:**
  - `mini tools/sign-beam-core.js`: True or false (12 + 12 claims) and Make it balance (8 + 10 blanks); the stamps, the gavel, the seal, the repair dial and its range, turning the court, the evidence, the geometry.
  - `sign-beam-activity.js`
  - `sign-beam-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `sb-`.
- **Pictures:** `pets/tortoise` (Judge Tess) and 12 witnesses that rotate per round: fox, raccoon, squirrel, mouse, hedgehog, badger, beaver, owl and rabbit (forest creatures), hamster and parrot (pets), goat (farm animals). All are labelled colour library pictures, opened before use. Tess faces right, toward the claim, and the witnesses face left.
- **Manifest:**
  - The row STAYS in `numbers-court-activities.json`. The design proposed a new `sign-beam-activities.json`, but rows 83–87 keep their own json and repoint `tool`, so nothing new needs registering.
  - `params` mirrors the core.
  - en/de/fr/es/pt/it/nl/sv slug, title and intro are frozen (sha1 `a9d4a72b…`, checked).
  - da/no/fi metadata is new and was reviewed.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.829.
- **Legacy gates:** `verify-judge-balance-core.js` and `local-test-numbers-court.js` exit 0 with a pointer. `judge-balance-core.js` is left untouched.
- **Sources:** scratchpad `sb-manifest.js`, `sb-meta.json`, `sb-prose.json`, `sb-dump.md` (the reviewer's text), `sb-fix1.js`, `sb-fr.js`, `sb-probe.js`.

## The invention
**The equal sign is the balance.** Its top bar is a fixed level; its bottom bar is the beam, pivoting under it. Both sides of the claim hang as numbered crates in two pans.
- **Equal sides:** the bars lie parallel and read "=".
- **Unequal sides:** the light end rises until it touches the top bar, and the two bars form a "<" or ">" that opens toward the bigger side.
- **The court seal:** a red seal over the pivot holds the beam until the Judge's ruling is right. The child stamps = or ≠ and bangs the gavel, and only a RIGHT ruling breaks the seal. A wrong ruling never moves the beam, so no direction leaks before the verdict.
- **Miss 1:** the pans pour their amounts as dots. A subtraction pours its first number with the taken-away dots crossed out.
- **Miss 2:** threads pair the dots one to one, and the spare dot glows.
- **A caught false claim** is repaired on a gold crate with a − / + dial.
- **Make it balance** starts with a blank gold crate.
- **After a true claim,** "Turn the court round" writes it the other way and the sign stays "=".

## Rulings this build made
- **The dial lives in the controls row,** and the crate it sets glows gold on the pan. Buttons hanging under a swinging pan would move under the finger.
- **Free play ("Court practice") is not built,** as at #86.
- **A subtraction never goes to 0 or below.** The gate found the dial could make "8 − 16"; each crate's dial now runs only within its own subtraction (`range()`).
- **Reviewer fixes, applied at the source:**
  - **Pedagogy:**
    - On a crate that is TAKEN AWAY (8 − □, 14 − □, 20 − □; also "To 20" #10, 7 + 7 = 20 − □), "make it lighter" means a BIGGER number. Those crates now get their own hints, "takes away too little / too much" (`hTakeMore` / `hTakeLess`) ×11.
    - A how-to line for Make it balance, which has no stamp, ×11.
  - **English source:**
    - "fair" became "true" in the task line, the success lines and the repair hint, so the words match the stamps.
    - "the gold edge" became "the gold crate" (×11).
    - "Does every dot have a partner — or not?"
  - **Native fixes:**
    - de: imperative "Stemple"; "flach liegt"
    - nl: "grotere kant"
    - da: "Op til 10/20"
    - sv: "fram till domen"
    - es: campo formativo; "uno a uno"
    - it: "il segno uguale stesso"
    - fi: "kummallakin puolella on {n}"; "lasku" not "yhtälö"; the new intro names OPS 2014
  - **Rejected, after measurement:**
    - "To 20 is 8 true / 4 false" is wrong: it is 7 / 5, as designed, and gated.
    - "Add a grade to the no title" is rejected under the #84 ruling.
- **FAST test seam:** after a caught claim or a tip, the shown beam stays until the next stamp or dial move (in real play it re-seals after 2.2 s / 1.4 s). The busy flag is never set in FAST, which had left the controls disabled.

## Gates
| Gate | Result |
|---|---|
| verify-sign-beam-core (own oracle: the design's tables as text, re-read and evaluated; 7/5 per level, answer-last ≤ 2, a turn-around, ≥ 3 subtractions, false off by 1; EVERY repair and blank brute-forced: exactly one value balances, the design's; blanks never the other side's total, 50/50 sides, every crate position; the beam geometry at 11 widths (the light end touches the top bar); a wrong ruling never releases (every round, both stamps); EVERY dial value of every repair/blank: flat iff right, the heavy/light/take-away hint, the dots, the dashed gold crate; the dial range; the plan over 10 000 seeds; the pictures) | 3,481 / 0 |
| mutate-sign-beam | 19 / 19 killed, control survives |
| local-test-sign-beam (11 locales; real clicks on stamps, gavel, dial and turn chip, Enter / G / ↑; every round of both modes and levels at rest, at the second miss / tip and solved, each state reached ONCE then resized through 320–1366) | 63,525 / 0 |
| visual-qa | 72 renders green |
| hierarchy | 398 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- **it intro:** "Senza registrazione, direttamente nel browser" is a no-sign-up claim.
- **Out-of-pool examples:** the sv and it intros use "8 = 5 + 3" (and it also "1 + 9 = 9 + 1"), claims the game never asks. They are harmless.
- **nl:** the intro names the judge "Rechter Roos" (she is Tess). The title "Het Getallengerecht" differs from the on-screen "De rekenrechtbank".
- **en title:** "Is the Equation Fair?" uses fair/true wording that the activity no longer uses.
- None of these were changed, because they are frozen metadata. The grade overrides (es 2, pt 3, it 2, nl 2) were set by earlier native panels and are untouched.
