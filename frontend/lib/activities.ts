/**
 * Activity manifest loader — per-engine *-activities.json files in `mini tools/`.
 *
 * Each activity row is a Common-Core-pinned task set that spawns one
 * `/<locale>/activities/<slug>/` landing page per locale. Manifest is the
 * source of truth; the Next.js route resolves slug → row → renders the
 * SEO chrome + embeds the tool via iframe.
 *
 * Path resolution: the manifest lives in `mini tools/<engine>-activities.json`
 * at the repo root. From the frontend/ Next.js process, `process.cwd()` is
 * the frontend dir, so the manifest is at `../mini tools/<engine>-activities.json`.
 *
 * Cache: read once per server lifetime; ISR (revalidate=3600) covers content
 * updates without rebuild.
 */
import fs from 'fs/promises';
import path from 'path';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
import { buildHreflangAlternates } from './seo/hreflang';

export interface ActivityAlignment {
  framework: string;
  code: string;
  grade: string;
  strand: string;
}

export interface ActivityRow {
  id: string;
  tool: string;
  /* Engine-specific task template key. Widened from a strict literal union
     because per-engine manifests own their own template keys (choice-board
     ships shape-id/count-sides/pick-bigger/which-more/even-odd/flat-solid/
     pick-smaller/how-many-group; cvc-builder ships build-cvc-word). Each
     engine's orchestrator switches on this string at runtime. */
  task_template: string;
  alignment: ActivityAlignment;
  /* Per-engine task params bag — opaque to the route. Each engine's
     orchestrator reads its own param shape. */
  params: Record<string, unknown>;
  theme: string | null;
  slug: Record<string, string>;
  page_title: Record<string, string>;
  page_intro: Record<string, string>;
  kid_prompt_template: string;
}

const MANIFEST_FILES = [
  'ten-frame-activities.json',
  'choice-board-activities.json',
  'cvc-builder-activities.json',
  'syllable-builder-activities.json',
  'place-value-activities.json',
  'match-pairs-activities.json',
  // future: 'number-line-activities.json', 'ruler-activities.json', …
];

let _cache: ActivityRow[] | null = null;

/**
 * Candidate paths in order of preference. The server's process.cwd() varies
 * across local dev (`<repo>/frontend`), production standalone runtime
 * (`<repo>/frontend/.next/standalone`), and direct `next start` from a build.
 * We try each in turn so the manifest loads regardless of where Node was
 * launched. `public/mini-tools/` is the most reliable because the master-sync
 * script ALWAYS populates it as part of the deployment, and the standalone
 * build's public/ symlink resolves to the served storage on the server.
 */
function candidateManifestPaths(file: string): string[] {
  const cwd = process.cwd();
  return [
    path.join(cwd, 'public', 'mini-tools', file),                          // standalone via symlink
    path.join(cwd, '..', 'public', 'mini-tools', file),                    // local dev from frontend/
    path.join(cwd, 'frontend', 'public', 'mini-tools', file),              // launched from repo root
    path.join(cwd, '..', '..', '..', '..', 'mini tools', file),            // standalone → repo-root mini tools/
    path.join(cwd, '..', 'mini tools', file),                              // local dev → repo-root mini tools/
    path.join(cwd, 'mini tools', file),                                    // launched from repo root
  ];
}

async function loadActivities(): Promise<ActivityRow[]> {
  if (_cache) return _cache;
  const all: ActivityRow[] = [];
  for (const file of MANIFEST_FILES) {
    let loaded = false;
    for (const candidate of candidateManifestPaths(file)) {
      try {
        const raw = await fs.readFile(candidate, 'utf-8');
        const rows = JSON.parse(raw) as ActivityRow[];
        all.push(...rows);
        loaded = true;
        break;
      } catch {
        // try the next candidate
      }
    }
    if (!loaded) {
      console.warn('[activities] Could not load', file, 'from any candidate path');
    }
  }
  _cache = all;
  return all;
}

export async function resolveActivitySlug(
  slug: string,
  locale: string
): Promise<ActivityRow | null> {
  const all = await loadActivities();
  return all.find((row) => row.slug[locale] === slug) || null;
}

export async function listActivitySitemapEntries(): Promise<
  Array<{ locale: string; slug: string; id: string; row: ActivityRow }>
> {
  const all = await loadActivities();
  const out: Array<{ locale: string; slug: string; id: string; row: ActivityRow }> = [];
  for (const row of all) {
    for (const locale of TOPIC_ENABLED_LOCALES) {
      const slug = row.slug[locale];
      if (slug) out.push({ locale, slug, id: row.id, row });
    }
  }
  return out;
}

export async function listAllActivities(): Promise<ActivityRow[]> {
  return loadActivities();
}

