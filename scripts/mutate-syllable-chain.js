#!/usr/bin/env node
/* =====================================================================
   mutate-syllable-chain.js — does verify-syllable-chain-core.js BITE?
   Run: node scripts/mutate-syllable-chain.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate must
   be green on the CLEAN core first. CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'syllable-chain-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-syllable-chain-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the clasp closes on any word CONTAINING the syllable', "    if (f === syl) {", "    if (word(k).syl.indexOf(syl) >= 0) {"],
  ['the clasp compares first letters',             "    var syl = clasp(st), f = first(k);", "    var syl = clasp(st), f = first(k)[0] === clasp(st)[0] ? clasp(st) : first(k);"],
  ['the trick picture removed from every step',    "    if (sp.lure && st.lure) out.push(sp.lure);", "    if (false) out.push(sp.lure);"],
  ['two cards start with the clasp syllable',      "['penna', ['nave', 'luna', 'nuvola']", "['penna', ['nave', 'luna', 'naso']"],
  ['the answer always in the left slot',           "  function deal(st) { return shuffle(cards(st, st.step), st.rnd); }", "  function deal(st) { return cards(st, st.step); }"],
  ['unhook removes any link',                      "    st.chain.pop(); st.step--;", "    st.chain.splice(1, 1); st.step--;"],
  ['count, too few: the syllables spread evenly',  "if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1);", "if (k > 0 && k < syl.length) out[0] = syl.slice(0, syl.length - k + 1);"],
  ['count, too many: the extras filled',           "for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []);", "for (var i = 0; i < k; i++) out.push([syl[i % syl.length]]);"],
  ['build accepts any order',                      "st.filled.forEach(function (id, i) { if (id === null) return; if (tile(st, id).s === i) ok.push(i); else wrong.push(i); });", "st.filled.forEach(function (id, i) { if (id === null) return; ok.push(i); });"],
  ['miss 2 tags only the answer card',             "st.basket.map(function (k) { return { word: k, first: first(k) }; })", "st.basket.filter(function (k) { return first(k) === clasp(st); }).map(function (k) { return { word: k, first: first(k) }; })"],
  ['the reshuffle may repeat an order',            "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  /* found in this build */
  ['the sofa back as so·fà',                        "['sole', 'vaso', 'sedia']],\n    ['gallina'", "['sofà', 'vaso', 'sedia']],\n    ['gallina'"],
  ['the wasp back as the answer for «ve»',        "['vestito', 'chiave', 'volpe']]\n  ];\n  var LONG", "['vespa', 'chiave', 'volpe']]\n  ];\n  var LONG"],
  ['pen·na back beside «pe»',                      "['ape', ['pera', 'volpe', 'piuma']", "['ape', ['pera', 'volpe', 'penna']"],
  ['tor·ta back beside «to»',                      "['topo', 'letto', 'tazza']", "['topo', 'letto', 'torta']"],
  ['a plain card loses its same first sound',      "['palla', ['lama', 'scala', 'luna']", "['palla', ['lama', 'scala', 'gufo']"],
  ['the trick picture stays when it is off',      "    if (sp.lure && st.lure) out.push(sp.lure);", "    if (sp.lure) out.push(sp.lure);"],
  ['a right hook keeps the help',                  "      st.chain.push(k); st.step++; st.misses = 0; st.help = 0; moved(st);", "      st.chain.push(k); st.step++; moved(st);"],
  ['the start link can be unhooked',              "if (st.done || st.r.level === 'build' || st.chain.length < 2) return false;", "if (st.done || st.r.level === 'build' || st.chain.length < 1) return false;"],
  ['three tiles may start reversed',               "if (n < 3 || (!inOrder(o) && !reversed(o))) return o;", "if (n < 3 || !inOrder(o)) return o;"],
  ['miss 2 does not place the next tile',          "      if (at >= 0) { st.filled[at] = 't' + at; st.locked.push(at); st.last.auto = at; }", "      void at;"],
  ['wrong tiles stay in their sockets',            "    wrong.forEach(function (i) { st.filled[i] = null; });", ""],
  ['more than five sockets',                       "n > MAX_SOCKETS", "n > 9"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scn-mut-'));
  fs.writeFileSync(path.join(dir, 'syllable-chain-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SCN_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-syllable-chain: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
