/* =====================================================================
   poison-build-plan-hints.js — would V9b have caught the dead string?
   ---------------------------------------------------------------------
   Run:  node scripts/poison-build-plan-hints.js

   `hintTurn` shipped in this tool DECLARED AND NEVER SELECTED, and four
   native panels found it before any gate did — in a tool whose own
   header advertises a reachability gate, and whose smoke test contained
   a workaround calling the string directly with a comment excusing the
   dispatch.

   V9b exists because of that. A gate written after the fact is worth
   nothing until it is shown to fail on the exact defect it was written
   for, so this restores the original dispatch and requires V9b to go
   red — and it also re-arms the SECOND defect, the branch that was
   technically alive but reached four buildings out of 1,953,125.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'build-plan.js');
const bak = fs.readFileSync(TOOL, 'utf8');

/* ⚠ the needle mutates hintKey(), which is MODEL code precisely so the
   Node gate can drive it. The first version of this poison mutated the
   dispatch inline in _paint() and all three cases sailed through —
   because the gate had reimplemented the dispatch inside itself and was
   enumerating its own copy. Moving the dispatch into the model is what
   made this poison able to work at all. */
const LIVE = `    hintKey: function (st, justTurned, touched) {
      if (justTurned) return 'hintTurn';
      if (!this.isAmbiguous(st)) return 'hintDetermined';
      if (!touched) return 'hintPlan';
      return 'hintSame';
    },`;

const flat = `      var f = true, i;
      for (i = 1; i < 9; i++) if (st.h[i] !== st.h[0]) { f = false; break; }`;

const CASES = [
  {
    name: 'the ORIGINAL dispatch — hintTurn declared and never selected',
    to: `    hintKey: function (st, justTurned, touched) {
${flat}
      if (!this.isAmbiguous(st)) return 'hintDetermined';
      if (f) return 'hintPlan';
      return 'hintSame';
    },`,
    expect: /SELECTABLE|DEAD: hintTurn/
  },
  {
    name: 'a branch alive but reaching four states out of 1,953,125',
    to: `    hintKey: function (st, justTurned, touched) {
      if (justTurned) return 'hintTurn';
${flat}
      if (!this.isAmbiguous(st)) return 'hintDetermined';
      if (f) return 'hintPlan';
      return 'hintSame';
    },`,
    expect: /fewer than 1,000 states/
  },
  {
    name: 'the payoff is spoiled on first contact',
    to: `    hintKey: function (st, justTurned, touched) {
      if (justTurned) return 'hintTurn';
      if (!this.isAmbiguous(st)) return 'hintDetermined';
      if (touched) return 'hintPlan';
      return 'hintSame';
    },`,
    expect: /FIRST hint a teacher sees/
  }
];

let bad = 0;
try {
  if (bak.indexOf(LIVE) === -1) throw new Error('the live dispatch is not where the poison expects it');
  for (const c of CASES) {
    fs.writeFileSync(TOOL, bak.replace(LIVE, c.to), 'utf8');
    let out = '', failed = false;
    try {
      out = execFileSync(process.execPath, [path.join(__dirname, 'verify-build-plan.js')],
        { cwd: ROOT, encoding: 'utf8', timeout: 300000 });
    } catch (e) { failed = true; out = (e.stdout || '') + (e.stderr || ''); }
    const named = c.expect.test(out.split('\n').filter((l) => /FAIL|DEAD/.test(l)).join('\n'));
    if (failed && named) console.log(`  POISON OK — ${c.name}`);
    else { bad++; console.error(`  POISON FAILED — ${c.name} (exit=${failed ? 'nonzero' : 'ZERO'} named=${named})`); }
  }
} finally {
  fs.writeFileSync(TOOL, bak, 'utf8');
  console.log('  restored the tool');
}
if (bad) { console.error(`\nFAIL — ${bad} poison case(s) did not bite`); process.exit(1); }
console.log('\nPASS — the dead-string gate bites on the defect that shipped');
