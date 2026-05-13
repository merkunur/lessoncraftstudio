/**
 * sentence-frame-library.ts — Sub-Phase 2.3 frame-template registry.
 *
 * Ports FRAME_BY_LOCALE verbatim from
 * REFERENCE APPS/material-generators/sentence-strips.html:145-270.
 *
 * NSR-flag comments preserved per §17.5 — Nordic suffix-article + Finnish
 * case-marking gaps are deliberate fallbacks documented in
 * project_k3_phrasing_native_speaker_review.md.
 */

export type FramePreset =
  | 'i-see-a'
  | 'i-have-a'
  | 'this-is-a'
  | 'i-like-plural'
  | 'there-are-count-plural'
  | 'the-item-is-color'
  | 'the-item-says'
  | 'custom';

const FRAME_TEMPLATES_EN: Record<string, string> = {
  'i-see-a': 'I see {item}.',
  'i-have-a': 'I have {item}.',
  'this-is-a': 'This is {item}.',
  'i-like-plural': 'I like {item:plural}.',
  'there-are-count-plural': 'There are {count} {item:plural}.',
  'the-item-is-color': 'The {item:bare} is {color}.',
  'the-item-says': 'The {item:bare} says ___.',
};

export const FRAME_BY_LOCALE: Record<string, Record<string, string>> = {
  en: FRAME_TEMPLATES_EN,
  de: {
    'i-see-a': 'Ich sehe {item:acc}.',
    'i-have-a': 'Ich habe {item:acc}.',
    'this-is-a': 'Das ist {item}.',
    'i-like-plural': 'Ich mag {item:plural}.',
    'there-are-count-plural': 'Es sind {count} {item:plural} da.',
    'the-item-is-color': 'Das {item:bare} ist {color}.',
    'the-item-says': 'Das {item:bare} sagt ___.',
  },
  es: {
    'i-see-a': 'Veo {item}.',
    'i-have-a': 'Tengo {item}.',
    'this-is-a': 'Esto es {item}.',
    'i-like-plural': 'Me gustan {item:plural-def}.',
    'there-are-count-plural': 'Hay {count} {item:plural}.',
    'the-item-is-color': 'El/La {item:bare} es {color}.',
    'the-item-says': 'El/La {item:bare} dice ___.',
  },
  fr: {
    'i-see-a': 'Je vois {item}.',
    'i-have-a': "J'ai {item}.",
    'this-is-a': "C'est {item}.",
    'i-like-plural': "J'aime {item:plural-def}.",
    'there-are-count-plural': 'Il y a {count} {item:plural}.',
    'the-item-is-color': 'Le/La {item:bare} est {color}.',
    'the-item-says': 'Le/La {item:bare} dit ___.',
  },
  nl: {
    'i-see-a': 'Ik zie {item}.',
    'i-have-a': 'Ik heb {item}.',
    'this-is-a': 'Dit is {item}.',
    'i-like-plural': 'Ik hou van {item:plural-def}.',
    'there-are-count-plural': 'Er zijn {count} {item:plural}.',
    'the-item-is-color': '{item:def-bare} is {color}.',
    'the-item-says': '{item:def-bare} zegt ___.',
  },
  // Portuguese (pt): standard m/f indefinite article via localizedArticle.
  // "gosto de" + plain plural is acceptable Portuguese for general preference;
  // skipping de+article contraction (dos/das) for Phase 1 simplicity.
  pt: {
    'i-see-a': 'Vejo {item}.',
    'i-have-a': 'Tenho {item}.',
    'this-is-a': 'Isto é {item}.',
    'i-like-plural': 'Gosto de {item:plural}.',
    'there-are-count-plural': 'Há {count} {item:plural}.',
    'the-item-is-color': 'O/A {item:bare} é {color}.',
    'the-item-says': 'O/A {item:bare} diz ___.',
  },
  // Italian (it): standard m/f gender via localizedArticle. Mi piacciono +
  // plural-definite is the correct construction for likes-plural.
  it: {
    'i-see-a': 'Vedo {item}.',
    'i-have-a': 'Ho {item}.',
    'this-is-a': 'Questo è {item}.',
    'i-like-plural': 'Mi piacciono {item:plural-def}.',
    'there-are-count-plural': 'Ci sono {count} {item:plural}.',
    'the-item-is-color': 'Il/La {item:bare} è {color}.',
    'the-item-says': 'Il/La {item:bare} dice ___.',
  },
  // Swedish (sv): n-genus 'en' / ett-genus 'ett' via localizedArticle.
  // NSR-FLAG (per project_k3_phrasing_native_speaker_review.md §17.5.1):
  //   the-item-is-color and the-item-says use INDEFINITE form ('en katt') because
  //   Swedish definite is suffix-article ('katten') and shared library's
  //   localizedArticle returns '' for Swedish definite. Pedagogically acceptable
  //   for K-3 ("a cat is red" reads as a generic claim about cats) but native-
  //   speaker review needed for production use; suffix-article rendering would
  //   require either per-vocab-key post-processing or extending IMAGE_VOCABULARY
  //   with definite-form data.
  sv: {
    'i-see-a': 'Jag ser {item}.',
    'i-have-a': 'Jag har {item}.',
    'this-is-a': 'Det här är {item}.',
    'i-like-plural': 'Jag gillar {item:plural}.',
    'there-are-count-plural': 'Det finns {count} {item:plural}.',
    'the-item-is-color': '{item} är {color}.', // NSR-FLAG: indefinite-form workaround for definite-suffix gap
    'the-item-says': '{item} säger ___.', // NSR-FLAG: indefinite-form workaround
  },
  // Danish (da): n-genus 'en' / neuter 'et' via localizedArticle.
  // NSR-FLAG: same suffix-article gap as Swedish; the-item-* frames use
  // indefinite-form workaround.
  da: {
    'i-see-a': 'Jeg ser {item}.',
    'i-have-a': 'Jeg har {item}.',
    'this-is-a': 'Dette er {item}.',
    'i-like-plural': 'Jeg kan lide {item:plural}.',
    'there-are-count-plural': 'Der er {count} {item:plural}.',
    'the-item-is-color': '{item} er {color}.', // NSR-FLAG: suffix-article gap
    'the-item-says': '{item} siger ___.', // NSR-FLAG: same
  },
  // Norwegian bokmål (no): m/f/n gender 'en/ei/et' via localizedArticle.
  // NSR-FLAG: same suffix-article gap as Swedish/Danish.
  no: {
    'i-see-a': 'Jeg ser {item}.',
    'i-have-a': 'Jeg har {item}.',
    'this-is-a': 'Dette er {item}.',
    'i-like-plural': 'Jeg liker {item:plural}.',
    'there-are-count-plural': 'Det er {count} {item:plural}.',
    'the-item-is-color': '{item} er {color}.', // NSR-FLAG: suffix-article gap
    'the-item-says': '{item} sier ___.', // NSR-FLAG: same
  },
  // Finnish (fi): no articles, but case-marking required for accusative + partitive.
  // NSR-FLAG (extensive): {item:bare} renders nominative; pedagogically wrong for
  // most object-position frames where Finnish requires accusative ('kissan') or
  // partitive ('kissaa'). i-have-a + this-is-a are correct (subject-position uses
  // nominative). Other frames need native-speaker review + likely IMAGE_VOCABULARY
  // extension with case-form data OR per-locale post-processing layer.
  fi: {
    'i-see-a': 'Näen {item:bare}.', // NSR-FLAG: should be accusative ('kissan'), renders nominative
    'i-have-a': 'Minulla on {item:bare}.', // CORRECT: nominative is right for "minulla on X"
    'this-is-a': 'Tämä on {item:bare}.', // CORRECT: subject-complement nominative
    'i-like-plural': 'Pidän {item:plural}.', // NSR-FLAG: should be partitive elative ('kissoista')
    'there-are-count-plural': 'On {count} {item:plural}.', // NSR-FLAG: should be partitive ('kissaa')
    'the-item-is-color': '{item:bare} on {color}.', // NSR-FLAG: nominative subject works structurally
    'the-item-says': '{item:bare} sanoo ___.', // NSR-FLAG: nominative subject works structurally
  },
};

