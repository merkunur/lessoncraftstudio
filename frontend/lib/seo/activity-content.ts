/**
 * Activity-page editorial content resolver — the crawlable SEO body for
 * `/<locale>/activities/<slug>/` pages.
 *
 * Activities run inside an iframe (the mini-tool engine), which crawlers do
 * not execute for the parent page's ranking. So the parent page must
 * server-render enough unique, locale-native prose to rank on its own. This
 * module supplies that prose via a 3-tier resolve that mirrors the
 * topic-prose pattern (CLAUDE.md §16.7.1):
 *
 *   Tier 1 — authored:  `prose[row.id]` paragraph array, hand-written per
 *            activity for the highest-value pages.
 *   Tier 2 — by-strand: `templates.byStrand[strand]`, interpolated with the
 *            activity's own grade / range / theme / Common Core code.
 *   Tier 3 — generic:   `templates.generic`, interpolated likewise.
 *
 * Per-locale content files live at `@/messages/activity-content/<locale>.json`
 * and are wired into LOADERS below. Only locales present in LOADERS resolve;
 * any other locale returns null and the page renders no extra sections (it
 * keeps its current intro-only shape — never English prose on a non-EN page).
 * Part 3 adds the other ten locale files + their LOADERS entries together.
 *
 * `whatsInside` is always derived from the row's own structured data so even
 * a fully-templated page carries unique nouns + numbers — this is what keeps
 * 1000+ activities from collapsing into boilerplate duplicate content.
 */
import type { ActivityRow } from '@/lib/activities';

export interface ActivityContent {
  /** Lead editorial paragraphs (Tier 1 authored, else the by-strand "about"). */
  proseParagraphs: string[];
  /** "What your child practices" bullet list. */
  practices: string[];
  /** "How to play" sentences. */
  howToPlay: string[];
  /** "Learning goals" sentences. */
  learningGoals: string[];
  /** "What's inside this activity" — derived from the row's own data. */
  whatsInside: string[];
  /** Section headings for the locale. */
  labels: {
    about: string;
    practices: string;
    howToPlay: string;
    learningGoals: string;
    whatsInside: string;
  };
}

interface StrandTemplate {
  about: string[];
  practices: string[];
  howToPlay: string[];
  learningGoals: string[];
}

interface ActivityContentFile {
  labels: ActivityContent['labels'];
  templates: {
    byStrand: Record<string, StrandTemplate>;
    generic: StrandTemplate;
    whatsInsideRange: string;
    whatsInsideTheme: string;
    whatsInsideGrade: string;
    whatsInsideStrand: string;
    whatsInsideCode: string;
  };
  prose?: Record<string, string[]>;
}

/**
 * Static loader map. Add a locale here in the SAME commit that adds its
 * `@/messages/activity-content/<locale>.json` file (Part 3). A static import
 * of a non-existent file is a build error, so only mapped locales appear here
 * and every other locale resolves to null by design.
 */
const LOADERS: Record<string, () => Promise<{ default: ActivityContentFile }>> = {
  en: () =>
    import('@/messages/activity-content/en.json') as unknown as Promise<{
      default: ActivityContentFile;
    }>,
};

const _cache: Record<string, ActivityContentFile | null> = {};

async function loadLocaleContent(locale: string): Promise<ActivityContentFile | null> {
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
    console.warn('[activity-content] failed to load', locale, (err as Error).message);
    _cache[locale] = null;
    return null;
  }
}

/** Map the manifest grade literal ("K"/"1"/"2"/"3") to a child age range. */
export function gradeToAgeRange(grade: string): string | null {
  const map: Record<string, string> = {
    K: '5-6',
    '1': '6-7',
    '2': '7-8',
    '3': '8-9',
  };
  return map[grade] ?? null;
}

/** Pull a numeric {min,max} range from a row's opaque params, defensively. */
function readRange(
  params: Record<string, unknown> | undefined,
): { min: number; max: number } | null {
  if (!params) return null;
  const r = (params as { range?: unknown }).range;
  if (r && typeof r === 'object') {
    const min = (r as { min?: unknown }).min;
    const max = (r as { max?: unknown }).max;
    if (typeof min === 'number' && typeof max === 'number') return { min, max };
  }
  return null;
}

function interpolate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_m, k) => (k in vars ? vars[k] : `{${k}}`));
}

function titleCase(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export async function getActivityContent(
  locale: string,
  row: ActivityRow,
): Promise<ActivityContent | null> {
  const file = await loadLocaleContent(locale);
  if (!file) return null;

  const grade = row.alignment.grade;
  const strand = row.alignment.strand;
  const code = row.alignment.code;
  const theme = (row.theme ?? '').trim();
  const range = readRange(row.params);

  const vars: Record<string, string> = {
    grade,
    strand,
    code,
    theme,
    min: range ? String(range.min) : '',
    max: range ? String(range.max) : '',
  };

  const tmpl = file.templates.byStrand[strand] ?? file.templates.generic;

  const practices = tmpl.practices.map((s) => interpolate(s, vars));
  const howToPlay = tmpl.howToPlay.map((s) => interpolate(s, vars));
  const learningGoals = tmpl.learningGoals.map((s) => interpolate(s, vars));

  // Tier 1 authored prose wins; otherwise the by-strand "about" lead.
  const authored = file.prose?.[row.id];
  const proseParagraphs = (authored && authored.length ? authored : tmpl.about).map((s) =>
    interpolate(s, vars),
  );

  // "What's inside" — always derived from the row's own data so every page,
  // even a fully-templated one, carries unique nouns + numbers.
  const whatsInside: string[] = [];
  if (range) whatsInside.push(interpolate(file.templates.whatsInsideRange, vars));
  if (theme)
    whatsInside.push(
      interpolate(file.templates.whatsInsideTheme, { ...vars, theme: titleCase(theme) }),
    );
  whatsInside.push(interpolate(file.templates.whatsInsideGrade, vars));
  whatsInside.push(interpolate(file.templates.whatsInsideStrand, vars));
  whatsInside.push(interpolate(file.templates.whatsInsideCode, vars));

  return {
    proseParagraphs,
    practices,
    howToPlay,
    learningGoals,
    whatsInside,
    labels: file.labels,
  };
}
