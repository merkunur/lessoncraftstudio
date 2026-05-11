# Arc 16 commission spec — strand-volume continuation post-Q2-crossing (conditional)

**Type:** `[BUILD][LESSON-PLANS]` lesson-plan strand-volume; OR concurrent with Pillar 2 Arc 5 / Pillar 4 Arc 2 per commissioning-shape decision at Arc 15 close.
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits per arc
**Estimated LoC:** ~2500-4000
**Estimated sessions:** 2-3
**Status: DRAFT — operator ratification CONDITIONAL on commissioning-shape decision at Arc 15 close.**

## 1. Context — Q2 crossed at Arc 15 close (143 master)

Arc 15 closed at 143 master + 49 locale variants + 16 saturated strands + 0 forward-pointers remaining. **Q2 threshold CROSSED at mid-band (140-144 range).** ~95% of ~150 launch-target lesson plans authored. Distance to final ~150 target: 5-7 packages.

**Arc 16 commissioning is CONDITIONAL** per operator's commissioning-shape decision at Arc 15 close:

- **(P1) Pillar 4 Arc 2 sole-arc** — Arc 16 DEFERS to post-Pillar-4-Arc-2 closure; commences sole-arc after Pillar 4 Arc 2 closes
- **(P2) Pillar 4 Arc 2 + Arc 16 concurrent** — Arc 16 commences in parallel with Pillar 4 Arc 2 (higher operator-attention surface area)
- **(P3) Pillar 4 Arc 2 + Pillar 2 Arc 5 concurrent** — Arc 16 DEFERS; commences sole-arc after both close

**CC pre-thinking:** at 143 mid-band close, **(P1) safer** if operator-attention concentration is binding constraint at Pillar 4 Arc 2's ~3,500-5,500 LoC scope. **(P3) acceptable** if launch-strategy timing pressure favors elapsed-time efficiency. Arc 16 likely DEFERS in either case until Pillar 4 Arc 2 closes.

**Conditional commissioning:** Arc 16 may NEED to commence to advance master-package count toward final ~150 target IF launch-trigger framework requires 150 packages specifically. OR Arc 16 may be deferred indefinitely if 143+ is sufficient + Pillar 4 Arc 2 + Pillar 2 Arc 5 absorb available capacity until launch.

**Notable arc-15-recon patterns generalizing forward:**
1. β shape multi-phase concurrent + cross-session + cross-commission-cycle resumption locked as canonical operating point.
2. Strand-foundation-then-saturation-within-arc pattern viable (50% within-arc-saturation rate at Arc 15).
3. Bidirectional cross-arc cross-Phase package reuse pattern empirically validated (2 instances).
4. Q2 trajectory projection methodology accurate (90-95% pre-projection → 143 actual = mid-band crossing).

**Saturated strands at Arc 15 close (16):**
- cognitive-and-executive-function/{memory-and-attention 3/3, pattern-recognition 5/5, sorting-and-classification 5/5}
- early-literacy/{multilingual-language-awareness 5/5, vocabulary-acquisition 24/24, letter-recognition 6/6}
- fine-motor-and-visual-spatial/{spatial-reasoning 5/5, visual-discrimination 4/4, drawing-and-tracing 4/4}
- math/{data-and-graphs 4/4, numeral-recognition 4/4}
- science/{environment-and-weather 4/4, living-things 6/6, materials-and-properties 2/2, community-and-roles 2/2}
- cognitive-and-executive-function/time-and-routine 4/4

**Strands available for Arc 16 depth (if commissioned):**
- math/addition-subtraction (~8 left)
- math/place-value (5 left)
- math/geometry (4 left after Arc 15 Phase 1)
- math/measurement (4 left after Arc 15 Phase 2)
- science/personal-social-emotional-development (3 left after Arc 15 Phase 4)

## 2. Pre-locked architecture (do NOT relitigate)

Per CLAUDE.md §6 + Arc 1-15 ship state. CC adjudicates within these locks.

- Strand-volume cadence: 5-10 packages per phase
- Option G CONTINUATION / Option I CONTINUED defaults at saturation momentum
- Pre-Phase-2 strand-selection list surface (adjudicator-forward; non-blocking glance-review)
- DB-seed graceful-degradation continuing
- Sparse-override LoC band 35-80% per Arc 14-15 doctrine

