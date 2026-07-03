#!/usr/bin/env node
/* =====================================================================
   gen-library-backgrounds.js — placeholder scenes for the Story Studio's
   GLOBAL background library (asset-stubbed-first doctrine: teachers get a
   stocked picker today; the operator's rendered art replaces these
   file-for-file — same id, or new ids + a manifest rebuild).

   Generates six 1600×1000 Direction-A flat scenes (gen-placeholder-art.js
   style — soft gradients, simple shapes, well under the 300KB scene cap)
   into "mini tools/storybook-library/backgrounds/<id>@2x.webp".

   USAGE:  node scripts/storybook/gen-library-backgrounds.js
   Then:   node scripts/storybook/build-library-manifest.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const REPO = path.join(__dirname, '..', '..');
const BGS = path.join(REPO, 'mini tools', 'storybook-library', 'backgrounds');
const W = 1600, H = 1000;

function svg(inner, skyTop, skyBottom) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyBottom}"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${inner}</svg>`;
}
const sun = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const cloud = (x, y, s, c) => `<ellipse cx="${x}" cy="${y}" rx="${120 * s}" ry="${38 * s}" fill="${c}"/>`;
const hill = (y, c) => `<ellipse cx="800" cy="${y + 560}" rx="1400" ry="620" fill="${c}"/>`;
const tree = (x, y, s, leaf, trunk) =>
  `<rect x="${x - 12 * s}" y="${y - 110 * s}" width="${24 * s}" height="${110 * s}" fill="${trunk}"/>
   <circle cx="${x}" cy="${y - 150 * s}" r="${85 * s}" fill="${leaf}"/>`;
const fir = (x, y, s, c) =>
  `<polygon points="${x},${y - 220 * s} ${x - 95 * s},${y} ${x + 95 * s},${y}" fill="${c}"/>
   <polygon points="${x},${y - 300 * s} ${x - 70 * s},${y - 110 * s} ${x + 70 * s},${y - 110 * s}" fill="${c}"/>`;

const SCENES = {
  /* a friendly classroom wall: board, window, desk line */
  'classroom': svg(`
    <rect width="${W}" height="700" fill="#f6ead2"/>
    <rect y="700" width="${W}" height="300" fill="#d9b98c"/>
    <rect x="180" y="130" width="620" height="380" rx="18" fill="#2f7a5f" stroke="#a9743e" stroke-width="22"/>
    <rect x="960" y="120" width="420" height="400" rx="14" fill="#bfe3f2" stroke="#fff" stroke-width="18"/>
    <line x1="1170" y1="120" x2="1170" y2="520" stroke="#fff" stroke-width="12"/>
    <line x1="960" y1="320" x2="1380" y2="320" stroke="#fff" stroke-width="12"/>
    ${cloud(1120, 220, 0.5, '#ffffff')}
    <rect x="120" y="640" width="1360" height="26" rx="13" fill="#c9a06a"/>`,
    '#f9f1de', '#f6ead2'),
  /* a forest path curving into the trees */
  'forest-path': svg(`
    ${sun(1350, 150, 75, '#F6C860')}${cloud(420, 190, 1, '#ffffff')}
    ${hill(300, '#8fbf6e')}
    <path d="M 700 1000 C 760 760 640 640 800 520 C 900 430 860 380 820 340 L 900 340 C 980 420 940 500 880 580 C 780 700 900 800 940 1000 Z" fill="#e0c491"/>
    ${fir(240, 620, 1.3, '#4c8f57')}${fir(450, 560, 1, '#3e7c49')}
    ${fir(1220, 600, 1.4, '#4c8f57')}${fir(1420, 660, 1, '#3e7c49')}
    ${tree(1080, 560, 1, '#5da245', '#8a5a33')}`,
    '#cfe7f5', '#eef4e0'),
  /* a beach: sea band, sand, a little sailboat */
  'beach': svg(`
    ${sun(280, 170, 80, '#F6C860')}${cloud(900, 160, 0.9, '#ffffff')}
    <rect y="470" width="${W}" height="220" fill="#7fc6c9"/>
    <path d="M 0 690 C 300 650 500 720 800 690 C 1100 660 1300 720 1600 690 L 1600 1000 L 0 1000 Z" fill="#f0dcae"/>
    <polygon points="1150,420 1150,300 1250,420" fill="#ffffff"/>
    <rect x="1146" y="290" width="8" height="140" fill="#8a5a33"/>
    <path d="M 1080 440 Q 1160 480 1260 440 L 1240 470 Q 1160 500 1100 470 Z" fill="#d9744a"/>`,
    '#cfe7f5', '#e8f3f6'),
  /* a starry night sky over a sleeping meadow */
  'night-sky': svg(`
    <circle cx="1260" cy="200" r="85" fill="#f4ecd4"/>
    <circle cx="1225" cy="185" r="70" fill="#26356b"/>
    ${[[150, 120], [340, 260], [520, 90], [760, 200], [980, 120], [1090, 320], [620, 330], [230, 380], [1440, 380], [880, 420]]
      .map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#f4ecd4"/>`).join('')}
    ${hill(430, '#2f4472')}
    ${fir(300, 720, 1.1, '#22335c')}${fir(1300, 760, 1.3, '#22335c')}`,
    '#1b2547', '#26356b'),
  /* a winter hill: snow, firs, snowman-ready */
  'winter-hill': svg(`
    ${sun(1330, 160, 70, '#f7e8b8')}${cloud(450, 170, 1, '#ffffff')}
    ${hill(330, '#f5f7fa')}
    ${fir(280, 640, 1.2, '#4c8f57')}${fir(430, 700, 0.8, '#3e7c49')}${fir(1280, 660, 1.3, '#4c8f57')}
    <ellipse cx="820" cy="840" rx="120" ry="42" fill="#e6ebf2"/>
    <circle cx="820" cy="760" r="80" fill="#ffffff"/>
    <circle cx="820" cy="650" r="55" fill="#ffffff"/>`,
    '#cddcec', '#e9f0f7'),
  /* a farm: barn, fence, field rows */
  'farm': svg(`
    ${sun(260, 160, 75, '#F6C860')}${cloud(1050, 150, 0.9, '#ffffff')}
    ${hill(320, '#9cc471')}
    <path d="M 0 780 L 1600 700 L 1600 1000 L 0 1000 Z" fill="#c9a06a"/>
    ${[820, 880, 940].map(y => `<path d="M 0 ${y + 40} L 1600 ${y - 40}" stroke="#b78a52" stroke-width="14" fill="none"/>`).join('')}
    <rect x="1020" y="430" width="330" height="230" fill="#c65f43"/>
    <polygon points="1010,430 1185,320 1360,430" fill="#8a4630"/>
    <rect x="1150" y="540" width="80" height="120" fill="#7A3016"/>
    ${[140, 320, 500, 680].map(x => `<rect x="${x}" y="600" width="16" height="90" fill="#a9743e"/>`).join('')}
    <rect x="120" y="620" width="590" height="14" fill="#a9743e"/>
    <rect x="120" y="660" width="590" height="14" fill="#a9743e"/>`,
    '#cfe7f5', '#eef4e0'),
};

(async () => {
  fs.mkdirSync(BGS, { recursive: true });
  for (const [id, body] of Object.entries(SCENES)) {
    const out = path.join(BGS, id + '@2x.webp');
    await sharp(Buffer.from(body)).resize(W, H).webp({ quality: 84 }).toFile(out);
    const kb = (fs.statSync(out).size / 1024) | 0;
    console.log('  ' + id + '@2x.webp  ' + kb + 'KB' + (kb > 300 ? '  (!) over the scene cap' : ''));
  }
  console.log('[gen-library-backgrounds] done — now run build-library-manifest.js');
})().catch(e => { console.error(e); process.exit(1); });
