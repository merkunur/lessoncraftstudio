#!/usr/bin/env node
/* =====================================================================
   poppys-market-day-art.js — FINAL art for library story #14 (wsv-1).

   Poppy's FIRST recurrence: market day in her vegetable garden (picket
   fence + soil beds per cast-bible continuity). The market stand stocks
   up page by page (running payoff): empty frame → crates arrive →
   sorted rows → the full bunting-decked stand.
   Every size pair scales BOTH dimensions uniformly (vs #13's height-
   only): big fills the shared 300-canvas, small sits ~55% centered-low
   (size survives card/object scaling only INSIDE one canvas).
   Paint-at-data-coords:
     s2 big crate at abs slot (1120,660) + small basket at (840,460)
     s3 four crates at the color-code region rects abs
        B(130,410,380,410) S(530,550,265,270) B(815,410,380,410)
        S(1200,550,265,270)
     s5 small basket at (1120,680) + big crate at (840,460)
     s8 BIG produce at the dot-stamp points abs (450,400)(750,340)
        (1000,540)(1180,360); smalls painted ≥230du from every dot
        (taps snap within 220 — a closer small would stamp its
        neighbor's dot and read as wrong-accepted).

   USAGE: node scripts/storybook/art/poppys-market-day-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const poppy = require('./characters/poppy.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'poppys-market-day');

/* ------------------------------------------------ size-pair prop builders
   (draw(cx, cy, s) primitives reused for both the prop pair AND in-scene paint) */
function cabbageAt(cx, cy, s) {
  return [
    S.circle(cx, cy, 100 * s, 'leaf', { outlined: true }),
    S.pathShape(`M ${cx - 88 * s} ${cy - 20 * s} Q ${cx - 30 * s} ${cy - 96 * s} ${cx + 40 * s} ${cy - 66 * s} Q ${cx - 20 * s} ${cy - 40 * s} ${cx - 88 * s} ${cy - 20 * s} Z`, 'leafDeep', { alpha: 0.55 }),
    S.stroke(`M ${cx - 54 * s} ${cy + 40 * s} Q ${cx} ${cy + 66 * s} ${cx + 54 * s} ${cy + 40 * s}`, 'leafDeep', 8 * s),
    S.stroke(`M ${cx - 20 * s} ${cy - 30 * s} Q ${cx + 16 * s} ${cy - 6 * s} ${cx - 4 * s} ${cy + 34 * s}`, 'mint', 10 * s),
    S.stroke(`M ${cx + 34 * s} ${cy - 14 * s} Q ${cx + 44 * s} ${cy + 16 * s} ${cx + 26 * s} ${cy + 40 * s}`, 'mint', 8 * s),
  ].join('');
}
function plumAt(cx, cy, s) {
  return [
    S.ellipse(cx, cy, 78 * s, 88 * s, 'berry', { outlined: true }),
    S.stroke(`M ${cx} ${cy - 84 * s} Q ${cx + 8 * s} ${cy - 110 * s} ${cx + 22 * s} ${cy - 118 * s}`, 'leafDeep', 10 * s),
    S.ellipse(cx + 44 * s, cy - 108 * s, 26 * s, 14 * s, 'leaf', { outlined: true, sw: 5 * s }),
    S.stroke(`M ${cx - 34 * s} ${cy - 40 * s} Q ${cx - 48 * s} ${cy} ${cx - 34 * s} ${cy + 40 * s}`, 'white', 7 * s),
  ].join('');
}
function jarAt(cx, cy, s) {
  return [
    S.rrect(cx - 62 * s, cy - 90 * s, 124 * s, 34 * s, 12 * s, 'sandDeep', { outlined: true, sw: 6 * s }),
    S.rrect(cx - 78 * s, cy - 58 * s, 156 * s, 148 * s, 26 * s, 'sunshine', { outlined: true }),
    S.rrect(cx - 54 * s, cy - 34 * s, 108 * s, 100 * s, 18 * s, 'orangeDeep', { alpha: 0.35 }),
    S.stroke(`M ${cx - 52 * s} ${cy - 44 * s} Q ${cx - 40 * s} ${cy - 54 * s} ${cx - 24 * s} ${cy - 56 * s}`, 'white', 6 * s),
  ].join('');
}
function watermelonAt(cx, cy, s) {
  const stripes = [];
  for (let k = -2; k <= 2; k++) {
    stripes.push(S.pathShape(`M ${cx + k * 34 * s - 10 * s} ${cy - 92 * s} Q ${cx + k * 40 * s} ${cy} ${cx + k * 34 * s - 10 * s} ${cy + 92 * s} Q ${cx + k * 34 * s + 10 * s} ${cy} ${cx + k * 34 * s - 10 * s} ${cy - 92 * s} Z`, 'leafDeep', { alpha: 0.7 }));
  }
  return [
    S.circle(cx, cy, 96 * s, 'leaf', { outlined: true }),
    stripes.join(''),
    S.stroke(`M ${cx} ${cy - 94 * s} Q ${cx + 10 * s} ${cy - 112 * s} ${cx + 22 * s} ${cy - 116 * s}`, 'outline', 8 * s),
  ].join('');
}
function pearAt(cx, cy, s) {
  return [
    S.pathShape(`M ${cx} ${cy - 96 * s} Q ${cx + 34 * s} ${cy - 66 * s} ${cx + 52 * s} ${cy - 10 * s} Q ${cx + 70 * s} ${cy + 66 * s} ${cx} ${cy + 84 * s} Q ${cx - 70 * s} ${cy + 66 * s} ${cx - 52 * s} ${cy - 10 * s} Q ${cx - 34 * s} ${cy - 66 * s} ${cx} ${cy - 96 * s} Z`, 'mint', { outlined: true }),
    S.stroke(`M ${cx} ${cy - 94 * s} L ${cx + 6 * s} ${cy - 122 * s}`, 'leafDeep', 9 * s),
    S.ellipse(cx + 30 * s, cy - 116 * s, 26 * s, 13 * s, 'leaf', { outlined: true, sw: 5 * s }),
    S.stroke(`M ${cx - 30 * s} ${cy - 20 * s} Q ${cx - 40 * s} ${cy + 20 * s} ${cx - 28 * s} ${cy + 52 * s}`, 'white', 6 * s),
  ].join('');
}
function beeAt(cx, cy, s) {
  return [
    S.ellipse(cx - 30 * s, cy - 52 * s, 34 * s, 22 * s, 'skyPale', { outlined: true, sw: 5 * s, alpha: 0.95 }),
    S.ellipse(cx + 30 * s, cy - 52 * s, 34 * s, 22 * s, 'skyPale', { outlined: true, sw: 5 * s, alpha: 0.95 }),
    S.ellipse(cx, cy, 64 * s, 46 * s, 'sunshine', { outlined: true }),
    S.pathShape(`M ${cx - 20 * s} ${cy - 44 * s} Q ${cx - 10 * s} ${cy} ${cx - 20 * s} ${cy + 44 * s} L ${cx - 42 * s} ${cy + 34 * s} Q ${cx - 48 * s} ${cy} ${cx - 42 * s} ${cy - 34 * s} Z`, 'outline'),
    S.pathShape(`M ${cx + 16 * s} ${cy - 45 * s} Q ${cx + 26 * s} ${cy} ${cx + 16 * s} ${cy + 45 * s} L ${cx + 38 * s} ${cy + 36 * s} Q ${cx + 44 * s} ${cy} ${cx + 38 * s} ${cy - 36 * s} Z`, 'outline'),
    S.eyeDot(cx + 52 * s, cy - 10 * s, 6 * s),
  ].join('');
}

