# Arc 17 recon summary

**Commission:** [BUILD][LESSON-PLANS] Arc 17 — Phase 0 substrate audit + Phase 1.1 (3 packages saturation-closing) + Phase 1.2 (4 packages addition-subtraction continuation) + Phase 1.3 (4 packages place-value + geometry) + Phase 1.4 (4 packages tell-time + place-value close + geometry) + Phase 1.5 (2 packages handwriting + reading-comp foundation strand-starts) + Arc 17 close commit
**Branch:** `pivot/printable-business-toolkit`
**Concurrent arc:** None (sole-arc per Arc 16 precedent)
**Sessions:** 6 (Phase 0 commencement + Phase 1.1 + Phase 1.2 + Phase 1.3 + Phase 1.4 + Phase 1.5 + arc-close consolidation in final session)
**LoC delta:** ~8,000+ net additions across 34 YAML files (17 en packages + 17 pt variants) + arc-17-recon.md

## Deliverables shipped

| Phase | Deliverables |
|---|---|
| Phase 0 (commencement) | `docs/lesson-plans/arc-17-phase-0-substrate-audit.md` — strand-priority surface analysis (30 strands; 150/150 packages classified); operational state inventory (17 SAT + 2 NEAR + 10 PARTIAL + 1 EMPTY); Arc 17 candidate slate (16 packages across 5 phases projected). Committed at `9342317b`. |
| Phase 1.1 | 3 saturation-closing packages: `complete-analogy-image-pair` (logical-reasoning SAT close — 20th saturated strand) + `share-and-take-turns` (PSED SAT close at 5/6 → 6/6) + `identify-community-places` (community-and-roles canonical fill — completes Arc 11 identify-community-helpers paired-strand) |
| Phase 1.2 | 4 addition-subtraction continuation packages: `add-2-digit-without-regrouping` + `subtract-2-digit-without-regrouping` (paired inverse pair per Arc 16 add/subtract-within-100 precedent) + `make-10-strategy` (strategy-isolation companion to Arc 12 add-within-20) + `find-missing-addend-within-10` (algebraic-thinking precursor; RESOLVES Arc 4 add-within-5 forward-pointer) |
| Phase 1.3 | 4 place-value canonical + geometry packages: `fact-families-within-10` (closes math/addition-subtraction at 14/14 SAT — 21st saturated strand) + `decompose-tens-and-ones-within-19` (place-value canonical 0/3 → 1/3) + `identify-tens-and-ones-2-digit` (place-value canonical 1/3 → 2/3) + `compose-shapes-from-parts` (geometry 5/8 → 6/8) |
| Phase 1.4 | 4 tell-time + place-value close + geometry packages: `tell-time-to-the-hour` (math/measurement tell-time pair Slot 1; CCSS.1.MD.B.3) + `compare-2-digit-numbers` (closes math/place-value canonical at 3/3 SAT — 22nd saturated strand at canonical sub-track level) + `identify-symmetry-line` (geometry 6/8 → 7/8; K-3 informal noticing framing per §A.13.30) + `tell-time-to-half-hour` (tell-time pair Slot 4) |
| Phase 1.5 + arc-close | 2 foundation strand-start packages: `form-uppercase-letters` (handwriting strand EMPTY → 1/3 — first handwriting strand package in catalog) + `identify-main-character` (reading-comprehension 2/10 → 3/10) + arc-close commit + this recon doc |

**Master-package count trajectory:** 150 → **167** master packages (en) + 55 → **72** pt locale variants. +17 packages exact (vs original ~166 projection — +1 acceptable per saturation-closure adjudications at Phase 1.3 + 1.4).

## What worked

