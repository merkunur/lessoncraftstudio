/* =====================================================================
   style-lib.js — the "Warm flat-vector storybook" shared art library.

   The single SoT for the 250-story Interactive Story Library's visual
   language (docs/storybook/visual-style-standard.md is the human-readable
   twin; PALETTE_VERSION anchors the two). Every per-story art generator
   (scripts/storybook/art/<storyId>-art.js) and character module
   (scripts/storybook/art/characters/*.js) builds ONLY through these
   helpers, which accept palette TOKEN NAMES — an off-palette color cannot
   be expressed, so style conformance holds by construction.

   Usage (a story art generator):
     const S = require('../style-lib.js');            // or ./style-lib.js
     const svg = S.doc(1600, 1000, [ S.skyGradient('sky','skyPale',1600,560), … ]);
     await S.renderPng(svg, '/tmp/page-01.png');
     …
     S.emitArtManifest(storyDir, files);              // colorsUsed collected automatically
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PALETTE_VERSION = 'wsv-1';

/* §1 of visual-style-standard.md — the library's only colors. */
const PALETTE = {
  cream: '#FBF3E4',
  creamDeep: '#F3E6CC',
  orange: '#F2784B',
  orangeDeep: '#D96830',
  coral: '#E86A5A',
  sunshine: '#F7C948',
  sand: '#F0D9A7',
  sandDeep: '#D9BC82',
  teal: '#146B5E',
  tealMid: '#2E9B87',
  mint: '#BFE5D4',
  leaf: '#8FBF6C',
  leafDeep: '#5E9448',
  sky: '#BEE3F0',
  skyPale: '#EAF6FB',
  bluebird: '#5FA8D3',
  berry: '#B76BA3',
  night: '#31456E',
  outline: '#5A3A26',
  inkSoft: '#3D2F21',
  white: '#FFFFFF',
};
const SHADOW_ALPHA = 0.15;          /* the single soft ground-shadow (night @ alpha) */
const OUTLINE_W = 10;               /* medium outline at the 512 character canvas scale */

const _used = new Set();
/* Resolve a palette token -> hex. Raw hexes are a defect by design. */
function token(t) {
  if (!Object.prototype.hasOwnProperty.call(PALETTE, t)) {
    throw new Error(`style-lib: "${t}" is not a wsv-${''}palette token (visual-style-standard.md §1) — raw colors are not expressible`);
  }
  _used.add(PALETTE[t]);
  return PALETTE[t];
}
function colorsUsed() { return Array.from(_used).sort(); }
function resetColorsUsed() { _used.clear(); }

/* ---------------- SVG document + generic shapes ---------------- */
function doc(w, h, parts) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${[].concat(parts).join('\n')}</svg>`;
}
function group(attrs, parts) {
  return `<g ${attrs}>${[].concat(parts).join('\n')}</g>`;
}
/* Outline attributes — the ONE outline look (round caps/joins). */
function oAttrs(sw) {
  return `stroke="${token('outline')}" stroke-width="${sw == null ? OUTLINE_W : sw}" stroke-linejoin="round" stroke-linecap="round"`;
}
function ellipse(cx, cy, rx, ry, fillToken, opts) {
  opts = opts || {};
  const o = opts.outlined ? oAttrs(opts.sw) : '';
  const op = opts.alpha != null ? ` opacity="${opts.alpha}"` : '';
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${token(fillToken)}" ${o}${op}/>`;
}
function circle(cx, cy, r, fillToken, opts) { return ellipse(cx, cy, r, r, fillToken, opts); }
function rrect(x, y, w, h, r, fillToken, opts) {
  opts = opts || {};
  const o = opts.outlined ? oAttrs(opts.sw) : '';
  const op = opts.alpha != null ? ` opacity="${opts.alpha}"` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${token(fillToken)}" ${o}${op}/>`;
}
function pathShape(d, fillToken, opts) {
  opts = opts || {};
  const o = opts.outlined ? oAttrs(opts.sw) : '';
  const op = opts.alpha != null ? ` opacity="${opts.alpha}"` : '';
  return `<path d="${d}" fill="${fillToken === 'none' ? 'none' : token(fillToken)}" ${o}${op}/>`;
}
function stroke(d, strokeToken, sw, opts) {
  opts = opts || {};
  const op = opts.alpha != null ? ` opacity="${opts.alpha}"` : '';
  return `<path d="${d}" fill="none" stroke="${token(strokeToken)}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${op}/>`;
}

