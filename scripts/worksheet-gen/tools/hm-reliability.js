/**
 * hm-reliability.js — how often each Handmade Mazes scene builds, through the type's OWN generator (b8, 2026-10-11).
 *
 *   node tools/hm-reliability.js [--n=12] [--scenes=a,b] [--locales=en,sv]
 *
 * Drives K-405 build() — the maze generator AND the scene composer (a refusal to place a drawing fails a page too) — one fresh seed per run, and reports per
 * scene × locale: built / runs and ms per page. A scene that fails here fails a publish wave (one page = one seed, and a
 * wave renders 11 locales), so the standing bar is N/N. A label face is per-locale (alphabets, sound pools); a tree face
 * is the same in every locale, so it runs once.
 * Why it exists: two scenes passed their first render on a lucky seed and failed every later one (jungle-orangutan built
 * on 1 point set in 20; savanna-giraffe ran out of decoys) — a single render proves nothing about a generator.
 */
'use strict';
const { makeRng } = require('../lib/rng.js');
const T = require('../types/k/K-405-maze-puzzles.js');
const { SCENES } = require('../data/hm/scenes.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const N = +arg('n', 12);
const scenes = arg('scenes', Object.keys(SCENES).join(',')).split(',');
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
let bad = 0;
for (const id of scenes) {
  const perLocale = !!(SCENES[id].labels && ['seq', 'sound', 'pred', 'ops'].includes(SCENES[id].labels.rule)) || (SCENES[id].maze && SCENES[id].maze.gen === 'hex');   // the hex hop draws the locale's alphabet
  for (const loc of perLocale ? LOCS : ['en']) {
    let ok = 0; const why = {}; const t0 = Date.now();
    for (let i = 1; i <= N; i++) {
      try { T.build.call({ difficulty: { 2: { ...T.difficulty[2], scene: id } } }, { difficulty: 2, locale: loc }, { rng: makeRng('rel|' + id + '|' + loc + '|' + i) }); ok++; } catch (e) {
        const k = String(e.message).replace(/^.*\((.*)\)$/, '$1').replace(/[0-9.]+/g, '#'); why[k] = (why[k] || 0) + 1;
      }
    }
    if (ok < N) bad++;
    console.log((id + ' ' + (perLocale ? loc : '*')).padEnd(30), (ok + '/' + N).padStart(6), String(((Date.now() - t0) / N) | 0).padStart(6) + ' ms', ok < N ? JSON.stringify(why) : '');
  }
}
process.exit(bad ? 1 : 0);
