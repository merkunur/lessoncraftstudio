#!/usr/bin/env node
/* =====================================================================
   mutate-photo-syllables.js — does verify-photo-syllables-core.js BITE?
   Run: node scripts/mutate-photo-syllables.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The safelight, the strips' fade, the album and the curl are rendering
   properties, gated by local-test-photo-syllables.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'photo-syllables-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-photo-syllables-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a wrong order develops whole',              "if (bs.length === n && bs.every(function (b) { return b.sharp; })) {", "if (bs.length === n && bs.every(function (b) { return !b.foreign; })) {"],
  ['a decoy strip drawn from the target photo', "var c = byId(st, id), w = 1 / c.srcCount, b = { id: id, pic: c.pic,", "var c = byId(st, id), w = 1 / c.srcCount, b = { id: id, pic: r.w.pic,"],
  ['strip width from the round word',           "var c = byId(st, id), w = 1 / c.srcCount,", "var c = byId(st, id), w = 1 / r.w.syl.length,"],
  ['a missing card closes the gap',             "gap: end < 1 - 1e-9 ? 1 - end : 0", "gap: 0"],
  ['the tray in word order',                    "if (n === 2) shuffle(p, rnd);\n    else if (n > 2) for (var t = 0; t < 400; t++) { shuffle(p, rnd); if (isDerangement(p)) break; }", ""],
  ['a misplaced card develops sharp',           "sharp: c.src === r.w.key && c.srcIdx === i };", "sharp: c.src === r.w.key };"],
  ['the ghost before miss 2',                   "return !st.done && st.show && st.help >= 2;", "return !st.done && st.show && st.help >= 1;"],
  ['the ghost kept after a move',               "function moved(st) { st.developed = null; st.show = false; st.last = null; }", "function moved(st) { st.developed = null; st.last = null; }"],
  ['the grey e on a non-final e',               "return idx === w.syl.length - 1 && /e$/.test(w.word) && w.syl[idx].length > 1;", "return /e/.test(w.syl[idx]);"],
  ['pass 2 order = pass 1',                     "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['a legacy word dropped',                     ", ['ambulance', [['bal', 'ballon']]]];", "];"],
  /* found in this build */
  ['two cards always swapped (a tell)',         "if (n === 2) shuffle(p, rnd);", "if (n === 2) p.reverse();"],
  ['the teddy back as ours',                    "ours|camping/bear|ours", "ours|forest creatures/bear|ours"],
  ['a decoy that is one of the word\'s syllables', "['tortue', [['tour', 'tournesol']]]", "['tortue', [['tor', 'tournesol']]]"],
  ['the tu decoy back beside tue',              "['tortue', [['tour', 'tournesol']]]", "['tortue', [['tu', 'voiture']]]"],
  ['the am decoy back beside an',               "['ange', [['la', 'lapin']]]", "['ange', [['am', 'ambulance']]]"],
  ['the mountain lake back',                    "lit|furniture/bed|lit;", "lac|camping/lake|lac;"],
  ['one decoy for a one-syllable word',         "['chat', [['cho', 'chocolat'], ['chien', 'chien']]]", "['chat', [['cho', 'chocolat']]]"],
  ['an empty rail counted as a miss',           "if (!st.rail.length) { st.show = true; st.last = { result: 'empty' }; st.developed = null; return { ok: false, kase: 'empty' }; }", "if (!st.rail.length) { st.misses++; st.show = true; st.last = { result: 'empty' }; st.developed = null; return { ok: false, kase: 'empty' }; }"],
  ['missing reported as mixed up',              ": bs.length < n ? 'missing' : 'order';", ": 'order';"],
  ['the decoy always first in the tray',        "if (c.id[0] === 'x') st.tray.splice(Math.floor(rnd() * (st.tray.length + 1)), 0, c.id);", "if (c.id[0] === 'x') st.tray.unshift(c.id);"],
  ['moves allowed after the photo is whole',    "if (st.done || from < 0) return false;\n    to = Math.max", "if (from < 0) return false;\n    to = Math.max"],
  ['Carte piège aucune still deals the decoy',  "if (opts.decoy !== false) r.decoys", "if (true) r.decoys"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'phs-mut-'));
  fs.writeFileSync(path.join(dir, 'photo-syllables-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PHS_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-photo-syllables: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