## 3. Phase shape options (CONDITIONAL on operator ratification)

Per Arc 14-15 precedent + operator strategic input at Arc 15 close:

### Option G CONTINUATION (default-recommended if Arc 16 commissioned)

- Phase 1: continue strand-depth work; 5-7 packages across 2-3 strands
- Phase 2: continue strand-depth + saturation-closing if 1-strand-saturation available
- Phase 3: locale variants (clause b); 4 pt sparse-overrides per Arc 4-15 cadence (12th consecutive)
- Phase 4: recon + Arc 17 commission spec drafting (or final-target close if reached)

### Option I CONTINUED — saturation-closing (alternative)

- Few strands have remaining 1-2-package-to-saturate state at this point (most have been saturated through Arc 14-15)
- Less attractive Option than at Arc 15 entry given strand-foundation work mostly absorbed

### Option F — Final-target close (NEW at Arc 16 candidate)

- 5-7 packages to reach ~150 final launch-target
- Single-phase intensive ship (no Phase 2-4 if 150 reached at Phase 1)
- Risk: pacing concentration; needs operator-strategic adjudication

**CC default-recommends Option G CONTINUATION** at standard 5-10-per-phase cadence if Arc 16 commissioned.

## 4. Concurrent-arc compatibility

Arc 16 supports concurrent-arc commencement per Arc 12+ precedent + operator commissioning-shape decision.

**Concurrent candidates (commissioning-shape dependent):**
- (P2) Pillar 4 Arc 2 — Arc 16 concurrent with paid-tier flashcard work
- Post-(P1)/(P3) Arc 16 commences sole-arc after Pillar 4 Arc 2 closes
- Possible β with Pillar 2 Arc 5 if Pillar 2 Arc 5 not commissioned in Pillar 4 Arc 2 cycle

## 5. Verification expectations

- Per-package YAML validates against `frontend/scripts/author-teaching-package.ts` schema
- Strand frontmatter accurate per current saturation state + new package contribution
- vocabKeyList material parameter pattern continues per Arc 12+ established
- Class B FLEXIBLE substrate composition
- Sparse-override Phase 3 work targets pt locale (12th consecutive arc per locked sequence unless operator Track-C-state advance signals alternative)

## 6. Authorization (CONDITIONAL)

Operator-strategic decisions at Arc 15 close + Arc 16 ratification:

1. **Arc 16 commissioning decision** — commission OR defer indefinitely:
   - Commission if final ~150 launch-target requires continued lesson-plan authoring
   - Defer indefinitely if 143+ is sufficient + Pillar 4 Arc 2 + Pillar 2 Arc 5 absorb capacity
2. **Phase shape choice** (Option G CONT. / Option I CONT. / Option F final-target) if commissioned — operator picks at commencement; CC default-recommends Option G CONT.
3. **Concurrent-arc commencement** — operator decides per commissioning-shape decision
4. **Track-C state gate** at Phase 3 entry (pt continuation OR alternative) — operator ratifies

## 7. Out of scope

- Pillar 2 Arc 5 commencement (deferred per Pillar 2 Arc 4 close DRAFT status)
- Pillar 4 Arc 2 commencement (operator-strategic at Arc 15 close per matrix)
- Other deferred arcs (Stream A Arc 2, (μ), NSR-resolution) per operator deferrals
- DB-seed invocation (deferred per operator strategic timing)
- Carry-forward from Arc 15: 14 non-translated Arc 15 packages

## 8. Cost projection

- Phase 1: ~60-90 min (5-7 packages)
- Phase 2: ~60-90 min (5-7 packages)
- Phase 3: ~30-45 min (4 pt sparse-overrides per Arc 4-15 cadence)
- Phase 4: ~30-45 min (recon + Arc 17 spec drafting OR final-target close)
- Total: ~3-5 hours; 2-3 sessions

Within Arc 14-15 cost envelope.

---

*End of Arc 16 commission spec draft. Status conditional on commissioning-shape decision at Arc 15 close.*
