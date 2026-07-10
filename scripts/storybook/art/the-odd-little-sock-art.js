#!/usr/bin/env node
/* =====================================================================
   the-odd-little-sock-art.js — FINAL art for true storybook #4 (wsv-1):
   "The Odd Little Sock" (PK same vs. different), built to the ratified
   five-little-ducklings bar.

   Milo's snowy hill: the WASHING LINE is the story's visual spine —
   full of pairs (s1, mid-gust) → refilling beat by beat (s3, s4 bg) →
   full again with one trickster mismatch (s7) → worn on the Warm
   Winter Walk (s8) → good-night (s9). The little SNOWBIRD (scene-
   painted creature) owns the birdhouse; her twin yellow sock is the
   story's heart. Paint-at-data-coords: s2 drift mounds under the two
   mitten candidates + the REFERENCE mitten by Milo; s3 the twin hat
   beside the correct slot (abs 1120,420) + the scarf by the decoy
   (840,640); s6 the birdhouse at the nest slot (abs 1120,400, sock
   visible) + the basket at the decoy (860,640); s7 the PARTNERS
   painted beside the module targets (striped partner next to the
   dots-sock target = the mismatch; red twin next to the mitten
   target = the matching pair). No scene paint duplicates module-
   rendered objects (s5 has NO painted birdhouse/sled).

   USAGE: node scripts/storybook/art/the-odd-little-sock-art.js
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
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'the-odd-little-sock');

/* ------------------------------------------------ garment draws (shared by props + scene paint) */
function mittenAt(x, y, s, main, cuff, snowflake) {
  const parts = [
    S.pathShape(`M ${x - 62 * s} ${y + 50 * s} L ${x - 58 * s} ${y - 40 * s} Q ${x - 54 * s} ${y - 92 * s} ${x} ${y - 92 * s} Q ${x + 54 * s} ${y - 92 * s} ${x + 58 * s} ${y - 30 * s} L ${x + 60 * s} ${y + 10 * s} Q ${x + 92 * s} ${y - 6 * s} ${x + 96 * s} ${y + 26 * s} Q ${x + 84 * s} ${y + 44 * s} ${x + 58 * s} ${y + 44 * s} L ${x + 58 * s} ${y + 50 * s} Z`, main, { outlined: true, sw: 6 * s }),
    S.rrect(x - 66 * s, y + 44 * s, 128 * s, 34 * s, 10 * s, cuff, { outlined: true, sw: 5 * s }),
  ];
  if (snowflake) {
    parts.push(S.sparkle(x - 2 * s, y - 26 * s, 1.1 * s, 'white'));
  }
  return parts.join('');
}
function hatAt(x, y, s) {
  return [
    S.pathShape(`M ${x - 70 * s} ${y + 40 * s} Q ${x - 66 * s} ${y - 60 * s} ${x} ${y - 66 * s} Q ${x + 66 * s} ${y - 60 * s} ${x + 70 * s} ${y + 40 * s} Z`, 'teal', { outlined: true, sw: 6 * s }),
    S.rrect(x - 76 * s, y + 34 * s, 152 * s, 30 * s, 12 * s, 'cream', { outlined: true, sw: 5 * s }),
    S.circle(x, y - 72 * s, 16 * s, 'coral', { outlined: true, sw: 5 * s }),
  ].join('');
}
function sockAt(x, y, s, main, pattern) {
  const parts = [
    S.pathShape(`M ${x - 34 * s} ${y - 78 * s} L ${x + 30 * s} ${y - 78 * s} L ${x + 30 * s} ${y + 10 * s} Q ${x + 30 * s} ${y + 52 * s} ${x - 8 * s} ${y + 56 * s} Q ${x - 52 * s} ${y + 58 * s} ${x - 56 * s} ${y + 26 * s} Q ${x - 58 * s} ${y + 2 * s} ${x - 34 * s} ${y - 4 * s} Z`, main, { outlined: true, sw: 6 * s }),
    S.rrect(x - 40 * s, y - 86 * s, 76 * s, 24 * s, 8 * s, 'cream', { outlined: true, sw: 5 * s }),
  ];
  if (pattern === 'stripes') {
    parts.push(S.stroke(`M ${x - 34 * s} ${y - 44 * s} L ${x + 30 * s} ${y - 44 * s} M ${x - 34 * s} ${y - 16 * s} L ${x + 30 * s} ${y - 16 * s}`, 'bluebird', 10 * s));
  } else if (pattern === 'dots') {
    parts.push(S.circle(x - 8 * s, y - 44 * s, 9 * s, 'coral'), S.circle(x + 12 * s, y - 20 * s, 9 * s, 'coral'), S.circle(x - 16 * s, y + 8 * s, 9 * s, 'coral'));
  }
  return parts.join('');
}
function snowbirdAt(x, y, s, socks) {
  const parts = [
    S.ellipse(x, y - 26 * s, 34 * s, 30 * s, 'cream', { outlined: true, sw: 5 * s }),
    S.circle(x - 4 * s, y - 58 * s, 20 * s, 'cream', { outlined: true, sw: 5 * s }),
    S.pathShape(`M ${x + 22 * s} ${y - 30 * s} Q ${x + 44 * s} ${y - 36 * s} ${x + 46 * s} ${y - 16 * s} Q ${x + 32 * s} ${y - 10 * s} ${x + 18 * s} ${y - 18 * s} Z`, 'bluebird', { outlined: true, sw: 4 * s }),
    S.pathShape(`M ${x - 22 * s} ${y - 60 * s} L ${x - 34 * s} ${y - 54 * s} L ${x - 22 * s} ${y - 50 * s} Z`, 'sunshine', { outlined: true, sw: 3 * s }),
    S.eyeDot(x - 12 * s, y - 60 * s, 3.6 * s),
  ];
  if (socks) {
    parts.push(S.rrect(x - 16 * s, y + 0 * s, 12 * s, 16 * s, 4 * s, 'sunshine', { outlined: true, sw: 3 * s }));
    parts.push(S.rrect(x + 4 * s, y + 0 * s, 12 * s, 16 * s, 4 * s, 'sunshine', { outlined: true, sw: 3 * s }));
  } else {
    parts.push(S.stroke(`M ${x - 10 * s} ${y + 4 * s} L ${x - 10 * s} ${y + 12 * s} M ${x + 8 * s} ${y + 4 * s} L ${x + 8 * s} ${y + 12 * s}`, 'sunshine', 4 * s));
  }
  return parts.join('');
}
function birdhouseAt(x, y, s, withBird, withSock) {
  /* (x,y) = the round doorway center */
  const parts = [
    S.rrect(x - 74 * s, y - 64 * s, 148 * s, 150 * s, 16 * s, 'sandDeep', { outlined: true }),
    S.pathShape(`M ${x - 90 * s} ${y - 56 * s} L ${x} ${y - 118 * s} L ${x + 90 * s} ${y - 56 * s} Z`, 'coral', { outlined: true }),
    S.circle(x, y, 34 * s, 'outline', { alpha: 0.9 }),
  ];
  if (withSock) parts.push(sockAt(x + 40 * s, y + 52 * s, 0.5 * s, 'sunshine', null));
  if (withBird) parts.push(snowbirdAt(x, y + 12 * s, 0.9 * s, false));
  return parts.join('');
}
function sledAt(x, y, s) {
  return [
    S.rrect(x - 90 * s, y - 40 * s, 180 * s, 30 * s, 12 * s, 'coral', { outlined: true, sw: 6 * s }),
    S.stroke(`M ${x - 96 * s} ${y + 10 * s} Q ${x - 110 * s} ${y - 10 * s} ${x - 92 * s} ${y - 24 * s} M ${x - 96 * s} ${y + 10 * s} L ${x + 96 * s} ${y + 10 * s} Q ${x + 116 * s} ${y - 2 * s} ${x + 102 * s} ${y - 18 * s}`, 'outline', 7 * s),
    S.stroke(`M ${x - 60 * s} ${y - 38 * s} L ${x - 60 * s} ${y + 8 * s} M ${x + 50 * s} ${y - 38 * s} L ${x + 50 * s} ${y + 8 * s}`, 'sandDeep', 8 * s),
  ].join('');
}

