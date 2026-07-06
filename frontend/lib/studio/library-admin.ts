// Storybook GLOBAL library administration — the write side behind the
// /api/admin/storybook-library routes (the operator's library manager).
//
// The LIVE library tree (STORYBOOK_LIBRARY_ROOT — prod:
// /var/www/lcs-media/mini-tools/storybook-library, served statically through
// the public/mini-tools symlink) is authoritative; every mutation finishes
// with a TOLERANT manifest rebuild through the SAME engine the CLI uses
// (scripts/storybook/lib/library-core.js), so contract enforcement can never
// drift. Broken assets are excluded from the manifest but reported per-asset
// so the manager UI can show exactly what's wrong.
//
// Character/clips baking reuses the media.ts pure bake functions — the exact
// pipelines the per-story admin uploads use.

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
  bakeCharacterSheet,
  bakeCharacterClips,
  bakeSingleImageCharacter,
  frameSlug,
  sniffImageExt,
  StudioMediaError,
} from './media';
import { STORYBOOK_LIBRARY_ROOT } from './paths';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildLibraryManifest } = require('../../../scripts/storybook/lib/library-core.js');

const SCENE_W = 1600;
const SCENE_H = 1000;

export class LibraryAdminError extends Error {}

const ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

export function slugifyName(name: string): string {
  return (
    String(name || '')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .slice(0, 64) || ''
  );
}

/** Traversal-guarded asset dir/file resolution inside the library root. */
export function libAssetPath(kind: 'characters' | 'backgrounds', id: string, ...rest: string[]): string {
  if (!ID_RE.test(id)) throw new LibraryAdminError('Bad asset id');
  const abs = path.join(STORYBOOK_LIBRARY_ROOT, kind, id, ...rest);
  const rootWithSep = STORYBOOK_LIBRARY_ROOT + path.sep;
  if (!abs.startsWith(rootWithSep)) throw new LibraryAdminError('Bad asset path');
  return abs;
}

function uniqueCharacterId(base: string): string {
  let id = base || 'character';
  let n = 2;
  while (fs.existsSync(path.join(STORYBOOK_LIBRARY_ROOT, 'characters', id))) id = base + '-' + n++;
  return id;
}
function uniqueBackgroundId(base: string): string {
  let id = base || 'background';
  let n = 2;
  while (fs.existsSync(path.join(STORYBOOK_LIBRARY_ROOT, 'backgrounds', id + '@2x.webp'))) id = base + '-' + n++;
  return id;
}

export interface LibReport {
  errors: string[];
  warns: string[];
  perAsset: {
    characters: Record<string, { errors: string[]; warns: string[] }>;
    backgrounds: Record<string, { errors: string[]; warns: string[] }>;
  };
}

/* One rebuild at a time per process (mutations are operator-serial anyway;
   a queued rebuild after the current one heals any interleave). */
let rebuildChain: Promise<unknown> = Promise.resolve();
function queued<T>(fn: () => Promise<T>): Promise<T> {
  const next = rebuildChain.then(fn, fn);
  rebuildChain = next.catch(() => {});
  return next;
}

export function rebuildLibraryManifest(): Promise<LibReport> {
  return queued(async () => {
    // sharp injected: the top-level TS import is externalized by Next; a deep
    // CJS require inside the bundled core would be webpack-bundled and the
    // native binary cannot load from a chunk (prod-observed 2026-07-06).
    const res = await buildLibraryManifest(STORYBOOK_LIBRARY_ROOT, { tolerant: true, write: true, sharpImpl: sharp });
    return { errors: res.errors, warns: res.warns, perAsset: res.perAsset };
  });
}

export function libraryReport(): Promise<LibReport> {
  return queued(async () => {
    const res = await buildLibraryManifest(STORYBOOK_LIBRARY_ROOT, { tolerant: true, write: false, sharpImpl: sharp });
    return { errors: res.errors, warns: res.warns, perAsset: res.perAsset };
  });
}

export function readLibraryManifest(): any | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(STORYBOOK_LIBRARY_ROOT, 'manifest.json'), 'utf8'));
  } catch {
    return null;
  }
}

function writeCharacterMeta(dir: string, name: { en: string; de?: string }, tags: string[]) {
  const meta: any = { name: { en: name.en }, tags };
  if (name.de) meta.name.de = name.de;
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
}

export async function addLibraryCharacter(input: {
  nameEn: string;
  nameDe?: string;
  tags: string[];
  atlas?: any; // TexturePacker JSON-Hash → full sheet re-bake; absent → one-pose synth
  imageBuf: Buffer;
  neutralPose?: string; // sheet mode: which frame (name or slug) is the resting pose when none is named "neutral"
}): Promise<{ id: string; poses: string[] }> {
  const base = slugifyName(input.nameEn);
  if (!base) throw new LibraryAdminError('Give the character a name (letters/numbers)');
  const id = uniqueCharacterId(base);

  const baked = input.atlas
    ? await bakeCharacterSheet(input.atlas, input.imageBuf)
    : { ...(await bakeSingleImageCharacter(input.imageBuf)), poses: ['neutral'] as string[] };

  // The library contract requires pose_neutral (card.webp + picker default),
  // but real TexturePacker exports name frames after the art files. ALIAS the
  // chosen resting pose (default: first frame) as a second atlas key pointing
  // at the same rect — the original pose name stays valid.
  if (input.atlas && !baked.poses.includes('neutral')) {
    const wanted = input.neutralPose ? frameSlug(input.neutralPose) : '';
    const target = wanted && baked.poses.includes(wanted) ? wanted : baked.poses[0];
    baked.atlas.frames['pose_neutral'] = { ...baked.atlas.frames['pose_' + target] };
    baked.poses = ['neutral', ...baked.poses];
  }

  const dir = libAssetPath('characters', id);
  fs.mkdirSync(dir, { recursive: true });
  const imgName = id + '.base.webp';
  const sheetBuf: Buffer = 'sheetBuf' in baked ? (baked as any).sheetBuf : (baked as any).imageBuf;
  fs.writeFileSync(path.join(dir, imgName), sheetBuf);
  const atlas = { ...baked.atlas, meta: { ...baked.atlas.meta, image: imgName } };
  fs.writeFileSync(path.join(dir, id + '.base.json'), JSON.stringify(atlas));
  writeCharacterMeta(dir, { en: input.nameEn, de: input.nameDe }, input.tags);

  return { id, poses: baked.poses };
}