/* ---------------- scene scaffold (1600×1000, three depth bands) ---------------- */
function skyGradient(topToken, bottomToken, w, h) {
  const id = 'sky' + Math.abs((topToken + bottomToken).split('').reduce((a, c) => a * 31 + c.charCodeAt(0) | 0, 7));
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${token(topToken)}"/><stop offset="1" stop-color="${token(bottomToken)}"/>
  </linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;
}
function groundBand(y, w, h, fillToken) { return `<rect x="0" y="${y}" width="${w}" height="${h}" fill="${token(fillToken)}"/>`; }
function sun(cx, cy, r) {
  return circle(cx, cy, r, 'sunshine') + circle(cx, cy, r * 1.28, 'sunshine', { alpha: 0.25 });
}
function cloud(cx, cy, s, alpha) {
  const a = alpha == null ? 0.9 : alpha;
  return group(`opacity="${a}"`, [
    ellipse(cx, cy, 78 * s, 30 * s, 'white'),
    ellipse(cx - 40 * s, cy + 8 * s, 46 * s, 22 * s, 'white'),
    ellipse(cx + 46 * s, cy + 6 * s, 52 * s, 24 * s, 'white'),
  ]);
}
function hill(cx, baseY, rx, ry, fillToken) { return ellipse(cx, baseY + ry * 0.35, rx, ry, fillToken); }
/* a calm water band with gentle scallop foam */
function water(y, w, h, bodyToken, foamToken) {
  const scallops = [];
  const step = 160;
  for (let x = -40; x < w + step; x += step) {
    scallops.push(`M ${x} ${y + 14} q ${step / 2} 26 ${step} 0`);
  }
  return groundBand(y, w, h, bodyToken) + stroke(scallops.join(' '), foamToken, 8, { alpha: 0.8 });
}
function rock(cx, baseY, s, fillToken, shadeToken) {
  return group('', [
    pathShape(`M ${cx - 90 * s} ${baseY} Q ${cx - 96 * s} ${baseY - 86 * s} ${cx - 30 * s} ${baseY - 104 * s} Q ${cx + 46 * s} ${baseY - 120 * s} ${cx + 84 * s} ${baseY - 54 * s} Q ${cx + 104 * s} ${baseY - 10 * s} ${cx + 86 * s} ${baseY} Z`, fillToken, { outlined: true, sw: 7 }),
    pathShape(`M ${cx - 30 * s} ${baseY - 104 * s} Q ${cx + 24 * s} ${baseY - 108 * s} ${cx + 50 * s} ${baseY - 70 * s} Q ${cx + 6 * s} ${baseY - 84 * s} ${cx - 30 * s} ${baseY - 104 * s} Z`, shadeToken, { alpha: 0.85 }),
  ]);
}
function sparkle(cx, cy, s, fillToken) {
  const t = fillToken || 'sunshine';
  return pathShape(`M ${cx} ${cy - 16 * s} Q ${cx + 4 * s} ${cy - 4 * s} ${cx + 16 * s} ${cy} Q ${cx + 4 * s} ${cy + 4 * s} ${cx} ${cy + 16 * s} Q ${cx - 4 * s} ${cy + 4 * s} ${cx - 16 * s} ${cy} Q ${cx - 4 * s} ${cy - 4 * s} ${cx} ${cy - 16 * s} Z`, t);
}
/* dune grass tuft */
function grass(cx, baseY, s, fillToken) {
  return stroke(
    `M ${cx} ${baseY} q ${-14 * s} ${-44 * s} ${-24 * s} ${-58 * s} M ${cx} ${baseY} q ${2 * s} ${-52 * s} ${-2 * s} ${-70 * s} M ${cx} ${baseY} q ${16 * s} ${-40 * s} ${26 * s} ${-54 * s}`,
    fillToken, 9 * s
  );
}
/* THE ground shadow: one soft ellipse per character/prop, nothing else. */
function softShadow(cx, cy, rx, ry) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${token('night')}" opacity="${SHADOW_ALPHA}"/>`;
}

