#!/usr/bin/env node
/**
 * publish-cli — Brief B catalog-publish pipeline.
 *
 * Subcommands:
 *   dry-run      <zip-path>            single-ZIP dry-run (Phase 2)
 *   publish      <zip-path>            single-ZIP publish (Phase 3)
 *   publish-bulk <folder>              bulk publish + bulk dry-run (Phase 4)
 *   unpublish    <deck-id>             removal escape hatch (Phase 5)
 *
 * Phase 4 adds:
 *   - publish-bulk subcommand with --dry-run / --confirm / --updates-manifest / --batch-id
 *   - Strict-arg parser (per safety-gap item 20): unknown flags are rejected
 *     with closest-known suggestion BEFORE any side-effect. Replaces the prior
 *     permissive parser that silently ignored unknown flags.
 *
 * Locked decisions per Brief B v3 + Phase 4 Q1–Q4:
 *   - Node.js runtime (Q1)
 *   - scripts/publish-cli/ multi-file module (Q2)
 *   - .publish-cli-staging/ default staging root, --staging-dir override (Q4)
 *   - --confirm always required for real publish-bulk (Phase 4 Q2)
 *   - --updates-manifest = JSON {filename: existing-slug} (Phase 4 Q3)
 *
 * Exit codes:
 *   0  success
 *   1  per-deck errors (substitution failures; deck not publishable)
 *   2  usage error / unknown command / unknown flag
 *   3  bundle parse / validation error
 */

'use strict';

var fs = require('fs');
var path = require('path');
var bundle = require('./bundle');
var slugMod = require('./slug');
var substitute = require('./substitute');
var dryRun = require('./dry-run');
var strictArgs = require('./strict-args');

var DEFAULT_STAGING_DIR = path.join(__dirname, '..', '..', '.publish-cli-staging');

var SCHEMAS = {
  'dry-run': {
    positional: ['zip-path'],
    flags: {
      '--staging-dir': 'value'
    }
  },
  'publish': {
    positional: ['zip-path'],
    flags: {
      '--update-slug': 'value',
      '--confirm': 'bool',
      '--yes': 'bool'
    }
  },
  'publish-bulk': {
    positional: ['folder'],
    flags: {
      '--dry-run': 'bool',
      '--confirm': 'bool',
      '--updates-manifest': 'value',
      '--batch-id': 'value',
      '--staging-dir': 'value'
    }
  },
  'unpublish': {
    positional: ['slug'],
    flags: {
      '--language': 'value',
      '--confirm': 'bool'
    }
  },
  // [ARC][SEO][DECK-PAGE] Phase 4a Checkpoint 1 — existing-deck retrofit pass
  // via republish-seo mode. Walks /var/www/lcs-media/decks/<locale>/<slug>-v<N>/
  // deck.html files, re-emits SEO surface via SEO_INSERTION_POINT marker pair,
  // converts celebration <h1> → <h2> in body, backfills Deck.titleHash +
  // Deck.descriptionHash DB columns. Per §15.17 salvage-script pattern.
  'republish-seo': {
    positional: [],
    flags: {
      '--language': 'value',     // 'en' | 'de' | ... | 'all'; required
      '--slug': 'value',         // optional: target single slug
      '--dry-run': 'bool',
      '--confirm': 'bool',       // required for non-dry-run
      '--backup-dir': 'value',   // optional belt-and-suspenders backup
      '--base-dir': 'value',     // optional override of /var/www/lcs-media/decks
      '--disambiguator-map': 'value' // title-overhaul: pre-flight collision map (locale->slug->code)
    }
  }
};

