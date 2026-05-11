#!/usr/bin/env node
/**
 * Salvage script: rewrite deck.html body `<h1 class="lcs-title" id="lcs-title">`
 * text content using manifest.seo_trace.title.typeName.value (the per-locale
 * canvas.lcsLocalizedTitle baked by the originating app at gen-time).
 *
 * Per §15.17 salvage scripts pattern. Closes the cascade defect surfaced post
 * native-language-slug commission (commit `4e6a6b70`): publish-cli's
 * `extract-html-meta.js: extract()` reads <h1> text → Deck.title field → catalog
 * UI deck-card label. 4 of 6 apps (code-addition, math-puzzle, math-worksheet,
 * more-less) emit hardcoded English literal in their <h1> ("Code Addition
 * Practice" etc.) instead of canvas.lcsLocalizedTitle. addition + subtraction
 * emit the localized form correctly.
 *
 * This script does NOT modify the DB. Caller runs `UPDATE decks SET title = ...`
 * separately after the deck.html rewrite passes verification (Phase 4 of the
 * commission plan).
 *
 * Atomicity per §15.5: temp+rename. Idempotent: re-runs report skip-already-correct.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-h1.js \
 *     --language es \
 *     --exercise-types code-addition,math-puzzle,math-worksheet,more-less \
 *     --dry-run
 *
 *   # --confirm required for real-mode (defensive)
 *
 * Cross-reference:
 * - §15.17 salvage scripts pattern (canonical predecessor: rewrite-canonical-host.js)
 * - §17.8.2 single-h1 invariant preserved (text-only change)
 * - §17.8.17 invariants unaffected (titleHash hashes <title> element, not <h1>)
 */

'use strict';

var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';

// Canonical h1 pattern across all 29 §14.10 apps (verified empirically via
// curl-spot-check 2026-05-12 across 6 wave apps). Match opening tag + body
// text + closing tag; body text is the lone capture group.
var H1_REGEX = /<h1 class="lcs-title" id="lcs-title">([^<]*)<\/h1>/;

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseArgs(argv) {
  var args = {
    decksDir: DEFAULT_DECKS_DIR,
    language: null,
    exerciseTypes: null,  // null = all
    dryRun: false,
    confirm: false
  };
  for (var i = 2; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--confirm') args.confirm = true;
    else if (a === '--language') args.language = argv[++i];
    else if (a === '--exercise-types') args.exerciseTypes = argv[++i].split(',').map(function (s) { return s.trim(); });
    else if (a === '--decks-dir') args.decksDir = argv[++i];
    else {
      console.error('Unknown arg: ' + a);
      process.exit(2);
    }
  }
  if (!args.language) {
    console.error('USAGE ERROR: --language flag is required (e.g., --language es)');
    process.exit(2);
  }
  if (!args.dryRun && !args.confirm) {
    console.error('USAGE ERROR: either --dry-run or --confirm flag required.');
    process.exit(2);
  }
  if (args.dryRun && args.confirm) {
    console.error('USAGE ERROR: --dry-run and --confirm are mutually exclusive.');
    process.exit(2);
  }
  return args;
}

function walkDecks(rootDir, opts) {
  if (!fs.existsSync(rootDir)) return [];
  var localeDir = path.join(rootDir, opts.language);
  if (!fs.existsSync(localeDir) || !fs.statSync(localeDir).isDirectory()) {
    return [];
  }
  var versionDirs = fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(localeDir, n);
    var stat;
    try { stat = fs.lstatSync(p); } catch (e) { return false; }
    return stat.isDirectory() && /-v\d+$/.test(n);
  });
  return versionDirs.map(function (n) { return path.join(localeDir, n); });
}

