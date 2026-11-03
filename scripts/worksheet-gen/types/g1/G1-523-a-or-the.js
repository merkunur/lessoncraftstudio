/**
 * G1-523 — A or The? (One & Many, Articles maker 2026-11-03, NEW-TEMPLATES §42 T4; L.1.1.h determiners; de "bestimmter
 * und unbestimmter Artikel", sv / da / no "bestämd och obestämd form", fr "le ou un"): two sentences per picture — the
 * thing named for the first time, then again: "Here is a dog. Where is the dog?" The child chooses (level 1) or writes
 * (level 2) the form each sentence needs. The forms come from the vocabulary's gender (types/_shared/noun-forms.js: de ein
 * / eine → der / die / das, fr un / une → le / la / l', es un / una → el / la, pt um / uma → o / a, it un / uno / una / un'
 * → il / lo / la / l', nl een → de / het, en a / an → the); in sv / da / no the definite is a suffix (en hund → hunden,
 * ett äpple → äpplet), read from data/nouns-articles/definite-nordic.js (attested forms only; a noun without one is
 * refused). fi refuses the template: Finnish has no articles. The two sentences are the same everywhere (types/_shared
 * frames below, native per language): only the noun changes, so the sentence never decides the gender.
 * Two cards of six name a second thing in their second sentence (Here is a dog. Here is an apple.), from a far theme (never a
 * kind of the first: a sailboat after a boat would let the definite be right too) — a first mention again, so
 * the line never gives the form away; those cards show both pictures.
 * Levels: 1 circle one of two forms in each sentence (fr l', it lo / l' left out) · 2 write the article — sv / da / no:
 * the first sentence printed, the word written in its definite form (fr l', it lo / uno / l' / un' join in).
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const NF = require('../_shared/noun-forms.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 6, task: 'circle' }, 2: { n: 6, task: 'write', hard: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const NN = ' ';
// the two sentences: [before, after] the noun phrase — the first mention, then the second
const FRAMES = {
  en: [['Here is ', '.'], ['Where is ', '?']],
  de: [['Hier ist ', '.'], ['Wo ist ', '?']],
  fr: [['Voici ', '.'], ['Où est ', NN + '?']],
  es: [['Aquí hay ', '.'], ['¿Dónde está ', '?']],
  pt: [['Aqui está ', '.'], ['Onde está ', '?']],
  it: [['Ecco ', '.'], ["Dov'è ", '?']],
  nl: [['Hier is ', '.'], ['Waar is ', '?']],
  sv: [['Här är ', '.'], ['Var är ', '?']],
  da: [['Her er ', '.'], ['Hvor er ', '?']],
  no: [['Her er ', '.'], ['Hvor er ', '?']],
};
const NORDIC = new Set(['sv', 'da', 'no']);
FRAMES.__proto__ = null;
module.exports.FRAMES = FRAMES;

/** the noun's two phrases {ind, def, indArt, defArt|null, defWord|null}, or null when a form cannot be decided */
function phrases(e, L, hard) {
  const ia = NF.indefinite(e, L, hard);
  if (ia == null) return null;
  if (NORDIC.has(L)) {
    const dn = NF.definiteNoun(e, L);
    if (!dn) return null;
    const lower = (s) => s.toLocaleLowerCase(L);
    return { ind: NF.join(ia, lower(e.sing)), def: dn[0], indArt: ia, defArt: null, defWord: dn[0], defAlts: dn.slice(1), word: lower(e.sing) };
  }
  const da = NF.definite(e, L, hard);
  if (da == null) return null;
  return { ind: NF.join(ia, e.sing), def: NF.join(da, e.sing), indArt: ia, defArt: da, word: e.sing };
}

