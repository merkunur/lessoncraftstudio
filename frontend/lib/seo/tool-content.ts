/**
 * Per-tool landing-page content resolver for /<locale>/tools/<slug>/.
 *
 * The 3 free-play manipulatives (ten-frame, number-line, ruler) run as
 * standalone JS-only mini-tool shells at /mini-tools/<tool>.html (no SEO of
 * their own). This module supplies the crawlable, locale-native body for a
 * dedicated SSR landing page per tool — mirroring the activity-content
 * pattern (frontend/lib/seo/activity-content.ts): per-locale JSON files,
 * static LOADERS map, returns null for any unmapped locale.
 *
 * Content files: @/messages/tool-content/<locale>.json. Each carries the 3
 * tool entries (keyed by TOOL_KEYS) + a shared `labels` block. The per-tool
 * `slug` is the native-language URL segment (§17.4), e.g. de ten-frame →
 * "zehnerfeld", fi number-line → "lukusuora".
 */
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';

/** Canonical tool keys — match the mini-tool file basenames + MANIPULATIVES ids. */
export const TOOL_KEYS = ['ten-frame', 'number-line', 'ruler'] as const;
export type ToolKey = (typeof TOOL_KEYS)[number];

/** Mini-tool HTML path (nginx-direct, §3.3) per tool key. */
export const TOOL_MINI_URL: Record<ToolKey, string> = {
  'ten-frame': '/mini-tools/ten-frame.html',
  'number-line': '/mini-tools/number-line.html',
  ruler: '/mini-tools/ruler.html',
};

/**
 * Activity-manifest `tool` field prefix per tool key — used to surface
 * "activities that use this tool". ten-frame-activity exists today; the
 * others have no activity engine yet (their strip self-skips).
 */
export const TOOL_ACTIVITY_PREFIX: Record<ToolKey, string> = {
  'ten-frame': 'ten-frame',
  'number-line': 'number-line',
  ruler: 'ruler',
};

export interface ToolEntry {
  slug: string;
  name: string;
  tagline: string;
  about: string[];
  howToUse: string[];
  classroomIdeas: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ToolContentLabels {
  about: string;
  howToUse: string;
  classroomIdeas: string;
  relatedActivities: string;
  otherLanguages: string;
  openFullScreen: string;
  toolsBreadcrumb: string;
}

interface ToolContentFile {
  'ten-frame': ToolEntry;
  'number-line': ToolEntry;
  ruler: ToolEntry;
  labels: ToolContentLabels;
}

/**
 * Static loader map. Add a locale here in the same commit that adds its
 * @/messages/tool-content/<locale>.json file. A static import of a missing
 * file is a build error, so only mapped locales appear; others resolve null.
 */
const LOADERS: Record<string, () => Promise<{ default: ToolContentFile }>> = {
  en: () => import('@/messages/tool-content/en.json') as unknown as Promise<{ default: ToolContentFile }>,
  de: () => import('@/messages/tool-content/de.json') as unknown as Promise<{ default: ToolContentFile }>,
  es: () => import('@/messages/tool-content/es.json') as unknown as Promise<{ default: ToolContentFile }>,
  fr: () => import('@/messages/tool-content/fr.json') as unknown as Promise<{ default: ToolContentFile }>,
  it: () => import('@/messages/tool-content/it.json') as unknown as Promise<{ default: ToolContentFile }>,
  pt: () => import('@/messages/tool-content/pt.json') as unknown as Promise<{ default: ToolContentFile }>,
  nl: () => import('@/messages/tool-content/nl.json') as unknown as Promise<{ default: ToolContentFile }>,
  sv: () => import('@/messages/tool-content/sv.json') as unknown as Promise<{ default: ToolContentFile }>,
  da: () => import('@/messages/tool-content/da.json') as unknown as Promise<{ default: ToolContentFile }>,
  no: () => import('@/messages/tool-content/no.json') as unknown as Promise<{ default: ToolContentFile }>,
  fi: () => import('@/messages/tool-content/fi.json') as unknown as Promise<{ default: ToolContentFile }>,
};

const _cache: Record<string, ToolContentFile | null> = {};

async function loadLocale(locale: string): Promise<ToolContentFile | null> {
  if (locale in _cache) return _cache[locale];
  const loader = LOADERS[locale];
  if (!loader) {
    _cache[locale] = null;
    return null;
  }
  try {
    const mod = await loader();
    _cache[locale] = mod.default;
    return mod.default;
  } catch (err) {
    console.warn('[tool-content] failed to load', locale, (err as Error).message);
    _cache[locale] = null;
    return null;
  }
}

export interface ToolContent extends ToolEntry {
  toolKey: ToolKey;
  labels: ToolContentLabels;
}

/** Resolve a tool by its canonical key for a locale. */
export async function getToolContent(locale: string, toolKey: ToolKey): Promise<ToolContent | null> {
  const file = await loadLocale(locale);
  if (!file) return null;
  const entry = file[toolKey];
  if (!entry) return null;
  return { ...entry, toolKey, labels: file.labels };
}

/** Resolve a native-language URL slug → tool key for a locale (null if none). */
export async function resolveToolSlug(slug: string, locale: string): Promise<ToolKey | null> {
  const file = await loadLocale(locale);
  if (!file) return null;
  for (const key of TOOL_KEYS) {
    if (file[key] && file[key].slug === slug) return key;
  }
  return null;
}

/** Every (locale × tool) landing-page entry — for generateStaticParams + sitemap. */
export async function listToolSitemapEntries(): Promise<Array<{ locale: string; slug: string; toolKey: ToolKey }>> {
  const out: Array<{ locale: string; slug: string; toolKey: ToolKey }> = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    if (!file) continue;
    for (const key of TOOL_KEYS) {
      const entry = file[key];
      if (entry && entry.slug) out.push({ locale, slug: entry.slug, toolKey: key });
    }
  }
  return out;
}

/** hreflang code per locale (pt → pt-BR per §6); mirrors activities/manipulatives. */
const HREFLANG_MAP: Record<string, string> = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR', it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

/** hreflang alternates for a tool across every locale where it has a slug. */
export async function hreflangAlternatesForTool(toolKey: ToolKey, baseUrl: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    const entry = file && file[toolKey];
    if (entry && entry.slug) out[HREFLANG_MAP[locale] || locale] = `${baseUrl}/${locale}/tools/${entry.slug}`;
  }
  out['x-default'] = out['en'] || Object.values(out)[0] || baseUrl;
  return out;
}
