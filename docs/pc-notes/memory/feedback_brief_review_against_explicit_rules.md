---
name: Brief review against explicit rules, syscall semantics, established discipline, runtime constraints, actual parser implementation
description: Before committing engineering, brief review must check engineering claims against the real underlying constraints (locked safety rules, syscall semantics, established discipline, runtime version constraints, actual implementation behavior of existing tooling), not against the conceptual shape that "looks right." Five instances cited from Brief B Phase 3 v2/v3 + pre-Phase-4 hygiene + addition-image-image-2 cleanup.
type: feedback
originSessionId: 057417cc-7dfe-42b6-a061-d175d9f2e80f
---
**Rule:** When reviewing a brief before authorizing engineering work, check engineering claims (safety, atomicity, verifiability, runtime compatibility, parser behavior, capability availability) against the real underlying constraints — locked safety rules in CLAUDE.md, kernel syscall semantics, established discipline like ship-only-what's-verified, runtime version compatibility for transitive deps, and the actual implementation behavior of existing tooling.

**Why:** Briefs lean on the conceptual shape that "looks right." But conceptual shapes don't survive contact with concrete reality. Five recurring instances in Brief B Phase 3-4 work surfaced the same pattern: a brief asserted X about engineering constraints; X was wrong; the wrongness materialized at execution. Each cost a fix-up commit. Reviewing against real constraints at brief-review time is cheap; reviewing post-execution is expensive.

**How to apply:**

1. Read the brief looking specifically for assertions about: safety rules (CLAUDE.md §A locked guarantees), syscall semantics (atomicity, ordering, idempotency), established discipline (ship-only-what's-verified, en+de cadence, real-emitter authoring), runtime constraints (Node version, Postgres version, OS-specific behavior), parser/tooling behavior (how existing flags are parsed, what error messages are produced).
2. For each assertion, ask: "Where is this claim grounded? In the real source? Or in the brief author's mental model?"
3. If the answer is "mental model," demand verification before authorization: paste the actual source line (or filed deferred-queue evidence) into the brief itself, OR run a quick check (read the file, run the command, query the database) before locking the decision.
4. Track the pattern: when you spot one instance of brief-mental-model-wrong, look for adjacent instances in the same brief.

**Five instances cited (Brief B Phase 3 v2/v3 + pre-Phase-4 hygiene + addition-image-image-2 cleanup):**

1. **Phase 3 v2 review §A.3 catch.** Brief proposed `rm -rf` for unpublish. CLAUDE.md §A.3 explicitly forbids `rm -rf` on `/var/www/lcs-media/*` paths. Wrong against locked safety rule. v3 amendment A3: archive-folder `mv` (NOT `rm`) per §A.3 spirit.
2. **Phase 3 v3 atomicity catch.** Brief proposed `ln -sfn` for symlink swap. `ln -sfn` is unlink + symlink — two syscalls — non-atomic; a concurrent reader can land between them and see no symlink at all. `rename(2)` on a symlink IS atomic at the kernel level. v4 amendment A1: `fs.symlinkSync(target, link + '.new')` + `fs.renameSync(link + '.new', link)`.
3. **Phase 3 v3 ship-only-what's-verified catch.** Brief proposed shipping unpublish handler at Phase 3 without verification. Violates the ship-only-what's-verified discipline established in Brief A. v4 amendment A2: unpublish DEFERRED to Phase 5 (shipped at `0ad626cb`; verified at Sub-phase 5.5).
4. **Pre-Phase-4 hygiene catch (Phase 3 cheerio fix-up).** Brief recommended cheerio for HTML extract without checking Hetzner's Node 18.20.8 vs cheerio's transitive `undici@7` requirement (Node ≥20.18.1). The architectural shift to Hetzner-side execution at recon Item 6 should have triggered a Node-version-vs-dependency audit; it didn't. Brief landed; cheerio crashed at first publish with `ReferenceError: File is not defined`; emergency fix-up to node-html-parser at `9bed3bd4`. **New pattern: architectural shifts trigger dependency-runtime audits.** When a brief changes WHERE code runs (PC → Hetzner; Node version differs; OS differs; library availability differs), every dependency in the affected source must be checked against the new runtime's constraints.
5. **addition-image-image-2 cleanup catch (Phase 3 v4 strict-arg assumption).** Phase 3 v4 brief asserted "`--update-deck-id foo` errors with 'unknown flag' diagnostic" without verifying the existing arg parser produced that behavior; it didn't. The permissive parser silently dropped the unknown flag, the publish path treated the unprefixed `foo.zip` as fresh INSERT, and an unintended `addition-image-image-2/v1` deck was created. Brief-stated CLI parser behavior must be checked against actual parser implementation. Resolved at Phase 4 via the strict-arg parser; methodology entry filed as 5th instance.

**Generalization:** brief review must check engineering claims (safety, atomicity, verifiability, runtime compatibility, parser behavior) against the real underlying constraints (locked rules, syscall behavior, established discipline, runtime constraints, actual implementation), not against the conceptual shape that "looks right." Apply at every brief-review pass before committing engineering.

**Family:** parent of `feedback_decision_premise_verification.md` (decision-premise layer specifically) and sibling to `feedback_documentation_against_real_emitter.md` (documentation/config layer specifically). All three describe the claims-vs-real-state pattern at different layers.
