#!/usr/bin/env node
/* =====================================================================
   hazels-treehouse-trail-art.js — FINAL art for library story #4 (wsv-1).

   Forest-trail world; Hazel's TREEHOUSE approaches across the story (the
   quest's running payoff): tiny on the horizon (p1) → arrival, festive
   with bunting + warm window glow + sparkles (p8).
   Props: 8 trail-sign cards (cream card + symbol), odd-one-out object
   pairs (mushroom/butterfly/lantern/flag in two colorways), 3 doors
   (differ by SHAPE, same wood — shape is the "same" cue).

   USAGE: node scripts/storybook/art/hazels-treehouse-trail-art.js
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
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'hazels-treehouse-trail');

/* ---------------------------------------------------------------- symbols (drawn centred ~ (150,150), radius ~90) */
const SYM = {
  sun: () => S.circle(150, 150, 66, 'sunshine', { outlined: true, sw: 8 }) +
    [0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
      const a = (d * Math.PI) / 180;
      return S.stroke(`M ${150 + Math.cos(a) * 84} ${150 + Math.sin(a) * 84} L ${150 + Math.cos(a) * 106} ${150 + Math.sin(a) * 106}`, 'sunshine', 12);
    }).join(''),
  moon: () => S.pathShape('M 190 62 A 92 92 0 1 0 190 238 A 72 72 0 1 1 190 62 Z', 'sunshine', { outlined: true, sw: 8 }),
  star: () => {
    let d = '';
    for (let k = 0; k < 5; k++) {
      const ao = (-90 + 72 * k) * Math.PI / 180, ai = (-90 + 72 * k + 36) * Math.PI / 180;
      const ox = 150 + Math.cos(ao) * 92, oy = 150 + Math.sin(ao) * 92;
      const ix = 150 + Math.cos(ai) * 42, iy = 150 + Math.sin(ai) * 42;
      if (k === 0) d = `M ${150 + Math.cos((-90 - 36) * Math.PI / 180) * 42} ${150 + Math.sin((-90 - 36) * Math.PI / 180) * 42}`;
      d += ` Q ${ox} ${oy} ${ix} ${iy}`;
    }
    return S.pathShape(d + ' Z', 'sunshine', { outlined: true, sw: 8 });
  },
  leaf: () => S.pathShape('M 150 58 C 226 96 232 190 150 244 C 68 190 74 96 150 58 Z', 'leaf', { outlined: true, sw: 8 }) +
    S.stroke('M 150 82 L 150 226 M 150 130 L 110 158 M 150 130 L 190 158 M 150 178 L 118 200 M 150 178 L 182 200', 'leafDeep', 8),
  flower: () => [0, 60, 120, 180, 240, 300].map((d) => {
    const a = (d * Math.PI) / 180;
    return S.ellipse(150 + Math.cos(a) * 52, 150 + Math.sin(a) * 52, 36, 25, 'coral', { outlined: true, sw: 6 });
  }).join('') + S.circle(150, 150, 34, 'sunshine', { outlined: true, sw: 7 }),
  acorn: () => S.pathShape('M 90 138 Q 150 96 210 138 Q 200 214 150 240 Q 100 214 90 138 Z', 'creamDeep', { outlined: true, sw: 8 }) +
    S.pathShape('M 78 140 Q 150 92 222 140 Q 216 108 150 92 Q 84 108 78 140 Z', 'sandDeep', { outlined: true, sw: 8 }) +
    S.stroke('M 150 92 Q 146 74 158 64', 'outline', 10),
  pinecone: () => S.ellipse(150, 160, 66, 90, 'sandDeep', { outlined: true, sw: 8 }) +
    S.stroke('M 96 128 Q 150 154 204 128 M 92 168 Q 150 194 208 168 M 104 208 Q 150 230 196 208', 'outline', 7, { alpha: 0.55 }) +
    S.stroke('M 150 66 Q 158 52 170 48', 'leafDeep', 10),
  berry: () => S.circle(132, 172, 52, 'berry', { outlined: true, sw: 8 }) + S.circle(190, 148, 40, 'berry', { outlined: true, sw: 8 }) +
    S.stroke('M 150 116 Q 158 84 176 72', 'leafDeep', 10) +
    S.pathShape('M 176 72 Q 210 62 224 84 Q 198 96 176 72 Z', 'leaf', { outlined: true, sw: 6 }),
};
function signSVG(symbol) {
  return S.doc(300, 320, [
    S.rrect(30, 26, 240, 268, 30, 'cream', { outlined: true }),
    S.rrect(46, 42, 208, 236, 20, 'skyPale', { alpha: 0.5 }),
    SYM[symbol](),
  ]);
}

