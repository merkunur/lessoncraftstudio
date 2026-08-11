/* =====================================================================
   mutate-missing-question.js — poison TOOL #55's model, one edit at a
   time, and require `verify-missing-question.js` to notice every one.
   Run:  node scripts/mutate-missing-question.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable from
   a failing one, so an unmutated copy must PASS before any mutation's
   failure means anything.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP. A dropped needle silently
   shrinks the total while the run still reports "every mutation killed"
   — #43 lost seven needles to a line-ending change alone.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING. git checkout normalises line
   endings through core.autocrlf and multi-line needles are silently
   sensitive to it.

   ⚠ EVERY DATA FILE THE GATE READS IS CARRIED INTO THE TMP DIR. This
   tool loads none — it is numerals and geometry — but the harness copies
   the whole directory anyway so that stays true if it changes.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.

   ⚠ NEEDLES ARE SELF-ANCHORED ON CODE, NEVER ON A STRING'S CURRENT TEXT
   — a needle carrying the English literal has a half-life measured in
   one `apply-` run.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'missing-question.js');
const VERIFY = path.join(__dirname, 'verify-missing-question.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* [label, find, replace] — each must change BEHAVIOUR, not a comment.
   ⚠ SIX EQUIVALENT MUTANTS WERE REMOVED rather than chased; the reason
   for each is recorded at law L9 in verify-missing-question.js. An
   equivalent mutant is a fact about the code, not a gap in the gate, and
   hunting one is how a suite acquires assertions that cannot fail.
   ⚠ REWRITTEN. The previous table poisoned `legal(b, c)` and `framesFor`
   — the ledge-and-air model this build replaced — so 50 of its 61
   needles were dead and the run reported "killed 2/61" while testing
   almost nothing. A needle table is code that rots with the code it
   points at, and a harness that reports faults rather than skips is the
   only reason that was visible at all. */
