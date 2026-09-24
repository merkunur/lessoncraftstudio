---
name: project-nothing-is-free-prose-sweep
description: "The 2026-09-08 sweep removing the false \"free\" claim from activity body prose and templates, the repair layer that mangled words from the inside, and the list-free instrument that found it"
metadata: 
  node_type: memory
  type: project
  originSessionId: cfb29625-4aea-4618-8e2c-de1d88dabb3b
  modified: 2026-09-08T11:15:25.821Z
---

Round 2 of "nothing is free". `9f70e033` cleaned the 939 landing META fields; this arc
cleaned the two surfaces it never touched and repaired the damage it shipped.
Commits: `321d5ef0` (prose + templates + the repair root cause) · `a19be1ca` (the second
carrier word + the new gate) · `cd93a651` (clock-digital, see [[project-sv-secondbatch-fanout]]).

## What was wrong

- **1,261 body-prose strings** (`frontend/messages/activity-content/*.json` → `prose`) and
  **88 `templates` strings** still claimed "free". `templates` is the Tier-2/3 fallback that
  **10 activities render from today**; the English panel found it, not me.
- **300 fields carried a fused or truncated word** — 164 already committed in the manifests,
  136 in prose: `scuola dell'infanziainterattiva`, `uma atividad`, `Het ise,interactieve`,
  `de CPinteractif`, `webbläsarenutan`, `zählenabgestimmt`.
- **131 English strings read `It's a interactive Grade 2 geometry activity.`** — the article
  agreed with *free* and nothing re-agreed it.

## ⭐⭐ The instrument that found it needs no pattern

**The sweep only ever DELETES, so any word in the AFTER text that was not in the BEFORE text
is a defect by construction.** Every pattern check I had written — punctuation wreckage,
stranded conjunction, copula-comma — was structurally blind, because damage *inside* a word
leaves no whitespace anomaly and no stray punctuation. Allowlist new words **individually,
with a stated reason each** (article agreement, an authored override, a named edit); a
loosened rule would hide the next one. Poison it on a synthetic fusion.

## ⭐⭐ Two root causes, both in MY repair layer

1. **No left word boundary on the conjunction** → it matched INSIDE the preceding word: Dutch
   `een` as `en` (51), Portuguese `atividade` as a final `e` (16).
2. **Edge-anchored repairs applied to an interior WINDOW.** `repairOnlyTheCut` runs `tidy()`
   on a slice cut from mid-sentence, and `tidy()` ended in `.trim()` with a `^`-anchored
   leading-separator strip. On an interior window those treat the WINDOW's edges as the
   SENTENCE's edges and delete the very separator holding the seam apart. The window now
   knows whether it touches a real edge, and **the flags THROW when absent** rather than
   defaulting to the damaging behaviour.

⚠ **THE SAME RULE IN TWO CALL SITES WILL BE HALF-FIXED** — recorded lesson, walked into
anyway. The edge fix went into the prose caller only; all 135 manifest fusions survived while
prose cleared, and the two surfaces silently disagreed. One shared `windowRepair()` now.

## ⭐⭐ The claim migrates to a second word

After `kostenlos`/`gratis` was deleted, the promise was still there as German
`frei zugänglich` / `frei spielbar` / `frei für alle nutzbar` and Dutch `vrij toegankelijk` /
`vrij om te spelen` — **21 strings, found by two native panels, invisible to any word list.**
The German panel's closing warning: `für alle nutzbar`, `vollständig`, `ohne Einschränkung`,
`unbegrenzt` would each survive the next list too. **Detect a PREDICATION OVER THE PRODUCT,
not an adjective.**

⚠⚠ **And the ban cannot be widened to the bare word.** Of 23 German `frei`, FIVE are
innocent, and the decisive one is `kein Fleckchen Erde bleibt frei` (no soil left UNCOVERED)
— `bleibt` + `frei`, the exact copula shape the price claims use, and it is the mathematical
content of a tiling task. **The discriminator is the SUBJECT** (the product vs. a physical
space, a didactic term `freies Erzählen`, or the idiom `den Kopf frei machen`). Dutch: same
trap with `vrije plekje` and `vrij van stress`.

## The gate — `scripts/verify-activity-prose-claims.js` (in `deploy.sh`)

`verify-activity-serp-copy` walks `page_title` + `page_intro` and **nothing walked the body**
— that is why 1,349 claims sat unnoticed: not a weak check, an **absent** one. The new gate
walks 20,092 strings × 11 locales, bans the price word AND the carrier collocations, and
poison-tests **18 must-fire + 16 must-pass** every run. Ratchet EMPTY.

⚠ **`\w` IS ASCII-ONLY TOO, not just `\b`.** `käytettäv\w*` cannot match `käytettävissä` —
`\w*` stops at the `ä` and the trailing `(?!\p{L})` then sees a letter and refuses. The
Finnish ban was **born dead for the exact language it was written for**, and the gate's own
must-fire poison caught it on the first run. Use `\p{L}`.

## Delta-gating is what makes the other checks usable

- 286 strings legitimately end a clause with a copula (`hur många det är.`), so only the
  **delta** identifies `La actividad es.`
- 420 predicate-position claims exist, but only ~24 broke: where the next conjunct is an
  **adjective** the copula must STAY; only a following **finite verb** means it goes.
- Of 143 apparent English article disagreements only 131 are defects — `a one-to-one`,
  `a unit`, `an x`, `an s` are correct, because agreement follows **sound, not letter**. Fix
  at the DELETION SITE, never with a general `a`+vowel pass.

## Standing traps re-paid here

- ⚠ **`git checkout -- "mini tools"` wiped four uncommitted engine fixes.** Recorded already;
  walked into anyway. Restore the narrowest path (`"mini tools"/*-activities.json`), and keep
  every fix reproducible from an idempotent patch script that FAULTs on a missing needle.
- ⚠ **A gate that greps for a removed line matches its own docblock** — my A3 check quoted the
  old code verbatim in its comment and condemned a correct file. Strip comments first.
- ⚠ `npx tsc` from the repo root is the wrong package; run `frontend/node_modules/.bin/tsc`.
  7 pre-existing blog-test errors are the known baseline.
- ⚠ Heredocs eat backslashes: write regex-bearing scripts with the Write tool.

## Open, recorded not fixed

The panels' per-locale copy rewrites (de 46, fr ~57, pt 38, nl ~25, es ~28) and ~60 SOURCE
defects nobody had reviewed: the Dutch CCSS→groep map is not a map and `de SLO-kerndoelen
voor groep 3` does not exist; Spanish cites Spain's LOMLOE vocabulary on an es-MX locale and
mixes up grade labels; a Finnish activity asks for words starting with D and F; three
activities leak an English strand name into 10 locales (contradicting CLAUDE.md §20.10's
"0 leaks, 266/266 pass").
