# publish-cli

Brief B catalog-publish pipeline. Operator-side CLI that reads catalog-export ZIPs, substitutes deck.html placeholders per the §17.8 SEO surface contract, and (Phase 3+) uploads assets + writes the `decks` Postgres row.

## Phase status

- **Phase 1 (sealed `4b91adc0`)**: Prisma `decks` table + nginx `/<locale>/decks/<slug>/` location-block live in prod.
- **Phase 2 (sealed `59a0cde9`)**: substitution layer + slug generator + i18n authoring + dry-run output.
- **Phase 3 (sealed `7d59d3bd` + `9bed3bd4`)**: asset placement (Hetzner-side local FS write) + OG image (Sharp 1200×630 composite) + symlink-swap atomicity + DB write + edit-in-place via `--update-slug` + version pruning to archive folder.
- **Pre-Phase-4 hygiene (sealed `9a30f049`)**: dropped `--update-deck-id` flag; `ensureLocaleDir` patch; Hetzner Node 18 EOL queued; methodology entry extended.
- **Phase 4 (sealed `772a3375`)**: bulk-publish + bulk dry-run + strict-arg parser (folded per item 20 safety gap).
- **Phase 5 (this commit, sub-phases 5.4 + 5.5)**: single-deck `unpublish` handler + block-on-archived UPDATE/INSERT enforcement (publish.js + bulk.js). Sub-phases 5.1–5.3 sealed end-to-end on production. Sub-phase 5.5 verification (republish-after-unpublish blocks cleanly) deferred until operator authorizes.
- **Phase 6**: CLAUDE.md amendments via the close-out batch.

## Phase 3 architecture (Hetzner-side execution)

Per Brief B Phase 3 v4 + recon Item 6: publish-cli runs from Hetzner, NOT operator's PC. Postgres is bound 127.0.0.1 on Hetzner; pscp-asset-upload-during-publish dropped (assets land via local FS write); Sharp installs on Hetzner Linux x64 cleanly.

### Operator workflow

```bash
# 1. Generate ZIP on PC (apps run in browser there)
# 2. pscp ZIP to Hetzner staging dir
pscp <zip> root@65.108.5.250:/opt/lessoncraftstudio/publish-inbound/

# 3. ssh into Hetzner; run publish-cli
plink ... "node /opt/lessoncraftstudio/scripts/publish-cli/index.js publish /opt/lessoncraftstudio/publish-inbound/<zip>"
```

### Edit-in-place

```bash
# Edit existing deck (slug stable; version increments)
plink ... "node /opt/lessoncraftstudio/scripts/publish-cli/index.js publish <new-zip> --update-slug <existing-slug> --confirm"
```

`--update-slug <slug>` looks up the existing row by `(language, slug)`; surfaces resolved row to operator for confirmation; preserves slug; increments version. `--confirm` skips the interactive prompt for non-interactive invocation. **`--update-slug` is the sole edit-in-place mechanism for v1** (the v3-review nit also proposed `--update-deck-id`, but Phase 1 Deck schema has no `deck_id` column; flag dropped at pre-Phase-4 hygiene).

## Files

| File | Role |
|---|---|
| `index.js` | Entry point + strict-arg dispatch (subcommand schemas in `SCHEMAS`) |
| `strict-args.js` | Schema-driven parser; rejects unknown flags with closest-known suggestion (item 20 safety gap) |
| `bundle.js` | Read + parse + validate input ZIP (uses `adm-zip`) |
| `slug.js` | §17.8.5 ASCII-fold slug generator + collision-suffix algorithm |
| `substitute.js` | Apply substitutions per the 13-placeholder inventory |
| `i18n.js` | Read `frontend/messages/<locale>.json` + lookup with en fallback + `--verify` |
| `taxonomy.js` | Read `frontend/config/topics-taxonomy.json` + axis-key dispatch + §17.8.6 mapping |
| `dry-run.js` | Single-deck staging writer (per-deck files + single-batch summary) |
| `bulk.js` | Phase 4 orchestration: per-ZIP iteration, dry-run pre-flight, real-publish per-deck error isolation |
| `updates-manifest.js` | Phase 4 `--updates-manifest` JSON parser + validator (key=ZIP-exists, value=DB-row-exists) |
| `extract-html-meta.js` | Title + description extraction from substituted deck.html (uses `node-html-parser`) |
| `og-image.js` | Sharp 1200×630 composite from existing 480×620 thumbnail |
| `place-assets.js` | Atomic asset placement + chown + version pruning to archive |
| `db.js` | Prisma client wrapper: `findExistingBySlug`, `resolveSlugCollision`, `insertDeck`, `updateDeck` |
| `publish.js` | Single-deck publish orchestration (called by `index.js publish` and by `bulk.js` per-ZIP) |
| `scaffold-i18n-keys.js` | Operator helper to insert EN-seed placeholders for missing keys |
| `slug.test.js` | Node native `assert` unit tests for slug generator |

