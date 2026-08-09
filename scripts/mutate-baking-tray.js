/* =====================================================================
   mutate-baking-tray.js — does verify-baking-tray.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-baking-tray.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ SIX RECORDED LESSONS BUILT IN:
     1. CARRY every data file the gate reads into the temp dir, or every
        mutation is "killed" by a missing file and the harness reports a
        clean sweep of nothing. (This tool has no data file — it has no
        repertoire — so CARRY is empty ON PURPOSE, not by omission.)
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED — hence the cap, and hence
        verify- doing zero browser work and no unbounded loop.
     4. NEEDLES ANCHOR ON CODE, never on generated formatting: the
        locale apply script re-pads the whole strings block every run,
        so the locale needles are built by enNeedle() off the LIVE file.
     5. A NEEDLE THAT MISSES IS A HARNESS FAULT TOO — it THROWS, because
        a dropped needle shrinks the reported total while the run still
        says "every mutation killed".
     6. LINE ENDINGS. `git checkout` restores through core.autocrlf and
        multi-line needles go blind. Collapse \r\n before searching.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'baking-tray.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = [];
const TIMEOUT = 30000;

function enNeedle(key, replacement, name) {
  const re = new RegExp(key + ':\\s*\\{\\s*en:\\s*(["\'])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1');
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const q = m[1];
  const from = m[0];
  const to = from.slice(0, from.indexOf(q) + 1) + replacement + q;
  return [name, from, to];
}

const M = [
  /* ---- L1 CONSERVATION: the whole thesis ------------------------------ */
  ['⭐ a piece loses a row — the count no longer conserves',
    'if (st.axis === \'col\') out.push({ r0: 0, r1: st.rows, c0: at, c1: at + sp[i] });',
    'if (st.axis === \'col\') out.push({ r0: 0, r1: st.rows - 1, c0: at, c1: at + sp[i] });'],
  ['⭐ the last span is short by one, so a row vanishes at every crack',
    'out.push(lim - prev);', 'out.push(lim - prev - 1);'],
  ['a piece is one column wide regardless of the tray',
    'else out.push({ r0: at, r1: at + sp[i], c0: 0, c1: st.cols });',
    'else out.push({ r0: at, r1: at + sp[i], c0: 0, c1: 1 });'],
  ['the area sum double-counts the first piece',
    'for (i = 0; i < p.length; i++) t += (p[i].r1 - p[i].r0) * (p[i].c1 - p[i].c0);',
    'for (i = 0; i < p.length; i++) t += (p[i].r1 - p[i].r0) * (p[i].c1 - p[i].c0) + (i === 0 ? 1 : 0);'],
  ['the count is read off the wrong dimension',
    'count: function (st) { return st ? st.rows * st.cols : 0; },',
    'count: function (st) { return st ? st.rows * st.rows : 0; },'],

  /* ---- L2 THE NUMERAL LAW --------------------------------------------- */
  ['⭐ the spans no longer sum to the edge numeral',
    'for (i = 0; i < st.cuts.length; i++) { out.push(st.cuts[i] - prev); prev = st.cuts[i]; }',
    'for (i = 0; i < st.cuts.length; i++) { out.push(st.cuts[i] - prev + 1); prev = st.cuts[i]; }'],
  ['the cut axis is read the wrong way round, so the split is on the wrong dimension',
    'var lim = (st.axis === \'col\') ? st.cols : st.rows;\n      var out = [], prev = 0, i;',
    'var lim = (st.axis === \'col\') ? st.rows : st.cols;\n      var out = [], prev = 0, i;'],
  ['a cut produces one piece, not two',
    'out.push(lim - prev);\n      return out;', 'return out.length ? out : [lim];'],

  /* ---- L3 ISOMETRY: the geometry IS the conservation guarantee --------- */
  ['⭐⭐ the rotation stops swapping the dimensions',
    'return this._st({ hi: st.hi, rows: st.cols, cols: st.rows, q: st.q + 1, axis: null, cuts: [] });',
    'return this._st({ hi: st.hi, rows: st.rows, cols: st.cols, q: st.q + 1, axis: null, cuts: [] });'],
  /* ⭐⭐ THE CEILING DROPPED BY A MUTATOR — the worst defect this build
     had. With the 11-and-12 setting on, a 12x7 tray of eighty-four buns
     turned into seventy, because rotate/crack/push rebuilt the state
     without carrying `hi`. The census certified it for a hundred
     thousand assertions by never enumerating a tray above ten. */
  ['⭐⭐ the turn drops the tray\'s ceiling, so a 12-row tray silently loses two rows and fourteen buns',
    'return this._st({ hi: st.hi, rows: st.cols, cols: st.rows, q: st.q + 1, axis: null, cuts: [] });',
    'return this._st({ rows: st.cols, cols: st.rows, q: st.q + 1, axis: null, cuts: [] });'],
  ['the break drops the ceiling the same way',
    'return this._st({ hi: st.hi, rows: st.rows, cols: st.cols, q: st.q, axis: axis, cuts: cuts });',
    'return this._st({ rows: st.rows, cols: st.cols, q: st.q, axis: axis, cuts: cuts });'],
  ['the ceiling stops travelling on the state at all',
    'hi: hi,\n        rows: this._dim(o.rows, hi, 7),', 'rows: this._dim(o.rows, hi, 7),'],
  ['⭐⭐ THE PITCH STOPS BEING SYMMETRIC IN R AND C — so a quarter turn would resize every bun mid-flight, which is a Piagetian conservation failure induced by a layout optimisation',
    'return this.trayBox(st) / (Math.max(st.rows, st.cols) + SLACK);',
    'return this.trayBox(st) / (st.rows + SLACK);'],
  ['⭐ the deadband closes, so the middle of a bun breaks the seam beside it and the tray becomes one large button that always does something',
    'var NEAR = 0.40;', 'var NEAR = 0.50;'],
  ['the press radius collapses, so only a pixel-perfect hit on a seam works',
    'if (d > P * NEAR) return;', 'if (d > P * NEAR * 0.02) return;'],
  /* ⭐ THE AXIS LOCK, MUTATED WHERE IT ACTUALLY LIVES. The first version
     of this needle patched a guard inside `consider`, and it SURVIVED —
     not because the gate was blind but because that line was dead code:
     the two loops below were already guarded, so `consider` could never
     be reached with the wrong axis. The dead line has been deleted from
     the tool and the needle now hits the guard that does the work. */
  ['⭐ the nearest-seam resolver ignores the axis lock, so a press picks a PERPENDICULAR seam after the first crack',
    'if (!st.axis || st.axis === \'col\') {\n        for (i = 1; i <= this.seamCount(st, \'col\'); i++) {',
    'if (true) {\n        for (i = 1; i <= this.seamCount(st, \'col\'); i++) {'],
  ['the resolver stops preferring the nearer seam, so a press near seam 5 can break seam 4',
    'if (!best || d < best.d) best = { axis: axis, k: k, d: d, cracked: false };',
    'if (!best) best = { axis: axis, k: k, d: d, cracked: false };'],
  ['an open seam resolves to a second crack instead of the push',
    'if (this.canPush(st, best.k) && st.axis === best.axis) { best.cracked = true; return best; }', ''],
  ['four turns no longer return the tray',
    'q: this._q(o.q),', 'q: this._q(o.q) === 3 ? 1 : this._q(o.q),'],

  /* ---- L4 REFUSALS ----------------------------------------------------- */
  ['⭐ the PERPENDICULAR second crack becomes legal — four quadrants, which need notation this tool does not have',
    'if (st.axis && axis !== st.axis) return false;', 'if (false) return false;'],
  ['⭐ the THIRD crack becomes legal',
    'if (st.cuts.length >= MAX_CUTS) return false;', 'if (st.cuts.length >= MAX_CUTS + 1) return false;'],
  ['MAX_CUTS is raised, so the ceiling moves',
    'var MAX_CUTS = 2;', 'var MAX_CUTS = 3;'],
  ['a seam can be cracked twice',
    'for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] === k) return false;\n      return true;',
    'return true;'],
  ['seam 0 becomes legal, which would split nothing off the top',
    'if (k < 1 || k > this.seamCount(st, axis) ) return false;',
    'if (k < 0 || k > this.seamCount(st, axis) ) return false;'],
  ['a seam past the last row becomes legal',
    'return ((axis === \'col\') ? st.cols : st.rows) - 1;',
    'return ((axis === \'col\') ? st.cols : st.rows);'],
  ['⭐ ROTATE becomes legal on a cracked tray — the pieces\' shared dimension would change identity mid-argument',
    'canRotate: function (st) { return !!st && st.cuts.length === 0; },',
    'canRotate: function (st) { return !!st; },'],
  ['⭐ RESIZE becomes legal on a cracked tray, silently destroying two pieces to build a new one',
    'canResize: function (st) { return !!st && st.cuts.length === 0; },',
    'canResize: function (st) { return !!st; },'],
  ['a resize that changes nothing returns a state instead of a refusal',
    'if (r === st.rows && c === st.cols) return null;   /* a no-op is a refusal */',
    'if (false) return null;'],
  ['a fractional seam is accepted',
    'if (typeof k !== \'number\' || !isFinite(k) || k !== Math.round(k)) return false;',
    'if (typeof k !== \'number\' || !isFinite(k)) return false;'],
  ['pushing a seam that is not open silently returns a state',
    'push: function (st, k) {\n      if (!this.canPush(st, k)) return null;',
    'push: function (st, k) {\n      if (!this.canPush(st, k)) return this._st(st);'],

  /* ---- L5 REVERSIBILITY ------------------------------------------------ */
  ['⭐ the push does not restore the tray exactly',
    'for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] !== k) cuts.push(st.cuts[i]);',
    'for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] !== k) cuts.push(st.cuts[i] + 1);'],
  ['the push drops every cut, not the one asked for',
    'var cuts = [], i;\n      for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] !== k) cuts.push(st.cuts[i]);',
    'var cuts = [], i;'],
  /* ⚠ NOT MUTATED HERE, AND THIS IS A FINDING RATHER THAN A GAP.
     Changing push()'s `axis: cuts.length ? st.axis : null` to plain
     `st.axis` is SEMANTICALLY INERT, because _st() re-imposes
     axis-null-on-empty-cuts on the way out. That is genuine defence in
     depth, and the invariant that masks it IS mutation-tested (see "the
     clamp stops forcing axis-null"). Recording it rather than deleting
     it silently: a mutation that cannot fail is not evidence of a gate
     that works, and pretending otherwise inflates the score. */

  /* ---- the clamp: TOTAL, or it is not a clamp -------------------------- */
  ['the clamp stops sorting, so the spans come out negative',
    'out.cuts.sort(function (a, b) { return a - b; });', ''],
  ['duplicate cuts survive the clamp',
    'if (seen[v]) continue;\n        seen[v] = 1;', ''],
  ['the clamp lets the cut list grow past the ceiling',
    'if (out.cuts.length >= MAX_CUTS) break;', ''],
  ['⚠ the clamp stops forcing axis-null on an empty cut list — two sources of truth',
    'if (!out.cuts.length) out.axis = null;', ''],
  ['a dimension of zero survives the clamp',
    'if (v < this.MIN) return this.MIN;', 'if (v < 0) return 0;'],
  ['a dimension above the maximum survives',
    'if (v > hi) return hi;', 'if (v > hi + 5) return hi;'],
  ['a non-numeric dimension becomes NaN instead of the default',
    'if (typeof v !== \'number\' || !isFinite(v)) return dflt;', 'if (v === undefined) return dflt;'],
  ['the quarter-turn counter is no longer taken modulo four',
    'v = Math.round(v) % 4;', 'v = Math.round(v);'],
  ['a null state crashes a reader instead of returning empty',
    'spans: function (st) {\n      if (!st) return [];', 'spans: function (st) {'],

  /* ---- the geometry, which is a conservation claim --------------------- */
  ['⭐ the crack gap grows past a third of a bun, so a numeral could sit in it',
    'var GAP_F = 0.28;', 'var GAP_F = 0.42;'],
  ['the numeral reserve is removed, so the duplicated count has nowhere to ride',
    'var SLACK = 2.56;', 'var SLACK = 0.56;'],
  ['the gutter forgets the numeral lane, so the split numerals fall off the sheet',
    'gutter: function () { return NUM + EDGE; },', 'gutter: function () { return EDGE; },'],

  /* ---- the label that states its own consequence ----------------------- */
  ['⭐ the pad label announces the WHOLE tray\'s split instead of the piece it is in — so a screen-reader user is told the wrong two facts',
    'if (st.cuts[i] < k && st.cuts[i] > lo) lo = st.cuts[i];', ''],
  ['the pad label swaps the two pieces round',
    'return [k - lo, hi - k];', 'return [hi - k, k - lo];'],

  /* ---- the design law + the house traps -------------------------------- */
  /* ⚠ SELF-ANCHORED, because a needle that quotes the current text of
     what it mutates has a half-life: this one carried the old
     `{r} rows, {c} in each row` inline and went blind the moment the
     German panel's audit rewrote every scene string onto one
     construction with plural brackets. It THREW rather than skipping,
     which is the only reason it was a one-line fix. */
  enNeedle('sceneWhole', 'A tray of buns: {r} x {c}.',
    '⭐ an operator enters an authored string — and no reading of it is right in all eleven languages'),
  enNeedle('sceneCut2', 'Five rows of six equals thirty, altogether 42.',
    '⭐⭐ the total AND a word-operator enter a scene label — the glyph ban alone would not see either'),
  ['a vh unit enters the stylesheet',
    'max-width:1000px;}', 'max-width:80vh;}'],
  ['the liveness gate can no longer derive the class prefix',
    'api.el(\'div\', \'btr-wrap\')', 'api.el(\'div\', \'btrwrap\')'],
  ['the print block is deleted, so Print prints the whole web page',
    '@media print{', '@media screen and (min-width:99999px){'],
  ['⭐ the tray remembers its last size across reloads, so the teacher does not get the same first screen',
    'this.st = this.newState(7, 6);\n      this._fetchEntitlement();',
    'this.st = this.newState(9, 9);\n      this._fetchEntitlement();'],
  ['the entitlement becomes optimistic on an unknown tier',
    'premium: false,', 'premium: true,'],

  /* ---- the authored strings (self-anchored) ---------------------------- */
  enNeedle('instruction', 'Well done! Your score is 5 out of 5.', '⭐ a verdict and a score enter an authored string'),
  enNeedle('hintCut', 'Now you have two trays instead of one.', '⭐ a string denies the invariant the whole tool exists to show'),
  enNeedle('sceneCut2', 'A tray of buns: 5 x 6 plus 2 x 6 = 42.', '⭐⭐ the total AND two operators enter the scene label'),
  enNeedle('breakRow', 'Break after row {k}. This is the best place to break.', '⭐ the label starts recommending a seam — a covert grade')
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'btr-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

/* ⭐⭐ THE CONTROL, AND IT IS NOT A FORMALITY. This harness once reported
   "every mutation killed" while the gate was CRASHING on `document is not
   defined` — every mutation "died" for a reason that had nothing to do
   with the mutation, which is the recorded "a crashed gate masquerades as
   a failed one" defect. A poison run without a control cannot tell a gate
   that BITES from a gate that is simply broken. */
fs.writeFileSync(path.join(tmp, 'baking-tray.js'), SRC, 'utf8');
try {
  execFileSync(process.execPath, [path.join(__dirname, 'verify-baking-tray.js')], {
    env: Object.assign({}, process.env, { BTR_TOOL_DIR: tmp }),
    timeout: TIMEOUT, stdio: 'pipe'
  });
  console.log('control: the gate PASSES on unmutated source — every kill below is a real kill\n');
} catch (e) {
  console.error('CONTROL FAILED — the gate does not pass on the unmutated tool, so every "kill" is meaningless.');
  console.error(String((e.stderr || e.stdout || '').toString()).split('\n').slice(-6).join('\n'));
  process.exit(1);
}

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'baking-tray.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-baking-tray.js')], {
      env: Object.assign({}, process.env, { BTR_TOOL_DIR: tmp }),
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
