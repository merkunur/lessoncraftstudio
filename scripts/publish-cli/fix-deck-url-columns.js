#!/usr/bin/env node
/*
 * fix-deck-url-columns.js — canonicalize the five Deck URL columns so every
 * column embeds `/decks/<DB.slug>/` and the PDF filenames are `<slug>-printable.pdf`
 * / `<slug>-answer-key.pdf`. Correctness-at-rest cleanup for the SEO-recovery
 * filename-drift bug (the live render surfaces are already slug-derived & fixed in
 * the 2026-06-25 [FIX][SEO] commit; this makes the DB match so audits read HARD=0
 * and any future/external column consumer is correct).
 *
 * Canonical forms (host = www per §A.10; the on-disk tree is the ground truth):
 *   html_url        = <dir>deck.html
 *   manifest_url    = <dir>manifest.json
 *   thumbnail_url   = <dir>thumbnail.png
 *   pdf_url         = <dir><slug>-printable.pdf
 *   answer_key_url  = <dir><slug>-answer-key.pdf   (ONLY when currently non-null)
 *   where dir       = https://www.lessoncraftstudio.com/<locale>/decks/<slug>/
 *
 * SAFE:
 *   - dry-run by DEFAULT (prints before→after + per-column counts); --apply to write.
 *   - VERIFY-BEFORE-POINT: resolves the on-disk dir (realpath /var/www/lcs-media/decks/
 *     <locale>/<slug>) and confirms each target FILE exists before staging that column.
 *     A column whose canonical file is absent is SKIPPED + recorded as residue (never
 *     points a column at a 404).
 *   - IDEMPOTENT: a column already canonical is not rewritten; re-run converges to 0.
 *   - per-locale; one Prisma update per changed row; only changed columns sent.
 *   - writes a JSON change-log + residue list under --out-dir.
 *
 * Read-only unless --apply. Run a `pg_dump` of the decks table BEFORE --apply.
 *
 * Usage (on Hetzner, env loaded):
 *   cd frontend && set -a && source .env.production && set +a && cd ..
 *   node scripts/publish-cli/fix-deck-url-columns.js --locales=en,de,es,fr,it,pt,nl,sv,da,no,fi            # dry-run
 *   node scripts/publish-cli/fix-deck-url-columns.js --locales=pt,de,fr,it,es --apply
 */
'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');

var HOST = 'https://www.lessoncraftstudio.com';
var ALL_LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function parseArgs(argv) {
  var out = { locales: ALL_LOCALES, decksRoot: '/var/www/lcs-media/decks', outDir: path.resolve('docs/audit-results'), apply: false };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice(10));
    else if (a === '--apply') out.apply = true;
    else if (a === '--help') { console.log('Usage: node fix-deck-url-columns.js [--locales=] [--apply] [--decks-root=] [--out-dir=]'); process.exit(0); }
  });
  return out;
}

function utcStamp() {
  var d = new Date();
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return d.getUTCFullYear() + p(d.getUTCMonth() + 1) + p(d.getUTCDate()) + '-' + p(d.getUTCHours()) + p(d.getUTCMinutes()) + p(d.getUTCSeconds());
}

// canonical targets for a deck (dir + each column value + the on-disk filename to verify)
function canonical(locale, slug) {
  var dir = HOST + '/' + locale + '/decks/' + slug + '/';
  return {
    dir: dir,
    cols: {
      htmlUrl: { url: dir + 'deck.html', file: 'deck.html' },
      manifestUrl: { url: dir + 'manifest.json', file: 'manifest.json' },
      thumbnailUrl: { url: dir + 'thumbnail.png', file: 'thumbnail.png' },
      pdfUrl: { url: dir + slug + '-printable.pdf', file: slug + '-printable.pdf' },
      answerKeyUrl: { url: dir + slug + '-answer-key.pdf', file: slug + '-answer-key.pdf' }
    }
  };
}

