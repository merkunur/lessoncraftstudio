/* =====================================================================
   mutate-exchange-machine.js — does verify-exchange-machine.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-exchange-machine.js

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
        locale apply script re-pads the whole strings block every run,
        so the locale needles are built by enNeedle() off the LIVE file.
     5. A NEEDLE THAT MISSES IS A HARNESS FAULT TOO.
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
const SRC = fs.readFileSync(path.join(TOOLS, 'exchange-machine.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = ['exchange-machine-sets.json'];
const TIMEOUT = 30000;

/* ⭐ SELF-ANCHORING LOCALE NEEDLES. Reads the CURRENT English value of
   `key` straight out of the live strings block, so the needle survives
   a re-pad. THROWS rather than returning null: a needle that cannot
   find its key is a fault to surface at load, not a mutation to drop
   quietly — dropping it shrinks the reported total while the run still
   says "every mutation killed". */
function enNeedle(key, replacement, name) {
  /* ⚠ SELF-ANCHORING MEANS ANCHORING ON WHAT IS THERE. My first pattern
     expected `key: { en: '…' }` — single-quoted, no padding — because
     that is how I hand-wrote the block. `apply-…-locales.js` then
     rewrote all eleven locales as `key:  { en: "…" }`, double-quoted
     and column-padded, and every locale needle went blind. It THREW
     rather than skipping, which is the only reason this was a two-minute
     fix instead of a run that reported "every mutation killed" over four
     needles that never fired. Accept either quote and any padding. */
  const re = new RegExp(key + ':\\s*\\{\\s*en:\\s*(["\'])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1');
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const q = m[1];
  const from = m[0];
  const to = from.slice(0, from.length - m[2].length - 1) + replacement + q;
  if (to === from) throw new Error(`enNeedle: "${key}" already reads "${replacement}" — the mutation would be INERT`);
  return [name, from, to];
}

