---
name: minitools-html-noindex
description: /mini-tools/*.html serve X-Robots-Tag noindex since 2026-07-12 (nginx); SSR activity wrapper is the single indexable surface
metadata: 
  node_type: memory
  type: project
  originSessionId: d9db0986-1dc6-4d3a-b832-83cea4c34e5d
---

**LIVE 2026-07-12** — all `/mini-tools/*.html` (the ~138 iframe engine pages) serve `X-Robots-Tag: noindex` from nginx. Applied via `scripts/publish-cli/patch-nginx-minitools-noindex.py` (commit `b0336771`; clone of the pdf-noindex pattern: marker-idempotent, backup to `/root/nginx-backups/`, `nginx -t` auto-rollback). Mechanism = `set $mt_robots` + `if ($uri ~* \.html$)` inside the existing `location /mini-tools/` block — empty header value is omitted, so json/atlas/css/images under `/mini-tools/` carry NO robots header. noindex-only (not nofollow, not robots.txt Disallow — Disallow would block the crawl so Google never sees the header).

**Why:** external JS-vs-SSR SEO advice prompted a full raw-crawl verification (2026-07-12). Every primary surface was already fine — deck.html bakes h1/sr-only/alt/JSON-LD statically at publish; activities/landings/topic hubs are SSR with all prose + JSON-LD in raw HTML; the 33 worksheet-generator apps self-noindex via meta robots. The ONE gap was the mini-tool engine pages: thin JS-only iframe targets, discoverable via iframe src, previously 200 + indexable. The SSR activity wrapper (`/[locale]/activities/<slug>`) is the single indexable surface per [[project-activities-architecture]].

**Forward rules:** (1) after any nginx rebuild, re-run `patch-nginx-minitools-noindex.py` (idempotent) alongside the other patch-nginx-* scripts; (2) if image assets under `/mini-tools/` ever join an image sitemap, the .html-only scoping already protects them — do NOT broaden to blanket path noindex; (3) churn-freeze-compatible precedent: additive signal repair on never-sitemapped pages is the sanctioned class per §21.5a.

**Follow-up CLOSED same day:** activity pages' generic og:image was fixed via [[activity-og-images]] (per-(activity, locale) 1200×630 composites at `/mini-tools/og/`, commit `77aa8b4e`).
