# publish-cli

Brief B catalog-publish pipeline. Operator-side CLI that reads catalog-export ZIPs, substitutes deck.html placeholders per the §17.8 SEO surface contract, and (Phase 3+) uploads assets + writes the `decks` Postgres row.

## Phase status

- **Phase 1 (sealed `4b91adc0`)**: Prisma `decks` table + nginx `/<locale>/decks/<slug>/` location-block live in prod.
- **Phase 2 (this commit)**: substitution layer + slug generator + i18n authoring + dry-run output.
- **Phase 3+**: asset upload, DB write, atomic edit-in-place, OG image derivation, bulk-publish, coverage gate, CLAUDE.md amendments.

## Files

| File | Role |
|---|---|
| `index.js` | Entry point + arg parsing + main dispatch |
| `bundle.js` | Read + parse + validate input ZIP (uses `adm-zip`) |
| `slug.js` | §17.8.5 ASCII-fold slug generator + collision-suffix algorithm |
| `substitute.js` | Apply substitutions per the 13-placeholder inventory |
| `i18n.js` | Read `frontend/messages/<locale>.json` + lookup with en fallback + `--verify` |
| `taxonomy.js` | Read `frontend/config/topics-taxonomy.json` + axis-key dispatch + §17.8.6 mapping |
| `dry-run.js` | Surface 4 staging writer + summary file |
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
