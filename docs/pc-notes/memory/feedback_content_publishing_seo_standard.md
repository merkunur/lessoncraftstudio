---
name: feedback-content-publishing-seo-standard
description: "Full SEO treatment is automatic+implied on every \"publish decks/worksheets/activities/tools\" — never ask; run the per-type standard"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f49d98aa-7160-4f31-8825-295b5fd203ec
---

When the operator says **publish / add new decks, interactive worksheets, activities, or tools**, the FULL SEO treatment is implied and non-negotiable. **NEVER ask** whether to make it indexable, write alt-text, emit JSON-LD, declare hreflang, author per-locale titles/metadescriptions, or add it to the sitemap. Run the per-type standard automatically, then verify.

**Why:** the operator is adding large volumes of the SAME content types. Re-stating SEO requirements every time wastes their attention. They explicitly asked for this to be standing, automatic behavior documented durably. Canonical statement lives in CLAUDE.md **§21** (+ §10.4 Always-do trigger).

**Key correction to a wrong instinct:** the heavy SEO work needs **NO per-item authoring**. Per-locale title/description/alt-text are template-derived from manifests + shared i18n + `image-vocabulary.js`. Employing native-expert linguists *per item* is wrong — that discipline ([[feedback-11-locale-recreation-discipline]] / §A.13.48 / §A.13.49) is for a new content **TYPE** or new **LOCALE** only (its one-time i18n tables), never for ordinary waves.

**How to apply:**
- **Decks** → `node scripts/publish-cli/publish-wave.js <staging-folder> --locales=<csv> --confirm` (Hetzner, env loaded). Runs: pre-flight (§A.14.8 theme-emit detect, HALT on defect) → publish-bulk (slug/canonical/OG/JSON-LD/alt-text/hashes + HALT gates) → regenerate-og-images → populate-and-inject-hreflang → audit-deck-html. No `--confirm` = dry-run preview, publishes nothing.
- **Activities** → add a row to `frontend/public/mini-tools/*-activities.json` (per-locale slug/title); route+sitemap+JSON-LD+mesh+hreflang flow automatically. Verify: `node scripts/audit-activity-pages.js --out=docs/audit-results`.
- **Tools** → add `frontend/messages/tool-content/<locale>.json` entry + key in `TOOL_KEYS`; `LIVE_TOOL_SLUGS` (auto-derived from `frontend/config/live-tool-slugs.ts`) + sitemap + middleware carve-out flow automatically. Verify: `node scripts/audit-tool-pages.js --out=docs/audit-results` (must be 33/33).
- **hreflang** is a single SoT: `frontend/lib/seo/hreflang.ts` (`HREFLANG_MAP`/`getHreflangCode`/`buildHreflangAlternates`; pt→pt-BR, es stays es, x-default→en). Never re-inline.
- After any deploy, remember Cloudflare 5-min TTL before edge reflects new bytes.

**Residual hand-maintained sync points** (only places adding content touches code): new theme → `topics-taxonomy.json`; new art noun → `image-vocabulary.js` (operator-approved); new tool → `TOOL_KEYS` + `tool-content/*.json`; new locale → §21.3 native ensemble + shared tables. (hreflang map + LIVE_TOOL_SLUGS are now auto-derived — no longer hand-edited.)

**Worksheet apps** emit deck SEO chrome via content-locale-direct `_seoT` (§A.13.46), never `_t` — so generated decks carry correct per-locale SEO regardless of operator UI language.

**Tooling lesson from this arc (load-bearing):** never dispatch a large parallel batch that mixes dependent ops with PowerShell `Set-Location` commands. A PowerShell native non-zero exit (even a *successful* validation test that returns exit 2) cancels every sibling tool call in the batch — and you can end up narrating commits/files that never landed (fabricated hashes). Go **sequential** for any chain with git commits / deploys / file writes, and always re-verify actual git log + disk state before trusting your own narration. The Bash tool also intermittently returns empty on git/grep here; PowerShell `... | Out-String` (sequential, single call) is the reliable readback.

**Empirical note on the `_seoT` conversion (Phase 5):** the 4 SEO chrome keys are `worksheet` / `seoFreeInteractive` / `seoFor` / `seoPrintOrPlayOnline` (NOT `seoWorksheet`/`seoPrintOrPlay` — verify key names against the real producer before any swap). 24 apps converted; 4 were already done in the Italian wave (bingo/chart-count/cryptogram/shadow-match); **code-addition was correctly skipped because it already uses a sibling content-locale-direct helper `_ct(key, fallback)`** for all 4 chrome strings — it is NOT broken (an earlier mid-arc guess that it lacked interactive-export machinery was wrong; it has full extractDeckBundle/renderStandaloneHTML/buildSeoHead). The dry-run caught the wrong-key-names mistake before any file was touched — always dry-run the transform.

Origin: Content Publishing SEO Standardization arc 2026-05-30 (commits: hreflang SoT + auto-derived LIVE_TOOL_SLUGS `406732c0`; tool-page guardrail `1fd99fa5`; publish-wave `72049538`; CLAUDE.md §21 `931a2860`; _seoT 24-app conversion + Phase 5 worksheet deploy `6a3c8ee4`).