1. **Decoupled-ship pattern empirically validated across 5 consecutive phases.** Per Arc 14/15/16 precedent + Phase 1.5 special-responsibility arc-close commit assembly: each Phase 1.x shipped at filesystem level (en + pt YAMLs untracked); Phase 1.5 consolidated all 17 staged packages + this recon doc into single Arc 17 close commit. Pattern preserves session-context-budget integrity for content-heavy multi-phase commissions. 17-package consolidation at arc-close commit is +2.4× Arc 16's 7-package consolidation precedent; pattern scales.

2. **CC↔assistant cooperation cadence ran clean within commission across 5 phases.** Per §3.4 framing "cooperation runs within commission, not across sessions." 5 phases × 2-4 packages each × Round 1 draft → assistant self-review → Round 2 revision (when needed) all ran tight without operator escalation outside batched-adjudication moments. Cooperation pattern empirically reliable at multi-phase single-arc cadence.

3. **§A.13.31 canonical-artifact grounding discipline held across multiple slug-grounding firings.** Phase 1.3 surfaced commission-spec-vs-canonical-taxonomy slug-grounding divergence (commission named place-value slugs not in learning-targets.json; CC deferred to canonical artifact). Phase 1.4 surfaced read-time-on-analog-clock content-overlap with tell-time pair (resolved via measurement-strand vs time-and-routine-strand parallel-framing distinction). Phase 1.5 surfaced reading-comprehension strand-position empirical correction (Phase 0 recon claimed 3/10 but answer-who-what-where-questions doesn't exist → empirical 2/10).

4. **§A.13.6 firing-resolution discipline at phase-boundary close (per commission spec).** Phase 1.3 + 1.4 + 1.5 all surfaced §A.13.6 firings within drafting; per commission spec these firings surfaced at phase-boundary close rather than mid-execution interruption. Phase 1.4's clock-mat canonical-existing discovery (vs Phase 0 recon's clock-face-mat DEFER proposal) was the most material firing — corrected at draft-execution time, surfaced at Phase 1.4 close; informed Phase 1.5 Phase 0 audit's canonical-material-recon discipline expansion.

5. **§A.13.30 K-foundational-informal framing discipline held across 3 packages.** identify-symmetry-line (Phase 1.4) K-3 informal noticing/folding vs Grade-4 formal axis-identification distinction; form-uppercase-letters (Phase 1.5) K-1 recognizable-formation vs formal stroke-order distinction; identify-main-character (Phase 1.5) K-1 teacher-led read-aloud + picture-supported vs independent decoding + literary-analysis distinction. Reader-perspective audit per §A.13.30 passes across all three.

6. **Strand-pair structural integrity across multi-phase commission.** Phase 1.2 add-2-digit + subtract-2-digit paired-inverse + make-10 + find-missing-addend (addition-fluency strand-anchor pair) + Phase 1.3 decompose-tens + identify-tens-and-ones (place-value sibling pair) + Phase 1.4 tell-time-to-the-hour + tell-time-to-half-hour (measurement sibling pair). Each pair preserves §A.13.31 per-instance content-awareness while advancing strand-saturation via two-package pair-coherence.

## What didn't (or surfaced friction)

1. **Phase 1.2 close-out master-count methodology error.** Phase 1.2 close-out reported 154 en (strand-subset counting error — counted 9 addition-subtraction strand packages as total delta rather than catalog total). Phase 1.3 entry empirical verification corrected to 157 en. §A.13.6 firing surfaced at Phase 1.3 entry; Phase 1.4 + 1.5 Phase 0 audits both used explicit-methodology reporting per commission requirement to prevent recurrence.

2. **Phase 1.3 close-out pt-count methodology error.** Phase 1.3 close-out reported 79 pt (similar strand-subset error). Phase 1.4 entry empirical corrected to 70 pt → 66 baseline + 4 Phase-1.4-added. Same pattern as Phase 1.2 en error; both resolved retrospectively at next-phase Phase 0 audit.