function usage() {
  console.error('Usage:');
  console.error('  node scripts/publish-cli/index.js dry-run <zip-path> [--staging-dir <path>]');
  console.error('  node scripts/publish-cli/index.js publish <zip-path> [--update-slug <slug>] [--confirm]');
  console.error('  node scripts/publish-cli/index.js publish-bulk <folder> [--dry-run] [--confirm]');
  console.error('                                                          [--updates-manifest <path>]');
  console.error('                                                          [--batch-id <name>] [--staging-dir <path>]');
  console.error('  node scripts/publish-cli/index.js unpublish <slug> --language <locale> --confirm');
  console.error('  node scripts/publish-cli/index.js republish-seo --language <locale|all> [--slug <slug>]');
  console.error('                                                  [--dry-run | --confirm]');
  console.error('                                                  [--backup-dir <path>] [--base-dir <path>]');
  console.error('');
  console.error('Phase 4 ships publish-bulk (real + --dry-run) with strict-arg parsing.');
  console.error('Phase 5 ships single-deck unpublish + block-on-archived UPDATE/INSERT.');
  console.error('[ARC][SEO][DECK-PAGE] Phase 4a Checkpoint 1 ships republish-seo retrofit mode');
  console.error('  for existing-deck SEO surface re-emission via SEO_INSERTION_POINT marker pair.');
  console.error('Bulk real-publish requires --confirm; --updates-manifest opts ZIPs into UPDATE path.');
}

function deriveTitleForSlug(manifest) {
  // Phase 2 caveat (preserved): apps currently hardcode English bundle.title literal
  // (see project_deferred_items_queue.md social-share-v1 family). The
  // manifest from catalog-export.js doesn't carry a `title` field at all
  // (see REFERENCE TRANSLATIONS/catalog-export.js:155-187). Slug seed is
  // derived from manifest fields via slug.js: deriveSeedFromManifest (single
  // SoT across publish-cli paths; theme-aware per §17.8.5 extension).
  if (manifest.exercise_type) {
    return slugMod.deriveSeedFromManifest(manifest);
  }
  // Fallback for malformed manifests missing exercise_type: derive from
  // deck_id with timestamp suffix stripped. Single-deck dry-run only.
  var deckId = manifest.deck_id || '';
  return deckId.replace(/-\d{14}$/, '');
}

