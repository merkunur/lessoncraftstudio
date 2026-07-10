#!/usr/bin/env node
/* =====================================================================
   gigis-tall-lookout-art.js — FINAL art for library story #13 (wsv-1).

   Quest to the lookout hill: the tower grows from a horizon speck (s1)
   into the arrival scene (s8) — the approaching-destination pattern.
   Every prop pair is baked-attribute-normalized: same design, same
   WIDTH, only the HEIGHT differs (short variants sit bottom-anchored
   in the same canvas so relative height survives card scaling).
   Paint-at-data-coords:
     s3 four fence posts at the color-code region rects
        T(260,390,260,420) S(550,530,260,280) T(840,390) S(1110,530)
     s4 stools under the listen-place slots (short seat 690,660 ·
        tall seat 1070,450)
     s6 the tall lookout ladder-pole under the vertical trace
        (abs x 900, y 720→240)
     s8 the tall tower (top platform at slot 1060,390) + the short
        post (top at slot 640,660).
   Solid palette layers; no groundBand-as-architecture (#12 gotcha).

   USAGE: node scripts/storybook/art/gigis-tall-lookout-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const gigi = require('./characters/gigi.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'gigis-tall-lookout');

/* ------------------------------------------------ props (baked pairs:
   same design + width; ONLY height differs; short = bottom-anchored) */
function treeSVG(tall) {
  const topY = tall ? 120 : 265;
  return S.doc(300, 420, [
    S.rrect(136, topY + 40, 28, 400 - (topY + 40), 10, 'sandDeep', { outlined: true, sw: 6 }),
    S.circle(150, topY, 66, 'leafDeep', { outlined: true }),
    S.circle(104, topY + 38, 40, 'leafDeep'),
    S.circle(196, topY + 38, 40, 'leafDeep'),
    S.ellipse(150, 404, 82, 12, 'leaf'),
  ]);
}
function ladderSVG(tall) {
  const topY = tall ? 30 : 250;
  const rail = (x) => S.rrect(x - 11, topY, 22, 410 - topY, 9, 'sandDeep', { outlined: true, sw: 6 });
  const rungs = [];
  for (let y = topY + 34; y < 396; y += 62) {
    rungs.push(S.rrect(96, y, 108, 18, 8, 'creamDeep', { outlined: true, sw: 5 }));
  }
  return S.doc(300, 420, [rail(96), rail(204), rungs.join('')]);
}
function ballSVG() {
  return S.doc(300, 300, [
    S.circle(150, 150, 110, 'coral', { outlined: true }),
    S.pathShape('M 52 120 Q 150 60 248 120 Q 150 150 52 120 Z', 'creamDeep', { alpha: 0.9 }),
    S.stroke('M 92 92 Q 118 68 150 62', 'white', 9),
  ]);
}
function sunflowerSVG() {
  return S.doc(300, 460, [
    S.stroke('M 150 440 Q 144 300 150 170', 'leafDeep', 16),
    S.pathShape('M 150 330 Q 96 306 78 262 Q 132 268 150 306 Z', 'leaf', { outlined: true, sw: 5 }),
    ...Array.from({ length: 10 }, (_, k) => {
      const a = (k * 36 * Math.PI) / 180;
      return S.ellipse(150 + Math.cos(a) * 62, 120 + Math.sin(a) * 62, 30, 18, 'sunshine', { outlined: true, sw: 5 });
    }),
    S.circle(150, 120, 42, 'orangeDeep', { outlined: true, sw: 7 }),
  ]);
}
function daisySVG() {
  return S.doc(300, 300, [
    S.stroke('M 150 284 Q 148 240 150 208', 'leafDeep', 13),
    ...Array.from({ length: 8 }, (_, k) => {
      const a = (k * 45 * Math.PI) / 180;
      return S.ellipse(150 + Math.cos(a) * 48, 160 + Math.sin(a) * 48, 26, 16, 'cream', { outlined: true, sw: 5 });
    }),
    S.circle(150, 160, 32, 'sunshine', { outlined: true, sw: 6 }),
  ]);
}
function butterflySVG() {
  return S.doc(300, 300, [
    S.ellipse(112, 128, 52, 62, 'berry', { outlined: true, sw: 7 }),
    S.ellipse(188, 128, 52, 62, 'berry', { outlined: true, sw: 7 }),
    S.ellipse(118, 202, 38, 44, 'coral', { outlined: true, sw: 6 }),
    S.ellipse(182, 202, 38, 44, 'coral', { outlined: true, sw: 6 }),
    S.rrect(140, 96, 20, 130, 10, 'outline'),
    S.stroke('M 142 92 Q 126 62 112 54 M 158 92 Q 174 62 188 54', 'outline', 6),
    S.circle(112, 128, 12, 'sunshine'), S.circle(188, 128, 12, 'sunshine'),
  ]);
}
function poleSVG(tall) {
  const topY = tall ? 44 : 258;
  return S.doc(300, 420, [
    S.rrect(138, topY, 24, 400 - topY, 10, 'sandDeep', { outlined: true, sw: 6 }),
    S.circle(150, topY - 10, 18, 'sunshine', { outlined: true, sw: 6 }),
    S.ellipse(150, 404, 70, 12, 'leaf'),
  ]);
}
function flagSVG() {
  return S.doc(300, 300, [
    S.rrect(96, 40, 20, 230, 9, 'sandDeep', { outlined: true, sw: 6 }),
    S.pathShape('M 118 52 L 258 96 L 118 142 Z', 'coral', { outlined: true }),
    S.circle(106, 36, 14, 'sunshine', { outlined: true, sw: 5 }),
  ]);
}