## Usage

### Phase 2 — single-ZIP dry-run

```
node scripts/publish-cli/index.js dry-run <zip-path> [--staging-dir <path>]
```

Default staging dir: `<repo-root>/.publish-cli-staging/` (gitignored).

Dry-run produces, per ZIP, in `<staging-root>/<deck-id>/`:

- `manifest.json` (pass-through)
- `deck.html` (post-substitution)
- `deck.html.diff` (line-diff vs pre-substitution)
- `substitution-report.json` (structured per-placeholder source + value)
- `substitution-report.txt` (human-readable)
- `warnings.txt` (one line per warning; empty if none)

Plus `<staging-root>/_summary.txt` aggregating across decks.

### i18n verification

```
node scripts/publish-cli/i18n.js --verify
```

Exits 0 if Tier 1 (en + de) has full coverage of the 10 required keys. Prints per-locale gap report. Tier 2-4 gaps surface as warnings without erroring.

### i18n scaffolding (operator helper)

```
node scripts/publish-cli/scaffold-i18n-keys.js           # dry-run; shows what would change
node scripts/publish-cli/scaffold-i18n-keys.js --apply   # writes EN-seed placeholders for missing keys
```

Inserts English seed values under each missing key path. Operator translates inline post-scaffold.

### Phase 4 — bulk publish + bulk dry-run

```
# Bulk dry-run (no side-effects; produces _summary.txt + _collisions.txt + _errors.txt)
ssh root@hetzner "node /opt/lessoncraftstudio/scripts/publish-cli/index.js publish-bulk <folder> --dry-run"

# Resolve any collisions/errors surfaced by dry-run, then real-publish
ssh root@hetzner "node /opt/lessoncraftstudio/scripts/publish-cli/index.js publish-bulk <folder> --confirm \\
    --updates-manifest <updates.json>"
```

Bulk-publish flags:

- `--dry-run` — pre-flight only; no FS or DB side-effects. Mutually exclusive with `--confirm`.
- `--confirm` — required for real bulk-publish (no interactive prompt at scale per Q2 lock). Mutually exclusive with `--dry-run`.
- `--updates-manifest <path>` — JSON `{filename: existing-slug}` mapping. ZIPs in the manifest route UPDATE (preserve slug, increment version); ZIPs not in the manifest route INSERT. Manifest validation runs at parse-time: every key must exist in the input folder; every value must exist in the DB.
- `--batch-id <name>` — override default UTC-timestamped batch name.
- `--staging-dir <path>` — override default `<repo>/.publish-cli-staging/`.

Per-batch artifacts in `<staging-root>/<batch-id>/`:

| File | Purpose |
|---|---|
| `<deck-id>/...` | Per-ZIP staging (manifest, deck.html, diff, substitution-report.json, substitution-report.txt, warnings.txt) |
| `_summary.txt` | One line per ZIP — deck-id, language, slug, routing (INSERT/UPDATE), warnings/errors counts |
| `_collisions.txt` | INSERT-routed ZIPs whose predicted slug collides with an existing deck — must resolve via `--updates-manifest` or rename before real-publish |
| `_errors.txt` | Pre-flight errors (validation, missing fields, slug failure, taxonomy gap) that block real-publish |
| `_results.txt` | Post-real-publish per-ZIP outcome (PUBLISHED with id+url, or FAILED with stderr) |
| `_failures/<zip>.stderr` | Per-failure structured stderr (one file per failed ZIP) |