const M = [
  /* ---- L1 conservation: the whole thesis ---------------------------- */
  ['⭐ the borrow CREATES material — ten arrive and none leaves',
    's.col[k] -= 1;\n      s.col[k - 1] += this.BASE;', 's.col[k - 1] += this.BASE;'],
  ['the borrow DESTROYS material — one leaves and nine arrive',
    's.col[k - 1] += this.BASE;', 's.col[k - 1] += this.BASE - 1;'],
  ['the borrow moves a hundred instead of a ten', 's.col[k - 1] += this.BASE;', 's.col[k - 1] += this.BASE * 10;'],
  ['the carry destroys material', 's.col[k] -= this.BASE;\n      s.col[k + 1] += 1;', 's.col[k] -= this.BASE;'],
  ['the carry sends two up', 's.col[k + 1] += 1;\n      s.carried[k] = true;', 's.col[k + 1] += 2;\n      s.carried[k] = true;'],
  ['taking a ghost does not remove the material', "if (s.op === 'sub') s.col[k] -= 1; else s.col[k] += 1;", ''],
  ['taking a ghost is not recorded', 's.taken[k] += 1;', ''],

  /* ---- L2 the lock -------------------------------------------------- */
  ['⭐ the mark is written but nothing moves — a mark with no material consequence',
    's.col[k] -= 1;\n      s.col[k - 1] += this.BASE;\n      s.moved[k] = true;', 's.moved[k] = true;'],
  ['the material moves but no mark is written', 's.moved[k] = true;\n      return s;', 'return s;'],
  ['the mark is written on the wrong lane', 's.moved[k] = true;\n      return s;', 's.moved[k - 1] = true;\n      return s;'],

  /* ---- L4 the refusals ---------------------------------------------- */
  ['⭐ an EMPTY lane cascades silently — the zero lesson is deleted',
    'return st.col[k] >= 1;\n    },\n\n    borrow:', 'return true;\n    },\n\n    borrow:'],
  ['a lane can be broken twice', 'if (st.moved[k]) return false;\n      return st.col[k] >= 1;', 'return st.col[k] >= 1;'],
  ['the ones lane can borrow from nothing', 'if (k < 1 || k >= this.P) return false;\n      if (st.moved[k]) return false;',
    'if (k < 0 || k >= this.P) return false;\n      if (st.moved[k]) return false;'],
  /* ⚠⚠ TWO MUTATIONS I WROTE HERE WERE NOT DEFECTS, AND MEASURING SAID
     SO. "borrow trusts a fractional lane index" survived — and it was
     right to. With the isFinite guard removed, k=1.5 still reaches
     `st.col[1.5]`, which is `undefined`, and `undefined >= 1` is
     false, so the borrow refuses anyway; same for NaN. The guard is
     defensive, not load-bearing, and the mutation is inert-in-effect.
     Likewise "unExchange runs without anything having been exchanged":
     I swept all 999 minuends and found ZERO states where a lane holds
     ten or more while the lane to its left has not given — so the
     clause it deletes can never be the deciding one in a subtraction.
     MEASURE BEFORE YOU ACCUSE THE GATE. Both are replaced below by
     mutations that change behaviour. */
  ['the reverse gear does not clear the mark, so a lane can give twice round the loop',
    "s.moved[k] = false;\n      } else {", '} else {'],
  ['⭐ SMALLER-FROM-LARGER is silently permitted — the tube hands over what it has not got',
    "return (st.op === 'add') ? true : (st.col[k] >= 1);", 'return true;'],
  ['a two-digit value is written into a one-digit lane', 'if (st.col[k] > 9) return false;\n      var j;', 'var j;'],
  ['a lane with ghosts still standing can be stamped', 'if (this.ghosts(st, k) !== 0) return false;', ''],
  ['stamping ignores the lanes to its right', 'for (j = 0; j < k; j++) if (st.ans[j] === null && j < this.width(st)) return false;', ''],
  ['a subtraction can carry', "if (!st || st.op !== 'add') return false;\n      if (typeof k !== 'number' || !isFinite(k)) return false;\n      if (k < 0 || k >= this.P - 1) return false;\n      if (st.carried[k]) return false;",
    "if (!st) return false;\n      if (typeof k !== 'number' || !isFinite(k)) return false;\n      if (k < 0 || k >= this.P - 1) return false;\n      if (st.carried[k]) return false;"],
  ['the reverse gear puts back nine instead of ten', 's.col[k - 1] -= this.BASE;\n        s.col[k] += 1;', 's.col[k - 1] -= this.BASE - 1;\n        s.col[k] += 1;'],

  /* ---- totality: one clamp rule, composed ---------------------------- */
  ['NaN survives the clamp', "if (typeof v !== 'number' || !isFinite(v)) return 0;", "if (typeof v !== 'number') return 0;"],
  ['the clamp stops rounding', 'v = Math.round(v);', ''],
  ['the ceiling is not applied', 'if (v > 999) v = 999;', ''],
  ['the floor is not applied', 'if (v < 0) v = 0;\n      if (v > 999)', 'if (v > 999)'],
  ['_st trusts the caller for the column array', "out.col[i] = fresh ? this.digit(out.a, i) : this._num(s.col && s.col[i]);",
    'out.col[i] = fresh ? this.digit(out.a, i) : ((s.col && s.col[i]) || 0);'],
  ['the digit accessor reads the wrong place', 'return Math.floor(v / d) % this.BASE;', 'return Math.floor(v / d / this.BASE) % this.BASE;'],
  ['the ghost count forgets what has been taken', 'return this.digit(st.b, k) - st.taken[k];', 'return this.digit(st.b, k);'],

  /* ---- the repertoire ------------------------------------------------ */
  ['entitlement stops filtering the book', 'for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);',
    'for (i = 0; i < all.length; i++) out.push(all[i]);'],
  ['the offline fallback degrades to nothing', 'FREE_SETTINGS: 7,', 'FREE_SETTINGS: 0,'],
  ['⭐ the across-zero cascade is moved behind the paywall', "{ op: 'sub', a: 204, b: 137 },", "{ op: 'sub', a: 214, b: 137 },"],
  ['the free tier loses every borrow and demonstrates only addition',
    "{ op: 'sub', a: 42, b: 17 },\n        { op: 'sub', a: 63, b: 28 },\n        { op: 'sub', a: 50, b: 24 },",
    "{ op: 'add', a: 42, b: 17 },\n        { op: 'add', a: 63, b: 28 },\n        { op: 'add', a: 50, b: 24 },"],
  ['a fallback sum goes negative', "{ op: 'sub', a: 42, b: 17 },", "{ op: 'sub', a: 17, b: 42 },"],

  /* ---- the notation table: the moat ---------------------------------- */
  ['⭐ Germany is given the Anglo carry position', "de: { carryPos: 'foot'", "de: { carryPos: 'above'"],
  ['a market loses its confidence flag, so a guess ships as a fact', "conf: 'p' },\n      fr:", '},\n      fr:'],
  ['⭐ NL is silently claimed as in-band, though cijferend rekenen is groep 6', 'nl: { carryPos: \'above\', borrowMark: \'strike\', method: \'decompose\', inBand: false', 'nl: { carryPos: \'above\', borrowMark: \'strike\', method: \'decompose\', inBand: true'],
  ['an unknown locale throws instead of falling back', 'return this.NOTATION[lang] || this.NOTATION.en;', 'return this.NOTATION[lang];'],
  ['a notation row carries an unknown carry position', "it: { carryPos: 'above'", "it: { carryPos: 'middle'"],

  /* ---- the shape of the tool ----------------------------------------- */
  ['the tool declares tasks and becomes a graded activity', "    id: 'exchange-machine',", "    id: 'exchange-machine',\n    tasks: [],"],
  ['a verdict field enters the source', "    STORE_KEY: 'lcs:exchange-machine:v1',", "    correct: 1,\n    STORE_KEY: 'lcs:exchange-machine:v1',"],
  ['reset() is dropped, so the shell\'s Reset button goes dead', '    reset: function () {', '    resetX: function () {'],
  ['render() takes an api argument and wipes this.api on the resize call', '    render: function () {', '    render: function (api) {'],
  ['a green enters the stage', "+ '.exm-done{stroke:#146B5E", "+ '.exm-done{stroke:#2FA56A"],
  ['a vh unit enters the stylesheet', 'max-height:496px', 'max-height:60vh'],
  ['the liveness gate can no longer derive the class prefix', "api.el('div', 'exm-wrap')", "api.el('div', 'exmwrap')"],
  ['the print block is deleted, so Print prints the whole web page', '@media print{', '@media screen and (min-width:99999px){'],

  /* ---- the authored strings (self-anchored) --------------------------- */
  enNeedle('instruction', 'Well done! Your score is 5 out of 5.', '⭐ a verdict and a score enter an authored string'),
  enNeedle('hintBlocked', 'That is wrong. Try again.', 'a verdict enters the blocked hint'),
  enNeedle('hintShort', 'Count the blocks in the rod and bundle them.', '⭐ the tool starts naming the material — place-value-lab\'s territory'),
  enNeedle('hintStart', 'Say the number word for twenty-four out loud.', 'the tool starts asking for a NUMBER WORD')
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'exm-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'exchange-machine.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-exchange-machine.js')], {
      env: Object.assign({}, process.env, { EXM_TOOL_DIR: tmp }),
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
