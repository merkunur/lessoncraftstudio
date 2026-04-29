/**
 * Single-deck unpublish orchestration per Brief B Phase 5 Sub-phase 5.4.
 *
 * Pipeline:
 *   1. db.findExistingBySlug(language, slug) — must return a row.
 *   2. Reject if status !== 'published' (already unpublished or in-draft).
 *   3. place-assets.unpublishAssets(locale, slug) — atomic FS archive:
 *      symlink removed first (immediate 404), then versioned dirs moved to
 *      .archived/<locale>/<slug>-unpublished-<utc>/.
 *   4. db.unpublishDeck(id) — flip status to 'archived' (Phase 5 Q2 lock;
 *      existing schema enum value per §8.1).
 *
 * Order rationale (FS first, DB last): same as Phase 3 publish ordering.
 * If DB write fails post-FS-archive, the deck is already FS-unavailable
 * (404); operator manually reconciles via psql per Phase 3 v4 failure-mode
 * UX policy. The user-facing state is correct (404) even if the row's
 * status field hasn't flipped yet.
 *
 * Q1 lock: single-deck only; no bulk-unpublish (deferred to future brief).
 * Q2 lock: status='archived' marker, NOT a new 'unpublished' value.
 */

'use strict';

var db = require('./db');
var placeAssets = require('./place-assets');

function structuredFailure(opts) {
  // Same shape as publish.js's structuredFailure (Phase 3 v4 failure-mode UX).
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
 * Unpublish a single deck by (language, slug).
 *
 * opts:
 *   language — locale (e.g. 'en', 'de')
 *   slug     — the deck's existing slug
 *
 * Returns: { id, language, slug, status, version, archiveDir, movedVersions }.
 * Throws on:
 *   - missing row for (language, slug)
 *   - row already has status !== 'published'
 *   - FS archive failure
 *   - DB update failure (with structured-failure message including
 *     reconciliation commands per Phase 3 v4 UX policy)
 */
async function unpublish(opts) {
  var language = opts.language;
  var slug = opts.slug;
  if (!language || !slug) {
    throw new Error('unpublish: language and slug are required');
  }

  var existing = await db.findExistingBySlug(language, slug);
  if (!existing) {
    throw new Error(
      'unpublish: no row found in (language=' + language + ', slug=' + slug + '). ' +
      'Cannot unpublish a deck that does not exist.'
    );
  }
  if (existing.status !== 'published') {
    throw new Error(
      'unpublish: deck "' + slug + '" already in status=\'' + existing.status + '\' ' +
      '(must be \'published\' to unpublish). No-op; refusing to re-archive.'
    );
  }

  console.error('[unpublish] Resolved deck:');
  console.error('  id:         ' + existing.id);
  console.error('  slug:       ' + existing.slug);
  console.error('  language:   ' + existing.language);
  console.error('  version:    ' + existing.version);
  console.error('  status:     ' + existing.status);
  console.error('  updated_at: ' + existing.updatedAt);

  // Step 3: FS archive (atomic per place-assets.unpublishAssets contract).
  var fsResult;
  try {
    fsResult = placeAssets.unpublishAssets(language, slug);
  } catch (e) {
    throw new Error('unpublish: FS archive failed before DB update: ' + e.message);
  }

  // Step 4: DB status flip. If this fails, FS state is already archived
  // (deck is 404); structured failure surfaces reconciliation commands.
  var dbRow;
  try {
    dbRow = await db.unpublishDeck(existing.id);
  } catch (e) {
    var msg = structuredFailure({
      what: 'DB update failed after FS archive completed.',
      state: {
        'FS state': 'symlink removed; versioned dirs at ' + fsResult.archiveDir + ' (deck 404 at canonical URL)',
        'DB state': 'row id=' + existing.id + ' still has status=\'' + existing.status + '\'',
        'Underlying error': e.message
      },
      reconciliation: [
        'Option A — flip DB status manually:',
        '  Connect to Postgres and run:',
        '  UPDATE decks SET status=\'archived\', updated_at=NOW() WHERE id=\'' + existing.id + '\';',
        'Option B — restore FS to undo the unpublish:',
        '  mv ' + fsResult.archiveDir + '/' + slug + '-v* /var/www/lcs-media/decks/' + language + '/',
        '  ln -sf ' + slug + '-v<latest> /var/www/lcs-media/decks/' + language + '/' + slug,
        '  (NOT atomic; consider running unpublish again after fixing the DB)'
      ]
    });
    process.stderr.write(msg + '\n');
    throw new Error('unpublish: DB update failed after FS archive (see stderr for reconciliation)');
  }

  return {
    id: dbRow.id,
    language: dbRow.language,
    slug: dbRow.slug,
    status: dbRow.status,
    version: dbRow.version,
    archiveDir: fsResult.archiveDir,
    movedVersions: fsResult.movedVersions
  };
}

module.exports = { unpublish: unpublish, structuredFailure: structuredFailure };
