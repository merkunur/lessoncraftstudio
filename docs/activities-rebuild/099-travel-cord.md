# #99 — The Faraway Shelf → THE TRAVELLING CORD (1.MD.A.1, all 11 locales)

ORDER row 99 · id `seriation.compare-length.1-md-a-1` (kept). Design: `designs/099-seriation.md`.

## Files and wiring
- **New files:**
  - `mini tools/travel-cord-core.js`: the round tables, the tags (length vs the cord, never anything drawn), the layout shuffle (place balance, close calls, illusion and trap rounds), the geometry in units, measure / choose / place / Check / hint, and the plan.
  - `travel-cord-activity.js`
  - `travel-cord-activity.html`
  - CSS prefix `tc-`.
- **Manifest:**
  - The row left `seriation-activities.json` (now `[]`, as the design says) for its own `travel-cord-activities.json`, which is registered in `frontend/lib/activities.ts` `MANIFEST_FILES`.
  - Metadata is frozen in the 8 shipped locales (sha1 `5a51047e`, checked).
  - da / no / fi slug, title and intro are new, as the design says. They were reviewed, and three wording fixes were applied:
    - da: *sammenlign-laengder-med-en-snor-1-klasse* — "Tillys bånd — sammenlign længder med en snor (1. klasse)";
    - no: *sammenlign-lengder-med-en-snor-1-trinn* — "Tillys bånd — sammenlign lengder med en snor (1. trinn)";
    - fi: *vertaa-pituuksia-narulla-1-luokka* — "Tillyn nauhat — vertaa pituuksia narulla (1. luokka)".
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.841. The existing strand overrides (it / nl / sv) are unchanged.
- **Legacy gate:** `local-test-seriation.js` steps aside with a pointer. The old seriation files stay on disk, unused.
- **Pictures** (opened):
  - Tilly is `pets/cat`.
  - Tall things are `christmas/candle` and `kitchen tools/bottle`, all library pictures.
