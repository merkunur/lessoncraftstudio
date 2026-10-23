#!/usr/bin/env node
/* =====================================================================
   mutate-cousin-rain.js — does verify-cousin-rain-core.js BITE?
   Run: node scripts/mutate-cousin-rain.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first; the last needle is a control
   that must SURVIVE (an unused variable changes nothing). CRLF collapsed
   before searching. (The rain, the split cloud and the drops as DRAWN are
   rendering properties, gated by local-test-cousin-rain.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'cousin-rain-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-cousin-rain-core.js');
const MUTATIONS = [
  ['one thing alone makes a basket pure',          "return t.length >= 2 && ks.length === 1 ? ks[0] : null;", "return t.length >= 1 && ks.length === 1 ? ks[0] : null;"],
  ['a mixed basket counts as pure',                "return t.length >= 2 && ks.length === 1 ? ks[0] : null;", "return t.length >= 2 ? ks[0] : null;"],
  ['"only at Check" rains while sorting',          "    if (st.rain !== 'live' && !st.done) return out;\n", ""],
  ['a second pure basket of one kind rains again', "if (k && !used[k]) { used[k] = 1; out[b] = st.r.cousin[k]; }", "if (k) { used[k] = 1; out[b] = st.r.cousin[k]; }"],
  ['the split rains one cousin twice',             "return { kind: k, things: inBasket(st, b).filter(function (i) { return st.r.things[i].kind === k; }), cousin: st.r.cousin[k] };", "return { kind: k, things: inBasket(st, b).filter(function (i) { return st.r.things[i].kind === k; }), cousin: st.r.cousin[kindsIn(st, b)[0]] };"],
  ['a colour-round cousin shares the colour',      "[['food', ['apple', 'banana'], 'kiwi'],", "[['food', ['apple', 'banana'], 'strawberry'],"],
  ['the baskets are labelled (one right basket)',  "      if (mixed.length) return miss(st, 'mixed', { baskets: mixed });", "      if (mixed.length || (r.level === 'l1' && r.things.some(function (t, i) { return st.place[i] !== r.kinds.indexOf(t.kind); }))) return miss(st, 'mixed', { baskets: mixed });"],
  ['the stray may sit in the big basket',          "      if (r.level === 'l2' && st.place[r.stray] !== 1) return miss(st, 'swapped');\n", ""],
  ['a "both" thing belongs left',                  "return A && B ? 1 : A ? 0 : B ? 2 : -1;", "return A ? 0 : B ? 2 : -1;"],
  ['a thing catches a drop it has no trait for',   "b: hasTrait(t.key, r.rule[1].trait) };", "b: true };"],
  ['the grass puts a kind side by side',           "    for (var t = 0; t < 4000; t++) { var o = shuffle(base.slice(), rnd); if (!adjacentSame(r, o)) return o; }", "    for (var t = 0; t < 4000; t++) { var o = shuffle(base.slice(), rnd); return o; }"],
  ['things left on the grass count as a miss',     "if (onMeadow(st).length) { st.last = { reason: 'meadow' };", "if (onMeadow(st).length) { st.misses++; st.last = { reason: 'meadow' };"],
  ['the success line names the wrong kind',        "var k = r.kinds.map(function (x) { return W.kinds[x]; }).join(', ');", "var k = r.kinds.map(function (x) { return W.kinds[r.kinds[0]]; }).join(', ');"],
  ['a thread may point at its own basket',         "for (var c2 = 0; c2 < r.nb; c2++) { if (c2 === b) continue;", "for (var c2 = 0; c2 < r.nb; c2++) {"],
  ['a pass may open on any round',                 "var o = [first].concat(shuffle(rest.slice(), rnd)); if (prev", "var o = shuffle(all.slice(), rnd); if (prev"],
  ['no help on the second miss',                   "st.help = Math.min(2, st.tries);", "st.help = Math.min(1, st.tries);"],
  ['the two-basket pool keeps three-kind rounds',  "basketsOf(baskets) === 'two' && src[i].length !== 2", "basketsOf(baskets) === 'two' && src[i].length > 3"],
  ['French loses a narrow space',                  "remembers: 'Mim se souvient !'", "remembers: 'Mim se souvient !'"],   /* the core holds the real U+202F character */
  ['a stray sentence names another thing',         "l2: ['The car is not an animal.", "l2: ['The bus is not an animal."],
  ['the goose is drawn as the duckling',           "goose: 'things-that-fly/goose',", "goose: 'farm-animals/duck',"],
  ['an unused variable (control)',                 "  var MIM = 'weather/cloud';", "  var MIM = 'weather/cloud'; var UNUSED_CONTROL = 0;"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 300000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-mut-'));
  fs.writeFileSync(path.join(dir, 'cousin-rain-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { CR_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-cousin-rain: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