/* ---------------- faces (simple, expressive, large friendly eyes) ---------------- */
function eyeDot(cx, cy, r) {
  return circle(cx, cy, r, 'inkSoft') + circle(cx + r * 0.32, cy - r * 0.36, r * 0.34, 'white');
}
function eyeArc(cx, cy, r) {
  return stroke(`M ${cx - r} ${cy + r * 0.2} Q ${cx} ${cy - r * 1.1} ${cx + r} ${cy + r * 0.2}`, 'inkSoft', r * 0.62);
}
function blush(cx, cy, r) { return ellipse(cx, cy, r, r * 0.62, 'coral', { alpha: 0.55 }); }

/* ---------------- rendering ---------------- */
async function renderPng(svg, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(file);
  return file;
}
async function renderWebp(svg, file, opts) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: (opts && opts.quality) || 90, alphaQuality: 100 }).toFile(file);
  return file;
}

/* ----------------------------------------------------------------------
   standardPoseSet — the atlas frame contract from ONE parametric rig.
   renderFn(params) -> full SVG string on the character's source canvas.
   spec: {
     poses:  { neutral: {…params}, talk: {…}, … }        (>=1; 'neutral' required)
     idle:   (i, n) => params                              (default: 2% squash bob ×6)
     clips:  { celebrate: (i, n) => params, … }            (optional, 24 frames each)
     idleFrames?: 6, clipFrames?: 24
   }
   Writes pose_<name>.png / idle_####.png / clip_<name>_####.png into outDir.
   ---------------------------------------------------------------------- */
async function standardPoseSet(outDir, renderFn, spec) {
  fs.mkdirSync(outDir, { recursive: true });
  if (!spec || !spec.poses || !spec.poses.neutral) throw new Error('standardPoseSet: spec.poses.neutral is required');
  const files = [];
  for (const [name, params] of Object.entries(spec.poses)) {
    files.push(await renderPng(renderFn(params), path.join(outDir, `pose_${name}.png`)));
  }
  const idleFrames = spec.idleFrames || 6;
  const idleFn = spec.idle || ((i, n) => Object.assign({}, spec.poses.neutral, { squash: Math.sin((i / n) * Math.PI * 2) * 0.02 }));
  for (let i = 0; i < idleFrames; i++) {
    files.push(await renderPng(renderFn(idleFn(i, idleFrames)), path.join(outDir, `idle_${String(i + 1).padStart(4, '0')}.png`)));
  }
  for (const [clipName, clipFn] of Object.entries(spec.clips || {})) {
    const n = spec.clipFrames || 24;
    for (let i = 0; i < n; i++) {
      files.push(await renderPng(renderFn(clipFn(i, n)), path.join(outDir, `clip_${clipName}_${String(i + 1).padStart(4, '0')}.png`)));
    }
  }
  return files;
}

/* ---------------- art manifest (consumed by gate-library.js) ---------------- */
function emitArtManifest(storyDir, files) {
  const manifest = {
    paletteVersion: PALETTE_VERSION,
    styleStandard: 'docs/storybook/visual-style-standard.md',
    colorsUsed: colorsUsed(),
    files: (files || []).map((f) => path.relative(storyDir, f).replace(/\\/g, '/')).sort(),
  };
  const p = path.join(storyDir, 'art-manifest.json');
  fs.writeFileSync(p, JSON.stringify(manifest, null, 2) + '\n');
  return p;
}

module.exports = {
  PALETTE_VERSION, PALETTE, SHADOW_ALPHA, OUTLINE_W,
  token, colorsUsed, resetColorsUsed,
  doc, group, oAttrs, ellipse, circle, rrect, pathShape, stroke,
  skyGradient, groundBand, sun, cloud, hill, water, rock, sparkle, grass, softShadow,
  eyeDot, eyeArc, blush,
  renderPng, renderWebp, standardPoseSet, emitArtManifest,
};