const MUTATIONS = [
  /* --- legal(): every clause of the ambiguity predicate ------------ */
  ['legal drops the integer guard',
    'if (w !== Math.round(w) || p !== Math.round(p)) return false;', 'if (false) return false;'],
  ['legal allows an empty part', 'if (!(p > 0) || !(w - p > 0)) return false;', 'if (!(p > 0)) return false;'],
  ['legal allows an empty complement', 'if (!(p > 0) || !(w - p > 0)) return false;', 'if (!(w - p > 0)) return false;'],
  ['legal allows equal parts — two questions become one question',
    'if (p === w - p) return false;', 'if (false) return false;'],
  ['legal refuses the wrong pair', 'if (p === w - p) return false;', 'if (p === w - p + 1) return false;'],

  /* --- values(): the invariant the whole tool rests on ------------- */
  ['the parts stop adding to the whole', 'out[other[1]] = s.w - s.p;', 'out[other[1]] = s.p;'],
  ['the sum niche shows a part', 'out[sum] = s.w;', 'out[sum] = s.p;'],
  ['the two parts are swapped for the complement', 'out[other[0]] = s.p;', 'out[other[0]] = s.w - s.p;'],

  /* --- toldCount(): the question must never count as told ---------- */

  /* --- stageOf(): a PATH, not a state machine ---------------------- */
  ['a counted state reports stage 4 from anywhere',
    'if (s.counted) return (s.linked && n === 2) ? 4 : null;', 'if (s.counted) return 4;'],
  ['telling without linking still reports stage 0',
    'if (!s.linked) return n === 0 ? 0 : null;', 'if (!s.linked) return 0;'],
  ['the ladder skips a rung', 'if (n === 0) return 1;', 'if (n === 0) return 2;'],
  ['the ladder runs one rung ahead of itself', 'if (n === 1) return 2;', 'if (n === 1) return 3;'],

  /* --- link() ------------------------------------------------------ */
  ['link stops refusing a no-op', 'if (want === !!s.linked) return null;', 'if (false) return null;'],
  ['unlinking keeps the facts it can no longer justify',
    'if (!want) { n.told = [false, false, false]; n.counted = false; }',
    'if (!want) { n.counted = false; }'],
  ['unlinking keeps a count with no visible relation under it',
    'if (!want) { n.told = [false, false, false]; n.counted = false; }',
    'if (!want) { n.told = [false, false, false]; }'],

  /* --- tell() ------------------------------------------------------ */
  ['the question slot becomes tellable',
    'if (i === s.ask) return null;                 /* that IS the question */',
    'if (i === -1) return null;'],
  ['facts can be told with no relation drawn',
    'if (!s.linked) return null;                   /* nothing to reason from */',
    'if (false) return null;'],
  ['tell stops refusing a no-op', 'if (want === !!s.told[i]) return null;', 'if (false) return null;'],
  ['tell accepts a slot that does not exist',
    /* ⚠ the short form of this needle matched TWICE — `tell` and
       `setAsk` open with the same two guard lines — so the harness
       mutated whichever came first and the label named the other. The
       trailing comment is what makes it `tell`'s. */
    'if (!(i === 0 || i === 1 || i === 2)) return null;\n      if (i === s.ask) return null;                 /* that IS the question */',
    'if (false) return null;\n      if (i === s.ask) return null;                 /* that IS the question */'],
  ['taking a fact back leaves the count standing', 'if (!want) n.counted = false;', 'if (false) n.counted = false;'],

  /* --- count(): the answer must not exist before it is counted ----- */
  ['the answer can be counted before anything is said',
    'if (want && !(s.linked && this.toldCount(s) === 2)) return null;',
    'if (want && false) return null;'],
  ['one fact is enough to count the answer out',
    'if (want && !(s.linked && this.toldCount(s) === 2)) return null;',
    'if (want && !(s.linked && this.toldCount(s) >= 1)) return null;'],
  ['count stops refusing a no-op', 'if (want === !!s.counted) return null;', 'if (false) return null;'],

  /* --- setAsk() ---------------------------------------------------- */
  ['the new question arrives already answered',
    'n.told[i] = false;          /* the question is never already said */',
    'n.told[i] = true;'],
  /* ⚠ RE-AIMED. This used to INSERT `n.counted = s.counted;` after the
     told wipe — where the very next line overwrites it, so the mutation
     was equivalent by construction and survived for a reason that said
     nothing about the gate. A mutation must be placed where its effect
     can reach the return. */
  ['moving the question keeps the old count',
    'n.told[i] = false;          /* the question is never already said */\n      n.counted = false;',
    'n.told[i] = false;          /* the question is never already said */'],

  /* --- setShape(): the defect three native panels found ------------ */
  ['setShape stops refusing a no-op', 'if (shape === s.shape) return null;', 'if (false) return null;'],
  ['setShape accepts an arrangement that does not exist',
    'if (SHAPES.indexOf(shape) < 0) return null;', 'if (false) return null;'],
  ['a told numeral rewrites itself on an arrangement change',
    'n.w = w; n.p = p;\n      return n;\n    },\n\n    /* did an arrangement change',
    'return n;\n    },\n\n    /* did an arrangement change'],
  ['an arrangement change escapes the configured band',
    'if (!this.legal(w, p) || w > n.cap) {', 'if (!this.legal(w, p)) {'],
  ['setShape lands on an illegal frame',
    'if (!this.legal(w, p) || w > n.cap) {\n        n.told = [false, false, false];\n        return n;\n      }',
    'if (false) { n.told = [false, false, false]; }'],
  ['a resolved count survives an arrangement change',
    'n.shape = shape;\n      n.counted = false;', 'n.shape = shape;'],
  ['two told parts recombine into the wrong whole',
    'else if (v[other[0]] != null && v[other[1]] != null) { w = v[other[0]] + v[other[1]]; p = v[other[0]]; }',
    'else if (v[other[0]] != null && v[other[1]] != null) { w = v[other[0]] * v[other[1]]; p = v[other[0]]; }'],

  /* --- carried(): the say-line must not claim what it did not keep - */
  ['the say-line always claims the facts were carried',
    'return this.toldCount(after) === this.toldCount(before);', 'return true;'],

  /* --- setTotal(): a SETUP move, and only that --------------------- */
  ['setTotal is allowed after the telling has started',
    'if (this.toldCount(s) > 0 || s.linked) return null;', 'if (false) return null;'],
  ['setTotal climbs past the band', 'if (w > cap) return null;', 'if (false) return null;'],
  /* ⚠ `setTotal`'s own floor guard is NOT here, and its absence is a
     finding rather than an oversight: `legal()` carries the same floor,
     so removing either one alone changes nothing — the descent loop
     simply fails to find a legal p and the move refuses anyway. They are
     MUTUALLY REDUNDANT, and no single-edit mutation can express the
     defect that would matter (removing both). Recorded so the next
     reader does not delete one as dead code. */

  /* --- newState() / deal(): the ladder starts at the bottom -------- */
  ['the deal starts part-way up the ladder',
    'linked: false, told: [false, false, false], counted: false',
    'linked: true, told: [false, false, false], counted: false'],
  ['the deal picks from frames the predicate refuses',
    'for (p = 1; p < w; p++) if (this.legal(w, p)) all.push({ w: w, p: p });',
    'for (p = 1; p < w; p++) all.push({ w: w, p: p });'],
  ['the deal reaches past the band', 'for (w = GEO.FLOOR; w <= cap; w++) {',
    'for (w = GEO.FLOOR; w <= cap + 5; w++) {'],
  ['the state carries a ceiling the band never set', 'cap: cap,', 'cap: GEO.BANDS.twenty,'],

  /* --- _copy(): a move must never mutate what it was given --------- */
  ['_copy aliases the told array, so every move mutates its input',
    'told: [s.told[0], s.told[1], s.told[2]]', 'told: s.told'],
  ['_copy forgets the ceiling', 'cap: (s.cap != null) ? s.cap : GEO.BANDS.twenty,', 'cap: GEO.BANDS.ten,'],

  /* --- the band table ---------------------------------------------- */
  ['the two bands serve the same ceiling', 'BANDS: { ten: 10, twenty: 20 },', 'BANDS: { ten: 10, twenty: 10 },'],
  ['cap ignores the band it is handed',
    'cap: function (band) { return GEO.BANDS[band] || GEO.BANDS.ten; },',
    'cap: function (band) { return GEO.BANDS.ten; },'],
];

