/* =====================================================================
   FOLD BY REFERENCE — the ten panel files into `mini tools/shape-stretcher.js`
   ---------------------------------------------------------------------
   Expands every `strings` entry from `{ en: 'X' }` to the full eleven-locale
   object, in place, preserving key ORDER and every comment between the keys.

   ⚠⚠ THE CONTRACT IS READ OFF THE TOOL, NEVER HARDCODED HERE, and the
   parser REFUSES TO RUN if it matches implausibly few keys. #42 shipped a
   registration whose completeness check listed five of eight required
   fields and therefore CERTIFIED an incomplete entry; a script carrying
   its own copy of the field list is operating on a copy. Same reason the
   locale gate parses rather than declares.

   ⚠⚠ A KEY THE TOOL DOES NOT DECLARE IS FATAL, NEVER A SKIP. A silent skip
   is how `gateClose` — 31 authored strings across ten files for a control
   `_gate()` never builds — survived two rounds of review. The applier
   stops and names it.

   ⚠ A KEY THE TOOL DECLARES AND A PANEL FILE LACKS IS **HELD**, NOT
   MISSING: the entry is folded with the locales that exist and the gap is
   REPORTED with its locale and key. Treating it as missing would tempt the
   next reader to fill it, which is translation.

   ⚠⚠ EVERY WRITE IS VERIFIED FROM DISK. The tool is re-`require`d with the
   module cache busted and each of the 11 × 31 values compared BYTE-EXACT
   against its panel file. Three live reasons, all bought here:
     - `Eén`/`één` in the Dutch carry acute accents that are LOAD-BEARING:
       `Eén` is the numeral *one of the two*, and stripping the accents
       silently turns "One label is holding" into "A label is holding".
     - the French uses U+2019 `’`, not an ASCII apostrophe, throughout.
     - the Italian uses an ASCII `'` (`Un'altra`, `C'è`) and the French does
       not — so a normaliser that "helpfully" unified them would corrupt one
       of the two. A byte-exact comparison already caught that divergence.
   Nothing in this file normalises, trims, or re-encodes a value.

   IDEMPOTENT: a second run finds every entry already carrying all eleven
   locales and writes nothing.

   RUN:    node scripts/apply-shape-stretcher-locales.js
   POISON: node scripts/apply-shape-stretcher-locales.js --poison
   ===================================================================== */
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var TOOL = path.join(ROOT, 'mini tools', 'shape-stretcher.js');
var LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var ALL = ['en'].concat(LOCALES);

/* ------------------------------------------------------------------ */
/* the contract, read off the artefact                                 */
/* ------------------------------------------------------------------ */

/* matches BOTH shapes — the unfolded `{ en: 'X' }` and an already-folded
   `{ en: "X", de: "Y", ... }` — so the second run can see what it did. */
var ENTRY_RE = /^(\s{6})(\w+):(\s*)\{[^\n]*\}(,?)[ \t]*$/gm;

function readEntries(src) {
  var m = src.match(/\n\s*strings:\s*\{\n([\s\S]*?)\n\s*\},\n\s*settings:/);
  if (!m) throw new Error('ABORT: could not locate the strings block in the tool source.');
  var body = m[1];
  var out = [];
  var re = new RegExp(ENTRY_RE.source, 'gm');
  var k;
  while ((k = re.exec(body)) !== null) out.push({ key: k[2], line: k[0] });

  /* ⚠ NON-VACUITY. A regex that matched nothing would make every
     downstream assertion pass over an empty set, and this script would
     cheerfully write the file back unchanged and call it done. */
  if (out.length < 20) {
    throw new Error('ABORT: parsed only ' + out.length + ' string entries off the tool — ' +
      'implausible. Refusing to fold against an empty contract.');
  }
  return { body: body, entries: out };
}

/* the CURRENT value of each locale on each entry, taken from the loaded
   module rather than re-parsed — so "already folded" is a fact about the
   object the shell will actually read */
function loadTool() {
  delete require.cache[require.resolve(TOOL)];
  return require(TOOL);
}

function loadPanels() {
  var out = {};
  LOCALES.forEach(function (l) {
    var p = path.join(ROOT, 'scripts', '_shape-stretcher-locale-' + l + '.js');
    if (!fs.existsSync(p)) throw new Error('ABORT: panel file missing: ' + p);
    delete require.cache[require.resolve(p)];
    out[l] = require(p);
  });
  return out;
}

/* ⚠ A REAL JS STRING LITERAL, not a hand-rolled quote-picker. Escapes the
   backslash FIRST (or every subsequent escape is double-escaped) and the
   quote character it is about to use. No value here contains a newline; if
   one ever does, it is escaped rather than silently emitted raw. */
function lit(s) {
  var q = s.indexOf('"') === -1 ? '"' : "'";
  var body = String(s)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  body = q === '"' ? body.replace(/"/g, '\\"') : body.replace(/'/g, "\\'");
  return q + body + q;
}

function toks(s) { return (String(s).match(/\{\w+\}/g) || []).slice().sort().join('|'); }

