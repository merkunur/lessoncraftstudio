#!/usr/bin/env node
/* =====================================================================
   pack-atlas.js — storybook character/scene packer (PixiJS spritesheet).

   Evolution of scripts/games/build-sprites.js (same sharp trim/composite
   core) emitting the STANDARD PixiJS spritesheet JSON-hash format + WebP,
   so the atlas contract equals TexturePacker's PixiJS exporter output —
   TexturePacker-produced atlases are accepted interchangeably.

   INPUT (character mode) — the operator art-drop folder for ONE character:
     pose_<name>.png              single-frame poses (512×640 portrait)
     idle_0001.png … idle_000N.png        the one idle loop (6-10 frames)
     clip_<name>_0001.png … _00NN.png     optional full-motion clips (24-48)

   OUTPUT (character mode):
     <name>.base.json / <name>.base.webp    poses + idle  (always loaded)
     <name>.clips.json / <name>.clips.webp  clips         (tier-gated)
     (+ <name>.clips-1.* … when multipacked; meta.related_multi_packs links)

   Registration rule (validator-enforced): every frame of a character must
   share ONE source canvas size — trimming preserves registration via
   sourceSize/spriteSourceSize only when the source canvas never changes.

   USAGE:
     node scripts/storybook/pack-atlas.js --in <char-dir> --name <char> --out <dir>
     node scripts/storybook/pack-atlas.js --scene <png> --out <dir>   (1600×1000 → WebP q80)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_PAGE = 2048;      /* weak-GPU-safe atlas page limit */
const PAD = 2;
const WEBP_Q = 80;
const SCENE_W = 1600, SCENE_H = 1000;
const SCENE_CAP = 300 * 1024;

const arg = (k, d) => {
  const eq = process.argv.find(a => a.startsWith('--' + k + '='));
  if (eq) return eq.split('=').slice(1).join('=');
  const i = process.argv.indexOf('--' + k);
  if (i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) return process.argv[i + 1];
  return d;
};

/* ---- trim one frame; returns {name, buf(png trimmed), w, h, offX, offY, srcW, srcH} */
async function loadFrame(file, name) {
  const meta = await sharp(file).metadata();
  const { data, info } = await sharp(file)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });
  /* sharp reports trim offsets as NEGATIVE values */
  const offX = Math.max(0, -(info.trimOffsetLeft || 0));
  const offY = Math.max(0, -(info.trimOffsetTop || 0));
  return {
    name, buf: data,
    w: info.width, h: info.height,
    offX, offY,
    srcW: meta.width, srcH: meta.height
  };
}

/* ---- shelf-pack frames into pages of MAX_PAGE² ---- */
function shelfPack(frames) {
  const sorted = frames.slice().sort((a, b) => b.h - a.h);
  const pages = [];
  let page = null;
  function newPage() {
    page = { placements: [], x: PAD, y: PAD, shelfH: 0, w: 0, h: 0 };
    pages.push(page);
  }
  newPage();
  for (const f of sorted) {
    if (f.w + PAD * 2 > MAX_PAGE || f.h + PAD * 2 > MAX_PAGE) {
      throw new Error(`frame ${f.name} (${f.w}x${f.h}) exceeds the ${MAX_PAGE} atlas page`);
    }
    if (page.x + f.w + PAD > MAX_PAGE) {           /* new shelf */
      page.y += page.shelfH + PAD;
      page.x = PAD;
      page.shelfH = 0;
    }
    if (page.y + f.h + PAD > MAX_PAGE) {           /* new page */
      newPage();
    }
    page.placements.push({ f, x: page.x, y: page.y });
    page.x += f.w + PAD;
    page.shelfH = Math.max(page.shelfH, f.h);
    page.w = Math.max(page.w, page.x);
    page.h = Math.max(page.h, page.y + page.shelfH + PAD);
  }
  return pages;
}

function animationsOf(frameNames) {
  /* derive Pixi `animations` from the _#### numbering convention */
  const groups = {};
  for (const n of frameNames) {
    const m = n.match(/^(.*)_(\d{4})$/);
    if (!m) continue;
    (groups[m[1]] = groups[m[1]] || []).push(n);
  }
  const out = {};
  for (const k of Object.keys(groups)) {
    out[k] = groups[k].sort();
  }
  return out;
}

