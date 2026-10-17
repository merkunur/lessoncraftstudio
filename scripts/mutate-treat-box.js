#!/usr/bin/env node
/* =====================================================================
   mutate-treat-box.js — does verify-treat-box-core.js BITE?
   Run: node scripts/mutate-treat-box.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'treat-box-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-treat-box-core.js');
const MUTATIONS = [
  ['a 0 order put back',            "to5: [3, 5, 2, 4, 1, 5, 3, 4]", "to5: [3, 5, 2, 4, 0, 5, 3, 4]"],
  ['a round dropped',               "to10: [7, 4, 9, 6, 3, 8, 5, 10, 2]", "to10: [7, 4, 9, 6, 3, 8, 5, 10]"],
  ['the tray holds just enough',    "var TRAY = { to10: 12, to5: 7 };", "var TRAY = { to10: 10, to5: 5 };"],
  ['the box fits the biggest order', "var SLOTS = { to10: 12, to5: 6 };", "var SLOTS = { to10: 10, to5: 6 };"],
  ['the tray size follows the order', "tray: TRAY[key], slots: SLOTS[key] });", "tray: POOLS[key][i] + 2, slots: SLOTS[key] });"],
  ['the same treat every round',    "noun: NOUNS[(i * 3) % NOUNS.length]", "noun: NOUNS[0]"],
  ['a pancake stack to count',      "'lollipop', 'brownie', 'waffle'];", "'lollipop', 'pancake', 'waffle'];"],
  ['a treat goes in twice',         "|| inBox(st, h) || st.box.length >= st.slots) return -1;", "|| st.box.length >= st.slots) return -1;"],
  ['the box overfills',             "|| inBox(st, h) || st.box.length >= st.slots) return -1;", "|| inBox(st, h)) return -1;"],
  ['take-out removes the last one', "var h = st.box.splice(j, 1)[0]; st.checked = null; return h;", "var h = st.box.pop(); st.checked = null; return h;"],
  ['a change keeps the old verdict', "st.box.push(h); st.checked = null; return st.box.length - 1;", "st.box.push(h); return st.box.length - 1;"],
  ['empty does nothing',            "st.box = []; st.checked = null; return true; }", "st.checked = null; return true; }"],
  ['a done box still changes',      "if (!st || st.done || h < 0 || h >= st.tray", "if (!st || h < 0 || h >= st.tray"],
  ['more and fewer swapped',        "slip = a > st.n ? 'more' : 'fewer';", "slip = a > st.n ? 'fewer' : 'more';"],
  ['one off is right',              "else if (a !== st.n) slip", "else if (Math.abs(a - st.n) > 1) slip"],
  ['an empty Check is a miss',      "else if (slip !== 'none') st.misses++;", "else st.misses++;"],
  ['a wrong Check is no miss',      "else if (slip !== 'none') st.misses++;", "else if (slip === 'more') st.misses++;"],
  ['the lid never shuts',           "function lidOpen(st, lid, peeking) { return lid === 'off' || st.done || st.misses >= 1 || !!peeking; }", "function lidOpen(st, lid, peeking) { return true; }"],
  ['the lid back on after a miss',  "return lid === 'off' || st.done || st.misses >= 1 || !!peeking;", "return lid === 'off' || st.done || !!peeking;"],
  ['the lid setting ignored',       "return lid === 'off' || st.done", "return st.done"],
  ['numbers at once',               "var on = st.done || helpLevel(st) >= 2;", "var on = true;"],
  ['numbers after one miss',        "var on = st.done || helpLevel(st) >= 2;", "var on = st.done || helpLevel(st) >= 1;"],
  ['marks before help 2',           "out.push(lv < 2 ? '' :", "out.push(lv < 1 ? '' :"],
  ['extra and need swapped',        "(full && j >= st.n) ? 'extra' : (!full && j < st.n) ? 'need' : ''", "(full && j >= st.n) ? 'need' : (!full && j < st.n) ? 'extra' : ''"],
  ['help after done',               "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }", "function helpLevel(st) { return Math.min(2, st.misses); }"],
  ['hints swapped',                 "return { more: 'hintMore', fewer: 'hintFewer' }[s]", "return { more: 'hintFewer', fewer: 'hintMore' }[s]"],
  ['tiny desktop treats',           "pic: cell - 6, pad: PAD", "pic: cell - 24, pad: PAD"],
  ['giant desktop places',          "var cell = Math.min(112, Math.floor((W - 2 * PAD) / 6));", "var cell = Math.min(150, Math.floor(W / 5));"],
  ['phone places uncapped',         "var c2 = Math.min(66, Math.floor((W - 2 * PAD) / 4));", "var c2 = Math.min(90, Math.floor((W - 2 * PAD) / 4));"],
  ['phone treats under the floor',  "cell: c2, pic: c2 - 2,", "cell: c2, pic: c2 - 10,"],
  ['the heap in one place',         "out.push({ x: L.pad + q[0] * L.cell + room / 2 + (rand() - 0.5) * room,", "out.push({ x: L.pad + room / 2 + (rand() - 0.5) * room,"],
  ['the same heap every round',     "var rand = rng(st.id + ':' + L.mode);", "var rand = rng(L.mode);"],
  ['treats tilted over',            "tilt: Math.round((rand() - 0.5) * (L.mode === 'narrow' ? 12 : 24))", "tilt: Math.round((rand() - 0.5) * 60)"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-mut-'));
  fs.writeFileSync(path.join(dir, 'treat-box-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TB_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-treat-box: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
