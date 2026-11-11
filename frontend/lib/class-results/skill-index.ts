/**
 * Loads one registry's skill index for the dashboard by curriculum (Part 9 release 2, step 9.6).
 *
 * The files are generated (scripts/class-results/build-skill-index.js) from the content graph and the curriculum
 * registries; each is 80 to 95 KB and is loaded only when a teacher opens the view, once per server process.
 * Which registries a class can be read against comes from frontend/content/curricula/display.json: every registry of
 * the class's language, the country's own first (en: Common Core, then Texas; de: KMK, then the three Länder).
 */
import display from '@/content/curricula/display.json';
import type { SkillIndex, SkillPick } from './store';

const LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  da: () => import('@/content/class-skills/da.json'),
  de: () => import('@/content/class-skills/de.json'),
  'de-by': () => import('@/content/class-skills/de-by.json'),
  'de-nw': () => import('@/content/class-skills/de-nw.json'),
  'de-sn': () => import('@/content/class-skills/de-sn.json'),
  en: () => import('@/content/class-skills/en.json'),
  'en-tx': () => import('@/content/class-skills/en-tx.json'),
  es: () => import('@/content/class-skills/es.json'),
  fi: () => import('@/content/class-skills/fi.json'),
  fr: () => import('@/content/class-skills/fr.json'),
  it: () => import('@/content/class-skills/it.json'),
  nl: () => import('@/content/class-skills/nl.json'),
  no: () => import('@/content/class-skills/no.json'),
  pt: () => import('@/content/class-skills/pt.json'),
  sv: () => import('@/content/class-skills/sv.json'),
};

const REGISTRIES = (display as { registries: Record<string, { name: string; locale: string }> }).registries;

/** the registries of a language: the country's own first, then the others by key */
export function curriculaOf(locale: string): Array<{ key: string; name: string }> {
  return Object.keys(REGISTRIES)
    .filter((k) => REGISTRIES[k].locale === locale && LOADERS[k])
    .sort((a, b) => (a === locale ? -1 : b === locale ? 1 : a < b ? -1 : 1))
    .map((key) => ({ key, name: REGISTRIES[key].name }));
}

const cache = new Map<string, SkillIndex>();

export const pickSkillIndex: SkillPick = async (locale, wanted) => {
  const choices = curriculaOf(locale);
  if (!choices.length) return null;
  const key = wanted && choices.some((c) => c.key === wanted) ? wanted : choices[0].key;
  let index = cache.get(key);
  if (!index) {
    index = (await LOADERS[key]()).default as SkillIndex;
    cache.set(key, index);
  }
  return { index, choices };
};
