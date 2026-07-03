// Story Studio tenancy — SEP exercise intake.
//
// Two intake shapes land on ONE writer:
//   (a) In-memory package from the in-studio generator bridge:
//       multipart FormData with a `descriptor` JSON field + one file part per
//       package file (field name = the in-package path, e.g. 'visual@2x.webp',
//       'assets/reveal-3.webp').
//   (b) The manual `sep_*.zip` path (kept for the upload field in
//       sb-mod-worksheet-exercise): a single 'zip' file part, or a raw
//       application/zip body.
//
// exId = <appType>-<sha1[:6]> over the package bytes — same convention as the
// local studio-server, so re-importing the identical exercise dedupes to the
// same folder.

import fs from 'fs';
import path from 'path';
import { STUDIO_QUOTAS } from './config';
import { studioStoryDir } from './paths';
import { sha1Hex, StudioMediaError } from './media';

interface SepFile {
  rel: string; // safe, forward-slash relative path inside the package
  data: Buffer;
}

const SAFE_REL_RE = /^[A-Za-z0-9._@-]+(\/[A-Za-z0-9._@-]+)*$/;

function safeRel(name: string): string | null {
  const norm = String(name || '').replace(/\\/g, '/');
  const segs = norm.split('/').filter(s => s && s !== '.' && s !== '..');
  const joined = segs.join('/');
  if (!joined || !SAFE_REL_RE.test(joined)) return null;
  return joined;
}

function validateDescriptor(desc: any): string | null {
  if (!desc || typeof desc !== 'object') return 'descriptor.json is not valid JSON';
  if (desc.formatVersion !== 'sep-1') {
    return 'not a sep-1 worksheet export (formatVersion=' + desc.formatVersion + ')';
  }
  if (!desc.visual || typeof desc.visual.file !== 'string') return 'descriptor has no visual file';
  return null;
}

function writePackage(storyId: string, appTypeRaw: string, files: SepFile[]) {
  const appType = String(appTypeRaw || 'worksheet')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
  const hash = sha1Hex(Buffer.concat(files.map(f => f.data)));
  const exId = appType + '-' + hash.slice(0, 6);
  const outDir = path.join(studioStoryDir(storyId), 'exercises', exId);
  fs.mkdirSync(outDir, { recursive: true });
  let bytes = 0;
  for (const f of files) {
    const dest = path.join(outDir, ...f.rel.split('/'));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, f.data);
    bytes += f.data.length;
  }
  return { exId, pkg: 'exercises/' + exId, bytes };
}

/** Intake (a): FormData with descriptor field + file parts. */
export async function importExerciseFromFormData(storyId: string, form: FormData) {
  const descRaw = form.get('descriptor');
  if (typeof descRaw !== 'string') throw new StudioMediaError('Missing descriptor field');
  let desc: any;
  try {
    desc = JSON.parse(descRaw);
  } catch {
    throw new StudioMediaError('descriptor is not valid JSON');
  }
  const bad = validateDescriptor(desc);
  if (bad) throw new StudioMediaError(bad);

  const files: SepFile[] = [{ rel: 'descriptor.json', data: Buffer.from(JSON.stringify(desc, null, 2)) }];
  let total = files[0].data.length;
  const entries = Array.from(form.entries());
  for (const [key, value] of entries) {
    if (key === 'descriptor' || typeof value === 'string') continue;
    const rel = safeRel(key);
    if (!rel || rel === 'descriptor.json') continue;
    const data = Buffer.from(await (value as File).arrayBuffer());
    total += data.length;
    if (total > STUDIO_QUOTAS.MAX_SEP_PACKAGE_BYTES) {
      throw new StudioMediaError('That exercise package is too large');
    }
    files.push({ rel, data });
  }
  if (!files.some(f => f.rel === desc.visual.file)) {
    throw new StudioMediaError('The package is missing its visual file (' + desc.visual.file + ')');
  }
  return { ...writePackage(storyId, desc.appType, files), appType: desc.appType, family: desc.family };
}

/** Intake (b): a sep_*.zip buffer (manual upload path). */
export function importExerciseFromZip(storyId: string, buf: Buffer) {
  if (buf.length > STUDIO_QUOTAS.MAX_SEP_PACKAGE_BYTES) {
    throw new StudioMediaError('That exercise package is too large');
  }
  let AdmZip: any;
  try {
    // adm-zip lives in the REPO ROOT package.json (not frontend/). Node's
    // runtime resolution walks up from frontend/ to the root node_modules,
    // but webpack must NOT try to bundle it — hence the opaque require.
    // Falls through to a clean 400 when unavailable; the FormData intake
    // (the in-studio generator bridge) never needs zip support.
    // eslint-disable-next-line no-eval
    AdmZip = eval('require')('adm-zip');
  } catch {
    throw new StudioMediaError('Zip support is not available on the server');
  }
  let zip: any;
  try {
    zip = new AdmZip(buf);
  } catch {
    throw new StudioMediaError('That file is not a valid .zip');
  }
  const dEntry = zip.getEntry('descriptor.json');
  if (!dEntry) {
    throw new StudioMediaError('The zip has no descriptor.json — is it an "Export for Storybook" file?');
  }
  let desc: any;
  try {
    desc = JSON.parse(zip.readAsText(dEntry));
  } catch {
    throw new StudioMediaError('descriptor.json is not valid JSON');
  }
  const bad = validateDescriptor(desc);
  if (bad) throw new StudioMediaError(bad);

  const files: SepFile[] = [];
  for (const e of zip.getEntries()) {
    if (e.isDirectory) continue;
    const rel = safeRel(e.entryName);
    if (!rel) continue;
    files.push({ rel, data: e.getData() });
  }
  return { ...writePackage(storyId, desc.appType, files), appType: desc.appType, family: desc.family };
}