/**
 * Sibling slug map for a row: the merged `locale → slug` map across every row
 * sharing the same `(task_template, alignment.code)` key. This cross-links
 * activities that were fanned out as SEPARATE per-locale rows across engine
 * families — e.g. the syllable-builder RF.K.2.B set ships 10 single-locale
 * rows (E8 es/fi/pt/fr/it + E9 de/nl/sv/no/da) that are the same activity in
 * different languages but were otherwise orphaned single-locale.
 *
 * Collision-safe: if two rows in the group claim the SAME locale with a
 * DIFFERENT slug, they are genuinely distinct activities that merely collide
 * on (task_template, code) — NOT translations of one activity (e.g. the two
 * ten-frame make-n|K.CC.B.4 rows: count-to-10/animals vs count-to-20/fruits,
 * each already 11-locale) — so we DECLINE the merge and the row keeps its own
 * slug map (current behaviour, byte-stable). Singleton groups also return the
 * row's own map unchanged. Both hreflangAlternatesForRow and otherLocalesForRow
 * consume this single helper so the <head> hreflang, the on-page sibling strip,
 * and OG alternateLocale stay mirror-consistent by construction.
 */
async function siblingSlugMap(row: ActivityRow): Promise<Record<string, string>> {
  const all = await loadActivities();
  const key = `${row.task_template}|${row.alignment.code}`;
  const group = all.filter((r) => `${r.task_template}|${r.alignment.code}` === key);
  if (group.length <= 1) return row.slug;
  const merged: Record<string, string> = {};
  for (const r of group) {
    for (const [loc, slug] of Object.entries(r.slug)) {
      if (merged[loc] !== undefined && merged[loc] !== slug) {
        // Ambiguous group — distinct activities colliding on the key. Do not
        // merge; fall back to this row's own slug map (no spurious cross-link).
        return row.slug;
      }
      merged[loc] = slug;
    }
  }
  return merged;
}

/**
 * Build the hreflang alternates map for an activity row — one entry per locale
 * in the row's sibling group (see siblingSlugMap). Async because it reads the
 * (cached) manifest to find cross-family siblings.
 */
export async function hreflangAlternatesForRow(
  row: ActivityRow,
  baseUrl: string
): Promise<Record<string, string>> {
  // hreflang map is the single SoT at @/lib/seo/hreflang (pt → pt-BR per §6).
  // No trailing slash — Next.js routes per next.config.js trailingSlash:false.
  const slugMap = await siblingSlugMap(row);
  return buildHreflangAlternates(
    TOPIC_ENABLED_LOCALES,
    (loc) => (slugMap[loc] ? `${baseUrl}/${loc}/activities/${slugMap[loc]}` : null),
    baseUrl,
  );
}

export function isTopicEnabledLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

/**
 * Related activities for the internal-link mesh on an activity page.
 *
 * From all activities (excluding the given row), keep only those that have a
 * slug + title in `locale`, then rank: same strand first, then same grade,
 * then the rest. Within each tier, manifest order is preserved — fully
 * deterministic (no Date/random) so the result is ISR-cache-stable.
 */
export async function listRelatedActivities(
  row: ActivityRow,
  locale: string,
  limit = 6,
): Promise<ActivityRow[]> {
  const all = await loadActivities();
  const candidates = all.filter(
    (a) => a.id !== row.id && a.slug[locale] && a.page_title[locale],
  );
  const sameStrand: ActivityRow[] = [];
  const sameGrade: ActivityRow[] = [];
  const rest: ActivityRow[] = [];
  for (const a of candidates) {
    if (a.alignment.strand === row.alignment.strand) sameStrand.push(a);
    else if (a.alignment.grade === row.alignment.grade) sameGrade.push(a);
    else rest.push(a);
  }
  return [...sameStrand, ...sameGrade, ...rest].slice(0, limit);
}

/**
 * The same activity in its other available languages — for the visible
 * "available in other languages" strip (makes the hreflang siblings
 * on-page, not just in <head>). Returns Next.js route paths (locale-prefixed,
 * trailing slash) for every locale ≠ current where the row has a slug.
 */
export async function otherLocalesForRow(
  row: ActivityRow,
  currentLocale: string,
): Promise<Array<{ locale: string; href: string }>> {
  // Same sibling group as hreflangAlternatesForRow → strip + OG mirror the head.
  const slugMap = await siblingSlugMap(row);
  const out: Array<{ locale: string; href: string }> = [];
  for (const loc of TOPIC_ENABLED_LOCALES) {
    if (loc === currentLocale) continue;
    const slug = slugMap[loc];
    // No trailing slash — Next.js routes per next.config.js trailingSlash:false
    // (mirrors hreflangAlternatesForRow above; a trailing slash would 308).
    if (slug) out.push({ locale: loc, href: `/${loc}/activities/${slug}` });
  }
  return out;
}
