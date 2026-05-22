#!/usr/bin/env node
/* =====================================================================
   build-recording-manifest.js
   ---------------------------------------------------------------------
   Generates the per-language recording manifest for the K-3 activity
   audio layer. One CSV per locale + a combined CSV under the output
   directory; the operator imports them into Excel/Sheets as tabs.

   Sources (read-only):
     - scripts/v2-data/verify-syllable-boundaries/output/approved-words-<locale>.json
         → word + syllable rows (es/fi/pt/sv)
     - mini tools/<engine>-activities.json
         → activity context + per-activity word lists
     - mini tools/<engine>-activity.js
         → i18n prompt template strings (ACTIVITY_STRINGS / SHAPE_LABELS)

   Output: docs/audio/recording-manifest-<utc-date>/
     - 00-rules.md
     - <locale>.csv  (11 files)
     - _combined.csv

   ZERO mutation of any source file. Re-runnable; replaces output dir.
   Per CLAUDE.md §A.3, no audio bytes are produced or committed.
   ===================================================================== */
'use strict';

var fs   = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..', '..');
var APPROVED_DIR = path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output');
var MINI_DIR     = path.join(ROOT, 'mini tools');

var LOCALES = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];

/* ---- slug-fold (mirrors mini tools/lcs-shell.js LCSAudio.slugify
   which mirrors scripts/publish-cli/slug.js §17.8.5 ASCII-fold). */