/* ---------------------------------------------------------------- odd-one-out objects */
function mushroomSVG(capToken) {
  return S.doc(300, 300, [
    S.rrect(116, 150, 68, 108, 26, 'cream', { outlined: true }),
    S.pathShape('M 40 160 Q 46 62 150 58 Q 254 62 260 160 Q 206 178 150 178 Q 94 178 40 160 Z', capToken, { outlined: true }),
    S.circle(102, 112, 16, 'cream'), S.circle(168, 92, 13, 'cream'), S.circle(212, 130, 12, 'cream'),
  ]);
}
function butterflySVG(wingToken) {
  return S.doc(300, 300, [
    S.ellipse(96, 108, 56, 44, wingToken, { outlined: true, sw: 8 }),
    S.ellipse(204, 108, 56, 44, wingToken, { outlined: true, sw: 8 }),
    S.ellipse(106, 186, 46, 38, wingToken, { outlined: true, sw: 8 }),
    S.ellipse(194, 186, 46, 38, wingToken, { outlined: true, sw: 8 }),
    S.circle(112, 96, 12, 'cream'), S.circle(188, 96, 12, 'cream'),
    S.rrect(136, 84, 28, 140, 14, 'inkSoft'),
    S.stroke('M 142 84 Q 124 52 110 44 M 158 84 Q 176 52 190 44', 'inkSoft', 8),
  ]);
}
function lanternSVG(bodyToken) {
  return S.doc(300, 320, [
    S.stroke('M 150 34 Q 150 20 150 14', 'outline', 10),
    S.rrect(118, 30, 64, 22, 8, 'sandDeep', { outlined: true, sw: 7 }),
    S.rrect(84, 52, 132, 180, 40, bodyToken, { outlined: true }),
    S.ellipse(150, 140, 38, 52, 'cream', { alpha: 0.75 }),
    S.rrect(104, 232, 92, 22, 10, 'sandDeep', { outlined: true, sw: 7 }),
  ]);
}
function flagSVG(clothToken) {
  return S.doc(300, 300, [
    S.stroke('M 60 60 L 240 60', 'outline', 12),
    S.pathShape('M 78 66 L 222 66 L 150 250 Z', clothToken, { outlined: true }),
    S.circle(150, 120, 22, 'cream', { alpha: 0.85 }),
  ]);
}
/* doors differ by SHAPE only (same wood palette — shape is the cue) */
function doorSVG(shape) {
  const frame = { outlined: true };
  const planks = S.stroke('M 110 96 L 110 268 M 150 76 L 150 268 M 190 96 L 190 268', 'sandDeep', 7, { alpha: 0.7 });
  const knob = S.circle(196, 190, 12, 'sunshine', { outlined: true, sw: 6 });
  let body;
  if (shape === 'round') body = S.pathShape('M 70 268 L 70 160 A 80 80 0 0 1 230 160 L 230 268 Z', 'creamDeep', frame);
  else if (shape === 'arch') body = S.pathShape('M 82 268 L 82 120 Q 150 40 218 120 L 218 268 Z', 'creamDeep', frame);
  else body = S.rrect(74, 88, 152, 180, 10, 'creamDeep', frame);
  return S.doc(300, 300, [body, planks, knob]);
}

/* ---------------------------------------------------------------- the treehouse (in-scene; grows across pages) */
function treehouse(x, y, s, festive) {
  const parts = [];
  parts.push(S.stroke(`M ${x} ${y} L ${x} ${y - 210 * s}`, 'outline', 60 * s));
  parts.push(S.stroke(`M ${x} ${y} L ${x} ${y - 210 * s}`, 'sandDeep', 42 * s));
  parts.push(S.circle(x, y - 300 * s, 130 * s, 'leafDeep', { outlined: true, sw: 8 * s }));
  parts.push(S.circle(x - 100 * s, y - 250 * s, 74 * s, 'leafDeep'));
  parts.push(S.circle(x + 100 * s, y - 255 * s, 78 * s, 'leafDeep'));
  /* the house on the trunk */
  parts.push(S.rrect(x - 86 * s, y - 205 * s, 172 * s, 120 * s, 12 * s, 'cream', { outlined: true, sw: 8 * s }));
  parts.push(S.pathShape(`M ${x - 104 * s} ${y - 200 * s} L ${x} ${y - 262 * s} L ${x + 104 * s} ${y - 200 * s} Z`, 'coral', { outlined: true, sw: 8 * s }));
  /* round door + window */
  parts.push(S.pathShape(`M ${x - 58 * s} ${y - 85 * s} L ${x - 58 * s} ${y - 130 * s} A ${29 * s} ${29 * s} 0 0 1 ${x} ${y - 130 * s} L ${x} ${y - 85 * s} Z`, 'creamDeep', { outlined: true, sw: 6 * s }));
  parts.push(S.circle(x + 44 * s, y - 148 * s, 22 * s, festive ? 'sunshine' : 'skyPale', { outlined: true, sw: 6 * s }));
  if (festive) {
    parts.push(S.stroke(`M ${x - 120 * s} ${y - 226 * s} Q ${x} ${y - 190 * s} ${x + 120 * s} ${y - 226 * s}`, 'outline', 5 * s));
    const cols = ['coral', 'sunshine', 'teal', 'berry', 'bluebird'];
    for (let i = 0; i < 5; i++) {
      const t = (i + 0.5) / 5;
      const bx = x - 120 * s + 240 * s * t;
      const by = y - 226 * s + Math.sin(Math.PI * t) * 34 * s;
      parts.push(S.pathShape(`M ${bx - 12 * s} ${by} L ${bx + 12 * s} ${by} L ${bx} ${by + 24 * s} Z`, cols[i], { outlined: true, sw: 4 * s }));
    }
  }
  return parts.join('');
}
function pineTree(x, baseY, s) {
  return (
    S.stroke(`M ${x} ${baseY} L ${x} ${baseY - 60 * s}`, 'outline', 20 * s) +
    S.stroke(`M ${x} ${baseY} L ${x} ${baseY - 60 * s}`, 'sandDeep', 11 * s) +
    S.pathShape(`M ${x - 78 * s} ${baseY - 50 * s} L ${x} ${baseY - 150 * s} L ${x + 78 * s} ${baseY - 50 * s} Z`, 'leafDeep', { outlined: true, sw: 6 * s }) +
    S.pathShape(`M ${x - 60 * s} ${baseY - 120 * s} L ${x} ${baseY - 205 * s} L ${x + 60 * s} ${baseY - 120 * s} Z`, 'leafDeep', { outlined: true, sw: 6 * s })
  );
}

