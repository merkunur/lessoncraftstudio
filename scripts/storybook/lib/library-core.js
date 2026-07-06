/* =====================================================================
   library-core.js — the Story Studio global-library manifest engine,
   extracted from build-library-manifest.js (the validate-core.js
   precedent: plain CJS, fs/path only + lazy sharp, so the CLI and the
   Next.js admin routes share ONE implementation).

   buildLibraryManifest(libRoot, opts) -> {
     manifest: { schemaVersion:'sblib-1', generatedAt, characters, backgrounds },
     errors:   string[]   // same message strings the CLI always printed
     warns:    string[]
     perAsset: { characters: { <id>: {errors, warns} },
                 backgrounds: { <id>: {errors, warns} } },
     written:  boolean
   }
   opts:
     tolerant  (default false) — broken assets are EXCLUDED from the
               manifest but reported per-asset; manifest.json IS written
               with the passing set. Strict (CLI) mode: any error =>
               nothing written (written:false) — the historical contract.
     write     (default true) — write manifest.json to libRoot.
     urlBase   (default '/mini-tools/storybook-library')

   Contracts enforced (verbatim from the CLI):
     characters/<id>/<id>.base.json + meta.image on disk; pose_* frames
     with pose_neutral REQUIRED; frames upright (rotated:false); ONE
     sourceSize across frames; declared meta.size == sheet; frames inside
     the sheet; optional clips atlas with clip_* animations + images +
     multipacks on disk. Generates characters/<id>/card.webp (256, from
     the pose_neutral frame composite, webp q85).
     backgrounds/<id>@2x.webp EXACTLY 1600×1000 (>300KB = warn);
     generates backgrounds/thumbs/<id>.webp (320×200 cover, q80).
   NEVER touches props-manifest.json (CLI-only concern).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const SCENE_W = 1600, SCENE_H = 1000;
const SCENE_CAP = 300 * 1024;

function readJson(p, errs) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { errs.push(p + ' parse: ' + e.message); return null; }
}

async function buildCharacter(dir, id, urlBase, sharp) {
  const errs = [], wrns = [];
  const err = (m) => errs.push('characters/' + id + ': ' + m);
  const warn = (m) => wrns.push('characters/' + id + ': ' + m);

  const baseJsonPath = path.join(dir, id + '.base.json');
  if (!fs.existsSync(baseJsonPath)) { err('missing ' + id + '.base.json'); return { errs, wrns, entry: null }; }
  const atlas = readJson(baseJsonPath, errs);
  if (!atlas || !atlas.frames) { if (atlas) err('base atlas has no frames'); return { errs, wrns, entry: null }; }

  const imgName = (atlas.meta && atlas.meta.image) || null;
  const imgPath = imgName && path.join(dir, imgName);
  if (!imgPath || !fs.existsSync(imgPath)) { err('atlas meta.image missing on disk (' + imgName + ')'); return { errs, wrns, entry: null }; }

  /* contract: pose_* frames, pose_neutral required, upright, ONE sourceSize */
  const poses = Object.keys(atlas.frames).filter(n => n.startsWith('pose_')).map(n => n.slice(5));
  if (!poses.includes('neutral')) err('pose_neutral frame REQUIRED');
  const rotated = Object.entries(atlas.frames).filter(([, f]) => f.rotated);
  if (rotated.length) err('base frames must be upright (rotated:false) — re-bake via pack-atlas/import-character-sheet: ' + rotated.map(([n]) => n).join(', '));
  const sizes = new Set(Object.values(atlas.frames).map(f => f.sourceSize.w + 'x' + f.sourceSize.h));
  if (sizes.size > 1) err('registration violation — multiple sourceSizes: ' + [...sizes].join(', '));

  let meta;
  try { meta = await sharp(imgPath).metadata(); }
  catch (e) { err('unreadable sheet (' + e.message + ')'); return { errs, wrns, entry: null }; }
  const declared = atlas.meta && atlas.meta.size;
  if (declared && (declared.w !== meta.width || declared.h !== meta.height)) {
    err('sheet ' + meta.width + 'x' + meta.height + ' != atlas meta.size ' + declared.w + 'x' + declared.h);
  }
  for (const [fname, f] of Object.entries(atlas.frames)) {
    const fw = f.rotated ? f.frame.h : f.frame.w;
    const fh = f.rotated ? f.frame.w : f.frame.h;
    if (f.frame.x < 0 || f.frame.y < 0 || f.frame.x + fw > meta.width || f.frame.y + fh > meta.height) {
      err('frame "' + fname + '" falls outside the sheet');
    }
  }

  /* clips (optional): animations must be clip_* named */
  const clipsJsonPath = path.join(dir, id + '.clips.json');
  let clips = [];
  if (fs.existsSync(clipsJsonPath)) {
    const cj = readJson(clipsJsonPath, errs);
    if (cj) {
      clips = Object.keys(cj.animations || {}).filter(n => n.startsWith('clip_')).map(n => n.slice(5));
      if (!clips.length) warn('clips atlas has no clip_* animations');
      const clipsImg = cj.meta && cj.meta.image && path.join(dir, cj.meta.image);
      if (!clipsImg || !fs.existsSync(clipsImg)) err('clips meta.image missing on disk');
      for (const rel of (cj.meta && cj.meta.related_multi_packs) || []) {
        if (!fs.existsSync(path.join(dir, rel))) err('multipack ' + rel + ' missing');
      }
    }
  }

  /* card.webp — the picker thumbnail, cropped from pose_neutral (only for
     contract-clean characters, matching the CLI's historical gating) */
  const neutral = atlas.frames['pose_neutral'];
  if (neutral && errs.length === 0) {
    const card = path.join(dir, 'card.webp');
    try {
      const cell = sharp({
        create: { width: neutral.sourceSize.w, height: neutral.sourceSize.h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      }).composite([{
        input: await sharp(imgPath)
          .extract({ left: neutral.frame.x, top: neutral.frame.y, width: neutral.frame.w, height: neutral.frame.h })
          .png().toBuffer(),
        left: Math.max(0, (neutral.spriteSourceSize && neutral.spriteSourceSize.x) | 0),
        top: Math.max(0, (neutral.spriteSourceSize && neutral.spriteSourceSize.y) | 0),
      }]);
      await sharp(await cell.png().toBuffer())
        .resize({ width: 256, height: 256, fit: 'inside' })
        .webp({ quality: 85 })
        .toFile(card);
    } catch (e) { err('card thumbnail failed (' + e.message + ')'); }
  }
  if (errs.length) return { errs, wrns, entry: null };

  const charMeta = fs.existsSync(path.join(dir, 'meta.json')) ? (readJson(path.join(dir, 'meta.json'), errs) || {}) : {};
  return {
    errs, wrns,
    entry: {
      id,
      name: charMeta.name || { en: id.charAt(0).toUpperCase() + id.slice(1) },
      tags: charMeta.tags || [],
      poses,
      clips,
      atlasBase: urlBase + '/characters/' + id + '/' + id + '.base.json',
      atlasClips: clips.length ? urlBase + '/characters/' + id + '/' + id + '.clips.json' : null,
      card: urlBase + '/characters/' + id + '/card.webp',
    },
  };
}

