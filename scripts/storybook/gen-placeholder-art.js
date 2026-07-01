#!/usr/bin/env node
/* =====================================================================
   gen-placeholder-art.js — programmatic placeholder art for a storybook
   (the asset-stubbed-FIRST doctrine: build against generated stand-ins,
   emit the CA5/AI-art WORKLIST the operator renders later; the player
   never knows the difference — same atlas contract either way).

   Generates for the vertical-slice story:
     cast/pip/  pose_neutral|talk|happy|point.png  (512×640, transparent)
                idle_0001..0006.png                (gentle bob, 7fps)
                clip_celebrate_0001..0024.png      (jump arc, 12fps)
     scenes/page-01..04.png                        (1600×1000, Direction-A palette)
   …then packs them via pack-atlas.js into the story's asset tree and
   writes the operator asset worklist markdown.

   USAGE:
     node scripts/storybook/gen-placeholder-art.js --story pips-picnic
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const { packCharacter, packScene } = require('./pack-atlas.js');

const arg = (k, d) => {
  const eq = process.argv.find(a => a.startsWith('--' + k + '='));
  if (eq) return eq.split('=').slice(1).join('=');
  const i = process.argv.indexOf('--' + k);
  if (i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) return process.argv[i + 1];
  return d;
};

const STORY = arg('story', 'pips-picnic');
const REPO = path.join(__dirname, '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', STORY);

/* ---------------- Pip the fox — SVG pose renderer (512×640, feet at 256,620) */
function pipSVG(o) {
  o = Object.assign({ mouth: 'closed', armL: 150, armR: 30, squash: 0, lift: 0, smileEyes: false }, o);
  const cy = 400 - o.lift;                      /* body center y */
  const bw = 150 * (1 + o.squash);              /* body half-width */
  const bh = 180 * (1 - o.squash);              /* body half-height */
  const headY = cy - bh - 60 + (o.squash * 40);
  function arm(angleDeg, side) {
    const a = angleDeg * Math.PI / 180;
    const sx = 256 + side * (bw - 10), sy = cy - 30;
    const ex = sx + side * Math.cos(a) * 95, ey = sy - Math.sin(a) * 95;
    return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#D96830" stroke-width="34" stroke-linecap="round"/>`;
  }
  let mouth;
  if (o.mouth === 'open') mouth = `<ellipse cx="256" cy="${headY + 52}" rx="26" ry="20" fill="#7A3016"/>`;
  else if (o.mouth === 'smile') mouth = `<path d="M 216 ${headY + 42} Q 256 ${headY + 78} 296 ${headY + 42}" stroke="#7A3016" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  else mouth = `<path d="M 226 ${headY + 52} Q 256 ${headY + 64} 286 ${headY + 52}" stroke="#7A3016" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  const eyes = o.smileEyes
    ? `<path d="M 186 ${headY - 14} Q 206 ${headY - 34} 226 ${headY - 14}" stroke="#3d2f21" stroke-width="11" fill="none" stroke-linecap="round"/>
       <path d="M 286 ${headY - 14} Q 306 ${headY - 34} 326 ${headY - 14}" stroke="#3d2f21" stroke-width="11" fill="none" stroke-linecap="round"/>`
    : `<circle cx="206" cy="${headY - 12}" r="15" fill="#3d2f21"/><circle cx="306" cy="${headY - 12}" r="15" fill="#3d2f21"/>
       <circle cx="211" cy="${headY - 17}" r="5" fill="#fff"/><circle cx="311" cy="${headY - 17}" r="5" fill="#fff"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="640" viewBox="0 0 512 640">
  <!-- tail -->
  <path d="M ${256 + bw - 20} ${cy + 60} Q ${256 + bw + 110} ${cy + 30} ${256 + bw + 70} ${cy - 90}
           Q ${256 + bw + 30} ${cy - 30} ${256 + bw - 30} ${cy}" fill="#F2784B"/>
  <path d="M ${256 + bw + 44} ${cy - 68} Q ${256 + bw + 62} ${cy - 36} ${256 + bw + 20} ${cy - 20}" fill="#FBF3E4"/>
  <!-- legs -->
  <rect x="${216 - 26}" y="${cy + bh - 44}" width="46" height="${620 - (cy + bh - 44)}" rx="22" fill="#D96830"/>
  <rect x="${296 - 20}" y="${cy + bh - 44}" width="46" height="${620 - (cy + bh - 44)}" rx="22" fill="#D96830"/>
  <!-- arms -->
  ${arm(o.armL, -1)}${arm(o.armR, 1)}
  <!-- body -->
  <ellipse cx="256" cy="${cy}" rx="${bw}" ry="${bh}" fill="#F2784B"/>
  <ellipse cx="256" cy="${cy + 40}" rx="${bw * 0.62}" ry="${bh * 0.66}" fill="#FBF3E4"/>
  <!-- ears -->
  <path d="M 166 ${headY - 66} L 140 ${headY - 150} L 216 ${headY - 104} Z" fill="#F2784B"/>
  <path d="M 346 ${headY - 66} L 372 ${headY - 150} L 296 ${headY - 104} Z" fill="#F2784B"/>
  <path d="M 172 ${headY - 82} L 158 ${headY - 128} L 202 ${headY - 102} Z" fill="#7A3016"/>
  <path d="M 340 ${headY - 82} L 354 ${headY - 128} L 310 ${headY - 102} Z" fill="#7A3016"/>
  <!-- head -->
  <ellipse cx="256" cy="${headY}" rx="118" ry="102" fill="#F2784B"/>
  <ellipse cx="256" cy="${headY + 34}" rx="66" ry="54" fill="#FBF3E4"/>
  <circle cx="256" cy="${headY + 22}" r="14" fill="#7A3016"/>
  ${eyes}
  ${mouth}
</svg>`;
}

