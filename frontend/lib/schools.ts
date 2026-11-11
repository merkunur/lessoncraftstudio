/* The "For schools" page (Daily Teaching System, Part 6; PLAN §11 ruling 6): one page per language with what a school
 * buys and a quote request that reaches the operator by email. A language has the page when it has the strings
 * (content/schools/ui.<loc>.json); every other language answers 404. */
export type SchoolsUi = Record<string, string>;

const cache = new Map<string, SchoolsUi | null>();

export async function getSchoolsUi(locale: string): Promise<SchoolsUi | null> {
  if (cache.has(locale)) return cache.get(locale) ?? null;
  try {
    const mod = await import(`@/content/schools/ui.${locale}.json`);
    cache.set(locale, mod.default as SchoolsUi);
  } catch {
    cache.set(locale, null);
  }
  return cache.get(locale) ?? null;
}

/** the address a request that could not be sent is pointed to (the same one the contact form names) */
export const SCHOOLS_CONTACT_EMAIL = 'support@lessoncraftstudio.com';

/** what the form may send; the route checks the same limits */
export const QUOTE_LIMITS = { name: 120, school: 160, email: 200, place: 120, message: 2000, teachersMax: 5000 } as const;
