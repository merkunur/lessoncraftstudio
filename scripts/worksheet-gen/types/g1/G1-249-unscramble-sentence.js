/**
 * G1-249 — Unscramble the Sentence (nt20-B; `sentence-building`, G1,
 * L.1.1.j — Schüttelsätze / phrases mélangées / ordena las palabras).
 * Four lanes: a picture of the sentence's noun, a row of word tiles that
 * look like cut-out cards dropped on a desk, and a school-line ruling. The
 * child finds the ONE unmarked order and writes the sentence. Frames come
 * from the per-locale bank (`uses: unscramble` = the panel's certificate of
 * one natural order; no movable adverbials). Identical tiles (two "the")
 * are allowed — verify compares multisets.
 * d1: 3 lanes, capital + period shown · d2: 4, period stripped · d3: 4,
 * every tile lowercase except names, no end mark.
 */
'use strict';
const { wordTiles, rulingBlock } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, fileUri, countable } = require('../../lib/b2-common.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const SB = require('../../lib/sentence-bank.js');

module.exports = {
  id: 'G1-249',
  slug: 'unscramble-the-sentence',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'sentence-building',
  themeAxis: { applicable: true, minNouns: 4, excludeBw: true },
  difficulty: {
    1: { lanes: 3, minTok: 3, maxTok: 5, showCap: true, showEnd: true, font: 20, tileH: 46, icon: 80, rulH: 78, glyphH: 30 },
    2: { lanes: 4, minTok: 4, maxTok: 6, showCap: true, showEnd: false, font: 18, tileH: 40, icon: 64, rulH: 64, glyphH: 26 },
    3: { lanes: 4, minTok: 5, maxTok: 7, showCap: false, showEnd: false, font: 17, tileH: 38, icon: 64, rulH: 58, glyphH: 24 },
  },
  i18n: {
    en: {
      title: 'Unscramble the Sentence',
      instruction: 'The words are mixed up. Put them in order and write the sentence on the line with a capital letter and an end mark.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const bank = SENTENCES[loc];
    if (!bank) throw new Error(`G1-249: no sentence bank for ${loc}`);
    const entries = entriesFor(theme, loc).filter(countable).filter((e) => !/\s/.test(e.singular.trim()) && !/\s/.test(e.plural.trim()));
    if (entries.length < d.lanes) throw new Error(`G1-249: theme ${theme}/${loc} has ${entries.length} single-word countable nouns < ${d.lanes}`);
    const frames = SB.pickFrames(bank, { kind: 'simple', use: 'unscramble', count: d.lanes, rng,
      filter: (f) => { const n = SB.tokenize(f.text).length; return n >= d.minTok && n <= d.maxTok; } });
    const nouns = rng.sample(entries, d.lanes);
    const lanes = frames.map((frame, i) => {
      const e = nouns[i];
      const nounText = SB.resolveNoun(bank, frame, { ...e, singular: displayWord(e.singular, loc, bank.nounCase === 'keep' ? 'keep' : 'lower'), plural: displayWord(e.plural, loc, bank.nounCase === 'keep' ? 'keep' : 'lower') }, loc);
      const name = rng.sample(bank.names, 2); // array: a second {name} gets the second name
      const canonical = SB.fillFrame(frame.text, { name, noun: nounText, n: '', color: '' });
      const toks = SB.tokenize(canonical);
      const caps = SB.capsIndices(toks);
      const end = SB.endMark(canonical);
      // displayed tokens per level
      const shown = toks.map((t, k) => {
        let s = t;
        if (!d.showEnd && k === toks.length - 1 && end) s = s.replace(/[\s  ]*[.?!]$/, '');
        if (!d.showCap && k === 0 && !caps.includes(0)) s = s.toLocaleLowerCase(loc);
        if (!d.showCap && k === 0 && /^[¿¡]/.test(s)) s = s.replace(/^[¿¡]/, '');
        return s;
      });
      // shuffle: order ≠ canonical, first tile ≠ true first word
      let order, guard = 0;
      do { order = rng.shuffle(toks.map((_, k) => k)); guard++; }
      while ((order.every((v, k) => v === k) || order[0] === 0) && guard < 50);
      return `<div class="ws-lane" style="display:grid;grid-template-columns:${d.icon}px 1fr;gap:14px;align-items:center" data-lcs-item data-lcs-frame="${frame.id}" data-lcs-canonical="${canonical.replace(/"/g, '&quot;')}" data-lcs-caps="${caps.join(',')}" data-lcs-end="${end}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-noun="${e.vocabKey}" style="width:${d.icon}px;height:${d.icon}px">` +
        `<div style="display:flex;flex-direction:column;gap:10px;min-width:0">${wordTiles({ tokens: shown, order, fontPx: d.font, tileH: d.tileH })}${rulingBlock({ rows: 1, w: 660 - d.icon - 14 - 32, h: d.rulH, glyphH: d.glyphH })}</div></div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:16px" data-ws-content data-lcs-showcap="${d.showCap ? 1 : 0}" data-lcs-showend="${d.showEnd ? 1 : 0}">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-showcap]');
      const showCap = root.dataset.lcsShowcap === '1', showEnd = root.dataset.lcsShowend === '1';
      const lanes = [...document.querySelectorAll('[data-lcs-item]')];
      if (lanes.length < 3) fails.push(`only ${lanes.length} lanes`);
      const frames = new Set();
      const tokenize = (text) => {
        const raw = text.trim().split(/[   ]+/).filter(Boolean); const out = [];
        for (const tok of raw) { if (/^[?!.¿¡…]+$/.test(tok) && out.length) out[out.length - 1] += ' ' + tok; else if (out.length && /^[¿¡]+$/.test(out[out.length - 1])) out[out.length - 1] += tok; else out.push(tok); }
        return out;
      };
      lanes.forEach((lane, i) => {
        const canonical = lane.dataset.lcsCanonical;
        if (frames.has(lane.dataset.lcsFrame)) fails.push(`lane ${i + 1}: frame repeated`);
        frames.add(lane.dataset.lcsFrame);
        if (/\{/.test(canonical)) fails.push(`lane ${i + 1}: unfilled slot`);
        const toks = tokenize(canonical);
        const caps = lane.dataset.lcsCaps ? lane.dataset.lcsCaps.split(',').map(Number) : [];
        const tiles = [...lane.querySelectorAll('[data-lcs-tile]')];
        if (tiles.length !== toks.length) fails.push(`lane ${i + 1}: ${tiles.length} tiles for ${toks.length} tokens`);
        const idxs = tiles.map((t) => +t.dataset.lcsTile);
        if (idxs.every((v, k) => v === k)) fails.push(`lane ${i + 1}: tiles in canonical order`);
        if (idxs[0] === 0) fails.push(`lane ${i + 1}: first tile is the true first word`);
        if (idxs.slice().sort((a, b) => a - b).join(',') !== toks.map((_, k) => k).join(',')) fails.push(`lane ${i + 1}: tile indices not a permutation`);
        // expected displayed text per canonical index
        tiles.forEach((t) => {
          const k = +t.dataset.lcsTile;
          let exp = toks[k];
          if (!showEnd && k === toks.length - 1) exp = exp.replace(/[\s  ]*[.?!]$/, '');
          if (!showCap && k === 0 && !caps.includes(0)) exp = exp.toLocaleLowerCase(document.documentElement.lang || 'en').replace(/^[¿¡]/, '');
          if (t.textContent.trim() !== exp.trim()) fails.push(`lane ${i + 1}: tile "${t.textContent.trim()}" != "${exp}"`);
          if (parseFloat(getComputedStyle(t).fontSize) < 16) fails.push(`lane ${i + 1}: tile font < 16px`);
        });
        if (!showEnd && tiles.some((t) => /[.?!]$/.test(t.textContent.trim()))) fails.push(`lane ${i + 1}: end mark shown`);
        if (!showCap) {
          tiles.forEach((t) => { const k = +t.dataset.lcsTile; const ch = [...t.textContent.trim()][0]; if (ch !== ch.toLowerCase() && !caps.includes(k)) fails.push(`lane ${i + 1}: capital shown on a non-name tile`); });
        }
        // the answer is not printed anywhere
        const vis = [...lane.querySelectorAll('*')].map((n) => n.textContent.trim());
        if (vis.some((v) => v === canonical.trim())) fails.push(`lane ${i + 1}: canonical printed`);
        if (!lane.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`lane ${i + 1}: no ruling`);
        const img = lane.querySelector('img');
        if (!img || !img.complete || img.naturalWidth === 0) fails.push(`lane ${i + 1}: picture broken`);
      });
      return fails;
    });
  },
};
