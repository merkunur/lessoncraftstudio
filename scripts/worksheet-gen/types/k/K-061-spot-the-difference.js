/**
 * K-061 — Spot the difference: two near-identical icon scenes side by side;
 * k pictures changed in the right panel. The child circles the changes.
 * Same seed drives both panels, so layout is identical by construction.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'K-061',
  slug: 'spot-the-difference',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: true, minNouns: 8 },
  difficulty: {
    1: { items: 6, diffs: 2 },
    2: { items: 8, diffs: 3 },
    3: { items: 10, diffs: 4 },
  },
  i18n: {
    en: {
      title: 'Spot the Differences',
      instruction: 'Compare the two pictures. Circle what changed on the right.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = labelSafeNouns(theme);
    const base = rng.sample(pool, d.items);
    const replacements = rng.sample(pool.filter((p) => !base.includes(p)), d.diffs);
    const diffIdx = rng.sample(base.map((_, i) => i), d.diffs);

    // shared positions (panel ~300×620)
    const W = 296, H = 620, cols = 2, rows = Math.ceil(d.items / 2);
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
    const chosen = rng.shuffle(cells).slice(0, d.items);
    const iconPx = Math.min(76, Math.floor(H / rows) - 18);
    const positions = chosen.map(([c, r]) => ({
      x: c * (W / cols) + (W / cols - iconPx) / 2 + (rng.next() * 2 - 1) * 6,
      y: r * (H / rows) + (H / rows - iconPx) / 2 + (rng.next() * 2 - 1) * 5,
      rot: (rng.next() * 12 - 6).toFixed(1),
    }));

    const panel = (nouns, markDiffs) =>
      `<div class="ws-scene" style="flex:1 1 0;min-width:0;padding:8px">` +
      `<div style="position:relative;width:${W}px;height:${H}px">` +
      nouns.map((n, i) => {
        const p = positions[i];
        const isDiff = markDiffs && diffIdx.includes(i);
        return `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" data-lcs-pos="${i}"` +
          `${isDiff ? ' data-lcs-diff="1"' : ''} ` +
          `style="position:absolute;left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px;` +
          `width:${iconPx}px;height:${iconPx}px;transform:rotate(${p.rot}deg)">`;
      }).join('') + `</div></div>`;

    const right = base.map((n, i) => {
      const k = diffIdx.indexOf(i);
      return k === -1 ? n : replacements[k];
    });

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;gap:14px;min-height:0" data-lcs-diffcount="${d.diffs}">` +
        panel(base, false) + panel(right, true) +
        `</div>`,
      meta: { diffs: diffIdx.map((i, k) => ({ pos: i, was: base[i].vocabKey, now: replacements[k].vocabKey })) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-diffcount]');
      const want = parseInt(wrap.dataset.lcsDiffcount, 10);
      const panels = wrap.querySelectorAll('.ws-scene');
      if (panels.length !== 2) return ['need 2 panels'];
      const imgsOf = (p) => [...p.querySelectorAll('.ws-icon')];
      const a = imgsOf(panels[0]), b = imgsOf(panels[1]);
      if (a.length !== b.length) fails.push('panel item counts differ');
      let diffs = 0;
      a.forEach((ia, i) => {
        const ib = b.find((el) => el.dataset.lcsPos === ia.dataset.lcsPos);
        if (!ib) { fails.push(`pos ${i}: missing in right panel`); return; }
        const differ = ia.src !== ib.src;
        if (differ) diffs++;
        if (differ && !ib.dataset.lcsDiff) fails.push(`pos ${i}: changed but unmarked`);
        if (!differ && ib.dataset.lcsDiff) fails.push(`pos ${i}: marked but identical`);
        if (ia.style.left !== ib.style.left || ia.style.top !== ib.style.top) fails.push(`pos ${i}: positions diverge`);
      });
      if (diffs !== want) fails.push(`${diffs} differences != declared ${want}`);
      return fails;
    });
  },
};
