/**
 * types/_shared/spelling-words.js — the Spelling & Word Building maker's words (2026-11-02, NEW-TEMPLATES §3):
 *   pool(theme, L, min, max)  the theme's picture words a child can spell: the reviewed picture-word rules
 *                             (lib/picture-word-review.js freshKeep, lib/picture-name-refusals.js — the pictures a child
 *                             names otherwise), one word of letters only, min…max letters, one entry per word; the word as
 *                             the page prints it (de nouns capitalised, lib/b2-common.js displayWord)
 *   isWord(s, L)              true when s is a word of the locale's vocabulary (any picture word, singular or plural): a
 *                             scramble, a blank pattern or a misspelling must never be one
 *   isRealFor(s, word, L)     isWord, or a real word of the 50k list that conflicts with the picture word
 *                             (data/spelling/rivals.js), or a word a native review found (REAL_EXTRA)
 *   misspellings(word, L)     every wrong spelling a child of the language plausibly writes ({ s, kind }: double, single,
 *                             cluster, the language's own confusions SUB …) — G2-492; tools/build-spelling-rivals.js reads it
 *   rudeFit(pattern, L)       true when a pattern or a string fits a rude / toilet word of the language (d_ck, p_t_)
 *   units(word, L)            the word's letters as a child writes them (nl ij is one)
 *   decodable(word, L)        a word a kindergartner can build from its sounds (K-560 level 1)
 *   fits(pattern, L, except)  the other vocabulary words a pattern ("b_c_cl_", null = a blank) also fits
 *   VOWELS[L]                 the vowel letters of each language (y is a vowel in sv / da / no / fi; the accented vowels
 *                             of fr / es / pt / it; ä ö ü å æ ø)
 */
'use strict';
const { entriesFor, displayWord, distinctByWord, vocab } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');

const VOWELS = {
  en: 'aeiou', de: 'aeiouäöü', fr: 'aeiouyàâäéèêëîïôöùûüœ', es: 'aeiouáéíóúü', pt: 'aeiouáâãàéêíóôõú', it: 'aeiouàèéìíòóù',
  nl: 'aeiouëïé', sv: 'aeiouyåäö', da: 'aeiouyæøå', no: 'aeiouyæøå', fi: 'aeiouyäö',
};
const isVowel = (c, L) => (L === 'nl' && String(c).toLowerCase() === 'ij') || (String(c).length === 1 && (VOWELS[L] || VOWELS.en).includes(String(c).toLocaleLowerCase(L)));

const _words = {};
function wordSet(L) {
  if (_words[L]) return _words[L];
  const set = new Set();
  for (const e of Object.values(vocab())) {
    const f = e && e[L];
    if (!f) continue;
    for (const w of [f[0], f[1]]) if (w) set.add(String(w).toLocaleLowerCase(L).trim());
  }
  return (_words[L] = set);
}
const isWord = (s, L) => wordSet(L).has(String(s).toLocaleLowerCase(L));

// the real words beyond our vocabulary that conflict with a picture word (its anagrams, its one-change spellings):
// data/spelling/rivals.js, built from a 50k word list per language — a scramble or a "wrong spelling" must never be one
const RIVALS = require('../../data/spelling/rivals.js');
const _riv = {};
function rivalsOf(word, L) {
  const w = String(word).toLocaleLowerCase(L), k = L + '|' + w;
  if (!(k in _riv)) _riv[k] = new Set(((RIVALS[L] || {})[w] || '').split(' ').filter(Boolean));
  return _riv[k];
}
// real words the 50k list misses that a native review found on a page (2026-11-03): never a scramble or a wrong spelling
const REAL_EXTRA = {
  en: 'scoter charry tige rabbet appel tain', de: 'würfle', fr: 'banne', es: 'camelo buro lacha', pt: 'catas avio', it: 'armo lapone anana aere angaria ramo orma roma amor',
  nl: '', sv: 'halon inkan', da: '', no: '', fi: 'kussa kisa kissaa',
};
const _extra = {};
const isExtra = (s, L) => (_extra[L] = _extra[L] || new Set((REAL_EXTRA[L] || '').split(' ').filter(Boolean))).has(String(s).toLocaleLowerCase(L));
/** true when s is a real word of the language that conflicts with the picture word (vocabulary, the rivals list, the
 *  review's extra words) */
