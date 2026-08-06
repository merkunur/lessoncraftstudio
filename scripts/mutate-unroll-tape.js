/* =====================================================================
   mutate-unroll-tape.js — does verify-unroll-tape.js actually BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-unroll-tape.js

   A green gate proves nothing until it has been shown to go red. Each
   mutation is a plausible defect — the kind a refactor introduces, not a
   random character swap. EVERY ONE MUST BE KILLED.

   ⚠ FOUR RECORDED LESSONS ARE BUILT IN:
     1. THE HARNESS CARRIES EVERY DATA FILE THE GATE READS into the temp
        dir. verify- opens unroll-tape-shapes.json; without the copy it
        errors for the wrong reason and every mutation "dies" untested.
     2. AN INERT MUTATION IS A BAD MUTATION. A needle that does not
        appear, or a patch that leaves the file byte-identical, is a
        HARNESS FAULT reported as a failure — never a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED. Each run is capped.
     4. NEEDLES ARE ANCHORED ON CODE, NOT ON GENERATED FORMATTING. A
        needle keyed on the strings block's alignment goes stale every
        time the locale generator re-pads it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'unroll-tape.js'), 'utf8');
const CARRY = ['unroll-tape-shapes.json'];      /* lesson 1 */
const TIMEOUT = 120000;                          /* lesson 3 */

