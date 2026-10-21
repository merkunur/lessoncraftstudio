#!/usr/bin/env node
/* =====================================================================
   mutate-wake-up-pip.js — does verify-wake-up-pip-core.js BITE?
   Run: node scripts/mutate-wake-up-pip.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The riffle, the glide, the jiggle and Pip sitting up are rendering
   properties, gated by local-test-wake-up-pip.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'wake-up-pip-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-wake-up-pip-core.js');
const MUTATIONS = [
  ['a reversed stack plays through',                 "if (p.pos < prev) return { at: i, kind: 'backwards' };", "if (false) return { at: i, kind: 'backwards' };"],
  ['the trivial page accepted as the key',           "if (p.kind === 'trivial') return { at: i, kind: 'dead' };", ""],
  ['the foreign page accepted',                      "if (p.kind === 'foreign') return { at: i, kind: 'foreign' };", ""],
  ['the flip reports the wrong break',               "if (p.pos < prev) return { at: i, kind: 'backwards' };", "if (p.pos < prev) return { at: i - 1, kind: 'backwards' };"],
  ['the trivial page moves the main picture',        "frame: { t: [clone(mainT), [pic,", "frame: { t: [[mainT[0], mainT[1] + 10, mainT[2], mainT[3]], [pic,"],
  ['the 3-page book keeps the dropped beat',         "if (pages(n) === 4 || b + 1 !== d) out.push(b);", "out.push(b);"],
  ['the retell glues the starter to the caption',    "return { starter: labels[i], caption: p.caption };", "return { starter: labels[i], caption: labels[i] + ', ' + p.caption };"],
  ['the 3-page ribbon says Then',                     "labels = r.n === 4 ? S : [S[0], S[1], S[3]];", "labels = r.n === 4 ? S : [S[0], S[1], S[2]];"],
  ['the loose pages may arrive in order',            "while (o.join() === ids.join() || o.join() === ids.slice().reverse().join());", "while (false);"],
  ['the key page always in the first tray slot',     "t.push(s === slots[k] ? r.pages[r.empty].id : odd[oi++]);", "t.push(s === 0 ? r.pages[r.empty].id : odd[oi++]);"],
  ['a locked page can be picked',                    "if (st.tray.indexOf(id) < 0 && (si < 0 || st.locked[si])) return false;", "if (st.tray.indexOf(id) < 0 && si < 0) return false;"],
  ['the sentence strips may arrive in order',        "while (o.length > 1 && o.join() === ids.join());", "while (false);"],
  ['wrong sentences stay under the pictures',        "wrong.forEach(function (i) { st.strips.push(st.caps[i]); st.caps[i] = null; });", ""],
  ['miss 2 ghosts the wrong page',                   "return { ghost: i, page: r.pages[i].id, from: at };", "return { ghost: i, page: r.pages[0].id, from: at };"],
  ['an empty slot counts a miss',                    "if (st.sockets.some(function (x) { return x === null; })) { st.show = true;", "if (st.sockets.some(function (x) { return x === null; })) { st.misses++; st.show = true;"],
  ['the kite flies up in the middle of the story',   '["spring/kite",54,64,1]', '["spring/kite",54,30,1]'],
  ['a foreign thing is another story’s hero',      '"sun":[1,"spring/bee","vehicles/boat"]', '"sun":[1,"spring/bee","beach/crab"]'],
  ['two sandcastle cards look the same',             '[["beach/sandcastle",38,96,1.25],["beach/crab",78,96,1,-12]]', '[["beach/crab",24,96,1],["beach/sandcastle",62,96,1.25]]'],
  ['the empty slot balance broken',                  '"seed":[4,"spring/worm","toys/train"]', '"seed":[3,"spring/worm","toys/train"]'],
  ['the next pass starts with the book just played', " || pool[prev[prev.length - 1]].story === pool[o[0]].story", ""],
  ['card pictures below the floor at 704',           "L.unit = wide ? 96 : 64;", "L.unit = wide ? 90 : 64;"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wup-mut-'));
  fs.writeFileSync(path.join(dir, 'wake-up-pip-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { WUP_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-wake-up-pip: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
