---
name: project-crawl-focus-landings-over-pdfs
description: "Why the July-1 index jump + 0 impressions; the PDF-cache lever shipped to reclaim crawl for landings; SiteGuru \"broken pages\" are a Cloudflare false positive"
metadata: 
  node_type: memory
  type: project
  originSessionId: 48bc9529-fbcd-4850-a3ea-778a761e73bc
  modified: 2026-07-21T09:40:48.666Z
---

# Focus Google's crawl on landings, not PDFs (2026-07-21)

Diagnostic thread off [[project-crawl-budget-collapse-2026-07]], driven by operator GSC screenshots.

## Answers established (evidence, not theory)
- **July-1 index jump 12K→33K = a sitemap-plumbing fix, NOT demand.** The landing sitemap shard had grown to **66.7 MB** (> Google's 50 MB/file limit → rejected whole); commit `cfa641d4` (06-26) split it into 4 compliant shards, unblocking ~30K landing URLs → Google indexed the bulk ~July 1. Binary on→off = the clean step. The jump is the `/worksheets/` landings.
- **Indexed but ~0 impressions = indexing ≠ ranking.** GSC "Why not indexed" (12.3K): **9,070 "Discovered – never crawled"** (crawl starvation, ≈ the ~9,752 landing-less decks that get **0** Googlebot fetches; trend rising) + **3,081 "Crawled – not indexed"** (quality rejection) + ~168 misc. The 33K indexed sit just above the quality bar → ranked low → 0 impressions. Low authority + 30K near-templated footprint + incumbent niche.
- **PDF hypothesis CONFIRMED at the crawl level.** GSC Crawl Stats: **By file type PDF 48% / HTML 33%**; **By purpose Discovery 70% / Refresh 30%**; ~14% wasted on 301/404 (origin logs show **~34%** of Googlebot fetches are non-200). Google spends ~half its collapsed budget on the ~91K PDFs (2/deck, indexable since 06-20) → starves the HTML. The impressions the site DOES earn very likely come from PDFs (a non-sitemap surface). PDFs are NOT in the sitemap (0 across all 8 shards) → the sitemap-filtered "33.2K indexed" are landings/decks, never PDFs.

## What SHIPPED (Tier 1, operator-approved, churn-freeze-safe, reversible)
- **1a PDF cache TTL 300s → 30d (2592000).** `/etc/nginx/sites-enabled/lessoncraftstudio` lines **257/268/296/309** (the 4 PDF blocks); deck.html (240) + PNG catch-all (321) LEFT at 300s. Reclaims the 48% PDF re-crawl **without** de-indexing (protects printable-pdf clicks, §17.8.20). Verified origin: PDF `max-age=2592000` + conditional GET → `304`; html/png unchanged. Backup `/root/lcs-nginx-backup-20260721-084043.conf`. Documented in `docs/ops/cloudflare-hardening.md §5` (commit after this). ⚠ nginx config is server-side, NOT git; §A.14.11 discipline (nginx -t, no .bak in sites-enabled).
- **1b crawl-waste = investigated, NO action (self-healing).** The ~34% non-200 is Google re-crawling OLD/removed URLs from memory, to which the site already returns correct 301 (renamed PDFs, old /apps//blog/) / 410 (teardown prefixes) / 404 (never-real landings). **No live internal-link source feeds it** — deck.html has 0 PDF links, the hub doesn't link old /apps/, topic/landings don't link the bad `contagem-em-grafico-4-de-julho-<hash>` slugs (20 distinct, not in sitemap, not in pt.json). Forcing changes would risk breaking working redirects. Decays on its own.

## SiteGuru "broken pages" = FALSE POSITIVE (no SEO impact)
Every "broken link" is a **403, not 404**, from **Cloudflare bot management** at the edge (`Server: cloudflare`+`CF-RAY`) challenging SiteGuru's JS-less crawler — the exact managed-challenge behavior documented in `docs/ops/cloudflare-hardening.md §4`. Origin nginx has **no 403 rules** (only rate-limit→429). Pages serve **200** to real browsers + Googlebot (origin logs: **12,132 Googlebot 200s, 0 403s** → Google verified/unaffected). Optional-only fix: Cloudflare allowlist for audit-tool UAs.

## "PDFs replace the decks" (operator's own diagnosis, CONFIRMED 2026-07-21)
4 indexable URLs/worksheet (deck.html, /worksheets/ landing, printable.pdf, answer-key.pdf). Architecture is CORRECT (deck.html canonicals → landing; robots.txt symmetric; no noindex on decks). It's pure **crawl allocation**: Googlebot 10d = **387 PDF fetches vs 59 landing vs 0 deck.html** → the PDF is what gets indexed/shown. Same root as the 0 impressions (HTML not crawled). Fix = shift crawl to landings (Tier 1 + Tier 3) + drop the redundant answer-key PDF (Tier 2), NEVER kill the printable (it earns the clicks). PDF→landing rel=canonical is the "formal" fix but ONLY after landings rank (else lose the clicks).

## Tier 2 SHIPPED 2026-07-21 — answer-key PDF noindex
`scripts/publish-cli/patch-nginx-answerkey-noindex.py` (idempotent, brace-aware, backup+nginx -t+reload) added `X-Robots-Tag: noindex` to the **2 answer-key blocks ONLY**. Verified: answer-key.pdf → 200 + `x-robots-tag: noindex` + max-age=2592000; **printable.pdf → 200, NO X-Robots-Tag (indexable, clicks safe)**; deck.html untouched; re-run idempotent. Backup `/root/lcs-nginx-backup-answerkey-20260721-090514.conf`. Doc `cloudflare-hardening.md §6`. ⚠ NEVER run `patch-nginx-pdf-noindex.py` (noindexes ALL pdfs incl. printables = the May crash). Monitor GSC: "Excluded by noindex" rises ~answer-key count, printable clicks must stay flat (revert if they drop).

## Tier 3 SHIPPED 2026-07-21 — feed the high-crawl 2-segment /topic pages into the landings
Measured: the 2-segment `/topic/<a>/<b>` pages are the MOST-crawled surface (6,446 Googlebot fetches/10d vs 2,419 single-axis) but linked ~2 landings (`/topic/math/kindergarten`) while thousands exist. Added a compact server-rendered "More worksheets in this topic" `<a>`-link block to BOTH 2-segment render paths (subject×grade hub + theme/exercise×level intersection) in `app/[locale]/topic/[slug]/[secondary]/page.tsx`. New `landingsForIntersection()` in `landing-content.ts` composes the existing byTheme/byType/byLevel facets; shared `components/topic/TopicLandingLinks.tsx` (11-locale inline heading). Live-verified: `/topic/math/kindergarten` 2→62, animals×kindergarten 52, de/mathe/1-klasse 62, es 53, nl 27, sv 59. ⚠ **TWO locale traps fixed:** (1) landing `coordinate.level` is LOCALIZED per locale (de="1-klasse" not "grade-1"; theme+type are canonical) → convert via `getAxisSlug('educational-level',key,locale)`; (2) the landing program RE-DERIVES level bands per locale (§22.3: de has NO "kindergarten" band, EN-kindergarten→de vorschule) → `landingsForIntersection` FALLS BACK to theme/type-only when a level yields 0. All 11 locales have canonical theme/type landings (verified) so the block populates everywhere a valid 2-seg page exists. Additive links only (churn-safe). Commits after the Tier-2 answer-key work. Crawl PRIORITIZATION signal (pairs with Tier 1's freed budget); not a budget increase.

## Deferred (operator's call)
- **noindex ALL PDFs = NO** (documented crash cause §17.8.20). Only reconsider printables if GSC Performance (clicks by page: printable.pdf vs /worksheets/ vs /topic/) shows printables now earn ≈0 — never blind.
- **Optional follow-on:** extend the same TopicLandingLinks block to the single-axis `/topic/[slug]/page.tsx` (already ~23 landings via deck cards; lower priority). Cloudflare allowlist for SiteGuru/Ahrefs (dashboard, if operator wants audit tools).
- **Tier 3** — densify `/topic/`-hub→landing links (crawl follows links; hubs get the most crawl).
- Re-measure at **task #29 (~Jul 26)**: "Discovered – not indexed" should stop rising; PDF % of crawl should fall, HTML % rise; landing crawl in logs should increase.
- Full plan: `C:\Users\rkgen\.claude\plans\there-is-something-seriously-splendid-reef.md`.
