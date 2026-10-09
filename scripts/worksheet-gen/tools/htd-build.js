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
const OUT = path.join(__dirname, '..', 'data', 'htd');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const slugOf = (src) => src.toLowerCase().replace(/@3x\.webp$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let review = {}; try { review = require('../data/htd/review.js'); } catch (e) { review = {}; }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srcs = new Map();
  for (const s of [...SCENES, ...SECOND]) { const hero = s.items[s.items.length - 1]; srcs.set(hero.src, { src: hero.src, id: s.id, en: s.names.en }); }
  if (arg('src')) srcs.set(arg('src'), { src: arg('src'), id: slugOf(arg('src')), en: null });
  for (const { src, id, en } of srcs.values()) {
    const slug = slugOf(src);
    if (only && !only.has(slug) && !only.has(id)) continue;
    const ov = (review.OVERRIDES || {})[slug] || {};
    const t0 = Date.now();
    try {
      const S = await Hd.buildSteps(src, { steps: ov.steps || 5 });
      const rec = { v: 1, slug, src, sceneId: id, names: { en }, ...S, refused: (review.REFUSED || {})[slug] || null };
      fs.writeFileSync(path.join(OUT, slug + '.json'), JSON.stringify(rec));
      console.log(`${slug}: steps ${S.steps.length} shares ${S.steps.map((s) => s.share).join('/')} shapes ${S.shapes.filter((x) => x.kind).length} ${Date.now() - t0}ms`);
    } catch (e) { console.log(`${slug}: FAILED ${e.message}`); }
  }
})().catch((e) => { console.error(e); process.exit(1); });
