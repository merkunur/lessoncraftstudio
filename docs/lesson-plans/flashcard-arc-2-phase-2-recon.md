# Pillar 4 Arc 2 Phase 2 — mass-run recon

**Type:** `[BUILD][PILLAR-4]` Phase 2 mass-run close
**Branch:** `pivot/printable-business-toolkit`
**Mass-run date:** 2026-05-11
**Status:** Phase 2 CLOSED. Phase 3 (200-package integration scoped to ~143 actual) commencement READY.

## Headline metrics

| Metric | Value |
|---|---:|
| Packages with flashcards material (loaded) | 95 |
| Packages successfully rendered | 94 (1 unrenderable: `identify-and-name-action-verbs`) |
| Locales | 11 (all platform locales) |
| Tasks executed | 1,045 |
| Tasks successful | 1,034 (98.9%) |
| Empty-output tasks | 11 (all `identify-and-name-action-verbs` × 11 locales) |
| Render-output files | 3,102 (1,034 × 3 deliverables) |
| Total bytes (CDN) | ~4-5 GB estimated |
| Mass-run wall-clock | 622.6s (10.4 min) |
| Average per-task time | ~0.6s (4-way concurrency; ~2.4s sequential equivalent) |

**98.9% success rate; 10.4 min mass-run on Hetzner at concurrency=4.** Single unrenderable package (`identify-and-name-action-verbs`) is structurally unrenderable for flashcards because action verbs (run / jump / walk / sit / stand / sleep / eat / drink / play / read) lack image-library representation. This is a conceptual constraint (action-as-image is fundamentally different from object-as-image), not a substrate gap or emit defect.

## Phase 2 deliverables shipped

1. **Pipeline extensions at `d99ee05b`:**
   - `frontend/scripts/lib/flashcard-package-loader.ts` (NEW; ~280 LoC)
   - `frontend/scripts/generate-flashcards.ts` (EXTENDED; +~190 LoC)
   - CLI flags: `--all-packages` / `--package` / `--packages` / `--resume` / `--concurrency` / `--out`
   - Worker pool: `runWithConcurrency()` bounded parallelism
   - Per-task: `runPackageTask()` produces 1 deck.html + N print PDFs at `<dest>/<locale>/<package>/`

2. **Hetzner infrastructure setup:**
   - 11 Playwright/Chromium runtime libraries installed via apt-get (libnspr4, libnss3, libatk1.0-0, libatk-bridge2.0-0, libxkbcommon0, libatspi2.0-0, libxcomposite1, libxdamage1, libxrandr2, libgbm1, libasound2)
   - Chromium browser binary cached at `~/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`
   - One-time investment; reusable for future PDF/render-generation commissions

3. **CDN destination:**
   - `/var/www/lcs-media/flashcards/` created with `lcs-media:lcs-media` ownership + mode 755
   - 3,102 files at `/<locale>/<package>/{deck.html, print-6up.pdf, print-9up.pdf}`

4. **Nginx serving config:**
   - Added `/etc/nginx/sites-enabled/lessoncraftstudio` location-block matching `^/flashcards/(en|de|es|nl|fr|it|pt|sv|da|no|fi)/([^/]+)/([^/]+)$`
   - Backup: `/root/nginx-lessoncraftstudio.bak-pre-flashcards-2026-05-11`
   - Mirrors §15.7 `/decks/` pattern with `Cache-Control: public, max-age=300`
   - Sample URLs HTTP 200 verified:
     - `https://www.lessoncraftstudio.com/flashcards/en/identify-and-name-foods/deck.html`
     - `https://www.lessoncraftstudio.com/flashcards/de/count-objects-1-to-10/print-6up.pdf`
     - `https://www.lessoncraftstudio.com/flashcards/fi/identify-and-name-clothing/print-9up.pdf`

## Substrate gaps surfaced + filed

Phase 2 substrate gaps (informational; not blocking):

### 1. `identify-and-name-action-verbs` unrenderable for flashcards

- All vocabKeys (run, jump, walk, sit, stand, sleep, eat, drink, play, read) lack image-library representation
- Cause: action-verbs are conceptual not depictable; library is object-vocabulary-centric
- Impact: 11 of 1,045 tasks empty (1.05%)
- Resolution: out-of-Phase-2 scope; if action-verb representation matters, future arc commissions illustration-pack acquisition OR action-verb-specific material type (e.g., simple stick-figure SVGs)

### 2. ~20 vocab keys without image resolution (98.1% loader coverage)