Real bulk-publish ABORTS before any side-effect when `_collisions.txt` or `_errors.txt` would be non-empty. Per-deck error isolation: a failed ZIP does not abort the batch; valid ZIPs in the same batch continue to publish.

### Phase 5 — unpublish (single-deck) + block-on-archived contract

```
ssh root@hetzner "node /opt/lessoncraftstudio/scripts/publish-cli/index.js unpublish <slug> --language <locale> --confirm"
```

Single-deck unpublish flow:

1. `db.findExistingBySlug(language, slug)` — must return a `status='published'` row.
2. `place-assets.unpublishAssets(locale, slug)` — atomic: removes the canonical symlink first (immediate 404), then moves all `<slug>-vN/` versioned dirs to `.archived/<locale>/<slug>-unpublished-<utc>/`.
3. `db.unpublishDeck(id)` — flips `status='archived'`. Row stays in DB; `(language, slug)` unique constraint persists; slug stays "taken".

`--confirm` is mandatory (matches publish-bulk pattern; explicit consent for destructive operation; no interactive prompt).

**Block-on-archived contract (Phase 5 Q2 lock):**

After a deck is unpublished:

- **INSERT-route attempt** (publish-bulk WITHOUT `--updates-manifest` for the archived slug): pre-flight collision detection in `bulk.js` flags the row as `existing status: archived` and emits a differentiated `_collisions.txt` recommendation: `"pick a different slug — slug already used by an archived (unpublished) deck"`. Real-mode ABORTS before any side-effect. Reactivation is out-of-scope per Phase 5 Q2 lock.
- **UPDATE-route attempt** (publish-bulk WITH manifest mapping the new ZIP to the archived slug, OR `single-publish --update-slug <archived-slug> --confirm`): `publish.js`'s edit-in-place lookup rejects with structured stderr: `"cannot update deck '<slug>' (status='archived'). Only published decks can be updated via --update-slug. Pick a different slug or implement reactivation in a future brief"`. Exit non-zero. No side-effects.

Both attempts cleanly fail; the operator's resolution path is "pick a different slug." Old shared links to the unpublished deck stay 404.

**Failure-mode UX** (if DB update fails post-FS-archive): `unpublish.js` surfaces structured stderr with reconciliation commands per Phase 3 v4 policy:

- Option A — flip DB status manually via psql (`UPDATE decks SET status='archived', updated_at=NOW() WHERE id='<id>'`).
- Option B — restore FS to undo the unpublish (mv archived dirs back, recreate symlink).

The deck is FS-unavailable (404) regardless of DB state, so the user-facing state is correct even mid-failure.

### Strict-arg parser (item 20 safety gap)

Phase 4 replaces the prior permissive parser with `strict-args.parseStrict(argv, SCHEMAS)`. Unknown flags now error before any side-effect:

```
$ node scripts/publish-cli/index.js publish foo.zip --update-deck-id bar
USAGE ERROR: Unknown flag "--update-deck-id" for subcommand "publish" (did you mean "--update-slug"?).
```

Suggestions are computed via Levenshtein distance against the schema's allowed flags (≤ 3 distance threshold).

### Slug unit tests

```
node scripts/publish-cli/slug.test.js
```

Exits 0 on all-pass; non-zero with diff output on failure.

## Locked decisions per Brief B v3

- **Runtime:** Node.js (Q1)
- **Location:** `scripts/publish-cli/` multi-file module (Q2)
- **Tier 4 NSR posture:** Danish NSR-flagged (matches §17.5 Nordic-NSR); fr/it/pt operator-best-effort without NSR (Q3)
- **i18n scope:** 110 strings (5 `seo.educational_level.*` + 5 `endDeck.*` × 11 locales) bundled into Phase 2 (Q5)
- **Staging dir default:** `.publish-cli-staging/` at repo root, gitignored (Q4)

## Cross-references

- Bundle shape: `REFERENCE TRANSLATIONS/catalog-export.js:155-187` (`buildManifest`)
- Placeholder canonical names: `REFERENCE TRANSLATIONS/catalog-export.js:34-46`
- §16.4 / §16.5 — taxonomy schema + URL pattern + α-granular axes
- §17.8.5 — ASCII-fold slug spec
- §17.8.6 — age_range → educational_level mapping table
- §17.8.7 — `content_family_id` reservation + v2 hreflang sibling tracking
