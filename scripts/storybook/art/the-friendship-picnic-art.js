#!/usr/bin/env node
/* =====================================================================
   the-friendship-picnic-art.js — FINAL art for library story #10, the
   PART 1 FINALE (wsv-1).

   A picnic-meadow recap of Part 1: each page features one friend's
   jumbled basket (their MINI CAMEO — the character module's real rig,
   rendered happy and scaled — stands beside it), and the finale gathers
   ALL the companions around the blanket. Props come from the new shared
   prop-lib.js. p2/p5 paint the homes (Milo's sled / Willa's pond) at
   the exact listen-place slot coords.

   USAGE: node scripts/storybook/art/the-friendship-picnic-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const P = require('./prop-lib.js');
const pip = require('./characters/pip.js');
const shelly = require('./characters/shelly.js');
const CAMEOS = {
  bo: require('./characters/bo.js'),
  poppy: require('./characters/poppy.js'),
  hazel: require('./characters/hazel.js'),
  willa: require('./characters/willa.js'),
  milo: require('./characters/milo.js'),
  kiko: require('./characters/kiko.js'),
  noodle: require('./characters/noodle.js'),
};
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'the-friendship-picnic');

/* a companion's REAL rig as a mini cameo, feet anchored at (x,y) */
function cameo(mod, x, y, s, flip) {
  const body = mod.render({ happy: true }).replace(/<\/?svg[^>]*>/g, '');
  const f = flip ? -1 : 1;
  return `<g transform="translate(${x} ${y}) scale(${f * s} ${s}) translate(-256 -620)">${body}</g>`;
}
function propAt(fn, x, y, size, alpha) {
  const s = size / 300;
  return `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${s})"${alpha != null ? ` opacity="${alpha}"` : ''}>${fn().replace(/<\/?svg[^>]*>/g, '')}</g>`;
}

