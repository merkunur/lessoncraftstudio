#!/usr/bin/env node
/* =====================================================================
   shellys-seashells-art.js — FINAL art for library story #1 (and the
   template per-story art generator for stories #2..250).

   Renders through style-lib.js ONLY (wsv-1 palette tokens — off-palette
   colors are inexpressible), then packs via the shipped pack-atlas.js:
     cast/pip/     final-quality Pip (poses+idle+celebrate clip)
     cast/shelly/  Shelly the hermit crab (neutral/happy+idle)
     scenes/       page-01..08.webp — one sunny beach tide-pool world,
                   consistent camera, calm center (the interaction zone
                   region stays low-detail), golden-hour finale
     props/        pearl/shell/starfish/pebble/pail/bigshell @2x webp
   Emits art-manifest.json (gate-library style conformance) and refreshes
   the shared library Pip (mini tools/storybook-library/characters/pip/).

   USAGE: node scripts/storybook/art/shellys-seashells-art.js [--skip-library]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const shelly = require('./characters/shelly.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'shellys-seashells');
const LIB_PIP = path.join(REPO, 'mini tools', 'storybook-library', 'characters', 'pip');

/* ---------------------------------------------------------------- props */
function pearlSVG() {
  return S.doc(300, 300, [
    S.circle(150, 158, 104, 'skyPale', { outlined: true }),
    S.pathShape('M 244 200 A 104 104 0 0 1 62 210 A 128 128 0 0 0 244 200 Z', 'mint', { alpha: 0.8 }),
    S.ellipse(112, 112, 40, 26, 'white'),
    S.sparkle(236, 66, 1.1, 'sunshine'),
  ]);
}
function scallopSVG() {
  const bumps = [];
  const L = 42, R = 298, top = 120, hx = 170, hy = 262;
  /* fan silhouette: hinge -> left edge -> 5 bumps -> right edge -> close */
  const seg = (R - L) / 5;
  let d = `M ${hx} ${hy} L ${L} ${top + 46}`;
  for (let i = 0; i < 5; i++) {
    const x0 = L + i * seg, x1 = L + (i + 1) * seg;
    const peak = top - (i === 2 ? 26 : i === 1 || i === 3 ? 16 : 0);
    d += ` Q ${(x0 + x1) / 2} ${peak - 34} ${x1} ${i === 4 ? top + 46 : peak + 12}`;
  }
  d += ` Z`;
  for (let i = 1; i < 5; i++) {
    const x = L + i * seg;
    bumps.push(S.stroke(`M ${hx} ${hy - 8} L ${x} ${top + (i === 2 || i === 3 ? -8 : 10)}`, 'cream', 11, { alpha: 0.85 }));
  }
  return S.doc(340, 300, [
    S.pathShape(d, 'coral', { outlined: true }),
    bumps.join(''),
    S.rrect(hx - 30, hy - 14, 60, 34, 14, 'orangeDeep', { outlined: true, sw: 8 }),
  ]);
}
function starfishSVG() {
  const cx = 170, cy = 178, ro = 150, ri = 66;
  let d = '';
  for (let k = 0; k < 5; k++) {
    const ao = (-90 + 72 * k) * Math.PI / 180;
    const ai = (-90 + 72 * k + 36) * Math.PI / 180;
    const ox = cx + Math.cos(ao) * ro, oy = cy + Math.sin(ao) * ro;
    const ix = cx + Math.cos(ai) * ri, iy = cy + Math.sin(ai) * ri;
    if (k === 0) {
      const aip = (-90 - 36) * Math.PI / 180;
      d = `M ${cx + Math.cos(aip) * ri} ${cy + Math.sin(aip) * ri}`;
    }
    d += ` Q ${ox} ${oy} ${ix} ${iy}`;
  }
  d += ' Z';
  const dots = [];
  for (let k = 0; k < 5; k++) {
    const a = (-90 + 72 * k) * Math.PI / 180;
    dots.push(S.circle(cx + Math.cos(a) * ro * 0.62, cy + Math.sin(a) * ro * 0.62, 12, 'creamDeep'));
  }
  return S.doc(340, 356, [
    S.pathShape(d, 'orange', { outlined: true }),
    S.circle(cx, cy, 34, 'sunshine'),
    dots.join(''),
  ]);
}
function pebbleSVG() {
  return S.doc(300, 240, [
    S.pathShape('M 40 170 Q 30 84 116 62 Q 210 40 254 110 Q 280 168 226 196 Q 130 226 66 198 Q 40 186 40 170 Z', 'sandDeep', { outlined: true }),
    S.ellipse(120, 106, 46, 26, 'creamDeep'),
  ]);
}
function pailSVG() {
  return S.doc(320, 350, [
    S.stroke('M 70 120 Q 160 6 250 120', 'outline', 28),
    S.stroke('M 70 120 Q 160 6 250 120', 'sunshine', 15),
    S.pathShape('M 62 122 L 258 122 L 232 306 Q 160 324 88 306 Z', 'bluebird', { outlined: true }),
    S.pathShape('M 84 210 L 236 210 L 232 306 Q 160 324 88 306 Z', 'sky', { alpha: 0.55 }),
    S.rrect(50, 96, 220, 44, 22, 'skyPale', { outlined: true }),
  ]);
}
/* the big new shell home (dot-stamp subject; dots land on the fan) */
function bigshellSVG() {
  const L = 70, R = 570, top = 96, hx = 320, hy = 496;
  const seg = (R - L) / 5;
  let d = `M ${hx} ${hy} L ${L} ${top + 120}`;
  for (let i = 0; i < 5; i++) {
    const x0 = L + i * seg, x1 = L + (i + 1) * seg;
    const peak = top - (i === 2 ? 40 : i === 1 || i === 3 ? 22 : 0);
    d += ` Q ${(x0 + x1) / 2} ${peak - 52} ${x1} ${i === 4 ? top + 120 : peak + 26}`;
  }
  d += ' Z';
  const ridges = [];
  for (let i = 1; i < 5; i++) {
    const x = L + i * seg;
    ridges.push(S.stroke(`M ${hx} ${hy - 12} L ${x} ${top + (i === 2 || i === 3 ? -10 : 26)}`, 'sandDeep', 13, { alpha: 0.9 }));
  }
  return S.doc(640, 560, [
    S.pathShape(d, 'cream', { outlined: true, sw: 12 }),
    ridges.join(''),
    S.rrect(hx - 44, hy - 18, 88, 44, 20, 'sandDeep', { outlined: true, sw: 9 }),
  ]);
}