function dryRunSingle(zipPath, stagingDir) {
  console.log('[dry-run] ZIP: ' + zipPath);
  console.log('[dry-run] Staging dir: ' + stagingDir);

  var b;
  try {
    b = bundle.read(zipPath);
  } catch (e) {
    console.error('ERROR reading ZIP: ' + e.message);
    process.exit(3);
  }

  var manifest;
  try {
    manifest = bundle.parseManifest(b);
  } catch (e) {
    console.error('ERROR parsing manifest: ' + e.message);
    process.exit(3);
  }

  var validationErrors = bundle.validateManifest(manifest);
  if (validationErrors.length) {
    console.error('Manifest validation errors:');
    validationErrors.forEach(function (e) { console.error('  - ' + e); });
    process.exit(3);
  }

  // manifest.theme reconciliation gate per §A.13. Halts before slug
  // derivation runs when authoring-tool emit-defects produce metadata-
  // content disagreement (the code-addition v6.0.0 emit-defect class).
  var recon = slugMod.reconcileManifestTheme(manifest);
  if (recon.category !== 'CLEAN') {
    console.error('manifest.theme reconciliation [' + recon.category + ']');
    console.error('  deck_id:   ' + (recon.deckId || '?'));
    console.error('  app:       ' + (recon.app || '?'));
    console.error('  declared:  ' + JSON.stringify(recon.declared));
    console.error('  primary:   ' + JSON.stringify(recon.primary) + '   (image.theme)');
    console.error('  secondary: ' + JSON.stringify(recon.secondary) + '   (path-derived; null when CUID-shaped)');
    console.error('');
    console.error('  Emit-defect at the authoring-tool side. Fix the authoring tool to');
    console.error('  emit manifest.theme matching actual content, OR regenerate this deck.');
    console.error('  Reconciliation is a hard gate; no override path is provided.');
    console.error('  See CLAUDE.md §A.13 + 9850df93 audit.');
    process.exit(1);
  }

  // manifest.exerciseMode reconciliation gate per Commission δ. Pairs
  // with theme reconciliation; same halt-pre-slug-derivation behavior.
  // Only halts on HARDCODED_NULL+null per Interpretation Y; DERIVED+null
  // is legitimate per operator-shipped default-mode contracts.
  var modeRecon = slugMod.reconcileExerciseMode(manifest);
  if (modeRecon.category !== 'CLEAN') {
    console.error('manifest.exerciseMode reconciliation [' + modeRecon.category + ']');
    console.error('  deck_id:   ' + (modeRecon.deckId || '?'));
    console.error('  app:       ' + (modeRecon.app || '?'));
    console.error('  declared:  ' + JSON.stringify(modeRecon.declared));
    console.error('  appClass:  ' + modeRecon.appClass);
    console.error('');
    console.error('  Known emit-defect per Commission ε recon. App ' + modeRecon.app);
    console.error('  is in the HARDCODED_NULL classification; per-app fix awaiting');
    console.error('  operator-strategic taxonomy adjudication. Multi-mode waves are');
    console.error('  blocked at the gate until Commission ε per-app fix ships.');
    process.exit(1);
  }

  var deckHtml;
  try {
    deckHtml = bundle.readDeckHtml(b);
  } catch (e) {
    console.error('ERROR reading deck.html: ' + e.message);
    process.exit(3);
  }

  var slugSeed = deriveTitleForSlug(manifest);
  var slugCandidate = slugMod.slugify(slugSeed);
  if (!slugCandidate) {
    console.error('ERROR: slugify produced empty string from seed "' + slugSeed + '"');
    process.exit(3);
  }

  var result = substitute.apply({
    manifest: manifest,
    metadata: {},
    deckHtml: deckHtml,
    slugCandidate: slugCandidate
  });

  dryRun.ensureDir(stagingDir);
  var deckDir = dryRun.writeDeck(stagingDir, manifest.deck_id, {
    manifest: manifest,
    originalHtml: deckHtml,
    substitutedHtml: result.html,
    report: result.report,
    warnings: result.warnings,
    errors: result.errors,
    resolved: result.resolved
  });

  dryRun.writeSummary(stagingDir, [{
    deckId: manifest.deck_id,
    language: manifest.language,
    slug: result.resolved.slug,
    canonicalURL: result.resolved.canonicalURL,
    warnings: result.warnings.length,
    errors: result.errors.length
  }]);

  console.log('');
  console.log('[dry-run] Deck: ' + manifest.deck_id);
  console.log('[dry-run]   language: ' + manifest.language);
  console.log('[dry-run]   slug:     ' + result.resolved.slug);
  console.log('[dry-run]   URL:      ' + result.resolved.canonicalURL);
  console.log('[dry-run]   warnings: ' + result.warnings.length);
  console.log('[dry-run]   errors:   ' + result.errors.length);
  console.log('[dry-run]   output:   ' + deckDir);
  console.log('');

  if (result.errors.length) {
    console.error('Errors (deck NOT publishable):');
    result.errors.forEach(function (e) { console.error('  - ' + e); });
    process.exit(1);
  }

  var leftover = result.html.match(/__[A-Z_]+__/g);
  if (leftover) {
    console.error('ERROR: __PLACEHOLDER__ literals remain in output: ' + leftover.join(', '));
    process.exit(1);
  }

  console.log('[dry-run] PASS — no errors, no leftover placeholders.');
  process.exit(0);
}

