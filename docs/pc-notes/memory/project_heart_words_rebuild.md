---
name: project-heart-words-rebuild
description: "Heart Words (#21) rebuilt to the v4 bar 2026-08-06 — 790 words in 10 locales, teacher's own words, and the defects the gates and native panels found"
metadata: 
  node_type: memory
  type: project
  originSessionId: a8045dbf-74d5-4821-afe4-5e8ccf574ab1
  modified: 2026-08-06T16:34:00.845Z
---

**LIVE on production 2026-08-06** — `live-verify-heart-words.js` 89 assertions.
Commits `f07354fb` → `7f06e258` on `pivot/printable-business-toolkit`.

## What the operator asked for, and what shipped
"More words" → **40 → 790 across ten locales** (en 120 · fr 100 · da 100 ·
de 80 · sv 80 · nl 70 · no 70 · pt 70 · it 50 · es 50), per-locale DECLARED
targets. "Add your own words" → the teacher desk with a custom-word editor.
Plus the WRITE face (the routine had no ending), three print sheets, a Big
word surface, and the `note` field rendered for the first time.

## ⭐⭐ THE HERO HAD RENDERED AT ITS FLOOR SIZE AT EVERY VIEWPORT EVER SHIPPED
`.hw-box` sized on `calc(min(112px,(100% - …)/var(--hw-n)))` where the
`100%` resolved against `.hw-boxrow` → `.hw-card{width:fit-content}` → its
own content. **Cyclic** — the browser falls back to auto and the tile
collapses onto `min-height:56px`. Measured on the pre-fix build: a 2-box
word and a 5-box word both render **56px, ratio 1.00**, at 704 AND 1024.
The repo's own QA renders had shown it for months (`sweep-360` and
`longest-1024` have identical tiles) and nobody had compared them.
Fixed with `container-type:inline-size` on a NEW transform-free
`.hw-cardbed` → 184px / 111px, ratio 1.65.
**The gate asserts the RAMP, not a number** — no threshold catches "a
shorter word gets bigger tiles" being false.

Also shipped-broken: the silent `e` of a split digraph rendered **62px
below its row** (appended to the column-flex face, not the row), and all
three "wide board" tiers were keyed `min-width:1367px` — **dead inside the
704px production iframe**.

## ⭐⭐ A GATE YOU HELP PAST IS NOT A GATE
`heartOverride` short-circuited D15b as well as D15a/c. Since D15a fires on
every single-letter heart, 99 of 120 words legitimately carry an override —
so the never-heart POSITION rules were unenforced across the whole bank
while the gate reported PASS. Found by poison-testing each invariant family
**separately**: eight died, one survived.

## ⭐⭐ TEN NATIVE PANELS AUDITED MY ENGLISH AND FOUND ~15 DEFECTS EACH
Hand every panel the English as a **SOURCE TO AUDIT**, not a target — it is
the one locale nobody reviews. They read the CODE, not the copy:
- `tooManyHearts` was **mathematically false** (cap is `min(2,⌊n/2⌋)`, so it
  said "nearly all of it" after 2 of 5).
- `looksDecodable` named the sibling tool and the code appended its name as
  a link → it printed twice. **Six panels found it separately.**
- `looksDecodable()` returned false once a heart existed, and a fresh draft
  never has one → the warning **fired on every new word**, in Spanish ~100%.
- The take-home sheet printed its sentence **upside down** (the 180° is the
  FOLD, and only the cards sheet folds).
- `tooLong` served three refusals and was false in two (a one-letter word
  was told it was "too long").
- `saveWord` "Use this word" labelled the **paid** button while the free one
  beside it was the one that actually used the word.
- `copied` could be a lie (`.then(done,done)` + a fallback that also
  reported success).
- **GERMAN only:** the tool lowercased the teacher's word, so `Kuh` shipped
  as `kuh` beside a bank of capitalised nouns.
