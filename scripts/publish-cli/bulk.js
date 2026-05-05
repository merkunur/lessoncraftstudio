/**
 * Bulk-publish + bulk dry-run orchestration per Brief B Phase 4 Surfaces 1–4.
 *
 * Two modes:
 *   - dry-run: per-ZIP substitution + slug prediction + DB collision check;
 *              writes per-deck staging + batch-level _summary/_collisions/_errors.
 *              NO FS writes to /var/www/lcs-media/, NO DB writes.
 *   - real:    pre-flight runs dry-run pipeline first; if collisions/errors
 *              present, ABORTS before any side-effect; otherwise iterates
 *              publish() per-ZIP with per-deck error isolation.
 *
 * Per-deck atomicity preserved (each publish() call is atomic per Phase 3).
 * Per-deck error isolation: a failed ZIP does NOT abort the batch.
 *
 * Sequential, not parallel — per-deck atomicity already secures correctness;
 * parallel mode is a v2 consideration if 200+ ZIPs/day proves slow.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var bundle = require('./bundle');
var slugMod = require('./slug');
var substitute = require('./substitute');
var dryRunMod = require('./dry-run');
var updatesManifestMod = require('./updates-manifest');

function listZips(folder) {
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    throw new Error('bulk: input folder not found or not a directory: ' + folder);
  }
  var entries = fs.readdirSync(folder);
  return entries
    .filter(function (e) { return e.toLowerCase().endsWith('.zip'); })
    .sort();
}

function utcStamp() {
  var d = new Date();
  function p(n) { return n < 10 ? '0' + n : '' + n; }
  return '' + d.getUTCFullYear() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds());
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Run the dry-run / pre-flight pipeline for a single ZIP.
 * Returns { ok, deckId, language, slug, canonicalURL, collision, errors, warnings, manifestObj, deckHtmlOut }.
 *
 * - errors:    bundle parse/validation/substitution errors that would abort real publish
 * - collision: { existingId, existingSlug } if predicted slug collides with another deck
 *              and the ZIP is NOT in the updates-manifest (i.e., would-be unintended INSERT)
 *
 * The dry-run writes per-deck staging output via dry-run.writeDeck.
 */
