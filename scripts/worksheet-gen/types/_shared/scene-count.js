/**
 * Factory for the busy-scene counting family (K-013 count-by-category,
 * K-060 I-spy count, K-059 find-and-circle):
 * one big mixed scatter + a legend row per noun (icon + write-in box), or a
 * single-target banner for find-and-circle.
 */
'use strict';
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { mixedScatter, answerBox } = require('../../templates/components.js');
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

function makeSceneCountType(cfg) {
  const { id, slug, mode, i18n, gradeBand } = cfg;   // mode: 'legend' | 'find'
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: 'counting-pictures',
    themeAxis: { applicable: true, minNouns: 4 },
    difficulty: cfg.difficulty || {
      1: { nouns: 2, minN: 2, maxN: 5 },
      2: { nouns: 3, minN: 3, maxN: 7 },
      3: { nouns: 4, minN: 4, maxN: 9 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const picked = slot.pictures(ctx, rng.sample(labelSafeNouns(theme), mode === 'find' ? d.nouns + 1 : d.nouns), labelSafeNouns(theme), theme);
      const items = picked.slice(0, d.nouns).map((p) => ({ ...p, n: rng.int(d.minN, d.maxN) }));

      // the scatter fills the scene card, which grows to the body (page.css .ws-scene flex 1): measured 2026-10-31 — the old
      // 600 / 520 left a ~240 px empty band above and below the pictures (none of these types was published at that size)
      const sceneH = mode === 'find' ? 660 : 720;
      // fewer pictures → bigger pictures (a level-1 scene of six is not six small icons in an empty card); 58 px floor
      const total = items.reduce((a, it) => a + it.n, 0);
      const iconPx = Math.min(96, Math.max(58, Math.floor(Math.sqrt((600 * (sceneH - 20)) / total) * 0.55)));
      const scene =
        `<div class="ws-scene" data-lcs-scene data-ws-content>` +
        mixedScatter({ theme, items, w: 600, h: sceneH - 20, iconPx, rng, ...(ctx.answerKey && mode === 'find' ? { mark: (it) => (it === items[0] ? ' data-lcs-key-ring="1"' : '') } : {}) }) +
        `</div>`;

      let below;
      if (mode === 'legend') {
        // five kinds (K-060 level 3) do not fit one row at 48 px + a 64 px box (~750 px > the page): a compact item; ≤ 4 kinds
        // keep the original markup byte for byte
        const tight = items.length > 4;
        below = `<div class="ws-scene-legend">` + items.map((it) =>
          `<span class="ws-scene-legend-item" data-lcs-noun="${it.vocabKey}"${tight ? ' style="gap:6px;padding:6px 8px"' : ''}${slot.attr(ctx, 'pic', items.indexOf(it))}>` +
          `<img class="ws-icon" src="${fileUri(theme, it.noun)}" alt="" style="width:${tight ? 42 : 48}px;height:${tight ? 42 : 48}px">` +
          answerBox({ w: tight ? 52 : 64, h: tight ? 44 : 48, answer: it.n }) +
          `</span>`).join('') + `</div>`;
      } else {
        // find-and-circle: the target is the FIRST item; banner shows it big
        const target = items[0];
        below = '';
        const banner =
          `<div class="ws-scene-banner" data-lcs-target="${target.vocabKey}" data-lcs-targetn="${target.n}"${slot.attr(ctx, 'pic', 0)}>` +
          `<img class="ws-icon" src="${fileUri(theme, target.noun)}" alt="" style="width:56px;height:56px">` +
          `</div>`;
        return {
          bodyHtml: banner + scene,
          meta: { items: items.map(({ noun, vocabKey, n }) => ({ noun, vocabKey, n })) },
        };
      }
      return {
        bodyHtml: scene + below,
        meta: { items: items.map(({ noun, vocabKey, n }) => ({ noun, vocabKey, n })) },
      };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const counts = {};
        document.querySelectorAll('[data-lcs-scatter]').forEach((img) => {
          counts[img.dataset.lcsScatter] = (counts[img.dataset.lcsScatter] || 0) + 1;
        });
        if (mode === 'legend') {
          document.querySelectorAll('[data-lcs-noun]').forEach((item) => {
            const key = item.dataset.lcsNoun;
            const declared = parseInt(item.querySelector('[data-lcs-answer]').dataset.lcsAnswer, 10);
            if (counts[key] !== declared) fails.push(`${key}: scene has ${counts[key]}, legend says ${declared}`);
          });
        } else {
          const banner = document.querySelector('[data-lcs-target]');
          const key = banner.dataset.lcsTarget;
          const declared = parseInt(banner.dataset.lcsTargetn, 10);
          if (counts[key] !== declared) fails.push(`target ${key}: scene has ${counts[key]}, expected ${declared}`);
          if ((counts[key] || 0) < 2) fails.push(`target ${key}: too few instances for a find task`);
        }
        return fails;
      }, m);
    },
  };
}

module.exports = { makeSceneCountType };
