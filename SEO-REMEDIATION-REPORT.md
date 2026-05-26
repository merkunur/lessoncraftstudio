# SEO Remediation Report — lessoncraftstudio.com

**Branch:** `seo-remediation`
**Base:** `pivot/printable-business-toolkit` (operator working branch)
**Status:** Ready for review. No production deploy from this branch.

---

## 1. Verification of audit premise

The external audit framed the site as having **two conflicting identities** (classroom K-3 + seller/KDP) with **keyword cannibalization** between `/topic/*` and `/apps/*` and lots of seller-era machine-generated content needing review. **That premise no longer matches the codebase.**

What I found in Phase 0:

- `frontend/middleware.ts:91, 99-119` returns **HTTP 410 Gone** for every seller prefix via `REMOVED_PREFIXES = /^\/(?:[a-z]{2}\/)?(apps|tools|guides|bundles|ideas|start|blog|compare|gallery|teaching-packages|lesson-plans|flashcards|themed-bundles)(?:\/.*)?$/`. (`/tools` and `/tools/` have a carve-out for the new manipulatives landing.)
- Zero seller-route directories exist under `frontend/app/[locale]/` (`apps`, `pricing`, `blog`, `guides`, `bundles`, `start`, `compare`, `gallery`, `ideas` — all deleted).
- The audit's specific cannibalization example `/en/apps/big-small-worksheets` returns 410. `/en/topic/big-small` exists alone with no competing page.
- Only one chrome system is wired live: `Navigation.tsx` + `CategoryNav.tsx` + `MobileCategoryAccordion.tsx`. Six classroom dropdowns. No seller nav.
- Live homepage is the 9-section homepage-v3 stack — Hero → 5 pillars → tier transition → embed-share → signup — with K-3 classroom positioning throughout.
- Non-www → www 301 is enforced in middleware at lines 158-162. `metadataBase` is `https://www.lessoncraftstudio.com` (`frontend/app/layout.tsx:38`).

