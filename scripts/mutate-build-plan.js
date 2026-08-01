/* =====================================================================
   mutate-build-plan.js — does verify-build-plan.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-build-plan.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ SIX RECORDED LESSONS BUILT IN:
     1. CARRY every data file the gate reads into the temp dir, or every
        mutation is "killed" by a missing file and the harness reports a
        clean sweep of nothing.
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED — hence the cap, and hence
        verify- doing zero browser work.
     4. NEEDLES ANCHOR ON CODE, never on generated formatting: the
        locale apply script re-pads the whole strings block every run.
        The four locale needles here are built by enNeedle() off the
        LIVE file, so they cannot go stale (four of #43's died the
        moment its block was rewritten for eleven locales).
     5. A NEEDLE THAT MISSES IS A HARNESS FAULT TOO.
     6. LINE ENDINGS. `git checkout` restores through core.autocrlf, and
        seven of #43's multi-line needles went blind after a plain
        checkout — the tool was entirely correct. The fix belongs here,
        not in the working copy: collapse \r\n before searching.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'build-plan.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = ['build-plan-sets.json'];
const TIMEOUT = 30000;

/* ⭐ SELF-ANCHORING LOCALE NEEDLES. Reads the CURRENT English value of
   `key` straight out of the live strings block, so the needle survives
   a re-pad. THROWS rather than returning null: a locale needle that
   cannot find its key is a fault to surface at load, not a mutation to
   drop quietly — dropping it shrinks the reported total while the run
   still says "every mutation killed". */
function enNeedle(key, replacement, name) {
  const re = new RegExp(key + ':\\s*\\{\\s*en:\\s*"((?:[^"\\\\]|\\\\.)*)"');
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const from = m[0];
  const to = from.slice(0, from.length - m[1].length - 1) + replacement + '"';
  if (to === from) throw new Error(`enNeedle: "${key}" already reads "${replacement}" — the mutation would be INERT`);
  return [name, from, to];
}