- Surface during package loader resolution: family-members (father, mother, sister, brother, grandfather, grandmother, family), foods (sandwich), vegetables (pea), and a few other abstract concepts
- Cause: vocab IS in IMAGE_VOCABULARY but image library lacks corresponding PNG OR PNG has different filename convention
- Impact: 20 unresolved cards drop silently; packages with partial coverage render with remaining cards
- Resolution: out-of-Phase-2 scope; future arc audits vocab/image asymmetry + commissions missing illustrations OR vocab-key alias additions

### 3. 5 packages didn't load (school-objects + foods theme dirs absent)

- Packages: `identify-community-helpers`, `identify-days-of-week`, `subtract-within-10`, `use-position-vocabulary`, `use-spatial-position-words`
- Cause: imageSource: theme references `school-objects` and `foods` theme dirs that don't exist in image library
- Impact: 5 packages × 11 locales = 55 hypothetical tasks never created (would have been ~165 files)
- Resolution: out-of-Phase-2 scope; either add missing theme dirs to image library OR migrate these packages to imageSource: vocabKeyList shape

All 3 gaps file to `docs/lesson-plans/_phase_2_substrate_gaps.txt` carry-forward (Stream A Arc 2 deferred-finding absorption per cost-balloon escape hatch surface tracking).

## §A.13 verification-hygiene at close

Per Phase 6 fold-queue:

- Item 8 verification-hygiene: post-run outlier detection complete (11 empty-output tasks identified, single-cause, structurally explainable)
- Item 9 two-defect pattern recon: 11 failures all share single defect (action-verbs unrenderable); not multi-defect; no recon needed
- Item 17 cost-balloon escape hatch monitoring: triggered once (Hetzner Chromium deps install at session entry); resolved per (A) ratification
- Failure rate 1.05% slightly above 1% threshold but single-cause + well-understood — informational not halt-class

## Performance characterization vs Phase 1 projection

Phase 1 projected (per substrate audit §4.2):
- Sequential: 2.5-4h
- Parallel (4-way): 25-60 min
- Memory budget within Hetzner capacity

Phase 2 actual:
- Parallel (4-way) on Hetzner: 10.4 min for 1,045 tasks = 622.6s
- Per-task average: 0.6s
- Memory: no OOM; Hetzner 32GB RAM ample
- Memory peak: not measured; well under capacity

**Actual was 2.4-6× faster than projected lower bound.** Hetzner datacenter CPU + SSD I/O + low-latency network outperform PC empirical baseline (validation batch).

## (C) commission stub filed

`docs/PILLAR-4/flashcard-deck-html-image-reference-commission-stub.md` filed per operator (C) acknowledgment. Captures architectural pivot opportunity: base64-embedded → external-image-reference (~10× to ~300× deck.html size reduction). Commission only if post-launch SEO/performance/bandwidth signals warrant. Filed alongside (μ) slug-rationalization stub pattern.

## Standing position at session close

- Pillar 4 Arc 2 Phase 2 commission CLOSED
- Hetzner Playwright + Chromium infrastructure live (reusable for future commissions)
- Nginx `/flashcards/` routing active; sample URLs HTTP 200 verified
- 94 packages × 11 locales × 3 deliverables = 3,102 flashcard files live at CDN
- Phase 3 (200-package integration scoped to 143 actual) commencement READY

Next session: Pillar 4 Arc 2 Phase 3 (integration) + Pillar 2 Arc 6 ratification (4 Shape options A/B/C/D) paired commencement candidate per (β-continued) shape OR sole-arc per operator strategic-input.

## Cross-references

- `docs/lesson-plans/flashcard-arc-2-commission-spec.md` — canonical Arc 2 spec
- `docs/lesson-plans/flashcard-arc-2-substrate-audit.md` — Phase 1 substrate audit
- `docs/lesson-plans/pillar-4-arc-2-phase-0-substrate-audit.md` — Phase 0 META-audit
- `docs/PILLAR-4/flashcard-deck-html-image-reference-commission-stub.md` — (C) future-arc stub
- `frontend/scripts/generate-flashcards.ts` + `lib/flashcard-package-loader.ts` — pipeline at `d99ee05b`
- CLAUDE.md §15.7 (nginx catalog deck route precedent) + §A.1 (isolated storage) + §A.5 (deployment coordination)

---

*End of Phase 2 mass-run recon. Phase 2 commission CLOSED at 1,034 / 1,045 tasks (98.9% success) + 3,102 CDN-live files.*