function run(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { MISSING_QUESTION_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 30000
    });
    return 'PASS';
  } catch (e) {
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) return 'TIMEOUT';
    return 'FAIL';
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mqu-mut-'));
/* carry the whole directory, so a future data file travels too */
const srcDir = path.dirname(SRC);
for (const f of fs.readdirSync(srcDir)) {
  const fp = path.join(srcDir, f);
  if (fs.statSync(fp).isFile()) fs.copyFileSync(fp, path.join(tmp, f));
}
const target = path.join(tmp, 'missing-question.js');

console.log('CONTROL: an unmutated copy must PASS');
fs.writeFileSync(target, ORIGINAL);
const control = run(tmp);
console.log('  control = ' + control);
if (control !== 'PASS') {
  console.log('\n*** THE HARNESS IS BROKEN. Every "kill" below would be meaningless.');
  process.exit(1);
}

let killed = 0, survived = 0, faults = 0;
console.log('\n' + MUTATIONS.length + ' mutations:');
for (const [label, find, repl] of MUTATIONS) {
  /* ⚠ AN AMBIGUOUS NEEDLE IS A FAULT TOO, and it was not checked here
     before. `String.replace` with a string pattern edits only the FIRST
     match, so a needle occurring twice silently mutates a site the
     label does not name — and if the gate kills it, the run reports a
     kill for a check that never happened. */
  const hits = ORIGINAL.split(find).length - 1;
  if (hits !== 1) {
    faults++;
    console.log('  ⚠ FAULT  ' + label + ' — needle matched ' + hits
      + ' times, the mutation is not the one named');
    continue;
  }
  fs.writeFileSync(target, ORIGINAL.replace(find, repl));
  const r = run(tmp);
  if (r === 'FAIL') { killed++; console.log('  ✓ killed  ' + label); }
  else { survived++; console.log('  ✗ ' + r + '  ' + label); }
}
fs.writeFileSync(target, ORIGINAL);

console.log('\n' + '='.repeat(64));
console.log(`killed ${killed}/${MUTATIONS.length}, survived ${survived}, harness faults ${faults}`);
console.log('='.repeat(64));
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* leave it */ }
process.exit(survived || faults ? 1 : 0);
