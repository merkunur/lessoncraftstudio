// Story Studio tenancy — binary intake helpers shared by the /api/studio
// upload routes. Ports the local studio-server.js pipelines (magic-byte
// sniffing, single-frame character atlas, content-addressed naming) with a
// sharp sanitize pass for anything a browser will render.

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { STUDIO_SCENE_W, STUDIO_SCENE_H } from './config';
import { studioStoryDir } from './paths';

export type SniffedExt = 'png' | 'jpg' | 'webp' | 'gif' | null;

/** Magic-byte image sniffing (identical semantics to studio-server.js). */
export function sniffImageExt(buf: Buffer): SniffedExt {
  if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buf.length > 6 && buf.toString('ascii', 0, 3) === 'GIF') return 'gif';
  return null;
}

export function sha1Hex(buf: Buffer): string {
  return crypto.createHash('sha1').update(buf).digest('hex');
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Sanitize + store a general picture upload: re-encode to webp (strips
 * metadata, caps dimensions), content-addressed name under uploads/.
 * Returns the canonical-relative path ('uploads/<sha12>.webp') + bytes written.
 */
export async function importImage(storyId: string, buf: Buffer) {
  if (!sniffImageExt(buf)) throw new StudioMediaError('That file is not a PNG, JPG, WEBP, or GIF image');
  let out: Buffer;
  try {
    out = await sharp(buf, { animated: false })
      .rotate() // honor EXIF orientation
      .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer();
  } catch (e: any) {
    throw new StudioMediaError('Could not read that image (' + e.message + ')');
  }
  const name = sha1Hex(out).slice(0, 12) + '.webp';
  const dir = path.join(studioStoryDir(storyId), 'uploads');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, name), out);
  return { rel: 'uploads/' + name, bytes: out.length };
}

/**
 * Scene upload: cover-fit to the 1600×1000 design space, webp. Returns
 * canonical-relative path ('scenes/<sha12>.webp') + bytes.
 */
export async function importScene(storyId: string, buf: Buffer) {
  if (!sniffImageExt(buf)) throw new StudioMediaError('That file is not a PNG, JPG, WEBP, or GIF image');
  let out: Buffer;
  try {
    out = await sharp(buf, { animated: false })
      .rotate()
      .resize({ width: STUDIO_SCENE_W, height: STUDIO_SCENE_H, fit: 'cover' })
      .webp({ quality: 88 })
      .toBuffer();
  } catch (e: any) {
    throw new StudioMediaError('Could not read that image (' + e.message + ')');
  }
  const name = sha1Hex(out).slice(0, 12) + '.webp';
  const dir = path.join(studioStoryDir(storyId), 'scenes');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, name), out);
  return { rel: 'scenes/' + name, bytes: out.length, file: name };
}

/**
 * Single-image character: stores the sanitized image + a one-frame atlas
 * (pose_neutral = the whole image), exactly the local server's shape, so it
 * renders through the existing atlas pipeline in both the Studio canvas and
 * the PIXI player.
 */
export async function importSingleImageCharacter(storyId: string, buf: Buffer, requestedName: string) {
  if (!sniffImageExt(buf)) throw new StudioMediaError('That file is not a PNG, JPG, WEBP, or GIF image');
  let out: Buffer;
  let W = 0;
  let H = 0;
  try {
    out = await sharp(buf, { animated: false })
      .rotate()
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer();
    const meta = await sharp(out).metadata();
    W = meta.width || 0;
    H = meta.height || 0;
  } catch (e: any) {
    throw new StudioMediaError('Could not read that image (' + e.message + ')');
  }
  if (!W || !H) throw new StudioMediaError('Could not read the image dimensions');

  let slug =
    String(requestedName || '')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'character';
  const castRoot = path.join(studioStoryDir(storyId), 'cast');
  if (fs.existsSync(path.join(castRoot, slug))) slug = slug + '-' + sha1Hex(out).slice(0, 4);
  const dir = path.join(castRoot, slug);
  ensureDir(dir);

  const imgName = slug + '.base.webp';
  fs.writeFileSync(path.join(dir, imgName), out);
  const atlas = {
    frames: {
      pose_neutral: {
        frame: { x: 0, y: 0, w: W, h: H },
        rotated: false,
        trimmed: false,
        spriteSourceSize: { x: 0, y: 0, w: W, h: H },
        sourceSize: { w: W, h: H },
      },
    },
    meta: { app: 'lcs-upload', version: '1.0', image: imgName, format: 'RGBA8888', size: { w: W, h: H }, scale: '1' },
  };
  const atlasJson = JSON.stringify(atlas);
  fs.writeFileSync(path.join(dir, slug + '.base.json'), atlasJson);

  return {
    characterId: slug,
    relAtlas: 'cast/' + slug + '/' + slug + '.base.json',
    poses: ['neutral'],
    bytes: out.length + Buffer.byteLength(atlasJson),
  };
}