- **ITALIAN only:** the input strip ate the apostrophe (`l'ape`→`lape`) —
  and the shipped Italian bank has a **whole shelf built on the apostrophe**.

Each panel also substituted a worked example that breaks **its own**
segmenter, measured by running `segment()`: de Häuschen · fr femme ·
es gusano · it quando · pt nascer · nl sjaal · sv kanske · da have · no ski.

## ⚠ THE BAN-TOO-WIDE TRAP FIRED THREE TIMES IN ONE BUILD
1. `\b` is ASCII-only → `\bquiz\b` matched inside Spanish **quizá** and
   condemned correct native prose. Use `(?<!\p{L})…(?!\p{L})`.
2. The premium-leak check read the whole desk `textContent` and convicted
   the tool for its own chrome string *"Nothing **here** matches that."*
   (`here` is a premium word). Scope to word-bearing elements — and prove
   the selector non-vacuous in BOTH directions.
3. The landing check ran the child-facing verdict ban over adult marketing
   prose and condemned *"there is no marking, no score and no **wrong** tap
   available"* — the sentence that sells the pedagogy. **Marketing copy has
   to USE those words to DENY them.** Replaced with a falsifiable CLAIM
   check, which then found two locales genuinely selling the free
   printables as Premium and four quoting a word count that had gone stale.

## Other standing lessons this bought
- **An invented threshold is not a measurement**: the ramp's 1.6 came from
  the ruling's 2-vs-5 row while I measured 2-vs-4 — it failed a CORRECT
  tool at 1.30.
- **A check satisfied by one good declaration cannot see the bad one beside
  it**: my print-region check asked "does the rule contain an allowed
  property", so `color:red` next to `box-shadow:none` passed.
- **Scope a ban by REGION, not by exception**: `.lcs-` selectors are banned
  on screen and REQUIRED inside `@media print` (every sibling hides the
  shell header on paper). A blanket ban made the correct rule unshippable.
- **Four mutation needles lost their anchors** when I changed the code, and
  the harness reported them as FAULTS — the only reason I did not ship a
  suite silently testing 47 of 51.
- **The liveness gate found a dead control I could not exempt**: the
  selected desk tab re-rendered to an identical DOM. Giving it a "reset"
  effect left it still dead (nothing to reset on the reachable path). A tab
  you are on has nowhere to go → `disabled` + `aria-selected`.

## The tool's own load-bearing rules
- **The machine NEVER guesses the heart.** A wrong split is visible and
  correctable at a glance; a wrong heart is an invisible pedagogical
  assertion, accepted by a busy teacher *because it looks decided*.
- Free = the whole ROUTINE (shelf 1, the write face, the print cards, the
  custom-word draft + "Show on the board"). Premium = shelves 2-n, KEEPING
  the list, the wall strip and the take-home sheet.
- **Finnish stays out**, ruled with citations (Seymour/Aro/Erskine 2003).
  `KNOWN_GAPS = {'heart-words:fi'}` is correct, not a gap to close.

## Open, recorded not hidden
- `PHASES`/`NEVER_HEART` exist only for `en`, so **D14/D15a/D15b never run
  for the other nine** — printed as a warning on every run (18 warns). Each
  panel supplied the table its locale needs.
- Four keys (`tooShort`/`tooManyBoxes`/`stripNote`/`copyFailed`) are my
  drafts in all ten locales — created by the code fixes the audit forced,
  so no panel saw them. Flagged in-source.
- `è` is structurally unbuildable in Italian (D4 needs ≥2 boxes).
- es notes a real **+10 for es-419 only** (c/z vs s under seseo) if the
  platform ever splits `es-ES`.

Gates: `verify` (D1-D17, T1-T13) · `local-test` 124 · `mutate` 51/51 killed
0 faults (17 browser-only) · `smoke` 10/10 · `audit-heart-words-locale-layout`
2250 checks / 280 renders · print-sheet 10/10 · liveness 156/0 ·
`live-verify` 89 on production. 0 lines to `lcs-shell.*`.
