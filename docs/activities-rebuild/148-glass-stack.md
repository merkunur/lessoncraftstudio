# #148 — Comet's Big Leaps → THE GLASS STACK (2.NBT.B.8; all 11 locales)

ORDER row 148 · id `comet-kangaroo.tens-hundreds.2-nbt-b-8` (kept). Design: `designs/148-comet-kangaroo.md`.

## The invention
- **The numbers 0–999 live in a stack of ten glass hundred-charts.**
  - On a sheet, the row is the tens digit and the column is the ones digit; the sheet is the hundreds digit.
  - So each digit is a direction: one more is a step right, ten more a step down, a hundred more the very same square one sheet deeper.
  - Off the bottom row of a sheet Comet lands on the top row of the next sheet: 296 + 10 = 306. Crossing a hundred is a place the child can see.
- **The child types where Comet will land BEFORE she leaps.**
  - A wrong number plants a flag on the square where THAT number lives, and the axis it is off on is the diagnosis.
  - 258 for 247 + 10 stands one square right of Comet on 257: the ones digit moved when it should have stayed. The never-carry 206 for 296 + 10 stands a whole sheet higher (a pin on the spine).
- **Miss 1:**
  - the axis the leap moves along lights;
  - the start's row and column digits stand beside the sheet;
  - a hint names the kind of slip (hintAxis / hintEdge / hintRowEnd / hintTrail / hintFar / hintNoSheet).
  - On frosted glass the landing square carries no number. The child still has to work out the number from where the flag sits relative to Comet.
- **Miss 2:** Comet goes back to the start, and a move pad (↑ ← → ↓, one sheet deeper, one sheet up) lets the child move her step by step and read off the landing. She can never leave the stack.
- **Faces:**
  - 1 and 10 (one sheet: 47 + 10 … 64 − 1, two row wraps);
  - 10 and 100 (default: the old nine plus 296 + 10 and 602 − 10, banded);
  - arrow trails (follow the arrows; the mystery square two arrows both reach; how far down and right, typed in two one-digit boxes).
- **Glass:** frosted (default) or clear (every number shows: the supported mode).

## Files and wiring
- **New files:**
  - `mini tools/glass-stack-core.js` (`GlassStackCore`): the three tables, addr / step / trail / howFar / offset, isWrap, typing, check (plants the flag, the leap once, miss 2 sends Comet home), literal hint keys, move / dive (help only, never off the stack), the plan (banded, two wraps never back to back, never the same order twice).
  - `glass-stack-activity.js` (`GlassStackActivity`, prefix `gk-`, `apparatusClasses: ['gk-art']`).
  - `glass-stack-activity.html`.
- **Manifest:**
  - The row stays in `comet-kangaroo-activities.json`; en..nl slug, title and intro are frozen.
  - `tool` → `glass-stack-activity`; params mirror the core tables.
  - sv/da/no/fi get a new slug, title and intro: åk 3 / 2. klasse / 3. trinn / 2. luokka.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.892 → 9.893.
- **Prose ×11:** rewritten. It quotes 247 + 10 = 257, the 258 slip, 296 + 10 = 306 and the never-carry 206.
- **Layout at 320 px:**
  - The sheet shrinks to 20 px squares.
  - The spine labels shorten to 16 px.
  - The move pad fits six 44 px buttons in a row.
  - At miss 2, the strip above the sheet that holds the digit chips is given back, because no chip is drawn there.
  - Check stays above the fold in every locale.
- **Deviations from the design:**
  - Diving and rising are on the move pad, not on the spine edges. The spine is a label strip, so 44 px spine buttons would push Check off a phone.
  - Comet's token shows the square's number in white when that square is cleared, so it never hides the start.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **The landing was spoken aloud after a miss (all 11).**
  - `aLanded` said "Comet landed on 257", and the sheet's label named the same square. A screen-reader user heard the answer before the retry.
  - Both now name only the flag ("Comet leapt. Your flag is on 248."). The gate checks it, and two new mutations prove the check can fail.
- **"Only that digit changes" had nothing in the sentence to refer to.** It now says "only one digit changes" ×11.
- **sv/da/no/fi prose called 206 the "ten-crossing" slip.** 296 + 10 crosses a hundred: it is now hundratalsövergång / hundredovergang / hundreovergang / sadan ylitys.
- **Grade:**
  - sv: 0–1000 is åk 3 in Sweden, so the title, slug and prose now say åk 3.
  - no: LK20 has no "2. trinn" aim for three-digit place value. It is now 3. trinn, "kompetansemål etter 4. trinn".
  - da (2. klasse) and fi (2. luokka) stay.
- **sv:** the instruction's word order ("titta sedan när hon hoppar").
- **nl:** "eencijfer" is not a word; it is now "het cijfer van de eenheden".
- **da:** "være blevet stående", "trecifrede", "klassetrin", "tidtagning", and the word order "se hende så hoppe".
- **fi:**
  - the case of "lisää … lukuun";
  - "yhden lasilevyn syvemmälle";
  - the 247 sentence;
  - the flag sentence.
- **de:** "sie" for Komet; "Fähnchen" everywhere.
- **fr:** "pointent vers"; "grilles de 100"; hintAxis names Comète.
- **pt:** "bandeirinha"; "mova a Cometa".
- **it:** a sheet of glass is a "lastra", everywhere.
- **en:** "the answer that forgets the carry".

## Gates
- **`verify-glass-stack-core.js`: 6,361 checks, 0 fail.** Its own tables re-solved by arithmetic; the geometry checked for every square and direction; every mystery has exactly one square; the bots of §6 at their measured scores; the plan; picture, strings ×11 (the spoken line never names the landing), prose ×11, manifest.
- **`mutate-glass-stack.js`: 35/35 killed**, control passes. The first run left four survivors, and each was a gap closed by an exact check, never a looser one:
  - a near-miss of ±1 was never typed;
  - the off-the-stack test never reached an edge;
  - the swapped how-far case was never typed;
  - "never the same order twice" was only sampled; a replayed random stream now proves it.
- **`local-test-glass-stack.js`: 8,547 pass, 0 fail** — real pointer, 11 locales, every round × rest / miss 2 / solved × 320…1366.
- **`visual-qa-activity`:** 264 / 264 (11 rounds × 4 phases × 6 viewports), phase driver `visual-qa-phases/comet-kangaroo.tens-hundreds.2-nbt-b-8.js`.
- **`audit-activity-hierarchy`:** 398 / 0.
- **`audit-settings-efficacy --tool=glass-stack-activity`:** both settings live.
- **Other gates:** next-delay, content ×11, prose claims, SERP, content tells and route preflight all pass.
- I read the 360 / 768 / 1024 renders myself (flagged, over-the-edge, miss 2).

## Live
Deployed 2026-10-28 (commit `6b8bf6a2`; mini-tools and the manifest copied before `deploy.sh`; preview scp'd). `live-verify-glass-stack.js`: **68 pass, 0 fail** (all 11 pages 200; en, de, sv, fi × 1366 / 390 played with a real pointer). The first two runs caught Cloudflare's 5-minute cached copy of the old page, not a defect.
