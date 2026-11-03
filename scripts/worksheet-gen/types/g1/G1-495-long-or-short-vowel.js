/**
 * G1-495 — Long or Short Vowel? (Phonics & Sounds maker 2026-11-02, NEW-TEMPLATES §38 T5; RF.1.2.a distinguish long
 * from short vowel sounds; fi OPS "pitkä ja lyhyt vokaali", de Dehnung / Schärfung, nl lange en korte klank, sv/no lång
 * och kort vokal): a picture and its word with the vowel in colour; the child says the word and circles the long line
 * when the vowel is long, the dot when it is short (the German school marks: Strich for long, Punkt for short).
 * A word is asked only where its SPELLING shows the length, so the answer is never a matter of accent:
 *   fi  a doubled vowel (tuuli) is long, a single vowel before a consonant (tuli) is short; a diphthong is never asked
 *   de  ie, a vowel + h, a doubled vowel → long; a vowel before a doubled consonant (ll mm nn pp tt ss ff ck tz) → short
 *   nl  one syllable: aa ee oo uu → long; one vowel letter closed by a consonant → short
 *   sv / no  one syllable: a vowel before ONE final consonant → long (bil, fot); before a doubled one or ck → short (katt)
 *   en  one syllable: a silent final e (cake, kite) or ai ay ee oa igh ie → long; consonant-vowel-consonant →
 *       short (not a + ll / l / r / w, o + r / w, w / qu before the vowel, bull / put / push)
 * es pt it fr da refused (no long / short vowel taught, or not marked in the spelling).
 * Every chip is a tap target; the right one is ringed on the key.
 * Levels: 1 six words · 2 eight words · 3 eight words, two-syllable words too (fi, de: the first vowel).
 */
'use strict';
const slot = require('../../lib/slot.js');
const { vocab, displayWord } = require('../../lib/b2-common.js');
const { manifest, labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const D = {
  1: { cards: 6, twoSyl: false, px: 84 },
  2: { cards: 8, twoSyl: false, px: 70 },
  3: { cards: 8, twoSyl: true, px: 70 },
};
const LOCALES = new Set(['fi', 'de', 'nl', 'sv', 'no', 'en']);
// words whose vowel length speakers do not agree on (review 2026-11-02: US sloth /slɑθ/ or /sloʊθ/)
const REJECT = { en: ['sloth'] };
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
let PIC = null;
function picOf(key) {
  if (!PIC) {
    PIC = new Map();
    for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) for (const n of labelSafeNouns(theme)) {
      const k = n.vocabKey || n.noun;
      if (!PIC.has(k) && !nameRefused(theme, n.noun) && !REFUSED_NOUNS.has(n.noun)) PIC.set(k, { theme, noun: n.noun });
    }
  }
  return PIC.get(key) || null;
}

/** { long: true|false, at: index of the judged vowel, len: its letters } or null when the spelling does not show it */
function judge(word, L, twoSyl) {
  const w = word.toLocaleLowerCase(L);
  const V = { fi: 'aeiouyäö', de: 'aeiouäöü', nl: 'aeiou', sv: 'aeiouyåäö', no: 'aeiouyæøå', en: 'aeiou' }[L];
  const isV = (c) => V.includes(c);
  const groups = w.match(new RegExp(`[${V}]+`, 'g')) || [];
  const first = w.search(new RegExp(`[${V}]`));
  if (first < 0) return null;
  const run = groups[0], after = w.slice(first + run.length);
  if (!twoSyl && groups.length > 1 && !(L === 'en' && /^[^aeiou]+[aeiou][^aeiouwyrx]e$/.test(w))) return null;
  if (L === 'fi') {
    if (run.length === 2 && run[0] === run[1]) return { long: true, at: first, len: 2 };
    if (run.length === 1 && after && !isV(after[0])) return { long: false, at: first, len: 1 };
    return null;
  }
  if (L === 'de') {
    if (run === 'ie' || (run.length === 2 && run[0] === run[1] && 'aeo'.includes(run[0]))) return { long: true, at: first, len: 2 };
    if (run.length === 1 && after[0] === 'h' && after[1] && !isV(after[1])) return { long: true, at: first, len: 1 };
    if (run.length === 1 && /^(ll|mm|nn|pp|tt|ss|ff|ck|tz|rr|bb|dd|gg)/.test(after)) return { long: false, at: first, len: 1 };
    return null;
  }
  if (L === 'nl') {
    if (groups.length !== 1 || !after || isV(after[0])) return null;
    if (run.length === 2 && run[0] === run[1] && 'aeou'.includes(run[0])) return { long: true, at: first, len: 2 };
    if (run.length === 1) return { long: false, at: first, len: 1 };
    return null;
  }
  if (L === 'sv' || L === 'no') {
    if (groups.length !== 1 || run.length !== 1 || !after) return null;
    // a final single m / n is written for a short vowel too (sv kam, no kam) and a final j makes a glide: never asked
    if (after.length === 1 && !'mnj'.includes(after)) return { long: true, at: first, len: 1 };
    if (after.length === 2 && (after[0] === after[1] || after === 'ck')) return { long: false, at: first, len: 1 };
    return null;
  }
  if (L === 'en') {
    // a plural (stairs, tongs), a silent b (comb), o before ng (song) and a vowel before r (deer, chair) are not asked
    if (/s$/.test(w) || /mb$/.test(w) || (run === 'o' && /^ng/.test(after)) || /^r/.test(after)) return null;
    // a silent e that does not lengthen (glove, dove, come) and a / o after w (swan, wolf) are not asked
    if (/(ove|ome|one)$/.test(w) && !/^(st|c|b|ph|thr)/.test(w.slice(0, first)) || /w$/.test(w.slice(0, first))) return null;
    if (/^[^aeiou]+[aeiou][^aeiouwyrx]e$/.test(w)) return { long: true, at: first, len: 1 };
    // (not oe / ue: shoe and glue are /uː/, which programs do not all call a long vowel)
    if (groups.length === 1 && /^(ai|ay|ee|oa|ie)$/.test(run)) return { long: true, at: first, len: 2 };
    if (groups.length === 1 && /igh/.test(w) && run === 'i') return { long: true, at: first, len: 1 };
    if (groups.length === 1 && run.length === 1 && /^[^aeiouwyr]+$/.test(after) && !/^(w|wh|qu)$/.test(w.slice(0, first))) {
      const c2 = after;
      if (run === 'a' && /^(ll|l|lk|lt)/.test(c2)) return null;
      if (run === 'o' && /^(ll|ld|st)$/.test(c2)) return null;
      if (run === 'u' && /^(b|p|f|sh)$/.test(w.slice(0, first)) && /^(ll|sh|t)$/.test(c2)) return null;
      if (run === 'i' && /^(nd|ld|gh)/.test(c2)) return null;
      return { long: false, at: first, len: 1 };
    }
    return null;
  }
  return null;
}