async function publishCmd(parsed) {
  var publish = require('./publish').publish;
  var db = require('./db');
  var createdBy = process.env.PUBLISH_CLI_OPERATOR || 'operator';
  try {
    var result = await publish({
      zipPath: parsed.positional['zip-path'],
      updateSlug: parsed.flags['--update-slug'] || null,
      confirm: !!(parsed.flags['--confirm'] || parsed.flags['--yes']),
      createdBy: createdBy
    });
    console.log('');
    console.log('[publish] PASS');
    console.log('  id:           ' + result.id);
    console.log('  language:     ' + result.language);
    console.log('  slug:         ' + result.slug);
    console.log('  version:      ' + result.version);
    console.log('  canonical URL: ' + result.canonicalURL);
    console.log('  version dir:   ' + result.versionDir);
    if (result.prunedVersions && result.prunedVersions.length) {
      console.log('  pruned ' + result.prunedVersions.length + ' aged version(s):');
      result.prunedVersions.forEach(function (p) { console.log('    ' + p.from + ' -> ' + p.to); });
    }
    if (result.fallbackWarnings && result.fallbackWarnings.length) {
      console.log('  warnings:');
      result.fallbackWarnings.forEach(function (w) { console.log('    ' + w); });
    }
    await db.disconnect();
    process.exit(0);
  } catch (e) {
    console.error('[publish] FAIL: ' + e.message);
    await db.disconnect();
    process.exit(1);
  }
}

