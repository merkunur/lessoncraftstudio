#!/usr/bin/env node
/* =====================================================================
   mutate-family-lock.js — does verify-family-lock-core.js BITE?
   Run: node scripts/mutate-family-lock.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The drum, the fan, the nubs and the keyring are rendering properties,
   gated by local-test-family-lock.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'family-lock-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-family-lock-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a wheel starts on its answer',             "start: (ans + off + len * 4) % len, idx: (ans + off + len * 4) % len", "start: ans, idx: ans"],
  ['the reel not in the order a e i o u',      "VOWELS = ['a', 'e', 'i', 'o', 'u']", "VOWELS = ['a', 'i', 'e', 'o', 'u']"],
  ['one wrong wheel still opens the lock',     "if (!wrong.length) {", "if (wrong.length <= 1) {"],
  ['a wrong wheel pinned at miss 1',           "st.pinned = right.slice(); st.wobble = wrong.slice();", "st.pinned = right.concat(wrong.slice(0, 1)); st.wobble = wrong.slice();"],
  ['the notch before miss 2',                  "(st.show && st.help >= 2 && st.pinned.indexOf(q) < 0)", "(st.show && st.help >= 1 && st.pinned.indexOf(q) < 0)"],
  ['the notch stays after a roll',             "function touch(st, q) { st.touched = true; st.show = false;", "function touch(st, q) { st.touched = true;"],
  ['the plate reads right to left',            "return st.wheels.map(face);", "return st.wheels.map(face).reverse();"],
  ['the decoy accepted in a socket',           "(parts[i] === r.w.syl[i] ? right : wrong).push(i);", "(parts[i] === r.w.syl[i] || parts[i] === r.decoy ? right : wrong).push(i);"],
  ['the tray in word order',                   "st.tray = p.map(", "st.tray = r.w.syl.map(function (_, q) { return q; }).map("],
  ['a legacy word dropped',                    ", 'panela', 'formiga'];", ", 'panela'];"],
  ['a split not from approved-words',          "girassol|flowers/sunflower|gi-ras-sol", "girassol|flowers/sunflower|gi-ra-ssol"],
  ['pass 2 order = pass 1',                    "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['a five-face ç wheel',                      "vs = onset === 'ç' ? CEDILLA : VOWELS", "vs = VOWELS"],
  /* found in this build */
  ['the start offsets all one way',            "deck.push(OFFSETS[i % 4])", "deck.push(1)"],
  ['nothing moved counted as a miss',          "} else if (!st.touched) {", "} else if (false) {"],
  ['a decoy from no family of the word',       "['tigre', 'gra']", "['tigre', 'pa']"],
  ['the decoy is one of the word\'s syllables', "['zebra', 'bri']", "['zebra', 'ze']"],
  ['the pi·pi face back on the pipa wheel',    "pipa: [[], ['pi', 'po']]", "pipa: [[], ['po']]"],
  ['ga·ta back on the cat',                    "gato: [[], ['ta']], ", ""],
  ['sa·pu·ta back on the shoe',                "sapato: [[], ['pu'], ['ta']]", "sapato: [[], [], ['ta']]"],
  ['the decoy gri (ti·gri sounds like tigre)', "['tigre', 'gra']", "['tigre', 'gri']"],
  ['the gold nub points the long way',         "d <= len / 2 ? 1 : -1", "d <= len / 2 ? -1 : 1"],
  ['the ghost before miss 2',                  "(st.show && st.help >= 2)); }", "(st.show && st.help >= 1)); }"],
  ['a duckling pictured',                      "foca|ocean life/seal|fo-ca", "foca|animals/duck|fo-ca"],
  ['ç allowed before e',                       "    if (vs.indexOf(m[2]) < 0) return null;\n", ""],
  ['a roll does not lift the pin',             "var k = st.pinned.indexOf(q); if (k >= 0) st.pinned.splice(k, 1); }", "}"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'flk-mut-'));
  fs.writeFileSync(path.join(dir, 'family-lock-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FLK_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-family-lock: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
