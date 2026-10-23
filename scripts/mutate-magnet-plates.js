#!/usr/bin/env node
/* =====================================================================
   mutate-magnet-plates.js — does verify-magnet-plates-core.js BITE?
   Run: node scripts/mutate-magnet-plates.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first. CRLF collapsed
   before searching. (The plates' push, the hatch and the hook as drawn are
   rendering properties, gated by local-test-magnet-plates.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'magnet-plates-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'magnet-plates-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-magnet-plates-core.js');
const MUTATIONS = [
  ['plates join without a coupler',              "st.joints.every(function (j) { return j === 'and'; }) && st.end; }", "st.end; }"],
  ['an "and" holds on an open end',              "      return { held: false, reason: 'oneSide' };\n", "      if (st.joints[0] !== 'and') { st.joints[0] = 'and'; return { held: true }; } return { held: false, reason: 'oneSide' };\n"],
  ['the hatch opens without the end cap',        "    if (!st.end) return 'end';\n", ""],
  ['the first "and" stays an "and"',             "    if (i < last && st.joints[last] === 'and') return ',';", ""],
  ['en loses the serial comma',                  "(n > 2 && W.serial ? ', ' : ' ')", "(' ')"],
  ['German gains a serial comma',                "and: 'und', serial: false", "and: 'und', serial: true"],
  ['the robot makes two mistakes',               "      st.plates[r.slot] = r.bad;\n", "      st.plates[r.slot] = r.bad; st.plates[1 - r.slot] = r.bad;\n"],
  ['the tray ignores the count',                 "if ((st.tray[f] || 0) !== (want[f] || 0)) out.push(f);", "if (!!st.tray[f] !== !!want[f]) out.push(f);"],
  ['a plate phrase built by code',               "    return W[p.qty];\n", "    return p.qty > 1 ? ['', '', 'two', 'three'][p.qty] + ' ' + p.food + 's' : W[p.qty];\n"],
  ['the Finnish request loses its question mark', "end: 'kiitos?'", "end: 'kiitos.'"],
  ['the bins put the order first',               "    if (x.bins) r.bins = x.bins.slice();", "    if (x.bins) r.bins = x.o.map(function (o) { return o[0]; }).concat(x.bins.filter(function (f) { return !x.o.some(function (o) { return o[0] === f; }); }));"],
  ['an empty tray counts as a miss',             "if (!Object.keys(st.tray).length) { st.last = { reason: 'emptyTray' };", "if (!Object.keys(st.tray).length) { st.misses++; st.last = { reason: 'emptyTray' };"],
  ['the third thing never arrives',              "if (r.type === 'extend' && !st.extended) {", "if (false) {"],
  ['the end cap sits anywhere',                  "    if (where === 'dock') { st.end = true; return { held: true }; }", "    if (where) { st.end = true; return { held: true }; }"],
  ['no help on the second miss',                 "st.help = Math.min(2, st.tries);", "st.help = Math.min(1, st.tries);"],
  ['an "and" from an empty hook',                "    if (what === 'and' && hookAnds(st) < 1) return false;\n", ""],
  ['the next pass may start with the last round', "(prev.join() === o.join() || prev[prev.length - 1] === o[0])", "(prev.join() === o.join())"],
  ['two empty places on the robot rail',         "    if (st.plates.some(function (p) { return !p; })) return false;               /* one empty place at a time */\n", ""],
  ['unjoined plates hold',                       "    if (right === null || left === null) return 'repel';\n", ""],
  ['two bottles for one drink',                  "  var DRINKS = { milk: 1, juice: 1 };", "  var DRINKS = { milk: 1, juice: 1 }; var MAXQ_DRINK = 0;"]
];
/* (the last needle is a control that must SURVIVE: an unused variable changes nothing — it proves the harness can report a survivor) */
const CONTROL = 'two bottles for one drink';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 300000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mp-mut-'));
  fs.writeFileSync(path.join(dir, 'magnet-plates-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'magnet-plates-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MP_CORE_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-magnet-plates: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
