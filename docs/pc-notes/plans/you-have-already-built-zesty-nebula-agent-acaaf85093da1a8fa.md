# Dutch (nl) second-batch fan-out — ACTIVITY #1 identification (research findings)

## 1. ACTIVITY #1 of the second batch
- **id / slug:** `seriation.compare-length.1-md-a-1` (manifest id); EN slug `compare-and-order-by-length`
- **Character/theme:** "The Faraway Shelf" — Tilly the shop cat; compare ribbons with a measuring cord (indirect comparison via a third object)
- **CCSS standard:** **1.MD.A.1**
- **Engine/core:** tool `seriation-activity` (task_template `seriation`); engine `mini tools/seriation-activity.js` + core `mini tools/seriation-core.js`
- **Grade:** 1
- **Strand:** "Measurement & Data" (manifest); localized: de "Größen und Messen", it "Relazioni, dati e previsioni"

## 2. Commit hashes for #1
- **EN (games-build-walk):** `12327ce5` — "[FEAT][ACTIVITY] deploy 2nd-batch EN activities (~121 lcs-shell activities + shared-core fixes)" (2026-06-28). This is the EN commit that FIRST added `mini tools/seriation-activity.js` (diff-filter=A confirms).
- **de:** `94e8ec11` (2026-06-29) — parent `67d7ac1c`
- **fr:** `962ed895` (2026-07-06)
- **es:** `968b3863` (2026-07-12)
- **pt-BR:** `c79f2bb0` (2026-08-16)
- **it:** `19c098f8` (2026-08-23)

## 3. Files touched per one-activity locale fan-out (activity-layer only, all 5 locales identical set)
1. `mini tools/seriation-activities.json`  (manifest: add locale to slug / page_title / page_intro)
2. `mini tools/seriation-activity.js`      (engine localization: module LANG, L.<loc> block, strings.<loc>, locale label maps)
3. `mini tools/seriation-activity.html`    (bump `seriation-activity.js?v=N`)
4. `frontend/messages/activity-content/<loc>.json`  (prose full-override for id compare-length.1-md-a-1)
5. `frontend/app/[locale]/activities/[slug]/page.tsx`  (bump ACTIVITY_WRAPPER_VERSION @ line ~559; + STRAND_OVERRIDE/GRADE_OVERRIDE if needed — it added STRAND_OVERRIDE, de/es/fr/pt did not)
- **NOT touched:** `seriation-core.js`, `lcs-shell.js/.css`, Direction-A CSS, `strand-names.ts`, `activities.ts`. 0 core lines (git-diff proven).
- ACTIVITY_WRAPPER_VERSION currently `9.563` at `frontend/app/[locale]/activities/[slug]/page.tsx:559`.

## 4. Per-activity build recipe (standing steps)
Operator "continue" -> EnterPlanMode -> survey/confirm pick -> 3-agent native ensemble (linguist + K-3 educator + SEO) authoring content into the plan file -> ExitPlanMode approval -> build the 5 files above (rebuild-not-translate) -> DoD gates -> show local screenshots -> operator approve -> commit + push (NO deploy). Deploy batched to the very end.
DoD gates: `node --check` engine JS; JSON valid; node-assert (locale-neutral tags deep-equal EN + trap invariant); `verify-seriation-core.js`; `verify-activity-content-<loc>.js`; `preflight-activity-routes.js`; `visual-qa-activity.js --activity=<id> --locale=<loc>` then `--locale=en` regression then `--locale=<loc>` restore; personal Read 360/768/1024; EN-leak grep; `git diff --name-only` 0-core.

## 5. Dutch fan-out status
**NOT STARTED.** No `[nl]` second-batch activity commits exist (all nl commits are SEO landings, PWW/vocab, worksheet-gen, homepage, teaching blocks; the "58 nl activities" copy commit `e7cffc95` is FIRST-batch). The seriation manifest has en/de/fr/es/pt/it keys and ZERO `"nl"` occurrences -> #1 not built for Dutch. nl.json exists (`frontend/messages/activity-content/nl.json`) but has no compare-length.1-md-a-1 prose override yet.
