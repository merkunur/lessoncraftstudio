#!/usr/bin/env node
/* =====================================================================
   audit-activity-next-delay.js — Next appears 0.5 s after the result
   (operator ruling 2026-10-26: "Why is there a 6-7 seconds delay before
   the next button appears"). Activities that hide the shell's Check press
   it themselves once the result is on screen; the shell then shows Next.
   This gate reads every *-activity.js and fails when:
     · an OK_MS or CHECK_MS default is over 500 ms;
     · a Check press waits on reading time (a "length" term or Math.max);
     · a Check press waits on a literal over 1000 ms (an animation constant
       up to 1500 ms is allowed inside an expression: the result itself
       first appears after it).
   It refuses to pass vacuously (fewer than 90 presses read) and poisons
   itself: a 4200 default, a reading-time term and a 3000 literal must each
   fail, an untouched file must pass.
   Usage: node scripts/audit-activity-next-delay.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
function audit(name, src) {
  const out = [], presses = [];
  for (const m of src.matchAll(/\b(OK_MS|CHECK_MS): (\d+)/g)) if (+m[2] > 500) out.push(`${name}: ${m[1]} default ${m[2]} ms (> 500)`);
  let at = 0;
  for (;;) {
    const i = src.indexOf(".lcs-activity-check')", at); if (i < 0) break; at = i + 10;
    const tail = src.slice(i, i + 400);
    if (/display\s*:\s*none/.test(src.slice(Math.max(0, i - 40), i + 60))) continue;
    if (!/\.click\(\)/.test(tail.slice(0, 160))) continue;
    const m = /\}\s*,\s*([^;{}]+?)\)\s*;/.exec(tail);
    const expr = m && m.index < 260 && !/function\s*\(/.test(tail.slice(0, m.index)) ? m[1].trim() : null;
    presses.push(expr);
    if (!expr) continue; /* pressed at once */
    if (/length|Math\.max/.test(expr)) out.push(`${name}: a Check press waits on reading time — ${expr}`);
    const nums = (expr.match(/\d+/g) || []).map(Number);
    if (/^\d+$/.test(expr) && +expr > 1000) out.push(`${name}: a Check press waits ${expr} ms`);
    if (nums.some(n => n > 1500)) out.push(`${name}: a Check press waits on a ${Math.max(...nums)} ms constant — ${expr}`);
  }
  return { fails: out, presses };
}
const files = fs.readdirSync(MT).filter(f => /-activity\.js$/.test(f));
let presses = 0, fails = [];
for (const f of files) { const r = audit(f, fs.readFileSync(path.join(MT, f), 'utf8')); presses += r.presses.length; fails = fails.concat(r.fails); }
/* poison: the gate must bite */
const base = "  OK_MS: 500, FAST: false,\n  _a: function () { var self = this; this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS); }";
const poison = [
  ['a 4200 default', base.replace('OK_MS: 500', 'OK_MS: 4200')],
  ['a reading-time term', base.replace('}, this.OK_MS);', '}, Math.max(this.OK_MS, msg.length * 60 + 3800));')],
  ['a 3000 literal', base.replace('}, this.OK_MS);', '}, 3000);')]
];
let poisonOk = audit('control', base).fails.length === 0;
if (!poisonOk) console.error('  POISON: the control failed');
for (const [n, s] of poison) if (!audit('poison', s).fails.length) { poisonOk = false; console.error('  POISON: did not catch ' + n); }
fails.forEach(x => console.error('  FAIL: ' + x));
const vacuous = presses < 90;
if (vacuous) console.error(`  FAIL: only ${presses} Check presses read — refusing to pass vacuously`);
console.log(`audit-activity-next-delay: ${files.length} activities, ${presses} Check presses, ${fails.length} fail, poison ${poisonOk ? 'ok' : 'NOT OK'}`);
process.exit(fails.length || vacuous || !poisonOk ? 1 : 0);