const isRealFor = (s, word, L) => isWord(s, L) || isExtra(s, L) || rivalsOf(word, L).has(String(s).toLocaleLowerCase(L));

// rude and toilet words of each language (2026-11-03 review: d_ck, p_t_, c_c_): a blank pattern, a scramble or a wrong
// spelling never fits one
const RUDE = {
  en: 'fuck shit dick cock cunt piss tits twat slut whore hore crap fart butt poop puke damn', de: 'fick kacke pisse arsch titte furz pimmel',
  fr: 'caca merde cul pipi zizi pute con conne bite', es: 'puta puto pito culo mierda caca coño pene verga pedo joto',
  pt: 'caca cocô coco cu puta puto porra merda piroca pinto bunda peido', it: 'cacca culo merda cazzo figa pipì pisello',
  nl: 'kut lul poep pik kak zak tiet', sv: 'kuk fitta skit bajs kiss piss', da: 'pik fisse lort tis prut røv', no: 'kuk fitte dritt tiss promp faen ræv',
  fi: 'kusi kakka paska vittu kyrpä perse pissa pieru',
};
const _rude = {};
const rudeWords = (L) => (_rude[L] = _rude[L] || (RUDE[L] || '').split(' ').filter(Boolean));
/** true when a pattern (letters, null = a blank) fits a rude word of the language — or a string IS one */
function rudeFit(pattern, L, except) {
  const p = typeof pattern === 'string' ? [...pattern.toLocaleLowerCase(L)] : pattern, ex = except ? String(except).toLocaleLowerCase(L) : null;
  return rudeWords(L).some((w) => w !== ex && [...w].length === p.length && [...w].every((c, i) => p[i] == null || String(p[i]).toLocaleLowerCase(L) === c));
}

/** the letters of a word as a child writes them: nl ij is ONE letter (one tile, one box, never split) */
function units(word, L) {
  const ch = [...word];
  if (L !== 'nl') return ch;
  const out = [];
  for (let i = 0; i < ch.length; i++) {
    if (ch[i].toLowerCase() === 'i' && (ch[i + 1] || '').toLowerCase() === 'j') { out.push(ch[i] + ch[i + 1]); i++; } else out.push(ch[i]);
  }
  return out;
}

