#!/usr/bin/env node
/* =====================================================================
   build-library-manifest.js — the Story Studio global-library generator.

   Validates the platform CHARACTER + BACKGROUND libraries under
   "mini tools/storybook-library/" against the atlas/scene contracts,
   generates thumbnails (character card.webp from the pose_neutral frame;
   background thumbs at 320×200), and writes:

     mini tools/storybook-library/manifest.json        (characters + backgrounds)
     mini tools/storybook-library/props-manifest.json  (image-library themes)

   FAILS (exit 1) on any contract violation — a broken atlas must never
   reach the manifest. Operator flow: drop art (pack-atlas.js for
   characters) → node scripts/storybook/build-library-manifest.js →
   commit → cp to /var/www/lcs-media/mini-tools/ → deploy (§20.4 order).

   Character folder contract (the cast contract, verbatim §14.3-era atlas):
     characters/<id>/<id>.base.json + image  (pose_* frames; pose_neutral
       REQUIRED; frames upright — rotated:false — and ONE sourceSize)
     optional <id>.clips.json + image (+ multipack .clips-1.*)
     optional meta.json { name: {en,de,...}, tags: [] }
   Background contract: backgrounds/<id>@2x.webp at exactly 1600×1000;
     optional backgrounds/_meta.json { <id>: { name, theme } }.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');
const LIB = path.join(MINI, 'storybook-library');
const CHARS = path.join(LIB, 'characters');
const BGS = path.join(LIB, 'backgrounds');
const URL_BASE = '/mini-tools/storybook-library';
const SCENE_W = 1600, SCENE_H = 1000;
const SCENE_CAP = 300 * 1024;

const errors = [];
const warns = [];
const err = m => errors.push(m);
const warn = m => warns.push(m);

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { err(p + ' parse: ' + e.message); return null; }
}

/* ---------------- characters ---------------- */
async function buildCharacters() {
  const out = [];
  if (!fs.existsSync(CHARS)) return out;
  for (const id of fs.readdirSync(CHARS).sort()) {
    const dir = path.join(CHARS, id);
    if (!fs.statSync(dir).isDirectory()) continue;
    const baseJsonPath = path.join(dir, id + '.base.json');
    if (!fs.existsSync(baseJsonPath)) { err('characters/' + id + ': missing ' + id + '.base.json'); continue; }
    const atlas = readJson(baseJsonPath);
    if (!atlas || !atlas.frames) { err('characters/' + id + ': base atlas has no frames'); continue; }

    const imgName = (atlas.meta && atlas.meta.image) || null;
    const imgPath = imgName && path.join(dir, imgName);
    if (!imgPath || !fs.existsSync(imgPath)) { err('characters/' + id + ': atlas meta.image missing on disk (' + imgName + ')'); continue; }

    /* contract: pose_* frames, pose_neutral required, upright, ONE sourceSize */
    const poses = Object.keys(atlas.frames).filter(n => n.startsWith('pose_')).map(n => n.slice(5));
    if (!poses.includes('neutral')) err('characters/' + id + ': pose_neutral frame REQUIRED');
    const rotated = Object.entries(atlas.frames).filter(([, f]) => f.rotated);
    if (rotated.length) err('characters/' + id + ': base frames must be upright (rotated:false) — re-bake via pack-atlas/import-character-sheet: ' + rotated.map(([n]) => n).join(', '));
    const sizes = new Set(Object.values(atlas.frames).map(f => f.sourceSize.w + 'x' + f.sourceSize.h));
    if (sizes.size > 1) err('characters/' + id + ': registration violation — multiple sourceSizes: ' + [...sizes].join(', '));

    let meta;
    try {
      meta = await sharp(imgPath).metadata();
    } catch (e) { err('characters/' + id + ': unreadable sheet (' + e.message + ')'); continue; }
    const declared = atlas.meta && atlas.meta.size;
    if (declared && (declared.w !== meta.width || declared.h !== meta.height)) {
      err('characters/' + id + ': sheet ' + meta.width + 'x' + meta.height + ' != atlas meta.size ' + declared.w + 'x' + declared.h);
    }
    for (const [fname, f] of Object.entries(atlas.frames)) {
      const fw = f.rotated ? f.frame.h : f.frame.w;
      const fh = f.rotated ? f.frame.w : f.frame.h;
      if (f.frame.x < 0 || f.frame.y < 0 || f.frame.x + fw > meta.width || f.frame.y + fh > meta.height) {
        err('characters/' + id + ': frame "' + fname + '" falls outside the sheet');
      }
    }

    /* clips (optional): animations must be clip_* named */
    const clipsJsonPath = path.join(dir, id + '.clips.json');
    let clips = [];
    if (fs.existsSync(clipsJsonPath)) {
      const cj = readJson(clipsJsonPath);
      if (cj) {
        clips = Object.keys(cj.animations || {}).filter(n => n.startsWith('clip_')).map(n => n.slice(5));
        if (!clips.length) warn('characters/' + id + ': clips atlas has no clip_* animations');
        const clipsImg = cj.meta && cj.meta.image && path.join(dir, cj.meta.image);
        if (!clipsImg || !fs.existsSync(clipsImg)) err('characters/' + id + ': clips meta.image missing on disk');
        for (const rel of (cj.meta && cj.meta.related_multi_packs) || []) {
          if (!fs.existsSync(path.join(dir, rel))) err('characters/' + id + ': multipack ' + rel + ' missing');
        }
      }
    }

    /* card.webp — the picker thumbnail, cropped from pose_neutral */
    const neutral = atlas.frames['pose_neutral'];
    if (neutral && !errors.some(m => m.startsWith('characters/' + id))) {
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
      } catch (e) { err('characters/' + id + ': card thumbnail failed (' + e.message + ')'); }
    }

    const charMeta = fs.existsSync(path.join(dir, 'meta.json')) ? readJson(path.join(dir, 'meta.json')) || {} : {};
    out.push({
      id,
      name: charMeta.name || { en: id.charAt(0).toUpperCase() + id.slice(1) },
      tags: charMeta.tags || [],
      poses,
      clips,
      atlasBase: URL_BASE + '/characters/' + id + '/' + id + '.base.json',
      atlasClips: clips.length ? URL_BASE + '/characters/' + id + '/' + id + '.clips.json' : null,
      card: URL_BASE + '/characters/' + id + '/card.webp',
    });
  }
  return out;
}

