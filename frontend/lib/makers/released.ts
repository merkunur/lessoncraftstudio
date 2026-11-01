/**
 * Which worksheet makers are RELEASED on this server — read from the served tree, never from the repo
 * (ARCHITECTURE §5.2: MAKERS_DIR/versions.json + <maker>/current.txt + <maker>/<version>/templates.json, the files
 * scripts/makers/release-pack.js ships and scripts/makers/install-release.sh installs). Until the makers' one release
 * (operator 2026-10-31: nothing goes live before all 60 are built) the tree does not exist and every function here
 * answers "none" — so the old landings keep launching the old apps and no deck preset resolves, by construction.
 *
 * Cached for 5 minutes per process (the landings are ISR 3600 anyway; a release's pointer files change at most once
 * per deploy).
 */
import fs from 'fs';
import path from 'path';

export const MAKERS_DIR = process.env.MAKERS_DIR || '/var/www/lcs-media/makers';
const TTL_MS = 5 * 60 * 1000;

export interface ReleasedMaker {
  version: string;
  /** template id → the locales it is offered in */
  templates: Map<string, Set<string>>;
}
interface Index { at: number; makers: Map<string, ReleasedMaker> }
let cache: Index | null = null;

function readIndex(): Map<string, ReleasedMaker> {
  const out = new Map<string, ReleasedMaker>();
  let versions: Record<string, { current?: string }> = {};
  try { versions = JSON.parse(fs.readFileSync(path.join(MAKERS_DIR, 'versions.json'), 'utf8')); } catch { return out; }
  for (const maker of Object.keys(versions)) {
    if (!/^[a-z0-9-]{2,40}$/.test(maker)) continue;
    let version = '';
    try { version = fs.readFileSync(path.join(MAKERS_DIR, maker, 'current.txt'), 'utf8').trim(); } catch { continue; }
    if (!/^[a-f0-9]{6,24}$/.test(version)) continue;
    let tj: { templates?: Array<{ id: string; locales?: string[] }> };
    try { tj = JSON.parse(fs.readFileSync(path.join(MAKERS_DIR, maker, version, 'templates.json'), 'utf8')); } catch { continue; }
    const templates = new Map<string, Set<string>>();
    for (const t of tj.templates || []) templates.set(t.id, new Set(t.locales || []));
    out.set(maker, { version, templates });
  }
  return out;
}

export function releasedMakers(): Map<string, ReleasedMaker> {
  if (!cache || Date.now() - cache.at > TTL_MS) cache = { at: Date.now(), makers: readIndex() };
  return cache.makers;
}
/** for tests: forget the cached index */
export function resetReleasedCache(): void { cache = null; }

export function isReleased(maker: string): boolean { return releasedMakers().has(maker); }

/** the released maker that offers this template (play/makers-index.js makerOf, over the SERVED tree) */
export function makerOf(templateId: string): string | null {
  for (const [maker, m] of releasedMakers()) if (m.templates.has(templateId)) return maker;
  return null;
}

/** is the template offered in this locale by its released maker? */
export function templateOffered(maker: string, templateId: string, locale: string): boolean {
  const m = releasedMakers().get(maker);
  const locs = m && m.templates.get(templateId);
  return !!locs && locs.has(locale);
}
