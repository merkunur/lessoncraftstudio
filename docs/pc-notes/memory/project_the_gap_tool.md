---
name: project_the_gap_tool
description: "TOOL #56 The Gap — REBUILT + SHIPPED 2026-08-16 (the-gap.js?v=2, wrapper 7.97); the shelf/counters/boards, a teacher can aim it. The rebuild sat uncommitted 5 days; live-verify was stale."
metadata: 
  node_type: memory
  type: project
  modified: 2026-08-16T14:37:48.172Z
  originSessionId: fee5578b-0df8-4e23-bef1-ec175c4922fe
---

**✅ SHIPPED 2026-08-16** — commit `b626bed9` (+ live-verify fix `3393b2cc`). The 2026-08-11 rebuild
sat UNCOMMITTED in the working tree for 5 days while #54/#55 were committed around it; a later session
found it and finished it. Deployed: `the-gap.js?v=1→2`, `TOOL_WRAPPER_VERSION 7.96→7.97`, thumbnail
regenerated + scp'd to both `/var/www/lcs-media/mini-tools/tool-previews/` and the repo `public/`.
Production `live-verify` = **PASS 47/0** (en/de/fi) + eyeballed 360/768/1024 (responsive fix holds, no
overflow, grips + contrast correct). **Copy shipped AS-IS** (operator call): the warm concrete
per-locale framing (marks/pebbles/marbles on the ground/floor/riverbank) is child-appropriate and the
design law bans words on the APPARATUS, not concrete framing in chrome; the header title was reconciled
to the child-facing **ground · marks · gap** (`crt-shelf`/`crt-mark`/`crt-board` stay as DOM names).

## ⭐⭐ live-verify was STALE — the rebuild updated `verify.js` but NOT `live-verify.js`
The classic "session ended mid-rebuild" gap. `live-verify-the-gap.js` was committed clean at the #56
ORIGINAL and had only ever run against the OLD live tool, so it carried three stale things that would
have failed the rebuilt tool: (1) `.crt-ground` → renamed `.crt-shelf` (0 occurrences now); (2) the
direction read off an aria-label on the baseline → the rebuild moved it to `api.announce` = the shell's
ONE polite live region `.lcs-sr-only[aria-live="polite"]`, read THERE; (3) it waited 320ms for the gap
but the rebuild keeps the marks in the DOM until **T_FALL=380ms** (the class watches them be covered),
then removes them + announces, run completing at T_FALL+T_PULSE=**1000ms**. **Forward rule: when a
rebuild renames DOM/moves a channel, grep EVERY gate for the old selector — live-verify is the one that
runs against prod and is easy to forget because it looks committed-and-green.**
- ⭐⭐ **THE NO-VERDICT CHECK MEASURED THE WRONG THING.** `live-verify` compared every `.crt-num`'s
  computed `color` and demanded one value — but the child's theory numeral `.crt-num.is-try` is a
  deliberate OUTLINE (`color:transparent` + `-webkit-text-stroke:#0E5147`), so it reads
  `rgba(0,0,0,0)` while the counted numerals are solid `#0E5147`. The tool's guarantee is "difference
  of KIND and NEVER of HUE"; the fix reads the **effective ink** (the stroke colour when the fill is
  transparent) and excludes `.crt-num-empty` spacers. Same shape as the memory's own gate lesson
  (empty slots are not numerals) — a naive `.crt-num` selector condemns a correct readout.

