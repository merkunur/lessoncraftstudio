/**
 * articles.js — the per-locale contract for K-288 "circle the article"
 * (nt20-B). REBUILT per locale, never translated:
 *
 *   de der/die/das · nl de/het · fr le/la (d3 un/une) · es el/la · pt o/a ·
 *   it il/la (d3 il/lo/la/l') · sv en/ett · da en/et · no en/et ·
 *   en a/an (readiness; vowel-SOUND rule with an exceptions table) ·
 *   fi = NO articles → mode 'form': yksikkö/monikko (singular vs plural chip)
 *   keyed by the number of pictures on the card.
 *
 * `keyFor(entry, ctx) → chip index | null` — null REFUSES the noun (fr elision
 * nouns, it lo/l' nouns below d3, en nouns absent from the exceptions table
 * that start with a tricky vowel …). The generator never guesses.
 *
 * entry = { vocabKey, singular, plural, gender }  (gender = the vocab code for
 * the locale: de m/f/n · nl d/h · sv,da n/t · no m/f/n · fr,es,pt,it m/f)
 * ctx = { level (1|2|3), count (pictures on the card, fi) }
 *
 * The en exceptions and the fi rendering are audited by the native panels;
 * everything else is the locale's own grammar keyed off the vocab gender.
 */
'use strict';

// en: words whose SPELLING contradicts the vowel-sound rule. 0 = a, 1 = an.
const EN_EXCEPTIONS = {
  unicorn: 0, uniform: 0, unicycle: 0, university: 0, ukulele: 0, one: 0, eucalyptus: 0, ewe: 0, european: 0, user: 0, unit: 0,
  hour: 1, heir: 1, honest: 1, herb: 1, honor: 1, honour: 1,
};

function itKey(entry, ctx) {
  const w = entry.singular.toLowerCase();
  const level = (ctx && ctx.level) || 2;
  const vowel = /^[aeiouàèéìòù]/.test(w);
  const loCluster = /^(s[bcdfghjklmnpqrstvwxz]|z|gn|ps|pn|x|y|i[aeiou])/.test(w);
  if (entry.gender === 'f') {
    if (vowel) return level === 3 ? 3 : null;
    return level === 3 ? 2 : 1;
  }
  if (vowel) return level === 3 ? 3 : null;
  if (loCluster) return level === 3 ? 1 : null;
  return 0;
}

const ARTICLES = {
  de: { mode: 'article', chips: ['der', 'die', 'das'], keyFor: (e) => ({ m: 0, f: 1, n: 2 })[e.gender] ?? null, chipDots: ['codeBlue', 'codeRed', 'codeGreen'] },
  nl: { mode: 'article', chips: ['de', 'het'], keyFor: (e) => ({ d: 0, h: 1 })[e.gender] ?? null },
  sv: { mode: 'article', chips: ['en', 'ett'], keyFor: (e) => ({ n: 0, t: 1 })[e.gender] ?? null },
  da: { mode: 'article', chips: ['en', 'et'], keyFor: (e) => ({ n: 0, t: 1 })[e.gender] ?? null },
  // the no vocab tags m/f/n; bokmål schools accept "en" for every m/f noun,
  // so the card offers en/et and f nouns key to en (the panel may add 'ei')
  no: { mode: 'article', chips: ['en', 'et'], keyFor: (e) => ({ m: 0, f: 0, n: 1 })[e.gender] ?? null },
  es: { mode: 'article', chips: ['el', 'la'], keyFor: (e) => ({ m: 0, f: 1 })[e.gender] ?? null },
  pt: { mode: 'article', chips: ['o', 'a'], keyFor: (e) => ({ m: 0, f: 1 })[e.gender] ?? null },
  fr: {
    mode: 'article', chips: ['le', 'la'], chipsD3: ['un', 'une'],
    // elision nouns (vowel or h) take l' — refused rather than mis-keyed
    keyFor: (e) => (/^[aeiouyhéèêàâîïôûù]/i.test(e.singular) ? null : ({ m: 0, f: 1 })[e.gender] ?? null),
  },
  it: { mode: 'article', chips: ['il', 'la'], chipsD3: ['il', 'lo', 'la', "l'"], keyFor: itKey },
  en: {
    mode: 'article', chips: ['a', 'an'],
    keyFor: (e) => {
      const w = e.singular.toLowerCase();
      if (EN_EXCEPTIONS[w] != null) return EN_EXCEPTIONS[w];
      if (/^[eiou]/.test(w)) return 1;
      if (/^a/.test(w)) return 1;
      if (/^h/.test(w)) return 0;
      return 0;
    },
  },
  fi: {
    mode: 'form', chipsFor: (e) => [e.singular, e.plural],
    // 1 picture → singular chip, 2-3 pictures → plural chip
    keyFor: (e, ctx) => (e.plural && e.plural !== e.singular ? (ctx && ctx.count > 1 ? 1 : 0) : null),
  },
};

module.exports = { ARTICLES, EN_EXCEPTIONS };
