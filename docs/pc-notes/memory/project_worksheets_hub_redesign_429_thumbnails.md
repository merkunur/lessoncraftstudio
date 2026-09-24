---
name: project-worksheets-hub-redesign-429-thumbnails
description: Worksheets hub → Direction A faceted catalog + variety interleave; broken-thumbnail root cause = nginx per-IP burst=40 swallowing /_next/image (fixed via carve-out)
metadata: 
  node_type: memory
  type: project
  originSessionId: 621d7bac-9e15-4880-b87c-ecad9343937e
---

# Worksheets hub redesign + 429-broken-thumbnails fix (2026-07-06, commit `62e996fb`, LIVE)

## The broken-thumbnails root cause (proven, not guessed)
Intermittent broken thumbnails on /worksheets AND /activities ("different subset each refresh") were **HTTP 429 from the bot-defense rate limit** (`limit_req zone=lcsperip rate=8r/s burst=40` in `location /`, patch-nginx-bot-limits.py 2026-07-03). `/_next/image` has no extension → fell into the rate-limited catch-all; a 60-84-image page paint + `<Link>` `_rsc` prefetch storm overflowed burst=40 → random-subset 429s. Live proof: access.log 131 429s/min from the operator's own Chrome; error.log `excess: 40.x by zone "lcsperip"`. Activities previews were the same class until the 2026-07-06 `/mini-tools/` static carve-out.

**Standing trap: ANY new extension-less endpoint that proxies through `location /` inherits burst=40.** If a page fans out many requests to such an endpoint, carve it out (the `lcsasset` zone, 50r/s, is the asset-fan-out zone: /mini-tools/ burst=300, /api/play/ 300, /api/studio/ 120, /_next/image 300).

**Fix stack (all live):**
1. `scripts/publish-cli/patch-nginx-next-image-limits.py` — idempotent carve-out `location /_next/image { limit_req zone=lcsasset burst=300 nodelay; proxy_pass … }` before `location /`. **Structurally guarded (operator demanded more than a memory note, 2026-07-06):** `scripts/ops/verify-nginx-contract.sh` asserts the load-bearing nginx blocks (this carve-out + /mini-tools/ alias + lcsperip/lcsasset zones + @next_static_miss) AND behaviorally probes a 120-request single-curl `--parallel` burst for zero 429. Wired twice: (a) **deploy.sh runs it with `--heal` every deploy** (re-applies missing blocks via the idempotent patch scripts, nginx -t + reload inside); (b) **lcs-status runs it read-only** → lcs-watchdog cron (5 min) greps its `!!!` lines into /var/log/lcs-alerts.log. Negative-tested end-to-end on prod: restored the pre-carve-out config → checker flagged BOTH layers (grep + 79/120 429s) → `--heal` restored + full green. **Probe lessons: xargs-spawned curls spread arrivals over seconds (8r/s drain hides a broken config — probe MUST be one `curl --parallel`); after a heal, sleep ~3s or the probe measures the OLD nginx workers** (empirical false 39/80).
2. `next.config.js images.minimumCacheTTL: 2678400` (31d — thumbnails immutable per slug-version; default 60s forced constant sharp re-encodes + origin re-hits).
3. Page frugality: 24 card images/page (first 6 eager, rest lazy), `prefetch={false}` on worksheet + activity catalog card Links; the old ~60 per-type image tiles are now text chips.
Verified: 73-concurrent burst (page + 72 optimizer variants) = 73×200, 0×429; puppeteer via Cloudflare = 0 responses ≥400.

## The redesign (worksheets hub = activities-catalog pattern)
- `frontend/app/[locale]/worksheets/page.tsx` — Direction A faceted catalog (breadcrumb, Baloo2/Nunito per-route fonts, sticky Level/Type/Theme rail, sort pills, active chips, paper-card grid, pagination, then a "Browse by exercise type" text-chip strip → /topic/ pages [crawl equity], then PageUsageBlock). generateMetadata/JSON-LD/hreflang/canonical preserved from the old page.
- **Shared components:** `frontend/components/catalog/CatalogFilters.tsx` (generalized from ActivityCatalogFilters — paramKey widened to string, FacetGroupVM.footer for "Show all themes", CatalogSortControl.defaultValue strips ?sort= at default). `ActivityCatalogFilters.tsx` is now a **re-export shim** (zero activities-page edits). CSS moved byte-identical to `frontend/styles/catalog-cards.css` (.actcat-* classes).
- `frontend/lib/worksheets-catalog.ts` — facets with counts-given-other-selections, `levelChip`+`levelOrder` (ALL band keys across 11 locales incl. the grade-3 band: grade-3/3-klasse/tercer-grado/ak-3/groep-5/3-trinn/ce2/classe-terza/3o-ano/3-luokka; da: prefixed entries win), `themeLabel`, `worksheetSubject` (taxonomy `letters`→literacy-coral, else math-teal).
- **Variety default sort (the operator's ask):** `sortLandings` 'variety' = deterministic round-robin `interleaveByAxis` over exercise types (slug-sorted seed, buckets desc-size, one per bucket per round). Page 1 = 24 distinct mechanics (was 1 under slug sort). With ?type= active it interleaves THEMES. ISR-safe (pure function, no randomness). Sorts = Variety (default, stripped from URL) / A–Z / Z–A — landings have NO date, so no "Newest".
- i18n: only `worksheetsPage.browse.{sortVariety,topicLinksHeading}` ×11 added; everything else reuses worksheetsPage.browse.* + topicPage.{facets,sort,activeFilters,emptyState}.

## Gotchas hit
- next-intl serializes whole message sets into RSC flight data — grepping a page for key names false-positives; check the match context.
- `grep -o '/_next/image?url=[^"&]*'` truncates at `&` → optimizer 400s ("w is required") when replaying; extract full `src="..."` attributes instead.
- Local dev: no Postgres → tiles/type-chips empty (try/catch) but the landing catalog is file-based and renders fully; §14.5 sitemap rename still applies (restored before push).
