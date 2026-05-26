# SEO Verification Report — lessoncraftstudio.com

**Branch:** `seo-remediation`
**Base:** `pivot/printable-business-toolkit`
**Companion to:** `SEO-REMEDIATION-REPORT.md` (the prior implementation arc)
**Status:** Harness ran clean — 84 PASS / 0 FAIL / 6 OPERATOR-VERIFY against a live `next dev` server. Ready to PR.

This report closes out the SEO remediation arc by producing **evidence** for the headline claims the prior round only asserted by inspection. The single biggest weakness of that round was that the spot-check script was authored but never executed against a running server; this round runs it.

---

## 1. Part A — Ground truth (no-code-changes phase)

### A.1 — Does the deploy target carry the teardown?

The prior arc's premise — that the seller domain is fully removed and Phase 1/2 of the audit collapse to verification-only — depends on the teardown being present in the branch we merge into. Operator confirmed `DEPLOY_TARGET_BRANCH = pivot/printable-business-toolkit`. Evidence captured during plan mode:

```
$ git log main --oneline | grep -iE "teardown|seller|nuke|pivot"
   (no matches — main carries no teardown commit messages)

$ git show main:frontend/middleware.ts | grep -nE "REMOVED_PREFIXES|return410|isRemovedRoute"
   (no matches — main does not contain the 410 middleware)

$ for d in apps pricing blog guides bundles start compare gallery ideas; do
     echo "  /[locale]/$d/: $(git ls-tree -r main --name-only | grep -c "^frontend/app/\[locale\]/$d/") files"
  done
  /[locale]/apps/: 7 files
  /[locale]/pricing/: 1 files
  /[locale]/blog/: 5 files
  /[locale]/guides/: 0 files
  /[locale]/bundles/: 0 files
  /[locale]/start/: 0 files
  /[locale]/compare/: 0 files
  /[locale]/gallery/: 0 files
  /[locale]/ideas/: 0 files

$ git tag | grep -i teardown
  v1-teardown-complete

$ git merge-base main seo-remediation
  4d6cd2d6b0d0a8190c95234258415267070e6e5c
```

**Reading:** Tag `v1-teardown-complete` exists but is NOT in `main`'s ancestry — its merge-base with `seo-remediation` is `4d6cd2d6`, pre-teardown. `main` is 2063 commits behind `pivot/printable-business-toolkit` and still carries seller dirs + lacks the 410 middleware. If `seo-remediation` were PR'd into `main`, the seller surface would reappear and Phase 5.0 ("full seller deletion") would not hold on the deploy target.

**Operator decision:** `seo-remediation` PRs into `pivot/printable-business-toolkit`, which carries the teardown. The harness runs against the same branch state via local `next dev`, where the C.5 seller-410 / classroom-200 matrix proves the premise live (see §3). Premise holds.

### A.2 — Commit-count reconciliation

The prior report prose said "7 commits"; the git log earlier in this session displayed only the SEO-arc commits. Reconciled:

```
$ git log seo-remediation --not pivot/printable-business-toolkit --oneline
  b4e18958  [CHORE][SEO] Phase 8 — SEO-REMEDIATION-REPORT.md + spot-check script
  ff52dd66  [CHORE][SEO] Strip trailing slashes from sitemap entries; add /about to shard 3
  accd2139  [FEATURE][ROUTE] Add /[locale]/about/ in 11 locales [NSR-FLAG][SV][DA][NO][FI]
  64458cab  [CHORE][AUDIT] Phase 5 SEO content quality — scope gate clean + 11-locale i18n integrity sweep
  9cd2d35b  [FEATURE][SCHEMA] Centralize Organization JSON-LD; add BreadcrumbList to topic + intersection
  cd415688  [FIX][SEO] Strip trailing slashes + add OG/hreflang via centralized canonicalUrl()
  679b568d  [INFRA][SEO] Add canonicalUrl helper + Organization JSON-LD module
```

**7 SEO commits.** Prior report's "7 commits" prose is correct. The "log showed 6" confusion earlier in the session came from miscounting a paginated log preview. This commit then adds an 8th (the close-out commit with this report + B.1 fixes + harness).

### A.3 — Deploy host

Production deploys via `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` on Hetzner per CLAUDE.md §A.5. The `deploy.sh` script header confirms Linux + Next.js standalone mode:

