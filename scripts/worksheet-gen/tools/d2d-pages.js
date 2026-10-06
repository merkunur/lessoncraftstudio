#!/usr/bin/env node
/**
 * d2d-pages.js — contact sheets of the Dot-to-Dot figures a Level Set wave will PRINT, drawn solved (the dots joined in
 * coral), to READ before generating: the picture, the numbers or letters, at the level's own size and support.
 * Built through each face's real build(), so what is read is what is printed.
 *   node tools/d2d-pages.js --faces=K-294,K-309 --levels=1,3 --copies=1-5 --locale=en [--out=dir]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const FILES = {
  'K-285': 'k/K-285-dot-to-dot', 'K-294': 'k/K-294-dot-to-dot-1-to-10', 'K-295': 'k/K-295-dot-to-dot-teen-numbers',
  'K-296': 'k/K-296-dot-to-dot-count-on-11-to-30', 'K-308': 'k/K-308-dot-to-dot-count-back-from-10', 'K-309': 'k/K-309-dot-to-dot-abc-order',
  'G1-285': 'g1/G1-285-dot-to-dot-count-by-twos', 'G1-294': 'g1/G1-294-dot-to-dot-count-back-from-20',
  'G2-304': 'g2/G2-304-dot-to-dot-count-by-fives', 'G2-314': 'g2/G2-314-dot-to-dot-count-by-tens',
};
const faces = arg('faces', Object.keys(FILES).join(',')).split(',');
const levels = arg('levels', '1,2,3').split(',').map(Number);
const [c0, c1] = arg('copies', '1-5').split('-').map(Number);
const locale = arg('locale', 'en');
const out = arg('out', path.join(process.env.TEMP || '/tmp', 'spl', 'd2d-pages'));
fs.mkdirSync(out, { recursive: true });

const tiles = [];
for (const id of faces) {
  const T = require(path.join(__dirname, '..', 'types', FILES[id] + '.js'));
  for (const lv of levels) for (let c = c0; c <= (c1 || c0); c++) {
    if (lv === 2 && c === 1) continue;   // the published page: not a scene
    let svg = null, cap = `${id} L${lv} #${c}`;
    try {
      const r = T.build({ difficulty: lv, locale }, { variant: c, seedVariant: c, rng: Math.random });
      svg = (/<svg[\s\S]*?<\/svg>/.exec(r.bodyHtml) || [])[0];
      const pts = [...svg.matchAll(/data-lcs-dot="(\d+)" data-lcs-x="([\d.]+)" data-lcs-y="([\d.]+)"/g)].map((m) => [+m[2], +m[3]]);
      svg = svg.replace(/<\/svg>\s*$/, `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#F2784B" stroke-width="4" stroke-linejoin="round" opacity="0.8"/></svg>`);
      cap += ` · ${r.meta.scene}${r.bodyHtml.includes('data-lcs-nostrip') ? ' · no strip' : ''}${svg.includes('data-lcs-lite') ? ' · lite' : ''}`;
    } catch (e) { cap += ' · ' + e.message.slice(0, 70); }
    tiles.push({ svg, cap });
  }
}
(async () => {
  const W = 640, H = 597, PER = 6, COLS = 3;
  for (let k = 0; k * PER < tiles.length; k++) {
    const comp = [];
    for (const [j, t] of tiles.slice(k * PER, k * PER + PER).entries()) {
      let svg = t.svg || `<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fee"/></svg>`;
      if (!svg.includes('xmlns=')) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      const img = await sharp(Buffer.from(svg)).resize(W, H).png().toBuffer();
      const cap = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="40"><rect width="${W}" height="40" fill="#fff"/><text x="10" y="28" font-family="Arial" font-size="22" font-weight="700">${t.cap.replace(/[<&]/g, '')}</text></svg>`;
      comp.push({ input: img, left: (j % COLS) * W, top: Math.floor(j / COLS) * (H + 40) + 40 });
      comp.push({ input: Buffer.from(cap), left: (j % COLS) * W, top: Math.floor(j / COLS) * (H + 40) });
    }
    const file = path.join(out, `p-${locale}-${k}.png`);
    await sharp({ create: { width: COLS * W, height: 2 * (H + 40), channels: 3, background: '#ddd' } }).composite(comp).png().toFile(file);
    console.log(file);
  }
  console.log(tiles.length, 'figures');
})().catch((e) => { console.error(e); process.exit(1); });
