#!/usr/bin/env node
/* =====================================================================
   mutate-pinch-teams.js — does verify-pinch-teams-core.js BITE? Run:
   node scripts/mutate-pinch-teams.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the clasp, the talker light, the bump, the spelling card —
   is gated by local-test-pinch-teams.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'pinch-teams-core.js', act: 'pinch-teams-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-pinch-teams-core.js');
const MUTATIONS = [
  ['ao locks (the clasp ignores order)', 'core', "function isTeam(loc, pair) { return TEAMS[locale(loc)].indexOf(String(pair).toLowerCase()) >= 0; }", "function isTeam(loc, pair) { pair = String(pair).toLowerCase(); return TEAMS[locale(loc)].indexOf(pair) >= 0 || TEAMS[locale(loc)].indexOf(pair[1] + pair[0]) >= 0; }"],
  ['io locks in English', 'core', "en: ['oa', 'ai', 'ee', 'ea', 'oo', 'ie', 'ue', 'oe', 'ou', 'au', 'oi', 'ei', 'ui'],", "en: ['oa', 'ai', 'ee', 'ea', 'oo', 'ie', 'ue', 'oe', 'ou', 'au', 'oi', 'ei', 'ui', 'io'],"],
  ['the second letter talks', 'core', "var TALK = { oa: 'o', ai: 'a', ee: 'e', ea: 'e' };", "var TALK = { oa: 'a', ai: 'i', ee: 'e', ea: 'a' };"],
  ['ee for ea is a plain miss', 'core', 'if (homophones(st.loc, got, want)) return \'spelling\';', ''],
  ['a lone vowel is accepted', 'core', "if (S.tiles.length === 1 && !st.tray[S.tiles[0]].team) return 'single';", "if (S.tiles.length === 1 && !st.tray[S.tiles[0]].team) return 'ok';"],
  ['the badge shows at miss 1', 'core', "function badge(st) { if (st.show < 2 ||", "function badge(st) { if (st.show < 1 ||"],
  ['a team may sit in order in the tray', 'core', 'for (var k = 0; k < 400; k++) { var s = shuffle(tiles, rnd); if (trayFair(s, w.teams)) return s; }', 'for (var k = 0; k < 400; k++) { var s = shuffle(tiles, rnd); return s; }'],
  ['the help stays after a new move', 'core', "st.sockets[s] = { tiles: [], locked: false }; st.marks = null; st.last = null; return 'cleared';", "st.sockets[s] = { tiles: [], locked: false }; return 'cleared';"],
  ['an sv row ships', 'core', "var LOCALES = ['en', 'de', 'nl', 'fr'];", "var LOCALES = ['en', 'de', 'nl', 'fr', 'sv'];"],
  ['a German team gets an English talker', 'core', "function talker(loc, team) { return locale(loc) === 'en' ?", "function talker(loc, team) { return locale(loc) !== 'zz' ?"],
  ['the tray lacks the second o for oo', 'core', "Object.keys(need).forEach(function (c) { while ((have[c] || 0) < need[c]) { base.push(c); have[c] = (have[c] || 0) + 1; } });", ''],
  ['the plan ignores fairness', 'core', 'if (!eq(c, prev) && fair(loc, c)) { o = c; break; }', 'if (!eq(c, prev)) { o = c; break; }'],
  ['the sets do not alternate', 'core', "var set = clue === 'build' ? (pass || 0) % sets(loc) : 0,", 'var set = 0,'],
  ['miss 2 dims nothing', 'core', "function bright(st) { if (st.show < 2 ||", "function bright(st) { if (st.show < 9 ||"],
  ['a hint prints a count', 'act', "en:'Pinch two vowels into a team in the wide socket.'", "en:'Pinch 2 vowels into a team in the wide socket.'"],
  ['the spelling card is not shown', 'core', "if (k === 'spelling') { st.reveal.push(i); st.sockets[i] = { tiles: [], locked: false }; }", "if (k === 'spelling') { st.sockets[i] = { tiles: [], locked: false }; }"],
  ['an unused variable (control)', 'core', "  var LOCALES = ['en', 'de', 'nl', 'fr'];", "  var UNUSED_CONTROL = 0; var LOCALES = ['en', 'de', 'nl', 'fr'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pt-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PT_CORE_DIR: dir, PT_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-pinch-teams: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