var FOLD = {
  'ä':'a','ö':'o','ü':'u','ß':'ss','å':'a','æ':'ae','ø':'o',
  'ñ':'n','ç':'c',
  'à':'a','á':'a','â':'a','ã':'a',
  'è':'e','é':'e','ê':'e','ë':'e',
  'ì':'i','í':'i','î':'i','ï':'i',
  'ò':'o','ó':'o','ô':'o','õ':'o',
  'ù':'u','ú':'u','û':'u',
  'ý':'y','ÿ':'y',
  'ł':'l','ð':'d','þ':'th'
};
function slugify(value) {
  var str = String(value == null ? '' : value).toLowerCase();
  try { str = str.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  catch (_) {}
  var out = '';
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    out += (Object.prototype.hasOwnProperty.call(FOLD, c) ? FOLD[c] : c);
  }
  return out
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ---- Parse a JS-source localized-string table.
   The activity-js files declare ACTIVITY_STRINGS as a JS object literal.
   We extract the entries via regex over the textual content. This is a
   one-way read; we do not mutate the JS files. */
function parseLocalizedTable(jsText, varName) {
  var out = {};
  /* Find `var <varName> = { ... };` block. */
  var startMarker = 'var ' + varName + ' =';
  var startIdx = jsText.indexOf(startMarker);
  if (startIdx < 0) return out;
  /* Walk braces to find the matching close. */
  var depth = 0, i = startIdx + startMarker.length, blockStart = -1, blockEnd = -1;
  for (; i < jsText.length; i++) {
    var ch = jsText.charAt(i);
    if (ch === '{') { if (depth === 0) blockStart = i; depth++; }
    else if (ch === '}') { depth--; if (depth === 0) { blockEnd = i; break; } }
  }
  if (blockStart < 0 || blockEnd < 0) return out;
  var block = jsText.slice(blockStart + 1, blockEnd);

  /* Each top-level key opens its own nested block. Find them. */
  var keyRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*\{/gm;
  var m;
  while ((m = keyRe.exec(block)) !== null) {
    var key = m[1];
    var nestStart = m.index + m[0].length;
    var nestDepth = 1, j = nestStart, nestEnd = -1;
    for (; j < block.length; j++) {
      var c2 = block.charAt(j);
      if (c2 === '{') nestDepth++;
      else if (c2 === '}') { nestDepth--; if (nestDepth === 0) { nestEnd = j; break; } }
    }
    if (nestEnd < 0) continue;
    var entryBlock = block.slice(nestStart, nestEnd);
    var localeRe = /([A-Za-z]{2})\s*:\s*(['"])((?:[^\\]|\\.)*?)\2/g;
    var lm;
    var perLocale = {};
    while ((lm = localeRe.exec(entryBlock)) !== null) {
      var loc = lm[1].toLowerCase();
      if (LOCALES.indexOf(loc) === -1) continue;
      /* Unescape \\ \\' \\" */
      var val = lm[3].replace(/\\(['"\\])/g, '$1');
      perLocale[loc] = val;
    }
    out[key] = perLocale;
  }
  return out;
}

function interpolate(template, args) {
  if (!template) return '';
  args = args || {};
  return String(template).replace(/\{(\w+)\}/g, function (m, k) {
    return (k in args) ? String(args[k]) : m;
  });
}

/* ---- Load activity JS string tables ------------------------------- */
function readFile(p) { return fs.readFileSync(p, 'utf8'); }
function readJson(p) { return JSON.parse(readFile(p)); }

var tenFrameJs       = readFile(path.join(MINI_DIR, 'ten-frame-activity.js'));
var choiceBoardJs    = readFile(path.join(MINI_DIR, 'choice-board-activity.js'));
var cvcBuilderJs     = readFile(path.join(MINI_DIR, 'cvc-builder-activity.js'));
var syllableJs       = readFile(path.join(MINI_DIR, 'syllable-builder-activity.js'));

var TEN_FRAME_STR    = parseLocalizedTable(tenFrameJs,    'ACTIVITY_STRINGS');
var CHOICE_BOARD_STR = parseLocalizedTable(choiceBoardJs, 'ACTIVITY_STRINGS');
var SHAPE_LABELS     = parseLocalizedTable(choiceBoardJs, 'SHAPE_LABELS');
var CVC_STR          = parseLocalizedTable(cvcBuilderJs,  'CVC_ACTIVITY_STRINGS');
var SYLLABLE_STR     = parseLocalizedTable(syllableJs,    'SYLLABLE_ACTIVITY_STRINGS');

/* ---- Load activity manifests -------------------------------------- */
var tenFrameActs   = readJson(path.join(MINI_DIR, 'ten-frame-activities.json'));
var choiceBoardActs= readJson(path.join(MINI_DIR, 'choice-board-activities.json'));
var cvcActs        = readJson(path.join(MINI_DIR, 'cvc-builder-activities.json'));
var syllableActs   = readJson(path.join(MINI_DIR, 'syllable-builder-activities.json'));

/* ---- Row accumulator: dedup by (locale, type, text) ---------------- */
function makeBucket() {
  var seen = Object.create(null);
  var rows = [];
  function add(locale, type, text, usedIn) {
    if (!text || !type) return;
    text = String(text).trim();
    if (!text) return;
    var slug = slugify(text);
    if (!slug) return;
    var k = locale + '|' + type + '|' + slug;
    if (seen[k]) {
      if (usedIn && seen[k].usedIn.indexOf(usedIn) === -1) seen[k].usedIn.push(usedIn);
      return;
    }
    var row = {
      locale: locale,
      type: type,
      text: text,
      slug: slug,
      filepath: '/audio/' + locale + '/' + type + '/' + slug + '.mp3',
      usedIn: usedIn ? [usedIn] : []
    };
    seen[k] = row;
    rows.push(row);
  }
  return { add: add, rows: rows };
}

var bucket = makeBucket();

/* ---- TEN-FRAME: rendered prompts per (locale, target) ------------- */
tenFrameActs.forEach(function (a) {
  var key = a.kid_prompt_template;
  if (!key) return;
  var tmpl = TEN_FRAME_STR[key];
  if (!tmpl) return;
  var targets = (a.params && Array.isArray(a.params.targets)) ? a.params.targets : [];
  var usedIn = 'ten-frame:' + a.id;
  LOCALES.forEach(function (loc) {
    var t = tmpl[loc] || tmpl.en;
    if (!t) return;
    if (/\{n\}/.test(t)) {
      targets.forEach(function (n) {
        bucket.add(loc, 'ui', interpolate(t, { n: n }), usedIn);
      });
    } else {
      bucket.add(loc, 'ui', t, usedIn);
    }
  });
});

/* ---- CHOICE-BOARD: rendered prompts ------------------------------- */
choiceBoardActs.forEach(function (a) {
  var key = a.kid_prompt_template;
  if (!key) return;
  var tmpl = CHOICE_BOARD_STR[key];
  if (!tmpl) return;
  var usedIn = 'choice-board:' + a.id;
  LOCALES.forEach(function (loc) {
    var t = tmpl[loc] || tmpl.en;
    if (!t) return;
    if (/\{shape\}/.test(t)) {
      Object.keys(SHAPE_LABELS).forEach(function (shapeKey) {
        var shapeLabel = SHAPE_LABELS[shapeKey][loc] || SHAPE_LABELS[shapeKey].en;
        if (!shapeLabel) return;
        bucket.add(loc, 'ui', interpolate(t, { shape: shapeLabel }), usedIn);
      });
    } else {
      bucket.add(loc, 'ui', t, usedIn);
    }
  });
});

/* ---- CVC-BUILDER: EN-only prompt + 6 hardcoded EN words ----------- */
cvcActs.forEach(function (a) {
  var key = a.kid_prompt_template;
  var usedIn = 'cvc-builder:' + a.id;
  if (key && CVC_STR[key]) {
    LOCALES.forEach(function (loc) {
      var t = CVC_STR[key][loc] || CVC_STR[key].en;
      if (t) bucket.add(loc, 'ui', t, usedIn);
    });
  }
  var words = (a.params && Array.isArray(a.params.words)) ? a.params.words : [];
  var lang  = (a.params && a.params.language) ? String(a.params.language).split('-')[0].toLowerCase() : 'en';
  words.forEach(function (w) {
    var word = w.targetWord || w.label;
    if (!word) return;
    bucket.add(lang, 'word', word, usedIn);
    /* CVC = 3 letters; each letter is its own discrete unit
       (the engine plays them as letter-name TTS on tile tap). */
    String(word).split('').forEach(function (ch) {
      if (/[a-zA-Z]/.test(ch)) bucket.add(lang, 'syllable', ch.toLowerCase(), usedIn);
    });
  });
});

/* ---- SYLLABLE-BUILDER: prompt + per-activity words + syllables ---- */
syllableActs.forEach(function (a) {
  var key = a.kid_prompt_template;
  var usedIn = 'syllable-builder:' + a.id;
  if (key && SYLLABLE_STR[key]) {
    LOCALES.forEach(function (loc) {
      var t = SYLLABLE_STR[key][loc] || SYLLABLE_STR[key].en;
      if (t) bucket.add(loc, 'ui', t, usedIn);
    });
  }
  var words = (a.params && Array.isArray(a.params.words)) ? a.params.words : [];
  var lang  = (a.params && a.params.language) ? String(a.params.language).split('-')[0].toLowerCase() : 'en';
  words.forEach(function (w) {
    var word = w.targetWord || w.label;
    if (word) bucket.add(lang, 'word', word, usedIn);
    var syls = Array.isArray(w.syllables) ? w.syllables : [];
    syls.forEach(function (s) { bucket.add(lang, 'syllable', s, usedIn); });
  });
});

/* ---- APPROVED-WORDS pool: every word + every syllable ------------- */
['es','fi','pt','sv'].forEach(function (loc) {
  var p = path.join(APPROVED_DIR, 'approved-words-' + loc + '.json');
  if (!fs.existsSync(p)) return;
  var data = readJson(p);
  var entries = Array.isArray(data.entries) ? data.entries : [];
  var poolTag = 'approved-words-pool:' + loc;
  entries.forEach(function (e) {
    var word = e.word;
    if (word) bucket.add(loc, 'word', word, poolTag);
    var split = Array.isArray(e.split) ? e.split : (Array.isArray(e.chunks) ? e.chunks : []);
    split.forEach(function (s) {
      if (s) bucket.add(loc, 'syllable', s, poolTag);
    });
  });
});

/* ---- Emit CSVs ----------------------------------------------------- */
function csvEscape(v) {
  var s = String(v == null ? '' : v);
  if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function rowToCsv(r) {
  return [
    r.locale,
    r.type,
    r.text,
    r.filepath,
    r.usedIn.join('; '),
    ''  /* recorded? — operator marks YES/X */
  ].map(csvEscape).join(',');
}
var CSV_HEADER = ['language','type','text','filepath','used_in','recorded?'].join(',');

var TYPE_ORDER = { word:1, syllable:2, ui:3, number:4 };
function sortKey(r) {
  return (TYPE_ORDER[r.type] || 9) + '~' + r.text.toLowerCase();
}

var utcDate = new Date().toISOString().slice(0, 10);
var outDir  = path.join(ROOT, 'docs', 'audio', 'recording-manifest-' + utcDate);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

/* Group by locale + sort */
var byLocale = Object.create(null);
LOCALES.forEach(function (l) { byLocale[l] = []; });
bucket.rows.forEach(function (r) {
  if (!byLocale[r.locale]) byLocale[r.locale] = [];
  byLocale[r.locale].push(r);
});

var perLocaleCounts = {};
LOCALES.forEach(function (loc) {
  var rows = byLocale[loc] || [];
  rows.sort(function (a, b) { return sortKey(a) < sortKey(b) ? -1 : sortKey(a) > sortKey(b) ? 1 : 0; });
  var lines = [CSV_HEADER];
  rows.forEach(function (r) { lines.push(rowToCsv(r)); });
  fs.writeFileSync(path.join(outDir, loc + '.csv'), lines.join('\n') + '\n', 'utf8');
  var counts = { word:0, syllable:0, ui:0, number:0 };
  rows.forEach(function (r) { if (counts[r.type] != null) counts[r.type]++; });
  perLocaleCounts[loc] = { total: rows.length, byType: counts };
});

/* Combined */
var allRows = [];
LOCALES.forEach(function (loc) {
  (byLocale[loc] || []).forEach(function (r) { allRows.push(r); });
});
allRows.sort(function (a, b) {
  if (a.locale !== b.locale) return a.locale < b.locale ? -1 : 1;
  var ka = sortKey(a), kb = sortKey(b);
  return ka < kb ? -1 : ka > kb ? 1 : 0;
});
var combined = [CSV_HEADER].concat(allRows.map(rowToCsv));
fs.writeFileSync(path.join(outDir, '_combined.csv'), combined.join('\n') + '\n', 'utf8');

/* Rules + counts */
var rules = [
  '# Recording Manifest — LessonCraftStudio K-3 Activity Audio',
  '',
  '**Generated:** ' + new Date().toISOString(),
  '',
  '## How to record',
  '',
  '1. **The unit of recording = the unit the activity plays.** If the kid taps a syllable tile, that syllable is its own file. If the kid hears the blended word after Check, that word is its own file. **NEVER bake two playable units into one recording** — `o`, `me`, `na` are three separate files AND `omena` is its own separate file, even though `omena = o + me + na`.',
  '2. **When in doubt, record smaller and separate.** Discrete units can be re-used across activities; combined recordings cannot.',
  '3. **One file per row.** The `filepath` column gives the exact target path inside `/var/www/lcs-media/audio/` on Hetzner (URL: `https://www.lessoncraftstudio.com<filepath>`).',
  '4. **Naming.** All filenames are pre-slugified: lowercase, accents folded to ASCII (`ä→a`, `ñ→n`, `ß→ss`, `å→a`, `æ→ae`, `ø→o`, `ç→c`, etc.), spaces and punctuation collapsed to single hyphens. The slug is in the `filepath` column — recording into a different name will not be picked up.',
  '5. **Format spec (recommended).** MP3, mono, 44.1 kHz, ~96 kbps, normalized to -16 LUFS for consistent loudness. ~0.4-1.5 s typical duration; no leading/trailing silence > 100 ms.',
  '6. **Voice.** Single voice per language, warm K-3 tone (clear, unhurried, no theatrical inflection). Same speaker across all units in a language so playback feels continuous.',
  '7. **Pronunciation.** Words are spoken as the kid would hear them (not letter-by-letter). Syllables are spoken in isolation as they would appear on the tile. UI prompts are read naturally as a teacher would say them.',
  '8. **Mark `recorded?` column** (last column) with `Y` (or any non-empty value) when a file is uploaded. The platform doesn\'t read this column — it\'s for the operator\'s tracking.',
  '',
  '## Type definitions',
  '',
  '| type | meaning | when played |',
  '|---|---|---|',
  '| `word` | A whole word (e.g. `casa`, `gato`). | Subject "hear it" button; correct-answer blend playback. |',
  '| `syllable` | A syllable or letter (e.g. `ca`, `sa`, `c`). | Tile-tap during word/syllable building. |',
  '| `ui` | A rendered prompt sentence (e.g. `Make 5`, `¿Cuántos hay?`). | Speaker-icon next to the prompt banner. |',
  '| `number` | Reserved for future use. Numerals currently appear inside UI prompts. | (not yet emitted) |',
  '',
  '## Per-locale counts',
  '',
  '| locale | word | syllable | ui | number | total |',
  '|---|---:|---:|---:|---:|---:|'
].concat(LOCALES.map(function (loc) {
  var c = perLocaleCounts[loc] || { total: 0, byType: { word:0, syllable:0, ui:0, number:0 } };
  return '| ' + loc + ' | ' + c.byType.word + ' | ' + c.byType.syllable + ' | ' + c.byType.ui + ' | ' + c.byType.number + ' | ' + c.total + ' |';
})).concat([
  '',
  '## Notes per locale',
  '',
  '- **en:** ~6 CVC words + their letters + UI prompts. No approved-words pool file (English K-3 phonics is curated, not pipeline-gated).',
  '- **es / fi / pt / sv:** entire approved-words pool from `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json` (Gate v1.1, accent-fixes shipped 2026-05-22). Words + every distinct syllable across the pool.',
  '- **de / fr / it / nl / da / no:** UI prompts only. No approved-words pool file shipped yet (Stream B locales not yet GREEN through the phonics pipeline; de/nl/sv/da/no need Sound-Chunk Builder E9, fr/it need fan-out from E8). The audio infrastructure works with whatever inventory exists — additional rows will appear in this manifest when new approved-words files ship.',
  '',
  '## How to use this folder',
  '',
  'Each `<locale>.csv` corresponds to one tab in your spreadsheet. To import all 11 into one Excel/Sheets workbook:',
  '',
  '- **Excel (Windows/Mac):** Data → Get Data → From File → From Folder → point at this folder → Combine & Load. Each CSV becomes a sheet.',
  '- **Google Sheets:** File → Import → Upload each CSV as a new sheet.',
  '- **Numbers:** Drag each CSV into the sidebar; each becomes a sheet.',
  '',
  '`_combined.csv` is the same data with all 11 locales in one file, sorted by locale → type → text — useful for searching or pivoting across languages.',
  ''
]).join('\n');

fs.writeFileSync(path.join(outDir, '00-rules.md'), rules, 'utf8');

var total = allRows.length;
process.stdout.write('Wrote ' + total + ' rows across ' + LOCALES.length + ' locales to ' + outDir + '\n');
LOCALES.forEach(function (loc) {
  var c = perLocaleCounts[loc] || { total:0, byType:{} };
  process.stdout.write('  ' + loc + ': ' + c.total + ' (word=' + c.byType.word + ', syllable=' + c.byType.syllable + ', ui=' + c.byType.ui + ')\n');
});
