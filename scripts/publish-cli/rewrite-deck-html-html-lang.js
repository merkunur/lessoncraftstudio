#!/usr/bin/env node
/**
 * Salvage script (audit R5 / P2-02): rewrite deck.html's `<html lang="xx">` to
 * the BCP-47 hreflang code from the SoT (pt → pt-BR; every other locale is 1:1).
 *
 * `<html lang>` is BAKED bare by the originating app at gen-time and passed
 * through untouched by publish-cli for already-published decks, so pt decks
 * shipped `<html lang="pt">` while the Next.js side uses `pt-BR`. The forward
 * fix is in substitute.js (normalizes `<html lang>` going forward); this
 * retrofits the existing decks.
 *
 * Per §15.17 salvage pattern. Atomicity per §17.8.16: temp+rename. Idempotent:
 * re-runs report skip-already-correct. Modeled on rewrite-deck-html-h1.js.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-html-lang.js --language pt --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-html-lang.js --language pt --confirm
 *
 * (Running for a locale whose code == itself, e.g. --language de, is a safe
 * no-op: every deck reports skip-already-correct.)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var hreflangCodes = require('./hreflang-codes');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var HTML_LANG_REGEX = /(<html\b[^>]*\blang=")([a-z-]+)(")/i;

function parseArgs(argv) {
  var args = { decksDir: DEFAULT_DECKS_DIR, language: null, dryRun: false, confirm: false };
  for (var i = 2; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--confirm') args.confirm = true;
    else if (a === '--language') args.language = argv[++i];
    else if (a === '--decks-dir') args.decksDir = argv[++i];
    else { console.error('Unknown arg: ' + a); process.exit(2); }
  }
  if (!args.language) { console.error('USAGE ERROR: --language is required.'); process.exit(2); }
  if (!args.dryRun && !args.confirm) { console.error('USAGE ERROR: --dry-run or --confirm required.'); process.exit(2); }
  if (args.dryRun && args.confirm) { console.error('USAGE ERROR: --dry-run and --confirm are mutually exclusive.'); process.exit(2); }
  return args;
}

function walkDecks(rootDir, language) {
  var localeDir = path.join(rootDir, language);
  if (!fs.existsSync(localeDir) || !fs.statSync(localeDir).isDirectory()) return [];
  return fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(localeDir, n);
    var stat;
    try { stat = fs.lstatSync(p); } catch (e) { return false; }
    return stat.isDirectory() && /-v\d+$/.test(n);
  }).map(function (n) { return path.join(localeDir, n); });
}

function processOne(deckDir, want, dryRun) {
  var deckHtmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(deckHtmlPath)) return { action: 'skip-no-deckhtml' };
  var html;
  try { html = fs.readFileSync(deckHtmlPath, 'utf8'); }
  catch (e) { return { action: 'skip-read-error', note: e.message }; }

  var m = html.match(HTML_LANG_REGEX);
  if (!m) return { action: 'halt-no-html-lang' };
  if (m[2] === want) return { action: 'skip-already-correct', current: m[2] };

  var newHtml = html.replace(HTML_LANG_REGEX, function (_m, pre, _code, post) { return pre + want + post; });
  if (dryRun) return { action: 'would-rewrite', old: m[2], next: want };

  var tmp = deckHtmlPath + '.tmp';
  try { fs.writeFileSync(tmp, newHtml, 'utf8'); fs.renameSync(tmp, deckHtmlPath); }
  catch (e) { try { fs.unlinkSync(tmp); } catch (_) {} return { action: 'write-error', note: e.message }; }
  return { action: 'rewritten', old: m[2], next: want };
}

function main() {
  var opts = parseArgs(process.argv);
  var want = hreflangCodes.getHreflangCode(opts.language);
  console.log('rewrite-deck-html-html-lang.js — ' + (opts.dryRun ? 'DRY-RUN' : 'REAL-MODE'));
  console.log('  language: ' + opts.language + '  →  <html lang="' + want + '">');
  console.log('');

  var deckDirs = walkDecks(opts.decksDir, opts.language);
  console.log('Found ' + deckDirs.length + ' version dirs in ' + opts.language + '.');

  var stats = { rewritten: 0, wouldRewrite: 0, skipAlreadyCorrect: 0, skipOther: 0, halts: 0 };
  var halts = [];
  deckDirs.forEach(function (deckDir) {
    var r = processOne(deckDir, want, opts.dryRun);
    if (r.action === 'rewritten') stats.rewritten++;
    else if (r.action === 'would-rewrite') stats.wouldRewrite++;
    else if (r.action === 'skip-already-correct') stats.skipAlreadyCorrect++;
    else if (r.action.indexOf('halt-') === 0) { stats.halts++; halts.push({ dir: deckDir, action: r.action }); }
    else stats.skipOther++;
  });

  console.log('');
  console.log('=== Summary ===');
  if (opts.dryRun) console.log('  would-rewrite:        ' + stats.wouldRewrite);
  else console.log('  rewritten:            ' + stats.rewritten);
  console.log('  skip-already-correct: ' + stats.skipAlreadyCorrect);
  console.log('  skip-other:           ' + stats.skipOther);
  console.log('  halts:                ' + stats.halts);
  if (halts.length > 0) {
    console.error('');
    console.error('HALT-class fires (' + halts.length + '); investigate before --confirm.');
    halts.slice(0, 10).forEach(function (h) { console.error('  ' + h.dir + '  ' + h.action); });
    process.exit(1);
  }
}

main();