const M = [
  /* ---- V2/V3 THE ARC LENGTH ---------------------------------------- */
  ['the chord uses taxicab distance', 'L += Math.hypot(q[0] - p[0], q[1] - p[1]);',
    'L += Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]);'],
  ['the chord forgets the square root', 'L += Math.hypot(q[0] - p[0], q[1] - p[1]);',
    'L += (q[0] - p[0]) * (q[0] - p[0]) + (q[1] - p[1]) * (q[1] - p[1]);'],
  ['the outline loop stops one short', 'for (i = 0; i < pts.length; i++) {\n        var p = pts[i], q = pts[(i + 1) % pts.length];',
    'for (i = 0; i < pts.length - 1; i++) {\n        var p = pts[i], q = pts[(i + 1) % pts.length];'],
  ['the closing segment is counted twice', 'cum.push(L);', 'cum.push(L); if (i === pts.length - 1) L += 0.0001;'],

  /* ---- THE KNOTS (the defect this build actually had) --------------- */
  ['the parametrisation seam is dropped from the knots', 'var cuts = [0, ((-uB) % 1 + 1) % 1];', 'var cuts = [0];'],
  ['a family forgets its corners', "}, knots: [1 / 3, 2 / 3]", "}, knots: []"],
  ['the cut-merge epsilon swallows real knots', 'var eps = 0.5 / this.N;', 'var eps = 0.2;'],

  /* ---- B, THE GUIDE'S ORIGIN ---------------------------------------- */
  ['B is the HIGHEST point instead of the lowest', 'if (y < bv) { bv = y; bi = i; }', 'if (y > bv) { bv = y; bi = i; }'],
  ['the flat-bottom centre becomes an edge', 'uB = ((((lo2 + hi2) / 2) % M) + M) % M / M;', 'uB = lo2 / M;'],

  /* ---- THE VERTEX COUNT --------------------------------------------- */
  ['the sampler drifts off N', 'for (k2 = 0; have < this.N && order.length; k2++) { segN[order[k2 % order.length]]++; have++; }', ''],
  ['a segment gets one extra vertex', 'for (i = 0; i < n; i++) pts.push(f(((a0 + (b0 - a0) * i / n) + uB) % 1));',
    'for (i = 0; i <= n; i++) pts.push(f(((a0 + (b0 - a0) * i / n) + uB) % 1));'],

  /* ---- ⭐ THE GUIDE: LENGTH CONSERVATION ---------------------------- */
    ["the laid part stretches as it lays", "if (laid > 0) out.push([X0 + laid, this.BASE]);", "if (laid > 0) out.push([X0 + laid * 1.02, this.BASE]);"],
  ['the wrapped part keeps the whole outline', 'for (i = 0; i < o.pts.length; i++) if (o.cum[i] > sFrom) out.push(map(o.pts[i]));',
    'for (i = 0; i < o.pts.length; i++) out.push(map(o.pts[i]));'],
  ['the strand drops its arrival back at B', 'out.push(map(o.pts[0]));             /* arrive back at B */', ''],
  ['the peel reads arclength from the wrong end', 'var sFrom = o.L * s.t;', 'var sFrom = o.L * (1 - s.t);'],
  ['the laid part is measured in the wrong units', 'var laid = Lm * s.t;', 'var laid = o.L * s.t;'],

  /* ---- THE SCALE + THE READING -------------------------------------- */
  ['across is read from the analytic curve, not the polyline', 'R: L / (x1 - x0)', 'R: L / (x1 - x0) * 1.000002'],
  ['the scale is applied twice', 'var scale = A / o.across;\n      var Lm = o.L * scale;', 'var scale = A / o.across;\n      var Lm = o.L * scale * scale;'],
    ["the y axis stops flipping", "return [X0 + (p[0] - bx) * scale, self.BASE - (p[1] - by) * scale];", "return [X0 + (p[0] - bx) * scale, self.BASE + (p[1] - by) * scale];"],

  /* ---- THE SIZE BAND ------------------------------------------------- */
    ["the runway ceiling is dropped", "var byRunway = (this.RIGHT - this.PAD_L) / (o.R + o.fLeft + this.GUESS_ROOM);", "var byRunway = this.A_MAX;"],
    ["the height ceiling is dropped", "? (this.ASPECT_MAX * this.W - this.BELOW_FULL - this.HEAD) / o.tallR", "? this.A_MAX"],
    ["a size below the floor is accepted", "return Math.max(this.A_MIN, Math.min(hi, Math.round(hi * f)));", "return Math.round(hi * f);"],
  ['a no-op size change reports success', 'if (a === s.A) return null;', ''],

  /* ---- PURITY + TOTALITY --------------------------------------------- */
    ["setSize mutates its input", "    setSizeStep: function (st, o, i) {\n      var s = this._clone(st);", "    setSizeStep: function (st, o, i) {\n      var s = st;"],
  ['the totality guard is dropped', "return (st && typeof st === 'object' &&", 'return (st &&\n        false &&'],
  ['the state grows an undeclared field', 's.t = t;\n      return s;', 's.t = t;\n      s.lastT = t;\n      return s;'],

  /* ---- THE FLAG: gated in the MODEL, not by an attribute ------------- */
    ["the flag moves after the commit", "if (st.committed || st.t > 0) return null;", "if (st.t > 0) return null;"],
    ["the flag moves during the peel", "      if (st.committed || st.t > 0) return null;", "      if (st.committed) return null;"],
    ["the commit never fires", "if (t > 0) s.committed = true;", "if (t > 2) s.committed = true;"],

  /* ---- THE REFUSALS --------------------------------------------------- */
  ['a verdict word enters the source', "STORE_KEY: 'lcs:unroll-tape:v1',", "correct: 1,\n    STORE_KEY: 'lcs:unroll-tape:v1',"],
    ["the total is printed onto the stage", "el.textContent = String(i + 1);", "el.textContent = String(o.R.toFixed(2));"],
    ["a digit enters an authored string", "shelfLabel:    { en: \"Choose a shape\"", "shelfLabel:    { en: \"Choose 1 shape\""],
    ["the weave becomes a ruler", "+ '.urt-strand-core{stroke:#F2784B;stroke-width:5.5;}'", "+ '.urt-strand-core{stroke:#F2784B;stroke-width:5.5;stroke-dasharray:20 20;}'"],
    ["art is loaded onto the bench", "      var mini = self._svgEl('svg', { viewBox: '0 0 44 44', 'class': 'urt-mini', 'aria-hidden': 'true' });", "      var mini = self._svgEl('image', { href: '/image-library-webp/x.webp', 'class': 'urt-mini' });"],
  ['the tool declares tasks and becomes an activity', "    id: 'unroll-tape',", "    id: 'unroll-tape',\n    tasks: [],"],
  ['the tool starts POSTing somewhere', "fetch('/api/auth/me'", "fetch('/api/telemetry'"],
    ["the shape book becomes random", "      var made = mk(shape.params || {});", "      var made = mk(shape.params || {}); var _r = Math.random();"],

  /* ---- ENTITLEMENT + FALLBACK ---------------------------------------- */
  ['entitlement stops filtering the shelf', 'for (i = 0; i < all.length; i++) if (i < this.FREE_SHAPES || this.premium) out.push(all[i]);',
    'for (i = 0; i < all.length; i++) out.push(all[i]);'],
    ["the offline fallback degrades to nothing", "          self.data = (d && d.shapes && d.shapes.length) ? d : self.FALLBACK_SHAPES;", "          self.data = (d && d.shapes && d.shapes.length) ? d : { shapes: [] };"],

  /* ---- ⭐ DEAD STRINGS (V16 must see a branch made unreachable) ------- */
    ["the landed hint becomes unreachable", "        laid ? 'hintLanded' : (this.st.flags.length === 0 ? 'hintGuess' : 'hintUnroll'));", "        (this.st.flags.length === 0 ? 'hintGuess' : 'hintUnroll'));"],
    ["the guess hint becomes unreachable", "        laid ? 'hintLanded' : (this.st.flags.length === 0 ? 'hintGuess' : 'hintUnroll'));", "        laid ? 'hintLanded' : 'hintUnroll');"],
  ['the gate body becomes unreachable', "p.textContent = api.t('gateBody');", "p.textContent = '';"],
  /* ---- ⭐ THE FLAG AND THE RECORD. The audit found that NOTHING in
       this list removed the flag grip, the runway hit surface, the flag
       graphic or the print block — so a tool that rendered NO FLAG AT ALL
       was killed by nothing here, which is precisely what shipped. */
  ["⭐ THE FLAG HANDLE IS NEVER RENDERED", "        var b = api.el('button', 'urt-handle urt-flag');", "        var b = api.el('span', 'urt-nothing');"],
  ["⭐ the runway stops being a hit surface", "      strip.addEventListener('pointerdown', function (ev) { self._plantFrom(ev); });", "      strip.addEventListener('pointerdown', function () {});"],
  ["⭐ the flag graphic loses its cloth", "      var cloth = api.el('i', 'urt-fl-cloth');", "      var cloth = api.el('i', 'urt-fl-nothing');"],
  ["the print sheet block is removed", "      + '@media print{'", "      + '@media speech{'"],
  ["⭐ the paint memo outlives the node it describes", "      this._okey = null; this._skey = null;\n      stage.innerHTML = '';", "      stage.innerHTML = '';"],
  ["the record marks a GUESS instead of a landing", "      this.marks = this.addMark(this.marks, sh.k, o.R);", "      this.marks = this.addMark(this.marks, sh.k, (this.st.flags[0] || o.R));"],
  ["two marks at one place stop staggering", "          if (Math.abs(placed[j].x - x) < this.MINI_W + 4 && placed[j].row === row) { row++; j = -1; }", "          if (false) { row++; j = -1; }"],
  ["a fourth flag is accepted", "      if (s.flags.length >= this.MAX_FLAGS) return null;", "      if (s.flags.length >= 99) return null;"],
  ["the miniatures stop being one width", "    miniPoints: function (o, cx, baseY) {\n      if (!o) return [];\n      var s = this.MINI_W / o.across, out = [], i;", "    miniPoints: function (o, cx, baseY) {\n      if (!o) return [];\n      var s = this.MINI_W / o.tall, out = [], i;"],
  ["the runway stops outrunning the answer", "    GUESS_ROOM: 0.85,", "    GUESS_ROOM: 0,"]
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'urt-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0, browserKills = 0;
const BROWSER_TIMEOUT = 240000;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'unroll-tape.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-unroll-tape.js')], {
      env: Object.assign({}, process.env, { URT_TOOL_DIR: tmp }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'gate';
  }
  if (died && why === 'TIMEOUT') { survived.push(`${name} (the gate HUNG — that is a survival)`); continue; }
  if (died) { killed++; continue; }

  /* ⭐⭐ ESCALATE TO THE BROWSER. This harness ran ONLY the model gate, so
     every claim about the RENDER had zero mutation coverage — no needle
     removed the flag handle, the runway hit surface, the flag graphic or
     the print block, and a tool that drew NO FLAG AT ALL was killed by
     nothing here. That is exactly what shipped. Only verify-survivors pay
     the browser cost, so the common case stays fast. */
  let browserDied = false;
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'local-test-unroll-tape.js')], {
      env: Object.assign({}, process.env, { URT_TOOL_DIR: tmp }),
      timeout: BROWSER_TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    /* ⚠ A HANG IS A SURVIVAL, NOT A KILL — a gate that never finishes has
       judged nothing, and counting it as a kill is how a mutation slips. */
    if (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) {
      survived.push(`${name} (the browser gate HUNG — that is a survival)`);
      continue;
    }
    browserDied = true;
  }
  if (browserDied) { killed++; browserKills++; continue; }
  survived.push(name);
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) { }

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
console.log(`  ${browserKills} of those were killed ONLY by the browser gate — coverage this harness did not have`);
if (harness.length) { console.error('\nHARNESS FAULTS (a mutation that was never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (verify-unroll-tape.js does not see these):'); for (const s of survived) console.error('  ' + s); }
if (survived.length || harness.length) process.exit(1);
console.log('\nPASS — every mutation killed');
