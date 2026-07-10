#!/usr/bin/env node
/* =====================================================================
   the-tiny-door-art.js — FINAL art for true storybook #3 (wsv-1):
   "The Tiny Door" (PK big vs. small).

   Forest-oak world (new backdrop flavor): the great oak trunk + roots
   left with the TINY door, the hill right with the GREAT BIG door —
   both visible from s1 (the promise held visually on every outdoor
   scene). SIZE pairs share one canvas (only the drawn scale differs).
   Paint-at-data-coords: s3 the tiny footprint trail under the trace
   (abs (450,340)→(1090,480)); s6 big door grounded at the correct
   slot (abs 1120,440 on the hillside) + tiny door at the decoy (abs
   860,640); s7 mirrored (tiny door abs 1120,620 / big door abs
   840,390); s8 BOTH DOORS OPEN + the painted badger (big) and mouse
   (tiny — the duckling precedent: creatures as scene paint, no rigs);
   s9 the tea party (stump table, big cup + tiny cup, golden bands).

   USAGE: node scripts/storybook/art/the-tiny-door-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const hazel = require('./characters/hazel.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'the-tiny-door');

/* ------------------------------------------------ shared draws */
function bigDoorAt(x, baseY, s, open) {
  /* a grand arched door set into the hillside; (x, baseY) = bottom center */
  const w = 220 * s, h = 300 * s;
  const parts = [];
  parts.push(S.pathShape(`M ${x - w / 2 - 26 * s} ${baseY} L ${x - w / 2 - 26 * s} ${baseY - h * 0.62} Q ${x} ${baseY - h - 50 * s} ${x + w / 2 + 26 * s} ${baseY - h * 0.62} L ${x + w / 2 + 26 * s} ${baseY} Z`, 'sandDeep', { outlined: true }));
  if (open) {
    parts.push(S.pathShape(`M ${x - w / 2} ${baseY} L ${x - w / 2} ${baseY - h * 0.6} Q ${x} ${baseY - h - 20 * s} ${x + w / 2} ${baseY - h * 0.6} L ${x + w / 2} ${baseY} Z`, 'night', { alpha: 0.8 }));
    parts.push(`<g transform="translate(${x + w * 0.62} ${baseY}) rotate(24)">${S.pathShape(`M 0 0 L 0 ${-h * 0.6} Q ${w * 0.24} ${-h * 0.78} ${w * 0.48} ${-h * 0.6} L ${w * 0.48} 0 Z`, 'orangeDeep', { outlined: true, sw: 6 * s })}</g>`);
  } else {
    parts.push(S.pathShape(`M ${x - w / 2} ${baseY} L ${x - w / 2} ${baseY - h * 0.6} Q ${x} ${baseY - h - 20 * s} ${x + w / 2} ${baseY - h * 0.6} L ${x + w / 2} ${baseY} Z`, 'orangeDeep', { outlined: true }));
    parts.push(S.stroke(`M ${x} ${baseY} L ${x} ${baseY - h * 0.92}`, 'outline', 5 * s));
    parts.push(S.circle(x - 34 * s, baseY - h * 0.42, 12 * s, 'sunshine', { outlined: true, sw: 5 * s }));
  }
  return parts.join('');
}
function tinyDoorAt(x, baseY, s, open) {
  /* a tiny arched door in the oak root; (x, baseY) = bottom center */
  const w = 88 * s, h = 120 * s;
  const parts = [];
  parts.push(S.pathShape(`M ${x - w / 2 - 12 * s} ${baseY} L ${x - w / 2 - 12 * s} ${baseY - h * 0.6} Q ${x} ${baseY - h - 20 * s} ${x + w / 2 + 12 * s} ${baseY - h * 0.6} L ${x + w / 2 + 12 * s} ${baseY} Z`, 'outline', { alpha: 0.9 }));
  if (open) {
    parts.push(S.pathShape(`M ${x - w / 2} ${baseY} L ${x - w / 2} ${baseY - h * 0.58} Q ${x} ${baseY - h - 8 * s} ${x + w / 2} ${baseY - h * 0.58} L ${x + w / 2} ${baseY} Z`, 'night', { alpha: 0.8 }));
    parts.push(`<g transform="translate(${x + w * 0.6} ${baseY}) rotate(20)">${S.pathShape(`M 0 0 L 0 ${-h * 0.58} Q ${w * 0.22} ${-h * 0.74} ${w * 0.44} ${-h * 0.58} L ${w * 0.44} 0 Z`, 'teal', { outlined: true, sw: 4 * s })}</g>`);
  } else {
    parts.push(S.pathShape(`M ${x - w / 2} ${baseY} L ${x - w / 2} ${baseY - h * 0.58} Q ${x} ${baseY - h - 8 * s} ${x + w / 2} ${baseY - h * 0.58} L ${x + w / 2} ${baseY} Z`, 'teal', { outlined: true, sw: 5 * s }));
    parts.push(S.circle(x - 18 * s, baseY - h * 0.4, 6 * s, 'sunshine', { outlined: true, sw: 3 * s }));
  }
  return parts.join('');
}
function pawPrintAt(x, y, s) {
  return [
    S.ellipse(x, y + 18 * s, 30 * s, 24 * s, 'sandDeep'),
    S.circle(x - 24 * s, y - 12 * s, 10 * s, 'sandDeep'),
    S.circle(x - 8 * s, y - 20 * s, 10 * s, 'sandDeep'),
    S.circle(x + 8 * s, y - 20 * s, 10 * s, 'sandDeep'),
    S.circle(x + 24 * s, y - 12 * s, 10 * s, 'sandDeep'),
  ].join('');
}
function badgerAt(x, baseY, s) {
  /* the BIG neighbor — painted creature (no rig) */
  return [
    S.ellipse(x, baseY - 110 * s, 120 * s, 116 * s, 'sandDeep', { outlined: true }),
    S.ellipse(x, baseY - 74 * s, 74 * s, 62 * s, 'creamDeep'),
    S.circle(x, baseY - 218 * s, 74 * s, 'cream', { outlined: true }),
    S.pathShape(`M ${x - 30 * s} ${baseY - 286 * s} Q ${x - 14 * s} ${baseY - 210 * s} ${x - 26 * s} ${baseY - 160 * s} L ${x - 52 * s} ${baseY - 170 * s} Q ${x - 54 * s} ${baseY - 240 * s} ${x - 30 * s} ${baseY - 286 * s} Z`, 'outline', { alpha: 0.85 }),
    S.pathShape(`M ${x + 30 * s} ${baseY - 286 * s} Q ${x + 14 * s} ${baseY - 210 * s} ${x + 26 * s} ${baseY - 160 * s} L ${x + 52 * s} ${baseY - 170 * s} Q ${x + 54 * s} ${baseY - 240 * s} ${x + 30 * s} ${baseY - 286 * s} Z`, 'outline', { alpha: 0.85 }),
    S.circle(x - 60 * s, baseY - 282 * s, 20 * s, 'sandDeep', { outlined: true, sw: 5 * s }),
    S.circle(x + 60 * s, baseY - 282 * s, 20 * s, 'sandDeep', { outlined: true, sw: 5 * s }),
    S.eyeDot(x - 28 * s, baseY - 232 * s, 8 * s), S.eyeDot(x + 28 * s, baseY - 232 * s, 8 * s),
    S.circle(x, baseY - 196 * s, 12 * s, 'outline'),
    S.stroke(`M ${x - 10 * s} ${baseY - 176 * s} Q ${x} ${baseY - 168 * s} ${x + 10 * s} ${baseY - 176 * s}`, 'outline', 4 * s),
    S.blush(x - 52 * s, baseY - 206 * s, 10 * s), S.blush(x + 52 * s, baseY - 206 * s, 10 * s),
  ].join('');
}
function mouseAt(x, baseY, s) {
  /* the TINY neighbor — painted creature */
  return [
    S.stroke(`M ${x + 26 * s} ${baseY - 8 * s} Q ${x + 58 * s} ${baseY - 2 * s} ${x + 66 * s} ${baseY - 26 * s}`, 'berry', 5 * s),
    S.ellipse(x, baseY - 24 * s, 30 * s, 24 * s, 'berry', { outlined: true, sw: 5 * s }),
    S.circle(x - 6 * s, baseY - 52 * s, 18 * s, 'berry', { outlined: true, sw: 5 * s }),
    S.circle(x - 16 * s, baseY - 68 * s, 9 * s, 'coral', { outlined: true, sw: 3 * s }),
    S.circle(x + 4 * s, baseY - 70 * s, 9 * s, 'coral', { outlined: true, sw: 3 * s }),
    S.eyeDot(x - 10 * s, baseY - 52 * s, 3.4 * s),
    S.eyeDot(x + 1 * s, baseY - 52 * s, 3.4 * s),
    S.circle(x - 20 * s, baseY - 46 * s, 3.4 * s, 'outline'),
  ].join('');
}

