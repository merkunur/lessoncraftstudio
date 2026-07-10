#!/usr/bin/env node
/* =====================================================================
   bos-wobbly-cart-art.js — FINAL art for library story #2 (wsv-1).

   Meadow-path world; Bo's little wooden cart sits bottom-right and
   VISIBLY REPAIRS across the story (the running payoff):
     stage A (p1-2): tilted, wheel off, no crate, no flag
     stage B (p3-4): wheel on, upright; crate beside; no flag
     stage C (p5-6): wheel + crate loaded; no flag
     stage D (p7-8): complete; p8 adds celebration sparkles
   Renders via style-lib tokens only; packs via pack-atlas.js; emits
   art-manifest.json. Interaction regions (x≈420-1220, y≈170-820) stay calm.

   USAGE: node scripts/storybook/art/bos-wobbly-cart-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const bo = require('./characters/bo.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'bos-wobbly-cart');

/* ---------------------------------------------------------------- props */
/* bare shapes (choice-board tiles supply their own card chrome) — forms
   match sb-shape-fit's geometry (square rx, triangle proportions) for
   visual continuity between "recognize" and "fit" pages */
function shapeSVG(shape, colorToken) {
  const r = 120, cx = 150, cy = 150;
  let form;
  if (shape === 'circle') form = S.circle(cx, cy, r, colorToken, { outlined: true });
  else if (shape === 'square') form = S.rrect(cx - r, cy - r, 2 * r, 2 * r, 26, colorToken, { outlined: true });
  else form = S.pathShape(`M ${cx} ${cy - r} L ${cx + r * 0.92} ${cy + r * 0.72} L ${cx - r * 0.92} ${cy + r * 0.72} Z`, colorToken, { outlined: true });
  return S.doc(300, 300, [form]);
}
function wheelSVG() {
  const cx = 150, cy = 150, r = 116;
  const spokes = [];
  for (let k = 0; k < 3; k++) {
    const a = (k * 60 * Math.PI) / 180;
    spokes.push(S.stroke(`M ${cx - Math.cos(a) * (r - 18)} ${cy - Math.sin(a) * (r - 18)} L ${cx + Math.cos(a) * (r - 18)} ${cy + Math.sin(a) * (r - 18)}`, 'orangeDeep', 14));
  }
  return S.doc(300, 300, [
    S.circle(cx, cy, r, 'coral', { outlined: true }),
    S.circle(cx, cy, r - 34, 'creamDeep', { outlined: true, sw: 7 }),
    spokes.join(''),
    S.circle(cx, cy, 26, 'orangeDeep', { outlined: true, sw: 7 }),
  ]);
}
function crateSVG() {
  return S.doc(300, 300, [
    S.rrect(34, 34, 232, 232, 20, 'sandDeep', { outlined: true }),
    S.rrect(48, 118, 204, 28, 6, 'creamDeep'),
    S.rrect(48, 186, 204, 28, 6, 'creamDeep'),
  ]);
}
function pennantSVG() {
  return S.doc(300, 320, [
    S.stroke('M 84 30 L 84 290', 'outline', 22),
    S.stroke('M 84 30 L 84 290', 'sandDeep', 12),
    S.pathShape('M 96 42 L 264 96 L 96 152 Z', 'sunshine', { outlined: true }),
  ]);
}
function flowerSVG() {
  const cx = 150, cy = 140;
  const petals = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 * Math.PI) / 180;
    petals.push(S.ellipse(cx + Math.cos(a) * 58, cy + Math.sin(a) * 58, 40, 28, 'coral', { outlined: true, sw: 7 }));
  }
  return S.doc(300, 300, [
    S.stroke(`M ${cx} ${cy + 60} Q ${cx - 10} ${cy + 120} ${cx - 4} ${cy + 150}`, 'leafDeep', 14),
    petals.join(''),
    S.circle(cx, cy, 40, 'sunshine', { outlined: true, sw: 8 }),
  ]);
}

/* ---------------------------------------------------------------- the cart (in-scene, bottom-right) */
function cartSVG(stage, celebrate) {
  /* local coords around (0,0) = cart floor center; placed at (1300, 890) */
  const parts = [];
  const tilt = stage === 'A' ? 'rotate(-7)' : '';
  const bed = S.rrect(-140, -34, 280, 34, 10, 'sandDeep', { outlined: true, sw: 8 });
  const handle = S.stroke('M -136 -26 Q -196 -60 -216 -96', 'outline', 20) +
    S.stroke('M -136 -26 Q -196 -60 -216 -96', 'sandDeep', 11);
  /* wheel */
  const wheel = (stage === 'A')
    ? `<g transform="translate(150 -8)">${S.circle(0, 0, 42, 'coral', { outlined: true, sw: 7 })}${S.circle(0, 0, 12, 'orangeDeep')}</g>`
    : `<g transform="translate(66 6)">${S.circle(0, 0, 46, 'coral', { outlined: true, sw: 7 })}${S.circle(0, 0, 30, 'creamDeep', { outlined: true, sw: 5 })}${S.circle(0, 0, 12, 'orangeDeep')}</g>`;
  const wheel2 = (stage === 'A') ? '' : `<g transform="translate(-72 6)">${S.circle(0, 0, 46, 'coral', { outlined: true, sw: 7 })}${S.circle(0, 0, 30, 'creamDeep', { outlined: true, sw: 5 })}${S.circle(0, 0, 12, 'orangeDeep')}</g>`;
  /* crate */
  const crateOn = (stage === 'C' || stage === 'D')
    ? `<g transform="translate(-10 -104)">${S.rrect(-64, 0, 128, 70, 12, 'sandDeep', { outlined: true, sw: 7 })}${S.rrect(-64, 26, 128, 16, 4, 'creamDeep')}</g>`
    : (stage === 'B' ? `<g transform="translate(226 -6) rotate(12)">${S.rrect(-54, -54, 108, 108, 12, 'sandDeep', { outlined: true, sw: 7 })}${S.rrect(-54, -12, 108, 14, 4, 'creamDeep')}</g>` : '');
  /* flag */
  const flag = (stage === 'D')
    ? S.stroke('M 118 -34 L 118 -168', 'outline', 12) + S.stroke('M 118 -34 L 118 -168', 'sandDeep', 6) +
      S.pathShape('M 124 -164 L 208 -136 L 124 -108 Z', 'sunshine', { outlined: true, sw: 7 })
    : '';
  const spark = celebrate ? (S.sparkle(-170, -150, 1.1, 'sunshine') + S.sparkle(60, -200, 0.9, 'white') + S.sparkle(200, -120, 1.0, 'sunshine')) : '';
  parts.push(`<g transform="${tilt}">${bed}${handle}${crateOn}${flag}</g>`, wheel2, wheel, spark);
  return `<g transform="translate(1300 890)">${parts.join('')}</g>`;
}

