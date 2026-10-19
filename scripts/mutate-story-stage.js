#!/usr/bin/env node
/* =====================================================================
   mutate-story-stage.js — does verify-story-stage-core.js BITE?
   Run: node scripts/mutate-story-stage.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   The first ten are the design's list (§12); the rest guard the hand, the
   keypad, the help ladder, the order and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'story-stage-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-story-stage-core.js');
const MUTATIONS = [
  /* the design's list */
  ['outlines counted in the answer',     "function solid(st) { return count(st, function (p) { return !p.out; }); }", "function solid(st) { return count(st, function (p) { return true; }); }"],
  ['the pile open in a take story',      "    if (st.type === 'take') return -1;\n", "\n"],
  ['a text numeral differs from the data', "s1: '{b} more birds land.'", "s1: '{a} more birds land.'"],
  ['the start number accepted',          "else if (+st.typed === st.answer) {", "else if (+st.typed === st.answer || +st.typed === st.a) {"],
  ["the replay keeps the child's acting", "    return places;\n  }\n  function settle", "    return st.places.map(function (p) { return p ? { k: p.k, who: p.who, out: p.out } : null; });\n  }\n  function settle"],
  ['two kinds in an add story',          "    return st.type === 'put' ? 1 : 0;", "    return st.type === 'add' ? 1 : 0;"],
  ['an answer of 0',                     "['fish', 5, 4]", "['fish', 5, 5]"],
  ['within 20 with pictures',            "counters: frames === 2,", "counters: false,"],
  ['runs of three of one type',          "          if (L > 1 && pool[seq[L - 1]].type === pool[x].type && pool[seq[L - 2]].type === pool[x].type) continue;\n", "\n"],
  ['no reading pause with the voice off', "    if (!readAloud) return base;", "    if (!readAloud) return 0;"],
  /* the hand */
  ['the question without acting',        "acted(st) >= 1; }", "acted(st) >= 0; }"],
  ["the narrator's things leave in an add story", "    if (st.type !== 'take') return 'locked';\n", "\n"],
  ['a taken thing vanishes',             "    p.out = !p.out; moved(st);\n    return p.out ? 'taken' : 'restored';", "    st.places[i] = null; moved(st);\n    return 'taken';"],
  ['the pile in a put story brings the first kind', "    return st.type === 'put' ? 1 : 0;", "    return 0;"],
  /* the keypad + Check */
  ['0 starts an answer',                 "      if (st.typed === '' && v === '0') return 'refused';\n", "\n"],
  ['three digits',                       "      if (st.typed.length >= 2) return 'full';\n", "\n"],
  ['a keypress keeps the help',          "    } else st.typed = v;\n    moved(st);\n    return 'typed';", "    } else st.typed = v;\n    return 'typed';"],
  ['an empty Check is a miss',           "    else if (st.typed === '') res = { ok: false, slip: 'empty' };", "    else if (st.typed === '') { st.misses++; res = { ok: false, slip: 'empty' }; }"],
  ['Check before acting is not named',   "    if (st.line < 2) res = { ok: false, slip: 'act' };", "    if (false) res = { ok: false, slip: 'act' };"],
  /* the help ladder */
  ['the help writes the answer',         "      out[i] = (!st.done && c === n) ? '?' : c;", "      out[i] = c;"],
  ['numbers on the first miss',          "    if (!st.done && st.help < 2) return out;", "    if (!st.done && st.help < 1) return out;"],
  ['the replay keeps extra brought ones', "      while (kids.length > st.b) { idx = kids.pop(); places[idx] = null; }\n", "\n"],
  ['the replay keeps extra taken ones',  "      while (outs.length > st.b) { idx = outs.pop(); places[idx].out = false; }\n", "\n"],
  /* words */
  ['the 1 form ignored',                 "    var k = (n === 1 && s[key + '_1']) ? key + '_1' : key;", "    var k = key;"],
  ['a missing 1 form',                   ", done_1: '{n} fish is left!'", ""],
  ['the take-1 success line',            "return ans === 1 ? 'sumTake1' : r.b === 1 ? 'sumTakeB1' : 'sumTake';", "return r.b === 1 ? 'sumTakeB1' : 'sumTake';"],
  ['the take-away-1 line',               "return ans === 1 ? 'sumTake1' : r.b === 1 ? 'sumTakeB1' : 'sumTake';", "return ans === 1 ? 'sumTake1' : 'sumTake';"],
  ['the take story asks to count outlines', "key: take ? 'hintAskLeft' : 'hintAsk'", "key: 'hintAsk'"],
  ['free play says 0',                   "out.push(now ? { key: now === 1 ? 'playNow1' : 'playNow', m: now } : { key: 'playNone' });", "out.push({ key: now === 1 ? 'playNow1' : 'playNow', m: now });"],
  /* the order */
  ['the same order twice',               "        if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));", "        if (seq.length === n) return true;"],
  ['a pass opens where the last closed', "          if (L === 0 && x === lastPrev) continue;\n", "\n"],
  /* the layout */
  ['phone pictures below the floor',     "L.place = Math.min(76, Math.floor((W - 4 * L.gap) / 5)); L.pic = L.place; }", "L.place = Math.min(76, Math.floor((W - 4 * L.gap) / 5)); L.pic = L.place - 8; }"],
  ['desktop pictures below the floor',   "L.place = Math.min(106, Math.floor((W - 2 * L.pad - 4 * L.gap) / 5)); L.pic = L.place - 8; }", "L.place = Math.min(106, Math.floor((W - 2 * L.pad - 4 * L.gap) / 5)); L.pic = L.place - 14; }"],
  ['two frames too wide',                "L.place = Math.min(60, Math.floor((W - 4 * L.pad - L.between - 8 * L.gap) / 10));", "L.place = Math.min(60, Math.floor((W - L.between - 8 * L.gap) / 10));"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-mut-'));
  fs.writeFileSync(path.join(dir, 'story-stage-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SS_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-story-stage: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
