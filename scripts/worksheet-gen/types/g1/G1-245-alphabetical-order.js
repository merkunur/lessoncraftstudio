/**
 * G1-245 — Alphabetical Order (nt20-B; `alphabetical-order`, G1, readiness).
 * An alphabet strip across the top — the locale's WHOLE alphabet (sv/fi å ä ö,
 * da/no æ ø å, es ñ in place). Below, six picture-word cards tossed at slight
 * angles, each with a dashed coral rank circle; the child numbers them 1-6,
 * then copies the words in order onto numbered rulings. Sorting uses the
 * locale collation table (data/b2/collation.js) — never ASCII.
 * d1: 4 cards, first letters ≥ 3 apart, rank circles only · d2: 6 cards,
 * distinct first letters, 6 rulings · d3: 6 cards incl. two same-first-letter
 * pairs (second-letter decision).
 */
'use strict';
const { writingRow } = require('../../primitives/trace-path.js');
const { alphabetStrip } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { COLLATION, compare, firstIndex, sortKey } = require('../../data/b2/collation.js');

module.exports = {
  id: 'G1-245',
  slug: 'alphabetical-order',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'alphabetical-order',
  themeAxis: { applicable: true, minNouns: 10, excludeBw: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, cardW: 200, cardH: 176, pic: 100, font: 20, gap: 3, pairs: 0, rulings: true },
    2: { cards: 6, cols: 3, rows: 2, cardW: 168, cardH: 148, pic: 76, font: 17, gap: 1, pairs: 0, rulings: true },
    3: { cards: 6, cols: 3, rows: 2, cardW: 168, cardH: 148, pic: 76, font: 17, gap: 1, pairs: 2, rulings: true },
  },
  i18n: {
    en: {
      title: 'ABC Order',
      instruction: 'Use the alphabet strip. Number the picture words 1 to 6 in alphabetical order, then write them in order on the lines.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const col = COLLATION[loc];
    if (!col) throw new Error(`G1-245: no collation for ${loc}`);
    let pool = distinctByWord(entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => /^[\p{L}]+$/u.test(e.word) && [...e.word].length <= 12 && firstIndex(e.word, loc) >= 0), (e) => e.word);
    let picks = null, guard = 0;
    while (!picks && guard++ < 300) {
      const cand = rng.sample(pool, Math.min(pool.length, d.cards));
      if (cand.length < d.cards) break;
      const firsts = cand.map((e) => firstIndex(e.word, loc));
      const keys = cand.map((e) => sortKey(e.word, loc).join('.'));
      if (new Set(keys).size !== cand.length) continue;
      const counts = {};
      firsts.forEach((f) => { counts[f] = (counts[f] || 0) + 1; });
      const pairs = Object.values(counts).filter((c) => c === 2).length;
      const tooMany = Object.values(counts).some((c) => c > 2);
      if (tooMany) continue;
      if (pairs !== d.pairs) continue;
      if (d.pairs === 0) {
        const s = firsts.slice().sort((a, b) => a - b);
        if (s.some((v, i) => i && v - s[i - 1] < d.gap)) continue;
      } else {
        // each pair resolves at letter 2 with ≥ 2 positions between
        let ok = true;
        for (const f of Object.keys(counts)) {
          if (counts[f] !== 2) continue;
          const two = cand.filter((e) => firstIndex(e.word, loc) === +f).map((e) => sortKey(e.word, loc));
          if (two[0].length < 2 || two[1].length < 2 || Math.abs(two[0][1] - two[1][1]) < 2) ok = false;
        }
        if (!ok) continue;
      }
      picks = cand;
    }
    if (!picks) throw new Error(`G1-245: theme ${theme}/${loc} cannot satisfy the first-letter rule at d${difficulty}`);
    const sorted = picks.slice().sort((a, b) => compare(a.word, b.word, loc));
    const rank = new Map(sorted.map((e, i) => [e.word, i + 1]));
    // visual order ≠ sorted / reversed
    let order = picks.slice(), g2 = 0;
    const key = (arr) => arr.map((e) => e.word).join('|');
    while ((key(order) === key(sorted) || key(order) === key(sorted.slice().reverse())) && g2++ < 50) order = rng.shuffle(order);
    const stageW = 660, cellW = stageW / d.cols, stageH = d.rows * (d.cardH + 38);
    const cellH = stageH / d.rows;
    const cards = order.map((e, i) => {
      const c = i % d.cols, r = Math.floor(i / d.cols);
      const jx = (rng.next() * 2 - 1) * 12, jy = (rng.next() * 2 - 1) * 10;
      const x = c * cellW + (cellW - d.cardW) / 2 + jx, y = r * cellH + (cellH - d.cardH) / 2 + jy;
      const rot = (rng.next() * 10 - 5).toFixed(1);
      const fs = [...e.word].length >= 11 ? 15 : d.font;
      return `<div class="ws-card" style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${d.cardW}px;height:${d.cardH}px;transform:rotate(${rot}deg);align-items:center;justify-content:center;gap:6px;overflow:visible" ` +
        `data-lcs-word="${e.word}" data-lcs-vocab="${e.vocabKey}" data-lcs-rank="${rank.get(e.word)}" data-lcs-pos="${i}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${d.pic}px;height:${d.pic}px">` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:${fs}px;color:#3A3530;white-space:nowrap">${e.word}</span>` +
        `<svg width="36" height="36" viewBox="0 0 36 36" style="position:absolute;right:-8px;top:-8px" data-lcs-rank-slot><circle cx="18" cy="18" r="16" fill="#FFFFFF" stroke="#F2784B" stroke-width="2.5" stroke-dasharray="5 4"/></svg></div>`;
    });
    const stage = `<div style="position:relative;width:${stageW}px;height:${stageH}px" data-lcs-stage data-ws-content>${cards.join('')}</div>`;
    let rulings = '';
    if (d.rulings) {
      const rows = sorted.map((_, i) =>
        `<div style="display:flex;align-items:center;gap:8px" data-lcs-answer-line="${i + 1}">` +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:18px;color:#146B5E;width:22px;text-align:right">${i + 1}</span>${writingRow({ w: 280, h: 50, glyphH: 26, xHeight: true }).svg}</div>`);
      rulings = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;justify-items:center">${rows.join('')}</div>`;
    }
    const strip = alphabetStrip({ letters: col.strip, w: 660, upper: col.stripCase === 'upper' });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly;align-items:center" data-lcs-collation="${loc}">${strip}${stage}${rulings}</div>`,
      meta: { order: sorted.map((e) => e.word) },
    };
  },

  async verify(page) {
    const loc = await page.evaluate(() => document.querySelector('[data-lcs-collation]').dataset.lcsCollation);
    const table = COLLATION[loc];
    return page.evaluate((tbl) => {
      const fails = [];
      const idx = new Map(tbl.alphabet.map((ch, i) => [ch, i]));
      const key = (w) => { const k = []; for (const ch of w.toLowerCase()) { const f = tbl.fold[ch] != null ? tbl.fold[ch] : ch; for (const c of f) if (idx.has(c)) k.push(idx.get(c)); } return k; };
      const cmp = (a, b) => { const ka = key(a), kb = key(b); for (let i = 0; i < Math.min(ka.length, kb.length); i++) if (ka[i] !== kb[i]) return ka[i] - kb[i]; return ka.length - kb.length; };
      const cards = [...document.querySelectorAll('[data-lcs-word]')];
      if (cards.length < 4) fails.push(`only ${cards.length} cards`);
      const words = cards.map((c) => c.dataset.lcsWord);
      const sorted = words.slice().sort(cmp);
      cards.forEach((c, i) => {
        if (+c.dataset.lcsRank !== sorted.indexOf(c.dataset.lcsWord) + 1) fails.push(`card ${i + 1}: rank ${c.dataset.lcsRank} but sorted position ${sorted.indexOf(c.dataset.lcsWord) + 1}`);
        const slot = c.querySelector('[data-lcs-rank-slot]');
        if (!slot || slot.textContent.trim()) fails.push(`card ${i + 1}: rank slot missing or filled`);
      });
      const ranks = cards.map((c) => +c.dataset.lcsRank).sort((a, b) => a - b);
      if (ranks.join(',') !== ranks.map((_, i) => i + 1).join(',')) fails.push('ranks not a permutation');
      // visual order (data-lcs-pos) must not equal sorted or reversed
      const byPos = cards.slice().sort((a, b) => +a.dataset.lcsPos - +b.dataset.lcsPos).map((c) => c.dataset.lcsWord);
      if (byPos.join('|') === sorted.join('|') || byPos.join('|') === sorted.slice().reverse().join('|')) fails.push('card layout reveals the order');
      // strip letters == table strip; every first letter (folded) present
      const strip = document.querySelector('[data-lcs-alphabet]');
      if (!strip) fails.push('no alphabet strip');
      else if (strip.dataset.lcsAlphabet !== tbl.strip.join('')) fails.push('strip letters != collation strip');
      words.forEach((w) => { const k = key(w); if (!k.length || !tbl.strip.includes(tbl.alphabet[k[0]])) fails.push(`first letter of "${w}" not on the strip`); });
      const lines = document.querySelectorAll('[data-lcs-answer-line]');
      if (lines.length && lines.length !== cards.length) fails.push('answer lines != cards');
      lines.forEach((l) => { if (l.querySelector('[data-lcs-prim="writing-row"] text')) fails.push('answer line has text'); });
      return fails;
    }, table);
  },
};