// ------------------------------------------------------------------------------------- the wrong spellings a child makes
// (G2-492 Circle the Right Spelling; review 2026-11-03: "one change" must be an error a child of that language really
// makes — never a final letter doubled, a letter the language never doubles, the only vowel of a syllable dropped, a vowel
// the child cannot hear there, or a swap that leaves an impossible start). Every rule acts after the first letter (the
// picture's sound) and never on a final vowel that marks gender (es / pt / it / fr).
//   double    a consonant between two vowels, after a single vowel, written twice (rabit ↔ rabbit, Tiger → Tigger) — only
//             the letters each language really doubles (DBL)
//   single    a double consonant written once (rabit, Kamm → Kam, perro → pero)
//   cluster   one consonant of a consonant cluster left out (zebra → zeba, Pferd → Ferd? no: first letter stays)
//   sub       the language's own spelling confusions (SUB): en e/i ck/k ph/f -le/-el ee/ea + silent e; de ä/e ie/i ck/k tz/z
//             ß/ss Dehnungs-h, final d/t g/k b/p, v/f; fr the mute final letter, accents, au/eau/o, an/en, ph/f, ss/s;
//             es b/v ll/y c/s/z g/j h rr/r mb/nb gu/g accents; pt s/ss/ç/z x/ch final o/u e/i accents lh nh rr g/j; it
//             qu/cu cq mp/np gli/li gn chi/ci accents; nl ei/ij au/ou final d/t g/ch v/f z/s long/short vowels; sv e/ä o/å
//             stj/sj hj kj/tj g/j; da / no e/æ o/å silent d, sj/skj; fi vowel and consonant length only
const V_ALL = (L) => VOWELS[L] || VOWELS.en;
const DBL = { en: 'bdfglmnprstz', de: 'lmnptfsr', fr: 'lntsrmpfc', es: 'r', pt: 'rs', it: 'bcdfglmnprstvz', nl: 'lmnptfsrk', sv: 'klmnpstrfgdb', da: 'klmnpstrfb', no: 'klmnpstrfgbd', fi: 'kptlmnsr' };
const SGL = { es: 'r', pt: 'rs' };   // es / pt: only rr / ss are single-able errors (ll is another sound)
// [from, to, where]: where = 'end' (from ends the word), 'mid' (not at the end), 'vv' (between vowels), '' anywhere after the
// first letter; 'pre:<letters>' the next letter is one of them
const SUB = {
  en: [['e', 'i', 'single'], ['i', 'e', 'single'], ['a', 'e', 'single'], ['u', 'o', 'single'], ['ck', 'k', ''], ['ck', 'c', 'end'], ['ph', 'f', ''], ['le', 'el', 'end'], ['ee', 'ea', ''], ['ea', 'ee', ''], ['ea', 'e', ''], ['ai', 'a', ''],
    ['ce', 'se', ''], ['ci', 'si', ''], ['er', 'ur', 'pre:bcdfghklmnpstvz'], ['ir', 'ur', ''], ['or', 'er', 'end'], ['tch', 'ch', ''], ['dge', 'ge', ''], ['ow', 'o', 'end'], ['y', 'ie', 'end'], ['wh', 'w', 'start'], ['oo', 'u', 'pre:kd']],
  de: [['ä', 'e', ''], ['e', 'ä', 'first'], ['ie', 'i', ''], ['i', 'ie', 'pre:bdfgklmnprstz'], ['ck', 'k', ''], ['ck', 'kk', ''], ['tz', 'z', ''], ['ß', 'ss', ''], ['eu', 'äu', ''], ['äu', 'eu', ''], ['ei', 'ai', ''],
    ['ah', 'a', ''], ['eh', 'e', ''], ['oh', 'o', ''], ['uh', 'u', ''], ['a', 'ah', 'pre:lmnr'], ['d', 't', 'end'], ['g', 'k', 'end'], ['b', 'p', 'end'], ['v', 'f', 'av'], ['f', 'v', 'av'], ['pf', 'f', ''], ['er', 'a', 'end'], ['qu', 'kw', '']],
  fr: [['é', 'e', ''], ['è', 'e', ''], ['ê', 'e', ''], ['è', 'ai', ''], ['ai', 'è', ''], ['eau', 'o', ''], ['au', 'o', ''], ['an', 'en', ''], ['en', 'an', ''], ['ph', 'f', ''], ['ss', 's', ''], ['ç', 'c', ''], ['qu', 'k', ''],
    ['mp', 'np', ''], ['mb', 'nb', ''], ['oi', 'oa', ''], ['ge', 'je', ''], ['s', 'z', 'vv'], ['ill', 'y', ''], ['e', 'é', 'single'], ['h', '', 'start'],
    ['t', '', 'end'], ['d', '', 'end'], ['x', '', 'end'], ['p', '', 'end'], ['z', '', 'end']],
  es: [['b', 'v', ''], ['v', 'b', ''], ['ll', 'y', ''], ['y', 'll', 'mid'], ['ce', 'se', ''], ['ci', 'si', ''], ['se', 'ce', ''], ['si', 'ci', ''], ['z', 's', ''], ['s', 'z', 'pre:aou'], ['ge', 'je', ''], ['gi', 'ji', ''], ['je', 'ge', ''], ['ji', 'gi', ''],
    ['h', '', 'notc'], ['h', '', 'start'], ['mb', 'nb', ''], ['mp', 'np', ''], ['gui', 'gi', ''], ['gue', 'ge', ''], ['qui', 'ki', ''], ['que', 'ke', ''], ['c', 'k', 'pre:aou'], ['gua', 'wa', ''], ['ñ', 'ni', ''], ['á', 'a', ''], ['é', 'e', ''], ['í', 'i', ''], ['ó', 'o', ''], ['ú', 'u', '']],
  pt: [['ç', 'ss', ''], ['ss', 'ç', ''], ['s', 'ç', 'pre:aou'], ['s', 'z', 'vv'], ['z', 's', 'vv'], ['ce', 'sse', 'av'], ['ci', 'ssi', 'av'], ['x', 'ch', ''], ['ch', 'x', ''], ['o', 'u', 'end'], ['e', 'i', 'end'], ['l', 'u', 'end'], ['u', 'l', 'end'],
    ['lh', 'li', ''], ['nh', 'ni', ''], ['lh', 'l', ''], ['nh', 'n', ''], ['m', 'n', 'end'], ['c', 'k', 'pre:aou'], ['qu', 'k', ''], ['ge', 'je', ''], ['gi', 'ji', ''], ['je', 'ge', ''], ['ji', 'gi', ''], ['h', '', 'start'],
    ['mb', 'nb', ''], ['mp', 'np', ''], ['á', 'a', ''], ['â', 'a', ''], ['ã', 'a', ''], ['é', 'e', ''], ['ê', 'e', ''], ['í', 'i', ''], ['ó', 'o', ''], ['ô', 'o', ''], ['õ', 'o', ''], ['ú', 'u', '']],
  it: [['qu', 'cu', ''], ['cu', 'qu', 'pre:aeio'], ['cq', 'q', ''], ['mp', 'np', ''], ['mb', 'nb', ''], ['gli', 'li', ''], ['gn', 'ni', ''], ['chi', 'ci', ''], ['che', 'ce', ''], ['ghi', 'gi', ''], ['ghe', 'ge', ''],
    ['sce', 'se', ''], ['sci', 'si', ''], ['cie', 'ce', ''], ['gie', 'ge', ''], ['à', 'a', ''], ['è', 'e', ''], ['é', 'e', ''], ['ì', 'i', ''], ['ò', 'o', ''], ['ù', 'u', '']],
  nl: [['ei', 'ij', ''], ['ij', 'ei', ''], ['au', 'ou', ''], ['ou', 'au', ''], ['d', 't', 'end'], ['t', 'd', 'end'], ['v', 'f', 'mid'], ['f', 'v', 'mid'], ['z', 's', 'mid'], ['aa', 'a', ''], ['ee', 'e', ''], ['oo', 'o', ''], ['uu', 'u', ''],
    ['ng', 'nk', 'end'], ['ie', 'i', ''], ['c', 'k', 'pre:aou'], ['oe', 'u', '']],
  sv: [['ä', 'e', 'first'], ['e', 'ä', 'first'], ['å', 'o', 'first'], ['o', 'å', 'first'], ['y', 'i', 'first'], ['stj', 'sj', ''], ['skj', 'sj', ''], ['sj', 'skj', ''], ['kj', 'tj', ''], ['tj', 'kj', ''], ['hj', 'j', 'start'], ['dj', 'j', 'start'], ['lj', 'j', 'start'],
    ['ck', 'k', ''], ['x', 'ks', ''], ['ks', 'x', '']],
  da: [['æ', 'e', 'first'], ['e', 'æ', 'first'], ['å', 'o', 'first'], ['o', 'å', 'first'], ['nd', 'n', 'end'], ['ld', 'l', 'end'], ['sj', 'skj', ''], ['er', 'a', 'end'], ['nd', 'n', 'mid'], ['hv', 'v', 'start'], ['hj', 'j', 'start'], ['ig', 'i', 'end'], ['x', 'ks', ''], ['ej', 'aj', '']],
  no: [['æ', 'e', 'first'], ['e', 'æ', 'first'], ['å', 'o', 'first'], ['o', 'å', 'first'], ['nd', 'n', 'end'], ['ld', 'l', 'end'], ['skj', 'sj', ''], ['sj', 'skj', ''], ['kj', 'sj', ''], ['hv', 'v', 'start'], ['hj', 'j', 'start'], ['gj', 'j', 'start'], ['ig', 'i', 'end'], ['x', 'ks', '']],
  fi: [],
};
// the two-letter spellings a cluster drop must not break (sh, ch, ck …): the letters stay together
const DIGRAPH = /^(ch|sh|th|ph|ck|ng|gh|qu|sc|tj|sj|kj|hj|lh|nh|gn|gl|ll|rr|ss|ij|tz|dj|gj|lj|sk|cq|nk|st)$/;

