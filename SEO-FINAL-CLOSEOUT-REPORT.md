# SEO Final Close-Out — lessoncraftstudio.com

**Branch:** `seo-remediation` (11 commits on top of `pivot/printable-business-toolkit`)
**Companion to:** `SEO-REMEDIATION-REPORT.md` (implementation arc) + `SEO-VERIFICATION-REPORT.md` (verification arc).
**This report:** close-out — splits Phase 1 into honest verified-now / not-yet-observed rows; documents the single-edit NSR-lift mechanism; tracks the `main` divergence as a separate decision; gives the operator a release-gate checklist for the PR.

The prior round's failure mode was treating "implemented" as "verified" and letting deferred items vanish into reports nobody reopens. This round honors the operator's hard rule — **"exit 0 against the wrong environment is not proof"** — by labeling everything observed against current-prod or staging as `PASS-observed-<date>`, everything observed against localhost as `OPERATOR-VERIFY`, and everything that requires post-deploy proof as `NOT-YET-OBSERVED` with the verbatim command staged.

---

## §1 — Phase 1 verification (multi-row, never collapsed)

| Row | Check | Status | Where observed | Evidence |
|---|---|---|---|---|
| **1A.1** | C.6 apex → www (HTTP) | **PASS — observed against live prod, 2026-05-26** | `curl http://lessoncraftstudio.com/` | `301` → `https://www.lessoncraftstudio.com/` |
| **1A.2** | C.6 apex → www (HTTPS) | **PASS — observed against live prod, 2026-05-26** | `curl https://lessoncraftstudio.com/` | `301` → `https://www.lessoncraftstudio.com/` |
| **1A.3** | C.6 www self-check | **PASS — observed against live prod, 2026-05-26** | `curl https://www.lessoncraftstudio.com/en` | `200` direct, no redirect |
| **1A.4** | C.1 home `/en` canonical | **PASS — observed against live prod, 2026-05-26** | prod baseline probe | canonical `/en` (no slash) → 200 direct |
| **1A.5** | C.1 dynamic-route canonical chain (`/worksheets`, `/topic/<slug>`, `/activities`) | **BASELINE — defect captured 2026-05-26 (pre-deploy); flipped POST-DEPLOY (see 1B.1)** | prod baseline probe (5 of 5 surveyed) | canonical-with-slash → `308` → no-slash. The exact defect this branch fixed. |
| **1B.1** | C.1 dynamic-route fix confirmation (canonical resolves 200-direct on the 5 baseline-defect rows) | **PASS — observed against live prod, 2026-05-27** | `node scripts/seo-verify.mjs` after deploy | All 5 rows flipped: canonical now no-slash → 200 direct. See diff in §1B below. |
| **1B.2** | B.2 deck runtime — slash-form `/<locale>/decks/<slug>/` → 200 direct; deck canonical ends in `/` | **PASS — observed against live prod, 2026-05-27** | C.3 deck-slash in post-deploy harness | `/en/decks/word-scramble-easy-beach/` + `/it/decks/cruciverba-colori-753f/` both 200-direct with `/`-ending self-canonical. |
| **1B.3** | Full harness sweep against prod (C.1–C.9, 103 checks) | **PASS — observed against live prod, 2026-05-27** | post-deploy harness run, exit 0 | 103 PASS / 0 FAIL / 0 OPERATOR-VERIFY. Every prior dev-mode ovrfy resolved. Artifact: `docs/audit-results/seo-verify-prod-postdeploy-2026-05-27.json`. |

### 1A artifact
`docs/audit-results/seo-verify-prod-baseline-2026-05-26.json` — 6 representative URLs probed against current prod with `redirect: 'manual'`. Captures the 5 BASELINE-defect rows verbatim:

```
/en              → canonical=/en (no slash)              → 200 direct ✓ (already correct on prod — homepage was the one route pre-branch)
/en/worksheets   → canonical=/en/worksheets/  (slash)    → 308 → /en/worksheets   (defect)
/de/worksheets   → canonical=/de/worksheets/             → 308                    (defect)
/en/topic/animals → canonical=/en/topic/animals/         → 308                    (defect)
/de/topic/tiere   → canonical=/de/topic/tiere/           → 308                    (defect)
/en/activities    → canonical=/en/activities/            → 308                    (defect)
```

