#!/usr/bin/env node
/**
 * publish-cli — Brief B catalog-publish pipeline (operator's PC tool).
 *
 * Phase 2 ships ONE invocation:
 *   node scripts/publish-cli/index.js dry-run <zip-path> [--staging-dir <path>]
 *
 * Phase 3+ extends with:
 *   publish    <zip-path|folder>   uploads + DB writes + atomic edit-in-place
 *   update     <zip-path|folder>   edit-in-place; slug stable
 *   unpublish  <deck-id>           removal escape hatch
 *   dry-run    <folder>            bulk dry-run (Phase 4)
 *
 * Locked decisions per Brief B v3:
 *   - Node.js runtime (Q1)
 *   - scripts/publish-cli/ multi-file module (Q2)
 *   - .publish-cli-staging/ default staging root, --staging-dir override (Q4)
 *
 * Exit codes:
 *   0  success
 *   1  per-deck errors (substitution failures; deck not publishable at Phase 3)
 *   2  usage error / unknown command
 *   3  bundle parse / validation error
 */

'use strict';

var fs = require('fs');
var path = require('path');
var bundle = require('./bundle');
var slugMod = require('./slug');
var substitute = require('./substitute');
var dryRun = require('./dry-run');

var DEFAULT_STAGING_DIR = path.join(__dirname, '..', '..', '.publish-cli-staging');

function usage() {
  console.error('Usage:');
  console.error('  node scripts/publish-cli/index.js dry-run <zip-path> [--staging-dir <path>]');
  console.error('');
  console.error('Phase 2 only ships dry-run. publish/update/unpublish + folder bulk modes');
  console.error('land at Brief B Phase 3 (asset upload + DB write) and Phase 4 (bulk).');
  process.exit(2);
}

function parseArgs(argv) {
  var args = argv.slice(2);
  if (args.length < 2) return null;
  var cmd = args[0];
  var input = args[1];
  var stagingDir = DEFAULT_STAGING_DIR;
  for (var i = 2; i < args.length; i++) {
    if (args[i] === '--staging-dir' && i + 1 < args.length) {
      stagingDir = path.resolve(args[i + 1]);
      i++;
    }
  }
  return { cmd: cmd, input: input, stagingDir: stagingDir };
}

function deriveTitleForSlug(manifest) {
  // Phase 2 caveat: apps currently hardcode English bundle.title literal
  // (see project_deferred_items_queue.md social-share-v1 family). The
  // manifest from catalog-export.js doesn't carry a `title` field at all
  // (see REFERENCE TRANSLATIONS/catalog-export.js:155-187 — generation.json
  // layer omits title; metadata.json layer carries multilingual title per
  // CLAUDE.md §15.1, but Phase 2 dry-run doesn't have metadata.json input).
  //
  // Phase 2 dry-run derives a slug seed from deck_id (which embeds
  // exercise_type + exercise_mode + language + UTC stamp per buildDeckId
  // at REFERENCE TRANSLATIONS/catalog-export.js:102-109). This is enough
  // to produce a deterministic predicted slug for dry-run inspection.
  // Phase 3 publish-cli wires the metadata.json title properly.
  var deckId = manifest.deck_id || '';
  // Strip the trailing UTC stamp pattern (-YYYYMMDDHHMMSS at end).
  var seed = deckId.replace(/-\d{14}$/, '');
  // Use exercise_type + exercise_mode if available; fall back to seed.
  if (manifest.exercise_type) {
    var parts = [manifest.exercise_type];
    if (manifest.exercise_mode) parts.push(manifest.exercise_mode);
    return parts.join(' ');
  }
  return seed;
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

  var deckHtml;
  try {
    deckHtml = bundle.readDeckHtml(b);
  } catch (e) {
    console.error('ERROR reading deck.html: ' + e.message);
    process.exit(3);
  }

  // Compute slug candidate. Phase 2 doesn't query DB.
  var slugSeed = deriveTitleForSlug(manifest);
  var slugCandidate = slugMod.slugify(slugSeed);
  if (!slugCandidate) {
    console.error('ERROR: slugify produced empty string from seed "' + slugSeed + '"');
    process.exit(3);
  }

  // Apply substitutions.
  var result = substitute.apply({
    manifest: manifest,
    metadata: {},
    deckHtml: deckHtml,
    slugCandidate: slugCandidate
  });

  // Write dry-run output.
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

  // Write summary (single-deck format).
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
    console.error('Errors (deck NOT publishable at Phase 3):');
    result.errors.forEach(function (e) { console.error('  - ' + e); });
    process.exit(1);
  }

  // Verify no __PLACEHOLDER__ literals remain.
  var leftover = result.html.match(/__[A-Z_]+__/g);
  if (leftover) {
    console.error('ERROR: __PLACEHOLDER__ literals remain in output: ' + leftover.join(', '));
    process.exit(1);
  }

  console.log('[dry-run] PASS — no errors, no leftover placeholders.');
  process.exit(0);
}

function main() {
  var parsed = parseArgs(process.argv);
  if (!parsed) usage();

  if (parsed.cmd === 'dry-run') {
    var stat = fs.statSync(parsed.input);
    if (stat.isDirectory()) {
      console.error('ERROR: folder bulk-mode dry-run lands at Brief B Phase 4. Phase 2 ships single-ZIP dry-run only.');
      process.exit(2);
    }
    return dryRunSingle(parsed.input, parsed.stagingDir);
  }

  if (parsed.cmd === 'publish' || parsed.cmd === 'update' || parsed.cmd === 'unpublish') {
    console.error('ERROR: "' + parsed.cmd + '" lands at Brief B Phase 3. Phase 2 ships dry-run only.');
    process.exit(2);
  }

  usage();
}

if (require.main === module) {
  main();
}

module.exports = {
  parseArgs: parseArgs,
  deriveTitleForSlug: deriveTitleForSlug,
  dryRunSingle: dryRunSingle,
  DEFAULT_STAGING_DIR: DEFAULT_STAGING_DIR
};
