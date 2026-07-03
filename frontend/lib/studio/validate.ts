// Story Studio tenancy — server-side story validation.
//
// Runs the SAME validator core the author-time CLI uses
// (scripts/storybook/lib/validate-core.js — plain CJS, bundled by webpack
// into the route at build time, so standalone deploys carry it without
// shipping scripts/) against a TENANT story: JSON comes from Postgres,
// binaries live under studioStoryDir(storyId), platform assets resolve to
// the deployed static dirs.

import path from 'path';
import fs from 'fs';

import {
  STUDIO_MINI_TOOLS_DIR,
  STUDIO_IMAGE_LIBRARY_THEMES_DIR,
  studioStoryDir,
  resolveTenantPath,
} from './paths';
import { STUDIO_CANONICAL_PREFIX } from './config';

// Plain CJS module outside the TS root; only fs/path/vm requires (+ optional
// sharp), so webpack bundles it cleanly. Typed via the cast below.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { validateStoryCore } = require('../../../scripts/storybook/lib/validate-core.js') as {
  validateStoryCore: (opts: {
    story: any;
    strings: any;
    storyDir: string;
    miniDir: string;
    repoDir: string;
    resolveUrl?: (src: string) => string | null;
    band?: any;
    strictAudio?: boolean;
    moduleFiles?: string[];
  }) => Promise<{ errors: string[]; warns: string[] }>;
};

/** Join a decoded relative URL path under a static root; null on traversal. */
function safeStaticPath(root: string, rel: string): string | null {
  if (!rel || rel.includes('\\') || rel.includes('\0')) return null;
  const segs = rel.split('/').filter(Boolean);
  if (!segs.length) return null;
  for (const s of segs) {
    if (s === '.' || s === '..') return null;
  }
  return path.join(root, ...segs);
}

/**
 * Tenant asset-URL resolver (receives the %-decoded src from the core):
 *   /studio-media/<thisStoryId>/<rel> -> file under studioStoryDir(storyId)
 *                                        (foreign story ids resolve to null)
 *   /mini-tools/<rel>                 -> deployed static mini-tools dir
 *   /image-library-webp/<rel>         -> the image-library root (the exported
 *                                        const points at .../themes, so map
 *                                        from its PARENT)
 *   anything else                     -> null (unknown = missing)
 */
function makeTenantResolver(storyId: string): (src: string) => string | null {
  const ownPrefix = STUDIO_CANONICAL_PREFIX + storyId + '/';
  const imageLibraryRoot = path.dirname(STUDIO_IMAGE_LIBRARY_THEMES_DIR);
  return (src: string) => {
    if (typeof src !== 'string' || !src) return null;
    if (src.startsWith(STUDIO_CANONICAL_PREFIX)) {
      // Only THIS story's subtree resolves; cross-tenant srcs stay null.
      if (!src.startsWith(ownPrefix)) return null;
      return resolveTenantPath(storyId, src.slice(ownPrefix.length));
    }
    if (src.startsWith('/mini-tools/')) {
      return safeStaticPath(STUDIO_MINI_TOOLS_DIR, src.slice('/mini-tools/'.length));
    }
    if (src.startsWith('/image-library-webp/')) {
      return safeStaticPath(imageLibraryRoot, src.slice('/image-library-webp/'.length));
    }
    return null;
  };
}

/** Best-effort repo root for IMAGE_VOCABULARY (missing vocab is only a warn). */
function bestEffortRepoDir(): string {
  const candidates = [
    '/opt/lessoncraftstudio',
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '..', '..', '..'), // .next/standalone cwd -> repo root
    process.cwd(),
  ];
  for (const c of candidates) {
    try {
      if (fs.existsSync(path.join(c, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'))) return c;
    } catch {
      /* keep looking */
    }
  }
  return '/opt/lessoncraftstudio';
}

/** Grade-band profile from the deployed sb-bands.js (optional — null without it). */
function bandFor(story: any): any {
  const grade = story && story.alignment && story.alignment.grade;
  if (!grade) return null;
  try {
    // Runtime file at the deployed static dir — never bundleable; bypass webpack.
    // eslint-disable-next-line no-eval
    const nodeRequire = eval('require') as NodeRequire;
    const bands = nodeRequire(path.join(STUDIO_MINI_TOOLS_DIR, 'sb-bands.js'));
    return (bands && bands[grade]) || null;
  } catch {
    return null;
  }
}

/**
 * Validate a tenant story with the shared validator core. Returns the same
 * {errors, warns} the CLI would print as "  ERROR " / "  WARN  " lines.
 */
export async function validateTenantStory(
  storyId: string,
  story: any,
  strings: any
): Promise<{ errors: string[]; warns: string[] }> {
  const storyDir = studioStoryDir(storyId); // under STUDIO_MEDIA_ROOT; also validates the id shape
  return validateStoryCore({
    story,
    strings: strings || {},
    storyDir,
    miniDir: STUDIO_MINI_TOOLS_DIR,
    repoDir: bestEffortRepoDir(),
    resolveUrl: makeTenantResolver(storyId),
    band: bandFor(story),
    strictAudio: false,
  });
}
