#!/usr/bin/env node
/*
 * audit-slug-fs-db-consistency.js — read-only cross-check of every published
 * deck's slug against (a) its five DB URL columns, (b) the on-disk symlink +
 * asset tree under /var/www/lcs-media/decks/, and (c) the slug RE-DERIVED from
 * the on-disk manifest. Closes the one coverage gap the existing audits leave:
 * nothing else verifies DB-slug ↔ filesystem ↔ derived-slug coherence in one
 * pass. (audit-deck-html.js audits deck.html content; audit-canonicals-crawl.js
 * audits live HTTP canonicals; neither cross-checks the DB columns vs the FS.)
 *
 * Per published Deck row it asserts:
 *   1. SLUG_HTMLURL_MISMATCH   — DB.slug === slug parsed from htmlUrl path
 *   2. COLUMN_PATH_DRIFT       — every URL column embeds `/decks/<DB.slug>/`
 *   3. SYMLINK_MISSING/NOT_LINK/DANGLING — /decks/<locale>/<slug> resolves to a -vN dir
 *   4. ASSET_MISSING           — resolved dir has deck.html + manifest.json + thumbnail.png + og-image.png
 *   5. PDF_FILE_MISSING        — the file named by pdfUrl exists on disk
 *   (HARD defects above mean a real 404 / wrong-asset for a visitor or Googlebot.)
 *
 *   INFO buckets (not breakage, surfaced for awareness):
 *   - NATIVE_SLUG_REDERIVE_DIFF — slugify(deriveSeedFromManifest(manifest)) !== DB.slug
 *       (ignores trailing -N collision suffixes, which deriveSeed does not emit)
 *   - PDF_FILENAME_DRIFT        — pdfUrl filename prefix !== DB.slug (cosmetic;
 *       harmless once PDFs are X-Robots-Tag:noindex)
 *
 * Memory-bounded: processes per locale, reads only manifest.json (small) per
 * deck, keeps only defect/info records (not all-clean rows).
 *
 * Usage (on Hetzner, env loaded):
 *   cd frontend && set -a && source .env.production && set +a && cd ..
 *   node scripts/publish-cli/audit-slug-fs-db-consistency.js \
 *     --locales=en,de,es,fr,it,pt,nl,sv,da,no,fi \
 *     [--decks-root=/var/www/lcs-media/decks] [--out-dir=docs/audit-results] [--sample=N]
 *
 * Read-only: no DB writes, no FS mutation except the JSON+md report under --out-dir.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');
var slug = require('./slug');

var URL_COLS = ['htmlUrl', 'thumbnailUrl', 'pdfUrl', 'answerKeyUrl', 'manifestUrl'];
var REQUIRED_ASSETS = ['deck.html', 'manifest.json', 'thumbnail.png', 'og-image.png'];

function parseArgs(argv) {
  var out = {
    locales: ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'],
    decksRoot: '/var/www/lcs-media/decks',
    outDir: path.resolve('docs/audit-results'),
    sample: null
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice(10));
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help') { console.log('Usage: node audit-slug-fs-db-consistency.js [--locales=] [--decks-root=] [--out-dir=] [--sample=N]'); process.exit(0); }
  });
  return out;
}

// .../decks/<slug>/<anything>  →  <slug>   (null if no /decks/<x>/ segment)
function slugFromUrlPath(url) {
  if (!url) return null;
  var m = /\/decks\/([^/]+)\//.exec(url);
  return m ? m[1] : null;
}

// filename after the last '/' in a URL (the PDF asset filename)
function fileNameFromUrl(url) {
  if (!url) return null;
  var clean = url.split('?')[0].split('#')[0];
  var parts = clean.split('/');
  return parts[parts.length - 1] || null;
}

// strip a single trailing -<digits> collision suffix (deriveSeed never emits it)
function stripCollisionSuffix(s) {
  return s.replace(/-\d+$/, '');
}

function utcStamp() {
  // caller passes a fixed stamp from outside (Date.now is unavailable in some
  // harness contexts); here we use a real Date — this is a plain Node CLI.
  var d = new Date();
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return d.getUTCFullYear() + p(d.getUTCMonth() + 1) + p(d.getUTCDate()) + '-' +
    p(d.getUTCHours()) + p(d.getUTCMinutes()) + p(d.getUTCSeconds());
}

function auditDeckRow(row, decksRoot) {
  var locale = row.language;
  var dbSlug = row.slug;
  var hard = [];   // breakage
  var info = [];   // awareness only

  // 1. slug vs htmlUrl path
  var htmlSlug = slugFromUrlPath(row.htmlUrl);
  if (htmlSlug !== dbSlug) {
    hard.push({ code: 'SLUG_HTMLURL_MISMATCH', detail: 'DB.slug=' + dbSlug + ' htmlUrl-slug=' + htmlSlug });
  }

  // 2. every URL column embeds /decks/<dbSlug>/
  var driftedCols = [];
  for (var c = 0; c < URL_COLS.length; c++) {
    var col = URL_COLS[c];
    var val = row[col];
    if (!val) continue; // answerKeyUrl may be null (legit)
    var colSlug = slugFromUrlPath(val);
    if (colSlug !== dbSlug) driftedCols.push(col + '=' + colSlug);
  }
  if (driftedCols.length) {
    hard.push({ code: 'COLUMN_PATH_DRIFT', detail: 'cols not on /decks/' + dbSlug + '/: ' + driftedCols.join(', ') });
  }

  // 3. symlink resolution
  var symlinkPath = path.join(decksRoot, locale, dbSlug);
  var resolvedDir = null;
  var lst;
  try { lst = fs.lstatSync(symlinkPath); } catch (e) { lst = null; }
  if (!lst) {
    hard.push({ code: 'SYMLINK_MISSING', detail: symlinkPath });
  } else if (!lst.isSymbolicLink() && !lst.isDirectory()) {
    hard.push({ code: 'SYMLINK_NOT_LINK', detail: symlinkPath + ' is neither symlink nor dir' });
  } else {
    // resolve (works for both symlink and real dir)
    try {
      resolvedDir = fs.realpathSync(symlinkPath);
      var st = fs.statSync(resolvedDir);
      if (!st.isDirectory()) { hard.push({ code: 'SYMLINK_DANGLING', detail: symlinkPath + ' → ' + resolvedDir + ' (not a dir)' }); resolvedDir = null; }
    } catch (e) {
      hard.push({ code: 'SYMLINK_DANGLING', detail: symlinkPath + ' → unresolved (' + e.code + ')' });
      resolvedDir = null;
    }
  }

  // 4 + 5 require the resolved dir
  var manifest = null;
  if (resolvedDir) {
    // 4. required assets present
    var missing = [];
    for (var a = 0; a < REQUIRED_ASSETS.length; a++) {
      if (!fs.existsSync(path.join(resolvedDir, REQUIRED_ASSETS[a]))) missing.push(REQUIRED_ASSETS[a]);
    }
    if (missing.length) hard.push({ code: 'ASSET_MISSING', detail: 'in ' + resolvedDir + ': ' + missing.join(', ') });

    // 5. pdfUrl file exists
    var pdfName = fileNameFromUrl(row.pdfUrl);
    if (pdfName) {
      if (!fs.existsSync(path.join(resolvedDir, pdfName))) {
        hard.push({ code: 'PDF_FILE_MISSING', detail: 'pdfUrl file ' + pdfName + ' not in ' + resolvedDir });
      }
      // PDF filename drift (info): canonical is <slug>-printable.pdf
      var expectedPdf = dbSlug + '-printable.pdf';
      if (pdfName !== expectedPdf) {
        info.push({ code: 'PDF_FILENAME_DRIFT', detail: 'pdfUrl=' + pdfName + ' expected=' + expectedPdf });
      }
    }

    // re-derive native slug from manifest
    try {
      manifest = JSON.parse(fs.readFileSync(path.join(resolvedDir, 'manifest.json'), 'utf8'));
    } catch (e) { manifest = null; info.push({ code: 'MANIFEST_UNREADABLE', detail: e.message }); }
  }

  // INFO: native slug re-derive diff (ignore trailing collision suffix)
  if (manifest) {
    var rederived = '';
    try { rederived = slug.slugify(slug.deriveSeedFromManifest(manifest)); } catch (e) { rederived = ''; }
    if (rederived && rederived !== dbSlug && stripCollisionSuffix(dbSlug) !== rederived) {
      info.push({ code: 'NATIVE_SLUG_REDERIVE_DIFF', detail: 'DB.slug=' + dbSlug + ' rederived=' + rederived });
    }
  }

  return { hard: hard, info: info };
}

async function main() {
  var args = parseArgs(process.argv);
  if (!fs.existsSync(args.outDir)) fs.mkdirSync(args.outDir, { recursive: true });
  var stamp = utcStamp();
  console.log('=== audit-slug-fs-db-consistency — ' + stamp + ' ===');
  console.log('locales=' + args.locales.join(',') + '  decks-root=' + args.decksRoot + (args.sample ? '  sample=' + args.sample : ''));

  var p = db.client();
  var perLocale = {};
  var allHard = [];
  var allInfo = [];
  var hardCodeTotals = {};
  var infoCodeTotals = {};
  var grandDecks = 0;

  for (var li = 0; li < args.locales.length; li++) {
    var locale = args.locales[li];
    var rows = await p.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { id: true, slug: true, language: true, htmlUrl: true, thumbnailUrl: true, pdfUrl: true, answerKeyUrl: true, manifestUrl: true }
    });
    if (args.sample) rows = rows.slice(0, args.sample);
    var lc = { decks: rows.length, hard: 0, info: 0, hardDecks: 0 };
    for (var i = 0; i < rows.length; i++) {
      var res = auditDeckRow(rows[i], args.decksRoot);
      if (res.hard.length) {
        lc.hardDecks++;
        lc.hard += res.hard.length;
        res.hard.forEach(function (d) {
          hardCodeTotals[d.code] = (hardCodeTotals[d.code] || 0) + 1;
          if (allHard.length < 2000) allHard.push({ locale: locale, slug: rows[i].slug, id: rows[i].id, code: d.code, detail: d.detail });
        });
      }
      if (res.info.length) {
        lc.info += res.info.length;
        res.info.forEach(function (d) {
          infoCodeTotals[d.code] = (infoCodeTotals[d.code] || 0) + 1;
          if (allInfo.length < 4000) allInfo.push({ locale: locale, slug: rows[i].slug, code: d.code, detail: d.detail });
        });
      }
    }
    perLocale[locale] = lc;
    grandDecks += lc.decks;
    console.log('[' + locale + '] ' + lc.decks + ' decks | HARD defects=' + lc.hard + ' (on ' + lc.hardDecks + ' decks) | info=' + lc.info);
  }

  var report = {
    generatedAt: stamp,
    decksRoot: args.decksRoot,
    locales: args.locales,
    totals: { decks: grandDecks, hardCodeTotals: hardCodeTotals, infoCodeTotals: infoCodeTotals },
    perLocale: perLocale,
    hardDefects: allHard,
    infoFindings: allInfo
  };
  var jsonPath = path.join(args.outDir, 'slug-fs-db-consistency-' + stamp + '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  // markdown summary
  var md = [];
  md.push('# Slug ↔ FS ↔ DB consistency audit — ' + stamp);
  md.push('');
  md.push('- decks-root: `' + args.decksRoot + '`');
  md.push('- locales: ' + args.locales.join(', '));
  md.push('- total published decks scanned: **' + grandDecks + '**');
  md.push('');
  md.push('## HARD defects (cause a real 404 / wrong-asset)');
  var hardKeys = Object.keys(hardCodeTotals);
  if (!hardKeys.length) md.push('**NONE — 0 hard defects across all scanned decks.**');
  else hardKeys.forEach(function (k) { md.push('- `' + k + '`: ' + hardCodeTotals[k]); });
  md.push('');
  md.push('## INFO findings (not breakage)');
  var infoKeys = Object.keys(infoCodeTotals);
  if (!infoKeys.length) md.push('None.');
  else infoKeys.forEach(function (k) { md.push('- `' + k + '`: ' + infoCodeTotals[k]); });
  md.push('');
  md.push('## Per-locale');
  md.push('| locale | decks | hard defects | decks w/ hard | info |');
  md.push('|---|---:|---:|---:|---:|');
  args.locales.forEach(function (l) {
    var x = perLocale[l] || { decks: 0, hard: 0, hardDecks: 0, info: 0 };
    md.push('| ' + l + ' | ' + x.decks + ' | ' + x.hard + ' | ' + x.hardDecks + ' | ' + x.info + ' |');
  });
  if (allHard.length) {
    md.push('');
    md.push('## First hard defects (up to 50)');
    allHard.slice(0, 50).forEach(function (d) { md.push('- [' + d.locale + '] `' + d.slug + '` — **' + d.code + '** — ' + d.detail); });
  }
  var mdPath = path.join(args.outDir, 'slug-fs-db-consistency-' + stamp + '.md');
  fs.writeFileSync(mdPath, md.join('\n') + '\n');

  console.log('');
  console.log('wrote JSON: ' + jsonPath);
  console.log('wrote summary: ' + mdPath);
  console.log('TOTAL hard defects: ' + Object.keys(hardCodeTotals).reduce(function (s, k) { return s + hardCodeTotals[k]; }, 0));

  await db.disconnect();
  // non-zero exit if any HARD defect, so CI / operator notices
  process.exit(Object.keys(hardCodeTotals).length ? 1 : 0);
}

main().catch(function (e) { console.error('FATAL: ' + e.message); if (e.stack) console.error(e.stack); process.exit(2); });