/* ------------------------------------------------ scene furniture */
function blanket(cx, cy, w, h) {
  /* SOLID coral grid — semi-transparent strokes over this much area blow
     the style gate's pixel budget (the #8 pond lesson) */
  const parts = [S.rrect(cx - w / 2, cy - h / 2, w, h, 22, 'cream', { outlined: true, sw: 7 })];
  for (let i = 1; i < 4; i++) parts.push(S.stroke(`M ${cx - w / 2 + (i * w) / 4} ${cy - h / 2 + 8} L ${cx - w / 2 + (i * w) / 4} ${cy + h / 2 - 8}`, 'coral', 9));
  for (let i = 1; i < 3; i++) parts.push(S.stroke(`M ${cx - w / 2 + 8} ${cy - h / 2 + (i * h) / 3} L ${cx + w / 2 - 8} ${cy - h / 2 + (i * h) / 3}`, 'coral', 9));
  return parts.join('');
}
function basketAt(cx, cy, s) {
  return S.pathShape(`M ${cx - 90 * s} ${cy - 30 * s} L ${cx + 90 * s} ${cy - 30 * s} L ${cx + 66 * s} ${cy + 56 * s} Q ${cx} ${cy + 70 * s} ${cx - 66 * s} ${cy + 56 * s} Z`, 'sandDeep', { outlined: true, sw: 7 * s }) +
    S.stroke(`M ${cx - 78 * s} ${cy - 2 * s} L ${cx + 78 * s} ${cy - 2 * s}`, 'creamDeep', 8 * s) +
    S.rrect(cx - 94 * s, cy - 40 * s, 188 * s, 18 * s, 8 * s, 'creamDeep', { outlined: true, sw: 6 * s });
}
function sledAt(cx, cy, s) {
  return S.pathShape(`M ${cx - 110 * s} ${cy - 60 * s} L ${cx + 110 * s} ${cy - 60 * s} L ${cx + 94 * s} ${cy} L ${cx - 94 * s} ${cy} Z`, 'coral', { outlined: true, sw: 7 * s }) +
    S.stroke(`M ${cx - 120 * s} ${cy + 18 * s} L ${cx + 120 * s} ${cy + 18 * s}`, 'outline', 9 * s);
}
function pondAt(cx, cy, s) {
  return S.ellipse(cx, cy, 150 * s, 60 * s, 'tealMid') +
    S.ellipse(cx, cy - 4 * s, 132 * s, 48 * s, 'bluebird') +
    S.ellipse(cx - 30 * s, cy - 16 * s, 60 * s, 18 * s, 'skyPale') +
    S.pathShape(`M ${cx + 60 * s} ${cy - 10 * s} A ${34 * s} ${13 * s} 0 1 1 ${cx + 60 * s} ${cy - 11 * s} Z`, 'leaf', { outlined: true, sw: 4 * s });
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const finale = n === 8;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 620),
    S.sun(300 + (n - 1) * 108, 138, 78),
    S.cloud(660 + ((n * 51) % 170), 110 + ((n * 29) % 40), 0.95, 0.9),
    S.cloud(1170 - ((n * 39) % 150), 188 + ((n * 21) % 36), 0.72, 0.8),
    S.hill(350, 585, 560, 130, 'mint'),
    S.hill(1290, 595, 580, 145, 'mint'),
    S.groundBand(640, 1600, 360, 'leaf'),
    /* frame flora */
    S.grass(110, 760, 1.0, 'leafDeep'),
    S.grass(1500, 790, 0.95, 'leafDeep'),
    S.circle(158, 726, 12, 'coral', { outlined: true, sw: 5 }),
    S.circle(1462, 750, 11, 'berry', { outlined: true, sw: 5 }),
    /* the picnic blanket, low center (below the interaction zones) */
    blanket(800, 930, 620, 150),
    basketAt(520, 900, 0.8),
  ];
  /* per-page friend cameos beside their baskets (bottom corners, off-zone) */
  if (n === 1) parts.push(cameo(CAMEOS.poppy, 1230, 985, 0.3, true));
  if (n === 2) { parts.push(sledAt(690, 640, 1.0), basketAt(1080, 640, 1.0), cameo(CAMEOS.milo, 1230, 985, 0.3, true)); }
  if (n === 3) parts.push(cameo(CAMEOS.noodle, 1230, 985, 0.32, true));
  if (n === 4) parts.push(cameo(CAMEOS.willa, 1230, 985, 0.3, true));
  if (n === 5) { parts.push(basketAt(690, 640, 1.0), pondAt(1080, 645, 1.0), cameo(CAMEOS.willa, 1230, 985, 0.3, true)); }
  if (n === 6) parts.push(cameo(CAMEOS.milo, 1230, 985, 0.3, true));
  if (n === 7) { parts.push(cameo(CAMEOS.hazel, 470, 985, 0.3, false), cameo(CAMEOS.kiko, 1230, 985, 0.3, true)); }
  if (finale) {
    /* the whole Part-1 roster gathers around the blanket */
    const order = ['bo', 'poppy', 'hazel', 'willa', 'milo', 'kiko', 'noodle'];
    const xs = [455, 570, 685, 800, 915, 1030, 1150];
    order.forEach((id, i) => parts.push(cameo(CAMEOS[id], xs[i], 975 + (i % 2) * 14, 0.26, i > 3)));
    parts.push(propAt(P.strawberry, 700, 905, 60), propAt(P.shell, 880, 908, 60));
    parts.push(S.sparkle(560, 240, 1.2, 'sunshine'), S.sparkle(1080, 200, 1.0, 'sunshine'), S.sparkle(840, 300, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-the-friendship-picnic');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] shelly frames…');
  await S.standardPoseSet(path.join(tmp, 'shelly'), shelly.render, shelly.spec);
  const shOut = path.join(STORY_DIR, 'cast', 'shelly');
  (await packCharacter(path.join(tmp, 'shelly'), 'shelly', shOut)).forEach((f) => written.push(path.join(shOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const PD = path.join(STORY_DIR, 'props');
  const propMap = {
    pumpkin: P.pumpkin, carrot: P.carrot, strawberry: P.strawberry,
    mitten: P.mitten, hat: P.hat, scarf: P.scarf,
    sock: P.sock, shirt: P.shirt, fish: P.fish,
    shell: P.shell, starfish: P.starfish, 'toy-train': P.toyTrain,
  };
  for (const [name, fn] of Object.entries(propMap)) {
    written.push(await S.renderWebp(fn(), path.join(PD, `${name}@2x.webp`)));
  }

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
