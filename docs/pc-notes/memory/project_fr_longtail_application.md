---
name: fr-longtail-application
description: 500 French long-tails formed + 242 applied to fr pages (150 landings/80 activities/12 makers-tools) 2026-07-12 — sibling of the DE pass; map at docs/SEO/longtail-map-fr.json
metadata: 
  node_type: memory
  type: project
  originSessionId: d9db0986-1dc6-4d3a-b832-83cea4c34e5d
---

**LIVE 2026-07-12 (commit `8b0a796b`)** — French replica of [[de-longtail-application]]: one realistic French long-tail per each of the 500 base keywords ([[fr-k3-keyword-inventory]]), applied honest-fit-gated via 10 native-French SEO mapping agents.

**Applied 242 / 500:** 150 landings (`frontend/content/seo-landing/fr.json`: title + metaDescription + p1 weave; h1 untouched), 80 activities (`page_title.fr` + `page_intro.fr` across 55 manifests — FR activities map far better than DE did: sons/syllabes/lecture-compréhension/monnaie-euros/conjugaison all have fr rows), 11 makers + 1 tool (the PDF-only makers coloring/writing/drawing-lines/draw-and-color unlocked coloriage/graphisme/écriture/pixel-art keywords with créer-intent). **Map = `docs/SEO/longtail-map-fr.json`; gaps = `docs/SEO/keyword-gaps-fr.md`**: 172 true content gaps (biggest French clusters: **coloriage magique**, dictées, sons du CP par graphème, graphisme par motif, homophones, cahiers de vacances, QLM lessons, fêtes sans thème halloween/carnaval/galette), 46 secondary, 38 pool-exhausted (measurement/geometry/number-charts/telling-time fr cells tiny), 2 dup.

**Machinery:** `scripts/seo-landing/apply-longtail-fr.js` + `scripts/apply-longtail-fr-content.js` (fr clones) + scratchpad `consolidate-longtails-fr.js`. **Both DE lessons held: 0 coordinate drift (strict resolver from the start) + manifests-cp-before-build deploy chain worked first try.**

**Gates:** gate.js PASS (all-pairs max 0.757, 0 FAIL), verify-activity-content-fr PASS, 0 dup titles, tsc clean, 3 surface types live-verified, IndexNow 242 URLs HTTP 200.

**Measurement:** GSC filtered on the applied long-tails (map = query list); 2-6 weeks re-crawl. **Levers to 1000/day now:** DE (270) + FR (242) applied; next = EN/ES inventories + application, coloriage-magique content build (both de+fr gap #1 by volume), more decks for exhausted cells.