3. **Phase 0 audit canonical-material-recon gap.** Phase 1.4 Phase 0 audit recon proposed `clock-face` mode for manipulative-cut-outs without verifying against existing canonical packages; would have introduced invented mode. CC's §A.13.31 canonical-artifact read at draft-execution discovered `clock-mat` material + `clock-pieces` mode already canonical via Arc 15 Phase 1 read-time-on-analog-clock package. Corrected at draft time. Phase 1.5 Phase 0 audit added explicit canonical-material-recon discipline: "read at least one existing canonical package precedent for each slot's class-conditional materials before locking the materials stack."

4. **Phase 0 audit reading-comprehension strand-state inaccuracy.** Phase 1.5 Phase 0 audit claimed reading-comp at 3/10 (match-sentence-to-picture + answer-who-what-where-questions + predict-from-picture-cue); empirical verification at draft-execution showed answer-who-what-where-questions doesn't exist → actual strand state was 2/10. Phase 1.5 identify-main-character strand advance corrected to 2/10 → 3/10.

5. **Materials mass-run + CDN deploy + cross-bundle composition deferred across all 5 phases.** Per Arc 14/15/16 decoupled-ship precedent. Carries forward to Arc 17 P2 close-out commission (separate; ~340+ PDFs across 17 packages × 4 Tier 1+2 locales × class-conditional materials).

6. **place-value-mat generator absence carry-forward from Arc 16.** Phase 1.3 + 1.4 place-value packages used matching-mat substitution per Phase 0 §8 (C) DEFER framing. Carry-forward to Arc 17 P2 + Pillar 5 commission queue.

## What surprised

1. **Empirical scope-match at +17 packages (vs ~16 projection).** Phase 0 audit projected 16-package Arc 17 slate (150 → 166); empirical close at 17 packages (150 → 167). The +1 came from Phase 1.2's make-10-strategy + find-missing-addend ratification — Phase 0 originally had make-10 as embedded inside add-within-20 and find-missing-addend as adjacent target; operator strategic call at Phase 1.2 ratified both as standalone strategy-isolation packages. Operator pre-thinking on package count trajectory empirically close-but-not-exact (16 → 17).

2. **Two strand SAT closures within single arc.** math/addition-subtraction 14/14 SAT at Phase 1.3 (21st saturated strand) + math/place-value canonical sub-track 3/3 SAT at Phase 1.4 (22nd at canonical sub-track level). Two SATs in one arc is unusual — Arc 16 had zero new SATs (saturation movement only). Arc 17's pace reflects K-3 numeracy substrate maturity post-Arc-16.

3. **Foundation strand-start emergence at Phase 1.5.** handwriting strand was empty (0/3) at Arc 17 commencement; Phase 1.5 form-uppercase-letters opens it to 1/3. First foundation-strand-start in arc-shipping pattern since Arc 12 reading-comprehension strand-FIRST. Pattern: foundation-strand-starts cluster at arc-close phases rather than arc-mid; suggests operator-strategic call to delay foundation-starts until other arc-trajectory deliverables stabilize.

4. **Parallel-strand-framing pattern surface at Phase 1.4.** read-time-on-analog-clock (Arc 15 Phase 1) saturates time-and-routine strand at 4/4 AND covers hour + half-hour clock-reading pedagogically. Phase 1.4 tell-time pair (Slot 1 + Slot 4) framed as measurement-strand canonical fills, intentionally coexisting with read-time as parallel framings of the same observable activity (time-and-routine daily-life skill vs measurement-strand quantitative skill). Per §A.13.31 the parallel-framing distinction documented in tell-time-to-the-hour compositionalRationale; both packages share canonical clock-reading material infrastructure. Pattern: existing-saturating-package + new-canonical-strand-fill can coexist when the strand framings are pedagogically distinct.

