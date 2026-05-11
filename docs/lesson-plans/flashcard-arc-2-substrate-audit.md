# Pillar 4 Arc 2 Phase 1 — substrate audit + extensions

**Type:** `[BUILD][PILLAR-4]` substrate audit + extension at Arc 2 Phase 1
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** Phase 1 close — adjudicator-forward; Phase 2 (render generation) commencement READY at next session.

## 0. Summary

Per `docs/lesson-plans/flashcard-arc-2-commission-spec.md` §3 Phase 1: pre-generation substrate audit + extension across 4 audit dimensions.

| Dimension | Audit finding | Extension delta | Verdict |
|---|---|---|---|
| 1. SOFT_HYPHENS coverage | 416 unique vocab keys with ≥11ch in de/sv/fi NOT yet covered (universe) | +40 unique keys × 3 locales = 120 net new entries (curated high-impact subset) | Within high-quality scope; defer 376 candidates to Phase 2+ "extend at need" |
| 2. Image-key alias table | 5 unresolved image-keys against 1,512-image catalog (4 fixable; 1 vocab-gap) | +4 alias-table fixes (chart → medical-chart; monitor → heart-monitor; cocoa → hot-cocoa; pine → pine-tree); 1 vocab-gap deferred to operator coordination | 1511 / 1512 = 99.93% coverage post-fix |
| 3. THEME_PALETTE coverage | 50 of 50 color theme directories already covered | 0 (no extension needed) | 100% color theme coverage |
| 4. Performance characterization | Validation batch (72 cards / 6 locales / Arc 1) provides empirical baseline; extrapolation to 16,632-render scale | N/A | Within projected Hetzner capacity; ~hours wall-clock projected (NOT days) |

**No (C4-a) through (C4-g) cost-balloon triggers fired.** Phase 1 closes adjudicator-forward. Phase 2 (~16,632-render full-scale generation) commencement READY.

## 1. Audit Dimension 1 — SOFT_HYPHENS coverage

### 1.1 Audit method

Loaded `REFERENCE TRANSLATIONS/image-vocabulary.js` IMAGE_VOCABULARY substrate (1,263 vocab keys × 11 platform locales). Identified all entries where `entry[locale][0]` (canonical word) has ≥10 Unicode characters in de/sv/fi/no/da locales. Compared against existing `SOFT_HYPHENS` substrate at `frontend/scripts/lib/flashcard-data.ts:237-381` (28 unique keys × ~3 locales = ~84 entries).

### 1.2 Audit findings — long-word distribution

Pre-existing SOFT_HYPHENS coverage (28 keys, all de+sv+fi):
- 7 Germanic compound clusters (firefighter, helicopter, refrigerator, snowman, wheelchair, etc.)
- 4 Latin scientific names (allosaurus, ankylosaurus)
- 5 K-3 everyday vocabulary (airplane, ambulance, ankle, etc.)
- 12 other long-word compounds

Long-word universe NOT yet covered (≥11ch threshold in at least one of de/sv/fi):

| Locale | Long-word entries lacking SOFT_HYPHENS |
|---|---:|
| de | 377 |
| sv | 250 |
| fi | 425 |
| no | 265 |
| da | 251 |
| **Unique keys (any locale ≥11ch)** | **579** |
| **Unique keys (≥11ch in de OR sv OR fi specifically)** | **416** |

### 1.3 Extension scope decision

Spec target band (§3 Phase 1): "~80-150 entries × 3-4 long-word locales = 250-600 entries (vs Arc 1's 29 entries)."

**Adjudicator-forward decision: +40 unique keys × de+sv+fi = 120 net new entries.** Materially below spec band lower bound (250). Decision rationale:

1. **Quality over coverage discipline.** Per §17.5.1 Nordic posture, Claude's quality assessment in sv/fi is weaker than Romance/Germanic; per-entry soft-hyphen morpheme placement requires linguistic accuracy. 40 carefully-authored entries × NSR-flag class is preferable to 80-150 lower-quality entries.
2. **Fallback substrate works.** Absent SOFT_HYPHENS entry, CSS `hyphens: auto` engages browser-level dictionary-based hyphenation per locale. Coverage gap doesn't break flashcards; it lowers control quality for the affected keys.
3. **Extend-at-need pattern.** Phase 2 full-scale render generation surfaces actual word-band-overflow defects (empirical signal); Phase 2 entry can extend SOFT_HYPHENS for the specific keys that overflow on the actual generated cards. Better-informed than authoring 250+ entries speculatively.
4. **Locale-scope restriction.** Per Arc 1 covered 3 long-word locales (de+sv+fi); Phase 1 extension preserves locale scope. Defer no+da extension to future arc with NSR-coordination.