async function png(svg, file) {
  await sharp(Buffer.from(svg)).png().toFile(file);
}

async function genCharacter(dir) {
  fs.mkdirSync(dir, { recursive: true });
  await png(pipSVG({}), path.join(dir, 'pose_neutral.png'));
  await png(pipSVG({ mouth: 'open', armR: 60 }), path.join(dir, 'pose_talk.png'));
  await png(pipSVG({ mouth: 'smile', smileEyes: true, armL: 120, armR: 60 }), path.join(dir, 'pose_happy.png'));
  await png(pipSVG({ mouth: 'smile', armR: 5, armL: 160 }), path.join(dir, 'pose_point.png'));
  for (let i = 0; i < 6; i++) {
    const squash = Math.sin(i / 6 * Math.PI * 2) * 0.02;
    await png(pipSVG({ squash }), path.join(dir, `idle_${String(i + 1).padStart(4, '0')}.png`));
  }
  for (let i = 0; i < 24; i++) {
    const t = i / 23;
    const lift = Math.max(0, Math.sin(t * Math.PI * 2) * 90);
    const up = lift > 20;
    await png(pipSVG({
      mouth: 'smile', smileEyes: up, lift,
      armL: up ? 110 : 150, armR: up ? 70 : 30,
      squash: lift > 0 ? -0.03 : 0.03
    }), path.join(dir, `clip_celebrate_${String(i + 1).padStart(4, '0')}.png`));
  }
}

