/**
 * types/_shared/noun-forms.js — the One & Many, Articles maker's noun forms (2026-11-03, NEW-TEMPLATES §42): the article
 * a picture noun takes in each language, worked out from the vocabulary's own gender (REFERENCE TRANSLATIONS/
 * image-vocabulary.js, per-locale gender codes, never cross-applied: de m/f/n, fr es pt it m/f, nl d/h, sv da n/t,
 * no m/n), and the Nordic definite singular (a suffix: hund → hunden) from data/nouns-articles/definite-nordic.js.
 * Every function returns null where the language's rule cannot be decided from the data — the page then refuses the noun,
 * never guesses:
 *   fr / it  a noun starting with h (aspirated or mute: le hibou, l'hôtel — the vocabulary does not say)
 *   es       a feminine starting with a stressed a- (el águila, un hacha — the vocabulary has no stress)
 *   en       a/an by the first SOUND (a unicorn, an hour) with data/b2/articles.js's exception table
 *   it       lo / uno / l' / un' are the harder set: `hard` = false refuses those nouns (level 1)
 *   pool(theme, L)  the theme's picture nouns one and many can be shown of: the reviewed picture-word rules, one word, a
 *                   plural that differs from the singular, no mass / plural-only / brand noun (the K-287 list and the
 *                   articles pages' refusals)
 */
'use strict';
const { entriesFor, displayWord, distinctByWord } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');
const { ARTICLES, EN_EXCEPTIONS } = require('../../data/b2/articles.js');
const { DEFINITE } = require('../../data/nouns-articles/definite-nordic.js');

// mass, abstract, brand and plural-only nouns a K-2 teacher does not count (types/k/K-287-singular-plural.js SP_EXCLUDE, kept
// in step by hand: that file is a published page and stays untouched)
const EXCLUDE = new Set(['glue', 'paper', 'juice', 'jam', 'lemonade', 'harvest', 'durian', 'lego', 'ufo', 'dimetrodon', 'mosasaurus', 'oviraptor', 'maiasaura', 'sunscreen', 'evergreen', 'sauce', 'delivery', 'pottery', 'rain', 'shampoo', 'celery', 'sky', 'cast', 'soup', 'science', 'liberty', 'rudolph', 'cheese', 'cabbage', 'phlox', 'hornbill', 'iguanodon', 'ichthyosaurus', 'apatosaurus', 'carnotaurus', 'deinonychus', 'persimmon', 'macaron', 'cranberry', 'trillium', 'suv', 'jumpsuit', 'television', 'scallop', 'heptagon', 'cauliflower', 'beetroot', 'painting', 'thunderstorm', 'toast', 'sun', 'squid', 'nativity', 'wave', 'skeleton', 'syringe', 'tank',
  'milk', 'oil', 'christmas', 'seaweed', 'dice', 'chess', 'blocks', 'cards', 'crayons', 'domino', 'pants', 'scissors', 'pliers', 'tongs', 'stairs']);

// native corrections of the generated Nordic table (vocab key → forms, or null to refuse the noun)
// (native review 2026-11-03: museum → museet; a verb of the activities theme — sy, springa, lege, løbe, gå — is no noun;
// bokmål feminines take -a as well as -en: måka, dukka …)
const DEFINITE_FIX = {
  sv: { museum: ['museet'], sewing: null, run: null, running: null, sky: ['himlen'] },
  da: { play: null, run: null, running: null, sky: ['himlen'] },
  // a masculine whose -a form the word list holds for another reason (gutta = the boys, kama, krana) is no alternative
  no: { banana: ['bananen'], boy: ['gutten'], comb: ['kammen'], 'construction-crane': ['kranen'], faucet: ['kranen'], fox: ['reven'], rooster: ['hanen'], ant: ['mauren'], heel: ['hælen'], 'maple-tree': ['lønnen'],
    museum: ['museet'], television: null, walk: null, seagull: ['måken', 'måka'], doll: ['dukken', 'dukka'], church: ['kirken', 'kirka'], crown: ['kronen', 'krona'], drum: ['trommen', 'tromma'],
    barn: ['låven', 'låva'], bow: ['sløyfen', 'sløyfa'], bee: ['bien', 'bia'], caterpillar: ['larven', 'larva'], notebook: ['notatboken', 'notatboka'], 'light-bulb': ['lyspæren', 'lyspæra'] },
};
for (const L of Object.keys(DEFINITE_FIX)) for (const [k, v] of Object.entries(DEFINITE_FIX[L])) { if (v) DEFINITE[L][k] = v; else delete DEFINITE[L][k]; }

