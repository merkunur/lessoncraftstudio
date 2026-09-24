---
name: Group B brief drafting — methodology-preamble structural posture
description: When the Group B brief drafts (after Group A closes), the methodology-preamble must do TWO things — cite Group A's accumulated MEMORY entries as binding methodology AND document an explicit asymmetric verification budget anticipating that Group B will surface novel bug dimensions in its own image/data-resolution paths. Both flags surface at Group B drafting time.
type: project
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
**When to apply:** When drafting the Group B brief (sudoku, picture-path, cryptogram, and any other Group B-classified apps). Surface BOTH flags below in the brief's methodology-preamble section. Do not draft Group B without addressing both.

## Concrete app-to-key scope (pre-decomposed during Brief A 5A.3 close, 2026-04-27)

Group A redo's verification surfaced 7 apps lacking sr-only per-row/per-puzzle blocks entirely. These are Group B/C scope. Pre-decomposing the scope here so Group B brief drafting starts with a concrete enumeration rather than re-deriving from CLAUDE.md §14.10 + §17.8:

| App | New translation keys to author | Pattern |
|---|---|---|
| sudoku | `srPuzzleSudoku` | single-puzzle (deck-level summary) |
| picture-path | `srPuzzlePicturePath` | single-puzzle |
| cryptogram | `srPuzzleCryptogram` | single-puzzle |
| crossword | `srPuzzleCrossword` + per-clue spans | hybrid (deck-level summary + per-clue) per CLAUDE.md §17.8 |
| find-objects | `srExerciseFindObjects*` per task type | multi-row (per task variant — circle/square/cross/count style branching like find-and-count) |
| picture-sort | `srExercisePictureSort*` | multi-row (per sort-bin variant TBD during brief) |
| bingo | `srExerciseBingo` (or similar — TBD whether multi-row chip-by-chip or deck-level caller-bar summary) | TBD |

Each app needs:
1. EN value(s) authored
2. DE value(s) authored
3. Per-app code wiring to consume the key(s)
4. Image-source-dimension verification (theme + server-stored upload + data URL upload mix)
5. Cadence: en-first / de-second per `feedback_brief_a_5a_translation_cadence.md`

The 7-app enumeration is a starting point — actual brief drafting will refine which keys per app, what shape (template-with-substitution vs static-instruction), and where each lands (per-app file vs translations-shared.js if any consumer count crosses ≥2).

---

## Flag 1 — Bind the accumulated MEMORY entries as methodology, not background

The Group A redo accumulated four methodology entries (bundle-tracing, verification-regex-from-samples, coverage-dimensions-from-postmortems, latent-vs-self-consistent). The Group B brief's methodology-preamble must **cite these explicitly by name and quote the binding rule from each**, not just include "see MEMORY.md" as a generic pointer.

**Test for the brief:** at the start of Group B work, does Claude Code read those entries as binding methodology that constrains how Group B verifications must be designed? Or as background context that shapes intuition? The first is what's needed; the second is what generic citation produces.

**Entries to cite (current as of Group A close):**
- `feedback_bundle_shape_investigation_methodology.md` — dump real bundles via `var DECK_BUNDLE = ...`, never grep source-side data construction.
- `feedback_verification_regex_from_real_samples.md` — derive assertion regexes from 2–3 real bundle samples, not from theoretical token enumerations.
- `feedback_coverage_dimensions_emerge_from_postmortems.md` — verification dimensions accumulate from postmortems; declare which dimensions a test deck exercises before claiming PASS. Currently 4 dimensions: shape correctness, code-path coverage, image source, path encoding.

(Add any methodology entries from later Group A work to the cite list when drafting.)

## Flag 2 — Asymmetric verification budget for novel bug dimensions

The Group A redo surfaced 4 distinct bug-class dimensions across 2-3 iteration rounds (Brief A 5A.2 → 5A.3 → eb510be4 → eb510be4.1 → eb510be4.2). Each round revealed a dimension the prior round didn't anticipate. Group B's bundle work (sudoku grids, picture-path traversal, cryptogram cipher tables) is structurally different from Group A's image-key resolution family — different coverage gaps, different bug shapes — and the same iteration pattern is likely to recur in those structural domains.

**The structural posture (verbatim, surface in methodology-preamble):**

> "Bundle extensions for sudoku, picture-path, cryptogram will likely surface novel bug dimensions in their own image/data-resolution paths analogous to (but distinct from) Group A's image-key resolution family. Group B's first verification round assumes novel dimensions will surface; budget verification time for at least two iteration rounds before declaring Group B resolved. The methodology entries are binding AND insufficient — they prevent recurrence of the four documented dimensions but don't prevent discovery of new dimensions in Group B's structurally different bundle work."

**Concretely, the brief should:**
- Schedule at least 2 iteration rounds in the Group B verification budget. A single round assumes lucky PASS.
- Tag the brief's verification step with "expect new dimensions; postmortems will produce new MEMORY entries."
- Frame the goal as "surface and document new dimensions" rather than "verify existing dimensions cleared."

The methodology entries are necessary but not sufficient. They prevent recurrence within Group A's domain. Group B is a new domain. Treat it that way structurally, not just by citation.

---

**Originating discussion:** operator surface during Group A close, post-eb510be4.2. Operator framing: "structural posture change in how the Group B brief gets framed, not just a citation list."