async function buildBackground(bgsDir, f, metaMap, thumbsDir, urlBase, sharp) {
  const errs = [], wrns = [];
  const id = f.replace(/@2x\.webp$/i, '');
  const p = path.join(bgsDir, f);
  let meta;
  try { meta = await sharp(p).metadata(); }
  catch (e) { errs.push('backgrounds/' + f + ': unreadable (' + e.message + ')'); return { id, errs, wrns, entry: null }; }
  if (meta.width !== SCENE_W || meta.height !== SCENE_H) {
    errs.push('backgrounds/' + f + ': is ' + meta.width + 'x' + meta.height + ', must be ' + SCENE_W + 'x' + SCENE_H);
    return { id, errs, wrns, entry: null };
  }
  const bytes = fs.statSync(p).size;
  if (bytes > SCENE_CAP) wrns.push('backgrounds/' + f + ': ' + ((bytes / 1024) | 0) + 'KB (> ' + SCENE_CAP / 1024 + 'KB scene cap — heavy on school tablets)');
  try {
    await sharp(p).resize(320, 200, { fit: 'cover' }).webp({ quality: 80 }).toFile(path.join(thumbsDir, id + '.webp'));
  } catch (e) { errs.push('backgrounds/' + f + ': thumb failed (' + e.message + ')'); return { id, errs, wrns, entry: null }; }
  const m = metaMap[id] || {};
  return {
    id, errs, wrns,
    entry: {
      id,
      name: m.name || { en: id.replace(/-/g, ' ') },
      theme: m.theme || null,
      src: urlBase + '/backgrounds/' + f,
      thumb: urlBase + '/backgrounds/thumbs/' + id + '.webp',
      size: { w: SCENE_W, h: SCENE_H },
    },
  };
}