/** every wrong spelling of the word a child of this language plausibly writes: [{ s, kind }] (unfiltered for real words) */
function misspellings(word, L) {
  const ch = [...word], n = ch.length, low = ch.map((c) => c.toLocaleLowerCase(L)), V = V_ALL(L);
  // a letter is a vowel (never the empty string past the end); nl: the j of ij counts with its i
  const isV = (c, i) => !!c && (V.includes(c) || (L === 'nl' && c === 'j' && i != null && low[i - 1] === 'i')), out = [];
  const push = (arr, kind) => { const s = arr.join(''); if (s.toLocaleLowerCase(L) !== word.toLocaleLowerCase(L)) out.push({ s, kind }); };
  const inIJ = (i) => L === 'nl' && ((low[i] === 'i' && low[i + 1] === 'j') || (low[i] === 'j' && low[i - 1] === 'i'));
  // en: a silent e — the magic e at the end (whale) or of a compound's first part (skateboard): the consonant before it is
  // never doubled and the vowel before that keeps its sound
  const silentE = (k) => L === 'en' && low[k] === 'e' && k >= 2 && !isV(low[k - 1]) && isV(low[k - 2]) && (k === n - 1 || (!isV(low[k + 1]) && isV(low[k + 2])));
  const dbl = DBL[L] || '', sgl = SGL[L];
  for (let i = 1; i < n; i++) {
    const c = low[i];
    // double: between vowels, after a single vowel (not a vowel team), not before or after the same letter
    const magic = L === 'en' && (silentE(i + 1) || silentE(i - 1));
    if (!magic && dbl.includes(c) && i + 1 < n && isV(low[i - 1], i - 1) && isV(low[i + 1], i + 1) && !(i >= 2 && isV(low[i - 2], i - 2)) && !inIJ(i)) push([...ch.slice(0, i + 1), ch[i], ...ch.slice(i + 1)], 'double');
    // single: a double consonant written once
    if (i + 1 < n && c === low[i + 1] && !isV(c) && (!sgl || sgl.includes(c))) push([...ch.slice(0, i), ...ch.slice(i + 1)], 'single');
    // fi vowel length: a long vowel written short
    if (L === 'fi' && i + 1 < n && c === low[i + 1] && isV(c)) push([...ch.slice(0, i), ...ch.slice(i + 1)], 'length');
    // cluster: the consonant a child leaves out of a cluster — an r / l after a consonant (zebra → zeba, flower → fower),
    // an m / n before a consonant (lamp → lap, Ente → Ete); never in a two-letter spelling (ng, nk, ch …), never a double
    const liquid = 'rl'.includes(c) && !isV(low[i - 1], i - 1) && isV(low[i + 1], i + 1) && !(L === 'en' && c === 'l' && i === n - 2 && low[n - 1] === 'e');   // not the -le of apple
    const nasal = 'mn'.includes(c) && isV(low[i - 1], i - 1) && i + 1 < n && !isV(low[i + 1], i + 1) && !((L === 'da' || L === 'no') && low[i + 1] === 'd');
    if ((liquid || nasal) && i + 1 < n && !inIJ(i) && c !== low[i - 1] && c !== low[i + 1]
      && !DIGRAPH.test(low[i - 1] + c) && !DIGRAPH.test(c + low[i + 1]) && L !== 'fi') push([...ch.slice(0, i), ...ch.slice(i + 1)], 'cluster');
  }
  // fi: a short vowel written long, in a syllable the child hears (between consonants, after the first letter)
  const firstV = low.findIndex((c) => isV(c));
  if (L === 'fi') for (let i = firstV + 2; i + 1 < n; i++) if (isV(low[i]) && !isV(low[i - 1]) && !isV(low[i + 1])) push([...ch.slice(0, i + 1), ch[i], ...ch.slice(i + 1)], 'length');
  // nl: a long vowel in an open syllable written double (tafel → taafel, bomen → boomen): the classic Dutch error
  if (L === 'nl') for (let i = 1; i + 2 < n; i++) if ('aeou'.includes(low[i]) && !isV(low[i - 1], i - 1) && !isV(low[i + 1], i + 1) && isV(low[i + 2], i + 2) && low[i + 1] !== low[i + 2]) push([...ch.slice(0, i + 1), ch[i], ...ch.slice(i + 1)], 'open');
  // en: the silent final e left out (whale → whal)
  if (L === 'en' && n >= 4 && low[n - 1] === 'e' && !isV(low[n - 2]) && !(low[n - 2] === 'l' && !isV(low[n - 3]))) push(ch.slice(0, -1), 'silent');   // not the -le of apple
  // the language's confusions
  const w = low.join('');
  for (const [from, to, where] of SUB[L] || []) {
    // start: a SILENT first letter left out (es / pt / fr huevo → uevo, da / no hval → val) or en wh → w: the first sound stays
    if (where === 'start') {
      if (w.startsWith(from) && n > from.length + 2) {
        const r = [...to, ...ch.slice(from.length)], cap = ch[0] !== low[0];   // a capital first letter stays a capital
        if (cap) r[0] = r[0].toLocaleUpperCase(L);
        push(r, 'sub:' + from);
      }
      continue;
    }
    for (let at = w.indexOf(from, 1); at >= 1; at = w.indexOf(from, at + 1)) {
      if (from === 'y' && isV(low[at - 1])) continue;                  // en y → ie after a consonant (puppy → puppie; not monkey)
      if (from === 's' && to === 'ç' && isV(low[at - 1])) continue;     // pt s → ç after a consonant (bolsa → bolça; casa sounds z)
      const end = at + from.length === n;
      if (where === 'end' && !end) continue;
      if (where === 'mid' && end) continue;
      if (from === 'le' && L === 'en' && isV(low[at - 1])) continue;   // -le/-el only after a consonant (apple, turtle; not whale)
      if (where === 'vv' && !(isV(low[at - 1]) && isV(low[at + from.length] || ''))) continue;
      if (where.startsWith('pre:') && !where.slice(4).includes(low[at + from.length] || '#')) continue;
      // first: only the word's first vowel (the stressed syllable of a Nordic / German child's word: dåcka, not cykäl)
      if (where === 'first' && low.findIndex((c, k) => isV(c, k)) !== at) continue;
      // single: a lone vowel letter between consonants (lemon → limon; not the e of monkey); av: after a vowel (Schaufel)
      const cons = (c) => !!c && !isV(c) && c !== 'y' && c !== 'w';
      if (where === 'single' && !(cons(low[at - 1]) && cons(low[at + from.length]))) continue;
      if (where === 'av' && !isV(low[at - 1])) continue;
      // de: i → ie never inside ei / ai / eu (Schwein, Eimer); a → ah never before a double letter (Ballon)
      if (L === 'de' && from === 'i' && 'aeu'.includes(low[at - 1])) continue;
      if (L === 'de' && from === 'e' && 'iu'.includes(low[at + 1] || '')) continue;
      // fr an / en only where it is nasal (before a consonant other than n / m, or at the end): canard, ananas, banane are not
      if (L === 'fr' && (from === 'an' || from === 'en') && low[at + 2] && (isV(low[at + 2]) || 'nm'.includes(low[at + 2]))) continue;
      // en: ir inside air is not the ir of bird (airplane)
      if (L === 'en' && from === 'ir' && isV(low[at - 1])) continue;
      // en: the vowel before a magic e keeps its sound (slide → slede is no child's error)
      if (L === 'en' && where === 'single' && (silentE(at + 2) || silentE(at))) continue;
      if (L === 'de' && from === 'a' && low[at + 1] === low[at + 2]) continue;
      if (where === 'notc' && low[at - 1] === 'c') continue;             // es h: never the h of ch (cuchara)
      if (L === 'nl' && from !== 'ij' && (inIJ(at) || inIJ(at + from.length - 1))) continue;
      push([...ch.slice(0, at), ...to, ...ch.slice(at + from.length)], 'sub:' + from);
    }
  }
  // never three letters alike in a row; at least three letters
  return out.filter((x) => [...x.s].length >= 3 && !/(.)\1\1/iu.test(x.s));
}

