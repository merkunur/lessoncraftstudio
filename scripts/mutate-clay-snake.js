#!/usr/bin/env node
/* =====================================================================
   mutate-clay-snake.js — does verify-clay-snake-core.js BITE?
   Run: node scripts/mutate-clay-snake.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'clay-snake-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-clay-snake-core.js');
const MUTATIONS = [
  /* the design's list */
  ['L3: zero cuts on bij treated as nothing done',  "if (!st.cuts.length && sm.length) { st.show = true;", "if (!st.cuts.length) { st.show = true;"],
  ['the stamp splits the overflow across pieces',    "    if (k < syl.length) out[k - 1] = syl.slice(k - 1);\n", "    if (k < syl.length) out[0] = [syl[0]].concat(syl.slice(k));\n"],
  ['extra pieces receive a klankgroep',              "out.push(i < syl.length ? [syl[i]] : []);", "out.push([syl[Math.min(i, syl.length - 1)]]);"],
  ['a joint sticks for any pair in the word',        "out.push(a.s >= 0 && b.s === a.s + 1);", "out.push(a.s >= 0 && b.s >= 0);"],
  ['the decoy sticks',                               "out.push(a.s >= 0 && b.s === a.s + 1);", "out.push(b.s === a.s + 1 || a.s < 0 || b.s < 0);"],
  ['any order complete',                             "if (J.every(function (x) { return x; }) && lump(st, st.row[0]).s === 0) return win(st);", "return win(st);"],
  ['L3: an inner cut does not heal',                 "st.cuts = st.cuts.filter(function (g) { return sm.indexOf(g) >= 0; });", "void 0;"],
  ['L3: a cut allowed between i and j',              "if (word[i] === 'i' && word[i + 1] === 'j') { out.push('ij'); i += 2; } else", "if (false) {} else"],
  ['the 36 px refuse rule removed',                  "for (var i = 0; i < st.cuts.length; i++) if (Math.abs(st.cuts[i] - x) < MIN_GAP) return { result: 'refused' };", "void 0;"],
  ['the reshuffle may repeat the previous order',    "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['miss 2 locks the LAST klankgroep',               "var first = st.lumps.filter(function (l) { return l.s === 0; })[0].id;", "var first = st.lumps.filter(function (l) { return l.s === st.r.n - 1; })[0].id;"],
  /* the ladder, the deal, the data */
  ['no limit on pieces',                             "if (st.cuts.length + 1 >= MAX_PIECES) return { result: 'refused' };", "void 0;"],
  ['the decoy is not sent back',                     "st.row = st.row.filter(function (id) { return lump(st, id).s >= 0; }); st.tub = st.tub.concat(decoyIn);", "void 0;"],
  ['lumps in the tub count as a miss',               "if (trueInTub.length) { st.show = true; st.last = { result: 'tub' };", "if (trueInTub.length) { st.misses++; st.show = true; st.last = { result: 'tub' };"],
  ['two lumps always in reading order',              "else if (n === 2) out = (r.k + (pass || 0)) % 2 ? [1, 0] : [0, 1];", "else if (n === 2) out = [0, 1];"],
  ['3+ lumps may lie reversed',                      "rev = idx.slice().reverse();", "rev = idx.slice();"],
  ['the help persists after a move',                 "  function moved(st) { st.show = false; st.last = null; }", "  function moved(st) { }"],
  ['a hand split (vuur-tor-en)',                     "'lighthouse|beach/lighthouse|vuurtoren|vuur-to-ren'", "'lighthouse|beach/lighthouse|vuurtoren|vuur-tor-en'"],
  ['a picture whose label is not the word',          "'cat|animals/cat|kat|kat'", "'cat|animals/dog|kat|kat'"],
  ['a decoy that spells a word (zee + hond)',        "'starfish|beach/starfish|zeester|zee-ster|da'", "'starfish|beach/starfish|zeester|zee-ster|hond'"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cs-mut-'));
  fs.writeFileSync(path.join(dir, 'clay-snake-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { CS_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-clay-snake: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