async function buildLibraryManifest(libRoot, opts = {}) {
  const tolerant = !!opts.tolerant;
  const write = opts.write !== false;
  const urlBase = opts.urlBase || '/mini-tools/storybook-library';
  /* sharp must be INJECTED by bundled (Next/webpack) callers — a deep CJS
     require gets webpack-bundled and the native binary cannot load from a
     chunk. The CLI path falls back to a plain require (node runtime). */
  // eslint-disable-next-line global-require
  const sharp = opts.sharpImpl || require('sharp');

  const errors = [];
  const warns = [];
  const perAsset = { characters: {}, backgrounds: {} };

  /* characters */
  const characters = [];
  const charsDir = path.join(libRoot, 'characters');
  if (fs.existsSync(charsDir)) {
    for (const id of fs.readdirSync(charsDir).sort()) {
      const dir = path.join(charsDir, id);
      if (!fs.statSync(dir).isDirectory()) continue;
      const res = await buildCharacter(dir, id, urlBase, sharp);
      if (res.errs.length || res.wrns.length) perAsset.characters[id] = { errors: res.errs, warns: res.wrns };
      errors.push(...res.errs);
      warns.push(...res.wrns);
      if (res.entry) characters.push(res.entry);
    }
  }

  /* backgrounds */
  const backgrounds = [];
  const bgsDir = path.join(libRoot, 'backgrounds');
  if (fs.existsSync(bgsDir)) {
    const metaMap = fs.existsSync(path.join(bgsDir, '_meta.json'))
      ? (readJson(path.join(bgsDir, '_meta.json'), errors) || {}) : {};
    const thumbsDir = path.join(bgsDir, 'thumbs');
    fs.mkdirSync(thumbsDir, { recursive: true });
    for (const f of fs.readdirSync(bgsDir).sort()) {
      if (!/@2x\.webp$/i.test(f)) continue;
      const res = await buildBackground(bgsDir, f, metaMap, thumbsDir, urlBase, sharp);
      if (res.errs.length || res.wrns.length) perAsset.backgrounds[res.id] = { errors: res.errs, warns: res.wrns };
      errors.push(...res.errs);
      warns.push(...res.wrns);
      if (res.entry) backgrounds.push(res.entry);
    }
  }

  const manifest = {
    schemaVersion: 'sblib-1',
    generatedAt: new Date().toISOString(),
    characters,
    backgrounds,
  };

  let written = false;
  if (write && (tolerant || errors.length === 0)) {
    fs.writeFileSync(path.join(libRoot, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
    written = true;
  }
  return { manifest, errors, warns, perAsset, written };
}

module.exports = { buildLibraryManifest, SCENE_W, SCENE_H, SCENE_CAP };
