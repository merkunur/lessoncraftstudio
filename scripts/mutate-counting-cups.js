/* =====================================================================
   mutate-counting-cups.js — poison TOOL #48's model, one edit at a
   time, and require `verify-counting-cups.js` to notice every one.
   Run:  node scripts/mutate-counting-cups.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable
   from a failing one, so an unmutated copy must PASS before any
   mutation's failure means anything.

   ⚠ A MISSING NEEDLE THROWS, IT DOES NOT SKIP. A dropped needle
   silently shrinks the total while the run still reports "every
   mutation killed" — #43 lost seven needles that way to a line-ending
   change alone.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING. git checkout normalises line
   endings through core.autocrlf, and multi-line needles are silently
   sensitive to it.

   ⚠ EVERY DATA FILE THE GATE READS IS CARRIED INTO THE TMP DIR. This
   tool loads none — it is numerals and geometry — but the harness
   copies the whole directory anyway so that stays true if it changes.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'counting-cups.js');
const VERIFY = path.join(__dirname, 'verify-counting-cups.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* [label, find, replace] — each must change BEHAVIOUR, not comments */
const MUTATIONS = [
  /* --- conservation -------------------------------------------- */
  ['scoop drops a chip', 'keep.push(st.mat[i]);', 'if (i !== 0) keep.push(st.mat[i]);'],
  ['scoop invents a chip', 'var open = st.open + u.take.length;', 'var open = st.open + u.take.length + 0; keep.push({x:100,y:300});'],
  ['total forgets the open cup', 'return st.mat.length + st.open + 10 * st.closed + 100 * st.stack;',
    'return st.mat.length + 10 * st.closed + 100 * st.stack;'],
  ['total mis-weights a cup', '10 * st.closed + 100 * st.stack;', '9 * st.closed + 100 * st.stack;'],
  ['total mis-weights the stack', '100 * st.stack;', '90 * st.stack;'],
  ['tipAll loses the open cup', 'open: 0, closed: 0, stack: 0, band: st.band, seed: st.seed } };',
    'open: 1, closed: 0, stack: 0, band: st.band, seed: st.seed } };'],

  /* --- the cup -------------------------------------------------- */
  ['a cup takes eleven', 'if (open >= CUP_HOLDS) { open = 0; closed++; shut = true; }',
    'if (open > CUP_HOLDS) { open = 0; closed++; shut = true; }'],
  ['the mouth over-offers', 'var room = CUP_HOLDS - st.open;', 'var room = CUP_HOLDS;'],
  ['the shelf overflows', 'if (closed >= CUP_HOLDS) { closed = 0; stack = 1; fused = true; }',
    'if (closed >= CUP_HOLDS + 2) { closed = 0; stack = 1; fused = true; }'],
  ['_st lets open reach ten', 'Math.min(CUP_HOLDS - 1, Math.floor(o.open))', 'Math.min(CUP_HOLDS + 4, Math.floor(o.open))'],
  ['_st lets closed exceed the slots', 'Math.min(GEO.CUP_SLOTS, Math.floor(o.closed))', 'Math.min(GEO.CUP_SLOTS + 3, Math.floor(o.closed))'],

  /* --- the digits ------------------------------------------------ */
  ['ones forgets the open cup', 'return st.mat.length + st.open; }', 'return st.mat.length; }'],
  ['settles one short', 'return this.ones(st) < CUP_HOLDS; }', 'return this.ones(st) < CUP_HOLDS + 1; }'],
  ['settles one late', 'return this.ones(st) < CUP_HOLDS; }', 'return this.ones(st) < CUP_HOLDS - 1; }'],
  ['hundreds reads the cups', 'h: st.stack,', 'h: st.closed,'],
  ['tens reads the stack', 't: st.closed,', 't: st.stack,'],
  ['the ones digit leaks early', 'o: done ? this.ones(st) : null,', 'o: this.ones(st),'],

  /* --- refusals -------------------------------------------------- */
  ['addOne past the ceiling', 'if (st.n >= CAP) return null;', 'if (st.n >= CAP + 50) return null;'],
  ['removeOne underflows', 'if (st.n <= 0) return null;', 'if (st.n <= -99) return null;'],
  ['tipCup with no cup', 'if (st.closed <= 0) return null;', 'if (st.closed < 0) return null;'],
  ['breakStack with no stack', 'if (st.stack !== 1) return null;', 'if (st.stack === 7) return null;'],
  ['tipAll when nothing is trayed', 'if (st.closed === 0 && st.stack === 0 && st.open === 0) return null;',
    'if (st.closed === 0 && st.stack === 0 && st.open === 99) return null;'],
  ['scoop on bare ground succeeds', 'if (!u.take.length) return null;', 'if (u.take.length < 0) return null;'],
  ['canAdd ignores the ceiling', 'return this._st(st).n < CAP;', 'return true;'],
  ['canRemove ignores empty', 'return this._st(st).n > 0;', 'return true;'],
  ['the borrow does not open a cup', 'closed--; open = CUP_HOLDS - 1; opened = true;', 'closed--; open = 0; opened = true;'],
  ['breaking the hundred loses ten', 'stack = 0; closed = CUP_HOLDS - 1; open = CUP_HOLDS - 1; broke = true; opened = true;',
    'stack = 0; closed = CUP_HOLDS - 2; open = CUP_HOLDS - 1; broke = true; opened = true;'],

  /* --- _st totality ---------------------------------------------- */
  /* ⚠ `var o = st || {}` is EQUIVALENT here, not a survivor: every
     field below is individually guarded, so a number or a string flows
     through to the same result. Poison the fallback itself instead. */
  ['_st has no fallback at all', 'var o = (st && typeof st === \'object\') ? st : {};', 'var o = st;'],
  ['_st trusts a bad band', 'var band = (BANDS[o.band]) ? o.band : \'heap\';', 'var band = o.band;'],
  ['_st trusts a non-array mat', 'var mat = Array.isArray(o.mat) ? o.mat : [];', 'var mat = o.mat || [];'],

  /* --- the scatter ------------------------------------------------ */
  ['chips fuse', 'NN_FLOOR: 1.02,', 'NN_FLOOR: 0.55,'],
  ['the scatter drops a chip', 'for (i = 0; i < n; i++) {', 'for (i = 0; i < n - 1; i++) {'],
  ['chips render under the cup', 'if (cx > ex0 && cx < ex1 && cy > ey0 && cy < ey1) continue;', 'if (false) continue;'],
  ['the relaxation pass is dead', 'if (dd2 >= floor2 || dd2 === 0) continue;', 'if (true) continue;'],

  /* --- the mouth and the press budget ----------------------------- */
  ['the mouth covers one cupful', 'MOUTH_TARGET: 2.0,', 'MOUTH_TARGET: 1.0,'],
  ['the mouth shrinks to nothing', 'MOUTH_MAX_W: 0.22,', 'MOUTH_MAX_W: 0.03,'],
  ['the keyboard aims at a centroid', 'if (n > bestN) { bestN = n; best = mine[j]; }',
    'if (n < bestN || bestN < 0) { bestN = n; best = mine[j]; }'],

  /* --- bands and geometry ----------------------------------------- */
  ['a band tops past the ceiling', 'spill:   { lo: 91, hi: 199, nmax: 199 }', 'spill:   { lo: 91, hi: 260, nmax: 260 }'],
  /* ⚠ There is no clamp to poison any more: the draw expression is
     exactly [lo+1, hi-1], so the defensive clamp that used to follow it
     was DEAD and the harness proved it by being unable to kill it. */
  ['the draw ignores the band floor', 'var n = b.lo + 1 + Math.floor(rnd() * (b.hi - b.lo - 1));',
    'var n = 5 + Math.floor(rnd() * (b.hi - b.lo - 1));'],
  ['chips sized from the drawn N', 'return GEO.D_COEF * Math.sqrt((GEO.MAT_W * GEO.MAT_H) / b.nmax);',
    'return GEO.D_COEF * Math.sqrt((GEO.MAT_W * GEO.MAT_H) / 60);'],
  ['the shelf loses a slot', 'CUP_SLOTS: 9,', 'CUP_SLOTS: 4,'],
  ['the readout loses a slot', 'SLOT_CX: [426, 500, 574],', 'SLOT_CX: [462, 538],'],

  /* --- strings ---------------------------------------------------- */
  /* ⚠ SELF-ANCHORED on the string itself, not on the surrounding
     object shape. The first versions encoded `key: { en: '...' },` and
     went blind the moment `apply-` rewrote the block for eleven
     locales — the recorded half-life trap. The harness THROWS on a
     missing needle rather than skipping, which is how this was caught. */
  ['a band label leaks a number', "en: 'A heap'", "en: 'A heap of 60'"],
  ['the instruction prints a digit', "A cup holds ten and shuts itself", "A cup holds 10 and shuts itself"],
  ['an operator glyph reaches the strings', "en: 'Put one more on the mat'",
    "en: 'Put + one more on the mat'"],
  ['a string is emptied', "en: 'The open cup'", "en: ''"],
  ['the density band gets finer', "if (m <= 24) return 'denseFew';", "if (m <= 24) return 'denseFew'; if (m === 25) return 'x25';"]
];

function run(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { COUNTING_CUPS_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 30000
    });
    return 'PASS';
  } catch (e) {
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) return 'TIMEOUT';
    return 'FAIL';
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ccp-mut-'));
/* carry the whole directory, so a future data file travels too */
const srcDir = path.dirname(SRC);
for (const f of fs.readdirSync(srcDir)) {
  const fp = path.join(srcDir, f);
  if (fs.statSync(fp).isFile()) fs.copyFileSync(fp, path.join(tmp, f));
}
const target = path.join(tmp, 'counting-cups.js');

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
  const hits = ORIGINAL.split(find).length - 1;
  if (hits === 0) {
    faults++;
    console.log('  ⚠ FAULT  ' + label + ' — needle not found, the mutation never ran');
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
