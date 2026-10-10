#!/usr/bin/env node
/**
 * fdx-preview.js — Find the Differences Level Set scenes laid out and rendered (line + colour side by side), for READING.
 *   node tools/fdx-preview.js <out.png> --only=id,id   |  --from=N --count=M
 */
'use strict';
const path = require('path'); const sharp = require('sharp');
const F = require('../lib/fd-scene.js'); const { layoutScene } = require('../lib/fdx-layout.js');
const { SCENES } = require('../data/fdx/scenes.js');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const out = process.argv[2];
let list = SCENES;
if (arg('only')) { const o = arg('only').split(','); list = SCENES.filter((s) => o.includes(s.id)); }
if (arg('from')) list = list.slice(+arg('from'), +arg('from') + (+arg('count') || 6));
const PW = 420;
(async () => {
  const comps = []; let y = 0;
  for (const spec of list) {
    let sc;
    try { sc = layoutScene(spec); } catch (e) { console.log('LAYOUT FAIL', e.message); continue; }
    const scene = await F.buildLayers(sc, { inherit: false });
    const line = await sharp(Buffer.from(F.renderPanel(scene, [], { mode: 'line', width: PW }))).png().toBuffer();
    const col = await sharp(Buffer.from(F.renderPanel(scene, [], { mode: 'colour', width: PW }))).png().toBuffer();
    const ph = Math.round(PW * 560 / 600);
    const lab = `<svg width="${PW * 2 + 20}" height="26"><text x="4" y="19" font-size="17" font-family="Arial">${spec.id} · ${spec.names.en} · ${spec.setting}${spec.variant || 0}${spec.mirror ? 'm' : ''} · ${sc.items.length} drawings · L${spec.level || 2}</text></svg>`;
    comps.push({ input: Buffer.from(lab), left: 0, top: y }, { input: line, left: 0, top: y + 26 }, { input: col, left: PW + 20, top: y + 26 });
    y += ph + 40;
    console.log(spec.id, sc.items.length, 'drawings');
  }
  await sharp({ create: { width: PW * 2 + 20, height: Math.max(y, 10), channels: 3, background: '#fff' } }).composite(comps).png().toFile(out);
})().catch((e) => { console.error(e); process.exit(1); });
