/**
 * Factory for the position/spatial family (K-064..K-067).
 * Modes:
 *  - 'on-under':       crate SVG; icons on top / under / beside — circle the
 *                      one at the asked relation (relation fixed per type cfg)
 *  - 'left-right':     dashed center line; circle all icons on the asked side
 *  - 'rows':           three shelves; circle all icons on the asked shelf
 *  - 'inside-outside': big container outline; circle icons inside (or outside)
 * The arrangement IS the answer; only the one-line instruction localizes
 * (the catalog's flagged position-word naturalness check applies at i18n).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const CRATE = (w, h) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
  `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="8" fill="#DDEBE8" stroke="#146B5E" stroke-width="3"/>` +
  `<line x1="2" y1="${h / 3}" x2="${w - 2}" y2="${h / 3}" stroke="#146B5E" stroke-width="1.5" opacity="0.35"/>` +
  `<line x1="2" y1="${(2 * h) / 3}" x2="${w - 2}" y2="${(2 * h) / 3}" stroke="#146B5E" stroke-width="1.5" opacity="0.35"/>` +
  `</svg>`;

function makePositionType(cfg) {
  const { id, slug, mode, relation, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'position-words',
    themeAxis: { applicable: true, minNouns: 5 },
    difficulty: {
      1: { cards: mode === 'on-under' ? 4 : 1, icons: 6 },
      2: { cards: mode === 'on-under' ? 4 : 1, icons: 8 },
      3: { cards: mode === 'on-under' ? 6 : 1, icons: 10 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const pool = labelSafeNouns(theme);

      if (mode === 'on-under') {
        // 2×2 cards: crate + one icon at each of 3 spots; target = `relation`
        const cards = [];
        for (let i = 0; i < d.cards; i++) {
          const ns = rng.sample(pool, 3);
          // icon art has transparent padding — sink the ON icon a few px into
          // the crate's top edge so it visually SITS on it
          const spots = { on: { x: 105, y: 22 }, under: { x: 105, y: 198 }, beside: { x: 0, y: 110 } };
          const imgs = Object.entries(spots).map(([rel, p], k) =>
            `<img class="ws-icon" src="${fileUri(theme, ns[k].noun)}" alt="" data-lcs-rel="${rel}"` +
            `${rel === relation ? ' data-lcs-target="1"' : ''} ` +
            `style="position:absolute;left:${p.x}px;top:${p.y}px;width:64px;height:64px">`).join('');
          cards.push(
            `<div class="ws-card-stage" style="padding:0">` +
            `<div style="position:relative;width:280px;height:268px" data-lcs-relation="${relation}">` +
            `<div style="position:absolute;left:70px;top:74px">${CRATE(140, 120)}</div>` +
            imgs + `</div></div>`
          );
        }
        return {
          bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }),
          meta: { relation },
        };
      }

      // single-stage modes
      const W = 620, H = 560;
      const ns = rng.sample(pool, Math.min(pool.length, 6));
      const placed = [];
      const sideOf = (x, y) => {
        if (mode === 'left-right') return x + 32 < W / 2 ? 'left' : 'right';
        if (mode === 'rows') return y < H / 3 ? 'top' : (y < (2 * H) / 3 ? 'middle' : 'bottom');
        // inside-outside: container is the centered 320×300 rounded rect
        const cx = W / 2, cy = H / 2 + 10;
        return (Math.abs(x + 32 - cx) < 145 && Math.abs(y + 32 - cy) < 130) ? 'inside' : 'outside';
      };
      // grid cells, jittered; classification AFTER placement = always truthful
      const cols = 6, rows = 5;
      const cells = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
      const chosen = rng.shuffle(cells).slice(0, d.icons);
      chosen.forEach(([c, r]) => {
        const x = c * (W / cols) + (W / cols - 64) / 2 + (rng.next() * 2 - 1) * 8;
        const y = r * (H / rows) + (H / rows - 64) / 2 + (rng.next() * 2 - 1) * 6;
        placed.push({ x, y, side: sideOf(x, y), noun: rng.pick(ns) });
      });
      // guarantee at least 2 targets and 2 non-targets
      const targets = placed.filter((p) => p.side === relation).length;
      if (targets < 2 || placed.length - targets < 2) {
        // deterministic nudge: flip the first few into/out of the target zone
        // (simple, rare; verify() guards the final truth)
        let need = Math.max(0, 2 - targets);
        for (const p of placed) {
          if (need <= 0) break;
          if (p.side !== relation) {
            if (mode === 'left-right') { p.x = relation === 'left' ? 40 : W - 100; }
            else if (mode === 'rows') { p.y = relation === 'top' ? 20 : (relation === 'middle' ? H / 2 - 30 : H - 90); }
            else { const cx = W / 2, cy = H / 2 + 10; p.x = cx - 32 + (relation === 'inside' ? 0 : 220); p.y = cy - 32; }
            p.side = relation; need--;
          }
        }
      }

      let decor = '';
      if (mode === 'left-right') {
        decor = `<div style="position:absolute;left:${W / 2 - 1.5}px;top:0;width:3px;height:${H}px;` +
          `background:repeating-linear-gradient(#F2784B 0 12px, transparent 12px 22px);border-radius:2px"></div>`;
      } else if (mode === 'rows') {
        decor = [1, 2].map((k) =>
          `<div style="position:absolute;left:0;top:${(k * H) / 3}px;width:${W}px;height:3px;background:#C8BFAE;border-radius:2px"></div>`).join('');
      } else {
        decor = `<div style="position:absolute;left:${W / 2 - 160}px;top:${H / 2 + 10 - 145}px;width:320px;height:290px;` +
          `border:4px solid #146B5E;border-radius:28px;background:#DDEBE8;opacity:0.9"></div>`;
      }

      const imgs = placed.map((p) =>
        `<img class="ws-icon" src="${fileUri(theme, p.noun.noun)}" alt="" data-lcs-side="${p.side}"` +
        `${p.side === relation ? ' data-lcs-target="1"' : ''} ` +
        `style="position:absolute;left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px;width:64px;height:64px">`).join('');

      return {
        bodyHtml:
          `<div class="ws-scene" style="padding:0;justify-content:center;align-items:center">` +
          `<div style="position:relative;width:${W}px;height:${H}px" data-lcs-relation="${relation}">${decor}${imgs}</div>` +
          `</div>`,
        meta: { relation, targets: placed.filter((p) => p.side === relation).length },
      };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        document.querySelectorAll('[data-lcs-relation]').forEach((stage, i) => {
          const relation = stage.dataset.lcsRelation;
          const icons = [...stage.querySelectorAll('.ws-icon')];
          const attr = mode === 'on-under' ? 'lcsRel' : 'lcsSide';
          const targets = icons.filter((el) => el.dataset[attr] === relation);
          targets.forEach((t) => { if (!t.dataset.lcsTarget) fails.push(`stage ${i + 1}: target not marked`); });
          icons.filter((el) => el.dataset.lcsTarget && el.dataset[attr] !== relation)
            .forEach(() => fails.push(`stage ${i + 1}: marked icon not at relation`));
          if (mode === 'on-under') {
            if (targets.length !== 1) fails.push(`stage ${i + 1}: ${targets.length} targets (want 1)`);
          } else {
            if (targets.length < 2) fails.push(`stage ${i + 1}: only ${targets.length} targets`);
            if (icons.length - targets.length < 2) fails.push(`stage ${i + 1}: too few non-targets`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makePositionType };
