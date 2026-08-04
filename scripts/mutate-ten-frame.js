/* =====================================================================
   mutate-ten-frame.js — does verify-ten-frame.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-ten-frame.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED, and every theorem in the gate must have at
   least one mutation aimed squarely at it.

   ⚠ THE RECORDED LESSONS, BUILT IN:
     1. CARRY every data file the gate reads into the temp dir, or every
        mutation is "killed" by a missing file and the harness reports a
        clean sweep of nothing.
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip. Two
        candidates were dropped while writing this file for exactly
        that reason — `full & ~m` -> `full ^ m` is provably identical
        while m is a subset of the field, and dropping the clamp inside
        setGeometry is shadowed by the mask `_st` applies on the next
        read. Neither is a gate hole; both are bad mutations.
     3. A GATE THAT HANGS COUNTS AS SURVIVED — hence the cap, and hence
        verify- doing zero browser work.
     4. NEEDLES ANCHOR ON THE LIVE FILE, never on a literal I typed from
        memory: `apply-ten-frame-locales.js` rewrites the whole strings
        block, and four of #43's needles died the moment it ran.
     5. A NEEDLE THAT MISSES IS A HARNESS FAULT TOO — it must be
        reported, never dropped, because a dropped needle shrinks the
        total while the run still says "every mutation killed".
     6. LINE ENDINGS. `git checkout` restores through core.autocrlf, and
        seven of #43's multi-line needles went blind after one. The fix
        belongs here: collapse \r\n before searching.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'ten-frame.js'), 'utf8').replace(/\r\n/g, '\n');
/* ⚠ the repertoire lands in step 6 of the build; when ten-frame-boards.json
   exists it goes here, or every mutation is killed by a missing file. */
const CARRY = [];
const TIMEOUT = 30000;

/* ⭐ SELF-ANCHORING LOCALE NEEDLES. Reads the CURRENT English value of
   `key` out of the live strings block, so the needle survives a re-pad.
   THROWS rather than returning null. */
