---
name: feedback-cognate-aware-verify-discipline
description: "Sequential per-locale activity fan-out discipline. Each new locale's verify drops shared cognates from prior locales' FORBIDDEN lists + uses full-phrase tokens to avoid substring traps. Distinct from §A.13.48 parallel-agent recreation."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c55c7d51-4e48-47e3-875c-a88a478ee226
---

When a commission ships ONE activity across all 11 locales as N sequential per-locale commissions (operator approves each before next), apply this doctrine from commission 1, not commission N.

**Why:** Without it, the very-close cousin locales (Nordic-trio SV↔DA↔NO especially; Romance ES↔IT↔PT, Germanic EN↔DE↔NL secondarily) produce false-positive locale-leakage failures in the per-locale Puppeteer verify scripts. Diagnosed empirically across the E4 match-pairs K.OA.A.3 "Make the Number" 11-locale rollout (2026-05-26 session, 10 sequential commissions DE→ES→IT→FR→PT→NL→SV→DA→NO→FI on top of EN baseline). SV→DA introduced cognate-drop need; NO compounded it with substring traps (`Tryk` ⊂ `Trykk`); FI required zero drops (Uralic distinctness). Carrying the discipline forward to future fan-outs saves ~1-2 hours per locale of false-positive diagnosis.

**How to apply:**

1. **Single-row-multi-locale manifest pattern.** One row id in `<engine>-activities.json` with per-locale `slug`/`page_title`/`page_intro` maps. `resolveActivitySlug` disambiguates by locale. Avoids per-locale row proliferation + hreflang fragility. NEVER add a new row per locale.

2. **Per-locale Puppeteer verify script** at `mini tools/.verify-<slug>.js` with `FORBIDDEN_SUBSTR` array listing OTHER locales' distinctive tokens. Each locale's verify greps its own iframe DOM body for those tokens; expects 0 matches at all 3 viewports (375/768/1920).

3. **Cognate-drop calibration when shared roots exist.** At each shipping locale, identify which tokens from prior locales' FORBIDDEN lists are genuine shared cognates with the current locale. Drop those tokens FROM the current verify's FORBIDDEN list — but ONLY drop in the CURRENT locale's verify; prior locales' verifies remain untouched (each verify is its own artifact).

4. **Full-phrase forbidden tokens, NEVER bare root fragments.** A 4-char substring of locale A is often a substring of locale B's longer word. Use full phrases (e.g., `Alla par blir` not bare `blir`; `Alle par bliver` not bare `bliver`).

5. **Substring-trap analysis at Phase 1.** For each shared cognate, manually verify: is locale X's token a substring of locale Y's token? If yes, drop the bare form from FORBIDDEN_X in Y's verify. Empirical catalog:
   - `blir` (SV+NO copula, 4 chars) ⊂ `bliver` (DA copula, 6 chars) — drop bare `blir`; use full-phrase `Alla par blir`/`Alle par blir`.
   - `Tryk` (DA "tap", 4 chars) ⊂ `Trykk` (NO "tap", 5 chars) — drop bare `Tryk` from FORBIDDEN_DA in NO verify.
   - `Kort ` (Nordic "card" + trailing space, 5 chars) ⊄ `Kortti ` (FI "card", 7 chars) — position-4 is `t` not space; trailing space distinguishes. SAFE to keep `Kort ` in FORBIDDEN_{SV,DA,NO} for FI verify.
   - `en` (DA cardinal-1 bare) vs `én` (NO cardinal-1 acute) — distinct codepoints; not a substring trap. Cards aren't in FORBIDDEN anyway (internal data).

6. **Forward-looking cognate documentation.** At each locale's commission close, the operator report MUST document which cognates the NEXT locale's verify will need to drop. Knowledge accumulates: SV docs note SV↔DA Nordic-trio cognates; DA docs note DA↔NO Nordic-trio cognates + first substring traps; NO docs note FI Uralic distinctness expected. By commission N, the cognate-drop list is fully documented.

7. **Pre-commit gate** at `mini tools/.gate-<locale>-<engine>.js` asserts:
   - Current locale's strings populated
   - ALL prior locales' strings byte-untouched (regression floor)
   - Manifest row keys preserved for prior locales
   - Per-task pair-validity probes pass for new locale (typically × 6 tasks)
   - Spoken summary text exact-match per target (gate uses sandbox `LCSAudio.speak` stub to capture `sandbox.__lastSpeak.text`)
   - Cross-locale byte-distinctness sanity (e.g., `MPC.strings.speakAllPairsMake.no !== .da` AND `!== .sv`)

8. **PVC-locked cardinal tables.** Card cardinals (0-10 for K.OA.A.3 range) are value-verified against `PlaceValueCore._NUMBER_WORD_HELPERS.<locale>(n, 'cardinal')` for inline storage — NEVER import PVC into the activity wrapper. Confirm 0 PVC imports in shipped wrapper HTML via curl-grep.

9. **Operator-strategic register adjudications:**
   - Cardinal 1 disambiguation per locale: NL `één` (acute), SV `ett` (neuter), NO `én` (acute), DA `en` (bare per PVC K-1 lock), FI `yksi` (no ambiguity). Operator commission text or PVC source comment is the lock.
   - Copula choice per locale for "pairs make N": SV `blir`, DA `bliver` (deviation from DA E12 `er` — operator-authorized), NO `blir`, FI `on` (matches FI E12; singular distributive `Jokainen pari on {n}!` over plural). Romance variants `forman/fanno/font/formam` per Romance branch.

10. **Distinct from §A.13.48 parallel-agent recreation.** §A.13.48 = 3-agent native ensemble per locale, used for namespace recreation (e.g., homepage v3 across 11 locales). THIS pattern = sequential per-locale fan-out of a single activity instance using PVC-locked cardinal tables + operator-strategic register adjudication + cognate-aware verify. Different commission shape, different cadence, different artifact (verify scripts + gates per locale, not message namespaces).

**Empirical anchor:** E4 match-pairs K.OA.A.3 "Make the Number" 11-locale rollout, 2026-05-26 session. Commits: SV `3a24e3a8` → DA `61944985` → NO `a61b9977` → FI `4bf56943` (rollout closed 11/11). Cognate-drop progression: SV (no drops, first Nordic) → DA (drop SV `Mål`, `Kort `) → NO (drop SV+DA `Mål`, `Kort `; drop DA `makker`, `Tryk`, `Prøv`) → FI (drop none; Uralic distinctness).

**When NOT to apply:**
- Parallel 11-locale recreation (use §A.13.48 instead — different commission shape)
- Single-locale commissions (no cognate concerns within one locale)
- Engines where the activity wrapper doesn't expose per-locale verify-grep-able tokens (rare)

**Cross-references:**
- [[project-activities-live-inventory]] — E4 fan-out catalog post-rollout
- [[feedback-11-locale-recreation-discipline]] — §A.13.48 parallel-agent pattern (distinct from this)
- CLAUDE.md §A.13.53 — durable-doctrine summary
- CLAUDE.md §A.13.42 — cache-buster discipline (each per-locale ship bumps `?v=N`)
- CLAUDE.md §A.13.36 — CC↔assistant cooperation cadence (per-locale routing rhythm)
