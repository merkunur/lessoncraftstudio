/* =====================================================================
   mutate-cold-line.js — does verify-cold-line.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-cold-line.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ FIVE RECORDED LESSONS BUILT IN:
     1. CARRY every data file the gate reads into the temp dir.
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED — hence the cap, and hence
        verify- doing zero browser work.
     4. NEEDLES ANCHOR ON CODE, never on generated formatting (the
        locale apply script re-pads the strings block every run).
     5. A NEEDLE THAT MISSES IS A HARNESS FAULT TOO. A half-applied
        poison proves nothing — that cost a whole round on #42's print
        gate, where one needle omitted a stroke-dasharray and only 8 of
        16 shapes went dark.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');

/* ⚠⚠ NORMALISE THE LINE ENDINGS BEFORE SEARCHING, OR EVERY MULTI-LINE
   NEEDLE CAN GO BLIND WITHOUT ONE OF THEM BEING WRONG.
   The recorded lesson says "never edit a repo file through Python text
   mode", because io.open(p,'w') rewrites \n as \r\n on Windows and
   broke eleven needles at once. That rule would not have prevented
   this: the CRLF arrived through `git checkout -- "mini tools/
   cold-line.js"`, which restores the working copy through
   core.autocrlf. SEVEN needles missed, the tool was entirely correct,
   and the only reason it did not read as seven passing mutations is
   that this harness counts a missing needle as a FAULT rather than a
   kill.
   So the fix belongs HERE, not in the working copy. A needle that
   misses because of a line ending is a defect of the harness, and a
   harness must not be able to have it. */
