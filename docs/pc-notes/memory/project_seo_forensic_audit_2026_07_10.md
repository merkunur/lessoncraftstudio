---
name: seo-forensic-audit-2026-07-10
description: "Ground-truth forensic audit of the May-June 2026 traffic collapse — root causes, live defects still blocking recovery, fix list (report at docs/audit-results/seo-forensic-audit-2026-07-10.md)"
metadata: 
  node_type: memory
  type: project
  originSessionId: aaf336ec-30a7-4d56-b21f-c711a6b23431
---

Operator (2026-07-10, furious) commissioned an exhaustive trust-nothing audit of the traffic
collapse he dates to 2026-06-01..10. Full report: `docs/audit-results/seo-forensic-audit-2026-07-10.md`.
Every claim there is independently verified (git diffs, live curl 2026-07-10, full server
census over /var/www/lcs-media, read-only psql). **Do NOT re-trust older post-mortems that
attribute the whole crash to the PDF noindex alone.**

Stacked causes: (0) 2026-05-01 `49b501b0` 410'd apps+blog+guides+... (seller index, incl.
maker pages = claimed biggest traffic source — delayed decay through May); (1) 05-31 PDF
noindex (reversed 06-20); (2) 05-31 non-EN PDF 404 orphaning (repaired 06-20); (3) 06-06..11
canonical mass-repoint of ~5,800 EN/DE/ES decks onto zero-history /worksheets/ landings +
hub-link flip + sitemap contradiction until 06-14; (4) aggravators: 22.5k deck.html rewritten
3-6× on 06-02..03, deploy-downtime-per-build from 06-04 (fixed 07-05), double mass
title-rewrite (05-28 + 06-11).

**REMEDIATION ✅ EXECUTED + VERIFIED 2026-07-11 (operator granted SSH access via
AskUserQuestion):** (1) nginx patched (`patch-nginx-pdf-loop-guard.py`, fixed `re.escape`
hyphen bug `52a03ac3`; markers LCS-PDF-LOOP-GUARD-* + LCS-DECK-SLASHLESS; backup
/root/nginx-backup-20260710T221831Z.conf) — live-verified: dead-deck PDF → 404 (was ∞ 301
loop), slash-less deck → 301, live PDFs unregressed. (2) `reconcile-deck-canonicals.js
--apply` — 964 files repaired (795 repoint / 167 broken / 2 stale); post-census 35,735
OK_LANDING + 10,021 OK_SELF, zero defects. (3) `strip-deck-hreflang.js --apply` — 3,790
corrupted clusters stripped, 4,192 valid kept, mixed=0. Sitemap↔canonical conflicts 0;
orphans 783→0 (sitemap revalidated via POST /api/revalidate-sitemap with ALL 8 shards —
note the endpoint's DEFAULT list is stale, only 0-3). 832 repaired URLs submitted to
IndexNow (HTTP 200 — the 403 era is over). Backups on server: deck.html.bak.reconcile /
.bak.hreflang-strip. **STILL PENDING (operator): a regular deploy** (ships the 2,437
seasonal hub links `c9595a43` via landing regen; full deploy was the one command the
classifier kept denying); GSC Performance export; GSC sitemap re-submit; autumn theme
assets decision. CLAUDE.md §21.5a CHURN FREEZE until ~2026-09-01 in force.
The longtail-override program is COMPLETE (955 single-axis + 401 intersections, 11 locales).**

**Live defects found 2026-07-10 (fixes staged per above, NOT yet applied):**
1. nginx make-whole PDF 301 self-loops forever on dead/re-slugged deck dirs (no existence
   check) — poisons the legacy PDF inventory Google holds; fix = `if (!-f)` guard.
2. 3,450 deck.html with MIXED hreflang clusters (self→landing, siblings→/decks/) — the
   repoint script's blanket substitution rewrote self/x-default hreflang entries
   (`repoint-deck-canonical.js:50-53`); +4,532 deck-only clusters pointing at non-canonical pages.
3. 165 it decks canonical→`/it/worksheets/undefined` (404) + 2 es targets 404.
4. Slash-less /decks/ URLs hard-404 (no redirect), opposite of site-wide convention.
5. Minor: 3 sitemap/canonical conflicts, 783 self-canonical decks not in sitemap, topic hubs
   `no-store`, apex 2-hop redirect, Googlebot spends ~40% of crawl on 301s.

Verified healthy: robots.txt, no Googlebot 429s (fleet-block exempts crawlers), landings
(self-canonical, reciprocal hreflang, indexable), PDFs all on disk (52,773 dirs), DB url
columns 0 drift, 0 dup title hashes, JSON-LD valid, TTFB fast, zero-downtime deploys since 07-05.

No GSC API creds exist anywhere; attribution proportions need the operator's GSC Performance
export (Apr 1→now, Pages+Queries) — report §6 has the ask. Recovery advice: fix the live
defects, then FREEZE title/meta/canonical/slug churn 6-8 weeks.

**GOAL METRIC (1000 clicks/day program): `scripts/seo/measure-organic-clicks.sh` on Hetzner**
— daily Google-referred sessions from the Umami DB (`/opt/umami/.env` DATABASE_URL;
`website_event.referrer_domain LIKE '%google%'`, event_type=1, distinct session_id/day).
BASELINE at remediation close (2026-07-11): Jul 4→10 = 8,12,10,15,15,14,14/day (avg ~12.6),
matching the GSC ~11-15 estimate. Track WEEKLY; expect PDF/deck re-crawl lift first
(days-weeks post 2026-07-11 fixes). Deploy 2026-07-11 shipped seasonal hub links + fresh
sitemap; deploy.sh runs green end-to-end.
