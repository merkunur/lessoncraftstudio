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
  'fractions-activities.json',
  'sort-bins-activities.json',
  'array-activities.json',
  'clock-activities.json',
  'number-bond-activities.json',
  'money-activities.json',
  'mochi-feast-activities.json',
  'echo-grove-activities.json',
  'mosaic-menders-activities.json',
  'patchwork-meadow-activities.json',
  'mending-fences-activities.json',
  'shades-activities.json',
  'halfway-harbors-activities.json',
  'maple-bakery-activities.json',
  'skipcount-activities.json',
  'affix-activities.json',
  'line-plot-activities.json',
  'picture-story-activities.json',
  'story-spine-activities.json',
  'point-of-view-activities.json',
  'two-tales-activities.json',
  'seriation-activities.json',
  'tense-activities.json',
  'author-purpose-activities.json',
  'wordclass-activities.json',
  'contraction-activities.json',
  'plural-activities.json',
  'pronoun-activities.json',
  'wobble-museum-activities.json',
  'fraction-equiv-activities.json',
  'place-value-regroup-activities.json',
  'sound-boxes-activities.json',
  'sentence-builder-activities.json',
  'clock-digital-activities.json',
  'clock-elapsed-activities.json',
  'clock-convert-activities.json',
  'clock-ampm-activities.json',
  'nesting-pots-activities.json',
  'sentence-clinic-activities.json',
  'parking-tower-activities.json',
  'comparison-creek-activities.json',
  'fix-it-corner-activities.json',
  'mending-basket-activities.json',
  'numbers-court-activities.json',
  'sock-and-shadow-activities.json',
  'sunny-side-diner-activities.json',
  'wake-up-pip-activities.json',
  'winter-piles-activities.json',
  'twinsies-activities.json',
  'star-stitcher-activities.json',
  'necklace-activities.json',
  'wondering-jar-activities.json',
  'ten-tank-activities.json',
  'pip-museum-activities.json',
  'chuffer-activities.json',
  'friendship-bridge-activities.json',
  'rivets-number-forge-activities.json',
  'mamas-roll-call-activities.json',
  'sharing-jar-activities.json',
  'clunks-lost-lunch-activities.json',
  'bos-berry-pantry-activities.json',
  'bundle-bot-activities.json',
  'pips-round-activities.json',
  'mims-baskets-activities.json',
  'pond-juice-activities.json',
  'nila-pond-activities.json',
  'word-clinic-activities.json',
  'clock-read-activities.json',
  'track-repair-activities.json',
  'vet-diagnosis-activities.json',
  'coin-stall-activities.json',
  'shapeforge-activities.json',
  'lay-units-activities.json',
  'fox-forge-activities.json',
  'ten-stones-activities.json',
  'snippy-activities.json',
  'tildy-activities.json',
  'bramble-activities.json',
  'graph-it-activities.json',
  'field-guide-activities.json',
  'rhyme-shop-activities.json',
  'opposites-activities.json',
  'compound-meaning-activities.json',
  'otto-picture-book-activities.json',
  'willow-story-corner-activities.json',
  'bram-board-shop-activities.json',
  'hoppers-number-line-activities.json',
  'juniper-story-lantern-activities.json',
  'marlo-magnifier-activities.json',
  'pearl-opinion-page-activities.json',
  'marina-headline-desk-activities.json',
  'robin-mirror-activities.json',
  'hazel-word-bridge-activities.json',
  'wren-question-window-activities.json',
  'daisy-plate-stack-activities.json',
  'comet-kangaroo-activities.json',
  'tally-squirrel-activities.json',
  'fern-clue-garden-activities.json',
  'booker-glossary-desk-activities.json',
  'pepper-sound-swap-activities.json',
  'stretch-giraffe-activities.json',
  'bingo-word-hunt-activities.json',
  'domino-two-part-activities.json',
  'olive-kind-of-activities.json',
  'jasper-just-right-activities.json',
  'roary-roar-meter-activities.json',
  'gabby-sayings-activities.json',
  'ziggy-odd-one-out-activities.json',
  'mango-animal-groups-activities.json',
  'sage-root-garden-activities.json',
  'rusty-yesterday-activities.json',
  'posy-egg-cartons-activities.json',
  'gus-snack-cart-activities.json',
  'inky-book-workshop-activities.json',
  'bea-two-bookshelves-activities.json',
  'wally-capital-crane-activities.json',
  'pim-comma-mail-activities.json',
  'atlas-fact-files-activities.json',
  'linc-fact-chain-activities.json',
  'gauge-good-guess-activities.json',
  'span-length-gap-activities.json',
  'vera-verb-match-activities.json',
  'hattie-whose-is-it-activities.json',
  'tempo-day-plan-activities.json',
  'cleo-packing-list-activities.json',
  'penny-alphabet-trace-activities.json',
  'digby-number-trace-activities.json',
  // 'storybook-activities.json' REMOVED 2026-07-11 — storybook project abandoned
  // (operator); the pips-picnic activity page 410s via middleware.
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
 * Resolve an activity by its manifest id (locale-independent, e.g.
 * "mochi-feast.count-out.k-cc-b-5"). Used by the activity-share feature to go
 * shared-link → row → the standalone mini-tool URL. Returns null for unknown ids.
 */
export async function resolveActivityById(id: string): Promise<ActivityRow | null> {
  const all = await loadActivities();
  return all.find((row) => row.id === id) || null;
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
 * Grade-matched activities for an internal-link strip on grade/level hub pages
 * (educational-level topic hubs, subject×grade hubs) that have no seed row.
 *
 * Filters to activities of the given CCSS grade (`PK`/`K`/`1`/`2`/`3`) that have
 * a slug + title in `locale`, then round-robins across strands so the strip is
 * engine-diverse (spreads internal-link equity across the activity pool rather
 * than surfacing the same one strand). Fully deterministic (manifest order
 * within each strand; no Date/random) so it is ISR-cache-stable.
 */
export async function listActivitiesByGrade(
  grade: string,
  locale: string,
  limit = 8,
): Promise<ActivityRow[]> {
  const all = await loadActivities();
  const candidates = all.filter(
    (a) => a.alignment.grade === grade && a.slug[locale] && a.page_title[locale],
  );
  const byStrand = new Map<string, ActivityRow[]>();
  for (const a of candidates) {
    const k = a.alignment.strand || 'other';
    if (!byStrand.has(k)) byStrand.set(k, []);
    byStrand.get(k)!.push(a);
  }
  const pools = [...byStrand.values()];
  const out: ActivityRow[] = [];
  let i = 0;
  while (out.length < limit && pools.some((p) => p.length)) {
    const pool = pools[i % pools.length];
    if (pool.length) out.push(pool.shift()!);
    i++;
  }
  return out.slice(0, limit);
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
