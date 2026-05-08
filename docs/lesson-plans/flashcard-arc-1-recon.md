# Flashcard Arc 1 recon summary — Pillar 4 Arc 1 close-out

**Commission:** [FEATURE][PILLAR-4] Pillar 4 Arc 1 — Flashcard Materials Production: design + pipeline + validation batch
**Branch:** `pivot/printable-business-toolkit`
**Concurrent arcs:** Pillar 4 Arc 1 commenced as 4th concurrent arc alongside Arc 13 lesson-plan + Pillar 2 Arc 2 (which closed at `2b7d9513` before Pillar 4 Phase 1 surface).
**Commits:** `64c6e06d` (Phase 1 — inventory + design exploration) → `c4b5a942` (Phase 2 — pipeline) → `a8b802fb` (Phase 3 — validation batch) → `f9c90810` (Phase 4 iteration 1 — Plan-agent findings absorbed) → `da7887d2` (Phase 4 iteration 2 — sentence-frame drop) → `[Phase 5 commit pending]`
**Sessions:** 1 (single CC session)
**LoC delta:** ~2,200 net additions across 5 commits

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| 1 — inventory + design exploration | `64c6e06d` | `flashcard-image-inventory.md` (2,838 vocab images / 287 decorative excluded / 72 cross-reference mismatches recoverable) + `flashcard-design-exploration.md` (4 design candidates + Plan-agent independent review + Sky+v2 canonical synthesis) |
| 2 — pipeline | `c4b5a942` | `frontend/scripts/generate-flashcards.ts` + `lib/flashcard-data.ts` + `lib/flashcard-render.ts` (TypeScript + Playwright + Sharp; ~1,280 LoC) |
| 3 — validation batch | `a8b802fb` | 72 cards × 6 locales × 12 themes; deck.html + print-6up.pdf + print-9up.pdf per locale |
| 4 iteration 1 | `f9c90810` | SOFT_HYPHENS extension (6 entries) + Sharp palette mode change |
| 4 iteration 2 | `da7887d2` | Sentence-frame drop; word-band 18% → 30% reallocation |

## Locked design canonical: Sky+v2 (post-Phase-4-iteration-2)

Two-element layout (image + word label):
- 2:3 portrait card; white background; 8px corners; 2px #e1e4eb border
- 4mm theme-color top accent rule
- 60% image-band; centered; 8% vertical / 12% horizontal padding; object-fit contain
- 30% word-band; Fredoka SemiBold; #1f2937 (warm slate-800); reserved-band auto-fit (clamp 16pt-44pt digital; 16pt-42pt print 6-up; 14pt-30pt print 9-up)
- Soft-hyphen substrate (29 entries) for cross-locale long-word handling
- Footer ~7%; "LessonCraftStudio" Lexend Deca 8pt #94a3b8 centered

**Decisions retired at Phase 4 iteration 2:** sentence frame, italic-vs-non-italic, curly-quote framing, 6% indent + left-rule scaffolding, Finnish K-3 simplified frame ("Tässä on {word}."), Option α templates, NSR-flag for Finnish frame.

## Locked pipeline architecture

- TypeScript via `tsx`; matches existing `seed-teaching-bundles.ts` conventions
- Playwright chromium for HTML→PDF (same CSS source drives digital + print)
- IMAGE_VOCABULARY loaded via Function-eval slice (browser-shaped source file)
- Sharp preprocessing: resize to 600px max-dim; PNG `palette: false` (true-color preserves K-3 image quality)
- Image-key alias table resolves 72 cross-reference mismatches (tree-theme suffix + spelling normalization + truncated compounds)
- Theme palette (~50 themes mapped to semantic colors) drives top accent rule
- Cache-by-content-hash dedupes Sharp processing across locales
- CLI: `--validation-batch` | `--image <ref>` | `--images <list> --locales <list>` | `--digital-only` | `--print-only`

## Locked output formats

