#!/usr/bin/env node
/**
 * htd-allocate.js — the How to Draw Level Set allocation (2026-10-11): which drawing (data/htdx/units.js) goes on which
 * face × level × copy. One drawing per worksheet; the same allocation serves all 11 locales (a drawing is locale-neutral).
 *   base K-396: 12 per level · every other face: 6 at level 1, 5 new at level 2 (copy 1 is the live page), 6 at level 3
 * Rules
 *   level ↔ drawing: level 1 takes the simple drawings (tier easy), level 3 the detailed ones (complex), level 2 the middle
 *   never the same noun twice in one face, never the noun of the face's live page; a drawing ≤ 2 uses, a noun ≤ 4
 *   face needs: order 4 steps (L1) / 5 (L2, L3) · copy-steps 3 / 4 / 5 steps, not wider than 1.7 · trace twin boxes (L2, L3)
 *   only upright drawings (≤ 1.15) · shapes ≥ 2 guides · word a single traceable word (≤ 10 letters) in all 11 locales ·
 *   scene an original scene composed around the drawing (data/fdx) · write an animal with starters ≤ 22 characters
 *   --exclude=<face>:<unit>,…  (a copy that failed its render: never allocated there again — recorded in data/htdx/exclude.json)
 *   node tools/level-set/htd-allocate.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const B = require(path.join(ROOT, 'data', 'b7', 'how-to-draw.js'));
const { UNITS } = require(path.join(ROOT, 'data', 'htdx', 'units.js'));
const { NAMES } = require(path.join(ROOT, 'data', 'htdx', 'names.js'));
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const exFile = path.join(ROOT, 'data', 'htdx', 'exclude.json');
const EXCLUDE = new Set(fs.existsSync(exFile) ? JSON.parse(fs.readFileSync(exFile, 'utf8')) : []);
const FACES = [   // scarcest first
  { id: 'G1-419', mode: 'copy-steps', live: 'hummingbird' }, { id: 'G1-418', mode: 'order', live: 'owl' }, { id: 'G1-417', mode: 'scene', live: 'frog' },
  { id: 'K-404', mode: 'word', live: 'fish' }, { id: 'G2-390', mode: 'write', live: 'bear' }, { id: 'K-402', mode: 'trace', live: 'rabbit' },
  { id: 'K-401', mode: 'shapes', live: 'dog' }, { id: 'K-403', mode: 'finish', live: 'pony' }, { id: 'G1-416', mode: 'grid', live: 'dinosaur' },
  { id: 'G2-391', mode: 'memory', live: 'butterfly' }, { id: 'K-396', mode: 'base', live: 'cat' },
];
const COUNT = (mode) => (mode === 'base' ? { 1: 12, 2: 12, 3: 12 } : { 1: 6, 2: 5, 3: 6 });
const ANIMAL = /^(animals|birds|farm|farm animals|zoo animals|sea life|easter)/i;
const wordOk = (u) => LOCALES.every((l) => { const e = NAMES[u.key][l]; return e && e.word && [...e.word].length <= 10; });
// dotted guides (base level 1, shapes, memory level 1) only where they are a real way in: ≥ 2 big shapes covering ≥ 30 %
// the dotted guide shapes are a real way in only where they map onto the picture (a head, a body, a tail) — picked by EYE on the
// guide sheet of every candidate (2026-10-11); the visual review rejected nested ovals, a lone oval for a whole fox, ovals for a
// house / cake / cupcake, a halo over an owl
const GUIDE_OK = new Set(['animals-bw-2-dog', 'animals-bw-2-raccoon', 'animals-bw-3-cat-2', 'animals-bw-3-cow', 'animals-bw-3-fish-2', 'animals-bw-3-hippopotamus-2',
  'animals-bw-4-kangaroo', 'animals-bw-4-koala', 'animals-bw-5-bull', 'animals-bw-5-chameleon', 'animals-bw-5-panda', 'animals-bw-5-squirrel', 'animals-bw-5-tiger',
  'zoo-animals-bw-bear-2', 'christmas-bw-snowman', 'easter-bw-2-chick', 'farm-animals-bw-yak', 'farm-bw-cow', 'farm-bw-goat', 'toys-bw-teddy-bear',
  'vegetables-bw-2-mushroom', 'animals-bw-5-bee'].map((x) => 'lsx-' + x));
const guidesOk = (u) => GUIDE_OK.has(u.slug);
// a copy with steps removed must leave no floating fragments (tread dashes round an erased rim): data/htdx/fragments.json
const FRAG = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', 'fragments.json'), 'utf8'));
const fragOk = (u, k) => FRAG[u.slug] && FRAG[u.slug][k] === 0;
// the level-1 scene ring must sit on empty paper (< 2 % ink inside it): data/htdx/ring-clear.json
const RING = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', 'ring-clear.json'), 'utf8'));
// a scene must not already hold another drawing of the same thing once the hero is lifted out (a duck on the pond)
const FAMILY = { duck: ['duck', 'duckling'], chick: ['chick', 'chicken', 'hen'], chicken: ['chicken', 'hen', 'chick'], crab: ['crab', 'hermit-crab'], 'hermit-crab': ['crab', 'hermit-crab'], bear: ['bear', 'teddy-bear', 'polar-bear'] };
const sceneOk = (u) => !!u.fdxScene && !(u.fdxRest || []).some((k) => (FAMILY[u.key] || [u.key]).includes(k) || k === u.key);
const startersOk = (u) => LOCALES.every((l) => B.lsStarters(u.slug, l).every((s) => s.length <= 22));
function needs(mode, lv, u) {
  if (mode === 'finish' && u.key === 'santa-claus') return false;   // es 'de a Santa Claus' / pt 'de o Papai Noel' (native review 2026-10-11)
  switch (mode) {
    case 'order': return u.steps === (lv === 1 ? 4 : 5);
    case 'copy-steps': return u.steps === { 1: 3, 2: 4, 3: 5 }[lv] && u.aspect <= 1.7;
    case 'trace': return (lv === 1 ? u.aspect <= 1.6 : u.aspect <= 1.15) && (lv !== 3 || fragOk(u, 'trace3'));
    case 'finish': return fragOk(u, 'finish' + lv);
    case 'shapes': return guidesOk(u);
    case 'base': return lv !== 1 || guidesOk(u);
    case 'memory': return lv !== 1 || guidesOk(u);
    case 'word': return wordOk(u);
    case 'scene': return sceneOk(u) && u.aspect <= 2 && (lv !== 1 || (RING[u.slug] != null && RING[u.slug] < 0.02));
    case 'write': return ANIMAL.test(u.theme) && (lv === 3 || startersOk(u));
    default: return true;
  }
}
// how well a drawing's tier fits a level (higher = better); a tier two steps off is never used
const fit = (lv, tier) => ({ 1: { easy: 2, mid: 1, complex: -9 }, 2: { mid: 2, easy: 1, complex: 1 }, 3: { complex: 2, mid: 1, easy: -9 } })[lv][tier];
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const usesU = new Map(), usesK = new Map();
const out = { faces: {}, short: [] };
for (const f of FACES) {
  const keys = new Set([f.live]);
  out.faces[f.id] = {};
  let copy = 2;
  for (const lv of [1, 2, 3]) {
    const want = COUNT(f.mode)[lv];
    const cands = UNITS.filter((u) => !EXCLUDE.has(f.id + ':' + u.slug) && needs(f.mode, lv, u) && fit(lv, u.tier) > 0)
      .sort((a, b) => (usesU.get(a.slug) || 0) - (usesU.get(b.slug) || 0) || fit(lv, b.tier) - fit(lv, a.tier) || (usesK.get(a.key) || 0) - (usesK.get(b.key) || 0) || hash(f.id + lv + a.slug) - hash(f.id + lv + b.slug));
    const list = [];
    for (const u of cands) {
      if (list.length >= want) break;
      // a hand-picked guide drawing may serve three faces (22 drawings carry every guide page); any other drawing two
      if (keys.has(u.key) || (usesU.get(u.slug) || 0) >= (GUIDE_OK.has(u.slug) ? 3 : 2) || (usesK.get(u.key) || 0) >= 5) continue;
      // the scene face: never two copies in the same setting at one level
      if (f.mode === 'scene' && list.some((c) => UNITS.find((x) => x.slug === c.unit).fdxSetting === u.fdxSetting)) continue;
      list.push({ copy: copy++, unit: u.slug });
      keys.add(u.key); usesU.set(u.slug, (usesU.get(u.slug) || 0) + 1); usesK.set(u.key, (usesK.get(u.key) || 0) + 1);
    }
    if (list.length < want) out.short.push(`${f.id} L${lv}: ${list.length}/${want}`);
    out.faces[f.id][lv] = list;
  }
}
fs.writeFileSync(path.join(ROOT, 'data', 'htdx', 'allocation.json'), JSON.stringify(out, null, 1) + '\n');
const n = Object.values(out.faces).flatMap((l) => Object.values(l)).flat().length;
console.log(n, 'worksheets per locale ·', usesU.size, 'drawings ·', usesK.size, 'nouns ·', [...usesU.values()].filter((v) => v === 2).length, 'used twice', out.short.length ? '· SHORT ' + out.short.join('; ') : '');