**REBUILT 2026-08-11** on operator verdict ("far from a premium teaching tool… no good, professional
and child-friendly visual design"). Both halves of that were correct. `the-gap` · prefix `crt-` ·
category `number` · CCSS 1.OA.D.8 · free-play. Rebuild in place: key, slug, `TOOL_KEYS` position and
all 7 registration points unchanged. Gates after: **verify 62,809 · probe 94,309 render checks · 0
failures**, both new gates poison-tested in both directions.

**THE SHELF · THE COUNTERS · THE BOARDS.** Two painted boards travel in from the frame edges and meet
over a shelf. Counters stay in the DOM WHILE the boards travel; `st` flips to `gap` only when they are
fully met, so the shelf empties with no visible change — the class watches them be covered instead of
watching them vanish. **Zero model lines**: one assignment moved inside the first timeout.

## ⭐⭐ The diagnosis, and why it had shipped
Commissioned rich ("THE CURTAIN"), cut down by three individually-reasonable rulings — the fence took
the imagery, an art panel took the ducks on a contrast measurement, the pedagogy panel struck the
claims — and what shipped was **the defensive skeleton left over. The commission's killer mechanic was
never built.**

- ⭐⭐ **THE TEACHER COULD NOT AIM IT.** Uniform deal from **57 scenes** (cap 10) / **183** (cap 16) →
  **40 presses for even odds**, 127 at sixteen. Nobody plans a lesson that way. Fixed with chevron
  grips; `again` now re-deals **the change** and KEEPS the start — which restores
  `classroomIdeas[2]` ("the same start twice, once arriving once leaving"), advertised in 11 locales
  and never performable.
- ⚠ **The deal was direction-biased**: 21 join vs 36 separate at the default cap (63% take-away),
  because `legal()` needs `n>=3` and `m>=1`. Nobody had counted.
- ⭐⭐ **The evidence failed the contrast floor it was built to respect** — pulse `#F2784B` on
  `#F6EAD3` = **2.33:1**. `the-queue.js:429` had already measured exactly that and moved to `#A34122`
  (5.28:1); this file contained `A34122` **zero times**.
- ⚠ **No responsive design at all** — two `@media` occurrences, both `print`, while the shell widens
  the card to 1800px. A 660px column of 34px dots is what the projector showed.

## Defects no gate could see
- ⭐⭐ **THE BLIND CHILD WAS NEVER TOLD THE DIRECTION.** It reached AT only as an `aria-label` on a
  NON-FOCUSED `role="img"` — browse-mode content, announces nothing. `api.announce` was called twice
  in the file and never for the direction. **A carefully-timed announcement nobody hears is worse than
  the leak it replaced.** → new `verify` L6b drives it BY BUTTON and asserts 0–40ms AFTER the marker,
  never before; poisoned both ways (silent → fires; 380ms early → fires).
- ⭐⭐ **Reduced motion silently dropped the evidence TONE**: `_dur(T_FALL)`=106ms < debounce 160ms.
  The lift tone at 280ms survived, so nothing looked broken.
- ⭐⭐ **`_clearTimers` cleaned a phantom** — read `this._wave` after the rename to `_marker`; the only
  reference in the file, a read with no write. Abandoning a run mid-pulse left the marker opaque
  carrying a direction into the next scene = **answer leak**. → **grep every renamed field for a WRITE
  site.**
- ⚠ **The header stated a law the code broke**: "must draw a before and an after at once" — `shown()`
  returns `n` OR `m`. **The printed sheet drew both. The paper was more faithful than the screen.**

## ⭐⭐ A FALSE CITATION IN OUR OWN HEADER PROPAGATED INTO A FRESH RULING
The header claimed "#55's free floor IS `5 + ? = 9` (`missing-question.js:609`)". Line 609 is a locale
string map; **`missing-question.js:149` refuses equations BY NAME**. A fence agent read the header and
repeated it, and it would have killed the rebuild's best feature. Measuring the whole shelf then found
the real owner — `part-whole-frame.js:1390` ships `line([W,'=',A,'+',B])` with `'?'` for covered values
— so the conclusion was right for a reason nobody had found. → [[feedback_a_doc_is_not_a_fact]]

## Gate lessons
- **Both stale gates were red on disk** (`verify:581`, `mutate:201`) because they named `.lcs-shell`,
  which is not a class. **The fix that made the tool correct is what turned its own gates red.**
- **A duplicate-selector sweep scoped only to "before the print block" condemns responsive CSS.**
  Scope to TOP-LEVEL rules; a selector re-declared inside `@media` is not a defect.
- **The empty readout slots are not numerals** — counting `.crt-num` including `.crt-num-empty`
  reported three readings in every phase and condemned a correct readout.
- **A sweep built on `again` can never leave the start it opened on** once `again` keeps the start; it
  reported "never exceeded 3 marks" rather than a defect. It climbs with the grips now.
- ⚠ **An SVG element's `className` is an `SVGAnimatedString`** — `.indexOf` is not a function. Use
  `classList`.
- ⚠ **Contact is not collision, and it is BOUNDED not exempted**: counters overlap the shelf 1px by
  design; allow-listing the pair would blind the check to a counter sunk halfway in.

## ⚠⚠ A CSS CASCADE BUG THAT BROKE A WHOLE SETTING
`_writeVars` wrote `--rowu` on `.crt-wrap`; the stylesheet declared `--rowu:13.02` on `.crt-stage`, a
**descendant**. A custom property set on the element itself beats the inherited one, so the JS value
never applied and **"up to sixteen" overflowed the frame by 88–271px at every viewport**. The fallback
must live on the element the script writes, or the default silently shadows the authority.

## Native panels, again the only review the English gets
- ⭐⭐ **9 English keys × 11 locales name "the ground", an apparatus the tool no longer has** (Italian
  relocated it to a riverbank). **STILL OPEN** — 99 strings, one pass or not at all.
- **"marks" is a scoring word in UK/IE/AU school English**, in a tool whose constitution bans scoring.
- **Ten of ten locales had already declined `run`'s verb** ("show") for *let it run / start it*. Ten
  translators independently refusing a verb is data about the SOURCE.
- **I violated my own brief in my own draft** — told them every accessible name must be a whole
  phrase, then wrote "Start with more". Finnish cannot render a bare elliptical comparative at all.
- `again` 30 chars (de) → max 18; it/nl over guidance with reasons (⚠ it *cambio* = the regrouping
  step in column arithmetic).

## Open / resolved (as of ship 2026-08-16)
- ✅ RESOLVED (decided, not done) — the ground→shelf / marks→counters copy pass: operator ruled
  **ship as-is**. The concrete per-locale copy stays; only the code header was reconciled. NOT a
  pending commission.
- ✅ RESOLVED — `audit-the-gap-locale-layout.js` present + committed; `audit-tool-print-sheets.js`
  the-gap entry present + committed.
- ✅ RESOLVED — deployed (version bumps + thumbnail).
- 🔸 DEFERRED nicety (not blocking, not commissioned): `instruction` is still the longest of any tool
  (~290 chars EN; `landing-strip` does it in 108). Would need an 11-locale touch → out of the
  ship-as-is scope. Fold into any future the-gap copy touch.
- 🔸 STILL OPEN (from the rebuild, unchanged): the "marks" scoring-word note (UK/IE/AU school
  English) and the per-locale surface drift (it *riva*/nl *stoep*/da *kastanjer*) — all deliberately
  kept per the ship-as-is copy decision; revisit only if a copy commission is opened.

See [[feedback_native_panels_read_the_model]] · [[feedback_verify_the_measurement_before_the_defect]] ·
[[project_missing_question_tool]]