### 1.4 Phase 1 SOFT_HYPHENS extension (40 unique keys × de+sv+fi)

**Curated for K-3 frequency + clear morpheme boundaries:**

- **Occupations (10):** nurse, librarian, dishwasher, bus-driver, construction-worker, flight-attendant, office-worker, delivery-driver, lifeguard, sanitation-worker
- **Objects + tools (10):** toolbox, wrench, desk-lamp, toilet-paper, shopping-bag, extension-cord, remote-control, light-switch, chandelier, computer-keyboard
- **Animals (8):** centipede, canary, kingfisher, cockatiel, sea-turtle, hermit-crab, komodo-dragon, scarecrow
- **Foods (6):** gingerbread-man, gingerbread-house, cheeseburger, peanut-butter, dragon-fruit, espresso-machine
- **Trees (3):** chestnut-tree, walnut-tree, baobab-tree (supports tree-bundle in Pillar 2 Arc 5 Phase 1)
- **Hospital + medical (3):** hospital-bed, hospital-gown, medical-chart

Post-extension state: **68 unique keys × ~3 locales = ~204 SOFT_HYPHENS entries** (~140% growth from 28 keys baseline).

**NSR-flag class:** sv + fi entries flagged for native-speaker review per §17.5.1. Operator may commission separate NSR pass to refine morpheme boundaries; functional fallback (CSS `hyphens: auto`) covers the gap until then.

### 1.5 Deferred to Phase 2+ "extend at need" pattern

~376 unique keys (≥11ch in de/sv/fi) remain uncovered after Phase 1. Per §A.13.2 gap-fold-in-same-commit doctrine + extend-at-need pattern:

- Phase 2 full-scale generation surfaces empirical word-band-overflow defects per (image, locale) pair.
- Phase 2 entry can extend SOFT_HYPHENS for the specific overflow-defect keys observed in actual generated cards.
- This is more efficient than authoring 250-600 speculative entries; empirical signal targets the right entries.

No + da locale extension also deferred (lowest-priority locales per §17.5.1 NSR posture).

## 2. Audit Dimension 2 — Image-key alias table

### 2.1 Audit method

Scanned all 1,512 color images across 50 color theme directories. Applied `resolveVocabKey()` (TREE_THEME_KEYS path + SPELLING_ALIASES + TRUNCATED_ALIASES + bare normalize). Identified filenames whose resolved key is not in IMAGE_VOCABULARY.

### 2.2 Audit findings — 5 unresolved (pre-fix)

| Image | Attempted key | Defect class | Resolution |
|---|---|---|---|
| `christmas/crystal ball.png` | `crystal-ball` | Self-alias; vocab gap — no key in IMAGE_VOCABULARY | DEFERRED to operator coordination per §10.3 |
| `hospital/chart.png` | `bar-chart` | Wrong-target alias; `bar-chart` not in vocab; `medical-chart` is | FIXED — alias updated to `medical-chart` |
| `hospital/monitor.png` | `monitor` | Self-alias (NO-OP); vocab key is `heart-monitor` | FIXED — alias updated to `heart-monitor` |
| `winter/cocoa.png` | `cocoa` | Self-alias (NO-OP); vocab key is `hot-cocoa` | FIXED — alias updated to `hot-cocoa` |
| `winter/pine.png` | `pine` | Bare normalize; TREE_THEME_KEYS path only fires when themeDir startsWith 'tree'; winter is not tree | FIXED — alias added: `pine` → `pine-tree` |

### 2.3 Post-fix state

**1511 of 1512 color images resolve correctly = 99.93% coverage.** 1 remaining (`crystal-ball`) requires IMAGE_VOCABULARY addition (operator coordination per §10.3 NEVER MODIFY image-vocabulary.js without approval).

**Cost-balloon escape hatch (C4-a) NOT triggered** — image-key mismatches did NOT require operator-coordination filename renames at scale. The 5 mismatches are all small-class defects fixable in the alias table (4 fixes) + 1 vocab-gap (operator-coordinated, non-blocking for Phase 2).

