---
name: Phase-3a batch progress tracking
description: Per-batch status across the Phase-3a bulk-deck-creation arc. Endpoint locked at C-1 (29 apps × 2 locales = 58 (app, locale) rows). Read at start of each Batch-N plan-pass for cluster forecast + locale-mirror residuals.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
**Reading rule:** read at start of each Phase-3a Batch-N commission. Cluster forecast informs Batch-(N+1) plan-pass.

**Endpoint:** Phase-3a CLOSED at `9b2c608e` (Batch 5b-2 ship). **58/58 = 100% C-1 endpoint reached.** **ARC-CLOSURE-FINAL state.**

---

## Batch 1 — matching cluster (CLOSED 2026-05-03)

- **Commit (Footer):** `fbd785df`
- **Pipeline batch:** `batch-20260502132659` (real-mode publish, 13:26:59 UTC)
- **Apps published:** matching, grid-match, shadow-match, picture-sort × en+de = 8 ZIPs
- **Theme distribution:** 4 themed (animals — grid-match × 2 + shadow-match × 2); 4 themeless (matching × 2 with exercise_mode=letter + picture-sort × 2 with two-side dual-theme; both operator-adjudicated)
- **Phase-3.0 W-1 closure:** VERIFIED at real-mode publish. 4/4 themed rows propagated `subject_tags={animals}` automatically; 4/4 themeless rows correctly populated `subject_tags={}`. publish.js amendment at `fca9547e` working.
- **Catalog state post-batch:** 23 published, 1 archived (picture-path-en sealed). 8 of 29 apps shipped pre-batch → 12 of 29 post-batch (41% coverage).
- **Sitemap growth:** +8 unique topic URLs (4 new exercise-type axis-keys × 2 locales).
- **Footer columns:** en grew from 7 → 11 entries; de grew from 8 → 12 entries.

## Batch 2 — math cluster (CLOSED 2026-05-03)