/* ------------------------------------------------------------------ */

function fold(opts) {
  opts = opts || {};
  var src = fs.readFileSync(TOOL, 'utf8');
  var parsed = readEntries(src);
  var tool = loadTool();
  var panels = loadPanels();
  var declared = parsed.entries.map(function (e) { return e.key; });

  console.log('contract: ' + declared.length + ' string keys read off ' + path.relative(ROOT, TOOL));

  /* --- FATAL: a panel key the tool does not declare ---------------- */
  var unknown = [];
  LOCALES.forEach(function (l) {
    Object.keys(panels[l]).forEach(function (k) {
      if (declared.indexOf(k) === -1) unknown.push(l + '.' + k);
    });
  });
  if (unknown.length) {
    console.log('\nFATAL — panel file(s) declare key(s) the tool does not have:');
    unknown.forEach(function (u) { console.log('  ' + u); });
    console.log('A key with no declaration is a control that was never built. Delete it from');
    console.log('the panel file, or build the control — it is never skipped silently here.');
    process.exit(1);
  }

  /* --- HELD: a declared key a panel file does not carry ------------ */
  var held = [];
  declared.forEach(function (k) {
    LOCALES.forEach(function (l) {
      if (typeof panels[l][k] !== 'string' || panels[l][k] === '') held.push(l + '.' + k);
    });
  });

  /* --- placeholder parity, derived from the English ---------------- */
  var parity = [];
  declared.forEach(function (k) {
    var want = toks(tool.strings[k].en);
    LOCALES.forEach(function (l) {
      if (typeof panels[l][k] !== 'string') return;
      if (toks(panels[l][k]) !== want) {
        parity.push(l + '.' + k + ': English has [' + (want || 'none') +
          '], panel has [' + (toks(panels[l][k]) || 'none') + ']');
      }
    });
  });
  if (parity.length) {
    console.log('\nFATAL — placeholder parity:');
    parity.forEach(function (p) { console.log('  ' + p); });
    process.exit(1);
  }

  /* --- rewrite each entry line in place ---------------------------- */
  var rewritten = 0, alreadyDone = 0;
  var newBody = parsed.body.replace(new RegExp(ENTRY_RE.source, 'gm'), function (line, ind, key, sp, comma) {
    if (declared.indexOf(key) === -1) return line;   /* cannot happen; belt */
    var have = tool.strings[key] || {};
    var parts = [];
    ALL.forEach(function (l) {
      var v = l === 'en' ? have.en : panels[l][key];
      if (typeof v !== 'string' || v === '') return;
      parts.push(l + ': ' + lit(v));
    });
    var next = ind + key + ':' + sp + '{ ' + parts.join(', ') + ' }' + comma;
    if (next === line) { alreadyDone++; return line; }
    rewritten++;
    return next;
  });

  if (opts.dry) {
    console.log('\n(dry) ' + rewritten + ' entr(y|ies) would be rewritten, ' + alreadyDone + ' already folded.');
    return { rewritten: rewritten, held: held };
  }

  if (rewritten > 0) {
    /* ⚠ splice the body back by INDEX, not by a second search — a
       replace() over the whole file could land the folded body in a
       different block if any two blocks ever looked alike. */
    var at = src.indexOf(parsed.body);
    if (at === -1) throw new Error('ABORT: the parsed strings body no longer locates in the source.');
    if (src.indexOf(parsed.body, at + 1) !== -1) throw new Error('ABORT: the strings body is not unique in the source.');
    var next = src.slice(0, at) + newBody + src.slice(at + parsed.body.length);
    fs.writeFileSync(TOOL, next, 'utf8');
  }
  console.log('\n' + rewritten + ' entr(y|ies) rewritten, ' + alreadyDone + ' already folded.');

  /* ================= VERIFY THE WRITE LANDED ======================= */
  /* Re-read from DISK with the cache busted. "The call returned" is not
     "the bytes are on disk in the value I meant". */
  var after = loadTool();
  var bad = [];
  var n = 0;
  declared.forEach(function (k) {
    var got = after.strings[k];
    if (!got || typeof got !== 'object') { bad.push(k + ': not an object after the fold'); return; }
    if (got.en !== tool.strings[k].en) bad.push(k + '.en: the English changed during the fold');
    n++;
    LOCALES.forEach(function (l) {
      var want = panels[l][k];
      if (typeof want !== 'string' || want === '') {
        if (got[l] !== undefined) bad.push(l + '.' + k + ': held key was written anyway');
        return;
      }
      n++;
      if (got[l] !== want) {
        bad.push(l + '.' + k + ': ON DISK ' + JSON.stringify(got[l]) +
          '  !=  PANEL ' + JSON.stringify(want));
      }
    });
    /* no locale the panels did not supply */
    Object.keys(got).forEach(function (l) {
      if (ALL.indexOf(l) === -1) bad.push(k + ': carries an unknown locale "' + l + '"');
    });
  });

  /* ⚠ NON-VACUITY ON THE VERIFICATION ITSELF — a comparison loop that
     ran over nothing reports zero mismatches and looks identical to a
     clean run. #40 shipped a gate whose every assertion compared two
     empty NodeLists. */
  var expect = declared.length * ALL.length - held.length;
  if (n !== expect) bad.push('the verifier compared ' + n + ' values, expected ' + expect);
  if (n < 200) bad.push('the verifier compared only ' + n + ' values — implausible');

  if (bad.length) {
    console.log('\nFAIL — the fold did not land as written:');
    bad.slice(0, 40).forEach(function (b) { console.log('  ✗ ' + b); });
    process.exit(1);
  }

  console.log('verified from disk: ' + n + ' values byte-exact against the ten panel files.');
  if (held.length) {
    console.log('\nHELD (declared by the tool, not carried by the panel — folded en-only, NOT invented):');
    held.forEach(function (h) { console.log('  · ' + h); });
  } else {
    console.log('held: none — every declared key is carried by all ten panels.');
  }
  return { rewritten: rewritten, held: held };
}

