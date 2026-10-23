#!/usr/bin/env node
/* =====================================================================
   mutate-lamplight-cupboard.js — does verify-lamplight-cupboard-core.js
   BITE? Run: node scripts/mutate-lamplight-cupboard.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The cupboard as DRAWN — lamps, the door, the pegs, the tickets — is a
   rendering property, gated by local-test-lamplight-cupboard.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'lamplight-cupboard-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-lamplight-cupboard-core.js');
const MUTATIONS = [
  ['"big" lights every thing',                         "if (c === 's') return t.size === (k === 'big' ? 'B' : 'S');", "if (c === 's') return k === 'big' || t.size === 'S';"],
  ['the shelf word ignores the mirror',                "shelf: flip(t[2]), col:", "shelf: t[2], col:"],
  ['"next to" reaches two cubbies',                    "Math.abs(o.col - t.col) === 1 && o.noun === k", "Math.abs(o.col - t.col) >= 1 && o.noun === k"],
  ['"next to" ignores the shelf',                      "return r.things.some(function (o) { return o !== t && o.shelf === t.shelf && Math.abs", "return r.things.some(function (o) { return o !== t && Math.abs"],
  ['a jam is let through',                             "if (L.length === 1 && L[0] === r.target) { st.done = true; st.last = { reason: 'ok', lit: L };", "if (L.length >= 1 && L.indexOf(r.target) >= 0) { st.done = true; st.last = { reason: 'ok', lit: L };"],
  ['the LAST word rolls off, not the first',           "st.pegs = ws.slice(Math.max(0, ws.length - st.memory)); st.dropped = ws.slice(0, Math.max(0, ws.length - st.memory));", "st.pegs = ws.slice(0, st.memory); st.dropped = ws.slice(st.memory);"],
  ['an overflow is reported as a jam',                 "var why = st.dropped.length ? 'overflow' : door === 'jam'", "var why = door === 'jam'"],
  ['no reason lights no help',                         ".filter(function (p) { return p >= 0; }) : [0, 1, 2]; }", ".filter(function (p) { return p >= 0; }) : []; }"],
  ['a wrong face is accepted',                         "if (F.length === 1 && F[0] === fp && H.length === 1 && H[0] === hp)", "if (H.length === 1 && H[0] === hp)"],
  ['the feeling is never placed at its slot',          "for (var p = 0, q = 0; p < 3; p++) out.push(p === pos ? right : rest[q++]);", "for (var p = 0, q = 0; p < 3; p++) out.push(p === 2 ? right : rest[q++]);"],
  ['the pass does not open with rounds 0 and 1',       "order = level === 'l1' ? [0, 1].concat(shuffle(all.slice(2), rnd)) : shuffle(all.slice(), rnd);", "order = shuffle(all.slice(), rnd);"],
  ['a pass may repeat the last order',                 "if (prev && prev.length && prev.join() === order.join()) continue;", ""],
  ['the target may sit in the same cubby twice',       "if (cubby(tg) === lastCub) { ok = false; break; }", ""],
  ['the pairs may be dealt apart',                     "(x.pairs || []).forEach(function (p) { if (Math.abs(cols[p[0]] - cols[p[1]]) !== 1) ok = false; });", ""],
  ['Swedish loses double definiteness',                "else if (loc === 'sv' || loc === 'no') { if (sw) { put(g === 'n' ? 'det ' : 'den '); put(L[size] + ' ', sw); } noun(N[2]); }", "else if (loc === 'sv' || loc === 'no') { if (sw) { put(g === 'n' ? 'det ' : 'den '); put(L[size] + ' ', sw); noun(N[0]); } else noun(N[2]); }"],
  ['French forgets the elision',                       "put(/^[aeiouéèêh]/i.test(first) ? 'l’' : (g === 'f' ? 'la ' : 'le '));", "put(g === 'f' ? 'la ' : 'le ');"],
  ['the help for the dark is the moon',                "dark: 'furniture/lamp'", "dark: 'camping/moon'"],
  ['the phone pictures fall under the floor',          "small: wide ? 96 : 64,", "small: wide ? 96 : 56,"],
  ['an unused variable (control)',                     "  function cubby(t) { return (t.shelf === 'T' ? 0 : 3) + t.col; }", "  function cubby(t) { return (t.shelf === 'T' ? 0 : 3) + t.col; } var UNUSED_CONTROL = 0;"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lc-mut-'));
  fs.writeFileSync(path.join(dir, 'lamplight-cupboard-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LC_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-lamplight-cupboard: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
