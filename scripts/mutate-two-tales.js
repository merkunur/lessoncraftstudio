#!/usr/bin/env node
/* =====================================================================
   mutate-two-tales.js — does verify-two-tales-core.js
   BITE? Run: node scripts/mutate-two-tales.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the books, the planks, the walk, the tip and the drop — is gated by local-test-two-tales.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'two-tales-core.js', act: 'two-tales-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-two-tales-core.js');
const MUTATIONS = [
  ['a plank in only one book lies flat across', 'core', "return g && s ? 'across' : g ? 'gold' : s ? 'silver' : 'basket';", "return g || s ? 'across' : 'basket';"],
  ['a plank in neither book rests on a book', 'core', "return g && s ? 'across' : g ? 'gold' : s ? 'silver' : 'basket';", "return g && s ? 'across' : g ? 'gold' : s ? 'silver' : 'gold';"],
  ['the walk searches one book only', 'core', 'silver: walk(p, st.silver, st.pages) };', 'silver: walk(p, st.gold, st.pages) };'],
  ['only one accepts the right plank on the wrong book', 'core', "var ok = at === t && (st.mode === 'sort'", "var ok = (at === t || st.mode === 'only') && (st.mode === 'sort'"],
  ['sort passes with a plank in the tray', 'core', "if (st.mode === 'sort' && on.length < st.planks.length) { st.last = 'sortEmpty'; return { result: 'empty' }; }", ''],
  ['the answer always in tray slot one', 'core', 'var others = R.others.slice(), k2 = r % 3;', 'var others = R.others.slice(), k2 = 0;'],
  ['a proof page off by one', 'core', '"proof3":{"LOST_FOUND":2,"TRIED_AGAIN":1}', '"proof3":{"LOST_FOUND":1,"TRIED_AGAIN":1}'],
  ['a plank copied into a caption', 'core', `The wind blew Rusty's cap away."`, `The wind blew Rusty's cap away. Kept trying."`],
  ['the gold book is always the same tale', 'core', 'gold: R.goldTale, silver: R.silverTale,', "gold: 'fox', silver: R.silverTale,"],
  ['the moon dots show the answer, not each book', 'core', 'return { gold: g, silver: s }; }', "var t = truth(tag, st.gold, st.silver); return { gold: t === 'gold' || t === 'across', silver: t === 'across' }; }"],
  ['a round meets the same two tales as another', 'core', '{"goldTale":"mouse","silverTale":"duck","answer":"GOT_HELP"', '{"goldTale":"duck","silverTale":"bunny","answer":"GOT_HELP"'],
  ['a hint prints a digit', 'act', 'en:"Every plank needs a place."', 'en:"Every plank needs 1 place."'],
  ['an unused variable (control)', 'core', "  var MODES = ['same', 'only', 'sort'];", "  var UNUSED_CONTROL = 0; var MODES = ['same', 'only', 'sort'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tt-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TT_CORE_DIR: dir, TT_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-two-tales: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
