---
name: Tier 2 i18n Track C catalog rollout — per-batch progress tracker
description: Active progress tracker for Tier 2 catalog rollout (es + nl deck publishing batches). Frozen Phase-3a tracker stays at memory/project_phase3a_batch_progress.md. Each batch entry covers ZIPs published, Footer/Section-2 deltas, SHA, halt-and-surface findings.
type: project
originSessionId: tier2-track-c-batch-1
---
**Reading rule:** Read this entry at session start when working any Tier 2 catalog batch. Cross-reference `memory/project_tier2_i18n_recon.md` for the 3-track structural decoupling (Track A structural / Track B subscriber-i18n / Track C catalog).

**Writing rule:** Append a new batch entry below per real-mode publish. Include batch ID, ZIPs, Footer/Section-2 deltas, commit SHA, halt-and-surface findings if any.

---

## Batch 1 — matching cluster × es × kindergarten (shipped 2026-05-03)

**Batch ID:** `batch-tier2-trackc-1-matching-es-real`
**Commit SHA:** `035852c3`
**Real-mode publish:** 4 INSERTs, 0 collisions, 0 warnings, 0 errors

### ZIPs published

| ZIP | app | locale | theme | exercise_mode | age_range | subject_tags result |
|---|---|---|---|---|---|---|
| matching-letter-es-20260502215937 | matching | es | null | letter | 5-7 | {} (themeless) |
| grid-match-es-20260502220046 | grid-match | es | animals | null | 5-7 | {animals} (themed) |
| picture-sort-es-20260502220623 | picture-sort | es | null | null | 5-7 | {} (themeless) |
| shadow-match-es-20260502220136 | shadow-match | es | animals | null | 5-7 | {animals} (themed) |

### Tier 2 first-row event details

- **es catalog 0 → 4 rows.** Locale transitions from content-gated 404 to live HTTP 200 across all surfaces.
- **Footer Column 1:** "Español" entry surfaced (Tier-2-tier; F4 honesty discipline — array membership IS the gate).
- **Footer Column 2:** 2 es topic axis-keys surfaced — `animales` (theme axis from grid-match + shadow-match themed rows) + `jardin-infantil` (educational-level axis from all 4 rows at age_range=5-7).
- **Footer Column 3:** 4 es exercise-type axis-keys surfaced — `empareja-en-cuadricula` / `emparejar` / `empareja-sombras` / `clasificar-imagenes` per native-language slugs from topics-taxonomy.json.
- **Section 2 grid Option D stagger applied:** dropped math-puzzle-en (themed) + matching-letter-de (themeless); added grid-match-es (themed) + picture-sort-es (themeless); composition 3-en/3-de/2-es; 4-themed/4-themeless equilibrium preserved; sudoku-en inline-playable unchanged.
- **Sitemap delta:** 68 → 74 (+6 new es topic URLs).

### Halt-and-surface findings

**Halt 1 (REVISED — prompt premise contradicted production state):** Prompt's Step 2 halt-trigger was "theme value carries English 'animals' string in es ZIP (locale-conditional emission gap)." Initial pre-flight surfaced 2 of 4 themed es ZIPs carrying `theme: "animals"` (English-canonical), which matched the halt trigger as worded.

CC verified the prompt's claimed Tier 1 DE precedent against production DB: all 12 existing themed DE rows store `subject_tags={animals}` (English-canonical), NOT `{Tiere}` as the prompt asserted. The actual Tier 1 storage convention is **locale-agnostic English-canonical theme keys at the database column**; localization happens at the rendering layer via `topics-taxonomy.json`'s `theme.<axis-key>.name.<locale>` lookup.

The 4 es ZIPs were structurally consistent with actual Tier 1 storage precedent. The prompt conflated:
- **Theme as content classifier** (DB column, locale-agnostic English-canonical) — what production actually stores.
- **Slug as URL-bearing field** (locale-asymmetric per Batch 5b precedent) — what the picture-path/picture-trail pattern was about.

Theme is the former. Operator adjudicated **Path A (proceed)** with 4 amendments to the original prompt: halt-trigger removed, verification semantics corrected ({animals} not {animales}), production-verification clarified (/es/topic/animales/ resolves via topics-taxonomy.json lookup), doctrine-recording side-effect added. Filed for §15 amendment queue per Amendment 5.