/* ---------------------------------------------------------------- scenes */
function sceneSVG(n) {
  const stage = n <= 2 ? 'A' : n <= 4 ? 'B' : n <= 6 ? 'C' : 'D';
  const celebrate = n === 8;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 640),
    S.sun(240 + (n - 1) * 120, 150, 82),
    S.cloud(480 + ((n * 89) % 240), 120 + ((n * 41) % 55), 1.0, 0.9),
    S.cloud(1120 - ((n * 67) % 200), 200 + ((n * 29) % 45), 0.78, 0.8),
    /* far hills */
    S.hill(300, 560, 520, 130, 'mint'),
    S.hill(1350, 570, 560, 150, 'mint'),
    /* mid hills */
    S.hill(180, 640, 460, 150, 'leaf'),
    S.hill(1460, 650, 500, 170, 'leaf'),
    /* meadow */
    S.groundBand(620, 1600, 380, 'leaf'),
    S.pathShape('M 0 1000 L 0 860 Q 500 800 900 856 Q 1300 910 1600 872 L 1600 1000 Z', 'leafDeep', { alpha: 0.25 }),
    /* the sand path, winding lower-left to right */
    S.pathShape('M 0 920 Q 420 850 860 900 Q 1240 944 1600 906 L 1600 1000 L 0 1000 Z', 'sand'),
    S.ellipse(560, 946, 120, 20, 'sandDeep', { alpha: 0.5 }),
    S.ellipse(1080, 962, 140, 22, 'sandDeep', { alpha: 0.45 }),
    /* edge trees */
    `<g>${S.stroke('M 92 700 L 92 590', 'outline', 26)}${S.stroke('M 92 700 L 92 590', 'sandDeep', 14)}${S.circle(92, 520, 96, 'leafDeep', { outlined: true, sw: 7 })}${S.circle(52, 560, 52, 'leafDeep')}${S.circle(136, 556, 48, 'leafDeep')}</g>`,
    `<g>${S.stroke('M 1524 668 L 1524 574', 'outline', 22)}${S.stroke('M 1524 668 L 1524 574', 'sandDeep', 12)}${S.circle(1524, 512, 82, 'leafDeep', { outlined: true, sw: 7 })}</g>`,
    /* meadow flowers at the frame edges */
    S.circle(180, 760, 14, 'coral', { outlined: true, sw: 5 }),
    S.circle(148, 800, 11, 'berry', { outlined: true, sw: 5 }),
    S.circle(1470, 790, 13, 'coral', { outlined: true, sw: 5 }),
    S.grass(240, 786, 0.9, 'leafDeep'),
    S.grass(1436, 820, 0.9, 'leafDeep'),
    /* Bo's cart (the progressive repair) */
    cartSVG(stage, celebrate),
  ];
  if (celebrate) {
    parts.push(S.sparkle(620, 260, 1.3, 'sunshine'), S.sparkle(1020, 210, 1.0, 'sunshine'), S.sparkle(820, 330, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ---------------------------------------------------------------- run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-bos-wobbly-cart');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] bo frames…');
  await S.standardPoseSet(path.join(tmp, 'bo'), bo.render, bo.spec);
  const boOut = path.join(STORY_DIR, 'cast', 'bo');
  (await packCharacter(path.join(tmp, 'bo'), 'bo', boOut)).forEach((f) => written.push(path.join(boOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const colorSets = { coral: 'coral', teal: 'teal', sun: 'sunshine' };
  for (const [suffix, token] of Object.entries(colorSets)) {
    for (const shape of ['circle', 'square', 'triangle']) {
      written.push(await S.renderWebp(shapeSVG(shape, token), path.join(STORY_DIR, 'props', `${shape}-${suffix}@2x.webp`)));
    }
  }
  written.push(await S.renderWebp(wheelSVG(), path.join(STORY_DIR, 'props', 'wheel@2x.webp')));
  written.push(await S.renderWebp(crateSVG(), path.join(STORY_DIR, 'props', 'crate@2x.webp')));
  written.push(await S.renderWebp(pennantSVG(), path.join(STORY_DIR, 'props', 'pennant@2x.webp')));
  written.push(await S.renderWebp(flowerSVG(), path.join(STORY_DIR, 'props', 'flower@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