5. **§A.13.6 firings highly load-bearing at content commissions (continued).** ~10+ §A.13.6 firings across Phase 1.1+1.2+1.3+1.4+1.5 substrate verification + draft execution. Pattern: K-3 lesson-plan substrate maturity (150+ packages at Arc 17 entry) means new authoring targets frequently overlap with existing or require careful canonical-artifact verification. §A.13.22 audit-doc-vs-canonical-state divergence at commencement-time inspection + §A.13.31 per-instance canonical-artifact grounding remain THE load-bearing disciplines.

## Patterns that generalize to Arc 18+ (if commissioned)

1. **Decoupled-ship + arc-close consolidation pattern empirically validated at 5-phase scale.** Arc 14/15/16/17 cumulative confirms reliability of: filesystem-level Phase 1.x ships + final-Phase arc-close commit assembly. Operator-context-budget-protection load-bearing; multi-phase content-heavy commissions sustainable at this cadence.

2. **CC↔assistant cooperation within commission at 2-4-package-per-phase cadence.** Empirical: 2-4 packages × ~270 lines en + ~165 lines pt = ~1,300-1,700 lines per phase × Round 1 + Round 2 fits single-session execution. Phase 1.5's 2-package pace at session-burn-late position confirmed sustainable.

3. **Phase 0 audit explicit-methodology reporting discipline (per Phase 1.4 + 1.5 commission requirement).** Phase 1.2 + 1.3 close-out count-methodology errors prompted commission spec to require explicit-methodology reporting at Phase 0. Arc 18+ commission specs should continue this discipline at each phase-entry audit.

4. **Canonical-material-recon discipline (added Phase 1.5 doctrine candidate per Phase 1.4 firing).** Phase 0 audit's slug-grounding alone insufficient — must also verify class-conditional materials against existing canonical package precedent. Doctrine candidate: "for each slot's class-conditional materials, read at least one existing canonical package precedent for the material before locking the materials stack."

5. **§A.13.30 K-foundational-informal framing audit at packages with formal-vs-informal pedagogical scope.** identify-symmetry-line + form-uppercase-letters + identify-main-character all required explicit K-3-informal vs Grade-4+ formal framing distinction. Arc 18+ packages with similar scope (e.g., partition-shape-halves-quarters at geometry close; later handwriting + reading-comp targets) will benefit from same audit pattern.

## Substrate state at Arc 17 close

