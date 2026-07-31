/* =====================================================================
   mutate-lids.js — does verify-lids.js actually BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-lids.js

   A green gate proves nothing until it has been shown to go red. Each
   mutation below is a plausible defect — the kind a refactor introduces,
   not a random character swap. EVERY ONE MUST BE KILLED.

   ⚠ THREE RECORDED LESSONS ARE BUILT IN:
     1. THE HARNESS MUST CARRY EVERY DATA FILE THE GATE READS into the
        temp dir. verify-lids.js opens lids-setups.json; if the copy is
        missing, V13 errors for the wrong reason and every mutation
        "dies" without being tested.
     2. AN INERT MUTATION IS A BAD MUTATION. If the needle does not
        appear, or the patch leaves the file byte-identical, that is a
        harness bug reported as a FAILURE — not a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED. Each run is capped.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'lids.js'), 'utf8');
const CARRY = ['lids-setups.json'];          /* lesson 1 */
const TIMEOUT = 30000;                        /* lesson 3 */

const M = [
  /* ---- V2 THE VALUE LOCK ---- */
  ['the share rounds up instead of down', 'return Math.floor(s.n / k);', 'return Math.ceil(s.n / k);'],
  ['the share is computed against the wrong divisor', 'return Math.floor(s.n / k);', 'return Math.floor(s.n / (k + 1));'],
  ['later lids take more than their share', 'if (out[lid].length < x) { out[lid].push(rows[r].j); break; }', 'if (out[lid].length < x + lid) { out[lid].push(rows[r].j); break; }'],
  ['the first lid takes everything it can reach', 'if (out[lid].length < x) { out[lid].push(rows[r].j); break; }', 'if (out[lid].length < (lid === 0 ? 99 : x)) { out[lid].push(rows[r].j); break; }'],
  ['the tidy pass swaps unevenly and breaks the counts', 'var t = out[a][ja]; out[a][ja] = out[b][jb]; out[b][jb] = t;', 'out[b].push(out[a][ja]); out[a].splice(ja, 1);'],

  /* ---- V5 DISJOINT + TOTAL ---- */
  ['a counter can end up under two lids', 'if (out[lid].length < x) { out[lid].push(rows[r].j); break; }', 'if (out[lid].length < x) { out[lid].push(rows[r].j); }'],
  ['an off-by-one puts a counter that does not exist under a lid', 'out[lid].push(rows[r].j); break;', 'out[lid].push(rows[r].j + 1); break;'],

  /* ---- V15 THE LID HOLDS WHAT IT HIDES ---- */
  ['the lid goes back to a fixed size', 'return Math.round(Math.max(this.MIN_R, r + this.C_R));', 'return 132;'],
  ['the lid is drawn smaller than its contents', 'return Math.round(Math.max(this.MIN_R, r + this.C_R));', 'return Math.round(Math.max(this.MIN_R, r));'],
  ['the packing holds fewer than the share', 'while (out.length < m) {', 'while (out.length < m - 1) {'],
  ['the rings crowd until the counters overlap', 'rad = ring * this.RING * this.C_R;', 'rad = ring * 1.2 * this.C_R;'],
  ['the packing loses its centre counter', "out.push({ dx: 0, dy: 0 });", ''],
  ['the lid is padded rather than measured', 'return Math.round(Math.max(this.MIN_R, r + this.C_R));', 'return Math.round(Math.max(this.MIN_R, r + this.C_R) + 90);'],
  ['the rings start one out, leaving a gap in the middle', 'out.push({ dx: 0, dy: 0 });', 'out.push({ dx: this.C_R, dy: 0 });'],
  ['the lift scatters the counters back instead of seating them', 'var pack = this.packing(this.share(s));', 'var pack = [];'],
  ['"Another lid" marches them into a heap again', 'var p = self._farPoint(self.st);\n      var next = self.addLid(self.st, p.cx, p.cy);', 'var k = self.st.lids.length;\n      var next = self.addLid(self.st, Math.round(self.W / (k + 2) * (k + 1)), Math.round(self.H / 2));'],

  /* ---- V1 CONSERVATION ---- */
  ['hidden forgets to multiply by the lid count', 'return s.lids.length * this.share(s);', 'return this.share(s);'],
  ['the leftover is swallowed', 'return s.n - this.hidden(s);', 'return 0;'],
  ['covered counters are still reported as on the table', 'for (i = 0; i < s.n; i++) if (!taken[i]) out.push(i);', 'for (i = 0; i < s.n; i++) out.push(i);'],

  /* ---- V4 UNREACHABILITY ---- */
  ['the reveal no longer waits for the lift', "if (!s.lifted) throw new Error('the lids are still down');", ''],
  ['a lifted table can be lifted again', 'lift: function (st) {\n    var s = this._clone(st);\n    if (s.lifted) return null;', 'lift: function (st) {\n    var s = this._clone(st);'],
  ['an empty table can be lifted', 'if (s.lids.length < 1) return null;\n    s.lifted = true;', 's.lifted = true;'],

  /* ---- V6 THE COMMITTED PRIOR ---- */
  ['the marker moves after the lids are up', 'var s = this._clone(st);\n    if (s.lifted) return null;\n    var g = Math.round(Number(v));', 'var s = this._clone(st);\n    var g = Math.round(Number(v));'],
  ['a refused guess carries the old state forward as a success', 'if (!isFinite(g) || g < 0 || g > this.PAID_MAX_TOTAL) return null;', 'if (!isFinite(g) || g < 0 || g > this.PAID_MAX_TOTAL) return s;'],
  ['tapping the same numeral no longer clears the marker', 's.guess = (s.guess === g) ? null : g;', 's.guess = g;'],

  /* ---- V10 DETERMINISM ---- */
  ['the scatter becomes unseeded', 'h = this._mix(s.seed, i);', 'h = Math.floor(Math.random() * 1e9);'],
  ['the distance ranking depends on sort stability', 'return a.d - b.d || a.i - b.i;', 'return a.d - b.d;'],
  ['the regret ordering depends on sort stability', 'return b.regret - a.regret || a.j - b.j;', 'return b.regret - a.regret;'],

  /* ---- V14 PURITY + REFUSALS ---- */
  ['a fifth lid is accepted', 'if (s.lids.length >= this.MAX_LIDS) return null;', ''],
  ['an out-of-range total is accepted', 'if (!isFinite(v) || v < this.MIN_TOTAL || v > this.PAID_MAX_TOTAL) return null;', ''],
  ['the total can be changed while the lids are down', 'if (s.lids.length) return null;\n    s.n = v;', 's.n = v;'],
  ['the clone shares its input\'s lid array', 'return { n: s.n, seed: s.seed, lids: lids,', 'return { n: s.n, seed: s.seed, lids: (s.lids || lids),'],
  ['the state grows an undeclared field', 's.lifted = true;\n    return s;', 's.lifted = true;\n    s.revealedAt = 1;\n    return s;'],
  ['the totality guard is dropped', 'return (st && typeof st === \'object\' &&', 'return (st &&\n      false &&'],

  /* ---- V8 / V9 THE LAW AND THE LOCALES ---- */
  ['a numeral is printed onto the table', "var pts = this.scatter(s);\n    var vis =", "var pts = this.scatter(s);\n    box.textContent = String(this.share(s));\n    var vis ="],
  ['a verdict word reaches a German string', 'de: "Legt zwei Deckel hin."', 'de: "Legt zwei Deckel hin. Richtig!"'],
  ['a verdict word reaches a Finnish string', 'fi: "Nostakaa kannet."', 'fi: "Nostakaa kannet. Oikein!"'],
  ['the brand word reaches a string', 'en: "The Lids"', 'en: "The Splat Lids"'],
  ['an invisible character is pasted into a string', 'sv: "Lyft locken"', 'sv: "Lyft​ locken"'],

  /* ---- V11 LABELS ARE TRUE ---- */
  ['the lift button is wired backwards', 'self.st.lifted ? self.lower(self.st) : self.lift(self.st)', 'self.st.lifted ? self.lift(self.st) : self.lower(self.st)'],
  ['the "another lid" button takes one away', "api.t('addLid')", "api.t('takeLid')"],

  /* ---- V7 NO VERDICT ---- */
  ['the tool starts marking the guess', 's.lifted = true;\n    return s;', 's.lifted = true;\n    s.correct = (s.guess === this.share(s));\n    return s;'],

  /* ---- V12 IDENTITY ---- */
  ['the tool declares tasks and becomes an activity', '  id: \'lids\',', '  id: \'lids\',\n  tasks: [],'],
  ['the tool starts POSTing somewhere', "fetch('/api/auth/me'", "fetch('/api/auth/me', { method: 'POST' }, "],
  ['the tool reaches into the class roster', "STORE_KEY: 'lcs:lids:v1',", "STORE_KEY: 'lcs:my-classes',"],

  /* ---- V13 THE TABLE BOOK ---- */
  ['the offline fallback degrades to nothing', "version: 1, freeMax: 8, premiumMax: 76,\n    setups: [", "version: 1, freeMax: 8, premiumMax: 76,\n    setups: [].concat([], ["],
  ['a paid setup leaks into the offline fallback', "{ id: 't-008', n: 20, k: 3, free: true }", "{ id: 't-008', n: 20, k: 3, free: false }"],
  ['entitlement stops filtering the book', 'if (all[i].free || this.premium) out.push(all[i]);', 'out.push(all[i]);']
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lids-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0, survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'lids.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-lids.js')], {
      env: Object.assign({}, process.env, { LID_TOOL_DIR: tmp }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'gate';
  }
  if (died && why === 'TIMEOUT') { survived.push(`${name} (the gate HUNG — that is a survival)`); }
  else if (died) { killed++; }
  else { survived.push(name); }
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
if (harness.length) { console.error('\nHARNESS FAULTS (a mutation that was never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (verify-lids.js does not see these):'); for (const s of survived) console.error('  ' + s); }
if (survived.length || harness.length) process.exit(1);
console.log('\nPASS — every mutation killed');
