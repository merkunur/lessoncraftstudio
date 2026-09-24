---
name: project-activities-master-queue
description: K-3 Math+ELA master activity queue + engine-leverage ranking. Triage 240 buildable / 4550 engine-blocked / 90 asset-blocked / 40 open. Batch-by-skill not mass-fill.
metadata: 
  node_type: memory
  type: project
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**Master K-3 Math+Literacy activity table exists in plan files** (working doc, not committed). Triage of the ~4,920 total instance-equivalents (~250-300 distinct engine-instances × 11 locales + some EN-only literacy):

| Class | Count | Status |
|---|---:|---|
| **Buildable now** (existing engines E1+E2+E7) | ~240 | Live or addressable with current engines |
| **Engine-blocked** (need E8/E9/E4/E12/E5-E6/E9-sw/E14/E3/E13/E10/E18) | ~4,550 | Awaiting engine builds |
| **Asset-blocked** (need staged scene art, audio, etc.) | ~90 | Awaiting operator-supplied assets — K.G.A.1 position-words is the canonical example ([[project-activities-parked]]) |
| **Open-ended** (need pedagogical design before engineering) | ~40 | Operator-strategic; no engineering action yet |

## Engine leverage ranking (activities per engine, decreasing)

| Engine | Activities unlocked | Status |
|---|---:|---|
| **E2 choice-tap** | ~600+ | Built. Highest leverage by far — single-select with deferred check covers every "tap the X" / "which is Y?" / "match the picture to..." skill type across K-3. |
| **E7 CVC builder** (+ future E8/E9 word-builder facades) | ~200 | E7 EN built. E8 ES/FI/PT live (FR/IT pending). E9 Group-C DE/NL/SV/NO/DA COMPLETE. |
| **E4 match-pairs** | ~120 | **Built + first activity 11/11 LIVE (K.OA.A.3 "Make the Number" closed 2026-05-26 commit `4bf56943`).** Tap-to-pair number-bond decomposition; single-row-multi-locale manifest pattern; cognate-aware verify discipline emerged at SV→DA→NO→FI (see [[feedback-cognate-aware-verify-discipline]] + CLAUDE.md §A.13.53). ~119 more K-OA/K-CC/K-NBT skills unlocked from this engine. |
| **E12 place-value** | ~80 | Built; 2 activities live (tens-and-ones + hundreds-tens-and-ones) across 11 locales each. |
| **E5/E6 tracing** | ~73 | NOT built. Stroke-trace for letters + numbers (handwriting); SVG-stroke path-following. |
| **E9 sight-word** | ~70 | NOT built. Distinct from E9 sound-chunk; sight-word reading practice (the/was/of/etc.). |
| **E14 fraction** | ~50 | RECOGNITION facet SHIPPED on the E2 choice-board engine: #1 "Equal Halves and Fourths" (1.G.A.3) + #2 "Same Size, Different Shape" (2.G.A.3 non-congruence), each 11/11 LIVE (closing `c2bb562c`). Active-partition facet #3 (tap-to-partition) DEFERRED — needs a new `fractions-core.js`. See [[project-e14-fractions-series]]. |
| **E3 sort** | ~40 | NOT built. Drag-to-bin classification. |
| **E13 array** | ~35 | NOT built. Rectangular array for multiplication-readiness 2.OA.C.4 / 3.OA.A.1. |
| **E10 clock** | ~25 | NOT built. Analog/digital clock telling-time. |
| **E18 number-bond** | ~20 | NOT built. Part-part-whole circles. |

## Fill strategy

**Batch-by-skill, operator reviews each set live, then next.** NOT mass-fill (thin-pages SEO risk + operator-attention-load risk + content-quality risk).

**Theme-expansion held to LAST** as small waves. Building "addition with farm animals" and "addition with vehicles" as separate activities only happens AFTER the distinct-skill phase is complete for that engine. Don't dilute the catalog with theme-variants before structural coverage is broad.

**Slug component-generator proposed (NOT built).** A helper that synthesizes localized slugs from {engine, skill, theme, locale} mapping tables. Becomes load-bearing at 500+ scale where hand-writing slugs per locale per activity becomes operator-attention-expensive. Defer until ~50+ activities exist; then build.

## Next commission (recommended)

Per the operator's locked decision and the phonics safety pipeline being live:

**E8 Syllable Builder + Spanish OR Finnish OR Swedish proof activity.** Activity authoring reads ONLY from `approved-words-<locale>.json` (the gated output of the phonics pipeline). Words not on the list cannot enter the activity manifest. See [[project-phonics-safety-pipeline]].

After E8 ships + ≥3 locales fan out + operator approves → next is **E9 Sound-Chunk Builder** for Germanic + Nordic.

After E8+E9 are at scale → resume non-literacy engines per leverage ranking above (E4 → E12 → E5/E6 → ...).

## What this queue does NOT cover

- The 33 worksheet-generator apps under `REFERENCE APPS/` — those are operator-tooling for PDF + interactive-HTML deck production; NOT in the K-3 activities scope ([[project-activities-architecture]] platform-header carve-out)
- Decks (the ~9,000 published deck pages at `/<locale>/decks/<slug>/`) — separate publish-cli workstream
- Topic destination pages (`/<locale>/topic/<slug>/`) — separate cataloging workstream

**Origin:** CC-MEMORY-UPDATE-PROMPT.md commission 2026-05-22. Triage counts + leverage ranking from operator's working doc.