function poolFor(L, d) {
  const Vo = vocab(), out = [], seen = new Set();
  for (const key of Object.keys(Vo).sort()) {
    const v = Vo[key];
    if (!v[L] || !(v.de && v.de[2]) || (key.endsWith('s') && Vo[key.slice(0, -1)])) continue;
    const word = displayWord(v[L][0], L);
    if (!/^\p{L}+$/u.test(word) || [...word].length > 8 || seen.has(word)) continue;
    if ((REJECT[L] || []).includes(word.toLocaleLowerCase(L))) continue;
    const j = judge(word, L, d.twoSyl);
    if (!j) continue;
    const p = picOf(key);
    if (!p) continue;
    seen.add(word);
    out.push({ ...p, key, word, ...j });
  }
  return out;
}

const bar = (w) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="20" viewBox="0 0 ${w} 20" aria-hidden="true"><rect x="2" y="7" width="${w - 4}" height="6" rx="3" fill="${T.teal}"/></svg>`;
const dot = () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="${T.teal}"/></svg>`;

module.exports = {
  id: 'G1-495',
  slug: 'long-or-short-vowel',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'phonological-awareness',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Long or Short Vowel?', instruction: 'Say each word. Is the colored vowel long or short? Circle the line if it is long and the dot if it is short.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    if (!LOCALES.has(L)) throw new Error(`G1-495: ${L} refused (no long / short vowel shown by its spelling)`);
    // fi has few one-syllable nouns: its pages always judge the first vowel of longer words
    const pool = poolFor(L, L === 'fi' ? { ...d, twoSyl: true } : d);
    const long = rng.shuffle(pool.filter((x) => x.long)), short = rng.shuffle(pool.filter((x) => !x.long));
    const nl = Math.floor(d.cards / 2);
    if (long.length < nl || short.length < d.cards - nl) throw new Error(`G1-495: ${L} has ${long.length} long + ${short.length} short words`);
    let cards = rng.shuffle([...long.slice(0, nl), ...short.slice(0, d.cards - nl)]);
    const bad = (o) => { const s = o.map((c) => (c.long ? 1 : 0)); let run = 1; for (let i = 1; i < s.length; i++) { run = s[i] === s[i - 1] ? run + 1 : 1; if (run > 3) return true; } return s.every((v, i) => !i || v !== s[i - 1]); };
    for (let g = 0; g < 40 && bad(cards); g++) cards = rng.shuffle(cards);
    // a teacher's pictures (maker): a long-vowel word for a long one, a short for a short (the page's answers stay)
    const KS = slot.byKind(ctx, cards, (x) => (x.long ? 'long' : 'short'), (k) => (k === 'long' ? long : short), { multi: true, prefix: 'v' });
    cards = KS.items;
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const chip = (kind, right, inner) => `<span class="ws-chip" data-lcs-length="${kind}"${mark && right ? ' data-lcs-correct="1"' : ''} style="width:64px;height:52px;padding:0">${inner}</span>`;
    const html = cards.map((it, ci) => {
      const ch = [...it.word], before = ch.slice(0, it.at).join(''), vow = ch.slice(it.at, it.at + it.len).join(''), rest = ch.slice(it.at + it.len).join('');
      return `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;gap:8px;padding:6px" data-ws-content${KS.tap(ci)} data-lcs-vowel-length="${it.long ? 'long' : 'short'}" data-lcs-word="${it.word}">` +
        `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${d.px}px;height:${d.px}px">` +
        `<span style="font:700 30px/1 'Baloo 2',cursive;color:${T.ink}">${before}<span style="color:${T.coral}">${vow}</span>${rest}</span>` +
        `<div class="ws-choices" style="gap:16px">${chip('long', it.long, bar(46))}${chip('short', !it.long, dot())}</div></div>`;
    });
    return {
      bodyHtml: cardGrid({ cards: html, cols: 2, rows: Math.ceil(html.length / 2), numbered: true }),
      meta: { words: cards.map((it) => `${it.word} ${it.long ? 'long' : 'short'}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-vowel-length]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const words = cards.map((c) => c.dataset.lcsWord);
      if (new Set(words).size !== words.length) fails.push('a word twice');
      const long = cards.filter((c) => c.dataset.lcsVowelLength === 'long').length;
      if (!long || long === cards.length) fails.push(`${long} of ${cards.length} long`);
      cards.forEach((c, i) => {
        if (c.querySelectorAll('[data-lcs-length]').length !== 2) fails.push(`card ${i + 1}: not two chips`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: the picture did not load`);
      });
      return fails;
    });
  },
};
