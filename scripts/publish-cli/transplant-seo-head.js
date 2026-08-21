/**
 * transplant-seo-head.js — SEO-head byte-stability for the 2026-08 deck
 * REPLACEMENT wave (treasure-hunt / find-and-count / prepositions regens).
 *
 * When a published deck is replaced via `publish --update-slug` (bulk
 * `--updates-manifest`), the new deck.html's SEO head is re-derived from the
 * fresh manifest — which regresses the evolved live <title>/<meta description>
 * (title-overhaul + rekey generations) and re-points the canonical back at the
 * deck URL even where the live deck had been repointed to its /worksheets/
 * landing. Under the §21.5a churn freeze the live head must stay byte-stable.
 *
 * This script restores stability by TRANSPLANTING, per replaced deck, the OLD
 * version dir's SEO region into the NEW version dir's deck.html:
 *   - the <!-- SEO_INSERTION_POINT_START --> … <!-- SEO_INSERTION_POINT_END -->
 *     region (title, meta description, canonical, robots, JSON-LD, og + twitter tags)
 *     is copied verbatim from old deck.html to new deck.html;
 *   - the <!--LCS_BC_START-->…<!--LCS_BC_END--> breadcrumb block (whose
 *     position-3 name is the page title) is copied too when the old file has
 *     one, else the new block's name is patched to the old title;
 *   - Deck.titleHash / Deck.descriptionHash are recomputed from the
 *     transplanted (old) rendered strings and written back, so DB hashes match
 *     the rendered head again (§17.8.18).
 *
 * Deliberately NOT transplanted: body content (the whole point of the
 * replacement), alt-text/chrome/embed/analytics retrofit blocks (publish-wave
 * re-applies those to the new file), and any deck excluded from the map (the
 * theme-polluted TH en/es/pt sets keep their regenerated theme-true heads).
 *
 * Usage (Hetzner, from frontend/ with .env.production sourced):
 *   node ../scripts/publish-cli/transplant-seo-head.js \
 *     --locale=<loc> --map=<file> --old-links=<file> [--decks-root=DIR] \
 *     (--dry-run | --confirm)
 *
 *   --map        TSV: slug \t old_title_hash \t old_desc_hash  (snapshot values,
 *                used for drift REPORTING only — the write uses recomputed
 *                hashes of the transplanted strings).
 *   --old-links  TSV: slug \t old_version_dirname  (recorded via readlink
 *                BEFORE the wave ran; the old dir must still exist —
 *                KEEP_VERSIONS=3 retains it).
 *
 * Atomic per file (temp + rename). Idempotent: re-running re-splices the same
 * old region. Poison-tested: refuses files whose markers are missing/duplicated.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');
var seoRecon = require('./seo-reconciliation');

var START = '<!-- SEO_INSERTION_POINT_START -->';
var END = '<!-- SEO_INSERTION_POINT_END -->';
var BC_START = '<!--LCS_BC_START-->';
var BC_END = '<!--LCS_BC_END-->';

function parseArgs(argv) {
  var out = { decksRoot: '/var/www/lcs-media/decks', dryRun: false, confirm: false };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locale=') === 0) out.locale = a.slice(9);
    else if (a.indexOf('--map=') === 0) out.map = a.slice(6);
    else if (a.indexOf('--old-links=') === 0) out.oldLinks = a.slice(12);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
    else { console.error('unknown arg: ' + a); process.exit(2); }
  });
  if (!out.locale || !out.map || !out.oldLinks || (!out.dryRun && !out.confirm)) {
    console.error('USAGE: --locale=<loc> --map=<tsv> --old-links=<tsv> (--dry-run|--confirm)');
    process.exit(2);
  }
  return out;
}

function readTsv(file, ncols) {
  return fs.readFileSync(file, 'utf8').split('\n').map(function (l) {
    return l.replace(/\r$/, '');
  }).filter(Boolean).map(function (l) {
    var p = l.split('\t');
    if (p.length < ncols) throw new Error('bad TSV line in ' + file + ': ' + l);
    return p;
  });
}

// Extract the single marker-delimited region (inclusive). Throws unless the
// file contains exactly one START and one END, in order.
function extractRegion(html, startMark, endMark, label, file) {
  var s = html.indexOf(startMark);
  var e = html.indexOf(endMark);
  if (s === -1 || e === -1 || e < s) throw new Error(label + ' markers missing/misordered in ' + file);
  if (html.indexOf(startMark, s + 1) !== -1 || html.indexOf(endMark, e + 1) !== -1) {
    throw new Error(label + ' markers duplicated in ' + file);
  }
  return { start: s, end: e + endMark.length, text: html.slice(s, e + endMark.length) };
}

function textBetween(html, open, close) {
  var s = html.indexOf(open);
  if (s === -1) return null;
  var e = html.indexOf(close, s + open.length);
  if (e === -1) return null;
  return html.slice(s + open.length, e);
}

function metaContent(html, nameAttr) {
  var re = new RegExp('<meta\\s+name="' + nameAttr + '"\\s+content="([^"]*)"', 'i');
  var m = html.match(re);
  return m ? m[1] : null;
}

function atomicWrite(file, content) {
  var tmp = file + '.transplant-tmp';
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}

async function main() {
  var args = parseArgs(process.argv);
  var mapRows = readTsv(args.map, 3);
  var oldRows = readTsv(args.oldLinks, 2);
  var oldDirBySlug = {};
  oldRows.forEach(function (r) { oldDirBySlug[r[0]] = r[1]; });

  var stats = { done: 0, skipped: 0, hashDrift: 0, errors: [] };

  for (var i = 0; i < mapRows.length; i++) {
    var slug = mapRows[i][0];
    var snapTh = mapRows[i][1];
    var snapDh = mapRows[i][2];
    try {
      var localeDir = path.join(args.decksRoot, args.locale);
      var link = path.join(localeDir, slug);
      var newDirName = fs.readlinkSync(link);
      var oldDirName = oldDirBySlug[slug];
      if (!oldDirName) throw new Error('no old-links entry');
      if (newDirName === oldDirName) {
        // deck was not actually replaced (per-deck publish failure) — leave it
        stats.skipped++; console.log('SKIP (not replaced): ' + slug); continue;
      }
      var oldHtmlPath = path.join(localeDir, oldDirName, 'deck.html');
      var newHtmlPath = path.join(localeDir, newDirName, 'deck.html');
      var oldHtml = fs.readFileSync(oldHtmlPath, 'utf8');
      var newHtml = fs.readFileSync(newHtmlPath, 'utf8');

      var oldRegion = extractRegion(oldHtml, START, END, 'SEO', oldHtmlPath);
      var newRegion = extractRegion(newHtml, START, END, 'SEO', newHtmlPath);
      var out = newHtml.slice(0, newRegion.start) + oldRegion.text + newHtml.slice(newRegion.end);

      // Breadcrumb block coherence (position-3 name = page title).
      var oldBcHas = oldHtml.indexOf(BC_START) !== -1;
      var newBcHas = out.indexOf(BC_START) !== -1;
      if (oldBcHas && newBcHas) {
        var oldBc = extractRegion(oldHtml, BC_START, BC_END, 'BC', oldHtmlPath);
        var newBc = extractRegion(out, BC_START, BC_END, 'BC', newHtmlPath);
        out = out.slice(0, newBc.start) + oldBc.text + out.slice(newBc.end);
      } else if (newBcHas) {
        var oldTitleForBc = textBetween(oldRegion.text, '<title>', '</title>');
        if (oldTitleForBc) {
          var bc = extractRegion(out, BC_START, BC_END, 'BC', newHtmlPath);
          // last ListItem's name is the page title; replace its value.
          var patched = bc.text.replace(/("position":3,"name":")((?:[^"\\]|\\.)*)(")/,
            function (_m, a, _b, c) { return a + oldTitleForBc.replace(/"/g, '\\"') + c; });
          out = out.slice(0, bc.start) + patched + out.slice(bc.end);
        }
      }

      var renderedTitle = textBetween(out, '<title>', '</title>');
      var renderedDesc = metaContent(out, 'description');
      if (!renderedTitle) throw new Error('no <title> after transplant');
      var newTh = seoRecon.hashTitleOrDescription(renderedTitle);
      var newDh = seoRecon.hashTitleOrDescription(renderedDesc);
      if (newTh !== snapTh || newDh !== snapDh) {
        stats.hashDrift++;
        console.log('HASH-DRIFT (pre-existing, using recomputed): ' + slug);
      }

      if (args.confirm) {
        atomicWrite(newHtmlPath, out);
        await db.client().deck.update({
          where: { language_slug: { language: args.locale, slug: slug } },
          data: { titleHash: newTh, descriptionHash: newDh }
        });
      }
      stats.done++;
      if ((i + 1) % 50 === 0) console.log('  ' + (i + 1) + '/' + mapRows.length);
    } catch (e) {
      stats.errors.push(slug + ': ' + e.message);
    }
  }

  console.log('\n=== transplant ' + args.locale + (args.confirm ? '' : ' (DRY-RUN)') + ' ===');
  console.log('done: ' + stats.done + '  skipped: ' + stats.skipped +
    '  hash-drift(reported): ' + stats.hashDrift + '  errors: ' + stats.errors.length);
  stats.errors.forEach(function (e) { console.log('  ERROR ' + e); });
  await db.disconnect();
  process.exit(stats.errors.length ? 1 : 0);
}

main().catch(function (e) { console.error(e); process.exit(1); });
