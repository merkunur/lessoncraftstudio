---
name: de-longtail-application
description: "500 German long-tails formed + 270 applied to German pages (landings/activities/makers) 2026-07-12 — the operator's 1000-clicks/day lever; map at docs/SEO/longtail-map-de.json"
metadata: 
  node_type: memory
  type: project
  originSessionId: d9db0986-1dc6-4d3a-b832-83cea4c34e5d
---

**LIVE 2026-07-12 (commit `1522a129`)** — operator /goal (target: 1000 clicks/day, baseline ~11-15): one realistic German long-tail formed per each of the 500 base keywords ([[de-k3-keyword-inventory]]), then applied honest-fit-gated to German pages via 10 native-SEO mapping agents.

**Applied 270 / 500:** 189 deck landings (`frontend/content/seo-landing/de.json`: title + metaDescription + p1 keyword-weave; h1 untouched — feeds JSON-LD/og), 71 activities (`page_title.de` + `page_intro.de` across 50 manifests + `about[0]` weave in activity-content/de.json), 9 makers + 1 tool (metaTitle/metaDescription/about[0]). **Auditable map = `docs/SEO/longtail-map-de.json`** (500 rows: base → longtail → page → title/meta). **Gaps = `docs/SEO/keyword-gaps-de.md`**: 133 TRUE content gaps (the additive roadmap — Diktate/Schreibschrift/Sachkunde-Steckbriefe/St-Martin…), 47 secondary queries (page already carries another primary from this pass — still served), 46 pool-exhausted (need MORE de decks of arrays-multiplication/geometry/number-charts/telling-time + popular animal-theme cells), 4 dup-longtails.

**Machinery (reusable for other locales):** `scripts/seo-landing/apply-longtail-de.js` + `scripts/apply-longtail-de-content.js` (data-only, --dry-run, .bak, dup-title assert) + the scratchpad consolidator pattern (coordinate-request → concrete-slug resolution).

**HARD LESSON — STRICT coordinate resolution only:** the first resolver had permissive fallbacks (same type, other level/theme) → 42 of 226 landing titles were DISHONEST ("Tiere"/"Kindergarten" on accessories/Klasse-2/English pages). Caught at spot-render, rolled back via .bak, re-run strict (exact type|theme|level cell or GAP). **Never let a keyword title drift off its page's actual coordinate.**

**Gotcha re-confirmed:** activity manifests MUST be cp'd to `/var/www/lcs-media/mini-tools/` BEFORE deploy.sh builds (§20.4) — first deploy served stale activity titles; fixed with cp + rebuild.

**Gates run:** gate.js PASS (all-pairs max 0.672, 0 template collisions), verify-activity-content-de PASS, 0 dup titles corpus-wide, 0 collisions with the 97 topic-hub-owned queries, 0 coordinate drift, live curls verified on all 3 surface types. IndexNow: 270 changed URLs submitted (HTTP 200).

**Churn-freeze note:** executed as ONE coordinated pass under explicit operator commission (§21.5a sign-off clause); topic/seasonal hubs + deck.html untouched.

**Measurement plan:** GSC Leistung → Suchanfragen filtered on the applied long-tails (the map file is the query list) + de-page clicks/impressions; meaningful movement expected over ~2-6 weeks of re-crawl. **Next levers toward 1000/day:** (1) build the 133 true-gap content (additive, freeze-safe), (2) publish more de decks for the 46 pool-exhausted cells, (3) repeat this pass for other locales (en/fr/es have the traffic volume).
