/**
 * R14c (SEO Part 6): per-locale casing + French elision for the topic-page
 * <title> + <h1>. Mirrors the deck-side rules in
 * scripts/publish-cli/build-seo-head.js composeTitle (segmentCasing 'sentence'
 * + ofTypeElision) so topic titles read naturally in Romance + Dutch:
 *   fr  "Fiches de Addition" → "Fiches d'addition"  (sentence-case + elide)
 *   es  "Hojas de trabajo de Suma" → "…de suma"     (sentence-case)
 *   it  "Schede di Addizione" → "Schede di addizione"
 *   pt  "Atividades de Soma" → "Atividades de soma"
 *   nl  "Werkbladen voor Optellen" → "…voor optellen"
 *   en/de/Nordic: unchanged (cap-first).
 *
 * Casing (lowercasing) is applied ONLY to the exercise-type axis — math/literacy
 * common nouns that are always safe to lowercase mid-sentence. Theme +
 * educational-level topics keep cap-first so proper-noun themes (Halloween,
 * Noël) and acronym levels (CP, CE1, Groep 3) are never mangled. French elision
 * is pure grammar — applied for ANY axis wherever a "de {vowel}" sequence
 * appears, so "Fiches de École" → "Fiches d'École" too.
 */

// Vowel/h set verbatim from build-seo-head.js:198 (h covers "d'Histoire").
const VOWEL_INITIAL = /^[aeiouhàâäéèêëíïîôöòûüù]/i;

// Locales whose deck-side title config uses segmentCasing:'sentence'.
const SENTENCE_CASE_LOCALES = new Set(['fr', 'es', 'it', 'pt', 'nl']);
// Locales with ofTypeElision:true (connector "de" → "d'" before a vowel).
const ELIDE_LOCALES = new Set(['fr']);

function capFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function formatTopicForTitle(locale: string, topic: string, intent?: string): string {
  if (!topic) return topic;
  if (intent === 'exerciseType' && SENTENCE_CASE_LOCALES.has(locale)) {
    return topic.toLocaleLowerCase(locale);
  }
  return capFirst(topic);
}

/**
 * Render a topic title from a next-intl translator + key, applying per-locale
 * casing + French "de {vowel}" → "d'{vowel}" elision. Passing (t, key) lets one
 * helper serve both topicPage.meta.title and topicPage.heading.<intent> (h1).
 */
export function renderTopicTitle(
  locale: string,
  t: (key: string, params: Record<string, string>) => string,
  key: string,
  topic: string,
  intent?: string,
): string {
  const formatted = formatTopicForTitle(locale, topic, intent);
  let out = t(key, { topic: formatted });
  if (ELIDE_LOCALES.has(locale) && VOWEL_INITIAL.test(formatted)) {
    out = out.replace(new RegExp('\\bde (' + escapeRegExp(formatted) + ')', 'g'), "d'$1");
  }
  return out;
}
