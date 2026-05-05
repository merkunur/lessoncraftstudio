/**
 * Phase 3 v4 publish orchestration.
 *
 * Pipeline:
 *   1. Bundle parse + validate (bundle.js)
 *   2. Substitution layer (substitute.js)
 *   3. OG image derivation (og-image.js)
 *   4. Asset placement + atomic symlink swap + chown + prune (place-assets.js)
 *   5. Title + description extraction from substituted deck.html (extract-html-meta.js)
 *   6. Slug resolution (slug.js + db.js for collision query)
 *   7. DB write (db.js — INSERT for new, UPDATE for edit-in-place)
 *
 * Locked policy on failure post-asset-placement: assets stay, error logged
 * with structured stderr including reconciliation commands; operator manually
 * reconciles. Per Brief B Phase 3 v4 failure-mode UX section.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var bundleMod = require('./bundle');
var substitute = require('./substitute');
var slugMod = require('./slug');
var ogImage = require('./og-image');
var placeAssets = require('./place-assets');
var extractMeta = require('./extract-html-meta');
var db = require('./db');

var CANONICAL_URL_BASE = 'https://lessoncraftstudio.com';

function structuredFailure(opts) {
  // Per failure-mode UX section. Multi-line stderr.
  var lines = [];
  lines.push('ERROR: ' + opts.what);
  lines.push('STATE:');
  Object.keys(opts.state || {}).forEach(function (k) {
    lines.push('  ' + k + ': ' + opts.state[k]);
  });
  if (opts.reconciliation && opts.reconciliation.length) {
    lines.push('RECONCILIATION OPTIONS:');
    opts.reconciliation.forEach(function (r) { lines.push('  ' + r); });
  }
  return lines.join('\n');
}

/**
 * Main publish operation.
 *
 * opts:
 *   zipPath              — absolute path to the catalog-export ZIP
 *   updateSlug           — string slug for edit-in-place via --update-slug (sole edit-in-place mechanism for v1)
 *   confirm              — non-interactive confirmation (skip prompt)
 *   createdBy            — operator identifier (env PUBLISH_CLI_OPERATOR or default)
 *
 * Returns Promise<{ id, slug, language, version, canonicalURL, ... }>.
 */