/* ---------------- scenes (1600×1000, warm Direction-A-adjacent palette) */
function sceneSVG(n) {
  const skies = [
    ['#BEE3F0', '#FDF6E3'], ['#CDEAE2', '#FDF6E3'],
    ['#C9E4F5', '#FBEFD8'], ['#F6C79E', '#FBE3C9']
  ][n - 1];
  const ground = ['#8FBF6C', '#93C077', '#89B96E', '#7FA95F'][n - 1];
  let extras = '';
  if (n === 1) {
    extras = `<circle cx="1380" cy="150" r="80" fill="#F7C948" opacity=".9"/>
      <ellipse cx="300" cy="980" rx="420" ry="150" fill="#7FB35C"/>
      <g><rect x="1150" y="520" width="36" height="200" fill="#8a6d5c"/><circle cx="1168" cy="470" r="120" fill="#5E9448"/></g>
      <g><rect x="180" y="560" width="30" height="170" fill="#8a6d5c"/><circle cx="195" cy="520" r="95" fill="#67A050"/></g>`;
  } else if (n === 2) {
    extras = `<circle cx="220" cy="160" r="70" fill="#F7C948" opacity=".85"/>
      <g transform="translate(800 760)">
        ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 8 }, (_, c) =>
          `<rect x="${(c - 4) * 90}" y="${r * 40 - 100}" width="88" height="38" fill="${(r + c) % 2 ? '#E86A5A' : '#FBF3E4'}" opacity=".92"/>`).join('')).join('')}
      </g>`;
  } else if (n === 3) {
    extras = `<path d="M 0 700 Q 400 640 800 700 T 1600 690 L 1600 1000 L 0 1000 Z" fill="#7FC4D8" opacity=".85"/>
      <ellipse cx="500" cy="880" rx="90" ry="34" fill="#B9B0A2"/>
      <ellipse cx="1100" cy="920" rx="120" ry="40" fill="#C8BFAF"/>
      <circle cx="1400" cy="140" r="70" fill="#F7C948" opacity=".8"/>`;
  } else {
    extras = `<circle cx="800" cy="330" r="110" fill="#F2784B" opacity=".95"/>
      <ellipse cx="400" cy="960" rx="500" ry="140" fill="#6E9852"/>
      <g><rect x="1240" y="480" width="34" height="220" fill="#7a5c4c"/><circle cx="1257" cy="430" r="110" fill="#4F7E3E"/></g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${skies[0]}"/><stop offset="1" stop-color="${skies[1]}"/>
  </linearGradient></defs>
  <rect width="1600" height="1000" fill="url(#sky)"/>
  <ellipse cx="800" cy="1180" rx="1400" ry="460" fill="${ground}"/>
  ${extras}
  <ellipse cx="500" cy="240" rx="130" ry="46" fill="#fff" opacity=".75"/>
  <ellipse cx="1200" cy="200" rx="110" ry="40" fill="#fff" opacity=".7"/>
</svg>`;
}

async function genScenes(dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (let n = 1; n <= 4; n++) {
    await png(sceneSVG(n), path.join(dir, `page-0${n}.png`));
  }
}

/* ---------------- worklist */
function worklist() {
  return `# Asset worklist — story "${STORY}" (placeholder art is LIVE; replace at will)

Player + packer contract: docs/storybook/authoring-guide.md §Assets.
Deliver PNGs per the layout below, run pack-atlas.js (or TexturePacker,
PixiJS exporter, WebP, max 2048, trim), drop the outputs into
\`/var/www/lcs-media/mini-tools/stories/${STORY}/\` — zero code changes.

## Character: pip (guide) — source canvas 512×640, feet at bottom-center
| Frame | File | Notes |
|---|---|---|
| Neutral pose | cast/pip/pose_neutral.png | REQUIRED |
| Talk pose | cast/pip/pose_talk.png | REQUIRED (narrator) |
| Happy pose | cast/pip/pose_happy.png | success beats |
| Point pose | cast/pip/pose_point.png | prompt beats |
| Idle loop | cast/pip/idle_0001..0006.png | 6-8fps gentle bob |
| Celebrate clip | cast/pip/clip_celebrate_0001..0024.png | 12fps, ~2s, returns to happy |

## Scenes — 1600×1000 opaque PNG (packed to WebP q80, ≤200KB target each)
| Page | File | Content brief |
|---|---|---|
| 1 | scenes/page-01.png | sunny meadow, morning |
| 2 | scenes/page-02.png | picnic blanket close-up |
| 3 | scenes/page-03.png | stream with stepping stones |
| 4 | scenes/page-04.png | golden-hour meadow, sunset |

## Narration — one mp3 per line per locale (EN first)
Files: audio/<locale>/<lineId>.mp3 — the line IDs + exact copy are in
mini tools/stories/${STORY}/strings.json (keys p0N-l0N + success lines).
Record via ElevenLabs per the platform's narration flow; drop under
/var/www/lcs-media/mini-tools/stories/${STORY}/audio/en/… . Missing files
fall back to browser TTS automatically — ship art first, audio second.
`;
}

(async () => {
  const tmp = path.join(os.tmpdir(), 'sb-art-' + STORY);
  fs.rmSync(tmp, { recursive: true, force: true });
  const castDir = path.join(tmp, 'cast', 'pip');
  const sceneDir = path.join(tmp, 'scenes');
  console.log('[gen-art] rendering placeholder frames…');
  await genCharacter(castDir);
  await genScenes(sceneDir);

  console.log('[gen-art] packing…');
  await packCharacter(castDir, 'pip', path.join(STORY_DIR, 'cast', 'pip'));
  for (let n = 1; n <= 4; n++) {
    await packScene(path.join(sceneDir, `page-0${n}.png`), path.join(STORY_DIR, 'scenes'));
  }

  const docsDir = path.join(REPO, 'docs', 'storybook');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, `asset-worklist-${STORY}.md`), worklist());
  console.log('[gen-art] done. Story assets at: ' + STORY_DIR);
  console.log('[gen-art] operator worklist: docs/storybook/asset-worklist-' + STORY + '.md');
})().catch(e => { console.error('[gen-art] FAIL: ' + e.message); process.exit(1); });
