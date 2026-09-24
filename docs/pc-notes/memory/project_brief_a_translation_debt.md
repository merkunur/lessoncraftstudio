---
name: Brief A translation debt — sr-only and head template completion across 11 languages
description: What's done in en + de vs what's still owed across the other 9 priority languages, plus the math-worksheet concatenation limitation that only surfaces in non-Germanic languages
type: project
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
Brief A's deck.html SEO surface (CLAUDE.md §17.8) shipped to production with English + German translations only. The other 9 priority languages (fr, es, pt, it, nl, sv, da, no, fi) fall back to English via the existing `t()` chain. This is acknowledged debt, not a defect.

**Why:** the Brief A operator-confirmed scope was "Tier 1 language commitment per handoff §6 — en + de only across all 29 apps; other 9 languages fall back to English." Translation completion to all 11 priority languages is a follow-on work item, blocking the eleven-deck dry-run scheduled after Brief B (publish-cli) ships.

**How to apply:**

1. Translation keys currently missing in the other 9 languages, across all 29 apps' translation files in `REFERENCE TRANSLATIONS/translations-<app>.js`:
   - SEO `<head>` content keys: `seoFreeInteractive`, `seoFor`, `seoPrintOrPlayOnline`
   - End-deck links keys: `endDeckHeading`, `endDeckMoreType`, `endDeckMoreTheme`, `endDeckMoreLevel`, `endDeckBrowseAll`
   - Section aria-label: `srWorksheetQuestions`
   - Per-app sr-only templates: `srExercise<App>`, `srExercise<App><Mode>`, `srPuzzle<App>` per the convention in `reference_sr_only_translation_keys.md`
   - Math-worksheet operator-word keys: `srOperatorPlus`, `srOperatorMinus`, `srOperatorEquals` (lives only in `translations-math-worksheet-final.js`)
2. Before commissioning the 9-language translation pass, the eleven-deck dry-run should NOT run — the dry-run output would be partly-English in non-Germanic locales and would not represent the production-ready experience.
3. The existing `srExerciseAddition` / `srExerciseAdditionFindAddend` / `srPuzzleWordsearch` / `srPuzzleTreasureHunt` keys are en + de only too — same debt, same promotion path.

**math-worksheet equation-construction limitation (separate constraint within the same debt):**

math-worksheet's per-row sr-only is built by stitching `ImageVocab.singular()` outputs + `t('srOperatorPlus')` outputs into strings like "a cat plus a dog equals 7". This concatenation works in English by virtue of English's rigid SVO order and simple article system. It works in German for similar reasons. In Spanish / Italian / Portuguese / Dutch it produces awkward-but-parseable output. **In Finnish — where number-noun agreement uses case marking and there's no equivalent of "a/an" — pure concatenation produces strings that read as broken machine output to a screen-reader user.**

When the 9-language translation pass is commissioned, math-worksheet's equation rendering needs **per-language logic** — not just operator-word translations. The `t('srOperatorPlus')` substitution alone won't fix the case-marking and article-handling problems. Likely shape: a per-language equation-formatter function that takes `{leftImageKey, operator, rightImageKey, result, lang}` and returns a grammatically-correct equation string in that language.

Other Group A apps that add similar arithmetic constructions in the future inherit this same constraint — surface and design the per-language renderer rather than extending the concatenation pattern.

**Status snapshot at the time this entry landed:** Brief A foundation + 3 deep-test apps + 26 smoke-test apps' SEO `<head>` and end-deck wiring = production. Group A 19-app per-row sr-only = pending bulk apply (Step 5A.3). Group B (3 apps) + Group C (4 apps) per-deck / per-element sr-only = subsequent sessions. Brief B publish-cli substitution = subsequent brief.
