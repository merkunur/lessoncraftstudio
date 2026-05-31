#!/usr/bin/env node
/*
 * fix-thanksgivinng-typo.js — one-shot correction of the `thanksgivinng`
 * (double-n) typo baked into 73 published decks (en/de/es/fr/pt) from an old
 * theme-source typo. Operator decision 2026-05-31: fix BOTH slug + description.
 *
 * `thanksgivinng` is an unambiguous typo token (it never legitimately appears),
 * so the correction is a uniform string replace `thanksgivinng`→`thanksgiving`
 * (and display `Thanksgivinng`→`Thanksgiving`) across EVERY surface, which keeps
 * slug ↔ filesystem ↔ DB perfectly consistent:
 *   FS:  rename <slug>-vN dir; rename *-printable.pdf / *-answer-key.pdf files;
 *        token-fix deck.html + manifest.json; create new symlink + re-point old
 *        symlink → new dir (old URL stays 200 until the redirect map 301s it).
 *   DB:  slug, htmlUrl, thumbnailUrl, pdfUrl, answerKeyUrl, manifestUrl,
 *        title (json), description (json) — all token-replaced.
 *
 * The live deck.html <title>/<meta description> are already correct (regenerated
 * by an earlier SEO pass), so titleHash/descriptionHash are unaffected — the typo
 * persisted only in the URL slug, the on-disk filenames, and the DB title/desc
 * JSON (which feed topic-card text + sitemap <image:caption>).
 *
 * After applying, run gen-old-slug-redirects.js + patch-nginx-deck-redirects.py
 * so each old typo URL 301s to its corrected slug.
 *
 * Idempotent: a deck with no `thanksgivinng` in its slug is skipped. Collision-
 * safe: halts a deck if its corrected (language, slug) already belongs to a
 * different published row (pre-checked 0 collisions 2026-05-31).
 *
 * Usage (on Hetzner, env loaded for DATABASE_URL):
 *   node scripts/publish-cli/fix-thanksgivinng-typo.js --dry-run
 *   node scripts/publish-cli/fix-thanksgivinng-typo.js --confirm
 */
'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var TYPO = 'thanksgivinng';
var FIX = 'thanksgiving';
var TYPO_CAP = 'Thanksgivinng';
var FIX_CAP = 'Thanksgiving';

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var CONFIRM = argv.includes('--confirm');
if (!DRY_RUN && !CONFIRM) { console.error('USAGE: --dry-run or --confirm required.'); process.exit(2); }
if (DRY_RUN && CONFIRM) { console.error('USAGE: --dry-run and --confirm are mutually exclusive.'); process.exit(2); }

function fixTok(s) {
  if (typeof s !== 'string') return s;
  return s.split(TYPO).join(FIX).split(TYPO_CAP).join(FIX_CAP);
}

// Deep token-fix of a JSON value (Deck.title / Deck.description are {locale: text}).
function fixJsonValue(v) {
  if (typeof v === 'string') return fixTok(v);
  if (Array.isArray(v)) return v.map(fixJsonValue);
  if (v && typeof v === 'object') {
    var out = {};
    Object.keys(v).forEach(function (k) { out[k] = fixJsonValue(v[k]); });
    return out;
  }
  return v;
}

function atomicWrite(p, content) {
  var tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, p);
}

