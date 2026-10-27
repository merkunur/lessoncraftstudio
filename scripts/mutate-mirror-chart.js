#!/usr/bin/env node
/* =====================================================================
   mutate-mirror-chart.js — does verify-mirror-chart-core.js BITE?
   Run: node scripts/mutate-mirror-chart.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the chart, the mirror, the boxes, the pictures — is
   gated by local-test-mirror-chart.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'mirror-chart-core.js', act: 'mirror-chart-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-mirror-chart-core.js');
const MUTATIONS = [
  ['a prefix heals (the start of the word is enough)', 'core', 'same = s != null && s.toLowerCase() === rd.target.toLowerCase();', 'same = s != null && rd.target.toLowerCase().indexOf(s.toLowerCase()) === 0;'],
  ['the accents ignored (a folded word heals)', 'core', 'same = s != null && s.toLowerCase() === rd.target.toLowerCase();', "same = s != null && s.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === rd.target.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();"],
  ['German: a lower-case start heals', 'core', "if (same && st.loc === 'de' && s.charAt(0) !== rd.target.charAt(0)) return", "if (false) return"],
  ['the plural: the singular is "another picture", not the count', 'core', "if (m && rd.kind === 'plural' && m.noun === lookUp(st.loc, rd.target).noun) return { kind: 'count'", "if (false) return { kind: 'count'"],
  ['a real word stays fog', 'core', "if (m) return { kind: 'other', letters: s, pic: m.pic, number: m.number };", ''],
  ['every string shows a picture', 'core', "return r ? { noun: r[0], pic: INDEX.nouns[r[0]], number: r[1] } : null;", "return { noun: r ? r[0] : 0, pic: INDEX.nouns[r ? r[0] : 0], number: r ? r[1] : 1 };"],
  ['the bank leaves out the right word', 'core', 'var out = [w];', 'var out = [pick.pop()];'],
  ['the first-letter help gives two letters', 'core', 'if (rd.parts.boxes) st.letters[0] = rd.target.charAt(0); else st.letters = [rd.target.charAt(0)]; }', 'if (rd.parts.boxes) { st.letters[0] = rd.target.charAt(0); st.letters[1] = rd.target.charAt(1); } else st.letters = [rd.target.charAt(0), rd.target.charAt(1)]; }'],
  ['the right tile always in the first slot', 'core', 'var at = slots[i], others', 'var at = 0, others'],
  ['the same order every pass', 'core', 'if (!same(c, prev)) { o = c; break; }', 'o = ids; break;'],
  ['an empty Check counts as a miss', 'core', "if (!complete(st)) { st.last = 'empty'; return { result: 'empty' }; }", "if (!complete(st)) { st.misses++; st.last = 'empty'; return { result: 'empty' }; }"],
  ['the mist from miss 1', 'core', 'if (st.done || st.last !== \'miss\' || st.show < 2) return null;', 'if (st.done || st.last !== \'miss\' || st.show < 1) return null;'],
  ['the plural ending added without dropping', 'core', "return t ? rd.sg.slice(0, rd.sg.length - +t[2]) + t[1] : rd.sg + rd.tiles[st.tile];", "return t ? rd.sg + t[1] : rd.sg + rd.tiles[st.tile];"],
  ['boxes take a bank word of another length', 'core', 'if (v.length === w.length) { if (dist(v, w) === 1) d1.push(v); else same.push(v); } else any.push(v);', 'if (dist(v, w) === 1) d1.push(v); else same.push(v);'],
  ['a hint prints a digit', 'act', 'hintEmpty: {en:"The mirror needs a letter in every box."', 'hintEmpty: {en:"The mirror needs 1 letter in every box."'],
  ['an unused variable (control)', 'core', "  function levels() { return ['1', '2', '3', '4']; }", "  var UNUSED_CONTROL = 0; function levels() { return ['1', '2', '3', '4']; }"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MC_CORE_DIR: dir, MC_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-mirror-chart: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
