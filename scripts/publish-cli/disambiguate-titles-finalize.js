/**
 * Phase 3 (μ) finalize — handles cross-slug rendered-title collisions that
 * survived the ordinal-based disambiguate-titles-mu pass. Empirical: 74 decks
 * (32 en + 42 es) where two distinct slugs collapse onto the same rendered
 * title even after sequential ordinal variant_ids were assigned, because
 * prior ordinal-assignment runs treated them as separate collision groups
 * (different group keys at the time) but post-republish-seo their rendered
 * titles converged on the same string.
 *
 * Fix: read current rendered titles + DB hashes; for any deck whose canonical
 * SHA-1(rendered title) doesn't match DB, assign variant_id = sha1(slug)[:6]
 * (uniquely-keyed per slug; collision-probability ~(N²)/(2*16M) is negligible
 * at N=74). Overrides any existing ordinal variant_id only when needed to
 * achieve uniqueness; preserves operator-authored variant_ids by default.
 *
 * Usage:
 *   node scripts/publish-cli/disambiguate-titles-finalize.js --locales=en,es --dry-run
 *   node scripts/publish-cli/disambiguate-titles-finalize.js --locales=en,es --confirm
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var db = require('./db');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';

function sha1Slug6(slug) {
  return crypto.createHash('sha1').update(String(slug)).digest('hex').slice(0, 6);
}

function sha1Normalized(s) {
  if (!s) return null;
  var n = String(s).trim().toLowerCase().replace(/\s+/g, ' ');
  return n ? crypto.createHash('sha1').update(n).digest('hex') : null;
}

function parseArgs(argv) {
  var out = { locales: ['en', 'es'], dryRun: false, confirm: false };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',');
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
  });
  if (!out.dryRun && !out.confirm) { console.error('USAGE: --dry-run or --confirm required'); process.exit(2); }
  return out;
}

function readRendered(htmlPath) {
  try {
    var html = fs.readFileSync(htmlPath, 'utf8');
    var t = /<title>([\s\S]*?)<\/title>/i.exec(html);
    var d = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(html);
    return {
      title: t ? t[1].trim() : null,
      description: d ? d[1] : null
    };
  } catch (e) {
    return null;
  }
}

async function main() {
  var args = parseArgs(process.argv);

  var rows = await db.client().deck.findMany({
    where: { status: 'published', language: { in: args.locales } },
    select: { id: true, slug: true, language: true, titleHash: true, descriptionHash: true }
  });
  console.log('[finalize] ' + rows.length + ' rows');

  // For each deck, read deck.html + manifest. Identify stuck.
  var stuck = [];
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var htmlPath = '/var/www/lcs-media/decks/' + r.language + '/' + r.slug + '/deck.html';
    var manifestPath = '/var/www/lcs-media/decks/' + r.language + '/' + r.slug + '/manifest.json';
    var rendered = readRendered(htmlPath);
    if (!rendered || !rendered.title) continue;
    var canonicalHash = sha1Normalized(rendered.title);
    if (!r.titleHash) {
      stuck.push({ row: r, manifestPath: manifestPath, rendered: rendered, reason: 'NULL_TITLE_HASH' });
    } else if (r.titleHash.length === 64) {
      stuck.push({ row: r, manifestPath: manifestPath, rendered: rendered, reason: 'SHA256_STALE' });
    } else if (r.titleHash !== canonicalHash) {
      stuck.push({ row: r, manifestPath: manifestPath, rendered: rendered, reason: 'HASH_MISMATCH' });
    }
  }
  console.log('[finalize] ' + stuck.length + ' stuck decks');

  if (args.dryRun) {
    console.log('[finalize] DRY-RUN sample:');
    stuck.slice(0, 10).forEach(function (s) {
      console.log('  ' + s.row.language + '/' + s.row.slug + ' (' + s.reason + ')');
    });
    await db.disconnect();
    return;
  }

  // Real-mode: assign sha1(slug)[:6] variant_id, write manifest.
  var applied = 0;
  var failed = 0;
  for (var k = 0; k < stuck.length; k++) {
    var s = stuck[k];
    var newVariant = sha1Slug6(s.row.slug);
    try {
      var raw = JSON.parse(fs.readFileSync(s.manifestPath, 'utf8'));
      raw.variant_id = newVariant;
      var tmp = s.manifestPath + '.new';
      fs.writeFileSync(tmp, JSON.stringify(raw, null, 2));
      fs.renameSync(tmp, s.manifestPath);
      applied++;
    } catch (e) {
      failed++;
      console.error('  WRITE-FAIL ' + s.row.slug + ': ' + e.message);
    }
  }
  console.log('[finalize] applied: ' + applied + ', failed: ' + failed);
  console.log('[finalize] Next step: re-run republish-seo --language en|es --confirm');

  await db.disconnect();
}

main().catch(function (err) { console.error('FATAL', err && err.stack || err); process.exit(1); });