async function publishBulkCmd(parsed) {
  var bulk = require('./bulk');
  var publishMod = require('./publish');
  var db = require('./db');
  var createdBy = process.env.PUBLISH_CLI_OPERATOR || 'operator';

  var folder = path.resolve(parsed.positional['folder']);
  var stagingRoot = parsed.flags['--staging-dir']
    ? path.resolve(parsed.flags['--staging-dir'])
    : DEFAULT_STAGING_DIR;
  var batchId = parsed.flags['--batch-id'] || null;
  var updatesManifestPath = parsed.flags['--updates-manifest']
    ? path.resolve(parsed.flags['--updates-manifest'])
    : null;
  var dryRunMode = !!parsed.flags['--dry-run'];
  var confirm = !!parsed.flags['--confirm'];

  if (!dryRunMode && !confirm) {
    console.error('[publish-bulk] ABORT — real bulk-publish requires --confirm.');
    console.error('               Use --dry-run for non-side-effecting pre-flight.');
    await db.disconnect();
    process.exit(2);
  }
  if (dryRunMode && confirm) {
    console.error('[publish-bulk] ABORT — --dry-run and --confirm are mutually exclusive.');
    await db.disconnect();
    process.exit(2);
  }

  // Helper: resolve language from a ZIP via bundle.parseManifest.
  async function resolveLanguageFromZip(zipPath) {
    var b = bundle.read(zipPath);
    var m = bundle.parseManifest(b);
    return m.language;
  }

  try {
    if (dryRunMode) {
      var dry = await bulk.dryRunBatch({
        inputFolder: folder,
        stagingRoot: stagingRoot,
        batchId: batchId,
        updatesManifestPath: updatesManifestPath,
        findExistingBySlug: db.findExistingBySlug,
        resolveLanguage: resolveLanguageFromZip
      });
      var collisions = dry.results.filter(function (r) { return r.collision; }).length;
      var errored = dry.results.filter(function (r) { return r.errors && r.errors.length; }).length;
      var themeHalts = dry.results.filter(function (r) {
        return r.themeReconciliation && r.themeReconciliation.category !== 'CLEAN';
      }).length;
      var modeHalts = dry.results.filter(function (r) {
        return r.exerciseModeReconciliation && r.exerciseModeReconciliation.category !== 'CLEAN';
      }).length;
      var ok = dry.results.filter(function (r) { return r.ok; }).length;
      console.log('');
      console.log('[bulk dry-run] Batch: ' + dry.batchId);
      console.log('[bulk dry-run] Staging: ' + dry.stagingDir);
      console.log('[bulk dry-run] ZIPs: ' + dry.results.length +
        '  ok=' + ok + '  collisions=' + collisions + '  errored=' + errored +
        '  theme_halts=' + themeHalts + '  exercise_mode_halts=' + modeHalts);
      console.log('[bulk dry-run] Inspect:');
      console.log('  ' + path.join(dry.stagingDir, '_summary.txt'));
      console.log('  ' + path.join(dry.stagingDir, '_collisions.txt'));
      console.log('  ' + path.join(dry.stagingDir, '_errors.txt'));
      console.log('  ' + path.join(dry.stagingDir, '_reconciliation.txt'));
      // Reconciliation halts subsume per-zip errors; the same ZIPs surface
      // in both _errors.txt (with category-prefixed message) and the more
      // structured _reconciliation.txt.
      if (themeHalts > 0) {
        console.error('');
        console.error('[bulk dry-run] manifest.theme reconciliation halt: ' +
          themeHalts + ' of ' + dry.results.length + ' ZIPs surface metadata-content disagreement.');
      }
      if (modeHalts > 0) {
        console.error('');
        console.error('[bulk dry-run] manifest.exerciseMode reconciliation halt: ' +
          modeHalts + ' of ' + dry.results.length + ' ZIPs surface emit-defect (Commission δ gate).');
      }
      if (themeHalts > 0 || modeHalts > 0) {
        console.error('[bulk dry-run] See _reconciliation.txt for per-category tally + per-app breakdown + per-deck tables.');
      }
      await db.disconnect();
      process.exit((errored > 0 || collisions > 0) ? 1 : 0);
    }

    var real = await bulk.publishBatch({
      inputFolder: folder,
      stagingRoot: stagingRoot,
      batchId: batchId,
      updatesManifestPath: updatesManifestPath,
      createdBy: createdBy,
      publish: publishMod.publish,
      findExistingBySlug: db.findExistingBySlug,
      resolveLanguage: resolveLanguageFromZip,
      confirm: true
    });

    if (real.abortReason) {
      console.error('[bulk publish] aborted: ' + real.abortReason);
      await db.disconnect();
      process.exit(2);
    }

    var succeeded = real.outcomes.filter(function (o) { return o.ok; }).length;
    var failed = real.outcomes.filter(function (o) { return !o.ok; }).length;
    console.log('');
    console.log('[bulk publish] Batch: ' + real.batchId);
    console.log('[bulk publish] Staging: ' + real.stagingDir);
    console.log('[bulk publish] Total: ' + real.outcomes.length +
      '  succeeded=' + succeeded + '  failed=' + failed);
    console.log('[bulk publish] Inspect:');
    console.log('  ' + path.join(real.stagingDir, '_results.txt'));
    console.log('  ' + path.join(real.stagingDir, '_summary.txt'));
    if (failed > 0) {
      console.log('  ' + path.join(real.stagingDir, '_failures/'));
    }
    await db.disconnect();
    process.exit(failed > 0 ? 1 : 0);
  } catch (e) {
    console.error('[publish-bulk] FAIL: ' + e.message);
    await db.disconnect();
    process.exit(1);
  }
}

async function republishSeoCmd(parsed) {
  var republish = require('./republish-seo').republishSeo;
  var db = require('./db');

  var language = parsed.flags['--language'];
  var slug = parsed.flags['--slug'] || null;
  var dryRunMode = !!parsed.flags['--dry-run'];
  var confirm = !!parsed.flags['--confirm'];
  var backupDir = parsed.flags['--backup-dir'] || null;
  var baseDir = parsed.flags['--base-dir'] || null;
  var disambiguatorMapFile = parsed.flags['--disambiguator-map'] || null;

  if (!language) {
    console.error('USAGE ERROR: republish-seo requires --language flag (or --language all)');
    console.error('');
    usage();
    await db.disconnect();
    process.exit(2);
  }
  if (!dryRunMode && !confirm) {
    console.error('[republish-seo] ABORT — real-mode requires --confirm.');
    console.error('               Use --dry-run for non-side-effecting pre-flight.');
    await db.disconnect();
    process.exit(2);
  }
  if (dryRunMode && confirm) {
    console.error('[republish-seo] ABORT — --dry-run and --confirm are mutually exclusive.');
    await db.disconnect();
    process.exit(2);
  }

  try {
    var result = await republish({
      language: language,
      slug: slug,
      dryRun: dryRunMode,
      backupDir: backupDir,
      baseDir: baseDir,
      disambiguatorMapFile: disambiguatorMapFile
    });
    await db.disconnect();
    process.exit(result.ok ? 0 : 1);
  } catch (e) {
    console.error('[republish-seo] FAIL: ' + e.message);
    if (e.stack) console.error(e.stack);
    await db.disconnect();
    process.exit(1);
  }
}

