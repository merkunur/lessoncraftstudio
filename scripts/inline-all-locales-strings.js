#!/usr/bin/env node
/**
 * Bulletproof runtime i18n fix: bake the full 11-locale STRINGS table directly
 * into each app's INTERACTIVE_RUNTIME_LINES — replacing the current
 *   `var STRINGS = (DECK_BUNDLE && DECK_BUNDLE.runtimeStrings) || {english fallback};`
 * pattern.
 *
 * New shape:
 *   var STRINGS_ALL = {en:{...},de:{...},...,fi:{...}};
 *   var lang = ((DECK_BUNDLE && DECK_BUNDLE.contentLanguage) || "en").slice(0,2);
 *   var STRINGS = STRINGS_ALL[lang] || STRINGS_ALL.en;
 *   function T(k){return STRINGS[k]||STRINGS_ALL.en[k]||k}
 *
 * Strings travel with each deck.html literally — no dependency on
 * window.translations being loaded correctly at extractDeckBundle time, no
 * dependency on bundle.runtimeStrings being populated.
 *
 * Strategy:
 *   1. Parse SHARED_TRANSLATIONS from translations-shared.js (12 runtimeXxx keys × 11 locales)
 *   2. Parse runtimeTitle × 11 locales from each translations-<app>.js
 *   3. For each app HTML, extract the existing English STRINGS dict via regex
 *   4. Build STRINGS_ALL: for each English key, look up the translated value:
 *      - runtimeXxx mapping (e.g. title→runtimeTitle, checkAnswers→runtimeCheckAnswers)
 *      - if no mapping or missing, fall back to English value (acceptable per plan)
 *   5. Replace the STRINGS line with the new pattern (3 array entries instead of 1)
 *
 * Usage: node scripts/inline-all-locales-strings.js [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');
var TRANS_DIR = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS');

var LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

// Per-app English-key → shared-runtime-key mapping.
// English keys appearing in the apps' current STRINGS objects that are
// covered by translations-shared.js's runtime* set.
var SHARED_KEY_MAP = {
  title: 'runtimeTitle',                       // SPECIAL — per-app translation file
  checkAnswers: 'runtimeCheckAnswers',
  check: 'runtimeCheckAnswers',                // alias (some apps use shorter form)
  tryAgain: 'runtimeTryAgain',
  youDidIt: 'runtimeYouDidIt',
  doAnother: 'runtimeDoAnother',
  printMyWorksheet: 'runtimePrintMyWorksheet',
  mute: 'runtimeMute',
  unmute: 'runtimeUnmute',
  correct: 'runtimeCorrect',
  score: 'runtimeScore',
  allCorrect: 'runtimeAllCorrect',
  progressLabel: 'runtimeProgressLabel',
  firstTryStars: 'runtimeFirstTryStars',
};

var APPS = ['addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
  'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
  'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
  'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
  'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'];

// App → translations-<X>.js filename suffix (some apps have non-canonical
// translation filenames per historical reasons).
var TRANS_FILENAME = {
  'addition':          'addition-complete',
  'alphabet-train':    'alphabet-train-complete',
  'big-small':         'big-small',
  'bingo':             'picture-bingo',
  'chart-count':       'chart-count',
  'code-addition':     'code-addition',
  'crossword':         'crossword',
  'cryptogram':        'cryptogram',
  'find-and-count':    'find-and-count-complete',
  'find-objects':      'find-objects',
  'grid-match':        'grid-match',
  'matching':          'matchup-maker',
  'math-puzzle':       'math-puzzle',
  'math-worksheet':    'math-worksheet-final',
  'missing-pieces':    'missing-pieces',
  'more-less':         'more-less',
  'odd-one-out':       'odd-one-out',
  'pattern-train':     'pattern-train',
  'pattern-worksheet': 'pattern-worksheet',
  'picture-path':      'picture-pathway',
  'picture-sort':      'picture-sort',
  'prepositions':      'prepositions',
  'shadow-match':      'shadow-match',
  'subtraction':       'subtraction',
  'sudoku':            'sudoku',
  'treasure-hunt':     'treasure-hunt',
  'word-guess':        'word-guess',
  'word-scramble':     'word-scramble-complete',
  'wordsearch':        'wordsearch-complete',
};

// Load SHARED_TRANSLATIONS from translations-shared.js via vm.
function loadShared() {
  var src = fs.readFileSync(path.join(TRANS_DIR, 'translations-shared.js'), 'utf8');
  var sandbox = { window: {}, console: { warn: function () {} } };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  // Module exports SHARED_TRANSLATIONS as top-level const + sets window.SHARED_TRANSLATIONS
  return sandbox.window.SHARED_TRANSLATIONS;
}

// Load per-app translations file. Each sets `window.translations = translations`
// where `translations` is a local const. We extract window.translations.
function loadAppTranslations(appName) {
  var suffix = TRANS_FILENAME[appName] || appName;
  var fp = path.join(TRANS_DIR, 'translations-' + suffix + '.js');
  if (!fs.existsSync(fp)) return null;
  var src = fs.readFileSync(fp, 'utf8');
  // Translation files use one of several patterns:
  //   (a) `const FOO_TRANSLATIONS = {...}` (uppercase) without window.translations assignment
  //   (b) `const translations = {...}` (lowercase) without window.translations assignment
  //   (c) `window.translations = translations` already present
  // Detect (a) and (b) and append a window.translations exposure.
  var constMatch = /^(?:const|var|let)\s+([A-Z][A-Z0-9_]*_TRANSLATIONS|translations)\s*=\s*\{/m.exec(src);
  if (constMatch) {
    src += '\n;try{if(typeof window!=="undefined"&&!window.translations){window.translations=' + constMatch[1] + ';}}catch(e){}';
  }
  var noop = function () {};
  var sandbox = {
    window: {},
    console: { log: noop, warn: noop, error: noop, info: noop, debug: noop },
    document: { addEventListener: noop, removeEventListener: noop },
  };
  vm.createContext(sandbox);
  try {
    vm.runInContext(src, sandbox);
  } catch (e) {
    console.error('  [load] ' + appName + ': vm error: ' + e.message);
    return null;
  }
  return sandbox.window.translations || null;
}

// Parse the English STRINGS dict from the app HTML's STRINGS line.
// The line looks like (simplified):
//   '  var STRINGS = (DECK_BUNDLE && DECK_BUNDLE.runtimeStrings) || {title:"X",check:"Y",...};',
// We need to grab the {...} part, parse it as JS object, return as plain JS object.
function parseEnglishStrings(line) {
  // Find the object literal starting after the `||`
  var orIdx = line.indexOf('||');
  if (orIdx < 0) return null;
  var rest = line.slice(orIdx + 2);
  var openIdx = rest.indexOf('{');
  if (openIdx < 0) return null;
  // Walk to matching closing brace (no nesting expected but be defensive)
  var depth = 0, inStr = false, esc = false, strCh = null, closeIdx = -1;
  for (var i = openIdx; i < rest.length; i++) {
    var c = rest[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (inStr) {
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  if (closeIdx < 0) return null;
  var objText = rest.slice(openIdx, closeIdx + 1);
  // The object is a JS literal with unquoted keys. Eval in vm sandbox.
  var sandbox = {};
  vm.createContext(sandbox);
  try {
    return vm.runInContext('(' + objText + ')', sandbox);
  } catch (e) {
    return null;
  }
}

// JSON-encode a string for embedding in a JS string literal (also used as
// the content of an outer JS string literal in the INTERACTIVE_RUNTIME_LINES
// array). We need it safe for both layers.
function jsStr(s) {
  return JSON.stringify(String(s == null ? '' : s));
}

// Build the STRINGS_ALL JS literal for one app.
// englishKeys: array of {key, enValue} extracted from the source STRINGS line (preserves order)
// shared: SHARED_TRANSLATIONS object
// appTrans: per-app translations object
function buildStringsAll(englishKeys, shared, appTrans) {
  var perLocale = {};
  LOCALES.forEach(function (loc) {
    var dict = {};
    englishKeys.forEach(function (kv) {
      var key = kv.key;
      var enValue = kv.enValue;
      var sharedKey = SHARED_KEY_MAP[key];
      var translated = null;
      if (sharedKey === 'runtimeTitle') {
        // Per-app translation file
        if (appTrans && appTrans[loc] && appTrans[loc].runtimeTitle) {
          translated = appTrans[loc].runtimeTitle;
        }
      } else if (sharedKey) {
        if (shared && shared[loc] && shared[loc][sharedKey]) {
          translated = shared[loc][sharedKey];
        }
      }
      // Fallback: use English value (acceptable per plan — keys with no
      // per-locale translation render in English).
      dict[key] = translated != null ? translated : enValue;
    });
    perLocale[loc] = dict;
  });
  return perLocale;
}

// Stringify the STRINGS_ALL object back into a compact JS literal suitable
// for embedding in INTERACTIVE_RUNTIME_LINES (which is itself an array of
// string literals joined with \n at runtime). We use JSON.stringify so all
// keys + values are properly quoted (the keys then look like {"title":"X"}
// rather than {title:"X"} — JS engines accept this fine).
function stringifyStringsAll(stringsAll) {
  // Single-line JSON, no whitespace. Keys quoted.
  return JSON.stringify(stringsAll);
}

function fixApp(appName, shared, dryRun) {
  var filePath = path.join(APPS_DIR, appName + '.html');
  if (!fs.existsSync(filePath)) return { app: appName, action: 'skip-not-found' };
  var html = fs.readFileSync(filePath, 'utf8');

  // Idempotent: skip if STRINGS_ALL already present
  if (html.indexOf('var STRINGS_ALL = ') >= 0 || html.indexOf('var STRINGS_ALL={') >= 0) {
    return { app: appName, action: 'skip-already-baked' };
  }

  // Find the STRINGS line. Pattern: line containing `var STRINGS = (DECK_BUNDLE`
  var stringsLineRe = /\n([ \t]*'[ \t]*var STRINGS = \(DECK_BUNDLE && DECK_BUNDLE\.runtimeStrings\) \|\| \{[^]*?\};',?)/;
  var m = stringsLineRe.exec(html);
  if (!m) {
    return { app: appName, action: 'skip-no-strings-line' };
  }
  var fullLine = m[1];
  var lineStart = m.index + 1; // skip leading \n
  var lineEnd = lineStart + fullLine.length;

  // Parse english dict from this line
  var enDict = parseEnglishStrings(fullLine);
  if (!enDict) {
    return { app: appName, action: 'skip-parse-failed' };
  }

  // Preserve insertion order
  var englishKeys = Object.keys(enDict).map(function (k) {
    return { key: k, enValue: enDict[k] };
  });

  // Load per-app translations file
  var appTrans = loadAppTranslations(appName);
  if (!appTrans) {
    return { app: appName, action: 'skip-no-translations-file' };
  }

  // Build the full STRINGS_ALL dict
  var stringsAll = buildStringsAll(englishKeys, shared, appTrans);
  var literal = stringifyStringsAll(stringsAll);

  // Determine the leading-whitespace indent of the existing array-entry-line
  // (the leading spaces inside `'...'` are JS-runtime spaces; we keep them
  // for consistent runtime formatting).
  var leadingRe = /^([ \t]*)'(\s*)/;
  var lead = leadingRe.exec(fullLine);
  var outerIndent = lead ? lead[1] : '            ';
  var innerIndent = lead ? lead[2] : '  ';

  // Find the trailing comma vs no-comma
  var hasComma = /,\s*$/.test(fullLine);
  var trailComma = hasComma ? ',' : '';

  // Build the replacement: 3 array-entry-lines
  // 1. STRINGS_ALL = {...};
  // 2. var lang = ...; var STRINGS = STRINGS_ALL[lang] || STRINGS_ALL.en;
  // (combine to keep total entry count similar)
  // We escape single-quotes inside JS string content (none expected for JSON.stringify output, but defensive).
  var line1Content = innerIndent + 'var STRINGS_ALL = ' + literal + ';';
  var line2Content = innerIndent + 'var STRINGS = STRINGS_ALL[((DECK_BUNDLE && DECK_BUNDLE.contentLanguage) || "en").slice(0,2)] || STRINGS_ALL.en;';
  // Escape single-quotes for JS string-literal embedding
  function asEntry(content) {
    var esc = content.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return outerIndent + "'" + esc + "'" + trailComma;
  }
  var replacement = asEntry(line1Content) + '\n' + asEntry(line2Content);

  // Also locate the T() definition line which immediately follows.
  // Current shape: '  function T(k){return STRINGS[k]||k}',
  // New shape:     '  function T(k){return STRINGS[k]||STRINGS_ALL.en[k]||k}',
  var newHtml = html.slice(0, lineStart) + replacement + html.slice(lineEnd);

  // Update T() on the next applicable line in newHtml — but only INSIDE this app's
  // INTERACTIVE_RUNTIME_LINES block. We'll just do a global replace on the exact
  // current pattern. This is safe because the pattern is unique to runtime lines.
  var oldT = "function T(k){return STRINGS[k]||k}";
  var newT = "function T(k){return STRINGS[k]||STRINGS_ALL.en[k]||k}";
  if (newHtml.indexOf(oldT) >= 0) {
    newHtml = newHtml.replace(oldT, newT);
  }

  if (dryRun) {
    return {
      app: appName,
      action: 'would-fix',
      keys: englishKeys.length,
      stringsAllBytes: literal.length,
    };
  }

  fs.writeFileSync(filePath + '.tmp', newHtml, 'utf8');
  fs.renameSync(filePath + '.tmp', filePath);
  return {
    app: appName,
    action: 'fixed',
    keys: englishKeys.length,
    stringsAllBytes: literal.length,
  };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.indexOf('--dry-run') >= 0;

  console.log('inline-all-locales-strings — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));

  var shared = loadShared();
  if (!shared) {
    console.error('FATAL: could not load SHARED_TRANSLATIONS from translations-shared.js');
    process.exit(1);
  }
  // Sanity check
  var enKeys = Object.keys(shared.en || {}).filter(function (k) { return k.indexOf('runtime') === 0; });
  console.log('  shared runtime keys: ' + enKeys.length);
  console.log('  apps: ' + APPS.length);
  console.log('');

  var counts = {};
  APPS.forEach(function (a) {
    var r = fixApp(a, shared, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    var extra = r.keys ? '  // ' + r.keys + ' keys, ' + r.stringsAllBytes + ' bytes' : '';
    console.log('  ' + a.padEnd(22) + ' ' + r.action + extra);
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) { console.log('  ' + k + ': ' + counts[k]); });
}

if (require.main === module) main();