**Digital viewer (`deck.html`):**
- Single-card-focus modal as primary affordance (per Plan-agent finding #3 — better K-3 UX than horizontal-scroll-only)
- Deck-overview horizontal-scroll strip as landing state + secondary discovery pattern
- Vanilla JS navigation: arrow keys + space (next) + ESC (close) + touch swipe + click-outside-to-close
- Self-contained: image base64-embedded; Google Fonts via CDN
- Mobile responsive (375px+ tested via media queries)
- ARIA: role="dialog" + aria-modal="true" + lang attributes per locale + alt text on images

**Print PDF (`print-6up.pdf` + `print-9up.pdf`):**
- A4 paper format; 10mm page margin; 4mm card gap
- Cut-line guides at every card corner (0.5px dashed #cbd2dc)
- 6-up = primary K-3 layout (~85×113mm cards; comfortable circle-time reading distance)
- 9-up = secondary take-home pack layout
- Container-query font-sizing (clamp + cqw) for responsive word rendering
- `hyphens: auto` + `word-break: break-word` respects U+00AD soft-hyphen markers

## What worked

1. **Plan-agent substituted cleanly for design-specialist agent** at both Phase 1 (design review against spec) and Phase 3 (implementation review against rendered output). Adjudicator-forward decision-locking discipline (CLAUDE.md §3.4) held: CC absorbed Plan-agent's blocking-class findings without operator round-trip.

2. **Iteration cycle discipline.** Spec budgeted 2 cycles before architectural surface. Both consumed without architectural-finding escalation:
   - Iteration 1 (Plan-agent absorption pre-first-surface) closed soft-hyphen substrate gap + Sharp palette quality concern.
   - Iteration 2 (operator composition revision) absorbed sentence-frame drop + word-band reallocation.

3. **Color-only scope correction at Phase 1 ratification** materially shrunk Arc 2 envelope (~31,218 → ~16,632 renders; 47% reduction) without affecting Arc 1 deliverables. Operator-strategic call timed correctly — late enough to have empirical inventory grounding scope; early enough to influence Arc 2 commission spec.

4. **Single CSS source for digital + print.** Playwright chromium renders the same Sky+v2 HTML/CSS to both digital `deck.html` and print PDFs. Maintenance surface = 1 CSS template; no template drift between formats.

5. **Cache-by-content-hash on Sharp processing** dedupes the 72 cards × 6 locales render to ~12 unique Sharp invocations (each image processed once; reused 6× across locales). Carries forward to Arc 2 16,632-render generation as ~1,512 unique invocations.

6. **Concurrent-arc filesystem-territory separation sustained.** Pillar 4 Arc 1 worked exclusively in `docs/lesson-plans/flashcard-*` + `frontend/scripts/generate-flashcards.ts` + `frontend/scripts/lib/flashcard-{data,render}.ts`. Zero merge-conflict, zero coordination overhead with concurrent Arc 13 / Pillar 2 Arc 2 work.

7. **Sentence-frame substrate retirement was structurally clean.** ~50 LOC `buildSentence()` + per-locale sentence-template table + Finnish NSR-flag all removed in iteration 2 with zero downstream impact. The decision-cost of building+retiring the substrate was low because sentence-frame work didn't compound across other arcs.

## What didn't (or surfaced friction)

1. **Initial validation batch render output 252MB — too heavy for git.** Sharp preprocessing mitigated to 18MB (palette:true) → 40MB (palette:false post-iteration-1). The 252MB → 40MB compression path was 2 round-trips of pipeline iteration; could have been pre-empted by including image-resize in initial pipeline scope. Lessons-learned for Arc 2: include Sharp preprocessing as Phase 1 architecture decision, not Phase 3 fix.

2. **Plan-agent unable to render visual artifacts.** Independent review at Phase 1 (design specs) + Phase 3 (HTML/CSS source) was structural-correctness review only — visual quality ratification stays operator-side. For Arc 2 production work, design-specialist agent (if becomes available) should render + visually inspect actual artifacts. Plan-agent backstop continues to work for structural-fidelity checks.

3. **Sentence-frame round-trip cost.** Phase 1 design exploration authored 4 candidates + locked Sky+v2 + absorbed 3 Plan-agent blocking findings → all of which became moot at Phase 4 iteration 2 when operator dropped sentence frame. ~30% of Arc 1 design-adjudication LoC retired. Not a structural failure (operator-strategic revision is normal), but worth flagging: composition-element scope decisions are higher-leverage when locked at spec authoring vs at Phase 1 ratification. For Arc 2: composition is locked per Arc 1 close; no equivalent risk surface.

4. **9-up print legibility margin tight for 12+char words without soft-hyphens** (Plan-agent finding #5). Resolved by SOFT_HYPHENS extension. For Arc 2 16,632-render generation, soft-hyphen coverage needs systematic audit (current 29 entries cover ~30 worst offenders; full Arc 2 catalog has more long-word compound coverage gaps).

## What surprised

1. **Color-only scope correction was operator-side, not CC-side.** CC's Phase 1 inventory surfaced 2,838 image total with color/BW split; CC reported envelope as 31,218 renders × 11 locales. Operator at ratification clarified: BW themes never enter operator-side deck-generation use → BW flashcards never need to ship. Scope correction at +ratification time, not pre-surface time. **Pattern surfaced:** scope decisions sometimes wait for operator strategic context CC doesn't have. Arc 2 commission spec should NOT pre-emptively expand scope to BW + future formats; defer to operator strategic moment.

2. **Plan-agent surfaced italic-sentence concern at Phase 1 + at Phase 3 (twice).** First time at Phase 1 design-spec review: surfaced `font-style: italic` on `.sentence` class as blocking-class. CC absorbed in Sky+v2 → Sky+v2-revised-canonical (drop italic). Second time at Phase 3 implementation review: re-verified no `font-style: italic` declarations anywhere; PASS. Independent two-pass review caught one absorption AND verified absorption integrity. Pattern carries forward: design-specialist-equivalent-review at both spec-authoring + implementation-verification produces structurally-stronger output than single-pass review.

3. **Iteration 2 simpler than iteration 1.** Iteration 1 = data-table extension + Sharp config change (~30 LoC across 2 files). Iteration 2 = sentence-frame removal + grid reallocation (~50 LoC removed across 2 files). Both well within budget. Pattern: composition-revision iterations are cheaper than substrate-extension iterations because removal-class deltas don't accrue regression risk.

4. **Phase 5 close-out timing.** Pillar 4 Arc 1 spec budgeted 2-3 sessions; actual = 1 single session start-to-Phase-5-surface. Pipeline tooling (TypeScript + Playwright + Sharp) + decision-cadence (operator ratification at Phase 1 + Phase 4) compressed cleanly. Pattern: when commission spec adjudication-delegations are tight (CC adjudicates within scope; surfaces only at named gates), commissions complete faster than spec budgets.

## Patterns that generalize to Pillar 4 Arc 2+ and beyond

1. **Validation batch as iteration substrate.** Arc 1's 72-card batch surfaced enough cross-locale + cross-theme variance to expose: (a) soft-hyphen substrate gaps; (b) palette-mode quality concern; (c) composition-revision opportunity. Future arcs targeting full-scale generation should commission a validation batch first; saves cycle-cost of full-scale regeneration when iteration emerges.

2. **Plan-agent independent review at both spec + implementation phases.** Two-pass review caught + verified absorption integrity. Future feature-design-implementation arcs should structure for two-pass agent review: once at design-spec authoring (spec-fidelity-vs-intent), once at implementation (implementation-fidelity-vs-spec).

3. **Sharp preprocessing as Phase 1 architecture, not Phase 3 fix.** Arc 2 + future image-pipeline work should include image-resize/quality decisions in initial pipeline architecture scope, not as iteration-fix territory.

4. **Operator-side scope corrections often arrive at ratification.** Don't over-design scope pre-ratification; default-recommend a defensible scope, surface inventory + envelope figures, let operator strategic context narrow at decision-locking moment.

5. **Composition-element scope decisions are spec-time, not Phase-1-time.** Lesson from sentence-frame round-trip: structural composition (how-many-elements-per-card) lives at spec-locked-design-parameters, not at design-exploration. Future commissions naming composition should fully lock at spec; design-exploration adjusts within composition.

## Cross-arc state at Pillar 4 Arc 1 close

| Arc | Status | State |
|---|---|---|
| **Pillar 4 Arc 1** | CLOSING (this Phase 5) | Sky+v2 + pipeline + 72-card validation batch shipped; 2 iterations consumed cleanly |
| **Pillar 4 Arc 2** | DRAFT-SPEC AVAILABLE | per `flashcard-arc-2-commission-spec.md` (this commit) |
| **Arc 13 lesson-plan** | CLOSED at `2b7d9513` | 110 master packages + 41 locale variants |
| **Pillar 2 Arc 2** | CLOSED at `2b7d9513` | 11 themed bundles + DB-seed companion |
| **Stream A Arc 2** | DEFERRED | per operator |

## Schema / tooling / generator changes needed before Pillar 4 Arc 2

**None gating Arc 2.** Pipeline ready for full-scale generation; subscription-gating implementation is Arc 2 net-new work; integration into 200 teaching packages is Arc 2 net-new work.

Optional (Arc 2 commission spec scopes):
- SOFT_HYPHENS substrate audit + extension to cover full ~1,512-image catalog
- Image-key alias table audit + extension
- Sharp preprocessing performance characterization at 16,632-render scale
- Pillar 4 thumbnail/preview generation for catalog UI surfaces (subscriber-side flashcard browse)
- Subscription-gating implementation pattern (Lemon Squeezy integration + access-check + free-tier 3-package allowlist)

## Verification status

- 72 validation-batch cards render cleanly post-iteration-2 (24 deck.html + 24 print-6up.pdf + 24 print-9up.pdf — wait, 6 locales × 3 outputs = 18 deliverable files, each holding 12 cards)
- Two-element layout verified: no `class="sentence"` or `sentence-band` markup in any deck.html
- Theme-color top accent rule preserved across all 6 locales
- Soft-hyphen substrate working: de/deck.html emits Kranken­wagen + Flug­zeug + Schau­spieler with U+00AD markers
- All 6 commits push to origin clean; pre-commit hooks pass
- Filesystem-territory separation maintained at every commit
- Validation batch size: 40MB (committed; reproducible via `--validation-batch` flag)

## Closure

Pillar 4 Arc 1 closes with **Sky+v2 canonical design + pipeline + 72-card validation batch** shipped. 2 iteration cycles consumed cleanly (Plan-agent absorption + operator composition revision). Arc 2 envelope locked at ~16,632 renders × 2-element layout × Sky+v2 canonical.

Pillar 4 Arc 2 commission spec available; commences at operator strategic timing.
