---
name: project_sorting_hoops_rebuild
description: "Sorting Hoops rebuilt to the v4 bar 2026-08-06 — the operator's four complaints had eight causes, and ten native panels found the mat-wipe I had written that hour"
metadata: 
  node_type: memory
  type: project
  originSessionId: d58484d6-9e5b-42b5-8f99-9db273e9ec91
  modified: 2026-08-06T03:16:39.575Z
---

**LIVE 2026-08-06.** `sorting-hoops` (tool #30, a v3-catalog tool that had never been
through the v4 suite) rebuilt. `live-verify-sorting-hoops.js` = **253 assertions DRIVEN
on production, 11/11 locales**. Commits `80133a4c` + `88828e8d`.

## The four complaints had eight causes, and none matched its words

⭐⭐ **"no option to make rules for hoop 2" was not a missing option.** The picker
rendered ~987px down the page and NOTHING scrolled to it — measured at 1920×937,
1536×730 and 1366×650, all `scrollY 0`, entirely below the fold. The teacher clicked
and nothing visibly happened. ⚠ **I first measured this on the standalone `.html` and
concluded "physically unreachable", which was over-claimed** — the tools-page iframe is
content-driven and grows. Re-measuring on the surface teachers actually use corrected it.
On the standalone embed it *is* trapped (`overflow:hidden`, a real wheel moves nothing).

⭐⭐ **"the objects randomly disappear" had THREE causes.** Committing the second rule
re-dealt the tray and re-stamped every uid (1 in hoop A + 1 outside → 0 and 0). Four
dead hit-test bands totalling ~14% of the ring width, two exactly on the overlap
boundaries. And the release animation **had never once fired in production** — `_tile()`
compared a region string to a uid, and the 900ms timer was killed by the `render()` that
followed it.

⭐⭐ **The outside pile was POISONED.** Any mismatch wrote `'out'`, so a whale whose true
region was hoop B was filed OUTSIDE when dropped into hoop A. That pile is what a child
reads to deduce the rule. Found by the pedagogy panel; the tool's own header doctrine
*caused* it.

⭐⭐ **The hoops were painted 0.55 CSS PIXELS wide** at every viewport including 2560 —
`vector-effect:non-scaling-stroke` resolves stroke in viewport units, and the three wide
tiers ramped the mat, tiles, glyphs and every type size while never touching the stroke.
They also rendered at 2.51–2.87:1, not circles. Ring A was **byte-identical to block
blue**, one of the four colours the child sorts BY.

Also: Ctrl+P printed the paid sheet for anyone (chip gated, `@media print` not); both
hoops could take the identical rule; "Anything" set a rule that accepted **nothing**.

## ⭐⭐ The panels found seven model defects nine green gates did not — and the worst was mine

Ten three-person native panels, briefed to treat the English as a **source to audit** and
to **read the model**. Every finding reproduced before it was fixed.

- **`_startSorting` DELETED THE WHOLE MAT.** Sort the tray → "Change the rules" → "Start
  sorting": `_traySplits()` is false for an empty tray. Measured **12 → 0**. The
  operator's original complaint, reappearing inside its own fix, found independently by
  **es, de and fi**.
- **Every timed hint was cancelled by its own `render()`** — I put `_clearTimers()` at the
  head of render and then armed a 5s timer immediately before calling it, so the "rules
  changed" band was stuck on permanently. **That is the exact defect this commission was
  raised to fix, reproduced in the fix.** Found by `no`.
- `More things` went **silently dead** (32-block pool vs 12-tray) while painted primary
  and advertised by the hint band — the #39 defect again. Found by seven panels.
- The clear-arm **outlived its warning**, so a press ten minutes later wiped the mat.
- `hintSecret` claimed "not even you" on the hand-picked path — found by **all ten**.
- `refuseSameRule` said "already has that rule" when `pairOK` rejects on the same FIELD —
  found by **all ten**.
- `.hp-seg` was `overflow:hidden` with no wrap, so the mode chips **clipped at 320px and
  the overflow absorbed its own evidence**. Found by `it` reading the CSS.

**And six ONSET tables were phonologically wrong** in a tool whose second invention is the
multilingual phonological attribute: fr `g` spans /ʒ/ and /g/; es `b`/`v` are ONE sound;
it `sc`/`gl` each span two; sv `sk`/`k`/`g` each span two; **da's table was part
NORWEGIAN and had no bare `k`**, silently excluding *kat/ko/kage* from a FREE rule; fi was
missing **every vowel**, and Finnish alkuäänne teaching starts with the vowels.

## What it is now
A phase machine. The setup panel **replaces the mat**, so it appears where the teacher is
already looking. `Surprise me` draws a rule the tool never displays — **not even to the
teacher**, the only honest way to pick a secret in front of 25 children. Hit-testing is
the same ellipse equation that draws the picture. The refusal table distinguishes "not
where you put it" from "outside". A **302-card K-2 pool** (from 933; three curation
panels, five gates) replaced the tray that dealt *Dimetrodon, Parasaurolophus, Vacuum
Cleaner*. Syllable values are computed per locale: **it/es/pt/fi get 2·3·4** because
Italian has EIGHT one-syllable words in 933, where Germanic gets 1·2·3.

## Gates
`verify` 16 invariants (**landingFor exhausted over 261,856** rule×rule×item×target,
palette measured under 4 vision types) · `mutate` **33/33** · `local-test` **390**,
sweeping EVERY configuration · `smoke` 11 locales × fresh browser, Proxy proving every
authored key is **asked for** · `audit-locale-layout` **1056 across 198 cells** ·
liveness 53/0 · print 10/10 · `live-verify` **253 on production**.
**0 lines to `lcs-shell.{js,css}` or any protected core.**

⭐ **My own gates were wrong four times, and each is a recorded trap in a new dress:**
the verdict ban condemned my own doctrine COMMENTS; the fence check did the same; a
poison case skipped a pipeline stage the real check runs; and the scroll probe sent ONE
oversized wheel event (Chrome clamps it) and reported "cannot scroll" against a tool that
scrolls to 754px. **A gate condemns correct code before it catches anything.**

⭐ `RULE_FLOOR = 24` — calibrated on the 302-card picture pool — silently **deleted the
entire 32-block world** (a colour rule is 8 blocks), so "I will choose" opened a blank
panel. A floor calibrated on a big SAMPLED pool cannot be applied to a small EXHAUSTIVE
one. Now `min(24, ceil(pool/4))`.

## Still open (stated, not silently dropped)
- `object-attributes.json` is **456/933 reviewed**; this rebuild reviewed only the ~380 it
  admitted. §23.7 already corpus-blocks C4 on that number.
- The ~46-tool dead `min-height` tier gating (reported on `wodb`) — this tool stopped
  depending on tiers; the sibling commission is not opened.
- `hintChoose`/`hintSecret` want SPLITTING per mode (fr + sv asked): the single string is
  honest in every state but loses the "not even you" claim from the band. The invention
  still reads on the button and the landing copy.
- sv `sj/skj/stj` are one sound offered as three values; the ≥8 floor prunes them for now.

Related: [[feedback_native_panels_read_the_model]] ·
[[feedback_the_shell_instruction_is_hidden_in_every_embed]] ·
[[feedback_verify_the_measurement_before_the_defect]] · [[project_wodb_rebuild]]
Plan file: `C:\Users\rkgen\.claude\plans\spicy-crafting-taco.md`
