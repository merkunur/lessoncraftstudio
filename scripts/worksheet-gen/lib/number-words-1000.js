/**
 * number-words-1000 — cardinal number words 1..1000 for all 11 locales (Number of the Day maker 2026-11-02, NEW-TEMPLATES
 * §51 T1 / T2; ENGINES [number-of-the-day-Q1]). Below 100 every word is lib/number-words.js's (the published, native-
 * verified table, untouched); this file adds the hundreds and how each language joins them:
 *  - en  three hundred forty-seven (American: no "and"); one hundred; one thousand
 *  - de  dreihundertsiebenundvierzig (one word); hundert, hunderteins (as the 0..100 table: "hundert"); tausend
 *  - fr  1990 rectified spelling, every compound hyphenated (as the 0..100 table): trois-cent-quarante-sept; "cents" only
 *        when final (deux-cents, deux-cent-un); cent-un; trois-cent-quatre-vingts; mille
 *  - es  cien / ciento uno; doscientos … quinientos, setecientos, novecientos; trescientos cuarenta y siete; mil
 *  - pt  (BR) cem / cento e um; duzentos, trezentos, quatrocentos, quinhentos …; trezentos e quarenta e sete; mil
 *  - it  one word: trecentoquarantasette; cento + otto / ottanta elide (centotto, trecentottanta); a final tre takes the
 *        accent (centotré); mille
 *  - nl  one word: driehonderdzevenenveertig; honderd, honderdeen; duizend
 *  - sv  one word: trehundrafyrtiosju; hundra, hundraett (counting form ett); tusen
 *  - da  separate words, "og" before the rest: tre hundrede og syvogfyrre; hundrede, hundrede og en; tusind
 *  - no  (bokmål) separate words, "og" before the rest: tre hundre og førtisju; hundre, hundre og en; tusen
 *  - fi  one word: kolmesataaneljäkymmentäseitsemän; sata, kaksisataa; tuhat
 * alts(n, locale): other spellings a teacher accepts (de einhundert…, sv etthundra…, da/no et/ett hundre(de)…, fr the
 * traditional spaces, it centootto) — the screen accepts them; the key prints the main form.
 * Pure functions; throw outside 1..1000 (counting never includes 0 — refuse, don't guess).
 */
'use strict';
const { numberWord } = require('./number-words.js');

const HUNDREDS = {
  es: ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'],
  pt: ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'],
};
const THOUSAND = { en: 'one thousand', de: 'tausend', fr: 'mille', es: 'mil', pt: 'mil', it: 'mille', nl: 'duizend', sv: 'tusen', da: 'tusind', no: 'tusen', fi: 'tuhat' };

function word(n, locale) {
  const L = String(locale || 'en').slice(0, 2);
  if (!Number.isInteger(n) || n < 1 || n > 1000) throw new Error(`number-words-1000: ${n} outside 1..1000`);
  if (!THOUSAND[L]) throw new Error(`number-words-1000: no engine for locale ${L}`);
  // nl: 1 standing alone is «één» ("een" reads as the article «a»; G1-210's native review 2026-10-13)
  if (L === 'nl' && n === 1) return 'één';
  if (n <= 100) return numberWord(n, L);
  if (n === 1000) return THOUSAND[L];
  const h = Math.floor(n / 100), r = n % 100;
  const w = (k) => numberWord(k, L);
  switch (L) {
    case 'en': return `${w(h)} hundred` + (r ? ` ${w(r)}` : '');
    case 'de': return (h === 1 ? 'hundert' : `${w(h) === 'eins' ? 'ein' : w(h)}hundert`) + (r ? w(r) : '');
    case 'fr': return (h === 1 ? 'cent' : `${w(h)}-cent${r ? '' : 's'}`) + (r ? `-${w(r)}` : '');
    case 'es': return r ? `${HUNDREDS.es[h]} ${w(r)}` : (h === 1 ? 'cien' : HUNDREDS.es[h]);
    case 'pt': return r ? `${HUNDREDS.pt[h]} e ${w(r)}` : (h === 1 ? 'cem' : HUNDREDS.pt[h]);
    case 'it': {
      const head = h === 1 ? 'cento' : `${w(h)}cento`;
      if (!r) return head;
      const tail = r === 3 ? 'tré' : w(r);
      return (/^otta?/.test(tail) ? head.slice(0, -1) : head) + tail;
    }
    case 'nl': return (h === 1 ? 'honderd' : `${w(h)}honderd`) + (r ? w(r) : '');
    case 'sv': return (h === 1 ? 'hundra' : `${w(h)}hundra`) + (r ? w(r) : '');
    case 'da': return (h === 1 ? 'hundrede' : `${w(h)} hundrede`) + (r ? ` og ${w(r)}` : '');
    case 'no': return (h === 1 ? 'hundre' : `${w(h)} hundre`) + (r ? ` og ${w(r)}` : '');
    case 'fi': return (h === 1 ? 'sata' : `${w(h)}sataa`) + (r ? w(r) : '');
    default: throw new Error(`number-words-1000: no engine for locale ${L}`);
  }
}

/** spellings a teacher also accepts (the screen's alts); never the main form */
function alts(n, locale) {
  const L = String(locale || 'en').slice(0, 2), main = word(n, L), out = new Set();
  const h = Math.floor(n / 100);
  if (L === 'de' && h === 1 && n < 1000) out.add('ein' + main);
  if (L === 'de' && n === 1000) out.add('eintausend');
  if (L === 'sv' && h === 1 && n < 1000) out.add('ett' + main);
  if (L === 'sv' && n === 1000) out.add('ettusen');
  if (L === 'da' && h === 1 && n < 1000) out.add('et ' + main);
  if (L === 'da' && n === 1000) out.add('et tusind');
  if (L === 'no' && h === 1 && n < 1000) out.add('ett ' + main);
  if (L === 'no' && n === 1000) out.add('ett tusen');
  if (L === 'en' && n >= 101 && n < 1000 && n % 100) out.add(main.replace(' hundred ', ' hundred and '));
  if (L === 'it' && /centott/.test(main)) out.add(main.replace(/centott/, 'centoott'));
  if (L === 'nl' && n === 1) out.add('een');
  // pt: quatorze and catorze are both official in Brazil; no: Språkrådet allows a three-digit number as one word
  if (L === 'pt' && /quatorze/.test(main)) out.add(main.replace('quatorze', 'catorze'));
  if (L === 'no' && n > 100 && n < 1000) out.add(main.replace(/ /g, ''));
  if (L === 'it' && /centouno$/.test(main)) out.add(main.replace(/centouno$/, 'centuno'));
  if (L === 'fr' && n > 16) {
    // the traditional spelling: hyphens only inside the tens (dix-sept, quatre-vingt-dix), "et" and "cent" stand apart
    out.add(main.replace(/-et-/g, ' et ').replace(/(^|-)(cents?)(-|$)/g, (m, a, c, b) => `${a ? ' ' : ''}${c}${b ? ' ' : ''}`).replace(/-cent/g, ' cent').trim());
  }
  out.delete(main);
  return [...out];
}

module.exports = { numberWord1000: word, numberWordAlts: alts };
