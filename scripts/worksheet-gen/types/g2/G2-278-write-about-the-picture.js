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
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true, levelSetBw: true },
  difficulty: {
    1: { nouns: 4, repeats: 1, sceneH: 290, rows: 4, rowH: 72, glyphH: 28, starters: 'd1' },
    2: { nouns: 6, repeats: 2, sceneH: 260, rows: 5, rowH: 62, glyphH: 24, starters: 'd2' },
    // Level Set 2026-09-29: d3 was 230 / 58 and never shipped; tightened so long fr/pt titles clear the footer
    3: { nouns: 6, repeats: 1, sceneH: 222, rows: 6, rowH: 56, glyphH: 24, starters: null },
  },
  i18n: {
    en: {
      title: 'Write About the Picture',
      instruction: 'Look at the picture. Use the word bank to help you write about what you see.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    let d = this.difficulty[difficulty];
    // a QA retry (cli qaRetries, new pages only): long bank words wrap the bank onto a second line — tighten the rows
    // (never below 50) and the scene step by step until the page fits; a page that still overflows is refused
    if (ctx.fit) d = { ...d, rowH: Math.max(50, d.rowH - 4 * ctx.fit) };   // the scene keeps its size (a smaller scene loses the hero object)
    // last resort: one writing row fewer (no level-3 instruction states a row count; starter rows must still exist)
    if (ctx.fewerRows) d = { ...d, rows: d.rows - 1 };
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc] && LABELS[loc].pictureWriting;
    if (!L) throw new Error(`G2-278: no starters for ${loc}`);
    let pool = distinctByWord(entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc) })), (e) => e.word);
    // Level Set 2026-09-29 (new pages only — the published pages are level 2, copy 1): the native panels found pictures
    // a child names as something else (the reindeer reads as a deer, the peach as an apple) and three spotted cats a
    // child cannot tell apart — at most one of them per page, so "tick the word you used" is never ambiguous; and
    // two 4th-of-July entries the lower-case bank misspells (US -> "us", États-Unis -> "états-unis") or misnames ("liberty")
    if (!(difficulty === 2 && (ctx.variant || 1) === 1)) {
      const TWIN_CATS = ['jaguar', 'leopard', 'cheetah'];
      const keptCat = pool.find((e) => TWIN_CATS.includes(e.vocabKey));
      pool = pool.filter((e) => !['reindeer', 'peach', 'us', 'liberty'].includes(e.vocabKey) && (!TWIN_CATS.includes(e.vocabKey) || e === keptCat));
    }
    if (pool.length < d.nouns) throw new Error(`G2-278: theme ${theme}/${loc} has ${pool.length} nouns < ${d.nouns}`);
    const picks = rng.sample(pool, d.nouns);
    const scene = sceneStage({ theme, nouns: picks, w: 660, h: d.sceneH, rng, heroIndex: 0, repeats: d.repeats });
    const bank = wordBank({ words: picks.map((e) => ({ word: e.word, vocabKey: e.vocabKey, src: fileUri(theme, e.noun) })), wordPx: 15, withIcons: true, ...(d.tick ? { tick: true } : {}) });
    const starters = {};
    if (d.starters === 'd1') L.d1.forEach((s, i) => { if (i < d.rows) starters[i] = s; });
    if (d.starters === 'd2') { starters[0] = L.d2[0]; if (d.rows > 2) starters[2] = L.d2[1]; }
    // Level Set 2026-09-29: starters on NAMED rows, taken in order from one set (G2-299 L1/L3, G2-300 L1)
    if (d.starterRows) d.starterRows.forEach((r, i) => { if (r >= d.rows || !L[d.starterSet][i]) throw new Error(`G2-278: no starter ${i} for row ${r}`); starters[r] = L[d.starterSet][i]; });
    const ruling = rulingBlock({ rows: d.rows, w: 660, h: d.rowH, glyphH: d.glyphH, starters });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly;align-items:center" data-lcs-page>` +
        `${scene.html}<div style="width:660px">${bank}</div><div style="width:660px" data-lcs-ruling data-lcs-rows="${d.rows}" data-lcs-starters="${Object.keys(starters).length}"${d.starterRows ? ` data-lcs-starter-rows="${d.starterRows.join(',')}"` : ''}${d.tick ? ' data-lcs-tick-bank="1"' : ''}>${ruling}</div></div>`,
      meta: { nouns: picks.map((e) => e.word) },
    };
  },

  // the published pages (level 2, copy 1) never retry; a new page that overflows tries three tighter layouts
  qaRetries(it) { return it.difficulty === 2 && (it.variant || 1) === 1 ? [] : [{ fit: 1 }, { fit: 2 }, { fit: 3 }, { fit: 3, fewerRows: true }]; },

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
      // Level Set: starters sit on exactly the named rows
      if (ruling.dataset.lcsStarterRows) {
        const want = ruling.dataset.lcsStarterRows.split(',').map(Number);
        const got = [...rows].map((r, i) => (r.querySelector('[data-lcs-starter]') ? i : -1)).filter((i) => i >= 0);
        if (want.join() !== got.join()) fails.push(`starters on rows ${got} not ${want}`);
      }
      // Level Set: the tick level has one empty box per bank word; no tick box anywhere else
      const ticks = document.querySelectorAll('[data-lcs-tick]');
      if (ruling.dataset.lcsTickBank) {
        if (ticks.length !== bank.length || bank.some((b) => b.querySelectorAll('[data-lcs-tick]').length !== 1)) fails.push(`${ticks.length} tick boxes for ${bank.length} bank words`);
        ticks.forEach((t) => { if (t.textContent.trim()) fails.push('tick box not empty'); });
      } else if (ticks.length) fails.push('tick boxes on a page without the tick task');
      // no other visible text in the body except bank words and starters
      const body = document.querySelector('.ws-body');
      const stray = [...body.querySelectorAll('p, span, div')].filter((n) => n.children.length === 0 && n.textContent.trim() && !n.closest('[data-lcs-bank]'));
      if (stray.length) fails.push(`stray text: ${stray.map((n) => n.textContent.trim()).join(' | ')}`);
      return fails;
    });
  },
};
