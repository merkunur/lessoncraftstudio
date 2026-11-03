/**
 * K-551 — Opposites Memory & Dominoes (Vocabulary maker 2026-11-02, NEW-TEMPLATES §46 T4; L.K.5.b relate frequent words
 * to their opposites; material / game): cards to cut out. Levels 1-2 are Memory — the children turn the cards face down
 * and keep two cards that are opposites; level 3 is dominoes laid in a ring, the word on the right of each domino the
 * opposite of the word on the left of the next. The pairs are the reviewed opposites bank (data/b3/opposites.js +
 * data/b3/locales, every picture opened): level 1 only the pairs with pictures (two pictures, or one picture at two
 * sizes for big / small), the word under each; levels 2-3 words. No word on a page is the opposite of two cards: a pair
 * is left out when it shares a word, or a word another pair lists as its alternative, with a pair already chosen, or
 * when the bank marks the two exclusive.
 * On the screen the child pairs the cards (Memory) or each right half with its left half (dominoes); the key numbers the
 * two cards of each pair alike, the dominoes in ring order.
 * Levels: 1 six pairs, pictures and words · 2 eight pairs, words · 3 eight dominoes, words.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { keyNumber } = require('../_shared/key-number.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660, BUDGET = 700;
const D = {
  1: { pairs: 6, cols: 3, pics: true, dominoes: false },
  2: { pairs: 8, cols: 4, pics: false, dominoes: false },
  3: { pairs: 8, cols: 2, pics: false, dominoes: true },
};

module.exports = {
  id: 'K-551',
  slug: 'opposites-memory-and-dominoes',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'opposites',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Opposite Cards', instruction: 'Cut out the cards and turn them face down. Turn over two cards: if they are opposites, keep them!' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const B = bank('opposites', L);
    const hasPic = (p) => p.pic && p.picOpened && (p.pic.kind === 'two' || p.pic.kind === 'scale');
    const pool = (B.pairs || []).filter((p) => p.a && p.b && (!d.pics || hasPic(p)));
    // tier 1 first, then tier 2, each shuffled
    const order = [...rng.shuffle(pool.filter((p) => p.tier === 1)), ...rng.shuffle(pool.filter((p) => p.tier !== 1))];
    const words = (p) => [p.a, p.b, ...((p.alt && p.alt.a) || []), ...((p.alt && p.alt.b) || [])].map((w) => w.toLocaleLowerCase(L));
    const picks = [];
    for (const p of order) {
      if (picks.length === d.pairs) break;
      const mine = new Set(words(p));
      if (picks.some((q) => words(q).some((w) => mine.has(w)) || (q.exclusiveWith || []).includes(p.id) || (p.exclusiveWith || []).includes(q.id))) continue;
      picks.push(p);
    }
    if (picks.length < d.pairs) throw new Error(`K-551: ${L} has ${picks.length} pairs that cannot be confused (< ${d.pairs})`);
    // a teacher's pairs (maker): another pair of the bank — refused when it shares a word (or an accepted alternative) with
    // another pair on the page or is marked exclusive with one
    {
      const tagged = pool.map((p) => ({ word: p.id, p }));
      const cur = picks.map((p) => tagged[pool.indexOf(p)]);
      const chosen = slot.words(ctx, cur, tagged, 'pair');
      if (chosen.some((x, i) => x !== cur[i])) {
        const list = chosen.map((x) => x.p);
        const bad = list.some((p, i) => list.some((q, j) => j > i && (words(q).some((w) => words(p).includes(w)) || (q.exclusiveWith || []).includes(p.id) || (p.exclusiveWith || []).includes(q.id))));
        if (!bad) picks.splice(0, picks.length, ...list); else { slot.words({ ...ctx, overrides: null }, cur, tagged, 'pair'); slot.refuse(ctx, 'pair'); }
      }
      if (ctx && ctx.slotsOut && ctx.slotsOut.pair) ctx.slotsOut.pair.labels = Object.fromEntries(tagged.map((x) => [x.word, x.p.a + ' ↔ ' + x.p.b]));
    }
    // the tap targets: the first card / domino half of each pair (maker only)
    const tapP = (html) => { const rec = ctx && ctx.slotsOut && ctx.slotsOut.pair; if (!rec) return html; const seen = new Set(); return html.replace(/ data-lcs-(?:opposite-card|left)="([^"]+)"/g, (m, id) => { const i = rec.values.indexOf(id); if (i < 0 || seen.has(id)) return m; seen.add(id); return m + slot.attr(ctx, 'pair', i); }); };
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const extra = (ctx && ctx.chromeExtra) || 0;
    // a side of a pair: its picture (or the one picture at its size) and its word
    const side = (p, s, px) => {
      let img = '';
      if (d.pics) {
        if (p.pic.kind === 'two') { const q = p.pic[s]; img = `<img class="ws-icon" src="${fileUri(q.theme, q.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`; }
        else { const k = Math.round(px * (s === 'a' ? p.pic.scales[0] : p.pic.scales[1])); img = `<span style="display:flex;align-items:flex-end;justify-content:center;width:${px}px;height:${px}px"><img class="ws-icon" src="${fileUri(p.pic.theme, p.pic.noun)}" alt="" style="width:${k}px;height:${k}px;object-fit:contain"></span>`; }
      }
      return img + `<span style="font:700 ${d.pics ? 22 : 26}px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center">${p[s]}</span>`;
    };
    if (!d.dominoes) {
      const cards = rng.shuffle(picks.flatMap((p, i) => ['a', 'b'].map((s) => ({ p, i, s }))));
      const rows = Math.ceil(cards.length / d.cols), w = Math.floor(W / d.cols), h = Math.floor((BUDGET - extra) / rows);
      const px = Math.max(48, Math.min(w - 30, h - 52));
      const html = cards.map(({ p, i, s }) => {
        const mk = scr ? (s === 'a' ? ` data-lcs-key-badge="${p.id}"` : ` data-lcs-pair="${p.id}"`) : '';
        return `<div data-lcs-opposite-card="${p.id}" data-lcs-word="${p[s]}"${mk} style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}">` +
          (key ? keyNumber(i + 1) : '') + side(p, s, px) + '</div>';
      });
      return {
        bodyHtml: tapP(`<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center"><div data-lcs-opposites style="display:grid;grid-template-columns:repeat(${d.cols},${w}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${html.join('')}</div></div>`),
        meta: { pairs: picks.map((p) => `${p.a}/${p.b}`) },
      };
    }
    // dominoes: domino i = left: the b word of pair i-1, right: the a word of pair i
    const tiles = picks.map((p, i) => { const prev = picks[(i + picks.length - 1) % picks.length]; return { pos: i, left: prev.b, right: p.a, lid: prev.id, rid: p.id }; });
    let order2 = null;
    for (let t = 0; t < 400 && !order2; t++) {
      const o = rng.shuffle(tiles.map((_, i) => i));
      if (o.every((v, k) => k === 0 || (Math.abs(v - o[k - 1]) !== 1 && Math.abs(v - o[k - 1]) !== tiles.length - 1))) order2 = o;
    }
    if (!order2) throw new Error(`K-551: ${L}: no mixed order`);
    const cols = d.cols, gap = 18, rows = Math.ceil(tiles.length / cols);
    const tw = Math.floor((W - gap) / cols), th = Math.min(130, Math.floor((BUDGET - extra - gap * (rows - 1)) / rows));
    const half = (w, mk) => `<div${mk} style="flex:1 1 0;display:flex;align-items:center;justify-content:center;min-width:0;font:700 26px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center;padding:0 6px">${w}</div>`;
    const html = order2.map((i) => {
      const t = tiles[i];
      return `<div data-lcs-domino="${t.pos}" data-lcs-left="${t.lid}" data-lcs-right="${t.rid}" style="position:relative;box-sizing:border-box;width:${tw}px;height:${th}px;display:flex;align-items:stretch;border:2.5px dashed ${T.grid};border-radius:14px;background:#FFFFFF">` +
        (key ? keyNumber(t.pos + 1) : '') +
        half(t.left, scr ? ` data-lcs-pair="${t.lid}"` : '') +
        `<div style="width:0;border-left:3px solid ${T.teal};margin:12px 0"></div>` +
        half(t.right, scr ? ` data-lcs-key-badge="${t.rid}"` : '') + '</div>';
    });
    return {
      bodyHtml: tapP(`<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center"><div data-lcs-dominoes style="display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:${gap}px">${html.join('')}</div></div>`),
      meta: { ring: tiles.map((t) => `${t.left}|${t.right}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-opposite-card]')];
      const tiles = [...document.querySelectorAll('[data-lcs-domino]')];
      if (cards.length) {
        if (cards.length < 12) fails.push(`${cards.length} cards`);
        const by = {}; cards.forEach((c) => { (by[c.dataset.lcsOppositeCard] = by[c.dataset.lcsOppositeCard] || []).push(c.dataset.lcsWord); });
        Object.entries(by).forEach(([k, v]) => { if (v.length !== 2 || v[0] === v[1]) fails.push(`pair ${k}: ${v.length} cards`); });
        cards.forEach((c, i) => { const R = c.getBoundingClientRect(); c.querySelectorAll('img,span').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.right > R.right + 1 || r.bottom > R.bottom + 1)) fails.push(`card ${i + 1}: content leaves the card`); }); c.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: a picture did not load`); }); });
      } else {
        if (tiles.length < 6) fails.push(`${tiles.length} dominoes`);
        const lefts = tiles.map((t) => t.dataset.lcsLeft).sort().join(), rights = tiles.map((t) => t.dataset.lcsRight).sort().join();
        if (lefts !== rights) fails.push('a right half has no opposite on a left half');
        tiles.forEach((t, i) => { if (t.dataset.lcsLeft === t.dataset.lcsRight) fails.push(`domino ${i + 1}: its two words are opposites`); if (t.scrollWidth > t.clientWidth + 1) fails.push(`domino ${i + 1}: a word leaves the domino`); });
      }
      return fails;
    });
  },
};
