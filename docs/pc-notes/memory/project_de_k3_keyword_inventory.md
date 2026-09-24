---
name: de-k3-keyword-inventory
description: "500-keyword German K-3 worksheet demand inventory at docs/SEO/keywords-de-k3-500.{json,md} — base keywords for a PENDING long-tail-formation + page-application commission"
metadata: 
  node_type: memory
  type: project
  originSessionId: d9db0986-1dc6-4d3a-b832-83cea4c34e5d
---

**DONE 2026-07-12 (commit `4b16c318`)** — operator /goal: 500 keywords German K-3 teachers search for worksheets. **Research only — NOTHING applied to pages yet.**

**Deliverables:** `docs/SEO/keywords-de-k3-500.json` (machine-readable: `{kw, segment, intent, register, autocompleteConfirmed, evidence}` × 500) + `keywords-de-k3-500.md` (human-readable, grouped). Exactly 500 unique; every keyword carries source evidence.

**Method:** 10 parallel native-German keyword web-research agents, one per segment (Mathe Vorschule 63 · Mathe Klasse 1–3 72 · Erstlesen 64 · Schreiben/Grammatik 54 · Logik/Wahrnehmung 67 · Sachunterricht 53 · saisonal 33 · Lehrer-Register 25 · Modifikator-Grammatik 39 · DaZ/mehrsprachig 30) — SERP-title observation + competitor category trees (grundschulkoenig, materialguru, grundschule-arbeitsblaetter, kribbelbunt, raetseldino, eduki, 4teachers, wegerer, betzold). 790 unique raw → force-dropped non-worksheet intent (craft/classroom-management/therapy) → scored (autocomplete-confirmed > topic/level > format) → 500. **143 (28.6%) cross-confirmed** against `docs/SEO/harvests/de.json` (the 2,367-unique google.de autocomplete harvest 2026-07-06); the unconfirmed rest is deliberate coverage-expansion beyond that harvest's deck-type-seeded scope.

**Complements, does NOT supersede:** [[demand-map-de]] structure findings (`docs/SEO/demand-map-de.md`: Fach×Klasse + kostenlos/zum-Ausdrucken/PDF modifiers, P0 subject×grade-hub gap) + `demand-terms-de.json` (97 distilled titles).

**PENDING NEXT STEP (operator-stated, separate commission):** form long-tail keywords from these bases (keyword × the modifikatoren-formate segment's modifier grammar, e.g. `<topic> arbeitsblätter <klasse> kostenlos pdf`) and apply to website pages — honest-fit-gated per §22.4 (qualifier only where content supports it) and mindful of the §21.5a churn freeze (~2026-09-01) for EXISTING indexed pages (additive pages are fine).