/* ---------------- backgrounds ---------------- */
async function buildBackgrounds() {
  const out = [];
  if (!fs.existsSync(BGS)) return out;
  const metaMap = fs.existsSync(path.join(BGS, '_meta.json')) ? readJson(path.join(BGS, '_meta.json')) || {} : {};
  const thumbsDir = path.join(BGS, 'thumbs');
  fs.mkdirSync(thumbsDir, { recursive: true });
  for (const f of fs.readdirSync(BGS).sort()) {
    if (!/@2x\.webp$/i.test(f)) continue;
    const id = f.replace(/@2x\.webp$/i, '');
    const p = path.join(BGS, f);
    let meta;
    try { meta = await sharp(p).metadata(); }
    catch (e) { err('backgrounds/' + f + ': unreadable (' + e.message + ')'); continue; }
    if (meta.width !== SCENE_W || meta.height !== SCENE_H) {
      err('backgrounds/' + f + ': is ' + meta.width + 'x' + meta.height + ', must be ' + SCENE_W + 'x' + SCENE_H);
      continue;
    }
    const bytes = fs.statSync(p).size;
    if (bytes > SCENE_CAP) warn('backgrounds/' + f + ': ' + ((bytes / 1024) | 0) + 'KB (> ' + SCENE_CAP / 1024 + 'KB scene cap — heavy on school tablets)');
    try {
      await sharp(p).resize(320, 200, { fit: 'cover' }).webp({ quality: 80 }).toFile(path.join(thumbsDir, id + '.webp'));
    } catch (e) { err('backgrounds/' + f + ': thumb failed (' + e.message + ')'); }
    const m = metaMap[id] || {};
    out.push({
      id,
      name: m.name || { en: id.replace(/-/g, ' ') },
      theme: m.theme || null,
      src: URL_BASE + '/backgrounds/' + f,
      thumb: URL_BASE + '/backgrounds/thumbs/' + id + '.webp',
      size: { w: SCENE_W, h: SCENE_H },
    });
  }
  return out;
}

/* ---------------- props (image library) ---------------- */
function buildProps() {
  /* reuse the studio-server's index logic (exported; requiring does not listen) */
  const { libraryIndex } = require('./studio-server.js');
  return libraryIndex(true);
}

(async () => {
  const characters = await buildCharacters();
  const backgrounds = await buildBackgrounds();
  const props = buildProps();

  for (const w of warns) console.log('  WARN  ' + w);
  for (const e of errors) console.log('  ERROR ' + e);
  if (errors.length) {
    console.log('\n[build-library-manifest] FAILED — ' + errors.length + ' error(s); manifests NOT written');
    process.exit(1);
  }

  const manifest = {
    schemaVersion: 'sblib-1',
    generatedAt: new Date().toISOString(),
    characters,
    backgrounds,
  };
  fs.writeFileSync(path.join(LIB, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  fs.writeFileSync(path.join(LIB, 'props-manifest.json'), JSON.stringify(props, null, 2) + '\n');
  console.log('[build-library-manifest] OK — ' + characters.length + ' character(s), ' +
    backgrounds.length + ' background(s), ' + props.themes.length + ' prop theme(s); ' + warns.length + ' warning(s)');
})().catch(e => { console.error('[build-library-manifest] crashed: ' + (e.stack || e)); process.exit(1); });
