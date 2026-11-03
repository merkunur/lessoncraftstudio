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
          // level 1 (2026-09-27): only the asked position and its opposite are
          // filled — two words in play instead of three. Levels 2-3 unchanged.
          const PARTNER = { on: 'under', under: 'on', beside: 'on' };
          const keep = difficulty === 1 ? new Set([relation, PARTNER[relation] || 'under']) : null;
          const imgs = Object.entries(spots).filter(([rel]) => !keep || keep.has(rel)).map(([rel, p]) =>
            [rel, p, Object.keys(spots).indexOf(rel)]).map(([rel, p, k]) =>
            // generic marks (2026-11-03, INTERACTIVE-AND-SHARING §D): every icon a choice, the asked one correct — the
            // key rings it and the screen asks to tap it (one card = one question, [data-lcs-card])
            `<img class="ws-icon" src="${fileUri(theme, ns[k].noun)}" alt="" data-lcs-rel="${rel}" data-lcs-choice` +
            `${rel === relation ? ' data-lcs-target="1" data-lcs-correct' : ''} ` +
            `style="position:absolute;left:${p.x}px;top:${p.y}px;width:64px;height:64px">`).join('');
          // six cards (level 3) need three rows: shrink the 280×268 scene so it
          // fits the page. Four-card levels keep the exact original markup.
          const k = d.cards > 4 ? 0.78 : 1;
          const scene = `<div style="position:relative;width:280px;height:268px" data-lcs-relation="${relation}">` +
            `<div style="position:absolute;left:70px;top:74px">${CRATE(140, 120)}</div>` +
            imgs + `</div>`;
          cards.push(
            `<div class="ws-card-stage" style="padding:0" data-lcs-card>` +
            (k === 1 ? scene
              : `<div style="width:${Math.round(280 * k)}px;height:${Math.round(268 * k)}px"><div style="transform:scale(${k});transform-origin:0 0">${scene}</div></div>`) +
            `</div>`
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
      if (mode !== 'left-right') {
        // rows / inside-outside (2026-11-03): a picture's side is decided by its whole 64-px box, never its centre — a
        // centre test put a picture ACROSS a shelf line on 95-100 % of Top-Middle-Bottom pages and across the container's
        // border on 81-94 % of Inside-Outside pages (two right answers for that picture), and the "two targets" nudge
        // stacked pictures on one spot. Every cell is jittered once; a cell whose picture touches a line or the border
        // (within CLEAR px) is never used; two of each side first, then the count at the asked place drawn evenly.
        const CLEAR = 6;
        const clearSide = (x, y) => {
          if (mode === 'rows') {
            const a = H / 3, b = (2 * H) / 3;
            if (y + 64 <= a - CLEAR) return 'top';
            if (y >= a + CLEAR && y + 64 <= b - CLEAR) return 'middle';
            return y >= b + CLEAR ? 'bottom' : null;
          }
          const L0 = W / 2 - 160, T0 = H / 2 + 10 - 145, R0 = L0 + 320, B0 = T0 + 290;   // the container's border box (4-px border)
          if (x >= L0 + 4 + CLEAR && x + 64 <= R0 - 4 - CLEAR && y >= T0 + 4 + CLEAR && y + 64 <= B0 - 4 - CLEAR) return 'inside';
          return (x + 64 <= L0 - CLEAR || x >= R0 + CLEAR || y + 64 <= T0 - CLEAR || y >= B0 + CLEAR) ? 'outside' : null;
        };
        let spots = rng.shuffle(cells).map(([c, r]) => {
          const x = c * (W / cols) + (W / cols - 64) / 2 + (rng.next() * 2 - 1) * 8;
          const y = r * (H / rows) + (H / rows - 64) / 2 + (rng.next() * 2 - 1) * 6;
          return { x, y, side: clearSide(x, y) };
        }).filter((p) => p.side);
        if (mode === 'inside-outside') {
          // the container holds its own 3 × 3 spots (the outer grid fits only a 2 × 2 patch in it, so nearly every page
          // had exactly two pictures inside): outer cells keep the outside spots only
          const L0 = W / 2 - 160, T0 = H / 2 + 10 - 145;
          const inner = [];
          for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) inner.push({ x: L0 + 16 + c * 115 + (rng.next() * 2 - 1) * 5, y: T0 + 16 + r * 103 + (rng.next() * 2 - 1) * 5 });
          spots = [...spots.filter((p) => p.side === 'outside'), ...rng.shuffle(inner).map((p) => ({ ...p, side: clearSide(p.x, p.y) })).filter((p) => p.side === 'inside')];
          spots = rng.shuffle(spots);
        }
        const hit = spots.filter((p) => p.side === relation), miss = spots.filter((p) => p.side !== relation);
        if (hit.length < 2 || miss.length < 2) throw new Error(`${id}: only ${hit.length} clear spots ${relation} / ${miss.length} elsewhere — refuse`);
        // how many pictures stand at the asked place: 2 … icons − 2, evenly (taking the first spots of the shuffle left
        // "exactly two" on most pages — a count the child could guess)
        const k = Math.min(hit.length, rng.int(2, d.icons - 2));
        const take = [...hit.slice(0, k), ...miss.slice(0, d.icons - k)];
        for (const p of take) placed.push({ ...p, noun: rng.pick(ns) });
      } else {
      const chosen = rng.shuffle(cells).slice(0, d.icons);
      chosen.forEach(([c, r]) => {
        const x = c * (W / cols) + (W / cols - 64) / 2 + (rng.next() * 2 - 1) * 8;
        const y = r * (H / rows) + (H / rows - 64) / 2 + (rng.next() * 2 - 1) * 6;
        placed.push({ x, y, side: sideOf(x, y), noun: rng.pick(ns) });
      });
      }
      // guarantee at least 2 targets and 2 non-targets (left-right only: the other modes chose them above)
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
        // generic marks (2026-11-03): every picture a candidate, the ones at the asked place ringed (key + tap-select screen)
        `<img class="ws-icon" src="${fileUri(theme, p.noun.noun)}" alt="" data-lcs-side="${p.side}" data-lcs-pick` +
        `${p.side === relation ? ' data-lcs-target="1" data-lcs-key-ring' : ''} ` +
        `style="position:absolute;left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px;width:64px;height:64px">`).join('');

      return {
        bodyHtml:
          `<div class="ws-scene" style="padding:0;justify-content:center;align-items:center">` +
          `<div style="position:relative;width:${W}px;height:${H}px" data-ws-content data-lcs-relation="${relation}">${decor}${imgs}</div>` +
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
            // the RENDERED place (2026-11-03): every picture's whole box clearly on its stamped side of the line / border,
            // and no two pictures overlapping — the stamps alone passed pages whose pictures lay across a shelf line
            const W = 620, H = 560, st = stage.getBoundingClientRect(), sx = st.width / W, sy = st.height / H;
            const boxes = icons.map((el) => { const r = el.getBoundingClientRect(); return { el, l: (r.left - st.left) / sx, t: (r.top - st.top) / sy, r: (r.right - st.left) / sx, b: (r.bottom - st.top) / sy }; });
            const L0 = W / 2 - 160, T0 = H / 2 + 10 - 145;
            const sideOfBox = (b) => {
              if (mode === 'left-right') return b.r <= W / 2 - 2 ? 'left' : b.l >= W / 2 + 2 ? 'right' : null;
              if (mode === 'rows') return b.b <= H / 3 - 2 ? 'top' : (b.t >= H / 3 + 2 && b.b <= (2 * H) / 3 - 2) ? 'middle' : b.t >= (2 * H) / 3 + 2 ? 'bottom' : null;
              if (b.l >= L0 + 6 && b.r <= L0 + 314 && b.t >= T0 + 6 && b.b <= T0 + 284) return 'inside';
              return (b.r <= L0 - 2 || b.l >= L0 + 322 || b.b <= T0 - 2 || b.t >= T0 + 292) ? 'outside' : null;
            };
            boxes.forEach((b, k) => {
              const s = sideOfBox(b);
              if (!s) fails.push(`stage ${i + 1}: picture ${k + 1} lies across a line / the border`);
              else if (s !== b.el.dataset.lcsSide) fails.push(`stage ${i + 1}: picture ${k + 1} drawn ${s}, stamped ${b.el.dataset.lcsSide}`);
            });
            boxes.forEach((a, p) => boxes.forEach((c, q) => { if (q > p && Math.min(a.r, c.r) - Math.max(a.l, c.l) > 2 && Math.min(a.b, c.b) - Math.max(a.t, c.t) > 2) fails.push(`stage ${i + 1}: pictures ${p + 1} and ${q + 1} overlap`); }));
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makePositionType };
