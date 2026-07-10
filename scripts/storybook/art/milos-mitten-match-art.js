#!/usr/bin/env node
/* =====================================================================
   milos-mitten-match-art.js — FINAL art for library story #6 (wsv-1).

   Snowy-hill world (winter palette region: white/skyPale snow, snow-capped
   pines, log cabin off-right, red sled). The sled LOADS with matched pairs
   page by page (the running payoff); on the finale two tiny penguin
   friends arrive + sparkles. Props are winter twins — draw fns are
   parameterized by colorway + PATTERN (dots/stripes/star) so the
   twin-recognition pages differ by pattern only.

   USAGE: node scripts/storybook/art/milos-mitten-match-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const milo = require('./characters/milo.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'milos-mitten-match');

/* ------------------------------------------------ patterns (drawn over a garment body) */
function patternMarks(kind) {
  if (kind === 'dots') return S.circle(126, 130, 14, 'cream') + S.circle(178, 108, 12, 'cream') + S.circle(160, 170, 13, 'cream');
  if (kind === 'stripes') return S.stroke('M 92 118 L 214 96 M 96 160 L 218 138', 'cream', 14);
  if (kind === 'star') return S.sparkle(152, 136, 2.2, 'cream');
  return '';
}

/* ------------------------------------------------ winter garment bodies (300×300) */
function mittenSVG(c, pattern) {
  return S.doc(300, 300, [
    S.pathShape('M 96 232 L 96 130 Q 96 56 162 56 Q 226 56 226 128 L 226 168 Q 250 158 258 180 Q 264 202 232 214 L 226 232 Z', c, { outlined: true }),
    patternMarks(pattern),
    S.rrect(88, 224, 146, 42, 16, 'cream', { outlined: true, sw: 8 }),
  ]);
}
function hatSVG(c, pattern) {
  return S.doc(300, 300, [
    S.pathShape('M 62 208 Q 62 84 150 78 Q 238 84 238 208 Z', c, { outlined: true }),
    patternMarks(pattern),
    S.rrect(50, 198, 200, 44, 20, 'cream', { outlined: true, sw: 8 }),
    S.circle(150, 66, 26, 'cream', { outlined: true, sw: 8 }),
  ]);
}
function scarfSVG(c) {
  return S.doc(300, 300, [
    S.rrect(70, 60, 160, 130, 26, c, { outlined: true }),
    S.rrect(96, 150, 74, 120, 14, c, { outlined: true }),
    S.stroke('M 104 246 L 104 272 M 126 250 L 126 276 M 148 246 L 148 272', 'outline', 8),
    S.stroke('M 84 96 L 226 96 M 84 130 L 226 130', 'cream', 12, { alpha: 0.85 }),
    S.stroke('M 110 176 L 156 176 M 110 210 L 156 210', 'cream', 10, { alpha: 0.85 }),
  ]);
}
function bootSVG(c) {
  return S.doc(300, 300, [
    S.pathShape('M 104 70 L 196 70 L 196 168 Q 244 184 250 224 Q 250 256 210 256 L 118 256 Q 104 256 104 236 Z', c, { outlined: true }),
    S.rrect(94, 52, 112, 44, 18, 'cream', { outlined: true, sw: 8 }),
    S.ellipse(196, 244, 44, 12, 'cream', { alpha: 0.7 }),
  ]);
}
function mugSVG(c) {
  return S.doc(300, 300, [
    S.stroke('M 216 130 Q 262 138 258 178 Q 254 212 214 208', 'outline', 26),
    S.stroke('M 216 130 Q 262 138 258 178 Q 254 212 214 208', c, 14),
    S.rrect(74, 96, 148, 156, 22, c, { outlined: true }),
    S.ellipse(148, 108, 62, 18, 'sandDeep', { outlined: true, sw: 6 }),
    S.stroke('M 122 76 Q 132 56 122 40 M 158 78 Q 170 58 160 42', 'skyPale', 10),
  ]);
}
const PROPS = {
  'mitten-red': () => mittenSVG('coral'), 'mitten-blue': () => mittenSVG('bluebird'),
  'mitten-red-dots': () => mittenSVG('coral', 'dots'), 'mitten-red-stripes': () => mittenSVG('coral', 'stripes'),
  'hat-teal': () => hatSVG('tealMid'), 'hat-coral': () => hatSVG('coral'),
  'hat-teal-star': () => hatSVG('tealMid', 'star'), 'hat-teal-dots': () => hatSVG('tealMid', 'dots'),
  'scarf-teal': () => scarfSVG('tealMid'), 'scarf-berry': () => scarfSVG('berry'),
  'boot-sand': () => bootSVG('sandDeep'), 'boot-blue': () => bootSVG('bluebird'),
  'mug-coral': () => mugSVG('coral'), 'mug-teal': () => mugSVG('tealMid'),
};

