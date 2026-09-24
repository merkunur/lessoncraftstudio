---
name: project-syllable-splitter-rebuild
description: "Syllable Splitter (#22) rebuilt to the v4 bar 2026-08-06 — listen-first, teacher's own words, and a paywall that had been selling something already free"
metadata: 
  node_type: memory
  type: project
  originSessionId: 34297790-8054-43df-bd93-6951aac88f8e
  modified: 2026-08-06T17:54:08.595Z
---

**Tool #22 rebuilt 2026-08-06.** Operator reported two things — "can I add my own words?" and
"the button 'two clap words' is actually the menu" — and both were real. Neither was the worst
thing in the tool. Commit `f92c8e2d`. Gates: verify 0/0 · local-test **141** over 9 viewports
(incl. the 704 embed and 2560) · smoke 11/11 · print-sheets 191 · registration 47×9 ·
**0 lines to lcs-shell.\* or any protected core**.

## ⭐⭐ The finding I retracted, and why it matters more than the ones I kept

Two expert panels **and** my own seven-row source trace all concluded the tool was clipped at
420px inside its landing iframe (`html,body{height:100%;overflow:hidden}` →
`.lcs-app{height:100%}` → `INITIAL_HEIGHT=420` → self-referential latch). I wrote it up as
"THE FINDING THAT OUTRANKS BOTH COMPLAINTS."

**The browser refuted it in one run.** The shell posts 420 → 737 → 766; nothing is clipped.
I had never checked `.lcs-app`'s **containing block**: its parent `#lcs-root` is unstyled, so
the percentage is indefinite and `height:100%` resolves to `auto`. CLAUDE.md §23.6 already
said this in as many words ("real *for tools that bind `#lcs-root{height:100%}`*"). The doc was
right and three of us were wrong. → [[feedback-measure-the-specific-tool-not-the-class]]

**But the defect existed somewhere else.** Standalone on a phone there is no iframe to grow:
320×568 put an 886px app in a 568px window with `scrollY` pinned at 0 — the reveal eye
**physically unreachable**. That is what the scroll rule fixes, and the gate poisons red at
exactly 320 and 360. *The assumed case was wrong; a real case was one viewport away.*

## What the native panels found by reading the MODEL

Both panels, independently, in different languages:

- **`gatePremium` sold "keeps your own words between lessons" — already free.** `_saveStore`
  has no entitlement check, `customShelf()` is hard-coded `free:true`, `wordsForShelf()`
  returns custom words *before* the gate. The English landing page sold the same thing **plus**
  a printable sheet that is also free. Only extra word sets + sort mode are gated.
- **`beatCount` rendered "1 claps so far"** — ungrammatical in Finnish (`1 taputusta`) and
  French (`1 frappes`). `penOne` exists three keys away to dodge exactly this.
- **`saveWords` declared in 11 locales, referenced nowhere** — the fossil of the persistence
  gate that was never built, and precisely how the false claim survived review.

Plus, from reading call sites: `onDrum` capped taps while the comment above it said "NEVER
refused"; `arcOf` fired with no `revealed` check so a screen-reader user heard the answer while
the word was hidden; the copy-link joined on `-` while the sanitiser keeps `-` as a letter
(`porte-clé` → `portecle` with an invented split); `seamHint` named all 23 seam buttons
identically; `hasOralDivergence` + `oralConvention` were dead while the header claimed
otherwise. → [[feedback-native-panels-read-the-model]]

## Gate lessons bought here

- **A gate whose oracle reads the same file marks its own homework.** Poisoning a *string* left
  the smoke gate green (both sides moved together); poisoning the *render* fired 4 assertions.
  So it proves locale-selection, never translation quality. Recorded in its own docblock.
- **A gate can read PROSE instead of CODE.** T6's `.lcs-` ban matched a *comment* explaining
  the shell hides `.lcs-instruction`, twice in a row, because `[^'"]*` crosses newlines and an
  apostrophe in ordinary English opens a match. Strip comments before scanning.
- **The shipped smoke gate had `ok('clap hint is native or absent', true)`** — a hard-coded
  pass — and a docblock that was an unedited Heart Words clone (wrong tool number, claimed no
  Finnish deck while `-fi.json` ships and the code asserts it present, variable named `flip`).
- **My replacement for it was ALSO vacuous** until I loaded with `embed=1`: the in-stage cue
  only renders in an embed, so the empty-string branch passed in all 11 locales.
- **`html,body.ss-scroll` is a selector LIST** — the `html` half applies unconditionally, so
  the class is decorative. Poison the RULE, not the `classList.add`.
- **`.ss-ghost` was two things** — the sort drag ghost (`position:fixed`) and my button
  modifier — so the desk's Copy button parked itself on top of the hint. The recorded
  `.urt-lock` collision, walked into anyway.

## Design rulings now shipped

Word **hidden by default** in clap mode (taps drop plain beat markers; reveal turns them into
arcs) — syllable awareness is oral, and a printed word lets two strong readers answer while 23
stop listening. **Add-your-own-words is FREE**, on an in-flow desk, and **every seam opens
CLOSED — the machine proposes nothing**, because here the split *is* the taught content and the
gated bank has real holes (209 of 923 keys carry no `en` count). Set button is a two-line menu
with a caret; Clap|Build is one segmented control; Sort stands apart at full contrast with a
padlock. Syllable-level TTS removed. New drum, arcs in `em`, wide tiers re-keyed on **width
alone** so a 1280×800 projector finally ramps, and a real A4 worksheet that resets the shell's
print-hostile CSS (`lcs-shell.css` ships **no** `@media print` at all).

## Left deliberately undone

- **The free-shelf re-cut to a mixed set** (both panels wanted it: `s1` is 12 words all of two
  claps, so a free teacher can never contrast one against three). It needs 11 new native shelf
  labels, and shipping unratified linguistic content is exactly what the doctrine forbids.
  Measured: all 11 locales *can* field a mixed 5/4/3 shelf from words already native-ratified.
- **Deck expansion.** A **596–843-word** gate-verified, picture-bearing bank exists per locale
  (`approved-words-<loc>.json` ⋈ `pww-index-<loc>.json`, every image confirmed on disk) against
  55–58 shipped. Measured: the pipeline SPLIT agrees with the native-ratified deck **100% in
  nine locales**; `en` disagrees 19/55 and `da` 4/56 (TeX hyphenation — `bab-y`, `søhe-st`).
  Counts agree in all 11. The pedagogy panel ruled depth here is *curation, not volume*.
