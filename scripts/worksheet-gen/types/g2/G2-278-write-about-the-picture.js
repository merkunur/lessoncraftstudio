/**
 * G2-278 — Write About the Picture (nt20-B; `picture-writing`, G2,
 * W.1.3 / W.2.3 — Schreibanlass / production d'écrit / escribe sobre la
 * imagen). A big calm scene composed from theme objects on a "ground" (one
 * hero object in front, smaller ones behind, a couple repeated so there is
 * something to count), a word bank of labelled mini-pictures — exactly the
 * objects in the scene — and real school-line rows, two of them seeded with
 * a narrative starter. Open writing: the one honest exception to the
 * one-answer rule; verify() asserts STRUCTURE (bank ⇔ scene bijection,
 * non-overlap, no model sentence printed).
 * d1: 4 nouns, 3 starter rows · d2: 5-6 nouns, 5 rows · d3: 6 nouns, 6 rows.
 */
'use strict';
const { sceneStage, wordBank, rulingBlock } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { LABELS } = require('../../data/b2/labels.js');

module.exports = {
  id: 'G2-278',
  slug: 'write-about-the-picture',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'picture-writing',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: {
    1: { nouns: 4, repeats: 1, sceneH: 290, rows: 3, rowH: 72, glyphH: 28, starters: 'd1' },
    2: { nouns: 6, repeats: 2, sceneH: 260, rows: 5, rowH: 62, glyphH: 24, starters: 'd2' },
    3: { nouns: 6, repeats: 1, sceneH: 230, rows: 6, rowH: 58, glyphH: 24, starters: null },
  },
  i18n: {
    en: {
      title: 'Write About the Picture',
      instruction: 'Look at the picture. Use the word bank to help you write about what you see.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc] && LABELS[loc].pictureWriting;
    if (!L) throw new Error(`G2-278: no starters for ${loc}`);
    let pool = distinctByWord(entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc) })), (e) => e.word);
    if (pool.length < d.nouns) throw new Error(`G2-278: theme ${theme}/${loc} has ${pool.length} nouns < ${d.nouns}`);
    const picks = rng.sample(pool, d.nouns);
    const scene = sceneStage({ theme, nouns: picks, w: 660, h: d.sceneH, rng, heroIndex: 0, repeats: d.repeats });
    const bank = wordBank({ words: picks.map((e) => ({ word: e.word, vocabKey: e.vocabKey, src: fileUri(theme, e.noun) })), wordPx: 15, withIcons: true });
    const starters = {};
    if (d.starters === 'd1') L.d1.forEach((s, i) => { if (i < d.rows) starters[i] = s; });
    if (d.starters === 'd2') { starters[0] = L.d2[0]; if (d.rows > 2) starters[2] = L.d2[1]; }
    const ruling = rulingBlock({ rows: d.rows, w: 660, h: d.rowH, glyphH: d.glyphH, starters });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly;align-items:center" data-lcs-page>` +
        `${scene.html}<div style="width:660px">${bank}</div><div style="width:660px" data-lcs-ruling data-lcs-rows="${d.rows}" data-lcs-starters="${Object.keys(starters).length}">${ruling}</div></div>`,
      meta: { nouns: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const scene = document.querySelector('[data-lcs-scene]');
      if (!scene) return ['no scene'];
      const imgs = [...scene.querySelectorAll('img')];
      if (imgs.length < 5 || imgs.length > 9) fails.push(`${imgs.length} scene objects`);
      const sceneKeys = new Set(imgs.map((im) => im.dataset.lcsNoun));
      const bank = [...document.querySelectorAll('[data-lcs-bank]')];
      const bankKeys = new Set(bank.map((b) => b.dataset.lcsBank));
      if ([...sceneKeys].sort().join() !== [...bankKeys].sort().join()) fails.push('bank ⇔ scene mismatch');
      const words = bank.map((b) => b.dataset.lcsBankWord);
      if (new Set(words).size !== words.length) fails.push('duplicate bank words');
      bank.forEach((b) => { if (!b.textContent.trim()) fails.push('empty bank word'); });
      // non-overlap + inside stage + a hero ≥ 140
      const sr = scene.getBoundingClientRect();
      const rects = imgs.map((im) => im.getBoundingClientRect());
      let hero = 0;
      rects.forEach((r, i) => {
        if (r.width >= 140) hero++;
        if (r.left < sr.left - 1 || r.right > sr.right + 1 || r.top < sr.top - 1 || r.bottom > sr.bottom + 1) fails.push(`object ${i + 1} outside the stage`);
        for (let j = i + 1; j < rects.length; j++) {
          const q = rects[j];
          const ox = Math.min(r.right, q.right) - Math.max(r.left, q.left), oy = Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top);
          // objects may touch feet-to-head across bands; forbid real overlap of more than a sliver
          if (ox > 12 && oy > 12) fails.push(`objects ${i + 1},${j + 1} overlap`);
        }
      });
      if (hero < 1) fails.push('no hero object');
      if (scene.querySelectorAll('[data-lcs-ground]').length !== imgs.length) fails.push('ground ellipses != objects');
      const ruling = document.querySelector('[data-lcs-ruling]');
      const rows = ruling.querySelectorAll('[data-lcs-prim="writing-row"]');
      if (rows.length !== +ruling.dataset.lcsRows) fails.push(`${rows.length} rows`);
      const starters = [...ruling.querySelectorAll('[data-lcs-starter]')];
      if (starters.length !== +ruling.dataset.lcsStarters) fails.push('starter count');
      starters.forEach((s) => { const t = s.textContent.trim(); if (!t || t.length > 22 || /[.?!]$/.test(t)) fails.push(`bad starter "${t}"`); });
      // no other visible text in the body except bank words and starters
      const body = document.querySelector('.ws-body');
      const stray = [...body.querySelectorAll('p, span, div')].filter((n) => n.children.length === 0 && n.textContent.trim() && !n.closest('[data-lcs-bank]'));
      if (stray.length) fails.push(`stray text: ${stray.map((n) => n.textContent.trim()).join(' | ')}`);
      return fails;
    });
  },
};
