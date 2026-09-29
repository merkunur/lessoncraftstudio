/**
 * G1-409 — Read and Color: Two Sentences (Level Set 2026-09-30, a NEW variation of G1-242 `read-and-color`).
 * Four cards; each carries TWO sentences — "Color 2 cats blue." / "Color 3 dogs red." — over ONE strip that holds
 * both sets of pictures (+ pictures of a third noun from level 2). The child reads two instructions about one strip:
 * two nouns, two numbers, two colours. 4 cards x 2 colours = the eight colours of the legend, each used once.
 * Levels: 1 n 1-2 each, no third noun · 2 n 2-3, one extra picture · 3 n 2-4, two extra pictures (smaller pictures).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { colorLegend } = require('../../templates/components-b2.js');
const RC = require('../../lib/read-and-color.js');

module.exports = {
  id: 'G1-409',
  slug: 'read-and-color-two-sentences',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'read-and-color',
  themeAxis: { applicable: true, minNouns: 10, bwOnly: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, nMin: 2, nMax: 2, extra: 0, icon: 86, font: 17 },
    2: { cards: 4, cols: 2, rows: 2, nMin: 2, nMax: 3, extra: 1, icon: 64, font: 16 },
    3: { cards: 4, cols: 2, rows: 2, nMin: 2, nMax: 4, extra: 2, icon: 56, font: 16 },
  },
  i18n: {
    en: {
      title: 'Read and Color: Two Sentences',
      instruction: 'Each box has two sentences. Read both. Color exactly the pictures each sentence tells you to.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const C = RC.pageContext(this.id, theme, loc, d.cards * 2 + (d.extra ? 1 : 0));
    for (let t = 0; t < 60; t++) {
      const colors = rng.shuffle(RC.COLOR_KEYS.slice());
      const targets = RC.distinctNouns(rng, C.entries, d.cards * 2);
      if (!targets) break;
      if (!RC.avoidNatural(targets.map((e) => e.vocabKey), colors, RC.COLOR_KEYS)) continue;
      const frames = rng.shuffle(C.frames);
      let ok = true;
      const cards = [];
      for (let i = 0; i < d.cards && ok; i++) {
        const pair = [targets[2 * i], targets[2 * i + 1]];
        const extra = d.extra ? RC.distinctNouns(rng, C.entries.filter((e) => !targets.includes(e)), 1, pair) : [];
        if (d.extra && !extra) { ok = false; break; }
        const rows = [];
        const pics = [];
        try {
          pair.forEach((e, k) => {
            const n = rng.int(d.nMin, d.nMax);
            const s = RC.sentence(C, frames[(2 * i + k) % frames.length], e, n, colors[2 * i + k], rng.pick(C.bank.names), loc);
            rows.push(RC.sentenceP(s.text, d.font, `data-lcs-n="${n}" data-lcs-noun="${e.vocabKey}" data-lcs-color="${colors[2 * i + k]}" data-lcs-noun-text="${RC.esc(s.nounText)}" data-lcs-color-text="${RC.esc(s.colorText)}"`));
            for (let j = 0; j < n; j++) pics.push({ e, target: true });
          });
        } catch (e) { ok = false; break; }
        for (let j = 0; j < d.extra; j++) pics.push({ e: extra[0], target: false });
        const strip = rng.shuffle(pics).map((p) => RC.icon(theme, p.e, d.icon, rng, p.target)).join('');
        cards.push(`<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;padding:10px 8px 4px" data-lcs-item>` +
          `<div style="display:flex;flex-direction:column;gap:4px;padding-left:22px">${rows.join('')}</div>` +
          `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;align-content:flex-start" data-lcs-strip>${strip}</div></div>`);
      }
      if (!ok) continue;
      const legend = colorLegend({ entries: colors.slice(0, d.cards * 2).map((k) => ({ key: k, word: C.words[k] })) });
      return {
        bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;min-height:0">${legend}${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
        meta: { nouns: targets.map((e) => e.vocabKey) },
      };
    }
    throw new Error(`G1-409: ${theme}/${loc} cannot build ${d.cards} two-sentence cards`);
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (items.length !== 4) fails.push(`${items.length} cards (want 4)`);
      const colors = new Set(), nouns = new Set();
      items.forEach((it, i) => {
        const ss = [...it.querySelectorAll('[data-lcs-sentence]')];
        const strip = it.querySelector('[data-lcs-strip]');
        if (ss.length !== 2 || !strip) { fails.push(`card ${i + 1}: ${ss.length} sentences`); return; }
        const all = [...strip.querySelectorAll('img')];
        const keys = ss.map((s) => s.dataset.lcsNoun);
        ss.forEach((s) => {
          const n = +s.dataset.lcsN, key = s.dataset.lcsNoun, text = s.textContent;
          const pics = all.filter((im) => im.dataset.lcsNoun === key);
          if (pics.length !== n) fails.push(`card ${i + 1}: ${pics.length} pictures of ${key}, the sentence says ${n}`);
          if (pics.some((p) => !p.hasAttribute('data-lcs-target'))) fails.push(`card ${i + 1}: an unmarked ${key}`);
          if (!new RegExp(`(^|\\D)${n}(\\D|$)`).test(text)) fails.push(`card ${i + 1}: digit ${n} not in "${text}"`);
          if (!text.includes(s.dataset.lcsNounText) || !text.includes(s.dataset.lcsColorText)) fails.push(`card ${i + 1}: noun/colour literal missing`);
          if (/\{/.test(text)) fails.push(`card ${i + 1}: unfilled slot`);
          if (colors.has(s.dataset.lcsColor)) fails.push(`card ${i + 1}: colour reused`);
          colors.add(s.dataset.lcsColor);
          if (nouns.has(key)) fails.push(`card ${i + 1}: noun ${key} reused`);
          nouns.add(key);
        });
        if (keys[0] === keys[1]) fails.push(`card ${i + 1}: both sentences name ${keys[0]}`);
        all.forEach((im) => { if (!keys.includes(im.dataset.lcsNoun) && im.hasAttribute('data-lcs-target')) fails.push(`card ${i + 1}: a marked extra picture`); });
        if (new Set(all.map((im) => im.style.width)).size !== 1) fails.push(`card ${i + 1}: pictures differ in size`);
        if (all.length > 10) fails.push(`card ${i + 1}: ${all.length} pictures`);
        for (const img of all) if (!img.complete || img.naturalWidth === 0) fails.push(`card ${i + 1}: broken picture`);
        const sb = strip.getBoundingClientRect(), cb = it.getBoundingClientRect();
        if (sb.bottom > cb.bottom + 1) fails.push(`card ${i + 1}: the pictures overflow the card`);
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