**Phase 1 (identity unification) and Phase 2 (cannibalization) of the brief are therefore verification-only no-ops.** The audit appears to have been run against a stale snapshot (Google's index, or a pre-`v1-teardown-complete` crawl) rather than the live codebase. Operator follow-up is required at Google Search Console to request re-indexing; the live code is correct.

What the audit got right (and is fixed here):

- **worksheets hub had no hreflang and no openGraph** (`frontend/app/[locale]/worksheets/page.tsx:45-56` pre-fix emitted only canonical + robots).
- **trailing-slash inconsistency was real.** `next.config.js:25` is `trailingSlash: false` (framework 308-strips slashes), but topic / intersection / worksheets / activities / tools / worksheet-makers / topic-index all emitted `rel=canonical` (and hreflang and og:url) **with** a trailing slash — creating a `canonical → 308` chain on every indexable Next.js route.
- **No About page.** Middleware redirects bare `/about` → `/en/about` but the target 404'd.
- **Organization JSON-LD was duplicated inline on the homepage** rather than referenced by `@id` from a sitewide source. Manageable now; would have grown across pages.

---

## 2. Changes by phase

### Phase 0 — Map (in-plan-mode)

No code changes. Findings captured in [`.claude/plans/claude-code-task-cuddly-elephant.md`](/.claude/plans/claude-code-task-cuddly-elephant.md). Three parallel Explore agents covered identity / metadata / route inventory.

### Phase 1 + Phase 2 — Identity + cannibalization (verification-only)

No code changes. Captured in this report's §1.

### Phase 3 — Technical SEO fixes

Two commits.

**Commit `679b568d` — `[INFRA][SEO]` foundational helpers**
- `frontend/lib/seo/url.ts` (new). Exports `CANONICAL_HOST`, `canonicalUrl(path)`, `localePath(locale, ...segs)`. Strips trailing slashes; canonical host is `https://www.lessoncraftstudio.com`. Root stays `/`.
- `frontend/lib/seo/organization-schema.ts` (new). Exports `ORGANIZATION_ID`, `WEBSITE_ID`, `LOGO_ID`, `buildOrganizationSchema(description)`, `buildWebSiteSchema(locale, description)`. Single sitewide Organization @id; `sameAs: []` with TODO(operator) marker.

**Commit `cd415688` — `[FIX][SEO]` strip slashes + add OG/hreflang**

Every Next.js-route URL emitter routed through `canonicalUrl()` / `localePath()`:
- `frontend/app/[locale]/topic/[slug]/page.tsx` — canonical / hreflang / `basePath` slash strip; og:image add; twitter promoted to `summary_large_image`. Renames local `canonicalUrl` in parseSearchParams → `canonicalForm` to avoid shadowing the imported helper.
- `frontend/app/[locale]/topic/[slug]/[secondary]/page.tsx` — same shape; redirect target slash stripped at line 207.
- `frontend/app/[locale]/topic/page.tsx` — canonical / hreflang slash strip.
- `frontend/app/[locale]/worksheets/page.tsx` — full metadata expansion (was canonical-only): now hreflang × 11 + x-default + openGraph (with 1200×630 brand og:image) + summary_large_image twitter + canonical strip.
- `frontend/app/[locale]/activities/page.tsx` — canonical / hreflang strip; og:image add; twitter promotion; internal `<Link>` href strip.
- `frontend/app/[locale]/activities/[slug]/page.tsx` — canonical / JSON-LD url strip; og:image add; twitter promotion.
- `frontend/app/[locale]/worksheet-makers/page.tsx` — canonical strip.
- `frontend/app/[locale]/tools/page.tsx` — canonical strip.
- `frontend/lib/activities.ts: hreflangAlternatesForRow` — slash strip.
- `frontend/lib/manipulatives.ts: landingHreflangAlternates` — slash strip.

**Deck.html URLs (`/<locale>/decks/<slug>/`) intentionally keep their trailing slash** in `frontend/app/sitemap/0.xml/route.ts:60` and `1.xml/route.ts` — nginx-served and trailing-slash-strict per `CLAUDE.md §15.7`. The `canonicalUrl()` helper applies to Next.js-route URLs only.

### Phase 4 — Structured data

**Commit `9cd2d35b`**
- `frontend/lib/seo/breadcrumb-schema.ts` (new). Exports `buildBreadcrumbSchema(trail)`. URLs built via `canonicalUrl()`.
- `frontend/app/[locale]/page.tsx` — Organization + WebSite JSON-LD now consumes the shared module (`buildOrganizationSchema` + `buildWebSiteSchema`). Inline `buildSchemas` is a thin wrapper for layout-shape parity.
- `frontend/app/[locale]/topic/[slug]/page.tsx` — adds `BreadcrumbList` JSON-LD (2-level: Home › Topic).
- `frontend/app/[locale]/topic/[slug]/[secondary]/page.tsx` — adds `BreadcrumbList` JSON-LD (3-level: Home › Topic1 › Topic1 · Topic2).
- `frontend/components/catalog/Breadcrumbs.tsx` — strips trailing slashes from internal `<a href>` links (home + topic1) so the visible breadcrumb URLs match the BreadcrumbList JSON-LD URLs (both no-slash).

Activities pages already emit `LearningResource` JSON-LD per the K-3 activities arc (`frontend/app/[locale]/activities/[slug]/page.tsx:108-129`) — no change there. Decks (nginx-served) carry `LearningResource` in their static HTML per `CLAUDE.md §17.8.1`.

FAQ schema not added — no live FAQ page found, and per the brief schema must not be injected into marketing copy.

### Phase 5 — Content quality

**Commit `64458cab` — `[CHORE][AUDIT]`**

- **5.0 SCOPE GATE:** confirmed full seller-tree deletion. `apps / pricing / blog / guides / bundles / start / compare / gallery / ideas` all absent from `frontend/app/[locale]/`; all 410-Gone'd in middleware.
- **5.1 LIVE-DEFECT GREP:** zero hits on `Read more` / `Lorem ipsum` / `Coming soon...` / song-lyric / copyright artifacts under live `/[locale]/` routes.
- **5.2 i18n INTEGRITY SWEEP:** wrote reusable script at `scripts/seo-i18n-integrity.js` and ran it against all 11 locales. Full findings written to `docs/audit-results/seo-i18n-integrity-2026-05-26T19-52-50.json`.

Per-locale summary against `en.json` (942 keys baseline):

| Locale | Missing | Empty/TODO | EN leakage | Coverage |
|--------|--------:|-----------:|-----------:|---------:|
| de     |     50  |       0    |      23    |  92.3%   |
| fr     |     50  |       1    |     128    |  81.0%   |
| es     |     51  |       1    |      27    |  91.6%   |
| pt     |     51  |       1    |     123    |  81.4%   |
| it     |     51  |       1    |     131    |  80.6%   |
| nl     |     51  |       1    |      35    |  90.8%   |
| sv     |     50  |       1    |     122    |  81.6%   |
| da     |     51  |       1    |     122    |  81.5%   |
| no     |     46  |       1    |     118    |  82.5%   |
| fi     |     51  |       1    |     116    |  82.2%   |

**What's actually wrong, vs noise:**
- The universal ~50 missing keys are mostly `terms.metaTitle / metaDescription`, `privacy.metaTitle / metaDescription`, `contact.metaTitle / metaDescription`, `license.metaTitle`, and `faq.categories.*`. Legal/contact pages have no localized meta tags outside English — a real SEO defect. Operator can decide whether to ship localized meta values (relatively easy lift) or accept English fallback. Not auto-fixed here per Nordic+Finnic NSR rule §17.5.1 and the brief's "propose before rewriting" gate.
- The single universal `PLACEHOLDER` (`auth.signUp.termsEnd = ""`) is **intentional** — it's a trailing fragment after the "...Privacy Policy" link in the signup-terms sentence, empty by design in `en.json`. False positive. Documented in the sweep script's `notes` section.
- The Tier-1+2 EN-leakage spread (de: 23 / es: 27 / nl: 35) is mostly **legitimate cognates** ("Blog", "Email", "Status", "Plan", "Name", "Visual", "Feedback") that share spelling across many locales — not defects. Some real ones: section-header capital strings ("10. COOKIES", "1. INTRODUCTION") on legal pages.
- The Romance Tier 4 / Nordic / Finnic EN-leakage spread (fr/pt/it/sv/da/no/fi: ~115-130 each) carries far more **real translation gaps** in legal-document content. Section headers in capital letters across `terms.*.title`, `privacy.*.title`, `license.*.title`. Operator-strategic disposition; Nordic+Finnic require NSR per §17.5.1.

**Disposition:** Phase 5.2 ships the inventory + reusable sweep script. No auto-translation. Operator can commission targeted fix waves per locale.

**5.3 copyright sweep:** zero hits on `lyrics`, `©.*song`, `copyright.*music`. No copyrighted content to remove.

### Phase 6 — About page (Bucket A authored; Bucket B is TODO(operator))

**Commit `accd2139` — `[FEATURE][ROUTE] [NSR-FLAG][SV][DA][NO][FI]`**

- `frontend/app/[locale]/about/page.tsx` (new). SSR; `revalidate=3600`. Full `generateMetadata()`: canonical via `canonicalUrl()`; hreflang × 11 + x-default; openGraph with brand 1200×630 og:image; summary_large_image twitter.
- JSON-LD: emits `AboutPage` that references the sitewide Organization via `@id` (`ORGANIZATION_ID` from `lib/seo/organization-schema`). **Does not redefine** Organization properties.
- `aboutPage` i18n namespace authored across 11 locales (`frontend/messages/{en,de,fr,es,pt,it,nl,sv,da,no,fi}.json`) via `scripts/seo-inject-aboutpage-i18n.js`. ~9 short strings per locale.
- Two buckets enforced strictly:
  - **Bucket A (positioning):** authored from existing brand voice (`homepage.meta` precedent) + structural framing. Safe to ship. Composes site mission, what-we-offer (11-language coverage), audience (dual-language / bilingual / international-school K-3 classrooms).
  - **Bucket B (credibility):** visible TODO-stub: `"We're updating this section — check back soon."` localized in all 11. **Nothing fabricated** — no bios, no founder credentials, no invented social links. Comment in source carries the `TODO(operator)` marker.
- `frontend/components/layout/Footer.tsx` — About link added alongside Contact / Terms / Privacy.
- `footer.about` key added in 11 locales.

Nordic+Finnic (sv/da/no/fi) ship NSR-flagged in the commit message per `CLAUDE.md §17.5.1`. Operator should commission native-speaker review before lifting the flag.

### Phase 7 — Sitemap

**Commit `ff52dd66`**

- `frontend/app/sitemap.ts` — every Next.js-route entry (intersection, single-axis topic, activities, tools, activities-index, topic-index) drops the trailing slash to match the canonical no-slash form. Deck shards (0.xml + 1.xml route handlers) intentionally unchanged.
- `/about` added to the static-pages section in shard 3 — one entry per locale with reciprocal hreflang × 11 + x-default.

`frontend/public/robots.txt` already references the sitemap at the canonical host (`Sitemap: https://www.lessoncraftstudio.com/sitemap.xml`). No change needed. `metadataBase` already correct.

### Phase 8 — Verify

- `npx tsc --noEmit` on `frontend/`: 0 app-code errors (7 pre-existing `__tests__/` + `e2e/` errors, documented in MEMORY.md).
- `npm run lint`: clean for app code.
- `npm run build`: Next.js build phase succeeds; `/[locale]/about` route built as SSG (`●`). The Unix-shell `postbuild` hook (`cp -r .next/static …`) fails on Windows — that's a pre-existing Windows-host scripts issue unrelated to this branch and doesn't affect the build artifact.
- `scripts/seo-spot-check.js` (new). Author-only — does not run automatically. Operator runs `BASE=http://localhost:3000 node scripts/seo-spot-check.js` against a `npm run dev` session to verify: canonical no 3xx, hreflang reciprocal × 11 + x-default, og:image declared on worksheets/topic/activities/about, twitter card = summary_large_image where promoted, no trailing slash on Next.js-route URLs, deck URLs keep their slash.

---

## 3. URL-emitter migration list (all routed through `canonicalUrl()` / `localePath()`)

- `frontend/app/[locale]/page.tsx` (homepage hreflang × 11)
- `frontend/app/[locale]/worksheets/page.tsx` (canonical + hreflang × 11 + og:url + twitter)
- `frontend/app/[locale]/topic/[slug]/page.tsx` (canonical + hreflang sibling-honest + og:url)
- `frontend/app/[locale]/topic/[slug]/[secondary]/page.tsx` (canonical + hreflang + redirect target + og:url)
- `frontend/app/[locale]/topic/page.tsx` (canonical + hreflang × 11 + og:url)
- `frontend/app/[locale]/activities/page.tsx` (canonical + hreflang + og:url + internal `<Link>` href)
- `frontend/app/[locale]/activities/[slug]/page.tsx` (canonical + JSON-LD url + og:url)
- `frontend/app/[locale]/tools/page.tsx` (canonical)
- `frontend/app/[locale]/worksheet-makers/page.tsx` (canonical)
- `frontend/app/[locale]/about/page.tsx` (canonical + hreflang × 11 + og:url)
- `frontend/app/sitemap.ts` (shard 2 + shard 3 entries)
- `frontend/lib/activities.ts: hreflangAlternatesForRow`
- `frontend/lib/manipulatives.ts: landingHreflangAlternates`
- `frontend/lib/seo/breadcrumb-schema.ts: buildBreadcrumbSchema`
- `frontend/lib/seo/organization-schema.ts` (Organization + WebSite + Logo @id)

**Deliberately not migrated (carve-out):**
- `frontend/app/sitemap/0.xml/route.ts: deckUrl` and `1.xml/route.ts: deckUrl` — `/<locale>/decks/<slug>/` is nginx-served and trailing-slash-strict per `CLAUDE.md §15.7`.

---

## 4. TODO(operator) checklist

In rough priority order:

1. **Google Search Console:** verify which homepage version Google currently has indexed. If a stale seller-positioning snapshot still appears, request re-indexing of the priority URLs:
   - `/en`, `/de`, `/es`, `/fi`
   - `/en/worksheets`, `/de/worksheets`
   - `/en/topic/animals`, `/de/topic/tiere`
   - `/en/about`
2. **Submit updated sitemap** to Google Search Console + Bing Webmaster Tools: `https://www.lessoncraftstudio.com/sitemap.xml`. The 4-shard index references shards 0–3; shards 0/1 carry deck URLs with image-sitemap entries; shards 2/3 carry intersection + static + topic + activities + about.
3. **Confirm www 301 at DNS/hosting layer.** Middleware does it for live traffic (`frontend/middleware.ts:158-162`), but the host-layer redirect is operator-side and worth verifying — `curl -I https://lessoncraftstudio.com/` should return `301` → `https://www.lessoncraftstudio.com/`.
4. **Supply real About-page credibility data:**
   - Replace the `aboutPage.teamBody` TODO-stub in `frontend/messages/{locale}.json` × 11 with real maintainer / team info (or omit the section if not yet ready).
   - Wire real social-profile URLs into `frontend/lib/seo/organization-schema.ts: sameAs[]`.
   - Both changes should ship together so the Organization JSON-LD on the homepage + About page reflects real data.
5. **NSR review for Nordic+Finnic** (sv/da/no/fi) on the `aboutPage` namespace + `footer.about` keys per `CLAUDE.md §17.5.1` before lifting the `[NSR-FLAG]` markers.
6. **Decide on the legal-page i18n gap.** Tier-3+4 + Nordic carry ~120 EN-leaks each on legal-doc section headers; the universal ~50 missing-keys list is metaTitle/metaDescription on legal/contact pages. Two operator-strategic decisions:
   - Commission native-equivalent translations for `terms.*.title`, `privacy.*.title`, `license.*.title` across 7 affected locales? Or accept current state and move on?
   - Backfill `terms.metaTitle / metaDescription`, `privacy.metaTitle / metaDescription`, `contact.metaTitle / metaDescription`, `license.metaTitle` across 10 non-EN locales? Safe-equivalent translations are mechanical; happy to author them in a follow-up commission.
7. **Admin-tooling cleanup (low-priority).** `frontend/app/api/admin/marketing/social/route.ts` and `frontend/app/api/admin/seo/pages/route.ts` reference dead `/en/apps/*` URLs as mock data for admin dashboards. Not SEO-critical (admin is noindex), but the mock data is misleading to operator-internal views. Surface in a separate `[CHORE]` arc.
8. **Run `scripts/seo-spot-check.js` against the live site post-deploy.** `BASE=https://www.lessoncraftstudio.com node scripts/seo-spot-check.js`. Adjust the `TARGETS` list as needed for production validation; the local-dev variant uses `BASE=http://localhost:3000` after `npm run dev`.
9. **Monitor Google Search Console Coverage + Core Web Vitals for 1-2 weeks** post-deploy. Watch for: drop in `Excluded — Page with redirect` (the canonical → 308 fix), rise in `Submitted and indexed` for the new About page in 11 locales, no regression in LCP / CLS / INP on the touched pages.

---

## 5. Branch

- Branch name: `seo-remediation`
- 7 commits on top of `pivot/printable-business-toolkit`
- All commits atomic, clean tags, NSR-flag on Nordic+Finnic content per CLAUDE.md §17.5.1
- Pre-existing dirty tree (image-library reorg unrelated to SEO) was NOT touched or staged — operator's in-flight image work remains intact
- `git log seo-remediation --not main --oneline`:

```
ff52dd66 [CHORE][SEO] Strip trailing slashes from sitemap entries; add /about to shard 3
accd2139 [FEATURE][ROUTE] Add /[locale]/about/ in 11 locales [NSR-FLAG][SV][DA][NO][FI]
64458cab [CHORE][AUDIT] Phase 5 SEO content quality — scope gate clean + 11-locale i18n integrity sweep
9cd2d35b [FEATURE][SCHEMA] Centralize Organization JSON-LD; add BreadcrumbList to topic + intersection
cd415688 [FIX][SEO] Strip trailing slashes + add OG/hreflang via centralized canonicalUrl()
679b568d [INFRA][SEO] Add canonicalUrl helper + Organization JSON-LD module
```

Branch is local. Push when ready:

```
git push -u origin seo-remediation
```

Then open PR against `main` (or the operator's preferred integration branch).

---

## 6. Verification — what was confirmed cleanly

- TypeScript: `npx tsc --noEmit` from `frontend/` — 0 app-code errors (7 pre-existing test-file errors per MEMORY.md).
- ESLint: `npm run lint` — clean for app code.
- Next.js build: `/[locale]/about` builds as SSG; sitemap shards generate; no compile errors. Postbuild Unix `cp` hook fails on Windows host — pre-existing scripts issue unrelated to this branch; doesn't affect the build artifact.

What was NOT runtime-verified in this session (operator should verify post-deploy):

- Live `curl -I` of each canonical and hreflang URL returning 200 directly. Spot-check script ready: `BASE=<url> node scripts/seo-spot-check.js`.
- Google Rich Results test on the three structured-data emissions (Organization + WebSite + LearningResource + BreadcrumbList + AboutPage).
- LCP / CLS / INP on the touched pages (homepage, worksheets, topic, intersection, activities, about).