/** no: a feminine noun (its definite has an -a form, or the review named it) takes «ei» as well as «en» */
const NO_FEM_EXTRA = new Set(['pear', 'slide']);
const eiOK = (e) => NO_FEM_EXTRA.has(e.vocabKey) || ((DEFINITE.no || {})[e.vocabKey] || []).length > 1;

// a word this maker leaves out in one language (review 2026-11-03): fr navire (a CP child says bateau, a picture of its
// own), it cocco (the fruit is la noce di cocco), sv taxi (the plural becomes taxibilar)
const EXCLUDE_LOC = { fr: ['ship'], it: ['coconut'], sv: ['taxi'] };
// the other plurals and articles a teacher accepts (the page prints the first): en hippopotami, grapefruit; de Ballone;
// nl tractors, motors, het luipaard
const PLURAL_ALTS = { en: { hippopotamus: ['hippopotami'], grapefruit: ['grapefruit'] }, de: { balloon: ['Ballone'] }, nl: { tractor: ['tractors'], motorcycle: ['motors'] } };
const ARTICLE_ALTS = { nl: { leopard: ['het'] } };
const pluralAlts = (e, L) => ((PLURAL_ALTS[L] || {})[e.vocabKey] || []).slice();
const articleAlts = (e, L) => ((ARTICLE_ALTS[L] || {})[e.vocabKey] || []).slice();

const low = (s, L) => String(s).toLocaleLowerCase(L);
const H_START = /^h/i;
const VOW = /^[aeiouàâäéèêëîïôöùûüœ]/i;
// it: an s + consonant, z, gn, ps, pn, x, y or i + vowel takes lo / uno (data/b2/articles.js itKey)
const IT_LO = /^(s[bcdfghjklmnpqrstvwxz]|z|gn|ps|pn|x|y|i[aeiou])/i;
const ES_STRESSED_A = /^h?[aá]/i;

/** the indefinite article of the singular ('' for none), or null to refuse; hard = it lo/uno/l'/un' allowed */
function indefinite(e, L, hard) {
  const w = low(e.singular, L), g = e.gender;
  switch (L) {
    case 'en': {
      if (EN_EXCEPTIONS[w] != null) return EN_EXCEPTIONS[w] ? 'an' : 'a';   // an hour, a unicorn, a ewe
      if (w === 'umbrella' || w === 'uncle') return 'an';
      if (/^u/.test(w)) return null;                    // a unicorn / an umpire: the spelling does not decide
      return /^[aeio]/.test(w) ? 'an' : 'a';            // h: a horse (the an-h words are exceptions)
    }
    case 'de': return ({ m: 'ein', f: 'eine', n: 'ein' })[g] || null;
    case 'fr': return H_START.test(w) ? null : ({ m: 'un', f: 'une' })[g] || null;
    case 'es': return g === 'f' && ES_STRESSED_A.test(w) ? null : ({ m: 'un', f: 'una' })[g] || null;
    case 'pt': return ({ m: 'um', f: 'uma' })[g] || null;
    case 'it': {
      if (H_START.test(w)) return null;
      if (g === 'm') return IT_LO.test(w) ? (hard ? 'uno' : null) : 'un';
      if (g === 'f') return VOW.test(w) ? (hard ? "un'" : null) : 'una';
      return null;
    }
    case 'nl': return g === 'd' || g === 'h' ? 'een' : null;
    case 'sv': return ({ n: 'en', t: 'ett' })[g] || null;
    case 'da': return ({ n: 'en', t: 'et' })[g] || null;
    case 'no': return ({ m: 'en', n: 'et' })[g] || null;
    default: return null;                               // fi: no articles
  }
}

