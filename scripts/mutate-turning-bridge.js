#!/usr/bin/env node
/* =====================================================================
   mutate-turning-bridge.js — does verify-turning-bridge-core.js BITE?
   Run: node scripts/mutate-turning-bridge.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the banks, the planks, the car, the strip — is gated
   by local-test-turning-bridge.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'turning-bridge-core.js', act: 'turning-bridge-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-turning-bridge-core.js');
const MUTATIONS = [
  ['a swap does not turn the arrow plank', 'core', "if (st.gap === 'arrow') { st.face = other(st.face); return 'turned'; }", ''],
  ['the arrow runs from the result', 'core', "return { plank: 'arrow', reason: st.face === 'because' ? second : first };", "return { plank: 'arrow', reason: st.face === 'because' ? first : second };"],
  ['level 4 accepts the unswapped sentence', 'core', "if (rd.kind === 'swap' && st.order === 'ab') reason = 'swap';", 'if (false) reason = null;'],
  ['the wrong face passes', 'core', "else reason = c.reason === rd.reason ? null : 'face';", 'else reason = null;'],
  ['fr: parce que before a vowel', 'core', "if (loc === 'fr' && /que$/.test(w)", "if (false && loc === 'fr' && /que$/.test(w)"],
  ['the comma table ignored', 'core', "return c === 1 || (c === 'c' && clause);", 'return c === 1;'],
  ['de/nl: no inversion after SO', 'core', "var second = rl === 'so' && B.s ? B.s : B.n;", 'var second = B.n;'],
  ['the glow from miss 1', 'core', "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 2; }", "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 1; }"],
  ['the same order every pass', 'core', 'var c = shuffle(ids, rnd);', 'var c = ids.slice();'],
  ['three alike in a row', 'core', 'if (!same(c, prev) && !runs(loc, lvl, c))', 'if (!same(c, prev))'],
  ['the right plank always in one slot', 'core', 'at = (start + (slot[n] = (slot[n] || 0) + 1) - 1) % n;', 'at = 0;'],
  ['laying a plank twice keeps it', 'core', "if (st.gap === p) { st.gap = null; return 'back'; }", ''],
  ['an empty bridge is a miss', 'core', "if (!c) { st.last = 'empty'; st.reason = null; return { result: 'empty' }; }", "if (!c) { st.misses++; st.last = 'empty'; st.reason = null; return { result: 'empty' }; }"],
  ['en: AND offered in a but-round', 'core', '"f":"I like milk","p":"milk"},"b":{"n":"not juice","p":"juice"},"end":".","tray":["but","or","arrow"]', '"f":"I like milk","p":"milk"},"b":{"n":"not juice","p":"juice"},"end":".","tray":["but","and","arrow"]'],
  ['en: a comma before because', 'core', '"comma":{"and":0,"but":"c","or":0,"because":0,"so":1}', '"comma":{"and":0,"but":"c","or":0,"because":1,"so":1}'],
  ['de: deshalb keeps the subject first', 'core', '"s":"esse ich eine Banane"', '"s":"ich esse eine Banane"'],
  ['en: an and-round that OR does not break', 'core', '"b":{"n":"the dog are friends","p":"dog"}', '"b":{"n":"the dog","p":"dog"}'],
  ['a picture in the wrong case', 'core', '"pear":"At the Supermarket/pear"', '"pear":"at the supermarket/pear"'],
  ['a hint prints a digit', 'act', 'hintEmpty: {en:"Lay a plank across the river. How do the two parts go together?"', 'hintEmpty: {en:"Lay 1 plank across the river. How do the two parts go together?"'],
  ['an unused variable (control)', 'core', "  var KINDS = ['pick', 'pick', 'pick', 'swap'];", "  var UNUSED_CONTROL = 0; var KINDS = ['pick', 'pick', 'pick', 'swap'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TB_CORE_DIR: dir, TB_ACT_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-turning-bridge: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