/**
 * ADMIN: TexturePacker JSON-Hash character sheet → a fully NORMALIZED base
 * atlas (rotated:false, trimmed:false, frames renamed pose_<slug>, uniform
 * grid) so it renders identically in the Studio canvas (which ignores
 * `rotated`) and the PIXI player. Port of studio-server.js
 * /studio/import-character-sheet (UNROTATE_DEG verified there).
 */
export async function importCharacterSheet(
  storyId: string,
  body: { name?: string; atlas?: any; imageBase64?: string }
) {
  const atlas = body && body.atlas;
  if (!atlas || typeof atlas !== 'object' || !atlas.frames || typeof atlas.frames !== 'object') {
    throw new StudioMediaError('That .json is not a TexturePacker atlas (no "frames") — export "JSON (Hash)" from TexturePacker');
  }
  const frameNames = Object.keys(atlas.frames);
  if (!frameNames.length) throw new StudioMediaError('The atlas has no frames');
  const imgBuf = Buffer.from(String(body.imageBase64 || ''), 'base64');
  if (!imgBuf.length) throw new StudioMediaError('No sheet image was sent — also select the .webp/.png, not just the .json');
  if (!sniffImageExt(imgBuf)) throw new StudioMediaError('The sheet is not a PNG, JPG, WEBP, or GIF image');

  let sheetW = 0;
  let sheetH = 0;
  try {
    const meta = await sharp(imgBuf).metadata();
    sheetW = meta.width || 0;
    sheetH = meta.height || 0;
  } catch (e: any) {
    throw new StudioMediaError('Could not read the sheet image (' + e.message + ')');
  }
  if (!sheetW || !sheetH) throw new StudioMediaError('Could not read the sheet dimensions');
  const declared = atlas.meta && atlas.meta.size;
  if (declared && (declared.w !== sheetW || declared.h !== sheetH)) {
    throw new StudioMediaError(
      'The image (' + sheetW + '×' + sheetH + ') does not match this atlas (expected ' +
      declared.w + '×' + declared.h + ') — did you pick the matching pair?'
    );
  }

  const UNROTATE_DEG = 270; /* undo TexturePacker's 90° clockwise packing rotation */
  const usedSlugs: Record<string, number> = {};
  const poses: string[] = [];
  const cells: Array<{ slug: string; buf: Buffer; w: number; h: number }> = [];
  for (const fname of frameNames) {
    const f = atlas.frames[fname] || {};
    const frame = f.frame || {};
    const rotated = !!f.rotated;
    const src = f.sourceSize && f.sourceSize.w ? f.sourceSize : { w: frame.w, h: frame.h };
    const sss =
      f.spriteSourceSize && typeof f.spriteSourceSize.x === 'number'
        ? f.spriteSourceSize
        : { x: 0, y: 0, w: frame.w, h: frame.h };
    const rw = rotated ? frame.h : frame.w;
    const rh = rotated ? frame.w : frame.h;
    if (!(rw > 0) || !(rh > 0) || frame.x < 0 || frame.y < 0 || frame.x + rw > sheetW || frame.y + rh > sheetH) {
      throw new StudioMediaError('Frame "' + fname + '" falls outside the sheet — the image and .json do not match');
    }
    const cropBuf = await sharp(imgBuf)
      .extract({ left: frame.x | 0, top: frame.y | 0, width: rw | 0, height: rh | 0 })
      .png()
      .toBuffer();
    let sprite = sharp(cropBuf);
    if (rotated) sprite = sprite.rotate(UNROTATE_DEG);
    const spriteBuf = await sprite.png().toBuffer();
    const cellBuf = await sharp({
      create: { width: src.w | 0, height: src.h | 0, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: spriteBuf, left: Math.max(0, sss.x | 0), top: Math.max(0, sss.y | 0) }])
      .png()
      .toBuffer();
    let slug =
      String(fname).replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'pose';
    const base = slug;
    let k = 2;
    while (usedSlugs[slug]) slug = base + '-' + k++;
    usedSlugs[slug] = 1;
    poses.push(slug);
    cells.push({ slug, buf: cellBuf, w: src.w | 0, h: src.h | 0 });
  }

  /* lay the normalized pose cells into a uniform grid */
  const cellW = cells.reduce((mx, c) => Math.max(mx, c.w), 1);
  const cellH = cells.reduce((mx, c) => Math.max(mx, c.h), 1);
  const cols = Math.ceil(Math.sqrt(cells.length));
  const rows = Math.ceil(cells.length / cols);
  const outFrames: Record<string, any> = {};
  const composites: Array<{ input: Buffer; left: number; top: number }> = [];
  cells.forEach((c, i) => {
    const x = (i % cols) * cellW;
    const y = Math.floor(i / cols) * cellH;
    outFrames['pose_' + c.slug] = {
      frame: { x, y, w: c.w, h: c.h },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: c.w, h: c.h },
      sourceSize: { w: c.w, h: c.h },
    };
    composites.push({ input: c.buf, left: x, top: y });
  });
  const sheetBuf = await sharp({
    create: { width: cols * cellW, height: rows * cellH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite(composites)
    .webp()
    .toBuffer();

  let slug =
    String(body.name || '').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'character';
  const castRoot = path.join(studioStoryDir(storyId), 'cast');
  if (fs.existsSync(path.join(castRoot, slug))) slug = slug + '-' + sha1Hex(sheetBuf).slice(0, 4);
  const dir = path.join(castRoot, slug);
  ensureDir(dir);
  const imgName = slug + '.base.webp';
  fs.writeFileSync(path.join(dir, imgName), sheetBuf);
  const outAtlas = {
    frames: outFrames,
    meta: { app: 'lcs-sheet', version: '1.0', image: imgName, format: 'RGBA8888', size: { w: cols * cellW, h: rows * cellH }, scale: '1' },
  };
  const atlasJson = JSON.stringify(outAtlas);
  fs.writeFileSync(path.join(dir, slug + '.base.json'), atlasJson);

  return {
    characterId: slug,
    relAtlas: 'cast/' + slug + '/' + slug + '.base.json',
    poses,
    bytes: sheetBuf.length + Buffer.byteLength(atlasJson),
  };
}

/**
 * ADMIN: add ANIMATION CLIPS to an existing character. Pass-through (the
 * PIXI parser honors rotated/trimmed) — the sheet is stored as-is and the
 * .clips.json regroups frames into clip_<name> animations. Port of
 * studio-server.js /studio/import-character-clips.
 */
export async function importCharacterClips(
  storyId: string,
  charSlugRaw: string,
  body: { atlas?: any; imageBase64?: string }
) {
  const charSlug = String(charSlugRaw || '').replace(/[^a-z0-9-]/gi, '').toLowerCase();
  const dir = charSlug && path.join(studioStoryDir(storyId), 'cast', charSlug);
  if (!charSlug || !dir || !fs.existsSync(dir)) {
    throw new StudioMediaError('Unknown character "' + charSlug + '" — upload the character first');
  }
  const atlas = body && body.atlas;
  if (!atlas || typeof atlas !== 'object' || !atlas.frames || typeof atlas.frames !== 'object') {
    throw new StudioMediaError('That .json is not a TexturePacker atlas (no "frames")');
  }
  const imgBuf = Buffer.from(String(body.imageBase64 || ''), 'base64');
  if (!imgBuf.length) throw new StudioMediaError('No animation sheet image was sent — also select the .webp/.png, not just the .json');
  const ext = sniffImageExt(imgBuf);
  if (!ext) throw new StudioMediaError('The animation sheet is not a PNG, JPG, WEBP, or GIF image');
  try {
    const meta = await sharp(imgBuf).metadata();
    const d = atlas.meta && atlas.meta.size;
    if (d && (d.w !== (meta.width || 0) || d.h !== (meta.height || 0))) {
      throw new StudioMediaError(
        'The sheet (' + meta.width + '×' + meta.height + ') does not match this atlas (expected ' +
        d.w + '×' + d.h + ') — did you pick the matching pair?'
      );
    }
  } catch (e) {
    if (e instanceof StudioMediaError) throw e;
    /* sharp optional here — pass-through does not crop */
  }

  const stripExt = (n: string) => String(n).replace(/\.[a-z0-9]+$/i, '');
  const slugify = (s: string) => String(s).replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
  const groups: Record<string, Array<{ origName: string; num: number }>> = {};
  if (atlas.animations && typeof atlas.animations === 'object' && Object.keys(atlas.animations).length) {
    Object.keys(atlas.animations).forEach(anim => {
      const gs = slugify(anim) || 'clip';
      groups[gs] = (atlas.animations[anim] || [])
        .filter((fn: string) => atlas.frames[fn])
        .map((fn: string, i: number) => ({ origName: fn, num: i }));
    });
  } else {
    Object.keys(atlas.frames).forEach(fn => {
      const bareBase = stripExt(fn);
      const mm = bareBase.match(/^(.*?)[ _\-]?(\d+)$/);
      const base = slugify(mm ? mm[1] : bareBase) || 'clip';
      const num = mm ? parseInt(mm[2], 10) : 0;
      (groups[base] = groups[base] || []).push({ origName: fn, num });
    });
    Object.keys(groups).forEach(g => groups[g].sort((a, b) => a.num - b.num));
  }
  const groupNames = Object.keys(groups).filter(g => groups[g].length);
  if (!groupNames.length) throw new StudioMediaError('No animation frames found in that sheet');

  const outFrames: Record<string, any> = {};
  const outAnims: Record<string, string[]> = {};
  groupNames.forEach(g => {
    const keys: string[] = [];
    groups[g].forEach((fr, i) => {
      const src = atlas.frames[fr.origName];
      const key = 'clip_' + g + '_' + String(i + 1).padStart(4, '0');
      outFrames[key] = {
        frame: src.frame,
        rotated: !!src.rotated,
        trimmed: !!src.trimmed,
        spriteSourceSize: src.spriteSourceSize || { x: 0, y: 0, w: src.frame.w, h: src.frame.h },
        sourceSize: src.sourceSize || { w: src.frame.w, h: src.frame.h },
      };
      keys.push(key);
    });
    outAnims['clip_' + g] = keys;
  });
  const imgName = charSlug + '.clips.' + ext;
  const outAtlas = {
    frames: outFrames,
    animations: outAnims,
    meta: { app: 'lcs-sheet', version: '1.0', image: imgName, format: 'RGBA8888', size: (atlas.meta && atlas.meta.size) || { w: 0, h: 0 }, scale: '1' },
  };
  const atlasJson = JSON.stringify(outAtlas);
  fs.writeFileSync(path.join(dir, imgName), imgBuf);
  fs.writeFileSync(path.join(dir, charSlug + '.clips.json'), atlasJson);

  return {
    characterId: charSlug,
    relClips: 'cast/' + charSlug + '/' + charSlug + '.clips.json',
    clips: groupNames,
    bytes: imgBuf.length + Buffer.byteLength(atlasJson),
  };
}

/** Typed error the routes translate to a 400. */
export class StudioMediaError extends Error {}