- **Sources** (all in the scratchpad):
  - `tc-strings.json` + `tc-ribbon.json` + `tc-apply.js`, `tc-manifest.js`
  - `tc-prose.json` + `tc-fr.js`
  - `tc-desc.txt` + `tc-dump.js` → `tc-dump.md` (the reviewer's text)
  - `tc-review-fix.js`, `tc-gate-hand.js`, `tc-probe.js`

## The invention
**The ribbons live in places that can never meet, so the same cord travels to each one and leaves a tag.**
- **The wall:** one ribbon hangs from a hook, one lies on a high shelf, one lies on the counter, each starting at its own pin.
- **The cord:** always 6 units, with a brass clip and a knot. The child either taps the basket and then a ribbon, or drags the cord from the basket to the ribbon's start (dropped on the ribbon itself, the clip slides to its start).
- **Measuring:** the cord lies along the ribbon from its pin, and a tag appears. The tag is a pictogram, a teal bar over a ribbon-coloured bar: shorter / as long / longer.
- **Tall things:** three copies of one picture stand on a stool, a box and a high shelf. The cord is held upright from each one's foot.
- **The success reveal:**
  - Ribbons: the three lie side by side from one pin, shortest first, with the cord beneath.
  - Tall things: the stands fade and all three stand on the floor, with a dashed line at the cord's height and the cord at the edge.
  - Tilly hops.
- **No numbers anywhere on the stage** (gated).

## Rounds
| Face | Rounds |
|---|---|
| Ribbons · mixed | 21: 7 longest, 7 shortest, 7 as long. 9 are close calls (answer and rival 1 unit apart, one hanging, one flat); 3 are illusion rounds that keep their places |
| Ribbons · order | 7 (one shorter, one as long, one longer) |
| Tall things · mixed | 9 (candle or bottle, heights 3–9); T4 and T8 are traps |
| Tall things · order | 7 |

- The cord is 6 units in every round, which is the frozen intro's promise. Every question is decidable from the three tags alone.
- **Positions** (gated over 300 showings):
  - the answer is on the hook / shelf / counter 28–39 % each;
  - it is the rightmost end ≤ 40 %;
  - in tall rounds it has the highest top ≤ 50 %.
  - The close-call hanging is weighted (the answer hangs a quarter of the time), because a uniform choice put the answer on the hook 44 %.
- The plan is an order-only reshuffle and never repeats the previous pass. One question is never asked three times in a row.

## Deviations from the design (each measured, not chosen)
- **The bottle replaces the sunflower.**
  - The sunflower's ink is about 0.7× as wide as it is tall, so two big ones overlapped on a phone. And the smallest copy has to be ≥ 64 px at 320 px.
  - The bottle (0.41) is narrow, and it has the same grammatical gender as the candle in every gendered locale (de f, fr f, es f, it f, pt f, nl *de*). So the tall sentences need no per-picture variants.
- **Trap rounds T4 / T8 re-derived:**
  - The gate showed that the design's 9/6/5 and 9/7/4 were not traps for the stand heights used: judging by the tops gave the right answer.
  - Now T4 is 9/5/6, where the 6 on the high shelf reaches highest. T8 is 8/6/5, where the shortest stands on the high shelf and reaches highest.
  - The gate checks both kinds: the highest top is not the tallest, and the lowest top is not the shortest.
- **Stands lowered** to 0.8 / 2 / 4, the tall wall narrowed to 13 units, and on narrow screens Check moved into Tilly's row. This keeps the 320 px fold with the order rail; the traps were re-checked.
- **The cord is required:** see the review.
- **Render reads after the gates:**
  - A hanging ribbon with a start offset floated below its hook. A thin hanger thread now runs from the hook to its start pin.
  - The first full local test found that order rounds at 1024/1366 put Check below the 900 px fold (441 failures, all that class). On wide screens Tilly, the basket and the rail now share one row.
  - The tall reveal: the stands fade and the cord moves to the wall's edge.
  - A placed ribbon on the rail is marked with a dashed outline, not a white wash.

## Feedback
- **Check before the cord has been to all three:** hintTagFirst(Tall), no miss. This applies even when the right answer is already chosen.
- **All three tags but nothing chosen:** hintNone(Tall). **Rail not full:** hintFill.
- **Miss 1:** hintLong / hintShort / hintSame / hintOrder (+Tall), and the chosen thing's tag pulses.
- **Miss 2:**
  - Ribbons: the three tags line up in the middle of the wall (shorter, as long, longer), and the note says hintTags2.
  - Tall things: hintTags2Tall.
- **No hint names a thing, a colour or a number** (gated).
- **Success:** okLong / okShort / okSame with the locale's ribbon phrase (authored per colour, never assembled). okOrder names the three ribbons, shortest first. Tall things have their own sentences.

## Review (one reviewer, all 11 locales; every finding fixed at the source)
- **Pedagogy (the most important):** the cord was never required. A correct answer chosen by eye was accepted in rounds like 10/6/2, which skipped the indirect comparison the standard is about. Check now first requires all three tags (no miss). The prose about "the cord travels by itself after a miss" was rewritten in all 11 locales.
- **MUST:**
  - fr prose said *s'allonge* ("gets longer"), the misconception itself. It is now *se pose*.
  - fr tag notes had a hard-coded colon with no space. The note is now a per-locale `tagNote`.
  - es / it / pt hintFill was masculine for feminine things.
  - it "qual è".
  - nl "langs elk" / "de ene die".
  - da "er på steder, der aldrig mødes".
- **Tall comparatives:** de *größer / kleiner* and fr *plus grande / plus petite*. *Höher* and *plus haute* collide with "stands higher", which is the trap.
- **Nordic:** tall phrases became *tingen / saken på …*.
- **Second miss in tall mode:** gets its own hint.
- **Native fixes:**
  - da / no / fi: the new intros.
  - es: *banquito*, *colgado del gancho*.
  - it: "lungo come lo spago", *gradini*.
  - fi: *askelma*, place phrases, "alareunasta".
  - de: aria place phrases.
  - sv: "detsamma".
  - nl: hint and prose wording.
  - en: prose wording and the labels match the UI.

## Gates
- `verify-travel-cord-core.js` 2,334/0 (its own oracle and tables typed literally).
- `mutate-travel-cord.js` 18/18 killed, control survived.
- `local-test-travel-cord.js`: real taps and drags, 11 locales, every round at rest / miss 2 / solved, resized 320–1366.
  - The second full run gave 53,427 pass. Its only failures (132) were Swedish *Kontrollera* overflowing the 320 px tray row; Check now shrinks to its text.
  - Then 18,711/0 at 320/360/412 in all 11 locales.
  - Poisoned: oversized Check text gives 63 failures; the 320 px Check gives 0 once fixed.
- `visual-qa-activity.js` 126/126.
- `audit-activity-hierarchy.js` 332/0.
- `audit-settings-efficacy.js --tool=travel-cord-activity`: 2 live (question, things).
- `preflight-activity-routes`, `verify-activity-prose-claims` and `verify-activity-serp-copy` all pass.
- `live-verify-travel-cord.js` 75/0 on production (2026-10-24): all 11 locale pages 200 (da / no / fi new); en, de, sv, fi × 1366 and 390 played by real pointer (basket, red → longer; the cord to blue and green; blue → a miss; red → okLong). Wrapper 9.841. Tilly loads, and the iframe grows with the card. The first run hit the deploy window on the new fi page; the rerun was clean.

## Frozen metadata flags (not edited — landing / metadata rule)
- The nl / it / pt intros describe the OLD activity:
  - nl "allemaal vanaf dezelfde rand", "bovenaan een touwtje";
  - it "uno sopra l'altro", "una linea tratteggiata", "Nove situazioni";
  - pt "todas começando no mesmo ponto", "um tracinho".
- The it / fr intros use straight apostrophes.
- The en intro says "tap the longest … or the one that is just as long as the cord"; order and tall things are not mentioned.
