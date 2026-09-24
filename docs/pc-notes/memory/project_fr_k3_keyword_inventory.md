---
name: fr-k3-keyword-inventory
description: "500-keyword French K-3 worksheet demand inventory at docs/SEO/keywords-fr-k3-500.{json,md} — base keywords for a PENDING fr long-tail + page-application step (DE precedent applies)"
metadata: 
  node_type: memory
  type: project
  originSessionId: d9db0986-1dc6-4d3a-b832-83cea4c34e5d
---

**DONE 2026-07-12 (commit `8c5b01d7`)** — operator /goal: 500 keywords French K-3 teachers search for worksheets. **Research only — nothing applied.** Same playbook as [[de-k3-keyword-inventory]].

**Deliverables:** `docs/SEO/keywords-fr-k3-500.json` + `.md` — exactly 500 unique, every keyword with segment/intent/register/evidence; 123 (24.6%) confirmed against `docs/SEO/harvests/fr.json` (2,154 google.fr autocomplete uniques).

**Method:** 10 native-French agents by segment (maths maternelle 70 · maths CP-CE2 69 · lecture/phonologie 70 · écriture/grammaire 70 · logique/jeux 52 · questionner le monde 33 · saisonnier 25 · registre enseignant 25 · modificateurs 50 · FLE/anglais/dys 36). 808 raw → force-dropped non-worksheet intent (bricolage, branded methods Taoki/Pilotis/Picbille/MHM, classroom-management, dispositifs APC) → scored → 500.

**French register facts baked in (from demand-map-fr.md):** head nouns **fiches** (maternelle) / **exercices** (élémentaire); modifiers **à imprimer** (dominant) > gratuit > pdf; grades PS/MS/GS/maternelle + CP (anchor)/CE1/CE2/cycle 2; parents search by AGE (3 ans/4-5 ans); `coloriage magique` = huge cluster (kept — real demand); "fiche de travail" = Belgian calque (noted, not targeted).

**PENDING NEXT STEP:** fr long-tail formation + application to fr pages — reuse the DE machinery ([[de-longtail-application]]): 10 mapping agents → strict exact-coordinate resolution → apply-longtail scripts (clone `apply-longtail-de.js` for fr.json landings ~2,900+, fr activities 175, makers) → gates → single deploy. fr landing store = `frontend/content/seo-landing/fr.json`; fr activities have `slug.fr` + `page_title.fr`; `verify-activity-content-fr.js` gate exists.
