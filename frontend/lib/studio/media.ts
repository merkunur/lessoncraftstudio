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

/** Typed error the routes translate to a 400. */
export class StudioMediaError extends Error {}
