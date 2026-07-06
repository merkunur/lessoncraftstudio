// Story Studio tenancy — filesystem roots + traversal-guarded resolution.
//
// Tenant binaries live OUTSIDE the deploy tree (blog isolated-storage
// precedent, lib/upload.ts): production /var/www/lcs-media/studio/stories,
// dev <frontend>/.studio-stories (NOT under public/ — reads go through the
// tokened /api/play route, never static serving).

import path from 'path';
import fs from 'fs';

function sourceRoot(): string {
  const cwd = process.cwd();
  if (cwd.includes('.next' + path.sep + 'standalone') || cwd.includes('.next/standalone')) {
    return path.resolve(cwd, '../..');
  }
  return cwd;
}

function firstExisting(candidates: Array<string | undefined>, fallback: string): string {
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return fallback;
}

/** Root holding one directory per StudioStory id. */
export const STUDIO_MEDIA_ROOT: string =
  process.env.STUDIO_MEDIA_ROOT ||
  (process.env.NODE_ENV === 'production'
    ? '/var/www/lcs-media/studio/stories'
    : path.join(sourceRoot(), '.studio-stories'));

/** Deployed mini-tools static dir (operator stories, platform storybook-library). */
export const STUDIO_MINI_TOOLS_DIR: string =
  process.env.STUDIO_MINI_TOOLS_DIR ||
  firstExisting(
    [
      process.env.NODE_ENV === 'production' ? '/var/www/lcs-media/mini-tools' : undefined,
      path.join(sourceRoot(), 'public', 'mini-tools'),
    ],
    path.join(sourceRoot(), 'public', 'mini-tools')
  );

/** The GLOBAL storybook asset library (characters/backgrounds). The LIVE
 *  served tree is authoritative (the git copy under "mini tools/" is the
 *  bootstrap seed); the admin library manager writes here directly and the
 *  studio backup cron covers it. */
export const STORYBOOK_LIBRARY_ROOT: string =
  process.env.STORYBOOK_LIBRARY_ROOT ||
  path.join(STUDIO_MINI_TOOLS_DIR, 'storybook-library');

/** The worksheet-generator image library (props). Repo-root sibling of frontend/. */
export const STUDIO_IMAGE_LIBRARY_THEMES_DIR: string =
  process.env.STUDIO_IMAGE_LIBRARY_DIR ||
  firstExisting(
    [
      '/opt/lessoncraftstudio/image-library-webp/themes',
      path.join(sourceRoot(), '..', 'image-library-webp', 'themes'),
      path.join(sourceRoot(), 'public', 'image-library-webp', 'themes'),
    ],
    path.join(sourceRoot(), '..', 'image-library-webp', 'themes')
  );

export function studioStoryDir(storyId: string): string {
  // Story ids are cuids (lowercase alnum) — enforce shape defensively anyway.
  if (!/^[a-z0-9-]+$/.test(storyId)) throw new Error('bad story id');
  return path.join(STUDIO_MEDIA_ROOT, storyId);
}

/**
 * Resolve a client-supplied relative path inside a story dir. Rejects
 * traversal, absolute paths, backslashes, and empty segments. Returns the
 * absolute path or null when the input is unsafe.
 */
export function resolveTenantPath(storyId: string, relPath: string): string | null {
  const raw = String(relPath || '');
  if (!raw || raw.includes('\\') || raw.includes('\0')) return null;
  const segs = raw.split('/').filter(Boolean);
  if (!segs.length) return null;
  for (const s of segs) {
    if (s === '.' || s === '..') return null;
  }
  const dir = studioStoryDir(storyId);
  const abs = path.join(dir, ...segs);
  // Belt-and-braces: the joined path must stay inside the story dir.
  if (!abs.startsWith(dir + path.sep) && abs !== dir) return null;
  return abs;
}

export const STUDIO_MIME: Record<string, string> = {
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
};

export function studioMimeFor(filePath: string): string {
  return STUDIO_MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

/** Recursive byte count of a story dir (quota reconciliation + delta checks). */
export function dirBytes(dir: string): number {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) total += dirBytes(p);
    else if (entry.isFile()) total += fs.statSync(p).size;
  }
  return total;
}