- **Commit (Footer):** `105eff14`
- **Pipeline batch:** `batch-20260502135316` (real-mode publish, 13:53:16 UTC)
- **Apps published:** subtraction (mode=cross-out), code-addition, more-less, math-puzzle × en+de = 8 ZIPs
- **Theme distribution:** 4 themed (animals — subtraction × 2 + math-puzzle × 2); 4 themeless (code-addition × 2 + more-less × 2 — operator-adjudicated)
- **Phase-3.0 W-1 closure:** CONTINUES working. 4/4 themed rows propagated `subject_tags={animals}`; 4/4 themeless rows populated `subject_tags={}` correctly.
- **Catalog state post-batch:** 31 published, 1 archived. 16 of 29 apps shipped (55% coverage).
- **Sitemap growth:** +10 unique topic URLs (4 new exercise-type axis-keys × 2 locales + preschool axis-key surfaced for first time × 2 locales from more-less rows).
- **Footer columns:** en grew 11 → 15; de grew 12 → 16. FOOTER_TOPICS also grew (en 3 → 5: +preschool +grade-2; de 3 → 5: +tiere +vorschule). The pre-existing footer-topic gaps (tiere missing in DE; grade-2 missing in EN) closed in this commit.
- **Mode-variant slugs surfaced:** subtraction-cross-out (matches Batch 1's matching-letter pattern; manifest.exercise_type='subtraction' canonical, manifest.slug carries mode-variant suffix).

## Batch 3 — literacy cluster (CLOSED 2026-05-03)

- **Commit (Footer):** `7a9da726`
- **Pipeline batch:** `batch-20260502141510` (real-mode publish, 14:15:10 UTC)
- **Apps published:** alphabet-train, prepositions (mode=fillin), word-guess, wordsearch × en+de = 8 ZIPs
- **Theme distribution:** 4 themed (animals — alphabet-train × 2 + word-guess × 2); 4 themeless (prepositions × 2 mode=fillin + wordsearch × 2 — operator-adjudicated)
- **Phase-3.0 W-1 closure:** VERIFIED across THREE consecutive batches. 4/4 themed propagated; 4/4 themeless populated empty array correctly.
- **Catalog state post-batch:** 39 published, 1 archived. 20 of 29 apps shipped (69% coverage).
- **Sitemap growth:** +8 unique topic URLs (4 new exercise-type axis-keys × 2 locales). preschool extended (alphabet-train at 3-5 joins more-less); grade-1 extended (wordsearch at 6-8 joins math-puzzle + word-scramble).
- **Footer columns:** en grew 15 → 19; de grew 16 → 20.
- **Mode-variant slug pattern:** prepositions-fillin matches the established matching-letter / subtraction-cross-out / cipher pattern from Batches 1 + 2.

## Batch 4a — visual + puzzle residuals (CLOSED 2026-05-03)

- **Commit (Footer):** `c6544d0c`
- **Pipeline batch:** `batch-20260502175415` (real-mode publish, 17:54:15 UTC)
- **Apps published:** big-small (mode=findBig), chart-count, missing-pieces, pattern-worksheet × en+de = 8 ZIPs
- **Theme distribution:** 3 themed (animals — chart-count-de + missing-pieces × 2); 5 themeless (big-small × 2 + chart-count-en + pattern-worksheet × 2 — operator-adjudicated)
- **Phase-3.0 W-1 closure:** VERIFIED across FOUR consecutive batches. 3/3 themed propagated; 5/5 themeless empty-array correctly. **chart-count-de also exercised the chart-count locale-fix `877522bc` (closure-mismatch on window.currentLocale) on the bundle.contentLanguage path — clean propagation, no regressions. Two fixes verified on a single row.**
- **Catalog state post-batch:** 47 published, 1 archived. 24 of 29 apps shipped (83% coverage).
- **Sitemap growth:** +8 unique topic URLs (+32 entries).
- **Footer columns:** en grew 19 → 23; de grew 20 → 24.
- **Mode-variant slugs:** big-small-findbig (mode=findBig camelCase preserved through publish-cli; manifest.exercise_type='big-small' canonical).

## Batch 4b — puzzle + search residuals (CLOSED 2026-05-03)

- **Commit (Footer):** `133fbd18`
- **Pipeline batch:** `batch-20260502182954` (real-mode publish, 18:29:54 UTC)
- **Apps published:** odd-one-out, find-and-count, find-objects, treasure-hunt × en+de = 8 ZIPs
- **Theme distribution:** 6 themed (animals — odd-one-out × 2 + find-and-count × 2 + treasure-hunt × 2); 2 themeless (find-objects × 2 — operator-adjudicated)
- **Phase-3.0 W-1 closure:** VERIFIED across FIVE consecutive batches. 6/6 themed propagated; 2/2 themeless empty-array correctly.
- **Catalog state post-batch:** 55 published, 1 archived. 28 of 29 apps shipped (97% coverage).
- **Sitemap growth:** +8 unique topic URLs (+32 entries: 195 → 227 → 259 across Batches 4a + 4b).
- **Footer columns:** en grew 23 → 27; de grew 24 → 28.
- **No mode-variant slugs this batch** — all 8 ZIPs had exercise_mode=null.

## Batch 5a — math-worksheet only (CLOSED 2026-05-03; Reshape A split)

- **Commit (Footer):** `ed0f8000`
- **Pipeline batch:** `batch-20260502192931` (real-mode publish, 19:29:31 UTC)
- **Apps published:** math-worksheet × en+de = 2 ZIPs
- **Theme distribution:** 0 themed; 2 themeless (operator-adjudicated — symbolic-equation rendering doesn't pair naturally with theme=animals)
- **Phase-3.0 W-1 closure:** VERIFIED across SIX consecutive deck-creation batches. 0/0 themed; 2/2 themeless empty-array correctly.
- **Catalog state post-batch:** 57 published, 1 archived. **57/58 (app, locale) = 98% C-1.** Arc still in-flight.
- **§15.10 seal verification:** `/en/topic/picture-path/` returns 404 post-Batch-5a deploy (archived row not leaking into public surface). `/de/topic/bildpfad/` returns 200 (de row unaffected).
- **Reshape A split rationale:** original Batch 5 plan called for 3 ZIPs single-batch closeout (math-worksheet × en+de + picture-path-en NEW slug per §15.10). Halt-and-surface during Batch-5 pre-flight detected:
  1. Operator-authored picture-path-en ZIP carried `deck_id = picture-path-en-20260502184722` → publish-cli would slugify to `picture-path` → §15.10 block-on-reuse violation against the archived (en, picture-path) row.
  2. `picture-trail` not registered in `topics-taxonomy.json axes.exercise-type` (axis-key gap; would fail substitute step at `__LINK_MORE_TYPE__`; no `/en/topic/picture-trail/` route generated).
  3. Slug field is app-emitted (not operator-editable) — picture-path generator emits its own canonical app name into deck_id at catalog-export time. Re-authoring requires source-edit at the picture-path app's emission code path.
- **Reshape A decision:** ship math-worksheet now (clean; 2 of 3 closures); defer picture-trail to Batch 5b after CC source-edits picture-path app. picture-path-en-20260502184722.zip parked at `phase2-deferred/` for 5b reuse.

## Batch 5b-1 — picture-path app source-edit (CLOSED 2026-05-03; UNBLOCKS 5b-2)

- **Commit:** `67d5d99d`
- **Source-edit pass — NOT a deck publish** (no batch ID, no INSERTs).
- **Files modified (2):**
  1. `REFERENCE APPS/picture-path.html` — single-site fork at line 8162+ in `handleExportToCatalog()`. Pre-edit: `exerciseType: 'picture-path'` hard-coded. Post-edit: `var contentLocale = window.currentLocale || 'en'; var localeAwareExerciseType = (contentLocale === 'en') ? 'picture-trail' : 'picture-path';`. `generator.app: 'picture-path'` literal stays per §14.10. app_version 29.2.0 → 29.3.0. Inline comment block documents §15.10 block-on-reuse worked-example.
  2. `frontend/config/topics-taxonomy.json axes.exercise-type` — added `picture-trail` axis-key (en only): `{ "slug": { "en": "picture-trail" }, "name": { "en": "Picture Trail" } }`. Existing picture-path entry unchanged (de slug + de name + en slug/name preserved). apps.picture-path entry unchanged.
- **Single-site fork rationale:** deck_id is composed downstream from exerciseType inside `catalog-export.js buildDeckId` at line 102. Forking `exerciseType` alone covers both deck_id and exercise_type slug-bearing layers — no second fork at deck_id site needed.
- **Locale-asymmetry decision:** picture-trail registered en-only in topics-taxonomy.json (no de slug/name). publish-cli's missing-locale-skip behavior per §16.5 doctrine handles future non-en locales naturally — they emit picture-path under canonical slug.
- **Deploy:** two-step per §A.4. (1) `deploy.sh` for git-side; (2) `update-worksheet.sh` for chattr-immutable served copy at `/var/www/lcs-media/worksheet-generators/picture-path.html`. Verified live: `localeAwareExerciseType` literal present 2× in served copy (declaration + use).

## Batch 5b-2 — picture-trail-en publish (CLOSED 2026-05-03; ARC-CLOSING)

- **Commit (Footer):** `9b2c608e`
- **Pipeline batch:** `batch-20260502200023` (real-mode publish, 20:00:23 UTC)
- **App published:** picture-trail-en = 1 ZIP final-batch
- **Manifest verification PASS** pre-publish: generator.app=picture-path (canonical), language=en, exercise_type=picture-trail (NEW), deck_id=picture-trail-en-20260502195347 (NEW slug pattern), app_version=29.3.0 (confirms operator used source-edited app from `67d5d99d`).
- **Slug-collision pre-check:** 0 picture-trail rows pre-publish; archived (en, picture-path) row remained `status='archived'` (seal intact); published (de, picture-path) row remained `status='published'` (unaffected).
- **Theme distribution:** 0 themed; 1 themeless (operator-discretion). subject_tags={} populated correctly.
- **Phase-3.0 W-1 closure:** VERIFIED across SEVEN consecutive deck-creation batches.
- **Catalog state post-batch:** **58 published, 1 archived. 58/58 = 100% C-1 endpoint REACHED.**
- **§15.10 seal verification (post-Batch-5b-2 deploy):**
  - `/en/topic/picture-trail/` → 200 ✓ (NEW axis-key live)
  - `/en/topic/picture-path/` → 404 ✓ (archived row stays sealed)
  - `/de/topic/bildpfad/` → 200 ✓ (picture-path-de unaffected)
  - `/de/topic/picture-trail/` → 404 ✓ (locale-asymmetric registration verified)
- **Footer columns:** en grew to 28 entries (+picture-trail); de unchanged at 28.
- **Sitemap delta:** 267 → 270 = +3 entries (1 unique URL × multiplier limited by en-only registration).

---

## ARC-CLOSURE FINAL SUMMARY

**Phase-3a deck-creation arc CLOSED at `9b2c608e` (2026-05-02).** 100% of C-1 endpoint reached.

### Stats

- **Total batches:** 5 (with Reshape A split: 5a + 5b-1 source-edit + 5b-2 publish).
- **Total deck publishes via Phase-3a:** 35 net (catalog grew 23 → 58). Batch-attributed publishes: 8 (B1) + 8 (B2) + 8 (B3) + 8 (B4a) + 8 (B4b) + 2 (B5a) + 1 (B5b-2) = 43 publishes; 35 net to catalog (the 8-row delta accounts for pre-Phase-3a catalog rows already at 23 not contributed by Phase-3a publishes).
- **Cumulative themed rows with `subject_tags={animals}`:** 24 of 58 (3 pre-Phase-3.0 stop-gap + 21 Phase-3a-amended INSERT path).
- **Cumulative themeless rows correctly empty:** 34 of 58 (12 legacy + 22 themeless-by-operator-discretion).
- **Cumulative `exercise_mode` populated:** 10 of 58 across 5 mode-variants (image-image, letter, cross-out, fillin, findBig). 48 null per W-2 reclassification.
- **Total git commits in arc:** 9.
  1. Batch 1 footer `fbd785df`
  2. Batch 2 footer `105eff14`
  3. Batch 3 footer `7a9da726`
  4. chart-count locale-fix `877522bc` (side-effect bug-fix)
  5. Batch 4a footer `c6544d0c`
  6. Batch 4b footer `133fbd18`
  7. Batch 5a footer `ed0f8000`
  8. Batch 5b-1 source-edit `67d5d99d`
  9. Batch 5b-2 footer `9b2c608e` (ARC-CLOSING)
- **Total publish-cli runtime batches:** 7 (no git artifact for the publishes themselves).
- **Total operator-coordinated handoff cycles:** 6 (5 ZIP-author cycles for Batches 1-4b + 1 source-edit-then-reauthor cycle for 5b).
- **Cadence:** 9 commits + 7 publish-cli runtime batches across 1 calendar day (2026-05-02). Far above the projected 2-batches/week target.

### Phase-3.0 W-1 closure verification chain

Verified across SEVEN consecutive deck-creation batches with zero regressions:
- Batch 1: 4 themed + 4 themeless ✓
- Batch 2: 4 themed + 4 themeless ✓
- Batch 3: 4 themed + 4 themeless ✓
- Batch 4a: 3 themed + 5 themeless ✓ (chart-count-de also exercised the chart-count locale-fix `877522bc` on bundle.contentLanguage path — clean propagation, no regressions; two fixes verified on a single row)
- Batch 4b: 6 themed + 2 themeless ✓
- Batch 5a: 0 themed + 2 themeless ✓
- Batch 5b-2: 0 themed + 1 themeless ✓
- Total: 21 themed propagated `{animals}`; 22 themeless correctly `{}`. 0 regressions.

(The publish-cli amendment at `fca9547e` itself is excluded from the verification chain — it preceded the chain rather than being part of it.)

### Locale-conditional emission as canonical archived-slug recovery pattern

Established by Batch 5b-1 + 5b-2 for §15.10 block-on-reuse cases:
- **When:** an archived (locale, slug) row blocks reuse + operator needs to ship a new deck for that (locale, app) combination.
- **Pattern:**
  1. Source-edit at the app's catalog-export emission site. Single locale-conditional fork on `exerciseType` (covers both deck_id + exercise_type slug-bearing layers because deck_id is composed downstream from exerciseType inside `catalog-export.js buildDeckId`). `generator.app` stays canonical per §14.10. app_version minor-bump.
  2. Amend `topics-taxonomy.json axes.exercise-type` to register the new axis-key per affected locale only (other locales continue under canonical slug).
  3. Footer Column 3 update follows Pass 7b F4 honesty discipline (only non-empty axis-keys link out per locale).
  4. Operator re-authors ZIP using modified app; publish-cli pipeline ships normally (1 INSERT, no slug collision).
  5. §15.10 seal verification: original archived-slug route stays non-200; new-slug route 200.
- **Reference commits:** source-edit `67d5d99d` + ship `9b2c608e`.

### What Phase-3a delivered

- 58 published decks across 29 §14.10-canonical apps × 2 Tier 1 locales (en + de).
- Per-app exercise-type topic pages live for all 29 apps × 2 locales (with picture-path-en substituted by picture-trail-en).
- Educational-level axis-keys live: preschool, kindergarten, grade-1, grade-2.
- Theme axis: animals populated.
- Footer Column 3: 28 en + 28 de exercise-type axis-keys; locale-asymmetric for picture-path/picture-trail.
- Catalog substrate ready for Pillar 3 launch-day surface (Tools 1A+2A+5A already shipped pre-Phase-3a).

**ARC-CLOSURE-FINAL state. No further Phase-3a batches forecast. Next arc selection pending operator turn.**
  - Single-layer manifest (no metadata.json/enrichment.json — those added by publish-cli at upload).
- **Effective arc-closure point:** Batch 5b ships → 58/58 = 100% C-1.

Cluster boundaries flexible — operator may merge or split based on theme variations + age-range willingness + content authoring throughput.

### Picture-path-en locale-mirror gap (sealed)

picture-path-en is archived (Phase 5.5 sealing decision per §15.10 block-on-reuse). To restore parity, requires NEW slug authored at Phase-3a sub-batch or end-of-arc closure pass. Not in any forecast batch above; flagged for separate operator-coordinated decision.

### W-2 apps-side generator emission gap (deferred queue active)

Each of the 4 Batch-1 apps had `theme=null` or `exercise_mode=null` in source manifests. Per Phase-3.0 halt-and-surface 2026-05-03, this is the apps-side generator emission gap (separate from publish-cli). Phase-3a Batch 1 confirms the gap is operator-tolerable for now: operator manually populates manifest fields per ZIP. If the per-batch authoring burden grows with future batches (operator surfaces fatigue or skipped fields), pull the W-2 deferred entry forward.

### Cadence so far

- Phase-3.0 (publish-cli forward-fix): 1 commit (`fca9547e`)
- Phase-3a Batch 1: 1 commit (`fbd785df`) + 8 deck publishes
- Phase-3a Batch 2: 1 commit (`105eff14`) + 8 deck publishes
- Phase-3a Batch 3: 1 commit (`7a9da726`) + 8 deck publishes
- chart-count locale-fix: 1 commit (`877522bc`) — same-session bug-fix surfaced during Batch 3→4a transition.
- Phase-3a Batch 4a: 1 commit (`c6544d0c`) + 8 deck publishes
- Phase-3a Batch 4b: 1 commit (`133fbd18`) + 8 deck publishes
- Phase-3a Batch 5a: 1 commit (`ed0f8000`) + 2 deck publishes (Reshape A split)
- Phase-3a Batch 5b-1: 1 source-edit commit (`67d5d99d`) + 0 deck publishes (picture-path app fork + topics-taxonomy.json amendment + app_version bump)
- Total elapsed: 2026-05-03 same-day, **six consecutive deck-creation batches + one bug-fix + one source-edit pass** (42 deck publishes + 8 commits). Operator-content-authoring cadence well above projection.
- Batch 5b-2 remaining → unblocked; waiting for operator re-author of 1 ZIP. Arc closure on 5b-2 ship.
