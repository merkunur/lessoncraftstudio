#!/usr/bin/env node
/* =====================================================================
   mutate-opposites-rod.js — does verify-opposites-rod-core.js BITE?
   Run: node scripts/mutate-opposites-rod.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The slide, the rod paint, the drag and the clip animation are
   rendering properties, gated by local-test-opposites-rod.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'opposites-rod-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'opposites-rod-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-opposites-rod-core.js');
const MUTATIONS = [
  ['any card reaches the far end',                "if (c.home === 'far') { st.at = c.id;", "if (true) { st.at = c.id;"],
  ['the near-miss counts as no miss',             "st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: c.home, word: c.word };", "st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: c.home, word: c.word };"],
  ['the hot rod has no middle groove',            '{"id":"hot","rod":"temp"', '{"id":"hot","rod":"grey"'],
  ['the right card always in slot one',           "for (var i = 0; i < len; i++) a.push(i % 3);", "for (var i = 0; i < len; i++) a.push(0);"],
  ['the right card placed off its dealt slot',    "for (i = 0, r = 0; i < 3; i++) out.push(i === (slot | 0) % 3 ? cards[0] : basket[r++]);", "for (i = 0, r = 0; i < 3; i++) out.push(i === 0 ? cards[0] : basket[r++]);"],
  ['the upright rod flips with the end',          "end: R0.vertical ? 'L' : end", "end: end"],
  ['a typed word is case-sensitive',              "return String(s || '').trim().replace(/\\s+/g, ' ').toLocaleLowerCase().replace(/ß/g, 'ss');", "return String(s || '').trim().replace(/\\s+/g, ' ');"],
  ['typing the target is no miss',                "st.last = { reason: 'itself', word: st.r.target.word }; st.misses++;", "st.last = { reason: 'itself', word: st.r.target.word };"],
  ['an unknown word counts as a miss',            "st.show = true; st.last = { reason: 'spell' }; return { home: 'unknown' };", "st.misses++; st.show = true; st.last = { reason: 'spell' }; return { home: 'unknown' };"],
  ['the blank never takes a capital',             "R.fill = atStart(R.sentence) ? cap(cards[0].word) : cards[0].word;", "R.fill = cards[0].word;"],
  ['two flips finish the scene',                  "if (st.flipped.every(Boolean))", "if (st.flipped.filter(Boolean).length >= 2)"],
  ['a same-word on the far end is accepted',      "return !((c.home === 'same' && st.ends[id] === 'near') || (c.home === 'far' && st.ends[id] === 'far')); });", "return !((c.home === 'same') || (c.home === 'far' && st.ends[id] === 'far')); });"],
  ['the wrong words stay put after Check',        "wrong.forEach(function (id) { delete st.ends[id]; });", "wrong.forEach(function (id) { });"],
  ['an empty Check counts as a miss',             "if (!placed.length) { st.show = true;", "if (!placed.length) { st.misses++; st.show = true;"],
  ['a card fits any rod',                         "if (c.rod === rod) { st.filled[rod] = id;", "if (true) { st.filled[rod] = id;"],
  ['the pair cards never rotate',                 "rot = (+n) % 3", "rot = 0"],
  ['any clip closes',                             "if (c.idx === st.r.right) { st.done = true;", "if (true) { st.done = true;"],
  ['the right clip off its hook slot',            "for (i = 0, r = 0; i < 3; i++) hook.push(i === (slot | 0) % 3 ? clips[right] : others[r++]);", "for (i = 0, r = 0; i < 3; i++) hook.push(i === 2 ? clips[right] : others[r++]);"],
  ['a wrong flip clip makes impossible',          '["possible",2,"impossible"]', '["possible",0,"impossible"]'],
  ['the next pass repeats the order',             "if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;", "if (false) continue;"],
  ['the scene loses a pair',                      'var SCENE = [["day","night"],["on","off"],["open","closed"]];', 'var SCENE = [["day","night"],["on","off"]];'],
  ['pictures below the floor at 704',             "pic: wide ? 96 : 64", "pic: wide ? 90 : 64"],
  ['the second miss gives no help',               "if (st.help >= 2 && /^(mid|same|off|cross|itself)$/.test(L)) key = 'hMiss2';", "if (false) key = 'hMiss2';"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-mut-'));
  fs.writeFileSync(path.join(dir, 'opposites-rod-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'opposites-rod-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TR_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-opposites-rod: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