/* ------------------------------------------------ props (shared canvas per size pair) */
function cookieSVG(big) {
  const s = big ? 1.0 : 0.52, cy = big ? 150 : 190;
  return S.doc(300, 300, [
    S.circle(150, cy, 108 * s, 'sandDeep', { outlined: true }),
    S.circle(150, cy, 88 * s, 'creamDeep'),
    S.circle(116 - (big ? 0 : 14), cy - 30 * s, 11 * s, 'outline', { alpha: 0.75 }),
    S.circle(186 - (big ? 0 : 34), cy + 8 * s, 11 * s, 'outline', { alpha: 0.75 }),
    S.circle(150, cy + 44 * s, 11 * s, 'outline', { alpha: 0.75 }),
  ]);
}
function parcelSVG(big) {
  const s = big ? 1.0 : 0.5, cy = big ? 160 : 205;
  const w = 200 * s, h = 170 * s;
  return S.doc(300, 300, [
    S.rrect(150 - w / 2, cy - h / 2, w, h, 18 * s, 'coral', { outlined: true }),
    S.rrect(150 - w / 2, cy - 12 * s, w, 24 * s, 6 * s, 'cream'),
    S.rrect(150 - 12 * s, cy - h / 2, 24 * s, h, 6 * s, 'cream'),
    S.circle(150, cy - h / 2, 16 * s, 'sunshine', { outlined: true, sw: 5 * s }),
  ]);
}
function bigDoorSVG() {
  return S.doc(300, 340, [bigDoorAt(150, 320, 0.98, false)]);
}
function tinyDoorSVG() {
  return S.doc(300, 340, [tinyDoorAt(150, 300, 1.3, false)]);
}
function printSVG(big) {
  return S.doc(300, 300, [pawPrintAt(150, big ? 150 : 195, big ? 1.9 : 0.85)]);
}
function leafSVG() {
  return S.doc(300, 300, [
    S.pathShape('M 150 60 Q 236 130 216 214 Q 178 262 150 250 Q 122 262 84 214 Q 64 130 150 60 Z', 'leaf', { outlined: true }),
    S.stroke('M 150 78 L 150 244 M 150 130 Q 120 140 104 162 M 150 130 Q 180 140 196 162 M 150 180 Q 126 188 114 204 M 150 180 Q 174 188 186 204', 'leafDeep', 7),
  ]);
}

