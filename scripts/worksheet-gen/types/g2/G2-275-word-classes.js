/**
 * G2-275 — Word Classes: Nouns, Verbs, Adjectives (nt20-B; `word-classes`,
 * G2, L.1.1.b/e · L.2.1.e — Wortarten / nature des mots / ordklasser).
 * Twelve word chips float at the top like fridge magnets (nouns carry a
 * small picture at d1/d2); below, three open sorting bins with an icon lid
 * (picture frame = noun, running figure = verb, paint splash = adjective)
 * and the locale's school term. The child copies every word into its bin.
 * Verbs/adjectives come from the per-locale list; nouns from the vocab.
 * d1 9 chips · d2 12 · d3 15, nouns WITHOUT pictures + a homograph guard.
 */
'use strict';
const { classIcons } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { WORD_CLASSES } = require('../../data/b2/word-classes.js');

module.exports = {
  id: 'G2-275',
  slug: 'word-classes-sort',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'word-classes',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: {
    1: { per: 3, pics: true, tiers: [1], font: 20, lines: 4, binH: 400 },
    2: { per: 4, pics: true, tiers: [1, 2], font: 17, lines: 5, binH: 400 },
    3: { per: 5, pics: false, tiers: [1, 2, 3], font: 16, lines: 6, binH: 380 },
  },
  i18n: {
    en: {
      title: 'Nouns, Verbs, and Adjectives',
      instruction: 'Read every word. Is it a naming word, a doing word, or a describing word? Write it in the right bin.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const W = WORD_CLASSES[loc];
    if (!W) throw new Error(`G2-275: no word-class bank for ${loc}`);
    const caseMode = d.pics ? (W.chipCase || 'keep') : (W.chipCaseD3 || W.chipCase || 'lower');
    const exclude = new Set((W.nounExclude || []).map((s) => s.toLowerCase()));
    const vb = new Set(W.verbs.map((v) => v.w.toLowerCase())), ab = new Set(W.adjectives.map((a) => a.w.toLowerCase()));
    let nouns = distinctByWord(entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc, caseMode) })), (e) => e.word.toLowerCase())
      .filter((e) => /^[\p{L}]+$/u.test(e.word) && [...e.word].length <= 12)
      .filter((e) => !exclude.has(e.word.toLowerCase()) && !vb.has(e.word.toLowerCase()) && !ab.has(e.word.toLowerCase()));
    if (nouns.length < d.per) throw new Error(`G2-275: theme ${theme}/${loc} has ${nouns.length} usable nouns < ${d.per}`);
    const pickN = rng.sample(nouns, d.per);
    const tierOk = (x) => d.tiers.includes(x.tier || 1);
    const verbs = rng.sample(W.verbs.filter(tierOk), d.per), adjs = rng.sample(W.adjectives.filter(tierOk), d.per);
    if (verbs.length < d.per || adjs.length < d.per) throw new Error(`G2-275: bank ${loc} short of verbs/adjectives at d${difficulty}`);
    const chips = rng.shuffle([
      ...pickN.map((e) => ({ cls: 'noun', word: e.word, src: d.pics ? fileUri(theme, e.noun) : null })),
      ...verbs.map((v) => ({ cls: 'verb', word: v.w })),
      ...adjs.map((a) => ({ cls: 'adj', word: a.w })),
    ]);
    const chipHtml = chips.map((c) =>
      `<span class="ws-tile ws-tile--word" style="height:44px;font-size:${d.font}px" data-lcs-word="${c.word}" data-lcs-class="${c.cls}">` +
      (c.src ? `<img class="ws-icon" src="${c.src}" alt="" style="width:28px;height:28px">` : '') + `${c.word}</span>`).join('');
    const bin = (cls) => {
      const lines = [];
      for (let i = 1; i <= d.lines; i++) lines.push(`<line x1="8" y1="${i * (d.binH - 10) / (d.lines + 1)}" x2="186" y2="${i * (d.binH - 10) / (d.lines + 1)}" stroke="#C8BFAE" stroke-width="1.5" stroke-dasharray="3 5"/>`);
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px" data-lcs-binwrap="${cls}">` +
        `<span style="width:56px;height:56px;border-radius:50%;background:#FFFFFF;border:2.5px solid #146B5E;display:flex;align-items:center;justify-content:center;flex:0 0 auto" data-lcs-lid="${cls}">${classIcons[cls]()}</span>` +
        `<div class="ws-bin" style="width:200px;height:${d.binH}px;max-width:200px;padding:0" data-lcs-bin="${cls}"><svg width="194" height="${d.binH - 10}" viewBox="0 0 194 ${d.binH - 10}" aria-hidden="true">${lines.join('')}</svg></div>` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:16px;color:#146B5E" data-lcs-term="${cls}">${W.terms[cls]}</span></div>`;
    };
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:24px;padding-top:4px" data-ws-content>` +
        `<div style="flex:0 0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;padding:6px 0" data-lcs-chips>${chipHtml}</div>` +
        `<div style="flex:0 0 auto;display:flex;justify-content:space-between;padding:0 10px">${bin('noun')}${bin('verb')}${bin('adj')}</div></div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const chips = [...document.querySelectorAll('[data-lcs-word][data-lcs-class]')];
      const counts = { noun: 0, verb: 0, adj: 0 };
      const words = new Set();
      chips.forEach((c) => {
        counts[c.dataset.lcsClass] = (counts[c.dataset.lcsClass] || 0) + 1;
        const w = c.dataset.lcsWord.toLowerCase();
        if (words.has(w)) fails.push(`word "${w}" appears twice`);
        words.add(w);
        if (c.textContent.trim() !== c.dataset.lcsWord) fails.push(`chip text != word for "${w}"`);
      });
      if (!(counts.noun === counts.verb && counts.verb === counts.adj && counts.noun >= 3)) fails.push(`class counts ${JSON.stringify(counts)}`);
      const withImg = chips.filter((c) => c.querySelector('img'));
      const nounChips = chips.filter((c) => c.dataset.lcsClass === 'noun');
      if (withImg.length && withImg.length !== nounChips.length) fails.push('pictures on non-noun chips or missing on nouns');
      if (withImg.some((c) => c.dataset.lcsClass !== 'noun')) fails.push('picture on a non-noun chip');
      const bins = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
      if (bins.slice().sort().join() !== 'adj,noun,verb') fails.push(`bins ${bins}`);
      const terms = [...document.querySelectorAll('[data-lcs-term]')].map((t) => t.textContent.trim());
      if (terms.length !== 3 || new Set(terms).size !== 3 || terms.some((t) => !t)) fails.push('bin terms missing/duplicate');
      // no chip word equals a bin term
      terms.forEach((t) => { if (words.has(t.toLowerCase())) fails.push(`chip equals term "${t}"`); });
      return fails;
    });
  },
};
