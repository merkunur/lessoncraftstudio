# Phase A — Consolidated FAQ dedup report

Closes the brief's Phase A.4 verification deliverable. Covers two commits on `pivot/printable-business-toolkit`:

- **Part 1** `d0064921` — apps-side dedup against shared commercial pool.
- **Part 2** *(this commit)* — tools-side dedup against shared usage pool.

---

## Refund-policy canonical decision

User-selected: **"No refunds — the free trial is the refund policy."**

- The shared commercial pool's "30-day refund window" entry was deleted from all 11 locales (Part 1).
- Per-app files retain their "we do not offer refunds on commercial license purchases" answer as the canonical, site-wide refund FAQ (1× per apps page).

No factual contradictions remain on any apps page. All tools pages contain the same "no refunds" answer where present (those will be moved to apps-side as part of Phase C.2 FAQ split-by-intent).

---

## Part 1 — Apps-side deletions (committed as `d0064921`)

### Shared commercial pool (`frontend/config/app-content/shared-commercial-faqs.ts`)

| Deletion | Scope | Count |
|---|---|---|
| "What is your refund policy?" (and 10 translated variants) | 11 locales × 1 entry | 11 |

### Per-app files (`frontend/config/app-content/[locale]/*.ts`)

| Deletion pattern | Locale × file scope | Count |
|---|---|---|
| Exact-dup of shared S1 — "What does the commercial license include?" + translations | 8 files × 11 locales (FI had 11 files due to pre-existing extra dups) | 87 |
| Near-dup of shared S2 — "Can I sell [X] worksheets made with this tool on Etsy and Amazon KDP?" + translations | 32 files × 11 locales (FI had 4 files with 2 dups → 36 total FI; DA untouched — no dups present) | 319 |

**Part 1 total: 417 FAQ entries removed across 330 files.**

### Part 1 false-positive preservations (reviewed, NOT deleted)

These 4 questions contain the locale substring for "commercial license" but are distinct questions comparing old product tiers — preserved:

- `fr/missing-pieces.ts`, `fr/pattern-worksheet.ts` — "Quelle est la différence entre la Licence Commerciale et l'Accès Complet ?"
- `es/missing-pieces.ts` — "¿Cuál es la diferencia entre la licencia Comercial y el Acceso Completo?"
- `it/missing-pieces.ts` — "Qual è la differenza tra la Licenza Commerciale e l'Accesso Completo?"
- `pt/missing-pieces.ts` — "Qual é a diferença entre a Licença Comercial e o Acesso Completo?"

These reference a deprecated "Full Access" tier. Phase C.2 (split-by-intent) will determine final disposition.

### Part 1 apps-side near-dup false positives (reviewed, NOT deleted)

6 EN apps pages had similarity-heuristic flags that were reviewed and confirmed as distinct sub-feature questions (not real dups):

- `en/code-addition.ts` — "What is Word Reveal mode?" ↔ "What are distractor letters in Word Reveal mode?" *(mode vs sub-feature of the mode)*
- `en/crossword.ts`, `en/find-objects.ts`, `en/picture-path.ts` — "How does the auto-generated header work?" ↔ "How does the auto-generated answer key work?" *(header rendering vs answer-key rendering — distinct features)*
- `en/odd-one-out.ts` — "per-exercise mode override" ↔ "exercise numbers" *(distinct options)*
- `en/picture-path.ts` — "LPF maze algorithm" ↔ "collectible system in Classic Maze mode" *(distinct sub-features)*
- `en/sudoku.ts` — "4×4 puzzle mechanic" ↔ "answer key for picture sudoku" *(distinct aspects)*

---

## Part 2 — Tools-side deletions (this commit)

### Per-tool files (`frontend/config/tool-content/[locale]/*.ts`)

| Deletion pattern | Scope | Count |
|---|---|---|
| Exact-dup of shared U2 ("What file formats can I download?" + translations) | 72 per-tool files across 8 locales | 72 |
| Near-dup of shared U4 short form ("What page sizes are supported?" + translations — without the "How do I print on A4 vs Letter?" suffix) | 6 files: `image-addition` in EN/FR/NL/SV/DA/FI | 6 |

**Part 2 total: 78 FAQ entries removed across 73 per-tool files.**

### Part 2 per-locale breakdown

| Locale | Exact U-matches | U4-short matches | Files affected | Total deletions |
|---|---|---|---|---|
| EN | 10 | 1 | 10 | 11 |
| DE | 0 | 0 | 0 | 0 (clean) |
| FR | 5 | 1 | 5 | 6 |
| ES | 0 | 0 | 0 | 0 (clean) |
| IT | 10 | 0 | 10 | 10 |
| PT | 0 | 0 | 0 | 0 (clean) |
| NL | 10 | 1 | 10 | 11 |
| SV | 10 | 1 | 10 | 11 |
| DA | 8 | 1 | 9 | 9 |
| NO | 10 | 0 | 10 | 10 |
| FI | 9 | 1 | 9 | 10 |
| **Total** | **72** | **6** | **73** | **78** |

