#!/usr/bin/env node
/**
 * build-maze-pins.js — data/hm/maker-pins.json, the pages the Mazes MAKER builds (makers 2026-11-02; ENGINES-ART §8.2).
 *
 * A handmade maze is a retry search: 0.4 s a page on a lucky seed, up to 30 s on an unlucky one (×3 on a school iPad).
 * So a maker page never searches. For every face × level, copy n is the n-th entry here: the face's OWN scene at that
 * level (level 2 = the published maze; 1 and 3 take data/hmx/levels.js through hmx.resolveOwn), then each of the face's
 * Level Set scenes. Each entry carries the first seed whose page BUILDS within --max-ms in Node (the fastest that built,
 * marked slow, when none does); label faces (alphabets, sound pools, number runs, sums) get a list per language.
 *   { faces: { <typeId>: { <level>: { '*' | <loc>: [ { u: <unit|null>, s: <seedVariant>, ms } ] } } } }
 *
 *   node tools/build-maze-pins.js [--faces=K-405,G1-420] [--max-ms=600] [--seeds=8] [--own=3] [--out=<file>]
 *   node tools/build-maze-pins.js --merge=<file>,<file>…   (one process per face, then merge)
 *   node tools/build-maze-pins.js --retry-slow --faces=K-405 [--from=8] [--seeds=40] [--out=<file>]
 *     a second search for the copies marked slow in data/hm/maker-pins.json: seeds --from+1 … --seeds; a copy that builds
 *     within --max-ms replaces it (the face's whole list is written to --out, ready for --merge with the others)
 */
