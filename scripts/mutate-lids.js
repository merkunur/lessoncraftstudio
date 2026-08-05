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
  ['the lid goes back to a fixed size', 'return Math.ceil(Math.max(this.MIN_R, this._reach(this.packing(m)) + this.C_R) - 1e-9);', 'return 132;'],
  ['the lid is drawn smaller than its contents', 'return Math.ceil(Math.max(this.MIN_R, this._reach(this.packing(m)) + this.C_R) - 1e-9);', 'return Math.ceil(Math.max(this.MIN_R, this._reach(this.packing(m))) - 1e-9);'],
  ['the packing holds fewer than the share', 'take(this._layout([m]));', 'take(this._layout([m - 1]));'],
  ['the rings crowd until the counters overlap', 'var need = cnt >= 2 ? (this.C_R) / Math.sin(Math.PI / cnt) : 0;', 'var need = cnt >= 2 ? (this.C_R) / Math.sin(Math.PI / cnt) / 2 : 0;'],
  /* ⚠ RE-POINTED, NOT DROPPED. The centre used to be its own push; it is
     a RING OF ONE now, because a mutation of the old centre flag turned
     out to be INERT — the search reached the same shape through
     counts = [1, 6] either way, which is the harness telling you the flag
     was dead code. The law that survives is the fallback: if no
     arrangement fits, the packing must still hold something. */
  /* ⚠ RE-POINTED TWICE, AND BOTH TIMES THE HARNESS WAS RIGHT. It first
     mutated a "centre" flag that turned out to be redundant (a ring of one
     IS a centre), then a fallback the search can never reach. An inert
     mutation is not a gap in the gate — it is the harness naming dead
     code, and the answer is to delete the code and point the needle at a
     path that is actually taken. The memo is taken on every repeat call,
     and render() and the gates both call packing() in loops. */
  ['the packing memo hands back the wrong pile on a repeat call',
    'if (this._packCache[m]) return this._packCache[m];', 'if (this._packCache[m]) return [];'],
  ['the lid is padded rather than measured', 'return Math.ceil(Math.max(this.MIN_R, this._reach(this.packing(m)) + this.C_R) - 1e-9);', 'return Math.ceil(Math.max(this.MIN_R, this._reach(this.packing(m)) + this.C_R) - 1e-9) + 90;'],
  /* the middle counter is a RING OF ONE at radius zero — there is no
     separate centre flag, because a mutation proved one redundant */
  ['the middle counter is pushed off the centre', 'var need = cnt >= 2 ? (this.C_R) / Math.sin(Math.PI / cnt) : 0;', 'var need = cnt >= 2 ? (this.C_R) / Math.sin(Math.PI / cnt) : this.C_R;'],
  ['the lift scatters the counters back instead of seating them', 'var pack = this.packing(this.share(s));', 'var pack = [];'],
  ['"Another lid" marches them into a heap again', 'var p = self._farPoint(self.st);\n        if (!p) return;\n        self._placeFrom(p.cx, p.cy);', 'var k = self.st.lids.length;\n      var next = self.addLid(self.st, Math.round(self.W / (k + 2) * (k + 1)), Math.round(self.H / 2));'],

  /* ---- V16 THE TRUTH LANDS ON THE STRIP ---- */
  ['the truth is marked on the wrong numeral', 'var truth = s.lifted ? this.revealed(s).share : null;', 'var truth = s.lifted ? this.revealed(s).share + 1 : null;'],
  ['the truth is marked before the lids come up', 'var truth = s.lifted ? this.revealed(s).share : null;', 'var truth = this.share(s);'],
  ['the truth is never marked at all', 'var truth = s.lifted ? this.revealed(s).share : null;', 'var truth = null;'],
  ['the truth is drawn as a FILL, so it reads as the same kind as the marker', "+ '.lid-mark.lid-truth{box-shadow:0 0 0 3px #FBF3E4 inset, 0 0 0 7px #146B5E inset;font-weight:800;}'", "+ '.lid-mark.lid-truth{background:#F2784B;}'"],
  ['the truth ring picks up a verdict hue', "0 0 0 7px #146B5E inset;font-weight:800;}'", "0 0 0 6px #C2562F inset;}'"],
  ['the truth ring becomes an outer halo and collides with its neighbour', "box-shadow:0 0 0 3px #FBF3E4 inset, 0 0 0 7px #146B5E inset;font-weight:800;}'", "box-shadow:0 0 0 3px #FBF3E4, 0 0 0 6px #146B5E;}'"],
  ['a numeral that is both the marker and the truth loses its rule', "+ '.lid-mark.lid-on.lid-truth{box-shadow:0 0 0 3px #146B5E inset, 0 0 0 7px #FBF3E4 inset;}'", "+ ''"],
  ['the old dot row comes back', 'return strip;\n  },', "var z = api.el('div', 'lid-rcell'); strip.appendChild(z);\n    return strip;\n  },"],

  /* ---- the strip must be inert until there is a question ---- */
  ['the strip is live before any lid is down', "if (s.lids.length < self.MIN_LIDS) self._refuse(b, 'hintPlace');", 'b.disabled = !!s.lifted;'],
  ['the model accepts a marker with no question asked', 'if (s.lids.length < this.MIN_LIDS) return null;\n    var g = Math.round(Number(v));', 'var g = Math.round(Number(v));'],

  /* ---- changing the question must void the commitment ---- */
  ['the guess survives a new lid', "s.lids.push(q);\n    }\n    s.guess = null;", 's.lids.push(q);\n    }'],
  ['the guess survives a removed lid', 's.lids.pop();\n    s.guess = null;', 's.lids.pop();'],
  ['sliding a lid wrongly voids the commitment', 's.lids[i] = p;', 's.lids[i] = p;\n    s.guess = null;'],

  /* ---- V17 NO DEAD STRINGS ---- */
  ['hintMark goes back to being a dead string', "else if (s.guess === null) {", 'else if (s.guess === null && false) {'],
  ['the focus restore is dropped again', 'if (el) { try { el.focus(); } catch (_) {} }', ''],

  /* ---- V1 CONSERVATION ---- */
  ['hidden forgets to multiply by the lid count', 'return s.lids.length * this.share(s);', 'return this.share(s);'],
  ['the leftover is swallowed', 'return s.n - this.hidden(s);', 'return 0;'],
  ['covered counters are still reported as on the table', 'for (i = 0; i < s.n; i++) if (!taken[i]) out.push(i);', 'for (i = 0; i < s.n; i++) out.push(i);'],

  /* ---- V4 UNREACHABILITY ---- */
  ['the reveal no longer waits for the lift', "if (!s.lifted) throw new Error('the lids are still down');", ''],
  ['a lifted table can be lifted again', 'lift: function (st) {\n    var s = this._clone(st);\n    if (s.lifted) return null;', 'lift: function (st) {\n    var s = this._clone(st);'],
  ['an empty table can be lifted', 'if (s.lids.length < this.MIN_LIDS) return null;\n    s.lifted = true;', 's.lifted = true;'],

  /* ---- V6 THE COMMITTED PRIOR ---- */
  ['the marker moves after the lids are up', 'if (s.lifted) return null;\n    if (s.lids.length < this.MIN_LIDS) return null;\n    var g', 'if (s.lids.length < this.MIN_LIDS) return null;\n    var g'],
  ['a refused guess carries the old state forward as a success', 'if (!isFinite(g) || g < 1 || g > this.stripTop(s)) return null;', 'if (!isFinite(g) || g < 0 || g > this.PAID_MAX_TOTAL) return s;'],
  ['tapping the same numeral no longer clears the marker', 's.guess = (s.guess === g) ? null : g;', 's.guess = g;'],

  /* ---- V10 DETERMINISM ---- */
  ['the scatter becomes unseeded', 'h = this._mix(s.seed, i * 97 + k);', 'h = Math.floor(Math.random() * 1e9);'],
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
  ['a verdict word reaches a German string', 'de: "Zieht einen Deckel auf den Tisch – und dann noch einen."', 'de: "Legt zwei Deckel hin. Richtig!"'],
  ['a verdict word reaches a Finnish string', 'fi: "Nostakaa nyt kannet."', 'fi: "Nyt voitte nostaa kannet. Oikein!"'],
  ['the brand word reaches a string', 'en: "The Lids"', 'en: "The Splat Lids"'],
  ['an invisible character is pasted into a string', 'sv: "Lyft på locken"', 'sv: "Lyft​ på locken"'],

  /* ---- V11 LABELS ARE TRUE ---- */
  ['the lift button is wired backwards', 'was.lifted ? self.lower(was) : self.lift(was)', 'self.st.lifted ? self.lift(self.st) : self.lower(self.st)'],
  ['the "another lid" button takes one away', "s.lids.length ? api.t('addLid') : api.t('firstLid')", "api.t('takeLid')"],

  /* ---- V7 NO VERDICT ---- */
  ['the tool starts marking the guess', 's.lifted = true;\n    return s;', 's.lifted = true;\n    s.correct = (s.guess === this.share(s));\n    return s;'],

  /* ---- V12 IDENTITY ---- */
  ['the tool declares tasks and becomes an activity', '  id: \'lids\',', '  id: \'lids\',\n  tasks: [],'],
  ['the tool starts POSTing somewhere', "fetch('/api/auth/me'", "fetch('/api/auth/me', { method: 'POST' }, "],
  ['the tool reaches into the class roster', "STORE_KEY: 'lcs:lids:v1',", "STORE_KEY: 'lcs:my-classes',"],

  /* ---- V13 THE TABLE BOOK ---- */
  ['the offline fallback degrades to nothing', "version: 1, freeMax: 8, premiumMax: 76,\n    setups: [", "version: 1, freeMax: 8, premiumMax: 76,\n    setups: [].concat([], ["],
  ['a paid setup leaks into the offline fallback', "{ id: 't-008', n: 20, k: 3, free: true }", "{ id: 't-008', n: 20, k: 3, free: false }"],
  ['entitlement stops filtering the book', 'if (all[i].free || this.premium) out.push(all[i]);', 'out.push(all[i]);'],
  /* ================= the 2026-08 rebuild: laws that did not exist =========
     Each of these guards something the shipped tool got wrong, and each is
     here because a needle that is DROPPED shrinks the denominator while the
     run still reports "every mutation killed". ==================== */
  ['the scatter loses its separation constraint — counters overlap again',
    'if (gap >= this.SEP) break;', 'if (gap >= 0) break;'],
  ['the separation floor is quietly lowered below one counter',
    'SEP: 76,', 'SEP: 20,'],
  ['placing from an empty table lays ONE lid again — it would swallow the table',
    'var pairing = s.lids.length === 0;', 'var pairing = false;'],
  ['taking one from two leaves a single lid behind',
    'if (s.lids.length === 1) s.lids.pop();', 'if (false) s.lids.pop();'],
  ['the strip goes back to a fixed top that cannot hold the share',
    'return 5 * (Math.floor(half / 5) + 1);', 'return 12;'],
  ['the strip tops out ON the answer at two lids',
    'return 5 * (Math.floor(half / 5) + 1);', 'return half;'],
  ['the strip range starts leaking the lid count',
    'var half = Math.floor(s.n / 2);', 'var half = Math.floor(s.n / Math.max(2, s.lids.length));'],
  ['the print sheet starts reading the reveal',
    'var k = Math.max(this.MIN_LIDS, s.lids.length);', 'var k = s.lifted ? this.MIN_LIDS : s.lids.length;'],
  ['the printable is built for a free visitor too',
    "if (!this.premium) { document.body.classList.remove('lid-paid'); return; }",
    "if (false) { document.body.classList.remove('lid-paid'); return; }"],
  ['a print rule stops being scoped to the paid class',
    "'body.lid-paid .lid-wrap{display:none !important;}'", "'.lid-wrap{display:none !important;}'"],
  ['a refusal stops naming its own reason',
    "btn.addEventListener('click', function () { self._say(key); });",
    "btn.addEventListener('click', function () { self._say(null); });"],
  ['the refusal goes back to a silent disabled button',
    "btn.setAttribute('aria-disabled', 'true');", 'btn.disabled = true;'],
  ['the exact-share rung goes silent again',
    "line(this.leftover(s) > 0 ? 'hintLeftover' : 'hintExact');",
    "if (this.leftover(s) > 0) line('hintLeftover');"],
  ['the counters go back into the accessibility tree one by one',
    "c.setAttribute('aria-hidden', 'true');", "c.setAttribute('aria-label', 'a counter');"],
  ['the table stops reporting its counts',
    "api.t('countersAria') + ': ' + s.n + ', ' +", "'' +"],
  ['a lid can be dragged half off the table again',
    'var lo = Math.min(r, this.W / 2), hi = Math.max(this.W - r, this.W / 2);', 'var lo = 0, hi = this.W;'],
  ['destroy leaks the wide-viewport class again',
    "document.body.classList.remove('lid-wide', 'lid-paid');", 'void 0;']
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