### Part 2 per-file table (EN; non-EN deletions are locale-equivalent translations of the same question)

| File | EXACT-U deletion | U4-SHORT deletion |
|---|---|---|
| en/alphabet-train.ts | "What file formats can I download?" | — |
| en/code-addition.ts | "What file formats can I download?" | — |
| en/cryptogram.ts | "What file formats can I download?" | — |
| en/image-addition.ts | "What file formats can I download?" | "What page sizes are supported?" |
| en/image-subtraction.ts | "What file formats can I download?" | — |
| en/math-puzzle.ts | "What file formats can I download?" | — |
| en/more-less.ts | "What file formats can I download?" | — |
| en/prepositions.ts | "What file formats can I download?" | — |
| en/word-guess.ts | "What file formats can I download?" | — |
| en/word-search.ts | "What file formats can I download?" | — |

### Part 2 tools-side near-dup false positives (reviewed, NOT deleted)

6 EN tools pages retain similarity-heuristic flags after dedup — all distinct sub-features:

- `en/code-addition.ts` — "What page sizes are supported? How do I print on A4 vs Letter?" (shared U4) ↔ "What languages are supported?" *(page-size vs language-support — unrelated topics, false positive)*
- `en/crossword.ts`, `en/find-objects.ts` — "auto-generated answer key" ↔ "auto-generated header" *(distinct features)*
- `en/grid-match.ts` — "What grid sizes are available?" ↔ "What page sizes and export formats are available?" *(puzzle-grid dimensions vs page dimensions — distinct)*
- `en/picture-path.ts` — "LPF maze algorithm" ↔ "collectible system" *(distinct sub-features)*
- `en/treasure-hunt.ts` — "how the puzzle works" ↔ "treasure-themed header" *(gameplay vs render)*

---

## Combined totals (Part 1 + Part 2)

| Metric | Part 1 | Part 2 | Combined |
|---|---|---|---|
| FAQ entries removed | 417 | 78 | **495** |
| Files modified | 330 | 73 | **403** (unique files: 1 shared + 329 app + 73 tool = 403) |

---

## Verification results

Per brief A.4 and final-deliverables:

### No in-page duplicate questions (all 11 locales, all apps + tools pages)

Script: `scripts/phase-a-verify-grep.js`

For every `/[locale]/apps/[slug]-worksheets` page (33 slugs × 11 locales): rendered FAQ list = shared commercial pool (4 entries/locale) + per-app FAQs. Grep for any question string appearing ≥ 2× in the rendered list. **Result: zero violations.**

For every `/[locale]/tools/[slug]-worksheet-maker` page: rendered FAQ list = shared usage pool (5 entries/locale) + per-tool FAQs. Same check. **Result: zero violations.**

### TypeScript compilation

`npx tsc --noEmit --skipLibCheck -p frontend/tsconfig.json` — zero errors in `frontend/config/app-content/` or `frontend/config/tool-content/`. (Pre-existing test-file errors in `__tests__/` and `e2e/` unchanged, unrelated.)

---

## Cross-sibling collisions (diagnostic; deferred to Phase C.2)

The verification script also diagnosed cross-page collisions — cases where the same question appears on both `/en/apps/foo-worksheets` AND `/en/tools/foo-worksheet-maker` for the same generator. This is a known Phase C.2 concern (FAQ split by intent); collisions here are **not** Phase A failures but feed the Phase C.2 worklist.

**EN-only count: 119 cross-sibling collisions across 32 generator pairs.** Most are "Is there a free trial?" (appearing on nearly every pair) plus generator-specific technical questions that exist on both sides. Phase C.2 will resolve by rule: apps pages keep commercial-intent FAQs, tools pages keep usage/technical-intent FAQs. Neither page keeps FAQs that belong on the sibling.

---

## Scripts (re-runnable, kept in `scripts/`)

| Script | Purpose |
|---|---|
| `scripts/phase-a-dedup.js` | Apps-side dedup (Part 1). `--dry-run` supported. Idempotent. |
| `scripts/phase-a-tools-enumerate.js` | Read-only tools-side enumeration. Emits the per-locale list of deletion targets. |
| `scripts/phase-a-tools-dedup.js` | Tools-side dedup (Part 2). `--dry-run` supported. Idempotent. |
| `scripts/phase-a-scan.js` | Markdown-table scan for remaining duplicates + near-duplicates + contradictions on EN pages. |
| `scripts/phase-a-verify-grep.js` | Final in-page uniqueness verification across all 11 locales. Exits non-zero on any in-page duplicate. |

---

## Phase A — DONE

Brief-required deliverables produced:
1. ✅ Per-page consolidated table (above).
2. ✅ Site-wide uniqueness grep — zero in-page violations.
3. ✅ Refund canonical decision documented, deployed to all 11 locales.
4. ✅ One commit series (two commits) scoped to Phase A on `pivot/printable-business-toolkit`.
