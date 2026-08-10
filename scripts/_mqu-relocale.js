/* =====================================================================
   _mqu-relocale.js — TOOL #55, in-place per-locale value updater
   ---------------------------------------------------------------------
   Four panels (it, fr, sv, da) revised their scratchpad files AFTER
   `apply-missing-question-locales.js` had already expanded every key
   from `{ en: X }` into a full per-locale object. The applier's anchor
   is that `{ en: X }` shape, so on a second run it finds every key
   "already carried" and reports success WITHOUT COMPARING A SINGLE
   VALUE — a silent no-op that looks exactly like a clean pass. This
   script is the other half: it does not expand anything, it UPDATES
   already-expanded values, and it decides what to do by comparing the
   value on disk against the panel-derived record.

   ⚠ ANCHORED PER KEY BLOCK, NOT ON THE FILE. `_dbm-relocale.js` anchors
   a naive `\n        <loc>: '<value>'` needle against the WHOLE source
   and takes String#replace's first hit. That is correct only while no
   two keys share a value in the same locale (measured true today, 0
   collisions) — the day two do, it silently rewrites the wrong key.
   Here each key's object literal is isolated first and the locale line
   is required to occur EXACTLY ONCE inside it.

   ⚠⚠ `tallyNone` IS NEVER WRITTEN. All ten panels authored one; the
   tool does not declare it, because `showTally()` refuses to open over
   nothing and `shut()` puts the tally away with the last shutter, so
   `rows.length === 0` is unreachable — proven over all 714
   button-reachable states. Any key in the record that the tool does not
   declare is FATAL here, not merely skipped: skipping is how a string
   with no state behind it gets revived (#39 `hintMark`).

   ⚠ EVERY WRITE IS VERIFIED. The file is re-required from DISK with the
   cache busted and every value compared back. A partial rewrite that
   reports success is the recorded tool-content.ts defect, and it has
   happened twice on this shelf.

   ⚠ NON-VACUITY FIRST. The run refuses to report success unless it
   actually examined the full (keys x locales) grid. A comparison loop
   that iterated over nothing would otherwise print "all values match".

   Usage:  node scripts/_mqu-relocale.js
           MQU_TOOL=<path> node scripts/_mqu-relocale.js   (poison tests)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const P = process.env.MQU_TOOL || path.join(__dirname, '..', 'mini tools', 'missing-question.js');
const S = require(path.join(__dirname, '_missing-question-strings.js'));

const LOC = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MIN_KEYS = 20;   /* the tool declares 24; a parse that yields far fewer is a broken read, not a small tool */

function q(x) {
  return "'" + String(x).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}
function fatal(msg) {
  console.log('FATAL: ' + msg);
  process.exit(1);
}

function load() {
  delete require.cache[require.resolve(P)];
  return require(P);
}

const T = load();
if (!T || !T.strings) fatal('the tool exports no `strings` map — wrong file? ' + P);
const KEYS = Object.keys(T.strings);
if (KEYS.length < MIN_KEYS) {
  fatal('read only ' + KEYS.length + ' keys (< ' + MIN_KEYS + '). Refusing to certify a grid this ' +
        'small — a field list you parsed implausibly few of is not a field list.');
}

/* ---- the tallyNone guard, and every other undeclared key --------------
   FATAL, never a skip. */
const undeclared = [];
LOC.forEach(function (l) {
  if (!S[l]) fatal('the record has no block for locale ' + l);
  Object.keys(S[l]).forEach(function (k) {
    if (KEYS.indexOf(k) < 0 && undeclared.indexOf(k) < 0) undeclared.push(k);
  });
});
if (undeclared.length) {
  fatal('the record carries key(s) the tool does not declare: ' + undeclared.join(', ') +
        '\n       A string with no state behind it must not be written in. If the tool ' +
        'genuinely grew a key, add it to the tool first.');
}

/* ---- isolate each key's object literal, then edit inside it ---------- */
let s = fs.readFileSync(P, 'utf8');
const changed = [];
let examined = 0;

KEYS.forEach(function (k) {
  const open = '\n      ' + k + ': {';
  let at = s.indexOf(open);
  if (at < 0) fatal('no object literal found for key `' + k + '`');
  if (s.indexOf(open, at + 1) >= 0) fatal('key `' + k + '` opens more than once — ambiguous anchor');
  const bodyStart = at + open.length;
  /* ⚠ the LAST key in the map closes `\n      }` with NO comma, so an
     anchor of `\n      },` terminates every block except the one it is
     most important not to skip. Caught by the control run, which is the
     whole reason a correct-input case is run at all. */
  const end = s.indexOf('\n      }', bodyStart);
  if (end < 0) fatal('unterminated object literal for key `' + k + '`');

  let block = s.slice(bodyStart, end);

  LOC.forEach(function (l) {
    examined++;
    const want = S[l][k];
    if (want == null) fatal('the record has no value for ' + l + '.' + k);
    const have = T.strings[k][l];
    if (have == null) {
      fatal(l + '.' + k + ' is absent from the tool. This script UPDATES expanded ' +
            'values; it does not expand `{ en: X }`. Run the applier first.');
    }
    if (have === want) return;

    const needle = '\n        ' + l + ': ' + q(have);
    const hits = block.split(needle).length - 1;
    if (hits !== 1) {
      fatal(l + '.' + k + ': anchor occurs ' + hits + ' time(s) inside the key block ' +
            '(expected exactly 1) — refusing to guess which one to rewrite');
    }
    block = block.replace(needle, '\n        ' + l + ': ' + q(want));
    changed.push({ key: k, loc: l, from: have, to: want });
  });

  s = s.slice(0, bodyStart) + block + s.slice(end);
});

/* ---- non-vacuity: the grid must have been fully walked --------------- */
const expected = KEYS.length * LOC.length;
if (examined !== expected) {
  fatal('examined ' + examined + ' of an expected ' + expected + ' (key, locale) pairs. ' +
        'A comparison that ran over nothing must not report agreement.');
}

fs.writeFileSync(P, s, 'utf8');

/* ---- ⚠ VERIFY EVERY WRITE LANDED, from DISK, cache busted ------------ */
const after = load();
let bad = 0, verified = 0;
KEYS.forEach(function (k) {
  if (!after.strings[k]) { bad++; console.log('  MISSING KEY after write: ' + k); return; }
  LOC.forEach(function (l) {
    verified++;
    if (after.strings[k][l] !== S[l][k]) {
      bad++;
      if (bad <= 8) {
        console.log('  MISMATCH ' + k + '.' + l);
        console.log('    on disk: ' + after.strings[k][l]);
        console.log('    record : ' + S[l][k]);
      }
    }
  });
});
const revived = Object.keys(after.strings).filter(k => KEYS.indexOf(k) < 0);
if (revived.length) { bad++; console.log('  KEY REVIVED by this run: ' + revived.join(', ')); }
if (verified !== expected) { bad++; console.log('  verified only ' + verified + ' of ' + expected + ' pairs'); }

if (changed.length) {
  console.log(changed.length + ' value(s) updated:');
  changed.forEach(function (c) {
    console.log('  ' + c.loc + '.' + c.key);
    console.log('    was: ' + c.from);
    console.log('    now: ' + c.to);
  });
} else {
  console.log('0 values updated — every one of the ' + expected + ' already equalled the record.');
}
console.log(verified + ' value(s) re-read from disk; ' +
            (bad ? bad + ' MISMATCH(ES)' : 'all match the panel record') +
            '; tallyNone still absent: ' + (Object.keys(after.strings).indexOf('tallyNone') < 0));
if (bad) process.exit(1);
