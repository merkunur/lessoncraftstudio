---
name: project-calendar-wall-rebuild
description: "Calendar Wall (#7) rebuilt to the v4 bar 2026-08-07 — the calendar that did not show its dates, and the paywall that lied in both directions"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7a0d5148-864a-4ec0-8713-4a8718b22db7
  modified: 2026-08-06T22:23:26.227Z
---

**LIVE 2026-08-07, 11/11 locales.** `mini tools/calendar-wall.js` rebuilt from
1736 → ~3300 lines. Commits `8bd23768` → `0cb8523e` on
`pivot/printable-business-toolkit`. `TOOL_WRAPPER_VERSION` 7.74 → **7.75**;
`calendar-wall.js?v=4`.

## The defect it existed for
**It did not show its dates.** `:660` appended the numeral node only when the
cell was NOT a face-down `back` card, and `:1444` hid today's until flipped —
so on 4 August a 31-day month rendered **seven** numerals, five of them on
weekends. A teacher could not point at the eighteenth, which made the
commissioned feature (mark the class trip on it) literally unbuildable. Now
31/31, asserted on production. Second blocker: `_moveMonth` hard-returned past
the current month, so you could not open October in September.

## What shipped
Four event kinds (no-school / trip / birthday / special), 3 taps zero typing,
90-second teacher window, two-step confirm + a 20s Undo; a countdown showing
**sleeps AND school days at once** (the gap is the lesson; the no-school mark
is what makes them differ); the **school-day ordinal written into the cell**;
the pattern **inverted** (placed as each day arrives, indexed by ordinal not
day-of-month); a print sheet (there was none); forward navigation.

## Gates (all new or rewritten)
`verify-` (model, own ground truth, DST both ways, 9 years of matrices) ·
`mutate-` 12 poisons · `local-test-` 8 viewports **including 704** ·
`poison-calendar-wall-layout` 10 poisons · `smoke-` fresh browser per locale +
**key-asked-for recording** · `live-verify-` · `shoot-` ·
`apply-calendar-wall-locales` + `_calendar-wall-strings` SoT.

## ⭐⭐ The lessons that cost the most

**MY PAYWALL LIED IN BOTH DIRECTIONS, and all three native panels found it
independently by reading the model.** `historyVisible` is consulted at ONE call
site — the weather chart — so the count, the ordinals and every earlier
calendar month are free for everyone. The counter's gate line claimed
subscribers "keep the record"; the weather line claimed free users get only one
day when they get the whole month. **Telling a teacher she has LESS than she has
is worse than overselling — she can see it is false.** Gate line deleted, not
reworded, and the DoD assertion that REQUIRED it was inverted.

**`patternNext` PRINTED ITS OWN ANSWER** — "Which card comes tomorrow?" rendered
with tomorrow's card beside it. The recorded gateBody defect, in my own code.

**MEASURE AFTER THE LAST THING YOU DID.** Three layout defects, each invisible
to 40 green assertions and each found in a screenshot: `height:100%` resolved to
`auto` against the auto-height card (dock at 1302 in a 768 viewport); the fitter
ran **before the web fonts loaded** and was 7px short; capping height without
capping width gave a **133×49 spreadsheet row**.

**A SYNTHETIC `.click()` PROVES NOTHING ABOUT REACHABILITY.** The Undo chip was
unclickable twice — under the modal scrim, then below the fold — and my probe
reported success both times. Only the real-pointer run could tell.
⚠ Anchoring to `.lcs-app` is wrong whenever the card can be taller than the
window; that chip needed `position:fixed`.

**AN INERT POISON READS EXACTLY LIKE A HOLE IN THE GATE.** The print-sheet
poison "survived" twice because the sheet is genuinely double-locked and I broke
one lock at a time. Breaking both proves the assertion can fail; *needing* to
break both proves the lock is worth having.

**BAN-TOO-WIDE, TWICE, IN MY OWN RULES:** Italian `ora` is *hour* AND *now*; a
bare `points?` ban condemned **"the month your class can point at"** — the verb
the whole rebuild is about. Fix the pattern, never the example.

**A SHARED ORIGIN IS SHARED STATE when the tool remembers.** The shooter's seven
shots accumulated seven identical trips and it looked like an `eventsOn`
duplication bug.

Dead things the A15 recorder found: `weekendsChart` (a setting declared and
never read — it scored GREEN on the shared liveness gate because a drawer switch
flips `aria-checked` on itself), `--i` (the rebundle "gather" the docblock calls
*the celebration IS the mathematics* never gathered), `_hundredSvg` (ten straws
called one hundred, in the place-value widget), `cdCountTogether` (a string in 11
locales for a feature with **no control**), `flipAria`, `loading`, `patternOff`.

## Panel findings I could not have made
pt narrow weekdays are `S T Q Q S S D` — three S, two Q, unreadable · sv
`räkningen` = *the bill*, on a paywall line · da/no `tælle sammen` = *add up*, an
arithmetic inversion on the count-together button · the Dutch title
`Dagopening` is the name of the morning-circle ROUTINE and appeared in
`estimation-jar`'s own footer as "Hulpmiddelen voor de dagopening: Dagopening"
→ **Kalenderbord** (⚠ slug stays `dagopening`: §21.5a churn freeze + it is the
high-intent search term) · `Enseignant·e` is non-compliant with the French 2021
circular · and **one FALSE POSITIVE I would have wrongly "fixed"**: pt *virando
uma centena* is *turning INTO*, not flipping.

See [[feedback_native_panels_read_the_model]], [[feedback_verify_the_measurement_before_the_defect]],
[[feedback_never_replace_a_measured_constant_with_a_derived_one]].