/** the vocabulary words (other than `except` — a word, or the entry itself: its own singular and plural, since the one
 *  pictured thing rules its plural out, it gatto / gatti) that a pattern fits: pattern = letters, null for a blank */
function fits(pattern, L, except) {
  const exc = except && typeof except === 'object' && !Array.isArray(except) ? [except.word, except.singular, except.plural] : [].concat(except || []);
  const ex = new Set(exc.filter(Boolean).map((x) => String(x).toLocaleLowerCase(L))), n = pattern.length, out = [];
  for (const w of wordSet(L)) {
    if (ex.has(w) || [...w].length !== n) continue;
    const ch = [...w];
    if (pattern.every((p, i) => p == null || String(p).toLocaleLowerCase(L) === ch[i])) out.push(w);
  }
  return out;
}

// words a spelling page never asks for (review 2026-11-03): a stored "singular" that is a plural or a game (dés, Buntstifte
// for three crayons, blocks); an English loanword whose spelling breaks the language's sound rules (de Skateboard, nl
// Baby, es scooter); a child in the toys theme (a girl, a baby are not toys)
const NOT_SPELLED = new Set(['blocks', 'cards', 'crayons', 'dice', 'chess', 'lego', 'domino', 'whiteboard']);
const LOAN = { skateboard: 'de fr it nl sv da no pt', grapefruit: 'de nl sv da no', scooter: 'es', baby: 'de nl da no' };
const THEME_OUT = { toys: new Set(['girl', 'baby', 'baby_girl']) };
const loanword = (key, L) => !!(LOAN[key] && LOAN[key].split(' ').includes(L));