### 1B — Post-deploy run (executed 2026-05-27)

Command actually run:

```
BASE=https://www.lessoncraftstudio.com \
SERVER_MODE="prod post-deploy 2026-05-27" \
ARTIFACT_DIR=docs/audit-results \
node scripts/seo-verify.mjs

→ exit 0 — All checks passed.
  103 PASS / 0 FAIL / 0 OPERATOR-VERIFY
  Artifact: docs/audit-results/seo-verify-prod-postdeploy-2026-05-27.json
```

The 5 baseline-defect rows — before/after diff against `seo-verify-prod-baseline-2026-05-26.json`:

| URL | Before (2026-05-26) | After (2026-05-27) |
|---|---|---|
| `/en/worksheets` | canonical=`/en/worksheets/` → **308** → `/en/worksheets` | canonical=`/en/worksheets` → **200 direct** ✓ |
| `/de/worksheets` | canonical=`/de/worksheets/` → **308** | canonical=`/de/worksheets` → **200 direct** ✓ |
| `/en/topic/animals` | canonical=`/en/topic/animals/` → **308** | canonical=`/en/topic/animals` → **200 direct** ✓ |
| `/de/topic/tiere` | canonical=`/de/topic/tiere/` → **308** | canonical=`/de/topic/tiere` → **200 direct** ✓ |
| `/en/activities` | canonical=`/en/activities/` → **308** | canonical=`/en/activities` → **200 direct** ✓ |

Additional live-prod confirmations from the same post-deploy run:

- C.3 deck-slash both directions: `/en/decks/word-scramble-easy-beach/` + `/it/decks/cruciverba-colori-753f/` → 200 direct with `/`-ending self-canonical.
- C.4 robots matrix: `/sv/about` + `/fi/about` emit `noindex, follow`; the other 7 `/about` are indexable.
- C.5 410/200 matrix: seller paths 410, classroom paths 200, `/tools` carve-out intact, `/en/pricing` reshelled 404.
- C.6 apex→www: `301` confirmed at hosting layer.
- C.8 structured data: One Organization defined sitewide; BreadcrumbList matches visible breadcrumb hrefs; AboutPage references Organization by `@id`.
- C.9 i18n regression guard: 10/10 locales PASS — no missing/placeholder regression vs baseline.

**The headline guarantee — `rel=canonical` resolves 200-direct on Next.js routes — is now proven against live prod, not believed.** Hetzner Linux deploy via `bash /opt/lessoncraftstudio/deploy.sh` exited 0. Deploy-side smoke: 72 edge seller-410 + 44 classroom-200 + deck route serves correctly.

---

## §2 — Phase 2: Single source of truth for NSR-pending /about locales

### Refactor

`frontend/config/locales.ts` now exports `NSR_PENDING_LOCALES: readonly SupportedLocale[]` alongside `SUPPORTED_LOCALES`. Concept-named so the mechanism generalises past `/about`. The route-named `unreviewed-about-locales.ts` was **not** created.

Two consumers import directly and use `.includes()` — no re-filtering, no re-derivation:

- `frontend/app/[locale]/about/page.tsx` `generateMetadata()` → `robots: { index: false, follow: true }` when the locale is in the array.
- `frontend/app/sitemap.ts` shard-3 `/about` loop → entry emitted iff the locale is NOT in the array.

The harness (`scripts/seo-verify.mjs`) lives outside Next.js TS module resolution; mirrors the constant by comment-anchored convention (same pattern as `HREFLANG_MAP`) with an explicit "keep in sync" note.

### Dry-run proof — one-edit-flips-both, demonstrated

Three captures against localhost dev, in order. Status quo → lift one locale → revert:

```
PRE-edit:    NSR_PENDING_LOCALES = ['sv','da','no','fi']
             sitemap shard 3 <loc> /about entries (n=7):
               de, en, es, fr, it, nl, pt
             robots /about:
               en/de/fr/es/pt/it/nl = "index, follow"
               sv/da/no/fi          = "noindex, follow"

LIFTED-FI:   NSR_PENDING_LOCALES = ['sv','da','no']   ← one element removed
             sitemap shard 3 <loc> /about entries (n=8):
               de, en, es, FI, fr, it, nl, pt        ← /fi/about appeared
             robots /about:
               en/de/fr/es/pt/it/nl = "index, follow"
               FI                   = "index, follow" ← flipped from noindex
               sv/da/no             = "noindex, follow"

REVERTED:    NSR_PENDING_LOCALES = ['sv','da','no','fi']  ← restored
             sitemap shard 3 <loc> /about entries (n=7):
               de, en, es, fr, it, nl, pt              ← /fi/about gone
             robots /about:
               fi back to "noindex, follow"
             ALL other locales unaffected throughout.
```

**Both consumers — sitemap inclusion and About-page robots — moved together in response to the single SoT edit.** Mechanism proved.

Artifacts:
- `docs/audit-results/seo-verify-nsr-dryrun-pre-2026-05-26.json`
- `docs/audit-results/seo-verify-nsr-dryrun-lifted-fi-2026-05-26.json`
- `docs/audit-results/seo-verify-nsr-dryrun-reverted-2026-05-26.json`

Commit: `bb90ea8f [REFACTOR][SEO] Single source of truth for NSR-pending /about locales`.

---

## §3 — Phase 3: Admin mock-data cleanup

Two admin dashboard mocks no longer reference dead URLs or seller-era brand language:

- `frontend/app/api/admin/marketing/social/route.ts` — 6 mock posts. `/en/apps`, `/en/apps/word-search`, `/en/apps/crossword` (all 410-Gone) replaced with `/en/worksheets`, `/en/topic/wordsearch`, `/en/topic/crossword`. Content strings rewritten classroom-neutral.
- `frontend/app/api/admin/seo/pages/route.ts` — 4 mock `PageSEO` entries. `/en/apps/word-search`, `/en/apps/math-puzzles` replaced with `/en/topic/wordsearch`, `/en/topic/math-puzzle`. The `/en/pricing` entry (reshelled 404 per CLAUDE.md §17.1) dropped entirely — admin dashboards shouldn't exemplify it as an SEO target. `/en/about` and `/admin` entries unchanged. Seller-era strings ("Professional Printable Generators", "Etsy & KDP", "commercial license") rewritten classroom-neutral.

No invented metrics. Engagement / score numbers retained but are obviously synthetic. Admin is `noindex` per middleware, so this is a hygiene fix.

Commit: `f4e6a78b [CHORE][SEO] Refresh admin SEO/marketing mocks to live classroom URLs`.

---

## §4 — Phase 4: `main` reconciliation plan (plan-only)

`main` is 2,063 commits behind `pivot/printable-business-toolkit`, still carries seller route dirs (`apps/` 7 files, `pricing/` 1 file, `blog/` 5 files), and has zero `REMOVED_PREFIXES` middleware. `main` is an unexploded landmine: any hotfix branched off it, any fresh clone, any CI job keyed to it silently undoes the teardown.

`docs/MAIN-RECONCILIATION-PLAN.md` (committed in `8f3d5da7`) documents:

- Divergence facts verbatim from plan-mode git probes.
- Risk scenarios (hotfix branched from main, fresh clone, CI keyed to main).
- Three options with tradeoffs:
  - (a) Replace `main` with the pivot lineage (force-update).
  - (b) Reconciliation merge (preserves history; heavy conflict surface).
  - (c) Retire `main`, rename pivot as the new default (broadest external-reference change).
- The load-bearing banner at the top of the doc:

> **Must be a dedicated effort, gated on operator decision, never coupled to a feature/SEO PR.** Reconciliation has a different risk profile from this branch's SEO work and must not share a blast radius with it.

`RUN_MAIN_RECONCILIATION` stayed `false`. No merge, no rebase, no branch surgery in this PR.