const M = [
  /* ---- the projections ---------------------------------------------- */
  ['front reads rows instead of columns',
    'for (c = 0; c < n; c++) { m = 0; for (r = 0; r < n; r++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }',
    'for (c = 0; c < n; c++) { m = 0; for (r = 0; r < n; r++) if (s.h[c * n + r] > m) m = s.h[c * n + r]; o.push(m); }'],
  ['front takes the MINIMUM down a column', 'if (s.h[r * n + c] > m) m = s.h[r * n + c];', 'if (m === 0 || s.h[r * n + c] < m) m = s.h[r * n + c];'],
  ['front takes the LAST value, not the tallest', 'if (s.h[r * n + c] > m) m = s.h[r * n + c];', 'm = s.h[r * n + c];'],
  /* ⚠ this needle MISSED on its first run — I typed the shape I
     expected instead of the line that is there. Both loops are
     single-line; front's and side's bodies differ only in the index
     order, so the needle must carry the whole distinguishing line. */
  ['side takes the minimum along a row',
    'for (r = 0; r < n; r++) { m = 0; for (c = 0; c < n; c++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }',
    'for (r = 0; r < n; r++) { m = 0; for (c = 0; c < n; c++) if (m === 0 || s.h[r * n + c] < m) m = s.h[r * n + c]; o.push(m); }'],
  ['side is the front', 'for (r = 0; r < n; r++) { m = 0; for (c = 0; c < n; c++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }',
    'return this.front(st);'],

  /* ---- the turn ------------------------------------------------------ */
  ['the turn transposes instead of rotating', 'out[c * n + (n - 1 - r)] = s.h[r * n + c];', 'out[c * n + r] = s.h[r * n + c];'],
  ['the turn goes the other way', 'out[c * n + (n - 1 - r)] = s.h[r * n + c];', 'out[(n - 1 - c) * n + r] = s.h[r * n + c];'],
  ['the turn is a mirror, so rot^4 is still identity but the carry law breaks',
    'out[c * n + (n - 1 - r)] = s.h[r * n + c];', 'out[r * n + (n - 1 - c)] = s.h[r * n + c];'],
  ['the turn does nothing at all', 'for (r = 0; r < n; r++) for (c = 0; c < n; c++) out[c * n + (n - 1 - r)] = s.h[r * n + c];\n      return { h: out };',
    'return { h: s.h.slice() };'],

  /* ---- totality ------------------------------------------------------ */
  ['the totality guard trusts the caller', "var src = (st && typeof st === 'object' && Object.prototype.toString.call(st.h) === '[object Array]')\n        ? st.h : d.h;",
    'var src = (st && st.h) ? st.h : d.h;'],
  ['NaN survives the guard', "if (typeof v !== 'number' || !isFinite(v)) v = 0;", "if (typeof v !== 'number') v = 0;"],
  ['heights are not rounded', 'v = Math.round(v);', ''],
  ['the ceiling is not applied', 'if (v > this.HMAX) v = this.HMAX;\n        out.push(v);', 'out.push(v);'],
  ['the floor is not applied', 'if (v < 0) v = 0;\n        if (v > this.HMAX)', 'if (v > this.HMAX)'],

  /* ---- the refusals -------------------------------------------------- */
  ['setHeight clamps where it should refuse', 'if (v !== Math.round(v) || v < 0 || v > this.HMAX) return null;',
    'if (v !== Math.round(v)) return null; if (v < 0) v = 0; if (v > this.HMAX) v = this.HMAX;'],
  ['setHeight accepts a no-op', 'if (s.h[i] === v) return null;', ''],
  ['setHeight accepts an off-grid row', 'if (r < 0 || c < 0 || r >= this.N || c >= this.N) return null;\n      if (v !== Math.round(v)', 'if (v !== Math.round(v)'],
  ['setHeight trusts NaN', "if (!isFinite(r) || !isFinite(c) || !isFinite(v)) return null;", ''],
  ['⭐ bump WRAPS at the ceiling — the #39 defect, re-armed', 'if (v > this.HMAX) v = this.HMAX;\n      return this.setHeight(s, r, c, v);',
    'if (v > this.HMAX) v = 0;\n      return this.setHeight(s, r, c, v);'],
  ['bump wraps at the floor', 'if (v < 0) v = 0;\n      if (v > this.HMAX) v = this.HMAX;\n      return this.setHeight(s, r, c, v);',
    'if (v < 0) v = this.HMAX;\n      if (v > this.HMAX) v = this.HMAX;\n      return this.setHeight(s, r, c, v);'],
  ['bump stops composing setHeight, so there are two clamp rules', 'return this.setHeight(s, r, c, v);', 's.h[r * this.N + c] = v; return s;'],

  /* ---- the ambiguity, and the chip that depends on it ---------------- */
  ['the tallest member is a maximum, not a minimum', 'out[r * n + c] = Math.min(f[c], sd[r]);', 'out[r * n + c] = Math.max(f[c], sd[r]);'],
  ['the tallest member reads the wrong axis', 'out[r * n + c] = Math.min(f[c], sd[r]);', 'out[r * n + c] = Math.min(f[r], sd[c]);'],
  /* ⭐⭐ THE MUTATION I FIRST WROTE HERE WAS NOT A DEFECT, AND THAT IS
     THE FINDING. `t.h[i] -= 2` survived — correctly. If lowering a cell
     by 1 preserves both maxima then lowering it to ANY smaller value
     does too, because the maximum is attained elsewhere; and _st clamps
     a negative back to 0. So -=1 and -=2 are behaviourally identical
     and the mutation was inert-in-effect, not a gate hole. Measure
     before you accuse the gate. RAISING a cell is a real defect: it
     pushes past min(front,side), so _keeps always fails and the payoff
     chip goes dead on every building. */
  ['isAmbiguous RAISES instead of lowering, so the chip dies everywhere', 't.h[i] -= 1;', 't.h[i] += 1;'],
  ['isAmbiguous skips the zero guard and reports ambiguity everywhere', 'if (top.h[i] === 0) continue;', ''],
  ['isAmbiguous always says yes — the chip would never go dead', 'return false;\n    },\n\n    /* another building', 'return true;\n    },\n\n    /* another building'],
  ['_keeps compares only the front', 'if (a[i] !== f[i] || b[i] !== sd[i]) return false;', 'if (a[i] !== f[i]) return false;'],
  ['_keeps always agrees', 'if (a[i] !== f[i] || b[i] !== sd[i]) return false;', ''],
  ['another() returns a building with DIFFERENT directions', 'if (this._keeps(t, f, sd)) offer(t);', 'offer(t);'],
  ['⭐ another() can hand back the building you already had', 'var offer = function (x) { if (x.h.join(',') !== cur) pool.push(x); };', 'var offer = function (x) { pool.push(x); };'],
  ['another() returns null on ambiguous pairs too', 'if (!pool.length) return null;', 'return null;'],
  ['another() is not total in its pick', "if (typeof pick !== 'number' || !isFinite(pick) || pick < 0 || pick >= 1) pick = 0;", ''],

  /* ---- the cubes and the paint order --------------------------------- */
  ['⭐ the paint order reverts to the primitive\'s z/y/x loop, wrong for a ragged build', 'out.sort(function (a, b) { return a.d - b.d; });', 'out.sort(function (a, b) { return a.z - b.z; });'],
  ['the paint order is reversed, so the back is drawn over the front', 'out.sort(function (a, b) { return a.d - b.d; });', 'out.sort(function (a, b) { return b.d - a.d; });'],
  ['the paint order is not applied at all', 'out.sort(function (a, b) { return a.d - b.d; });', ''],
  ['the depth key drops the height', 'd: c + r + z });', 'd: c + r });'],
  ['a column draws one cube too many', 'for (z = 0; z < s.h[r * n + c]; z++)', 'for (z = 0; z <= s.h[r * n + c]; z++)'],
  ['a column draws one cube too few', 'for (z = 0; z < s.h[r * n + c]; z++)', 'for (z = 1; z < s.h[r * n + c]; z++)'],
  ['the cubes come out under the wrong column', 'out.push({ x: c, y: r, z: z, d: c + r + z });', 'out.push({ x: r, y: c, z: z, d: c + r + z });'],

  /* ---- the projection itself ----------------------------------------- */
  ['the projection stops being a projection — z no longer collapses', 'y: oy + (x + y) * SIN * u - z * u', 'y: oy + (x + y) * SIN * u - z * u * 0.9'],
  ['the two horizontal axes stop being mirror images', 'x: ox + (x - y) * COS * u', 'x: ox + (x + y) * COS * u'],
  ['SIN is no longer a half, so the view ray is not (1,1,1)', 'var COS = 0.866, SIN = 0.5;', 'var COS = 0.866, SIN = 0.4;'],

  /* ---- the repertoire ------------------------------------------------ */
  ['entitlement stops filtering the book', 'for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);',
    'for (i = 0; i < all.length; i++) out.push(all[i]);'],
  ['the offline fallback degrades to nothing', 'FREE_SETTINGS: 5,', 'FREE_SETTINGS: 0,'],
  ['the free five lose their DETERMINED member', '{ h: [4, 4, 4, 0, 0, 0, 0, 0, 0] },', '{ h: [4, 4, 4, 1, 1, 1, 0, 0, 0] },'],
  /* ⚠ THE FIRST VERSION OF THIS MUTATION WAS ALSO NOT A DEFECT: it
     broke the symmetry of set[0] only, and set[4] is symmetric too, so
     "a FREE setting is turn-invariant" was still TRUE. The property
     held, so the gate was right to stay green. To test the claim you
     have to break it — every free set must lose its symmetry. */
  ['the free five lose EVERY turn-invariant member',
    '{ h: [1, 1, 1, 1, 1, 1, 1, 1, 1] },\n        { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },\n        { h: [0, 3, 0, 3, 3, 3, 0, 3, 0] },\n        { h: [4, 4, 4, 0, 0, 0, 0, 0, 0] },\n        { h: [4, 1, 4, 1, 1, 1, 4, 1, 4] }',
    '{ h: [1, 1, 1, 1, 1, 1, 2, 1, 1] },\n        { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },\n        { h: [0, 3, 0, 3, 3, 3, 0, 3, 1] },\n        { h: [4, 4, 4, 0, 0, 0, 0, 0, 0] },\n        { h: [4, 1, 4, 1, 1, 1, 4, 1, 3] }'],
  ['a fallback building breaks the height ceiling', '{ h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },', '{ h: [1, 2, 9, 1, 2, 3, 1, 2, 3] },'],

  /* ---- the shape of the tool ----------------------------------------- */
  ['the tool declares tasks', "    id: 'build-plan',", "    id: 'build-plan',\n    tasks: [],"],
  ['a verdict field enters the source', "    STORE_KEY: 'lcs:build-plan:v1',", "    correct: 1,\n    STORE_KEY: 'lcs:build-plan:v1',"],
  ['the stage starts drawing authored words instead of numerals', 'this._numEl[i].textContent = String(s.h[i]);', "this._numEl[i].textContent = api.t('title');"],

  /* ---- the authored strings (self-anchored) --------------------------- */
  enNeedle('instruction', 'How many cubes altogether? Write the total.', '⭐ the tool starts asking for a TOTAL — G3-346\'s question'),
  enNeedle('hintPlan', 'Work out the area of the base in square units.', 'the tool starts counting AREA'),
  enNeedle('hintTurn', 'Name the solid: is it a cube, a cone or a cylinder?', 'the tool starts naming SOLIDS'),
  enNeedle('hintSame', 'Well done, that is correct! Your score is 5.', 'a verdict enters an authored string')
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bpl-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'build-plan.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-build-plan.js')], {
      env: Object.assign({}, process.env, { BPL_TOOL_DIR: tmp }),
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

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* windows lock */ }

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
if (harness.length) { console.error('\nHARNESS FAULTS (never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (the gate does not see these):'); for (const s of survived) console.error('  ' + s); }
if (survived.length || harness.length) process.exit(1);
console.log('\nPASS — every mutation killed');