/* ------------------------------------------------ scene helpers */
function snowPine(x, baseY, s) {
  return (
    S.stroke(`M ${x} ${baseY} L ${x} ${baseY - 50 * s}`, 'outline', 18 * s) +
    S.stroke(`M ${x} ${baseY} L ${x} ${baseY - 50 * s}`, 'sandDeep', 10 * s) +
    S.pathShape(`M ${x - 74 * s} ${baseY - 42 * s} L ${x} ${baseY - 140 * s} L ${x + 74 * s} ${baseY - 42 * s} Z`, 'leafDeep', { outlined: true, sw: 6 * s }) +
    S.pathShape(`M ${x - 56 * s} ${baseY - 112 * s} L ${x} ${baseY - 192 * s} L ${x + 56 * s} ${baseY - 112 * s} Z`, 'leafDeep', { outlined: true, sw: 6 * s }) +
    S.pathShape(`M ${x - 38 * s} ${baseY - 178 * s} Q ${x} ${baseY - 210 * s} ${x + 38 * s} ${baseY - 178 * s} Q ${x} ${baseY - 166 * s} ${x - 38 * s} ${baseY - 178 * s} Z`, 'white')
  );
}
function cabin(x, y, s) {
  const parts = [];
  parts.push(S.rrect(x - 130 * s, y - 150 * s, 260 * s, 150 * s, 10 * s, 'sandDeep', { outlined: true, sw: 7 * s }));
  for (let i = 1; i < 4; i++) parts.push(S.stroke(`M ${x - 130 * s} ${y - 150 * s + i * 38 * s} L ${x + 130 * s} ${y - 150 * s + i * 38 * s}`, 'outline', 4 * s, { alpha: 0.4 }));
  parts.push(S.pathShape(`M ${x - 150 * s} ${y - 145 * s} L ${x} ${y - 225 * s} L ${x + 150 * s} ${y - 145 * s} Z`, 'coral', { outlined: true, sw: 7 * s }));
  parts.push(S.pathShape(`M ${x - 150 * s} ${y - 148 * s} L ${x} ${y - 228 * s} L ${x + 150 * s} ${y - 148 * s} L ${x + 130 * s} ${y - 148 * s} L ${x} ${y - 208 * s} L ${x - 130 * s} ${y - 148 * s} Z`, 'white'));
  parts.push(S.rrect(x - 34 * s, y - 96 * s, 68 * s, 96 * s, 12 * s, 'creamDeep', { outlined: true, sw: 6 * s }));
  parts.push(S.circle(x + 74 * s, y - 92 * s, 26 * s, 'sunshine', { outlined: true, sw: 6 * s }));
  return parts.join('');
}
function sled(x, y, s, stage) {
  const parts = [];
  const load = [];
  const mini = (key, dx, dy) => `<g transform="translate(${x + dx * s} ${y + dy * s}) scale(${0.3 * s})">${PROPS[key]().replace(/<\/?svg[^>]*>/g, '')}</g>`;
  if (stage >= 1) load.push(mini('mitten-red', -96, -160), mini('hat-teal', -30, -170));
  if (stage >= 2) load.push(mini('scarf-teal', 34, -164), mini('boot-sand', 92, -156));
  if (stage >= 3) load.push(mini('mug-coral', -64, -216), mini('mitten-blue', 8, -220));
  parts.push(load.join(''));
  parts.push(S.pathShape(`M ${x - 120 * s} ${y - 88 * s} L ${x + 120 * s} ${y - 88 * s} L ${x + 104 * s} ${y - 20 * s} L ${x - 104 * s} ${y - 20 * s} Z`, 'coral', { outlined: true, sw: 7 * s }));
  parts.push(S.stroke(`M ${x - 130 * s} ${y} Q ${x - 150 * s} ${y - 30 * s} ${x - 120 * s} ${y - 40 * s} L ${x + 130 * s} ${y} Z`.replace(' Z', ''), 'outline', 10 * s));
  parts.push(S.stroke(`M ${x - 130 * s} ${y} L ${x + 130 * s} ${y}`, 'outline', 10 * s));
  return parts.join('');
}
function miniPenguin(x, y, s, scarfToken) {
  return (
    S.pathShape(`M ${x} ${y - 150 * s} C ${x + 44 * s} ${y - 146 * s} ${x + 56 * s} ${y - 60 * s} ${x + 50 * s} ${y - 18 * s} Q ${x + 44 * s} ${y} ${x} ${y} Q ${x - 44 * s} ${y} ${x - 50 * s} ${y - 18 * s} C ${x - 56 * s} ${y - 60 * s} ${x - 44 * s} ${y - 146 * s} ${x} ${y - 150 * s} Z`, 'night', { outlined: true, sw: 6 * s }) +
    S.ellipse(x, y - 52 * s, 30 * s, 40 * s, 'cream') +
    S.ellipse(x, y - 116 * s, 26 * s, 20 * s, 'cream') +
    S.eyeDot(x - 11 * s, y - 118 * s, 5 * s) + S.eyeDot(x + 11 * s, y - 118 * s, 5 * s) +
    S.pathShape(`M ${x - 7 * s} ${y - 106 * s} L ${x + 7 * s} ${y - 106 * s} Q ${x} ${y - 94 * s} ${x - 7 * s} ${y - 106 * s} Z`, 'sunshine', { outlined: true, sw: 3 * s }) +
    S.stroke(`M ${x - 26 * s} ${y - 92 * s} Q ${x} ${y - 78 * s} ${x + 26 * s} ${y - 92 * s}`, scarfToken, 12 * s)
  );
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const finale = n === 8;
  const stage = n <= 2 ? 0 : n <= 4 ? 1 : n <= 6 ? 2 : 3;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 620),
    S.sun(300 + (n - 1) * 108, 138, 76),
    S.cloud(620 + ((n * 67) % 200), 110 + ((n * 37) % 48), 1.0, 0.9),
    S.cloud(1150 - ((n * 49) % 170), 190 + ((n * 27) % 40), 0.75, 0.8),
    /* far snow hills */
    S.hill(340, 585, 560, 130, 'mint'),
    S.hill(1290, 595, 580, 145, 'mint'),
    /* the snow field */
    S.groundBand(630, 1600, 370, 'white'),
    S.pathShape('M 0 1000 L 0 872 Q 470 828 900 870 Q 1290 908 1600 876 L 1600 1000 Z', 'skyPale', { alpha: 0.7 }),
    S.ellipse(430, 800, 150, 26, 'skyPale'),
    S.ellipse(1120, 850, 170, 28, 'skyPale'),
    /* frame: snow pines left, cabin off-right */
    snowPine(100, 740, 1.15),
    snowPine(240, 690, 0.8),
    snowPine(1478, 700, 0.95),
    cabin(1520, 900, 1.0),
    sled(1300, 980, 0.9, stage),
  ];
  if (finale) {
    parts.push(miniPenguin(560, 980, 0.9, 'berry'), miniPenguin(700, 990, 0.75, 'coral'));
    parts.push(S.sparkle(620, 240, 1.2, 'sunshine'), S.sparkle(1060, 200, 1.0, 'sunshine'), S.sparkle(850, 300, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-milos-mitten-match');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] milo frames…');
  await S.standardPoseSet(path.join(tmp, 'milo'), milo.render, milo.spec);
  const mOut = path.join(STORY_DIR, 'cast', 'milo');
  (await packCharacter(path.join(tmp, 'milo'), 'milo', mOut)).forEach((f) => written.push(path.join(mOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  for (const [name, fn] of Object.entries(PROPS)) {
    written.push(await S.renderWebp(fn(), path.join(STORY_DIR, 'props', `${name}@2x.webp`)));
  }

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
