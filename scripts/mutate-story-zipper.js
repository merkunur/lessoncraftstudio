#!/usr/bin/env node
/* =====================================================================
   mutate-story-zipper.js — does verify-story-zipper-core.js BITE?
   Run: node scripts/mutate-story-zipper.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The slider, the jam, the glow and the reading are rendering
   properties, gated by local-test-willow-story-corner.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'story-zipper-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-story-zipper-core.js');
const MUTATIONS = [
  ['the middle accepted when only one story has it',     "var ok = s === 'mid' ? (L && R) :", "var ok = s === 'mid' ? (L || R) :"],
  ['a side accepted for a both-tooth',                   "s === 'left' ? (L && !R) :", "s === 'left' ? L :"],
  ['the pocket accepted for something in a story',       ": (!L && !R);", ": true;"],
  ['the answer read off the wrong side',                 "return inA === aLeft ? 'left' : 'right';", "return inA ? 'left' : 'right';"],
  ['the sides never swap',                               "var swap = pass % 2 === 1,", "var swap = false,"],
  ['three answers the same running',                     "for (var q = 2; q < spots.length && ok; q++) if (spots[q] === spots[q - 1] && spots[q] === spots[q - 2]) ok = false;", ""],
  ['two zippers running open on the middle',             "for (var z = 1; z < order.length && ok; z++) if (spots[z * ROWS] === 'mid' && spots[(z - 1) * ROWS] === 'mid') ok = false;", ""],
  ['the next pass may repeat the last',                  "if (ids === pids.join() || pids[pids.length - 1] === seq[0].pair + '.' + seq[0].dim) ok = false;", ""],
  ['the same animal zippers every pass',                 "return [G.both[pass % G.both.length], G.one[pass % G.one.length], G.neither[pass % G.neither.length]];", "return [G.both[0], G.one[0], G.neither[0]];"],
  ['an empty pull counts as a miss',                     "if (!st.spot) { st.show = true;", "if (!st.spot) { st.misses++; st.show = true;"],
  ['no miss-2 hint',                                     "if (st.help >= 2) return (st.result.truth === 'pocket' ? 'hintNone' : 'hintGlow') + A;", ""],
  ['miss 2 lights the wrong story',                      "return { left: ev.left, right: ev.right, pocket:", "return { left: ev.right, right: ev.left, pocket:"],
  ['the hint for a side tooth that needs both says this story', "(s === 'left' ? L : R)) ? 'other' : 'this';", "(s === 'left' ? L : R)) ? 'this' : 'this';"],
  ['pictures below the floor at 704',                    "L.unit = wide ? 96 : 64;", "L.unit = wide ? 90 : 64;"],
  ['a zipper of four teeth (elimination works)',         '"teeth":["lost","help","alone","found","climb"]', '"teeth":["lost","help","alone","climb"]'],
  ['the same doubled kind in every zipper',              '"teeth":["happy","scared","climb","made","rain"]', '"teeth":["happy","scared","climb","made","found"]'],
  ['Bunny also searched alone (two right places)',       '"facts":{"lost":0,"help":1,"found":2}', '"facts":{"lost":0,"help":1,"found":2,"alone":1}'],
  ['the success sentence names the wrong friend',        'Only Bunny got help from a friend.', 'Only Fox got help from a friend.'],
  ['a feature the picture does not show',                '"lion":{"pic":"zoo animals/lion","facts":{"fourlegs":[52,88,22],"mane":[40,32,22]}}', '"lion":{"pic":"zoo animals/lion","facts":{"fourlegs":[52,88,22],"mane":[40,32,22],"stripes":[50,50,10]}}']
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sz-mut-'));
  fs.writeFileSync(path.join(dir, 'story-zipper-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SZ_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-story-zipper: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
