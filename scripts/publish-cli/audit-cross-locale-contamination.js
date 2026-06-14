#!/usr/bin/env node
/*
 * audit-cross-locale-contamination.js — READ-ONLY detection of published decks
 * whose CONTENT language ≠ the locale they are served under (the path-locale).
 * GSC surfaced wrong-language pages (e.g. a Swedish-content deck at /es/decks/...),
 * which confuse Google's per-language indexing + emit wrong hreflang/dup signals.
 *
 * Ground-truth for a deck's content language (deterministic, not fuzzy):
 *   - manifest.language  (set at publish from the source ZIP, immutable §4.2)
 *   - deck.html <html lang="..">  (the SEO contract §17.8.1)
 * Path-locale = Deck.language (the deck lives at /<Deck.language>/decks/<slug>/).
 *
 * Per published Deck row it flags:
 *   HARD  CONTENT_LANGUAGE_MISMATCH — Deck.language ≠ manifest.language
 *                                     (or ≠ deck.html <html lang>); the page is
 *                                     mis-located under the wrong locale path.
 *   INFO  HTML_LANG_VS_MANIFEST_DIFF — manifest.language ≠ html lang (internal
 *                                     inconsistency even when both differ from path).
 *   INFO  SLUG_LANGUAGE_SUSPECT      — the slug's distinctive theme/type tokens
 *                                     classify to a locale ≠ Deck.language (a
 *                                     corroborating, lexicon-based signal; ASCII-
 *                                     folded slugs carry no diacritic signal, so
 *                                     this uses per-locale UNIQUE taxonomy tokens;
 *                                     ambiguous tokens are excluded → low FP).
 *   INFO  MANIFEST_UNREADABLE / DECK_HTML_UNREADABLE / SYMLINK_UNRESOLVED
 *
 * Output: docs/audit-results/cross-locale-contamination-<UTC>.{json,md} with a
 * [path-locale × content-language] count matrix + per-cohort examples.
 *
 * Usage (on Hetzner, env loaded):
 *   cd frontend && set -a && source .env.production && set +a && cd ..
 *   node scripts/publish-cli/audit-cross-locale-contamination.js \
 *     [--locales=en,de,es,fr,it,pt,nl,sv,da,no,fi] \
 *     [--decks-root=/var/www/lcs-media/decks] [--out-dir=docs/audit-results] [--sample=N]
 *
 * READ-ONLY: no DB writes, no FS mutation except the JSON+md report under --out-dir.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');

var ALL_LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function parseArgs(argv) {
  var out = {
    locales: ALL_LOCALES.slice(),
    decksRoot: '/var/www/lcs-media/decks',
    outDir: path.resolve('docs/audit-results'),
    sample: null,
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice(10));
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help') { console.log('Usage: node audit-cross-locale-contamination.js [--locales=] [--decks-root=] [--out-dir=] [--sample=N]'); process.exit(0); }
  });
  return out;
}

function utcStamp() {
  // Avoid argless new Date() restrictions in some sandboxes? This runs under node
  // on Hetzner (not the workflow VM); Date is available here.
  var d = new Date();
  return d.toISOString().replace(/[:.]/g, '-');
}

function norm(lang) {
  if (!lang) return null;
  return String(lang).toLowerCase().split('-')[0].trim() || null;
}

/* ---- distinctive per-locale slug-token lexicon (built from taxonomy) ---- */
// Build, per locale, the set of slug tokens that are UNIQUE to that locale across
// axes.theme + axes.exercise-type + axes.exercise-mode. A token shared by >1 locale
// (sudoku, addition, bingo, normal, …) is ambiguous and excluded. The remaining
// tokens (djur/tiere/animales/dyr/dieren, weihnachten/navidad/jul, …) fingerprint
// the slug's language. Corroborating INFO signal only.
function buildLexicon() {
  var taxPath = path.resolve('frontend/config/topics-taxonomy.json');
  var tax;
  try { tax = JSON.parse(fs.readFileSync(taxPath, 'utf8')); } catch (e) { return { perLocale: {}, error: e.message }; }
  var axes = tax.axes || {};
  var wanted = ['theme', 'exercise-type', 'exercise-mode'];
  // token -> Set(locales)
  var tokenLocales = {};
  // locale -> raw token set
  var localeTokens = {};
  ALL_LOCALES.forEach(function (l) { localeTokens[l] = {}; });
  wanted.forEach(function (axisName) {
    var axis = axes[axisName];
    if (!axis) return;
    Object.keys(axis).forEach(function (key) {
      var slugMap = (axis[key] && axis[key].slug) || {};
      ALL_LOCALES.forEach(function (loc) {
        var s = slugMap[loc];
        if (!s) return;
        // split the axis-key slug into atomic tokens (skip pure numbers)
        String(s).split('-').forEach(function (tok) {
          if (!tok || /^[0-9]+$/.test(tok) || tok.length < 3) return;
          (tokenLocales[tok] = tokenLocales[tok] || {})[loc] = true;
          localeTokens[loc][tok] = true;
        });
      });
    });
  });
  // distinctive = tokens whose tokenLocales set is exactly {thisLocale}
  var perLocale = {};
  ALL_LOCALES.forEach(function (loc) {
    var set = {};
    Object.keys(localeTokens[loc]).forEach(function (tok) {
      var locs = Object.keys(tokenLocales[tok]);
      if (locs.length === 1 && locs[0] === loc) set[tok] = true;
    });
    perLocale[loc] = set;
  });
  return { perLocale: perLocale };
}