async function dryRunOneZip(zipPath, stagingRoot, ctx) {
  var result = {
    zipPath: zipPath,
    zipBasename: path.basename(zipPath),
    ok: false,
    deckId: null,
    language: null,
    slug: null,
    canonicalURL: null,
    collision: null,
    errors: [],
    warnings: [],
    routedAs: null
  };

  // Step 1: read + parse + validate manifest.
  var b, manifest;
  try {
    b = bundle.read(zipPath);
    manifest = bundle.parseManifest(b);
  } catch (e) {
    result.errors.push('bundle parse: ' + e.message);
    return result;
  }
  var validationErrors = bundle.validateManifest(manifest);
  if (validationErrors.length) {
    validationErrors.forEach(function (e) { result.errors.push('manifest validation: ' + e); });
    return result;
  }
  result.deckId = manifest.deck_id;
  result.language = manifest.language;

  // Step 2: read deck.html.
  var deckHtml;
  try {
    deckHtml = bundle.readDeckHtml(b);
  } catch (e) {
    result.errors.push('deck.html: ' + e.message);
    return result;
  }

  // Step 3: determine routing — UPDATE (manifest hit) or INSERT (manifest miss).
  var existingSlug = updatesManifestMod.lookupExistingSlug(ctx.updatesManifest, result.zipBasename);

  // Step 4: compute predicted slug. Per slug.js: deriveSeedFromManifest
  // is single SoT for slug-seed composition across publish-cli paths.
  var seed = slugMod.deriveSeedFromManifest(manifest);
  var slugCandidate = slugMod.slugify(seed);
  if (!slugCandidate) {
    result.errors.push('slug: empty string from seed "' + seed + '"');
    return result;
  }

  var predictedSlug = slugCandidate;
  if (existingSlug) {
    // UPDATE path: slug stays as the existing one.
    predictedSlug = existingSlug;
    result.routedAs = 'UPDATE';
  } else {
    // INSERT path: check collision against DB.
    if (ctx.findExistingBySlug) {
      try {
        var existingRow = await ctx.findExistingBySlug(manifest.language, slugCandidate);
        if (existingRow) {
          result.collision = {
            existingId: existingRow.id,
            existingSlug: existingRow.slug,
            existingStatus: existingRow.status,
            predictedSlug: slugCandidate
          };
        }
      } catch (e) {
        result.errors.push('DB collision check: ' + e.message);
        return result;
      }
    }
    result.routedAs = 'INSERT';
  }
  result.slug = predictedSlug;

  // Step 5: substitute placeholders.
  var subResult;
  try {
    subResult = substitute.apply({
      manifest: manifest,
      metadata: {},
      deckHtml: deckHtml,
      slugCandidate: predictedSlug
    });
  } catch (e) {
    result.errors.push('substitute: ' + e.message);
    return result;
  }
  if (subResult.errors && subResult.errors.length) {
    subResult.errors.forEach(function (e) { result.errors.push('substitute: ' + e); });
    return result;
  }
  result.canonicalURL = subResult.resolved.canonicalURL;
  result.warnings = subResult.warnings || [];

  // Step 6: write per-deck dry-run output.
  try {
    dryRunMod.ensureDir(stagingRoot);
    dryRunMod.writeDeck(stagingRoot, manifest.deck_id, {
      manifest: manifest,
      originalHtml: deckHtml,
      substitutedHtml: subResult.html,
      report: subResult.report,
      warnings: subResult.warnings,
      errors: subResult.errors,
      resolved: subResult.resolved
    });
  } catch (e) {
    result.errors.push('staging write: ' + e.message);
    return result;
  }

  result.ok = true;
  return result;
}

/**
 * Write batch-level dry-run artifacts: _summary.txt, _collisions.txt, _errors.txt.
 */
function writeBatchArtifacts(stagingRoot, results, ctx) {
  ensureDir(stagingRoot);

  // _summary.txt — one line per ZIP.
  var summaryLines = [];
  summaryLines.push('Brief B Phase 4 bulk dry-run summary');
  summaryLines.push('Generated: ' + new Date().toISOString());
  summaryLines.push('Batch ID: ' + ctx.batchId);
  summaryLines.push('Input folder: ' + ctx.inputFolder);
  summaryLines.push('Updates manifest: ' + (ctx.updatesManifestPath || '(none — all ZIPs route INSERT)'));
  summaryLines.push('ZIPs: ' + results.length);
  summaryLines.push('');
  summaryLines.push(''.padStart(72, '-'));
  results.forEach(function (r) {
    summaryLines.push(
      r.zipBasename +
      '  routed=' + (r.routedAs || '?') +
      '  deck=' + (r.deckId || '?') +
      '  language=' + (r.language || '?') +
      '  slug=' + (r.slug || '?') +
      '  collision=' + (r.collision ? 'YES' : 'no') +
      '  warnings=' + r.warnings.length +
      '  errors=' + r.errors.length
    );
  });
  fs.writeFileSync(path.join(stagingRoot, '_summary.txt'), summaryLines.join('\n') + '\n', 'utf8');

  // _collisions.txt — one block per collision (only INSERT-routed ZIPs that hit existing slug).
  var collisions = results.filter(function (r) { return r.collision; });
  var collisionLines = [];
  if (collisions.length === 0) {
    collisionLines.push('No collisions detected.');
  } else {
    collisionLines.push('Predicted-slug collisions (' + collisions.length + '):');
    collisionLines.push('');
    collisions.forEach(function (r) {
      collisionLines.push('ZIP: ' + r.zipBasename);
      collisionLines.push('  predicted slug:        ' + r.collision.predictedSlug);
      collisionLines.push('  existing deck id:      ' + r.collision.existingId);
      collisionLines.push('  existing slug:         ' + r.collision.existingSlug);
      collisionLines.push('  existing status:       ' + (r.collision.existingStatus || 'unknown'));
      // Phase 5 Q2 lock: differentiate by status. 'archived' rows were
      // unpublished; reactivation is out-of-scope, so the recommendation
      // is "pick a different slug" (NOT --updates-manifest, which would
      // attempt UPDATE on the archived row and trigger publish.js's
      // block-on-archived rejection).
      if (r.collision.existingStatus === 'archived') {
        collisionLines.push('  recommended action:    pick a different slug — slug already used by an archived (unpublished) deck.');
        collisionLines.push('                         UPDATE-via-manifest is NOT valid for archived rows; reactivation is out-of-scope per Phase 5 Q2 lock.');
      } else {
        collisionLines.push('  recommended action:    add to --updates-manifest mapping ' + r.zipBasename + ' -> ' + r.collision.existingSlug);
        collisionLines.push('                         OR rename source ZIP to produce a different slug');
      }
      collisionLines.push('');
    });
  }
  fs.writeFileSync(path.join(stagingRoot, '_collisions.txt'), collisionLines.join('\n') + '\n', 'utf8');

  // _errors.txt — per-ZIP errors that block real-publish.
  var errored = results.filter(function (r) { return r.errors && r.errors.length; });
  var errorLines = [];
  if (errored.length === 0) {
    errorLines.push('No errors detected.');
  } else {
    errorLines.push('Per-ZIP errors (' + errored.length + ' ZIP(s) failed pre-flight):');
    errorLines.push('');
    errored.forEach(function (r) {
      errorLines.push('ZIP: ' + r.zipBasename);
      r.errors.forEach(function (e) { errorLines.push('  - ' + e); });
      errorLines.push('');
    });
  }
  fs.writeFileSync(path.join(stagingRoot, '_errors.txt'), errorLines.join('\n') + '\n', 'utf8');
}