function processOne(deckDir, opts) {
  var manifestPath = path.join(deckDir, 'manifest.json');
  var deckHtmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(manifestPath)) return { dir: deckDir, action: 'skip-no-manifest' };
  if (!fs.existsSync(deckHtmlPath)) return { dir: deckDir, action: 'skip-no-deckhtml' };

  var manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    return { dir: deckDir, action: 'skip-bad-manifest', note: e.message };
  }

  // Filter by exercise_type if --exercise-types passed
  if (opts.exerciseTypes && opts.exerciseTypes.indexOf(manifest.exercise_type) === -1) {
    return { dir: deckDir, action: 'skip-out-of-scope', exerciseType: manifest.exercise_type };
  }

  // Read typeName from seo_trace
  var typeName = manifest.seo_trace
                 && manifest.seo_trace.title
                 && manifest.seo_trace.title.typeName
                 && manifest.seo_trace.title.typeName.value;
  if (!typeName) {
    return { dir: deckDir, action: 'halt-no-typeName-in-trace', exerciseType: manifest.exercise_type };
  }

  var html;
  try {
    html = fs.readFileSync(deckHtmlPath, 'utf8');
  } catch (e) {
    return { dir: deckDir, action: 'skip-read-error', note: e.message };
  }

  var m = html.match(H1_REGEX);
  if (!m) {
    return { dir: deckDir, action: 'halt-no-h1-match', exerciseType: manifest.exercise_type };
  }
  var currentText = m[1];
  if (currentText === typeName) {
    return { dir: deckDir, action: 'skip-already-correct', currentText: currentText };
  }

  var newHtml = html.replace(H1_REGEX, '<h1 class="lcs-title" id="lcs-title">' + escapeHtml(typeName) + '</h1>');

  if (opts.dryRun) {
    return { dir: deckDir, action: 'would-rewrite', oldText: currentText, newText: typeName, exerciseType: manifest.exercise_type };
  }

  // Atomic temp + rename
  var tmp = deckHtmlPath + '.tmp';
  try {
    fs.writeFileSync(tmp, newHtml, 'utf8');
    fs.renameSync(tmp, deckHtmlPath);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) {}
    return { dir: deckDir, action: 'write-error', note: e.message };
  }
  return { dir: deckDir, action: 'rewritten', oldText: currentText, newText: typeName, exerciseType: manifest.exercise_type };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('rewrite-deck-html-h1.js — ' + (opts.dryRun ? 'DRY-RUN' : 'REAL-MODE'));
  console.log('  decksDir:      ' + opts.decksDir);
  console.log('  language:      ' + opts.language);
  console.log('  exerciseTypes: ' + (opts.exerciseTypes ? opts.exerciseTypes.join(',') : '(all)'));
  console.log('');

  var deckDirs = walkDecks(opts.decksDir, opts);
  console.log('Found ' + deckDirs.length + ' version dirs in ' + opts.language + ' locale.');
  console.log('');

  var stats = {
    rewritten: 0,
    wouldRewrite: 0,
    skipAlreadyCorrect: 0,
    skipOutOfScope: 0,
    skipOther: 0,
    halts: 0
  };
  var halts = [];
  var rewrites = [];

  deckDirs.forEach(function (deckDir) {
    var r = processOne(deckDir, opts);
    if (r.action === 'rewritten') {
      stats.rewritten++;
      rewrites.push(r);
    } else if (r.action === 'would-rewrite') {
      stats.wouldRewrite++;
      rewrites.push(r);
    } else if (r.action === 'skip-already-correct') {
      stats.skipAlreadyCorrect++;
    } else if (r.action === 'skip-out-of-scope') {
      stats.skipOutOfScope++;
    } else if (r.action.indexOf('halt-') === 0) {
      stats.halts++;
      halts.push(r);
    } else {
      stats.skipOther++;
    }
  });

  // Per-app rewrite breakdown
  var perApp = {};
  rewrites.forEach(function (r) {
    if (!perApp[r.exerciseType]) perApp[r.exerciseType] = { count: 0, sample: null };
    perApp[r.exerciseType].count++;
    if (!perApp[r.exerciseType].sample) perApp[r.exerciseType].sample = r;
  });

  console.log('=== Per-app rewrite breakdown ===');
  Object.keys(perApp).sort().forEach(function (app) {
    var p = perApp[app];
    console.log('  ' + app + ': ' + p.count + ' decks');
    console.log('    sample: "' + p.sample.oldText + '" → "' + p.sample.newText + '"');
  });

  if (halts.length > 0) {
    console.log('');
    console.log('=== HALTS (' + halts.length + ') ===');
    halts.slice(0, 10).forEach(function (h) {
      console.log('  ' + h.dir + '  ' + h.action);
    });
    if (halts.length > 10) console.log('  ... (' + (halts.length - 10) + ' more)');
  }

  console.log('');
  console.log('=== Summary ===');
  if (opts.dryRun) {
    console.log('  would-rewrite:         ' + stats.wouldRewrite);
  } else {
    console.log('  rewritten:             ' + stats.rewritten);
  }
  console.log('  skip-already-correct:  ' + stats.skipAlreadyCorrect);
  console.log('  skip-out-of-scope:     ' + stats.skipOutOfScope);
  console.log('  skip-other:            ' + stats.skipOther);
  console.log('  halts:                 ' + stats.halts);

  if (stats.halts > 0) {
    console.error('');
    console.error('HALT-class fires; investigate before --confirm.');
    process.exit(1);
  }
}

main();