async function fixOne(row, report) {
  var locale = row.language;
  var oldSlug = row.slug;
  if (oldSlug.indexOf(TYPO) === -1) { report.skipNoTypo++; return; }
  var newSlug = fixTok(oldSlug);

  var localeDir = path.join(DECKS_ROOT, locale);
  var oldSymlink = path.join(localeDir, oldSlug);
  var newSymlink = path.join(localeDir, newSlug);

  // Resolve current version dir via the bare symlink.
  var dirName, vSuffix;
  try {
    var target = fs.readlinkSync(oldSymlink); // "<oldSlug>-vN"
    dirName = path.basename(target);
  } catch (e) {
    report.errors.push(locale + '/' + oldSlug + ': no symlink (' + e.code + ')');
    return;
  }
  var vm = /-v(\d+)$/.exec(dirName);
  vSuffix = vm ? vm[0] : '-v1';
  var newDirName = newSlug + vSuffix;
  var oldDir = path.join(localeDir, dirName);
  var newDir = path.join(localeDir, newDirName);

  var plan = {
    locale: locale, oldSlug: oldSlug, newSlug: newSlug,
    dir: dirName + ' → ' + newDirName,
    files: [], dbCols: []
  };

  // DB collision guard
  var existing = await db.findExistingBySlug(locale, newSlug);
  if (existing && existing.id !== row.id) {
    report.collisions.push(locale + ': ' + oldSlug + ' → ' + newSlug + ' (taken by ' + existing.id + ')');
    return;
  }

  if (CONFIRM) {
    // 1. rename version dir
    if (fs.existsSync(oldDir) && !fs.existsSync(newDir)) fs.renameSync(oldDir, newDir);
    var workDir = fs.existsSync(newDir) ? newDir : oldDir;

    // 2. rename PDF asset files carrying the typo
    fs.readdirSync(workDir).forEach(function (fn) {
      if (fn.indexOf(TYPO) !== -1 && /\.(pdf)$/i.test(fn)) {
        var nf = fixTok(fn);
        if (nf !== fn && !fs.existsSync(path.join(workDir, nf))) {
          fs.renameSync(path.join(workDir, fn), path.join(workDir, nf));
          plan.files.push(fn + ' → ' + nf);
        }
      }
    });

    // 3. token-fix deck.html
    var dh = path.join(workDir, 'deck.html');
    if (fs.existsSync(dh)) {
      var html = fs.readFileSync(dh, 'utf8');
      var fixed = fixTok(html);
      if (fixed !== html) atomicWrite(dh, fixed);
    }
    // 4. token-fix manifest.json
    var mf = path.join(workDir, 'manifest.json');
    if (fs.existsSync(mf)) {
      var mtxt = fs.readFileSync(mf, 'utf8');
      var mfix = fixTok(mtxt);
      if (mfix !== mtxt) atomicWrite(mf, mfix);
    }

    // 5. symlinks: new → newDir; re-point old → newDir
    try { fs.symlinkSync(newDirName, newSymlink); } catch (e) { if (e.code !== 'EEXIST') throw e; }
    try { fs.unlinkSync(oldSymlink); } catch (e) { /* gone */ }
    try { fs.symlinkSync(newDirName, oldSymlink); } catch (e) { if (e.code !== 'EEXIST') throw e; }

    // 6. DB row
    var data = { slug: newSlug };
    ['htmlUrl', 'thumbnailUrl', 'pdfUrl', 'answerKeyUrl', 'manifestUrl'].forEach(function (c) {
      if (typeof row[c] === 'string' && row[c].indexOf(TYPO) !== -1) { data[c] = fixTok(row[c]); plan.dbCols.push(c); }
    });
    var fullRow = await db.client().deck.findUnique({ where: { id: row.id }, select: { title: true, description: true } });
    if (fullRow) {
      var nt = fixJsonValue(fullRow.title);
      var nd = fixJsonValue(fullRow.description);
      if (JSON.stringify(nt) !== JSON.stringify(fullRow.title)) { data.title = nt; plan.dbCols.push('title'); }
      if (JSON.stringify(nd) !== JSON.stringify(fullRow.description)) { data.description = nd; plan.dbCols.push('description'); }
    }
    await db.client().deck.update({ where: { id: row.id }, data: data });
  } else {
    // dry-run: just report what WOULD change
    ['htmlUrl', 'thumbnailUrl', 'pdfUrl', 'answerKeyUrl', 'manifestUrl'].forEach(function (c) {
      if (typeof row[c] === 'string' && row[c].indexOf(TYPO) !== -1) plan.dbCols.push(c);
    });
  }

  report.fixed++;
  if (report.samples.length < 6) report.samples.push(plan);
}

async function main() {
  console.log('=== fix-thanksgivinng-typo — ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + ' ===');
  var p = db.client();
  var rows = await p.deck.findMany({
    where: { status: 'published', slug: { contains: TYPO } },
    select: { id: true, language: true, slug: true, htmlUrl: true, thumbnailUrl: true, pdfUrl: true, answerKeyUrl: true, manifestUrl: true }
  });
  console.log('typo decks found: ' + rows.length);
  var report = { fixed: 0, skipNoTypo: 0, collisions: [], errors: [], samples: [] };
  for (var i = 0; i < rows.length; i++) {
    try { await fixOne(rows[i], report); }
    catch (e) { report.errors.push(rows[i].language + '/' + rows[i].slug + ': ' + e.message); }
  }
  console.log('');
  console.log((DRY_RUN ? 'would-fix' : 'fixed') + ': ' + report.fixed + '  skip-no-typo: ' + report.skipNoTypo + '  collisions: ' + report.collisions.length + '  errors: ' + report.errors.length);
  console.log('\nsample plans:');
  report.samples.forEach(function (s) {
    console.log('  [' + s.locale + '] ' + s.oldSlug + ' → ' + s.newSlug);
    console.log('     dir: ' + s.dir + '   files: ' + (s.files.length ? s.files.join('; ') : '(dry/none)') + '   dbCols: ' + s.dbCols.join(','));
  });
  if (report.collisions.length) { console.log('\nCOLLISIONS:'); report.collisions.forEach(function (c) { console.log('  - ' + c); }); }
  if (report.errors.length) { console.log('\nERRORS:'); report.errors.slice(0, 20).forEach(function (e) { console.log('  - ' + e); }); }
  await db.disconnect();
  process.exit((report.collisions.length || report.errors.length) ? 1 : 0);
}

main().catch(function (e) { console.error('FATAL: ' + e.message); if (e.stack) console.error(e.stack); process.exit(2); });
