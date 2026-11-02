/**
 * Factory: SCIENCE curated-pair match — two columns; the child draws a line
 * from each left picture to its curated partner on the right (adult↔baby,
 * helper↔tool, sense↔body-part, animal↔home).
 *
 * Distinct from the existing visual-matching (shadow-match): that matches an
 * icon to its OWN silhouette (identity). Science matches cross-noun semantic
 * pairs from a curated data file. Cores untouched — borrows the .ws-match /
 * .ws-match-col / .ws-match-item / .ws-match-dot layout; no page.css edit.
 *
 * cfg: { id, slug, gradeBand, data:{pairs:[{left:{theme,noun},right:{theme,noun}}]}, i18n }
 * themeAxis OFF (curated cross-theme refs); pair sample + derangement = variety.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { keyNumber } = require('./key-number.js');

function makeSciencePairMatch(cfg) {
  const allPairs = cfg.data.pairs;
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'science-match',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { pairs: 4 }, 2: { pairs: 5 }, 3: { pairs: 5 } },
    i18n: cfg.i18n,

    build({ difficulty }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const n = Math.min(d.pairs, allPairs.length);
      // two pairs whose tools each fit both people never share a page (data `conflicts`: the farmer picture HOLDS a rake —
      // with the gardener and his rake on the page the farmer had two tools; 2026-11-02). A draw holding both is drawn
      // again, so a page that never held them keeps the draw it shipped with
      const conflicts = cfg.data.conflicts || [];
      const clash = (ps) => conflicts.some((c) => c.every((noun) => ps.some((p) => p.left.noun === noun)));
      let pairs = rng.sample(allPairs, n);
      for (let g = 0; g < 200 && clash(pairs); g++) pairs = rng.sample(allPairs, n);
      if (clash(pairs)) throw new Error(cfg.id + ': no page of ' + n + ' pairs without a conflict');
      // makers (2026-11-02): each PAIR is a slot (tap the left picture: another pair of the list comes with its own right
      // picture); a choice that brings a conflict is refused. The KEY numbers the left pictures and gives each right one
      // its partner's number; the SCREEN makes each left picture an item that answers its right one. Catalogue unchanged
      const asItem = (p) => ({ theme: p.left.theme, noun: p.left.noun, p });
      const drawn = pairs;
      pairs = slot.anyPictures(ctx, drawn.map(asItem), allPairs.map(asItem), 'pair').map((x) => x.p);
      // a pair brings its partner (the doctor her thermometer): the gates read the partner as part of the swapped item
      if (ctx && ctx.slotsOut && ctx.slotsOut.pair) ctx.slotsOut.pair.partners = Object.fromEntries(allPairs.map((p) => [p.left.theme + '/' + p.left.noun, [p.right.noun]]));
      if (clash(pairs)) { pairs = slot.anyPictures(ctx && { ...ctx, overrides: null }, drawn.map(asItem), allPairs.map(asItem), 'pair').map((x) => x.p); slot.refuse(ctx, 'pair'); }
      const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);

      // right column deranged: no baby sits straight across from its grown-up
      let order;
      do { order = rng.shuffle(pairs.map((_, i) => i)); }
      while (n > 1 && order.some((v, i) => v === i));

      // d.extra (K-213 level 1, 2026-11-02): right pictures that belong to no one on the page — from pairs not drawn and in
      // no conflict with the page (a left-over thermometer beside the nurse would fit her) — so the last line is not free
      let rightList = order.map((i) => ({ p: pairs[i], src: i }));
      if (d.extra) {
        // drawn from the pairs the DRAWN page left out, so a swapped pair moves nothing else; an extra that the teacher's
        // pair made wrong (it IS her pair, or it now fits one on the page) gives its place to a pair she pushed out
        const rest = allPairs.filter((q) => !drawn.includes(q) && !clash(drawn.concat([q])));
        const freed = drawn.filter((q) => !pairs.includes(q));
        const fits = (q) => !pairs.includes(q) && !clash(pairs.concat([q]));
        for (let q of rng.sample(rest, Math.min(d.extra, rest.length))) {
          if (!fits(q)) { const k = freed.findIndex(fits); q = k >= 0 ? freed.splice(k, 1)[0] : null; }
          const at = rng.int(0, rightList.length);
          if (q) rightList.splice(at, 0, { p: q, src: -1 });
        }
      }
      const rows = Math.max(n, rightList.length);
      const itemH = Math.floor((720 - (rows - 1) * 14) / rows);
      const iconPx = Math.min(92, itemH - 26);

      const left = pairs.map((p, i) =>
        `<div class="ws-match-item" style="width:200px;height:${itemH}px" data-sci-left="${p.left.noun}"` +
        (key ? ` data-lcs-pair="${i + 1}"` : scr ? ` data-lcs-key-badge="t${i + 1}"` : '') + `${slot.attr(ctx, 'pair', i)}>` + (key ? keyNumber(i + 1) : '') +
        `<img class="ws-icon" src="${fileUri(p.left.theme, p.left.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');

      let xn = 0;
      const right = rightList.map(({ p, src: srcIdx }) => {
        if (srcIdx < 0) {   // a left-over picture: a target on the screen that no one answers, no number on the key
          xn++;
          return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-sci-extra="${p.left.noun}"` +
            (scr ? ` data-lcs-pair="x${xn}" data-lcs-label="•"` : '') + `>` +
            `<img class="ws-icon" src="${fileUri(p.right.theme, p.right.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
            `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
        }
        return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-sci-right="${p.left.noun}"` +
          (key ? ` data-lcs-key-badge="${srcIdx + 1}"` : scr ? ` data-lcs-pair="t${srcIdx + 1}" data-lcs-label="•"` : '') + `>` +
          `<img class="ws-icon" src="${fileUri(p.right.theme, p.right.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
          `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
      }).join('');

      return {
        bodyHtml:
          `<div class="ws-match" style="padding:6px 40px">` +
          `<div class="ws-match-col">${left}</div>` +
          `<div class="ws-match-col">${right}</div>` +
          `</div>`,
        meta: { pairs: pairs.map((p) => p.left.noun + '→' + p.right.noun) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const left = [...document.querySelectorAll('[data-sci-left]')].map((e) => e.dataset.sciLeft);
        const right = [...document.querySelectorAll('[data-sci-right]')].map((e) => e.dataset.sciRight);
        if (left.length !== right.length) fails.push('column length mismatch');
        if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column is not a permutation of left');
        // (with a left-over picture the columns have different lengths: no row is "straight across")
        if (!document.querySelector('[data-sci-extra]')) left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: baby sits straight across from its grown-up`); });
        document.querySelectorAll('[data-sci-extra]').forEach((x) => { if (left.includes(x.dataset.sciExtra)) fails.push('a left-over picture belongs to someone on the page'); });
        return fails;
      });
    },
  };
}

module.exports = { makeSciencePairMatch };