// classify a slug's language by distinctive-token votes; null if no/ambiguous signal
function classifySlug(slugStr, lex) {
  var votes = {};
  String(slugStr).split('-').forEach(function (tok) {
    if (!tok || tok.length < 3) return;
    ALL_LOCALES.forEach(function (loc) {
      if (lex.perLocale[loc] && lex.perLocale[loc][tok]) votes[loc] = (votes[loc] || 0) + 1;
    });
  });
  var locs = Object.keys(votes);
  if (!locs.length) return null;
  locs.sort(function (a, b) { return votes[b] - votes[a]; });
  // require a clear single winner (no tie) to avoid false positives
  if (locs.length > 1 && votes[locs[0]] === votes[locs[1]]) return null;
  return { locale: locs[0], votes: votes[locs[0]] };
}

/* ---- per-deck read-only inspection ---- */
function inspectDeck(row, decksRoot, lex) {
  var pathLocale = row.language;
  var dbSlug = row.slug;
  var hard = [];
  var info = [];
  var contentLang = null;     // resolved best content-language
  var manifestLang = null;
  var htmlLang = null;

  var symlinkPath = path.join(decksRoot, pathLocale, dbSlug);
  var resolvedDir = null;
  try { resolvedDir = fs.realpathSync(symlinkPath); } catch (e) { info.push({ code: 'SYMLINK_UNRESOLVED', detail: symlinkPath + ' (' + e.code + ')' }); }

  if (resolvedDir) {
    // manifest.language
    try {
      var m = JSON.parse(fs.readFileSync(path.join(resolvedDir, 'manifest.json'), 'utf8'));
      manifestLang = norm(m.language || (m.generation && m.generation.language) || m.content_language || (m.generator && m.generator.language));
    } catch (e) { info.push({ code: 'MANIFEST_UNREADABLE', detail: e.message }); }
    // deck.html <html lang>
    try {
      var head = fs.readFileSync(path.join(resolvedDir, 'deck.html'), 'utf8').slice(0, 800);
      var mm = head.match(/<html[^>]*\blang=["']([a-zA-Z-]+)["']/);
      if (mm) htmlLang = norm(mm[1]);
    } catch (e) { info.push({ code: 'DECK_HTML_UNREADABLE', detail: e.message }); }
  }

  contentLang = manifestLang || htmlLang || null;

  // PRIMARY: path-locale vs content language
  if (contentLang && contentLang !== norm(pathLocale)) {
    hard.push({ code: 'CONTENT_LANGUAGE_MISMATCH', detail: 'path=' + pathLocale + ' manifest=' + (manifestLang || '∅') + ' html=' + (htmlLang || '∅') });
  }
  // INFO: manifest vs html disagree
  if (manifestLang && htmlLang && manifestLang !== htmlLang) {
    info.push({ code: 'HTML_LANG_VS_MANIFEST_DIFF', detail: 'manifest=' + manifestLang + ' html=' + htmlLang });
  }
  // INFO: slug-token classification corroboration
  var cls = classifySlug(dbSlug, lex);
  if (cls && cls.locale !== norm(pathLocale)) {
    info.push({ code: 'SLUG_LANGUAGE_SUSPECT', detail: 'slug→' + cls.locale + ' (votes=' + cls.votes + ') path=' + pathLocale });
  }

  return { hard: hard, info: info, pathLocale: norm(pathLocale), contentLang: contentLang };
}

async function main() {
  var args = parseArgs(process.argv);
  if (!fs.existsSync(args.outDir)) fs.mkdirSync(args.outDir, { recursive: true });
  var stamp = utcStamp();
  console.log('=== audit-cross-locale-contamination — ' + stamp + ' ===');
  console.log('locales=' + args.locales.join(',') + '  decks-root=' + args.decksRoot + (args.sample ? '  sample=' + args.sample : ''));

  var lex = buildLexicon();
  if (lex.error) console.log('WARN: lexicon build failed (' + lex.error + ') — slug-classifier disabled');
  else console.log('lexicon: ' + args.locales.map(function (l) { return l + '=' + Object.keys(lex.perLocale[l] || {}).length; }).join(' '));

  var p = db.client();
  var matrix = {};        // pathLocale -> contentLang -> count
  var perLocale = {};
  var hardExamples = [];
  var infoCodeTotals = {};
  var hardCodeTotals = {};
  var grandDecks = 0;

  function bump(a, b) { (matrix[a] = matrix[a] || {})[b] = (matrix[a][b] || 0) + 1; }

  for (var li = 0; li < args.locales.length; li++) {
    var locale = args.locales[li];
    var rows = await p.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { id: true, slug: true, language: true, htmlUrl: true, manifestUrl: true },
    });
    if (args.sample) rows = rows.slice(0, args.sample);
    var lc = { decks: rows.length, hard: 0, info: 0, mismatchDecks: 0 };
    for (var i = 0; i < rows.length; i++) {
      var res = inspectDeck(rows[i], args.decksRoot, lex);
      bump(res.pathLocale, res.contentLang || 'unknown');
      if (res.hard.length) {
        lc.mismatchDecks++;
        lc.hard += res.hard.length;
        res.hard.forEach(function (d) {
          hardCodeTotals[d.code] = (hardCodeTotals[d.code] || 0) + 1;
          if (hardExamples.length < 3000) hardExamples.push({ locale: locale, slug: rows[i].slug, id: rows[i].id, htmlUrl: rows[i].htmlUrl, code: d.code, detail: d.detail });
        });
      }
      if (res.info.length) {
        lc.info += res.info.length;
        res.info.forEach(function (d) { infoCodeTotals[d.code] = (infoCodeTotals[d.code] || 0) + 1; });
      }
    }
    perLocale[locale] = lc;
    grandDecks += lc.decks;
    console.log('[' + locale + '] ' + lc.decks + ' decks | MISMATCH=' + lc.hard + ' (on ' + lc.mismatchDecks + ' decks) | info=' + lc.info);
  }

  var report = {
    generatedAt: stamp,
    decksRoot: args.decksRoot,
    locales: args.locales,
    totals: { decks: grandDecks, hardCodeTotals: hardCodeTotals, infoCodeTotals: infoCodeTotals },
    matrix: matrix,
    perLocale: perLocale,
    contaminationExamples: hardExamples,
  };
  var jsonPath = path.join(args.outDir, 'cross-locale-contamination-' + stamp + '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  // markdown
  var md = [];
  md.push('# Cross-locale contamination audit — ' + stamp);
  md.push('');
  md.push('Decks: **' + grandDecks + '** · CONTENT_LANGUAGE_MISMATCH (hard): **' + (hardCodeTotals.CONTENT_LANGUAGE_MISMATCH || 0) + '**');
  md.push('');
  md.push('## [path-locale × content-language] matrix (off-diagonal = contamination)');
  md.push('');
  var contentCols = {};
  Object.keys(matrix).forEach(function (pl) { Object.keys(matrix[pl]).forEach(function (cl) { contentCols[cl] = true; }); });
  var cols = Object.keys(contentCols).sort();
  md.push('| path ↓ / content → | ' + cols.join(' | ') + ' |');
  md.push('|' + Array(cols.length + 2).join('---|'));
  args.locales.forEach(function (pl) {
    if (!matrix[pl]) return;
    var cells = cols.map(function (cl) {
      var n = matrix[pl][cl] || 0;
      if (!n) return '';
      return (pl === cl) ? String(n) : '**' + n + '**';
    });
    md.push('| ' + pl + ' | ' + cells.join(' | ') + ' |');
  });
  md.push('');
  md.push('## Totals');
  md.push('- HARD: ' + JSON.stringify(hardCodeTotals));
  md.push('- INFO: ' + JSON.stringify(infoCodeTotals));
  md.push('');
  md.push('## Contamination examples (first 50)');
  md.push('');
  if (!hardExamples.length) md.push('None — every published deck\'s content language matches its path locale.');
  else {
    md.push('| path | slug | detail | htmlUrl |');
    md.push('|---|---|---|---|');
    hardExamples.slice(0, 50).forEach(function (e) {
      md.push('| ' + e.locale + ' | `' + e.slug + '` | ' + e.detail + ' | ' + (e.htmlUrl || '') + ' |');
    });
  }
  var mdPath = path.join(args.outDir, 'cross-locale-contamination-' + stamp + '.md');
  fs.writeFileSync(mdPath, md.join('\n'));

  console.log('\nReport: ' + jsonPath);
  console.log('Report: ' + mdPath);
  console.log('CONTENT_LANGUAGE_MISMATCH total: ' + (hardCodeTotals.CONTENT_LANGUAGE_MISMATCH || 0));

  await p.$disconnect();
}

main().catch(function (e) { console.error(e); process.exit(1); });
