#!/usr/bin/env node
/* =====================================================================
   mutate-measure-stations.js — does verify-measure-stations-core.js BITE?
   Run: node scripts/mutate-measure-stations.js — every mutation must be
   KILLED; a missed needle is a harness fault, never a skip. CRLF collapsed.
   The first nine are the design's list (§12); the rest guard the order,
   the hints, the window and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'measure-stations-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-measure-stations-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the track measures height',            "    if (bay === 'track') return { attr: 'long', bar: (o.lie[3] - o.lie[1]) * k, rot: o.lie[0] };", "    if (bay === 'track') return { attr: 'long', bar: (o.rest[4] - o.rest[2]) * k, rot: o.lie[0] };"],
  ['the giraffe stands on the track',      "giraffe:    { dir: 'zoo animals', rest: [0, -69, -122, 63, 126], lie: [-78.7, -125, -74, 130, 63],", "giraffe:    { dir: 'zoo animals', rest: [0, -69, -122, 63, 126], lie: [0, -69, -122, 63, 126],"],
  ['the spring ignores the weight',        "  function stretch(noun, narrow) { var h = OBJ[noun] && OBJ[noun].wt === 'heavy'; return narrow ? (h ? 38 : 9) : (h ? 62 : 14); }", "  function stretch(noun, narrow) { return narrow ? 24 : 38; }"],
  ['the kite is heavy',                    "kite:       { dir: 'toys', rest: [0, -68, -122, 66, 125], lie: [-94.6, -122, -61, 125, 73], wt: 'light',", "kite:       { dir: 'toys', rest: [0, -68, -122, 66, 125], lie: [-94.6, -122, -61, 125, 73], wt: 'heavy',"],
  ['a station answers 3 in a row',         "      if (!runOk(pool, a)) continue;\n", ""],
  ['the window as big as the picture',     "var SMALL = 0.56, WINDOW = 0.80,", "var SMALL = 0.56, WINDOW = 1.0,"],
  ['a row with one big',                   "['triangle', 'ssBsB']", "['triangle', 'sssBs']"],
  ['a small one ringed counted right',     "if (r && !big) wrongSmall.push(i);", ""],
  ['"short" with the length word on a height question', "    else k = o.hgt === 'tall' ? 'badgeTall' : 'badgeShortHeight';", "    else k = o.hgt === 'tall' ? 'badgeTall' : 'badgeShortLength';"],
  /* the rules */
  ['any station answers',                  "    if (ATTR[bay] === q) {", "    if (ATTR[bay] === q || bay === 'spring') {"],
  ['two ways ends after one',              "      if (st.two && st.step === 0) st.step = 1; else { st.done = true; res.complete = true; }", "      st.done = true; res.complete = true;"],
  ['a wrong station gets the wrong hint',  "    return { key: WRONG[L.bay][L.want], wrong: true };", "    return { key: WRONG[L.bay][L.attr === 'long' ? 'tall' : 'long'] || 'hintTrySign', wrong: true };"],
  ['no glow at miss 2',                    "  function glow(st) { return !st.done && !st.explore && st.mode === 'stations' && st.help >= 2 ? STATION[question(st)] : null; }", "  function glow(st) { return null; }"],
  ['free play graded',                     "    if (st.explore) { st.last = { result: 'play', bay: bay }; return st.last; }\n", ""],
  ['the same order twice',                 "      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;\n", ""],
  ['an empty size Check is a miss',        "    if (!st.rings.length) { st.last = { result: 'empty' }; return st.last; }\n", ""],
  ['two pictures: both can be ringed',     "    if (!st.two) st.rings = at >= 0 ? [] : [i];\n    else if", "    if"],
  ['the mirror forgets to flip',           "var row = opts.mirror ? r.row.split('').reverse().join('') : r.row;", "var row = r.row;"],
  ['the small picture at 0.7',             "var SMALL = 0.56,", "var SMALL = 0.7,"],
  ['a pose measured wrong',                "pencil:     { dir: 'classroom', rest: [44.7, -170, -28, 148, 32], lie: [44.7, -170, -28, 148, 32],", "pencil:     { dir: 'classroom', rest: [44.7, -170, -28, 148, 52], lie: [44.7, -170, -28, 148, 32],"],
  ['the stations do not fit a phone',      "    L.bayW = Math.floor((W - 2 * L.gap) / 3);", "    L.bayW = Math.max(110, Math.floor((W - 2 * L.gap) / 3));"],
  ['an object too big for the post',       "    return Math.min(L.rail / (o.lie[3] - o.lie[1]), (L.bayH * 0.42) / (o.lie[4] - o.lie[2]), L.postH / (o.rest[4] - o.rest[2]), (L.bayW - 34) / (o.rest[3] - o.rest[1]));", "    return Math.min(L.rail / (o.lie[3] - o.lie[1]), (L.bayW - 34) / (o.rest[3] - o.rest[1]));"],
  ['the badge ignores the noun gender',  "    return FEM[l] && FEM[l].indexOf(noun) >= 0 ? k + 'F' : k;", "    return k;"],
  ['a toy train weighs nothing',        "wt: 'heavy', len: 'long' }, /* a child knows trains are heavy (review) */", "wt: 'light', len: 'long' },"],
  ['miss 2 forgets the window hint',       "    if (st.mode === 'size') return { key: st.help >= 2 ? 'hintLook' : 'hintWindow', wrong: true };", "    if (st.mode === 'size') return { key: 'hintWindow', wrong: true };"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ms-mut-'));
  fs.writeFileSync(path.join(dir, 'measure-stations-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MS_CORE_DIR: dir }), timeout: 240000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-measure-stations: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
