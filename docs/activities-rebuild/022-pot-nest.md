# #22 — Grandpa Pip's Nesting Pots → THE NESTING POTS (K.CC.C.7)

ORDER row 22 · id `nesting-pots.seriate.k-cc-c-7` · own files `pot-nest-core.js`, `pot-nest-activity.js`, `pot-nest-activity.html`, `pot-nest-activities.json` (`nesting-pots-activities.json` emptied to `[]`). The page title stays "Grandpa Pip's Nesting Pots" (metadata frozen en..nl; sv/da/no/fi slug, title and intro are new, grade 1).

## The skill
K.CC.C.7: compare written numerals 1–10 — here three or four at a time, put in order, biggest first.

## The apparatus and its invention: THE POT THAT GROWS TO ITS NUMBER
- A row of flowerpots, all the SAME size: only the painted numeral tells them apart, so the child cannot guess by looking. Colours go by place in the row, never by number.
- Tapped, a pot drops into the nest and grows to its true size (height and width grow with the number).
  - Smaller than the innermost pot: it settles inside.
  - Not smaller: it sticks out over the rim, wobbles and goes back (a bounce).
- A pot that fits but is not the next biggest leaves a dead end later (nothing left fits): the inside pot glows, and a tap lifts it back to its own place in the row.
- From two bounces (or the "always" setting) dots show on the waiting pots.
- Check:
  - empty nest → "find the biggest";
  - pots waiting → "some are still waiting" (dots hint from two bounces);
  - dead end → "take a pot out";
  - row empty → right, the nest read out: "9, 6, 4, 2: from the biggest number to the smallest!".
- #19–#21 compare two numbers; #22 orders three or four, and the numeral becomes a magnitude at the moment of comparison.
- Rounds:
  - up to 10: four pots ×9;
  - up to 5: three pots ×8, all distinct sets.
  - The row is never already in order.
  - The biggest pot stands in every place of the row.
  - No 0. The old two-digit round is gone (1–10).

## Layout
- Each pot step is k tall (wide 26, phones 20), and each rim band is ≤ k, so every rim and its numeral shows above the next pot in.
- Rim numerals are ≥ 14 px. Row pots are 84 px wide (wide) and ≤ 64 px (phones).

## Settings
Pots: three up to 5 / four up to 10 · Dots: only as a help / always.

## Gates
verify-pot-nest-core 420 (incl. [E] every number list in the prose is a real round) · mutate-pot-nest 22/22 · local-test 11 locales × 7 widths 1656/0 · visual-qa 54 · hierarchy 110/0 · settings-efficacy 2 live (`--tool=pot-nest-activity`) · preflight PASS · content ×11, prose-claims, SERP, tells PASS.

## Review (one reviewer)
MUST-FIX: "a pot only fits inside a bigger number" made the pot BE a number (all 11 locales, instruction + hintMore + the new sv/da/no/fi intros) → "inside a pot with a bigger number"; nl "het meeste stippen" → "de meeste stippen". Pedagogy: a bounce costs nothing, so a child can finish by trying pots — the prose no longer claims the numbers "have to be read" (now: "size gives nothing away … trying a pot shows at once whether it fits"); two bounces bring the dots. Also sv "på plats", da "på plads", fr "le pot extérieur / intérieur". Self-caught: the gate's `while (nest.length) lift()` spun forever once a round was done (bounded); a CSS filter on the rim dimmed the white numerals; phone rim numerals were 12 px (pot step 17 → 20); two to5 rounds were the same set (only ten sets of three exist in 1–5).
Grade (report only, metadata frozen): with the two-digit round gone, the reviewer reads fr "CP" and nl "groep 3" as a year high (GS / groep 2 would fit).
