/**
 * G1-493 — Blends (Phonics & Sounds maker 2026-11-02, NEW-TEMPLATES §38 T2; RF.1.3 consonant blends): pictures whose
 * name starts with two consonants the child HEARS one after the other (fr-og, st-ar — two letters, two sounds; a
 * digraph is two letters, one sound, and has its own family). The bank is data/literacy/blends.json
 * (tools/build-blend-bank.js): each language's own blends (es "sílabas trabadas", de Konsonantenhäufungen incl. Sp / St,
 * Nordic s-clusters), a vowel after the pair, every picture opened, every name a child gives it; fi has no native
 * initial blends and is refused.
 * Level 1: circle the blend — three blend chips, two other blends of the language's list (one sharing a letter with the
 * right one where it can); level 2: write the two letters before the rest of the printed word (__og); level 3: write
 * the two letters from the picture alone. A page spreads its cards over the blends (never one blend for most cards).
 * Every chip is a tap target (level 1) / every box an answer box holding its letter (levels 2-3).
 * Levels: 1 six cards · 2 eight cards · 3 eight cards.
 */
'use strict';
const B = require('../../data/literacy/blends.json');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const D = {
  1: { cards: 6, task: 'circle', px: 96 },
  2: { cards: 8, task: 'word', px: 76 },
  3: { cards: 8, task: 'write', px: 76 },
};

module.exports = {
  id: 'G1-493',
  slug: 'blends',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'digraphs',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Blends', instruction: 'Say the name of each picture. Write the two letters it starts with.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const items = B.items[L], blends = B.blends[L];
    if (!items || !blends || blends.length < 2) throw new Error(`G1-493: no ${L} blends (refused in this language)`);
    // round robin over the blends: a page never asks one blend for most of its cards
    const groups = new Map();
    for (const it of rng.shuffle(items.slice())) { if (!groups.has(it.blend)) groups.set(it.blend, []); groups.get(it.blend).push(it); }
    const order = rng.shuffle([...groups.keys()]), picks = [];
    for (let r = 0; picks.length < d.cards; r++) {
      let took = false;
      for (const b of order) { const it = groups.get(b)[r]; if (it && picks.length < d.cards) { picks.push(it); took = true; } }
      if (!took) break;
    }
    if (picks.length < d.cards) throw new Error(`G1-493: ${L} has ${picks.length} blend pictures (< ${d.cards})`);
    const cards = rng.shuffle(picks);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const box = (ch) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${ch}"` : ''} style="display:inline-flex;width:46px;height:52px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const wordText = (s) => `<span style="font:700 34px/1 'Baloo 2',cursive;color:${T.ink};letter-spacing:1px">${s}</span>`;
    const html = cards.map((it) => {
      const chars = [...it.word], head = chars.slice(0, 2), rest = chars.slice(2).join('');
      let row;
      if (d.task === 'circle') {
        // the two other chips: blends of the language, one sharing a letter with the right one where it can
        const others = (B.table[L] || blends).filter((b) => b !== it.blend);
        const near = rng.shuffle(others.filter((b) => b[0] === it.blend[0] || b[1] === it.blend[1]));
        const far = rng.shuffle(others.filter((b) => !near.includes(b)));
        const opts = rng.shuffle([it.blend, ...[...near.slice(0, 1), ...far, ...near.slice(1)].slice(0, 2)]);
        row = `<div class="ws-choices" style="gap:14px">` + opts.map((b) => `<span class="ws-chip" data-lcs-blend-chip="${b}"${mark && b === it.blend ? ' data-lcs-correct="1"' : ''} style="min-width:64px;height:54px;padding:0 10px;font:700 30px/1 'Baloo 2',cursive;color:${T.ink}">${b}</span>`).join('') + `</div>`;
      } else {
        row = `<div style="display:flex;align-items:center;gap:6px">${box(head[0])}${box(head[1])}${d.task === 'word' ? `<span style="width:4px"></span>${wordText(rest)}` : ''}</div>`;
      }
      return `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;gap:12px;padding:6px" data-ws-content data-lcs-blend="${it.blend}" data-lcs-word="${it.word}">` +
        `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${d.px}px;height:${d.px}px">${row}</div>`;
    });
    return {
      bodyHtml: cardGrid({ cards: html, cols: 2, rows: Math.ceil(html.length / 2), numbered: true }),
      meta: { task: d.task, words: cards.map((it) => `${it.word} (${it.blend})`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-blend]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const words = cards.map((c) => c.dataset.lcsWord);
      if (new Set(words).size !== words.length) fails.push('a word twice');
      const blends = cards.map((c) => c.dataset.lcsBlend), most = Math.max(...blends.map((b) => blends.filter((x) => x === b).length));
      if (most > Math.ceil(cards.length / 2)) fails.push(`one blend on ${most} of ${cards.length} cards`);
      cards.forEach((c, i) => {
        if (c.dataset.lcsWord.slice(0, 2).toLowerCase() !== c.dataset.lcsBlend) fails.push(`card ${i + 1}: ${c.dataset.lcsWord} does not start with ${c.dataset.lcsBlend}`);
        const chips = [...c.querySelectorAll('[data-lcs-blend-chip]')];
        if (chips.length && (chips.length !== 3 || !chips.some((x) => x.dataset.lcsBlendChip === c.dataset.lcsBlend))) fails.push(`card ${i + 1}: the chips miss the blend`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: the picture did not load`);
        const R = c.getBoundingClientRect();
        c.querySelectorAll('span').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.left < R.left - 1 || r.right > R.right + 1)) fails.push(`card ${i + 1}: the row leaves the card`); });
      });
      return [...new Set(fails)];
    });
  },
};