/* ------------------------------------------------ scene helpers */
function forestBase(golden) {
  const parts = [];
  if (golden) {
    parts.push(S.groundBand(0, 1600, 320, 'sky'));
    parts.push(S.groundBand(320, 1600, 150, 'skyPale'));
    parts.push(S.groundBand(470, 1600, 110, 'sunshine'));
  } else {
    parts.push(S.skyGradient('sky', 'skyPale', 1600, 600));
    parts.push(S.sun(1330, 150, 72));
    parts.push(S.cloud(560, 120, 0.95, 0.9));
  }
  /* far canopy + the hill (the big door's home) */
  parts.push(S.hill(300, 660, 560, 150, 'mint'));
  parts.push(S.hill(1250, 640, 700, 210, 'leaf'));
  parts.push(S.groundBand(680, 1600, 320, 'leaf'));
  parts.push(S.pathShape('M 0 1000 L 0 924 Q 500 880 940 918 Q 1300 948 1600 918 L 1600 1000 Z', 'sand'));
  /* the old oak: great trunk + roots, left */
  parts.push(S.pathShape('M 60 900 Q 60 560 100 320 L 120 190 Q 190 150 260 190 L 280 320 Q 320 560 320 900 Q 250 872 190 900 Q 120 872 60 900 Z', 'sandDeep', { outlined: true }));
  parts.push(S.stroke('M 150 820 Q 160 640 150 480 M 230 840 Q 220 660 230 500', 'outline', 7));
  parts.push(S.circle(190, 150, 150, 'leafDeep', { outlined: true }));
  parts.push(S.circle(60, 220, 96, 'leafDeeep' === 'x' ? 'leaf' : 'leafDeep'));
  parts.push(S.circle(330, 210, 100, 'leafDeep'));
  /* ferns */
  parts.push(S.grass(420, 830, 1.1, 'leafDeep'), S.grass(1180, 850, 0.95, 'leafDeep'));
  return parts.join('');
}