/**
 * Bulk dry-run entry.
 *
 * opts:
 *   inputFolder         — absolute path to ZIP folder
 *   stagingRoot         — absolute path to .publish-cli-staging root (will create <batchId>/ inside)
 *   batchId             — string; defaults to UTC timestamp
 *   updatesManifestPath — optional path to JSON manifest
 */
async function dryRunBatch(opts) {
  var batchId = opts.batchId || ('batch-' + utcStamp());
  var stagingDir = path.join(opts.stagingRoot, batchId);
  ensureDir(stagingDir);

  var zips = listZips(opts.inputFolder);
  if (zips.length === 0) {
    console.error('[bulk dry-run] no ZIPs found in ' + opts.inputFolder);
    return { batchId: batchId, stagingDir: stagingDir, results: [], abortReason: 'no-zips' };
  }

  // Resolve updates manifest if supplied.
  var updatesManifest = null;
  if (opts.updatesManifestPath) {
    updatesManifest = updatesManifestMod.read(opts.updatesManifestPath);
    var manifestErrors = await updatesManifestMod.validate({
      manifest: updatesManifest,
      inputFolder: opts.inputFolder,
      resolveLanguage: opts.resolveLanguage,
      findExistingBySlug: opts.findExistingBySlug
    });
    if (manifestErrors.length) {
      throw new Error('--updates-manifest validation failed:\n  ' + manifestErrors.join('\n  '));
    }
  }

  console.error('[bulk dry-run] batch=' + batchId + ' zips=' + zips.length +
    (updatesManifest ? ' (' + Object.keys(updatesManifest).length + ' manifest entries)' : ''));

  var ctx = {
    batchId: batchId,
    inputFolder: opts.inputFolder,
    updatesManifest: updatesManifest,
    updatesManifestPath: opts.updatesManifestPath || null,
    findExistingBySlug: opts.findExistingBySlug
  };

  var results = [];
  for (var i = 0; i < zips.length; i++) {
    var zipPath = path.join(opts.inputFolder, zips[i]);
    console.error('[bulk dry-run] (' + (i + 1) + '/' + zips.length + ') ' + zips[i]);
    var r = await dryRunOneZip(zipPath, stagingDir, ctx);
    results.push(r);
  }

  writeBatchArtifacts(stagingDir, results, ctx);

  return { batchId: batchId, stagingDir: stagingDir, results: results, abortReason: null };
}