async function writeAtlas(frames, outDir, baseName) {
  if (!frames.length) return [];
  const pages = shelfPack(frames);
  const written = [];
  const jsonNames = pages.map((_, i) =>
    i === 0 ? `${baseName}.json` : `${baseName}-${i}.json`);
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const imgName = jsonNames[i].replace(/\.json$/, '.webp');
    const composite = p.placements.map(pl => ({ input: pl.f.buf, left: pl.x, top: pl.y }));
    await sharp({
      create: { width: p.w, height: p.h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
    }).composite(composite).webp({ quality: WEBP_Q, alphaQuality: 100 })
      .toFile(path.join(outDir, imgName));

    const framesJson = {};
    for (const pl of p.placements) {
      framesJson[pl.f.name] = {
        frame: { x: pl.x, y: pl.y, w: pl.f.w, h: pl.f.h },
        rotated: false,
        trimmed: pl.f.w !== pl.f.srcW || pl.f.h !== pl.f.srcH,
        spriteSourceSize: { x: pl.f.offX, y: pl.f.offY, w: pl.f.w, h: pl.f.h },
        sourceSize: { w: pl.f.srcW, h: pl.f.srcH }
      };
    }
    const names = p.placements.map(pl => pl.f.name);
    const json = {
      frames: framesJson,
      animations: animationsOf(names),
      meta: {
        app: 'lcs-pack-atlas', version: '1.0',
        image: imgName, format: 'RGBA8888',
        size: { w: p.w, h: p.h }, scale: '1'
      }
    };
    if (pages.length > 1) {
      json.meta.related_multi_packs = jsonNames.filter((_, k) => k !== i);
    }
    fs.writeFileSync(path.join(outDir, jsonNames[i]), JSON.stringify(json));
    written.push(jsonNames[i], imgName);
  }
  return written;
}

async function packCharacter(inDir, name, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(inDir).filter(f => /\.png$/i.test(f)).sort();
  if (!files.length) throw new Error(`no PNG frames in ${inDir}`);

  const base = [], clips = [];
  for (const f of files) {
    const stem = f.replace(/\.png$/i, '');
    const frame = await loadFrame(path.join(inDir, f), stem);
    if (/^clip_/.test(stem)) clips.push(frame);
    else base.push(frame);            /* pose_* + idle_#### */
  }

  /* registration check: one source canvas per character */
  const all = base.concat(clips);
  const srcW = all[0].srcW, srcH = all[0].srcH;
  for (const f of all) {
    if (f.srcW !== srcW || f.srcH !== srcH) {
      throw new Error(`registration violation: ${f.name} is ${f.srcW}x${f.srcH}, expected ${srcW}x${srcH} — ` +
        'every frame of a character must share ONE source canvas (character-art-spec)');
    }
  }

  const wrote = [];
  wrote.push(...await writeAtlas(base, outDir, `${name}.base`));
  if (clips.length) {
    /* clips budget: ≤2 pages; downscale to 75% once before failing */
    try {
      wrote.push(...await writeAtlas(clips, outDir, `${name}.clips`));
    } catch (e) {
      console.warn(`[pack-atlas] clips overflow for ${name} — downscaling clip frames to 75%`);
      const scaled = [];
      for (const f of clips) {
        const buf = await sharp(f.buf).resize(Math.round(f.w * 0.75)).png().toBuffer();
        const m = await sharp(buf).metadata();
        scaled.push({
          name: f.name, buf, w: m.width, h: m.height,
          offX: Math.round(f.offX * 0.75), offY: Math.round(f.offY * 0.75),
          srcW: Math.round(f.srcW * 0.75), srcH: Math.round(f.srcH * 0.75)
        });
      }
      wrote.push(...await writeAtlas(scaled, outDir, `${name}.clips`));
    }
  }
  const baseJson = JSON.parse(fs.readFileSync(path.join(outDir, `${name}.base.json`), 'utf8'));
  const poseCount = Object.keys(baseJson.frames).filter(n => /^pose_/.test(n)).length;
  console.log(`[pack-atlas] ${name}: ${poseCount} poses, ` +
    `${(baseJson.animations.idle || []).length} idle frames, ${clips.length} clip frames -> ${wrote.join(', ')}`);
  return wrote;
}

async function packScene(file, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(file).metadata();
  if (meta.width !== SCENE_W || meta.height !== SCENE_H) {
    throw new Error(`scene ${path.basename(file)} is ${meta.width}x${meta.height}, must be ${SCENE_W}x${SCENE_H}`);
  }
  const out = path.join(outDir, path.basename(file).replace(/\.png$/i, '.webp'));
  await sharp(file).webp({ quality: WEBP_Q }).toFile(out);
  const size = fs.statSync(out).size;
  if (size > SCENE_CAP) {
    console.warn(`[pack-atlas] WARN: ${path.basename(out)} is ${(size / 1024) | 0}KB (> ${SCENE_CAP / 1024}KB cap) — re-export flatter art or lower detail`);
  }
  console.log(`[pack-atlas] scene ${path.basename(out)} ${(size / 1024) | 0}KB`);
  return out;
}

if (require.main === module) {
  (async () => {
    const inDir = arg('in', null);
    const name = arg('name', null);
    const out = arg('out', null);
    const scene = arg('scene', null);
    try {
      if (scene) {
        if (!out) throw new Error('--out required');
        await packScene(scene, out);
      } else if (inDir && name && out) {
        await packCharacter(inDir, name, out);
      } else {
        console.error('Usage:\n  pack-atlas.js --in <char-frames-dir> --name <char> --out <dir>\n  pack-atlas.js --scene <page.png> --out <dir>');
        process.exit(1);
      }
    } catch (e) {
      console.error('[pack-atlas] FAIL: ' + e.message);
      process.exit(1);
    }
  })();
}

module.exports = { packCharacter, packScene, loadFrame, shelfPack };