/* ------------------------------------------------ props (module-rendered story objects) */
function propDoc(inner) { return S.doc(300, 300, [inner]); }
function mittenRedSVG() { return propDoc(mittenAt(140, 150, 1.5, 'coral', 'cream', true)); }
function mittenBlueSVG() { return propDoc(mittenAt(140, 150, 1.5, 'bluebird', 'night', false)); }
function hatSVG() { return propDoc(hatAt(150, 160, 1.5)); }
function sockStripedSVG() { return propDoc(sockAt(155, 155, 1.6, 'cream', 'stripes')); }
function sockDotsSVG() { return propDoc(sockAt(155, 155, 1.6, 'cream', 'dots')); }
function sockGreenSVG() { return propDoc(sockAt(155, 155, 1.6, 'leaf', null)); }
function sockYellowSVG() { return propDoc(sockAt(155, 155, 1.6, 'sunshine', null)); }
function birdhouseSVG() { return S.doc(300, 320, [birdhouseAt(150, 160, 1.15, false, false)]); }
function sledSVG() { return S.doc(300, 300, [sledAt(150, 170, 1.3)]); }

/* ------------------------------------------------ scene helpers */
function snowSky(evening) {
  return S.groundBand(0, 1600, evening ? 420 : 380, evening ? 'night' : 'bluebird') +
    S.groundBand(evening ? 420 : 380, 1600, 160, 'skyPale') +
    S.groundBand(evening ? 580 : 540, 1600, evening ? 80 : 120, evening ? 'bluebird' : 'sky');
}
function snowfall(n, seed) {
  const parts = [];
  for (let i = 0; i < n; i++) {
    const x = ((seed * 149 + i * 223) % 1540) + 30;
    const y = ((seed * 101 + i * 173) % 560) + 40;
    parts.push(S.circle(x, y, 5 + (i % 3), 'white', { alpha: 0.9 }));
  }
  return parts.join('');
}
function snowGround() {
  return S.groundBand(660, 1600, 340, 'cream') +
    S.pathShape('M 0 1000 L 0 908 Q 460 862 900 902 Q 1280 936 1600 902 L 1600 1000 Z', 'skyPale') +
    S.hill(340, 690, 560, 110, 'white') + S.hill(1300, 700, 620, 120, 'white');
}
function cabinAt(x, baseY, s) {
  return [
    S.rrect(x - 130 * s, baseY - 180 * s, 260 * s, 180 * s, 14 * s, 'sandDeep', { outlined: true }),
    S.pathShape(`M ${x - 150 * s} ${baseY - 172 * s} L ${x} ${baseY - 252 * s} L ${x + 150 * s} ${baseY - 172 * s} Z`, 'cream', { outlined: true }),
    S.rrect(x - 34 * s, baseY - 96 * s, 68 * s, 96 * s, 10 * s, 'teal', { outlined: true, sw: 6 * s }),
    S.rrect(x + 52 * s, baseY - 120 * s, 54 * s, 54 * s, 8 * s, 'sunshine', { outlined: true, sw: 5 * s }),
  ].join('');
}
function washLine(x1, y1, x2, y2) {
  const midY = Math.max(y1, y2) + 60;
  return [
    S.rrect(x1 - 12, y1, 24, 860 - y1, 10, 'sandDeep', { outlined: true, sw: 6 }),
    S.rrect(x2 - 12, y2, 24, 860 - y2, 10, 'sandDeep', { outlined: true, sw: 6 }),
    S.stroke(`M ${x1} ${y1 + 14} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y2 + 14}`, 'outline', 6),
  ].join('');
}
/* point on the sagging line for hanging items */
function lineY(x1, y1, x2, y2, x) {
  const t = (x - x1) / (x2 - x1);
  const midY = Math.max(y1, y2) + 60;
  return (1 - t) * (1 - t) * (y1 + 14) + 2 * (1 - t) * t * midY + t * t * (y2 + 14);
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const evening = n === 9;
  const parts = [snowSky(evening)];
  parts.push(snowfall(n === 8 ? 8 : 14, n));
  parts.push(snowGround());
  const LX1 = 340, LY1 = 330, LX2 = 1360, LY2 = 350;
  const hangY = (x) => lineY(LX1, LY1, LX2, LY2, x);

  if (n === 1) {
    /* the gust: the full line of pairs, everything lifting off! */
    parts.push(cabinAt(210, 820, 0.9));
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(mittenAt(520, hangY(520) + 70, 0.85, 'coral', 'cream', true));
    parts.push(`<g transform="translate(660 ${hangY(660) + 40}) rotate(18)">${mittenAt(0, 30, 0.85, 'coral', 'cream', true)}</g>`);
    parts.push(hatAt(820, hangY(820) + 60, 0.85));
    parts.push(`<g transform="translate(980 ${hangY(980) - 60}) rotate(-24)">${hatAt(0, 0, 0.8)}</g>`);
    parts.push(`<g transform="translate(1140 ${hangY(1140) - 110}) rotate(32)">${sockAt(0, 0, 0.8, 'cream', 'stripes')}</g>`);
    parts.push(`<g transform="translate(1260 ${hangY(1260) + 30}) rotate(-14)">${sockAt(0, 20, 0.8, 'cream', 'stripes')}</g>`);
    parts.push(S.stroke('M 380 240 Q 520 200 660 236 M 700 190 Q 840 150 980 186 M 1020 250 Q 1140 214 1250 244', 'outline', 7));
  } else if (n === 2) {
    /* the lonely red mitten (the REFERENCE) by Milo; drift mounds under the two candidates */
    parts.push(cabinAt(210, 820, 0.9));
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(S.hill(720, 800, 300, 60, 'white'));
    parts.push(S.hill(1100, 800, 300, 60, 'white'));
    /* the LONELY red mitten (the reference) sits by itself near Pip,
       clear of both module-rendered candidates */
    parts.push(mittenAt(330, 770, 1.0, 'coral', 'cream', true));
    parts.push(S.softShadow(330, 812, 90, 14));
  } else if (n === 3) {
    /* the twin hat hanging just beside the correct slot (abs 1120,420);
       the scarf hanging low near the decoy (abs 840,640) */
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(hatAt(1230, hangY(1230) + 62, 0.85));
    parts.push(S.stroke(`M 760 620 Q 800 600 840 618 L 900 700 Q 860 726 820 706 Z`, 'berry', 26));
    parts.push(S.stroke(`M 766 626 L 892 694`, 'coral', 9));
    parts.push(mittenAt(520, hangY(520) + 70, 0.85, 'coral', 'cream', true));
    parts.push(mittenAt(640, hangY(640) + 70, 0.85, 'coral', 'cream', true));
  } else if (n === 4) {
    /* the striped REFERENCE sock by Milo; three drift spots for the candidates;
       the line refilling behind (mittens + hats) */
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(mittenAt(480, hangY(480) + 70, 0.8, 'coral', 'cream', true));
    parts.push(mittenAt(590, hangY(590) + 70, 0.8, 'coral', 'cream', true));
    parts.push(hatAt(760, hangY(760) + 58, 0.8));
    parts.push(hatAt(880, hangY(880) + 58, 0.8));
    parts.push(S.hill(520, 800, 260, 54, 'white'), S.hill(880, 800, 260, 54, 'white'), S.hill(1240, 800, 260, 54, 'white'));
    parts.push(sockAt(1200, 740, 1.05, 'cream', 'stripes'));
    parts.push(S.softShadow(1195, 800, 84, 13));
  } else if (n === 5) {
    /* the dip: the basket with the lone yellow sock; NO painted birdhouse/sled
       (the module renders those as the two frameless options) */
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(mittenAt(480, hangY(480) + 70, 0.8, 'coral', 'cream', true));
    parts.push(mittenAt(590, hangY(590) + 70, 0.8, 'coral', 'cream', true));
    parts.push(hatAt(760, hangY(760) + 58, 0.8));
    parts.push(hatAt(880, hangY(880) + 58, 0.8));
    parts.push(sockAt(1040, hangY(1040) + 66, 0.8, 'cream', 'stripes'));
    parts.push(sockAt(1150, hangY(1150) + 66, 0.8, 'cream', 'stripes'));
    parts.push(`<g transform="translate(330 850)">${S.pathShape('M -90 0 Q 0 -30 90 0 L 74 46 Q 0 68 -74 46 Z', 'sandDeep', { outlined: true })}${S.stroke('M -64 8 Q 0 -14 64 8', 'creamDeep', 8)}</g>`);
    parts.push(sockAt(330, 816, 0.62, 'sunshine', null));
  } else if (n === 6) {
    /* the birdhouse at the nest slot (abs 1120,400) with the snowbird + the OTHER
       yellow sock visible; the basket at the decoy slot (abs 860,640) */
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(S.rrect(1108, 470, 24, 380, 10, 'sandDeep', { outlined: true, sw: 6 }));
    parts.push(birdhouseAt(1120, 400, 1.1, true, true));
    parts.push(`<g transform="translate(860 700)">${S.pathShape('M -80 0 Q 0 -26 80 0 L 66 42 Q 0 62 -66 42 Z', 'sandDeep', { outlined: true })}${S.stroke('M -56 8 Q 0 -12 56 8', 'creamDeep', 8)}</g>`);
  } else if (n === 7) {
    /* the full line; the PARTNERS painted beside the module targets:
       a STRIPED sock at (1120,400-ish) beside the dots-sock target (module at abs 960,410)
       and the red twin painted beside the mitten target (module at abs 540,410) */
    parts.push(washLine(LX1, LY1, LX2, LY2));
    parts.push(mittenAt(430, hangY(430) + 70, 0.85, 'coral', 'cream', true));   /* the twin of the module's mitten target */
    parts.push(hatAt(760, hangY(760) + 58, 0.85));
    parts.push(hatAt(870, hangY(870) + 58, 0.85));
    parts.push(sockAt(1190, hangY(1190) + 66, 0.85, 'cream', 'stripes'));       /* the partner the dots-sock FAILS to match
       (no yellow sock here — BOTH yellow socks are the snowbird's now) */
  } else if (n === 8) {
    /* the Warm Winter Walk: sled, everyone cozy, the snowbird in her yellow socks */
    parts.push(cabinAt(210, 820, 0.9));
    parts.push(sledAt(700, 800, 1.1));
    parts.push(snowbirdAt(980, 780, 1.3, true));
    parts.push(mittenAt(560, 760, 0.7, 'coral', 'cream', true));
    parts.push(S.sparkle(420, 260, 1.1, 'white'), S.sparkle(1240, 300, 1.0, 'white'));
  } else {
    /* n === 9 — good night: warm cabin window, the birdhouse aglow, soft evening */
    parts.push(cabinAt(260, 830, 1.0));
    parts.push(S.rrect(1108, 470, 24, 380, 10, 'sandDeep', { outlined: true, sw: 6 }));
    parts.push(birdhouseAt(1120, 400, 1.1, true, false));
    parts.push(snowbirdAt(1120, 412, 0.9, true));
    parts.push(S.sparkle(560, 240, 1.0, 'white'), S.sparkle(900, 200, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-the-odd-little-sock');
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
  for (let n = 1; n <= 9; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(mittenRedSVG(), path.join(P, 'mitten-red@2x.webp')));
  written.push(await S.renderWebp(mittenBlueSVG(), path.join(P, 'mitten-blue@2x.webp')));
  written.push(await S.renderWebp(hatSVG(), path.join(P, 'hat@2x.webp')));
  written.push(await S.renderWebp(sockStripedSVG(), path.join(P, 'sock-striped@2x.webp')));
  written.push(await S.renderWebp(sockDotsSVG(), path.join(P, 'sock-dots@2x.webp')));
  written.push(await S.renderWebp(sockGreenSVG(), path.join(P, 'sock-green@2x.webp')));
  written.push(await S.renderWebp(sockYellowSVG(), path.join(P, 'sock-yellow@2x.webp')));
  written.push(await S.renderWebp(birdhouseSVG(), path.join(P, 'birdhouse@2x.webp')));
  written.push(await S.renderWebp(sledSVG(), path.join(P, 'sled@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