/* ---------------------------------------------------------------- scenes */
/* One beach world, consistent camera. n = 1..8; the finale turns golden.
   Calm-center rule: detail lives at the frame edges + top; the interaction
   region (x≈460-1180, y≈180-820) stays plain sea/sand. */
function sceneSVG(n) {
  const golden = n === 8;
  const sunX = 220 + (n - 1) * 130;                 /* the sun crosses the sky across the story */
  const sunY = golden ? 330 : 150 + Math.abs(4.5 - n) * 8;
  const parts = [
    S.skyGradient(golden ? 'sunshine' : 'sky', 'skyPale', 1600, 620),
    S.sun(sunX, sunY, golden ? 96 : 82),
    S.cloud(380 + ((n * 97) % 260), 130 + ((n * 53) % 60), 1.05, 0.9),
    S.cloud(1180 - ((n * 71) % 220), 210 + ((n * 37) % 50), 0.8, 0.8),
    /* far band: pale dunes on the horizon */
    S.hill(240, 470, 420, 90, 'mint'),
    S.hill(1420, 480, 480, 100, 'mint'),
    /* sea */
    S.water(440, 1600, 220, 'bluebird', 'white'),
    S.water(560, 1600, 90, 'sky', 'white'),
    /* sand foreground */
    S.pathShape('M 0 660 Q 380 600 820 636 Q 1240 668 1600 622 L 1600 1000 L 0 1000 Z', 'sand'),
    S.ellipse(360, 812, 130, 26, 'sandDeep', { alpha: 0.5 }),
    S.ellipse(1210, 880, 150, 30, 'sandDeep', { alpha: 0.5 }),
    S.ellipse(760, 950, 170, 30, 'sandDeep', { alpha: 0.45 }),
    /* tide-pool, bottom-right corner (outside the interaction region) */
    S.ellipse(1450, 906, 170, 54, 'tealMid'),
    S.ellipse(1450, 902, 148, 42, 'mint'),
    /* rocks + dune grass at the frame edges */
    S.rock(105, 742, 0.9, 'sandDeep', 'creamDeep'),
    S.rock(1545, 700, 0.7, 'sandDeep', 'creamDeep'),
    S.grass(190, 726, 1.0, 'leafDeep'),
    S.grass(1494, 664, 0.9, 'leaf'),
    /* tiny settled treasures in the corners (story flavour, off the zone) */
    S.circle(84, 956, 16, 'coral', { outlined: true, sw: 6 }),
    S.sparkle(150, 936, 0.8, 'sunshine'),
  ];
  if (golden) {
    parts.push(`<rect width="1600" height="1000" fill="${S.token('sunshine')}" opacity="0.12"/>`);
    parts.push(S.sparkle(560, 260, 1.4, 'white'), S.sparkle(1080, 200, 1.1, 'white'), S.sparkle(860, 340, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ---------------------------------------------------------------- run */
(async () => {
  const skipLibrary = process.argv.includes('--skip-library');
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-shellys-seashells');
  fs.rmSync(tmp, { recursive: true, force: true });

  const written = [];

  /* characters */
  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  const pipFiles = await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut);
  pipFiles.forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] shelly frames…');
  await S.standardPoseSet(path.join(tmp, 'shelly'), shelly.render, shelly.spec);
  const shellyOut = path.join(STORY_DIR, 'cast', 'shelly');
  const shellyFiles = await packCharacter(path.join(tmp, 'shelly'), 'shelly', shellyOut);
  shellyFiles.forEach((f) => written.push(path.join(shellyOut, f)));

  /* scenes */
  console.log('[art] scenes…');
  const sceneTmp = path.join(tmp, 'scenes');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(sceneTmp, `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  /* props */
  console.log('[art] props…');
  const props = { pearl: pearlSVG(), shell: scallopSVG(), starfish: starfishSVG(), pebble: pebbleSVG(), pail: pailSVG(), bigshell: bigshellSVG() };
  for (const [name, svg] of Object.entries(props)) {
    written.push(await S.renderWebp(svg, path.join(STORY_DIR, 'props', `${name}@2x.webp`)));
  }

  /* art manifest (gate-library style conformance) */
  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);

  /* refresh the shared library Pip (same atlas contract, final art) */
  if (!skipLibrary && fs.existsSync(LIB_PIP)) {
    for (const f of fs.readdirSync(pipOut)) {
      if (/^pip\.(base|clips)/.test(f)) fs.copyFileSync(path.join(pipOut, f), path.join(LIB_PIP, f));
    }
    console.log('[art] library pip refreshed at ' + LIB_PIP + ' (run build-library-manifest.js)');
  }

  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
