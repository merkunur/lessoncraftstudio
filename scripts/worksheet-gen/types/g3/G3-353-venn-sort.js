/**
 * G3-353 — Venn-style 2-set sort by SIZE and KIND: left ring = one kind
 * (any size), right ring = one size (any kind); the overlap = that kind AT
 * that size. Items strip below; the child draws each into its region.
 * Visual attributes only — fully language-neutral.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { svgRoot, el, circle } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

const BIG = 58, SMALL = 34;

function vennSvg(w, h, leftHref) {
  const t = tokens;
  const r = h * 0.42;
  const cx1 = w / 2 - r * 0.62, cx2 = w / 2 + r * 0.62, cy = h / 2;
  return svgRoot({ width: w, height: h, label: 'venn diagram' }, [
    circle({ cx: cx1, cy, r, fill: 'none', strokeColor: t.color.teal, strokeWidth: 4 }),
    circle({ cx: cx2, cy, r, fill: 'none', strokeColor: t.color.coral, strokeWidth: 4 }),
    // region labels: left = the kind icon; right = a size dot (big)
    el('image', { href: leftHref, x: cx1 - r + 8, y: cy - r - 2, width: 40, height: 40 }),
    circle({ cx: cx2 + r - 26, cy: cy - r + 16, r: 13, fill: t.color.coral }),
  ].join(''));
}

module.exports = {
  id: 'G3-353',
  slug: 'venn-diagram-sorting',
  gradeBand: 'G23',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { items: 8 },
    2: { items: 10 },
    3: { items: 12 },
  },
  i18n: {
    en: {
      title: 'Two-Circle Sort',
      instruction: 'Left circle: this kind. Right circle: BIG ones. Middle: both! Draw a line from each picture to its place.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const [kind, other1, other2] = rng.sample(labelSafeNouns(theme), 3);
    // regions: left-only = kind+small, overlap = kind+big, right-only = other+big, outside = other+small
    const regions = ['left', 'both', 'right', 'out'];
    const items = [];
    regions.forEach((reg) => items.push(reg));            // ≥1 per region
    while (items.length < d.items) items.push(rng.pick(regions));
    const order = rng.shuffle(items);
    const strip = order.map((reg) => {
      const isKind = reg === 'left' || reg === 'both';
      const isBig = reg === 'both' || reg === 'right';
      const noun = isKind ? kind : (rng.next() < 0.5 ? other1 : other2);
      const px = isBig ? BIG : SMALL;
      return `<span style="display:inline-flex;align-items:flex-end;justify-content:center;width:${BIG + 10}px;height:${BIG + 10}px" data-lcs-region="${reg}">` +
        `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" data-lcs-kind="${isKind ? 1 : 0}" data-lcs-big="${isBig ? 1 : 0}" style="width:${px}px;height:${px}px"></span>`;
    }).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly" data-lcs-kindkey="${kind.vocabKey}">` +
        vennSvg(560, 360, fileUri(theme, kind.noun)) +
        `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:620px">${strip}</div>` +
        `</div>`,
      meta: { kind: kind.vocabKey },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const items = [...document.querySelectorAll('[data-lcs-region]')];
      const seen = { left: 0, both: 0, right: 0, out: 0 };
      items.forEach((it, i) => {
        const reg = it.dataset.lcsRegion;
        seen[reg]++;
        const img = it.querySelector('img');
        const isKind = img.dataset.lcsKind === '1';
        const isBig = img.dataset.lcsBig === '1';
        const expect = { left: [true, false], both: [true, true], right: [false, true], out: [false, false] }[reg];
        if (isKind !== expect[0] || isBig !== expect[1]) fails.push(`item ${i + 1}: attributes do not match region ${reg}`);
        const w = parseInt(img.style.width, 10);
        if (isBig && w < 50) fails.push(`item ${i + 1}: big item rendered small`);
        if (!isBig && w > 44) fails.push(`item ${i + 1}: small item rendered big`);
      });
      Object.entries(seen).forEach(([r, n]) => { if (n < 1) fails.push(`region ${r} has no items`); });
      return fails;
    });
  },
};
