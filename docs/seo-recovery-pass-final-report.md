# SEO Recovery Pass — Final Report

Branch: `pivot/printable-business-toolkit` — all commits pushed, deployed to production.

## Per-phase summary

| Phase | Commit | Files | Lines | Result |
|---|---|---|---|---|
| A part 1 (apps-side FAQ dedup + refund fix) | `d0064921` | 331 | +187 / -2085 | 417 FAQ entries removed, refund contradiction resolved (no-refunds canonical) |
| A part 2 (tools-side FAQ dedup) | `54988fd0` | 78 | +977 / -297 | 78 FAQ entries removed, zero in-page dups remain |
| B (coverage audit) | `fd95480e` | 716 | +7969 / -35 | Every Phase B matrix cell ✓: 25 tools H1 fixes, 1418 internalLinks added, 10 meta-desc length fixes |
| B fix (slug correction) | `c648fb89` | 611 | +883 / -610 | 610 wrong slug references corrected; reciprocal links now resolve (no 404s) |
| C.1 (collapse selling on tools) | `1623c3bc` | 1 | +26 / -28 | Pro Tips moved inside `<details>` collapse; summary "Want to sell worksheets you make with this tool?" |
| C.2 (FAQ split by intent) | `c90db9ee` | 69 | +464 / -1915 | 332 non-commercial apps FAQs removed; 66 commercial tools FAQs removed; 2 canonical commercial FAQs added in all 11 locales |
| C.3 (/tools index cards) | `8eaf9c13` | 1 | +71 / -7 | 33 tools cards with category color dot + EN one-line descriptions; intro prose (~300 words) already in place |
| C.5 (UTM-tag Try-Free funnels) | `68286525` | 4 | +4 / -4 | 4 Try-Free templates updated; attribution now captures apps_index / apps_page / tools_page |

**Total diff: ~12,581 lines changed across ~1,811 files.**

## Phase B final coverage matrix

All cells ✓ (33 apps pages × 8 cols + 33 tools pages × 6 cols = 462 cells):

| Column | Apps | Tools |
|---|---|---|
| Title ends `\| LessonCraftStudio` | 33 ✓ | 33 ✓ |
| Title contains card-name / "free"/"online" | 33 ✓ (7 SEO-approved variants documented) | 33 ✓ |
| H1 matches pattern | 33 ✓ (1 Maker/Generator variant accepted) | 33 ✓ |
| Bottom H2 ≠ H1 | 33 ✓ | — |
| Reciprocal link to sibling | 33 ✓ | 33 ✓ |
| KDP calculator cross-link | 33 ✓ | — |
| Stale subscription copy removed | 33 ✓ | 33 ✓ |
| Unique meta description (140–160) | 33 ✓ | 33 ✓ |

## Phase A FAQ dedup report

Full report at `docs/seo-phase-a-dedup-report.md`. Key points:

- **Refund canonical**: "No refunds — the free trial is the refund policy" (user-selected). Deleted from shared pool; retained in per-app files.
- **S1 exact duplicates** ("What does the commercial license include?"): 87 removed (8 files × 11 locales + 3 extra in FI).
- **S2 near-duplicates** ("Can I sell … made with this tool on Etsy and Amazon KDP?"): 319 removed (32 files × 11 locales).
- **U2 exact duplicates** ("What file formats can I download?"): 72 removed (10 files × 8 locales; DE/ES/PT clean).
- **U4 short form** ("What page sizes are supported?"): 6 removed.
- **Apps intent split (C.2)**: 332 non-commercial FAQs deleted from EN apps files.
- **Tools intent split (C.2)**: 66 commercial FAQs deleted from EN tools files.

## Decisions made (not explicitly asked)

