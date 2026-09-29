/**
 * G1-410 — Read and Color the Picture (Level Set 2026-09-30, a NEW variation of G1-242 `read-and-color`).
 * ONE big field of pictures, all nouns mixed and scattered, under a numbered list of sentences — "1. Color 3 cats
 * blue." The child reads each sentence and hunts its pictures in the whole field (reading + visual search), not in
 * a strip that already groups them. Every picture of a named noun is a target (the count is exact); from level 2
 * the field also holds pictures of nouns no sentence names.
 * Levels: 1 three sentences, n 1-3, no other nouns · 2 four sentences, n 2-3, one other noun (2 pictures) ·
 * 3 five sentences, n 2-4, two other nouns (2 pictures each), smaller pictures.
 */
'use strict';
const { colorLegend } = require('../../templates/components-b2.js');
const RC = require('../../lib/read-and-color.js');

module.exports = {
  id: 'G1-410',
  slug: 'read-and-color-the-picture',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'read-and-color',
  themeAxis: { applicable: true, minNouns: 8, bwOnly: true },
  difficulty: {
    1: { sentences: 3, nMin: 2, nMax: 3, others: 0, perOther: 0, icon: 150, font: 19 },
    2: { sentences: 4, nMin: 2, nMax: 3, others: 1, perOther: 2, icon: 130, font: 18 },
    3: { sentences: 5, nMin: 2, nMax: 4, others: 2, perOther: 2, icon: 110, font: 17 },
  },
  i18n: {
    en: {
      title: 'Read and Color: All Mixed Up',
      instruction: 'Read each sentence. Find its pictures in the big box and color exactly as many as the sentence says.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const C = RC.pageContext(this.id, theme, loc, d.sentences + d.others);
    for (let t = 0; t < 60; t++) {
      const nouns = RC.distinctNouns(rng, C.entries, d.sentences + d.others);
      if (!nouns) break;
      const targets = nouns.slice(0, d.sentences), others = nouns.slice(d.sentences);
      const colors = rng.shuffle(RC.COLOR_KEYS.slice()).slice(0, d.sentences);
      if (!RC.avoidNatural(targets.map((e) => e.vocabKey), colors, RC.COLOR_KEYS)) continue;
      const frames = rng.shuffle(C.frames);
      const lines = [], pics = [];
      let ok = true;
      try {
        targets.forEach((e, i) => {
          const n = rng.int(d.nMin, d.nMax);
          const s = RC.sentence(C, frames[i % frames.length], e, n, colors[i], rng.pick(C.bank.names), loc);
          lines.push(`<li style="display:flex;gap:10px;align-items:baseline"><span style="font-family:'Baloo 2';font-weight:700;font-size:${d.font + 2}px;color:#146B5E;min-width:22px">${i + 1}.</span>` +
            RC.sentenceP(s.text, d.font, `data-lcs-n="${n}" data-lcs-noun="${e.vocabKey}" data-lcs-color="${colors[i]}" data-lcs-noun-text="${RC.esc(s.nounText)}" data-lcs-color-text="${RC.esc(s.colorText)}"`) + '</li>');
          for (let j = 0; j < n; j++) pics.push({ e, target: true });
        });
      } catch (e) { ok = false; }
      if (!ok) continue;
      for (const o of others) for (let j = 0; j < d.perOther; j++) pics.push({ e: o, target: false });
      // the pictures fill the box: the largest size whose columns x rows fit it (MEASURED box 675 x 547-579 page-px;
      // inner 645 x 500 after padding, the tightest locale chrome), 6% off for the +-6 deg tilt, capped per level
      const W = 645, H = 500, GX = 18, GY = 14;
      let best = 0;
      for (let c = 1; c <= pics.length; c++) { const r = Math.ceil(pics.length / c); best = Math.max(best, Math.min((W - GX * (c - 1)) / c, (H - GY * (r - 1)) / r)); }
      const px = Math.max(60, Math.min(d.icon, Math.floor(best * 0.94)));
      const field = rng.shuffle(pics).map((p) => RC.icon(theme, p.e, px, rng, p.target)).join('');
      const legend = colorLegend({ entries: colors.map((k) => ({ key: k, word: C.words[k] })) });
      return {
        bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:12px;min-height:0">${legend}` +
          `<ol style="list-style:none;margin:0;padding:0 8px;display:flex;flex-direction:column;gap:6px" data-lcs-list data-ws-content>${lines.join('')}</ol>` +
          `<div class="ws-card" style="flex:1;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:center;gap:14px 18px;padding:14px" data-lcs-field data-ws-content>${field}</div></div>`,
        meta: { nouns: nouns.map((e) => e.vocabKey) },
      };
    }
    throw new Error(`G1-410: ${theme}/${loc} cannot build ${d.sentences} sentences`);
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ss = [...document.querySelectorAll('[data-lcs-sentence]')];
      const field = document.querySelector('[data-lcs-field]');
      if (!field || ss.length < 3) return [`${ss.length} sentences / field ${!!field}`];
      const all = [...field.querySelectorAll('img')];
      const named = new Set(), colors = new Set();
      ss.forEach((s, i) => {
        const n = +s.dataset.lcsN, key = s.dataset.lcsNoun, text = s.textContent;
        const pics = all.filter((im) => im.dataset.lcsNoun === key);
        if (pics.length !== n) fails.push(`sentence ${i + 1}: ${pics.length} pictures of ${key}, the sentence says ${n}`);
        if (pics.some((p) => !p.hasAttribute('data-lcs-target'))) fails.push(`sentence ${i + 1}: an unmarked ${key}`);
        if (!new RegExp(`(^|\\D)${n}(\\D|$)`).test(text)) fails.push(`sentence ${i + 1}: digit ${n} not in "${text}"`);
        if (!text.includes(s.dataset.lcsNounText) || !text.includes(s.dataset.lcsColorText)) fails.push(`sentence ${i + 1}: noun/colour literal missing`);
        if (named.has(key)) fails.push(`sentence ${i + 1}: noun ${key} named twice`);
        named.add(key);
        if (colors.has(s.dataset.lcsColor)) fails.push(`sentence ${i + 1}: colour reused`);
        colors.add(s.dataset.lcsColor);
        const r = s.getBoundingClientRect();
        if (s.scrollWidth > s.clientWidth + 1) fails.push(`sentence ${i + 1}: overflows`);
        void r;
      });
      all.forEach((im) => { if (!named.has(im.dataset.lcsNoun) && im.hasAttribute('data-lcs-target')) fails.push('a marked picture no sentence names'); });
      if (new Set(all.map((im) => im.style.width)).size !== 1) fails.push('pictures differ in size');
      for (const img of all) if (!img.complete || img.naturalWidth === 0) fails.push('broken picture');
      const fb = field.getBoundingClientRect();
      all.forEach((im) => { const b = im.getBoundingClientRect(); if (b.bottom > fb.bottom + 2 || b.top < fb.top - 2) fails.push('a picture outside the field'); });
      // every picture is black-and-white line art FROM THE IMAGE LIBRARY (a BW theme folder) - never drawn, never colour art
      document.querySelectorAll('.ws-page img').forEach((im) => { const src = decodeURIComponent(im.getAttribute('src') || ''); if (!/\/themes[^/]*\/[^/]* bw( [^/]*)?\//i.test(src)) fails.push(`a picture that is not BW library art: ${src.slice(-60)}`); });
      if (document.querySelector('.ws-page [data-lcs-item] svg, .ws-page [data-lcs-field] svg')) fails.push('a drawn (svg) picture on the page');
      const legend = [...document.querySelectorAll('[data-lcs-legend]')].map((l) => l.dataset.lcsColor);
      if (legend.slice().sort().join('|') !== [...colors].sort().join('|')) fails.push('legend colours != page colours');
      return fails;
    });
  },
};
