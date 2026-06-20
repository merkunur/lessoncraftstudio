/**
 * target-language axis resolver for the /learn ("Languages") cross-language category.
 * Keeps the cross-language dimension OUT of the 3-axis topic machinery (lib/taxonomy.ts)
 * by living in its own small module. Reads axes['target-language'] from the taxonomy
 * (one entry per target ISO; slug+name per page locale; slugs align with each deck's
 * cross-language slug lead).
 */
import topicsTaxonomy from '@/config/topics-taxonomy.json';

type AxisEntry = { slug: Record<string, string>; name: Record<string, string> };
const TARGET_AXIS = (((topicsTaxonomy as unknown) as { axes: Record<string, Record<string, AxisEntry>> }).axes['target-language'] || {}) as Record<string, AxisEntry>;

/** Display name of a target language, written in `locale` (e.g. targetLangName('en','de') → "Englisch"). */
export function targetLangName(targetIso: string, locale: string): string {
  const e = TARGET_AXIS[targetIso];
  return (e && (e.name[locale] || e.name.en)) || targetIso;
}

/** URL slug of a target language, in `locale` (e.g. targetLangSlug('en','de') → "englisch"). */
export function targetLangSlug(targetIso: string, locale: string): string {
  const e = TARGET_AXIS[targetIso];
  return (e && (e.slug[locale] || e.slug.en)) || targetIso;
}

/** Reverse: a slug as it appears in `locale` → the target ISO (or null). Tolerant across locales. */
export function resolveTargetLangSlug(slug: string, locale: string): string | null {
  const s = (slug || '').toLowerCase();
  for (const iso of Object.keys(TARGET_AXIS)) {
    if ((TARGET_AXIS[iso].slug[locale] || '').toLowerCase() === s) return iso;
  }
  for (const iso of Object.keys(TARGET_AXIS)) {
    if (Object.values(TARGET_AXIS[iso].slug).some((v) => (v || '').toLowerCase() === s)) return iso;
  }
  return null;
}

export function allTargetIsos(): string[] {
  return Object.keys(TARGET_AXIS);
}
