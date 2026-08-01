/* =====================================================================
   mutate-comparison-planks.js — does verify-comparison-planks.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-comparison-planks.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ FOUR RECORDED LESSONS BUILT IN:
     1. CARRY every data file the gate reads into the temp dir.
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED — hence the cap, and hence
        verify- doing zero browser work.
     4. NEEDLES ANCHOR ON CODE, never on generated formatting (the
        locale apply script re-pads the strings block every run).
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'comparison-planks.js'), 'utf8');
const CARRY = ['comparison-planks-pairs.json'];
const TIMEOUT = 60000;

const M = [
  /* ---- the difference ---------------------------------------------- */
  ['the difference drops its absolute value', 'return Math.abs(s.a - s.b);', 'return s.a - s.b;'],
  ['the difference is off by one', 'return Math.abs(s.a - s.b);', 'return Math.abs(s.a - s.b) + 1;'],
  ['the difference is stored in the state', "return { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 };",
    "return { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0, d: 4 };"],

  /* ---- the role ----------------------------------------------------- */
  ['roleOf elects A at equality', "if (s.a === s.b) return null;\n      return s.a > s.b ? 'a' : 'b';", "return s.a >= s.b ? 'a' : 'b';"],
  ['roleOf names the shorter plank', "return s.a > s.b ? 'a' : 'b';", "return s.a > s.b ? 'b' : 'a';"],

  /* ---- ⭐ the payoff ------------------------------------------------ */
  ['the composite is summed from the wrong pieces', 'return this.X0 + this.K * (Math.min(s.a, s.b) + this.diffOf(s));',
    'return this.X0 + this.K * (Math.max(s.a, s.b) + this.diffOf(s));'],
  ['the composite loses the offcut', 'return this.X0 + this.K * (Math.min(s.a, s.b) + this.diffOf(s));',
    'return this.X0 + this.K * Math.min(s.a, s.b);'],
  ['the far line tracks the shorter plank', 'return this.X0 + this.K * Math.max(s.a, s.b);',
    'return this.X0 + this.K * Math.min(s.a, s.b);'],

  /* ---- the bracket --------------------------------------------------- */
  ['the bracket is anchored at the wall', 'return { x0: this.X0 + this.K * Math.min(s.a, s.b), x1: this.X0 + this.K * Math.max(s.a, s.b) };',
    'return { x0: this.X0, x1: this.X0 + this.K * Math.abs(s.a - s.b) };'],
  ['the bracket spans the whole longer plank', 'return { x0: this.X0 + this.K * Math.min(s.a, s.b), x1: this.X0 + this.K * Math.max(s.a, s.b) };',
    'return { x0: this.X0, x1: this.X0 + this.K * Math.max(s.a, s.b) };'],
  ['the bracket survives equal planks', "if (s.a === s.b) return null;\n      return { x0: this.X0 + this.K * Math.min", "return { x0: this.X0 + this.K * Math.min"],

  /* ---- the seat + the socket ---------------------------------------- */
  ['the seat is at the wall, not the shorter plank\'s end', 'seatX: function (st) { var s = this._st(st); return this.X0 + this.K * Math.min(s.a, s.b); }',
    'seatX: function (st) { var s = this._st(st); return this.X0; }'],
  ['the seat lands on the LONGER plank\'s row', 'seatY: function (st) { var s = this._st(st); return this.shortRowY(s.a, s.b); }',
    'seatY: function (st) { var s = this._st(st); return this.longRowY(s.a, s.b); }'],
  ['the dock tolerance widens to three units', 'dockTol: function () { return this.K; }', 'dockTol: function () { return this.K * 3; }'],

  /* ---- the band ------------------------------------------------------ */
  ['the band clamp is off by one low', 'if (n < 1 || n > this.N_MAX) return null;', 'if (n < 0 || n > this.N_MAX) return null;'],
  ['the band clamp is off by one high', 'if (n < 1 || n > this.N_MAX) return null;', 'if (n < 1 || n >= this.N_MAX) return null;'],
  ['setLen clamps instead of refusing', 'if (n < 1 || n > this.N_MAX) return null;', 'n = Math.min(this.N_MAX, Math.max(1, n));'],
  ['a no-op setLen reports success', 'if (n === s[which]) return null;', ''],
  ['K stops dividing the span exactly', '    K: 60,', '    K: 61,'],

  /* ---- purity + totality --------------------------------------------- */
  ['setLen mutates its input', 'setLen: function (st, which, v) {\n      var s = this._st(st);', 'setLen: function (st, which, v) {\n      var s = st;'],
  ['the totality guard is dropped', 'if (st === null || typeof st !== \'object\') return this.newState();', ''],
  ['_st stops repairing an impossible phase', 'if (a === b) phase = \'attached\';', ''],
  ['_st stops canonicalising the attached phase', "if (phase === 'attached') { dx = 0; dy = 0; }", ''],
  ['_int trusts NaN', "if (typeof v !== 'number' || !isFinite(v)) return dflt;", "if (typeof v !== 'number') return dflt;"],
  ['a reducer grows an undeclared field', 's.phase = \'lifting\';', 's.phase = \'lifting\'; s.wasLifted = true;'],

  /* ---- the freeze + the lock ------------------------------------------ */
  ['the planks unfreeze while the piece is out', "if (s.phase !== 'attached') return null;\n      if (typeof v !== 'number'", "if (typeof v !== 'number'"],
  ['beginLift succeeds on equal planks', 'if (s.a === s.b) return null;            /* there is no overhang */', ''],
  ['dx stops being locked while attached', 'nx = this.X0 + this.K * Math.min(s.a, s.b);\n        ny = Math.round', 'nx = Math.round(x);\n        ny = Math.round'],
  ['the free clamp squashes the piece against the wall', 'nx = Math.round(Math.min(this.RIGHT - this.K * d, Math.max(this.X0, x)));',
    'nx = Math.round(Math.min(this.RIGHT, Math.max(this.X0, x)));'],
  ['reattach leaves the drag coordinates behind', "s.phase = 'attached'; s.dx = 0; s.dy = 0;\n      return s;\n    },\n\n    /* the one-tap path", "s.phase = 'attached';\n      return s;\n    },\n\n    /* the one-tap path"],
  ['rounding moves out of the reducer', 'ny = Math.round(Math.min(this.FLOOR_Y, Math.max(this.homeY(s), y)));', 'ny = Math.min(this.FLOOR_Y, Math.max(this.homeY(s), y));'],

  /* ---- the plank geometry -------------------------------------------- */
  ['the planks stop sharing a start line', 'return { x: this.X0, y: which === \'a\' ? this.A_Y : this.B_Y, w: this.K * v, h: this.BAR_H };',
    'return { x: this.X0 + (which === \'b\' ? 12 : 0), y: which === \'a\' ? this.A_Y : this.B_Y, w: this.K * v, h: this.BAR_H };'],
  ['a plank\'s width depends on its partner', 'w: this.K * v, h: this.BAR_H };', 'w: this.K * v * (s.a > s.b ? 1 : 1.001), h: this.BAR_H };'],

  /* ---- the refusals ---------------------------------------------------- */
  ['a verdict word enters the source', "    STORE_KEY: 'lcs:comparison-planks:v1',", "    correct: 1,\n    STORE_KEY: 'lcs:comparison-planks:v1',"],
  ['the difference is written onto the stage', "this._numB.textContent = String(s.b);", "this._numB.textContent = String(d);"],
  ['a digit enters an authored string', 'en: "Another pair"', 'en: "Another pair 2"'],
  ['an equals sign enters an authored string', 'en: "The Planks"', 'en: "The Planks a=b"'],
  ['the tool declares tasks', "    id: 'comparison-planks',", "    id: 'comparison-planks',\n    tasks: [],"],
  ['the tool starts POSTing somewhere', "fetch('/api/auth/me'", "fetch('/api/telemetry'"],
  ['the pair book becomes random', "return { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 };",
    "return { a: 1 + Math.floor(Math.random() * 9), b: 9, phase: 'attached', dx: 0, dy: 0 };"],

  /* ---- entitlement + fallback ------------------------------------------ */
  ['entitlement stops filtering the book', 'for (i = 0; i < all.length; i++) if (i < this.FREE_PAIRS || this.premium) out.push(all[i]);',
    'for (i = 0; i < all.length; i++) out.push(all[i]);'],
  ['the offline fallback degrades to nothing', 'FREE_PAIRS: 5,\n    FALLBACK_PAIRS: {\n      version: 1, freeCount: 5,',
    'FREE_PAIRS: 5,\n    FALLBACK_PAIRS: {\n      version: 1, freeCount: 0,'],

  /* ---- ⭐ the sheet — the defect #40 and #41 shipped -------------------- */
  ['the print block disappears', "+ '@media print{'", "+ '@media screen and (min-width:99999px){'"],
  ['the sheet stops hiding the chrome in print', "  .lcs-header,.lcs-hint,.cmp-hint,.cmp-foot,.cmp-gate,.cmp-bench,.cmp-handle{display:none !important;}", ''],
  ['the printed planks become solid, with nothing to fill in', "+ '.cmp-p-plank{fill:none;stroke:#000;stroke-width:2.5;}'", "+ '.cmp-p-plank{fill:#000;}'"],
  ['print stops building a sheet first', 'self._buildSheet();', '']
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cmp-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'comparison-planks.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-comparison-planks.js')], {
      env: Object.assign({}, process.env, { CMP_TOOL_DIR: tmp }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'gate';
  }
  if (died && why === 'TIMEOUT') survived.push(`${name} (the gate HUNG — that is a survival)`);
  else if (died) killed++;
  else survived.push(name);
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) { }

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
if (harness.length) { console.error('\nHARNESS FAULTS (never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (the gate does not see these):'); for (const s of survived) console.error('  ' + s); }
if (survived.length || harness.length) process.exit(1);
console.log('\nPASS — every mutation killed');