/**
 * true when a kindergartner can build the word from its sounds (K-560 level 1, review 2026-11-03): en a short-vowel word
 * (no silent e, no vowel team: cat, duck, frog — not kite, boat, dice); fr no silent final letter and no eau (lune, sac —
 * not chat, loup, seau); da no silent letter (hv-, a final d after n / l / r, a g between vowels: not hval, måge, hund);
 * es / pt / it no k or w and no silent h (not kiwi, koala, búho); the other languages spell as they sound
 */
function decodable(word, L) {
  const w = String(word).toLocaleLowerCase(L);
  if (L === 'en') return /^[^aeiou]{0,2}[aeiou][^aeiouwy]{1,2}$/.test(w) && !/e$/.test(w);
  if (L === 'fr') return !/[tdsxpzg]$/.test(w) && !/eau|ent$/.test(w);
  if (L === 'da') return !/^hv|[nlr]d$|[aeiouyæøå]g[aeiouyæøå]|g$/.test(w);
  if (L === 'es' || L === 'pt' || L === 'it') return !/[kw]/.test(w) && !/(^|[^cln])h/.test(w);
  return true;
}

function pool(theme, L, min, max) {
  const out = entriesFor(theme, L).filter((e) => freshKeep(theme, e, L) && !nameRefused(theme, e.noun)
      && !NOT_SPELLED.has(e.vocabKey) && !loanword(e.vocabKey, L) && !(THEME_OUT[theme] && THEME_OUT[theme].has(e.noun)))
    .map((e) => ({ ...e, word: displayWord(e.singular, L) }))
    .filter((e) => /^\p{L}+$/u.test(e.word) && [...e.word].length >= min && [...e.word].length <= max);
  return distinctByWord(out, (e) => e.word.toLocaleLowerCase(L));
}

module.exports = { pool, isWord, isRealFor, rivalsOf, fits, VOWELS, isVowel, misspellings, rudeFit, units, decodable };
