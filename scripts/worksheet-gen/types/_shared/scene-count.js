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
      const picked = rng.sample(labelSafeNouns(theme), mode === 'find' ? d.nouns + 1 : d.nouns);
      const items = picked.slice(0, d.nouns).map((p) => ({ ...p, n: rng.int(d.minN, d.maxN) }));

      const sceneH = mode === 'find' ? 600 : 520;
      const scene =
        `<div class="ws-scene" data-lcs-scene>` +
        mixedScatter({ theme, items, w: 600, h: sceneH - 20, iconPx: 58, rng }) +
        `</div>`;

      let below;
      if (mode === 'legend') {
        below = `<div class="ws-scene-legend">` + items.map((it) =>
          `<span class="ws-scene-legend-item" data-lcs-noun="${it.vocabKey}">` +
          `<img class="ws-icon" src="${fileUri(theme, it.noun)}" alt="" style="width:48px;height:48px">` +
          answerBox({ w: 64, h: 48, answer: it.n }) +
          `</span>`).join('') + `</div>`;
      } else {
        // find-and-circle: the target is the FIRST item; banner shows it big
        const target = items[0];
        below = '';
        const banner =
          `<div class="ws-scene-banner" data-lcs-target="${target.vocabKey}" data-lcs-targetn="${target.n}">` +
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
