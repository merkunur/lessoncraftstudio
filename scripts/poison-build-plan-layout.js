/* =====================================================================
   poison-build-plan-layout.js — do L1's SQUARE and L3's CONCENTRIC
   assertions actually bite?
   ---------------------------------------------------------------------
   Run:  node scripts/poison-build-plan-layout.js

   These two are the whole reason #43's defect could not repeat, and
   neither is exercised by the mutation harness — that runs the Node
   gate, which never opens a browser. A browser assertion that has only
   ever been seen to pass is not evidence.

   Poison 1 reproduces #43's exact shipped defect: cap the HEIGHT of an
   aspect-ratio:1/1 box. That yields a RECTANGLE; the SVG letterboxes
   and every %-positioned control drifts off what it drives.
   Poison 2 offsets the blueprint targets by a few percent, the drift
   that made each of #43's marks draw as two circles.

   Both must make local-test-build-plan.js FAIL, and the tool is
   restored afterwards whatever happens.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'build-plan.js');
const bak = fs.readFileSync(TOOL, 'utf8');

const CASES = [
  {
    name: 'the arena is capped by HEIGHT, so it is a rectangle (#43 verbatim)',
    from: "+ '.bpl-bench{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;'\n      + 'margin:0 auto;",
    to: "+ '.bpl-bench{position:relative;width:100%;max-width:760px;aspect-ratio:1/1;max-height:460px;'\n      + 'margin:0 auto;",
    expect: /the arena is SQUARE/
  },
  {
    name: 'the blueprint targets drift off their squares',
    from: "+ '.bpl-h-plan{width:14%;height:14%;margin:-7% 0 0 -7%;}'",
    to: "+ '.bpl-h-plan{width:14%;height:14%;margin:-7% 0 0 -3%;}'",
    expect: /centred on its square/
  },
  {
    name: 'a profile bar is drawn one short',
    from: 'for (z = 0; z < vals[j]; z++) {',
    to: 'for (z = 0; z < Math.max(0, vals[j] - 1); z++) {',
    expect: /rendered profile matches the rendered cubes/
  }
];

let bad = 0;
try {
  for (const c of CASES) {
    if (bak.indexOf(c.from) === -1) { console.error(`  HARNESS: needle not found — ${c.name}`); bad++; continue; }
    fs.writeFileSync(TOOL, bak.replace(c.from, c.to), 'utf8');
    let out = '', failed = false;
    try {
      out = execFileSync(process.execPath, [path.join(__dirname, 'local-test-build-plan.js')],
        { cwd: ROOT, encoding: 'utf8', timeout: 900000 });
    } catch (e) { failed = true; out = (e.stdout || '') + (e.stderr || ''); }
    const named = c.expect.test(out.split('\n').filter((l) => /FAIL/.test(l)).join('\n'));
    if (failed && named) console.log(`  POISON OK — ${c.name}`);
    else { bad++; console.error(`  POISON FAILED — ${c.name} (exit=${failed ? 'nonzero' : 'ZERO'} named=${named})`); }
  }
} finally {
  fs.writeFileSync(TOOL, bak, 'utf8');
  console.log('  restored the tool');
}
if (bad) { console.error(`\nFAIL — ${bad} poison case(s) did not bite`); process.exit(1); }
console.log('\nPASS — every layout assertion bites');