---

## §5 — Phase 5: Operator-data placeholders, still open

Both `TODO(operator)` markers from the prior arc remain in place and discoverable. No fabrication.

1. **About credibility (Bucket B)** — `aboutPage.teamBody` is a localized TODO-stub in all 11 message files. Verified:

```
da.json : "Vi opdaterer dette afsnit — kom snart tilbage."
de.json : "Wir aktualisieren diesen Abschnitt — bald gibt es mehr."
en.json : "We're updating this section — check back soon."
es.json : "Estamos actualizando esta sección — vuelve pronto."
fi.json : "Päivitämme tätä osiota — palaa pian."
fr.json : "Nous mettons à jour cette section — à très vite."
it.json : "Stiamo aggiornando questa sezione — torna presto."
nl.json : "We werken deze sectie bij — kom snel terug."
no.json : "Vi oppdaterer denne delen — kom tilbake snart."
pt.json : "Estamos atualizando esta seção — volte em breve."
sv.json : "Vi uppdaterar det här avsnittet — kom tillbaka snart."
```

When the operator supplies real maintainer/team info, replace across all 11 (NSR for sv/da/no/fi locales).

2. **`Organization.sameAs`** — `frontend/lib/seo/organization-schema.ts:13,43` carries both a docstring TODO and an inline-comment TODO above `sameAs: []`. Wire real social-profile URLs when supplied; ship the homepage + About `@id` Organization update together.

---

## §6 — Phase 6: Operator-strategic checklist (no code)

External actions Claude Code cannot perform from a dev host:

- **Google Search Console + Bing Webmaster Tools**
  - Verify which homepage version is currently indexed (the prior arc's audit caught a stale snapshot).
  - Request re-index of priority URLs once `seo-remediation` deploys:
    - `/en`, `/de`, `/es`, `/fi`
    - `/en/worksheets`, `/de/worksheets`
    - `/en/topic/animals`, `/de/topic/tiere`
    - The **7 indexable** `/about` locales: `/en/about`, `/de/about`, `/fr/about`, `/es/about`, `/pt/about`, `/it/about`, `/nl/about`.
  - Submit the updated sitemap: `https://www.lessoncraftstudio.com/sitemap.xml`.

- **Legal-page i18n disposition** (strategic decision)
  - ~50 universal missing keys: `terms/privacy/contact/license` metaTitle/metaDescription across 10 non-EN locales.
  - Tier-3/4 + Nordic EN-leakage (~115–130 keys per locale): mostly legal-doc section headers (`terms.*.title`, etc.).
  - Inventory artifact: `docs/audit-results/seo-i18n-integrity-2026-05-26T19-52-50.json`.
  - Decision: commission native translations, or accept English fallback. The **metaTitle/metaDescription** subset is mechanical/safe-equivalent and can be backfilled in a follow-up Claude Code commission — flag, don't author unasked.

- **Native review of sv/da/no/fi `aboutPage` + `footer.about`**
  - Once each locale clears, **remove from `NSR_PENDING_LOCALES` in `frontend/config/locales.ts`**. One edit, both consumers flip (the dry-run in §2 proves this). The page becomes indexable AND its sitemap entry restores in the same commit.

- **`main` reconciliation** — per Phase 4 plan (`docs/MAIN-RECONCILIATION-PLAN.md`). Separate decision, separate PR, never coupled to this branch.

- **Post-deploy monitoring (1–2 weeks)**
  - `Excluded — Page with redirect` should fall in GSC Coverage (the canonical-chain fix flushing through).
  - The 7 indexable `/about` locales should appear in Coverage / Submitted-and-indexed.
  - No LCP / CLS / INP regression on touched pages.

- **Caveat for the operator (operator-awareness, not action)**
  - Technical SEO going green is the floor, not the ceiling. Content depth, backlink growth, and time govern ranking. This branch fixes technical signals — it does not move rankings on its own. The prior arc's homepage-V3 + 11-locale content work, the catalog growth from K-3 activities arc, and the embed-virality flywheel are what move rankings; this close-out makes sure they're not silently undermined by canonical/hreflang/sitemap defects.

---

## §7 — Release-gate checklist (for the PR description)

Release-gate completed 2026-05-27:

1. ✅ **Merged** `seo-remediation` into `pivot/printable-business-toolkit` via fast-forward (operator-authorized GO; PR skipped per operator preference for path A). New pivot HEAD: `ad8a00ed`. Rollback SHA captured pre-merge: `6e203974`.
2. ✅ **Pushed** `pivot/printable-business-toolkit` to origin.
3. ✅ **Deployed** via `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` on Hetzner. Exit 0. Deploy-side smoke: 72 seller-410 + 44 classroom-200 + deck route serves; 2 pre-existing image-asset warnings unrelated to this branch.
4. ✅ **Phase 1B harness ran post-deploy against live prod** — exit 0; 103 PASS / 0 FAIL / 0 OPERATOR-VERIFY. The 5 baseline-defect rows flipped (see §1B table above).
5. ✅ **Apex→www confirmed at hosting** by the harness's C.6 check during the same post-deploy run.

**Still tracked, separately:**
- **NSR lift (one-edit):** when sv/da/no/fi About-page native-speaker review clears for any locale, remove that locale from `NSR_PENDING_LOCALES` in `frontend/config/locales.ts`. The dry-run in §2 proves both consumers flip from that single edit. No second edit anywhere.
- **`main` reconciliation:** open a dedicated `[CHORE][REPO]` arc per `docs/MAIN-RECONCILIATION-PLAN.md`. Never bundle with feature work.
- **GSC re-index requests** per §6.

---

## §8 — Build gates + branch state

- Phase 0 pre-flight: all six gates green (clean tree, rollback SHA captured, i18n no regression, tsc + lint clean, merge-tree clean, teardown in base).
- `npx tsc --noEmit` clean for app code (7 pre-existing test-file errors documented in MEMORY.md — unchanged).
- `npm run lint` clean.
- C.9 i18n regression guard: 10/10 locales PASS against committed baseline both pre-deploy (gate 0.3) and post-deploy (harness §1B).
- Operator's pre-existing dirty image-library tree untouched throughout — merged unmodified into `pivot/printable-business-toolkit` for the operator's separate WIP to continue.

**Final shipped state:**

```
pivot/printable-business-toolkit
@ ad8a00ed [CHORE][SEO] Close-out — Phase 1A prod baseline + Phase 2 dry-run + final report
   8f3d5da7  [DOCS] main reconciliation plan (plan-only; no merge)
   f4e6a78b  [CHORE][SEO] Refresh admin SEO/marketing mocks to live classroom URLs
   bb90ea8f  [REFACTOR][SEO] Single source of truth for NSR-pending /about locales
   2168a3ee  [CHORE][SEO] Close-out — B.1 noindex About + harness + green run + verification report
   b4e18958  [CHORE][SEO] Phase 8 — SEO-REMEDIATION-REPORT.md + spot-check script
   ff52dd66  [CHORE][SEO] Strip trailing slashes from sitemap entries; add /about to shard 3
   accd2139  [FEATURE][ROUTE] Add /[locale]/about/ in 11 locales [NSR-FLAG][SV][DA][NO][FI]
   64458cab  [CHORE][AUDIT] Phase 5 SEO content quality — scope gate clean + 11-locale i18n integrity sweep
   9cd2d35b  [FEATURE][SCHEMA] Centralize Organization JSON-LD; add BreadcrumbList to topic + intersection
   cd415688  [FIX][SEO] Strip trailing slashes + add OG/hreflang via centralized canonicalUrl()
   679b568d  [INFRA][SEO] Add canonicalUrl helper + Organization JSON-LD module
   6e203974  ← ROLLBACK_SHA (pivot HEAD before merge; what we'd reset to on emergency rollback)
```

Deployed live 2026-05-27 via `bash /opt/lessoncraftstudio/deploy.sh` on Hetzner Linux. **The headline canonical-chain guarantee is now PASS-observed against live prod.**
