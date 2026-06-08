# §15 Catalog Data Pipeline + §14 export-helper reference — full detail (relocated from CLAUDE.md)

> Full three-layer manifest JSON schemas, per-subcommand publish-cli contracts, reconciliation-gate + salvage-script detail (§15), plus the §14.3a LCSCatalogExport helper API, §14.7 known gotchas, and §14.8 bundle-version table. CLAUDE.md keeps the terse summary + pointer. Relocated 2026-06-08 — nothing deleted.

## §15 — The catalog data pipeline

## 15. The catalog data pipeline

End-to-end flow: worksheet generated in one of 29 apps (§14.10) → catalog with full enrichment.

### 15.1 The three-layer manifest

Each deck's metadata splits across three JSONs, never overwriting. Catalog DB holds merged view; originals stay on disk.

Manifest drives §17.8 deck.html SEO surface: `generation.json` carries reserved `content_family_id`; `metadata.json` carries `educational_level` + `educational_level_localized` (deterministic from `age_range` per §17.8.6).

**`generation.json`** — written by app at generation time. Fully automatic:
```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "generated_at": "2026-04-25T14:30:00Z",
  "generator": {"app": "addition", "app_version": "...", "bundle_version": 4},
  "language": "es",
  "exercise_type": "addition",
  "exercise_mode": "image-image",
  "settings": {"items_per_group_min": 1, "items_per_group_max": 5, "exercises_per_page": 8, "letter_case": "lower"},
  "theme": "farm-animals",
  "images_used": ["cow-001.webp", "sheep-002.webp"],
  "vocabulary": ["vaca", "oveja"],
  "exercises": [/* problems with answers */],
  "assets": {"html": "...", "pdf": "...", "answer_key_pdf": "...", "thumbnail": "..."},
  "content_family_id": null
}
```

- **`content_family_id`** — nullable. Reserved schema field for cross-language sibling tracking. **In v1 always `null`.** v2 (translate-this-deck workflow §17.8.7) populates when operator explicitly translates. Format: `<exercise_type>-<exercise_mode>-<theme_or_'plain'>-<unique_suffix>`. Without this, no hreflang block (§17.8.1.5).

**`metadata.json`** — written by publish step on operator PC. Reads `generation.json`; applies topic taxonomy lookup; auto-fills sensible defaults; operator overrides via small form:
```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "title": {"es": "Sumas con animales de granja", "en": "Farm animal addition"},
  "short_description": {"es": "...", "en": "..."},
  "subject": "math",
  "topic_slugs": ["addition-kindergarten-spanish", "math-spanish-kindergarten"],
  "age_range": "5-7",
  "operator_tags": ["farm-animals", "kindergarten", "visual-aids"],
  "publish_status": "published",
  "operator_review_completed_at": "...",
  "educational_level": "Kindergarten",
  "educational_level_localized": "Kindergarten"
}
```

Two new SEO-driven fields, both deterministically derived by publish-cli from `age_range`:
- **`educational_level`** — `Preschool`/`Kindergarten`/`Grade 1`/`Grade 2`/`Grade 3`. Drives Schema.org `educationalLevel` + `__EDUCATIONAL_LEVEL__` placeholder. See §17.8.6 mapping.
- **`educational_level_localized`** — looked up via next-intl key `seo.educational_level.<level>`. Drives localized `<title>` + meta description via `__EDUCATIONAL_LEVEL_LOCALIZED__`. Examples: de→`Kindergarten`; fr→`Maternelle`; fi→`Esikoulu`.

