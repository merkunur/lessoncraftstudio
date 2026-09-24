---
name: project-deck-teaching-blocks
description: "Deck pages carried 130 words and said nothing about what they teach — the content was in the manifest all along; pipeline live for de math-puzzle, fanning out by skill family"
metadata: 
  node_type: memory
  type: project
  originSessionId: 48bc9529-fbcd-4850-a3ea-778a761e73bc
  modified: 2026-07-20T19:24:47.682Z
---

**Live 2026-07-20** (`5697a0f0`): 98 German math-puzzle deck pages, 130 → 301 visible words,
48 held back as a measurement holdout.

## The mistake that started it

I looked for image nouns in `math-puzzle`, found none, and told the operator 1,477 decks had
"no vocabulary, nothing to name." **The teaching content was never in the nouns.** It was in
`exercises[]`: nine operations with their solutions, a 3×3 grid, and `scrambledPieces`.

His correction — *"Can't you just analyze one of the math puzzle decks to understand what is
the teaching point, which age group it is for, how can teachers use it"* — is the general
rule: **open the artefact before concluding anything about it.** Same species as the "62%
mis-graded" bucket error and the `answerIdx`-matched-`answer` miscount, both caught the same
day by looking again.

The type I dismissed converts at **33% CTR at position 7** (its PDF).

## Catalogue inventory (strict measure, 45,303 decks)

| | decks |
|---|---|
| genuinely readable teaching content in the manifest | **34,562 (76%)** |
| nothing readable — needs the rendered image | 10,741 |

Per-type exercise shapes differ and each needs its own adapter:
`math-puzzle` `{operations:[{text,solution}]}` · `addition` `{operandA,operandB,image:{name}}` ·
`subtraction` `{minuend,subtrahend,image}` · `math-worksheet` `{values,equations:[{expr,result}]}` ·
`more-less` `{L,R,rel,nL,nR}` · `matching` `manifest.vocabulary` (already populated).
Nothing readable: crossword (1,512 — investigate, a crossword HAS words), sudoku, shadow-match,
big-small, odd-one-out, telling-time, treasure-hunt, picture-path.

## A real product defect this surfaced

**428 decks across 11 locales print numbers above their stated grade band** (de 42, sv 47,
es 45, en 41, pt 42, nl 39, fi 39, it 35, no 34, fr 32, da 32) — e.g. `24 − 15` on a page
labelled 1. Klasse. The German teacher: *"A Klasse-1 teacher who prints this will not come
back."* Fix without touching the tag (churn freeze): **state the measured range ABOVE the
grade label** — teachers read the number range first anyway.

## Pipeline (all locale-agnostic, in `scripts/publish-cli/`)

`derive-teaching-facts.js` → `build-teaching-blocks.js` → `verify-teaching-block.js` →
poison test → similarity gate → `inject-deck-teaching-block.js --holdout=0.3`.
Per-locale work is only `teaching-copy/<locale>.js` + the native ensemble that authors it.
Injection is marker-guarded (`TEACHING_BLOCK_START/END`), atomic, `.bak` alongside,
idempotent, removal byte-exact. deck.html is nginx-served — runs on Hetzner, **no deploy.sh**.

## German rules the ensemble caught that I had wrong

- **`Zahlenraum` is a curricular BAND (10/20/100/1000), never a measured maximum.** "im
  Zahlenraum bis 17" marks text as machine-written. My own plan mockup said "bis 21".
- **Zehnerergänzung** (landing ON ten) ≠ **Zehnerübergang** (going PAST it) — different
  skills, taught in that order; conflating them labels the easiest tier as the hardest.
- `21 − 11 = 10` is **not** Zehnerergänzung — *ergänzen* is an addition verb.
- **Never a diagnostic claim**: the self-correction destroys the evidence — the child fixes
  the error before the teacher sees the sheet.
- Themes only as `zum Thema X`; `mit X` needs a dative plural.
- Blocks 1-2 no direct address, block 3 *Sie*. Sibling landing pages are parent-facing *du* —
  mixing registers makes the two surfaces read as duplicates.

## What the gates caught (they earned their keep three times)

1. Two decks rendering **byte-identical** text (Jaccard 1.000) — two sentence shapes quoted
   no operations. **Fix: list all nine real sums.** That is simultaneously the page's
   fingerprint and the most decisive fact for a teacher deciding to print — useful and
   unique were the same edit.
2. Shape tuples repeating every 10 decks in a 48-deck group (cells < items, §22.1). Fixed
   with a **mixed-radix counter** over the ordinal — distinct tuples guaranteed to 60.
3. A verb swap leaving subtraction reading `führen unter den Zehner … die übrigen bleiben
   darunter` — self-contradictory.

## Honest limits (say these before anyone asks)

Will **not** lift CTR on queries these pages already rank for — that is a title problem and
titles are frozen to ~2026-09-01. Does **nothing** for the PDFs, which are two of the four
best German pages. Real value: ~54,000 near-identical thin pages become distinct documents.
Read at 8–12 weeks as **new query strings** in GSC against the 30% holdout.

## Fan-out order (by skill family, not deck type — the ensemble is the expensive part)

A arithmetic (~10,610) → C word puzzles (~5,350, where the demand is) → B picture/sorting
(~9,100) → D pattern-train (2,722) → E image-only (deferred).
**Never print an answer** (§17.8.9): cryptogram's sentence, word-guess/word-scramble targets.
Wordsearch word lists are printed on the sheet, so safe.

Related: [[project-crawl-budget-collapse-2026-07]], [[feedback-verify-rendered-not-source]].