/**
 * F6 N=1 grammar fix: per-locale singular variant of the
 * `there-are-count-plural` frame. English+German+Dutch+Italian require
 * verb-form change (is/ist/is/c'è); other locales' impersonal-existential
 * verb (hay/há/il y a/det finns/der er/det er/on) handles both counts so
 * only the item-form (plural → bare-singular) changes.
 *
 * NSR-flag continuity: fi's partitive concern at N=1 documented per the
 * fi block above; the N=1 frame uses bare-nominative for consistency with
 * NSR-flagged plural frame.
 */
const THERE_IS_ONE_BY_LOCALE: Record<string, string> = {
  en: 'There is {count} {item:bare}.',
  de: 'Es ist {count} {item:bare} da.',
  es: 'Hay {count} {item:bare}.',
  fr: 'Il y a {count} {item:bare}.',
  nl: 'Er is {count} {item:bare}.',
  pt: 'Há {count} {item:bare}.',
  it: "C'è {count} {item:bare}.",
  sv: 'Det finns {count} {item:bare}.',
  da: 'Der er {count} {item:bare}.',
  no: 'Det er {count} {item:bare}.', // NSR-FLAG continuity per fi pattern
  fi: 'On {count} {item:bare}.', // NSR-FLAG: nominative/partitive concern same as plural variant
};

/**
 * F6: count parameter enables count-aware frame selection. When framePreset
 * is `there-are-count-plural` AND count === 1, returns the locale's singular
 * variant from THERE_IS_ONE_BY_LOCALE. Other framePresets unaffected by count.
 *
 * Caller (sentence-strips-render.ts buildStrips) passes per-strip count;
 * chooseTemplate is now invoked per-strip rather than per-package.
 */
export function chooseTemplate(
  framePreset: string,
  locale: string,
  customTemplate?: string | null,
  count?: number
): string {
  if (framePreset === 'custom') {
    return customTemplate || '{item}';
  }
  // F6: N=1 singular variant for there-are-count-plural
  if (framePreset === 'there-are-count-plural' && count === 1) {
    return THERE_IS_ONE_BY_LOCALE[locale] || THERE_IS_ONE_BY_LOCALE.en;
  }
  const localeFrames = FRAME_BY_LOCALE[locale] || FRAME_BY_LOCALE.en;
  return localeFrames[framePreset] || FRAME_TEMPLATES_EN[framePreset] || '{item}';
}