**Halt 0 (operational hygiene):** publish-inbound had 8 pre-Phase-3a-era legacy top-level ZIPs (addition × 2, cryptogram × 2, picture-path × 2, sudoku × 2) that would have surfaced as collisions against published rows in bulk-publish glob. Verified all 8 already published in DB; archived to `/opt/lessoncraftstudio/publish-inbound/.legacy-pre-phase3a/` before SCP. Non-blocking but worth noting.

**Halt 0b (operational hygiene):** phase2-real-zips/ folder has 60+ Phase-3a residue ZIPs at session-end. Batch 1 filtered to the 4 -es- ZIPs explicitly via shell glob. Future batches should clean residue or use the same per-locale filter approach. The Phase-3a operational pattern was "operator overwrites folder per-batch" but that's broken at the Tier 2 transition.

### Production verification

- /en + /de + /es + /nl HTTP 200 (all 4 locale roots — es transitions from 404 to 200, Tier 2 first-row event)
- /es/topic/{emparejar,empareja-en-cuadricula,empareja-sombras,clasificar-imagenes}/ HTTP 200 (4 per-app topic pages)
- /es/topic/animales/ HTTP 200 (theme axis surfacing)
- /es/topic/jardin-infantil/ HTTP 200 (educational-level axis surfacing)
- /es/topic/preescolar/ HTTP 404 (correct F4 gating — no preschool decks at es; all 4 are kindergarten)
- /es/decks/{matching-letter,grid-match,picture-sort,shadow-match}/ HTTP 200 (4 deck pages)
- Footer en+de+es entries visible; nl absent (correct — no nl content yet)
- Section 2 grid renders 8 picks: 3 en + 3 de + 2 es; sudoku-en inline-playable

### Phase-3.0 W-1 propagation closure

Verified at 7th deck-creation batch (6 Phase-3a + 1 Tier 2 first). 2 themed rows auto-populated `subject_tags={animals}` via the publish.js INSERT path's manifest.theme derivation; 2 themeless rows correctly populated `subject_tags={}` via the same code path. publish-cli amendment at `fca9547e` validated end-to-end across the locale boundary.

### Pre-commit hook

