#!/usr/bin/env node
/* backfill-content-language.js — one-shot, idempotent backfill of Deck.contentLanguage.
 *
 * content_language was added to the schema AFTER the cross-language decks were
 * published, so their rows have contentLanguage = NULL. This reads each published
 * deck's on-disk manifest.json (via the /var/www/lcs-media/decks/<locale>/<slug>
 * symlink → <slug>-v<N>/) and sets contentLanguage = manifest.content_language when
 * it is set AND ≠ the page locale (a content_language equal to the page locale is
 * effectively monolingual → stays NULL, matching slug.js:236's guard). Monolingual
 * decks (manifest content_language null/absent) are left NULL.
 *
 * Idempotent: only touches rows where contentLanguage IS NULL, so re-runs are no-ops
 * for already-set rows.
 *
 * Usage (Hetzner, env loaded):
 *   node scripts/publish-cli/backfill-content-language.js              # DRY-RUN (default)
 *   node scripts/publish-cli/backfill-content-language.js --confirm    # apply
 *   [--since=2026-06-19]   scope to decks created on/after this date (faster; default: all)
 *   [--decks-root=/var/www/lcs-media/decks]
 */
'use strict';
var fs = require('fs');
var path = require('path');
var db = require('./db');

var argv = process.argv.slice(2);
var CONFIRM = argv.includes('--confirm');
var DECKS_ROOT = (argv.find(function (a) { return a.indexOf('--decks-root=') === 0; }) || '--decks-root=/var/www/lcs-media/decks').split('=')[1];
var sinceArg = argv.find(function (a) { return a.indexOf('--since=') === 0; });
var SINCE = sinceArg ? new Date(sinceArg.split('=')[1]) : null;

function readManifestContentLanguage(locale, slug) {
  var symlink = path.join(DECKS_ROOT, locale, slug);
  var resolved;
  try { resolved = fs.realpathSync(symlink); } catch (e) { return { err: 'SYMLINK_UNRESOLVED' }; }
  try {
    var m = JSON.parse(fs.readFileSync(path.join(resolved, 'manifest.json'), 'utf8'));
    return { cl: m.content_language || null };
  } catch (e) { return { err: 'MANIFEST_READ_FAIL' }; }
}

(async function () {
  var c = db.client();
  var where = { status: 'published', contentLanguage: null };
  if (SINCE) where.createdAt = { gte: SINCE };
  var decks = await c.deck.findMany({ where: where, select: { id: true, language: true, slug: true } });
  console.log('[backfill] candidates (published, contentLanguage NULL' + (SINCE ? ', since ' + SINCE.toISOString() : '') + '): ' + decks.length);

  var byValue = {};   // contentLanguage -> [ids]
  var stats = { set: 0, monolingual: 0, selfLang: 0, symlinkErr: 0, manifestErr: 0 };
  var i = 0;
  for (var d of decks) {
    i++;
    if (i % 5000 === 0) console.log('  scanned ' + i + '/' + decks.length);
    var r = readManifestContentLanguage(d.language, d.slug);
    if (r.err === 'SYMLINK_UNRESOLVED') { stats.symlinkErr++; continue; }
    if (r.err === 'MANIFEST_READ_FAIL') { stats.manifestErr++; continue; }
    if (!r.cl) { stats.monolingual++; continue; }
    if (r.cl === d.language) { stats.selfLang++; continue; }   // effectively monolingual → leave NULL
    (byValue[r.cl] = byValue[r.cl] || []).push(d.id);
    stats.set++;
  }

  console.log('\n[backfill] scan complete:');
  console.log('  would-set contentLanguage : ' + stats.set);
  console.log('  monolingual (left NULL)   : ' + stats.monolingual);
  console.log('  content_language==locale  : ' + stats.selfLang + ' (left NULL)');
  console.log('  symlink-unresolved        : ' + stats.symlinkErr);
  console.log('  manifest-read-fail        : ' + stats.manifestErr);
  console.log('  per-target-language histogram:');
  Object.keys(byValue).sort().forEach(function (v) { console.log('    ' + v + ': ' + byValue[v].length); });

  if (!CONFIRM) {
    console.log('\n[backfill] DRY-RUN — nothing written. Re-run with --confirm to apply.');
    await db.disconnect();
    return;
  }

  var updated = 0;
  for (var val of Object.keys(byValue)) {
    var ids = byValue[val];
    // chunk to keep the IN list reasonable
    for (var k = 0; k < ids.length; k += 500) {
      var chunk = ids.slice(k, k + 500);
      var res = await c.deck.updateMany({ where: { id: { in: chunk } }, data: { contentLanguage: val } });
      updated += res.count;
    }
  }
  console.log('\n[backfill] APPLIED — rows updated: ' + updated);
  var total = await c.deck.count({ where: { contentLanguage: { not: null } } });
  console.log('[backfill] decks with contentLanguage != null now: ' + total);
  await db.disconnect();
})().catch(function (e) { console.error('[backfill] ERROR:', e && e.message); process.exit(1); });