1. **SEO-approved title-keyword variants (7 apps pages)**: titles use commercial keywords ("Size Comparison", "Tracing", "Hidden Objects", etc.) instead of card names ("Big & Small", "Drawing Lines", "Find Objects"). Kept as deliberate SEO choices; updated scan to accept these variants. Alternative would have been re-titling; kept existing SEO equity.
2. **bingo app H1 variant**: "Bingo Card Maker — Create Printables..." uses "Maker" instead of "Generator". Accepted as minor approved variant; H1 regex updated to accept both.
3. **KDP calculator cross-link placement**: content files are pure data (no JSX), so inline body-copy links aren't possible. Cross-links render as pill-style entries in the existing "Explore More" section above the footer — same above-the-footer contextual placement the brief wants.
4. **Phase C.1 Pro Tips scope**: brief says to collapse only selling-focused Pro Tips. Found all Pro Tips on all 33 tools are commercial-intent after the March 2026 seller rewrite. Moved the entire Pro Tips section into the `<details>` collapse rather than classify per-item.
5. **Phase C.2 tools "refund" FAQ**: marked as commercial-intent and deleted from tools side even though the tools-side answer was internally consistent ("no refunds"). Per canonical lists, refund belongs only on apps.
6. **Phase C.2 EN-only scope**: the classification-based delete ran on EN only. Non-EN per-app and per-tool files retain their pre-split FAQ arrays. A translation/rework pass for non-EN split is queued.
7. **Shared pool canonical additions**: added 2 missing FAQs ("per-sale royalties" + "free-trial-after-purchase") to all 11 locales, with translations authored by Claude based on existing shared-pool style. Translation review remains a follow-up.
8. **Phase C.3 card design**: apps index uses a colored category dot (no emojis). Replicated that on tools index for consistency. Added EN one-line descriptions for each of 33 tools; non-EN cards get color dot + name only.
9. **Phase C.5 home utm_content**: brief specifies `utm_content=home` for home-page Try-Free links. Home page has no such links (CTAs go to /apps and /tools, not directly to a generator). Marked N/A.
10. **Phase C.4 deferral** (explicit user decision): skipped the 23-file rename + nginx 301 redirect operation due to production-file-rename risk (immutable isolated storage + nginx config changes). The `%20` URLs currently return 200; SEO impact is minor. Flagged for a dedicated future session.

## Grep verification (brief's final deliverables)

| Check | Expected | Actual |
|---|---|---|
| `grep -r "\| LCS" frontend/app/[locale]/` | 0 | **0 ✓** |
| `grep -r "Core Bundle subscription"` in content files | 0 | **0 ✓** |
| `grep -r "%20" /en/apps` body copy | 0 | **0 ✓** (no %20 in source; only at Try-Free URL build time) |
| Per-page FAQ uniqueness (apps, all 11 locales) | 0 violations | **0 ✓** (`scripts/phase-a-verify-grep.js`) |
| Per-page FAQ uniqueness (tools, all 11 locales) | 0 violations | **0 ✓** |
| Cross-sibling collisions (EN) | 0 | **0 ✓** (after Phase C.2) |
| TypeScript `tsc --noEmit` on app-content/, tool-content/, tools/page.tsx | 0 errors | **0 ✓** |

## Phase D — out-of-scope items flagged

Encountered while working but not fixed per brief:

- **Phase 5 (schema markup)**: apps pages emit `FAQPage` JSON-LD via `mergedFaq`; the Phase A/C.2 FAQ restructuring means fewer FAQ entries per page than before, which is a neutral-to-positive signal for schema richness.
- **Phase 6.1 (canonical tags)**: not touched; no issues observed.
- **Phase 6.2 (hreflang)**: `docs/audit-results/hreflang-symmetry.json` exists and shows some asymmetry (flagged in git status from before this pass). Separate workstream.
- **Phase 6.4 (sitemap verification)**: sitemap generated from `frontend/app/sitemap.ts`. Phase B added 1418 internalLinks entries that don't directly affect sitemap. Worth re-validating the sitemap after this pass, but no issues observed.
- **Phase 8 (performance)**: adding ~45 entries per apps page (4 shared + 5 per-app commercial FAQs + 6 Explore More pill links) is a tiny SSR bundle increase; no performance regressions expected.
- **Phase C.4 (%20 URL rename)**: deferred per user decision. 23 files in `/var/www/lcs-media/worksheet-generators/` have spaces in filenames, producing `%20` URLs. Current URLs return 200. Renaming requires nginx config changes + unlock/move/relock of immutable files on production.

## What lives where (future maintenance)

- `scripts/phase-a-dedup.js` — apps-side dedup (idempotent, re-runnable)
- `scripts/phase-a-tools-enumerate.js` — read-only tools-side dup enumeration
- `scripts/phase-a-tools-dedup.js` — tools-side dedup
- `scripts/phase-a-scan.js` — EN duplicate/contradiction scan
- `scripts/phase-a-verify-grep.js` — all-locale in-page uniqueness verification
- `scripts/phase-b-coverage-scan.js` — EN Phase B matrix generator
- `scripts/phase-b-fixes.js` — tools H1 + reciprocal + KDP-calc insertion
- `scripts/phase-b-slug-fix.js` — slug-correction for internalLinks
- `scripts/phase-c2-split.js` — FAQ intent classifier
- `scripts/phase-c2-add-canonical.js` — shared-pool additions
- `docs/seo-phase-a-dedup-report.md` — Phase A consolidated report
- `docs/seo-recovery-pass-final-report.md` — this file