function enNeedle(key, replacement, name) {
  const re = new RegExp(key + ":\\s*\\{\\s*en:\\s*'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const from = m[0];
  const to = from.slice(0, from.length - m[1].length - 1) + replacement + "'";
  if (to === from) throw new Error(`enNeedle: "${key}" already reads "${replacement}" — the mutation would be INERT`);
  return [name, from, to];
}
/* the same, for a non-English locale — the verdict ban is checked
   against each locale's OWN vocabulary, so it needs its own needle */
function locNeedle(key, loc, replacement, name) {
  const re = new RegExp(key + ":\\s*\\{[^}]*?" + loc + ":\\s*'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error(`locNeedle: no ${loc} value for "${key}"`);
  const from = m[0];
  const to = from.slice(0, from.length - m[1].length - 1) + replacement + "'";
  if (to === from) throw new Error(`locNeedle: "${key}.${loc}" already reads that — INERT`);
  return [name, from, to];
}

const M = [
  /* ---- [V1] the geometry table --------------------------------------- */
  ['the ten-frame is 4 wide', "ten:         { panes: 1, cols: 5,  rows: 2, brk: [] },", "ten:         { panes: 1, cols: 4,  rows: 2, brk: [] },"],
  ['⭐ the Zwanzigerfeld loses its five-break', "twentyfield: { panes: 1, cols: 10, rows: 2, brk: [5] },", "twentyfield: { panes: 1, cols: 10, rows: 2, brk: [] },"],
  ['⭐ the five-break slides to column four', "twentyfield: { panes: 1, cols: 10, rows: 2, brk: [5] },", "twentyfield: { panes: 1, cols: 10, rows: 2, brk: [4] },"],
  ['the row of ten becomes a row of five', "tenrow:      { panes: 1, cols: 10, rows: 1, brk: [5] },", "tenrow:      { panes: 1, cols: 5, rows: 1, brk: [5] },"],
  ['two frames of ten become one', "twentypair:  { panes: 2, cols: 5,  rows: 2, brk: [] }", "twentypair:  { panes: 1, cols: 5,  rows: 2, brk: [] }"],
  ['a field that holds twelve enters the table', "    five:        { panes: 1, cols: 5,  rows: 1, brk: [] },", "    dozen:       { panes: 1, cols: 6,  rows: 2, brk: [] },\n    five:        { panes: 1, cols: 5,  rows: 1, brk: [] },"],
  ['the field list loses one', "var GEOM_KEYS = ['five', 'ten', 'tenrow', 'twentyfield', 'twentypair'];", "var GEOM_KEYS = ['five', 'ten', 'tenrow', 'twentyfield'];"],
  ['the two filling orders become one', "var ORDERS = ['rows', 'pairs'];", "var ORDERS = ['rows'];"],
  ['capOf forgets the second pane', 'return d.panes * d.cols * d.rows;', 'return d.cols * d.rows;'],
  ['fullMask is off by one', 'return cap ? ((1 << cap) - 1) : 0;', 'return cap ? (1 << cap) : 0;'],

  /* ---- [V3] T1, the complement ---------------------------------------- */
  ['⭐ the ghost is unbounded — it forgets the field', 'return this.fullMask(s.g) & ~s.m;', 'return ~s.m;'],
  ['⭐ the ghost is the occupied set', 'return this.fullMask(s.g) & ~s.m;', 'return s.m;'],
  ['⭐ the tray and the ghost disagree by one', 'return this.capOf(s.g) - this.count(s);', 'return this.capOf(s.g) - this.count(s) - 1;'],
  ['⭐ the tray mirrors the count instead of the room left', 'return this.capOf(s.g) - this.count(s);', 'return this.count(s);'],
  ['count measures the bit LENGTH, not the popcount', 'while (m) { m &= m - 1; n++; }', 'while (m) { m >>= 1; n++; }'],
  ['ghostList and occupiedList are the same list', 'for (i = 0; i < cap; i++) if (gm & (1 << i)) out.push(i);', 'for (i = 0; i < cap; i++) if (s.m & (1 << i)) out.push(i);'],

  /* ---- [V4] derived, never stored -------------------------------------- */
  ['⭐ the ghost gets a slot of its own to corrupt', "newState: function () { return { g: 'ten', m: 0, split: null }; },", "newState: function () { return { g: 'ten', m: 0, split: null, ghost: 0 }; },"],

  /* ---- [V5] T2, the tidy ----------------------------------------------- */
  ['⭐ Tidy does nothing at all', 's.m = this.canonicalMask(s.g, this.count(s));\n      return s;', 'return s;'],
  ['⭐ Tidy invents a counter', 's.m = this.canonicalMask(s.g, this.count(s));\n      return s;', 's.m = this.canonicalMask(s.g, this.count(s) + 1);\n      return s;'],
  ['the canonical set is off by one', 'return n ? ((1 << n) - 1) : 0;', 'return n ? ((1 << n) - 1) << 1 : 0;'],
  ['canonicalMask stops clamping to the field', 'if (n > cap) n = cap;', 'if (n > cap) n = n;'],
  ['isCanonical is always true', 'return s.m === this.canonicalMask(s.g, this.count(s));', 'return true;'],

  /* ---- [V6] the five-boundary and the two orders ------------------------ */
  ['⭐ the pair order never engages, so the setting is furniture', "if (order === 'pairs' && d.rows === 2) {", "if (order === 'pairs' && d.rows === 3) {"],
  ['⭐ the field fills column-major, so a five is no longer a line', 'r = Math.floor(k / d.cols);\n        c = k % d.cols;', 'r = k % d.rows;\n        c = Math.floor(k / d.rows);'],
  ['⭐ the pair order becomes the row order, so the two are the same lesson', 'r = k % 2;\n        c = Math.floor(k / 2);', 'r = Math.floor(k / d.cols);\n        c = k % d.cols;'],
  ['every counter is drawn in the first pane', 'pane = Math.floor(i / perPane);', 'pane = 0;'],
  ['upright stops transposing', 'if (upright) { t = r; r = c; c = t; }', 'if (upright) { t = r; r = r; c = c; }'],
  ['posOf guesses instead of refusing an ordinal outside the field', 'if (i < 0 || i >= d.panes * perPane) return null;', 'if (i < 0) return null;'],
  ['the breaks are dropped on the way out', 'return d.brk.slice();', 'return [];'],
  ['shapeOf ignores upright', "return upright\n        ? { panes: d.panes, cols: d.rows, rows: d.cols }\n        : { panes: d.panes, cols: d.cols, rows: d.rows };", 'return { panes: d.panes, cols: d.cols, rows: d.rows };'],

  /* ---- [V7] T4, the zero-regression tap --------------------------------- */
  ['⭐ tap is off by one, so one-touch-to-seven gives six', 's.m = s.m | ((1 << (i + 1)) - 1);', 's.m = s.m | ((1 << i) - 1);'],
  ['⭐ tapping a filled cell leaves it filled', 's.m = s.m & ((1 << i) - 1);', 's.m = s.m & ((1 << (i + 1)) - 1);'],
  ['⭐ tapping an empty cell wipes the counters already placed', 's.m = s.m | ((1 << (i + 1)) - 1);', 's.m = ((1 << (i + 1)) - 1);'],
  ['tap fills one cell instead of filling up to it', 's.m = s.m | ((1 << (i + 1)) - 1);', 's.m = s.m | (1 << i);'],

  /* ---- [V8] refusals, and the counters running out ----------------------- */
  /* ⚠ TWO MUTATIONS WERE REMOVED FROM THIS FILE AS PROVABLY SHADOWED,
     which is a BAD MUTATION and not a gate hole (#36's "three inert
     mutations in one small function"):
       · dropping `if (trayCount <= 0) return null` in place() — the
         tray is empty exactly when every cell is occupied, so the
         occupied guard on the very next line refuses anyway. Measured:
         trayCount(full) === 0 and ghostList(full).length === 0.
       · dropping `if (a === b) return null` in move() — carrying a
         counter to its own cell needs that cell to be occupied AND
         empty, so the destination guard refuses it.
     Both guards stay in the tool: they document the invariant and they
     stop being redundant the moment either neighbour is edited. The
     gate now ASSERTS the equivalence (V8), so a future reader cannot
     mistake one of them for load-bearing on its own. */
  ['place silently overwrites an occupied cell', 'if (s.m & (1 << i)) return null;                  /* occupied: refuse */', 'if (false) return null;'],
  ['lift adds a counter instead of removing one', 's.m = s.m & ~(1 << i);', 's.m = s.m | (1 << i);'],
  ['move duplicates the counter it carries', 's.m = (s.m & ~(1 << a)) | (1 << b);', 's.m = s.m | (1 << b);'],
  ['move accepts an occupied destination', 'if (s.m & (1 << b)) return null;                  /* destination taken */', 'if (false) return null;'],
  ['fillRest fills all but one', 's.m = this.fullMask(s.g);', 's.m = this.fullMask(s.g) >> 1;'],
  ['tap accepts a fractional ordinal', "if (typeof i !== 'number' || !isFinite(i) || i !== Math.round(i)) return null;\n      if (i < 0 || i >= cap) return null;\n      if (s.m & (1 << i))", "if (typeof i !== 'number') return null;\n      if (i < 0 || i >= cap) return null;\n      if (s.m & (1 << i))"],

  /* ---- [V2] totality ----------------------------------------------------- */
  ['an unknown field passes straight through', "g = (st && typeof st === 'object' && typeof st.g === 'string' && GEOM[st.g]) ? st.g : d.g;", "g = (st && typeof st === 'object' && typeof st.g === 'string') ? st.g : d.g;"],
  ['a mask keeps bits the field cannot hold', 'm = m & ((1 << cap) - 1);', 'm = m;'],
  ['a negative mask survives', 'if (m < 0) m = 0;', 'if (m < 0) m = m;'],
  ['the split escapes its range', 'if (split < 1 || split >= cap) split = null;', 'if (split < 1) split = null;'],

  /* ---- [V9] changing the field ------------------------------------------- */
  ['⭐ shrinking the field shifts every counter instead of keeping it', 's.m = s.m & ((1 << this.capOf(g)) - 1);', 's.m = (s.m >> 1) & ((1 << this.capOf(g)) - 1);'],
  ['setGeometry accepts an unknown field', 'if (!GEOM[g]) return null;', 'if (false) return null;'],
  ['setGeometry reports a no-op as a change', 'if (g === s.g) return null;                 /* a no-op is a refusal */', 'if (false) return null;'],

  /* ---- [V10] the shape of the tool ---------------------------------------- */
  ['the tool declares tasks, so the shell renders activity chrome', "    id: 'ten-frame',", "    id: 'ten-frame',\n    tasks: [],"],
  ['a verdict field enters the source', "    GEOM: GEOM,", "    isCorrect: function () { return true; },\n    GEOM: GEOM,"],
  ['a timer enters the source', "    GEOM: GEOM,", "    timer: null,\n    GEOM: GEOM,"],
  ['the tool starts reading the protected core', "    GEOM: GEOM,", "    borrowed: (typeof TenFrameCore !== 'undefined'),\n    GEOM: GEOM,"],

  /* ---- [V12] the per-locale geometry --------------------------------------- */
  ['⭐ the German Zwanzigerfeld ruling disappears', "de:        { single: 'ten', twenty: 'twentyfield' }", "de:        { single: 'ten', twenty: 'twentypair' }"],
  ['⭐ a locale asserts a school-system fact no panel has ruled', "de:        { single: 'ten', twenty: 'twentyfield' }", "de:        { single: 'ten', twenty: 'twentyfield' },\n    fi:        { single: 'tenrow', twenty: 'twentyfield' }"],
  ['the default field pair changes under every locale', "'default': { single: 'ten', twenty: 'twentypair' },", "'default': { single: 'tenrow', twenty: 'twentyfield' },"],

  /* ---- [V11] the authored strings (self-anchored) ---------------------------- */
  enNeedle('title', 'The Counting Boxes', '⭐⭐ the tool is renamed, losing an indexed head term'),
  enNeedle('instruction', 'How many counters are in the frame? Type your answer.', '⭐ the tool starts ASKING a question with an answer'),
  enNeedle('saidTidied', 'Tidied.', '⭐ the Tidy announcement stops stating the invariant'),
  enNeedle('gateBody', 'Well done — your score is 10 out of 10.', 'a verdict and a score enter an authored string'),
  locNeedle('fieldTwentyField', 'de', 'Zwanzigerfeld ­', 'a soft hyphen is typed into a German label'),
  locNeedle('instruction', 'fi', 'Vastasit oikein!', '⭐ a verdict enters a FINNISH string — the ban must read Finnish'),
  locNeedle('gateCta', 'no', 'Se Lærerplanen', '⭐ the paid plan is renamed to the LK20 curriculum'),
  locNeedle('title', 'de', 'Zwanzigerfeld', '⭐ the German name drifts to the other field')
];

/* the title mutation must not be shadowed by the fieldTen key, which
   legitimately carries the same German word — a needle that matches the
   wrong key would test nothing */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tnf-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'ten-frame.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-ten-frame.js')], {
      env: Object.assign({}, process.env, { TNF_TOOL_DIR: tmp }),
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