/* ------------------------------------------------------------------ */
/* POISON — each refusal must be observed FIRING, and a CONTROL must be */
/* observed PASSING. Run against COPIES in a tmp dir; the real tool and  */
/* the real panel files are never touched.                              */
/* ------------------------------------------------------------------ */

function poison() {
  var os = require('os');
  var ok = true;
  var src = fs.readFileSync(TOOL, 'utf8');

  function sub(label, mutate, wantFail) {
    var dir = fs.mkdtempSync(path.join(os.tmpdir(), 'shp-fold-'));
    var f = path.join(dir, 'probe.js');
    var text = mutate(src);
    fs.writeFileSync(f, text, 'utf8');
    /* re-run the PARSER against the mutated text, in-process */
    var threw = null, count = 0;
    try { count = readEntries(text).entries.length; } catch (e) { threw = e.message; }
    var failed = threw !== null || count < 20;
    if (failed === wantFail) console.log('  ' + (wantFail ? 'FIRED ' : 'PASSED') + '  ' + label);
    else { ok = false; console.log('  !! ' + label + ' — expected ' + (wantFail ? 'a refusal' : 'a pass') + ', got ' + (failed ? 'a refusal' : 'a pass')); }
  }

  console.log('--- POISON ---');
  /* the parser must REFUSE a strings block it cannot see */
  sub('the strings block is renamed, so the parser matches nothing',
    function (s) { return s.replace(/\n(\s*)strings:\s*\{/, '\n$1stringsX: {'); }, true);
  /* ... and must refuse a block with implausibly few entries */
  sub('the block keeps three entries, so the contract is nearly empty',
    function (s) {
      return s.replace(/(\n\s*strings:\s*\{\n)([\s\S]*?)(\n\s*\},\n\s*settings:)/,
        function (all, a, body, c) { return a + body.split('\n').slice(0, 3).join('\n') + c; });
    }, true);
  /* CONTROL: the real, untouched source must PARSE */
  sub('CONTROL — the shipped source parses to a full contract', function (s) { return s; }, false);

  /* the literal writer, poisoned both ways */
  var cases = [
    ['a value containing a double quote', 'he said "hi"'],
    ['a value containing an ASCII apostrophe', "Un'altra figura"],
    ['a value containing a backslash', 'a\\b'],
    ['the Dutch numeral with its acute accents', 'Eén label houdt vast: de vorm is haaks.'],
    ['the French right single quote U+2019', 'l’angle droit est marqué.']
  ];
  cases.forEach(function (c) {
    /* eslint-disable no-eval */
    var round = eval('(' + lit(c[1]) + ')');
    if (round === c[1]) console.log('  PASSED  round-trip: ' + c[0]);
    else { ok = false; console.log('  !! round-trip CORRUPTED: ' + c[0] + ' -> ' + JSON.stringify(round)); }
  });

  /* the unknown-key refusal, both directions, without touching disk */
  var declared = readEntries(src).entries.map(function (e) { return e.key; });
  if (declared.indexOf('gateClose') !== -1) { ok = false; console.log('  !! the tool still declares gateClose'); }
  else console.log('  PASSED  the tool does not declare gateClose, so a panel carrying it is fatal');
  ['sayTagsBoth', 'sayTagsEqual', 'sayTagsRight', 'sayTagsNone'].forEach(function (k) {
    if (declared.indexOf(k) === -1) { ok = false; console.log('  !! the tool does not declare ' + k); }
  });
  if (declared.indexOf('ariaTagsBoth') !== -1) { ok = false; console.log('  !! the old ariaTags* name survives'); }
  else console.log('  PASSED  the four caption keys are sayTags*, not ariaTags*');

  console.log(ok ? '\nPOISON: OK\n' : '\nPOISON: BROKEN\n');
  return ok;
}

/* ------------------------------------------------------------------ */

if (process.argv.indexOf('--poison') !== -1) {
  process.exit(poison() ? 0 : 1);
} else {
  fold({ dry: process.argv.indexOf('--dry-run') !== -1 });
}
