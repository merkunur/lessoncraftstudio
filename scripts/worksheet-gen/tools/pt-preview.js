#!/usr/bin/env node
/**
 * pt-preview.js — compose Picture Tracing scenes (data/b9/scenes.js) and write a quick PNG (no page shell) at 2×:
 *   node tools/pt-preview.js <sceneId> [<sceneId> …]   → out/pt/scene-<id>.png, problems printed
 * The real page (shell, title, instruction, footer) is rendered by render/one.js K-418 …; this is the fast loop.
 */
'use strict';
const path = require('path'); const sharp = require('sharp');
const { composeScene } = require('../lib/pt-scene.js');
const FS = require('../data/b9/face-scenes.js');
const SCENES = { ...require('../data/b9/scenes.js').SCENES, ...FS.SCENES };
const { checkMetrics } = require('../types/k/K-418-picture-tracing.js');
(async () => {
  for (const id of process.argv.slice(2)) {
    let sc = SCENES[id]; if (!sc) { console.log('no scene', id); continue; }
    if (typeof sc === 'function') sc = FS.sceneFor(id);
    const out = await composeScene(sc);
    // librsvg (sharp) cannot draw an embedded WebP; Chrome (the PDF) can — convert for the preview only
    let svgIn = out.svg;
    for (const m of svgIn.match(/data:image\/webp;base64,[A-Za-z0-9+/=]+/g) || []) {
      const png = await sharp(Buffer.from(m.slice(23), 'base64')).png().toBuffer();
      svgIn = svgIn.replace(m, 'data:image/png;base64,' + png.toString('base64'));
    }
    const svg = svgIn.replace('<svg ', '<svg style="background:#fff" ').replace(/(<svg[^>]*>)/, '$1<rect width="100%" height="100%" fill="#fff"/>');
    const file = path.join(__dirname, '..', 'out', 'pt', 'scene-' + id + '.png');
    await sharp(Buffer.from(svg), { density: 144 }).png().toFile(file);
    const law = out.metrics.band ? checkMetrics(out.metrics) : [];
    const m = out.metrics;
    console.log(id.padEnd(20), 'len', m.tracedLen, 'minPic', m.minPic, 'ext', m.extent.y0 + '-' + m.extent.y1, out.problems.length ? 'PROBLEMS: ' + out.problems.join('; ') : 'ok', law.length ? 'LAWS: ' + law.join('; ') : '');
  }
})().catch((e) => { console.error(e); process.exit(1); });