| Metric | Arc 16 close | Arc 17 close | Delta |
|---|---:|---:|---:|
| Master packages | 150 | **167** | +17 |
| Saturated strands | 16 (Arc 16 close — no new SATs) | **18+** (Arc 17 adds math/addition-subtraction 14/14 SAT + logical-reasoning SAT + PSED SAT closes; +2 = 18 minimum, possibly higher with canonical-sub-track accounting +22) | +2 new SATs (or +4 incl canonical sub-tracks) |
| Forward-pointer queue | 0 deferred | **0 deferred** | 0 (clean arc-close) |
| pt locale variants | 55 (per empirical re-count; Arc 16 close subject's "56" had 1-off) | **72** | +17 |
| Themed bundles | 48 | 48 (Pillar 2 CLOSED; no new bundle authoring at Arc 17) | 0 |
| Cross-bundle reused packages | ~25 | ~25 (cross-bundle composition deferred to Arc 17 P2) | 0 |
| Active strand foundations | 2 (place-value 4/8 + PSED 5/6) | **2 new foundations + 2 advanced** (handwriting EMPTY → 1/3 NEW; reading-comp 2/10 → 3/10 expansion; place-value canonical sub-track 0/3 → 3/3 SAT; math/measurement opens tell-time pair 2/3) | strand-foundation pattern: 1 closed canonical sub-track + 1 new foundation start |
| §A.13.6 firings cumulative | 39+ (post-Arc-16-close) | **~50+** (post-Arc-17-close: Phase 1.2 count error + Phase 1.3 pt count error + Phase 1.3 commission-spec slug-grounding + Phase 1.4 read-time content-overlap framing + Phase 1.4 canonical-material-recon gap + Phase 1.5 reading-comp strand-state inaccuracy + ~5 more) | +10+ |

**v3 launch-trigger framework progress: 100% (Arc 16) + saturation depth advancement at Arc 17.**

## Q2 trajectory note + Arc 18+ commencement window

Per hybrid framing locked at Arc 16 Phase 0:
- **~150 launch-envelope REACHED at Arc 16 close + extended to 167 at Arc 17 close.** Canonical DRAFT framing target met + foundation-strand-starts (handwriting + reading-comp) opened.
- **Arc 18+ trajectory toward 203 hard threshold GATED on launch-strategy signal** per Arc 16 hybrid framing carry-forward. Arc 18 candidate pool (per Phase 1.5 envelope adjudication):
  - `tell-time-to-quarter-hour` (completes tell-time canonical 3/3)
  - `partition-shape-halves-quarters` (closes geometry 7/8 → 8/8 SAT)
  - `identify-coin-values` (CCSS.2.MD.C.8)
  - `recognize-money-amounts-up-to-1-unit` (CCSS.2.MD.C.8)
  - `form-lowercase-letters` (handwriting continuation 1/3 → 2/3)
  - `form-numerals-0-to-10` (handwriting close 2/3 → 3/3 SAT)
  - Reading-comprehension strand-expansion candidates (6 remaining toward 9/10)

Until next-arc trigger, Arc 17 closes at 167. C1 working-envelope extended; remaining gating Conditions per Arc 16 close-out:
- C2 locale coverage (advancing; Arc 17 added pt variants for 17 new packages)
- C3 NSR-flag clearance (88+ entries BLOCKED on operator-coordinated procurement — primary remaining gate)
- C4 strand coverage (well-advanced at 18+ saturated strands post-Arc-17)
- C5 LOCKED ✓
- C6 SATISFIED ✓

## Concurrent-arc state at Arc 17 close

- **Pillar 2:** Commission cycle CLOSED at `957eb8ff` (48 themed bundles); unchanged this arc
- **Pillar 4:** Commission cycle CLOSED at `6e2b17fa`; unchanged this arc
- **Pillar 5:** Commission cycle CLOSED + F-fix sequence CLOSED; place-value-mat generator absence carries forward
- **Stream A:** Phase 1 CLOSED at prior cycle; Class A/B/D queue operator-coordinated
- **Arc 18+:** GATED on launch-strategy signal per hybrid framing
- **Arc 17 P2 close-out:** queued as separate commission (materials mass-run + CDN deploy + cross-bundle + SUBSCRIPTION-SCOPE.md amendment)

## Out of scope (Arc 17 commission CLOSED at this commit)

Carry-forward to Arc 17 P2 + Arc 18+ + operator-coordinated follow-on cycles:

**Deferred to Arc 17 P2 close-out (separate operator-coordinated commission):**
- Consolidated materials mass-run absorbing all 17 Arc 17 packages (~340+ PDFs across 17 packages × 4 Tier 1+2 locales × class-conditional materials)
- SCP + extract + chown deploy to Hetzner CDN
- Curl verification per §A.13.28 sample × 4 locales
- Cross-bundle composition updates for all 17 Arc 17 packages (addition-subtraction strand-cluster + place-value-cluster + geometry-cluster + measurement-cluster + handwriting-cluster + reading-comp-cluster cross-bundle reuse opportunities)
- Teaching-package surface verification at 17 new package routes
- SUBSCRIPTION-SCOPE.md amendment for Arc 17 close (master-package count + saturation-strand + cluster-taxonomy advancement)

**Deferred to Arc 18+ trajectory (gated on launch-strategy signal):**
- 36 packages remaining to 203 hard target
- Arc 17 cluster taxonomy completion gaps (1 left for geometry SAT; 1 left for tell-time canonical 3/3; 6+ left for reading-comprehension; 2 left for handwriting; addition-subtraction extension territory open)
- Tier 3+4 locale variants for new Arc 17 packages (de/es/nl + sv/fi/no/fr/it/da/pt non-pt; pt variants shipped at each Phase 1.x)
- place-value-mat generator authoring (operator-coordinated queue per Arc 16 Phase 1.1 §A.13.6 firing #3 — continues carry-forward)
- clock-mat generator state (canonical-existing per Phase 1.4 finding; mass-run verification at Arc 17 P2)

**Phase 6 [DOCS] doctrine fold candidates (accumulated through Arc 17):**
- Phase 1.3: commission-spec-vs-canonical-taxonomy slug-grounding doctrine
- Phase 1.3: count-baseline-silent-shift procedural-reminder (Phase 1.2 + 1.3 both surfaced methodology errors)
- Phase 1.4: Phase 0 audit canonical-material-recon discipline (verify materials against existing precedent, not just slug grounding)
- Phase 1.4: parallel-strand-framing pattern (existing-saturating-package + new-canonical-strand-fill coexist when framings are distinct)
- Phase 1.4: canonical mode-verification list (single-repeat, base-ten-blocks, 3d-shape-nets, counters, clock-pieces) — surface as explicit doctrine
- Phase 1.5 (TBD at fold time): potentially explicit-methodology Phase 0 reporting + canonical-material-recon-vs-Phase-0-recon-quality discipline

## Cross-references

- `docs/lesson-plans/arc-17-phase-0-substrate-audit.md` — Phase 0 substrate audit deliverable (committed at `9342317b`)
- `docs/lesson-plans/arc-16-recon.md` — Arc 16 close-out (predecessor arc state)
- `docs/lesson-plans/packages/add-within-20/package.yaml` — Numeracy 7-material canonical reference
- `docs/lesson-plans/packages/identify-uppercase-letters/package.yaml` — handwriting strand prerequisite reference + literacy-class 7-material canonical reference
- `docs/lesson-plans/packages/match-sentence-to-picture/package.yaml` — reading-comprehension strand prerequisite + sentence-strips canonical reference
- `docs/lesson-plans/packages/read-time-on-analog-clock/package.yaml` — parallel-strand-framing canonical reference (time-and-routine vs measurement framings; clock-mat material canonical reference)
- CLAUDE.md §3.4 Pillar 1 production pattern; §A.13.29-31 content-discipline doctrine family; §A.13.22 audit-doc-vs-canonical-state divergence; §A.13.31 per-instance canonical-artifact grounding

## Standing position post-Arc-17-close

Arc 17 commission cycle CLOSED at consolidation cycle (Phase 0 + 1.1 + 1.2 + 1.3 + 1.4 + 1.5 + arc-close). Subsequent work per operator strategic-input:

- **Arc 17 P2 close-out cycle (separate commission):** consolidated materials mass-run + CDN deploy + curl verify + cross-bundle composition updates + SUBSCRIPTION-SCOPE.md amendment for Arc 17 close
- **Arc 18+ trajectory toward 203:** GATED on launch-strategy signal per hybrid framing carry-forward
- **place-value-mat + clock-mat generator authoring:** operator-coordinated queue (Arc 16 Phase 1.1 + Arc 17 Phase 1.4 firings carry-forward)
- **NSR-resolution arc:** operator-coordinated; native-speaker procurement state advancement
- **Phase 6 [DOCS] cycle:** doctrine fold candidates at ~50+ accumulated items (continuous accumulation across F-fix + fan-out + Arc 16+17 cycles)
- **Marketing-narrative artifact (M2/M3):** operator-strategic at any future moment

Arc 17 commission re-opens per future strategic-input + empirical demand signal per hybrid framing trigger conditions.

---

*End of Arc 17 commission cycle close-out. Status: Arc 17 commission cycle CLOSED. Master-package count: 167/203 (extends Arc 16's exact ~150 launch-envelope match; +17 packages this arc; 36 remaining to 203 hard target gated on launch-strategy signal).*