'use strict';
const fs = require('fs'), path = require('path');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { loadType } = require('../lib/load-types.js');
const { allSkins } = require('../lib/hmx.js');
const { FACES } = require('../data/b8/maze-puzzles.js');
const { SCENES } = require('../data/hm/scenes.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const OUT = path.join(__dirname, '..', 'data', 'hm', 'maker-pins.json');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MAXMS = +arg('max-ms', 600), SEEDS = +arg('seeds', 8), OWN = +arg('own', 3);

const merge = arg('merge', '');
if (merge) {
  const all = { note: 'tools/build-maze-pins.js — do not edit', faces: {} };
  for (const f of merge.split(',')) Object.assign(all.faces, JSON.parse(fs.readFileSync(f, 'utf8')).faces);
  // a slow entry (no seed within --max-ms; its fastest kept) leaves a list that still has 4 fast copies: a teacher's
  // "New version" never waits seconds where a fast page exists
  let dropped = 0;
  for (const face of Object.values(all.faces)) for (const lv of Object.values(face)) for (const [loc, list] of Object.entries(lv)) {
    if (list.filter((x) => !x.slow).length >= 4) { dropped += list.filter((x) => x.slow).length; lv[loc] = list.filter((x) => !x.slow); }
  }
  console.log('slow entries dropped where 4+ fast copies remain: ' + dropped);
  const sorted = Object.fromEntries(Object.keys(all.faces).sort().map((k) => [k, all.faces[k]]));
  fs.writeFileSync(OUT, JSON.stringify({ note: all.note, faces: sorted }) + '\n');
  console.log('merged ' + Object.keys(sorted).length + ' faces → ' + path.relative(process.cwd(), OUT));
  process.exit(0);
}

const only = arg('faces', '').split(',').filter(Boolean);
if (process.argv.includes('--retry-slow')) {
  const cur = JSON.parse(fs.readFileSync(OUT, 'utf8')).faces;
  const res = { faces: {} };
  const FROM = +arg('from', 8);
  const ids = Object.keys(cur).filter((id) => !only.length || only.includes(id));
  let fixed = 0, still = 0;
  for (const id of ids) {
    const spec = loadType(id);
    const face = res.faces[id] = JSON.parse(JSON.stringify(cur[id]));
    for (const [lv, L] of Object.entries(face)) for (const [loc, list] of Object.entries(L)) {
      const locale = loc === '*' ? 'en' : loc;
      for (let i = 0; i < list.length; i++) {
        const e = list[i];
        if (!e.slow) continue;
        const used = new Set(list.filter((x) => x.u === e.u).map((x) => String(x.s)));
        let got = null;
        for (let s = FROM + 1; s <= SEEDS && !got; s++) {
          if (used.has(String(s))) continue;
          const t0 = Date.now();
          try { spec.build({ theme: null, difficulty: +lv, locale, unit: e.u }, { rng: makeRng(instanceSeed({ typeId: id, theme: null, difficulty: +lv, seedEpoch: 1, variant: s, unit: e.u })), variant: s, seedVariant: s, slotsOut: {}, noPin: true }); } catch (er) { continue; }
          const ms = Date.now() - t0;
          if (ms <= MAXMS) got = { u: e.u, s, ms };
        }
        if (got) { list[i] = got; fixed++; } else still++;
      }
      console.log(`${id} L${lv} ${loc}: ${list.filter((x) => x.slow).length} slow left of ${list.length}`);
    }
  }
  fs.writeFileSync(arg('out', OUT), JSON.stringify(arg('out', '') ? res : { note: 'tools/build-maze-pins.js — do not edit', faces: { ...cur, ...res.faces } }) + '\n');
  console.log(`retry-slow: ${fixed} replaced by a fast seed, ${still} still slow`);
  process.exit(0);
}
const result = { faces: {} };
// faces outside the Level Set table (data/b8/maze-puzzles.js FACES): their own scene only
const EXTRA = { 'picture-path': { id: 'K-480', scene: 'farm-picture-path' } };
const slow = [], none = [];
for (const [mode, F] of Object.entries({ ...FACES, ...EXTRA })) {
  if (only.length && !only.includes(F.id)) continue;
  const spec = loadType(F.id);
  const base = SCENES[F.scene];
  const perLocale = !!(base.labels && ['seq', 'sound', 'pred', 'ops'].includes(base.labels.rule)) || (base.maze && base.maze.gen === 'hex');
  const skins = allSkins().filter((sk) => sk.face === mode).map((sk) => sk.id).sort();
  const face = result.faces[F.id] = {};
  for (const lv of [1, 2, 3]) {
    const L = face[lv] = {};
    for (const loc of perLocale ? LOCS : ['*']) {
      const locale = loc === '*' ? 'en' : loc;
      const list = L[loc] = [];
      // one candidate = (unit, how many seeds to keep): the own scene up to OWN seeds, each Level Set scene one
      for (const [unit, keep] of [[null, skins.length ? OWN : 8]].concat(skins.map((u) => [u, 1]))) {
        let kept = 0, best = null;
        // the published page (level 2, copy 1) is seed 1 of the own scene: tried first, kept when it is fast
        for (let s = 1; s <= SEEDS && kept < keep; s++) {
          const t0 = Date.now();
          try {
            spec.build({ theme: null, difficulty: lv, locale, unit }, { rng: makeRng(instanceSeed({ typeId: F.id, theme: null, difficulty: lv, seedEpoch: 1, variant: s, unit })), variant: s, seedVariant: s, slotsOut: {}, noPin: true });
          } catch (e) { continue; }
          const ms = Date.now() - t0;
          if (!best || ms < best.ms) best = { u: unit, s, ms };
          if (ms <= MAXMS) { list.push({ u: unit, s, ms }); kept++; }
        }
        if (!kept && best) { list.push({ ...best, slow: true }); slow.push(`${F.id} L${lv} ${loc} ${unit || 'own'} ${best.ms} ms`); }
        if (!best) none.push(`${F.id} L${lv} ${loc} ${unit || 'own'}`);
      }
      console.log(`${F.id} L${lv} ${loc}: ${list.length} copies (${list.filter((x) => x.slow).length} slow)`);
    }
  }
}
const out = arg('out', '');
fs.writeFileSync(out || OUT, JSON.stringify(out ? result : { note: 'tools/build-maze-pins.js — do not edit', faces: result.faces }) + '\n');
if (slow.length) console.log('SLOW (fastest kept): ' + slow.join(' · '));
if (none.length) console.log('NEVER BUILT (skipped): ' + none.join(' · '));