function sceneSVG(n) {
  const parts = [forestBase(n >= 8)];
  if (n === 1) {
    /* the promise: BOTH doors visible — tiny in the root, big on the hill */
    parts.push(tinyDoorAt(260, 880, 1.0, false));
    parts.push(bigDoorAt(1180, 560, 0.8, false));
    parts.push(S.sparkle(320, 760, 0.9, 'sunshine'), S.sparkle(1120, 430, 0.9, 'sunshine'));
  } else if (n === 2) {
    /* the welcome basket (choice cards overlay the center) */
    parts.push(tinyDoorAt(260, 880, 1.0, false));
    parts.push(bigDoorAt(1180, 560, 0.72, false));
    parts.push(`<g transform="translate(330 860)">${S.pathShape('M -90 0 Q 0 -34 90 0 L 74 44 Q 0 66 -74 44 Z', 'sandDeep', { outlined: true })}${S.stroke('M -64 8 Q 0 -18 64 8', 'creamDeep', 8)}</g>`);
  } else if (n === 3) {
    /* the tiny footprint trail painted under the trace (abs (450,340)→(1090,480)) */
    parts.push(tinyDoorAt(260, 880, 1.0, false));
    const pts = [[450, 340], [590, 400], [730, 370], [870, 440], [1010, 410], [1090, 480]];
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      for (let t = 0.25; t < 1; t += 0.35) {
        parts.push(pawPrintAt(ax + (bx - ax) * t, ay + (by - ay) * t + (i % 2 ? 6 : -6), 0.42));
      }
    }
  } else if (n === 4) {
    /* the crossing: scattered painted prints of both sizes (module renders the 3 targets) */
    parts.push(tinyDoorAt(260, 880, 1.0, false));
    parts.push(bigDoorAt(1180, 560, 0.72, false));
    parts.push(pawPrintAt(560, 760, 0.5), pawPrintAt(700, 800, 1.1), pawPrintAt(980, 770, 0.45));
  } else if (n === 5) {
    /* the knock: calm forest — the module's two frameless door options ARE the doors
       (v3 de-quiz: no duplicate painted pair competing with the tappable ones) */
    parts.push(S.grass(320, 800, 0.9, 'leafDeep'), S.grass(1240, 830, 0.85, 'leafDeep'));
    parts.push(S.stroke('M 1052 320 Q 1036 300 1042 278 M 1080 304 Q 1068 280 1076 256', 'outline', 8));
  } else if (n === 6) {
    /* delivery 1: the BIG door grounded on the hillside at the correct slot (abs 1120,440);
       the tiny door at the decoy slot (abs 860,640) */
    parts.push(bigDoorAt(1120, 560, 0.85, false));
    parts.push(tinyDoorAt(860, 760, 1.0, false));
  } else if (n === 7) {
    /* delivery 2 mirrored: the tiny door at the correct slot (abs 1120,620);
       the big door up-slope at the decoy (abs 840,390) */
    parts.push(bigDoorAt(840, 510, 0.72, false));
    parts.push(tinyDoorAt(1120, 740, 1.1, false));
  } else if (n === 8) {
    /* the reveal: BOTH DOORS OPEN + the badger (big) and the mouse (tiny) */
    parts.push(tinyDoorAt(300, 880, 1.1, true));
    parts.push(bigDoorAt(1150, 620, 0.85, true));
    parts.push(badgerAt(970, 640, 0.9));
    parts.push(mouseAt(420, 880, 1.1));
    parts.push(S.sparkle(560, 300, 1.1, 'sunshine'), S.sparkle(1330, 340, 1.0, 'sunshine'));
  } else {
    /* n === 9 — tea under the oak: stump table, big cup + tiny cup, everyone together */
    parts.push(tinyDoorAt(260, 880, 1.0, true));
    parts.push(`<g transform="translate(800 780)">${S.ellipse(0, 0, 190, 46, 'sandDeep', { outlined: true })}${S.rrect(-150, 0, 300, 90, 18, 'sandDeep', { outlined: true, sw: 7 })}${S.ellipse(0, 0, 150, 32, 'creamDeep')}</g>`);
    parts.push(`<g transform="translate(720 730)">${S.rrect(-44, -50, 88, 60, 12, 'bluebird', { outlined: true, sw: 6 })}${S.stroke('M 46 -36 Q 72 -30 50 -8', 'bluebird', 9)}</g>`);
    parts.push(`<g transform="translate(890 748)">${S.rrect(-18, -22, 36, 26, 6, 'coral', { outlined: true, sw: 4 })}${S.stroke('M 20 -16 Q 32 -13 22 -4', 'coral', 5)}</g>`);
    parts.push(badgerAt(1130, 800, 0.72));
    parts.push(mouseAt(560, 800, 1.0));
    parts.push(S.sparkle(420, 300, 1.2, 'sunshine'), S.sparkle(1240, 280, 1.0, 'sunshine'), S.sparkle(860, 220, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-the-tiny-door');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] hazel frames…');
  await S.standardPoseSet(path.join(tmp, 'hazel'), hazel.render, hazel.spec);
  const hOut = path.join(STORY_DIR, 'cast', 'hazel');
  (await packCharacter(path.join(tmp, 'hazel'), 'hazel', hOut)).forEach((f) => written.push(path.join(hOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 9; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(cookieSVG(true), path.join(P, 'cookie-big@2x.webp')));
  written.push(await S.renderWebp(cookieSVG(false), path.join(P, 'cookie-small@2x.webp')));
  written.push(await S.renderWebp(parcelSVG(true), path.join(P, 'parcel-big@2x.webp')));
  written.push(await S.renderWebp(parcelSVG(false), path.join(P, 'parcel-small@2x.webp')));
  written.push(await S.renderWebp(bigDoorSVG(), path.join(P, 'big-door@2x.webp')));
  written.push(await S.renderWebp(tinyDoorSVG(), path.join(P, 'tiny-door@2x.webp')));
  written.push(await S.renderWebp(printSVG(true), path.join(P, 'print-big@2x.webp')));
  written.push(await S.renderWebp(printSVG(false), path.join(P, 'print-tiny@2x.webp')));
  written.push(await S.renderWebp(leafSVG(), path.join(P, 'leaf@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