Pre-commit checks PASSED (no `[AUTH]` exception needed this batch — Footer.tsx + homepage-featured-decks.json don't trip auth-system hook).

---

## Batch 2 — math cluster × es × mixed-level (shipped 2026-05-03)

**Batch ID:** `batch-tier2-trackc-2-math-es-real`
**Commit SHA:** `5a3e6988`
**Real-mode publish:** 4 INSERTs, 0 collisions, 0 warnings, 0 errors

### ZIPs published

| ZIP | app | locale | theme | exercise_mode | age_range | edu-level axis | subject_tags result |
|---|---|---|---|---|---|---|---|
| code-addition-es-20260502223432 | code-addition | es | null | null | 5-7 | kindergarten | {} (themeless) |
| math-puzzle-es-20260502223636 | math-puzzle | es | animals | null | 6-8 | grade-1 | {animals} (themed) |
| more-less-es-20260502223600 | more-less | es | null | null | 3-5 | preschool | {} (themeless) |
| subtraction-cross-out-es-20260502223317 | subtraction | es | animals | cross-out | 5-7 | kindergarten | {animals} (themed) |

### Tier 2 Batch 2 details

- **es catalog 4 → 8 rows.** 28% of 29-app C-1 endpoint reached.
- **2 new es educational-level axis-keys surfaced** (F4 honesty discipline; first-time emission events on /es):
  - `preescolar` (preschool axis from more-less-es 3-5)
  - `grado-1` (grade-1 axis from math-puzzle-es 6-8)
- **`jardin-infantil` from Batch 1 unchanged:** still surfacing; gets +2 deck rows (code-addition + subtraction-cross-out at 5-7).
- **Footer Column 1:** unchanged (en + de + es; nl still gated; Tier 3-4 still gated).
- **Footer Column 2:** +2 axes (preescolar + grado-1). Total /es Column 2: 4 axes.
- **Footer Column 3:** +4 es exercise-type axis-keys (resta + suma-codificada + mas-o-menos + rompecabezas-matematico per Track A topics-taxonomy.json es naming). Total /es Column 3: 8 axes.
- **Section 2 grid:** unchanged. Composition stays at 3-en/3-de/2-es. Option D semantics: stagger applies once per ~50% locale-completion increment; es at 28% below threshold. Next stagger trigger ≈ es ~50% (Batch 4 or 5).
- **Sitemap delta:** 74 → 80 (+6 = 4 new exercise-type axis URLs + 2 new educational-level axis URLs).

### Halt-and-surface findings

**None.** Pre-flight validated all 4 manifests against §14.10 canonical apps + locale + theme storage convention; theme="animals" (English-canonical) matches Tier 1 + Tier 2 Batch 1 storage precedent (doctrine reinforced in this Batch 2 prompt). DB collision pre-check returned 0 rows (correct — no es row pre-existed for these 4 cluster apps). Dry-run + real-mode both clean.

### Operational hygiene

- **publish-inbound Batch 1 residue archived:** 4 -es- ZIPs (matching-letter, grid-match, picture-sort, shadow-match) moved to `/opt/lessoncraftstudio/publish-inbound/.tier2-trackc-batch-1-matching-es/` before SCP. Mirror to Phase-3a `.phase3a-batch-N-*` archival pattern.
- **phase2-real-zips/ folder still has 60+ Phase-3a residue + 4 Batch 1 residue + 4 Batch 2 ZIPs** at session-end. Same residue carry-over as Batch 1; future batches continue to filter at SCP time. Operator-side cleanup pass deferred.

### Production verification

- /en + /de + /es + /nl HTTP 200 (all 4 locale roots; nl still 200 at locale root via Track A)
- /es/topic/{resta,suma-codificada,mas-o-menos,rompecabezas-matematico}/ HTTP 200 (4 new per-app topic pages)
- /es/topic/preescolar/ HTTP 200 (axis surfacing event #1)
- /es/topic/grado-1/ HTTP 200 (axis surfacing event #2)
- /es/topic/jardin-infantil/ HTTP 200 (carryover from Batch 1; now reflects 6 decks at 5-7)
- /es/topic/grado-2/ HTTP 404 (correct F4 gating — no grade-2 es decks)
- /es/decks/{subtraction-cross-out,code-addition,more-less,math-puzzle}/ HTTP 200 (4 new deck pages)
- Section 2 grid renders 8 picks: 3 en + 3 de + 2 es; sudoku-en inline-playable (composition unchanged from Batch 1)

### Cumulative state

- **es catalog:** 8/29 = 28% C-1 coverage.
- **Phase-3.0 W-1 propagation closure:** 8 consecutive deck-creation batches verified (6 Phase-3a + 2 Tier 2). Cumulative themed-rows {animals}: 28 (24 Tier 1 + 4 Tier 2).
- **Section 2 grid composition:** 3-en / 3-de / 2-es (unchanged at Batch 2; next stagger trigger ≈ Batch 4-5 at ~50% es coverage).
- **Total /es topic axes:** 12 (4 Column 2 educational-level/theme + 8 Column 3 exercise-type) per F4 honesty.

### Next-batch forecast

- **Batch 3:** likely literacy cluster (alphabet-train + prepositions + word-guess + wordsearch × es) mirroring Phase-3a Batch 3 shape. 4 ZIPs expected.
- **Section 2 stagger trigger:** activates at ≈50% es coverage (15/29). Currently at 28% (8/29). Estimate: triggers at Batch 4 or 5 depending on cluster sizes.

### Pre-commit hook

Pre-commit checks PASSED.

---

## Batch 3 — literacy cluster × es × kindergarten dominant (shipped 2026-05-03)

**Batch ID:** `batch-tier2-trackc-3-literacy-es-real`
**Commit SHA:** `305ec681`
**Real-mode publish:** 4 INSERTs, 0 collisions, 0 warnings, 0 errors

### ZIPs published

| ZIP | app | locale | theme | exercise_mode | age_range | edu-level axis | subject_tags result |
|---|---|---|---|---|---|---|---|
| alphabet-train-es-20260502225435 | alphabet-train | es | animals | null | 3-5 | preschool | {animals} (themed) |
| prepositions-fillin-es-20260502225502 | prepositions | es | null | fillin | 5-7 | kindergarten | {} (themeless) |
| word-guess-es-20260502225554 | word-guess | es | animals | null | 5-7 | kindergarten | {animals} (themed) |
| wordsearch-es-20260502225705 | wordsearch | es | null | null | 6-8 | grade-1 | {} (themeless) |

### Tier 2 Batch 3 details

- **es catalog 8 → 12 rows.** 41% of 29-app C-1 endpoint reached.
- **No new educational-level axis-key surfacings this batch.** All 4 rows land on axes already surfaced from Batches 1-2: preescolar (alphabet-train at 3-5; carryover from Batch 2's more-less); jardin-infantil (prepositions-fillin + word-guess at 5-7; carryover from Batch 1); grado-1 (wordsearch at 6-8; carryover from Batch 2's math-puzzle).
- **Footer Column 1:** unchanged (en + de + es; nl gated; Tier 3-4 gated).
- **Footer Column 2:** unchanged (preescolar + jardin-infantil + grado-1 carry over from Batches 1-2; deck-card counts grow per this batch's distribution). Total /es Column 2 axes: 4 (animales theme + 3 educational-level).
- **Footer Column 3:** +4 es exercise-type axis-keys (tren-del-abecedario + preposiciones + adivina-la-palabra + sopa-de-letras per Track A topics-taxonomy.json es naming). Total /es Column 3: 12 axes.
- **Section 2 grid:** unchanged. Composition stays at 3-en/3-de/2-es. Option D semantics: stagger at ~50% locale-completion; es at 41% still below threshold. Next stagger trigger ≈ Batch 4 close (target 50% = 15/29 rows).
- **Sitemap delta:** 80 → 84 (+4 = 4 new exercise-type URLs; no new edu-level axes).

### Halt-and-surface findings

**None.** Pre-flight validated all 4 manifests against §14.10 canonical apps + locale + theme storage convention. theme="animals" English-canonical reaffirmed across both Tier 2 Batch 1+2+3 (cumulative themed-rows {animals} = 30: 24 Tier 1 + 6 Tier 2). DB collision pre-check returned 0 rows (correct — no es row pre-existed for these 4 cluster apps). Dry-run + real-mode both clean.

### Operational hygiene

- **publish-inbound Batch 2 residue archived:** 4 -es- ZIPs (subtraction-cross-out, code-addition, more-less, math-puzzle) moved to `/opt/lessoncraftstudio/publish-inbound/.tier2-trackc-batch-2-math-es/` before SCP. Mirrors Batch 1 archival pattern (`.tier2-trackc-batch-1-matching-es/`); convention now established for Tier 2 Track C.
- **phase2-real-zips/ folder still has 60+ Phase-3a residue + 4 Batch 1 residue + 4 Batch 2 residue + 4 Batch 3 ZIPs** at session-end. Same residue carry-over; future batches continue per-locale + per-cluster filter at SCP time.

### Production verification

- /en + /de + /es + /nl HTTP 200
- /es/topic/{tren-del-abecedario,preposiciones,adivina-la-palabra,sopa-de-letras}/ HTTP 200 (4 new per-app topic pages)
- /es/topic/preescolar/ + /es/topic/jardin-infantil/ + /es/topic/grado-1/ HTTP 200 (carryover from Batches 1-2; deck-card counts grew this batch)
- /es/topic/grado-2/ HTTP 404 (correct F4 gating — no grade-2 es decks)
- /es/decks/{alphabet-train,prepositions-fillin,word-guess,wordsearch}/ HTTP 200 (4 new deck pages)
- Section 2 grid renders 8 picks: 3 en + 3 de + 2 es; sudoku-en inline-playable (composition unchanged from Batches 1-2)

### Cumulative state

- **es catalog:** 12/29 = 41% C-1 coverage.
- **Phase-3.0 W-1 propagation closure:** 9 consecutive deck-creation batches verified (6 Phase-3a + 3 Tier 2). Cumulative themed-rows {animals}: 30 (24 Tier 1 + 6 Tier 2).
- **Section 2 grid composition:** 3-en / 3-de / 2-es (unchanged across all 3 Tier 2 batches; stagger trigger ≈ Batch 4-5).
- **Total /es topic axes:** 16 (4 Column 2 educational-level/theme + 12 Column 3 exercise-type).
- **Tier 2 cadence:** Three batches same-day matches Phase-3a peak rhythm (9 commits + 7 publish-cli runtime batches in one calendar day).

### Next-batch forecast

- **Batch 4:** likely visual + puzzle residuals (big-small + chart-count + missing-pieces + pattern-worksheet × es) mirroring Phase-3a Batch 4a shape. 4 ZIPs expected.
- **Section 2 stagger trigger:** ~50% es coverage (15/29). Currently 41% (12/29). High likelihood Batch 4 closes at 16/29 = 55% — stagger likely activates. Recon-pick es candidates for stagger drops + adds: drop 1 en + 1 de from current grid; add 1-2 more es picks to reach 4 es picks (composition target post-stagger ≈ 2-en/2-de/4-es per Option D progression).
- **Track C Batch 4 prep:** consider which apps from this batch's 4 (big-small/chart-count/missing-pieces/pattern-worksheet) are themed vs themeless when picking grid candidates.

### Pre-commit hook

Pre-commit checks PASSED.