Backwards-compatible — manifests written before this amendment lacked them. publish-cli treats missing as "no SEO content" for legacy decks (currently zero; bulk generation hasn't begun).

**`enrichment.json`** — written by local AI service on Mac Studio after publish:
```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "enrichment_version": 1,
  "model": "ollama:llama3.3:70b@q4",
  "enriched_at": "...",
  "embedding": [/* vector */],
  "long_description": {"es": "...", "en": "...", /* all 11 */},
  "learning_objectives": {"es": ["..."], "en": ["..."], /* all 11 */},
  "ai_tags": ["counting", "single-digit-addition", "visual-math"]
}
```

### 15.2 The publish flow

`catalogExport(appConfig, generatedContent)` in shared codebase. Every app calls at generation time; produces `generation.json` in-memory.

"Export to catalog" button on each app replaces four legacy KDP/Etsy downloads. Produces single ZIP `<deck_id>.zip`: `manifest.json` (= `generation.json` at this stage), `deck.html`, `printable.pdf`, `answer-key.pdf`, `thumbnail.png`.

Operator runs `publish-cli` on PC (watches folder; drop deck ZIP):
1. Validates manifest against schema
2. Auto-fills `metadata.json` via topic taxonomy lookup; small confirmation prompt
3. Posts `deck.html`, `printable.pdf`, `answer-key.pdf`, `thumbnail.png` to Hetzner static-asset endpoint → public asset folder behind Cloudflare CDN
4. Generates native-language slug from manifest's localized title; stores on new `slug` column (additive, `@@unique([language, slug])`, MUST land before first deck publishes). Substitutes deck.html SEO placeholders per §17.8: `__CANONICAL_URL__`, `__EDUCATIONAL_LEVEL__`, `__EDUCATIONAL_LEVEL_LOCALIZED__` (both from `age_range` via §17.8.6), `<!-- HREFLANG_INSERTION_POINT -->` (block for v2, empty for v1 `content_family_id=null`), topic-destination URL placeholders. On v2 sibling publish, re-injects updated hreflang into all siblings of same content family.
5. Posts merged manifest to Hetzner publish endpoint → inserts `Deck` row

Mac Studio polls `/api/ai-ingest/pending` within minutes; generates `enrichment.json`; posts back `/api/ai-ingest/complete`.

**Note on `bundle.canonicalURL`.** v1 does NOT promote canonicalURL to a proper bundle field. In-deck share affordance (§17.8.15) constructs URL at deck.html gen time using predicted-slug fallback — `https://lessoncraftstudio.com/<locale>/decks/<slugify(bundle.title)>/` (Option A authorized at social-share-v1 Sub-phase A). Proper bundle field arrives when (a) publish-cli substitutes real `__CANONICAL_URL__` AND (b) catalog deck route `/[locale]/decks/[slug]` exists. See §17.8.15.

### 15.3 Local AI service contract

Pull-based worker, not push target. Endpoints on Hetzner:
- `GET /api/ai-ingest/pending` — up to N decks needing enrichment; Tailscale-bound shared secret auth (lesson-plan endpoint variant removed 2026-05-17)
- `POST /api/ai-ingest/complete` — accepts `enrichment.json` keyed by `deck_id` or topic-and-language

When Mac Studio offline, decks accumulate in `pending`. New decks visible without enrichment but rank lower in semantic search; topic pages fall back to faceted listing.

### 15.4 Strict-arg parsing
`scripts/publish-cli/strict-args.js`. SCHEMAS table per subcommand (`publish`, `publish-bulk`, `unpublish`). Errors on unknown flags pre-side-effect; Levenshtein suggestions; non-zero stderr. `publish-bulk` requires `--confirm` for real (Phase 4 Q2 lock); without it dry-run regardless of `--dry-run`. Origin: `772a3375` (Brief B Phase 4). Motivated by unintended `addition-image-image-2/v1` during Phase 3 v4.

### 15.5 Edit-in-place contract
`--update-slug <slug>` updates a published deck. Atomicity via temp-staging + symlink-swap (Brief B Phase 3 v4 A1): write new `<slug>-v<N+1>/` then `fs.symlinkSync(target, link + '.new')` + `fs.renameSync(link + '.new', link)`. `rename(2)` on symlink is atomic at kernel level. Do NOT use `ln -sfn`. DB-FS-inconsistency: if asset succeeds but DB fails, assets stay; error logged; operator manually reconciles. Slug-stable on update; versioning internal (`<slug>-v<N>/`); URL stays `/<locale>/decks/<slug>/`. `--update-slug` SOLE update flag (`--update-deck-id` removed `9a30f049` — Deck schema lacks `deck_id`).

### 15.6 Slugify divergence
Two slug generators intentionally differ on non-ASCII: `catalog-export.js: slugify` at `:90` (`.replace(/[^a-z0-9-]+/g, '-')`; non-ASCII → hyphen; deck.html gen time fallback) vs `scripts/publish-cli/slug.js` (§17.8.5 ASCII-fold spec; upload time). Intentional for v1: `bundle.title` English-only across all 29 apps. Load-bearing when apps localize titles AND in-deck predicted-slug fallback consumed in non-en.

### 15.7 Catalog deck route
`/[locale]/decks/<slug>/` served by **nginx**, NOT Next.js. Config at `/etc/nginx/sites-enabled/lessoncraftstudio` (server-side, NOT in git). Deployed `4b91adc0` (Brief B Phase 1). `<slug>` is symlink at `/var/www/lcs-media/decks/<locale>/<slug>` → `<slug>-v<N>/`. Atomic swap via `fs.symlinkSync` + `fs.renameSync` (NOT `ln -sfn`). Canonical URLs `https://www.lessoncraftstudio.com/<locale>/decks/<slug>/`; apex→www 301 via nginx (§A.10).

**Routing-contract implication for Next.js components.** Two URL classes coexist: Next.js routes (trailing-slash-tolerant per `next.config.js: trailingSlash: false`; 308 normalizes) and nginx-served URLs (trailing-slash-strict; no-slash form 404s via Next.js catch-all). Next.js `<Link>` strips trailing slash on render → broken link if pointing at nginx URL. **Convention:** `<Link>` for Next.js routes; plain `<a href="...">` for nginx URLs (deck pages, PDF downloads). Pass 7b deck-card 404 was the cautionary case.

### 15.8 Cloudflare cache-invalidation
5-min short-TTL via nginx `add_header Cache-Control "public, max-age=300"`. Cloudflare honors origin. No purge-API calls. Fresh edits propagate within 5 min. Load-bearing post-2026-04-30 (Cloudflare onboarding); pre-2026-04-30 empirically inert.

### 15.9 `_collisions.txt` archived-vs-published differentiation
INSERT-route collisions surface different recommendations: published-row → `add to --updates-manifest mapping (<slug> ← <zipfile>) OR rename source ZIP`; archived-row → `pick a different slug — UPDATE-via-manifest NOT valid for archived rows; reactivation out-of-scope per Phase 5 Q2 lock`. Origin: `0ad626cb`.

### 15.10 Block-on-archived UPDATE
`publish.js` rejects `--update-slug` when `existingRow.status !== 'published'`. The `(language, slug)` compound unique constraint surviving on archived rows is the mechanism. Origin: `0ad626cb`.

**Cross-locale-OK.** §15.10 block applies only same-locale. Cross-locale INSERTs of an archived slug clean (compound unique is `(language, slug)`). (en, picture-path) archived at `0ad626cb` does NOT block (de/es/nl, picture-path) INSERTs. Locale-conditional emission at apps-side (`67d5d99d`): `en` emits `picture-trail`; `de`/`es`/`nl` emit canonical `picture-path`. Routing matrix at NL Batch 6 (`645ca7ff`): /en/decks/picture-trail/ 200; /en/decks/picture-path/ 404; /de/decks/picture-path/ 200; /es/decks/picture-path/ 200 (`1be13b8a`); /nl/decks/picture-path/ 200 (`645ca7ff`); /nl/decks/picture-trail/ 404.

### 15.11 Unpublish handler
Single-deck CLI (Phase 5 Q1 lock; bulk-unpublish deferred): `node scripts/publish-cli/index.js unpublish <slug> --language <locale> --confirm`. Pipeline FS-first DB-last: (1) `db.findExistingBySlug(language, slug)` must return published; (2) `place-assets.unpublishAssets(locale, slug)` removes `<slug>` symlink (immediate 404) then `fs.renameSync` every `<slug>-vN/` to `.archived/<locale>/<slug>-unpublished-<utc>/`; (3) `db.unpublishDeck(id)` flips status. Origin: `0ad626cb`.

### 15.12 Archive folder structure
Two namespaces at `/var/www/lcs-media/decks/.archived/<locale>/`: `<slug>-pruned-<utc>/` (KEEP_VERSIONS=3 pruning) + `<slug>-unpublished-<utc>/` (unpublish handler). Cleanup-cron deferred (>1 GB OR 100+ decks). Origin: `0ad626cb`.

### 15.13 Dry-run-vs-real parity
Per-deck staging set (`manifest.json` + post-substitution `deck.html` + `deck.html.diff` + `substitution-report.{json,txt}` + `warnings.txt`) byte-identical between dry-run and real-mode. `_summary.txt` diverges by design. `_results.txt` + `_failures/` real-mode-only. Mechanism: `bulk.js` invokes `dryRunBatch()` as own pre-flight. Origin: Brief B Sub-phase 5.7.

**Within-batch collision-pair inspection-before-confirm.** Default to surfacing inspection report before `--confirm` rather than auto-suffix. Tiebreak: drop LATER-generated ZIP (earlier-roll-wins). Track C 443→440-deck en wave 2026-05-05: 3 pairs dropped; final 440 decks with no `-2` slugs.

### 15.14 Asset placement / OG image / pruning
Layout: `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/{deck.html, printable.pdf, answer-key.pdf, thumbnail.png, og-image.png}` + symlink. Ownership: `lcs-media:lcs-media` 755/644; locale-dir auto-chown via `ensureLocaleDir` (`9a30f049`). Pruning: KEEP_VERSIONS=3 moves aged-out dirs to `.archived/`.

**OG image (post SEO-thumbnail commission 2026-05-19):** 1200×630 Sharp-composite, two-column layout:
- Left 487×630: scaled thumbnail.png (fit:cover; preserves source 480×620 aspect)
- Right 713×630: cream `#FEFAF3` + deck title (DejaVu Sans Bold 48px, wrapped) + theme/level subhead + brand wordmark
- XMP packet embedded via Sharp `.withXmp(string)` — dc:title/description/creator/rights/subject + xmpRights:Marked. ~1KB packet.
- `channels:3` RGB no-alpha; transparent regions composite onto cream background.

Legacy centered-on-white layout retained at `og-image.js: deriveLegacy()` for backwards-compat callers (operator-side app gen without title context). See §17.8.19 for full image-SEO signal stack.

### 15.15 publish-bulk per-locale isolation
`publish-bulk` has NO `--language` flag. SCHEMAS declares `--dry-run`, `--confirm`, `--updates-manifest`, `--batch-id`, `--staging-dir`. Per-locale isolation enforced at folder-content layer (`bulk.js` reads via `fs.readdirSync` non-recursive, filters `.zip`; dot-prefixed subdirs naturally skipped).

**Operational pattern** (14 ES + NL Track C batches; `b18b8654`–`d3b4f962`): (1) archive prior batch's residue `mkdir -p .tier2-trackc-batch-N-{cluster}-{locale}/ && mv *.zip .tier2-trackc-batch-N-{cluster}-{locale}/`; (2) SCP new ZIPs to top level of `publish-inbound/`; (3) `publish-bulk publish-inbound/ --dry-run` then `--confirm`. Premise drift at Batch 4 ES (`b18b8654`) assumed phantom `--language` flag. Folder-content control IS the safeguard.

### 15.16 Manifest-content reconciliation gate
Two-dimension gate on every manifest before slug derivation; halts batch if any halt-class fires.

**Dimension 1 — `theme` reconciliation** (`reconcileManifestTheme` in `slug.js`). Compares `manifest.theme` against `parseThemeFromImagePath(manifest.exercises[0].image.path)` (fallback `images_used[0]`). Categories: CLEAN / MISSING_THEME / MISSING_PRIMARY / THEME_DISAGREE. Hyphen/underscore + case normalization. Themeless-app legitimate-null path preserved (declared null + no `image.theme` OR CUID-shaped dir).

**Dimension 2 — `exerciseMode` reconciliation** (`reconcileExerciseMode`). Validates `manifest.exercise_mode` against `EXERCISE_MODE_APP_CLASSIFICATION`. Categories: CLEAN (DERIVED app emit, OR null from DERIVED app per default-mode contract §17.8.5) / MODE_NULL_FROM_HARDCODED_APP (the defect class; halts). Post Commission ε at `109a91d4` this list is empty across all 29; gate stays as backstop.

**Operational:** Both dimensions run in `dryRunBatch()` pre-side-effect. Halts surfaced in `_reconciliation.txt`. Themeless legitimate-null preserved (no false halts on Track A baseline). Single-deck `publish.js` wires identically.

**Why structural:** gate runs at publish-cli boundary, not authoring-app boundary — doesn't replace Shape A discipline §A.13.5 but catches whatever apps' emit-sites fail to enforce. Future regression halts before URL-collision or SEO-degradation propagates.

**Tests:** 56 unit tests in `slug.test.js` (21 slugify + 8 deriveSeed + 13 parseThemeFromImagePath + 11 reconcileManifestTheme + 11 reconcileExerciseMode); 5 integration tests in `reconciliation.integration.test.js`.

**Halt-surface predicate calibration vs ground-truth.** When the gate fires unexpectedly, first diagnostic is NOT "gate malfunctioning" — it's "verify predicate against ground-truth." Run `parseThemeFromImagePath` + `reconcileManifestTheme` against a sample manifest by hand. Empirical: code-addition wave halt at `9051b43d` correctly diagnosed as real emit-defect via this calibration before salvage script authored.

Origin: `580b0ca2` (theme) + `2b555b57` (exerciseMode).

### 15.17 Salvage scripts pattern (`rewrite-manifest-<field>.js`)
Generation-side emit-defects produce structurally-broken manifests across already-staged ZIPs. One-shot salvage scripts derive correct value from in-bundle content signal and repack in-place with backup.

References:
- `rewrite-manifest-theme.js` (`9051b43d`) — salvages from `exercises[0].image.theme` (fallback `images_used[0]` path-derived). Reuses `parseThemeFromImagePath`.
- `rewrite-manifest-exercise-mode.js` (`0f0c648d`) — salvages from `settings.<mode-distinguishing-field>` (e.g., `settings.word_reveal_mode` for code-addition). 2-mode contract per operator adjudication.

**Pattern requirements:**
1. Pre-pass classification before any FS write (Phase 1 reads every ZIP; classifies rewrite/skip-clean/halt-class; prints summary; no backups/repacks). If any halt-class → exit before Phase 2.
2. Halt-classes: `unparseable` (in-bundle signal missing) + `ambiguous` (multiple signals disagree OR CUID-shaped). Defensive.
3. Backup-then-rewrite ordering. Theme rewriter: `<workingDir>.original/` sibling. Exercise-mode rewriter: `.<utc-prefix>/` dot-subdir within workingDir.
4. Verification post-apply: re-run §15.16 gate; expected N/N CLEAN.
5. Authoring-side root-cause fix queued separately. Salvage closes present wave; authoring fix per §A.13.5 Shape A closes structural defect for future waves.

Empirical (153 en code-addition wave 2026-05-05): theme rewriter Phase 2 dry-run found 150 rewrite + 3 skip-clean + 0 halts; Phase 3 apply rewrote 150 in-place; Phase 4 gate 153/153 CLEAN. Exercise-mode rewriter Phase 2 found 49 rewrite + 104 skip-clean + 0 halts; Phase 3 rewrote 49; gate 153/153 CLEAN. Phase 5 publish: 153/153 INSERT in 11.1s; live curl HTTP 200 across all 3 slug-shape variants.

**Trigger:** emit-defect surfaces post-generation across staged wave. Always preferred over regeneration when in-bundle signal recoverable; regeneration fallback when signal unparseable + ambiguous.

### 15.18 Inbound-link surface counter + gate doctrine
`scripts/publish-cli/count-inbound-surfaces.js` (Phase 4b CJS port from `frontend/lib/seo/count-inbound-surfaces.ts`) implements 8-surface counter consumed by `reconcileInboundLinkSurface` predicate at `seo-reconciliation.js:708`. Counts: exerciseTypeTopicPage (always-true) + educationalLevelTopicPage (always-true via §17.8.6) + themeTopicPages (subjectTags non-empty) + siblingAxisStrip (locale ≥2 distinct exerciseTypes) + varietyStripRotation (always-true) + crossAxisPivots (always-true) + deckEndSuggestionStrip (locale ≥7 decks) + breadthGridFeatured (Phase 3a conservative `false`). Predicate fires `INBOUND_LINK_COUNT_BELOW_TARGET` when count <3. WARN pre-Phase-5; HALT post-Phase-5 close.

**§15.18.1 bulk.js wire-in gap discipline. CLOSED 2026-05-19 SEO-100pct commission Phase 5** via default-fallback pattern at `bulk.js` ctx construction (matching countInboundFn precedent): `findExistingByTitleHash: opts.findExistingByTitleHash || db.findExistingByTitleHash`. Same for descriptionHash. Now bulk-publish enforces same uniqueness invariants as single-publish via publish.js (lines 205-206). Origin: Phase 4b close-out Item 12; closed at commit closing Phase 5 of SEO-100pct.

**§15.18.2 Pre-publish-state vs post-publish-state semantics for inbound predicate.** Predicate calls `countInboundFn(deckId, language)` where `deckId` derives from `manifest.deck_id` (operator-space, e.g., `big-small-findbig-en-20260507200010`); helper does `findUnique({where:{id:deckId}})` against `Deck.id` (Prisma CUID). For pre-publish dry-run, `manifest.deck_id ≠ DB CUID` → null → count=0 → predicate fires.

Three resolution paths to consider at fold cycle:
- **Option A — pre-publish skip:** predicate skips for INSERT-path dry-run; runs only UPDATE-path.
- **Option B — post-publish projection:** helper accepts `(language, exerciseType, ageRange, subjectTags)` from manifest; computes projected count.
- **Option C — defer-empirical:** keep current; rely on Phase 5 HALT-flip + post-publish revalidation.

Phase 5 close authorized WARN→HALT despite this concern. Trigger for resolution: if empirical halt rate exceeds ~5% baseline, commission resolution. If stays ~0%, no resolution needed. Cross-reference §A.13.7 first-publish-verification cadence. Origin: Phase 4b close-out Item 13 + Phase 5 risk acceptance.


---

## §14.3a Shared catalog-export helpers (`window.LCSCatalogExport`)

### 14.3a Shared catalog-export helpers (`window.LCSCatalogExport`)
`REFERENCE TRANSLATIONS/catalog-export.js` (synced via `scripts\master-sync.bat`; served at `/var/www/lcs-media/worksheet-generators/js/catalog-export.js?v=9`). Loaded by all 29 apps. Public API:

- **`buildSeoHead(manifest, opts)`** — `<head>` SEO string per §17.8.1: title, meta description, canonical link with `__CANONICAL_URL__`, Schema.org LearningResource JSON-LD with `__EDUCATIONAL_LEVEL__` + `__EDUCATIONAL_LEVEL_LOCALIZED__`. publish-cli substitutes per §17.8.5.
- **`buildEndDeckLinks(opts)`** — end-of-deck topic-destination links section per §17.8.2. Default: empty string (direct-download decks); pass `{includePlaceholders: true}` from publish-cli-aware path for `__LINK_*__` placeholders.
- **`buildSrRows({label, rows})`** — `<section class="lcs-sr"><ol><li>...</li></ol></section>` block. Group A pattern §17.8.4. Per-app code builds `rows` strings; helper owns wrapping + HTML-escaping. JSDoc on this function is canonical source for sr* translation-key naming convention (`srExercise<App>`, `srExercise<App><Mode>`, `srPuzzle<App>`, `srWorksheetQuestions`, `srOperator<Name>`, `srShape<Slug>`) and single-vs-≥2-consumer rule.
- **`buildSrPuzzleSummary({label, summary})`** — single-puzzle variant returning `<section class="lcs-sr"><p>{summary}</p></section>`.
- **`buildShareAffordance({canonicalURL?, locale, title})`** — self-contained HTML+CSS+inline-JS snippet for embedding in `lcs-bar` (top-right after `<button class="lcs-mute">`, 40×40, `.lcs-share` class). Resolution: (1) `canonicalURL` non-placeholder → use; (2) `locale + title` → construct `https://lessoncraftstudio.com/<locale>/decks/<slugify(title)>/`; (3) insufficient → empty string. Self-contained per §14.1 — no runtime catalog-export.js load. String resolution uses bare-`translations` per §17.8.14 (`srShareNative`/`srShareTo`/`srShareCopyLink`/`srShareCopied`/`srShareAria{Facebook,WhatsApp,Pinterest,Email,CopyLink}` in `translations-shared.js`). Originating: Sub-phase A hotfix `bbcb444c`; DE keys at `ea8e006a`; see §17.8.15 for click behavior.
- **`vocabKeyFromImage(img)`** — accepts path string OR `{path, word, name}`. Returns vocab-canonical key OR null. Three image source forms:
  1. **Theme path** (`/images/animals/cat.png`) → `ImageVocab.keyFromPath` → bare key.
  2. **Server-stored upload** (`/images/animals/camel-1769386104282-2351c8c4.png`) → strip `-<13digit>-<hash>` suffix. (`LCSImageRef.parseImagePath` leaves suffix intact — bug-family eb510be4 / eb510be4.1.)
  3. **Data URL** (`data:image/png;base64,...`) → no path-derived key; fall back to `img.word || img.name` stripping extension + known suffixes (bug-family eb510be4.2).
- **`HREFLANG_MARKER`** — `<!-- HREFLANG_INSERTION_POINT -->`. Per §17.8.1.5 MUST be last element in `<head>`; publish-cli substitutes per v1/v2.
- **`export(opts)`** — main entry for Export-to-catalog ZIP flow. Public API in catalog-export.js JSDoc.

Companion: `translations-shared.js` (loaded by all 29 apps; merge-on-load into `window.translations` with per-app collision warnings).

#### 14.3a.1 Bundle-shape contract extensions (Group B Phase 1)
- **sudoku** (`9b54ae4b`, bundleVersion 28.3.0): `uniqueImageKeys: [vocabKey, ...]` indexed parallel to `holes[].correctImageIndex` + `cutoutsData[].imageIndex`.
- **cryptogram** (`ac573fe4`→`5775b9c1`, 16.2.1): `cipherMap: {[Letter]: {vocabKey, fallback}}` FILTERED to letters in `legendSlots`.
- **picture-path** (`5bfa496c`→`8fc9f522`→`a3697abe`, 29.4.2): `startCellImage` (pathway only), `endCellImage` (pathway+choose-path), `endpointCount` (choose-path; 1/2/3), `legend.items[].vocabKey` (Treasure Trail variant).

The surfacing rationale is the **structural-vs-identity coverage dimension** at Phase 1 close — bundles can be shape-correct yet structurally undescribable in screen-reader text (WHERE vs WHAT). See `feedback_coverage_dimensions_emerge_from_postmortems.md` dimension 6.

#### 14.3a.2 Number-word lookup convention for small-cardinality counts
Per-app per-locale lookup table at template-fill time:
```js
var lookups = {en: {2:'two', 3:'three'}, de: {2:'zwei', 3:'drei'}};
var lookup = lookups[srLang] || lookups.en;
```
Out-of-range falls back to digit with `console.warn`. Tables in per-app code when single-consumer; promote to shared module if second consumer adopts same shape. Originating: picture-path Phase 2 `75d4a27c` (EN) + Phase 3 `263c67f2` (DE).

#### 14.3a.3 4th-consumer threshold pre-emptive refactor
When the 3rd consumer surfaces AND the 4th is imminent in the open commissions queue, refactor at 3rd-consumer threshold per §A.13 "refactor-during-already-opened-surface" rather than wait for 4th. Originating: `785d63f6` slug-derivation refactor (bulk.js + publish.js + index.js → `slug.js: deriveSeedFromManifest`; 4th consumer Pillar 2 bundle-publish imminent).


---

## §14.7 Known gotchas (read before debugging)

### 14.7 Known gotchas (read before debugging)

**Fabric geometry:**
- `getBoundingRect(true, true)` on grouped child returns GROUP-LOCAL coords in Fabric 5.x, not world. Use `calcTransformMatrix()` + `fabric.util.transformPoint`.
- `calcTransformMatrix()` already includes object's own scale. Don't also feed `getScaledWidth()/getScaledHeight()` into `transformPoint` — that double-scales. Use intrinsic `img.width` / `img.height`.
- `exerciseRowGroup.getCenterPoint().y` drifts off equals sign when operands aren't square — bbox center tracks image span, not equation centerline. Anchor to actual `=` sign via `_findEqualsSign`.
- Operator may transform (scale/translate/rotate) rowGroup after generation. `calcTransformMatrix` honors transforms; that's why use it everywhere instead of hardcoded offsets.

**Bundle + runtime authoring:**
- Inline `<script>` inside a string must escape `</script>` as `<\/script>`.
- Runtime stored as array-of-strings joined at render time — avoids template-literal escaping with `${...}` and backticks.
- `expectedAnswer` MUST branch on mode for find-addend / find-subtrahend / missing operand. Otherwise correct answer marked wrong.

**Operator/interactive filter mismatch (wordsearch-class):** When operator pre-filters what shows on the worksheet, interactive export must apply the same filter. wordsearch.html strips non-letters from each word before placing; v15 exporter filters `placedWordsInfo` against `wordsConfig` to mirror operator's display.

**UX rules:**
- Don't duplicate what the baked JPEG already shows (v15 draft had an interactive "Find these words" list below the grid — pulled because the baked worksheet already listed targets with images).
- The operator's `letterCase` choice is baked into clues; interactive input must match. Store `worksheetCanvas.letterCaseValue` at generate time; coerce student input on client; compare case-insensitively.


---

## §14.8 Bundle versions shipped

### 14.8 Bundle versions shipped

| Ver | App | Family | Notable |
|---|---|---|---|
| v4 | addition | A | Base — single numeric slot per row |
| v5 | subtraction | A | v4 + cross-out image hitboxes |
| v6 | code-addition | A | Multi-slot mixed number+letter |
| v7 | more-less | A | Choice-button answer |
| v8 | math-puzzle | A | Drag-to-drop pieces |
| v9 | math-worksheet | A | Symbolic multi-slot algebra |
| v10 | alphabet-train | A | Drag-to-wagon letter matching |
| v11 | pattern-train | A | Drag-to-wagon image matching |
| v12 | prepositions | A | Image-choice circles + fill-in |
| v13 | word-guess | A | Clean single-kind letter blanks (clean reference) |
| v14 | word-scramble | A | v13 + display-only scrambled strip |
| v15 | wordsearch | B | First puzzle-kind drag-to-select grid |
| v16 | cryptogram | A | Global cipher auto-propagation + live legend |
| v17 | big-small | A (choice) | Find-one + order-N; transparent button overlay |
| v18 | pattern-worksheet | A (choice) | Options-tap OR blank-cycle through unique-image palette |
| v19–v32 | (remaining 14 apps) | various | Family A/B/C/D/E/F per §14.2; see `MEMORY.md` for per-app details |

Bundle versions bump on every port so runtime can key on shape if needed.