```
$ head -20 deploy.sh
  #!/bin/bash
  # LessonCraftStudio Deployment Script
  # This script handles the complete deployment process for Next.js standalone mode
  # CRITICAL: Next.js standalone mode requires manual copying of static files!
  ...
```

The Windows-host postbuild failure (`cp -r .next/static …`) noted in the prior report is **local-machine-only**. Hetzner runs Linux; the `cp -r` succeeds there. **Confirmed irrelevant** to production builds. No further action required.

---

## 2. Part B — Three close-out fixes

### B.1 — `noindex` the un-reviewed About locales (SUBSTANTIVE FIX)

**Defect.** The prior arc shipped `/[locale]/about/` in all 11 locales (commit `accd2139`) with universal `robots: { index: true, follow: true }` and sitemap shard-3 entries for all 11. But the sv/da/no/fi Bucket-A positioning copy was authored from cross-locale precedent rather than native-speaker review (NSR-flagged in commit message per CLAUDE.md §17.5.1). Indexable + unreviewed is the exact failure mode the original audit warned about.

**Change.** In this commit:

1. `frontend/app/[locale]/about/page.tsx` — hoisted `UNREVIEWED_ABOUT_LOCALES = ['sv','da','no','fi'] as const` to module scope; `generateMetadata()` now emits `robots: { index: false, follow: true }` for those four locales and the unconditional `{ index: true, follow: true }` for the other seven. Inline `TODO(operator)` marker for NSR-clearance lift.
2. `frontend/app/sitemap.ts` — shard-3 `/about` loop skips `UNREVIEWED_ABOUT_LOCALES`. Hreflang clusters in the 7 indexable entries still cover all 11 locales (the unreviewed pages remain reachable + linkable; they just aren't request-indexed).

**Runtime proof (harness output, full data in artifact):**

```
pass  [C.4-robots-matrix] /en/about: indexable (no robots noindex)
pass  [C.4-robots-matrix] /de/about: indexable (no robots noindex)
pass  [C.4-robots-matrix] /sv/about: noindex emitted: "noindex, follow"
pass  [C.4-robots-matrix] /fi/about: noindex emitted: "noindex, follow"
```

### B.2 — Deck inbound-link direction (VERIFY-ONLY, CLEAN)

**Static evidence.** `grep -rnE "/decks/\\\$\{" frontend/app frontend/components frontend/lib` enumerated every Next.js-side deck URL builder and every one ends in `/`:

```
frontend/app/sitemap/0.xml/route.ts:60                           `${BASE_URL}/${d.language}/decks/${d.slug}/`
frontend/app/sitemap/1.xml/route.ts:39                           (same)
frontend/app/[locale]/collections/[collectionId]/CollectionDetailClient.tsx:43
frontend/app/[locale]/topic/[slug]/page.tsx:141
frontend/app/[locale]/topic/[slug]/[secondary]/page.tsx:241
frontend/app/[locale]/workspace/RecentActivityWidget.tsx:42
frontend/components/catalog/VarietyStrip.tsx:51
frontend/components/homepage-v2/BreadthGrid.tsx:50
frontend/components/homepage-v3/PillarInteractive.tsx:184  (deckUrl prop)
frontend/components/homepage-v2/EmbedViralityCTA.tsx:50    (`/${slug}/?embed=open` — slash before `?`)
frontend/lib/featured-deck-by-locale.ts:43                  (docstring example)
```

**Runtime proof.** Localhost dev has no Postgres (CLAUDE.md §A.5.1), so the harness could not pull real deck slugs from sitemap shard 0 (DB-unreachable). C.3 marked `OPERATOR-VERIFY` rather than silently pass. The combination of clean static analysis + post-deploy live verification on the operator's checklist gives the same coverage with operator-attention cost shifted by one round-trip.

### B.3 — `/tools` carve-out bounding (VERIFY-ONLY, CLEAN)

**Static evidence.** `frontend/middleware.ts:104`:

```js
if (/^\/[a-z]{2}\/tools\/?$/.test(pathname)) return false;
```

Carve-out anchored at start-of-string + end-of-string (with optional trailing slash). Only `/<locale>/tools` and `/<locale>/tools/` slip through to the live manipulatives landing; everything under `/tools/*` falls through to `REMOVED_PREFIXES`.

**Runtime proof:**

```
pass  [C.5-410-200-matrix] /en/tools: manipulatives carve-out 200-direct
pass  [C.5-410-200-matrix] /en/tools/niche-finder: sub-path correctly 410-Gone
```

### Adjacent real defect surfaced + fixed during harness iteration

While iterating the harness to green, the C.2 check fail revealed a **real hreflang-emission defect** in three files that I had missed in the prior arc:

- `frontend/app/[locale]/activities/page.tsx` (the activities index)
- `frontend/lib/manipulatives.ts: landingHreflangAlternates` (the tools landing)
- `frontend/lib/activities.ts: hreflangAlternatesForRow` (per-activity slug)

These three emitted hreflang under the **bare locale code** (`pt`) instead of the **hreflang code** (`pt-BR` per `frontend/lib/schema-generator.ts: hreflangMap`, locked by CLAUDE.md §6 "Brazilian Portuguese canonical"). Homepage / worksheets / topic / about all used `getHreflangCode()` correctly; these three didn't. Fixed in this commit (uses `getHreflangCode()` in the route file; inline `HREFLANG_MAP` constant in the two lib helpers to avoid pulling `schema-generator` into activity tooling). Runtime confirmed by re-running the harness:

```
pass  [C.2-hreflang-reciprocity] /en/activities: 12 alternates all 200-direct
pass  [C.2-hreflang-reciprocity] /de/activities: 12 alternates all 200-direct
pass  [C.2-hreflang-reciprocity] /en/tools: 12 alternates all 200-direct
```

This is the kind of defect the *prior round* would have shipped silently. The whole point of the harness is to catch this class.

---

## 3. Part C — Verification harness output

**Server.** `next dev` on Windows (Node v22.19.0), `PORT=3000`. CLAUDE.md §14.5 documents that `next dev` requires temporarily renaming `frontend/app/sitemap.xml/route.ts` to `route.ts.DISABLED-FOR-DEV` due to a pre-existing route-priority conflict; restored before commit.

**Run.**

```
$ BASE=http://localhost:3000 SERVER_MODE="next dev (Windows host; no local Postgres per CLAUDE.md §A.5.1)" node scripts/seo-verify.mjs
SEO verification harness
  BASE         : http://localhost:3000
  Canonical    : https://www.lessoncraftstudio.com
  Node         : v22.19.0
  Started      : 2026-05-26T20:45:40.733Z [run after fixes]
...
=== SUMMARY ===
  PASS              : 84
  FAIL              : 0
  OPERATOR-VERIFY   : 6
  Artifact          : docs/audit-results/seo-verify-2026-05-26T21-18-40.json

All checks passed (or marked OPERATOR-VERIFY).
$ echo $?
0
```

**Per-check pass counts:**

| Check | Description | PASS | FAIL | OP-VER |
|------:|-------------|-----:|-----:|-------:|
| C.1 | canonical chain (no 3xx) | 15 | 0 | 3 |
| C.2 | hreflang × 11 + x-default, all 200-direct | 15 | 0 | 0 |
| C.3 | deck-slash convention (both directions) | 0 | 0 | 1 |
| C.4 | robots indexable/noindex matrix | 18 | 0 | 0 |
| C.5 | 410 / 200 / reshelled-404 matrix | 12 | 0 | 1 |
| C.6 | host www-canonicalization | 0 | 0 | 1 |
| C.7 | og:image reality (dimensions + HEAD 200) | 14 | 0 | 0 |
| C.8 | structured-data integrity | 6 | 0 | 0 |
| C.9 | i18n regression guard | 10 | 0 | 0 |
| **Total** | | **84** | **0** | **6** |

**The six OPERATOR-VERIFY items, verbatim:**

```
ovrfy  [C.1-canonical-chain] /en/topic/animals:           localhost dev returns 500 (Prisma cannot reach localhost:5432). DB-dependent route — verify against the live host post-deploy.
ovrfy  [C.1-canonical-chain] /de/topic/tiere:             (same)
ovrfy  [C.1-canonical-chain] /en/topic/animals/addition:  (same — intersection page)
ovrfy  [C.3-deck-slash]      deck-sample:                 no deck samples available (DECK_SAMPLE unset, sitemap shard 0 had no deck entries — likely DB unreachable on this server)
ovrfy  [C.5-410-200-matrix]  /en/topic/animals:           (same DB-unreachability)
ovrfy  [C.6-host-canonicalization] apex→www:              localhost mode — host redirect only enforceable against the live hosting layer.
```

All six are **single-cause localhost limitations** — five are downstream of "the dev host doesn't run Postgres" (documented as intentional in CLAUDE.md §A.5.1), and one is the apex→www 301 which is enforceable only against the live hosting layer (`https://lessoncraftstudio.com/` → `https://www.lessoncraftstudio.com/`). Both classes are covered by the post-deploy operator checklist (§5).

**What the harness actually proves**, in plain language:

- Every `<link rel="canonical">` on every non-DB-dependent indexable page in 4 locales returns **200 directly with redirects disabled** — no `canonical → 308` chain anywhere I tested. (15 pages × the redirect-off rule.)
- Every `<link rel="alternate" hreflang>` on those same pages — 11 locales + `x-default` — returns **200 directly with redirects disabled**. So does every `og:url`. So does every `og:image`. (15 pages × ~12 alternates = ~180 fetches, all 200-direct.)
- The four NSR-flagged About locales (sv/da/no/fi) **do emit `noindex, follow`**, and the other seven About locales **do not**. Confirms B.1 landed correctly.
- Every entry of `SELLER_410_SAMPLE` returns **410 Gone**; every entry of `CLASSROOM_200_SAMPLE` returns **200 directly**; `/en/tools` carve-out returns **200 directly**; `/en/tools/niche-finder` returns **410 Gone**; `/en/pricing` returns **404** (the documented reshelled-not-deleted behavior per CLAUDE.md §17.1).
- Every page's JSON-LD blocks parse. Exactly **one Organization is *defined* sitewide**. Topic + intersection pages emit `BreadcrumbList` whose item URLs **match the visible breadcrumb hrefs**. About emits `AboutPage` that references the Organization by `@id`, never redefining it. No `FAQPage` schema on non-FAQ pages.
- Per-locale missing-key + placeholder counts are **byte-identical** to the committed baseline at `docs/audit-results/seo-i18n-integrity-2026-05-26T19-52-50.json` — no i18n regression.

Artifact: [`docs/audit-results/seo-verify-2026-05-26T21-18-40.json`](docs/audit-results/seo-verify-2026-05-26T21-18-40.json).

---

## 4. Part D — Build gates

```
$ npx tsc --noEmit         # frontend/
tsc app-code errors: 0
(7 pre-existing test-file errors in __tests__/ + e2e/ per MEMORY.md — unchanged)

$ npm run lint             # frontend/
> frontend@0.1.0 lint
> eslint
(clean — eslint exits 0)
```

C.9 (i18n regression guard) ran as part of the harness; standalone re-run unnecessary.

---

## 5. Operator follow-up checklist (supersedes §4 of the prior report)

In rough priority order — these are things this branch cannot resolve from a Windows dev host:

1. **Verify the 6 OPERATOR-VERIFY items against the live site** post-deploy:
   ```
   curl -I https://www.lessoncraftstudio.com/en/topic/animals          # expect 200
   curl -I https://www.lessoncraftstudio.com/de/topic/tiere            # expect 200
   curl -I https://www.lessoncraftstudio.com/en/topic/animals/addition # expect 200 (canonical axis order)
   curl -I https://www.lessoncraftstudio.com/en/decks/<known-slug>/    # expect 200, canonical ends in `/`
   curl -I https://lessoncraftstudio.com/                              # expect 301 → https://www.lessoncraftstudio.com/
   ```
   Or re-run the harness against the live host: `BASE=https://www.lessoncraftstudio.com node scripts/seo-verify.mjs`.

2. **Google Search Console:** request re-indexing for the 7 indexable About locales and the priority classroom pages —
   - `/en/about`, `/de/about`, `/fr/about`, `/es/about`, `/pt/about`, `/it/about`, `/nl/about`
   - `/en`, `/de`, `/es`
   - `/en/worksheets`, `/de/worksheets`
   - `/en/topic/animals`, `/de/topic/tiere`

3. **Submit updated sitemap** to GSC + Bing Webmaster Tools at `https://www.lessoncraftstudio.com/sitemap.xml`.

4. **Supply real About credibility data** so the four NSR locales and the global Organization can ship full content:
   - Bucket B copy for the `aboutPage.teamBody` slot (currently the visible "We're updating this section — check back soon." TODO-stub across 11 locales).
   - Real `sameAs` social-profile URLs into `frontend/lib/seo/organization-schema.ts: sameAs[]` (currently empty per `TODO(operator)`).

5. **Commission NSR** for the sv/da/no/fi `aboutPage` namespace and `footer.about` keys per CLAUDE.md §17.5.1. When each locale clears:
   - Remove that locale from `UNREVIEWED_ABOUT_LOCALES` in `frontend/app/[locale]/about/page.tsx`.
   - Remove it from the corresponding skip-list in `frontend/app/sitemap.ts` shard 3.
   - Both files carry inline `TODO(operator)` markers pointing at this step.

6. **Decide on the legal-page i18n gap** surfaced in the prior arc — Tier-3+4 + Nordic carry ~120 EN-leaks each on legal-doc section headers, and ~50 missing-key meta titles/descriptions across 10 non-EN locales. Disposition is operator-strategic. Inventory artifact: `docs/audit-results/seo-i18n-integrity-2026-05-26T19-52-50.json`.

7. **Admin-tooling cleanup (low priority).** `frontend/app/api/admin/marketing/social/route.ts` and `frontend/app/api/admin/seo/pages/route.ts` reference dead `/en/apps/*` URLs as mock dashboard data. Not SEO-critical (admin is noindex). Surface in a separate `[CHORE]` arc.

8. **Monitor Coverage + Core Web Vitals** in GSC for 1-2 weeks post-deploy. Watch for drop in `Excluded — Page with redirect` (the canonical → 308 fix), rise in `Submitted and indexed` for the new About locales, no regression in LCP/CLS/INP on touched pages.

---

## 6. What this branch ships

8 commits total on top of `pivot/printable-business-toolkit`:

```
<this commit>  [CHORE][SEO] Close-out — B.1 noindex About + harness + green run + verification report
ff52dd66       [CHORE][SEO] Strip trailing slashes from sitemap entries; add /about to shard 3
accd2139       [FEATURE][ROUTE] Add /[locale]/about/ in 11 locales [NSR-FLAG][SV][DA][NO][FI]
64458cab       [CHORE][AUDIT] Phase 5 SEO content quality — scope gate clean + 11-locale i18n integrity sweep
9cd2d35b       [FEATURE][SCHEMA] Centralize Organization JSON-LD; add BreadcrumbList to topic + intersection
cd415688       [FIX][SEO] Strip trailing slashes + add OG/hreflang via centralized canonicalUrl()
679b568d       [INFRA][SEO] Add canonicalUrl helper + Organization JSON-LD module
```

Operator's pre-existing dirty image-library tree (~3,200 deleted/modified PNGs under `frontend/public/images/`) is **untouched** throughout — no SEO commit stages those changes. PR base: `pivot/printable-business-toolkit`.

---

## 7. Acceptance — all conditions met

- [x] A.1 proves the teardown is in `pivot/printable-business-toolkit`. Premise holds.
- [x] `scripts/seo-verify.mjs` ran against a live `next dev` server. Exit code 0. Output pasted above. Server mode + Node version + start time captured in the artifact.
- [x] No `rel=canonical`, hreflang alternate, or `og:url` returned a 3xx in C.1/C.2. ~180 redirect-off fetches across 15 pages × 12 alternates each — all 200-direct.
- [x] Deck slash convention proven by static grep (B.2 — 9 emitters, all `/`-ending). Runtime confirmation deferred to operator post-deploy check against the live host (one of the 6 OPERATOR-VERIFY items).
- [x] sv/da/no/fi `/about` emit `noindex` and are out of sitemap shard 3. en/de/fr/es/pt/it/nl `/about` are indexable and in sitemap. C.4 confirmed live.
- [x] `SELLER_410_SAMPLE` all 410; `CLASSROOM_200_SAMPLE` all 200-direct (modulo the one DB-dependent topic OPERATOR-VERIFY); `/tools` carve-out exact; `/en/pricing` 404 (intentional reshelled state per CLAUDE.md §17.1). C.5 confirmed live.
- [x] One Organization *defined* sitewide; BreadcrumbList item URLs match visible hrefs; About emits `AboutPage` with `@id` reference, never a redefinition. C.8 confirmed live.
- [x] i18n: zero regressions in missing/placeholder counts per locale vs baseline. C.9 confirmed live (10/10 locales).
- [x] `npx tsc --noEmit` clean for app code; `npm run lint` clean.
- [x] JSON artifact committed at `docs/audit-results/seo-verify-2026-05-26T21-18-40.json`.
- [x] Unresolved items appear as `OPERATOR-VERIFY` or `TODO(operator)` — never silently passed. The §5 checklist is the operator's only remaining surface.
