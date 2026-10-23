#!/usr/bin/env node
/* =====================================================================
   mutate-story-film.js — does verify-story-film-core.js BITE? Run: node scripts/mutate-story-film.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The film as DRAWN — frames lighting with their sentence, spill and empty
   sockets, the healing — is gated by local-test-story-film.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'story-film-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-story-film-core.js');
const MUTATIONS = [
  ['a tile on the wrong frame is accepted',            "if (model[k] !== r.full[s] || s === r.u) return { ok: false, at: k, srole: s, why: 'place'", "if (false) return { ok: false, at: k, srole: s, why: 'place'"],
  ['the decoy is the answer',                          "R('cookies', 'take-result', { start: 9, change: 3 }, 'result', 4,", "R('cookies', 'take-result', { start: 9, change: 3 }, 'result', 6,"],
  ['the decoy is the biggest tile once more',          "R('ladybugs', 'add-start', { change: 6, result: 14 }, 'start', 9,", "R('ladybugs', 'add-start', { change: 6, result: 14 }, 'start', 19,"],
  ['a dial one off is accepted',                       "if (st.dial === r.answer) return { ok: true };", "if (Math.abs(st.dial - r.answer) <= 1) return { ok: true };"],
  ['sharing fills tray by tray',                       "if (r.k === 'grp-share') { for (var e = 0;", "if (r.k === 'grp-make') { for (var e = 0;"],
  ['the dial reaches 0',                               "n = Math.max(1, Math.min(st.r.max, n | 0));", "n = Math.max(0, Math.min(st.r.max, n | 0));"],
  ['the answer equals a story number',                 "R('socks', 'put-part', { whole: 11, part1: 4 }, 'part2', 6,", "R('socks', 'put-part', { whole: 8, part1: 4 }, 'part2', 6,"],
  ['a German story says the wrong number',             "[['9 Kekse liegen auf einem Teller.', '3 werden gegessen.']", "[['8 Kekse liegen auf einem Teller.', '3 werden gegessen.']"],
  ['two equal answers may stand side by side',         "if (rs[p].answer === rs[p - 1].answer) bad = true; ", ""],
  ['a round stores its answer',                        "R('cookies', 'take-result', { start: 9, change: 3 },", "R('cookies', 'take-result', { start: 9, change: 3, answer: 6 },"],
  ['the two part frames are not interchangeable',      "if (r.d === 'bracket' && st.mystery && st.mystery !== 'whole' && r.u !== 'whole' && st.mystery !== r.u) { map.part1 = 'part2'; map.part2 = 'part1'; }", ""],
  ['the mismatch names no frame',                      "return { ok: false, at: k, srole: s, why: 'place', holds: model[k]", "return { ok: false, at: null, srole: s, why: 'place', holds: model[k]"],
  ['miss 2 never names the count',                     "if (st.show < 2) return 'hMiss1';", "return 'hMiss1';"],
  ['English divides with a colon',                     "var DIV = { en: '÷', es: '÷', pt: '÷' }", "var DIV = { es: '÷', pt: '÷' }"],
  ['Finnish multiplies with ×',                        "MUL = { de: '·', da: '·', no: '·', sv: '·', fi: '·' };", "MUL = { de: '·', da: '·', no: '·', sv: '·' };"],
  ['an empty frame counts as a miss',                  "if (empty.length) { st.last = { reason: 'empty', roles: empty };", "if (empty.length) { st.misses++; st.last = { reason: 'empty', roles: empty };"],
  ['taking away plays as adding',                      "if (r.d === 'change') return r.op === 'add' ? m.start + m.change : m.start - m.change;", "if (r.d === 'change') return m.start + m.change;"],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sf-mut-'));
  fs.writeFileSync(path.join(dir, 'story-film-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SF_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-story-film: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