/**
 * Write _results.txt + _failures/<zip>.stderr for real-publish outcomes.
 */
function writeRealResults(stagingDir, outcomes, ctx) {
  var resultsLines = [];
  resultsLines.push('Brief B Phase 4 bulk publish results');
  resultsLines.push('Generated: ' + new Date().toISOString());
  resultsLines.push('Batch ID: ' + ctx.batchId);
  resultsLines.push('Input folder: ' + ctx.inputFolder);
  resultsLines.push('Updates manifest: ' + (ctx.updatesManifestPath || '(none — all ZIPs INSERT)'));
  resultsLines.push('Total: ' + outcomes.length +
    '  succeeded: ' + outcomes.filter(function (o) { return o.ok; }).length +
    '  failed: ' + outcomes.filter(function (o) { return !o.ok; }).length);
  resultsLines.push('');
  resultsLines.push(''.padStart(72, '-'));
  outcomes.forEach(function (o) {
    if (o.ok) {
      resultsLines.push(
        'PUBLISHED  ' + o.zipBasename +
        '  routed=' + o.routedAs +
        '  id=' + o.id +
        '  slug=' + o.slug +
        '  v=' + o.version +
        '  url=' + o.canonicalURL
      );
    } else {
      resultsLines.push(
        'FAILED     ' + o.zipBasename +
        '  routed=' + (o.routedAs || '?') +
        '  err=' + (o.errorMessage || 'unknown')
      );
    }
  });
  fs.writeFileSync(path.join(stagingDir, '_results.txt'), resultsLines.join('\n') + '\n', 'utf8');

  // Per-failure structured stderr files.
  var failures = outcomes.filter(function (o) { return !o.ok; });
  if (failures.length) {
    var failureDir = path.join(stagingDir, '_failures');
    ensureDir(failureDir);
    failures.forEach(function (o) {
      var safeName = o.zipBasename.replace(/[^a-zA-Z0-9._-]/g, '_');
      fs.writeFileSync(path.join(failureDir, safeName + '.stderr'),
        (o.errorStderr || o.errorMessage || 'unknown error') + '\n', 'utf8');
    });
  }

  // Overwrite _summary.txt with actual outcomes (replaces dry-run prediction).
  var summaryLines = [];
  summaryLines.push('Brief B Phase 4 bulk publish summary (post-publish)');
  summaryLines.push('Generated: ' + new Date().toISOString());
  summaryLines.push('Batch ID: ' + ctx.batchId);
  summaryLines.push('ZIPs: ' + outcomes.length);
  summaryLines.push('');
  summaryLines.push(''.padStart(72, '-'));
  outcomes.forEach(function (o) {
    summaryLines.push(
      o.zipBasename +
      '  outcome=' + (o.ok ? 'PUBLISHED' : 'FAILED') +
      '  routed=' + (o.routedAs || '?') +
      '  slug=' + (o.slug || '?') +
      '  version=' + (o.version || '?')
    );
  });
  fs.writeFileSync(path.join(stagingDir, '_summary.txt'), summaryLines.join('\n') + '\n', 'utf8');
}

/**
 * Bulk publish entry.
 *
 * opts:
 *   inputFolder         — absolute path to ZIP folder
 *   stagingRoot         — absolute path to .publish-cli-staging root
 *   batchId             — defaults to UTC timestamp
 *   updatesManifestPath — optional
 *   createdBy           — operator identifier
 *   publish             — async (deckOpts) → result, injected from publish.js
 *   findExistingBySlug  — async (language, slug) → row | null, injected from db.js
 *   resolveLanguage     — async (zipPath) → language string
 *   confirm             — must be true (caller verified --confirm)
 *
 * Returns { batchId, stagingDir, outcomes, abortReason }.
 */
