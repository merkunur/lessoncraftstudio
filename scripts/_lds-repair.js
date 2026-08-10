/* one-shot: repair the three comment words a backtick ate (the recorded
   trap, walked into again) and correct the GATE'S ORACLE, which still
   encoded the tie rule the panel proved wrong. */
'use strict';
const fs = require('fs');
const path = require('path');

const P = path.join(__dirname, '..', 'mini tools', 'landing-strip.js');
let s = fs.readFileSync(P, 'utf8');
const fix = [
  ['/* ⚠  is passed EXPLICITLY.', '/* ⚠ `why` is passed EXPLICITLY.'],
  ['made  unreachable', 'made `saidRerule` unreachable'],
  ['are never , only dimmed', 'are never `disabled` — only dimmed'],
  ['are never `disabled` — only dimmed — so a mis-tap', 'are never `disabled` — only dimmed — so a mis-tap']
];
let n = 0;
fix.forEach(function (f) { if (s.indexOf(f[0]) >= 0) { s = s.split(f[0]).join(f[1]); n++; } });
fs.writeFileSync(P, s);
console.log('repaired ' + n + ' eaten comment fragments');

/* ---- the gate's oracle -------------------------------------------
   The panel measured that the tool's stated rule ("ties go to the
   middle") was FALSE: 25 resolved to the low post and 75 to the middle.
   The tool now obeys the rule. The ORACLE still encoded the bug, which
   is why it failed — a gate whose oracle carries the same misconception
   as the code is exactly what let five model defects through 16,626
   assertions. Re-derived here from the stated rule, not from the tool. */
const G = path.join(__dirname, 'verify-landing-strip.js');
let g = fs.readFileSync(G, 'utf8');
const oldOracle = 'const oNearest = (lo, hi, v) => {\n  let best = 1, bd = Infinity;\n  for (let i = 0; i < 3; i++) {\n    const d = Math.abs(v - oPost(lo, hi, i));\n    if (d < bd - 1e-9) { bd = d; best = i; }\n  }\n  return best;\n};';
const newOracle = '/* ⚠ THE MIDDLE IS TRIED FIRST, because the stated rule is that a tie\n   goes to the middle. The first version of this oracle iterated 0,1,2\n   and so encoded the SAME defect the tool had — which is why it passed\n   16,626 assertions over a model whose 25 went to the low post. A gate\n   whose oracle shares the code’s misconception proves nothing.\n   Derived from the rule, verified against the two quarter points below. */\nconst oNearest = (lo, hi, v) => {\n  let best = 1, bd = Infinity;\n  for (const i of [1, 0, 2]) {\n    const d = Math.abs(v - oPost(lo, hi, i));\n    if (d < bd - 1e-9) { bd = d; best = i; }\n  }\n  return best;\n};';
if (g.indexOf(oldOracle) < 0) throw new Error('oracle needle missing');
g = g.split(oldOracle).join(newOracle);

/* and name the two quarter points explicitly, since they are the cases
   the deal deliberately favours and the ones that resolved wrongly */
const anchor = "  const st = T.arrive(T.newState('100'), 71);\n  eq(T.nearestPost(st, 71), 1, 'L2 ⭐ 71 is nearest the MIDDLE post, not the top one');";
const extra = anchor + "\n  /* ⭐ THE TWO QUARTER POINTS, named because they are exactly tied and\n     the deal favours them. A tie goes to the MIDDLE, both sides. */\n  eq(T.nearestPost(st, 25), 1, 'L2 ⭐ 25 is a tie and must go to the MIDDLE post');\n  eq(T.nearestPost(st, 75), 1, 'L2 ⭐ 75 is a tie and must go to the MIDDLE post');";
if (g.indexOf(anchor) < 0) throw new Error('quarter-point anchor missing');
g = g.split(anchor).join(extra);
fs.writeFileSync(G, g);
console.log('oracle corrected + the two quarter points named');