const SRC = fs.readFileSync(path.join(TOOLS, 'cold-line.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = ['cold-line-sets.json'];
const TIMEOUT = 30000;

const M = [
  /* ---- linearity across zero — the classic art bug ------------------ */
  ['the scale squashes below zero', 'return this.BOT - (v - s.lo) * this.unit();',
    'return v < 0 ? this.BOT - (v - s.lo) * this.unit() * 0.8 : this.BOT - (v - s.lo) * this.unit();'],
  ['zero is pinned and the window ignored', 'return this.BOT - (v - s.lo) * this.unit();',
    'return this.BOT - v * this.unit();'],
  ['the scale reflects at zero', 'return this.BOT - (v - s.lo) * this.unit();',
    'return this.BOT - Math.abs(v - s.lo) * this.unit();'],
  ['one gap is short — a single-interval squash', 'return this.BOT - (v - s.lo) * this.unit();',
    'return this.BOT - (v - s.lo) * this.unit() + (v === 0 ? 3 : 0);'],
  ['the unit becomes a float', '    BOT: 860,', '    BOT: 859,'],
  ['the axis no longer divides evenly', '    WINDOW: 21,', '    WINDOW: 22,'],
  ['the arena stops being square', '    H: 1000,', '    H: 900,'],

  /* ---- the liquid — invisible to every tick-linearity check ---------- */
  ['the LIQUID is squashed while the ticks stay linear',
    '      if (top > hiV) top = hiV;\n      return { from: floor, to: top };',
    '      if (top > hiV) top = hiV;\n      return { from: floor, to: floor + (top - floor) * 0.8 };'],
  ['the liquid is clipped in PIXELS, not values', '      if (top > hiV) top = hiV;', ''],
  ['the liquid draws when there is nothing to draw', '      if (top <= floor) return null;', ''],

  /* ---- the span ------------------------------------------------------ */
  ['the span drops its absolute value', 'spanOf: function (st) { var s = this._st(st); return Math.abs(s.a - s.b); },',
    'spanOf: function (st) { var s = this._st(st); return s.a - s.b; },'],
  ['the span is off by one', 'return Math.abs(s.a - s.b); },', 'return Math.abs(s.a - s.b) + 1; },'],
  ['the span is stored in the state', "return { lo: -12, a: -5, b: 3, tipped: false }; },",
    "return { lo: -12, a: -5, b: 3, tipped: false, span: 8 }; },"],
  /* ⚠ the first needle here spanned a COMMENT and silently missed. A
     needle that does not hit is a harness fault, not a skip — anchor on
     code alone. */
  ['hiOf stops being three-valued at equality', 'if (s.a === s.b) return null;          /* three-valued, by design */', ''],

  /* ---- ⭐ the tip ----------------------------------------------------- */
  ['the tip turns the other way — the line runs right-to-left',
    'return this._st(st).tipped ? { x: this.W - y, y: x } : { x: x, y: y };',
    'return this._st(st).tipped ? { x: y, y: this.H - x } : { x: x, y: y };'],
  ['the tip becomes a REFLECTION, not a rotation',
    'return this._st(st).tipped ? { x: this.W - y, y: x } : { x: x, y: y };',
    'return this._st(st).tipped ? { x: y, y: x } : { x: x, y: y };'],
  ['the tip scales as well as turns',
    'return this._st(st).tipped ? { x: this.W - y, y: x } : { x: x, y: y };',
    'return this._st(st).tipped ? { x: (this.W - y) * 0.98, y: x } : { x: x, y: y };'],
  ['the inverse stops being an inverse',
    'return this._st(st).tipped ? { x: Y, y: this.W - X } : { x: X, y: Y };',
    'return this._st(st).tipped ? { x: this.W - Y, y: X } : { x: X, y: Y };'],
  ['tip re-canonicalises the window by one', "tip: function (st) {\n      var s = this._st(st);\n      return { lo: s.lo, a: s.a, b: s.b, tipped: !s.tipped };",
    "tip: function (st) {\n      var s = this._st(st);\n      return { lo: this._clampLo(s.lo + 1), a: s.a, b: s.b, tipped: !s.tipped };"],
  ['tip becomes a no-op at one pose', 'return { lo: s.lo, a: s.a, b: s.b, tipped: !s.tipped };',
    'return { lo: s.lo, a: s.a, b: s.b, tipped: s.tipped ? true : true };'],

  /* ---- the controls -------------------------------------------------- */
  ['⭐ findZero goes DEAD in the opening state', '    newState: function () { return { lo: -12, a: -5, b: 3, tipped: false }; },',
    '    newState: function () { return { lo: -10, a: -5, b: 3, tipped: false }; },'],
  ['findZero stops bringing zero into view', 'var lo = -Math.floor((this.WINDOW - 1) / 2);', 'var lo = this.DMIN;'],
  ['sliding the scale DRAGS the marks with it', 'return { lo: lo, a: s.a, b: s.b, tipped: s.tipped };\n    },\n\n    /* The scale is dragged',
    'return { lo: lo, a: s.a + 1, b: s.b, tipped: s.tipped };\n    },\n\n    /* The scale is dragged'],
  ['setting a mark moves the window', 'var n = { lo: s.lo, a: s.a, b: s.b, tipped: s.tipped };\n      n[which] = v;',
    'var n = { lo: this._clampLo(s.lo + 1), a: s.a, b: s.b, tipped: s.tipped };\n      n[which] = v;'],
  ['setMark clamps where it should refuse', 'if (v < this.DMIN || v > this.DMAX) return null;\n      if (v === s[which]) return null;',
    'v = Math.max(this.DMIN, Math.min(this.DMAX, v));\n      if (v === s[which]) return null;'],
  ['setMark accepts a no-op', 'if (v === s[which]) return null;', ''],
  ['setMark accepts an unknown mark', "if (which !== 'a' && which !== 'b') return null;", ''],
  ['setMark trusts NaN', "if (typeof v !== 'number' || !isFinite(v)) return null;\n      v = Math.round(v);",
    "v = Math.round(v);"],
  ['slideTo clamps instead of refusing', 'if (lo < this.DMIN || lo > this.loMax()) return null;\n      if (lo === s.lo) return null;',
    'lo = this._clampLo(lo);\n      if (lo === s.lo) return null;'],
  ['slideBy grows a SECOND band rule', 'return this.slideTo(s, this._clampLo(s.lo + Math.round(dv)));',
    'var lo = s.lo + Math.round(dv);\n      if (lo < this.DMIN) lo = this.DMIN;\n      return { lo: lo, a: s.a, b: s.b, tipped: s.tipped };'],
  ['the window may run past the domain', 'loMax: function () { return this.DMAX - this.WINDOW + 1; },',
    'loMax: function () { return this.DMAX; },'],

  /* ---- totality ------------------------------------------------------ */
  ['the totality guard is dropped', "if (st === null || typeof st !== 'object') return this.newState();", ''],
  ['_st stops rounding', 'var lo = this._int(st.lo, d.lo);', 'var lo = (typeof st.lo === \'number\' && isFinite(st.lo)) ? st.lo : d.lo;'],
  ['_st clamps a mark into the WINDOW, killing totality', 'if (a < this.DMIN) a = this.DMIN;', 'if (a < lo) a = lo;'],
  ['_st trusts a truthy `tipped`', 'tipped: st.tipped === true', 'tipped: !!st.tipped || st.tipped === undefined'],
  ['_int trusts NaN', "if (typeof v !== 'number' || !isFinite(v)) return dflt;", "if (typeof v !== 'number') return dflt;"],
  ['inView is off by one', 'return v >= s.lo && v <= s.lo + this.WINDOW - 1;', 'return v >= s.lo && v <= s.lo + this.WINDOW;'],

  /* ---- the refusals --------------------------------------------------- */
  ['a HYPHEN replaces the minus sign', "t.textContent = (v < 0 ? '−' : '') + Math.abs(v);", "t.textContent = String(v);"],
  ['a degree sign enters an authored string', 'title: { en: "Upright and Flat" }', 'title: { en: "Upright and Flat °" }'],
  ['a digit enters an authored string', 'zeroBtn: { en: "Zero to the middle" }', 'zeroBtn: { en: "Find zero 0" }'],
  ['the tool starts ASKING', 'tipBtn: { en: "Lay it down" }', 'tipBtn: { en: "How cold is it?" }'],
  ['weather vocabulary enters a string', 'nextBtn: { en: "Another place" }', 'nextBtn: { en: "Another snow setting" }'],
  ['the tool declares tasks', "    id: 'cold-line',", "    id: 'cold-line',\n    tasks: [],"],
  ['a verdict field enters the source', "    STORE_KEY: 'lcs:cold-line:v1',", "    correct: 1,\n    STORE_KEY: 'lcs:cold-line:v1',"],

  /* ---- the repertoire -------------------------------------------------- */
  ['entitlement stops filtering the book', 'for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);',
    'for (i = 0; i < all.length; i++) out.push(all[i]);'],
  ['the offline fallback degrades to nothing', 'FREE_SETTINGS: 5,', 'FREE_SETTINGS: 0,']
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cld-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'cold-line.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-cold-line.js')], {
      env: Object.assign({}, process.env, { CLD_TOOL_DIR: tmp }),
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
