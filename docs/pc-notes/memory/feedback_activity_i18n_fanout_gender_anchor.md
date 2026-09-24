---
name: feedback-activity-i18n-fanout-gender-anchor
description: "How to fan out a K-3 activity to all 11 locales — gender-safe fixed-noun prompt anchor, per-locale definiteness, 0-line engine bar, cache-bump re-verify, byStrand house-voice alignment, known sweep staleness classes."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 371acf05-df47-48f6-9b44-eac078b24366
---

Reusable discipline for building a new distinct-skill activity (EN base) and fanning it out to all 11 locales. Empirical anchor: E2 "Comparing Length" (K.MD.A.2), 2026-06 — EN build (`a5e37bdf`) → 11-locale fan-out close (NO `41232bdb`); hreflang chain 12; wrapper `choice-board-activity.js?v=13` / `ACTIVITY_WRAPPER_VERSION='7.73'`. Canonical doctrine in CLAUDE.md §A.13.54.

**Why:** the engine bar (0 lines to the shared cores + lcs-shell.* + Direction A CSS) and per-locale grammatical correctness are both load-bearing; a single shared-wrapper edit changes every activity, and gender/definiteness mistakes ship grammatically wrong prompts to native teachers.

**How to apply:**
- **0-line engine bar.** Touch ONLY the activity layer: the engine's `<engine>-activity.js` wrapper (new `task_template` branch + wrapper-injected `<style>`), the `*-activities.json` manifest row, `activity-content/<locale>.json` (byStrand), `strand-names.ts`, and `page.tsx` (`ACTIVITY_WRAPPER_VERSION`). Prove at fan-out end with `git diff <pre-arc>..HEAD --name-only` over `choice-board-core.js` / `place-value-core.js` / `match-pairs-core.js` / `lcs-shell.{css,js}` = 0 changes (definitive regression proof; engines byte-identical → per-instance re-verify is redundant).
- **Gender-safe prompt anchor (locked precedent).** Mixed-gender objects → anchor the comparative to a FIXED noun: fr/es/it/pt feminine "image", nl neuter "het plaatje", sv common "bilden", de neuter "das höhere", fi partitive comparative. **Per-locale definiteness is a mirror-image trap — confirm with a native expert:** da SINGLE definiteness (bare "det højere billede", no enclitic) vs no/sv DOUBLE definiteness (enclitic kept: "det høyere bildet" / "den högre bilden").
- **Per-locale native-expert linguist** validates the prompt + produces native strand name / slug / page_title / page_intro / byStrand. Edit the wrapper string only on a correction → bump BOTH cache-busters (`?v=N` in `.html` + `ACTIVITY_WRAPPER_VERSION`) and re-verify ALL prior locales render byte-identical post-bump.
- **Strand localization = leak-guard.** Add the new strand to `strand-names.ts` (all locales) or non-EN pages leak the English strand (audit `noStrandLeak`). byStrand cites the locale's national framework (never "Common Core"), uses the `{strand}` placeholder, and matches each `<locale>.json`'s house voice verbatim (device list, no-timer phrase, framework clause, task term, bullet style).
- **Aria-label** keeps raw-English-noun house pattern (invisible; matches the other E2 activities).
- **Known sweep staleness (NOT regressions):** pre-existing audit `noStrandLeak` on activities whose `<locale>.json` byStrand embeds English strand names (de/fr/nl/sv/da/no/fi; es/it/pt localize → clean); `.verify-*.js` chip-strand regexes hard-coding a strand spelling that differs from the correctly-rendered localized chip ("&" vs "and"). Confirm via the load-bearing grep `h1/slug/framework/leak/overflow/caption/speech = 0 FAIL` before reporting clean.

See [[project-activities-live-inventory]] (E2 = 9 activities; Comparing Length 11/11) and CLAUDE.md §A.13.54, §A.13.53, §A.13.48, §20.10.