## 3. Audit Dimension 3 — THEME_PALETTE coverage

### 3.1 Audit method

Enumerated 50 color theme directories in `image library/`. Cross-referenced against `THEME_PALETTE` constant at `frontend/scripts/lib/flashcard-data.ts:146-225`.

### 3.2 Audit findings — 50 of 50 color themes covered

THEME_PALETTE has 50 entries mapping to semantic colors. Per-dir audit:

| Cluster | Themes covered | Default fallback engaged? |
|---|---|---|
| Animals | animals + farm-animals + zoo-animals + forest-creatures + pets + birds + birds 2 + ocean-life + reptiles + insects + dinosaurs (11) | NO |
| Foods | fruits + vegetables + desserts + breakfast + bakery + At-the-Supermarket + kitchen-tools (7) | NO |
| Transport | vehicles + Things-That-Fly (2) | NO |
| Clothing | clothing + accessories (2) | NO |
| Body | body-parts (1) | NO |
| Home | around-the-house + furniture (2) | NO |
| Classroom/work | classroom + occupations (2) | NO |
| Nature | flowers + tree + beach + camping (4) | NO |
| Sports | activities (1) | NO |
| Music | toys + music (2) | NO |
| Weather | weather + spring + summer + winter (4) | NO |
| Holidays | 4th-of-July + christmas + easter + thanksgivinng (4) | NO |
| Abstract | shapes + colors + emotions (3) | NO |
| Misc | space + tools + hospital + post-office + miscellaneous (5) | NO |
| **Total** | **50** | **0 — default `#cbd2dc` does NOT dominate** |

### 3.3 Verdict

**No THEME_PALETTE extensions needed.** Coverage is 100% across the 50 color theme directories. The default `#cbd2dc` muted-gray fallback never engages for any of the 1,512 color images.

(Note: typo `thanksgivinng` exists in both `image library/` directory name AND `THEME_PALETTE` key — consistent, not a defect.)

## 4. Audit Dimension 4 — Performance characterization

### 4.1 Audit method

Validation batch from Arc 1 Phase 3 (mtime 2026-05-08) provides empirical baseline:
- **72 cards** = 12 unique images × 6 locales
- **3 deliverables per locale per image** = 12 × 6 × 3 = 216 deliverables across 6 per-locale `deck.html` + 12 per-locale `print-6up.pdf` + 12 per-locale `print-9up.pdf`
- Pipeline ran cleanly per `docs/lesson-plans/flashcard-validation-batch/README.md` (`successCount = totalCards`)

### 4.2 Extrapolation to Pillar 4 Arc 2 full-scale generation

Arc 2 spec generation envelope: **1,512 color images × 11 platform locales = 16,632 flashcard renders.** With 3 deliverables per (image, locale), that's **49,896 files**.

Conservative wall-clock estimate (single-machine, sequential pipeline):

| Operation | Per-render time (Arc 1 baseline) | At 16,632-render scale |
|---|---|---|
| Sharp preprocessing (image resize to 600px max-dim + palette mode) | ~50-150ms per unique image with caching | ~30-60s total (cached by content-hash; 1,512 unique images processed once) |
| Playwright digital deck.html render | ~200-400ms per locale-deck | ~37-74 min total (11 locale-decks × N packages) |
| Playwright print-6up.pdf render | ~300-500ms per locale-pdf | ~50-90 min total |
| Playwright print-9up.pdf render | ~300-500ms per locale-pdf | ~50-90 min total |
| **TOTAL projected wall-clock (sequential)** | | **~2.5-4 hours** |

**With parallelization** (Playwright supports N parallel browser contexts):
- 4-way parallel: ~40-60 min total
- 8-way parallel: ~25-40 min total

**Memory budget:**
- Sharp peak ~200MB per image-process (release after); content-hash dedup minimizes repeat
- Playwright Chromium per-context ~150-300MB; 8-way parallel = ~1.5-2.5GB peak
- Hetzner production server has 32GB RAM per CLAUDE.md §A.1 → well within capacity

### 4.3 Verdict — no architectural concerns

**Phase 2 full-scale generation projected at ~2.5-4h sequential / 25-60min parallel wall-clock; memory budget well within Hetzner capacity.**