async function unpublishCmd(parsed) {
  var unpublishMod = require('./unpublish');
  var db = require('./db');

  var slug = parsed.positional['slug'];
  var language = parsed.flags['--language'];
  var confirm = !!parsed.flags['--confirm'];

  if (!language) {
    console.error('USAGE ERROR: unpublish requires --language flag');
    console.error('');
    usage();
    await db.disconnect();
    process.exit(2);
  }
  if (!confirm) {
    console.error('[unpublish] ABORT — unpublish requires --confirm flag (no interactive prompt for this destructive operation).');
    await db.disconnect();
    process.exit(2);
  }

  try {
    var result = await unpublishMod.unpublish({ language: language, slug: slug });
    console.log('');
    console.log('[unpublish] PASS');
    console.log('  id:           ' + result.id);
    console.log('  language:     ' + result.language);
    console.log('  slug:         ' + result.slug);
    console.log('  status:       ' + result.status);
    console.log('  archived dir: ' + result.archiveDir);
    if (result.movedVersions && result.movedVersions.length) {
      console.log('  moved ' + result.movedVersions.length + ' versioned dir(s):');
      result.movedVersions.forEach(function (m) { console.log('    ' + m.from + ' -> ' + m.to); });
    }
    await db.disconnect();
    process.exit(0);
  } catch (e) {
    console.error('[unpublish] FAIL: ' + e.message);
    await db.disconnect();
    process.exit(1);
  }
}

function main() {
  var parsed;
  try {
    parsed = strictArgs.parseStrict(process.argv, SCHEMAS);
  } catch (e) {
    if (e.isUsageError) {
      console.error('USAGE ERROR: ' + e.message);
      console.error('');
      usage();
      process.exit(2);
    }
    throw e;
  }

  if (parsed.cmd === 'dry-run') {
    var zipPath = parsed.positional['zip-path'];
    var stagingDir = parsed.flags['--staging-dir']
      ? path.resolve(parsed.flags['--staging-dir'])
      : DEFAULT_STAGING_DIR;
    var stat = fs.statSync(zipPath);
    if (stat.isDirectory()) {
      console.error('ERROR: dry-run on a folder lands at publish-bulk --dry-run (Phase 4).');
      process.exit(2);
    }
    return dryRunSingle(zipPath, stagingDir);
  }

  if (parsed.cmd === 'publish') {
    return publishCmd(parsed);
  }

  if (parsed.cmd === 'publish-bulk') {
    return publishBulkCmd(parsed);
  }

  if (parsed.cmd === 'unpublish') {
    return unpublishCmd(parsed);
  }

  if (parsed.cmd === 'republish-seo') {
    return republishSeoCmd(parsed);
  }

  // Unreachable: parseStrict already validated the cmd.
  usage();
  process.exit(2);
}

if (require.main === module) {
  main();
}

module.exports = {
  SCHEMAS: SCHEMAS,
  deriveTitleForSlug: deriveTitleForSlug,
  dryRunSingle: dryRunSingle,
  DEFAULT_STAGING_DIR: DEFAULT_STAGING_DIR
};