/** the definite article of the singular, or null (sv / da / no: use definiteNoun) */
function definite(e, L, hard) {
  const w = low(e.singular, L), g = e.gender;
  switch (L) {
    case 'en': return 'the';
    case 'de': return ({ m: 'der', f: 'die', n: 'das' })[g] || null;
    case 'fr': if (H_START.test(w) || !g) return null; return VOW.test(w) ? (hard ? "l'" : null) : ({ m: 'le', f: 'la' })[g] || null;
    case 'es': return g === 'f' && ES_STRESSED_A.test(w) ? null : ({ m: 'el', f: 'la' })[g] || null;
    case 'pt': return ({ m: 'o', f: 'a' })[g] || null;
    case 'it': {
      if (H_START.test(w) || !g) return null;
      if (VOW.test(w)) return hard ? "l'" : null;
      if (g === 'm') return IT_LO.test(w) ? (hard ? 'lo' : null) : 'il';
      return 'la';
    }
    case 'nl': return ({ d: 'de', h: 'het' })[g] || null;
    default: return null;
  }
}

/** the article of the plural ('' where the plural takes none in this use), or null */
function pluralArticle(e, L) {
  const w = low(e.singular, L), g = e.gender;
  switch (L) {
    case 'de': return g ? 'die' : null;
    case 'fr': return H_START.test(w) || !g ? null : 'les';
    case 'es': return g === 'f' && ES_STRESSED_A.test(w) ? null : ({ m: 'los', f: 'las' })[g] || null;
    case 'pt': return ({ m: 'os', f: 'as' })[g] || null;
    case 'it': {
      if (H_START.test(w) || !g) return null;
      if (g === 'f') return 'le';
      return VOW.test(w) || IT_LO.test(w) ? 'gli' : 'i';
    }
    case 'nl': return g ? 'de' : null;
    case 'en': case 'sv': case 'da': case 'no': case 'fi': return '';
    default: return null;
  }
}

/** sv / da / no: the definite singular as the page prints it ([form, ...accepted]) or null */
function definiteNoun(e, L) {
  const f = (DEFINITE[L] || {})[e.vocabKey];
  return f ? f.slice() : null;
}

/** the article set of a language at a level (the chips a child chooses from, canonical order) */
const PLURAL_ONLY_REFUSE = new Set(Object.values(ARTICLES).flatMap((a) => a.refuseKeys || []));

/** the theme's picture nouns with one and many forms ({...entry, sing, plur} — the words as the page prints them) */
// a child in the toys theme is no toy (review 2026-11-03: the girl, the baby)
const THEME_OUT = { toys: new Set(['girl', 'baby', 'baby_girl']) };

function pool(theme, L) {
  const out = entriesFor(theme, L).filter((e) => freshKeep(theme, e, L) && !nameRefused(theme, e.noun) && !EXCLUDE.has(e.vocabKey)
      && !(THEME_OUT[theme] && THEME_OUT[theme].has(e.noun)) && !(EXCLUDE_LOC[L] || []).includes(e.vocabKey)
      && !PLURAL_ONLY_REFUSE.has(e.vocabKey) && e.plural && low(e.plural, L).trim() !== low(e.singular, L).trim())
    .map((e) => ({ ...e, sing: displayWord(e.singular, L), plur: displayWord(e.plural, L) }))
    .filter((e) => /^\p{L}+$/u.test(e.sing) && /^\p{L}+$/u.test(e.plur));
  return distinctByWord(out, (e) => low(e.sing, L));
}

/** "l'" + "avion" → "l'avion"; "un'" + "ape" → "un'ape"; else article + space + word ('' article = the word alone) */
const join = (art, word) => (!art ? word : /'$/.test(art) ? art + word : art + ' ' + word);

module.exports = { indefinite, definite, pluralArticle, definiteNoun, pool, join, EXCLUDE, eiOK, pluralAlts, articleAlts };