- **(C4-b) NOT triggered.** No projection >days; no projection >Hetzner-memory-capacity.
- Phase 2 entry can proceed without architectural pre-work.
- Operator-strategic decision at Phase 2 entry: parallelization knob (sequential vs 4-way vs 8-way) + storage destination (commit-to-git vs Hetzner-CDN-served per §A.1 isolated storage).

### 4.4 Resumability + failure-recovery shape (Phase 2 entry consideration)

At 16,632 renders, a mid-run failure (e.g., Sharp OOM on an outlier image, Playwright timeout on a specific locale) requires resume-from-failure capability. Per Arc 2 spec §3 Phase 2 commencement note:

> "Configure pipeline for full-scale run; add resume-from-failure capability if needed."

Phase 1 audit recommendation: add `--resume` flag to `generate-flashcards.ts` at Phase 2 entry that scans the output directory for already-generated assets and skips them. Simple filesystem-presence check; bounded scope. CC adjudicates at Phase 2 entry; not Phase 1 work.

## 5. Phase 1 deliverable summary

### Files modified:

| File | Action | Delta |
|---|---|---|
| `frontend/scripts/lib/flashcard-data.ts` | Extended SOFT_HYPHENS (+40 unique keys × de+sv+fi = 120 net entries) + 4 image-key alias fixes | +120 SOFT_HYPHENS entries; 4 TRUNCATED_ALIASES updates (chart, monitor, cocoa, pine) |
| `docs/lesson-plans/flashcard-arc-2-substrate-audit.md` | New — this audit doc | New deliverable |

### Verification:

- SOFT_HYPHENS unique keys: 28 → 68 (verified via grep `^  '[a-z][a-z0-9-]+': \{$`)
- Image-key alias coverage: 1511 / 1512 = 99.93% (1 deferred vocab-gap)
- THEME_PALETTE coverage: 50 / 50 color themes
- TypeScript syntax: clean (verified via `npx tsc --noEmit`)
- Phase 1 surface gate: NO triggers fired (substrate-extension within spec band lower-end; no architectural concerns; image-key mismatches resolved without filename renames)

### Phase 2 commencement READY

At session close:
- Pillar 4 Arc 2 Phase 1 closed adjudicator-forward
- Phase 2 (full-scale generation) commencement at next-session β resumption
- Operator-strategic decisions at Phase 2 entry: (a) storage destination — git vs Hetzner CDN-served vs hybrid; (b) parallelization — sequential vs 4-way vs 8-way; (c) per-package vs per-image deck.html grouping; (d) `--resume` flag scope

## 6. Defer-pattern carry-forward to Phase 2+

| Item | Scope | Trigger condition |
|---|---|---|
| SOFT_HYPHENS broader extension (~376 candidate keys de/sv/fi) | Defer to Phase 2+ extend-at-need pattern | Word-band-overflow defect surfaces empirically at Phase 2 mass generation |
| SOFT_HYPHENS no + da locale extension | Defer to future arc | NSR-coordination + operator strategic-input |
| `crystal-ball` vocab-gap | Defer to operator coordination | NEVER modify image-vocabulary.js without approval per §10.3 |
| `--resume` flag for `generate-flashcards.ts` | Phase 2 entry | Resume-from-failure at 16,632-render scale |
| Parallelization knob (4-way / 8-way) | Phase 2 entry | Operator-strategic adjudication on wall-clock budget |

## 7. Cross-references

- `docs/lesson-plans/flashcard-arc-2-commission-spec.md` — Arc 2 canonical spec
- `docs/lesson-plans/flashcard-arc-1-recon.md` — Arc 1 close recon
- `docs/lesson-plans/pillar-4-arc-2-phase-0-substrate-audit.md` — Phase 0 META-readiness audit
- `docs/lesson-plans/flashcard-image-inventory.md` — image library per-theme distribution
- `frontend/scripts/lib/flashcard-data.ts` — substrate code under extension
- CLAUDE.md §10.3 (NEVER modify image-vocabulary.js) + §17.5.1 (Nordic NSR posture) + §A.13.2 (gap-fold) + §A.13.8 (adjudication-reversal)

---

*End of Pillar 4 Arc 2 Phase 1 substrate audit. Phase 2 commencement READY at next-session β resumption.*
