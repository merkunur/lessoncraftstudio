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
    themeReconciliation: null,
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

  // Step 1b: manifest.theme reconciliation gate per §A.13. Halts batch
  // before slug derivation runs when authoring-tool emit-defects produce
  // metadata-content disagreement (the code-addition v6.0.0 emit-defect
  // class). CLEAN cases continue to slug derivation; non-CLEAN attach
  // structured reconciliation context and push category-prefixed error.
  var recon = slugMod.reconcileManifestTheme(manifest);
  result.themeReconciliation = recon;
  if (recon.category !== 'CLEAN') {
    result.errors.push(
      'manifest.theme reconciliation [' + recon.category + ']: ' +
      'declared=' + JSON.stringify(recon.declared) + ' ' +
      'primary=' + JSON.stringify(recon.primary) + ' ' +
      'secondary=' + JSON.stringify(recon.secondary)
    );
    return result;
  }

  // Step 1c: manifest.exerciseMode reconciliation gate per Commission δ.
  // Pairs with theme reconciliation; same halt-pre-slug-derivation behavior.
  // Closes structural exposure for the 16 HARDCODED_NULL apps surfaced by
  // Commission ε's recon. App-classification table in slug.js drives the
  // decision: DERIVED apps must emit non-null mode; HARDCODED_NULL apps
  // halt on null pending Commission ε per-app fix; unknown apps degraded-
  // trust CLEAN.
  var modeRecon = slugMod.reconcileExerciseMode(manifest);
  result.exerciseModeReconciliation = modeRecon;
  if (modeRecon.category !== 'CLEAN') {
    result.errors.push(
      'manifest.exerciseMode reconciliation [' + modeRecon.category + ']: ' +
      'declared=' + JSON.stringify(modeRecon.declared) + ' ' +
      'app=' + JSON.stringify(modeRecon.app) + ' ' +
      'appClass=' + modeRecon.appClass
    );
    return result;
  }

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

  // _reconciliation.txt — manifest.theme reconciliation per §A.13.
  // Surfaces non-CLEAN reconciliation results separately from generic
  // _errors.txt so the operator can route emit-defects to the originating
  // app rather than the generic "manifest validation" bucket.
  var nonClean = results.filter(function (r) {
    return r.themeReconciliation && r.themeReconciliation.category !== 'CLEAN';
  });
  var reconLines = [];
  if (nonClean.length === 0) {
    reconLines.push('manifest.theme reconciliation: ' + results.length + '/' + results.length + ' CLEAN.');
  } else {
    // Per-category tally
    var byCategory = {};
    var byApp = {};
    nonClean.forEach(function (r) {
      var c = r.themeReconciliation.category;
      var a = r.themeReconciliation.app || '(unknown)';
      byCategory[c] = (byCategory[c] || 0) + 1;
      if (!byApp[a]) byApp[a] = {};
      byApp[a][c] = (byApp[a][c] || 0) + 1;
    });
    reconLines.push('manifest.theme reconciliation halt — ' + nonClean.length + ' of ' + results.length + ' ZIPs non-CLEAN.');
    reconLines.push('');
    reconLines.push('Per-category tally:');
    Object.keys(byCategory).sort().forEach(function (c) {
      reconLines.push('  ' + byCategory[c] + '  ' + c);
    });
    reconLines.push('');
    reconLines.push('Per-app breakdown:');
    Object.keys(byApp).sort().forEach(function (a) {
      var parts = Object.keys(byApp[a]).sort().map(function (c) {
        return c + '=' + byApp[a][c];
      });
      reconLines.push('  ' + a + '  ' + parts.join(', '));
    });
    reconLines.push('');
    reconLines.push(''.padStart(72, '-'));
    reconLines.push('Per-deck reconciliation table (deck_id | category | declared | primary | secondary):');
    reconLines.push('');
    nonClean.forEach(function (r) {
      var rc = r.themeReconciliation;
      reconLines.push(r.zipBasename);
      reconLines.push('  deck_id:   ' + (rc.deckId || '?'));
      reconLines.push('  app:       ' + (rc.app || '?'));
      reconLines.push('  category:  ' + rc.category);
      reconLines.push('  declared:  ' + JSON.stringify(rc.declared));
      reconLines.push('  primary:   ' + JSON.stringify(rc.primary) + '   (image.theme)');
      reconLines.push('  secondary: ' + JSON.stringify(rc.secondary) + '   (path-derived; null when CUID-shaped)');
      reconLines.push('');
    });
    reconLines.push(''.padStart(72, '-'));
    reconLines.push('Action: emit-defect at the authoring-tool side. Either fix the');
    reconLines.push('  authoring tool to emit manifest.theme matching actual content, OR');
    reconLines.push('  regenerate the affected ZIPs. Reconciliation is a hard gate; no');
    reconLines.push('  override path is provided. See CLAUDE.md §A.13 + 9850df93 audit.');
  }

  // Section 2: manifest.exerciseMode reconciliation per Commission δ.
  // Pairs with theme reconciliation; same structure (per-category tally +
  // per-app breakdown + per-deck table). App-classification table in
  // slug.js drives the decision tree.
  var modeNonClean = results.filter(function (r) {
    return r.exerciseModeReconciliation && r.exerciseModeReconciliation.category !== 'CLEAN';
  });
  reconLines.push('');
  reconLines.push(''.padStart(72, '='));
  reconLines.push('');
  if (modeNonClean.length === 0) {
    reconLines.push('manifest.exerciseMode reconciliation: ' + results.length + '/' + results.length + ' CLEAN.');
  } else {
    var modeByCategory = {};
    var modeByApp = {};
    modeNonClean.forEach(function (r) {
      var c = r.exerciseModeReconciliation.category;
      var a = r.exerciseModeReconciliation.app || '(unknown)';
      modeByCategory[c] = (modeByCategory[c] || 0) + 1;
      if (!modeByApp[a]) modeByApp[a] = {};
      modeByApp[a][c] = (modeByApp[a][c] || 0) + 1;
    });
    reconLines.push('manifest.exerciseMode reconciliation halt — ' + modeNonClean.length + ' of ' + results.length + ' ZIPs non-CLEAN.');
    reconLines.push('');
    reconLines.push('Per-category tally:');
    Object.keys(modeByCategory).sort().forEach(function (c) {
      reconLines.push('  ' + modeByCategory[c] + '  ' + c);
    });
    reconLines.push('');
    reconLines.push('Per-app breakdown:');
    Object.keys(modeByApp).sort().forEach(function (a) {
      var parts = Object.keys(modeByApp[a]).sort().map(function (c) {
        return c + '=' + modeByApp[a][c];
      });
      reconLines.push('  ' + a + '  ' + parts.join(', '));
    });
    reconLines.push('');
    reconLines.push(''.padStart(72, '-'));
    reconLines.push('Per-deck table (deck_id | category | declared | app | appClass):');
    reconLines.push('');
    modeNonClean.forEach(function (r) {
      var mc = r.exerciseModeReconciliation;
      reconLines.push(r.zipBasename);
      reconLines.push('  deck_id:   ' + (mc.deckId || '?'));
      reconLines.push('  app:       ' + (mc.app || '?'));
      reconLines.push('  category:  ' + mc.category);
      reconLines.push('  declared:  ' + JSON.stringify(mc.declared));
      reconLines.push('  appClass:  ' + mc.appClass);
      reconLines.push('');
    });
    reconLines.push(''.padStart(72, '-'));
    reconLines.push('Action: known emit-defect per Commission ε recon. App is in the');
    reconLines.push('  HARDCODED_NULL classification (16 apps with hardcoded null at the');
    reconLines.push('  LCSCatalogExport.export() call site). Per-app fix awaits operator-');
    reconLines.push('  strategic taxonomy adjudication (Commission ε is parked). Multi-mode');
    reconLines.push('  waves on these apps remain blocked at the gate until Commission ε ships.');
    reconLines.push('  See CLAUDE.md §A.13 + 5078f491 + Commission ε recon report.');
  }
  fs.writeFileSync(path.join(stagingRoot, '_reconciliation.txt'), reconLines.join('\n') + '\n', 'utf8');
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
  var themeReconHalted = dry.results.filter(function (r) {
    return r.themeReconciliation && r.themeReconciliation.category !== 'CLEAN';
  });
  var modeReconHalted = dry.results.filter(function (r) {
    return r.exerciseModeReconciliation && r.exerciseModeReconciliation.category !== 'CLEAN';
  });
  var reconHalted = themeReconHalted.length + modeReconHalted.length;
  if (collisions.length || errored.length) {
    var msg =
      '[bulk publish] ABORT — pre-flight surfaced ' +
      collisions.length + ' collision(s) + ' + errored.length + ' error(s)' +
      (reconHalted ? ' (' + themeReconHalted.length + ' theme + ' + modeReconHalted.length + ' exerciseMode reconciliation halt(s) included in error count)' : '') + '.\n' +
      'Inspect: ' + path.join(dry.stagingDir, '_collisions.txt') + '\n' +
      '         ' + path.join(dry.stagingDir, '_errors.txt') + '\n' +
      (reconHalted ? '         ' + path.join(dry.stagingDir, '_reconciliation.txt') + '\n' : '') +
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
