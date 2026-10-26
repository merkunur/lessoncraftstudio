#!/usr/bin/env node
/* =====================================================================
   mutate-hook-tile.js — does verify-hook-tile-core.js BITE?
   Run: node scripts/mutate-hook-tile.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the shelf, the basket, the swing, the twins, the
   dangling hook — is gated by local-test-hook-tile.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'hook-tile-core.js', act: 'hook-tile-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-hook-tile-core.js');
const AP = "'", RQ = '’';
const D = (bar, right) => '"bar":"' + bar + '","right":"' + right + '"';
const MUTATIONS = [
  ['a hook hangs in a plural round', 'core', 'if (st.slot === rd.right) { st.done = true;', "if (st.slot === rd.right || (rd.kind === 'plural' && role(rd.loc, st.slot) === 'hook')) { st.done = true;"],
  ['the plain s hangs the thing', 'core', "else if (ro === 'plural') out.owners = rd.n0 + 1;", "else if (ro === 'plural') out.thing = 'peg';"],
  ['the plain s adds no owner', 'core', "else if (ro === 'plural') out.owners = rd.n0 + 1;", "else if (ro === 'plural') out.owners = rd.n0;"],
  ['de: the apostrophe catches on Anna', 'core', D('Anna{s} Ball', 's'), D('Anna{s} Ball', AP + 's')],
  ['de: Felix takes s', 'core', D('Felix{s} Drachen', AP), D('Felix{s} Drachen', 's')],
  ['de: vom for die Schnecke', 'core', D('das Blatt {s}Schnecke', 'von der '), D('das Blatt {s}Schnecke', 'vom ')],
  ['nl: a vowel name takes s', 'core', D('Romy{s} dino', AP + 's'), D('Romy{s} dino', 's')],
  ['nl: Thomas takes s', 'core', D('Thomas{s} fiets', AP), D('Thomas{s} fiets', 's')],
  ['nl: van de for het konijn', 'core', D('de wortel {s}konijn', 'van het '), D('de wortel {s}konijn', 'van de ')],
  ['sv: Jonas gets s', 'core', D('Jonas{s} bil', ''), D('Jonas{s} bil', 's')],
  ["fr: d' before a consonant", 'core', D('le robot {s}Léo', 'de '), D('le robot {s}Léo', 'd' + RQ)],
  ['fr: du for a feminine owner', 'core', D('le seau {s}vache', 'de la '), D('le seau {s}vache', 'du ')],
  ['it: del before s + consonant', 'core', D('la ghianda {s}scoiattolo', 'dello '), D('la ghianda {s}scoiattolo', 'del ')],
  ['pt: do for Ana', 'core', D('a bola {s}Ana', 'da '), D('a bola {s}Ana', 'do ')],
  ['es: del for la rana', 'core', D('el tronco {s}rana', 'de la '), D('el tronco {s}rana', 'del ')],
  ['a lost thing that is a creature', 'core', '"o":"dog","t":"ball","bar":"dog{s} ball"', '"o":"dog","t":"cat","bar":"dog{s} ball"'],
  ['fi: a name with gradation', 'core', '"o":"@Eino","t":"robot","bar":"Eino{s} robotti"', '"o":"@Otto","t":"robot","bar":"Otto{s} robotti"'],
  ['the right tile always in slot one', 'core', 'at = (start + (seen[k] = (seen[k] || 0) + 1) - 1) % k;', 'at = 0;'],
  ['the same order every pass', 'core', 'var c = shuffle(ids, rnd);', 'var c = ids.slice();'],
  ['the glow from miss 1', 'core', "return !st.done && st.last === 'miss' && st.show >= 2;", "return !st.done && st.last === 'miss' && st.show >= 1;"],
  ['no clue at miss 1', 'core', "if (st.done || st.last !== 'miss' || st.show !== 1 || st.reason !== 'rule') return null;", 'return null;'],
  ['a hint prints a digit', 'act', 'en:"Put a tile in the slot."', 'en:"Put 1 tile in the slot."'],
  ['an unused variable (control)', 'core', "  var LEVELS = ['1', '2', '3'];", "  var UNUSED_CONTROL = 0; var LEVELS = ['1', '2', '3'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hk-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { HK_CORE_DIR: dir, HK_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-hook-tile: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
