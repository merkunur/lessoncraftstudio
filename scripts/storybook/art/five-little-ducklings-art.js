#!/usr/bin/env node
/* =====================================================================
   five-little-ducklings-art.js — FINAL art for the library's FIRST TRUE
   INTERACTIVE STORYBOOK (wsv-1): "Five Little Ducklings" (PK count 1-5).

   A real narrative: Willa's five ducklings hide at bedtime; each page's
   activity IS the next story event. The art carries the plot:
   - dusk PROGRESSION: sunset (s1-2) → deepening dusk (s3-5) → dark
     dusk (s6-7) → starry night (s8-9), SOLID stacked bands (the #11
     rule — no distant-pair gradients over big areas);
   - the FOUND-DUCKLING LINE grows beside Willa page by page (s3: 1,
     s4: 2, s5: 3, s6: 4) — the story state painted into every scene;
   - paint-at-data-coords: s2 reeds around the find rect (740,480,
     260,240 abs); s4 watering can beside the find rect (450,460);
     s5 the muddy path under the trace (abs 800..720 x, 240..720 y) +
     duckling four in the pond; s7 nest (4 asleep inside) under the
     correct slot (1120,390) + pond under the decoy slot (860,700);
     s8 five ducklings in a nest row AT the counting dots
     (450,480)(650,520)(850,480)(1050,520)(1230,480).
   Crescent moon = the #11 lune rule (return arc radius 1.4r).

   USAGE: node scripts/storybook/art/five-little-ducklings-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const willa = require('./characters/willa.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'five-little-ducklings');

/* ------------------------------------------------ the ducklings */
function ducklingAt(x, y, s, asleep) {
  const eye = asleep
    ? S.stroke(`M ${x + 6 * s} ${y - 34 * s} Q ${x + 14 * s} ${y - 28 * s} ${x + 22 * s} ${y - 34 * s}`, 'outline', 5 * s)
    : S.eyeDot(x + 14 * s, y - 34 * s, 7 * s);
  return [
    S.ellipse(x, y, 46 * s, 38 * s, 'sunshine', { outlined: true, sw: 6 * s }),
    S.circle(x + 10 * s, y - 30 * s, 26 * s, 'sunshine', { outlined: true, sw: 6 * s }),
    S.pathShape(`M ${x + 32 * s} ${y - 32 * s} L ${x + 52 * s} ${y - 26 * s} L ${x + 32 * s} ${y - 20 * s} Z`, 'orangeDeep', { outlined: true, sw: 4 * s }),
    eye,
    S.ellipse(x - 16 * s, y - 2 * s, 18 * s, 12 * s, 'cream', { alpha: 0.85 }),
    S.stroke(`M ${x - 8 * s} ${y + 36 * s} L ${x - 8 * s} ${y + 44 * s} M ${x + 10 * s} ${y + 36 * s} L ${x + 10 * s} ${y + 44 * s}`, 'orangeDeep', 5 * s),
  ].join('');
}
function foundLine(count) {
  /* the found ducklings waddle in a little line beside Willa — above the
     caption band (y 872+) and below every interaction zone */
  const parts = [];
  for (let k = 0; k < count; k++) parts.push(ducklingAt(1070 + k * 80, 806 + (k % 2) * 8, 0.72, false));
  return parts.join('');
}

