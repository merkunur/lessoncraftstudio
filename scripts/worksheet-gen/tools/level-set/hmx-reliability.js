#!/usr/bin/env node
/**
 * hmx-reliability.js — how often each Maze Puzzles LEVEL SET scene builds at each level, through the face's OWN type
 * (generator + composer), one fresh seed per run (2026-10-12). The bar is N/N: a copy is ONE seed in each of 11 locales.
 *
 *   node tools/level-set/hmx-reliability.js [--n=10] [--scenes=hmx-a,hmx-b] [--faces=base,river] [--levels=1,2,3] [--locales=en,sv]
 *       [--json=out.json]   (writes {scene: {level: {ok, n}}} for the allocator)
 * A label face (alphabets, sound pools, number runs) is checked in every locale; a picture face once.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { makeRng } = require('../../lib/rng.js');
const { allSkins } = require('../../lib/hmx.js');
const { FACES } = require('../../data/b8/maze-puzzles.js');
const { SCENES } = require('../../data/hm/scenes.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const N = +arg('n', 10);
const want = arg('scenes', ''), faces = arg('faces', '');
const LEVELS = arg('levels', '1,2,3').split(',').map(Number);
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const typeFile = (id) => { const dir = path.join(__dirname, '..', '..', 'types', id.startsWith('K') ? 'k' : id.startsWith('G1') ? 'g1' : 'g2'); return path.join(dir, fs.readdirSync(dir).find((f) => f.startsWith(id + '-'))); };

let skins = allSkins();
if (want) skins = skins.filter((s) => want.split(',').includes(s.id));
if (faces) skins = skins.filter((s) => faces.split(',').includes(s.face));
const out = {}; let bad = 0;
for (const sk of skins) {
  const T = require(typeFile(FACES[sk.face].id));
  const base = SCENES[FACES[sk.face].scene];
  const perLocale = !!(base.labels && ['seq', 'sound', 'pred', 'ops'].includes(base.labels.rule)) || (base.maze && base.maze.gen === 'hex');
  out[sk.id] = {};
  for (const lv of LEVELS.filter((l) => !((require('../../data/hmx/levels.js')[sk.face] || {}).only) || require('../../data/hmx/levels.js')[sk.face].only.includes(l))) {
    let ok = 0, n = 0; const why = {}; const t0 = Date.now();
    for (const loc of perLocale ? LOCS : ['en']) for (let i = 1; i <= N; i++) {
      n++;
      try { T.build({ difficulty: lv, locale: loc, unit: sk.id }, { rng: makeRng('hmxrel|' + sk.id + '|' + lv + '|' + loc + '|' + i) }); ok++; } catch (e) {
        const k = String(e.message).replace(/^.*\((.*)\)$/, '$1').replace(/[0-9.]+/g, '#').slice(0, 120); why[k] = (why[k] || 0) + 1;
      }
    }
    out[sk.id][lv] = { ok, n };
    if (ok < n) bad++;
    console.log((sk.id + ' L' + lv).padEnd(40), (ok + '/' + n).padStart(8), String(((Date.now() - t0) / n) | 0).padStart(6) + ' ms', ok < n ? JSON.stringify(why) : '');
  }
}
const j = arg('json', ''); if (j) fs.writeFileSync(j, JSON.stringify(out, null, 1));
process.exit(bad ? 1 : 0);
