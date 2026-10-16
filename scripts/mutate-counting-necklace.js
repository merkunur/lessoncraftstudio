#!/usr/bin/env node
/* =====================================================================
   mutate-counting-necklace.js — does verify-counting-necklace-core.js BITE?
   Run: node scripts/mutate-counting-necklace.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'counting-necklace-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-counting-necklace-core.js');
const MUTATIONS = [
  ['beads overlap in the pack',     "var STEP = 18.5;", "var STEP = 15;"],
  ['the pack sits on the clasp',    "var PACK0 = 23.25;", "var PACK0 = 4;"],
  ['beads start by the clasp',      "var START = 72;", "var START = 26;"],
  ['a round dropped',               "      { n: 7,  start: 'clumps', twist: 'bunch' }\n", ""],
  ['to5 loses one more',            "      { n: 3, start: 'bunch',  twist: 'oneMore' }", "      { n: 3, start: 'bunch',  twist: 'spread' }"],
  ['spread is uneven',              "for (i = 0; i < m; i++) out.push(START + i * ((340 - START) / (m - 1)));", "for (i = 0; i < m; i++) out.push(START + i * i * ((340 - START) / ((m - 1) * (m - 1))));"],
  ['bunch leaves gaps',             "for (i = 0; i < m; i++) out.push(c - (m - 1) / 2 * STEP + i * STEP);", "for (i = 0; i < m; i++) out.push(c - (m - 1) / 2 * STEP + i * STEP * 1.6);"],
  ['clumps have no gaps',           "a += gap; }", "a += STEP; }"],
  ['the answer missing',            "cards.splice(((pos % 3) + 3) % 3, 0, answer);", "cards.splice(((pos % 3) + 3) % 3, 0, answer + 1);"],
  ['the answer always first',       "cards.splice(((pos % 3) + 3) % 3, 0, answer);", "cards.splice(0, 0, answer);"],
  ['one more answers the old count', "var answer = kind === 'oneMore' ? n + 1 : n;", "var answer = n;"],
  ['spread lures all fewer',        "spread:  [[1, 2], [2, -1]],", "spread:  [[-1, -2], [-2, -1]],"],
  ['bunch lures all more',          "bunch:   [[-1, -2], [-2, 1]],", "bunch:   [[1, 2], [2, 1]],"],
  ['how-many lures far away',       "howMany: [[1, -1], [1, 2], [-1, -2]],", "howMany: [[4, -1], [4, 2], [-1, -3]],"],
  ['a zero card allowed',           "if (c[0] >= 1 && c[1] >= 1 && c[0] !== answer", "if (c[0] >= 0 && c[1] >= 0 && c[0] !== answer"],
  ['a slide moves the wrong bead',  "st.angles[st.counted] = packAngle(st.counted);", "st.angles[st.total - 1 - st.counted] = packAngle(st.counted);"],
  ['a slide counts two',            "    st.counted++;\n    st.note = null;", "    st.counted += 2;\n    st.note = null;"],
  ['slides past the end',           "if (st.phase !== 'count' || st.counted >= st.total) return false;", "if (st.phase !== 'count') return false;"],
  ['no how-many question',          "if (st.counted === st.total) st.phase = st.twisted ? 'after' : 'howMany';", "if (st.counted === st.total) st.phase = 'after';"],
  ['recount restarts at how many',  "if (st.counted === st.total) st.phase = st.twisted ? 'after' : 'howMany';", "if (st.counted === st.total) st.phase = 'howMany';"],
  ['misses not counted',            "if (a !== q.answer) { st.misses++;", "if (a !== q.answer) {"],
  ['moved beads named one-on',      "    return 'noteMoved';", "    return 'noteOneOn';"],
  ['one more notes swapped',        "if (st.twist === 'oneMore') return a < st.n + 1 ? 'noteOneOn' : 'noteOnlyOne';", "if (st.twist === 'oneMore') return a < st.n + 1 ? 'noteOnlyOne' : 'noteOneOn';"],
  ['how many named moved',          "if (st.phase === 'howMany') return 'noteLast';", "if (st.phase === 'howMany') return 'noteMoved';"],
  ['one more adds two',             "if (st.twist === 'oneMore') { st.total = st.n + 1; st.angles.push(packAngle(st.n)); }", "if (st.twist === 'oneMore') { st.total = st.n + 2; st.angles.push(packAngle(st.n)); st.angles.push(packAngle(st.n + 1)); }"],
  ['the twist drops a bead',        "else st.angles = arrange(st.twist, st.total, st.seed);", "else { st.total = st.n - 1; st.angles = arrange(st.twist, st.total, st.seed); }"],
  ['no twist at all',               "if (st.phase === 'howMany') { st.phase = 'after'; applyTwist(st);", "if (st.phase === 'howMany') { st.phase = 'after';"],
  ['the round never finishes',      "st.phase = 'done'; st.done = true;", "st.phase = 'done';"],
  ['recount keeps the count',       "st.counted = 0; st.phase = 'count'; st.picked = null; st.note = null;", "st.phase = 'count'; st.picked = null; st.note = null;"],
  ['recount forgets the twist',     "var kind = !st.twisted ? st.start : (st.twist === 'oneMore' ? 'spread' : st.twist);", "var kind = st.start;"],
  ['the hint never says slide',     "function hintKey(st) { return st.phase === 'count' ? 'hintSlide' : 'hintPick'; }", "function hintKey(st) { return 'hintPick'; }"],
  ['a giant desktop necklace',      "var D = Math.min(440, W - 236);", "var D = Math.min(600, W - 120);"],
  ['phone necklace edge to edge',   "var d = Math.min(420, Math.floor(W * 0.88));", "var d = Math.min(420, W);"],
  ['tiny phone cards',              "card: Math.max(64, Math.min(88, Math.floor((W - 24) / 3)))", "card: Math.max(40, Math.min(88, Math.floor((W - 24) / 3) - 30))"],
  ['the clasp moves to the right',  "return { x: CX + R * Math.sin(a), y: CY - R * Math.cos(a) };", "return { x: CX + R * Math.cos(a), y: CY - R * Math.sin(a) };"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nk-mut-'));
  fs.writeFileSync(path.join(dir, 'counting-necklace-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { NK_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-counting-necklace: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
