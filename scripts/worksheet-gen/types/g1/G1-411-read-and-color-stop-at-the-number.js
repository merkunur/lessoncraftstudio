/**
 * G1-411 — Read and Color: Stop at the Number (Level Set 2026-09-30, a NEW variation of G1-242 `read-and-color`).
 * The strip holds MORE pictures of the named noun than the sentence asks for — "Color 3 cats red." under 6 cats —
 * so the child must read the number and STOP there (reading + cardinality): colouring every cat is the mistake.
 * Any n of them is right, so no picture is marked as "the" target (data-lcs-pool on all of the noun's pictures).
 * Levels: 1 four cards, n 1-2 of 4 · 2 six cards, n 2-4 of 6 · 3 six cards, n 3-5 of 8, plus one picture of
 * another noun (smaller pictures).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { colorLegend } = require('../../templates/components-b2.js');
const RC = require('../../lib/read-and-color.js');

module.exports = {
  id: 'G1-411',
  slug: 'read-and-color-stop-at-the-number',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'read-and-color',
  themeAxis: { applicable: true, minNouns: 8, bwOnly: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, nMin: 2, nMax: 2, pool: 4, extra: 0, icon: 84, font: 18 },
    2: { cards: 6, cols: 2, rows: 3, nMin: 2, nMax: 4, pool: 6, extra: 0, icon: 58, font: 17 },
    3: { cards: 6, cols: 2, rows: 3, nMin: 3, nMax: 5, pool: 8, extra: 1, icon: 46, font: 16 },
  },
  i18n: {
    en: {
      title: 'Read and Color: Stop at the Number',
      instruction: 'There are more pictures than the sentence asks for. Read the number and color only that many.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const C = RC.pageContext(this.id, theme, loc, d.cards + (d.extra ? 1 : 0));
    // this page draws MORE pictures than the number: a frame that states "there are n" would be false here
    // (native panel 2026-09-30: fr c3 "Il y a {n} ... a colorier", it c4 "Ci sono {n} ... da colorare") - commands only
    const EXISTENTIAL = { fr: ['c3'], it: ['c4'] };
    C.frames = C.frames.filter((f) => !(EXISTENTIAL[loc] || []).includes(f.id));
    for (let t = 0; t < 60; t++) {
      const targets = RC.distinctNouns(rng, C.entries, d.cards);
      if (!targets) break;
      const colors = rng.shuffle(RC.COLOR_KEYS.slice()).slice(0, d.cards);
      if (!RC.avoidNatural(targets.map((e) => e.vocabKey), colors, RC.COLOR_KEYS)) continue;
      const frames = rng.shuffle(C.frames);
      const cards = [];
      let ok = true;
      for (let i = 0; i < d.cards; i++) {
        const e = targets[i];
        const n = rng.int(d.nMin, d.nMax);
        let s;
        try { s = RC.sentence(C, frames[i % frames.length], e, n, colors[i], rng.pick(C.bank.names), loc); } catch (err) { ok = false; break; }
        const extra = d.extra ? RC.distinctNouns(rng, C.entries.filter((o) => !targets.includes(o)), 1, [e]) : [];
        if (d.extra && !extra) { ok = false; break; }
        const pics = [];
        for (let j = 0; j < d.pool; j++) pics.push(RC.icon(theme, e, d.icon, rng, false).replace('data-lcs-noun=', 'data-lcs-pool="1" data-lcs-noun='));
        for (let j = 0; j < d.extra; j++) pics.push(RC.icon(theme, extra[0], d.icon, rng, false));
        cards.push(`<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;padding:10px 8px 4px" data-lcs-item>` +
          `<div style="padding-left:22px">${RC.sentenceP(s.text, d.font, `data-lcs-n="${n}" data-lcs-noun="${e.vocabKey}" data-lcs-color="${colors[i]}" data-lcs-noun-text="${RC.esc(s.nounText)}" data-lcs-color-text="${RC.esc(s.colorText)}"`)}</div>` +
          `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;align-content:flex-start" data-lcs-strip data-lcs-pool-size="${d.pool}">${rng.shuffle(pics).join('')}</div></div>`);
      }
      if (!ok) continue;
      const legend = colorLegend({ entries: colors.map((k) => ({ key: k, word: C.words[k] })) });
      return {
        bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;min-height:0">${legend}${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
        meta: { nouns: targets.map((e) => e.vocabKey) },
      };
    }
    throw new Error(`G1-411: ${theme}/${loc} cannot build ${d.cards} cards`);
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (items.length < 4) fails.push(`${items.length} cards`);
      const colors = new Set(), nouns = new Set();
      items.forEach((it, i) => {
        const s = it.querySelector('[data-lcs-sentence]'), strip = it.querySelector('[data-lcs-strip]');
        if (!s || !strip) { fails.push(`card ${i + 1}: missing parts`); return; }
        const n = +s.dataset.lcsN, key = s.dataset.lcsNoun, text = s.textContent;
        const all = [...strip.querySelectorAll('img')];
        const pool = all.filter((im) => im.dataset.lcsNoun === key);
        if (pool.length <= n) fails.push(`card ${i + 1}: ${pool.length} ${key} for "${n}" — there must be MORE than the number`);
        if (pool.length !== +strip.dataset.lcsPoolSize) fails.push(`card ${i + 1}: pool ${pool.length} != ${strip.dataset.lcsPoolSize}`);
        if (all.some((im) => im.hasAttribute('data-lcs-target'))) fails.push(`card ${i + 1}: a picture marked as THE answer (any ${n} are right)`);
        if (!new RegExp(`(^|\\D)${n}(\\D|$)`).test(text)) fails.push(`card ${i + 1}: digit ${n} not in "${text}"`);
        if (!text.includes(s.dataset.lcsNounText) || !text.includes(s.dataset.lcsColorText)) fails.push(`card ${i + 1}: noun/colour literal missing`);
        if (/\{/.test(text)) fails.push(`card ${i + 1}: unfilled slot`);
        if (colors.has(s.dataset.lcsColor)) fails.push(`card ${i + 1}: colour reused`);
        colors.add(s.dataset.lcsColor);
        if (nouns.has(key)) fails.push(`card ${i + 1}: noun ${key} reused`);
        nouns.add(key);
        if (new Set(all.map((im) => im.style.width)).size !== 1) fails.push(`card ${i + 1}: pictures differ in size`);
        for (const img of all) if (!img.complete || img.naturalWidth === 0) fails.push(`card ${i + 1}: broken picture`);
        if (strip.getBoundingClientRect().bottom > it.getBoundingClientRect().bottom + 1) fails.push(`card ${i + 1}: the pictures overflow the card`);
      });
      // every picture is black-and-white line art FROM THE IMAGE LIBRARY (a BW theme folder) - never drawn, never colour art
      document.querySelectorAll('.ws-page img').forEach((im) => { const src = decodeURIComponent(im.getAttribute('src') || ''); if (!/\/themes[^/]*\/[^/]* bw( [^/]*)?\//i.test(src)) fails.push(`a picture that is not BW library art: ${src.slice(-60)}`); });
      if (document.querySelector('.ws-page [data-lcs-item] svg, .ws-page [data-lcs-field] svg')) fails.push('a drawn (svg) picture on the page');
      const legend = [...document.querySelectorAll('[data-lcs-legend]')].map((l) => l.dataset.lcsColor);
      if (legend.slice().sort().join('|') !== [...colors].sort().join('|')) fails.push('legend colours != page colours');
      return fails;
    });
  },
};