async function publish(opts) {
  var zipPath = opts.zipPath;
  var updateSlug = opts.updateSlug || null;
  var createdBy = opts.createdBy || 'operator';

  // Step 1: bundle parse.
  var b = bundleMod.read(zipPath);
  var manifest = bundleMod.parseManifest(b);
  var validationErrors = bundleMod.validateManifest(manifest);
  if (validationErrors.length) {
    throw new Error('publish: manifest validation failed:\n  ' + validationErrors.join('\n  '));
  }
  var deckHtmlOriginal = bundleMod.readDeckHtml(b);
  var locale = manifest.language;

  // Step 1a: manifest.theme reconciliation gate per §A.13. Halts before
  // any side-effect when authoring-tool emit-defects produce metadata-
  // content disagreement (the code-addition v6.0.0 emit-defect class).
  var recon = slugMod.reconcileManifestTheme(manifest);
  if (recon.category !== 'CLEAN') {
    throw new Error(
      'publish: manifest.theme reconciliation [' + recon.category + ']\n' +
      '  deck_id:   ' + (recon.deckId || '?') + '\n' +
      '  app:       ' + (recon.app || '?') + '\n' +
      '  declared:  ' + JSON.stringify(recon.declared) + '\n' +
      '  primary:   ' + JSON.stringify(recon.primary) + '   (image.theme)\n' +
      '  secondary: ' + JSON.stringify(recon.secondary) + '   (path-derived; null when CUID-shaped)\n' +
      '\n' +
      '  Emit-defect at the authoring-tool side. Fix the authoring tool to emit\n' +
      '  manifest.theme matching actual content, OR regenerate this deck.\n' +
      '  Reconciliation is a hard gate; no override path is provided.\n' +
      '  See CLAUDE.md §A.13 + 9850df93 audit.'
    );
  }

  // Step 1a-bis: manifest.exerciseMode reconciliation gate per Commission δ
  // (Interpretation Y, lenient). Halts only on HARDCODED_NULL+null per the
  // Commission ε defect class; DERIVED+null is legitimate per operator-
  // shipped default-mode contracts (e.g., code-addition standard at 5078f491).
  var modeRecon = slugMod.reconcileExerciseMode(manifest);
  if (modeRecon.category !== 'CLEAN') {
    throw new Error(
      'publish: manifest.exerciseMode reconciliation [' + modeRecon.category + ']\n' +
      '  deck_id:   ' + (modeRecon.deckId || '?') + '\n' +
      '  app:       ' + (modeRecon.app || '?') + '\n' +
      '  declared:  ' + JSON.stringify(modeRecon.declared) + '\n' +
      '  appClass:  ' + modeRecon.appClass + '\n' +
      '\n' +
      '  Known emit-defect per Commission ε recon. App is in HARDCODED_NULL\n' +
      '  classification; per-app fix awaiting operator-strategic taxonomy adjudication.\n' +
      '  Multi-mode waves are blocked until Commission ε per-app fix ships.\n' +
      '  Reconciliation is a hard gate; no override path is provided.'
    );
  }

  // Step 1b: edit-in-place lookup (if flag present).
  var existingRow = null;
  var slug = null;
  if (updateSlug) {
    existingRow = await db.findExistingBySlug(locale, updateSlug);
    if (!existingRow) {
      throw new Error('publish: --update-slug "' + updateSlug + '" but no row found in (language=' + locale + ', slug=' + updateSlug + ')');
    }
    // Phase 5 Q2 lock: block UPDATE on non-published rows. Status enum per
    // §8.1: 'draft' | 'published' | 'archived'. UPDATE-via---update-slug is
    // edit-in-place semantics — only valid on currently-published rows.
    // Archived rows (status='archived') were unpublished and the slug stays
    // "taken" without reactivation in Phase 5; pick a different slug or
    // implement reactivation in a future brief.
    if (existingRow.status !== 'published') {
      throw new Error(
        'publish: cannot update deck "' + updateSlug + '" (status=\'' + existingRow.status + '\'). ' +
        'Only published decks can be updated via --update-slug. Pick a different slug ' +
        'or implement reactivation in a future brief (Phase 5 Q2 lock = block).'
      );
    }
    slug = existingRow.slug;  // preserve existing
    console.error('[publish] Resolved existing deck for edit-in-place:');
    console.error('  id:         ' + existingRow.id);
    console.error('  slug:       ' + existingRow.slug);
    console.error('  language:   ' + existingRow.language);
    console.error('  version:    ' + existingRow.version + ' (will increment to ' + (existingRow.version + 1) + ')');
    console.error('  status:     ' + existingRow.status);
    console.error('  updated_at: ' + existingRow.updatedAt);
    if (!opts.confirm) {
      // Stub interactive prompt: in the absence of a TTY, require --confirm flag.
      throw new Error('publish: edit-in-place requires --confirm flag for non-interactive invocation');
    }
  } else {
    // New publish path: compute slug from <h1>; resolve collision.
    // Use deck_id-derived seed for now (per Phase 2 dry-run path) since <h1>
    // requires substitution to run first. Resolution: substitute first with a
    // PLACEHOLDER slug, extract <h1> for real slug seed, then re-substitute
    // with real slug. Two-pass.
    // Simpler v1: derive slug from manifest via slug.js: deriveSeedFromManifest
    // (single SoT across publish-cli paths). Phase 3 surfaces the title for
    // DB but the slug stays manifest-derived.
    var seed = slugMod.deriveSeedFromManifest(manifest);
    var candidate = slugMod.slugify(seed);
    if (!candidate) {
      throw new Error('publish: slugify produced empty string from seed "' + seed + '"');
    }
    slug = await db.resolveSlugCollision(locale, candidate, null);
    console.error('[publish] Slug: ' + slug + (slug !== candidate ? ' (collision; suffixed from "' + candidate + '")' : ''));
  }

  // Step 2: substitution.
  var subResult = substitute.apply({
    manifest: manifest,
    metadata: {},
    deckHtml: deckHtmlOriginal,
    slugCandidate: slug
  });
  if (subResult.errors.length) {
    throw new Error('publish: substitution errors:\n  ' + subResult.errors.join('\n  '));
  }

  // Step 3: OG image derivation.
  var thumbnailEntry = b.byName['thumbnail.png'];
  if (!thumbnailEntry) {
    throw new Error('publish: ZIP missing thumbnail.png');
  }
  var thumbnailBuffer = thumbnailEntry.getData();
  var ogBuffer = await ogImage.derive(thumbnailBuffer);

  // Step 4: extract title + description from substituted deck.html.
  var meta = extractMeta.extract(subResult.html, manifest);
  if (meta.warnings.length) {
    meta.warnings.forEach(function (w) { console.error('[publish] WARN ' + w); });
  }

  // Step 5: asset placement (writes to disk; atomic symlink swap; chown; prune).
  var assets = {
    'manifest.json': JSON.stringify(manifest, null, 2),
    'deck.html': subResult.html,
    'printable.pdf': b.byName['printable.pdf'].getData(),
    'answer-key.pdf': b.byName['answer-key.pdf'] ? b.byName['answer-key.pdf'].getData() : null,
    'thumbnail.png': thumbnailBuffer,
    'og-image.png': ogBuffer
  };
  // Drop null answer-key.
  if (!assets['answer-key.pdf']) delete assets['answer-key.pdf'];

  var placeResult;
  try {
    placeResult = placeAssets.place(locale, slug, assets);
  } catch (e) {
    throw new Error('publish: asset placement failed: ' + e.message);
  }

  // Step 6: DB write.
  var canonicalURL = subResult.resolved.canonicalURL;
  var versionDirRel = slug + '-v' + placeResult.version;
  var dbRow;
  try {
    if (existingRow) {
      // UPDATE path.
      // Phase-3.0 W-1 forward-fix: derive subjectTags from manifest.theme so
      // edit-in-place republishes refresh the field. theme is a free-string
      // axis-key per topics-taxonomy.json axes.theme (animals/vehicles/food/
      // fruit at v1). Populated → single-element array; null/empty → []. Origin:
      // halt-and-surface report 2026-05-03 surfaced 12 legacy rows null at
      // origin (unrecoverable backfill); this amendment closes the upstream
      // gap so future themed publishes propagate without manual SQL stop-gap.
      var subjectTagsForUpdate = (typeof manifest.theme === 'string' && manifest.theme.length > 0)
        ? [manifest.theme]
        : [];
      dbRow = await db.updateDeck(existingRow.id, {
        title: { [locale]: meta.title },
        description: { [locale]: meta.description },
        exerciseType: manifest.exercise_type,
        exerciseMode: manifest.exercise_mode,
        subjectTags: subjectTagsForUpdate,
        ageRange: '5-7',  // TODO: derive from taxonomy.appConfig per app
        htmlUrl: canonicalURL + 'deck.html',
        pdfUrl: canonicalURL + 'printable.pdf',
        answerKeyUrl: assets['answer-key.pdf'] ? canonicalURL + 'answer-key.pdf' : null,
        thumbnailUrl: canonicalURL + 'thumbnail.png',
        manifestUrl: canonicalURL + 'manifest.json'
      });
    } else {
      // INSERT path.
      var taxonomy = require('./taxonomy');
      var ageRange;
      try {
        ageRange = taxonomy.appConfig(manifest.generator.app).default_age_range;
      } catch (e) {
        ageRange = '5-7';  // fallback default
      }
      // Phase-3.0 W-1 forward-fix: derive subjectTags from manifest.theme. See
      // matching UPDATE-path comment above for origin + backfill rationale.
      var subjectTagsForInsert = (typeof manifest.theme === 'string' && manifest.theme.length > 0)
        ? [manifest.theme]
        : [];
      dbRow = await db.insertDeck({
        slug: slug,
        title: { [locale]: meta.title },
        description: { [locale]: meta.description },
        exerciseType: manifest.exercise_type,
        exerciseMode: manifest.exercise_mode,
        language: locale,
        subjectTags: subjectTagsForInsert,
        topicSlugs: [],   // future amendment to derive from taxonomy
        ageRange: ageRange,
        htmlUrl: canonicalURL + 'deck.html',
        pdfUrl: canonicalURL + 'printable.pdf',
        answerKeyUrl: assets['answer-key.pdf'] ? canonicalURL + 'answer-key.pdf' : null,
        thumbnailUrl: canonicalURL + 'thumbnail.png',
        manifestUrl: canonicalURL + 'manifest.json',
        createdBy: createdBy
      });
    }
  } catch (e) {
    var msg = structuredFailure({
      what: 'DB ' + (existingRow ? 'UPDATE' : 'INSERT') + ' failed after asset placement.',
      state: {
        'Assets placed at': placeResult.versionDir + ' (new version present, owned lcs-media:lcs-media)',
        'Symlink': placeAssets.symlinkPath(locale, slug) + ' -> ' + versionDirRel + ' (NEW; nginx serving new version)',
        'DB': 'INSERT/UPDATE failed: ' + e.message
      },
      reconciliation: [
        'Option A — accept new version, fix DB manually:',
        '  Connect to Postgres and INSERT/UPDATE the decks row with appropriate fields.',
        'Option B — roll back to prior version:',
        '  node -e "fs=require(\'fs\'); fs.symlinkSync(\'<prior-version-dir>\', \'' + placeAssets.symlinkPath(locale, slug) + '.new\'); fs.renameSync(\'' + placeAssets.symlinkPath(locale, slug) + '.new\', \'' + placeAssets.symlinkPath(locale, slug) + '\');"',
        '  mv ' + placeResult.versionDir + ' /var/www/lcs-media/decks/.archived/' + locale + '/' + slug + '-pruned-' + placeAssets.utcStamp() + '/'
      ]
    });
    process.stderr.write(msg + '\n');
    throw e;
  }

  return {
    id: dbRow.id,
    slug: slug,
    language: locale,
    version: dbRow.version,
    canonicalURL: canonicalURL,
    versionDir: placeResult.versionDir,
    prunedVersions: placeResult.prunedVersions,
    fallbackWarnings: meta.warnings
  };
}

module.exports = { publish: publish, structuredFailure: structuredFailure };