/* ------------------------------------------------ props (300-canvas) */
function ducklingSVG(asleep) {
  return S.doc(300, 300, [ducklingAt(140, 170, 2.0, asleep)]);
}
function bushSVG() {
  return S.doc(300, 300, [
    S.circle(150, 180, 96, 'leafDeep', { outlined: true }),
    S.circle(84, 208, 52, 'leafDeep'), S.circle(216, 208, 52, 'leafDeep'),
    S.circle(112, 160, 10, 'berry', { outlined: true, sw: 4 }),
    S.circle(178, 140, 10, 'berry', { outlined: true, sw: 4 }),
    S.circle(196, 196, 10, 'berry', { outlined: true, sw: 4 }),
    /* tiny tail feathers peeking + wiggle strokes — the giveaway */
    S.pathShape('M 130 96 Q 142 66 158 92 Q 148 100 130 96 Z', 'sunshine', { outlined: true, sw: 4 }),
    S.stroke('M 66 110 Q 58 96 64 84 M 234 110 Q 242 96 236 84', 'outline', 6),
  ]);
}
function rockSVG() {
  return S.doc(300, 300, [
    S.rock(150, 230, 1.3, 'sandDeep', 'creamDeep'),
  ]);
}
function willowSVG() {
  return S.doc(300, 340, [
    S.stroke('M 150 320 L 150 200', 'outline', 20),
    S.stroke('M 150 320 L 150 200', 'sandDeep', 11),
    S.circle(150, 150, 88, 'leafDeep', { outlined: true }),
    S.stroke('M 84 190 Q 78 240 88 274 M 150 210 Q 148 258 154 290 M 214 190 Q 222 240 212 274', 'leafDeep', 12),
    S.stroke('M 84 190 Q 78 240 88 274 M 150 210 Q 148 258 154 290 M 214 190 Q 222 240 212 274', 'leaf', 6),
  ]);
}
function fenceSVG() {
  const picket = (x) => S.rrect(x, 90, 40, 170, 8, 'cream', { outlined: true, sw: 6 }) +
    S.pathShape(`M ${x} 90 Q ${x + 20} 62 ${x + 40} 90 Z`, 'cream', { outlined: true, sw: 6 });
  return S.doc(300, 300, [
    picket(40), picket(130), picket(220),
    S.rrect(20, 130, 260, 22, 8, 'creamDeep', { outlined: true, sw: 5 }),
    S.rrect(20, 210, 260, 22, 8, 'creamDeep', { outlined: true, sw: 5 }),
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
function snailSVG() {
  return S.doc(300, 300, [
    S.pathShape('M 60 220 Q 150 250 240 220 L 232 246 Q 150 268 68 246 Z', 'creamDeep', { outlined: true, sw: 6 }),
    S.circle(170, 160, 66, 'coral', { outlined: true }),
    S.circle(170, 160, 40, 'orangeDeep', { outlined: true, sw: 6 }),
    S.circle(170, 160, 16, 'creamDeep'),
    S.stroke('M 78 214 Q 66 180 74 152', 'creamDeep', 16),
    S.eyeDot(70, 142, 7),
  ]);
}

/* ------------------------------------------------ scene helpers */
function skyBands(stage) {
  if (stage === 0) return S.groundBand(0, 1600, 300, 'sky') + S.groundBand(300, 1600, 150, 'skyPale') + S.groundBand(450, 1600, 110, 'sunshine') + S.groundBand(560, 1600, 60, 'coral');
  if (stage === 1) return S.groundBand(0, 1600, 340, 'night') + S.groundBand(340, 1600, 140, 'bluebird') + S.groundBand(480, 1600, 90, 'berry') + S.groundBand(570, 1600, 50, 'coral');
  return S.groundBand(0, 1600, 440, 'night') + S.groundBand(440, 1600, 110, 'berry') + S.groundBand(550, 1600, 70, 'bluebird');
}
function stars(n, seed) {
  const parts = [];
  for (let i = 0; i < n; i++) {
    const x = ((seed * 137 + i * 211) % 1520) + 40;
    const y = ((seed * 97 + i * 149) % 380) + 30;
    parts.push(i % 3 === 0 ? S.sparkle(x, y, 0.7 + (i % 3) * 0.15, 'white') : S.circle(x, y, 4, 'white', { alpha: 0.9 }));
  }
  return parts.join('');
}
function crescentMoon(x, y, r) {
  /* lune rule (#11): the return arc must be LARGER-radius (1.4r), same side */
  return S.pathShape(`M ${x} ${y - r} A ${r} ${r} 0 1 1 ${x} ${y + r} A ${r * 1.4} ${r * 1.4} 0 0 0 ${x} ${y - r} Z`, 'cream', { outlined: true, sw: 6 });
}
function ground(stage) {
  return S.groundBand(660, 1600, 340, stage >= 2 ? 'leafDeep' : 'leaf') +
    S.pathShape('M 0 1000 L 0 920 Q 500 870 940 912 Q 1300 944 1600 912 L 1600 1000 Z', 'sand');
}
function nestAt(cx, rimY, w) {
  return [
    S.pathShape(`M ${cx - w / 2} ${rimY} Q ${cx} ${rimY + w * 0.42} ${cx + w / 2} ${rimY} L ${cx + w / 2 - 24} ${rimY + w * 0.34} Q ${cx} ${rimY + w * 0.6} ${cx - w / 2 + 24} ${rimY + w * 0.34} Z`, 'sandDeep', { outlined: true }),
    S.stroke(`M ${cx - w / 2 + 30} ${rimY + 18} Q ${cx} ${rimY + 44} ${cx + w / 2 - 30} ${rimY + 18}`, 'creamDeep', 9),
    S.stroke(`M ${cx - w / 2 + 44} ${rimY + 46} Q ${cx} ${rimY + 70} ${cx + w / 2 - 44} ${rimY + 46}`, 'creamDeep', 8),
  ].join('');
}
function reeds(cx, baseY, n) {
  const parts = [];
  for (let k = 0; k < n; k++) {
    const x = cx + (k - n / 2) * 46 + ((k * 37) % 18);
    const h = 200 + ((k * 53) % 90);
    parts.push(S.stroke(`M ${x} ${baseY} Q ${x + 8} ${baseY - h / 2} ${x - 4} ${baseY - h}`, 'leafDeep', 12));
    parts.push(S.ellipse(x - 5, baseY - h - 18, 12, 26, 'sandDeep', { outlined: true, sw: 4 }));
  }
  return parts.join('');
}
function wateringCanAt(x, y) {
  return [
    S.rrect(x - 90, y - 130, 180, 130, 20, 'tealMid', { outlined: true }),
    S.stroke(`M ${x - 88} ${y - 96} Q ${x - 170} ${y - 120} ${x - 176} ${y - 40}`, 'tealMid', 20),
    S.stroke(`M ${x + 88} ${y - 110} Q ${x + 130} ${y - 96} ${x + 128} ${y - 70}`, 'outline', 14),
    S.ellipse(x - 176, y - 34, 24, 16, 'teal', { outlined: true, sw: 5 }),
    S.rrect(x - 60, y - 122, 120, 18, 8, 'teal'),
  ].join('');
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const stage = n <= 2 ? 0 : n <= 5 ? 1 : n <= 7 ? 2 : 3;
  const parts = [];
  parts.push(skyBands(Math.min(stage, 2)));
  if (stage >= 1) parts.push(stars(stage === 1 ? 4 : stage === 2 ? 9 : 18, n));
  if (stage >= 2) parts.push(crescentMoon(260, 160, 78));
  else if (stage === 0) parts.push(S.sun(280, 470, 78));   /* the SETTING sun, low in the gold band */
  if (n !== 5) {
    parts.push(S.hill(320, 665, 540, 120, stage >= 2 ? 'teal' : 'mint'));
    parts.push(S.hill(820, 672, 460, 100, stage >= 2 ? 'teal' : 'mint'));
    parts.push(S.hill(1330, 668, 560, 130, stage >= 2 ? 'teal' : 'mint'));
    parts.push(ground(stage));
  }

  if (n === 1) {
    /* sunset meadow; the empty nest waits on the grass (the promise) */
    parts.push(S.softShadow(1180, 796, 150, 22));
    parts.push(nestAt(1180, 730, 240));
    parts.push(S.grass(180, 800, 0.9, 'leafDeep'), S.grass(680, 830, 0.8, 'leafDeep'));
    parts.push(S.circle(420, 790, 13, 'coral', { outlined: true, sw: 5 }));
  } else if (n === 2) {
    /* the pond edge; reeds cluster AROUND the find rect (740,480,260,240 abs) */
    parts.push(S.ellipse(680, 800, 420, 90, 'bluebird'));
    parts.push(S.stroke('M 420 790 Q 500 780 580 792 M 760 812 Q 840 802 920 812', 'skyPale', 7));
    parts.push(reeds(640, 760, 4));
    parts.push(reeds(1010, 780, 5));
    parts.push(S.grass(300, 820, 0.9, 'leafDeep'));
  } else if (n === 3) {
    /* the berry bush waits at the meadow edge; ONE duckling found */
    parts.push(S.circle(250, 780, 64, 'leafDeep', { outlined: true }));
    parts.push(S.circle(226, 756, 8, 'berry'), S.circle(272, 748, 8, 'berry'));
    parts.push(foundLine(1, stage));
    parts.push(S.grass(360, 830, 0.8, 'leafDeep'));
  } else if (n === 4) {
    /* the garden corner; the watering can beside the find rect (450,460 abs); TWO found */
    parts.push(S.rrect(240, 700, 620, 50, 20, 'sandDeep', { alpha: 0.8 }));
    parts.push(wateringCanAt(400, 700));
    parts.push(foundLine(2, stage));
    parts.push(S.grass(1000, 800, 0.85, 'leafDeep'));
  } else if (n === 5) {
    /* the HILLSIDE page: the meadow slope fills the frame so the wiggly muddy
       path (under the trace, abs x ~800->720, y 240..720) runs down GRASS,
       not sky; the pond waits at the bottom with duckling four */
    parts.push(S.hill(800, 340, 1400, 220, 'mint'));
    parts.push(S.groundBand(300, 1600, 700, 'leaf'));
    parts.push(S.pathShape('M 0 1000 L 0 930 Q 500 890 940 922 Q 1300 950 1600 922 L 1600 1000 Z', 'sand'));
    parts.push(S.pathShape('M 830 220 Q 740 320 810 420 Q 870 520 780 620 Q 730 680 750 740 L 690 740 Q 660 660 720 580 Q 790 480 730 380 Q 690 300 770 220 Z', 'sand', { outlined: true, sw: 6 }));
    parts.push(S.grass(420, 400, 0.7, 'leafDeep'), S.grass(1150, 460, 0.7, 'leafDeep'), S.grass(360, 700, 0.8, 'leafDeep'));
    parts.push(S.ellipse(760, 810, 300, 80, 'bluebird'));
    parts.push(S.stroke('M 600 800 Q 680 790 760 800 M 820 828 Q 890 818 960 826', 'skyPale', 6));
    parts.push(ducklingAt(760, 780, 0.9, false));
    parts.push(foundLine(3));
  } else if (n === 6) {
    /* dark and quiet; the willow far left, fence far right (both outside the card zone) */
    parts.push(S.stroke('M 230 780 L 230 640', 'outline', 26));
    parts.push(S.stroke('M 230 780 L 230 640', 'sandDeep', 14));
    parts.push(S.circle(230, 570, 96, 'leafDeep', { outlined: true }));
    parts.push(S.stroke('M 160 610 Q 152 680 166 730 M 230 640 Q 228 700 236 748 M 300 610 Q 310 680 296 730', 'leafDeep', 12));
    parts.push(foundLine(4, stage));
  } else if (n === 7) {
    /* the nest (4 asleep INSIDE — bodies behind the bowl, heads peeking) under
       the CORRECT slot (1120,390 abs); pond under the decoy (860,700) */
    parts.push(S.hill(1120, 620, 380, 100, 'leafDeep'));
    parts.push(ducklingAt(1030, 500, 0.62, true), ducklingAt(1100, 490, 0.62, true), ducklingAt(1170, 500, 0.62, true), ducklingAt(1240, 490, 0.62, true));
    parts.push(nestAt(1120, 480, 320));
    parts.push(S.ellipse(860, 760, 260, 70, 'bluebird'));
    parts.push(S.stroke('M 720 750 Q 790 742 860 750', 'skyPale', 6));
  } else if (n === 8) {
    /* night: the counting row — FIVE ducklings AT the dot coords on a long cozy nest band */
    parts.push(S.pathShape('M 320 640 Q 840 600 1300 640 L 1300 720 Q 840 760 320 720 Z', 'sandDeep', { outlined: true }));
    parts.push(S.stroke('M 360 668 Q 840 632 1260 668', 'creamDeep', 9));
    parts.push(ducklingAt(450, 560, 0.85, false));
    parts.push(ducklingAt(650, 600, 0.85, false));
    parts.push(ducklingAt(850, 560, 0.85, false));
    parts.push(ducklingAt(1050, 600, 0.85, false));
    parts.push(ducklingAt(1230, 560, 0.85, false));
  } else {
    /* n === 9 — goodnight: all five asleep in the row; stars thick; sparkles */
    parts.push(S.pathShape('M 320 640 Q 840 600 1300 640 L 1300 720 Q 840 760 320 720 Z', 'sandDeep', { outlined: true }));
    parts.push(ducklingAt(480, 580, 0.8, true), ducklingAt(660, 610, 0.8, true), ducklingAt(840, 580, 0.8, true), ducklingAt(1020, 610, 0.8, true), ducklingAt(1190, 580, 0.8, true));
    parts.push(S.sparkle(360, 250, 1.1, 'sunshine'), S.sparkle(1300, 220, 1.0, 'sunshine'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-five-little-ducklings');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] willa frames…');
  await S.standardPoseSet(path.join(tmp, 'willa'), willa.render, willa.spec);
  const wOut = path.join(STORY_DIR, 'cast', 'willa');
  (await packCharacter(path.join(tmp, 'willa'), 'willa', wOut)).forEach((f) => written.push(path.join(wOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 9; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(ducklingSVG(false), path.join(P, 'duckling@2x.webp')));
  written.push(await S.renderWebp(ducklingSVG(true), path.join(P, 'pep-asleep@2x.webp')));
  written.push(await S.renderWebp(bushSVG(), path.join(P, 'bush@2x.webp')));
  written.push(await S.renderWebp(rockSVG(), path.join(P, 'rock@2x.webp')));
  written.push(await S.renderWebp(willowSVG(), path.join(P, 'willow@2x.webp')));
  written.push(await S.renderWebp(fenceSVG(), path.join(P, 'fence@2x.webp')));
  written.push(await S.renderWebp(butterflySVG(), path.join(P, 'butterfly@2x.webp')));
  written.push(await S.renderWebp(snailSVG(), path.join(P, 'snail@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