async function publishBatch(opts) {
  if (!opts.confirm) {
    throw new Error('bulk: publishBatch requires confirm=true (--confirm flag)');
  }

  // Pre-flight: run dry-run pipeline to surface collisions/errors before any side-effect.
  var dry = await dryRunBatch({
    inputFolder: opts.inputFolder,
    stagingRoot: opts.stagingRoot,
    batchId: opts.batchId,
    updatesManifestPath: opts.updatesManifestPath,
    findExistingBySlug: opts.findExistingBySlug,
    resolveLanguage: opts.resolveLanguage
  });

  if (dry.abortReason === 'no-zips') {
    console.error('[bulk publish] ABORT — no ZIPs in input folder.');
    return { batchId: dry.batchId, stagingDir: dry.stagingDir, outcomes: [], abortReason: 'no-zips' };
  }

  var collisions = dry.results.filter(function (r) { return r.collision; });
  var errored = dry.results.filter(function (r) { return r.errors && r.errors.length; });
  if (collisions.length || errored.length) {
    var msg =
      '[bulk publish] ABORT — pre-flight surfaced ' +
      collisions.length + ' collision(s) + ' + errored.length + ' error(s).\n' +
      'Inspect: ' + path.join(dry.stagingDir, '_collisions.txt') + '\n' +
      '         ' + path.join(dry.stagingDir, '_errors.txt') + '\n' +
      'Resolve via --updates-manifest or by renaming/dropping offending ZIPs, then re-run with --confirm.';
    console.error(msg);
    return { batchId: dry.batchId, stagingDir: dry.stagingDir, outcomes: [], abortReason: 'pre-flight-failed' };
  }

  // Pre-flight clean. Iterate publish() per-ZIP.
  var ctx = {
    batchId: dry.batchId,
    inputFolder: opts.inputFolder,
    updatesManifestPath: opts.updatesManifestPath || null
  };
  var updatesManifest = null;
  if (opts.updatesManifestPath) {
    updatesManifest = updatesManifestMod.read(opts.updatesManifestPath);
  }

  console.error('[bulk publish] batch=' + dry.batchId + ' zips=' + dry.results.length + ' (pre-flight clean)');

  var outcomes = [];
  for (var i = 0; i < dry.results.length; i++) {
    var dryR = dry.results[i];
    var zipPath = path.join(opts.inputFolder, dryR.zipBasename);
    var existingSlug = updatesManifestMod.lookupExistingSlug(updatesManifest, dryR.zipBasename);
    var routedAs = existingSlug ? 'UPDATE' : 'INSERT';

    console.error('[bulk publish] (' + (i + 1) + '/' + dry.results.length + ') ' + dryR.zipBasename + ' routed=' + routedAs);

    var outcome = {
      zipBasename: dryR.zipBasename,
      routedAs: routedAs,
      ok: false,
      slug: null,
      version: null,
      id: null,
      canonicalURL: null,
      errorMessage: null,
      errorStderr: null
    };

    try {
      var result = await opts.publish({
        zipPath: zipPath,
        updateSlug: existingSlug,
        confirm: true,
        createdBy: opts.createdBy
      });
      outcome.ok = true;
      outcome.id = result.id;
      outcome.slug = result.slug;
      outcome.version = result.version;
      outcome.canonicalURL = result.canonicalURL;
    } catch (e) {
      outcome.errorMessage = e.message;
      outcome.errorStderr = e.stack || e.message;
    }

    outcomes.push(outcome);
  }

  writeRealResults(dry.stagingDir, outcomes, ctx);

  return { batchId: dry.batchId, stagingDir: dry.stagingDir, outcomes: outcomes, abortReason: null };
}

module.exports = {
  listZips: listZips,
  utcStamp: utcStamp,
  dryRunOneZip: dryRunOneZip,
  dryRunBatch: dryRunBatch,
  publishBatch: publishBatch,
  writeBatchArtifacts: writeBatchArtifacts,
  writeRealResults: writeRealResults
};
