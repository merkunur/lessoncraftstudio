---
name: project-activities-parked
description: "K-3 activities parked decisions ledger — K.G.A.1 position-words asset-blocked; \"demonstrate not touch\" rule; CC code assignment discipline; hint i18n bug."
metadata: 
  node_type: memory
  type: project
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**Parked decisions + open issues for the K-3 activities workstream.**

## K.G.A.1 Position words — ASSET-BLOCKED (operator-undecided)

Position-words activity (above/below/beside/in/on/under) requires staged scene art: 2+ objects composed in a spatial relationship. The existing image library has isolated single-object cutouts; no pre-composed scene art.

**Two unblocking paths:**
1. **Operator supplies staged scene art** — author ~20-40 scene images (e.g., `apple_above_box.webp`, `cat_under_table.webp`). Hand-curated, color-only, K-3 appropriate. Costs operator-side art commission time.
2. **Port the prepositions worksheet generator's scene-composition logic** into a choice-tap subject renderer. The existing `REFERENCE APPS/prepositions.html` composes scenes dynamically via Fabric.js at PDF-gen time. Porting that to a CSS-positioned 2-image stack inside the choice-tap subject is engine work.

**Operator-strategic call. Currently UNDECIDED.** No engineering action until the operator picks a path.

**Why not just ship a weak CSS-stack version:** Per the operator's explicit instruction in the original Batch 3 brief — "if it needs staged scene art you don't have, SKIP it and report that it's asset-blocked rather than building something weak." A 2-image vertical stack without a ground plane / shared scene context reads as "two unrelated pictures arranged vertically" to a K-3 kid, not as a spatial relationship.

## Activities must DEMONSTRATE the standard, not just touch its topic

**Anti-pattern caught + corrected:** an early "Decompose 10" activity was REMOVED because it asked the kid to tap one of two number-tile choices for a sum, which doesn't demonstrate K.OA.A.3 ("Decompose numbers less than or equal to 10 into pairs in more than one way"). That standard requires SHOWING multiple decompositions of 10 (1+9, 2+8, 3+7, ...) — a choice-tap doesn't instantiate that.

**Rule:** before assigning a CC code to an activity, verify the activity directly INSTANTIATES the standard. "Touches the topic of" or "uses the concept from" is NOT enough.

## CC code assignment discipline

**Only assign a CC code when the activity directly instantiates the standard.** Flag uncertain cases (return to operator for review); NEVER invent codes.

Empirical examples:
- "Which Number Is Bigger" → K.CC.C.7 ("Compare two numbers between 1 and 10 presented as written numerals") ✓ direct instantiation
- "Which Number Is Smaller" → K.CC.C.7 ✓ same standard, mirror task
- "Even or Odd" → 2.OA.C.3 (Grade 2 standard; K-readiness was the operator's framing but formal CC code is 2.OA.C.3)
- "Build the CVC Word" → RF.K.3 ✓ direct phonics instantiation

If unsure: surface to operator. Do not invent or stretch codes.

## Hint-localization minor bug (deferred fix)

The activity strand label (e.g., "Counting & Cardinality") renders in English regardless of the page locale. Specifically: the `Grade · Strand · Code` chip in `frontend/app/[locale]/activities/[slug]/page.tsx` shows `row.alignment.strand` directly, and that field is stored in English only in the activity manifest JSON.

**Fix shape:** add a strand-translation lookup table (locale × strand-english-name → localized-name) OR add a per-locale `strand` field to the manifest. Either way, fold the fix into the NEXT code touch in that area — not a standalone commission.

**Affected files:** `frontend/app/[locale]/activities/[slug]/page.tsx` (the chip render), `frontend/app/[locale]/activities/page.tsx` (the index page chip), all `*-activities.json` manifests under `mini tools/`.

**Severity:** minor. Teachers visiting `/fi/activities/<slug>/` see "Counting & Cardinality" in English while the rest of the page is Finnish. Operator-flagged but not blocking next commission.

## Future-arc candidates filed but not committed

- Slug component-generator (becomes load-bearing at 500+ activities; see [[project-activities-master-queue]])
- Per-locale TTS voice quality audit (mostly OK for ES/IT/DE on modern browsers; weaker for FI/SV/DA/NO; NSR-flag per CLAUDE.md §17.5.1 still applies for Tier 3+4)
- E10 clock-telling-time activity (analog clock face + digital readout; ~25 activities)
- E14 fraction — recognition facet SHIPPED (#1 1.G.A.3 + #2 2.G.A.3, 11/11 each, on the E2 choice-board engine; see [[project-e14-fractions-series]]). The PARKED piece is now only the **active-partition facet #3** (tap-to-partition; claims 2.G.A.3 clause-1 active verb) — needs a new `fractions-core.js`.
- E5/E6 letter + number tracing (SVG-stroke path-following; ~73 activities)

**Origin:** CC-MEMORY-UPDATE-PROMPT.md commission 2026-05-22. Parked-decisions ledger from operator + accreted across E1, E2, E7 build cycles.
