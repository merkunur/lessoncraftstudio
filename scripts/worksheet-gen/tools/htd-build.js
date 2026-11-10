#!/usr/bin/env node
/**
 * htd-build.js — How to Draw step data (nt2-G / b7): for every hero drawing of the Color by Number scenes (and any
 * extra `--src=` drawings) derive the drawing lesson with lib/htd-steps.js and write data/htd/<slug>.json (generated,
 * rebuilds byte-identically; data/htd/review.js is the committed human record: refusals + per-drawing overrides).
 *   node tools/htd-build.js [--only=slug,slug] [--src="theme dir/noun"]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const Hd = require('../lib/htd-steps.js');
const { SCENES, SECOND } = require('../data/cbn/lineart-scenes.js');
const SET = (process.argv.find((x) => x.startsWith('--set=')) || '--set=htd').slice(6);   // 'htdx' = the Level Set lessons (interior engine)
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
// --designs=<module> --out=<dir>: the flagship library pictures (docs/makers/FLAGSHIP.md), into their own store
const OUT = arg('out') ? path.resolve(arg('out')) : path.join(__dirname, '..', 'data', SET);
const only = arg('only-file') ? new Set(fs.readFileSync(arg('only-file'), 'utf8').split(',')) : arg('only') ? new Set(arg('only').split(',')) : null;
const slugOf = (src) => src.toLowerCase().replace(/@3x\.webp$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let review = {}; try { review = require('../data/' + SET + '/review.js'); } catch (e) { review = {}; }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srcs = new Map();
  if (arg('designs')) for (const s of require(path.resolve(arg('designs'))).LINEART) srcs.set(s.items[0].src, { src: s.items[0].src, id: s.id, en: s.names.en });
  else for (const s of [...SCENES, ...SECOND]) { const hero = s.items[s.items.length - 1]; srcs.set(hero.src, { src: hero.src, id: s.id, en: s.names.en }); }
  if (arg('src')) srcs.set(arg('src'), { src: arg('src'), id: slugOf(arg('src')), en: null });
  for (const { src, id, en } of srcs.values()) {
    const slug = slugOf(src);
    if (only && !only.has(slug) && !only.has(id)) continue;
    const ov = (review.OVERRIDES || {})[slug] || {};
    const t0 = Date.now();
    try {
      // --steps / --fold / --interior: the flagship library's retry of a drawing the 5-step default left a thin step
      const S = await Hd.buildSteps(src, arg('steps') ? { steps: +arg('steps'), foldFloor: +arg('fold') || undefined, interior: process.argv.includes('--interior') } : SET === 'htdx' ? { steps: ov.steps || 5, foldFloor: ov.foldFloor || 0.08, interior: true } : { steps: ov.steps || 5, foldFloor: ov.foldFloor || undefined });
      const rec = { v: 1, slug, src, sceneId: id, names: { en }, override: ov, ...S, refused: (review.REFUSED || {})[slug] || null };
      fs.writeFileSync(path.join(OUT, slug + '.json'), JSON.stringify(rec));
      console.log(`${slug}: steps ${S.steps.length} shares ${S.steps.map((s) => s.share).join('/')} shapes ${S.shapes.filter((x) => x.kind).length} ${Date.now() - t0}ms`);
    } catch (e) { console.log(`${slug}: FAILED ${e.message}`); }
  }
})().catch((e) => { console.error(e); process.exit(1); });