/* ---------------------------------------------------------------- scenes */
function sceneSVG(n) {
  const t = (n - 1) / 7;                       /* 0 → 1 across the story */
  const finale = n === 8;
  /* the treehouse approaches: far-right horizon → near, larger, lower */
  const thX = 1290 - t * 120, thY = 700 + t * 200, thS = 0.34 + t * 0.85;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 640),
    S.sun(300 + (n - 1) * 105, 142, 80),
    S.cloud(560 + ((n * 77) % 220), 116 + ((n * 43) % 52), 1.0, 0.9),
    S.cloud(1130 - ((n * 61) % 190), 200 + ((n * 37) % 40), 0.75, 0.8),
    S.hill(340, 580, 560, 135, 'mint'),
    S.hill(1300, 590, 580, 150, 'mint'),
    S.groundBand(640, 1600, 360, 'leaf'),
    S.pathShape('M 0 1000 L 0 880 Q 470 828 900 872 Q 1290 912 1600 880 L 1600 1000 Z', 'leafDeep', { alpha: 0.22 }),
    /* the winding trail toward the treehouse */
    S.pathShape(`M 620 1000 Q 700 880 ${thX - 130} ${Math.min(thY + 60, 960)} Q ${thX + 40} ${Math.min(thY + 30, 930)} ${thX} ${thY - 4} L ${thX + 60} ${thY - 4} Q ${thX + 130} ${Math.min(thY + 60, 950)} 1060 1000 Z`, 'sand'),
    /* treehouse (the approaching payoff) */
    treehouse(thX, thY, thS, finale),
    /* forest frame */
    pineTree(96, 760, 1.15),
    pineTree(210, 700, 0.8),
    pineTree(1512, 730, 1.0),
    S.grass(300, 800, 0.9, 'leafDeep'),
    S.grass(1400, 836, 0.9, 'leafDeep'),
    S.circle(350, 756, 12, 'coral', { outlined: true, sw: 5 }),
    S.circle(1330, 782, 11, 'berry', { outlined: true, sw: 5 }),
  ];
  if (finale) {
    parts.push(S.sparkle(600, 250, 1.2, 'sunshine'), S.sparkle(1040, 210, 1.0, 'sunshine'), S.sparkle(830, 320, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ---------------------------------------------------------------- run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-hazels-treehouse-trail');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] hazel frames…');
  await S.standardPoseSet(path.join(tmp, 'hazel'), hazel.render, hazel.spec);
  const hzOut = path.join(STORY_DIR, 'cast', 'hazel');
  (await packCharacter(path.join(tmp, 'hazel'), 'hazel', hzOut)).forEach((f) => written.push(path.join(hzOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  for (const sym of Object.keys(SYM)) written.push(await S.renderWebp(signSVG(sym), path.join(P, `sign-${sym}@2x.webp`)));
  written.push(await S.renderWebp(mushroomSVG('coral'), path.join(P, 'mushroom-red@2x.webp')));
  written.push(await S.renderWebp(mushroomSVG('teal'), path.join(P, 'mushroom-teal@2x.webp')));
  written.push(await S.renderWebp(butterflySVG('bluebird'), path.join(P, 'butterfly-blue@2x.webp')));
  written.push(await S.renderWebp(butterflySVG('orange'), path.join(P, 'butterfly-orange@2x.webp')));
  written.push(await S.renderWebp(lanternSVG('sunshine'), path.join(P, 'lantern-yellow@2x.webp')));
  written.push(await S.renderWebp(lanternSVG('berry'), path.join(P, 'lantern-berry@2x.webp')));
  written.push(await S.renderWebp(flagSVG('teal'), path.join(P, 'flag-teal@2x.webp')));
  written.push(await S.renderWebp(flagSVG('coral'), path.join(P, 'flag-coral@2x.webp')));
  written.push(await S.renderWebp(doorSVG('round'), path.join(P, 'door-round@2x.webp')));
  written.push(await S.renderWebp(doorSVG('arch'), path.join(P, 'door-arch@2x.webp')));
  written.push(await S.renderWebp(doorSVG('square'), path.join(P, 'door-square@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