export async function addLibraryCharacterClips(
  id: string,
  atlas: any,
  imageBuf: Buffer
): Promise<{ clips: string[] }> {
  const dir = libAssetPath('characters', id);
  if (!fs.existsSync(dir)) throw new LibraryAdminError('Unknown character "' + id + '" — upload the character first');
  const baked = await bakeCharacterClips(id, atlas, imageBuf);
  fs.writeFileSync(path.join(dir, baked.imgName), baked.imgBuf);
  fs.writeFileSync(path.join(dir, id + '.clips.json'), JSON.stringify(baked.atlas));
  return { clips: baked.clips };
}

export function setLibraryCharacterMeta(
  id: string,
  patch: { name?: { en?: string; de?: string }; tags?: string[] }
): void {
  const dir = libAssetPath('characters', id);
  if (!fs.existsSync(dir)) throw new LibraryAdminError('Unknown character "' + id + '"');
  const metaPath = path.join(dir, 'meta.json');
  let meta: any = {};
  try {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch {
    meta = {};
  }
  meta.name = meta.name || {};
  if (patch.name && typeof patch.name.en === 'string' && patch.name.en.trim()) meta.name.en = patch.name.en.trim();
  if (patch.name && typeof patch.name.de === 'string') {
    if (patch.name.de.trim()) meta.name.de = patch.name.de.trim();
    else delete meta.name.de;
  }
  if (Array.isArray(patch.tags)) meta.tags = patch.tags.map((t) => String(t).trim()).filter(Boolean);
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
}

export function deleteLibraryCharacter(id: string): void {
  const dir = libAssetPath('characters', id);
  if (!fs.existsSync(dir)) throw new LibraryAdminError('Unknown character "' + id + '"');
  fs.rmSync(dir, { recursive: true, force: true });
}

function readBgMeta(): any {
  try {
    return JSON.parse(fs.readFileSync(path.join(STORYBOOK_LIBRARY_ROOT, 'backgrounds', '_meta.json'), 'utf8'));
  } catch {
    return {};
  }
}
function writeBgMeta(map: any) {
  const dir = path.join(STORYBOOK_LIBRARY_ROOT, 'backgrounds');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '_meta.json'), JSON.stringify(map, null, 2) + '\n');
}

export async function addLibraryBackground(input: {
  nameEn: string;
  nameDe?: string;
  theme?: string | null;
  buf: Buffer;
}): Promise<{ id: string; bytes: number }> {
  if (!sniffImageExt(input.buf)) throw new LibraryAdminError('That file is not a PNG, JPG, WEBP, or GIF image');
  const base = slugifyName(input.nameEn);
  if (!base) throw new LibraryAdminError('Give the background a name (letters/numbers)');
  const id = uniqueBackgroundId(base);

  let out: Buffer;
  try {
    out = await sharp(input.buf, { animated: false })
      .rotate()
      .resize({ width: SCENE_W, height: SCENE_H, fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();
  } catch (e: any) {
    throw new LibraryAdminError('Could not read that image (' + e.message + ')');
  }
  const dir = path.join(STORYBOOK_LIBRARY_ROOT, 'backgrounds');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, id + '@2x.webp'), out);

  const map = readBgMeta();
  map[id] = { name: { en: input.nameEn, ...(input.nameDe ? { de: input.nameDe } : {}) }, theme: input.theme || null };
  writeBgMeta(map);
  return { id, bytes: out.length };
}

export function setLibraryBackgroundMeta(
  id: string,
  patch: { name?: { en?: string; de?: string }; theme?: string | null }
): void {
  if (!ID_RE.test(id)) throw new LibraryAdminError('Bad asset id');
  const file = path.join(STORYBOOK_LIBRARY_ROOT, 'backgrounds', id + '@2x.webp');
  if (!fs.existsSync(file)) throw new LibraryAdminError('Unknown background "' + id + '"');
  const map = readBgMeta();
  const cur = map[id] || {};
  cur.name = cur.name || {};
  if (patch.name && typeof patch.name.en === 'string' && patch.name.en.trim()) cur.name.en = patch.name.en.trim();
  if (patch.name && typeof patch.name.de === 'string') {
    if (patch.name.de.trim()) cur.name.de = patch.name.de.trim();
    else delete cur.name.de;
  }
  if (patch.theme !== undefined) cur.theme = patch.theme ? String(patch.theme).trim() : null;
  map[id] = cur;
  writeBgMeta(map);
}

export function deleteLibraryBackground(id: string): void {
  if (!ID_RE.test(id)) throw new LibraryAdminError('Bad asset id');
  const dir = path.join(STORYBOOK_LIBRARY_ROOT, 'backgrounds');
  const file = path.join(dir, id + '@2x.webp');
  if (!fs.existsSync(file)) throw new LibraryAdminError('Unknown background "' + id + '"');
  fs.rmSync(file, { force: true });
  fs.rmSync(path.join(dir, 'thumbs', id + '.webp'), { force: true });
  const map = readBgMeta();
  delete map[id];
  writeBgMeta(map);
}
