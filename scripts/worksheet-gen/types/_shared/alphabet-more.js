/**
 * alphabet-more.js — what the Alphabet & Letters maker's new templates share (2026-11-02, NEW-TEMPLATES §37): the
 * locale's alphabet in its school order (data/literacy/letter-knowledge.json: en a–z, de + ä ö ü, es ñ after n, it the
 * 21-letter strip, sv/fi + å ä ö, da/no + æ ø å), its vowels (the same file, with every accented form of a vowel), and the
 * one reviewed picture per letter (data/alphabet/letter-pictures.json — the letter-picture chart of the Letter Tracing
 * maker: approved words whose first SOUND is the letter, the pictures opened on contact sheets, the native review's word
 * rejections; a letter with no honest picture has none, and a template then shows the letter alone, never a wrong-sound
 * picture). Pure.
 */
'use strict';
const LK = require('../../data/literacy/letter-knowledge.json');
const LP = require('../../data/alphabet/letter-pictures.json');
const { fileUri } = require('../../image-cache/resolve.js');

const loc2 = (locale) => String(locale || 'en').slice(0, 2);

/** the alphabet of the locale, lowercase, in school order */
function alphabetOf(locale) {
  const a = LK.alphabets[loc2(locale)];
  if (!a) throw new Error('alphabet-more: no alphabet for ' + locale);
  return [...a];
}

/**
 * the alphabet a child puts IN ORDER (train, cards, before / after): de is a–z — Ä Ö Ü belong to the Anlauttabelle but
 * have no place in the German ABC sequence (in ordering ä sorts as a), so an ordering task never asks for one (native
 * review 2026-11-02). Every other locale orders its whole school alphabet (sv/fi … å ä ö, da/no … æ ø å, es ñ).
 */
function orderAlphabetOf(locale) {
  const a = alphabetOf(locale);
  return loc2(locale) === 'de' ? a.filter((ch) => !'äöü'.includes(ch)) : a;
}

/** the vowels of the locale (the file's list + every accented letter whose base is one of them) */
function isVowel(ch, locale) {
  const v = (LK.vowels[loc2(locale)] || 'aeiou');
  const low = ch.toLocaleLowerCase(loc2(locale));
  if (v.includes(low)) return true;
  const base = low.normalize('NFD')[0];
  return 'aeiou'.includes(base) && base !== low;
}

/** the chart picture of a letter: { theme, noun, word, src } or null (no honest picture) */
function pictureOf(letter, locale) {
  const L = loc2(locale);
  const e = ((LP.letters[L] || {})[letter.toLocaleUpperCase(L)] || [])[0];
  return e ? { theme: e.theme, noun: e.noun, word: e.word, src: fileUri(e.theme, e.noun) } : null;
}

/**
 * the chart for a page where the child NAMES a picture with no word beside it (K-535, K-536): the chart pictures a child
 * names otherwise on its own are left out — a narwhal is "Wal", a hen is "chicken" (en) / "kip" (nl), an Easter egg is
 * "påskägg"; every picture refused for name tasks (lib/picture-name-refusals.js, by noun) too
 */
// the pictures named otherwise in every language (lib/picture-name-risk.js: narwhal, hen, wolf, goose)
const { UNAIDED_KEYS } = require('../../lib/picture-name-risk.js');
const SOUND_NAME_RISK = require('../../data/literacy/sound-name-risk.json');
// per language (native + pedagogy review 2026-11-02): fi croissant → "voisarvi", de Verband → "Pflaster", es búho →
// "tecolote", it mais → "pannocchia", benda → "cerotto"
const UNAIDED_WORDS = { fi: ['croissant'], de: ['Verband'], es: ['búho'], it: ['mais', 'benda'] };
function unaidedChart(locale) {
  const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
  const nouns = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
  const L = loc2(locale), words = new Set(UNAIDED_WORDS[L] || []);
  // pictures a child names with another word that starts otherwise (2026-11-03 native review: a wolf that looks like a
  // husky is "dog", "poes" for the Dutch kat, "Ente" for die Gans) — data/literacy/sound-name-risk.json
  const risky = (SOUND_NAME_RISK.beginning || {})[L] || {};
  const out = {};
  for (const [up, list] of Object.entries(LP.letters[L] || {})) out[up] = list.filter((e) => !UNAIDED_KEYS.has(e.key) && !words.has(e.word) && risky[e.key] == null && !nameRefused(e.theme, e.noun) && !nouns.has(e.noun));
  return out;
}

/**
 * letters that can spell the SAME first sound in the language (the review's rule, 2026-11-02): never a "different"
 * pair of K-535, never two options of one K-536 card — en c / k and c / s (city), es-MX c / s / z, b / v, ll / y, u / w
 * (huevo), fr c / s, y / i, w / v, g / j, e / é, pt c / s, it s / z (sbarra), sv e / ä and o / u, da a / e / æ and o / å,
 * no o / å and e / æ, nl c / s / z and f / v (the north says v as f), fi b / p (a loan sound children say as p) …
 */
const SAME_SOUND = {
  en: ['ck', 'cs', 'gj', 'iy'], de: ['ck', 'fv', 'vw', 'eä'], fr: ['ckq', 'cs', 'gj', 'iy', 'vw', 'eé'],
  es: ['ckq', 'csz', 'bv', 'yl', 'iy', 'uw', 'gj'], pt: ['ckq', 'cs', 'gj'], it: ['cq', 'sz'], nl: ['csz', 'fv'],
  sv: ['csz', 'gj', 'ou', 'eä'], da: ['csz', 'aeæ', 'oå'], no: ['ck', 'sz', 'gj', 'oå', 'eæ'], fi: ['ck', 'bp'],
};
const sameSound = (a, b, locale) => a === b || (SAME_SOUND[loc2(locale)] || []).some((g) => g.includes(a) && g.includes(b));

/** letter shown in the page's case */
const inCase = (ch, upper, locale) => (upper ? ch.toLocaleUpperCase(loc2(locale)) : ch);

module.exports = { alphabetOf, orderAlphabetOf, unaidedChart, sameSound, SAME_SOUND, isVowel, pictureOf, inCase, loc2, UNAIDED_KEYS, SOUND_NAME_RISK };