Object.assign(module.exports, {
  id: 'G1-523',
  slug: 'a-or-the',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'articles',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'A or The?', instruction: 'Read the two sentences. Circle the words that fit each one.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[1], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    if (!FRAMES[L]) throw new Error(`G1-523: ${L} has no articles (no a / the to choose)`);
    const pool = NF.pool(theme, L).map((e) => ({ e, p: phrases(e, L, !!d.hard) })).filter((x) => x.p);
    // genders mixed (keyed by the definite form's article, the Nordic suffix's last letter): no key more than half
    const keyOf = (x) => (x.p.defArt != null ? x.p.defArt : x.p.indArt);
    const by = {};
    for (const x of rng.shuffle(pool)) (by[keyOf(x)] = by[keyOf(x)] || []).push(x);
    const keys = Object.keys(by), cap = keys.length > 1 ? Math.ceil(d.n / 2) : d.n, items = [];
    for (let r = 0; items.length < d.n && r < d.n; r++) for (const k of rng.shuffle(keys)) {
      if (items.length === d.n) break;
      if (items.filter((x) => keyOf(x) === k).length >= cap) continue;
      const x = by[k].shift(); if (x) items.push(x);
    }
    for (const k of rng.shuffle(keys)) while (items.length < d.n && by[k].length) items.push(by[k].shift());   // a theme short of one gender still fills the page
    if (items.length < d.n) throw new Error(`G1-523: theme ${theme}/${L} gives ${items.length} nouns with sure forms (< ${d.n})`);
    const rows = rng.shuffle(items);
    // two cards of six name a SECOND thing in their second sentence (Here is a dog. Here is a cat.): a first mention again,
    // so the form is never given by the line alone (native review 2026-11-03)
    // the second thing comes from a far theme (fruits; toys for a food theme): never a kind of the first — «ein Segelboot …
    // ein Boot» would let the definite be right too (native re-check 2026-11-03)
    const far = /fruit|vegetable|bakery|dessert|food|breakfast|supermarket/i.test(theme) ? 'toys' : 'fruits';
    const spare = rng.shuffle(NF.pool(far, L).map((e) => ({ e: { ...e, _theme: far }, p: phrases(e, L, !!d.hard) })).filter((x) => x.p));
    const fresh = new Set(rng.sample(rows.map((_, i) => i), Math.min(2, spare.length)));
    const second = rows.map((x, i) => (fresh.has(i) ? spare.shift() : null));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const F = FRAMES[L];
    const txt = (s) => `<span style="white-space:pre">${esc(s)}</span>`;
    // level 1: the two phrases as chips, in an order the child cannot learn (the right one first half the time)
    const firsts = rng.shuffle(Array.from({ length: d.n * 2 }, (_, i) => i % 2 === 0));
    const chip = (s, ok) => `<span class="ws-np-chip"${mark && ok ? ' data-lcs-correct="1"' : ''} data-lcs-label="${esc(s)}" style="display:inline-flex;align-items:center;padding:4px 12px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF;white-space:nowrap">${esc(s)}</span>`;
    const pair = (p, want, j) => {
      const a = chip(p.ind, want === 'ind'), b = chip(p.def, want === 'def');
      return `<span class="ws-np-pair" style="display:inline-flex;align-items:center;gap:6px">${firsts[j] === (want === 'ind') ? a + '<span style="color:#8A8580">/</span>' + b : b + '<span style="color:#8A8580">/</span>' + a}</span>`;
    };
    const box = (answer, w, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(answer)}"${alts && alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${Math.round(w)}px;height:46px;flex:0 0 auto;vertical-align:middle"></span>`;
    // frame 0 'Here is …' / 1 'Where is …?'; which = the form the sentence needs
    const sentence = (p, which, j, frame = which === 'ind' ? 0 : 1, fresh = false) => {
      const [pre, post] = F[frame];
      let mid;
      if (d.task === 'circle') mid = pair(p, which, j);
      else if (fresh) mid = box(p.indArt, 76) + (/'$/.test(p.indArt) ? txt(p.word) : txt(' ' + p.word));
      // sv / da / no write only the definite form: the first sentence is printed (en / ett is K-288's lesson, and a theme
      // of en-words would make «en» right in every first box)
      else if (which === 'ind' && p.defArt == null) mid = txt(p.ind);
      else if (which === 'ind') mid = box(p.indArt, 76) + txt(' ' + p.word);
      else if (p.defArt == null) mid = box(p.defWord, 34 + [...p.defWord].length * 16, p.defAlts);
      else mid = box(p.defArt, 76) + (/'$/.test(p.defArt) ? txt(p.word) : txt(' ' + p.word));
      // an elided indefinite (it un') writes on to its noun with no space
      if (d.task === 'write' && which === 'ind' && /'$/.test(p.indArt)) mid = mid.replace(txt(' ' + p.word), txt(p.word));
      return `<div data-lcs-sentence="${which}" style="display:flex;align-items:center;flex-wrap:wrap;gap:4px 0;font:700 24px/1.25 'Nunito',sans-serif;color:${T.ink}">${txt(pre)}${mid}${txt(post)}</div>`;
    };
    const img = (e, px) => `<img class="ws-icon" src="${fileUri(e._theme || theme, e.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
    const cards = rows.map((x, i) => `<div data-lcs-a-or-the="${i + 1}" data-lcs-vocab="${esc(x.e.vocabKey)}"${second[i] ? ` data-lcs-second="${esc(second[i].e.vocabKey)}"` : ''} style="display:flex;align-items:center;gap:18px;padding:8px 16px;border-radius:16px;background:${T.cream}">` +
      `<div style="flex:0 0 80px;display:flex;flex-direction:column;align-items:center;gap:2px">${second[i] ? img(x.e, 46) + img(second[i].e, 46) : img(x.e, 80)}</div>` +
      `<div style="display:flex;flex-direction:column;gap:8px;min-width:0">${sentence(x.p, 'ind', i * 2)}${second[i] ? sentence(second[i].p, 'ind', i * 2 + 1, 0, true) : sentence(x.p, 'def', i * 2 + 1)}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-a-or-the-page style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${cards.join('')}</div>`,
      meta: { items: rows.map(({ p }, i) => `${F[0][0]}${p.ind}${F[0][1]} ${second[i] ? F[0][0] + second[i].p.ind + F[0][1] : F[1][0] + p.def + F[1][1]}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-a-or-the]')];
      if (cards.length < 6) fails.push(`${cards.length} items`);
      if (new Set(cards.map((c) => c.dataset.lcsVocab)).size !== cards.length) fails.push('a noun twice');
      const root = document.querySelector('[data-lcs-a-or-the-page]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`item ${i + 1} leaves the page`);
        c.querySelectorAll('[data-lcs-sentence]').forEach((s) => { [...s.children].forEach((x) => { if (x.getBoundingClientRect().right > b.right - 4) fails.push(`item ${i + 1}: a sentence past its card`); }); if (s.getBoundingClientRect().height > 100) fails.push(`item ${i + 1}: a sentence on more than two lines`); });
        if (c.querySelectorAll('[data-lcs-sentence]').length !== 2) fails.push(`item ${i + 1}: not two sentences`);
      });
      return fails;
    });
  },
});
