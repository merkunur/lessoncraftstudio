#!/usr/bin/env node
/* =====================================================================
   mutate-about-strings.js — does verify-about-strings-core.js BITE?
   Run: node scripts/mutate-about-strings.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last
   needle is a control that must SURVIVE. CRLF collapsed before searching.
   (The strings, the walk through the door and the page as DRAWN are
   rendering properties, gated by local-test-about-strings.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'about-strings-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-about-strings-core.js');
const MUTATIONS = [
  ['a wrong string is accepted',                       "      if (wrong.length) return miss(st, 'strings', { cards: wrong });\n", ""],
  ['the trap is judged by the door word it names',     "about: k === 'd' ? 'door' : 'topic' }; };", "about: k === 'd' || id === 'f2' ? 'door' : 'topic' }; };"],
  ['"they" may come before every namer',               "if (c.role === 'pronoun' && !seenNamer) ok = false;", ""],
  ['a drift left on the cart is wrong',                "var left = st.cart.filter(function (id) { return find(r, id).about === 'topic'; });", "var left = st.cart.slice();"],
  ['a room fact may stay on the cart',                 "        if (left.length) return miss(st, 'missing', { cards: left });\n", ""],
  ['the door picture names the room',                  "if (st.frame !== r.topic.pic) return miss", "if (st.frame !== r.topic.pic && st.frame !== r.topic.door) return miss"],
  ['a mystery fact says the room’s word',          "['[They] hop.', '[They] eat bugs.', '[They] have long back legs.']", "['[Frogs] hop.', '[They] eat bugs.', '[They] have long back legs.']"],
  ['the about-word lights one character too many',     "about: [a, b - 1] };", "about: [a, b] };"],
  ['a loose string counts as a miss',                  "if (loose.length) { st.last = { reason: 'loose', cards: loose };", "if (loose.length) { st.misses++; st.last = { reason: 'loose', cards: loose };"],
  ['the help stays after a move',                      "st.hook[id] = sign; st.sel = null; clear(st); return true;", "st.hook[id] = sign; st.sel = null; return true;"],
  ['the drift always hangs on the last hook',          "var at = Math.floor(rnd() * n); out[at] = drift.id;", "var at = n - 1; out[at] = drift.id;"],
  ['the round sun fits none of the moon’s facts', "doorFits: { all: [0] } },", "doorFits: {} },"],
  ['every fact sags under the door picture',           "var fits = st.frame === r.topic.door ? doorFits(loc, r.idx) : [];", "var fits = [];"],
  ['the page opens with "they"',                       "if (pron.length && rest.length) rest.splice(1, 0, pron[0]);", "if (pron.length && rest.length) rest.splice(0, 0, pron[0]);"],
  ['miss 2 points every string at the room’s sign', "return { card: id, to: find(r, id).about };", "return { card: id, to: 'topic' };"],
  ['German calls the moon "sie"',                      "['[Der Mond] ist rund.', '[Er] leuchtet in der Nacht.',", "['[Der Mond] ist rund.', '[Sie] leuchtet in der Nacht.',"],
  ['a round ball on the moon’s shelf',             "others: ['fruits/banana', 'clothing/shoe'], doorFits: { all: [0] }", "others: ['toys/ball', 'clothing/shoe'], doorFits: { all: [0] }"],
  ['the ambulance trap loses its shared word',         "'[Ambulances] have a loud siren.'", "'[Ambulances] have a siren.'"],
  ['the frame may stay empty',                         "if (!st.frame) { st.last = { reason: 'frame' }; st.help = 0; return { ok: false, reason: 'frame' }; }", "if (!st.frame) { st.frame = r.topic.pic; }"],
  ['an unused variable (control)',                     "  var ROLE = ['namer', 'pronoun', 'trap', 'namer', 'namer'];", "  var ROLE = ['namer', 'pronoun', 'trap', 'namer', 'namer']; var UNUSED_CONTROL = 0;"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 300000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'as-mut-'));
  fs.writeFileSync(path.join(dir, 'about-strings-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { AS_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-about-strings: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