/* big fills the shared canvas; small sits ~55%, centered-low (same design) */
function pairSVG(drawAt, big) {
  const s = big ? 1.0 : 0.55;
  const cy = big ? 150 : 195;
  return S.doc(300, 300, [drawAt(150, cy, s)]);
}

/* ------------------------------------------------ scene furniture */
function crate(cx, bottomY, w, h) {
  const x = cx - w / 2, y = bottomY - h;
  return [
    S.rrect(x, y, w, h, 14, 'sandDeep', { outlined: true }),
    S.rrect(x + 18, y + 18, w - 36, h - 36, 8, 'creamDeep'),
    S.stroke(`M ${x + 18} ${y + h * 0.42} L ${x + w - 18} ${y + h * 0.42} M ${x + 18} ${y + h * 0.7} L ${x + w - 18} ${y + h * 0.7}`, 'sandDeep', 9),
  ].join('');
}
function basket(cx, bottomY, w, h) {
  const x = cx - w / 2, y = bottomY - h;
  return [
    S.pathShape(`M ${x} ${y + 14} Q ${cx} ${y - 18} ${x + w} ${y + 14} L ${x + w - 20} ${bottomY} Q ${cx} ${bottomY + 12} ${x + 20} ${bottomY} Z`, 'sandDeep', { outlined: true }),
    S.stroke(`M ${x + 14} ${y + h * 0.45} Q ${cx} ${y + h * 0.6} ${x + w - 14} ${y + h * 0.45}`, 'creamDeep', 9),
    S.stroke(`M ${x + 8} ${y + 16} Q ${cx} ${y - 12} ${x + w - 8} ${y + 16}`, 'creamDeep', 8),
  ].join('');
}
function picketFence(y) {
  const parts = [S.stroke(`M 0 ${y + 40} L 1600 ${y + 40} M 0 ${y + 88} L 1600 ${y + 88}`, 'creamDeep', 12)];
  for (let x = 40; x < 1600; x += 110) {
    parts.push(S.rrect(x, y, 34, 130, 8, 'cream', { outlined: true, sw: 5 }));
    parts.push(S.pathShape(`M ${x} ${y} Q ${x + 17} ${y - 22} ${x + 34} ${y} Z`, 'cream', { outlined: true, sw: 5 }));
  }
  return parts.join('');
}
function soilBed(cx, y, w) {
  return S.rrect(cx - w / 2, y, w, 56, 20, 'sandDeep', { alpha: 0.85 }) +
    S.grass(cx - w / 2 + 40, y + 6, 0.6, 'leafDeep') + S.grass(cx + w / 2 - 46, y + 10, 0.55, 'leafDeep');
}
function standFrame(cx, groundY, withAwning, withBunting) {
  /* coherent market stand: legs → counter (top groundY-230) → cream skirt →
     back wall → upper display shelf (top groundY-434) → scalloped awning
     (groundY-770..-620). Produce rows sit ON the shelf/counter planks. */
  const parts = [];
  if (withAwning) {
    parts.push(S.rrect(cx - 470, groundY - 700, 36, 480, 10, 'sandDeep', { outlined: true, sw: 7 }));
    parts.push(S.rrect(cx + 434, groundY - 700, 36, 480, 10, 'sandDeep', { outlined: true, sw: 7 }));
    parts.push(S.rrect(cx - 500, groundY - 600, 1000, 320, 18, 'cream', { outlined: true }));
    parts.push(S.rrect(cx - 470, groundY - 458, 940, 26, 8, 'sandDeep', { outlined: true, sw: 6 }));
    parts.push(S.rrect(cx - 520, groundY - 770, 1040, 90, 18, 'coral', { outlined: true }));
    for (let k = 0; k < 6; k++) {
      const ax = cx - 520 + k * 174;
      parts.push(S.pathShape(`M ${ax} ${groundY - 684} L ${ax + 174} ${groundY - 684} L ${ax + 174} ${groundY - 660} Q ${ax + 87} ${groundY - 616} ${ax} ${groundY - 660} Z`, k % 2 ? 'cream' : 'coral', { outlined: true, sw: 6 }));
    }
  }
  parts.push(S.rrect(cx - 430, groundY - 186, 44, 186, 10, 'sandDeep', { outlined: true, sw: 7 }));
  parts.push(S.rrect(cx + 386, groundY - 186, 44, 186, 10, 'sandDeep', { outlined: true, sw: 7 }));
  parts.push(S.rrect(cx - 490, groundY - 156, 980, 120, 14, 'creamDeep', { outlined: true, sw: 7 }));
  parts.push(S.rrect(cx - 510, groundY - 230, 1020, 46, 14, 'sandDeep', { outlined: true }));
  if (withBunting) {
    for (let k = 0; k < 7; k++) {
      const bx = cx - 448 + k * 132;
      parts.push(S.pathShape(`M ${bx} ${groundY - 184} L ${bx + 66} ${groundY - 184} L ${bx + 33} ${groundY - 122} Z`, ['sunshine', 'coral', 'bluebird'][k % 3], { outlined: true, sw: 5 }));
    }
  }
  return parts.join('');
}

