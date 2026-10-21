#!/usr/bin/env node
/* =====================================================================
   mutate-linc-fact-chain.js — does verify-linc-fact-chain-core.js BITE?
   Run: node scripts/mutate-linc-fact-chain.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The fall, the lean angles, the rail and the drag are rendering
   properties, gated by local-test-linc-fact-chain.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'linc-fact-chain-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'linc-fact-chain-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-linc-fact-chain-core.js');
const MUTATIONS = [
  ['any card completes the chain',                 "return p.fact !== undefined || placed[p.gap] === r.answer[p.gap];", "return true;"],
  ['the same-word lure accepted',                  "return p.fact !== undefined || placed[p.gap] === r.answer[p.gap];", "return p.fact !== undefined || placed[p.gap] === r.answer[p.gap] || placed[p.gap] === 's';"],
  ['the because gap stands after the fact',        "r.places = d === 'because' ? [{ gap: 0 }, { fact: X[0] }] : [{ fact: X[0] }, { gap: 0 }];", "r.places = [{ fact: X[0] }, { gap: 0 }];"],
  ['the chain accepts swapped order',              "r.places = [{ fact: X[0] }, { gap: 0 }, { gap: 1 }]; r.answer = ['b', 'c'];", "r.places = [{ fact: X[0] }, { gap: 0 }, { gap: 1 }]; r.answer = ['c', 'b'];"],
  ['the joined sentence built by concatenation',   "joined: X[X.length - 1] };", "joined: X[0] + ' ' + X[1] };"],
  ['the tray in a fixed order',                    "var keys = trayKeys(r, fewer), first = r.answer[0], rest = shuffle(keys.filter(function (k) { return k !== first; }), rnd), out = [];", "var keys = trayKeys(r, fewer), first = r.answer[0], rest = keys.filter(function (k) { return k !== first; }), out = [];"],
  ['the right card always in slot one',            "for (var i = 0; i < len; i++) a.push(i % k);", "for (var i = 0; i < len; i++) a.push(0);"],
  ['one cause direction three in a row',           "if (dirOf(level, o[i]) === dirOf(level, o[i - 1]) && dirOf(level, o[i]) === dirOf(level, o[i - 2])) bad = true;", "if (false) bad = true;"],
  ['Fewer drops the lure that teaches',            "var DROP = { next: 'u', so: 'x', because: 's', chain: 'l2' };", "var DROP = { next: 'o', so: 's', because: 'x', chain: 'l1' };"],
  ['the chain does not stop at a false link',      "for (var i = 1; i < r.places.length; i++) f.push(f[i - 1] && placeRight(r, placed, i - 1) && placeRight(r, placed, i));", "for (var i = 1; i < r.places.length; i++) f.push(placeRight(r, placed, i));"],
  ['the wrong cards stay standing after a miss',   "if (st.placed[g] && st.placed[g] !== st.r.answer[g]) st.placed[g] = null;", "if (false) st.placed[g] = null;"],
  ['an empty Check counts as a miss',              "if (firstEmpty(st) >= 0) { st.show = true;", "if (firstEmpty(st) >= 0) { st.misses++; st.show = true;"],
  ['Linc below the floor at 704',                  "linc: wide ? 96 : 64", "linc: wide ? 90 : 64"],
  ['the next pass repeats the order',              "if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;", "if (false) continue;"],
  ['the miss shows the wrong pair',                "res.pair = [placeText(r, st.placed, broken - 1), placeText(r, st.placed, broken)];", "res.pair = [placeText(r, st.placed, 0), placeText(r, st.placed, 1)];"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lf-mut-'));
  fs.writeFileSync(path.join(dir, 'linc-fact-chain-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'linc-fact-chain-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LF_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-linc-fact-chain: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
