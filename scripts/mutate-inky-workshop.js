#!/usr/bin/env node
/* =====================================================================
   mutate-inky-workshop.js — does verify-inky-workshop-core.js BITE?
   Run: node scripts/mutate-inky-workshop.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The ink landing, the dripping, the doors and the cover stamps are
   rendering properties, gated by local-test-inky-book-workshop.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'inky-workshop-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-inky-workshop-core.js');
const MUTATIONS = [
  ['the author accepted for a page that needs a picture',  "function canFill(role, missing) { return INK[role] === missing; }", "function canFill(role, missing) { return role === 'author' || INK[role] === missing; }"],
  ['the reader accepted for an unfinished page',           "function canFill(role, missing) { return INK[role] === missing; }", "function canFill(role, missing) { return role === 'reader' || INK[role] === missing; }"],
  ['the wrong mark lands in the right place',              "else res.landed = ink === p.missing ? (ink === 'words' ? 'lines' : 'box') : (ink === 'words' ? 'box' : 'lines');", "else res.landed = ink === 'words' ? 'lines' : 'box';"],
  ['the cover accepts swapped portraits',                  "if (INK[role] === slot) {", "if (true) {"],
  ['the desks never rotate',                               "seats.push(s === seat[p] ? need : rest[k++]);", "seats.push(roles[s]);"],
  ['the cover slots never swap',                           "out[o[p]] = { seats: seats, coverSwap: swaps[p] === 1 };", "out[o[p]] = { seats: seats, coverSwap: false };"],
  ['the cover never opens',                                "if (st.page >= st.r.pages.length) st.phase = 'cover';", ""],
  ['no miss-2 hint',                                       "if (st.help >= 2) return 'hintLook';", ""],
  ['miss 2 pulses the wrong half',                         "return { open: true, pulse: current(st).missing };", "return { open: true, pulse: 'words' };"],
  ['a portrait can be stamped twice',                      "if (st.cover[slot] || st.cover.words === role || st.cover.picture === role) return null;", "if (st.cover[slot]) return null;"],
  ['the same seat three books running',                    "if (ok) return s;", "return s;"],
  ['the misses survive a turned page',                     "st.page++; st.misses = 0; st.help = 0;", "st.page++;"],
  ['a finished page to the author gets the wrong hint',    "if (R === 'done-page') return 'hintDone';", ""],
  ['card pictures below the floor at 704',                 "L.unit = wide ? 96 : 64;", "L.unit = wide ? 90 : 64;"],
  ['the next pass starts with the book just made',         " || pool[prev[prev.length - 1]].book === pool[o[0]].book", ""],
  ['page 1 of every book needs a picture',                 '"boat":{"pages":[["toys/boat","picture"],["weather/rainy","words"]', '"boat":{"pages":[["toys/boat","words"],["weather/rainy","picture"]'],
  ['the finished page kept in the two-desk book',          "return j === '3' || p[1] !== 'none';", "return true;"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'iw-mut-'));
  fs.writeFileSync(path.join(dir, 'inky-workshop-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { IW_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-inky-workshop: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