/* ------------------------------------------------ scene helpers */
function outdoorBase(n) {
  return [
    S.skyGradient('sky', 'skyPale', 1600, 620),
    S.sun(220 + (n % 3) * 60, 140, 76),
    S.cloud(560 + ((n * 71) % 240), 110 + ((n * 43) % 55), 1.0, 0.9),
    S.cloud(1150 - ((n * 53) % 190), 200 + ((n * 29) % 40), 0.75, 0.8),
    S.hill(300, 600, 540, 130, 'mint'),
    S.hill(1330, 600, 560, 145, 'mint'),
    S.groundBand(660, 1600, 340, 'leaf'),
    /* the meadow path, winding toward the lookout */
    S.pathShape('M 0 940 Q 460 870 900 912 Q 1260 946 1600 908 L 1600 1000 L 0 1000 Z', 'sand'),
  ].join('');
}
/* the lookout tower silhouette on the horizon — grows page by page */
function lookoutFar(cx, groundY, s) {
  return `<g transform="translate(${cx} ${groundY}) scale(${s})">` +
    S.rrect(-28, -170, 56, 170, 8, 'sandDeep', { outlined: true, sw: 5 }) +
    S.rrect(-44, -196, 88, 30, 8, 'teal', { outlined: true, sw: 5 }) +
    S.stroke('M 0 -196 L 0 -238', 'outline', 6) +
    S.pathShape('M 2 -236 L 40 -224 L 2 -212 Z', 'coral', { outlined: true, sw: 4 }) +
    '</g>';
}
function fencePost(x, topY, w, bottomY) {
  return S.rrect(x, topY, w, bottomY - topY, 14, 'sandDeep', { outlined: true, sw: 7 }) +
    S.pathShape(`M ${x} ${topY} Q ${x + w / 2} ${topY - 26} ${x + w} ${topY} Z`, 'sandDeep', { outlined: true, sw: 6 }) +
    S.stroke(`M ${x + 30} ${topY + 50} L ${x + w - 30} ${topY + 50} M ${x + 30} ${bottomY - 60} L ${x + w - 30} ${bottomY - 60}`, 'creamDeep', 8);
}
function stool(seatX, seatY, groundY) {
  return S.rrect(seatX - 90, seatY + 116, 180, 26, 12, 'sandDeep', { outlined: true, sw: 7 }) +
    S.rrect(seatX - 74, seatY + 142, 22, groundY - seatY - 142, 8, 'sandDeep', { outlined: true, sw: 6 }) +
    S.rrect(seatX + 52, seatY + 142, 22, groundY - seatY - 142, 8, 'sandDeep', { outlined: true, sw: 6 });
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const parts = [outdoorBase(n)];
  if (n === 1) {
    parts.push(lookoutFar(1280, 660, 0.55));
    parts.push(S.grass(160, 800, 0.9, 'leafDeep'), S.grass(1180, 830, 0.85, 'leafDeep'));
  } else if (n === 2) {
    parts.push(lookoutFar(1250, 655, 0.7));
    /* an orchard fence edge, calm behind the choice cards */
    parts.push(S.stroke('M 120 830 L 360 820', 'sandDeep', 12));
    parts.push(S.grass(300, 812, 0.8, 'leafDeep'));
  } else if (n === 3) {
    parts.push(lookoutFar(1460, 640, 0.85));
    /* four raw fence posts at the EXACT color-code region rects (bottoms 810) */
    parts.push(fencePost(260, 390, 260, 810));
    parts.push(fencePost(550, 530, 260, 810));
    parts.push(fencePost(840, 390, 260, 810));
    parts.push(fencePost(1110, 530, 260, 810));
  } else if (n === 4) {
    parts.push(lookoutFar(1440, 635, 1.0));
    /* picnic rest stop: stools under the two slots (tall seat 840,450 · short seat 1120,680) */
    parts.push(stool(840, 450, 850));
    parts.push(stool(1120, 680, 850));
    parts.push(S.grass(300, 830, 0.9, 'leafDeep'));
  } else if (n === 5) {
    parts.push(lookoutFar(1420, 630, 1.15));
    /* flower patch (find-object renders the flowers itself) */
    parts.push(S.grass(220, 820, 0.9, 'leafDeep'), S.grass(1240, 840, 0.85, 'leafDeep'));
    parts.push(S.circle(180, 780, 12, 'coral', { outlined: true, sw: 5 }));
    parts.push(S.circle(1330, 800, 11, 'berry', { outlined: true, sw: 5 }));
  } else if (n === 6) {
    /* at the lookout base: the TALL ladder-pole under the vertical trace (abs x 900, 720→240) */
    parts.push(S.hill(900, 700, 700, 190, 'leafDeep'));
    parts.push(S.rrect(872, 240, 56, 590, 14, 'sandDeep', { outlined: true }));
    for (let y = 300; y < 780; y += 96) {
      parts.push(S.rrect(846, y, 108, 20, 8, 'creamDeep', { outlined: true, sw: 5 }));
    }
    parts.push(S.rrect(816, 196, 168, 44, 12, 'teal', { outlined: true }));
    parts.push(S.grass(700, 840, 0.9, 'leafDeep'));
  } else if (n === 7) {
    parts.push(lookoutFar(1380, 620, 1.35));
    parts.push(S.grass(320, 820, 0.9, 'leafDeep'), S.grass(1150, 845, 0.8, 'leafDeep'));
  } else {
    /* n === 8 — ARRIVED: the tall tower (top platform at slot 1060,390) + the short post (top 640,660) */
    parts.push(S.hill(1050, 690, 760, 200, 'leafDeep'));
    parts.push(S.rrect(1000, 420, 120, 420, 16, 'sandDeep', { outlined: true }));
    parts.push(S.stroke('M 1020 500 L 1100 500 M 1020 600 L 1100 600 M 1020 700 L 1100 700', 'creamDeep', 9));
    parts.push(S.rrect(966, 372, 188, 52, 14, 'teal', { outlined: true }));
    parts.push(S.rrect(828, 660, 64, 180, 12, 'sandDeep', { outlined: true, sw: 7 }));
    parts.push(S.pathShape('M 828 660 Q 860 636 892 660 Z', 'sandDeep', { outlined: true, sw: 6 }));
    parts.push(S.sparkle(340, 220, 1.2, 'sunshine'), S.sparkle(1340, 260, 1.0, 'sunshine'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-gigis-tall-lookout');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] gigi frames…');
  await S.standardPoseSet(path.join(tmp, 'gigi'), gigi.render, gigi.spec);
  const gOut = path.join(STORY_DIR, 'cast', 'gigi');
  (await packCharacter(path.join(tmp, 'gigi'), 'gigi', gOut)).forEach((f) => written.push(path.join(gOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(treeSVG(true), path.join(P, 'tree-tall@2x.webp')));
  written.push(await S.renderWebp(treeSVG(false), path.join(P, 'tree-short@2x.webp')));
  written.push(await S.renderWebp(ladderSVG(true), path.join(P, 'ladder-tall@2x.webp')));
  written.push(await S.renderWebp(ladderSVG(false), path.join(P, 'ladder-short@2x.webp')));
  written.push(await S.renderWebp(ballSVG(), path.join(P, 'ball@2x.webp')));
  written.push(await S.renderWebp(sunflowerSVG(), path.join(P, 'sunflower@2x.webp')));
  written.push(await S.renderWebp(daisySVG(), path.join(P, 'daisy@2x.webp')));
  written.push(await S.renderWebp(butterflySVG(), path.join(P, 'butterfly@2x.webp')));
  written.push(await S.renderWebp(poleSVG(true), path.join(P, 'pole-tall@2x.webp')));
  written.push(await S.renderWebp(poleSVG(false), path.join(P, 'pole-short@2x.webp')));
  written.push(await S.renderWebp(flagSVG(), path.join(P, 'flag@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