/* ------------------------------------------------ scenes */
function gardenBase(n) {
  return [
    S.skyGradient('sky', 'skyPale', 1600, 600),
    S.sun(230 + (n % 3) * 60, 140, 76),
    S.cloud(560 + ((n * 77) % 240), 110 + ((n * 41) % 55), 1.0, 0.9),
    S.cloud(1160 - ((n * 51) % 190), 200 + ((n * 33) % 40), 0.75, 0.8),
    S.hill(300, 590, 540, 130, 'mint'),
    S.hill(1330, 595, 560, 140, 'mint'),
    S.groundBand(640, 1600, 360, 'leaf'),
    picketFence(520),
    S.pathShape('M 0 960 Q 480 900 920 936 Q 1280 964 1600 934 L 1600 1000 L 0 1000 Z', 'sand'),
  ].join('');
}
function sceneSVG(n) {
  const parts = [gardenBase(n)];
  if (n === 1) {
    /* market morning: the empty stand frame right, harvest pile left */
    parts.push(soilBed(300, 700, 420));
    parts.push(standFrame(1150, 900, false, false));
    parts.push(cabbageAt(330, 810, 0.55), watermelonAt(430, 830, 0.5));
  } else if (n === 2) {
    /* big crate (slot 1120,660) + small basket (slot 840,460) */
    parts.push(soilBed(260, 690, 340));
    parts.push(crate(1120, 850, 340, 220));
    parts.push(basket(840, 610, 200, 120));
  } else if (n === 3) {
    /* three crates at the EXACT color-code region rects (B S B, bottoms 810) */
    parts.push(crate(465, 810, 310, 420));
    parts.push(crate(778, 810, 265, 280));
    parts.push(crate(1090, 810, 310, 420));
  } else if (n === 4) {
    /* the orchard corner (find-object renders the pears + bee itself) */
    parts.push(soilBed(320, 700, 400));
    parts.push(`<g>${S.stroke('M 1440 700 L 1440 560', 'outline', 24)}${S.stroke('M 1440 700 L 1440 560', 'sandDeep', 13)}${S.circle(1440, 500, 86, 'leafDeep', { outlined: true, sw: 7 })}</g>`);
    parts.push(S.grass(220, 800, 0.9, 'leafDeep'));
  } else if (n === 5) {
    /* small basket (slot 1120,680) + big crate (slot 840,460) */
    parts.push(soilBed(260, 690, 340));
    parts.push(basket(1120, 830, 210, 130));
    parts.push(crate(840, 880, 330, 380));
  } else if (n === 6) {
    /* the pantry shelf wall behind the listen cards — calm */
    parts.push(S.rrect(220, 300, 1160, 420, 20, 'cream', { outlined: true }));
    parts.push(S.stroke('M 260 440 L 1340 440 M 260 580 L 1340 580', 'sandDeep', 10));
    parts.push(S.grass(160, 800, 0.85, 'leafDeep'));
  } else if (n === 7) {
    /* the stand nearly ready (awning up), choice cards overlay */
    parts.push(standFrame(800, 900, true, false));
    parts.push(S.grass(220, 830, 0.9, 'leafDeep'), S.grass(1370, 850, 0.85, 'leafDeep'));
  } else {
    /* n === 8 — MARKET DAY: the full stand; BIG produce sits ON the shelf/counter
       planks at the dot points; smalls painted ≥230du from every dot */
    parts.push(standFrame(800, 920, true, true));
    /* upper shelf row (shelf top abs 462): three BIG at dots (450,400)(750,400)(1050,400) */
    parts.push(cabbageAt(450, 400, 0.82));
    parts.push(pearAt(750, 402, 0.78));
    parts.push(plumAt(1050, 404, 0.8));
    /* counter row (counter top abs 690): one BIG at dot (600,610) + smalls between */
    parts.push(watermelonAt(600, 610, 0.88));
    parts.push(cabbageAt(320, 652, 0.4), pearAt(880, 648, 0.4), plumAt(1150, 654, 0.4));
    parts.push(S.sparkle(240, 220, 1.2, 'sunshine'), S.sparkle(1380, 250, 1.0, 'sunshine'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-poppys-market-day');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] poppy frames…');
  await S.standardPoseSet(path.join(tmp, 'poppy'), poppy.render, poppy.spec);
  const pOut = path.join(STORY_DIR, 'cast', 'poppy');
  (await packCharacter(path.join(tmp, 'poppy'), 'poppy', pOut)).forEach((f) => written.push(path.join(pOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(pairSVG(cabbageAt, true), path.join(P, 'cabbage-big@2x.webp')));
  written.push(await S.renderWebp(pairSVG(cabbageAt, false), path.join(P, 'cabbage-small@2x.webp')));
  written.push(await S.renderWebp(pairSVG(plumAt, false), path.join(P, 'plum@2x.webp')));
  written.push(await S.renderWebp(pairSVG(jarAt, true), path.join(P, 'jar-big@2x.webp')));
  written.push(await S.renderWebp(pairSVG(jarAt, false), path.join(P, 'jar-small@2x.webp')));
  written.push(await S.renderWebp(pairSVG(watermelonAt, true), path.join(P, 'watermelon-big@2x.webp')));
  written.push(await S.renderWebp(pairSVG(watermelonAt, false), path.join(P, 'watermelon-small@2x.webp')));
  written.push(await S.renderWebp(pairSVG(pearAt, true), path.join(P, 'pear-big@2x.webp')));
  written.push(await S.renderWebp(pairSVG(pearAt, false), path.join(P, 'pear-small@2x.webp')));
  written.push(await S.renderWebp(pairSVG(beeAt, true), path.join(P, 'bee@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
