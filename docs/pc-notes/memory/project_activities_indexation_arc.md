---
name: project-activities-indexation-arc
description: "2026-07-22 arc — why activities/worksheets/tools weren't getting impressions and the de-orphan + sitemap + cross-link fixes shipped"
metadata: 
  node_type: memory
  type: project
  originSessionId: 85c15e09-a528-475d-b1d6-aa64a4491d80
  modified: 2026-07-22T18:45:05.551Z
---

**2026-07-22 — activities/worksheets/tools indexation arc (all shipped + verified live).**

**Root-cause correction (operator was right; my earlier "thin content/crawl" claim was WRONG):**
- `/worksheets` + `/tools` 0-impressions = the operator's **GSC temporary prefix-removal requests** (submitted to hide business-era content), now cancelled. NOT a content/code defect. Verified live: 30,078 worksheets landings + all 616 tool/maker landings (23 tools + 33 makers ×11) are 200 / no-noindex / self-canonical / honest hreflang; robots.txt has no `/worksheets`|`/tools` disallow. Origin-200 + 0-impressions = the GSC-removal signature.
- The `/tools` prefix is in `middleware.ts REMOVED_PREFIXES` (410) with a carve-out for `LIVE_TOOL_SLUGS` (auto-derived from `messages/{tool,maker}-content/*.json`). All legit tools are carved out — no code change needed for tool indexability.

**Activities were a DIFFERENT problem (not GSC-removed): indexable-but-orphaned + authority-gated.** Fixes shipped:
1. `258b6b54` — crawlable all-activities directory on `/[locale]/activities` (grade→strand, links every in-locale activity; en 194/de 175) + header dropdown 6→10.
2. `5f5918c8` — **dedicated activities sitemap `/sitemap/8.xml`** (1,113 URLs) split out of the mixed shard 3. `app/sitemap.ts generateSitemaps()` returns `[{id:2},{id:3},{id:8}]`; `id===8` branch emits activities only; `app/sitemap.xml/route.ts SITEMAP_SHARD_IDS` includes 8. (GSC dev-serving quirk: generateSitemaps shards 404 in `npm run dev` but pre-render fine in prod.)
3. `db792381` + `9fe5e344` — additive **body-only "Related activities" links** from indexed surfaces into the activity tier (head/canonical/title/JSON-LD untouched = §21.5a churn-safe):
   - Topic hubs (SSR): educational-level hubs get a grade-matched `RelatedActivitiesStrip` (new `listActivitiesByGrade` in `lib/activities.ts` + `components/activities/RelatedActivitiesStrip.tsx`). Standards hubs already link all matching activities (unchanged).
   - Worksheets landings (static gen `scripts/seo-landing/render-landing-html.js`): "Interactive activities to try" section, match CCSS `landing.standard`→`activity.alignment.code` first, else canonical strand + grade; subset varied by slug-hash. **KEY GOTCHA: non-EN `landing.strand` is the LOCALIZED domain (fr "Nombres et calculs") — derive the raw-English strand from the universal CODE, never string-match localized strand.** Requires a landing re-render on Hetzner (`node scripts/seo-landing/render-landing-html.js`, ~21s, all 11 locales → `/var/www/lcs-media/landings`). Coverage en 1233/3793, fr 778/2701; readiness/strand-only landings self-skip.

**GSC state after fixes:** a sampled activity went `unknown to Google` → `Crawled – currently not indexed`; `/sitemap/8.xml` recognized as a referring sitemap; referring pages detected. Remaining barrier = authority-gated selective indexing on the crash-recovering domain (forensic audit + churn freeze). Levers: operator **Request Indexing** (flips good pages), the internal links now shipped, + authority recovery over weeks. Activity pages are NOT thin (~1000 words + LearningResource/FAQPage/AlignmentObject schema).

Full blow-by-blow: plan file `C:\Users\rkgen\.claude\plans\your-major-arguments-about-shimmying-thimble.md`. Related: [[project_seo_forensic_audit_2026_07_10]], [[project_crawl_budget_collapse_2026_07]], [[project_worksheets_like_topic_levers]].
