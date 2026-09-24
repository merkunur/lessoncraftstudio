---
name: feedback-activity-variety-shuffle-rule
description: STANDING RULE — every activity needs ≥7 original distinct exercises + a post-pass order-only reshuffle; default-on done-line gate
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 563e148e-f030-4a1f-aa2f-a8b59566eddc
---

**STANDING RULE (operator, 2026-06-17) — exercise variety + shuffle. Applies to EVERY activity, all engines, all standards, all locales, permanently. Default-on; assumed by every future activity commission whether or not it restates it.**

> Every activity must contain **≥7 ORIGINAL distinct exercises** — genuinely different items exercising the activity's skill, NOT the same item restated (distinctness can be geometric/structural, not just textual — e.g. rect-halves-vertical vs square-halves-horizontal are distinct even with the same prompt). After the child completes all originals, the set **SHUFFLES** so the order differs from the prior pass — **the child never gets the same sequence twice**. The shuffle is **ORDER-ONLY**: it re-orders the SAME validated items and never generates new unvalidated content at runtime (every served item stays correctness-verified — e.g. partition geometry stays measured-equal).

**Why:** repetition kills engagement for K-3; the platform's variety surface is per-session re-ordering of a deep-enough pool. **How to apply:** it is a **definition-of-done GATE** — an activity is **OUT OF SPEC** (not "done") without ≥7 originals + a working post-pass shuffle, *even if its commission never mentions variety*. Waivable ONLY by explicit operator instruction.

**"DISTINCT" MEANS DISTINCT TO THE CHILD (operator ruling 2026-06-17, the hard-won clarification).** ≥7 code-distinct *configurations of the same abstract thing* does NOT satisfy the rule. The fraction partition activities first shipped "8 / 7 rounds" that were plain teal rectangles/squares/circles with cut lines — to a 5-7-year-old that read as the same exercise reshuffled (≈ 2 shape families), and the operator rejected it. **Genuine variety = the child perceives genuinely different exercises.** For the fractions rework the operator's answer was the simplest, correct one: **a set of genuinely DIFFERENT geometric shapes** — circle, square, rectangle, triangle, ellipse, diamond, hexagon, pentagon — each cut into exactly-equal parts, with the **plain translated prompt** ("Cut the shape into N equal parts — halves/thirds/fourths"; no per-locale authoring). **A themed-object dressing (pizza/cake/chocolate over the same two base shapes) was tried FIRST and REJECTED** — it was still ≈2-shapes-reshuffled + over-engineered (do not repeat it). New shapes live in `fractions-core.js` (`_SHAPES` polygon table + `_bodySVG` + exact `_lines` cuts); each partition is proven measured-equal by **point-sampling** in `scripts/verify-fractions-core.js`. Add a shape only with an exact equal-area construction (e.g. thirds exactly-divides only circle/triangle/hexagon/square/rect — never force a shape into a cut it can't bisect exactly; ≥7 may be waived where the math caps the genuine count, as for thirds=5). Eyeball each shape renders + cut lines legible.

## The canonical implementation pattern (the "scaffold" every new wrapper follows)
The per-pass reshuffle lives in the **activity WRAPPER via the shell's `nextTask` contract** — NOT in `lcs-shell.js` (protected). `lcs-shell.js getTask(i)` already hands ordering fully to the tool when the tool defines `nextTask` and NOT `tasks` (it calls `tool.nextTask({index:i, completed})`); `ensureActivityChrome`/`LCS_reloadFirstTask`/`postActivityResize` all gate on `tasks||nextTask`. So a wrapper gets per-pass reshuffle with **ZERO protected-core change**:
- Drop the `tasks` property; keep a `_pool` (the ≥7 task objects).
- `nextTask(opts)`: build a shuffled `order`; **rebuild it when the pool length/ref changes** (async manifest swap); RESHUFFLE (≠ previous order) **only on a FORWARD pass boundary** `Math.floor(opts.index/N) > _curPass` (driven off the pass TRANSITION, not call-count, so the repeated `getTask(0)` at mount + `LCS_reloadFirstTask` is idempotent and pass-1 order is stable; the reload path rebuilds via `_order=null`). Return `_pool[order[index % N]]`. No-op reshuffle for N<2.
- The shell's per-mount `ensureTaskOrder` shuffle is bypassed entirely on the `nextTask` branch (no double-shuffle); `nextTask` subsumes it (fresh order each mount + a fresh order each pass).
- **Reference implementation:** `mini tools/fractions-activity.js` (`shuffledOrder` + `nextTask`), shared by both fraction coordinates. Wrong answers don't advance the index (only correct→Next does), so a "pass" = N correct completions.

**The ≥7 floor is a DATA requirement** — the order-only shuffle cannot create a 7th item. Pools come from the manifest (`params.rounds` / `params.targets` / generated tasks); add distinct items there.

## The structural gate
`scripts/audit-activity-variety.js` is the done-line check: (1) STATIC catalog-wide scan (pool size per engine vs ≥7 + whether the wrapper has a `nextTask`); (2) LIVE puppeteer probe per locale that drives the mounted tool's `nextTask` over 2 full passes and asserts ≥7 distinct + pass-2 order ≠ pass-1 + same set. HARD-fails in-scope activities; reports the rest as backlog.

## Backlog (surfaced 2026-06-17, NOT this commission's scope)
At rule-creation only the two fraction partition activities (1.G.A.3 + 2.G.A.3 on `fractions-core.js`) conform (8/7 rounds + nextTask reshuffle). **39 other activities are on the shell's per-mount-loop (no per-pass reshuffle), and several are <7** (e.g. ten-frame.teen-numbers pool 9 has reshuffle=NO; choice-board.compare-length pool 12; etc.). The rule applies to them **going forward / when each is next touched** — convert its wrapper to the `nextTask` pattern + bring its pool to ≥7. Run `audit-activity-variety.js --strict` to make the backlog block.

Cross-refs: CLAUDE.md §A.13.60 (the doctrine), §20.4 (approval-cadence done-line + 5th workflow rule), §21.4 (verification), §A.13.55 (mobile gate sibling), [[feedback-activities-approval-cadence]], [[project-activities-architecture]], [[project-e14-fractions-series]].