async function main() {
  var args = parseArgs(process.argv);
  if (!fs.existsSync(args.outDir)) fs.mkdirSync(args.outDir, { recursive: true });
  var stamp = utcStamp();
  console.log('=== fix-deck-url-columns — ' + stamp + ' — MODE: ' + (args.apply ? 'APPLY' : 'DRY-RUN') + ' ===');
  console.log('locales=' + args.locales.join(',') + '  decks-root=' + args.decksRoot);

  var p = db.client();
  var COLS = ['htmlUrl', 'manifestUrl', 'thumbnailUrl', 'pdfUrl', 'answerKeyUrl'];
  var grand = { rows: 0, changedRows: 0, byCol: {}, residueSkips: 0, missingDir: 0 };
  COLS.forEach(function (c) { grand.byCol[c] = 0; });
  var changeLog = [];
  var residue = [];
  var samples = [];

  for (var li = 0; li < args.locales.length; li++) {
    var locale = args.locales[li];
    var rows = await p.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { id: true, slug: true, language: true, htmlUrl: true, manifestUrl: true, thumbnailUrl: true, pdfUrl: true, answerKeyUrl: true }
    });
    var lc = { rows: rows.length, changedRows: 0, byCol: {}, residueSkips: 0, missingDir: 0 };
    COLS.forEach(function (c) { lc.byCol[c] = 0; });

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var can = canonical(locale, row.slug);
      // resolve the on-disk backing dir once
      var resolvedDir = null;
      try { resolvedDir = fs.realpathSync(path.join(args.decksRoot, locale, row.slug)); } catch (e) { resolvedDir = null; }
      if (!resolvedDir) { lc.missingDir++; residue.push({ locale: locale, slug: row.slug, reason: 'DIR_UNRESOLVED' }); continue; }

      var data = {};
      for (var c = 0; c < COLS.length; c++) {
        var col = COLS[c];
        var current = row[col];
        // answer_key_url: only manage when the deck already HAS one (null stays null)
        if (col === 'answerKeyUrl' && current == null) continue;
        var target = can.cols[col];
        if (current === target.url) continue; // already canonical (idempotent)
        // verify-before-point: the canonical file must exist on disk
        if (!fs.existsSync(path.join(resolvedDir, target.file))) {
          lc.residueSkips++;
          residue.push({ locale: locale, slug: row.slug, col: col, reason: 'TARGET_FILE_MISSING', file: target.file });
          continue;
        }
        data[col] = target.url;
        lc.byCol[col]++;
      }

      var changedCols = Object.keys(data);
      if (changedCols.length) {
        lc.changedRows++;
        if (samples.length < 12) samples.push('[' + locale + '] ' + row.slug + ' :: ' + changedCols.map(function (k) { return k + '←' + data[k].split('/').pop(); }).join(', '));
        if (changeLog.length < 20000) changeLog.push({ id: row.id, locale: locale, slug: row.slug, before: pick(row, changedCols), after: data });
        if (args.apply) {
          await p.deck.update({ where: { id: row.id }, data: data });
        }
      }
    }

    grand.rows += lc.rows; grand.changedRows += lc.changedRows; grand.residueSkips += lc.residueSkips; grand.missingDir += lc.missingDir;
    COLS.forEach(function (c) { grand.byCol[c] += lc.byCol[c]; });
    console.log('[' + locale + '] rows=' + lc.rows + ' changedRows=' + lc.changedRows +
      ' | pdf=' + lc.byCol.pdfUrl + ' ak=' + lc.byCol.answerKeyUrl + ' thumb=' + lc.byCol.thumbnailUrl +
      ' html=' + lc.byCol.htmlUrl + ' manifest=' + lc.byCol.manifestUrl +
      ' | residueSkips=' + lc.residueSkips + ' missingDir=' + lc.missingDir);
  }

  console.log('');
  console.log('TOTAL rows=' + grand.rows + ' changedRows=' + grand.changedRows + ' residueSkips=' + grand.residueSkips + ' missingDir=' + grand.missingDir);
  console.log('by column: ' + JSON.stringify(grand.byCol));
  samples.forEach(function (s) { console.log('  e.g ' + s); });

  var report = { generatedAt: stamp, mode: args.apply ? 'APPLY' : 'DRY-RUN', totals: grand, residue: residue, sampleChanges: changeLog.slice(0, 200) };
  var jsonPath = path.join(args.outDir, 'fix-deck-url-columns-' + stamp + '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log('wrote report: ' + jsonPath + (args.apply ? '' : '  (dry-run — re-run with --apply)'));

  await db.disconnect();
}

function pick(obj, keys) { var o = {}; keys.forEach(function (k) { o[k] = obj[k]; }); return o; }

main().catch(function (e) { console.error('FATAL: ' + e.message); if (e.stack) console.error(e.stack); process.exit(2); });
