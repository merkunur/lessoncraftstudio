/**
 * K-392 — Find the Sight Word. Level Set 2026-09-30: a NEW one-word page in family sight-words: a grid of word
 * boxes; the child colours every box holding the sight word, counts them and writes the number (so the teacher
 * can check at a glance). Foils are REAL words from the locale's own sight-word list, never the word itself.
 *   1 12 boxes, 4 targets, foils that look nothing like the word (different first letter, 3+ letters apart)
 *   2 20 boxes, 6 targets, half the foils look alike
 *   3 30 boxes, 8 targets, look-alike foils (closest spellings first — the/then/they, was/saw)
 * PDF only; no published page.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');

module.exports = {
  id: 'K-392',
  slug: 'find-the-sight-word',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { cols: 3, rows: 4, targets: 4, alike: 0, fontPx: 34 },
    2: { cols: 4, rows: 5, targets: 6, alike: 0.5, fontPx: 30 },
    3: { cols: 5, rows: 6, targets: 8, alike: 1, fontPx: 26 },
  },
  i18n: { en: { title: 'Find the Sight Word: {UNIT}', instruction: 'Color every box with the word “{UNIT}”. Count them and write the number.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const cells = d.cols * d.rows;
    const nFoil = cells - d.targets;
    const nAlike = Math.round(nFoil * d.alike);
    const alike = nAlike ? SW.foils(word, loc, { k: Math.min(6, nAlike), mode: 'alike', rng }) : [];
    const unlike = SW.foils(word, loc, { k: 12, mode: 'unlike', rng }).filter((w) => !alike.includes(w));
    if (unlike.length < 4 || (nAlike && alike.length < 2)) throw new Error(`K-392: "${word}" (${loc}) has too few foils`);
    const foilSeq = [];
    for (let i = 0; i < nAlike; i++) foilSeq.push(alike[i % alike.length]);
    for (let i = 0; foilSeq.length < nFoil; i++) foilSeq.push(unlike[i % unlike.length]);
    const items = rng.shuffle([...Array(d.targets).fill(null), ...foilSeq]);
    const html = items.map((f) => {
      const w = f == null ? word : f;
      return `<div data-lcs-cell data-lcs-target="${f == null ? 1 : 0}" style="border:2px solid #3B3632;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Nunito',sans-serif;font-weight:800;font-size:${d.fontPx}px;min-height:0">${SW.esc(w)}</div>`;
    });
    const grid = `<div data-lcs-grid style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},1fr);grid-template-rows:repeat(${d.rows},1fr);gap:10px">${html.join('')}</div>`;
    const head = `<div style="display:flex;justify-content:center">${SW.wordBox(word, 58)}</div>`;
    const count = `<div style="display:flex;align-items:center;gap:14px;justify-content:flex-end">${SW.sectionLabel(SW.label('count', loc))}<div data-lcs-countbox style="width:78px;height:62px;border:3px solid #3B3632;border-radius:10px"></div></div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${SW.esc(word)}" data-lcs-targets="${d.targets}" style="flex:1;display:flex;flex-direction:column;gap:14px">${head}${grid}${count}</div>`,
      meta: { word, foils: [...new Set(foilSeq)] },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const cells = [...document.querySelectorAll('[data-lcs-cell]')];
      const targets = cells.filter((c) => c.dataset.lcsTarget === '1');
      if (targets.length !== +root.dataset.lcsTargets) fails.push(`${targets.length} targets, stamped ${root.dataset.lcsTargets}`);
      targets.forEach((c) => { if (c.textContent !== word) fails.push(`target box shows "${c.textContent}"`); });
      cells.filter((c) => c.dataset.lcsTarget === '0').forEach((c) => {
        if (c.textContent.toLocaleLowerCase() === word.toLocaleLowerCase()) fails.push(`foil box shows the word`);
      });
      // every word fits inside its box
      cells.forEach((c, i) => { if (c.scrollWidth > c.clientWidth + 1) fails.push(`box ${i + 1} overflows`); });
      if (!document.querySelector('[data-lcs-countbox]')) fails.push('no count box');
      return fails;
    });
  },
};
